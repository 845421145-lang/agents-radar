# AI Infrastructure Digest 2026-09-30

> Generated: 2026-09-30 01:29 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

---

### **Cross-Project AI Infrastructure Comparison Report – 2026-09-30**

---

#### **1. Ecosystem Overview**  
The AI inference and serving ecosystem in late 2026 is rapidly maturing into a layered, specialized landscape. Core inference engines like **vLLM** and **SGLang** are pushing the boundaries of throughput and low-latency for large-scale deployments, while **llama.cpp** maintains dominance in cross-platform, edge-optimized inference. **Ollama** continues to bridge developer experience with agent-native capabilities, and **LiteLLM** has solidified its role as the enterprise-grade gateway for multi-provider orchestration. Meanwhile, **Unsloth** emerges as a key enabler for fine-tuning and model export workflows, accelerating the cycle from training to deployment. The convergence of hybrid models (e.g., Mamba/GDN), advanced quantizations (NVFP4, MXFP4), and agent-specific features (tool calling, web search) reflects a shift toward production-ready, full-stack AI systems.

---

#### **2. Activity Comparison**  

| Project       | Issues Open | PRs Merged (Last 7d) | Release Status         |
|---------------|-------------|------------------------|------------------------|
| **vLLM**      | 187         | 52                     | Stable: v0.30.0        |
| **SGLang**    | 164         | 47                     | Stable: v0.5.20        |
| **llama.cpp** | 212         | 41                     | No new release (b11260+) |
| **Ollama**    | 221         | 38                     | RC: v0.35.1-rc0        |
| **LiteLLM**   | 142         | 35                     | v1.104.0-rc.2          |
| **Unsloth**   | 178         | 29                     | Beta: v0.1.806-beta    |

> ✅ *Insight*: **Ollama** leads in user-facing innovation (web search limit increase), while **vLLM** and **SGLang** dominate technical depth in kernel-level optimizations and stability fixes. **llama.cpp** shows high issue volume but slower PR velocity — indicative of broader platform complexity.

---

#### **3. Model Support Race**  

| New Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash**        | ✅ (FP8/MXFP4/DP8) | ✅ (NVFP4 logprob drift) | ❌ | ⚠️ | ❌ | ❌ |
| **Kimi K2.5 / K3**        | ✅ (RFC: KV cache) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **DeepSeek-V4.1-Flash**  | ✅ (H20 crash) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.6 / Qwen3.8**     | ✅ (tool_call leakage) | ✅ (gfx950 support) | ✅ (DFlash/MTP OOB) | ✅ (web search) | ✅ (gpt-5.6 reasoning bug) | ✅ (template fix) |
| **Hybrid Mamba/GDN**     | ✅ (KDA + PCP) | ✅ (FlyDSL + AITER) | ❌ | ❌ | ❌ | ✅ (multi-GPU) |
| **Vision Models (GGUF)** | ❌ | ❌ | ✅ (PNG/WebP) | ❌ | ❌ | ✅ (transparent image support) |
| **System One (decision-only)** | ❌ | ❌ | ❌ | ✅ (experimental) | ❌ | ❌ |

> 🏆 **Winner**: **vLLM** leads in cutting-edge model support for Flash and multimodal architectures, especially GLM-5.3 and hybrid models. **SGLang** excels in AMD ROCm integration and experimental GPU backends. **Unsloth** is uniquely positioned for vision + fine-tuning interoperability.

---

#### **4. Performance Frontier**  

| Optimization Focus       | vLLM                              | SGLang                          | llama.cpp                     | Ollama                         | LiteLLM                        | Unsloth                      |
|--------------------------|-----------------------------------|----------------------------------|-------------------------------|--------------------------------|--------------------------------|------------------------------|
| **KV Cache & Caching**   | ✅ Programmable policies, offload | ✅ `strip-thinking-cache` bugs   | ❌                             | ✅ VRAM-based context scaling  | ❌                             | ✅ Prefill progress monitor  |
| **Batching & Throughput**| ✅ MTP3, FlashKDA, MoE dispatch   | ✅ Speculative decoding reuse    | ❌ (Vulkan cliff at n=9)      | ✅ Adaptive token budgeting    | ✅ OTel span filtering         | ❌                           |
| **Quantization**         | ✅ NVFP4 per-token MoE, W4A16 fallback | ✅ TP4 all-reduce + FP8 on gfx950 | ✅ Q1/Q2 Bonsai, Hexagon GELU_ERF | ✅ MLX nvfp4 (stalls)           | ✅ Audio provider detection    | ✅ Packed INT4 (crashing)    |
| **Distributed Serving**  | ✅ High-concurrency speculative    | ❌                              | ❌                             | ❌                             | ✅ Enterprise identity federation | ❌                           |
| **Kernel-Level**         | ✅ CUDA graph, FlashInfer autotune | ✅ FlyDSL, fused gfx950 kernels  | ✅ Vulkan RDNA3/Intel tuning  | ❌                             | ✅ Auth pipeline batching      | ✅ Marlin_gemm fix (in progress) |

> 🔥 **Hot Spots**:  
> - **vLLM** and **SGLang** are optimizing for **speculative decoding**, **MoE dispatch**, and **hybrid model execution**.  
> - **llama.cpp** is focused on **Vulkan stability** and **CPU efficiency** (AVX512-FP16).  
> - **Unsloth** is driving **fine-tuning-to-deployment pipelines** with real-time monitoring and export tools.

---

#### **5. Layer Positioning**  

| Project       | Primary Layer                     | Key Differentiator |
|---------------|------------------------------------|--------------------|
| **vLLM**      | **Serving Engine (GPU-Optimized)** | Highest throughput, deep CUDA kernel control, programmable cache policies |
| **SGLang**    | **Serving Engine (Hybrid/Flexible)** | Strong AMD/ROCm focus, AITER kernel integration, simulator robustness |
| **llama.cpp** | **Local Runtime (Cross-Platform)** | Best-in-class CPU/Vulkan/GPU portability; ideal for edge, mobile, or air-gapped use |
| **Ollama**    | **Gateway + Developer UX**         | Agent-first design, web search, CLI model management, RAG integrations |
| **LiteLLM**   | **Enterprise Gateway / Orchestration** | Multi-provider routing, cost tracking, security hardening, Entra/ID federation |
| **Unsloth**   | **Fine-Tuning & Model Export**     | Seamless LoRA training, GGUF/vLLM/Ollama compatibility, template correctness |

> 🧩 **Strategic Insight**: The stack is clearly bifurcating:
> - **Frontend**: Ollama + LiteLLM (agent-friendly, secure, scalable)
> - **Middle Tier**: vLLM + SGLang (high-performance inference)
> - **Edge & Training**: llama.cpp + Unsloth (portability, fine-tuning)

---

#### **6. Trend Signals**  

1. **Agent-Centric Engineering is Now Standard**  
   → All major projects now prioritize tool calling (`tool_choice`, `strict=True`), reasoning tracking (`reasoning_effort`), and web search (Ollama’s 10-search cap). Developers must validate agent logic rigorously—silent failures (e.g., Qwen3 tool-call leaks) are common.

2. **Hardware Specialization is Accelerating**  
   → AMD ROCm (gfx950) and Intel XPU are no longer niche. Projects like **SGLang** and **Unsloth** are actively enabling them. NVIDIA remains dominant, but H20/B200 instability signals risk in high-concurrency setups.

3. **Quantization is Evolving Beyond Basics**  
   → Per-token NVFP4, DP8/TP4, and packed INT4 are now core concerns. Crashes due to improper kernel handling (e.g., Unsloth’s `marlin_gemm`) show that quantization isn’t just about size—it’s about correctness under load.

4. **Observability & Security Are Non-Negotiable**  
   → LiteLLM’s signed Docker images, vLLM’s `/weight_checker`, and Ollama’s `x-litellm-call-id` highlight a shift toward auditability. Cost tracking, session tokens, and concurrency limits are now first-class concerns.

5. **Fine-Tuning ↔ Deployment Pipeline Is Critical**  
   → Unsloth’s Modelfile generation and template fixes reflect a growing demand for seamless export. Teams building agents must plan for end-to-end reproducibility—from training to Ollama/LLM serving.

> ✅ **Action for Developers**:  
> - Prioritize **stability over novelty** when selecting inference stacks.  
> - Use **vLLM/SGLang** for scale, **llama.cpp** for edge, **Ollama/LiteLLM** for agent gateways.  
> - Always test **tool calling, long contexts, and quantized models** under production-like loads.  
> - Monitor **PRs and issues**—especially those labeled “High” or “Critical”—before deploying.

---  
*Report generated: 2026-09-30 | Data source: GitHub project digests*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

---

### **vLLM Digest — 2026-09-30**

---

#### **1. Today's Highlights**  
The vLLM project continues to advance its support for multimodal and hybrid architectures, with critical work on **ViT CUDA graph optimization**, **GLM-5.3 Flash performance tuning**, and **speculative decoding stability under high concurrency**. Key PRs include fixes for `tool_call` leakage in Qwen3.6, robustness improvements for prefix caching with LoRA, and enhanced observability for RL weight updates. A major RFC on **programmable KV cache policies** signals a shift toward composable, agent-friendly serving infrastructure.

---

#### **2. Releases & Breaking Changes**  
*None reported in the last 24 hours.*  
No new releases or breaking API/config changes were published. The latest stable version remains `v0.30.0`, though several issues (e.g., #59115) indicate ongoing instability in long-context scenarios despite this release.

---

#### **3. New Model & Hardware Support**  
- **Model Support**:  
  - **GLM-5.3-Flash** (FP8, MXFP4, DP8/TP4): Active optimization efforts (#57406, #54059), including addressing illegal memory access during autotune (#58864).  
  - **Kimi K2.5 / Kimi K3**: RFCs for programmable KV cache (#57103) and hardening of `/v1/messages` endpoint (#58647) to support Claude Code-style agents.  
  - **DeepSeek-V4.1-Flash**: Issue #56389 reports illegal memory access on H20 GPUs under high concurrency when `max_num_seqs > 256`.  
  - **Whisper**: Ongoing tracking issue #25750 for multi-language and streaming support.

- **Hardware & Backend**:  
  - **ROCm / AMD**: Performance optimization tracker for `gfx950` / MI355X on Qwen3.8-2.4T-A95B (#57149).  
  - **Intel XPU**: Persistent memory bloat issue reported (#50269) — model loading fails to reduce host memory usage.  
  - **NVIDIA B200 / GB300 / H200**: Multiple crash reports (#59115, #58864) related to FlashInfer autotune and MoE routing kernels.

- **Quantization**:  
  - NVFP4: Per-token MoE support added via CuTe-DSL backend (#50030).  
  - W4A16: Still used as fallback for non-gated models when online per-token NVFP4 is unavailable.

---

#### **4. Performance & Optimization**  
- **Kernel-Level**:  
  - **FlashKDA + Hybrid PCP**: PR #59304 adds KCP (two-pass parallel scan) for GLM-5.3’s KDA layers, enabling efficient prefill context parallelism on hybrid Mamba/GDN models.  
  - **MoE Dispatch Layout**: PR #59337 enables dynamic dispatch layout selection per forward in DeepEP v2, avoiding suboptimal allocations under CUDA graphs.  

- **Memory & Caching**:  
  - **KV Offload**: PR #59329 improves P2P offload reliability by dropping timed-out blocks from parked supply, preventing resource leaks.  
  - **Prefix Caching**: PRs #51899 and #59335 address hash collisions by tagging extra keys and including LoRA paths in block hashes — crucial for correctness in multi-adapter environments.  

- **Throughput**:  
  - **Speculative Decoding**: Fixes underway for silent corruption in `prompt_logprobs` under MTP (#53488), which affects accuracy in cost-sensitive inference pipelines.

---

#### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix PR? |
|---------|-------|-------------|--------|
| 🔴 High | [#59115](https://github.com/vllm-project/vllm/issues/59115) | GLM-5.3-Flash crashes with CUDA illegal memory access during long-context chunked prefill (4x B200, MTP enabled) | ❌ No fix yet |
| 🔴 High | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash long-decode degeneration after accumulated reasoning decode (W4A16 quantized) | ❌ No fix yet |
| 🟡 Medium | [#56389](https://github.com/vllm-project/vllm/issues/56389) | DeepSeek-V4.1-Flash triggers illegal memory access on H20 at high concurrency (`max_num_seqs > 256`) | ✅ Mitigated by lowering `max_num_seqs` |
| 🟡 Medium | [#58864](https://github.com/vllm-project/vllm/issues/58864) | GLM-5.3-MXFP4 DP8 without EP crashes during FlashInfer autotune | ❌ No fix yet |
| 🟡 Medium | [#54808](https://github.com/vllm-project/vllm/issues/54808) | `tool_choice="required"` ignored in Qwen3_coder parser; silent failure | ❌ No fix yet |

---

#### **6. What This Means for Application Developers**  
- **Agents & Tool Calling**: Be cautious with `tool_choice="required"` on Qwen3.6/Qwen3.5 and Kimi K2.5 — current behavior may silently ignore requirements. Use `strict=True` as workaround until fixes land.  
- **Hybrid Models**: Prefix caching + MTP3 has known bugs (e.g., tool-call leakage in #47194); avoid combining these features until confirmed stable.  
- **High-Concurrency Deployments**: Reduce `max_num_seqs` below 256 when using DeepSeek-V4.1-Flash on H20 GPUs to prevent crashes.  
- **LoRA & Multimodal Serving**: Ensure you're using up-to-date vLLM versions — recent PRs (#51899, #59335) fix critical hash collisions that could cause incorrect cache hits.  
- **Observability**: Leverage new metrics endpoints like `/weight_checker` (#51350) and enhanced `finish_reason` reporting (#59324) to debug agent logic and response fidelity.  

> 🔗 **Recommended Reading**:  
> - [RFC: Programmable KV Cache](https://github.com/vllm-project/vllm/issues/57103)  
> - [PR: Fix tool_call leakage in Qwen3.6](https://github.com/vllm-project/vllm/pull/51899)  
> - [Issue: GLM-5.3 Flash stability on B200](https://github.com/vllm-project/vllm/issues/59115)

---  
*Generated: 2026-09-30 | Source: [vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-30**

---

### **1. Today's Highlights**  
The SGLang ecosystem continues to mature with active integration of AITER’s advanced kernels, particularly for AMD ROCm and hybrid Mamba/GDN models. Critical stability fixes are underway for high-severity issues affecting logprob drift (GLM-5.3-Flash-NVFP4), KV cache corruption under `--strip-thinking-cache`, and a SIGQUIT crash in worker processes. Meanwhile, new PRs accelerate support for Qwen3-Next on gfx950 and introduce configurable video encoding presets.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- ✅ **AMD ROCm (gfx950/gfx942)**:  
  - [PR #39595](https://github.com/sgl-project/sglang/pull/39595): Adds FlyDSL GDN prefill backend for AMD — critical for Qwen3.5-397B performance on Mi300.  
  - [PR #39554](https://github.com/sgl-project/sglang/pull/39554): Routes GDN decode to AITER’s fused gfx950 kernel (pending upstream merge).  
  - [PR #41475](https://github.com/sgl-project/sglang/pull/41475): Adds nightly GSM8K accuracy gate for GLM-5.3-Flash on MI30x.  
- ✅ **Moore Threads (MUSA)**:  
  - [Issue #16565](https://github.com/sgl-project/sglang/issues/16565) remains open as a roadmap item for first-class MUSA GPU support.  
- ✅ **Quantization**:  
  - [PR #39140](https://github.com/sgl-project/sglang/pull/39140): Fused TP4 all-reduce + Gemma RMSNorm + per-group FP8 quant on gfx950.  
  - [PR #41794](https://github.com/sgl-project/sglang/pull/41794): Optimized weight layout for Quark MXFP4 decoding on ROCm.  

---

### **4. Performance & Optimization**  
- **Hybrid Mamba/GDN Models**:  
  - [PR #41654](https://github.com/sgl-project/sglang/pull/41654): Fixes crash in simulator when using `--max-total-tokens` on hybrid models (critical for long-context workloads).  
- **Speculative Decoding**:  
  - [PR #38213](https://github.com/sgl-project/sglang/pull/38213): Reduces repeated attention setup during speculative decoding by reusing metadata — improves throughput on GLM-5.3-Flash.  
- **Memory & Kernel Efficiency**:  
  - [PR #38431](https://github.com/sgl-project/sglang/pull/38431): Reuses host lengths to avoid KDA prefill synchronization — reduces CPU-GPU sync overhead.  
  - [PR #33805](https://github.com/sgl-project/sglang/pull/33805): Prevents early termination of single-request generation on hybrid-SWA models during DFLASH/DSPARK decoding.  
- **Video Generation**:  
  - [PR #41797](https://github.com/sgl-project/sglang/pull/41797): Enables libx264 preset selection (e.g., "ultrafast") via request config — crucial for latency-sensitive video pipelines.  

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| 🔴 High | [#41609](https://github.com/sgl-project/sglang/issues/41609) | Bit-identical logprobs drift in `GLM-5.3-Flash-NVFP4` after `2026-09-18` — likely due to KDA fusion gate (`#39688`) | Open — regression confirmed across multiple nights |
| 🔴 High | [#41617](https://github.com/sgl-project/sglang/issues/41617) | Double free in `release_kv_cache` when using `--strip-thinking-cache` + retraction | Open — memory safety risk |
| 🔴 High | [#41539](https://github.com/sgl-project/sglang/issues/41539) | Worker sends SIGQUIT to PID 1 if launcher dies during startup — causes process tree failure | Open — critical for production reliability |
| 🟡 Medium | [#41494](https://github.com/sgl-project/sglang/issues/41494) | DSA k-pool indexer corrupts long-context NIAH needle digits (16K) in GLM-5.3-Flash | Open — correctness issue in sparse attention |
| 🟡 Medium | [#39054](https://github.com/sgl-project/sglang/issues/39054) | `is_musa()` graph-breaks TorchDynamo on traced prefill path — kills CUDA graph capture | Open — affects performance in compiled paths |

---

### **6. What This Means for Application Developers**  
- **Use caution with `--strip-thinking-cache` and retraction**: These features may trigger double-free crashes until fixed — avoid in production until resolved.  
- **Expect improved performance on AMD** with Qwen3-Next and GLM-5.3-Flash — but validate accuracy via nightly gates (`nightly-amd-accuracy-8-gpu-glm53-flash`).  
- **Tune video output quality and speed** using the new `libx264` preset control ([PR #41797](https://github.com/sgl-project/sglang/pull/41797)).  
- **Monitor for regressions in logprobs** when upgrading beyond `v0.5.20` — especially with `GLM-5.3-Flash-NVFP4`.  
- **For hybrid Mamba/GDN models**, ensure you’re not hitting the `--max-total-tokens` crash in simulation mode; test with smaller contexts until fix lands.  

> ✅ *Pro Tip*: Use `/get_server_info` to monitor effective concurrency limits — [PR #38846](https://github.com/sgl-project/sglang/pull/38846) will expose the real cap after mamba state-cache limits are applied.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-30**

---

### **1. Today's Highlights**  
The latest development cycle centers on Vulkan backend stability and performance tuning for AMD RDNA3 and Intel GPUs, with critical fixes for MoE dispatch logic and memory access patterns. New support for FP32 GELU_ERF/GEGLU_ERF on Hexagon and a hardened CI pipeline for model backend validation signal growing maturity in cross-platform inference capabilities.

---

### **2. Releases & Breaking Changes**  
No new release versions were published today. However, the following changes impact build behavior:  
- **CI Pipeline Update**: Added `zdnn` backend build (not tested) and switched to `bash` shell in CI workflows ([#29541](https://github.com/ggml-org/llama.cpp/pull/29541)).  
- **API Stability Fix**: `ggml` now enforces input tensors must be `GGML_OP_NONE` to prevent undefined behavior ([#29647](https://github.com/ggml-org/llama.cpp/pull/29647)).  
- **C++ ODR Compliance**: Fixed C++ One Definition Rule violations via proper use of `GGML_COMMON_DECL_CPP` ([#29504](https://github.com/ggml-org/llama.cpp/pull/29504)).

> 🔗 *Note: These are non-breaking but recommended for downstream tooling integration.*

---

### **3. New Model & Hardware Support**  
- **Hexagon Backend**: Added full FP32 support for `GELU_ERF` and `GEGLU_ERF` kernels, enabling accurate execution on Qualcomm Snapdragon 7 Gen 4 and newer SoCs ([#29631](https://github.com/ggml-org/llama.cpp/pull/29631)).  
- **Vulkan Backend**: Introduced opt-in compatibility guard for Adreno 750 to avoid shader compiler segfaults ([#29165](https://github.com/ggml-org/llama.cpp/pull/29165)).  
- **Model Architecture**: Added support for `GraniteSpeech5ForCTC` (Turbo CTC), an encoder-only, non-autoregressive model for speech-to-text tasks ([#29446](https://github.com/ggml-org/llama.cpp/pull/29446)).  
- **Quantization**: Initial Q1/Q2 quantization support added for Bonsai 8B, with shape correctness fixes ([#29185](https://github.com/ggml-org/llama.cpp/pull/29185)).

---

### **4. Performance & Optimization**  
- **Vulkan (Intel)**: Tuned GDN kernel and adjusted F32 A-matrix loading to improve throughput on Intel iGPUs by avoiding inefficient per-element loads ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476)).  
- **Vulkan (AMD RDNA3)**: Retained 4-row MMVQ workgroup policy only at 8 columns; fallback to default row count for 5–7 column cases to avoid driver instability ([#29679](https://github.com/ggml-org/llama.cpp/pull/29679)).  
- **MoE Dispatch**: Improved tile selection logic in `mut_mul_id` to correctly handle per-expert row counts (e.g., 6 vs 128 on Sarvam 30B), preventing suboptimal l-tile usage ([#29182](https://github.com/ggml-org/llama.cpp/pull/29182)).  
- **CPU (AVX512-FP16)**: Accumulating f16 dot products in f32 improves precision and may boost effective throughput in mixed-precision scenarios ([#29545](https://github.com/ggml-org/llama.cpp/pull/29545)).

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:  
- **Vulkan Batched Decode Cliff**: Large throughput drop at `n_tokens=9` due to incorrect threshold handling in MoE dispatch — affects many-expert models like Qwen3-Coder-Next 30B-A3B ([#25356](https://github.com/ggml-org/llama.cpp/issues/25356), **10 comments**).  
- **Qwen3.8 DFlash/MTP OOB Token Crash**: Invalid token ID (`248320`) equals vocab size — likely due to buffer overrun in speculative decoding on Vulkan ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158), **9 comments**).  
- **Long-Running Degradation**: A770 Vulkan backend produces empty EOS replies after ~7–8 hours of continuous decode — suspected fence or state corruption issue ([#29526](https://github.com/ggml-org/llama.cpp/issues/29526), **5 comments**).  
- **Hexagon HMX MUL_MAT Inf Bug**: Returns infinity for `n >= 5` on Snapdragon 7 Gen 4 — blocks model evaluation ([#29473](https://github.com/ggml-org/llama.cpp/issues/29473), **6 comments**).

> ✅ **Fix PRs Pending**: No public fix PRs yet for these regressions. Prioritize testing with `b11260+` builds.

---

### **6. What This Means for Application Developers**  
- **Use `--cache-ram -1` with caution**: It does not disable limits — RAM grows ~640 MiB per short prompt; consider explicit caps ([#29324](https://github.com/ggml-org/llama.cpp/issues/29324)).  
- **Avoid long-running servers on Vulkan (A770/Intel)**: Monitor for empty EOS output after 7–8 hours; implement restart policies.  
- **Enable Metal/MoE fusion optimizations**: On Apple Silicon, ensure you’re using `b11267+` to benefit from fused MoE routing and SSM_CONV paths ([#28948](https://github.com/ggml-org/llama.cpp/pull/28948)).  
- **Validate speculative decoding configs**: Test against `Qwen3.8-Flash-Next` + MTP/DFlash — known OOB crashes on Vulkan require careful parameter tuning.  
- **Leverage new RERANK endpoint**: For multimodal reranking (e.g., Qwen3-VL), use `--rerank` with typed content input via recent PR ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625)).

> 📌 **Pro Tip**: Use `--no-kv-offload` cautiously on Vulkan — it can trigger early EOS generation in some models ([#24519](https://github.com/ggml-org/llama.cpp/issues/24519)).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-30**

---

### **1. Today's Highlights**  
The latest release candidate **v0.35.1-rc0** introduces support for up to **10 web searches per response**, significantly enhancing agent capabilities. Key backend improvements include updated **llama.cpp (b11232)** and **MLX** versions, alongside foundational work on **System One model support** and improved tool-call parsing robustness.

---

### **2. Releases & Breaking Changes**  
- **v0.35.1-rc0** released with:  
  - ✅ Increased web search limit from 1 to **10 per response** ([#18602](https://github.com/ollama/ollama/pull/18602))  
  - 🔧 `llama.cpp` bumped to **b11232** ([#18652](https://github.com/ollama/ollama/pull/18652))  
  - 🔧 MLX version updated ([#18651](https://github.com/ollama/ollama/pull/18651))  
- ⚠️ **v0.35.0 marked as pre-release without `-rc` suffix** — raised in [#18706](https://github.com/ollama/ollama/issues/18706); potential confusion for users.

---

### **3. New Model & Hardware Support**  
- 🎯 **System One Models**: Experimental support added via `mlx` backend ([#18701](https://github.com/ollama/ollama/pull/18701)) and CLI (`create` command) via capability declarations ([#18708](https://github.com/ollama/ollama/pull/18708)). Includes decision-only models like Kev and Laya ([#18594](https://github.com/ollama/ollama/issues/18594)).  
- 📦 **GraniteForCausalLM**: Added experimental support in MLX backend for IBM’s Granite 4.1/4.2 series ([#17972](https://github.com/ollama/ollama/pull/17972)).  
- 📁 **dir2mcp**: Integrated into Community Tools under RAG & Knowledge Bases ([#18705](https://github.com/ollama/ollama/pull/18705)).

---

### **4. Performance & Optimization**  
- 📈 **VRAM-based context length**: Default context window now dynamically scales based on available VRAM (4k/32k/256k), improving efficiency on high-memory systems ([#18710](https://github.com/ollama/ollama/pull/18710)).  
- ⚙️ **Adaptive token budgeting**: Proposal to bound thinking phases per request/model to prevent infinite loops ([#17566](https://github.com/ollama/ollama/pull/17566)).  
- 🔄 **Model reloading logic**: Fix for cases where two model tags share a blob but require different runner flags ([#18289](https://github.com/ollama/ollama/pull/18289)).

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Link |
|--------|------|-------------|------|
| Critical | **Cloud billing loop** | Users blocked by Stripe retry loop; no way to downgrade or cancel subscription | [#18683](https://github.com/ollama/ollama/issues/18683) |
| High | **MLX nvfp4 stalls under load** | Requests hang indefinitely after `processed=total-1`, only recoverable via SIGTERM | [#18505](https://github.com/ollama/ollama/issues/18505) |
| High | **Windows tray app fails to start server** | Tray icon appears but server doesn’t launch; manual `ollama serve` works | [#18507](https://github.com/ollama/ollama/issues/18507) |
| High | **llama-server wedges on cache-hit tasks** | All subsequent requests to same model hang until unload | [#18685](https://github.com/ollama/ollama/issues/18685) |
| Medium | **Chat history column not resizable on macOS** | UI issue in desktop app prevents sidebar resizing | [#18709](https://github.com/ollama/ollama/issues/18709) |

> ✅ *Fix PRs exist for some issues*:  
> - Tool-call parser fixes: [#18624](https://github.com/ollama/ollama/pull/18624), [#17565](https://github.com/ollama/ollama/pull/17565), [#17564](https://github.com/ollama/ollama/pull/17564)  
> - Thinking tag handling: [#18288](https://github.com/ollama/ollama/pull/18288)

---

### **6. What This Means for Application Developers**  
- ✅ **Agents can now make up to 10 web searches per turn** — ideal for research-heavy workflows using tools like `qwen3coder`.  
- 🔒 **System One models are entering early support**: Use `CAPABILITY="decision"` in Modelfiles to route yes/no/scoring queries efficiently. Expect breaking changes during RC phase.  
- 🛠 **Tool-call reliability is improving**: Fixes to parser edge cases (e.g., missing braces, premature tag closes) reduce false errors in agents.  
- ⚠️ **Avoid `glm-5.3:cloud` for long-running code tasks** — known to enter endless reasoning loops ([#18193](https://github.com/ollama/ollama/issues/18193)).  
- 💾 **Export/import models via CLI** now supported ([#18578](https://github.com/ollama/ollama/pull/18578)) — critical for offline/air-gapped deployment.  

> 📌 **Action item**: Test your agents with `v0.35.1-rc0` and monitor for hangs in `mlx` or `cuda` backends under sustained load.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-09-30**

---

#### **1. Today's Highlights**  
LiteLLM continues rapid iteration with a focus on security hardening, stability in streaming and cost tracking, and deeper integration with enterprise identity systems. Key developments include improved session token handling, fixes for critical `reasoning_effort` and `tool_call` bugs affecting OpenAI gpt-5.6 models, and enhanced guardrail scanning across Azure and Responses APIs. The proxy now returns proper 400s for malformed requests—improving client error visibility.

---

#### **2. Releases & Breaking Changes**  
- **v1.104.0-rc.2**, **v1.103.1**, **v1.102.2**, **v1.101.3**, **v1.100.4**: All releases include security enhancements via signed Docker images using [cosign](https://docs.sigstore.dev/cosign/overview/) (key from commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)).  
- **New PRs**:  
  - [#43790](https://github.com/BerriAI/litellm/pull/43790): Fixes UI/CLI session tokens to avoid `sk-` prefix collisions and Basic Auth/WebSocket issues by using AES-GCM with header-safe encoding.  
  - [#43787](https://github.com/BerriAI/litellm/pull/43787): Returns `400 Bad Request` instead of `500 Internal Server Error` for missing params or invalid pagination (e.g., `page=0`), improving client diagnostics.

---

#### **3. New Model & Hardware Support**  
- **Anthropic Workload Identity Federation**: Feature request [#28607](https://github.com/BerriAI/litellm/issues/28607) tracks support for OIDC JWT-bearer token exchange via Anthropic’s workload identity federation — critical for secure, federated access in cloud-native environments.  
- **Bedrock Converse Routing**: PR [#43778](https://github.com/BerriAI/litellm/pull/43778) adds beta headers for output config in messages, enabling better control over Bedrock’s Converse API behavior.  
- **Audio Providers**: PR [#43784](https://github.com/BerriAI/litellm/pull/43784) refines audio provider detection by deriving supported endpoints from `supported_endpoints`, preventing accidental routing to non-audio-capable providers.

---

#### **4. Performance & Optimization**  
- **Auth Pipeline Optimization**: PR [#43776](https://github.com/BerriAI/litellm/pull/43776) reduces auth refresh latency by batching Redis calls through the pipeline — cutting per-key refresh overhead from 16 serial trips to one atomic operation.  
- **OTel Span Filtering**: PR [#43278](https://github.com/BerriAI/litellm/pull/43278) introduces `excluded_services` opt-out for datastore spans (Redis/Postgres), reducing telemetry noise and ingest costs for tenant-level observability.  
- **Batch Line Item Storage**: PR [#41691](https://github.com/BerriAI/litellm/pull/41691) enables optional storage of individual JSONL batch line items in callbacks, preserving granular cost data even after provider file expiration.

---

#### **5. Stability & Regressions**  
- **Critical Bug**: [#33221](https://github.com/BerriAI/litellm/issues/33221) – Function tools fail with `reasoning_effort` error on OpenAI gpt-5.6 family models (`gpt-5.6-sol`, `gpt-5.6-luna`, etc.) due to incorrect reasoning effort handling. *Fix pending.*  
- **Streaming Crash**: [#43487](https://github.com/BerriAI/litellm/issues/43487) – Partial generic streaming chunks without required fields (`text`, `is_finished`) trigger `KeyError`. *Fix PR: #43783* (in progress).  
- **Cost Tracking Failure**: [#40728](https://github.com/BerriAI/litellm/issues/40728) – Azure AI model router lacks cost tracking despite correct configuration. *No fix yet.*  
- **Cache Corruption Under Concurrency**: [#43491](https://github.com/BerriAI/litellm/issues/43491) – User/team spend caches lose concurrent increments; leads to underreported usage. *Fix PR: #43783* (in progress).  
- **Silent Document Block Loss**: [#43737](https://github.com/BerriAI/litellm/issues/43737) – Anthropic `document` content blocks are dropped when routing to AWS Bedrock Converse. *High severity, no fix yet.*

---

#### **6. What This Means for Application Developers**  
- **Security & Compliance**: Enforce strict access policies — empty `models` list grants all access, while empty `mcp_servers` list grants none. Audit your virtual keys immediately ([#21540](https://github.com/BerriAI/litellm/issues/21540)).  
- **Stream Reliability**: Avoid `gpt-5.6` models with function tools until [#33221](https://github.com/BerriAI/litellm/issues/33221) is resolved. Use `reasoning_effort=baseline` as workaround.  
- **Cost Visibility**: Ensure `include_cost_in_streaming_usage` is enabled if you need real-time cost feedback in streams ([#31840](https://github.com/BerriAI/litellm/issues/31840)).  
- **Enterprise Integration**: Leverage new Entra identity support ([#43722](https://github.com/BerriAI/litellm/pull/43722)) and managed agent permissions ([#43721](https://github.com/BerriAI/litellm/pull/43721)) for secure, auditable agent workflows.  
- **Observability**: Upgrade to v1.104+ to benefit from better error codes, reduced telemetry noise, and improved log correlation via `x-litellm-call-id` ([#42436](https://github.com/BerriAI/litellm/pull/42436)).

> 🔗 Full context: [GitHub Repo](https://github.com/BerriAI/litellm) | [Issue Tracker](https://github.com/BerriAI/litellm/issues) | [PRs](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-09-30**

---

### **1. Today's Highlights**  
The Unsloth ecosystem continues to expand its vision and inference capabilities, with critical UI/UX refinements and foundational improvements in model serving and fine-tuning workflows. Key developments include enhanced support for GGUF vision models (PR #12310), fixes for prefill progress monitoring (PR #11161), and ongoing work to stabilize packed INT4 inference on vLLM 0.29 (PR #12320). Multiple PRs address long-standing user pain points around multi-GPU coordination, memory management, and model compatibility.

---

### **2. Releases & Breaking Changes**  
*No new releases were published in the last 24 hours.*  
However, several high-impact changes are pending merge:
- **PR #12314**: Fixes incorrect ShareGPT template mapping for Llama 3.1, Qwen, and Gemma — this affects chat formatting during inference and fine-tuning.
  - 🔗 [GitHub PR #12314](https://github.com/unslothai/unsloth/pull/12314)
- **PR #12311**: Adds Ollama Modelfile generation for trained models — essential for `ollama create` interoperability.
  - 🔗 [GitHub PR #12311](https://github.com/unslothai/unsloth/pull/12311)

> ⚠️ **Migration Note**: Users upgrading from `v0.1.806-beta` or earlier should verify their chat templates and fine-tuned model exports post-merge.

---

### **3. New Model & Hardware Support**  
- ✅ **GGUF Vision Models**: Improved handling of transparent images (e.g., PNG/WebP/GIF) in vision models via PR #12310, ensuring dark text is visible against transparent backgrounds.
  - 🔗 [GitHub PR #12310](https://github.com/unslothai/unsloth/pull/12310)
- 🔄 **Multi-GPU & Mixed-Vendor Support**: Continued focus on AMD/NVIDIA coexistence:
  - PR #12248 enables concurrent use of NVIDIA (for inference) and AMD (for training).
  - PR #12247 and #12246 fix misleading backend reporting when switching between CUDA and ROCm.
  - 🔗 [GitHub PR #12248](https://github.com/unslothai/unsloth/pull/12248) | [PR #12247](https://github.com/unslothai/unsloth/pull/12247) | [PR #12246](https://github.com/unslothai/unsloth/pull/12246)
- 📦 **Custom mmproj Support**: PR #10296 lifts restrictions on custom `mmproj` files, allowing community finetunes to reuse compatible vision towers.
  - 🔗 [GitHub PR #10296](https://github.com/unslothai/unsloth/pull/10296)

---

### **4. Performance & Optimization**  
- 🔧 **Packed INT4 Inference on vLLM 0.29**: A critical fix underway in PR #12320 aims to resolve crashes caused by improper `marlin_gemm` call construction when using compressed-tensors checkpoints.
  - 🔗 [GitHub PR #12320](https://github.com/unslothai/unsloth/pull/12320)
- 📈 **Prefill Progress Visibility**: PR #11161 exposes live prefill counters via API monitor, enabling clients to track long prompt processing (especially relevant for 64k+ context models like Qwen3.8).
  - 🔗 [GitHub PR #11161](https://github.com/unslothai/unsloth/pull/11161)
- 💡 **LoRA Training Stability**: PR #12319 ensures frozen BatchNorm running stats are preserved during LoRA training, preventing drift in downstream performance.
  - 🔗 [GitHub PR #12319](https://github.com/unslothai/unsloth/pull/12319)
- ⚙️ **FP8 & Block Size Handling**: PR #12317 ensures `block_size` is properly honored in patched FP8 forward passes, crucial for 32x32 block checkpoints.
  - 🔗 [GitHub PR #12317](https://github.com/unslothai/unsloth/pull/12317)

---

### **5. Stability & Regressions**  
Top-reported issues today reflect persistent challenges in memory management and edge-case robustness:

| Severity | Issue | Description | Status |
|--------|------|------------|--------|
| High | #11792 | Cannot run Qwen Image 2.1 Q4_K_M on M5 Max (48GB RAM) due to "insufficient memory" error | Open |
| High | #4073 | `FastLanguageModel.from_pretrained()` crashes during state dict extraction when `fast_inference=True` on LFM2.5 | Open |
| Medium | #11435 | Gemma 4 26B A4B QAT uses >15GB RAM on 16GB system despite small file size (~14GB) | Open |
| Medium | #11637 | Studio shows duplicate download: 4.2GB + 19GB “Required assets” for same model | Open |
| Low | #12260 | `Error loading java.security file` when building Gradle projects post-update | Open |

> ✅ **Fixes in Progress**:  
> - PR #12294 addresses Java sandbox initialization failure (#12260).  
> - PR #12320 targets the core crash in packed INT4 inference (#4073).

---

### **6. What This Means for Application Developers**  
- **Build Reliable Agents**: Use PR #12311 to generate Ollama-compatible Modelfiles for trained models — critical if you're deploying via `ollama`.
- **Handle Long Contexts Gracefully**: Leverage PR #11161’s prefill monitoring to provide real-time feedback in client apps during prompt processing (e.g., web dashboards).
- **Avoid Memory Pitfalls**: Be cautious with Q4_K_M and A4B quantizations on low-RAM systems (e.g., M5 Max, 16GB machines). Monitor actual usage via `top` or `nvidia-smi`.
- **Design for Multi-GPU Workflows**: If targeting mixed GPU setups (NVIDIA + AMD), rely on the latest builds to ensure correct backend assignment and avoid silent fallbacks.
- **Prepare for Template Consistency**: Apply PR #12314 early in your pipeline to prevent misaligned role headers in Llama 3.1/Qwen/Gemma conversations.

> 🛠️ **Actionable Tip**: For production agents, consider pinning to stable versions until PRs #12320 and #12314 are merged into a release. Monitor the [Unsloth GitHub Issues](https://github.com/unslothai/unsloth/issues) for updates on stability fixes.

---  
*Digest generated: 2026-09-30 | Source: [unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*