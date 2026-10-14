# AI Infrastructure Digest 2026-10-14

> Generated: 2026-10-14 01:21 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-14**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *high specialization and hardware convergence*, with projects increasingly diverging in focus: vLLM and SGLang leading in high-throughput, low-latency distributed inference for next-gen models (e.g., DeepSeek-V4, Qwen3.8), while llama.cpp and Unsloth prioritize edge efficiency and local runtime performance. LiteLLM consolidates as the dominant gateway layer, enabling multi-provider routing and cost-aware orchestration. Critical infrastructure gaps—especially around stability on new hardware (Blackwell SM120, AMD MI355X) and model-specific regressions—are emerging, signaling that performance gains are outpacing reliability maturity.

---

### **2. Activity Comparison**  

| Project       | Issues Open (↑) | PRs Merged (↑) | Release Status         |
|---------------|------------------|------------------|------------------------|
| **vLLM**      | 187 (+9)         | 12 (+3)          | No new release         |
| **SGLang**    | 234 (+11)        | 8 (+5)           | No new release         |
| **llama.cpp** | 152 (+6)         | 10 (+4)          | Patch fixes; `b11604+` |
| **Ollama**    | 211 (+13)        | 5 (+2)           | v0.40.3–v0.40.4 pending |
| **LiteLLM**   | 178 (+8)         | 7 (+3)           | `v1.106.0-rc.2` released |

> 🔍 *Trend*: Ollama and SGLang show highest issue growth, indicating active deployment push and instability feedback loops. vLLM remains most stable but faces deep architectural challenges (MoE, CUDA graphs). LiteLLM leads in release velocity with security-focused updates.

---

### **3. Model Support Race**  

| New Model / Architecture       | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|----------------------------------|------|--------|-----------|--------|---------|
| **Qwen3.8-Flash-Next**          | ✅ (#59575) | ✅ (`#39724`) | ❌ | ❌ | ❌ |
| **DeepSeek-V4.1-Flash**         | ⚠️ (SM120 support in progress) | ✅ (8× RTX PRO 6000) | ❌ | ❌ | ❌ |
| **Kimi-K3 / K2 Horizon MoE**    | ✅ (PR #57149) | ✅ (PR #38344) | ❌ | ❌ | ❌ |
| **MiniCPM-V4.7**                | ❌ (Issue #48449) | ❌ | ✅ (PR #29416) | ❌ (#18983) | ❌ |
| **GLM-5.3-Flash**               | ⚠️ (ROCm prefix cache corruption) | ✅ (PCP support) | ⚠️ (`fa4` crash) | 🔴 (Degeneration: #18980) | ❌ |
| **Gemini-4-Argon**              | ❌ | ❌ | ❌ | ❌ | ✅ (`continuationToken`) |
| **OpenInfer Provider**          | ❌ | ❌ | ❌ | ❌ | ✅ |

> 🏁 **Leader**: **SGLang** leads in real-world production support for large models (DeepSeek-V4.1-Flash, GLM-5.3-Flash), particularly on PCIe-only multi-GPU setups. **LiteLLM** wins in API-level model innovation (Gemini auto-continuation, video gen).

---

### **4. Performance Frontier**  

| Focus Area             | vLLM                          | SGLang                        | llama.cpp                   | Ollama                     | LiteLLM                    |
|------------------------|-------------------------------|-------------------------------|-----------------------------|----------------------------|----------------------------|
| **KV Cache Efficiency** | ✅ Heterogeneous-vocab speculative decoding (MRV2) | ⚠️ Stale KV in HiCache PD | ❌ Vulkan device loss       | ❌ `glm-5.3-flash:cloud` degeneration | ❌ MCP tool token counter crash |
| **Batching & Parallelism** | ✅ Speculative decoding, PLE pinning | ✅ Prefill CP expansion, DCP | ⚠️ FlashAttention regression | ❌ Thread scheduling ignores cgroup | ❌ `complexity_router` overrides `max_tokens` |
| **Quantization**       | ✅ FP8 Triton, NVFP4, W4A4     | ✅ `--fp4-gemm-backend marlin` | ✅ SME2 Q4_K/Q6_K, Hexagon power modes | ❌ Quantization not highlighted | ❌ No quantization focus |
| **Distributed Serving** | ✅ MRV2, hybrid SSM/GDN PD disaggregation | ✅ HiCache disaggregation, DCP | ❌ Local only | ❌ No distributed support | ✅ Multi-provider routing (OpenInfer, Bedrock) |
| **Kernel Optimization** | ✅ DeepGEMM MegaMoE, ROCm FP8 tuning | ✅ Monokernel RFC, BCG auto-enable | ✅ Vulkan subgroup pooling | ❌ MLX/Metal static_assert crash | ❌ Not core focus |

> 🔥 **Hot Zones**:  
> - **vLLM/SGLang**: Optimizing speculative decoding and distributed inference at scale.  
> - **llama.cpp**: Edge efficiency via ARM/Hexagon/NPU support and lightweight kernels.  
> - **LiteLLM**: Telemetry and cost tracking for observability in complex environments.

---

### **5. Layer Positioning**  

| Project       | Primary Layer                 | Key Differentiators                                  |
|---------------|-------------------------------|-------------------------------------------------------|
| **vLLM**      | **High-Performance Serving Engine** | GPU-optimized kernels, MoE specialization, MRV2 architecture |
| **SGLang**    | **High-Throughput Inference Stack** | Prefill CP, HiCache disaggregation, PCP/DCP for large models |
| **llama.cpp** | **Local Runtime & Edge Inference** | WebGPU/Vulkan/Hexagon support, low-footprint design |
| **Ollama**    | **Agent & Cloud Integration Gateway** | `ollama launch`, Wirken integration, cloud model lifecycle |
| **LiteLLM**   | **Multi-Provider API Gateway** | Cost tracking, telemetry aggregation, proxy security |

> 📊 **Positioning Insight**:  
> - **vLLM/SGLang** are building the backbone for large-scale LLM deployments.  
> - **llama.cpp** dominates lightweight, cross-platform inference.  
> - **Ollama/LiteLLM** serve as application-layer glue — Ollama for agent workflows, LiteLLM for observability and spend control.

---

### **6. Trend Signals**  

#### **Industry Trends Extracted from Today’s Activity:**  
1. **Hardware Specialization is Accelerating**: Projects are racing to support **AMD MI355X**, **Blackwell (SM120)**, and **Snapdragon X Elite NPU** — signaling a shift toward heterogeneous compute beyond NVIDIA.  
2. **Speculative Decoding is Maturing**: vLLM and SGLang are now enabling **heterogeneous-vocab draft models** and **prefill context parallelism**, pushing the envelope on throughput.  
3. **Stability is the New Bottleneck**: Despite performance leaps, **regressions in prefix caching (GLM-5.3/ROCm)**, **CUDA crashes (Ollama)**, and **token counting failures (LiteLLM)** indicate growing complexity in large-model deployment.  
4. **Agent Orchestration is Central**: Ollama’s integration with **Wirken** and LiteLLM’s **MCP tooling** reflect a pivot toward secure, auditable agent systems — not just model serving.  
5. **Security & Observability Are Non-Negotiable**: LiteLLM’s **cosign-signed images** and **aggregated telemetry sinks** show that production-grade infra must include trust-by-design and audit trails.

#### **What Application Developers Should Watch:**  
- **Avoid `glm-5.3-flash:cloud`** until Ollama resolves #18980 — output degeneration risks data integrity.  
- **Pin to `v0.29.0` or earlier in vLLM** if using fully-sharded LoRAs or speculative decoding — known deadlock risk.  
- **Upgrade to `b11604+` in llama.cpp** to prevent stack overflow crashes under load.  
- **Leverage LiteLLM’s telemetry** for air-gapped or regulated environments — it’s one of the few tools with privacy-preserving observability.  
- **Monitor SGLang’s monokernel RFC** — this could redefine how kernel dispatch is handled in future inference engines.

> ✅ **Final Takeaway**: The AI infrastructure landscape is no longer about raw speed — it's about **reliability, security, and composability**. Choose your stack based on whether you’re deploying at scale (vLLM/SGLang), on-device (llama.cpp), or building agents (Ollama/LiteLLM).

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-14

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate support for next-generation models and hardware, with critical fixes for speculative decoding on Model Runner V2 (MRV2) and robust improvements in ROCm/AMD backend performance for Qwen3.8 and Kimi K3. A major PR unifies DeepGEMM MegaMoE experts under a single abstraction, streamlining MoE inference across DeepSeek-V4, Kimi-K3, and future variants.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were merged or announced today.

---

### **3. New Model & Hardware Support**  
- **SM8x (Ampere: A100/A800/RTX 30xx)**: Feature request #50576 seeks full support for `DeepSeek-V4-Flash` and `DeepSeek-V4-Flash-0731` on SM8x — currently blocked by missing kernel compatibility.  
- **ROCm / AMD MI355X**: Active optimization efforts underway for `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` (#57149) and `Qwen3.8-Flash-Next` (#59575), targeting gfx950 architecture.  
- **Intel XPU (MLA)**: PR #58297 integrates XPU MLA support into the existing `FLASH_ATTN_MLA` backend, enabling hybrid model execution on Intel GPUs.  
- **Hybrid SSM/GDN Models**: Ongoing work to enable PD disaggregation and KV transfer for models like `Qwen3.5-397B-A17B-W8A8` (#43765).  

> 🔗 [Issue #50576](https://github.com/vllm-project/vllm/issues/50576) | [PR #58297](https://github.com/vllm-project/vllm/pull/58297)

---

### **4. Performance & Optimization**  
- **ROCm Performance**: PR #61091 introduces native per-token FP8 Triton linear backend tuned for RDNA4 (Radeon AI PRO R9700), improving dynamic scaling efficiency.  
- **Speculative Decoding**: PRs #59260 and #59468 optimize kernel warmup and slot reservation, eliminating early-request stalls and reducing scheduler overhead.  
- **KV Cache Efficiency**: PR #61536 enables heterogeneous-vocab draft models (TLI) on MRV2, expanding speculative decoding use cases.  
- **Memory Footprint**: PR #59848 pins offloaded PLE tables at exact size, reducing host memory usage from ~65 GiB to ~47.8 GiB per rank on GB10.  

> 🔗 [PR #61091](https://github.com/vllm-project/vllm/pull/61091) | [PR #59848](https://github.com/vllm-project/vllm/pull/59848)

---

### **5. Stability & Regressions**  
- **CUDA Graph Deadlock**: PR #60845 reports intermittent deadlock during fused-MoE LoRA serving with `--fully-sharded-loras`, affecting TP=2/4 setups. *No fix yet*, but actively tracked.  
- **GLM-5.3 Prefix Caching Corruption**: Issue #54359 confirms silent KV cache overwrites on ROCm due to mismatched block sizes; model output remains fluent but long-context recall degrades.  
- **Inkling-Small-NVFP4 Crash on SM120**: Issue #51405 reveals missing paged-KV support in `tml_fa4` kernel, blocking deployment on Blackwell (SM120).  
- **MiniCPM-V-4.6 Load Failure**: Issue #48449 persists in vLLM 0.25.0+ due to unrecognized `qkqkv_proj` module name.  
- **vLLM OpenAI Image Startup Failure**: Issue #60406 shows `vllm/vllm-openai:v0.31.0-cu129` fails to start due to CUDA 13 dependency conflict with bundled torchcodec 0.17.0.  

> 🔗 [Issue #60845](https://github.com/vllm-project/vllm/issues/60845) | [Issue #54359](https://github.com/vllm-project/vllm/issues/54359) | [PR #60406](https://github.com/vllm-project/vllm/pull/60406)

---

### **6. What This Means for Application Developers**  
- **Use MRV2 with caution**: If deploying speculative decoding with heterogeneous vocab or fully-sharded LoRAs, expect potential deadlocks or crashes — monitor for known issues.  
- **AMD users**: Expect significant performance gains on MI355X with upcoming Qwen3.8 optimizations; test with `--linear-backend triton` for FP8 scalability.  
- **Hybrid models (SSM/GDN)**: PD disaggregation support is still experimental; avoid production use until #43765 lands.  
- **Long-context apps**: Be wary of prefix caching corruption on GLM-5.3/ROCm and consider disabling if accuracy is critical.  
- **Deployment stability**: Pin to `v0.29.0` or earlier unless you’re prepared to handle recent regressions (e.g., MiniCPM, Inkling, TorchCodec).  

> ✅ Pro Tip: Use `collect_env.py` and report environment details when filing bugs — it accelerates triage.

---  
*Digest compiled from GitHub activity: [vllm-project/vllm](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-14**

---

### **1. Today's Highlights**  
The SGLang project continues advancing its high-throughput, low-latency inference infrastructure with key progress in **prefill context parallelism (PCP)** and **HiCache disaggregation**, particularly for DeepSeek-V4.1 and GLM-5.3-Flash on SM120 hardware. Critical CI stability issues are under active investigation, including flaky tests and infrastructure failures impacting PR validation workflows.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes reported in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash**: Successfully deployed in production on **8× RTX PRO 6000 (SM120, PCIe-only)** — field report confirms working config with measured throughput and speculative decoding A/B testing ([#40877](https://github.com/sgl-project/sglang/issues/40877)).  
- ✅ **GLM-5.3-Flash**: Full support for PCP across attention backends (Trtllm MHA now complete), with ongoing efforts to stabilize `fa4` backend on SM120 ([#42012](https://github.com/sgl-project/sglang/issues/42012)).  
- ✅ **AMD ROCm Support**: Expanded DCP (Decode Context Parallel) support for **GLM-5 / DeepSeek-V3.2** on AMD GPUs ([#42618](https://github.com/sgl-project/sglang/pull/42618)).  
- ✅ **T-Head SAIL**: Roadmap initiated for first-class integration of Zhenwu 810/810E/M890P cards ([#37519](https://github.com/sgl-project/sglang/issues/37519)).

---

### **4. Performance & Optimization**  
- ⚡ **Weight Cache Daemon (Phase 1)**: Achieved **sub-1s weight load time** for Qwen3-235B FP8 (down from ~306–327s), enabling fast engine recovery via per-rank CUDA IPC daemon ([#33522](https://github.com/sgl-project/sglang/issues/33522)).  
- 🔁 **Prefill CP Expansion**: Progress on FlashInfer backend integration for PCP (`#33226`) and model support for **Qwen3.8-Flash-Next** (`#39724`) and **Kimi-K3** (`#38344`).  
- 📈 **BCG Auto-enable**: Automatic breakable CUDA graph (BCG) selection for supported prefill CP configurations now in development (`#44022`).  
- 💡 **Monokernel RFC**: Proposal for monokernels as a plugin framework to unify kernel dispatch and improve runtime safety and performance (`#43949`).

---

### **5. Stability & Regressions**  
- 🔥 **Critical Crash**: `fa4` attention backend crashes during CUDA-graph capture on **GLM-5.3-Flash** (SM120), forcing reliance on Triton only ([#42012](https://github.com/sgl-project/sglang/issues/42012)).  
- 🔥 **Stale KV in PD Disaggregation**: Early cached-prefix send can trigger **silent stale KV transfer** during decode when HiCache restore is incomplete (`#44070`), risking incorrect outputs.  
- 🔥 **NVFP4 W4A4 Crash**: `--fp4-gemm-backend marlin` fails on SM100 due to missing 'marlin' backend in `mm_fp4` kernel (`#43988`).  
- ⚠️ **Incorrect Token Counting**: `bench_serving --dataset-name openai` miscounts prompts as 2 tokens each (due to Transformers v5 tokenization mismatch) (`#43929`).  
- ⚠️ **Native gRPC Generate Limitation**: Output capped at 128 tokens if `max_new_tokens` is unset (`#44121`).  
> *Fix PRs exist for some issues (e.g., #44070 pending review); others remain open with no fix proposed yet.*

---

### **6. What This Means for Application Developers**  
- **Deployments on PCIe-only multi-GPU setups (e.g., 8x RTX PRO 6000)** are now viable for large models like DeepSeek-V4.1-Flash — leverage `SGLANG_DISAGG_PREFILL_EARLY_SEND_CACHED_PREFIX=1` cautiously to avoid stale KV bugs.  
- **Use `--dcp-size`** to reduce memory overhead in MLA models on both NVIDIA and AMD GPUs — DCP support is maturing rapidly.  
- **Avoid `fa4` backend** on GLM-5.3-Flash until fix lands; use **Triton** as fallback.  
- **Monitor `max_new_tokens` setting** in gRPC APIs to prevent silent truncation.  
- **For advanced optimization**, consider contributing to the **monokernel RFC** (`#43949`) or **KVPress integration** (`#10585`) to explore next-gen cache compression and routing strategies.  

> 🔗 [GitHub Issues Dashboard](https://github.com/sgl-project/sglang/issues) | [Slack Community](https://slack.sglang.io)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-14**

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes for the WebGPU and server backends, including a stack overflow crash in `std::regex_replace` during prompt processing that could crash the HTTP thread under high load. A key optimization was introduced in Vulkan to improve large pooling window performance by leveraging full subgroup computation. Additionally, the chat output format has been refactored to use an array of parts instead of a single string, enabling future selective token parsing.

---

### **2. Releases & Breaking Changes**  
- **WebGPU**: Fixed `mul_mat_id` behavior when expert IDs are duplicated (#30451), removing an assumption that tokens would never select the same expert twice — this may affect custom MoE routing logic.  
  🔗 [PR #30451](https://github.com/ggml-org/llama.cpp/pull/30451)  
- **Server**: Patched a severe stack overflow in `std::regex_replace` used to escape special tokens like `<|name|>` — now uses safe string escaping to prevent thread stack exhaustion.  
  🔗 [PR #30243](https://github.com/ggml-org/llama.cpp/pull/30243)  
- **Chat Output**: Introduced structured output as an array of "parts" (e.g., text, tool calls) instead of a flat string, enabling more granular control over token handling in downstream apps.  
  🔗 [PR #30389](https://github.com/ggml-org/llama.cpp/pull/30389)

> ⚠️ **Migration Note**: Apps relying on raw string output from `chat` will need to adapt to handle the new `parts` structure.

---

### **3. New Model & Hardware Support**  
- **Model Support**: Added support for **Qwen4exp**, including proper padding for expert projection width mismatches and 64-bit array metadata handling. Also added support for **MiniCPM-V 4.7** with 3D RoPE.  
  🔗 [PR #30316](https://github.com/ggml-org/llama.cpp/pull/30316), [PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416)  
- **Hardware Backends**:  
  - **Hexagon**: Added configurable HTP DCVS/HMX power mode via `--hex-power-mode`.  
    🔗 [PR #30423](https://github.com/ggml-org/llama.cpp/pull/30423)  
  - **Vulkan**: Intel Flash Attention kernel for prefill added for improved performance on Intel GPUs.  
    🔗 [PR #29357](https://github.com/ggml-org/llama.cpp/pull/29357)  
- **Quantization**: Added **SME2 Q4_K and Q6_K** matmul support for improved efficiency on ARM-based accelerators.  
  🔗 [PR #29219](https://github.com/ggml-org/llama.cpp/pull/29219)

---

### **4. Performance & Optimization**  
- **Vulkan**: Optimized `pool_2d` for large pooling windows by using whole subgroups per output, reducing kernel launch overhead and improving throughput on RDNA3 and newer.  
  🔗 [PR #30119](https://github.com/ggml-org/llama.cpp/pull/30119)  
- **SYCL**: Addressed memory errors in `mul_mat`, split buffer, and host pool operations; also fixed compiler warnings (missing prototypes, dead code).  
  🔗 [PR #29889](https://github.com/ggml-org/llama.cpp/pull/29889), [PR #30271](https://github.com/ggml-org/llama.cpp/pull/30271)  
- **Meta Backend**: Now recreates all subgraphs upon arena reallocation, preventing stale graph references and potential crashes.  
  🔗 [PR #30453](https://github.com/ggml-org/llama.cpp/pull/30453)

> 📈 **Expected Impact**: Up to 2x improvement in long-context inference speed on Vulkan with large pooling kernels; better memory safety across multi-backend workflows.

---

### **5. Stability & Regressions**  
- **Critical Crash**: `llama-server` can crash due to stack overflow in `std::regex_replace` when handling prompts with very long names (e.g., d1-omni, kev models). Fixed in #30243.  
  🔗 [Issue #30243](https://github.com/ggml-org/llama.cpp/issues/30243)  
- **Vulkan Device Loss**: `decode() failed: vk::Queue::submit: ErrorDeviceLost` reported on AMD Strix Halo (gfx1151) with long contexts and high `ubatch`.  
  🔗 [Issue #30010](https://github.com/ggml-org/llama.cpp/issues/30010)  
- **Flash Attention Regression**: On Intel Arc B580, FA fallback to SCALAR path causes O(N²) PP degradation and device loss.  
  🔗 [Issue #27638](https://github.com/ggml-org/llama.cpp/issues/27638)  
- **OpenVINO Crash**: `STATUS_ILLEGAL_INSTRUCTION` due to AVX-512 misalignment on Core Ultra 7 265k.  
  🔗 [Issue #28726](https://github.com/ggml-org/llama.cpp/issues/28726)  

> ✅ **Fixes Available**: Most issues have PRs open or merged (e.g., #30243, #29357). Users should update to build `b11604+`.

---

### **6. What This Means for Application Developers**  
- **Adopt Structured Chat Output**: Begin migrating from `output_string` to `parts` array for better control over tool calls, special tokens, and streaming. This enables safer JSON schema validation and grammar generation.  
  🔗 [PR #30389](https://github.com/ggml-org/llama.cpp/pull/30389)  
- **Avoid Long Prompt Names**: If using `d1-omni` or `kev` models, ensure prompt content doesn’t contain extremely long `<|name|>` fields — the fix is already in place, but older builds remain vulnerable.  
- **Leverage New Quantizations**: Use **SME2 Q4_K/Q6_K** on ARM devices (e.g., Apple Silicon, Hexagon) for better latency and energy efficiency.  
- **Monitor Vulkan/Intel Performance**: If deploying on Intel Arc GPUs, verify Flash Attention is enabled (`--flash-attn`) and avoid `ubatch > 128` in long-context scenarios until #30010 is resolved.  
- **Manage Cache RAM Carefully**: The `--cache-ram` limit is now strictly enforced (fix in #25070), so avoid setting it too low if you rely on prompt caching.

> 🛠️ **Recommendation**: Update to `b11604` or later immediately to avoid known crashes and benefit from stability improvements.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-14**

---

### **1. Today's Highlights**  
Ollama continues to expand its agent and cloud integration ecosystem, with new support for **Wirken**, an open-source agent gateway, now proposed via `ollama launch`. Critical stability fixes were merged for **MLX on Apple M5** (PR #14604), resolving a static_assert crash that blocked Metal backend use. Meanwhile, performance regressions are under investigation—users report up to **30% lower throughput** across models since v0.40.3, while others observe severe output degeneration in `glm-5.3-flash:cloud` post-October 12.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
- **Pending**: PR #18985 (fix: allow free-tier usage of PAYG models) and PR #18986 (clarify cloud payment errors) aim to improve UX for Ollama Cloud users.  
- **Documentation**: PRs #18972 and #18981 restructure cloud docs and standardize terminology (e.g., "Ollama’s cloud"), improving discoverability and consistency.  
- **Model creation**: PR #18990 ensures empty `SYSTEM ""` prompts are respected during model creation, preventing unintended system prompt inheritance.

---

### **3. New Model & Hardware Support**  
- **Hardware**:  
  - **Snapdragon X Elite NPU & GPU**: Feature request #5360 (68 👍) calls for native ARM/NPU support on Windows AIPC devices—critical for on-device LLM inference.  
  - **Blackwell RTX 5060 Ti / 5070 Ti**: Issue #18232 identifies a CUDA crash tied to Flash Attention MMA kernel memory allocation via `num_ctx`; root cause confirmed, awaiting fix.  
- **Models**:  
  - **K2 Horizon family** (0.9B–36B MoE): Requested in #18698 (6 👍) with official GGUFs from MBZUAI IFM; includes support for `k2-horizon` architecture.  
  - **MiniCPM-V4.7:35b-a3b**: Fails on Windows due to unknown projector type (`minicpmv4_7`) — issue #18983 indicates CLIP model loading failure.  

---

### **4. Performance & Optimization**  
- **Performance Regression**: Users report **25–30% drop in tokens/sec** across all models since v0.40.3 (Issue #18968). Benchmark logs suggest systemic slowdowns not tied to specific hardware.  
- **CUDA/MLX Optimizations**:  
  - PR #18993 bumps MLX version; however, this worsens thinking loops in qwen3.5 models (noted in PR description).  
  - PR #17956 deduplicates CUDA runtime payloads, reducing binary size and improving load time.  
- **Thread Scheduling**: Issue #17916 reveals Ollama ignores cgroup CPU quotas, leading to **~45x throughput collapse** in CPU-limited containers due to excessive thread spawning.  
- **Memory Efficiency**: PR #17956 also improves runtime path discovery for CUDA/MLX dependencies, enhancing process isolation.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Status |
|---------|-------|-------------|--------|
| 🔴 High | #18980 | `glm-5.3-flash:cloud` exhibits **massive degeneration** (repeating "the = the =") starting Oct 12 — suspected host-side data corruption (probe2.img zeros). | Open |
| 🔴 High | #18983 | `openbmb/minicpm-v4.7:35b-a3b` fails with `unknown projector type: minicpmv4_7` on Windows (0.40.3). | Open |
| 🟡 Medium | #18796 | `ollama run` hangs indefinitely on second invocation (Raspberry Pi 5, Debian 13, systemd service). | Open |
| 🟡 Medium | #18944 | Tool calls fail when `format: json` is set — model either hallucinates or refuses to invoke tools. | Open |
| 🟡 Medium | #17380 / #18232 | Intermittent **CUDA error: shared object initialization failed** on Windows (RTX 5070 Ti / Blackwell GPUs); linked to Flash Attention kernel memory allocation. | Open |

> ✅ **Fixes in progress**: PR #14604 resolves M5 Metal crash (static_assert). No active PRs yet for other high-severity issues.

---

### **6. What This Means for Application Developers**  
- **Agent Integration**: The addition of **Wirken** via `ollama launch` (PR #18989) enables secure, audited agent workflows with encrypted credential vaults and sandboxed tool execution—ideal for production agent systems.  
- **Cloud Model Usage**: Be cautious with **PAYG models**—free users may still be blocked by incorrect error handling (PR #18985 pending). Clarified error messaging (PR #18986) will help avoid confusion.  
- **Stability Risks**: Avoid `glm-5.3-flash:cloud` until #18980 is resolved; consider reverting to v0.40.1 if performance is critical.  
- **System Design**: If deploying in containers, explicitly limit CPU threads via `n_threads` or cgroups—Ollama currently ignores `cpu.max` (Issue #17916).  
- **Model Customization**: Use `SYSTEM ""` in Modelfiles to override base system prompts (PR #18990), and disable `thinking` for small models (PR #18991) to prevent loops.

👉 *Follow*: [Ollama GitHub](https://github.com/ollama/ollama) for real-time updates on regressions and feature rollouts.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-10-14**

---

### **1. Today's Highlights**  
The latest release, `v1.106.0-rc.2`, introduces enhanced security via cosign-signed Docker images and addresses critical stability issues in MCP tool handling, cost tracking, and model routing. Key PRs include automatic continuation for Gemini-4-Argon long decodes and improved telemetry for air-gapped environments, signaling a focus on production reliability and observability.

---

### **2. Releases & Breaking Changes**  
- **`v1.106.0-rc.2`** released with **cosign image signing** enforced across all Docker tags. All releases are signed using the same key introduced in [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
- **Security Fix**: `fix(proxy): hide project creation database errors` ([PR #46330](https://github.com/BerriAI/litellm/pull/46330)) now returns generic 500s instead of exposing raw DB stacktraces.  
- **Telemetry Improvements**: New `AggregatingSink`, `Report`, and `HttpExporter` components ([PRs #45487–#45490](https://github.com/BerriAI/litellm/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3Adevin-ai-integration%5Bbot%5D+telemetry)) enable scalable, privacy-aware proxy telemetry — including admin UI navigation tracking.

---

### **3. New Model & Hardware Support**  
- ✅ **Gemini-4-Argon Auto-Continuation**: PR [#46240](https://github.com/BerriAI/litellm/pull/46240) enables automatic resumption of long outputs using `continuationToken`, removing truncation at 32K tokens per call.  
- ✅ **MiniMax Video Generation**: Added support for `minimax/h3` and `h3-max` via `/v1/videos` ([PR #43705](https://github.com/BerriAI/litellm/pull/43705)), including pricing and lifecycle management.  
- ✅ **OpenInfer Provider**: Now natively supported as an OpenAI-compatible backend ([PR #41034](https://github.com/BerriAI/litellm/pull/41034)), enabling spend tracking and routing for self-hosted deployments.

---

### **4. Performance & Optimization**  
- **Telemetry Scalability**: The new `AggregatingSink` reduces per-request telemetry overhead by folding events into fixed-bucket histograms and token-summed rows ([PR #45487](https://github.com/BerriAI/litellm/pull/45487)).  
- **Cost Accuracy**: Fixed mispricing of Bedrock cross-region inference profiles by aligning cost calculation with deployment-level rates ([PR #46288](https://github.com/BerriAI/litellm/pull/46288)).  
- **Latency Mitigation**: `complexity_router` now respects caller-provided `max_tokens` instead of overriding it with tier ceilings ([Issue #44869](https://github.com/BerriAI/litellm/issues/44869), feature request).

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR | Notes |
|------|----------|--------|--------|-------|
| [Bug: LiteLLMProxy shows blank models to users](https://github.com/BerriAI/litellm/issues/17475) | 🔴 High | Open | N/A | Affects team visibility; admin-only access restored after update |
| [Bug: MCP tool pin ignores `outputSchema`/`readOnlyHint`](https://github.com/BerriAI/litellm/issues/44093) | 🟡 Medium | Open | N/A | Risk of destructive drift without alert |
| [Bug: `token_counter` crashes on array tools missing `items`](https://github.com/BerriAI/litellm/issues/46052) | 🔴 High | Open | N/A | Causes 500s on `count_tokens`; affects MCP integrations |
| [Bug: OpenRouter streaming reports wrong model name](https://github.com/BerriAI/litellm/issues/46095) | 🟡 Medium | Open | N/A | Misleading logs; impacts tracing and monitoring |
| [Bug: `ModuleNotFoundError: No module named 'mcp'`](https://github.com/BerriAI/litellm/issues/46045) | 🔴 High | Open | N/A | Blocks installation in clean environments |

> ⚠️ Multiple regressions in MCP tooling, cost logic, and authentication flow indicate ongoing complexity in multi-provider routing.

---

### **6. What This Means for Application Developers**  
- **Use `v1.106.0-rc.2`** for improved security (signed containers) and better error handling in production proxies.  
- **Avoid `bedrock_mantle/us.openai.gpt-6.1-sol`** until PR #46247 is resolved — currently returns empty responses.  
- **Leverage new telemetry features** if operating in regulated or air-gapped environments — data can be aggregated locally and exported securely.  
- **Validate MCP tool schemas carefully**: Tools with `type: array` but no `items` will crash `token_counter`. Use schema validation pre-flight.  
- **Expect future updates** around cost transparency, especially for cross-region Bedrock and Azure AI models — `azure_ai/claude-fable-5-5` was removed due to non-existence ([PR #46332](https://github.com/BerriAI/litellm/pull/46332)).

👉 **Recommendation**: Monitor GitHub for fixes to MCP and cost-related bugs before deploying in mission-critical agent systems.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-14**

#### **1. Today's Highlights**  
The v0.1.907-beta release delivers major performance improvements across the board, with up to **10x faster UI/UX responsiveness** and **5x faster inference** due to enhanced caching (95% hit rate), MoE Strata-style optimizations, and critical slowdown fixes. New compaction improvements now apply uniformly across all APIs and enhance browser-based workflows.

#### **2. Releases & Breaking Changes**  
- **v0.1.907-beta**: Released today with significant performance gains and broader browser support. No breaking changes reported; backward compatibility maintained for existing workflows.  
  🔗 [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.907-beta)

#### **3. New Model & Hardware Support**  
- **No new model architectures added**, but ongoing community requests highlight growing demand for:  
  - **Ling 3.0** (#8532)  
  - **Voxtral** (#3013)  
  - **Gemma4e2b on Windows** (#13388)  
- **Hardware**: PR #13671 introduces automatic fallback to Vulkan or CPU `llama.cpp` bundle on older NVIDIA drivers (< CUDA 12), improving Windows GPU compatibility for low-end devices.  
  🔗 [PR #13671](https://github.com/unslothai/unsloth/pull/13671)

#### **4. Performance & Optimization**  
- **Up to 5x faster inference** via 95% cache hit rate in MoE workloads, MoE Strata-style memory management, and optimized kernel dispatches.  
- **UI/UX speedup**: Up to **10x improvement** in multi-chat scenarios due to reduced latency in state updates and rendering.  
- **H100-specific fix**: PR #13619 disables xformers FA3 on H100 when build lacks `sm_90a` kernels, preventing crashes during training.  
  🔗 [PR #13619](https://github.com/unslothai/unsloth/pull/13619)

#### **5. Stability & Regressions**  
- **Critical regression**: Browser panel API calls fail when targeting same-origin endpoints (e.g., HF model search). Fixed in PR #13664.  
  🔗 [PR #13664](https://github.com/unslothai/unsloth/pull/13664)  
- **Crash under load**: Out-of-memory issues persist in multi-GPU training (Issue #4685), though no fix PR yet.  
- **Model sync failure**: Multiple users accessing shared local models see inconsistent state (Issue #12365).  
- **TTS truncation**: Read-aloud fails beyond 2048 tokens unless manually configured (PR #13648 in progress).  
  🔗 [PR #13648](https://github.com/unslothai/unsloth/pull/13648)

#### **6. What This Means for Application Developers**  
Developers can now deploy high-throughput LLM apps with **near-real-time UI interactivity** and **sub-second inference latencies** at scale. The new caching layer and MoE optimizations enable efficient deployment of large models like Qwen3-MoE and Mistral3.2 even on modest hardware. However, **multi-user/local model sharing remains fragile**—avoid shared inference servers without explicit session isolation. For production agents, **use `--random-seed` consistently** (fix PR #13637 pending) to ensure reproducible LoRA training. Future-proof your stack by leveraging the new **scheduled workflows (PR #13539)** and **browser-to-API routing fixes (PR #13664)** for robust agent orchestration.  

👉 *Recommendation*: Upgrade to v0.1.907-beta immediately for performance gains; monitor PRs #13664 and #13648 for stable agent tooling.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*