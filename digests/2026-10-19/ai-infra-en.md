# AI Infrastructure Digest 2026-10-19

> Generated: 2026-10-19 00:24 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-19**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *high specialization and hardware-aware optimization*, driven by the rollout of Blackwell (SM120) GPUs, MoE/quantized model proliferation, and demand for agent-native orchestration. Projects are diverging in focus: vLLM and SGLang are pushing the envelope in high-throughput, low-latency speculative decoding; llama.cpp and Unsloth emphasize lightweight, cross-platform runtime efficiency; Ollama and LiteLLM serve as integrative gateways with growing cloud and security concerns. Critical stability issues on new hardware—especially SM120 and AMD RDNA4—highlight the fragility of early adopter tooling, while advanced features like structured outputs (`/systemone`) and MCP agent frameworks signal a shift toward production-grade autonomous systems.

---

### **2. Activity Comparison**  

| Project       | Issues Open (Today) | PRs Merged (Today) | Release Status         |
|---------------|---------------------|--------------------|------------------------|
| **vLLM**      | 8                   | 5                  | v0.32.0 live (critical fixes) |
| **SGLang**    | 7                   | 6                  | v0.5.22 stable (no new release) |
| **llama.cpp** | 6                   | 4                  | b11721–b11720 active (patch series) |
| **Ollama**    | 5                   | 3                  | v0.40.7-rc0 (release candidate) |
| **LiteLLM**   | 4                   | 5                  | v1.107.0-rc.1 & v1.106.0 (security-focused) |
| **Unsloth**   | 5                   | 4                  | No new release (beta updates) |

> ✅ **Key Insight**: vLLM leads in *active issue volume* due to SM120 hardware regressions; LiteLLM and SGLang show strong *PR velocity* around security and streaming correctness. Ollama’s RC status reflects cautious progression amid cloud instability.

---

### **3. Model Support Race**  

| New Model / Architecture             | vLLM       | SGLang     | llama.cpp  | Ollama     | LiteLLM     | Unsloth        |
|--------------------------------------|------------|------------|------------|------------|-------------|----------------|
| **NVIDIA Nemotron 3.5 ASR Streaming (0.6B)** | ✅        | ❌         | ❌         | ❌         | ❌          | ❌             |
| **DeepSeek-V4.1-Flash**              | ✅ (default `POST /systemone`) | ✅ (megakernels, encoder-bounded replay) | ⚠️ (speculative decoding divergence) | ✅ (cloud regression) | ❌           | ❌             |
| **Qwen3.6-27B-NVFP4**                | ⚠️ (NVFP4 MoE corruption on SM120/Hopper) | ✅ (LoRA support) | ✅ (Q4_K_M divergence) | ⚠️ (context crash) | ❌           | ❌             |
| **Mamba-2 Hybrid**                   | ❌         | ❌         | ❌         | ❌         | ❌          | ✅ (extension-free wheel) |
| **PPLX Decider v1.2**                | ❌         | ❌         | ❌         | ✅ (MLX)   | ❌          | ❌             |
| **OceanToken (oceantoken/<model>)**  | ❌         | ❌         | ❌         | ❌         | ✅ (new provider) | ❌             |

> 🏆 **Winner**: **SGLang** and **vLLM** lead in DeepSeek-V4.1 integration and MoE/quantization support. **Unsloth** is ahead in novel architectures (Mamba-2), while **LiteLLM** leads in *provider diversity* (OceanToken).

---

### **4. Performance Frontier**  

| Focus Area               | Leading Projects                          | Key Developments                                                                 |
|--------------------------|-------------------------------------------|----------------------------------------------------------------------------------|
| **KV Cache & Scheduling** | vLLM, SGLang                              | Fixed hybrid GDN prefix-cache loss; fused TP all-reduce + MoE finalize kernels |
| **Speculative Decoding** | SGLang, vLLM, llama.cpp                   | NGRAM corruption fixes; CUDA graph replayability; MoE routing optimizations     |
| **Quantization Efficiency** | llama.cpp, Unsloth, SGLang             | SYCL Q8_0 dequant speedups (+636.9 GB/s); NVFP4 MoE LoRA on Marlin; FP8 projections |
| **Kernel Fusion & Layout** | vLLM, llama.cpp, SGLang                 | Fused `SCALE → SIGMOID → HC_POST`; `q_rope_store` into `fused_q_norm_rope`; megakernels |
| **Distributed Serving**   | vLLM, SGLang                              | TP-agnostic KV offloading (vLLM roadmap); multi-GPU scheduling improvements       |
| **Memory Management**     | Unsloth, SGLang                           | Shared read event reuse; "Always" model keep-alive mode; GPU memory tracking     |

> 🔥 **Trend**: The frontier is shifting from *batching* to *kernel-level fusion*, *stateful scheduling*, and *hardware-specific kernel tuning*. Blackwell (SM120) is now a primary testbed for correctness and throughput.

---

### **5. Layer Positioning**  

| Project       | Core Layer                     | Primary Function                                                                 |
|---------------|--------------------------------|----------------------------------------------------------------------------------|
| **vLLM**      | **Inference Engine**           | High-performance, scalable LLM serving with advanced scheduling and quantization |
| **SGLang**    | **Inference Engine + Agent Orchestrator** | Production-grade spec dec, model routing, and agent logic via `/systemone` and MCP |
| **llama.cpp** | **Local Runtime / Cross-Platform Engine** | Lightweight, portable inference across CPU, GPU, NPU; optimized for edge and embedded |
| **Ollama**    | **Model Gateway / Local Server** | Unified CLI/API for local models; developer-friendly abstraction layer           |
| **LiteLLM**   | **API Gateway / Orchestration Layer** | Multi-provider routing, caching, security hardening, and observability            |
| **Unsloth**   | **Agent Framework + Runtime** | Full-stack agent orchestration, fine-tuning, UI, and model management (Studio)   |

> 📊 **Strategic Mapping**:  
> - **vLLM/SGLang**: Infrastructure backbone for high-scale, complex agents.  
> - **llama.cpp/Unsloth**: Edge and on-device inference champions.  
> - **Ollama/LiteLLM**: Developer-facing glue layers enabling rapid prototyping and multi-cloud deployment.

---

### **6. Trend Signals**  

#### **Emerging Industry Trends (from 2026-10-19 activity):**
1. **Hardware-Aware Optimization Dominance**: SM120 (Blackwell) issues are not isolated—they’re systemic. vLLM, SGLang, and llama.cpp all report critical performance and correctness bugs, signaling that *new GPU architectures require deep backend rewrites*, not just driver updates.
2. **Structured Outputs Are Now Standard**: vLLM’s `POST /v1/systemone` enables stateful decision-making without external orchestrators—this marks a **shift from prompt engineering to embedded agent logic**.
3. **MoE + Quantization = Stability Crisis**: NVFP4 MoE models (DeepSeek-V4.1, Qwen3.6) exhibit silent corruption on Hopper/Blackwell. This suggests **MoE quantization remains fragile**, requiring careful backend selection and validation.
4. **Security & Observability Are Non-Negotiable**: Signed Docker images (LiteLLM), API key bypasses (SGLang), and seed precision loss (Ollama) highlight that *production-grade trust* demands cryptographic verification, input sanitization, and deterministic behavior.
5. **Agent-Centric Design Is Mainstream**: Unsloth’s MCP agents, SGLang’s `overlap_scheduler`, and vLLM’s `/systemone` show that **infrastructure is no longer just about serving tokens—it’s about managing state, tools, and reasoning chains**.

#### **What Application Developers Should Watch:**
- ✅ **Avoid `--enforce-eager` on Blackwell GPUs** until vLLM fixes SM120 graph capture.
- ✅ **Validate speculative decoding output consistency** when using quantized draft models (e.g., Q4_K_M).
- ✅ **Use `VLLM_BATCH_INVARIANT=1`** for reproducible pipelines (RLHF, A/B testing).
- ✅ **Verify FP8 model compatibility before load**—Unsloth now silently falls back to `bf16`.
- ✅ **Monitor `seed` values ≤ 2^53** to avoid collision in Ollama.
- ✅ **Leverage `oceantoken` and `MCP agents`** for hybrid, multi-provider agent workflows.

> 💡 **Bottom Line**: The infrastructure is maturing fast—but only for those who treat it as a *systemic stack*, not just a collection of APIs. Prioritize **correctness over speed**, **security over convenience**, and **agent resilience over raw throughput**.

---  
**Prepared by:** Senior AI Infrastructure Analyst — October 19, 2026

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-19**

#### **1. Today’s Highlights**  
The vLLM v0.32.0 release introduces a new `POST /v1/systemone` endpoint for structured decision-making over complex state, now enabled by default. This marks a major step toward enabling advanced AI orchestration in production systems. Meanwhile, critical fixes are underway for Blackwell (SM120) GPU performance and correctness issues affecting DeepSeek-V4.1-Flash and Qwen3.6-27B-NVFP4.

#### **2. Releases & Breaking Changes**  
- **v0.32.0** is now live with 814 commits from 363 contributors (121 new).  
  - ✅ `POST /v1/systemone` is now served by default for `choice`, `noul`, and `score` queries over structured state ([#59299](https://github.com/vllm-project/vllm/issues/59299), [#60677](https://github.com/vllm-project/vllm/issues/60677)).  
  - 🚫 Removed obsolete `VLLM_USE_RAY_V2_EXECUTOR_BACKEND` environment variable ([#62228](https://github.com/vllm-project/vllm/pull/62228)).

#### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Added support for **NVIDIA Nemotron 3.5 ASR Streaming (0.6B)** via [PR #47455](https://github.com/vllm-project/vllm/issues/47455).  
  - Expanded model registry sync: 8 new models added to `supported_models.md`, including `Llama4ForCausalLM`, `Glm5NextForCausalLM`, and `Inkling*` variants ([#62361](https://github.com/vllm-project/vllm/pull/62361)).  
- **Hardware & Backend**:  
  - **ROCm**: MI355 DP+EP exit-time abort containment ([#62286](https://github.com/vllm-project/vllm/pull/62286)), improved MoRIIO dummy-weight testing ([#62280](https://github.com/vllm-project/vllm/pull/62280)).  
  - **CPU**: Experimental MRV2 CPU inference without Triton via Numba transpilation ([#60924](https://github.com/vllm-project/vllm/pull/60924)).  
  - **Intel GPU**: Per-token dynamic FP8 activation quantization for XPU ([#61362](https://github.com/vllm-project/vllm/pull/61362)).

#### **4. Performance & Optimization**  
- **DeepSeek-V4.1-Flash**: Achieved bitwise batch-invariant behavior under CUDA graphs (FULL_AND_PIECEWISE) across DEP4, DSpark MTP, and MegaMoE configurations ([#62365](https://github.com/vllm-project/vllm/pull/62365)).  
- **Beam Model**: Fused TP all-reduce with sandwich norms and MoE finalize kernels for reduced overhead ([#62366](https://github.com/vllm-project/vllm/pull/62366)).  
- **KV Cache & Scheduling**: Fixed hybrid GDN prefix-cache hit loss under MTP speculative decoding ([#52244](https://github.com/vllm-project/vllm/pull/52244)); addressed re-walking of prefix cache on every scheduling step ([#61604](https://github.com/vllm-project/vllm/issues/61604)).

#### **5. Stability & Regressions**  
Critical stability issues reported today, primarily on **Blackwell (SM120)** GPUs:
- **Extremely low decode throughput** on RTX PRO 6000 Blackwell with `--enforce-eager` and unusable CUDA graphs ([#56892](https://github.com/vllm-project/vllm/issues/56892)).  
- **Xid 31 illegal memory access** during long prefill (>35K tokens) with DeepSeek-V4.1-Flash + FlashInfer 0.7.0 ([#58910](https://github.com/vllm-project/vllm/issues/58910)).  
- **NVFP4 MoE garbage output** on SM120 and Hopper (sm90) with Marlin FP4-MoE backend ([#47365](https://github.com/vllm-project/vllm/issues/47365), [#49070](https://github.com/vllm-project/vllm/issues/49070)).  
- **Speculative decoding crashes** due to FLEX_ATTENTION backend segfaults ([#61330](https://github.com/vllm-project/vllm/issues/61330), [#61337](https://github.com/vllm-project/vllm/issues/61337)).  
> 🔴 *Fix PRs exist for some issues (e.g., #62365, #61002), but SM120-specific kernel issues remain high-priority.*

#### **6. What This Means for Application Developers**  
- **Structured outputs** via `/systemone` enable richer agent logic—use it to build stateful decision engines without external orchestrators.  
- **Avoid `--enforce-eager` on Blackwell GPUs** until SM120 graph capture is fixed; prefer eager mode only if latency is not critical.  
- **Use `VLLM_BATCH_INVARIANT=1`** for deterministic inference pipelines (e.g., RLHF, A/B testing) with DeepSeek-V4.1-Flash.  
- **Be cautious with NVFP4 MoE models on Hopper/Blackwell**—expect silent corruption or crashes unless using stable backends.  
- **Enable `--tool-call-parser qwen3_xml` only with proper `<tool_call>` wrappers**—unwrapped calls may be misparsed ([#62364](https://github.com/vllm-project/vllm/pull/62364)).  

> 💡 *Monitor vLLM's Q4 2026 roadmap ([#61024](https://github.com/vllm-project/vllm/issues/61024)) for upcoming TP-agnostic KV offloading and specialized kernel standardization.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-19**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to accelerate its focus on DeepSeek-V4.1 optimization and speculative decoding robustness, with critical PRs addressing CUDA graph correctness in NGRAM speculative decoding (fixing #44997) and enabling NVIDIA megakernels for improved decode throughput. Concurrently, the team is advancing LoRA runtime support across multiple backends—including NVFP4 MoE on Marlin—laying groundwork for high-performance, low-latency fine-tuning.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The latest stable version remains `v0.5.22`, with ongoing work targeting stability improvements in speculative decoding and multi-GPU scheduling.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1**: Major progress in integration, including support for:
  - External linker pools via #44623
  - Encoder-bounded replay for image requests (#45048)
  - NVIDIA megakernels via #44945 (new `--enable-nvidia-megakernel` flag)
- **AMD ROCm**: Opt-in PTPC FP8 projections added for GLM5 on gfx950 (#33602)
- **LoRA Runtime Stack**: Full support for NVFP4 MoE LoRA on Marlin backend (PRs #42888–#42883), with CuTeDSL tile tables and GEMM kernels now available for SM90/SM100.
- **Hardware Backends**: Continued expansion of support for GB300, B200, H200, and Blackwell-based systems (sm_120), with attention to memory layout and kernel fusion.

---

### **4. Performance & Optimization**  
- **Speculative Decoding**: Fix for NGRAM corruption in radix-cached KV under overlap scheduler (#45049), restoring correctness when using CUDA graphs.
- **CUDA Graphs**: Breakable prefill graphs now replayable at any context length (up to 16k default) via #43733, reducing eager fallbacks on GB300.
- **MoE & Quantization**: Optimized routing logic and contract derivation (#44994–#44991) improve load balancing and reduce redundant computations in mixed-precision MoE models.
- **Memory Efficiency**: Reuse of shared read events after KV cache compaction reduces GPU idle time; `shared_read_done_event` refresh ensures correct synchronization (#45049).
- **Kernel Fusion**: Fused `q_rope_store` into `fused_q_norm_rope` (#41657), improving prefill efficiency by reducing kernel launches.

---

### **5. Stability & Regressions**  
- **Critical (High Priority)**:  
  - **NGRAM Speculative Decoding Corruption** (#44997): Incorrect outputs observed when `overlap_scheduler` + `radix_cache` + `cuda_graphs` are enabled. *Fixed in PR #45049*.  
  - **FP8 Block-Quantized Checkpoint Errors** (#45000): Intermittent wrong tokens with overlap scheduler on RTX 3090 (SM86). *Fix pending*.
- **Moderate Severity**:  
  - **Server Hang After Pause/Abort** (#44835): `pause_generation(abort)` followed by `release_memory_occupation` causes hang until watchdog kill. *No fix yet*.
  - **CI Runner Disk Failure** (#44479): Self-hosted runner `5090-vast-no-0` failed due to disk exhaustion; job failures started Oct 15. *Resolved via cleanup or replacement*.
- **Minor/Regression-Related**:  
  - **Data-plane API Key Bypass** (#45006): Unauthorized access possible via mesh HA routes in `sgl-model-gateway`. *Security risk — urgent review needed*.

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding**: Avoid `speculative_algorithm="NGRAM"` with `overlap_scheduler` and `cuda_graphs` unless you’ve applied the fix from #45049 (or updated to a patched build).
- **Leverage new DeepSeek-V4.1 optimizations**: Enable `--enable-nvidia-megakernel` and `--enable-encoder-swa-bounded-replay` for better image and long-context performance.
- **Prepare for advanced LoRA workflows**: With full NVFP4 MoE LoRA support now merged, developers can deploy highly efficient, low-latency fine-tuned agents on modern GPUs.
- **Monitor memory and disk usage**: CI infrastructure instability highlights the need for robust resource monitoring in production deployment pipelines.
- **Secure your gateways**: Address the authorization bypass in `sgl-model-gateway` immediately—this is a potential vector for abuse in multi-tenant environments.

> 🔗 [View Issue #44997](https://github.com/sgl-project/sglang/issues/44997) | [PR #45049 (Fix)](https://github.com/sgl-project/sglang/pull/45049)  
> 🔗 [Issue #45006 (Security)](https://github.com/sgl-project/sglang/issues/45006) | [PR #44945 (Megakernels)](https://github.com/sgl-project/sglang/pull/44945)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

---

### **1. Today's Highlights**  
The latest updates in `llama.cpp` focus on critical performance and correctness improvements across multiple backends, particularly for Vulkan and SYCL on Intel/AMD hardware. Key developments include a major fusion optimization for Qwen4-Exp’s HC_POST gate chain (CUDA/Vulkan), enhanced support for non-contiguous tensor operations (CPU/CUDA/Vulkan/WebGPU), and significant dequantization speedups on Intel Arc GPUs via SYCL. These changes collectively improve inference efficiency and stability—especially for MoE models and speculative decoding workflows.

---

### **2. Releases & Breaking Changes**  
- **`b11721`**: Introduced fused `SCALE → SIGMOID → SCALE → HC_POST` chain for Qwen4-Exp, enabling faster inference via GPU kernel fusion (#30602). Requires updated model GGUFs with compatible weight layouts.
- **`b11720`**: Added full support for **non-contiguous SUM** operations across CPU, CUDA, Vulkan, and WebGPU backends (#28851), which may affect users relying on view-based tensor slicing in custom kernels.
- **`b11718`**: Restored ESIMD kernels on FFN path for Intel CPUs, including Q8_0 quantization support (#30239) — essential for optimal performance on newer Intel processors.

> 🔗 [GitHub Release b11721](https://github.com/ggml-org/llama.cpp/releases/tag/b11721) | [PR #30602](https://github.com/ggml-org/llama.cpp/pull/30602)

---

### **3. New Model & Hardware Support**  
- **Hexagon**: Added support for **hadamard MUL_MAT** and **GET_ROW** operations for flat/tiled Q1_0 and Q2_0 quantizations (#30627), expanding on-device AI capabilities for Qualcomm Snapdragon NPU platforms.
- **SYCL / Intel Arc Pro B70**: Experimental but impactful optimizations now enable higher throughput for `Q8_0` dequantization (up to **+636.9 GB/s raw bandwidth**) via new fast-dequant kernels (#30775).
- **Vulkan**: Improved flash attention tile selection logic derived from device capabilities (e.g., Intel BMG DPAS atoms), avoiding fallback to scalar paths (#30351).

> 🔗 [PR #30627](https://github.com/ggml-org/llama.cpp/pull/30627) | [PR #30351](https://github.com/ggml-org/llama.cpp/pull/30351)

---

### **4. Performance & Optimization**  
- **SYCL (Intel Arc B70)**: `Q8_0` dequantization improved by **~200 GB/s** (from 437.4 → 636.9 GB/s), yielding **2.11–5.5% increase in tokens/sec** without PPL degradation (#30775).
- **Vulkan (FirePro D700)**: Speed-up of **Q4_0 KV cache** in flash attention via optimized dequant + transpose path; previously very slow due to inefficient memory access (#30738).
- **CUDA (ROCm/AMD)**: Tuned GCN MMQ configurations for better occupancy and reduced launch overhead on AMD GPUs (#30021).
- **OpenCL**: Added `dp4a` GEMM variants for int4 quantized models (Q4_0/Q8_0/Q4_K etc.), improving performance on Adreno devices when lib is not available (#30753).

> 🔗 [PR #30775](https://github.com/ggml-org/llama.cpp/pull/30775) | [PR #30738](https://github.com/ggml-org/llama.cpp/pull/30738)

---

### **5. Stability & Regressions**  
Critical issues reported today highlight instability in speculative decoding and backend-specific hangs:

| Severity | Issue | Summary | Status |
|--------|------|--------|--------|
| ⚠️ High | [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) | Greedy sampling diverges during speculative decoding on **quantized targets** (e.g., Q4_K_M), while matching on bf16. Affects draft-mtp/draft-dspark. | Open (31 comments) |
| ⚠️ High | [#27329](https://github.com/ggml-org/llama.cpp/issues/27329) | **Decode hang** on RTX 5090D (Blackwell sm_100) with Qwen3.8-27B-NVFP4 — CPU spins, no GPU work observed. | Open (6 comments) |
| ⚠️ Medium | [#28056](https://github.com/ggml-org/llama.cpp/issues/28056) | **KV-cache contamination** on integrated GPUs (AMD Strix Halo) due to race conditions in zero-copy graph inputs. Leaks conversation context across unrelated requests. | Closed |
| ⚠️ Medium | [#29892](https://github.com/ggml-org/llama.cpp/issues/29892) | ~12% prefill regression on RDNA4 (RX 9070 XT) since MoE-aware tile selection change (#29182). | Open (2 comments) |

> ✅ Fix PRs exist for some regressions (e.g., #28056 closed), but speculative decoding divergence remains unresolved.

---

### **6. What This Means for Application Developers**  
- **Use `--split-mode tensor` cautiously**: Recent crashes in `--split-mode tensor` (e.g., #29466) suggest it may still be unstable on older GPUs like Tesla P100. Prefer `--split-mode layer` until further validation.
- **Optimize for speculatively decoded models**: If using **draft-model** speculative decoding (e.g., MTP/DSPARK), avoid quantized targets like Q4_K_M unless you verify output consistency against vanilla runs (see #25618).
- **Leverage new backends strategically**: For Intel Arc B70 systems, use **SYCL builds** with `Q8_0` or `IQ*` quantizations for best performance. On AMD RDNA4, monitor prefill latency if upgrading past v0.4.0.
- **Enable non-contiguous SUM early**: If your app uses complex tensor views (e.g., in tool calling or multi-batch processing), ensure you're on `b11720+` to prevent silent errors or performance loss.
- **Monitor server health**: The `/metrics` scraping issue (#29104) can cause silent stalls under high load — consider rate-limiting scrapers or using alternative monitoring tools.

> 💡 **Pro Tip**: Always test quantized models with `temperature=0`, `top_k=1`, and speculative decoding enabled before production deployment.

--- 

**Sources**:  
- [GitHub Releases](https://github.com/ggml-org/llama.cpp/releases)  
- [Issues Dashboard](https://github.com/ggml-org/llama.cpp/issues)  
- [Pull Requests](https://github.com/ggml-org/llama.cpp/pulls)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-19**

---

### **1. Today's Highlights**  
Ollama v0.40.7-rc0 introduces critical improvements for speculative decoding and OpenAI-compatible response handling, while multiple PRs address long-standing streaming and parsing bugs across Qwen3, OLMo3, and Gemma4. A growing number of issues highlight instability in cloud inference (v0.40.5+) and hardware-specific regressions on Jetson Orin Nano and AMD GPUs.

---

### **2. Releases & Breaking Changes**  
- **v0.40.7-rc0**: Release candidate with key fixes for model serving stability and OpenAI API compatibility.  
  - *OpenAI integration*: Now allows `responses` effort on non-thinking models ([#19010](https://github.com/ollama/ollama/pull/19010)).  
  - *Llama-server*: Auto-infers draft speculative type to reduce configuration overhead ([#19064](https://github.com/ollama/ollama/pull/19064)).  
  - *MLX support*: Added PPLX Decider v1.2 model compatibility ([#19064](https://github.com/ollama/ollama/pull/19064)).  
  > 🔗 [Release Notes](https://github.com/ollama/ollama/releases/tag/v0.40.7-rc0)

---

### **3. New Model & Hardware Support**  
- **MLX Backend**: Added support for **PPLX Decider v1.2**, expanding the suite of on-device decision models available via MLX.  
- **AMD Vulkan**: Continued work on GPU backend compatibility, though issues persist on Radeon Pro 5700 XT with `gpt-oss:20b` ([#19060](https://github.com/ollama/ollama/issues/19060)).  
- **Jetson Orin Nano**: Regression reported where `gemma4:e4b-it-qat` fails at `num_ctx=16384` on v0.40.5+, generating only ~2 tok/s at 8192 context ([#19115](https://github.com/ollama/ollama/issues/19115)).

---

### **4. Performance & Optimization**  
- **Speculative Decoding**: Llama-server now auto-detects draft model type, reducing manual tuning burden and improving throughput potential.  
- **MLX Efficiency**: Quantized decision models (e.g., MXFP4) still slower than BF16 at prefill on M5 Pro, despite lower memory footprint ([#18833](https://github.com/ollama/ollama/issues/18833)).  
- **Streaming Latency**: Multiple PRs aim to fix incorrect `created_at` timestamps during streaming (`response.completed` shows different time than `response.created`) ([#19105](https://github.com/ollama/ollama/issues/19105), [#19106](https://github.com/ollama/ollama/pull/19106)).

---

### **5. Stability & Regressions**  
**Critical Issues Reported (Severity Rank):**  
1. **Ollama Cloud Unavailability**: `/v1/chat/completions` returns no HTTP response; requests hang or return 429 after 5 minutes ([#19111](https://github.com/ollama/ollama/issues/19111)).  
2. **Model Degeneration on glm-5.3-flash:cloud**: 5–8% failure rate since Oct 12, linked to corrupted data area (`probe2.img` = all zeros) — likely cluster-level storage issue ([#18980](https://github.com/ollama/ollama/issues/18980)).  
3. **AMD GPU Failure**: `gpt-oss:20b` returns empty responses on AMD Radeon Pro 5700 XT via Vulkan, despite working on CPU ([#19060](https://github.com/ollama/ollama/issues/19060)).  
4. **Jetson Orin Context Crash**: `gemma4:e4b-it-qat` fails to load at `num_ctx=16384` due to NvMap error 12; performance drops to 2 tok/s at 8192 ([#19115](https://github.com/ollama/ollama/issues/19115)).  
5. **Seed Precision Loss**: Integer seeds > 2^53 lose precision due to float64 decoding, causing identical outputs for distinct seeds ([#19078](https://github.com/ollama/ollama/issues/19078)).  

> ✅ **Fixes in Progress**: Several PRs address parsing edge cases (Qwen3, OLMo3, Gemma4) related to whitespace and trailing noise ([#19108](https://github.com/ollama/ollama/pull/19108), [#19104](https://github.com/ollama/ollama/pull/19104), [#19112](https://github.com/ollama/ollama/pull/19112)).

---

### **6. What This Means for Application Developers**  
- **Avoid `glm-5.3-flash:cloud`** until #18980 is resolved—expect unpredictable output degradation.  
- **Use `seed` carefully**: For reproducible experiments, keep seeds ≤ 2^53 to avoid silent collisions ([#19078](https://github.com/ollama/ollama/issues/19078)).  
- **Streamed responses**: Be aware that `thinking` blocks may be dropped if text/tool calls arrive first—PRs like [#19110](https://github.com/ollama/ollama/pull/19110) are fixing this.  
- **Cloud deployments**: Monitor `/v1/chat/completions` health—recent 429s and timeouts indicate possible scaling or routing issues ([#19111](https://github.com/ollama/ollama/issues/19111)).  
- **Hardware constraints**: On Jetson Orin Nano, consider rolling back to v0.35.1 for high-context models until #19115 is patched.  

> 💡 **Pro Tip**: Use `ollama ps` with `rocm-smi` or `nvidia-smi` to cross-validate VRAM usage—discrepancies exist ([#17251](https://github.com/ollama/ollama/issues/17251)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-19**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to strengthen its foundation with critical fixes to model routing, streaming correctness, and security hardening. Key developments include the introduction of `oceantoken` as a supported OpenAI-compatible provider and native cache control injection in `/v1/messages`, improving performance for high-throughput inference workflows. Additionally, ongoing refactoring of Rust-based inference handlers enhances code maintainability and consistency across endpoints.

---

### **2. Releases & Breaking Changes**  
- **v1.107.0-rc.1** and **v1.106.0** were released today. Both include security improvements via signed Docker images using [cosign](https://github.com/BerriAI/litellm/commit/0112e53), ensuring trust in distribution channels.  
- **Verification Required**: All images are cryptographically signed; verify with `cosign verify`. See [security documentation](https://docs.sigstore.dev/cosign/overview/) and commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).

---

### **3. New Model & Hardware Support**  
- ✅ **OceanToken Integration**: Added support for `oceantoken/<publisher>/<model>` via PR [#47287](https://github.com/BerriAI/litellm/pull/47287), enabling seamless use of OceanToken’s API with existing LiteLLM tooling.
- ✅ **GLM 5.3 Removal**: Removed deprecated `coralbricks/glm-5.3` entries from cost maps and model registry (PR [#47286](https://github.com/BerriAI/litellm/pull/47286)) following CoralBricks’ deprecation of the model on Oct 18, 2026.

---

### **4. Performance & Optimization**  
- 🔧 **Native Cache Control Injection in `/v1/messages`**: PR [#47284](https://github.com/BerriAI/litellm/pull/47284) enables prompt-cache settings to be respected natively in the Rust-powered `messages` endpoint, reducing unnecessary reprocessing and improving latency for cached responses.
- 🛠️ **Rust Handler Refactoring**: Multiple PRs ([#47214](https://github.com/BerriAI/litellm/pull/47214) to [#47218](https://github.com/BerriAI/litellm/pull/47218)) unify Rust and Python logic by folding `prepare.rs` stages into core handlers, reducing redundancy and aligning validation order (e.g., environment checks before transform). This improves runtime consistency and simplifies debugging.

---

### **5. Stability & Regressions**  
- ⚠️ **Critical: Tool Choice Not Handled Correctly for Claude 5.5 Models**  
  Forcing `tool_choice` in Anthropic’s `/v1/messages` path fails silently on Opus/Sonnet 5.5 due to unprocessed `tool_choice` forwarding. Reported in [#46074](https://github.com/BerriAI/litellm/issues/46074), no fix yet.  
  *Impact: Agents relying on forced tool use may fail unexpectedly.*

- ⚠️ **Stream Chunk Builder Drops Unsigned Thinking Blocks**  
  Streaming responses lose reasoning content when signature blocks are missing (issue [#33034](https://github.com/BerriAI/litellm/issues/33034)). Fixed in PR [#33035](https://github.com/BerriAI/litellm/pull/33035), but not yet merged.

- ⚠️ **MCP Gateway OAuth Token Expiry Bug**  
  Auth tokens expire without refresh, causing tools to disappear (issue [#33072](https://github.com/BerriAI/litellm/issues/33072)). Patched in PR [#33078](https://github.com/BerriAI/litellm/pull/33078), pending review.

- ❌ **Ollama Embeddings Ignore Headers & Timeout**  
  Requests sent via `litellm.embedding()` ignore `api_key`, custom headers, and timeout settings (issue [#47261](https://github.com/BerriAI/litellm/issues/47261)). No fix PR submitted.

---

### **6. What This Means for Application Developers**  
- **Use v1.107.0-rc.1 or later** for improved security via image signing — especially critical in production environments.
- Avoid `tool_choice` with Claude 5.5 models until [#46074](https://github.com/BerriAI/litellm/issues/46074) is resolved; consider fallback to `/chat/completions` if agent reliability is key.
- If using MCP gateways with OAuth, monitor token lifecycles — the current implementation lacks auto-refresh.
- Leverage new `oceantoken` support for hybrid inference pipelines involving OceanToken providers.
- Be cautious with streaming agents: ensure your pipeline handles missing signatures gracefully, as `thinking_blocks` can be lost silently.
- For high-throughput systems, prioritize the `/v1/messages` route with cache control enabled — the recent Rust optimizations improve efficiency significantly.

> 💡 *Pro Tip:* Enable `LITELLM_DETAILED_TIMING=true` and export metrics via Prometheus (tracked in [#33959](https://github.com/BerriAI/litellm/issues/33959)) to diagnose bottlenecks in real-time.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-19**

---

### **1. Today's Highlights**  
Unsloth continues to advance its multi-model inference and agent orchestration capabilities, with key PRs enabling better GPU memory management, improved model loading resilience, and enhanced support for hybrid Mamba-2 and MoE architectures. Critical stability fixes address mobile UI layout issues, broken sampling presets, and GPU crashes on AMD RDNA2 and older NVIDIA hardware.

---

### **2. Releases & Breaking Changes**  
*No new releases in the past 24 hours.*  
However, ongoing changes in `unsloth-zoo` and Studio’s backend suggest potential breaking behavior for users relying on default `load_in_fp8=True` without a pre-quantized FP8 repo (see [PR #14093](https://github.com/unslothai/unsloth/pull/14093)). The system now silently fails to load FP8 models if no mapping exists, falling back to `bf16` instead — a shift from previous silent success. Users should verify quantization compatibility when upgrading.

---

### **3. New Model & Hardware Support**  
- **Mamba-2 Hybrids**: Full support added via extension-free `mamba-ssm` wheel ([PR #14160](https://github.com/unslothai/unsloth/pull/14160)), improving deployment simplicity and reducing footprint by up to 500 MB.
- **AMD ROCm (gfx1201)**: Fixes applied to prevent hard lockups after `llama.cpp` b11696 update ([Issue #14085](https://github.com/unslothai/unsloth/issues/14085)), though full stability remains fragile.
- **DeepInfra API Provider**: Added as a first-party connection with service-tier support ([PR #14149](https://github.com/unslothai/unsloth/pull/14149)) for direct OpenAI-compatible access.
- **LoRA for T2I Models**: Feature request opened for integrating LoRA weights into text-to-image workflows ([Issue #14114](https://github.com/unslothai/unsloth/issues/14114)).

---

### **4. Performance & Optimization**  
- **Context Parallelism**: Optimized trainer method wrapping only when enabled, reducing startup overhead and improving torch 2.10 step times ([PR #14152](https://github.com/unslothai/unsloth/pull/14152)).
- **Qwen3.5-0.8B Causal Conv1D**: Restored on-demand for T4 (sm75), boosting decode speed by **4.4%** (19.10 → 19.95 tok/s) ([PR #13971](https://github.com/unslothai/unsloth/pull/13971)).
- **Memory Management**: Introduced `Always` mode in "Keep multiple models loaded" setting, allowing agents to track all GPU-resident models and report unload events ([PR #14088](https://github.com/unslothai/unsloth/pull/14088)).
- **Tool Call Archiving**: CPU stall reduced by switching from word-split matching to space-position tracking, cutting long-latency delays during RAG operations ([PR #14098](https://github.com/unslothai/unsloth/pull/14098)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| High | **AMD RDNA2 (RX 6800 XT)**: PyTorch ROCm/GPU binding breaks post-update ([Issue #14057](https://github.com/unslothai/unsloth/issues/14057)) | Closed | Pending |
| High | **NVIDIA P100**: CUDA error `invalid argument` during `mul_mat_vec_q_switch_ncols_dst` launch ([Issue #14109](https://github.com/unslothai/unsloth/issues/14109)) | Open | No fix yet |
| High | **Windows Desktop**: Chat input disappears after first reply post-update ([Issue #13604](https://github.com/unslothai/unsloth/issues/13604)) | Closed | Patched in v0.1.908-beta |
| Medium | **Mobile UI**: Download progress icon overlaps send button ([Issue #14146](https://github.com/unslothai/unsloth/issues/14146)) | Closed | Fixed in [PR #14163](https://github.com/unslothai/unsloth/pull/14163) |
| Medium | **Sampling Presets Corrupted**: Settings overwritten on load ([Issue #14068](https://github.com/unslothai/unsloth/issues/14068)) | Open | Fixed in [PR #14128](https://github.com/unslothai/unsloth/pull/14128) |

---

### **6. What This Means for Application Developers**  
- **Agent Builders**: Use `MCP agents` (via PRs #14088–#14090) to build resilient, self-aware agents that monitor model loads, detect conflicts, and queue tasks safely — critical for production-grade autonomous systems.
- **Model Deployers**: Avoid `load_in_fp8=True` unless you have an FP8-optimized repo; otherwise, fall back to `bf16`. Audit your model pipelines accordingly.
- **UI/UX Engineers**: Expect mobile-first improvements — especially around gesture handling and overlay conflicts — thanks to PRs like #14163 and #14166.
- **Fine-Tuning Workflows**: Leverage new `save_pretrained_gguf` fixes ([PR #14095](https://github.com/unslothai/unsloth/pull/14095)) to preserve tokenizer integrity when reusing checkpoints.
- **Hardware Diversity**: Prepare for mixed environments — while AMD support is improving, stability on gfx1201 and older GPUs remains fragile. Test rigorously before deployment.

> 🔗 *All issue and PR links are live at [github.com/unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*