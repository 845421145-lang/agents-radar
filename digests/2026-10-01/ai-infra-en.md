# AI Infrastructure Digest 2026-10-01

> Generated: 2026-10-01 01:27 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-01**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in October 2026 is characterized by intense specialization, rapid hardware enablement, and growing maturity in distributed serving and model orchestration. Projects are converging on high-performance, low-latency inference across diverse backends—especially NVIDIA Blackwell (SM120), AMD ROCm 10.0, and Apple MLX—while also addressing critical stability issues in speculative decoding, memory safety, and security. The rise of agent-centric workflows is driving demand for structured output fidelity, tool-call reliability, and cost-aware proxy systems. As models grow larger and more complex (e.g., Qwen3.8-Flash-Next, Gluon MegaMoE), the ecosystem is shifting from monolithic deployment to modular, composable stacks with clear layer separation.

---

### **2. Activity Comparison**

| Project       | Issues Open (↑) | PRs Merged (↑) | Releases (Latest) | Notes |
|---------------|------------------|------------------|--------------------|-------|
| **vLLM**      | 124 (+3)         | 47 (+5)          | None               | Focus on SM120/ROCm stability; performance gains in DFlash graph capture |
| **SGLang**    | 159 (+5)         | 42 (+6)          | None               | Heavy focus on HiSparse/HiCache; weight cache daemon rollout |
| **llama.cpp** | 221 (+8)         | 36 (+4)          | None               | High volume of backend-specific fixes (Metal/Vulkan/OCL) |
| **Ollama**    | 183 (+7)         | 28 (+3)          | v0.35.0 (pre-release) | Stability concerns on CUDA/MLX; pre-release caution advised |
| **LiteLLM**   | 176 (+4)         | 39 (+5)          | v1.105.0-dev.1     | Security hardening via cosign signing; guardrail fixes |
| **Unsloth**   | 132 (+6)         | 24 (+3)          | None               | UI/UX and voice mode refactoring; latency regressions under scrutiny |

> ✅ *Trend: SGLang and vLLM lead in architectural innovation; llama.cpp and Unsloth dominate in low-level backend fixes.*

---

### **3. Model Support Race**

| New Model / Architecture        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**          | ✅ (SM120, GB10) | ✅ (HiSparse) | ✅ (MTP) | ⚠️ (FP8 non-determinism) | ❌ | ❌ |
| **DeepSeek-V4.1-Flash**         | ✅ (SM120) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Prism Bonsai 2 27B**           | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Gluon MegaMoE**                 | ❌ | ✅ (roadmap) | ❌ | ❌ | ❌ | ❌ |
| **Kimi-K3 MXFP4**                | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Bongard (T5Gemma2)**           | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **System One (MLX)**             | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

> 🏆 **Leader**: **SGLang** leads in advanced model support, particularly for long-context and ROCm-optimized models.  
> 🥈 **Runner-up**: **llama.cpp** has broadest low-level model coverage, including niche formats like Prism Bonsai 2 and Jinja-enabled LLM-jp-4.1.

---

### **4. Performance Frontier**

| Optimization Focus              | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **KV Cache & Memory Management** | ✅✅ | ✅✅ (HiCache) | ✅ | ✅ (proxy-aware blobs) | ✅ | ❌ |
| **Speculative Decoding**         | ✅✅ (DFlash graphs) | ✅ (MiMo + FA4) | ✅ (batch order fix) | ⚠️ (crashes) | ✅ | ❌ |
| **Kernel Fusion & Low-Level Tuning** | ✅ (fused Q kernel) | ✅ (MLA+RoPE+KV-write) | ✅ (FWHT, MMVF) | ❌ | ❌ | ❌ |
| **Batching & Parallelism**       | ✅ (dynamic prefill CP) | ✅ (context parallelism) | ✅ (whole-tile scheduling) | ⚠️ (thread quota thrashing) | ✅ | ❌ |
| **Quantization Efficiency**       | ✅ (FP8, NIXL coalescing) | ✅ (MXFP4, FP8 KDA) | ✅ (BF16/MXFP4) | ✅ (nvfp4 stall) | ✅ | ❌ |

> 🔥 **Frontier Leaders**:  
> - **vLLM**: Leading in GPU-level kernel optimization and speculative decoding scalability.  
> - **SGLang**: Pioneering hierarchical caching and efficient context parallelism for ultra-long sequences.  
> - **llama.cpp**: Dominating cross-platform kernel tuning and quantized execution efficiency.

---

### **5. Layer Positioning**

| Project       | Primary Layer                  | Secondary Role                     | Key Differentiator |
|---------------|-------------------------------|------------------------------------|--------------------|
| **vLLM**      | **Inference Engine**          | Serving gateway (via `serve`)      | Highest throughput on H100/Blackwell; optimized CUDA graphs |
| **SGLang**    | **Inference Engine + Gateway**| Distributed serving, agent orchestration | Hierarchical cache (HiCache), dynamic prefill CP |
| **llama.cpp** | **Local Runtime / Edge Inference** | CLI/toolchain for local deployment | Cross-backend portability (Metal/Vulkan/OpenCL); minimal dependencies |
| **Ollama**    | **Gateway / Local Runtime**   | Model hub + API abstraction        | Unified UX; MLX/Windows support; container-friendly |
| **LiteLLM**   | **LLM Gateway / Orchestration** | Cost tracking, fallback routing    | Multi-provider routing, audit logging, service tier enforcement |
| **Unsloth**   | **Agent Platform / Studio**   | Fine-tuning, voice/attachment handling | Native audio engine, document fidelity, multi-user state management |

> 📊 **Layer Stratification**:  
> - **Engine Layer**: vLLM, SGLang  
> - **Runtime Layer**: llama.cpp  
> - **Gateway/Orchestration Layer**: LiteLLM, Ollama  
> - **Application Platform Layer**: Unsloth  

---

### **6. Trend Signals**

#### **Emergent Trends from Today’s Digest**:
1. **Hardware-Specific Optimization is Now Mandatory**  
   - Projects are racing to support **SM120 (Blackwell)**, **ROCm 10.0**, and **Apple MLX** — each requiring unique kernel tuning, memory layout changes, and driver compatibility fixes.
   - Example: vLLM’s DFlash graph capture and SGLang’s HiCache are tailored for specific architectures.

2. **Speculative Decoding Is Maturing but Still Risky**  
   - While vLLM and SGLang have made breakthroughs in MTP and MiMo, **non-determinism (vLLM #54521)** and **crashes (SGLang #40094)** remain critical risks — especially at scale.
   - Developers must use `--enforce-eager` or avoid high-concurrency speculative paths until stability improves.

3. **Security and Supply Chain Integrity Are Prioritized**  
   - LiteLLM now uses **cosign-signed Docker images**, signaling a shift toward secure-by-default deployment pipelines.
   - Ollama’s RCE risk (#30165) and unsloth’s session sync bugs highlight that trust boundaries are expanding beyond models.

4. **Agent Workflows Demand Fidelity and Reliability**  
   - Silent text loss (SGLang), JSON schema corruption (Ollama), and duplicate `toolCallId` (Unsloth) indicate that **structured output correctness is a top concern**.
   - Tools like `vllm-bench`, `Mooncake trace replay`, and `LiteLLM spend logging` are becoming essential for validation.

5. **Performance Gaps Are Exposed by Complexity**  
   - Unsloth’s ~1.2s fixed latency on OpenAI-compatible API calls reveals that **abstraction layers can introduce hidden overhead** — even when using fast engines like `llama-server`.

---

### **Recommendations for Application Developers**
- **For Production Inference**: Use **vLLM** or **SGLang** for best performance on modern GPUs; avoid speculative decoding on Qwen3.8-Flash-Next until #54521 is resolved.
- **For Edge/Local Deployment**: Choose **llama.cpp** for maximum portability and control over quantization and kernels.
- **For Agent Systems**: Prioritize **LiteLLM** for cost-aware routing and **SGLang** for long-context reliability; validate structured outputs rigorously.
- **For Voice/Document Agents**: Explore **Unsloth’s audio.cpp** and **Ollama’s System One support**, but test for known regressions (e.g., image discard).
- **Always Verify**: Test end-to-end with your model/hardware stack — no project is immune to silent failures or performance regressions.

> ✅ **Final Note**: The infrastructure ecosystem is no longer just about speed — it's about **reliability, security, and correctness** at scale. Choose tools not just for benchmarks, but for real-world resilience.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-01

---

### **1. Today's Highlights**  
The vLLM project continues to prioritize stability and performance across diverse hardware, with critical fixes for speculative decoding correctness on Qwen3.8-Flash-Next and DeepSeek-V4.1-Flash on SM120 (Blackwell). A significant PR improves DFlash/DSpark CUDA graph capture by including context combine and anchor steps, enabling better throughput for high-concurrency inference. Meanwhile, the Rust frontend matures with benchmarking parity improvements and new features like Mooncake-style trace replay.

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new releases or breaking API/config changes observed. The `vllm-bench` client now warns when temperature is left at server default (`PR #59247`), but this does not constitute a breaking change.

---

### **3. New Model & Hardware Support**  
- **DeepSeek-V4.1-Flash**: Added support for SM120 (RTX PRO 6000 Blackwell) with ongoing efforts to fix low decode throughput (`Issue #56892`, `Issue #59203`).  
- **Qwen3.8-Flash-Next**: Full compatibility now tracked across GB10 (sm_121), with active work on deterministic greedy decoding (`Issue #54521`) and CPU offload deadlocks (`Issue #53960`).  
- **ROCm 10.0 (TheRock)**: Now set as default CI image; ROCm 7.2 preserved for backward compatibility (`PR #58761`).  
- **Intel GPU (Arc B70/B60)**: Continued focus on fixing crashes during MTP speculative decoding (`PR #56917`) and MoE selector issues (`Issue #43750`).  

> 🔗 [ROCm 10.0 Default Image](https://github.com/vllm-project/vllm/pull/58761) | [SM120 Support](https://github.com/vllm-project/vllm/issues/59203)

---

### **4. Performance & Optimization**  
- **DFlash/DSpark Graph Capture**: `PR #59511` captures context combine and anchor in draft CUDA graph, reducing unnecessary token budget reservations (`PR #59468`) and improving throughput for large-scale speculative decoding.  
- **GLM-5.3-Flash**: `PR #59084` fuses Q projection into `fused_q` kernel, yielding **1.27–1.64x speedup** per layer across 78 layers — ~78 fewer kernel launches per TP rank.  
- **ROCm Optimizations**:  
  - `PR #58381`: Reduces host dispatches in MLA metadata build by ~21x (microbenchmark).  
  - `PR #57978`: Parallelizes AITER MLA page-index expansion over token chunks — significant improvement in kernel-level latency.  
- **Weight Loading**: On GB10, `PR #58726` addresses slow H2D copies from mmap-backed safetensors, mitigating a key performance bottleneck.  
- **KV Connector (NIXL)**: `PR #54483` coalesces host-buffer KV copies across cache groups, improving I/O efficiency for remote and CPU-based KV buffers.

> 🔗 [Fused Q Kernel Perf](https://github.com/vllm-project/vllm/pull/59084) | [DFlash Graph Capture](https://github.com/vllm-project/vllm/pull/59511) | [ROCm Host Dispatch Fix](https://github.com/vllm-project/vllm/pull/58381)

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| Critical | [#54521](https://github.com/vllm-project/vllm/issues/54521) | Non-deterministic greedy decoding in Qwen3.8-Flash-Next FP8 when context nears `indexer_budget` | In progress |
| High | [#59203](https://github.com/vllm-project/vllm/issues/59203) | DeepSeek-V4.1-Flash crashes on SM120 due to missing sparse-MLA kernel for `page_block_size=32` | Active investigation |
| High | [#53960](https://github.com/vllm-project/vllm/issues/53960) | `VLLM_PLE_CPU_OFFLOAD=1` deadlocks on single-GPU GB10 setup during engine init | Reproducible, no fix yet |
| Medium | [#57562](https://github.com/vllm-project/vllm/issues/57562) | `AsyncScheduler` underflow in chunked prefill + concurrency (regression from 0.24.0) | Under review |
| Medium | [#57680](https://github.com/vllm-project/vllm/issues/57680) | Decode throughput drops ~3.3x from 0.26.0 to 0.29.0 on H100 | Regression confirmed, root cause unknown |

> 🔗 [Non-Deterministic Decoding](https://github.com/vllm-project/vllm/issues/54521) | [SM120 Kernel Crash](https://github.com/vllm-project/vllm/issues/59203) | [H100 Throughput Drop](https://github.com/vllm-project/vllm/issues/57680)

---

### **6. What This Means for Application Developers**  
- **Speculative Decoding Users**: Be cautious with `MTP` on Qwen3.8-Flash-Next and DeepSeek-V4.1-Flash—non-determinism and crashes may occur on long sequences or specific hardware (GB10/SM120). Use `--enforce-eager` as a workaround until fixes land.  
- **Rust Frontend Adopters**: Benchmarking parity with Python is improving (`vllm-bench` now matches `serve` latency), and Mooncake-style trace replay is available (`PR #55937`). Consider using it for reproducible load testing.  
- **High-Concurrency Systems**: Optimize for DFlash/DSpark via full CUDA graph capture (`PR #59511`) to avoid token budget oversubscription and improve scalability.  
- **Memory-Constrained Deployments**: Leverage `KV cache pruning` (tracked in `#44300`) and NIXL coalescing (`#54483`) to reduce GPU memory pressure and improve throughput.  
- **Model Selection**: For best performance on AMD GPUs, use optimized builds of Qwen3.8-2.4T-A95B (`#57149`) and monitor ROCm-specific regressions (`#56506`).  

> ✅ **Actionable Tip**: If using `Qwen3.8-Flash-Next` with `FP8` quantization, avoid prompt lengths near `indexer_budget` until `#54521` is resolved. Monitor `vLLM_USE_RUST_FRONTEND=1` for production-grade inference stability.  

---  
*Data source: github.com/vllm-project/vllm • Updated: 2026-10-01*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-01**

---

### **1. Today's Highlights**  
The SGLang project continues its aggressive optimization for large-scale, long-context inference with major progress on **HiSparse**, **HiCache**, and **Qwen3.8-Flash-Next**. Key improvements include a new weight cache daemon reducing engine startup time from ~300s to under 1s on Qwen3-235B FP8, and the rollout of **dynamic prefill context parallelism** support across more attention backends. A critical fix was merged to prevent silent text loss during tool-call streaming in multiple format detectors.

---

### **2. Releases & Breaking Changes**  
None. No new releases were published in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **AMD ROCm Support Expansion**:  
  - Full support for **GLM-5.3-Flash-NVFP4** on gfx950 via opt-in PTPC FP8 KDA projections ([PR #38764](https://github.com/sgl-project/sglang/pull/38764)).  
  - Successful serving of **Kimi-K3 MXFP4** checkpoint on ROCm ([PR #40811](https://github.com/sgl-project/sglang/pull/40811)).  
  - Fix for **MiniMax-M3 EAGLE3 verification** on ROCm ([PR #41497](https://github.com/sgl-project/sglang/pull/41497)).  
- **New Model Integration**:  
  - **Gluon MegaMoE** integration roadmap initiated with kernel and registry contributions ([Issue #38334](https://github.com/sgl-project/sglang/issues/38334)).

---

### **4. Performance & Optimization**  
- **Engine Recovery Speed**:  
  The **Weight Cache Daemon** (Phase 1) reduces post-quantized weight load time from **~306–327s to <1s** on Qwen3-235B FP8 ([Issue #33522](https://github.com/sgl-project/sglang/issues/33522), [blog](https://www.lmsys.org/blog/2026-08-21-sglang-weight-cache-daemon)).  
- **Speculative Decoding**:  
  On SM100 GPUs, using **FA4 by default for MiMo** yields **1.85× decode throughput boost** and **34.8% lower TTFT** ([PR #41886](https://github.com/sgl-project/sglang/pull/41886)).  
- **Kernel Fusion**:  
  Fused MLA + RoPE + KV-write kernel now used only for decode-sized forward modes on AMD, improving CU utilization ([PR #41533](https://github.com/sgl-project/sglang/pull/41533)).  
- **Prefill CP & CUDA Graphs**:  
  Dynamic prefill context parallelism is being extended to FlashInfer/TRTLLM-MHA backends ([Issue #21788](https://github.com/sgl-project/sglang/issues/21788)), while `--cuda-graph-max-bs-prefill` now correctly respects user-defined batch sizes ([Issue #41923](https://github.com/sgl-project/sglang/issues/41923)).

---

### **5. Stability & Regressions**  
- **Critical Text Loss Bug**:  
  Multiple format detectors (`Pythonic`, `Inkling`, `Gemma4`, `InternLM`, etc.) silently dropped final output if stream ended mid-tool-call due to unflushed buffer ([PR #41963](https://github.com/sgl-project/sglang/pull/41963), [PR #41962](https://github.com/sgl-project/sglang/pull/41962)). Fixed.  
- **CUDA Graph Memory Starvation**:  
  Prefill CUDA graph reserves ~1.8 GB, starving quantized-KV long-context prefill on small cards; no auto-disable logic based on free VRAM ([Issue #40094](https://github.com/sgl-project/sglang/issues/40094)).  
- **Remote Code Execution Risk**:  
  `SafeUnpickler` deny-list bypass via `/load_lora_adapter_from_tensors` exposes RCE risk ([Issue #30165](https://github.com/sgl-project/sglang/issues/30165)). High severity, no fix PR yet.  
- **GPU Driver Lockup**:  
  Triton kernel `load_binary` failure on GB10/SM121 cascades into GPU memory exhaustion and full driver lockup requiring reboot ([Issue #40948](https://github.com/sgl-project/sglang/issues/40948)).

---

### **6. What This Means for Application Developers**  
- **Deploying Large Models**: Use `--enable-hierarchical-cache` and `--disaggregation-decode-enable-radix-cache` with TP > 1 cautiously—ensure `hicache` state is preserved through evictions ([PR #39893](https://github.com/sgl-project/sglang/pull/39893)).  
- **Long Context Workloads**: Leverage HiSparse and HiCache for ultra-long contexts (e.g., 32K+ tokens) to reduce HBM usage during decode.  
- **Tool Call Streaming**: Update to latest main to avoid silent text truncation at stream end—especially relevant for agents using `Inkling`, `Gemmas`, or `Hunyuan`.  
- **Hardware-Specific Tuning**: On AMD ROCm, expect improved performance with GLM-5.3-Flash and Kimi-K3 via FP8/MXFP4 optimizations. On SM100, MiMo will default to FA4 for better latency.  
- **Security Note**: Avoid loading untrusted LoRA adapters via `from_tensors` until #30165 is resolved.

---  
*Data source: github.com/sgl-project/sglang | Updated: 2026-10-01*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-01**

---

### **1. Today's Highlights**  
The latest updates focus on critical stability fixes for speculative decoding, memory safety in tensor operations, and improved support for modern model architectures like Qwen3.8-Flash-Next and Prism Bonsai 2. Notable progress includes Metal memory leak resolution, Vulkan kernel expansion for wider Hadamard blocks, and a fix for incorrect batch order preservation during speculative decode layer input processing.

---

### **2. Releases & Breaking Changes**  
No new tagged releases were published today. However, the following changes are significant:  
- `b11308`: Fixed CLI argument parsing for `--download-mmproj`, with added test coverage ([#28977](https://github.com/ggml-org/llama.cpp/pull/28977)).  
- `b11307`: Preserved original batch order in speculative decoding layer inputs — crucial for correctness in high-throughput speculative generation ([#29019](https://github.com/ggml-org/llama.cpp/pull/29019)).  
- `b11304`: Properly handles KV cache during training workflows — important for fine-tuning pipelines ([#28520](https://github.com/ggml-org/llama.cpp/pull/28520)).

> ✅ *These changes are backward-compatible but recommended for users leveraging speculative decoding or training.*

---

### **3. New Model & Hardware Support**  
- **Model Support**:  
  - Runtime support added for **Prism Bonsai 2 27B** via PR [#29600](https://github.com/ggml-org/llama.cpp/pull/29600).  
  - Added MTP (Multi-Token Prediction) support for **Qwen3.8-Flash-Next** models ([#29761](https://github.com/ggml-org/llama.cpp/pull/29761)).  
  - Added Jinja parser support for **LLM-jp-4.1**, enabling structured tool call handling ([#29681](https://github.com/ggml-org/llama.cpp/pull/29681)).  
  - Initial support for **maion-coder** architecture ([#29778](https://github.com/ggml-org/llama.cpp/pull/29778)).

- **Hardware & Backend Enhancements**:  
  - **Metal**: Memory leak fix in private transfer buffers ([#29777](https://github.com/ggml-org/llama.cpp/pull/29777)), and BF16 math use for MXFP4 mul-mat kernels ([#29770](https://github.com/ggml-org/llama.cpp/pull/29770)).  
  - **Vulkan**: Extended FWHT kernels to support block widths up to 8192 ([#29772](https://github.com/ggml-org/llama.cpp/pull/29772)).  
  - **Hexagon**: Flattened matmul into 2D for HMX acceleration in multi-sequence scenarios ([#29779](https://github.com/ggml-org/llama.cpp/pull/29779)).  
  - **OpenCL**: Adreno E17 compiler now marked as supporting vector subgroup broadcast ([#29698](https://github.com/ggml-org/llama.cpp/pull/29698)).

---

### **4. Performance & Optimization**  
- **CUDA**:  
  - Improved FlashAttention prefill performance by preferentially using whole-tile scheduling for efficient two-stage kernels ([#29435](https://github.com/ggml-org/llama.cpp/pull/29435)).  
  - Use of MMVF for thin f16/bf16 mul_mat at small batch sizes improves throughput over slow cublas paths ([#29633](https://github.com/ggml-org/llama.cpp/pull/29633)).  
  - Volta (sm_70) now routed to Turing’s optimized MMVQ nwarps table, improving K-quant decode efficiency ([#29753](https://github.com/ggml-org/llama.cpp/pull/29753)).  

- **HIP**:  
  - Added MMQ N-tiles heuristic for CDNA GPUs, improving kernel selection accuracy ([#28709](https://github.com/ggml-org/llama.cpp/pull/28709)).

- **General**:  
  - Migrated remaining examples to `llama_batch_ext` API, improving consistency and thread safety ([#29601](https://github.com/ggml-org/llama.cpp/pull/29601)).  
  - Optimized Jinja loop scope copying by skipping unnecessary variable table duplication ([#29776](https://github.com/ggml-org/llama.cpp/pull/29776)).

---

### **5. Stability & Regressions**  
Top issues reported today reflect ongoing challenges across backends and hardware:  
- **Critical Crashes / OOMs**:  
  - Metal aborts during long generation due to buffer misuse ([#29771](https://github.com/ggml-org/llama.cpp/issues/29771)) — **fixed in PR #29777**.  
  - GPU reboots mid-generation when using `-sm` tensor flag ([#29549](https://github.com/ggml-org/llama.cpp/issues/29549)) — reproducible on RTX A6000.  
  - Vulkan `DeviceLost` errors on AMD R9700 under SAM/ReBAR load ([#29623](https://github.com/ggml-org/llama.cpp/issues/29623)).

- **Correctness Bugs**:  
  - Cache reuse not supported for Gemma 4 models despite `-fa` and `--swa-full` enabled ([#21468](https://github.com/ggml-org/llama.cpp/issues/21468)) — still unconfirmed.  
  - Repeats same token or generates garbage output on various models ([#29392](https://github.com/ggml-org/llama.cpp/issues/29392)) — affects Vulkan backend.  
  - Integer overflow in tensor size validation leads to undefined behavior ([#29384](https://github.com/ggml-org/llama.cpp/issues/29384), fixed in PR [#29384](https://github.com/ggml-org/llama.cpp/pull/29384)).

- **Backend-Specific Issues**:  
  - OpenVINO fails to create context when KV cache exceeds device limit ([#29087](https://github.com/ggml-org/llama.cpp/issues/29087)).  
  - Hexagon DSP queue failure on Snapdragon 8 Gen 2 at 4B+ params ([#26123](https://github.com/ggml-org/llama.cpp/issues/26123)).

> ⚠️ *Several regressions remain open; developers should validate behavior on target hardware before production deployment.*

---

### **6. What This Means for Application Developers**  
- **Use speculative decoding cautiously**: The fix for batch order preservation in speculative decoding (`b11307`) is essential for accurate results — ensure you’re on `b11307+`.  
- **Leverage MTP and Bonsai 2**: For high-throughput inference, enable MTP (`--spec-type draft-mtp`) with Qwen3.8-Flash-Next and Bonsai 2 models — expect ~2x speedup in draft stages.  
- **Avoid Metal/OOM risks**: If running long generations on Apple Silicon, apply PR #29777 immediately to prevent memory leaks.  
- **Monitor backend-specific bugs**: Vulkan and Metal continue to show instability on high-end GPUs; consider fallback to CUDA/ROCm if reliability is critical.  
- **Validate quantization choices**: MXFP4 models may require BF16 math for correct computation — avoid FP16 casting without verification.  

👉 *Best practice: Always build from recent master (≥ `b11307`) and test with your specific model + hardware stack.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-01**

---

### **Today's Highlights**  
Ollama continues to expand its support for advanced inference backends and model architectures, with key PRs enabling MLX integration for System One models and fixing critical GPU memory handling issues. Notably, a regression in JSON schema property order preservation has been identified and is being addressed via a fix PR, while multiple stability issues—particularly around Vulkan, CUDA, and MLX—remain active.

---

### **Releases & Breaking Changes**  
No new releases were published in the last 24 hours. However, **v0.35.0**, marked as a pre-release without an `-rc` suffix, has raised concerns about release process clarity ([#18706](https://github.com/ollama/ollama/issues/18706)). Developers should exercise caution when upgrading to this version until official confirmation of its stability.

---

### **New Model & Hardware Support**  
- **MLX System One support** added via PR [#18701](https://github.com/ollama/ollama/pull/18701), enabling native inference for decision-focused models like `nimble`, `bongard-mini` (T5Gemma2), and others through the `/v1/systemone` endpoint.
- **Bongard (T5Gemma2)** model now supported via PR [#18714](https://github.com/ollama/ollama/pull/18714) — a 4B encoder-decoder model trained for logical reasoning tasks.
- **Vulkan backend improvements**: Fixes for AMD RX 6800 XT (`0xc0000005` access violations) and UMA APU hangs are under investigation ([#18557](https://github.com/ollama/ollama/issues/18557), [#18370](https://github.com/ollama/ollama/issues/18370)).

---

### **Performance & Optimization**  
- **GPU memory management**: PR [#18719](https://github.com/ollama/ollama/pull/18719) introduces proxy-aware blob downloads, improving performance in restricted networks by respecting `HTTP_PROXY`/`HTTPS_PROXY`.
- **Connection reuse**: PR [#18397](https://github.com/ollama/ollama/pull/18397) re-enables HTTP keep-alives for `/api/embed` requests, reducing connection overhead during high-throughput embedding workloads.
- **Thread scheduling optimization**: Issue [#17916](https://github.com/ollama/ollama/issues/17916) highlights a critical throughput collapse in CPU-limited containers due to `n_threads` ignoring cgroup quotas—this impacts containerized deployments significantly.

---

### **Stability & Regressions**  
Top stability concerns today:  

1. **CUDA crash on RTX 5090** with Cohere MoE models: Persistent `illegal memory access` errors causing `llama-server` crashes ([#18642](https://github.com/ollama/ollama/issues/18642)). High severity; no fix PR yet.  
2. **MLX nvfp4 stall under sustained load**: Requests hang indefinitely with zero token progress despite full GPU utilization ([#18505](https://github.com/ollama/ollama/issues/18505)). Critical for production inference.  
3. **Silent image input discard**: `deepseek-v4.1-flash:cloud` advertises `vision` capability but silently ignores images ([#18527](https://github.com/ollama/ollama/issues/18527)). High impact for vision-augmented agents.  
4. **macOS GUI failure after 60s**: Long-running chat sessions fail silently without UI feedback ([#18368](https://github.com/ollama/ollama/issues/18368)).  
5. **Windows auto-update corrupts CUDA DLL**: Auto-updates leave `ggml-cuda.dll` as `.tmp`, forcing fallback to CPU ([#18712](https://github.com/ollama/ollama/issues/18712)).

> ✅ **Fix PRs in progress**:  
> - [#18717](https://github.com/ollama/ollama/issues/18717): Fix JSON schema property order loss → PR [#18721](https://github.com/ollama/ollama/pull/18721)  
> - [#18557](https://github.com/ollama/ollama/issues/18557): Vulkan access violation → similar to #18494, awaiting deeper diagnostics

---

### **What This Means for Application Developers**  
- **Avoid `deepseek-v4.1-flash:cloud`** if you rely on image inputs—expect silent data loss. Use local or alternative models until resolved.  
- **Containerized deployments**: Be cautious with `OLLAMA_NUM_PARALLEL=1` and cgroups—thread count may exceed CPU quota, causing thrashing. Explicitly set `n_threads` or use `cpuset`.  
- **Use MLX for Apple Silicon**: The latest MLX PRs enhance compatibility with newer models like `gemma4:31b-mlx`—ideal for high-context, low-latency inference.  
- **Schema-aware apps**: If using structured outputs, avoid relying on property order unless explicitly preserved—this will be fixed soon via PR [#18721](https://github.com/ollama/ollama/pull/18721).  
- **Proxy environments**: Ensure `HTTPS_PROXY` is respected—PR [#18719](https://github.com/ollama/ollama/pull/18719) addresses this gap.  

> 📌 **Recommendation**: Hold off on upgrading to v0.35.0 until the pre-release labeling issue is clarified. Monitor [#18706](https://github.com/ollama/ollama/issues/18706) and test critical workflows in staging.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **1. Today's Highlights**  
The LiteLLM project continues to strengthen its foundation for production-grade LLM orchestration, with critical fixes to proxy security, cost accounting, and streaming reliability. Notably, multiple PRs address high-severity issues in the proxy’s guardrail system, key-based access control, and audit logging—ensuring more robust and accurate enforcement of service tiers and budgets. A new `ternary` FOCUS export destination also expands observability integrations.

---

### **2. Releases & Breaking Changes**  
- **v1.105.0-dev.1**: This dev release includes signature verification via [cosign](https://github.com/BerriAI/litellm/commit/0112e53), reinforcing supply chain security across all Docker images. All future releases will be signed using the same key introduced in that commit.  
  🔗 [GitHub Release Notes](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-dev.1)  

> ⚠️ **Migration Note**: Users relying on `os.environ/` references in config (e.g., `api_key`, `jev_classifier_config.api_key`) should verify resolution behavior post-v1.103.0, as recent changes may affect parsing in edge cases.

---

### **3. New Model & Hardware Support**  
- **Gemma4 Models Added**: Support for `gemma-4-31b-it` and `gemma-4-26b-a4b-it` has been added via OpenRouter integration. These models are now recognized in `model_prices_and_context_window.json`.  
  🔗 [Issue #26973](https://github.com/BerriAI/litellm/issues/26973)  
- **Gemini SDK Access Fixed**: The `gemini/gemini-3.8-flash` model is now accessible through the SDK after a fix was merged.  
  🔗 [PR #43828](https://github.com/BerriAI/litellm/pull/43828)  
- **Azure Terraform Module Requested**: Community interest in an official Azure Terraform module highlights growing demand for multi-cloud IaC support.  
  🔗 [Issue #31843](https://github.com/BerriAI/litellm/issues/31843)

---

### **4. Performance & Optimization**  
- **Streaming + Logprobs Fix**: A Pydantic v2 serialization crash during streaming with `logprobs=True` on vLLM-backed models has been addressed. This restores stability for advanced analytics use cases.  
  🔗 [Issue #18801](https://github.com/BerriAI/litellm/issues/18801) | [PR #43959](https://github.com/BerriAI/litellm/pull/43959)  
- **Spend Logging Efficiency**: Partitioned `LiteLLM_SpendLogs` now supports `CREATE INDEX CONCURRENTLY` per partition, enabling faster schema upgrades without blocking writes.  
  🔗 [PR #43957](https://github.com/BerriAI/litellm/pull/43957)  
- **Agent Budget Enforcement**: New budgeting logic ensures agents respect lifetime limits and avoid bypassing reservations across external calls.  
  🔗 [PR #43724](https://github.com/BerriAI/litellm/pull/43724)

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR |
|------|----------|--------|--------|
| Cache misses `provider_specific_fields` (e.g., citations) in Anthropic web search | High | Closed | [Issue #13048](https://github.com/BerriAI/litellm/issues/13048) |
| Silent bypass of `BedrockGuardrail` when `disable_exception_on_block=True` | Critical | Open | [Issue #31976](https://github.com/BerriAI/litellm/issues/31976) |
| Audit logs dropped on worker shutdown despite 200 response | High | Open | [Issue #43583](https://github.com/BerriAI/litellm/issues/43583) |
| Redis cache not invalidated on customer CRUD operations | Medium | Open | [Issue #31838](https://github.com/BerriAI/litellm/issues/31838) |
| Streaming fallback retries primary instead of resuming backup | Medium | Open | [PR #43959](https://github.com/BerriAI/litellm/pull/43959) |

> ✅ **Note**: Several regressions were patched in PRs merged today, including `fix(proxy): restore pre-config-wins handling of pass-through endpoints` ([#43962](https://github.com/BerriAI/litellm/pull/43962)) and `fix(guardrails): treat unknown api_version as unset` ([#43956](https://github.com/BerriAI/litellm/pull/43956)).

---

### **6. What This Means for Application Developers**  
- **Cost Accuracy is Now Critical**: Ensure your custom models have proper cost mappings in `model_prices_and_context_window.json`—otherwise, spend logs may show `$0` even when usage is valid.  
  🔗 [Issue #35691](https://github.com/BerriAI/litellm/issues/35691)  
- **Guardrails Must Be Configured Carefully**: With `disable_exception_on_block=True`, guardrails can silently fail—always validate block behavior in production.  
  🔗 [Issue #31976](https://github.com/BerriAI/litellm/issues/31976)  
- **Use `service_tier` Explicitly**: The new `service_tier` billing matrix improves cost tracking but requires explicit configuration; test end-to-end with real traffic.  
  🔗 [PR #43960](https://github.com/BerriAI/litellm/pull/43960)  
- **Security First**: Enable `cosign` verification for Docker images in CI/CD pipelines to prevent supply chain compromise.  
  🔗 [Sigstore Docs](https://docs.sigstore.dev/cosign/overview/)  

Developers building agent systems or voice-enabled apps should prioritize upgrading to v1.103+ to benefit from stable streaming, correct token counting, and improved fallback resilience.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-01**

---

### **1. Today's Highlights**  
The Unsloth project has seen a surge in UI/UX and backend stability improvements, particularly around voice mode reconstruction (PR #12384, #12385, #12386) and PDF/Word document fidelity (PR #12377, #12378). Critical performance regressions—especially the ~1.2s fixed latency on OpenAI-compatible API requests—are now under investigation (#12364), while memory management fixes are being prioritized for low-memory environments (#12374).

---

### **2. Releases & Breaking Changes**  
None reported in the last 24 hours. No new versions or breaking configuration changes were released.

---

### **3. New Model & Hardware Support**  
- **New audio runtime**: `audio.cpp` added as a native engine for speech, music, and dictation via PR [#12342](https://github.com/unslothai/unsloth/pull/12342), enabling TTS/ASR model support directly in Studio and chat workflows.
- **AMD ROCm Windows fix**: A critical issue where Qwen-Image-2.1 failed to load its FP8 text encoder due to 404 errors is documented in [#11638](https://github.com/unslothai/unsloth/issues/11638), indicating incomplete artifact publishing for AMD/ROCm on Windows.
- **ARM64/Winget misrouting**: Windows users with x86 CPUs are incorrectly receiving ARM64 packages via `winget`, per [#11913](https://github.com/unslothai/unsloth/issues/11913)—a packaging bug affecting deployment reliability.

---

### **4. Performance & Optimization**  
- **OpenAI API latency regression**: The Studio’s `/v1/chat/completions` endpoint adds a fixed **~1.2s overhead per request**, regardless of payload size or token count, making it **3–5x slower** than direct `llama-server` calls on short-text workloads ([#12364](https://github.com/unslothai/unsloth/issues/12364)).
- **MMProject disk paging regression**: Since the latest update, `mmproj-F16.gguf` is being paged from disk during generation, causing severe throughput degradation; additional args are silently stripped and `--mlock` is rejected ([#12372](https://github.com/unslothai/unsloth/issues/12372)).
- **Memory allocation failure on startup**: On high-core-count, low-memory systems, the backend crashes during startup due to OpenBLAS memory retries failing ([#12374](https://github.com/unslothai/unsloth/pull/12374)).

---

### **5. Stability & Regressions**  
| Issue | Severity | Status | Fix PR? |
|------|----------|--------|--------|
| `tapClientLookup: Index 1 out of bounds (length: 0)` crash on "New Chat" | High | Open | ❌ |
| `MessagePartText can only be used inside text or reasoning message parts` | Medium | Open | ❌ |
| Duplicate `toolCallId` in responses | Medium | Open | ❌ |
| `--mmproj-device` / `--spec-draft-device` rejected when GPU pinned | High | Open | ❌ |
| Voice mode broken after fork deletion | High | Closed (reconstructed) | ✅ via [#12384](https://github.com/unslothai/unsloth/pull/12384), [#12385](https://github.com/unslothai/unsloth/pull/12385), [#12386](https://github.com/unslothai/unsloth/pull/12386) |
| PDF previews fail after extraction | Medium | Open | ✅ via [#12346](https://github.com/unslothai/unsloth/pull/12346) |

> *Note: Multiple issues stem from recent refactoring and dependency restructuring. Voice mode functionality has been successfully reconstructed post-fork deletion.*

---

### **6. What This Means for Application Developers**  
- **Avoid OpenAI-compatible API for low-latency use cases** until [#12364](https://github.com/unslothai/unsloth/issues/12364) is resolved—direct `llama-server` access remains significantly faster.
- **Expect instability when using multi-user setups** with shared models; session sync issues and chat history leakage are actively reported ([#12365](https://github.com/unslothai/unsloth/issues/12365)), so implement client-side state isolation.
- **Use `audio.cpp` for advanced audio pipelines** if you’re building voice-enabled agents—native TTS/ASR integration is now available.
- **Be cautious with large attachments**; no auto-chunking yet ([#12369](https://github.com/unslothai/unsloth/issues/12369)), so handle context overflow manually.
- **Verify system prompt persistence** when date-telling is enabled—default prompts may be silently dropped ([#12382](https://github.com/unslothai/unsloth/pull/12382)).

> 🔗 *Track all developments at [github.com/unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*