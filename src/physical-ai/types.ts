export type FactStatus = "FACT" | "INFERENCE" | "UNKNOWN";
export type CandidateStatus = "NEW" | "WATCH" | "VALIDATE" | "REJECTED" | "ARCHIVED";
export type Confidence = number;

export interface Evidence {
  source: string;
  url: string;
  title: string;
  published_at: string | null;
  observed_at: string;
  excerpt: string | null;
  fact_status: "FACT";
}

export interface ProductSignal {
  id: string;
  source: string;
  source_url: string;
  title: string;
  description: string | null;
  published_at: string | null;
  observed_at: string;
  company: string | null;
  price: string | null;
  traction_signal: string | null;
  raw_category: string | null;
  evidence: Evidence[];
}

export interface InferredField<T> {
  value: T | null;
  status: FactStatus;
  rationale: string | null;
}

export interface ScoreBreakdown {
  market_demand: number;
  growth_timing: number;
  ai_new_value: number;
  manufacturing_fit: number;
  supply_chain_feasibility: number;
  profit_potential: number;
  differentiation: number;
  time_to_market: number;
  opportunity_score: number;
  risk_penalty: number;
  final_score: number;
  risk_notes: string[];
}

export interface OpportunityCandidate {
  id: string;
  product_name: string;
  canonical_name: string;
  product_category: InferredField<string>;
  physical_product: InferredField<boolean>;
  ai_core_value: InferredField<boolean>;
  company: string | null;
  region: InferredField<string>;
  price: string | null;
  price_range: InferredField<string>;
  traction_signal: string | null;
  market_signal: InferredField<string>;
  problem_solved: InferredField<string>;
  target_customer: InferredField<string>;
  ai_value_proposition: InferredField<string>;
  manufacturing_requirements: InferredField<string[]>;
  supply_chain_signal: InferredField<string>;
  competition_signal: InferredField<string>;
  novelty_signal: InferredField<string>;
  evidence: Evidence[];
  sources: string[];
  confidence: Confidence;
  classification_method: "deterministic" | "llm" | "fallback";
  score: ScoreBreakdown | null;
  status: CandidateStatus;
  next_validation_questions: string[];
}

export interface CandidateHistory {
  id: string;
  canonical_name: string;
  first_seen: string;
  last_seen: string;
  days_seen: number;
  sources_count: number;
  score_history: Array<{ date: string; final_score: number; confidence: number }>;
  momentum: "new" | "rising" | "steady" | "falling";
  status: CandidateStatus;
}

export interface HistoryStore {
  version: 1;
  candidates: Record<string, CandidateHistory>;
}

export interface SourceHealth {
  source: string;
  enabled: boolean;
  status: "ok" | "empty" | "failed" | "disabled" | "unconfigured";
  fetched_count: number;
  accepted_count: number;
  limitation: string | null;
  error: string | null;
  checked_at: string;
}

export interface Capability {
  capability_level: "high" | "medium" | "low" | "unknown";
  preference: "preferred" | "neutral" | "weak";
  notes: string;
}

export interface ManufacturingProfile {
  capabilities: Record<string, Capability>;
}
