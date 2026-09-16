# AI Infrastructure Digest 2026-09-16

> Generated: 2026-09-16 00:44 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

---

### **Cross-Project AI Infrastructure Comparison Report – 2026-09-16**

---

#### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *deep specialization and hardware convergence*, with projects increasingly diverging by target layer (serving, local runtime, gateway, training) while converging on next-gen hardware support—especially NVIDIA Blackwell, AMD ROCm MI355X, Intel XPU Arc Pro B70, and Apple Silicon. Critical focus areas include speculative decoding robustness, long-context efficiency via ultra-low-precision KV caching (e.g., vLLM’s `ultraquant_4bit`), and distributed memory management for MoE models. The rise of hybrid architectures (Mamba/GDN, SWA/SSM) and structured reasoning workflows underscores a shift toward agent-centric design.

---

#### **2. Activity Comparison**  

| Project       | Issues Open | PRs Merged (Last 24h) | Release Status       |
|---------------|-------------|------------------------|-----------------------|
| **vLLM**      | 284         | 12                     | None                  |
| **SGLang**    | 198         | 8                      | None                  |
| **llama.cpp** | 342         | 14                     | Builds: b10991, b10985 |
| **Ollama**    | 167         | 5                      | v0.34.2-rc0 (RC)      |
| **LiteLLM**   | 149         | 6                      | v1.101.0 (Stable)     |
| **Unsloth**   | 213         | 7                      | None                  |

> ✅ **Insight**: *llama.cpp* leads in low-level activity, while *LiteLLM* stands out with a stable, security-hardened release. *vLLM* maintains high engineering velocity despite no new releases.

---

#### **3. Model Support Race**  

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1**        | ✅ (PRs) | ✅ (merged) | ❌ | ❌ | ❌ | ❌ |
| **Kimi-K3**              | ✅ (optimization) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.5 / Qwen3.8**    | ✅ (ROCm/MoE) | ✅ (HiCache config) | ✅ (OOM issues) | ⚠️ (IQ3_S bug) | ❌ | ⚠️ (infinite loop) |
| **Gemma 4 Tool Calls**   | ❌ | ❌ | ❌ | ✅ (PR #18471) | ❌ | ❌ |
| **SenseNova-U1/U1.5**    | ❌ | ✅ (tracking) | ❌ | ❌ | ❌ | ❌ |
| **Gemma 4 26B A4B**      | ❌ | ❌ | ✅ (OOM) | ❌ | ❌ | ✅ (OOM) |
| **NVFP4 / MXFP4**        | ✅ (MoE) | ✅ (dsv4.1) | ✅ (Flash Attention) | ❌ | ❌ | ✅ (benchmarking) |

> 🏆 **Winner**: **SGLang** — most comprehensive model support for cutting-edge architectures (dsv4.1, HiCache-ready Qwen3.5).  
> 🥈 **Runner-up**: **vLLM** — strongest MoE + ROCm + speculative decoding integration.  
> ⚠️ **Caution**: Unsloth and Ollama face serious stability issues with Qwen3 fine-tuning and tool parsing respectively.

---

#### **4. Performance Frontier**  

| Optimization Focus          | vLLM               | SGLang             | llama.cpp           | Ollama            | LiteLLM             | Unsloth             |
|------------------------------|--------------------|--------------------|---------------------|-------------------|---------------------|---------------------|
| **KV Cache Efficiency**      | ✅ `ultraquant_4bit` (2× density) | ✅ HiCache L2/L3 metrics | ✅ Sparse Flash Attention | ✅ Vulkan optimization | ❌ | ❌ |
| **Batching & Invariance**    | ✅ `VLLM_BATCH_INVARIANT=1` | ❌ (latency regression) | ❌ (divergence issue) | ❌ | ✅ (aggregation key-free) | ❌ |
| **Quantization**             | ✅ AWQ fusion, FP4/E2M1 | ✅ NVFP4, FP8 matmul | ✅ Q4_K_M, RPC hash-cache | ✅ IQ3_S, e4b | ❌ | ✅ NVFP4 kernel test |
| **Distributed Serving**      | ✅ MoE offloading (LFRU) | ✅ PD-disaggregated decode | ❌ | ❌ | ✅ (cost-based routing) | ❌ |
| **Kernel-Level Tuning**      | ✅ Triton 3.8, expanding `ldmatrix` | ✅ CuTe DSL transpose (~3× speed) | ✅ HIP MMQ pipelining, SM70 crossover | ✅ CUDA payload deduplication | ❌ | ✅ Portable NVFP4 check |

> 🔥 **Hotspot**: *vLLM* dominates in **distributed inference** and **hardware-specific kernels**, while *SGLang* leads in **memory hierarchy observability** and **kernel co-design**.

---

#### **5. Layer Positioning**  

| Project       | Primary Layer                | Secondary Role                    | Key Differentiator                                  |
|---------------|------------------------------|-----------------------------------|----------------------------------------------------|
| **vLLM**      | **Inference Engine**         | Model Serving, MoE orchestration  | Best-in-class multi-GPU scalability & spec-dec robustness |
| **SGLang**    | **Low-Level Runtime**        | Distributed inference, cache tuning | Unified radix cache, HiCache, kernel observability |
| **llama.cpp** | **Local Inference Runtime**  | Cross-platform deployment         | Broadest backend support (Hexagon, Vulkan, SYCL) |
| **Ollama**    | **Agent-Focused Gateway**    | Local model orchestration         | Structured output + tool call integration for agents |
| **LiteLLM**   | **Production LLM Gateway**   | Cost control, guardrails, observability | Team-level spend caps, secure Docker images (cosign) |
| **Unsloth**   | **Fine-Tuning + Studio Stack** | Local model management, RLHF     | GRPOTrainer for multimodal RL, macOS Metal fixes |

> 💡 **Strategic Insight**: *vLLM/SGLang* are building the future of **high-performance distributed serving**; *Ollama/LiteLLM* are shaping the **agent development stack**; *llama.cpp* remains the **universal local runtime**.

---

#### **6. Trend Signals**  

**Key Industry Trends Extracted from Today’s Activity:**  
1. **Long-Context Dominance**: Ultra-low-precision KV cache (e.g., vLLM’s `ultraquant_4bit`) is now a core competitive differentiator—critical for agentic workflows and RAG.  
2. **Hybrid Architectures Are Mainstream**: Mamba/GDN, SWA/SSM, and MoE hybrids are no longer experimental—projects are investing heavily in correctness and performance (e.g., SGLang’s unified radix cache, vLLM’s prefix caching fixes).  
3. **Speculative Decoding Stability Is Fragile**: Multiple crashes (vLLM, SGLang, llama.cpp) indicate that speculative decoding remains a high-risk path—developers should **enable `--enforce-eager` as a fallback** until PRs land.  
4. **Security & Compliance Are Non-Negotiable**: LiteLLM’s signed Docker images (cosign) signal a shift toward **production-grade trust** in open-source infrastructure.  
5. **Local vs. Cloud Tradeoffs Are Sharpening**: Projects like Ollama and Unsloth emphasize local execution resilience (offline caching, memory budgeting), while LiteLLM and vLLM optimize for cloud-scale cost control.

> 📌 **Action for Developers**:  
> - Use **vLLM + UltraQuant 4-bit** for long-context, high-throughput inference.  
> - Choose **SGLang** for large-scale, low-latency distributed serving with hybrid models.  
> - Deploy **Ollama + LiteLLM** for agent applications requiring structured outputs and cost tracking.  
> - Avoid **Qwen3 fine-tuning in unsloth v2025.7.1+** and **DIO mode on Jetson Orin Nano** until patches land.  
> - Monitor **speculative decoding stability** closely—especially on newer GPUs (B200/B300, H200).

--- 

*Report generated: 2026-09-16 | Source: GitHub project digests*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-16**

#### **1. Today's Highlights**
The vLLM project continues to accelerate its focus on **multi-GPU scalability**, **speculative decoding robustness**, and **hardware-specific optimizations**, particularly for AMD ROCm, Intel XPU, and next-gen NVIDIA architectures (B200/B300). Key developments include a new **UltraQuant 4-bit KV cache backend** for long-context inference and critical bugfixes addressing **batch invariance corruption under speculative decoding** and **prefix caching failures in hybrid Mamba/GDN models**.

#### **2. Releases & Breaking Changes**
None. No new releases or breaking changes were published in the last 24 hours.

#### **3. New Model & Hardware Support**
- **UltraQuant 4-bit KV Cache Backend (PR #57057)**: Adds support for `ultraquant_4bit` dtype (FP4 E2M1 with UE8M0 per-group scales, Hadamard-rotated keys), enabling **~2× higher KV cache density than FP8**—critical for agentic and long-context serving.
- **ROCm Support Expansion**: New CI staging for MI300/MI355 single-GPU groups (PR #57080), and enhanced MoE support for **gpt-oss and DeepSeek-V4** via Triton 3.8 API (PR #55934).
- **Intel XPU Fixes**: Bugfixes for Qwen2-Audio audio-length limits (PR #56912) and WNA16 MoE offloading behavior (PR #57008), improving stability on Arc Pro B70.
- **Kimi-K3 Optimization**: Reduced DSpark launch overhead via eager fallbacks and graph-safe context capture (PR #57048).

#### **4. Performance & Optimization**
- **AWQ Fusion (PR #57047)**: Fuses AWQ dequantization + GEMM for W4A16 on SM89 under `VLLM_BATCH_INVARIANT=1`, eliminating full weight materialization—improves batch-invariant throughput.
- **MoE Expert Offloading (RFC #38256)**: Incremental GPU cache + async pipeline enables running large MoE models (e.g., >120B) on smaller hardware via CPU-pinned memory and LFRU eviction.
- **Kernel-Level Optimizations**:
  - Marlin W4A8 now uses expanding `ldmatrix` (PR #50096), better leveraging PTX 9.4.
  - Triton kernels updated for mxfp4 MoE (PR #55934), reducing dispatch overhead.
- **Precision Scheduler Rollout (PR #57093)**: Adapts precision scheduling for pro6000-class hardware, improving resource utilization.

#### **5. Stability & Regressions**
- **Critical Batch Invariance Breakage (Issue #56370)**: Enabled SP + async TP (`VLLM_BATCH_INVARIANT=1`) causes non-deterministic output; **fixed by PR #57092** (online FP8 MoE experts now batch-invariant).
- **Prefix Caching Corruption (Issue #53912)**: Hybrid Mamba/GDN models fail with prefix caching + MTP; **PR #52244** restores correct behavior.
- **Speculative Decoding Crashes (Issue #56443)**: CUDA device-side assert in `map_draft_to_target` during DSpark warmup on H200 (SM90); no fix yet.
- **Silent Output Corruption (Issue #53480)**: Intel XPU emits endless "!" tokens under sustained load; **no fix available**.
- **KV Cache Integrity (Issue #54363)**: Filesystem tier lacks I/O liveness checks—risk of silent data loss; **tracking RFC in progress**.

#### **6. What This Means for Application Developers**
- **Use `ultraquant_4bit`** for long-context applications where KV cache is the bottleneck—expect ~2× reduction in VRAM usage.
- **Avoid `VLLM_BATCH_INVARIANT=1` with MoE + FP8** until PR #57092 lands—output may be non-deterministic across batches.
- **Enable `--offload-backend uva`** cautiously on XPU: verify memory pressure reduction manually (Issue #57008 shows it may not reduce peak VRAM for compressed-tensors MoE).
- **Monitor speculative decoding stability** on hybrid models (Qwen3.8, Kimi-K3) and newer GPUs (B200/B300)—use `--enforce-eager` as a workaround if needed.
- **Prefer `--otlp-traces-endpoint` only with manual span emission**—the tracer currently initializes but never sends spans (Issue #56696).

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-16**

---

### **1. Today’s Highlights**  
The SGLang project continues to accelerate its low-level kernel and infrastructure refinements for next-gen inference on Blackwell and ROCm platforms. Key developments include the stabilization of DeepSeek-V4.1 kernels with Hopper FP8 matmul support, a major fix for HiCache hybrid cache restore promises, and ongoing work to unify radix cache behavior across backends. Critical CUDA coredump tracking (#26340) remains active, signaling persistent stability challenges in high-concurrency environments.

---

### **2. Releases & Breaking Changes**  
*None*  
No new releases were published in the past 24 hours. No breaking API or config changes were introduced.

---

### **3. New Model & Hardware Support**  
- **SenseNova-U1/U1.5**: Tracking issue #37742 confirms active integration efforts based on OpenSenseNova/SenseNova-U1 reference implementation.  
- **DeepSeek-V4.1 (dsv4.1)**: Multiple PRs landed (#39664, #39657, #39646, #39653, #39666) introducing standalone kernels, FP8 matmuls, communication primitives, Engram module, and request history support — foundational for full model deployment.  
- **ROCm (MI355X)**: Updated cookbook alignment (#39572) ensures correct HiCache configuration (`kernel`, `page_first`) for Qwen3.5 MXFP4 AgentX.  
- **Ascend NPU**: Sampling optimization (#39404) avoids unnecessary device syncs, improving throughput on Ascend hardware.

---

### **4. Performance & Optimization**  
- **HiCache L2/L3 Metrics**: PR #39280 adds per-rank labeling and splits "shrunk" prefetch reasons, enhancing observability for distributed decode performance tuning.  
- **KDA Decode State Transpose**: PR #39680 coalesces CuTe DSL state transpose, delivering **~3x faster** execution with bit-identical output.  
- **Unified Radix Cache**: PR #38634 enables decode-side HiCache for hybrid SWA/SSM models and fixes L3 restore promises, enabling more efficient memory hierarchies.  
- **CUDA Graph Prefill (ROCm)**: PR #37810 enables breakable CUDA graph prefill for DeepSeek-V4 HIP backend, reducing overhead in dynamic batching scenarios.

---

### **5. Stability & Regressions**  
- **Critical Regression**: PR #38628 reports a **4% decode latency regression** on Blackwell for DeepSeek-R1 NVFP4 when using `tiny_gemm` instead of `dsv3_router_gemm`. This is not trivially reversible due to deeper tradeoffs in kernel design.  
- **CUDA Illegal Memory Access**: Issue #37633 shows crashes under 8 concurrent requests with Qwen3.8-Flash-Next-FP8 on H20 TP8; workaround via `--disable-overlap-schedule` exists but is not recommended long-term.  
- **Crash on MoE Model Load**: Issue #36711 reports a `IndexError` during startup for GLM-5.3-Flash when `--moe-runner-backend flashinfer_trtllm` forces `disable_shared_experts_fusion`.  
- **Decode Retraction Crash**: Issue #38645 causes a CUDA device-side assert during KV cache backup in PD-disaggregated decode mode with DCP > 1.  
- **CI Health**: Issue #17050 reports 5 broken, 22 flaky, and 991 recently fixed CI jobs as of 2026-09-15. Maintenance mode (#21065) may be active.

---

### **6. What This Means for Application Developers**  
- **Use caution with dsv4.1 and Hopper FP8**: While new kernels are merged, verify performance impact via benchmarking—especially if relying on `tiny_gemm` paths.  
- **Enable unified radix cache + HiCache** for hybrid models (SWA/SSM) and multi-node deployments; ensure your setup aligns with updated metrics and configuration (e.g., `page_first`, `kernel` IO).  
- **Avoid `--disable-overlap-schedule`** for production unless necessary—this suppresses a critical performance feature. Monitor #37633 for upstream fixes.  
- **Expect frequent updates** to MoE and quantized model handling (e.g., FP8, NVFP4); use `main` branch with care and test rigorously on target hardware.  
- **Leverage new observability**: Use per-rank HiCache metrics (#39280) and debug logs from coredumps (#26340) to diagnose scalability issues in large-scale deployments.

> 🔗 [GitHub Issues](https://github.com/sgl-project/sglang/issues) | [Pull Requests](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-16**

---

### **1. Today's Highlights**  
The latest updates focus on critical performance fixes for Hexagon and OpenCL backends, including re-enabled contiguous fast-paths and DMA optimizations that improve reshape-heavy workloads like Qwen3.x. Significant progress in speculative decoding stability and Vulkan backend correctness is evident through multiple PRs targeting MoE routing, sparse Flash Attention, and cache slice handling.

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published today. However, recent builds (`b10991`, `b10989`, `b10985`) include notable changes:
- **`b10991`**: Reintroduced missing contiguous fast-path and `hvx_copy_uu` in Hexagon backend (#28886) — critical for performance on Qualcomm AI accelerators.
- **`b10985`**: Introduced RPC hash-cache optimization for weights only (#28789), reducing network transfer overhead when using `rpc-server -c`.
- **`b10984`**: Added support for row-contiguous `SUM_ROWS` in CUDA (#26308), improving efficiency in certain aggregation patterns.

> 🔗 [GitHub Release Attestations](https://github.com/ggml-org/llama.cpp/attestations)

---

### **3. New Model & Hardware Support**  
- **Vulkan**: Added **sparse Flash Attention** support for DSV4/GLM models (#28105), enabling efficient inference on large-context architectures with sparse attention patterns.
- **OpenCL**: Enhanced MoE expert matmul selection based on batch size for speculative decoding/MTP (#27637), improving dynamic scheduling accuracy.
- **Hexagon**: Expanded HMX flash-attention support to non-64-aligned head dimensions (e.g., SigLIP’s `head_dim=72`) via zero-padded internal kernels (#26539).
- **SYCL**: Added `ssm_scan` generic kernel (#28881), broadening support for state-space models across Intel GPU platforms.

> 🔗 [PR #28105 – Sparse Flash Attention](https://github.com/ggml-org/llama.cpp/pull/28105)  
> 🔗 [PR #26539 – Non-multiple-of-64 Head Dim](https://github.com/ggml-org/llama.cpp/pull/26539)

---

### **4. Performance & Optimization**  
- **Hexagon**: DMA usage for contiguous memory transfers improves throughput in reshaping-heavy models (Qwen3.x) by avoiding inefficient copy paths (#28906).
- **CUDA/HIP**: 
  - Optimized MMQ pipelining for RDNA 3.5 via tile splitting, enhancing latency hiding (#28714).
  - Tuned SM70 (Volta) K-quants crossover point for better performance balance (#28912).
  - Reduced unnecessary KV tile processing in WMMA Flash Attention for ROCm (#28943).
- **Vulkan**: Implemented `BN/2 tail` optimization for `MUL_MAT_ID` small-batch case, improving occupancy and reducing waste (#28923).
- **RPC**: Hash-caching weights only reduces redundant data transfers by up to ~70% in repeated model loads (#28789).

> 🔗 [PR #28714 – HIP MMQ Pipeline Splitting](https://github.com/ggml-org/llama.cpp/pull/28714)  
> 🔗 [PR #28943 – Skip Masked KV Tiles](https://github.com/ggml-org/llama.cpp/pull/28943)

---

### **5. Stability & Regressions**  
Top stability concerns reported today:
- **Speculative Decoding Divergence** (#25618): Greedy output differs between quantized (`Q4_K_M`) and BF16 targets — likely due to rounding differences in draft model routing. *No fix PR yet.*
- **Vulkan Performance Drop** (#24066): Recent builds show degraded eval speed on RX 6600 with Qwen3.5-9B-Q5_K_M.gguf — suspected kernel regression.
- **GPU TDR Crashes on SYCL** (#28778): Dual Intel Arc Pro B70 GPUs trigger Windows TDR resets during DFlash2 draft model loading — driver-level instability.
- **Memory Growth During Chat** (#28933): Host-side RSS+swap grows linearly during chat on a 128GB unified-memory system with qwen4_exp — possible leak in context management or KV cache reuse.
- **Incorrect Cache Slicing in Vulkan** (#28956): Attention cache reads wrong data due to incorrect head spacing assumption — causes corrupted outputs; *fix PR pending*.

> 🔗 [Issue #25618 – Speculative Decoding Divergence](https://github.com/ggml-org/llama.cpp/issues/25618)  
> 🔗 [PR #28956 – Fix Vulkan Cache Slice Read](https://github.com/ggml-org/llama.cpp/pull/28956)

---

### **6. What This Means for Application Developers**  
- **Use `--model-draft` with caution** — recent speculative decoding regressions may cause divergent outputs on quantized targets; validate against full model runs.
- **Avoid `b10989` and later if using AMD ROCm on gfx1201** — potential performance drop from low dispatch threshold (#28867); consider pinning to earlier stable versions.
- **Leverage the new RPC hash-cache** (`rpc-server -c`) for multi-model deployments to reduce bandwidth and cold-start time.
- **For Android apps**, the new `llama_model_load_from_fd()` (#28973) enables secure, sandboxed GGUF loading without file system exposure — ideal for mobile agents.
- **Monitor memory usage closely** on large-context models (e.g., Qwen4Exp, Gemma4-26B) — host memory growth suggests a potential leak in recurrent state or KV cache handling.

> 🔗 [PR #28973 – Load From File Descriptor](https://github.com/ggml-org/llama.cpp/pull/28973)  
> 🔗 [PR #28789 – RPC Hash-Cache for Weights](https://github.com/ggml-org/llama.cpp/pull/28789)

---  
*Digest generated: 2026-09-16 | Source: [ggml-org/llama.cpp GitHub](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-16**

---

### **1. Today's Highlights**  
The latest release, `v0.34.2-rc0`, includes critical updates to `llama.cpp` for improved stability and performance. Key developments include fixes for MLX structured output issues with thinking-enabled models and improvements in Vulkan backend support on ARM64 Linux systems. A growing focus on structured outputs and reasoning model compatibility is evident across multiple PRs.

---

### **2. Releases & Breaking Changes**  
- **v0.34.2-rc0**: Released with updated `llama.cpp` (b10969), resolving symbol conflicts and improving runtime compatibility.  
  🔗 [Changelog](https://github.com/ollama/ollama/compare/v0.34.1...v0.34.2-rc0)  
  *No breaking changes reported; backward compatibility maintained.*

---

### **3. New Model & Hardware Support**  
- **Qualcomm IQ-9075 NPU/GPU**: Feature request (#18445) highlights demand for native support on Dragonwing™ platforms (e.g., Raxda Fogwise Airb). No implementation yet, but active community interest.  
  🔗 [Issue #18445](https://github.com/ollama/ollama/issues/18445)  
- **Vulkan on ARM64 Linux**: PR #18466 enables Vulkan inference backend for ARM64, fixing device classification for Apple Silicon-based systems.  
  🔗 [PR #18466](https://github.com/ollama/ollama/pull/18466)  
- **Gemma 4 Tool Call Parsing**: PR #18471 adds support for parsing `call:<name>:` format with `BEGIN_ARG`/`END_ARG` blocks used by Gemma 4 multimodal models.  
  🔗 [PR #18471](https://github.com/ollama/ollama/pull/18471)

---

### **4. Performance & Optimization**  
- **MLX Memory Budgeting**: PR #18481 introduces a 95% of free memory budget for CUDA devices to prevent OOM during model loading—critical for stable GPU inference.  
  🔗 [PR #18481](https://github.com/ollama/ollama/pull/18481)  
- **Structured Output Efficiency**: Multiple PRs (e.g., #18479, #18478) aim to apply structured outputs in a single pass on thinking models, eliminating costly two-pass generation and reducing latency.  
  🔗 [PR #18479](https://github.com/ollama/ollama/pull/18479)  
- **CUDA Payload Deduplication**: PR #17956 reduces binary size and improves load times by deduplicating shared CUDA runtime libraries.  
  🔗 [PR #17956](https://github.com/ollama/ollama/pull/17956)

---

### **5. Stability & Regressions**  
- **Critical OOM on Jetson Orin Nano**: Issues #18396 and #17787 report severe memory overuse when loading `gemma4:e2b`/`e4b` models via DIO mode or post-v0.32.2, even with small context windows. These are high-priority hardware-specific regressions.  
  🔗 [Issue #18396](https://github.com/ollama/ollama/issues/18396) | 🔗 [Issue #17787](https://github.com/ollama/ollama/issues/17787)  
- **Vulkan iGPU Hang After Cancelled Prefill**: Issue #18477 reports that Vulkan runners on Intel Lunar Lake GPUs hang silently after cancellation, requiring server restart.  
  🔗 [Issue #18477](https://github.com/ollama/ollama/issues/18477)  
- **MLX Structured Output Prefix Bug**: PR #18459 fixes a regression where MLX responses start with a stray `.` due to decoder lookahead.  
  🔗 [PR #18459](https://github.com/ollama/ollama/pull/18459)  

> ✅ **Fixes in progress**: Several PRs target root causes of crashes and hangs (e.g., goroutine leaks, stream handling).

---

### **6. What This Means for Application Developers**  
- **Avoid DIO mode on Jetson Orin Nano** until v0.34.2+ resolves OOM issues — use `--load-mode cpu` or `default` instead.  
- **Use `format` + `thinking` together cautiously**: Until PRs like #18479 land, expect double prefill cost and potential JSON corruption (e.g., stray `.` prefix).  
- **Enable structured outputs safely**: Use `/api/show` metadata (via PR #18473) to dynamically detect supported reasoning levels per model.  
- **Monitor cloud integrations**: Claude integration shows ~50s latency and malformed tool calls (Issue #18474); consider fallback strategies.  
- **Expect better memory control**: With upcoming CUDA memory budgeting (PR #18481), developers can more reliably manage GPU workloads on multi-GPU setups.

> 📌 **Pro Tip**: For agents using tools and structured outputs, test with `qwen3.8:27b-mxfp8` or `gemma4:e4b` on macOS/Linux to avoid known bugs in `IQ3_S` quantization (Issue #18297) and tool parameter drops (Issue #18468).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-16**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to mature with a focus on observability, cost accuracy, and robustness in high-scale inference environments. Key updates include fixes for critical token billing issues in streaming responses (PR #41337), improved guardrail execution across MCP tool calls (PR #41334), and new support for model-level spend caps at the team level (PR #41330). These changes reinforce LiteLLM’s role as a production-grade LLM gateway.

---

### **2. Releases & Breaking Changes**  
- **v1.101.0** released today with enhanced security: all Docker images are now signed using [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) via Sigstore.  
  🔒 Verify signatures using `cosign verify` — required for secure deployments.  
  ➡️ [GitHub Release v1.101.0](https://github.com/BerriAI/litellm/releases/tag/v1.101.0)

---

### **3. New Model & Hardware Support**  
No new models or hardware backends were added in this cycle. However, ongoing work includes:
- PR #41338: Propagating `modelVersion` from Gemini responses to ensure accurate logging and pricing.
- PR #41327: Adding `s3_log_prompts_only` option for S3 callback — useful for compliance-heavy workflows.

> ✅ *Note:* Support for Azure-hosted Deepseek models (`azure_ai/deepseek-v4-flash`, `azure_ai/deepseek-v4-pro`) was recently added via #30129.

---

### **4. Performance & Optimization**  
- **PR #41324**: Introduced `LiteLLM_DailyGlobalSpend` rollup key-free aggregation to reduce query load on large tenants.  
  📈 Improves dashboard performance by avoiding full scan of `(user, key, model, day)` fact tables — critical for multi-tenant deployments with high cardinality.
- **PR #41311**: Enhanced `/key/list` filtering with status-based queries (`active`, `expired`, `revoked`, `deleted`) and `/key/info` now returns deleted keys — improves auditability and operational visibility.
- **PR #41337**: Fixes incorrect token counting when streamed responses lack `usage` metadata — ensures correct billing even under partial provider reporting.

---

### **5. Stability & Regressions**  
Top stability concerns reported today:

| Issue | Severity | Fix Status | GitHub Link |
|------|----------|------------|-------------|
| `requests/tokens per day rate limit` missing (currently only supports per-minute) | High | Open | [#14398](https://github.com/BerriAI/litellm/issues/14398) |
| `per-customer RPM limits` stop working after virtual key caching | High | Open | [#39713](https://github.com/BerriAI/litellm/issues/39713) |
| `compression_savings_spend` and `prompt_caching_savings_spend` always $0 in cost-based routing | Medium | Open | [#37117](https://github.com/BerriAI/litellm/issues/37117) |
| `project spend` never tracked despite budget enforcement | Medium | Open | [#33871](https://github.com/BerriAI/litellm/issues/33871) |
| `Guardrails Monitor` missing evaluations for `litellm_content_filter` | Low | Closed | [#36566](https://github.com/BerriAI/litellm/issues/36566) |

> 💡 **Critical fix PRs landed today:**  
> - [#41337](https://github.com/BerriAI/litellm/pull/41337): Recounts tokens when `usage: null` in stream completion  
> - [#41336](https://github.com/BerriAI/litellm/pull/41336): Tolerates missing `usage` in `message_delta` events from Anthropic  
> - [#41338](https://github.com/BerriAI/litellm/pull/41338): Preserves `modelVersion` from Gemini responses for accurate logging  

---

### **6. What This Means for Application Developers**  
- **Billing Accuracy**: Ensure you’re using v1.101.0 or later — recent fixes prevent underbilling due to missing `usage` in streams (e.g., Anthropic, Fireworks).
- **Team-Level Budgeting**: Use `model_max_budget` at the team level (via PR #41330) to enforce spending caps without requiring per-key configuration.
- **Audit & Compliance**: Leverage `s3_log_prompts_only` (PR #41327) and enhanced `/key/list` filters (PR #41311) for tighter access control and reduced data exposure.
- **Guardrails & Tool Safety**: Post-MCP guardrails now execute correctly across all scopes (key/team/policy) — critical for agent safety.
- **Avoiding Bugs**: Avoid using `tools=` with Bedrock non-tool models (see #24158); consider switching to `tool_choice: none` instead.

👉 **Action Items**:  
- Update to v1.101.0 and validate image signature verification.  
- Review config for `model_max_budget` and `team_level` spend controls.  
- Audit your guardrail setup — especially if using MCP tools.

---

*Digest generated from GitHub data: [BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-16**

---

### **1. Today’s Highlights**  
The Unsloth project continues to advance its multi-modal and inference infrastructure, with critical PRs addressing macOS Metal context budgeting, Windows backend cleanup, and Studio’s model cache resilience. A high-severity issue affecting Qwen3 fine-tuning (Issue #3211) remains open but is under active investigation, highlighting ongoing challenges in handling newer LLM variants. Meanwhile, the team pushes forward with robustness fixes in Studio’s core workflows and enhanced support for local model management.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, several high-priority PRs indicate upcoming changes:  
- **PR #11022**: Fixes a Windows-specific process leak during `llama-server` unload, preventing stale model mappings and PID file corruption. [Link](https://github.com/unslothai/unsloth/pull/11022)  
- **PR #11026**: Removes dependency on Hugging Face API for local model cache discovery, enabling offline access to cached models. [Link](https://github.com/unslothai/unsloth/pull/11026)  
- **PR #11025**: Corrects context size estimation in Studio by honoring user-entered values over precomputed estimates. [Link](https://github.com/unslothai/unsloth/pull/11025)

> *Developers should expect improved stability in local deployment workflows, especially on Windows and offline environments.*

---

### **3. New Model & Hardware Support**  
- **Qwen3.5** is now under active scrutiny due to multiple reported issues (e.g., infinite loops in fine-tuning, GRPOTrainer crashes). The community is testing compatibility across CUDA, ROCm, and CPU backends.  
- **Gemma 4 26B A4B** and **Qwen3.5 9B** are confirmed to trigger OOM or runtime errors under certain quantization and batch settings.  
- **AMD ROCm**: A critical segfault in `rocm-gfx1151` prebuilt binaries on bare-metal Strix Halo (Ryzen AI MAX+ 395) has been reported and confirmed reproducible only with bundled ROCm runtime. [Issue #6276](https://github.com/unslothai/unsloth/issues/6276)  
- **macOS Metal**: PR #11060 adjusts CPU-mapped embedding cost accounting to avoid artificial token limits (e.g., capping Qwen3.8-Flash-Next at 8K tokens on 128GB MacBook). [Link](https://github.com/unslothai/unsloth/pull/11060)

---

### **4. Performance & Optimization**  
- **GRPO Training**: PR #11031 enables full vision input forwarding (e.g., `image_grid_thw`, `spatial_shapes`) and supports image lists as input — crucial for multimodal RLHF pipelines. [Link](https://github.com/unslothai/unsloth/pull/11031)  
- **Inference Efficiency**: PR #11060 improves context utilization on Apple Silicon by correcting Metal memory accounting, potentially increasing effective context length by up to 30% in some cases.  
- **Benchmarking**: PR #10391 introduces a portable NVFP4 + low-rank correction kernel check for RTX 5090, DGX Spark, and WSL-based systems — targeting future kernel optimizations. [Link](https://github.com/unslothai/unsloth/pull/10391)  

> *Expect better performance for multimodal RL training and improved memory efficiency on Apple Silicon and high-end AMD GPUs.*

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|------|--------|------------|
| ⚠️ High | [#3211](https://github.com/unslothai/unsloth/issues/3211) | Infinite loop during Qwen3 fine-tuning in v2025.7.1+ | Open, pending confirmation |
| ⚠️ High | [#6276](https://github.com/unslothai/unsloth/issues/6276) | `rocm-gfx1151` prebuilts segfault on bare-metal Ryzen AI MAX+ 395 | Confirmed; workaround: use system ROCm |
| ⚠️ Medium | [#4983](https://github.com/unslothai/unsloth/issues/4983) | Unsloth installs PyTorch 2.10.0 by default, breaking FlashAttention 2 | Feature request; no fix yet |
| ⚠️ Medium | [#4801](https://github.com/unslothai/unsloth/issues/4801) | `apply_rotary_pos_emb` size mismatch in Qwen3.5 + TRL GRPOTrainer | Open, affects GRPO training with Qwen3.5 |
| 🟡 Low | [#10923](https://github.com/unslothai/unsloth/issues/10923) | Docker models not persisting due to missing volume mounts | Documentation gap |

> *Critical regression in Qwen3 fine-tuning workflow requires immediate attention from users relying on this model family.*

---

### **6. What This Means for Application Developers**  
- **Avoid using unsloth `v2025.7.1+` for Qwen3 fine-tuning until #3211 is resolved** — revert to earlier versions if stability is required.  
- **Use system-installed ROCm instead of bundled `rocm-gfx1151` binaries** on AMD platforms with Ryzen AI MAX+ GPUs.  
- **For macOS users**, expect higher effective context lengths after PR #11060 lands — ideal for long-form reasoning and RAG applications.  
- **Local model caching is now resilient to network outages** thanks to PR #11026 — deploy without internet connectivity.  
- **Multimodal RLHF developers** should monitor PR #11031 for full vision input support in GRPO training.  

> *Unsloth is maturing into a production-grade, cross-platform inference and fine-tuning stack — but caution is advised when using bleeding-edge model support.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*