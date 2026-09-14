# Hugging Face 热门模型周报 2026-09-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-14 08:46 UTC

---

### **今日亮点**

Qwen 在 Hugging Face 上的领先地位持续扩大，*Qwen3.8-27B* 以 780 万次下载和 15,058 次点赞领跑，巩固了其顶级多模态模型的地位。GGUF 量化版本的激增——尤其是 *unsloth/Qwen3.8-27B-GGUF*（1100 万次下载）——反映出社区对轻量级、边缘友好型推理模型的强烈需求。与此同时，Lightricks 的 *LTX-2.5* 在视频生成领域崭露头角，下载量达 150 万次，凸显人们对高性能图像转视频模型日益增长的兴趣。MiniCPM5 和 Nex-N2.5 系列正受到开发者青睐，成为大型模型之外高效、开源权重的替代选择。

---

### **热门模型**

#### 🧠 语言模型（LLMs、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,303 | 244,457 | 针对低延迟推理优化的 DeepSeek-V4.1 快速版本；因在文本生成任务中的速度与效率而广受欢迎。 |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,362 | 150,110 | 基于 LLaMA 架构的紧凑型、开源权重 20 亿参数模型；适用于移动端与边缘部署。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,161 | 21,336 | 专为实时交互设计的轻量级 40 亿参数语言模型；因其响应迅速且资源占用极低而备受赞誉。 |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,588 | 5,620,539 | 本周下载量最高的模型之一；广泛应用于指令遵循与对话式 AI 场景。 |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,746 | 7,979 | 基于 Qwen3.5 构建的智能体语言模型，专为自主推理设计；以其轻量但强大的规划能力著称。 |

#### 🎨 多模态与生成（图像、视频、音频、文本转任意）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,058 | 7,768,964 | 功能高度灵活的多模态模型，支持图像-文本-文本生成；凭借准确性与广泛应用场景引发大规模采用。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,787 | 1,548,442 | 当前顶尖的图像转视频扩散模型；现已成为创意内容生成领域下载量最高的模型之一。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,263 | 4,819,845 | 强大的多模态视频生成模型，支持文本/图像转视频；深受数字创作者欢迎，人气快速上升。 |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 383 | 123,491 | 针对电影级输出优化的 MiniMax-H3 微调版本；展现了社区对核心模型的持续增强能力。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,317 | 1,576,209 | 针对快速图像-文本-文本任务优化的 GLM-5.3 闪存模型；凸显对低延迟多模态推理日益增长的兴趣。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,957 | 252,806,720 | 全球下载量最高的嵌入模型；凭借速度与效率，特别适合语义搜索与检索任务。 |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 781 | 797,832 | Google 最新时间序列预测模型；在长周期预测方面表现卓越，具备强大的预训练基础。 |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 437 | 30,310 | 针对网络安全推理训练的专用 FP8 量化版 GLM 变体；以移除拒绝行为和激进策略绕过能力著称。 |

#### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,052 | 11,005,880 | Qwen3.8-27B 最受欢迎的 GGUF 量化版本；通过 UnSloth 优化管道，可在消费级硬件上实现本地推理。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 985 | 769,557 | 使用 GSQ 与 RCO 量化技术的混合精度 GGUF 模型；在性能与文件大小之间取得平衡，适合边缘部署。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 651 | 750,591 | 经多重微调、重度修改且未加限制的 Qwen 变体；反映了社区对可定制、无过滤模型的强烈需求。 |
| [Alissonerdx/Minimax-H3-ComfyUI](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI) | Alissonerdx | 148 | 11,860 | 适配 ComfyUI 的 MiniMax-H3 LoRA 适配器；体现了模型向可视化工作流工具集成的趋势。 |
| [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 222 | 99,716 | MiniCPM5-2B 的 GGUF 量化版本；彰显小型模型本地推理普及化的趋势。 |

---

### **生态信号**

2026 年 9 月的 Hugging Face 生态系统呈现出明确的转向：**开源权重、可部署模型** 成为主流，社区驱动的增强持续深化。**Qwen** 与 **GLM** 系列在各分类中占据主导地位，尤其在多模态与量化形式上表现突出，表明它们已在研究与生产环境中根深蒂固。值得注意的是，**GGUF** 已成为本地推理的事实标准，仅 *unsloth/Qwen3.8-27B-GGUF* 一项便获得超 1100 万次下载，反映出对基于 CPU/GPU 加速、可移植模型的广泛采纳。**微调、未加限制、智能体变体**（如 *DavidAU* 的 Heretic 系列、*TokenRhythm* 的 NeoHorse）的兴起，凸显了超越基础能力的定制化、高性能模型的强劲需求。与此同时，**视频生成** 正加速发展，由 Lightricks 与 MiniMaxAI 领军，预示着创意 AI 堆栈日趋成熟。开源模型在下载速度上持续超越专有模型，进一步强化了开源权重运动的发展势头。

---

### **值得探索**

1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – 超过 1100 万次下载，该 GGUF 优化模型是本地推理的黄金标准。适合希望在无需依赖云服务的情况下，在消费级硬件上实现高性能的开发者。

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 下载增长最快的视频模型之一，提供电影级质量的图像转视频合成效果。对探索生成式视频工作流的创作者而言，必试之选。

3. **[dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8)** – 小众但强大的模型，具备去拒绝行为与 FP8 量化特性。为未来对抗性 AI 训练与策略绕过技术提供了前瞻性洞察。

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*