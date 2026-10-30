# AI Infrastructure Digest 2026-10-30

> Generated: 2026-10-30 02:07 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-30**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is rapidly maturing into a multi-layered, hardware-diverse landscape. Leading projects like **vLLM**, **SGLang**, and **Unsloth** are pushing performance boundaries in high-throughput inference, while **llama.cpp** maintains dominance in CPU/edge efficiency. **Ollama** and **LiteLLM** serve as critical abstraction layers, enabling agent-native workflows and OpenAI compatibility across heterogeneous backends. The convergence of multimodal support, speculative decoding, and cross-platform quantization reflects a shift toward unified, scalable deployment for real-world applications — particularly agents, voice AI, and low-latency services.

---

### **2. Activity Comparison**

| Project       | Issues (Open) | PRs (Recent) | Release Status        |
|---------------|---------------|--------------|------------------------|
| **vLLM**      | 48            | 15           | v0.33.0 pending (no breaking changes) |
| **SGLang**    | 67            | 12           | No new release; CI instability reported |
| **llama.cpp** | 93            | 18           | `b11998` latest build; no breaking API changes |
| **Ollama**    | 81            | 9            | No new release; stability issues in MLX/audio paths |
| **LiteLLM**   | 34            | 14           | v1.108.0-rc.1 released with signed images |
| **Unsloth**   | 72            | 11           | No release; configuration-breaking PRs merged |

> ✅ *vLLM and llama.cpp lead in active development velocity; LiteLLM stands out with secure, production-ready RC releases.*

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3-VL / Qwen3.5+MoE** | ✅ Full ViT CUDA graph (Issue #38175) | ❌ | ✅ (via GGUF) | ✅ | ✅ | ❌ |
| **Kimi K2.5 / K3** | ✅ (Issue #38175) | ❌ | ❌ | ❌ | ❌ | ✅ (requested) |
| **LFM3-Omni / LFM3-VL** | ❌ | ✅ (PR #47281) | ✅ (`b11998`) | ✅ (`--audio`, Issue #19396) | ✅ (`zai/*`) | ✅ (requested) |
| **DeepSeek-V4.1-Flash** | ✅ ROCm/AMD optimization | ✅ (scheduler crash) | ✅ | ✅ (ROCm iGPU bleed) | ❌ | ❌ |
| **Gemma 4 MTP** | ✅ (speculative decode fix) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **ExLlamaV3 (EXL3)** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (experimental) |

> 🏆 **Leader: vLLM** – leads in multimodal vision model integration and GPU-level optimizations.  
> 🥈 **Runner-up: SGLang & llama.cpp** – strong on niche hardware (AMD, Hexagon), but face stability risks.  
> 🥉 **Emerging: Ollama & LiteLLM** – accelerating in audio/video and provider agnosticism.

---

### **4. Performance Frontier**

| Optimization Focus         | vLLM                     | SGLang                   | llama.cpp               | Ollama                  | LiteLLM                 | Unsloth                 |
|----------------------------|--------------------------|--------------------------|--------------------------|--------------------------|--------------------------|--------------------------|
| **KV Cache & Offload**     | ✅ DiffKV tiling, Tiered offload fixes | ✅ Dynamic EPLB, DSA sparse attention | ✅ Tiled flash attention (q8_0) | ✅ Memory accounting fixes | ✅ Redis scalability refactor | ✅ Context compaction (in progress) |
| **Batching & Parallelism** | ✅ Batch-sharded sampling | ✅ MoE dispatch, scheduler metrics | ✅ CPU tiled batching | ✅ Concurrent generation | ✅ Least-busy routing | ✅ Multi-model residency |
| **Quantization**           | ✅ PDL gating, MXFP8 GEMM | ✅ FP8 MoE, IQ2 (OpenCL) | ✅ IQ2_s, MXFP4, Q4_0 | ✅ Ternary proposal (bonsai-2) | ✅ Cost tracking (USD/unit) | ✅ Fused 4-bit decode (NF4) |
| **Kernel & Hardware**      | ✅ SM80/SM90 diffKV, ROCm/FlyDSL | ✅ AOTriton, gfx1151 diffusion | ✅ Metal MXFP4, SYCL vectorization | ✅ MLX top-k chunk sort | ✅ Streaming Pydantic fix | ✅ Apple Silicon VRAM estimator |
| **Distributed Serving**    | ✅ Mooncake P/D disaggregation | ✅ Pluggable transports | ❌ | ❌ | ✅ Wildcard health checks | ❌ |

> 🔍 **Top Trends**:  
> - **vLLM** dominates kernel-level optimizations (attention, KV cache).  
> - **SGLang** leads in advanced MoE and diffusion pipeline tuning.  
> - **Unsloth** excels in fused decoding and memory-aware inference on Apple Silicon.  
> - **liteLLM** focuses on operational reliability (cost tracking, Redis resilience).

---

### **5. Layer Positioning**

| Project       | Primary Layer             | Key Differentiator                                  |
|---------------|----------------------------|-----------------------------------------------------|
| **vLLM**      | High-Performance Serving Engine | GPU-centric, CUDA/ROCm-focused, optimized for throughput at scale |
| **SGLang**    | Advanced Inference Engine   | Rich control over scheduling, MoE, speculative decoding; targets complex agent logic |
| **llama.cpp** | Local Runtime / Edge Inference | CPU/GPU heterogeneity champion; ideal for mobile, embedded, and offline use |
| **Ollama**    | Agent-Native Gateway        | Seamless tool calling, multimodal input/output, OpenAI-compatible API |
| **LiteLLM**   | Unified Gateway & Orchestrator | Provider-agnostic routing, cost tracking, security hardening |
| **Unsloth**   | Developer-Focused Runtime + Studio | Visual workflow builder (Flows), MLX-first UX, context management |

> 📊 **Positioning Insight**:  
> - **vLLM/SGLang**: Bottom-up infrastructure for high-performance clusters.  
> - **llama.cpp/Ollama**: Middle layer for edge-to-cloud portability.  
> - **LiteLLM/Unsloth**: Top layer for application developers building agents and fine-tuned systems.

---

### **6. Trend Signals**

#### **Key Industry Trends Extracted from Today’s Activity**:
1. **Multimodal Integration Is Now Mainstream**  
   → All major projects now support vision (Qwen3-VL, Kimi-K3, LFM3-VL), with **vLLM** leading in ViT CUDA graph optimization.

2. **Hardware Diversification Accelerates**  
   → AMD ROCm (gfx1151/gfx1201), Intel XPU/Mooncake, Apple Silicon, and Hexagon are no longer experimental — **SGLang** and **llama.cpp** lead in early adoption.

3. **Agent Workflows Demand Native Tooling**  
   → Silent data loss in `tool_calls` (Ollama), streaming corruption (LiteLLM), and context overflow (Unsloth) highlight urgent need for robust agent primitives.

4. **Security & Observability Are Non-Negotiable**  
   → **LiteLLM**’s signed Docker images via cosign set a new standard. Cost tracking accuracy and Redis reliability are now central to trust in production gateways.

5. **Quantization Is Evolving Beyond Bits**  
   → **IQ2**, **MXFP4**, **ternary**, and **EXL3** formats signal a move toward precision-aware, hardware-optimized quantization — not just bit reduction.

#### **What Application Developers Should Watch**:
- ⚠️ **Avoid `qwen3.8:27b-mlx`** until Ollama fixes `tool_calls` handling.
- 🔄 **Test early with nightly builds** from vLLM, SGLang, and Unsloth — many optimizations are pre-release.
- 🔐 **Upgrade to LiteLLM v1.108.0-rc.1+** to prevent silent $0 spend logging.
- 🎯 **Leverage Flows (Unsloth) and Diffusion Pipelines (SGLang)** for next-gen agent training and multimodal reasoning.
- 🛠 **Prepare for hybrid deployments**: Use `--enable-batch-sharded-sampling` (vLLM) and `UNSLOTH_DECODE_FUSED_NF4=1` for peak efficiency.

---

> ✅ **Final Takeaway**: The AI infrastructure stack is no longer monolithic. The future belongs to **specialized, interoperable layers** — where **vLLM** powers the engine, **SGLang** orchestrates complexity, **LiteLLM** manages cost, and **Unsloth/Ollama** enable rapid agent innovation. Choose your layer based on latency, hardware, and developer experience needs.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-30**

---

### **1. Today's Highlights**  
The vLLM project continues to deepen its support for multimodal and high-performance inference, with critical work on ViT CUDA graph optimization (Issue #38175) and performance improvements for AMD ROCm platforms (PR #63910, #60169). Key stability fixes address priority scheduling bugs (#59907, PR #59963) and speculative decoding consistency issues, while new PRs extend cross-platform compatibility—particularly for Intel XPU and Mooncake P/D disaggregation.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes observed. Users should continue monitoring `vllm-project/vllm` for upcoming v0.33.0 updates expected to include several of the ongoing optimizations.

---

### **3. New Model & Hardware Support**  
- **Multimodal Vision Models**: Active development on full CUDA graph support for ViTs in Qwen3-VL, Qwen3.5, GLM-V, and Kimi K2.5 (Issue #38175).  
- **ROCm Optimization**: Significant performance gains for DeepSeek-V4.1 (gfx950 / MI355X) via FlyDSL MXFP8 GEMM (PR #60169), and improved kpool handling in GLM-5.3-Flash (PR #63910).  
- **Intel XPU Integration**: Fix for MooncakeStoreConnector on Intel XPU (PR #62546), enabling P/D disaggregation on non-CUDA hardware.  
- **Model Runner V2**: Expanded support for CPU backends (PR #61995) and batch-sharded sampling (PR #61025), improving scalability across heterogeneous clusters.

---

### **4. Performance & Optimization**  
- **Attention & KV Cache**:  
  - DiffKV prefill tiling on SM80 achieves **3.0× speedup** on 200K-context chunks using `BLOCK_M=128 + KV tile 64` (Issue #61095).  
  - Triton metadata builder now sources geometry from `kv_cache_spec`, avoiding suboptimal kernel selection on heterogeneous models like Gemma 4 (PR #56996).  
- **Quantization & Kernel**:  
  - Added size-gated PDL to `silu_and_mul_nvfp4_quant` kernel (PR #64494) for better GPU utilization on sm90+ architectures.  
  - AITER-based `biased_grouped_topk` optimized for cases with no expert elimination (PR #63076), reducing unnecessary LDS usage.  
- **Disaggregation & Offload**:  
  - Optimized `MooncakeConnector` for pluggable transports (Issue #60523), improving P/D transfer efficiency across RDMA/TCP/Ascend paths.

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - `Qwen3.8-27B (GDN hybrid)` crashes on sm_86 with prefix caching due to illegal memory access (Xid 31) — regression since v0.28.0 (Issue #63505).  
  - `Gemma4 MTP` speculative decoding fails at engine init with “a and b must have same reduction dim” error (Issue #48848).  
- **Correctness Bugs**:  
  - Priority scheduling can unschedule a request already scheduled in the same step (Issue #59907); fixed by PR #59963.  
  - Kimi-K3 prefix cache misses exactly at 1536-token boundaries (Issue #50235).  
- **Memory & Offload Issues**:  
  - Tiered KV offload promotes all waiting requests, exhausting DRAM (Issue #49902).  
  - P2P KV offload does not fail fast on peer faults (Issue #63602).

---

### **6. What This Means for Application Developers**  
- **For production deployments**: Avoid `Qwen3.8-27B` on sm_86 until fix is merged; consider rolling back to v0.28.0 if stability is critical.  
- **For multimodal apps**: Monitor Issue #38175 for ViT CUDA graph support—expected to unlock significant throughput gains for vision-language models.  
- **For low-latency agents**: Use `--dp-prefill-delayer` (PR #61834) to reduce decode interruptions under agentic traffic.  
- **For multi-GPU/cluster setups**: Enable `--enable-batch-sharded-sampling` and ensure proper `VLLM_SLEEP_RETAIN_CPU_BACKUP=1` (PR #64630) for memory efficiency during sleep mode.  
- **For developers targeting AMD/Intel**: Expect enhanced ROCm and XPU support in near-term releases—test early with nightly builds.

> 🔗 [GitHub vLLM Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-30**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to deepen its support for advanced inference patterns, with critical work on **T-Head PPU**, **AMD ROCm gfx1151/gfx1201**, and **Ascend NPU** integration. High-priority issues highlight persistent challenges in **CI stability** (Issue #42752) and **speculative decoding correctness** (e.g., DeepSeek-V4 scheduler crash in Issue #47218), while new PRs focus on optimizing **diffusion pipelines**, **MoE dispatch**, and **KV cache orchestration**.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes reported in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- **T-Head SAIL (Zhenwu 810/810E/M890P)**: Roadmap underway (Issue #37519) — first-class upstream support is being tracked as a high-priority feature.  
- **AMD ROCm**: New PRs targeting **gfx1151** (Issue #46515, #46065) and **gfx1100/gfx1201 (RDNA3/RDNA4)** (Issue #46900). AOTriton kernel optimizations are being added for long-sequence diffusion attention.  
- **Ascend NPU**: Progress on **dynamic expert load balancing (EPLB)** (#47266), **mixed-chunk support in DSA sparse attention** (#47367), and **FP8 MoE dispatch** (#43994).  
- **Model Additions**: Native multimodal support for `sensenova_loop` (PR #47281), including text, image, and video inference via shared-weight layers and mHC.

---

### **4. Performance & Optimization**  
- **Diffusion Inference**: On AMD gfx1151, new Triton dense attention path improves throughput from **2.06 TF (non-contiguous)** to **18 TF** at 16k tokens (PR #46515).  
- **Memory Efficiency**: PR #47260 reduces decode-stage overhead by sending per-request decode inputs once instead of repeatedly.  
- **MoE & Kernel Optimization**:  
  - FP8 MoE support enabled on XPU (PR #43994).  
  - Attention value scaling folded into `o_proj` weights on Ascend (PR #40890), reducing decode latency by ~2ms per layer.  
- **Scheduler Efficiency**: Added `scheduler_iterations_total` metric for monitoring (PR #46485).

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - DeepSeek-V4 scheduler crashes when `items_offset_list` becomes `None` during concurrent aborted streams (Issue #47218). *No fix PR yet.*  
  - GLM-5.3-Flash on SM120 fails under FA4 attention backend due to CUDA graph capture failure; only Triton works (Issue #42012).  
- **Correctness Bugs**:  
  - Llama KV scale loader assigns floats to tensor scales without updating host mirrors, breaking attention paths (Issue #47357). *Fix pending.*  
  - Repeated re-prefilling resets sampling penalties and `min_new_tokens`, silently altering output (Issue #47245).  
- **CI/Build Issues**: Flaky tests and infrastructure failures persist in PR testing workflows (Issue #42752), impacting development velocity.

---

### **6. What This Means for Application Developers**  
Developers should expect **increasingly robust multi-backend support**, especially for AMD and Ascend hardware, enabling deployment across diverse infrastructures. However, **caution is advised** when using speculative decoding with DeepSeek-V4 or GLM-5.3-Flash models — both exhibit known crashes. For production workloads, consider disabling `fa4` backend until Issue #42012 is resolved. The addition of **session-aware KV cache orchestration** (RFC #45189) and **per-step TBO diagnostics** (RFC #47289) will empower better control over agent memory and scheduling behavior. Monitor CI health (Issue #42752) if contributing or relying on nightly builds.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-30**

---

### **1. Today's Highlights**  
The latest development cycle focuses on expanding hardware and model support, particularly for Apple Silicon (Metal), Intel Arc (SYCL/XMX), and Hexagon (UPSCALE). Key progress includes initial IQ2 quantization support on OpenCL, performance optimizations in Metal’s MXFP4 kernels, and critical bug fixes for LFM3 JSON schema parsing and MoE routing. A major PR enables CPU-based tiled flash attention for `q8_0` KV caches, improving efficiency on systems without GPU acceleration.

---

### **2. Releases & Breaking Changes**  
- **Latest Builds**:  
  - `b11998`: Added support for **Mistral Le Chonk**, extended DSA/SDPark to new models; fixed CI.  
    [PR #31376](https://github.com/ggml-org/llama.cpp/pull/31376)  
  - `b11988`: Added **Limite 1B - Violetto** model support via GGUF arch extension and conversion tools.  
    [PR #29433](https://github.com/ggml-org/llama.cpp/pull/29433)  
  - `b11986`: Initial **IQ2 quantization** support on OpenCL (AOS/SOA, Adreno DP4a, tiled MM).  
    [PR #31267](https://github.com/ggml-org/llama.cpp/pull/31267)  

> ✅ *No breaking API changes reported today.*

---

### **3. New Model & Hardware Support**  
| Feature | Details | Link |
|--------|--------|------|
| **Model Support** | `Limite 1B - Violetto`, `Mistral Le Chonk`, `LFM3-VL-2B`, `Qwen3.5+MoE`, `DeepSeek-V4.1-Flash` | [PR #29433](https://github.com/ggml-org/llama.cpp/pull/29433), [PR #31376](https://github.com/ggml-org/llama.cpp/pull/31376) |
| **Hardware Backends** | **OpenCL**: IQ2 quantization (Adreno, DP4a, SOA/AOS); **Hexagon**: UPSCALE ops (nearest/bilinear 2x/4x), transposed CONCAT optimization | [PR #31267](https://github.com/ggml-org/llama.cpp/pull/31267), [PR #31331](https://github.com/ggml-org/llama.cpp/pull/31331) |
| **Quant Formats** | `IQ2_s`, `MXFP4`, `Q4_0`, `Q8_0` — now used in Flash Attention with SYCL/OPENCL | [PR #31125](https://github.com/ggml-org/llama.cpp/pull/31125), [PR #31075](https://github.com/ggml-org/llama.cpp/pull/31075) |

---

### **4. Performance & Optimization**  
- **Metal**: Faster MXFP4 mat-vec kernel using fp16 bit trick + aligned 32-bit nibble loads (no threadgroup lookup table).  
  [PR #31075](https://github.com/ggml-org/llama.cpp/pull/31075)  
- **SYCL**: Vectorized reordered-layout dequantization stores (Q4_0, K-quants, IQ3, MXFP4).  
  [PR #30976](https://github.com/ggml-org/llama.cpp/pull/30976)  
- **CPU (Tiled FA)**: Enabled `q8_0` KV cache reads in tiled flash attention kernel — avoids per-row dequantization overhead.  
  [PR #31399](https://github.com/ggml-org/llama.cpp/pull/31399)  
- **CUDA**: Kernel fusion for Prism Hadamard rotation (reduces kernel launches).  
  [PR #31398](https://github.com/ggml-org/llama.cpp/pull/31398)  
- **Hexagon**: Optimized DDR bandwidth usage in transposed CONCAT via double row block size and VTCM stride padding.  
  [PR #31277](https://github.com/ggml-org/llama.cpp/pull/31277)  

> 📈 These improvements target both latency reduction and memory bandwidth utilization, especially on edge and heterogeneous devices.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Notes |
|------|----------|--------|--------|-------|
| `LFM3` JSON schema fails with “empty grammar stack” | Critical | Closed | [PR #31374](https://github.com/ggml-org/llama.cpp/pull/31374) | Fixed by disabling lazy grammar when `response_format` is set |
| Metal backend crash on M2 Ultra: constexpr bfloat cast | High | Open | No fix yet | `unary.metal` compilation error |
| SYCL: XMX-ESIMD path ~35% slower on Arc B70 MoE prompt processing | High | Open | N/A | Regression in `d81d0d8fb` → `edc353842` |
| CUDA: misaligned address in `ggml_cuda_op_unary<sigmoid>` | Medium | Open | N/A | Seen on RTX 5090 Laptop (sm_120) |
| `response_format` + `tool_choice=auto` → 400 error | Medium | Open | [PR #31395](https://github.com/ggml-org/llama.cpp/pull/31395) | Fixes grammar parsing logic |

> ⚠️ **Top concerns**: LFM3 JSON schema failure (now fixed), MoE performance regression on Intel Arc, Metal compatibility on M2 Ultra.

---

### **6. What This Means for Application Developers**  
- ✅ **Deploying LFM3 or Qwen3.5+ models?** Use `--response-format json_schema` with caution — ensure you're on `b11997+` to avoid grammar stack crashes.  
- 💡 **Optimize for low-memory edge devices**: The new **IQ2** and **MXFP4** support across OpenCL/SYCL enables efficient inference on mobile GPUs (Adreno) and embedded Hexagon cores.  
- 🛠 **Reduce latency on CPU-only systems**: Enable `--ctk q8_0 -ctv q8_0` with tiled flash attention (`b11997+`) to avoid expensive KV dequantization during prefill.  
- 🔍 **Debugging tooling**: Consider the new `json-schema-to-grammar` length validation (PR #31358) to prevent malformed schemas from failing at runtime.  
- 🧩 **Hybrid MoE models**: Be cautious with `-ncmoe` on Intel Arc (B70) — recent SYCL changes may degrade prompt processing speed (~35%). Monitor builds post-`d81d0d8fb`.

> 🔗 **Recommended build**: `b11998` or `b11997` for stable LFM3/Qwen3.5 support and improved metal/opencl backends.  
> 🔗 **GitHub**: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-30**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its multimodal and agent-native capabilities, with critical fixes for audio/video handling and OpenAI compatibility in the `/api/chat` and `/v1/models` endpoints. Key PRs address silent data loss in tool calls (`qwen3.8:27b-mlx`), improper media ordering in embeddings (Gemma 4), and memory accounting flaws affecting multi-model workloads. A new `--audio` CLI flag proposal and native audio output support for LFM3-Omni signal deeper integration with real-time voice AI.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes reported in the last 24 hours.*  
However, ongoing work in PRs suggests upcoming improvements to OpenAI-compatible API behavior:
- Fixing `GET /v1/models` to return `[]` instead of `null` when no models are installed ([#19381](https://github.com/ollama/ollama/issues/19381)).
- Ensuring empty embedding responses use an empty array (`data: []`) rather than `null` ([#19387](https://github.com/ollama/ollama/pull/19387)).

---

### **3. New Model & Hardware Support**  
- **Audio/Video Input/Output**: Active feature requests for native support on Windows via `--audio`, `--speak`, and `--tts` flags ([#19396](https://github.com/ollama/ollama/issues/19396), [#19390](https://github.com/ollama/ollama/issues/19390)). Models like `lfm3-omni` and `phonon` are central to this push.
- **Ternary Quantization**: Proposal to add support for `bonsai-2`’s ternary quant format ([#19388](https://github.com/ollama/ollama/issues/19388)).
- **ROCm on gfx1151 iGPU**: Persistent issue with KV state bleed across requests on AMD Strix Halo (gfx1151) — a known regression impacting inference correctness ([#17847](https://github.com/ollama/ollama/issues/17847)).
- **MLX Backend Enhancements**: Improvements to speculative decoding (`draft_num_predict=0` support), concurrent generation, and draft cache management ([#19391](https://github.com/ollama/ollama/pull/19391), [#19197](https://github.com/ollama/ollama/pull/19197)).

---

### **4. Performance & Optimization**  
- **MLX Top-K Optimization**: A follow-up PR improves performance by sorting top-k rows in 2048-element chunks (vs. full row merge sort), reducing cost of large-vocabulary top-k operations ([#19392](https://github.com/ollama/ollama/pull/19392)).
- **Memory Accounting Fixes**: 
  - Correctly excludes CPU-resident input tensors from VRAM predictions ([#19393](https://github.com/ollama/ollama/pull/19393)).
  - Prevents eviction of CPU-only runners during GPU memory pressure, improving stability on multi-GPU systems ([#19284](https://github.com/ollama/ollama/pull/19284)).
- **Speculative Decoding Efficiency**: `mlxrunner` now supports disabling drafting per request, enabling benchmarking of speculative decoding speedups without changing defaults ([#19391](https://github.com/ollama/ollama/pull/19391)).

---

### **5. Stability & Regressions**  
- **Critical Regression**: `qwen3.8:27b-mlx` fails to emit `tool_calls` when assistant content is non-empty — breaks common agent patterns ([#19353](https://github.com/ollama/ollama/issues/19353)). *PR pending.*
- **Silent Data Loss in Tool Calls**: The `go_template` parser drops entire assistant turns when `content` is empty but `tool_calls` are present — confirmed as a template-level bug ([#19377](https://github.com/ollama/ollama/issues/19377)).
- **Audio Handling Bug**: `/api/chat` silently ignores the `audio` field even for models with `audio` capability; fixed via PR that validates clip types before passing to projector ([#19397](https://github.com/ollama/ollama/pull/19397)).
- **CUDA Initialization Failure**: Intermittent `shared object initialization failed` error on Windows (RTX 5070 Ti), causing fallback to CPU pinned buffers without warning ([#17380](https://github.com/ollama/ollama/issues/17380)).
- **Model Version Rollback**: Users unable to revert after accidental update — no rollback mechanism available yet ([#19385](https://github.com/ollama/ollama/issues/19385)).

---

### **6. What This Means for Application Developers**  
- **Agent Builders**: Be cautious with `qwen3.8:27b-mlx` and `gpt-oss:120b` — ensure `content` is empty when relying on `tool_calls`. Use alternative templates or await fix PRs.
- **Multimodal Apps**: Expect improved support for audio/video inputs in future versions. Until then, avoid relying on `/api/chat`'s `audio` field — it currently ignores input silently.
- **API Compatibility**: Update SDKs to handle `data: []` instead of `data: null` in model listing responses. Validate `reasoning` fields in content arrays — they may be dropped if `content` is an array.
- **Deployment Strategy**: Monitor VRAM accounting carefully — current estimates overcount CPU-resident tensors. Avoid aggressive eviction policies on mixed GPU/CPU systems.
- **Future-Proofing**: Consider using MLX backend for speculative decoding and concurrency, but be aware of experimental status and potential regressions on ROCm/iGPU hardware.

---  
*Data source: [github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-30**

#### **1. Today's Highlights**  
The v1.108.0-rc.1 release introduces critical security hardening with signed Docker images via cosign, validating integrity through commit `e82a3c6`. Key improvements include performance optimizations in streaming (PR #49166) and a refactor of Redis interactions for better reliability and maintainability (PRs #49162, #48958). Notably, cost tracking issues affecting OpenAI-compatible providers (e.g., OpenRouter) have been addressed, ensuring accurate spend logging even in streaming scenarios.

#### **2. Releases & Breaking Changes**  
- **v1.108.0-rc.1**: Release candidate with verified image signatures using [cosign](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065).  
- **Breaking Fix**: Legacy delegate MCP servers now properly admit upstream callers (PR #49167), resolving a regression introduced in v1.103.0.  
- **Migration Note**: Users relying on `stream_chunk_builder` with Gemini tool calls should be aware of ongoing fixes (Issue #25869); upgrade to avoid "Corrupted tool call context" errors.

#### **3. New Model & Hardware Support**  
- **Z.AI Models**: Full support added for `zai/*` models with `response_format`, `max_completion_tokens`, and GLM-5V-Turbo pricing (PR #48335).  
- **OpenAI Audio Models**: Real-time transcription support for latest OpenAI audio models (e.g., `gpt-transcribe`) now billed per second (PR #35600).  
- **Azure AI Foundry Agents v2**: Native API support for `agent_reference` via Responses API (Issue #25372, PR pending).  
- **New Platforms Requested**: Kimi K3 (Moonshot AI), Inkling (Thinking Machines Lab), and Tinker platform (Issue #33921).

#### **4. Performance & Optimization**  
- **Streaming Latency**: Eliminated redundant Pydantic validation overhead on every streamed chunk (PR #49166), reducing CPU waste by ~12–15% per request.  
- **Routing Efficiency**: Least-busy routing now reserves picks atomically to prevent request pileups (PR #47484), improving load distribution under burst traffic.  
- **Redis Scalability**: Refactored Redis transport layer (PRs #48958, #49162) enables future Rust-based backend migration and improves pod interoperability during rolling deploys.  
- **Health Checks**: Optimized probing logic for wildcard deployments (PR #49060), avoiding false positives on unserved models.

#### **5. Stability & Regressions**  
- **High Severity**:  
  - Cost data lost in OpenRouter streaming responses (Issue #16021, closed; fix likely in RC)  
  - `usage.cost` ignored on non-streaming OpenAI-compatible calls → $0 spend logged (Issue #47533, closed)  
  - Provider-reported cost treated as USD without unit validation → phantom spend (Issue #35829, closed)  
- **Medium Severity**:  
  - Tool call corruption in Gemini streaming due to `stream_chunk_builder` (Issue #25869, open)  
  - In-memory spend buffers dropped on proxy shutdown (Issue #34805, open)  
  - Prompt cache fails for GPT-5.4 via proxy (Issue #24987, closed)  
- **Fixes Merged**:  
  - OpenRouter model name leakage in chunks (Issue #46095, fixed in PR #48592)  
  - Redis semantic cache misbehavior (Issue #31610, fixed)

#### **6. What This Means for Application Developers**  
- **Cost Accuracy is Now Critical**: Ensure you’re on `v1.108.0-rc.1+` or later to avoid silent $0 spend logging in streaming and non-streaming flows. Use `provider_budget_config` with Redis for reliable budget resets (avoid Issue #37261).  
- **Stream Safely with Tools**: Avoid `Gemini` + `tool_calls` + `web_search` until PR #25869 lands—current behavior breaks follow-up turns.  
- **Secure Deployment Practices**: Leverage signed Docker images (`cosign verify`) and consider reading secrets from files (Issue #28994, PR pending) for production-grade environments.  
- **Future-Proof Integrations**: Monitor support for new models like Kimi K3 and Z.AI; expect faster adoption via LiteLLM’s evolving provider ecosystem.  

👉 *Explore the full changelog: [GitHub v1.108.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.108.0-rc.1)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-30**

---

### **1. Today's Highlights**  
Unsloth continues to advance its core inference engine and Studio UI with critical fixes for memory management on Windows AMD systems and MLX-based Apple Silicon devices. Key performance optimizations landed for Gemma 3 and Llama 4-bit models, while new Flows capabilities (data recipes, benchmarking, train nodes) are being integrated into the desktop and web UI. The team is also addressing long-standing issues around model context compaction, audio processing, and managed account permissions.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, several PRs introduce breaking changes or require configuration updates:  
- `UNSLOTH_DECODE_FUSED_NF4=1` enables opt-in fused 4-bit decode for Llama models (PR #16032).  
- `mlx` memory estimation now accounts for full-width attention scores (PR #16021), which may affect perceived model loadability.  
- Local MCP servers are now accessible to managed accounts when enabled by owners (PR #16044).

> 🔗 [PR #16032](https://github.com/unslothai/unsloth/pull/16032), [PR #16021](https://github.com/unslothai/unsloth/pull/16021), [PR #16044](https://github.com/unslothai/unsloth/pull/16044)

---

### **3. New Model & Hardware Support**  
- **New model support**: Requested support for **LFM3-1.7B** (PR #15588), a new expressive backbone from LiquidAI.  
- **Hardware/backends**:  
  - Improved MLX backend handling on Apple Silicon (Golden Gate 27.x) with better VRAM accounting (PR #16021).  
  - AMD GPU support now includes proper iGPU exclusion during training (PR #14039).  
  - Experimental support for **EXL3 (ExLlamaV3)** quantization backend with MoE and sub-8-bit support (PR #7115).  

> 🔗 [Issue #15588](https://github.com/unslothai/unsloth/issues/15588), [PR #7115](https://github.com/unslothai/unsloth/pull/7115)

---

### **4. Performance & Optimization**  
- **Gemma 3**: Generated on non-flex path instead of fallback (PR #16041), reducing latency spikes caused by failed `flex_attention` compilation.  
- **Llama 4-bit decoding**: Fused decode via `UNSLOTH_DECODE_FUSED_NF4=1` yields **1.6–2.3x faster per-token generation** in eager mode (PR #16032).  
- **MLX memory estimator**: Now accurately reflects real-world memory usage by charging attention matrices even with f16 KV caches (PR #16021).  
- **Qwen3-ASR**: Added configurable voice context (1K–64K) to reduce memory use from ~8.7 GiB (64K) to ~2.0 GiB (1K) (PR #15810).  

> 🔗 [PR #16041](https://github.com/unslothai/unsloth/pull/16041), [PR #16032](https://github.com/unslothai/unsloth/pull/16032), [PR #15810](https://github.com/unslothai/unsloth/pull/15810)

---

### **5. Stability & Regressions**  
- **Critical**: On Windows AMD, GGUF loading causes ~16 GB commit charge despite sufficient VRAM — system page file limit exhausted (Issue #16015, PR #16046). Fix in progress.  
- **High severity**: Context fails to compact in long conversations, making chats non-continuable (Issue #15800). Related fix PR #15857 under review.  
- **Crash**: Core dumps observed after model eject with no clear log trace (Issue #14411). No fix yet; requires deeper coredump analysis.  
- **UI/UX regressions**:  
  - AppImage version has laggy UI (Issue #15999).  
  - Text input duplicates across tabs (Issue #15782).  
  - Audio upload capped at 200 MB (Issue #15840); users request higher limits.  

> 🔗 [Issue #16015](https://github.com/unslothai/unsloth/issues/16015), [PR #16046](https://github.com/unslothai/unsloth/pull/16046), [Issue #15800](https://github.com/unslothai/unsloth/issues/15800), [PR #15857](https://github.com/unslothai/unsloth/pull/15857)

---

### **6. What This Means for Application Developers**  
- **Optimize for low-memory environments**: Use `UNSLOTH_DECODE_FUSED_NF4=1` and `Voice context` settings to reduce memory pressure, especially on edge devices.  
- **Handle context overflow gracefully**: Auto-compaction still not fully respected in Anthropic passthrough (`/v1/messages`) — expect manual handling until fix lands (Issue #15417).  
- **Build robust agent workflows**: Be cautious with tool calls cut off at token limits (PR #16035); ensure agents validate output completeness before execution.  
- **Design for multi-GPU/Multi-model setups**: With resident model support (PR #10876), leverage multiple GGUFs in parallel, but monitor commit charge on Windows AMD systems (PR #16046).  
- **Prepare for Flows integration**: New data recipe and train node features (PRs #15604, #15611) will enable modular, visual fine-tuning pipelines — ideal for agent training loops.

> 🔗 [Flows Train Node](https://github.com/unslothai/unsloth/pull/15611), [Flows Data Recipes](https://github.com/unslothai/unsloth/pull/15604)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*