# ArXiv AI 研究日报 2026-10-15

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-15 00:46 UTC

---

### **今日亮点**

2026年10月15日提交至ArXiv的最新研究突出体现了一种向*自主、自我进化型AI系统*的转变，尤其在机器人和长周期智能体框架中表现显著。关键进展包括SEAR与Self-Evolving Agent Harness，它们为物理智能体中的递归自我改进（RSI）提供了形式化定义——突破了人工介入调参的局限。当前研究愈发聚焦于*高效推理*，通过无训练解码（DoubtLess）、*token级奖励归因*（Unlocking Token Rewards）以及*结构化上下文管理*（Pack Light, CarryOn）等方法实现。与此同时，多模态理解正通过全息基准如OmniCompass，以及对大模型生成内容与真实世界标准的严格评估（如Sitreps、SolBehave）重新审视。这些工作共同预示着一个日益成熟的生态系统：智能体不再仅是被动响应，而是主动、自我修正，并以可验证结果为根基。

---

### **重点论文**

#### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [What Matters in Quality-Aware VLA Pretraining: A Benchmark and Empirical Study](http://arxiv.org/abs/2610.18869v1) | Mingxuan Yan 等 | 提出一个系统性基准，用于比较演示质量在VLA预训练中的加权、过滤与条件策略。明确了如何有效利用低质量人类数据，提升泛化能力而无需昂贵的重新训练。 |
| [Rubrics from the Task, Verdicts from Evidence: Pointwise Rubric Rewards with Tool-Augmented Judges](http://arxiv.org/abs/2610.18766v1) | Tianci Liu 等 | 引入基于任务规则的奖励建模方法，准则直接源自任务而非输出，降低偏见。结合工具增强型裁判，实现更可解释、更具泛化性的LLM输出评估。 |
| [Read the Room Before Your Model Generates](http://arxiv.org/abs/2610.18820v1) | Muyao Kong 等 | 挑战固定的温度启发式策略，提出具有几何可解释性的校准方法。提供一种基于输入上下文调节随机性的原则性方式，提升输出一致性与可靠性。 |

#### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [Tev: Scaling Long-Horizon Agentic Environments with Dense Progress Rewards](http://arxiv.org/abs/2610.18868v1) | Wenbo Hu 等 | 提出一种密集进度奖励框架，使长周期智能体可自主运行数小时甚至数天。解决RSI与自动化发现中的关键可扩展性问题。 |
| [SkillScaffold: Scaffolding Agentic Reinforcement Learning with Policy-Adaptive Skill Credit Assignment](http://arxiv.org/abs/2610.18807v1) | Wenlin Zhong 等 | 提出自适应技能信用分配机制，根据策略表现动态分配奖励。在不需新模型训练的前提下，提升智能体强化学习中的探索效率与学习效率。 |
| [Self-Evolving Agent Harness](http://arxiv.org/abs/2610.18813v1) | Chuyang Wei 等 | 形式化一种反馈驱动的智能体框架演化流程（提示、记忆、工作流），同时保持模型权重固定。实现智能体设计的持续、自主优化。 |
| [SEAR: Self-Evolving Agentic Robotics](http://arxiv.org/abs/2610.18792v1) | Xinyi Wang 等 | 提出SEAR——一套面向物理机器人的自演化智能体框架与基准，支持通过自我实验学习并改进控制策略。首次实现真正的物理领域递归自我改进（Physical RSI）。 |

#### 🔧 方法与框架（新技术、基准、效率提升）

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [DoubtLess: Training-Free Contrastive Decoding for Efficient Reasoning](http://arxiv.org/abs/2610.18862v1) | Minghao Luo 等 | 提出一种无训练方法，通过识别冗余推理步骤缩短思维链。在减少token消耗的同时保持相近准确率，适用于低延迟部署场景。 |
| [SP$^2$ec: Adaptive Self-Speculative Decoding for Vision-Language Models](http://arxiv.org/abs/2610.18735v1) | Yuqi Huang 等 | 将推测解码适配至多模态模型，通过跨模态复用内部表示。显著提升视觉-语言生成吞吐量，且不牺牲准确性。 |
| [Unlocking Token Rewards via Training-Free Reward Attribution](http://arxiv.org/abs/2610.18704v1) | Sitong Wu 等 | 开发一种无需重训练即可从现有奖励模型中提取逐token奖励信号的方法。支持细粒度反馈，用于调试与强化学习。 |
| [Two Clocks: Why Larger Rollout Batches Learn Slower but Fail on Schedule in RLVR](http://arxiv.org/abs/2610.18853v1) | Yuante Li 等 | 揭示了一个反直觉现象：尽管大批次回放具备更高的样本效率，却反而减慢学习速度。为具有可验证奖励的强化学习中的缩放规律提供理论洞见。 |

#### 📊 应用（领域特定、多模态、代码生成）

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [AesCode: Aesthetic Code Generation with Decoupled Cross-Modal Rewards](http://arxiv.org/abs/2610.18860v1) | Xin Gao 等 | 通过解耦布局、色彩与语义结构，使LLM能够生成视觉一致的幻灯片与仪表板代码。弥合审美意图与可执行输出之间的鸿沟。 |
| [PreciseCoder: Faithful and Generalizable Debugging Beyond Unit-Test Rewards](http://arxiv.org/abs/2610.18755v1) | Yunkai Zhan 等 | 揭示仅依赖单元测试奖励在代码调试中的局限性，提出更忠实的奖励机制。提升模型泛化能力，降低对测试用例的过拟合。 |
| [SolBehave: Evaluating the Behavioural Correctness of LLM-Generated Smart Contracts](http://arxiv.org/abs/2610.18745v1) | Giovanni Pio Delvecchio 等 | 引入针对Solidity合约的行为基准，超越编译检查。确保生成的智能合约在多样条件下行为安全且正确。 |
| [LIBERO-RIG: A Hardware-Setup Robustness Benchmark for Vision-Language-Action Models](http://arxiv.org/abs/2610.18843v1) | Andrea Yaoyun Cui 等 | 提出一个基准，测试VLA模型在真实机器人硬件变化（摄像头偏移、磨损、漂移）下的鲁棒性。对评估具身AI在现实世界中的稳定性至关重要。 |

---

### **研究趋势信号**

今日投稿中浮现的核心主题是**从静态、任务专用型AI向动态、自我演进系统的转型**。智能体框架（SEAR、Self-Evolving Agent Harness）、长周期规划（Tev）与递归自我改进（物理RSI）的融合，预示着范式转变：智能体不再只是工具，而是*自主学习者*。这一趋势由一系列方法论创新进一步强化，如无训练奖励归因与对比解码，显著降低了对昂贵再训练的依赖。同时，对*可验证性与责任性*的强调不断增强——从基于规则的评估到智能合约的行为正确性，反映出AI安全性与可信度的成熟。多模态基础也已超越简单对齐，OmniCompass与AIRRI等基准致力于实现整体理解能力及对AI滥用的抗性。综合来看，这些趋势指向未来：AI系统不仅具备能力，还将拥有*自我意识*、*自我修正*与*抗脆弱性*——迈向可信自主的关键一步。

---

### **值得深入阅读**

1. **[SEAR: Self-Evolving Agentic Robotics](http://arxiv.org/abs/2610.18792v1)**  
   *为何*：本文定义并实证了物理领域递归自我改进（Physical RSI）——机器人学里程碑。提出框架与基准，用于判断智能体是否真正学习而非仅记忆。其影响远超机器人范畴，为自主系统演化提供蓝图。

2. **[Unlocking Token Rewards via Training-Free Reward Attribution](http://arxiv.org/abs/2610.18704v1)**  
   *为何*：该工作通过无重训练方式将奖励归因至单个token，实现对模型行为的细粒度、事后分析。为可解释性、调试与高效强化学习开辟新路径，是下一代智能体评估的基石。

3. **[DoubtLess: Training-Free Contrastive Decoding for Efficient Reasoning](http://arxiv.org/abs/2610.18862v1)**  
   *为何*：在推理成本成为瓶颈的世界中，该方法无需额外训练即可缩短推理路径。兼具简洁性、有效性与可部署性，是生产级大模型应用中极为实用的解决方案。

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*