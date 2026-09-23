# AI Infrastructure Digest 2026-09-23

> Generated: 2026-09-23 00:52 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-23**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *hardware specialization, distributed scalability, and multimodal convergence*. Projects are increasingly diverging in focus: vLLM and SGLang lead in high-throughput, low-latency inference with deep hardware integration; llama.cpp and Ollama dominate lightweight, portable, and Apple Silicon–optimized local deployment; LiteLLM consolidates as the universal gateway for cost-aware, multi-provider orchestration; while Unsloth pushes boundaries in multimodal agent performance and training efficiency. Critical stability issues persist—especially around speculative decoding, KV cache corruption, and quantization fidelity—but optimization momentum is strong across all layers.

---

### **2. Activity Comparison**

| Project         | Issues Open (↑) | PRs Merged (↑) | Recent Release? | Notes |
|----------------|------------------|------------------|------------------|-------|
| **vLLM**       | 58 (↑7)          | 762 (↑315 contribs) | ✅ v0.30.0       | Highest contributor volume; new model/hardware support dominant |
| **SGLang**     | 48 (↑5)          | 142 (↑21)         | ❌ None           | High regression density; active DCP/Helix scaling work |
| **llama.cpp**  | 67 (↑6)          | 128 (↑19)         | ✅ `b11115`       | Strong kernel-level optimizations; critical speculative decoding bug |
| **Ollama**     | 52 (↑4)          | 89 (↑12)          | ❌ None (RC only) | Stability-focused; macOS/Windows GPU detection gaps |
| **LiteLLM**    | 39 (↑3)          | 76 (↑10)          | ✅ v1.102.0       | Security-first release; cost accounting fixes paramount |

> 🔍 *Insight*: vLLM leads in innovation velocity; SGLang and liteLLM prioritize reliability and security; llama.cpp and Ollama remain agile for edge/local use cases.

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|
| **DeepSeek-V4.1-Flash**   | ✅ (MXFP8 + FlashMLA V4.1 on SM100) | ⚠️ Pending | ⚠️ Pending | ⚠️ Pending | ⚠️ Pending |
| **Kimi-K3 (MXFP4)**       | ✅ (ROCm gfx950/Mi355X CI) | ✅ (Quark quantization) | ⚠️ In progress | ⚠️ In progress | ⚠️ In progress |
| **Qwen-Image-2.1**        | ⚠️ Tracking | ⚠️ Tracking | ⚠️ Tracking | ✅ (Full support) | ✅ (v0.1.814-beta) |
| **Gemma 4 Vision (Dynamic Res)** | ⚠️ Pending | ⚠️ Pending | ⚠️ Pending | ✅ (PR #18603) | ⚠️ Pending |
| **Wan2.2-TI2V (FP8 Video)** | ⚠️ Pending | ⚠️ Pending | ⚠️ Pending | ⚠️ Pending | ✅ (PR #10729) |
| **AMD RDNA1 (gfx1010)**   | ⚠️ Partial | ⚠️ Partial | ⚠️ Partial | ⚠️ Broken | ✅ (PR #11615) |

> 🏆 **Winner**: **Unsloth** — fastest adoption of multimodal models (Qwen-Image-2.1), video FP8, and AMD RDNA1 training.  
> 🥈 **Runner-up**: **Ollama** — strongest consumer-facing support for Gemma 4 vision and Qwen-Image-2.1 via MLX.  
> 🥉 **Leader in enterprise inference**: **vLLM** — deepest integration with Hopper+ GPUs and MXFP8/KV caching.

---

### **4. Performance Frontier**

| Optimization Focus               | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|-----------------------------------|------|--------|-----------|--------|---------|
| **KV Cache & Scoring**            | ✅ (MXFP8, paged MQA scorer) | ✅ (DSA sparse indexer) | ⚠️ (FP8 decode slowdown) | ⚠️ (No direct fix) | ⚠️ (Memory mismatch) |
| **Batching & Parallelism**        | ✅ (MoE routing, All-to-all EP) | ✅ (DCP + Helix + fi_a2a) | ⚠️ (Grouped MoE fusion) | ⚠️ (Limited) | ⚠️ (Multi-model switching) |
| **Quantization & Dequantization** | ✅ (MXFP4 → block-FP8, fused AWQ) | ✅ (NVFP4, Quark) | ✅ (DP4A, IQ3_S, XMX GEMM) | ✅ (BF16 retention in Qwen3.8) | ✅ (Whole-model NVFP4, compressed INT4/INT8) |
| **Kernel-Level Fusions**          | ✅ (FlashMLA V4.1, fusing AWQ + GEMM) | ✅ (JIT L1 carveout, unified radix cache) | ✅ (Split-k FA, XMX GEMM) | ⚠️ (Metal rescaling) | ✅ (FlashInfer FP4 linear layers) |
| **Distributed Serving**           | ⚠️ (Progressive) | ✅ (DCP + Helix + PD-disaggregation) | ❌ | ❌ | ❌ |

> 🔥 **Trend**: Hardware-specific kernels (e.g., SM100 FlashMLA, ROCm DSA, Intel XMX) are now central to competitive advantage. Quantization is no longer just compression—it’s an architectural lever.

---

### **5. Layer Positioning**

| Project         | Primary Layer              | Secondary Role                     | Key Differentiator |
|----------------|----------------------------|-------------------------------------|--------------------|
| **vLLM**       | **Inference Engine**       | Model Serving (via async server)   | Max throughput on Hopper+; best for cloud-scale LLM serving |
| **SGLang**     | **Distributed Serving Stack** | Gateway + Parallelism Orchestrator | Industry-leading DCP + Helix + PD disaggregation |
| **llama.cpp**  | **Local Runtime**          | Lightweight inference backend      | Cross-platform, open-source, minimal dependencies |
| **Ollama**     | **Gateway + Local Runtime** | Agent UI, CLI, App Deployment      | Seamless Apple Silicon experience; dynamic image handling |
| **LiteLLM**    | **Universal API Gateway**  | Cost Control, Multi-Provider Routing | Trust via Cosign-signed images; precise billing logic |
| **Unsloth**    | **Agent Platform + Training Tool** | Multimodal Inference, Fine-tuning | Fast reasoning (60 FPS), multi-model loading, Jev API |

> 🧩 **Strategic Insight**: The stack is bifurcating: **engineers** choose vLLM/SGLang for scale; **developers** pick Ollama/Unsloth for speed and UX; **platform teams** rely on LiteLLM for observability and cost control.

---

### **6. Trend Signals**

#### **Emergent Trends from Today’s Activity:**
1. **Hardware-Specific Optimization Is Now Table Stakes**  
   - MXFP8, FP4, DP4A, split-k FA, and ROCm DSA are no longer experimental—they’re required for competitive performance.
   - *Developer Takeaway*: Choose your stack based on target hardware (Hopper vs. AMD vs. Intel XPU).

2. **Speculative Decoding Remains Unstable at Scale**  
   - Multiple regressions in SGLang (EAGLE), vLLM (DeepSeek-V4-Flash), and llama.cpp (Q4_K_M) indicate that speculative inference still has precision and race conditions.
   - *Developer Takeaway*: Avoid speculative decoding in production until PRs #40623, #25618, and #36333 are resolved.

3. **Multimodal Agents Are Becoming First-Class Citizens**  
   - Qwen-Image-2.1, Gemma 4 dynamic resolution, Wan2.2-TI2V, and Omnivoice TTS show rapid convergence toward full multimodal agent pipelines.
   - *Developer Takeaway*: Build agent workflows with image/video input early—tools like Unsloth and Ollama are ready.

4. **Security and Trust Are Prioritized in Production**  
   - LiteLLM’s Cosign signing, Ollama’s CUDA detection fixes, and vLLM’s stable APIs reflect growing maturity in supply chain and runtime safety.
   - *Developer Takeaway*: Validate image signatures and avoid `port=0` or unpatched releases in production.

5. **Cost Accuracy Drives Adoption in Multi-Tenant Environments**  
   - LiteLLM’s fixes to double-counting rate limits and zero-cost streaming calls highlight that financial integrity is non-negotiable.
   - *Developer Takeaway*: Use canonical `model_name`, not aliases, when enabling billing.

---

### ✅ **Final Recommendation for Application Developers**  
- **For cloud-scale agents**: Use **vLLM** (SM100) or **SGLang** (multi-node) with **DeepSeek-V4.1-Flash** and **MXFP8 KV cache**.
- **For Apple Silicon agents**: Leverage **Ollama** with `qwen3.8-flash-next` and **dynamic image resolution**.
- **For local multimodal agents**: **Unsloth** offers unmatched speed (60 FPS) and model flexibility.
- **For cost-controlled deployments**: Integrate **LiteLLM** with verified Docker images and proper `model_name` hygiene.
- **Avoid**: Speculative decoding on quantized models, `--tensor-split` in Studio, and unpatched RC versions.

> 📌 *Bottom Line*: The infrastructure layer is no longer “just” about speed—it’s about **hardware alignment, trust, cost predictability, and multimodal readiness**. Choose wisely.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-23**

---

### **1. Today's Highlights**  
The vLLM v0.30.0 release introduces critical support for **DeepSeek-V4.1-Flash**, leveraging **MXFP8 storage** and the **FlashMLA V4.1 record on SM100**, significantly improving prefill throughput. Concurrently, performance optimizations are advancing for AMD ROCm platforms (gfx950/Mi355X) and Intel XPU, with new kernels targeting sparse attention, paged scoring, and MoE routing.

---

### **2. Releases & Breaking Changes**  
- **v0.30.0**: Released today with 762 commits from 315 contributors (104 new). No breaking API changes reported; focus is on new model support and backend improvements.  
  🔗 [Release v0.30.0](https://github.com/vllm-project/vllm/releases/tag/v0.30.0)

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash**: Full support added with MXFP8 KV caching via FlashMLA V4.1 on SM100 (Hopper+).  
  🔗 [PR #56214](https://github.com/vllm-project/vllm/pull/56214), [Issue #56893](https://github.com/vllm-project/vllm/issues/56893)  
- ✅ **Kimi-K3**: CI testing now includes MI355X (ROCm gfx950); tracking issue open for full integration.  
  🔗 [Issue #50001](https://github.com/vllm-project/vllm/issues/50001), [PR #58012](https://github.com/vllm-project/vllm/pull/58012)  
- ✅ **AMD ROCm (gfx950/Mi355X)**: Performance optimization pipeline launched for Qwen3.8-2.4T-A95B-Quark-MXFP4.  
  🔗 [Issue #57149](https://github.com/vllm-project/vllm/issues/57149)  
- ✅ **Intel XPU**: All-to-all EP backend for batched MoE in progress; initial support for dual Arc Pro B70 (Battlemage).  
  🔗 [PR #46871](https://github.com/vllm-project/vllm/pull/46871)

---

### **4. Performance & Optimization**  
- **SM100 (Hopper)**: Opt-in lossless MXFP4 → block-FP8 expert dequantization for DeepSeek-V4 boosts prefill speed.  
  🔗 [PR #53709](https://github.com/vllm-project/vllm/pull/53709)  
- **ROCm gfx950/Mi355X**: Candidate-only paged MQA scorer for DSA sparse indexer decode reduces decode latency.  
  🔗 [PR #57859](https://github.com/vllm-project/vllm/pull/57859)  
- **NVIDIA SM89**: Fused AWQ dequant + GEMM kernel under `VLLM_BATCH_INVARIANT` avoids intermediate FP16 materialization.  
  🔗 [PR #57047](https://github.com/vllm-project/vllm/pull/57047)  
- **DiffusionGemma**: One-pass sampler stats kernel reduces memory pressure and improves throughput.  
  🔗 [PR #58226](https://github.com/vllm-project/vllm/pull/58226)  
- **General**: Breakable CUDA graphs (no `torch.compile`) enabled by default under `VLLM_BATCH_INVARIANT` to improve matmul tuning adaptability.  
  🔗 [PR #57586](https://github.com/vllm-project/vllm/pull/57586)

---

### **5. Stability & Regressions**  
- **Critical**: GLM-5.3-Flash exhibits repeated-token "word salad" and long-decode degeneration after accumulated reasoning (multi-turn agentic use).  
  🔗 [Issue #56868](https://github.com/vllm-project/vllm/issues/56868), [Issue #56605](https://github.com/vllm-project/vllm/issues/56605)  
- **High Severity**: DeepSeek-V4-Flash crashes on L20 with `AssertionError: auto_functionalized was not removed`.  
  🔗 [Issue #42949](https://github.com/vllm-project/vllm/issues/42949)  
- **ROCm/AMD**: Silent retrieval corruption for prompts ≥4k tokens on MI325X due to AITER sparse indexer bug.  
  🔗 [Issue #52109](https://github.com/vllm-project/vllm/issues/52109)  
- **Memory Corruption**: DiffusionGemma fails under concurrent decode due to tensor shape mismatch (`257 vs 256`).  
  🔗 [Issue #58035](https://github.com/vllm-project/vllm/issues/58035)  
- **Fix PRs in Progress**:  
  - [PR #57859](https://github.com/vllm-project/vllm/pull/57859): Fixes DSA sparse decode garbage on ROCm.  
  - [PR #58226](https://github.com/vllm-project/vllm/pull/58226): Addresses DiffusionGemma sampler crash.

---

### **6. What This Means for Application Developers**  
- **Model Choice**: Prioritize **DeepSeek-V4.1-Flash** on SM100 GPUs for high-throughput inference; expect improved prefill efficiency with MXFP8.  
- **Agent Workloads**: Avoid **GLM-5.3-Flash** in multi-turn agentic flows until stability fixes land—expect output corruption.  
- **Performance Tuning**: Use `VLLM_BATCH_INVARIANT=1` with breakable CUDA graphs for better runtime matmul tuning, especially on Hopper+.  
- **AMD Users**: Monitor ROCm-specific issues (e.g., #52109, #57149); consider disabling CUDA graphs temporarily for stable decode.  
- **Quantization**: Leverage fused AWQ kernels (PR #57047) for lower memory overhead on SM89 devices.  

> 💡 **Action Item**: Review model-specific limitations in [issue tracker](https://github.com/vllm-project/vllm/issues) before deploying production agents using GLM-5.3 or Kimi-K3.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **1. Today's Highlights**  
SGLang advances its distributed inference stack with key progress on **Decode Context Parallelism (DCP)** and **Helix Parallelism**, now using `fi_a2a`/`a2a` as the default communication backend across all models. Significant work continues on **full msgpack migration for IPC**, improving serialization efficiency and reducing dependency on legacy Pickle. Meanwhile, critical fixes address stability issues in **EAGLE speculative decoding** and **PD-disaggregated KV cache transfers**, ensuring robustness under high concurrency.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- ✅ **Kimi-K3 MXFP4** now supported on **AMD ROCm (Quark quantization)** via PR [#40811](https://github.com/sgl-project/sglang/pull/40811).  
- ✅ **SenseNova-U1 / U1.5** integration is actively tracked in Issue [#37742](https://github.com/sgl-project/sglang/issues/37742), aligning with official OpenSenseNova reference implementation.  
- ✅ **NPU CANN 9.1.0** update landed in PR [#40524](https://github.com/sgl-project/sglang/pull/40524), enabling support for newer Ascend hardware and Python 3.12.  
- ✅ **DFlash support added for Kimi-K3** in PR [#40794](https://github.com/sgl-project/sglang/pull/40794), part of a broader PD+DCP+DFlash pipeline stack.

---

### **4. Performance & Optimization**  
- 🔧 **DCP + Helix Parallelism** is now fully enabled with `fi_a2a`/`a2a` as default comm backend (PRs #39165, #37767, #21637), enabling efficient multi-node scaling.  
- 🚀 **JIT Kernel Optimization**: PR [#40767](https://github.com/sgl-project/sglang/pull/40767) introduces an *occupancy-preserving L1 carveout preference*, reducing shared-memory overhead while maintaining kernel occupancy.  
- ⚙️ **Unified Radix Cache Refactor**: PRs [#38652](https://github.com/sgl-project/sglang/pull/38652) and [#39627](https://github.com/sgl-project/sglang/pull/39627) integrate **LMCache** and sync Rust TreeCore as the default, reducing code duplication and improving performance consistency across backends.  
- 💡 **Speculative Decoding Improvements**: PR [#39643](https://github.com/sgl-project/sglang/pull/39643) enables model-agnostic last-stage draft embedding under PP, improving compatibility and reducing overhead in pipeline scenarios.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| Critical | [#40623](https://github.com/sgl-project/sglang/issues/40623) | Illegal memory access in Triton fused-MoE kernel when `flashinfer_megamoe` + EAGLE spec decode (GLM-5.2-NVFP4, sm_107) | ❌ Pending |
| High | [#36333](https://github.com/sgl-project/sglang/issues/36333) | Zombie request after disconnected streaming client → floods "state was deleted" logs (regression from #34160 revert) | ❌ Pending |
| High | [#33397](https://github.com/sgl-project/sglang/issues/33397) | Progressive output corruption under concurrency (DeepSeek-V4-Flash on 2× H200, dsv4 + DP attention) | ❌ Pending |
| Medium | [#39831](https://github.com/sgl-project/sglang/issues/39831) | GLM-5.3-Flash vision silently broken due to pinned transformers==5.12.1 lacking `glm5_next`, fallback to TokenizersBackend | ✅ Partial fix in PR #39831 |
| Medium | [#30815](https://github.com/sgl-project/sglang/issues/30815) | FP8 KV-cache decode slowdown: unfused K/V quantization + per-layer Q conversion overhead | ❌ Pending |

> ⚠️ **Note**: Several regressions are tied to **EAGLE speculative decoding**, **DP attention**, and **multi-node disaggregation**, indicating ongoing stress testing in production-grade setups.

---

### **6. What This Means for Application Developers**  
- **Use DCP + Helix** with `--dcp-comm-backend fi_a2a` for scalable, low-latency inference across multi-node clusters — this is now the recommended path.  
- **Avoid deprecated APIs**: PR [#40795](https://github.com/sgl-project/sglang/pull/40795) removes outdated endpoints/env vars; ensure your config files are updated before next release.  
- **Enable `--enable-dsa-cache-layer-split`** for single-deploy use cases (tracked in #32309), which simplifies deployment for MoE models.  
- **Monitor for EAGLE-related crashes** if using `flashinfer_megamoe` + EAGLE on NVFP4 models — consider pinning to stable `main` until PRs #40623 and #36333 are resolved.  
- **Leverage unified radix cache** (Rust TreeCore) for better cache reuse and lower latency — it’s now the default and more performant than legacy paths.

👉 *Best Practice*: For production deployments involving spec decoding or large-scale MoE models, track PRs #40623, #36333, and #33397 closely — they represent critical stability risks.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-23**

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes in the server and backend kernels, particularly around speculative decoding races and model loading concurrency. New optimizations for Intel Xe GPUs (Vulkan) and A8-Q4_K support on OpenCL are notable hardware advances. The PR pipeline shows strong momentum in MoE fusion and quantization kernel improvements across CUDA, SYCL, and Vulkan.

---

### **2. Releases & Breaking Changes**  
- **`b11115`**: Added OpenCL binary kernel `kernel_gemm_noshuffle_q4_k_q8_1_dp4a_ila_a8_bin` for A8 Q4_K non-MoE models with DP4A acceleration.  
  🔗 [PR #29056](https://github.com/ggml-org/llama.cpp/pull/29056)  
- **`b11113`**: Fixed log file propagation to child processes in `llama-server`, improving security and process isolation.  
  🔗 [PR #29212](https://github.com/ggml-org/llama.cpp/pull/29212)  
- **`b11112`**: Enabled `input_image` in `function_call_output` via server API — essential for multimodal agent workflows.  
  🔗 [PR #20663](https://github.com/ggml-org/llama.cpp/pull/20663)  

> ⚠️ No breaking API changes; all updates are additive or corrective.

---

### **3. New Model & Hardware Support**  
- **OpenCL**: Full support for **A8 Q4_K non-MoE** quantized models via new DP4A-optimized binary kernel (`b11115`).  
  🔗 [PR #29056](https://github.com/ggml-org/llama.cpp/pull/29056)  
- **Vulkan**: Added **Intel Xe Flash Attention (split-k path)** optimization for Xe-LPG Plus/Xe2/Xe3 architectures.  
  🔗 [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406)  
- **SYCL**: Ongoing enhancements for **Intel Arc Pro B70**, including IQ3 code reordering and persistent layouts.  
  🔗 [PR #29107](https://github.com/ggml-org/llama.cpp/pull/29107)  
- **Model Support**: MTP draft models now support `d2t` (draft-to-target) vocabulary trimming (Qwen3.5/MTP).  
  🔗 [PR #29290](https://github.com/ggml-org/llama.cpp/pull/29290), [PR #29143](https://github.com/ggml-org/llama.cpp/pull/29143)

---

### **4. Performance & Optimization**  
- **CUDA**: Added **grouped experts top-k fusion** → recovers most performance loss from expert grouping.  
  🔗 [PR #29181](https://github.com/ggml-org/llama.cpp/pull/29181)  
- **SYCL**: Introduced **XMX GEMM for grouped MoE** to better utilize Intel Arc’s compute units.  
  🔗 [PR #29245](https://github.com/ggml-org/llama.cpp/pull/29245)  
- **Vulkan**: Optimized FA mask handling via direct-mapped DMA cache (replaces LRU for HVX paths).  
  🔗 [PR #29210](https://github.com/ggml-org/llama.cpp/pull/29210), [PR #29282](https://github.com/ggml-org/llama.cpp/pull/29282)  
- **Metal**: Gate `mul_mm_id` rescaling behind `ggml_prec` to prevent precision errors.  
  🔗 [PR #29029](https://github.com/ggml-org/llama.cpp/pull/29029)  
- **GGML**: IQ1_M now builds prefix sums once per block, reducing redundant computation.  
  🔗 [PR #28706](https://github.com/ggml-org/llama.cpp/pull/28706)

---

### **5. Stability & Regressions**  
- **Critical**: Speculative decoding (MTP/draft-mtp) produces **divergent greedy output on quantized targets** (Q4_K_M), but matches on BF16.  
  🔗 [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618) (25 comments, 2 upvotes)  
- **High Severity**: Qwen3.5 + Codex crashes when loading checkpoints post-#20087 (likely due to context checkpoint logic).  
  🔗 [Issue #20176](https://github.com/ggml-org/llama.cpp/issues/20176) (18 comments)  
- **GPU-Specific**: IQ3_S generates garbage tokens on RTX 5060TI (Blackwell); likely a kernel precision issue.  
  🔗 [Issue #28581](https://github.com/ggml-org/llama.cpp/issues/28581)  
- **Server Race**: `/metrics` scraping by VictoriaMetrics causes silent server stoppage.  
  🔗 [Issue #29104](https://github.com/ggml-org/llama.cpp/issues/29104)  
- **Memory Leak**: VRAM not freed after `llama_model_free` if no prompt was run (Metal).  
  🔗 [Issue #25937](https://github.com/ggml-org/llama.cpp/issues/25937)

> ✅ Fix PRs exist for some regressions (e.g., `b11113` fixes child logging), but speculative decoding divergence remains unpatched.

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding on quantized models** — expect potential output divergence until #25618 is resolved.  
- **Leverage new `d2t` trimmed vocab support** in MTP drafts (Qwen3.5) for faster, lower-memory speculative inference.  
- **Enable `--cache-disk` (feature request #20697)** soon: disk-based context offloading is highly requested (56 upvotes) and will be essential for long-context apps.  
- **Optimize for Intel Arc & Xe GPUs** using Vulkan + split-k FA kernels for improved throughput in multimodal or high-throughput scenarios.  
- **Avoid `port=0` with multiple addresses** — recently restricted in `b11104`. Use explicit ports instead.  
- **Monitor server memory leaks** on Metal and Vulkan — especially after model unload without prompt execution.

🔧 *Recommended*: Test your agent pipelines with `b11115+` and avoid speculative decoding on Q4_K_M until #25618 is patched.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-23**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with key improvements in multimodal support and performance for MLX-backed models, including dynamic image resolution handling in Gemma 4 and faster Qwen3.8 prompt processing on Apple Silicon. Critical stability fixes were merged for macOS UI responsiveness and CUDA detection on NVIDIA Blackwell (RTX 50-series), while ongoing work targets structured output reliability and model export functionality.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
However, **v0.34.0–0.34.3-rc1** has seen several critical bug fixes recently, particularly around GPU initialization and macOS app behavior. Users on M4/M5 Macs or Windows with newer NVIDIA GPUs should ensure they are on a recent release to avoid silent failures or crashes.

---

### **3. New Model & Hardware Support**  
- ✅ **Dynamic Image Resolution for Gemma 4**: PR #18603 introduces per-image selection of visual token budgets (70–1120), preserving detail in high-res inputs without hardcoding `max_soft_tokens=280` (#17152, #15626).  
- ✅ **MLX + Vulkan Support in Docker**: PR #18592 adds missing libraries/configs for Nvidia MLX/Vulkan backend in containers — essential for GPU-accelerated inference on Linux hosts.  
- 🟡 **Qwen3.8 Flash Next (MLX)**: PR #18078 optimizes memory usage by retaining BF16 precision for key layers (QSA, non-expert MTP path) while using MXFP8 elsewhere.  
- 🔮 **Future Support**: Community requests include **audio input** (#11798), **System 1 models** like Kev/Laya (#18594), and **MIMO v2.5** for million-token context (#15887).

---

### **4. Performance & Optimization**  
- ⚡ **Qwen3.8 Prompt Processing Speedup (MLX)**: On M5 Max, prompt TPS increased from **715 → 848** (+18.7%) at 2k tokens and **695 → 828** (+19.1%) at 8k tokens via gated-delta kernel and MLP optimization (#18550).  
- ⚙️ **Gemma 4 Vision Efficiency**: Dynamic budgeting reduces unnecessary downscaling of high-resolution images, improving OCR accuracy without sacrificing speed.  
- 📉 **Memory Optimization**: MLX quantization strategy avoids NVFP4 degradation during long generations, enabling better quality in extended outputs (#18078).  
- 🧩 **Structured Output Improvements**: Work underway to fully implement JSON Schema spec (#18488) and address logprob limitations (#18579, #18590).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|-------|--------|
| 🔴 High | **macOS App Freezes Post-v0.34.1 Update** | Closed | [PR #18601](https://github.com/ollama/ollama/pull/18601) – replaced `osascript` with direct process check |
| 🔴 High | **Windows CUDA Detection Fails on RTX 50-Series (Blackwell)** | Open | [Issue #18581](https://github.com/ollama/ollama/issues/18581) – VRAM shows 0B, CPU fallback |
| 🟡 Medium | **Silent Failures in `/v1/chat/completions` for qwen3.8:27b** | Open | [Issue #17790](https://github.com/ollama/ollama/issues/17790) – works via CLI but hangs on API |
| 🟡 Medium | **Homebrew ollama fails on mlx models (structured output missing)** | Open | [Issue #18597](https://github.com/ollama/ollama/issues/18597) – `xgrammar not found` error |
| 🟡 Medium | **Long Document Processing Fails Silently (60s timeout)** | Open | [Issue #18368](https://github.com/ollama/ollama/issues/18368) – no GUI notification |

> *Note:* Several regressions stem from version-specific issues (e.g., 0.33.x vs 0.32.13 slowdowns, #18225) and environment-specific bugs (e.g., phone verification for non-US users, #16060).

---

### **6. What This Means for Application Developers**  
- **Use MLX for Apple Silicon**: Expect significant gains in prompt throughput (up to **+19%**) and improved memory efficiency when using `qwen3.8-flash-next` or `gemma4` on M-series chips.  
- **Avoid Hardcoded Image Budgets**: If processing high-res documents, ensure you’re on a build with dynamic `max_soft_tokens` (via PR #18603); otherwise, OCR may fail silently.  
- **Be Cautious with Structured Outputs**: The `think: true` + `format:` combination is inconsistent across endpoints (`/api/generate` ignores thinking; #17544). Use `/api/chat` or wait for delayed constrained decoding (#14196).  
- **Validate Install Scripts**: For unreliable connections, use alternative installers (e.g., #18584) instead of `curl -fsSL https://ollama.com/install.sh | sh`.  
- **Plan for Model Export/Import**: PR #18578 enables offline model transfer via `ollama export/import`, crucial for air-gapped deployments.

> 👉 *Recommendation*: Pin to `0.34.3-rc1` or later if using MLX/Vulkan/NVIDIA Blackwell, and test workflows involving structured outputs and long-context prompts under real-world conditions.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-23**

---

### **1. Today's Highlights**  
The latest release, **v1.102.0**, introduces enhanced security via verified Docker image signing using Cosign (via commit `0112e53`), reinforcing trust in production deployments. Critical fixes address budget enforcement failures for on-prem models (#14004), double-counting in per-team rate limits (#34140), and misreported spend during streaming calls with model aliases (#42161). These updates strengthen cost accuracy and reliability in multi-tenant environments.

---

### **2. Releases & Breaking Changes**  
- **v1.102.0**: Released with **verified Docker image signatures** using [Cosign](https://docs.sigstore.dev/cosign/overview/) — all images signed under the same key introduced in [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
  🔗 [GitHub Release v1.102.0](https://github.com/BerriAI/litellm/releases/tag/v1.102.0)  
- **Backport fix to stable/1.102.x**: Addresses WebSocket handshake refusal issues and metadata propagation bugs ([PR #42618](https://github.com/BerriAI/litellm/pull/42618)).

> ✅ **Migration Note**: Ensure your CI/CD pipelines validate image signatures if deploying v1.102.0+ in production.

---

### **3. New Model & Hardware Support**  
No new model or hardware support announced today. However, ongoing syncs have updated pricing for:
- **Azure** (20 models added, including `gpt-5.x` and Grok variants) — [PR #42594](https://github.com/BerriAI/litellm/pull/42594)
- **OpenRouter** (19 models updated; 9 newly added) — [PR #42592](https://github.com/BerriAI/litellm/pull/42592)
- **Fireworks AI** (2 models added) — [PR #42590](https://github.com/BerriAI/litellm/pull/42590)

> ⚠️ AWS Bedrock sync failed today — prices remain outdated ([PR #42626](https://github.com/BerriAI/litellm/pull/42626)).

---

### **4. Performance & Optimization**  
- **Rust-based cost calculation expansion** ([PR #42620](https://github.com/BerriAI/litellm/pull/42620)): Now includes support for image, OCR, video, batch, custom, catalog, guardrail, tiered, and Gemini grounding pricing — improving consistency between Python and Rust pricing logic.
- **Streaming usage merger optimization** ([PR #40736](https://github.com/BerriAI/litellm/pull/40736)): Fixes stale cache-write token retention after explicit zero updates.
- **Improved logging pipeline** ([PR #42616](https://github.com/BerriAI/litellm/pull/42616)): Offloads log redaction/truncation to Rust diagnostics processor, reducing Python overhead.

> 📈 *Impact*: More accurate real-time cost tracking, reduced latency in high-throughput environments.

---

### **5. Stability & Regressions**  
Top stability concerns reported today:

| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [#14004](https://github.com/BerriAI/litellm/issues/14004): Free on-prem models blocked when budget exceeded | ⚠️ High | Closed | N/A |
| [#34140](https://github.com/BerriAI/litellm/issues/34140): Rate limiter double-counts team-per-model limits → effective RPM/TPM halved | ⚠️ High | Open | [PR #32618](https://github.com/BerriAI/litellm/pull/32618) (awaiting review) |
| [#42161](https://github.com/BerriAI/litellm/issues/42161): Streaming requests costed as $0 when `model_name` is an alias | ⚠️ Medium | Open | N/A |
| [#39370](https://github.com/BerriAI/litellm/issues/39370): Reset-budget job silently zeros spend forever if `budget_duration=null` but `budget_reset_at` is past | ⚠️ Medium | Open | N/A |

> 🔥 **Critical**: Budget enforcement for free models is broken in certain configurations — avoid relying on budget limits for self-hosted models until fixed.

---

### **6. What This Means for Application Developers**  
- **Cost accuracy is now more critical than ever**: Ensure `model_name` is set to canonical names (not aliases) when enabling billing — otherwise, streaming calls may be logged as free ([#42161](https://github.com/BerriAI/litellm/issues/42161)).
- **Rate limiting behavior may be half of expected values** if using team-level per-model limits — verify configurations against [PR #32618](https://github.com/BerriAI/litellm/pull/32618).
- **Enable image signature verification** in your deployment pipeline: Use `cosign verify` on `ghcr.io/berriai/litellm:latest` to prevent supply chain risks.
- **Audit telemetry and logs** for discrepancies in `spend = 0` on cache hits or streaming calls — these could indicate uncharged usage.
- **Consider adopting the new Rust-powered cost engine** for improved performance and consistency in large-scale agent systems.

> 💡 **Pro Tip**: Use `config.yaml` schema validation ([#23022](https://github.com/BerriAI/litellm/issues/23022)) in IDEs to avoid typos in config files.

---  
*Generated: 2026-09-23 | Source: GitHub @ BerriAI/litellm*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-09-23**

---

### **1. Today's Highlights**  
Unsloth has released **v0.1.814-beta** with full local support for **Qwen-Image-2.1**, including custom Agent Skills, improved chat/project management, and a **2x speedup in reasoning blocks (60 FPS vs 30 FPS)**. The release also brings enhanced Linux install reliability and robust training stability. Concurrently, multiple PRs advance low-level optimizations for NVFP4 quantization, multi-model serving, and AMD RDNA1 GPU compatibility.

---

### **2. Releases & Breaking Changes**  
- **v0.1.814-beta**: Full Qwen-Image-2.1 support with Agent Skills and faster reasoning (60 FPS). Improved Linux install/update workflows.  
  🔗 [Release Notes](https://unsloth.ai/docs/models/qwen-image-2.1)  
- **API Key Copy Issue Fixed**: Users can now copy newly created API keys in the UI (Issue #11387 closed).  
  🔗 [Issue #11387](https://github.com/unslothai/unsloth/issues/11387)

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - ✅ **Qwen-Image-2.1** fully supported in desktop and studio apps (v0.1.812+).  
    🔗 [Guide](https://unsloth.ai/docs/models/qwen-image-2.1)  
  - ✅ **LongCat-Flash-Lite-Sparse** now loadable via `transformers` (PR #11620 pending).  
  - ✅ **Omnivoice TTS** model available in app; notebook requested (Issue #11513).  

- **Hardware & Backend Support**:  
  - ✅ **AMD RDNA1 (gfx1010)**: Training now possible on RX 5700 XT series after PR #11615 disables Triton buffer ops.  
    🔗 [PR #11615](https://github.com/unslothai/unsloth/pull/11615)  
  - ✅ **ROCm (gfx1100, gfx1201)**: Active improvements for RX 7900 XTX (Issue #11498), though VM faults persist.  
  - ❌ **Intel XPU**: `adamw_8bit` optimizer crashes during `optimizer.step()` (Issue #10021).  
  - ⚠️ **AMD GPU Detection**: Broken in latest `llama.cpp` build (Issue #7485).

---

### **4. Performance & Optimization**  
- **Reasoning Speed**: **2x improvement** — reasoning blocks now run at **60 FPS vs 30 FPS** (v0.1.812+).  
- **NVFP4 Quantization**:  
  - Per-layer NVFP4 policies introduced (PR #10730).  
  - FlashInfer backend for FP4 linear layers (PR #10731).  
  - Whole-model NVFP4 for video families (Wan2.2-TI2V, HunyuanVideo) with pre-quantized denoisers (PR #10729).  
- **Multi-Model Serving**: Studio now supports **loading and switching between multiple models simultaneously** (PR #11591).  
- **Jev API**: Local decision API added via Laya (PR #11603), enabling probabilistic yes/no/score inference.  
- **Memory Efficiency**:  
  - Support for loading **compressed-tensors packed INT4/INT8 checkpoints directly into bitsandbytes 4-bit** (PR #11537).  
  - NVIDIA ModelOpt FP8 checkpoints now loadable via transformers’ FP8 quantizer (PR #11592).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Link |
|---------|------|--------|------|
| High | Qwen-Image-2.1 requires **manual steps to run** (UI doesn't auto-handle config) | Open | [#11567](https://github.com/unslothai/unsloth/issues/11567) |
| High | **AMDGPU VM fault/reset** on RX 7900 XTX during QLoRA training (ROCm) | Open | [#11498](https://github.com/unslothai/unsloth/issues/11498) |
| High | **LLM CUDA works, image model fails after Repair** (device mismatch) | Open | [#11545](https://github.com/unslothai/unsloth/issues/11545) |
| Medium | **Studio strips `--tensor-split` flag**, causing OOM on MoE with CPU offload | Open | [#11330](https://github.com/unslothai/unsloth/issues/11330) |
| Medium | **API key not copyable** in Firefox/Brave (Linux) | Closed | [#11387](https://github.com/unslothai/unsloth/issues/11387) |
| Low | **Hugging Face search blocked in China** | Open | [#11529](https://github.com/unslothai/unsloth/issues/11529) |
| Low | Typo: “top-1% accuracy” → “top-1 accuracy” | Open | [#11514](https://github.com/unslothai/unsloth/issues/11514) |

> ✅ *Fixes in progress*: PR #11615 (RDNA1), PR #11537 (INT4/INT8 compression), PR #11592 (FP8 loading).

---

### **6. What This Means for Application Developers**  
- **Build faster, lighter agents**: With **60 FPS reasoning** and **NVFP4 + flashinfer optimizations**, your AI agents can handle complex multimodal inputs with lower latency and memory footprint.  
- **Deploy on diverse hardware**: AMD RDNA1 and ROCm support is maturing—ideal for cost-sensitive inference clusters. Use `PR #11615` to enable training on older AMD cards.  
- **Serve multiple models efficiently**: Use **multi-model loading (PR #11591)** to dynamically route requests without reloading.  
- **Leverage advanced quantization**: Load compressed INT4/INT8 and FP8 checkpoints natively—no preprocessing needed.  
- **Avoid pitfalls**: Be cautious with `--tensor-split` flags in Studio (Issue #11330); use CLI or direct Python for fine-grained control.  
- **Future-proof**: Watch for **Jev API (PR #11603)** and **knowledge distillation via offline logprobs (Issue #11556)**—key for scalable agent training.

> 📌 *Actionable Tip*: For high-throughput RAG apps, use environment variables to configure `UPLOAD_EXTS` (Issue #11385) and avoid over-indexing.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*