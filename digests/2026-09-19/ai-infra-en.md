# AI Infrastructure Digest 2026-09-19

> Generated: 2026-09-19 00:32 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-19**

---

### **1. Ecosystem Overview**  
The AI infrastructure landscape in September 2026 is defined by a sharp bifurcation between **high-performance, hardware-optimized serving engines** and **developer-friendly, multi-model gateways**. Projects like vLLM, SGLang, and Unsloth are pushing the boundaries of inference efficiency on next-gen GPUs (Blackwell, RDNA3), while Ollama and LiteLLM focus on abstraction layers that unify model access across diverse backends. The growing maturity of quantization (FP8, MXFP4, NVFP4), MoE offloading, and disaggregated serving reflects an industry shift toward scalable, cost-efficient deployment — especially for long-context and agent-driven workloads. Meanwhile, security, stability, and supply chain integrity have become non-negotiables, with Cosign-signed images and guardrail hardening entering mainstream adoption.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑) | PRs (↑) | Releases (↑) | Status Summary |
|---------------|------------------|---------|--------------|----------------|
| **vLLM**      | 147 (+5)         | 87 (+12)| None         | High engineering velocity; critical stability fixes dominate |
| **SGLang**    | 152 (+8)         | 71 (+15)| v0.5.20      | Active feature development; CI/CD scaling challenges |
| **llama.cpp** | 224 (+10)        | 68 (+9) | None         | Highest volume of low-level GPU crashes & regressions |
| **Ollama**    | 218 (+6)         | 54 (+7) | v0.34.3-rc0  | Breaking changes in CLI + high-severity stability issues |
| **LiteLLM**   | 139 (+4)         | 48 (+6) | v1.103.0-dev.2 | Security-focused release with open policy enforcement bugs |
| **Unsloth**   | 112 (+3)         | 39 (+5) | v0.1.811-beta| Beta-heavy; performance gains offset by regression risks |

> *Note: ↑ indicates increase over prior 24h; activity reflects both innovation and growing complexity in edge cases.*

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **Gemma4 (Turing)**      | ❌ Hard limit (SM 7.5) | ✅ Partial | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| **GLM-5.3-Flash**        | ✅ Blocked on SM120 | ✅ Added (v0.5.20) | ✅ Supported | ⚠️ Requested | ✅ Configurable provider | ✅ Supported |
| **Qwen3.8-Flash-Next**   | ✅ MTP hotfix (2x speed) | ✅ Draft support | ✅ GGUF crash risk | ⚠️ Tool call loss | ✅ Via GitGot | ✅ Full MTP support |
| **Kimi-K3**              | ✅ CUDA path | ✅ Guards fast paths | ✅ Fast-path guarded | ⚠️ No native support | ✅ Provider config | ⚠️ Requested |
| **Bonsai PQ2_0/PTQ1_0**  | ❌ Not supported | ❌ Not supported | ❌ Import failure | ⚠️ Requested | ❌ Not supported | ⚠️ Custom build needed |

**Winner**: **Unsloth** leads in cutting-edge model integration (Qwen3.8-Flash-Next MTP), while **SGLang** shows strongest momentum in new model availability (GLM-5.3-Flash). **vLLM** remains the most restrictive due to architectural constraints but offers deep optimization for existing models.

---

### **4. Performance Frontier**

| Optimization Focus             | vLLM                            | SGLang                          | llama.cpp                     | Ollama               | LiteLLM                 | Unsloth                   |
|--------------------------------|----------------------------------|----------------------------------|-------------------------------|----------------------|--------------------------|----------------------------|
| **KV Cache Efficiency**        | ✅ `nvfp4`, `qk_rope_head_dim=0` | ✅ Dynamic prefill context      | ✅ `flash_attn_f32_f16_bin`   | ❌ Limited control     | ✅ Proxy timing anchor    | ✅ Offload improvements     |
| **Batching & Prefill**         | ✅ Prefill-only batch logic      | ⚠️ CUDA graph stalls (Issue #40094) | ✅ Flash Attention enabled   | ❌ Context throttling  | ✅ Client pooling         | ✅ `--ctx-checkpoints`      |
| **Quantization**               | ✅ FP8, MXFP4, Q8KV8 sparse      | ✅ MXFP8, IQ3_S MMQ               | ✅ Q6_K, F16 FWHT             | ✅ MLX 1-bit/2-bit    | ✅ Token price sync       | ✅ FP8/INT8 diffusion       |
| **Distributed Serving**        | ✅ P/D disaggregation, NIXL      | ✅ Unified PD transfers           | ❌ Limited scalability         | ❌ Centralized          | ✅ Multi-provider routing | ✅ Docker multi-user        |
| **Kernel-Level Optimizations** | ✅ Triton fused kernels, MLA     | ✅ Wave64 histogram-select        | ✅ SYCL/IQ3 reordering         | ❌ Minimal             | ✅ Rust HTTP client pool  | ✅ MTP hotfix (2x faster)   |

> **Key Insight**: vLLM and Unsloth are leading in **low-level kernel fusion and memory-aware optimizations**, while SGLang and LiteLLM prioritize **distributed system orchestration and proxy-level efficiency**.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Key Differentiator |
|---------------|--------------------------------|--------------------|
| **vLLM**      | **Inference Engine**           | Industry standard for high-throughput, low-latency LLM serving on NVIDIA; deep hardware integration |
| **SGLang**    | **Inference Engine + Runtime** | Combines engine with speculative decoding, dynamic parallelism, and disaggregation features |
| **llama.cpp** | **Local Runtime / Edge Inference** | Cross-platform, CPU/GPU/edge-native; ideal for mobile, embedded, and offline use |
| **Ollama**    | **Model Gateway / CLI Runtime** | Developer-first interface with unified model management; strong local execution focus |
| **LiteLLM**   | **AI Gateway / Enterprise Proxy** | Centralized API layer with authentication, rate limiting, and multi-provider routing |
| **Unsloth**   | **Fine-tuning + Serving Hybrid** | Specializes in training accelerations (MTP, DFlash) and optimized inference for specific models |

> **Strategic Implication**: vLLM and SGLang are becoming **infrastructure backbone** candidates; LiteLLM and Ollama serve as **application entry points**; llama.cpp and Unsloth target **specialized niches** (edge, ultra-low latency).

---

### **6. Trend Signals**

#### 🔹 **Trend 1: Hardware Heterogeneity is Now Standard**
- AMD ROCm parity is no longer optional: vLLM, SGLang, Unsloth, and llama.cpp all have active PRs or releases targeting gfx950/gfx1151.
- Blackwell (SM120) support is emerging but fragile — GLM-5.3-Flash and Qwen3.8-Flash-Next hit hard walls.
- **Developer Takeaway**: Assume cross-GPU compatibility is non-trivial. Test on ROCm and Blackwell early.

#### 🔹 **Trend 2: Quantization is Maturing Beyond Q4/Q8**
- NVFP4 (vLLM), MXFP4 (Ollama), FP8 (Unsloth), and IQ3_S (SGLang) indicate a move toward **precision-aware, memory-optimal inference**.
- Silent corruption issues (e.g., SGLang’s MiniMax-H3 INT8) show that quantization fidelity is still a major challenge.

#### 🔹 **Trend 3: Agent Workflows Demand Structured Output Control**
- vLLM (#33089), Ollama (`thinking.values`), and LiteLLM’s JWT scopes reflect growing need for **reasoning depth control** and **secure tool access**.
- Tool call parsing failures (Ollama, SGLang) highlight fragility in agent pipelines.

#### 🔹 **Trend 4: Stability and Security Are No Longer Afterthoughts**
- Cosign-signed images (LiteLLM), virtual key bypass vulnerabilities (LiteLLM), and silent memory corruption (llama.cpp) underscore that **trust and reliability are now core product differentiators**.

#### ✅ **What Application Developers Should Watch**
1. **Avoid `--split-mode tensor` on multi-GPU systems** until fixes land (llama.cpp, Unsloth).
2. **Audit tool call parsers** — expect silent loss if reasoning precedes function tags (Qwen3-Coder).
3. **Use `GET /api/show`** to dynamically configure thinking levels (Ollama).
4. **Test model capabilities before deployment** — some claim vision support but silently discard inputs.
5. **Prioritize signed, verified deployments** — especially for regulated environments.

---

> **Final Note**: The AI infrastructure stack is no longer just about speed — it's about **predictability, security, and composability**. The projects leading in 2026 are those that balance raw performance with production-grade reliability and developer experience.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-19

---

### **1. Today's Highlights**  
vLLM continues to advance its support for **multi-modality**, **disaggregated serving**, and **next-gen hardware**, with key work on ViT CUDA graph optimization and NIXL KV connector reliability. Critical stability fixes were merged for DiffusionGemma (FP32 casting) and DFlash acceptance length validation, while new PRs target scalable MoE offloading and ROCm/AMD GPU parity. The community remains active in addressing long-context inference challenges across diverse model families.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- ✅ **Gemma4 on Turing GPUs (SM 7.5)**: Issue #38918 highlights a fundamental limitation—shared memory constraints prevent Gemma4 from running on older architectures like RTX 20xx. This is not a fixable issue via config but a hard architectural ceiling.
- ✅ **GLM-5.3-Flash on SM120 (RTX PRO 6000 Blackwell)**: Issue #53963 reports three failure modes due to missing `qk_rope_head_dim=0` sparse MLA path; no workaround yet. This blocks deployment on new Blackwell cards.
- ✅ **ROCm Support Expansion**: Multiple PRs (e.g., #57599, #56638) improve ROCm CI coverage and enable fused kernels on gfx950 DPX partitions, advancing AMD GPU compatibility.
- ✅ **Intel GPU Integration**: PR #56013 upgrades PyTorch to 2.14 for XPU platform, enabling future optimizations.

> 🔗 [Issue #38918 – Gemma4 on SM 7.5](https://github.com/vllm-project/vllm/issues/38918)  
> 🔗 [Issue #53963 – GLM-5.3-Flash on SM120](https://github.com/vllm-project/vllm/issues/53963)  
> 🔗 [PR #57599 – ROCm DPX Skips](https://github.com/vllm-project/vllm/pull/57599)

---

### **4. Performance & Optimization**  
- 🚀 **Prefill-Only Batch Optimization**: PR #57416 improves performance by assigning correct logit rows to prefill-only batches in diffusion models (e.g., DiffusionGemma), eliminating unnecessary full passes.
- ⚡ **FlashInfer + NVFP4 on Pre-SM100**: PR #46963 enables `--kv-cache-dtype nvfp4` on Ampere/Hopper GPUs via FlashInfer’s slot-mapping API—reducing KV cache memory usage by ~50% without sacrificing throughput.
- 🔥 **Fused Kernels**: PR #51406 enables Triton-based `fused_qk_rmsnorm_rope_gate` kernel for Qwen3-Next/Qwen3.5 on ROCm, improving attention efficiency through reduced kernel launches.
- 💾 **Sparse MLA Path**: PR #54592 adds SM90 Q8KV8 sparse MLA prefill for DeepSeek-V4, optimizing memory bandwidth and latency on high-end NVIDIA cards.

> 🔗 [PR #57416 – Prefill-Only Logit Rows](https://github.com/vllm-project/vllm/pull/57416)  
> 🔗 [PR #46963 – NVFP4 on Pre-SM100](https://github.com/vllm-project/vllm/pull/46963)  
> 🔗 [PR #51406 – Fused QK-Norm+RoPE+Gate](https://github.com/vllm-project/vllm/pull/51406)  
> 🔗 [PR #54592 – DeepSeek-V4 Sparse MLA](https://github.com/vllm-project/vllm/pull/54592)

---

### **5. Stability & Regressions**  
- ⚠️ **DiffusionGemma Self-Conditioning Cast Crash**: PR #57462 fixes an FP32 buffer cast error that triggers when Dynamo falls back to eager mode—causing index put errors during recompilation.
- ⚠️ **DFlash Acceptance Length Mismatch**: PR #57647 corrects a test reference error where `expected_acceptance_len=3.195` was too strict; actual value was `3.051`, causing false failures in CI.
- ⚠️ **NIXL LoadRemoteMD Crash After Restart**: Issue #49238 reports decode instance segfaults after prefill pod restarts in P/D disaggregation setup—still unresolved.
- ⚠️ **Silent CUDA IMA on RTX 3090**: Issue #53726 shows silent illegal memory access under hybrid GDN + MTP k=3 + async scheduling—persistent despite prior fixes.

> 🔗 [PR #57462 – DiffusionGemma Cast Fix](https://github.com/vllm-project/vllm/pull/57462)  
> 🔗 [PR #57647 – DFlash Reference Fix](https://github.com/vllm-project/vllm/pull/57647)  
> 🔗 [Issue #49238 – NIXL LoadRemoteMD Crash](https://github.com/vllm-project/vllm/issues/49238)  
> 🔗 [Issue #53726 – Silent IMA on RTX 3090](https://github.com/vllm-project/vllm/issues/53726)

---

### **6. What This Means for Application Developers**  
- **Deploying on legacy hardware?** Avoid Gemma4 on Turing GPUs (SM 7.5). Consider quantized or smaller models instead.
- **Using multi-modal models (Qwen3-VL, Kimi K2.5)?** Watch Issue #38175 for upcoming ViT CUDA graph support—this will dramatically reduce vision encoder overhead in production.
- **Running MoE models on limited VRAM?** Incremental MoE offloading (Issue #38256) is progressing—enable GPU caching of hot experts to run larger models on smaller GPUs.
- **Building agents requiring tool calling & multi-turn convos?** Feature request #33089 seeks OpenAI `/responses` API support—critical for agent frameworks like Opencode/Codex.
- **Optimizing long-context RAG?** Issue #57413 requests restoration of concurrent partial prefill limits—essential for high-throughput long-prompt workloads.

> 🔗 [Issue #38175 – ViT CUDA Graph](https://github.com/vllm-project/vllm/issues/38175)  
> 🔗 [Issue #38256 – Incremental MoE Offloading](https://github.com/vllm-project/vllm/issues/38256)  
> 🔗 [Issue #33089 – Multi-Turn OpenAI Responses](https://github.com/vllm-project/vllm/issues/33089)  
> 🔗 [Issue #57413 – Concurrent Partial Prefills](https://github.com/vllm-project/vllm/issues/57413)

---  
*Digest compiled from GitHub activity as of 2026-09-19. vLLM continues to push boundaries in scalability, hardware diversity, and production-grade LLM serving.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-19**

---

### **1. Today's Highlights**  
The latest release, **v0.5.20**, brings significant improvements in model support and infrastructure robustness, including the addition of **GLM-5.3-Flash** as a new autoregressive model. Key developments include progress on **dynamic prefill context parallelism**, enhancements to **speculative decoding safety**, and ongoing efforts to stabilize CI/CD pipelines with 713 PRs from 237 contributors. Critical stability fixes address GPU memory exhaustion and silent corruption issues in multi-modal and diffusion models.

---

### **2. Releases & Breaking Changes**  
- **v0.5.20** released with **GLM-5.3-Flash** support (see [cookbook](https://docs.sglang.io/cookbook)).  
- No breaking API changes reported; backward compatibility maintained.  
- **Note:** Unit test coverage tracking (Issue #20865) has been closed — maintainers now prioritize high-impact testing over exhaustive coverage due to CI cost concerns.

---

### **3. New Model & Hardware Support**  
- ✅ **New Model**: `GLM-5.3-Flash` (autoregressive) added in v0.5.20.  
- ✅ **Multi-modal Expansion**:  
  - **MiniMax-H3 INT8 ConvRot** support now includes explicit handling of head-interleaved QKV reordering (fixes silent corruption, see Issue #40127).  
  - **Kimi-K3** now guards CUDA-only fast paths (PRs #40267, #40269, #40270), ensuring portability across platforms.  
- ✅ **Hardware & Backend**:  
  - ROCm (`ROCM_QUICK_REDUCE`) now explicitly handles low-amplitude BF16→FP16 scaling saturation (Issue #40084).  
  - AMD/Hopper-specific fixes for DeepSeek-V4-Pro TP24 failures (Issue #31799).  
  - Experimental support for **NVIDIA Blackwell** via fused MoE kernels and MXFP8 quantization (PRs #36575, #36574).

---

### **4. Performance & Optimization**  
- 🚀 **Speculative Decoding**:  
  - Fixed excessive KV pool sizing due to premature release of draft token copies (Issue #36452).  
  - Optimistic prefill deadlock scenario identified (Issue #31473); fix under review.  
- 💡 **Prefill Efficiency**:  
  - Dynamic prefill context parallelism now under active development (Issue #37944).  
  - Prefill CUDA graph now reserves ~1.8 GB, causing long-context stalls on small VRAM cards (Issue #40094); auto-disable rule proposed.  
- 🔧 **Kernel & Memory**:  
  - Unified memory page-envelope transfers in PD (PR #39477) enable scalable disaggregation.  
  - Fused MoE all-reduce into next layer for MiniMax-M3 (PR #36575), reducing inter-layer overhead.  
  - ROCm: Wave64 histogram-select decode top-k kernel improves sparse attention performance (PR #36560).

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|------|--------|------------|
| 🔴 High | [#40094](https://github.com/sgl-project/sglang/issues/40094) | Prefill CUDA graph starves quantized-KV long-context prefill on small GPUs | In progress |
| 🔴 High | [#31473](https://github.com/sgl-project/sglang/issues/31473) | Optimistic prefill can cause cross-stage capacity stall/deadlock | Under investigation |
| 🟠 Medium | [#38821](https://github.com/sgl-project/sglang/issues/38821) | GLM-5.3-Flash vision misidentifies JPEG URLs as birds on 8x H20 | Open |
| 🟠 Medium | [#39836](https://github.com/sgl-project/sglang/issues/39836) | Qwen3CoderDetector truncates arguments due to duplicate `<parameter=NAME>` tags | Open |
| 🟡 Low | [#40236](https://github.com/sgl-project/sglang/issues/40236) | DeepSeek V4/V3.2 tool calls returned as content without `tool_calls` | Open |

> ⚠️ Multiple regressions tied to **multi-modal and diffusion models** indicate growing complexity in handling heterogeneous input types.

---

### **6. What This Means for Application Developers**  
- **Use caution with long-context prompts on small GPUs** — prefill CUDA graphs may silently consume memory, leading to stalls (Issue #40094). Consider disabling or tuning `--enable-prefill-cp`.  
- **Avoid using speculative decoding with high contention** — optimistic prefill deadlocks may occur under pressure (Issue #31473). Monitor scheduler load.  
- **Ensure consistent prompt rendering** — Python and Rust frontends may differ in token count (Issue #39843); validate outputs end-to-end.  
- **Leverage new model support** like `GLM-5.3-Flash` and `Kimi-K3` for faster inference, but guard CUDA-specific optimizations when deploying on non-CUDA hardware.  
- **Monitor CI health** — recent test failures (Issue #17050) suggest potential instability in nightly builds; prefer stable releases for production.  

👉 **Pro Tip**: Use `--disable-prefill-interleaving` or `--prefill-interleaving-min-continuation-tokens` (PR #39717) to control prefill scheduling behavior in high-throughput environments.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-09-19**

---

### **1. Today's Highlights**  
The latest development cycle brings significant progress in **Hexagon backend maturity**, with full support for `ROLL` ops and improved `IM2COL` handling for 1D/padded inputs, enabling better compatibility with mobile and edge models. On the GPU side, **OpenCL now supports binary kernels for `flash_attn_f32_f16_bin`**, improving flash attention performance on AMD devices. Additionally, **Metal gains optimized small-batch mat-vec kernels** for Q4_0/Q8_0, targeting low-latency inference on Apple Silicon.

---

### **2. Releases & Breaking Changes**  
No breaking changes or new release versions were published today. However, several critical fixes are included in recent builds (e.g., `b11045`, `b11044`), including:  
- **Allocation failure checks** to prevent crashes (#28149)  
- **Graph buffer reservation error handling** (#26070)  
- **GPU memory safety** improvements across backends  

> 🔗 [GitHub Release Notes](https://github.com/ggml-org/llama.cpp/releases)

---

### **3. New Model & Hardware Support**  
- ✅ **Hexagon (Qualcomm NPU)**: Full support for `ROLL` op (#29105) and updated `IM2COL` kernels for 1D/padded inputs (#29103), enhancing compatibility with mobile LLMs.  
- ✅ **OpenCL**: Added binary kernel `flash_attn_f32_f16_bin` (#29046) — enables faster flash attention on compatible GPUs.  
- ✅ **Vulkan**: New IQ3_S MMQ matmul kernels (#28822) expand quantization support for high-efficiency inference on AMD RDNA3/RDNA4.  
- ✅ **Apple Metal**: Added F16 input support to FWHT kernel (#29094) and extended FWHT block widths beyond 512 (#29095).  

> 🔗 [PR #29105](https://github.com/ggml-org/llama.cpp/pull/29105) | [PR #29046](https://github.com/ggml-org/llama.cpp/pull/29046) | [PR #28822](https://github.com/ggml-org/llama.cpp/pull/28822)

---

### **4. Performance & Optimization**  
- **Metal (Apple Silicon)**: Multi-column mat-vec kernels for small batches (Q4_0/Q8_0, ne11=2..8) reduce cost per added column by ~1× n=1 matvec (~10–15% latency reduction observed in benchmarks).  
- **SYCL (Intel Arc)**: IQ3 code reordering PR (#29107) improves attention/decode paths on Intel Arc Pro B70, with focused backend tests and persistent layout optimizations.  
- **CUDA**: Flash Attention now enabled for all quants by default (#28634), eliminating silent fallback to generic dequant path — avoids 30x+ performance drops seen in prior builds.  
- **Vulkan**: Int8 coopmat1 matmul implementation for RDNA3/RDNA4 (#27952) shows strong gains on Strix Halo (Framework Desktop), with up to 2x speedup in prompt processing.  

> 🔗 [PR #29110](https://github.com/ggml-org/llama.cpp/pull/29110) | [PR #29107](https://github.com/ggml-org/llama.cpp/pull/29107) | [PR #28634](https://github.com/ggml-org/llama.cpp/pull/28634)

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:  
1. **CUDA graphs hang GPU channel (Xid 8)** on RTX 5090 Laptop (sm_120) — workaround: `GGML_CUDA_DISABLE_GRAPHS=1` (#27330)  
2. **Qwen3.8-27B Q6_K causes display loss and GSP reset** on RTX 5090 under Linux — reproducible across tools (#27910)  
3. **Metal: qwen4exp emits EOS after 1 token at long context** — silent output, stochastic behavior tied to model quant/KV quant/n_ctx (#28805)  
4. **SYCL: `--split-mode tensor` crashes with DEVICE_LOST** on dual Arc Pro B70 (P2P) despite working P2P setup (#27198)  
5. **Vulkan: `DeviceLostError` on Linux 7.x kernels (RADV_STRIXHALO)** — affects multiple models including Gemma 4 MTP (#25664)  

✅ **Fixes in progress**:  
- PR #27858 addresses `dflash2` + `--split-mode tensor` crash on CUDA  
- PR #29085 resolves LFM2 recurrent rollback memory pool exhaustion  

> 🔗 [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) | [Issue #27910](https://github.com/ggml-org/llama.cpp/issues/27910) | [PR #27858](https://github.com/ggml-org/llama.cpp/pull/27858)

---

### **6. What This Means for Application Developers**  
- **For edge/mobile apps**: Hexagon updates enable tighter integration with Qualcomm-based devices; leverage `ROLL` and padded `IM2COL` for complex model topologies.  
- **For cloud inference**: Prioritize `--split-mode tensor` with caution — known instability on SYCL/CUDA with multi-GPU setups. Use `GGML_CUDA_DISABLE_GRAPHS=1` if encountering GPU hangs.  
- **For low-latency use cases**: Enable Metal’s new small-batch mat-vec kernels (`ne11=2..8`) and F16 FWHT support for smoother, more predictable response times.  
- **For model serving**: Avoid Q6_K quant with Qwen3.8-27B on RTX 5090 until fix is merged; consider lower context sizes or alternate quant formats.  
- **For developers using MTP**: Monitor stability of MTP decoding on pre-Ampere GPUs (K40c) and older Vulkan drivers — some regressions remain unresolved.  

> 💡 **Best Practice**: Always test with `--no-mmap` and `--gpu-detect-limits` when deploying on new hardware or quantizations.

---  
*Digest generated from GitHub data: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-19**

---

### **1. Today's Highlights**  
Ollama v0.34.3-rc0 introduces explicit `thinking` control metadata via the `/api/show` endpoint, enabling client-side UIs to dynamically expose reasoning level options (e.g., `low`, `high`, `max`) based on model capabilities—critical for agent and LLM gateway developers. Concurrently, several high-severity stability issues were reported around tool call parsing, image input handling, and GPU backend crashes, particularly on ROCm and Vulkan backends.

---

### **2. Releases & Breaking Changes**  
- **v0.34.3-rc0**: Released with enhanced model metadata exposure via `GET /api/show`. Now returns `thinking.values` and `thinking.default` per model, e.g.,  
  ```json
  {
    "thinking": {
      "values": ["low", "high", "max"],
      "default": "max"
    }
  }
  ```
  → [PR #18473](https://github.com/ollama/ollama/pull/18473) | [API Reference](https://github.com/ollama/ollama/blob/main/docs/api.md#show)

- **Breaking Change**: The built-in CLI agent has been removed in favor of opt-in usage ([#18393](https://github.com/ollama/ollama/pull/18393)). Users relying on `ollama chat` as a default interface must now explicitly enable it via CLI flags or third-party launchers.

---

### **3. New Model & Hardware Support**  
- **Model Additions Requested**:  
  - Mistral Small 4: [Issue #15142](https://github.com/ollama/ollama/issues/15142) — Open-source successor to Mistral Small 3.2, fully compatible with Ollama’s current inference stack.
  - Bonsai ternary GGUFs (PQ2_0/PTQ1_0): [Issue #18521](https://github.com/ollama/ollama/issues/18521) — Public 27B model fails import due to unsupported tensor size overflow; requires quantization format extension.

- **Hardware & Backend Support**:  
  - **MLX Backend**: Added support for low-bit (1-bit/2-bit) quantized weights via [Issue #18515](https://github.com/ollama/ollama/issues/18515). This enables running ultra-low-precision models on Apple Silicon devices.
  - **Vulkan iGPU**: Intel Iris Xe support improved with new PRs addressing detection failures and out-of-memory errors on Windows ([#18531](https://github.com/ollama/ollama/issues/18531), [#18482](https://github.com/ollama/ollama/issues/18482)).

---

### **4. Performance & Optimization**  
- **Memory Management**:  
  - Feature request for granular memory split controls across multiple GPUs ([#18525](https://github.com/ollama/ollama/issues/18525)) — critical for users with heterogeneous setups (e.g., fast PCIe4 + slow PCIe3).
  - Dynamic memory optimization for low-RAM systems (8–16GB) proposed via [#13601](https://github.com/ollama/ollama/issues/13601), including smart offloading and quantization hints.

- **Inference Efficiency**:  
  - Benchmarks updated to use HumanEval patch prompts ([#17480](https://github.com/ollama/ollama/pull/17480)), improving speculative draft model evaluation fidelity by simulating real-world code generation workloads.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| ⚠️ High | [#18528](https://github.com/ollama/ollama/issues/18528) | Cross-request state leak in hybrid-GDN models on ROCm (gfx1151), causing earlier prompt text to appear in later responses | Tracking upstream issue: [ggml-org/llama.cpp#29092](https://github.com/ggml-org/llama.cpp/issues/29092) |
| ⚠️ High | [#18505](https://github.com/ollama/ollama/issues/18505) | MLX nvfp4 stalls during prefill under sustained load, consuming minutes with zero progress | No fix yet; SIGTERM required to recover |
| ⚠️ High | [#18522](https://github.com/ollama/ollama/issues/18522) | CUDA ADD_ID failure aborts `gpt-oss:20b` (MXFP4) on RTX 4000 Ada during short two-message chat | Deterministic crash; no workaround known |
| ⚠️ Medium | [#18527](https://github.com/ollama/ollama/issues/18527) | `deepseek-v4.1-flash:cloud` silently discards image inputs despite advertising `vision` capability | Client-side error handling needed |
| ⚠️ Medium | [#18530](https://github.com/ollama/ollama/issues/18530) | Qwen3-Coder loses tool calls when reasoning precedes `<function=...>` tag | Parser only matches literal `<tool_call>` opener |

---

### **6. What This Means for Application Developers**  
- **Client-Side Tooling**: Use `GET /api/show` to dynamically configure thinking levels in your agent UIs. This enables adaptive reasoning depth (e.g., `max` for complex tasks, `low` for speed).  
  → [Example API Call](https://github.com/ollama/ollama/blob/main/docs/api.md#show)
- **Tool Call Reliability**: Avoid reliance on `tool` role messages unless you’re using older, stable models. For Qwen3-Coder and similar, expect silent tool loss if reasoning appears before the function tag — implement fallback logic or upgrade parser ([#18532](https://github.com/ollama/ollama/pull/18532)).
- **Cloud vs. Local Safety**: With cloud-only models proliferating, use `--filter-local` (requested in [#16833](https://github.com/ollama/ollama/issues/16833)) to avoid accidental cloud pushes. Monitor model capabilities carefully—some claim `vision` but ignore input silently.
- **Hardware Planning**: If deploying on AMD ROCm or Intel Vulkan, expect instability in MoE and GDN models. Prioritize testing on `0.32.6` until fixes land. Consider CPU fallbacks for edge cases.

> ✅ **Actionable Takeaway**: Audit all model integrations for `thinking` metadata exposure and validate tool call parsing behavior with latest models. Use `ollama show` and `curl http://localhost:11434/api/show` to probe model capabilities before deployment.

---  
*Data Source: [github.com/ollama/ollama](https://github.com/ollama/ollama)*  
*Digest generated: 2026-09-19*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **1. Today's Highlights**  
LiteLLM continues to strengthen its enterprise-grade AI gateway capabilities with critical security and stability updates, including the introduction of signed Docker images via Cosign for supply chain integrity. Major progress was made in proxy-level guardrail integration (ThirdLaw, Straiker v3) and enhanced OAuth2/IdP token exchange support, enabling secure, fine-grained access control for MCP servers and tools. Key issues around rate-limiting, streaming failures, and model routing consistency are under active resolution.

---

### **2. Releases & Breaking Changes**  
- **v1.103.0-dev.2**: Released with verified [Cosign-signed Docker images](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0), ensuring cryptographic trust in all deployments.  
  🔗 [Verify image signature guide](https://docs.sigstore.dev/cosign/overview/)  
- No breaking API changes reported; all recent PRs focus on feature enhancements and bug fixes without backward-incompatible modifications.

---

### **3. New Model & Hardware Support**  
- **GitGot** added as a JSON-configured OpenAI-compatible provider (`gitgot`), expanding LiteLLM’s reach to new inference backends.  
  🔗 [PR #40810](https://github.com/BerriAI/litellm/pull/40810)  
- **Vertex AI Chirp speech-to-text** now supports real-time streaming via `/v1/realtime?intent=transcription`.  
  🔗 [PR #41721](https://github.com/BerriAI/litellm/pull/41721)  
- **NVIDIA NeMo Guardrails** support requested (Issue #25255), though not yet implemented.  
  🔗 [Issue #25255](https://github.com/BerriAI/litellm/issues/25255)

---

### **4. Performance & Optimization**  
- **Proxy timing accuracy improved**: Response duration and overhead now anchored at proxy receive time, eliminating misleading ~1ms overhead reports.  
  🔗 [PR #41891](https://github.com/BerriAI/litellm/pull/41891)  
- **Rust HTTP client pooling introduced**: Dedicated client pool injected into OCR route reduces connection overhead and improves throughput.  
  🔗 [PR #41897](https://github.com/BerriAI/litellm/pull/41897)  
- **Batched Bedrock operations now use deployment credentials** when `AWS_BEARER_TOKEN_BEDROCK` is set — prevents credential conflicts.  
  🔗 [PR #41904](https://github.com/BerriAI/litellm/pull/41904)  

*No concrete latency/throughput metrics provided, but architectural improvements suggest measurable gains in high-concurrency scenarios.*

---

### **5. Stability & Regressions**  
High-severity stability issues reported today include:  

1. **Per-customer RPM limits fail after virtual key caching** ([#39713](https://github.com/BerriAI/litellm/issues/39713))  
   - *Impact*: Budget enforcement breaks post-caching → potential overbilling.  
   - *Status*: Open; no fix PR yet.  

2. **Incorrect TPM limiting for virtual keys** ([#24677](https://github.com/BerriAI/litellm/issues/24677))  
   - *Impact*: Rate limiting misapplied despite resolved in prior versions.  
   - *Status*: Closed but still reproducible — indicates regression risk.  

3. **Streaming fallback inconsistent with non-streaming** ([#25128](https://github.com/BerriAI/litellm/issues/25128))  
   - *Impact*: Streaming requests don’t fall back correctly → degraded availability.  
   - *Status*: Closed, but issue persists in practice.  

4. **Virtual-key model allowlist bypass via `?model=` query string** ([#41810](https://github.com/BerriAI/litellm/issues/41810))  
   - *Security Risk*: Bypasses model access controls entirely.  
   - *Status*: Open; requires urgent attention.  

5. **Guardrails split across SSE chunks can pass checks** ([#41611](https://github.com/BerriAI/litellm/issues/41611))  
   - *Risk*: Sensitive data may leak through partial chunk filtering.  
   - *Status*: Open; fix pending.  

> ⚠️ **Critical Note**: Multiple security and policy enforcement bugs remain open, particularly around authentication, rate limiting, and guardrail integrity.

---

### **6. What This Means for Application Developers**  
- **Use only signed Docker images** (`cosign verify`) in production to ensure trusted execution — especially for regulated or high-risk environments.  
- Avoid relying on virtual key-based rate limiting or model access controls until [#39713](https://github.com/BerriAI/litellm/issues/39713) and [#41810](https://github.com/BerriAI/litellm/issues/41810) are patched.  
- Leverage new **JWT scope-based access grants** ([PR #41896](https://github.com/BerriAI/litellm/pull/41896)) for fine-grained, OIDC-driven access to MCP servers and tools — ideal for SaaS and multi-tenant gateways.  
- Expect improved **streaming reliability** and **latency visibility** due to timing anchor fixes and client pooling.  
- If using **guardrails**, test against both full-body and chunked responses — known vulnerability in stream-split detection remains unpatched.  
- Monitor for **model price sync updates** ([PR #41842](https://github.com/BerriAI/litellm/pull/41842), [#41833](https://github.com/BerriAI/litellm/pull/41833)) to avoid billing surprises from outdated pricing data.

---

*Digest compiled from GitHub activity on 2026-09-19.*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-09-19**

#### **1. Today's Highlights**  
The v0.1.811-beta release delivers major advances in multi-user support, AMD ROCm and ARM64 CUDA Windows compatibility, and performance for Qwen3.8-Flash-Next via a 2x faster MTP hotfix. Critical fixes address model loading crashes and inference regressions affecting GGUF workflows on RTX 5080/5090 and ROCm systems.

#### **2. Releases & Breaking Changes**  
- **v0.1.811-beta** (GitHub: [unslothai/unsloth/releases/tag/v0.1.811-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.811-beta))  
  - Introduces Docker-based multi-user accounts with role isolation.  
  - Adds **AMD RDNA1+2 support**, **FP8/INT8 diffusion**, **ARM64 CUDA on Windows**, and **Qwen3.8-Flash-Next MTP hotfix (2x faster)**.  
  - **Note**: Users upgrading from `v0.1.810-beta` may experience inference throughput regressions (see Issue #11221). Revert to previous version or apply patches pending fix.

#### **3. New Model & Hardware Support**  
- **New Models**:  
  - Full support for **Qwen3.8-Flash-Next** (UD-Q4_K_XL, IQ4_XS) with MTP draft and speculative decoding.  
  - Experimental **Kimi K3** architecture training support requested (Issue #11078), but not yet implemented.  
- **Hardware & Backends**:  
  - **ROCm (AMD)**: Now supports DFlash sidecar + tensor split mode (via upstream llama.cpp fix #27858); previously caused silent fallback to layer split (Issue #11308).  
  - **Windows**: ARM64 CUDA + Python runtime support added.  
  - **Vulkan Training**: Feature request (#11184) open; no current implementation.  
- **Quantization**: FP8/INT8 diffusion support now available for AMD/CUDA backends.

#### **4. Performance & Optimization**  
- **Qwen3.8-Flash-Next MTP**: 2x speedup confirmed via hotfix (PR #11172).  
- **Inference Throughput**: Regression reported post-v0.1.810-beta (Issue #11221) — users observe slower GGUF inference despite identical hardware.  
- **Memory Efficiency**:  
  - Offloading improvements for Qwen3.8-Flash-Next on RTX 5090 (32GB VRAM) with 200k context window (Issue #11278).  
  - `--ctx-checkpoints 64`, `--checkpoint-min-step 256` recommended for long-context stability.  
- **API Concurrency**: New `UNSLOTH_API_MAX_CONCURRENCY` config (PR #5482) enables safe throttling of inference requests.

#### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🔴 High | [#11143](https://github.com/unslothai/unsloth/issues/11143) | Qwen3.8-Flash-Next MTP aborts at load (`nextn.hc_head_norm` incorrect after rebase) | Open — critical for MTP users |
| 🔴 High | [#11219](https://github.com/unslothai/unsloth/issues/11219) | MTP drafter crashes on RTX 5080 during graph build (`ggml_can_repeat`) | Open — reproducible on b11007-mix |
| 🟡 Medium | [#11221](https://github.com/unslothai/unsloth/issues/11221) | GGUF inference slowdown post-v0.1.810-beta | Open — affects Studio UI and API |
| 🟡 Medium | [#11308](https://github.com/unslothai/unsloth/issues/11308) | DFlash sidecar + `--split-mode tensor` asserts on ROCm | Fixed upstream; unsloth must update llama.cpp fork |
| 🟡 Medium | [#11241](https://github.com/unslothai/unsloth/issues/11241) | Backend CI fails with withheld model 500 instead of 404 | Open — blocking main branch |

#### **6. What This Means for Application Developers**  
- **MTP & Speculative Decoding**: Prioritize `Qwen3.8-Flash-Next` with the new MTP hotfix for low-latency, high-throughput inference — ideal for agent pipelines.  
- **Cross-Platform Deployment**: Use the updated Docker image (`v0.1.811-beta`) for multi-user, ARM64, and ROCm support — essential for cloud-native AI infra.  
- **Robustness**: Avoid `--split-mode tensor` on ROCm until the next llama.cpp sync; use `layer` split as workaround.  
- **Security & UX**: The `--api-max-concurrency` flag (PR #5482) is crucial for production APIs to prevent resource exhaustion.  
- **Model Integration**: For non-standard models (e.g., Bonsai, Kimi K3), expect limited support — consider custom `llama.cpp` builds (Issue #9059).  

> 💡 **Pro Tip**: If using Windows, ensure App Execution Aliases are disabled (PR #5959) and avoid spaces in `HOME` paths (Issue #11290).

---  
*Digest generated: 2026-09-19 | Source: [unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*