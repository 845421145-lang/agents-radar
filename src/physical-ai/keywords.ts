const AI_TERMS = [
  "artificial intelligence", "ai-powered", "ai powered", "edge ai", "machine learning", "computer vision",
  "vision ai", "intelligent", "autonomous", "robot", "robotic", "voice assistant", "generative ai",
  "llm", "smart vision", "ai wearable", "ai glasses", "ai camera", "ai toy",
];

const PHYSICAL_TERMS = [
  "device", "hardware", "robot", "robotic", "camera", "glasses", "earbuds", "headphones", "wearable",
  "printer", "label", "sensor", "industrial", "inspection", "factory", "machine", "appliance", "home",
  "tool", "drone", "vehicle", "pet", "toy", "monitor", "speaker", "thermostat", "embedded", "edge",
  "electronics", "electronic", "equipment", "gadget", "keyboard", "watch", "ring", "vision system",
];

const SOFTWARE_ONLY_TERMS = [
  "saas", "api", "model release", "language model", "open source model", "agent framework", "framework",
  "rag", "sdk", "developer tool", "coding assistant", "crm", "workflow automation", "prompt", "plugin",
  "benchmark", "paper", "research paper", "funding round", "raises $", "series a", "series b",
];

export const PRODUCT_CATEGORY_HINTS: Array<[RegExp, string, string[]]> = [
  [/label|printer/i, "AI 标签/打印设备", ["plastics_injection", "pcb_electronics", "embedded_firmware", "final_assembly"]],
  [/glasses|eyewear|smart glasses/i, "AI 眼镜/可穿戴", ["plastics_injection", "pcb_electronics", "sensors", "embedded_firmware", "final_assembly"]],
  [/earbud|headphone|audio|speaker/i, "AI 音频穿戴", ["plastics_injection", "pcb_electronics", "sensors", "embedded_firmware", "final_assembly"]],
  [/robot|robotic/i, "机器人", ["motors_actuators", "sensors", "pcb_electronics", "embedded_firmware", "final_assembly", "testing"]],
  [/camera|vision|inspection/i, "AI 视觉/检测设备", ["sensors", "pcb_electronics", "embedded_firmware", "ai_software_integration", "testing"]],
  [/home|thermostat|appliance|pet|toy/i, "AI 家庭/宠物/玩具设备", ["plastics_injection", "pcb_electronics", "sensors", "embedded_firmware", "final_assembly"]],
  [/industrial|factory|machine|tool/i, "AI 工业设备/智能工具", ["sheet_metal_welding", "cnc_machining", "pcb_electronics", "sensors", "embedded_firmware", "testing"]],
];

function includesAny(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

export function textForSignal(input: { title: string; description: string | null; raw_category: string | null }): string {
  // Source query/topic metadata describes why the adapter fetched an item, not
  // what the product actually is.  Including it here would make every Google
  // News result from an "AI hardware" query pass the gate even when its own
  // headline is unrelated.
  return `${input.title} ${input.description ?? ""}`.replace(/\s+/g, " ").trim();
}

export function isPhysicalAiLikely(input: { title: string; description: string | null; raw_category: string | null }): boolean {
  const text = textForSignal(input);
  return includesAny(text, AI_TERMS) && includesAny(text, PHYSICAL_TERMS) && !isSoftwareOnlyLikely(input);
}

export function isSoftwareOnlyLikely(input: { title: string; description: string | null; raw_category: string | null }): boolean {
  const text = textForSignal(input);
  const physical = includesAny(text, PHYSICAL_TERMS);
  return includesAny(text, SOFTWARE_ONLY_TERMS) && !physical;
}

export function inferCategory(input: { title: string; description: string | null; raw_category: string | null }): { category: string; requirements: string[] } {
  const text = textForSignal(input);
  const match = PRODUCT_CATEGORY_HINTS.find(([pattern]) => pattern.test(text));
  return match ? { category: match[1], requirements: match[2] } : { category: "其他 Physical AI 设备", requirements: ["pcb_electronics", "embedded_firmware", "final_assembly"] };
}

export function hasAiSignal(input: { title: string; description: string | null; raw_category: string | null }): boolean {
  return includesAny(textForSignal(input), AI_TERMS);
}
