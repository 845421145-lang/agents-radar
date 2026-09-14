import fs from "node:fs";
import path from "node:path";
import type { OpportunityCandidate, ProductSignal, SourceHealth } from "./types.ts";

export interface RadarMetrics {
  raw_signals: number;
  prefiltered: number;
  physical_candidates: number;
  watch: number;
  validate: number;
  filtered: number;
}

const inferred = <T>(
  field: { value: T | null; status: string; rationale: string | null },
  formatter: (value: T) => string = String,
) => (field.value === null ? "UNKNOWN（当前无证据）" : `${formatter(field.value)} [${field.status}]`);

function opportunitySection(candidate: OpportunityCandidate): string {
  const score = candidate.score!;
  return `## ${candidate.product_name}\n\n- **结论**：${candidate.status} · 总分 **${score.final_score}/100** · confidence **${candidate.confidence.toFixed(2)}**\n- **产品方向**：${inferred(candidate.product_category)}\n- **用户痛点**：${inferred(candidate.problem_solved)}\n- **AI 新价值**：${inferred(candidate.ai_value_proposition)}\n- **目标客户**：${inferred(candidate.target_customer)}\n- **制造匹配**：${score.manufacturing_fit}/20（仅基于 Manufacturing Capability Profile；未确认能力已降低 confidence）\n- **潜在商业模式/售价区间**：${candidate.price ? `${candidate.price} [FACT]` : inferred(candidate.price_range)}\n- **利润假设**：UNKNOWN（Radar 不估造 BOM、毛利或销量；留给 Market Validation Agent）\n- **竞争/新颖性**：${inferred(candidate.competition_signal)}；${inferred(candidate.novelty_signal)}\n- **为什么现在**：${inferred(candidate.market_signal)}\n- **风险**：${score.risk_notes.map((risk) => `\`${risk}\``).join("；")}\n- **下一步验证**：${candidate.next_validation_questions.map((question) => `\`${question}\``).join("；")}\n- **证据**：${candidate.evidence.map((evidence) => `[${evidence.source}](${evidence.url})`).join(" · ")}\n\n评分：需求 ${score.market_demand}/15 · 时机 ${score.growth_timing}/10 · AI 价值 ${score.ai_new_value}/10 · 制造 ${score.manufacturing_fit}/20 · 供应链 ${score.supply_chain_feasibility}/10 · 利润证据 ${score.profit_potential}/20 · 差异化 ${score.differentiation}/10 · 上市速度 ${score.time_to_market}/5 · 风险惩罚 -${score.risk_penalty}`;
}

export function buildPhysicalAiReport(
  date: string,
  metrics: RadarMetrics,
  candidates: OpportunityCandidate[],
  health: SourceHealth[],
): string {
  const validate = candidates.filter((candidate) => candidate.status === "VALIDATE");
  const watch = candidates.filter((candidate) => candidate.status === "WATCH");
  const top = [...validate, ...watch].sort(
    (a, b) => (b.score?.final_score ?? 0) - (a.score?.final_score ?? 0),
  );
  const best = top[0];
  const limitations = health
    .filter((item) => item.status !== "ok")
    .map((item) => `- **${item.source}**：${item.status}${item.limitation ? ` — ${item.limitation}` : ""}`);
  return `# OOMWOO Physical AI Radar · ${date}\n\n> 目标：每天少看信息，只看可能被制造成真实商品、并值得进一步验证利润的 AI + 实体产品机会。\n\n## 今日结论\n\n- 扫描原始信号：**${metrics.raw_signals}**\n- 通过实体 AI 第一层过滤：**${metrics.prefiltered}**\n- Physical AI candidates：**${metrics.physical_candidates}**\n- VALIDATE：**${metrics.validate}**；WATCH：**${metrics.watch}**；过滤：**${metrics.filtered}**\n- 今日最值得看：${best ? `**${best.product_name}**（${best.score?.final_score}/100，confidence ${best.confidence.toFixed(2)}，${best.status}）` : "**没有达到 VALIDATE/WATCH 门槛的产品机会。**"}\n\n${best ? opportunitySection(best) : ""}\n\n# Watchlist\n\n${watch.length ? watch.map(opportunitySection).join("\n\n") : "今日没有达到 WATCH 门槛的候选。"}\n\n# 已过滤\n\n共 **${metrics.filtered}** 条信号未进入主报告，主要包括纯 SaaS、API、模型发布、Agent/开发框架、论文与没有实体 AI 价值证据的信息。\n\n# 数据源健康度与覆盖限制\n\n| 来源 | 状态 | 抓取 | 通过过滤 | 覆盖限制 |\n|---|---:|---:|---:|---|\n${health.map((item) => `| ${item.source} | ${item.status} | ${item.fetched_count} | ${item.accepted_count} | ${item.limitation ?? "-"} |`).join("\n")}\n\n${limitations.length ? `## Coverage limitation\n\n${limitations.join("\n")}\n` : ""}\n\n## 证据标签\n\n- **FACT**：来源明确支持。\n- **INFERENCE**：从来源信号推断，必须由下一层验证。\n- **UNKNOWN**：当前没有证据，禁止把它当作结论。\n\n---\n自动生成。Radar 不输出伪造的销量、市场规模、BOM、售价、毛利或供应链数字。\n`;
}

export function savePhysicalAiOutputs(
  date: string,
  report: string,
  candidates: OpportunityCandidate[],
  health: SourceHealth[],
  signals: ProductSignal[],
): void {
  const dir = path.join("digests", date);
  fs.mkdirSync(path.join(dir, "normalized"), { recursive: true });
  fs.writeFileSync(path.join(dir, "physical-ai-radar.md"), report);
  fs.writeFileSync(
    path.join(dir, "opportunities.json"),
    JSON.stringify(
      {
        schema_version: "oomwoo.opportunity-candidate.v1",
        generated_at: new Date().toISOString(),
        candidates,
      },
      null,
      2,
    ) + "\n",
  );
  fs.writeFileSync(
    path.join(dir, "source-health.json"),
    JSON.stringify({ schema_version: "oomwoo.source-health.v1", sources: health }, null, 2) + "\n",
  );
  fs.writeFileSync(
    path.join(dir, "normalized", "product-signals.json"),
    JSON.stringify({ schema_version: "oomwoo.product-signal.v1", signals }, null, 2) + "\n",
  );
}
