# AI Infrastructure Digest 2026-10-05

> Generated: 2026-10-05 01:09 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-05**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q4 2026 is defined by rapid specialization and convergence at the edge of hardware-aware optimization. Projects are increasingly diverging along performance, portability, and operational maturity axes: vLLM and SGLang dominate high-throughput, distributed serving; llama.cpp remains the gold standard for local, low-footprint inference; Ollama accelerates developer access to models via CLI-first UX; LiteLLM consolidates cross-provider gateway reliability; while Unsloth pushes boundaries in multimodal and fine-tuning workflows. A clear trend toward **heterogeneous hardware support**, **agent-grade observability**, and **production-hardened stability** underscores the shift from experimental prototypes to enterprise-grade deployment.

---

### **2. Activity Comparison**

| Project       | Issues (Open) | PRs (Recent) | Releases (Last 24h) | Notes |
|---------------|----------------|----------------|------------------------|-------|
| **vLLM**      | 87             | 12             | None                   | High focus on kernel correctness, sleep mode, and MoE/MTP stability |
| **SGLang**    | 132            | 9              | None                   | Heavy CI instability (323 CUDA coredumps), active DCP/HiCache work |
| **llama.cpp** | 158            | 11             | b11400–b11401          | Stability fixes for MoE, Vulkan/CUDA backends; mixed hardware support |
| **Ollama**    | 126            | 7              | None                   | RC feature rollout, `clef-flash` and AMD Vulkan regressions |
| **LiteLLM**   | 91             | 6              | v1.105.0-rc.1          | Security & cost accuracy push; agent telemetry improvements |
| **Unsloth**   | 103            | 8              | None                   | Critical throughput regression in tensor-split mode |

> ✅ *SGLang and llama.cpp lead in raw issue volume; vLLM shows highest PR velocity with focused quality fixes.*

---

### **3. Model Support Race**

| New Model / Architecture       | Project(s) with Support | Status | Key Differentiator |
|-------------------------------|--------------------------|--------|--------------------|
| **Qwen4Exp / Qwen3.8 Flash**  | vLLM, SGLang, Ollama       | ✅ Stable | vLLM leads in KV cache + projection fusion; Ollama adds chat template fix |
| **DeepSeek-V4.1 / DSv4.1**    | SGLang, vLLM               | ✅ Active | SGLang optimized for TRT-LLM sparse attention; vLLM fixes compressor ring |
| **K2 Horizon (MoE)**          | Ollama (request only)      | 🔮 Pending | Formal feature request — no implementation yet |
| **Clef-Flash**                | Ollama, SGLang             | ⚠️ Broken | Ollama fails on `/systemone`; SGLang has deadlock risk |
| **FLUX.2-klein (Image Gen)**  | Unsloth (ROCm)             | ✅ Fused RoPE | 8% speedup on AMD; no other project supports this model yet |
| **MooncakeConnector + Sleep Mode** | vLLM                     | ✅ Experimental | Enables RDMA-based disaggregation — unique to vLLM |

> 🏆 **Winner**: **vLLM** — most comprehensive support across cutting-edge models (Qwen4Exp, DeepSeek-V4.1) and novel hardware patterns (sleep mode, NVFP4).  
> 🌟 **Emerging Leader**: **Unsloth** — first to ship fused RoPE optimizations for FLUX.2-klein on ROCm, signaling strong multimodal momentum.

---

### **4. Performance Frontier**

| Optimization Focus         | Leading Projects                          | Key Advances |
|-----------------------------|--------------------------------------------|--------------|
| **KV Cache Efficiency**     | vLLM, SGLang                               | NVFP4_DS_MLA (vLLM); HiCache PLE table (SGLang); GPU-cached MoE experts (llama.cpp) |
| **Distributed Serving**     | SGLang (DCP), vLLM (sleep mode)            | SeaweedFS L3 backend (SGLang); FlashInfer allreduce release (vLLM) |
| **Batching & Parallelism**  | Ollama, vLLM                               | Qwen3.5 parallelism unlocked (Ollama); MTP + prefix caching tuning (vLLM) |
| **Kernel-Level Tuning**     | vLLM, SGLang, Unsloth                      | Qwen4Exp projection fusion (vLLM); Cake-kernel matmul (SGLang); fused RoPE (Unsloth) |
| **Quantization & Memory**   | vLLM, llama.cpp                            | FP8 QSA cache read fix (<8.9); NVFP4 decode (SM10x); MoE expert caching (llama.cpp) |

> 🔥 **Hot Zone**: **vLLM** dominates in **kernel-level efficiency** and **memory management** (sleep mode, offload buffers).  
> 💡 **Differentiator**: **SGLang** leads in **distributed scalability** via HiCache and DCP with SeaweedFS integration.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Secondary Role                         | Distinctive Strength |
|---------------|------------------------------------|-----------------------------------------|------------------------|
| **vLLM**      | Inference Engine (GPU-focused)     | Model Serving, Fine-tuning Gateway      | Highest throughput, deep hardware integration |
| **SGLang**    | Distributed Inference Stack        | Multi-node Serving, L3 Caching          | Best-in-class DCP + HiCache L3 |
| **llama.cpp** | Local Runtime (CPU/GPU/MLX)        | Multimodal Input, Edge Inference        | Most portable, open-source backend diversity |
| **Ollama**    | Developer Gateway / CLI Runtime    | Model Porting, Local API Server         | Fastest path to test new models |
| **LiteLLM**   | LLM Gateway / Observability Layer  | Cost Tracking, Agent Telemetry          | Industry-leading cost accuracy and agent monitoring |
| **Unsloth**   | Fine-tuning & Multimodal Runtime   | Studio UX, Audio Pipeline               | Strongest audio/TTS + FLUX image gen support |

> 📊 **Layer Clarity**: The ecosystem is now clearly segmented:  
> - **Core Engines**: vLLM, SGLang  
> - **Local Runners**: llama.cpp, Ollama  
> - **Gateways**: LiteLLM  
> - **Fine-tuning/Fusion**: Unsloth  

---

### **6. Trend Signals**

#### 🔍 **Key Trends Extracted from 2026-10-05 Activity**
1. **Hardware-Aware Optimization is Now Mandatory**  
   - NVFP4, FP8, MLA, and SM10x GPU support are no longer experimental—they’re production requirements.
   - vLLM’s NVFP4_DS_MLA and SGLang’s Blackwell DCP fixes show that **next-gen GPUs demand custom kernels**.

2. **Agent Workflows Are Driving Stability Demands**  
   - Tool-call streaming (vLLM), `systemone` endpoint reliability (Ollama), and structured output handling (LiteLLM) are now mission-critical.
   - Developers must prioritize **correctness over novelty**—e.g., avoid speculative decoding with hybrid models until #53670 is fixed.

3. **Disaggregation and Memory Efficiency Are Going Mainstream**  
   - vLLM’s MooncakeConnector + sleep mode and SGLang’s HiCache + SeaweedFS signal a shift toward **memory-efficient, large-scale inference**.
   - This enables long-context agents without GPU memory explosion.

4. **Security and Cost Accountability Are Non-Negotiable**  
   - LiteLLM’s `search_tool_deny_by_default` and cosign-signed Docker images reflect growing need for **compliance-ready tooling**.
   - Accurate cost tracking (especially for multi-modal inputs) is now a core feature—not an afterthought.

5. **Backends Are Fragmenting, Not Converging**  
   - Vulkan (AMD/Radeon 780M), SYCL (Intel), HIP (ROCm), and MLX (Apple) each have unique stability issues.
   - Developers must **test per-hardware stack**—no one-size-fits-all runtime.

---

### ✅ **Actionable Guidance for Application Developers**
- **Production Deployments**: Use **vLLM v0.28+** with `--disable-soft-prompt` and `--max-num-queued-reqs` to avoid burst admission bugs.
- **Multi-GPU Inference**: Avoid Unsloth `b10715-mix-...` builds due to 58% throughput regression; stick to `b10687` or `ggml-org` versions.
- **Agent Systems**: Upgrade to **LiteLLM v1.105.0-rc.1** immediately to fix silent data loss in image/audio content.
- **Heterogeneous Environments**: Prefer **SGLang (SeaweedFS L3)** for multi-node clusters; **llama.cpp** for CPU/Vulkan fallbacks.
- **Future-Proofing**: Monitor **Ollama’s RC channel** for K2 Horizon and Intel SYCL support—but avoid production use until stable.

> 🔗 *Recommendation*: Adopt a **tiered validation strategy**—test core functionality on target hardware before deploying to production, especially when combining advanced features like speculative decoding, prefix caching, or multi-modal input.

---  
*Report compiled: 2026-10-05 | Source: GitHub activity across vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-10-05**

#### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance in its core inference engine, with critical fixes for sleep/wake mode correctness in distributed KV offloading (PR #59993, #59994) and robustness in speculative decoding under load (PR #59620). Key attention kernel improvements for Qwen4Exp (PR #59533) and NVFP4 support on MLAs (PR #59342) signal strong momentum in optimizing next-gen MoE and hybrid models.

#### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

#### **3. New Model & Hardware Support**  
- **Qwen4Exp PLE embedding support**: PR #59943 enables reading FP8 QSA KV caches below compute capability 8.9 by casting `uint8` pointers in kernels.  
- **NVFP4_DS_MLA support on FLASHINFER_MLA_SPARSE**: PR #59342 adds native NVFP4 decode support for sparse MLA backends on SM10x GPUs (e.g., GB300/B200), enabling 1.6x token capacity vs FP8.  
- **DeepSeek-V4-Flash (DSv4.1)**: PR #58560 fixes compressor ring placement in null blocks during warmup, improving reliability under CUDA graph capture.  
- **MooncakeConnector + Sleep Mode**: PR #59625 adds experimental support for RDMA-based sleep mode, enabling memory-efficient disaggregation workflows.

> 🔗 [PR #59342](https://github.com/vllm-project/vllm/pull/59342) | [PR #59533](https://github.com/vllm-project/vllm/pull/59533) | [PR #59625](https://github.com/vllm-project/vllm/pull/59625)

#### **4. Performance & Optimization**  
- **Qwen4Exp Projection Fusion (PR #59533)**: Merges QKVG and indexer Q/K projections into a single GEMM, reducing kernel launches and improving throughput on SM100/SM103 GPUs.  
- **KV Cache Offload Efficiency**: PR #59994 moves model runner construction buffers to CPU during sleep, freeing GPU memory and enabling longer idle periods.  
- **Prefix Caching + MTP Stability**: Ongoing work (Issue #53912, #53670) addresses persistent corruption and 30–40% throughput loss in hybrid Mamba/GDN models due to last-block drop in EAGLE/MTP.  
- **FlashInfer Allreduce Workspace Release (PR #59360)**: With `--enable-nccl-comm-suspend`, FlashInfer’s allreduce workspace is now released during sleep, reducing residual memory usage.

#### **5. Stability & Regressions**  
High-severity issues remain active, primarily affecting advanced deployment patterns:  
- **Critical Memory Corruption**: Issue #53912 reports prefix caching + MTP corrupts output in hybrid Mamba/GDN models (v0.28.0). Fix pending.  
- **Illegal Memory Access**: Issue #54173 shows `CUBLAS_STATUS_INTERNAL_ERROR` / illegal access in GDN path with prefix caching on GB10 (sm_121); reproducible even with `--no-async-scheduling`.  
- **Speculative Decoding Recompute Overhead**: Issue #53670 documents 1,648-token recompute per hit in EAGLE/MTP prefix-cache, causing 30–40% batch throughput loss.  
- **Tool-Call Truncation Bug**: PR #59620 fixes incomplete JSON tool-call argument closure in truncated streams—critical for agent systems using streaming tool calls.

> 🔗 [Issue #53912](https://github.com/vllm-project/vllm/issues/53912) | [Issue #54173](https://github.com/vllm-project/vllm/issues/54173) | [PR #59620](https://github.com/vllm-project/vllm/pull/59620)

#### **6. What This Means for Application Developers**  
- **Agent Systems**: Prioritize upgrading to v0.28+ to benefit from fixed tool-call streaming behavior (PR #59620). Avoid speculative decoding with hybrid models until #53670 is resolved.  
- **Disaggregated Inference**: Use `--enable-sleep-mode --enable-nccl-comm-suspend` with Mooncake/NIXL connectors (PR #59625) to reduce memory pressure in large-scale deployments.  
- **Hybrid Model Users**: Be cautious with prefix caching + MTP on Qwen3.8-flash-next or Mamba/GDN hybrids—expect instability and potential recompute overhead. Monitor for #53912 and #54173.  
- **Quantization & Hardware**: Leverage NVFP4_DS_MLA support (PR #59342) for higher-density KV caching on B200/GB300 systems. Ensure FP8 cache reads are compatible with compute capability < 8.9 (PR #59943).

> ✅ **Actionable Tip**: For production-grade LLM serving with high concurrency or agent workflows, pin to v0.28.0+ and test with `--disable-soft-prompt` and `--max-num-queued-reqs` set to avoid burst admission bugs (PR #58478).

---  
*Data source: [vllm-project/vllm GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-05**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to advance its high-performance inference stack with critical improvements in **Decode Context Parallelism (DCP)** and **HiCache L3 backend support**, enabling scalable, low-latency serving across multi-node clusters. A major focus remains on **DeepSeek-V4.1 optimization**, including TRT-LLM sparse attention and kernel-level tuning for Blackwell GPUs. Meanwhile, CI stability is under active scrutiny due to a surge in CUDA coredumps and flaky test failures.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, ongoing work on `--dcp-comm-backend` defaulting to `fi_a2a`/`a2a` (via #39165, #37767) may affect users relying on legacy communication backends. Ensure compatibility if upgrading from pre-v0.5.20 versions.

> 🔗 [PR #39165](https://github.com/sgl-project/sglang/pull/39165) | [PR #37767](https://github.com/sgl-project/sglang/pull/37767)

---

### **3. New Model & Hardware Support**  
- ✅ **SeaweedFS** added as an official L3 storage backend for HiCache (#42399), enabling shared, distributed KV cache across nodes without external object storage.
- ✅ **Moore Threads (MUSA)** GPU support roadmap initiated (#16565), with community interest driving future integration.
- ✅ **AMD K3 (Kimi-K3)** now supports opt-in FP8-Q ASM MLA decode/verify via aiter kernels (#41388).
- ✅ **Blackwell (BWD)**: DCP fixes for RoPE sparse attention (`trtllm`) now merged (#42536).

> 🔗 [PR #42399](https://github.com/sgl-project/sglang/pull/42399) | [Issue #16565](https://github.com/sgl-project/sglang/issues/16565) | [PR #41388](https://github.com/sgl-project/sglang/pull/41388) | [PR #42536](https://github.com/sgl-project/sglang/pull/42536)

---

### **4. Performance & Optimization**  
- **HiCache**: File-backed PLE table now enables **6.8x lower cold-prefill TTFT on GB10** via concurrent host reads (#42392).
- **DeepSeek-V4 Pro**: Model loading time reduced from **~95 minutes to ~3.3 minutes** on Lustre by limiting tensor-copy workers (#42361).
- **Kernel Optimization**: Cake-kernel SP all-gather matmul route now usable via `SGLANG_CAKE_ROUTES=sp_all_gather_matmul`, improving sequence-parallel scalability (#42532).
- **Speculative Decoding**: Block verification added as opt-in feature to accelerate draft acceptance and improve throughput (#42297).

> 🔗 [PR #42392](https://github.com/sgl-project/sglang/pull/42392) | [PR #42361](https://github.com/sgl-project/sglang/pull/42361) | [PR #42532](https://github.com/sgl-project/sglang/pull/42532) | [PR #42297](https://github.com/sgl-project/sglang/pull/42297)

---

### **5. Stability & Regressions**  
**Critical Issues (High Severity):**
- 🚨 **CUDA Coredump Tracker (#26340)**: 323 comments — auto-collected crashes from `pr-test.yml`. High volume indicates instability in GPU kernels; no fix yet.
- 🚨 **DeepSeek-V4 + HiCache write_through deadlock** under long prefills: scheduler/detokenizer halt, `/health` returns 503 (#42465). No PR submitted.
- 🚨 **TRT-LLM MHA crash on H200 (SM90)**: v0.5.20 accepts `trtllm_mha` for both prefill/decode but returns wrong completions — regression from v0.5.17 (#40921).

**Other Notable Bugs:**
- Qwen3 streaming enters infinite thinking loop due to cross-chunk tag truncation (#31118)
- Deterministic sampling rejects `min_p` + seed combinations (#33695)
- Concurrent weight updates share completion state when engine is paused (#33698)

> 🔗 [Issue #26340](https://github.com/sgl-project/sglang/issues/26340) | [Issue #42465](https://github.com/sgl-project/sglang/issues/42465) | [Issue #40921](https://github.com/sgl-project/sglang/issues/40921) | [Issue #31118](https://github.com/sgl-project/sglang/issues/31118)

---

### **6. What This Means for Application Developers**  
- **Deployments using HiCache or multi-node inference should prioritize updating to latest main** to benefit from SeaweedFS L3 support and improved PLE performance.
- Avoid `--attention-backend trtllm_mha` on H200 (SM90) until #40921 is resolved — it produces incorrect outputs despite appearing functional.
- Use `--enable-deterministic-inference` cautiously: avoid combining with `min_p` unless you’ve verified your PyTorch sampling path compatibility (#33695).
- For DeepSeek-V4.1 users: enable `--dsv4-attn-backend trtllm` for sparse attention, but monitor for deadlocks in high-concurrency scenarios (#42465).
- Leverage opt-in Cake-kernels (`SGLANG_CAKE_ROUTES`) and block verification for speculative decoding to achieve higher throughput and better latency control.

> 🔗 [Roadmap: DeepSeek V4.1 Optimization](https://github.com/sgl-project/sglang/issues/42170) | [CI Maintenance Mode](https://github.com/sgl-project/sglang/issues/21065)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-05**

---

### **1. Today's Highlights**  
The latest release cycle focuses on critical stability fixes for MoE models and Vulkan/CUDA backends, particularly around memory safety in FlashAttention and expert routing. Key improvements include support for mixed embd+raw token batching (beneficial for multimodal models), enhanced router logging clarity, and performance optimizations for Intel Arc GPUs under MoE workloads.

---

### **2. Releases & Breaking Changes**  
- **b11401**: Fixed color reset handling in router mode logs to prevent line corruption; child command output now carries its own color context ([#29895](https://github.com/ggml-org/llama.cpp/pull/29895)).  
- **b11400**: Added support for mixing `embd` and raw tokens in a single batch via `llama_batch_ext`, enabling non-causal processing for models like Paligemma ([#29622](https://github.com/ggml-org/llama.cpp/pull/29622)).  
- **b11399**: Refactored CUDA swizzling code to fix template bounds issues ([#29612](https://github.com/ggml-org/llama.cpp/pull/29612)).  
- **b11398**: Enabled BF16/FP16/FP32 K-tail vectorization in tinyBLAS on x86, improving CPU inference efficiency ([#29806](https://github.com/ggml-org/llama.cpp/pull/29806)).

> ✅ *No breaking API changes reported today.*

---

### **3. New Model & Hardware Support**  
- **Multimodal Vision Input**: Server now supports vision input for Clef models via PR [#29969](https://github.com/ggml-org/llama.cpp/pull/29969), including MTMD (multimodal token) handling in non-causal batches.  
- **Vulkan (Intel Arc)**: Performance regression fix for MoE models on Intel Arc B70/B50 GPUs ([PR #29936](https://github.com/ggml-org/llama.cpp/pull/29936)).  
- **CUDA (Ampere, sm86)**: Ongoing investigation into ~2x prefill latency deviation at long contexts; quantized-KV + batch > 1 incurs unavoidable f16-conversion pass ([Issue #29935](https://github.com/ggml-org/llama.cpp/issues/29935)).  
- **Hexagon**: SSM-conv kernel updates with HVX-based transpose optimization ([PR #29971](https://github.com/ggml-org/llama.cpp/pull/29971)).

---

### **4. Performance & Optimization**  
- **FlashAttention**: CUDA now prefers whole-tile scheduling for efficient two-stage kernels on Ada+ GPUs, improving prefill throughput ([PR #29435](https://github.com/ggml-org/llama.cpp/pull/29435)).  
- **MoE Expert Caching**: PR [#29887](https://github.com/ggml-org/llama.cpp/pull/29887) introduces GPU cache for host-resident MoE experts using LRU eviction—reduces offload overhead for small batches (<32 tokens).  
- **Vulkan (RDNA4)**: ~12% prefill regression since #29182 due to MoE-aware tile selection; active investigation underway ([Issue #2992](https://github.com/ggml-org/llama.cpp/issues/2992)).  
- **SYCL**: Memory error fixes in `mul_mat` and buffer pooling improve stability on multi-GPU setups ([PR #29889](https://github.com/ggml-org/llama.cpp/pull/29889)).

---

### **5. Stability & Regressions**  
- **Critical Crash (CUDA)**: Illegal memory access in MMQ when `n_expert >> n_ubatch` — fixed in b11390 ([#29941](https://github.com/ggml-org/llama.cpp/issues/29941)).  
- **Corrupted Output (ROCm)**: gfx1151 (Strix Halo APU) reports corrupted output with HIP/ROCm backend while Vulkan is correct — same weights and flags ([Issue #27579](https://github.com/ggml-org/llama.cpp/issues/27579)).  
- **Race Condition (Router)**: Concurrent cold-starts with `--models-max=1` cause scheduler deadlock — under investigation ([Issue #28774](https://github.com/ggml-org/llama.cpp/issues/28774)).  
- **KV Cache Save Failure (Vision Models)**: Saving slot state fails for vision-enabled models — high-priority issue ([Issue #19466](https://github.com/ggml-org/llama.cpp/issues/19466)).  
- **Memory Corruption (Vulkan)**: `unpack8()` corrupts MAT_MUL + CPY on Snapdragon X Elite — reproducible on Qwen3-4B-Thinking ([Issue #28290](https://github.com/ggml-org/llama.cpp/issues/28290)).

---

### **6. What This Means for Application Developers**  
- Use **`b11400`+** for reliable multimodal inference with hybrid embd/raw token batching (e.g., PaliGemma).  
- If deploying **MoE models**, prefer **Intel Arc or NVIDIA Ada+ GPUs** — avoid RDNA4/Vulkan unless patched.  
- Enable **GPU-cached MoE experts** (`PR #29887`) for low-latency speculative decoding on small-batch workloads.  
- Avoid `--models-max=1` with concurrent requests until router race is resolved ([#28774](https://github.com/ggml-org/llama.cpp/issues/28774)).  
- Monitor **KV cache persistence** for vision models — current `save/slots` endpoint does not persist context checkpoints ([#19466](https://github.com/ggml-org/llama.cpp/issues/19466)).  
- Consider **SYCL builds** only if you’ve verified stable behavior on your hardware — multiple crashes reported ([#27128](https://github.com/ggml-org/llama.cpp/issues/27128), [#25423](https://github.com/ggml-org/llama.cpp/issues/25423)).

> 🔗 [Official Release Page](https://github.com/ggml-org/llama.cpp/releases) | [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-05**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to expand its support for emerging models and hardware backends, with key progress in Intel SYCL (oneAPI) integration and improved handling of Qwen3.8’s chat template. Critical stability issues were reported around `clef-flash` decision model failures on `/v1/systemone` and a regression in AMD Radeon 780M Vulkan memory management—both affecting production inference reliability. Meanwhile, developers are gaining better control over pre-release updates via new CLI support for RC versions.

---

### **2. Releases & Breaking Changes**  
*None*  
No new releases were published in the last 24 hours. However, **PR #18787** introduces experimental `ollama update [check|pull]` commands with full support for release candidates (RCs), enabling early access to pre-release builds via `--rc`, `--prerelease`, or `--force`. This is a significant shift toward developer agility but may introduce instability in CI/CD pipelines.

🔗 [PR #18787 – Add update check and pull feature with RC version support](https://github.com/ollama/ollama/pull/18787)

---

### **3. New Model & Hardware Support**  
- ✅ **Intel SYCL (oneAPI)**: Native backend support for Intel discrete GPUs (e.g., Arc B70 32GB) has been implemented via **PR #18333**, enabling Linux users to leverage high-end Intel GPUs through optimized compilation pipelines.
- 🔮 **K2 Horizon Models**: A formal feature request (**Issue #18698**) calls for support of MBZUAI’s K2-Horizon series (0.9B–36B MoE), including official GGUF variants. This marks growing interest in next-gen open models from research institutions.
- 🖥️ **MLX Engine Enhancements**: PRs #18780 (Kolibri 1 support) and #18779 (tokenizer semantics alignment) aim to improve MLX model portability and tokenization fidelity on macOS.

🔗 [PR #18333 – Implement native Intel SYCL runner pipeline](https://github.com/ollama/ollama/pull/18333)  
🔗 [Issue #18698 – Request: Support for K2 Horizon models (k2-horizon)](https://github.com/ollama/ollama/issues/18698)

---

### **4. Performance & Optimization**  
- ⚡ **Qwen3.5/Qwen35moe Parallelism**: With upstream fixes in `llama.cpp`, **PR #17144** removes the artificial `numParallel = 1` restriction, allowing true parallel inference for these hybrid architectures—expected to boost throughput by ~2–3x under load.
- 📦 **OpenAI Embeddings Efficiency**: **PR #18610** eliminates redundant JSON round-trips for embeddings by directly serializing native structs to OpenAI-compatible responses, reducing latency and CPU overhead during large batch processing.
- 🧠 **Model Porting Workflow**: **PR #15530** lays groundwork for repeatable, reference-driven MLX model migration—critical for scaling coverage without manual tuning.

🔗 [PR #17144 – Allow parallel requests for qwen35/qwen35moe](https://github.com/ollama/ollama/pull/17144)  
🔗 [PR #18610 – Avoid native JSON round trip for OpenAI embeddings](https://github.com/ollama/ollama/pull/18610)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🔴 High | [#17778](https://github.com/ollama/ollama/issues/17778) | `qwen3.8`: `no user query found in messages` error during streaming (500) when using tools in loop | In progress; no fix yet |
| 🔴 High | [#18769](https://github.com/ollama/ollama/issues/18769) | `clef-flash` fails on `/v1/systemone` with "Clef: non-finite logit" (CUDA) / "cannot open model" (CPU) — even though it works on `/v1/chat/completions` | No fix; active investigation |
| 🟡 Medium | [#17748](https://github.com/ollama/ollama/issues/17748) | AMD Radeon 780M Vulkan regression: `radv/amdgpu: Not enough memory for command submission` after v0.32.10 | Regression confirmed; patch pending |
| 🟡 Medium | [#18744](https://github.com/ollama/ollama/issues/18744) | MLX engine unloads weights ~2s after each request on macOS 27, causing page thrashing under memory pressure | Mitigation possible via `--keep-warm`; no permanent fix |

> ⚠️ **Critical Note**: The `clef-flash` issue affects decision-making workflows relying on system-level endpoints—this could break agent orchestration in real-time systems.

---

### **6. What This Means for Application Developers**  
- **Use caution with `clef-flash` and `qwen3.8`** on `/v1/systemone` until fixes land—expect silent failures or crashes during tool use.
- **Leverage Intel SYCL** if you're running on Linux with an Arc GPU; this enables previously unavailable acceleration paths.
- **Upgrade to latest `llama.cpp` upstream** to unlock parallelism for `qwen35` models—this will significantly improve throughput in multi-user environments.
- **Enable proxy support** via environment variables (`HTTP_PROXY`, etc.) using **PRs #18730–#18733** for enterprise deployments behind firewalls.
- **Monitor RC updates** via `ollama update check --rc` to stay ahead of new features—but avoid production use until vetted.

🔧 *Recommended action*: Pin your `ollama` version to stable tags unless you’re actively testing bleeding-edge features. Use `--keep-warm` with MLX models on macOS to mitigate memory thrashing.

---  
*Digest compiled from GitHub activity (2026-10-05). For real-time tracking, follow [Ollama Issues](https://github.com/ollama/ollama/issues) and [Pull Requests](https://github.com/ollama/ollama/pulls).*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-05**

---

### **1. Today's Highlights**  
The LiteLLM ecosystem continues to mature with a focus on operational reliability, cost accuracy, and agent-grade telemetry. Key developments include the introduction of `search_tool_deny_by_default` for improved security posture, critical fixes to streaming cost tracking (especially for OpenRouter and Vertex AI), and a new server-side runs search in Lens to enable scalable agent observability. The release of `v1.105.0-rc.1` brings enhanced image/audio content handling and signature verification via cosign.

---

### **2. Releases & Breaking Changes**  
- **v1.105.0-rc.1**: Released today with improved support for audio input token counting (`input_audio` blocks now counted instead of raising errors) and better handling of structured outputs in Bedrock/Anthropic models.  
  🔗 [GitHub Release](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-rc.1)  
- **Docker Image Signing**: All images are now signed using cosign; verify with key from commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
  🔗 [Verification Guide](https://docs.sigstore.dev/cosign/overview/)  

> ⚠️ **Migration Note**: Users relying on `input_audio` content blocks in token counting or cost tracking should upgrade to avoid silent failures or incorrect spend logs.

---

### **3. New Model & Hardware Support**  
- **OpenRouter Models Synced**: 7 new OpenRouter model entries (including `deepseek/deepseek-v4-flash`) have been added to the cost map with updated pricing tiers.  
  🔗 [PR #44533](https://github.com/BerriAI/litellm/pull/44533)  
- **Vertex AI Agent Engine**: Added support for proper handling of non-text content (images, files, audio) in agent responses — previously silently dropped.  
  🔗 [Issue #44336](https://github.com/BerriAI/litellm/issues/44336)  
- **Bedrock Native Structured Output**: Work underway to enable `response_format` natively for supported Claude models (e.g., `claude-opus-4-8`).  
  🔗 [Issue #31882](https://github.com/BerriAI/litellm/issues/31882)

---

### **4. Performance & Optimization**  
- **Streaming Cost Accuracy**: Fixes applied to ensure correct billing for streaming responses across OpenRouter, Vertex AI, and Anthropic. Notably, JSON array accumulation across stream chunks is now properly handled.  
  🔗 [PR #31879](https://github.com/BerriAI/litellm/pull/31879), [Issue #44336](https://github.com/BerriAI/litellm/issues/44336)  
- **Rate Limiting Improvements**: Redis Lua script-based rate limiting now includes timeouts to prevent request stalls under high load.  
  🔗 [PR #44530](https://github.com/BerriAI/litellm/pull/44530)  
- **Proxy Connection Management**: Idle connection cleanup during low traffic periods addressed to reduce PGBouncer load.  
  🔗 [Issue #41420](https://github.com/BerriAI/litellm/issues/41420)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🟡 High | [Issue #44336](https://github.com/BerriAI/litellm/issues/44336) | Vertex AI agent engine silently drops image/audio/file content parts, returns fabricated answers despite HTTP 200 | ✅ Fixed in PR #31879 |
| 🟡 High | [Issue #44197](https://github.com/BerriAI/litellm/issues/44197) | `thinking` parameter not forwarded to Anthropic models via `ChatOpenAI` + LiteLLM proxy | 🔧 In progress (PR #44197) |
| 🟡 Medium | [Issue #44047](https://github.com/BerriAI/litellm/issues/44047) | Global registry locks in auth checks lack timeout, risking deadlocks | ✅ PR #44530 submitted |
| 🟢 Low | [Issue #32232](https://github.com/BerriAI/litellm/issues/32232) | Redis Lua rate limiter breaks behind SCRIPT-blocking proxies (Codis/Twemproxy) | 🔧 Partial fix proposed |

---

### **6. What This Means for Application Developers**  
- **Cost Tracking Is More Accurate**: If you use audio, image, or file inputs in agents (especially via Vertex AI or OpenRouter), upgrade immediately to avoid under-billing or silent data loss.  
- **Agent Telemetry Now Reliable**: With server-side run search in Lens and improved cache-hit spending semantics, you can now audit agent behavior at scale without client-side bottlenecks.  
- **Security Hardening**: Use `search_tool_deny_by_default: true` to enforce least-privilege access to web search tools — critical for compliance-heavy deployments.  
- **Avoid Deadlocks**: If running in distributed environments with Redis proxies, ensure you’re on `v1.105.0-rc.1+` to prevent hanging requests due to untimeoutable auth registry loads.  

👉 **Action Items**: Update to `v1.105.0-rc.1`, validate cost logs for multi-modal inputs, and review your proxy’s `SERVER_ROOT_PATH` setup to prevent UI reload issues.  

---  
*Digest generated: 2026-10-05 | Source: [BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-05**

#### **1. Today's Highlights**  
Critical performance regressions have emerged in recent builds affecting multi-GPU tensor split inference and GGUF model loading, with reported throughput dropping from ~115 t/s to just 48 t/s on dual RTX 5070 Ti setups. Meanwhile, significant progress is underway in audio pipeline refinement and ROCm/FLUX optimizations, including fused RoPE support that boosts image generation speed by up to 8%.

#### **2. Releases & Breaking Changes**  
None. No new releases were published in the last 24 hours.

#### **3. New Model & Hardware Support**  
- ✅ **Qwen3-TTS**: Added fast fine-tuning support via PR #12646 (autoregressive talker + code predictor).  
- ✅ **Anthropic Studio Tools**: Enabled for MCP, Chat with Files, and Deep Research in Studio (PR #12497).  
- ✅ **ROCm FLUX Optimization**: Fused RoPE implemented for FLUX.2-klein, yielding 8% faster image generation per step on AMD Radeon 780M (PR #12701).  
- ⚠️ **Vulkan GGUF Inference**: Fails on AMD Radeon 780M due to `ErrorOutOfDeviceMemory` (Issue #12695); workaround pending.

#### **4. Performance & Optimization**  
- 📉 **Severe Throughput Regression**: Tensor split mode (`--split-mode tensor`) on dual GPUs shows a **~58% drop in tokens/sec** (from ~115 t/s to 48 t/s) starting with commit `b10715-mix-86bd2d3`, likely tied to `max_cuda_graphs = 64` (Issue #12468).  
- 🔥 **FLUX Speedup**: Fused RoPE on ROCm improves FLUX.2-klein generation by **8% per image**, pixel-identical output (PR #12701).  
- 💡 **KV Cache Warnings**: Studio now warns when `iq4_nl` KV cache falls back to CPU on CUDA/HIP, preventing silent performance degradation (PR #7008).  
- 🔄 **Concurrency Control**: Added configurable API inference concurrency limit via `UNSLOTH_API_MAX_CONCURRENCY` (PR #5482).

#### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|--------|------|--------|------------|
| 🔴 High | [Issue #12468] Tensor split decode slowdown (2.9x slower) | Dual GPU users lose >50% throughput; affects all prebuilts since `b10715-mix-86bd2d3` | Open – no fix yet |
| 🔴 High | [Issue #12372] mmproj-F16.gguf paged from disk during generation | Severe t/s regression; `--mlock` rejected, extra args stripped | Open – urgent |
| 🔴 High | [Issue #12695] Vulkan GGUF fails on Radeon 780M | Out-of-memory errors prevent inference | Open – driver/backend-specific |
| 🟡 Medium | [Issue #12552] Long-context chat lag | Degraded UX in extended conversations | Open – minimal detail |
| 🟡 Medium | [Issue #12673] Context bar not populating for llama.cpp/custom connections | Misleading usage stats | Open |

> *Note: Several high-severity issues are actively under investigation, particularly around GPU memory management and quantized model loading.*

#### **6. What This Means for Application Developers**  
- Avoid using `b10715-mix-86bd2d3` or later if you rely on tensor-split inference across multiple GPUs—stick to `b10687-mix-67dfc8b` or official `ggml-org` builds until the regression is resolved.  
- If deploying on AMD ROCm, leverage the new fused RoPE support in FLUX pipelines for better performance.  
- For production APIs, use `UNSLOTH_API_MAX_CONCURRENCY` to prevent resource exhaustion under load.  
- Be cautious with `--mlock` and custom `--extra-args`—these may be silently ignored in newer Studio versions (per #12372).  
- Monitor the `unsloth-cli` and `studio` installation paths, as uninstallers now warn about leftover `uv` caches (PR #10442).  

🔗 [GitHub Issues](https://github.com/unslothai/unsloth/issues) | [GitHub PRs](https://github.com/unslothai/unsloth/pulls)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*