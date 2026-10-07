# AI Infrastructure Digest 2026-10-07

> Generated: 2026-10-07 01:45 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-07**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q4 2026 is defined by rapid convergence on next-generation hardware (Blackwell SM120, K2 Horizon), aggressive optimization of speculative decoding and KV cache efficiency, and a growing emphasis on multimodal and agent-ready capabilities. Projects are increasingly focused on stability at scale—particularly around high-concurrency workloads, distributed memory management, and GPU-specific edge cases—while also pushing the boundaries of low-latency serving through Rust-based gateways and kernel-level fusion. The ecosystem is bifurcating into two tracks: *high-performance, hardware-optimized engines* (vLLM, SGLang, llama.cpp) and *developer-centric platforms* (Ollama, LiteLLM, Unsloth) that prioritize ease of use, tooling, and integrations.

---

### **2. Activity Comparison**

| Project       | Issues Reported (Last 24h) | PRs Merged/Active | Release Status |
|---------------|----------------------------|-------------------|----------------|
| **vLLM**      | 9 (incl. 4 critical)       | 8                 | None           |
| **SGLang**    | 5 (2 high severity)        | 6                 | None           |
| **llama.cpp** | 5 (2 critical)             | 6                 | `b11457`, `b11450`, `b11447` |
| **Ollama**    | 5 (3 critical)             | 3                 | 0.40.0 live (with migration issues) |
| **LiteLLM**   | 5 (1 critical)             | 5                 | None (Rust beta in progress) |
| **Unsloth**   | 5 (2 critical)             | 5                 | v0.1.903-beta |

> ✅ **Insight**: *vLLM and llama.cpp lead in technical depth and PR velocity*, while *Ollama and LiteLLM show higher instability despite active development*. Unsloth stands out for its focus on UX and agent-native features.

---

### **3. Model Support Race**

| New Model / Architecture     | Supported By (Most Recent) | Notes |
|-------------------------------|----------------------------|-------|
| **K2 Horizon (MoE, 0.9B–36B)** | ✅ **llama.cpp**, ✅ **Ollama**, ✅ **Unsloth** | Full support across all three; llama.cpp leads with native backend integration |
| **Qwen3.5-Next / Qwen4Exp**   | ✅ **vLLM**, ✅ **SGLang** | vLLM has AMD Triton kernel fusion via PR #60021 |
| **DeepSeek-V4.1 (ROCm)**      | ✅ **vLLM**, ✅ **SGLang** | vLLM adds AITER MegaMoEV2 backend (`--moe-backend aiter_mega_moe`) |
| **EmbeddingGemma 2**          | ✅ **Unsloth**, ✅ **Ollama** | First to integrate into UI and agent workflows |
| **Cohere2 Vision**            | ✅ **llama.cpp** | Added via dedicated implementation (PR #30062) |
| **Maion-Coder**               | ✅ **llama.cpp** | Native architecture support introduced |
| **GLM-5.3-Flash**             | ✅ **SGLang**, ✅ **vLLM** | SGLang enables breakable prefill graphs by default |

> 🏆 **Leader**: **llama.cpp** is currently ahead in raw model coverage, especially for emerging architectures like K2 Horizon and Cohere2 Vision. **vLLM** leads in hybrid/multimodal engine maturity.

---

### **4. Performance Frontier**

| Optimization Focus         | Primary Drivers | Key Developments |
|----------------------------|-----------------|------------------|
| **KV Cache & Prefix Caching** | vLLM, SGLang | vLLM fixes LHBNC layout safety; SGLang unifies `prefix_len` tracking |
| **Speculative Decoding**     | vLLM, SGLang, Ollama | vLLM reduces ROCm decode kernels from 4→1; SGLang addresses HiCache deadlocks |
| **Kernel Fusion & CUDA Graphs** | vLLM, SGLang, llama.cpp | Fused PLE+RoPE+gate (AMD); breakable prefill graphs (GLM-5.3) |
| **Quantization & Memory Safety** | llama.cpp, vLLM | BF16 in XIELU kernels; quantized flash attention overflow fixes |
| **Distributed Serving & RPC** | llama.cpp, SGLang | `-sm tensor` flag; `fi_a2a` comm backend defaults |
| **Low-Latency Gateway**      | **LiteLLM** | Rust migration targeting sub-1ms overhead in proxy layer |

> 🔥 **Hotspot**: *KV cache corruption and speculative decoding correctness* are top concerns across vLLM and SGLang—indicating maturity bottlenecks in production-grade inference.

---

### **5. Layer Positioning**

| Project       | Layer Positioning | Role Summary |
|---------------|-------------------|--------------|
| **vLLM**      | **Inference Engine** | High-performance, GPU-optimized serving with advanced scheduling and MoE support |
| **SGLang**    | **Inference Engine + Scheduler Framework** | Modular, scheduler-refactored stack with hierarchical caching and scalability focus |
| **llama.cpp** | **Local Runtime / Standalone Inference** | Cross-platform, CPU/GPU-accelerated runtime with strong model/hardware support |
| **Ollama**    | **Developer-Facing Gateway + CLI Platform** | Simplified local deployment with model registry and cloud API proxying |
| **LiteLLM**   | **Universal Inference Gateway** | Abstraction layer for multi-provider routing, cost tracking, and streaming |
| **Unsloth**   | **Agent-First Training & UI Platform** | Integrates fine-tuning, voice cloning, audio pipelines, and browser UI for agents |

> 🎯 **Strategic Insight**: The ecosystem is clearly segmented: *engines* (vLLM/SGLang) serve as backbones; *gateways* (LiteLLM/Ollama) abstract complexity; *platforms* (Unsloth) enable end-to-end agent workflows.

---

### **6. Trend Signals**

#### **Emerging Industry Trends**:
1. **Hardware-Aware Optimization Is Now Mandatory**  
   - Blackwell (SM120) and K2 Horizon models expose new bugs (e.g., sparse-MLA missing paths, DFlash2 corruption) — projects must now validate against next-gen GPUs early.
   
2. **Speculative Decoding Stability Is the Next Frontier**  
   - Multiple critical regressions in vLLM and SGLang highlight that speculative decoding is no longer just about speed — it’s about correctness under complex prompt patterns.

3. **Multimodal Agent Workflows Are Becoming First-Class Citizens**  
   - EmbeddingGemma 2, vision models, audio APIs, and tool calling enhancements across Ollama, Unsloth, and LiteLLM signal a shift from text-only to full-spectrum agent development.

4. **Rust Migration Is the New Benchmark for Low-Latency Gateways**  
   - LiteLLM’s sub-1ms goal via Rust reflects an industry-wide push toward minimal-proxy overhead — expect more gateways to follow suit.

5. **Model Registry & Local UX Matter More Than Ever**  
   - Ollama’s GGUF migration issues and Unsloth’s installer bugs reveal that developer experience is as critical as performance — even minor UX flaws cause adoption friction.

#### **What Developers Should Watch**:
- **Avoid v0.30/0.31 of vLLM** if using prefix caching + DFlash2/DSpark — risk of corrupted outputs.
- **Monitor MLX backend performance on Apple Silicon** — Ollama reports only ~1 token/sec on M2 Ultra despite high GPU idle time.
- **Prepare for Rust-based LiteLLM** — expect breaking changes but significant latency gains.
- **Validate tool calling behavior** — silent drops in `role=tool` messages (DeepSeek, GLM-5.3) are common.
- **Leverage new model support early** — K2 Horizon and EmbeddingGemma 2 offer future-proofing for agent and retrieval workloads.

---

> ✅ **Final Takeaway**: The AI infrastructure stack is maturing rapidly — but not uniformly. Choose your tools based on *layer alignment*: use **vLLM/SGLang** for high-throughput inference, **llama.cpp** for cross-platform flexibility, **Ollama/LiteLLM** for developer agility, and **Unsloth** for agent-first design. Prioritize stability over novelty until critical bugs are resolved.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-07

---

### **1. Today's Highlights**  
The vLLM project continues to strengthen its support for next-generation hardware and multimodal models, with critical fixes for speculative decoding correctness on hybrid models (e.g., Qwen3-Next) and improved ROCm integration for DeepSeek-V4.1 and Qwen4Exp. A major focus is on stability and memory safety, particularly around prefix caching, DFlash2/DSpark, and KV cache layout resolution — with several high-severity bugs reported on SM120 (Blackwell) GPUs.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4-Flash**: Fixed startup failure on B300 (SM100) due to `DeepGEMM` kernel launch errors ([Issue #46796](https://github.com/vllm-project/vllm/issues/46796)).  
- **Qwen3.5-Next / Qwen4Exp**: AMD backend now supports fused PLE Triton kernels via PR [#60021](https://github.com/vllm-project/vllm/pull/60021).  
- **DeepSeek-V4.1 (ROCm)**: Integrated AITER MegaMoEV2 backend (`--moe-backend aiter_mega_moe`) for enhanced MoE performance ([PR #59685](https://github.com/vllm-project/vllm/pull/59685)).  
- **GLM-5.3-Flash (SM120)**: Identified missing sparse-MLA path for rope-free attention (`qk_rope_head_dim=0`) — impacting RTX PRO 6000 Blackwell users ([Issue #53963](https://github.com/vllm-project/vllm/issues/53963)).  
- **Kimi-K2.6-nvfp4**: Resolved Hugging Face downloader file not found error ([Issue #45647](https://github.com/vllm-project/vllm/issues/45647)).

---

### **4. Performance & Optimization**  
- **Speculative Decoding Efficiency**: PR [#59668](https://github.com/vllm-project/vllm/pull/59668) reduces decode candidate mask overhead on ROCm from four kernels to one per consumer layer.  
- **KV Cache Layout Safety**: PR [#59999](https://github.com/vllm-project/vllm/pull/59999) ensures FlashInfer only declares supported KV layouts, preventing invalid `LHBNC` selection on non-SM100 GPUs.  
- **Prefix Caching Improvements**: PR [#52244](https://github.com/vllm-project/vllm/pull/52244) restores GDN prefix-cache hits under MTP speculative decoding for Qwen3.5-122B-A10B.  
- **ROCm Kernel Fusion**: PRs [#51406](https://github.com/vllm-project/vllm/pull/51406) and [#60021](https://github.com/vllm-project/vllm/pull/60021) enable fused QK-norm+RoPE+gate and PLE kernels for Qwen3-Next and Qwen4Exp on AMD.  
- **Performance Regression**: Nemotron-3.5-Lightning NVFP4 decode is ~16% slower on DGX Spark (GB10/SM121) since v0.29.0 ([Issue #59770](https://github.com/vllm-project/vllm/issues/59770)).

---

### **5. Stability & Regressions**  
**Critical Issues Reported Today**:
1. **DFlash2/DSpark + Prefix Caching Corruption** on Qwen3.8-27B NVFP4 (compressed-tensors) with v0.30/0.31 — output corrupted after cache hit ([Issue #60174](https://github.com/vllm-project/vllm/issues/60174)). *Fix PR pending.*
2. **Prefill Misdispatch in Speculative Decoding** when prompt length = `uniform_decode_query_len * num_reqs`, causing silent GDN state loss and garbage output on hybrid/Qwen3-Next models ([Issue #53051](https://github.com/vllm-project/vllm/issues/53051)). *High severity; fix needed.*
3. **ViT Full CUDA Graph Support Blocked** for multimodal models (e.g., Kimi K2.5, Qwen3-VL) due to incomplete ViT forward pass graph capture ([Issue #38175](https://github.com/vllm-project/vllm/issues/38175)).
4. **EngineDeadError After Sleep/Wake Cycle** with `--kv-offloading-backend native + --enable-sleep-mode` ([Issue #45268](https://github.com/vllm-project/vllm/issues/45268)).

---

### **6. What This Means for Application Developers**  
- **Avoid v0.30/0.31** if using DFlash2/DSpark with prefix caching and large models like Qwen3.8-27B — expect corrupted outputs. Use v0.29.0 as a workaround until #60174 is resolved.
- **Be cautious with speculative decoding on hybrid models** (e.g., Qwen3.5-Next), especially when prompt lengths align with decode batch sizes — this can silently corrupt results. Monitor for #53051.
- **Ensure correct KV cache layout** (`VLLM_KV_CACHE_LAYOUT`) when deploying on SM120 (Blackwell) GPUs — avoid `LHBNC` unless explicitly supported by FlashInfer.
- **Use `--moe-backend aiter_mega_moe`** for DeepSeek-V4.1 on ROCm for better MoE performance.
- **Update to PyTorch 2.15.0 RC** via PR [#60324](https://github.com/vllm-project/vllm/pull/60324) for latest compatibility, but test thoroughly in production environments.
- **Consider upgrading from envvars to config-based settings** — ongoing RFC (#25700) aims to deprecate global environment variables for better maintainability.

> ✅ **Actionable Tip**: For agents relying on tool calling, verify `tool_choice='none'` behavior — it may silently delete tool-call-shaped content ([Issue #55080](https://github.com/vllm-project/vllm/issues/55080)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-07

---

### **1. Today's Highlights**

SGLang continues to advance its core inference infrastructure with major progress on scheduler refactoring and hierarchical caching, culminating in a series of PRs that unify prefix tracking under `prefix_len` and eliminate redundant state management. Critical stability fixes are underway for DeepSeek-V4/Flash models under high concurrency, particularly around HiCache deadlocks and speculative decoding correctness. CI health remains a focus, with ongoing efforts to stabilize flaky tests and reduce maintenance overhead.

---

### **2. Releases & Breaking Changes**

None reported in the last 24 hours.  
No breaking changes or migration notes introduced.

---

### **3. New Model & Hardware Support**

- **DeepSeek-V4.1-Flash**: Field reports confirm stable deployment on **8× RTX PRO 6000 (SM120, PCIe-only)** with measured throughput and speculative A/B validation. [Issue #40877](https://github.com/sgl-project/sglang/issues/40877)  
- **GLM-5.3-Flash**: Default enablement of breakable prefill CUDA graphs now active. [PR #42845](https://github.com/sgl-project/sglang/pull/42845)  
- **NPU HiCache**: Active development on `MHATokenToKVPoolHost` crash fix post-#40326. [Issue #42672](https://github.com/sgl-project/sglang/issues/42672)  
- **Apple Silicon (MPS)**: Performance optimization for equal-length prefill batching via batched SDPA. [PR #42842](https://github.com/sgl-project/sglang/pull/42842)

---

### **4. Performance & Optimization**

- **Prefill Optimization**: Breakable prefill CUDA graphs enabled by default for GLM-5.3-Flash, improving GPU utilization during long prompts. [PR #42845](https://github.com/sgl-project/sglang/pull/42845)  
- **MPS Efficiency**: Batched attention for fresh equal-length prefills reduces redundant kernel launches. [PR #42842](https://github.com/sgl-project/sglang/pull/42842)  
- **Scheduler Refactor**: Unified prefix tracking via `prefix_len`, eliminating `prefix_indices` and reducing memory pressure. [PRs #42824–#42825](https://github.com/sgl-project/sglang/pulls?utf8=%E2%9C%93&q=author%3Ahnyls2002+is%3Aopen)  
- **Kernels**: Fused KDA beta sigmoid made bit-identical to `torch.sigmoid`. [PR #42611](https://github.com/sgl-project/sglang/pull/42611)  
- **Diffusion**: FLUX.2 single-block output projection optimized to avoid `torch.cat`. [PR #41943](https://github.com/sgl-project/sglang/pull/41943)

---

### **5. Stability & Regressions**

| Severity | Issue | Description | Fix Status |
|--------|------|------------|----------|
| 🔴 High | [Issue #42465](https://github.com/sgl-project/sglang/issues/42465) | DeepSeek-V4 + HiCache `write_through` causes TP rank deadlock under concurrent long prefills; `/health` returns 503. | No fix yet; actively investigated |
| 🔴 High | [Issue #42752](https://github.com/sgl-project/sglang/issues/42752) | Flaky CI failures in PR test runs due to intermittent infra instability. | Ongoing triage; tracked alongside #17050 |
| 🟡 Medium | [Issue #42415](https://github.com/sgl-project/sglang/issues/42415) | MLX backend: repeated chat requests return unrelated text after native `/generate`. | No fix yet |
| 🟡 Medium | [Issue #42176](https://github.com/sgl-project/sglang/issues/42176) | Cake kernels integration pending end-to-end validation; accuracy concerns possible. | In progress |
| 🟡 Medium | [Issue #42269](https://github.com/sgl-project/sglang/issues/42269) | `response_format + tools` silently drops tool calls on GLM-5.3. | No fix yet |

> ⚠️ **Note**: The `CUDA Coredump Tracker` (#26340) has accumulated 324 comments — indicates recurring low-level GPU crashes requiring deeper investigation.

---

### **6. What This Means for Application Developers**

- **Use `prefix_len` as the authoritative prefill progress indicator** — future code should rely on this instead of `len(req.prefix_indices)`; expect deprecation warnings soon.
- **Avoid `hicache-write-policy write_through` with DeepSeek-V4 under bursty long prompts** — it may cause full system hangs. Use `write_back` or disable HiCache temporarily.
- **Enable breakable prefill CUDA graphs by default for GLM-5.3-Flash** — improves latency for long inputs without additional config.
- **Monitor CI health**: Flaky tests (#42752, #17050) may delay merges; consider testing against nightly builds if stability is critical.
- **Be cautious with tool calling + `response_format` on GLM-5.3**: Tool calls may be silently dropped — verify via `tool_call_parser` setting or use `json_schema` instead.

> 💡 Pro Tip: For production deployments on multi-GPU setups (especially PCIe-only), prefer `fi_a2a` comm backend (already default) and monitor `--dcp-comm-backend` behavior for decode parallelism scalability.

---  
*Digest generated from GitHub data: sgl-project/sglang • 2026-10-07*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-07**

---

### **1. Today's Highlights**  
The latest updates focus on critical performance and stability improvements for GPU backends, particularly CUDA and Metal, with new BF16 support in XIELU kernels and fixes for quantized flash attention overflow. Significant progress was made on MoE expert caching and speculative decoding optimizations, while K2 Horizon model support was added to the core inference stack.

---

### **2. Releases & Breaking Changes**  
- **`b11457`**: Added `BF16` support in XIELU CUDA kernel via `nv_bfloat16` branch (PR [#29955](https://github.com/ggml-org/llama.cpp/pull/29955)) — enables efficient use of BF16 on Blackwell GPUs.  
- **`b11450`**: Introduced `-sm tensor` flag for RPC mode (PR [#26610](https://github.com/ggml-org/llama.cpp/pull/26610)), increasing flexibility in multi-node inference setups.  
- **`b11447`**: Added support for `pplx-decider` models (PR [#30044](https://github.com/ggml-org/llama.cpp/pull/30044)) — enables use of probabilistic decision-making models in agent workflows.

> ⚠️ Note: The RPC major version bump implies potential compatibility breaks; check migration guide at [GitHub Attestations](https://github.com/ggml-org/llama.cpp/attestations/53286941).

---

### **3. New Model & Hardware Support**  
- ✅ **K2 Horizon Models**: Full support added for dense and MoVA variants (0.9B–36B) including HParams, compute graphs, and tokenizer registration (PR [#29535](https://github.com/ggml-org/llama.cpp/pull/29535)).  
- ✅ **PLaMo-3 Tokenizer**: Pre-segmentation logic implemented to handle special tokens and repeated character runs (PR [#30045](https://github.com/ggml-org/llama.cpp/pull/30045)).  
- ✅ **Cohere2 Vision**: Added vision model support with `cohere2vision` implementation and image preprocessor (PR [#30062](https://github.com/ggml-org/llama.cpp/pull/30062)).  
- ✅ **Maion-Coder Architecture**: Native support introduced via `maion-coder` backend (PR [#29778](https://github.com/ggml-org/llama.cpp/pull/29778)).

---

### **4. Performance & Optimization**  
- **CUDA**: Fixed excessive VGPR spills in `Q2_K` dequantization (PR [#29910](https://github.com/ggml-org/llama.cpp/pull/29910)) — reduces register pressure and improves throughput on AMD GCN5.  
- **Metal**: Eliminated excess threadgroup memory in quantized flash attention (PR [#29340](https://github.com/ggml-org/llama.cpp/pull/29340)) — critical for Apple Silicon efficiency.  
- **Vulkan**: Improved MUL_MAT_VEC_ID path using density gate (PR [#27332](https://github.com/ggml-org/llama.cpp/pull/27332)) — +36% decode speed at batch=9 on gfx1151.  
- **MoE**: Experimental GPU cache for host-resident experts landed (PR [#29887](https://github.com/ggml-org/llama.cpp/pull/29887)) — enables LRU-based offload with GPU-executed computation.  
- **Flash Attention**: Addressed query head dimension mismatch crash in `gemma4-assistant` (PR [#29419](https://github.com/ggml-org/llama.cpp/pull/29419)) — prevents silent failures during speculative decoding.

---

### **5. Stability & Regressions**  
- 🔴 **Critical Crash**: Segmentation fault when a tool named `"call"` is invoked (Issue [#29967](https://github.com/ggml-org/llama.cpp/issues/29967)) — reported in `llama-server`, affects tool calling safety.  
- 🔴 **GPU Memory Leak**: Vision models fail to save KV cache via `/slots/3?action=save` (Issue [#19466](https://github.com/ggml-org/llama.cpp/issues/19466)) — blocks persistent state for long-context agents.  
- 🟡 **Performance Regression**: CUDA `ADD/GELU` slower on B200 post-PDL commit (Issue [#30004](https://github.com/ggml-org/llama.cpp/issues/30004)) — affects high-end inference workloads.  
- 🟡 **Deadlock Risk**: Video input >10s hangs server indefinitely (Issue [#27587](https://github.com/ggml-org/llama.cpp/issues/27587)) — impacts multimodal agent reliability.  
- ✅ **Fixes in Progress**: PRs addressing Vulkan OOB read (#30041), CLAMP on non-contiguous views (#29517), and empty shard handling in meta backend (#30076) are active.

---

### **6. What This Means for Application Developers**  
- **Build robust agents**: Use `-sm tensor` and `pplx-decider` support for scalable, reasoning-aware inference across nodes.  
- **Optimize MoE deployments**: Leverage the new GPU-backed MoE expert cache (PR #29887) to reduce CPU-GPU sync overhead in large-scale inference.  
- **Avoid crashes**: Avoid tool names like `"call"` until fix lands; monitor for vision model KV cache saving issues in production.  
- **Target next-gen hardware**: Enable BF16 on CUDA for Blackwell GPUs (via `b11457`) and test on K2 Horizon models for future-proofing.  
- **Monitor regressions**: Watch for `ADD/GELU` slowdowns on B200 systems and verify Vulkan/Metal performance on RDNA4 and Apple Silicon.

> 🔗 Explore builds: [https://llama.app](https://llama.app) | Attestations: [ggml-org/llama.cpp/attestations](https://github.com/ggml-org/llama.cpp/attestations)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **1. Today's Highlights**  
Ollama 0.40.0 stabilizes core inference workflows with critical fixes for MLX and GGUF model handling, including a resolution to the `gemma4` renderer misclassification issue affecting 11.9B models. The ecosystem continues to expand with new support for K2 Horizon models and improved cloud API proxying via PR #18829, while performance bottlenecks in Metal (MLX) backends remain under active investigation.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, **Ollama 0.40.0** (already live) introduced a local compatibility migration for GGUF models that has triggered duplicate entries and spurious `llamacpp:<sha>` tags—reported in [#18830](https://github.com/ollama/ollama/issues/18830). Users are advised to clean up duplicates manually or await a fix.

---

### **3. New Model & Hardware Support**  
- ✅ **K2 Horizon Models**: Added support request for the new *K2-Horizon* family (0.9B–36B MoE) from MBZUAI IFM via [PR #18698](https://github.com/ollama/ollama/pull/18698), with official GGUFs available on Hugging Face.
- ✅ **Golem Framework Integration**: Added to community integrations ([PR #18816](https://github.com/ollama/ollama/pull/18816)), enabling Go-based AI agents to interface directly with Ollama’s `/v1` endpoint.
- ✅ **Multimodal Embeddings**: Implemented via [PR #18820](https://github.com/ollama/ollama/pull/18820), introducing `EmbeddingGemma2Model` on MLX with shared vision/audio towers and media input support in `/api/embed`.

---

### **4. Performance & Optimization**  
- ⚠️ **MLX Backend Bottlenecks**: Multiple reports highlight poor GPU utilization on Apple Silicon:
  - `gemma4:26b-mlx-bf16` decodes at only **0.8–1.6 tokens/sec** on M2 Ultra despite 96% GPU idle time ([#18823](https://github.com/ollama/ollama/issues/18823)).
  - `qwen3.8:27b-mxfp8` shows suboptimal memory scheduling on M4 Pro ([#18754](https://github.com/ollama/ollama/issues/18754)).
- 🔧 **Speculative Decoding**: High-priority feature request [#5800](https://github.com/ollama/ollama/issues/5800) seeks speculative decoding support—expected to improve throughput significantly if implemented.
- 📊 **Profiling Enhancements**: PR [#16611](https://github.com/ollama/ollama/pull/16611) improves benchmarking tooling by allowing direct runner profiling (GGUF/MLX), enabling deeper kernel-level analysis.

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR? |
|--------|------|-------|--------|
| Critical | `clef-flash` fails on `/v1/systemone` with `Clef: non-finite logit` (CUDA/CPU) | Open | No |
| Critical | `embeddinggemma-2:740m` fails to pull on Linux due to missing MLX runtime | Open | No |
| High | `ollama run` hangs indefinitely after first execution (Raspberry Pi) | Open | No |
| High | `qwen3-vl:8b` crashes during image encoding when another large model is loaded | Open | No |
| Medium | `GSQ-RCO` quantized Qwen3.8-Flash-Next fails with "unsupported tensor size overflows" | Open | No |

> Note: Several regressions involve edge cases in quantization (GSQ-RCO), model naming logic (`gemma4` small/large threshold), and multi-model GPU contention.

---

### **6. What This Means for Application Developers**  
- **Avoid `clef-flash` on `/v1/systemone`** until [#18769](https://github.com/ollama/ollama/issues/18769) is resolved—use `/v1/chat/completions` instead.
- **Use explicit renderers** for Gemma 4 models below 12B (e.g., `gemma4:12b`), as name-free models default to the incorrect `gemma4-small` renderer ([#18824](https://github.com/ollama/ollama/issues/18824)).
- **Check MLX availability** before pulling models like `embeddinggemma-2:740m`—the error message is misleading; ensure your system supports MLX.
- **Leverage new integrations**: Use Golem ([#18816](https://github.com/ollama/ollama/pull/18816)) or LLM-Client ([#15292](https://github.com/ollama/ollama/pull/15292)) for unified, keyless agent development.
- **Monitor disk space** during pulls—full-disk errors are now properly surfaced thanks to [#18813](https://github.com/ollama/ollama/pull/18813).

> 💡 **Pro Tip**: For high-throughput use cases, consider using `--force` to bypass size checks (via [#18243](https://github.com/ollama/ollama/pull/18243)) but validate hardware limits manually.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-07**

#### **1. Today's Highlights**  
The most significant development is the continued momentum behind LiteLLM’s **Rust migration initiative**, now in active beta with sub-1ms overheads targeted for the final gateway layer. This effort, highlighted in Issue #31263, aims to transform LiteLLM into the fastest and lightest AI inference gateway. Simultaneously, critical stability fixes are addressing high-severity bugs in model translation (e.g., Anthropic/DeepSeek), streaming behavior, and concurrency issues in budgeting and team management.

#### **2. Releases & Breaking Changes**  
*None* — No new releases were published in the last 24 hours. However, the **Rust migration** (Issue #31263) is entering early beta; developers are encouraged to join the [Beta Tester Group](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...) for early access. The project is preparing for a major architectural shift, which may involve breaking changes in future versions.

#### **3. New Model & Hardware Support**  
*No new models or hardware backends added today.*  
However, ongoing work continues on:
- **Gemini 3.x support**: PR #38663 fixes incorrect temperature injection when omitted (`temperature=1.0` was defaulting incorrectly).
- **TTS support**: Issue #20078 highlights that `Qwen3-TTS` requires proper `voice` parameter handling via `/v1/audio/speech`.
- **MCP Registry updates**: PR #38952 adds YAML OpenAPI spec support, improving flexibility in tool integration.

#### **4. Performance & Optimization**  
- **Rust Migration (Core)**: Now in active development with PR #44669 introducing typed LLM payloads (Messages, Chat Completions, OCR) to reduce runtime overhead and enable faster serialization.
- **Cache Efficiency**: PRs #44948 and #44960 introduce **cross-provider baseline cache estimation** and **preserved native identity accounting**, enabling more accurate caching across providers and reducing redundant computation.
- **Latency Goal**: Targeting **sub-1ms overheads** in the Rust-based proxy layer (see [blog post](https://docs.litellm.ai/blog/litellm-rust-launch)).

#### **5. Stability & Regressions**  
Top issues by severity and impact:

| Issue | Description | Severity | Fix Status |
|------|-------------|----------|------------|
| [#31263](https://github.com/BerriAI/litellm/issues/31263) | Rust migration in progress — potential instability during early beta | High | In progress |
| [#25429](https://github.com/BerriAI/litellm/issues/25429) | `chatgpt/gpt-5.4` returns empty final response; completion bridge fails with “Unknown items” | Critical | Pending fix |
| [#44535](https://github.com/BerriAI/litellm/issues/44535) | Anthropic responses without `usage` object trigger retries → HTTP 500 | High | No fix yet |
| [#44211](https://github.com/BerriAI/litellm/issues/44211) | DeepSeek silently drops image content from `role=tool` messages | High | No fix yet |
| [#44546](https://github.com/BerriAI/litellm/issues/44546) | `litellm.aspeech` calls synchronous provider twice → double billing (Gemini TTS) | Medium | No fix yet |

> ⚠️ Multiple regressions in **model translation**, **streaming**, and **cost tracking** highlight risks in edge cases involving non-standard providers (Anthropic, Gemini, DeepSeek).

#### **6. What This Means for Application Developers**  
- **Adopt caution with GPT-5.4 and ChatGPT routes**: Non-streaming completions may fail due to response parsing issues (see #25429). Use streaming as a fallback until fixed.
- **Avoid `role=tool` with vision models** if using DeepSeek: Image data may be silently dropped (see #44211).
- **Monitor cost accuracy**: Issues like missing `usage` fields (#44535) or cached token misbilling (#26807) can lead to inaccurate cost reporting.
- **Prepare for Rust migration**: While not yet stable, this move promises ultra-low latency. Early adopters should test with the [beta group](https://docs.google.com/forms/d/e/1FAIpQLSecWdOjkzjEson2UiZpD...).
- **Use trace IDs per team**: With PR #44933, enforce observability via `require_trace_id` in team settings — essential for debugging in production.

> 🔗 *For full context: [GitHub Repo](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-10-07**

---

### **1. Today's Highlights**  
Unsloth v0.1.903-beta introduces a new browser UI and voice cloning capabilities, enabling real-time web interaction and audio generation directly within the chat interface. The release also adds support for Google’s **EmbeddingGemma 2**, expanding multimodal embedding capabilities. Key improvements in Studio include better model management, enhanced audio API integration, and critical fixes to macOS installer permissions affecting context length.

---

### **2. Releases & Breaking Changes**  
- **v0.1.903-beta**: [Release Notes](https://github.com/unslothai/unsloth/releases/tag/v0.1.903-beta)  
  - Adds embedded browser (preview mode), voice cloning, and Audio pages.  
  - Introduces `EmbeddingGemma 2` as a supported model.  
  - Fixes macOS installer issue where `llama-fit-params` was non-executable (`#12917`).  
  - Addresses ARM64 build confusion: Linux ARM64 is now correctly labeled on downloads (`#12680`).

---

### **3. New Model & Hardware Support**  
- ✅ **New Models**:  
  - `EmbeddingGemma 2` — Google’s new multimodal embedding model ([docs](https://unsloth.ai/docs/models/embeddinggemma-2)).  
  - GGUF-based dictation models now allow quantization selection via Voice Settings (`#12900`).  
- ✅ **Hardware & Backend Support**:  
  - **AMD RDNA1 (gfx1010)**: Training confirmed working on Windows with Unsloth, though Triton dot product limitations remain (`#11614`).  
  - **Intel GPU**: Added documentation note on required pinning for installation (`#12836`).  
  - **macOS Metal**: Fixed executable permission on `llama-fit-params` post-install (`#12917`).

---

### **4. Performance & Optimization**  
- **Context Handling**:  
  - Fix for macOS installer leaving `llama-fit-params` non-executable, which previously reduced context from 262,144 to 8,192 tokens (`#12901`, `#12917`).  
  - `FastSentenceTransformer` now respects `max_seq_length` for encoder models like `all-MiniLM-L6-v2` (`#12915`).  
- **UI/UX Improvements**:  
  - Live monitor background now properly respects light mode (`#12904`).  
  - Audio API card added to Settings with ready-to-use curl/Python/JS examples (`#12821`).  
- **CI/CD Speed**:  
  - Shell suites and browser checks now run in parallel, reducing pipeline time by ~15 minutes (`#12899`).

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | PR/Note |
|------|----------|--------|--------|
| Long-context chat lagging (`#12552`) | High | Open | No fix yet; affects desktop users |
| Stop-generating button freezes after unload (`#12592`) | Critical | Open | Cascading failure reported |
| Model not loading after update (`#12842`) | Medium | Open | User-facing regression |
| AppImage resize issues on Wayland (`#12845`) | Medium | Closed | Workaround: use X11 |
| LAN access shows wrong API URL (`#12906`) | Medium | Open | Fixes API sharing across devices |

> 🔴 **Critical Note**: Several regressions related to model state management and UI responsiveness persist in the desktop app. Users may experience freezing or failed model loads.

---

### **6. What This Means for Application Developers**  
- **Build robust agent workflows**: With the new **Audio API card** and **voice cloning**, developers can now integrate full speech pipelines (Speak, Transcribe, Clone) directly into apps using pre-built SDK snippets (`#12821`).  
- **Enhanced data fidelity**: `#12913` ensures system prompts are preserved in exports and training data—critical for maintaining consistency in fine-tuned agents.  
- **Improved cross-platform reliability**: The macOS `llama-fit-params` fix (`#12917`) removes a major barrier to high-context inference on Apple Silicon.  
- **Prepare for multi-user environments**: Issues like model sync across accounts (`#12365`) suggest that local inference servers must handle session isolation carefully when deploying unsloth-backed services.  

👉 **Actionable**: Use `--out` flag with `unsloth-run` to preserve notebooks and trained models (`#12907`); avoid relying on temporary storage in CI/CD pipelines.

---  
*Digest compiled from GitHub activity: [unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*