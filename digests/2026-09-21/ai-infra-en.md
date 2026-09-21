# AI Infrastructure Digest 2026-09-21

> Generated: 2026-09-21 00:26 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-21**

---

### **1. Ecosystem Overview**  
The AI inference and serving landscape is rapidly maturing into a multi-layered, hardware-aware ecosystem where performance, stability, and agent-native capabilities are now primary differentiators. Projects like vLLM and SGLang are pushing the envelope in distributed engine optimization and high-throughput serving, while lightweight runtimes like llama.cpp and Ollama cater to edge and local deployment needs. The emergence of specialized tooling—such as Unsloth’s sandboxing and LiteLLM’s cost-aware routing—signals a shift toward production-grade agent workflows, with infrastructure now tightly coupled to application semantics.

---

### **2. Activity Comparison**  

| Project       | Issues Open (Last 24h) | PRs Merged (Last 24h) | Release Status |
|---------------|------------------------|------------------------|----------------|
| **vLLM**      | 18                     | 15                     | None           |
| **SGLang**    | 23                     | 14                     | None           |
| **llama.cpp** | 12                     | 10                     | `b11065` (patch) |
| **Ollama**    | 17                     | 5                      | None           |
| **LiteLLM**   | 14                     | 6                      | v1.103.0-rc.1  |
| **Unsloth**   | 19                     | 7                      | `v0.1.810-beta` (regression) |

> 🔍 *Observation*: SGLang leads in issue volume, reflecting deep engineering work on disaggregated serving and low-level GPU stability. vLLM shows strong PR velocity, particularly in critical fixes for speculative decoding and KV cache integrity.

---

### **3. Model Support Race**  

| New Model / Architecture        | Supported By          | Key Advancement |
|----------------------------------|-----------------------|-----------------|
| **Qwen3.8-Flash-Next**           | SGLang ✅             | Pipeline & PD prefill support; scalable for large models |
| **MiniMax-M3 / DeepSeek-V4.1**   | vLLM ✅               | ROCm context-parallel decode + fp8 indexing |
| **GLM-5.3-Flash**                | vLLM, SGLang ❗        | Critical instability issues reported across both projects |
| **Qwen3.8 MoE (Q6_K)**           | llama.cpp ✅          | Streaming expert loading enables 85GB+ models on 24GB VRAM |
| **Prism Ternary GGUFs**          | Ollama ⚠️             | Import failure due to tensor size overflow — active interest |
| **Snapdragon X Elite NPU/GPU**   | Ollama 🟨 (Request)   | High demand from AIPC users; no native support yet |
| **ARM64 Linux**                  | Unsloth 🟨 (Request)  | Blocker for DGX Spark and ARM-based AI servers |

> 🏆 **Leader**: **vLLM** maintains early lead in **multi-architecture** support (ROCm, Intel GPU), while **llama.cpp** excels in **local model efficiency** (streaming MoE, NVMe swap). **SGLang** is fastest in **scaling new models** via PD and PP.

---

### **4. Performance Frontier**  

| Optimization Focus         | Leading Projects                          | Key Developments |
|----------------------------|-------------------------------------------|------------------|
| **KV Cache & Memory**      | vLLM, SGLang                              | `KvHints` (vLLM), weight cache daemon (SGLang), FP8 support |
| **Kernel Fusion & Overlap**| vLLM, SGLang, llama.cpp                   | Attention/FFN overlap (vLLM), fused KDA/projection (SGLang), MMA kernel tuning (llama.cpp) |
| **Quantization & Compression** | vLLM, llama.cpp, Ollama                 | FP8 QKV sharding (vLLM), `humming` quant crash fix (SGLang), PQ2_0 support request (Ollama) |
| **Distributed Serving**    | SGLang, vLLM                              | PD prefill (SGLang), TP all-reduce fusions (vLLM) |
| **Local Runtime Efficiency**| llama.cpp, Unsloth                        | Streaming expert load (llama.cpp), bundled CUDA build regression (Unsloth) |

> 📈 **Trend**: The frontier is shifting from raw throughput to **predictable, long-running stability**—especially under speculation, sampling, and multi-turn reasoning.

---

### **5. Layer Positioning**  

| Project       | Primary Layer              | Role in Stack                                  |
|---------------|----------------------------|------------------------------------------------|
| **vLLM**      | **Serving Engine**         | High-performance, multi-GPU inference; core backend for many gateways |
| **SGLang**    | **High-Performance Serving** | Disaggregated, pipeline-parallel inference; built for scale |
| **llama.cpp** | **Local Runtime**          | CPU/GPU-accelerated inference; ideal for edge and embedded |
| **Ollama**    | **Gateway / CLI Runtime**  | Developer-friendly interface; abstraction over engines; growing agent tooling |
| **LiteLLM**   | **LLM Gateway / Orchestrator** | Unified API layer; supports cost tracking, model routing, and virtual keys |
| **Unsloth**   | **Agent Platform + UI**    | Full-stack agent experience with RAG, tool execution, and secure sandboxing |

> 💡 **Strategic Insight**: vLLM/SGLang are **infrastructure engines**; LiteLLM/Ollama are **abstraction layers**; Unsloth is **application-centric**, blurring lines between runtime and agent platform.

---

### **6. Trend Signals**  

- **Agent-First Engineering**: Stability issues in **long-context reasoning**, **tool call parsing**, and **structured output fidelity** (e.g., Ollama's `think:true` leak, Unsloth’s image parsing) signal that **agent reliability is now a top-tier concern**.
- **Hardware Diversification**: ROCm, Intel GPUs, Apple Metal, and Snapdragon X Elite are no longer niche—projects must now support **cross-platform consistency** or risk fragmentation.
- **Memory & Stability at Scale**: Crashes after ~11k decode steps (DFlash2), memory leaks in Python clients, and GPU queue deadlocks highlight that **long-running sessions are the new battleground**.
- **Rust Migration Momentum**: LiteLLM’s tokenizer rewrite to Rust reflects a broader industry move to **reduce dependency bloat and improve performance** at the core.
- **Security & Trust**: cosign-signed Docker images (LiteLLM) and signature verification guidance show **supply chain integrity is becoming mandatory**.

> 🔮 **For Application Developers**:  
> - Prioritize **stability over novelty**—avoid experimental backends (TurboQuant, `humming`) in production.  
> - Validate **long-context and agentic flows** rigorously—expect degradation in GLM-5.3-Flash and Qwen-MoE.  
> - Use **`KvHints` (vLLM)** and **weight cache daemons (SGLang)** to enable resilient, restart-safe systems.  
> - Prepare for **Rust-based tokenizers** and **secure sandboxing**—they’re not future trends, but current requirements.

---  
*Compiled: 2026-09-21 | Source: GitHub activity across vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-21**

---

### **1. Today's Highlights**  
The vLLM project continues to advance multi-architecture support with new ROCm optimizations for DeepSeek-V4.1 and MiniMax-M3, including context-parallel sparse indexing and kernel fusions. Critical stability fixes were merged for speculative decoding (PR #56734) and KV cache finalization (PRs #57775–#57777), addressing persistent corruption and state leakage risks in Model Runner V2. Meanwhile, ongoing issues around GLM-5.3-Flash degeneration and fp8 KV cache support highlight continued challenges in long-context and quantized inference.

---

### **2. Releases & Breaking Changes**  
None. No new releases or breaking API/config changes reported in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **ROCm Support**:  
  - Added context-parallel decode scoring for **MiniMax-M3’s AITER fp8 indexer** (PR #57840) and **sparse lightning indexer** (PR #57832), both opt-in and TP>1-ready.  
  - **DeepSeek-V4.1** now supports fused decode metadata + final norm on ROCm (gfx950) via PR #57756.  
- **Intel GPU**:  
  - Improved MoE model compatibility under `VLLM_BATCH_INVARIANT=1` (PR #55881), aligning with CUDA behavior and enabling deterministic reductions.  
- **Quantization**:  
  - FP8 QKV scale sharding fixed for **MiMo V2** (PR #53242), resolving incorrect weight mapping across tensor-parallel ranks.

---

### **4. Performance & Optimization**  
- **Kernel Fusions & Overlap**:  
  - PR #57603: Overlaps mHC coefficient generation with attention/FFN for small batches, reducing latency in DeepSeek-V4.1 decoders.  
  - PR #57643: Fuses TP all-reduce, mHC post-mixing, collapse, and RMSNorm into a single launch—reducing kernel overhead at DSV4.1 boundaries.  
- **Memory & Throughput**:  
  - PR #53423 introduces first-class `KvHints` request envelope for programmatic KV management (in Rust and Python), enabling fine-grained control over caching and eviction.  
  - PR #57587 isolates `WorkspaceManager` in compile/passes and MoE tests, improving test reliability and preventing memory leaks.

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - **GLM-5.3-Flash** exhibits "word salad" repetition in multi-turn agentic use (Issue #56605, 17 comments).  
  - **Long-decode degeneration** after accumulated reasoning steps (Issue #56868, 14 comments), affecting private W4A16 quantized checkpoints.  
  - **FP8 KV cache not supported on Hopper** for GLM-5.3-Flash (Issue #57713).  
- **Engine Failures**:  
  - **DFlash2** causes engine crash after ~11k decode steps under sampling load (Issue #55279, CUDA IMA/Xid 31).  
  - **TurboQuant attention backend** crashes due to workspace overflow during MTP decoding (Issue #42808, closed but relevant).  
  - **torch.compile** triggers degenerate output in Qwen1.5-MoE-A2.7B-Chat (Issue #56900).  
- **Fixes Merged**:  
  - PR #56734: Fixes KV-cache corruption from dummy draft steps in Model Runner V2.  
  - PRs #57775–#57777: Resolve deferred save state leaks and finalize-saves logic in KVConnector.

---

### **6. What This Means for Application Developers**  
- **Use caution with GLM-5.3-Flash** in long-context or agentic workflows—expect instability and potential output degradation.  
- **Enable `--kv-cache-dtype fp8` only on supported hardware**; avoid Hopper for GLM-5.3-Flash until Issue #57713 is resolved.  
- **Leverage new `KvHints` envelope (PR #53423)** for advanced caching strategies in high-throughput or agent-based systems.  
- **Avoid `torch.compile` with Qwen-MoE models** (Issue #56900) unless using stable vLLM versions without known regressions.  
- **Monitor speculative decoding behavior** under data parallelism—use latest vLLM builds to benefit from PR #56734’s fix.  

👉 *For production workloads: Pin to stable releases (e.g., v0.28.0), avoid experimental backends like TurboQuant on non-power-of-2 head_dim models (Issue #41413), and validate long-running sessions with `--disable-access-log-for-endpoints` to prevent memory bloat.*  

[GitHub Issues](https://github.com/vllm-project/vllm/issues) | [GitHub PRs](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# **SGLang Digest – 2026-09-21**

---

### **1. Today’s Highlights**  
The SGLang project continues to advance its high-performance inference stack with significant progress in **engine recovery latency reduction**, **disaggregated serving (PD) roadmap maturity**, and **multi-model support for Qwen3.8-Flash-Next and SenseNova-U1**. Critical stability fixes were merged for CUDA memory access issues, while new PRs focus on router enhancements, VAE slicing support, and improved quantization compatibility across AMD and NVIDIA backends.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking API/config changes were released.

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen3.8-Flash-Next**: Full pipeline-parallel (PP) and PD-prefill MTP support added via [PR #40501](https://github.com/sgl-project/sglang/pull/40501), enabling scalable inference on large models.
- ✅ **SenseNova-U1 / U1.5**: Dedicated tracking issue ([#37742](https://github.com/sgl-project/sglang/issues/37742)) launched to integrate official support from OpenSenseNova/SenseNova-U1.
- ✅ **AMD ROCm (MI355X)**: GLM-5.2 decode-path fixes for MXFP4 experts and MoE/MLA launch correctness ([PR #40189](https://github.com/sgl-project/sglang/pull/40189)).
- ✅ **InstantTensor Loader**: Optional high-performance Safetensors loader now supported via `--load-format instanttensor` ([PR #40453](https://github.com/sgl-project/sglang/pull/40453)).

---

### **4. Performance & Optimization**  
- 🚀 **Engine Recovery Speed**: The weight cache daemon has reduced startup time from **~327 seconds to under 1 second** on Qwen3-235B FP8 ([Blog](https://www.lmsys.org/blog/2026-08-21-sglang-quantized-weight-cache-daemon)), a major win for restart resilience.
- ⚙️ **Kernel Fusion & Overlap**: Multiple optimizations landed:
  - GLM-5.3-Flash KDA projections fused with routing and metadata prep ([PR #39688](https://github.com/sgl-project/sglang/pull/39688)).
  - Reduced KPool planning sync and overlapped indexer setup ([PR #39695](https://github.com/sgl-project/sglang/pull/39695)).
  - SwiGLU fusion re-enabled for quantized MiniMax-H3 MLPs ([PR #40378](https://github.com/sgl-project/sglang/pull/40378)).
- 🔁 **Multi-Device Pipeline**: PD-based prefill and decode parallelism is maturing, with Helix + A2A comm backends now default (`fi_a2a` / `a2a`) ([Issue #29736](https://github.com/sgl-project/sglang/issues/29736)).

---

### **5. Stability & Regressions**  
⚠️ **Critical Crashes & Memory Issues** (Ranked by impact):  
1. **CUDA Illegal Memory Access** in QSA extend forward at 8 concurrent requests (H20 TP8, Qwen3.8-Flash-Next-FP8) — workaround exists but not safe ([Issue #37633](https://github.com/sgl-project/sglang/issues/37633)).  
2. **CUDA Coredump Tracker** (#26340) — auto-collected crashes from CI; 319 comments indicate ongoing low-level GPU driver/runtime instability.  
3. **Weight Load Crash** with `humming` quantization due to missing `format_ue8m0` attribute ([Issue #40393](https://github.com/sgl-project/sglang/issues/40393)).  
4. **HiCache Staged Write-back Fault** on registered host pointers when `CanUseHostPointerForRegisteredMem == 0` ([Issue #40232](https://github.com/sgl-project/sglang/issues/40232)).  
5. **OOM during long-context prefill** in GLM-5.3-Flash fp8_mqa_logits — kills all TP ranks ([Issue #37712](https://github.com/sgl-project/sglang/issues/37712)).

🔧 *Fixes in progress*:  
- [PR #40364](https://github.com/sgl-project/sglang/pull/40364) addresses DP scheduler SIGQUIT termination bug.  
- [PR #40453](https://github.com/sgl-project/sglang/pull/40453) adds InstantTensor loader, improving load performance.

---

### **6. What This Means for Application Developers**  
- **Deployments requiring fast restarts** should adopt the new **weight cache daemon** (Phase 1 live) — expect near-instant engine reloads post-crash.
- **Multi-node or large-model serving** (e.g., Qwen3-235B, Qwen3.8-Flash-Next) will benefit from **PD + DCP support** and **pipeline parallelism** now enabled.
- **Use `--load-format instanttensor`** for faster, distributed model loading — especially useful in cloud or multi-GPU setups.
- **Avoid `--quantization humming`** until #40393 is resolved; it currently fails on DeepSeek/GLM MLA checkpoints.
- **Monitor CI health**: 1 broken, 9 flaky tests ([Issue #17050](https://github.com/sgl-project/sglang/issues/17050)) — test reliability may affect deployment confidence.

> 💡 **Pro Tip**: For production use, prefer stable branches over `main` if you're sensitive to regressions. Watch [CI status](https://github.com/sgl-project/sglang/issues/17050) and track critical bugs like #26340 and #37633 for runtime stability.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-21**

---

### **1. Today's Highlights**  
The latest updates focus on critical performance tuning for **Gemma 4** on **Ampere+ GPUs**, with optimized FlashAttention kernels and improved memory handling for Mamba and hybrid models. Key progress includes native SYCL backend modernization, Metal kernel enhancements for F16 input and arbitrary HC support, and the introduction of *streaming expert loading* for Qwen3.8 MoE models—enabling large models to run on constrained VRAM.

---

### **2. Releases & Breaking Changes**  
- **`b11065`**: CUDA FlashAttention tuned for Gemma 4 (head sizes 256/512) on Ampere or newer architectures. Improves small-model prompt processing via larger CUDA blocks and MMA kernel preference for batch size 1. [PR #29152](https://github.com/ggml-org/llama.cpp/pull/29152)  
- **`b11064`**: Metal now supports arbitrary `hc` in `dsv4_hc_pre` kernels (previously hard-coded to 4), enabling proper inference for Kimi-K3 with banked checkpoints. [PR #29169](https://github.com/ggml-org/llama.cpp/pull/29169)  
- **`b11063`**: PEG parser now handles invalid UTF-8 sequences gracefully per Unicode standards, avoiding HTTP 500 errors on OCR/vision outputs. [PR #29161](https://github.com/ggml-org/llama.cpp/pull/29161)  
- **`b11062`**: Enables sparse FlashAttention for Qwen4 on supported hardware. [PR #28770](https://github.com/ggml-org/llama.cpp/pull/28770)

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen3.8 MoE (Q6_K)**: Now supports `--load-mode streaming` + `--gpu-pill` for offloading experts to GPU during prefill, enabling 85GB+ models to run on 24GB VRAM with NVMe swap. [PR #29191](https://github.com/ggml-org/llama.cpp/pull/29191)  
- ✅ **Apple Metal**: Adds F16 input support to FWHT kernel; fixes deprecation warnings from macOS 27 SDK. [PRs #29094, #29136](https://github.com/ggml-org/llama.cpp/pull/29094, https://github.com/ggml-org/llama.cpp/pull/29136)  
- ✅ **SYCL**: Drops dpct emulation layer, replaces with native out-of-order queues using `sycl::event`. Improves async scheduling correctness and reduces overhead. [PR #29190](https://github.com/ggml-org/llama.cpp/pull/29190)  
- ⚠️ **Xe-LPG Plus/Xe2/Xe3**: Vulkan backend adds Intel Xe flash attention optimizations (Phase 2). [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406)  
- 🟨 **XDNA Backend**: Feature request open for new hardware support ([#21725](https://github.com/ggml-org/llama.cpp/issues/21725)).

---

### **4. Performance & Optimization**  
- **Gemma 4**: FlashAttention tuning yields measurable improvement in prompt processing speed on Ampere+ GPUs (exact numbers not provided, but described as "a bit of performance"). [PR #29152](https://github.com/ggml-org/llama.cpp/pull/29152)  
- **Mamba**: Time-step projection input now made contiguous, eliminating unnecessary CPU copy. [PR #28832](https://github.com/ggml-org/llama.cpp/pull/28832)  
- **Qwen3.8 MoE**: Streaming expert loading enables context windows up to ~96K on 24GB VRAM with NVMe swap. [PR #29191](https://github.com/ggml-org/llama.cpp/pull/29191)  
- **Vulkan**: Int8 coopmat1 matmul added for RDNA3/RDNA4 (supports q4_0 to mxfp4), improving dense model throughput. [PR #27952](https://github.com/ggml-org/llama.cpp/pull/27952)  
- **SYCL**: Native event-based async execution improves scalability and reduces latency in multi-threaded scenarios. [PR #29190](https://github.com/ggml-org/llama.cpp/pull/29190)

---

### **5. Stability & Regressions**  
- **Critical**: **HTTP 500 on invalid UTF-8 output** (e.g., OCR-generated text) due to strict PEG parser. Fixed in `b11063` via robust error handling. [Issue #27543](https://github.com/ggml-org/llama.cpp/issues/27543)  
- **High**: **System message mid-conversation crashes Jinja template** (strict templates like Qwen3.x). Reported but no fix yet. [Issue #27367](https://github.com/ggml-org/llama.cpp/issues/27367)  
- **High**: **Context checkpoints invalidated on hybrid/recurrent models** after slot save/restore. Patch in progress. [Issue #24055](https://github.com/ggml-org/llama.cpp/issues/24055)  
- **Medium**: **Decode throughput collapses ~25x at >80K context** for Qwen3.8-27B Hybrid Gated DeltaNet. [Issue #27623](https://github.com/ggml-org/llama.cpp/issues/27623)  
- **Medium**: **GPU memory overflow with SYCL `--fit`** due to incomplete memory accounting. [Issue #27595](https://github.com/ggml-org/llama.cpp/issues/27595)

---

### **6. What This Means for Application Developers**  
- **Use `--load-mode streaming` + `--gpu-pill`** for deploying large MoE models (like Qwen3.8) on limited VRAM systems—ideal for edge deployment or low-end inference servers.  
- **Upgrade to `b11065+`** for better Gemma 4 performance on Ampere+ GPUs—especially impactful for small models and high-throughput applications.  
- **Handle malformed UTF-8 gracefully** by relying on the updated PEG parser; avoid crash-prone JSON responses when working with vision or OCR pipelines.  
- **Avoid `--fit` with SYCL** until memory accounting is fixed—use `--ngl` or manual layer placement instead.  
- **Enable `GGML_SCHED_SANITIZE=1`** to catch race conditions in multi-threaded inference workflows during development.  

> 🔗 **Latest Builds**: [macOS Apple Silicon (arm64)](https://github.com/ggml-org/llama.cpp/releases/download/b11062/llama-cpp-osx-arm64.zip) | [Linux x86_64](https://github.com/ggml-org/llama.cpp/releases/download/b11062/llama-cpp-linux-x64.zip)  
> 🔗 **Attestations**: [b11062](https://github.com/ggml-org/llama.cpp/attestations/48739244), [b11065](https://github.com/ggml-org/llama.cpp/attestations/48802880)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-21**

---

### **1. Today's Highlights**  
Ollama continues to expand hardware and model support, with critical work on MLX and Vulkan backend stability, particularly around memory management and GPU compatibility. A significant number of issues center on *tool call handling*, *thinking output separation*, and *silent truncation behavior*—highlighting growing maturity in agent workflows and structured output fidelity. Notably, a PR has been merged to enable Vulkan graphics capabilities in Docker containers, addressing long-standing GPU access limitations.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*  
However, ongoing API refinement is evident: PR [#18551](https://github.com/ollama/ollama/pull/18551) introduces backward compatibility by *warning instead of rejecting* `typical_p` parameters (fixes #18542), easing migration for clients like SillyTavern that rely on default values.

---

### **3. New Model & Hardware Support**  
- **Snapdragon X Elite NPU/GPU**: Feature request [#5360](https://github.com/ollama/ollama/issues/5360) calls for native support on ARM-based AIPC laptops, signaling demand for on-device AI acceleration on Windows ARM platforms.  
- **Prism Ternary GGUFs**: Issue [#18521](https://github.com/ollama/ollama/issues/18521) reports import failure for `prism-ml/Ternary-Bonsai-2-27B-gguf` due to unsupported tensor size overflow—indicating active interest in low-bit quantized models (PQ2_0/PTQ1_0 types).  
- **Vulkan Backend**: PR [#18562](https://github.com/ollama/ollama/pull/18562) adds `graphics` capability to NVIDIA container runtime, enabling Vulkan GPU access in Docker—critical for AMD/NVIDIA users on Linux and Windows.

---

### **4. Performance & Optimization**  
- **MLX Memory Management**: PR [#18556](https://github.com/ollama/ollama/pull/18556) introduces configurable prefix-cache memory budget to prevent macOS system freeze on M1 Pro (16 GB RAM), directly addressing high memory pressure during sustained inference.  
- **Kernel Optimization**: PR [#18550](https://github.com/ollama/ollama/pull/18550) adds a *prefill-shaped gated delta kernel* for Qwen3.8-27B, improving prompt processing efficiency by avoiding fallback to unrolled graphs at longer context lengths.  
- **Scheduler Robustness**: PR [#18552](https://github.com/ollama/ollama/pull/18552) improves GPU probe fallback logic when SMCount/ClockMHz data is missing, preventing NaN/Inf crashes and ensuring stable scheduling under incomplete hardware introspection.

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - [#18557](https://github.com/ollama/ollama/issues/18557): Access violation (`0xc0000005`) loading *any* model on Vulkan (AMD RX 6800 XT, driver 32.0.21045.5002) — confirmed as distinct from prior issues but likely tied to driver-level Vulkan state handling. No fix yet.  
  - [#18558](https://github.com/ollama/ollama/issues/18558): Memory leak in Python client via repeated `ollama.generate()` calls — reproducible with image + text payloads; likely tied to object lifecycle in bindings.  
- **Incorrect Output Behavior**:  
  - [#18554](https://github.com/ollama/ollama/issues/18554): `/api/generate` with `think:true` leaks reasoning into `response`, violating expected separation (vs. `/api/chat`). Fix PR [#18561](https://github.com/ollama/ollama/pull/18561) now in review.  
  - [#18441](https://github.com/ollama/ollama/issues/18441): MLX returns JSON with stray leading `.` — breaks structured output parsing.  
- **Silent Truncation**: [#14259](https://github.com/ollama/ollama/issues/14259) and [#18509](https://github.com/ollama/ollama/issues/18509) highlight lack of user feedback when chat history or tool outputs are silently truncated.

---

### **6. What This Means for Application Developers**  
- **Tool Call Reliability**: Avoid relying on `tool` role responses being parsed correctly—expect potential misclassification or silent failures. Use `system` roles carefully; validate structured output format rigorously.  
- **Structured Output Caution**: With MLX and non-streaming `generate` returning malformed JSON (e.g., leading `.`), always sanitize responses before parsing. Prefer `/api/chat` with explicit `response_format`.  
- **Memory & Scheduling**: On Apple Silicon or low-RAM systems, expect Ollama to consume nearly all available memory—configure `mlxrunner` memory budgets manually if needed.  
- **GPU Backend Selection**: Vulkan remains unstable on AMD cards (driver-dependent); fall back to CUDA or Metal unless you’re testing with updated drivers.  
- **API Compatibility**: Expect `typical_p` to be ignored (not rejected) going forward—no need to scrub it from requests, but don’t rely on its effect.

> 🔗 *For real-time updates, follow [Ollama GitHub Issues](https://github.com/ollama/ollama/issues) and PRs.*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **1. Today's Highlights**  
LiteLLM’s latest updates focus on critical stability fixes for virtual key budgeting, streaming cost tracking, and prompt caching in multi-turn conversations—especially for Vertex AI and Anthropic models. A major refactor of tokenizer dependencies into Rust is underway to improve performance and reduce Python dependency bloat, with initial PRs showing promising results.

---

### **2. Releases & Breaking Changes**  
- **v1.103.0-rc.1** released today with enhanced security via [cosign-signed Docker images](https://github.com/BerriAI/litellm/commit/0112e53). All releases since `0112e53` are signed using the same key; verify with `cosign verify`.  
  🔗 [GitHub Release v1.103.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.103.0-rc.1)  
  🔗 [Verify Image Signature Guide](https://docs.sigstore.dev/cosign/overview/)  

> ⚠️ **Migration Note**: Ensure your CI/CD pipelines validate image signatures before upgrading. No breaking API changes reported in this release.

---

### **3. New Model & Hardware Support**  
No new models or hardware backends added in the last 24h. However:
- **DeepSeek V4 reasoning_effort** (`"high"` / `"max"`) support remains partially blocked due to parameter stripping (#27439); fix pending.
- **OpenRouter TTS model** (`openrouter/google/gemini-3.1-flash-tts-preview`) now has proper routing support after #42111 fix was merged.
  🔗 [PR #42111: Fix `/v1/audio/speech` for OpenRouter](https://github.com/BerriAI/litellm/pull/42111)

---

### **4. Performance & Optimization**  
- **Rust-based tokenization refactoring** initiated:  
  - PR #42174 replaces Python tokenizer dependencies with a high-performance Rust backend.  
  - Preserves encoding options while eliminating duplicate stacks and fixing Unicode issues.  
  - Expected to reduce startup time and memory overhead by ~30% in large-scale deployments.  
  🔗 [PR #42174: Refactor tokenizer to Rust](https://github.com/BerriAI/litellm/pull/42174)  
- **Token counter backend split** (PR #42165): Isolates fast/HF/tiktoken implementations into separate crates for better maintainability and future GPU kernel integration.  
  🔗 [PR #42165: Split token counter backends](https://github.com/BerriAI/litellm/pull/42165)

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Description |
|------|----------|--------|--------|-------------|
| [#27735](https://github.com/BerriAI/litellm/issues/27735) | High | Open | ❌ Not yet fixed | Virtual key `BudgetExceededError` uses stale spend despite actual usage below budget. Impacts team-level rate limiting. |
| [#42161](https://github.com/BerriAI/litellm/issues/42161) | High | Open | ✅ [PR #42176](https://github.com/BerriAI/litellm/pull/42176) | Streamed requests logged as `spend = 0` when using model aliases. Fixed in progress. |
| [#42104](https://github.com/BerriAI/litellm/issues/42104) | High | Open | ❌ No fix yet | Mid-conversation `system` messages break Gemini prompt caching — every turn reports `cache_read_input_tokens: 0`. |
| [#41963](https://github.com/BerriAI/litellm/issues/41963) | Medium | Open | ❌ No fix yet | `POST /v1/responses` fails if `input` is a plain string — not normalized to list before dispatch. |
| [#42178](https://github.com/BerriAI/litellm/issues/42178) | Low | Closed | ✅ [PR #42178](https://github.com/BerriAI/litellm/pull/42178) | OpenRouter pricing sync for 4 models (including DeepSeek Flash). |

> 💡 **Critical Note**: Multiple high-severity issues affect billing accuracy, prompt caching, and stream reliability — especially in agent workflows relying on multi-turn state.

---

### **6. What This Means for Application Developers**  
- **Avoid model aliases in streaming scenarios** until PR #42176 is deployed — otherwise, you risk **zero-cost logging**, leading to inaccurate monitoring and billing.  
- **Do not rely on system message ordering in mid-conversation flows** with Gemini via Vertex AI — this breaks prompt caching and increases latency. Use early `system` prompts instead.  
- **Enable strict stream validation** (`strict_stream_completion`) if you're building agents that require reliable SSE completion detection — see #42085 for opt-in support.  
- **Monitor for outdated pricing data** — OpenRouter prices were updated across 12 models in recent syncs (PRs #42178, #42175, #42169, #42168), but manual override may still be needed.  
- **Prepare for Rust-based tokenizers** — expect faster inference startup and reduced memory footprint in next few releases. No code changes required yet, but test downstream integrations.

> 🛠 **Action Items**:  
> - Audit virtual key budget logic if users report unexpected `BudgetExceededError`.  
> - Update Helm charts: #40822 exposes root-pod risks — apply `runAsNonRoot` hardening immediately.  
> - Enable `output_parse_pii` only with caution — #31950 shows PII not restored in `tool_calls.arguments`.

---  
*Digest generated: 2026-09-21 | Source: [BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-21**

---

### **1. Today's Highlights**  
The Unsloth ecosystem continues to expand its AI agent and model serving capabilities, with major UI/UX refinements in Studio aimed at improving chat readability and developer workflow efficiency. Critical stability fixes are underway for Windows-specific memory management and sandboxing, while performance regressions in GGUF inference have been flagged as a top concern—particularly on newer NVIDIA GPUs like the RTX 5070 Ti and 5090.  

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
- **Note**: The `v0.1.810-beta` update introduced a regression in GGUF inference throughput (#11221), which may impact production deployments using local GGUF models. Users should consider rolling back or monitoring performance closely.

---

### **3. New Model & Hardware Support**  
- **Windows MXC Sandbox Integration (Preview)**: PR #11390 and #11357 introduce Microsoft’s MXC ProcessContainer for secure, isolated execution of Python and terminal tools on Windows—eliminating reliance on Node.js. This enables safer RAG workflows and tool use in enterprise environments.  
  🔗 [PR #11390](https://github.com/unslothai/unsloth/pull/11390) | [PR #11357](https://github.com/unslothai/unsloth/pull/11357)  
- **ARM64 Linux Build Request**: Long-standing issue #10332 highlights the absence of an aarch64 Linux build; this remains a blocker for DGX Spark and other ARM-based AI servers.  
  🔗 [Issue #10332](https://github.com/unslothai/unsloth/issues/10332)  
- **Community SDXL Fine-Tunes**: Feature request #11391 calls for support of single-file GGUF/safetensors SDXL fine-tunes in the Images page—critical for generative AI developers.  
  🔗 [Issue #11391](https://github.com/unslothai/unsloth/issues/11391)

---

### **4. Performance & Optimization**  
- **GGUF Inference Regression**: A notable slowdown in inference throughput after `v0.1.810-beta` has been reported across multiple users, including on high-end hardware like RTX 5070 Ti and 5090. The root cause is under investigation.  
  🔗 [Issue #11221](https://github.com/unslothai/unsloth/issues/11221)  
- **Bundled llama.cpp Build Performance**: Unsloth’s bundled CUDA 13.4 build (`b11030-mix-5ff778e`) shows ~5–6x slower performance than official ggml-org’s CUDA 12 build on sm_120 (Blackwell) GPUs.  
  🔗 [Issue #11349](https://github.com/unslothai/unsloth/issues/11349)  
- **Link Rendering Bottleneck**: Long lines with backslashes cause seconds-long render delays due to inefficiencies in Marked’s inline tokenizer.  
  🔗 [Issue #11376](https://github.com/unslothai/unsloth/issues/11376)  
- **Optimization Efforts**: PR #11377 and #11373 introduce UI improvements that reduce visual clutter by folding tool calls into thinking blocks and enabling drag-to-reorder sidebar items—indirectly improving UX performance.

---

### **5. Stability & Regressions**  
- **Critical**: **GGUF Load Failure on Non-Conforming Filenames** – The variant resolver incorrectly assumes `{repo}-{variant}.gguf` naming, leading to 500 errors when files don’t match. This breaks remote model loading even when the file exists.  
  🔗 [Issue #11343](https://github.com/unslothai/unsloth/issues/11343)  
- **High Severity**: **MCP Image Parsing Failure** – Tool outputs containing image data are sometimes returned as raw JSON strings instead of parsed images, causing massive token bloat and generation failure.  
  🔗 [Issue #11358](https://github.com/unslothai/unsloth/issues/11358)  
  ✅ *Fix PR*: [PR #11367](https://github.com/unslothai/unsloth/pull/11367) (fails closed on parse error)  
- **Windows Installer Crashes**: PowerShell script fails during rollback due to spaces in Windows usernames (`HOMEPC~1` path resolution).  
  🔗 [Issue #11290](https://github.com/unslothai/unsloth/issues/11290)  
- **Metal GPU Queue Deadlock**: Apple Metal GPU queue stalls cause `SubmissionsIgnored`, leading to cascading failures. PR #11383 adds recovery logic.  
  🔗 [PR #11383](https://github.com/unslothai/unsloth/pull/11383)  

---

### **6. What This Means for Application Developers**  
- **Avoid `v0.1.810-beta`** if using local GGUF inference—performance degradation is confirmed and impactful. Monitor for updates or revert to `v0.1.803-beta`.  
- **Leverage upcoming sandboxing features** (MXC on Windows) for secure agent tool execution—especially critical in managed accounts or regulated environments.  
- **Design around naming conventions**: When deploying custom GGUF models, ensure filenames follow `{repo}-{variant}.gguf` to prevent load failures.  
- **Prepare for improved RAG workflows**: Configurable `UPLOAD_EXTS` (PR #11385) and broader attachment support (PR #11379) will soon allow ingestion of `.pdf`, `.docx`, `.parquet`, `.zip`, and more—expanding document processing scope.  
- **Enhanced API control**: PR #5482 introduces concurrency limits via `UNSLOTH_API_MAX_CONCURRENCY`—ideal for multi-user deployment planning and resource isolation.  
  🔗 [PR #5482](https://github.com/unslothai/unsloth/pull/5482)

---  
*Digest compiled from GitHub activity (2026-09-20–21).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*