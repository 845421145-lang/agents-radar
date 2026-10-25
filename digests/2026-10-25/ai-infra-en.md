# AI Infrastructure Digest 2026-10-25

> Generated: 2026-10-25 00:29 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-25**

---

### **1. Ecosystem Overview**

The AI infrastructure landscape in Q4 2026 is defined by a sharp bifurcation between **high-performance, hardware-optimized inference engines** and **developer-centric, agentic runtime platforms**. Projects like vLLM and SGLang are pushing the envelope in kernel-level efficiency and multi-GPU scaling, while Ollama and Unsloth prioritize seamless local deployment and agent-native UX. A growing emphasis on **multi-modal, speculative decoding, and distributed memory architectures** reflects the maturation of LLM applications beyond text-only serving. Meanwhile, LiteLLM remains the central nervous system for cost-aware, multi-provider routing — but now under heightened scrutiny due to a recent supply chain incident.

---

### **2. Activity Comparison**

| Project       | Open Issues (High+ Sev) | PRs (Last 24h) | Releases (Past 24h) | Status Summary |
|---------------|--------------------------|------------------|------------------------|----------------|
| **vLLM**      | 18                       | 9                | None                   | Stable core, strong ROCm/MLA focus |
| **SGLang**    | 12                       | 7                | None                   | High-severity stability issues; rapid innovation |
| **llama.cpp** | 15                       | 6                | None                   | Critical GPU corruption risks; mobile focus |
| **Ollama**    | 10                       | 5                | **v0.40.11**           | New macOS speech, MLX regressions |
| **LiteLLM**   | 13                       | 8                | **v1.106.3+**          | Security patch + billing fixes |
| **Unsloth**   | 14                       | 4                | None                   | Windows crashes, beta instability |

> ✅ *Note: Ollama leads in release velocity; LiteLLM in critical security response; SGLang and llama.cpp show highest severity issue density.*

---

### **3. Model Support Race**

| Project     | New Models / Architectures Supported |
|-------------|---------------------------------------|
| **vLLM**    | Qwen3-VL (via `/v1/systemone`), DeepSeek-V4.1-Flash (ROCm gfx950), Kimi-K3 (MI355X AgentX), NVFP4 KV cache for MLA models |
| **SGLang**  | SANA-Sprint 0.6B diffusion model (native), Mooncake transfer backend for NPU disaggregation, AMD consumer Radeon support roadmap |
| **llama.cpp** | DSV4.1 Flash (experimental), Sarvam 30B MoE fix, Hexagon/HMX Flash Attention optimization |
| **Ollama**  | Nemotron 3.5 Bolt 74B-A9B (MLX), Gemma 4 vision fine-tuning (dynamic grid rounding), Pixeltable/Knovum/ShibaClaw/Golem integrations |
| **LiteLLM** | Cerebras Llama 3.1 (hyphenated aliases), NVIDIA Nemotron 3.5 Super VL pricing, Azure transcription GA path |
| **Unsloth** | No new models; focus on pipeline parallelism, KV preemption, and Metal GPU robustness |

> 🏆 **Winner**: **vLLM** leads in cutting-edge model/hardware pairing (especially MLA + ROCm).  
> 🚀 **Emerging Leader**: **Ollama** dominates developer experience with ecosystem integrations and novel features (speech synthesis).

---

### **4. Performance Frontier**

| Focus Area             | Leading Projects                                | Key Developments |
|------------------------|--------------------------------------------------|------------------|
| **KV Cache Optimization** | vLLM, Unsloth                              | NVFP4 (38% reduction), reusable KVServe-inspired layer (vLLM RFC), per-instance preemption (Unsloth) |
| **Quantization & Memory** | vLLM, llama.cpp, LiteLLM                    | NVFP4 for dense MLA, SYCL F16 rounding fixes, quantized diffusion correctness |
| **Kernel-Level Efficiency** | vLLM, SGLang, llama.cpp                  | Triton top-k pivot tuning, cross-attention reuse in diffusion (SGLang), Hexagon team splitting |
| **Distributed Serving**   | SGLang, vLLM, Unsloth                      | GLM-5.3 P/D NIXL descriptor bottleneck (vLLM), Mooncake transfer (SGLang), GPipe-style pipeline parallelism (Unsloth) |
| **Batching & Throughput** | SGLang, vLLM                               | reduce-scatter vs all-reduce, fastpath draft preparation, incremental scheduler tracking |

> 🔥 **Trend**: The frontier is shifting from raw speed to **memory-efficient, scalable, and composable inference**, especially for agents and long-context workloads.

---

### **5. Layer Positioning**

| Project     | Primary Layer                     | Differentiator |
|-------------|------------------------------------|----------------|
| **vLLM**    | **Inference Engine**               | Highest throughput, CUDA/ROCm specialization, low-level kernel control |
| **SGLang**  | **Agent-Centric Inference Runtime** | Native diffusion, speculative decoding, unified `api.v1`, multi-modal pipelines |
| **llama.cpp** | **Local Runtime / Edge Execution** | Cross-platform (Metal, Vulkan, SYCL, Hexagon), embedded/mobile focus |
| **Ollama**  | **Developer Gateway / Local UI**   | Seamless `ollama run`, voice output, community tool integrations |
| **LiteLLM** | **LLM Gateway / Cost Orchestration** | Multi-provider routing, budget enforcement, financial accounting |
| **Unsloth** | **Agent Platform / Fine-Tuning Stack** | Pipeline/tensor parallelism, KV preemption, Studio UX polish |

> 📊 **Strategic Insight**: vLLM and SGLang are becoming foundational inference layers; LiteLLM and Ollama are evolving into application gateways; Unsloth is building an end-to-end agent OS.

---

### **6. Trend Signals**

#### 🔍 **Key Industry Trends Extracted**
1. **Hardware Specialization is Accelerating**: ROCm (AMD) and Hexagon (Qualcomm) support is no longer experimental — vLLM and llama.cpp are actively optimizing for MI355X, gfx950, and HTP v75.
2. **Speculative Decoding is Becoming Production-Ready**: Multiple projects (vLLM, SGLang, Unsloth) now feature optimized paths for draft generation, though correctness bugs persist.
3. **Multi-Modal Workflows Are Mainstream**: SGLang’s native diffusion, Ollama’s vision improvements, and vLLM’s Qwen3-VL support signal full convergence of text, image, and audio pipelines.
4. **Security & Trust Are Non-Negotiable**: The LiteLLM PyPI compromise underscores that supply chain integrity is now a core infrastructure requirement — signed images and verification workflows are mandatory.
5. **Agents Demand Composable Memory**: Unsloth’s KV preemption and vLLM’s programmable cache RFC reflect a shift toward **session-aware, dynamic memory management**.

#### 🛠️ **What Developers Should Watch**
- **Avoid v0.32.0 (vLLM)** and **v0.1.910-beta (Unsloth)** until patches land — high-severity crashes affect production use.
- **Monitor LiteLLM’s `BudgetExceededError` and streaming `usage` loss** — these undermine financial reliability in paid services.
- **Prepare for `torch.accelerator` (vLLM RFC #30679)** and `api.v1` migration (SGLang, Ollama) — future-proof your code.
- **Leverage NVFP4 KV cache (vLLM)** where applicable to cut memory by ~38% without precision loss.
- **Use `GGML_CUDA_DISABLE_GRAPHS=1`** if running on RTX 5090 (llama.cpp) — avoid GPU hangs.

> ✅ **Final Takeaway**: The infrastructure stack is maturing rapidly — but with increasing complexity. Choose tools based on **your workload profile**: high-throughput serving → vLLM/SGLang; local agents → Ollama/Unsloth; cost-controlled orchestration → LiteLLM; edge execution → llama.cpp.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-25**

#### **1. Today's Highlights**  
The vLLM project continues to advance its support for next-generation models and hardware, with critical work on speculative decoding optimizations for DeepSeek-V4.1 and Kimi-K3 on ROCm. Key PRs include fastpath improvements for draft preparation on MI355X (gfx950), alignment of NVFP4 KV cache support for dense MLA models, and foundational fixes for KV offload back-pressure detection. A major RFC proposes a reusable, composable KV compression layer for transfer and storage, signaling long-term architectural evolution.

#### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, ongoing changes may affect users:
- `--kv-cache-dtype nvfp4` is now available for dense MLA models (e.g., DeepSeek-V3.1, Kimi-K3) via `FLASHINFER_MLA`, reducing cache footprint from 576B (FP8) to 352B per token per layer.
- `enable_adaptive_verification` is currently gated to SM90/SM100 only—this will likely restrict usage on newer Blackwell SM120 devices until addressed (see [Issue #63343](https://github.com/vllm-project/vllm/issues/63343)).

#### **3. New Model & Hardware Support**  
- **Models**:  
  - Qwen3-VL now supported via `/v1/systemone` endpoint ([PR #62402](https://github.com/vllm-project/vllm/pull/62402)).  
  - DeepSeek-V4.1-Flash (DSv4.1) gains optimized draft-path fastpaths on ROCm gfx950 (MI355X) ([PR #63182](https://github.com/vllm-project/vllm/pull/63182)).  
  - Kimi-K3 now has aligned inference recipes for MI355X AgentX ([PR #63520](https://github.com/vllm-project/vllm/pull/63520)).
- **Hardware / Backends**:  
  - AMD ROCm support expanded: gfx942 (MI325X) and gfx950 (MI355X) receive targeted performance and correctness fixes ([PR #63522](https://github.com/vllm-project/vllm/pull/63522), [PR #63520](https://github.com/vllm-project/vllm/pull/63520)).  
  - New `ROCM_ATTN` backend stability fix for RDNA4 GPUs (Radeon AI PRO R9700) with head sizes ≥96 ([Issue #62697](https://github.com/vllm-project/vllm/issues/62697)).  
  - Experimental support for `torch.accelerator` API to improve hardware portability beyond CUDA ([RFC #30679](https://github.com/vllm-project/vllm/issues/30679)).

#### **4. Performance & Optimization**  
- **Kernel-Level**:  
  - The monolithic Triton top-k kernel now avoids fallback to full-vocab search by improving pivot selection from first 8192 logits (outlier gather misses reduced by ~6–10% on MiMo-V2.6) ([Issue #61998](https://github.com/vllm-project/vllm/issues/61998)).  
  - Draft prepare stage fastpaths introduced for DSV4.1-Flash: shared-output deduplication, parallel pad-tail fix, and KV-only context insert reduce overhead ([PR #63182](https://github.com/vllm-project/vllm/pull/63182)).  
- **Memory & Cache**:  
  - NVFP4 KV cache reduces memory usage by ~38% vs FP8 (352B/token/layer) while maintaining precision for dense MLA models ([PR #63203](https://github.com/vllm-project/vllm/pull/63203)).  
  - Proposal for reusable KV compression layer (KVServe-inspired) aims to cut transfer/storage costs ([RFC #59538](https://github.com/vllm-project/vllm/issues/59538)).  
- **Scaling**:  
  - GLM-5.3 P/D on GB200 shows NIXL descriptor submission as bottleneck (91k–120k descriptors per rank-transfer), suggesting need for lower-overhead interconnects ([Issue #55434](https://github.com/vllm-project/vllm/issues/55434)).

#### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - Qwen4Exp (Qwen3.8-Flash-Next) single prefill crossing 262,144 native boundary crashes engine with CUDA illegal memory access (regression in v0.32.0) — fixed in v0.31.1 ([Issue #62383](https://github.com/vllm-project/vllm/issues/62383)).  
  - Qwen3.8-27B (GDN hybrid) with PP=3 on sm_86 triggers illegal memory access (Xid 31) with prefix caching; regression since v0.28.0 ([Issue #63505](https://github.com/vllm-project/vllm/issues/63505)).  
- **Correctness Bugs**:  
  - Ngram speculative decoding produces corrupted output on hybrid GDN Qwen3.5 models ([Issue #39273](https://github.com/vllm-project/vllm/issues/39273)).  
  - NaN logits after prefix-cache hit when previous prefill ended past block boundary ([Issue #55766](https://github.com/vllm-project/vllm/issues/55766)).  
- **Fixes in Progress**:  
  - PR #63524 addresses incorrect reporting of written blocks in fs tier store jobs (affects back-pressure detection).  
  - PR #63521 improves ORCA header logging by naming unsupported formats instead of showing `<built-in function format>`.

#### **6. What This Means for Application Developers**  
- **Agentic Systems**: Use `Programmable KV Cache` RFC (#57103) to implement custom session lifecycle policies and retention strategies—ideal for long-running agents with dynamic memory needs.  
- **High-Throughput Serving**: Leverage `nvfp4` KV cache (via `--kv-cache-dtype nvfp4`) on MLA models like Kimi-K3 or DeepSeek-V3.1 to reduce memory usage by up to 38% without sacrificing precision.  
- **Multi-Backend Portability**: Prepare for future migration to `torch.accelerator` (RFC #30679) to avoid CUDA-specific hardcodes.  
- **Stability Caution**: Avoid `v0.32.0` for Qwen4Exp or hybrid GDN models until patches land; monitor regressions in `speculative-decoding` paths.  
- **Monitoring**: Use `ORCA` headers with DP engines—ensure metrics are aggregated across all ranks (fix in PR #63445).

> ✅ **Recommended Actions**:  
> - Update to `v0.31.1` if using Qwen4Exp or hybrid GDN models.  
> - Enable `--kv-cache-dtype nvfp4` for dense MLA models where applicable.  
> - Monitor [Issue #63505](https://github.com/vllm-project/vllm/issues/63505) and [Issue #62383](https://github.com/vllm-project/vllm/issues/62383) for upcoming fixes.  

---  
*Data source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-25

---

### **1. Today's Highlights**  
SGLang continues to advance its support for high-throughput, multi-modal and agent-centric inference with significant progress in kernel optimizations, diffusion model integration, and AMD ROCm enablement. Critical stability fixes are underway for `FlashInfer` prefill correctness on hybrid MoE models and `HiCache` CTA crashes on Blackwell GPUs. The project is also actively migrating toward a unified `api.v1` backend, streamlining API surface area across generations.

---

### **2. Releases & Breaking Changes**  
None. No new releases or breaking changes were published in the past 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **AMD RDNA3/RDNA4 (gfx1100/gfx1101/gfx1200/gfx1201) Support Tracking**: Issue #30599 outlines an official roadmap to extend ROCm support beyond datacenter Instinct GPUs to consumer Radeon cards. This includes strategic justification and enablement steps.
- 🟢 **SANA-Sprint 0.6B Diffusion Model Native Support**: PR #43671 adds explicit native support for [Efficient-Large-Model/Sana_Sprint_0.6B_1024px_diffusers](https://github.com/sgl-project/sglang/pull/43671), enabling fast text-to-image generation with minimal latency.
- 🔧 **NPU PD_Disaggregation + Mooncake Transfer Backend**: PR #46223 enables Mooncake-based transfer backend support for NPU disaggregation, crucial for distributed memory architectures.

---

### **4. Performance & Optimization**  
- ⚡ **Diffusion Pipeline Perf Gains**:  
  - PR #46246: Projects cross-attention K/V once per denoising loop → reduces redundant computation (~0.07ms per step on Wan2.2 A14B).  
  - PR #46338: Uses `reduce-scatter` instead of `all-reduce` for large uniform prefill shards → lowers communication overhead in sharded environments.
- 💾 **Scheduler Efficiency**:  
  - PR #46337: Tracks `num_held_rows` incrementally during prefill admission → avoids recomputation in tight loops; improves scheduler throughput under bursty loads.
- 🔄 **DSA Overlap Optimization**:  
  - PR #46179: Overlaps CP KV gather with indexer computation during interleave prefills → hides latency in attention DP paths.
- 📈 **LoRA Test Simplification**:  
  - PR #45981: Streamlines LoRA test matrix and introduces rerun group → cuts CI noise and speeds up validation cycles.

---

### **5. Stability & Regressions**  
**Critical Issues (High Severity)**:
- 🔥 **FlashInfer Prefill Non-Split-Invariant Output**: Issue #46259 reports greedy output corruption on Qwen3.5 hybrid GDN models when using FlashInfer prefill with split-invariant routing. Fixes pending.
- 🔥 **HiCache CTA Not Present Crashes (Xid 13)**: Issue #46203 documents 7 crashes across 4 machines under agentic load on Blackwell B20Z due to `kvcacheio` transfer kernel failures. High urgency for GPU stability.
- 🔥 **Scheduler Double Free Corruption**: Issue #42508 causes permanent server hang after `double free or corruption` in idle-loop invariant check (`session_held_tokens`). Immediate fix required.

**Other Notable Bugs**:
- ❌ **GLM-5.3-Flash Thinking Degeneration**: Issue #36669 shows endless `!` repetition under complex tool-using prompts — likely a tokenizer or sampling state issue.
- ❌ **Compressed Tensors Untargeted Layer Failures**: Issue #46335 fails with "Unable to find matching target" during loading — affects quantized model deployment.
- ❌ **Diffusion Quantization Correctness Bugs**: Issue #46314 identifies 11 correctness bugs in quantization layer (MXFP4, FP8, KitchenW4A4, etc.) — impacting fidelity of generated images.

---

### **6. What This Means for Application Developers**  
- **Avoid `a2a` DCP on Kimi-K3 (GB300)**: If you're using two-node GB300 clusters, disable `NCCL_GRAPH_REGISTER=1` until #45367 is resolved to prevent garbled outputs.
- **Use `--enable-cp-decode-attn-tp` for DeepSeek-V4-Flash on H20-3e**: Per #46310, this flag boosts performance over baseline DeepInfer; benchmark against your workload.
- **Be Cautious with Speculative Decoding on AMD**: While #42496 enables shared-expert fusion on gfx950, ensure you’re not hitting edge cases in `DeepSeekModelNextN` quantization (see #44760).
- **Monitor `api.v1` Migration**: With RFC #45816 and feature request #46297, expect upcoming changes to the OpenAI-compatible API surface. Prepare for future deprecation of legacy endpoints like `TextGenerate`.
- **Test Agentic Workloads on Blackwell Carefully**: Given the Xid 13 crash risk (#46203), avoid long-running agent chains on B20Z until patches land.

> 🛠️ *Pro Tip*: Use `--disable-cuda-graph` temporarily if encountering decode hangs or invalid outputs with CUDA graphs.

---  
*Digest compiled from GitHub activity: [sgl-project/sglang](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes for MoE models, Flash Attention optimizations on Hexagon/HMX, and robustness improvements in Jinja template parsing. Key changes include a fix for `selectattr` argument handling (PR #31059), resolution of GPU memory corruption in vision encoders on HTP v75 (Issue #31104), and a performance-critical kernel optimization for KV-head team splitting across multicore Hexagon devices (PR #31055).

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published in the last 24 hours. However, several important PRs landed that may impact users:  
- **Jinja parser**: Fixed incorrect argument handling in `select`/`selectattr`, preventing crashes with complex chat templates (PR #31059).  
- **Metal backend**: Removed redundant `mul_mm_id` amax rescaling, now superseded by per-expert-token scaling (PR #30924).  
- **Server entrypoint**: Refactored to support modular roles (router, single, download) via `server_role` (PR #31113).  
> 🔗 [PR #31059](https://github.com/ggml-org/llama.cpp/pull/31059) | [PR #30924](https://github.com/ggml-org/llama.cpp/pull/30924) | [PR #31113](https://github.com/ggml-org/llama.cpp/pull/31113)

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Added experimental support for **DSV4.1 Flash** model format via PR #31086.  
  - Fix for **Sarvam 30B MoE** converter labeling byte-fallback tokens incorrectly (Issue #30879).  
- **Hardware Backend Improvements**:  
  - **Hexagon/HMX**: Introduced multi-core KV-head team splitting for Flash Attention (PR #31055), enabling better utilization on HTP v75 and other Hexagon-based SoCs.  
  - **Vulkan**: Added workaround for `shader_64b_indexing`-less devices to prevent MoE cache crashes (PR #31114).  
  - **SYCL**: Fixed F16 quantization rounding issues causing CPY failures (PR #31120).  
> 🔗 [PR #31086](https://github.com/ggml-org/llama.cpp/pull/31086) | [PR #31055](https://github.com/ggml-org/llama.cpp/pull/31055) | [PR #31114](https://github.com/ggml-org/llama.cpp/pull/31114)

---

### **4. Performance & Optimization**  
- **Flash Attention**: Optimized KV-head team split on Hexagon for multicore HMX flash attention, reducing idle cores and improving parallelism when `n_kv_heads` doesn’t divide core count (PR #31055).  
- **Memory Transfer**: PR #31073 moves rotation constants to GPU memory, reducing host-GPU sync overhead on PCIe 2.0 systems (e.g., RTX 3090 + old laptop).  
- **CUDA**: PR #30788 improves NVFP4 MMVQ performance for small-K cases by using lane-packed rows; PR #30727 adds legacy Kepler GPU compatibility with cuBLAS.  
- **Moe Cache**: PR #31122 introduces opt-in host expert page pinning to avoid `cudaMemcpyAsync` from pageable memory, improving MoE decode throughput.  
> 🔗 [PR #31055](https://github.com/ggml-org/llama.cpp/pull/31055) | [PR #31073](https://github.com/ggml-org/llama.cpp/pull/31073) | [PR #30788](https://github.com/ggml-org/llama.cpp/pull/30788) | [PR #31122](https://github.com/ggml-org/llama.cpp/pull/31122)

---

### **5. Stability & Regressions**  
Top-reported issues today indicate serious correctness and stability concerns:  
1. **GPU Memory Corruption in Vision Encoders (Critical)**:  
   - Issue #31104 reports corrupted output from CLIP vision encoder on HTP v75 depending on image shape — reproducible only on Hexagon, not CPU.  
   - *Fix PR*: [PR #31104](https://github.com/ggml-org/llama.cpp/pull/31104) (pending review).  
2. **CUDA Graphs Hang on RTX 5090 (High Severity)**:  
   - Issue #27330 shows CUDA graphs cause GPU hang (Xid 8) on RTX 5090 (sm_120); `GGML_CUDA_DISABLE_GRAPHS=1` is a complete workaround.  
   - *Note*: This is likely a driver or compute capability regression.  
3. **SYCL F16 NaN Output on Intel Arc B70 (High Severity)**:  
   - Issue #30892: After IQ3 code reorder (#29107), SYCL F16 produces NaN outputs in Qwen3.8-27B; disabling fused GEMM fixes it.  
   - *Fix PR*: [PR #31120](https://github.com/ggml-org/llama.cpp/pull/31120) addresses underlying rounding issue.  
4. **MoE Cache Crash on Vulkan (Medium Severity)**:  
   - Issue #30697: `--moe-cache-mib` crashes on RX 6900 XT with Vulkan due to missing `shader_64b_indexing`.  
   - *Fix PR*: [PR #31114](https://github.com/ggml-org/llama.cpp/pull/31114) skips pre-check for non-compute tensors.  

> 🔗 [Issue #31104](https://github.com/ggml-org/llama.cpp/issues/31104) | [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) | [Issue #30892](https://github.com/ggml-org/llama.cpp/issues/30892) | [Issue #30697](https://github.com/ggml-org/llama.cpp/issues/30697)

---

### **6. What This Means for Application Developers**  
- **Use `GGML_CUDA_DISABLE_GRAPHS=1` immediately if running on RTX 5090** — CUDA graphs are unstable and can crash your process.  
- **Enable `--moe-cache-mib` only on Vulkan devices with `shader_64b_indexing`** unless you’ve applied the fix in PR #31114.  
- **For Intel Arc users**, avoid `--moe-cache-mib` and `--moe-cache-mib` until the SYCL F16 rounding fix lands. Use `--fused-gemm off` as temporary workaround.  
- **If using DSV4.1 Flash models**, test early — they’re newly supported but may require tuning.  
- **For mobile/embedded deployments on Hexagon (HTP v75)**, ensure you're on b11849+ and avoid vision encoders with irregular input shapes until PR #31104 is merged.  
- **Leverage `--moe-cache-mib` with pinned host memory** (via PR #31122) for high-throughput MoE inference on systems with slow PCIe.  

> 🔗 [GitHub Issues Summary](https://github.com/ggml-org/llama.cpp/issues?q=is%3Aopen+sort%3Aupdated-desc) | [Latest PRs](https://github.com/ggml-org/llama.cpp/pulls?q=is%3Aopen+sort%3Aupdated-desc)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-25**

---

### **1. Today's Highlights**  
Ollama now supports on-device speech synthesis on macOS via `ollama run` and the OpenAI-compatible `/v1/audio/speech` endpoint, enabling real-time audio playback of model outputs. Concurrently, critical stability fixes were merged for MLX engine issues including ignored `stop` sequences, memory accounting inaccuracies, and model loading failures due to per-layer quantization mismatches.

---

### **2. Releases & Breaking Changes**  
- **v0.40.11**: Introduced native speech generation on macOS (`ollama run phonon "Hello..."`), with streaming audio support through the `/v1/audio/speech` endpoint.  
  🔗 [Release Notes](https://github.com/ollama/ollama/releases/tag/v0.40.11)

---

### **3. New Model & Hardware Support**  
- **MLX Engine**: Added support for **Nemotron 3.5 Bolt 74B-A9B** with full per-layer expert configuration, LiLiCorr speculative decoding, 3-bit prequantized affine imports, and mixed-precision expert stacking.  
  🔗 [PR #19229](https://github.com/ollama/ollama/pull/19229)  
- **Vision Models**: Improved small-image detail preservation in compact Gemma 4 vision towers via dynamic grid rounding.  
  🔗 [PR #19247](https://github.com/ollama/ollama/pull/19247)  
- **Community Integrations (New)**: Added Pixeltable (multimodal data infrastructure), Knovum (local-first desktop AI), ShibaClaw (self-hosted agent framework), and Golem (Go-based agent framework).  
  🔗 [PR #19269](https://github.com/ollama/ollama/pull/19269), [PR #19261](https://github.com/ollama/ollama/pull/19261), [PR #19259](https://github.com/ollama/ollama/pull/19259), [PR #18816](https://github.com/ollama/ollama/pull/18816)

---

### **4. Performance & Optimization**  
- **MLX vs. llama.cpp**: A regression was reported where `flint:40b-a2b-gguf-nvfp4` (MLX) ran significantly slower than `flint:40b-a2b-qat-int4` on Apple Silicon (M3, 36GB). Benchmark shows ~2x lower throughput despite similar model specs.  
  🔗 [Issue #19254](https://github.com/ollama/ollama/issues/19254)  
- **Token Estimation Fix**: Replaced heuristic token counting with precise Anthropic Tokenization API + local cache to prevent context window overflows in multimodal prompts.  
  🔗 [PR #19265](https://github.com/ollama/ollama/pull/19265)  
- **Memory Accounting**: Fixed incorrect VRAM reporting during multi-model loads and log chunking by preserving buffer state across reads.  
  🔗 [PR #17857](https://github.com/ollama/ollama/pull/17857), [PR #19263](https://github.com/ollama/ollama/pull/19263)

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |  
|------|----------|--------|--------|  
| `OLLAMA_NUM_PARALLEL=1` ignored — two sessions running simultaneously | Critical | Open | ❌ |  
| `options.stop` ignored on MLX engine | High | Open | 🔗 [PR #19267](https://github.com/ollama/ollama/pull/19267) |  
| MLX model import fails with shape mismatch due to per-layer quantization override | High | Open | 🔗 [PR #18789](https://github.com/ollama/ollama/pull/18789) |  
| Beam model returns empty responses on Ollama Cloud via OMP | High | Open | ❌ |  
| `/compact` request fails with HTTP 413 due to body size; retry logic needed | Medium | Open | 🔗 [PR #19266](https://github.com/ollama/ollama/pull/19266) |  

> ⚠️ Multiple high-severity regressions affecting core inference reliability, especially on MLX and cloud deployments.

---

### **6. What This Means for Application Developers**  
- **Speech-enabled agents**: Leverage `ollama run` or `/v1/audio/speech` for voice output in local macOS apps without external services.  
- **MLX caution**: Avoid relying on `stop` sequences or per-layer quantization until PRs #19267 and #18789 are merged. Expect performance variability between MLX and llama.cpp backends.  
- **Tool calling & agent frameworks**: Use `ollama launch opencode` with `XDG_STATE_HOME` set to avoid model history loss. Integrate with new tools like OpenSeal, ShibaClaw, and Golem via OpenAI-compatible endpoints.  
- **Production safety**: Upgrade to v0.40.11 and monitor for context overflow risks—use the new tokenization fix (PR #19265) if using complex multimodal inputs.  

🔧 **Action Items**: Audit `OLLAMA_NUM_PARALLEL` usage, verify stop sequence behavior on MLX, and test model loading with mixed-precision checkpoints.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-25**

#### **1. Today's Highlights**  
A critical security incident involving a malicious `litellm==1.107.0` package on PyPI and Docker Hub has been resolved: the compromised release was yanked, and all affected images have been removed from `ghcr.io` and `docker.io`. The community is urged to verify image integrity using the new cosign key from commit [`e82a3c6`](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065). Simultaneously, multiple high-severity bugs related to cost accounting, budget enforcement, and streaming usage tracking have been addressed in PRs focused on data fidelity and financial correctness.

#### **2. Releases & Breaking Changes**  
- **v1.106.3, v1.105.4, v1.104.6, v1.103.8**: All recent releases include a **critical change in image signing** — every Docker image and Helm chart now uses a new cosign key from commit [`e82a3c6`](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065). Users must update their verification workflows to avoid deployment failures.  
  🔗 [GitHub Release Notes](https://github.com/BerriAI/litellm/releases/tag/v1.106.3)

#### **3. New Model & Hardware Support**  
- **Cerebras Llama 3.1 models** now have standardized hyphenated aliases (`cerebras/llama-3.1-8b`, `cerebras/llama-3.1-70b`) added to pricing and context window maps.  
  🔗 [PR #48178](https://github.com/BerriAI/litellm/pull/48178), [PR #48158](https://github.com/BerriAI/litellm/pull/48158)  
- **NVIDIA Nemotron 3.5 Super VL** pricing updated via W&B’s published rates for CoreWeave Forge inference.  
  🔗 [PR #48264](https://github.com/BerriAI/litellm/pull/48264)  
- **Azure transcription sessions** now correctly route through the GA client_secrets endpoint (previously broken due to incorrect path).  
  🔗 [PR #48067](https://github.com/BerriAI/litellm/pull/48067)

#### **4. Performance & Optimization**  
- **Batch & Ultrafast Tier Costing**: LiteLLM now supports 12-hour prompt cache write pricing for OpenAI’s Batch and Ultrafast tiers, enabling accurate cost modeling for high-throughput batch jobs.  
  🔗 [PR #48259](https://github.com/BerriAI/litellm/pull/48259)  
- **Streaming Efficiency**: Fixes ensure tools are preserved for uncatalogued models and that upstream message streams are properly released on client disconnect, reducing resource leaks during long-lived connections.  
  🔗 [PR #48267](https://github.com/BerriAI/litellm/pull/48267), [PR #48220](https://github.com/BerriAI/litellm/pull/48220)

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|-------|-------|
| 🔴 High | `BudgetExceededError` triggered falsely under sustained load despite spend below max_budget | Open | [PR #43732](https://github.com/BerriAI/litellm/pull/43732) |
| 🔴 High | Streaming requests lose `usage` data when final chunk has non-empty `choices` — leading to inaccurate billing | Open | [PR #36926](https://github.com/BerriAI/litellm/pull/36926) |
| 🔴 High | `end_user` field incorrectly pinned to first request’s `user` across shared virtual keys | Open | [PR #31441](https://github.com/BerriAI/litellm/pull/31441) |
| 🟡 Medium | `spend = 0` logged for streamed requests when `provider_response_model` is missing from price map | Open | [PR #42161](https://github.com/BerriAI/litellm/pull/42161) |
| 🟡 Medium | Tools lost for JSON-defined providers if model not in catalog | Open | [PR #48145](https://github.com/BerriAI/litellm/pull/48145) |

> ⚠️ Multiple issues relate to **cost accounting gaps**, **budget enforcement bypasses**, and **streaming metadata loss** — all critical for production billing systems.

#### **6. What This Means for Application Developers**  
- **Immediately verify image signatures** using the new cosign key (`e82a3c6`) to prevent supply chain risks.  
- If using **virtual keys, team budgets, or multi-tenant routing**, be aware of regressions in `end_user` tracking and budget persistence — test with `max_end_user_budget_id` and `project_budget` flows.  
- For **agent pipelines using tools**, ensure model definitions are either in the catalog or explicitly declared; otherwise, tools may be stripped silently.  
- Use `custom_llm_provider` and `model` arguments explicitly when calculating costs to avoid provider leakage in `completion_cost()`.  
- Consider migrating to `cerebras/llama-3.1-*` aliases for consistent pricing and better model discovery.  

> ✅ **Actionable**: Review your proxy config for `max_budget`, `team`, and `end_user` settings; audit `SpendLogs` for anomalies after upgrading.  
> 🔗 [GitHub Issues (Top 30)](https://github.com/BerriAI/litellm/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) | [PRs (Last 24h)](https://github.com/BerriAI/litellm/pulls?q=is%3Aopen+updated%3A2026-10-24..2026-10-25)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-25**

---

### **1. Today's Highlights**  
The Unsloth ecosystem continues its rapid evolution with key UI/UX refinements and backend stability improvements, particularly around model loading, caching, and cross-platform compatibility. Critical fixes address persistent crashes on Windows (due to false port ownership checks) and CPU stalls during long chat archiving, while new PRs introduce advanced pipeline parallelism and KV preemption for efficient multi-chat inference.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, recent beta versions (v0.1.909-beta to v0.1.910-beta) have introduced breaking changes affecting:
- **Model loading on Windows**: Multiple users report GGUF models being killed by a false `port-ownership` check post-2026-10-23 update ([#15022](https://github.com/unslothai/unsloth/issues/15022)).
- **Default behavior override**: Studio now forces `preserve_thinking=true` at llama-server launch, overriding user-defined chat templates ([#15115](https://github.com/unslothai/unsloth/issues/15115)).

> 💡 *Developers should verify their custom chat templates and disable `preserve_thinking` explicitly if needed.*

---

### **3. New Model & Hardware Support**  
No new model or hardware support announced today. However, ongoing work includes:
- **Multi-host scheduling**: Feature request [#4858](https://github.com/unslothai/unsloth/issues/4858) seeks distributed inference across multiple machines—critical for scaling training/inference clusters.
- **Metal GPU support**: PR [#14431](https://github.com/unslothai/unsloth/pull/14431) improves DSpark/DFlash sidecar handling on Mac Metal GPUs, including out-of-memory recovery logic.

---

### **4. Performance & Optimization**  
Significant performance advancements are under active development:
- **KV Preemption & Parallel Caching**: PR [#10301](https://github.com/unslothai/unsloth/pull/10301) enables one KV cache per llama-server instance, allowing parallel chats to share memory efficiently via `--preempt-ram`.
- **Pipeline Parallelism v1**: PR [#15175](https://github.com/unslothai/unsloth/pull/15175) introduces native GPipe-style pipeline parallelism (`1F1B`) for dense decoders using `torch.distributed.pipelining`, enabling larger models on fewer GPUs.
- **Tensor Parallelism v2**: PR [#15174](https://github.com/unslothai/unsloth/pull/15174) adds sharded loading and hybrid data+tensor parallel training—now supports 8B LoRA models across two 16GB GPUs.

> ✅ These advances will significantly reduce memory pressure and improve throughput for large-scale fine-tuning and serving.

---

### **5. Stability & Regressions**  
Top-tier stability issues reported today:

| Issue | Severity | Status | Impact |
|------|----------|--------|--------|
| [#15022](https://github.com/unslothai/unsloth/issues/15022): GGUF load failure due to false "child not listening" port check | 🔴 High | Open | Blocks Windows users from loading models after latest update |
| [#15142](https://github.com/unslothai/unsloth/issues/15142): All models fail to load after v0.1.910-beta update (Windows) | 🔴 High | Open | Widespread desktop crash; likely tied to #15022 |
| [#14519](https://github.com/unslothai/unsloth/issues/14519): Long chats stall indefinitely in CPU-based embedding phase before inference | 🟡 Medium | Closed | Delayed start; affects tool-heavy workflows |
| [#15172](https://github.com/unslothai/unsloth/issues/15172): Studio crashes during image generation (core dumped) | 🟡 Medium | Open | Affects multimodal workflows |

> ⚠️ No fix PRs currently available for high-severity issues. Users on Windows should avoid v0.1.910-beta until resolved.

---

### **6. What This Means for Application Developers**  
- **For agents/apps using local inference**: Expect improved scalability via upcoming pipeline and tensor parallelism support—ideal for deploying large models (>7B) on consumer-grade hardware.
- **For UI integrators**: The new `--preempt-ram` + KV sharing design allows efficient multi-user or multi-chat systems without cache duplication. Monitor for future API updates.
- **For developers using custom chat templates**: Be aware that `preserve_thinking=true` is now enforced by default—explicitly set `--no-reasoning-preserve` or use `--chat-template` to override.
- **For CI/CD pipelines**: Ensure Docker builds include persistent storage for vLLM/SGLang dependencies (see [#15016](https://github.com/unslothai/unsloth/issues/15016)) to avoid repeated downloads.

> 📌 **Actionable Tip**: If you're building agent systems requiring long-running, multi-turn conversations, test with `--parallel 4` and `--preempt-ram` once merged—this could dramatically reduce latency and memory usage.

---  
*Digest compiled from GitHub activity: [unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*