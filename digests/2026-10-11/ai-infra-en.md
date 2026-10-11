# AI Infrastructure Digest 2026-10-11

> Generated: 2026-10-11 01:11 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-11**

---

### **1. Ecosystem Overview**  
The AI inference and serving landscape in Q4 2026 is defined by a sharp bifurcation between **high-performance, kernel-optimized engines** (vLLM, SGLang, llama.cpp) and **developer-friendly, agnostic gateways** (Ollama, LiteLLM), with Unsloth emerging as a key player in the fine-tuning and studio-layer space. Critical stability issues—especially around speculative decoding, CUDA graphs, and prefix caching—are widespread across all projects, signaling that performance gains are being pursued at the cost of maturity. The race for model compatibility has intensified, with new support for Qwen3.8, DeepSeek-V4.1, MiniCPM-V 4.7, and GLM5-next now live or imminent. Meanwhile, hardware diversification is accelerating: AMD MI355X, NVIDIA Blackwell (SM120/SM121), Intel Arc B70, and Apple M-series chips are all under active optimization.

---

### **2. Activity Comparison**

| Project       | Issues (Open) | PRs (Recent) | Release Status         |
|---------------|----------------|----------------|--------------------------|
| vLLM          | 69             | 24             | Stable (`v0.31.0`); no new release |
| SGLang        | 52             | 18             | Stable (`v0.5.16`); no new release |
| llama.cpp     | 78             | 22             | `b11552+` released; fixes critical concurrency bug |
| Ollama        | 63             | 12             | No new release; breaking changes in API format |
| LiteLLM       | 56             | 15             | No new release; OpenAI v3+ compatibility pending |
| Unsloth       | 81             | 14             | No new release; dependency updates merged |

> 🔍 *Insight*: Despite lower PR volume, **vLLM and llama.cpp** lead in technical depth and fix velocity, while **Ollama and LiteLLM** focus on integration polish and compatibility shifts.

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-2.4T-A95B**     | ✅ (AMD ROCm) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.8-Flash-Next**    | ✅ (NVFP4, DFlash2) | ✅ (AMD mono-decode) | ✅ | ❌ | ❌ | ❌ |
| **DeepSeek-V4.1**         | ✅ (CUDA graph fixes) | ✅ (DSpark + mono-decode) | ✅ | ✅ | ❌ | ❌ |
| **MiniCPM-V 4.7**         | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **GLM5-next**             | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Prism Bonsai 2 27B**    | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **K2 Horizon (MoE)**      | ❌ | ❌ | ❌ | ✅ (pending) | ❌ | ❌ |
| **EmbeddingGemma 2**      | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

> 🏆 **Winner**: **llama.cpp** leads in raw model support breadth, particularly for niche and emerging architectures (e.g., MiniCPM-V, GLM5-next).  
> 🥈 **Runner-up**: **SGLang** and **Ollama** show strong momentum in enabling real-world use cases via early adoption of DeepSeek-V4.1 and Qwen3.8 variants.

---

### **4. Performance Frontier**

| Optimization Focus           | vLLM               | SGLang              | llama.cpp           | Ollama            | LiteLLM             | Unsloth             |
|-------------------------------|--------------------|---------------------|---------------------|-------------------|---------------------|---------------------|
| **KV Cache & Prefix Caching** | ✅ Critical fixes (Qwen3.8-27B, DFlash2) | ✅ DSpark + CUDA Graph reuse | ⚠️ Prompt cache race conditions | ⚠️ Tool call context handling | ❌ (gateway-level) | ❌ (UI-level) |
| **Batching & Throughput**     | ✅ FA4 sparse MQA decode (Blackwell) | ✅ torch.compile + diffusion kernels | ✅ MoE pipeline parallelism | ⚠️ MLX quantization overhead | ❌ (router logic) | ❌ |
| **Quantization & Kernel Efficiency** | ✅ MXFP4, GDN layer optimizations | ✅ FP8, breakable graphs | ✅ Hexagon Q1_0, SYCL MXFP4 | ⚠️ MLX `mxfp8` slower than `bf16` | ❌ | ❌ |
| **Distributed Serving**       | ✅ MTP/DFlash + async scheduling | ✅ DSpark + TP=2/4 | ❌ (single-GPU focus) | ❌ | ❌ | ⚠️ Multi-GPU tensor-splitting regression |
| **Kernel-Level Correctness**  | ✅ MoE dispatch, speculative decoding | ✅ FlashInfer packed prefill | ✅ GEMM blockscale, memory safety | ❌ | ❌ | ⚠️ FlashAttention build mismatches |

> 🚀 **Frontier Leaders**:  
> - **vLLM** dominates kernel correctness and Blackwell/AMD platform optimization.  
> - **SGLang** excels in runtime compilation and diffusion model efficiency.  
> - **llama.cpp** leads in cross-backend portability and low-level kernel innovation (Hexagon, SYCL).

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Role Summary |
|---------------|------------------------------------|-------------|
| **vLLM**      | **Inference Engine (Low-Level)**   | High-throughput, kernel-optimized serving for datacenter GPUs; targets performance-critical workloads. |
| **SGLang**    | **High-Performance Inference Runtime** | Bridges engine and application with advanced scheduling, CUDA graph reuse, and multi-model support. |
| **llama.cpp** | **Local Runtime / Embedded Engine** | Lightweight, cross-platform inference engine ideal for edge, mobile, and CPU/GPU hybrid deployments. |
| **Ollama**    | **Model Gateway / Developer CLI**  | Simplifies local model deployment and API exposure; prioritizes usability over raw performance. |
| **LiteLLM**   | **API Gateway / Routing Layer**    | Aggregates models from multiple backends; focuses on cost tracking, guardrails, and OpenAI parity. |
| **Unsloth**   | **Fine-Tuning Studio & UI Platform** | End-to-end tooling for training, tuning, and deploying models—positioned at the **training/application interface**. |

> 📊 *Strategic Insight*: The ecosystem is maturing into distinct layers: **engine (vLLM/SGLang)** → **runtime (llama.cpp)** → **gateway (Ollama/LiteLLM)** → **studio (Unsloth)**.

---

### **6. Trend Signals**

#### 🔍 **Key Industry Trends Extracted from Today’s Activity**:
1. **Speculative Decoding Stability Crisis**: Critical bugs in DFlash/MTP paths across vLLM, SGLang, and llama.cpp indicate that speculative inference is still fragile—especially under high load or mixed hardware.
2. **Hardware Diversification Acceleration**: AMD MI355X, NVIDIA Blackwell, Intel Arc B70, and Apple M-series are now core targets—not afterthoughts—driving backend specialization.
3. **Kernel-Level Correctness Overcomes Speed**: Projects are prioritizing **correctness fixes** (e.g., NaNs, cache corruption, memory leaks) over new features, reflecting growing production readiness concerns.
4. **Agent Workflows Demand Precision**: Features like `ignore_eos`, prefix caching, tool call deduplication, and `systemone` endpoints reveal a shift toward **structured, deterministic agent behavior**.
5. **OpenAI SDK v3+ Integration Lag**: LiteLLM’s inability to upgrade beyond `openai<3.0.0` highlights a broader gap in **enterprise-grade tooling interoperability**.

#### 💡 **What Application Developers Should Watch**:
- **Avoid speculative decoding** with Qwen3.8-27B (DFlash2/DSpark) and DeepSeek-V4.1 (CUDA graphs) until fixes land.
- **Test against nightly builds** for vLLM, SGLang, and llama.cpp—stable releases lag behind critical patches.
- **Monitor MLX backend stability** on macOS; `qwen3.6:35b-mlx` is currently unsafe in Ollama v0.40.x.
- **Prepare for cost-aware routing**—LiteLLM’s `cost-based-routing` is broken, but future fixes will enable enterprise-grade budget control.
- **Leverage model-specific optimizations**: Use `SGLANG_ROCM_MONO_DECODE=1` on MI355X, `--reclaim-mmap-source` in llama.cpp, and `VLLM_BATCH_INVARIANT=1` only with caution.

> ✅ **Final Recommendation**: Prioritize **stability and correctness** over cutting-edge speed. The infrastructure stack is still evolving—choose tools based on **regression resilience**, **hardware coverage**, and **tooling maturity**, not just peak throughput.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance across diverse hardware, with critical bug fixes for **DFlash2/DSpark + prefix caching on Qwen3.8-27B (NVFP4)** and **DeepSeek-V4.1 NaN issues under CUDA graphs**. New PRs address kernel-level correctness in speculative decoding and MoE dispatch under batch invariance, while ongoing optimization efforts target **AMD MI355X (gfx950)** and **Blackwell SM120/SM121** platforms.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*  
- The `v0.31.0` release remains active; users are advised to monitor issue #60174 for potential regressions related to DFlash2/DSpark + prefix caching on Qwen3.8-27B.
- No API or config changes were introduced in recent PRs; `VLLM_BATCH_INVARIANT=1` behavior remains sensitive to kernel selection logic (see #61038, #61036).

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Optimization**: Active work underway for `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` and `amd/Qwen3.8-Flash-Next-Quark-MXFP4` on **MI355X (gfx950)**, with performance tracking via issues #57149 and #59575.
- **NVIDIA Blackwell (SM120/SM121)**: Kernel support expanded with PR #55866 enabling **FA4 sparse MQA decode** on GB10/GB300 GPUs.
- **Intel GPU**: Ongoing investigation into hangs on **Intel Arc B70 (Battlemage)** under concurrent load (#54698).
- **New model support**: No new models added directly; however, DeepSeek-V4.1 now has dedicated fixes for CUDA graph and streaming handling (#61039, #58412).

---

### **4. Performance & Optimization**  
- **Qwen3.8-2.4T-A95B (gfx950)**: Performance optimization roadmap initiated (#57149), targeting better utilization of MXFP4 MoE and GatedDeltaNet.
- **DeepSeek-V4.1**: PR #61039 introduces **length-aware candidate block selection**, reducing unnecessary buffer writes and improving decode efficiency.
- **GDN Layer**: PR #61034 cuts redundant host-side PyTorch ops in eager prefill path, eliminating latency overhead in mixed steps (no numerical change).
- **FlashInfer / FA4**: PR #55866 enables **sparse MLA decode** on Blackwell GPUs, unlocking higher throughput for long-context models.
- **KV Cache Grouping**: RFC #58638 proposes improvements for hybrid models with speculative drafters to reduce cache fragmentation.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| 🔴 Critical | [#60174](https://github.com/vllm-project/vllm/issues/60174) | DFlash2/DSpark + prefix caching corrupts output after cache hit on Qwen3.8-27B NVFP4 (sm_120) | ⚠️ In progress |
| 🔴 Critical | [#57156](https://github.com/vllm-project/vllm/issues/57156) | DeepSeek-V4.1 produces NaN with CUDA graphs due to null KV block poisoning | ✅ PRs in review (fixes in #61039, #61036) |
| 🟡 High | [#59770](https://github.com/vllm-project/vllm/issues/59770) | ~16% decode slowdown on Nemotron-3.5-Lightning (DGX Spark, NVFP4) since v0.29.0 | ⚠️ Investigating |
| 🟡 Medium | [#57838](https://github.com/vllm-project/vllm/issues/57838) | RowWiseTorchFP8ScaledMMLinearKernel selected on RDNA4 (gfx1201), costing 5–24% decode time | ⚠️ Workaround proposed |

---

### **6. What This Means for Application Developers**  
- **Avoid `--kv-cache-dtype fp8` with DFlash2/DSpark on Qwen3.8-27B (sm_120)** until fix lands — this combination may produce corrupted outputs (#60174). Use `bfloat16` as a workaround.
- **Use `VLLM_BATCH_INVARIANT=1` cautiously**: It can trigger suboptimal kernel choices (e.g., legacy MoE kernels), leading to performance degradation or incorrect behavior — verify results with deterministic tests (#61038, #61036).
- **For agents and RAG workloads**: Enable prefix caching explicitly; note that pooling tasks (`token_embed`, `token_classify`) currently ignore prefix cache unless explicitly configured (#60947).
- **Monitor speculative decoding behavior under pipeline parallelism**: Bugs exist when using `--no-async-scheduling` with MTP/DFlash (#52071, #54360); prefer async scheduling for stability.
- **Leverage emerging optimizations**: For AMD MI355X or NVIDIA Blackwell, expect improved performance from upcoming PRs — consider testing with `qwen38-2.4T-A95B` and `nemotron-3.5-lightning` benchmarks.

> 💡 *Pro Tip*: Use `python collect_env.py` to debug environment-specific issues. Always test against nightly builds when evaluating new features or regression fixes.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature in high-performance inference and diffusion serving, with critical stability fixes for DSpark speculative decoding on TP8 systems and ongoing work to stabilize CUDA Graph reuse across complex model paths. New PRs focus on improving torch.compile compatibility for diffusion models (Qwen-Image-2.1, Cosmos3) and enabling breakable graphs for SANA-Video 2.0, while a key fix ensures proper handling of `ignore_eos` requests during prefill admission.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes observed. The v0.5.16 release remains stable, though several known issues persist around DSpark and large decode CUDA Graph capture (see #33356, #31023).

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Support**: Opt-in mono-decode path added for *DeepSeek-V4.1-Flash* on gfx950 (MI355X), enabled via `SGLANG_ROCM_MONO_DECODE=1`. Requires TP=2/4 without DP/EP.
- **Diffusion Models**: SANA-Video 2.0 now supports breakable CUDA graphs (#41501), and negative prompt caching is being optimized (#43630).
- **Emerging Backends**: Work continues on Moore Threads (MUSA) GPU support (#16565), with community interest growing.

> 🔗 [PR #43497](https://github.com/sgl-project/sglang/pull/43497) | [Issue #16565](https://github.com/sgl-project/sglang/issues/16565)

---

### **4. Performance & Optimization**  
- **torch.compile Improvements**: Multiple PRs target performance regression in diffusion models:
  - Qwen-Image-2.1: Prevent graph breaks in attention kernels by keeping full graphs intact (#43586)
  - Cosmos3: Preserve fused kernels under compile to avoid 50%+ slowdown (#43577)
  - Z-Image: Skip problematic multi-kernel pick cache to prevent startup crashes (#43601)
- **Scheduler Optimization**: Throttle waiting-prefix refresh by forward count instead of wall time to avoid LRU divergence (#43512)
- **Kernel Efficiency**: Sorting reduced to top_k columns only in torch sampler, reducing per-step overhead (#43346)

> 🔗 [PR #43586](https://github.com/sgl-project/sglang/pull/43586) | [PR #43577](https://github.com/sgl-project/sglang/pull/43577) | [PR #43512](https://github.com/sgl-project/sglang/pull/43512)

---

### **5. Stability & Regressions**  
Critical correctness and stability issues reported today:

| Severity | Issue | Summary | Fix Status |
|--------|------|--------|------------|
| ⚠️ High | [#43402](https://github.com/sgl-project/sglang/issues/43402) | CUDA VMM transport slice leak when request aborted before execution (`--mm-feature-transport cuda_vmm`) | Open |
| ⚠️ High | [#43615](https://github.com/sgl-project/sglang/issues/43615) | FlashInfer packed prefill fails for one-token batches due to incorrect `total_tokens > num_sequences` check | Fixed in PR #43629 |
| ⚠️ Medium | [#43413](https://github.com/sgl-project/sglang/issues/43413) | `--enable-deterministic-inference` doesn’t make hybrid Mamba2 models batch-invariant | Open |
| ⚠️ Medium | [#42917](https://github.com/sgl-project/sglang/issues/42917) | Qwen3.8-27B W4A16 compressed tensors show degraded quality (PPL 9.98 vs vLLM’s 6.05) | Open |
| ⚠️ Low | [#43526](https://github.com/sgl-project/sglang/issues/43526) | Accuracy issue with gfx942 FP8 GEMM blockscale kernel | Open |

> 🔗 [Issue #43402](https://github.com/sgl-project/sglang/issues/43402) | [PR #43629](https://github.com/sgl-project/sglang/pull/43629)

---

### **6. What This Means for Application Developers**  
- **Use `--enable-torch-compile` cautiously** with diffusion models like Qwen-Image-2.1 and Cosmos3—while it enables faster inference, improper compilation can cause crashes or regressions. Monitor graph breaks via `TORCH_LOGS=graph_breaks`.
- **Avoid `dtype=float32` with flashinfer backend**—this now triggers a hard fail (fix in #43628), preventing silent failures.
- **Be mindful of `ignore_eos` and prefix caching**—a recent fix ensures proper token budgeting during prefill admission; this affects long-running generation workflows.
- **For multimodal apps using CUDA VMM**, expect memory leaks if requests are aborted early; implement client-side timeouts or retry logic until #43402 is resolved.
- **Consider opting into AMD-specific optimizations** (e.g., `SGLANG_ROCM_MONO_DECODE=1`) for DeepSeek-V4.1 on MI355X, but verify TP setup constraints.

> ✅ **Action Item**: Update to latest main branch to benefit from DSpark correctness fixes and torch.compile improvements. Monitor CI status at [CI Tracking Issue #17050](https://github.com/sgl-project/sglang/issues/17050).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The latest release cycle introduces critical stability fixes for speculative decoding and prompt caching under concurrent load, addressing a race condition where busy slots were being overwritten mid-generation. New model support includes **MiniCPM-V 4.7** and **GLM5-next**, with ongoing work to enhance MoE and DFlash performance across backends.

---

### **2. Releases & Breaking Changes**  
- **`b11552`**: Fixed a concurrency bug in `llama-server` where a pinned busy slot was incorrectly updated during prompt cache eviction (#30295) — this could lead to corrupted generation state when multiple requests share the same slot.  
  🔗 [PR #30295](https://github.com/ggml-org/llama.cpp/pull/30295)  
- **`b11551`**: Added full runtime support for **MiniCPM-V 4.7**, including MROPE time handling and updated conversion scripts.  
  🔗 [PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416)  
- **`b11550`**: Disabled z17 target on s390x for unsupported compilers to avoid build failures.  

> ✅ **Migration Note**: Users relying on speculative decoding with `--cache-ram` or high-concurrency `llama-server` should upgrade to `b11552+` to avoid potential context corruption.

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - ✅ **MiniCPM-V 4.7** (via `minicpm-v` architecture)  
  - ✅ **GLM5-next** (with input layer embedding support via PR #30268)  
  - ✅ **DeepSeek-V4.1** (added as `deepseek41` architecture; conversion + chat template)  
  - ✅ **Prism Bonsai 2 27B** (runtime support added)  
- **Backends & Quantization**:  
  - ✅ **Hexagon**: Added native `Q1_0` support via HVX (32x1, 32x2, 2D/4D matvec workers).  
  - ✅ **OpenCL**: Improved FlashAttention (`dk=512`) for Gemma-4 (GQA=4/8), enabling GPU offload without fallback.  
  - ✅ **SYCL**: Accelerated MXFP4 MoE using arithmetic decoding and weight reordering (#29809).  
  - ✅ **Vulkan**: Enhanced coopmat1 int8 matmul with bounds clamping to prevent out-of-bounds access.  

> 🔗 [PR #30122](https://github.com/ggml-org/llama.cpp/pull/30122) | [PR #30266](https://github.com/ggml-org/llama.cpp/pull/30266)

---

### **4. Performance & Optimization**  
- **MoE Pipeline Parallelism**: PR #29963 enables pipeline parallelism for MoE models even when experts reside in host RAM (`--cpu-moe`, `-ot`). This reduces VRAM pressure while maintaining throughput for large MoEs like GigaChat 3.5.  
- **FlashAttention Improvements**:  
  - `dk=512` now supported for Gemma-4 (GQA=4/8) via OpenCL — avoids CPU fallbacks.  
  - `dk=64` improved for `gpt-oss-20b` (GQA=8).  
- **Memory Efficiency**:  
  - `--reclaim-mmap-source` (PR #24156) reduces RSS by up to **37%** on Qwen3-30B-A3B (13 GiB saved).  
  - Reference-counted checkpoints in `llama-server` (PR #30137) reduce memory duplication in multi-request scenarios.  

> 🔗 [PR #29963](https://github.com/ggml-org/llama.cpp/pull/29963) | [PR #30137](https://github.com/ggml-org/llama.cpp/pull/30137)

---

### **5. Stability & Regressions**  
Critical issues reported today:  
1. **Crash on AMD Vulkan (gfx1010)**: ~45% prompt processing regression between `b10455` and `b11429` with hybrid GDN models.  
   🔗 [Issue #30039](https://github.com/ggml-org/llama.cpp/issues/30039)  
2. **Silent inference corruption on gfx1151 (Strix Halo)**: HIP backend loses oldest context in Qwen3.5-27B (Gated-DeltaNet) — reproducible with `test-backend-ops`.  
   🔗 [Issue #27556](https://github.com/ggml-org/llama.cpp/issues/27556)  
3. **Nondeterministic FA prefill on ROCm/HIP**: Since `b10905`, multimodal Qwen3.5-9B shows inconsistent outputs.  
   🔗 [Issue #30175](https://github.com/ggml-org/llama.cpp/issues/30175)  
4. **CUDA crash with Qwen3.8-Flash-Next-MTP**: "bad allocation" during long conversations.  
   🔗 [Issue #30091](https://github.com/ggml-org/llama.cpp/issues/30091)  

> ⚠️ **Note**: Several regressions are tied to speculative decoding (`MTP`, `DFlash`) and MoE paths — developers using these features should test against `b11552+`.

---

### **6. What This Means for Application Developers**  
- **Use `b11552+` immediately** if running `llama-server` under high concurrency or with `--cache-ram` — avoid silent context corruption.  
- **Enable `--reclaim-mmap-source`** on Linux to significantly reduce memory usage in production deployments.  
- **For MoE models**: Use `--cpu-moe` + pipeline parallelism (PR #29963) to scale beyond VRAM limits without sacrificing throughput.  
- **Avoid `--spec-type draft-mtp` with Qwen3.8-Flash-Next** until Issue #30091 is resolved — expect crashes under long sessions.  
- **Build with OpenCL/SYCL for best performance** on AMD/Intel hardware: new kernels improve FlashAttention and MoE efficiency.  

> 📌 **Action Item**: Monitor the [Changelog Issues](https://github.com/ggml-org/llama.cpp/issues/9291) for upcoming REST API changes affecting agent tooling.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with key improvements in model compatibility and streaming protocol fidelity, particularly around Qwen3 tool calling and OpenAI-compatible API parity. Critical regressions in MLX backend performance and stability—especially for `qwen3.6:35b-mlx` on Apple M-series chips—are now under active investigation. Meanwhile, PRs are advancing support for decision models via llama.cpp v1.15.2 and refining prompt rendering for multimodal and reasoning-heavy workflows.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, ongoing changes in `main` include:
- **API wire format alignment**: `/v1/completions` now matches OpenAI’s streaming format exactly (PR #18914).
- **Model tag display**: `:latest` is no longer shown by default in `ollama list`, `/api/tags`, and `/v1/models` (PR #18915).
- **Tool call handling**: Empty `arguments` in replayed tool calls are now accepted (PR #18913).

> 🔗 [PR #18915](https://github.com/ollama/ollama/pull/18915) | [PR #18914](https://github.com/ollama/ollama/pull/18914) | [PR #18913](https://github.com/ollama/ollama/pull/18913)

---

### **3. New Model & Hardware Support**  
- **K2 Horizon models** (IFM): Requested support for `k2-horizon` architecture (0.9B–36B MoE) via GGUF; currently pending (Issue #18696).
- **KailA architecture**: Proposal to add support for `kail` GGUF models (Issue #18922).
- **Decision models**: Full integration via updated llama.cpp b11521 (PR #18917), enabling `/v1/systemone` endpoints directly.
- **EmbeddingGemma 2**: Now natively supported through updated llama.cpp (PR #18917).

> 🔗 [Issue #18698](https://github.com/ollama/ollama/issues/18698) | [Issue #18922](https://github.com/ollama/ollama/issues/18922) | [PR #18917](https://github.com/ollama/ollama/pull/18917)

---

### **4. Performance & Optimization**  
- **MLX quantization overhead**: Quantized K2/MXL models (e.g., `mxfp8`) are observed to be slower than `bf16` at prefill phase on M5 Pro (Issue #18833).
- **Context handling**: Improved parsing of partial tool call tags in Qwen3.5 streams (PR #18759), reducing loss of structured output during long conversations.
- **Device probing fallback**: When `llama-server --list-devices` returns empty output, Ollama now falls back to native GGML probe results (PR #18923), improving device detection reliability.

> 🔗 [Issue #18833](https://github.com/ollama/ollama/issues/18833) | [PR #18759](https://github.com/ollama/ollama/pull/18759) | [PR #18923](https://github.com/ollama/ollama/pull/18923)

---

### **5. Stability & Regressions**  
**Critical Issues (High Severity)**  
- **MLX Runner Panic**: `qwen3.6:35b-mlx` crashes on macOS with `panic: mlx` in v0.40.x (regression from v0.35.0) — reproducible on M5/M6 Macs (Issue #18856).  
  > 🔗 [Issue #18856](https://github.com/ollama/ollama/issues/18856)  
- **Qwen3.5 4B Thinking Only**: Long conversations return `thinking` but no content/tool calls despite successful `done_reason: "stop"` (Issue #18916).  
  > 🔗 [Issue #18916](https://github.com/ollama/ollama/issues/18916)  
- **GGML Assertion Failure**: `rnj-1` fails with `GGML_ASSERT(hparams.is_swa_any()) failed` after upgrade (Issue #18924).  
  > 🔗 [Issue #18924](https://github.com/ollama/ollama/issues/18924)  

**Medium Severity**  
- **Duplicate model entries**: Post-local compat GGUF migration, `ollama list` shows duplicate models and bogus `llamacpp:<sha>` tags (Issue #18830).  
  > 🔗 [Issue #18830](https://github.com/ollama/ollama/issues/18830)  
- **Windows NTFS Mount Path Bug**: `ollama list` returns empty when model path is an NTFS mount point (Issue #18921).  
  > 🔗 [Issue #18921](https://github.com/ollama/ollama/issues/18921)  

> ✅ *Fixes underway*: PR #18856 and #18916 are actively being investigated; no patch yet.

---

### **6. What This Means for Application Developers**  
- **Avoid `qwen3.6:35b-mlx` on macOS v0.40.x** until the MLX panic is resolved—use v0.35.0 or earlier as a workaround.
- **Validate tool call payloads** when replaying history: expect empty `arguments` fields to be accepted (fix incoming via #18913).
- **Expect cleaner model listing** post-#18915: `llama3.1` will appear instead of `llama3.1:latest` in CLI and APIs.
- **Design for robust device discovery**—use `--list-devices` fallback logic (via #18923) if GPU probing fails silently.
- **Prepare for decision model adoption** using `/v1/systemone` via updated llama.cpp (PR #18917), ideal for real-time agent actions.

> 📌 *Recommendation*: Monitor PRs #18856 and #18916 closely—these impact production-grade inference reliability on Apple Silicon.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to expand its support for advanced AI workflows, with critical fixes to OpenTelemetry integration and guardrail handling in real-time and batch scenarios. Key PRs today focus on stabilizing the `decisions` and `systemone` endpoints, ensuring accurate cost tracking and proper response bridging—essential for enterprise-grade agent systems.

---

### **2. Releases & Breaking Changes**  
*No new releases announced in the past 24 hours.*  
However, ongoing work on **OpenAI SDK v3+ compatibility** remains a blocker: multiple issues (e.g., [#40317](https://github.com/BerriAI/litellm/issues/40317), [#37907](https://github.com/BerriAI/litellm/issues/37907)) highlight that `litellm` still pins `openai<3.0.0`, preventing integration with modern tooling. This is expected to be addressed in an upcoming release.

---

### **3. New Model & Hardware Support**  
- ✅ **MiniMax Messages API**: Added via [PR #45896](https://github.com/BerriAI/litellm/pull/45896) — supports native Messages format with tool payloads, cache hints, and authentication.
- ✅ **Tencent Messages API**: Native support merged via [PR #45899](https://github.com/BerriAI/litellm/pull/45899), enabling direct routing of structured messages.
- ✅ **Microsoft Decision 1**: Feature request raised ([#45807](https://github.com/BerriAI/litellm/issues/45807)) — pending implementation; will enable Azure Foundry deployment via `openai/gpt-6-luna`.
- ✅ **DeepSeek V4 Flash Responses API**: Feature request ([#35648](https://github.com/BerriAI/litellm/issues/35648)) — targeted for future support to streamline high-throughput inference.

---

### **4. Performance & Optimization**  
- **Batch & Stream Efficiency**: Critical improvements in response bridging:
  - [PR #45812](https://github.com/BerriAI/litellm/pull/45812): Fixes silent loss of `reasoning` items and `url_citation` annotations when converting from Responses API to Chat Completions.
  - [PR #45818](https://github.com/BerriAI/litellm/pull/45818): Ensures full content-list chunks (including citations) are preserved, eliminating truncation in Mistral responses.
- **Cost & Routing Accuracy**: 
  - [PR #45904](https://github.com/BerriAI/litellm/pull/45904): Correctly bills `/v1/decisions` and `/v1/systemone` using provider-specific cost map entries, avoiding misattribution.
  - [PR #45902](https://github.com/BerriAI/litellm/pull/45902): Adds integration tests to validate spend logging across providers.

---

### **5. Stability & Regressions**  
High-severity issues reported today include:

| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [#45718](https://github.com/BerriAI/litellm/issues/45718): `cost-based-routing` breaks sync Router methods | ⚠️ Critical | Open | None |
| [#45895](https://github.com/BerriAI/litellm/issues/45895): Budget reservation not reconciled on success without DB | ⚠️ High | Open | None |
| [#45736](https://github.com/BerriAI/litellm/issues/45736): OpenTelemetry spans missing if stream is read early | ⚠️ Medium | Open | None |
| [#45796](https://github.com/BerriAI/litellm/issues/45796): Tool-call responses logged as empty messages | ⚠️ Medium | Open | None |
| [#45787](https://github.com/BerriAI/litellm/issues/45787): Misrouting to Vertex AI due to `predict` substring in URL | ⚠️ Medium | Open | None |

> 🔥 **Note**: The `cost-based-routing` regression affects all sync calls—even with one healthy deployment—rendering it unusable until resolved.

---

### **6. What This Means for Application Developers**  
- **Avoid `cost-based-routing`** until [#45718](https://github.com/BerriAI/litellm/issues/45718) is fixed—your app may fail silently under load.
- **Verify OpenTelemetry instrumentation**: If you use streaming responses, ensure your client reads the entire stream to capture full spans and tool call metadata.
- **Use caution with custom auth + budgeting**: If relying on `max_budget` without a database, expect potential spend inconsistencies ([#45895](https://github.com/BerriAI/litellm/issues/45895)).
- **Expect better cost accuracy** soon: New `decisions` and `systemone` billing logic ([#45904](https://github.com/BerriAI/litellm/pull/45904)) ensures correct accounting for decision models.
- **Prepare for OpenAI v3+ migration**: Pinning `openai<3.0.0` limits interoperability—monitor [#40317](https://github.com/BerriAI/litellm/issues/40317) for updates.

👉 *Pro tip*: Use [PR #45896](https://github.com/BerriAI/litellm/pull/45896) and [PR #45899](https://github.com/BerriAI/litellm/pull/45899) to test MiniMax/Tencent integrations in staging before production rollout.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-11**

---

### **1. Today's Highlights**  
The Unsloth project continues to advance its multi-GPU inference and fine-tuning capabilities, with critical fixes for long-context chat lag and GPU memory management on high-end hardware (e.g., RTX PRO 6000, B200). Key PRs focus on performance optimization in the Studio UI, including improved scroll responsiveness and reduced CPU usage during idle states. A new `Recommended` model filter in Unsloth Studio enhances discoverability by curating models based on compatibility and quality.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several dependency updates were merged via automated bots:  
- **PR #13252** and **#13064** update core Python dependencies (`typer`, `fastapi`, `pydantic`, `huggingface-hub`, `uvicorn`, `datasets`) to maintain compatibility with modern environments.  
- **PR #13247** resolves a critical issue where outdated FlashAttention builds caused `diffusers` pipeline failures on CUDA 12 hosts by pairing `torch 2.9` with `torchao 0.15.0`. [GitHub PR #13247](https://github.com/unslothai/unsloth/pull/13247)

---

### **3. New Model & Hardware Support**  
- **Qwen3-TTS**: Feature request **#3951** calls for Fine-Tuning support — currently pending.  
- **AMD ROCm**: Multiple issues highlight ongoing challenges with AMD GPUs (Radeon W7900/W7500), including VRAM mismanagement (**#7449**, **#10341**) and training failures on dual R9700 setups (**#10657**).  
- **Intel GPU Pinning**: Requested documentation for Intel GPU support in Studio (**#12836**) remains open.  
- **GGUF Models**: The Qwen3.8-Flash-Next-GGUF model is still unsupported due to architecture mismatch (`qwen4exp`) in llama.cpp (**#10015**).

---

### **4. Performance & Optimization**  
- **Inference Speed**: A regression was reported in **#12468** where tensor-split inference on two RTX 5070 Ti GPUs dropped from ~115 tokens/s (pre-b10715) to ~48 t/s (post-b10715-mix-86bd2d3), likely due to changes in CUDA graph limits (`max_cuda_graphs = 64`).  
- **UI Responsiveness**: **PR #13255** addresses severe performance degradation in long chats with large responses, code blocks, and LaTeX, which caused UI freeze and input lag.  
- **Memory Efficiency**: **PR #13256** ensures padding masks are honored in cached Llama/Qwen3 attention paths — preventing incorrect generation from left-padded prompts.  
- **Model Offloading**: **PR #13254** skips fused LoRA kernels when DoRA is active, fixing silent magnitude corruption in training outputs.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR? | Link |
|------|----------|--------|---------|------|
| `RuntimeError: illegal memory access` on RTX PRO 6000 | Critical | Closed | No | [#3921](https://github.com/unslothai/unsloth/issues/3921) |
| Long-context chat lag (Windows 10, Geforce RTX) | High | Closed | No | [#12552](https://github.com/unslothai/unsloth/issues/12552) |
| CPU spinning at 95% idle (Windows 11, ROCm) | Critical | Closed | Yes | [#12942](https://github.com/unslothai/unsloth/issues/12942) |
| Model stuck in RAM despite "No Ram Offload" box checked (ROCm) | High | Open | No | [#10341](https://github.com/unslothai/unsloth/issues/10341) |
| Tool call deduplication blocking legitimate repeated tool calls | Medium | Closed | Yes | [#10379](https://github.com/unslothai/unsloth/issues/10379) |

> ✅ **Note**: Several stability fixes were delivered via PRs (e.g., **#12942**, **#10379**) but remain unpatched in released versions.

---

### **6. What This Means for Application Developers**  
- **Avoid b10715-mix-86bd2d3+** if using multi-GPU tensor splitting — expect up to **~58% inference slowdown** on RTX 5070 Ti. Revert to earlier builds or monitor for hotfixes.  
- **Ensure proper offload settings** when working with AMD ROCm: explicitly disable RAM offload if using high VRAM GPUs (W7900/W7500).  
- **Use `--split-mode layer` manually** when configuring multi-GPU deployments — defaulting to `tensor` mode can lead to ambiguous behavior (**#10549**, **PR #10770**).  
- **Validate model loading** for GGUF variants — newer Qwen architectures (e.g., `qwen4exp`) are not yet supported in Unsloth Studio.  
- **Leverage Studio’s new `Recommended` model filter** for better curation of compatible and well-performing models.  
- **For external models**, note that tool settings remain active even if hidden — users must adjust budgets via backend logic (**PR #13251**).

> 🔗 **Actionable Links**:  
> - [Fix: CPU Spinning on Idle (PR #12942)](https://github.com/unslothai/unsloth/issues/12942)  
> - [Performance: Scroll Lag Fix (PR #13255)](https://github.com/unslothai/unsloth/pull/13255)  
> - [Dependency Updates (PR #13252)](https://github.com/unslothai/unsloth/pull/13252)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*