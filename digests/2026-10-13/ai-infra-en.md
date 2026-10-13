# AI Infrastructure Digest 2026-10-13

> Generated: 2026-10-13 03:08 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-13**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of hyper-specialization, with projects converging on high-performance execution for next-gen models (e.g., MoE, Flash-based, multimodal) while diverging in deployment layering and hardware targeting. vLLM and SGLang lead in distributed, low-latency inference engines optimized for GPU clusters, while llama.cpp and Ollama dominate lightweight, local-first deployments across CPUs, mobile, and edge devices. LiteLLM continues to solidify its role as the intelligent API gateway orchestrating multi-vendor model routing with growing emphasis on cost accuracy and guardrail integration. Unsloth emerges as a unique hybrid—bridging fine-tuning, efficient inference, and agent capabilities—signaling a shift toward full-stack AI application development.

---

### **2. Activity Comparison**  

| Project       | Open Issues | Open PRs | Release Status         |
|---------------|-------------|----------|------------------------|
| **vLLM**      | 47          | 98       | No new release (stable) |
| **SGLang**    | 52          | 83       | No new release (dev)    |
| **llama.cpp** | 37          | 64       | No new release (stable) |
| **Ollama**    | 68          | 42       | `v0.40.4-rc0` (RC)     |
| **LiteLLM**   | 39          | 45       | No new release (stable) |
| **Unsloth**   | 51          | 38       | `v0.1.906-beta` (beta) |

> ✅ **Insight**: Ollama shows highest issue volume, reflecting instability in recent RC; Unsloth leads in active PRs relative to release cadence, indicating rapid feature iteration.

---

### **3. Model Support Race**  

| New Model / Architecture        | Supported By                          | Status & Notes |
|----------------------------------|----------------------------------------|----------------|
| **Cloudflare Clef-Flash**       | vLLM (`/v1/systemone`)                | ✅ Native support via Qwen3.5 backbone |
| **Qwen-Image-2.1-Turbo (GGUF)** | Unsloth                              | ✅ 8-step image gen; browser agent ready |
| **GLM-5.3-Flash**               | SGLang (CP+TP), vLLM                   | ✅ SGLang: colocated prefill/decode; vLLM: ROCm tracking |
| **DeepSeek-V4-Flash-0731**      | vLLM (SM8x request), SGLang (optimizing) | ⚠️ SM8x support pending in vLLM |
| **Decision Models (D3-style)**  | llama.cpp (`--model-draft pplx-decider`) | ✅ Full support; enables high-throughput speculation |
| **EmbeddingGemma 2 (GGUF)**     | Ollama (`v0.40.4-rc0`)                 | ✅ Added via updated llama.cpp |
| **LTX-2.5 Diffusers (FP8/int8)**| Unsloth                              | ✅ Pre-quantized DiTs from HF; no on-the-fly quant |
| **K2 Horizon MoE**              | Ollama (feature request)               | 🟡 Requested; no implementation yet |

> 🔥 **Leaderboard**:  
> - **Most comprehensive model support**: *vLLM* (Clef-Flash, DeepSeek, GLM-5.3, Mamba)  
> - **Most forward-looking**: *Unsloth* (browser agents, text-diffusion, multimodal GGUF)  
> - **Fastest adoption of new formats**: *Ollama* (GGUF decision models, EmbeddingGemma 2)

---

### **4. Performance Frontier**  

| Optimization Focus           | Leading Projects                     | Key Developments |
|-------------------------------|--------------------------------------|------------------|
| **KV Cache Efficiency**       | vLLM, SGLang                         | Refactored planning logic (vLLM #61183), adaptive budgeting RFC (#52906) |
| **Speculative Decoding**      | vLLM, SGLang, llama.cpp, Unsloth     | DFlash padding parallelization (vLLM), M-series support (Unsloth), MTP fixes |
| **MoE & Quantization**        | vLLM, SGLang, Unsloth                | NVFP4 per-forward expert selection (vLLM #54617), LoRA stack completion (SGLang), MoE GGUF 3.2x speedup (Unsloth) |
| **Kernel-Level Fusion**       | vLLM, SGLang                         | 6x mamba kernel fusion (vLLM #58737), CP extension beyond FlashInfer (SGLang #31732) |
| **Distributed Serving**       | vLLM, SGLang                         | PD disaggregation (SGLang), TP/CP co-location (GLM-5.3), fully-sharded LoRA (vLLM) |

> 📌 **Trend**: Optimization is increasingly focused on **reducing per-step overhead** (e.g., DFlash padding) and **enabling dynamic resource allocation** (adaptive budgets, modularity).

---

### **5. Layer Positioning**  

| Project       | Primary Layer             | Differentiator |
|---------------|----------------------------|----------------|
| **vLLM**      | Inference Engine (GPU)     | High-throughput, MoE-aware, CUDA-optimized serving |
| **SGLang**    | Inference Engine + Agent Framework | Prefill-decode disaggregation, agentic control flow |
| **llama.cpp** | Local Runtime / CPU/GPU      | Lightweight, cross-platform, GGUF-first, edge-optimized |
| **Ollama**    | Developer Gateway / CLI      | Simplified model management, local-first UX, but unstable at scale |
| **LiteLLM**   | LLM Gateway / Orchestration  | Unified API bridge, cost parity, guardrails, multi-cloud routing |
| **Unsloth**   | Full-Stack AI App Platform   | Combines training, fine-tuning, browser agents, multimodal inference |

> 💡 **Positioning Insight**:  
> - **Engineers** using GPUs should lean on **vLLM/SGLang** for performance.  
> - **Edge/Local Devs** should use **llama.cpp/Ollama**.  
> - **Application Builders** need **Unsloth** or **LiteLLM + SGLang** for agent workflows.  
> - **Enterprise Ops** rely on **LiteLLM** for cost visibility and compliance.

---

### **6. Trend Signals**  

1. **Agent-Centric Stack Emergence**:  
   Unsloth’s browser agent capability and SGLang’s programmatic KV control signal a move beyond pure inference—toward **autonomous, stateful agents** that interact with external systems. Developers must now consider **session persistence**, **action safety**, and **context integrity**.

2. **Hardware Specialization Accelerates**:  
   AMD ROCm, Apple Silicon (M series), and Snapdragon Hexagon are no longer afterthoughts. Projects like SGLang (ROCm HiCache), Unsloth (M-series speculative decoding), and llama.cpp (Hexagon power modes) show deep hardware-specific tuning—expect **tiered deployment strategies** based on device type.

3. **Quantization & Efficiency Convergence**:  
   Per-forward precision (vLLM), FP8/int8 diffusion (Unsloth), and Q2_K/Q4_K optimizations (llama.cpp) indicate that **efficiency is no longer just about size**—it’s about **dynamic, context-aware compute allocation**.

4. **Stability vs. Innovation Trade-off**:  
   Ollama’s `v0.40.4-rc0` crash reports and SGLang’s flaky CI highlight a growing risk in fast-moving open-source stacks. **Production teams should avoid RC releases** unless they’re vetting fixes manually.

5. **Cost Accuracy Becomes a Feature**:  
   LiteLLM’s focus on billing parity across API bridges reflects rising demand for **transparent, auditable cost tracking**—especially for cloud-agnostic or hybrid deployments.

> 🔮 **Recommendation for Application Developers**:  
> - Prioritize **vLLM or SGLang** for scalable, long-context agents.  
> - Use **Unsloth** for research, automation, and multimodal apps requiring browser interaction.  
> - Leverage **LiteLLM** as a proxy for cost-aware, multi-provider routing.  
> - Avoid RC builds (Ollama `v0.40.4-rc0`, Unsloth beta) in production until stability improves.  
> - Monitor **speculative decoding reliability** across all stacks—still fragile in high-concurrency scenarios.

---  
*Report generated: 2026-10-13 | Data source: GitHub activity summaries*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-13**

---

#### **1. Today's Highlights**  
vLLM continues its aggressive optimization push for next-gen models and hardware, with key PRs enhancing speculative decoding efficiency (DFlash padding parallelization), refining KV cache planning logic, and enabling native support for **Cloudflare’s Clef-Flash** model via `/v1/systemone`. Critical stability fixes address CUDA graph deadlocks in MoE LoRA scenarios and a high-concurrency memory access issue in DeepSeek-V4.1-Flash on H20 GPUs.

---

#### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*  
However, several PRs indicate ongoing deprecation of legacy features:  
- `--mamba-cache-mode` is being removed entirely (`#60043`) — future Mamba deployments must use default prefix caching behavior.  
- `mamba_cache_mode="all"` has been fully purged from codebase (`#60043`).  

> 🔗 [PR #60043](https://github.com/vllm-project/vllm/pull/60043) – Removal of `mamba_cache_mode`

---

#### **3. New Model & Hardware Support**  
- ✅ **New Model**: Added native support for **Cloudflare/clef-flash** (`#61308`) via `/v1/systemone`, leveraging Qwen3.5 backbone and joint schema head.  
- 📌 **Hardware Expansion**:  
  - SM8x (Ampere A100/A800/RTX 30xx) support requested for **DeepSeek-V4-Flash-0731** (`#50576`), pending backend integration.  
  - AMD ROCm performance tracking added for **Qwen3.8-Flash-Next** on MI355X (`gfx950`) and **GLM-5.3-Flash** (`#57406`, `#59575`).  
- 🧠 **Quantization**: NVFP4 precision now supports per-forward expert selection on SM12x (`#54617`), improving flexibility for MoE models.

> 🔗 [PR #61308](https://github.com/vllm-project/vllm/pull/61308) – Clef-Flash support  
> 🔗 [Issue #50576](https://github.com/vllm-project/vllm/issues/50576) – SM8x support request for DSv4-Flash

---

#### **4. Performance & Optimization**  
- ⚡ **Speculative Decoding**: Parallelizing DFlash draft-input padding reduces per-step overhead by up to **35.8μs** (`#58633`).  
- 🔥 **Mamba Kernel Fusion**: Fusing mamba align block-table gather into one Triton kernel cuts 7 kernels → 1, achieving **6x speedup** across all shapes (`#58737`).  
- 🔄 **KV Cache Planning**: Refactored `kv_cache_planning.py` improves modularity and maintainability (`#61183`).  
- 🎯 **Adaptive Prefill Budgeting**: RFC proposal (`#52906`) aims to dynamically adjust `max_num_batched_tokens` based on scheduling pressure — promising for long-context workloads.  
- 📈 **MoE Routing**: Optimized router fusion allows scoring after top-k (`#57410`), increasing compatibility with HF model variants.

> 🔗 [PR #58633](https://github.com/vllm-project/vllm/pull/58633) – DFlash padding parallelization  
> 🔗 [PR #58737](https://github.com/vllm-project/vllm/pull/58737) – Mamba kernel fusion (6x speedup)

---

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|--------|
| 🔴 High | **CUDA Graph deadlock** in fully-sharded fused-MoE LoRA across TP ranks (`#60845`) | Open | ❌ No fix yet |
| 🔴 High | **Illegal memory access** in `dsv4_topk` MoE kernel under high concurrency on H20 (`#56389`) | Open | Mitigated via `max_num_seqs=256` |
| 🟡 Medium | **Engine freeze** in V1 multiprocess engine (~1–2s per batch) (`#48229`) | Open | `VLLM_ENABLE_V1_MULTIPROCESSING=0` workaround |
| 🟡 Medium | **Stalled KV offload writes** cause indefinite `HIT_PENDING` polling (`#49829`) | Open | No deadline enforcement; client timeout at risk |

> 🔗 [Issue #60845](https://github.com/vllm-project/vllm/issues/60845) – CUDA Graph deadlock  
> 🔗 [Issue #56389](https://github.com/vllm-project/vllm/issues/56389) – H20 illegal memory access

---

#### **6. What This Means for Application Developers**  
- **Deployers using MoE models (e.g., Qwen3.5, GLM-5.3)** should avoid `--fully-sharded-loras` until `#60845` is resolved — expect intermittent hangs under load.  
- **High-concurrency inference on H20/GPU clusters** must cap `max_num_seqs` at ≤256 to prevent crashes in DeepSeek-V4.1-Flash.  
- **Use `/v1/systemone`** for Cloudflare’s Clef-Flash — it’s now natively supported and leverages optimized routing.  
- **Enable `--long-prefill-token-threshold-defer`** (`#61080`) if serving long-context batches; avoids prefill capping and improves fairness.  
- **Monitor KV offload metrics** closely — stalled writes can silently delay responses beyond client timeouts (`#49829`).  
- Consider adopting **per-forward NVFP4 precision selection** (`#54617`) for optimal MoE performance on Blackwell (SM12x).

> ✅ Pro tip: Use `recipes/models/` hosted in vLLM repo (`#61302`) for verified deployment configurations.

---  
*Digest generated: 2026-10-13 | Source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-13**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to solidify its position as a high-performance inference stack for large, complex models with active work on **prefill-decode disaggregation (PD)** and **DeepSeek V4.1 optimization**. Key momentum includes new PRs enabling **colocated prefill CP + decode TP for GLM-5.3-Flash**, and a critical fix for **AMD ROCm HiCache performance issues**. Meanwhile, the community is actively addressing flaky CI infrastructure and stability concerns in speculative decoding and KV cache reuse.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking changes reported in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash**: Support for colocated prefill context parallelism (CP) and decode target/verify attention tensor parallelism (TP) via DFlash2/MTP is now under review in [#43972](https://github.com/sgl-project/sglang/pull/43972).  
- ✅ **MiniCPM-V 4.7**: Cookbook documentation added in [#43829](https://github.com/sgl-project/sglang/pull/43829), enabling quick adoption of this emerging vision-language model.  
- ✅ **NPU & XPU Backends**: Full prefill graph support added for XPU in [#30980](https://github.com/sgl-project/sglang/pull/30980); NPU `prefill_complete` support introduced in [#43970](https://github.com/sgl-project/sglang/pull/43970).  
- ⚠️ **AMD ROCm (gfx942/gfx950)**: Critical fixes underway for FP8 GEMM accuracy (`#43526`) and DSV4.1 sparse decode crashes due to missing module imports (`#43765`).  

---

### **4. Performance & Optimization**  
- 🔥 **Prefill Context Parallelism (CP)**: Progress on extending CP to MHA/GQA backends beyond FlashInfer/TRTLLM-MHA via #31732; ongoing work on compatibility with allreduce fusion and SWA-enabled models.  
- 🚀 **DeepSeek V4.1 Optimizations**: PRs like [#43838](https://github.com/sgl-project/sglang/pull/43838) enable small-batch decode fusions at TP2, improving efficiency for smaller-scale deployments.  
- ⚙️ **LoRA Stack Completion**: Final stages of the LoRA runtime stack (21/21) are landing, including NVFP4 MoE LoRA on Marlin (#42888), CuTeDSL FP8 tile tables (#42887), and packed MoE schedules (#42883), enabling efficient fine-tuning on Blackwell GPUs.  
- 🔄 **Startup Tuning**: PR [#43927](https://github.com/sgl-project/sglang/pull/43927) integrates FlashInfer’s default tactic into startup tuning, ensuring optimal kernel selection without manual override.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR? | Link |
|--------|------|--------|--------|------|
| ❌ High | Speculative decoding crashes on first non-greedy request due to JIT failure in flashinfer verify-sampling op | Open | No | [Issue #43412](https://github.com/sgl-project/sglang/issues/43412) |
| ❌ High | Severe repetition and degenerate loops in GLM-5.3 output with DFLASH speculative decoding | Open | No | [Issue #40843](https://github.com/sgl-project/sglang/issues/40843) |
| ⚠️ Medium | Runtime role switch crash (decode → prefill → decode) with `--disaggregation-mode decode` | Open | No | [Issue #43557](https://github.com/sgl-project/sglang/issues/43557) |
| ⚠️ Medium | Flaky CI tests and recurring infra failures in `PR Test Base/Extra` | Open | No | [Issue #42752](https://github.com/sgl-project/sglang/issues/42752) |
| ⚠️ Low | Transcription multipart upload lacks size limits | Open | No | [Issue #43709](https://github.com/sgl-project/sglang/issues/43709) |

> *Note:* Several bugs affect production-grade agentic workloads (e.g., incorrect tool type handling, HiCache crashes on ROCm, OOM during warmup).

---

### **6. What This Means for Application Developers**  
- **Agentic Workloads**: Expect improved predictability with upcoming programmatic KV cache control ([#27574](https://github.com/sgl-project/sglang/issues/27574)), but avoid `custom` tool types until the router sync issue ([#30781](https://github.com/sgl-project/sglang/issues/30781)) is resolved.  
- **Multi-Tenant Serving**: Use `--enable-pd-role-switch` cautiously — recent crashes indicate instability in PD workflows when switching roles mid-request ([#43557](https://github.com/sgl-project/sglang/issues/43557)).  
- **Fine-Tuning Pipeline**: The completed LoRA stack enables efficient MoE and quantized fine-tuning on NVIDIA Blackwell hardware — ideal for cost-sensitive agent training.  
- **Model Deployment**: For GLM-5.3 and DeepSeek V4.1, use the latest dev builds (`dev-minicpm-v-4.7`, `v0.5.21`) with caution — several regressions remain open in speculative decoding and KV reuse.  
- **CI Reliability**: Be prepared for intermittent test failures; consider retrying PRs via `/sglang-pr-babysit` if blocked by flaky CI ([#42752](https://github.com/sgl-project/sglang/issues/42752)).

👉 *Recommendation*: Monitor [Roadmap Issues](https://github.com/sgl-project/sglang/issues?q=is%3Aopen+label%3Aroadmap) for PD disaggregation and dLLM serving progress — these are foundational for scalable, low-latency agent systems.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-13**

---

### **1. Today's Highlights**  
The latest development cycle focuses on stabilizing speculative decoding (MTP/DFlash) and enhancing backend robustness across CUDA, Vulkan, and Metal. Critical fixes address multi-sequence handling in vLLM D3 models and GPU memory management in attention kernels, while new optimizations improve Q2_K and Q4_K performance on AMD and Intel platforms.

---

### **2. Releases & Breaking Changes**  
No new releases were published in the last 24 hours. However, several PRs introduce **non-backward-compatible changes** that developers should monitor:  
- **PR #30408** (`model: fix vllm d3 multi seq case`) resolves a critical correctness issue in hybrid, non-causal multi-sequence inference with vLLM D3 models. This may affect users relying on speculative decoding pipelines. [GitHub PR #30408](https://github.com/ggml-org/llama.cpp/pull/30408)  
- **PR #30429** (`ggml-cpu: faster AMX Q4_K decode (+13% tg)`) rewrites the Q4_K VNNI kernel for better column-wise grouping on AMX-capable CPUs — expect slightly different output behavior if relying on deterministic precision under edge cases. [GitHub PR #30429](https://github.com/ggml-org/llama.cpp/pull/30429)

---

### **3. New Model & Hardware Support**  
- ✅ **vLLM D3 Models**: Full support added for `pplx-decider` and D3-style decision models via `--model-draft`. This enables high-throughput speculation with modern reasoning architectures. [GitHub PR #30383](https://github.com/ggml-org/llama.cpp/pull/30383)  
- ✅ **Hexagon Backend**: Added support for **Q1_0 quantization** and configurable HTP power modes (from `low_power_saver` to `burst`). Ideal for edge inference on Snapdragon devices. [GitHub PR #30122](https://github.com/ggml-org/llama.cpp/pull/30122), [PR #30423](https://github.com/ggml-org/llama.cpp/pull/30423)  
- ✅ **Vulkan**: Added device-specific shader count definition for **Intel Arc Pro B65**, improving compatibility on newer Gen13 GPUs. [GitHub PR #30431](https://github.com/ggml-org/llama.cpp/pull/30431)

---

### **4. Performance & Optimization**  
- **AMX CPU (Q4_K)**: Up to **+13% token generation (tg)** speed via optimized column-walking in the M=1 decode path. [GitHub PR #30429](https://github.com/ggml-org/llama.cpp/pull/30429)  
- **AMD (Q2_K)**: Reduced VGPR spills on gfx906/Mi50 by refining loop unrolling and eliminating redundant temporaries — expected to improve throughput on large models. [GitHub PR #29910](https://github.com/ggml-org/llama.cpp/pull/29910)  
- **Vulkan (RMS Norm)**: Subgroup reductions replace workgroup reductions, yielding measurable gains on **Intel Arc B70** and **RTX 4060 Ti**. [GitHub PR #29882](https://github.com/ggml-org/llama.cpp/pull/29882)  
- **Hexagon (CPY/CONCAT)**: Round 3 optimization reduces DMA latency for short-row transfers via block-based row processing. [GitHub PR #30341](https://github.com/ggml-org/llama.cpp/pull/30341)

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:  
1. **CUDA Graph Hangs on RTX 5090 Laptop (sm_120)**: GPU channel locks due to CUDA graphs; workaround: `GGML_CUDA_DISABLE_GRAPHS=1`. [GitHub Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)  
2. **Vulkan `ErrorDeviceLost` During Speculative Decoding**: Occurs during MTP draft decoding with tensor split on AMD RX 7900 XTX. Likely tied to compute graph scheduling or memory reuse. [GitHub Issue #30010](https://github.com/ggml-org/llama.cpp/issues/30010)  
3. **Metal `kernel_mul_mm_id_map0` Overflow**: Duplicate expert IDs cause dropped tokens or crashes due to fixed-size lookup table limits. Fixed in #30373. [GitHub Issue #27546](https://github.com/ggml-org/llama.cpp/issues/27546)  
4. **DFlash2 Fails with `--split-mode tensor`**: Assertion failure in `ggml-backend-meta.cpp` when loading MoE drafts. [GitHub Issue #27819](https://github.com/ggml-org/llama.cpp/issues/27819)  

> 🔴 **Note**: Several of these are regression hotspots affecting production-grade inference (especially MTP/drafting). Users should avoid `--split-mode tensor` until #27819 is resolved.

---

### **6. What This Means for Application Developers**  
- **Use `--model-draft pplx-decider`** to leverage next-gen speculative decoding with vLLM D3 models — ideal for low-latency agents.  
- **Avoid `--split-mode tensor`** with DFlash2 drafts until #27819 is patched; consider `--split-mode layer` as fallback.  
- **On AMD systems**: Prefer `Q2_K` over `Q4_K` for better throughput, but be aware of known VGPR spill issues.  
- **For mobile/edge deployment**: Enable `GGML_HEXAGON_POWER_MODE=burst` for peak performance on Snapdragon SoCs.  
- **Monitor `GGML_ASSERT(neq0 == HSK)` failures** on Vulkan/MTP paths — they indicate misaligned head dimensions in speculative decoding.  
- **Disable CUDA graphs** (`GGML_CUDA_DISABLE_GRAPHS=1`) if experiencing hangs on RTX 5090 laptops.  

> 📌 **Pro Tip**: Use `llama-cli --version` to verify build includes recent fixes (e.g., b11577+). Avoid prebuilt binaries from older builds (e.g., b10289) where known regressions exist.

---  
*Digest generated: 2026-10-13 | Source: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **1. Today's Highlights**  
Ollama’s latest release, `v0.40.4-rc0`, integrates updated `llama.cpp` (b11521) with improved support for decision models and EmbeddingGemma 2, while also introducing critical stability fixes for MLX runners on Apple Silicon. A surge in high-severity issues—particularly MLX kernel panics and CUDA memory access errors—highlights ongoing challenges with new model backends and GPU compatibility.

---

### **2. Releases & Breaking Changes**  
- **v0.40.4-rc0** (GitHub: [#18917](https://github.com/ollama/ollama/pull/18917))  
  - Upgraded `llama.cpp` to commit b11521, enabling native support for **decision models** and **EmbeddingGemma 2** via GGUF.
  - Introduced **server-side reuse of verified manifests and loaded models**, reducing inference route overhead ([#18947](https://github.com/ollama/ollama/pull/18947)).
  - *Note:* This version includes breaking changes for MLX-based models (see Stability section).

---

### **3. New Model & Hardware Support**  
- ✅ **Decision Models**: Native support added via updated `llama.cpp` (b11521), now available in `v0.40.4-rc0`.
- ✅ **EmbeddingGemma 2**: Fully supported in `v0.40.4-rc0` with proper manifest handling.
- 🟡 **K2 Horizon Models (k2-horizon)**: Feature request open ([#18642](https://github.com/ollama/ollama/issues/18642)) — requested support for Apache-2.0 models from MBZUAI IFM (0.9B–36B MoE).
- 🟡 **Prism Ternary GGUFs (PQ2_0/PTQ1_0)**: Import fails due to unsupported tensor size overflows ([#18521](https://github.com/ollama/ollama/issues/18521)); tracking issue open.
- 🟡 **Cohere MoE (RTX 5090)**: CUDA illegal memory access crashes reported on Windows ([#18642](https://github.com/ollama/ollama/issues/18642)), indicating incomplete backend compatibility.

---

### **4. Performance & Optimization**  
- ⚠️ **Performance Regression**: Users report **25–30% drop in tokens/sec** across all models vs. `v0.40.1` ([#18968](https://github.com/ollama/ollama/issues/18968)). Evaluation logs confirm significant throughput degradation.
- 🔧 **Kernel Optimization**: Multiple PRs targeting SDPA kernel threadgroup limits:
  - MLX panics on M2 Max/Mac Studio due to exceeding 896-thread limit (`sdpa_vector_2pass_...`) — reported for Qwen3.8 and Gemma4 ([#18940](https://github.com/ollama/ollama/issues/18940), [#18966](https://github.com/ollama/ollama/issues/18966)).
  - Fix PRs in progress: [#18974](https://github.com/ollama/ollama/pull/18974) (MLX JSON state prompts), [#18973](https://github.com/ollama/ollama/pull/18973) (multimodal embedding context sizing).
- 📈 **Scheduler Efficiency**: Proposal to avoid model reloads during shift mismatches ([#18950](https://github.com/ollama/ollama/issues/18950)) aims to reduce latency in long-context workflows.

---

### **5. Stability & Regressions**  
| Issue | Severity | Impact | Status |
|------|----------|--------|--------|
| [#18940](https://github.com/ollama/ollama/issues/18940) / [#18966](https://github.com/ollama/ollama/issues/18966) | Critical | MLX runner panic on Apple Silicon (M2 Max) when using large attention heads (e.g., `qwen3.8:27b`, `gemma4:31b`) | Open |
| [#18846](https://github.com/ollama/ollama/issues/18846) / [#18856](https://github.com/ollama/ollama/issues/18856) | Critical | MLX runner crash with `Maximum threads per threadgroup is 896 but requested 1024` on `qwen3.6:35b-mlx` and `qwen3.6:27b-mlx` | Open |
| [#18642](https://github.com/ollama/ollama/issues/18642) | Critical | CUDA illegal memory access crash on RTX 5090 with Cohere MoE models (Windows) | Open |
| [#18950](https://github.com/ollama/ollama/issues/18950) | High | Unnecessary model reloads when `shift` differs between requests | Open |
| [#18968](https://github.com/ollama/ollama/issues/18968) | High | 25–30% performance regression across all models | Open |
| [#18944](https://github.com/ollama/ollama/issues/18944) | Medium | Tool calls fail when `format: "json"` is set | Open |

> ✅ **Fixes in Progress**: Several PRs address MLX kernel issues ([#18974](https://github.com/ollama/ollama/pull/18974), [#18973](https://github.com/ollama/ollama/pull/18973)) and tool call formatting ([#18975](https://github.com/ollama/ollama/pull/18975)).

---

### **6. What This Means for Application Developers**  
- **Avoid `v0.40.4-rc0` for production** if using MLX or large attention-head models (e.g., Qwen3.8/Gemma4) on Apple Silicon — expect frequent crashes.
- **Expect slower inference**; benchmark against `v0.40.1` if performance is critical.
- **Tool calling + JSON format**: Do not rely on `format: "json"` for tool use until [#18975](https://github.com/ollama/ollama/pull/18975) lands — it may silently fail.
- **Cloud users**: Be cautious with `deepseek-v4.1-flash:cloud` and image inputs (>655k tokens); expect 500 errors ([#18853](https://github.com/ollama/ollama/issues/18853)).
- **Windows users**: Watch for `.tmp` DLL issues post-update ([#18712](https://github.com/ollama/ollama/issues/18712)) and NTFS mount path bugs ([#18921](https://github.com/ollama/ollama/issues/18921)).

> 🛠 **Recommendation**: Pin to `v0.40.1` or earlier until MLX/CUDA regressions are resolved. Monitor [PR #18975](https://github.com/ollama/ollama/pull/18975) for structured output/tool call fixes.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-13**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to deepen its support for advanced LLM orchestration, with critical improvements in cost accuracy and error handling for high-tier models like GPT-6, Claude 5, and Bedrock Converse. Key PRs today focus on fixing billing inconsistencies across API bridges (e.g., `/v1/messages` → `/v1/responses`) and improving guardrail integration—especially for Wingback. A notable fix addresses a 503-to-529 misclassification issue in Anthropic’s error path, preventing unnecessary client-side retries.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several breaking changes are imminent via open PRs:
- **PR #46144**: Fixes underbilling of Gemini context cache creation tokens by now including `cachedContents` token counts in billing.
- **PR #46135**: Ensures Azure AI Claude web searches are billed under deployment-specific pricing IDs, resolving fallback issues for custom deployments.
- **PR #46138**: Removes `known_bug` tag from Azure GPT-6 rows after confirming correct handling of `reasoning_effort='none'`.

> 🔗 [PR #46144](https://github.com/BerriAI/litellm/pull/46144) | [PR #46135](https://github.com/BerriAI/litellm/pull/46135) | [PR #46138](https://github.com/BerriAI/litellm/pull/46138)

---

### **3. New Model & Hardware Support**  
*No new model or hardware backends were added today.*  
However, ongoing work strengthens support for:
- **GPT-6 series** (`gpt-6-sol`, `gpt-6-luna`, `gpt-6-astra`, `gpt-6.1-sol`) via enhanced cost parity testing across bridge paths.
- **Claude 5** models through `/v1/responses` bridge validation.
- **Bedrock Converse** models with full cost parity checks between native and bridged routes.

> 🔗 [PR #46140](https://github.com/BerriAI/litellm/pull/46140) | [PR #46141](https://github.com/BerriAI/litellm/pull/46141)

---

### **4. Performance & Optimization**  
*No direct throughput or latency optimizations landed today.*  
But significant progress was made in **cost correctness**, which indirectly impacts performance reliability:
- Added 17 new `BridgeCostParityTestCase` pairs across Azure, Claude 5, and Bedrock Converse paths to prevent silent billing drift.
- Improved caching behavior for vector store files and context cache creation (via PR #46144).
- Fixed memory leak in `websearch_interception` that permanently consumed one `max_parallel_requests` slot per streamed request (Issue #46093).

> 🔗 [PR #46139–46143](https://github.com/BerriAI/litellm/pulls?query=author%3A%40kerrylu-berri+is%3Aopen+sort%3Aupdated-desc) | [Issue #46093](https://github.com/BerriAI/litellm/issues/46093)

---

### **5. Stability & Regressions**  
Top stability concerns reported today:

| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| `Redis cache fails with unexpected ssl_check_hostname` (Issue #34614) | Critical | Open | No fix yet |
| `Gemini 3 models silently inject temperature=1.0` (Issue #45333) | High | Closed | [PR #38663](https://github.com/BerriAI/litellm/pull/38663) |
| `SSE error codes outside HTTP range (100–599) dropped silently` (Issue #31284) | Medium | Open | No fix yet |
| `Proxy-admin JWT bypasses max_budget` (Issue #41226) | High | Closed | [PR #41226](https://github.com/BerriAI/litellm/pull/41226) |
| `Websearch_interception leaks parallel request slots` (Issue #46093) | High | Open | [PR #46134](https://github.com/BerriAI/litellm/pull/46134) |

> 🔗 [Issue #34614](https://github.com/BerriAI/litellm/issues/34614) | [Issue #46093](https://github.com/BerriAI/litellm/issues/46093)

---

### **6. What This Means for Application Developers**  
Developers using LiteLLM as an inference gateway should:
- **Audit cost tracking** if deploying GPT-6, Claude 5, or Bedrock Converse models—new cost parity tests ensure billing consistency across API bridges, but mismatches may still occur in untested configurations.
- **Avoid relying on `temperature` defaults for Gemini 3 models**—they’re now explicitly injected (fix: PR #38663), which may conflict with upcoming Google model behavior.
- **Be cautious with streaming web search requests**—a known leak in `max_parallel_requests` can lead to rate-limiting or service degradation.
- **Update Redis configurations** if using v1.93.0; the `ssl_check_hostname` bug may break caching and budgeting features until patched.

> ✅ **Actionable Tip:** Enable `store_batch_line_items_in_callbacks` (PR #41691) if you rely on per-request batch analytics—otherwise, JSONL line-level data is lost after file expiration.

---  
*Digest generated from GitHub activity: 2026-10-13 | Source: [BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-13**

#### **1. Today's Highlights**  
The v0.1.906-beta release introduces **browser agent capabilities**, enabling models to interact with web pages via click, scroll, type, and page reading—opening new possibilities for AI agents in research, data extraction, and automation. This update also brings **Qwen-Image-2.1-Turbo support** (8-step image generation), **faster MoE GGUF inference**, **speculative decoding on M-series chips**, and **text-diffusion training**—signaling a major leap in multimodal and efficient model serving.

#### **2. Releases & Breaking Changes**  
- **v0.1.906-beta** (GitHub: [Release Notes](https://github.com/unslothai/unsloth/releases/tag/v0.1.906-beta))  
  - Added `browser_use=True` flag to enable browser interaction in model sessions.  
  - Introduced `UNSLOTH_RETURN_LOGITS` environment variable persistence fix (previously resetting during training).  
  - Speculative decoding now supported on Apple Silicon (M series) via `--speculative_decoding True`.  
  - **Note**: Legacy Studio behavior (`UNSLOTH_STUDIO_KEEP_LEGACY=0`) now properly respected in Docker via `run.sh`.

#### **3. New Model & Hardware Support**  
- **New Models**:  
  - ✅ **Qwen-Image-2.1-Turbo** (GGUF): Fully integrated; generates images in ~8 steps.  
  - ✅ **Ling 3.0** (requested in #8532): Feature request open—support expected in future Studio UI updates.  
  - ✅ **LTX-2.5 Diffusers (FP8/int8)**: Now loads pre-quantized DiTs directly from Hugging Face (`unsloth/LTX-2.5-FP8`), avoiding costly on-the-fly quantization.  
- **Hardware & Backends**:  
  - ✅ **Apple Silicon (M series)**: Full speculative decoding and browser agent support.  
  - ✅ **ROCm (AMD W7900/W7500)**: Improved VRAM management; fixes for `No RAM offload` misbehavior (#10341).  
  - ✅ **LM Studio / Ollama / Custom Folders**: Now visible and manageable in Studio’s On Device view (#13507).  

#### **4. Performance & Optimization**  
- **MoE GGUF Inference**: Up to **3.2x faster** than prior versions due to kernel-level optimizations in the vLLM integration path.  
- **Speculative Decoding (M series)**: Latency reduction of **~40%** on typical reasoning tasks (measured on M3 Max).  
- **Text-Diffusion Training**: New training pipeline reduces diffusion step time by **~65%** vs. standard methods.  
- **Memory Efficiency**: Fixed GPU memory leaks in `vllm_process` teardown path (#13438); now properly releases device cache across CUDA/NPU/XPU backends.

#### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - ❗ **"tapClientLookup: Index 1 out of bounds (length: 0)"** (Issue #10288): Caused random crashes on "New chat" in Desktop App. *Fix PR pending*.  
  - ❗ **Drag & Drop Failure** (Issue #13473): File drop not working in chat window despite visual feedback. *PR #13489 addresses HTML parsing edge case*.  
- **High-Impact Bugs**:  
  - ⚠️ **Browser Agent Drops Page Content** (Issue #13489): When menus lack closing tags (e.g., go.dev), content after menu is lost. *Fixed in PR #13489*.  
  - ⚠️ **Model Still in RAM Despite No Offload** (Issue #10341): AMD ROCm users report models not being unloaded even when "No RAM offload" is checked. *Partially resolved in recent PRs*.  
- **Minor Issues**:  
  - 🟡 **Window Resize Problem (Wayland/GNOME)** (Issue #12845): AppImage fails to resize.  
  - 🟡 **SSL Certificate Flexibility Requested** (Issue #8716): Users want to use custom `.crt/.key` files instead of Cloudflare tunnels.

#### **6. What This Means for Application Developers**  
- **Build Web Agents**: Leverage `browser_use=True` to create autonomous agents that navigate, extract, and act on websites—ideal for research, customer service bots, or price monitoring tools.  
- **Optimize Multimodal Apps**: Use **Qwen-Image-2.1-Turbo** and **LTX-2.5** with FP8/int8 quantization for low-latency image generation without sacrificing quality.  
- **Deploy Efficiently on Edge Devices**: With **speculative decoding on M-series chips** and **optimized MoE GGUF kernels**, you can run complex models locally with minimal latency.  
- **Avoid Hidden Pitfalls**: Always check `UNSLOTH_RETURN_LOGITS` persists during training; use `--models-dir` for local model management (PR #13435).  
- **Future-Proof Your Stack**: Monitor PRs like #13517 (audio model selector fix) and #13519 (audio.cpp umbrella repo handling) to ensure compatibility with upcoming audio and model management features.

> 🔗 **Explore the full changelog**: [unslothai/unsloth @ v0.1.906-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.906-beta)  
> 🔗 **Track critical issues**: [GitHub Issues Dashboard](https://github.com/unslothai/unsloth/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*