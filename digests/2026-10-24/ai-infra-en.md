# AI Infrastructure Digest 2026-10-24

> Generated: 2026-10-24 00:59 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-24**

---

### **1. Ecosystem Overview**

The AI infrastructure landscape in Q4 2026 is defined by rapid specialization across hardware, model architectures, and deployment paradigms. Projects are diverging into distinct roles: high-performance inference engines (vLLM, SGLang), lightweight local runtimes (llama.cpp, Ollama), unified gateways (LiteLLM), and integrated fine-tuning platforms (Unsloth). A clear shift toward **heterogeneous hardware support**—AMD ROCm, Ascend NPU, Cambricon MLU, T-Head Zhenwu—is accelerating, driven by both vendor diversification and cost-sensitive edge deployments. Concurrently, security incidents like the compromised `litellm==1.107.0` underscore growing risks in open-source dependency chains, prompting stricter governance.

---

### **2. Activity Comparison**

| Project       | Issues (Open) | PRs (Open) | Releases (Last 24h) | Stability Status |
|---------------|---------------|------------|-----------------------|------------------|
| vLLM          | 384           | 122        | None                  | Experimental features unstable (e.g., `--monokernel`) |
| SGLang        | 459           | 141        | None                  | Flaky CI; critical regressions in distributed serving |
| llama.cpp     | 412           | 103        | b11846 (CUDA fix)     | High-severity kernel crashes under MTP/Blackwell |
| Ollama        | 287           | 91         | v0.40.11 (RC)         | Critical model degeneration issues in cloud models |
| LiteLLM       | 391           | 118        | None                  | P0 routing/streaming bugs; security incident resolved |
| Unsloth       | 317           | 89         | v0.1.910-beta         | High-severity desktop crashes and stalls |

> ✅ *Note: SGLang and LiteLLM show highest activity but face systemic stability challenges; vLLM and llama.cpp lead in targeted performance fixes.*

---

### **3. Model Support Race**

| New Model / Architecture      | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next (ROCm)** | ✅ | ✅ (PR #44304) | ❌ | ❌ | ❌ | ❌ |
| **Kimi-K3 (ROCm/MI355X)**     | ✅ | ✅ (DCP + shared comp) | ❌ | ❌ | ❌ | ❌ |
| **Dory1.0-4B-BF16**           | ✅ (#60149) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Nemotron-3.5-Bolt (Gemma 4)** | ❌ | ❌ | ❌ | ✅ (`nemotron-3.5-bolt`) | ❌ | ✅ (`flint-4b`, `nemotron-bolt-4b`) |
| **MOSS-Image (Multimodal)**   | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Recursive Flint (GGUF)**    | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **T-Head Zhenwu 810/810E/M890P** | ❌ | ✅ (Roadmap) | ❌ | ❌ | ❌ | ❌ |
| **Cambricon MLU**             | ❌ | ✅ (PR #45149) | ❌ | ❌ | ❌ | ❌ |
| **Ascend NPU (DCP)**          | ❌ | ✅ (PR #40825) | ❌ | ❌ | ❌ | ❌ |

> 🏆 **Winner**: **Unsloth** leads in *new model adoption*, especially for multimodal and GGUF-based local inference.  
> 🏁 **Leader in hardware diversity**: **SGLang** is fastest expanding beyond NVIDIA with native support for T-Head, Cambricon, and Ascend.  
> 🔥 **vLLM & llama.cpp** remain strongest for cutting-edge Qwen/Kimi variants on GPU.

---

### **4. Performance Frontier**

| Optimization Focus             | vLLM                          | SGLang                         | llama.cpp                      | Ollama               | LiteLLM              | Unsloth                |
|--------------------------------|-------------------------------|--------------------------------|--------------------------------|----------------------|----------------------|------------------------|
| **KV Cache Management**        | ✅ DCP, speculative decoding, batch invariance | ✅ Disaggregated caching, HiCache | ✅ `kq_mask` elimination (save 2–4GB) | ✅ Compaction logic | ✅ Spend logging metadata | ✅ Dynamic MoE offload |
| **Batching & Throughput**      | ✅ Mono-decode layer (TP8), Triton kernels | ✅ Mixed ChunkPrefill, Agentic Scheduling | ✅ No batching focus (CPU-only) | ✅ Eviction logic fixes | ✅ Rust gateway opt-in | ✅ Prompt progress tracking |
| **Quantization & Precision**   | ✅ MXFP4, QSA attention | ✅ NVFP4, QSA sparse-attention | ✅ JQ2_K–JQ6_K (CPU-only), FP4 | ✅ JSON schema fidelity | ✅ Per-call custom pricing | ✅ NVFP4 activation tagging |
| **Distributed Serving**        | ✅ DCP, speculative decode | ✅ EP2, NCCL GRAPH_REGISTER=0 issue | ❌ | ❌ | ❌ | ❌ |
| **Kernel-Level Optimization**  | ✅ Triton replace torch.compile | ✅ FA4 over cuDNN, Engram table reduction | ✅ DP4A tile alignment (Blackwell-safe) | ❌ | ❌ | ✅ Fused optimizers, BF16 cuBLAS |

> ⚙️ **Top Performers**:  
> - **vLLM**: Most advanced speculative decoding and KV cache optimizations.  
> - **SGLang**: Leading in disaggregated systems and cross-architecture kernel tuning.  
> - **llama.cpp**: Best memory savings via model-specific kernel stripping (e.g., `kq_mask` removal).

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Key Differentiator |
|---------------|-----------------------------------|--------------------|
| **vLLM**      | High-Performance Inference Engine | Optimized for large-scale, low-latency GPU serving with speculative decoding and DCP |
| **SGLang**    | Multi-Backend Inference Stack     | Designed for heterogeneous, distributed environments with strong disaggregation support |
| **llama.cpp** | Local Runtime / CPU/GPU Fallback  | Dominant for CPU inference, mobile, and edge devices with minimal dependencies |
| **Ollama**    | Local Developer Experience Layer  | Focuses on UX, ease of use, and developer-first model hosting with WebUI |
| **LiteLLM**   | Unified Gateway / Orchestration   | Acts as a universal API layer abstracting providers, billing, and routing |
| **Unsloth**   | Integrated Fine-Tuning + Runtime  | Unifies training (fine-tuning API) and inference (MLX/MoE support) for edge/local workflows |

> 🔄 **Layer Convergence**: LiteLLM and Unsloth blur the line between gateway and runtime; vLLM and SGLang remain pure serving engines.

---

### **6. Trend Signals**

1. **Hardware Democratization Is Accelerating**:  
   - SGLang and Unsloth are rapidly enabling **non-NVIDIA** deployment (AMD, Ascend, Cambricon, T-Head). This signals a shift from GPU monoculture to **multi-architecture resilience**—critical for cost control and supply chain risk mitigation.

2. **Model Specialization Drives Memory Efficiency**:  
   - Elimination of `kq_mask` in `qwen4exp` and `glm5-next` (llama.cpp) saves up to **4 GB per context**, indicating that **model-aware kernel optimization** is now a core differentiator.

3. **Security is Now a Core Infrastructure Concern**:  
   - The malicious `litellm==1.107.0` release highlights that **dependency integrity must be baked into CI/CD pipelines**. Developers must adopt SBOMs, signature verification, and private registry policies.

4. **Agent Workloads Demand Higher Abstraction**:  
   - Features like **automatic OpenCode session forwarding (LiteLLM)**, **mixed chunk prefill (SGLang)**, and **OpenAI-compatible fine-tuning (Unsloth)** reflect a move toward **agent-native tooling**—where infrastructure handles complexity, not developers.

5. **Rust is Emerging as a Performance Layer**:  
   - Both SGLang and LiteLLM now offer **Rust-powered frontends/gateways**, signaling a trend toward **lower-latency, higher-isolation** components in high-throughput inference stacks.

---

### ✅ **Recommendations for Application Developers**

- **For production inference at scale**: Use **vLLM** with `--monokernel` and ROCm optimizations — but avoid experimental flags until validated.
- **For multi-hardware agent backends**: Choose **SGLang** for its distributed, heterogeneous capabilities — but monitor flaky CI and regression-prone configurations.
- **For local/edge deployment**: **Unsloth** and **llama.cpp** are best for privacy-first, low-resource scenarios (especially Apple Silicon).
- **For agentic orchestration**: **LiteLLM** offers the most mature provider abstraction and billing control — but audit all versions post-security incident.
- **Avoid risky releases**: Never use `litellm==1.107.0`; pin `llama.cpp` to `b11846+` on Blackwell GPUs.

> 🔮 **Forward Look**: Watch for **dynamic MoE expert splitting (Unsloth)** and **Rust gateways (LiteLLM/SGLang)**—these will define next-gen latency and scalability boundaries.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-24**

#### **1. Today's Highlights**  
The vLLM project continues to accelerate hardware and model specialization, with major progress on ROCm (AMD) support for Qwen3.8 and Kimi-K3 models, including performance optimizations and bug fixes. Critical stability improvements were merged for speculative decoding, KV cache management, and DCP (Decode Context Parallelism), while new PRs address foundational issues in weight ownership and batch invariance.

#### **2. Releases & Breaking Changes**  
No new releases or breaking changes reported in the last 24 hours. The `v0.32 nightly` remains the latest unstable build; users should expect potential instability when using experimental features like `--monokernel`, `--decode-context-parallel-size`, or `VLLM_USE_RUST_FRONTEND`.

#### **3. New Model & Hardware Support**  
- **ROCm (AMD)**: Full support for `amd/Qwen3.8-Flash-Next-Quark-MXFP4` (`qwen4_exp`) and `Qwen3.8-2.4T-A95B gfx950 / MI355X` via dedicated performance optimization tracks (#57149, #59575).  
- **NVIDIA GB10 (DGX Spark)**: Ongoing work to resolve prompt truncation issues in `Qwen3.8-Flash-Next` beyond `indexer_budget` (~2K tokens); fix pending (#62776).  
- **New Models**: Added support for **Dory1.0-4B-BF16** (NVIDIA-Nemotron-Labs), a latent-recurrent LLM with normalized-GPT architecture (#60149).  
- **Rust Frontend**: Still experimental but feature parity is actively tracked (#44280).

#### **4. Performance & Optimization**  
- **ROCm**:  
  - `block_m=128` applied to fused KDA prefill conv1d in Kimi-K3, improving performance without bit-accuracy loss (#63342).  
  - Standalone mono-decode layer for DeepSeek-V4-Pro on MI355X (`--monokernel`) enables high-throughput inference at TP8 (#61482).  
- **CUDA/Blackwell**:  
  - Triton kernel replaces `torch.compile` for draft-budget selection in speculative decoding, eliminating mid-serving compile stalls and reducing host cost by ~6x (#63421).  
- **General Engine**:  
  - Weight ownership tracking now declared via `ParamMeta` to enable deterministic planning (#63256).  
  - Batch invariant behavior improved for TRITON_MLA backend under chunked prefill (#60007).  

#### **5. Stability & Regressions**  
- **Critical**:  
  - `Qwen3.8-Flash-Next` on GB10 silently ignores prompt content beyond ~2K tokens due to `indexer_budget` limits (#62776).  
  - Kimi-K3 accuracy collapses at high concurrency on ROCm with `VLLM_ROCM_USE_AITER=1` (#60160).  
- **High Severity**:  
  - `NixlConnector` releases KV blocks during remote READ, causing silent data corruption in decode (#61229).  
  - `Inkling-Small-NVFP4` fails on SM120 due to missing paged-KV support in `tml_fa4` attention kernel (#51405).  
- **Fixed in PRs**:  
  - PLE state alignment in Qwen4Exp (`--align-mode`) fixed on read side (#60861).  
  - Zero positions passed correctly to fused MLA decode q-prep kernel in Kimi-K3 on ROCm (#63409).  
  - Adaptive verification cost profiling no longer runs twice at startup in MRV2 (#63431).

#### **6. What This Means for Application Developers**  
- **Use caution with `--monokernel` and `--decode-context-parallel-size`**: These are still experimental and may introduce correctness or performance regressions—validate thoroughly in production-like environments.  
- **Leverage ROCm optimizations for AMD deployments**: Use `Qwen3.8-Flash-Next` with `gfx950` and `MI355X` for best throughput, especially with `--monokernel`.  
- **Avoid `VLLM_ROCM_USE_AITER=1` if high concurrency is required** until #60160 is resolved.  
- **Enable `--enforce-eager` and monitor `KV block release timing`** when using distributed offloading (e.g., NixlConnector) to avoid silent data loss.  
- **Monitor for prompt truncation bugs** when serving long-context models on GB10 (DGX Spark) until #62776 is patched.

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-24

---

### **1. Today's Highlights**

The SGLang project continues to advance its multi-backend, high-performance inference stack with critical progress in **disaggregated KV caching**, **speculative decoding robustness**, and **cross-architecture support**. Key developments include a major fix for flaky CI infrastructure (Issue #42752), new performance optimizations for Qwen3.8-Flash-Next on ROCm/MI355X (PR #44304), and foundational work on adaptive speculative decoding (Issue #23705). These efforts signal strong momentum toward production-grade, scalable LLM serving across diverse hardware.

---

### **2. Releases & Breaking Changes**

No new releases were published in the last 24 hours.  
**Note**: The ongoing issue #14930 highlights lingering instability from prerelease dependencies (e.g., `transformers==5.0.0rc0`) in v0.5.6.post1—developers should avoid using this version in production until resolved.

---

### **3. New Model & Hardware Support**

- ✅ **ROCm / AMD MI355X**: Performance tracking and optimization underway for `Qwen3.8-Flash-Next` (PR #44304).
- ✅ **T-Head Zhenwu 810/810E/M890P**: First-class support roadmap initiated (Issue #37519).
- ✅ **Cambricon MLU**: Initial platform support merged (PR #45149), including device management, CNCL communication, and CI tests.
- ✅ **Ascend NPU**: DCP (Decode Context Parallelism) support added for Kimi-K3 with shared compact communication (PR #40825); topology-aware CPU/NUMA affinity now tracked (Issue #39348).
- ✅ **SenseNova-U1/U1.5**: Feature and performance tracking active (Issue #37742), using OpenSenseNova/SenseNova-U1 as reference.

---

### **4. Performance & Optimization**

- 🔥 **Qwen3.8-Flash-Next on ROCm**: PR #44304 tracks gfx950 / MI355X performance improvements for a complex model variant (GatedDeltaNet, QSA, MXFP4 MoE, native NEXTN MTP).
- ⚡ **Kernel-Level Optimizations**:
  - PR #46180: Reduces Engram table traffic in DP attention by reading peer device shards directly.
  - PR #46191: Introduces host-based KV tier for QSA sparse-attention backend in Qwen4, enabling larger context handling.
  - PR #46146: Prefers FA4 over cuDNN SDPA for long self-attention on B300 (sm_103), improving throughput.
- 📈 **Memory & Caching**:
  - PR #46178: Replaces O(N) `list.pop(0)` with `deque` in hot-path allocators (StagingAllocator, FlexKVComm, LMCacheUnifiedRadixCache), reducing contention.
  - PR #46192: Eliminates unnecessary memory allocation of swizzled blockscales in ModelOpt FP4, saving GPU memory for Marlin MoE runner.

---

### **5. Stability & Regressions**

Critical stability issues reported today:

| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#44291](https://github.com/sgl-project/sglang/issues/44291) | Critical | EP2 (tp=2 + ep=2) crashes with illegal memory access on Qwen3.8-Flash-Next-NVFP4 (RTX PRO 6000, sm_120) | ❌ No fix yet |
| [#45989](https://github.com/sgl-project/sglang/issues/45989) | High | HiCache `buffer_only` + Mooncake L3 causes scheduler to admit unfinishable prefill → "Prefill out of memory" crash | ❌ No fix yet |
| [#45367](https://github.com/sgl-project/sglang/issues/45367) | High | Kimi-K3 DCP a2a produces garbled output on 2-node GB300; NCCL_GRAPH_REGISTER=0 fixes it | ❌ No fix yet |
| [#36010](https://github.com/sgl-project/sglang/issues/36010) | Medium | NVFP4 KV cache + speculative decoding crashes due to `extend_prefix_lens_cpu is None` | ❌ No fix yet |

> 💡 **Note**: Flaky CI infrastructure remains a systemic blocker (Issue #42752, 125 comments), impacting PR validation velocity.

---

### **6. What This Means for Application Developers**

- **Build for heterogeneity**: SGLang is rapidly expanding beyond NVIDIA. If you're targeting T-Head, Cambricon, or Ascend hardware, now is the time to integrate early—roadmaps are live and PRs are merging.
- **Avoid unstable configurations**: Do not use `v0.5.6.post1` due to prerelease dependency risks. Monitor #14930 for updates.
- **Leverage advanced scheduling features**: Mixed ChunkPrefill (Issue #13626) and Agentic Cache Scheduling (Issue #43098) enable higher GPU utilization and better request co-location—ideal for agent workloads.
- **Be cautious with speculative decoding**: NVFP4 + speculative decoding is currently broken (Issue #36010); use `--kv-cache-dtype bfloat16` as workaround.
- **Watch for regression-prone workflows**: Flaky CI (#42752) may delay merges—expect longer wait times for PRs involving CUDA graphs, distributed systems, or new backends.

> ✅ **Pro tip**: Use `--chat-encoding-backend recipe` for DeepSeek-V4/V4.1 to ensure correct prompt rendering and tool parsing (PRs #45315, #45907).

---  
*Digest generated: 2026-10-24 | Source: [github.com/sgl-project/sglang](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-24**

---

### **1. Today's Highlights**  
The latest development cycle focuses on critical stability fixes for GPU backends, particularly around CUDA and SYCL memory management and kernel correctness. Notably, a high-severity crash in `ggml-cuda` due to improper DP4A MMQ tile alignment has been addressed with a static assertion. Concurrently, new quantization types (`JQ2_K`–`JQ6_K`) are being introduced to expand precision/efficiency trade-offs, while model-specific optimizations for Qwen4exp and GLM5-Next reduce memory overhead by up to 4 GB at large context sizes.

---

### **2. Releases & Breaking Changes**  
- **b11846 (CUDA)**: Added static assertion enforcing DP4A MMQ tile height multiple of warp size (#30837) — prevents undefined behavior on NVIDIA Blackwell GPUs.  
  🔗 [PR #30837](https://github.com/ggml-org/llama.cpp/pull/30837)  
- **b11838 (CPU/GGML)**: Fixed potential time overflow in `ggml_time_us` using `double` instead of `int64_t`.  
  🔗 [Issue #30969](https://github.com/ggml-org/llama.cpp/issues/30969)  
- **b11836 (CANN)**: Added missing `const` qualifiers for consistency across CANN backend.  
  🔗 [PR #30933](https://github.com/ggml-org/llama.cpp/pull/30933)

> ✅ *No breaking API changes reported today. All updates are internal or safety-focused.*

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Added support for `qwen4exp` with QSA attention layers — eliminates `kq_mask` allocation, saving up to **4 GB memory at context length 8192** (#30965).  
    🔗 [PR #30965](https://github.com/ggml-org/llama.cpp/pull/30965)  
  - Added `glm5-next` support with QSA without `kq_mask` (+ DSA), enabling similar memory savings.  
    🔗 [PR #31009](https://github.com/ggml-org/llama.cpp/pull/31009)  
  - Added support for **Soprano-1.1-80M audio generation** via MTMD pipeline.  
    🔗 [PR #28607](https://github.com/ggml-org/llama.cpp/pull/28607)  

- **Hardware & Backend**:  
  - **Hexagon**: Added `CEIL(f32)` and `f16` ops for mobile inference.  
    🔗 [PR #31006](https://github.com/ggml-org/llama.cpp/pull/31006)  
  - **SYCL**: Improved `mul_mat_uses_onednn` device pass-through.  
    🔗 [PR #31014](https://github.com/ggml-org/llama.cpp/pull/31014)  
  - **Vulkan**: Added tensor-parallel allreduce function; addresses multi-GPU sync issues.  
    🔗 [PR #25051](https://github.com/ggml-org/llama.cpp/pull/25051)

---

### **4. Performance & Optimization**  
- **Memory Savings**:  
  - Eliminating `kq_mask` in `qwen4exp` and `glm5-next` reduces GPU/host memory usage by **2–4 GB** at ultra-large contexts (UB 4096–8192).  
    🔗 [PR #30965](https://github.com/ggml-org/llama.cpp/pull/30965)  
- **Kernel Optimizations**:  
  - Hexagon: Team-split KV-head handling improves flash attention efficiency on multicore HMX.  
    🔗 [PR #31055](https://github.com/ggml-org/llama.cpp/pull/31055)  
  - SYCL: Fused GEMM off fixes NaN output in Qwen3.8-27B Q4_K_M models on Intel Arc B70.  
    🔗 [Issue #30892](https://github.com/ggml-org/llama.cpp/issues/30892)  
- **Quantization Advances**:  
  - Five new CPU-only quant formats (`JQ2_K` to `JQ6_K`) based on IQ*_K design, offering higher precision than IQ4_XS with minimal performance cost.  
    🔗 [PRs #30715–#30718](https://github.com/ggml-org/llama.cpp/pulls?utf8=%E2%9C%93&q=JQ2_K+JQ6_K)  

---

### **5. Stability & Regressions**  
| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#30965](https://github.com/ggml-org/llama.cpp/issues/30965) | ⚠️ Critical | CUDA Q4_1/Q5_1 mat-vec kernels overflow fp16 when multiplying block offset by Q8_1 sum → NaN logits | ❌ Open |
| [#30892](https://github.com/ggml-org/llama.cpp/issues/30892) | ⚠️ High | SYCL F16: NaN output in Qwen3.8-27B Q4_K_M after #29107 code reorder | ✅ Partial (fused GEMM off works) |
| [#30839](https://github.com/ggml-org/llama.cpp/issues/30839) | ⚠️ Medium | HIP build fails with `mma.cuh:1424` error on gfx1151 | ❌ Open |
| [#30973](https://github.com/ggml-org/llama.cpp/issues/30973) | ⚠️ Medium | Metal aborts on MUL_MAT with BF16 src1 at K ≥ 64, batch > 8 | ❌ Open |
| [#29811](https://github.com/ggml-org/llama.cpp/issues/29811) | ⚠️ High | Eval bug: Assert on startup with Qwen 3.8 flash + MTP | ❌ Open |

> 💡 *Regression tracking indicates ongoing instability in hybrid models (MTP, recurrent) and newer GPU architectures (Blackwell, Battlemage).*

---

### **6. What This Means for Application Developers**  
- **Use `--spec-type draft-mtp-adaptive`** for dynamic speculative decoding — improves throughput without manual tuning.  
  🔗 [PR #27210](https://github.com/ggml-org/llama.cpp/pull/27210)  
- **Avoid `kq_mask`-heavy models** like `qwen4exp` if memory is constrained — they now skip this allocation by default.  
- **Upgrade to b11846+** if using CUDA on Blackwell GPUs to prevent silent crashes from misaligned MMQ tiles.  
- **Be cautious with `JQ*_K` quantizations** — currently only available on CPU; use for high-accuracy local inference but avoid on GPU unless validated.  
- **Monitor the WebUI security issue (#25790)**: Query parameter injection via `?q=` could lead to instruction injection in server mode — disable external access or patch early.

> 📌 *For production deployments: prioritize builds from `b11846` or later, especially with CUDA and MTP. Monitor issue #30892 and #30965 for real-time inference stability.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-24**

---

### **1. Today's Highlights**  
The latest release, **v0.40.11**, introduces critical fixes for `qwen3coder` and OpenCode context handling, while the new **NVIDIA Nemotron 3.5 Bolt E4B** model—Gemma 4-based with a 128K context window—brings fast, local vision-language capabilities. Concurrently, several PRs address long-standing issues in tool call fidelity, JSON schema compliance, and GPU/NPU compatibility across Apple Silicon, Windows, and AMD systems.

---

### **2. Releases & Breaking Changes**  
- **v0.40.11-rc0 / v0.40.10**:  
  - Fixed `qwen3coder` to preserve literal function closing tags in parameters ([#19228](https://github.com/ollama/ollama/pull/19228)).  
  - Resolved OpenCode launch context misalignment by using allocated (not advertised) context length ([#19193](https://github.com/ollama/ollama/pull/19193)).  
  - Enabled empty state support for `vllm-d3` decision models ([#19173](https://github.com/ollama/ollama/pull/19173), [#19226](https://github.com/ollama/ollama/pull/19226)).  
  - *No breaking API changes; all updates are behavioral or correctness fixes.*

---

### **3. New Model & Hardware Support**  
- **New Model**:  
  - [`nemotron-3.5-bolt`](https://ollama.com/library/nemotron-3.5-bolt): NVIDIA’s lightweight, Gemma 4-based vision-language model with **128K context window**, optimized for fast local inference and tool use.  
- **Hardware/Backend Support**:  
  - Added `apple-foundation-model` runner for macOS 27’s on-device Apple Foundation Models ([#19184](https://github.com/ollama/ollama/pull/19184)).  
  - Improved MLX support for compact Gemma 4 vision towers on Apple Silicon ([#19247](https://github.com/ollama/ollama/pull/19247)).  
  - *Still pending: full AMD GPU support on Intel Macs ([#1016](https://github.com/ollama/ollama/issues/1016)), Snapdragon X Elite NPU/GPU support ([#5360](https://github.com/ollama/ollama/issues/5360)).*

---

### **4. Performance & Optimization**  
- **Tool Call Fidelity**:  
  - Fixed integer-to-float conversion in tool call arguments (`30000` → `"30000.0"`), preventing schema validation failures ([#19252](https://github.com/ollama/ollama/pull/19252)).  
- **Throughput & Latency**:  
  - Addressed compaction stalls and delayed responses due to improper eviction logic ([#19245](https://github.com/ollama/ollama/issues/19245), [#19182](https://github.com/ollama/ollama/issues/19182)).  
  - Optimized `Phonon` text normalization for better tokenization of symbols and links ([#19234](https://github.com/ollama/ollama/pull/19234)).  
- **Memory Efficiency**:  
  - Enhanced model compaction repair logic to recover from invalid outputs without reprocessing entire transcripts ([#19230](https://github.com/ollama/ollama/pull/19230)).

---

### **5. Stability & Regressions**  
- **Critical Issues Reported**:  
  - **[#18980](https://github.com/ollama/ollama/issues/18980)**: 5–8% failure rate with `glm-5.3-flash:cloud` since Oct 12, exhibiting massive degeneration ("the = the = the..."). *Impact: Production agents may fail silently.*  
  - **[#19021](https://github.com/ollama/ollama/issues/19021)**: `mistral-large-4-cloud` rejects messages with `role: "developer"`, blocking Codex-style clients.  
  - **[#19249](https://github.com/ollama/ollama/issues/19249)**: `deepseek-v4.1-flash:1017-cloud` fails to auto-compensate for context exhaustion during long-running goals.  
- **Fixes in Progress**:  
  - PRs addressing JSON schema violations ([#12362](https://github.com/ollama/ollama/issues/12362)) and `OLLAMA_CONTEXT_LENGTH` reporting discrepancies ([#18995](https://github.com/ollama/ollama/issues/18995)) are under review.  
  - **[#19254](https://github.com/ollama/ollama/issues/19254)**: MLX version of `flint:40b-a2b-gguf-nvfp4` is significantly slower than QAT-int4 on M3 Macs—performance regression confirmed.

---

### **6. What This Means for Application Developers**  
- **Model Selection**: Prefer `nemotron-3.5-bolt` for low-latency, local vision-language tasks with high context needs. Use `qwen3-coder:480b-cloud` cautiously—expect potential JSON schema drift.  
- **Agent Design**: Avoid `developer` role in Cloud calls until #19021 is resolved. Implement fallbacks for models that fail to auto-compensate (e.g., `deepseek-v4.1-flash`).  
- **Infrastructure**: Enable `OLLAMA_MAX_LOADED_MODELS=1` with care—pending eviction can stall requests if `keep_alive` overrides eviction ([#19245](https://github.com/ollama/ollama/issues/19245)).  
- **Security**: Local deployments should implement auth (per [#19238](https://github.com/ollama/ollama/issues/19238))—no built-in API key enforcement yet.  
- **UI/SDKs**: Expect upcoming UI enhancements for `/think` and `/nothink` toggles ([#10961](https://github.com/ollama/ollama/issues/10961), [#19232](https://github.com/ollama/ollama/issues/19232)).

> 🔗 *For real-time status: [Ollama GitHub Issues](https://github.com/ollama/ollama/issues)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-10-24**

---

### **1. Today's Highlights**  
A critical security incident involving a malicious `litellm==1.107.0` release has been resolved: PyPI and Docker Hub have yanked the compromised version, which contained a credential stealer (`cook.pth`) and RCE loader via a lookalike repository. The LiteLLM team has also shipped several stability and billing fixes, including proper handling of per-call custom pricing on the Responses API and improved spend log metadata tracking. Meanwhile, new features like automatic OpenCode session forwarding and a Rust-powered gateway opt-in are now in active development.

---

### **2. Releases & Breaking Changes**  
**None** — No new releases were published in the last 24 hours.  

⚠️ **Critical Security Advisory (Resolved):**  
- `litellm==1.107.0` was **compromised** and removed from PyPI and Docker Hub (`ghcr.io/berriai/litellm`, `docker.io/litellm/litellm`).  
- The build was sourced from a lookalike repo (`Berri-AI/litellm`) and included a `cook.pth` backdoor + `sitecustomize` RCE loader.  
- All affected images (`latest`, `main-latest`, `main-stable`) have been yanked.  
👉 [Issue #47826](https://github.com/BerriAI/litellm/issues/47826) | [GitHub Advisory](https://github.com/BerriAI/litellm/security/advisories/GHSA-wgjx-5r3p-9zqf)

---

### **3. New Model & Hardware Support**  
- ✅ **Engy added as OpenAI-compatible provider** via PR [#46744](https://github.com/BerriAI/litellm/pull/46744):  
  - Supports 8 models via `https://api.engy.ai/v1`  
  - Auth via `ENGY_API_KEY` (optional base override)  
  - Full chat completion, responses, and Anthropic-compatible messages  
- ✅ **OpenCode Zen & Go providers now supported** with `x-opencode-session` header injection:  
  - Automatically forwards stable conversation IDs across inference routes  
  - Fixes missing session ID errors post-2026-09-05 policy change  
  👉 [PR #39549](https://github.com/BerriAI/litellm/pull/39549), [PR #48121](https://github.com/BerriAI/litellm/pull/48121)

---

### **4. Performance & Optimization**  
- 🔧 **Per-call custom pricing now honored on Responses API**:  
  - `input_cost_per_token` and `output_cost_per_token` are now respected when calling `litellm.responses()` or `aresponses()` directly  
  - Previously ignored; now aligns with `completion()` behavior  
  👉 [PR #48119](https://github.com/BerriAI/litellm/pull/48119)  
- 📈 **Improved cost attribution for prompt cache writes**:  
  - OpenAI GPT-5.6+ 12-hour prompt cache writes now billed at 2.5x rate (vs 1.25x for 30-min writes)  
  - Fix prevents underbilling during high-frequency caching scenarios  
  👉 [PR #48088](https://github.com/BerriAI/litellm/pull/48088)  
- ⚡ **Rust gateway opt-in available**:  
  - Experimental supervised Rust front listener in gateway image reduces latency and improves resource isolation  
  - Maintains shared writer pool across Python/Rust servers  
  👉 [PR #48132](https://github.com/BerriAI/litellm/pull/48132)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|--------|
| 🛑 **P0** | `x-litellm-tags` not routing to correct model | Open | [Issue #14052](https://github.com/BerriAI/litellm/issues/14052) |
| 🛑 **P0** | `think: false` ignored; reasoning blocks still returned | Open | [Issue #26413](https://github.com/BerriAI/litellm/issues/26413) |
| ⚠️ | Redis cache test fails with `url` field | Open | [Issue #34636](https://github.com/BerriAI/litellm/issues/34636) |
| ⚠️ | BedrockGuardrail streaming hook drops HTTPException → broken SSE | Open | [Issue #26387](https://github.com/BerriAI/litellm/issues/26387) |
| ⚠️ | `spend_logs_metadata` missing for `/v1beta/interactions` | Open | [Issue #47841](https://github.com/BerriAI/litellm/issues/47841) |
| ⚠️ | Langfuse OTEL spans dropped under `asyncio.gather()` | Open | [Issue #26376](https://github.com/BerriAI/litellm/issues/26376) |

> Note: Several P0 issues relate to routing, streaming, and telemetry integrity — critical for production agent systems.

---

### **6. What This Means for Application Developers**  
- **Immediately audit your deployment**: Ensure you are **not using `litellm==1.107.0`** — it’s been removed from all registries. Upgrade to `>=1.107.1` if possible, or pin to a known safe version.
- **Use `x-opencode-session` consistently**: If integrating with OpenCode Go, rely on the new auto-forwarding logic in recent builds to avoid 500 errors starting September 2026.
- **Leverage custom pricing on Responses API**: Use `input_cost_per_token` and `output_cost_per_token` directly in SDK calls — previously unsupported.
- **Enable the Rust gateway** for low-latency, high-concurrency deployments where you can manage dual-language infrastructure.
- **Monitor spend logs carefully**: Metadata and request ID propagation (via `x-litellm-call-id`) are now fixed, but some edge cases remain unresolved — ensure your observability stack accounts for this.

> 🔗 **Recommendation**: Review [PR #48131](https://github.com/BerriAI/litellm/pull/48131) for spend rollup reliability fixes if using daily budgeting or analytics.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-24**

---

### **1. Today's Highlights**  
Unsloth v0.1.910-beta launches with major new model support including Recursive’s Flint, MOSS-Image, and NVIDIA’s Nemotron Bolt 4B, now runnable locally via Unsloth. The release introduces a chat-only Desktop install, expanded MLX MoE support for models exceeding Mac memory limits, and an OpenAI-compatible fine-tuning API.

---

### **2. Releases & Breaking Changes**  
- **v0.1.910-beta** (GitHub: [Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.910-beta))  
  - Introduces **OpenAI-compatible fine-tuning API**, enabling seamless integration with existing agent frameworks.  
  - Adds **chat-only Unsloth Desktop install** for minimal resource usage in focused inference workflows.  
  - New **MLX MoE models larger than system RAM** are supported on Apple Silicon via advanced offload strategies.  

> 🔗 *See full changelog: [v0.1.910-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.910-beta)*

---

### **3. New Model & Hardware Support**  
- **New Models**:  
  - Recursive **Flint** (via `flint-4b` GGUF)  
  - **MOSS-Image** (multimodal vision-language model)  
  - NVIDIA **Nemotron Bolt 4B** (optimized for local inference)  
- **Backends & Quantization**:  
  - Full **MLX MoE support** on macOS (including models > device RAM via dynamic expert routing).  
  - **Vulkan backend** now supports `MiniCPM-V-4.7-1B` (though issue #14987 reports generation failure—workaround pending).  
  - **ROCm/GPU detection improvements** for AMD RDNA3 (gfx1100) systems (fixes silent CPU fallback, see #14906).  
  - **MIG GPU instance enumeration** on R570+ drivers (PR #14981) enables multi-instance training on datacenter GPUs.

> 🔗 *Model support: [Issue #14987](https://github.com/unslothai/unsloth/issues/14987), [PR #14981](https://github.com/unslothai/unsloth/pull/14981)*

---

### **4. Performance & Optimization**  
- **Memory Efficiency**:  
  - Dynamic **hot/cold MoE expert splitting** across GPU/CPU (feature request #14484) now under active development.  
  - Improved VRAM budgeting during decode-time residency (PR #15048): ensures reserve VRAM remains available for VAE decoding.  
- **Kernel & Compilation**:  
  - **NVFP4 activation quantization** now properly tags compile cache states to avoid mismatches (PR #15055).  
  - `sd.cpp` now uses BF16 cuBLAS only when *all* loaded GGUFs are Q8_0 (PR #15054), reducing unnecessary compute overhead.  
  - Fused optimizers now refresh LoRA cast cache after steps (PR #15052), improving fidelity during long training runs.  
- **Throughput**:  
  - Prompt progress tracking (PR #14909) provides real-time feedback on load, offload, and generation speeds—critical for debugging latency bottlenecks.

> 🔗 *Performance PRs: [PR #15054](https://github.com/unslothai/unsloth/pull/15054), [PR #15048](https://github.com/unslothai/unsloth/pull/15048), [PR #14909](https://github.com/unslothai/unsloth/pull/14909)*

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|---------|------|--------|------------|
| 🚨 High | [#15022](https://github.com/unslothai/unsloth/issues/15022) | Studio crashes on every GGUF load due to false "child not listening" port check | ⚠️ *Regression post-2026-10-23 update; backend log shows misdetected port ownership* |
| 🚨 High | [#14519](https://github.com/unslothai/unsloth/issues/14519) | Long chats stall pre-inference due to CPU-based conversation-archive embedding | ⚠️ *Blocks inference for minutes; no fix yet* |
| 🟡 Medium | [#14411](https://github.com/unslothai/unsloth/issues/14411) | Core dumps after model ejection, even with sufficient KV cache | 🔧 *Requires coredump logs for diagnosis (no clear root cause)* |
| 🟡 Medium | [#14987](https://github.com/unslothai/unsloth/issues/14987) | Text generation failure with MiniCPM-V-4.7-1B on Vulkan backend | ⚠️ *Likely backend compatibility issue; workaround needed* |
| 🟡 Medium | [#14695](https://github.com/unslothai/unsloth/issues/14695) | Failed to load DeepSeek-V4.1-Flash due to unrecognized architecture | 🔧 *Update llama.cpp build required* |

> 🔗 *Critical issues: [15022](https://github.com/unslothai/unsloth/issues/15022), [14519](https://github.com/unslothai/unsloth/issues/14519), [14411](https://github.com/unslothai/unsloth/issues/14411)*

---

### **6. What This Means for Application Developers**  
- **Build more robust agents**: The new **OpenAI-compatible fine-tuning API** allows you to plug into existing LLM orchestration tools (e.g., LangChain, LlamaIndex) without rewriting training logic.  
- **Scale multimodal apps**: With **MOSS-Image** and **Flint** now natively supported, developers can deploy vision + reasoning pipelines locally without cloud dependency.  
- **Optimize for edge deployment**: MLX MoE support on Mac means you can run large models (>100B parameters) on consumer hardware—ideal for privacy-first AI apps.  
- **Avoid regressions**: Monitor for the **port-check crash (#15022)** and **CPU archive stall (#14519)** in long-running or multi-user setups—both impact production stability.  
- **Future-proof your stack**: Enable **MIG GPU support (#14981)** and **dynamic MoE splitting (#14484)** early if targeting high-throughput inference clusters.

> ✅ *Recommendation: Pin dependencies using `pip` groups (PR #15053, #15051) to avoid breaking changes from security updates.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*