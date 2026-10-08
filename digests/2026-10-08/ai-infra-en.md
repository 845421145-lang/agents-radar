# AI Infrastructure Digest 2026-10-08

> Generated: 2026-10-08 02:13 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-08**

---

### **1. Ecosystem Overview**  
The AI infrastructure landscape in Q4 2026 is defined by a convergence of high-performance inference engines, agent-ready model serving platforms, and increasingly sophisticated fine-tuning tools. Projects are rapidly maturing beyond basic LLM serving—emphasizing speculative decoding, multi-GPU scaling, MoE optimization, and cross-platform portability. Critical stability issues persist, particularly around new hardware (SM120/Blackwell, RDNA4) and advanced features like unified memory and hybrid-SWA scheduling, indicating that production-grade deployment remains challenging despite rapid innovation.

---

### **2. Activity Comparison**  

| Project        | Open Issues | Open PRs | Recent Releases | Status Notes |
|----------------|-------------|----------|------------------|--------------|
| **vLLM**       | 62          | 97       | None             | High-severity regressions; v0.30+/0.31 unstable |
| **SGLang**     | 58          | 112      | None             | CI flakiness; critical runtime crashes |
| **llama.cpp**  | 56          | 88       | b11481 (breaking) | Breaking change in MoE caching; GPU kernel issues |
| **Ollama**     | 49          | 71       | v0.40.1          | Apple Silicon instability; MLX backend regressions |
| **LiteLLM**    | 45          | 83       | v1.106.0-dev.1   | Dev/RC releases; Rust migration in beta |
| **Unsloth**    | 42          | 68       | v0.1.904-beta    | Beta release with decision model training |

> ✅ *Insight*: SGLang leads in contributor activity (PR count), while vLLM and llama.cpp dominate in open issue volume—reflecting deep engineering complexity and stability pressure.

---

### **3. Model Support Race**  

| New Model / Architecture       | Supported By                | Key Advancement |
|-------------------------------|-----------------------------|-----------------|
| **Cohere2 Vision (mtmd)**     | **llama.cpp**               | First native GGUF support for multimodal vision + text |
| **LiquidAI/d1-omni-600M**    | **llama.cpp**               | Multimodal (text/audio/image) decision model |
| **Qwen3.8-Flash-Next**       | **vLLM**, **llama.cpp**, **SGLang** | FP8, DFlash2/DSpark, MoE cache optimizations |
| **Kimi-K3 DCP (HiCache)**     | **SGLang**, **vLLM**        | Advanced decode context parallelism |
| **DeepSeek-V4.1 Flash**       | **SGLang**                  | Full `sglang-processor` and `/generate` routing |
| **Microsoft 365 Copilot**     | **LiteLLM**                 | Per-user OAuth + Graph API integration |
| **GitHub Copilot (per-user)** | **LiteLLM**                 | Privacy-preserving token exchange |
| **Decision Models (Jev-style)** | **Unsloth (v0.1.904-beta)** | End-to-end training, export, and serving workflow |

> 🏆 **Leader**: **Unsloth** is ahead in *application-layer innovation* with its decision model training pipeline. **llama.cpp** leads in *multimodal model support*, especially vision and audio. **LiteLLM** dominates in *enterprise gateway integrations*.

---

### **4. Performance Frontier**  

| Optimization Focus           | Leading Projects                          | Key Advances |
|-------------------------------|-------------------------------------------|------------|
| **KV Cache & Memory Management** | vLLM, llama.cpp, SGLang                   | DFlash/DSpark tuning, unified memory pool reduction, MoE expert offloading |
| **Batching & Throughput**      | vLLM (MTP drafters), SGLang (hybrid-SWA)  | +25–29% decode speedup via shared `lm_head`, MTP drafters |
| **Quantization Efficiency**    | vLLM (FP8), llama.cpp (Q6_K, MXFP4), Ollama (mixed precision) | FP8 on QSA path, Q6_K dequant speedup (~2.5x), mixed 4b+8b override |
| **Distributed Serving**        | SGLang, LiteLLM, vLLM                     | Hybrid-SWA, TP>1, MoE EP>1 scalability; proxy routing improvements |
| **Kernel-Level Optimization**  | vLLM (ROCm), llama.cpp (CUDA/ROCm/Metal) | MFMA path (CDNA2), GDN state columns per warp, Metal few-row MMA |

> 🔥 **Trend**: The frontier is shifting from raw throughput to *predictable, scalable, and secure* performance across diverse hardware (AMD, Apple Silicon, NPU).

---

### **5. Layer Positioning**  

| Project       | Primary Layer              | Role Summary |
|---------------|------------------------------|--------------|
| **vLLM**      | **Inference Engine**         | High-throughput, low-latency serving; kernel-optimized, SM120-focused |
| **SGLang**    | **Model Serving Framework**  | Agent-centric, speculative decoding, multi-GPU orchestration |
| **llama.cpp** | **Local Runtime / CLI Tool** | Cross-platform, lightweight, GPU-accelerated local inference |
| **Ollama**    | **Developer Gateway / CLI**  | User-friendly local server with model management and cloud sync |
| **LiteLLM**   | **Universal LLM Gateway**    | Multi-provider routing, enterprise security, per-user auth, real-time streaming |
| **Unsloth**   | **Fine-Tuning & Training Platform** | Decision model training, ComfyUI integration, embedding acceleration |

> 📊 **Layer Insight**: A clear bifurcation exists: **engine-level** (vLLM, llama.cpp) vs. **application-layer** (SGLang, LiteLLM, Unsloth). Ollama sits at the intersection of usability and accessibility.

---

### **6. Trend Signals**  

#### 🔍 **Key Industry Trends Extracted**:
1. **Agent-Centric Infrastructure is Maturing**:  
   - Speculative decoding, tool calling, and streaming reliability are now core focus areas (vLLM, SGLang, LiteLLM).
   - Unsloth’s decision model training signals a shift toward *in-context reasoning agents* as first-class components.

2. **Hardware Specialization is Accelerating**:  
   - SM120 (Blackwell), RDNA4 (gfx1201), M5 Pro, and NPU-specific kernels are being tuned—projects must now account for vendor-specific behavior.

3. **Security & Compliance Are Non-Negotiable**:  
   - LiteLLM’s per-user OAuth, cosign-signed images, and virtual key fixes show growing demand for zero-trust gateways.
   - Unsloth’s `MXC` sandboxing and pickle safety reflect increasing awareness of execution risks.

4. **Rust Migration Signals Next-Gen Performance**:  
   - LiteLLM’s sub-1ms overhead goal indicates a push toward ultra-low-latency inference routing—critical for real-time agents.

5. **Multimodal & Decision Models Are Mainstream**:  
   - Cohere2 Vision, LiquidAI/d1-omni, and Jev-style decision models are no longer experimental—they’re being shipped with full training and serving workflows.

#### ✅ **What Developers Should Watch**:
- **Avoid v0.30+/0.31 in vLLM** until #60174 is fixed—silent corruption risk.
- **Pin Ollama to v0.35.1** if using `qwen3.6:35b-mlx` or `clef-flash`.
- **Monitor MLX kernel limits** on M5 Pro—expect instability until #18846 is resolved.
- **Prepare for Rust migration** in LiteLLM—early access available.
- **Leverage Unsloth’s decision model training** for autonomous planning pipelines.

---

> **Final Takeaway**: The AI infrastructure stack is evolving from “just serve models” to “enable intelligent, secure, and composable agent systems.” The winners will be those who balance performance, stability, and developer experience across diverse hardware and use cases.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **1. Today's Highlights**  
vLLM continues to stabilize around the 0.31 release cycle, with critical bug fixes for speculative decoding and KV cache corruption on DFlash2/DSpark + Qwen3.8-27B FP4 models. A key fix restores ShortConv drafter state in MRV2, improving speculative decoding reliability. On ROCm, performance optimizations for DeepSeek-V4 and Kimi-K3 are advancing, while new work surfaces on FP8 memory management and CPU cgroup awareness.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes were issued. Users should remain cautious about regressions introduced in v0.30.0/v0.31.0, particularly around prefix caching and speculative decoding on newer hardware (e.g., SM120).

---

### **3. New Model & Hardware Support**  
- **New model support**: `Gemma4ForSequenceClassification` added via #43726 — enables classification head inference beyond causal LM.
- **ROCm improvements**:  
  - Performance optimization for `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` on gfx950 / MI355X tracked in #57149.  
  - DCP (Decoding Computation Parallelism) enabled for DeepSeek-V4 on ROCm via #57773.  
- **Quantization**: FP8 support extended to QSA path in `Qwen3.8-Flash-Next` via #54426 (pending corroboration).  
- **Hardware**: Full support for NVIDIA GB10 (Spark, SM121) and RTX PRO 5000 Blackwell (sm_120) is under active tuning.

---

### **4. Performance & Optimization**  
- **Throughput gains**:  
  - MTP drafters with shared `lm_head` show **+25–29% decode speedup** via reduced vocabulary (#58578).  
  - Skip redundant MoE input copy before w13 GEMM improves efficiency (#59340).  
- **Kernel-level optimizations**:  
  - ROCm: Avoid unnecessary D2H sync in AITER sparse MLA metadata (#58710), reducing latency.  
  - FlashInfer: Autotune fixes for TRTLLM FP4 block scale MOE on SM103 (#58031) prevent infinite wedging.  
- **Memory & scheduling**:  
  - CPU backend now respects cgroup headroom on NUMA nodes (#60520), preventing over-allocation.  
  - Batch invariance support on ROCm via `VLLM_BATCH_INVARIANT=1` (#52231) enables more predictable scaling.

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status | Link |
|---------|------|--------|------------|------|
| 🔴 High | **DFlash2/DSpark + prefix caching corrupts output on Qwen3.8-27B NVFP4 (0.30/0.31)** | Silent corruption after cache hit; affects agentic workflows | Open | [Issue #60174](https://github.com/vllm-project/vllm/issues/60174) |
| 🔴 High | **Speculative decoding acceptance rate drops to 0% on GLM-5.3-Flash (SM120, nightly)** | Complete failure of speculation on latest build | Open | [Issue #59724](https://github.com/vllm-project/vllm/issues/59724) |
| 🟡 Medium | **Decode throughput drops ~3.3x from v0.26.0 to v0.29.0 on H100 (Qwen3.6-35B-FP8)** | Regression across multiple versions | Open | [Issue #57680](https://github.com/vllm-project/vllm/issues/57680) |
| 🟡 Medium | **MoE decode ~15% slower on SM12x since #56876 (DeepGEMM alignment change)** | Substantial performance loss on next-gen GPUs | Open | [Issue #58624](https://github.com/vllm-project/vllm/issues/58624) |
| 🟡 Medium | **RowWiseTorchFP8ScaledMMLinearKernel selected on RDNA4 (gfx1201), costing 5–24% decode** | Wrong kernel selection degrades performance | Open | [Issue #57838](https://github.com/vllm-project/vllm/issues/57838) |

> ✅ **Fix PRs merged today**:  
> - #60520: Respect cgroup headroom on CPU NUMA nodes  
> - #60519: Update ViT CUDA graph documentation  
> - #59962: Fix RecoverSSM aligned state indexing at Mamba block boundaries  

---

### **6. What This Means for Application Developers**  
- **Avoid v0.30.0/v0.31.0** for production workloads using **Qwen3.8-27B-FP4 with DFlash2/DSpark + prefix caching**—expect silent output corruption. Use v0.29.0 as stable fallback.  
- **Enable `--enable-moe-shared-loras` only if you’re not using 3D-weight MoE models**, as it currently crashes during LoRA warmup (#60098).  
- **Leverage MTP drafters with reduced vocab** for faster speculative decoding (measured +25–29%), especially when sharing `lm_head`.  
- **Monitor GPU-specific performance**: SM120 (Blackwell) and RDNA4 (gfx1201) may exhibit unexpected slowdowns due to incorrect kernel selection or regression.  
- **Use `VLLM_BATCH_INVARIANT=1`** on ROCm for consistent batch behavior in distributed setups.  
- **Ensure proper tool-call streaming handling**: `tool_choice='none'` silently deletes content (#55080); use explicit schema validation.

> ⚠️ **Recommendation**: Pin to v0.29.0 until regressions in 0.30+/0.31 are resolved. Monitor [issue #60174](https://github.com/vllm-project/vllm/issues/60174) and [PR #60520](https://github.com/vllm-project/vllm/pull/60520) for stability fixes.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-08

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to deepen its support for advanced speculative decoding and multi-GPU scaling, with key PRs advancing hybrid-SWA scheduling, DFlash/DSpark optimization, and cross-backend consistency. Critical CI stability issues remain unresolved, highlighted by a surge in flaky test reports (#42752), while new work on Apple Silicon serving redesign (#32321) and unified memory handling signals growing platform diversity.

---

### **2. Releases & Breaking Changes**  
*None.* No new releases or breaking API/config changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **Apple Silicon (M1/M2/M3/M4)**: Active roadmap progress on Torch-owned SRT path with exported MLX model regions ([#32321](https://github.com/sgl-project/sglang/issues/32321)), aiming for native Metal-backed inference.
- **NPU (Ascend)**: Ongoing enhancements for Kimi-K3 DCP (Decode Context Parallelism) with shared compact communication and HiCache integration ([#40825](https://github.com/sgl-project/sglang/pull/40825), [#43031](https://github.com/sgl-project/sglang/pull/43031)).
- **AMD XPU**: Device-agnostic fixes merged for XPU backend, including scripted chunked-prefill and DWDP compatibility ([#37698](https://github.com/sgl-project/sglang/pull/37698)).
- **Multi-modal Models**: Added support for Cloudflare’s **Clef** and **Clef-Flash** decision models via `/v1/systemone` ([#42721](https://github.com/sgl-project/sglang/pull/42721)).

---

### **4. Performance & Optimization**  
- **Speculative Decoding**: PRs enhancing DFlash/DSPARK performance with DP attention support ([#29506](https://github.com/sgl-project/sglang/pull/29506)) and ReplaySSM spec-verify for hybrid GDN models ([#36683](https://github.com/sgl-project/sglang/pull/36683)).
- **Kernel & Memory Efficiency**:  
  - Optimized KV location translation in unified memory pool to reduce redundant translations per iteration ([#42753](https://github.com/sgl-project/sglang/pull/42753)).  
  - Introduced FlashInfer prefill checkpoints for safe-gate KDA models on SM100/SM103 ([#41400](https://github.com/sgl-project/sglang/pull/41400)).
- **Model Serving**: DeepSeek-V4.1 Flash now fully supported through `sglang-processor` and `/generate` router path ([#43000](https://github.com/sgl-project/sglang/pull/43000), [#42999](https://github.com/sgl-project/sglang/pull/42999)).

---

### **5. Stability & Regressions**  
Critical stability concerns persist, particularly around CI reliability and runtime crashes:

| Issue | Severity | Status | Notes |
|------|----------|--------|-------|
| [#42752](https://github.com/sgl-project/sglang/issues/42752) | High | Open | Flaky tests in `PR Test Base/Extra` due to CI infrastructure instability; 41 comments, ongoing babysitting required. |
| [#33800](https://github.com/sgl-project/sglang/issues/33800) | High | Closed | DSpark draft depth 5 corrupts output on SM120; reproducible only at high depths. |
| [#33711](https://github.com/sgl-project/sglang/issues/33711) | Medium | Closed | NVFP4 W4A16 GEMM on SM120 fails silently without proper kernel tuning. |
| [#42684](https://github.com/sgl-project/sglang/issues/42684) | High | Open | NIXL backend crashes at startup with `TypeError` when `SGLANG_DISAGG_STAGING_BUFFER=1`. |
| [#42653](https://github.com/sgl-project/sglang/issues/42653) | High | Open | `--enable-unified-memory` kills scheduler with "Out of memory" error in hybrid-SWA. |

> ✅ *Note:* Several regressions are linked to specific configurations (e.g., TP>1, MoE EP>1, unified memory), suggesting environment-specific edge cases.

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding** on hybrid-SWA or large TP setups—known livelock (`#41579`) and OOM issues (`#38202`, `#42653`) may impact long-running agents.
- **Expect instability in CI**—flaky tests (`#42752`) and infrastructure failures mean nightly builds may not be reliable; validate locally before deploying.
- **Leverage new features**: Use `/generate` for tool-calling chat flows with standard JSON schema ([#42999](https://github.com/sgl-project/sglang/pull/42999)), and explore optimized DeepSeek-V4.1 support via `sglang-processor` ([#43000](https://github.com/sgl-project/sglang/pull/43000)).
- **Monitor hardware-specific bugs**: Avoid `--enable-unified-memory` on hybrid-SWA until fixed; expect potential crashes on Apple Silicon and NPU backends if using experimental paths.

👉 *Recommendation:* Pin to stable commits from recent `main` merges and avoid `experimental` flags unless testing with full reproducers.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-08**

---

### **1. Today's Highlights**  
The latest development cycle introduces critical improvements to MoE expert caching on GPU, enabling efficient offloading of MoE experts from host memory—reducing CPU pressure and improving throughput for large models like Qwen3.8-Flash-Next. Additionally, Coher2 vision model support is now available via `mtmd`, expanding multimodal inference capabilities. These updates are backed by performance optimizations across Metal, CUDA, and Hexagon backends.

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published today; the latest stable version remains `b11471`. However, **`b11481`** includes a breaking change in how MoE expert tensors are managed:  
- Introduced `llama_moe_cache_ptr` to enable GPU-resident MoE expert caching (via #29887).  
- This requires recompilation with updated backend logic and may affect existing deployments using host-only MoE caching.  
- Migration path: Update `--moe-cache-size` and ensure GPU memory is sufficient to hold cached experts.  
👉 [PR #29887](https://github.com/ggml-org/llama.cpp/pull/29887) | [GitHub Attestation b11480](https://github.com/ggml-org/llama.cpp/attestations/535)

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - ✅ **Cohere2 Vision** added via `mtmd` (multi-modal text + image input) — supports `cohere2-vision` GGUF models.  
    👉 [PR #30062](https://github.com/ggml-org/llama.cpp/pull/30062)  
  - ✅ **LiquidAI/d1-omni-600M** added as decision-making multimodal model (text, audio, image).  
    👉 [PR #30114](https://github.com/ggml-org/llama.cpp/pull/30114)  

- **Hardware & Backend Support**:  
  - ✅ **Apple Metal**: Expanded few-row MMA matmul support to BF16, Q1_0, Q2_0, MXFP4, Q2_K, Q3_K, TQ2_0, IQ types.  
    👉 [PR #30065](https://github.com/ggml-org/llama.cpp/pull/30065)  
  - ✅ **MUSA (Huawei)**: Integrated tile lightning indexer kernel for improved performance.  
    👉 [PR #30080](https://github.com/ggml-org/llama.cpp/pull/30080)  
  - ✅ **Hexagon (Qualcomm)**: Added `alloc_buffer_n` support and Q6_K dequant speedup (~2.5x gain).  
    👉 [PRs #30126, #30121, #30115, #30104](https://github.com/ggml-org/llama.cpp/pulls?q=is%3Aopen+label%3AHexagon)

---

### **4. Performance & Optimization**  
- **MoE Expert Caching**:  
  - GPU cache for MoE experts reduces host memory pressure and enables faster expert selection.  
  - Benchmarks show up to **~1.8x higher token/sec** on Qwen3.8-Flash-Next (Q4_0) with 2× RTX 4090s when using multi-GPU MoE cache.  
    👉 [PR #30112](https://github.com/ggml-org/llama.cpp/pull/30112)  

- **CUDA & ROCm**:  
  - `ggml-cuda`: Two GDN state columns per warp improve instruction-level parallelism on RTX 4090 (NCU-bound kernel).  
    👉 [PR #30087](https://github.com/ggml-org/llama.cpp/pull/30087)  
  - ROCm: Added MFMA (matrix-core) path for DeepSeek-V3.2/V4 lightning indexer → leverages CDNA2 matrix cores.  
    👉 [PR #29050](https://github.com/ggml-org/llama.cpp/pull/29050)  

- **SYCL & OpenCL**:  
  - Wide stores and 256-thread groups for Q4_K/Q5_K dequant → **~30% faster decode** on Intel Arc B70.  
    👉 [PR #29696](https://github.com/ggml-org/llama.cpp/pull/29696)  

- **General**:  
  - Improved GELU accuracy on Hexagon via HVX tanh implementation.  
  - Fixed MUL_MAT+ADD fusion edge case on Metal (residuals involving MUL_MAT).  
    👉 [PR #30100](https://github.com/ggml-org/llama.cpp/pull/30100)

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:  
- 🔴 **Crash on Qwen3.8-Flash-Next with MTP**: Eval bug when using `--spec-draft-model` and MTP — triggers assertion failure at startup.  
  👉 [Issue #29811](https://github.com/ggml-org/llama.cpp/issues/29811) *(18 comments, active)*  
- 🔴 **Vulkan device loss during long context inference**: PCIe bandwidth exhaustion causes GPU reset on RX 7900 XT + RTX 3090 setups.  
  👉 [Issue #29654](https://github.com/ggml-org/llama.cpp/issues/29654) *(5 comments, reproducible)*  
- 🔴 **Silent EOS beyond 130k context on Qwen3.5-hybrid**: Recurrent-state depth × layer-count degradation leads to premature termination.  
  👉 [Issue #27756](https://github.com/ggml-org/llama.cpp/issues/27756) *(6 comments, confirmed)*  
- 🟡 **Stochastic tool-call emission in Qwen4Exp**: Top-k selects different cells each run due to CUB DeviceTopK tie-breaking.  
  👉 [Issue #28497](https://github.com/ggml-org/llama.cpp/issues/28497) *(3 comments)*  

*Note: Several fixes are pending; no PRs linked yet.*

---

### **6. What This Means for Application Developers**  
- **For agents & LLM gateways**:  
  - Use `--moe-cache-size` and `--gpu` flags to leverage GPU-resident MoE caching — essential for scaling large models (e.g., Qwen3.8-Flash-Next) on multi-GPU systems.  
  - Enable `--spec-type draft-mtp` cautiously: avoid `--spec-draft-model` with MTP if using Qwen3.8-Flash-Next until #29811 is resolved.  
- **For multimodal apps**:  
  - Coher2 vision and LiquidAI/d1-omni-600M now support full multimodal input (image/audio/text) via `mtmd`. Test with `--vision` and `--audio` flags.  
- **For high-throughput services**:  
  - Upgrade to `b11481+` and use Metal/CUDA/ROCm/MUSA backends for best performance. Prioritize Hexagon builds for mobile inference.  
  - Monitor for silent EOS in long-context workflows — consider chunking or lower context limits until #27756 is patched.  

> 💡 **Pro Tip**: Use `llama-server --router-mode` (per #26116) to auto-download and manage models in production pipelines — ideal for agent orchestration.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-08**

---

### **1. Today's Highlights**  
The latest release, v0.40.1, addresses critical Windows-specific issues including a `clef-flash` model crash on `/v1/systemone` and a symlink-related failure in manifest handling on Windows. A major focus has been stabilizing MLX-backed inference on Apple Silicon (M5/M4), with multiple PRs targeting kernel limits, quantization compatibility, and memory management—especially for large models like `qwen3.6:35b-mlx` and `clef-flash`.  

---

### **2. Releases & Breaking Changes**  
- **v0.40.1** (released today):  
  - Fixed `clef-flash` non-finite logit error on CPU/GPU (`#18769`, `#18836`)  
  - Resolved Windows symlink manifest issue causing "untrusted mount point" errors (`#18847`, `#18852`)  
  - Removed redundant account step from CLI onboarding (`#18826`)  
  - Proxy cloud usage and balance APIs now properly routed (`#18829`)  
  > 🔗 [Release Notes](https://github.com/ollama/ollama/releases/tag/v0.40.1) | [PR #18826](https://github.com/ollama/ollama/pull/18826)

---

### **3. New Model & Hardware Support**  
- **MLX Backend Enhancements**:  
  - `qwen3.6:35b-mlx` now works correctly again after regression fix (`#18856`)  
  - Support for mixed precision quantization (4-bit + per-layer 8-bit overrides) is being actively debugged (`#18789`)  
- **Model Requests**:  
  - High demand for **MIMO v2.5** (MIT-licensed, 1M+ context window) via `#15887`  
  - Request for **Qwen 3.8 flash**, **Saina Helm**, **Hy4**, **Stepfun**, and **Laguna** on Ollama Cloud (`#18850`)  
- **Hardware**: M5 Pro (Apple Silicon) performance tuning ongoing (`#18833`)  

> 🔗 [Issue #15887](https://github.com/ollama/ollama/issues/15887) | [Issue #18850](https://github.com/ollama/ollama/issues/18850)

---

### **4. Performance & Optimization**  
- **MLX Kernel Limits**:  
  - `mlx runner panic: Maximum threads per threadgroup is 896 but requested 1024` reported on M5 Pro (`#18846`) — indicates need for kernel tuning or fallback logic  
- **Quantization Efficiency**:  
  - Quantized decision models (`clef-flash`) are slower than `bf16` at prefill on M5 Pro (`#18833`) — suggests optimization gap in MLX quantized kernels  
- **Connection Reuse**:  
  - PR `#18397` proposes reuse of `llama-server` HTTP connections for embeddings, potentially reducing latency under high load  

> 🔗 [Issue #18846](https://github.com/ollama/ollama/issues/18846) | [PR #18397](https://github.com/ollama/ollama/pull/18397)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| Critical | `#18846` | MLX runner panics with "Maximum threads" error after 1 min on M5 Pro | ❌ Open |
| Critical | `#18856` | `qwen3.6:35b-mlx` crashes on 0.40.x (worked in 0.35.0) | ❌ Open |
| High | `#18836` / `#18769` | `clef-flash` fails on `/v1/systemone` with "non-finite logit" (CPU/GPU) | ❌ Open |
| High | `#18840` | `qwen3.8:27b` returns HTTP 500 due to JSON parsing error post-llama-server completion | ❌ Open |
| Medium | `#18830` | Duplicate model entries and bogus `llamacpp:<sha>` tag after GGUF migration | ❌ Open |
| Low | `#18835` | Compilation failure on FreeBSD due to `int64 × uint64` mismatch | ✅ Fixed in `#18848` |

> 🔗 [Issue #18846](https://github.com/ollama/ollama/issues/18846) | [PR #18848](https://github.com/ollama/ollama/pull/18848)

---

### **6. What This Means for Application Developers**  
- **Avoid v0.40.0–0.40.1 on Apple Silicon** if using `qwen3.6:35b-mlx` or `clef-flash` — expect crashes or hangs; downgrade to `0.35.1` as workaround.  
- **Be cautious with `systemone` endpoint** — `clef-flash` is unstable across platforms; verify model behavior before production use.  
- **Use `--local` flag or explicit `model_name`** when deploying agents to avoid duplicate model registration (`#18830`).  
- **Monitor `/api/chat` responses** for `unexpected end of JSON input` errors (e.g., `qwen3.8:27b`) — may indicate streaming connection drops.  
- **Expect frequent updates** around MLX performance and quantization support — consider pinning versions until stability improves.  

> 🔗 [Stability Guide](https://github.com/ollama/ollama/issues?q=is%3Aissue+label%3Abug+sort%3Aupdated-desc) | [Community Integrations](https://github.com/ollama/ollama#community-integrations)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-08**

---

### **1. Today's Highlights**  
The LiteLLM project continues its rapid evolution with a focus on stability, performance, and enterprise-grade features. Key developments include the rollout of `v1.106.0-dev.1` with enhanced security via cosign-signed Docker images, ongoing progress in the Rust migration (now in beta), and critical fixes for streaming behavior, retry logic, and proxy routing—especially around real-time audio and fallback handling. The team also introduced new support for Microsoft 365 Copilot and GitHub Copilot per-user OAuth, expanding LiteLLM’s role as a universal LLM gateway.

---

### **2. Releases & Breaking Changes**  
- **New Dev/RC Releases**: `v1.106.0-dev.1`, `v1.105.0-rc.2`, `v1.104.1`, `v1.103.4`, `v1.102.3`, `v1.101.5`, and `v1.100.5` were published within the last 24 hours. All Docker images are now cryptographically signed using [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) with a consistent key.
- **Rust Migration**: The core effort to rewrite LiteLLM in Rust is progressing rapidly. A dedicated [beta sign-up form](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...) is available; early adopters can expect sub-1ms overheads and improved throughput in production workloads.
- **Proxy Enhancements**: New `/v1/decisions` provider support for Databricks AI Decide and updated `/v1/responses` API handling improve agent orchestration capabilities.

> 🔗 [GitHub Release Notes](https://github.com/BerriAI/litellm/releases)

---

### **3. New Model & Hardware Support**  
- ✅ **Microsoft 365 Copilot**: Added as a new chat provider (`microsoft_365_copilot`) with OAuth token exchange, enabling secure, user-context-aware access to Graph Copilot Chat API.
- ✅ **GitHub Copilot (Per-User OAuth)**: Support for `auth_type: "per-user-github-oauth"` allows each request to use the calling user’s own GitHub token, enhancing privacy and compliance.
- ✅ **Vertex AI Context Cache Billing**: Now accounts for explicit context cache storage costs per token-hour (new pricing key: `cache_storage_cost_per_token_per_hour`), aligning spend tracking with Google Cloud billing.

> 🔗 [PR #45158](https://github.com/BerriAI/litellm/pull/45158), [PR #45241](https://github.com/BerriAI/litellm/pull/45241), [PR #45019](https://github.com/BerriAI/litellm/pull/45019)

---

### **4. Performance & Optimization**  
- 🚀 **Rust Migration Progress**: The foundational rewrite aims for **sub-1ms overhead** in inference routing and is currently in early beta testing ([Blog Post](https://docs.litellm.ai/blog/litellm-rust-launch)).
- ⚙️ **Lens Trace Read Optimization**: PR #45233 introduces load tests that enforce read budget caps for trace retrieval, ensuring predictable latency under high load.
- 📈 **Improved Retry Handling**: Multiple PRs now respect `retry-after` and `retry-after-ms` headers from providers (e.g., #45247, #45234), reducing premature retries and improving reliability during rate-limiting events.

> 🔗 [PR #45233](https://github.com/BerriAI/litellm/pull/45233), [PR #45247](https://github.com/BerriAI/litellm/pull/45247)

---

### **5. Stability & Regressions**  
- **Critical Streaming Bug (High Severity)**:  
  - **Issue #13419**: OpenAI GPT-5 fails to emit thinking outputs when used via OpenWebUI, despite working correctly through OpenRouter (similar to DeepSeek-R1). This impacts agent reasoning workflows.  
  - *Status*: Open; no fix PR yet.  
  > 🔗 [GitHub Issue #13419](https://github.com/BerriAI/litellm/issues/13419)

- **Virtual Key Management Failure (Medium Severity)**:  
  - **Issue #15230**: Users receive `"This feature is only available for LiteLLM Enterprise users"` error even when editing non-enterprise virtual keys. This blocks basic configuration changes.  
  - *Status*: Open; fix pending.  
  > 🔗 [GitHub Issue #15230](https://github.com/BerriAI/litellm/issues/15230)

- **Gemini Tool Message Corruption (Medium Severity)**:  
  - **Issue #44979**: `tool_result.is_error` flag is dropped when translating Anthropic → OpenAI tool messages, breaking error detection in downstream agents.  
  - *Status*: Open; fix PR needed.  
  > 🔗 [GitHub Issue #44979](https://github.com/BerriAI/litellm/issues/44979)

- **Stale Affinity Pinning (Low-Medium Severity)**:  
  - **Issue #32308**: `enable_weighted_failover` can be overridden by stale deployment affinity pins, leading to failed requests being routed incorrectly.  
  - *Status*: Open; fix PR under review.  
  > 🔗 [GitHub Issue #32308](https://github.com/BerriAI/litellm/issues/32308)

---

### **6. What This Means for Application Developers**  
- **Build More Reliable Agents**: With improved streaming, retry logic, and `retry-after` header support, your agent workflows will handle rate limits more gracefully and avoid unnecessary re-attempts.
- **Enhanced Multi-Tenant Control**: New budget-by-token-per-tenant features (#44555) allow precise, model-agnostic quotas—ideal for SaaS platforms.
- **Better Security & Compliance**: Per-user OAuth for GitHub Copilot and Microsoft 365 Copilot ensures sensitive credentials aren’t shared across users.
- **Prepare for Rust Migration**: If you’re running high-throughput inference gateways, consider joining the [Rust beta program](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...) to test low-latency, high-throughput routing.
- **Avoid Pitfalls**: Be cautious with virtual key edits (issue #15230) and ensure `is_error` flags are preserved in tool calls (issue #44979) when building complex agent pipelines.

> 💡 Pro Tip: Use `cosign verify` to validate all Docker images against the stable key from commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) for air-gapped environments.

---  
*Digest generated: 2026-10-08 | Source: [BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-08**

#### **1. Today's Highlights**  
Unsloth v0.1.904-beta introduces **decision model training**, enabling users to transform any text or vision LLM into a high-accuracy (up to 80%) Jev-style decision engine—complete with training, testing, export, and serving workflows directly in the platform. This release also brings native ComfyUI integration, improved diffusion pipelines, and enhanced desktop UX, including a new browser panel with video attachment support.

#### **2. Releases & Breaking Changes**  
- **v0.1.904-beta**:  
  - Added **decision model training** for LLMs (text/vision), allowing fine-tuning of reasoning agents with accuracy gains from ~30% to 80%.  
  - Introduced **native ComfyUI model support** and improved diffusion pipeline stability.  
  - Enhanced desktop browser: now supports video attachments via tabbed playback and right-click downloads on macOS.  
  - [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.904-beta)  

> ⚠️ **Migration Note**: Users upgrading from `v0.1.903-beta` should verify GPU memory allocation and `llama-server` configurations due to recent regressions (see Stability section).

#### **3. New Model & Hardware Support**  
- **ComfyUI Models**: Native integration with ComfyUI-compatible models (e.g., diffusion backends) now supported in desktop and Studio UI.  
- **AMD ROCm Support**: Improved handling of `unsloth[amd]` installs; PR #12947 addresses accidental CUDA torch replacement from PyPI.  
- **Apple M4 Pro (MPS)**: Fixes applied for VAE tiling issues when generating images with input images (Issue #12935).  
- **Quantization**: Full support for `int4` compressed tensors (`W4A16`) with validation of `group_size` vs. `weight_scale` shape (PR #12955).

#### **4. Performance & Optimization**  
- **MoE Expert Spill Handling**:  
  - Auto-microbatching raised to **2048** (`--ubatch-size 2048`) when MoE experts spill to RAM (PR #12950).  
  - GPU cache auto-sizing via `--moe-cache-mib auto` (when supported by llama.cpp binary) improves VRAM utilization (PR #12951).  
- **Embedding Performance**:  
  - `unsloth/embeddinggemma-2` now defaults to `llama-server` on GPU instead of CPU float32, boosting indexing speed from **~5 chunks/s to ~129 chunks/s** (PR #13006).  
- **Audio & Text Rendering**: Security fix for unsafe `np.load(..., allow_pickle=True)` now prompts user confirmation (PR #13001).

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR | Notes |
|---------|------|--------|--------|-------|
| 🔴 High | **CPU Spike at Idle** (Windows): `python.exe` spins at ~95% across all cores even with no model loaded (PR #12942) | Open | Pending | Affected: Windows 11 + Ryzen 9 7900X + ROCm. Likely related to OpenBLAS threading. |
| 🔴 High | **Qwen Image 2.1 Q4_K_M Fails on M5 Max (48GB RAM)**: Out-of-memory error despite low system load (Issue #11792) | Open | Pending | Possible quantization or memory leak in GGUF loader. |
| 🔴 High | **MXC Probe Fails Due to `ReadGrantError`** on MS Store Python path (Issue #12941) | Open | Pending | Critical for secure sandboxed execution on Windows. Requires fallback to user-space Python. |
| 🟡 Medium | **Long-context chat lagging** after update (Issue #12552) | Open | Pending | Reported on GeForce RTX GPUs; likely latency spike in streaming output. |
| 🟡 Medium | **Bonsai models fail to load** (prismml/bonsai-1bit, ternary) (Issue #11259) | Open | Pending | Regression post-v0.1.900. |

> ✅ **Fixed**: Tool call argument loss in Qwen3.5 safetensors (PR #12988), table rendering breakage with pipe in citations (PR #12990), and spell check interference on non-English prompts (PR #12861).

#### **6. What This Means for Application Developers**  
- **Build Decision Agents**: Use the new `decision model` training flow to create high-accuracy reasoning agents without external frameworks—ideal for RAG, code generation, or autonomous planning.  
- **Leverage GPU-Aware Embeddings**: Prioritize `llama-server`-backed embedding models (e.g., `embeddinggemma-2`) for faster document indexing—critical for large-scale RAG apps.  
- **Secure AI Workflows**: Enable `MXC` sandboxing only if you enforce strict fallback paths to avoid `ReadGrantError`. Audit file access in production deployments.  
- **Optimize MoE Workloads**: For models spilling experts to RAM, rely on `--ubatch-size 2048` and `--moe-cache-mib auto` to maximize throughput. Monitor GPU memory usage during inference.  
- **Avoid Pitfalls**: Disable toolcalls via UI option (if privacy is critical), and avoid `allow_pickle=True` unless absolutely necessary—use `np.load(..., allow_pickle=False)` or explicit prompts.

> 💡 **Pro Tip**: Use the new **"Duplicate Training Run"** feature (Issue #12977) to rapidly prototype configs—great for A/B testing fine-tuning hyperparameters.

---  
*Digest compiled from GitHub data: unslothai/unsloth | 2026-10-08*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*