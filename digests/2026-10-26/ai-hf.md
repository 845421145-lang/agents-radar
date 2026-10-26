# Hugging Face 热门模型周报 2026-10-26

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-10-26 00:37 UTC

---

### **今日亮点**

Hugging Face 生态系统在多模态生成和可访问的大型语言模型（LLM）领域持续创新。值得注意的是，**Qwen/Qwen3.8-27B** 以超过 18,000 个点赞和近 800 万次下载领跑，巩固了 Qwen 在视觉-语言模型领域的主导地位。与此同时，**Lightricks/LTX-2.5** 在图像转视频生成领域成为现象级爆款，下载量突破 200 万，凸显市场对高质量、文本驱动视频合成的强烈需求。GGUF 量化模型的广泛普及（如 DavidAU 的 *Qwen3.8-27B-TURBO-Fable-Cold-Fusion* 与 orcarouter 的 DeepSeek 变体）表明社区正积极推动本地化、高效推理的发展。此外，ComfyOrg 推出的开源扩散套件如 **MOSS-Image** 与 **Fibo-2.0** 正加速推动创意 AI 工作流的民主化。

---

### **热门模型**

#### 🧠 语言模型（LLM、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,394 | 7,762,014 | 一款功能强大的视觉-语言模型，具备广泛的对话能力与多模态推理能力；其广泛应用反映了开发者对开源权重 Qwen 架构日益增长的信任。 |
| [XHToken/Spark-X2.6-4B](https://huggingface.co/XHToken/Spark-X2.6-4B) | XHToken | 495 | 3,488 | 一款轻量但高效的 LLM，专为速度与可访问性优化；在追求低延迟推理的开发者中迅速获得青睐。 |
| [ornith-ai/Ornith-1.5-122B](https://huggingface.co/ornith-ai/Ornith-1.5-122B) | ornith-ai | 177 | 48,477 | 基于 Qwen3.5 架构的大型 MoE 型 LLM；因其在密集推理任务中的可扩展性与效率而备受关注。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文本到 X）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 9,335 | 2,107,108 | 一款突破性的文本转视频模型，支持从提示词生成电影级画质视频；超 200 万次下载体现了其在创意工作流中的主流吸引力。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 5,040 | 2,235,846 | Qwen Image 2.1 的量化、无审查版本，专为 ComfyUI 优化；其受欢迎程度凸显了对高产出、易用的文本转图像管道的强劲需求。 |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 1,603 | 660,874 | 专为 ComfyUI 设计的 Flux-3 模型，适用于高保真图像生成与编辑；反映出模块化、用户友好型 AI 艺术工具的普遍趋势。 |
| [Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image) | Comfy-Org | 451 | 2,161,961 | 基于 MOSS-Image-Base 构建的 ComfyUI 兼容扩散模型；其超高下载量彰显了向即插即用式 AI 创造力平台转变的趋势。 |
| [fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) | fishaudio | 1,012 | 21,375 | 支持多说话人、具表现力语音控制的文本转语音模型；适用于需要丰富情感声线的叙事与娱乐类应用。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 2,921 | 212,769 | 基于 Gemma 2 的紧凑型高性能嵌入模型；凭借速度与精度的平衡，被广泛用于语义搜索与信息检索。 |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 5,108 | 1,849,059 | Segment Anything Model 的最新迭代，擅长零样本掩码生成；在医学影像与机器人领域广泛应用，正在加速发展。 |
| [datalab-to/indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 425 | 4,636 | 针对 CPU 部署优化的 ONNX 版 OCR 模型；适用于资源受限环境下的文档数字化任务。 |

#### 📦 微调与量化模型（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 2,091 | 1,671,015 | 一款经过多重微调的超优化、无审查 GGUF 版本 Qwen3.8-27B；超 160 万次下载显示了对本地部署、功能丰富的 LLM 的爆炸式兴趣。 |
| [ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF) | ISTA-DASLab | 280 | 412,392 | DeepSeek-V4.1-Flash 的 GSQ-RCO 量化版 GGUF 模型，性能高且内存占用低——非常适合边缘设备推理。 |
| [unsloth/flint-GGUF](https://huggingface.co/unsloth/flint-GGUF) | unsloth | 248 | 103,369 | RecursiveSI 的 Flint 模型经 UnSloth 优化的 GGUF 版本，展现了 UnSloth 快速训练与量化流水线的强大能力。 |
| [jialinyyzz/humanizer](https://huggingface.co/jialinyyzz/humanizer) | jialinyyzz | 2,154 | 143,152 | 结合 Gemma4_Unified 与类人文本生成能力的 GGUF 量化模型；因能生成自然流畅、引人入胜的内容而广受欢迎。 |

---

### **生态信号**

2026 年末的 Hugging Face 生态系统清晰地呈现出向 **可访问、高效、社区驱动的 AI** 的转型。**Qwen** 与 **DeepSeek** 家族在 LLM 与多模态领域占据主导地位，其中 Qwen 模型在采用率与微调活跃度方面领先，尤其通过 GGUF 与 ComfyUI 集成实现爆发式增长。**开源权重、量化模型**（尤其是 GGUF）的兴起，反映出对本地化、注重隐私推理的需求持续上升，社区驱动的版本如 DavidAU 的 Qwen Turbo 变体已创下下载纪录。**多模态生成**，特别是 **文本转视频**（LTX-2.5）与 **文本转图像**（Qwen-Image），已不再是小众应用，而是创意工作流的核心组成部分。ComfyOrg 的扩散套件等工具让非技术用户也能构建复杂 AI 流水线，显著加速了技术民主化进程。与此同时，**专用模型** 如 SAM3 与 embeddinggemma-2 再次证明了在分割与语义搜索等基础任务上的持续进步。总体来看，趋势正朝着 **模块化、规模化性能与开放协作** 倾斜——尽管专有模型仍具影响力，但开源生态如今已成为推动创新速度的关键驱动力。

---

### **值得探索**

1. **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)**  
   这款超优化、多微调的 GGUF 模型代表了社区驱动的 LLM 优化前沿。凭借超 160 万次下载，它在编码、叙事与角色扮演等场景下提供了无与伦比的本地推理能力，是开发离线 AI 代理的理想选择。

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**  
   作为本周下载量最高的模型，LTX-2.5 代表了生成视频的最前沿。其从文本提示生成电影级视频的能力，使其成为创作者、影视制作人及内容机构探索 AI 驱动视觉叙事不可或缺的工具。

3. **[Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image)**  
   基于 OpenMOSS-Team 的基础模型构建，该 ComfyUI 就绪套件展示了开源工具如何释放可扩展、模块化的创造力。对于希望自定义并部署无需依赖云服务的 AI 图像生成方案的艺术家与开发者而言，这是必试之选。

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*