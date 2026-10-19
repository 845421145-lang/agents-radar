# Hugging Face 热门模型周报 2026-10-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-19 00:24 UTC

---

### **今日亮点**

Hugging Face Hub 在多模态与量化模型方面展现出强劲势头，其中 **Qwen3.8-27B** 领跑，下载量超 769 万次，获赞 17,958 次——凸显市场对高性能、开源权重推理模型日益增长的需求。**Lightricks/LTX-2.5** 作为基于扩散的图像转视频模型，以 8,377 次点赞和超 200 万次下载脱颖而出，表明用户对 AI 驱动视频生成的兴趣持续升温。与此同时，**abenzerps/Qwen-Image-2.1-Uncensored-Quantized** 与 **AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF** 展现了社区在通过 GGUF 格式推动可访问、无审查文本到图像模型方面的努力，使本地化推理在消费级硬件上成为可能。

---

### **热门模型**

#### 🧠 语言模型（LLM、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,958 | 7,695,206 | 经高度优化的指令微调大语言模型，具备强大的多模态支持；其庞大的下载量反映了其在推理与对话任务中的广泛应用。 |
| [deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 1,333 | 10,233 | DeepSeek Flash 系列的一部分，强调文本生成的速度与效率，深受注重低延迟推理的开发者青睐。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 542 | 410,558 | 2-bit 量化的语言模型，专为工具调用与函数执行优化；在使用 llama.cpp 的边缘设备上表现出高效性能，尤为突出。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文本转X）

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 8,377 | 2,012,496 | 前沿的图像转视频扩散模型，可从单张图像生成完整视频；其受欢迎程度凸显动态视觉内容创作的趋势转变。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 4,556 | 2,661,687 | Qwen Image 2.1 的无审查、GGUF 量化解析版本；其巨大下载量反映出社区对本地部署、无限制图像生成的强烈需求。 |
| [AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF](https://huggingface.co/AtomicChat/Qwen-Image-2.1-Turbo-Uncensored-GGUF) | AtomicChat | 555 | 387,254 | 另一个针对 Qwen Image 2.1 Turbo 优化的 GGUF 版本，专为 CPU/GPU 混合环境下的快速推理设计——非常适合爱好者与独立创作者。 |
| [pablodawson/MiniMax-H3-360-Orbit-LoRA](https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA) | pablodawson | 512 | 25,366 | MiniMax H3-360-Orbit 模型的 LoRA 适配器，支持图像转视频生成；凸显轻量级微调在创意工作流中的兴起。 |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 809 | 338,036 | 专为 ComfyUI 设计的 flux 图像编辑与生成模型；其与 ComfyUI 的集成使其在构建自定义流程的高级用户中广受欢迎。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,661 | 164,339 | 紧凑且高性能的嵌入模型，适用于语义搜索与特征提取；作为 Google Gemma 系列的一部分，在 RAG 系统中正迅速获得关注。 |
| [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR) | baidu | 4,792 | 1,652,742 | 支持多种语言与布局的鲁棒光学字符识别模型；其巨大的下载量显示其在文档数字化中的强大实际应用价值。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 4,622 | 1,945,717 | Segment Anything Model 的最新迭代；在多样物体类型上实现零样本掩码生成，巩固其在计算机视觉流水线中的核心地位。 |
| [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 202 | 1,811 | 基于 ONNX 轻量级 OCR 模型，专为 CPU 推理优化；适用于资源受限环境与嵌入式系统。 |

#### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [LiquidAI/LFM2.5-24B-A2B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF) | LiquidAI | 206 | 107,599 | LiquidAI LFM2.5 的 GGUF 量化版本，可通过 llama.cpp 实现本地部署；体现了生态系统向可访问推理的转变。 |
| [nerkyor/Qwen3.8-27B-Coder390-EfficientThink-...](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2) | nerkyor | 431 | 256,336 | 高度专业化的多模型融合微调，结合推理、编码与高效思维能力——反映了混合型、任务特定模型的流行趋势。 |

---

### **生态信号**

截至 2026 年 10 月，Hugging Face 生态系统正明显分化为 **高性能开源权重模型** 与 **社区驱动的优化方案**。Qwen 与 DeepSeek 系列在性能与采纳率上均占据主导地位，其中 Qwen3.8-27B 在下载量与用户参与度方面树立了新标杆。值得注意的是，**GGUF 量化**已成为关键驱动力——尤其在文本到图像与语言模型领域——显著提升了消费级硬件上的本地推理可及性。这一趋势被 *abenzerps*、*AtomicChat* 与 *nerkyor* 等社区成员的努力进一步放大，他们正快速推出无审查、量化、融合的变体，以满足特定应用场景。开源权重模型持续超越专有替代品，强化了对透明性与模块化设计的信任。与此同时，**ComfyUI 集成**与**LoRA 适配器**标志着工作流生态的成熟，定制化与可组合性成为核心。OCR 与分割工具（如 SAM3、Unlimited-OCR）的激增也表明，智能数据提取与预处理需求日益增长——这正是企业与研究应用的关键赋能环节。

---

### **值得探索**

1. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** – 下载量超 769 万次，该模型彰显了开放、可扩展大语言模型的强大能力。适合希望获得生产就绪基础的开发者，用于推理、代码生成与多模态任务。

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 列表中下载量最高的模型之一，代表了 AI 视频生成的前沿。非常适合探索动画、营销或社交媒体内容中的图像转视频流程的创作者。

3. **[abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized)** – 对任何关注本地化、无过滤图像生成的用户而言都是必试之选。其 GGUF 格式支持无需云依赖的 GPU/CPU 部署——特别适合注重隐私或离线工作的场景。

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*