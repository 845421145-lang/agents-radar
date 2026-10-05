# Hugging Face Trending Models Weekly 2026-10-05

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-10-05 01:09 UTC

---

---

### **Today's Highlights**

Qwen’s dominance continues to accelerate across Hugging Face, with multiple variants of **Qwen3.8** and **Qwen-Image-2.1** leading downloads and engagement. The surge in GGUF-quantized models—especially from ISTA-DASLab and DavidAU—signals strong community-driven optimization for local inference. Notably, **Lightricks’ LTX-2.5**, a high-performing image-to-video model, has become a top performer in both likes and downloads, highlighting growing demand for dynamic visual generation. Meanwhile, uncensored and highly optimized versions of Qwen and Xing4.0 are driving interest among developers seeking powerful, accessible models.

---

### **Trending Models**

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 16,940 | 6,821,761 | A flagship multimodal LLM with strong reasoning and conversational capabilities; its massive download count reflects widespread adoption in production and research. |
| [Prism-ML/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | Prism-ML | 2,416 | 4,045,810 | A 2-bit quantized Llama-family model using ternary compression; its ultra-lightweight nature enables efficient inference on consumer hardware. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,422 | 2,164,143 | An aggressively fine-tuned, uncensored GGUF variant of Qwen3.8, combining speed, creativity, and code generation prowess—ideal for power users. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 6,311 | 1,626,951 | A cutting-edge diffusion-based image-to-video model capable of generating smooth, coherent videos from single images; its popularity underscores rising demand for generative video tools. |
| [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo) | Viggle | 588 | 272,896 | A fast, high-quality LoRA fine-tune of Qwen-Image-2.1 that enhances text-to-image generation speed and detail; ideal for creative workflows. |
| [Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap) | Alissonerdx | 1,180 | 203,086 | A top-performing face-swap model leveraging Qwen-Image-2.1 as base; its high likes reflect strong community validation in digital content creation. |

#### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Contrastive-LM/CLM-v0.1-8B](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B) | Contrastive-LM | 715 | 3,445 | A contrastive learning model designed for text ranking and reranking; its unique architecture improves relevance scoring in retrieval systems. |
| [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide) | fastino | 366 | 53,625 | A specialized NER model optimized for intent classification and entity extraction; built for precision in dialogue and knowledge systems. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 556 | 1,886,975 | A mixed-precision GGUF quantization of Qwen3.8 with GSQ and RCO pruning; delivers near-full-model performance at 4–6GB footprint. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,896 | 1,480,842 | The official Flash-Next version of Qwen3.8—optimized for speed and memory efficiency—serves as a benchmark for lightweight multimodal inference. |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,142 | 1,553,744 | One of the most downloaded uncensored GGUF models; widely used for local, unrestricted image generation on consumer GPUs. |

---

### **Ecosystem Signal**

The Hugging Face ecosystem in October 2026 is defined by **Qwen’s continued ascendancy**, with multiple variants of Qwen3.8 dominating both popularity and usage metrics. This momentum reflects broader trust in open-weight models with strong multimodal capabilities. Notably, **GGUF quantization** has become the de facto standard for deploying large models locally, driven by tools like `llama.cpp` and community efforts such as those from ISTA-DASLab and DavidAU. These fine-tuned, uncensored, and optimized variants suggest a maturing ecosystem where users prioritize performance, accessibility, and customization over raw model size. Open-source models are increasingly outperforming proprietary alternatives in real-world applications, especially in generative AI. The rise of **LoRA-based fine-tunes** (e.g., MiniMax-H3 character swaps) and **specialized adapters** signals a shift toward modular, task-specific AI components. Meanwhile, video generation and dynamic image editing remain key growth areas, with LTX-2.5 and face-swap models demonstrating strong user traction.

---

### **Worth Exploring**

1. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – As one of the most downloaded models of the week, it represents the frontier of image-to-video generation. Its ability to produce high-fidelity, motion-coherent videos from still images makes it essential for creators and developers exploring next-gen visual storytelling.

2. **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)** – This GGUF-optimized model exemplifies the state-of-the-art in model compression. With superior speed and low memory usage while retaining strong performance, it’s ideal for deployment on edge devices or personal workstations.

3. **[DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF)** – For advanced users seeking maximum flexibility, this heavily fine-tuned, uncensored variant offers unparalleled creativity and coding capability. It’s a prime example of how community-driven tuning can unlock new potential in open models.

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*