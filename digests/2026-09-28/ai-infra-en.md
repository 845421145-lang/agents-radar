# AI Infrastructure Digest 2026-09-28

> Generated: 2026-09-28 01:05 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-28**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *high specialization and hardware convergence*, with projects increasingly diverging by target layer (serving, training, gateway, local runtime) while converging on performance-critical optimizations. vLLM and SGLang lead in high-throughput, low-latency inference engines for modern GPUs, while llama.cpp and Unsloth focus on portability and fine-tuning efficiency across diverse hardware. LiteLLM emerges as the dominant multi-provider routing layer, now pushing toward Rust-based security and observability. The rapid adoption of FP8, NVFP4, and hybrid attention models (e.g., Qwen4Exp, KimiViT) signals a shift toward *packed tensor execution* and *memory-aware inference*, driven by demand for higher throughput on next-gen accelerators like DGX Spark (GB10), Hopper/Blackwell, and RTX 5090.

---

### **2. Activity Comparison**

| Project       | Issues Open | PRs Merged (Last 24h) | Release Status | Key Notes |
|---------------|-------------|------------------------|----------------|---------|
| **vLLM**      | 387         | 12                     | None           | Focus on correctness (batch invariance), fused kernels (GDN/QK-RoPE), and stability fixes |
| **SGLang**    | 512         | 8                      | None           | High-severity crashes (CUDA coredumps), AMD/Intel support growth, speculative decoding instability |
| **llama.cpp** | 498         | 11                     | `b11223`       | RANK pooling batch splitting, Vulkan/CUDA tuning, critical image processing crashes |
| **Ollama**    | 815+        | 3                      | None           | Critical runtime crashes (RTX 5090, MLX), cloud billing loops, silent input loss |
| **LiteLLM**   | 642         | 12                     | None           | Major security fixes (virtual key bypass), Rust migration, structured tracing |
| **Unsloth**   | 412         | 14                     | Prebuilt wheels | New PyTorch 2.13/2.14 + Python 3.13 wheels, FP8 training speedups |

> ✅ **Observation**: Despite no new releases, activity remains high — especially in **security**, **stability**, and **hardware-specific kernel tuning**. Ollama and SGLang show the highest issue counts, reflecting growing pains in production-grade deployment.

---

### **3. Model Support Race**

| New Model / Architecture       | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen4Exp (NVFP4)**             | ✅ (PR #56273) | ❌     | ❌        | ❌     | ❌      | ❌      |
| **DeepSeek-V4.1-Flash (AMD gfx950)** | ❌   | ✅ (PR #41308) | ❌        | ❌     | ❌      | ❌      |
| **SANA-Video 2.0 (T2V/TI2V)**    | ❌   | ✅ (PR #41492) | ❌        | ❌     | ❌      | ❌      |
| **GLM-5.3-Flash (W4A16)**        | ⚠️ (Degeneration) | ❌     | ✅ (Experimental) | ❌     | ❌      | ❌      |
| **Cohere MoE (RTX 5090)**        | ❌   | ❌     | ❌        | ❌     | ❌      | ❌      |
| **Qwen3-VL (RANK pooling)**      | ❌   | ❌     | ✅ (`b11223`) | ❌     | ❌      | ❌      |
| **MLX (Apple Silicon)**          | ❌   | ❌     | ❌        | ⚠️ (Memory pressure) | ❌      | ✅ (Estimator) |

> 🏆 **Winner**: **SGLang** leads in *cross-architecture model support*, particularly for **AMD MI350X** and **video-generation models**.  
> 🥈 **Runner-up**: **llama.cpp** excels in **vision reranker scalability** and **multi-backend portability**.  
> 🛑 **Caution**: Ollama’s `deepseek-v4.1-flash:cloud` silently discards images despite claiming vision support — a red flag for production use.

---

### **4. Performance Frontier**

| Optimization Area           | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-----------------------------|------|--------|-----------|--------|---------|---------|
| **Fused Kernels**            | ✅ GDN, QK-RoPE (29x speedup) | ⚠️ Partial MoE headroom | ✅ Vulkan/CUDA tuning | ❌ | ❌ | ✅ Block-FP8 LoRA (4–15x) |
| **KV Cache Efficiency**      | ✅ Dynamic PDL, usage metrics | ✅ `kv_cache_usage_perc` | ❌ Save failure | ⚠️ Over-allocation | ✅ Structured tracing | ❌ |
| **Batching & Prefill**       | ✅ Fixed-token scoring, OPD | ⚠️ Prefill gap (2–7K tok/s) | ✅ Batch-splitting (RANK) | ❌ | ❌ | ❌ |
| **Quantization**             | ✅ NVFP4, packed embeddings | ✅ W4A16, int4pack reuse | ✅ IQ2_NL/IQ3_NL | ❌ | ❌ | ✅ 4-bit load for FP8 checkpoints |
| **Distributed Serving**      | ✅ Sequence parallelism (fixes in progress) | ✅ TP/DSpark | ❌ | ❌ | ✅ Multi-provider routing | ❌ |

> 🔥 **Top Performers**:  
> - **vLLM** dominates in **kernel fusion** and **distributed inference correctness**.  
> - **Unsloth** leads in **low-bit fine-tuning acceleration** via optimized FP8 training.  
> - **SGLang** shows strong potential in **MoE and speculative decoding**, though stability lags.

---

### **5. Layer Positioning**

| Project       | Primary Layer              | Secondary Role                          | Target Users |
|---------------|------------------------------|------------------------------------------|--------------|
| **vLLM**      | Inference Engine (GPU)       | Model serving, batching, quantization     | Cloud infra, LLMaaS providers |
| **SGLang**    | Inference Engine + Speculative Decoding | Multi-modal, agent workflows             | Research labs, real-time agents |
| **llama.cpp** | Local Runtime / Edge Inference | RAG, vision reranking, cross-platform   | Developers, edge devices, offline apps |
| **Ollama**    | Local Gateway + CLI Runner   | Model abstraction, user experience        | Devs, hobbyists, prototyping |
| **LiteLLM**   | API Gateway / Router         | Cost tracking, authentication, tracing    | Enterprises, multi-cloud deployments |
| **Unsloth**   | Training/Fine-Tuning Framework | Low-level kernel optimization, tooling   | Researchers, fine-tuners, Studio users |

> 📊 **Strategic Insight**:  
> - **vLLM/SGLang** are becoming *de facto engines* for high-performance inference at scale.  
> - **LiteLLM** is evolving into the *centralized control plane* for cost, auth, and observability.  
> - **Unsloth** and **llama.cpp** remain essential for *fine-grained control and portability*, especially in research and edge contexts.

---

### **6. Trend Signals & Developer Guidance**

#### **Emerging Trends from 2026-09-28 Activity**:
1. **Hardware Specialization is Accelerating**: Projects are rapidly adding support for **AMD MI350X**, **Apple Silicon MLX**, **RTX 5090**, and **DGX Spark (GB10)** — signaling that future infrastructure must be hardware-aware.
2. **FP8 and NVFP4 Are Now Production-Ready**: With vLLM’s packed NVFP4 support and Unsloth’s block-FP8 training, these formats are moving beyond prototypes into real-world inference pipelines.
3. **Stability Is the New Bottleneck**: Despite massive performance gains, **critical crashes** (Ollama CUDA, SGLang coredumps, llama.cpp image handling) are dominating issue trackers — indicating that reliability is now the top barrier to production adoption.
4. **Rust Migration = Security & Performance Win**: LiteLLM and vLLM’s push toward Rust-native components (tracing, frontend, auth) reflects a broader industry move toward **memory-safe, high-performance systems**.
5. **Agent Workflows Demand Full Stack Integrity**: Issues like tool-call chunking loss (Ollama), logprob drift (SGLang), and silent image discard (Ollama) reveal that **end-to-end correctness** is harder than raw throughput.

#### **Actionable Advice for Application Developers**:
- ✅ **Avoid production use of Ollama’s `deepseek-v4.1-flash:cloud`** — it silently ignores images. Use SGLang or vLLM instead.
- ✅ **Enable fused kernels in vLLM (≥0.28.1rc1)** for up to **29x faster vision-language decoding**.
- ✅ **Use Unsloth’s `load_in_4bit=True`** for FP8 fine-tuned models (e.g., Qwen3-FP8) to achieve **15x faster LoRA training**.
- ✅ **Audit cost models if using LiteLLM** — upcoming changes to `completion_window` billing could alter spend significantly.
- ⚠️ **Do not assume deterministic output with `VLLM_BATCH_INVARIANT=1` + sequence parallelism** until v0.29.0+.
- 🛡️ **Verify virtual key access controls** in LiteLLM — a known allowlist bypass exists on Azure routes.

> **Final Note**: The era of "good enough" inference is over. Today’s infrastructure demands **correctness, observability, and resilience** — not just speed. Choose tools based on your stack’s *layer maturity*, not just benchmark scores.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-28**

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its focus on **batch invariance correctness**, with a critical fix for `VLLM_BATCH_INVARIANT=1` under sequence parallelism (PR #56370), resolving a major correctness regression that impacted deterministic inference. Concurrently, performance optimization efforts are advancing with new fused kernels for GDN and QK-RoPE in KimiViT, while the Rust frontend moves toward feature parity (Issue #44280).

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes announced.

---

### **3. New Model & Hardware Support**  
- **Qwen4Exp NVFP4 support**: PR #56273 enables packed NVFP4 PLE embeddings for `Qwen3.8-Flash-Next-NVFP4`, allowing full model execution on single DGX Spark (GB10) without CPU/disk offloading — a significant step for high-throughput Flash attention models.
- **Rust Frontend Feature Parity**: Issue #44280 tracks ongoing work to bring the Rust frontend to full parity with Python, enabling drop-in replacements via `VLLM_USE_RUST_FRONTEND=1`.
- **Vulkan Support**: Requested in Issue #21182; remains a long-term goal to expand hardware compatibility beyond NVIDIA GPUs.

---

### **4. Performance & Optimization**  
- **GDN Decode Fusion**: PR #53463 routes non-speculative GDN decode through a fused CUDA kernel, eliminating separate launches of Conv1D, Triton recurrent kernel, and RMSNorm — expected to improve throughput for Mamba/GDN models.
- **KimiViT QK-RoPE Fusion**: PR #58651 fuses per-layer QK RoPE into a single in-place kernel, achieving **~29x speedup** (from 225.3μs → 7.6μs) on GB300 for 224×224 image input with 256 tokens.
- **Fixed-Token Prefill Scoring**: PR #54335 introduces request-wise scoring for OPD/top-k distillation, enabling fine-grained logprob capture during prefill — critical for training and evaluation pipelines.
- **Dynamic PDL Enablement**: Issue #40543 highlights undocumented flags (`TRTLLM_ENABLE_PDL`, `TORCHINDUCTOR_ENABLE_PDL`) that boost low-latency performance on Hopper/Blackwell — now under RFC scrutiny.

---

### **5. Stability & Regressions**  
- **Batch Invariance Breakage (Critical)**: Issue #56370 confirmed broken behavior when `VLLM_BATCH_INVARIANT=1` is used with sequence parallelism (`enable_sp`). A fix PR (#56370) has been merged but requires validation in v0.29.0+.
- **GLM-5.3-Flash Long-Decoding Degeneration**: Issue #56868 reports output degradation after extended reasoning decode sessions with W4A16 quantized GLM-5.3-Flash on B300 — affects stability in long-context agents.
- **DGX Spark Unified Memory OOM**: Issue #56824 shows engine startup collapses host memory despite 22 GiB free — likely due to unified memory fragmentation or improper allocation tracking on SM121.
- **Qwen4Exp Per-Chunk Logits Buffer Growth**: Issue #56457 reports unbounded memory growth in logits buffer during long prefill on GB10, leading to device OOM/hang — critical for production deployments.

---

### **6. What This Means for Application Developers**  
- **Use `VLLM_BATCH_INVARIANT=1` cautiously**: If you rely on deterministic outputs across different TP/spatial configurations, avoid enabling sequence parallelism until v0.29.0+ includes the fix from PR #56370.
- **Leverage fused kernels for latency-sensitive apps**: For Mamba/GDN and KimiViT models, ensure you’re using v0.28.1rc1+ and enable fused paths — expect up to 29x faster decoding for vision-language tasks.
- **Watch for NVFP4 + Packed Embeddings**: If deploying Qwen4Exp models on DGX Spark, use PR #56273’s patch or wait for v0.29.0 to avoid disk/CPU offloading overhead.
- **Avoid long-running sessions with GLM-5.3-Flash**: Until #56868 is resolved, limit context length or restart workers periodically to prevent output corruption.
- **Enable dynamic PDL flags** if targeting Hopper/Blackwell — these can significantly reduce latency in low-concurrency scenarios.

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-28**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with active integration of new hardware backends and performance refinements for emerging models like DeepSeek-V4.1 and SANA-Video 2.0. Key developments include the addition of native AMD gfx950 (MI350X) support for DeepSeek-V4.1, a major refactor of CuTe DSL layer construction for better maintainability, and ongoing work on speculative decoding improvements. Critical stability fixes are being prioritized around memory safety, request cancellation, and GPU kernel crashes.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
- **Note:** The `--speculative-algorithm NGRAM` flag now rejects use with `torch_native` attention backend (PR #36444), preventing startup crashes due to missing kernel attributes. This is a breaking change for users relying on this combination — switch to `cuda` or `flash` backends.

---

### **3. New Model & Hardware Support**  
- ✅ **AMD gfx950 (MI350X)**: Native support added for `DeepSeek-V4.1-Flash` via PR #41308, enabling deployment on AMD GPUs using DSpark and unified radix cache.  
- ✅ **SANA-Video 2.0 (T2V/TI2V)**: Experimental support merged via PR #41492, adding first-class diffusion model serving for text-to-video and text-image-to-video generation.  
- 🟡 **Cambricon MLU**: Prototype in-tree backend introduced (PR #26898), validating Qwen3-8B inference on Cambricon devices. Still early-stage but promising for non-NVIDIA ecosystems.  
- 🟡 **Intel XPU**: W4A16 compressed tensor support enabled by reusing `int4pack` path (PR #40828), removing prior FP8-only restriction.

---

### **4. Performance & Optimization**  
- **Prefill Throughput Gap**: Users report ~2–7K tok/s for DeepSeek-V4.1 prefill on 4× RTX PRO 6000 SM120 vs vLLM/Marlin’s ~12.5K (Issue #33422). Root cause under investigation: potential kernel coverage gaps; tracking via #19637.  
- **HiCache Prefetch Delay**: Can cause long TTFT under load due to delayed finalization during scheduler scans (Issue #32724). Fix in progress.  
- **Decoder Graph Width Pinning**: On SM90, `--context-length` now caps decode graph width, limiting scalability (Issue #40441). Feature request to add `decode-phase max_seq_len`.  
- **MoE Kernel Headroom**: LFM2.5 (E=32, N=1792) shows 1.37–1.74× kernel-level headroom on H200 due to fallback config (Issue #32806). Tuning guidance needed.  
- **KV Cache Efficiency**: PR #34714 adds `kv_cache_usage_perc` Prometheus gauge to align with vLLM expectations for observability.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| 🔴 High | [#26340](https://github.com/sgl-project/sglang/issues/26340) | CUDA coredumps from `pr-test.yml` — auto-collected across runs; 320 comments, high visibility | In progress; requires deep debug analysis |
| 🔴 High | [#41471](https://github.com/sgl-project/sglang/issues/41471) | Two concurrent requests with different `DisallowedTokensLogitsProcessor` token_ids crash server | No fix yet |
| 🔴 High | [#41351](https://github.com/sgl-project/sglang/issues/41351) | Hybrid GDN Radix-cache logprob drift on repeated branch scoring | No fix yet |
| 🟡 Medium | [#41490](https://github.com/sgl-project/sglang/issues/41490) | Streaming silently loses up to 5 tokens when detokenizer evicts state mid-request | Fix in progress (Issue #41236) |
| 🟡 Medium | [#40843](https://github.com/sgl-project/sglang/issues/40843) | Severe repetition/degenerate loops with GLM-5.3 + DFLASH speculative decoding | Reproducible; no known workaround |
| 🟡 Medium | [#41449](https://github.com/sgl-project/sglang/issues/41449) | Grammar-constrained request batched with others causes deadlock on TP+DSpark | Reproduced on dev branch; needs CI validation |

---

### **6. What This Means for Application Developers**  
- **Model Deployment**: You can now deploy **DeepSeek-V4.1** on AMD MI350X (gfx950) and **SANA-Video 2.0** for T2V/TI2V workflows—ideal for multi-modal agents and video-generation pipelines.  
- **Stability Considerations**: Avoid `--speculative-algorithm NGRAM` with `torch_native` backend (use `cuda` instead). Be cautious with `DisallowedTokensLogitsProcessor` in concurrent scenarios.  
- **Memory & Latency**: If you observe high TTFT or token loss, check HiCache prefetch behavior and ensure `SGLANG_DETOKENIZER_MAX_STATES` is tuned for concurrency levels.  
- **Observability**: Use the new `kv_cache_usage_perc` metric for cache monitoring. Consider updating your dashboards accordingly.  
- **Future-Proofing**: Monitor PRs related to **CuTe DSL refactors** (#41443–#41440); they improve engine modularity and may affect custom kernels in future versions.

> 🔗 [View full issue tracker](https://github.com/sgl-project/sglang/issues) | [Latest PRs](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-28**

---

### **1. Today's Highlights**  
The latest updates focus on enhancing support for vision-enabled reranker models, particularly Qwen3 and Qwen3-VL, by enabling RANK pooling batch splitting in the server backend—critical for scalable retrieval systems. Concurrently, performance tuning for Vulkan (Intel) and CUDA (FP16 FlashAttention) improves throughput across high-end GPUs, while stability fixes address critical crashes in large-image processing and RPC handling.

---

### **2. Releases & Breaking Changes**  
- **`b11223`**: Added support for **batch splitting in RANK pooling** for causal LLM rerankers like Qwen3 and Qwen3-VL via `server : allow RANK pooling batch splitting` ([#28876](https://github.com/ggml-org/llama.cpp/pull/28876)). This enables efficient inference on long document sets without full model batching.
- **`b11222`**: Refactored argument parsing to avoid side effects; `--rpc` is now registered unconditionally and only called from its handler ([#29537](https://github.com/ggml-org/llama.cpp/pull/29537)).
- **`b11221`**: Enforced strict type checking in `string_split<T>` — now throws instead of undefined behavior on invalid inputs ([#29518](https://github.com/ggml-org/llama.cpp/pull/29518)).

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Added experimental support for **GLM-5.3-Flash (GLM5-Next)**, a 320B hybrid text+vision model with mixed KDA/DSA layers ([#27773](https://github.com/ggml-org/llama.cpp/pull/27773)).
- **Hardware & Backend**:  
  - **Vulkan**: Improved Intel GPU performance via kernel tuning ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476)); fixed argsort kernel selection for Adreno devices ([#29469](https://github.com/ggml-org/llama.cpp/pull/29469)).
  - **CUDA**: Tuned FP16 tile configs for head sizes 40–112 to improve FlashAttention efficiency ([#26289](https://github.com/ggml-org/llama.cpp/pull/26289)).
  - **SYCL**: Extended FWHT kernels to handle block widths >512 (e.g., 384, 640, 768, 1280) using Kronecker/Paley construction ([#29243](https://github.com/ggml-org/llama.cpp/pull/29243)).
  - **HIP**: Enabled fattn-mma kernel on cdna for dkq > 256 in large-batch scenarios ([#28907](https://github.com/ggml-org/llama.cpp/pull/28907)).
  - **Jinja Template Engine**: Added support for `dict` builtin functions ([#29477](https://github.com/ggml-org/llama.cpp/pull/29477)).

---

### **4. Performance & Optimization**  
- **Vulkan (RTX 3090)**: GDN kernel tuning reduced latency by **6.3%** at ubatch=2048 and 4096 ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476)).
- **CUDA**: Optimized FlashAttention configurations for head sizes 40–112, improving efficiency in dense attention patterns ([#26289](https://github.com/ggml-org/llama.cpp/pull/26289)).
- **AVX512-FP16**: Fixed overflow in f16 dot product accumulation by accumulating in f32 — preserves precision and avoids numerical instability ([#29545](https://github.com/ggml-org/llama.cpp/pull/29545)).
- **Quantization**: Introduced **IQ2_NL and IQ3_NL** quant types across CPU, Metal, CUDA, and Vulkan backends, enabling better compression for non-divisible tensor dimensions ([#27983](https://github.com/ggml-org/llama.cpp/pull/27983)).

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - **Gemma4 models crash on images > ~1.2 MP** due to non-causal attention in vision processing ([#28954](https://github.com/ggml-org/llama.cpp/issues/28954), [#29543](https://github.com/ggml-org/llama.cpp/pull/29543)). *Fix PR exists*.
  - **Server hangs on Jetson Orin NX** after b8638→b9016 rewrite ([#29499](https://github.com/ggml-org/llama.cpp/issues/29499)) — unresolved.
  - **RPC buffer overflow** in release builds when using `SET_ROWS` — potential memory corruption risk ([#26912](https://github.com/ggml-org/llama.cpp/issues/26912)).
- **Other Issues**:  
  - **KV cache save fails for vision models** (`/slots/3?action=save`) — tracked in [#19466](https://github.com/ggml-org/llama.cpp/issues/19466).
  - **MSVC not detecting AVX-VNNI** on Windows — affects CPU inference speed ([#28295](https://github.com/ggml-org/llama.cpp/issues/28295)).

---

### **6. What This Means for Application Developers**  
- **For Retrieval Systems**: Use `b11223` to scale reranking of long document sets with Qwen3-VL using batch-splitting—ideal for RAG pipelines.
- **For Edge & Mobile Deployment**: The new **IQ2_NL/IQ3_NL** quantizations enable tighter control over model size without sacrificing accuracy on irregular tensor shapes.
- **For Multi-GPU Inference**: Ensure you’re not hitting `GGML_ASSERT(ret.axis != GGML_BACKEND_SPLIT_AXIS_UNKNOWN)` with `--split-mode tensor` and `iq4_nl` cache — use `--cache-type-k/v iq4_m` as workaround until fix lands.
- **Avoid Crashes**: Do not send images >1.2MP to Gemma4 models via the server unless patched. Consider preprocessing or tiling large inputs.
- **Debugging Tip**: Enable `GGML_RPC_DEBUG=1` to get detailed logs for remote inference debugging ([#29544](https://github.com/ggml-org/llama.cpp/pull/29544)).

> 🔗 [Official Website](https://llama.app) | 📦 [Releases](https://github.com/ggml-org/llama.cpp/releases) | 🛠️ [Issue Tracker](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-28**

---

### **1. Today's Highlights**  
Critical stability issues are emerging on high-end hardware (RTX 5090, Apple Silicon MLX) and in cloud environments, including CUDA memory access crashes, silent image input loss in `deepseek-v4.1-flash:cloud`, and persistent billing loops blocking user access. Concurrently, core parser logic is under active refinement to fix tool-call chunking edge cases that affect agent reliability—particularly for models like Qwen3 and Gemma4.

---

### **2. Releases & Breaking Changes**  
*None.* No new releases were published in the last 24 hours. However, ongoing changes to model parsing behavior may impact clients relying on strict tool-call formatting (see #18681, #18676). The removal of `typical_p` support in v0.34.1 (tracked in #18542) continues to break legacy clients such as SillyTavern.

---

### **3. New Model & Hardware Support**  
- **Hardware:**  
  - RTX 5090 (CUDA): Experiencing `illegal memory access` crashes during inference with Cohere MoE models (#18642).  
  - Intel UHD 0x4626 (Windows): Not detected by Vulkan backend in Ollama 0.34.4 (#18672).  
  - Apple Silicon (MLX): Memory pressure severely degrades performance on nvfp4 quantized models (#16030), despite MLX’s demonstrated scalability.

- **Models:**  
  - `deepseek-v4.1-flash:cloud` now silently discards all image inputs despite advertising `vision` capabilities (#18527).  
  - `olmo3` exhibits broken tool-call parsing when arriving in terminal chunks (#18676).  

---

### **4. Performance & Optimization**  
- **Memory Management:**  
  - `OLLAMA_GPU_OVERHEAD` is being ignored by `llama-server` runner, failing to reserve VRAM for model layer placement via `--fit` (#18679).  
  - `PredictServerVRAM` inaccuracy leads to over-allocation or under-provisioning; PR #17615 aims to align KV cache accounting with actual GraphSize usage.

- **Latency & Throughput:**  
  - MLX-based models on macOS show extreme slowdowns under memory pressure (#16030), indicating poor memory compaction or page fault handling.  
  - On Linux/CUDA, a full-cache-hit task can cause `llama-server` to wedge indefinitely, hanging all subsequent requests until model unload (#18685).

---

### **5. Stability & Regressions**  
| Severity | Issue | GitHub Link | Status |
|--------|------|-------------|--------|
| 🔴 Critical | `llama-server` crashes with CUDA illegal memory access on RTX 5090 (Cohere MoE) | [#18642](https://github.com/ollama/ollama/issues/18642) | Open |
| 🔴 Critical | Cloud billing loop blocks users from upgrading/downgrading plans | [#18683](https://github.com/ollama/ollama/issues/18683) | Open |
| 🟡 High | `deepseek-v4.1-flash:cloud` silently ignores image inputs despite claiming vision support | [#18527](https://github.com/ollama/ollama/issues/18527) | Open |
| 🟡 High | `llama-server` wedges on full-cache-hit tasks, hanging all future requests | [#18685](https://github.com/ollama/ollama/issues/18685) | Open |
| 🟡 Medium | Tool-call opening tags lost across chunk boundaries in multiple parsers | [#18681](https://github.com/ollama/ollama/issues/18681) | Open |

> ✅ *Note:* Several PRs address parser correctness (e.g., #18687, #18624, #18288), but none resolve runtime crashes or client-breaking regressions.

---

### **6. What This Means for Application Developers**  
- **Avoid `typical_p`** if using older clients (e.g., SillyTavern); it’s no longer supported and breaks compatibility (#18542).  
- **Validate tool-call integrity** in agents: ensure your app handles partial or dropped tags (e.g., `<tool>` without `</tool>`), especially with Qwen3/Gemma4 models (#18676, #18681).  
- **Do not assume image support** in `deepseek-v4.1-flash:cloud` — it will silently discard input (#18527).  
- **Monitor GPU memory use** carefully on RTX 5090 and Apple Silicon MLX systems; both show instability under load (#18642, #16030).  
- **Expect unpredictable hangs** after cache hits on CUDA systems — implement request timeouts and fallback reload logic (#18685).  
- **Cloud users should verify billing status** immediately: accounts stuck in Stripe retry loops may be blocked entirely (#18683).  

> ⚠️ **Recommendation:** Delay production deployment of `qwen3.6:35b-a3b-nvfp4`, `cohere2moe`, and `deepseek-v4.1-flash:cloud` until these critical issues are resolved.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-28**

---

### **1. Today's Highlights**  
The LiteLLM project is advancing its core infrastructure with a major push toward Rust-based performance and security improvements, including native Python inference opt-in, structured tracing, and separation of gateway authentication and authorization. Critical stability fixes address high-severity issues such as virtual-key allowlist bypasses on Azure routes and null response bodies after router fallbacks—both of which could compromise cost tracking and access control.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, several critical PRs are pending merge that may introduce breaking changes:  
- **PR #43477** (`fix(sail): bill chat requests by caller's metadata.completion_window`) — Will change billing behavior based on `completion_window` (`asap`, `balanced`, `flex`). Existing deployments relying on default pricing must audit their cost models. [GitHub](https://github.com/BerriAI/litellm/pull/43477)  
- **PR #43509 / #43507 / #43506** — Update deprecation dates for Together AI models and sync OpenRouter prices. These changes affect model availability and cost calculations; users should verify their config maps and price mappings. [GitHub (deprecation)](https://github.com/BerriAI/litellm/pull/43509), [GitHub (OpenRouter)](https://github.com/BerriAI/litellm/pull/43506)

---

### **3. New Model & Hardware Support**  
- ✅ **Tsubasa provider routing and dashboard discovery** added via PR #43502, enabling direct integration with Tsubasa’s public endpoints.  
- ✅ **Mistral Document AI OCR and Mistral 3.5 Medium** now supported in Azure via PR #32637.  
- ✅ **Cohere Command A+** added to Azure via PR #32628.  
- ✅ **WebRTC support for gpt-realtime** (Azure OpenAI) now includes cost tracking in v1.82.3 (per Issue #25738).  

> *Note: While not new models, enhanced support for WebRTC and MCP gateways signals deeper real-time agent integration.*

---

### **4. Performance & Optimization**  
- 🚀 **Native Python inference opt-in** introduced via PR #43465 — enables low-latency, direct execution through `python-bridge` routes, reducing overhead from external process calls.  
- 🔍 **Structured route lifecycle tracing** added via PR #43466 — provides granular observability across audio transcription, chat, responses, and WebSocket paths using `rust-tracing`.  
- ⚙️ **Separation of gateway auth & authz** (PR #43467) improves scalability and security in multi-tenant environments.  
- 💡 **Rust migration progress**: The entire gateway stack is being restructured into modular crates (`gateway-auth`, `gateway-ui`, `gateway-mcp`, `gateway-management`), setting the foundation for future performance gains and reduced memory footprint.

---

### **5. Stability & Regressions**  
High-priority bugs reported today:  
1. **[Critical]** `RouterFallback` returns `null` response body after successful fallback (Issue #43165) — breaks client expectations and can cause silent failures. *[GitHub](https://github.com/BerriAI/litellm/issues/43165)*  
2. **[High]** Virtual key allowlist bypass on `/azure/openai/deployments/*` route due to missing model resolution (Issue #41295) — allows unauthorized access to Azure deployments. *[GitHub](https://github.com/BerriAI/litellm/issues/41295)*  
3. **[Medium]** Cost tracking fails for `Responses API` WebSocket mode (`_aresponses_websocket`), logging `prompt_tokens=0` (Issue #38674) — impacts agent CLI cost visibility. *[GitHub](https://github.com/BerriAI/litellm/issues/38674)*  
4. **[Medium]** Anthropic `/v1/responses` streaming doubles thinking text in reasoning content (Issue #43010) — corrupts agent reasoning logs. *[GitHub](https://github.com/BerriAI/litellm/issues/43010)*  

> ✅ Fix PRs exist for some regressions:  
> - PR #43465 (Python inference) and #43466 (tracing) are actively merged.  
> - PR #43165 has no fix yet; needs urgent attention.

---

### **6. What This Means for Application Developers**  
- **Use caution with virtual keys and Azure pass-through routes** — the current allowlist bypass (Issue #41295) poses a serious risk if your app uses untrusted or rotating keys. Avoid exposing `/azure/openai/deployments/...` endpoints without additional RBAC.
- **Enable the new Rust-based tracing** (PR #43466) to gain deep visibility into agent workflows, especially for real-time and multi-turn applications using `responses` or `websearch_interception`.
- **Update cost-tracking logic** if you rely on `completion_window` semantics — the upcoming PR #43477 will shift billing granularity and could alter per-request costs.
- **Avoid streaming `responses` API calls until Issue #38674 is fixed**, as token usage will be misreported as zero, leading to inaccurate spend reporting in agent tooling.
- **Monitor for breaking changes in model deprecations** — the recent updates to Together AI and OpenRouter pricing data may require immediate config adjustments.

> 📌 **Pro Tip**: If building agents with long-running sessions, watch Issue #43190 — shared `max_budget_per_session` across agents can lead to unexpected overages.

---  
*Digest compiled from GitHub activity (2026-09-28). For real-time status, monitor [BerriAI/litellm Issues](https://github.com/BerriAI/litellm/issues) and [Pull Requests](https://github.com/BerriAI/litellm/pulls).*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-28**

---

#### **1. Today's Highlights**  
Unsloth has released prebuilt CUDA 13 wheels for PyTorch 2.13 and 2.14 on Python 3.13, including FlashAttention2 2.8.4, Causal-Conv1D 1.7.0, and Mamba_SSM 2.3.2.post1 — enabling faster inference and training on modern GPU stacks. Simultaneously, critical fixes were merged to address tokenization limits in `unsloth start opencode` (now respects `--max-tokens`) and terminal tool hangs due to unbounded shell variable expansion.

---

#### **2. Releases & Breaking Changes**  
- ✅ **New Prebuilt Wheels (cu13)**:  
  [prebuilt-wheels-cu13](https://github.com/unslothai/unsloth/releases/tag/prebuilt-wheels-cu13) includes FlashAttention2 2.8.4, Causal-Conv1D 1.7.0, and Mamba_SSM 2.3.2.post1 for Linux x86_64, built for PyTorch 2.13 and 2.14 on Python 3.13.  
  *Impact*: Users on NVIDIA cu130 systems with Python 3.13 should expect improved out-of-the-box performance for LLM serving and fine-tuning workflows.

- 🛠️ **PyTorch Version Ceiling Raised**:  
  PR [#12152](https://github.com/unslothai/unsloth/pull/12152) raises the allowed torch version ceiling from `<2.13.0` to `<2.15.0`, ensuring compatibility with newer PyTorch releases.

- ⚙️ **Auto-install Support Added for Torch 2.13/2.14**:  
  PR [#12151](https://github.com/unslothai/unsloth/pull/12151) adds pip extras and auto-install support for PyTorch 2.13.0 and 2.14.0, streamlining setup for new Studio installs.

- 🔄 **Studio Default Upgrade Path**:  
  PR [#12150](https://github.com/unslothai/unsloth/pull/12150) enables new Linux cu130 + Python 3.13 installations to use Torch 2.13 by default, while preserving existing installs' versions.

---

#### **3. New Model & Hardware Support**  
- 💡 **MLX Model Memory Estimation**:  
  PR [#10287](https://github.com/unslothai/unsloth/pull/10287) introduces an MLX planner for Apple Silicon hosts, allowing accurate memory estimation during model loading — previously unavailable due to backend refusal of non-GGUF models.

- 🔧 **Multi-GPU Layer Placement Flexibility**:  
  PR [#10770](https://github.com/unslothai/unsloth/pull/10770) adds explicit `--split-mode layer` support for manual multi-GPU layer distribution, improving control over tensor partitioning on heterogeneous setups.

- 🌐 **ModelScope Mirror Integration**:  
  PR [#11761](https://github.com/unslothai/unsloth/pull/11761) resolved #11529 by enabling ModelScope as a fallback for blocked Hugging Face regions (e.g., China), improving global accessibility.

---

#### **4. Performance & Optimization**  
- ⚡ **Block-FP8 LoRA Training Speedup**:  
  PR [#12027](https://github.com/unslothai/unsloth/pull/12027) optimizes block-FP8 LoRA training by running FP8 linears eagerly and using 8 warps per 128-row GEMM tile. Benchmarks show **4–15x speedup** on RTX PRO 6000, L4, H100, and B200 GPUs — closing a major bottleneck in low-bit quantized fine-tuning.

- 📦 **4-bit Loading for Block-FP8 Checkpoints**:  
  PR [#12146](https://github.com/unslothai/unsloth/pull/12146) now allows `load_in_4bit=True` to load fine-grained FP8 checkpoints (e.g., Qwen3-FP8, GLM-5.3-Flash), unlocking efficient 4-bit inference without requiring full re-quantization.

- 🖥️ **FP8 Kernel Fallback for Unsupported GPUs**:  
  PR [#12098](https://github.com/unslothai/unsloth/pull/12098) adds automatic fallback from FBGEMM to generic kernels for rowwise FP8 on RTX PRO 6000 / 5090-class GPUs (sm120), resolving silent failures during model execution.

---

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [#12009](https://github.com/unslothai/unsloth/issues/12009): `unsloth start opencode` capped at 8192 tokens despite `max_tokens` | High | Open | ✅ PR [#12111](https://github.com/unslothai/unsloth/pull/12111) merged |
| [#12048](https://github.com/unslothai/unsloth/issues/12048): Terminal tool calls hang indefinitely due to recursion in credential scan | Critical | Open | ✅ PR [#12087](https://github.com/unslothai/unsloth/pull/12087) merged |
| [#12084](https://github.com/unslothai/unsloth/issues/12084): Hard freeze on `VAR=$VAR` self-referential assignment in quoted strings | Critical | Open | ❌ No fix yet |
| [#12058](https://github.com/unslothai/unsloth/issues/12058): "Invalid base64 value" errors despite valid image return | Medium | Open | ❌ No fix yet |
| [#12140](https://github.com/unslothai/unsloth/issues/12140): Bitdefender flags Unsloth Desktop installer as malware | High | Open | ❌ False positive; user-facing only |

> 🔴 **Critical Note**: The `VAR=$VAR` recursion bug (#12084) causes complete app freezes and requires immediate attention — users should avoid complex shell commands in tools until resolved.

---

#### **6. What This Means for Application Developers**  
- ✅ **Build faster, leaner agents**: Use the new `--max-tokens` flag in `unsloth start opencode` for long-context generation without artificial caps.
- 🚀 **Leverage optimized FP8 training**: Enable `load_in_4bit=True` on block-FP8 models (Qwen3-FP8, DeepSeek-style) for dramatic training speedups across high-end GPUs.
- 🧩 **Improve reliability with tool design**: Avoid self-referential shell assignments (`VAR=$VAR`) in terminal tools — this triggers a known deadlock.
- 🌍 **Support global deployment**: Leverage ModelScope mirror integration to serve models in restricted regions.
- 📈 **Optimize memory usage**: Use the new MLX memory estimator and multi-GPU layer splitting for better resource planning on Apple Silicon and multi-GPU systems.

> 💡 **Action Item**: Update to the latest prebuilt wheels (`cu13`) if you're using PyTorch 2.13+ and Python 3.13 on Linux x86_64 — it unlocks the newest kernels and avoids regressions.

---  
*Digest generated: 2026-09-28 | Source: [unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*