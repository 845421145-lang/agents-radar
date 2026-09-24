# AI Infrastructure Digest 2026-09-24

> Generated: 2026-09-24 00:48 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-24**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q3 2026 is defined by rapid convergence toward hybrid model architectures (Mamba+Attention, GDN), aggressive optimization for next-gen hardware (SM120/Blackwell, MI355X, XDNA 2), and growing maturity in agent-native tooling. Projects are increasingly focused on *production-grade stability*, with critical fixes targeting budget enforcement, correctness regressions, and long-context reliability. The shift from monolithic serving to modular, composable stacks—evident in LiteLLM’s guardrail controls and SGLang’s `/v1/decisions` API—is enabling more sophisticated, auditable agentic workflows.

---

### **2. Activity Comparison**

| Project       | Open Issues | PRs (Last 24h) | Release Status       | Notes |
|---------------|-------------|------------------|------------------------|-------|
| **vLLM**      | 128         | 12               | None                  | High focus on correctness (3 high-severity issues); strong momentum in SM120 & ROCm optimizations |
| **SGLang**    | 147         | 9                | Stable: v0.5.20        | 4 high-severity regressions; active dev branch instability detected |
| **llama.cpp** | 152         | 8                | `v0.5.0` released     | Critical Vulkan/Metal regressions; `v0.5.0` stabilizes core server |
| **Ollama**    | 161         | 6                | `v0.34.4-rc1` (RC)    | RC release addresses key MLX/structured output bugs |
| **LiteLLM**   | 136         | 5                | Dev-only (v1.104.0-dev) | No stable release; 3 critical security/regression issues pending |
| **Unsloth**   | 108         | 7                | `v0.1.815-beta` (beta) | Beta release with major new model support; AMD/Windows stability concerns |

> ✅ **Trend**: vLLM and llama.cpp lead in *technical velocity*; Ollama and Unsloth prioritize *user-facing stability* via RC/beta releases.

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3-series (Hybrid Mamba+Attn)** | ✅ (Prefix caching, speculative decode) | ✅ (ROCm opt) | ❌ | ⚠️ (Requested) | ❌ | ✅ (Beta) |
| **GLM-5.3-Flash** | ✅ (In dev, W4A16 issue) | ❌ (Vision broken) | ❌ | ⚠️ (Requested) | ✅ (Cost map added) | ❌ |
| **Qwen-Image-2.1** | ❌ | ❌ | ❌ | ⚠️ (Requested) | ❌ | ✅ (GGUF + FP8 fallback) |
| **Gemma4 DSpark Draft** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **HRM-Text (DFM Mimir 1B)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **MiMo-V2.6 / HunyuanOCR** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Ling-3.0 VL** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |

> 🏆 **Winner**: **Unsloth** leads in *new multimodal/local model support*, particularly with **Qwen-Image-2.1** and **HunyuanOCR**.  
> 🥈 **Runner-up**: **llama.cpp** has the broadest *native GGUF model coverage*, including niche models like HRM-Text and MiMo.  
> 🥉 **Gap**: LiteLLM and Ollama lag in *model-specific runtime support* but excel in *cost mapping and routing*.

---

### **4. Performance Frontier**

| Optimization Focus           | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache Efficiency**       | ✅✅ (FP8, ROCm OOM fix, SM120 split-K) | ✅ (FP8, indexing fixes) | ⚠️ (Vulkan throughput cliff) | ⚠️ (MLX stalls) | ✅ (Caching logs stamped) | ⚠️ (N/A) |
| **Batching & Prefill**        | ✅✅ (Hybrid GDN/Mamba, +7.58x throughput) | ✅ (MoE unified router) | ✅ (CUDA sparse FA recovery) | ⚠️ (Draft-MTP unstable) | ✅ (Usage page scalability) | ✅ (Static step skipping) |
| **Quantization & Sparse ML**  | ✅✅ (NVFP4, ReLU2 MoE, HiSparse buffering) | ✅ (MXFP4, MXFP8 low-latency) | ✅ (q4_0–q6_k, dp4a) | ⚠️ (CPU burn due to polling) | ✅ (Rust cost lib) | ✅ (Per-layer NVFP4 policies) |
| **Distributed Serving**       | ✅ (Multi-card tracking) | ✅ (dLLM serving) | ❌ | ❌ | ✅ (Team-level rate limiting) | ❌ |
| **Kernel-Level Tuning**       | ✅✅ (Occupancy-adaptive Triton) | ✅ (Fused MXFP4, DeepGemm) | ✅ (Metal, Vulkan, SYCL) | ⚠️ (MLX runner hang) | ⚠️ (Rate limiter race) | ✅ (CUDA graphs, kernel fusion) |

> 🔥 **Top Performers**: **vLLM** dominates in *batching efficiency* and *kernel-level tuning*; **Unsloth** excels in *inference latency* (60 FPS).  
> ⚠️ **Critical Risk**: **SGLang** and **Ollama** face *distributed execution hazards* (hangs, crashes) despite advanced features.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Key Differentiators |
|---------------|------------------------------------|---------------------|
| **vLLM**      | **High-performance inference engine** | Optimized for large-scale, batched, long-context inference; best-in-class batching and attention kernels |
| **SGLang**    | **Advanced inference gateway**      | Enables complex patterns (dLLM, hierarchical cache); strong multi-modal and structured output support |
| **llama.cpp** | **Local runtime & cross-platform engine** | Broadest model/hardware coverage (GGUF, Vulkan, Metal, NPU); ideal for edge/offline use |
| **Ollama**    | **Developer-friendly local gateway** | Unified UX for model management; strong MLX/structured output focus; ideal for prototyping |
| **LiteLLM**   | **Enterprise gateway & observability layer** | Superior cost control, budget enforcement, guardrails, and telemetry; designed for team-level governance |
| **Unsloth**   | **Agent-centric local runtime**     | Built for interactive agents; rich UI, toolcall control, and real-time reasoning (60 FPS) |

> 💡 **Stack Insight**: The ecosystem is stratifying—**vLLM/SGLang** power backend inference; **llama.cpp/Ollama** serve local/edge workloads; **LiteLLM** governs production usage; **Unsloth** enables agent-first experiences.

---

### **6. Trend Signals**

1. **Hybrid Architectures Are Now Mainstream**  
   - Mamba+Attention (Qwen3, GLM-5.3-Flash) are no longer experimental. vLLM and SGLang have prioritized prefix caching and speculative decoding—indicating these models are entering production.

2. **Hardware Specialization Is Accelerating**  
   - SM120 (Blackwell), MI355X (gfx950), and XDNA 2 (Ryzen AI NPU) are now key targets. vLLM and Unsloth are leading in GPU-specific kernel optimizations.

3. **Stability > Features in Production**  
   - Despite feature-rich releases (SGLang dLLM, Unsloth 60 FPS), *critical regressions* dominate issue trackers. This signals a maturing phase where robustness is paramount.

4. **Agents Require Structured Output Guarantees**  
   - Multiple projects (Ollama, SGLang, LiteLLM) are fixing JSON schema hangs, streaming guardrail skips, and tool call truncation—proof that *agent reliability* is a top-tier concern.

5. **Cost & Security Governance Are Non-Negotiable**  
   - LiteLLM’s 3 critical budget/security issues highlight that enterprise adoption hinges on enforceable cost control and auditability.

> ✅ **Action for Developers**:  
> - Use **v0.5.0 (llama.cpp)** or **v0.34.4-rc1 (Ollama)** for stable deployment.  
> - Avoid `trtllm_mha` on H200 until fixed.  
> - Monitor **Unsloth’s beta** for agent workflows with visual input.  
> - Leverage **LiteLLM’s email alerts and cost maps** for regulated environments.  
> - Prioritize **prefix caching and draft model stability** when building RAG or agentic systems.

---  
*Report generated: 2026-09-24 | Data sourced from GitHub project digests*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-24

---

### **1. Today's Highlights**  
vLLM continues to advance its support for hybrid Mamba+Attention models with critical performance and correctness improvements, particularly around prefix caching and speculative decoding in Qwen3-series models. Key PRs include optimizations for SM120 (Blackwell) GPUs via occupancy-adaptive Triton kernels and fixes for ROCm KV cache OOM issues on MI355X. A major focus remains on enabling batch-invariant inference and improving stability for long-context reasoning workflows.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes were introduced.

---

### **3. New Model & Hardware Support**  
- ✅ **ROCm / AMD gfx950 (MI355X)**: Active optimization work for `Qwen3.8-2.4T-A95B-Quark-MXFP4` (Issue #57149), including HiSparse host-resident sparse-MLA buffering (PR #57602).  
- ✅ **Intel XPU**: Continued tracking of multi-card and MTP issues with `Qwen3.6-35B-A3B-int4-mixed-AutoRound` (Issue #53119, #50269).  
- ✅ **New model support**:  
  - GLM-5.3-Flash now under active development with attention architecture compatibility tracked (Issue #54062).  
  - Whisper `verbose_json` output handling improved for long audio (Issue #58029).  
- 🔧 **Quantization**: Per-token NVFP4 with ReLU2 MoE support added in FlashInfer (PR #56740), now integrated into vLLM.

---

### **4. Performance & Optimization**  
- 🚀 **SM120 (Blackwell) Optimization**: PR #58482 introduces occupancy-adaptive split-K segment count in Triton unified attention — increases softmax segments from 16 to 64 when SMs are underutilized, improving GPU utilization.  
- ⚡ **Hybrid GDN/Mamba Prefill**: PRs #55873, #55875, and #55876 implement application-directed Mamba checkpointing, achieving **+7.58x prefill throughput** for shared-prefix batches (e.g., catalog attribute extraction).  
- 💡 **Speculative Decoding**: PR #58463 removes redundant metadata rebuild during MTP fused multi-step decode, reducing overhead for DeepSeek-V4 and future models.  
- 📈 **KV Cache Efficiency**: PR #58483 fixes ROCm OOM by resizing KV cache to actual free memory post-profiling, critical for large MoE models like DeepSeek-R1-MXFP4 on TP8/MI355X.

---

### **5. Stability & Regressions**  
| Severity | Issue | Summary | Fix Status |
|--------|------|--------|-----------|
| 🔴 High | [GLM-5.3-Flash long-decode degeneration](https://github.com/vllm-project/vllm/issues/56868) | Degraded performance after accumulated reasoning decode with W4A16 quantization | In progress (no fix PR yet) |
| 🔴 High | [Scheduler stops admitting requests](https://github.com/vllm-project/vllm/issues/53130) | Engine reports healthy but halts admission once `running + skipped_waiting` hits `max_num_seqs` | No fix PR; requires restart to recover |
| 🟡 Medium | [FlashInfer autotune wedges on SM103 (GB300)](https://github.com/vllm-project/vllm/issues/58031) | Autotuner hangs due to missing PTX in `trtllm_gemm.cubin` (sm_100a-only) | Root cause retracted; still under investigation |
| 🟡 Medium | [Gemma 4 31B MTP slower at high context](https://github.com/vllm-project/vllm/issues/52049) | Suboptimal throughput observed with long contexts | No PR yet |
| 🟡 Medium | [Whisper verbose_json drops words](https://github.com/vllm-project/vllm/issues/58029) | Silent truncation of audio segments beyond max_clip_s | PR pending |

---

### **6. What This Means for Application Developers**  
- **For agents & agentic workflows**: The rollout of **prefix caching for hybrid models** (PRs #55873–#55876) enables dramatic gains in throughput for multi-turn, stateful reasoning — especially relevant for RAG, verification, and structured output tasks.  
- **For production deployments**: Be cautious with `--max_num_seqs` settings — the scheduler deadlock bug (#53130) may silently halt request processing. Monitor engine health signals closely.  
- **For developers using AMD GPUs**: Expect ongoing improvements for `gfx950` (MI355X), particularly around sparse MLA and MoE models — use `Qwen3.8-2.4T-A95B-Quark-MXFP4` as a testbed.  
- **For long-context applications**: Avoid `GLM-5.3-Flash` with W4A16 quantization until #56868 is resolved; consider fallback to FP8 or smaller drafts.  
- **For tool-call reliability**: Track PR #57571 (parser cache for stable IDs) to ensure deterministic tool call behavior across retries in streaming mode.

> 🔗 *All links direct to GitHub issues and PRs for full context.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-24**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to deepen its support for advanced inference patterns, with critical work on **dLLM serving**, **FP8 KV cache optimizations**, and **multi-modal robustness**. Key developments include a new `/v1/decisions` endpoint for typed candidate scoring and a fix for stale torch extension locks that could cause permanent hangs in distributed deployments.

---

### **2. Releases & Breaking Changes**  
None. No new releases or breaking changes were published in the past 24 hours. The latest stable release remains `v0.5.20`, with ongoing focus on CI stability and feature parity across backends.

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen3.5 GDN**: AMD ROCm optimization landed via [PR #38806](https://github.com/sgl-project/sglang/pull/38806), improving prefill efficiency on gfx950/gfx1250 GPUs.  
- ✅ **MiniMax-M3**: FP8 K-cache allocation now supported on gfx950 via [PR #36549](https://github.com/sgl-project/sglang/pull/36549).  
- ✅ **SenseNova-U1/U1.5**: Tracking issue opened ([#37742](https://github.com/sgl-project/sglang/issues/37742)) to align with official repository features.  
- ✅ **Inkling multimodal**: HTTP 500 error on invalid image input now fixed in behavior (tracked via [#40897](https://github.com/sgl-project/sglang/issues/40897)).  

*Note: GLM-5.3-Flash vision support remains broken due to pinned `transformers==5.12.1` version; see [#39831](https://github.com/sgl-project/sglang/issues/39831).*

---

### **4. Performance & Optimization**  
- 🚀 **FP8 KV Cache**: Optimizations continue for `--kv-cache-dtype fp8_e4m3`, including fixes for decode overhead ([#30815](https://github.com/sgl-project/sglang/issues/30815)) and indexing issues in `flashmla_kv` backend ([#36333](https://github.com/sgl-project/sglang/issues/36333)).  
- ⚙️ **MoE Routing**: Unified MoE router GEMM layer under one gate kernel proposed ([#38695](https://github.com/sgl-project/sglang/issues/38695)), reducing CPU overhead and enabling precision control.  
- 🔧 **Kernel-Level Improvements**:  
  - AMD: Fused MXFP4 MoE kernel added for small batches on MI355X ([#40204](https://github.com/sgl-project/sglang/pull/40204)).  
  - NVIDIA: DeepGemm updated in CUDA 13.4 image ([#40987](https://github.com/sgl-project/sglang/pull/40987)).  
  - NPU: FP4 expert dispatch optimized via MXFP8 low-latency path ([#40519](https://github.com/sgl-project/sglang/pull/40519)).  
- 📈 **Benchmarking**: New `--gsp-input-ids` flag added to skip server tokenization in benchmarks ([#40900](https://github.com/sgl-project/sglang/pull/40900)).

---

### **5. Stability & Regressions**  
Critical stability issues reported today:

| Severity | Issue | Impact | Status |
|--------|-------|--------|--------|
| 🔴 High | `KeyError: 'model.layers.14.mlp.shared_expert.gate_gate_up_proj.weight'` ([#13214](https://github.com/sgl-project/sglang/issues/13214)) | Model loading failure for specific MoE layers | Open, 15 comments |
| 🔴 High | `--attention-backend trtllm_mha` returns wrong completions on H200 (SM90) | Silent correctness regression in v0.5.20 | [Issue #40921](https://github.com/sgl-project/sglang/issues/40921) — no fix yet |
| 🔴 High | HiCache + hybrid (SSM/Mamba): `cudaHostRegister` aborts entire instance | Full process crash on memory allocation failure | [Issue #40926](https://github.com/sgl-project/sglang/issues/40926) — no fix |
| 🟡 Medium | DeepSeek chunked-prefix prefill merges base-2 LSE into natural-log | Silent accuracy loss on every prefix-cache hit | [Issue #40903](https://github.com/sgl-project/sglang/issues/40903) — no fix |
| 🟡 Medium | Aborted chunks re-send full accumulated text under `--incremental-streaming-output` | Inefficient streaming output | [Issue #40901](https://github.com/sgl-project/sglang/issues/40901) — no fix |

> **Note:** Several regressions stem from recent PRs (e.g., #34160 revert), highlighting risk of unstable state in active development branches.

---

### **6. What This Means for Application Developers**  
- **Avoid `trtllm_mha` on H200 (SM90)** until [issue #40921](https://github.com/sgl-project/sglang/issues/40921) is resolved — it may return incorrect outputs silently.  
- **Use `--gsp-input-ids`** in benchmarks to isolate model performance from tokenization overhead.  
- **Monitor model compatibility** — GLM-5.3-Flash vision and Qwen3.5 GDN are actively being stabilized; expect transient breakage.  
- **Enable `--enable-hierarchical-cache` cautiously** — hybrid SSM/Mamba setups may crash due to `cudaHostRegister` errors ([#40926](https://github.com/sgl-project/sglang/issues/40926)).  
- **Leverage new `/v1/decisions` API** (in progress via [#40992](https://github.com/sgl-project/sglang/pull/40992)) for structured, typed decision-making in agents without parsing raw text.  

Stay vigilant on CI health: 2 broken, 11 flaky tests reported in [issue #17050](https://github.com/sgl-project/sglang/issues/17050). Use `dev` images only for testing; avoid production use of untested code.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-24**

---

### **1. Today's Highlights**  
The `v0.5.0` release delivers significant backend improvements, including enhanced support for emerging models like HRM-Text (DFM Mimir 1B), MiMo-V2.6, and HunyuanOCR, alongside robust server/router stability fixes. Key performance wins include CUDA sparse flash attention recovery and new Metal kernel optimizations, while ongoing efforts focus on resolving critical regressions in Vulkan, ROCm, and draft model handling.

---

### **2. Releases & Breaking Changes**  
- **`v0.5.0`** released: Focuses on backend correctness, broader model coverage, and improved server/router resilience.  
  - Adds multi-address HTTP binding (`--host`) and video URL/data URI support in OpenAI-compatible endpoints.  
  - Fixes token counting API crash during server sleep (fix: #29309).  
  - [GitHub Release](https://github.com/ggml-org/llama.cpp/releases/tag/v0.5.0) | [Attestation](https://github.com/ggml-org/llama.cpp/attestations/49630180)

---

### **3. New Model & Hardware Support**  
- ✅ **HRM-Text (DFM Mimir 1B)**: Added GGUF conversion and runtime support.  
- ✅ **MiMo-V2.6 & HunyuanOCR**: Conversion support added via `convert` tools.  
- ✅ **Gemma4 DSpark Draft Backbone**: Full support for full-attention and SWA variants with tied output weights and metadata.  
- ✅ **Ling-3.0 VL**: Vision-language model support merged (PR #29151).  
- ✅ **Hexagon NPU**: Windows Arm64 CI build added (PR #29052).  
- ✅ **OpenCL**: A8 Q6_K non-MoE dp4a binary kernel added for RDNA3 GPUs (PR #29057).  

---

### **4. Performance & Optimization**  
- **CUDA**: Re-enabled `sparse-fa` for dsv4 prefill (PR #29298); query loop unrolled to reduce overhead.  
- **Metal**: Fixed threadgroup memory overflow in quantized flash attention (PR #29340), improving long-context decode stability.  
- **SYCL**: IQ3 code reordering improves Intel Arc Pro B70 performance (PR #29107).  
- **Vulkan**: Int8 coopmat1 matmul now supports q4_0–q6_k, mxfp4, nvfp4 on RDNA3/RDNA4 (PR #27952).  
- **Qwen4exp**: Optimized lazy tensor row gathering via direct file reads (PR #29030), reducing latency on integrated platforms (e.g., Strix Halo).

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Status | Fix PR |
|--------|------|--------|--------|--------|
| Critical | `v0.3.0-dev` prompt speed drop on Vulkan/RDAN3 after b10780 | ~30x slowdown | Open (#28752) | None |
| High | `ggml_cuda_init: failed to initialize CUDA: unknown error` | GPU initialization failure | Closed (#7218) | Legacy; likely driver/SDK mismatch |
| High | SIGSEGV in token-counting routes when server wakes from sleep | Crashes under load | Open (#29188) | Fixed in v0.5.0 (PR #29309) |
| High | Vulkan: ~78% decode throughput cliff at 131072 context | Memory fragmentation | Open (#27734) | Workaround: `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` |
| High | Metal: Qwen4exp emits EOS after 1 token at long context | Silent empty output | Open (#28805) | No fix yet |
| Medium | CUDA: `top_k_radix_cuda` not compiled/used in Qwen4exp | Missing optimization | Open (#29326) | Pending |

> ⚠️ **Note**: Multiple regressions reported in draft inference (draft-MTP), MoE routing, and RPC split generation — particularly on AMD/Intel hardware.

---

### **6. What This Means for Application Developers**  
- **Use `v0.5.0` immediately** for stable server operation, especially if using router mode or long-context models.  
- **Enable `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`** if running Vulkan on RDNA3 GPUs with large contexts (>131k tokens).  
- **Avoid `q4_0/q4_1` KV cache without `GGML_CUDA_FA_ALL_QUANTS=ON`** — silent CPU fallback causes 30x slowdowns (see issue #28633).  
- **Expect instability with Qwen4exp and Gemma4 DSpark drafts** until PRs land; monitor issue trackers for updates.  
- **Leverage new vision model support (Ling-3.0 VL, HRM-Text)** for multimodal applications via OpenAI-compatible APIs.  
- **Optimize for Metal on Apple Silicon**: Use `--n-cpu-moe` carefully — freed memory goes to GPU0, risking OOM on multi-GPU systems (PR #29343 clarifies this).

👉 *Stay tuned: Final validation of draft-MTP and MoE stability is pending.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-24**

---

### **1. Today's Highlights**  
The latest release, `v0.34.4-rc1`, addresses critical stability issues including intermittent "model not found" errors and persistent hangs in MLX-backed inference under sustained load. Significant progress was made on structured output reliability for MLX models—fixes merged to prevent infinite whitespace emission and improve schema handling—directly improving agent and tooling workflows. Meanwhile, new feature work advances OpenAI-compatible tooling and model export capabilities.

---

### **2. Releases & Breaking Changes**  
- **`v0.34.4-rc1`** includes:  
  - 🔧 Fixed intermittent "model not found" errors ([#18438](https://github.com/ollama/ollama/pull/18438))  
  - ✅ Applied structured outputs in a single pass for thinking models ([#18479](https://github.com/ollama/ollama/pull/18479))  
  - ⚠️ *Note:* Users upgrading from `0.32.14+` may experience CPU spikes if using GPU-only models—this is being addressed in ongoing PRs (see Stability section).

---

### **3. New Model & Hardware Support**  
- **New model requests**:  
  - MIMO v2.5 and v2.6-Pro/Flash requested via [Issue #15887](https://github.com/ollama/ollama/issues/15887) and [Issue #18616](https://github.com/ollama/ollama/issues/18616), respectively—both open-source with million-token context potential.  
- **Hardware/Backend**:  
  - ROCm v10 support updated with improved HCL (Linux + Windows) via [PR #16446](https://github.com/ollama/ollama/pull/16446).  
  - MLX engine now supports global F32 scales and fixes Nemotron layer naming, quantization, and activation scaling ([PR #18614](https://github.com/ollama/ollama/pull/18614)).

---

### **4. Performance & Optimization**  
- **MLX inference stalls**: A critical bug in `mlxrunner` causes admitted requests to hang indefinitely at `processed=total-1` under sustained single-slot load ([Issue #18505](https://github.com/ollama/ollama/issues/18505)). Fix underway via [PR #17834](https://github.com/ollama/ollama/pull/17834) (load progress + stall detection).  
- **CPU burn on GPU systems**: `v0.32.14+` introduced excessive CPU usage (~100% core utilization) even when models fully fit in VRAM ([Issue #17833](https://github.com/ollama/ollama/issues/17833)). Root cause identified as unnecessary polling; fixed in [PR #18613](https://github.com/ollama/ollama/pull/18613) by passing `--poll 0` to `llama-server` when GPU is present.  
- **Embedding performance**: Optimized `/api/embed` to avoid redundant JSON serialization/deserialization ([PR #18610](https://github.com/ollama/ollama/pull/18610)), reducing overhead for bulk embedding workloads.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix/Workaround |
|---------|------|--------|----------------|
| 🟡 High | Structured output never terminates on MLX (`format`/JSON schema) — emits whitespace infinitely ([#18567](https://github.com/ollama/ollama/issues/18567)) | ✅ Fixed in [PR #18569](https://github.com/ollama/ollama/pull/18569) |
| 🟡 High | Homebrew-installed Ollama fails to provide structured output due to missing xgrammar lib ([#18597](https://github.com/ollama/ollama/issues/18597)) | ❗ In progress — related to native library packaging ([PR #18611](https://github.com/ollama/ollama/pull/18611)) |
| 🔴 Critical | `glm-ocr` fails on `0.34.1+` with "token repeat limit reached" error ([#18609](https://github.com/ollama/ollama/issues/18609)) | ⚠️ Regression — fix pending in [PR #17195](https://github.com/ollama/ollama/pull/17195) |
| 🔴 Critical | Tool calls with >45 string values dropped due to index collision in `gemma4ArgsToJSON` ([#18605](https://github.com/ollama/ollama/issues/18605)) | ⚠️ Regression — no fix yet |
| 🟡 Medium | Sustained `/api/embed` load exhausts loopback ports on Windows ([#18392](https://github.com/ollama/ollama/issues/18392)) | ⚠️ HTTP client keep-alive disabled — workaround: reduce batch size or use external client |

---

### **6. What This Means for Application Developers**  
- **Agent developers**: Structured output reliability has improved significantly—expect fewer hangs during JSON schema validation, especially on MLX engines. Use `v0.34.4-rc1` or later for stable tool calling.  
- **Deployment engineers**: Avoid `v0.32.14+` on GPU systems if you’re seeing CPU saturation—patch with `--poll 0` or upgrade to `v0.34.4-rc1`. Monitor MLX load behavior under sustained throughput.  
- **Tooling integrators**: Be cautious with large argument lists in tool calls (e.g., tables with many rows) when using Gemma 4—values beyond ~45 strings may be silently dropped.  
- **Model exporters**: The new `ollama export/import` commands ([PR #18578](https://github.com/ollama/ollama/pull/18578)) enable offline model migration—ideal for air-gapped environments.  
- **Future-proofing**: Watch for MIMO v2.5/v2.6 support—its long-context capability could unlock advanced RAG and document analysis pipelines.  

> 💡 *Recommendation*: Pin to `v0.34.4-rc1` for production stability until final release. Monitor [issue #12187](https://github.com/ollama/ollama/issues/12187) for GPT-OSS tool call completion issues in OpenWebUI integrations.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-24**

---

### **1. Today's Highlights**  
The LiteLLM project continues its rapid evolution with a focus on **cost accuracy**, **security hardening**, and **enterprise-grade observability**. Key updates include fixes for critical budget enforcement bypasses, enhanced guardrail reliability, and expanded model cost mapping—particularly for Vertex AI and OpenRouter. New features like configurable email alerts for team budgets and discoverable model control empower operators to manage usage at scale.

---

### **2. Releases & Breaking Changes**  
No new stable releases were published today; the latest versions are `v1.104.0-dev.1`, `v1.102.1`, `v1.101.2`, `v1.101.1`, `v1.100.2`, and `v1.99.3`. All Docker images remain signed via [cosign](https://github.com/BerriAI/litellm/commit/0112e53) using the same key since early 2025. No breaking changes in API or config were introduced in these versions.

> 🔗 Verify signatures: [cosign docs](https://docs.sigstore.dev/cosign/overview/)

---

### **3. New Model & Hardware Support**  
- ✅ **Vertex AI**: Added cost map entries for:
  - Llama 3.3 70B (MaaS)
  - Veo 2 & Veo 3
  - Virtual Try-On
  - GA 2.5 TTS models  
  *(PR #42837)*  
- ✅ **OpenRouter**: Synced 18 drifted pricing rows and added tiered Qwen pricing (32k/128k/256k context).  
  *(PR #42832)*  
- ✅ **Gemini**: Added preview aliases and Deep Research 04-2026 model IDs to cost map.  
  *(PR #42833)*  
- ✅ **Azure AI**: Corrected FLUX.2 edit billing to account for reference image pixel count (now billed per megapixel).  
  *(PR #42829)*

---

### **4. Performance & Optimization**  
- 🚀 **Cost Calculation Performance**: The `litellm-cost` Rust library now supports standalone token, media, tool, search, and guardrail cost calculations—enabling cross-language consistency and benchmarking.  
  *(PR #42620)*  
- 📈 **Usage Page Scalability**: Fixed performance bottleneck by expanding search scope beyond top-100 keys. Now allows full-text search across all keys.  
  *(PR #42836)*  
- ⚙️ **Caching Efficiency**: Sync cache-hit logs now stamp provider info, improving downstream spend tracking accuracy.  
  *(PR #42830)*

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Fix Status |
|--------|------|--------|-----------|
| 🔴 Critical | Budget enforcement bypass in v1.82.3 (`max_budget`) | Users exceed limits silently | PR pending (#26672) |
| 🔴 Critical | Rate limiter double-counts team-per-model limits → effective RPM/TPM halved | Over-throttling under load | PR pending (#34140) |
| 🔴 Critical | Redis coordination startup race causes persistent budget misalignment | Pod-level budget drift | PR pending (#42653) |
| 🟡 High | Streaming guardrails skip checks when sensitive values split across SSE chunks | Security bypass risk | PR pending (#41611) |
| 🟡 High | Presidio PII guardrail fails open and skips input scanning | False sense of security | PR pending (#30728, #41265) |

> 🔗 Full issue list: [GitHub Issues](https://github.com/BerriAI/litellm/issues?q=is%3Aopen+sort%3Aupdated-desc)

---

### **6. What This Means for Application Developers**  
- **Use caution with older proxy versions** (especially v1.82.3): Budgets may be enforced incorrectly—upgrade immediately if using this version.
- **Enable granular budget alerts** via new `email_alert_percentage` metadata (PR #42665)—ideal for team finance workflows.
- **Avoid relying on cached responses without full provider context**: Ensure your telemetry stack accounts for provider stamping in cache hits (fix PR #42830).
- **Validate guardrail behavior** under streaming and multi-chunk scenarios—known issues with value splitting and history scanning could expose PII.
- **Leverage new cost map precision** for accurate billing in regulated environments (EU AI Act compliance via audit trails is now feasible with PR #29895).

> 💡 Pro tip: Use `model_info.discoverable: false` (PR #42825) to hide experimental models from user-facing `/v1/models` endpoints while keeping them accessible via direct routing.

---  
*Digest generated: 2026-09-24 | Source: [BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-09-24**

---

### **1. Today's Highlights**  
Unsloth v0.1.815-beta delivers full local inference support for **Qwen-Image-2.1**, including custom Agent Skills and improved chat/project management. The release also introduces **2x faster reasoning blocks (60 FPS vs 30 FPS)**, enhanced Linux installs, and critical stability fixes for AMD ROCm and Windows GPU workflows.  

---

### **2. Releases & Breaking Changes**  
- **v0.1.815-beta**: Official release supporting `Qwen-Image-2.1-GGUF` with new agent skills and 60 FPS reasoning performance.  
  🔗 [Release Notes](https://github.com/unslothai/unsloth/releases/tag/v0.1.815-beta)  
- **Migration Note**: Users upgrading from prior versions should re-download models via the UI to avoid double downloads (see #11637).  

---

### **3. New Model & Hardware Support**  
- ✅ **Qwen-Image-2.1** now fully supported locally with GGUF and FP8 text encoder fallback.  
  🔗 [Qwen Image 2.1 Guide](https://unsl)  
- ✅ **AMD Ryzen AI NPU (XDNA 2)**: Experimental support added via Lemonade + FastFlowLM in Studio (PR #11743).  
  🔗 [PR #11743](https://github.com/unslothai/unsloth/pull/11743)  
- ✅ **ROCm 10** compatibility under investigation; multiple issues reported (#9932, #11638, #11646).  
- ❌ **Adreno GPU** support requested but not yet implemented (#11674).  

---

### **4. Performance & Optimization**  
- 🚀 **2x Faster Reasoning Blocks**: Now achieve **60 FPS** (up from 30 FPS) due to optimized CUDA graphs and kernel fusion.  
- ⚡ **Static Step Skipping**: Introduced in image/video generation (PR #11737, #11748), enabling pre-scheduled skips that compose with CUDA graphs and avoid runtime overhead.  
- 📦 **NVFP4 FlashInfer Backend**: On-demand installation (PR #11730) enables faster inference on NVIDIA GPUs by avoiding torchao fallback.  
- 🧠 **Per-Layer NVFP4 Policies**: PR #10730 enables fine-grained quantization control for DiT families (e.g., Wan2.2-TI2V-5B, HunyuanVideo).  

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Impact | Fix / Workaround |
|---------|------|--------|--------|------------------|
| Critical | **AMD ROCm: GPU crash during image generation** (`hipErrorLaunchFailure`, `terminate`) | Open (#9130) | Entire server crashes | No fix yet; workaround: disable VAE tuning |
| High | **AMD: MIOpen exhaustive tuning causes 10–23 min hang** | Open (#11636) | Long waits, crashes on gfx1030 | Disable `cudnn.benchmark` in ROCm |
| High | **Windows ROCm: torch.distributed missing → Qwen-Image-2.1 fails to load FP8 encoder** | Open (#11638) | Model fails to start | Manual install of torch distributed |
| Medium | **Qwen-Image-2.1 requires manual steps after download** | Open (#11567) | UX friction | Re-downloading assets required |
| Low | **Desktop: Bottom window strip unresponsive when maximized (Windows)** | Open (#11734) | UI interaction broken | Restore window size to trigger click |

---

### **6. What This Means for Application Developers**  
- **Build smarter agents**: Leverage new **Agent Skills** and **custom toolcall disabling** (#11671) for secure, auditable agent behavior—ideal for sensitive data workflows.  
- **Optimize inference latency**: Use **static step skipping** and **NVFP4 flashinfer backend** to reduce startup time and boost throughput on NVIDIA GPUs.  
- **Future-proof deployments**: Monitor **ROCm 10 support** and **AMD NPU integration**—these will enable broader hardware reach in future releases.  
- **Avoid regressions**: If using AMD ROCm, disable `cudnn.benchmark` or expect long hangs during image generation.  
- **Enhanced debugging**: New **Canvas console error exposure** (#11744) lets models see JS errors in HTML previews—critical for web-based agent UIs.

> 🔍 *Pro Tip*: For developers integrating Unsloth into apps, consider enabling the **native llama.cpp API** (requested in #11705) to bypass OpenAI compatibility layer for advanced tooling.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*