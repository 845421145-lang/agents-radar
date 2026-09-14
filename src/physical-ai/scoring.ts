import type { ManufacturingProfile, OpportunityCandidate, ScoreBreakdown } from "./types.ts";

const clamp = (value: number, max: number) => Math.max(0, Math.min(max, Math.round(value)));

function manufacturingFit(
  candidate: OpportunityCandidate,
  profile: ManufacturingProfile,
): { score: number; coverage: number; notes: string[] } {
  const requirements = candidate.manufacturing_requirements.value ?? [];
  if (!requirements.length) return { score: 0, coverage: 0, notes: ["制造需求未知，不能给出高制造匹配分。"] };
  let total = 0;
  let known = 0;
  const notes: string[] = [];
  for (const requirement of requirements) {
    const capability = profile.capabilities[requirement];
    if (!capability || capability.capability_level === "unknown") {
      notes.push(`${requirement} 能力档案未确认。`);
      continue;
    }
    known++;
    const level =
      capability.capability_level === "high" ? 1 : capability.capability_level === "medium" ? 0.65 : 0.3;
    const preference =
      capability.preference === "preferred" ? 1.1 : capability.preference === "weak" ? 0.6 : 1;
    total += level * preference;
  }
  const coverage = known / requirements.length;
  return {
    score: clamp((requirements.length ? total / requirements.length : 0) * 20 * coverage, 20),
    coverage,
    notes,
  };
}

export function scoreCandidate(
  candidate: OpportunityCandidate,
  profile: ManufacturingProfile,
  thresholds: { validate: number; watch: number },
): OpportunityCandidate {
  const sourceCount = candidate.sources.length;
  const hasTraction = Boolean(candidate.traction_signal);
  const manufacture = manufacturingFit(candidate, profile);
  const marketDemand = clamp((hasTraction ? 9 : 4) + Math.min(6, (sourceCount - 1) * 3), 15);
  const growthTiming = clamp((candidate.status === "NEW" ? 5 : 3) + Math.min(5, sourceCount * 2), 10);
  const aiValue = clamp(
    candidate.ai_core_value.value ? 6 + (candidate.ai_value_proposition.value ? 4 : 0) : 0,
    10,
  );
  const supply = clamp((candidate.manufacturing_requirements.value?.length ?? 0) >= 3 ? 4 : 2, 10);
  const profit = clamp(candidate.price ? 8 : 3, 20); // no fabricated margin or BOM assumptions
  const differentiation = clamp((candidate.novelty_signal.value ? 4 : 2) + Math.min(4, sourceCount), 10);
  const launch = clamp(manufacture.coverage * 5, 5);
  const opportunity =
    marketDemand + growthTiming + aiValue + manufacture.score + supply + profit + differentiation + launch;
  const risks: string[] = [...manufacture.notes];
  let penalty = 0;
  if (!candidate.price) {
    penalty += 4;
    risks.push("没有来源支持的售价信息，利润空间未验证。");
  }
  if (!hasTraction) {
    penalty += 5;
    risks.push("只有发现信号，缺少直接需求或互动证据。");
  }
  if (candidate.product_category.value?.includes("机器人")) {
    penalty += 5;
    risks.push("机器人涉及更高的安全、可靠性和售后风险。");
  }
  if (manufacture.coverage < 0.5) {
    penalty += 8;
    risks.push("制造能力档案覆盖不足，不能假设 OOMWOO 已具备优势。");
  }
  const finalScore = clamp(opportunity - penalty, 100);
  const confidence = Math.max(
    0.05,
    Math.min(
      0.9,
      candidate.confidence * (0.55 + manufacture.coverage * 0.45) + Math.min(0.12, sourceCount * 0.04),
    ),
  );
  const score: ScoreBreakdown = {
    market_demand: marketDemand,
    growth_timing: growthTiming,
    ai_new_value: aiValue,
    manufacturing_fit: manufacture.score,
    supply_chain_feasibility: supply,
    profit_potential: profit,
    differentiation,
    time_to_market: launch,
    opportunity_score: opportunity,
    risk_penalty: penalty,
    final_score: finalScore,
    risk_notes: risks,
  };
  const status =
    finalScore >= thresholds.validate && confidence >= 0.55
      ? "VALIDATE"
      : finalScore >= thresholds.watch
        ? "WATCH"
        : "REJECTED";
  return { ...candidate, confidence, score, status };
}
