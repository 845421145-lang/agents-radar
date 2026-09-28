# Hugging Face Trending Models Weekly 2026-09-28

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-28 01:05 UTC

---

---

### **Today's Highlights**  
The Hugging Face ecosystem in late September 2026 is dominated by high-performance, quantized multimodal models—especially those built on the Qwen and Llama families. Notably, **Qwen/Qwen3.8-27B** leads with 16,427 likes and over 6.7 million downloads, cementing its status as a top-tier vision-language model. The surge in GGUF-quantized versions—from **prism-ml/Ternary-Bonsai-2-27B-gguf** (3.3M downloads) to **ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF** (1.6M downloads)—reflects strong community demand for lightweight, locally deployable models. Meanwhile, **Lightricks/LTX-2.5**, a diffusion-based image-to-video model, stands out with 5,332 likes and 1.6M downloads, signaling growing interest in generative video workflows.

---

### **Trending Models**

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B) | XingChen-AGI | 1,782 | 45,028 | A large-scale conversational LLM tuned for reasoning and dialogue; gaining traction for open-weight performance in Chinese and multilingual contexts. |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 3,811 | 651,078 | Instruction-tuned image-text-to-text model optimized for speed and efficiency; popular among developers seeking low-latency inference. |
| [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base) | yandex | 349 | 3,456 | Yandex’s largest open-weight model to date, designed for complex text generation and reasoning tasks; early adoption in Russian NLP communities. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,427 | 6,727,629 | Leading vision-language model capable of rich image-text understanding and generation; widely used in R&D and enterprise applications. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 5,332 | 1,601,089 | High-quality image-to-video diffusion model with strong temporal coherence; rapidly adopted in creative AI pipelines. |
| [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B) | TaichuAI | 1,680 | 11,612 | Multimodal model with spatial reasoning capabilities; notable for advanced object relationship understanding in visual scenes. |
| [StarDoc-AI/TeleOCR](https://huggingface.co/StarDoc-AI/TeleOCR) | StarDoc-AI | 598 | 27,837 | OCR-focused vision-language model leveraging Qwen2.5 VL architecture; ideal for document digitization and form parsing. |

#### 🔧 Specialized Models (code, math, medical, embeddings)
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 410 | 766 | A contrastive learning-based verifier for reranking and validation; emerging in retrieval-augmented generation (RAG) systems. |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 208 | 19,757 | Fine-tuned GLiNER model for intent classification and entity extraction; useful in customer support automation. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)
| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,190 | 3,343,748 | 2-bit quantized Llama-style model via GGUF; enables near-inference on consumer GPUs and edge devices. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,778 | 1,608,439 | Mixed-precision GGUF quantization using GSQ and RCO; delivers high accuracy at low memory footprint. |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 2,081 | 964,220 | Uncensored version of Qwen Image 2.1 in GGUF format; highly sought after for unrestricted creative use. |
| [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF) | unsloth | 270 | 194,341 | Optimized GGUF variant from UnSloth; known for faster inference and compatibility with llama.cpp. |
| [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF) | pottokao | 299 | 145,246 | FP8-quantized text encoder for Qwen Image 2.1; enables efficient ComfyUI integration. |

---

### **Ecosystem Signal**  
The Hugging Face ecosystem in Q3 2026 reflects a clear shift toward **deployability and accessibility**. Qwen and Llama-derived models dominate across categories, with **Qwen3.8-27B** becoming the de facto standard for multimodal reasoning. A significant trend is the proliferation of **GGUF-quantized models**, particularly from community contributors like prism-ml, ISTA-DASLab, and abenzerps—driven by demand for local, low-resource inference. These quantizations enable real-time use on laptops and mobile devices, accelerating adoption in indie dev and edge AI circles. Open-weight models continue to outpace proprietary ones in visibility and usage, though companies like Apple (LensVLM-9B) and Nvidia (Nemotron-3-Diarization) are contributing specialized tools. Notably, fine-tuning activity remains strong in **vision-language** and **speech recognition**, with models like XiaomiMiMo’s Mimo series and Confucius4-R2T2 showing robust community engagement. The rise of **ComfyUI-compatible** models (e.g., Comfy-Org/Qwen-Image-2.1) underscores the growing importance of workflow integrations in AI tooling.

---

### **Worth Exploring**
1. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** – As the most downloaded model on the list, it exemplifies the current gold standard in multimodal reasoning. Ideal for research, benchmarking, or building production-grade vision-language apps.
2. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)** – With over 3.3 million downloads, this 2-bit GGUF model is a must-try for anyone exploring lightweight, high-efficiency inference on consumer hardware.
3. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – A standout in generative video, this model demonstrates how diffusion architectures are evolving beyond static images. Perfect for creators experimenting with dynamic content generation.

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*