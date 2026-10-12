# Hugging Face 热门模型周报 2026-10-12

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-12 01:39 UTC

---

### **今日亮点**

Hugging Face Hub 正在经历多模态与量化模型的爆发式增长，其中通义千问（Qwen）生态占据排行榜主导地位。**Qwen3.8-27B** 系列在下载量和用户互动方面遥遥领先，尤其是来自 ISTA-DASLab 与 unsloth 的 GGUF 量化版本，正推动本地设备推理的广泛应用。值得注意的是，**Lightricks/LTX-2.5** 以 170 万次下载量成为表现突出的图像生成视频模型，彰显生成式视频 AI 的强劲势头。与此同时，未经审查及经过微调的 Qwen 与 Gemma 模型版本，在寻求高性能、可定制解决方案的开发者中日益流行。

---

### **热门模型**

#### 🧠 语言模型（LLMs、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,509 | 6,843,108 | 专为对话任务优化的强大多模态大模型；其庞大的下载量反映了其在企业与科研领域的广泛应用。 |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 5,026 | 6,488,262 | 本周最受欢迎的模型之一——经优化的 GGUF 版本可通过 llama.cpp 实现高效的 CPU/GPU 推理，非常适合本地部署。 |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 322 | 108,900 | 支持工具调用的 2 位量化 Llama 家族模型；凸显了对轻量级、功能性大模型日益增长的兴趣。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文本到 X）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,322 | 1,726,683 | 基于扩散单文件架构的顶尖图像转视频生成模型；该类别中下载量最高的模型之一。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,989 | 2,188,658 | 高性能文本生成图像模型，输出无审查内容；其受欢迎程度凸显了对开放、自由生成式 AI 的强烈需求。 |
| [FrancisRing/Prism](https://huggingface.co/FrancisRing/Prism) | FrancisRing | 161 | 0 | 实验性联合视频-音频扩散模型；虽尚未被下载，但代表了统一媒体生成领域的早期创新方向。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入表示）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 1,712 | 98,829 | Google 最新嵌入模型，具备强大的特征提取能力；广泛用于语义搜索与信息检索任务。 |
| [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) | unsloth | 255 | 59,274 | Gemma 嵌入模型的高效 GGUF 量化版本——适合资源受限环境下的快速向量化需求。 |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 2,028 | 14,351 | 一款紧凑且高精度的图文转文本模型，基于 Qwen3.5 构建；在边缘应用中实现实时推理性能，尤为突出。 |

#### 📦 微调与量化模型（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 799 | 4,189,006 | 混合精度 GGUF 模型，采用 GSQ+RCO 量化技术；在消费级硬件上实现接近原生速度。 |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,630 | 4,549,911 | 2 位三值量化的 Llama 变体；体积极小且性能出色，特别适合移动与嵌入式系统。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,657 | 2,016,567 | 高度定制化、未经审查的 Qwen 变体，集成多个微调版本；体现了社区驱动“超级模型”聚合趋势的兴起。 |

---

### **生态信号**

截至 2026 年 10 月，Hugging Face 生态系统正日益由**开源权重、量化模型与微调模型**定义，尤其在 Qwen 与 Gemma 系列中表现显著。通义千问已成为主导力量，**Qwen3.8-27B** 的多个变体在点赞数与下载量上均居榜首，特别是来自 ISTA-DASLab 与 unsloth 等社区的 GGUF 量化版本，使本地推理更加高效。这反映出一种更广泛的趋势：**端侧人工智能**，源于对隐私保护、低延迟部署的需求。诸如 **GSQ、RCO 以及 2 位三值压缩**等量化技术迅速成熟，使模型可在消费级硬件上运行，而几乎不损失精度。此外，“未经审查”与多重微调模型（如 DavidAU 的 30+ 标签融合）的普及，标志着一个充满活力、去中心化的创新文化正在形成——开发者通过整合多个模型的能力，构建高度专业化工具。尽管专有模型仍具影响力，但开源权重运动持续加速，得益于社区协作与 llama.cpp、safetensors 等工具链的支持。

---

### **值得探索**

1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – 下载量超 640 万，是平台最流行的量化模型。对于希望在性能与效率之间取得平衡的开发者而言，尤其适合本地部署或集成至应用中。

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 下载量达 170 万，属于顶级图像转视频模型。其从静态图像生成流畅连贯视频的能力，使其处于创意 AI 工具的前沿——非常适合内容创作者与设计师使用。

3. **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)** – 一款前沿的混合精度 GGUF 模型，突破了低端硬件上的性能边界。研究人员若致力于探索可扩展、高效率的多模态推理，值得深入研究。

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*