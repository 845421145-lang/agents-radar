# AI Infrastructure Digest 2026-10-31

> Generated: 2026-10-31 01:45 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-31**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q4 2026 is rapidly maturing, characterized by deep hardware diversification, aggressive performance optimization, and a clear bifurcation between *production-grade serving* and *developer-first local runtimes*. Projects are converging on key capabilities—multimodal support, speculative decoding, and disaggregated inference—while simultaneously diverging in architectural philosophy: vLLM and SGLang push toward scalable, low-latency server deployments; llama.cpp and Ollama dominate lightweight, edge-local execution; LiteLLM emerges as the unifying gateway layer for multi-provider orchestration; Unsloth focuses on democratizing fine-tuning with accessible UX and CPU fallbacks. The era of platform lock-in is ending—ROCm, AMD NPU, Intel XPU, and Apple MLX are now first-class citizens.

---

### **2. Activity Comparison**

| Project       | Open Issues (High/Crit) | PRs Merged (Last 7d) | Release Status         |
|---------------|--------------------------|------------------------|------------------------|
| **vLLM**      | 18 (4/3)                 | 12                     | None (RC pending)      |
| **SGLang**    | 25 (3/2)                 | 9                      | None                   |
| **llama.cpp** | 28 (3/3)                 | 11                     | Breaking changes pending |
| **Ollama**    | 14 (2/2)                 | 5                      | No new release         |
| **LiteLLM**   | 10 (3/2)                 | 8                      | v1.109.0-dev.2 released |
| **Unsloth**   | 17 (2/2)                 | 6                      | v0.1.913-beta released |

> 🔍 *Observation:* vLLM leads in technical depth and stability tracking, while Unsloth and LiteLLM show strong release velocity. SGLang and Ollama face persistent high-severity bugs despite moderate activity.

---

### **3. Model Support Race**

| New Model / Architecture              | Supported By                          | Status & Notes |
|---------------------------------------|----------------------------------------|----------------|
| **Qwen3.8-Flash-Next (Quark-MXFP4)** | vLLM, SGLang, Unsloth, llama.cpp       | vLLM leads in ROCm + CUDA Graph integration; SGLang optimized for gfx950 |
| **Kimi-K3 / Kimi K2.5**               | vLLM (RFC), SGLang                     | vLLM targeting ViT CUDA Graph; SGLang with kernel fusions |
| **DeepSeek-V4.1-Flash-1017 (GGUF)**   | Unsloth (Dynamic v3.1), llama.cpp      | Unsloth offers native GGUF support; llama.cpp under investigation |
| **Gemma 4 (E2B/E4B)**                 | llama.cpp (graph optimizations)        | First to ship prefill gains via KV-shared layer pruning |
| **LFM3-Audio/Omni**                   | llama.cpp, Unsloth                     | Both enable IQ3_S/IQ3_XXS; Unsloth has video input issues |
| **T-Head Zhenwu 810/M890P**           | SGLang (roadmap)                       | Only project actively upstreaming T-Head PPU support |
| **MLX Backend (Apple Silicon)**       | Ollama, Unsloth                        | Ollama fixes memory scheduling; Unsloth adds AutoTrust vision models |

> 🏆 **Leaderboard**:  
> - **Most Comprehensive Model Coverage**: *vLLM* (supports latest Qwen, GLM, Kimi across multiple backends).  
> - **Fastest Emerging Hardware Integration**: *SGLang* (T-Head, AMD RDNA4, Ascend A2/A3).  
> - **Best Local Edge Readiness**: *llama.cpp* (Q2_0/OpenCL, IQ3_S, Hexagon kernels).

---

### **4. Performance Frontier**

| Optimization Focus               | Leading Projects                  | Key Developments |
|----------------------------------|-----------------------------------|------------------|
| **KV Cache & Attention**         | vLLM, SGLang, llama.cpp           | FP8 KV cache on ROCm (vLLM); FlashInfer AllReduce Fusion (SGLang); MoE caching upgrade (llama.cpp) |
| **Speculative Decoding**         | vLLM, SGLang, Ollama              | Incremental streaming (vLLM #64674); draft control (Ollama #19391); `topk_mask` (llama.cpp) |
| **Quantization & Memory Safety** | llama.cpp, Unsloth, Ollama        | Q2_0 on OpenCL (llama.cpp); IQ3_S/IQ3_XXS (llama.cpp); `-sm tensor` crash fix (llama.cpp) |
| **Distributed & Disaggregated Inference** | vLLM, SGLang                    | MooncakeConnector (vLLM #60523); pluggable transports (RDMA/TCP/Ascend) |
| **JIT & Kernel-Level Fusions**   | SGLang, vLLM, llama.cpp           | Fuse `qknorm_rope` (SGLang); ClassLRU hybrid cache (llama.cpp); fused LoRA kernels (Unsloth) |

> ⚙️ **Frontier Summary**: The performance arms race is no longer just about raw throughput—it’s about **memory efficiency**, **kernel fusion precision**, and **low-latency streaming**. vLLM and SGLang lead in distributed systems; llama.cpp dominates low-level kernel innovation; Unsloth excels in training efficiency.

---

### **5. Layer Positioning**

| Project       | Primary Layer             | Core Strengths                                  | Target Users |
|---------------|----------------------------|--------------------------------------------------|--------------|
| **vLLM**      | Serving Engine             | High-throughput inference, P/D disaggregation, CUDA Graph, speculative decoding | Enterprise-scale LLM serving |
| **SGLang**    | Multi-Backend Runtime      | Cross-platform deployment, ROCm/Ascend/NPU support, API unification | DevOps, cloud-native AI teams |
| **llama.cpp** | Local Runtime / Edge       | CPU/GPU portability, minimal dependencies, mobile support | Developers, edge devices, offline AI |
| **Ollama**    | Local Gateway + CLI        | Unified model interface, Apple Silicon optimization, MLX integration | Individual developers, local agents |
| **LiteLLM**   | Gateway / Orchestration     | Multi-provider routing, cost accounting, FIPS compliance, Rust router core | SaaS platforms, regulated environments |
| **Unsloth**   | Fine-Tuning + Training UX   | Fused LoRA, CPU fallback, dynamic model registry | Researchers, educators, indie builders |

> 🔄 **Layer Convergence**: LiteLLM and Ollama are becoming de facto gateways; vLLM and SGLang are evolving into full-stack infra engines; llama.cpp remains the gold standard for edge/local execution.

---

### **6. Trend Signals**

#### ✅ **Key Industry Trends Extracted**:
1. **Hardware Diversification Accelerates**: ROCm, T-Head PPU, Intel XPU, and Apple MLX are no longer niche—they’re central to roadmap planning. SGLang and vLLM are leading this charge.
2. **Disaggregation Is Real**: vLLM’s MooncakeConnector RFC and SGLang’s transport pluggability signal that **P/D (Processing/Data) separation** is moving from theory to production.
3. **Speculative Decoding Goes Beyond Speed**: Now tied to **structured output correctness** (e.g., LiteLLM’s `topk_mask`, Ollama’s `draft_num_predict`) and **streaming fidelity**.
4. **Security & Compliance Are Non-Negotiable**: LiteLLM’s `FIPS_MODE`, cosign-signed images, and Ollama’s `/invocations` security fix reflect growing demand for audit-ready inference stacks.
5. **Fine-Tuning UX Is Maturing**: Unsloth’s fused LoRA kernels and CPU fallbacks indicate a shift toward **democratized, accessible training**—not just inference.

#### 📌 **What Application Developers Should Watch**:
- **Adopt vLLM’s CUDA checkpoint/restore** (RFC #34303) for near-zero cold starts in dynamic agent systems.
- **Use LiteLLM’s `LITELLM_RUST=1`** in staging to future-proof against routing bottlenecks.
- **Validate structured outputs early**—critical regressions in tool calling exist across vLLM, Ollama, and llama.cpp.
- **Monitor CI reliability**—SGLang’s flaky tests and llama.cpp’s Vulkan/SYCL crashes suggest caution with `dev` builds.
- **Plan for multi-backend resilience**—no single engine supports all hardware. Use LiteLLM or build abstraction layers.

> 💡 **Final Insight**: The next generation of AI applications will be built not on one engine, but on a **hybrid stack**—with LiteLLM as the orchestrator, vLLM/SGLang as the high-performance backend, and llama.cpp/Ollama as the local execution layer. Choose your stack based on **latency, scale, and deployment constraints**—not just popularity.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-31**

---

### **1. Today's Highlights**  
The vLLM project is advancing toward production-grade multimodal and disaggregated inference with significant momentum in ROCm support and speculative decoding enhancements. Key developments include performance optimizations for AMD MI355X (gfx950) with Qwen3.8-Flash-Next, a major RFC on CUDA checkpoint/restore for near-zero cold starts, and progress on MooncakeConnector for P/D disaggregation across non-CUDA platforms.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were merged or announced today.

---

### **3. New Model & Hardware Support**  
- **AMD ROCm (gfx950 / MI355X)**: Active optimization work underway for `amd/Qwen3.8-Flash-Next-Quark-MXFP4` (Issue #59575), targeting improved throughput via MXFP4 MoE and QuerySparse Attention.
- **Multimodal Vision Models**: RFC #38175 proposes full CUDA Graph support for ViT encoders in models like Qwen3-VL, GLM-V, and Kimi K2.5 — critical for low-latency vision-language serving.
- **Disaggregated Inference (P/D)**: RFC #60523 enhances MooncakeConnector to support pluggable transports (RDMA/TCP/Ascend direct), enabling broader platform compatibility beyond CUDA.
- **New Quantization**: Direct weight reload support for RL training (RFC #54477) enables dynamic model updates without restarts — crucial for fine-tuning pipelines.

> 🔗 [RFC: ViT Full CUDA Graph](https://github.com/vllm-project/vllm/issues/38175)  
> 🔗 [ROCm Performance Optimization: gfx950/MI355X](https://github.com/vllm-project/vllm/issues/59575)  
> 🔗 [MooncakeConnector Improvements](https://github.com/vllm-project/vllm/issues/60523)

---

### **4. Performance & Optimization**  
- **ROCm Kernel Optimization**: PR #57134 adds FP8 KV cache support for NoPE sparse MLA on ROCm, removing a key performance bottleneck for large-context models.
- **Speculative Decoding**: PR #64674 improves streaming tool input handling by decoding only the delta incrementally — reducing per-delta latency by up to ~30% in high-throughput scenarios.
- **JIT Warmup Reduction**: PR #64336 enables direct weight reload into live models, eliminating redundant layer re-materialization and cutting warm-up overhead during RL training cycles.
- **Startup Time**: PR #63502 introduces streaming benchmark output and timeouts for `vllm bench startup`, improving observability and debuggability of initialization phases.

> 🔗 [FP8 KV Cache for Sparse MLA on ROCm](https://github.com/vllm-project/vllm/pull/57134)  
> 🔗 [Streamed Tool Input Optimization](https://github.com/vllm-project/vllm/pull/64674)

---

### **5. Stability & Regressions**  
- **Critical Crash**: Issue #63170 reports a **pipeline parallelism bug in GLM-5.x (DSA)** where reused layers at stage boundaries read stale top-k indices, leading to incorrect outputs. This affects multi-GPU deployments; fix pending.
- **Security Risk**: Issue #64391 flags that `/invocations` endpoint is enabled by default in the OpenAI-compatible server, bypassing API key auth — a potential exposure vector for unauthenticated access.
- **Kernel Crash**: Issue #48043 reports an illegal memory access (`hipErrorLaunchFailure`) in `triton_kernel_paged_attention_2d` under long-context decode on MI350X — reproducible with extended sequences.
- **Tool Calling Bugs**: Multiple issues (#58147, #55152) highlight parser errors in Qwen3 and structured output paths, including incorrect tool call generation and KeyError due to missing `triggers`.

> 🔗 [GLM-5.x PP Layer Reuse Bug](https://github.com/vllm-project/vllm/issues/63170)  
> 🔗 [Security: Unprotected /invocations Endpoint](https://github.com/vllm-project/vllm/issues/64391)  
> 🔗 [ROCm Memory Access Crash](https://github.com/vllm-project/vllm/issues/48043)

---

### **6. What This Means for Application Developers**  
- **For Multi-Model Serving**: Watch RFC #34303 (CUDA Checkpoint/Restore) — it promises near-zero cold starts, making dynamic model swapping viable in real-time systems.
- **For Low-Latency Agents**: Use MooncakeConnector (via #60523) and consider enabling speculative decoding with Gumiho or Domino (tracked in #46707) for faster response times.
- **For Production Deployments**: Avoid using `/invocations` unless strictly needed — disable it via config until #64391 is patched. Also, validate your tool calling logic against recent regressions.
- **For High-Throughput Systems**: Leverage the latest PRs around incremental streaming (#64674) and JIT warmup reduction (#64336) to reduce tail latency and improve resource utilization.

> ✅ **Action Items**:  
> - Audit security settings if using SageMaker-compatible APIs.  
> - Monitor CI status for ROCm disaggregated inference (Issue #48117).  
> - Test structured output/tool calling workflows with v0.28.1rc1+ builds.

---  
*Data source: github.com/vllm-project/vllm | Updated: 2026-10-31*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-10-31

---

### **1. Today's Highlights**

The SGLang project continues to advance its multi-backend support with critical progress on AMD ROCm and T-Head PPU integration, while addressing high-severity stability issues affecting Blackwell (B200) and SM120 hardware. Key performance optimizations for Qwen3.8-Flash-Next and Kimi-K3 on ROCm are underway, and a major refactor to unify the `api.v1` generation backend is gaining momentum across core components.

---

### **2. Releases & Breaking Changes**

*None reported in the last 24 hours.*

---

### **3. New Model & Hardware Support**

- **T-Head SAIL (Zhenwu 810/810E/M890P)**: High-priority roadmap feature (#37519) now actively tracked; upstreaming first-class support into SGLang is in progress.
- **AMD RDNA3/RDNA4 (gfx1100/gfx1201)**: CI and upstreaming plan formally documented in #46900; ongoing validation for gfx1250 (MI45x) via AITER pinning (#47562).
- **Ascend NPU (A2/A3 Series)**: Documentation updated to reflect new product naming (#47380), and deployment cookbook added for Qwen3 (#47386).

---

### **4. Performance & Optimization**

- **Qwen3.8-Flash-Next on gfx950 / MI355X**: Dedicated optimization tracker (#44304) launched; focuses on GatedDeltaNet, QuerySparse Attention, MXFP4 MoE, and native NEXTN MTP.
- **Kimi-K3 on ROCm**: Multiple kernel fusions introduced:
  - Fuse `qknorm_rope` on ROCm via JIT (#47052)
  - Route MoE softmax through `aiter topk_gating` for better performance (#40708)
  - Enable FlashInfer AllReduce Fusion auto-enable (#47306)
- **SM100 Sampling**: Cake softmax enabled on SM100 via FlashInfer 0.7.1 support (#44168).
- **DeepSeek-V4.1 Cold Start**: `SGLANG_JIT_DEEPGEMM_FAST_WARMUP` reduces cold start from ~30min to <3min with no runtime degradation observed at 16384 context size (#47397).

---

### **5. Stability & Regressions**

**Critical Issues (High Severity):**
- **Blackwell (B200) XID 13 Crashes**: Repeated "CTA Not Present" errors in HiCache kvcacheio transfer kernels under agentic load — 7 crashes across 4 machines (#46203). *No fix PR yet.*
- **SM120 GLM-5.3-Flash FA4 Backend Crash**: Hybrid extend reshape causes fa4 attention backend to crash; only triton works reliably (#42012). *No fix PR yet.*
- **CI Flakiness**: Persistent flaky tests and infrastructure failures in PR Test Base/Extra workflows, requiring manual babysitting (#42752). *Ongoing tracking.*

**Other Notable Bugs:**
- **AMD MI308X GLM-5.3-Flash Load Failure**: `ValueError: The checkpoint you are trying to load has model type 'glm5_next' but Transformers does not recognize this architecture` (#37183).
- **KV Pool Memory Exhaustion**: DSV4.1 Flash + DSPARK hits OOM every 15–25 min despite only 29% KV pool usage due to CUDA caching allocator leak (#43486).
- **Rust Server Misrouting**: Control requests relayed to wrong DP rank without validation (#47511); loopback addresses advertised incorrectly (#47509).

---

### **6. What This Means for Application Developers**

- **Expect instability on Blackwell (B200) and RTX PRO 6000 (SM120)**: Avoid `fa4` attention backend for GLM-5.3-Flash; use `triton` instead. Monitor #46203 and #42012 for updates.
- **Leverage new performance gains** on AMD and Ascend NPU: Use `--enable-linear-lossless-verify` for speculative decoding correctness (#42388), and adopt the new Qwen3 cookbook for NPU deployment (#47386).
- **Prepare for API unification**: The `api.v1` migration (#45816) will standardize generation interfaces across `sgl-processor`, `sgl-router`, and `rust-server`. Code relying on legacy endpoints should be updated early.
- **Monitor CI reliability**: Frequent test flakiness may delay PR merges; consider using pinned builds or local testing until #42752 is resolved.

> 🔗 [GitHub Issue #42752](https://github.com/sgl-project/sglang/issues/42752) | [PR #47397](https://github.com/sgl-project/sglang/pull/47397) | [Issue #46203](https://github.com/sgl-project/sglang/issues/46203)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-31**

---

### **1. Today's Highlights**  
The latest development cycle focuses on backend stability, low-level kernel optimizations, and expanding support for emerging quantization formats—particularly **Q2_0 on OpenCL** and **IQ3_S/IQ3_XXS**. Critical fixes address memory safety in `ggml` contexts (`-sm tensor`) and ensure correct handling of token embeddings in Gemma models. The ecosystem continues to mature with enhanced MoE caching and speculative decoding readiness.

---

### **2. Releases & Breaking Changes**  
No new release versions were published in the last 24 hours. However, several **breaking changes are pending merge**:
- **`fs_path_to_utf8()` removal** (#31424, #31423): Eliminated redundant UTF-8 path conversion logic across `common` and `rpc`, simplifying cross-platform I/O. [PR #31424](https://github.com/ggml-org/llama.cpp/pull/31424), [PR #31423](https://github.com/ggml-org/llama.cpp/pull/31423)
- **`common_get_path_from_env()` deletion** (#31444): Removed obsolete environment variable path resolver; apps must now manage paths directly. [PR #31444](https://github.com/ggml-org/llama.cpp/pull/31444)

> ⚠️ **Migration Note**: Applications relying on `fs_path_to_utf8()` or `common_get_path_from_env()` should update their path-handling logic before next major release.

---

### **3. New Model & Hardware Support**  
- ✅ **Gemma 4 (E2B/E4B)**: Graph optimizations reduce unnecessary computation in KV-shared layers, enabling massive prefill gains. [PR #31356](https://github.com/ggml-org/llama.cpp/pull/31356)
- ✅ **Clover-35B-A3B-Preview**: Added full GGUF support including hybrid attention and loading. [PR #31306](https://github.com/ggml-org/llama.cpp/pull/31306)
- ✅ **DeepSeek-V4.1-Flash-1017**: Ongoing investigation into GGUF compatibility issues. [Issue #31385](https://github.com/ggml-org/llama.cpp/issues/31385)
- ✅ **OpenCL Q2_0 Support**: Initial AOS/SOA MV and tiled MM kernels added for Adreno GPUs. [PR #31340](https://github.com/ggml-org/llama.cpp/pull/31340)
- ✅ **IQ3 Quantization (IQ3_S/IQ3_XXS)**: First implementation landed via OpenCL. [PR #31338](https://github.com/ggml-org/llama.cpp/pull/31338)
- ✅ **LFM3 Audio & Omni Models**: Quantization guards relaxed for LFM3-Audio-2B and LFM3-Omni-2B. [PR #31386](https://github.com/ggml-org/llama.cpp/pull/31386)

---

### **4. Performance & Optimization**  
- 🔥 **MoE Caching Upgrade**: `ClassLRU` hybrid cache replaces SLRU with usage-based ranking, delivering **+6% decode speed on QFN**, **+7% on GLM**, and **8% fewer GPU uploads**. [PR #31233](https://github.com/ggml-org/llama.cpp/pull/31233)
- 📈 **Gemma 4 E2B/E4B Prefill Speedup**: Optimized graph pruning eliminates unused prompt processing in KV-shared layers—critical for long context generation. [PR #31356](https://github.com/ggml-org/llama.cpp/pull/31356)
- 💡 **Hexagon Kernel Improvements**: 
  - DMA transfer support for strides > 24 bits ([PR #31442](https://github.com/ggml-org/llama.cpp/pull/31442))
  - Tiled HVX permute using batched vgather transposes ([PR #31446](https://github.com/ggml-org/llama.cpp/pull/31446))
  - Faster CPY/CONT conversions via optimized DMA → VTCM path ([PR #30067](https://github.com/ggml-org/llama.cpp/pull/30067))
- ⚙️ **Batched Tensor Copy API**: Generic `ggml_batched_copy` introduced for efficient context IO. [PR #30881](https://github.com/ggml-org/llama.cpp/pull/30881)
- 🔬 **SYCL/XMX-ESIMD Regression**: ~35% slowdown in MoE prompt processing on Arc Pro B70 due to recent XMX path changes. [Issue #31068](https://github.com/ggml-org/llama.cpp/issues/31068)

---

### **5. Stability & Regressions**  
High-severity stability issues persist across multiple backends:

| Severity | Issue | Impact | Status |
|--------|------|--------|--------|
| 🔴 **Critical** | `ggml-backend-meta.cpp:541: GGML_ASSERT(src_ss[0].axis != GGML_BACKEND_SPLIT_AXIS_0)` | CUDA crash on multi-GPU systems | [Issue #24015](https://github.com/ggml-org/llama.cpp/issues/24015) |
| 🔴 **Critical** | `Unexpected empty grammar stack after accepting piece: 6 (30)` | JSON schema/object response_format failure on LFM3 | [Issue #31328](https://github.com/ggml-org/llama.cpp/issues/31328) |
| 🔴 **Critical** | `-sm tensor`: Out-of-memory abort during first decode | CPU-only runs fail under memory pressure | [Issue #31447](https://github.com/ggml-org/llama.cpp/issues/31447) |
| 🟡 **Serious** | Vulkan: Garbage output on Intel Arc 140V (Windows) | Batch-dependent corruption | [Issue #28648](https://github.com/ggml-org/llama.cpp/issues/28648) |
| 🟡 **Serious** | SYCL: Segmentation fault on oneAPI 2026.2.0 | Runtime crashes on Linux | [Issue #31064](https://github.com/ggml-org/llama.cpp/issues/31064) |
| 🟡 **Serious** | Metal: Per-file mmap spans CPU-resident tensors → OOM | GPU working set inflated by lazy-loaded tables | [Issue #29465](https://github.com/ggml-org/llama.cpp/issues/29465) |

> ⚠️ **Fix PRs in progress**: Several high-priority fixes are being reviewed (e.g., [PR #31447](https://github.com/ggml-org/llama.cpp/pull/31447) for `-sm tensor`).

---

### **6. What This Means for Application Developers**  
- **Use `ClassLRU` cache** if building MoE inference pipelines—expect measurable decode gains and reduced bandwidth.
- **Avoid `-sm tensor`** until fix is merged; it causes hard crashes in CPU-only workloads.
- **Enable `topk_mask`** via OpenCL build for better control in speculative decoding workflows.
- **Expect regressions in SYCL and Vulkan** on Intel/AMD platforms—avoid production use of `dev` builds until stable.
- **Prepare for Q2_0 and IQ3 support** in deployment pipelines—these are now viable for mobile and edge devices.
- **Monitor `response_format` behavior** on LFM3 models—current version fails with structured outputs.

> ✅ **Best Practice**: Always test with `--verbose` and `--log-level debug` when deploying on new hardware or quantizations.

---  
*Data source: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*  
*Generated: 2026-10-31*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-31**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with critical fixes for MLX-based inference stability and improved handling of complex multimodal and structured outputs. Key PRs address memory scheduling issues on Apple Silicon (M5 Max), ensure all `thinking` blocks are preserved in Anthropic-compatible responses, and resolve persistent bugs in model loading and blob management. These updates reflect growing maturity in supporting high-throughput, low-latency local AI workloads across diverse hardware.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, ongoing changes include:
- **PR #19419**: Fixes MLX model memory pre-flight allocation (addresses #19417), ensuring accurate VRAM booking during load scheduling.
- **PR #19416**: Ensures all `thinking` blocks in assistant messages are preserved when forwarding to Ollama chat endpoints (fixes #19415).
- **PR #19408**: Increases maximum prompt length for MLX decision models while maintaining safety limits via 413 rejection.
- **PR #19404**: Corrects CRLF handling in Modelfiles to prevent `\r` characters from leaking into system prompts (affects Windows users).

> 🔗 [PR #19419](https://github.com/ollama/ollama/pull/19419) | [PR #19416](https://github.com/ollama/ollama/pull/19416) | [PR #19408](https://github.com/ollama/ollama/pull/19408) | [PR #19404](https://github.com/ollama/ollama/pull/19404)

---

### **3. New Model & Hardware Support**  
- **MLX Backend Enhancements**:  
  - Added support for `AutoTrust` vision and text models via `./ollama pull dhiltgen/autotrust-jev` (PR #19399).  
  - Improved handling of long schema inputs and stateful reasoning in MLX runners (PR #19408).  
  - Added draft decoding control (`draft_num_predict=0`) for benchmarking speculative decoding speedups (PR #19391).  
- **Intel Mac Support**:  
  - Best-effort build and runtime support added for Intel Macs on macOS 12 (Monterey) (PR #19413), expanding compatibility beyond Apple Silicon-only environments.

> 🔗 [PR #19399](https://github.com/ollama/ollama/pull/19399) | [PR #19413](https://github.com/ollama/ollama/pull/19413)

---

### **4. Performance & Optimization**  
- **Memory Scheduling Accuracy**:  
  - PR #19327 improves KV cache estimation per layer by using actual `head_count_kv`, reducing over-allocation errors and improving scheduler efficiency—especially for heterogeneous models.  
  - PR #19419 ensures MLX models correctly undergo memory pre-flight checks, preventing crashes due to under-reserved VRAM (critical on M5 Max systems with 128GB RAM).  
- **Throughput Improvements**:  
  - PR #19410 increases OpenAI-compatible output token limit from 32k to 128k for Claude Code, enabling longer generation sessions without premature disconnection.  
- **Latency & Efficiency**:  
  - PR #19398 introduces token repetition detection in `mlxrunner`, aborting generation after 101 repeated tokens—preventing infinite loops and improving reliability.

> 🔗 [PR #19327](https://github.com/ollama/ollama/pull/19327) | [PR #19419](https://github.com/ollama/ollama/pull/19419) | [PR #19410](https://github.com/ollama/ollama/pull/19410) | [PR #19398](https://github.com/ollama/ollama/pull/19398)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR | Impact |
|---------|------|--------|--------|--------|
| 🚨 High | Cloud `/v1/chat/completions` returns no HTTP response; requests hang 5 min then return 429 (concurrent slot exhaustion) | Open (#19111) | ❌ No fix yet | Breaks production workloads on Pro plan |
| 🚨 High | `qwen3.5:4b` returns only `thinking` content, no tool calls or response — despite `done:true` and valid `eval_count` | Open (#18916) | ❌ No fix yet | Renders model unusable for agent workflows |
| ⚠️ Medium | `ollama ls` takes 5 seconds in interactive terminal due to `pselect6` timeout on stdout | Open (#15597) | ❌ No fix yet | Poor UX for CLI users |
| ⚠️ Medium | `POST /api/blobs/:digest` retains rejected uploads on disk with mismatched digest | Open (#19414) | ❌ No fix yet | Risk of orphaned data and disk bloat |
| ⚠️ Low | Multiple `thinking` blocks in Anthropic `/v1/messages` are dropped (only last one kept) | Open (#19415) | ✅ Fixed in PR #19416 | Clients relying on multi-step reasoning affected |

> 🔗 [Issue #19111](https://github.com/ollama/ollama/issues/19111) | [Issue #18916](https://github.com/ollama/ollama/issues/18916) | [Issue #15597](https://github.com/ollama/ollama/issues/15597) | [Issue #19414](https://github.com/ollama/ollama/issues/19414) | [PR #19416](https://github.com/ollama/ollama/pull/19416)

---

### **6. What This Means for Application Developers**  
- **For Agent Builders**: The fix for preserving multiple `thinking` blocks (#19415 → #19416) is essential—ensure your agents use updated Ollama versions to avoid silent loss of intermediate reasoning steps.  
- **For Local Deployment Teams**: MLX performance improvements (e.g., memory pre-flight, draft decoding control) enable more predictable scaling on Apple Silicon; test with large-context models like `qwen3.8:27b` on M5 Max systems.  
- **For Integrators**: Be cautious with `Modelfile` line endings—CRLF can inject `\r` into prompts (see #19404); standardize to LF in CI/CD pipelines.  
- **For Cloud Users**: The unresponsive `/v1/chat/completions` bug (#19111) suggests potential infrastructure bottlenecks—monitor for rate limiting and consider fallbacks or local deployment if reliability is critical.  

> ✅ **Action Item**: Update to Ollama v0.40.13+ and verify behavior with `qwen3.5:4b`, `gemma4`, and `deepseek-v4.1-flash:1017-cloud` in your workflow.

---  
*Digest generated: 2026-10-31 | Source: [github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-31**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues its strategic shift toward robust, auditable inference infrastructure with major progress on the **Rust-based router core**, now in active development and slated for production use via `LITELLM_RUST`. Critical fixes to **cost accounting**, **streaming reliability**, and **metadata propagation** ensure more accurate telemetry and billing—especially under high concurrency and cache-heavy workloads. Notably, a fix for *spend window corruption during key updates* (PR #47676) addresses a high-severity risk in budget enforcement.

---

### **2. Releases & Breaking Changes**  
- **v1.109.0-dev.2** released with enhanced security: all Docker images are now signed using [cosign](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065).  
- **`LITELLM_FIPS_MODE=true`** introduced as a new startup gate (PR #48600), enforcing FIPS-compliant crypto at runtime—critical for regulated environments.  
- **Router migration** progresses: `PythonCore` extracted behind `RouterCore` (PR #49119), and the **Rust router core** is now being served through `LITELLM_RUST` (PR #49120), enabling future performance gains and reduced memory overhead.

---

### **3. New Model & Hardware Support**  
- **Hostinger Router** added as an OpenAI-compatible provider (PR #44863), supporting chat, responses, messages, and embeddings.  
- **Meta Model API** now accessible via UI dashboard (Issue #36164), though not yet documented in public providers list.  
- **Nano-Gpt** support remains available via docs but missing from UI (Issue #34499)—feature request pending.

---

### **4. Performance & Optimization**  
- **Rust router core integration** (PR #49120) promises significant improvements in routing throughput and latency, especially under multi-deployment load balancing. Expected to reduce CPU contention and improve scalability in large-scale agent systems.  
- **Durable usage capture** (PR #49190, #49133) introduces bounded transactional persistence, ensuring usage logs survive transient DB outages without data loss—key for audit-compliant environments.  
- **Streaming consistency** improved: stream events now preserve reasoning item IDs across chunks (PR #49338), preventing client-side deduplication issues.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| High | `/key/update` during in-flight request drops cost from budget window (Issue #49179) | Open | Pending |
| High | Streaming drops upstream `usage` when final chunk has non-empty `choices` → incorrect billing (Issue #36168) | Open | Pending |
| High | OpenRouter streaming cost lost due to missing `usage.cost` (Issue #16021) | Closed | Fixed |
| Medium | `websearch_interception` fails for Claude Code + Bedrock (Issue #26252) | Closed | Partially fixed via PR #25242 |
| Medium | Perplexity search params dropped (e.g., `date`, `language`) (Issue #45536) | Closed | Fix merged but not in main |
| Low | API keys table truncated (only shows 49 of 99 keys) (Issue #49213) | Closed | UI pagination fix applied |

> ✅ **Critical Fixes Merged**:  
> - `drop_params` now strips invalid tool/`reasoning` fields before sending (PR #49108)  
> - `metadata.user_id` preserved in Anthropic pass-through routes (PR #49333)  
> - Cold spend counter now lifted to cached spend (PR #47676) — prevents budget lockouts

---

### **6. What This Means for Application Developers**  
- **Use `LITELLM_RUST=1` in staging** to test the next-generation router—expect better performance and lower memory footprint in multi-model deployments.  
- **Enable `LITELLM_FIPS_MODE`** if operating in compliance-sensitive environments (e.g., healthcare, finance).  
- **Update `drop_params` logic** to avoid silent 400s from malformed inputs (PR #49108).  
- **Avoid `/key/update` during long-running requests** until #49179 is resolved—your budget window may not reflect actual spend.  
- **Monitor streaming behavior closely**: ensure clients handle early-closed streams correctly (PR #47665 now raises errors instead of faking completion).  

> 🔗 **Key Links**:  
> - [PR #49120: Rust Router Core](https://github.com/BerriAI/litellm/pull/49120)  
> - [Issue #49179: Budget Window Corruption](https://github.com/BerriAI/litellm/issues/49179)  
> - [PR #47676: Cold Spend Counter Fix](https://github.com/BerriAI/litellm/pull/47676)  
> - [Cosign Image Signing Guide](https://docs.sigstore.dev/cosign/overview/)  

---  
*Digest generated: 2026-10-31 | Source: github.com/BerriAI/litellm*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-10-31**

---

### **1. Today's Highlights**  
Unsloth v0.1.913-beta delivers significant UX and performance improvements, including faster Linux app startup, reduced update times, and enhanced support for Qwen-Image generation under VRAM constraints. The release also introduces DeepSeek-V4.1-Flash-1017 in GGUF format via Dynamic v3.1, expanding the model zoo for low-resource inference. On the dev front, multiple PRs focus on real-time system monitoring, CPU training fallbacks, and improved LoRA fusion efficiency—key enablers for scalable fine-tuning workflows.

---

### **2. Releases & Breaking Changes**  
- **v0.1.913-beta**: Released with UI/UX refinements (custom backgrounds), faster Linux app boot, optimized Qwen-Image gen under limited VRAM, and reduced app update times.  
  🔗 [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.913-beta)  
- **No breaking API changes reported** in this cycle. All updates are backward-compatible within the same major version line.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash-1017 (GGUF)**: Added to Unsloth’s Dynamic v3.1 model registry, enabling efficient inference on consumer hardware.  
  🔗 [Model Docs](https://unsloth.ai/docs/models/deepseek-v4.1-flash)  
- ✅ **Intel XPU Triton Integration**: Windows installer now includes verification and skip-pip-backup logic for Intel XPU Triton backend.  
  🔗 PR #16250  
- ✅ **AMD ROCm + Vulkan Support**: Continued validation of AMD RX 6800 with Vulkan backend, though some issues persist (e.g., memory commit exhaustion).  
  🔗 Issue #16015  

---

### **4. Performance & Optimization**  
- 🚀 **Fused LoRA Kernel Optimization** (PR #16071):  
  - Now computes rank-r term *inside* the base GEMM, preventing small updates from being rounded away due to double quantization.  
  - Critical for early-stage training stability and convergence in low-rank adapters.  
  🔗 [PR #16071](https://github.com/unslothai/unsloth/pull/16071)  
- ⚙️ **LoRA Tensor Subclass Preservation** (PR #16249):  
  - Maintains tensor type in eager accumulators, improving numerical fidelity during fused LoRA operations.  
- 📈 **Gemma 3 Non-Flex Attention Path**:  
  - Switching to non-flex path for one-token decode improves latency vs. `flex_attention` fallback.  
  🔗 [PR #16041](https://github.com/unslothai/unsloth/pull/16041)  
- 💡 **CPU Training Fallback** (PR #16175):  
  - Enables training on CPU-only systems when no GPU is detected—previously greyed out.  
  🔗 [PR #16175](https://github.com/unslothai/unsloth/pull/16175)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Impact | Fix PR |
|--------|------|--------|--------|-------|
| 🔴 **Critical Incident** | `UNSLOTH_STUDIO_HOME` install silently overwrites baseline venv (cross-contamination) | Open | Breaks isolated environments | PR #16186 / #16185 |
| 🔴 **Critical Incident** | Image generation returns 404 after cached gated model load | Open | Blocks image output | PR #16178 |
| 🟡 **High** | AppImage UI lag on Linux | Open | Poor UX on Linux | PR #15999 |
| 🟡 **High** | Spell check disabled on Linux desktop | Open | Missing core feature | PR #16184 |
| 🟡 **High** | MLX memory estimator reports 69.7 GiB on 24GB Mac | Closed | Misleading resource planning | Issue #15935 |
| 🟡 **High** | LFM3-Omni video input fails on AMD + Vulkan | Open | Prevents multimodal use cases | Issue #16065 |
| 🟡 **Medium** | Context not compacting after long conversations | Closed | Conversation continuity loss | Issue #15800 |

> ⚠️ **Note**: Multiple regressions in UI consistency, model loading, and resource tracking highlight ongoing challenges with cross-platform parity and state management.

---

### **6. What This Means for Application Developers**  
- **Build resilient agents with better visibility**: Use the new live monitor (PR #15630) to track per-GPU VRAM, CPU, and RAM usage in real time—critical for managing multi-model deployments.
- **Enable offline-first deployment**: With growing demand for offline installers (Issue #5835), consider packaging your apps using `UNSLOTH_STUDIO_HOME` isolation patterns to avoid dependency conflicts.
- **Leverage fused LoRA kernels**: For fine-tuning low-rank models (especially MoE), rely on PR #16071’s improved precision—essential for stable training at scale.
- **Support CPU-only workflows**: Use PR #16175 to enable training fallbacks on machines without GPUs, broadening accessibility for edge or cloudless environments.
- **Watch for CSP restrictions**: Video attachment handling in built apps fails due to Content Security Policy (Issue #16248); work around by serving files via local HTTP servers in production builds.

> ✅ **Pro Tip**: Monitor PR #15630 and #15609 for upcoming unified UI components—your custom Flows and agent interfaces will soon integrate seamlessly with Studio’s theming and component library.

---  
*Digest compiled from GitHub activity (2026-10-30–31). Follow @unslothai for real-time updates.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*