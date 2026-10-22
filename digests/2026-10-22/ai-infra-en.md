# AI Infrastructure Digest 2026-10-22

> Generated: 2026-10-22 00:50 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-22**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of intense specialization and hardware convergence, with projects rapidly adapting to next-gen architectures like AMD’s MI355X (gfx950), NVIDIA’s Blackwell (SM120), and Apple Silicon (MLX). Critical performance regressions in high-throughput backends—particularly around NVFP4, speculative decoding, and distributed KV caching—highlight the growing complexity of optimizing for both efficiency and correctness. At the same time, new model types (MoE, multimodal, hybrid Mamba) and deployment patterns (disaggregation, agent orchestration) are driving architectural innovation across all layers, from low-level kernels to application-facing gateways.

---

### **2. Activity Comparison**

| Project       | Issues Open (Last 24h) | PRs Merged (Last 24h) | Release Status         |
|---------------|--------------------------|-------------------------|------------------------|
| **vLLM**      | 8                        | 7                       | Stable: v0.32.0        |
| **SGLang**    | 5                        | 6                       | No release; nightly builds |
| **llama.cpp** | 4                        | 5                       | Build-only: `b11803`+   |
| **Ollama**    | 5                        | 6                       | v0.40.8 (stable)       |
| **LiteLLM**   | 6                        | 5                       | v1.106.2–v1.103.7 (security fixes) |
| **Unsloth**   | 5                        | 5                       | No release; breaking changes imminent |

> 🔍 *Observation*: LiteLLM leads in rapid security response, while vLLM and SGLang show the highest engineering velocity in core inference optimizations. Ollama maintains stable releases despite critical stability issues.

---

### **3. Model Support Race**

| New Model / Architecture       | Supported By                          | Notes |
|-------------------------------|---------------------------------------|------|
| **Qwen3.8-Flash-Next**        | vLLM, SGLang, Unsloth, llama.cpp      | Full ROCm/AMD support in vLLM/SGLang; native MLX support in Unsloth |
| **DeepSeek-V4.1-Flash**       | SGLang, Unsloth, llama.cpp            | SGLang enables 1M-context on RTX PRO 6000 via DSpark |
| **Flint (FlintForCausalLM)**   | **llama.cpp**, **Ollama**             | Only two projects have full GGUF + HF conversion support |
| **SenseNova U1 (multimodal)** | **llama.cpp**                         | Only project with image-to-text capability |
| **GLM-5.3-Flash (hybrid)**    | SGLang, llama.cpp, Unsloth           | SGLang leads in Hopper/Blackwell kernel optimization |
| **MOSS-Image (diffusion)**    | **Unsloth**                           | First project to integrate image generation into Studio UI |

> 🏆 **Leader**: **Unsloth** and **SGLang** are ahead in specialized model support—especially for multimodal, hybrid, and diffusion workloads.

---

### **4. Performance Frontier**

| Optimization Focus          | Leading Projects                     | Key Developments |
|------------------------------|--------------------------------------|------------------|
| **KV Cache & Memory Management** | vLLM, SGLang, Ollama                | vLLM: `DFlash` draft loading fix; SGLang: HiCache + disaggregation; Ollama: context window accuracy |
| **Kernel-Level Efficiency**  | vLLM, SGLang, llama.cpp              | vLLM: fused QK-norm+RoPE+gate (ROCm); SGLang: CuTe DSL KDA for SM90; llama.cpp: Adreno X1 GEMM |
| **Speculative Decoding**     | vLLM, SGLang, Ollama                 | vLLM: MoE LoRA handling; SGLang: tile-split FP8 sparse decode; Ollama: DFlash2 block-local convolutions |
| **Quantization & Mixed Precision** | vLLM, SGLang, llama.cpp, Ollama | vLLM: NVFP4 regression; SGLang: MXFP8 input direct write; Ollama: MLX concurrent generation |
| **Distributed & Scalable Serving** | SGLang, Ollama, LiteLLM             | SGLang: prefill-decode disaggregation; Ollama: Cloud Pro scaling issues; LiteLLM: proxy routing pending |

> ⚙️ **Frontier Summary**: The most active frontiers are **distributed inference** (SGLang), **mobile-edge kernels** (llama.cpp), and **mixed-precision correctness** (vLLM).

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Differentiation |
|---------------|-----------------------------------|-----------------|
| **vLLM**      | Inference Engine (GPU-native)     | Dominant in high-throughput, low-latency GPU serving; deep integration with FlashInfer |
| **SGLang**    | High-Performance Serving Framework | Focus on scalability, disaggregation, and agentic workflows; strong multi-node support |
| **llama.cpp** | Local Runtime / Edge Inference    | Unmatched cross-platform reach (mobile, NPU, SYCL, Vulkan); ideal for offline, privacy-sensitive apps |
| **Ollama**    | LLM Gateway / Developer CLI       | Bridging local models with tool use and agent APIs; strongest UX for developers |
| **LiteLLM**   | API Gateway / Routing Layer       | Multi-provider abstraction layer; key enabler for cost-aware, fallback-driven inference |
| **Unsloth**   | Agent Platform / Fine-Tuning UI   | Combines inference, fine-tuning, and visualization in one studio; optimized for Apple Silicon and MoE |

> 🧩 **Strategic Insight**: The stack is becoming vertically integrated—Unsloth (agent platform), Ollama (gateway), LiteLLM (orchestration), vLLM/SGLang (engine), and llama.cpp (edge runtime)—each filling distinct niches.

---

### **6. Trend Signals**

#### ✅ **Emerging Trends Extracted from Today’s Activity**:
1. **Hardware-Specific Optimization is Now Mandatory**  
   - ROCm/AMD (MI355X), Blackwell (SM120), and Apple MLX are no longer "nice-to-have" — they’re central to performance and correctness.
   - Projects that lag behind (e.g., vLLM’s NVFP4 slowdown) face immediate usability degradation.

2. **Agent-First Workflows Are Driving Infrastructure Design**  
   - SGLang’s disaggregation, Ollama’s Flint tool use, and Unsloth’s Decision API sub-agents reflect a shift toward long-running, stateful agents requiring persistent cache, structured output, and efficient parallelism.

3. **Security Is a Foundational Layer, Not an Afterthought**  
   - The malicious `litellm==1.107.0` incident underscores that open-source inference tooling is now a prime attack vector. Image signing (Cosign), audit trails, and dependency verification are non-negotiable.

4. **Memory and VRAM Pressure Is the New Bottleneck**  
   - MoE models, large contexts, and diffusion pipelines are pushing limits on VRAM (Unsloth’s host-based embeddings), CPU memory (llama.cpp’s OOM), and inter-GPU bandwidth (SGLang’s Mooncake).

5. **Rust Migration Signals Long-Term Performance Aspirations**  
   - LiteLLM’s Rust rewrite aims for <1ms overhead — a clear signal that future inference engines must be lightweight, deterministic, and scalable at massive scale.

#### 🔮 **What Application Developers Should Watch**:
- **Avoid production use of Flint (Ollama)** until type-preservation bugs are fixed (`PR #19195`).
- **Monitor vLLM’s NVFP4 regression** — it may force a switch to FP8 in latency-critical deployments.
- **Leverage llama.cpp’s Adreno X1 and Hexagon NPU support** for mobile/edge agent systems.
- **Prepare for Rust-based inference backends** — expect major performance gains in 2027.
- **Use signed Docker images (LiteLLM, Ollama)** and verify signatures in CI/CD pipelines.

---

> 📌 **Final Takeaway**: The AI infrastructure landscape is no longer just about speed — it's about **correctness, security, and composability across heterogeneous hardware and agent workflows**. Choose your stack not by hype, but by alignment with your model, hardware, and reliability requirements.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-22**

#### **1. Today’s Highlights**  
The vLLM project continues to accelerate hardware and model support for next-gen inference, with critical work on ROCm/AMD performance optimization for Qwen3.8-Flash-Next and Qwen3.8-2.4T-A95B on gfx950 (MI355X), alongside a major fix for `DFlash`/`DSpark` draft loading in mixed-precision checkpoints. A key regression in `NVFP4` decode performance on DGX Spark (GB10/SM121) was reported (~16% slowdown since v0.29.0), and several PRs are actively addressing correctness issues in speculative decoding, MoE expert LoRA handling, and KV cache alignment.

#### **2. Releases & Breaking Changes**  
None. No new releases or breaking changes were published in the past 24 hours. The latest stable version remains **v0.32.0**, with nightly builds continuing to track `main`.

#### **3. New Model & Hardware Support**  
- ✅ **ROCm Support Added**:  
  - `amd/Muse-Spark-Open-816B-A42B-Quark-MXFP4` now supported on ROCm via PR #62622.  
  - `amd/Step-5-Preview` added for AMD GPUs with portable Triton kernels (PR #61837).  
- 📌 **New Model Integrations**:  
  - `nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4` and `dory1.0-4b-bf16` added (PRs #60149, #63001).  
- ⚙️ **Backend Expansion**:  
  - `DeepSeek-V4-Flash-0731` now under active SM8x (Ampere: A100/A800) support tracking (Issue #50576).  
  - Hybrid Mamba models now better supported on RDNA via fallback fixes (Issue #50264).

#### **4. Performance & Optimization**  
- 🔥 **Critical NVFP4 Regression**:  
  FlashInfer NVFP4 causal prefill is **1.7–1.8× slower** than FP8 on SM120 (Blackwell consumer cards) — issue #50416.  
- 📈 **ROCm Performance Focus**:  
  Ongoing optimization for `Qwen3.8-Flash-Next` and `Qwen3.8-2.4T-A95B` on gfx950 (MI355X) via stacked PRs (Issues #59575, #57149).  
- 💡 **Kernel Improvements**:  
  - Fixing top-k gather pivot inaccuracies due to Gaussian fit bias (Issue #61998).  
  - Fused QK-norm+RoPE+gate kernel enabled for Qwen3-Next on ROCm (PR #51406).  
  - Shared compile cache hashing between JIT and AOT paths improves caching efficiency (PR #62628).

#### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| ⚠️ High | #62776 | Prompt content beyond `indexer_budget` (~2K tokens) is invisible in Qwen3.8-Flash-Next on GB10 (v0.32 nightly) | ❌ Not yet fixed |
| ⚠️ High | #59770 | ~16% decode slowdown for Nemotron-3.5-Lightning on DGX Spark (GB10/SM121) since v0.29.0 | ❌ No fix in sight |
| ⚠️ Medium | #62320 | Hybrid attention/Mamba models fail on B12X backend due to inflated block size (2176 vs max 128) | ❌ Blocking deployment |
| ⚠️ Medium | #62559 | Mooncake proxy returns HTTP 200 even when decode fails | ❌ Open |
| ⚠️ Low | #62225 | CPU backend applies LoRA adapter to non-LoRA requests silently | ❌ Silent wrong output |

#### **6. What This Means for Application Developers**  
- **Use caution with NVFP4 on Blackwell**: Expect significant latency degradation in `FlashInfer` backends — consider switching to `FP8` if low-latency is critical.  
- **Avoid `indexer_budget` limits in long-context prompts**: If using Qwen3.8-Flash-Next on GB10, ensure prompt length stays below ~2K tokens or risk silent truncation (#62776).  
- **Hybrid models on B12X? Wait**: Block size inflation breaks compatibility — avoid `--attention-backend b12x` until #62320 is resolved.  
- **Speculative decoding + structured output? Be cautious**: Draft validation logic may not preserve output distribution under speculative decoding (RFC #62818).  
- **ROCm users**: Expect ongoing improvements for Qwen3.8 series on MI355X; monitor PRs #59575, #57149, and #61529 for stability gains.

> 🔗 *See full context: [vLLM GitHub Issues](https://github.com/vllm-project/vllm/issues), [Pull Requests](https://github.com/vllm-project/vllm/pulls)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-22**

---

### **1. Today's Highlights**  
The SGLang project continues to deepen its support for large-scale, high-throughput inference with critical work on **prefill-decode disaggregation**, **multi-node scalability**, and **Hopper (SM90) kernel optimization**. Major focus areas include fixing stability issues in `fa4` attention backend on SM120 GPUs, resolving flaky CI pipelines, and advancing the roadmap for dLLM serving and agentic cache scheduling.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes reported in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen3.8-Flash-Next (gfx950 / MI355X)**: Active performance tracking underway ([#44304](https://github.com/sgl-project/sglang/issues/44304)) for ROCm-enabled AMD deployments.  
- ✅ **DeepSeek-V4.1-Flash (SM120, PCIe-only)**: Field report confirms successful 1M-context serving across 4x RTX PRO 6000 cards with DSpark enabled ([#44445](https://github.com/sgl-project/sglang/issues/44445)).  
- ✅ **GLM-5.3-Flash (SM120 & SM90)**: Ongoing optimizations for both Hopper (SM90) and Blackwell (SM120), including CUDA graph capture fixes and hybrid extend reshape improvements ([#42012](https://github.com/sgl-project/sglang/issues/42012), [#45373](https://github.com/sgl-project/sglang/issues/45373)).  
- ✅ **AMD Disaggregation**: CI now regresses to `ibv_reg_mr` for Mooncake KV buffer registration to restore test stability ([#45691](https://github.com/sgl-project/sglang/pull/45691)).

---

### **4. Performance & Optimization**  
- 🔧 **Hopper (SM90) Kernel Support**: The CuTe DSL KDA verify kernel is now extended to SM90, enabling native verification paths instead of falling back to Triton ([#44612](https://github.com/sgl-project/sglang/pull/44612)).  
- 🔧 **Sparse Decode Flexibility**: TileLang FP8 sparse decode now supports arbitrary tile splits (not just halvings), improving GPU utilization for models like GLM-5.3-Flash ([#45274](https://github.com/sgl-project/sglang/pull/45274)).  
- 🔧 **Attention Backend Improvements**:  
  - DeepSeek-V4.1 Mega attention now writes MXFP8 inputs directly, reducing redundant kernels ([#45632](https://github.com/sgl-project/sglang/pull/45632)).  
  - TRTLLM-Gen attention backend gains PD disaggregation support for DeepSeek-V4 ([#45221](https://github.com/sgl-project/sglang/pull/45221)).  
- 📈 **Prefill-Decode Disaggregation**: Now fully integrated with HiCache, speculative decoding, and multiple parallel strategies (TP/PP/CP/DCP/DP). Q4 roadmap tracks further refinements ([#43699](https://github.com/sgl-project/sglang/issues/43699)).

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR? |
|------|----------|--------|---------|
| [CUDA Coredump Tracker #26340](https://github.com/sgl-project/sglang/issues/26340) | Critical | Open | ❌ No fix yet |
| [GLM-5.3-Flash on SM120: fa4 crashes at CUDA-graph capture](https://github.com/sgl-project/sglang/issues/42012) | High | Open | ❌ Only triton works |
| [Startup OOM with 32 tokenizer workers + cuda_vmm on GB300](https://github.com/sgl-project/sglang/issues/45345) | High | Open | ❌ Pending investigation |
| [Silent DP rank blocks /flush_cache](https://github.com/sgl-project/sglang/issues/45512) | Medium | Open | ❌ No fix |
| [FP8 block-quantized checkpoint gives wrong tokens intermittently](https://github.com/sgl-project/sglang/issues/45000) | High | Open | ❌ Reproducible on RTX 3090 |

> ⚠️ Multiple stability issues affecting production-grade deployments—especially on SM120 and multi-node GB300 setups—highlight ongoing challenges with memory management and backend correctness.

---

### **6. What This Means for Application Developers**  
- **Avoid `fa4` attention on SM120 GPUs** until the crash in hybrid extend reshape is resolved—use `triton` as a temporary workaround.  
- **Enable `--cuda-graph-backend-prefill` explicitly** when using Clef checkpoints to prevent silent override ([#45692](https://github.com/sgl-project/sglang/pull/45692)).  
- **Leverage disaggregation for scale**: Prefill-Decode separation is now stable and widely supported; use it for long-context agents and high-concurrency workloads.  
- **Watch for OOMs in multi-node deployments**—especially with `--tokenizer-worker-num 32` and `cuda_vmm` transport—tune worker count or disable VMM if needed.  
- **For agentic systems**, consider enabling PPD (Prefill short requests on decode worker) via RFC [#45416](https://github.com/sgl-project/sglang/issues/45416) to reduce latency in multi-turn scenarios.

---  
*Stay tuned for upcoming v0.5.23 release, expected to include several of these fixes.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-22**

---

### **1. Today's Highlights**  
The latest release cycle brings significant model and backend enhancements, including support for the **Flint (FlintForCausalLM)** and **SenseNova U1** models, expanding llama.cpp’s reach into emerging multimodal and dense language architectures. On the performance front, critical kernel optimizations for **Adreno X1 devices (OpenCL)** and a new fused QSA mask op in `llama` improve inference efficiency, while ongoing work on speculative decoding and MoE caching signals deeper architectural refinement.

---

### **2. Releases & Breaking Changes**  
- **Latest Builds**: `b11803`, `b11802`, `b11801`, `b11800`, `b11799`, `b11798`, `b11797`, `b11796`, `b11795`, `b11793`  
  - [GitHub Release Page](https://github.com/ggml-org/llama.cpp/releases)  
- **Key API/Config Updates**:  
  - `server`: Sampling parameters are now fully forwarded via `/v1/messages` (PR #30856), improving compatibility with OpenAI-compatible APIs.  
  - Jinja parser fixes: Namespace attribute shadowing (PR #30941) and hexadecimal string escapes (PR #30929) ensure robust template rendering.  
  - New `clean_spaces` GGUF key added to control detokenization spacing behavior (PR #30940).

---

### **3. New Model & Hardware Support**  
- **New Models**:  
  - ✅ **Flint (FlintForCausalLM)** – Added support with full HF-to-GGUF conversion, sliding/full attention, and routed/shared experts (PR #30928).  
    [PR #30928](https://github.com/ggml-org/llama.cpp/pull/30928)  
  - ✅ **SenseNova U1** – Added understanding branch support (U1.5-8B-MoT), including image-to-text and multimodal generation (PR #28919).  
    [PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919)  
- **Hardware & Backends**:  
  - ✅ **Hexagon NPU**: Added DSV4_HC_PRE and DSV4_HC_POST ops (PR #30953).  
  - ✅ **Adreno X1 (OpenCL)**: Optimized bin kernels for Q4_0, Q4_K, and Q6_K GEMM (PRs #30947–#30949).  
  - ✅ **SYCL**: Fused QSA scoring op (PR #30640), supporting GLM5.3-next.  
  - ✅ **OpenCL**: IM2COL_3D support (PR #30895), aiding convolutional layers in vision models.

---

### **4. Performance & Optimization**  
- **Kernel-Level**:  
  - New fused QSA mask op (`llama`) reduces overhead in attention scoring (PR #30640).  
  - Adreno X1 optimized GEMM kernels for Q4_0/Q4_K/Q6_K reduce latency by up to ~20% in benchmarked cases (PRs #30947–#30949).  
- **Memory & Load**:  
  - Fixed memory peak during model loading for large embedding models (PR #27483).  
  - Improved vocabulary loading speed (PR #30679).  
- **Speculative Decoding**:  
  - PR #30945 adds optional `fc.input_scale` support for DFlash, enabling better scaling fidelity.  
  - Research continues on FR-Spec-style draft-vocab trimming (Issue #25187).

---

### **5. Stability & Regressions**  
- **Critical Issues Reported**:  
  - **SYCL NaN output** on dense Qwen3.8-27B Q4_K_M after #29107 (PR #30892).  
    [Issue #30892](https://github.com/ggml-org/llama.cpp/issues/30892)  
  - **Vulkan DeviceLostError** on Linux 7.x kernels (Strix Halo) (Issue #25664).  
    [Issue #25664](https://github.com/ggml-org/llama.cpp/issues/25664)  
  - **ROCm RPC crash** with TOP_K on distributed Qwen3.8-Flash-Next (Issue #27865).  
    [Issue #27865](https://github.com/ggml-org/llama.cpp/issues/27865)  
  - **Regression in first-inference TTFT** (10s → 60s+) due to #30449 (MoE CPU-resident weights) (Issue #30793).  
    [Issue #30793](https://github.com/ggml-org/llama.cpp/issues/30793)  
- **Fixes in Progress**:  
  - PR #30892 has a workaround (fused GEMM off) but no final fix yet.  
  - PR #30941 resolves jinja namespace shadowing causing crashes.

---

### **6. What This Means for Application Developers**  
- **Multimodal Apps**: With Flint and SenseNova U1 support, developers can now deploy cutting-edge **multimodal LLMs** locally using GGUF formats—ideal for privacy-sensitive or offline agent systems.  
- **Mobile & Edge Deployment**: Adreno X1 optimizations enable faster inference on Snapdragon-based mobile devices, unlocking real-time LLM use on edge hardware.  
- **API Consistency**: The `/v1/messages` sampling param forwarding ensures smoother integration with tools like LangChain, LlamaIndex, and custom agents.  
- **Caution**: Avoid SYCL + Q4_K_M quantizations on Intel Arc GPUs until #30892 is resolved. Monitor `b11803`+ builds for stability in production.  

> 💡 **Recommendation**: Use `--no-mtmd` or `mtmd_gen` state objects (PR #30902) for stable multimodal prompt handling; test with `clean_spaces=1` GGUF key if tokenization spacing issues arise (e.g., `x!= y`).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **Ollama Digest – 2026-10-22**

#### **1. Today's Highlights**  
Ollama launched *Flint*, Recursive’s advanced coding agent model, bringing powerful tool-use capabilities to local inference. However, early adopters report critical stability issues with Flint (e.g., `500 Internal Server Error`, integer-to-float argument drift), and Ollama Cloud Pro users are experiencing near-total service failure. Concurrently, key PRs landed to improve MLX concurrency, preserve tool call types, and fix context window handling in OpenCode.

#### **2. Releases & Breaking Changes**  
- **v0.40.8**: Released today as the latest stable version. Includes fixes for model serving stability, MLX support, and internal API improvements. No breaking changes announced.  
  🔗 [GitHub Release v0.40.8](https://github.com/ollama/ollama/releases/tag/v0.40.8)

#### **3. New Model & Hardware Support**  
- **Flint (Recursive)**: Officially added via `ollama pull flint` — optimized for coding agents with structured tool use.  
  🔗 [Flint on Ollama Library](https://ollama.com/library/flint)  
- **Apple Foundation Models (macOS)**: PR #19184 adds native runner support for Apple’s on-device `apple-foundation-model`, enabling CLI/API access via `ollama run`.  
  🔗 [PR #19184: applefm: add runner](https://github.com/ollama/ollama/pull/19184)  
- **MLX Backend**: PRs #19197 and #19194 extend MLX support with concurrent generation and DFlash2 integration (dynamic block drafting).  
  🔗 [PR #19197: mlx: support concurrent generation](https://github.com/ollama/ollama/pull/19197)  
  🔗 [PR #19196: mlx: add d3 decision model support](https://github.com/ollama/ollama/pull/19196)

#### **4. Performance & Optimization**  
- **MLX Parallelism**: PR #19197 enables `OLLAMA_NUM_PARALLEL` for MLX models, reducing first-token latency by allowing multiple requests to share projection/FFN layers while maintaining attention isolation.  
- **DFlash2 Integration**: PR #19149 introduces block-local dynamic convolutions and candidate chaining for faster speculative decoding.  
- **Context Window Accuracy**: PR #19193 ensures OpenCode uses actual allocated context (`num_ctx`) instead of static `ContextLength`, preventing premature compaction.  
  🔗 [PR #19193: launch: use allocated context for OpenCode](https://github.com/ollama/ollama/pull/19193)

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [`#15453`](https://github.com/ollama/ollama/issues/15453): Ollama Cloud Pro — 95% failure rate across all cloud models | Critical | Open | None |
| [`#19186`](https://github.com/ollama/ollama/issues/19186): Flint fails with `500 Internal Server Error` on AGX Orin | High | Open | Pending |
| [`#19191`](https://github.com/ollama/ollama/issues/19191): Flint re-emits integers as floats (`30000` → `"30000.0"`) | High | Open | ✅ [PR #19195](https://github.com/ollama/ollama/pull/19195) |
| [`#19187`](https://github.com/ollama/ollama/issues/19187): Silent dropping of invalid tool calls (no error, `eval_count > 0`) | Medium | Open | Pending |
| [`#19177`](https://github.com/ollama/ollama/issues/19177): Streaming errors after first chunk dropped silently | Medium | Open | ✅ [PR #19188](https://github.com/ollama/ollama/pull/19188) |

> ⚠️ **Critical Note**: Ollama Cloud Pro is currently non-functional for most users. Flint exhibits serious type-preservation bugs affecting agent reliability.

#### **6. What This Means for Application Developers**  
- **Avoid Flint in production until PR #19195 lands** — integer arguments may be misparsed due to float coercion, breaking schema validation.
- **Use `OLLAMA_MAX_LOADED_MODELS=1` cautiously**: PR #19190 addresses a regression where `keep_alive` cancels pending model evictions, stalling queued requests.
- **For OpenCode integrations**: Ensure context limits reflect actual `num_ctx` (not advertised max) — use PR #19193 workaround or wait for merge.
- **Expect improved MLX performance** with concurrent generation and DFlash2; ideal for high-throughput local inference.
- **Do not rely on streaming error visibility**: PR #19188 fixes silent loss of post-streaming errors — upgrade to v0.40.8+ for reliable diagnostics.

> 📌 **Actionable**: Monitor [PR #19195](https://github.com/ollama/ollama/pull/19195) for Flint tool-call integrity fix. Test against `v0.40.8` if using Flint or cloud models.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-22**

---

### **1. Today's Highlights**  
A critical security incident involving a malicious `litellm==1.107.0` package (PyPI and Docker) was swiftly addressed: the release was yanked from all public registries, and affected images were revoked. Meanwhile, progress continues on the long-awaited Rust migration—now under active development with strong community interest—and new provider integrations (Engy, OpenRouter rerank, Foundry Local) are being added to expand LiteLLM’s compatibility.

---

### **2. Releases & Breaking Changes**  
- **v1.106.2**, **v1.105.3**, **v1.104.5**, **v1.103.7**: All released within the last 24 hours with consistent security hardening.  
  🔗 [GitHub Release v1.106.2](https://github.com/BerriAI/litellm/releases/tag/v1.106.2)  
- **Security Incident Alert**: The `v1.107.0` release was compromised via a lookalike repo (`Berri-AI/litellm`) and contains a credential stealer (`cook.pth`) and RCE loader.  
  ✅ **All related PyPI packages and Docker images (`latest`, `main-stable`, etc.) have been removed/yanked.**  
  🔗 [Issue #47826 – Security Alert](https://github.com/BerriAI/litellm/issues/47826)  
- **Docker Image Signing**: All official images are now consistently signed using Cosign with a single key introduced in commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). Verify signatures using `cosign verify`.

---

### **3. New Model & Hardware Support**  
- **Engy** added as an OpenAI-compatible provider via JSON config:  
  - Base: `https://api.engy.ai/v1`  
  - Auth: `ENGY_API_KEY` (optional override via `ENGY_API_BASE`)  
  - Supports 8 models including chat completions and Anthropic-style message formatting.  
  🔗 [PR #46744 – Add Engy Provider](https://github.com/BerriAI/litellm/pull/46744)  
- **OpenRouter Rerank Provider** support added for models like `cohere/rerank-v3.5`.  
  🔗 [PR #47885 – Add Rerank Provider](https://github.com/BerriAI/litellm/pull/47885)  
- **Foundry Local** provider integration now supported with SDK 2.2.1 setup.  
  🔗 [PR #47713 – Add Foundry Local Provider](https://github.com/BerriAI/litellm/pull/47713)  
- **Bitdeer AI** added as a JSON-configured provider with pricing for 3 models.  
  🔗 [PR #36734 – Add Bitdeer AI Provider](https://github.com/BerriAI/litellm/pull/36734)

---

### **4. Performance & Optimization**  
- **Rust Migration Initiative (v1.107+)**:  
  🔗 [Issue #31263 – LiteLLM Rust Migration](https://github.com/BerriAI/litellm/issues/31263)  
  - Goal: Achieve sub-1ms overheads and minimal memory footprint.  
  - Early beta signups open; expected to dramatically improve inference latency and throughput in high-scale environments.  
- **Gemini Audio Cache Costing Fix**:  
  Fixed incorrect billing of cached audio tokens — now billed at correct `audio_cache-read` rate instead of `text_cache-read`.  
  🔗 [PR #47886 – Fix Gemini Audio Billing](https://github.com/BerriAI/litellm/pull/47886)  
- **JWKS Key Serving Improvements**:  
  Stale JWKS refreshes no longer block JWT-authenticated requests; old keys served during background fetch.  
  🔗 [PR #47846 – Serve Stale JWKS Keys](https://github.com/BerriAI/litellm/pull/47846)

---

### **5. Stability & Regressions**  
- **Critical**: `Presidio guardrail in logging_only mode masks client response` → breaks streaming/non-streaming behavior.  
  🔗 [Issue #47605](https://github.com/BerriAI/litellm/issues/47605)  
- **High Severity**: `Model list not shown to non-admin users in LiteLLM Proxy` after recent update.  
  🔗 [Issue #17475](https://github.com/BerriAI/litellm/issues/17475)  
- **Medium**: `Redis cache_params ignores env vars` when any key is set → breaks spend tracking across pods.  
  🔗 [Issue #26233](https://github.com/BerriAI/litellm/issues/26233)  
- **Medium**: `End-user budget bypass via stale Redis counters` after clean-miss → can lead to 429s despite fresh window.  
  🔗 [Issue #34238](https://github.com/BerriAI/litellm/issues/34238)  
- **Low**: `Spend logs silently dropped` when upstream returns `id:null` (e.g., Databricks-Gemini).  
  🔗 [Issue #39749](https://github.com/BerriAI/litellm/issues/39749)  

> ✅ **Fix PRs exist for:**  
> - [PR #47846](https://github.com/BerriAI/litellm/pull/47846) (JWKS)  
> - [PR #47886](https://github.com/BerriAI/litellm/pull/47886) (Gemini audio cost)  
> - [PR #47872](https://github.com/BerriAI/litellm/pull/47872) (user-level MCP grants)  

---

### **6. What This Means for Application Developers**  
- **Immediate Action**: If you’re using `litellm==1.107.0`, **do not use it** — it has been compromised. Revert to `v1.106.2` or earlier.  
- **Security Best Practice**: Always verify Docker image signatures with `cosign verify` — especially in production deployments.  
- **Future-Proofing**: Monitor the Rust migration (Issue #31263) — expect major performance gains in 2027.  
- **Routing Flexibility**: Custom routing in proxy (Issue #25297) is still pending, so consider SDK-based routing for complex workflows.  
- **Budget Enforcement**: Be cautious with `budget_duration` updates — existing spend is not reset (Issue #34492). Use `/key/update` with care.  
- **New Providers**: Leverage Engy, OpenRouter rerank, and Foundry Local integrations for broader model access without custom code.  

👉 **Recommended**: Audit your deployment for exposed API keys, ensure Redis cache config is consistent, and test guardrails in `logging_only` mode before production use.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-22**

---

### **1. Today's Highlights**  
Unsloth continues to advance its multi-agent and model-serving infrastructure with key improvements in memory management, stability, and UI responsiveness. Notably, PRs #14574 and #14555 address critical performance regressions on Apple Silicon (MLX) and GPU VRAM contention, while the new `UNSLOTH_DIFFUSION_*` optimization defaults (PR #14566) promise faster image generation across a broader range of hardware.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several breaking changes are imminent due to ongoing internal refactoring:
- The default behavior for **Decision API models** has been updated to exclude them from the chat model picker via PR #14580 — users must now explicitly select them via the API panel.
- **MoE autotune cache reuse** is now enabled by comparing device capability as tuples (PR #14578), preventing repeated tuning runs on identical hardware configurations.

> 🔗 [PR #14580](https://github.com/unslothai/unsloth/pull/14580) | [PR #14578](https://github.com/unslothai/unsloth/pull/14578)

---

### **3. New Model & Hardware Support**  
- **MOSS-Image** support added in Studio via PR #14552, enabling native image generation using `OpenMOSS-Team/MOSS-Image-SFT` and `MOSS-Image-Base`.
- **MLX PLE and expert offload** now supported in Studio (PR #14326), allowing efficient loading of large MoE models like GLM-5.3-Flash and DeepSeek-V4.1-Flash on Apple Silicon devices with limited VRAM.
- **Gemma-3n PLE**, **Qwen3.8-Flash-Next**, and **DeepSeek-V4.1 Engram** now benefit from host/disk-based embedding tables, reducing VRAM pressure.

> 🔗 [PR #14552](https://github.com/unslothai/unsloth/pull/14552) | [PR #14326](https://github.com/unslothai/unsloth/pull/14326)

---

### **4. Performance & Optimization**  
- **Studio video export**: GIF generation speed improved ~3x by applying one global palette per clip (PR #14581).
- **MLX long chats**: Avoid re-reading full context every turn after cache overflow (PR #14574), cutting latency from 7–13s to <1s per turn on 24GB Macs.
- **CFG-parallel diffusion**: Default speed tier now fully supports parallel conditional/unconditional branches across two GPUs (PR #14564).
- **FP8 diffusion weights**: Preserved in fp8 format when no FP8 GEMM runtime exists, halving host RAM usage during load (PR #14549).
- **Automatic optimizations**: All measured-safe diffusion/video features (e.g., fused FLUX RoPE, BF16 small DiTs, Blackwell native attention) enabled by default (PR #14566).

> 🔗 [PR #14581](https://github.com/unslothai/unsloth/pull/14581) | [PR #14574](https://github.com/unslothai/unsloth/pull/14574) | [PR #14566](https://github.com/unslothai/unsloth/pull/14566)

---

### **5. Stability & Regressions**  
- **Critical crash on model unload**: Multiple users report core dumps when ejecting models post-update (Issue #14411). No fix yet; coredump logs requested.
- **VRAM leak on Windows**: Persistent ~200–400MB memory growth per session reported (Issue #14487); likely tied to Python process cleanup.
- **MLX model failure detection**: `unsloth doctor` incorrectly reports CUDA failures on Apple Silicon Macs (PR #14457 fixes this gap).
- **Crashed chat models remain "loaded"**: After OS kill due to OOM, Studio fails to detect process death (PR #14575 addresses this).
- **Block compile regression**: Per-layer compilation breaks checkpointing in distributed training (Issue #14063); workaround: `UNSLOTH_BLOCK_COMPILE=0`.

> 🔗 [Issue #14411](https://github.com/unslothai/unsloth/issues/14411) | [PR #14575](https://github.com/unslothai/unsloth/pull/14575) | [PR #14457](https://github.com/unslothai/unsloth/pull/14457)

---

### **6. What This Means for Application Developers**  
Developers building agents or fine-tuning pipelines should:
- **Avoid `UNSLOTH_BLOCK_COMPILE=1`** in distributed environments until the checkpointing bug is resolved (Issue #14063).
- Leverage **new Decision API sub-agent patterns** (e.g., PR #14523, #14502) for persistent background task orchestration.
- Use **host-based embeddings** (PR #14465) for large MoE models to avoid VRAM bottlenecks.
- Enable **automatic diffusion optimizations** (`UNSLOTH_DIFFUSION_*`) to reduce inference latency without manual tuning.
- Prepare for **MLX-first workflows** on Apple Silicon, especially for lightweight agents and real-time voice/image processing.

> 📌 Pro tip: Monitor `unsloth doctor` output closely — it now properly detects MLX availability (PR #14457), reducing false negatives in CI/CD setups.

---  
*Digest generated: 2026-10-22 | Source: GitHub — unslothai/unsloth*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*