import { createHash } from "node:crypto";
import { callLlm, parseLlmJson } from "../report.ts";
import { hasAiSignal, inferCategory, isPhysicalAiLikely, isSoftwareOnlyLikely } from "./keywords.ts";
import type { InferredField, OpportunityCandidate, ProductSignal } from "./types.ts";

const inferred = <T>(value: T | null, rationale: string | null): InferredField<T> => ({ value, status: value === null ? "UNKNOWN" : "INFERENCE", rationale });
const unknown = <T>(): InferredField<T> => ({ value: null, status: "UNKNOWN", rationale: null });
const hash = (value: string) => createHash("sha1").update(value).digest("hex").slice(0, 16);

function canonicalize(value: string): string {
  return value.toLowerCase().replace(/\b(ai|the|new)\b/g, " ").replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ").trim().replace(/\s+/g, " ");
}

export function prefilterSignals(signals: ProductSignal[]): { kept: ProductSignal[]; filtered: number } {
  const kept = signals.filter((signal) => isPhysicalAiLikely(signal) && !isSoftwareOnlyLikely(signal));
  return { kept, filtered: signals.length - kept.length };
}

export function deterministicCandidate(signal: ProductSignal, method: OpportunityCandidate["classification_method"] = "deterministic"): OpportunityCandidate {
  const detail = inferCategory(signal);
  const ai = hasAiSignal(signal);
  const physical = isPhysicalAiLikely(signal);
  const canonical = canonicalize(signal.title);
  return {
    id: hash(canonical || signal.id), product_name: signal.title, canonical_name: canonical || signal.id,
    product_category: inferred(detail.category, "由标题/描述中的实体产品类别关键词推断。"),
    physical_product: { value: physical, status: "INFERENCE", rationale: "由公开标题/描述中的硬件关键词判定，仍需人工复核。" },
    ai_core_value: { value: ai, status: "INFERENCE", rationale: "由公开标题/描述中的 AI 关键词判定，尚未证明 AI 是核心而非营销。" },
    company: signal.company, region: unknown<string>(), price: signal.price, price_range: unknown<string>(),
    traction_signal: signal.traction_signal,
    market_signal: inferred(signal.traction_signal ? "公开平台互动/众筹信号存在" : "公开新品或行业报道信号", signal.traction_signal ? "来源直接提供互动或众筹字段。" : "仅基于新品发现来源。"),
    problem_solved: unknown<string>(), target_customer: unknown<string>(), ai_value_proposition: unknown<string>(),
    manufacturing_requirements: inferred(detail.requirements, "根据产品类别映射到能力档案所需能力。"),
    supply_chain_signal: unknown<string>(), competition_signal: unknown<string>(), novelty_signal: inferred("新发现信号", "首次被当日来源捕获；不等同于市场首发。"),
    evidence: signal.evidence, sources: [signal.source], confidence: physical && ai ? 0.38 : 0.15,
    classification_method: method, score: null, status: "NEW",
    next_validation_questions: ["客户是否正在为该痛点付费？", "AI 是可验证的核心价值还是营销描述？", "是否存在可采购的关键器件与可行量产路径？"],
  };
}

interface LlmClassification {
  id: string;
  physical_product: boolean;
  ai_core_value: boolean;
  product_category: string | null;
  problem_solved: string | null;
  target_customer: string | null;
  ai_value_proposition: string | null;
  manufacturing_requirements: string[] | null;
  novelty_signal: string | null;
  confidence: number;
  next_validation_questions: string[] | null;
}

function classifierPrompt(signals: ProductSignal[]): string {
  return `你是 OOMWOO 的实体 AI 产品机会侦察员。你不是新闻编辑，也不是技术极客。\n\n只根据给定公开信号分类，不能编造销量、价格、BOM、利润、供应链、公司事实。输出严格 JSON 数组，每项只含：id, physical_product, ai_core_value, product_category, problem_solved, target_customer, ai_value_proposition, manufacturing_requirements, novelty_signal, confidence, next_validation_questions。\n\n规则：纯 SaaS、API、模型、论文、Agent/开发框架必须 physical_product=false。AI 只是营销而非核心价值则 ai_core_value=false。所有非直接来源事实要用保守语言，未知填 null。\n\n信号：\n${JSON.stringify(signals.map((s) => ({ id: s.id, title: s.title, description: s.description, source: s.source, category: s.raw_category, traction: s.traction_signal, evidence_url: s.source_url })))}`;
}

function applyLlm(base: OpportunityCandidate, item: LlmClassification): OpportunityCandidate {
  if (!item.physical_product || !item.ai_core_value) return { ...base, physical_product: inferred(Boolean(item.physical_product), "LLM 基于给定信号的保守分类。"), ai_core_value: inferred(Boolean(item.ai_core_value), "LLM 基于给定信号的保守分类。"), confidence: Math.min(0.45, Math.max(0.1, item.confidence || 0.2)), classification_method: "llm", status: "REJECTED" };
  return {
    ...base,
    physical_product: inferred(true, "LLM 基于给定公开信号判定；需要后续验证。"), ai_core_value: inferred(true, "LLM 基于给定公开信号判定；需要后续验证。"),
    product_category: inferred(item.product_category, "LLM 基于给定公开信号归类。"),
    problem_solved: inferred(item.problem_solved, "LLM 推断，非来源直接事实。"), target_customer: inferred(item.target_customer, "LLM 推断，非来源直接事实。"),
    ai_value_proposition: inferred(item.ai_value_proposition, "LLM 推断，非来源直接事实。"),
    manufacturing_requirements: inferred(item.manufacturing_requirements ?? base.manufacturing_requirements.value, "产品类别和 LLM 的保守推断；需工程团队复核。"),
    novelty_signal: inferred(item.novelty_signal, "LLM 对来源新颖性信号的保守概括。"),
    confidence: Math.min(0.85, Math.max(base.confidence, Number.isFinite(item.confidence) ? item.confidence : base.confidence)),
    classification_method: "llm", next_validation_questions: item.next_validation_questions?.slice(0, 4) ?? base.next_validation_questions,
  };
}

export async function classifySignals(signals: ProductSignal[], useLlm: boolean, batchSize: number): Promise<OpportunityCandidate[]> {
  const bases = signals.map((signal) => deterministicCandidate(signal));
  if (!useLlm || signals.length === 0) return bases.filter((candidate) => candidate.physical_product.value && candidate.ai_core_value.value);
  const byId = new Map(bases.map((candidate) => [candidate.id, candidate]));
  const results: OpportunityCandidate[] = [];
  for (let start = 0; start < signals.length; start += batchSize) {
    const batch = signals.slice(start, start + batchSize);
    try {
      const response = parseLlmJson<LlmClassification[]>(await callLlm(classifierPrompt(batch), 3000));
      const classified = new Map((Array.isArray(response) ? response : []).map((entry) => [entry.id, entry]));
      for (const signal of batch) {
        const base = byId.get(hash(canonicalize(signal.title) || signal.id)) ?? deterministicCandidate(signal, "fallback");
        const item = classified.get(signal.id);
        const candidate = item ? applyLlm(base, item) : { ...base, classification_method: "fallback" as const, confidence: Math.min(base.confidence, 0.3) };
        if (candidate.physical_product.value && candidate.ai_core_value.value) results.push(candidate);
      }
    } catch (error) {
      console.warn(`[physical-ai] LLM classifier failed; using deterministic fallback: ${String(error)}`);
      results.push(...batch.map((signal) => deterministicCandidate(signal, "fallback")).filter((candidate) => candidate.physical_product.value && candidate.ai_core_value.value));
    }
  }
  return results;
}

export function deduplicateCandidates(candidates: OpportunityCandidate[]): OpportunityCandidate[] {
  const groups = new Map<string, OpportunityCandidate[]>();
  for (const candidate of candidates) groups.set(candidate.canonical_name, [...(groups.get(candidate.canonical_name) ?? []), candidate]);
  return [...groups.values()].map((group) => {
    const first = group[0]!;
    const evidence = group.flatMap((candidate) => candidate.evidence).filter((item, index, all) => all.findIndex((other) => other.url === item.url) === index);
    const sources = [...new Set(group.flatMap((candidate) => candidate.sources))];
    return { ...first, evidence, sources, confidence: Math.min(0.9, first.confidence + Math.min(0.18, (sources.length - 1) * 0.08)), traction_signal: group.find((candidate) => candidate.traction_signal)?.traction_signal ?? first.traction_signal };
  });
}
