# ArXiv AI Research Digest 2026-09-18

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-18 00:44 UTC

---

---

### **Today's Highlights**  
Recent AI research on ArXiv (2026-09-18) reveals a strong momentum toward *agentic systems*, *multi-modal grounding*, and *scalable, interpretable reasoning*. Notably, advances in **LLM alignment** via zeroth-order preference learning and **agent safety** through arbitration frameworks suggest growing maturity in deploying AI in real-world workflows. The emergence of *infinite-parameter LLMs* and *co-evolving routing mechanisms* points to a shift from static model scaling toward dynamic, adaptive architectures. Meanwhile, benchmarks like *ReFigBench* and *ECtHR-NPD* reflect a broader push for verifiable, domain-specific evaluation beyond standard metrics.

---

### **Key Papers**

#### 🧠 Large Language Models (architecture, training, alignment, evaluation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [A Zeroth-Order Paradigm for LLM Preference Alignment](http://arxiv.org/abs/2609.19144v1) | Chen, Xi et al. | Proposes a novel method to extract human preference signals without relying on likelihood differences, enabling efficient and robust alignment even with small margin pairs. This could reduce reliance on costly reward modeling. |
| [Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data](http://arxiv.org/abs/2609.18842v1) | Hu, Clarke et al. | Introduces a paradigm where LLM weights are dynamically generated from live data, circumventing fixed parameter limits. This enables true scalability and adaptability in evolving environments. |
| [CERA-MoA: Co-Evolving Routing Mechanisms with Continually Learning LLM Agents](http://arxiv.org/abs/2609.18779v1) | Jiang, He et al. | Unifies agent routing and fine-tuning into a co-evolutionary process, allowing routing strategies to adapt as agents improve—critical for long-term agentic performance. |
| [How Model Growth, Recursion, and Boundary Operators Influence Scaling Exponents](http://arxiv.org/abs/2609.19107v1) | Chen, Vegesna et al. | Challenges conventional wisdom by showing architectural choices can alter scaling exponents, enabling exponential gains in performance with computation—rewriting the rules of model growth. |

#### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Cognitive Extensions for Dual-Process Language Agents](http://arxiv.org/abs/2609.19128v1) | Meneses dos Santos, Oliveira | Enhances dual-process agents with modular memory and self-reflection modules, improving long-horizon task execution and recovery in interactive environments. |
| [Affora: A Design System for Agent-Friendly Interfaces](http://arxiv.org/abs/2609.19125v1) | Jin Gao | Presents a human-machine interface design system that preserves visual clarity while making software actions machine-readable—bridging usability and automation. |
| [Compositional Policy Violations: When Step-Level Compliance Fails In Agentic AI Workflows](http://arxiv.org/abs/2609.18820v1) | Kurady, Grandhi et al. | Reveals that per-step compliance checks can miss systemic policy violations; calls for holistic workflow-level governance in regulated domains. |
| [Taming the Agentic RAN: Stability-Guaranteed Arbitration of Autonomous AI Agents in O-RAN](http://arxiv.org/abs/2609.18857v1) | Hashemi Natanzi, Tang | Demonstrates unsafe interactions between independent AI agents in O-RAN and proposes a stability-guaranteed arbitration mechanism—critical for telecom safety. |

#### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [PANORAMA: Panoptic Grounded Captioning via Mask Proposal Selection](http://arxiv.org/abs/2609.19143v1) | Pieri, Kazakos et al. | Introduces a panoptic grounding framework that selects high-quality mask proposals for spatially accurate image captioning—improving multimodal alignment. |
| [rMuscle: Robotic Muscle Memory for Efficient Vision-Language-Action Model Inference](http://arxiv.org/abs/2609.19104v1) | Zhou, Li et al. | Proposes a "muscle memory" caching mechanism for VLA models, drastically reducing inference cost in repetitive factory tasks—key for industrial deployment. |
| [ReFigBench: Benchmarking Scientific Figure Reconstruction as Editable PowerPoint Artifacts](http://arxiv.org/abs/2609.18844v1) | Fan, Wei et al. | Evaluates multimodal coding agents by reconstructing figures into editable artifacts, offering a practical, artifact-centric benchmark beyond pixel or API similarity. |
| [ASLEval: Measuring Privacy Exposure Displacement in LLM Agent Sessions](http://arxiv.org/abs/2609.18864v1) | Wu, Huang et al. | Introduces a comprehensive privacy evaluation framework that tracks exposure across full agent sessions—addressing blind spots in local proxy assessments. |

#### 📊 Applications (domain-specific, multimodal, code generation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [ScienceIDE: Turning World's Scientific Codebase into Agent Learnable Environments](http://arxiv.org/abs/2609.19134v1) | Geng, Huang et al. | Transforms scientific code repositories into structured, agent-friendly environments, overcoming barriers in correctness, conventions, and toolchain fragmentation. |
| [Evidence-Grounded Agentic Formulation Development in an Autonomous Laboratory](http://arxiv.org/abs/2609.19099v1) | Craig, Hickman et al. | Deploys an agentic system that reasons over experimental evidence to autonomously design drug formulations—advancing AI in lab automation. |
| [EviGen: Predictive Evidence Scaffolding for Verifiable Clinical Rationale Generation](http://arxiv.org/abs/2609.18852v1) | Li, Burre et al. | Uses predictive scaffolding to guide LLMs in extracting and justifying clinical evidence from EHRs—enabling faster, auditable decision support. |
| [Interpretable Multi-Instance Learning Enables Early Prediction of Key Molecular Alterations](http://arxiv.org/abs/2609.18825v1) | Legrand, Mimoun et al. | Achieves early prediction of AML mutations using flow cytometry data via interpretable MIL—potentially accelerating life-saving treatment decisions. |

---

### **Research Trend Signal**  
The 2026-09-18 ArXiv batch underscores a pivotal evolution in AI systems: from isolated models to **integrated, accountable, and adaptive agents**. A dominant thread is the move toward *dynamic, co-evolving architectures*—evident in infinite-parameter LLMs and CERA-MoA’s co-adaptive routing—suggesting future models will not be static but continuously recalibrated. Another emerging trend is *holistic evaluation*: benchmarks like ReFigBench, ASLEval, and ECtHR-NPD emphasize end-to-end behavior, privacy, and domain-specific validity, signaling a maturation beyond accuracy metrics. Additionally, there’s a growing emphasis on *mechanistic interpretability*—from causal probes in vision-language models to the Flag Game’s swarm behavior analysis—indicating a deeper focus on understanding collective intelligence. Finally, applications are increasingly grounded in real-world constraints: robotics with force-aware manipulation, medical diagnostics with explainability, and legal reasoning with monetary predictions—reflecting a shift toward deployable, responsible AI.

---

### **Worth Deep Reading**
1. **[Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data](http://arxiv.org/abs/2609.18842v1)**  
   This paper redefines the limits of model size and adaptation. By generating weights on-the-fly from streaming data, it offers a path to truly scalable, context-aware LLMs—challenging the very foundation of parameter storage and training. A must-read for researchers exploring next-gen model paradigms.

2. **[Compositional Policy Violations: When Step-Level Compliance Fails In Agentic AI Workflows](http://arxiv.org/abs/2609.18820v1)**  
   Critically exposes a fundamental flaw in current AI governance: per-step checks are insufficient for complex workflows. The paper’s case studies in regulated domains highlight urgent need for systemic policy enforcement—essential reading for practitioners deploying agents in healthcare, finance, or legal settings.

3. **[ASLEval: Measuring Privacy Exposure Displacement in LLM Agent Sessions](http://arxiv.org/abs/2609.18864v1)**  
   Offers a groundbreaking methodology for evaluating privacy risks across entire agent sessions. Its focus on hidden exposure paths makes it vital for anyone building or auditing tool-using agents—especially in sensitive domains like healthcare or finance.

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*