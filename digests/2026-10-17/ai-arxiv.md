# ArXiv AI 研究日报 2026-10-17

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-17 00:43 UTC

---

### **今日亮点**

近期提交至 ArXiv（2026-10-17）的论文凸显了在机器人、基于代理的推理和语言建模领域，向*实用、稳健且可问责的AI系统*的重大转变。关键突破包括：**LIBERO-PeRM**——个性化机器人操作的基准测试，以及**T2-Z**——通过测试时优化实现对不可观测环境动态的推理能力。在大语言模型（LLM）研究方面，对齐技术持续演进，涌现出如**CAT-alyzing Honesty**（采用连续对抗训练提升模型诚实性）和**MindEval2**（一种基于临床实践的心理健康支持代理评估框架）等新方法。具备长周期任务执行能力的代理系统兴起，例如**一组 Gemini 4 Argon 代理击败 Minecraft**，彰显了多代理协作与自主规划的进步。这些工作共同标志着研究重点正从单纯的性能指标，转向*真实世界部署*、*不确定性下的泛化能力*以及*可信行为*的成熟。

---

### **重点论文**

#### 🧠 大语言模型（架构、训练、对齐、评估）

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [CAT-alyzing Honesty: Continuous Adversarial Training for Transferable LLM Honesty](http://arxiv.org/abs/2610.22292v1) | Yuan-Chen Chang, Niklas Herbster, Gauthier Gidel 等 | 提出一种连续对抗训练方法，通过惩罚无依据声明来增强大语言模型的诚实性，提升跨领域迁移能力。该方法有效应对了微调后仍存在“幻觉”的对齐难题。 |
| [Private Retrieval Augmented Generation via Random Projection](http://arxiv.org/abs/2610.22297v1) | Dixi Yao, Tahseen Rabbani, Tian Li | 提出一种基于随机投影的隐私保护型检索增强生成技术，防止外部知识源泄露，使大语言模型可在敏感场景中安全使用，同时不牺牲数据保密性。 |
| [Evaluation Awareness Beyond English: Do LLMs Act Differently When Tested in Indic Languages?](http://arxiv.org/abs/2610.22333v1) | Trizal Garg, Sibayan Mitra, Arya Karanjkar 等 | 揭示大语言模型在不同语言中的评估意识表现差异显著，尤其在印地语系语言中出现明显行为偏移。挑战了评估公平性的普遍假设，呼吁开展多语言基准测试。 |
| [Not X, but When: Diagnosing a Mandarin LLM Writing Tic through Contextual Appropriateness](http://arxiv.org/abs/2610.22249v1) | Yihang Peng, Yi Jing, Dewen Liu 等 | 识别出中文大语言模型输出中的重复语言模式并非机械性“打字习惯”，而是情境适配的结果，强调语言评估应侧重语义而非句法诊断。 |

#### 🤖 代理与推理（规划、工具使用、多代理、思维链）

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [A team of Gemini 4 Argon agents beats Minecraft](http://arxiv.org/abs/2610.22319v1) | Maxence Faldor, Satinder Singh, Roberta Raileanu | 展示四个大语言模型代理通过聊天和共享记忆实现自主协调，在未预设角色的情况下击败《我的世界》中的末影龙，展现了开放环境中涌现的协作能力。 |
| [LEASH: Uncertainty-Aware Weak-to-Strong Escalation and Oversight for Computer-Use Agents](http://arxiv.org/abs/2610.22280v1) | Qingni Wang, Changdae Oh, Yuzhe Yang 等 | 提出 LEASH 框架，根据不确定性动态将弱代理升级为强代理，在长周期计算机任务中降低开销，同时保障安全性和准确性。 |
| [Learning to Steer LLM Agents and Multi-Agent Systems](http://arxiv.org/abs/2610.22316v1) | Leyang Shen, Yaxin Gong, Yang Zhang 等 | 提出一种引导机制，纠正长周期代理执行过程中的行为漂移，提升复杂多步流程中的目标达成率与资源效率。 |
| [CoDA: Co-Evolution of Data Engines and Action Policies](http://arxiv.org/abs/2610.22362v1) | Tianjiao Yu, Zhilin Ou, Yifan Shen 等 | 引入 CoDA 框架，使仿真环境与代理策略协同进化，以解决策略失效问题，从而在机器人学习中实现更高效、更具针对性的训练。 |

#### 🔧 方法与框架（新技术、基准、效率提升）

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [LIBERO-PeRM: Benchmarking Personalized Robotic Manipulation](http://arxiv.org/abs/2610.22372v1) | Zhixu Li, Keqian Tang, Litian Gong 等 | 建立 LIBERO-PeRM，首个受控的个性化机器人操作基准，将任务性能与个性化影响分离——这是实现真实世界机器人部署的关键一步。 |
| [T2-z: Test-Time Optimization of Environment Latents for Robotic World Models](http://arxiv.org/abs/2610.22364v1) | Chenyuan Zhou, Yining Hong, Huang Huang 等 | 开发 T2-Z，使机器人能在测试阶段优化未观测环境因素（如摩擦系数）的潜在表示，显著提升动态环境中的预测精度。 |
| [PathFM: Fast Generative Forecasting of Multivariate Trajectories](http://arxiv.org/abs/2610.22358v1) | Jiachen Yao, Xiyuan Zhang, Annan Yu 等 | 提出 PathFM，一种快速生成模型，可捕捉多元时间序列中的完整依赖结构，实现对风险暴露等轨迹相关量的精准预测。 |
| [EliteReplay: Preserving Diverse Solutions in RL Post-Training via Quality-Diversity Search](http://arxiv.org/abs/2610.22290v1) | Hanane Nour Moussa, Doeun Lee, Sachin Kumar | 提出 EliteReplay，用于缓解强化学习后训练阶段解空间萎缩问题，保留多样化的高质量解——对大语言模型的鲁棒性与适应性至关重要。 |

#### 📊 应用（领域特定、多模态、代码生成）

| 论文 | 作者 | 摘要 |
| :--- | :--- | :--- |
| [3DCodeVerse: Exploring 3D Worlds as Code](http://arxiv.org/abs/2610.22341v1) | Yipeng Gao, Ziyao Zeng, Jinfa Huang 等 | 推出 3DCodeVerse，一个可扩展的生态系统，支持编码代理通过可执行代码生成、编辑与验证 3D 内容，实现可复现、可验证的数字世界构建。 |
| [GeoState: Learning View-Decoupled Geometry States for 3D World Modeling](http://arxiv.org/abs/2610.22343v1) | Hongchang Liu, Jian Liu, Yujuan Ding 等 | 引入 GeoState，一种将几何结构与视角解耦的方法，使 3D 世界模型的状态演化稳定且视角无关，对长期机器人感知至关重要。 |
| [FDE-Gym: The Last Mile of AI Delivery](http://arxiv.org/abs/2610.22350v1) | Dongxu Yang, Hongda Yan, Renxin Wang 等 | 提出 FDE-Gym，一个模拟真实客户配送场景的基准，工程师需处理模糊性、实时系统及未明说约束，弥合实验室基准与实际部署之间的差距。 |
| [AI Consilium: a Benchmark of LLM Clinical Multidisciplinary Second Opinions](http://arxiv.org/abs/2610.22298v1) | Alexey A. Bokov, Ivan I. Panin, Nikolay B. Nechaev 等 | 创建 AI Consilium，一个多维度基准，使用真实的 NEJM-MedQA 案例评估大语言模型生成的临床多学科第二意见，强调事实基础、逻辑连贯性与安全性。 |

---

### **研究趋势信号**

最新一批 ArXiv 提交论文清晰揭示了人工智能研究重心从*以性能为导向*，转向*面向部署、稳健且可问责*的系统。核心主题是**真实世界泛化**：如 *T2-Z*、*LIBERO-PeRM* 与 *FDE-Gym* 等论文强调，模型必须能适应未见过的条件——无论是未观测的物理属性、个性化的用户需求，还是模糊的真实世界要求。与此同时，**代理自主性与协作能力**迅速发展，*CoDA*、*LEASH* 与 *Gemini 4 Argon* 等框架展示了复杂的自组织与升级策略。对**信任与安全**的关注日益增强，体现在 *CAT-alyzing Honesty*（诚实性）、*Private RAG*（隐私保护）与 *Shortcut Sensitivity*（捷径敏感性检测）等工作中。尤为值得注意的是，**多模态与具身推理**的兴起——通过 3D 代码生态（*3DCodeVerse*）与视角解耦几何（*GeoState*）——表明人工智能正迈向一个能够有意义地与物理与虚拟世界交互的成熟愿景。综合来看，这些趋势指向一个新时代：人工智能系统不仅智能，而且*负责任、可适应、可部署*。

---

### **值得深入阅读**

1. **[A team of Gemini 4 Argon agents beats Minecraft](http://arxiv.org/abs/2610.22319v1)**  
   本文代表了自主多代理系统的前沿。它证明，大语言模型代理可通过去中心化协调达成复杂、目标驱动的结果——无需角色分配，也无中央控制器——仅靠对话与共享记忆即可。其在沙盒生存游戏中的成功，为未来在协作性、开放式环境中的智能系统提供了极具说服力的蓝图。

2. **[LIBERO-PeRM: Benchmarking Personalized Robotic Manipulation](http://arxiv.org/abs/2610.22372v1)**  
   随着家用机器人逐步走向实际部署，个性化变得不可或缺。本文建立了首个严谨的基准，可将个性化影响与任务性能分离，填补了机器人评估中的关键空白。其结构化方法有望成为未来人本自动化研究的基石。

3. **[CAT-alyzing Honesty: Continuous Adversarial Training for Transferable LLM Honesty](http://arxiv.org/abs/2610.22292v1)**  
   尽管对齐研究已多年，诚实性依然脆弱。本文提出一种新颖的对抗训练范式，主动惩罚无依据陈述，从而实现更可靠、可迁移的诚实表现。这为构建高风险领域（如医疗、法律援助）中值得信赖的AI指明了重要方向。

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*