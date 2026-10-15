# ArXiv AI Research Digest 2026-10-15

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-10-15 00:46 UTC

---

---

### **Today's Highlights**

Recent submissions on ArXiv (2026-10-15) highlight a pivotal shift toward *autonomous, self-improving AI systems*, particularly in robotics and long-horizon agent frameworks. Key advances include SEAR and Self-Evolving Agent Harness, which formalize recursive self-improvement (RSI) in physical agents—moving beyond human-in-the-loop tuning. There is growing focus on *efficient reasoning* through training-free decoding (DoubtLess), *token-level reward attribution* (Unlocking Token Rewards), and *structured context management* (Pack Light, CarryOn). Meanwhile, multimodal understanding is being re-evaluated via holistic benchmarks like OmniCompass and rigorous evaluations of LLM-generated content against real-world standards (e.g., Sitreps, SolBehave). These works collectively signal a maturing ecosystem where agents are not just reactive but proactive, self-correcting, and grounded in verifiable outcomes.

---

### **Key Papers**

#### 🧠 Large Language Models (architecture, training, alignment, evaluation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [What Matters in Quality-Aware VLA Pretraining: A Benchmark and Empirical Study](http://arxiv.org/abs/2610.18869v1) | Mingxuan Yan et al. | Proposes a systematic benchmark comparing weighting, filtering, and conditioning strategies for demonstration quality in VLA pretraining. This clarifies how to leverage suboptimal human data effectively, improving generalization without costly retraining. |
| [Rubrics from the Task, Verdicts from Evidence: Pointwise Rubric Rewards with Tool-Augmented Judges](http://arxiv.org/abs/2610.18766v1) | Tianci Liu et al. | Introduces rubric-based reward modeling that derives criteria directly from tasks, not responses, reducing bias. Enables more interpretable, generalizable evaluation of LLM outputs using tool-augmented judges. |
| [Read the Room Before Your Model Generates](http://arxiv.org/abs/2610.18820v1) | Muyao Kong et al. | Challenges fixed temperature heuristics by proposing geometrically interpretable calibration. Offers a principled way to tune randomness based on input context, improving output consistency and reliability. |

#### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Tev: Scaling Long-Horizon Agentic Environments with Dense Progress Rewards](http://arxiv.org/abs/2610.18868v1) | Wenbo Hu et al. | Presents a framework for dense progress rewards to enable long-horizon agents to operate autonomously for hours or days. Addresses critical scalability issues in RSI and automated discovery. |
| [SkillScaffold: Scaffolding Agentic Reinforcement Learning with Policy-Adaptive Skill Credit Assignment](http://arxiv.org/abs/2610.18807v1) | Wenlin Zhong et al. | Introduces adaptive skill credit assignment that dynamically allocates rewards based on policy performance. Enhances exploration and learning efficiency in agentic RL without requiring new model training. |
| [Self-Evolving Agent Harness](http://arxiv.org/abs/2610.18813v1) | Chuyang Wei et al. | Formalizes a feedback-driven process for evolving agent scaffolding (prompts, memory, workflows) while keeping model weights fixed. Enables continuous, autonomous improvement of agent design. |
| [SEAR: Self-Evolving Agentic Robotics](http://arxiv.org/abs/2610.18792v1) | Xinyi Wang et al. | Introduces SEAR—a framework and benchmark for physical robots that learn and improve their own control policies via self-experimentation. Demonstrates true physical recursive self-improvement (Physical RSI). |

#### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [DoubtLess: Training-Free Contrastive Decoding for Efficient Reasoning](http://arxiv.org/abs/2610.18862v1) | Minghao Luo et al. | Proposes a training-free method to shorten chains of thought by identifying redundant reasoning steps. Achieves comparable accuracy with fewer tokens—ideal for low-latency deployment. |
| [SP$^2$ec: Adaptive Self-Speculative Decoding for Vision-Language Models](http://arxiv.org/abs/2610.18735v1) | Yuqi Huang et al. | Adapts speculative decoding for multimodal models by reusing internal representations across modalities. Significantly improves throughput without sacrificing accuracy in vision-language generation. |
| [Unlocking Token Rewards via Training-Free Reward Attribution](http://arxiv.org/abs/2610.18704v1) | Sitong Wu et al. | Develops a method to extract per-token reward signals from existing reward models without retraining. Enables fine-grained feedback for debugging and reinforcement learning. |
| [Two Clocks: Why Larger Rollout Batches Learn Slower but Fail on Schedule in RLVR](http://arxiv.org/abs/2610.18853v1) | Yuante Li et al. | Reveals a counterintuitive trade-off: larger rollout batches slow down learning despite higher sample efficiency. Provides theoretical insight into scaling laws in RL with verifiable rewards. |

#### 📊 Applications (domain-specific, multimodal, code generation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [AesCode: Aesthetic Code Generation with Decoupled Cross-Modal Rewards](http://arxiv.org/abs/2610.18860v1) | Xin Gao et al. | Enables LLMs to generate visually coherent code for slides and dashboards by decoupling layout, color, and semantic structure. Bridges the gap between aesthetic intent and executable output. |
| [PreciseCoder: Faithful and Generalizable Debugging Beyond Unit-Test Rewards](http://arxiv.org/abs/2610.18755v1) | Yunkai Zhan et al. | Exposes limitations of unit-test-only rewards in code debugging and proposes a more faithful reward mechanism. Improves model generalization and reduces overfitting to test cases. |
| [SolBehave: Evaluating the Behavioural Correctness of LLM-Generated Smart Contracts](http://arxiv.org/abs/2610.18745v1) | Giovanni Pio Delvecchio et al. | Introduces a behavioral benchmark for Solidity contracts, going beyond compilation checks. Ensures generated smart contracts behave safely and correctly under diverse conditions. |
| [LIBERO-RIG: A Hardware-Setup Robustness Benchmark for Vision-Language-Action Models](http://arxiv.org/abs/2610.18843v1) | Andrea Yaoyun Cui et al. | Presents a benchmark testing VLA models under realistic robot hardware variations (camera shifts, wear, drift). Critical for assessing real-world robustness in embodied AI. |

---

### **Research Trend Signal**

A dominant theme emerging from today’s submissions is the **transition from static, task-specific AI to dynamic, self-evolving systems**. The convergence of agentic frameworks (SEAR, Self-Evolving Agent Harness), long-horizon planning (Tev), and recursive self-improvement (Physical RSI) suggests a paradigm shift: agents are no longer just tools but *autonomous learners*. This is reinforced by methodological innovations such as training-free reward attribution and contrastive decoding, which reduce dependency on costly retraining. Simultaneously, there’s a strong emphasis on *verifiability and accountability*—from rubric-based evaluation to behavioral correctness in smart contracts—indicating maturity in AI safety and trustworthiness. Multimodal grounding is also advancing beyond simple alignment, with benchmarks like OmniCompass and AIRRI addressing holistic understanding and resistance to AI exploitation. Together, these trends point toward a future where AI systems are not only capable but *self-aware*, *self-correcting*, and *resilient*—a crucial step toward trustworthy autonomy.

---

### **Worth Deep Reading**

1. **[SEAR: Self-Evolving Agentic Robotics](http://arxiv.org/abs/2610.18792v1)**  
   *Why*: This paper defines and demonstrates Physical Recursive Self-Improvement—a milestone in robotics. It presents both a framework and a benchmark to evaluate whether an agent is truly learning, not just memorizing. Its implications extend beyond robotics into broader AI development, offering a blueprint for autonomous system evolution.

2. **[Unlocking Token Rewards via Training-Free Reward Attribution](http://arxiv.org/abs/2610.18704v1)**  
   *Why*: This work enables granular, post-hoc analysis of model behavior by attributing rewards to individual tokens—without retraining. It opens new avenues for interpretability, debugging, and efficient reinforcement learning, making it foundational for next-generation agent evaluation.

3. **[DoubtLess: Training-Free Contrastive Decoding for Efficient Reasoning](http://arxiv.org/abs/2610.18862v1)**  
   *Why*: In a world where inference cost is a bottleneck, this method shortens reasoning paths without additional training. It offers a rare combination of simplicity, effectiveness, and deployability—making it immediately relevant for production-scale LLM applications.

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*