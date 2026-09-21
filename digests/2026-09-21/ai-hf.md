# Hugging Face 热门模型周报 2026-09-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-21 00:26 UTC

---

### **今日亮点**

Hugging Face 生态系统在多模态与效率驱动的创新方面持续加速。通义千问（Qwen）的领先地位愈发明显，**Qwen3.8-27B** 以 730 万次下载量位居榜首，而 **Qwen3.8-Flash-Next** 则获得 5,492 次点赞，充分展现了社区对高性能视觉语言模型的广泛采纳。GGUF 量化模型的兴起——尤其是来自 *unsloth*、*ISTA-DASLab* 与 *prism-ml* 等团队的工作——标志着向优化本地推理的转变，尤其适用于 Apple Silicon 和边缘设备部署。值得注意的是，*Lightricks 的 LTX-2.5* 与 *MiniMaxAI 的 MiniMax-H3* 正在引领视频生成趋势，而 *Edge0-35B-A3B-preview* 则凸显了混合专家（MoE）架构在可扩展推理中的日益增长的兴趣。

---

### **热门模型**

#### 🧠 语言模型（LLM、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,861 | 7,331,932 | 一款高效且具备对话能力的图文到文本模型，下载量巨大；适用于需要实时推理的多模态应用场景。 |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,769 | 5,910,102 | 当前最受欢迎的开源权重大模型之一，广泛用于科研与生产环境中的通用聊天和代码任务。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,494 | 1,908,396 | 基于三元压缩与 GGUF 格式的开创性 2 位量化 Llama 家族模型，实现超高效的设备端推理。 |

#### 🎨 多模态与生成（图像、视频、音频、文本转 X）

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,552 | 1,609,559 | 基于扩散机制的图文到视频模型，凭借高质量、文本引导的视频生成能力及出色的时序连贯性迅速走红。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,526 | 4,057,444 | 业界领先的多模态模型，支持图像转视频与文本转视频，现已成为该类别中下载量最高的模型之一。 |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 738 | 183 | 一个紧凑但强大的图像生成模型，针对编辑与创意工作流进行微调，基于 Diffusers 与 Safetensors 构建。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 915 | 17,403 | 一款拥有 30 亿参数的文本转音频模型，具备符号规划与代理式编辑能力，在生成音乐领域不断突破边界。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入表示）

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) | harshatheg | 476 | 0 | Qwen 的轻量级约束解码变体，专为结构化输出生成设计，通过 MLX 优化以适配 Apple Silicon。 |
| [TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B) | TokenRhythm | 980 | 11,913 | 基于 Qwen3.5 的代理式指令微调大模型，专为自主任务执行与动态决策设计。 |

#### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,428 | 6,941,478 | Qwen3.8-27B 最受欢迎的 GGUF 版本，因其速度与对 llama.cpp 及本地推理的良好兼容性广受好评。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,478 | 1,217,204 | 使用 GSQ 与 RCO 的混合精度量化方案，在性能与内存占用之间取得良好平衡，适用于边缘部署。 |
| [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) | prism-ml | 284 | 30,043 | Ternary-Bonsai 的 2 位压缩版本，专为 MLX 优化，可在 Apple Silicon 设备上实现低于 1GB 的推理内存占用。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,002 | 1,301,417 | 高度实验性的无审查微调模型，融合多种先进技术，适合红队测试与开放性编码任务。 |

---

### **生态信号**

截至 2026 年 9 月，Hugging Face 生态系统清晰地展现出向 **高效、可部署人工智能** 的转型。尽管 Qwen 与 Llama 系列仍占据主导地位，但 **Qwen 在 Flash、GSQ-RCO 与 GGUF 等变体上的拓展** 显示出生态系统的日趋成熟——性能与可访问性正成为核心优先项。以 *unsloth*、*ISTA-DASLab* 与 *prism-ml* 为代表的 **基于 GGUF 的模型激增**，表明社区在优化大型模型本地推理方面已形成强大动能，尤其聚焦于 Apple Silicon 与边缘设备。与此同时，**如 LTX-2.5 与 MiniMax-H3 这类多模态模型** 正推动视频生成潮流，预示着时序一致性与跨模态对齐技术的快速演进。尤为关键的是，**开源权重模型持续超越闭源替代品**，诸如 *Heretic-Uncensored* 与 *NeoCoder* 等微调模型充分展现了社区驱动实验的巨大潜力。像 **三元压缩（2 位）、GSQ 与混合精度** 等量化技术已不再小众，而是逐渐成为标准部署工具。这标志着从单纯追求模型规模，转向 **实际可用性** 的根本转变，反映出一个更加成熟、以用户为中心的人工智能新生态。

---

### **值得探索**

1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – 下载量超 690 万，是本地运行 Qwen3.8-27B 的事实标准。其对 `llama.cpp` 的良好兼容性与高速推理能力，使其成为开发者在消费级硬件上构建低延迟应用的必备选择。

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 下载量达 160 万，属于顶级图文转视频模型，非常适合寻求高保真、文本引导视频合成的创作者与开发者。其扩散单文件设计简化了在 ComfyUI 等工作流中的集成。

3. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)** – 开创性的 2 位量化模型，将模型压缩推向极限。对于研究极端效率或在资源受限设备上部署的科研人员而言，这是当前大模型优化领域的前沿代表。

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*