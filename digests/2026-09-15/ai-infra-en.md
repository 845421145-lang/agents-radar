# AI Infrastructure Digest 2026-09-15

> Generated: 2026-09-15 00:51 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-15**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q3 2026 is defined by rapid convergence toward high-performance, scalable, and agent-ready systems. Projects are increasingly focused on optimizing next-generation models—particularly MoE architectures with sliding-window attention (SWA) and hybrid quantization schemes—while expanding support for diverse hardware including AMD ROCm, Apple MLX, and embedded NPUs. A clear shift toward *distributed agentic workloads* is evident, with active development in speculative decoding, prefix caching, and cross-node KV sharing. Stability remains a critical concern, especially under high concurrency and on new hardware like NVIDIA B300/H20 and AMD MI355X.

---

### **2. Activity Comparison**

| Project       | Issues Open | PRs Merged (Last 24h) | Releases (Last 24h) | Notes |
|---------------|-------------|------------------------|----------------------|-------|
| **vLLM**      | 87          | 8                      | None                 | High focus on MoE kernel stability & SWA optimization |
| **SGLang**    | 143         | 5                      | None                 | Critical GPU crashes dominate issue tracker; strong DCP progress |
| **llama.cpp** | 124         | 10                     | ✅ v0.4.1            | Major release with model/hardware additions; macOS PCH fix |
| **Ollama**    | 187         | 3                      | ✅ v0.34.1-rc1       | RC release focused on memory safety and agent reliability |
| **LiteLLM**   | 91          | 5                      | None                 | Critical billing fixes merged; routing logic stabilized |
| **Unsloth**   | 112         | 6                      | None                 | UX/security fixes; Docker/local model integration improved |

> 🔍 *Insight*: **SGLang** shows the highest activity volume but also the most instability, while **llama.cpp** leads in release cadence and breadth of new model support.

---

### **3. Model Support Race**

| New Model / Architecture       | Supported By                  | Status | Key Enabler |
|-------------------------------|-------------------------------|--------|-------------|
| **DeepSeek-V4.1-Flash (SWA)** | vLLM, SGLang (proposal), Unsloth (via llama.cpp) | ✅ Fully supported (vLLM) | SWA-bounded replay in vLLM (`#56227`, `#56752`) |
| **Qwen3.5-27B (MXFP4)**      | SGLang, Ollama (requested), llama.cpp | ⚠️ Partial | SGLang CI includes sweep on MI35x |
| **Maple 20B-A1B**, **Tencent Hy 4**, **Spark2.5**, **SenseNova U1/U1.5** | **llama.cpp** (v0.4.1) | ✅ Released | Added via single PR `#28919` |
| **Gemma 4**                   | LiteLLM (preview), SGLang (tracking) | 🟡 Preview | Mantle endpoint in LiteLLM |
| **GLM-5.3-Flash**             | SGLang, vLLM (ROCm), llama.cpp | ✅ Supported | MXFP4/PTPC FP8 on ROCm in SGLang |

> 🏆 **Winner**: **llama.cpp** — fastest to ship support for 5+ new models across multiple vendors, including closed-source proprietary ones.  
> 🥈 **Runner-up**: **vLLM** — leading in optimized handling of cutting-edge SWA/MoE models with deep kernel-level tuning.

---

### **4. Performance Frontier**

| Optimization Focus           | Primary Drivers | Key Developments |
|-------------------------------|------------------|------------------|
| **KV Cache Efficiency**       | vLLM, SGLang     | SWA-bounded replay (vLLM); distributed KV cache system (SGLang #21846); HiCache memory reduction (SGLang #38426) |
| **Batching & Parallelism**    | SGLang, vLLM     | Decode Context Parallelism (DCP); Pipeline + Speculative Decoding fusion (SGLang #30775); FlashMLA V4.1 KV records (vLLM #56893) |
| **Quantization & Memory**     | All projects     | MXFP4/NVFP4 KV records (vLLM); Q2_0 GGUF support (Ollama); SYCL radix select (llama.cpp); packed FP4 storage (SGLang proposal) |
| **Distributed Serving**       | SGLang, vLLM     | Multi-decode P/D disagg fixes (vLLM #51681); DCP + LSE combine backend (SGLang #29736) |
| **Kernel-Level Tuning**       | vLLM, SGLang     | `dsv4_topk` MoE crash fix (vLLM #56760); `fi_a2a` fusion (SGLang #29736); HIP/FATTN-MMA (llama.cpp #28576) |

> 📌 **Frontier Focus**: **MoE + SWA** and **distributed agentic inference** are now the primary battlegrounds, with vLLM and SGLang investing heavily in low-level kernel optimizations and scalable architecture.

---

### **5. Layer Positioning**

| Project       | Core Layer               | Role Summary |
|---------------|----------------------------|--------------|
| **vLLM**      | Inference Engine           | High-throughput, GPU-optimized serving engine; dominant in cloud-scale deployments |
| **SGLang**    | Agentic Inference Framework | Distributed execution engine with focus on long-context agents, speculative decoding, and multi-GPU scaling |
| **llama.cpp** | Local Runtime              | Cross-platform, CPU/GPU-accelerated inference with strong GGUF support; ideal for edge and offline use |
| **Ollama**    | Developer Gateway / CLI    | Unified local inference interface with agent tooling; bridges model access and application workflows |
| **LiteLLM**   | LLM Gateway / Proxy        | Multi-provider abstraction layer with cost accounting, routing, and observability; essential for production proxy stacks |
| **Unsloth**   | Agent Studio / UI Platform | End-to-end agent development environment with sandboxed tool execution, chat replay, and UX polish |

> 🧩 **Strategic Differentiation**:  
> - **Engineers** favor **vLLM** (performance) and **llama.cpp** (portability).  
> - **Agentic developers** rely on **SGLang** (scaling) and **Unsloth** (UX).  
> - **Ops teams** depend on **LiteLLM** (billing) and **Ollama** (simplicity).

---

### **6. Trend Signals**

#### **Emerging Industry Trends (from 2026-09-15 Activity):**
1. **MoE + SWA is mainstream**: DeepSeek-V4.1’s SWA-bounded replay is now a standard requirement—projects must optimize for it or risk performance degradation.
2. **Agent reliability > speed**: Priorities have shifted from raw throughput to *state consistency*, *tool call fidelity*, and *secure sandboxing*—evident in Unsloth’s tool schema fixes and LiteLLM’s guardrail enforcement.
3. **Hardware diversity demands first-class support**: ROCm (AMD), MLX (Apple), NPU (Qualcomm/Rockchip), and even Windows ROCm are no longer niche—projects must address them early.
4. **Cost transparency is non-negotiable**: LiteLLM’s billing fixes reflect growing need for auditability in multi-provider environments.
5. **Stability at scale is the bottleneck**: Despite performance gains, crashes on B300/H20 GPUs and OOM issues on Jetson/M-series Macs signal that robustness must be prioritized over feature velocity.

#### **What Developers Should Watch:**
- ✅ **Pin versions** when deploying MoE/SWA models (especially vLLM v0.29.0+, SGLang v0.5.13+) until regressions are resolved.
- ✅ **Avoid mixed backends** (e.g., Vulkan + Hexagon in llama.cpp) due to output corruption risks.
- ✅ **Enable `OLLAMA_PREFILL_CACHE=1`** and **`--cpu-memory-utilization`** for better long-context efficiency.
- ✅ **Monitor budget logs closely** if using LiteLLM—stale spend data can trigger unexpected outages.
- ✅ **Test agent workflows under load**—many high-severity issues (e.g., `gemma4:26b` EOS loss, tool-call truncation) surface only in production-like scenarios.

> 🔮 **Final Takeaway**: The AI inference stack is maturing rapidly—but *stability, security, and consistency* are now the key differentiators. Choose tools not just for speed, but for resilience under real-world agent workloads.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-15**

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its support for DeepSeek-V4.1, with two key PRs landing that enable encoder-side and decoder-side SWA-bounded replay, critical for efficient inference on the model’s sliding-window attention (SWA) mechanism. Simultaneously, a major stability fix was merged to prevent illegal memory access in the `dsv4_topk` MoE kernel under high concurrency on H20 GPUs—addressing a recurring crash reported by users. These updates reflect ongoing efforts to stabilize next-gen MoE models across diverse hardware.

---

### **2. Releases & Breaking Changes**  
None. No new releases or breaking API/config changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1-Flash**: Native support now includes **SWA-bounded replay** via encoder-side (`#56227`) and decoder-side (`#56752`) implementations, enabling efficient handling of the model’s 128-token sliding window without redundant KV caching.  
- **ROCm Support**: Expanded to include **AMD MI355X (gfx950)** performance tuning for DeepSeek-V4.1 (`#56506`), and fixes for misrouting race conditions in multi-decode P/D disagg serving (`#51681`).  
- **CPU Memory Utilization CLI Alias**: Added `--cpu-memory-utilization` as an alias for `--gpu-memory-utilization` to reduce user confusion in CPU-only deployments (`#56547`).  

> 🔗 [PR #56227](https://github.com/vllm-project/vllm/pull/56227) | [PR #56752](https://github.com/vllm-project/vllm/pull/56752) | [PR #56506](https://github.com/vllm-project/vllm/pull/56506) | [PR #56547](https://github.com/vllm-project/vllm/pull/56547)

---

### **4. Performance & Optimization**  
- **FlashMLA V4.1 KV Records**: DeepSeek-V4.1 now uses dedicated MXFP8/NVFP4 KV records with fused mega attention kernels, improving efficiency and reducing overhead (`#56893`).  
- **DFlash Speculative Decoding**: Identified as a **net performance loss at long context (~185k tokens)** due to full KV re-scanning per cycle; no fix yet, but actively tracked (`#54691`).  
- **Prefix Caching**: Ongoing discussion around Qwen3.5-27B prefix caching performance, with prior regression reports (`#38988`) still unresolved.  
- **ROCm Optimizations**: Enabled packed LBHNC AITER QK-norm fusion for MiniMax-M3 on ROCm, improving sparse path throughput (`#54535`).  

> 🔗 [PR #56893](https://github.com/vllm-project/vllm/pull/56893) | [Issue #54691](https://github.com/vllm-project/vllm/issues/54691) | [PR #54535](https://github.com/vllm-project/vllm/pull/54535)

---

### **5. Stability & Regressions**  
- **Critical Crash Fix**: Illegal memory access in `dsv4_topk` MoE kernel under high concurrency on **NVIDIA H20 (SM90)** resolved via PR `#56760`, mitigated by limiting `max_num_seqs=256`.  
- **GPU Memory Access Errors**: Multiple reports of CUDA illegal memory access on **DGX Spark (SM121)** with FlashInfer + MTP speculative decoding (`#37754`).  
- **GLM-5.3-Flash Repetition Bug**: Model degrades into "word salad" in agentic use cases (`#56605`).  
- **Triton Kernel Issues**: `fp8_ds_mla` cache scale mismatch on SM100+ GPUs fixed (`#49435`).  
- **KV Offload Integrity**: Data integrity and I/O liveness concerns raised for filesystem tier (`#54363`).  

> 🔗 [PR #56760](https://github.com/vllm-project/vllm/pull/56760) | [Issue #56605](https://github.com/vllm-project/vllm/issues/56605) | [Issue #37754](https://github.com/vllm-project/vllm/issues/37754) | [Issue #54363](https://github.com/vllm-project/vllm/issues/54363)

---

### **6. What This Means for Application Developers**  
Developers deploying **DeepSeek-V4.1-Flash** should expect improved efficiency and stability with the latest SWA-bounded replay features, but must avoid high concurrency (`max_num_seqs > 256`) on H20 until further tuning. For **MoE models**, be cautious with speculative decoding at long contexts—DFlash may degrade performance significantly. On **ROCm**, ensure you’re using up-to-date builds with optimized kernels for MiniMax-M3 and DeepSeek-V4.1. Use `--cpu-memory-utilization` instead of `--gpu-memory-utilization` in CPU-only setups to avoid confusion. Monitor `#54363` for filesystem offload reliability if using tiered storage. Finally, consider pinning to v0.29.0 or later for stability fixes, especially when using advanced features like DFlash or MoE routing.  

> 📌 Key Takeaway: **Stability is improving rapidly, but next-gen models (especially MoE + SWA) remain sensitive to configuration and hardware. Test under production-like loads.**

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-15

---

### **1. Today's Highlights**

SGLang continues its aggressive push toward scalable agentic inference with critical work on distributed KV cache systems and decode context parallelism (DCP). High-priority issues around CUDA illegal memory access on B300 and H20 GPUs, particularly in FP8/MegaMoE paths, highlight ongoing challenges in low-level kernel stability. Meanwhile, new PRs address core performance bottlenecks under NVIDIA Confidential Computing and improve compatibility across hybrid models and multi-backend deployments.

---

### **2. Releases & Breaking Changes**

None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**

- **SenseNova-U1/U1.5**: Tracking support via [Issue #37742](https://github.com/sgl-project/sglang/issues/37742), leveraging official OpenSenseNova/SenseNova-U1 as reference.
- **AMD ROCm Support**: Expanded CI coverage for `GLM-5.3-Flash` with MXFP4 quantization and PTPC FP8 KDA projections on gfx950 ([PR #38764](https://github.com/sgl-project/sglang/pull/38764)).
- **AgentX Qwen3.5 MXFP4 + MTP TP2 Sweep on MI35x**: Added to AMD CI pipeline ([PR #38812](https://github.com/sgl-project/sglang/pull/38812)).
- **DeepSeek V4.1**: Proposal to store main KV cache in packed FP4 on Hopper ([Issue #38902](https://github.com/sgl-project/sglang/issues/38902)).

---

### **4. Performance & Optimization**

- **Decode Context Parallelism (DCP)**: Progress on integrating fused `fi_a2a` with LSE combine backend ([Issue #29736](https://github.com/sgl-project/sglang/issues/29736)), enabling efficient cross-node communication for large-scale decoding.
- **Pipeline Parallelism × Speculative Decoding**: Active development to lift mutual exclusion between PP and speculative decoding ([PR #30775](https://github.com/sgl-project/sglang/pull/30775)), crucial for PCIe-only scaling.
- **Confidential Computing (CC) Optimization**: Two PRs fix scheduler stalls caused by synchronous D2H transfers under CC on Blackwell ([PR #36810](https://github.com/sgl-project/sglang/pull/36810), [#31447](https://github.com/sgl-project/sglang/pull/31447)), restoring overlap scheduling efficiency.
- **HiCache Memory Efficiency**: PR #38426 optimizes DSA indexer storage by limiting host-side allocation to only producer layers, reducing unnecessary memory overhead.

---

### **5. Stability & Regressions**

| Severity | Issue | Summary | Fix Status |
|--------|------|--------|------------|
| Critical | [Issue #37559](https://github.com/sgl-project/sglang/issues/37559) | `CUDA_ERROR_ILLEGAL_ADDRESS` in MXFP8FP4/W4A8 MegaMoE path on B300 with sgl-deep-gemm 0.1.7 | ❌ Unresolved |
| Critical | [Issue #37633](https://github.com/sgl-project/sglang/issues/37633) | Hard crash in QSA prefill path at ~22 concurrent requests (Qwen3.8-Flash-Next-FP8, H20 TP8) | ❌ Unresolved |
| High | [Issue #39342](https://github.com/sgl-project/sglang/issues/39342) | `--enable-mixed-chunk` corrupts mamba radix cache checkpoints due to skipped `extra_buffer` write | ✅ Fix pending in PR #39487 |
| High | [Issue #39147](https://github.com/sgl-project/sglang/issues/39147) | HiCacheFile reports unrestorable prefix for hybrid cache pools | ⚠️ Partial understanding; no PR yet |
| Medium | [Issue #25551](https://github.com/sgl-project/sglang/issues/25551) | DeepGemm regression on B300 (sm_103): `CUDA_ERROR_ILLEGAL_ADDRESS` in shared-experts FP8 GEMM | ❌ Resolved in v0.5.13? |

> 🔴 **Note**: Multiple crashes on high-end hardware (B300/H20) with FP8/MoE configurations suggest instability in low-level kernels — a key focus area.

---

### **6. What This Means for Application Developers**

- **Agentic Workloads**: The roadmap for a distributed KV cache system ([Issue #21846](https://github.com/sgl-project/sglang/issues/21846)) signals imminent support for massive-scale agent chains with long context retention. Expect better scalability soon.
- **Multi-GPU Deployments**: Pipeline parallelism + speculative decoding compatibility is being actively built — once available, you’ll be able to scale beyond TP-only limits on PCIe-only clusters.
- **Model Reliability**: Be cautious when deploying Qwen3.8-Flash-Next-FP8 or hybrid MoE models on H20/B300 until fixes land. Monitor `--enable-mixed-chunk` usage due to known checkpoint corruption.
- **Hardware Portability**: Improved AMD ROCm and NPU support enables broader deployment options. Use `hf-hub` 1.0 for private model access ([PR #39496](https://github.com/sgl-project/sglang/pull/39496)) to avoid token issues.
- **Stable Inference**: Avoid `--disable-overlap-schedule` if using speculative decoding under CC; use updated builds that include the async D2H fixes.

➡️ **Recommendation**: Pin your SGLang version until critical GPU regressions are resolved, especially if running production agentic workflows on NVIDIA B300/H20. Follow [Issue #37559](https://github.com/sgl-project/sglang/issues/37559) and [PR #39487](https://github.com/sgl-project/sglang/pull/39487) for updates.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-09-15**

---

### **1. Today's Highlights**  
The `v0.4.1` release introduces critical support for new models including **Maple 20B-A1B**, **Tencent Hy 4**, and **Spark2.5**, alongside significant backend improvements in JSON schema handling, chat parsing, and server process management. Key performance and stability work includes GPU kernel optimizations (HIP/FATTN-MMA), SYCL memory pool fixes, and a major fix to prevent heap corruption on macOS due to precompiled headers.

---

### **2. Releases & Breaking Changes**  
- **v0.4.1** released: [GitHub Release](https://github.com/ggml-org/llama.cpp/releases/tag/v0.4.1)  
- **API Change**: `llama_sampler_chain_n()` now returns `int32_t` instead of `int` — ensure downstream bindings are updated.  
- **CI/CD Improvements**: Ubuntu-CUDA builds (12.8/13.3) added for x64 and arm64; GCC 14 enabled for CUDA arm64 builds.  
- **macOS Apple Silicon Builds**: New arm64 builds available at [GitHub Releases](https://github.com/ggml-org/llama.cpp/releases/download/b10964).

---

### **3. New Model & Hardware Support**  
- **New Models Added**:  
  - Maple 20B-A1B ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - Tencent Hy 4 ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - Spark2.5 ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - SenseNova U1 ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  

- **Hardware & Backend Enhancements**:  
  - HIP/ROCm: FP32 accumulation on CDNA devices via `fattn-mma` (#28576).  
  - SYCL: Radix select for `top_k` with large `k`, enabling GPU-resident sorting (#28670).  
  - Vulkan: Fixes for performance regression and O(N²) fallbacks under high load (#24066, #27638).  
  - Metal: Fixes for audio corruption under system load (#28441).  
  - WebGPU: Crash fix in test suite on macOS (#28722).  

---

### **4. Performance & Optimization**  
- **Kernel-Level Optimizations**:  
  - HIP: Use fp32 accumulators in `fattn-mma` on CDNA devices → improves numerical stability and throughput.  
  - SYCL: Coalesce MKL-FA softmax loads into fewer work-items → reduces kernel launch overhead (#28918).  
  - CUDA: Refactor Flash Attention shared memory swizzling (WIP) for better SM utilization (#28536).  
- **Memory Efficiency**:  
  - Fix incorrect `mmproj` memory margin addition on sleep/resume (#28233, #26401).  
  - Avoid double-adding memory margin during model reloads.  
- **Latency Reduction**:  
  - Move `llama_n_rs_seq` before `llama_decode` to avoid unnecessary state updates (#28749).  
  - Improve scratchpad reuse in SYCL backend to reduce allocation churn (#28704).  

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR / Notes |
|------|----------|--------|----------------|
| [Issue #24066](https://github.com/ggml-org/llama.cpp/issues/24066): Vulkan performance drop on RX 6600 | High | Open | Reproduced on recent builds; linked to `b9484` |
| [Issue #25808](https://github.com/ggml-org/llama.cpp/issues/25808): SYCL segfault with `GGML_SYCL_DEVICE_ARCH=xe2` | Critical | Closed | Likely resolved by CI changes |
| [Issue #28753](https://github.com/ggml-org/llama.cpp/issues/28753): GGML crash – unexpected graph reallocation | High | Open | Related to scheduler splits; no fix yet |
| [Issue #28858](https://github.com/ggml-org/llama.cpp/issues/28858): macOS arm64 heap corruption from PCH | Critical | Closed | Fixed in `b10955` via disabling PCH (#28882) |
| [Issue #28860](https://github.com/ggml-org/llama.cpp/issues/28860): SYCL extreme scratchpad allocation (>2GB) with `ngram-mod` | High | Open | Blocks deployment on low-memory systems |
| [Issue #2891](https://github.com/ggml-org/llama.cpp/issues/2891): Garbled output with Vulkan + Hexagon backends | High | Closed | Deterministic but invalid output when mixing backends |

> ✅ **Fixed**: Heap corruption on macOS (`b10955`) — confirmed stable in `v0.4.1`.  
> ⚠️ **Critical Risk**: Multiple SYCL crashes and memory issues remain open; developers using Intel Arc GPUs should monitor closely.

---

### **6. What This Means for Application Developers**  
- **Model Integrators**: The addition of **Maple**, **Tencent Hy 4**, and **SenseNova U1** expands your choice of locally deployable models. Use `--model-draft` with DFlash2 safely only if avoiding dual-Arc setups (see #28778).  
- **Server Deployers**: Upgrade to `v0.4.1` to benefit from improved logging, child-process management, and fixed API-key handling for `/metrics` (#28915).  
- **Agent Builders**: Expose speculative decoding via C API is now tracked in [#27469](https://github.com/ggml-org/llama.cpp/issues/27469); expect public API access soon.  
- **Multi-GPU Users**: Avoid combining Vulkan + Hexagon backends simultaneously — known to produce garbled output (#2891).  
- **Performance Tuning**: If using SYCL or Vulkan, avoid `ngram-mod` until #28860 is resolved. For high-k top-k sampling, use SYCL’s new radix-select path (#28670) for better scalability.  

> 🔗 **Recommended Actions**:  
> - Update to `v0.4.1` immediately for stability.  
> - Review API changes (`llama_sampler_chain_n` return type).  
> - Monitor SYCL issues if using Intel Arc GPUs.  
> - Test draft model loading with dual-GPU configurations cautiously.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-15**

---

### **1. Today's Highlights**  
The latest release, `v0.34.1-rc1`, focuses on stability and memory management for MLX-backed models, particularly around prefix cache eviction and OOM handling on Apple Silicon and Jetson devices. Critical fixes address silent tool-call discards, malformed structured output (e.g., leading dots in JSON), and intermittent "model not found" errors—key concerns for agent developers using long-context workflows.

---

### **2. Releases & Breaking Changes**  
- **`v0.34.1-rc1`**:  
  - ✅ *App*: Fixed ChatGPT model selector spacing (minor UX).  
  - 📦 *MLX Runner*: Now checks free system memory before loading models; evicts prior runners proactively to prevent OOM.  
  - 🔒 *LLM Core*: Raised token repeat limit to 100 and now returns explicit error instead of silently truncating.  
  - ⚠️ *API Deprecation*: `typical_p` parameter is deprecated for new model creation (retained for legacy GGUF models only). [PR #18448](https://github.com/ollama/ollama/pull/18448)

---

### **3. New Model & Hardware Support**  
- **Hardware**:  
  - ✅ **Qualcomm IQ-9075 NPU/GPU** support requested ([#18445](https://github.com/ollama/ollama/issues/18445)).  
  - ✅ **Rockchip NPU (RK3588/RK3576)** support requested ([#9268](https://github.com/ollama/ollama/issues/9268)).  
  - ✅ **ROCm 10 on Windows** support requested ([#18435](https://github.com/ollama/ollama/issues/18435)).  
- **Quantization**:  
  - ✅ **Q2_0 GGUF tensors** now supported in `ggml` backend ([PR #18443](https://github.com/ollama/ollama/pull/18443)) — resolves import failures for models using this format.

---

### **4. Performance & Optimization**  
- **MLX Prefix Cache**:  
  - Fixed 8 GiB hard cap causing heavy swap on 32GB Apple Silicon Macs ([#18131](https://github.com/ollama/ollama/issues/18131)).  
  - Experimental prefill cache persistence across runner reloads added via `OLLAMA_PREFILL_CACHE=1` ([PR #17953](https://github.com/ollama/ollama/pull/17953)) — reduces redundant prefill computation.  
- **Load Time & Memory**:  
  - MLX runner now detects stalled loads and avoids premature timeout cancellation ([PR #17834](https://github.com/ollama/ollama/pull/17834)).  
  - Hugging Face direct URL resolution bounded to 10 seconds to prevent 30-second context exhaustion ([PR #18437](https://github.com/ollama/ollama/pull/18437)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|--------|
| 🔴 High | `gemma4:26b` concurrent decode loses EOS at `num_predict` | Open | [#18442](https://github.com/ollama/ollama/issues/18442) |
| 🔴 High | `kimi-k3:cloud` crashes on image content in tool-role messages | Open | [#18426](https://github.com/ollama/ollama/issues/18426) |
| 🔴 High | Jetson Orin Nano 8GB: Gemma 4 E4B projector causes host OOM despite CPU-projector config | Open | [#18396](https://github.com/ollama/ollama/issues/18396) |
| 🔴 High | MLX runner fatal OOM during long context due to unhandled paged-out snapshot load | Open | [#18231](https://github.com/ollama/ollama/issues/18231) |
| 🟡 Medium | Tool-call object keys with spaces dropped silently | Open | [#18390](https://github.com/ollama/ollama/issues/18390) |
| 🟡 Medium | Structured output prefixed with stray `.` in MLX engine | Open | [#18441](https://github.com/ollama/ollama/issues/18441) |
| 🟡 Medium | `previous_response_id` follow-ups return empty response | Open | [#18419](https://github.com/ollama/ollama/issues/18419) |
| 🟡 Medium | Intermittent "model not found" errors due to case canonicalization bug | Open | [#18438](https://github.com/ollama/ollama/pull/18438) |

> Note: Several high-severity issues affect multi-agent workflows, multimodal inference, and long-context stability — especially on Apple Silicon and embedded platforms.

---

### **6. What This Means for Application Developers**  
- **Agent Workflows**: Avoid `gemma4:26b` and `kimi-k3:cloud` in production until fixes land; use `qwen3.8:27b` as a stable alternative.  
- **Long Contexts**: Enable `OLLAMA_PREFILL_CACHE=1` to reduce latency on repeated requests. Monitor memory usage closely on M-series Macs and Jetsons.  
- **Structured Output**: Do not rely on MLX output with `format: json_object` until [#18441](https://github.com/ollama/ollama/issues/18441) is resolved — expect invalid JSON.  
- **Tool Integration**: Handle `previous_response_id` carefully — the API currently returns empty responses instead of rejecting invalid continuations. Use `openai: support previous_response_id` ([PR #18434](https://github.com/ollama/ollama/pull/18434)) if available.  
- **Deployment**: For edge/embedded devices (Jetson, Rockchip), test model loading under memory pressure; consider CPU-based projectors or smaller quantizations (e.g., Q2_0) where possible.

> 💡 **Pro Tip**: Use [LLMxRay](https://github.com/ollama/ollama/pull/18444) for local observability — it provides real-time token streaming diagnostics, prompt-cache reuse metrics, and endpoint protocol comparison.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-09-15**

---

### **1. Today's Highlights**  
The LiteLLM project continues to prioritize billing accuracy and operational reliability, with critical fixes for cost accounting across Gemini embeddings and model routing logic. Notably, a fix has been merged to prevent double-charging for audio modalities in `gemini-embedding-2` and to ensure weighted routing remains active when deployment IDs match model names. These changes directly impact spend integrity and inference fairness in multi-provider setups.

---

### **2. Releases & Breaking Changes**  
No new releases were published in the last 24 hours. However, several **critical bugfixes** have been merged into main that may require attention in production deployments:

- ✅ **[Fix: Cost Accounting]** `gemini-embedding-2` now billed correctly per token only, removing double charges for audio (PR [#41157](https://github.com/BerriAI/litellm/pull/41157), [#41151](https://github.com/BerriAI/litellm/pull/41151))  
- ✅ **[Fix: Routing Logic]** Weighted routing preserved even when `deployment.id == model_name` (PR [#41156](https://github.com/BerriAI/litellm/pull/41156))  
- ✅ **[Fix: Usage Aggregation]** Prevents OOM on admin usage dashboards by bounding `api_key` rollups (PR [#41155](https://github.com/BerriAI/litellm/pull/41155))

> 💡 *Recommendation:* If you rely on precise cost reporting or dynamic routing with named deployments, upgrade to the latest main branch or wait for v1.88.0+.

---

### **3. New Model & Hardware Support**  
- ✅ **Gemma 4** added via Mantle endpoint support (Issue [#30657](https://github.com/BerriAI/litellm/issues/30657), PR pending)  
- ✅ **Microsoft Agent 365 MCP tool-call guardrail** now enforced pre-execution (PR [#38241](https://github.com/BerriAI/litellm/pull/38241))  
- ✅ **Bedrock contextual grounding** now applies to plain chat messages (PR [#41132](https://github.com/BerriAI/litellm/pull/41132))  

> 📌 *Note:* Gemma 4 support is still in preview; verify compatibility with your provider configuration.

---

### **4. Performance & Optimization**  
- 🔧 **Rust bridge lifecycle refactoring** (PR [#41153](https://github.com/BerriAI/litellm/pull/41153)) establishes consistent token counting boundaries at public API layers—reducing internal state drift and improving scalability.  
- 🔧 **Stateless replay identity** introduced (PR [#41149](https://github.com/BerriAI/litellm/pull/41149)), enabling strict request matching during testing without relying on semantic headers.  
- 🔧 **Vertex AI price sync** updated for 4 models (PR [#41154](https://github.com/BerriAI/litellm/pull/41154)), aligning with official pricing and reducing billing discrepancies.  

> ⚙️ *Impact:* Improved test reliability, lower memory overhead in high-throughput environments, and more accurate cost modeling.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| `BudgetExceededError` with stale spend despite valid budget (Issue [#27735](https://github.com/BerriAI/litellm/issues/27735)) | High | Open | ❌ No fix yet |
| Health checks fail hard on offline hosts (Issue [#34281](https://github.com/BerriAI/litellm/issues/34281)) | Medium | Open | ❌ No fix yet |
| `/v1/images/edits` with mask fails due to streaming read error (Issue [#26552](https://github.com/BerriAI/litellm/issues/26552)) | Medium | Closed | ✅ Fixed |
| Admin UI triggers full reload + prefetch storm (Issue [#41029](https://github.com/BerriAI/litellm/issues/41029)) | Medium | Closed | ✅ Fixed |
| `INFO` logs cannot be disabled via `LITELLM_LOG=ERROR` (Issue [#10788](https://github.com/BerriAI/litellm/issues/10788)) | Low | Open | ❌ No fix yet |

> ⚠️ **Critical Risk:** Budget overages due to stale spending data could lead to unexpected service interruptions. Monitor virtual key usage closely.

---

### **6. What This Means for Application Developers**  
- **Audit your cost tracking**: Ensure you’re not overcharged on `gemini-embedding-2` — this was previously double-billing audio. Update to latest main or wait for v1.88.0.
- **Avoid routing pitfalls**: If you use `model_name` as a deployment ID, confirm weighted routing isn’t being ignored (fixed in PR [#41156](https://github.com/BerriAI/litellm/pull/41156)).
- **Secure tool calls**: Use the new `agent_365` guardrail (PR [#38241](https://github.com/BerriAI/litellm/pull/38241)) to enforce governance on Microsoft Agent 365 integrations.
- **Tune logging verbosity**: The persistent `INFO` logging issue (#10788) may clutter your observability stack — consider filtering at the log level or upgrading later.
- **Prepare for deprecation alerts**: Team admins will now receive email notifications before model deprecations (PR [#41134](https://github.com/BerriAI/litellm/pull/41134)) — useful for proactive migration planning.

> 🛠️ *Actionable Tip:* Enable `user_email` persistence in spend logs (PR [#41150](https://github.com/BerriAI/litellm/pull/41150)) to improve auditability and debugging in your proxy logs.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-15**

---

### **1. Today's Highlights**  
Unsloth continues to evolve its Studio UI and backend robustness with critical fixes for model stability, sandbox security, and tool call fidelity. Key PRs include a fix for persistent `Error: terminated` on slow CPU hosts (`#10911`), improved handling of nested tool call fields (`#10935`), and enhanced UX for audio transcription and image generation workflows (`#10894`). The project also made strides in Docker usability with better local model visibility in containerized runs (`#10936`) and reduced build cache bloat (`#10959`).

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **AMD ROCm support (Docker)**: The `unsloth/unsloth-rocm` Docker image now mirrors the NVIDIA/Blackwell variant, enabling full ROCm (RDNA2/3/4, CDNA) GPU support via `#6230`.  
- ✅ **Local model discovery in Docker**: `run.sh` now auto-mounts LM Studio, Ollama, and Hermes model directories when running Studio in Docker, making locally hosted GGUF models visible (`#10936`).  
- 🟡 **MLX native support**: Continued refinement of Apple MLX path behavior, including fixing duplicate `<|channel>` splicing in replies (`#10905`).

---

### **4. Performance & Optimization**  
- 🔥 **Build cache cleanup**: Docker publish jobs now drop build caches (`cache-from/to`) to reduce registry storage usage—68.9 GB freed across `unsloth/unsloth` tags (`#10959`).  
- ⚙️ **Reduced redundant regex compilation**: Fixed repeated `re.escape` calls during blocked command checks by pre-compiling the alternation once (`#10927`).  
- 📈 **Improved chat replay fidelity**: `#10910` introduces faithful replay of durable runs, preserving tool card states, streaming output, and thought card timestamps—critical for agent consistency.  
- 💾 **Memory efficiency**: Addressing memory growth post-llama.cpp update (`#10921`) and optimizing auth file access to avoid sandbox leaks (`#10895`).

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status | Link |
|---------|------|-------------|------------|------|
| Critical | `unsloth start pi` fails on slow CPUs | Frequent `Error: terminated` after retries; session crashes mid-run | ✅ PR #10911 (fixes SSE stream timeout during prefills) | [Issue #10912](https://github.com/unslothai/unsloth/issues/10912) |
| High | Tool call truncation & deduplication | MCP calls are systematically truncated; key fields like `start_cursor` lost due to out-of-order schema | ✅ PR #10935 (enforces schema order) | [Issue #10839](https://github.com/unslothai/unsloth/issues/10839) |
| High | Safety bypass on OS-level commands | `os.remove()` executed despite safety checks blocking `rm` | ✅ PR #10907 (adds sandbox-aware prompt before file I/O) | [Issue #10835](https://github.com/unslothai/unsloth/issues/10835) |
| Medium | Gemma 4 crashes on image input | `GGML_ASSERT` failure due to default `ubatch` too small | ✅ PR #10559 (fix pending merge) | [Issue #10559](https://github.com/unslothai/unsloth/issues/10559) |
| Medium | Misleading error on revoked HF models | Confusing logs when loading locally stored but revoked models | Open issue | [Issue #10929](https://github.com/unslothai/unsloth/issues/10929) |

---

### **6. What This Means for Application Developers**  
- **Agent reliability improves**: Faithful replay of tool calls (`#10910`) and consistent state preservation enable more predictable agent behavior across sessions.  
- **Security hardening**: The new sandbox-aware file access check (`#10907`) and strict tool call field ordering (`#10935`) reduce risks of unintended execution or data leakage—critical for production agents.  
- **Better local model integration**: Docker users can now leverage existing LM Studio/Ollama models without manual volume mounts—great for dev-to-production continuity.  
- **Performance tuning needed on low-end hardware**: If deploying on CPU-bound systems (e.g., edge devices), monitor for `terminated` errors and consider increasing swap or reducing `ubatch` size.  
- **Avoid deprecated patterns**: Use `name` field in messages (now supported via `#10937`) to ensure compatibility with LangChain, AutoGen, and other frameworks.

> 🔗 *Explore PRs and issues:* [unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*