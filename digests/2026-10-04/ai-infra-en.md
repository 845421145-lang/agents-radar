# AI Infrastructure Digest 2026-10-04

> Generated: 2026-10-04 01:56 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-04**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem in Q4 2026 is rapidly maturing into a highly specialized, hardware-aware landscape. Projects are converging on high-performance inference for next-gen architectures (SM120, GB10, B300), with intense focus on speculative decoding, MoE/Mixed GDN support, and efficient memory management. A clear bifurcation is emerging: low-level engines (vLLM, SGLang, llama.cpp) optimize kernels and caching; middleware gateways (LiteLLM) prioritize agent orchestration and cost control; while local runtimes (Ollama, Unsloth) emphasize developer experience and multimodal workflow integration. Security, observability, and cross-platform stability have become non-negotiable requirements.

---

### **2. Activity Comparison**

| Project       | Open Issues | Open PRs | Recent Release? | Notes |
|---------------|-------------|----------|------------------|-------|
| **vLLM**      | 78          | 94       | ✅ `v0.30.1-rc1` | High activity in correctness fixes (Marlin, speculative decoding) |
| **SGLang**    | 82          | 101      | ❌ No new release | Heavy focus on kernel optimizations & AMD/ROCm support |
| **llama.cpp** | 115         | 132      | ✅ `b11382` (patch) | Critical regressions in speculative decoding persist |
| **Ollama**    | 67          | 79       | ❌ No new release | Stability fixes dominate; audio input feature in pipeline |
| **LiteLLM**   | 103         | 114      | ✅ v1.105.0-rc.1 | Security-first releases; telemetry and budgeting under scrutiny |
| **Unsloth**   | 91          | 127      | ❌ No new release | Performance regressions in multi-GPU tensor split |

> 🔍 *Observation: All projects show strong contributor velocity, but vLLM and Unsloth lead in open PR count—indicating active engineering momentum.*

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen4Exp (Qwen3.8-Flash-Next)** | ✅ MTP support | ⚠️ Active tuning | ✅ MTP added | ❌ Not yet | ❌ Not yet | ❌ Not yet |
| **GLM5Next**               | ❌ | ✅ Active tuning | ✅ MTP support | ❌ | ❌ | ❌ |
| **Nemotron-3.5-Lightning** | ✅ NVFP4 + gfx942 | ❌ | ❌ | ❌ | ❌ | ❌ |
| **MiniMax-M3 / H3**        | ❌ | ✅ AITER + FP8 | ❌ | ❌ | ❌ | ✅ Audio workflows, diffusion stages |
| **SystemOne Decision Models** | ❌ | ❌ | ❌ | ✅ Full MLX support | ❌ | ❌ |
| **Audio Input (Qwen2-Audio)** | ❌ | ❌ | ❌ | ✅ Feature request | ❌ | ❌ |

> 🏆 **Leader**: **SGLang** leads in cutting-edge model architecture support (DeepSeek-V4.1, MiniMax-M3 on MI35x/MI355X, DSV4 sparse decode via Cake-kernels).  
> 🥈 **Runner-up**: **vLLM** excels in stable production-grade support for large MoE models (Qwen3.6-35B-A3B, Nemotron) across diverse hardware.  
> 🥉 **Differentiator**: **Unsloth** is ahead in **multimodal audio workflows** and **pre-quantized diffusion checkpoint loading**, positioning it as a unique player in creative AI pipelines.

---

### **4. Performance Frontier**

| Optimization Focus             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache Efficiency**          | ✅ (NVFP4 corruption fix) | 🔴 (Critical NVFP4 bug) | ❌ | ❌ | ❌ | ❌ |
| **Speculative Decoding**         | ⚠️ (High-severity bugs) | ✅ (Active tuning) | 🔴 (Critical `draft-mtp` crash) | ❌ | ⚠️ (Budget fallback issues) | 🔴 (Tensor split regression) |
| **Batching & Throughput**        | ✅ (Scheduler efficiency) | ✅ (File-backed PLE tables) | ✅ (MoE GPU cache) | ❌ | ❌ | ⚠️ (Multi-GPU slowness) |
| **Quantization (FP8/NVFP4/MXFP4)** | ✅ (Full MoE support) | ✅ (AITER + fused norms) | ✅ (WebGPU f16, MMVQ) | ❌ | ❌ | ❌ |
| **Distributed Serving**          | ✅ (MTP, UVA offload) | ✅ (Distributed preprocessing) | ❌ | ❌ | ✅ (Tracing, pagination) | ❌ |
| **Kernel Fusion & Low-Level Tuning** | ⚠️ (Marlin, Triton) | ✅ (CAKE, AITER, FLUX.3) | ✅ (CUDA/AMD GCN5) | ❌ | ❌ | ✅ (SageAttention 2, FlashAttention 4) |

> 📈 **Trend**: The performance frontier is shifting toward **kernel-level specialization** (SGLang, Unsloth), **distributed cold-row optimization** (SGLang), and **speculative decoding robustness** (vLLM). Quantization and batching remain foundational, but correctness is now paramount—silent errors (e.g., NVFP4 corruption) are considered critical.

---

### **5. Layer Positioning**

| Project       | Primary Layer              | Key Differentiators |
|---------------|------------------------------|---------------------|
| **vLLM**      | **Inference Engine**         | Industry standard for high-throughput, scalable LLM serving; dominant in cloud deployments. |
| **SGLang**    | **Inference Engine + Gateway** | Blends engine capabilities with agent routing (Cake-kernels), targeting high-performance agent systems. |
| **llama.cpp** | **Local Runtime / Embedded** | Lightweight, cross-platform, ideal for edge devices and offline inference. |
| **Ollama**    | **Developer Gateway / Local Runtime** | Developer-first UX; bridges CLI, web UI, and multimodal workloads. |
| **LiteLLM**   | **Agentic Gateway / Orchestration** | Central hub for routing, budgeting, tracing, and tool execution—critical for production agents. |
| **Unsloth**   | **Studio Platform / Training Runtime** | End-to-end studio experience with training, fine-tuning, and audio/vision workflows; targets creators and researchers. |

> 💡 **Strategic Insight**: vLLM and SGLang are the **engine layer** of choice for scale; LiteLLM and Ollama serve as **gateway layers** for agents and apps; Unsloth and llama.cpp are **local runtime enablers** for developers and edge use cases.

---

### **6. Trend Signals**

1. **Correctness Over Speed**: Silent bugs (e.g., NVFP4 KV cache corruption, Marlin int8 scale read) are now treated as **critical**, not just performance issues. Developers must prioritize **verified builds** and **signed images** (LiteLLM, vLLM).
2. **Agent-Centric Design**: Gateways (LiteLLM) and engines (SGLang) are increasingly optimizing for **agent reasoning**, **tool calling**, and **media content preservation**—not just token generation.
3. **Hardware Specialization**: AMD ROCm and NVIDIA SM120/GB10 are no longer experimental—they’re primary targets. Projects like SGLang and Unsloth are investing heavily in **vendor-specific kernels** (AITER, SageAttention).
4. **Security & Supply Chain Integrity**: Signed Docker images (LiteLLM), OIDC support (Anthropic), and cosign verification are becoming standard—**no more trust-by-default**.
5. **Multimodal Expansion**: Audio input (Ollama), diffusion (Unsloth), and media-aware routing (LiteLLM) signal that **vision and audio are now first-class citizens** in agentic workflows.

> 🔔 **Action for Application Developers**:  
> - Audit your inference stack for **correctness guarantees** before scaling.  
> - Use **signed, verified builds** from trusted sources (e.g., LiteLLM’s cosign).  
> - Design agent workflows with **media fidelity** and **budget enforcement** in mind.  
> - Avoid unstable versions (e.g., `b11382+`, `b10715+`) in production—**pin to known-stable commits**.  
> - Prepare for **audio and multimodal inputs** as core features—not add-ons.

---  
*Report generated: 2026-10-04 | Source: GitHub project digests*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-04**

#### **1. Today's Highlights**  
Critical fixes for Marlin int8-activation quantization (PR #59895) and speculative decoding correctness (PR #52244) address high-severity bugs affecting model accuracy and throughput on MoE and hybrid GDN models. A major performance regression in MTP speculative decoding—causing up to 30–40% batch throughput loss—is under active investigation (Issue #53670), while new PRs improve token streaming reliability and scheduler efficiency.

#### **2. Releases & Breaking Changes**  
No new releases in the past 24 hours. The upcoming `v0.30.1` release (currently `rc1`) is expected to include stability improvements for ROCm, UVA offload, and speculative decoding. Developers should test against `nightly` builds if relying on features like `--offload-backend uva` or `num_speculative_tokens_per_batch_size`.

#### **3. New Model & Hardware Support**  
- **ROCm**: Support for `nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4` on gfx942 now stable post-#59027 fix.  
- **Intel GPU**: PR #59865 adds support for fused input normalization (`mm_input_norm`) in multimodal models on XPU.  
- **Quantization**: NVFP4 and MXFP4 are now better supported across MoE and hybrid GDN layouts (e.g., Qwen3.6-35B-A3B).  
- **Hardware**: Full support confirmed for DGX Spark (GB10/SM121), Blackwell (sm_120), and B300 (SM100) platforms.

#### **4. Performance & Optimization**  
- **Speculative Decoding**: Dynamic MTP spec decoding causes catastrophic throughput collapse at batch size thresholds (Issue #49548). Fixes underway via PR #52244 (prefix-cache hit restoration) and PR #59895 (scale corruption fix).  
- **Scheduler Efficiency**: PR #59908 optimizes request token transmission by sending `prompt_token_ids` as `int32` arrays, reducing CPU overhead during prefill (tens of ms per long prompt).  
- **Memory Usage**: PR #57865 ensures graph profiling workspace is accounted for before KV cache sizing, preventing OOM in high-concurrency scenarios.

#### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|-------|--------|------------|
| Critical | #59403: Marlin int8-activation reads negative group scales as unsigned → corrupts logits | All models using `VLLM_MARLIN_INPUT_DTYPE=int8` | ✅ Fixed in PR #59895 (depends on #48926) |
| High | #53670: EAGLE/MTP prefix-cache last-block drop causes 1,648-token recompute → 30–40% throughput loss | Hybrid GDN + spec decoding workloads | 🔧 In progress (PR #52244) |
| High | #49548: Dynamic speculative decoding collapses aggregate throughput at threshold | Batch-level performance degradation | 🔍 Investigating root cause |
| Medium | #59834: Responses API streaming regenerates `item_id`/`call_id` → breaks strict clients | Streaming agent compatibility | ✅ Fixed in PR #59859 |
| Medium | #59770: Nemotron-3.5-Lightning NVFP4 decode ~16% slower since v0.29.0 | Single-request latency regression | 🔎 Under analysis |

#### **6. What This Means for Application Developers**  
- **Avoid `int8-activation` with Marlin** until upgrading to `v0.30.1+` or applying the patch from #59895.  
- **Use `--offload-backend uva` cautiously** with quantized MoE models—expect ~35% host RAM waste due to `pin_memory()` rounding (Issue #58178).  
- **Enable `num_speculative_tokens_per_batch_size` only if you can tolerate potential throughput drops**—monitor for regressions on large-context models (Qwen3.5-122B, etc.).  
- **Ensure `request-level chat_template_kwargs` does not break image handling**—multimodal requests may silently drop images (Issue #59876).  
- **Streamed responses** now preserve `item_id`/`call_id` correctly (via #59859), improving compatibility with strict OpenAI client agents.

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [PRs](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-04**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with a strong focus on **performance optimization for next-gen hardware**, particularly SM120 (RTX PRO 6000) and GB10 (DGX Spark). Key developments include critical fixes for **NVFP4 KV cache corruption** and **fa4 attention backend crashes**, alongside active work on DeepSeek V4.1 optimizations and enhanced support for AMD’s MI35x/MI355X via AITER kernels. The community is also advancing distributed multimodal preprocessing and file-backed PLE tables for cold-row efficiency.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*  
However, ongoing efforts around `sgl-deep-gemm` (v0.2.0) highlight lingering API inconsistencies: [Issue #39684](https://github.com/sgl-project/sglang/issues/39684) reports that `SM90 weight-scale transform` returns a non-owning alias — a potential source of undefined behavior if not handled carefully by downstream code.

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Support**: Expanded coverage for MiniMax-M3 on gfx950, including FP8 block selection via AITER (`PR #41708`, `#41707`) and fused sparse QK norm + RoPE + cache writes (`PR #35357`).  
- **NVIDIA SM120/GB10**: Active tuning for GLM-5.3-Flash (`Issue #42012`), Qwen4Exp (`Issue #36796`), and DeepSeek-V4.1 (`Issue #42170`).  
- **Multi-modal & Diffusion**: New support for MiniMax-H3 diffusion stages via `SGLANG_CAKE_ROUTES` (`PR #42416`) and improved ComfyUI integration (`PR #42121`).  
- **Model Formats**: OCI registry path resolution added via `oci://` scheme (`PR #37161`), enabling secure, air-gapped model deployment.

---

### **4. Performance & Optimization**  
- **File-backed PLE Table**: PR `#42392` introduces concurrent host reads for cold rows, achieving **6.8× lower cold-prefill TTFT** on GB10 — a major win for long-context inference.  
- **AMD Optimizations**:  
  - AITER-based FP8 prefill for HD128 layers reduces latency in MiniMax-M3 (`PR #41707`).  
  - Small-batch MoE sorting optimized for MI355X (`PR #41982`), addressing performance bottlenecks in InferenceX benchmark.  
- **Kernel Fusion**: FLUX.3 rowwise FP8 quantization now fused with Triton (`PR #41671`); Sparse MLA decode for DSV4 enabled via Cake-kernel forwarding (`PR #42416`).  
- **Prefill/Decode Pipeline**: Ongoing work on mHC TP optimization (`Issue #42170`) and DSPARK verification fixes (`PR #42439`) aim to reduce decode overhead on large models.

---

### **5. Stability & Regressions**  
- **Critical**:  
  - **NVFP4 KV Cache Corruption** (`Issue #42369`): Serving an NVFP4 cache from a checkpoint with `num_bits: 8` silently corrupts 32 scalars due to reuse of fp8-calibrated `k_scale`/`v_scale`. This leads to deterministic long-context errors on sm_120. *Fix pending*.  
  - **fa4 Attention Crash** (`Issue #42012`): Hybrid extend reshape fails during CUDA-graph capture on SM120; only triton backend works reliably. *High severity, no fix yet*.  
- **Moderate**:  
  - `--bf16-gemm-backend gemv` is accepted but ignored (`Issue #42085`).  
  - `--enable-return-routed-experts` returns all-zero routing on triton/flashinfer paths (`Issue #41743`).  
- **CI Health**: `Issue #17050` tracks 1 broken, 8 flaky tests across CI — primarily affecting main branch stability.

---

### **6. What This Means for Application Developers**  
- **Use `SGLANG_CAKE_ROUTES`** to opt into high-performance kernel paths (e.g., DSV4 sparse decode, Mamba2 SSD/SSU) — especially beneficial for agent workloads requiring low-latency routing.  
- **Avoid `nvfp4` KV caches** on checkpoints with `num_bits: 8` until `#42369` is resolved — this can cause silent, hard-to-debug correctness issues in long-context tasks.  
- **Leverage file-backed PLE tables** (`PR #42392`) for applications with cold-start-heavy workloads (e.g., retrieval-augmented generation).  
- **Monitor AMD-specific regressions** (`PR #41708`, `#41707`) when deploying MiniMax-M3 or Qwen3.5-397B on MI35x/MI355X — prefer AITER kernels where available.  
- **Ensure proper error handling** for OpenAI-compatible APIs: current response format diverges from spec (`Issue #33504`), so clients should expect non-standard error structures.

> 🔗 [GitHub Issues Summary](https://github.com/sgl-project/sglang/issues?q=is%3Aissue+is%3Aopen+updated%3A%3E2026-10-03) | [Recent PRs](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+updated%3A%3E2026-10-03)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-04**

---

### **1. Today's Highlights**  
The latest updates focus on stabilizing speculative decoding workflows and improving GPU backend robustness, particularly for WebGPU and CUDA. Key fixes address critical crashes in `draft-mtp` under multi-ubatch conditions and memory corruption issues on Snapdragon X Elite via Vulkan. New support for f16 in WebGPU fill/set_rows enhances compatibility with modern quantized models.

---

### **2. Releases & Breaking Changes**  
- **b11382**: Added `f16` support to `fill`/`set_rows` in WebGPU backend ([#29897](https://github.com/ggml-org/llama.cpp/pull/29897)) — required for correct behavior with `glm5-next` and FA-enabled models.  
- **b11381**: Fixed deprecated `strdup` warning on Windows in `mtmd` ([#29863](https://github.com/ggml-org/llama.cpp/pull/29863)).  
- **b11380**: Updated `cpp-httplib` to v0.59.0 for improved dependency hygiene ([#29886](https://github.com/ggml-org/llama.cpp/pull/29886)).  
- **b11379**: Patched server abort caused by unbounded `n_batch` vs `n_ubatch` mismatch ([#29903](https://github.com/ggml-org/llama.cpp/pull/29903)) — impacts high-concurrency inference stability.

> ✅ *No breaking API changes; all updates are bug fixes or performance enhancements.*

---

### **3. New Model & Hardware Support**  
- **New Model Support**:  
  - MTP (Multi-Token Prediction) added for **GLM5Next** ([#29928](https://github.com/ggml-org/llama.cpp/pull/29928)).  
  - MTP now supported for **Qwen4Exp (Qwen3.8-Flash-Next)** ([#29761](https://github.com/ggml-org/llama.cpp/pull/29761)).  
- **Hardware & Backend Enhancements**:  
  - **WebGPU**: Full f16 support in `fill/set_rows`, enabling stable inference on `glm5-next` with Fast Attention.  
  - **CUDA**: Optimized Q2_K kernel via reduced VGPR spills on AMD GCN5 ([#29910](https://github.com/ggml-org/llama.cpp/pull/29910)).  
  - **SYCL**: Fixed memory errors in `mul_mat`, split buffer, and host pool handling ([#29889](https://github.com/ggml-org/llama.cpp/pull/29889)).  
  - **OpenVINO**: Updated to 2026.4.1 with performance improvements, expanded ops, and better device listing ([#29852](https://github.com/ggml-org/llama.cpp/pull/29852)).  
- **Quantization Formats**:  
  - MMVQ support extended to `Q1_0`, `Q5_0`, `Q5_1`, `Q3_K`, `Q5_K`, `Q6_K`, and `MXFP4` on WebGPU ([#29483](https://github.com/ggml-org/llama.cpp/pull/29483)).

---

### **4. Performance & Optimization**  
- **WebGPU**: Speedups reported for `Q1_0/Q5_0/Q5_1` across models (e.g., ~1.3x gain on Tesla V100).  
- **CUDA (AMD)**: Q2_K kernels reduced VGPR spills significantly — improves throughput on MI50 and similar GCN5 GPUs.  
- **MoE Optimization**: PR [#29887](https://github.com/ggml-org/llama.cpp/pull/29887) introduces a GPU cache for MoE experts kept in host memory, reducing offload overhead for small batches (<32 tokens).  
- **Memory Efficiency**: Qwen4Exp now halves indexer score memory usage ([#29825](https://github.com/ggml-org/llama.cpp/pull/29825)), crucial for long-context inference.

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| Critical | `draft-mtp` acceptance collapses to 0.0 under `-np N` with multi-ubatch | Silent failure in self-speculative decoding | [Fix in progress](#27572) |
| High | GLM-5.3-Flash decode stalls on Metal due to fallback to CPU indexer | Blocks real-time inference on Apple M5 | [Issue open](#29867) |
| High | Qwen3.8-Flash-Next + MTP: eval crash at startup | Prevents model use in production | [Issue open](#29811) |
| Medium | `unpack8()` corrupts MAT_MUL+CPY on Snapdragon X Elite (Vulkan) | Inconsistent output on Arm64 mobile chips | [Issue open](#28290) |
| Medium | Garbled output when using `-np > 1` with Qwen3.6-35B-A3B-Q8_0 | Multi-client concurrency issue | [Issue open](#26031) |

> 🔥 *Critical regressions in speculative decoding (`draft-mtp`) remain unresolved and affect core inference reliability.*

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding**: Avoid `-np N` with `draft-mtp` until [#27572](https://github.com/ggml-org/llama.cpp/issues/27572) is resolved — expect silent token rejection.
- **Leverage new MTP support**: Enable `--spec-type draft-mtp` for Qwen4Exp and GLM5Next to boost throughput; test with `--spec-draft-n-max 3`.
- **Optimize for hardware**: Use `--gpu-layers` aggressively on CUDA/ROCm; prefer `f16` paths where possible (especially on WebGPU).
- **Monitor memory usage**: The Qwen4Exp memory optimization reduces peak VRAM — ideal for long-context agents on constrained devices.
- **Avoid unstable builds**: Do not use `b11379` or later if running `Qwen3.8-Flash-Next` with MTP — the startup crash is reproducible ([#29811](https://github.com/ggml-org/llama.cpp/issues/29811)).

> 📌 *Recommendation: Pin to `b11378` or earlier for production inference with MTP until fix lands.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-04**

---

### **1. Today's Highlights**  
Ollama continues to advance its support for multimodal and structured reasoning workflows, with key progress on audio input (Issue #11798) and SystemOne decision models (PRs #18777, #18768). Critical stability fixes were merged for `clef-flash` on Windows (PR #18777) and GPU index misalignment (PR #18773), resolving high-severity regressions affecting model serving reliability across platforms.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published today.

---

### **3. New Model & Hardware Support**  
- **Audio Input Support**: Feature request (#11798) seeks to enable audio input for multimodal models like Qwen2-Audio, mirroring existing image input capabilities. This would extend Ollama’s multimodal reach beyond vision.
- **MLX Backend Enhancements**:  
  - Added Kolibri 1 support (PR #18780)  
  - Improved tokenizer semantics (PR #18779)  
  - Full SystemOne model support on MLX (PR #18701, now merged)  
- **Windows & GPU Indexing Fixes**: PR #18773 ensures proper GPU ordinal alignment when skipping zero-memory pseudo-devices, critical for multi-GPU systems on Windows.

---

### **4. Performance & Optimization**  
- **SystemOne Latency Reduction**: PR #18776 optimizes route flow in MLX backend, reducing warm latency by ~5ms on M5 chips—important for low-latency inference use cases.
- **Memory Efficiency Improvements**:  
  - PR #18781 eliminates redundant blob fetching during model pulls, cutting bandwidth overhead (e.g., 8 KiB vs 4 KiB per blob).
  - PR #18771 encodes colons in registry hosts to prevent path errors on Windows, improving robustness in containerized/enterprise deployments.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| High | `clef-flash` fails on `/v1/systemone` due to `non-finite logit` (CUDA) / `cannot open model` (CPU) on Windows | Open | [PR #18777](https://github.com/ollama/ollama/pull/18777) |
| High | GPU device index misaligned due to skipped zero-memory pseudo-devices | Open | [PR #18773](https://github.com/ollama/ollama/pull/18773) |
| Medium | JSON schema property order lost in native llama-server chat path | Open | [PR #18717](https://github.com/ollama/ollama/issues/18717) |
| Medium | `gemma4:e4b` violates JSON schema when `think:true` bypasses reasoning | Open | [PR #18774](https://github.com/ollama/ollama/issues/18774) |
| Low | Trailing non-JSON data accepted in `/api/generate` request body | Open | [PR #18778](https://github.com/ollama/ollama/pull/18778) |

> 🔴 *Note: The `clef-flash` regression is particularly severe—it affects a widely used decision model and only manifests on Windows, indicating platform-specific memory access issues.*

---

### **6. What This Means for Application Developers**  
- **Multimodal Apps**: Prepare for upcoming audio input support—designers of voice-enabled agents should monitor #11798 for integration readiness.
- **Structured Reasoning Workflows**: Be cautious with `think: "low"`/`"medium"` on Qwen3.8 GGUF models—behavior is currently inconsistent with template expectations. Use `think: false` as a workaround until fix lands.
- **Cross-Platform Deployments**: If using `clef-flash` or other SystemOne models on Windows, expect potential failures unless patching via PR #18777. Test on target hardware early.
- **Schema Enforcement**: Avoid relying on strict JSON schema ordering in responses from `gemma4` or similar models when `think:true`—the output may be malformed.
- **Input Validation**: Ensure clients do not send trailing garbage in `/api/generate` payloads; future versions will reject such requests (tracked in #18775).

👉 *Recommendation: Pin your Ollama version until critical fixes are released, especially if deploying on Windows or using decision models.*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-04**

#### **1. Today's Highlights**  
LiteLLM continues its rapid evolution with a focus on **agent telemetry integrity**, **budgeting reliability**, and **agentic system robustness**. Key developments include fixes for critical budget exhaustion logic, improvements in trace replay fidelity for reasoning models, and enhanced security around OAuth and credential handling. The project is also advancing its observability stack with OTEL v2 integration for cache metrics.

#### **2. Releases & Breaking Changes**  
- **v1.105.0-rc.1**, **v1.104.0**, and **v1.103.3** released within the past 24 hours. All Docker images are signed with [cosign](https://docs.sigstore.dev/cosign/overview/) using the same key introduced in [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
- **Security Note**: Verify signatures before deployment to prevent supply chain risks. Use `cosign verify` with the public key from the repository’s `.sigstore` directory.

#### **3. New Model & Hardware Support**  
- ✅ **Anthropic Workload Identity Federation (OIDC JWT-bearer)**: Added support via #28607 (closed), enabling secure, identity-based access for Anthropic endpoints without long-lived keys.  
- ✅ **OpenRouter TTS Models**: Fixed routing for `/v1/audio/speech` in #42111, now correctly mapped to OpenRouter provider slug (`openrouter/google/gemini-3.1-flash-tts-preview`).  
- ✅ **YAML OpenAPI Specs**: MCP now supports YAML-formatted OpenAPI specs (#38952), improving flexibility for tool definition in enterprise environments.

#### **4. Performance & Optimization**  
- **Tracing & Pagination**: Significant refactoring in #44452 and #44422 introduces shared, signed pagination across trace list/detail reads, reducing latency and improving consistency during large-scale trace exploration.  
- **Cache Token Metrics**: OTEL v2 integration will export prompt-cache read/write token counts as span attributes (#43992), enabling fine-grained performance monitoring of caching behavior.  
- **Background Health Checks**: Fixes in #44154 ensure health check results are attributed correctly per deployment, preventing misleading error propagation across model groups.

#### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Description |
|------|----------|--------|--------|-------------|
| #43732: Key re-admitted after idle despite max_budget | ⚠️ High | Open | No | Virtual key admitted again after 60s idle until batch writer flushes spend → potential overage risk |
| #39057: Cache hit spend = 0 but tokens still counted | ⚠️ Medium | Open | No | Semantic ambiguity in telemetry reporting when response cache is hit; impacts cost accounting |
| #44336: Vertex AI Agent Engine drops media content silently | ❌ Critical | Open | No | Non-text content parts (`image_url`, `file`, `audio`) discarded with no warning → incorrect agent outputs |
| #43652: Budget threshold not respected for fallback models | ⚠️ Medium | Open | No | Aggregated budgets don’t trigger fallback to economy models at threshold |

> 🔍 *Note: Several high-impact bugs affect budget enforcement, agent correctness, and telemetry accuracy—urgent attention required for production deployments.*

#### **6. What This Means for Application Developers**  
- **Budgeting Systems**: Avoid relying on real-time budget checks if you use virtual keys. Implement client-side retry delays or manual flushing to avoid false overages. Monitor #39057 and #43732 closely.  
- **Agent Design**: Be cautious when using multi-modal inputs with Vertex AI or Anthropic agents—media content may be silently dropped (#44336). Validate payloads post-routing.  
- **Telemetry & Observability**: Leverage upcoming OTEL v2 cache metrics (#43992) to track cache effectiveness and optimize model selection. Use signed pagination (#44452) for scalable trace analysis.  
- **Authentication**: Migrate to OIDC-based workflows where possible (via #28607) for better security and lifecycle management, especially in regulated environments.  
- **Tooling & SDKs**: Use new `run_tool_loop()` and `arun_tool_loop()` helpers (#44381) to standardize tool execution loops, reducing boilerplate and increasing reliability.

👉 **Action Items**:  
- Audit all virtual key configurations for budget thresholds and idle timeout behaviors.  
- Update CI/CD pipelines to verify cosign signatures on LiteLLM images.  
- Test agent workflows involving media inputs and reasoning models under current RC versions.  

🔗 Full issue tracker: [GitHub Issues – BerriAI/litellm](https://github.com/BerriAI/litellm/issues)  
🔗 Pull Request dashboard: [GitHub PRs – BerriAI/litellm](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-04**

---

### **1. Today's Highlights**  
The Unsloth team has made significant progress in stabilizing and enhancing Studio’s core inference and training workflows, with key improvements to attention kernel handling, model loading reliability, and UI responsiveness. Critical regressions in tensor split decoding performance (up to 2.9x slower on multi-GPU setups) have been identified and are under active investigation. Meanwhile, new features like automatic step skipping (1.44–1.81x speedup), per-model context tracking, and enhanced audio workflow separation are now in review.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases were published in the last 24 hours. However, several PRs introduce breaking changes or behavioral shifts:  
- **PR #12641** (`studio/sage-attention-gate`): Explicit `attention_backend="sage"` requests now safely fall back without failing generation or rendering noise. This may affect users relying on manual kernel selection. [GitHub PR #12641](https://github.com/unslothai/unsloth/pull/12641)  
- **PR #12652**: Automatic step skip is now enabled by default for models with ≥20 steps at `speed_mode=max`, improving efficiency but potentially altering expected inference behavior. [GitHub PR #12652](https://github.com/unslothai/unsloth/pull/12652)

---

### **3. New Model & Hardware Support**  
- **SageAttention 2 & FlashAttention 4**: Now probed and auto-loaded on fresh Studio installs via kernel hub integration. Supports modern NVIDIA cards (e.g., B200 sm100). [GitHub PR #12654](https://github.com/unslothai/unsloth/pull/12654)  
- **Pre-quantized diffusion checkpoints**: Readable from `.safetensors` format on torchao 0.17, 0.18, and main branches, enabling smoother model deployment. [GitHub PR #12645](https://github.com/unslothai/unsloth/pull/12645)  
- **Mixed GPU pinning (Vulkan)**: Improved discrete GPU utilization over iGPU in mixed configurations (e.g., RX 7700 XT + integrated GPU). [GitHub PR #12650](https://github.com/unslothai/unsloth/pull/12650)  
- **Audio Workflow Expansion**: HTDemucs, BS-RoFormer, and Mel-Band RoFormer GGUFs now supported in the new *Separate Audio* workflow. [GitHub PR #12610](https://github.com/unslothai/unsloth/pull/12610)

---

### **4. Performance & Optimization**  
- **Automatic Step Skip**: Enabled by default for high-step models (≥20), delivering **1.44x to 1.81x throughput gains** across five tested models; MiniMax-H3 achieves up to **1.81x**. [GitHub PR #12652](https://github.com/unslothai/unsloth/pull/12652)  
- **Tensor Split Decoding Regression**: A critical performance drop has been reported since `b10715-mix-86bd2d3`, with **~48 tokens/sec** on dual RTX 5070 Ti (Windows/WSL2/Linux) vs. **115–120 t/s** on older versions. Likely tied to `max_cuda_graphs = 64` and CUDA graph tuning. [GitHub Issue #12468](https://github.com/unslothai/unsloth/issues/12468)  
- **Context Length Meter Enhancements**: Proposals to track automated compactions (#12625) and tool call transitions (#12624) aim to improve real-time resource visibility. [GitHub Issues #12625, #12624](https://github.com/unslothai/unsloth/issues/12625, #12624)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Link |
|--------|------|-------------|------|
| 🔴 High | **Tensor Split Decode Slowness** | Multi-GPU `--split-mode tensor` performance degraded up to **2.9x** post `b10715-mix-86bd2d3`. Affected Windows/WSL2/Linux. | [Issue #12468](https://github.com/unslothai/unsloth/issues/12468) |
| 🔴 High | **Studio mmproj-F16.gguf Disk Paging** | Vision models now page `mmproj-F16.gguf` from disk during generation, causing severe t/s regression. Also rejects `--mlock`. | [Issue #12372](https://github.com/unslothai/unsloth/issues/12372) |
| 🟡 Medium | **Triton Health Probe Breaks Diffusers/XFormers** | Xet health probe stubs out Triton process-wide, triggering `'function' object has no attribute 'fn'` errors. | [Issue #12466](https://github.com/unslothai/unsloth/issues/12466) |
| 🟡 Medium | **Windows "nul" File Blocking Tools** | Phantom `nul` file created in sandbox workdir causes terminal/tool failures on Windows. | [Issue #12473](https://github.com/unslothai/unsloth/issues/12473) |
| 🟡 Medium | **Stop Generating Button Freezes** | Buttons freeze after unload; chat becomes unresponsive despite model being unloaded. | [Issue #12592](https://github.com/unslothai/unsloth/issues/12592) |

> ✅ *Fix PRs exist for:*  
> - `tool_choice="none"` stream closure: [PR #12627](https://github.com/unslothai/unsloth/pull/12627)  
> - Toast styling: [PR #12655](https://github.com/unslothai/unsloth/pull/12655)  
> - Context meter updates: [PRs #12624, #12625](https://github.com/unslothai/unsloth/pull/12624, #12625)

---

### **6. What This Means for Application Developers**  
- **Avoid `b10715-mix-86bd2d3`+** if using multi-GPU tensor splitting — revert to `b10687-mix-67dfc8b` or official ggml builds for production inference.  
- **Enable `speed_mode=max`** to benefit from automatic step skipping (1.44–1.81x gain), especially for large models (>20 steps).  
- **Expect stricter validation** of `--mlock` and `extra_args` in Studio — these are now rejected due to security/stability hardening.  
- **Monitor kernel availability** when deploying vision/audio models: SageAttention/FlashAttention 4 now auto-load, but fallback paths are critical for compatibility.  
- **Design for session resilience**: The `stop generating` button freeze bug suggests state cleanup may be incomplete — implement client-side timeout handlers.  
- **Leverage new APIs** for training: `sk-unsloth` keys now support API-initiated LLM and diffusion training via MCP tools. [PR #12644](https://github.com/unslothai/unsloth/pull/12644)

---  
*Digest generated: 2026-10-04 | Source: GitHub — unslothai/unsloth*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*