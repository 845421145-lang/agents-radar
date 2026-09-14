import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { ManufacturingProfile } from "./types.ts";

export interface SourceConfig {
  enabled: boolean;
  type: string;
  queries?: string[];
  requires_env?: string;
  limitation?: string;
}

export interface PhysicalRadarConfig {
  radar: {
    use_llm_classifier: boolean;
    llm_batch_size: number;
    max_candidates_for_deep_analysis: number;
    max_prefiltered_for_llm: number;
    publish_issue: boolean;
    validate_threshold: number;
    watch_threshold: number;
  };
  sources: Record<string, SourceConfig>;
  legacy_sources: Record<string, { enabled: boolean; role?: string }>;
}

const defaults: PhysicalRadarConfig = {
  radar: {
    use_llm_classifier: true,
    llm_batch_size: 8,
    max_candidates_for_deep_analysis: 20,
    max_prefiltered_for_llm: 40,
    publish_issue: false,
    validate_threshold: 75,
    watch_threshold: 60,
  },
  sources: {},
  legacy_sources: {},
};

export function loadPhysicalRadarConfig(file = "config/physical-ai-radar.yml"): PhysicalRadarConfig {
  if (!fs.existsSync(file)) return defaults;
  const raw = yaml.load(fs.readFileSync(file, "utf8")) as Partial<PhysicalRadarConfig>;
  return {
    radar: { ...defaults.radar, ...raw.radar },
    sources: raw.sources ?? {},
    legacy_sources: raw.legacy_sources ?? {},
  };
}

export function loadManufacturingProfile(file = "config/manufacturing-profile.yml"): ManufacturingProfile {
  const empty: ManufacturingProfile = { capabilities: {} };
  if (!fs.existsSync(file)) return empty;
  const raw = yaml.load(fs.readFileSync(file, "utf8")) as ManufacturingProfile;
  return raw?.capabilities ? raw : empty;
}

export function resolvePhysicalPath(...parts: string[]): string {
  return path.resolve(...parts);
}
