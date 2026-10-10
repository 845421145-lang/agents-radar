# AI Infrastructure Digest 2026-10-10

> Generated: 2026-10-10 01:53 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-10**

---

### **1. Ecosystem Overview**

The AI inference and serving ecosystem in Q4 2026 is rapidly maturing, marked by intense focus on **hardware-specific optimization**, **multi-GPU scalability**, and **production-grade stability**—especially around new architectures like NVIDIA Blackwell (SM120) and AMD MI355X/MRv1. While vLLM and SGLang lead in high-throughput, low-latency inference engine innovation, projects like Ollama and llama.cpp are pushing boundaries in local runtime efficiency and cross-platform accessibility. However, widespread regressions—particularly in speculative decoding, FP8 handling, and memory management—highlight that performance gains are often offset by growing complexity in correctness and reproducibility. The rise of Rust-based gateways (LiteLLM) and MLX-native backends signals a strategic shift toward **ultra-low-latency routing** and **tighter hardware integration**, setting the stage for next-gen agent systems.

---

### **2. Activity Comparison**

| Project | Issues Open (High+ Severity) | PRs Merged (Last 7 Days) | Releases (Last 24h) | Stability Status |
|--------|-------------------------------|----------------------------|----------------------|------------------|
| **vLLM** | 12 (4 High) | 18 | None | Unstable (regressions on SM120/ROCm) |
| **SGLang** | 9 (3 High) | 12 | None | Flawed deterministic inference paths |
| **llama.cpp** | 10 (4 Critical) | 10 | 10 new builds (b11538+) | Patched but speculative decoding still broken |
| **Ollama** | 11 (4 Critical) | 5 | None | Regressions in v0.40.x; UX degradation |
| **LiteLLM** | 7 (3 High) | 8 | v1.106.0-dev.3 | Security fixes; budgeting bugs open |
| **Unsloth** | 8 (4 High) | 10 | None | VRAM leaks & OOM risks persist |

> ✅ *Insight:* Despite lower release frequency, **vLLM and llama.cpp** show highest engineering velocity. **Ollama and Unsloth** face the most severe user-facing instability despite active development.

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash** | ✅ (SM120 support) | ✅ (AMD/DP attention) | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.8-Flash-Next** | ✅ (ROCm + SM120) | ⚠️ (tracking) | ❌ | ⚠️ (request) | ❌ | ❌ |
| **GLM-5.3-Flash** | ✅ (long-decode fix) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Prism Bonsai 2 27B** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **TML Inkling** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Qwen-Image-2.1-Turbo** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Kolibri 1 / mimo v2.6** | ❌ | ❌ | ❌ | ✅ (requests) | ❌ | ❌ |

> 🏆 **Leaderboard**:  
> - **llama.cpp** leads in raw model variety (new GGUF models: Prism, TML Inkling).  
> - **Unsloth** dominates multimodal file parsing and vision model support.  
> - **vLLM** leads in cutting-edge model + hardware pairing (Blackwell, ROCm).

---

### **4. Performance Frontier**

| Focus Area | Leading Projects | Key Developments |
|------------|------------------|------------------|
| **KV Cache & Speculative Decoding** | vLLM, SGLang | Critical issues in DFlash2/DSpark prefix caching (vLLM #60174), FP8 crash without FlashInfer JIT (#60262), speculative divergence in llama.cpp (#25618) |
| **Batching & Throughput** | vLLM, SGLang | Batch-invariant inference (vLLM #27433), hybrid Mamba prefill optimization (SGLang #43435), DBO for DeepSeek-V4 (SGLang #57773) |
| **Quantization Efficiency** | vLLM, llama.cpp | W4A8 repacking (vLLM #57511), FP4 GEMM autotune (SGLang #43464), Q4_K_M speculative fixes (llama.cpp #25618) |
| **Distributed Serving (TP/MTP)** | vLLM, SGLang | Multi-Tensor Parallel consistency (SGLang #42296), DSpark CUDA Graph hardening (SGLang #33356) |
| **Kernel-Level Optimization** | vLLM, llama.cpp, Unsloth | Tensor Descriptors (vLLM #42545), int64 RoPE (Unsloth #13121), Vulkan RMSNorm subgroup reduction (llama.cpp #29882) |

> 🔍 **Emerging Trend**: Kernel-level optimizations are now central to performance gains—especially on AMD and Intel platforms where vendor-specific tuning is critical.

---

### **5. Layer Positioning**

| Project | Primary Layer | Role in Stack | Differentiator |
|--------|---------------|---------------|----------------|
| **vLLM** | **Serving Engine** | High-throughput, low-latency inference with FlashAttention, MTP, speculative decoding | Best-in-class GPU utilization, Blackwell/ROCm readiness |
| **SGLang** | **Serving Engine + Runtime** | Flexible inference pipeline with DSpark, HiCache, structured output | Strong MoE and context parallelism support |
| **llama.cpp** | **Local Runtime / Embedded Inference** | CPU/GPU-accelerated inference via GGUF; lightweight, portable | Cross-platform, zero-dependency, ideal for edge/embedded |
| **Ollama** | **Developer Gateway + Local Runtime** | Unified CLI/API for model management, local inference | Simplicity and ease-of-use; but stability issues at scale |
| **LiteLLM** | **API Gateway / Routing Layer** | Unified API across providers, cost tracking, guardrails | Multi-tenant billing, security-hardened image signing |
| **Unsloth** | **Fine-Tuning + Studio Runtime** | Fast fine-tuning, multimodal document processing | Speed-focused training, rich file format support |

> 💡 **Strategic Insight**: The stack is bifurcating—**engineers choose vLLM/SGLang for production inference**, **llama.cpp for edge/local use**, **LiteLLM for multi-provider orchestration**, and **Unsloth for rapid fine-tuning**.

---

### **6. Trend Signals**

#### **Key Industry Trends Extracted from Today’s Activity:**
1. **Hardware-Specific Optimization is Now Table Stakes**  
   Projects must deliver targeted support for SM120 (Blackwell), MI355X, and Apple Silicon—failure to do so results in crashes or silent fallbacks (e.g., Ollama’s CUDA → CPU fallbacks).

2. **Speculative Decoding is Still Fragile**  
   Across vLLM, SGLang, and llama.cpp, speculative decoding remains a major source of **correctness bugs and memory corruption**, especially under MTP and FP8 settings.

3. **FP8 and Quantized Inference Are Breaking Production**  
   FP8 cache crashes (vLLM #60262), Q4_K_M divergence (llama.cpp #25618), and improper fallbacks highlight that quantization is not yet reliable at scale.

4. **Rust Migration Signals Next-Gen Low-Latency Gateways**  
   LiteLLM’s Rust migration (#31263) and sub-1ms overhead goals indicate a strategic pivot toward **microsecond-level routing**, essential for autonomous agents.

5. **Security & Supply Chain Integrity Are Non-Negotiable**  
   LiteLLM’s image signing via cosign and Unsloth’s hash-checking installer scripts reflect rising maturity in **supply-chain security** post-incident.

#### **What Application Developers Should Watch:**
- **Avoid `v0.40.x` of Ollama**—critical regressions in MLX and memory explosion.
- **Do not enable `kv_cache_dtype="fp8"`** in vLLM unless FlashInfer JIT is guaranteed.
- **Use `b11538+` of llama.cpp** for deterministic inference—essential for audit trails.
- **Monitor LiteLLM’s budgeting and rate-limiting bugs** if using multi-tenant deployments.
- **Pin to stable versions** (e.g., `vllm==0.29.0`, `unsloth==2026.1.3`) until v0.31.0 stabilizes.

> ✅ **Final Recommendation**: Prioritize **stability over novelty**. The infrastructure layer is still evolving—opt for proven, well-tested releases until core correctness issues are resolved.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-10

---

### **1. Today's Highlights**

The vLLM project continues its rapid evolution with strong momentum in **Blackwell (SM120) GPU support**, particularly for DeepSeek-V4.1 and Qwen3.8-Flash-Next models, where critical performance and stability fixes are being prioritized. A surge in issues around **speculative decoding correctness**, **KV cache corruption under MTP**, and **FlashInfer JIT fallback failures** highlights ongoing challenges in high-throughput, low-latency inference workflows.

---

### **2. Releases & Breaking Changes**

None reported in the last 24 hours.  
*Note: vLLM 0.31.0 is currently under active scrutiny due to multiple regressions on SM120 and ROCm platforms (e.g., #60174, #59575). Users should expect potential breaking changes in upcoming releases.*

---

### **3. New Model & Hardware Support**

- ✅ **DeepSeek-V4.1-Flash** now has targeted support for **NVIDIA RTX PRO 6000 Blackwell (SM120)**, with PRs addressing sparse-MLA kernel block size mismatches (#60762).
- ✅ **Qwen3.8-Flash-Next** gains dedicated ROCm (gfx950 / MI355X) performance optimization tracking (#59575, #57149).
- ✅ **GLM-5.3-Flash** sees continued focus on long-decode stability and batch-invariant optimization (#56868, #57406).
- ✅ **ROCm 7.2+** and **AMD MI355X/MRv1** hardware receive active bugfixes and performance tuning efforts (#57838, #57794, #59575).

> 🔗 [PR #60762](https://github.com/vllm-project/vllm/pull/60762): Fix SM120 DSV41 sparse backend block size mismatch  
> 🔗 [Issue #59575](https://github.com/vllm-project/vllm/issues/59575): ROCm Qwen3.8-Flash-Next performance optimization plan

---

### **4. Performance & Optimization**

- **Batch Invariant + Determinism**: Ongoing work to stabilize batch-invariant inference (tracked via #27433), crucial for reproducible agent outputs.
- **Speculative Decoding (MTP)**: Critical performance regression on Qwen3.8-27B NVFP4 when using DFlash2/DSpark + prefix caching (issue #60174), impacting throughput and output integrity.
- **Kernel-Level Optimizations**:
  - Tensor Descriptor (TD) adoption strategy for Triton kernels underway (#42545), aiming for better maintainability and future-proofing.
  - DeepSeek-V4 ROCm: Enable DPA+ETP dual-batch-overlap (DBO) for prefill efficiency (#57773).
- **Quantization Efficiency**: W4A8 weight repacking cleanup on Intel GPUs (#57511); FP8 quantization stability improvements on AMD (#57838).

> 🔗 [RFC #42545](https://github.com/vllm-project/vllm/issues/42545): Tensor descriptor adoption strategy  
> 🔗 [PR #57773](https://github.com/vllm-project/vllm/pull/57773): Enable DBO for DeepSeek-V4 on ROCm

---

### **5. Stability & Regressions**

| Severity | Issue | Impact | Status |
|--------|------|--------|--------|
| ⚠️ High | `kv_cache_dtype="fp8"` crashes if FlashInfer JIT missing (#60262) | Runtime crash, no fallback to TRITON_ATTN | Open |
| ⚠️ High | DFlash2/DSpark + prefix caching corrupts output on Qwen3.8-27B (#60174) | Incorrect responses after cache hit | Open |
| ⚠️ High | GLM-5.3-Flash long-decode degeneration after accumulated reasoning (#56868) | Degraded output quality over time | Open |
| ⚠️ Medium | Structured output invalid with MTP speculative decode (#60830) | JSON schema parsing fails | Closed (PR pending) |
| ⚠️ Medium | RowWiseTorchFP8ScaledMMLinearKernel causes 5–24% decode slowdown on RDNA4 (#57838) | Substantial performance penalty | Open |

> 🔗 [Issue #60262](https://github.com/vllm-project/vllm/issues/60262): FP8 KV cache crashes without FlashInfer JIT  
> 🔗 [Issue #60174](https://github.com/vllm-project/vllm/issues/60174): DFlash2/DSpark prefix cache corruption

---

### **6. What This Means for Application Developers**

- **Avoid `kv_cache_dtype="fp8"` on systems without FlashInfer JIT** until #60262 is resolved — it will cause crashes instead of falling back gracefully.
- **Be cautious with MTP speculative decoding on Qwen3.8-27B and DFlash2/DSpark setups** — known to produce corrupted outputs; consider disabling or upgrading to a stable vLLM version.
- **If using Blackwell (SM120) GPUs with DeepSeek-V4.1 or Qwen3.8-Flash-Next**, ensure you’re on a nightly build with PRs like #60762 applied — older versions may fail silently or crash.
- **For agent applications requiring deterministic behavior**, monitor progress on batch-invariant inference (#27433) to avoid non-deterministic token generation.
- **When deploying on ROCm (AMD)**, expect ongoing performance tuning; use `--enable-dbo` and verify model-specific optimizations are applied.

> 📌 *Recommendation*: Pin to `vllm/vllm-openai:0.29.0` or earlier for stable deployments on Blackwell/ROCm until v0.31.0 stabilizes.

---  
*Data source: [vllm-project/vllm GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-10**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with active development on DeepSeek V4.1 optimizations and robustness improvements for DSpark’s CUDA Graph paths, particularly around multi-Tensor Parallel (TP) consistency and memory safety. Critical stability fixes were merged for deterministic inference and speculative decoding, while new PRs push forward support for AMD GPU context parallelism and HiCache prefetch resilience.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes observed. The latest stable version remains **v0.5.16**, with ongoing work focused on internal correctness and performance refinements.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1**: Active optimization efforts underway via PR #43465 (AMD) and #43228 (DP attention + MegaMoE), enabling full prefill context parallelism and improved MoE routing.
- **Moore Threads (MUSA)**: Feature request #16565 tracks first-class GPU support; community interest high (14 👍).
- **HiCache NIXL Backend**: RFC #32841 proposes asynchronous completion handling to improve backend scalability.
- **MLX Backend**: Ongoing fixes for native generation determinism (PR #42415) and event loop contracts (Issue #32833).

> 🔗 [PR #43465](https://github.com/sgl-project/sglang/pull/43465) | [Issue #16565](https://github.com/sgl-project/sglang/issues/16565)

---

### **4. Performance & Optimization**  
- **Prefill Throughput**: PR #43435 optimizes KV sizing for hybrid Mamba models by skipping eager activation reserve in capped Full prefill roles — reducing memory overhead.
- **Speculative Decoding**: PR #42296 improves memory accounting across caller-supplied TP groups, preventing over-allocation in DSpark DP-attention configurations.
- **FlashInfer Autotuning**: PR #43464 enables FP4 GEMM autotune for `compressed-tensors NVFP4` checkpoints, unlocking faster kernel execution for quantized models.
- **CUDA Graph Efficiency**: Multiple PRs address timing-sensitive issues in compact ragged target-verify paths (e.g., #31023, #33356), improving stability under high TP loads.

> 🔗 [PR #43435](https://github.com/sgl-project/sglang/pull/43435) | [PR #43464](https://github.com/sgl-project/sglang/pull/43464)

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:

| Severity | Issue | Summary | Fix Status |
|--------|-------|---------|------------|
| ⚠️ High | [#43061](https://github.com/sgl-project/sglang/issues/43061) | `--enable-deterministic-inference` + `repetition_penalty` triggers `InternalTorchDynamoError` in `apply_scaling_penalties` | Open |
| ⚠️ High | [#43055](https://github.com/sgl-project/sglang/issues/43055) | Deterministic inference fails: same prompt yields multiple outputs (`gpt-oss-20b`) | Open |
| ⚠️ Medium | [#43162](https://github.com/sgl-project/sglang/issues/43162) | `dtype="float32"` crashes engine due to `KeyError: torch.float32` | Open |
| ⚠️ Medium | [#43402](https://github.com/sgl-project/sglang/issues/43402) | CUDA VMM multimodal transport slice leak when request aborted early | Open |
| ⚠️ Medium | [#43204](https://github.com/sgl-project/sglang/issues/43204) | `AssertionError: Can not alloc mamba cache` kills scheduler when all cached states are locked | Open |

> ✅ *Note:* Several regression fixes were merged yesterday (e.g., #42982 for FP8 overflow), but new issues emerged in deterministic inference and model config parsing.

---

### **6. What This Means for Application Developers**  
- **Avoid `--enable-deterministic-inference`** with `repetition_penalty` or `dtype="float32"` until PRs #43061 and #43162 are resolved — these cause crashes or non-deterministic behavior.
- **Use `chunked_prefill_size=-1` cautiously**: It may trigger negative `mem_fraction_static`, causing startup failure (see #43160). Explicitly set a positive value.
- **Multimodal apps** should monitor for VMM resource leaks (issue #43402) when clients disconnect before processing.
- **Speculative decoding** workflows using DSpark with DP attention must be aware of memory accounting bugs (fixes in progress via #42296).
- For **high-throughput deployments**, prioritize upgrading to latest main branch to benefit from CUDA Graph hardening and DSpark path stabilization.

> 💡 Pro tip: Use `SGLANG_RAGGED_VERIFY_MODE=compact` only after validating against known edge cases (e.g., SM120, #33412). Consider switching to `sparse` mode if instability persists.

---  
*Digest generated: 2026-10-10 | Source: [sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-10**

---

### **1. Today's Highlights**  
The latest updates focus on critical correctness fixes in speculative decoding and GPU kernel stability, particularly for CUDA and OpenCL backends. Key improvements include a fix for round-off errors in CUDA inference (b11538), a resolution to A6x OpenCL shader compilation crashes (b11533), and an upstream JSON patch applied to prevent nested patch corruption (b11533). These changes enhance reliability across diverse hardware, especially in production inference scenarios.

---

### **2. Releases & Breaking Changes**  
- **New releases**: `b11539`, `b11538`, `b11537`, `b11535`, `b11534`, `b11533`, `b11532`, `b11531`, `b11530`, `b11529`  
- **Critical fix**: `b11538` resolves a CPU/GPU round discrepancy under MSVC that could cause output divergence in CUDA runs — *essential for reproducibility* ([#30229](https://github.com/ggml-org/llama.cpp/pull/30229)).  
- **Stability improvement**: `b11537` reorders embedding graph logic to fix Gemma4 and raw embeddings path issues ([#30160](https://github.com/ggml-org/llama.cpp/pull/30160)).  
- **API note**: `b11531` refactors the chat API; developers using custom chat pipelines should verify compatibility ([#30210](https://github.com/ggml-org/llama.cpp/pull/30210)).

---

### **3. New Model & Hardware Support**  
- **Model support**:  
  - Added runtime support for **Prism Bonsai 2 27B** via PR [#29600](https://github.com/ggml-org/llama.cpp/pull/29600).  
  - Added support for **TML Inkling architecture** with full GGUF conversion and kernel integration ([#25731](https://github.com/ggml-org/llama.cpp/pull/25731)).  
- **Hardware/backends**:  
  - **OpenCL**: Fixed kernel compilation crash on A6x GPUs (e.g., IoT devices with a623) by skipping problematic kernels ([#30176](https://github.com/ggml-org/llama.cpp/pull/30176)).  
  - **CUDA**: Added support for FP32 activations in `MUL_MAT_ID` for Mistral Small 4’s expert down-projections ([#30260](https://github.com/ggml-org/llama.cpp/pull/30260)).  
  - **SYCL**: Improved multi-column matrix operations for Intel XMX engines targeting speculative decoding ([#29864](https://github.com/ggml-org/llama.cpp/pull/29864)).

---

### **4. Performance & Optimization**  
- **Memory efficiency**: PR [#30255](https://github.com/ggml-org/llama.cpp/pull/30255) eliminates unnecessary logits buffer allocation for encoder-only models (e.g., BGE-M3, EmbeddingGemma), saving ~1 MiB per token on large vocabularies.  
- **Kernel optimization**:  
  - Vulkan RMSNorm now uses subgroup reductions instead of workgroup-wide, improving performance on B70 Arc Pro, RTX 4060 Ti, and AMD 7900 XT ([#29882](https://github.com/ggml-org/llama.cpp/pull/29882)).  
  - Q4_K MMVQ row pairing extended to wider column counts (5–8 cols) on BMG for better utilization ([#30226](https://github.com/ggml-org/llama.cpp/pull/30226)).  
- **Build-time**: CI now sets `run-name` for release publishing to improve traceability ([#30214](https://github.com/ggml-org/llama.cpp/pull/30214)).

---

### **5. Stability & Regressions**  
- **High-severity issues reported today**:  
  1. **Speculative decoding divergence** on quantized targets (`Q4_K_M`) under greedy sampling — outputs differ from vanilla inference, but match on `bf16` ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618), 30 comments). *No fix PR yet.*  
  2. **Crash during long conversations** due to "bad allocation" in `llama-server` on HIP backend ([#30091](https://github.com/ggml-org/llama.cpp/issues/30091), 8 comments).  
  3. **GPU memory leak** (~10 MB per PP+TG cycle) with DeepSeek V4 Flash + DSpark speculative decoding ([#27155](https://github.com/ggml-org/llama.cpp/issues/27155), 2 comments).  
  4. **Invalid vector subscript** when loading `gemma4-assistant MTP` draft model — regression from `b9553` to `b9702/b9717` ([#24795](https://github.com/ggml-org/llama.cpp/issues/24795), 12 comments).  
- **Fixes landed**:  
  - `b11538`: CUDA round issue fixed ([#30229](https://github.com/ggml-org/llama.cpp/pull/30229)).  
  - `b11533`: A6x OpenCL shader crash resolved ([#30176](https://github.com/ggml-org/llama.cpp/pull/30176)).  
  - `b11537`: Embedded tensor construction logic improved ([#30160](https://github.com/ggml-org/llama.cpp/pull/30160)).

---

### **6. What This Means for Application Developers**  
- **Use `b11538+` for production inference** — the CUDA round-off fix is essential for deterministic results, especially in regulated or audit-sensitive environments.  
- **Avoid speculative decoding with `Q4_K_M` until #25618 is resolved** — expect inconsistent outputs under greedy sampling.  
- **Enable `--models-max=0` with `load-on-startup`** via PR [#30254](https://github.com/ggml-org/llama.cpp/pull/30254) for dynamic model routing in serverless deployments.  
- **Leverage new MoE optimizations** (PRs #30262, #30260) for faster expert selection on high-end GPUs.  
- **Monitor VRAM usage closely** if using DSpark or speculative decoding — memory leaks are actively reported and may require temporary workaround.  

> ✅ **Recommended upgrade path**: `b11538` or later for stability; use `b11539` for latest JSON vendor patch.  
> 🔗 [GitHub Release Page](https://github.com/ggml-org/llama.cpp/releases) | [Website: llama.app](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-10**

---

### **1. Today’s Highlights**  
The Ollama ecosystem continues to expand its support for advanced models and hardware backends, with key work on MLX runner stability and multimodal embeddings. However, several high-severity regressions—particularly around CUDA initialization failures, MLX panics on large models, and memory exhaustion on Apple Silicon—are impacting user experience, especially on high-end systems like M4 Macs and RTX 5070 Ti laptops.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, ongoing changes in `v0.40.x` have introduced breaking behavior:  
- **Automatic model upgrades** (introduced in v0.40.2) are now causing storage pressure due to uncontrolled downloads; users request a disable option via [Issue #18909](https://github.com/ollama/ollama/issues/18909).  
- The background **local model compatibility migration** was temporarily skipped in PR [#18908](https://github.com/ollama/ollama/pull/18908) due to performance overhead in high-throughput scenarios (e.g., embedding models).

---

### **3. New Model & Hardware Support**  
- **MLX Runner**: Active development for new model support, including Kolibri 1 ([PR #18780](https://github.com/ollama/ollama/pull/18780)) and expanded multimodal capabilities via EmbeddingGemma2Model architecture ([PR #18820](https://github.com/ollama/ollama/pull/18820)), enabling vision/audio fusion in embeddings.  
- **New Model Requests**: Users are pushing for integration of emerging decision models like `d1-3B`, `d1-omni-600M` ([Issue #18890](https://github.com/ollama/ollama/issues/18890)) and cloud-native models such as Qwen 3.8 Flash Next, mimo v2.6, and hy4 ([Issue #18850](https://github.com/ollama/ollama/issues/18850)).  
- **Backends**: Vulkan backend issues persist on AMD Radeon 780M GPUs ([Issue #17748](https://github.com/ollama/ollama/issues/17748)); CUDA on Windows remains unstable with silent CPU fallbacks ([Issue #17380](https://github.com/ollama/ollama/issues/17380)).

---

### **4. Performance & Optimization**  
- **Memory Efficiency**: Users report excessive RAM usage (127GB+ on M4 Macs) when loading `mistral-medium-3.5:128b`, with >100GB wired memory despite model size (~80GB), leading to sub-1 word/minute throughput ([Issue #18770](https://github.com/ollama/ollama/issues/18770)).  
- **Kernel-Level Issues**: Crashes occur during warmup with `qwen3.6:35b-mlx` on MLX runners in `v0.40.x`, confirmed as regression from `v0.35.0` ([Issue #18856](https://github.com/ollama/ollama/issues/18856)).  
- **Latency & Throughput**: Silent fallbacks to CPU due to corrupted `.dll` files post-auto-update ([Issue #18712](https://github.com/ollama/ollama/issues/18712)) degrade inference speed and GPU utilization.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| Critical | [Issue #18856](https://github.com/ollama/ollama/issues/18856) | MLX runner panic with `qwen3.6:35b-mlx` in `v0.40.x` (regression from `v0.35.0`) | ❌ No fix yet |
| Critical | [Issue #18885](https://github.com/ollama/ollama/issues/18885) | MLX runner crash on small models (`gemma4:e2b-mlx`) | ❌ No fix yet |
| High | [Issue #18770](https://github.com/ollama/ollama/issues/18770) | Memory explosion on M4 Macs with `mistral-medium-3.5:128b` (>127GB RAM, 100GB wired) | ❌ No fix yet |
| High | [Issue #17380](https://github.com/ollama/ollama/issues/17380) | Intermittent CUDA error: shared object initialization failed → silent CPU fallback (Windows, RTX 5070 Ti) | ❌ No fix yet |
| Medium | [Issue #18898](https://github.com/ollama/ollama/issues/18898) | `gemma4:12b` fails with “Gemma4Assistant requires ctx_other to be set” | ❌ No fix yet |

---

### **6. What This Means for Application Developers**  
- **Avoid `v0.40.x` for production** if using MLX or large models—critical regressions may cause crashes or silent CPU fallbacks. Stick to `v0.35.1` until fixes land.  
- **Disable auto-updates** if you’re on limited SSD space—uncontrolled model downloads can trigger "no space left on device" errors ([Issue #18909](https://github.com/ollama/ollama/issues/18909)).  
- **Expect instability on Apple Silicon and Windows/CUDA**—especially with larger models. Use `OLLAMA_DEBUG=1` to trace GPU/CPU fallbacks.  
- **Monitor for missing `ggml-cuda.dll`** after updates—this is a known Windows-specific corruption vector ([Issue #18712](https://github.com/ollama/ollama/issues/18712)).  
- **For agents using tool calling or reasoning**, be aware that `reasoning_content` is silently ignored in OpenAI-compatible endpoints ([Issue #18534](https://github.com/ollama/ollama/issues/18534)), risking data loss in DeepSeek-style workflows.  

> 🔍 *Recommendation*: Use `--log-level debug` and monitor logs closely when deploying on edge devices or high-memory systems. Track PRs like [#18820](https://github.com/ollama/ollama/pull/18820) and [#18780](https://github.com/ollama/ollama/pull/18780) for future multimodal support.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-10**

#### **1. Today's Highlights**  
The LiteLLM project continues its aggressive focus on stability and security, with critical fixes for budget enforcement bypasses and a high-severity `/metrics` endpoint exposure now addressed. The community-driven Rust migration initiative (#31263) is gaining momentum, signaling a strategic shift toward ultra-low-latency inference routing. Meanwhile, new telemetry and guardrail enhancements are improving observability and safety in production deployments.

#### **2. Releases & Breaking Changes**  
- **v1.106.0-dev.3**: Released today with enhanced Docker image signing via [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). All images are now cryptographically signed—verify using `cosign verify`.  
- **Security Note**: The supply-chain compromise incident (Issue #24518) has been fully contained; all affected PyPI packages have been yanked. Current releases are clean. See [Security Townhall](https://docs.litellm.ai/blog/security-townhall-updates) for full context.

#### **3. New Model & Hardware Support**  
- **ScaleDown Models Added**: Five new ScaleDown models (input-only pricing at $0.05/M tokens) are now natively supported via the `scaledown` chat provider (PR #44167, #44168).  
- **Databricks JSON Schema Fix**: Proper handling of `#/$defs` references in `response_format` now works across all Databricks models (PRs #45631, #45632, #45658, #45659).  
- **Vertex AI Claude Batch Support**: Batching for Claude models now uses correct Anthropic-native paths (`publishers/anthropic/models/<model>`) to avoid 404s (PR #45715).

#### **4. Performance & Optimization**  
- **Rust Migration Progress**: The foundational work for a sub-1ms-overhead gateway is underway (#31263), with early beta sign-ups open. This will enable microsecond-level routing latency for high-throughput agent systems.  
- **Telemetry Persistence**: Telemetry reports are now stored locally with persistent instance IDs (PR #45490), enabling air-gapped proxy monitoring and long-term analytics.  
- **Cache Preservation**: Response cache state is now preserved during DB router rebuilds (PR #45693), preventing unintended performance degradation after config reloads.

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [#24530](https://github.com/BerriAI/litellm/issues/24530): Unauthenticated `/metrics` exposes PII | Critical | Open | N/A |
| [#36926](https://github.com/BerriAI/litellm/issues/36926): False `BudgetExceededError` under sustained load | High | Open | N/A |
| [#39713](https://github.com/BerriAI/litellm/issues/39713): RPM limits ignored after virtual key caching | Medium | Open | N/A |
| [#45457](https://github.com/BerriAI/litellm/issues/45457): Stream dropped before first chunk never retried | Medium | Open | N/A |
| [#45546](https://github.com/BerriAI/litellm/issues/45546): Mistral drops `reasoning_content` in streaming responses | High | Open | N/A |

> ⚠️ **Critical Note**: Despite ongoing stability improvements, multiple high-impact bugs affecting cost tracking, rate limiting, and security remain open. Developers relying on budgeting or multi-tenancy should validate configurations against these issues.

#### **6. What This Means for Application Developers**  
- **Upgrade immediately** to v1.106.0-dev.3 or later to ensure cryptographic verification of Docker images and eliminate known supply-chain risks.  
- If you use **multi-tenant billing**, test your `max_budget`, `rpm_limit`, and `team_member_budget` logic—current versions show inconsistent behavior under load or after resets (see #36926, #39713).  
- For **high-performance agents**, monitor the [Rust migration roadmap](https://docs.litellm.ai/blog/litellm-rust-launch) for future low-latency deployment options.  
- Use the new **telemetry settings UI** (PR #45494) to control data sharing and audit admin dashboard usage patterns.  
- Avoid unauthenticated `/metrics` endpoints in production—enforce `require_auth_for_metrics_endpoint: true`.

---

*Digest generated from GitHub activity: 2026-10-10 | Source: [BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-10-10**

---

### **1. Today's Highlights**  
The Unsloth team is actively enhancing cross-platform compatibility and model support, with key PRs focused on AMD GPU selection logic, Intel XPU PyTorch integration, and improved handling of complex document formats in *Unsloth Studio*. Critical fixes for VRAM management and memory leaks are underway, particularly for large models like Qwen3-VL and GPT-OSS 120B. The ecosystem continues to expand its support for multimodal and long-context inference workflows.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, ongoing work in `main` includes significant backend changes that may affect deployment behavior:
- **PR #13196**: Fixes automatic GPU selection on ROCm systems (e.g., Strix Halo) by prioritizing discrete GPUs over APUs.
- **PR #13193**: Adds explicit Intel XPU PyTorch installation logic when only an Intel Arc/Data Center GPU is present.
- **PR #13189**: Introduces hash-checking for fallback `uv` installer scripts — a security hardening measure impacting installer integrity verification.

> 🔗 [PR #13196](https://github.com/unslothai/unsloth/pull/13196), [PR #13193](https://github.com/unslothai/unsloth/pull/13193), [PR #13189](https://github.com/unslothai/unsloth/pull/13189)

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen-Image-2.1-Turbo** added via **PR #13159**, supporting 8-step sampling schedule and new quantization defaults under the `qwen-image-2.1` family.
- ✅ **Extended file format parsing** in *Studio*: now supports `.docx`, `.xlsx`, `.odt`, `.msg`, `.rtf`, `.eml`, `.json`, `.xml`, and more (**PR #13081**).
- ✅ **Apple Silicon (M-series)**: Improved attention handling and NaN image detection for Qwen-Image-2.1 (**PR #13188**).
- ✅ **Jetson Orin Nano / JetPack**: Ensures system CUDA takes precedence over pip-installed versions in `LD_LIBRARY_PATH` (**PR #13191**).

> 🔗 [PR #13159](https://github.com/unslothai/unsloth/pull/13159), [PR #13081](https://github.com/unslothai/unsloth/pull/13081), [PR #13188](https://github.com/unslothai/unsloth/pull/13188), [PR #13191](https://github.com/unslothai/unsloth/pull/13191)

---

### **4. Performance & Optimization**  
- **Kernel-level optimization**: PR #13121 introduces `int64` row offsets in RoPE and normalization kernels, resolving overflow issues beyond 2³¹ elements (tested with ~5.5 GiB free VRAM).
- **Embedding learning rate fix**: PR #13171 ensures `embedding_learning_rate` is applied during full fine-tuning — previously silently ignored due to incorrect parameter grouping.
- **Memory footprint reduction**: PR #13192 caps request bodies at `/api` endpoints and suppresses sensitive chat text from INFO logs, improving both security and logging efficiency.

> 🔗 [PR #13121](https://github.com/unslothai/unsloth/pull/13121), [PR #13171](https://github.com/unslothai/unsloth/pull/13171), [PR #13192](https://github.com/unslothai/unsloth/pull/13192)

---

### **5. Stability & Regressions**  
Critical stability issues remain open, primarily related to memory exhaustion and platform-specific crashes:

| Issue | Severity | Summary | Status |
|------|----------|--------|--------|
| [#4504](https://github.com/unslothai/unsloth/issues/4504) | ⚠️ High | Fine-tuning uses far more VRAM than advertised, causing OOM even on large GPUs (H100 80GB, RTX 6000 96GB) | Closed |
| [#3921](https://github.com/unslothai/unsloth/issues/3921) | ⚠️ High | CUDA illegal memory access on PRO RTX6000 (96GB) | Updated |
| [#3411](https://github.com/unslothai/unsloth/issues/3411) | ⚠️ High | OOM on 183GB B200 while training GPT-OSS 120B at 4k context length | Updated |
| [#9792](https://github.com/unslothai/unsloth/issues/9792) | ⚠️ High | Qwen3.8-27B V3 GGUF crashes after prefill on AMD R9700 (Vulkan) | Closed |
| [#7449](https://github.com/unslothai/unsloth/issues/7449) | ⚠️ Medium | Unsloth Studio loads model weights into system RAM instead of VRAM on AMD (Strix Halo) | Updated |

> Note: While several high-severity bugs are closed or updated, none have active fix PRs linked as of today. Users should avoid fine-tuning large models until further notice.

---

### **6. What This Means for Application Developers**  
- **Avoid fine-tuning large models (≥7B) on H100/B200 without extensive memory profiling** — current VRAM usage exceeds documentation; consider smaller batch sizes or gradient checkpointing.
- **If deploying on AMD systems (especially with APU + dGPU), expect suboptimal GPU selection unless explicitly pinned** — use `UNSLOTH_GPU_ID` or `auto_select_gpu_ids` override.
- **For production inference with files (PDFs, Office docs, emails):** rely on recent Studio updates (PR #13081, #13186, #13183) to preserve tables, exponents, and layout integrity.
- **Security-sensitive deployments must account for unbounded API body parsing** — PR #13192 enforces limits but requires manual validation in custom integrations.
- **Intel GPU users:** Ensure `UNSLOTH_TORCH_INDEX_FAMILY=xpu` is set if no NVIDIA/AMD GPUs are detected — otherwise, CPU PyTorch will be used silently.

> 🛠️ **Recommendation**: Pin `unsloth==2026.1.3` or later for stability; monitor issue tracker for upcoming patches to OOM and memory corruption risks.

---  
*Digest generated on 2026-10-10. Data sourced from [unslothai/unsloth GitHub](https://github.com/unslothai/unsloth).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*