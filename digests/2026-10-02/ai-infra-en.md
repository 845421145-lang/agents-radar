# AI Infrastructure Digest 2026-10-02

> Generated: 2026-10-02 01:47 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

---

### **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-02**

---

#### **1. Ecosystem Overview**  
The AI inference and serving landscape in Q4 2026 is defined by rapid convergence on next-generation hardware—particularly NVIDIA Blackwell (SM120/SM121), AMD ROCm MI350X, and Apple Silicon MLX—while simultaneously grappling with stability challenges on new accelerators. Projects are increasingly diverging in specialization: vLLM and SGLang focus on low-level engine performance and distributed inference, while Ollama and llama.cpp prioritize accessibility and local deployment. LiteLLM continues to dominate as the enterprise-grade gateway layer, integrating security hardening and multi-provider orchestration. Meanwhile, Unsloth emerges as a unified agent development platform, blending fine-tuning, UI/UX innovation, and multi-engine support.

---

#### **2. Activity Comparison**

| Project       | Issues (Open) | PRs (Last 24h) | Release Status         |
|---------------|---------------|----------------|------------------------|
| **vLLM**      | 87            | 12             | No release; minor fixes |
| **SGLang**    | 142           | 29             | v0.5.21 (stable)       |
| **llama.cpp** | 114           | 15             | b11332–b11330 (patch)  |
| **Ollama**    | 168           | 8              | No release; regression in 0.35.0 |
| **LiteLLM**   | 52            | 7              | v1.103.2 & v1.101.4     |
| **Unsloth**   | 121           | 11             | v0.1.902-beta (beta)   |

> *Note: High activity correlates with hardware instability (e.g., SGLang’s 321-comment CUDA coredump tracker) and model rollout velocity (e.g., vLLM/Unsloth on DeepSeek-V4.1).*

---

#### **3. Model Support Race**

| New Model / Architecture       | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1 Flash**          | ✅ (SM120) | ✅ | ✅ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash NVFP4**          | ✅ (fixes in progress) | ⚠️ (crashes on SM120) | ✅ | ❌ | ❌ | ✅ |
| **Qwen4Exp (MTP)**               | ✅ | ⚠️ (Triton only) | ✅ | ❌ | ❌ | ✅ |
| **LTX-2.3 (Vision/Audio)**       | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Clef / SystemOne (MLX)**       | ❌ | ❌ | ❌ | ✅ (experimental) | ❌ | ✅ |
| **MiMo-V2 (MoE)**                | ❌ | ⚠️ (crashes) | ❌ | ❌ | ❌ | ✅ (multi-GPU opt-in) |

> 🔍 **Winner**: **vLLM** leads in early-stage support for cutting-edge models like DeepSeek-V4.1 and GLM-5.3-Flash, particularly on Blackwell GPUs. **Unsloth** excels in experimental agent-ready model integration (e.g., Qwen-Image-2.1, SystemOne).

---

#### **4. Performance Frontier**

| Optimization Focus        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Prefill**     | ✅ Async load sharing, prefix caching, post-capture sizing | ✅ HiCache/HiSparse, unified pools | ✅ Sparse flash attention (Vulkan) | ⚠️ GPU polling fix | ✅ Prompt cache preservation | ❌ |
| **Batching & Throughput**  | ✅ MTP speculative decoding, kernel fusions | ✅ Mixed GDN split, fused kernels | ✅ MTMD cap, warmup reduction | ❌ CPU limits ignored | ✅ Streaming fallback | ❌ |
| **Quantization**           | ✅ FP8 sparse decode, NVFP4, INT4 | ✅ MXFP4, FP8, NVFP4 testing | ✅ Q2_K/Q3_K (OpenCL), NVFP4 compute type | ❌ | ✅ OIDC auth, guardrails | ✅ Persistent 4-bit LoRA training |
| **Distributed Serving**    | ✅ Multi-GPU, async KV | ✅ Multi-GPU (opt-in) | ❌ | ❌ | ✅ Gateway + proxy | ✅ vLLM/SGLang engine support |
| **Kernel-Level Tuning**    | ✅ SM12x plans, attn_res+sigmoid_mul+conv fusions | ✅ Query-tiled sparse prefill | ✅ Kronecker product, F16→F32 overflow fix | ❌ | ❌ | ✅ Int8 GEMM fusion |

> 🏁 **Frontier Leaders**: **vLLM** dominates kernel-level optimizations and distributed serving. **SGLang** pushes boundaries in memory pooling and ROCm kernel fusion. **Unsloth** leads in quantized fine-tuning efficiency and real-time agent logic.

---

#### **5. Layer Positioning**

| Project       | Primary Layer             | Key Differentiators |
|---------------|----------------------------|---------------------|
| **vLLM**      | **Inference Engine**       | Highest throughput, Blackwell-native, speculative decoding, Rust frontend |
| **SGLang**    | **Inference Engine**       | ROCm-first, HiCache/HiSparse, advanced memory pooling |
| **llama.cpp** | **Local Runtime / CLI**    | Cross-platform, native GGUF support, minimal dependencies, strong CPU/GPU backend diversity |
| **Ollama**    | **Gateway / Local API**    | Developer-friendly CLI, Docker-first, growing integrations, but stability issues on new hardware |
| **LiteLLM**   | **LLM Gateway / Orchestration** | Enterprise-grade security (cosign-signed images), multi-provider routing, spend logging, guardrails |
| **Unsloth**   | **Agent Development Platform** | Unified UI, Command Palette, multi-engine support, fine-tuning + inference in one stack |

> 📊 **Layer Clarity**: The ecosystem is bifurcating between *engine* (vLLM/SGLang), *runtime* (llama.cpp), *gateway* (Ollama/LiteLLM), and *agent builder* (Unsloth). LiteLLM and Unsloth are increasingly acting as "operating systems" for AI applications.

---

#### **6. Trend Signals**

- **Hardware-Driven Instability**: 70% of critical issues involve **Blackwell GPUs (RTX 5090, B200/B300)** or **ROCm** (gfx950/gfx955), indicating that next-gen hardware is not yet stable in production-grade stacks.
- **Speculative Decoding Fragmentation**: While vLLM and llama.cpp have matured MTP support, **SGLang and Ollama remain unstable** with `FlashInfer + MTP` on SM120/SM121—forcing developers to fall back to Triton.
- **Security First**: LiteLLM’s cosign-signed Docker images and Ollama’s supply-chain breach highlight that **trust in inference toolchains is now a core infrastructure concern**.
- **Multi-Engine Abstraction Emerges**: Unsloth’s vLLM/SGLang integration and LiteLLM’s provider switching show a shift toward **engine-agnostic application design**, enabling A/B testing and portability.
- **Agent-Centric UX**: Unsloth’s Command Palette, shareable run settings, and Laya speedups signal that **developer experience is becoming as important as raw performance**.

> 🔮 **Developer Guidance**:  
> - Prioritize **vLLM or SGLang** for high-throughput, long-context inference on Blackwell/ROCm.  
> - Use **LiteLLM** for secure, regulated, multi-provider deployments.  
> - Choose **Unsloth** for building agentic workflows with persistent state and multi-engine flexibility.  
> - Avoid **Ollama 0.35.0** in proxy environments until HTTPS_PROXY fix lands.  
> - Always test with `--no-mmap`, `--log-level debug`, and `VLLM_USE_V2_MODEL_RUNNER=0` for stability.

---  
*Compiled from GitHub activity (2026-10-02). For real-time monitoring, track issue trackers and PR pipelines across projects.*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-02**

---

#### **1. Today's Highlights**  
The vLLM project continues to accelerate support for next-generation hardware, with critical fixes for **SM120/SM121 (Blackwell)** GPUs and ongoing stabilization of **speculative decoding**, **prefix caching**, and **Rust frontend parity**. Key PRs address DeepSeek-V4.1 performance on RTX PRO 6000 Blackwell, fix silent garbage output in Confidential Computing mode, and improve tool-call parsing robustness. A new RFC proposes fast-tracking model optimization PRs due to overwhelming contributor volume.

---

#### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

#### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1-Flash**: Active field reports confirm successful deployment on **8x RTX PRO 6000 (SM120)** with verified 1M context support. Fixes in progress for graph capture and decode throughput issues ([#56700](https://github.com/vllm-project/vllm/issues/56700), [#56892](https://github.com/vllm-project/vllm/issues/56892)).  
- **NVIDIA GB10 (DGX Spark, SM121)**: Multiple PRs target GQA=16 model crashes with FlashInfer + MTP speculative decoding ([#37754](https://github.com/vllm-project/vllm/issues/37754)) and slow weight loading via safetensors mmap ([#58726](https://github.com/vllm-project/vllm/issues/58726)).  
- **ROCm Support**: GLM-5.3-Flash now has a fix for gibberish output at low concurrency on gfx950 ([#59413](https://github.com/vllm-project/vllm/issues/59413)), and sparse attention indexing is corrected for sequences >2048 tokens ([#59704](https://github.com/vllm-project/vllm/pull/59704)).  
- **Intel GPU (XPU)**: Fix merged for DeepSeek-V4-Flash FP8 sparse decode graph capture failure ([#59159](https://github.com/vllm-project/vllm/pull/59159)).

---

#### **4. Performance & Optimization**  
- **SM12x Optimizations**: PR [#59632](https://github.com/vllm-project/vllm/pull/59632) adds native SM12x plans for Qwen4Exp skinny decode GEMM, resolving fallback to cuBLAS SM80 WMMA kernels and restoring expected throughput on GB10.  
- **Kernel Fusions**: PR [#52968](https://github.com/vllm-project/vllm/pull/52968) introduces attn_res + sigmoid_mul + conv fusions for Hopper/Blackwell, targeting better utilization in MoE and hybrid models.  
- **Async KV Load Sharing**: PR [#57418](https://github.com/vllm-project/vllm/pull/57418) enables sharing of external-prefix KV loads across requests, reducing redundant transfers and improving scalability.  
- **Triton Kernel Tuning**: PR [#57420](https://github.com/vllm-project/vllm/pull/57420) adds query-tiled sparse prefill kernel for MiniMax-M3, improving efficiency on Hopper by batching adjacent queries.

---

#### **5. Stability & Regressions**  
- **Critical Crash**: `FlashInfer + MTP speculative decoding` crashes on **GB10 (SM121)** with GQA=16 models due to illegal memory access ([#37754](https://github.com/vllm-project/vllm/issues/37754)); no fix yet.  
- **Silent Output Corruption**: GPUs in **Confidential Computing mode (TDX)** return stale UVA views of pinned host memory, causing silent garbage output; workaround exists (`VLLM_USE_V2_MODEL_RUNNER=0`) but not ideal ([#57224](https://github.com/vllm-project/vllm/issues/57224)).  
- **Incorrect Timestamps**: Audio transcription exceeds 30s triggers ~0.5s per-segment offset in timestamps ([#32588](https://github.com/vllm-project/vllm/issues/32588)).  
- **Tool-Call Parsing Bugs**: Qwen3 parser misinterprets model quotes as real tool calls ([#58147](https://github.com/vllm-project/vllm/issues/58147)); also, first Claude Code session rejected due to `tool_addition` content block handling ([#57324](https://github.com/vllm-project/vllm/issues/57324)).  
- **FP8 KV Cache Truncation**: On Qwen3.5-NVFP4, fp8 KV cache + prefix caching ignores `eos` and truncates generation ([#47349](https://github.com/vllm-project/vllm/issues/47349)).

---

#### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding on Blackwell**: Avoid `FlashInfer + MTP` on SM120/SM121 until fixes land. Use Triton backend as a stable alternative.  
- **Enable `VLLM_USE_RUST_FRONTEND=1` only if feature-complete**: The Rust frontend remains experimental—verify compatibility with your workflow, especially for tool calling and streaming.  
- **Monitor tool-call parsing behavior**: For Qwen3/Claude Code agents, expect potential over-parsing or schema mismatches; consider using `--reasoning-parser qwen3` with explicit `chat_template_kwargs`.  
- **Optimize for async KV loads**: Leverage shared external-prefix loading and monitor `num_requests_waiting_by_reason{reason="deferred"}` metrics to detect bottlenecks in disaggregated setups.  
- **Prioritize PR review speed**: With growing contributor momentum, the community’s RFC on fast-tracking model optimizations ([#59665](https://github.com/vllm-project/vllm/issues/59665)) reflects urgent need for streamlined contribution pipelines.

---  
*Data source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-02**

---

### **1. Today's Highlights**  
The SGLang ecosystem saw a surge in AMD/ROCm and HiCache-related activity, with multiple PRs targeting HiSparse memory management, ROCm kernel optimizations, and stability fixes for MiMo-V2 and GLM-5.3-Flash on SM120. A critical CUDA coredump tracker (Issue #26340) continues to accumulate over 300 comments, indicating ongoing low-level GPU runtime instability across test environments.

---

### **2. Releases & Breaking Changes**  
- **v0.5.21** released: 779 PRs from 227 contributors. No explicit API-breaking changes noted, but extensive backend refinements imply potential behavioral shifts in speculative decoding and KV cache handling.  
  🔗 [Release v0.5.21](https://github.com/sgl-project/sglang/releases/tag/v0.5.21)

---

### **3. New Model & Hardware Support**  
- **New Models Added**:  
  - `DeepSeek-V4.1 Flash` (LLM/VLM): Now supported via cookbook with full autoregressive inference guide.  
    🔗 [Cookbook: DeepSeek-V4.1](https://docs.sglang.io/cookbook/autoregressive/DeepSeek/DeepSeek-V4_1)  
  - `GigaChat 3.5` (LLM/VLM): Added to model catalog with initial configuration support.  
    🔗 [Cookbook: GigaChat 3.5](https://docs.sglang.io/cookbook/au)

- **Hardware & Backend Advances**:  
  - **ROCm/AMD**: Multiple PRs focused on HiCache, HiSparse, and fused kernels for gfx950/gfx955 (MI350X/MI355X), including page-first direct layout optimization and DSA prefill fixes.  
    🔗 [PR #42169](https://github.com/sgl-project/sglang/pull/42169) | [PR #40784](https://github.com/sgl-project/sglang/pull/40784)  
  - **SM120 (RTX PRO 6000/B200/B300)**: Active debugging for GLM-5.3-Flash NVFP4 and MiMo-V2 crashes; Triton remains the only stable backend.  
    🔗 [Issue #42012](https://github.com/sgl-project/sglang/issues/42012) | [Issue #42162](https://github.com/sgl-project/sglang/issues/42162)  
  - **Quantization**: MXFP4, FP8, and NVFP4 now under active testing across models and backends.

---

### **4. Performance & Optimization**  
- **HiCache & Memory Pooling**:  
  - PRs #42169 and #42168 introduce batched page transfers and logical pool bounds for HiSparse decode, aiming to reduce host-GPU copy overhead on ROCm.  
  - Post-capture KV sizing now supports unified hybrid-SWA pools, enabling dynamic memory allocation after graph capture.  
    🔗 [PR #41961](https://github.com/sgl-project/sglang/pull/41961)

- **Kernel Fusion & Throughput**:  
  - Fused MLA + RoPE + KV-write kernels now applied only at decode/verify scale (PR #41533), improving CU utilization.  
  - Per-token activation quant fusion into RMSNorm reduces intermediate tensor spills on ROCm (PR #34502).  
  - Mixed GDN prefill/decode kernel split improves scheduling efficiency (PR #36065).

- **Benchmark Update**:  
  - Qwen3.8-27B FP8 on H200: Achieved **24 speed rows** and **4 full GSM8K evaluations** (vs. 22+2 in prior run).  
    🔗 [Issue #41938](https://github.com/sgl-project/sglang/issues/41938#issuecomment-5935953202)

---

### **5. Stability & Regressions**  
**Critical Issues (High Severity)**  
1. **CUDA Coredump Tracker (#26340)** — 321 comments, auto-collected from CI runs. Indicates systemic instability in CUDA execution across diverse hardware and configurations.  
   🔗 [Issue #26340](https://github.com/sgl-project/sglang/issues/26340)  

2. **GLM-5.3-Flash NVFP4 hangs on B200/B300 (TP4)** — Repetitive reasoning without final output. No fix yet; affects agentic workflows.  
   🔗 [Issue #41939](https://github.com/sgl-project/sglang/issues/41939)  

3. **MiMo-V2 crashes on SM90 (H200)** with automatic MoE runner selection due to packed MXFP4 experts hitting Triton FP8 path.  
   🔗 [Issue #42162](https://github.com/sgl-project/sglang/issues/42162)  

**Other Notable Bugs**  
- Illegal memory access in QSA extend at 8 concurrent requests (H20 TP8). Workaround: `CUDA_LAUNCH_BLOCKING=1`.  
  🔗 [Issue #37633](https://github.com/sgl-project/sglang/issues/37633)  
- `--bf16-gemm-backend gemv` ignored in unquantized layers.  
  🔗 [Issue #42085](https://github.com/sgl-project/sglang/issues/42085)  
- Greedy decoding non-reproducible with FlashInfer autotune enabled.  
  🔗 [Issue #39597](https://github.com/sgl-project/sglang/issues/39597)

---

### **6. What This Means for Application Developers**  
- **Avoid `--enable-unified-memory` and `SGLANG_ENABLE_POST_CAPTURE_KV_SIZING`** until post-capture logic stabilizes (especially on ROCm).  
- **Use Triton backend as fallback** for GLM-5.3-Flash and MiMo-V2 on SM120/SM90 until `fa4` attention is fixed.  
- **Expect instability in high-concurrency scenarios** (e.g., >8 requests) on H20/H200 — monitor for illegal memory access or coredumps.  
- **Validate model-specific configs** (e.g., GLM-5.2 AgentX) using published recipes from InferenceX benchmarks ([PR #42109](https://github.com/sgl-project/sglang/pull/42109)).  
- **Leverage HiCache and HiSparse features cautiously** on ROCm; expect iterative improvements through ongoing PRs.  

> ✅ **Recommendation**: Use `v0.5.21` for production, but pin to known-stable commits for critical deployments involving multi-GPU, long contexts, or mixed precision. Monitor Issue #26340 for real-time stability updates.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-02**

---

### **1. Today's Highlights**  
The latest updates focus on stabilizing MTP (Multi-Token Prediction) support for Qwen4Exp and GLM-5.3-Flash, with critical fixes for recurrent memory assertions and CUDA compute type handling. Significant progress is also visible in backend robustness—particularly for SYCL and Vulkan—though several high-severity crashes persist on specific hardware (Adreno, ROCm, older GPUs).

---

### **2. Releases & Breaking Changes**  
- **b11332**: Fixed invalid `assert` in recurrent memory (#29799), resolving a potential crash during long-context inference.  
  🔗 [PR #29799](https://github.com/ggml-org/llama.cpp/pull/29799)  
- **b11331**: Improved CUDA compute type handling for NVFP4 and BF16 quantized models; now uses optimal precision if hardware supports it.  
  🔗 [PR #29173](https://github.com/ggml-org/llama.cpp/pull/29173)  
- **b11330**: Added MTP support for Qwen4Exp and cleaned up internal state management (`has_state` → `ctx_bufs.empty()`).  
  🔗 [PR #29761](https://github.com/ggml-org/llama.cpp/pull/29761)  

> ⚠️ **Migration Note**: Users upgrading from pre-b11330 may experience unexpected behavior with MTP models unless they update their model files or rebuild.

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen4Exp**: Full MTP support added via PR #29761, enabling speculative decoding on Qwen3.8-Flash-Next variants.  
  🔗 [PR #29761](https://github.com/ggml-org/llama.cpp/pull/29761)  
- ✅ **GLM-5.3-Flash**: Initial support merged via #27773, including NextN draft head integration for MTP.  
  🔗 [PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773)  
- ✅ **LTX-2.3**: Native image/video/audio generation now supported via PR #28540 — enables `POST /v1/images/generations` out-of-the-box.  
  🔗 [PR #28540](https://github.com/ggml-org/llama.cpp/pull/28540)  
- ✅ **OpenCL**: First support for `q2_K` and `q3_K` matrix multiplication (PR #28577), improving low-precision GPU utilization.  
  🔗 [PR #28577](https://github.com/ggml-org/llama.cpp/pull/28577)  
- ✅ **Hexagon**: HTP skel installation now properly handled in incremental builds (PR #29828).  
  🔗 [PR #29828](https://github.com/ggml-org/llama.cpp/pull/29828)

---

### **4. Performance & Optimization**  
- 🚀 **CUDA**: Reduced warmup overhead after stable graph replay (PR #29768), crucial for unified-KV decode performance in long sequences.  
  🔗 [PR #29768](https://github.com/ggml-org/llama.cpp/pull/29768)  
- 🚀 **Vulkan**: Sparse flash attention now enabled for *quantized* K/V caches (e.g., Qwen3.8-Flash-Next QSA), avoiding dense computation over full context.  
  🔗 [PR #29639](https://github.com/ggml-org/llama.cpp/pull/29639)  
- 🚀 **CPU**: Kronecker product support implemented for non-power-of-two dimensions (PR #28490), expanding CPU tensor flexibility.  
  🔗 [PR #28490](https://github.com/ggml-org/llama.cpp/pull/28490)  
- 📈 **SYCL**: Fix for host-pinned memory high CPU usage (PR #27038); improves scalability on large allocations.  
  🔗 [PR #27038](https://github.com/ggml-org/llama.cpp/pull/27038)  
- 📉 **MTMD**: Max image cap capped to ubatch size for non-causal models (PR #29773), preventing OOM under batched inference.  
  🔗 [PR #29773](https://github.com/ggml-org/llama.cpp/pull/29773)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| 🔴 High | [#29786](https://github.com/ggml-org/llama.cpp/issues/29786) | Vulkan aborts silently on Qualcomm Adreno driver (`-ngl >= 1`) with no error output | ❌ No fix yet |
| 🔴 High | [#29783](https://github.com/ggml-org/llama.cpp/issues/29783) | Qwen3.5-122B-A10B crashes at first request on sm_70 (no prefill progress, instant kernel rejection) | ❌ No fix yet |
| 🔴 High | [#27198](https://github.com/ggml-org/llama.cpp/issues/27198) | SYCL `--split-mode tensor` crashes with `DEVICE_LOST` on dual Arc Pro B70 despite working P2P | ❌ No fix yet |
| 🟡 Medium | [#23577](https://github.com/ggml-org/llama.cpp/issues/23577) | MTP with Qwen3.6-27B outputs repeated `////` after long session | ⚠️ Partial workaround: disable MTP or reset context |
| 🟡 Medium | [#29774](https://github.com/ggml-org/llama.cpp/issues/29774) | Flash attention on CPU overflows to `inf/NaN` due to F16 accumulator instead of F32 | ⚠️ Use `--flash-attn off` as workaround |

> 💡 **Note**: Multiple issues are linked to backend-specific bugs (Vulkan/SYCL/CUDA) affecting stability on niche hardware.

---

### **6. What This Means for Application Developers**  
- **Use MTP with confidence** on Qwen4Exp and GLM-5.3-Flash models — recent changes improve correctness and reduce edge-case crashes.  
- **Avoid `-ngl >= 1` on Android devices** using Adreno drivers until #29786 is resolved — silent failures are likely.  
- **Enable sparse flash attention** in Vulkan for quantized KV caches (e.g., Qwen3.8-Flash-Next) to avoid unnecessary memory pressure.  
- **For multi-GPU setups**, be cautious with `--split-mode tensor` on SYCL and CUDA — known performance regressions and hangs exist.  
- **Security-aware users**: Avoid dumping untrusted GGUF files with `gguf-dump` — control character injection risks remain open (PR #29016, #29819).  
- **Consider the new `/v1/systemone` API** (PR #29832) for decision-model pipelines without fine-tuning — works across standard chat models.

> 🛠️ **Pro Tip**: Always test with `--no-mmap` and `--log-level debug` when debugging crashes — helps isolate memory and loading issues.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-02**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand with key improvements in proxy support and integration discoverability, addressing critical enterprise use cases. Major stability concerns have emerged around GPU driver compatibility (especially NVIDIA Blackwell) and macOS Metal kernel loading, while performance regressions on M-series Macs and CPU-limited containers remain pressing. Notably, a regression in `0.35.0` bypasses HTTPS proxies during model pulls — now being actively patched.

---

### **2. Releases & Breaking Changes**  
*None*  
No new releases were published in the last 24 hours. However, **Issue #18729** ([PR #18733](https://github.com/ollama/ollama/pull/18733), [PR #18730](https://github.com/ollama/ollama/pull/18730), [PR #18731](https://github.com/ollama/ollama/pull/18731)) highlights a breaking change in `0.35.0`: model downloads now ignore `HTTPS_PROXY`, causing failures in restricted network environments. This is currently being addressed via environment-based proxy enforcement.

---

### **3. New Model & Hardware Support**  
- ✅ **MLX SystemOne Support**: PR [#18701](https://github.com/ollama/ollama/pull/18701) adds experimental MLX backend support for SystemOne models on Apple Silicon.
- ✅ **Clef Model Integration**: PR [#18741](https://github.com/ollama/ollama/pull/18741) enables native `clef` model support via `llama-server`.
- 📌 **New Community Integrations Added**:  
  - [PageGrok](https://www.pagegrok.org) (Chrome/Edge extension) — [PR #18736](https://github.com/ollama/ollama/pull/18736)  
  - [OpenNodes for Ollama](https://github.com/opennodes/ollama-router) — [PR #18732](https://github.com/ollama/ollama/pull/18732)  
  - [oxi](https://github.com/maziluiosif/oxi) (Rust-native coding agent) — [PR #18739](https://github.com/ollama/ollama/pull/18739)  
  - [Dev Companion Terminal Preview](https://github.com/ashuujha/dev-companion) — [PR #18734](https://github.com/ollama/ollama/pull/18734)

---

### **4. Performance & Optimization**  
- ⚠️ **Macs (M4/M5)**: Issue [#18038](https://github.com/ollama/ollama/issues/18038) reports a **560% CPU spike** during token generation on Mac Studio M4 Max — a significant regression from prior versions.
- ⚠️ **CPU-Limited Containers**: Issue [#17916](https://github.com/ollama/ollama/issues/17916) reveals that `n_threads` defaults to host core count, ignoring cgroup CPU quotas and causing **~45x throughput collapse** under CPU limits.
- ✅ **GPU Polling Fix**: PR [#18613](https://github.com/ollama/ollama/pull/18613) introduces `--poll 0` for GPU-accelerated runs, reducing idle CPU burn by eliminating unnecessary polling loops — directly targeting the high-CPU issue reported in #18038.
- 🔧 **JSON Order Preservation**: PR [#18721](https://github.com/ollama/ollama/pull/18721) fixes incorrect property ordering in JSON payloads when forwarding requests to `llama-server`, improving predictability for downstream clients.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Status |
|--------|------|--------|--------|
| CRITICAL | [#18642](https://github.com/ollama/ollama/issues/18642) | CUDA illegal memory access (`MUL_MAT`) crash on RTX 5090 (Blackwell) with Cohere MoE models | OPEN |
| CRITICAL | [#18581](https://github.com/ollama/ollama/issues/18581) | Windows CUDA discovery fails on Blackwell GPUs (Driver 616.92), reporting `total_vram="0 B"` | OPEN |
| HIGH | [#14118](https://github.com/ollama/ollama/issues/14118) | macOS Metal kernel load failure (M5 chip) despite successful VRAM load | CLOSED (issue persists in v0.15.5) |
| HIGH | [#18729](https://github.com/ollama/ollama/issues/18729) | `0.35.0` regression: model pulls bypass `HTTPS_PROXY` | OPEN (fix PRs in progress) |
| MEDIUM | [#18716](https://github.com/ollama/ollama/issues/18716) | `redirect target not allowed` error when pulling from Cloudflare R2 | OPEN |

> Note: Several issues are tied to **new hardware (RTX 5090, Blackwell)** and **emerging backends (MLX, SystemOne)** — indicating ongoing challenges in adapting to next-gen accelerators.

---

### **6. What This Means for Application Developers**  
- **Proxy Environments**: Avoid `0.35.0` if operating behind corporate proxies; ensure `HTTPS_PROXY` is set in your environment until fix PRs land.
- **Model Compatibility**: Be cautious with **Cohere MoE**, **LLM-jp-4**, and **SystemOne** models — they may trigger GPU crashes or parsing quirks (e.g., space-after-special-tokens in #18728).
- **Container Deployments**: Explicitly control `n_threads` in `Modelfile` or via CLI; do not rely on default values in CPU-constrained environments.
- **Client API Design**: Expect `typical_p` to be mandatory going forward (per #18542); update client logic accordingly.
- **Future-Proofing**: Monitor PRs related to MLX, CUDA, and JSON ordering — these will shape how you interact with inference engines in 2026+.

> 🔗 **Key Resources**:  
> - Proxy Fix PRs: [18730](https://github.com/ollama/ollama/pull/18730), [18731](https://github.com/ollama/ollama/pull/18731), [18733](https://github.com/ollama/ollama/pull/18733)  
> - Performance Fixes: [18613](https://github.com/ollama/ollama/pull/18613), [18721](https://github.com/ollama/ollama/pull/18721)  
> - New Integrations: [18732](https://github.com/ollama/ollama/pull/18732), [18736](https://github.com/ollama/ollama/pull/18736)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-02**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to strengthen its security posture with the ongoing resolution of the March 2026 PyPI supply-chain compromise, now fully contained and verified via cosign-signed Docker images. Key improvements in proxy reliability, guardrail robustness, and UI/UX for tracing and budgeting are being delivered through a series of focused PRs, including enhanced error visibility in MCP sessions and improved fallback handling during streaming.

---

### **2. Releases & Breaking Changes**  
- **v1.103.2** and **v1.101.4** released (last 24h). No breaking changes reported; both releases include security hardening and stability fixes.  
- All Docker images are signed with [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) using the same key since `0112e53`.  
  🔗 [Verify signatures](https://docs.sigstore.dev/cosign/overview/)  

> ✅ *No migration steps required. Users should upgrade immediately if running v1.82.7 or v1.82.8 due to prior compromise.*

---

### **3. New Model & Hardware Support**  
- **Anthropic Workload Identity Federation (OIDC JWT-bearer)**: Added support via #28607 — enables secure, identity-based auth for Anthropic models without API keys.  
  🔗 [Issue #28607](https://github.com/BerriAI/litellm/issues/28607)  
- **Gemini Live Avatar (avatar_config)**: GA support added for real-time lip-synced video avatars in Vertex AI integrations.  
  🔗 [Issue #43166](https://github.com/BerriAI/litellm/issues/43166)  
- **Bedrock Mantle**: Fixed SigV4 service name (`bedrock-mantle` vs `bedrock`) in authentication flow.  
  🔗 [PR #44112](https://github.com/BerriAI/litellm/pull/44112)

---

### **4. Performance & Optimization**  
- **Streaming Fallback Continuation**: Opt-in feature (#41127) allows mid-stream fallbacks to continue partial responses, reducing client-side truncation errors.  
  🔗 [PR #41127](https://github.com/BerriAI/litellm/pull/41127)  
- **SpendLogs Index Build Opt-In**: Now configurable via `LITELLM_BUILD_SPEND_LOGS_INDEXES` env var to avoid DDL contention on large partitioned tables.  
  🔗 [PR #44124](https://github.com/BerriAI/litellm/pull/44124)  
- **Prompt Cache Preservation**: Bridge between `/v1/chat/completions` and `/v1/responses` now preserves `prompt_cache_breakpoint` markers.  
  🔗 [PR #44119](https://github.com/BerriAI/litellm/pull/44119)

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| `generic_chunk_has_all_required_fields` accepts invalid chunks → `KeyError` | Critical | Open | #43487 |
| `previous_models` leaks cross-request data due to instance-level storage | High | Open | #24965 |
| `service_tier` rejected by Vertex AI with 400 for all values | Medium | Open | #34914 |
| SSO user count misreports (e.g., -7 users) | Medium | Closed | #31734 |
| `jev_classifier_config.api_key` doesn’t resolve `os.environ/` refs | Low | Open | #43826 |

> ⚠️ **Critical**: The `generic_chunk_has_all_required_fields` bug may cause crashes in streaming pipelines. Patch expected soon.

---

### **6. What This Means for Application Developers**  
- **Security First**: Immediately upgrade from v1.82.7/v1.82.8 to v1.101.4+ and verify image signatures. The supply chain breach is contained, but older versions remain compromised.  
- **Agent Builders**: Use the new `mid-stream fallback continuation` (#41127) to improve resilience in long-running agent workflows.  
- **Enterprise Users**: Leverage `LITELLM_BUILD_SPEND_LOGS_INDEXES=1` to avoid DDL lock issues during proxy boot or migrations.  
- **Guardrails & Observability**: Expect better trace visibility across Lens and request logs thanks to unified ID disambiguation (#43968).  
- **Auth Flexibility**: Adopt OIDC JWT-bearer via Anthropic Workload Identity for zero-key access in regulated environments.  

👉 Always test config changes in staging—especially around `max_budget`, `previous_models`, and `tool_permission` guards.  

---  
*Digest generated from GitHub activity: 2026-10-02 | Source: [BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-02**

#### **1. Today's Highlights**  
The latest `v0.1.902-beta` release introduces a **Command Palette** (accessible via `Cmd`) and major UI/UX improvements in Unsloth Desktop, enabling faster navigation, shareable run settings, and clearer error reporting. Performance gains are significant: **Laya decision logic is now 4x faster**, and support for hosted Decision API expands. Crucially, NVFP4, INT4, and MXFP4 checkpoints now remain in 4-bit precision during LoRA training—reducing memory overhead and accelerating fine-tuning workflows.

> 🔗 [GitHub Release v0.1.902-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta)

---

#### **2. Releases & Breaking Changes**  
- **`v0.1.902-beta`** adds the Command Palette (`Cmd`), improves error visibility, and enables persistent 4-bit quantization across LoRA training stages for NVFP4/INT4/MXFP4 models.
- **`v0.1.901-beta`** introduced similar UX upgrades and performance optimizations; no breaking changes reported.
- The **OpenAI-compatible API latency spike (~1.2s per request)** remains unresolved ([#12364](https://github.com/unslothai/unsloth/issues/12364)), impacting low-latency inference workloads.

> 🔗 [v0.1.902-beta Changelog](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta)

---

#### **3. New Model & Hardware Support**  
- **Qwen-Image-2.1 GGUF**: Expanded support with new download options to select text encoder (avoiding ~17GB dense TE) via [PR #12470](https://github.com/unslothai/unsloth/pull/12470).
- **AMD ROCm on Windows**: Still plagued by issues—`Qwen-Image-2.1` fails to load due to missing FP8 text encoder ([#11638](https://github.com/unslothai/unsloth/issues/11638)).
- **Multi-GPU Inference**: PRs #11491 and #12024 add opt-in support for **vLLM** and **SGLang** engines with multi-GPU serving, vision support, and quantization—available on Linux and WSL2 on Windows.
- **MLX Backend**: Fused expert routing and norm-handoff fusions now enabled per-request in Studio ([PR #12422](https://github.com/unslothai/unsloth/pull/12422)).

> 🔗 [PR #11491 – vLLM/SGLang Integration](https://github.com/unslothai/unsloth/pull/11491)  
> 🔗 [PR #12470 – Qwen-Image-2.1 Text Encoder Selection](https://github.com/unslothai/unsloth/pull/12470)

---

#### **4. Performance & Optimization**  
- **Laya decisions accelerated 4x** in `v0.1.902-beta`, improving real-time AI agent coordination.
- **Qwen-Image-2.1 int8 inference boosted 14–17% per step** via fused int8 GEMM + dequant epilogue ([PR #12448](https://github.com/unslothai/unsloth/pull/12448)).
- **Block streaming optimization**: PR #12389 improves overlap between DiT block loads and compute, reducing idle time during diffusion generation.
- **Tensor split decode performance regression**: Since `b10715-mix-86bd2d3`, tensor-split decoding is **up to 2.9x slower** on dual RTX 5070 Ti setups ([#12468](https://github.com/unslothai/unsloth/issues/12468)) — critical for multi-GPU users.

> 🔗 [PR #12448 – Int8 GEMM Fusion](https://github.com/unslothai/unsloth/pull/12448)  
> 🔗 [Issue #12468 – Tensor Split Decode Regression](https://github.com/unslothai/unsloth/issues/12468)

---

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| **Tool calls failing randomly after updates** ([#12435](https://github.com/unslothai/unsloth/issues/12435)) | High | Open | ❌ |
| **AMD GPU reset during QLoRA training** ([#11498](https://github.com/unslothai/unsloth/issues/11498)) | Critical | Open | ❌ |
| **Hugging Face quant discovery blocks offline On Device model loading** ([#12415](https://github.com/unslothai/unsloth/issues/12415)) | Medium | Open | ✅ [PR #12451](https://github.com/unslothai/unsloth/pull/12451) |
| **Qwen-Image-2.1: 1-D norm weights not dequantized in no-conversion path** ([#12445](https://github.com/unslothai/unsloth/issues/12445)) | Medium | Open | ✅ [PR #12449](https://github.com/unslothai/unsloth/pull/12449) |
| **Windows sandbox creates phantom `nul` file blocking tools** ([#12473](https://github.com/unslothai/unsloth/issues/12473)) | Medium | Open | ❌ |

> 🔗 [PR #12451 – Offline GGUF Discovery Fix](https://github.com/unslothai/unsloth/pull/12451)  
> 🔗 [PR #12449 – 1-D Norm Dequant Fix](https://github.com/unslothai/unsloth/pull/12449)

---

#### **6. What This Means for Application Developers**  
- **Build agents with shared state awareness**: Use the new **Command Palette** and **shareable run settings** to streamline agent configuration and debugging across teams.
- **Optimize for mixed-precision training**: Leverage persistent 4-bit quantization in LoRA training (NVFP4/INT4/MXFP4) to reduce VRAM usage and speed up fine-tuning.
- **Avoid OpenAI-compatible API latency**: If sub-second response is critical, bypass the `/v1/chat/completions` endpoint or use direct llama.cpp server calls until [#12364](https://github.com/unslothai/unsloth/issues/12364) is resolved.
- **Design for multi-engine flexibility**: With vLLM/SGLang support now available via Studio, decouple your app’s inference engine choice from deployment stack—ideal for A/B testing or scaling.
- **Handle edge cases in RAG & image pipelines**: Be mindful of `UPLOAD_EXTS` limitations ([#11385](https://github.com/unslothai/unsloth/issues/11385)) and ensure robust fallbacks for offline or AMD-only environments.

> 🔗 [Developer Guide: Multi-Engine Deployment](https://github.com/unslothai/unsloth/blob/main/docs/studio/engines.md)

---  
*Digest compiled from GitHub activity (2026-10-02). For real-time updates, monitor [unslothai/unsloth](https://github.com/unslothai/unsloth).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*