# AI Infrastructure Digest 2026-09-18

> Generated: 2026-09-18 00:44 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-18**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *hardware specialization, cross-architecture unification, and speculative decoding maturity*. Projects are rapidly diverging in their strategic focus: vLLM and SGLang lead in high-throughput, low-latency inference on next-gen GPUs (Blackwell, MI350X), while llama.cpp and Unsloth emphasize edge compatibility and multi-backend portability. Ollama and LiteLLM continue to dominate the developer gateway space, prioritizing ease of use and observability. A clear trend toward *multi-model, multi-hardware orchestration* is emerging, with projects actively integrating support for T-Head PPUs, AMD RDNA/RoCm, ARM64 CUDA, and novel quantization formats like FP8/INT8 diffusion and quark-based MXFP.

---

### **2. Activity Comparison**

| Project       | Open Issues (High/Med) | PRs (Last 24h) | Releases (Last 24h) | Status |
|---------------|------------------------|----------------|----------------------|--------|
| **vLLM**      | 12 (4 High, 5 Medium)  | 12             | None                 | Stable, patching critical regressions |
| **SGLang**    | 10 (2 High, 4 Medium)  | 8              | None                 | Active development, stability concerns |
| **llama.cpp** | 15 (3 High, 7 Medium)  | 10             | `b11028`–`b11017`     | Frequent small releases, Vulkan/SYCL focus |
| **Ollama**    | 11 (2 High, 5 Medium)  | 6              | None                 | Breaking change in CLI agent removal |
| **LiteLLM**   | 10 (2 High, 3 Medium)  | 4              | None                 | Stability fixes in proxy layer |
| **Unsloth**   | 13 (3 High, 5 Medium)  | 12             | **v0.1.810-beta**    | Major beta release, Docker & ROCm push |

> ✅ *Insight*: **Unsloth** leads in release velocity with a major new beta; **vLLM** and **llama.cpp** show highest PR activity, reflecting intense engineering effort on performance and stability.

---

### **3. Model Support Race**

| New Model / Architecture        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3-VL / LLaVA-OneVision** | ✅ Full CUDA graph | 🟡 Tracking RFC | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.8-Flash-Next (MTP)**   | ✅ MTP + KV cache opt | ❌ | ✅ MTP + reuse | ❌ | ❌ | ✅ MTP (crash risk) |
| **GLM-5.3-Flash (Sparse MLA)** | ✅ Fixes in progress | ✅ Quark fix (ROCm) | ❌ | ❌ | ❌ | ⚠️ MTP crash |
| **DeepSeek-V4.1-Flash**        | ✅ Speculative decoding | ❌ | ❌ | ⚠️ MoE crash | ❌ | ❌ |
| **T-Head PPU (ZW810/ZW-M890P)**| ❌ | ✅ Roadmap | ❌ | ❌ | ❌ | ❌ |
| **AMD RDNA1+2 (ROCm)**         | ⚠️ GLM/DSV4 crashes | ✅ Stable | ✅ | ⚠️ B70 crash | ❌ | ✅ Full support |
| **ARM64 CUDA (Windows)**       | ❌ | ❌ | ✅ Hexagon NPU | ✅ Vulkan | ❌ | ✅ Experimental |

> 🏆 **Leader**: **Unsloth** — fastest adoption of new hardware (ROCm, ARM64 CUDA).  
> 🏁 **Runner-up**: **llama.cpp** — broadest model support across backends and quantization types.  
> 🔥 **Emerging Focus**: **SGLang** and **vLLM** are leading in *multimodal vision transformer* integration via CUDA graphs and hybrid decoding.

---

### **4. Performance Frontier**

| Optimization Area          | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache Efficiency**     | ✅ FP8_E4M3, sparse prep | ✅ Unified radix cache | ✅ MTP reuse | ⚠️ Memory bloat | ✅ Streaming accuracy | ⚠️ Context misreporting |
| **Batching & Parallelism**  | ✅ Pipeline-parallel draft | ✅ Hybrid GDN/Mamba | ⚠️ MoE instability | ❌ No TP | ✅ JWT routing | ✅ GRPO speedup |
| **Quantization Innovation** | ✅ fp8_e4m3 KV | ✅ MXFP4/8, quark exclusion | ✅ DP4A, Kronecker FWHT | ✅ Bonsai 1/2-bit | ❌ Limited | ✅ FP8/INT8 diffusion |
| **Kernel-Level Optimizations** | ✅ SM120, MLAs | ✅ HiCache write-back | ✅ MFMA, FlashKDA | ⚠️ DSpark stall | ❌ | ✅ CPU launch reduction |
| **Distributed Serving**     | ✅ Async TP, SP | ✅ Multi-node HiCache | ❌ | ❌ | ✅ Team-level routing | ❌ |

> 📈 **Top Performers**:  
> - **vLLM**: Leading in scalable, production-grade batching and Blackwell-specific kernels.  
> - **Unsloth**: Fastest training improvements (LoRA SFT ↓17% step time).  
> - **llama.cpp**: Most diverse kernel optimizations across Vulkan, SYCL, OpenCL, and Intel Xe.

---

### **5. Layer Positioning**

| Project       | Primary Layer               | Key Differentiator                                  |
|---------------|-----------------------------|----------------------------------------------------|
| **vLLM**      | **Inference Engine**        | High-throughput, low-latency GPU serving; CUDA graph-first design |
| **SGLang**    | **Inference Engine + Gateway** | Hybrid speculative decoding, unified radix cache, multi-node optimization |
| **llama.cpp** | **Local Runtime / Edge**    | Cross-platform, lightweight, ideal for embedded devices and offline inference |
| **Ollama**    | **Developer Gateway / CLI** | Simplified local deployment; strong UX but limited control |
| **LiteLLM**   | **API Gateway / Proxy**     | Cost tracking, team policies, MCP/tooling, observability-first |
| **Unsloth**   | **Training & Fine-tuning**  | Accelerated LoRA training, Studio UI, Dockerized workflows |

> 💡 *Strategic Insight*: The stack is becoming increasingly modular — **engine (vLLM/SGLang)** → **gateway (LiteLLM/Ollama)** → **training (Unsloth)** → **runtime (llama.cpp)**.

---

### **6. Trend Signals**

#### **Industry Trends Extracted from Activity**:
1. **Hardware Fragmentation is Driving Portability**: AMD ROCm, T-Head PPU, ARM64 CUDA, and Intel Arc B70 are all receiving targeted fixes — signaling that no single platform dominates.
2. **Speculative Decoding is Maturing**: Both vLLM (pipeline-parallel draft) and SGLang (hybrid GDN/Mamba) are investing heavily in correctness and scalability — now a core feature, not experimental.
3. **Observability & Billing Accuracy Are Critical**: Multiple projects (LiteLLM, Ollama, SGLang) report cost/logging bugs — indicating rising demand for auditability in enterprise AI systems.
4. **Quantization is Going Beyond Bits**: FP8/INT8 diffusion, MXFP4/8, and quark exclusions reflect a shift from simple bit-width compression to *semantic-aware* quantization.
5. **Stability Over Features**: Despite rapid innovation, *high-severity stability issues* (core dumps, memory leaks, incorrect outputs) dominate issue trackers — reminding teams that production readiness is paramount.

#### **What Application Developers Should Watch**:
- ✅ **Avoid nightly builds** of vLLM or SGLang if deploying on Blackwell or ROCm — stick to stable releases until #56370, #26340, and #57424 are resolved.
- ✅ **Enable `--nodraft`** in Ollama for reproducible debugging — speculative decoding remains fragile under load.
- ✅ **Use LiteLLM v1.88.1+** to avoid missing `cursor/chat/completions` logs — essential for agent traceability.
- ✅ **Monitor Unsloth’s MTP/Qwen3.8-Flash-Next** — early adopters face crashes despite strong performance gains.
- 🔄 **Prepare for cross-architecture deployments**: With T-Head PPU, AMD RDNA, and ARM64 CUDA gaining traction, future apps must be hardware-agnostic by design.

> 🎯 **Final Takeaway**: The AI infrastructure landscape is no longer about *which engine is fastest*, but *which ecosystem delivers reliability, observability, and cross-platform consistency at scale*. Prioritize stability and observability over bleeding-edge features — especially when building agents and production gateways.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **1. Today's Highlights**  
vLLM continues to advance its support for next-gen hardware and multimodal models, with critical progress on CUDA graph integration for ViT encoders (e.g., LLaVA-OneVision, Qwen3-VL) and performance optimizations for SM120 Blackwell GPUs. Key PRs address speculative decoding stability on DeepSeek-V4.1-Flash and fix memory corruption in GLM-5.3-Flash’s sparse attention path—both crucial for production inference at scale.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The project remains stable with ongoing refinements to experimental features.

---

### **3. New Model & Hardware Support**  
- **Multimodal Vision Transformers (ViT):**  
  - ✅ **CUDA Graph support added** for `LlavaOnevisionForConditionalGeneration` via [PR #57379](https://github.com/vllm-project/vllm/pull/57379). This enables full prefill graph capture for image/video inputs.
  - 📌 **RFC #38175**: Proposal to extend full CUDA graph support to ViTs in multimodal models like Qwen3-VL, GLM-V, and Kimi K2.5 — critical for low-latency inference.

- **Hardware & Backends:**  
  - ✅ **SM120 (Blackwell) GPU**: Multiple PRs target optimization and bug fixes for `sm_120`, including FP32 router enablement ([PR #56152](https://github.com/vllm-project/vllm/pull/56152)) and sparse MLA improvements ([PR #57458](https://github.com/vllm-project/vllm/pull/57458)).
  - ✅ **ROCm (gfx950)**: Ongoing work to stabilize GLM-5.3-Flash and DeepSeek-V4.1-Flash on AMD MI350X/MI355X; several kernel-level bugs reported but not yet fixed ([Issue #57227](https://github.com/vllm-project/vllm/issues/57227), [#57424](https://github.com/vllm-project/vllm/issues/57424)).

- **Quantization:**  
  - ✅ **fp8_e4m3 KV cache** now supported on QSA path of `Qwen3.8-Flash-Next` ([Issue #54426](https://github.com/vllm-project/vllm/issues/54426)), doubling effective KV pool capacity.

---

### **4. Performance & Optimization**  
- **Throughput & Memory Efficiency:**  
  - ✅ **GLM-5.3-Flash**: Reduced sparse MLA preparation overhead by reusing empty rotary tails ([PR #57458](https://github.com/vllm-project/vllm/pull/57458)), improving prefill latency.
  - ✅ **MiniMax-M3**: Split decode index-score loop and fused top-k merge reduced kernel launches from 3 → 2 ([PR #56149](https://github.com/vllm-project/vllm/pull/56149)), lowering per-token cost.

- **Speculative Decoding:**  
  - ✅ **EAGLE/DSpark**: Pipeline-parallel auxiliary state support completed ([PR #57197](https://github.com/vllm-project/vllm/pull/57197)), enabling scalable draft token generation across stages.
  - ⚠️ **Hybrid GDN + MTP**: Scheduler throughput collapse observed at batch ≥4 ([Issue #55533](https://github.com/vllm-project/vllm/issues/55533)); under investigation.

- **Benchmark Note (DeepSeek-V4.1-Flash on ROCm):**  
  Measured **35.89 tokens/sec** (8x MI355X, TP=4), indicating room for further optimization on AMD hardware.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR? | Link |
|---------|------|--------|--------|------|
| 🔴 High | **Batch invariance broken** with sequence parallelism + async TP (`VLLM_BATCH_INVARIANT=1`) | Open | ❌ No fix yet | [Issue #56370](https://github.com/vllm-project/vllm/issues/56370) |
| 🔴 High | **GLM-5.3-Flash crashes on ROCm** due to missing `forward_cuda` in `SparseAttnIndexerKpool` | Open | ❌ Not resolved | [Issue #57424](https://github.com/vllm-project/vllm/issues/57424) |
| 🔴 High | **DeepSeek-V4.1-Flash illegal memory access** during long prompt prefill on SM120 | Open | ❌ No fix | [Issue #56771](https://github.com/vllm-project/vllm/issues/56771) |
| 🟡 Medium | **GLM-5.3-Flash fails to start on SM120** due to missing rope-free sparse MLA path | Open | ❌ No fix | [Issue #53963](https://github.com/vllm-project/vllm/issues/53963) |
| 🟡 Medium | **Host memory exhaustion** in v0.28.0/v0.29.0 (vs. working 0.27.1) | Open | ❌ No fix | [Issue #54237](https://github.com/vllm-project/vllm/issues/54237) |

> *Note: Several issues affect production-grade deployment on Blackwell (RTX PRO 6000) and AMD MI350X/MI355X systems.*

---

### **6. What This Means for Application Developers**  
- **Use vLLM nightly builds cautiously**: Recent regressions (e.g., host memory freeze, batch invariance breakage) may impact stability in high-throughput deployments. Stick to stable releases unless you’re actively testing fixes.
- **Enable CUDA graphs early**: For multimodal apps using LLaVA-OneVision or Qwen3-VL, use [PR #57379](https://github.com/vllm-project/vllm/pull/57379) to reduce prefill latency by up to ~30%.
- **Avoid SM120/ROCm for now if possible**: Critical bugs in GLM-5.3-Flash and DeepSeek-V4.1-Flash on both platforms remain open. Monitor [Issue #57424](https://github.com/vllm-project/vllm/issues/57424) and [Issue #56771](https://github.com/vllm-project/vllm/issues/56771) for updates.
- **Optimize speculative decoding**: If using EAGLE/DSpark with pipeline parallelism, ensure you're using the latest vLLM version with [PR #57197](https://github.com/vllm-project/vllm/pull/57197) merged for correct behavior.

> ✅ **Actionable Tip**: For real-time agents relying on long-context reasoning, test with `--enforce-eager` or disable CUDA graphs temporarily to avoid silent correctness issues.

---  
*Digest generated: 2026-09-18 | Source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-18

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to strengthen its support for next-generation hardware and speculative inference, with critical work on Blackwell GPU compatibility, T-Head PPU integration, and unified radix cache improvements. High-severity stability issues—particularly around CUDA coredumps (`#26340`) and KV cache consistency in hybrid models (`#39830`)—have drawn significant community attention, signaling ongoing refinement of low-level execution paths.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking API/config changes were released.

---

### **3. New Model & Hardware Support**  
- **T-Head PPU (ZW810/ZW810E/ZW-M890P)**: A formal roadmap has been initiated (`#37519`) to upstream first-class support for T-Head’s PPU accelerators, targeting high-performance inference in China-centric deployments.  
- **SenseNova-U1/U1.5**: Tracking issue `#37742` outlines integration plans based on official OpenSenseNova/SenseNova-U1 reference implementation.  
- **AMD GLM-5.3-Flash**: PR `#39317` ensures proper handling of quark quantization exclusions (e.g., BF16 layers) during MXFP4 quantization, enabling stable serving on ROCm platforms.  
- **DeepEP v2**: PR `#40030` adds support for MXFP8 and deferred route weighting, expanding quantization flexibility for large MoE models.

> 🔗 [T-Head PPU Roadmap](https://github.com/sgl-project/sglang/issues/37519) | 🔗 [SenseNova-U1 Support](https://github.com/sgl-project/sglang/issues/37742) | 🔗 [AMD GLM-5.3-Flash Quark Fix](https://github.com/sgl-project/sglang/pull/39317)

---

### **4. Performance & Optimization**  
- **Optimistic Prefill with HiCache**: PR `#40043` enables buffer-only L3 write-through HiCache for optimistic prefill, reducing memory pressure while maintaining prefix cache fidelity across multi-node setups.  
- **Unified Radix Cache Improvements**: Multiple PRs (`#39395`, `#38426`) enhance HiCache capacity and reduce host memory overhead by compacting DSA index storage and optimizing write-back behavior.  
- **CUDA Graph Reuse**: PR `#40047` resolves a crash in breakable decode CUDA graph capture due to missing DSA indexer metadata, improving reuse efficiency for long-running inference sessions.  
- **Blackwell CC Optimization**: PR `#36810` fixes overlap scheduling latency under NVIDIA Confidential Computing by avoiding synchronous `cudaMemcpyAsync`, restoring decode parallelism on secure enclaves.

> 🔗 [HiCache Write-Back & Capacity](https://github.com/sgl-project/sglang/pull/39395) | 🔗 [Optimistic Prefill with HiCache](https://github.com/sgl-project/sglang/pull/40043)

---

### **5. Stability & Regressions**  
Critical stability concerns dominate today’s activity:

1. **CUDA Coredump Tracker (`#26340`)** – *High Severity*  
   Auto-collected coredumps from CI indicate recurring GPU crashes during PR testing. 313 comments highlight widespread instability; no fix yet. This is a systemic risk to build reliability and deployment stability.  
   > 🔗 [Issue #26340](https://github.com/sgl-project/sglang/issues/26340)

2. **Hierarchical Cache Wrong Output (`#39830`)** – *High Severity*  
   Hybrid GDN/Mamba models return incorrect responses due to host-tier cache hits being misattributed across generation passes. Reproducible on `main`.  
   > 🔗 [Issue #39830](https://github.com/sgl-project/sglang/issues/39830)

3. **FlashKDA Pre-fill Crash (`#39925`)** – *Medium Severity*  
   Returns tuple `(output, None)` when `return_intermediate_states=False`, causing crash in GLM-5.3-Flash when radix cache is disabled.  
   > 🔗 [Issue #39925](https://github.com/sgl-project/sglang/issues/39925)

4. **KV Cache Event Schema Inconsistency (`#39991`)** – *Medium Severity*  
   Proposes aligning SGLang’s KV cache event schema with vLLM to enable shared observability tools. Currently a deviation point for monitoring stacks.  
   > 🔗 [RFC: Align KV Cache Schema](https://github.com/sgl-project/sglang/issues/39991)

---

### **6. What This Means for Application Developers**  
- **Avoid `--cuda-graph-backend-decode breakable`** until PR `#40047` lands if you’re using DSA-based models like GLM-5.x.  
- **Expect higher stability in speculative decoding workflows** as hybrid recurrent-state fixes (`#40001`, `#32196`) roll out—especially for Mamba/GDN-style models.  
- **Monitor billing accuracy**—issues `#39900` and `#39922` reveal that `cache_creation_input_tokens` are not reported, leading to inaccurate cost tracking for cached requests. Use custom metrics or patch locally.  
- **Plan for future hardware diversity**: The T-Head PPU (`#37519`) and SenseNova-U1 (`#37742`) integrations signal SGLang’s intent to become a cross-architecture inference platform—ideal for developers targeting Asia-Pacific AI infrastructure.  

> ✅ **Actionable Tip**: If deploying on Blackwell with confidential computing, ensure your environment uses `--enable-overlap-scheduling` only after verifying against `#36810`’s fix.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-18**

---

### **1. Today's Highlights**  
The latest release cycle (b11028–b11017) focuses on critical Vulkan and SYCL stability fixes, including a fix for Intel B70 memory allocation errors and improved MoE handling in MTP models. New OpenVINO 2026.4 integration and enhanced support for Qwen3.8-Flash-Next MTP layers signal growing momentum in multi-tenant model execution and cross-backend optimization.

---

### **2. Releases & Breaking Changes**  
- **Latest Releases**: `b11028` to `b11017` (24h window), with no breaking API changes noted.  
- **Key Fixes**:  
  - `b11028`: Fixed missing file eviction in CI (`#29041`) — improves cleanup during long-running inference jobs.  
  - `b11027`: Skipped ACCEL devices in RPC (`#29020`) — prevents unintended device enumeration.  
  - `b11026`: Respected `TENSOR_SKIP` when skipping gate_up_exps (`#29014`) — essential for Qwen3.5-MoE with fused MTP tensors.  
  - `b11025`: Extended Nemotron MTP support (`#29018`) — removes redundant declarations, improving compatibility.  
  - `b11019`: GGUF data section alignment now relative to GGUF start, not file offset (`#28993`) — prevents misaligned tensor reads in embedded files.  
  - `b11018`: Fixed B70 SYCL mem alloc error (>19.3GB) (`#28953`) — critical for high-memory GPU offloading.  

> 🔗 [GitHub Releases](https://github.com/ggml-org/llama.cpp/releases)

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Full MTP support extended to **Qwen3.8-Flash-Next** (`#28243`) — enables 1.3–2x faster loading via shared token embeddings.  
  - Added **Ling 3.0 (Bailing V3)** chat parser (`#28682`) — handles pre-opened `<think>` tags correctly.  
  - Enhanced **DeepSeek-V3.2/V4** message delimiters (`#29008`) — better prompt formatting for structured output.  
- **Hardware Backends**:  
  - **Hexagon NPU** build added for Windows Arm64 (`#29052`) — expands deployment options for edge mobile devices.  
  - **Intel Xe flash attention kernels** introduced for Xe-LPG Plus/Xe2/Xe3 (`#24406`) — targeted performance uplift on upcoming Intel GPUs.  
  - **OpenVINO 2026.4** updated (`#29009`) — includes new optimizations and warning fixes for clangd/MSVC.  

> 🔗 [PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243), [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406), [PR #29052](https://github.com/ggml-org/llama.cpp/pull/29052)

---

### **4. Performance & Optimization**  
- **Kernel Optimizations**:  
  - Added optimized **DP4A bin kernels** for Q6_K, Q4_K, and Q4_0 GEMM on OpenCL (`#29057`, `#29056`, `#29055`) — expected to improve non-MoE quantized inference speed.  
  - **Flash attention binary kernel** support added for OpenCL (`#29046`) — reduces latency in long-context attention.  
  - **MFMA lightning indexer path** for CDNA2 (gfx90a) via ROCm (`#29050`, `#29047`) — unlocks full matrix-core utilization on AMD Instinct GPUs.  
  - **Kronecker FWHT support** for CUDA (`#29051`) — accelerates non-power-of-two Hadamard transforms (384, 640, 768, 1280).  
- **Memory Efficiency**:  
  - Qwen3.8-Flash-Next MTP now reuses `embed_tokens` — cuts VRAM/RAM usage by ~15% for large models (`#28243`).  

> 🔗 [PR #29057](https://github.com/ggml-org/llama.cpp/pull/29057), [PR #29050](https://github.com/ggml-org/llama.cpp/pull/29050)

---

### **5. Stability & Regressions**  
- **Critical Issues Reported**:  
  - **Vulkan crash on Intel B70** with MoE models (`#23769`) — reported in `b11017` context; fix PRs pending.  
  - **SYCL: extreme scratchpad allocation (>2GB)** when `ngram-mod` is enabled (`#28860`) — severe memory pressure.  
  - **Vulkan im2col shaders write through buffer_reference without alignment** (`#28960`) — potential undefined behavior on some drivers.  
  - **DeepSeek-v4-flash-vision exp** fails to increase tok/s speed despite DSpark (`#28939`) — possible optimization regression.  
  - **Host-side memory grows unbounded** during chat on 128GB unified-memory systems (`#28933`) — likely due to cache leak or refcounting issue.  
- **Fixes in Progress**:  
  - `#28956`: Fix for wrong attention cache slice reads in Vulkan (`#28956`) — addresses incorrect results in multi-head attention.  

> 🔗 [Issue #23769](https://github.com/ggml-org/llama.cpp/issues/23769), [Issue #28860](https://github.com/ggml-org/llama.cpp/issues/28860), [Issue #28933](https://github.com/ggml-org/llama.cpp/issues/28933)

---

### **6. What This Means for Application Developers**  
- **For LLM Gateways & Agents**: Use `--split-mode tensor` cautiously on SYCL — expect 3x slowdown and potential hangs with KV cache quantization (`#26409`).  
- **For Edge Deployments**: The new Hexagon NPU build enables ARM64 Windows edge inference — ideal for on-device AI agents.  
- **For High-Throughput Systems**: Enable MTP support for Qwen3.8-Flash-Next (`#28243`) to reduce load time and RAM footprint.  
- **For Safety & Debugging**: Avoid `ngram-mod` with SYCL until `#28860` is resolved — it may exhaust system memory.  
- **For Custom Tool Calling**: Use the new Ling 3.0 parser (`#28682`) and consider JSON tool call format if XML triggers fail (`#26530`).  

> 📌 **Actionable Tip**: If using Intel Arc B70 with MoE models, ensure you're on `b11018+` to avoid `mem allocate` crashes. Monitor `#23769` for patch updates.

---  
*Digest generated from GitHub activity (2026-09-18).*  
🔗 [llama.cpp GitHub](https://github.com/ggml-org/llama.cpp) | 📊 [Changelog Summary](https://github.com/ggml-org/llama.cpp/issues/9289)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-18**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its support for emerging models and hardware backends, with critical work underway on MLX integration for low-bit quantized weights (Bonsai’s 1-bit/2-bit) and Vulkan on ARM64. High-priority stability fixes include a speculative decoding stall bug on MLX nvfp4 and a Windows tray startup failure. Meanwhile, developers are pushing for more control over inference behavior via new flags like `--nodraft` and expanded role support beyond `system`, `user`, and `assistant`.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
- **Breaking Change**: The built-in CLI agent was removed in PR #18393 due to privacy concerns around default cloud model usage. Users now need to opt-in via `--agent` flag or external launcher (Issue #18490).  
- **API Update**: `/v1/responses` now rejects `agent_message` type inputs (Issue #18286), requiring clients to adapt to strict OpenAI-compliant message types.

---

### **3. New Model & Hardware Support**  
- ✅ **New Architecture Support**: Native support requested for `spark2_5` (Spark-X2.5-4B / 1.7B) — currently blocked by runtime recognition (Issue #18195).  
- 🚀 **MLX Backend Expansion**:  
  - Experimental support for Bonsai’s 1-bit/2-bit quantized weights via MLX backend (Issue #18515).  
  - Progress tracking and stall detection implemented in `mlxrunner` (PR #17834).  
- 💻 **Vulkan on ARM64**: Linux ARM64 Docker image now includes Vulkan backend support (PR #18502), enabling GPU acceleration on Apple Silicon M1 devices running Asahi Linux.  
- 🖥️ **Windows Vulkan Fix**: Addressing crashes on AMD RX 6750 XT during multi-model load (Issue #18494).

---

### **4. Performance & Optimization**  
- ⚡ **Speculative Decoding Control**: Proposal for `--nodraft` flag (Issue #18517) to disable speculative decoding entirely—critical for debugging and reproducibility.  
- 📈 **Memory & Load Optimization**:  
  - `mlxrunner` now reports load progress and detects stalls (PR #17834), preventing premature timeouts during slow model loads.  
  - KV buffer release during speculative decode optimized to avoid memory bloat (PR #18510).  
- 🔧 **Warm-up Optimization**: MLX compile paths are now warmed up post-load (PR #16085), reducing cold-start TTFT without affecting subsequent request performance.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Notes |
|--------|------|--------|-------|
| 🔴 High | MLX nvfp4: Admitted request stalls at prefill (`processed=total-1`) under sustained load; only SIGTERM recovers (Issue #18505) | Open | Critical for production inference under load. No fix PR yet. |
| 🔴 High | Windows 11 tray app shows icon but fails to start server; manual `ollama serve` works (Issue #18507) | Open | Affects desktop users; likely related to process spawning or service initialization. |
| 🟡 Medium | `glm-ocr` enters infinite loop during text recognition (Issue #16892) | Open | Reproducible with image input; output repeats verbatim. |
| 🟡 Medium | `minicpm5-2b` native tool calls fail to parse (Issue #18483) | Open | Tool call output contains malformed XML fragments like `name="get_weather"> name="city..."`. |
| 🟡 Medium | `glm-5.3-flash` emits malformed string-encoded tool calls via Ollama Cloud (Issue #18506) | Open | Intermittent corruption of JSON structure in `calls` field. |

> *Note: Several regression fixes are in flight via PRs (#18510, #18516, #18438), but core issues remain open.*

---

### **6. What This Means for Application Developers**  
- **Tool Calling Flexibility**: Expect increased support for custom roles like `"tool"` (Issue #6322, #18509), though current restrictions require workarounds using `system` or `user` roles.  
- **Debugging & Reproducibility**: Use `--nodraft` (proposed in #18517) to isolate speculative decoding effects and obtain deterministic outputs.  
- **Enterprise Deployment**: Consider disabling automatic agent launch (due to removal in #18393); use opt-in flags or external agents for secure environments.  
- **Cross-Platform Reliability**: Be cautious when deploying on Windows (tray issues) or ARM64 (Vulkan setup) — test with latest builds.  
- **Monitoring**: Enable Prometheus metrics via `OLLAMA_METRICS` env var (PR #18508) for observability in Kubernetes/Docker setups.  

👉 *Recommended Actions*:  
- Monitor [Issue #18515](https://github.com/ollama/ollama/issues/18515) for low-bit quantization support.  
- Review [PR #18519](https://github.com/ollama/ollama/pull/18519) for early access to preview channels.  
- Audit model dependencies for license compliance (see [Issue #3185](https://github.com/ollama/ollama/issues/3185)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest – 2026-09-18

---

### **1. Today's Highlights**  
LiteLLM continues to strengthen its proxy and observability stack with critical fixes for authentication, cost tracking, and model routing. Key PRs today address long-standing issues in JWT-based access control, streaming usage logging, and model visibility under team restrictions. The addition of Amazon Transcribe pass-through support and enhanced MCP tooling enables more robust AI agent workflows.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking configuration changes were released.

---

### **3. New Model & Hardware Support**  
- ✅ **Amazon Transcribe Batch Jobs**: Added native pass-through support via `POST /transcribe/{Operation}` with completion-time pricing (PR [#41515](https://github.com/BerriAI/litellm/pull/41515)).  
- ✅ **Fal.ai Video Models**: Feature request (#26886) seeks support for Sora 2 and Veo 3.1 — pending implementation.  
- ✅ **Qwen-Image & Wan Text-to-Image**: Native DashScope support requested for Alibaba Cloud models (PR #28763).  
- ✅ **Bourse Provider**: OpenAI-compatible reseller added as a feature request (PR #41042), already functional via OpenAI format compatibility.

---

### **4. Performance & Optimization**  
- 📈 **Streaming Cost Accuracy**: Fixes landed to ensure `usage` data is correctly emitted even when final chunk has non-empty `choices` (PR #36168). Prevents incorrect billing due to lost `cached_tokens`.  
- 🔍 **Observability Improvements**:  
  - Intercepted web searches now inherit parent session traces (PR #41711).  
  - Pass-through endpoints now log upstream URL tags for better Langfuse/spend log correlation (PR #30033).  
- ⚙️ **Request Routing Efficiency**:  
  - JWT-authenticated users now respect Team/User-level MCP Tool Search settings (PR #41710).  
  - Preemptive OAuth 401 challenges now gate on allowed servers (PR #41709).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|-------|
| 🔴 High | `/cursor/chat/completions` not logged in SpendLogs (v1.88.1+) | Open | [Issue #30126](https://github.com/BerriAI/litellm/issues/30126) |
| 🔴 High | Streaming pass-through requests fail to log usage/cost on mid-flight errors (timeout/connection reset) | Open | [Issue #30667](https://github.com/BerriAI/litellm/issues/30667) |
| 🟡 Medium | Prisma reconnection failure causing proxy instability | Open | [Issue #26886](https://github.com/BerriAI/litellm/issues/26886) |
| 🟡 Medium | `GET /v1/models` ignores `allowed_models` restrictions at team level | Open | [Issue #41595](https://github.com/BerriAI/litellm/issues/41595) |
| 🟡 Medium | Azure deployment pricing recorded as `$0.0000` intermittently | Open | [Issue #41605](https://github.com/BerriAI/litellm/issues/41605) |

> ✅ *Note: Several stability fixes are actively being addressed in PRs (e.g., PR #41706, #41707, #41708), indicating strong momentum in core reliability improvements.*

---

### **6. What This Means for Application Developers**  
- **Use Cases**: If you're building AI agents using Cursor, MCP, or Langfuse integrations, today’s updates improve security (JWT/MCP gating), observability (session tracing, per-model budgets), and cost accuracy.  
- **Migration/Adoption**: Ensure your proxy is updated past v1.88.1 to avoid missing `cursor/chat/completions` logs. Consider enabling per-model budgets via the new UI form (PR #41708).  
- **Cost Control**: Be cautious with tiered pricing configurations — current `*_above_200k_tokens` fields are ignored (Issue #30135); use custom cost functions until fixed.  
- **Future-Proofing**: Monitor PRs around Langfuse v4 migration (PR #36741) and Bourse provider integration (PR #41042) for expanded multi-provider resilience.

👉 **Recommended Actions**:  
- Update proxy to latest stable build if using `cursor`, `mcp`, or `langfuse`.  
- Audit `model_info` pricing configs for tiered rates.  
- Test streaming behavior with guardrails and failed upstream streams (Issue #41611).  

---  
*Data source: [GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-18**

---

### **1. Today's Highlights**  
Unsloth releases **v0.1.810-beta**, introducing full Docker support with multi-user accounts, AMD RDNA1+2 GPU acceleration, FP8/INT8 diffusion inference, and ARM64 CUDA on Windows. This update significantly expands deployment flexibility across heterogeneous environments. Concurrently, multiple PRs focus on improving Studio’s stability, security sandboxing, and remote access resilience.

> 🔗 [Release v0.1.810-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.810-beta) | [Docker Guide](https://unsloth.ai/docs/get-started/insta)

---

### **2. Releases & Breaking Changes**  
- **v0.1.810-beta**: Major update adding:
  - Multi-user Docker image support
  - AMD RDNA1+2 GPU (ROCm) compatibility
  - ARM64 CUDA support on Windows
  - FP8/INT8 diffusion model inference
  - Enhanced training and GRPO pipeline improvements
- **Note**: The new Docker image is now available via `docker pull unsloth/unsloth:latest`, but older versions remain in use on some platforms (e.g., Studio UI). See [#7999](https://github.com/unslothai/unsloth/issues/7999), [#6180](https://github.com/unslothai/unsloth/issues/6180), and [#9583](https://github.com/unslothai/unsloth/issues/9583) for Docker Hub sync issues.

---

### **3. New Model & Hardware Support**  
- **AMD GPUs**: Full support for RDNA1+2 architectures via ROCm; included in `unsloth/unsloth-rocm` image (PR #11218).
- **Hardware Backends**: Added ARM64 CUDA support on Windows (critical for edge devices and cloud workloads).
- **Quantization Formats**: Experimental FP8 and INT8 diffusion support now enabled in inference pipelines.
- **Model Architectures**:
  - Qwen3.8-Flash-Next (MTP) now supported, though MTP-related crashes reported (Issue #11143, #11219).
  - GPT-OSS-120B-K4-KM now officially supported in Studio (though output format mismatch noted in Issue #10252).

---

### **4. Performance & Optimization**  
- **LoRA SFT Speedup**: On B200, `unsloth-cli.py` reduced step time from **0.83s → 0.66s** (120-step SFT of Qwen3.5-9B), driven by CPU-side kernel launch overhead reduction (PR #10744).
- **Further Optimizations**: A follow-up patch (#11238) cuts another **~0.07s per step** by optimizing model-independent CPU logic — total improvement: **~0.17s per step**.
- **Studio Startup**: macOS update delay reduced by avoiding redundant binary re-probing (PR #11237); previously took 42–59s vs. <1.5s on Linux.
- **Cache Recovery**: Repair logic now attempts to fix quarantined `llama.cpp` binaries at launch instead of failing silently (PR #10494).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Impact |
|--------|------|-------|--------|
| ⚠️ High | `Qwen3Attention.apply_qkv` missing attribute (Issue #2587) | Closed | Breaks GRPO fine-tuning on Qwen3 models |
| ⚠️ High | `LLVM ERROR: Unsupported rounding mode for f16→f16 conversion` (Issue #2491) | Closed | Hinders compilation on Ubuntu 24.04 |
| ⚠️ Medium | MTP draft crash (`GGML_ASSERT(ggml_can_repeat)`), RTX 5080 (Issue #11219) | Open | Blocks Qwen3.8-Flash-Next loading |
| ⚠️ Medium | KV cache quantization not reflected in context length under TP (Issue #9697) | Closed | Misleading memory usage reporting |
| ⚠️ Low | Studio fails to start on `0.0.0.0` (Issue #11187) | Open | Limits remote access setup |

> ✅ Fixes merged for high-severity regressions (e.g., #2587, #2491). MTP crash remains open and affects newer hardware.

---

### **6. What This Means for Application Developers**  
- **Multi-host deployments** are now feasible with the new Docker + multi-user support (PR #11218), enabling scalable agent orchestration across clusters.
- **Cross-platform development** is easier: Windows ARM64 CUDA and AMD ROCm support allow consistent workflows on diverse hardware.
- **Performance-critical apps** should adopt `unsloth-cli.py` with the latest patches — expect up to **20% faster LoRA training** on B200 and H100.
- **Security-aware developers** should note ongoing hardening efforts: OS sandboxes (PR #11209), network policy enforcement (PR #11172), and anti-virus recovery (PR #10494) improve runtime safety.
- **Avoid outdated Docker images** — ensure you’re using `unsloth/unsloth:latest` or build locally to prevent version mismatches (see #7999, #9583).

> 🛠️ **Recommendation**: Update to `v0.1.810-beta` immediately for best performance and compatibility, especially when deploying on AMD or mixed-hardware setups. Monitor open MTP/GGUF issues if working with Qwen3.8-Flash-Next or GPT-OSS-120B.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*