# AI Infrastructure Digest 2026-09-20

> Generated: 2026-09-20 00:18 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-20**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q3 2026 is characterized by rapid specialization and convergence toward hybrid, multimodal, and highly optimized serving stacks. Projects are increasingly focused on next-gen model architectures—MoE, KDA, gated delta attention, and vision-language fusion—driving demand for low-latency, high-throughput, and memory-efficient execution. GPU-specific optimizations (CUDA graphs, TMA staging, ROCm stability) dominate development cycles, while gateway-level observability and agent-friendly tooling are maturing into enterprise-grade capabilities. The ecosystem shows clear fragmentation: engine-level projects (vLLM, SGLang) push performance boundaries, runtime tools (llama.cpp, Unsloth) prioritize portability and edge deployment, and gateways (Ollama, LiteLLM) focus on developer experience and cost governance.

---

### **2. Activity Comparison**

| Project       | Issues Open | PRs Merged (Last 7d) | Releases (Last 24h) | Breaking Changes |
|---------------|-------------|------------------------|----------------------|------------------|
| vLLM          | 87          | 12                     | None                 | Yes (PR #57731)  |
| SGLang        | 114         | 18                     | None                 | Yes (in-flight)  |
| llama.cpp     | 76          | 15                     | 3 (b11053–b11057)    | No               |
| Ollama        | 102         | 9                      | None                 | Yes (Issue #18542) |
| LiteLLM       | 67          | 14                     | None                 | Yes (mcp pinning) |
| Unsloth       | 68          | 13                     | None                 | No               |

> 🔍 *SGLang leads in PR velocity and issue volume, reflecting deep infra refactoring. vLLM and Ollama show higher breaking change activity due to API/behavior shifts.*

---

### **3. Model Support Race**

| New Model / Architecture             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------------------|------|--------|-----------|--------|---------|---------|
| **Ling 3.0 Flash (Bailing V3)**      | ✅   | 🚧     | ✅        | ❌     | ❌      | ❌      |
| **Ling 3.0 VL (BailingMoeV3VL)**     | ❌   | 🚧     | ✅        | ❌     | ❌      | ❌      |
| **GLM-5.3-Flash (KDA + MLA)**        | ✅   | ✅     | ✅        | ✅     | ❌      | ✅      |
| **Qwen3.5 MoE (FastMTP)**            | ⚠️   | 🚧     | ⚠️        | ✅ (exp.) | ❌      | ⚠️ (crash) |
| **DeepSeek-V4.1-Flash**             | ❌   | ✅     | ❌        | ❌     | ✅      | ❌      |
| **Nemotron Labs Diffusion**         | ❌   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **EXL3 Quantization (MoE)**         | ❌   | ❌     | ❌        | ❌     | ❌      | ✅ (exp.) |

> 🏆 **Leaderboard**:  
> - **llama.cpp** leads in *model diversity*, with native support for Ling 3.0, GLM-5.3-Flash, and emerging quant formats.  
> - **SGLang** is ahead in *next-gen model integration* (DeepSeek-V4.1, HiCache staging), targeting high-throughput hybrid workloads.  
> - **Unsloth** stands out in *cross-platform model residency* and *edge-ready quant backends* (EXL3), enabling lightweight multi-model deployment.

---

### **4. Performance Frontier**

| Optimization Focus           | vLLM                          | SGLang                        | llama.cpp                     | Ollama                    | LiteLLM                  | Unsloth                   |
|-------------------------------|-------------------------------|-------------------------------|-------------------------------|---------------------------|--------------------------|---------------------------|
| **KV Cache & Offload**        | Full CUDA graph (ViT pending) | HiCache + TMA staging (192 GB/s) | GPU LRU cache (MoE experts)   | MTP draft trimming        | —                        | Multi-resident GGUF       |
| **Batching & Prefill**        | DiffusionGemma logit optimization | Unified cache sparsity RFC    | BF16 prefill (CUDA)           | —                         | —                        | Tensor split retention    |
| **Quantization**              | mxfp4 + fp8 (ROCm)            | MLA deduplication (15% savings)| Q8_K_M NEON vectorization     | —                         | Prompt caching visibility| EXL3 (2–8-bit MoE)        |
| **Distributed Serving**       | MoE expert parallelism (blocked) | MoE dispatch corruption fix   | —                             | Multi-GPU awareness       | FUSE v2 routing forecasts| —                         |
| **Kernel & Compiler Level**   | Manual fusion (RFC #43224)    | TMA staging (sm_90+)          | Hexagon ops (RISC-V)          | —                         | Headroom guardrail       | —                         |

> 🚀 **Top Performers**:  
> - **SGLang** dominates in *host-device transfer efficiency* (HiCache → 192 GB/s).  
> - **llama.cpp** leads in *low-level kernel optimization* (BF16, NEON, Hexagon).  
> - **vLLM** remains strongest in *MoE and speculative decoding* readiness—despite critical regressions.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Key Differentiators |
|---------------|------------------------------------|---------------------|
| **vLLM**      | **Inference Engine**               | High-performance CUDA kernels, MoE spec-decode, production-grade stability (despite regressions). |
| **SGLang**    | **High-Throughput Serving Framework** | Advanced routing (sgl-router), HiCache offloading, unified cache sparsity, designed for scale. |
| **llama.cpp** | **Local Runtime / Edge Inference** | Cross-platform portability (Metal, SYCL, RISC-V), GGUF-first design, minimal dependencies. |
| **Ollama**    | **Model Gateway / Developer CLI**  | Agent-friendly tool calls, OpenAI compatibility, MLX/Apple Silicon focus. |
| **LiteLLM**   | **Enterprise Gateway / Observability** | Rate limiting, audit logging, prompt caching analytics, team-based quotas. |
| **Unsloth**   | **Agent Orchestration / Studio Tooling** | Multi-resident models, Docker+WSL2 ROCm support, JupyterLab, Nix packaging. |

> 🎯 **Strategic Positioning**:  
> - **vLLM/SGLang** = Core engines for data center inference.  
> - **llama.cpp/Unsloth** = Edge and dev-centric runtimes.  
> - **Ollama/LiteLLM** = Developer-facing gateways with agent and cost control features.

---

### **6. Trend Signals**

🔍 **Key Industry Trends Extracted from Today’s Activity**:

1. **MoE & Hybrid Architectures Are Now Mainstream**  
   - All major projects now track or support MoE models (GLM-5.3-Flash, Qwen3.5, Ling 3.0 VL).  
   - **Watch**: MoE expert parallelism stability (SGLang, vLLM) and MoE-specific quantization (EXL3, `moe_wna16_marlin_gemm`).

2. **Hardware-Specific Optimizations Are Non-Negotiable**  
   - ROCm (MI300X/MI355X) and Intel XPU gains are accelerating, but so are stability issues (ROCm ATTN inconsistency, SYCL memory leaks).  
   - **Watch**: Vendor lock-in risks—especially on AMD/Intel hardware where support lags NVIDIA.

3. **Agent Workflows Demand Structured Output Reliability**  
   - Tool call parsing failures (Ollama, SGLang) and `min_tokens > max_tokens` bugs (vLLM) threaten agent correctness.  
   - **Watch**: JSON schema compilation limits and grammar validation in gateways.

4. **Memory & Latency Pressure Is Driving New Abstractions**  
   - HiCache staging (SGLang), GPU LRU cache (llama.cpp), and multi-resident GGUF (Unsloth) reflect a shift toward *offloaded, sparsely managed state*.  
   - **Watch**: Predictive VRAM estimation (Ollama) and prompt caching visibility (LiteLLM) as cost governance becomes critical.

5. **Stability Over Features Is the New Priority**  
   - Despite active innovation, **critical crashes** (vLLM CUDA access, Ollama RTX 4000 Ada, llama.cpp RTX 5090) dominate issue trackers.  
   - **Watch**: Nightly builds and PR status—many fixes are already merged but not yet released.

---

### **Recommendation for Application Developers**
- **For production inference**: Use **vLLM** or **SGLang** with caution—avoid speculative decoding and MoE until regression fixes land.
- **For agent pipelines**: Prioritize **Ollama** or **Unsloth** with validated tool call handling; monitor `reasoning_content` and `typical_p` deprecation.
- **For edge/low-resource**: Choose **llama.cpp** (NEON/Q8_K_M) or **Unsloth** (EXL3, multi-resident GGUF).
- **For cost-aware deployments**: Leverage **LiteLLM’s** prompt caching and user attribution features.
- **Always validate**: Test against nightly builds, especially for new models (Ling 3.0, Qwen3.5 MoE) and GPU backends (ROCm, Metal).

> 📌 *Bottom Line*: The ecosystem is no longer just about speed—it's about reliability, consistency, and observability at scale. Choose your stack based on **deployment context**, **hardware**, and **workload type**—not just raw throughput.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-20**

---

### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance for next-generation multimodal and MoE models, with critical fixes for speculative decoding correctness and KV cache offloading under high concurrency. Key developments include a fix for `min_tokens` validation in sampling parameters, enhanced support for mixed-precision Kimi-K3 checkpoints on ROCm, and ongoing work to enable full CUDA graph support for ViT encoders in multimodal pipelines.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes were published in the last 24 hours.*  
However, PR [#57731](https://github.com/vllm-project/vllm/pull/57731) introduces a defensive check to reject `min_tokens` values exceeding `max_tokens`, which may be enforced in future versions to prevent silent misbehavior during inference.

---

### **3. New Model & Hardware Support**  
- **ROCm Support**: Mixed-precision loading of Kimi-K3 checkpoints (mxfp4 + fp8) is now supported via [PR #57048](https://github.com/vllm-project/vllm/pull/57048), enabling efficient serving on MI300X/MI355X.
- **CPU Backend**: A feature request ([#57346](https://github.com/vllm-project/vllm/issues/57346)) proposes adding a CPU KDA backend for GLM-5.3-Flash, targeting hybrid models with sparse MLA and gated delta attention layers.
- **Intel GPU**: MRV2 sampler now supports XPU via fused top-k/top-p kernel ([PR #57277](https://github.com/vllm-project/vllm/pull/57277)), improving efficiency on Intel GPUs.

---

### **4. Performance & Optimization**  
- **Prefill Efficiency**: PR [#57416](https://github.com/vllm-project/vllm/pull/57416) improves prefill-only batch performance by avoiding unnecessary logit row allocation in diffusion models like DiffusionGemma.
- **Kernel Fusion**: Work continues on porting compiler fusions to manual fusion ([RFC #43224](https://github.com/vllm-project/vllm/issues/43224)) to reduce overhead and improve predictability.
- **Speculative Decoding**: Full CUDA graph support for spec-decode drafters remains blocked at PIECEWISE-only mode ([Issue #45258](https://github.com/vllm-project/vllm/issues/45258)), representing a ~15–18% decode-time bottleneck in current deployments.

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - [#54317](https://github.com/vllm-project/vllm/issues/54317): Recurring CUDA illegal memory access on 4xB200 for GLM-5.3-Flash across unrelated kernels (KDA linear-attention, MHC TileLang, TRT-LLM fused MoE). High severity; no fix yet.  
  - [#57493](https://github.com/vllm-project/vllm/issues/57493): ROCm ATTN returns inconsistent outputs under load on gfx1151 — deterministic behavior failure affecting reproducibility.  
- **Correctness Bugs**:  
  - [#56868](https://github.com/vllm-project/vllm/issues/56868): Long-decode degeneration after accumulated reasoning in quantized GLM-5.3-Flash.  
  - [#38175](https://github.com/vllm-project/vllm/issues/38175): ViT encoder not fully supported in CUDA graphs — blocking full optimization for multimodal models (Qwen3-VL, Kimi K2.5, etc.).  
- **Fixes in Progress**:  
  - PR [#57710](https://github.com/vllm-project/vllm/pull/57710) resolves task cancellation corruption in elastic EP state (`#57691`).  
  - PR [#57678](https://github.com/vllm-project/vllm/pull/57678) refactors model loader logic to unify post-load iteration order, reducing potential inconsistency risks.

---

### **6. What This Means for Application Developers**  
- **Avoid `min_tokens > max_tokens`** in production requests until [#57731](https://github.com/vllm-project/vllm/pull/57731) lands — it could silently break structured output workflows.
- **Use caution with speculative decoding on MoE models** — known issues in DP setups ([#44185](https://github.com/vllm-project/vllm/issues/44185)) and long-context generation ([#56868](https://github.com/vllm-project/vllm/issues/56868)) can lead to degraded output quality.
- **For multimodal apps**, expect partial ViT CUDA graph support only — full integration pending RFC #38175. Consider disabling graphs temporarily if you encounter crashes.
- **On ROCm**, ensure `VLLM_ROCM_USE_AITER` is set when using Qwen3.5-122B-A10B-FP8; otherwise, performance drops up to 3.7× at 12k context length ([#56945](https://github.com/vllm-project/vllm/issues/56945)).
- **Validate your quantization config** — recent issues with `moe_wna16_marlin_gemm` ([#48895](https://github.com/vllm-project/vllm/issues/48895)) show that incorrect per-row topk weights can corrupt output even with valid checkpoint formats.

> ✅ **Actionable Tip**: Monitor PRs linked above for upcoming patches, especially those addressing speculative decoding and ROCm reliability. Use nightly builds for early access to fixes.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-20**

---

### **1. Today's Highlights**  
The SGLang project continues its deep infrastructure refinement with a focus on high-throughput, memory-efficient inference for next-gen hybrid models like GLM-5.3-Flash and DeepSeek-V4.1. Key developments include: (1) new HiCache staging kernels enabling 2× faster host-device KV transfers (up to 192 GB/s), (2) major refactoring of the `sgl-router` system for session-aware, cache-aware, and SLO-driven request routing, and (3) active tracking and resolution of critical stability issues in CUDA execution, MoE expert parallelism, and structured decoding.

---

### **2. Releases & Breaking Changes**  
None. No new releases were published in the past 24 hours. However, several breaking changes are in flight:
- **PR #40278**: Introduces TMA-staged host<->device transfer for HiCache (sm_90+), which may alter performance characteristics under memory pressure.
- **PR #39565**: Adds opt-in MLA load deduplication via `--enable-linker-mla-dedup`, changing behavior when using Mooncake Linker across TP ranks.
- **PR #40241–#40379 (stack)**: Refactor of `sgl-router`'s bucketing and admission policies; backward compatibility preserved but config structure is now more modular.

> 🔗 [PR #40278](https://github.com/sgl-project/sglang/pull/40278) | [PR #39565](https://github.com/sgl-project/sglang/pull/39565) | [Router Refactor Stack](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+label%3A%22documentation%22+label%3A%22sgl-router%22+sort%3Aupdated-desc)

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1-Flash** support is actively being upstreamed and tracked via **Issue #40152**, with integration pending main-branch merge.
- **GLM-5.3-Flash** now has first-class support (v0.5.20+) including DSA attention backends, though **Issue #40286** highlights a missing DSA backend for SM121 (DGX Spark), limiting deployment options.
- **Nemotron Labs Diffusion** support is being staged for upstreaming (**Issue #25802**), targeting `nvidia/Nemotron-Labs-Diffusion-8B`.
- **HiCache + TMA staging** is now enabled for SM90+ architectures (H20/Hopper), improving offload performance for long-context workloads.

> 🔗 [Issue #40152](https://github.com/sgl-project/sglang/issues/40152) | [Issue #40286](https://github.com/sgl-project/sglang/issues/40286) | [Diffusion Tracker](https://github.com/sgl-project/sglang/issues/25802)

---

### **4. Performance & Optimization**  
- **HiCache KV Transfer**: Host-to-device throughput increased from **97 → 192 GB/s**, and device-to-host from **93 → 183 GB/s**, nearing host link ceiling (4x GPU PCIe Gen5).
- **MLA Deduplication**: On 8× H20 (96GB), TP8 PP1, GLM-5.2 W4AFP8, enables **~15% reduction in MLAs loaded per rank** by reusing data from rank 0.
- **Unified Cache Sparsity Framework (RFC #32657)**: Aims to enable post-hoc sparsity (e.g., fixed-pattern, query-aware) without model retraining—critical for future efficient inference.
- **FlashInfer Autotune Cache Fix (PR #40320)**: Prevents unnecessary cache discarding on MoE EP>1 startups, eliminating redundant tuning overhead.

> 🔗 [PR #40278](https://github.com/sgl-project/sglang/pull/40278) | [PR #39565](https://github.com/sgl-project/sglang/pull/39565) | [Issue #40320](https://github.com/sgl-project/sglang/issues/40320)

---

### **5. Stability & Regressions**  
Critical stability issues reported today:
1. **CUDA Coredump Tracker (#26340)**: Auto-collected coredumps from CI; **316 comments** indicate recurring runtime crashes during test runs—likely tied to kernel launches or memory corruption.
2. **FlashInfer Autotune Cache Discard (#40320)**: Repeated autotuning on startup due to shape mismatches under MoE expert parallelism — impacts cold-start latency.
3. **JSON Schema Grammar Compilation Crash (#39125)**: Potential DFA state explosion under deeply nested schemas — security risk if untrusted inputs are accepted.
4. **Engram Profiling Failure (#39173)**: CUDA graph capture fails with "engram target-verify expects one equal block per request" — blocks profiling for DeepSeek-V4.1-Flash + Engram.
5. **MoE Dispatch Corruption (#40156)**: Draft batch `num_token_non_padded` is zero → all draft topk IDs masked to -1 → MoE dispatch broken.

> 🔗 [Issue #26340](https://github.com/sgl-project/sglang/issues/26340) | [Issue #40320](https://github.com/sgl-project/sglang/issues/40320) | [Issue #39125](https://github.com/sgl-project/sglang/issues/39125) | [Issue #39173](https://github.com/sgl-project/sglang/issues/39173) | [Issue #40156](https://github.com/sgl-project/sglang/issues/40156)

---

### **6. What This Means for Application Developers**  
- **Use `--enable-linker-mla-dedup`** for multi-node deployments with GLM-5.3-Flash to reduce redundant MLAs and improve loading time.
- **Avoid `--tp-size > 1` with MoE models** until PR #40320 lands — otherwise expect repeated autotuning delays at boot.
- **Validate JSON schema depth** before submission: deep nesting may trigger CPU hangs due to unbounded recursion in grammar compilation.
- **For long-context apps**, leverage HiCache staging (`--disaggregation-decode-enable-host-receive`) to avoid device KV pressure stalls.
- **Expect breaking changes in routing logic** as `sgl-router` refactor progresses — monitor `sgl-router` PRs and update policy configs accordingly.

> 🔗 [Route Policy Refactor Series](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+label%3A%22documentation%22+label%3A%22sgl-router%22)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-20**

---

### **1. Today's Highlights**  
The latest updates focus on robust support for **Ling 3.0 (Bailing V3)** and its vision-language variant, including dedicated parsers and model loading. Critical fixes address GPU backend stability—especially for **Metal (Apple Silicon)** and **SYCL (Intel Arc)**—and improve memory handling across multiple backends. Performance optimizations for **BF16 prefill** and **Q8_K_M quantization** are also advancing.

---

### **2. Releases & Breaking Changes**  
- **b11057**: Added dedicated parser for **Ling 3.0 (Bailing V3)** to handle early tool calls before `</think>` tags, fixing content omission in `tool_choice=required` workflows. [PR #28682](https://github.com/ggml-org/llama.cpp/pull/28682)  
- **b11056–b11054**: Enabled new **Hexagon backend ops** (`GET_ROWS`, `TOP_K`, `GEGLU_QUICK`) — essential for future RISC-V AI acceleration. [PRs #29116, #29114, #29113](https://github.com/ggml-org/llama.cpp/pulls?utf8=%E2%9C%93&q=is%3Amerged+label%3Ahexagon)  
- **b11053**: Improved server startup logs with per-model source tracking (`[source]` tag), showing HF cache paths and `hf_cache::get_cache_dir()` public access. [PR #29125](https://github.com/ggml-org/llama.cpp/pull/29125)

> ✅ *No breaking API changes reported; backward compatibility preserved.*

---

### **3. New Model & Hardware Support**  
- **Ling 3.0 Flash (Bailing V3)**: Full support added via dedicated parser and grammar handling. [PR #28682](https://github.com/ggml-org/llama.cpp/pull/28682)  
- **Ling 3.0 VL (BailingMoeV3VL)**: Added support for the vision-language variant (124B total / 5.1B active, hybrid KDA + gated MLA, MoE). [PR #29151](https://github.com/ggml-org/llama.cpp/pull/29151)  
- **Qwen4Exp HC Ops**: Metal backend now supports new `hc_pre` (sigmoid-gated) and `hc_post` (identity mixing) variants used by `qwen4exp`. [PR #29000](https://github.com/ggml-org/llama.cpp/pull/29000)  
- **OpenHarmony (musl)**: Build compatibility added for OHOS targets (`x86_64-linux-ohos`, `aarch64-linux-ohos`). [PR #29156](https://github.com/ggml-org/llama.cpp/pull/29156)  
- **Prism PQ2_0 (type 142) & PTQ1_0 (type 143)**: Feature request opened to support Ternary-Bonsai-2 quant formats. [Issue #29058](https://github.com/ggml-org/llama.cpp/issues/29058)

---

### **4. Performance & Optimization**  
- **BF16 Prefill Speedup**: CUDA optimization converts contiguous tensors four elements at a time, improving prefill throughput significantly on AMD/NVIDIA GPUs. [PR #29155](https://github.com/ggml-org/llama.cpp/pull/29155)  
- **Q8_K_M Quantization**: NEON vectorized `ggml_quantize_mat_q8_K_4x4` and `4x8` kernels now available for ARM CPUs, delivering measurable speedups without precision loss. [PR #29153](https://github.com/ggml-org/llama.cpp/pull/29153)  
- **AVX-VNNI on MSVC**: Automatic detection and compilation enabled for AVX-VNNI instructions on Windows builds. [PR #28297](https://github.com/ggml-org/llama.cpp/pull/28297)  
- **GPU LRU Cache for MoE Experts**: Experimental PR introduces host-offloaded expert caching on GPU (via `-ot exps=CPU`), reducing bandwidth-bound decode latency. [PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)

---

### **5. Stability & Regressions**  
- **Critical Crash (RTX 5090)**: CUDA graphs cause GPU hang (RC watchdog + Xid 8) on RTX 5090 sm_120; workaround: `GGML_CUDA_DISABLE_GRAPHS=1`. [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)  
- **ROCm/HIP Recurrent State Leak**: Ling 3.5/MoE models leak state across requests when reusing server slots, causing earlier prompt text to appear verbatim. [Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092)  
- **SYCL Memory Mismatch**: On dual-GPU systems, `UR_RESULT_ERROR_OUT_OF_DEVICE_MEMORY` occurs due to incorrect device context binding in pinned memory. [Issue #28765](https://github.com/ggml-org/llama.cpp/issues/28765)  
- **Metal Deprecation Warnings**: macOS 27 SDK deprecates `MTLDevice.location` and `MTLGPUFamilyCommon{1,2,3}`; fix merged. [PR #29136](https://github.com/ggml-org/llama.cpp/pull/29136)  

> 🔴 *Fixes exist for Metal and SYCL issues; CUDA graph issue remains unpatched.*

---

### **6. What This Means for Application Developers**  
- **Agent Builders**: The new **Ling 3.0 parser** enables reliable tool use in agents using `tool_choice=required`—critical for production-grade reasoning pipelines. Use `--model Ling-3.0-flash-VL` for multimodal agents.  
- **Performance Tuning**: Enable `GGML_CUDA_DISABLE_GRAPHS=1` on RTX 5090 until the CUDA graph bug is resolved. For high-throughput inference, leverage `--threads -1` (now auto-calculates math cores).  
- **Multi-GPU Deployments**: Be cautious with ROCm/HIP and SYCL on multi-GPU systems—state leakage may corrupt outputs. Monitor `--ctx-size` and draft-MTP usage carefully.  
- **Cross-Platform Apps**: OpenHarmony support allows deployment on embedded or mobile devices with musl libc. Ensure UTF-8 path handling is validated (fixes merged).  
- **Quantization Choice**: Consider `Q8_K_M` with NEON vectorization for ARM-based edge inference. Watch for `Prism PQ2_0/PTQ1_0` support in upcoming releases.

> 📌 **Actionable Tip**: Always validate model output for invalid UTF-8—recent PRs (#28724, #29161) add sanitization at token boundaries.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-20**

---

### **1. Today's Highlights**  
Ollama continues to evolve its support for advanced model features, with critical fixes for tool call parsing and reasoning content handling in DeepSeek and Qwen models. New PRs introduce `reasoning_content` support in the OpenAI-compatible API and improve detection of implicit tool call syntax in Qwen3-Coder, directly addressing client compatibility issues. Meanwhile, ongoing work on GPU memory reporting and MTP draft-vocabulary trimming signals deeper infrastructure maturity.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, **issue #18542** highlights a breaking change: `typical_p` is no longer supported, which may affect legacy clients like SillyTavern. This suggests a potential deprecation in upcoming releases—developers should audit dependencies using `typical_p`. [Issue #18542](https://github.com/ollama/ollama/issues/18542)

---

### **3. New Model & Hardware Support**  
- ✅ **MLX**: Added native support for `gliner-small-v2.1` via MLX runner (`POST /api/extract`). Enables lightweight entity extraction on Apple Silicon. [PR #18535](https://github.com/ollama/ollama/pull/18535)  
- 🚧 **Qwen 3.5 MoE**: Experimental support for FastMTP with trimmed draft vocabularies (`d2t` mapping) is under development. [PR #18546](https://github.com/ollama/ollama/pull/18546)  
- 🖥️ **Hardware**: PRs now target improved multi-GPU awareness—support for both **CUDA and ROCm runtimes** on Linux systems (e.g., 7800XT + 4060Ti). [Issue #18545](https://github.com/ollama/ollama/issues/18545), [PR #18543](https://github.com/ollama/ollama/pull/18543)  

---

### **4. Performance & Optimization**  
- 🔍 **Memory Prediction & Reporting**: Three related PRs ([#18197](https://github.com/ollama/ollama/pull/18197), [#18198](https://github.com/ollama/ollama/pull/18198), [#18201](https://github.com/ollama/ollama/pull/18201)) enable per-device VRAM reporting and predictive VRAM estimation based on head dimensions and load metrics—critical for multi-GPU deployment planning.  
- ⚙️ **Speculative Decoding**: A regression in MTP speculative decoding was reported for Qwen3.8 27B; fix pending. [Issue #18541](https://github.com/ollama/ollama/issues/18541)  
- 📊 **Benchmarking**: `bench` command now supports HumanEval prompts and OpenAI API benchmarking with adjustable context size. [PR #17480](https://github.com/ollama/ollama/pull/17480), [PR #15084](https://github.com/ollama/ollama/pull/15084)

---

### **5. Stability & Regressions**  
**High Severity:**  
- ❌ **CUDA Crash on RTX 4000 Ada**: `gpt-oss:20b` (MXFP4) crashes deterministically during short `/api/chat` requests due to CUDA `ADD_ID` failure. [Issue #18522](https://github.com/ollama/ollama/issues/18522)  
- ❌ **Tool Call Parsing Failures**: Multiple models (Qwen3-Coder, MiniCPM5-2B) fail to parse tool calls when reasoning precedes them or when `<tool_call>` opener is omitted. [Issue #18530](https://github.com/ollama/ollama/issues/18530), [Issue #18483](https://github.com/ollama/ollama/issues/18483)  
- ❌ **Silent Image Discard**: `deepseek-v4.1-flash:cloud` advertises `vision` capability but silently drops all image inputs. No error raised. [Issue #18527](https://github.com/ollama/ollama/issues/18527)  

**Medium Severity:**  
- ⚠️ **Intel QuickSync iGPU Not Utilized**: Docker container shows no iGPU activity despite GPU passthrough. [Issue #18548](https://github.com/ollama/ollama/issues/18548)  
- ⚠️ **Model Download Failure**: Users report model downloads failing in v0.34.2 but working in v0.34.1. [Issue #18547](https://github.com/ollama/ollama/issues/18547)  
- ⚠️ **MLX Gemma 4 MoE Load Failure**: Missing MoE expert weights (`experts.switch_glu`) prevent loading of pre-quantized `mlx-community/gemma-4-26B-A4B-it-qat-4bit`. [Issue #18540](https://github.com/ollama/ollama/issues/18540)

---

### **6. What This Means for Application Developers**  
- **Tool Call Clients Must Adapt**: Expect inconsistent tool call parsing across models—especially Qwen3-Coder and MiniCPM5-2B. Use `qwenParserState` logic or expect `null` responses. [PR #18538](https://github.com/ollama/ollama/pull/18538) provides partial mitigation.  
- **OpenAI-Compatible Clients Need Updates**: The `reasoning_content` field is now required by DeepSeek-compatible APIs—clients ignoring it will lose replayed thinking. [PR #18536](https://github.com/ollama/ollama/pull/18536), [PR #18543](https://github.com/ollama/ollama/pull/18543) add support.  
- **Multi-GPU Deployment Requires Careful Setup**: If using both NVIDIA and AMD GPUs, ensure both CUDA and ROCm runtimes are installed. Installer currently favors CUDA. [Issue #18545](https://github.com/ollama/ollama/issues/18545)  
- **Monitor for Breaking Changes**: The removal of `typical_p` may break older clients—update integrations before upgrading beyond v0.34.1. [Issue #18542](https://github.com/ollama/ollama/issues/18542)  

> 💡 *Pro Tip:* Use `/api/info` and `/api/ps` endpoints to monitor actual GPU memory usage and model placement—critical for debugging overcommit scenarios.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-09-20**

---

### **1. Today's Highlights**  
The LiteLLM project continues to deepen its enterprise-grade observability and security posture, with critical fixes to rate limiting logic (Issue #34140), streaming response serialization (PR #41983), and audit logging for team management (PR #41840). New UI features now expose prompt caching savings (PR #42055) and FUSE v2 routing forecasts (PR #42057), enhancing cost visibility for internal users and admins.  

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
- **Migration Note**: The `mcp` Python SDK has been pinned to version 1.x (`mcp>=1.28.1,<2.0`) due to breaking changes in MCP 2.0.0 (Issue #35306). Users must avoid installing `mcp==2.0.0` alongside LiteLLM until compatibility is addressed.

---

### **3. New Model & Hardware Support**  
- **Model Updates**:  
  - Added support for `openrouter/deepseek/deepseek-v4-flash` with updated pricing (PR #42006).  
  - Added `deepseek-vr-p4o` to `model_prices_and_context_window.json` (Issue #30430).  
- **Provider Integration**:  
  - Work ongoing to support Anthropic’s **Claude Apps Gateway** (Issue #34924).  
  - AWS Nova Sonic model has been updated from retired `amazon.nova-sonic-v1:0` to `amazon.nova-2-sonic-v1:0` (PR #42053).

---

### **4. Performance & Optimization**  
- **Headroom Guardrail Optimization** (PR #41983):  
  - Skips compression round-trip for requests below a `min_tokens` threshold — reducing latency for short chats without token savings.  
- **Prompt Caching Visibility** (PR #42055):  
  - Adds filterable views of individual prompt caching requests, including injection, usage, and net savings — enabling granular cost optimization.  
- **Internal User Savings & Router Usage** (PR #42026):  
  - Extends UI analytics to internal users via JWT attribution, improving accountability in multi-user deployments.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Description |
|------|----------|--------|--------|-------------|
| [#34140](https://github.com/BerriAI/litellm/issues/34140) | Critical | Open | ❌ | Rate limiter double-counts per-team per-model limits → effective RPM/TPM is half configured. Impacts cost control and SLA enforcement. |
| [#41983](https://github.com/BerriAI/litellm/pull/41983) | High | Open | ✅ | Responses stream events lose explicit `null` values (e.g., `response.completed`) — breaks downstream parsing. Fix merged. |
| [#41972](https://github.com/BerriAI/litellm/pull/41972) | High | Open | ❌ | Streaming chunks drop nulls during `_serialize_streaming_chunk`, leading to incomplete event payloads. |
| [#41954](https://github.com/BerriAI/litellm/issues/41954) | High | Open | ❌ | Tool result `cache_control` field is incorrectly moved into `content` when bridging Anthropic→OpenAI→Anthropic, causing 400 errors. |
| [#42005](https://github.com/BerriAI/litellm/issues/42005) | Medium | Open | ❌ | Responses-to-Chat bridge loses native tool calls on multi-turn replay and leaks reasoning as assistant text. |

> 🔴 **Critical Risk**: The rate limiter bug (#34140) may cause unexpected 429s in production environments using team-based model quotas.

---

### **6. What This Means for Application Developers**  
- **Avoid `sk-1234` in configs**: The master key example has been removed from shipped configs (PR #42011) — always use environment variables or secrets managers.  
- **Streaming reliability**: Be cautious when using `/v1/responses` streams with providers like Anthropic; null fields may be stripped unless you patch with PR #41983.  
- **Cost visibility**: Leverage new UI features (PRs #42055, #42026) to monitor prompt caching savings and internal user spend — essential for agent cost governance.  
- **Multi-account OAuth**: If you need multiple ChatGPT accounts in one proxy, consider contributing to Issue #23777 (currently unsupported).  
- **Guardrail caution**: Custom code/tool permission guardrails cannot yet block MCP tools sent via `/v1/messages` (Issue #40583) — ensure fallback validation at app level.

> 📌 **Action Item**: Audit your rate limit configurations immediately if using per-team per-model limits — current behavior may halve your effective throughput.

---  
*Digest generated: 2026-09-20 | Source: [GitHub - BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-20**

#### **1. Today's Highlights**  
The Unsloth ecosystem continues to mature with key improvements in model management, stability, and cross-platform support. Critical fixes address crashes during GGUF loading for Qwen models (e.g., `Qwen3.5 FastMTP`) and memory issues on multi-GPU MoE setups. Notably, new PRs enable *multi-resident GGUF models* in Studio and expand Docker support for ROCm users—including JupyterLab and SSH access—closing a major gap for AMD GPU developers.

#### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No API or config-breaking changes were introduced.

#### **3. New Model & Hardware Support**  
- ✅ **ROCm + WSL2 GPU Access**: PR #11212 enables ROCm containers to use AMD’s DXG bridge (`/dev/dxg`) in WSL2, resolving GPU access failures on Windows.  
- ✅ **Docker ROCm Studio Image**: PRs #11218 and #11286 add full Studio UI, JupyterLab, SSH, and supervisord to `unsloth/unsloth-rocm`, matching CUDA image parity.  
- ✅ **EXL3 Quantization Backend**: PR #7115 adds experimental support for ExLlamaV3 (EXL3) with 2/3/4/6/8-bit quantization and MoE model handling—ideal for low-memory inference.  
- ✅ **Nixpkgs Packaging**: PR #11135 delivers official NixOS package availability for Unsloth Desktop, enabling declarative installations via `nix`.

#### **4. Performance & Optimization**  
- 🚀 **Multi-Resident GGUF Models**: PR #10876 introduces support for running multiple GGUF models simultaneously in isolated `llama-server` processes, improving workflow efficiency for A/B testing and agent orchestration.  
- 💡 **Prompt Preservation**: PR #11340 extends API monitor to retain full prompts beyond 12K characters (capped at 64 MiB), enabling accurate debugging and reproducibility.  
- ⚙️ **Tensor Splitting Retention**: PR #11330 fixes regression where `--tensor-split` flags were stripped during CPU offload, preventing OOM on large MoE models across GPUs.

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Link |
|--------|------|--------|------|
| 🔴 High | Qwen3.8-Flash-Next MTP aborts due to `hc_head_norm` dimension mismatch post-rebase | Open | [Issue #11143](https://github.com/unslothai/unsloth/issues/11143) |
| 🔴 High | Qwen 3.5 FastMTP with `d2t` vocab trim crashes llama.cpp loader | Open | [Issue #11335](https://github.com/unslothai/unsloth/issues/11335) |
| 🔴 High | Windows Desktop backend installs to `%USERPROFILE%\.unsloth\studio` despite custom app dir | Open | [Issue #11327](https://github.com/unslothai/unsloth/issues/11327) |
| 🟡 Medium | Inference slow on Windows vs Linux (regression) | Open | [Issue #11336](https://github.com/unslothai/unsloth/issues/11336) |
| 🟡 Medium | "Review plan" feature inert until page reload | Open | [Issue #10676](https://github.com/unslothai/unsloth/issues/10676) |

> ✅ *Note:* Fix PRs exist for several issues (e.g., #11338 for Debian updates, #11341 for auto-reload), but none are merged yet.

#### **6. What This Means for Application Developers**  
- Use **EXL3 backend** (PR #7115) for ultra-low-memory deployments of MoE or high-precision models—especially useful for edge inference.  
- Leverage **multi-resident GGUF models** (PR #10876) to run parallel agents or comparison pipelines without reloading.  
- For **AMD users**, Docker images now offer full Studio + Jupyter + SSH—no more manual setup. Ensure WSL2 is configured with DXG bridge for GPU access.  
- Avoid `d2t`-trimmed vocabularies with Qwen models until issue #11335 is resolved.  
- On Windows, expect slower performance (issue #11336); consider Linux or WSL2 for production workloads.  

> 👉 *Pro Tip:* Monitor PR #11338 for upcoming Debian in-app updates—critical for enterprise rollouts.

---  
*Data source: github.com/unslothai/unsloth | Updated: 2026-09-20*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*