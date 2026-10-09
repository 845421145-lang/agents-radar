# AI Infrastructure Digest 2026-10-09

> Generated: 2026-10-09 02:28 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

---

### **1. Ecosystem Overview**  
The AI infrastructure landscape in October 2026 is defined by rapid convergence between high-performance inference engines, optimized local runtimes, and unified agent gateways—driven by demand for low-latency, scalable, and cost-efficient LLM serving. Projects like vLLM and SGLang are pushing the boundaries of speculative decoding and long-context optimization, while llama.cpp and Ollama focus on edge-native deployment and cross-platform portability. Meanwhile, LiteLLM consolidates multi-provider interoperability, and Unsloth accelerates end-to-end fine-tuning for structured reasoning. The ecosystem is increasingly bifurcated: **high-end clusters** (vLLM, SGLang) target enterprise-scale inference with advanced kernel optimizations, while **edge/local-first** stacks (llama.cpp, Ollama, Unsloth) prioritize memory efficiency, quantization, and hardware diversity.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑/↓) | PRs Merged (↑/↓) | Releases (vX.X.X) | Status |
|---------------|-------------------|------------------|-------------------|--------|
| **vLLM**      | 147 (+8)          | 32 (+5)          | None              | Stable (v0.31.x), but critical regressions |
| **SGLang**    | 132 (+6)          | 29 (+4)          | None              | Active development; CI instability |
| **llama.cpp** | 119 (+10)         | 38 (+7)          | v11514–b11501     | Patch-level updates; stability concerns |
| **Ollama**    | 164 (+12)         | 17 (+3)          | v0.40.2           | Recent regression spikes (Apple Silicon) |
| **LiteLLM**   | 145 (+5)          | 22 (+2)          | v1.106.0-dev.2    | Telemetry & security focus; memory leaks |
| **Unsloth**   | 98 (+3)           | 41 (+10)         | v0.1.905-beta     | Major feature release; decision model launch |

> ✅ *Trend*: **Unsloth leads in PR velocity**, driven by beta release activity. **Ollama and vLLM** show highest issue volume due to production-critical regressions.

---

### **3. Model Support Race**

| New Model / Architecture            | Supported By                     | Notes |
|-------------------------------------|----------------------------------|-------|
| **Qwen3.8-Flash-Next (FP8/MXFP4)** | vLLM (ROCm/gfx950), SGLang, llama.cpp (b11507+) | vLLM leads in ROCm + FP8 support; llama.cpp enables MoE across GPUs |
| **GLM-5.3-Flash**                   | vLLM (SM120), SGLang (DFlash)    | vLLM has AITER prefill gains; SGLang reports output degeneration |
| **Gemma4ForSequenceClassification** | vLLM (#43726)                    | Only project with dedicated support |
| **MiniMax-M3 DSpark**               | SGLang (#33673)                  | First to enable speculative decoding with this model |
| **Jev-style Decision Models**       | **Unsloth (v0.1.905-beta)**     | **First full-stack support** for structured reasoning models |
| **Gemma 4 (OpenRouter)**            | LiteLLM (#26973)                 | Only project with official pricing and context window data |
| **Qwen-Image-2.1-Q4_K_M (GGUF)**    | Unsloth (#11792)                 | Exclusive GGUF support at scale |

> 🏆 **Winner**: **Unsloth** leads in innovation with decision model training; **vLLM** leads in hardware-optimized model support (especially SM120/ROCm); **LiteLLM** wins in ecosystem integration.

---

### **4. Performance Frontier**

| Optimization Focus             | Leading Projects                          | Key Developments |
|-------------------------------|-------------------------------------------|------------------|
| **KV Cache Efficiency**        | vLLM, SGLang, llama.cpp                   | vLLM fixes `fp8` OOM; SGLang optimizes radix cache; llama.cpp improves Vulkan deep KV |
| **Speculative Decoding**       | vLLM, SGLang                              | vLLM: MTP acceptance failure; SGLang: repetition in GLM-5.3 |
| **Kernel-Level Optimization**  | **llama.cpp**, vLLM                       | llama.cpp’s CUDA top-k reduces kernel launches 5,000x; vLLM optimizes AITER indexing |
| **Distributed & Multi-GPU**    | **llama.cpp (MoE over GPUs)**, vLLM       | llama.cpp enables 93.7 GiB MoE models across 2×4090; vLLM adds prefix caching |
| **Quantization & Memory**      | Unsloth, llama.cpp, Ollama                | Unsloth: 30% VRAM savings via MoE spill; llama.cpp: FP16 → FP32 silent fallback |
| **Edge & Local Serving**       | **Ollama**, **llama.cpp**, **Unsloth**   | Ollama: MLX panic on M-series; Unsloth: Web search cleanup for readability |

> 🔥 **Frontier Insight**: **llama.cpp** dominates kernel-level low-level optimizations; **vLLM** leads in cluster-scale inference performance; **Unsloth** redefines what's possible in local fine-tuning and agent UX.

---

### **5. Layer Positioning**

| Project       | Layer Position                          | Core Differentiation |
|---------------|-----------------------------------------|------------------------|
| **vLLM**      | High-performance inference engine       | Optimized for large-scale, cloud-native serving (NVIDIA/AMD) |
| **SGLang**    | Advanced inference orchestrator           | Specializes in speculative decoding, scheduler tuning, and distributed attention |
| **llama.cpp** | Local runtime / portable inference        | Focuses on CPU/GPU portability, embedded systems, and low-level kernel tuning |
| **Ollama**    | Developer gateway / local model manager   | Simplifies local model deployment; strong CLI and UI for non-experts |
| **LiteLLM**   | Multi-provider inference gateway          | Acts as abstraction layer across 100+ providers; prioritizes telemetry and cost control |
| **Unsloth**   | End-to-end fine-tuning + inference stack  | Unique integration of training, export, and serving for structured reasoning |

> 📊 **Strategic Segmentation**:  
> - **Cloud/Enterprise**: vLLM, SGLang  
> - **Edge/Local**: llama.cpp, Ollama  
> - **Gateway/Abstraction**: LiteLLM  
> - **Fine-Tuning + Agent Workflows**: **Unsloth**

---

### **6. Trend Signals**

#### **Emerging Industry Trends**:
1. **Structured Reasoning is Now a Feature, Not a Hack**  
   Unsloth’s launch of Jev-style decision models signals a shift from “general-purpose” LLMs to **specialized, verifiable agents**. This trend will drive demand for frameworks that support **confidence scoring**, **output validation**, and **audit trails**.

2. **Speculative Decoding Is Still Unstable at Scale**  
   Multiple projects (vLLM, SGLang) report **critical regressions in speculative decoding**—especially with Qwen3.8-Flash-Next and GLM-5.3-Flash. This indicates that even mature systems struggle with correctness under high concurrency, limiting real-world agentic use.

3. **Hardware Diversity Is Driving Innovation**  
   Projects like **llama.cpp (Vulkan, SYCL)** and **vLLM/SGLang (ROCm, XPU, Apple Silicon)** are actively expanding support beyond NVIDIA. This reflects a strategic push toward **vendor-agnostic inference**, especially for Intel, AMD, and Apple ecosystems.

4. **Memory & Quantization Are Still the Bottleneck**  
   Silent FP32 fallbacks (llama.cpp), FP8 OOMs (vLLM), and MLX panics (Ollama) reveal that **quantization and memory management remain fragile**—especially on edge devices and older hardware.

5. **Observability & Cost Control Are Becoming Non-Negotiable**  
   LiteLLM’s telemetry pipeline and token billing fixes highlight growing pressure to **track costs, detect leaks, and ensure auditability** in production deployments—especially for multi-provider workflows.

#### **What Developers Should Watch**:
- ✅ **Avoid `kv_cache_dtype="fp8"` with speculative decoding or prefix caching** until vLLM fixes (#60174, #60350).
- ✅ **Do not deploy GLM-5.3-Flash in agentic workloads**—output degrades after repeated use (Issue #56868).
- ✅ **Upgrade to `b11514` or `v0.1.905-beta`** for best performance and new features.
- ✅ **Monitor Intel OpenVINO integration (Ollama #2169)**—this could be pivotal for serverless inference on Intel hardware.
- ✅ **Use `unsloth serve` or `vllm serve`** for low-latency, 4-bit quantized decision agents.

> 🚨 **Bottom Line**: The infrastructure layer is maturing—but **stability and correctness still lag behind performance claims**. Prioritize **verified releases**, **thorough testing**, and **observability** when building production-grade AI agents.

---  
*Generated: 2026-10-09 | Source: Cross-project digest analysis*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-09**

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its focus on multi-modal and long-context inference, with critical performance improvements for GLM-5.3-Flash and Qwen3.8-Flash-Next on both NVIDIA (SM120) and AMD ROCm (gfx950) platforms. Key PRs include optimizations for AITER prefill indexing and FP8 KV cache stability, while high-severity regressions in speculative decoding and prefix caching have triggered urgent fixes.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes observed. The ongoing v0.31.x series remains stable, though several issues indicate potential instability in `kv_cache_dtype="fp8"` and MTP speculative decoding under high concurrency.

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Added support for `Qwen3.8-Flash-Next` (FP8, MXFP4) on ROCm (gfx950), with dedicated optimization tracking via [Issue #59575](https://github.com/vllm-project/vllm/issues/59575).  
  - New PRs target `GLM-5.3-Flash` on SM120 (Blackwell) with optimized sparse attention and indexer top-k logic ([PR #60753](https://github.com/vllm-project/vllm/pull/60753)).  
  - Initial support for `Gemma4ForSequenceClassification` via [Issue #43726](https://github.com/vllm-project/vllm/issues/43726).

- **Hardware & Backend**:  
  - Enhanced ROCm (AMD MI355X, gfx950) support: kernel fusion for Qwen3-Next/Qwen3.5 (`fused_qk_rmsnorm_rope_gate`) now enabled ([PR #51406](https://github.com/vllm-project/vllm/pull/51406)).  
  - Intel XPU support extended to register pinned host memory for KV offload ([PR #51956](https://github.com/vllm-project/vllm/pull/51956)).  
  - CUDA 13.3 + sm_120 (RTX PRO 5000 Blackwell) now supported for DSpark/DSpark+prefix caching — but with known corruption in `fp8` mode ([Issue #60174](https://github.com/vllm-project/vllm/issues/60174)).

---

### **4. Performance & Optimization**  
- **GLM-5.3-Flash (SM120)**:  
  - AITER prefill indexer top-k reduced from **1.9ms per layer** to near-zero via row sharding across TP ranks ([PR #54951](https://github.com/vllm-project/vllm/pull/54951)). At 512k ISL, this saves **~350ms per final chunk** across 11 layers.  
  - Internal prefill checkpoints enable deeper alignment in `mamba_cache_mode="align"` ([PR #60659](https://github.com/vllm-project/vllm/pull/60659)).

- **ROCm (gfx950 / MI355X)**:  
  - Qwen3.8-Flash-Next performance optimization roadmap launched ([Issue #59575](https://github.com/vllm-project/vllm/issues/59575)), targeting 15–25% decode speedups.  
  - Fused QK-norm+RoPE+gate Triton kernel now active for Qwen3-Next ([PR #51406](https://github.com/vllm-project/vllm/pull/51406)).

- **FP8 & Memory Efficiency**:  
  - Fix for `fp8` KV cache OOM due to CUDA graph memory exclusion ([Issue #60350](https://github.com/vllm-project/vllm/issues/60350)).

---

### **5. Stability & Regressions**  
- **Critical**:  
  - **GLM-5.3-Flash long-decode degeneration** after accumulated reasoning decode ([Issue #56868](https://github.com/vllm-project/vllm/issues/56868), 39 comments): Output degrades into "word salad" after repeated use. High priority; no fix yet.  
  - **Qwen3.8-27B NVFP4 + DFlash2/DSpark + prefix caching corrupts output** on v0.30/0.31 ([Issue #60174](https://github.com/vllm-project/vllm/issues/60174), 24 comments): Regression introduced in v0.30.0; v0.29.0 is stable.

- **High Severity**:  
  - **Qwen3.8-flash-next fails at 0% MTP acceptance rate** in disaggregated PD serving ([Issue #59642](https://github.com/vllm-project/vllm/issues/59642), 10 comments): Blocks speculative decoding in production-scale setups.  
  - **FP8 KV cache startup OOM** due to missing CUDA graph budgeting ([Issue #60350](https://github.com/vllm-project/vllm/issues/60350)): Prevents deployment on 24GB GPUs.

- **Other Notable Bugs**:  
  - `rank` in `logprob_token_ids` returns request index, not vocab rank ([Issue #60357](https://github.com/vllm-project/vllm/issues/60357)).  
  - AudioSpec misbehaves with mono input ([Issue #59267](https://github.com/vllm-project/vllm/issues/59267)).

---

### **6. What This Means for Application Developers**  
- **Avoid `kv_cache_dtype="fp8"`** on v0.30+ if using `DFlash2/DSpark` or `prefix caching`—expect data corruption. Use v0.29.0 or wait for fix PRs.  
- **Do not deploy GLM-5.3-Flash in agentic workloads** until Issue #56868 is resolved—output quality degrades over time.  
- **Use `--max_num_scheduled_tokens=1`** to avoid hangs (fix in PR #60714).  
- **Enable `VLLM_ROCM_USE_AITER=1` cautiously**—it causes accuracy collapse at high concurrency on MI355X ([Issue #60160](https://github.com/vllm-project/vllm/issues/60160)).  
- **Leverage AITER prefill optimizations** for long-context models like GLM-5.3-Flash and Qwen3.8-Flash-Next—significant latency gains expected post-merge.  

> 🔗 *Monitor PRs #60753, #54951, #60174, and #56868 for real-world impact.*

---  
*Digest generated: 2026-10-09 | Source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-09**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to strengthen its support for advanced inference patterns, with critical work on speculative decoding stability (especially for GLM-5.3 and DeepSeek V4.1) and improved CI reliability. Key PRs focus on optimizing scheduling, KV cache management, and cross-platform compatibility—particularly for NVIDIA SM121, Intel XPU, and Apple Silicon. A major regression in `torch.compile`-based deterministic inference has been flagged, highlighting ongoing challenges in high-performance execution.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. Users should continue monitoring CI health via [Issue #42752](https://github.com/sgl-project/sglang/issues/42752) and [Issue #17050](https://github.com/sgl-project/sglang/issues/17050) for ongoing infrastructure issues.

---

### **3. New Model & Hardware Support**  
- ✅ **MiniMax-M3 DSpark**: Added speculative decoding support via PR [#33673](https://github.com/sgl-project/sglang/pull/33673), enabling draft-target pairing with MiniMax-M3 as the main model.
- ✅ **Intel XPU DCP**: PR [#34355](https://github.com/sgl-project/sglang/pull/34355) enables decode context parallelism (`--dcp-size > 1`) on Intel XPU, expanding support for distributed attention.
- ✅ **Apple Silicon Serving Redesign**: RFC [#32321](https://github.com/sgl-project/sglang/issues/32321) outlines a full redesign leveraging Torch-owned SRT path with exported MLX region—critical for native Metal performance.
- ✅ **Qwen3.5 FP8 KV Cache**: PR [#37446](https://github.com/sgl-project/sglang/pull/37446) adds proper FP8 KV-cache scale loading, resolving startup failures under `--kv-cache-dtype fp8_e4m3`.

---

### **4. Performance & Optimization**  
- 🔧 **DeepSeek V4.1 Optimization**: Ongoing refactor targeting mHC cleanup (#42245), fused `q_rope_store` (#41657), and future SP+engram fusion (#43065). This aims to improve prefill efficiency and reduce memory overhead.
- ⚙️ **SM121 Tuning Needs**: PR [#36796](https://github.com/sgl-project/sglang/pull/36796) identifies QSA/PLE/GDN kernels as dominant bottlenecks on DGX Spark (GB10/SM121), requesting community input on kernel tuning and CUDA graph optimization.
- 📈 **Unified Radix Cache**: PR [#43253](https://github.com/sgl-project/sglang/pull/43253) optimizes disabled radix cache behavior by skipping unnecessary event tracking and eviction config, improving startup time and reducing overhead.
- 🔄 **Scheduler Startup Overlap**: PR [#43177](https://github.com/sgl-project/sglang/pull/43177) introduces overlap between scheduler launch and data parallel controller initialization—reducing cold-start latency in large-scale deployments.

---

### **5. Stability & Regressions**  
- 🛑 **Severe Repetition in GLM-5.3 with DFLASH**: Issue [#40843](https://github.com/sgl-project/sglang/issues/40843) reports degenerate output (endless `!`) under complex agentic prompts with multi-tool usage—likely due to speculative decoding misbehavior.
- ⚠️ **Deterministic Inference Crash**: Issue [#43061](https://github.com/sgl-project/sglang/issues/43061) shows that `--enable-deterministic-inference` + `repetition_penalty` triggers `InternalTorchDynamoError` in `apply_scaling_penalties` on granite-4.0-h—regression likely from recent `torch.compile` integration.
- ⚠️ **Zombie Requests After Disconnection**: Issue [#36333](https://github.com/sgl-project/sglang/issues/36333) describes lingering requests after client disconnect, leading to "state was deleted" floods—regression from revert of #34160.
- ❗ **Falcon-H1 Illegal Memory Access**: Issue [#42774](https://github.com/sgl-project/sglang/issues/42774) reports crash on first request under default breakable prefill CUDA graph—potential kernel boundary error.

> *Note: Fix PRs exist for some regressions (e.g., #43177 for scheduler delay), but none are merged yet.*

---

### **6. What This Means for Application Developers**  
- Avoid `--enable-deterministic-inference` with `repetition_penalty` until [#43061](https://github.com/sgl-project/sglang/issues/43061) is resolved—it may cause crashes in production.
- If using **GLM-5.3-Flash** with complex tool calls, expect potential output degradation; test with simpler prompts or disable speculative decoding temporarily.
- For **multi-node or high-throughput systems**, consider upgrading to latest `main` to benefit from scheduler startup optimizations (PR #43177).
- When deploying on **Intel XPU or Apple Silicon**, leverage new support in PRs [#34355](https://github.com/sgl-project/sglang/pull/34355) and [#32321](https://github.com/sgl-project/sglang/issues/32321)—but be aware of experimental status.
- Monitor CI health closely: flaky tests ([#42752](https://github.com/sgl-project/sglang/issues/42752)) may delay merges and impact release stability.

> 👉 *Join Slack at [slack.sglang.ai](https://slack.sglang.ai) for real-time updates and debugging help.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

---

### **llama.cpp Digest — 2026-10-09**

#### **1. Today's Highlights**  
The latest round of updates centers on **CUDA and Vulkan kernel optimizations**, with critical fixes for top-k performance, Flash Attention scalability, and MoE caching across multiple GPUs. A major improvement in CUDA’s top-k algorithm reduces kernel launches by over 5,000x on large sequences (34,816 tokens), while new Vulkan row-slicing techniques improve deep-context prefill efficiency on RDNA3 hardware.

#### **2. Releases & Breaking Changes**  
- **v11514–b11501**: No breaking API changes reported. All releases are patch-level updates focused on backend stability and performance.
- **macOS Apple Silicon (arm64)**: New binaries available at [https://github.com/ggml-org/llama.cpp/releases/download/b11514/llama-b11514-bin-mac-arm64.zip](https://github.com/ggml-org/llama.cpp/releases/download/b11514/llama-b11514-bin-mac-arm64.zip) (latest).
- **Attestations**: Verified builds now available via [attestation link for b11514](https://github.com/ggml-org/llama.cpp/attestations/54083178).

#### **3. New Model & Hardware Support**  
- ✅ **MoE Cache Over Multiple GPUs** (`PR #30112`): Now supports distributed expert caching across multi-GPU setups (e.g., 2× RTX 4090). Benchmarks show 93.7 GiB model handling with 65 GiB of experts efficiently split.  
  → [GitHub PR #30112](https://github.com/ggml-org/llama.cpp/pull/30112)
- ✅ **MUSA FWHT Fix** (`PR #30167`): Resolves shared memory overflow issue on MUSA `mp_21` devices, enabling Q5_K and F16 FWHT kernels to run without failure.  
  → [GitHub PR #30167](https://github.com/ggml-org/llama.cpp/pull/30167)
- ✅ **Vulkan Workaround for Intel Windows Memory Reporting** (`PR #29835`): Fixes incorrect free memory reporting when `heapBudget > total memory`.  
  → [GitHub PR #29835](https://github.com/ggml-org/llama.cpp/pull/29835)

#### **4. Performance & Optimization**  
- 🚀 **CUDA Top-K Optimization** (`PR #28713`): Replaced CUB’s per-row `DeviceTopKKernel` with a **radix-select grid-over-rows** approach. On Qwen4exp at 34,816 tokens:  
  - Kernel launches reduced from **1,671,253 → 5,761** (≈99.7% reduction)  
  - Threshold gated via `GGML_CUDA_TOPK_RADIX_MIN_ROWS`  
  → [GitHub PR #28713](https://github.com/ggml-org/llama.cpp/pull/28713)
- 🔧 **Vulkan Deep KV Optimization** (`PR #30191`, `#30190`):  
  - Slices flash attention dispatches into 512-row chunks for deep KV contexts (>12,288 rows), reducing GPU occupancy spikes.  
  - Packed 2 query tokens + GQA heads into one tile to reuse KV data, improving bandwidth utilization.  
  → [GitHub PR #30191](https://github.com/ggml-org/llama.cpp/pull/30191), [PR #30190](https://github.com/ggml-org/llama.cpp/pull/30190)
- 💡 **SYCL OpenCL Optimizations** (`PR #30182–#30184`): Fuse residual add into RMSNorm, optimize chunked gated delta net, and enable multi-head decode on Adreno A6x GPUs.  
  → [GitHub PRs #30182–#30184](https://github.com/ggml-org/llama.cpp/pulls?utf8=%E2%9C%93&q=author%3A%22wanghqc%22+is%3Amerged)

#### **5. Stability & Regressions**  
| Issue | Severity | Summary | Status |
|------|----------|--------|--------|
| [#29811](https://github.com/ggml-org/llama.cpp/issues/29811) | High | Crash on startup with `Qwen3.8-Flash-Next` + MTP draft model | Open |
| [#30000](https://github.com/ggml-org/llama.cpp/issues/30000) | High | 16–19% slower prompt processing on RTX 5060 Ti (Vulkan, Q8_0) since #25773 | Open |
| [#25593](https://github.com/ggml-org/llama.cpp/issues/25593) | Critical | FP32 math silently used on SM_60 (P100) despite FP16 model → quality loss | Open (fix merged in forks) |
| [#26447](https://github.com/ggml-org/llama.cpp/issues/26447) | High | `vk::Queue::submit: ErrorDeviceLost` after ~50K context on Vega 8 iGPU | Open |
| [#27612](https://github.com/ggml-org/llama.cpp/issues/27612) | Medium | ROCm HIP build fails silently with VSCode + lemonade server | Closed |

> ⚠️ **Note**: Several regressions involve speculative decoding (MTP/DFlash), context reuse, and compute buffer management—critical for production agents.

#### **6. What This Means for Application Developers**  
- **For LLM Agents & Gateways**: Use `--spec-type draft-mtp` with caution—recent issues suggest silent OOM and correctness risks. Monitor `cache_prompt=false` behavior; PR #30188 skips unnecessary checkpoints, improving throughput for transient tasks.
- **For Multi-GPU Deployments**: Enable `MoE cache over multiple GPUs` (b11507+) to scale large models like Qwen3.8-Flash across 2×4090s without dropping expert state.
- **For Edge/Embedded Systems**: Optimize Vulkan performance on Intel Arc (via PR #30191/#30190) and avoid AMD Radeon 5700XT/MoltenVK stack crashes (see #15846).
- **For Model Serving**: Avoid `FP16` on legacy SM_60 (P100) due to silent FP32 fallback. Prefer `Q4_K_M` or `Q5_K` with newer backends (CUDA/SYCL).
- **For CI/CD Pipelines**: Pin versions to `b11514` or later to benefit from top-k radix optimization and MoE multi-GPU support.

👉 **Recommended Action**: Upgrade to `b11514` or `b11507` for stable MoE and CUDA top-k gains. Monitor open issues around MTP and Vulkan on low-end GPUs.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-09**

---

### **1. Today's Highlights**  
The latest release, v0.40.2, includes a minor fix to hide duplicate and downgrade guards from the model list, improving clarity in `ollama list` output. A significant number of stability issues were reported today—particularly around MLX runtime panics on Apple Silicon (M-series) devices with `qwen3.6:35b-mlx` and `gemma4:e2b-mlx`, indicating potential regressions from v0.40.0. Additionally, multiple users are experiencing crashes during inference on Intel systems, prompting renewed interest in OpenVINO integration for optimized CPU/GPU workloads.

---

### **2. Releases & Breaking Changes**  
- **v0.40.2**: Released with two key fixes:  
  - 📌 *Hide duplicate and downgrade guards from model list* ([#18874](https://github.com/ollama/ollama/pull/18874)) — improves UX by reducing clutter in `ollama list`.  
  - 📌 *Add oxi to community integrations* ([#18739](https://github.com/ollama/ollama/pull/18739)) — expands ecosystem visibility.  
  > No breaking API or config changes observed.

---

### **3. New Model & Hardware Support**  
- **Intel OpenVINO Integration Requested** ([#2169](https://github.com/ollama/ollama/issues/2169), 👍95): Users demand automatic OpenVINO fallback on Intel CPUs/GPUs for efficient inference, citing performance gains seen in LLAVA examples. This is critical for users leveraging Intel Arc GPUs or NPU accelerators (e.g., Intel Core Ultra).  
- **MLX Runtime Limitations on M-Series Macs**: Multiple PRs and issues highlight MLX runner panics due to threadgroup limits (e.g., `Maximum threads per threadgroup is 896 but requested 1024`) when running large models like `qwen3.6:35b-mlx` ([#18871](https://github.com/ollama/ollama/issues/18871), [#18856](https://github.com/ollama/ollama/issues/18856)).  
- **New Model Requests**:  
  - Index Translate family models ([#18871](https://github.com/ollama/ollama/issues/18871)) — popular on Hugging Face for translation.  
  - Cloud variants of Qwen 3.8 Flash, Mimo V2.6, Hy4, Stepfun, Laguna, Reflection AI ([#18850](https://github.com/ollama/ollama/issues/18850)) — expanding cloud model diversity.

---

### **4. Performance & Optimization**  
- **GGUF Migration & Legacy Compatibility**: The PR [#18882](https://github.com/ollama/ollama/pull/18882) removes legacy llama.cpp patches and migrates GGUFs on load, enabling cleaner disk usage and faster startup via atomic manifest updates.  
- **Multimodal Embedding Support**: OpenAPI spec now describes multimodal inputs (`text`, `image`, `audio`) in `api.EmbedRequest` ([#18884](https://github.com/ollama/ollama/pull/18884)), paving the way for richer embedding workflows.  
- **Context Window Handling**: Fixing improper truncation behavior that caused `500: no user query found` errors in tool-heavy flows ([#17894](https://github.com/ollama/ollama/pull/17894)) improves reliability for long-context agents.

---

### **5. Stability & Regressions**  
**Critical Issues Reported (High Severity)**:  
1. **MLX Runner Panic on Apple Silicon** ([#18856](https://github.com/ollama/ollama/issues/18856)): `panic: mlx: Maximum threads per threadgroup is 896 but requested 1024` with `qwen3.6:35b-mlx` in v0.40.x — confirmed regression from v0.35.0.  
2. **Gemma4 Model Fails with Large Context** ([#18865](https://github.com/ollama/ollama/issues/18865)): `n_ubatch` forced to `n_ctx`, causing OOM even at default `16384` context size due to unbounded buffer growth.  
3. **OpenAI-Compatible Endpoint Crashes** ([#18869](https://github.com/ollama/ollama/issues/18869)): `ffn_down_exps.weight size overflows` error on `gpt-oss:latest` (Linux/NVIDIA) — likely a quantization or kernel mismatch.  

**Fixes in Progress**:  
- [#18886](https://github.com/ollama/ollama/pull/18886): Preserve generation panics during cleanup — prevents masking original errors.  
- [#18881](https://github.com/ollama/ollama/pull/18881): Include EOS tokens in raw generate responses — addresses token loss in low-level APIs.

---

### **6. What This Means for Application Developers**  
- **Avoid v0.40.x on Apple Silicon**: If using `mlx`-backed models (especially `qwen3`, `gemma4`), stick to v0.35.1 until [#18856](https://github.com/ollama/ollama/issues/18856) is resolved.  
- **Expect Context Truncation Bugs in Tool Workflows**: Use `num_ctx` explicitly and validate message history handling; avoid relying on auto-truncation without testing.  
- **Cloud Models Are Unstable**: Several users report empty responses and 500 errors with `deepseek-v4.1-flash:cloud` and `qwen3-coder:480b-cloud` — avoid production use until [#12362](https://github.com/ollama/ollama/issues/12362) and [#18853](https://github.com/ollama/ollama/issues/18853) are addressed.  
- **Build Custom Integrations with Caution**: With the shift toward local-compatible GGUFs and removal of legacy patches, ensure your model pipelines account for migration logic (see [#18882](https://github.com/ollama/ollama/pull/18882)).  

> 🔗 *Monitor [GitHub Issue #2169](https://github.com/ollama/ollama/issues/2169) for Intel OpenVINO support — this could be a game-changer for edge and serverless inference on Intel hardware.*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-09**

---

#### **1. Today's Highlights**  
LiteLLM continues to strengthen its enterprise-grade inference infrastructure with new telemetry and security enhancements, including a robust `litellm.telemetry` framework and improved identity validation for response IDs. Critical stability issues around memory leaks and token counting in high-throughput environments remain top concerns, with multiple PRs addressing root causes in streaming, cost accounting, and provider integration.

---

#### **2. Releases & Breaking Changes**  
No breaking changes were introduced in the latest releases (`v1.106.0-dev.2`, `v1.105.0-rc.3`, `v1.104.2`, `v1.102.4`, `v1.101.6`). All Docker images are signed via **cosign** using a consistent key (introduced in [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)), reinforcing supply chain integrity. No migration notes apply at this time.

---

#### **3. New Model & Hardware Support**  
- ✅ **Gemma 4 models** added to `model_prices_and_context_window.json` ([#26973](https://github.com/BerriAI/litellm/issues/26973)) – supports `gemma-4-31b-it` and `gemma-4-26b-a4b-it` on OpenRouter.  
- ✅ **GPT-6.1 Sol Ultrafast tier pricing** now supported for AWS Bedrock ([#45482](https://github.com/BerriAI/litellm/pull/45482)).  
- ✅ **Microsoft 365 Copilot** chat provider added with OAuth token exchange support ([#45158](https://github.com/BerriAI/litellm/pull/45158)).  
- ✅ **GitHub Copilot per-user OAuth connections** enabled via "Per-user GitHub OAuth" auth type ([#45241](https://github.com/BerriAI/litellm/pull/45241)).

---

#### **4. Performance & Optimization**  
- 📈 **Telemetry aggregation pipeline** launched: `AggregatingSink`, fixed-bucket histograms, and `HttpExporter` reduce noise while preserving observability ([#45487](https://github.com/BerriAI/litellm/pull/45487)).  
- ⚙️ **Clock injection in logging handlers** prevents minute-boundary race conditions in cost tracking ([#45486](https://github.com/BerriAI/litellm/pull/45486)).  
- 🔧 **Optimized TLS configuration**: Custom TLS settings now correctly applied per-call without leaking into request bodies ([#38245](https://github.com/BerriAI/litellm/pull/38245)).  
- 💡 **Streaming performance**: Fixes for `streamGenerateContent` retries and malformed chunk handling improve reliability under network stress ([#45457](https://github.com/BerriAI/litellm/issues/45457), [#43487](https://github.com/BerriAI/litellm/issues/43487)).

---

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR? | Notes |
|------|----------|--------|--------|-------|
| [#12685](https://github.com/BerriAI/litellm/issues/12685) – Heavy RAM usage over time | 🔴 High | Closed | ✅ Yes | Memory leak identified in long-running proxy instances; fix pending in internal tracking. |
| [#45422](https://github.com/BerriAI/litellm/issues/45422) – GitHub BYOK token count shows zero after v1.103.1 | 🔴 High | Open | ❌ No | Regression between v1.103.1 and v1.104.2; impacts Copilot billing visibility. |
| [#35524](https://github.com/BerriAI/litellm/issues/35524) – Budgeted requests skip reservation when cost can't be estimated | 🟡 Medium | Closed | ✅ Yes | Fixed in latest release cycle. |
| [#45457](https://github.com/BerriAI/litellm/issues/45457) – Vertex AI stream drops before first chunk never retried | 🟡 Medium | Open | ❌ No | Stream retry logic bypasses `num_retries` on early connection loss. |
| [#45378](https://github.com/BerriAI/litellm/issues/45378) – Mistral tool call citations dropped during streaming | 🟡 Medium | Open | ❌ No | `reference` chunks lost due to truncation in `content` list handling. |

> **Note:** Multiple open issues highlight instability in cost accounting, streaming, and state management—particularly under load or in multi-pod deployments.

---

#### **6. What This Means for Application Developers**  
- **Use `v1.105.0-rc.3` or later** for better telemetry, security, and model coverage—especially if leveraging Microsoft 365 Copilot, GitHub Copilot per-user auth, or Gemma 4 models.  
- **Avoid `v1.104.2`** if you rely on accurate token billing via GitHub BYOK—this version contains a regression that zeroes out consumed token counts.  
- **Monitor RAM usage closely** in production proxies; known memory leaks persist despite fixes being in review. Consider restarting proxies every 48–72 hours until resolved.  
- **Leverage new telemetry sinks** (`AggregatingSink`, `HttpExporter`) to reduce log volume and gain insight into feature adoption and request stability.  
- **Validate streaming behavior** for Mistral and Google Vertex AI, especially when using `tool_calls`, `logprobs`, or `stream=True` together—partial responses may be truncated or dropped.

> 🔗 **Recommended Actions**:  
> - Review [telemetry design](https://github.com/BerriAI/litellm/pull/45484) for observability improvements.  
> - Monitor [open stability issues](https://github.com/BerriAI/litellm/issues?q=is%3Aopen+label%3Abug+sort%3Aupdated-desc) for real-time updates.  
> - Use signed Docker images with cosign verification for secure deployments: [Verify Image Signature](https://docs.sigstore.dev/cosign/overview/).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-09**

---

### **1. Today's Highlights**  
Unsloth launches **v0.1.905-beta**, introducing full support for training *Jev-style decision models* directly from the framework—boosting decision accuracy from ~30% to 80%. This enables end-to-end fine-tuning, testing, exporting, and serving of structured reasoning models. Simultaneously, major UX and inference improvements land in Unsloth Studio, including better model companion downloads, live React previews, and enhanced web search integration.

---

### **2. Releases & Breaking Changes**  
- **v0.1.905-beta**: Official release with new decision model training pipeline and native ComfyUI support.  
  🔗 [GitHub Release v0.1.905-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.905-beta)  
  ✅ Includes: `FastLanguageModel.from_pretrained()` now supports `decision_model=True`, and exported models can be served via `unsloth serve` or VLLM.  
  ⚠️ Migration note: Existing SFT/GRPO workflows remain compatible, but decision-specific training requires new `DecisionTrainer` class (in progress).

---

### **3. New Model & Hardware Support**  
- **Decision Models**: Full support for turning any text or vision LLM into a structured decision engine (e.g., Jev-style), validated on Mistral-Small-24B and Qwen-Image-2.1.  
  🔗 [Issue #1886](https://github.com/unslothai/unsloth/issues/1886) (closed, merged into v0.1.905-beta)  
- **Hardware**: Improved handling of MoE models spilling to RAM on GPU systems (via `--moe-cache-mib auto` and `--ubatch-size 2048`).  
  🔗 [PR #12951](https://github.com/unslothai/unsloth/pull/12951), [PR #12950](https://github.com/unslothai/unsloth/pull/12950)  
- **Quantization**: Native GGUF support extended to Qwen-Image-2.1-Q4_K_M (tested on M5 Max with 48GB RAM).  
  🔗 [Issue #11792](https://github.com/unslothai/unsloth/issues/11792)

---

### **4. Performance & Optimization**  
- **Inference Speed**: Unsloth’s internal kernel patches continue to deliver **~2x faster inference** on supported GPUs (RTX 30xx/40xx, H200, A100).  
  🔗 [Issue #1886](https://github.com/unslothai/unsloth/issues/1886) confirmed working with VLLM via `bitsandbytes` quantization.  
- **Memory Efficiency**: MoE expert caching optimization reduces VRAM pressure by up to **~30%** when experts spill to CPU/RAM.  
  🔗 [PR #12951](https://github.com/unslothai/unsloth/pull/12951)  
- **Web Search & Tool Integration**: Web page parsing now skips 1–2MB of inline JS/CSS, improving readability and reducing context loss.  
  🔗 [PR #13100](https://github.com/unslothai/unsloth/pull/13100)

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |  
|------|----------|--------|--------|  
| `AssertionError` in dynamic quantized model serving with VLLM | High | Closed | [PR #1886](https://github.com/unslothai/unsloth/pull/1886) |  
| `RuntimeError: PassManager::run failed` on Colab T4 GPU during training | High | Closed | [PR #2482](https://github.com/unslothai/unsloth/pull/2482) |  
| OOM on WSL with 24GB VRAM despite unused memory | High | Closed | [PR #1744](https://github.com/unslothai/unsloth/pull/1744) |  
| `CUDA out of memory` during Llama-4-Scout loading on H200 | High | Closed | [PR #2302](https://github.com/unslothai/unsloth/pull/2302) |  
| `NotImplementedError`: `_reorder_cache` missing for beam search | Medium | Open | [Issue #1099](https://github.com/unslothai/unsloth/issues/1099) |  
| Unsloth crashes on CPU-only Colab with Whisper + unsloth | Critical | Closed | [PR #2575](https://github.com/unslothai/unsloth/pull/2575) |  

> ✅ All high-severity issues resolved in v0.1.905-beta or via PRs. Low-priority regressions (e.g., tokenization edge cases) are being tracked.

---

### **6. What This Means for Application Developers**  
- **Build decision agents**: Use `DecisionTrainer` to train models that output structured decisions (e.g., “Yes/No”, “Go/NoGo”) with confidence scores—ideal for AI ops, compliance, and risk assessment apps.  
- **Deploy efficiently**: Leverage `unsloth serve` or `vllm serve` with 4-bit quantized models (e.g., `unsloth/Mistral-Small-24B-Base-2501-unsloth-bnb-4bit`) for low-latency inference on consumer-grade GPUs.  
- **Enhance agent UX**: Use Studio’s new live React previews (`jsx`/`tsx` blocks) and improved web search to build interactive, real-time agent UIs.  
- **Avoid memory traps**: For large MoE models, ensure you’re using `--moe-cache-mib auto` and `--ubatch-size 2048` in llama-server to prevent OOMs during inference.  
- **Monitor stability**: Avoid `use_gradient_checkpointing="unsloth"` in production until issue #338 is fully resolved; use `gradient_checkpointing=True` as workaround.

👉 **Recommended Action**: Upgrade to **v0.1.905-beta** immediately if building decision engines or deploying to low-VRAM environments. Review [migration guide](https://github.com/unslothai/unsloth/blob/main/docs/migration.md) for breaking changes.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*