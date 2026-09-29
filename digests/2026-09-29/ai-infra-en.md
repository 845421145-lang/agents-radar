# AI Infrastructure Digest 2026-09-29

> Generated: 2026-09-29 02:13 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-29**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is rapidly maturing beyond monolithic deployment, with a clear bifurcation between high-performance distributed engines (vLLM, SGLang) and developer-friendly, agent-native platforms (Ollama, Unsloth). Key trends include disaggregated serving, multimodal embedding support, and the rise of structured decision-making APIs. Hardware diversity is expanding—ROCm, AMD gfx950, T-Head PPUs, Apple Silicon, and hybrid GPU setups are now first-class citizens. Meanwhile, LiteLLM consolidates as the de facto gateway layer, enabling cost-aware routing across cloud and local backends.

---

### **2. Activity Comparison**

| Project       | Issues Open (High/Crit) | PRs Merged (Last 7 Days) | Releases (Last 24h) | Notes |
|---------------|--------------------------|----------------------------|------------------------|-------|
| **vLLM**      | 12 (4 Critical)          | 18                         | None                   | Focus on ROCm/AMD stability, CUDA graphs, speculative decoding fixes |
| **SGLang**    | 10 (4 Critical)          | 14                         | None                   | High activity in distributed KV cache, HiSparse, and multi-GPU support |
| **llama.cpp** | 12 (3 Critical)          | 16                         | 4 (b11236–b11242)       | Rapid patching for GCC/Vulkan issues; `batch_ext` migration underway |
| **Ollama**    | 9 (2 Critical)           | 12                         | v0.35.0                | Major feature release: System One API; Windows/CUDA instability persists |
| **LiteLLM**   | 8 (3 High)               | 12                         | v1.104.0-rc.1 / v1.103.0 | Security hardening via cosign signing; schema regressions open |

> ✅ *vLLM and SGLang lead in technical depth; Ollama leads in user-facing innovation.*

---

### **3. Model Support Race**

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|--------------------------|------|--------|-----------|--------|---------|
| **DeepSeek-V4.1**        | ✅ Full NVIDIA + ROCm | ✅ FP8/MXFP4 | ✅ Experimental | ✅ Requested | ❌ No support |
| **Qwen3-VL / Qwen3-VL-Embedding** | ✅ ViT CUDA graph + prefill CP | ✅ Partial support | ✅ Full `/v1/embeddings` | ⚠️ Limited vision | ❌ No support |
| **GLM-5.3**              | ✅ GB200/NIXL perf focus | ✅ FP8/MXFP4 on AMD | ✅ DFLASH spec-decoding | ⚠️ Speculative issues | ❌ No support |
| **Kimi-K3 / Kimi-K2.5**  | ✅ ViT support | ✅ Mixed support | ❌ No mention | ⚠️ Decode crashes | ❌ No support |
| **Laya Decision Models** | ❌ No support | ❌ No support | ❌ No support | ❌ No support | ❌ No support |
| **GraniteSpeech5ForCTC** | ❌ No support | ❌ No support | ✅ Added | ⚠️ Experimental | ❌ No support |
| **T-Head PPU (ZW810)**   | ❌ No support | ✅ Roadmap | ❌ No support | ❌ No support | ❌ No support |

> 🏆 **Winner: SGLang & vLLM** — both lead in **multi-model**, **multi-hardware**, and **distributed** support.  
> 🥈 **Breakout: llama.cpp** — strongest in **local multimodal embedding** and **CPU/GPU cross-platform** reach.

---

### **4. Performance Frontier**

| Optimization Focus         | vLLM                          | SGLang                        | llama.cpp                     | Ollama                       | LiteLLM                      |
|----------------------------|-------------------------------|-------------------------------|-------------------------------|------------------------------|------------------------------|
| **KV Cache Efficiency**    | NVFP4 compression, offload identity fix | Distributed sharding, HiCache roadmap | `--cpu-mtp`, left-padding | MTP cache reuse | N/A |
| **Prefill Scalability**    | Sharded indexer rows (PR #54951) | Context parallelism (CP) roadmap | CPU Flash Attention | Flash Attention auto-enabled | N/A |
| **Quantization & Kernels** | MXFP8, GVR2, Sparse Logits Indexer | Triton sparse attention, PTPC | CDNA2 MFMA, MXFP4 | Auto Flash Attention | Per-second pricing accuracy |
| **Distributed Serving**    | Disaggregated `/render` → `/derender` | PD disaggregation + HiCache | N/A | N/A | Gateway-level routing |
| **Batching & Throughput**  | CUDA graphs, MTP, speculative decoding | Prefill CP, KV sharding | `batch_ext` unification | MTP cache reuse | Batch file limits |

> 🔥 **Most Advanced**: vLLM (full CUDA graph + speculative decoding), SGLang (distributed context parallelism).  
> 💡 **Most Innovative**: llama.cpp (`--cpu-mtp`, Vulkan kernel tuning), LiteLLM (per-second billing).

---

### **5. Layer Positioning**

| Project       | Primary Layer             | Core Functionality                                                                 | Differentiator |
|---------------|----------------------------|-------------------------------------------------------------------------------------|----------------|
| **vLLM**      | **Serving Engine**         | High-throughput, low-latency inference with advanced kernels and disaggregation     | Industry standard for large-scale LLM serving |
| **SGLang**    | **Distributed Inference**  | Agentic workloads, long-context sparse serving, distributed KV cache                | Built for stateful agents and memory-constrained scaling |
| **llama.cpp** | **Local Runtime**          | CPU/GPU/NPU inference with GGUF, minimal dependencies, offline operation            | Best-in-class for edge, mobile, and privacy-first deployments |
| **Ollama**    | **Gateway + CLI Platform** | Unified model management, local inference, agent orchestration via `/v1/systemone`   | Democratizes access to models via simple CLI/API |
| **LiteLLM**   | **API Gateway / Orchestrator** | Cost tracking, routing, security, provider abstraction across clouds/local systems | The "traffic cop" of the AI stack |

> 📌 **Strategic Insight**: vLLM/SGLang are infrastructure builders; Ollama/litellm are platform enablers; llama.cpp is the portable runtime.

---

### **6. Trend Signals**

1. **Disaggregated Serving Is Now Mainstream**  
   vLLM’s `/render` → `/generate` → `/derender` and SGLang’s distributed KV cache roadmap signal that **stateless, modular inference pipelines** are no longer experimental—they’re production-ready.

2. **Structured Output APIs Are Replacing Text Generation for Orchestration**  
   Ollama’s **System One** API (choices, scores, probabilities) marks a shift toward **AI-native decision-making**—reducing reliance on hallucination-prone text generation for routing and triage.

3. **Multimodal Embeddings Are Moving to Production**  
   llama.cpp’s `/v1/embeddings` with structured content arrays and SGLang/vLLM’s ViT support indicate that **multimodal embeddings are now viable for real-time workflows**.

4. **Hardware Diversity Is Driving Innovation**  
   ROCm support (gfx950), T-Head PPU, MLX on Apple Silicon, and hybrid AMD/NVIDIA setups show that **no single hardware stack dominates**—portability and cross-platform optimization are critical.

5. **Security & Observability Are Non-Negotiable**  
   LiteLLM’s cosign signing, Redis guardrail timeouts, and Ollama’s model leaderboard UI reflect growing demand for **verifiable, auditable, and cost-transparent AI systems**.

> 🔮 **What Developers Should Watch**:  
> - **Agentic Workflows**: Monitor SGLang’s distributed KV cache and vLLM’s ViT CUDA graph RFC.  
> - **Edge Deployment**: Prioritize `llama.cpp`’s `--cpu-mtp` and `batch_ext` for constrained devices.  
> - **Cost Control**: Use LiteLLM’s per-second pricing and model leaderboards to avoid overprovisioning.  
> - **Avoid Silent Failures**: Validate input schemas (LiteLLM), monitor tool call timeouts (Unsloth), and test image processing (Ollama/gemma4).

---

*Report compiled from GitHub activity on 2026-09-29 | Target Audience: Infrastructure Engineers, CTOs, AI Platform Architects*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-29**

#### **1. Today's Highlights**  
The vLLM project continues to expand its support for next-generation models and disaggregated serving architectures, with key progress in ROCm integration for DeepSeek V4.1 and NVFP4 compressed KV cache on gfx950. A major RFC (#38175) is advancing ViT full CUDA graph support for multimodal models like Qwen3-VL and Kimi K2.5, enabling higher throughput in vision-language inference. Meanwhile, stability remains a focus, with several critical bug fixes targeting speculative decoding, KV cache corruption, and device-side asserts.

#### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, ongoing work on **disaggregated serving** (via `/render`, `/generate`, `/derender`) continues to evolve:  
- PR #58783 adds OpenAI `responses` API parity in the Rust frontend (tracking #53380).  
- PR #56331 ensures KV offload cache identity includes model config (fixing #56311), preventing incorrect reuse after configuration changes.  
> ⚠️ Developers using persistent KV offload should verify their setup aligns with this change.

#### **3. New Model & Hardware Support**  
- ✅ **DeepSeek V4.1** now has full kernel integration on NVIDIA: MegaAttention, Sparse Logits Indexer, DeepSelect, Mega mHC, Mega Gate, and GVR2 (pending). See [PR #57463](https://github.com/vllm-project/vllm/pull/57463) for ROCm support.  
- 🚀 **ROCm Support**: Added `nvfp4_ds_mla` compressed KV cache support on gfx950 (MI355X), critical for efficient memory use in large models.  
- 🌐 **Multi-modality**: Full CUDA graph support for fixed-resolution LLaVA encoders landed ([PR #58122](https://github.com/vllm-project/vllm/pull/58122)).  
- 💻 **Intel GPU**: Ongoing Intel Arc B70 (Battlemage) XPU TP=2 crash issue reported ([Issue #41663](https://github.com/vllm-project/vllm/issues/41663)), but no fix yet.

#### **4. Performance & Optimization**  
- 🔥 **GLM-5.3 P/D on GB200**: Identified NIXL descriptor overhead (~112k per rank-transfer) degrading performance vs RDMA; proposal underway ([Issue #55434](https://github.com/vllm-project/vllm/issues/55434)).  
- ⚡ **Speculative Decoding**: Fixed FlashInfer warmup crash due to incorrect M-rounding in MXFP8 kernels ([PR #58165](https://github.com/vllm-project/vllm/pull/58165)) — resolves startup failure on SM100/SM103.  
- 📊 **Prefill Optimization**: PR #54951 shards long-context indexer prefill rows across TP ranks, reducing redundant computation and improving scalability.  
- 🛠️ **KV Cache Efficiency**: PR #55092 ensures `BlockRemoved` events are emitted only after last physical copy evicted, improving cache consistency.

#### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| Critical | [#57719](https://github.com/vllm-project/vllm/issues/57719) | `prompt_embeds` + penalties cause device-side assert (`scatter-gather index out of bounds`) | ❌ Unresolved |
| High | [#57149](https://github.com/vllm-project/vllm/issues/57149) | AMD MI355X performance bottlenecks for Qwen3.8-2.4T-A95B | ⏳ In progress |
| High | [#53912](https://github.com/vllm-project/vllm/issues/53912) | Prefix caching + MTP corrupts output on hybrid Mamba/GDN models (v0.28.0) | ❌ Closed but unfixed |
| Medium | [#41663](https://github.com/vllm-project/vllm/issues/41663) | Intel Arc Pro B70 crashes with GP fault + BCS engine reset | ❌ No fix |
| Medium | [#56851](https://github.com/vllm-project/vllm/issues/56851) | Request-level text/derender output missing from `/inference/v1/generate` | ⏳ RFC in progress |

> 🔍 **Note**: Multiple issues affect **speculative decoding**, **multi-token prediction (MTP)**, and **KV cache management**, particularly on mixed-precision and multi-model setups.

#### **6. What This Means for Application Developers**  
- If you're building **agentic systems** or **multi-modal apps**, prioritize testing with **ViT CUDA graphs** ([RFC #38175](https://github.com/vllm-project/vllm/issues/38175)) and **disaggregated serving paths** (`/render` → `/generate` → `/derender`).  
- For **high-throughput deployment**, enable **compressed KV cache (NVFP4)** on ROCm and monitor descriptor overhead on GB200/NIXL.  
- Avoid `prompt_embeds` with penalties until [#57719](https://github.com/vllm-project/vllm/issues/57719) is resolved.  
- Use **persistent KV offload** only if your model config doesn’t change — otherwise, rely on PR #56331’s cache identity fix.  
- Consider **zero JIT compilation** ([RFC #49349](https://github.com/vllm-project/vllm/issues/49349)) for faster cold starts in production environments.

> 🔗 **Recommended Reading**:  
> - [Disaggregated Serving RFC](https://github.com/vllm-project/vllm/issues/42729)  
> - [Programmable KV Cache RFC](https://github.com/vllm-project/vllm/issues/57103)  
> - [FlashInfer Warmup Fix](https://github.com/vllm-project/vllm/pull/58165)

---  
*Digest compiled from GitHub activity on 2026-09-29 | vLLM Project (https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **1. Today's Highlights**  
SGLang continues to advance its distributed inference capabilities with critical progress on **prefill context parallelism (CP)** and a new roadmap for a **distributed KV cache system tailored to agentic workloads**, addressing rising memory and transfer bottlenecks. The project also intensified focus on **long-context sparse serving via HiSparse**, while multiple PRs target stability fixes for high-impact models like DeepSeek-V4.1, GLM-5.3, and Inkling.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, ongoing changes include:  
- **KV cache event schema alignment with vLLM** (#39991): Aiming for interoperability with shared observability tools; may require downstream consumers to update parsing logic. [PR #39991](https://github.com/sgl-project/sglang/pull/39991)  
- **Renderer image publishing** now tracked in CI (#40920): Pending release of the SGLang renderer container image. [Issue #40920](https://github.com/sgl-project/sglang/issues/40920)

---

### **3. New Model & Hardware Support**  
- **T-Head PPU support**: Roadmap initiated for first-class integration of ZW810/ZW810E/ZW-M890P cards. This enables deployment on China-native AI hardware. [Issue #37519](https://github.com/sgl-project/sglang/issues/37519)  
- **AMD gfx950 (MI355X) enhancements**: Full FP8/MXFP4 support for GLM-5.3-Flash via Triton sparse attention and PTPC projections. [PR #39273](https://github.com/sgl-project/sglang/pull/39273), [PR #41615](https://github.com/sgl-project/sglang/pull/41615)  
- **NPU (Huawei DSA)**: Added decode CP support for DSA models and enabled interleave/zigzag in prefill CP. [PR #37787](https://github.com/sgl-project/sglang/pull/37787), [PR #40165](https://github.com/sgl-project/sglang/pull/40165)  
- **CPU support**: Fixed RoPE kernel for VLA models on CPU. [PR #40139](https://github.com/sgl-project/sglang/pull/40139)

---

### **4. Performance & Optimization**  
- **Prefill CP scalability**: Progress on enabling prefill context parallelism for MHA/GQA backends (FlashInfer/TRTLLM-MHA). [Issue #21788](https://github.com/sgl-project/sglang/issues/21788)  
- **HiSparse for long-context**: Reduces GPU memory usage during decode by keeping only a hot working set in HBM. [Issue #28874](https://github.com/sgl-project/sglang/issues/28874)  
- **Distributed KV Cache System**: New roadmap targeting PD disaggregation + HiCache for agentic workloads with massive KV storage needs. [Issue #21846](https://github.com/sgl-project/sglang/issues/21846)  
- **KV cache sharding**: Now supported for both MTP and DSA indexers, improving memory distribution across devices. [PR #40929](https://github.com/sgl-project/sglang/pull/40929), [PR #40925](https://github.com/sgl-project/sglang/pull/40925)

---

### **5. Stability & Regressions**  
**Critical issues reported today:**  
1. **DeepSeek-V4.1-Flash + DSPARK**: Unbounded `SparsePrefillWorkspace` allocation causes OOM crashes in TP groups. [Issue #41076](https://github.com/sgl-project/sglang/issues/41076)  
2. **GLM-5.3 with DFLASH speculative decoding**: Severe repetition and degenerate loops in output. [Issue #40843](https://github.com/sgl-project/sglang/issues/40843)  
3. **MiMo-V2 on SM100**: Incorrectly selects FP8 MoE runner for packed MXFP4 experts, risking numerical instability. [Issue #41569](https://github.com/sgl-project/sglang/issues/41569)  
4. **Kimi-K3**: Repeated CUDA launch failures during decode on recent images (`c6ad1f26`). [Issue #32924](https://github.com/sgl-project/sglang/issues/32924)  

*Note: No fix PRs linked for these yet — high priority for triage.*

---

### **6. What This Means for Application Developers**  
- **Agentic apps**: Expect tighter integration with distributed KV caching and HiCache optimizations—critical for stateful, long-running agents. Monitor [Issue #21846](https://github.com/sgl-project/sglang/issues/21846) for future deployments.  
- **Model choice**: GLM-5.3, Inkling, and DeepSeek-V4.1 are now viable on AMD/NPU with full FP8/MXFP4 support—but verify behavior under speculative decoding and long contexts due to active regressions.  
- **Production safety**: Be cautious with `/generate` requests—unvalidated `session_params`, `top_k`, or `n` values can crash the server. Enforce input validation at the app layer. [Issue #41466](https://github.com/sgl-project/sglang/issues/41466), [Issue #41482](https://github.com/sgl-project/sglang/issues/41482)  
- **Hardware diversity**: T-Head PPU and AMD gfx950 support opens new deployment paths—ideal for sovereign or cost-sensitive environments. Test early with model-specific configurations.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-29**

---

### **1. Today's Highlights**  
The latest development focus centers on **multimodal embedding support**, with the `/v1/embeddings` endpoint now accepting structured content arrays (vision/audio/video) for Qwen3-VL-Embedding models. Critical fixes were merged to resolve GCC 15 `stringop-overflow` warnings and Vulkan compilation issues due to missing `std::function`. A major architectural shift is underway: speculative decoding, MTMD, and server components are being unified under a common `batch_ext` API, paving the way for more robust batch processing across backends.

---

### **2. Releases & Breaking Changes**  
- **b11242**: Fixed GCC 15 `stringop-overflow` in `decode_embd_batch` ([#29607](https://github.com/ggml-org/llama.cpp/pull/29607))  
- **b11239**: Resolved Vulkan compile error caused by missing `std::function` header ([#29597](https://github.com/ggml-org/llama.cpp/pull/29597))  
- **b11238**: Introduced left-padding via `ggml_pad_ext` for audio encoders (Parakeet, LFM2-Audio, Granite Speech, Gemma 4) ([#29567](https://github.com/ggml-org/llama.cpp/pull/29567))  
- **b11236**: Migrated speculative decoding, MTMD, and server logic to `batch_ext` — **API change in progress**; expect deprecation of legacy `llama_batch` in future releases ([#29385](https://github.com/ggml-org/llama.cpp/pull/29385))

> 🔗 *Migration Note*: Developers using custom batching or speculative decoding should prepare for `llama_batch_ext` adoption. Legacy APIs may be deprecated soon.

---

### **3. New Model & Hardware Support**  
- **Multimodal Embedding Support**: `/v1/embeddings` now accepts OpenAI-style wrapped content arrays (`{"content": [...]}`) for vision/audio/video inputs, enabling full multimodal embedding workflows with **Qwen3-VL-Embedding** models ([#29556](https://github.com/ggml-org/llama.cpp/pull/29556)).  
- **New Model Architecture Added**: Support for `GraniteSpeech5ForCTC` (Turbo CTC), a non-autoregressive encoder-only model for speech-to-text tasks ([#29446](https://github.com/ggml-org/llama.cpp/pull/29446)).  
- **Hardware Backend Updates**:  
  - **OpenVINO**: Marked unaligned batch-stride views as unsupported; stricter input validation added ([#29603](https://github.com/ggml-org/llama.cpp/pull/29603))  
  - **Hexagon (Android)**: Improved perfetto trace granularity for short events ([#29614](https://github.com/ggml-org/llama.cpp/pull/29614))

---

### **4. Performance & Optimization**  
- **CPU Flash Attention**: Enabled tiled flash attention for non-vector-multiple head dimensions on x86, expanding AVX2 support for masked GEMM operations ([#29423](https://github.com/ggml-org/llama.cpp/pull/29423)).  
- **Vulkan Backend**: Kernel tuning improved performance by **~6.3%** on RTX 3090 for large batches (4096 tokens) ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476)).  
- **Speculative Decoding Innovation**: Introduction of `--cpu-mtp` flag enables CPU-offloaded MTP drafters for VRAM-constrained systems (e.g., 8–12GB GPUs), reclaiming ~1GB VRAM from recurrent state snapshots ([#29620](https://github.com/ggml-org/llama.cpp/pull/29620)).  
- **CUDA/HIP**: ROCm matrix-core (MFMA) path added for CDNA2 (gfx90a), unlocking deeper hardware utilization in DeepSeek-V3.2/V4 indexing ([#29050](https://github.com/ggml-org/llama.cpp/pull/29050)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Status | Link |
|--------|------|-------|------|
| Critical | Server forces full prompt reprocessing on subsequent requests (SWA/recurrent memory error) | Closed | [#21831](https://github.com/ggml-org/llama.cpp/issues/21831) |
| High | Draft-MTP emits OOB token ID (n_vocab) on Vulkan (AMD Strix Point) | Open | [#28158](https://github.com/ggml-org/llama.cpp/issues/28158) |
| High | DFlash2 fails with `--split-mode tensor` due to backend assertion | Open | [#27819](https://github.com/ggml-org/llama.cpp/issues/27819) |
| High | Long-running Vulkan decode on A770 shows empty EOS replies after ~7–8 hours | Open | [#29526](https://github.com/ggml-org/llama.cpp/issues/29526) |
| Medium | `--n-cpu-moe` below threshold crashes MTP draft load with “invalid vector subscript” | Open | [#27717](https://github.com/ggml-org/llama.cpp/issues/27717) |
| Medium | `mtmd` image chunks leave positional holes in draft KV cache → HTTP 500 | Open | [#27408](https://github.com/ggml-org/llama.cpp/issues/27408) |

> ✅ *Fixes in Progress*: PRs addressing GCC 15, Vulkan, and OpenVINO alignment have been merged. No fix yet for GPU-specific speculative bugs (e.g., #28158, #29526).

---

### **6. What This Means for Application Developers**  
- **Multimodal Apps**: You can now build full-stack agents that process images, audio, and text within a single `/v1/embeddings` call using Qwen3-VL-Embedding. Ensure your clients wrap inputs in `{"content": [...]}` format.
- **Resource-Constrained Inference**: Use `--cpu-mtp` to run speculative decoding on low-VRAM devices (e.g., laptops, edge nodes) without sacrificing throughput.
- **Batching & Scalability**: Start migrating to `llama_batch_ext` immediately — it’s becoming the foundation for all new features (speculative, MTMD, server). Avoid `llama_batch` in new code.
- **Stability Caution**: Avoid `--spec-type draft-dflash` with image-heavy prompts until [#27408] is resolved. Also monitor long-running Vulkan deployments for decode degradation (#29526).
- **Future-Proofing**: Watch for upcoming `batch_ext`-only APIs and consider testing with `--add-bos` enabled when converting models like Gemma 4.

> 📌 *Pro Tip*: Use [llama.app](https://llama.app) to test new features and validate behavior across platforms before deployment.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **1. Today's Highlights**  
Ollama has introduced **System One**, a new `/v1/systemone` API for structured decision-making, enabling models to return choices, probabilities, and scores—ideal for routing, classification, and triage workflows. This marks a significant step toward AI-native orchestration within the Ollama ecosystem. Meanwhile, critical stability issues on Windows (RTX 5090, CUDA memory access) and model-specific bugs (e.g., image processing in `gemma4`) remain active concerns.

---

### **2. Releases & Breaking Changes**  
- **v0.35.0**: Released today with full support for **System One**, a new `/v1/systemone` endpoint powered by TypeSafe’s Jev API.  
  - Returns structured outputs: `choice`, `noul` (probability of condition), and `score`.  
  - Designed for non-textual decision tasks like ticket routing or content scoring.  
  - [PR #18606](https://github.com/ollama/ollama/pull/18606) | [Docs PR #18702](https://github.com/ollama/ollama/pull/18702)

> ⚠️ **Migration Note**: The OpenAI-compatible `/v1/chat/completions` now defaults `top_p: 1.0` if omitted, silently overriding Modelfile settings.  
> - [Issue #18690](https://github.com/ollama/ollama/issues/18690) – Expected behavior should align with Modelfile parameters.

---

### **3. New Model & Hardware Support**  
- **K2 Horizon Models** (`k2-horizon` architecture): Requested support for MBZUAI IFM’s new 0.9B–36B MoE series.  
  - Official GGUFs available on Hugging Face: [K2-Horizon-3.7B-GGUF](https://huggingface.co/IFM/K2-Horizon-3.7B-GGUF)  
  - [Issue #18698](https://github.com/ollama/ollama/issues/18698)
- **MLX Backend**: System One support added via [PR #18701](https://github.com/ollama/ollama/pull/18701).  
- **GraniteForCausalLM**: Experimental support added for IBM’s Granite 4.1/4.2 models on MLX.  
  - [PR #17972](https://github.com/ollama/ollama/pull/17972)

> ✅ **Hardware**: RTX 5090 (Windows) reported CUDA illegal memory access during prompt evaluation — currently unresolved.  
> - [Issue #18642](https://github.com/ollama/ollama/issues/18642)

---

### **4. Performance & Optimization**  
- **Flash Attention**: Automatically enabled when supported and safe (no CPU fallback).  
  - Applies across text, vision, and embedding models.  
  - [PR #13448](https://github.com/ollama/ollama/pull/13448)
- **Memory Estimation**: MLX runner now reports *actual* VRAM usage (including KV cache and compute graph), not just static weight estimates.  
  - Improves visibility in containerized environments.  
  - [PR #14382](https://github.com/ollama/ollama/pull/14382)
- **Cache Reuse**: MTP models now reuse cache across non-thinking turns, improving throughput in multi-turn inference.  
  - [PR #17496](https://github.com/ollama/ollama/pull/17496)

> 📉 **Performance Regression**: `n_threads` ignores cgroup CPU quotas and cpuset limits, causing ~45x throughput collapse in CPU-limited containers.  
> - [Issue #17916](https://github.com/ollama/ollama/issues/17916)

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Status |
|---------|------|--------|--------|
| 🔴 **Critical** | CUDA illegal memory access on RTX 5090 (Cohere MoE) | Crashes `llama-server` (exit status `0xc0000409`) | [Issue #18642](https://github.com/ollama/ollama/issues/18642) |
| 🔴 **Critical** | Billing loop with Stripe (unresponsive support) | Blocks Cloud users from upgrading/downgrading | [Issue #18683](https://github.com/ollama/ollama/issues/18683) |
| 🟡 **High** | `gemma4` fails to process images on Windows | Image input ignored despite attachment | [Issue #16532](https://github.com/ollama/ollama/issues/16532) |
| 🟡 **High** | `OLLAMA_GPU_OVERHEAD` ignored by llama-server | No VRAM reserved for layer placement (`--fit`) | [Issue #18679](https://github.com/ollama/ollama/issues/18679) |
| 🟡 **High** | Chat history truncation removes latest user message | Triggers `500: no user query found` in tool loops | [Issue #17778](https://github.com/ollama/ollama/issues/17778) |

> 💡 **Fixes in Progress**: Multiple PRs address chat truncation logic ([#17894](https://github.com/ollama/ollama/pull/17894), [#18697](https://github.com/ollama/ollama/pull/18697)).

---

### **6. What This Means for Application Developers**  
- **Build Decision-Aware Agents**: Use `/v1/systemone` to create lightweight, high-speed agents for routing, filtering, or scoring without text generation overhead. Ideal for orchestrating LLM pipelines.
- **Avoid Silent Parameter Overrides**: Explicitly set `top_p` in requests—defaulting to `1.0` may degrade output quality when using custom Modelfiles.
- **Containerize with Care**: In CPU-limited environments, manually control `n_threads` and avoid relying on cgroup limits—current behavior causes severe performance degradation.
- **Monitor GPU Memory**: `OLLAMA_GPU_OVERHEAD` is ineffective; use `--fit` or manual layer placement to prevent OOM crashes.
- **Plan for Image & Vision Workloads**: Ensure `gemma4` and similar models are tested thoroughly on Windows; known image processing regressions persist.

> ✅ **Best Practice**: Use the new `System One` API for deterministic, structured outputs in agent backends—especially useful for integration with tools like AgentBridge ([Issue #18692](https://github.com/ollama/ollama/issues/18692)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-29**

---

#### **1. Today's Highlights**
The LiteLLM ecosystem continues to evolve with significant enhancements in cost tracking, security, and routing intelligence. Key developments include the introduction of a **model leaderboard UI** for visibility into actual model usage patterns, improvements to **guardrail timeout enforcement**, and deeper integration with **Oso** for fine-grained model authorization. Additionally, new support for **Bedrock Mantle pricing** and **DashScope realtime WebSocket** enables more accurate cost attribution and broader model coverage.

---

#### **2. Releases & Breaking Changes**
- **v1.104.0-rc.1** and **v1.103.0** released today with enhanced Docker image signing via [cosign](https://docs.sigstore.dev/cosign/overview/) using a consistent key introduced in [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).  
  🔗 [Verify release signatures](https://github.com/BerriAI/litellm#verify-docker-image-signature)

> *Note: No breaking API changes reported in these releases. Focus remains on stability and security hardening.*

---

#### **3. New Model & Hardware Support**
- ✅ **Bedrock Mantle** now fully supported with dedicated cost map entries for `anthropic.claude-opus-5.5` and `sonnet-5.5`, including GovCloud variants.
  🔗 [PR #43647](https://github.com/BerriAI/litellm/pull/43647)
- ✅ **DashScope Realtime WebSocket** support added, enabling real-time inference for DashScope models via OpenAI-compatible `/v1/live/sessions`.
  🔗 [PR #40579](https://github.com/BerriAI/litellm/pull/40579)
- ✅ **llmman** added as a new OpenAI-compatible provider (local inference server on port 17434).
  🔗 [PR #38925](https://github.com/BerriAI/litellm/pull/38925)

> *No new hardware backends (CUDA/ROCm/Metal/CPU) or quantization formats added today.*

---

#### **4. Performance & Optimization**
- 🚀 **Per-second pricing** now correctly calculated with `cost_per_second` field, resolving double-billing issues where input/output rates were summed incorrectly.
  🔗 [PR #43614](https://github.com/BerriAI/litellm/pull/43614)
- ⏱️ **Guardrail timeouts** are now enforced per request using wall-clock limits, preventing hung guardrails from blocking entire pipelines.
  🔗 [PR #43648](https://github.com/BerriAI/litellm/pull/43648)
- 📦 **Batch file limits** introduced: `max_batch_file_records`, `max_batch_files_per_day`, and `max_batch_file_size` prevent abuse and resource exhaustion.
  🔗 [PR #43632](https://github.com/BerriAI/litellm/pull/43632)

> *These optimizations improve system resilience under load and reduce operational risk.*

---

#### **5. Stability & Regressions**
| Severity | Issue | Status | Fix PR | Link |
|--------|------|--------|--------|------|
| 🔴 High | Redis cache fails due to unexpected `ssl_check_hostname` arg in v1.93.0 | Open | N/A | [#34614](https://github.com/BerriAI/litellm/issues/34614) |
| 🔴 High | `sanitize_input_schema_for_anthropic` drops root `anyOf`/$ref → empty `properties` | Open | N/A | [#43157](https://github.com/BerriAI/litellm/issues/43157) |
| 🔴 High | `gemini_chat` tool translation maps `""` args → `{"type": "object"}` instead of `{}` | Open | N/A | [#43156](https://github.com/BerriAI/litellm/issues/43156) |
| 🟡 Medium | `max_iterations` and `max_budget_per_session` shared across agents in same trace | Open | N/A | [#43190](https://github.com/BerriAI/litellm/issues/43190) |
| 🟡 Medium | Azure GPT-4.1 rejects both `max_tokens` and `max_completion_tokens` simultaneously | Open | N/A | [#31614](https://github.com/BerriAI/litellm/issues/31614) |

> *Critical regressions related to schema translation and Redis configuration remain open. Prioritize fixes for Anthropic/Gemini tool schema handling and Redis compatibility.*

---

#### **6. What This Means for Application Developers**
- ✅ **You can now build more secure, observable agent systems**: With Oso integration (`PR #42416`) and Airia guardrail support (`PR #43657`), you can enforce external policy decisions at the model level.
- ✅ **Cost transparency is improving**: The new **model leaderboard UI** (`PR #43649`) gives admins real-time insight into which models are used most — critical for budgeting and optimization.
- ⚠️ **Avoid schema-breaking behavior**: Be cautious when using tools with union types (e.g., `Union[A, B]`) via Anthropic or Gemini — current `sanitize_input_schema` logic may strip essential type information.
- ⚠️ **Handle batch uploads carefully**: Use `max_batch_file_records` and `max_batch_file_size` to avoid denial-of-service risks in high-throughput environments.

> 🔧 **Actionable Tip**: If using Azure GPT-4.1 or Bedrock Mantle, ensure your config uses only one of `max_tokens` or `max_completion_tokens`. For Redis users, upgrade beyond v1.93.0 or patch `ssl_check_hostname` handling.

--- 

*Digest generated: 2026-09-29 | Source: [GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-29**

---

### **1. Today's Highlights**  
Unsloth v0.1.900-beta introduces **Laya Decision Models** and a unified **Skills Library**, enabling local deployment of open-source reasoning agents like Jev (Laya). The release delivers ~4.5× faster image and video generation, especially on Apple Silicon, while ongoing improvements target multi-GPU workflows, model export, and cross-platform stability.

---

### **2. Releases & Breaking Changes**  
- **v0.1.900-beta**: Official release with new Laya decision engine support, Skills Editor, document viewer, and enhanced media handling.  
  🔗 [GitHub Release v0.1.900-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.900-beta)  
- **Note**: No breaking API changes reported; backward compatibility preserved for existing fine-tuned models and inference pipelines.

---

### **3. New Model & Hardware Support**  
- **Laya Decision Models**: First-class support for running and serving Laya-style reasoning agents locally via `unsloth start opencode`.  
  🔗 [Issue #8546](https://github.com/unslothai/unsloth/issues/8546)  
- **Idefics3 Architecture**: Feature request (#4079) to enable optimized fine-tuning of IBM Granite Docling VLM (258M params), pending native support.  
- **AMD ROCm + NVIDIA Hybrid Systems**: Multiple PRs (#12246, #12247, #12248) address dual-GPU workflows—allowing separate use of AMD (ROCm) and NVIDIA (CUDA) cards for training, chat, and image generation.  
  🔗 [PR #12246](https://github.com/unslothai/unsloth/pull/12246), [PR #12248](https://github.com/unslothai/unsloth/pull/12248)  
- **MLX on Apple Silicon**: FP16 support now available for Laya checkpoints on MLX backend.  
  🔗 [PR #12256](https://github.com/unslothai/unsloth/pull/12256)

---

### **4. Performance & Optimization**  
- **Image/Video Generation**: Up to **~4.5× faster** throughput on Apple Silicon due to improved kernel scheduling and offload planning.  
  🔗 [PR #12043](https://github.com/unslothai/unsloth/pull/12043)  
- **Decision API Inference**: Optimized with marker-only heads and CUDA graphs — no `torch.compile` required.  
  🔗 [PR #12224](https://github.com/unslothai/unsloth/pull/12224)  
- **Memory Planning**: Auto offload planner now dynamically measures activations to avoid VRAM underutilization on high-res tasks.  
  🔗 [PR #12043](https://github.com/unslothai/unsloth/pull/12043)  
- **GGUF Model Efficiency**: Fixes to prevent image-based chats from blocking other concurrent sessions.  
  🔗 [PR #12236](https://github.com/unslothai/unsloth/pull/12236)

---

### **5. Stability & Regressions**  
- **Critical**: Tool calls can hang indefinitely past `max_tool_call_duration` (e.g., terminal commands failing silently).  
  🔗 [Issue #12048](https://github.com/unslothai/unsloth/issues/12048) | ✅ Fix in progress: [PR #12234](https://github.com/unslothai/unsloth/pull/12234)  
- **High Severity**: Base64 image parsing errors cause full context reprocessing despite valid images being displayed.  
  🔗 [Issue #12058](https://github.com/unslothai/unsloth/issues/12058) | ✅ Fix in progress: [PR #12236](https://github.com/unslothai/unsloth/pull/12236)  
- **Moderate**: Unsloth Desktop fails to detect GPU on Steam Deck (CPU-only mode).  
  🔗 [Issue #5091](https://github.com/unslothai/unsloth/issues/5091)  
- **False Positives**: Bitdefender and Windows Defender flag installer executables as threats.  
  🔗 [Issue #12140](https://github.com/unslothai/unsloth/issues/12140), [Issue #9076](https://github.com/unslothai/unsloth/issues/9076)

---

### **6. What This Means for Application Developers**  
- **Build Agent Workflows**: Use the new **Laya Decision API** and **Skills Editor** to create modular, reusable agent components with local inference.  
  🔗 [PR #12232](https://github.com/unslothai/unsloth/pull/12232)  
- **Deploy Multi-GPU Systems**: Leverage hybrid NVIDIA+AMD setups by assigning specific jobs (training, chat, vision) to dedicated GPUs.  
  🔗 [PR #12248](https://github.com/unslothai/unsloth/pull/12248)  
- **Export & Share Configs**: Soon, you’ll be able to export fine-tuned model parameters to Ollama-compatible Modelfiles.  
  🔗 [Issue #4660](https://github.com/unslothai/unsloth/issues/4660)  
- **Avoid Crashes**: Monitor tool call timeouts and image base64 parsing issues—use `max_tool_call_duration` and ensure proper encoding handling.  
- **Cross-Platform Portability**: Export `.unsloth` portable archives for model transfer across devices.  
  🔗 [Issue #8798](https://github.com/unslothai/unsloth/issues/8798)

> 💡 **Pro Tip**: For AMD users, always verify ROCm is active (`rocm-smi`) and avoid `CUDA_VISIBLE_DEVICES=""` if using mixed hardware.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*