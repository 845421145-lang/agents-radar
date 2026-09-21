# Hugging Face Trending Models Weekly 2026-09-21

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-21 00:26 UTC

---

---

### **Today's Highlights**

The Hugging Face ecosystem continues to accelerate in multimodal and efficiency-driven innovation. Qwen’s dominance is evident with **Qwen3.8-27B** leading the pack in downloads (7.3M) and **Qwen3.8-Flash-Next** securing top likes (5,492), showcasing strong community adoption of high-performance vision-language models. The rise of GGUF quantizations—especially from teams like *unsloth*, *ISTA-DASLab*, and *prism-ml*—signals a shift toward optimized local inference, particularly for Apple Silicon and edge deployment. Notably, *Lightricks’ LTX-2.5* and *MiniMaxAI’s MiniMax-H3* are driving video generation trends, while *Edge0-35B-A3B-preview* highlights growing interest in MoE architectures for scalable inference.

---

### **Trending Models**

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 15,861 | 7,331,932 | A highly efficient, conversational image-text-to-text model with massive download volume; ideal for multimodal applications requiring real-time reasoning. |
| [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | meta-llama | 7,769 | 5,910,102 | One of the most downloaded open-weight LLMs, widely used for general-purpose chat and code tasks across research and production. |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 1,494 | 1,908,396 | A groundbreaking 2-bit quantized Llama-family model using ternary compression and GGUF format, enabling ultra-efficient on-device inference. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 4,552 | 1,609,559 | A diffusion-based image-to-video model gaining traction for high-quality, text-guided video generation with strong temporal coherence. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,526 | 4,057,444 | A state-of-the-art multimodal model supporting image-to-video and text-to-video, now one of the most downloaded models in its category. |
| [Qwen/Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | Qwen | 738 | 183 | A compact yet powerful image-generation model fine-tuned for editing and creative workflows, built on diffusers and safetensors. |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 915 | 17,403 | A 3B-parameter text-to-audio model with symbolic planning and agentic editing capabilities, pushing boundaries in generative music. |

#### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD) | harshatheg | 476 | 0 | A lightweight, constrained-decoding variant of Qwen for structured output generation, optimized for Apple Silicon via MLX. |
| [TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B) | TokenRhythm | 980 | 11,913 | An agentic, instruction-tuned LLM based on Qwen3.5, designed for autonomous task execution and dynamic decision-making. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,428 | 6,941,478 | The most downloaded GGUF version of Qwen3.8-27B, praised for speed and compatibility with llama.cpp and local inference. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 1,478 | 1,217,204 | A mixed-precision quantization using GSQ and RCO, balancing performance and memory footprint for edge deployment. |
| [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit) | prism-ml | 284 | 30,043 | A 2-bit compressed version of Ternary-Bonsai tuned for MLX, enabling sub-1GB inference on Apple Silicon devices. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,002 | 1,301,417 | A highly experimental, uncensored fine-tune combining multiple advanced techniques—ideal for red-teaming and open-ended coding. |

---

### **Ecosystem Signal**

As of September 2026, the Hugging Face ecosystem reflects a clear pivot toward **efficient, deployable AI**. Qwen and Llama families remain dominant, but **Qwen’s expansion into Flash, GSQ-RCO, and GGUF variants** signals a maturing ecosystem where performance and accessibility are prioritized. The surge in **GGUF-based models**—especially from *unsloth*, *ISTA-DASLab*, and *prism-ml*—indicates strong community momentum in optimizing large models for local inference, particularly on Apple Silicon and edge devices. Meanwhile, **multimodal models like LTX-2.5 and MiniMax-H3** are driving video generation trends, suggesting rapid advancements in temporal consistency and cross-modal alignment. Notably, **open-weight models continue to outpace proprietary alternatives**, with fine-tunes like *Heretic-Uncensored* and *NeoCoder* demonstrating the power of community-driven experimentation. Quantization techniques such as **ternary compression (2-bit), GSQ, and mixed-precision** are no longer niche—they’re becoming standard tools for deployment. This marks a shift from raw model size to **practical usability**, reflecting a more mature, user-centric AI landscape.

---

### **Worth Exploring**

1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – With over 6.9M downloads, this is the de facto standard for running Qwen3.8-27B locally. Its compatibility with `llama.cpp` and support for fast inference make it essential for developers building low-latency apps on consumer hardware.

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – A top-tier image-to-video model with 1.6M downloads, ideal for creatives and developers seeking high-fidelity, text-guided video synthesis. Its diffusion-single-file design simplifies integration into ComfyUI and other pipelines.

3. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)** – A pioneering 2-bit quantized model that pushes the envelope in model compression. For researchers exploring extreme efficiency or deploying on resource-constrained devices, this represents the frontier of what’s possible in LLM optimization.

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*