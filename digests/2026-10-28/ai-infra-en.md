# AI Infrastructure Digest 2026-10-28

> Generated: 2026-10-28 01:35 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Ecosystem Report – 2026-10-28

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is rapidly maturing into a multi-layered, hardware-aware stack optimized for next-generation accelerators like NVIDIA Blackwell (SM120) and AMD MI355X. Projects are converging on key capabilities: high-throughput speculative decoding, efficient KV cache management, and seamless support for multimodal and reasoning-capable models. While vLLM and SGLang lead in distributed inference performance, llama.cpp and Ollama dominate local runtime deployment—especially with GGUF and Apple Silicon. The emergence of LiquidAI’s LFM3 series signals a shift toward on-device audio, vision, and decision-making agents, accelerating the decentralization of intelligent workflows.

---

### **2. Activity Comparison**

| Project       | Issues Open | PRs Merged (Last 24h) | Releases | Key Status |
|---------------|-------------|------------------------|----------|------------|
| **vLLM**      | 172         | 9                      | None     | High stability pressure; critical fixes pending |
| **SGLang**    | 168         | 12                     | None     | Active PD disaggregation push; CI flakiness noted |
| **llama.cpp** | 245         | 11                     | 1 new CLI flag | Stability issues on RTX 5090 & Intel iGPUs |
| **Ollama**    | 214         | 5                      | v0.40.12-rc1 | RC phase; model-specific regressions active |
| **LiteLLM**   | 147         | 7                      | v1.106.5+ (4 releases) | Security-focused; urgent fixes in dev |
| **Unsloth**   | 159         | 6                      | None     | UI/UX refinement; training stability issues |

> *Note: Issue counts reflect open GitHub issues as of 2026-10-28. PRs indicate recent integration activity.*

---

### **3. Model Support Race**

| New Model / Architecture        | Supported By                          | Status & Notes |
|----------------------------------|----------------------------------------|----------------|
| **LFM3-Audio/Omni/Decision (GGUF)** | **llama.cpp**, **Ollama**, **Unsloth** | All three have added foundational support; Ollama still faces MLX runtime errors (#19343). |
| **Qwen3.8-Flash-Next-NVFP4 (SM120)** | **SGLang**, **vLLM**                   | Both actively testing; SGLang has fixed EP2 crash; vLLM blocked by low decode throughput (#56892). |
| **DeepSeek-V4.1-Flash (SM120)**   | **vLLM**                               | Only project supporting it; major throughput issue persists. |
| **AMD MI355X (gfx950)**           | **vLLM**, **SGLang**                   | vLLM leads in FP8/ROCm optimization; SGLang adds HiCache agentic recipes. |
| **Apple Silicon (MLX)**           | **Ollama**, **Unsloth**, **llama.cpp** | Ollama enables concurrent generation; Unsloth adds Flows tooling. |
| **exllama3 engine**               | **Unsloth**                            | Under development; no public release yet. |

> ✅ **Winner**: **llama.cpp** and **Ollama** are leading in *new model* adoption (especially LFM3), while **vLLM** and **SGLang** are ahead in *hardware-specific optimization*.

---

### **4. Performance Frontier**

| Optimization Focus            | Leading Projects                         | Key Developments |
|-------------------------------|------------------------------------------|------------------|
| **KV Cache & Offloading**     | vLLM, SGLang                             | Multi-tier offloading RFC (#38260); hybrid cache improvements in llama.cpp (+7% speed). |
| **Speculative Decoding**      | vLLM, SGLang, llama.cpp                  | vLLM exploring manual fusion; SGLang fixes race conditions; llama.cpp re-instantiates CUDA graphs. |
| **Quantization Efficiency**   | vLLM, llama.cpp, Unsloth                 | W4A16 kernels (AMD); sparse-gather K-cache; FP8 n-gram scale fix under review. |
| **Distributed Serving**       | vLLM, SGLang                             | PD disaggregation default in SGLang; vLLM’s reusable KV compression layer proposal. |
| **Kernel-Level Optimizations**| vLLM, SGLang, llama.cpp                  | CDNAHybridW4A16LinearKernel; W8A16 GEMM for GLM-5.2-FP8; Hexagon TOP_K speedup. |

> 🔥 **Trend**: Hardware-specific kernel tuning (e.g., SM120, gfx950) is now central to performance differentiation.

---

### **5. Layer Positioning**

| Project       | Primary Layer                | Role Summary |
|---------------|------------------------------|--------------|
| **vLLM**      | **High-Performance Inference Engine** | Optimized for large-scale, low-latency serving on datacenter GPUs. Core focus: scalability, efficiency, and multi-GPU coordination. |
| **SGLang**    | **Distributed Inference Framework** | Enables PD disaggregation, agentic scheduling, and high-throughput pipelines. Positioned between engine and gateway. |
| **llama.cpp** | **Local Runtime / Edge Inference** | Dominant choice for on-device, CPU/GPU-accelerated inference. Ideal for privacy-preserving, low-footprint deployments. |
| **Ollama**    | **Model Gateway / Local Server** | Bridges user-facing APIs with backend engines (vLLM, llama.cpp, etc.). Focus: usability, streaming, and model lifecycle management. |
| **LiteLLM**   | **Universal API Gateway**    | Aggregates multiple backends (OpenAI, Anthropic, custom). Prioritizes cost control, routing, and security across providers. |
| **Unsloth**   | **Agent Platform + Training Suite** | Full-stack solution for building, fine-tuning, and deploying local agents. Combines training, inference, and UI. |

> 📌 **Strategic Insight**: The ecosystem is bifurcating—**engineers** use vLLM/SGLang for infrastructure, **developers** use Ollama/liteLLM for APIs, and **builders** use Unsloth for agent workflows.

---

### **6. Trend Signals**

1. **Hardware Specialization Is Now Mandatory**  
   - Critical bugs on SM120 (Blackwell) and MI355X highlight that one-size-fits-all inference won’t work anymore. Developers must choose engines aligned with their target hardware.

2. **Multimodal Agents Are Going Local**  
   - With LFM3 support in llama.cpp, Ollama, and Unsloth, real-time audio, vision, and decision-making are shifting from cloud to edge—driving demand for GGUF and MLX compatibility.

3. **Stability Over Speed**  
   - Despite aggressive optimization pushes, projects are plagued by crashes (RTX 5090, Intel iGPU, macOS Metal). This signals a maturity inflection point: reliability is now a competitive differentiator.

4. **Agent-Centric Architectures Are Emerging**  
   - Features like `OLLAMA_NUM_PARALLEL`, Flows engine, and MCP tooling show that the focus is shifting from single-token inference to long-running, multi-step agent execution.

5. **Security & Cost Control Are Non-Negotiable**  
   - LiteLLM’s security warnings and budgeting fixes reflect growing enterprise concern over cost leakage and supply chain risks in AI stacks.

---

### ✅ **Recommendation for Application Developers**
- **For production inference at scale**: Use **vLLM** or **SGLang** with validated hardware configurations (avoid SM120 until #56892 is resolved).
- **For edge/local deployment**: Choose **llama.cpp** or **Ollama**—but validate quantizations (e.g., `qwen2.5-coder` Q2_K broken) and avoid `lfm3` on MLX until #19343 is fixed.
- **For agent systems**: Leverage **Unsloth** for full-stack autonomy, but monitor training stability on Windows and context overflow issues.
- **For multi-provider routing**: **LiteLLM** remains the gold standard—upgrade to v1.106.5+ to avoid budget miscalculations.
- **Always verify builds**: Especially with LiteLLM and Ollama—security patches are urgent and not always in stable releases.

> 🔗 *Monitor PRs: #56892 (vLLM), #43412 (SGLang), #19343 (Ollama), #47924 (LiteLLM)* — these are your risk indicators.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-28

---

### **1. Today's Highlights**  
The vLLM project is accelerating its support for next-generation hardware, with active development on **SM120 (Blackwell RTX PRO 6000)** and **ROCm gfx950 (MI355X)** performance optimization for Qwen3.8 and DeepSeek-V4.1-Flash models. Critical stability issues are emerging around speculative decoding and KV cache offloading on new architectures, while a major RFC proposes reusable, transferable KV compression layers to enable efficient model storage and migration.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- **SM120 (NVIDIA Blackwell, RTX PRO 6000 Max-Q)**:  
  - Active work on enabling `DeepSeek-V4.1-Flash` on SM120 via #56892 — currently blocked by low decode throughput and unusable CUDA graphs.  
  - [Issue #56892](https://github.com/vllm-project/vllm/issues/56892) | [PR #52487](https://github.com/vllm-project/vllm/pull/52487) (speculative decoding fix)

- **ROCm gfx950 / MI355X**:  
  - Performance optimization roadmap underway for `Qwen3.8-2.4T-A95B`, `Qwen3.8-Flash-Next`, and `Qwen3.8-27B-FP8` (via #57149, #59575).  
  - AMD engineers are actively addressing accuracy collapses under high concurrency (`VLLM_ROCM_USE_AITER=1`) in #60160.

- **New Quantization Support**:  
  - Experimental W4A16 kernel for AMD CDNA GPUs (`gfx942/gfx950`) added in #42640, closing a key gap for GPTQ/AWQ models on ROCm.

---

### **4. Performance & Optimization**  
- **Speculative Decoding**:  
  - A prototype manual fusion of AR+RMSNorm+Quant is being explored (#42597), aiming to reduce kernel launches across TP>1 setups.  
  - A critical POC for dedicated draft pools mitigates hybrid GDN + DFlash cache pool collapse (#59117).

- **KV Cache & Offloading**:  
  - Multi-tier offloading via `OffloadingConnector` is under RFC (#38260), enabling CPU → storage tiering.  
  - Proposal for a reusable, pluggable KV compression layer for transfer/storage (#59538) could drastically reduce bandwidth and storage costs.

- **Kernel-Level Optimizations**:  
  - Sparse-gather variant of `dequantize_and_gather_k_cache` introduced for DeepSeek-V4’s C4A prefill path (#42504), improving memory efficiency.  
  - `CDNAHybridW4A16LinearKernel` added for AMD MI300 series (#42640), targeting better utilization on ROCm.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|------|--------|-----------|
| 🔴 High | #56892 | Extremely low decode throughput on SM120 (Blackwell) with `--enforce-eager`; CUDA graphs unusable | In progress |
| 🔴 High | #60160 | Accuracy collapse at high concurrency on MI355X with `VLLM_ROCM_USE_AITER=1` | Open |
| 🟡 Medium | #63602 | P2P KV offload tier does not fail fast on peer faults | Open |
| 🟡 Medium | #63584 | Rust frontend crashes on `auto` tool parser failure for Qwen3-ASR | Open |
| 🟡 Medium | #63794 | Persian half-spaces (U+200C) stripped from DSv4.1-Flash responses when using tools | Open |

---

### **6. What This Means for Application Developers**  
- **For inference-heavy applications on Blackwell or MI355X**: Avoid deploying `DeepSeek-V4.1-Flash` or `Qwen3.8-*` models until #56892 and #57149 are resolved — expect poor throughput and potential crashes. Use `--enforce-eager` cautiously; it may degrade performance further.
- **For agents using structured output or tool calling**: Be aware of bugs in the Rust frontend (#63584) and Persian text handling (#63794); consider fallbacks or manual post-processing.
- **For long-context or high-throughput systems**: Monitor the upcoming multi-tier offloading and KV compression RFCs (#38260, #59538). These will enable scalable, cost-effective deployment of large models across distributed infrastructures.
- **For performance-sensitive use cases**: Watch for the `CDNAHybridW4A16LinearKernel` and `sparse-gather K-cache` PRs (#42640, #42504), which can significantly improve memory and compute efficiency on supported hardware.

> ✅ **Recommendation**: Pin to stable vLLM releases (e.g., v0.31.0 or later) until these critical fixes land. Use `vllm-rs` only if you’re avoiding tool parsing issues or have verified compatibility with your model.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-10-28

---

### **1. Today's Highlights**  
SGLang continues its aggressive push toward scalable, high-performance inference with major progress in **Prefill-Decode (PD) disaggregation**, **AMD ROCm support for consumer GPUs**, and **speculative decoding stability fixes**. Key PRs include a performance-boosting GEMM kernel for GLM-5.2-FP8 and critical fixes for HiCache race conditions and DSpark crashes on NVFP4 models. The ecosystem is maturing rapidly with new documentation for AMD agentic recipes and improved CI reliability.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- **AMD Consumer GPUs**: Tracking official support for RDNA3 (`gfx1100/gfx1101`) and RDNA4 (`gfx1200/gfx1201`) via #30599 — a strategic move to expand SGLang’s reach beyond datacenter Instinct cards.
- **Qwen3.8-Flash-Next-NVFP4 (SM120)**: Now under active testing and optimization; EP2 crashes fixed in PR #44291 (illegal memory access).
- **Nemotron-3-Embed-1B-BF16/NVFP4**: Added native support via PR #45885 for retrieval-focused embedding workloads.
- **Hunyuan3D**: GPU-side grid generation added to speed up shape export in PR #46905.
- **Apple Silicon (MLX)**: Redesign roadmap (#32321) progressing with Torch-owned SRT path and exported MLX model regions.

---

### **4. Performance & Optimization**  
- **GLM-5.2-FP8 Decode**: A new W8A16 small-M GEMM kernel reduces end-to-end latency by **up to 6.8%** on GB300 (TP4) vs. default W8A8 path, with no increase in VRAM usage (#45862).
- **HiCache Efficiency**: PR #46903 replaces O(k*N) list.pop(0) drains with slice deletion in ack queues — significant perf gain in high-throughput scenarios.
- **Agentic Cache Scheduling**: Roadmap #43098 introduces supernode-wide KV cache sharing across engines, enabling better L1/L2 cache utilization in multi-engine deployments.
- **AMD MI355X FP8 Agentic Recipe**: Documentation updated in PR #46757 to cover both GPU-resident and HiCache bands for Qwen3.5.
- **Memory Pool & Indexer Refactor**: PR #44350 migrates DSA/DSV4 indexers to DeepGEMM’s fp8_fp4 MQA logits API, aligning with upstream changes and improving maintainability.

---

### **5. Stability & Regressions**  
- **Critical Crash in Speculative Decoding (NVFP4)**: PR #43412 reports SIGKILL crashes on first non-greedy request due to FlashInfer JIT failure in bundled cccl vs pip cu13 toolkit mismatch. *Fix pending*.
- **HiCache Race Condition (PD Prefill)**: PR #44070 documents silent stale KV transfer during early cached-prefix send when host-memory-only prefix overlaps — can cause incorrect decode outputs. *Fix merged*.
- **Illegal Memory Access (EP2, SM120)**: PR #44291 identifies crash in Qwen3.8-Flash-Next-NVFP4 with `--tp-size 2 --ep-size 2` on RTX PRO 6000. *Investigation ongoing*.
- **AMD MoE Bias Precision Bug**: PR #44794 reveals that fp32 MoE correction bias is cast to bf16 before fp32 aiter path, affecting GLM-5.x routing accuracy. *Fix required*.
- **CI Flakiness**: Issue #42752 tracks persistent flaky tests and infrastructure failures in PR test workflows — impacting developer velocity.

---

### **6. What This Means for Application Developers**  
- **Build for PD Disaggregation Early**: With PD now default at scale, developers should adopt `SGLANG_DISAGG_PREFILL_EARLY_SEND_CACHED_PREFIX=1` cautiously — monitor for HiCache staleness (#44070).
- **Use Stable Speculative Paths**: Avoid `temperature > 0` on NVFP4 models until #43412 is resolved; stick to greedy (temp=0) or use alternative backends.
- **Leverage AMD & Apple Silicon Support**: If targeting consumer GPUs or Macs, follow the Apple Silicon redesign (#32321) and AMD enablement plan (#30599) for future-ready deployment.
- **Optimize for Low-Latency Inference**: Use the new W8A16 GEMM kernel (PR #45862) for GLM-5.2-FP8 models on Hopper+ — expect measurable latency gains.
- **Monitor CI Health**: Be prepared for intermittent test failures due to flaky CI (#42752); consider local validation before merging.

> 🔗 [View full issue tracker](https://github.com/sgl-project/sglang/issues) | [PRs summary](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-28**

---

### **1. Today’s Highlights**  
The latest updates focus on expanding **multimodal and reasoning capabilities**, with full support for LiquidAI’s LFM3 family (Audio, Omni, and Decision models) added to the model registry. Key infrastructure improvements include dynamic memory management via `--models-memory-max` and enhanced speculative decoding stability through refined MTP layer handling and GPU graph re-instantiation logic.

---

### **2. Releases & Breaking Changes**  
- **New CLI Flag**: `--models-memory-max` (server) enables dynamic unloading of models exceeding a configurable memory threshold, improving multi-model concurrency on constrained systems. [PR #21231](https://github.com/ggml-org/llama.cpp/pull/21231)  
- **API Exposure**: Reasoning effort levels (minimal → max) are now exposed in chat templates via capability probing. This enables fine-grained control over agent behavior across different reasoning modes. [PR #31271](https://github.com/ggml-org/llama.cpp/pull/31271)  
- **Deferred Tool Support**: The `common` module now supports deferred tools and `tool_reference` content parts, enabling richer tool orchestration in agent workflows. [PR #31256](https://github.com/ggml-org/llama.cpp/pull/31256)

---

### **3. New Model & Hardware Support**  
- **New Models Added**:  
  - `LiquidAI/LFM3-Audio-2B`, `LFM3-Omni-2B`, `LFM3-1.7B`, `LFM3-VL-2B` — all GGUF-compatible, supporting audio, vision, and multimodal reasoning.  
  - `LiquidAI/d1-2B`, `d1-omni-2B` — decision models designed for structured output and action selection.  
  [PR #31257](https://github.com/ggml-org/llama.cpp/pull/31257), [PR #31252](https://github.com/ggml-org/llama.cpp/pull/31252), [PR #31275](https://github.com/ggml-org/llama.cpp/pull/31275)  
- **Hardware Backends**:  
  - Vulkan: Fixed `dim 3 broadcast` issue in `MUL_MAT` for LLVMPipe and Intel Gen9.5 iGPU (UHD 630). [PR #31239](https://github.com/ggml-org/llama.cpp/pull/31239)  
  - SYCL: Now enforces VRAM limits during buffer allocation to prevent OOM crashes on Intel Arc B70. [PR #31285](https://github.com/ggml-org/llama.cpp/pull/31285)  
- **Quantization**: Continued work on FP4 rounding modes (`round to even`) and IQ3_S robustness on Blackwell GPUs. [Issue #31012](https://github.com/ggml-org/llama.cpp/issues/31012)

---

### **4. Performance & Optimization**  
- **MoE Cache Improvements**: A new hybrid cache (`ClassLRU`) combining LRFU and MQ-inspired ranking shows **+6% decode speed on QFN** and **+7% on GLM**, with **8% fewer GPU uploads**. [PR #31233](https://github.com/ggml-org/llama.cpp/pull/31233)  
- **Speculative Decoding**:  
  - `--moe-cache-cpu-share auto` improves CPU-GPU balance in MoE models. [PR #31286](https://github.com/ggml-org/llama.cpp/pull/31286)  
  - CUDA graphs now re-instantiate when kernel cluster dimensions change (critical for Hopper SM120). [PR #31284](https://github.com/ggml-org/llama.cpp/pull/31284)  
- **Kernel Optimizations**:  
  - Hexagon backend: Faster `TOP_K` sampling reduces draft latency by up to **42%** in DFlash profiles. [PR #31279](https://github.com/ggml-org/llama.cpp/pull/31279)  
  - Test suite: Speed-up in tensor data generation and model saving via refactored `save_models`. [PR #31145](https://github.com/ggml-org/llama.cpp/pull/31145)

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - **CUDA Graphs Hang** on RTX 5090 Laptop (sm_120): Causes GPU channel hang (RC watchdog + Xid 8). Workaround: `GGML_CUDA_DISABLE_GRAPHS=1`. [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)  
  - **Vulkan GPU Hang** on Intel Gen9.5 iGPU (UHD 630) with `q8_0` KV cache: `vk::Error` escapes as `std::terminate`. [Issue #29054](https://github.com/ggml-org/llama.cpp/issues/29054)  
- **Correctness Bugs**:  
  - Speculative decoding diverges from vanilla output on **quantized targets** (e.g., Q4_K_M) under greedy sampling. Still under investigation. [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618)  
  - Hybrid LFM2 models corrupt recurrent state when co-batching multiple sequences. [Issue #29002](https://github.com/ggml-org/llama.cpp/issues/29002)  
- **Regression Notes**:  
  - Windows CUDA prebuilt binaries stuck at build `b11828` despite advancing release tags. [Issue #31085](https://github.com/ggml-org/llama.cpp/issues/31085)  
  - MSVC fails to detect AVX-VNNI on Intel CPUs. [Issue #28295](https://github.com/ggml-org/llama.cpp/issues/28295)

---

### **6. What This Means for Application Developers**  
- **Build More Capable Agents**: With LFM3 support, developers can now deploy **audio-aware agents** (real-time transcription, voice chat) and **structured decision-making models** directly on-device using llama.cpp. Use `/v1/realtime` with `LFM3-Audio-2B` or `LFM3-Omni-2B`. [PR #31287](https://github.com/ggml-org/llama.cpp/pull/31287)  
- **Tune Memory & Latency Trade-offs**: Use `--models-memory-max` to dynamically manage model loading in multi-user environments. Pair with `--moe-cache-cpu-share auto` for optimal MoE performance.  
- **Avoid Pitfalls**: Disable CUDA graphs (`GGML_CUDA_DISABLE_GRAPHS=1`) if running on RTX 5090 laptops. Avoid `q8_0` KV cache on older Intel iGPUs. Monitor speculative decoding behavior on quantized models—verify outputs carefully.  
- **Future-Proof Builds**: Use `clang-cl` with `-mavx512bf16` only after applying PR #31276 to avoid compilation failures.  

> 🔗 *Stay updated: [llama.app](https://llama.app), [GitHub Releases](https://github.com/ggml-org/llama.cpp/releases)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **1. Today's Highlights**  
Ollama continues to address critical stability issues in model serving, particularly around streaming inference and GPU backend compatibility. Key developments include fixes for LFM3 GGUF support and improved resilience during long-running pulls, while ongoing work focuses on enhancing MLX concurrency and resolving persistent crashes on newer hardware like the RTX 5060 Ti (Blackwell) and AMD Radeon RX 6750 GRE.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, **v0.40.12-rc1** has been active in issue tracking, with several regressions tied to recent changes—most notably the `unknown model architecture: 'lfm3'` error (#19347) and broken `qwen2.5-coder` low-bit quantizations (#18252). Users should exercise caution when upgrading until these are resolved.

---

### **3. New Model & Hardware Support**  
- **LFM3 GGUF**: PR #19344 introduces foundational fixes for running LiquidAI’s LFM3 models via `llama-server`, including proper BOS handling and initial text-to-speech support post-`llama.cpp` bump.  
- **MLX Backend**:  
  - PR #18780 adds **Kolibri 1** support.  
  - PR #19197 enables **concurrent generation** (`OLLAMA_NUM_PARALLEL`) on MLX runners—critical for reducing first-token latency.  
- **Hardware**:  
  - **RTX 5060 Ti (Blackwell)**: CUDA flash-attention kernel crash due to `shared object initialization failed` remains unresolved (#19122); fix under investigation.  
  - **AMD Radeon RX 6750 GRE 10GB (navi23)**: Requested support in #19329; no implementation yet.  
  - **Intel Arc GPUs**: UI visibility of Vulkan acceleration is still lacking (#19301).

---

### **4. Performance & Optimization**  
- **Concurrent Generation**: MLX now supports parallel requests via `OLLAMA_NUM_PARALLEL`, enabling shared projection/FFW computation and reduced wait time for first token (#19197).  
- **Streaming Resilience**: PR #19331 introduces a 15-second heartbeat to keep idle streams alive, preventing silent stalls during long prompt evaluations.  
- **Pull Resumption**: PR #19339 fixes resume failures after server restarts (>1 hour into pull), eliminating `remove ...-partial-0: The system cannot find the file specified` errors (#19337).  
- **Embedding Efficiency**: PR #19334 corrects media ordering in multimodal embeddings (e.g., Gemma 4), fixing assertion failures caused by out-of-order markers.

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|--------|------|--------|------------|
| 🔴 High | `qwen3.8`: "no user query found in messages" (500 error) | Streaming chat breaks mid-query; reproducible with large context prompts | [#17778](https://github.com/ollama/ollama/issues/17778) – Open, 56 comments |
| 🔴 High | `deepseek-v4-flash:0731`: Infinite thinking loop without `</think>` | Agent tasks fail completely; 221 repeated reasoning blocks observed | [#17892](https://github.com/ollama/ollama/issues/17892) – Open, 14 comments |
| 🔴 High | `lfm3-audio:latest`: MLX runtime not available despite support | Prevents model loading on Apple Silicon | [#19343](https://github.com/ollama/ollama/issues/19343) – Open |
| 🟡 Medium | `qwen2.5-coder:3b-instruct` Q2_K/Q3_K_* quantizations: 0% code task success | Functionally broken despite fluent output | [#18252](https://github.com/ollama/ollama/issues/18252) – Open |
| 🟡 Medium | Windows: API connection reset after ~15s with large prompts | Blocks large-context inference workflows | [#19139](https://github.com/ollama/ollama/issues/19139) – Open |
| 🟡 Medium | macOS Metal panic on `mlx runner` | Crashes on M-series Macs during model load | [#19278](https://github.com/ollama/ollama/issues/19278) – Open |

> ✅ **Fixes in progress**: PRs #19339 (pull resume), #19331 (stream heartbeats), #19344 (LFM3 GGUF), #19197 (MLX concurrency).

---

### **6. What This Means for Application Developers**  
- **Avoid `qwen3.8` and `deepseek-v4-flash:0731` in production**—both exhibit severe correctness or infinite-loop bugs in streaming scenarios. Use fallbacks or monitor issue threads closely.  
- **Leverage `OLLAMA_NUM_PARALLEL` with MLX** for faster response times in multi-user setups, but be mindful of memory overhead per concurrent request.  
- **Implement retry logic for long-lived streams**—especially for agents using tools—due to potential silent stalls from idle timeouts.  
- **Validate model quantization quality** before deployment: low-bit `qwen2.5-coder` variants are currently non-functional.  
- **Expect intermittent failures behind DNS64** when pulling from `hf.co`—use `--insecure` or local mirrors if possible (#19345).  
- **Monitor Ollama Cloud limits**: HTTP 413 errors on large coding requests indicate internal payload caps despite advertised context windows (#19155).

> 💡 **Pro Tip**: For local agent development, prefer `gemma4`, `shieldgemma`, or `clef-flash`—these show better stability and tooling integration than newer experimental models.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-28**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem saw a wave of critical fixes focused on cost accuracy, streaming reliability, and security—especially around budgeting logic, model pricing for Databricks OpenJev, and timeout handling in embeddings. Key PRs addressed long-standing issues with `reasoning_effort="none"` behavior on Claude models and ensured proper token counting in streamed `/v1/messages` calls.

---

### **2. Releases & Breaking Changes**  
- **New Releases**: v1.106.5, v1.105.6, v1.104.8, v1.103.10 (all released within last 24h)  
  🔐 *Security Verification Required*: All images must be verified using the same Cosign public key:  
  [https://raw.githubusercontent.com/BerriAI/litellm/e82a3c646908ba0a6ee0beddc4310d7a6cac4065/cosign.pub](https://raw.githubusercontent.com/BerriAI/litellm/e82a3c646908ba0a6ee0beddc4310d7a6cac4065/cosign.pub)  
  ✅ Use the same command for `ghcr.io/berriai/litellm:*`, `litellm-database`, `litellm-non_root`, and `docker.io/litellm/*`.  

- **Upcoming Release Line**: `main` has advanced to **1.109.0.dev1** via #48673; stable release candidates will follow shortly.  
  🔗 [PR #48673](https://github.com/BerriAI/litellm/pull/48673)

---

### **3. New Model & Hardware Support**  
No new models or hardware backends added today. However:  
- **Cloudflare Workers AI** is under active expansion:  
  - Image support (#35055) and audio support (#35056) are pending feature requests.  
  - Current implementation outdated; needs update to reflect expanded API endpoints.  
  🔗 [Issue #21115](https://github.com/BerriAI/litellm/issues/21115), [Issue #35055](https://github.com/BerriAI/litellm/issues/35055), [Issue #35056](https://github.com/BerriAI/litellm/issues/35056)

---

### **4. Performance & Optimization**  
- **Streaming Latency Fix**: `message_start` now correctly reports `input_tokens: 0` only until `message_delta` arrives—fixes incorrect initial metrics in streams.  
  🔗 [Issue #48481](https://github.com/BerriAI/litellm/issues/48481), [PR #48684](https://github.com/BerriAI/litellm/pull/48684)  
- **Timeout Propagation**: Gemini and Vertex AI batch embeddings now respect user-specified timeouts (previously defaulted to 300s).  
  🔗 [PR #47305](https://github.com/BerriAI/litellm/pull/47305), [PR #48690](https://github.com/BerriAI/litellm/pull/48690)  
- **Guardrail Efficiency**: Guardrails that only inspect request metadata no longer block streaming fast path.  
  🔗 [PR #47735](https://github.com/BerriAI/litellm/pull/47735)

---

### **5. Stability & Regressions**  
**Critical Issues Reported**:  
1. **Budget Miscalculation (Virtual Keys)**: `BudgetExceededError` triggered despite spend below budget due to stale data.  
   🔗 [Issue #27735](https://github.com/BerriAI/litellm/issues/27735) — *Fix pending*  
2. **Zero Spend Logging for Streaming Requests**: Streamed calls to non-standard model slugs (e.g., dated Anthropic builds) logged as free despite billing.  
   🔗 [Issue #42161](https://github.com/BerriAI/litellm/issues/42161) — *Fix merged*  
3. **eMudhra CA Trust Issue**: 1.106.x releases still trust compromised emSign ECC Root CA-G3; fix backported to main but not yet in stable.  
   🔗 [Issue #47904](https://github.com/BerriAI/litellm/issues/47904) — *Backport requested to v1.106.3*  
4. **Claude Reasoning Effort Misbehavior**: `reasoning_effort="none"` fails to disable thinking on default-on models like `claude-haiku-5-5`.  
   🔗 [Issue #47924](https://github.com/BerriAI/litellm/issues/47924) — *Fix merged*  

---

### **6. What This Means for Application Developers**  
- **Cost Tracking**: Ensure your virtual keys use updated versions (≥v1.106.5) to avoid false budget overages. Monitor spend logs closely for edge cases involving custom model slugs or streaming.  
- **Streaming Reliability**: If you rely on real-time token tracking (e.g., agent state management), upgrade immediately—`message_start` now reflects accurate usage only after `message_delta`.  
- **Security**: Avoid using unverified 1.106.x Docker images until v1.106.3 is released with eMudhra root CA fix. Always verify signatures.  
- **Future-Proofing**: Prepare for Cloudflare Workers AI expansion by watching #21115 and related issues—expect new image/audio endpoints soon.  
- **Model Customization**: When using decision-capable models, test `reasoning_effort="none"` explicitly—it’s now properly respected.  

🔧 *Recommended Action*: Upgrade to **v1.106.5+** and re-validate all cost/budget logic, especially for multi-model routing and streaming workflows.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-28**

---

### **1. Today's Highlights**  
Unsloth continues to expand its agent and inference ecosystem with major UI/UX refinements in Studio, including full-flux Flows integration, enhanced MCP tooling, and live monitoring improvements. Critical stability fixes address persistent issues with model training on Windows (Recycle Bin flooding) and context overflow handling in Anthropic passthrough. New support for LFM3-1.7B and exllama3 inference engine is under active development.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- **New Model Support**:  
  - 📌 [Issue #15588](https://github.com/unslothai/unsloth/issues/15588): Request to add support for **LFM3-1.7B**, a new expressive backbone from LiquidAI.  
  - 📌 [Issue #15473](https://github.com/unslothai/unsloth/issues/15473): Bug report with **Gemma 4 26B MLX** model producing `<unused6226>` tokens on macOS.  
- **Hardware & Backend Support**:  
  - 📌 [Issue #15583](https://github.com/unslothai/unsloth/issues/15583): Intel Arc B580 GPU (Intel XPU) support requested via `unsloth` desktop app.  
  - 📌 [Issue #15444](https://github.com/unslothai/unsloth/issues/15444): AMD GPUs not detected on mixed NVIDIA-AMD Linux systems when using custom `llama.cpp`.  
  - 📌 [Issue #15405](https://github.com/unslothai/unsloth/issues/15405): Resume failure for `Qwen3.5-2B` due to missing `model.safetensors-00001-of-00001.safetensors` file during load.

---

### **4. Performance & Optimization**  
- ✅ **Flows Engine Improvements**:  
  - [PR #15611](https://github.com/unslothai/unsloth/pull/15611): Fine-tune node now includes hold-out split, live status tracking, and loss sparkline — enabling real-time training feedback.  
  - [PR #15609](https://github.com/unslothai/unsloth/pull/15609): Rebuilt Flows UI using Studio’s component library for consistent theming and performance.  
- ⚙️ **Inference Engine Enhancements**:  
  - [PR #15633](https://github.com/unslothai/unsloth/pull/15633): Investigating `offload_layers` failure on `Qwen3.8-Flash-Next` due to CPU-kept n-gram table blocking Block Swap.  
  - [PR #15632](https://github.com/unslothai/unsloth/pull/15632): Fix for FP8 n-gram table scale misalignment causing incorrect key projection input types.  
- 🔬 **Benchmarking Tools**:  
  - [PR #12522](https://github.com/unslothai/unsloth/pull/12522): Added `llama-bench` tab to benchmark GGUF prompt throughput and generation speed.  
  - [PR #12521](https://github.com/unslothai/unsloth/pull/12521): Introduced Evals tab with `lm-eval-harness` integration for MMLU, GSM8K, TruthfulQA scoring.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | PR/Link |
|--------|------|--------|--------|
| High | Studio floods Windows Recycle Bin with `*.db-wal`/`*.db-shm` files every second during training | Open | [Issue #15552](https://github.com/unslothai/unsloth/issues/15552) |
| High | `Anthropic passthrough (/v1/messages)` fails with context overflow instead of auto-compaction | Open | [Issue #15417](https://github.com/unslothai/unsloth/issues/15417) |
| Medium | `Deep Research` mode ignored by Gemma-4-26B-A4B; no web search triggered | Open | [Issue #15581](https://github.com/unslothai/unsloth/issues/15581) |
| Medium | Image edit unavailable in `unsloth/flux-3-image-klein-GGUF` on macOS | Closed | [Issue #15241](https://github.com/unslothai/unsloth/issues/15241) |
| Low | Download toast shows original filename after rename | Open | [Issue #15621](https://github.com/unslothai/unsloth/issues/15621) |

> 🔧 **Fixes in Progress**:  
> - [PR #15570](https://github.com/unslothai/unsloth/pull/15570): Added confirmation dialog before clearing transcript history (fixes accidental deletion).  
> - [PR #15601](https://github.com/unslothai/unsloth/pull/15601): Preserves checkbox states when importing HTML task lists into knowledge base.

---

### **6. What This Means for Application Developers**  
- **Agent Builders**: The ongoing work on **native multi-agent orchestration** ([#10776](https://github.com/unslothai/unsloth/issues/10776)) and **MCP tool integration** ([#14348](https://github.com/unslothai/unsloth/pull/14348), [#15629](https://github.com/unslothai/unsloth/pull/15629)) enables deeper local agent autonomy. Expect future support for Supervisor/Subagent workflows and direct access to built-in tools like browser use and file operations.
- **Model Integrators**: Be aware that **FP8 quantization** and **n-gram table handling** remain fragile on newer models like `Qwen3.8-Flash-Next`. Monitor PRs #15632 and #15633 for fixes before deploying production pipelines.
- **UI/UX Designers**: The shift toward unified component libraries (`@/components`) across Flows and Studio ([#15609](https://github.com/unslothai/unsloth/pull/15609)) ensures consistency — leverage this for building plug-and-play integrations.
- **Performance Tuners**: Use the new **Evals** and **Benchmarks** tabs to compare model performance across quantizations and speculative decoding settings. These tools are essential for optimizing latency-cost tradeoffs in production deployments.

---  
*Digest compiled from GitHub activity: unslothai/unsloth — 2026-10-28*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*