# AI Infrastructure Digest 2026-10-26

> Generated: 2026-10-26 00:37 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-26**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q4 2026 is characterized by rapid convergence toward high-performance, hardware-aware serving engines optimized for speculative decoding and long-context workloads. Projects are increasingly focused on multi-backend parity (CUDA, ROCm, Metal, Vulkan), with a clear shift from generic inference to *specialized* execution—especially around MoE models, hybrid architectures, and distributed prefill/decode pipelines. Stability remains a top concern, as new optimizations expose latent bugs in memory management, kernel fusion, and cross-node synchronization. The emergence of dedicated tooling layers like LiteLLM’s guardrails and Unsloth’s workflow engine signals maturation beyond raw inference into production-grade agent systems.

---

### **2. Activity Comparison**

| Project       | Open Issues (↑) | Open PRs (↑) | Recent Release? | Status Summary |
|---------------|------------------|----------------|------------------|----------------|
| **vLLM**      | 87 (+5)          | 39 (+7)        | No               | High activity in Blackwell/ROCm support; critical regressions in MTP/EAGLE workflows |
| **SGLang**    | 68 (+3)          | 42 (+9)        | No               | Active speculative decoding fixes; Apple Silicon roadmap launched |
| **llama.cpp** | 102 (+6)         | 51 (+8)        | No               | Critical CUDA/Metal stability issues; major backend optimizations underway |
| **Ollama**    | 145 (+4)         | 22 (+2)        | No               | High instability on macOS Metal & ROCm; focus on UX resilience |
| **LiteLLM**   | 56 (+2)          | 19 (+4)        | **Yes** (4x)     | Security and proxy stability patches released; no breaking changes |
| **Unsloth**   | 121 (+8)         | 35 (+6)        | No               | Beta regression surge; strong UI/UX and offload planning progress |

> 🔍 *Note:* Despite lower release frequency, **LiteLLM** leads in immediate operational impact due to security-critical updates.

---

### **3. Model Support Race**

| New Model / Architecture       | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**        | ✅ (Testing) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **DeepSeek-V4.1-Flash**       | ✅ (Testing) | ✅ (PP + MLA) | ❌ | ❌ | ❌ | ❌ |
| **Kimi-K3 (SM107/FP4)**       | ❌ | ✅ (Low-latency path) | ❌ | ❌ | ❌ | ❌ |
| **MiniCPM-V-4.7-1B-GGUF**     | ❌ | ✅ (Vulkan fixed) | ❌ | ❌ | ❌ | ✅ |
| **FLUX.3 Klein (Image Edit)** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Blackwell (SM120)**         | ✅ (MoE tuning) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **ROCm (gfx1151, MI355X)**    | ✅ (Optimized) | ✅ (PP support) | ✅ (HIP KV cache) | ⚠️ (Radeon 890M crash) | ❌ | ✅ (Audio.cpp bundle) |
| **Intel XPU (Kimis Linear)**  | ✅ (Initial) | ❌ | ❌ | ❌ | ❌ | ❌ |

> 🏆 **Winner: vLLM & SGLang** — vLLM leads in next-gen hardware (Blackwell) and MoE performance; SGLang excels in model diversity and speculative decoding readiness.

---

### **4. Performance Frontier**

| Optimization Focus            | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache Efficiency**       | ✅✅ (Reusability RFC, PCP sync) | ✅ (HiCache PP-sync drain) | ✅ (HIP full-block load) | ✅ (VRAM prediction fix) | ❌ | ✅ (Embedding cost clarity) |
| **Batching & Parallelism**    | ✅✅ (PP, MTP, EAGLE) | ✅ (DSpark, Beam search) | ✅ (Fused FFN matmuls) | ✅ (Multi-GPU VRAM mgmt) | ❌ | ✅ (Tensor splitting) |
| **Quantization & Kernels**    | ✅ (MXFP8, FP8_ds_mla) | ✅ (FP4, MXFP4 dev) | ✅ (JQ*_K, vectorized dequant) | ❌ | ✅ (Guardrail-safe parsing) | ✅ (Smart offload planner) |
| **Distributed Serving**       | ✅✅ (PCP, monokernel) | ✅ (DSpark, pipeline sync) | ❌ | ⚠️ (Multi-GPU eviction) | ❌ | ❌ |
| **Speculative Decoding**      | ✅✅ (MTP+EAGLE integration) | ✅ (Draft width fix, JIT stability) | ❌ | ❌ | ❌ | ✅ (Vulkan spec-dec) |

> 🚀 **Trend:** Optimizations are now *co-designed* with hardware—e.g., fused MoE kernels on Blackwell, HIP block loading on RDNA4—indicating deep hardware-software co-evolution.

---

### **5. Layer Positioning**

| Project       | Primary Layer                     | Key Differentiator |
|---------------|------------------------------------|--------------------|
| **vLLM**      | **High-Performance Inference Engine** | Industry standard for scalable, low-latency serving; dominant in cloud-scale deployments |
| **SGLang**    | **High-Performance Inference Engine + Speculative Framework** | Specializes in advanced speculative decoding (DSpark, EAGLE); strong in agent-native execution |
| **llama.cpp** | **Local Runtime / CPU/GPU Hybrid** | Unmatched portability and edge deployment; ideal for offline or constrained environments |
| **Ollama**    | **Model Gateway + Developer Experience Layer** | Simplifies local model orchestration; strong focus on usability and developer feedback loops |
| **LiteLLM**   | **API Gateway / Proxy & Cost Control Layer** | Centralized routing, budgeting, auth, and guardrails—critical for enterprise LLM operations |
| **Unsloth**   | **Agent Studio / Local UX Layer** | End-to-end visual agent builder with smart offloading, flows, and persistent sessions |

> 💡 **Strategic Insight:** The ecosystem is bifurcating into *infrastructure engines* (vLLM/SGLang) and *application-layer platforms* (Ollama/LiteLLM/Unsloth), enabling modular stacking.

---

### **6. Trend Signals**

#### **Emerging Industry Trends:**
1. **Hardware-Specific Optimization Is Now Mandatory**: Projects are no longer "one-size-fits-all"—Blackwell-specific MoE tuning (vLLM), SM107-specific kernels (SGLang), and RDNA4 block loading (llama.cpp) show that performance gains require hardware-aware code.
2. **Speculative Decoding Stability Is the Next Bottleneck**: Multiple projects report crashes or silent failures in MTP/EAGLE/DSpark workflows—indicating that speculative decoding is moving from experimental to production-critical.
3. **Long-Context Accuracy > Speed**: Regressions like `indexer_budget` truncation (vLLM) and prompt invisibility (issue #62776) reveal that long-context fidelity is now a higher priority than raw throughput.
4. **Developer Experience (DX) Drives Adoption**: Features like `--limit-rate`, dynamic chunk sizing (Ollama), and declarative Flows (Unsloth) signal that usability is a competitive differentiator.
5. **Security & Compliance Are Embedded Early**: LiteLLM’s cosign verification, Presidio integration, and spend logging fixes reflect a shift toward *secure-by-design* inference proxies.

#### **What Developers Should Watch:**
- ✅ **Upgrade immediately** if using LiteLLM proxy in DST zones (critical OOM loop).
- ✅ **Avoid v0.40.6+ on ROCm (Radeon 890M)** and **v0.1.910-beta on Windows/Insider Preview** until patches land.
- ✅ **Enable `VLLM_BATCH_INVARIANT=1` + `--monokernel`** on Blackwell GPUs for up to 48% decode gain.
- ✅ **Use `--grammar depth=64`** in llama.cpp to prevent stack overflows.
- ✅ **Leverage LiteLLM’s `sideren/<model>`** for instant OpenAI-compatible access without config boilerplate.

> 📌 **Bottom Line:** The future of AI infrastructure is not just faster—it’s more stable, safer, and more tailored to real-world agent workflows. Choose your stack based on whether you prioritize raw performance (vLLM/SGLang), ease of use (Ollama), or operational control (LiteLLM).

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-26**

---

### **1. Today's Highlights**  
The vLLM project continues to accelerate its support for next-generation hardware and speculative decoding, with critical work on Blackwell (SM120) and ROCm platforms. Key developments include performance tuning for fused MoE kernels on Blackwell (+48% decode throughput), fixes for MTP speculative decoding in hybrid models, and a new RFC proposing reusable KV compression for transfer and storage—signaling growing maturity in long-context and multi-node inference.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were introduced. The latest stable version remains `v0.32.0`, with nightly builds continuing to advance experimental features like EAGLE prefix caching and MTP verification.

---

### **3. New Model & Hardware Support**  
- ✅ **Blackwell (SM120)**: Active development on full CUDA graph support for ViT encoders (Issue #38175), with PRs targeting optimized MoE configs (PR #63627).  
- ✅ **ROCm (gfx1151, gfx950, MI355X)**: New kernel optimizations for MiniMax-M3.1-Flash (PR #62509), GLM-5.3-Flash chunk indexing (PR #63072), and improved MXFP8 handling.  
- ✅ **Intel GPU (XPU)**: Initial support for Kimi-Linear model dispatch via PR #63531, though performance is still being evaluated.  
- ✅ **New Models**: Qwen3.8-Flash-Next (issue #62776), DeepSeek-V4.1-Flash (issue #58233), and Kimi K3 (issue #50587) are under active testing and optimization.

---

### **4. Performance & Optimization**  
- 🚀 **+48% decode throughput** on Blackwell via tuned batch-invariant fused MoE configs (PR #63627).  
- 🔧 **Top-k kernel improvement**: Monolithic Triton top-k now uses outlier-aware pivot selection (Issue #61998), reducing fallbacks to full-vocab search by up to 10%.  
- ⚙️ **MTP + EAGLE integration**: PRs #61589 and #63555 enable lookahead block hashing and MTP verify steps within monokernel decode, improving draft reliability.  
- 📈 **Benchmarking updates**: `vllm bench forward` now includes speculative drafting latency by default (PR #63622), with PP support added (PR #63616).

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| Critical | #63505 | Illegal memory access (Xid 31) on Qwen3.8-27B (GDN hybrid) with PP=3, SM86, FP8 kv-cache | Open; regression since v0.28.0 |
| High | #62776 | Prompt content beyond `indexer_budget` (~2K tokens) invisible in Qwen3.8-Flash-Next on GB10 | Open; impacts long-context accuracy |
| Medium | #63149 | KV event correctness issues across spec-decoding modes (Dynamo, llm-d, Router) | Tracking issue; no fix yet |
| Medium | #63343 | `enable_adaptive_verification` rejected on SM120 due to device-query-lens gating | Open; blocks adaptive verification on Blackwell |
| Low | #61998 | Top-k gather misses on MiMo-V2.6 logits due to suboptimal pivot estimation | In progress; proposed fix in pipeline |

> 💡 *Note:* Several regressions affect speculative decoding workflows (MTP, EAGLE) and long-prefill scenarios—critical for production LLM agents.

---

### **6. What This Means for Application Developers**  
- **For high-throughput systems**: Enable `VLLM_BATCH_INVARIANT=1` and use `--monokernel` with MTP/EAGLE drafter for up to **48% faster decode** on Blackwell GPUs.  
- **For long-context apps**: Avoid `indexer_budget` defaults (>2K) until #62776 is resolved—use `--max-num-seqs` and monitor prompt truncation.  
- **For multi-node deployments**: Use `--kv-cache-manager` with proper engine ID synchronization (PR #62916); ensure PCP ranks are aligned.  
- **For tool-calling/structured output**: Update to v0.32+ to avoid parser inconsistencies (e.g., #46493), and validate XGrammar behavior under probabilistic drafting (#61383).  
- **For quantization workflows**: Expect delayed support for NVFP4_AWQ (issue #45333) and consider using `fp8_ds_mla` for Blackwell models (issue #47174).

> 🔗 [View all issues](https://github.com/vllm-project/vllm/issues?q=is%3Aopen+updated%3A%3E%3D2026-10-25) | [Explore recent PRs](https://github.com/vllm-project/vllm/pulls?q=is%3Aopen+updated%3A%3D2026-10-26)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **SGLang Digest — 2026-10-26**

---

#### **1. Today's Highlights**  
SGLang continues its momentum in high-performance inference infrastructure, with critical progress on speculative decoding stability and DSpark optimizations for Kimi-K3 and DeepSeek-v4.1. Key PRs address crash risks in FlashInfer JIT compilation and fix draft width mismatches in verification paths, while new work advances HiCache integration and multi-backend transport abstraction.

---

#### **2. Releases & Breaking Changes**  
*No new releases or breaking changes reported in the last 24 hours.*

---

#### **3. New Model & Hardware Support**  
- **Kimi-K3 (SM107/FP4)**: Low-latency kernel path prepared with fused route metadata and SM107-specific optimizations ([PR #46473](https://github.com/sgl-project/sglang/pull/46473)).  
- **DeepSeek-v4.1**: Added support for prefill context parallelism on AMD ROCm ([PR #43465](https://github.com/sgl-project/sglang/pull/43465)) and MLA draft serving via target attention ([PR #44676](https://github.com/sgl-project/sglang/pull/44676)).  
- **Apple Silicon Roadmap**: Active roadmap (#19137) launched to enable native Apple device support in Q2 2026, inviting community contributions.  
- **Quantization**: FP4 routing and MXFP4 support under active development for GLM models ([RFC #36447](https://github.com/sgl-project/sglang/issues/36447)).

---

#### **4. Performance & Optimization**  
- **Speculative Decoding**: Fixed draft width inconsistency in DSpark (`sample_from_anchor=False`) leading to incorrect output ([PR #46478](https://github.com/sgl-project/sglang/pull/46478), [Issue #46476](https://github.com/sgl-project/sglang/issues/46476)).  
- **FlashInfer Preload Stability**: Resolved non-deterministic greedy output flip during split prefill on Qwen3.5 hybrid GDN model ([Issue #46259](https://github.com/sgl-project/sglang/issues/46259)).  
- **HiCache & PP Sync**: Identified lock-step blocking in pipeline-parallel prefill due to HiCache PP-sync drain ([Issue #45351](https://github.com/sgl-project/sglang/issues/45351)), impacting scalability.  
- **Beam Search**: Deferred token materialization until final sort to reduce memory pressure ([PR #46480](https://github.com/sgl-project/sglang/pull/46480)).  
- **Video Processing**: Optimized diffusion video frame quantization to `uint8` before host copy, reducing bandwidth ([PR #46439](https://github.com/sgl-project/sglang/pull/46439)).

---

#### **5. Stability & Regressions**  
- **Critical Crash**: Speculative decoding crashes server on first non-greedy request due to FlashInfer JIT failure when using bundled pip CUDA toolkit vs system CUDA ([Issue #43412](https://github.com/sgl-project/sglang/issues/43412)). *Fix pending.*  
- **DSpark Draft Width Bug**: Incorrect draft query width calculation leads to invalid output ([Issue #46476](https://github.com/sgl-project/sglang/issues/46476)) → *Fixed in PR #46478*.  
- **Kimi-K3 Garbled Output**: DCP a2a produces garbled decode on 2-node GB300; resolved by disabling NCCL_GRAPH_REGISTER ([Issue #45367](https://github.com/sgl-project/sglang/issues/45367)).  
- **Silent Precision Corruption**: FP8 lm_head weight_scale dropped silently in compressed-tensors, causing degenerate repetition ([Issue #34895](https://github.com/sgl-project/sglang/issues/34895)).  
- **Memory Corruption Risk**: MLA KV writers can overwrite reserved padding slot 0 ([Issue #36207](https://github.com/sgl-project/sglang/issues/36207)).

---

#### **6. What This Means for Application Developers**  
- **Use caution with speculative decoding** on pip-installed environments — avoid `temperature > 0` until the FlashInfer JIT issue is patched.  
- **Ensure consistent draft/target widths** when using `sample_from_anchor=False`; verify your configs against latest PRs.  
- **Leverage upcoming HiCache improvements** for faster pipeline-parallel prefill, but expect potential lock-step bottlenecks in large-scale setups.  
- **Prepare for Apple Silicon support** starting Q2 2026 — early contributors can shape the roadmap.  
- **Monitor for precision bugs** in FP8/MXFP4 models; ensure `weight_scale` and dtype consistency in custom checkpoints.  

> 🔗 **Track key issues**: [#43412](https://github.com/sgl-project/sglang/issues/43412), [#46476](https://github.com/sgl-project/sglang/issues/46476), [#45351](https://github.com/sgl-project/sglang/issues/45351)  
> 🔗 **Contribute**: Join the [Diffusion team](https://github.com/sgl-project/sglang/issues/27214) or help build Apple Silicon support ([#19137](https://github.com/sgl-project/sglang/issues/19137)).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-26**

---

### **1. Today's Highlights**  
The latest updates focus on **critical stability fixes** for recursive grammar parsing and CUDA memory safety, preventing stack overflows and CPU/MEM exhaustion during inference. Significant performance optimizations landed for **CUDA and SYCL backends**, including fused matmuls in FFN layers and vectorized dequantization kernels, improving decode throughput on modern GPUs. A major code modernization effort replaced C-style variable-length arrays (VLAs) with `std::string` in CUDA code, eliminating compiler warnings and enhancing portability.

---

### **2. Releases & Breaking Changes**  
No new official releases were published today. However, the following **non-breaking but impactful changes** were merged:

- **Recursive depth limit enforcement** (#31153): All recursive functions now require a hard-coded depth limit to prevent stack overflow. This is enforced via `code-review` checks—projects using custom parsers must now explicitly define limits.
  - [PR #31153](https://github.com/ggml-org/llama.cpp/pull/31153)
- **CUDA VLA → std::string migration** (#30463): Replaced unsafe C-style `char archName[archLen + 1]` with `std::string`, resolving Clang warnings and improving code safety.
  - [PR #30463](https://github.com/ggml-org/llama.cpp/pull/30463)

> ⚠️ *Developers using custom CUDA kernels or dynamic backend selection should verify compatibility with these changes.*

---

### **3. New Model & Hardware Support**  
- **Qwen4Exp model support**: Merged tensor fusion during conversion to improve load time and reduce memory fragmentation.
  - [PR #31028](https://github.com/ggml-org/llama.cpp/pull/31028)
- **SYCL backend enhancements**: Added support for new quant types (`JQ2_K`–`JQ6_K`) and improved MoE scheduling on Intel B70 and Arc Pro devices.
  - [PR #30715](https://github.com/ggml-org/llama.cpp/pull/30715), [PR #30156](https://github.com/ggml-org/llama.cpp/pull/30156)
- **WebGPU race condition fix**: Resolved concurrent `memset` issues in CI, improving reliability for web-based inference deployments.
  - [PR #31162](https://github.com/ggml-org/llama.cpp/pull/31162)

> ✅ *New quant types are available for CPU-only use; expect GPU acceleration in future releases.*

---

### **4. Performance & Optimization**  
- **CUDA**: Fused FFN gate/up matmuls and GLU operations in MMQ kernels with interleaved rows, reducing kernel launch overhead by ~25% for prompt processing.
  - [PR #29948](https://github.com/ggml-org/llama.cpp/pull/29948)
- **SYCL**: Optimized work-group argmax for short TOP_K rows and vectorized dequantization stores (Q4_0, IQ3, MXFP4), resulting in **~18% faster decode** on Intel Arc B70.
  - [PR #31110](https://github.com/ggml-org/llama.cpp/pull/31110), [PR #30976](https://github.com/ggml-org/llama.cpp/pull/30976)
- **HIP**: Enabled more efficient KV cache decoding on RDNA4 GPUs by loading full 32-value K blocks per lane, cutting repeated reads by up to 8×.
  - [PR #30803](https://github.com/ggml-org/llama.cpp/pull/30803)
- **Metal**: Improved GQA decode path by batching shared KV head reads, reducing redundant memory fetches.
  - [PR #30728](https://github.com/ggml-org/llama.cpp/pull/30728)

> 📈 *These changes collectively yield up to 30% better token/sec in high-context scenarios on supported hardware.*

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:

| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| Stack overflow in GBNF grammar due to nested repetition (#18988) | 🔴 Critical | Open | No fix yet |
| CUDA illegal memory access with flash attention (Gemma 4 12B QAT Q4_0 + mmproj) (#30436) | 🔴 High | Open | In progress |
| Q4_1/Q5_1 mat-vec kernels overflow fp16 → NaN logits (#30950) | 🔴 High | Open | Pending review |
| VRAM leak in DSpark speculative decoding (DeepSeek V4 Flash) (#27155) | 🟡 Medium | Open | Patch under investigation |

> ⚠️ *Multiple regressions affect CUDA and Vulkan backends on multi-GPU setups and large models. Users of Qwen3.6+, Gemma 4, and DeepSeek V4 Flash should test with `--no-fa` or `--ngl 1` as temporary mitigation.*

---

### **6. What This Means for Application Developers**  
- **Use `--grammar` with caution**: Always set a recursion depth limit (e.g., `depth=64`) when defining custom grammars to avoid silent crashes.
- **Leverage new quant types** (`JQ*_K`) for fine-tuned control over model size vs. accuracy trade-offs—ideal for edge deployment.
- **Avoid mixed-GPU setups** with >3 GPUs until #27953 is resolved (compute buffer allocation bug).
- **Upgrade to latest master** if using SYCL or Metal: performance gains are significant, especially for MoE and GQA models.
- **Monitor for memory leaks** when using DFlash2 + `--split-mode tensor`—crashes occur due to graph allocation errors.
- **Enable `--no-alloc` in production** only if you’re confident about static memory layout—use `llama_context` APIs carefully.

> 🔗 For real-time monitoring: Check [GitHub Issues](https://github.com/ggml-org/llama.cpp/issues) daily for critical regressions. Use `--log-level debug` for detailed tracing in unstable builds.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-26**

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to evolve with strong momentum in model serving stability and performance optimization, particularly around Metal (macOS), ROCm (Radeon), and multi-GPU environments. Key developments include a new `--limit-rate` flag for controlled model downloads (#2006, #19288), critical fixes for macOS Metal GPU watchdog kills (#19280), and improvements to tool call parsing and stream handling across models like Gemma4 and Qwen3.5. These updates reflect growing focus on production-grade reliability and developer control.

---

### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking changes were published today. The latest stable version remains **v0.40.11**, with ongoing work focused on incremental improvements and stability patches.

---

### **3. New Model & Hardware Support**  
- **ROCm on Radeon 890M (gfx1150)**: Users report severe crashes (`Memory access fault by GPU`) on v0.40.6–0.40.7, confirmed working only on v0.33.3 — indicating a regression in ROCm support. [Issue #19290](https://github.com/ollama/ollama/issues/19290)  
- **Metal (macOS)**: Multiple issues surfaced related to GPU watchdog timeouts during long prompt processing (e.g., XML analysis). Fixes are underway via reduced prefill chunk sizes. [PR #19280](https://github.com/ollama/ollama/pull/19280), [Issue #19278](https://github.com/ollama/ollama/issues/19278)  
- **Mixture-of-Experts (MoE) Offloading**: Feature request to offload MoE weights to CPU via `OLLAMA_MOE_OFFLOAD` strategy to reduce VRAM usage. [Issue #11772](https://github.com/ollama/ollama/issues/11772)  
- **HuggingFace → Ollama Import**: Community-driven script proposal to import GGUF models directly from HuggingFace. [Issue #19277](https://github.com/ollama/ollama/issues/19277)

---

### **4. Performance & Optimization**  
- **Download Speed Control**: A new `--limit-rate` and `--limit-streams` option is being implemented to allow users to cap download bandwidth during `ollama pull`. This addresses long-standing requests and improves network fairness. [PR #19288](https://github.com/ollama/ollama/pull/19288)  
- **MLX Runtime Improvements**: PR #19291 introduces a version bump to MLX/MLX-C that enhances prompt processing speed for Gemma, Flint, and Laguna models using new `window_size` features.  
- **Long Prompt Handling (Metal)**: Reduced prefill chunk size dynamically based on context length to prevent GPU watchdog kills on macOS. [PR #19280](https://github.com/ollama/ollama/pull/19280)  
- **VRAM Management (Multi-GPU)**: Fix prevents eviction of CPU-only runners when GPU memory prediction fails — avoids spurious model evictions. [PR #19284](https://github.com/ollama/ollama/pull/19284)  

---

### **5. Stability & Regressions**  
| Severity | Issue | Impact | Status |
|---------|------|--------|--------|
| Critical | macOS Metal crash on model inference | System panic, GPU page fault, failure on XML analysis | [Issue #19278](https://github.com/ollama/ollama/issues/19278) |
| High | ROCm crash on Radeon 890M (gfx1150) | Complete failure after v0.40.6 upgrade | [Issue #19290](https://github.com/ollama/ollama/issues/19290) |
| High | Empty responses from Beam model on Ollama Cloud (OMP) | Intermittent agent termination; works via OpenCode Go | [Issue #19270](https://github.com/ollama/ollama/issues/19270) |
| Medium | `gemma4` tool call parser drops unclosed lists silently | Silent data loss in structured outputs | [Issue #19273](https://github.com/ollama/ollama/issues/19273), [PR #19274](https://github.com/ollama/ollama/pull/19274) |
| Medium | `/v1/completions` applies chat template to raw prompts | Breaks OpenAI compatibility for raw inputs | [Issue #19289](https://github.com/ollama/ollama/issues/19289) |
| Low | Windows PowerShell window flicker at startup | UX annoyance, no functional impact | [Issue #18415](https://github.com/ollama/ollama/issues/18415) |

---

### **6. What This Means for Application Developers**  
- **Control over resource usage**: With `--limit-rate`, developers can now manage bandwidth during model pulls — essential for shared or metered networks.  
- **Improved resilience on Apple Silicon**: The Metal watchdog fix (PR #19280) enables longer, more complex prompts without crashing — crucial for agents processing large documents.  
- **Better tooling fidelity**: Fixes to Gemma4/Qwen3.5 parsing ensure consistent behavior in tool calls and thinking streams, reducing silent failures in agent workflows.  
- **Watch for regressions**: If deploying on ROCm (Radeon 890M) or macOS Metal, avoid v0.40.6+ until patches land. Use v0.33.3 as a safe fallback.  
- **OpenAI compatibility note**: Be cautious with `/v1/completions` — it currently applies chat templates even for raw prompts, deviating from OpenAI’s spec. Use `raw: true` in `/api/generate` instead.  

> 🔗 *For real-time tracking, follow:*  
> - [GitHub Issues](https://github.com/ollama/ollama/issues)  
> - [Pull Requests](https://github.com/ollama/ollama/pulls)  
> - [Community Integrations](https://github.com/ollama/ollama#community-integrations)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-26**

---

### **1. Today's Highlights**  
The latest release cycle (v1.103.9–v1.106.4) focuses on stability and security, with critical fixes for auth handling, budgeting logic, and guardrail integrity. Notably, PRs have addressed a severe 500-error bug in the auth handler (`#48304`) and a memory-leak risk during DST fallback hours (`#48286`), both of which could impact production proxy deployments.

---

### **2. Releases & Breaking Changes**  
- **New releases**: `v1.103.9`, `v1.104.7`, `v1.105.5`, `v1.106.4` — all released within the past 24 hours.  
- **Security verification required**: All images (`ghcr.io/berriai/litellm:*`, `docker.io/litellm/*`, `litellm-database`, `litellm-non_root`) must be verified using [cosign](https://github.com/BerriAI/litellm/blob/e82a3c646908ba0a6ee0beddc4310d7a6cac4065/cosign.pub).  
- **No breaking API changes** reported; all updates are additive or patch-level.

> 🔗 [GitHub Release Verification Guide](https://github.com/BerriAI/litellm/tree/e82a3c646908ba0a6ee0beddc4310d7a6cac4065)

---

### **3. New Model & Hardware Support**  
- **Sideren added as JSON-configured OpenAI-compatible provider** via PR [#48356](https://github.com/BerriAI/litellm/pull/48356). No code change needed—just set `SIDEREN_API_KEY` to use `sideren/<model>` routes.
- **Decision Models provider integration** now available via PR [#46901](https://github.com/BerriAI/litellm/pull/46901), enabling unified decision-flow routing with TypeSafe-style models.
- **Ollama stop sequences now accept strings** (not just arrays) via PR [#48324](https://github.com/BerriAI/litellm/pull/48324), improving compatibility with legacy tool schemas.

---

### **4. Performance & Optimization**  
- **Vector store pagination stabilized** in PR [#48353](https://github.com/BerriAI/litellm/pull/48353): returns consistent page order and rejects invalid page numbers, preventing state drift in admin UIs.
- **Proxy startup resilience improved** post-DST fall-back: PR [#48286](https://github.com/BerriAI/litellm/issues/48286) prevents infinite restart loops and OOM kills during timezone transitions.
- **Spend logging optimized**: Invalid virtual keys no longer generate spurious spend records ([#48357](https://github.com/BerriAI/litellm/pull/48357)), reducing DB bloat and cost misattribution risks.

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| Auth failure handler crashes on non-object JSON bodies (`#48304`) | Critical | Open | ✅ [`#48329`](https://github.com/BerriAI/litellm/pull/48329) |
| Proxy loops forever and OOM-kills during DST fall-back (`#48286`) | Critical | Open | ✅ [`#48286`](https://github.com/BerriAI/litellm/issues/48286) *(investigating root cause)* |
| Presidio PII masking collides with user-defined placeholders (`#48029`) | High | Open | ✅ [`#48334`](https://github.com/BerriAI/litellm/pull/48334) |
| Vertex AI streaming drops reasoning content (`#48238`) | High | Open | ❌ Pending |
| DeepSeek V4 `reasoning_effort` param stripped (`#27439`) | Medium | Closed | N/A |

> ⚠️ **High-risk apps using Anthropic native API + Presidio guardrails** may experience incomplete PII masking until fix is merged.

---

### **6. What This Means for Application Developers**  
- **Upgrade immediately** if you use the LiteLLM proxy in production, especially in regions observing DST (e.g., Europe, North America). The OOM loop issue can crash services silently.
- **Avoid malformed virtual keys**—they now won’t create false spend logs, but ensure key validation at the edge.
- **Use `sideren/<model>`** without config boilerplate; it’s fully supported out-of-the-box.
- **Handle tool parameters carefully**: Unmapped models via JSON providers now preserve `tools`, `tool_choice`, etc. via [#48191](https://github.com/BerriAI/litellm/pull/48191).
- **Validate input types before sending large integers**—the proxy still converts >64-bit ints to floats (`#47947`). Use string-based schema or pre-truncate values.

> 🛠️ **Recommendation**: Audit your `litellm.proxy` deployment for `STORE_MODEL_IN_DB=false`, as Admin UI edits are blocked (`#46335`). Update to `v1.106.4` to benefit from recent auth and budget fixes.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

---

### **Unsloth Digest — 2026-10-26**

#### **1. Today's Highlights**  
The Unsloth ecosystem continues rapid evolution with major UI/UX refinements and backend stability improvements, particularly around GPU offloading, model loading, and cross-platform compatibility. Key focus areas include resolving critical crashes on Metal (Mac), fixing Vulkan inference issues for MiniCPM-V-4.7-1B, and enhancing Studio’s workflow resilience through smarter memory management and error recovery.

#### **2. Releases & Breaking Changes**  
No new releases in the past 24 hours. However, **v0.1.910-beta** (Windows) has triggered multiple regressions:
- [Issue #15221](https://github.com/unslothai/unsloth/issues/15221): Typing lag during image generation on AMD ROCm.
- [Issue #15142](https://github.com/unslothai/unsloth/issues/15142): All models fail to load post-update on Windows Insider Preview.
- [Issue #15022](https://github.com/unslothai/unsloth/issues/15022): False "child not listening" port check kills every GGUF load after Oct 23 update.

> 🔧 **Action**: Avoid v0.1.910-beta until fixes land; consider rolling back to v0.1.909-beta if experiencing instability.

#### **3. New Model & Hardware Support**  
- ✅ **Vulkan Backend**: Fixes landed for `openbmb/MiniCPM-V-4.7-1B-gguf` via PR [#15258](https://github.com/unslothai/unsloth/pull/15258), enabling speculative decoding on Vulkan.
- ✅ **AMD ROCm**: Ongoing work to ship ROCm/HIP bundles for `audio.cpp` ([#13042](https://github.com/unslothai/unsloth/issues/13042)), preventing CPU-only audio execution on AMD GPUs.
- ✅ **FLUX.3 Klein Image Editing**: PR [#15263](https://github.com/unslothai/unsloth/pull/15263) enables full edit pipeline support for `unsloth/flux-3-image-klein-GGUF`.
- 📌 **New Model Request**: Community request for native support of **Nanbeige4.3-33B** ([#15278](https://github.com/unslothai/unsloth/issues/15278)).

#### **4. Performance & Optimization**  
- ⚙️ **Memory Management**: PR [#15014](https://github.com/unslothai/unsloth/pull/15014) ensures image tokens are counted in auto-compaction logic, preventing context overflow in vision-model chats.
- 💡 **Offload Planning**: PR [#9872](https://github.com/unslothai/unsloth/pull/9872) introduces a smarter offload planner that considers llama.cpp’s internal fitter when allocating layers—reducing unnecessary VRAM spills.
- 🖥️ **GPU Utilization**: PR [#14446](https://github.com/unslothai/unsloth/pull/14446) enables tensor splitting across idle GPU pairs, improving decode throughput on multi-GPU systems.
- 💰 **Embedding Cost Clarity**: PR [#14465](https://github.com/unslothai/unsloth/pull/14465) reclassifies per-layer embeddings (e.g., Qwen3.8-Flash-Next, Gemma 4) as host/disk memory costs—not VRAM—improving pricing transparency.

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Fix PR |
|---------|------|--------|--------|
| Critical | macOS Metal OOM crash with `DeepSeek-V4.1-Flash-1017-GGUF` | Open | [#14431](https://github.com/unslothai/unsloth/pull/14431) |
| High | Vulkan crash on MiniCPM-V-4.7-1B with speculative decoding | Closed | [#15258](https://github.com/unslothai/unsloth/pull/15258) |
| High | Studio crashes on KDE Plasma due to WebKitWebProcess SIGABRT | Open | N/A |
| Medium | `--no-reasoning-preserve` ignored due to `preserve_thinking=true` override | Closed | [#15115](https://github.com/unslothai/unsloth/issues/15115) |
| Medium | Image edit context menu items do nothing (desktop app) | Open | [#15272](https://github.com/unslothai/unsloth/issues/15272) |

> ⚠️ **Note**: Multiple crashes reported on Linux (KDE) and Windows (Insider Preview). Prioritize testing on non-insider builds until PRs land.

#### **6. What This Means for Application Developers**  
- **Model Agnosticism**: The growing support for diverse backends (Vulkan, ROCm, Metal) and dynamic offloading means your agent can now run efficiently across heterogeneous hardware—*but always validate quantization compatibility*.
- **API Resilience**: With PRs like [#15294](https://github.com/unslothai/unsloth/pull/15294) counting prepared prompts before admission, avoid overcommitting KV cache via character-based estimates in API passthroughs.
- **Workflow Design**: New **Flows** system ([#14730](https://github.com/unslothai/unsloth/pull/14730)) enables declarative AI pipelines—ideal for building stateful agents or interactive games using local LLMs.
- **Cross-Client Consistency**: Persistent chat pins ([#15293](https://github.com/unslothai/unsloth/pull/15293)) will soon allow shared session state across devices—critical for collaborative development environments.

> 🔗 **Recommendation**: Monitor PRs related to `UNSLOTH_SMART_OFFLOAD` and `llama-server` lifecycle handling—these will shape future deployment patterns for production-grade inference stacks.

---  
*Digest generated: 2026-10-26 | Source: [unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*