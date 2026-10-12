# Hugging Face Trending Models Weekly 2026-10-12

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-10-12 01:39 UTC

---

---

### **Today's Highlights**

The Hugging Face Hub is witnessing a surge in multimodal and quantized models, with Qwen’s ecosystem dominating the leaderboard. The **Qwen3.8-27B** series leads in downloads and engagement, particularly its GGUF-quantized variants from ISTA-DASLab and unsloth, which are driving adoption for on-device inference. Notably, **Lightricks/LTX-2.5** stands out with 1.7 million downloads as a top-performing image-to-video model, signaling strong momentum in generative video AI. Meanwhile, uncensored and fine-tuned versions of Qwen and Gemma models are gaining traction among developers seeking high-performance, customizable solutions.

---

### **Trending Models**

#### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 17,509 | 6,843,108 | A powerful multimodal LLM optimized for conversational tasks; its massive download count reflects widespread use in enterprise and research. |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 5,026 | 6,488,262 | One of the most downloaded models this week—optimized GGUF version enables efficient CPU/GPU inference via llama.cpp, making it ideal for local deployment. |
| [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) | ConwayResearch | 322 | 108,900 | A 2-bit quantized Llama-family model supporting tool calling; highlights growing interest in lightweight, functional LLMs. |

#### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 7,322 | 1,726,683 | State-of-the-art image-to-video generation using diffusion single-file architecture; one of the highest-download models in the category. |
| [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF) | abenzerps | 3,989 | 2,188,658 | High-performance text-to-image model with uncensored output; its popularity underscores demand for open, unrestricted generative AI. |
| [FrancisRing/Prism](https://huggingface.co/FrancisRing/Prism) | FrancisRing | 161 | 0 | Experimental joint video-audio diffusion model; though not yet downloaded, it represents early-stage innovation in unified media generation. |

#### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [google/embeddinggemma-2](https://huggingface.co/google/embeddinggemma-2) | google | 1,712 | 98,829 | Google’s latest embedding model delivers robust feature extraction; widely adopted for semantic search and retrieval tasks. |
| [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF) | unsloth | 255 | 59,274 | Efficient GGUF-quantized version of Gemma embedding model—ideal for low-resource environments requiring fast vectorization. |
| [Cloudflare/clef](https://huggingface.co/Cloudflare/clef) | Cloudflare | 2,028 | 14,351 | A compact, high-accuracy image-text-to-text model leveraging Qwen3.5; notable for real-time inference performance in edge applications. |

#### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF) | ISTA-DASLab | 799 | 4,189,006 | Mixed-precision GGUF model with GSQ+RCO quantization; achieves near-native speed on consumer hardware. |
| [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf) | prism-ml | 2,630 | 4,549,911 | A 2-bit ternary quantized Llama variant; extremely lightweight with strong performance—ideal for mobile and embedded systems. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-...-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 1,657 | 2,016,567 | A highly customized, uncensored Qwen variant with multiple fine-tunes; exemplifies the rise of community-driven "super-model" aggregations. |

---

### **Ecosystem Signal**

As of October 2026, the Hugging Face ecosystem is increasingly defined by **open-weight, quantized, and fine-tuned models**, especially within the Qwen and Gemma families. Qwen has emerged as the dominant force, with multiple variants of **Qwen3.8-27B** leading both likes and downloads—particularly the GGUF-quantized versions from communities like ISTA-DASLab and unsloth, which enable efficient local inference. This reflects a broader trend toward **on-device AI**, driven by demand for privacy-preserving, low-latency deployment. Quantization techniques like **GSQ, RCO, and 2-bit ternary compression** are rapidly maturing, enabling models to run on consumer hardware without significant accuracy loss. Additionally, the proliferation of “uncensored” and multi-fine-tuned models (e.g., DavidAU’s 30+ tag fusion) signals a vibrant, decentralized innovation culture—where developers combine capabilities from multiple models to create hyper-specialized tools. While proprietary models still hold influence, the open-weight movement continues to accelerate, fueled by community collaboration and tooling like llama.cpp and safetensors.

---

### **Worth Exploring**

1. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – With over 6.4 million downloads, this is the most popular quantized model on the platform. It’s ideal for developers seeking a balance between performance and efficiency, especially for local deployment or integration into apps.

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – A top-tier image-to-video model with 1.7 million downloads. Its ability to generate smooth, coherent videos from static images positions it at the forefront of creative AI tools—perfect for content creators and designers.

3. **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)** – A cutting-edge mixed-precision GGUF model that pushes the boundaries of what’s possible on low-end hardware. Worth studying for researchers exploring scalable, high-efficiency multimodal inference.

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*