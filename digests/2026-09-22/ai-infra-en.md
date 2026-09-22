# AI Infrastructure Digest 2026-09-22

> Generated: 2026-09-22 01:04 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-22**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *hardware diversification, architectural specialization, and agent-centric optimization*. NVIDIA’s Blackwell (SM120) and AMD’s MI355X are now active development targets, driving parallel progress in kernel-level optimizations and disaggregated serving. Projects are increasingly diverging: vLLM and SGLang focus on high-throughput, production-grade inference at scale; llama.cpp prioritizes edge and cross-platform portability; Ollama emphasizes developer-friendly local deployment; LiteLLM consolidates multi-provider routing; and Unsloth accelerates fine-tuning and training stability. The rise of speculative decoding, structured outputs, and long-context models (e.g., Qwen3.8-Flash-Next, GLM-5.3-Flash) signals a shift toward agentic workflows requiring reliability, reproducibility, and low-latency interaction.

---

### **2. Activity Comparison**

| Project       | Issues Open (Today) | PRs Merged (Today) | Release Status        |
|---------------|---------------------|--------------------|------------------------|
| **vLLM**      | 12                  | 5                  | `v0.28.1rc1.dev580+g385dce36b` (testing) |
| **SGLang**    | 15                  | 4                  | No new release         |
| **llama.cpp** | 10                  | 5                  | `b11093` (patched fixes) |
| **Ollama**    | 9                   | 3                  | No new release         |
| **LiteLLM**   | 11                  | 4                  | No new release         |
| **Unsloth**   | 14                  | 3                  | No new release         |

> ✅ *All projects maintain steady momentum with no breaking changes today. vLLM and llama.cpp lead in patch-level activity.*

---

### **3. Model Support Race**

| New Model / Architecture          | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|------------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**             | ✅   | ❌     | ⚠️ (crash at >80K) | ✅ (stable) | ❌      | ⚠️ (MTP abort) |
| **GLM-5.3-Flash-DFlash2**          | ✅   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **Ling-3.0-flash-VL**              | ❌   | ❌     | ✅ (exp.) | ❌     | ❌      | ❌      |
| **Prism Ternary GGUF (PQ2_0/PTQ1_0)** | ❌   | ❌     | ❌        | ✅ (tracking) | ❌      | ❌      |
| **Qwen3-Omni-30B-A3B-Instruct**    | ❌   | ❌     | ❌        | ❌     | ❌      | ✅ (via #11467) |
| **Apple Silicon (MLX + Gemma 4)**  | ❌   | ⚠️ (early) | ✅ (HMX opt.) | ✅ (prompt speedup) | ❌      | ⚠️ (structured output hang) |
| **Intel Arc B70/B60 (Vulkan/ROCm)**| ✅ (bug report) | ✅ (PRs) | ✅ (SYCL/Vulkan) | ⚠️ (crash) | ❌      | ⚠️ (crash) |

> 🏆 **Winner**: **vLLM** leads in cutting-edge model support for next-gen architectures (AMD MI355X, DFlash2), while **Unsloth** is ahead in multimodal reasoning and custom model loading. **Ollama** excels in Apple Silicon and local UX, but lags in advanced quantization and distributed systems.

---

### **4. Performance Frontier**

| Optimization Focus               | vLLM                          | SGLang                        | llama.cpp                     | Ollama                | LiteLLM               | Unsloth                 |
|-----------------------------------|-------------------------------|-------------------------------|-------------------------------|-----------------------|------------------------|--------------------------|
| **KV Cache & Offload**            | ✅ NVFP4 (245K context), P/D   | ✅ PD handoff, HiCache         | ❌                             | ❌                    | ❌                     | ❌                       |
| **Speculative Decoding**          | ✅ DFlash2, MRV2 pipeline      | ✅ MTP, draft layout fixes    | ❌ (crash risk)                | ✅ (`--nodraft` proposal) | ❌ (streaming leak)    | ⚠️ (MTP abort)           |
| **Batching & Parallelism**        | ✅ Sequence parallelism         | ✅ Pipeline parallelism (TTFT) | ✅ MoE LRU cache (GPU-resident) | ✅ MLX prompt speedup | ✅ Group-scoped routing | ⚠️ (auto-padding break)  |
| **Kernel-Level Tuning**           | ✅ FlashInfer + MXFP8 fusion   | ✅ Triton, cuDNN attention    | ✅ Vulkan/F32 load opt, HMX    | ✅ MLX fused kernels  | ✅ Streaming fix         | ⚠️ (Triton LLVM error)  |
| **Quantization & Memory**         | ✅ MXFP8, NVFP4                | ✅ FP8 KV caching             | ✅ `sophia` tokenizer, `no-mmap-prefetch` | ✅ Prism GGUF support | ✅ Cost tracking         | ✅ Kbit prep skip        |

> 🔥 **Frontier Leaders**:  
> - **vLLM** dominates in **ultra-long context** (245K+) and **disaggregated serving**.  
> - **SGLang** is pushing **pipeline parallelism** for 1M+ token inputs.  
> - **llama.cpp** leads in **edge efficiency** (Hexagon/HMX, Vulkan, SYCL).  
> - **Unsloth** focuses on **training robustness** and **memory safety**.

---

### **5. Layer Positioning**

| Project       | Primary Layer               | Key Differentiator                                  |
|---------------|-----------------------------|------------------------------------------------------|
| **vLLM**      | **Serving Engine**          | High-performance, scalable inference; strong ROCm/NVIDIA parity; built for cloud clusters |
| **SGLang**    | **Serving Engine + Gateway**| Agent-aware routing, PD disaggregation, unified cache |
| **llama.cpp** | **Local Runtime / Edge SDK**| Cross-platform, lightweight, GPU/backend agnostic; ideal for mobile/edge |
| **Ollama**    | **Local Gateway / Dev UX**  | Developer-first CLI, MLX/Windows support, structured output integration |
| **LiteLLM**   | **Multi-Provider Gateway**  | Unified API layer, cost control, guardrails, streaming security |
| **Unsloth**   | **Fine-Tuning + Training**  | Fast training, stable crash diagnostics, UI transparency |

> 🧩 *Strategic divergence*: vLLM/SGLang target large-scale inference; llama.cpp/Ollama serve local/embedded use cases; LiteLLM acts as a universal orchestrator; Unsloth is the only project focused on end-to-end training stability.

---

### **6. Trend Signals & Developer Guidance**

#### **Industry Trends Extracted from Today’s Activity**
1. **Hardware Parity Is Now a Competitive Battleground**: AMD (ROCm) and Intel (Vulkan/SYCL) are no longer afterthoughts—vLLM, SGLang, and llama.cpp all have active PRs or issues targeting them.
2. **Agent Workflows Are Driving Stability Demands**: Repeated crashes in tool parsing (Ollama), structured output hangs (MLX), and speculative decoding degeneration (vLLM) signal that agentic reliability is now a core requirement.
3. **Long Context Is No Longer Experimental**: 245K context via NVFP4 (vLLM), 1M+ token TTFT goals (SGLang), and MoE offload optimizations (llama.cpp) show this is a production-grade feature.
4. **Security & Privacy Are Non-Negotiable**: PII masking leaks (LiteLLM), OAuth token exposure (Claude Code), and config file leakage (llama.cpp) highlight growing scrutiny on data handling.
5. **Model Specialization Is Accelerating**: Vision-language (Ling-3.0-flash-VL), ternary GGUFs (Prism), and multimodal reasoning (Qwen3-Omni) indicate demand for niche, high-performance models.

#### **What Application Developers Should Watch**
- **Avoid GLM-5.3-Flash and Qwen3.8-Flash-Next in production** until critical regressions (word salad, decode starvation) are resolved — especially for agents.
- **Prioritize vLLM or SGLang** for high-throughput, long-context inference at scale (e.g., enterprise RAG, document QA).
- **Use llama.cpp for edge/mobile deployments** where performance, memory, and portability matter most.
- **Choose Ollama for rapid prototyping** on Apple Silicon or Windows, but verify structured output stability.
- **Leverage LiteLLM for multi-provider orchestration** — but monitor budget enforcement and PII masking carefully.
- **Monitor Unsloth for training stability**, especially when using mixed GPU setups or emerging models.

> ✅ **Bottom Line**: The infrastructure stack is maturing rapidly—but **stability, reproducibility, and hardware diversity** are now key differentiators. Choose your stack based on *use case, hardware, and agent complexity*, not just raw throughput.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-22**

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate support for next-generation hardware and advanced inference patterns, with key momentum in **ROCm/AMD GPU parity**, **speculative decoding improvements for GLM-5.3-Flash**, and **disaggregated serving (P/D) maturity**. A major focus is on **data integrity in KV offload tiers** and **performance optimization for large context models** like Qwen3.8-Flash-Next and DeepSeek-V4.1 on both NVIDIA and AMD platforms.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The `v0.28.1rc1.dev580+g385dce36b` version remains under active testing, particularly for GLM-5.3-Flash stability.

---

### **3. New Model & Hardware Support**  
- ✅ **AMD MI355X / gfx950**: Performance tracking and optimization PRs launched for `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` (`#57149`).  
- ✅ **ROCm + DFlash2**: First prototype support for `incoai/GLM-5.3-Flash-DFlash2` draft models via speculative decoding (`#56983`).  
- ✅ **Intel Arc B70 (Battlemage)**: Active bug reporting for XPU TP=2 issues on Ubuntu 24.04 HWE (`#41663`), indicating early adoption.  
- ✅ **Multi-modal & Structured Output**: Ongoing work to enable multi-turn conversation support in OpenAI-compatible APIs (`#33089`) and structured generation mode for DiffusionGemma (`#57250`).

---

### **4. Performance & Optimization**  
- 🔥 **SM120 NVFP4 KV Cache**: Working prototype enables **245K context length** on RTX 5090 using `--kv-cache-dtype nvfp4` with FlashInfer kernels (`#49011`).  
- ⚙️ **DFlash2 + DeepSeek-V4.1**: Kernel fusion of MXFP8 GEMM with reduce-scatter improves throughput under sequence parallelism (`#57428`).  
- 📈 **GLM-5.3-Flash**: Reduced sparse MLA preparation overhead via query reuse (`#57458`); ongoing fixes for decode degeneration under CUDA graphs (`#57064`).  
- 🧠 **Speculative Decoding**: Deferred sampled-result receives in MRV2 pipeline (`#53948`) and improved ngram_gpu compile isolation (`#54905`) aim to stabilize long-running speculation.

---

### **5. Stability & Regressions**  
- **Critical**: GLM-5.3-Flash exhibits **repeated-token "word salad" degeneration** in multi-turn agentic use (`#56605`), affecting online agents.  
- **Serious**: Long-prefill workloads on **Qwen3.8-Flash-Next** cause **3–7 minute decode starvation** on 2-node DGX Spark (`#54919`).  
- **High**: **CUDA graph capture** triggers garbage output in **DeepSeek-V3.2 / GLM-5.x** during remote-prefilled decode on ROCm (`#57064`).  
- **Medium**: Silent failure on **ROCm systems without `/dev/shm`** due to unguarded `shutil.disk_usage()` call (`#57891` fix pending).  
- **Fixes in progress**: PRs addressing `nvfp4` integration (`#49011`), DFlash2 draft compatibility (`#56983`), and `persistent_topk` determinism (`#55122`).

---

### **6. What This Means for Application Developers**  
- **Use caution with GLM-5.3-Flash** in production — avoid long-decode or multi-turn agent workflows until `#56605` and `#57064` are resolved.  
- **Leverage NVFP4 and SM120** for ultra-long context (245K+) if using RTX 5090; test thoroughly as this is still experimental.  
- **Enable `--sleep-preserve-parameter-names`** (`#57891`) if using level-2 sleep mode with frozen weights in multimodal or fine-tuned models.  
- **Monitor KV cache pinning** in disaggregated setups using new gauges (`#58004`) to detect decoder stalls.  
- **Expect ROCm support gaps** — many features (e.g., DFlash2, full model coverage) remain in flux; track `#57149`, `#58012`, and `#50519` for updates.

> 🔗 [GitHub Issues Summary](https://github.com/vllm-project/vllm/issues) | [PRs Dashboard](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-22**

---

### **1. Today's Highlights**  
SGLang continues to advance its production-grade inference infrastructure with critical work on **pipeline parallelism**, **prefill-decode disaggregation (PD)**, and **agent-aware KV cache** support. Key PRs include a fix for HiCache staged write-back on Blackwell GPUs and enhanced ROCm support for GLM-5.3-Flash. The CI system remains under active monitoring, with 3 broken and 10 flaky tests reported today.

---

### **2. Releases & Breaking Changes**  
*None.* No new releases or breaking API/config changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **GLM-5.3-Flash on SM120 (Blackwell)**: Tracking ongoing fixes for multi-GPU TP2/W4A16 routing, FP8 KV caching, and MTP support. [Issue #37813](https://github.com/sgl-project/sglang/issues/37813), [PR #39340](https://github.com/sgl-project/sglang/pull/39340)  
- **SenseNova-U1/U1.5**: Official tracking issue opened to integrate support via OpenSenseNova/SenseNova-U1. [Issue #37742](https://github.com/sgl-project/sglang/issues/37742)  
- **ROCm (AMD)**: New PRs enable `aiter allreduce fusion` for GLM models and add support for non-2048 top-k widths in DSA page-table transforms. [PR #39790](https://github.com/sgl-project/sglang/pull/39790), [PR #39340](https://github.com/sgl-project/sglang/pull/39340)  
- **Apple Silicon (MLX)**: Ongoing efforts to add Gemma 4 text generation and MTP speculative decoding. [Issue #32101](https://github.com/sgl-project/sglang/issues/32101), [Issue #32264](https://github.com/sgl-project/sglang/issues/32264)

---

### **4. Performance & Optimization**  
- **Pipeline Parallelism Roadmap**: High-priority effort to reduce TTFT for long-context inputs (e.g., 1M tokens). [Issue #11857](https://github.com/sgl-project/sglang/issues/11857)  
- **Prefill-Decode Disaggregation (PD)**: Progress on seamless P-to-D handoff via token replay and host receive optimization for custom transfer backends. [Issue #21703](https://github.com/sgl-project/sglang/issues/21703), [PR #40238](https://github.com/sgl-project/sglang/pull/40238)  
- **Kernel Optimizations**:  
  - Triton decoding kernels being optimized for long context (current drop from 147.6 → 126.4 tok/s at 2K context). [Issue #2271](https://github.com/sgl-project/sglang/issues/2271)  
  - cuDNN attention backend integration underway for faster attention computation. [Issue #2272](https://github.com/sgl-project/sglang/issues/2272)  
- **UnifiedRadixCache**: Integration of LMCache as an external KV-cache backend; batch radix eviction now deferred to reduce scheduler latency. [PR #38652](https://github.com/sgl-project/sglang/pull/38652), [PR #36370](https://github.com/sgl-project/sglang/pull/36370)

---

### **5. Stability & Regressions**  
- **Critical Bug**: HiCache staged write-back fails on Blackwell GPUs due to incorrect host VA handling in `cudaMemcpyBatchAsync`. [Issue #40232](https://github.com/sgl-project/sglang/issues/40232)  
- **Regression**: FlashInfer backend not supported on Blackwell (SM120) GPUs. [Issue #35080](https://github.com/sgl-project/sglang/issues/35080)  
- **Agent-Aware KV Cache**: Session leaks due to undefined ordering between `abort_cleanup_hook` and `cache_finished_req`. [Issue #40360](https://github.com/sgl-project/sglang/issues/40360)  
- **Incorrect Output**: `include_reasoning=false` still generates reasoning output in responses. [Issue #39103](https://github.com/sgl-project/sglang/issues/39103)  
- **DFLASH Draft Layout Assumption**: Silent position shifts due to unvalidated draft layout convention. [Issue #40144](https://github.com/sgl-project/sglang/issues/40144)

---

### **6. What This Means for Application Developers**  
- **Long-context apps** should monitor pipeline parallelism progress ([#11857](https://github.com/sgl-project/sglang/issues/11857)) for improved TTFT on 1M+ token inputs.  
- **Agents and agentic workflows** will benefit from Phase 1 of agent-aware KV cache ([#24656](https://github.com/sgl-project/sglang/issues/24656)), enabling metadata flow through request lifecycle.  
- **Multi-GPU deployments** must avoid using FlashInfer on Blackwell until [#35080](https://github.com/sgl-project/sglang/issues/35080) is resolved.  
- **Developers targeting Apple Silicon** should expect incremental MLX support for Gemma 4 and MTP — use existing PRs for early testing.  
- **CI instability** (3 broken, 10 flaky tests) may affect deployment reliability; verify builds before production use.  

👉 *Stay tuned for upcoming PD-disaggregation improvements and simulator-based performance tuning tools.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-22**

---

### **1. Today's Highlights**  
The latest updates focus on critical fixes for Metal and CUDA backends, including a mask bounds fix in flash attention (Metal) and a tile compilation error for Volta GPUs (CUDA). New environment variable support enables full runtime control of generation parameters via `LLAMA_ARG_*`, improving integration with systemd and containerized deployments. Performance optimizations continue to target SYCL and Vulkan, especially for Intel Arc and AMD RDNA3 hardware.

---

### **2. Releases & Breaking Changes**  
- **`b11093`**: Fixed flash attention pre-pass mask bounds issue on Metal (`#29220`) — critical for vision-language models using masked attention.  
  🔗 [PR #29220](https://github.com/ggml-org/llama.cpp/pull/29220)  
- **`b11090`**: Resolved CUDA sm_70 tile compilation error due to mismatched `load_ldmatrix` tile shapes (`#29224`).  
  🔗 [PR #29224](https://github.com/ggml-org/llama.cpp/pull/29224)  
- **`b11078`**: Added `LLAMA_ARG_*` env vars to configure `--temp`, `--top-p`, `--min-p`, and penalties — enables declarative server control via `EnvironmentFile`.  
  🔗 [PR #27380](https://github.com/ggml-org/llama.cpp/pull/27380)  
- **`b11077`**: Fixed router mode API key file leakage by unsetting `LLAMA_ARG_API_KEY_FILE` in child processes (`#28938`).  
  🔗 [PR #28938](https://github.com/ggml-org/llama.cpp/pull/28938)

> ✅ *No breaking API changes; all are backward-compatible fixes and enhancements.*

---

### **3. New Model & Hardware Support**  
- **Model Support**: Added experimental support for **Ling-3.0-flash-VL** (124B total / 5.1B active MoE), a hybrid KDA + gated MLA vision-language model (`#29151`).  
  🔗 [PR #29151](https://github.com/ggml-org/llama.cpp/pull/29151)  
- **Hardware Backends**:  
  - **SYCL**: Enhanced graph recording/replay support (`#28725`) and performance tuning for Intel Arc B70 (`#29107`).  
  - **Vulkan**: Optimized F32 A-matrix loading when aligned to 2 elements (`#29254`).  
  - **Hexagon**: New HMX-optimized `GATED_DELTA_NET` kernel improves prompt processing up to **3x** on Galaxy S26/S25/S24 devices (`#29199`).  
  🔗 [PR #29199](https://github.com/ggml-org/llama.cpp/pull/29199)  
- **Quantization**: Added `sophia` pre-tokenizer type (no regex splitting) for GGUF models like `Arain119/sophia` (`#29211`).  
  🔗 [PR #29211](https://github.com/ggml-org/llama.cpp/pull/29211)

---

### **4. Performance & Optimization**  
- **SYCL**: Coalesced MKL-FA softmax loads to avoid one work-item per row, reducing overhead on multi-GPU setups (`#28918`).  
  🔗 [PR #28918](https://github.com/ggml-org/llama.cpp/pull/28918)  
- **Vulkan**: F32 matrix load optimization reduces memory bandwidth pressure on Intel GPUs (`#29254`).  
- **CPU/GPU Offload**: PR `#27861` introduces GPU-resident LRU cache for MoE expert weights offloaded to CPU, targeting decode throughput bottlenecks in large MoE models.  
  🔗 [PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)  
- **Memory Efficiency**: `--no-mmap-prefetch` flag added to skip `MADV_WILLNEED` on Linux, preventing blocking I/O during model load for >100GB models (`#29250`).  
  🔗 [PR #29250](https://github.com/ggml-org/llama.cpp/pull/29250)

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - **Vulkan + Qwen3.8-DFlash/MTP**: OOB token ID = `n_vocab` (248320) crash on gfx1150 (`#28158`).  
    🔗 [Issue #28158](https://github.com/ggml-org/llama.cpp/issues/28158)  
  - **Intel Arc Pro B50/A770 + SYCL**: Multi-GPU crash reported (`#27888`).  
    🔗 [Issue #27888](https://github.com/ggml-org/llama.cpp/issues/27888)  
  - **GPU Firmware Crash**: Imagination PowerVR C-series (Pixel 11 Pro) crashes during prompt processing (`#28214`).  
    🔗 [Issue #28214](https://github.com/ggml-org/llama.cpp/issues/28214)  
- **Regression Reports**:  
  - Severe prompt speed drop after `b10780` on Vulkan/RDNA3 (`#28752`).  
    🔗 [Issue #28752](https://github.com/ggml-org/llama.cpp/issues/28752)  
  - Qwen3.8-27B decode throughput collapses ~25x at context >80K (`#27623`).  
    🔗 [Issue #27623](https://github.com/ggml-org/llama.cpp/issues/27623)  
- **Fixes in Progress**:  
  - `#28725` (SYCL graph replay) and `#29107` (IQ3 code reorder) aim to stabilize Intel Arc performance.  
  - `#27861` (MoE LRU cache) addresses decode latency under host-offloaded expert scenarios.

---

### **6. What This Means for Application Developers**  
- Use `LLAMA_ARG_*` environment variables to fully control inference parameters in production servers (e.g., systemd services), enabling dynamic tuning without CLI reconfiguration.  
- For **multi-GPU or high-context inference**, monitor `b11078+` releases closely — new Vulkan/CUDA fixes may resolve stability issues with Qwen3.8 and DFlash/MTP.  
- If deploying on **mobile or edge devices (Snapdragon, Hexagon)**, prioritize `b11076+` builds: HMX-optimized `GATED_DELTA_NET` delivers **up to 3x faster prompt processing**.  
- Avoid `mmap` prefetching on large models (>50GB) with `--no-mmap-prefetch` to prevent startup hangs.  
- For **vision-language apps**, test Ling-3.0-flash-VL support (`#29151`) and be aware of known image merging bugs in Qwen3 series (`#24303`).  

> 📌 **Pro Tip**: Use `b11093` or later for stable Metal/Vision-Lang pipelines. Monitor `#28158` and `#27623` if using speculative decoding with Qwen3.8.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-22**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to mature with focused improvements in model compatibility, structured output reliability, and backend stability—particularly on MLX and Windows platforms. Key developments include PRs addressing persistent crashes in Qwen3-Coder tool parsing and MLX-based structured output termination, alongside active work on Prism ternary GGUF support and speculative decoding control.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking API/config changes were released.

---

### **3. New Model & Hardware Support**  
- ✅ **Prism Ternary GGUFs (PQ2_0/PTQ1_0)**: Support is actively being tracked via [Issue #18521](https://github.com/ollama/ollama/issues/18521) and [PR #18573](https://github.com/ollama/ollama/pull/18573), which aims to correctly parse unsupported tensor types instead of failing with misleading "size overflow" errors.
- 🖥️ **MLX Engine**: Continued optimization for Apple Silicon (M5 Max), with performance gains observed in prompt processing for Qwen 3.8 ([PR #18550](https://github.com/ollama/ollama/pull/18550)).
- 💻 **Windows**: Fixes underway for `FROM` wildcard handling in `ollama create` ([PR #18572](https://github.com/ollama/ollama/pull/18572)) and image processing issues in gemma4 on Windows ([Issue #16532](https://github.com/ollama/ollama/issues/16532)).

---

### **4. Performance & Optimization**  
- 🔥 **Qwen 3.8 Prompt Speedup (MLX)**: PR #18550 introduces kernel optimizations using MLX’s gated-delta and SwiGLU fusion, resulting in **+18.7%–19.1% faster prompt TPS** at 2k–8k tokens on M5 Max.
- ⚙️ **Speculative Decoding Control**: Proposal for `--nodraft` flag ([Issue #18517](https://github.com/ollama/ollama/issues/18517)) enables developers to disable speculative decoding for debugging and reproducibility.
- 📊 **Benchmarking Improvements**: PR #17480 replaces synthetic prompts with real-world HumanEval code prompts to better reflect draft model behavior during benchmarking.

---

### **5. Stability & Regressions**  
**Critical Issues (High Severity):**  
- ❌ **MLX Structured Output Hangs**: Models on MLX engine emit infinite whitespace after partial JSON output ([Issue #18567](https://github.com/ollama/ollama/issues/18567)), fixed by [PR #18569](https://github.com/ollama/ollama/pull/18569).
- ❌ **Qwen3-Coder Tool Call Parsing Crashes**: Malformed tool calls are returned as errors to clients, breaking agent workflows ([Issue #18563](https://github.com/ollama/ollama/issues/18563)), resolved by [PR #18571](https://github.com/ollama/ollama/pull/18571).
- ❌ **AMD GPU Mixed Architecture Crashes**: MoE models crash on mixed gfx1200 + gfx1201 GPUs due to ROCm kernel mismatch ([Issue #18162](https://github.com/ollama/ollama/issues/18162)) — no fix yet.

**Other Notable Bugs:**  
- 🛑 **Vulkan Crash on AMD RX 6800 XT**: Access violation (`0xc0000005`) when loading any model via Vulkan backend ([Issue #18557](https://github.com/ollama/ollama/issues/18557)).
- 🛑 **Windows Image Processing Failure**: `gemma4` fails to process images despite correct input format ([Issue #16532](https://github.com/ollama/ollama/issues/16532)).

---

### **6. What This Means for Application Developers**  
- **Agent Workflows**: Be cautious with `qwen3coder` and other tool-using models—malformed tool calls may be surfaced as errors, not handled gracefully. Use latest builds with PR #18571 applied.
- **Structured Output**: If using MLX backend with `format: json_schema`, expect potential infinite generation unless patched via #18569. Consider disabling structured output temporarily if stability is critical.
- **Cross-Platform Deployment**: Avoid mixing AMD GPU architectures (gfx1200/gfx1201) for MoE models; test on single-GPU setups. Windows users should avoid Vulkan backend until #18557 is resolved.
- **Model Export/Import**: The new `ollama export/import` commands ([PR #18578](https://github.com/ollama/ollama/pull/18578)) enable offline model transfer—ideal for air-gapped environments.
- **Performance Debugging**: Use `--nodraft` (if available) to isolate speculative decoding effects and ensure deterministic outputs.

> *Recommendation: Monitor PRs #18550, #18569, and #18571 for immediate stability fixes in production-grade agent systems.*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-22**

#### **1. Today's Highlights**  
LiteLLM continues to expand its multi-provider routing and guardrail capabilities with critical fixes to streaming behavior, budget enforcement, and PII masking—especially for Claude Code and Databricks integrations. Key improvements include enhanced UI controls for config protection, presidio output masking now applied to streaming `/v1/messages`, and better cost tracking for OpenRouter and Nebius.

#### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, notable configuration changes are underway:  
- **`config.yaml`-owned settings are now read-only in the UI** ([PR #42374](https://github.com/BerriAI/litellm/pull/42374)) — prevents accidental loss of settings on restart.  
- **Opt-in anonymous usage telemetry is introduced** via `LITELLM_TELEMETRY=true` ([PR #42373](https://github.com/BerriAI/litellm/pull/42373)) — improves visibility into OSS deployment patterns without compromising privacy.

#### **3. New Model & Hardware Support**  
- Added support for **Fal AI’s `flux-lora-depth` image edits** and **`moondream3-preview/query` vision Q&A model** ([PR #42334](https://github.com/BerriAI/litellm/pull/42334)).  
- **OpenRouter**: Added pricing for `typesafe/jev-1.13` and a pass-through route for `/decisions` endpoints ([PR #42301](https://github.com/BerriAI/litellm/pull/42301)).  
- **Meta Model API** now appears in the UI dashboard dropdown ([Issue #36164](https://github.com/BerriAI/litellm/issues/36164), fixed in PR).  

#### **4. Performance & Optimization**  
- **Cost tracking improvements**: Updated pricing for OpenRouter models (`glm-latest` input/output costs reduced by ~7%) and corrected **Nebius provider cost calculation**, which was off by an order of magnitude ([PR #42381](https://github.com/BerriAI/litellm/pull/42381), [Issue #41782](https://github.com/BerriAI/litellm/issues/41782)).  
- **Routing optimization**: Introduced **group-scoped priority routing strategy** ([PR #42378](https://github.com/BerriAI/litellm/pull/42378)), enabling per-group model prioritization without affecting global fallbacks.  
- **Streaming performance**: Fixed stream drops during mid-stream fallbacks ([Issue #28216](https://github.com/BerriAI/litellm/issues/28216)) and improved response handling in `Router.aresponses`.

#### **5. Stability & Regressions**  
**Critical issues reported today (ranked by severity):**  
1. **Claude Code OAuth token leak** when using third-party `api_base`: The client’s subscription token is incorrectly forwarded instead of the configured `api_key` ([Issue #42172](https://github.com/BerriAI/litellm/issues/42172)).  
2. **Presidio PII masking bypasses streaming `/v1/messages`**, exposing sensitive data in real-time outputs ([Issue #42170](https://github.com/BerriAI/litellm/issues/42170), [PR #42351](https://github.com/BerriAI/litellm/pull/42351)).  
3. **Databricks non-GPT models fail with malformed reasoning payload** (`reasoning_effort must be a string`) when `reasoning.summary` is set ([Issue #42347](https://github.com/BerriAI/litellm/issues/42347)).  
4. **Responses→Chat bridge loses native tool calls on multi-turn replay**, leaking internal model reasoning as assistant text ([Issue #42005](https://github.com/BerriAI/litellm/issues/42005)).  
5. **Zero-cost budget bypass allows unbounded spending** if a free model has a paid fallback ([Issue #41344](https://github.com/BerriAI/litellm/issues/41344)).

#### **6. What This Means for Application Developers**  
- **Avoid using `zero_cost_budget_bypass`** with fallback-enabled models—costs may exceed expectations. Use explicit fallback chains or monitor spend closely.  
- **Enable `output_parse_pii: true` only with caution**: Ensure Presidio is properly configured, especially in streaming workflows—recent fixes ([PR #42351](https://github.com/BerriAI/litellm/pull/42351)) now ensure PII is masked even in real-time streams.  
- **Use `request_timeout` carefully**: It does not trigger if upstream never sends the first byte ([Issue #38358](https://github.com/BerriAI/litellm/issues/38358)); consider adding TCP-level timeouts or health checks.  
- **For enterprise use**: Leverage the new **team usage export with per-user breakdown** ([PR #42367](https://github.com/BerriAI/litellm/pull/42367)) to track spend by individual users across shared keys.  
- **Monitor cost discrepancies**: Double-check billing for Nebius and OpenRouter models—pricing updates were recently pushed but may affect existing deployments.

> 🔗 *All issues and PRs linked above are actively being addressed. Developers should upgrade to latest `litellm` versions to benefit from stability and security fixes.*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-22**

---

### **1. Today's Highlights**  
The Unsloth project continues its rapid evolution with a focus on improving UI usability, stability across diverse hardware (especially AMD ROCm and Intel Vulkan), and deeper support for emerging model types like Qwen3-Omni and vision-language models. Critical fixes have been merged to improve error visibility in Studio (e.g., #8804, #11460) and address model loading failures due to missing image processors or config classes (#11469, #11467). Notably, the team is actively working on enhancing diagnostics for training crashes and runtime failures.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several PRs indicate upcoming breaking changes:  
- **#11468**: Disabling auto-padding-free batching for models that don’t accept `packed_seq_lengths` or `**kwargs` — this will prevent `TypeError` during inference if misconfigured. [PR #11468](https://github.com/unslothai/unsloth/pull/11468)  
- **#11469**: Restoring transformers 4.x image processing re-exports to support models like `microsoft/Phi-4-reasoning-vision-15B` that rely on legacy imports. [PR #11469](https://github.com/unslothai/unsloth/pull/11469)  

Developers should audit code paths involving dynamic argument handling and remote code execution when upgrading.

---

### **3. New Model & Hardware Support**  
- **Qwen3-Omni-30B-A3B-Instruct**: Added support via #11467, resolving `ValueError: Unrecognized configuration class`. This enables use of multimodal reasoning models with Omni checkpoints. [PR #11467](https://github.com/unslothai/unsloth/pull/11467)  
- **Intel Arc B60 Vulkan**: Issue #11453 reports `ErrorDeviceLost` mid-generation on dual Intel Arc Pro B60 GPUs using Vulkan backend — indicates instability in current Vulkan driver integration. [Issue #11453](https://github.com/unslothai/unsloth/issues/11453)  
- **AMD Strix Halo + ROCm 7.13.99004**: Performance regression reported on prebuilt `b10079`, suggesting possible kernel or memory layout issues. [Issue #7371](https://github.com/unslothai/unsloth/issues/7371)

---

### **4. Performance & Optimization**  
- **CUDA 13.4 vs Official GGML CUDA 12**: On RTX 5070 Ti (sm_120), bundled Unsloth `b11030-mix` builds are ~5–6x slower than official ggml-org CUDA 12 builds. Likely due to suboptimal kernel compilation or tuning. [Issue #11349](https://github.com/unslothai/unsloth/issues/11349)  
- **Triton LLVM Errors on ROCm**: Training crashes with `LLVM ERROR: Cannot select: intrinsic %llvm.amdgcn.fdot2.bf16.bf16` — suggests kernel selection or IR generation issue in Triton backend. [Issue #11465](https://github.com/unslothai/unsloth/issues/11465)  
- **Optimization Work**: #11494 skips redundant kbit prep in TRL, reducing unnecessary memory pressure (~5 GiB avoided for large models). [PR #11494](https://github.com/unslothai/unsloth/pull/11494)

---

### **5. Stability & Regressions**  
Top regressions by severity:  
1. **MTP Abort on Qwen3.8-Flash-Next** (`b10995-mix`) due to `hc_head_norm` inconsistency after rebasing. Reported in #11143. [Issue #11143](https://github.com/unslothai/unsloth/issues/11143)  
2. **Crash on T4 Kaggle (qwen 3.5 0.8b bf16 training)**: Memory corruption or GPU kernel failure suspected; no fix yet. [Issue #7506](https://github.com/unslothai/unsloth/issues/7506)  
3. **Vulkan MTP Crash**: `GGML_ASSERT(ggml_can_repeat(b, a))` during graph build on RTX 5080. [Issue #11219](https://github.com/unslothai/unsloth/issues/11219)  
4. **Gemma 4 26B A4B QAT >15GB RAM usage** on 16GB system — likely quantization or cache inefficiency. [Issue #11435](https://github.com/unslothai/unsloth/issues/11435)

> ✅ **Fixes in progress**: Several PRs aim to improve error reporting (#8804, #11460) and stabilize load paths.

---

### **6. What This Means for Application Developers**  
- **Expect stricter validation** around model compatibility: future versions will reject unsupported configs (e.g., non-padded models without proper arg handling). Use `trust_remote_code=True` explicitly when loading custom models.  
- **UI improvements are critical**: Features like per-GPU layer visualization (#11475), API key copyability (#11387), and full prompt logging (#11282) signal a shift toward developer transparency and debugging ease.  
- **Avoid reliance on automatic padding-free batching** until #11468 lands — it may break models not designed for packed sequences.  
- **Monitor for AMD/ROCm and Intel Vulkan instability**, especially in production environments. Consider pinning to stable ROCm 6.4+ or avoiding Vulkan for now.  
- **Leverage new tool-result caps** (#11430): Limiting tool output to 256 KB prevents context overflow and improves reliability in agent workflows.

> 🔗 *For real-time updates, follow the [Unsloth GitHub repo](https://github.com/unslothai/unsloth).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*