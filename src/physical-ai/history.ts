import fs from "node:fs";
import path from "node:path";
import type { CandidateHistory, HistoryStore, OpportunityCandidate } from "./types.ts";

const HISTORY_PATH = path.join("digests", "physical-ai-history.json");

export function loadHistory(file = HISTORY_PATH): HistoryStore {
  if (!fs.existsSync(file)) return { version: 1, candidates: {} };
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as HistoryStore;
    return data?.version === 1 && data.candidates ? data : { version: 1, candidates: {} };
  } catch {
    return { version: 1, candidates: {} };
  }
}

function momentum(history: CandidateHistory): CandidateHistory["momentum"] {
  const scores = history.score_history.map((point) => point.final_score);
  if (scores.length < 2) return "new";
  const delta = scores[scores.length - 1]! - scores[scores.length - 2]!;
  return delta >= 5 ? "rising" : delta <= -5 ? "falling" : "steady";
}

export function mergeHistory(store: HistoryStore, candidates: OpportunityCandidate[], date: string): { store: HistoryStore; candidates: OpportunityCandidate[] } {
  const updated: OpportunityCandidate[] = [];
  for (const candidate of candidates) {
    const existing = store.candidates[candidate.id];
    const point = { date, final_score: candidate.score?.final_score ?? 0, confidence: candidate.confidence };
    const history: CandidateHistory = existing
      ? {
          ...existing,
          last_seen: date,
          days_seen: existing.last_seen === date ? existing.days_seen : existing.days_seen + 1,
          sources_count: Math.max(existing.sources_count, candidate.sources.length),
          score_history: [...existing.score_history.filter((entry) => entry.date !== date), point].slice(-60),
          status: candidate.status,
        }
      : { id: candidate.id, canonical_name: candidate.canonical_name, first_seen: date, last_seen: date, days_seen: 1, sources_count: candidate.sources.length, score_history: [point], momentum: "new", status: candidate.status };
    history.momentum = momentum(history);
    store.candidates[candidate.id] = history;
    updated.push({ ...candidate, status: history.status });
  }
  return { store, candidates: updated };
}

export function saveHistory(store: HistoryStore, file = HISTORY_PATH): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(store, null, 2) + "\n");
}
