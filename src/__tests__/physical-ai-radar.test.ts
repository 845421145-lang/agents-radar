import { describe, expect, it } from "vitest";
import {
  classifySignals,
  deduplicateCandidates,
  deterministicCandidate,
  prefilterSignals,
} from "../physical-ai/classifier.ts";
import { mergeHistory } from "../physical-ai/history.ts";
import { buildPhysicalAiReport } from "../physical-ai/report.ts";
import { scoreCandidate } from "../physical-ai/scoring.ts";
import type { ManufacturingProfile, ProductSignal, SourceHealth } from "../physical-ai/types.ts";

function signal(title: string, description: string, source = "fixture"): ProductSignal {
  const url = `https://example.test/${source}/${encodeURIComponent(title)}`;
  return {
    id: title.toLowerCase().replace(/\W/g, "-"),
    source,
    source_url: url,
    title,
    description,
    published_at: "2026-09-14T00:00:00Z",
    observed_at: "2026-09-14T01:00:00Z",
    company: null,
    price: null,
    traction_signal: "120 backers",
    raw_category: "hardware",
    evidence: [
      {
        source,
        url,
        title,
        published_at: "2026-09-14T00:00:00Z",
        observed_at: "2026-09-14T01:00:00Z",
        excerpt: description,
        fact_status: "FACT",
      },
    ],
  };
}

const profile: ManufacturingProfile = {
  capabilities: {
    plastics_injection: { capability_level: "high", preference: "preferred", notes: "fixture" },
    pcb_electronics: { capability_level: "high", preference: "preferred", notes: "fixture" },
    embedded_firmware: { capability_level: "high", preference: "preferred", notes: "fixture" },
    final_assembly: { capability_level: "high", preference: "preferred", notes: "fixture" },
    sensors: { capability_level: "medium", preference: "neutral", notes: "fixture" },
    motors_actuators: { capability_level: "medium", preference: "neutral", notes: "fixture" },
    testing: { capability_level: "medium", preference: "neutral", notes: "fixture" },
    ai_software_integration: { capability_level: "medium", preference: "neutral", notes: "fixture" },
    sheet_metal_welding: { capability_level: "medium", preference: "neutral", notes: "fixture" },
    cnc_machining: { capability_level: "medium", preference: "neutral", notes: "fixture" },
  },
};

describe("OOMWOO Physical AI Radar", () => {
  it("keeps physical AI fixtures and filters pure software/model/agent/non-AI fixtures", () => {
    const signals = [
      signal(
        "AI Label Printer",
        "An edge AI label printer helps small warehouses identify inventory with a camera.",
      ),
      signal("AI Glasses", "AI-powered smart glasses with on-device vision assistance."),
      signal("AI Home Robot", "A home robot with computer vision and autonomous navigation."),
      signal("Industrial Vision Inspection Device", "AI camera equipment finds factory defects."),
      signal("AI CRM SaaS", "A cloud API SaaS CRM with an LLM agent."),
      signal("New LLM Model", "An open source language model release for developers."),
      signal("Agent Framework", "A Python agent framework and developer SDK."),
      signal("Water Bottle", "A normal insulated water bottle."),
    ];
    const result = prefilterSignals(signals);
    expect(result.kept.map((item) => item.title)).toEqual(
      expect.arrayContaining([
        "AI Label Printer",
        "AI Glasses",
        "AI Home Robot",
        "Industrial Vision Inspection Device",
      ]),
    );
    expect(result.kept.map((item) => item.title)).not.toEqual(
      expect.arrayContaining(["AI CRM SaaS", "New LLM Model", "Agent Framework", "Water Bottle"]),
    );
  });

  it("scores the AI label-printer fixture through the normal pipeline without fabricated price", async () => {
    const fixture = signal(
      "AI Label Printer",
      "An edge AI label printer helps small warehouses identify inventory with a camera.",
    );
    const [candidate] = await classifySignals([fixture], false, 8);
    const scored = scoreCandidate(candidate!, profile, { validate: 75, watch: 60 });
    expect(scored.product_category.value).toContain("标签");
    expect(scored.price).toBeNull();
    expect(scored.score?.final_score).toBeGreaterThan(0);
    expect(scored.confidence).toBeLessThan(0.9);
  });

  it("deduplicates multi-source evidence and persists history", () => {
    const first = deterministicCandidate(signal("AI Label Printer", "AI printer hardware", "source-a"));
    const second = deterministicCandidate(signal("AI Label Printer", "AI printer hardware", "source-b"));
    const unique = deduplicateCandidates([first, second]);
    expect(unique).toHaveLength(1);
    expect(unique[0]?.evidence).toHaveLength(2);
    const scored = scoreCandidate(unique[0]!, profile, { validate: 75, watch: 60 });
    const merged = mergeHistory({ version: 1, candidates: {} }, [scored], "2026-09-14");
    const again = mergeHistory(merged.store, [scored], "2026-09-15");
    expect(again.store.candidates[scored.id]?.days_seen).toBe(2);
  });

  it("renders a Chinese owner report with honest coverage limitations", () => {
    const candidate = scoreCandidate(
      deterministicCandidate(signal("AI Label Printer", "AI printer hardware")),
      profile,
      { validate: 75, watch: 60 },
    );
    const health: SourceHealth[] = [
      {
        source: "amazon",
        enabled: false,
        status: "disabled",
        fetched_count: 0,
        accepted_count: 0,
        limitation: "No compliant public sales API selected.",
        error: null,
        checked_at: "2026-09-14T00:00:00Z",
      },
    ];
    const report = buildPhysicalAiReport(
      "2026-09-14",
      { raw_signals: 1, prefiltered: 1, physical_candidates: 1, watch: 0, validate: 0, filtered: 0 },
      [candidate],
      health,
    );
    expect(report).toContain("Coverage limitation");
    expect(report).toContain("不输出伪造的销量、市场规模、BOM、售价、毛利或供应链数字");
  });
});
