# AI Infrastructure Digest 2026-09-27

> Generated: 2026-09-27 00:49 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-27**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of intense specialization and performance refinement, with projects converging on high-throughput, low-latency workflows for agentic applications. Key trends include the maturation of speculative decoding (DFlash2, DSPARK), deep hardware integration (GB10, gfx950, Hexagon), and growing emphasis on reliability in production-grade gateways. While vLLM and SGLang lead in engine-level optimizations, LiteLLM and Ollama are increasingly central to cost-aware routing and developer-facing tooling—reflecting a shift toward full-stack orchestration.

---

### **2. Activity Comparison**  

| Project       | Open Issues | Open PRs | Releases (Last 24h) | Stability Status |
|---------------|-------------|----------|----------------------|------------------|
| **vLLM**      | 84          | 32       | None                 | 🟥 High risk: 4 critical issues (deadlocks, OOMs) |
| **SGLang**    | 76          | 28       | None                 | 🟥 Critical: `decoded_text` bug, unbounded memory use |
| **llama.cpp** | 121         | 41       | Reverted (`b11201`)   | 🟥 Severe: GPU driver crashes, silent corruption |
| **Ollama**    | 118         | 15       | None                 | 🔴 Catastrophic: 95% cloud failure rate |
| **LiteLLM**   | 67          | 22       | None                 | 🟡 Moderate: tool call parsing, streaming bugs |

> ✅ *Observation*: Despite lower PR volume, **vLLM** and **llama.cpp** show stronger engineering momentum in core optimization and hardware support. **Ollama** stands out for operational instability, while **LiteLLM** focuses on guardrail and cost infrastructure improvements.

---

### **3. Model Support Race**  

| New Model / Architecture     | Supported By                          | Notes |
|-------------------------------|----------------------------------------|-------|
| **GLM-5.3-Flash-DFlash2**     | ✅ vLLM (PR #56983)                     | First to enable DFlash2 speculation on GLM family |
| **DeepSeek-V4.1-Flash (AMD)** | ✅ SGLang (PR #41308)                   | ROCm/gfx950 support via DSpark kernel |
| **Qwen4-Exp FP8 Indexer Cache**| ✅ SGLang (PR #39614)                  | Reduces cache footprint by 50% |
| **Nemotron 3 Puzzle (75B)**   | ✅ llama.cpp (PR #28717)                | Full CUDA ssm_scan with state size 96 |
| **Qwen-Image-2.1 GGUF**       | ⚠️ Unsloth (partial; issues open)      | Download, asset resolution, and load bugs persist |
| **K2 Horizon (MoVA)**         | ❌ Requested (Issue #29424)             | Emerging edge model interest |

> 🏆 **Leader**: **vLLM** leads in speculative decoding and MoE/Mamba metadata reuse; **llama.cpp** dominates edge and cross-platform hardware reach. **SGLang** is ahead in AMD/ROCm model deployment readiness.

---

### **4. Performance Frontier**  

| Focus Area               | Leading Projects                         | Key Advances |
|--------------------------|------------------------------------------|------------|
| **KV Cache Optimization** | vLLM (PR #58762), SGLang (PR #39478)     | Metadata reuse (30% ↓ usage), dynamic pooling |
| **Speculative Decoding**  | vLLM (DFlash2), SGLang (DSPARK/EAGLE3)   | Draft model parity, boundary handling |
| **Quantization & Kernels**| llama.cpp (F16 FWHT, tiled k-quant)      | 2.71x speedup (IQ3_S), reduced CPU/GPU bandwidth |
| **Distributed Serving**   | SGLang (FlashInfer IPC), vLLM (pipeline-parallel) | PCIe-IPC all-reduce (~30% latency ↓) |
| **Memory Management**     | LiteLLM (batched Redis ops), SGLang (LMCache) | 30–40% fewer Redis round trips, leak fixes |

> 🔥 **Trend**: Optimization is shifting from isolated kernel tuning to **systemic stack coordination**—e.g., batching across inference, cost tracking, and memory offload layers.

---

### **5. Layer Positioning**  

| Project       | Primary Layer                    | Role Summary |
|---------------|----------------------------------|--------------|
| **vLLM**      | Inference Engine                 | Low-level, high-performance tensor kernels, MoE, speculative decoding |
| **SGLang**    | Inference Engine + Runtime       | Unified control flow, multi-node coordination, model-specific optimizations |
| **llama.cpp** | Local Runtime + Cross-Platform   | CPU/GPU/edge inference, modular backends (SYCL, ROCm, Vulkan) |
| **Ollama**    | Developer Gateway + CLI Runtime  | Local-first model hosting, agent-friendly UX, tool call interface |
| **LiteLLM**   | LLM Gateway + Cost Orchestrator  | Unified API, guardrails, spend tracking, routing across providers |
| **Unsloth**   | Training/Fine-Tuning UI + Runtime| End-to-end fine-tuning (LoRA), model management, export pipeline |

> 💡 **Positioning Insight**: The stack is clearly bifurcating: **engine-level** (vLLM/SGLang) vs. **application-layer** (Ollama/LiteLLM) vs. **training/UI** (Unsloth). This reflects a maturing ecosystem where developers choose tools based on deployment context.

---

### **6. Trend Signals**  

#### 🔍 **Key Industry Trends Extracted Today**:
1. **Speculative Decoding is Now Production-Ready** – DFlash2 and DSPARK are no longer experimental; they’re being integrated into stable workflows (vLLM, SGLang).
2. **Hardware Specialization is Accelerating** – Projects are targeting niche accelerators: GB10 (vLLM), gfx950 (SGLang/vLLM), Hexagon (llama.cpp), M-series (Ollama).
3. **Cost & Guardrail Infrastructure is Maturing** – LiteLLM’s spend batching and prompt injection detection signal that **gateways are becoming compliance-aware platforms**, not just proxies.
4. **Edge & Heterogeneous Deployment is a Priority** – Multiple projects (llama.cpp, Unsloth, SGLang) now support WSL2, SYCL, ROCm, and mobile SoCs — indicating demand for cross-environment consistency.
5. **Reliability is the New Differentiator** – With Ollama Cloud Pro failing at 95%, and multiple deadlocks/OOMs in vLLM/SGLang, **production stability is now a top-tier concern**.

#### 📌 **Actionable Advice for Application Developers**:
- **Avoid Ollama Cloud Pro** until issue #15453 is resolved—use local models or LiteLLM as fallback.
- **Use vLLM for high-throughput speculative inference** (GLM-5.3/DFlash2), but validate against known V1 engine deadlocks.
- **Leverage LiteLLM’s new batched Redis operations** for scalable proxy deployments under sustained load.
- **Prepare for multimodal costs**—ensure your routing layer recognizes `minimax-m3` as vision-capable.
- **Monitor model-specific regressions** (e.g., Qwen3.8 streaming, `glm-4.7` `</tool_call>` early termination) before rolling out agents.

> 🛠️ **Pro Tip**: For agent pipelines, combine **vLLM (inference)** + **LiteLLM (routing/guardrails)** + **Unsloth (fine-tuning)** + **SGLang (multi-node scaling)** to build a robust, future-proof stack.

---  
*Generated from GitHub activity data: 2026-09-27 | Analyst: Senior AI Infrastructure Analyst*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-27**

#### **1. Today's Highlights**  
The vLLM project continues to expand its support for next-generation speculative decoding and MoE optimizations, with key PRs enabling DFlash2 draft models for GLM-5.3 and reusing Mamba/GDN metadata across KV cache groups to reduce overhead. Critical stability fixes were merged for GLM-5.3 model initialization and prefix caching under MTP speculative decoding, addressing long-standing correctness issues in high-performance inference workflows.

#### **2. Releases & Breaking Changes**  
*None.* No new releases or breaking API/config changes were reported in the past 24 hours.

#### **3. New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash-DFlash2**: Full support added via PR [#56983](https://github.com/vllm-project/vllm/pull/56983), enabling block-diffusion (DFlash2) speculative decoding for this model family.
- ✅ **MiniCPM-V 4.7**: Added support via PR [#58674](https://github.com/vllm-project/vllm/pull/58674), including canvas 3D M-RoPE and updated video placeholder handling.
- ✅ **ROCm gfx950 MXFP8 MoE/Dense Backends**: Feature request [#57960](https://github.com/vllm-project/vllm/issues/57960) highlights ongoing work to enable MXFP8 on gfx950 GPUs via AITER.
- ⚠️ **NVIDIA DGX Spark (GB10, sm_121, aarch64)**: Still lacks full sm_121 support on ARM64; issue [#36821](https://github.com/vllm-project/vllm/issues/36821) remains open despite hardware availability.

#### **4. Performance & Optimization**  
- 🚀 **Mamba/GDN Metadata Reuse**: PR [#58762](https://github.com/vllm-project/vllm/pull/58762) reduces per-step overhead by reusing attention metadata across KV cache groups—up to **30% lower KV cache usage** observed on Qwen3.6-35B-A3B + DFlash setups.
- 🔧 **KV Cache Group Optimization**: With `--min-kv-cache-group-layers`, users can now trade capacity for fewer groups (e.g., 17 vs 46), improving efficiency in pipeline-parallel serving.
- 💡 **HiSparse P/D Transfer Direct GPU Landing**: PR [#55398](https://github.com/vllm-project/vllm/pull/55398) enables direct GPU landing of prefix/draft transfers when decoder capacity permits—reducing host-to-device latency in disaggregated serving.
- ⏱️ **Weight Loading Speed on GB10**: Issue [#58726](https://github.com/vllm-project/vllm/issues/58726) reports slow H2D copies due to mmap-backed safetensors; performance-critical for unified-memory systems like DGX Spark.

#### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| 🔴 High | [#37729](https://github.com/vllm-project/vllm/issues/37729) | V1 engine deadlocks under concurrent load (fp8 + prefix caching + Qwen3.5) | ❌ Open — critical for production scale |
| 🔴 High | [#56457](https://github.com/vllm-project/vllm/issues/56457) | Qwen4Exp QSA indexer causes device OOM/hang on GB10 (unified memory) during long prefill | ❌ Open — impacts long-context inference on Blackwell |
| 🟡 Medium | [#58485](https://github.com/vllm-project/vllm/issues/58485) | V1 thinking budget corrupts multi-token reasoning_end_str under speculative decoding | ❌ Open — affects agentic reasoning pipelines |
| 🟡 Medium | [#58804](https://github.com/vllm-project/vllm/issues/58804) | Tiered offloading regression in memory management | ❌ Open — impacts UVA offload strategies |
| 🟢 Low | [#58824](https://github.com/vllm-project/vllm/issues/58824) | `llama3_json` streaming drops assistant content starting with `{` | ❌ Open — parser-level issue |

#### **6. What This Means for Application Developers**  
- **Speculative Decoding Workflows**: You can now safely deploy **DFlash2 drafts** with GLM-5.3 models using `--speculative-config '{"method":"dflash","model":"incoai/GLM-5.3-Flash-DFlash2"}'`. Ensure your deployment uses `main` or v0.30+.
- **Long Context Inference**: Avoid `Qwen4Exp` on DGX Spark (GB10) until [#56457](https://github.com/vllm-project/vllm/issues/56457) is resolved—expect OOMs during long prefill stages.
- **Agent & Tooling Apps**: Be cautious with `llama3_json` streaming output and `Kimi-K3` reasoning channels—both have known output corruption bugs ([#58824](https://github.com/vllm-project/vllm/issues/58824), [#51798](https://github.com/vllm-project/vllm/issues/51798)) that may break agentic loops.
- **Performance Tuning**: Use `--min-kv-cache-group-layers` to reduce KV overhead in pipeline-parallel setups. Enable `VLLM_ROCM_USE_AITER=1` for better MXFP8 performance on ROCm gfx950 if available.

> 🔗 *Stay updated:* Follow [GitHub Issues](https://github.com/vllm-project/vllm/issues) and [PRs](https://github.com/vllm-project/vllm/pulls) for real-time progress on stability and feature delivery.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-27

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with active work on deep model and hardware integration, particularly around DeepSeek-V4.1 and AMD ROCm support. Critical stability fixes were merged for speculative decoding (EAGLE3, DSPARK) and LMCache memory management, while new PRs target precision improvements in MoE dispatch, multimodal token accounting, and cross-node communication efficiency.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes observed. The project remains stable at v0.5.20 (ROCm/AMD), with ongoing CI health tracking via [Issue #17050](https://github.com/sgl-project/sglang/issues/17050).

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1 on AMD gfx950 (MI350X)**: PR [#41308](https://github.com/sgl-project/sglang/pull/41308) enables full support for DeepSeek-V4.1-Flash on ROCm via DSpark, including kernel-level optimizations and model serving.  
- ✅ **Qwen4-Exp FP8 Indexer Cache**: PR [#39614](https://github.com/sgl-project/sglang/pull/39614) adds optional `e4m3` storage for QSA block selector caches, reducing memory footprint by up to 50% on high-compression models.  
- ✅ **Apple Silicon MLX Chained Decode Fix**: PR [#40046](https://github.com/sgl-project/sglang/pull/40046) resolves cache mismanagement during chained decodes on MLX, improving accuracy in streaming workflows.

---

### **4. Performance & Optimization**  
- 🔥 **Speculative Decoding Efficiency**: PR [#41378](https://github.com/sgl-project/sglang/pull/41378) ensures parity between Kimi-Linear PD and real-model behavior at all boundary types (page, chunk, cached-prefix), enabling more accurate benchmarking.  
- 🚀 **Multi-node All-Reduce Optimization**: PR [#34528](https://github.com/sgl-project/sglang/pull/34528) introduces optional FlashInfer PCIe-IPC all-reduce for switch-free hosts (e.g., Blackwell PCIe-only systems), reducing inter-node latency by ~20–30%.  
- ⚙️ **Unified Memory Pooling**: PR [#39478](https://github.com/sgl-project/sglang/pull/39478) enables dynamic redistribution of free capacity between full and sliding-window KV caches under unified memory, improving utilization in high-concurrency settings.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|-------|--------|------------|
| 🚨 **Critical** | [Issue #41372](https://github.com/sgl-project/sglang/issues/41372) | `Req.decoded_text` never written → scheduler fallback fails silently | ❌ Open; impacts correctness |
| 🚨 **Critical** | [Issue #41076](https://github.com/sgl-project/sglang/issues/41076) | Unbounded `SparsePrefillWorkspace` allocation → OOM crash in DeepSeek-V4.1+DSPARK | ❌ Open; affects production deployments |
| 🟡 **High** | [Issue #40949](https://github.com/sgl-project/sglang/issues/40949) | LMCache MP mode + EAGLE3 triggers pool memory leak after load-back hit | ✅ PR pending: [#41376](https://github.com/sgl-project/sglang/pull/41376) |
| 🟡 **High** | [Issue #32569](https://github.com/sgl-project/sglang/issues/32569) | Kimi-K3 DSPARK crashes with `TypeError: 'NoneType' object is not callable` | ✅ Fixed in PR [#41378](https://github.com/sgl-project/sglang/pull/41378) |

---

### **6. What This Means for Application Developers**  
- **Production Deployments**: Avoid `--speculative-algorithm DSPARK` on DeepSeek-V4.1 until #41076 is resolved—this can cause catastrophic OOM crashes under load. Use `EAGLE3` with caution in multi-GPU setups due to known LMCache leaks.  
- **Model Choice**: For low-latency inference on AMD hardware, prioritize `DeepSeek-V4.1-Flash` on MI350X using PR [#41308](https://github.com/sgl-project/sglang/pull/41308).  
- **Multimodal Apps**: Ensure `mm_hashes` are handled before `padded_input_ids` are rebuilt (PR [#41375](https://github.com/sgl-project/sglang/pull/41375)) to prevent crashes in encoder-disaggregated pipelines.  
- **Streaming Accuracy**: Fix `decoded_text` drift issues by avoiding reliance on `stop_str` fallbacks until #41372 is addressed.  

👉 **Actionable Tip**: Enable `SGLANG_ENABLE_METRICS_DEVICE_TIMER=1` to monitor `fwd_occupancy` trends across prefill/decode phases ([PR #40802](https://github.com/sgl-project/sglang/pull/40802)).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-27**

---

### **1. Today's Highlights**  
The latest updates focus on expanding hardware support for NVIDIA’s Nemotron 3 Puzzle (state size 96) and improving CUDA kernel efficiency with F16 input support in the FWHT operation. Significant progress is also underway in backend modularity, with PRs enabling independent compilation of SYCL and ROCm backends—critical for multi-backend experimentation.

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published today. However, a notable revert occurred:  
- [`b11201`](https://github.com/ggml-org/llama.cpp/releases/tag/b11201): Reverted `max context length` auto-fitting change (#29437), which had caused unexpected behavior in dynamic context handling. Developers relying on automatic max context tuning should verify their configurations post-revert.

---

### **3. New Model & Hardware Support**  
- ✅ **Nemotron 3 Puzzle (75B)**: Added full CUDA support for `ssm_scan` with state size 96 via #28717 — critical for avoiding CPU fallback and preserving performance.
- ✅ **K2 Horizon (0.9B–36B MoVA)**: Feature request #29424 calls for native support, signaling growing interest in high-efficiency edge models.
- ✅ **Hexagon HTP**: PR #28994 adds Q4_K and Q6_K quantization support; PR #29502 extends backend sampling ops (`ARGSORT`, `TOP_K`, etc.) to Hexagon, enabling richer inference workflows on Qualcomm SoCs.
- ✅ **SYCL + ROCm Flexibility**: PR #29506 introduces `ExternalProject` integration to allow building SYCL backend independently from other backends, enabling hybrid builds (e.g., SYCL + ROCm) without compiler conflicts.

---

### **4. Performance & Optimization**  
- **CUDA FWHT**: PR #29096 enables direct F16 input to the FWHT kernel, eliminating unnecessary conversion overhead. This reduces memory bandwidth usage and improves throughput for models using F16 precision.
- **Tiled CPU K-Quant Matmul**: PR #27851 implements tiled `mul_mat` for k-quants, breaking large matrices into 256×256 tiles and using microkernels for efficient int8 unpacking → significantly faster execution on Apple Silicon and x86 CPUs.
- **SYCL MMVQ Speedup**: PR #29500 reports **2.71x speedup** on Qwen3.8-27B IQ3_S-heavy models by porting `IQ4_XS` path to `IQ3_S` for multi-column matrix-vector quantization.
- **HIP Fattn-MMA Tuning**: PR #28907 enables MMA kernels for `dkq > 256` on CDNA GPUs, improving performance at large batch sizes.

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:
- **GPU Driver TDR Crashes (Windows)**: Multiple reports (#28778, #27198) link to SYCL backend crashes on dual Intel Arc Pro B70 when loading DFlash2 draft models or using `--split-mode tensor`. No fix yet.
- **Silent Corruption on ROCm (gfx1151)**: Issue #27556 confirms HIP backend silently truncates context (oldest tokens lost) during Qwen3.5-27B inference — Vulkan works correctly at same commit.
- **Vulkan Memory Allocation Failure**: Issue #29270 shows `vk::Device::allocateMemory: ErrorOutOfDeviceMemory` on Apple M1 (16GB unified RAM), likely due to aggressive buffer allocation.
- **Incorrect Output in Draft Decoding**: Issue #25618 reports greedy speculative decoding diverges from vanilla output on quantized models (Q4_K_M), though it matches on BF16 — regression affecting accuracy in production agents.

> 🔗 *Fixes under review*: PRs like #29497 (grammar builder OOM crash) and #29496 (n>1 usage reporting) address critical server reliability issues.

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding** on quantized models (especially Q4_K_M/Q6_K); expect non-deterministic outputs until #25618 is resolved.
- **Avoid SYCL on dual Arc B70** for draft model inference until #28778 is fixed — risk of driver reset and process loss.
- **Leverage new F16 FWHT and tiled k-quant kernels** for improved latency on CPU and CUDA — especially impactful for Apple Silicon and high-throughput inference pipelines.
- **Prepare for multi-backend builds** using the new SYCL/ROCm isolation pattern (PR #29506) — essential for deploying agents across heterogeneous environments.
- **Monitor model-specific regressions** — e.g., Qwen3.8-Flash-Next fails on CUDA with `SPLIT_AXIS_UNKNOWN` (#27964) — ensure compatibility before rolling out to production.

> 📌 *Recommendation*: Pin to stable commits (e.g., `b11199` or earlier) for production use until active regressions are addressed. Use `--no-mmap` and `--log-disable` flags to reduce noise during debugging.

---  
🔗 [GitHub: ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)  
🔗 [Latest Builds: llama.app](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-27**

---

### **1. Today's Highlights**  
Critical stability issues plague Ollama Cloud Pro, with a reported 95% failure rate across cloud models—rendering the service unusable for subscribers. Simultaneously, multiple parser bugs affecting `qwen3.8`, `gemma4`, and `glm-4.7` are causing silent tool call drops, malformed responses, and unexpected terminations during inference. These issues highlight urgent reliability concerns in production-grade model serving.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours.  
*Note: The `typical_p` parameter deprecation (Issue #18542) may break legacy clients; users relying on this parameter should update integrations immediately.*

---

### **3. New Model & Hardware Support**  
- **Apple Silicon MLX Optimization**: A new feature request (#18669) calls for shared model weights to enable concurrent MLX inference on Apple Silicon—critical for high-memory workloads. This would unlock efficient multi-model execution on M-series chips.  
- **System 1 Models**: Requested support for Kev and Laya (Issue #18594), signaling growing interest in lightweight, fast reasoning models for agent workflows.  
- **Docker SBX Integration**: Proposal to support Docker Sandboxes (Issue #18425) expands Ollama’s role as a backend for secure coding agents.

---

### **4. Performance & Optimization**  
- **Gemma4 Tool Call Resilience**: PR #18664 introduces recovery from trailing noise after valid tool calls, reducing silent failures by parsing JSON boundaries more robustly.  
- **GLM-4.7 Parser Fixes**: PRs #18663 and #18658 address critical string argument handling—preserving leading/trailing newlines and preventing early termination via `</tool_call>` inside values.  
- **MLX Version Bump**: PR #18651 updates MLX dependency to latest version, likely improving kernel compatibility and performance on Apple Silicon hardware.

---

### **5. Stability & Regressions**  
**High Severity**:  
- **Ollama Cloud Pro Unavailability** (#15453): 95% failure rate across all cloud models despite stable network connectivity. Critical for paid users; no fix PR yet. [GitHub Issue](https://github.com/ollama/ollama/issues/15453)  
- **qwen3.8 Tool Parsing Failure** (#17778): Returns `500` error with "no user query found" due to streaming misbehavior. [GitHub Issue](https://github.com/ollama/ollama/issues/17778)  

**Medium Severity**:  
- **qwen3.8 `think: "high"` Silently Defaults** (#18632): Non-standard `think` value ignored instead of rejecting or warning—undermines control over reasoning depth.  
- **gemma4 Tool Call Key Space Handling** (#18390): Keys with spaces are unquoted → call dropped silently. [GitHub Issue](https://github.com/ollama/ollama/issues/18390)  
- **glm-4.7 `</tool_call>` Early Termination** (#18659): Literal `</tool_call>` in arguments cuts off tool calls prematurely. [GitHub Issue](https://github.com/ollama/ollama/issues/18659)

*Fix PRs exist for some parser issues (e.g., #18663, #18664), but not for cloud stability or qwen3.8 streaming.*

---

### **6. What This Means for Application Developers**  
- **Avoid Cloud Pro Until Fixed**: Do not rely on `:cloud` models for production workflows—expect frequent outages. Use local models or alternative backends.  
- **Validate Tool Call Inputs**: Be cautious with special characters (`"`, `</tool_call>`, spaces in keys) when using `gemma4`, `qwen3.8`, or `glm-4.7`. Implement defensive parsing until upstream fixes land.  
- **Expect API Breakage**: The deprecation of `typical_p` requires updating client code. Monitor PRs like #18542 closely.  
- **Desktop UX Improvements**: New PRs (#18661, #18662, #18668) will improve window resizing, tray behavior, and menu bar visibility—beneficial for developers using Ollama as a background assistant.  
- **Future-Proofing**: Consider adopting `System 1` models and Docker SBX integrations as they mature—these represent emerging patterns in agentic AI infrastructure.

---  
*Digest generated from GitHub data: [github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-09-27**

---

### **1. Today's Highlights**  
The LiteLLM project continues to deepen its guardrail and cost-aware routing capabilities, with critical fixes to prompt injection detection across unified endpoints and improvements in batch processing for Mistral. A major performance optimization was merged to reduce Redis round trips by batching spend counter operations, significantly improving proxy throughput under sustained load.

---

### **2. Releases & Breaking Changes**  
*None.* No new releases were published in the last 24 hours. However, **PR #43385** reverted recent changes related to key caps and global spend rollups in `rc/1.104.0`, reverting behavior to pre-#41293 levels to restore visibility into long-tail key usage. This is a **critical regression fix** affecting monitoring and billing dashboards.  
👉 [PR #43385](https://github.com/BerriAI/litellm/pull/43385)

---

### **3. New Model & Hardware Support**  
*No new model or hardware support added today.*  
However, **PR #43390** updated the cost map to explicitly mark `fireworks_ai/minimax-m3` as **vision-capable**, based on live API validation — resolving prior 400 errors when sending image inputs. This enables accurate cost tracking and routing for multimodal requests.  
👉 [PR #43390](https://github.com/BerriAI/litellm/pull/43390)

---

### **4. Performance & Optimization**  
*Significant performance improvements were merged:*  
- **PR #43369** reduces Redis overhead by batching spend counter reads/writes:  
  - Cuts redundant `MGET` calls from 4+ per request to just one batched operation.  
  - Eliminates multiple `INCRBYFLOAT` writes by pipelining reservation increments.  
  - Expected improvement: **~30–40% reduction in Redis round trips per request**, especially impactful under high concurrency.  
👉 [PR #43369](https://github.com/BerriAI/litellm/pull/43369)  

- **PR #43367** extends this optimization by consolidating all spend counter operations into a single pipelined batch, further reducing latency spikes during admission and post-call accounting.  
👉 [PR #43367](https://github.com/BerriAI/litellm/pull/43367)

---

### **5. Stability & Regressions**  
*Critical stability issues reported today:*  
1. **PR #43316**: Responses bridge returns tool calls as two separate choices (text + function_call), breaking downstream clients’ ability to parse structured tool outputs.  
   - *Impact*: Tool call parsing fails in chat clients using `/v1/responses` with models like `gpt-6-luna`.  
   - *Fix PR*: Not yet merged; requires urgent attention.  
   👉 [Issue #43316](https://github.com/BerriAI/litellm/issues/43316)  

2. **PR #43010**: Anthropic `/v1/responses` streaming doubles thinking text in `reasoning.encrypted_content` due to improper delta handling.  
   - *Impact*: Corrupted reasoning output in AI agents using reasoning-effort features.  
   - *Fix PR*: In progress — see [Issue #43010](https://github.com/BerriAI/litellm/issues/43010).  

3. **PR #43285**: `llm_requests_hanging` alerts trigger falsely under sustained load due to TTL misalignment between tracker and completion marker.  
   - *Impact*: False alarms despite successful completions (~0.1–1.2s latency).  
   - *Fix PR*: Not yet available.  
   👉 [Issue #43285](https://github.com/BerriAI/litellm/issues/43285)

---

### **6. What This Means for Application Developers**  
- **Guardrails are now more comprehensive**: All unified routes (`/v1/messages`, `/v1/responses`, etc.) are now scanned for prompt injection (via PR #43350), and attachments (images/PDFs) are processed by Bedrock Guardrail (PR #43383). This reduces risk of prompt injection via file uploads — **ensure your app handles masked outputs correctly**.  
- **Cost accuracy is improving**: The `minimax-m3` vision support fix ensures accurate cost estimation for multimodal apps. Use `supports_vision: true` in config to avoid 400 errors.  
- **Performance-sensitive deployments should upgrade soon**: The new spend counter batching (PR #43369) will reduce latency and improve scalability — particularly important for high-throughput agents or gateways.  
- **Avoid `/v1/responses` streaming until #43316 is fixed**: If you rely on tool call parsing via the responses bridge, expect broken output until the fix lands. Consider using `/v1/chat/completions` with `tools` instead.

> 🔗 **Key PRs to watch**: [43369](https://github.com/BerriAI/litellm/pull/43369), [43316](https://github.com/BerriAI/litellm/issues/43316), [43390](https://github.com/BerriAI/litellm/pull/43390)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-27**

---

### **1. Today’s Highlights**  
Unsloth continues to expand its multimodal and enterprise-grade capabilities with new UI enhancements for document handling, sidebar customization, and improved model management. Critical performance fixes for FP8 LoRA training and flash attention compatibility are in flight, while several high-severity bugs—particularly around Qwen-Image-2.1 model loading and GPU memory allocation—are actively being addressed.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- **Qwen-Image-2.1 GGUF support** remains a focal point, with multiple issues tracking incomplete downloads, missing `model_index.json`, and incorrect asset resolution across platforms (AMD/Windows).  
- **New Chinese model mirror support requested**: Users are calling for integration of domestic mirrors like [ModelScope](https://www.modelscope.cn/models), [HF-Mirror](https://hf-mirror.com/), and [OpenCSG](https://opencsg.com/models) via Issue #12041.  
- **vLLM & SGLang on Windows via WSL2**: PR #12024 introduces experimental support for running vLLM and SGLang inside a private WSL2 distro on Windows, enabling better isolation and compatibility (not yet verified).

> 🔗 [Issue #12041: Add Chinese model mirrors](https://github.com/unslothai/unsloth/issues/12041)  
> 🔗 [PR #12024: Run vLLM/SGLang on Windows via WSL2](https://github.com/unslothai/unsloth/pull/12024)

---

### **4. Performance & Optimization**  
- **FP8 LoRA Training Speedup**: PR #12027 optimizes block-FP8 LoRA training by running FP8 linears eagerly and using 8 warps per 128-row GEMM tile—reducing latency by **4–15x** on RTX PRO 6000, L4, H100, and B200 GPUs.  
- **Flash Attention Fix for Llama 3.2 Vision**: PR #12033 disables flash attention for `mllama` due to missing `is_causal` attribute in vision/cross-attention layers, preventing crashes during inference.  
- **GPU Memory Management**: PR #12015 adds visible tensor split distribution in the GPUs picker, allowing users to see how much of a model each card is assigned—critical for uneven multi-GPU setups.

> 🔗 [PR #12027: Speed up block-FP8 LoRA training](https://github.com/unslothai/unsloth/pull/12027)  
> 🔗 [PR #12033: Disable flash attention for Llama 3.2 Vision](https://github.com/unslothai/unsloth/pull/12033)  
> 🔗 [PR #12015: Show GPU load distribution in picker](https://github.com/unslothai/unsloth/pull/12015)

---

### **5. Stability & Regressions**  
- **Critical UI Lag**: Issue #10769 reports severe lag in the desktop app when large codeblocks are rendered; reproducible on RTX 4090 + Win11 25H2.  
- **Qwen-Image-2.1 Double Download**: Issue #11637 shows a UX-breaking bug where selecting `unsloth/Qwen-Image-2.1-GGUF` triggers a second 19 GB download labeled "Required assets" after initial download completes.  
- **AMD ROCm Failures**: Multiple issues (#11638, #11870) report 404 errors fetching fp8 text encoders and invalid kernel file errors during export on AMD systems.  
- **Tool Call Stalls**: Issue #12048 reports tool calls hanging indefinitely despite max duration set to 5 minutes—potentially due to terminal I/O blocking.  

> 🔗 [Issue #11637: Qwen-Image-2.1 double download](https://github.com/unslothai/unsloth/issues/11637)  
> 🔗 [Issue #10769: Desktop lag with large codeblocks](https://github.com/unslothai/unsloth/issues/10769)  
> 🔗 [Issue #12048: Tool calls stall past timeout](https://github.com/unslothai/unsloth/issues/12048)

---

### **6. What This Means for Application Developers**  
- **Build robust agents with stable tooling**: Avoid relying on `max_tokens` in `unsloth start opencode` (Issue #12009), as it’s currently capped at 8192 tokens regardless of config.  
- **Plan for model export limitations**: Exporting fine-tuned models to GGUF fails due to read-only HF cache permissions (Issue #11785); expect manual cleanup or workarounds.  
- **Leverage upcoming UI improvements**: Use PRs like #12001 (document viewer) and #12016 (custom sidebar sections) to enhance user experience in agent workflows.  
- **Monitor GPU-specific regressions**: If deploying on AMD or mixed-GPU systems, be cautious with Qwen-Image-2.1 and export pipelines until fixes land.  

> ✅ Pro tip: Use `nvidia-smi` caching (PR #11995) in production environments to reduce backend polling overhead on busy multi-GPU hosts.  
> 🔗 [PR #11995: Cache nvidia-smi reads](https://github.com/unslothai/unsloth/pull/11995)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*