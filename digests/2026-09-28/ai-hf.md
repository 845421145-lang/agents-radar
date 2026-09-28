# Hugging Face 热门模型周报 2026-09-28

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-28 01:05 UTC

---

### **今日亮点**  
2026年9月下旬，Hugging Face 生态系统由高性能、量化版多模态模型主导——尤其是基于 Qwen 与 Llama 系列的模型。值得注意的是，**Qwen/Qwen3.8-27B** 以 16,427 个点赞和超过 670 万次下载位居榜首，确立了其顶级视觉语言模型的地位。GGUF 量化版本的激增——从 **prism-ml/Ternary-Bonsai-2-27B-gguf**（330 万次下载）到 **ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF**（160 万次下载）——反映出社区对轻量级、本地可部署模型的强烈需求。与此同时，基于扩散模型的图像转视频模型 **Lightricks/LTX-2.5** 以 5,332 个点赞和 160 万次下载脱颖而出，预示着生成式视频工作流日益增长的关注度。

---

### **热门模型**

#### 🧠 语言模型（LLMs、聊天模型、指令微调）
| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,782 | 45,028 | 大规模对话式语言模型，专为推理与对话优化；在中文及多语言场景下表现出色，受到开源权重性能关注。 |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,811 | 651,078 | 针对速度与效率优化的指令微调图文转文模型；深受追求低延迟推理的开发者青睐。 |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 349 | 3,456 | 俄语系最大开源权重模型，专为复杂文本生成与推理任务设计；已在俄语 NLP 社区中初步采用。 |

#### 🎨 多模态与生成（图像、视频、音频、文本转任意）
| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,427 | 6,727,629 | 当前领先的视觉语言模型，具备强大的图文理解与生成能力；广泛应用于研发与企业级应用。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,332 | 1,601,089 | 高质量图像转视频扩散模型，具有出色的时序连贯性；在创意 AI 流水线中迅速普及。 |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 1,680 | 11,612 | 具备空间推理能力的多模态模型；在视觉场景中的对象关系理解方面表现突出。 |
| [StarDoc-AI/TeleOCR](https://huggingface.co/StarDoc-AI/TeleOCR) | StarDoc-AI | 598 | 27,837 | 基于 Qwen2.5 VL 架构的聚焦 OCR 的视觉语言模型；适用于文档数字化与表单解析。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）
| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 410 | 766 | 基于对比学习的重排序与验证器；正逐步进入检索增强生成（RAG）系统。 |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 208 | 19,757 | 经微调的 GLiNER 模型，用于意图分类与实体抽取；适用于客户支持自动化场景。 |

#### 📦 微调与量化（社区微调、GGUF、AWQ）
| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,190 | 3,343,748 | 通过 GGUF 实现的 2 位量化 Llama 风格模型；可在消费级 GPU 与边缘设备上实现近似推理。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,778 | 1,608,439 | 使用 GSQ 与 RCO 的混合精度 GGUF 量化；在极低内存占用下仍保持高精度。 |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 2,081 | 964,220 | Qwen Image 2.1 的无审查版本，采用 GGUF 格式；因自由创作用途而广受欢迎。 |
| [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) | unsloth | 270 | 194,341 | 来自 UnSloth 的优化版 GGUF 变体；以更快推理速度与 llama.cpp 兼容性著称。 |
| [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF) | pottokao | 299 | 145,246 | Qwen Image 2.1 的 FP8 量化文本编码器；支持高效 ComfyUI 集成。 |

---

### **生态信号**  
2026 年第三季度，Hugging Face 生态系统呈现出向 **可部署性与可访问性** 明确转变的趋势。基于 Qwen 与 Llama 的模型在各类别中占据主导地位，**Qwen3.8-27B** 已成为多模态推理的事实标准。一个显著趋势是 **GGUF 量化模型** 的大量涌现，尤其来自 prism-ml、ISTA-DASLab、abenzerps 等社区贡献者——这背后是本地化、低资源推理的强烈需求。这些量化方案使实时推理成为可能，可在笔记本电脑与移动设备上运行，加速了独立开发者与边缘 AI 圈子的采纳进程。开源权重模型在可见度与使用量上持续领先于专有模型，尽管苹果（LensVLM-9B）与英伟达（Nemotron-3-Diarization）等公司也在提供专用工具。值得注意的是，**视觉语言** 与 **语音识别** 领域的微调活动依然活跃，小米米莫系列与孔子 4-R2T2 等模型展现出强劲的社区参与度。**ComfyUI 兼容模型**（如 Comfy-Org/Qwen-Image-2.1）的兴起，凸显了工作流集成在 AI 工具链中的日益重要性。

---

### **值得探索**
1. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** – 列表中下载量最高的模型，代表了当前多模态推理的黄金标准。适合研究、基准测试或构建生产级视觉语言应用。
2. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)** – 下载量超 330 万，这款 2 位 GGUF 模型是任何希望在消费级硬件上实现轻量、高效推理的用户的必试之选。
3. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 生成式视频领域的佼佼者，展示了扩散架构如何超越静态图像。非常适合尝试动态内容生成的创作者。

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*