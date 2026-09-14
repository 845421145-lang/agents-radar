import { toCstDateStr } from "./date.ts";
import { classifySignals, deduplicateCandidates, prefilterSignals } from "./physical-ai/classifier.ts";
import { loadManufacturingProfile, loadPhysicalRadarConfig } from "./physical-ai/config.ts";
import { loadHistory, mergeHistory, saveHistory } from "./physical-ai/history.ts";
import { buildPhysicalAiReport, savePhysicalAiOutputs } from "./physical-ai/report.ts";
import { scoreCandidate } from "./physical-ai/scoring.ts";
import { fetchEnabledSources } from "./physical-ai/sources.ts";

async function main(): Promise<void> {
  const config = loadPhysicalRadarConfig();
  const profile = loadManufacturingProfile();
  const date = toCstDateStr(new Date());
  console.log(`[physical-ai] Starting OOMWOO Physical AI Radar for ${date}`);
  const sourceResults = await fetchEnabledSources(config.sources);
  const signals = sourceResults.flatMap((result) => result.signals);
  const gate = prefilterSignals(signals);
  console.log(
    `[physical-ai] ${signals.length} raw signals; ${gate.kept.length} passed deterministic physical-AI gate`,
  );
  const useLlm = process.env["PHYSICAL_AI_USE_LLM"] === "false" ? false : config.radar.use_llm_classifier;
  // Cheap deterministic gate first. Only a bounded, highest-traction subset
  // reaches the paid classifier; remaining signals are retained in normalized
  // output but do not consume model calls.
  const llmInput = [...gate.kept]
    .sort((a, b) => Number(Boolean(b.traction_signal)) - Number(Boolean(a.traction_signal)))
    .slice(0, config.radar.max_prefiltered_for_llm);
  const classified = await classifySignals(llmInput, useLlm, config.radar.llm_batch_size);
  const unique = deduplicateCandidates(classified).slice(0, config.radar.max_candidates_for_deep_analysis);
  const scored = unique.map((candidate) =>
    scoreCandidate(candidate, profile, {
      validate: config.radar.validate_threshold,
      watch: config.radar.watch_threshold,
    }),
  );
  const merged = mergeHistory(loadHistory(), scored, date);
  saveHistory(merged.store);
  const metrics = {
    raw_signals: signals.length,
    prefiltered: gate.kept.length,
    physical_candidates: merged.candidates.length,
    watch: merged.candidates.filter((candidate) => candidate.status === "WATCH").length,
    validate: merged.candidates.filter((candidate) => candidate.status === "VALIDATE").length,
    filtered: signals.length - gate.kept.length,
  };
  const report = buildPhysicalAiReport(
    date,
    metrics,
    merged.candidates,
    sourceResults.map((result) => result.health),
  );
  savePhysicalAiOutputs(
    date,
    report,
    merged.candidates,
    sourceResults.map((result) => result.health),
    signals,
  );
  console.log(
    `[physical-ai] Done: ${metrics.validate} VALIDATE, ${metrics.watch} WATCH. Saved digests/${date}/physical-ai-radar.md`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
