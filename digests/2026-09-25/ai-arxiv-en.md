# ArXiv AI Research Digest 2026-09-25

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-25 00:43 UTC

---

---

### **Today's Highlights**  
Recent submissions on ArXiv highlight a growing focus on *agent safety, reasoning efficiency, and real-world deployment* of AI systems. Notably, several papers tackle the challenge of ensuring reliable, safe behavior in autonomous agents—especially in multi-agent environments and long-horizon tasks—through novel world modeling, safety filters, and proactive risk assessment. Advances in efficient inference are also prominent, with new techniques for quantization, microscaling, and memory optimization enabling practical deployment on edge devices. Meanwhile, foundational work in language model interpretability and representation learning reveals that meaning identity is not embedded geometrically but computed dynamically—a shift with implications for retrieval and RAG systems.

---

### **Key Papers**

#### 🧠 Large Language Models (architecture, training, alignment, evaluation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Can LLMs Reason About Runtime Behavior? A Repository-Level Dynamic Benchmark](http://arxiv.org/abs/2609.28449v1) | Hamed Taherkhani et al. | Introduces a dynamic benchmark to evaluate LLMs’ ability to reason about code execution across repositories—critical for trustworthy code generation. This shifts focus from static understanding to behavioral prediction in real-world contexts. |
| [ForgetMimic: Motion Unlearning for Reinforcement Learning Humanoid Control](http://arxiv.org/abs/2609.28378v1) | Xukun Luan et al. | Proposes a method to selectively erase specific motions from learned policies, enabling safer, more controllable humanoid control. This addresses a key gap in policy editing for real-world robotics. |
| [Learning Holographic Reduced Representations with Clifford Variational Autoencoders](http://arxiv.org/abs/2609.28409v1) | Mohamed Malek Abid et al. | Uses Clifford algebra to embed unstructured data into holographic representations, offering a mathematically grounded approach to symbolic computation in high-dimensional spaces. |

#### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Agent-Editing World Model: Rethinking World Modeling for LLM Agents](http://arxiv.org/abs/2609.28416v1) | Shuang Sun et al. | Challenges conventional world models by proposing agent-editable latent representations that evolve through interaction—enabling dynamic, interactive planning in complex environments. |
| [Controlling Collectives of AI Agents in Reasoning Space with Spatial Transformers](http://arxiv.org/abs/28247v1) | Frederic Vatnsdal et al. | Introduces COMPASS, a decentralized framework using spatial transformers to coordinate large-scale agentic robot collectives, overcoming scalability limits of traditional LLM-based planning. |
| [PASTABench: Proactive Assessment of Sequential Trajectories for Agent Safety](http://arxiv.org/abs/2609.28197v1) | Jiapeng Sun et al. | Presents a benchmark for detecting unsafe behaviors early in multi-step agent workflows, moving beyond post-hoc evaluation toward proactive safety assurance. |

#### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [MicroQonv: Reshaping Convolution Tensors for Efficient Microscaling](http://arxiv.org/abs/2609.28358v1) | Romain Facq et al. | Introduces MicroQonv, a tensor reshaping technique enabling efficient microscaling in convolutions—critical for deploying low-bit quantized models on edge hardware without performance loss. |
| [RAMP: Robust Adaptive Mixed-Precision Quantization for Edge CPU Vision Models](http://arxiv.org/abs/2609.28262v1) | David Población-Criado et al. | Develops RAMP, an adaptive quantization method that tailors precision per layer based on robustness metrics—balancing accuracy and latency on resource-constrained CPUs. |
| [Predicting Quantization Price for Selecting PTQ Configurations Before Deployment](http://arxiv.org/abs/2609.28270v1) | Junbin Qiu et al. | Proposes a predictive model to estimate quantization-induced degradation before full PTQ execution—reducing trial-and-error in deployment pipelines. |
| [Support-Compiled Feature Folding: More Evidence at Lower Memory Across Tabular Foundation Models](http://arxiv.org/abs/2609.28208v1) | Tian Zhou et al. | Introduces SCFF, a training-free inference method that compresses tabular features via support-compilation—maintaining predictive power while drastically reducing memory footprint. |

#### 📊 Applications (domain-specific, multimodal, code generation)
| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Cross-Scale Transfer Learning for Depression Severity Prediction](http://arxiv.org/abs/2609.28430v1) | Wenjie Feng et al. | Applies sequential LoRA adaptation to transfer depression severity prediction from PHQ-8 to HAMD-17 across languages—addressing critical data scarcity in mental health NLP. |
| [AnchorReasoning: A Visual Grounding and Causal Reasoning Dataset in Long-Tail Autonomous Driving Scenarios](http://arxiv.org/abs/2609.28366v1) | Zhipeng Bao et al. | Builds AnchorReasoning, a dataset linking visual evidence to causal decisions in rare driving events—advancing explainable, robust VLMs for autonomous vehicles. |
| [Mizar: A 159M-Parameter Audio-Language Model for Audio Understanding](http://arxiv.org/abs/2609.28344v1) | Kaiyang Li et al. | Presents Mizar, a compact audio-language model optimized for mobile deployment—enabling contextual audio understanding on-device without sacrificing performance. |

---

### **Research Trend Signal**  
A clear trend emerging from today’s submissions is the *convergence of safety, efficiency, and adaptability* in AI systems. Researchers are increasingly shifting from pure capability scaling toward *deployable, controllable, and interpretable* architectures—evidenced by frameworks like PASTABench and ForgetMimic, which prioritize operational safety and editability. Simultaneously, there is strong momentum in *efficient inference*: microscaling, mixed-precision quantization, and feature folding reflect a maturing focus on edge deployment and low-latency execution. Another undercurrent is the move toward *dynamic, executable understanding*, particularly in code and agent reasoning, where static benchmarks are being replaced by runtime-aware evaluations. The integration of formal methods (e.g., CBFs, score matching) with deep learning further signals a desire for rigor and provable guarantees—especially in robotics and healthcare applications.

---

### **Worth Deep Reading**
1. **[PASTABench: Proactive Assessment of Sequential Trajectories for Agent Safety](http://arxiv.org/abs/2609.28197v1)**  
   This paper introduces a paradigm shift in agent evaluation—from reactive to proactive safety assessment. With LLM agents now acting in real-world workflows, detecting hazardous sequences early is crucial. The benchmark’s design for longitudinal trajectory analysis sets a new standard for evaluating long-horizon autonomy.

2. **[ForgetMimic: Motion Unlearning for Reinforcement Learning Humanoid Control](http://arxiv.org/abs/2609.28378v1)**  
   Unlike typical fine-tuning or distillation approaches, this work tackles *policy erasure*—a rare but essential capability for ethical and safe robotics. Its method enables precise removal of unwanted behaviors, offering a powerful tool for intervention and compliance in physical systems.

3. **[Support-Compiled Feature Folding: More Evidence at Lower Memory Across Tabular Foundation Models](http://arxiv.org/abs/2609.28208v1)**  
   In the era of massive tabular models, memory remains a bottleneck. This paper offers a clever, training-free solution that preserves information density while slashing storage—ideal for real-time analytics and industrial deployment. It exemplifies the kind of pragmatic innovation needed to scale foundation models beyond vision and language.

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*