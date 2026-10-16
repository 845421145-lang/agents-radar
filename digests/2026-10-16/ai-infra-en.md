# AI Infrastructure Digest 2026-10-16

> Generated: 2026-10-16 00:39 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

---

### **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-16**

---

#### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q4 2026 is defined by rapid convergence toward **hardware-aware, multimodal, and agent-native execution**, driven by next-generation GPUs (Blackwell SM120, GB300), MoE/MoVA models, and low-latency speculative decoding. Projects are increasingly focused on **cross-platform portability** (ROCm, Metal, Vulkan) and **distributed serving efficiency**, while stability remains a persistent challenge—especially under high-concurrency or hybrid workloads. The emergence of text-diffusion LLMs and unified model serving gateways signals a shift from static prompt-response to dynamic, multi-modal agent workflows.

---

#### **2. Activity Comparison**

| Project | Issues Open | PRs Merged (Last 7 Days) | Release Status |
|--------|-------------|----------------------------|----------------|
| **vLLM** | 98 | 15 | No new release; `main` branch active |
| **SGLang** | 112 | 18 | No new release; v0.5.20 stable |
| **llama.cpp** | 134 | 22 | **v0.7.0 released** (critical MoE & speculative decoding) |
| **Ollama** | 187 | 9 | Upcoming v0.40.5 (Q2_0, MiniCPM-V 4.7 support) |
| **LiteLLM** | 76 | 14 | v1.107.0-dev.2 / v1.106.0-rc.4 (security hardened) |
| **Unsloth** | 68 | 16 | v0.1.908-beta (Nemotron 3.5 Bolt, Muse Spark Open) |

> ✅ *Key Insight:* **llama.cpp** leads in release velocity with a major v0.7.0 launch; **Ollama** shows strong momentum ahead of v0.40.5, while **vLLM/SGLang** remain in stabilization mode despite high activity.

---

#### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash (GB300)** | ✅ (low-latency decode path) | ✅ (8× SM120 PCIe) | ❌ | ⚠️ (in progress) | ❌ | ❌ |
| **NVIDIA Nemotron 3.5 ASR Streaming** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **NVIDIA Nemotron 3.5 Bolt (24GB)** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (v0.1.908-beta) |
| **Meta Muse Spark Open** | ✅ (pending FlashInfer) | ❌ | ✅ | ❌ | ❌ | ✅ (v0.1.908-beta) |
| **K2 Horizon (MoVA)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Prism** | ❌ | ❌ | ✅ | ✅ (via Q2_0 GGUF) | ❌ | ❌ |
| **GLM-5.3-Flash** | ⚠️ (FA4 crash on SM120) | ✅ (with Triton only) | ✅ | ✅ | ✅ | ❌ |

> 🏆 **Leaderboard**:  
> - **llama.cpp** and **Unsloth** lead in **new model coverage** (Muse Spark Open, K2 Horizon, Prism).  
> - **vLLM** leads in **high-performance hardware targeting** (GB300, SM90, ROCm gfx950).  
> - **Ollama** lags in model support but gains ground via `Q2_0 GGUF` and `MiniCPM-V 4.7`.

---

#### **4. Performance Frontier**

| Optimization Focus | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Prefix Caching** | 🔥 Fused Markov loops, PD disaggregation fixes | ⚠️ Stale KV in PD prefill | ✅ Host-memory MoE caching (`--moe-cache-mib`) | ⚠️ VRAM exhaustion with `--cache-prompt` | ⚠️ `request_id` reuse → spend log loss | ✅ Parallel chat KV preemption (`--preempt-ram`) |
| **Speculative Decoding** | 🔥 Low-latency `decode_backend=low_latency` | ⚠️ Degenerate loops in DFLASH | 🔥 LiliCorr + `draft-mtp` | ⚠️ GLM-5.3-Flash degeneration | ⚠️ Budget bypasses affect fairness | ❌ |
| **Quantization & Offloading** | 🔥 MXFP4 W4A16/W4A4 (ROCm) | ⚠️ Limited quant support | 🔥 Q1_0/Q2_0 via `gguf-py`, MoE offload | ✅ Q2_0 GGUF support | ⚠️ Silent cost tracking corruption | ✅ Selective MoE dequant (`UNSLOTH_MOE_SELECTIVE_DEQUANT=1`) |
| **Distributed Serving & Scaling** | 🔥 Pipeline parallelism (MoE R3), CUDA graphs | 🔥 Multi-GPU disaggregation (PD), HiCache | ⚠️ Draft-MTP halved speed on RTX 4090 | ⚠️ A100 bus loss, RTX 5090 crashes | ✅ Routing, retry logic, context widening | ✅ Auto GPU load balancing, `device_map="auto"` |
| **Kernel & Backend Efficiency** | 🔥 FA2 head-packed attention, MoE stride enforcement | 🔥 KDA kernel to SM90, deepstack eager capture | 🔥 Vulkan strided f16 KV copy | ⚠️ Metal segfault, CUDA illegal access | 🔥 Retry jitter, `Retry-After` honoring | 🔥 ROCm flash attention timing probe |

> 🔥 **Top Performers**:  
> - **vLLM**: Best-in-class attention and MoE optimization.  
> - **llama.cpp**: Leader in host memory offloading and quant flexibility.  
> - **Unsloth**: Strongest distributed and caching performance for agents.

---

#### **5. Layer Positioning**

| Project | Primary Layer | Key Differentiator |
|--------|---------------|--------------------|
| **vLLM** | **High-Performance Serving Engine** | Optimized for low-latency, high-throughput inference at scale; ideal for cloud API backends. |
| **SGLang** | **Agent-Centric Runtime + Gateway** | Built for complex, multi-turn agent workflows with rich control over tokenization, scheduling, and streaming. |
| **llama.cpp** | **Local Inference Runtime** | Lightweight, cross-platform, ideal for edge, desktop, and offline deployments with full CPU/GPU control. |
| **Ollama** | **Developer-Facing Gateway + CLI** | Simplifies local model deployment; bridges the gap between dev experience and production use. |
| **LiteLLM** | **Universal Gateway & Orchestration Layer** | Aggregates multiple backends (vLLM, Ollama, etc.) into a single API; critical for cost tracking and observability. |
| **Unsloth** | **Agent-Optimized Training + Serving Stack** | Combines fine-tuning (DeepSpeed), prompt caching, and efficient KV sharing—ideal for coding and reasoning agents. |

> 💡 **Strategic Insight**: The ecosystem is bifurcating: **specialized engines** (vLLM, SGLang) serve as backend powerhouses, while **gateways** (LiteLLM, Ollama) act as abstraction layers for developers and agents.

---

#### **6. Trend Signals**

**1. Agent-Native Execution Is Now the Benchmark**  
- Projects like **Unsloth** (parallel KV preemption), **SGLang** (toktier tokenizer), and **llama.cpp** (LiliCorr) are optimizing for **multi-step reasoning**, **tool calling**, and **context persistence**—not just throughput.  
- *Developer Watch*: Prioritize systems with **persistent session state**, **efficient cache sharing**, and **streaming reliability**.

**2. Hardware Specialization Is Accelerating**  
- **vLLM** and **SGLang** are deeply investing in **SM120 (Blackwell)** and **GB300** optimizations.  
- **ROCm** support is maturing across all projects—but with **instability risks** (e.g., AMD OOM crashes, silent CUDA IMA).  
- *Developer Watch*: Validate hardware-specific behavior early; avoid production on **RTX 5090/AMD RX 6750 XT** until fixes land.

**3. Quantization & Memory Offloading Are Mainstream**  
- **llama.cpp**’s `--moe-cache-mib` and **Unsloth**’s selective dequantization show that **host memory offloading** is no longer experimental—it’s essential for scaling MoE models.  
- *Developer Watch*: Use `Q2_0` and `MXFP4` schemes where possible for **lower memory footprint and faster inference**.

**4. Security & Observability Are Non-Negotiable**  
- **LiteLLM** now ships **cosigned Docker images**—a must for regulated environments.  
- Critical issues like **SpendLog data loss** and **budget enforcement bypasses** highlight the need for **audit-ready infra**.  
- *Developer Watch*: Enforce image signing, disable unauthenticated requests, and monitor `SpendLogs` rigorously.

---

### **Final Recommendation for Application Developers**  
Deploy **vLLM** for scalable cloud inference, **llama.cpp** for local/offline agent execution, and **LiteLLM** as your universal gateway. For agent-heavy workflows, **Unsloth** offers the most mature tooling stack. Always validate against **real hardware** before production—especially on **RTX 5090, AMD ROCm, and A100 PCIe**—and upgrade to **v0.40.5+ (Ollama)**, **v0.7.0 (llama.cpp)**, and **v1.106+/v1.107 (LiteLLM)** for stability and security.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-16**

---

### **1. Today's Highlights**  
The vLLM project continues its momentum in optimizing multimodal and MoE workloads, with critical performance improvements landing for AMD ROCm (gfx950/MI355X) and NVIDIA Hopper (sm90). Key PRs include a fix for Mamba2 NaN output on sm90 GPUs and a new low-latency decode path for DeepSeek-V4.1-Flash on GB300, enabling faster speculative decoding. Meanwhile, RFCs are advancing support for ViT CUDA graphs and standardized MonoKernels to improve engine extensibility.

---

### **2. Releases & Breaking Changes**  
No new releases were published in the last 24 hours. However, ongoing changes in the `main` branch may affect users relying on:
- `--mamba-block-size` (now ineffective after removal of `mamba_cache_mode="all"`, see [Issue #60838](https://github.com/vllm-project/vllm/issues/60838))
- MoE routing under pipeline parallelism (R3 support now being added via [PR #61897](https://github.com/vllm-project/vllm/pull/61897))

> ⚠️ **Migration Note**: Users upgrading from older vLLM versions should verify compatibility with model-specific flags like `--enforce-eager` when using `torch.compile`.

---

### **3. New Model & Hardware Support**  
- ✅ **New Model Support**:  
  - Added preliminary support for **NVIDIA Nemotron 3.5 ASR Streaming** (`nemotron-3.5-asr-streaming-0.6b`) via [PR #47455](https://github.com/vllm-project/vllm/pull/47455).  
  - Added **Muse Spark Open** model support via [PR #61879](https://github.com/vllm-project/vllm/pull/61879), dependent on FlashInfer PR #6544.

- ✅ **Hardware & Backend Advancements**:  
  - **ROCm (AMD gfx950 / MI355X)**: Performance optimization trackers launched for Qwen3.8-Flash-Next ([#59575](https://github.com/vllm-project/vllm/issues/59575)) and Qwen3.8-2.4T-A95B ([#57149](https://github.com/vllm-project/vllm/issues/57149)).  
  - **NVIDIA SM90**: Fixes applied to Mamba2 chunk scan kernel to prevent NaN outputs ([PR #61718](https://github.com/vllm-project/vllm/pull/61718)).

- ✅ **Quantization Formats**:  
  - Expanded test coverage for **MXFP4 W4A16/W4A4** quant schemes on ROCm via [PR #60886](https://github.com/vllm-project/vllm/pull/60886).

---

### **4. Performance & Optimization**  
- 🔥 **Low-Latency Decode Path**:  
  [PR #61868](https://github.com/vllm-project/vllm/pull/61868) introduces an opt-in low-batch decode path for **DeepSeek-V4.1-Flash** on **GB300**, leveraging fused Markov loops and post-forward CUDA graphs. Early benchmarks suggest significant latency reduction in speculative decoding scenarios.

- 🚀 **Attention Optimization**:  
  [PR #61784](https://github.com/vllm-project/vllm/pull/61784) improves FA2 attention for short queries over long cached contexts on SM8x GPUs (A100, RTX 30/40), reducing memory traffic via head-packed, KV-split attention kernels.

- ⚙️ **MoE & Kernel Fusion**:  
  - [PR #61749](https://github.com/vllm-project/vllm/pull/61749) enforces exact strides in MoE forward ops, resolving garbage output issues with `NVIDIA-Nemotron-3-Nano-30B-A3B-NVFP4`.  
  - [PR #51406](https://github.com/vllm-project/vllm/pull/51406) enables fused QK-norm+RoPE+gate Triton kernel for Qwen3-Next/Qwen3.5 on ROCm, improving throughput by eliminating redundant kernel launches.

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|--------|------|--------|------------|
| 🔴 High | **Mamba2 NaN output on sm90** ([#61603](https://github.com/vllm-project/vllm/issues/61603)) | Crashes or invalid outputs during generation | ✅ Fixed in [PR #61718](https://github.com/vllm-project/vllm/pull/61718) |
| 🔴 High | **Silent CUDA IMA (exit 0) on RTX 3090** ([#53726](https://github.com/vllm-project/vllm/issues/53726)) | Silent crashes under hybrid GDN + MTP k=3 + async scheduling | ❌ No fix yet; persists despite prior class fixes |
| 🟡 Medium | **Cross-request context contamination in PD disaggregation** ([#61160](https://github.com/vllm-project/vllm/issues/61160)) | Sensitive data leakage across requests via shared prefix cache | ⚠️ Reproducer exists; fix pending |
| 🟡 Medium | **LoRA on MLA kv_b_proj silently ignored** ([#48974](https://github.com/vllm-project/vllm/issues/48974)) | LoRA adapters fail to apply on models like DeepSeek V2/V3/R1 | ⚠️ Workaround: disable absorption |

---

### **6. What This Means for Application Developers**  
- **Use `--enforce-eager`** as a workaround for MoE models exhibiting garbage output when using `torch.compile` (e.g., Nemotron-3-Nano).
- **Avoid `--mamba-block-size`** if you’re using recent vLLM builds — it has no effect due to the deprecation of `mamba_cache_mode="all"`.
- **Enable low-latency decode paths** for DeepSeek-V4.1-Flash on GB300 via `decode_backend=low_latency` (opt-in feature in latest main).
- **Be cautious with prefix caching** in PD disaggregated setups: use `--no-enable-prefix-caching` to avoid cross-request contamination risks.
- **Monitor ROCm performance regressions** on gfx950/MI355X — while optimizations are underway, some models (e.g., Kimi K2.5) still show instability under high-KV-pressure workloads.

> 💡 **Pro Tip**: For production deployments, consider using [vLLM Simulator](https://github.com/vllm-project/vllm/issues/61406) (RFC) to simulate hardware-aware performance before deploying on real clusters.

---  
*Data source: [vLLM GitHub Repository](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-10-16

---

### **1. Today's Highlights**

The SGLang project continues to advance its support for next-generation hardware, with critical performance and stability improvements targeting NVIDIA Blackwell (SM120) systems and multi-GPU disaggregation workflows. Key developments include a new `toktier` tokenizer backend proposal for CPU-based incremental tokenization and a flurry of CI/infrastructure fixes addressing flaky tests and storage prefetch timeouts.

---

### **2. Releases & Breaking Changes**

- **None**  
  No new releases were published in the last 24 hours. The latest stable version remains `v0.5.20`, as per the `lmsysorg/sglang:v0.5.20` Docker image referenced in field reports.

---

### **3. New Model & Hardware Support**

- **NVIDIA RTX PRO 6000 (SM120)**: Field validation confirmed successful production deployment of **DeepSeek-V4.1-Flash** on **8× SM120 GPUs (PCIe-only, no NVLink)**, with measured prefill/decode throughput reported in #40877.
- **AMD ROCm Support**: Five multimodal unit tests made ROCm-aware in PR #44599, advancing compatibility with MI300 platforms.
- **New Tokenizer Backend Proposal**: RFC #44374 introduces an opt-in `toktier` backend for exact, chunk-parallel, CPU-based tokenization—ideal for low-latency preprocessing pipelines.

> 🔗 [RFC: Opt-in toktier tokenizer](https://github.com/sgl-project/sglang/issues/44374)

---

### **4. Performance & Optimization**

- **Unified Memory Prewarming**: PR #44592 improves startup latency by prewarming compaction moves in unified memory pools, reducing first-use overhead during serving.
- **KV Packing for Heterogeneous TP**: PR #44615 enables efficient KV packing across TP-heterogeneous transfers, enhancing scalability in mixed-architecture setups.
- **CUDA Graph Optimization**: PR #44607 ensures deepstack media prefills are kept eager in CUDA graphs, fixing replay issues for vision-language models like Qwen3-VL.
- **KDA Kernel Extension**: PR #44612 extends the CuTe DSL MTP verify kernel to **SM90 (Hopper)**, enabling broader GPU compatibility for Kimi Delta Attention.
- **Diffusion Runtime Optimization**: PR #44606 defers full GC collections during diffusion pipeline imports, cutting import-time overhead by ~30% in high-module-count scenarios.

> 🔗 [PR: Unified memory prewarm](https://github.com/sgl-project/sglang/pull/44592)  
> 🔗 [PR: KDA kernel to SM90](https://github.com/sgl-project/sglang/pull/44612)  
> 🔗 [PR: Diffusion GC optimization](https://github.com/sgl-project/sglang/pull/44606)

---

### **5. Stability & Regressions**

| Severity | Issue | Summary | Fix Status |
|---------|-------|--------|------------|
| ⚠️ High | #42752: Flaky CI / Infrastructure Failures | Recurring failures in `PR Test Base/Extra` runs due to unstable CI infrastructure; impacts PR review velocity. | In progress — tracked via #17050 |
| ⚠️ High | #42012: GLM-5.3-Flash crashes at CUDA-graph capture | FA4 attention backend fails on hybrid extend reshape on SM120; only Triton works. | No fix yet — requires upstream kernel tuning |
| ⚠️ High | #40843: Severe repetition in reasoning output with DFLASH | GLM-5.3-Flash enters degenerate loops under speculative decoding (`dflash`). | No fix yet — regression from recent AITER changes |
| ⚠️ Medium | #44070: Stale KV in PD prefill with early cached-prefix send | Early transfer can race with HiCache load-back, leading to silent decode errors. | Fix pending — issue is reproducible |
| ⚠️ Medium | #44369: NIXL PD abort leaves workers blocked | Aborted requests leave transfer workers waiting on healthy handles, causing deadlock. | No fix yet — high risk in production |

> 🔗 [Flaky CI tracker](https://github.com/sgl-project/sglang/issues/42752)  
> 🔗 [GLM-5.3-Flash FA4 crash](https://github.com/sgl-project/sglang/issues/42012)  
> 🔗 [Stale KV in PD prefill](https://github.com/sgl-project/sglang/issues/44070)

---

### **6. What This Means for Application Developers**

- **Use `toktier` (opt-in)** for deterministic, low-latency CPU tokenization in agent pipelines where GPU offload isn’t feasible or desired.
- **Avoid `fa4` attention on SM120** until #42012 is resolved—stick with **Triton** backend for GLM-5.3-Flash and DeepSeek-V4.1-Flash.
- **Disable `early_cached_prefix_send`** if using HiCache with PD disaggregation until #44070 is patched—risk of stale KV corruption exists.
- **Monitor CI health**—ongoing flakiness (#42752) may delay merges and testing; expect delays in PR reviews.
- **Prepare for AMD support**—ROCm-aware tests now pass, but full production readiness awaits further validation.

> 💡 Pro Tip: For high-throughput agents using complex tooling with GLM-5.3-Flash, consider disabling speculative decoding temporarily until #40843 is fixed.

---  
*Digest generated from GitHub data: sgl-project/sglang | 2026-10-16*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-16**

---

### **1. Today's Highlights**  
The `v0.7.0` release introduces **LiliCorr speculative decoding** and **MTP (Multi-Threaded Profiling) for GLM5-Next**, enabling up to **~2.2x decode speedup** when MoE experts are offloaded to host memory via `--moe-cache-mib`. New model support includes **Muse Spark Open** (text, vision, audio), **K2 Horizon (dense & MoVA)**, and **Prism**, expanding multimodal and high-efficiency inference capabilities.

---

### **2. Releases & Breaking Changes**  
- **v0.7.0** released: [GitHub Release](https://github.com/ggml-org/llama.cpp/releases/tag/v0.7.0)  
  - Introduces `--moe-cache-mib` to cache MoE experts in host memory (up to ~2.2x speedup).  
  - Adds `--moe-cache-topk` to cap active experts in host-cached layers (PR #30593).  
  - **Breaking Change**: Combined `draft-mtp` + external draft (`-md`) now requires explicit MTP context handling; init crashes previously reported in #27839 are addressed in PR #27897.

---

### **3. New Model & Hardware Support**  
- **Models Added**:  
  - **Muse Spark Open** (latent-space MoE with 256 experts at 4096 dim, residual stream at 8192): [PR #30616](https://github.com/ggml-org/llama.cpp/pull/30616)  
  - **K2 Horizon (dense & MoVA)**: Supports multimodal reasoning with visual/audio inputs.  
  - **Prism**: New open model added to the ecosystem.  
  - **maion-coder**: Added support for code generation models (PR #29778).  

- **Hardware & Backend Updates**:  
  - **Metal**: BF16 variant of flash attention kernel added ([PR #30491](https://github.com/ggml-org/llama.cpp/pull/30491)).  
  - **Vulkan**: Improved strided f16 KV copy spread across AMD memory channels ([PR #27703](https://github.com/ggml-org/llama.cpp/pull/27703)).  
  - **Hexagon**: Rewritten tensor repacking with support for tiled/flat quantized and FP weights ([PR #30635](https://github.com/ggml-org/llama.cpp/pull/30635)).

---

### **4. Performance & Optimization**  
- **MoE Offloading**: `--moe-cache-mib` enables host memory caching of MoE experts, reducing PCIe traffic and improving decode throughput by **up to ~2.2x** on models like GLM5-Next.  
- **Speculative Decoding**: LiliCorr technique improves speculative draft efficiency; `--spec-type draft-mtp` now supports full integration with external drafts via `-md` (fixes #27839).  
- **Kernel Optimizations**:  
  - Vulkan: Strided f16 KV copy optimized for memory channel spreading ([PR #27703](https://github.com/ggml-org/llama.cpp/pull/27703)).  
  - SYCL: Crash fix for IQ3 quantization in `llama_sampler_dist_apply` (PR #30604).  
- **Quantization**: Q1_0 and Q2_0 support added to `gguf-py` (PRs #30620, #30630), enabling numpy-based dequantization.

---

### **5. Stability & Regressions**  
- **Critical Issues**:  
  - **#27428** (CUDA/Multi-GPU): Draft-MTP halves prompt processing speed under layer-split scenarios — unresolved, but reported on RTX 4090.  
  - **#30610** (Metal): Segfault in `ggml_metal_op_mul_mat_id` with Nemotron 3.5 Bolt 74B-A9B — likely related to Metal kernel launch bounds.  
  - **#30577** (llama-server): VRAM exhaustion DoS via `--cache-prompt` — server fails to reclaim memory after idle slot restores.  
- **Moderate Issues**:  
  - **#29418** (Vulkan): `GGML_ASSERT(neq0 == HSK)` failure during MTP speculative decoding with tensor split — reported on gfx1151.  
  - **#30617** (Conversion): Granite Switch block_count written too high — causes load failure (fixed in PR #30621).  
- **Fixes in Progress**:  
  - PR #27897 addresses crash in combined `draft-mtp + -md` init.  
  - PR #30621 fixes Granite Switch conversion error.

---

### **6. What This Means for Application Developers**  
- **Use `--moe-cache-mib`** to dramatically improve MoE inference latency on systems with ample RAM, especially for large models like GLM5-Next or Qwen3-Coder.  
- **Enable LiliCorr speculative decoding** (`--spec-type draft-mtp`) for faster, lower-latency completions — ideal for agent workflows.  
- **Avoid `--cache-prompt` with high concurrency** until #30577 is resolved; consider disabling prompt caching in production if memory pressure is observed.  
- **For multi-device setups**, test with Vulkan on AMD GPUs carefully — known issues with long prompts and device loss (#30364, #29418).  
- **Leverage new model support** (Muse Spark Open, K2 Horizon) for multimodal agents; ensure your pipeline handles `reasoning_content` vs `content` output correctly (see #30246).  
- **Update build scripts** to include Q1_0/Q2_0 support via `gguf-py` (PR #30630) for flexible quantization workflows.

> 🔗 Full changelog: [GitHub v0.7.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.7.0)  
> 📊 Active issues: [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **Ollama Digest — 2026-10-16**

#### **1. Today's Highlights**  
A critical regression in `glm-5.3-flash:cloud` causing massive text degeneration (repeating "the = the =") has been reported by users since October 12, with evidence pointing to a cluster data corruption issue. Meanwhile, multiple stability issues have emerged on new hardware—RTX 5090 CUDA crashes, ROCm OOM segfaults on RX 6750 XT, and A100 PCIe bus loss during warm-up—highlighting growing complexity in GPU backend support. The community continues to push for better tooling parity (e.g., `OLLAMA_NUM_PARALLEL` for MLX) and UX improvements like chat folders and reasoning toggle controls.

#### **2. Releases & Breaking Changes**  
*None*  
No new releases were published in the last 24 hours. However, **v0.40.5** is expected to include crucial fixes from PRs #18967 (Q2_0 GGUF support) and #19032 (llama.cpp b11669 bump), which will enable Q2_0 quantization and fix MiniCPM-V 4.7 loading failures.

#### **3. New Model & Hardware Support**  
- ✅ **MiniCPM-V 4.7**: PR #19024 updates llama.cpp to b11551, resolving the `unknown projector type: minicpmv4_7` error. [PR #19024](https://github.com/ollama/ollama/pull/19024)  
- ✅ **Q2_0 GGUF**: Support added via PR #18967 to handle tensor type 42/file type 41, enabling use of low-precision models like Prism ML’s Bon. [PR #18967](https://github.com/ollama/ollama/pull/18967)  
- 🚩 **RTX 5090 (CUDA)**: Persistent illegal memory access (`MUL_MAT`) crashes when running Cohere MoE models. [Issue #18642](https://github.com/ollama/ollama/issues/18642)  
- 🚩 **ROCm (AMD)**: `gemma4:26b-a4b` fails due to hipGraphInstantiate OOM errors when offloading layers to CPU; disabling graphs (`GGML_CUDA_DISABLE_GRAPHS=1`) avoids crash. [Issue #19015](https://github.com/ollama/ollama/issues/19015)  
- 🚩 **A100 PCIe Bus Loss**: Repeated bus loss observed during Qwen3.5 inference on v0.34.4 and v0.35.0 despite rollback. [Issue #19006](https://github.com/ollama/ollama/issues/19006)

#### **4. Performance & Optimization**  
- 🔧 **MLX Engine Limitation**: Sequential request handling persists despite `OLLAMA_NUM_PARALLEL`, blocking true concurrency on Apple Silicon. Feature request #17280 seeks batched decode support. [Issue #17280](https://github.com/ollama/ollama/issues/17280)  
- ⚠️ **CPU Throttling Collapse**: Default `n_threads` ignores cgroup CPU quotas and cpuset limits, leading to ~45x throughput drop in containerized environments. [Issue #17916](https://github.com/ollama/ollama/issues/17916)  
- 💡 **GGUF v4 Improvements**: PR #19037 adds 64KB DMA page alignment and O(1) token span seek for zero-copy tensor mapping—critical for rapid model inspection and high-throughput inference. [PR #19037](https://github.com/ollama/ollama/pull/19037)  
- ⏱️ **Slower Text Classifiers**: Users report degradation in response time post-v0.40.4 for `nimble`, `clef-flash`, and `tev1`. [Issue #19002](https://github.com/ollama/ollama/issues/19002)

#### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|---------|------|--------|------------|
| Critical | `glm-5.3-flash:cloud` degeneration (massive repetition) | 5–8% failure rate; cluster data corruption suspected | [Issue #18980](https://github.com/ollama/ollama/issues/18980) |
| Critical | RTX 5090 CUDA illegal memory access (MUL_MAT) | Server crash on Windows; blocks MoE model use | [Issue #18642](https://github.com/ollama/ollama/issues/18642) |
| High | A100 PCIe bus loss during Qwen3.5 warm-up | System reboot, persistent across versions | [Issue #19006](https://github.com/ollama/ollama/issues/19006) |
| High | ROCm OOM + segfault on `gemma4:26b-a4b` with CPU offload | Unusable under load; workaround exists | [Issue #19015](https://github.com/ollama/ollama/issues/19015) |
| Medium | Native `/api/chat` returns empty tools, `tool_calls` never emitted | Breaks agent tooling integration | [Issue #19040](https://github.com/ollama/ollama/issues/19040) |
| Medium | Go API loses numeric precision in tool-call arguments | Data corruption in downstream agents | [Issue #18942](https://github.com/ollama/ollama/issues/18942) |

#### **6. What This Means for Application Developers**  
- **Avoid v0.40.4+ if latency-sensitive**: Recent regressions in text classifier performance may impact real-time applications. Monitor `#19002` for resolution.  
- **Use `GGML_CUDA_DISABLE_GRAPHS=1` on ROCm**: Until PR #19015 is fixed, disable graph compilation to prevent segfaults on AMD GPUs.  
- **Disable thinking mode via UI?** The feature is available CLI-side but missing in the UI—track [Issue #16016](https://github.com/ollama/ollama/issues/16016) for future control.  
- **Tooling reliability**: Be cautious with `/api/chat` tool definitions—empty `tools` payloads are confirmed broken. Use `/v1/chat` as workaround until [PR #19040](https://github.com/ollama/ollama/issues/19040) is merged.  
- **Future-proofing**: With Q2_0 GGUF and MiniCPM-V 4.7 now supported, consider upgrading to v0.40.5 for improved model availability and lower memory footprint.  

> *Note: Ollama Cloud users should test `mistral-large-4` with `system` role instead of `developer` until [Issue #19021](https://github.com/ollama/ollama/issues/19021) is addressed.*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-16**

---

### **1. Today's Highlights**  
The LiteLLM project continues to strengthen its security and observability posture with verified Docker image signing via cosign, ensuring trust in production deployments. Critical fixes are underway for high-impact issues including budget enforcement bypasses, silent spend log corruption due to ID reuse (Ollama), and incorrect handling of Anthropic’s `reasoning_content` and `detail` fields in multimodal responses—issues affecting both cost tracking and agent reliability.

---

### **2. Releases & Breaking Changes**  
- **v1.107.0-dev.2** and **v1.106.0-rc.4** released with enhanced security: all Docker images now signed using [cosign](https://docs.sigstore.dev/cosign/overview/) via the same key introduced in [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
- **Migration Note**: Users relying on unsigned images should update their CI/CD pipelines to verify signatures before deployment. No breaking API changes were introduced in these releases.

---

### **3. New Model & Hardware Support**  
No new model or hardware backends added today. However, ongoing work improves compatibility with:
- **Anthropic Claude Code** (`claude-4.6`, `per-turn-control-2026-07-01`) via Bedrock passthrough.
- **Databricks-hosted gpt-5.6 family models** (`gpt-5.6-sol/luna/terra`) with better tool calling support (see #43708).
- **Self-hosted vLLM/OpenAI-compatible `/v1/responses`** endpoints now correctly handle reasoning and compaction blocks (#46754).

---

### **4. Performance & Optimization**  
- **Latency & Throughput**: PRs focused on retry logic and request routing efficiency:
  - [#46730](https://github.com/BerriAI/litellm/pull/46730): Now honors `Retry-After` headers and applies exponential backoff with jitter, reducing unnecessary retries on transient failures.
  - [#46197](https://github.com/BerriAI/litellm/pull/46197): Correctly widens context window when `base_model` matches exactly, resolving router mismatches.
- **CLI Startup Time**: PR [#46803](https://github.com/BerriAI/litellm/pull/46803) reduces `lite` command startup from ~4s to <1s by skipping full SDK initialization—critical for low-resource environments.

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|--------|-------|--------|------------|
| ⚠️ High | [#46403](https://github.com/BerriAI/litellm/issues/46403): Ollama `request_id` reuse causes silent SpendLogs row drops | Up to 46% spend data loss; affects billing accuracy | In progress (PR #46754 addresses related compaction logic) |
| ⚠️ High | [#26672](https://github.com/BerriAI/litellm/issues/26672): Budget enforcement bypassed in v1.82.3 | Free models accessible beyond budget limits | Patch pending; confirmed in RC builds |
| ⚠️ Medium | [#46407](https://github.com/BerriAI/litellm/issues/46407): EU data-residency uplift missing for `gpt-image-2.5-flare` | Incorrect cost tracking for EU-region usage | PR pending |
| ⚠️ Medium | [#32357](https://github.com/BerriAI/litellm/issues/32357): Anthropic SDK receives malformed `thinking_delta` in streaming | Empty content in Claude Code output | PR #46764 fixes body param filtering |
| 🔴 Critical | [#25429](https://github.com/BerriAI/litellm/issues/25429): `chatgpt/gpt-5.4` returns empty final response | Breaks agent workflows using GPT-5.4 | Closed; fix expected in next release |

---

### **6. What This Means for Application Developers**  
- **Security & Compliance**: Always verify Docker image signatures using cosign—especially in regulated or production environments. Use `v1.106.0-rc.4` or later for trusted builds.
- **Cost Accuracy**: Be cautious with unauthenticated requests—[#42689](https://github.com/BerriAI/litellm/issues/42689) shows malicious clients can inflate usage tables. Enforce strict auth and disable `disable_end_user_cost_tracking` if not needed.
- **Agent Development**: For agents using multi-turn tool calling or reasoning models (e.g., Moonshot, Claude Code), ensure you’re on `v1.107.0-dev.2` or later—fixes for `reasoning_content` and `thinking_delta` are critical for correct behavior.
- **Infrastructure Tuning**: Reduce CLI latency by switching to the new `litellm_cli` package (via PR #46803). Also consider tuning `PROXY_WORKER_HEARTBEAT_INTERVAL_SECONDS` to avoid idle DB suspension (#45540).

> ✅ **Recommended Action**: Upgrade to `v1.106.0-rc.4` or `v1.107.0-dev.2` immediately if using budgeting, cost tracking, or Anthropic/Claude Code integrations. Monitor for regression in `SpendLogs` and `DailyEndUserSpend` tables until PR #46754 lands.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-16**

---

### **1. Today's Highlights**  
Unsloth v0.1.908-beta introduces support for NVIDIA’s Nemotron 3.5 Bolt (24GB VRAM) and Meta’s Muse Spark Open, enabling local inference of cutting-edge LLMs with new text-diffusion capabilities. Key improvements include DeepSpeed training integration and enhanced prompt caching for coding agents, accelerating agent-based workflows.

---

### **2. Releases & Breaking Changes**  
- **v0.1.908-beta**: Official release adding support for **NVIDIA Nemotron 3.5 Bolt** and **Meta Muse Spark Open**, with experimental **text-diffusion LLM** capabilities.  
  - [Release Notes](https://github.com/unslothai/unsloth/releases/tag/v0.1.908-beta)  
  - Includes: DeepSpeed training, improved prompt caching for coding agents, and better model loading via `load_in_4bit` control in Studio UI.  
  - *Note:* No breaking API changes reported; backward compatibility preserved.

---

### **3. New Model & Hardware Support**  
- **Models Added**:  
  - **NVIDIA Nemotron 3.5 Bolt** (24GB VRAM requirement) – [Guide](https://unsloth.ai/docs/models/nemotron3.5)  
  - **Meta Muse Spark Open** – First open-weight model from Meta’s Spark series, supports multimodal input via text-diffusion.  
- **Hardware & Backend**:  
  - Improved **AMD Strix Halo APU** support on Windows via Vulkan backend (though prefill performance remains suboptimal).  
  - Enhanced **ROCm** detection logic for gfx115x APUs and MIG-enabled GPUs (`CUDA_VISIBLE_DEVICES=MIG-<uuid>` now properly respected).  
  - **FLUX.3 Image Klein** (distilled/base) now supported in Studio with INT8/FP8/GGUF formats via PR #13933.  

---

### **4. Performance & Optimization**  
- **Multi-GPU Load Balancing**: PR #13928 ensures automatic image/video loads pick the freest GPU, respecting per-card capacity constraints.  
- **MoE Quantization**: PR #13946 enables selective dequantization of bnb 4-bit MoE experts (`UNSLOTH_MOE_SELECTIVE_DEQUANT=1`) without interference from `torch.compiler`.  
- **KV Cache Sharing**: PR #10301 advances **parallel chat KV preemption** via `llama-server --preempt-ram`, allowing multiple sessions to share a single cache—reducing memory overhead by up to 70% in high-concurrency scenarios.  
- **Attention Selection**: PR #13792 improves ROCm flash attention selection by timing probe instead of relying on model-family tables, improving performance across non-FLUX models.

---

### **5. Stability & Regressions**  
- **Critical**:  
  - **PR #13638**: CUBLAS error during image editing with Qwen-Image-2.1 due to improper tensor handling in `diffusion_prompt_cache.py`. *(Fix pending)*  
  - **PR #13663**: File embedding fails at indexing stage with `unsloth/embeddinggemma-2`. *(Issue closed; fix likely in pipeline)*  
- **Moderate**:  
  - **PR #13656**: Failure to enable Windows MXC Sandbox with unclear instructions — impacts secure execution environments.  
  - **PR #10656**: AMD Strix Halo defaults to Vulkan, causing extremely slow prefill despite faster overall inference. *(Workaround: manual backend override)*  
- **Minor**:  
  - **PR #13942**: Unrestricted `ffmpeg`/`pandoc` writes outside sandbox without confirmation. *(Fix in progress)*

---

### **6. What This Means for Application Developers**  
- **Agent Development**: With **text-diffusion** and **better prompt caching**, Unsloth is now viable for complex, multi-step coding agents requiring consistent context management.  
- **Multi-GPU Workloads**: Use `--preempt-ram` with `llama-server` and `device_map="auto"` to scale inference across 2+ GPUs efficiently. Monitor `UNSLOTH_DEBUG_DISTRIBUTED` for debugging distributed issues.  
- **Model Customization**: The ability to toggle `load_in_4bit` in Studio UI (per Issue #5639) allows stricter precision control for training/retrieval pipelines.  
- **Deployment Flexibility**: Expect improved support for offline installers (Issue #5835) and portable `.gz` bundles (Issue #6559), critical for air-gapped or restricted-network deployments.  

> ✅ **Actionable Tip**: For AMD users, avoid prebuilt ROCm wheels if encountering OOM errors—build from source or use `hipinfo`-filtered targets (PR #13925).

---  
*Data Source: GitHub – unslothai/unsloth | Updated: 2026-10-16*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*