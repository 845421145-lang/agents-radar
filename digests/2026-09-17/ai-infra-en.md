# AI Infrastructure Digest 2026-09-17

> Generated: 2026-09-17 00:50 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-17**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of *high specialization and hybridization*, where performance, stability, and hardware diversity are no longer secondary concerns but core differentiators. Projects are diverging along architectural lines: vLLM and SGLang focus on high-throughput, distributed inference with speculative decoding; llama.cpp targets edge and cross-platform deployment; Ollama prioritizes developer experience and local-first workflows; LiteLLM consolidates multi-provider routing with enterprise-grade observability; and Unsloth strengthens the desktop/local agent layer with security and UX polish. Critical bottlenecks—MoE model crashes, speculative decoding instability, and GPU memory corruption—are now systemic across stacks, signaling that production readiness hinges not just on features, but on robustness at scale.

---

### **2. Activity Comparison**

| Project       | Open Issues (Total) | Open PRs | Recent Release? | Status |
|---------------|---------------------|----------|------------------|--------|
| **vLLM**      | 87                  | 134      | `v0.28.1rc1.dev628` | Stable (pre-v0.29.0) |
| **SGLang**    | 124                 | 172      | `v0.5.16`        | Stable (no new release) |
| **llama.cpp** | 141                 | 119      | `b11010`, `b11009` | Patched releases (beta) |
| **Ollama**    | 108                 | 89       | None             | Active development |
| **LiteLLM**   | 67                  | 78       | `v1.103.0-dev.1` | Released (security-focused) |
| **Unsloth**   | 89                  | 102      | `v2026.9.17-arm64` | Released (Windows ARM64) |

> ✅ **Insight**: SGLang and llama.cpp show highest activity in PR volume, indicating rapid feature expansion. vLLM maintains the most mature release pipeline with pre-stable versions targeting production use. LiteLLM leads in security-conscious release discipline.

---

### **3. Model Support Race**

| New Model / Architecture         | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash**          | ✅   | ✅ (in progress) | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.8-Flash-Next**           | ✅   | ❌ | ❌ | ❌ | ❌ | ⚠️ (MTP abort) |
| **Kimi-K3 DSpark**               | ✅   | 🚧 (synthetic verifier) | ❌ | ❌ | ❌ | ❌ |
| **T-Head PPU (ZW810/ZW890P)**    | ❌ | 🚧 (roadmap) | ❌ | ❌ | ❌ | ❌ |
| **SenseNova-U1/U1.5**            | ❌ | 🚧 (tracking) | ❌ | ❌ | ❌ | ❌ |
| **Gemma 4 / Qwen3.5 (fused QKV)**| ❌ | ❌ | ✅ (`b11009`) | ❌ | ❌ | ❌ |
| **Nemotron-H Vision (MLX)**      | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

> 🏆 **Leader**: **vLLM** leads in production-ready support for next-gen models (DeepSeek-V4.1, Qwen3.8-Flash-Next), especially with MoE and speculative decoding.  
> 🚧 **Emerging Contenders**: **SGLang** is rapidly catching up with DeepSeek-V4.1 integration and ROCm kernel fusion.  
> 📉 **Gap Areas**: Ollama and LiteLLM lag in model-specific optimizations; Unsloth lacks broad model coverage outside GGUF/quantized formats.

---

### **4. Performance Frontier**

| Optimization Focus           | vLLM                     | SGLang                   | llama.cpp                | Ollama                    | LiteLLM                  | Unsloth                  |
|-------------------------------|--------------------------|--------------------------|--------------------------|---------------------------|--------------------------|--------------------------|
| **KV Cache & Memory**         | ✅ PCP + DP, NixlConnector overlapped WRITE-push | ✅ HiCache persistence, slot translation fusion | ✅ Vulkan/SYCL crash fixes, MoE TDR handling | ✅ MLX warm-up prefill, CUDA budgeting | ✅ Per-team rate limit fix, cost tracking | ✅ Prefill progress API, auto-reload |
| **Batching & Parallelism**    | ✅ PCP + DP, MTP, data parallelism | ✅ Hierarchical cache, fused kernels | ✅ NCCL tensor parallelism (RPC) | ✅ Multi-model load limits | ✅ Streaming efficiency via test isolation | ✅ Opt-in telemetry |
| **Kernel & Fused Ops**        | ✅ MiniMax-M3 top-k merge, Llama-4 MoE fusing | ✅ Qwen3-Next GDN prefill fusion, HiSparse translation | ✅ CUDA graphs (MTP), fused QKV | ✅ Structured outputs (single-pass) | ✅ Prometheus metrics, e2e test isolation | ✅ Progress tracking, reconnection |
| **Quantization & Edge**       | ✅ FP8 MoE, UVA offloading | ✅ GLM-5.2/5.3 RoPE-free prefill | ✅ Q6_K/Q4_K on Hexagon DSP | ✅ Native tool calls (MiniCPM5) | ✅ Transcribe pass-through | ✅ Windows ARM64, Nixpkgs |
| **Distributed Serving**       | ✅ PCP + DP, ROCm/NVIDIA | ✅ Hybrid GDN/Mamba, HiCache | ✅ NCCL-based RPC (future) | ❌ | ✅ Multi-provider proxy | ❌ |

> 🔥 **Top Performers**: **vLLM** dominates in advanced batching and distributed inference. **SGLang** excels in kernel fusion and hierarchical caching. **llama.cpp** leads in edge and mobile quantization.  
> 💡 **Emerging Pattern**: Cross-layer optimization is key—e.g., **vLLM’s PCP+DP**, **SGLang’s fused prefill**, **Unsloth’s auto-reload**, **LiteLLM’s cost tracking**—all reflect deeper system-level thinking.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Role Summary |
|---------------|------------------------------------|--------------|
| **vLLM**      | **Serving Engine**                 | High-performance, scalable inference engine for cloud/HPC; optimized for MoE, speculative decoding, and large-scale batching. |
| **SGLang**    | **Serving Engine + Gateway**       | Next-gen inference stack with built-in router, hybrid model support, and low-latency speculation; bridges to application logic. |
| **llama.cpp** | **Local Runtime / Edge Runtime**   | Universal, cross-platform inference runtime; ideal for embedded, mobile, and offline use cases with strong quantization and backend support. |
| **Ollama**    | **Local Gateway / Developer Tool** | Developer-first CLI and local server for quick prototyping; increasingly acts as a local gateway with model management and structured output. |
| **LiteLLM**   | **API Gateway / Proxy Layer**      | Enterprise-grade API proxy with cost control, rate limiting, multi-provider routing, and observability—critical for production AI pipelines. |
| **Unsloth**   | **Desktop Agent / Local UI Layer** | Desktop-native interface for local inference and fine-tuning; focuses on UX, security, and developer workflow for personal or small-team use. |

> 🎯 **Strategic Insight**: The stack is clearly stratifying: **gateway/proxy (LiteLLM)** → **engine (vLLM/SGLang)** → **runtime (llama.cpp)** → **agent/UI (Unsloth/Ollama)**. This enables modular composition—e.g., use LiteLLM + vLLM + Ollama in a single pipeline.

---

### **6. Trend Signals**

#### **Key Industry Trends Extracted from Today’s Activity**:
1. **Hybrid Architectures Are Mainstream**: MoE, GDN, Mamba, and dual-stack models (e.g., HrmTextForCausalLM) are now actively supported—indicating a shift beyond standard transformers.
2. **Speculative Decoding Is Still Fragile**: Multiple critical issues across vLLM, SGLang, and llama.cpp suggest this feature remains experimental in production.
3. **Hardware Diversity Is Driving Innovation**: ROCm 7.14, Intel XPU, AMD RX 6750 XT, Qualcomm Hexagon, Apple Silicon ARM64—all receiving targeted fixes, showing that "universal" inference is dead; *targeted* optimization is king.
4. **Security by Design Is Non-Negotiable**: SSRF patches (Unsloth), cosign-signed images (LiteLLM), and secure remote fetches signal growing maturity in trust boundaries.
5. **Observability and Cost Control Are Table Stakes**: LiteLLM’s rate-limiting fixes, usage tracking, and Prometheus telemetry reflect rising demand for financial and operational visibility.

#### **What Application Developers Should Watch**:
- ✅ **Avoid speculative decoding** on DeepSeek-V4.1 and Qwen3.8-Flash-Next until patched builds are available.
- ✅ **Use vLLM or SGLang** for large-scale, distributed inference with MoE and high-throughput batching.
- ✅ **Leverage LiteLLM** for multi-provider, cost-controlled APIs in enterprise applications.
- ✅ **Prioritize model compatibility and memory safety** when using Ollama or Unsloth—especially on Vulkan/AMD.
- ✅ **Monitor CI/CD stability**—many regressions stem from unstable test environments (e.g., SGLang’s 300+ coredump comments).

> 🚨 **Final Note**: The era of “plug-and-play” inference is over. **Infrastructure engineers must now choose based on workload profile, hardware, and reliability requirements—not just features.**

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-17**

---

### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance for next-generation models, with critical fixes for speculative decoding on DeepSeek-V4.1-Flash and Qwen3.8-Flash-Next under high-load conditions. Key progress includes enabling prefill context parallelism (PCP) with data parallelism on ROCm and NVIDIA GPUs, and a major PR addressing MoE model CPU offloading crashes on Intel XPU. These updates reflect strong momentum in supporting hybrid architectures and large-scale inference at scale.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The latest stable version remains `v0.28.1rc1.dev628+g2a02f6efe`, with ongoing refinements toward `v0.29.0`.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash**: Full support added for SM120 (GB10/B300) with corrected sparse-MLA page geometry and CUDA graph fallbacks via [PR #57028](https://github.com/vllm-project/vllm/pull/57028).  
- ✅ **Qwen3.8-Flash-Next**: Addressed non-deterministic greedy decoding due to `persistent_topk` in prefill when near `indexer_budget` ([Issue #54521](https://github.com/vllm-project/vllm/issues/54521)).  
- ✅ **Intel XPU (GPU)**: Fixed OOM during MoE weight loading by preserving UVA-offloaded expert weights ([PR #57215](https://github.com/vllm-project/vllm/pull/57215)).  
- ✅ **ROCm (AMD MI355X)**: Enhanced PCP + DP integration for MoE and MTP decoding ([PR #57075](https://github.com/vllm-project/vllm/pull/57075)).  
- 🚧 **Kimi-K3 DSpark**: Compact synthetic verifier suffix introduced to reduce target verification overhead ([PR #57048](https://github.com/vllm-project/vllm/pull/57048)).

---

### **4. Performance & Optimization**  
- 🔥 **Speculative Decoding Efficiency**:  
  - Reduced target verification rows from 7 → 4 for K=6 / AL=3.75 on Kimi-K3 DSpark, maintaining full draft token generation ([PR #57048](https://github.com/vllm-project/vllm/pull/57048)).  
  - Optimized MiniMax-M3 decode top-k merge: reduced kernel launches from 3 → 2 per CTA ([PR #56149](https://github.com/vllm-project/vllm/pull/56149)).  
- ⚙️ **Memory & Kernel Optimization**:  
  - Moved DeepGEMM warmup before KV-cache profiling to prevent startup OOMs ([PR #57258](https://github.com/vllm-project/vllm/pull/57258)).  
  - Fused Llama-4 (FP8) MoE weight loading to avoid fragmented H2D transfers ([PR #47580](https://github.com/vllm-project/vllm/pull/47580)).  
- 📈 **Disaggregated Inference**:  
  - Added opt-in overlapped WRITE-push for NixlConnector to improve P/D-split throughput by overlapping KV transfer with compute ([PR #56874](https://github.com/vllm-project/vllm/pull/56874)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| 🔴 **Critical** | Non-deterministic greedy output on Qwen3.8-Flash-Next near `indexer_budget` | Open | [Issue #54521](https://github.com/vllm-project/vllm/issues/54521) |
| 🔴 **Critical** | Illegal memory access in SM120 sparse-MLA prefill with DeepSeek-V4.1-Flash + DSpark spec decode | Open | [Issue #56771](https://github.com/vllm-project/vllm/issues/56771) |
| 🔴 **Critical** | GPU OOM/hang on GB10 during long prefill due to unbounded per-chunk logits buffer in QSA indexer | Open | [Issue #56457](https://github.com/vllm-project/vllm/issues/56457) |
| 🟡 **High** | Crash on abort during request waiting in `ExampleHiddenStatesConnector` | Open | [PR #56841](https://github.com/vllm-project/vllm/pull/56841) |
| 🟡 **High** | EngineCore failure without diagnostic state snapshot on fatal crash | Open | [Issue #54229](https://github.com/vllm-project/vllm/issues/54229) |

> *Note: Several issues impact production stability for MoE, hybrid attention, and multi-GPU setups.*

---

### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding on DeepSeek-V4.1-Flash and Qwen3.8-Flash-Next** — ensure you’re on a patched build or use `--disable-spec-decoding` if deterministic outputs are required.  
- **Leverage PCP + DP on ROCm/NVIDIA** for higher throughput in MoE and large-batch scenarios; enable via `--enable-pcp --data-parallel-size`.  
- **Avoid `VLLM_BATCH_INVARIANT=1` with GDN/Qwen3.5/GDN models** until [PR #48613](https://github.com/vllm-project/vllm/pull/48613) lands.  
- **Enable `get_kv_cache_group_metadata`** if using external routing (e.g., Dynamo), as it was recently restored in [PR #56925](https://github.com/vllm-project/vllm/pull/56925).  
- **Monitor memory usage with MoE models on XPU** — offloading may not reduce peak VRAM unless explicitly handled (see [PR #57215](https://github.com/vllm-project/vllm/pull/57215)).

> 💡 **Pro Tip**: For multimodal agents, consider upgrading to `v0.29.0` preview builds to benefit from improved ViT CUDA graph support ([Issue #38175](https://github.com/vllm-project/vllm/issues/38175)) and robust tool parsing (`qwen3_xml` parser fix in [PR #49648](https://github.com/vllm-project/vllm/pull/49648)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-17

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to accelerate its support for next-generation LLM architectures and hardware backends, with major progress on **DeepSeek-V4.1 integration**, **AMD ROCm optimizations**, and **Qwen3-Next GDN prefill fusion**. Critical stability work is underway for **CUDA coredumps (Issue #26340)** and **speculative decoding crashes under high load**, while new PRs focus on robustness in **HiCache persistence**, **LoRA buffer sizing**, and **function call parsing**.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were introduced. Users should continue using `sglang v0.5.16` or later, with caution around speculative decoding and hybrid model configurations pending fixes.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1**: Full integration now in progress via PRs [#38798](https://github.com/sgl-project/sglang/pull/38798), [#39666](https://github.com/sgl-project/sglang/pull/39666), and [#39665](https://github.com/sgl-project/sglang/pull/39665), including vision tower, image preprocessing, chat encoding, and tool parsing.  
- ✅ **AMD ROCm (gfx950)**: New fused DSA indexer decode path for **GLM-5.2** ([PR #38583](https://github.com/sgl-project/sglang/pull/38583)) and zero-RoPE MHA prefill support for **GLM-5.3-Flash** ([PR #39338](https://github.com/sgl-project/sglang/pull/39338)).  
- 🚧 **T-Head PPU** (ZW810/ZW890P): Roadmap initiated ([Issue #37519](https://github.com/sgl-project/sglang/issues/37519)) to enable first-class support.  
- 🚧 **SenseNova-U1/U1.5**: Feature tracking ongoing ([Issue #37742](https://github.com/sgl-project/sglang/issues/37742)).

---

### **4. Performance & Optimization**  
- 🔥 **Qwen3-Next GDN Prefill Fusion**: PR [#39873](https://github.com/sgl-project/sglang/pull/39873) replaces a 4-kernel chain with a fused AITER kernel, reducing intermediate tensor overhead and improving prefill throughput.  
- ⚡ **HiSparse Slot Translation**: PR [#39837](https://github.com/sgl-project/sglang/pull/39837) fuses padding-preserving translation logic, reducing kernel launch overhead and improving memory utilization.  
- 📊 **Benchmarking Improvements**: PR [#39661](https://github.com/sgl-project/sglang/pull/39661) ensures `bench_serving` records cache flush state, enabling accurate reproducibility across CI/local runs.  
- 💾 **Weight Cache Daemon**: Phase 1 deployed ([#27139](https://github.com/sgl-project/sglang/pull/27139)), reducing weight load time from ~306–327s to <1s on Qwen3-235B FP8 ([blog](https://www.lmsys.org/blog/2026-08-21-sglang-quantized-models/)).

---

### **5. Stability & Regressions**  
Critical stability issues remain active and require attention:

| Severity | Issue | Summary | Fix Status |
|---------|-------|--------|------------|
| 🔴 High | [#26340](https://github.com/sgl-project/sglang/issues/26340) | Auto-collected CUDA coredumps across `pr-test.yml`; over 300 comments indicate systemic instability under test. | In progress — no fix PR yet |
| 🔴 High | [#37633](https://github.com/sgl-project/sglang/issues/37633) | CUDA illegal memory access in QSA extend forward at 8+ concurrent requests (H20 TP8). Suppressed by `CUDA_LAUNCH_BLOCKING=1`. | Root cause unconfirmed; workaround known |
| 🔴 High | [#39830](https://github.com/sgl-project/sglang/issues/39830) | Hierarchical cache returns incorrect output in hybrid (GDN/Mamba) models due to voice misalignment across passes. | No fix yet |
| 🟡 Medium | [#39444](https://github.com/sgl-project/sglang/issues/39444) | HiCache `write_through` fails to persist first-seen prefixes before eviction → data loss risk. | No fix PR yet |
| 🟡 Medium | [#39645](https://github.com/sgl-project/sglang/issues/39645) | Retracted `input_embeds` requests silently splice generations due to `send_token_offset` surviving discard of `output_ids`. | No fix yet |

> Note: Several regressions affect **speculative decoding** (`EAGLE`, `DSPARK`) and **hybrid models** (GDN/Mamba), particularly on **H20/B300/H100**.

---

### **6. What This Means for Application Developers**  
- **Avoid speculative decoding** with `--speculative-algorithm EAGLE` or `DSPARK` on H20/B300 until [#37633](https://github.com/sgl-project/sglang/issues/37633) and [#39830](https://github.com/sgl-project/sglang/issues/39830) are resolved.  
- Use `--disable-overlap-schedule` or `CUDA_LAUNCH_BLOCKING=1` as temporary workarounds for concurrency crashes.  
- When benchmarking, ensure `--flush-cache` is explicitly set — `bench_serving` now auto-flushes in CI but not locally ([PR #39661](https://github.com/sgl-project/sglang/pull/39661)).  
- For production deployments on **ROCm**, leverage the new fused kernels in GLM-5.2/5.3 for improved decode performance.  
- Expect future support for **DeepSeek-V4.1**, **T-Head PPU**, and **SenseNova-U1** — monitor their respective tracking issues for release timelines.

---  
*Digest generated: 2026-09-17 | Source: [sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-17**

---

### **1. Today's Highlights**  
The latest updates focus on critical Vulkan and CUDA stability fixes, particularly addressing GPU driver crashes and memory corruption issues affecting MoE models and high-context-length inference. Key improvements include a workaround for an NVIDIA driver bug in `argsort_large.comp`, enhanced support for Q6_K/Q4_K quantization on Hexagon, and optimizations to fused QKV attention handling for Gemma 4 and Qwen3.5 — all vital for production-grade LLM serving.

---

### **2. Releases & Breaking Changes**  
- **`b11010` (Vulkan)**: Fixed intermittent `ARGSORT` failures on Turing GPUs by adding shared memory usage in `argsort_large.comp` — a workaround for an NVIDIA driver-level bug ([PR #28975](https://github.com/ggml-org/llama.cpp/pull/28975)).  
- **`b11009` (TP/Fused QKV)**: Corrected split state calculation for fused QKV layers in Gemma 4 and Qwen3.5, fixing incorrect tensor splits when `--fuse-qkv` is used with non-standard `n_embd` vs `n_head * n_embd_head_k` dimensions ([PR #28965](https://github.com/ggml-org/llama.cpp/pull/28965)).  
- **`b11007` (CUDA MTP)**: Enabled CUDA graphs for Multi-Token Prediction (MTP) draft decoding, improving speculative execution efficiency ([PR #28549](https://github.com/ggml-org/llama.cpp/pull/28549)).

> 💡 **Migration Note**: Users of `--fuse-qkv` with Gemma 4 or Qwen3.5 should upgrade to `b11009+` to avoid context length mismatches or decode errors.

---

### **3. New Model & Hardware Support**  
- **Hexagon (Qualcomm)**: Added native support for **Q6_K and Q4_K quantization kernels** on Hexagon DSPs, enabling efficient on-device inference on Snapdragon platforms ([PR #28994](https://github.com/ggml-org/llama.cpp/pull/28994)).
- **Model Support**: Added `HrmTextForCausalLM` (DFM Mimir 1B), a dual-stack transformer model that alternates between low/high computation cycles — important for lightweight reasoning agents ([PR #27625](https://github.com/ggml-org/llama.cpp/pull/27625)).
- **Backend Expansion**: Continued work on **NCCL-based tensor parallelism in CUDA**, with PR #28967 laying the foundation for distributed multi-GPU training/inference via RPC server ([PR #28967](https://github.com/ggml-org/llama.cpp/pull/28967)).

---

### **4. Performance & Optimization**  
- **CUDA Graphs**: Enabled for MTP draft decoding (`b11007`) — reduces overhead in speculative generation pipelines, especially under high-throughput scenarios.
- **SYCL Memory Access**: Improved access patterns in `im2col` kernel (`b11002`) — reduces memory bandwidth pressure on AMD/Intel GPUs.
- **Hexagon Kernels**: Optimized Q6_K and Q4_K GEMM kernels now available, reducing compute latency on mobile SoCs.
- **GPU Scheduler**: PR #26167 introduces a **scheduler sanitizer** (`GGML_SCHED_SANITIZE=1`) to detect race conditions during model scheduling — valuable for debugging concurrency issues in complex agent workflows.

---

### **5. Stability & Regressions**  
| Severity | Issue | Affected Backend | Impact | Fix Status |
|---------|------|------------------|--------|------------|
| Critical | Crash with MoE models (Qwen3.6-35B-A3B-MTP) on Intel Arc B70 Vulkan | Vulkan | GPU TDR resets, process crash | [Issue #23769](https://github.com/ggml-org/llama.cpp/issues/23769) (Open, 12 comments) |
| High | SYCL scratchpad allocation spikes to 2GB+ with `ngram-mod` enabled | SYCL | Out-of-memory crashes on consumer GPUs | [Issue #28860](https://github.com/ggml-org/llama.cpp/issues/28860) (Open, 12 comments) |
| High | DFlash2 draft triggers TDR on dual Intel Arc Pro B70 | SYCL | Driver reset, no clean error path | [Issue #28778](https://github.com/ggml-org/llama.cpp/issues/28778) (Open, 9 comments) |
| Medium | Prompt processing speed drops ~25x after `b10780` on Vulkan/RDNA3 | Vulkan | Degraded throughput in long-context scenarios | [Issue #28752](https://github.com/ggml-org/llama.cpp/issues/28752) (Open, 8 comments) |
| Medium | `--no-kv-offload` causes immediate EOS with Qwen3.6-27B on Vulkan | Vulkan | Model fails to generate beyond first token | [Issue #24519](https://github.com/ggml-org/llama.cpp/issues/24519) (Open, 4 comments) |

> ⚠️ **Note**: Several regressions involve **MoE models**, **speculative decoding**, and **high-context inference**, indicating instability in advanced inference patterns.

---

### **6. What This Means for Application Developers**  
- **Use `b11009+` or later** if deploying Gemma 4 or Qwen3.5 with `--fuse-qkv` — earlier versions risk silent decode errors due to incorrect tensor splitting.
- **Avoid `--no-kv-offload` with Qwen3.6-series on Vulkan** until fix lands; consider using `--kv-offload` instead for stable generation.
- **Monitor SYCL memory usage** when enabling `ngram-mod` or using large draft models — current behavior may trigger OOM on mid-tier GPUs.
- **Leverage `--repack` in `llama-bench`** (new in `b11006`) for consistent benchmarking across backends.
- **Enable `GGML_SCHED_SANITIZE=1`** during development of complex multi-agent systems to catch scheduler races early.
- **Watch for future NCCL integration** — upcoming multi-GPU support will unlock scalable inference on HPC clusters.

> 🔗 For real-time monitoring: [GitHub Issues Dashboard](https://github.com/ggml-org/llama.cpp/issues?q=is%3Aopen+sort%3Aupdated-desc)

---  
*Digest generated: 2026-09-17 | Source: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-17**

---

### **1. Today's Highlights**  
The Ollama project continues its focus on stability and developer experience, with critical fixes for tool call parsing in MiniCPM5-2B (#18483) and a new PR addressing Vulkan memory management on AMD GPUs (#18481). Notably, the built-in CLI agent was removed in #18393 due to privacy concerns, prompting a feature request (#18490) to restore it as an opt-in option—highlighting ongoing tension between usability and security.

---

### **2. Releases & Breaking Changes**  
No new releases were published in the last 24 hours. However, **PR #18393** (merged) removed the built-in CLI agent from `ollama`’s default entry point. This change impacts users relying on the agent for local workflows, particularly in enterprise environments; a follow-up feature request (#18490) calls for restoring it via optional CLI flags. Developers should update scripts or automation tools that depend on the agent’s presence.

> 🔗 [PR #18393 – Remove built-in agent](https://github.com/ollama/ollama/pull/18393)

---

### **3. New Model & Hardware Support**  
- **Mistral Small 4** is now requested (#15142), reflecting demand for the latest open-source model from Mistral AI.
- **Nemotron-H vision support** has been added for MLX backend via PR #17714, enabling multimodal inference on supported hardware.
- **Vulkan support on AMD RX 6750 XT and Intel Iris Xe iGPU** remains unstable, with multiple issues reported (#18494, #18482), indicating ongoing challenges in cross-platform GPU compatibility.

> 🔗 [Issue #15142 – Add Mistral Small 4](https://github.com/ollama/ollama/issues/15142)  
> 🔗 [PR #17714 – MLX vision support for Nemotron-H](https://github.com/ollama/ollama/pull/17714)

---

### **4. Performance & Optimization**  
- **MLX engine optimizations** are advancing rapidly:  
  - PR #16085 introduces **warm-up prefill** to populate MLX compile caches early, reducing TTFT on cold loads.  
  - PR #18481 implements **GPU memory budgeting** (95% of free VRAM) for CUDA devices, preventing OOM during model loading.  
- **API-level improvements**: PR #18479 enables single-pass structured outputs on thinking models, eliminating redundant prefill cycles and improving throughput by avoiding double generation overhead.

> 🔗 [PR #16085 – Warm up MLX compile paths](https://github.com/ollama/ollama/pull/16085)  
> 🔗 [PR #18481 – Budget GPU memory for CUDA](https://github.com/ollama/ollama/pull/18481)  
> 🔗 [PR #18479 – Single-pass structured outputs](https://github.com/ollama/ollama/pull/18479)

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:

| Issue | Severity | Status | Fix PR |
|------|----------|--------|-------|
| `qwen3.8`: "no user query found" error in streaming chat (#17778) | High | Open | — |
| `gemma4-e4b`: OOM on Jetson Orin Nano 8GB with `--load-mode dio` (#18396) | High | Open | — |
| `minicpm5-2b`: Native tool calls never parse due to token stripping (#18483) | High | Open | ✅ [PR #18499](https://github.com/ollama/ollama/pull/18499) |
| `qwen3-vl:8b-instruct`: Crash on Vulkan AMD after multi-model load (#18494) | Critical | Open | — |
| `llama3.2-vision`: Fails to load with "unknown model architecture: 'mllama'" (#18486) | High | Open | — |

These indicate persistent challenges in handling multimodal models and complex tool call pipelines across backends.

> 🔗 [Issue #17778 – Qwen 3.8 streaming error](https://github.com/ollama/ollama/issues/17778)  
> 🔗 [Issue #18396 – Gemma 4 E4B OOM on Jetson](https://github.com/ollama/ollama/issues/18396)  
> 🔗 [PR #18499 – Fix MiniCPM5 tool call parsing](https://github.com/ollama/ollama/pull/18499)

---

### **6. What This Means for Application Developers**  
- **Tool call reliability is fragile**: Native tool calls (especially for MiniCPM5-2B and Gemma4) may fail silently due to token mangling or parser misalignment. Use OpenAI-compatible schema format as fallback until PR #18499 is merged.
- **Multimodal models require caution**: Avoid loading multiple VL models simultaneously on Vulkan (AMD/NVIDIA) systems—expect crashes or OOMs.
- **CLI agents are deprecated**: If you rely on the built-in agent, prepare for migration to external tooling or opt-in configurations—consider contributing to #18490.
- **Performance tuning is essential**: For production use on GPU-heavy workloads, leverage `OLLAMA_MAX_LOADED_MODELS`, `OLLAMA_KV_CACHE_TYPE`, and monitor memory budgets—especially on CUDA systems.

> 🔗 [PR #18490 – Restore CLI agent as opt-in](https://github.com/ollama/ollama/issues/18490)  
> 🔗 [PR #18473 – Expose model thinking levels](https://github.com/ollama/ollama/pull/18473) *(for client-side reasoning control)*

---  
*Digest generated: 2026-09-17 | Source: GitHub – ollama/ollama*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-17**

---

### **1. Today's Highlights**  
The LiteLLM proxy continues to mature with critical stability and observability improvements, particularly around budgeting, rate limiting, and streaming reliability. Key PRs focus on fixing double-counting in per-team rate limits, ensuring proper cost tracking for Bedrock passthrough, and improving Prometheus metrics for budget-related errors. New support for Amazon Transcribe pass-through routes expands the proxy’s utility in voice-enabled AI workflows.

---

### **2. Releases & Breaking Changes**  
- **v1.103.0-dev.1** and **v1.102.0-rc.2** released with enhanced security via cosign-signed Docker images (key from [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)).  
  → All users should verify image signatures using `cosign verify` to ensure integrity.  
  🔗 [Verify Docker Image Signature](https://docs.sigstore.dev/cosign/overview/)  

No breaking API changes reported today.

---

### **3. New Model & Hardware Support**  
- ✅ **Amazon Transcribe SigV4 Pass-Through Routes** added via PR [#41515](https://github.com/BerriAI/litellm/pull/41515): Enables secure, fine-grained access to AWS Transcribe jobs through LiteLLM virtual keys — ideal for speech-to-text pipelines behind enterprise authentication.
- ✅ **Vertex AI Batch Output Streaming**: PR [#41506](https://github.com/BerriAI/litellm/pull/41506) enables streaming of large GCS batch output files (e.g., JSONL, images) without full memory load — crucial for scalable OCR and multimodal processing.

---

### **4. Performance & Optimization**  
- **Per-Team Rate Limiting Fix**: Issue [#34140](https://github.com/BerriAI/litellm/issues/34140) confirmed: v3 rate limiter was **double-counting** team-level model limits, effectively halving configured RPM/TPM. Fixed in PR [#41349](https://github.com/BerriAI/litellm/pull/41349) and [#41495](https://github.com/BerriAI/litellm/pull/41495).
- **Streaming Efficiency**: PR [#41520](https://github.com/BerriAI/litellm/pull/41520) improves e2e test isolation by binding provider-cache recordings to specific deployments — reducing flakiness and enabling more accurate performance benchmarking.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|--------|------|--------|-------|
| High | `Bedrock` rejects requests without `tools=` even for non-tool completions ([#24158](https://github.com/BerriAI/litellm/issues/24158)) | Open | ❌ |
| High | Zero-cost budget bypass allows unbounded spend when fallback is paid ([#41344](https://github.com/BerriAI/litellm/issues/41344)) | Closed | ✅ PR [#41495](https://github.com/BerriAI/litellm/pull/41495) |
| Medium | Streaming drops upstream `usage` when final chunk has `choices` array → lost `cached_tokens`, inflated billing ([#36168](https://github.com/BerriAI/litellm/issues/36168)) | Open | ❌ |
| Medium | Ghost models persist across workers due to Redis Pub/Sub sync gap ([#27852](https://github.com/BerriAI/litellm/issues/27852)) | Open | ❌ |
| Low | `api_key_alias="None"` in Prometheus metrics during `BudgetExceededError` ([#30228](https://github.com/BerriAI/litellm/issues/30228)) | Closed | ✅ PR [#41495](https://github.com/BerriAI/litellm/pull/41495) |

> ⚠️ Critical: The **rate limit double-counting bug** impacts multi-tenant deployments and may lead to unintended throttling or overbilling.

---

### **6. What This Means for Application Developers**  
- **Use `v1.103.0-dev.1` or `v1.102.0-rc.2`** if you rely on team-based rate limiting or zero-cost models — both include fixes for critical budgeting and rate-limiting bugs.
- **Enable Transcribe pass-through** (`POST /transcribe/*`) to securely expose AWS Transcribe APIs via LiteLLM — ideal for voice-driven agents or compliance-heavy apps.
- **Monitor usage logs carefully**: The `Usage` dashboard still shows the admin’s max budget for all users ([#41450](https://github.com/BerriAI/litellm/issues/41450)), so don’t assume visibility into individual budgets.
- **Avoid `tools=`-only requests to Bedrock** until [#24158](https://github.com/BerriAI/litellm/issues/24158) is resolved — use `tools=None` explicitly or upgrade to a newer version with workaround logic.

🔧 **Pro Tip**: Always verify Docker image signatures using `cosign verify` — especially in production environments.  
🔗 [Security Guide: Verify Images](https://docs.sigstore.dev/cosign/overview/)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-17**

---

### **1. Today's Highlights**  
Unsloth continues to strengthen its desktop and CLI tooling with critical fixes for Windows installer robustness, Docker model persistence, and security hardening. Notably, a high-severity SSRF vulnerability in remote image handling has been patched via PR #11160, and multiple CI stability issues were resolved across the codebase. The project also made progress on cross-platform support with Nixpkgs packaging now available.

---

### **2. Releases & Breaking Changes**  
- **New Release**: `Windows-ARM64` binaries added — enabling native execution on Apple Silicon and ARM-based Windows devices.  
  🔗 [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v2026.9.17-arm64)  

> ✅ *No breaking changes reported in this release; backward compatibility preserved.*

---

### **3. New Model & Hardware Support**  
- **Nixpkgs Packaging**: Unsloth Desktop is now available via `nix`-based distributions through [Nixpkgs](https://github.com/NixOS/nixpkgs/pull/30125).  
  🔗 [Issue #11135](https://github.com/unslothai/unsloth/issues/11135)  
- **ROCm 7.14 Support**: Installer now correctly detects ROCm 7.14 and avoids installing incompatible PyTorch 2.11 (ROCm 7.2).  
  🔗 [Issue #10657](https://github.com/unslothai/unsloth/issues/10657)  
- **AMD GPU Recognition Fix**: RX 5700XT now properly recognized in Unsloth Desktop (issue #8529).  
  🔗 [Issue #8529](https://github.com/unslothai/unsloth/issues/8529)

---

### **4. Performance & Optimization**  
- **Inference Latency Improvements**:  
  - Added `prefill progress` tracking over API (`/api/prefill_progress`) to enable client-side UI feedback during long prompt processing.  
    🔗 [Issue #11141](https://github.com/unslothai/unsloth/issues/11141)  
  - Auto-reload models on `llama.cpp` reconnect enables faster cold-start inference without manual reload.  
    🔗 [Issue #11092](https://github.com/unslothai/unsloth/issues/11092)  
- **Memory Efficiency**:  
  - Fixes for `quant_state=None` loading on Windows for pre-quantized bnb-4bit checkpoints prevent shape errors during forward pass.  
    🔗 [Issue #10017](https://github.com/unslothai/unsloth/issues/10017)  
- **Training Runtime Metrics**: Opt-in Prometheus-style telemetry for inference and training (vLLM-inspired).  
  🔗 [PR #4238](https://github.com/unslothai/unsloth/pull/4238)

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| 🔴 High | SSRF Vulnerability: Remote image URLs passed directly to `llama-server` | Fixed | [PR #11160](https://github.com/unslothai/unsloth/pull/11160) |
| 🔴 High | Docker instructions don’t persist downloaded models due to missing volume mount | Closed | [Issue #10923](https://github.com/unslothai/unsloth/issues/10923) |
| 🟡 Medium | Windows installer fails silently with non-fatal errors | Open | [Issue #9804](https://github.com/unslothai/unsloth/issues/9804) |
| 🟡 Medium | Qwen3.8-Flash-Next MTP aborts at load due to `hc_head_norm` rebase issue | Open | [Issue #11143](https://github.com/unslothai/unsloth/issues/11143) |
| 🟡 Medium | `openai_api_auto_switch_model` fails when no model is loaded | Open | [Issue #11140](https://github.com/unslothai/unsloth/issues/11140) |

> ✅ **Note**: Multiple CI failures on `main` were repaired via PRs #11139, #11144, and #11119.

---

### **6. What This Means for Application Developers**  
- **Build Reliable Local Inference Apps**: Use `/api/prefill_progress` and auto-reload features to improve UX during slow model loads (e.g., large GGUFs like Qwen3.8-27B).  
- **Secure Your Integrations**: Avoid SSRF risks by not passing raw image URLs to `llama-server`; use Studio’s new remote fetch logic instead.  
- **Ensure Persistence in Docker**: Always mount persistent volumes (e.g., `--volume /path/to/models:/workspace/work`) to avoid model loss after restarts.  
- **Optimize for Multi-GPU & Mixed Backends**: With ROCm 7.14 and AMD GPU support improving, developers can now more reliably deploy on heterogeneous systems.  
- **Enable Telemetry for Observability**: Leverage opt-in metrics (PR #4238) to monitor throughput, latency, and memory usage in production deployments.

➡️ **Best Practice**: Validate model paths and mounts in CI/CD pipelines using tools like `pip scan-packages` or `uv` resolver checks (PR #11138).

---  
*Digest compiled from GitHub activity (2026-09-17).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*