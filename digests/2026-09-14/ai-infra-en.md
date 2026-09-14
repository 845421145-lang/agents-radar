# AI Infrastructure Digest 2026-09-14

> Generated: 2026-09-14 08:46 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-14**

---

### **1. Ecosystem Overview**  
The AI infrastructure landscape in mid-2026 is defined by a sharp bifurcation between **high-performance inference engines** and **production-ready agent platforms**, with growing convergence at the edge of multi-model, multi-hardware, and secure execution. vLLM, SGLang, and llama.cpp lead in kernel-level optimization and low-latency serving, while Ollama, LiteLLM, and Unsloth are maturing as integrated stacks for application deployment—particularly agents. Critical stability issues across all projects highlight that performance gains are being pursued alongside robustness, especially under high concurrency, long context, and distributed setups.

---

### **2. Activity Comparison**

| Project       | Open Issues (High/Critical) | PRs Merged (Last 24h) | Releases (Last 24h) | Key Stability Risk |
|---------------|-----------------------------|------------------------|---------------------|--------------------|
| **vLLM**      | 5 (2 High)                  | 8                      | None                | Engine startup hangs, async TP batch invariance |
| **SGLang**    | 7 (3 Critical/Severe)       | 6                      | None                | CUDA crashes, HiCache unrecoverable state |
| **llama.cpp** | 6 (3 High)                  | 7                      | 4 (b10952–b10946)   | Vulkan/SYCL backend regressions |
| **Ollama**    | 5 (2 Critical)              | 5                      | None                | Image processing crashes, prompt cache instability |
| **LiteLLM**   | 4 (2 Critical)              | 5                      | None                | Logging pollution, streaming state loss |
| **Unsloth**   | 6 (2 High)                  | 6                      | None                | Sandbox escape, ARM64 installer failure |

> 🔍 *Note:* Despite no new releases, **llama.cpp** leads in patch velocity with 4 hotfixes; **SGLang** shows highest severity concentration.

---

### **3. Model Support Race**  
The race for model and architecture support is now hyper-specialized:

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash** (SWA replay) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash** (ROCm, FlashKDA) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Qwen MoE Shared Experts** (ROCm tiny-dot) | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Nemotron VL (LoRA)** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Gemma-3 (AMD/NPU)** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **HunyuanOCR (DFlash)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Bourse (OpenAI-compatible)** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **XingChen4 (GGUF)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |

> 🏆 **Winner**: **SGLang** edges ahead with broad support for cutting-edge models like GLM-5.3-Flash on ROCm and Gemma-3 on AMD/NPU, signaling strong backend adaptability. **vLLM** leads in sliding-window efficiency and hybrid GDN optimizations critical for large-context agents.

---

### **4. Performance Frontier**  
Optimization efforts are concentrated in distinct domains:

| Focus Area               | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Speculative Decoding** | 🔥 SWA bounded replay, hybrid GDN fix | ⚠️ DFlash slowdown, HiCache reliability | ❌ | ❌ | ❌ | ❌ |
| **Kernel-Level Acceleration** | 🔥 FlashKDA, Tiny-dot (ROCm) | 🔥 Attention fusion, block pointer migration | 🔥 cuBLAS, sparse FA, Vulkan modularity | ❌ | ❌ | 🔥 AOTriton ROCm attention |
| **Batching & Memory Efficiency** | 🔥 Prefill chunking, shared-read completion | 🔥 MQA logits per row | 🔥 `argsort` memory bounds | ❌ | ❌ | ❌ |
| **Distributed Serving & Scale-Out** | 🔥 `--enable-scale-out`, NIXL descriptor tuning | 🔥 PD disaggregation, HiCache scalability | ❌ | ❌ | ❌ | ❌ |
| **Quantization & Offloading** | ❌ | ❌ | 🔥 Sparse FA, GGUF conversion | ❌ | ❌ | 🔥 VRAM leakage fix pending |

> 📌 **Trend**: **vLLM and SGLang** dominate in speculative decoding and distributed KV cache scaling—critical for agentic workloads. **llama.cpp** excels in cross-platform kernel optimization (especially ROCm and Vulkan), while **Unsloth** focuses on runtime efficiency and GPU-specific kernel enablement.

---

### **5. Layer Positioning**  
Each project occupies a distinct layer in the AI stack:

| Project     | Primary Layer                     | Role Summary |
|-------------|-----------------------------------|--------------|
| **vLLM**    | **Inference Engine**              | Low-latency, scalable tensor engine with advanced spec decoding and KV cache optimizations. Targets HPC and cloud-scale deployments. |
| **SGLang**  | **Agentic Inference Framework**   | Production-grade agent runtime with distributed KV caching, MoE routing, and speculative decoding—built atop optimized backends. |
| **llama.cpp** | **Local Runtime / Edge Inference** | Cross-platform, CPU/GPU-accelerated inference with minimal dependencies. Ideal for embedded, mobile, and local agent use. |
| **Ollama**  | **Developer-Facing LLM Gateway**  | Unified CLI/toolchain for local model management and tool calling. Bridges local inference with agent workflows. |
| **LiteLLM** | **LLM Gateway / Proxy Layer**     | Multi-provider abstraction layer with cost accounting, guardrails, and streaming consistency. Enables production API gateways. |
| **Unsloth** | **Fine-Tuning + Agent Runtime**   | Full-stack training/fine-tuning framework with sandboxed tool execution and emerging agent ecosystem features. |

> 💡 **Insight**: The ecosystem is no longer monolithic—developers must choose based on whether they prioritize **performance (vLLM/SGLang)**, **local portability (llama.cpp)**, **developer experience (Ollama)**, **multi-tenant proxy (LiteLLM)**, or **end-to-end agent pipelines (Unsloth)**.

---

### **6. Trend Signals**  
Key industry trends emerging from today’s activity:

1. **Speculative Decoding Is Now Production-Critical**  
   - vLLM and SGLang are racing to stabilize DFlash and hybrid GDN speculation—yet both report severe regressions. This signals that **speculative decoding is moving from R&D to core infrastructure**, demanding rigorous testing and fallback strategies.

2. **ROCm Is No Longer an Afterthought**  
   - Multiple projects (vLLM, SGLang, llama.cpp, Unsloth) have prioritized ROCm support—including full attention kernel enablement, MoE optimizations, and new Docker images. **AMD GPUs are now viable for mainstream inference workloads**.

3. **Agent Reliability > Raw Speed**  
   - Streaming state loss, prompt cache corruption, and sandbox escapes are top concerns. Developers must now treat **agent memory continuity and security** as first-class requirements—not afterthoughts.

4. **Multi-Model, Multi-Hardware Abstraction Is Maturing**  
   - Projects like LiteLLM (Bourse provider), SGLang (HiCache), and Unsloth (MCP hubs) are building extensible ecosystems. The future lies in **pluggable, composable inference layers** rather than monolithic stacks.

5. **Security & Isolation Are Non-Negotiable**  
   - Sandboxing (Unsloth), pointer arithmetic hardening (vLLM), and guardrail enforcement (LiteLLM) indicate that **security-by-default is becoming standard** in production-grade infra.

---

### ✅ **Recommendations for Application Developers**
- **For agents with long context**: Use **vLLM v0.29+** with SWA bounded replay enabled; avoid DFlash speculation on hybrid GDN models.
- **For multi-GPU/cloud deployment**: Prioritize **SGLang** for distributed KV cache scalability and **LiteLLM** for cost-aware routing.
- **For edge/local inference**: Choose **llama.cpp** (ROCm/Vulkan) or **Unsloth** (AMD/Intel ARC).
- **For rapid prototyping**: **Ollama** remains best-in-class—but avoid `kimi-k3:cloud` and `gemma4` with image inputs until fixes land.
- **Always pin versions** and monitor breaking changes (e.g., `max_length` in Unsloth, `VLLM_USE_PRECOMPILED=1`).

> 🔗 *Stay informed via issue trackers and PRs—stability is still a major hurdle despite performance leaps.*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-14**

---

### **1. Today’s Highlights**  
The vLLM project continues to advance speculative decoding and multi-model support, with key PRs enabling DeepSeek-V4.1’s sliding-window (SWA) bounded replay on both encoder and decoder sides—critical for efficient long-context inference. New work on FlashKDA acceleration for GLM-5.3-Flash and a fix for hybrid GDN prefix-cache hits under MTP spec decoding address high-impact performance bottlenecks. Meanwhile, stability remains a focus, with active efforts to resolve hangs in engine startup and streaming-input session lifecycle issues.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were introduced. The v0.29.0 release cycle remains stable, though several PRs (e.g., #55176) are refining CLI flags and environment variable behavior—developers should monitor upcoming changes to `--enable-scale-out` and `VLLM_ENABLE_SCALE_OUT_ENDPOINTS`.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash**: Full support added via #56227 (encoder-side SWA replay) and #56752 (decoder-side), enabling efficient KV cache reuse without storing redundant sliding windows.  
- ✅ **Nemotron VL (language model only)**: LoRA support now available via #56231—enables fine-tuning of the language component while vision/audio remain experimental.  
- ✅ **GLM-5.3-Flash**: Performance improvements via FlashKDA backend (#55737), reducing KDA chunked prefill latency by **1.7–3.8×** vs. Triton path.  
- ✅ **ROCm**: FLy entropy-gated deferred verification for speculative decoding (#53987) and tiny-dot kernel optimization for Qwen MoE shared experts (#56789) enhance AMD GPU efficiency.

---

### **4. Performance & Optimization**  
- 🔥 **FlashKDA for GLM-5.3-Flash**: Replaces ~15-kernel Triton path with FlashKDA, delivering **1.7–3.8× faster** KDA chunked prefill (#55737).  
- 🚀 **DeepSeek-V4.1 SWA Bounded Replay**: Eliminates unnecessary KV storage of sliding windows; improves memory efficiency and reduces overhead in long-context scenarios (#56227, #56752).  
- ⚙️ **Qwen MoE Shared-Expert Gate**: Tiny-dot kernel optimization via HIPBLASLt reduces decode latency on ROCm systems (#56789).  
- 📈 **Hybrid GDN Prefix Cache Fix**: Restores hit rate in MTP speculative decoding for Qwen3.5-122B-A10B (#52244)—critical for reducing redundant computation at scale.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | PR/Link |
|--------|------|--------|---------|
| 🔴 High | vLLM hangs indefinitely during engine startup (`#17676`) | Open | [Issue #17676](https://github.com/vllm-project/vllm/issues/17676) |
| 🔴 High | Batch invariance broken under sequence parallelism + async TP (`#56370`) | Open | [Issue #56370](https://github.com/vllm-project/vllm/issues/56370) |
| 🟡 Medium | DFlash spec decoding becomes net slowdown at 185k context on hybrid GDN models (`#54691`) | Open | [Issue #54691](https://github.com/vllm-project/vllm/issues/54691) |
| 🟡 Medium | GLM-5.3-Flash degenerates into “word salad” in agentic use (`#56605`) | Open | [Issue #56605](https://github.com/vllm-project/vllm/issues/56605) |
| 🟢 Low | OTLP traces not sent due to missing tracer invocation (`#56696`) | Open | [Issue #56696](https://github.com/vllm-project/vllm/issues/56696) |

> Note: No PRs currently target the top two high-severity issues. Developers using async TP or long-context agents should test carefully.

---

### **6. What This Means for Application Developers**  
- **For agents with long-context workflows**: Avoid DFlash speculation on hybrid GDN models (>100k tokens); consider disabling it or upgrading to v0.29+ with the pending fixes.  
- **For LLM serving stacks**: Enable SWA bounded replay for DeepSeek-V4.1 to reduce memory footprint and improve scalability.  
- **For developers using RoCE/RDMA clusters**: Monitor NIXL descriptor overhead in GLM-5.3 P/D disaggregation (#55434) — may require tuning or fallback to RDMA.  
- **For security-sensitive deployments**: Watch for the ongoing patch to widen pointer arithmetic to int64 (#53131), which prevents potential cross-user data leaks under high token loads.  
- **For fine-tuning pipelines**: LoRA is now supported on Nemotron VL (language part), and you can expect better compatibility with DeepSeek-V4.1 and Qwen3.5 variants soon.

👉 *Recommendation: Pin to v0.29.0 or later, and review `VLLM_USE_PRECOMPILED=1` for consistent performance across builds.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-14

---

### **1. Today's Highlights**  
SGLang continues its aggressive push toward production-grade agentic inference with critical work on distributed KV cache scalability and DeepSeek-V4 performance optimization. The most urgent focus remains resolving CUDA-level crashes in high-throughput scenarios (e.g., Qwen3.8-Flash-Next-FP8, GLM-5.x NoPE MLA), while foundational improvements to HiCache reliability and MoE routing are progressing across multiple backends.

---

### **2. Releases & Breaking Changes**  
*No new releases published in the last 24 hours.*  
However, several breaking changes are under review:
- **PR #37958**: Enabling `prefill shared-read completion` by default for better memory efficiency in multi-token prefill batches.
- **PR #39391**: Introduces tolerant draft config parsing during speculative decoding — previously a failed load would crash the entire engine.
- **PR #39381**: Deprecates Triton block pointers due to upstream removal in `main` branch; requires downstream adaptation for AMD/ROCm support.

> 🔗 [PR #37958](https://github.com/sgl-project/sglang/pull/37958) | [PR #39391](https://github.com/sgl-project/sglang/pull/39391) | [PR #39381](https://github.com/sgl-project/sglang/pull/39381)

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4 (DSV4)**: Full support for R3 capture and MXFP4 online updates via **PR #39392**, enabling dynamic model adaptation during serving.
- ✅ **GLM-5.3-Flash (ROCm)**: Zero-RoPE MHA prefill now enabled on AMD via **PR #39338**, addressing `qk_rope_head_dim == 0` models that previously failed.
- ✅ **NVIDIA Nemotron-3 Ultra (SM100)**: Performance tracking initiated (**Issue #27286**) for ultra-large-scale reasoning workloads.
- ✅ **Gemma-3 (AMD/NPU)**: Fixed token-major tensor layout mismatch in RadixAttention (**PR #37984**) for proper MoE routing.
- 🚧 **Llama4 NVFP4 (SM120)**: Support added for router input weights (`apply_router_weight_on_input=True`) via **PR #35504**.

> 🔗 [PR #39392](https://github.com/sgl-project/sglang/pull/39392) | [PR #39338](https://github.com/sgl-project/sglang/pull/39338) | [PR #37984](https://github.com/sgl-project/sglang/pull/37984) | [PR #35504](https://github.com/sgl-project/sglang/pull/35504)

---

### **4. Performance & Optimization**  
- **DeepSeek-V4**: PRs targeting attention fusion (TRT-LLM DSv4 attention), FlashInfer MN-based kernels, and MXFP8/W4A8 path optimizations are active (**Issue #33636**).
- **Prefill Throughput**: Chunking indexer MQA logits per query row under free-memory budget (**PR #39095**) improves stability in long-context scenarios.
- **MoE Efficiency**: Deferred finalize now accessible for routed MoE models via **PR #39299**, removing a hard-coded limitation.
- **Kernel-Level**: AMD backend moving from block pointers to explicit offsets/masks (**PR #39381**) ensures future compatibility with Triton v2.0+.

> 🔗 [PR #39095](https://github.com/sgl-project/sglang/pull/39095) | [PR #39299](https://github.com/sgl-project/sglang/pull/39299) | [PR #39381](https://github.com/sgl-project/sglang/pull/39381)

---

### **5. Stability & Regressions**  
Top severity issues reported today:

| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#26340](https://github.com/sgl-project/sglang/issues/26340) | ⚠️ Critical | Auto-collected CUDA coredumps from CI; widespread instability observed across runs | Ongoing investigation |
| [#37633](https://github.com/sgl-project/sglang/issues/37633) | ❌ Severe | Hard crash in QSA extend forward at ~22 concurrent requests (H20 TP8, FP8) | No fix yet |
| [#39147](https://github.com/sgl-project/sglang/issues/39147) | ⚠️ High | HiCacheFile reports unrecoverable hybrid prefix when auxiliary pool fails to restore | In progress |
| [#39072](https://github.com/sgl-project/sglang/issues/39072) | ⚠️ High | GLM-5.3 crashes under disagg decode + dp-attention + spec decode | Under triage |
| [#39302](https://github.com/sgl-project/sglang/issues/39302) | ⚠️ High | GLM-5.x NoPE MLA fails on SM120 — all DSA sparse-MLA backends unavailable | Blocked pending backend patch |

> 🔗 [Issue #26340](https://github.com/sgl-project/sglang/issues/26340) | [Issue #37633](https://github.com/sgl-project/sglang/issues/37633) | [Issue #39147](https://github.com/sgl-project/sglang/issues/39147)

---

### **6. What This Means for Application Developers**  
- **Agentic Workloads**: Prioritize upgrading to latest `main` if using PD disaggregation or HiCache — recent fixes address critical bottlenecks in KV cache scalability (**Issue #21846**).
- **High-Concurrency Serving**: Avoid `--disable-overlap-schedule` and `CUDA_LAUNCH_BLOCKING=1` in production; these mask underlying GPU scheduling bugs (see **Issue #37633**).
- **Model Choice**: Be cautious with `Qwen3.8-Flash-Next-FP8` and `GLM-5.x NoPE MLA` on SM120/H20 until patches land — both exhibit fatal crashes under load.
- **Speculative Decoding**: Use `--speculative-decoding` cautiously; malformed draft configs can now cause engine-wide failures unless you apply **PR #39391**.
- **CI Health**: Expect flaky tests (27 flaky, 2 broken as of 2026-09-14); use **Issue #17050** for real-time tracking.

> 🔗 [Issue #21846](https://github.com/sgl-project/sglang/issues/21846) | [Issue #17050](https://github.com/sgl-project/sglang/issues/17050)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-14**

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes for SYCL and Vulkan backends, particularly around oneDNN scratchpad management and Flash Attention fallback behavior. Notable performance improvements are underway for CUDA (Volta+), with new cuBLAS paths and sparse FlashAttention support. A key macOS arm64 heap corruption issue has been identified and patched in `ggml-cpu`.

---

### **2. Releases & Breaking Changes**  
- **`b10952`**: Fixed oneDNN scratchpad pool order violation in SYCL backend — prevents crashes during prompt processing. [PR #28704](https://github.com/ggml-org/llama.cpp/pull/28704)  
- **`b10951`**: Refactored `llama_n_rs_seq` call to avoid unnecessary state setting; improves code clarity and execution flow. [PR #28749](https://github.com/ggml-org/llama.cpp/pull/28749)  
- **`b10948`**: Excluded `HY_V4` from WebGPU test suite due to compatibility issues. [PR #28855](https://github.com/ggml-org/llama.cpp/pull/28855)  
- **`b10946`**: Guarded VXE-only repack helpers on s390x to prevent undefined behavior. [PR #28775](https://github.com/ggml-org/llama.cpp/pull/28775)  

> ✅ *No breaking API changes reported today.*

---

### **3. New Model & Hardware Support**  
- **HunyuanOCR**: Added DFlash speculative decoding support via PR #28890. Enables faster draft inference for multimodal OCR models.  
- **XingChen4**: Initial GGUF conversion support added for TeleAI’s domestic LLM (China Telecom AI). [PR #28156](https://github.com/ggml-org/llama.cpp/pull/28156)  
- **ROCm 10.0.0**: Updated Docker base image and GPU support list. Now includes newer AMD architectures like gfx1201 (R9700). [PR #27145](https://github.com/ggml-org/llama.cpp/pull/27145)  
- **Hexagon**: Restored contiguous fast-path and HVX copy optimizations for improved edge inference performance. [PR #28886](https://github.com/ggml-org/llama.cpp/pull/28886)

---

### **4. Performance & Optimization**  
- **CUDA (Volta)**:  
  - Added cuBLAS path for `GGML_OP_LIGHTNING_INDEXER` (DeepSeek-V4), targeting ~10–15% throughput gain on V100. [PR #28888](https://github.com/ggml-org/llama.cpp/pull/28888)  
  - Enabled sparse FlashAttention on Volta GPUs via `n_kv_max` path — avoids full KV cache attention. [PR #28887](https://github.com/ggml-org/llama.cpp/pull/28887)  
- **CUDA (RTX 5090 Laptop)**: Reduced `argsort` chunk size to bound top-k scratch memory usage. Prevents OOM on long prompts. [PR #28889](https://github.com/ggml-org/llama.cpp/pull/28889)  
- **Vulkan**: Splitting `ggml-vulkan.cpp` into modular files to improve compile time and maintainability. [PR #28732](https://github.com/ggml-org/llama.cpp/pull/28732)  
- **CPU (macOS arm64)**: Disabled precompiled headers (`PCH`) to resolve heap corruption in `ggml-cpu`. [PR #28882](https://github.com/ggml-org/llama.cpp/pull/28882)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix/Workaround |
|---------|------|--------|----------------|
| Critical | SYCL crash: oneDNN scratchpad breaks LIFO pool order | Open (#28660) | ✅ Patch merged in `#28704` |
| High | Vulkan: severe prompt processing slowdown after `b10780` on RDNA3 | Open (#28752) | No fix yet; suspected graph scheduling regression |
| High | Vulkan: Flash Attention falls back to SCALAR → O(N²) PP degradation | Open (#27638) | Investigation ongoing |
| High | macOS arm64: heap corruption due to `ggml-cpu` PCH | Open (#28858) | ✅ Fix merged in `#28882` |
| Medium | CUDA: misaligned address in `sigmoid` op on RTX 5090 Laptop (sm_120) | Open (#28877) | Regression between `d3146f2b5` and `ad6c66839` |
| Medium | ROCm: significantly lower token gen vs Vulkan on RX 7900 XTX | Open (#20934) | No known fix; possible kernel inefficiency |

> ⚠️ **Note:** Several regressions affect production-grade deployments on Vulkan/SYCL backends.

---

### **6. What This Means for Application Developers**  
- **Avoid `b10780` and later** if using Vulkan on RDNA3/RDNA4 — expect degraded prompt processing speed. Pin to `b10779` or earlier until fix is released.  
- **Use `b10952` or later** for stable SYCL inference — especially on Intel Arc GPUs. The oneDNN scratchpad fix is essential for reliability.  
- **Enable persistent disk cache** via `--cache-disk` (PR #28092) to reduce cold-start latency in server deployments.  
- **For macOS M-series users**, ensure builds use `--no-pch` or upgrade to `b10952+` to avoid heap corruption.  
- **Consider upgrading to ROCm 10.0** if deploying on newer AMD GPUs — better driver support and model compatibility.  
- **Monitor speculative decoding behavior** — recent changes may affect acceptance rates and speed on models like Qwen3.8-Flash-Next (see #28805).

> 🔗 **Recommended build flags**: `--device SYCL --model-draft <draft_model>` for low-latency inference on supported hardware. Use `--cache-disk` for large-scale agent systems.

---  
*Digest generated from GitHub activity: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-14**

---

### **Today's Highlights**  
Two critical issues affecting multimodal inference and tool calling were reported today: `gemma4` fails to process images on Windows (#17778), and `kimi-k3:cloud` crashes when handling image content in tool-role messages (#18426). A regression in prompt caching due to unstable schema key ordering in `qwen3-coder` was also identified (#18430), impacting agent reliability. Meanwhile, PRs landed to fix map iteration randomness in tool schemas (#18433) and normalize JPEG EXIF orientation (#18432), improving consistency across platforms.

---

### **Releases & Breaking Changes**  
None. No new releases or breaking API/config changes were published in the last 24 hours.

---

### **New Model & Hardware Support**  
- **Requested Models**:  
  - SARVAM-30b and SARVAM-105b (Issue #14319)  
  - Gnani Evon-v3.3 (Issue #18427)  
- **Hardware/Backend**:  
  - Jetson Orin Nano 8GB continues to face OOM issues with Gemma 4 E4B multimodal projector despite CPU-projector config (#18396).  
  - Vulkan GPU support for integrated GPUs (e.g., Virtio-GPU) was restored via PR #18124, resolving a regression from 0.32.9.

---

### **Performance & Optimization**  
- **Memory Efficiency**:  
  - PR #18424 introduces cleanup of intermediate F16 blobs after quantization, addressing a 50–830 GB accumulation issue in model storage.  
- **Latency & Throughput**:  
  - No direct performance improvements reported today. However, ongoing work on stable tool schema rendering (#18433) and correct tool call parsing (#18422) will prevent unnecessary reprocessing and cache misses, indirectly improving throughput for agent workflows.

---

### **Stability & Regressions**  
1. **Critical**: `kimi-k3:cloud` crashes with HTTP 500 on image content in tool-role messages (#18426) — **regression from kimi-k2.6**, no fix yet.  
2. **High**: `gemma4` fails to process images on Windows (#17778), blocking multimodal use cases.  
3. **Medium**: `qwen3-coder` generates inconsistent prompts due to random schema key ordering, invalidating prompt cache (#18430); **fix in progress via PR #18433**.  
4. **Low**: `Qwen3.8-27B-GSQ-RCO-GGUF:IQ3_S` returns empty content despite successful generation (#18297); likely quantization compatibility issue.  
5. **Minor**: Tool call keys with spaces are dropped silently (#18390); resolved by PR #18422.  

> ✅ *Fix PRs exist for:*  
> - Stable tool schema rendering: [#18433](https://github.com/ollama/ollama/pull/18433)  
> - JPEG EXIF normalization: [#18432](https://github.com/ollama/ollama/pull/18432)  
> - Tool number overflow: [#18422](https://github.com/ollama/ollama/pull/18422)

---

### **What This Means for Application Developers**  
- Avoid `kimi-k3:cloud` and `gemma4` with image inputs on Windows until fixes land. Use `gemma3` or `qwen3-coder` as alternatives where possible.  
- If using `qwen3-coder` with tools, expect inconsistent prompt caching unless you pin to a version before this regression. Monitor PR #18433 for resolution.  
- For local agents or automation workflows involving large codebases, consider the upcoming Docker SBX integration (#18425) and directory input features (#18429).  
- Be cautious with `IQ3_S` quantized models; verify content output manually.  
- Leverage `previous_response_id` support now being added via PR #18434 for stateful agent flows (expected in next release).

> 🔗 *Track key issues*: [Issue #18426](https://github.com/ollama/ollama/issues/18426), [Issue #18430](https://github.com/ollama/ollama/issues/18430), [PR #18433](https://github.com/ollama/ollama/pull/18433)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-14**

---

### **1. Today's Highlights**  
The LiteLLM proxy continues to mature as a production-grade LLM gateway, with critical fixes focused on logging, cost accounting, and streaming reliability. Key developments include robust guardrail integrations (Reco), improved handling of cached token usage in VLLM, and enhanced security around provider metadata exposure. The ecosystem is now actively addressing cross-tenant cache leaks and budget mismanagement in multi-tenant deployments.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, several PRs introduce breaking changes or configuration shifts:  
- **PR #40111** modifies Qwen cache pricing behavior by distinguishing between cache modes — this may affect cost calculations for users relying on default pricing rules. [Link](https://github.com/BerriAI/litellm/pull/40111)  
- **PR #41053** corrects a docstring discrepancy in `QualifireGuardrail.__init__`, clarifying that `api_base` is read from an environment variable (`QUALIFIRE_API_BASE`) rather than a hardcoded host. [Link](https://github.com/BerriAI/litellm/pull/41053)

---

### **3. New Model & Hardware Support**  
- **PR #41042** proposes adding **Bourse** as an OpenAI-compatible provider, enabling access to resold AI capacity at 11–58% below list price. This extends LiteLLM’s extensibility to emerging low-cost inference markets. [Link](https://github.com/BerriAI/litellm/pull/41042)  
- **PR #39135** adds support for YAML-based OpenAPI specs in MCP servers, improving compatibility with tools like firefly-iii and Petstore that use YAML over JSON. [Link](https://github.com/BerriAI/litellm/pull/39135)  
- **PR #40605** enables decoding of form fields (`context`, `translation`, flags) for Soniox, unlocking richer audio-to-text customization in voice-driven agents. [Link](https://github.com/BerriAI/litellm/pull/40605)

---

### **4. Performance & Optimization**  
- **PR #40949** ensures spend log queues are drained before Prisma disconnect during shutdown — preventing loss of billing data under crash scenarios. Critical for high-throughput proxy deployments. [Link](https://github.com/BerriAI/litellm/pull/40949)  
- **PR #40950** fixes incorrect spending attribution in Vertex AI Anthropic streams by ignoring `usage.cost=0` when calculating spend from tokens. Prevents false zero-cost reporting for cached responses. [Link](https://github.com/BerriAI/litellm/pull/40950)  
- **PR #41033** introduces configurable provider affinity headers via `x-litellm-session-id`, reducing client-side logic complexity and improving routing consistency across async/streaming paths. [Link](https://github.com/BerriAI/litellm/pull/41033)

---

### **5. Stability & Regressions**  
Critical stability issues reported today:  
1. **#10788**: INFO-level request logging cannot be disabled via `LITELLM_LOG=ERROR`. This causes severe log pollution in production proxies. *No fix yet*, but widely reported. [Link](https://github.com/BerriAI/litellm/issues/10788)  
2. **#39370**: Reset-budget job silently zeros spend for teams with `budget_duration=null` and stale `budget_reset_at`. This leads to undetected budget exhaustion. *Fix pending*. [Link](https://github.com/BerriAI/litellm/issues/39370)  
3. **#40583**: Guardrails fail to inspect/block MCP tools sent via `/v1/messages` (Anthropic format). Affects agent safety in pre-call validation. *Fix not merged*. [Link](https://github.com/BerriAI/litellm/issues/40583)  
4. **#40887 / #40654**: Streaming reasoning state is lost in both non-streaming and streaming responses due to missing delta mapping. Impacts agent memory continuity. *Fixes in progress*. [Link](https://github.com/BerriAI/litellm/issues/40887), [Link](https://github.com/BerriAI/litellm/issues/40654)  

---

### **6. What This Means for Application Developers**  
- **Use caution with logging**: If you’re running a high-volume proxy, disable verbose logging immediately using custom middleware until #10788 is resolved.  
- **Audit cost accounting**: Ensure your deployment uses accurate pricing maps — especially for Qwen (via #40111) and Vertex AI Claude models (via #40363). Mispricing can lead to financial drift.  
- **Secure multi-tenant setups**: Use team-scoped caching (#29955) and avoid shared model aliases without proper isolation.  
- **Enhance agent reliability**: For agents relying on tool calls and reasoning history, test against the latest proxy builds to ensure streaming state is preserved.  
- **Plan for guardrail hygiene**: When using MCP tools or Anthropic-compatible endpoints, verify guardrails are configured to handle message-format differences.  

> 💡 *Pro Tip*: Monitor PRs #41048 (lint upgrades) and #40251 (type cleanup) — they signal ongoing internal quality improvements that will benefit long-term maintainability.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-14**

---

### **1. Today's Highlights**  
The Unsloth ecosystem continues to expand its support for multi-GPU and cross-platform deployment, with key PRs enhancing AMD ROCm compatibility and improving installer robustness. Critical stability fixes were merged to address sandbox escape risks in tool execution and ensure proper handling of model loading on Windows ARM64 and Intel ARC GPUs.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, a breaking change was introduced via `SFTConfig.__init__()` deprecating `max_seq_length` in favor of `max_length`, as noted in [Issue #10785](https://github.com/unslothai/unsloth/issues/10785). Developers using older configs should update their code accordingly.

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Support**: A new `docker/rocm` image has been added (PR [#10820](https://github.com/unslothai/unsloth/pull/10820)), supporting RDNA2 through CDNA architectures. This enables full GPU acceleration on AMD cards including RX 6950 XT, 6850M XT, and 6550M — previously falling back to CPU.
- **Intel ARC GPU Fixes**: Installation issues on Intel ARC 140T are under investigation ([Issue #8632](https://github.com/unslothai/unsloth/issues/8632)), while PRs like [#10746](https://github.com/unslothai/unsloth/pull/10746) improve detection for refresh-era AMD GPUs.
- **Windows ARM64**: Installer failures due to `pyarrow` conflicts persist ([Issue #10875](https://github.com/unslothai/unsloth/issues/10875)); no fix yet available.

---

### **4. Performance & Optimization**  
- **AMD Attention Kernels**: PR [#8821](https://github.com/unslothai/unsloth/pull/8821) enables PyTorch’s fast ROCm attention kernels (AOTriton) by default on import, eliminating manual environment variable setup and reducing memory growth during training.
- **Memory Management**: The `--tensor-split` flag is now respected again after being ignored ([Issue #10355](https://github.com/unslothai/unsloth/issues/10355)), crucial for large-model inference across multiple GPUs.
- **Model Offloading**: Fixing VRAM leakage in GGUF models on Windows even when fully offloaded (`-ngl -1`) remains open ([Issue #9033](https://github.com/unslothai/unsloth/issues/9033)) — impacting low-memory systems.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| High | [Issue #10907](https://github.com/unslothai/unsloth/issues/10907) | Local models can bypass sandbox and access files outside project scope (e.g., via `os.remove()`). | ✅ PR [#10907](https://github.com/unslothai/unsloth/pull/10907) submitted to prompt before external file access |
| High | [Issue #10912](https://github.com/unslothai/unsloth/issues/10912) | `unsloth start pi` fails repeatedly on slow CPUs with “Error: terminated” after 3 retries | ⚠️ Partial fix in progress; linked to #10911 |
| Medium | [Issue #10839](https://github.com/unslothai/unsloth/issues/10839) | MCP calls truncated due to deduplication logic | 🔧 Open; affects agent workflows |
| Medium | [Issue #10853](https://github.com/unslothai/unsloth/issues/10853) | Training fails on local HF-cache models due to missing weight filename pattern (`model-00000-of-00001.safetensors`) | 🛠️ Allowlist issue; needs updated filter |

---

### **6. What This Means for Application Developers**  
- **Agent Builders**: Expect tighter integration with secure, sandboxed tool execution. The upcoming prompt-before-external-access feature ([PR #10907](https://github.com/unslothai/unsloth/pull/10907)) will be essential for production-grade agents.
- **Multi-Platform Deployment**: With improved ROCm and AMD GPU support, developers can now deploy LLM agents on diverse hardware (including consumer-grade AMD cards) without sacrificing performance.
- **Workflow Automation**: Features like folder-based projects ([Issue #10873](https://github.com/unslothai/unsloth/issues/10873)), Steam-like model library management ([Issue #10872](https://github.com/unslothai/unsloth/issues/10872)), and MCP hubs ([Issue #10822](https://github.com/unslothai/unsloth/issues/10822)) signal a shift toward developer-friendly, reusable agent ecosystems.
- **API Caution**: Update `SFTConfig` usage immediately to replace `max_seq_length` with `max_length` to avoid runtime errors.

> 🔗 *Explore the full changelog and contribute at:* https://github.com/unslothai/unsloth

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*