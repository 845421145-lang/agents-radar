# AI Infrastructure Digest 2026-10-06

> Generated: 2026-10-06 02:27 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-06**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of deep specialization and hardware convergence, with projects increasingly targeting high-performance, low-latency workloads across NVIDIA SM100/SM12x, AMD ROCm gfx942/gfx950, and Apple Silicon (MLX). Key trends include the rise of speculative decoding (MTP/deepstack), multi-modal integration (vision + text), and distributed inference at scale. While vLLM and SGLang lead in raw throughput and advanced kernel optimizations, llama.cpp and Ollama dominate local runtime flexibility and developer accessibility. LiteLLM and Unsloth are consolidating as critical middleware layers, enabling agent workflows and fine-tuning consistency.

---

### **2. Activity Comparison**  

| Project       | Issues Open (Today) | PRs Merged (Today) | Release Status       |
|---------------|---------------------|--------------------|----------------------|
| **vLLM**      | 8                   | 32                 | ✅ v0.31.0 released  |
| **SGLang**    | 12                  | 7                  | ❌ No new release     |
| **llama.cpp** | 11                  | 10                 | ✅ v0.6.0 released    |
| **Ollama**    | 10                  | 5                  | ⚠️ Patch fix in progress |
| **LiteLLM**   | 3                   | 5                  | ✅ Patch releases (v1.100.x–v1.104.x) |
| **Unsloth**   | 12                  | 6                  | ❌ No new release     |

> *Note: Activity reflects immediate engineering momentum; vLLM and llama.cpp show strongest release velocity.*

---

### **3. Model Support Race**  

| Model / Architecture         | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash**       | ✅ (SM100, NVFP4) | ✅ (ROCm DCP) | ✅ (MTP, deepstack) | ⚠️ (No regression noted) | ✅ (Image content preserved) | ⚠️ (MoE support experimental) |
| **Qwen3.8-Flash-Next**        | ⚠️ (Speculative decoding issues) | ✅ (DCP on ROCm) | ❌ (Regression in `--spec-draft-model`) | ⚠️ (Tool-call parser mismatch) | ✅ (Correct routing) | ⚠️ (Loss goes NaN) |
| **GLM-5.3-Flash (320B Hybrid)** | ✅ (Long-decode degeneration open) | ❌ (NVFP4 loop issue) | ✅ (Full support) | ⚠️ (`glm-ocr` regression) | ✅ (Vision-enabled) | ⚠️ (Context handling issues) |
| **Clef Decision Model (Text+Vision)** | ❌ | ❌ | ✅ (Server support) | ❌ (Crashes on `/systemone`) | ✅ (Image content preserved) | ❌ |
| **Gemma 4 CLIP / Vision**     | ❌ | ✅ (DCP enabled) | ✅ (Gemma 4 31B MTP crash) | ❌ | ❌ | ❌ |
| **MoE Models (Qwen3.5/3.6, Gemma-4)** | ⚠️ (Kernel fusion ongoing) | ⚠️ (DCP for GLM-5 only) | ✅ (Experimental fast_inference) | ❌ | ❌ | ✅ (PR #12742 in progress) |

> **Winner**: **llama.cpp** leads in model diversity and early adoption of hybrid/multi-modal models.  
> **Leader in Hardware Coverage**: **vLLM** (NVIDIA SM100/B300), **SGLang** (ROCm DCP), **Ollama** (Windows ROCm support).

---

### **4. Performance Frontier**  

| Optimization Focus           | vLLM                              | SGLang                            | llama.cpp                         | Ollama                          | LiteLLM                       | Unsloth                     |
|-------------------------------|-----------------------------------|-----------------------------------|-----------------------------------|---------------------------------|-------------------------------|-----------------------------|
| **KV Cache Efficiency**       | ✅ NVFP4 + FlashMLA + DeepGEMM     | ❌ (HiCache deadlock issues)      | ✅ NVFP4 + PLE table               | ⚠️ (Memory residency issues)   | ⚠️ (Spending logs unreliable) | ⚠️ (MM projection paging)  |
| **Batching & Parallelism**    | ✅ Multi-GPU batch invariance      | ✅ Prefill CP (MHA/GQA roadmap)   | ✅ `llama_batch_ext` (mixed input)| ✅ MLX SDPA acceleration         | ✅ Budget-aware routing       | ❌ (Context loss in export) |
| **Quantization & Compression**| ✅ NVFP4, TurboQuant/HIGGS tracking| ✅ FP8/MXFP4 fusion (AMD)          | ✅ MMQ accumulation (NVFP4)        | ✅ MLX SDPA (wide heads)        | ✅ Regional uplift multipliers| ✅ LoRA memory optimization |
| **Distributed Serving**       | ✅ Disaggregated pipeline (/render → /inference → /derender) | ✅ TP rank deadlock risk | ❌ (Multi-GPU layer split crash) | ❌ (Model load hang)            | ✅ Model group pricing logic  | ❌ (ARM64 build misidentified) |
| **Kernel-Level Optimization** | ✅ Triton attention, manual RoPE-KV fusion | ✅ Per-weight cached launcher (Kimi-K3) | ✅ Row-split flash-attention | ✅ MLX SDPA kernel              | ✅ Streaming event ordering   | ✅ Code font, context ring UI |

> **Top Performers**: **vLLM** (kernel-level efficiency), **SGLang** (distributed context parallelism), **llama.cpp** (flexible batching and quantization).

---

### **5. Layer Positioning**  

| Project       | Primary Layer                        | Role Summary |
|---------------|--------------------------------------|--------------|
| **vLLM**      | **Serving Engine**                   | High-throughput LLM inference engine with cutting-edge CUDA/ROCm kernels; ideal for cloud-scale deployments. |
| **SGLang**    | **Serving Engine + Gateway**         | Full-stack inference framework with built-in scheduling, router, and support for speculative decoding; production-ready for complex workflows. |
| **llama.cpp** | **Local Runtime / Edge Inference**   | Universal CPU/GPU/CUDA/Vulkan/ROCm backend with strong focus on offline, edge, and embedded deployment. |
| **Ollama**    | **Developer Gateway / Local Runtime**| Simplified local inference interface with CLI, API, and tool-chain integration; great for prototyping and desktop use. |
| **LiteLLM**   | **Gateway / Abstraction Layer**      | Unified API proxy for multi-provider inference; critical for cost tracking, budgeting, and agent orchestration. |
| **Unsloth**   | **Fine-Tuning & Training Tool**      | Specialized GUI and SDK for efficient LoRA fine-tuning and model export; bridges training and deployment. |

> **Layer Differentiation**: The stack is now clearly segmented — **vLLM/SGLang** for core inference, **llama.cpp/Ollama** for edge/local access, **LiteLLM** for abstraction, and **Unsloth** for fine-tuning.

---

### **6. Trend Signals**  

#### 🔍 **Key Industry Trends Extracted**:
1. **Speculative Decoding (MTP/DeepStack) is Maturing but Still Fragile**: All major projects (vLLM, llama.cpp, SGLang) are investing heavily in MTP, but regressions persist—especially around hybrid Qwen layouts and long-decode stability.
2. **Hardware Convergence is Accelerating**: SM100 (B300), Blackwell (GB10), and ROCm gfx942/gfx950 are becoming standard targets. AMD’s ROCm gains traction in both vLLM and SGLang.
3. **Multi-Modal Workflows Are Now Standard**: Clef, GLM-5.3-Flash, and Gemma 4 CLIP are being integrated into inference pipelines—indicating vision-augmented agents are no longer niche.
4. **Agent Infrastructure Is Becoming Modular**: LiteLLM’s spend logging, Ollama’s tool-call parsing, and unsloth’s prompt preservation highlight a shift toward reliable, traceable agent systems.
5. **Stability > Speed**: Despite performance leaps, critical crashes (double free, infinite loops, deadlocks) remain prevalent—especially in SGLang and Ollama—signaling that production readiness is still evolving.

#### 📌 **What Developers Should Watch**:
- **Avoid `--spec-draft-model` with Qwen3.8-Flash-Next** until fixes land (vLLM/llama.cpp).
- **Monitor `/v1/messages` concurrency** in LiteLLM—crash risk remains high.
- **Test GLM-5.3-Flash under long-decode loads**—vLLM and SGLang both report degradation.
- **Use `llama_batch_ext` for MTP workflows**—only available in llama.cpp v0.6.0.
- **Pin models and export via `.unsloth portable archive`** to avoid metadata loss in Unsloth.

> ✅ **Bottom Line**: The ecosystem is advancing rapidly—but reliability and correctness must be prioritized over raw speed. Choose tools based on your deployment layer: **vLLM/SGLang for scale**, **llama.cpp/Ollama for portability**, **LiteLLM for orchestration**, and **Unsloth for fine-tuning**.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-06

---

### **1. Today's Highlights**  
The vLLM v0.31.0 release introduces major performance improvements for **DeepSeek-V4.1-Flash**, enabling SM100 default support via FlashMLA with NVFP4 compressed KV cache and DeepGEMM sparse MQA logits. Key stability fixes address speculative decoding issues in hybrid Qwen3.8 layouts and long-decode degeneration in GLM-5.3-Flash, while new PRs enhance ROCm support and optimize kernel fusion for Qwen3.5/Next and DeepSeek-V4.1 on AMD gfx942/gfx950.

---

### **2. Releases & Breaking Changes**  
- **v0.31.0**: Released today with 717 commits from 307 contributors (96 new).  
  - ✅ **Default SM100 support** for `DeepSeek-V4.1-Flash` via FlashMLA + NVFP4 KV cache (`#56935`).  
  - ✅ **DeepGEMM sparse MQA logits** now enabled by default for V4.1 indexer (`#56254`).  
  - 🔧 No breaking changes reported; backward compatibility maintained.  
  📌 [GitHub Release v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0)

---

### **3. New Model & Hardware Support**  
- **Models**:  
  - Full support for **GLM-5.3-Flash** with ongoing optimizations (`#57406`, `#56868`).  
  - **Qwen3.8-2.4T-A95B-gfx950** performance roadmap launched for MI355X (`#57149`).  
  - **DeepSeek-V4-Flash** now fully functional on B300 (SM100) after kernel fix (`#46796` resolved in v0.31.0).  

- **Hardware & Backends**:  
  - **ROCm (AMD)**:  
    - Fused QK-norm+RoPE+gate Triton kernel for Qwen3-Next/Qwen3.5 (`#51406`).  
    - Optimized mHC seam routing for gfx942 (`#60153`) and gfx950 (`#57149`).  
    - Sparse MLA fusion of inverse RoPE + MXFP8 quant for DeepSeek-V4.1 (`#60154`).  
  - **CUDA**:  
    - Enhanced Engram lookup speed for small batches (`#57893`).  
    - NVFP4 PLE table support for `host_file_gather` (`#59958`).  

- **Quantization**:  
  - **NVFP4** now supported in host-file gather and FlashInfer autotuning (`#59958`, `#60085`).  
  - **TurboQuant/HIGGS** follow-ups continue (e.g., MLA support tracking `#40069`).  

---

### **4. Performance & Optimization**  
- **Throughput & Latency**:  
  - **GB300**: Small Engram lookups improved by **6.1% (1-user), 19.4% (2-user), 28.1% (4-user)** via two-row tile optimization (`#57893`).  
  - **gfx942 (ROCm)**: mHC seam kernels reduced from ~300µs to single fused call — eliminates redundant AITER launches (`#60153`).  
  - **Multi-GPU**: `VLLM_BATCH_INVARIANT=1` now preserves MoE gate invariance across batch dimensions (`#59985`).  

- **Memory & Kernel Efficiency**:  
  - **FlashInfer autotune table preloading** reduces startup latency via daemon-backed cache (`#60085`).  
  - **Triton attention** now preserves small FP8 softmax weights to prevent underflow (`#60156`).  
  - **Manual CUDA RoPE-KV fusion** added for Llama models (`#52363`).  

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| ⚠️ High | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash long-decode degeneration after accumulated reasoning | Open — affects high-concurrency inference |
| ⚠️ High | [#53670](https://github.com/vllm-project/vllm/issues/53670) | EAGLE/MTP prefix-cache drop causes 1,648-token recompute → ~30–40% throughput loss | Fixed in `#52244` (merged) |
| ⚠️ Medium | [#59642](https://github.com/vllm-project/vllm/issues/59642) | Qwen3.8-flash-next 0% MTP acceptance rate in disaggregated serving | Open — critical for speculative decoding workflows |
| ⚠️ Medium | [#59413](https://github.com/vllm-project/vllm/issues/59413) | GLM-5.3-Flash gibberish at low concurrency on ROCm | Open — likely due to tensor alignment or kernel launch |
| ⚠️ Low | [#49497](https://github.com/vllm-project/vllm/issues/49497) | FlashInfer sampler JIT crashes if `nvcc` not discoverable | Open — no fallback to native sampler |

> ✅ **Fixes merged**:  
> - `#52244`: Restores hybrid GDN prefix-cache hits under MTP spec decoding (`#53670`)  
> - `#60156`: Prevents FP8 softmax underflow in Triton attention  

---

### **6. What This Means for Application Developers**  
- **Use v0.31.0** for best performance on **DeepSeek-V4.1-Flash** and **Qwen3.8** models on **NVIDIA SM100/B300** and **AMD gfx942/gfx950**.  
- **Enable `--kv-cache-dtype nvfp4`** for up to 2× higher capacity on large-context models.  
- **Avoid speculative decoding** with hybrid Qwen3.8 layouts until `#53670` is fully validated — expect up to **40% throughput loss**.  
- **Leverage disaggregated serving** with `/render` → `/inference/v1/generate` → `/derender` pipeline; ensure you’re using latest `v1` endpoints (`#56851`, `#42729`).  
- **Monitor weight reloading correctness** if using RL rollouts (`#48312`) — correctness is still being refined.  
- **For ROCm users**: Expect better performance on Qwen3.5/Next and DeepSeek-V4.1 with fused kernels (`#51406`, `#60154`).  

👉 **Recommended actions**: Upgrade to v0.31.0, validate GLM-5.3-Flash behavior under long-decode workloads, and test MTP speculative decoding with Qwen3.8.  

---  
*Digest generated: 2026-10-06 | Source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-10-06

---

### **1. Today's Highlights**  
SGLang continues its aggressive push toward full Blackwell (SM12x) and ROCm support, with key PRs enabling decode context parallelism (DCP) for GLM-5 and DeepSeek-V3.2 on AMD GPUs. Critical stability fixes address memory corruption in the scheduler (`double free or corruption`) and a persistent deadlock in HiCache + DeepSeek-V4 under long prefills—both impactful for production inference workloads.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- ✅ **ROCm/AMD Support**:  
  - [PR #42618](https://github.com/sgl-project/sglang/pull/42618): Added **decode context parallelism (DCP)** for **GLM-5** and **DeepSeek-V3.2** on ROCm (MI350X, sm_90).  
  - [PR #41794](https://github.com/sgl-project/sglang/pull/41794): Initial **Kimi-K3 Quark FP8/MXFP4 fusion** support on AMD, targeting improved efficiency for MLA models.  
- ✅ **Blackwell (SM12x) GPU Support**:  
  - [PR #30705](https://github.com/sgl-project/sglang/pull/30705) (already merged) enables diffusion and LLM inference on **RTX PRO 6000 Blackwell (sm_121)** and DGX Spark GB10.  
- ✅ **Diffusion Model Enhancements**:  
  - [PR #35623](https://github.com/sgl-project/sglang/pull/35623): Introduced **tiered AdaLN cache** for MiniMax-H3, reducing resident memory by avoiding static `adaln_proj` weights.  
  - [PR #37822](https://github.com/sgl-project/sglang/pull/37822): Mapped checkpoint files as **read-only** on host to reduce redundant memory bandwidth usage on GB10.

---

### **4. Performance & Optimization**  
- 🔥 **Prefill Context Parallelism (CP)**:  
  - [Issue #21788](https://github.com/sgl-project/sglang/issues/21788) (High Priority, Roadmap): Progress on **prefill CP for MHA/GQA backends** (FlashInfer/TRTLLM-MHA), now blocked only on backend integration. Already supports MLA (Dpsk v3/Kimi-K2.5) and SWA.  
- ⚙️ **Kernel & Memory Optimizations**:  
  - [PR #42698](https://github.com/sgl-project/sglang/pull/42698): Reduced per-call overhead in Kimi-K3 MLA projection path from 87–117 μs to near-zero via **per-weight cached launcher**.  
  - [PR #35975](https://github.com/sgl-project/sglang/pull/35975): Fixed incorrect static LoRA merging during FP8 quantization, preventing crashes and invalid outputs.  
- 📈 **Model-Specific Tuning**:  
  - [Issue #42170](https://github.com/sgl-project/sglang/issues/42170): Ongoing optimization for **DeepSeek-V4.1**, including mHC code cleanup and prefill optimizations.

---

### **5. Stability & Regressions**  
⚠️ **Critical Crashes & Deadlocks**:  
1. [Issue #42508](https://github.com/sgl-project/sglang/issues/42508): **Scheduler aborts with `double free or corruption`** during idle-loop invariant check → server hangs permanently. High severity; no fix yet.  
2. [Issue #42465](https://github.com/sgl-project/sglang/issues/42465): **TP rank deadlock** in **DeepSeek-V4 + HiCache write_through** under concurrent long prefills. Scheduler/detokenizer go silent, `/health` returns 503. Fix pending.  
3. [Issue #35884](https://github.com/sgl-project/sglang/issues/35884): `/health` handler doesn’t cancel stalled requests → orphaned health checks pile up → **paged-prefill batching crash**.  

⚠️ **Other Notable Bugs**:  
- [Issue #41939](https://github.com/sgl-project/sglang/issues/41939): **GLM-5.3-Flash NVFP4** loops indefinitely with no final answer on B200/B300 at TP4.  
- [Issue #42074](https://github.com/sgl-project/sglang/issues/42074): **DeepSeek-V4-Pro decode throughput dropped ~5%** on GB300 after #39704 — regression confirmed in nightly builds.

---

### **6. What This Means for Application Developers**  
- ✅ **Leverage DCP on AMD**: If you’re using **GLM-5 or DeepSeek-V3.2** on ROCm, enable `--dcp-size` to reduce KV cache memory pressure across ranks.  
- ⚠️ **Avoid HiCache + write_through** for DeepSeek-V4 until #42465 is resolved—risk of total service hang under load.  
- 🔍 **Monitor health checks**: The `/health` bug may cause cascading failures in orchestration systems—consider custom liveness probes if relying on SGLang’s default.  
- 💡 **Use optimized routing**: With [PR #42665](https://github.com/sgl-project/sglang/pull/42665), router can now share DeepSeek-V4 prompt rendering logic with the Rust server—improves consistency and reduces duplication.  
- 🛠 **Watch for regressions**: Avoid recent nightly builds if running DeepSeek-V4-Pro or GLM-5.3-Flash NVFP4 on TP4 due to known performance and correctness issues.

> *For real-time updates, follow the [SGLang GitHub Issues](https://github.com/sgl-project/sglang/issues) and [Discussions](https://github.com/sgl-project/sglang/discussions).*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-06**

---

### **1. Today's Highlights**  
The `v0.6.0` release introduces the **`llama_batch_ext` extended batch API**, enabling mixed token/embedding inputs and support for **MTP/deepstack state embeddings**, crucial for advanced speculative decoding workflows. This update also adds native support for the **GLM-5.3-Flash (GLM5-Next) 320B hybrid model**, **Clef decision model (text + vision)**, and key optimizations across Hexagon, CUDA, Vulkan, and ROCm backends—signaling strong momentum in multi-modal and large-scale inference.

---

### **2. Releases & Breaking Changes**  
- **`v0.6.0` released**: [GitHub Release](https://github.com/ggml-org/llama.cpp/releases/tag/v0.6.0)  
  - Introduces `llama_batch_ext` with `llama_process` for mixed input handling (tokens + embeddings).  
  - Enables MTP/deepstack state embedding support via new batch semantics.  
  - Requires updates to client code using `llama_batch` if leveraging advanced batching or MTP features.  
  - Migration note: Existing `llama_batch` users should review [PR #29622](https://github.com/ggml-org/llama.cpp/pull/29622) for compatibility with dual embd+token batches.

---

### **3. New Model & Hardware Support**  
- **Models Added**:  
  - **GLM-5.3-Flash (GLM5-Next) 320B Hybrid**: Full support via `--spec-draft-model` and MTP spec.  
    [Issue #29811](https://github.com/ggml-org/llama.cpp/issues/29811) — *Qwen 3.8 Flash MTP eval bug confirmed*  
  - **Clef Decision Model (Text + Vision)**: Server now supports vision input via `/v1/chat/completions` with image tokens.  
    [PR #29969](https://github.com/ggml-org/llama.cpp/pull/29969)  

- **Hardware & Backends**:  
  - **Hexagon (Qualcomm QNN)**: Added 1D/2D pooling ops (`pool_1d`, `pool_2d`) for Gemma 4 CLIP graph.  
    [PR #29995](https://github.com/ggml-org/llama.cpp/pull/29995)  
  - **CUDA**: Optimized `mmq` accumulation for NVFP4; improved flash-attention scalability on row-split multicore.  
    [PR #29974](https://github.com/ggml-org/llama.cpp/pull/29974), [PR #29857](https://github.com/ggml-org/llama.cpp/pull/29857)  
  - **Vulkan**: Fixed out-of-bounds write in Flash Attention and stale prealloc_y reuse.  
    [PR #29988](https://github.com/ggml-org/llama.cpp/pull/29988), [PR #29591](https://github.com/ggml-org/llama.cpp/pull/29591)  
  - **ROCm/HIP**: Tuning ongoing for GCN arch (`mmq`, `stream_k`); see [PR #30022](https://github.com/ggml-org/llama.cpp/pull/30022) and [PR #30021](https://github.com/ggml-org/llama.cpp/pull/30021)

---

### **4. Performance & Optimization**  
- **Hexagon**: HMX matmul now supports F16 activation + non-multiple-of-32 row counts; improves throughput on multi-sequence workloads.  
  [PR #29779](https://github.com/ggml-org/llama.cpp/pull/29779), [PR #29626](https://github.com/ggml-org/llama.cpp/pull/29626)  
- **Vulkan**: RMSNorm optimization via subgroup reductions (Intel Arc B70 Pro, RTX 4060 Ti tested).  
  [PR #29882](https://github.com/ggml-org/llama.cpp/pull/29882) *(WIP)*  
- **CUDA**: Row-split flash-attention partitioning enhances core utilization.  
  [PR #29974](https://github.com/ggml-org/llama.cpp/pull/29974)  
- **General**: Unified modalities struct and refactored context state tests improve maintainability and reduce duplication.  
  [PR #30015](https://github.com/ggml-org/llama.cpp/pull/30015), [PR #30023](https://github.com/ggml-org/llama.cpp/pull/30023)

---

### **5. Stability & Regressions**  
- **Critical Crashes**:  
  - `llama server` crashes during decode with **Gemma 4 31B (MTP + tensor)** due to fatal error in `fattn.cu:579`.  
    [Issue #24440](https://github.com/ggml-org/llama.cpp/issues/24440) — *No fix PR yet*  
  - **Qwen3.8-Flash-Next** fails at startup with MTP when using `--spec-draft-model`.  
    [Issue #29811](https://github.com/ggml-org/llama.cpp/issues/29811) — *Confirmed regression; no fix PR*  
  - **Multi-GPU layer split** causes deterministic crash at fixed token position under Qwen4exp.  
    [Issue #29562](https://github.com/ggml-org/llama.cpp/issues/29562) — *Multiple runtimes affected*

- **Other Issues**:  
  - **Vulkan long-running degradation**: A770 GPU produces empty EOS replies after ~7–8 hours.  
    [Issue #29526](https://github.com/ggml-org/llama.cpp/issues/29526) — *Needs investigation*  
  - **ROCm RPC crash** on TOP_K with distributed Qwen3.8-Flash-Next.  
    [Issue #27865](https://github.com/ggml-org/llama.cpp/issues/27865) — *Stale but unresolved*

---

### **6. What This Means for Application Developers**  
- **Enable advanced MTP workflows**: With `llama_batch_ext`, you can now build agents that use **mixed token/embedding inputs** and **deepstack state tracking**—ideal for high-throughput speculative decoding.  
- **Adopt multi-modal models safely**: Clef and GLM5-Next support opens doors for **vision-augmented LLM agents**; ensure your client handles image token payloads correctly.  
- **Avoid known regressions**: Do not use `--spec-draft-model` with Qwen3.8-Flash-Next or Gemma 4 31B until fixes land.  
- **Optimize for target hardware**: Use `--target-bpw` quantization (via PR #15550) to auto-tune model size vs. accuracy.  
- **Monitor long-running servers**: The Vulkan A770 memory leak is a critical risk for production deployments—consider restart schedules or fallback to CUDA.

> ✅ **Recommended Action**: Update to `v0.6.0` for full MTP + vision support, but test against `Qwen3.8-Flash-Next` and `Gemma 4 31B` until issue fixes are merged.  
> 🔗 See [official website](https://llama.app) for binaries and [attestations](https://github.com/ggml-org/llama.cpp/attestations) for integrity verification.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-06**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with critical stability fixes for MLX and CUDA backends, particularly around GPU memory residency and model loading failures. Notably, a regression in `glm-ocr` (0.35.1) breaks table recognition, while multiple issues highlight persistent challenges with tool-call parsing consistency across Qwen variants. Performance improvements are underway, including SDPA acceleration for Gemma4 on CUDA.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, **0.35.1** is under active scrutiny due to regressions:
- `glm-ocr:latest` now fails to generate HTML tables and enters infinite loops (`#18810`) — likely a parser or tokenization issue.
- `clef-flash` model crashes on `/v1/systemone` despite working on `/v1/chat/completions` (`#18769`).
- The `envconfig` module has a documented integer overflow risk in `OLLAMA_KEEP_ALIVE`/`OLLAMA_LOAD_TIMEOUT` (`#18799`, fixed in PR `#18800`).

> 🔗 [Issue #18799](https://github.com/ollama/ollama/issues/18799), [PR #18800](https://github.com/ollama/ollama/pull/18800)

---

### **3. New Model & Hardware Support**  
- **MLX Engine**: Added support for **Kolibri 1** (PR `#18780`), expanding Apple Silicon compatibility.
- **CUDA**: Gemma4 models now leverage **MLX’s SDPA kernel** for wide-head dimensions (e.g., 128+ heads), significantly improving prefill speed (`#18809`).
- **ROCm (Windows)**: Expanded GPU support list to include `gfx1030`, `gfx1150`, `gfx1151`, `gfx1200`, `gfx1201` — crucial for AMD users (`#18623`).

> 🔗 [PR #18780](https://github.com/ollama/ollama/pull/18780), [PR #18809](https://github.com/ollama/ollama/pull/18809), [PR #18623](https://github.com/ollama/ollama/pull/18623)

---

### **4. Performance & Optimization**  
- **Gemma4 on CUDA**: Using MLX’s SDPA kernel accelerates prompt processing by **~12x on e2b**, **2–4x on 12B models** (`#18809`).
- **MLX Memory Efficiency**: Mitigated high latency after GPU idle by refreshing model residency every second (`#18807`), resolving `#18744`.
- **Model Lookup Overhead**: Reduced redundant manifest decoding and reused Metal scratch buffers (`#18806`).
- **Tool Call Streaming**: Optimized event stream ordering and message closure via `FinishMessageItem` reuse (`#18804`).

> 🔗 [PR #18809](https://github.com/ollama/ollama/pull/18809), [PR #18807](https://github.com/ollama/ollama/pull/18807), [PR #18806](https://github.com/ollama/ollama/pull/18806)

---

### **5. Stability & Regressions**  
**High Severity**:
- `clef-flash` model fails on `/v1/systemone` with “non-finite logit” (CUDA) / “cannot open model” (CPU) — even though it works elsewhere (`#18769`). No fix yet.
- `glm-ocr` regression in 0.35.1 causes looping and plain text output instead of structured HTML (`#18810`). Affects Windows + RTX 5060 Ti.
- `llama-server` wedges on full-cache-hit tasks (CUDA, Linux), hanging all subsequent requests until model unload (`#18685`). High impact for production use.

**Medium Severity**:
- `qwen3.6` tool-call output occasionally fails to parse due to mismatched parser (Qwen3.5) — intermittent 500 errors (`#16383`).
- `Muse Glimmer 30B GGUF` produces no response; suspected Jinja template conflict (`#18808`).
- `mistral-medium-3.5:128b` consumes excessive RAM (>127GB) and runs at ~1 word/min on M4 Macs (`#18770`).

> 🔗 [Issue #18769](https://github.com/ollama/ollama/issues/18769), [Issue #18810](https://github.com/ollama/ollama/issues/18810), [Issue #18685](https://github.com/ollama/ollama/issues/18685)

---

### **6. What This Means for Application Developers**  
- **Avoid `glm-ocr:latest` in 0.35.1** — revert to 0.34.0 or patch via `--no-cache` if using OCR-heavy workflows.
- **Validate tool-call parsers** when using `qwen3.6`: expect intermittent 500s if relying on `qwen3.5` parser logic.
- **Monitor model load behavior** on large models like `mistral-medium-3.5:128b` — memory pressure can cause severe slowdowns.
- **Use `OLLAMA_KEEP_ALIVE` carefully**: values > 2^31 seconds may wrap into short timeouts — apply `#18800` fix if customizing.
- **For agent frameworks**: Ensure streaming handlers correctly handle `output_index` reuse and message closure (`#18798` → `#18804`).

> 🔗 [Fix PR #18804](https://github.com/ollama/ollama/pull/18804), [Fix PR #18800](https://github.com/ollama/ollama/pull/18800)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-06**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem saw a wave of critical bug fixes and integration testing improvements, particularly around cost attribution, streaming behavior, and JWT/authorization flows. Key PRs addressed long-standing issues with spend logging (e.g., `spend = 0` for streamed requests), corrected misrouting in model groups, and enhanced proxy stability under concurrent load. A major focus was on improving the reliability of `/v1/messages`, `/responses`, and budgeting endpoints — all vital for production agent systems.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several patch release PRs were merged to refresh dependencies across stable branches:  
- [PR #44777](https://github.com/BerriAI/litellm/pull/44777) → v1.104.1 (stable/1.104.x)  
- [PR #44776](https://github.com/BerriAI/litellm/pull/44776) → v1.103.4 (stable/1.103.x)  
- [PR #44775](https://github.com/BerriAI/litellm/pull/44775) → v1.102.3 (stable/1.102.x)  
- [PR #44774](https://github.com/BerriAI/litellm/pull/44774) → v1.100.5 (stable/1.100.x)  
- [PR #44773](https://github.com/BerriAI/litellm/pull/44773) → v1.101.5 (stable/1.101.x)  

These are **non-breaking dependency updates** aimed at security and compatibility; no API changes.

---

### **3. New Model & Hardware Support**  
*No new models or hardware backends added today.*  
But notable progress was made in handling **multi-modal routing**:  
- [PR #44211](https://github.com/BerriAI/litellm/pull/44211) fixed DeepSeek’s silent drop of image content from `role=tool` messages — now properly preserved in vision-enabled workflows.  
- [PR #44679](https://github.com/BerriAI/litellm/pull/44679) ensures regional uplift multipliers are applied correctly for **Vertex AI image generation**, enabling accurate cost tracking for globally deployed models.

---

### **4. Performance & Optimization**  
*No direct throughput or latency improvements landed today*, but significant progress was made in **scaling readiness** and **resource management**:  
- [PR #44638](https://github.com/BerriAI/litellm/pull/44638) improves budget waiver logic by checking the *target model group*, not just alias names — preventing false over-budget rejections.  
- [PR #44732](https://github.com/BerriAI/litellm/pull/44732) ensures model group pricing is derived from actual serving deployments, avoiding mispricing due to alias chains.  
- [Issue #41420](https://github.com/BerriAI/litellm/issues/41420): Proxy still struggles with idle connection retention during low traffic — ongoing concern for high-scale deployments using PGBouncer.  

> ⚠️ For users targeting 500M TPM (per [Issue #38081](https://github.com/BerriAI/litellm/issues/38081)), PostgreSQL connection pooling and idle cleanup remain key bottlenecks requiring manual tuning.

---

### **5. Stability & Regressions**  
Top 3 stability issues reported today:

| Issue | Severity | Fix Status | Link |
|------|----------|------------|------|
| [#44748](https://github.com/BerriAI/litellm/issues/44748) – Concurrent `/v1/messages` calls cause `dictionary changed size during iteration` (500 error) | Critical | ❌ No fix yet | [GitHub Issue](https://github.com/BerriAI/litellm/issues/44748) |
| [#44546](https://github.com/BerriAI/litellm/issues/44546) – `aspeech` calls Gemini TTS twice → double billing | High | ✅ PR pending ([#44546](https://github.com/BerriAI/litellm/pull/44546)) | [GitHub PR](https://github.com/BerriAI/litellm/pull/44546) |
| [#44560](https://github.com/BerriAI/litellm/issues/44560) – `output_config.effort` not mapped to `reasoning_effort` for hosted_vllm via `/v1/messages` | Medium | ❌ No fix yet | [GitHub Issue](https://github.com/BerriAI/litellm/issues/44560) |

> 🔥 **Critical**: The `dictionary changed size during iteration` crash in `/v1/messages` under concurrency could lead to data loss or financial inaccuracies in production systems.

---

### **6. What This Means for Application Developers**  
- **Avoid `/v1/messages` under high concurrency** until PR #44748 is resolved — consider fallback to `/chat/completions` for now.  
- If using **Gemini TTS**, ensure you're on a version with [PR #44546](https://github.com/BerriAI/litellm/pull/44546) to prevent double billing.  
- Use `model_group_alias` carefully: if your alias shares a name with a paid model, it may incorrectly trigger budget checks ([PR #44638](https://github.com/BerriAI/litellm/pull/44638)).  
- **Spend logs are unreliable for streaming requests** — use non-streamed calls when cost accuracy is critical ([Issue #42161](https://github.com/BerriAI/litellm/issues/42161)).  
- Leverage new **integration tests** ([PR #44733](https://github.com/BerriAI/litellm/pull/44733), [#44736](https://github.com/BerriAI/litellm/pull/44736)) to validate your own proxy configurations against real wire contracts.

> 💡 Pro tip: Use the new **Lens datasets feature** ([PR #44765](https://github.com/BerriAI/litellm/pull/44765)) to preserve and reuse real user traces for evaluation — ideal for agent fine-tuning and guardrail validation.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-06**

---

### **1. Today's Highlights**  
The Unsloth team continues to prioritize stability and user experience in the desktop and Studio UI, with multiple PRs focused on preserving model metadata (prompts, templates, chat configs) during fine-tuning and export workflows. Critical fixes address regression issues in context handling, memory management, and API consistency—especially for Qwen3-series models and LoRA-based inference. Notably, support for MoE architectures (Qwen3.5/3.6, Gemma-4) under `fast_inference` is being actively explored via PR #12742.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several breaking changes are in flight:  
- **PR #12794**: Fixes incorrect chat template usage when exporting Mac-trained LoRAs, ensuring base model prompts are preserved.  
- **PR #12795**: Restores lost `model.prompts` for embedding models (EmbeddingGemma, Qwen3-Embedding), preventing training without proper prompt injection.  
- **PR #12791**: Ensures API clients receive the same sampling parameters (temperature=0.6, top_p=0.95) as interactive Chat mode for Qwen3 thinking mode.  

👉 [PR #12794](https://github.com/unslothai/unsloth/pull/12794) | [PR #12795](https://github.com/unslothai/unsloth/pull/12795) | [PR #12791](https://github.com/unslothai/unsloth/pull/12791)

---

### **3. New Model & Hardware Support**  
- **MoE Models (Qwen3.5/3.6, Gemma-4)**: Experimental support for `fast_inference=True` with LoRA applied to expert layers is under active development (PR #12742). This will enable high-throughput inference on large-scale mixture-of-experts models via vLLM.  
- **Intel GPU Support**: Users continue requesting native Intel GPU integration beyond Vulkan llama.cpp (Issue #8931), though no official build has been released yet.  
- **ModelScope Integration**: Feature request #2969 seeks to allow downloading models from ModelScope instead of Hugging Face—important for users in regions with restricted HF access.

👉 [PR #12742](https://github.com/unslothai/unsloth/pull/12742) | [Issue #2969](https://github.com/unslothai/unsloth/issues/2969) | [Issue #8931](https://github.com/unslothai/unsloth/issues/8931)

---

### **4. Performance & Optimization**  
- **Context Usage Visualization**: PR #12805 introduces a ring-based context usage indicator (`3.2k / 131.1k`) replacing the bar, improving readability at a glance.  
- **Code Font Size Fix**: Default code font now set to 12px across all screen widths, aligning with user interface consistency.  
- **Memory Management Improvements**:  
  - PR #12752 enables Qwen-Image-2.1 edits on 16GB GPUs by optimizing memory allocation logic.  
  - PR #12753 prevents excessive host memory use during streamed inference by deferring loading of unpinned blocks until needed.  
- **Web Search Stability**: Issue #12638 reports connection resets in `primp h2_client`, indicating ongoing HTTP/2 stack tuning required.

👉 [PR #12805](https://github.com/unslothai/unsloth/pull/12805) | [PR #12752](https://github.com/unslothai/unsloth/pull/12752) | [PR #12753](https://github.com/unslothai/unsloth/pull/12753)

---

### **5. Stability & Regressions**  
- **Severe T/S Regression in Studio** (Issue #12372): MM projection file (`mmproj-F16.gguf`) is now paged from disk during generation, causing dramatic latency increases. *Fix pending.*  
- **Think Toggle Fails to Suppress Reasoning** (Issue #12708): For `gemma-4-E4B-it-qat-GGUF`, the "Think" toggle outputs only internal reasoning steps—no final response. High severity; impacts agent logic.  
- **Export to GGUF Fails Due to Read-Only Cache** (Issue #11785): Merge step fails due to immutable cached model files in HF cache. *Workaround: Clear cache or use local path.*  
- **Qwen3.5 SFT Loss Goes NaN** (Issue #12737): Deterministic loss explosion during fine-tuning despite clean training on identical data—likely a gradient or optimizer issue.  
- **ARM64 Linux Build Misidentified** (Issue #12680): Downloaded ARM64 package is macOS binary, breaking Linux deployment. *Critical fix needed.*

👉 [Issue #12372](https://github.com/unslothai/unsloth/issues/12372) | [Issue #12708](https://github.com/unslothai/unsloth/issues/12708) | [Issue #11785](https://github.com/unslothai/unsloth/issues/11785) | [Issue #12737](https://github.com/unslothai/unsloth/issues/12737) | [Issue #12680](https://github.com/unslothai/unsloth/issues/12680)

---

### **6. What This Means for Application Developers**  
- **Avoid `fast_inference=True` with LoRA-ed MoE models** until PR #12742 lands—currently unsupported and raises runtime errors.  
- **Always validate prompt preservation** after fine-tuning, especially for embedding or vision models (see PRs #12795, #12794).  
- **API clients must explicitly set sampling params** when using Qwen3 thinking mode—default values differ from Chat UI behavior (PR #12791).  
- **Expect instability in long-context chats** and consider disabling `mmproj` caching if performance degrades (Issue #12372).  
- **Backup strategy should include project folders and Library state**, as Docker volumes don’t persist project files (PR #12792).  

> ✅ **Recommendation**: Pin critical models and use `.unsloth portable archive` exports (Issue #8798) for cross-device reproducibility. Monitor GitHub for updates on MoE support and ARM64 Linux builds.

---  
*Digest compiled from unslothai/unsloth GitHub activity — 2026-10-06*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*