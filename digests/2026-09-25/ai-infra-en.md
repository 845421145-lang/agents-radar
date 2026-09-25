# AI Infrastructure Digest 2026-09-25

> Generated: 2026-09-25 00:43 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-25**

---

### **1. Ecosystem Overview**

The AI inference and serving ecosystem in Q3 2026 is rapidly maturing, marked by deep hardware specialization, aggressive kernel-level optimization, and growing convergence between local runtimes, distributed engines, and cloud gateways. Projects are increasingly focused on enabling next-generation models (e.g., GLM-5.3, Kimi-K3, Qwen3.8-Flash) across diverse backends—RTX 50-series, AMD MI355X, ROCm 10, NPU platforms—while addressing critical stability gaps in speculative decoding, KV cache integrity, and long-context performance. The shift toward modular, cross-platform infrastructures is evident, with vLLM, SGLang, and Unsloth pushing boundaries in multi-engine support and backend abstraction.

---

### **2. Activity Comparison**

| Project | Open Issues | PRs Merged (Last 24h) | Releases | Status |
|--------|-------------|-------------------------|----------|--------|
| **vLLM** | 127 | 6 | None | Stable, high-priority stability fixes |
| **SGLang** | 114 | 8 | None | Active optimization & new backend integration |
| **llama.cpp** | 142 | 5 | v0.25.3 (minor) | High severity regressions; urgent fixes needed |
| **Ollama** | 108 | 3 | None | API deprecation + memory/performance issues |
| **LiteLLM** | 98 | 4 | None | Critical cost accounting bugs under review |
| **Unsloth** | 135 | 7 | None | Rapid expansion into new hardware/backends |

> 🔍 *Observation*: Despite no new releases, activity remains high across all projects—particularly in stability fixes (vLLM, llama.cpp, Ollama) and architectural innovation (Unsloth, SGLang). The absence of releases suggests a focus on internal quality before public-facing updates.

---

### **3. Model Support Race**

| Project | New Models / Architectures Supported | Key Advancements |
|--------|--------------------------------------|------------------|
| **vLLM** | RTX 50-series (sm120), AMD MI355X (gfx950), Kimi-K3, GLM-5.3-Flash | Full `TP=2/4/8` matmul tuning for sm120; ROCm-specific optimizations for speculative decoding |
| **SGLang** | Qwen3.8-Flash-Next, Qwen-Image-2.1, DeepSeek-V4.1, Lark grammar (XGrammar) | FlyDSL GDN prefill backend (AMD); Triton graph capture improvements |
| **llama.cpp** | Prism PQ2_0, PTQ1_0, Hexagon NPU (Windows Arm64), Intel Vulkan | Metal/MetalGraph fix; CUDA sparse FA optimization; AVX-512 VNNI+VBMI for Q4_K |
| **Ollama** | GraniteForCausalLM (MLX), gemma4:31b, qwen3.8:27b (MLX), Windows-on-Arm | Expanded AMD GPU support; ARM CPU optimization; MLX runner stability |
| **LiteLLM** | Fireworks DeepSeek-V4P1-Flash (US-only), Azure FLUX.2-flex edit images, Sail provider | Cost map sync with official pricing; enhanced streaming metadata |
| **Unsloth** | AMD ROCm 10 (announcement), RyZEN AI NPU (XDNA 2), vLLM/SGLang engine opt-in | NVFP4 image gen acceleration; FlashInfer for FP4; Qwen-Image-2.1 pipeline tracking |

> 🏆 **Leader**: **Unsloth** leads the race in *hardware diversity*, supporting NPU, ROCm 10, and vLLM/SGLang integration. **vLLM** leads in *model/hardware coverage* for mainstream inference (RTX 50-series, MI355X). **SGLang** excels in *advanced architecture support* (DCP, Helix, XGrammar).

---

### **4. Performance Frontier**

Optimization efforts are now concentrated across four key domains:

| Domain | Leading Projects | Focus Areas |
|-------|------------------|------------|
| **KV Cache & Memory Management** | vLLM, SGLang, llama.cpp | Fixing corruption (vLLM #53912), silent CPU fallbacks (llama.cpp #28633), leak mitigation (Ollama #18620) |
| **Batching & Throughput** | vLLM, SGLang | Batch-invariant matmul tuning (vLLM #58495), FFN reduction (SGLang #41200–#41193) |
| **Quantization & Kernel Fusion** | llama.cpp, Unsloth, SGLang | FP8 fusion (SGLang #39296), shared-expert LoRA binding (SGLang #41074), Q4_K_M correctness (llama.cpp #25618) |
| **Distributed Serving & Parallelism** | vLLM, SGLang | Decode Context Parallelism (DCP), Helix Parallelism, asymmetric TP handling |

> ⚠️ **Critical Gap**: No project has fully resolved speculative decoding divergence (llama.cpp #25618, SGLang #40144) or long-context collapse (>80K tokens) — a major barrier to production agent systems.

---

### **5. Layer Positioning**

| Project | Primary Layer | Role in Stack |
|--------|---------------|--------------|
| **vLLM** | **Serving Engine** | High-performance, low-latency inference; tensor parallelism, spec-decoding, MoE routing |
| **SGLang** | **Serving Engine + Agent Framework** | Distributed inference + structured output (XGrammar), async scheduling, DCP |
| **llama.cpp** | **Local Runtime / Embedded Inference** | CPU/GPU/NPU-first; portable, minimal dependency; ideal for edge devices |
| **Ollama** | **Developer Gateway + Local Runner** | Unified CLI/API; model lifecycle management; MLX/ROCm/Windows support |
| **LiteLLM** | **LLM Gateway / Orchestration Layer** | Multi-provider routing, cost control, tagging, spend logging, security |
| **Unsloth** | **Fine-Tuning + Multi-Backend Runtime** | Training efficiency, export flexibility, hardware-aware inference (NPU, ROCm, vLLM) |

> 🧩 **Stack Insight**: A clear trend toward *layered specialization*: LiteLLM (gateway), vLLM/SGLang (engine), llama.cpp/Ollama (runtime), Unsloth (training+export). Developers are increasingly combining these layers (e.g., Ollama → LiteLLM → vLLM) for end-to-end pipelines.

---

### **6. Trend Signals**

Based on today’s activity, the following industry trends are emerging:

1. **Hardware Specialization is Accelerating**  
   - RTX 50-series (sm120), AMD MI355X (gfx950), Ryzen AI NPU (XDNA 2), Hexagon NPU — each demands unique kernel tuning and backend support.
   - *Developer Implication*: Optimize per-hardware stack early; avoid "one-size-fits-all" assumptions.

2. **Speculative Decoding is Still Unstable at Scale**  
   - Multiple high-severity issues across vLLM, SGLang, and llama.cpp indicate persistent correctness and performance risks.
   - *Developer Implication*: Avoid speculative decoding in mission-critical agents until [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) and similar are resolved.

3. **Cost Transparency Drives Enterprise Adoption**  
   - LiteLLM’s focus on `spend logs`, `tag-based rate limits`, and `metadata reconciliation` reflects rising demand for auditability and compliance (EU AI Act).
   - *Developer Implication*: Use tag-level budgeting and stream metadata preservation to ensure billing accuracy.

4. **Agent Workflows Are Driving Infrastructure Innovation**  
   - XGrammar (SGLang), tool parsing (Ollama), parser cache (vLLM), session state (SGLang), RAG GPU toggle (Unsloth) — all signal that agent logic is now shaping infrastructure design.
   - *Developer Implication*: Prioritize robust request state handling, deterministic outputs, and error resilience.

5. **Multi-Engine Integration Is the Next Frontier**  
   - Unsloth’s opt-in vLLM/SGLang support, Ollama’s MLX/ROCm hybrid runners, LiteLLM’s provider routing — all point to a future where developers compose engines like microservices.
   - *Developer Implication*: Design workflows with portability and fallback logic in mind.

---

> ✅ **Final Recommendation for Application Developers**:  
> - **For production agents**: Use **vLLM + LiteLLM** with careful validation of speculative decoding and streaming metadata.  
> - **For edge/AI-on-device**: Leverage **llama.cpp (Hexagon, Vulkan)** or **Unsloth (Ryzen AI NPU)**.  
> - **For enterprise orchestration**: Deploy **LiteLLM + Ollama + SGLang** with granular tagging and cost monitoring.  
> - **Monitor all six projects weekly** — stability and compatibility changes can break production workflows overnight.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-09-25

---

### **1. Today's Highlights**

The vLLM project continues to advance its support for next-generation models and hardware, with critical performance optimizations landing for **RTX 50-series (sm120)** and **AMD MI355X (gfx950)**. Key PRs focus on enabling batch-invariant matmul tuning for multi-rank inference, reducing redundant GPU-CPU synchronization in Mamba2 prefill, and improving speculative decoding efficiency on Kimi-K3. Meanwhile, high-priority issues highlight stability concerns in GLM-5.3 Flash long-decode scenarios and persistent prefix caching corruption in hybrid Mamba/GDN models.

---

### **2. Releases & Breaking Changes**

None reported in the last 24 hours. No new releases or breaking API/config changes were published.

---

### **3. New Model & Hardware Support**

- **RTX 50-series (sm120)**: Added full `TP=2/4/8` per-rank shape coverage in batch-invariant matmul tables via [PR #58495](https://github.com/vllm-project/vllm/pull/58495), enabling efficient inference on consumer Blackwell GPUs.
- **AMD MI355X (gfx950)**: Performance optimization tracker for Qwen3.8-2.4T-A95B launched ([Issue #57149](https://github.com/vllm-project/vllm/issues/57149)), including kernel tuning for low-concurrency speculative KDA decoding ([PR #58045](https://github.com/vllm-project/vllm/pull/58045)).
- **Kimi-K3**: ROCm-specific optimizations for speculative decoding and MoE routing now in progress ([PR #58045](https://github.com/vllm-project/vllm/pull/58045), [Issue #38175](https://github.com/vllm-project/vllm/issues/38175)).
- **GLM-5.3-Flash**: Ongoing performance optimization efforts underway ([Issue #57406](https://github.com/vllm-project/vllm/issues/57406)) due to long-decode degeneration issues ([Issue #56868](https://github.com/vllm-project/vllm/issues/56868)).

---

### **4. Performance & Optimization**

- **Batch-Invariant Matmul Tuning**: Expanded `sm120` support across TP=2/4/8 configurations, eliminating fallback kernels and improving throughput consistency under tensor parallelism ([PR #58495](https://github.com/vllm-project/vllm/pull/58495)).
- **Mamba2 Prefill Optimization**: Removed GPU<->CPU syncs during SSM state saves via [PR #49371](https://github.com/vllm-project/vllm/pull/49371), significantly reducing overhead in prefill-heavy workloads.
- **ROCm Efficiency Gains**: Cut 69 wasted contiguous copies per decode step in skinny GEMM path ([PR #58566](https://github.com/vllm-project/vllm/pull/58566)); skipped unnecessary logits buffer cleanup in sparse prefill ([PR #51314](https://github.com/vllm-project/vllm/pull/51314)).
- **MoE Kernel Refactoring**: Progress on modularizing deferred MoE finalization and migrating legacy linear/MoE kernels ([PR #58635](https://github.com/vllm-project/vllm/pull/58635), [Issue #54959](https://github.com/vllm-project/vllm/issues/54959)).

---

### **5. Stability & Regressions**

| Severity | Issue | Description | Fix Status |
|--------|-------|-------------|------------|
| 🔴 High | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash exhibits long-decode degeneration after accumulated reasoning steps (W4A16 quantized) | Open; regression from prior versions |
| 🔴 High | [#53912](https://github.com/vllm-project/vllm/issues/53912) | Prefix caching + MTP corrupts output on hybrid Mamba/GDN models in v0.28.0 | Open; previously closed but unfixed |
| 🟡 Medium | [#57562](https://github.com/vllm-project/vllm/issues/57562) | AsyncScheduler `num_output_placeholders` underflow with chunked prefill + concurrency (regression from v0.24.0) | Open; affects high-throughput async setups |
| 🟡 Medium | [#56389](https://github.com/vllm-project/vllm/issues/56389) | DeepSeek-V4.1-Flash crashes with illegal memory access under high concurrency on H20 (SM90) | Mitigated by `max_num_seqs=256`; open |

---

### **6. What This Means for Application Developers**

- **Deploying on RTX 50-series?** Enable `VLLM_BATCH_INVARIANT=1` with `tensor_parallel_size > 1`—the recent matmul tuning ensures stable, high-throughput inference.
- **Using GLM-5.3-Flash?** Avoid long reasoning chains until [#56868](https://github.com/vllm-project/vllm/issues/56868) is resolved; consider alternative quantizations or checkpoint variants.
- **Hybrid Mamba/GDN models?** Disable prefix caching or avoid MTP until [#53912](https://github.com/vllm-project/vllm/issues/53912) is patched—output corruption is non-trivial.
- **High-concurrency spec-decoding?** Monitor `AsyncScheduler` behavior; the `num_output_placeholders` underflow may cause silent failures in streaming scenarios.
- **Custom tool parsers?** Consider leveraging the parser cache RFC ([#57571](https://github.com/vllm-project/vllm/issues/57571)) to stabilize tool call IDs across retries.

> ✅ **Pro Tip**: Use `vLLM=0.29.0+cu129` or later for improved stability on newer hardware, and monitor the [Q3 2026 roadmap](https://github.com/vllm-project/vllm/issues/48193) for cold-start improvements and structured output refinements.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-25**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues advancing toward scalable, efficient inference for next-generation LLMs and diffusion models. Key developments include progress on **Decode Context Parallelism (DCP)** and **Helix Parallelism**, with foundational communication backend work now defaulting to `fi_a2a`/`a2a`. Significant engineering effort is focused on **DeepSeek-V4.1** optimization, particularly around kernel fusion, FFN reduction refactoring, and MTP draft layer correctness. Additionally, new support for **Lark grammars in XGrammar** and **AMD FlyDSL GDN prefill backend** expands cross-platform compatibility.

---

### **2. Releases & Breaking Changes**  
None. No new releases or breaking API/config changes were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **New model support**:  
  - Qwen3.8-Flash-Next roadmap (#38731) progressing with kernel optimizations and CPU overhead reduction.  
  - Diffusion serving path now includes full tracking for Qwen-Image-2.1 and other image generation models (#41192).  
- **Hardware & backend expansion**:  
  - **AMD ROCm**: Added support for **FlyDSL GDN prefill backend** via PR #39595, improving performance on gfx950 targets (Qwen3.5-397B TP4).  
  - **AWS NVIDIA GPUs (NIXL & Mooncake)**: PR #40995 tracks enabling EFA SGLang image out-of-the-box support.  
- **Quantization & format**:  
  - Mixed Quark Qwen3.5 MTP checkpoints now properly handle quantization during speculative decoding (PR #39064).  
  - FP8 shared expert fusion extended to DeepSeek-V4.1 via native FP8 integration (PR #39296).

---

### **4. Performance & Optimization**  
- **Kernel-level improvements**:  
  - Refactored FFN all-reduce handling across DeepSeek-V4 stack (PRs #41200–#41193), reducing redundant computation and improving scalability under attention DP.  
  - Fused shared-expert LoRA loading ensures correct expert index binding (PR #41074).  
- **Throughput & efficiency**:  
  - **DeepSeek-V4 dsv4 prefill** on SM120 (4× RTX PRO 6000, TP=4) shows ~2–7K tok/s vs vLLM’s reported ~12.5K; investigation ongoing (#33422).  
  - **Triton backend**: Padded decode CUDA-graph slots incur increasing cost with context length (e.g., 27.7 → 35.9 ms/token at 30K tokens) — a known perf bottleneck (#41151).  
- **Speculative decoding**:  
  - DFLASH draft layout assumption without validation leads to silent position shifts (#40144); fix pending.  
  - Draft KV transfer fails on asymmetric P/D TP for GLM-5.3-Flash (#41192).

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|------|--------|------------|
| High | [#41192](https://github.com/sgl-project/sglang/issues/41192) | Qwen-Image-2.1 TP=2 output corrupted by chroma speckle noise (clean at TP=1); reproducible in vLLM-Omni | Open |
| High | [#41152](https://github.com/sgl-project/sglang/issues/41152) | Gemma 2/3 batched generations run away on ROCm with unified attention (`aiter`) | Open |
| Medium | [#40959](https://github.com/sgl-project/sglang/issues/40959) | Anthropic `/v1/messages` splices prior-turn thinking into content, breaking Qwen3.8 chat template | Open |
| Medium | [#40360](https://github.com/sgl-project/sglang/issues/40360) | LMCache session leaks when requests abort due to cache finalization tied to `cache_finished_req` | Open |
| Low | [#41124](https://github.com/sgl-project/sglang/issues/41124) | Penalties use one-step-stale history under overlap scheduler | Open |

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding** on mixed-precision models (e.g., GLM-5.3-Flash, Qwen3.5-MTP): ensure draft layouts are validated and avoid asymmetric TP configurations until fixes land.  
- **Optimize for long contexts** on Triton: expect rising latency per token as context grows—consider adjusting graph capture size or disabling padding if possible.  
- **Enable XGrammar Lark support** via PR #39380 for advanced prompt structuring in agents using complex grammar rules.  
- **For AMD users**: leverage the new FlyDSL GDN prefill backend for improved throughput on large MoE models like Qwen3.5-397B.  
- **Build robust agent logic** around stateful request handling: be aware of `cache_finished_req` leaks and potential race conditions in streaming sampling masks (#40986).  

> 📌 *Pro tip*: Monitor the [dLLM Serving Roadmap](https://github.com/sgl-project/sglang/issues/39499) for upcoming features like incremental chat-prompt processing (#41148) and configurable log retention (#41129)—critical for production-grade agent systems.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-25**

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes for Metal and CUDA backends, particularly around graph capture, sparse flash attention (FA), and speculative decoding correctness. Key performance optimizations landed for Intel (SYCL/Vulkan) and Hexagon NPU platforms, while ongoing work improves batching, quantization accuracy, and cross-backend consistency.

---

### **2. Releases & Breaking Changes**  
- **ggml v0.25.2 → v0.25.3**: Minor sync release addressing UBSAN errors in `ggml_graph_nbytes` ([#29396](https://github.com/ggml-org/llama.cpp/pull/29396)). No API changes; safe to update.
- **Metal Graph Capture Fix**: Early return for empty graphs avoids unnecessary command buffer overhead ([#29390](https://github.com/ggml-org/llama.cpp/pull/29390)).
- **CUDA Sparse FA Optimization**: Indices now cached in shared memory, improving throughput for large contexts ([#29377](https://github.com/ggml-org/llama.cpp/pull/29377)).

> ✅ *No breaking changes expected. Update recommended for stability and performance gains.*

---

### **3. New Model & Hardware Support**  
- **Hexagon NPU**: Added Windows Arm64 build support via CI ([#29052](https://github.com/ggml-org/llama.cpp/pull/29052)); enables deployment on Qualcomm AI accelerators.
- **Intel Vulkan**: Added dedicated prefill FA kernel for improved LLM inference on Intel GPUs ([#29357](https://github.com/ggml-org/llama.cpp/pull/29357)).
- **New Quant Formats**: PRs targeting support for **Prism PQ2_0 (type 142)** and **PTQ1_0 (type 143)** used by Ternary-Bonsai-2 models ([#29058](https://github.com/ggml-org/llama.cpp/issues/29058)).
- **Dynamic Quantizer Improvements**: Fixes to Q8_0 N=1 MUL_MAT accuracy and register spill issues on Hexagon ([#29395](https://github.com/ggml-org/llama.cpp/pull/29395)).

---

### **4. Performance & Optimization**  
- **Metal Sparse FA**: Shared memory caching reduces latency in long-context scenarios — benchmarked on `DeepSeek-V4-Flash-Vision-Exp-GGUF` at 70K context ([#29377](https://github.com/ggml-org/llama.cpp/pull/29377)).
- **AVX-512 VNNI+VBMI for Q4_K**: Adds optimized GEMM path using `vpdpbusd`, boosting CPU inference speed on compatible x86_64 systems ([#29397](https://github.com/ggml-org/llama.cpp/pull/29397)).
- **CUDA Fusion**: Fuses RMS_NORM + SCALE into single kernel, resolving ~4% prefill regression from prior merge ([#29393](https://github.com/ggml-org/llama.cpp/pull/29393)).
- **SYCL Graph Recording**: Enables graph replay for SYCL backend, reducing runtime overhead for repeated workloads ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725)).

---

### **5. Stability & Regressions**  
| Issue | Severity | Impact | Status | Fix PR |
|------|----------|--------|--------|--------|
| [#25618](https://github.com/ggml-org/llama.cpp/issues/25618): Speculative decoding divergence on quantized targets (`Q4_K_M`) under greedy sampling | High | Incorrect output despite same config; affects agents relying on deterministic outputs | Open | ❌ No fix yet |
| [#28805](https://github.com/ggml-org/llama.cpp/issues/28805): Metal decode emits EOS after 1 token at long context | Critical | Silent failure; model stops generating mid-response | Open | ❌ No fix yet |
| [#27623](https://github.com/ggml-org/llama.cpp/issues/27623): Qwen3.8-27B decode throughput collapses >25x beyond 80K context | High | Severe performance cliff on large prompts | Open | ❌ No fix yet |
| [#29281](https://github.com/ggml-org/llama.cpp/issues/29281): CUDA sparse FA decode 1.6x slower post-b11047 | Medium | Regression in high-throughput setups | Closed | ✅ Fixed in #29377 |
| [#28633](https://github.com/ggml-org/llama.cpp/issues/28633): 4-bit KV cache silently falls back to CPU | High | Hard-to-diagnose 30x slowdown with no warning | Open | ❌ No fix yet |

> ⚠️ **Critical Note**: Users of speculative decoding or 4-bit KV caches should test thoroughly — multiple correctness and performance regressions remain unresolved.

---

### **6. What This Means for Application Developers**  
- **Use `GGML_CUDA_FA_ALL_QUANTS=ON` by default** if deploying on CUDA — avoid silent CPU fallbacks for 4-bit KV caches ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633)).
- **Avoid speculative decoding** on quantized models (`Q4_K_M`, etc.) until [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) is resolved — expect non-deterministic outputs.
- **Leverage new hardware support**: Deploy on Hexagon NPU (Windows Arm64) and Intel Vulkan for edge/AI-on-device use cases.
- **Monitor long-context behavior**: Models like Qwen3.8-27B show severe degradation past 80K tokens — consider context window truncation or offload strategies.
- **Enable graph capture early**: The Metal fix ensures efficient execution for zero-node graphs — useful in streaming or agent workflows.

> 🔗 [GitHub Repository](https://github.com/ggml-org/llama.cpp) | [Official Website](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-25**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its support for advanced model architectures and hardware backends, with key progress in MLX runner stability and new integrations for agent workflows. Critical regressions in memory estimation (gemma4:31b) and tool call parsing (gemma4:31b, qwen3.8) were reported, alongside persistent stalls under sustained load on MLX nvfp4 — indicating ongoing challenges in high-throughput inference reliability.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
- **API Deprecation**: `typical_p` is now deprecated and will log a warning instead of failing (PR [#18627](https://github.com/ollama/ollama/pull/18627)). Developers should migrate to `typical_prompt` or remove usage.  
- **Web Search Limit Increase**: The per-response web search limit has been raised from 3 to 10 (PR [#18602](https://github.com/ollama/ollama/pull/18602)), now honoring Anthropic’s `max_uses` values below 10.

---

### **3. New Model & Hardware Support**  
- **MLX Backend Additions**:  
  - Support for `GraniteForCausalLM` models added via PR [#17972](https://github.com/ollama/ollama/pull/17972), enabling use of IBM’s Granite 4.1 and 4.2 series on Apple Silicon.  
  - Fix for MoE expert loading in `gemma4` models (PR [#18631](https://github.com/ollama/ollama/pull/18631)) resolves import failures for `mlx-community/gemma-4-26B-A4B-it-qat-4bit`.  
- **Hardware & OS**:  
  - Expanded AMD GPU support on Windows (PR [#18623](https://github.com/ollama/ollama/pull/18623)) adds `gfx1030`, `gfx1150`, `gfx1151`, `gfx1200`, and `gfx1201` to ROCm compatibility list.  
  - **Windows-on-Arm**: PR [#17654](https://github.com/ollama/ollama/pull/17654) enables full ARM instruction set (`armv8-a`) optimization for CPU builds.

---

### **4. Performance & Optimization**  
- **Memory Leak in MLX Runner**: A recurring ~0.43 GiB memory leak per tool-call request is reported in `qwen3.6:27b-mlx` (Issue [#18620](https://github.com/ollama/ollama/issues/18620)), affecting long-running agent workflows.  
- **Regression in gemma4:31b**: Version 0.31.2 introduced a 7x slowdown (33.8 → 4.7 tok/s) due to inflated VRAM estimate (Issue [#17099](https://github.com/ollama/ollama/issues/17099)); fix pending.  
- **Stall Handling Improvements**: PRs [#18625](https://github.com/ollama/ollama/pull/18625) and [#18614](https://github.com/ollama/ollama/pull/18614) address stalled model pulls and MTP quantization bugs, improving resilience during downloads and inference.

---

### **5. Stability & Regressions**  
- **Critical**: `gemma4:31b` tool-call parser drops requests when keys contain spaces (Issue [#18390](https://github.com/ollama/ollama/issues/18390)) — silent failure with empty response.  
- **High Severity**: `qwen3.8:27b` ignores `"high"`/`"max"` thinking levels, defaulting to `"medium"` despite documented support (Issue [#18632](https://github.com/ollama/ollama/issues/18632)).  
- **Persistent Stall**: MLX nvfp4 models stall indefinitely during prefill under single-slot load (Issue [#18505](https://github.com/ollama/ollama/issues/18505)) — only recoverable via SIGTERM.  
- **OS-Specific Failures**:  
  - Windows CUDA fails to detect Blackwell RTX 50-series GPUs (Driver 616.92), falling back to CPU (Issue [#18581](https://github.com/ollama/ollama/issues/18581)).  
  - macOS GUI silently fails after 60 seconds processing (Issue [#18368](https://github.com/ollama/ollama/issues/18368)) — no notification or error.

---

### **6. What This Means for Application Developers**  
- **Avoid `qwen3.8:27b` with `"high"`/`"max"` thinking levels** — they currently behave as `"medium"`. Use `xhigh` directly if needed.  
- **Monitor memory usage carefully** with `gemma4:31b` and `qwen3.6:27b-mlx`; known regressions may cause severe performance degradation or leaks.  
- **Expect instability on MLX nvfp4 under sustained load** — consider retry logic or fallback to other runners until Issue [#18505] is resolved.  
- **Integrate new tools like AGNT ([#18618](https://github.com/ollama/ollama/pull/18618)) and Termalime ([#18630](https://github.com/ollama/ollama/pull/18630))** for enhanced desktop agent and CLI workflows.  
- **Update API clients to handle `401` and `403` auth errors** (PR [#18092](https://github.com/ollama/ollama/pull/18092)) when accessing cloud models.

---  
*Digest generated from GitHub data: [github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-25**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to mature with a strong focus on cost transparency, security, and reliability in enterprise-grade LLM routing. Key PRs today include enhanced budget enforcement for tag-level rate limits (#41807), improved streaming metadata retention (e.g., `service_tier` in spend logs, #42870), and new cost map entries for Fireworks’ US-only DeepSeek V4.1 Flash model (#43097). These updates reflect growing maturity in multi-provider orchestration, particularly around billing accuracy and auditability.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several critical configuration and behavioral changes are pending in active PRs:
- **Tag-based rate limiting now enforced**: The v3 rate limiter will respect `tpm_limit` and `rpm_limit` set on tag objects (PR #41807). Previously, only `max_budget` was checked — this change may require reconfiguration of existing tag policies.
- **Spend log enhancements**: A new `metadata.used_anthropic_oauth_token` field will be recorded in all spend logs (PR #43063), enabling better reconciliation between Anthropic’s API bills and gateway logs.

> 🔗 [PR #41807](https://github.com/BerriAI/litellm/pull/41807) | [PR #43063](https://github.com/BerriAI/litellm/pull/43063)

---

### **3. New Model & Hardware Support**  
- ✅ **Sail added as OpenAI-compatible provider** (PR #42840): Twelve Sail models are now supported across chat, streaming, responses, and Anthropic messages. Pricing is tiered by completion window.
- ✅ **Fireworks DeepSeek-V4P1-Flash (US-only)**: Added to cost map with proper pricing rows (PR #43097).
- ✅ **Azure AI FLUX.2-flex edit reference images**: Now billed at 1 megapixel each (PR #43094), aligning cost tracking with Azure’s actual pricing.

> 🔗 [PR #42840](https://github.com/BerriAI/litellm/pull/42840) | [PR #43097](https://github.com/BerriAI/litellm/pull/43097) | [PR #43094](https://github.com/BerriAI/litellm/pull/43094)

---

### **4. Performance & Optimization**  
- **Streaming metadata preservation**: PR #42870 ensures that `service_tier` is preserved across streamed chunks and recorded in spend logs — critical for accurate cost attribution during long-running requests.
- **OCR performance shift**: Python OCR execution path removed entirely (PR #43081), requiring use of the Rust route only. This reduces maintenance overhead and improves consistency, though it may impact users relying on legacy Python paths.
- **Cost map sync**: PR #43091 brings Gemini’s priority, flex, and video input pricing into alignment with official docs — improving token cost estimation accuracy.

> 🔗 [PR #42870](https://github.com/BerriAI/litellm/pull/42870) | [PR #43081](https://github.com/BerriAI/litellm/pull/43081) | [PR #43091](https://github.com/BerriAI/litellm/pull/43091)

---

### **5. Stability & Regressions**  
Top stability concerns reported today:

| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| [#26672](https://github.com/BerriAI/litellm/issues/26672): Budget enforcement bypassed in v1.82.3 despite spend exceeding `max_budget` | ⚠️ Critical | Open | ❌ No fix yet |
| [#39713](https://github.com/BerriAI/litellm/issues/39713): Per-customer RPM limits ignored after virtual key caching | ⚠️ High | Open | ❌ No fix yet |
| [#43000](https://github.com/BerriAI/litellm/issues/43000): `encrypted_content_affinity` breaks multi-turn conversations if pinned deployment fails | ⚠️ High | Closed (but unresolved) | ❌ Known issue; no fallback logic |
| [#39088](https://github.com/BerriAI/litellm/issues/39088): Streaming drops `prompt_tokens_details`, causing cached tokens to be billed at full input rate | ⚠️ Medium | Open | ❌ No fix yet |

> 📌 Note: Multiple issues affect cost accounting integrity — especially when using response caching, streaming, or zero-cost models.

---

### **6. What This Means for Application Developers**  
- **Audit readiness**: With new metadata fields in spend logs (e.g., `used_anthropic_oauth_token`), you can now reconcile proxy logs directly with upstream provider bills — essential for compliance under EU AI Act Article 12 (#29895).
- **Avoid cost leakage**: Be cautious with `prompt_caching_savings_spend` and `compression_savings_spend` — they’re currently not properly calculated in cost-based routing scenarios (#37117). Validate your cost reports manually until fixed.
- **Stream safety**: If using streaming with caching (e.g., Vertex AI, Vercel Gateway), ensure `usage.prompt_tokens_details` is preserved — otherwise, cached tokens are billed at full input price (#39088).
- **Rate limit hygiene**: Tag-level `rpm_limit` and `tpm_limit` enforcement is now being implemented — update your configurations proactively to avoid unexpected overages.
- **Security note**: The UI session persistence bug (#35665) remains open — avoid relying on logout to invalidate sessions in production environments.

> 🔗 [Issue #29895](https://github.com/BerriAI/litellm/issues/29895) | [Issue #39088](https://github.com/BerriAI/litellm/issues/39088) | [Issue #35665](https://github.com/BerriAI/litellm/issues/35665)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-25**

---

### **1. Today's Highlights**  
Unsloth continues rapid expansion into multi-backend inference and advanced quantization, with major progress on AMD ROCm 10 support and NVFP4 kernel optimization for image generation. Key PRs include on-demand FlashInfer installation for FP4 models, improved VAE compilation, and early-stage vLLM/SGLang integration. The community is actively reporting critical issues around Qwen-Image-2.1 deployment, VRAM misreporting on AMD iGPUs, and model export failures due to read-only cache permissions.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
- **Pending**: `install.ps1` script validation fix (#11862) addresses false failure when Bitdefender quarantines bundled installer — a silent failure risk for Windows users.
- **Migration Note**: Users upgrading to ROCm 10 (per #9932) should expect manual version pinning until official support lands; current installer still defaults to ROCm 7.14.

---

### **3. New Model & Hardware Support**  
- ✅ **AMD ROCm 10** now officially announced by AMD; tracking via #9932 and #11815 for multi-arch PyTorch package availability.
- 🚀 **vLLM & SGLang Support** added as opt-in engines via #11491: enables text/image chat, multi-GPU serving, quantization, and vision model inference.
- 💡 **Ryzen AI NPU (XDNA 2)** support introduced via #11743 using Lemonade + FastFlowLM stack — available on Strix Halo/Point devices.
- 🔧 **Qwen-Image-2.1** now has dedicated tracking issues (#11840, #11637) for GGUF loading, asset download bloat, and pipeline validation.
- 📦 **Flatpak support** requested (#4380), indicating growing demand for Linux-native packaging beyond .deb/.rpm.

---

### **4. Performance & Optimization**  
- ⚡ **NVFP4 Image Generation**: Per-layer policies and flashinfer backend (#10730, #10731, #11730) enable faster inference with reduced memory pressure; targeting sub-200ms VAE decode times.
- 🖥️ **VAE Compile Optimization**: #10889 introduces compile-time budgeting to prioritize VAE decoding, which previously caused 10–23 minute hangs on gfx1030 (see #11636).
- 📈 **Config Sweep Benchmarks**: #11808 and #11646 lay groundwork for automated benchmarking of speculative decoding, KV cache types, RAM offload, and throughput metrics.
- 🔄 **FlashAttention Prebuilt Optimization**: #11812 splits `flash-attn` wheel build across parallel jobs to reduce CI time from ~8 hours to under 1 hour.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Notes |
|------|----------|--------|-------|
| #11870: GGUF export fails on AMD iGPU with “invalid kernel file” | Critical | Open | Due to PyTorch kernels not present on iGPU; requires explicit GPU selection during export. |
| #11814: `torch._grouped_mm` access violation crashes `import unsloth` on older ROCm 7.13.0 | Critical | Open | Affects multiple AMD cards (gfx103X, gfx110X); persistent venv issue despite updates. |
| #11636: VAE decode hangs for 10–23 minutes on AMD (ROCm) | High | Closed | Caused by MIOpen exhaustive tuning; workaround: disable `cudnn.benchmark`. |
| #11739: Image gen stalls at “Step N/N” after final step | Medium | Open | UI lags due to missing progress callback; impacts user perception of hang. |
| #11785: Export to GGUF fails due to read-only HF cache | Medium | Open | Prevents fine-tuned model distribution; common in shared environments. |

> ✅ **Fixes in Progress**: #11874 (compile-cache disk usage), #11873 (misleading model switch logs), #11829 (pipeline validation).

---

### **6. What This Means for Application Developers**  
- **Leverage vLLM/SGLang**: Use #11491’s opt-in engine support for high-throughput, multi-GPU deployments with full quantization flexibility.
- **Handle AMD ROCm Carefully**: Avoid mixed-architecture systems unless explicitly managing PyTorch versions (e.g., via #11815). Monitor for `torch._grouped_mm` crashes.
- **Design for GPU-Aware Workflows**: With #11768 (RAG embedding GPU toggle) and #11743 (NPU support), applications must expose hardware selection for embeddings and inference.
- **Expect Complex Model Management**: Qwen-Image-2.1 issues (#11637, #11825) highlight the need for robust asset resolution logic when merging LoRAs or exporting models.
- **Monitor Cache Permissions**: Ensure write access to Hugging Face cache directories when automating fine-tuning/export pipelines (see #11785).

> 🔗 [GitHub Issues](https://github.com/unslothai/unsloth/issues) | [PRs](https://github.com/unslothai/unsloth/pulls) | [Roadmap Tracking](https://github.com/unslothai/unsloth/issues/11840)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*