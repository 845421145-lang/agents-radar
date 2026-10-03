# AI Infrastructure Digest 2026-10-03

> Generated: 2026-10-03 01:21 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-03**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a pivotal phase of hardware convergence, with next-generation GPUs like NVIDIA’s Blackwell (SM120) and AMD’s MI355X/MI45x driving urgent performance and stability fixes across all major projects. Speculative decoding, prefix caching, and hybrid attention models are now central to competitive differentiation, while model-specific optimizations reveal deep architectural divergence in how engines handle emerging LLM families (e.g., GLM-5.x, Qwen3.8-Flash, DeepSeek-V4). The growing maturity of local runtimes (llama.cpp, Unsloth), gateway abstractions (LiteLLM), and high-throughput servers (vLLM, SGLang) reflects a bifurcation between edge-native deployment and cloud-scale orchestration—each demanding distinct optimization strategies.

---

### **2. Activity Comparison**

| Project       | Open Issues | Open PRs | Releases (Last 24h) | Status |
|---------------|-------------|----------|------------------------|--------|
| **vLLM**      | 57          | 34       | None                   | Stable |
| **SGLang**    | 69          | 41       | None                   | Active Dev |
| **llama.cpp** | 54          | 28       | `b11364`, `b11362`     | Patched |
| **Ollama**    | 87          | 39       | None                   | High Risk |
| **LiteLLM**   | 26          | 15       | v1.105.0-dev.2         | Security Focus |
| **Unsloth**   | 62          | 21       | None                   | Regression Alert |

> ✅ *Insight:* Ollama leads in issue volume due to critical Cloud Pro outage (95% failure), while vLLM and SGLang show the highest development velocity in PRs, reflecting their focus on speculative decoding and kernel-level innovation.

---

### **3. Model Support Race**

| New Model / Architecture        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash**             | ✅ (with SM120 issues) | ✅ (SM120 crash) | ❌ | ✅ (MLX only) | ❌ | ❌ |
| **Qwen3.8-Flash-Next**        | ✅ (PLE storage) | ⚠️ (MTP 0%) | ✅ (Nimble support) | ✅ | ❌ | ⚠️ (TTS demand) |
| **DeepSeek-V4.1**             | ✅ (Flash) | ✅ (Optimizing) | ❌ | ❌ | ❌ | ❌ |
| **Clef Decision Model**       | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Nimble Decision Model**     | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Reka / QuickSilver Pro**    | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

> 🏆 **Leader**: **llama.cpp** leads in niche and emerging model support (Clef, Nimble, Qwen3.8-Flash-Next), leveraging its lightweight, cross-platform design.  
> 🥈 **Runner-up**: **LiteLLM** wins in API abstraction layer—first to natively integrate Reka and QuickSilver Pro as OpenAI-compatible providers, enabling rapid multi-backend adoption.

---

### **4. Performance Frontier**

| Optimization Focus           | vLLM                          | SGLang                        | llama.cpp                  | Ollama                 | LiteLLM                     | Unsloth                |
|------------------------------|-------------------------------|-------------------------------|----------------------------|------------------------|-----------------------------|------------------------|
| **KV Cache & Prefix Caching**| ✅ MTP + hybrid attention     | ✅ EAGLE/DSPARK + radix cache | ⚠️ Flash attention (Metal) | ⚠️ VRAM eviction bug    | ✅ Prompt cache optimization | ⚠️ Overhead in streaming |
| **Speculative Decoding**     | 🔥 Critical regressions (0% MTP) | 🔥 EAGLE reuse collapse (50–60%) | ⚠️ Draft-MTP crash (AMD) | ✅ Native tooling       | ✅ Budget-aware routing     | ⚠️ 2.9x slowdown (dual GPU) |
| **Kernel-Level Optimization**| ✅ FlashInfer pre-download, Triton GEMM | ✅ Cake kernels, MoE on RDNA | ✅ F16 KV, ALiBi, sinks (Metal) | ❌ CUDA graph capture   | ✅ OTEL span clarity        | ❌ Tensor split regression |
| **Distributed & MoE Serving**| ✅ Async KV offload, sleep mode | ✅ UnifiedRadixCache          | ✅ GPU-resident LRU cache  | ❌ ROCm VRAM ignored    | ✅ Multi-provider routing     | ❌ VRAM overuse (FT)   |
| **Quantization & Efficiency**| ✅ NVFP4 MLA, BF16 fused QKV   | ✅ MXFP4 MoE, Triton kernels   | ✅ q2_k/q3_k (Hexagon), IQ3 | ✅ MLX/MXFp8 (M-series) | ✅ Cost tracking per token | ⚠️ Misleading context limits |

> 🔍 **Trend**: Kernel specialization (Triton, FlashInfer, Cake) and efficient memory management (async offload, LRU caches, PLE storage) dominate performance efforts—especially for large MoEs and speculative decoding.

---

### **5. Layer Positioning**

| Project       | Primary Layer              | Role Summary |
|---------------|----------------------------|--------------|
| **vLLM**      | **High-Throughput Inference Engine** | Cloud-scale serving; optimized for batched, long-context inference; strong focus on speculative decoding and distributed KV cache |
| **SGLang**      | **High-Performance Inference Engine** | Specialized for low-latency, high-concurrency speculative decoding; advanced caching (HiCache, UnifiedRadixCache); targeted at agent workloads |
| **llama.cpp**   | **Local Runtime / Edge Inference** | Cross-platform, low-footprint engine ideal for mobile, edge, and Apple Silicon; excels in Metal/F16 flash attention and tool call integration |
| **Ollama**      | **Developer Gateway & Local CLI** | Developer-facing interface; abstracts backend complexity; strong in model management and browser integrations; weak in production stability |
| **LiteLLM**     | **Universal LLM Gateway** | Agnostic API layer; enables seamless routing across providers (OpenAI, Bedrock, Reka, etc.); critical for cost control and observability |
| **Unsloth**     | **Fine-Tuning & Studio Platform** | End-to-end fine-tuning UI with GGUF model support; targets researchers and builders; currently unstable in inference throughput |

> 🧩 **Strategic Insight**: vLLM and SGLang are converging on the "high-performance inference" layer; LiteLLM and Ollama occupy the "access point" layer; llama.cpp remains dominant in edge/local execution.

---

### **6. Trend Signals**

1. **Hardware-Driven Instability is Now the Norm**  
   - SM120 (Blackwell) and gfx1250 (MI45x) are causing cascading regressions across vLLM, SGLang, and llama.cpp.  
   - **Action**: Avoid nightly builds on new hardware until stable release tags exist. Pin to known-good versions (e.g., `vllm:0.30.0`, `llama.cpp:b11364`).

2. **Speculative Decoding is a Breaking Point**  
   - Both vLLM and SGLang report 0% MTP acceptance and 50–60% prefix reuse collapse—critical for agent efficiency.  
   - **Watch**: Evaluate whether your use case tolerates degraded speculative performance; consider fallback to greedy decoding.

3. **Security & Trust Are Rising Priorities**  
   - LiteLLM introduced cosign-signed Docker images; Ollama faces authenticity issues (Authenticode failure).  
   - **Best Practice**: Always verify image signatures in production deployments.

4. **Agent Workflows Demand Integrated Tooling**  
   - Streaming tool calls are fragile across multiple projects (Ollama, SGLang, Unsloth).  
   - **Recommendation**: Validate tool-call chunking logic early; prefer systems with explicit `tool_call_id` handling.

5. **Model-Specific Optimizations Are No Longer Optional**  
   - Projects are racing to support new models (GLM-5.3-Flash, Qwen3.8-Flash-Next, Nimble Decision Model) with architecture-specific kernels.  
   - **Takeaway**: Choose a stack that aligns with your target model family—not just general-purpose performance.

---

> ✅ **Final Recommendation for Developers**:  
> - **For cloud-scale agents**: Use **vLLM** or **SGLang** with caution—validate speculative decoding behavior on SM120/gfx1250.  
> - **For edge/mobile**: Prefer **llama.cpp** (`b11364+`) for Metal/F16 KV and draft-MTP stability.  
> - **For multi-provider gateways**: Adopt **LiteLLM v1.105.0-dev.2** for secure, cost-aware routing.  
> - **For local fine-tuning**: Avoid recent Unsloth prebuilts (`b10715+`)—use `b10687` or build from source.  
> - **For production reliability**: Never deploy Ollama Cloud Pro until #15453 is resolved.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-03**

---

### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance on next-generation hardware, with critical fixes for Blackwell (SM120) GPUs and ongoing work to stabilize speculative decoding and prefix caching across hybrid attention models. A high-severity regression in MTP acceptance rate on GLM-5.3-Flash (SM120) has been reported, while PRs are actively addressing GPU-specific kernel issues and async KV offload correctness.

---

### **2. Releases & Breaking Changes**  
None. No new releases or breaking changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **Hardware**: Full support for **RTX PRO 6000 Blackwell (SM120)** is under active investigation, particularly for DeepSeek-V4.1-Flash and GLM-5.3-Flash models. Issues #56892 and #59724 highlight severe decode throughput degradation and 0% MTP acceptance rate due to CUDA graph capture and kernel compatibility problems.
- **Models**: 
  - **Qwen3.8-Flash-Next** support is being extended to unified-memory GPUs like DGX Spark via checkpoint-mapped PLE storage (#58439).
  - **GLM-5.x** now includes NVFP4 MLA projection loading fixes for BF16 fused QKV projections (#59833).
- **Backends**: ROCm support expanded with new test coverage for AMD MI355X (gfx950), including Qwen3.8-2.4T-A95B performance optimization planning (#57149).

---

### **4. Performance & Optimization**  
- **Speculative Decoding**: Critical performance regressions reported for MTP decoding on SM120 GPUs — acceptance rate dropped to 0% in nightly builds (#59724). Fixes are pending.
- **Kernel Optimizations**: 
  - Triton-based fp32 router GEMM for low-M decode sizes landed on ROCm (#54916).
  - FlashInfer precompiled kernels can now be downloaded upfront via `vllm download-kernels` to avoid runtime compilation overhead on Hopper+ GPUs (#58765).
- **Memory Efficiency**: 
  - Sleep mode now optionally offloads CUDA graph pools via `sleep_mode_offload_cudagraph` (#59160).
  - Async KV load zeroing race condition fixed to prevent block corruption (#59504).
- **Model-Specific**: ReplaySSM kernel optimizations for faster Mamba2 speculative decode are in progress (#49847).

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|------------|
| ⚠️ High | [#59724](https://github.com/vllm-project/vllm/issues/59724) | 0% MTP acceptance rate on GLM-5.3-Flash (SM120) with native FLASHINFER_MLA_SPARSE_SM120 backend | In progress |
| ⚠️ High | [#56892](https://github.com/vllm-project/vllm/issues/56892) | Extremely low decode throughput on RTX PRO 6000 Blackwell (8x TP) with `--enforce-eager`; CUDA graphs unusable | In progress |
| ⚠️ Medium | [#59642](https://github.com/vllm-project/vllm/issues/59642) | Qwen3.8-flash-next shows 0% MTP acceptance in disaggregated PD serving | In progress |
| ⚠️ Medium | [#59413](https://github.com/vllm-project/vllm/issues/59413) | GLM-5.3-Flash generates gibberish at low concurrency on ROCm | Under investigation |
| 🟡 Low | [#57032](https://github.com/vllm-project/vllm/issues/57032) | Drafter KV group not identified → prefix-cache reuse disabled silently for Mamba groups | PR pending |

---

### **6. What This Means for Application Developers**  
- **Avoid Nightly Builds on SM120**: Do not use `vllm/vllm-openai:nightly` for models like GLM-5.3-Flash or DeepSeek-V4.1-Flash until #59724 and #56892 are resolved — expect degraded or failed speculative decoding.
- **Use `vllm download-kernels` Early**: On Blackwell or Hopper GPUs, pre-download FlashInfer kernels to avoid startup latency from JIT compilation.
- **Monitor Prefix Cache Behavior**: Hybrid models (e.g., DeepSeek-V4-Flash + DSpark) may have untested EAGLE/MTP + prefix cache interactions — validate behavior under load.
- **Leverage Sleep Mode Offload**: Enable `sleep_mode_offload_cudagraph` in large MoE deployments to reclaim GiBs of GPU memory during idle periods.
- **Watch for ROCm Stability**: If using AMD MI355X or gfx950, monitor #57149 and #59413 for potential correctness or performance issues.

> ✅ **Action Item**: Review your deployment’s `--scheduler-policy`, `--enforce-eager`, and `--speculative-decoding-method` settings when running on Blackwell or ROCm. Use stable release tags (e.g., `0.30.0`) unless you’re tracking specific fixes.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **1. Today's Highlights**  
SGLang continues to advance its speculative decoding and high-throughput serving capabilities, with key work on **Ngram speculative decoding**, **HiCache/UnifiedRadixCache stability**, and **DeepSeek V4.1 optimization**. Notably, a critical bug in EAGLE speculative decoding causing a 97%→40–53% prefix reuse collapse has been identified and is under investigation. Meanwhile, PRs are actively refining GPU memory management, kernel scheduling, and support for AMD’s new hardware (gfx1250, MI45x) and Apple Silicon.

---

### **2. Releases & Breaking Changes**  
None. No new releases or breaking changes were published in the last 24 hours. The latest stable version remains `v0.5.21`, with ongoing development in `main`.

---

### **3. New Model & Hardware Support**  
- **AMD Hardware**: Expanded support for **MI45x (gfx1250)** and **Ryzen AI Halo (gfx1151/1152)** platforms via the [AMD Roadmap (Issue #35003)](https://github.com/sgl-project/sglang/issues/35003).  
- **Model-Specific**:  
  - **DeepSeek-V4.1** tracking and optimization underway ([Issue #42170](https://github.com/sgl-project/sglang/issues/42170)).  
  - **GLM-5.3-Flash** now under scrutiny for SM120 (RTX PRO 6000) compatibility issues with `fa4` attention backend ([Issue #42012](https://github.com/sgl-project/sglang/issues/42012)).  
- **Backend Extensions**:  
  - **Cake kernels** integration via FlashInfer now being tracked end-to-end ([Issue #42276](https://github.com/sgl-project/sglang/issues/42276)).  
  - **ROCm/MXFP4 MoE** now supported on RDNA GPUs via Triton kernels ([PR #41389](https://github.com/sgl-project/sglang/pull/41389)).

---

### **4. Performance & Optimization**  
- **Speculative Decoding**:  
  - Ngram speculative decoding enhancements progressing ([Issue #21052](https://github.com/sgl-project/sglang/issues/21052)), including seed corpus expansion with tool call syntax.  
  - DSpark verify width tuning now per-step for better batching efficiency ([PR #42281](https://github.com/sgl-project/sglang/pull/42281)).  
- **Memory & Caching**:  
  - Unified Radix Cache now enforces streaming session validation; tree caches without streaming support are rejected ([PR #42295](https://github.com/sgl-project/sglang/pull/42295)).  
  - HiCache write-back fix prevents assertion failures during eviction ([PR #42264](https://github.com/sgl-project/sglang/pull/42264)).  
- **Kernel & Scheduling**:  
  - Refactor of decoder stages from stage boundaries improves modularity and future extensibility ([PR #42312](https://github.com/sgl-project/sglang/pull/42312), #42311, etc.).  
  - Small-batch MoE optimizations for gfx950 GPUs improve performance on Qwen3.5-397B-A17B-FP8 ([PR #41982](https://github.com/sgl-project/sglang/pull/41982)).

---

### **5. Stability & Regressions**  
- **Critical**:  
  - **EAGLE speculative decoding collapses radix prefix reuse by 50–60%** for multi-turn traffic on GLM-DSA NVFP4 (v0.5.16) — no crash, but severe performance degradation ([Issue #32459](https://github.com/sgl-project/sglang/issues/32459)).  
- **High Severity**:  
  - **CUDA illegal memory access in QSA extend forward** at 8 concurrent requests on H20 TP8, suppressed only by `CUDA_LAUNCH_BLOCKING=1` ([Issue #37633](https://github.com/sgl-project/sglang/issues/37633)).  
  - **GLM-5.3-Flash crashes at CUDA-graph capture** on SM120 using `fa4` backend; only `triton` works ([Issue #42012](https://github.com/sgl-project/sglang/issues/42012)).  
- **Moderate**:  
  - **DSPARK crashes during draft CUDA graph capture** due to `scatter_add_` dimension mismatch ([Issue #34974](https://github.com/sgl-project/sglang/issues/34974)).  
  - **DeepSeek-V4-Pro decode throughput dropped ~5%** at concurrency 1 after recent refactor ([Issue #42074](https://github.com/sgl-project/sglang/issues/42074)).

---

### **6. What This Means for Application Developers**  
- **Optimize for Speculative Decoding**: Be cautious when enabling EAGLE/Ngram speculative decoding on models like GLM-DSA — expect significant prefix reuse loss unless patched. Monitor performance with `--enable-eplb` and `--speculative-algorithm DSPARK`.  
- **Avoid fa4 Backend on SM120**: Use `triton` as the default attention backend for GLM-5.3-Flash on RTX PRO 6000 until `fa4` is fixed.  
- **Leverage UnifiedRadixCache**: Enable `--enable-streaming-session` only with verified tree caches; avoid unverified ones to prevent silent failures.  
- **Expect Memory & Concurrency Limits**: On H20/GPU clusters, use `CUDA_LAUNCH_BLOCKING=1` or disable overlapping scheduling as temporary workarounds for known CUDA crashes.  
- **Monitor CI Health**: The CI pipeline reports 2 broken, 5 flaky tests ([Issue #17050](https://github.com/sgl-project/sglang/issues/17050)); consider testing against nightly builds for stability.  

> 🔗 *Stay updated: Join the [SGLang Slack](https://slack.sglang.io) for real-time discussion and status updates.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-03**

---

### **1. Today's Highlights**  
The latest release cycle (b11364) introduces critical support for the *Nimble Decision Model* and enhances Metal’s flash attention kernel with full F16 KV support, including attention sinks, ALiBi, and logit softcap—significantly improving performance on Apple Silicon. Concurrently, Vulkan backend stability is strengthened with a fix for Samsung GPU shared memory issues, while new optimizations in SYCL and CUDA target MoE efficiency and TOP-K sorting.

---

### **2. Releases & Breaking Changes**  
- **`b11364`**: Added runtime support for the **Nimble Decision Model** via `#29844`.  
  [GitHub PR #29844](https://github.com/ggml-org/llama.cpp/pull/29844)  
- **`b11362`**: Metal backend now includes tensor API flash attention kernel for F16 KV (`DK=DV=512`, `DK=576/DV=512`), with support for attention sinks, ALiBi, and logit softcap.  
  [GitHub PR #29570](https://github.com/ggml-org/llama.cpp/pull/29570)  
- **`b11355`**: Disabled large matmul tile on Samsung GPUs with 32KB shared memory to prevent crashes.  
  [GitHub PR #28531](https://github.com/ggml-org/llama.cpp/pull/28531)  
- **`b11346`**: Fixed Qwen4Exp test failures; optimized mask construction across Qwen4Exp and GLM5-next.  
  [GitHub PR #29819](https://github.com/ggml-org/llama.cpp/pull/29819)  

> ⚠️ No breaking API changes reported.

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - Added support for **Clef Decision Model (text-only)** via `#29831`.  
    [GitHub PR #29831](https://github.com/ggml-org/llama.cpp/pull/29831)  
  - Added **Prism Bonsai 2 27B** runtime support.  
    [GitHub PR #29600](https://github.com/ggml-org/llama.cpp/pull/29600)  
- **Hardware & Backends**:  
  - **Hexagon**: Added `q2_k` and `q3_k` quant type support.  
    [GitHub PR #29717](https://github.com/ggml-org/llama.cpp/pull/29717)  
  - **OpenVINO**: Updated to 2026.4.1 with improved MoE performance and expanded op coverage.  
    [GitHub PR #29852](https://github.com/ggml-org/llama.cpp/pull/29852)  
- **Quantization**:  
  - Qwen3.5 embedding models now supported in `convert_hf_to_gguf.py`.  
    [GitHub PR #27920](https://github.com/ggml-org/llama.cpp/pull/27920)

---

### **4. Performance & Optimization**  
- **Metal**: Flash attention kernel now supports F16 KV and complex attention patterns (ALiBi, sinks), enabling faster speculative decoding on M-series chips.  
- **Vulkan**:  
  - Optimized RMS norm using subgroup reductions (WIP).  
    [GitHub PR #29882](https://github.com/ggml-org/llama.cpp/pull/29882)  
  - Added logging for pipeline compile errors.  
    [GitHub PR #29794](https://github.com/ggml-org/llama.cpp/pull/29794)  
- **CUDA**:  
  - Optimized multi-row `TOP_K` with segmented radix sort.  
    [GitHub PR #29883](https://github.com/ggml-org/llama.cpp/pull/29883)  
- **SYCL**:  
  - Improved IQ3 code reordering and persistent layouts for Intel Arc B70.  
    [GitHub PR #29107](https://github.com/ggml-org/llama.cpp/pull/29107)  
  - Accelerated GLM MLA prefill using MKL flash attention.  
    [GitHub PR #29171](https://github.com/ggml-org/llama.cpp/pull/29171)  
- **MoE**: Introduced GPU-resident LRU cache for host-offloaded expert weights.  
  [GitHub PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)

---

### **5. Stability & Regressions**  
High-severity issues reported today include:  
- **Critical crash during draft-MTP decoding** on AMD RADV/Vulkan due to `DeviceLost` after prompt processing.  
  [GitHub Issue #27306](https://github.com/ggml-org/llama.cpp/issues/27306)  
- **Unstable tool calling** in Gemma 4 models under streaming and partial parsing.  
  [GitHub Issue #29655](https://github.com/ggml-org/llama.cpp/issues/29655)  
- **Memory leak** suspected in CUDA builds with large context sizes.  
  [GitHub Issue #27725](https://github.com/ggml-org/llama.cpp/issues/27725)  
- **OOM and compute error (-3)** on macOS Metal when loading Gemma 4 31B with default `n_ctx`.  
  [GitHub Issue #29521](https://github.com/ggml-org/llama.cpp/issues/29521)  
- **SIGABRT with no diagnostic** on Qualcomm Adreno Vulkan driver.  
  [GitHub Issue #29786](https://github.com/ggml-org/llama.cpp/issues/29786)  

> ✅ Fix PRs exist for some regressions (e.g., `b11362` fixes Metal FA kernel), but many remain open.

---

### **6. What This Means for Application Developers**  
- **For edge and mobile inference**: The new Metal flash attention and Nimble model support enable faster, more accurate decision-making in on-device agents. Use `--spec-type draft-mtp` cautiously—verify against known AMD RADV issues.  
- **For multi-GPU/MoE workloads**: The GPU-resident LRU cache for MoE experts will reduce decode latency when offloading to CPU. Monitor `n_ctx` size on Metal to avoid OOM.  
- **For production servers**: Avoid `-ngl >= 1` on Qualcomm Adreno drivers—use Turnip or fallback to CPU. Prefer Vulkan on Samsung GPUs only if `large_matmul_tile` is disabled.  
- **For tooling & agent builders**: The updated `ling3.cpp` parser now honors `json_schema` in responses. Ensure your tool call pipelines are tested with Qwen3.8 Flash and Gemma 4 models under speculative decoding.  

👉 **Recommendation**: Pin to `b11364` or later for Metal/F16 KV and draft-MTP stability; test all new models with `--spec-draft-model` on non-AMD platforms until further fixes land.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-03**

---

### **1. Today's Highlights**  
A critical regression in Ollama Cloud Pro has been reported with a 95% failure rate across all cloud models, rendering the service unusable for paying customers — this is the top-priority issue today. On the local side, multiple stability and performance issues are emerging on macOS (MLX engine), Windows (Vulkan GPU detection), and Linux (ROCm VRAM management), indicating broader infrastructure strain ahead of v0.35.1’s rollout. A new PR proposes browser integration via `ollama launch`, signaling growing demand for web-native AI workflows.

---

### **2. Releases & Breaking Changes**  
None. No new releases were published in the last 24 hours. However, **v0.35.1** is under scrutiny due to two high-severity bugs:  
- ✅ **Authenticode signature failure** on Windows (`#18765`) — installer fails verification with `HashMismatch`.  
- ⚠️ **Model versioning gaps**: Some models like `qwen3.8:27b` require specific Ollama versions but lack documentation (`#18414`).  

> 🔗 [Issue #18765](https://github.com/ollama/ollama/issues/18765) | [Issue #18414](https://github.com/ollama/ollama/issues/18414)

---

### **3. New Model & Hardware Support**  
- ✅ **GraniteForCausalLM support added** in MLX backend (`PR #17972`), enabling use of IBM’s Granite 4.1/4.2 models on Apple Silicon.  
- ✅ **AiRC multi-agent orchestration** now listed in community integrations (`PR #18764`) — supports local Ollama and remote instances.  
- ✅ **CORTEX agent framework** added (`PR #18749`) — MIT-licensed, sandboxed Python, file, and web tools powered by Ollama.  
- 🛠 **Request to support both CUDA and ROCm runtimes** on dual-GPU systems (`#18545`) — currently favors CUDA, ignoring ROCm even when available.

> 🔗 [PR #17972](https://github.com/ollama/ollama/pull/17972) | [PR #18764](https://github.com/ollama/ollama/pull/18764) | [PR #18749](https://github.com/ollama/ollama/pull/18749) | [Issue #18545](https://github.com/ollama/ollama/issues/18545)

---

### **4. Performance & Optimization**  
- ❌ **MLX engine memory pressure issue**: Weights are unwired ~2 seconds after each request on macOS 27, causing page-ins during idle → latency spikes (`#18744`).  
- ❌ **M4 Pro GPU underutilization**: `Qwen 3.8 qwen3.8:27b-mxfp8` uses only partial GPU memory despite 48GB RAM (`#18754`).  
- ❌ **ROCm VRAM ignored during model eviction**: Unified VRAM not fully leveraged; older models evicted prematurely (`#18756`).  
- ✅ **Strands Decider implementation underway** (`PR #18755`) — aims to unify decision model preparation/readout logic for better batching efficiency.  

> 🔗 [Issue #18744](https://github.com/ollama/ollama/issues/18744) | [Issue #18754](https://github.com/ollama/ollama/issues/18754) | [Issue #18756](https://github.com/ollama/ollama/issues/18756) | [PR #18755](https://github.com/ollama/ollama/pull/18755)

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| 🔴 Critical | **Ollama Cloud Pro: 95% failure rate** (`#15453`) | All cloud models fail; Pro users cannot use service | Open |
| 🔴 High | **Llama3.2-vision broken post-update** (`#16490`) | Vision functionality lost after latest update | Open |
| 🔴 High | **Intel UHD Vulkan not detected on Windows** (`#18672`) | iGPU not usable via Vulkan backend | Open |
| 🔴 High | **Tool-call tags lost across chunk boundaries** (`#18681`) | Invalid tool call parsing in streaming responses | Open |
| 🟡 Medium | **Unquantized F16 blob left behind** (`#18416`) | 50GB+ unreferenced blobs accumulate per import | Open |
| 🟡 Medium | **Tool results associated by position, not `tool_call_id`** (`#18762`) | Incorrect result pairing in parallel tool calls | PR pending (`#18763`) |

> 🔗 [Issue #15453](https://github.com/ollama/ollama/issues/15453) | [Issue #16490](https://github.com/ollama/ollama/issues/16490) | [Issue #18672](https://github.com/ollama/ollama/issues/18672) | [Issue #18681](https://github.com/ollama/ollama/issues/18681) | [Issue #18416](https://github.com/ollama/ollama/issues/18416) | [PR #18763](https://github.com/ollama/ollama/pull/18763)

---

### **6. What This Means for Application Developers**  
- **Avoid Ollama Cloud Pro until #15453 is resolved** — expect widespread outages. Use local inference or alternative providers.  
- **Be cautious with model version compatibility**: Models like `qwen3.8:27b` may require specific Ollama versions — check changelogs manually (`#18414`).  
- **Streaming tool calls are fragile**: If using tool-calls with `chat/completions`, ensure chunk boundaries don’t split tags (`#18681`). Use `PR #18763` workaround if needed.  
- **Optimize for MLX/MacOS**: Expect memory thrashing on M-series chips — consider caching strategies or reducing idle time.  
- **Browser integration is coming**: `ollama launch` extension to Chrome/Edge/Firefox/Brave (`#18752`) will enable local Ollama-powered browser assistants — monitor for early access.  

> 🔗 [Issue #15453](https://github.com/ollama/ollama/issues/15453) | [PR #18763](https://github.com/ollama/ollama/pull/18763) | [Issue #18752](https://github.com/ollama/ollama/issues/18752)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-03**

---

#### **1. Today's Highlights**  
LiteLLM v1.105.0-dev.2 introduces enhanced security via signed Docker images using cosign, reinforcing trust in the release pipeline. Key improvements include native support for Reka and QuickSilver Pro as OpenAI-compatible providers, enabling seamless integration with emerging LLM backends. Critical fixes address budget enforcement bypasses, cost tracking inaccuracies for custom models, and OTEL span handling—ensuring reliable billing and observability.

---

#### **2. Releases & Breaking Changes**  
- **v1.105.0-dev.2**: Released today with hardened image signing via [cosign](https://github.com/BerriAI/litellm/commit/0112e53). All Docker images are now cryptographically verifiable; verify signatures using `cosign verify` and the key from commit `0112e53`.  
  🔗 [Release Notes](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-dev.2)  
- **Security Patch**: The `anyio` dependency lacks version constraints, exposing users to a known deadlock bug ([agronholm/anyio#1145](https://github.com/agronholm/anyio/pull/1145)). A fix PR (#44048) has been filed but not yet merged—users should pin `anyio>=3.7.0,<4.0.0` until resolved.

---

#### **3. New Model & Hardware Support**  
- **Reka**: Added as first-class OpenAI-compatible provider (`reka/`) via PR [#44278](https://github.com/BerriAI/litellm/pull/44278). Supports `REKA_API_KEY` and automatic routing.  
- **QuickSilver Pro**: Now supported natively via JSON-configured provider (`quicksilverpro/`) in PR [#44303](https://github.com/BerriAI/litellm/pull/44303), enabling cost tracking and unified API access.  
- **Bedrock GPT-5.6+**: Native `/chat/completions` support added in PR [#40775](https://github.com/BerriAI/litellm/pull/40775), eliminating legacy Converse rewrite overhead and improving latency.  
- **Kimi K3**: Fixes stream blocking due to unsupported `cachePoint` field (PR [#44292](https://github.com/BerriAI/litellm/pull/44292)).

---

#### **4. Performance & Optimization**  
- **Prompt Cache Efficiency**: PR [#44221](https://github.com/BerriAI/litellm/pull/44221) optimizes prompt cache eligibility by avoiding full conversation tokenization—reducing CPU load during high-throughput inference.  
- **OTEL Span Clarity**: PRs [#44240](https://github.com/BerriAI/litellm/pull/44240) and [#44148](https://github.com/BerriAI/litellm/pull/44148) rename Postgres spans by operation and table, enabling better query tracing and DB performance analysis.  
- **CI Parallelization**: Security tests now run in parallel (PR [#44146](https://github.com/BerriAI/litellm/pull/44146)), reducing CI runtime by ~40% on multi-core runners.

---

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |  
|---------|------|--------|--------|  
| ⚠️ High | Budget enforcement bypassed in v1.82.3 despite exceeding `max_budget` | Open | #26672 |  
| ⚠️ High | Custom model spend logs show `$0` cost despite correct `estimated_cost` | Open | #35691 |  
| ⚠️ High | `RateLimitError` incorrectly handles `insufficient_quota` (non-retryable) | Open | #32785 |  
| ⚠️ Medium | MCP tool auto-execution skipped silently for Ollama models | Open | #31911 |  
| ⚠️ Medium | Websearch results dropped during stream re-wrapping | Open | #35333 |  
| ✅ Fixed | Redis cluster shutdown failure due to `REDIS_CLUSTER_NODES` | Closed | #31206 (fix merged) |

> Note: Several regressions affect enterprise-grade cost control and agent reliability—users relying on budgeting or tool execution should test against `v1.105.0-dev.2`.

---

#### **6. What This Means for Application Developers**  
- **Adopt new providers immediately**: Use `reka/` and `quicksilverpro/` for direct access to cutting-edge models without manual `api_base` config.  
- **Ensure accurate cost tracking**: If using custom models outside the built-in cost map (e.g., `deepinfra/deepseek-ai/DeepSeek-V4-Flash-0731`), explicitly define pricing in `model_prices_and_context_window.json` to avoid $0 billing.  
- **Avoid budget misconfigurations**: Avoid `v1.82.3` if enforcing per-key budgets—upgrade to `v1.105.0-dev.2` or later.  
- **Handle rate limits carefully**: Do not retry on `RateLimitError` when `code="insufficient_quota"`—use error code inspection to distinguish transient vs. permanent failures.  
- **Enable OTEL v2 for observability**: Leverage PRs like [#43992](https://github.com/BerriAI/litellm/pull/43992) to export cache token counts as span attributes for fine-grained tracing.

> 🛠️ **Action Item**: Update to `v1.105.0-dev.2` and verify your deployment’s `cost_map`, `budget`, and `mcp` configurations before production rollout.

---  
*Digest compiled from GitHub activity (2026-10-03).*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-03**

---

### **1. Today's Highlights**  
Unsloth continues to evolve its Studio UI with major enhancements in model management and tooling, including multi-GGUF model residency support and improved chat export fidelity. Critical performance regressions have emerged in `b10715-mix-86bd2d3` and later builds, causing up to **2.9x slower tensor split decoding** on dual GPU setups—highlighting instability in recent inference kernels. Meanwhile, users report persistent VRAM overuse during fine-tuning and unexpected OOMs even when memory is underutilized.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, a significant regression was introduced in prebuilt binaries from `b10715-mix-86bd2d3` onward (see [Issue #12468](https://github.com/unslothai/unsloth/issues/12468)), impacting throughput for tensor-split inference across multiple GPUs. No official release notes address this change; users are advised to revert to `b10687-mix-67dfc8b` or earlier if performance is critical.

---

### **3. New Model & Hardware Support**  
- **Qwen3-TTS**: Feature request (#3951) highlights growing demand for fine-tuning support of TTS models via Unsloth, which currently lacks FT integration despite full Hugging Face compatibility.  
- **Gemma 3 (text-only variant)**: Users report issues saving/loading text-only variants of vision models ([#12554](https://github.com/unslothai/unsloth/issues/12554)), indicating incomplete handling of multimodal model configurations.  
- **Windows & WSL**: Persistent CUDA OOM errors despite available VRAM ([#1797](https://github.com/unslothai/unsloth/issues/1797), [#10017](https://github.com/unslothai/unsloth/issues/10017)) suggest deeper driver-level or memory layout bugs on Windows platforms.

---

### **4. Performance & Optimization**  
- **Inference Regression**: Tensor split mode (`--split-mode tensor`) on dual RTX 5070 Ti GPUs sees throughput drop from **115–118 t/s** (pre-b10715) to **~48 t/s** post-b10715-mix-86bd2d3 ([#12468](https://github.com/unslothai/unsloth/issues/12468)). This represents a **2.9x slowdown**, likely due to changes in CUDA graph limits (`max_cuda_graphs = 64`) or kernel scheduling.  
- **Fine-tuning Memory Overhead**: Users report that fine-tuning consumes significantly more VRAM than advertised, triggering OOMs even with seemingly sufficient capacity ([#4504](https://github.com/unslothai/unsloth/issues/4504)).  
- **API Latency**: OpenAI-compatible API adds ~1.2s fixed latency per request regardless of workload size ([#12364](https://github.com/unslothai/unsloth/issues/12364)), severely impacting short-text agent workflows.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Status |
|---------|------|-------------|--------|
| 🔥 High | [#12468](https://github.com/unslothai/unsloth/issues/12468) | 2.9x slowdown in tensor split inference after b10715-mix-86bd2d3 | Open |
| 🔥 High | [#4504](https://github.com/unslothai/unsloth/issues/4504) | Fine-tuning uses excessive VRAM, causing OOMs on large models | Open |
| ⚠️ Medium | [#12589](https://github.com/unslothai/unsloth/issues/12589) | Missing verbose hardware monitor mode for power/performance tuning | Open |
| ⚠️ Medium | [#12571](https://github.com/unslothai/unsloth/issues/12571) | Misleading `max_context_length` field (estimates VRAM fit, not actual limit) | Open |
| 🟡 Low | [#12534](https://github.com/unslothai/unsloth/issues/12534) | Vision LLM cannot import images automatically for tool use | Open |

> ✅ **Fix PRs exist for:**  
> - [PR #12564](https://github.com/unslothai/unsloth/pull/12564): Search across chats/projects/files/models in Studio UI  
> - [PR #12583](https://github.com/unslothai/unsloth/pull/12583): Notify when TTS hits max tokens  
> - [PR #12574](https://github.com/unslothai/unsloth/pull/12574): Preserve tool calls in chat history on safetensors/MLX models

---

### **6. What This Means for Application Developers**  
- **Avoid recent prebuilts (`b10715+`)** if using multi-GPU tensor split inference—expect severe performance degradation. Stick to `b10687-mix-67dfc8b` or earlier until kernel fixes land.  
- **Be cautious with fine-tuning large models**: VRAM usage exceeds expectations—monitor real-time consumption and consider gradient checkpointing or lower batch sizes.  
- **Expect high overhead in local API workloads**: The ~1.2s fixed latency in `/v1/chat/completions` will bottleneck low-latency agents. Consider direct llama.cpp backend calls for production-grade speed.  
- **Leverage new Studio features**: Use the upcoming benchmarks page (tracked in [#11646](https://github.com/unslothai/unsloth/issues/11646)) to sweep speculative decoding and KV cache settings for optimal config tuning.  
- **Watch for model-specific quirks**: Qwen3-VL LoRA loading fails ([#3560](https://github.com/unslothai/unsloth/issues/3560)), and vision models struggle with image ingestion ([#12534](https://github.com/unslothai/unsloth/issues/12534))—test early with your target stack.

> 💡 *Recommendation:* For production deployments, build from source with pinned commits before `b10715-mix-86bd2d3`, and validate both inference throughput and fine-tuning memory profiles on target hardware.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*