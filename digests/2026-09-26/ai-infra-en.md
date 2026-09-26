# AI Infrastructure Digest 2026-09-26

> Generated: 2026-09-26 00:48 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-26**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of hyper-specialization, with projects converging on performance-critical optimizations while diverging in target use cases. vLLM and SGLang lead in high-throughput, low-latency inference for large models across diverse hardware, including NVIDIA’s latest SM100/SM103 and AMD’s CDNA/GFX950. Ollama and llama.cpp are strengthening local runtime capabilities—especially on Apple Silicon and edge devices—while LiteLLM and Unsloth focus on abstraction layers for multi-provider routing and fine-tuning agility. The convergence of speculative decoding, structured outputs, and hybrid model support signals a maturing infrastructure stack capable of powering production-grade agent systems.

---

### **2. Activity Comparison**  

| Project        | Issues Open (24h) | PRs Merged (24h) | Release Status       |
|----------------|-------------------|------------------|-----------------------|
| **vLLM**       | 8                 | 7                | No new release; critical fixes merged |
| **SGLang**     | 6                 | 6                | Stable `v0.5.19`; no new release |
| **llama.cpp**  | 7                 | 5                | Builds `b11192`–`b11181`; no formal release |
| **Ollama**     | 9                 | 4                | `v0.40.0-rc0` released; RC status |
| **LiteLLM**    | 5                 | 6                | `v1.104.0-dev.2`, `v1.100.3`, etc. released |
| **Unsloth**    | 10                | 4                | No new release; stability issues open |

> 🔍 *Observation*: vLLM and LiteLLM show the highest engineering velocity, driven by stability fixes and security hardening. Unsloth reports the most open issues—largely AMD-specific regressions—indicating ongoing platform maturity challenges.

---

### **3. Model Support Race**  

| New Model / Architecture      | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1**             | ✅ (SM100/SM103, ROCm) | ✅ (ROCm, MPS) | ❌ | ✅ (`qwen3.8:27b-mlx`) | ✅ | ❌ |
| **Qwen3.8-Flash-Next**        | ⚠️ Partial | ✅ (stable) | ❌ | ❌ | ❌ | ❌ |
| **K2 Horizon (MoVA)**         | ❌ | ❌ | ✅ (experimental) | ❌ | ❌ | ❌ |
| **GraniteSpeech5ForCTC**      | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Hybrid SSM/Mamba**          | ❌ | ✅ (experimental) | ❌ | ❌ | ❌ | ✅ (opt-in) |
| **Gemma4**                    | ❌ | ✅ (OOT attention) | ❌ | ❌ | ❌ | ❌ |
| **Limite 1B - Violetto**      | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**             | ❌ | ✅ (FP8 OOM issue) | ❌ | ❌ | ❌ | ❌ |

> 🏆 **Leader**: **SGLang** leads in breadth of new model support, especially for Qwen3.8-Flash-Next and hybrid architectures.  
> 📈 **Emerging**: **llama.cpp** is rapidly expanding into audio (LFM2), speech-to-text (GraniteSpeech5), and niche MoVA models via community contributions.

---

### **4. Performance Frontier**  

| Optimization Focus               | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **Kernel Fusion**                | ✅ (Mamba, WO-A + RoPE) | ✅ (Gemma3n, Hopper V4.1 ratio-2) | ✅ (Metal FWHT >512) | ⚠️ (CUDA porting) | ❌ | ❌ |
| **KV Cache & Memory Management** | ✅ (unified, draft validation) | ✅ (HiCache corruption fix) | ✅ (`--kv-unified` bug) | ✅ (prefix cache limit fixed) | ❌ | ✅ (SDXL offload planning) |
| **Quantization & Precision**     | ✅ (MXFP8, MXFP4) | ✅ (MXFP4 MoE tuning) | ✅ (BF16→FP32 chunked) | ✅ (MLX native) | ✅ (Fireworks pricing update) | ✅ (Hadamard rotation for Qwen-Image) |
| **Distributed Serving**          | ✅ (RPC timeout, TP shard) | ⚠️ (DCP, context parallelism) | ❌ | ❌ | ✅ (router fallback) | ✅ (vLLM/SGLang opt-in) |
| **Streaming & Speculative Decoding** | ✅ (logprob preservation, draft RPC bounds) | ✅ (token loop fixes) | ❌ | ❌ | ⚠️ (fallback null response) | ❌ |

> 🔥 **Trend**: **Kernel fusion** and **structured output correctness** are now primary battlegrounds. vLLM and SGLang dominate in fused kernel design (Mamba, Gemma3n, DeepSeek-V4.1), while Ollama and LiteLLM focus on routing reliability under load.

---

### **5. Layer Positioning**  

| Project        | Primary Layer                     | Key Differentiator |
|----------------|------------------------------------|--------------------|
| **vLLM**       | **Inference Engine**               | Industry-standard GPU kernel optimization; best-in-class latency for LLMs on NVIDIA |
| **SGLang**     | **Inference Engine + Gateway**     | Stronger focus on streaming, tool calling, and hybrid model execution |
| **llama.cpp**  | **Local Runtime / Edge Inference** | Unmatched cross-platform support (Apple Silicon, Vulkan, SYCL, OpenCL); ideal for CPU/GPU edge deployments |
| **Ollama**     | **Local Runtime + Developer UX**   | Seamless Apple Silicon MLX integration; user-friendly CLI/UI for prototyping and local agents |
| **LiteLLM**    | **API Gateway / Router**           | Unified API layer for multi-provider routing, cost tracking, and observability |
| **Unsloth**    | **Fine-Tuning + Training Runtime** | Specialized for QLoRA, image generation, and training on AMD GPUs; bridges training and inference |

> 🎯 **Strategic Clarity**: vLLM and SGLang are becoming de facto inference engines for cloud-scale deployments. Ollama and llama.cpp serve as foundational tools for developers and edge use cases. LiteLLM enables scalable multi-cloud inference orchestration. Unsloth targets researchers and developers building custom-trained models.

---

### **6. Trend Signals**  

- **AMD Is No Longer a Second-Class Citizen**: Both vLLM and SGLang have made significant strides in ROCm support (gfx950, MI355X), with kernel tuning and configuration fixes indicating deep investment in AMD hardware. This signals a shift toward true cross-GPU parity.
  
- **Structured Output Stability Is Now a Non-Negotiable**: Critical bugs in `tool_choice='none'`, logprob handling during streaming, and parser leakage highlight that agent workflows are now driving core engine quality—no longer just an afterthought.

- **Speculative Decoding Is Maturing**: With fixes to draft token validation, RPC timeouts, and host dispatch overhead, speculative decoding is moving from experimental to production-ready in vLLM and SGLang.

- **Security & Trust Are Rising in Priority**: LiteLLM’s adoption of Cosign signing for Docker images reflects growing concern over supply chain integrity—especially in enterprise environments.

- **Apple Silicon Is Now a First-Class Platform**: Ollama’s automatic MLX activation and llama.cpp’s Metal kernel improvements indicate Apple’s silicon is no longer a niche but a mainstream target for AI workloads.

> 💡 **Actionable Insight for Developers**:  
> - Use **vLLM** for high-performance, scalable inference on NVIDIA.  
> - Use **SGLang** if you need hybrid model support and robust streaming agents.  
> - Choose **llama.cpp** for edge deployment or heterogeneous hardware (Apple, AMD, Intel).  
> - Opt for **Ollama** when rapid prototyping on Mac or deploying local models.  
> - Leverage **LiteLLM** for multi-provider routing with budget-aware cost tracking.  
> - Consider **Unsloth** for QLoRA training and image generation on AMD GPUs—just avoid production use until stability fixes land.

---

*Compiled by Senior AI Infrastructure Analyst — 2026-09-26*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-09-26

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its focus on speculative decoding, structured output stability, and performance across diverse hardware—especially with new optimizations for DeepSeek-V4.1 on SM100/SM103 and significant progress in Mamba kernel fusion. Critical fixes were merged for draft token validation, logprob preservation in streaming continuations, and RPC timeout handling in distributed inference.

---

### **2. Releases & Breaking Changes**  
*No new releases announced in the past 24 hours.*  
However, several **critical bugfixes have been merged** that affect runtime behavior:
- **PR #58779**: Bounds draft-token RPC waits by `VLLM_EXECUTE_MODEL_TIMEOUT_SECONDS`, preventing hangs during speculative decoding with structured outputs. [GitHub PR](https://github.com/vllm-project/vllm/pull/58779)
- **PR #58792**: Fixes Inkling tool name leakage into `content` after reasoning blocks when using `--reasoning-parser inkling --tool-call-parser inkling`. [GitHub PR](https://github.com/vllm-project/vllm/pull/58792)
- **PR #57790 / #57447**: Addresses incorrect logprobs handling across streaming input continuations—ensuring logprob state is preserved correctly even when sampling params change mid-stream. [GitHub PRs](https://github.com/vllm-project/vllm/pull/57790), [GitHub PR](https://github.com/vllm-project/vllm/pull/57447)

> ⚠️ Developers using **structured outputs**, **speculative decoding**, or **streaming inputs** should ensure they are on a recent `main` or patch version to avoid silent correctness issues.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1 (DSv4.1)**: New performance-focused kernels landed for SM100/SM103 targeting fused WO-A + inverse RoPE + MXFP8 quantization, showing measurable gains in decode latency.
- **Qwen3.8-2.4T-A95B (AMD)**: Performance optimization plan initiated for gfx950 / MI355X via Issue #57149, including profiling and tuning of attention kernels.
- **ROCm (CDNA)**: Ongoing work to enforce `ROCM_AITER_FA` selection over `ROCM_ATTN` when `VLLM_ROCM_USE_AITER=1`, resolving a misconfiguration impacting MHA decode performance. [GitHub Issue](https://github.com/vllm-project/vllm/issues/46596)
- **AWS EFA Integration**: Proposal to enable out-of-the-box EFA support in `vllm/vllm-openai` Docker image, mirroring PyTorch’s automatic network plugin detection. [GitHub Issue](https://github.com/vllm-project/vllm/issues/55635)

---

### **4. Performance & Optimization**  
- **Mamba Kernel Fusion**: PR #58737 fuses 7 kernels into 1 Triton kernel (`mamba_get_block_table_tensor` align branch), delivering **up to 6x speedup** across all shapes. [GitHub PR](https://github.com/vllm-project/vllm/pull/58737)
- **Speculative Decoding Overhead Reduction**: PR #58732 eliminates ~11µs/step of host dispatch overhead from GDN metadata build. [GitHub PR](https://github.com/vllm-project/vllm/pull/58732)
- **DeepSeek-V4.1 Optimizations**: 
  - PR #58634: Fuses small-batch WO-A with inverse RoPE and MXFP8 quant → reduces decode latency on GB200 (SM100/SM103).
  - PR #58678: Shards Engram wkv projection across TP ranks, improving scalability in tensor-parallel setups. [GitHub PRs](https://github.com/vllm-project/vllm/pull/58634), [GitHub PR](https://github.com/vllm-project/vllm/pull/58678)
- **Triton JIT Warmup Coverage**: PR #58559 identifies and covers JIT compilation of key Triton kernels at first request—improving cold-start predictability in production deployments. [GitHub PR](https://github.com/vllm-project/vllm/pull/58559)

---

### **5. Stability & Regressions**  
Top regressions reported today:
1. **CRITICAL**: `FlashInfer sampler JIT crashes engine startup if `nvcc` not found (precompiled wheels). No fallback to native sampler. [GitHub Issue](https://github.com/vllm-project/vllm/issues/49497)
2. **HIGH**: `tool_choice='none'` silently deletes tool-call-shaped content, breaking agent workflows expecting structured outputs. [GitHub Issue](https://github.com/vllm-project/vllm/issues/55005)
3. **HIGH**: `dflash` spec decoder fails to identify drafter KV group → disables prefix cache reuse for Mamba groups. [GitHub Issue](https://github.com/vllm-project/vllm/issues/57032)
4. **HIGH**: `glm_moe_dsa`-based models (e.g., GLM-5.3) suffer from missing performance optimizations despite prior fixes. [GitHub Issue](https://github.com/vllm-project/vllm/issues/57406)
5. **LOW**: `qwen3_coder` parser behavior changed between v0.22 and v0.23 — may break downstream parsing logic. [GitHub Issue](https://github.com/vllm-project/vllm/issues/46493)

> ✅ Fix PRs exist for most high-severity bugs (see Section 2). Use `main` or nightly builds to benefit from patches.

---

### **6. What This Means for Application Developers**  
- **Agent Frameworks & Tool Calling**: Prioritize updating to latest `main` to avoid silent data loss (`tool_choice='none'`) and unstable tool call IDs during retries. Use `parser_cache` and stable derendering features (tracked in #57571) for reliable streaming agents.
- **Performance-Critical Workloads**: Leverage new Mamba and DeepSeek-V4.1 optimizations for lower-latency inference on H100/GB200. Enable `VLLM_ROCM_USE_AITER=1` on CDNA GPUs to ensure optimal attention path selection.
- **Distributed Inference**: Be cautious with `batch_invariant=1` — it now properly disables sequence parallelism (via #56377), which prevents subtle correctness issues in multi-GPU setups.
- **Deployment Reliability**: Ensure `nvcc` is available in your environment or use source builds if relying on FlashInfer. Consider switching to `torch.compile` + full CUDA graphs (CI stabilization ongoing in #58810) for predictable throughput.

> 🔗 Stay updated via GitHub: [vLLM Issues](https://github.com/vllm-project/vllm/issues), [PRs](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-26**

---

### **1. Today's Highlights**  
The SGLang project continues strong momentum in optimizing DeepSeek-V4.1 and Qwen3.8-Flash-Next performance across CUDA, ROCm, and Apple Silicon backends. Critical stability fixes were landed for `Qwen3.8-Flash-Next` tokenization loops and `HiCache` memory corruption on hybrid SSM/Mamba models, while new PRs focus on kernel-level fusions (e.g., Gemma3n shared-KV, Hopper V4.1 ratio-2) to boost decode throughput.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking changes reported in the last 24 hours. The latest stable version remains `v0.5.19`.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1** support extended with AMD ROCm (`gfx950`) kernel integration via #41019 and #41020 (sparse attention, top-k sorting).  
- ✅ **Apple Silicon (MPS)**: Improved memory handling now tracked in #21443; ongoing work to fix device memory detection (#39675).  
- ✅ **Hybrid SSM/Mamba**: Experimental support with `--enable-hierarchical-cache`, though a crash bug was reported (#40926).  
- ✅ **Gemma4**: Now honors OOT attention defaults via #41293, improving compatibility with custom backends.  
- ✅ **XGrammar Lark syntax**: Added support via #39380, enabling richer parser definitions.

---

### **4. Performance & Optimization**  
- 🚀 **Gemma3n**: Skip unused K/V computation in shared attention layers via #41295 — reduces unnecessary GPU memory ops and improves decode efficiency.  
- 🚀 **Hopper V4.1 (SM90)**: Fuse ratio-2 decode pooling + RMSNorm into single kernel (#41294), reducing latency for high-concurrency decode batches.  
- ⚙️ **MXFP4 MoE**: Pin `num_warps` for RTX 4090 (SM89) to avoid 6x decode slowdowns (#41292), restoring ~20 tok/s throughput.  
- 📈 **DCP/Context Parallelism**: PRs #39731 and #39743 improve logical token capacity tracking for admission control and load reporting.  
- 🔧 **DeepSeek-V4.1**: Refactored low-ratio index top-k logic into dedicated modules (#41125, #41291) for better maintainability and future fusion potential.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Status | PR/Link |
|--------|------|-------------|--------|--------|
| 🔴 High | [#36537](https://github.com/sgl-project/sglang/issues/36537) | `Qwen3.8-Flash-Next` thinking + tool parser loops on token ID 0 | Closed | [Fix PR](https://github.com/sgl-project/sglang/pull/41156) |
| 🔴 High | [#40926](https://github.com/sgl-project/sglang/issues/40926) | `HiCache` + hybrid SSM/Mamba crashes entire instance due to `cudaHostRegister` error | Open | [Reported](https://github.com/sgl-project/sglang/issues/40926) |
| 🔴 High | [#37712](https://github.com/sgl-project/sglang/issues/37712) | `GLM-5.3-Flash`: FP8 MQA logits cause CUDA OOM during long-context prefill | Open | [Reported](https://github.com/sgl-project/sglang/issues/37712) |
| 🟡 Medium | [#36531](https://github.com/sgl-project/sglang/issues/36531) | QSA fallback selects incompatible FA4 path on SM120 | Closed | [PR #37196](https://github.com/sgl-project/sglang/pull/37196) |
| 🟡 Medium | [#36532](https://github.com/sgl-project/sglang/issues/36532) | FlashInfer GDN state dtype mismatch on SM120 | Closed | [Pending patch] |

> 💡 *Note:* CI instability persists with 1 broken, 7 flaky tests as of 2026-09-26 — see #17050.

---

### **6. What This Means for Application Developers**  
- ✅ **Use `--enable-hierarchical-cache --hicache-storage-backend dynamic` cautiously** — known to crash on certain hybrid models (see #40926); monitor for memory leaks.  
- ✅ **Optimize Qwen3.8-Flash-Next workflows** — avoid `thinking + tool_parser` combinations until further stability updates.  
- ✅ **Leverage new kernel fusions** (e.g., Gemma3n, Hopper V4.1) for higher throughput in speculative decoding and long-context inference.  
- ✅ **Enable `--mlx-enable-sampling` when using `/v1/score` with MLX backend** — otherwise, empty logprobs trigger 500 errors (#41211).  
- ✅ **Monitor `max_running_requests` cap** — hybrid models may reduce concurrency below CLI settings; expose effective limit via #38846 (upcoming).

> 📌 *Pro Tip:* For production use on Apple Silicon, avoid `mem_fraction_static` defaults — set explicitly due to missing MPS memory detection (#39675).

---  
*Digest generated from GitHub activity: [sgl-project/sglang](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-26**

---

### **1. Today's Highlights**  
The latest development cycle centers on robustness fixes for unified KV cache handling across CUDA and HIP backends, critical for multi-request inference stability. Key improvements include a fix for incorrect logits in LFM2 audio preprocessing and enhanced Metal kernel support for wider block sizes, enabling better performance on Apple Silicon. The community continues to drive forward model and hardware expansion, with new support for K2 Horizon models and improved SYCL/Vulkan compatibility.

---

### **2. Releases & Breaking Changes**  
No formal releases were published today; the most recent builds are `b11192` through `b11181`, all focused on internal stability and backend-specific optimizations. Notable changes:  
- `b11190`: Fixed mel preprocessor in LFM2 audio (`#29403`) — corrected greedy transcript errors in ~4.5% of English and 6.5% of Japanese utterances by replacing clamping with `log(x + 2^-24)` ([PR #29403](https://github.com/ggml-org/llama.cpp/pull/29403)).  
- `b11188`: Resolved Vulkan build failure on legacy glslc versions lacking cooperative matrix support via `GGML_VULKAN_COOPMAT_GLSLC_SUPPORT` macro check ([PR #29409](https://github.com/ggml-org/llama.cpp/pull/29409)).  
- `b11184`: Added Metal FWHT kernels for block widths >512, improving efficiency on Apple Silicon GPUs ([PR #29095](https://github.com/ggml-org/llama.cpp/pull/29095)).

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Added experimental support for **K2 Horizon** models (0.9B to 36B MoVA) via [PR #29424](https://github.com/ggml-org/llama.cpp/pull/29424).  
  - Added support for **GraniteSpeech5ForCTC** (Turbo CTC) architecture, enabling non-autoregressive speech-to-text inference ([PR #29446](https://github.com/ggml-org/llama.cpp/pull/29446)).  
  - Added support for **Limite 1B - Violetto** model via [PR #29433](https://github.com/ggml-org/llama.cpp/pull/29433).

- **Hardware & Backend Enhancements**:  
  - Expanded **OpenCL** support with new A8 Q5_K binary kernels for non-MoE, non-dp4a configurations ([PR #29401](https://github.com/ggml-org/llama.cpp/pull/29401)).  
  - Improved **Intel GPU (SYCL)** support with updated oneAPI toolkit (2026.1) in CI and ongoing DNNL flag reporting fixes ([PR #29273](https://github.com/ggml-org/llama.cpp/pull/29273), [PR #29447](https://github.com/ggml-org/llama.cpp/pull/29447)).  
  - **Vulkan**: Added Intel FA prefill kernel and fixed legacy GLSLC compatibility ([PR #29357](https://github.com/ggml-org/llama.cpp/pull/29357), [PR #29409](https://github.com/ggml-org/llama.cpp/pull/29409)).

---

### **4. Performance & Optimization**  
- **CPU**: `ggml-cpu` tiled mul_mat using VNNI shows **3–7x speedup** for k-quants via optimized 256×256 int8 windows ([PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851)).  
- **GPU**:  
  - Metal now supports larger FWHT blocks (>512), reducing register pressure and enabling better scalability on wide sequences ([PR #29095](https://github.com/ggml-org/llama.cpp/pull/29095)).  
  - Metal FA kernels split into per-dtype libraries to improve binary size and load time ([PR #29329](https://github.com/ggml-org/llama.cpp/pull/29329)).  
- **Memory & VRAM**:  
  - Introduced `--repack` option in `llama-bench` to align tooling with `llama-cli`, improving reproducibility across backends ([PR #28968](https://github.com/ggml-org/llama.cpp/pull/28968)).  
  - BF16/FP16 → FP32 conversion now chunked to reduce peak VRAM usage, with configurable chunk size via `GGML_CUDA_CUBLAS_CONVERT_CHUNK_SIZE` ([PR #29442](https://github.com/ggml-org/llama.cpp/pull/29442)).

---

### **5. Stability & Regressions**  
Critical issues reported today highlight persistent stability challenges under high concurrency or complex model configurations:  
- **HIP/GFX1151**: Server returns responses from prior requests verbatim under `-np 4 --kv-unified` (bisected to `c7d87229`) — severe correctness bug ([Issue #25992](https://github.com/ggml-org/llama.cpp/issues/25992), 10 comments, 12 likes).  
- **CUDA**: `ggml-backend.cpp:1367: GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS)` failure with `gemma-4-E4B-it-Q4_0.gguf` on V100 — crash under evaluation ([Issue #24132](https://github.com/ggml-org/llama.cpp/issues/24132), 14 comments).  
- **Vulkan**: Build fails on older glslc due to unguarded `cooperativeMatrix` use — workaround merged ([Issue #29373](https://github.com/ggml-org/llama.cpp/issues/29373), 6 comments).  
- **SYCL**: Test failures in `CONV_2D`, `CPY`, `ROLL`, and `FLASH_ATTN_EXT` — indicates ongoing low-level correctness issues ([Issue #28384](https://github.com/ggml-org/llama.cpp/issues/28384)).

> ✅ **Fixes in progress**: PRs exist for some regressions (e.g., Vulkan fix in #29409), but no patch has been merged yet for the core `--kv-unified` response corruption.

---

### **6. What This Means for Application Developers**  
- **Use caution with `--kv-unified` and parallel requests** (`-np N`) on HIP/CUDA — known to return stale responses. Avoid in production until #25992 is resolved.  
- **Leverage new Metal and OpenCL kernels** for Apple Silicon and AMD GPUs — expect better throughput on large sequences and wider blocks.  
- **Enable `--repack` in benchmarking tools** for consistent cross-backend validation.  
- **Monitor memory usage** when using FP16/BF16 → F32 conversions; tune `GGML_CUDA_CUBLAS_CONVERT_CHUNK_SIZE` to balance performance and VRAM.  
- **Expect model loading delays** for K2 Horizon and GraniteSpeech5 models until official release tags land — verify compatibility with current `b111xx` builds.  

👉 **Recommended actions**:  
- Use `b11192` or later for stable audio (LFM2) and Metal performance.  
- Avoid `--kv-unified` on integrated HIP GPUs until further notice.  
- Monitor [GitHub Discussions](https://github.com/ggml-org/llama.cpp/discussions) for real-time troubleshooting of model-specific issues.

---  
*Data source: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-26**

---

### **1. Today's Highlights**  
Ollama v0.40.0-rc0 introduces automatic MLX runtime usage on Apple Silicon, enabling native acceleration for supported models like `qwen3.8` out-of-the-box. Critical stability fixes address silent failures in image handling (e.g., `deepseek-v4.1-flash`), OpenAI-compatible endpoint misbehavior, and macOS GUI timeouts during long inference.

---

### **2. Releases & Breaking Changes**  
- **v0.40.0-rc0**: Default MLX runtime activation on Apple Silicon devices for compatible models (e.g., `qwen3.8:27b-mlx`).  
  - *Impact*: No configuration required—models automatically leverage MLX if available.  
  - [GitHub Release](https://github.com/ollama/ollama/releases/tag/v0.40.0-rc0)  

- **OpenAI-Compatible API Fixes**:  
  - Response IDs now use UUIDs (`#18656`) to prevent collision in high-throughput environments.  
    - *Fix PR*: [#18656](https://github.com/ollama/ollama/pull/18656)  
  - `/v1/chat/completions` now respects `max_tokens` and honors `num_predict` defaults from Modelfile (`#18575`).  
    - *Issue*: Previously ignored limits, leading to unbounded generation.  

---

### **3. New Model & Hardware Support**  
- **Apple Silicon (MLX)**:  
  - `qwen3.8`, `gemma4`, and other MLX-supported models now run natively by default on M-series chips.  
  - `qwen3.8:27b-mlx` is a key beneficiary, with performance gains expected due to optimized Metal kernels.  

- **Intel GPU (SYCL/oneAPI)**:  
  - Proposal and draft integration (#16930, #17621) underway for Intel Arc/Battlemage GPUs via SYCL backend.  
  - Currently opt-in; not yet in mainline builds.  
  - [PR #17621](https://github.com/ollama/ollama/pull/17621)  

- **CUDA Backend Improvements**:  
  - Ongoing work to port Metal custom kernels to CUDA (`#18657`) improves performance for Mamba2 and convolutional layers on NVIDIA GPUs.  

---

### **4. Performance & Optimization**  
- **MLX Runtime Efficiency**:  
  - Deduplication of CUDA runtime payloads (`#17956`) reduces binary size and avoids redundant library loading.  
  - Optimized path discovery ensures faster startup and lower memory overhead.  

- **Model Loading & Prefill**:  
  - `mlxrunner` now includes load progress reporting and stall detection (`#17834`), preventing premature cancellation of large model loads.  
  - App UI now keeps chat stream alive during slow prefill phases (`#18654`), resolving silent failures on long prompts.  

- **Memory Management**:  
  - Fixed 8 GiB hard-coded prefix cache limit causing swap pressure on 32 GB Macs (`#18131`).  
    - *Workaround*: Manual override via `--prefix-cache-size` until dynamic tuning is implemented.  

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Status | Fix PR |
|--------|------|--------|--------|--------|
| Critical | `deepseek-v4.1-flash:cloud` silently discards images despite advertising `vision` capability | Breaks multimodal agents; no error raised | Open (regression: #18637) | — |
| High | `/v1/chat/completions` ignores `max_tokens` and overrides `num_predict` | Unbounded generation → crashes, cost spikes | Open | [#18575](https://github.com/ollama/ollama/issues/18575) |
| High | MLX pull fails silently on disk full (network timeout masked) | Data corruption risk; user unaware | Open | [#18644](https://github.com/ollama/ollama/issues/18644), fixed via [#18648](https://github.com/ollama/ollama/pull/18648) |
| Medium | Tool call parsing fails on trailing garbage tokens (e.g., `$$`) | Invalid JSON rejected even when syntactically valid | Open | [#18649](https://github.com/ollama/ollama/issues/18649) |
| Medium | CUDA illegal memory access on RTX 5090 (Blackwell) | Crashes during prompt evaluation | Open | [#18642](https://github.com/ollama/ollama/issues/18642) |
| Low | Windows CUDA discovery fails (0 B VRAM reported) | Falls back to CPU despite capable hardware | Open | [#18581](https://github.com/ollama/ollama/issues/18581) |

> ✅ **Note**: Several regressions are actively being addressed in PRs or under investigation.

---

### **6. What This Means for Application Developers**  
- **Agent Builders**: Avoid `deepseek-v4.1-flash:cloud` for vision tasks until the silent discard is fixed. Use local models or verified cloud providers.  
- **Performance Tuning**: On Apple Silicon, expect better throughput with `qwen3.8:27b-mlx`—leverage MLX without config changes. Monitor memory usage; adjust `--prefix-cache-size` if swapping occurs.  
- **API Reliability**: Do not rely on `max_tokens` in `/v1/chat/completions`; implement client-side bounds until fix lands. Use UUID-based response IDs in proxies/loggers.  
- **Future-Proofing**: Watch for Intel SYCL support (PR #17621) if targeting Arc GPUs. Consider contributing to `System 1` model integrations (issue #18594).  
- **Tool Integration**: Be cautious with tool call formatting—ensure no trailing noise after `}`; consider preprocessing responses.  

> 🔗 **Key Resources**:  
> - [Ollama v0.40.0-rc0 Release Notes](https://github.com/ollama/ollama/releases/tag/v0.40.0-rc0)  
> - [OpenAI-Compatible Endpoint Docs](https://github.com/ollama/ollama/blob/main/docs/api.md)  
> - [Community Integrations](https://github.com/ollama/ollama#community-integrations)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **1. Today's Highlights**  
LiteLLM v1.104.0-dev.2 introduces enhanced security via consistent Cosign signing across all Docker images, reinforcing trust in the release pipeline. Critical fixes address high-severity issues including null responses during router fallbacks (PR #43165), Redis SSL configuration errors (PR #34614), and spend logging failures for Databricks-Gemini integrations (PR #39749). The ecosystem continues to expand with support for new providers like Sail (PR #42840) and updated pricing for Fireworks AI models.

---

### **2. Releases & Breaking Changes**  
- **v1.104.0-dev.2**, **v1.100.3**, **v1.99.4**, and **v1.98.1** released within last 24h.  
- All Docker images are now cryptographically signed using [Cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0), ensuring integrity and authenticity.  
- No breaking API changes reported today; however, users should verify compatibility with downstream systems if upgrading from v1.98.x due to subtle behavioral changes in error handling and cost accounting.

> 🔗 [Verify Docker Image Signature](https://docs.sigstore.dev/cosign/overview/) | [Release Commit](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)

---

### **3. New Model & Hardware Support**  
- ✅ **Sail** added as a supported provider via PR [#42840](https://github.com/BerriAI/litellm/pull/42840), enabling integration with its `completion_window` metadata for accurate billing and rate limiting.  
- ✅ **Fireworks AI**: Updated pricing for `deepseek-v4p1-flash`, `muse-glimmer-30b`, and `deepseek-v4-flash-vision-exp` (PRs [#43253](https://github.com/BerriAI/litellm/pull/43253), [#43252](https://github.com/BerriAI/litellm/pull/43252)) now reflect retail rates.  
- ✅ **OpenRouter**: Added `typesafe/jev-router` to cost map (PR [#43248](https://github.com/BerriAI/litellm/pull/43248)), enabling cache-aware routing with correct reasoning effort enforcement.

---

### **4. Performance & Optimization**  
- **Streaming Efficiency**: PR [#43224](https://github.com/BerriAI/litellm/pull/43224) and [#43225](https://github.com/BerriAI/litellm/pull/43225) refactor Bedrock’s `stream_chunk_size` handling, eliminating redundant validation and reducing latency in request path.  
- **HTTP Client Pooling**: PR [#43245](https://github.com/BerriAI/litellm/pull/43245) introduces a unified `HttpClientPool` to standardize TLS, proxy, timeout, and CA bundle behavior across all providers—improving reliability and observability.  
- **OTel Metrics Expansion**: PR [#39774](https://github.com/BerriAI/litellm/pull/39774) proposes exporting spend, budget, and reliability metrics over OTel (in addition to Prometheus), enhancing observability in distributed environments.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [Bug]: Router fallback returns `null` response body after timeout (non-streaming) — #43165 | ⚠️ High | Open | 🛠️ In progress |
| [Bug]: Redis cache fails with `ssl_check_hostname` unexpected arg — #34614 | ⚠️ High | Open | 🛠️ In progress |
| [Bug]: Spend logs dropped silently on `id: null` responses (Databricks-Gemini) — #39749 | ⚠️ High | Open | 🛠️ In progress |
| [Bug]: `gemini/` model count_tokens returns 500 — #42735 | ⚠️ Medium | Open | ✅ Fixed in PR |
| [Bug]: Azure requests include internal `model_alias_map` — #42409 | ⚠️ Medium | Open | 🛠️ In progress |

> ⚠️ Multiple critical stability issues persist in v1.99.0+, particularly around error propagation, fallback logic, and upstream compatibility. Users relying on non-streaming fallbacks or Databricks/Gemini integrations should monitor these closely.

---

### **6. What This Means for Application Developers**  
- **Upgrade caution**: Avoid v1.99.0+ if you use Databricks-Gemini or rely on zero-cost model access under budget limits—known regressions may cause silent data loss or misbilling.  
- **Security-first deployment**: Use signed Docker images (`ghcr.io/berriai/litellm-database:v1.104.0-dev.2`) and validate signatures via Cosign to prevent supply-chain compromise.  
- **Observability improvements**: Leverage new OTel export capabilities (PR #39774) to unify telemetry across microservices and enable real-time cost monitoring.  
- **Model routing accuracy**: Ensure your cost map is up-to-date (especially Fireworks AI, OpenRouter, and Bedrock) to avoid incorrect spending reports—verify via `model_prices_and_context_window.json`.  

> 💡 Pro Tip: Use `litellm_settings.prometheus_initialize_budget_metrics: true` only with keys having `team_id` set—PR #37292 highlights that `NULL team_id` keys won’t emit budget metrics.

---  
*Digest generated: 2026-09-26 | Source: [BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-26**

#### **1. Today's Highlights**  
The Unsloth team continues to prioritize stability and performance on AMD ROCm platforms, with multiple PRs addressing GPU memory mismanagement, training crashes, and inference inefficiencies. Key developments include a new **Benchmarks page proposal** for GGUF model tuning and enhanced support for **vLLM/SGLang as optional inference engines**, expanding deployment flexibility. A major focus remains on fixing AMD-specific regressions in QLoRA training and image generation workflows.

#### **2. Releases & Breaking Changes**  
None. No new releases or breaking API/config changes were published in the last 24 hours.

#### **3. New Model & Hardware Support**  
- **vLLM & SGLang integration**: Added as opt-in inference backends in Studio (PR [#11491](https://github.com/unslothai/unsloth/pull/11491)), enabling multi-GPU serving, quantization, and vision model support.
- **ModelScope source support**: Users can now pull models from ModelScope when Hugging Face is blocked (PR [#11761](https://github.com/unslothai/unsloth/pull/11761)).
- **Custom HF endpoint**: Allows setting a mirror or private Hugging Face instance via Settings (same PR).
- **ROCm 7.14/10 compatibility**: Requested via issue [#9932](https://github.com/unslothai/unsloth/issues/9932); no PR yet, but critical for future-proofing.

#### **4. Performance & Optimization**  
- **Image pipeline optimization**: PRs [#11843](https://github.com/unslothai/unsloth/pull/11843) and [#11880](https://github.com/unslothai/unsloth/pull/11880) ensure single-threaded denoising to reuse cuDNN caches, reducing latency during repeated image/video generations.
- **Memory planning fix**: PR [#11922](https://github.com/unslothai/unsloth/pull/11922) corrects SDXL offload planning by using runtime dtype (e.g., bf16), avoiding unnecessary VRAM over-allocation.
- **Dynamic compilation improvements**: PRs [#11842](https://github.com/unslothai/unsloth/pull/11842), [#11880](https://github.com/unslothai/unsloth/pull/11880) reduce recompilation delays (15–50 sec) on second prompts with int8/fp8 transformers.
- **Hadamard rotation for Qwen-Image-2.1**: PR [#11835](https://github.com/unslothai/unsloth/pull/11835) improves int8 accuracy (LPIPS ↓ 0.066 → ~0.05) by aligning quantized blocks with bf16 precision.

#### **5. Stability & Regressions**  
High-severity issues persist on AMD hardware:  
- **GPU resets during QLoRA training**: Issue [#11498](https://github.com/unslothai/unsloth/issues/11498) reports repeated AMDGPU VM faults on RX 7900 XTX; linked to stream handling bug in `fast_dequantize()` (PR [#10563](https://github.com/unslothai/unsloth/issues/10563)).  
- **Crash during image generation**: Issue [#9130](https://github.com/unslothai/unsloth/issues/9130) shows `hipErrorLaunchFailure` leading to full Studio server crash—critical for production use.  
- **Model weight loading into RAM instead of VRAM**: Multiple reports (e.g., [#7449](https://github.com/unslothai/unsloth/issues/7449), [#9549](https://github.com/unslothai/unsloth/issues/9549)) confirm Strix Halo systems load models into system RAM despite VRAM-only settings.  
- **Qwen3.8-27B V3 GGUF crash**: Issue [#9792](https://github.com/unslothai/unsloth/issues/9792) confirms V3 GGUF fails post-prefill on R9700 (Vulkan); rollback to V2 fixes it.

> ✅ *Fixes underway*: PRs like [#11843](https://github.com/unslothai/unsloth/pull/11843) and [#11880](https://github.com/unslothai/unsloth/pull/11880) address root causes of recompilation and cache inefficiency.

#### **6. What This Means for Application Developers**  
- **AMD users must expect instability**: Avoid QLoRA training and image generation on RDNA1/RDNA2 cards until PRs are merged. Use V2 GGUFs for Qwen3.8 until #9792 is resolved.  
- **Design for resilience**: Assume GPU crashes may bring down entire Studio instances—implement retry logic and monitor for `hipErrorLaunchFailure`.  
- **Leverage new inference backends**: Use vLLM/SGLang via Studio’s opt-in config for scalable, high-throughput deployments with multi-GPU support.  
- **Optimize model loading**: For image/video pipelines, prefer BF16/FP16 over INT8 unless accuracy is prioritized—avoid unnecessary recompilation overhead.  
- **Test across GPUs**: Use end-to-end scripts (issue [#8099](https://github.com/unslothai/unsloth/issues/8099)) to validate behavior on AMD, Intel, and NVIDIA devices.

---  
*Digest compiled from GitHub data: [unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*