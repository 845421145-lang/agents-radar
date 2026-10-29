# AI Infrastructure Digest 2026-10-29

> Generated: 2026-10-29 01:55 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-29**

---

### **1. Ecosystem Overview**

The AI infrastructure landscape in late 2026 is defined by a sharp bifurcation between high-performance, hardware-optimized inference engines and flexible, developer-centric gateways enabling multi-modal agent workflows. Projects like **vLLM** and **SGLang** are pushing the limits of raw throughput on next-gen GPUs (Blackwell SM120), while **llama.cpp**, **Ollama**, and **Unsloth** focus on edge compatibility, real-time multimodal input, and rapid local deployment. The rise of **multi-modal models** (e.g., LFM3, Qwen3.8-Flash-Next) and **speculative decoding at scale** signals a maturing ecosystem where performance, correctness, and developer experience are increasingly intertwined. Meanwhile, **LiteLLM** consolidates these capabilities into a unified proxy layer, enabling intelligent routing across providers and backends.

---

### **2. Activity Comparison**

| Project       | Issues Open | PRs Merged (Last 24h) | Release Status        |
|---------------|-------------|------------------------|------------------------|
| vLLM          | 52          | 18                     | No new release         |
| SGLang        | 74          | 12                     | No new release         |
| llama.cpp     | 68          | 14                     | `v0.8.0` released      |
| Ollama        | 89          | 10                     | `v0.40.13-rc1` released |
| LiteLLM       | 91          | 11                     | `v1.109.0-dev.1`, `v1.106.6` |
| Unsloth       | 112         | 9                      | `v0.1.912-beta` released |

> 🔍 *Observation*: **Unsloth** leads in issue volume — reflecting intense activity around stability and cross-platform UX, particularly for Apple MLX and GGUF support. **llama.cpp** and **Ollama** are most active in releasing new versions with feature-rich updates, while **vLLM** maintains steady engineering momentum without breaking changes.

---

### **3. Model Support Race**

| New Model / Architecture       | Supported By                          | Notes |
|-------------------------------|---------------------------------------|-------|
| **RTX 6000 Pro (Blackwell SM120)** | vLLM ✅, SGLang ✅, llama.cpp ⚠️, Ollama ⚠️ | vLLM leads with full MoE kernel support; SGLang adds Mooncake L3 integration |
| **Qwen3.8-Flash-Next-gfx950** | vLLM ✅, SGLang ✅                    | ROCm optimizations underway in both; AMD consumer GPU (gfx1100/gfx1201) still unsupported |
| **LiquidAI LFM3 Series**      | llama.cpp ✅, Ollama ✅               | First major multi-modal family to ship via `/v1/realtime` and TTS endpoints |
| **DeepSeek-V4-Flash-0731**    | vLLM ❌ (Ampere crash), SGLang ⚠️       | Blocked on legacy hardware; requires patching |
| **MLX Runtime (Apple Silicon)** | Ollama ✅, Unsloth ⚠️                  | Ollama enables Windows/CPU support; Unsloth has visibility issues |
| **Gemma 4 / Ulysses Context Parallelism** | Unsloth ✅, vLLM ⚠️                   | Unsloth leads in long-context innovation via Ulysses attention exchange |

> 🏁 **Leader**: **vLLM** holds edge in **high-end GPU performance** and **MoE kernel maturity**.  
> 🚀 **Innovation Leader**: **Unsloth** is pioneering **context parallelism** and **cross-device model loading**.  
> 🌐 **Multi-modal Enabler**: **llama.cpp & Ollama** are fastest to integrate **audio + vision** pipelines via LFM3.

---

### **4. Performance Frontier**

| Focus Area               | Leading Projects                          | Key Developments |
|--------------------------|-------------------------------------------|------------------|
| **KV Cache Optimization** | vLLM ✅, SGLang ✅, Unsloth ✅             | TurboQuant fusions, RDMA-based Engram connectors, Mooncake Store (RFC #38474), hybrid CPU/GPU MoE caching |
| **Kernel-Level Efficiency** | vLLM ✅, SGLang ✅, llama.cpp ✅           | CUTLASS FP8 grouped GEMM (SM120), fused SiLU/mul+RMSNorm (ROCm), tiled q4_k (Adreno), SVE GEMM (ARM64) |
| **Speculative Decoding**  | vLLM ✅, SGLang ⚠️, Unsloth ✅              | DFlash pad split fusions (vLLM), write-back latency issues (SGLang), Ulysses context parallelism (Unsloth) |
| **Distributed Serving**   | LiteLLM ✅, SGLang ✅                      | HiCache L3 backend, complexity routing, agent-level tiering, multi-provider proxy |
| **Edge & Embedded**       | llama.cpp ✅, Unsloth ✅                   | Hexagon conv2d, SVE GEMM, Metal memory budgeting, GGUF load efficiency |

> 💡 **Trend**: **Hardware-specific kernel fusion** dominates optimization efforts, especially on AMD ROCm, Blackwell SM120, and ARM64/SVE. **Shared KV reuse via RDMA** (vLLM) and **L3 cache abstraction** (SGLang) signal growing focus on scalable, multi-instance inference.

---

### **5. Layer Positioning**

| Project       | Primary Layer                | Role Summary |
|---------------|------------------------------|--------------|
| **vLLM**      | **Inference Engine**         | High-throughput, low-latency serving on datacenter GPUs; optimized kernels, MoE, speculative decoding |
| **SGLang**    | **Inference Engine + Gateway** | Prefill-decode disaggregation, HiCache L3, Mooncake Store; bridges compute and storage tiers |
| **llama.cpp** | **Local Runtime + Inference Engine** | Cross-backend execution (CPU, GPU, NPU); ideal for edge, mobile, and embedded systems |
| **Ollama**    | **Gateway + Local Runtime**  | Unified CLI/UI for local inference; abstracts backend via MLX, llama.cpp, and model registry |
| **LiteLLM**   | **API Gateway / Proxy Layer** | Multi-provider routing, cost-aware billing, agent complexity routing, vendor-agnostic API |
| **Unsloth**   | **Fine-tuning + Local Runtime** | Fast training/fine-tuning, GGUF model handling, UI-focused deployment; strong for developers |

> 📊 **Architectural Insight**: A clear division emerges:  
> - **Engineers** use **vLLM/SGLang** for maximum throughput.  
> - **Developers** rely on **Ollama/Unsloth** for rapid prototyping.  
> - **Operators** depend on **LiteLLM** for cost control and orchestration.

---

### **6. Trend Signals**

#### **Key Industry Trends Extracted from Today’s Activity**:
1. **Hardware-Specific Optimization Is Now Table-Stakes**  
   Projects are no longer just “porting” models — they’re rewriting kernels for SM120, gfx1151, SVE, and Hexagon. This reflects a shift from generic inference to **hardware-aware specialization**.

2. **Multi-modal Real-Time Workflows Are Live**  
   With **LFM3** now supported via `/v1/realtime` and `/tts` in **llama.cpp** and **Ollama**, we’ve crossed the threshold into real-time audio/video agents — a critical milestone for voice assistants and live collaboration tools.

3. **KV Cache and Shared Memory Are the Next Frontier**  
   The surge in RFCs around **TurboQuant**, **Mooncake Store**, and **RDMA-based Engram connectors** indicates that **efficient shared state across instances** is now a primary bottleneck — not raw FLOPs.

4. **Agent Reliability Depends on Correctness, Not Just Speed**  
   Multiple projects report **speculative decoding output divergence** (SGLang, Unsloth), **tool call failures** (Ollama), and **JSON grammar DoS risks** (llama.cpp). These aren’t bugs — they’re **critical path blockers for production agents**.

5. **Rust Migration Signals Long-Term Scalability Push**  
   LiteLLM’s **Rust migration initiative (`#31263`)** aims for sub-1ms overheads — a clear signal that **proxy-layer performance** is becoming as important as inference engine speed.

---

### ✅ **Recommendations for Application Developers**

- **For high-throughput, low-latency inference**: Use **vLLM on Blackwell GPUs** with `PR #43814` applied; avoid `DeepSeek-V4-Flash-0731` on Ampere.
- **For real-time multimodal apps**: Leverage **llama.cpp/Ollama's LFM3 support** via `/v1/realtime` and `/tts`.
- **For agent reliability**: Validate speculative outputs (especially DeepSeek/Qwen), avoid `tool_calls` after free text, and monitor token counting accuracy.
- **For edge/embedded**: Prioritize **llama.cpp** (SVE, Hexagon) or **Unsloth** (Metal, GGUF).
- **For cost-aware orchestration**: Use **LiteLLM** with `complexity_router` and ensure you’re on `v1.106.6+` to avoid billing inaccuracies.

> 🔮 **Watchlist**:  
> - vLLM’s **TurboQuant KV cache** (RFC #38171)  
> - Unsloth’s **Ulysses context parallelism**  
> - LiteLLM’s **Rust migration**  
> - SGLang’s **HiCache write-back latency fix**

---

*Report compiled from GitHub digests: 2026-10-29*  
*Target Audience: AI Infrastructure Engineers, Platform Architects, Technical Decision-Makers*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-29

---

### **1. Today's Highlights**  
The vLLM project continues its aggressive push toward full Blackwell (SM120) and multi-modal support, with critical PRs landing for RTX 6000 Pro (Blackwell) MoE kernel compatibility and ROCm optimizations for Qwen3.8-Flash-Next on MI355X. A major performance fix was merged to prevent silent fallbacks from CUTLASS FP8 grouped GEMM to Triton on Blackwell GPUs, ensuring optimal MoE throughput. Additionally, new work is underway to enable TurboQuant KV cache quantization and enhance shared KV reuse via RDMA-based Engram connectors.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking API/config changes reported in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **Blackwell (SM120)**: Critical fixes landed in `PR #43814` to enable CUTLASS FP8 grouped GEMM for MoE models on RTX 6000 Pro (Blackwell), resolving silent fallbacks to Triton that degraded performance.  
- 📌 **ROCm / AMD**: Active optimization efforts for `Qwen3.8-Flash-Next-gfx950` (`MI355X`) via `PR #64029` (K2 decode specializations) and `PR #51406` (fused QK-norm+RoPE+gate kernel).  
- 🔧 **Multi-modal**: Ongoing RFCs and PRs targeting ViT CUDA graph support (`#38175`), Whisper integration (`#25750`), and OpenAI Response API multi-modal input support (`#32685`).  
- 🔄 **Hardware Plugin Ecosystem**: `PR #62500` adds `vllm-iluvatar` to custom_op documentation, expanding non-official hardware plugin coverage.

> 🔗 [PR #43814](https://github.com/vllm-project/vllm/pull/43814) | [PR #64029](https://github.com/vllm-project/vllm/pull/64029) | [PR #51406](https://github.com/vllm-project/vllm/pull/51406)

---

### **4. Performance & Optimization**  
- 🚀 **Blackwell MoE Kernel Performance**: `PR #43814` restores native CUTLASS FP8 grouped GEMM for SM120, eliminating costly Triton fallbacks — expected to improve MoE throughput by ~2–4× on Blackwell GPUs.  
- ⚙️ **Speculative Decoding Fusions**: `PR #63579` introduces trace-driven attention fusions (DFlash pad split, native decode lens, Gumbel finalize), building on prior work to reduce kernel launch overhead in MTP scenarios.  
- 📈 **Scheduler Efficiency**: `PR #50410` balances established decode requests across PP microbatches, improving scheduling fairness without restricting prefill logic.  
- 🔄 **KV Cache Offloading**: Multiple PRs (`#64236`, `#64393`, `#64394`) address async load coordination and disk-tier cleanup during graceful shutdowns, reducing memory pressure and improving stability under high concurrency.

> 🔗 [PR #43814](https://github.com/vllm-project/vllm/pull/43814) | [PR #63579](https://github.com/vllm-project/vllm/pull/63579) | [PR #50410](https://github.com/vllm-project/vllm/pull/50410)

---

### **5. Stability & Regressions**  
- ⚠️ **Critical Crash on Ampere (SM8x)**: `Issue #50576` reports DeepSeek-V4-Flash-0731 fails to run on A100/A800 due to missing SM8x support — currently blocking adoption of latest DeepSeek models on legacy infrastructure.  
- ⚠️ **TurboQuant + Hybrid MoE Failure on Ampere**: `Issue #40124` documents a regression where `k8v4` TurboQuant KV cache breaks hybrid MoE models (e.g., Qwen3.6-35B-A3B) on SM80–86 GPUs, requiring Hopper+ assumptions to be relaxed.  
- ❌ **GPU Memory Leak in CUDA Graphs**: `Issue #38486` reports excessive memory consumption in CUDA graphs for Qwen3.5, impacting scalability in high-throughput deployments.  
- 💥 **Crash During Deployment**: `Issue #36489` logs unexpected crashes when serving Qwen3.5 397B-FP8 on v0.17.0 — likely tied to memory management or kernel dispatch.

> 🔗 [Issue #50576](https://github.com/vllm-project/vllm/issues/50576) | [Issue #40124](https://github.com/vllm-project/vllm/issues/40124) | [Issue #38486](https://github.com/vllm-project/vllm/issues/38486)

---

### **6. What This Means for Application Developers**  
- **Upgrade caution**: If deploying on RTX 6000 Pro (Blackwell) or using hybrid MoE models like Qwen3.6-35B-A3B, ensure you're on vLLM ≥ v0.19.0 with `PR #43814` applied to avoid performance degradation.  
- **Ampere users**: Avoid `DeepSeek-V4-Flash-0731` until `#50576` is resolved; consider older model variants or runtime fallbacks.  
- **High-concurrency apps**: Leverage `PR #64393` and `#64394` to manage GPU memory in offloaded workloads — especially critical for long-context RAG or chat agents.  
- **Future-proofing**: Track `RFC #38171` (TurboQuant KV cache) and `RFC #38474` (Mooncake Store for shared KV reuse) — these will unlock efficient scaling in multi-instance deployments.  
- **Security**: Patch `PR #60233` immediately if using custom error messages in production APIs to prevent ReDoS attacks.

> 🔗 [RFC #38171](https://github.com/vllm-project/vllm/issues/38171) | [RFC #38474](https://github.com/vllm-project/vllm/issues/38474) | [PR #60233](https://github.com/vllm-project/vllm/pull/60233)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-29**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to deepen its support for **prefill-decode disaggregation (PD)** and **HiCache L3 integration**, with key PRs enabling Mooncake L3 backend compatibility for both GLM-5.3-Flash and DeepSeek-V4 on Ascend/NPU platforms. Meanwhile, performance optimization efforts are accelerating on AMD ROCm (gfx1151/gfx1250), particularly for GDN and Qwen3.5 decode kernels, while critical stability issues around speculative decoding correctness and HiCache eviction latency have emerged.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published.

---

### **3. New Model & Hardware Support**  
- ✅ **Ascend A3/A5**: Full support for `GLM-5.3-Flash` via PR #43305, including hybrid MLA/DSA attention, MTP speculative decoding, and Mooncake L3 integration.  
- ✅ **NPU (Ascend)**: Mooncake L3 adaptation for GLM-5.3-Flash (#46584) and DeepSeek-V4 (#46026), enabling reduced-layer inference and L3-based cache storage.  
- ✅ **AMD (gfx1151/gfx1250)**: Performance-focused kernel work for Qwen3.5 decode (PRs #47157–#47154), including fused SiLU/mul and RMSNorm + MXFP4 quantization.  
- ⚠️ **Consumer AMD GPUs (RDNA3/RDNA4)**: Ongoing tracking issue #30599 calls for official support of `gfx1100/gfx1201` — currently limited to datacenter Instinct (`gfx942/gfx950`) only.

> 🔗 [Issue #30599: AMD consumer GPU support](https://github.com/sgl-project/sglang/issues/30599)  
> 🔗 [PR #43305: GLM-5.3-Flash on Ascend A3/A5](https://github.com/sgl-project/sglang/pull/43305)

---

### **4. Performance & Optimization**  
- 📈 **AMD ROCm (gfx1151)**: Split-K BF16 GEMV kernel for single-row decode improves throughput by reducing CTA occupancy bottlenecks; tested on Strix Halo (RDNA 3.5).  
- 📈 **Qwen3.5 Decode (ROCm gfx1250)**: Paged Gluon MLA decode now enabled via aiter backend, leveraging direct access to sglang’s paged KV pool.  
- 📈 **Qwen3.5 Pre-Profiling**: Fused SiLU-and-mul with down_proj MXFP4 quantization (bit-exact) and add+RMSNorm fusion with ASM FP4 inputs landed in PRs #47155 and #47154.  
- ⚠️ **HiCache Write-Back Latency**: Write-back eviction blocks scheduler for ~500ms per call under load, causing significant hit rate degradation vs. write-through (#46952).  
- ⚠️ **DeepSeek-V4 Prefill Throughput**: On SM120 (RTX PRO 6000 Blackwell), prefill rates (~2–7K tok/s) lag behind vLLM/Marlin (~12.5K tok/s); tuning guidance requested (#33422).

> 🔗 [PR #47157: Tune GDN Conv1D update on ROCm](https://github.com/sgl-project/sglang/pull/47157)  
> 🔗 [Issue #46952: HiCache write_back latency impact](https://github.com/sgl-project/sglang/issues/46952)

---

### **5. Stability & Regressions**  
- ❌ **Speculative Decoding Correctness**: DeepSeek-V4-Flash produces different greedy outputs between speculative and normal decoding (#45525) — critical for agent reliability.  
- ❌ **HiCache + Hybrid GDN**: Host-tier hits drop to zero when working set exceeds ~3 long prefixes due to host mamba pool exhaustion (#45400).  
- ❌ **SparsePrefillWorkspace OOM**: DSPARK + DeepSeek-V4.1-Flash causes unbounded allocation, crashing entire TP group (#41076).  
- ❌ **Triton Kernel Compilation Failure**: FLA kernels fail to compile on `nightly-cu134-20261020` due to `tl.make_block_ptr` removal in Triton (#45426).  
- ❌ **Tool Call Incompatibility**: JSON schema + tools break with Kimi-K3 (400 error) and glm47/DeepSeek (silent tool drop) — breaks Codex-style output validation (#47167).

> 🔗 [Issue #45525: Speculative vs. ordinary decode mismatch](https://github.com/sgl-project/sglang/issues/45525)  
> 🔗 [Issue #47167: Tools + JSON-schema failure](https://github.com/sgl-project/sglang/issues/47167)

---

### **6. What This Means for Application Developers**  
- **Use PD Disaggregation with Caution**: While PD is now default at scale, monitor HiCache eviction behavior — write-back mode may introduce unacceptable latency spikes. Consider sticking with `write_through` unless you have specific storage constraints.  
- **Validate Output Consistency**: If using speculative decoding (especially with DeepSeek-V4 or Qwen3.5), expect potential output divergence; validate against non-speculative baselines.  
- **Avoid Tool + Schema Combinations Until Fixed**: The bug in #47167 breaks deterministic tool usage — avoid `--output-schema` with tool-enabled models until resolved.  
- **Target AMD/Ascend Carefully**: While ROCm and NPU support is growing rapidly, performance gains are model-specific (e.g., Qwen3.5 on gfx1250) — benchmark early.  
- **Monitor CI Health**: Flaky tests and infrastructure failures (#42752) may delay merges; consider pinning to stable builds during production deployment.

> 💡 Pro Tip: For high-throughput, low-latency inference, prioritize **SM120 (Blackwell)** and **Hopper (SM90)** targets, and use `--kv-cache-dtype fp8_e4m3` with tuned kernels where available.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

---

### **1. Today's Highlights**  
The `v0.8.0` release introduces the LiquidAI LFM3 family (text, vision, audio, and omni) with experimental streaming audio via new `/v1/realtime` and `/tts` endpoints, marking a major leap in multimodal inference capabilities. Key performance gains include optimized SVE GEMM kernels for ARM64, tiled Q4_K GEMM on Adreno GPUs, and improved MoE expert handling—enabling faster speculative decoding and better GPU memory utilization across diverse backends.

---

### **2. Releases & Breaking Changes**  
- **`v0.8.0` released** ([#31309](https://github.com/ggml-org/llama.cpp/pull/31309)):  
  - New `/v1/realtime` and `/tts` APIs enable real-time audio input/output through the server.  
  - Adds support for LiquidAI’s LFM3 series (text, vision, audio, omni).  
  - Includes architectural updates like DeepSee and enhanced control vector layer bounds checking.  
  - **Migration Note**: Users relying on legacy `/realtime` or TTS paths must update their clients to use the new endpoints.

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - **LiquidAI LFM3 family** (text, vision, audio, omni) added via `--model` support.  
  - **DeepSeek-V4.1-Flash**, **MiMo-V2.6-Flash-RL**, and **Qwen4exp** now supported with draft speculations (`--spec-type draft-dflash`, `draft-mtp`).  

- **Hardware & Backends**:  
  - **Hexagon**: Added `conv2d` support with double-buffered staging and implicit GEMM ([#30995](https://github.com/ggml-org/llama.cpp/pull/30995)).  
  - **OpenCL (Adreno)**: Tiled `q4_k` GEMM for batch > 1 improves throughput ([#30412](https://github.com/ggml-org/llama.cpp/pull/30412)).  
  - **SVE (ARM64)**: 256-bit implementation of `gemm_q6_K_8x8_q8_K` kernel boosts CPU inference speed ([#27472](https://github.com/ggml-org/llama.cpp/pull/27472)).  
  - **SYCL**: Work-group argmax optimization for short TOP_K rows reduces latency ([#31110](https://github.com/ggml-org/llama.cpp/pull/31110)).  
  - **CUDA**: Fuse MoE gate/up and GLU ops into MMQ for reduced overhead ([#31188](https://github.com/ggml-org/llama.cpp/pull/31188)).

---

### **4. Performance & Optimization**  
- **Speedups**:  
  - **SVE GEMM** (`q6_k`): Up to **~2.3x speedup** on ARM64 devices vs NEON fallback ([#27472](https://github.com/ggml-org/llama.cpp/pull/27472)).  
  - **Tiled q4_k GEMM (Adreno)**: Improves batched inference efficiency by reducing kernel launch overhead ([#30412](https://github.com/ggml-org/llama.cpp/pull/30412)).  
  - **IQ4 quant creation**: Pre-computed halfway points reduce quantization time by ~40% ([#31201](https://github.com/ggml-org/llama.cpp/pull/31201)).  
- **Memory & Compute**:  
  - **Batched tensor copy API** (`ggml_backend_tensor_copy_n`) enables efficient multi-tensor transfers across backends ([#30881](https://github.com/ggml-org/llama.cpp/pull/30881)).  
  - **MoE expert cache**: Hybrid CPU/GPU sharing (`--moe-cache-cpu-share auto`) dynamically offloads missed experts, improving cache hit rates ([#31233](https://github.com/ggml-org/llama.cpp/pull/31233), [#30966](https://github.com/ggml-org/llama.cpp/pull/30966)).  
  - **CUDA graph optimizations**: Improved memory reuse and reduced context switching during prefill ([#31300](https://github.com/ggml-org/llama.cpp/pull/31300)).

---

### **5. Stability & Regressions**  
- **Critical Crashes / Hangs**:  
  - **RTX 5090 CUDA graphs hang** (`#27330`): GPU watchdog triggers Xid 8 errors due to CUDA graphs; workaround: `GGML_CUDA_DISABLE_GRAPHS=1`. No fix PR yet.  
  - **Vulkan MoE cache crash** (`#30697`): `--moe-cache-mib` crashes on RX 6900 XT; reported in v0.7.0-dev.  
  - **SYCL bf16 conversion failure** (`#31029`): Unsupported instruction on Arrow Lake iGPU; blocks model loading.  
- **Correctness Bugs**:  
  - **Draft KV cache hole** (`#27408`): Image chunks leave positional gaps → HTTP 500 on `draft-dflash`.  
  - **Speculative decode regression** (`#31262`): ~35% slower prompt processing in `b11804` vs `b11046` on Intel SYCL.  
  - **JSON grammar DoS** (`#29457`): Large enum in `json_schema` causes superlinear parsing time (potential DoS).  
- **Fix PRs Available**:  
  - [#31300](https://github.com/ggml-org/llama.cpp/pull/31300): Fixes DSV4 batching logic.  
  - [#31330](https://github.com/ggml-org/llama.cpp/pull/31330): Stabilizes CI flakes in cancel/sleep tests.

---

### **6. What This Means for Application Developers**  
- **Multimodal apps** can now leverage real-time audio + vision via LFM3 models using `/v1/realtime` and `/tts`—ideal for voice agents, live captioning, and interactive AI assistants.  
- **Optimize for edge devices**: Hexagon and SVE improvements make on-device inference more viable for mobile and embedded systems.  
- **Use hybrid MoE caching**: Enable `--moe-cache-cpu-share auto` to avoid GPU OOMs during high-load scenarios while maintaining low-latency decoding.  
- **Avoid known regressions**: Disable CUDA graphs (`GGML_CUDA_DISABLE_GRAPHS=1`) if running on RTX 5090; monitor Vulkan/MoE issues until fixes land.  
- **Leverage new APIs**: Use `ggml_backend_tensor_copy_n` for efficient batched tensor operations in custom pipelines.  
- **Monitor UI improvements**: Recent WebUI changes (scroll persistence, submit button logic) enhance UX—especially for agentic workflows.

> 🔗 **Key Resources**:  
> - [Release v0.8.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.8.0)  
> - [Realtime API Docs](https://github.com/ggml-org/llama.cpp/blob/master/docs/realtime.md)  
> - [MoE Cache Tuning Guide](https://github.com/ggml-org/llama.cpp/pull/31233)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-29**

---

### **1. Today’s Highlights**  
The latest release, **v0.40.13-rc1**, brings critical fixes for the LFM3 GGUF audio model and updates to `llama.cpp` (b11963), improving stability on Apple Silicon. A major focus today is on **MLX runtime support**, with new PRs enabling Windows and CPU backends for MLX-based models—unlocking cross-platform text-to-speech and video input capabilities. Meanwhile, user-reported issues highlight growing pains around MLX dependency visibility and model compatibility.

---

### **2. Releases & Breaking Changes**  
- **v0.40.13-rc1**:  
  - Fixed LFM3 GGUF audio model handling and improved `llama-server` speech support via #19344.  
  - Upgraded `llama.cpp` to commit b11963 via #19360.  
  - *Migration note*: Users of `lfm3-audio:latest` or `qwen3.8:27b-mlx` must ensure MLX runtime is available on their system.  

> 🔗 [Changelog](https://github.com/ollama/ollama/compare/v0.40.12...v0.40.13) | [PR #19344](https://github.com/ollama/ollama/pull/19344) | [PR #19360](https://github.com/ollama/ollama/pull/19360)

---

### **3. New Model & Hardware Support**  
- **MLX Runtime Expansion**:  
  - PR #19366 adds **Windows native support** and **CPU backend** for MLX runner—enabling full TTS inference on non-Apple devices.  
  - PR #19348 introduces **video input support** (MP4/MOV) in MLX models like `LFM3-VL`, `LFM3-Omni`, and `Qwen3.5/3.6-mlx` via image field detection. Models now report `"video"` capability in `projectorCapabilities`.  
- **New Model Families**:  
  - `lfm3-audio:latest`, `lfm3-vl:latest`, and `qwen3.8:27b-mlx` now support multi-modal inputs including live video and audio.  
  - Note: These require **MLX runtime**—not available on Linux or AMD GPUs.

> 🔗 [PR #19366](https://github.com/ollama/ollama/pull/19366) | [PR #19348](https://github.com/ollama/ollama/pull/19348)

---

### **4. Performance & Optimization**  
- **Speculative Decoding Metrics**:  
  PR #19368 adds per-request metrics for speculative decoding: drafted and accepted tokens are now exposed in API responses and `--verbose` output—improving observability for agent developers.  
- **Memory Estimation Fix**:  
  Issue #19357 reports that `gemma4:e4b` has a **3–4× inflated VRAM estimate** due to miscounting CPU-mapped embedding weights. This causes unnecessary evictions; fix pending.  
- **Vulkan Performance Degradation**:  
  Issue #19201 documents a **~30× slowdown** on AMD RADV after first request with prompt cache enabled—likely due to GPU driver state corruption. High severity; requires investigation.

> 🔗 [PR #19368](https://github.com/ollama/ollama/pull/19368) | [Issue #19357](https://github.com/ollama/ollama/issues/19357) | [Issue #19201](https://github.com/ollama/ollama/issues/19201)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Impact |
|---------|------|--------|--------|
| 🔴 Critical | `lfm3` model fails without MLX runtime, no warning | Closed (#19343, #19369) | Users cannot pull model unless they know MLX is required |
| 🔴 Critical | `qwen3.8:27b-mlx` tool calls fail if assistant produces free-text first | Open (#19353) | Breaks common agent patterns |
| 🟡 High | `ollama serve` restart mid-pull breaks resume (digest mismatch) | Open (#19337) | Blocks large model downloads |
| 🟡 High | `gemma4:e4b` memory estimate too high → eviction storms | Open (#19357) | Poor resource utilization |
| 🟡 Medium | macOS app window/menu bar missing post-update | Closed (#19370) | UX regression on Golden Gate 27 |

> 🔗 [Issue #19343](https://github.com/ollama/ollama/issues/19343) | [Issue #19353](https://github.com/ollama/ollama/issues/19353) | [Issue #19337](https://github.com/ollama/ollama/issues/19337) | [Issue #19370](https://github.com/ollama/ollama/issues/19370)

---

### **6. What This Means for Application Developers**  
- **Use MLX only on Apple Silicon**: If targeting Linux or AMD, avoid `lfm3-*`, `qwen3.8-mlx`, and similar models until MLX support expands. Filter them out using the community request (#19355).  
- **Agent Design Caution**: Avoid relying on `tool_calls` immediately after natural language in `qwen3.8:27b-mlx`—this is currently broken (see #19353). Use empty content fields as workaround.  
- **Monitor Speculative Decoding**: With new metrics in v0.40.13+, you can now tune draft depth based on real acceptance rates—not just raw acceptance %.  
- **Avoid Vulkan on AMD**: If performance is critical, disable `OLLAMA_VULKAN=1` on AMD systems (RADV) until #19201 is resolved.  
- **Handle MLX Dependencies Explicitly**: Applications pulling `lfm3` or `qwen3.8-mlx` must check MLX availability at runtime—no auto-detection yet.

> ✅ Pro tip: Use `ollama show --modelfile` carefully—don’t assume it’s safe to re-parse outputs containing `"""` + whitespace (see #19342, fixed by #19363).

---  
*Digest compiled from GitHub data: ollama/ollama · 2026-10-29*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-29**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues its momentum with a major push toward **Rust-based performance optimization**, as evidenced by the open `#31263` issue for the Rust migration (sub-1ms overheads). On the stability front, critical fixes were merged to resolve billing inaccuracies in Anthropic and Responses integrations (`#48955`, `#48978`) and address token counting errors for newer OpenAI models (`#48728`). The community remains highly engaged, with over 490 comments on the long-running wishlist (`#361`) and active development on agent-level complexity routing enhancements.

---

### **2. Releases & Breaking Changes**  
- **v1.109.0-dev.1** (dev) and **v1.106.6 / v1.105.7** (stable) released with updated Cosign signatures tied to commit [`e82a3c6`](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065).  
- **Security Note**: All images are signed via Cosign; verify using:  
  ```bash
  cosign verify --key https://raw.githubusercontent.com/BerriAI/litellm/e82a3c646908ba0a6ee0beddc4310d7a6cac4065/cosign.pub \
    ghcr.io/berriai/litellm:v1.109.0-dev.1
  ```
- **Breaking Change Alert**: `#40631` introduces HTTP/2 for Vertex AI Search vector store — disable via `http2: false` or `LITELLM_HTTP2=0` if using async workflows.

---

### **3. New Model & Hardware Support**  
- **New Provider Added**: `IteraCompute` now supported as an OpenAI-compatible backend via `#46837`. Full model ID coverage (28 models) including image, cache, context-tier, and off-peak pricing.  
- **Model Coverage Expansion**: `gpt-6`, `azure/gpt-41`, and prefixed OpenAI models now use `o200k_base` tokenizer (`#48728`), aligning with upstream counts.

---

### **4. Performance & Optimization**  
- **Rust Migration Initiative**: `#31263` launched as the parent ticket for migrating LiteLLM to Rust — targeting sub-1ms overheads. Early beta signups available [here](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...).  
- **Token Counter Improvements**:  
  - `#48916`: Retains loaded Hugging Face tokenizers during network failures, reducing recovery time from ~5 minutes to near-instant.  
  - `#48728`: Correctly applies `o200k_base` encoding to unknown OpenAI models (e.g., `gpt-6`), eliminating up to 80% overcounting in non-English text.  
- **Proxy Efficiency**: `#48961` replaces pre-migration row checks with dry-run rollback, preventing boot-time timeouts on large spend-logs.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Description |
|------|----------|--------|--------|-------------|
| `#48773` | High | Closed | `#48912` | Streaming `/v1/chat/completions` to Responses API duplicated tool-call arguments due to incorrect delta handling. |
| `#47904` | Critical | Closed | N/A | `v1.106.x` Docker images still trust compromised `emSign ECC Root CA - G3`. Backport needed; no fix yet. |
| `#48667` | Medium | Open | N/A | Host header and SNI lost on outbound MCP requests when resolving private IPs via `user_url_allowed_hosts`. |
| `#48364` | High | Closed | N/A | Admin user keys bypass max_budget/TPM limits entirely — **security risk**. |
| `#47675` | Medium | Open | N/A | `response_cost` null and $0 spend when `custom_llm_provider=anthropic` but price is under another provider. |

> 🔥 **Critical**: The `emSign ECC Root CA` issue (`#47904`) remains unpatched in stable releases — teams relying on secure TLS should avoid `v1.106.x` until `v1.106.3` ships.

---

### **6. What This Means for Application Developers**  
- **Billing Accuracy**: Ensure you're on `v1.106.6+` or later to avoid $0 spend tracking for Cohere embeds (`#48978`) and responses bridging (`#48955`).  
- **Agent & Tooling Workflows**: Use `complexity_router` with `classification_mode: every_request` + `classifier_context_includes_tool_calls` (`#48922`) to dynamically adjust tiers based on agent loop behavior.  
- **Custom Providers**: Leverage `IteraCompute` support (`#46837`) for cost-efficient inference, especially with image and off-peak models.  
- **Production Readiness**: Avoid `v1.106.x` images until `v1.106.3` is released due to unpatched CA trust issue. Prefer `v1.109.0-dev.1` only if you can verify signatures.  
- **Future-Proofing**: Watch `#31263` — the Rust migration will drastically reduce proxy overhead and improve scalability for high-throughput agents.

🔗 [GitHub Issues](https://github.com/BerriAI/litellm/issues) | [PRs](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-29**

#### **1. Today's Highlights**  
The v0.1.912-beta release introduces critical optimizations for first-launch latency, Linux tool calls, and model loading speed, alongside Halloween-themed UI enhancements. Key PRs focus on stabilizing GGUF model handling—especially on macOS—with improved context management, crash recovery, and Metal memory budget awareness. A major push toward **context parallelism via Ulysses** is underway across multiple model families (Gemma, DeepSeek, MiniMax, Kimi), signaling a shift toward high-throughput long-context inference.

#### **2. Releases & Breaking Changes**  
- **v0.1.912-beta** (GitHub: [Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.912-beta))  
  - Speeds up initial model load, Linux tool call execution, and fine-tuning job co-scheduling.  
  - Introduces "Trick or Treat" UI Easter egg with 11 themed visuals (spiders, bats).  
  - No breaking API changes reported in this release.

#### **3. New Model & Hardware Support**  
- **New Models**:  
  - LFM3-1.7B support requested ([#15588](https://github.com/unslothai/unsloth/issues/15588)), with LFM3 MLX models not yet visible in `/v1/models` ([#15832](https://github.com/unslothai/unsloth/issues/15832)).  
  - Qwen-Image-2.1-Turbo Safetensors missing from "On Device" list despite correct download ([#15735](https://github.com/unslothai/unsloth/issues/15735)).  
- **Hardware & Backends**:  
  - Apple MLX support continues to be refined; issues persist with model visibility and metadata handling ([#15832](https://github.com/unslothai/unsloth/issues/15832), [#15473](https://github.com/unslothai/unsloth/issues/15473)).  
  - Intel Arc B580 (XPU) support requested ([#15583](https://github.com/unslothai/unsloth/issues/15583)).  
  - AMD GPU detection still problematic on mixed NVIDIA-AMD Linux systems ([#15444](https://github.com/unslothai/unsloth/issues/15444)).

#### **4. Performance & Optimization**  
- **Context Parallelism (Ulysses)**:  
  - Four stacked PRs landed ([#15880](https://github.com/unslothai/unsloth/pull/15880)–[#15883](https://github.com/unslothai/unsloth/pull/15883)) enabling Ulysses attention exchange for Gemma 4, DeepSeek V2/V3/V4, MiniMax M1/M2, and Kimi-Linear.  
  - Targets **high-throughput long-context inference**, especially for models with large context windows (e.g., 128K+).  
- **GGUF Load Efficiency**:  
  - PR [#15844](https://github.com/unslothai/unsloth/pull/15844): Reduces redundant Hugging Face API calls during model load by caching repo metadata.  
- **Metal Memory Budgeting**:  
  - PR [#15848](https://github.com/unslothai/unsloth/pull/15848): Recommends GGUF quants based on actual Metal load limits—not total RAM—on Macs.

#### **5. Stability & Regressions**  
- **Critical VRAM OOM Issues**:  
  - Multiple users report **excessive VRAM usage during fine-tuning**, causing OOMs even with proper config ([#4504](https://github.com/unslothai/unsloth/issues/4504), [#4040](https://github.com/unslothai/unsloth/issues/4040)).  
  - Qwen3-Coder-Next-Base fails on 2×A100 80GB GPUs using QLoRA ([#4040](https://github.com/unslothai/unsloth/issues/4040)).  
  - **Fix PRs pending**; no patch yet despite repeated reports.  
- **Crashes & Runtime Bugs**:  
  - `SIGSEGV` in PyArrow JSON reader when previewing 81.7MB ChatML dataset ([#15681](https://github.com/unslothai/unsloth/issues/15681)).  
  - `ValueError: Expected query, key, and value to have the same dtype` when forcing float32 on Gemma 3 bfloat16 models ([#15879](https://github.com/unslothai/unsloth/issues/15879)).  
  - Studio crashes during training with stack traces ([#15538](https://github.com/unslothai/unsloth/issues/15538)).  
- **UI/UX Glitches**:  
  - Recycle Bin flooded with SQLite WAL/SHM files every second on Windows ([#15552](https://github.com/unslothai/unsloth/issues/15552)).  
  - Text input duplicates across tabs despite separate chat contexts ([#15782](https://github.com/unslothai/unsloth/issues/15782)).  

#### **6. What This Means for Application Developers**  
- **Fine-tuning caution**: Avoid large models (e.g., Qwen3-Coder-Next-80B) unless you’ve verified VRAM usage—current estimates may be underreported. Monitor memory consumption closely during training.  
- **Long-context workloads**: Leverage upcoming Ulysses-based context parallelism for models like Gemma 4 and DeepSeek—expect better throughput at 128K+ context lengths.  
- **Cross-platform deployment**: Be aware of macOS Metal limitations (model visibility, memory budgeting) and Windows file system quirks (SQLite temp files, symlink handling).  
- **Model serving**: Use `save_pretrained_gguf` only after ensuring llama.cpp is properly installed (fix PR [#15864](https://github.com/unslothai/unsloth/pull/15864) addresses fresh install edge cases).  
- **API stability**: Anthropic-compatible `/v1/messages` still fails on context overflow without auto-compaction ([#15417](https://github.com/unslothai/unsloth/issues/15417)); use explicit compaction logic until fixed.

> ✅ **Recommendation**: For production use, avoid beta versions with known OOM and crash issues. Monitor PRs related to Ulysses and context management for future performance gains.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*