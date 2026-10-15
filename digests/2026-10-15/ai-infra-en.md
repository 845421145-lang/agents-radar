# AI Infrastructure Digest 2026-10-15

> Generated: 2026-10-15 00:46 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-10-15**

---

### **1. Ecosystem Overview**  
The AI inference infrastructure landscape in Q4 2026 is defined by rapid convergence between high-performance serving engines, local runtime optimization, and agent-aware gateways. Projects are increasingly focused on hybrid model support (Mamba/GDN), distributed inference scalability (PD disaggregation, RPC clusters), and production-grade stability—especially under multi-GPU, long-context, and speculative decoding workloads. While vLLM and SGLang lead in low-latency engine innovation, Ollama and llama.cpp dominate lightweight deployment and cross-platform compatibility. The emergence of secure, observability-rich gateways like LiteLLM signals a maturing stack where cost tracking, tracing, and trust are now core concerns.

---

### **2. Activity Comparison**

| Project        | Open Issues (Critical/High) | PRs Merged (Last 24h) | Releases (Stable/Nightly) | Status |
|----------------|------------------------------|--------------------------|------------------------------|--------|
| **vLLM**       | 17 (3 Critical, 5 High)      | 12                       | Stable: `v0.30.0`<br>Nightly: Broken (`v0.31.0-cu129`) | Active, but unstable nightly builds |
| **SGLang**     | 18 (3 Critical, 5 High)      | 6                        | Stable: `v0.5.20`<br>No new release | Production focus; CI instability |
| **llama.cpp**  | 16 (4 Critical, 4 High)      | 7                        | No new release; breaking changes merged | Stability-driven development |
| **Ollama**     | 14 (2 Critical, 4 High)      | 5                        | `v0.40.5-rc0` released         | Release-heavy with breaking changes |
| **LiteLLM**    | 12 (2 High, 2 Medium)        | 5                        | `v1.107.0-dev.1`, `v1.106.0-rc.3` | Security-focused, stable dev pipeline |
| **Unsloth**    | 10 (2 Critical, 3 High)      | 6                        | No new release                | Desktop app expansion |

> ✅ *vLLM and SGLang show highest engineering velocity; Ollama leads in release frequency with notable breaking changes.*

---

### **3. Model Support Race**  

| New Model / Architecture       | Supported By                          | Notes |
|----------------------------------|----------------------------------------|-------|
| **Gemma4ForSequenceClassification** | vLLM (PR #43726)                     | First to enable non-vocab-sized heads |
| **NemotronH_Omni_Reasoning_V3**   | llama.cpp (PR #30520)                | Vision + multimodal graph support |
| **maion-coder**                   | llama.cpp (PR #29778)                | Native loading & graph construction |
| **DeepSeek-V4.1-Flash**           | SGLang (confirmed), Ollama (cloud)   | SGLang has verified multi-GPU deployment |
| **Clef / Clef Flash**             | Ollama (Cloud)                        | New cloud-native models added |
| **K2 Horizon MoE (0.9B–36B)**     | Roadmap (Ollama, Issue #18698)        | Not yet supported; strong demand |
| **Hybrid Mamba/GDN**              | vLLM, SGLang                         | vLLM has deeper integration; SGLang leads in speculative decoding |

> 🏆 **Winner**: **vLLM** for foundational model support (e.g., Gemma4 classification); **SGLang** for complex agent-ready models (DeepSeek-V4.1); **Ollama** for cloud-first model delivery.

---

### **4. Performance Frontier**  

| Focus Area                  | Leading Projects                             | Key Developments |
|-----------------------------|----------------------------------------------|------------------|
| **KV Cache Optimization**   | vLLM, SGLang                                 | Hybrid Mamba prefix caching overhead (11–16%); FlashInfer FP8 vs NVFP4 performance gap (~1.8x slower) |
| **Quantization Kernels**    | vLLM, llama.cpp                              | MXFP4 GEMV (RDNA3.5), FP8 MMA (SM90), PTQ1_0 (CUDA) |
| **Distributed Serving**     | vLLM (PD disaggregation), Unsloth (RPC)      | Cross-request context contamination risk (vLLM #61160); Multi-machine GGUF serving (Unsloth #13726) |
| **Batching & Batching Efficiency** | SGLang, vLLM                           | Persistent top-k reduce (SGLang), Stream-K grid caps (llama.cpp) |
| **Kernel-Level Acceleration** | vLLM (Triton), SGLang (Monokernel RFC)     | Native per-token FP8 Triton (RDNA4); Monokernel plugin framework proposed |

> 🔥 **Hotspot**: **vLLM’s hybrid Mamba/GDN + prefix caching interaction** is the most active optimization frontier—impacting both throughput and correctness.

---

### **5. Layer Positioning**  

| Project       | Primary Layer               | Role Summary |
|---------------|------------------------------|--------------|
| **vLLM**      | **Inference Engine**         | High-throughput, kernel-optimized serving with PD disaggregation and speculative decoding |
| **SGLang**    | **Agent-Ready Inference Stack** | End-to-end agentic workflow support: engine + scheduler + tooling + speculative decoding |
| **llama.cpp** | **Local Runtime / Edge Optimizer** | CPU/GPU hybrid inference, GGUF-centric, vision model support, Vulkan/AMD driver fixes |
| **Ollama**    | **Model Gateway / CLI Platform** | Unified interface for model management, cloud access, and OpenAI-compatible API |
| **LiteLLM**   | **API Gateway / Observability Layer** | Cost tracking, OpenTelemetry, streaming tool call handling, security via signed images |
| **Unsloth**   | **Desktop Agent Runtime**    | Integrated UI, multimodal tools, external image generation, multi-server orchestration |

> 💡 **Strategic Differentiation**:  
> - **vLLM/SGLang**: Serve as backend engines for scalable inference.  
> - **Ollama/LiteLLM**: Act as abstraction layers for developers and operators.  
> - **Unsloth**: Bridges the gap between desktop UX and distributed AI systems.

---

### **6. Trend Signals**  

#### **Key Industry Trends Extracted from Today's Activity:**
1. **Hybrid Architectures Are Now Mainstream**  
   → vLLM and SGLang now actively optimize for **hybrid Mamba/GDN models**, signaling that LLM+state-space model fusion is no longer experimental—it’s production-ready.

2. **Distributed Inference Is Facing Stability Crises**  
   → Multiple critical issues (vLLM #61160, SGLang #43412) highlight **cross-request data leakage** and **crash risks** in PD-disaggregated setups. This suggests the industry is moving faster than reliability can keep up.

3. **Security & Trust Are Non-Negotiable at Scale**  
   → LiteLLM’s adoption of **cosign-signed Docker images** and Ollama’s breaking change warnings indicate that **supply chain integrity** is now a baseline requirement.

4. **Agent Workflows Demand Full Stack Integration**  
   → SGLang’s weight cache daemon, Ollama’s `custom_tool_call`, and LiteLLM’s `traceresponse` headers all point to **agent-specific optimizations** becoming standard.

5. **Hardware-Specific Bugs Are Escalating**  
   → RTX 5090 CUDA hangs (#27330), AMD Strix Halo Vulkan crashes (#30364), and Intel iGPU VRAM reporting bugs (#29277) reveal that **new hardware is introducing unanticipated edge cases**.

---

### **Recommendations for Application Developers**  
- **Avoid speculative decoding** on hybrid Mamba/GDN models until vLLM/SGLang fixes are merged.  
- **Use `--no-enable-prefix-caching`** in PD-disaggregated environments to prevent data leakage.  
- **Verify Docker image integrity** with `cosign verify` when using LiteLLM or Ollama.  
- **Test with `v0.40.5-rc0` or earlier** if deploying on RTX 5090 or AMD RX 9060 XT.  
- **Leverage monokernels (SGLang) and weight cache daemons (SGLang)** for fast model restarts in dynamic LoRA environments.  
- **Monitor KV cache bloat** in rerank-only servers (llama.cpp) and use `--cache-ram` limits proactively.

> ✅ **Bottom Line**: The ecosystem is maturing rapidly—but **stability, security, and correctness remain the top hurdles**. Choose your stack based on **production readiness**, not just performance benchmarks.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-15

---

### **1. Today's Highlights**  
The vLLM project continues to deepen its support for hybrid Mamba/GDN models and AMD ROCm hardware, with critical fixes for prefix caching correctness and speculative decoding stability in multi-token prefill scenarios. Key PRs today address silent data corruption in NIXL-based disaggregation deployments and a persistent NaN output bug in Mamba2 on SM90, both of which impact production reliability.

---

### **2. Releases & Breaking Changes**  
*None.* No new releases were published in the last 24 hours. The latest stable version remains `v0.30.0`, with nightly builds (`v0.31.0-cu129`) currently experiencing startup failures due to CUDA version mismatches (see [PR #60406](https://github.com/vllm-project/vllm/pull/60406)).

---

### **3. New Model & Hardware Support**  
- **New Model**: Added support for `Gemma4ForSequenceClassification` via [PR #43726](https://github.com/vllm-project/vllm/pull/43726), enabling non-vocab-sized output heads.
- **ROCm / AMD**:  
  - Added CI job for `DeepSeek-V4.1 Mono Decode Numerics` on MI355 ([PR #61720](https://github.com/vllm-project/vllm/pull/61720)).  
  - Enabled indexer-only context parallelism for MiniMax-M3 on gfx950 ([PR #57909](https://github.com/vllm-project/vllm/pull/57909)).  
  - Updated default ROCm image to 10.0 ("TheRock"), deprecating 7.2 ([PR #58761](https://github.com/vllm-project/vllm/pull/58761)).
- **Quantization**: Experimental MXFP4 GEMV kernel added for RDNA3/RDNA3.5 decode ([PR #60413](https://github.com/vllm-project/vllm/pull/60413)); FP8 MMA enabled for Gemma-4 full attention on SM90 ([PR #60372](https://github.com/vllm-project/vllm/pull/60372)).

---

### **4. Performance & Optimization**  
- **Kernel-Level**: Native per-token FP8 Triton linear backend introduced for RDNA4 (Radeon AI PRO R9700) with tuned configurations ([PR #61091](https://github.com/vllm-project/vllm/pull/61091)).  
- **Hybrid Mamba**: Hybrid Mamba prefix caching (`mamba_cache_mode="align"`) now incurs **11–16% throughput cost** without cache hits — highlighting ongoing optimization needs ([Issue #60008](https://github.com/vllm-project/vllm/issues/60008)).  
- **FlashInfer**: NVFP4 KV cache causal prefill is **~1.7–1.8x slower than FP8** on SM120 (Blackwell consumer), indicating performance regression in quantized path ([Issue #50416](https://github.com/vllm-project/vllm/issues/50416)).  
- **Speculative Decoding**: PRs addressing MTP spec-decoding + prefix-cache interaction in hybrid GDN models ([PR #52244](https://github.com/vllm-project/vllm/pull/52244)) aim to restore cache hit rates.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|---------|------|-------------|------------|
| Critical | [Issue #61160](https://github.com/vllm-project/vllm/issues/61160) | Cross-request context contamination via shared-prefix reuse in PD disaggregation with automatic prefix caching — **responses leak content from other requests**. | Open; reproducible with DeepSeek-V4.1-Flash. |
| High | [Issue #61229](https://github.com/vllm-project/vllm/issues/61229) | NixlConnector: KV blocks released during remote READ → decode consumes overwritten blocks → silent data corruption. | Open; impacts P/D disaggregation integrity. |
| High | [Issue #60660](https://github.com/vllm-project/vllm/issues/60660) | FlashInfer MNNVL allreduce crashes with `CUDA_ERROR_ILLEGAL_ADDRESS` during multi-block long prefill. | Open; persists even after disabling MTP/fusion. |
| Medium | [Issue #54521](https://github.com/vllm-project/vllm/issues/54521) | Qwen3.8-Flash-Next greedy decoding non-deterministic near `indexer_budget` due to `persistent_topk`. | Open; affects deterministic inference at scale. |
| Medium | [Issue #51663](https://github.com/vllm-project/vllm/issues/51663) | Massive output-token throughput regression since v0.24.0 with Qwen3.6-35B-A3B-FP8. | Open; still present in v0.26.0. |

---

### **6. What This Means for Application Developers**  
- **Avoid automatic prefix caching in PD-disaggregated setups** until [issue #61160](https://github.com/vllm-project/vllm/issues/61160) is resolved — it may cause cross-request data leakage.
- **Disable speculative decoding if using hybrid Mamba/GDN models with prefix caching** — current behavior silently disables cache hits ([issue #54360](https://github.com/vllm-project/vllm/issues/54360)), reducing efficiency.
- **Use `--no-enable-prefix-caching` temporarily** if serving models like Qwen3.8-Flash-Next or GLM-5.3 where non-determinism or cache corruption occurs ([issues #54521](https://github.com/vllm-project/vllm/issues/54521), [#57406](https://github.com/vllm-project/vllm/issues/57406)).
- **Monitor for NaN outputs when running Mamba2 on SM90** — use [PR #61718](https://github.com/vllm-project/vllm/pull/61718) or avoid autotuned configs until patched.
- **Expect latency variability with NVFP4 quantization on SM120** — consider FP8 unless precision demands otherwise.

> 🔗 *All issues and PRs linked above are actively tracked in the vLLM GitHub repository.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **1. Today's Highlights**  
The SGLang project continues to advance its production-grade inference stack with critical stability improvements and deep optimizations for DeepSeek-V4.1 on diverse hardware, including 8× RTX PRO 6000 (SM120) configurations. Key developments include a new RFC for the *Monokernel framework*, ongoing work on speculative decoding robustness, and active efforts to stabilize CI infrastructure amid flaky test patterns.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes detected in the last 24 hours.*  
- The latest stable version remains `v0.5.20` (built 2026-09-18).  
- No migration notes or deprecations were introduced today.

---

### **3. New Model & Hardware Support**  
- ✅ **DeepSeek-V4.1-Flash**: Confirmed working in production on **8× RTX PRO 6000 (SM120, PCIe-only)** — field-tested by @Lei-010 with measured throughput and verified speculative decoding A/B testing ([#40877](https://github.com/sgl-project/sglang/issues/40877)).  
- ✅ **T-Head PPU (Zhenwu 810/810E/M890P)**: Roadmap initiated for first-class support via [RFC #37519](https://github.com/sgl-project/sglang/issues/37519), targeting integration into core SGLang runtime.  
- ✅ **Intel XPU HiCache L1<->L2 Tiering**: Enabled via PR [#32503](https://github.com/sgl-project/sglang/pull/32503), expanding hierarchical KV cache support beyond CUDA/ROCm.  
- ⚠️ **AMD ROCm DCP Context Parallelism**: Still blocked on triton sparse-MLA backend; PR [#44322](https://github.com/sgl-project/sglang/pull/44322) aims to enable it.

---

### **4. Performance & Optimization**  
- 🔥 **Weight Cache Daemon (Phase 1)**: Reduced engine startup time from ~306–327s to **<1s** on Qwen3-235B FP8 via per-rank daemon + CUDA IPC ([#33522](https://github.com/sgl-project/sglang/issues/33522)).  
- 🚀 **DeepSeek-V4.1 Optimizations**: Ongoing refactoring of mHC (DSV41 only), fusion of `q_rope_store` into `fused_q_norm_rope`, and hybrid extend reshape fixes ([#42170](https://github.com/sgl-project/sglang/issues/42170)).  
- 📈 **MegaMoE Latency Reduction**: Introduced persistent top-k reduce to eliminate decode overhead in FlashInfer kernel ([#39832](https://github.com/sgl-project/sglang/pull/39832)).  
- 🧩 **Monokernel Framework RFC**: Proposal for plugin-based monokernels under `python/sglang/experimental/monokernels/` ([#43949](https://github.com/sgl-project/sglang/issues/43949)) — enables flexible kernel dispatch and safety enforcement.

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| Critical | [#43412](https://github.com/sgl-project/sglang/issues/43412) | Speculative decoding crashes server on **first non-greedy request** due to JIT failure in `flashinfer verify-sampling op` (pip-installed bundle vs bundled cccl) | ❌ Unresolved; SIGKILL kills process tree |
| High | [#42012](https://github.com/sgl-project/sglang/issues/42012) | GLM-5.3-Flash crashes at **CUDA-graph capture** (hybrid extend reshape) on SM120; only Triton backend works | ❌ Blocked pending backend fix |
| High | [#43988](https://github.com/sgl-project/sglang/issues/43988) | `--fp4-gemm-backend marlin` crashes on SM100 with NVFP4 W4A4 checkpoints (no 'marlin' backend registered) | ❌ Regression in FP4 path |
| Medium | [#44188](https://github.com/sgl-project/sglang/issues/44188) | Dumper filter `eval()` enables **scheduler-process RCE** when `--admin-api-key` is unset | ⚠️ Security risk; no fix yet |
| Medium | [#43708](https://github.com/sgl-project/sglang/issues/43708) | Decoded audio duration/sample count unbounded during multimodal preprocessing | ❌ Impact on memory safety |

> 🔍 **CI Health**: Flaky tests and infrastructure failures remain prevalent — tracked in [#42752](https://github.com/sgl-project/sglang/issues/42752). CI Maintenance Mode may be reactivated if instability persists.

---

### **6. What This Means for Application Developers**  
- **Deploying complex agents on consumer GPUs?** You can now run **DeepSeek-V4.1-Flash** reliably on **8× RTX PRO 6000 (PCIe-only)** — ideal for cost-effective agentic inference clusters ([#40877](https://github.com/sgl-project/sglang/issues/40877)).  
- **Need faster model restarts?** Leverage the new **weight cache daemon** to achieve sub-second engine recovery — essential for dynamic LoRA switching or high-frequency model reloads ([#33522](https://github.com/sgl-project/sglang/issues/33522)).  
- **Avoiding crashes in speculative decoding?** Avoid `--fp4-gemm-backend marlin` on SM100 and disable speculative decoding until [#43412](https://github.com/sgl-project/sglang/issues/43412) is resolved.  
- **Building secure systems?** Do not use `--dumper-filter` with `eval()` — it introduces remote code execution risk ([#44188](https://github.com/sgl-project/sglang/issues/44188)).  
- **Optimizing memory usage?** Monitor `--enable-symm-mem` behavior — it’s not properly isolated from static memory pool, risking OOM after startup ([#44106](https://github.com/sgl-project/sglang/issues/44106)).  

👉 **Recommendation**: Use `v0.5.20` or later, avoid unstable features like speculative decoding on non-Greedy paths, and monitor PRs for fixes before deploying in production.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-15**

---

### **1. Today's Highlights**  
The latest development cycle focuses on critical stability fixes for multi-GPU and vision-enabled models, particularly around KV cache handling in server mode and Vulkan/AMD driver compatibility. Significant performance optimizations landed for CUDA and Vulkan backends, including MMQ stream-k grid caps and improved Flash Attention ordering—key for high-throughput inference on RTX 5090 and AMD Arc GPUs.

---

### **2. Releases & Breaking Changes**  
No new releases were published in the last 24 hours. However, several **breaking changes** were merged or proposed:  
- `--prefetch-experts-slots` is now available as a stable flag for MoE model optimization (PR #28414).  
- `ggml_backend_vk_get_device_memory` now correctly reports VRAM usage on Intel iGPUs under Windows (fixes incorrect `free > total` values) — **note**: this may affect downstream memory budgeting logic (Issue #29277).  
- `jinja` template output now writes floats with full precision (Python-compatible), resolving rounding issues in tool definitions (PR #30362).

> 🔗 [PR #28414](https://github.com/ggml-org/llama.cpp/pull/28414) | [PR #30362](https://github.com/ggml-org/llama.cpp/pull/30362)

---

### **3. New Model & Hardware Support**  
- **New model architectures added**:  
  - `maion-coder` support via PR #29778 (native loading and graph construction).  
  - `NemotronH_Omni_Reasoning_V3` architecture for **Nemotron Super 3.5 VL** and **Nemotron Bolt 74B A9B**, including vision graph support (PR #30520).  
- **Hardware/Backend improvements**:  
  - AMD Adreno 850 GPU now properly detected via OpenCL compiler version parsing (PR #30555).  
  - Vulkan backend gains better support for long context processing on gfx1151 (Strix Halo) devices (Issue #30364).  
  - CUDA now supports **PTQ1_0** quantization format (PR #29676).  

> 🔗 [PR #29778](https://github.com/ggml-org/llama.cpp/pull/29778) | [PR #30520](https://github.com/ggml-org/llama.cpp/pull/30520) | [PR #30555](https://github.com/ggml-org/llama.cpp/pull/30555)

---

### **4. Performance & Optimization**  
- **CUDA**:  
  - MMQ kernels now cap Stream-K grid size to actual work units, reducing launch overhead and fixup latency (PR #30553).  
  - Faster MMVQ for low-bit types (q4_K, q8_0) shows measurable speedups in matrix chains (benchmarks indicate ~2–3% improvement over noise floor).  
- **Vulkan**:  
  - Flash Attention softcap applied *before* masking (PR #30546), correcting semantic error that could impact long-context accuracy.  
  - Improved RPC tensor logging with human-readable sizes (KiB/MiB/GiB), aiding debugging of distributed inference.  
- **SYCL**:  
  - Fix for Flash Attention crash due to unsupported query head dimensions (D=2048/4096) (PR #30286).  
  - CI pipeline optimized by replacing oneAPI package with DLE + oneDNN (PR #30131), reducing build time.

> 🔗 [PR #30553](https://github.com/ggml-org/llama.cpp/pull/30553) | [PR #30546](https://github.com/ggml-org/llama.cpp/pull/30546) | [PR #30286](https://github.com/ggml-org/llama.cpp/pull/30286)

---

### **5. Stability & Regressions**  
Critical stability issues reported today include:  
1. **RTX 5090 hangs with CUDA graphs** (`GGML_CUDA_DISABLE_GRAPHS=1` works as workaround) — reproducible with `gemma4-assistant`, likely related to SM_120 kernel scheduling (Issue #27330).  
2. **Vulkan crashes on AMD Strix Halo (gfx1151)** with `ubatch > 128` → `amdgpu device lost` (Issue #30364).  
3. **Metal OOM during init causes silent 500 errors** — server binds port even after fatal out-of-memory (Issue #27309).  
4. **Flash Attention crash in `gemma4-assistant`** due to query head dimension mismatch (neq0 != HSK) (Issue #29419) — fixed in PR #30286.  
5. **Prompt cache bloat** in rerank-only servers consumes up to 8 GiB RAM per call (Issue #26293) — mitigated by PR #30498 (only save restorable states).

> 🔗 [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) | [Issue #30364](https://github.com/ggml-org/llama.cpp/issues/30364) | [Issue #29419](https://github.com/ggml-org/llama.cpp/issues/29419) | [PR #30498](https://github.com/ggml-org/llama.cpp/pull/30498)

---

### **6. What This Means for Application Developers**  
- **Use `--prefetch-experts-slots N`** for MoE models on CPU-hosted experts to reduce I/O latency during generation.  
- **Avoid CUDA graphs on RTX 5090** until #27330 is resolved — use `GGML_CUDA_DISABLE_GRAPHS=1` in production.  
- **For vision models**, ensure you're using the latest builds: saving KV cache fails for vision-enabled models (Issue #19466), so manual state management may be required.  
- **Migrate from `jinja` templates** using `tojson` if precision matters — floating-point output is now fully preserved (no more truncation).  
- **Monitor VRAM usage carefully** on integrated GPUs (e.g., Ryzen AI Max+ PRO): `ggml_backend_vk_get_device_memory` now reflects accurate budgets, which can affect offload decisions.  

> ✅ **Best Practice**: Always test with `--cache-ram` limits and monitor prompt cache behavior in rerank-only or MTP workflows. Use PR #30498’s patch to avoid silent RAM bloat.

---  
*Data source: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*  
*Digest generated: 2026-10-15*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **Ollama Digest — 2026-10-15**

#### **1. Today's Highlights**  
The latest release, `v0.40.5-rc0`, brings critical improvements to cross-backend compatibility with the port of Metal custom kernels to CUDA, enabling better performance on NVIDIA GPUs. Concurrently, several high-severity stability issues have emerged in production environments—most notably a cluster-wide data corruption bug affecting `glm-5.3-flash:cloud` and persistent crashes under Windows with RTX 5090 and Cohere MoE models.

#### **2. Releases & Breaking Changes**  
- **v0.40.5-rc0**: Released today with key fixes for GPU backend interoperability and OpenAI-compatible API robustness.
  - 🔧 **CUDA Porting**: Metal custom kernels now available on CUDA via [PR #18657](https://github.com/ollama/ollama/pull/18657), improving inference consistency across Apple and NVIDIA hardware.
  - 🛠️ **OpenAI Compatibility**: Support for custom tool calls in response history added ([PR #18986](https://github.com/ollama/ollama/pull/18986)), enabling richer agent workflows.
  - ⚠️ **Breaking Change Alert**: `nimble:latest` and similar models may fail to load after upgrade due to format deprecation ([Issue #18998](https://github.com/ollama/ollama/issues/18998)). Users must re-download affected models.

#### **3. New Model & Hardware Support**  
- ✅ **New Cloud Models**: Clef and Clef Flash introduced to Ollama Cloud via [PR #18969](https://github.com/ollama/ollama/pull/18969).
- 📌 **Model Request**: K2 Horizon model family (0.9B–36B MoE) added to roadmap; official GGUF support requested ([Issue #18698](https://github.com/ollama/ollama/issues/18698)).
- 💻 **Hardware**: RTX 5090 now under active investigation for CUDA memory access errors ([Issue #18642](https://github.com/ollama/ollama/issues/18642)); AMD RX 9060 XT users report Tensile library loading failures ([Issue #17782](https://github.com/ollama/ollama/issues/17782)).

#### **4. Performance & Optimization**  
- 🔥 **Latency Concerns**: Multiple reports indicate regression in response speed post-`0.40.4`, especially for decision models like `nimble`, `tev`, and `clef-flash` ([Issue #19002](https://github.com/ollama/ollama/issues/19002)).
- 📈 **Efficiency Improvements**: PRs focused on prompt timing accuracy by accounting for cache hits ([PR #18964](https://github.com/ollama/ollama/pull/18964)) and reducing unnecessary HTML escaping in proxy requests ([PR #19008](https://github.com/ollama/ollama/pull/19008)) improve throughput at scale.
- 🧠 **Quantization Insight**: New `llama-roofline` integration ([PR #18997](https://github.com/ollama/ollama/pull/18997)) allows developers to inspect actual GGUF quantization types without full model load.

#### **5. Stability & Regressions**  
| Severity | Issue | Status | Link |
|--------|------|--------|------|
| Critical | `glm-5.3-flash:cloud`: Cluster 829 data area corrupted → all zeros → infinite repetition (`the = the...`) | Open | [Issue #18980](https://github.com/ollama/ollama/issues/18980) |
| Critical | CUDA illegal memory access crash on RTX 5090 during Cohere MoE inference (Windows) | Open | [Issue #18642](https://github.com/ollama/ollama/issues/18642) |
| High | `deepseek-v4.1-flash:cloud`: 500 error on image input > ~655k tokens | Open | [Issue #18853](https://github.com/ollama/ollama/issues/18853) |
| High | `clef-flash`: Forced `n_ubatch = n_ctx` causes OOM at default `num_ctx=16384` | Open | [Issue #18865](https://github.com/ollama/ollama/issues/18865) |
| Medium | `gemma4:12b`: Requires `ctx_other` not set — fails silently | Open | [Issue #18898](https://github.com/ollama/ollama/issues/18898) |
| Medium | `OLLAMA_CONTEXT_LENGTH` ignored in `/api/show` and `/api/tags` metadata | Open | [Issue #18995](https://github.com/ollama/ollama/issues/18995) |

> ✅ **Fixes in Progress**: Several PRs address OpenAI ID collision risks ([PR #18996](https://github.com/ollama/ollama/pull/18996), [#18655](https://github.com/ollama/ollama/pull/18655)) and foreign compaction handling ([PR #19003](https://github.com/ollama/ollama/pull/19003)).

#### **6. What This Means for Application Developers**  
- **Agent Workflows**: Enable robust multi-provider state continuation using new `custom_tool_call` support in response history ([PR #18986](https://github.com/ollama/ollama/pull/18986)). Avoid client-side ID collisions by upgrading to avoid `chatcmpl-rand.Intn(999)` limitation.
- **Cloud Deployment**: Be cautious with `glm-5.3-flash:cloud` until root cause is resolved—expect degeneration in ~5–8% of cases. Use local fallbacks where possible.
- **Hardware-Specific Builds**: If targeting RTX 5090 or AMD RX 9060 XT, test with `v0.40.5-rc0` or earlier versions; consider rolling back if crashes persist.
- **Model Management**: Monitor for breaking changes when upgrading—re-download models like `nimble` if they fail post-update. Use `OLLAMA_CONTEXT_LENGTH` strictly for effective context control.
- **Tooling**: Leverage new integrations like `llama-roofline` and `gknowledge` for deeper model diagnostics and RAG pipeline optimization.

> 🔗 Full issue tracker: [github.com/ollama/ollama/issues](https://github.com/ollama/ollama/issues)  
> 🔬 Developer guide: [docs.ollama.ai](https://docs.ollama.ai)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

---

### **LiteLLM Digest — 2026-10-15**

---

#### **1. Today's Highlights**  
LiteLLM v1.107.0-dev.1 introduces enhanced security via signed Docker images using cosign, reinforcing trust in the release pipeline. Critical fixes address streaming tool call handling for Gemini and Claude models, while new cost tracking ensures accurate billing for AgentCore web searches at AWS’s $0.007 per query rate. A major PR improves OpenTelemetry trace visibility by returning W3C `traceresponse` headers on sampled responses.

---

#### **2. Releases & Breaking Changes**  
- **v1.107.0-dev.1**, **v1.106.0-rc.3**, and **v1.105.1** released with verified cosign signatures (key from [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)).  
- **Security Note**: All Docker images are now cryptographically signed—verify using `cosign verify`.  
- **Migration Advisory**: No breaking API changes reported; however, users relying on `litellm.turn_on_message_logging` should note it no longer exists (see [#37143](https://github.com/BerriAI/litellm/issues/37143)).

---

#### **3. New Model & Hardware Support**  
- **GPT-5 Models**: Now routed via `/v1/responses` endpoint by default (per [#33114](https://github.com/BerriAI/litellm/issues/33114)), aligning with OpenAI’s new API contract.  
- **AgentCore Web Search**: Full support added with correct cost modeling (`agentcore/search` priced at $0.007/query) in both cost maps ([#46554](https://github.com/BerriAI/litellm/pull/46554), [#46558](https://github.com/BerriAI/litellm/pull/46558)).  
- **Gemini 3+ via Anthropic-Compatible `/v1/messages`**: Streaming tool calls now properly emit individual `tool_use` blocks instead of merging them into invalid JSON ([#46492](https://github.com/BerriAI/litellm/pull/46492)).

---

#### **4. Performance & Optimization**  
- **Streaming Efficiency**: Fixes ensure tool call arguments and text arrive only once during faked Responses streams ([#46533](https://github.com/BerriAI/litellm/pull/46533)), reducing redundant payloads.  
- **MCP Gateway Optimization**: Tool resolution now scoped to owning server, eliminating unnecessary cross-server `tools/list` calls ([#46545](https://github.com/BerriAI/litellm/pull/46545)).  
- **Cost Accuracy**: `input_cost_per_query` is now honored per search tool, enabling custom pricing without forked cost maps ([#46560](https://github.com/BerriAI/litellm/pull/46560)).

---

#### **5. Stability & Regressions**  
| Severity | Issue | Fix Status | GitHub Link |
|---------|------|------------|-------------|
| High | `gpt-5` thinking outputs missing in OpenWebUI due to missing deepseek-r1-style routing | Pending | [#13419](https://github.com/BerriAI/litellm/issues/13419) |
| High | Virtual key updates fail with "only available for Enterprise" error despite non-enterprise usage | Pending | [#15230](https://github.com/BerriAI/litellm/issues/15230) |
| Medium | Budget reset fails to commit when `LiteLLM_EndUserTable` exceeds ~1M rows | In Progress | [#46404](https://github.com/BerriAI/litellm/issues/46404) |
| Medium | Mid-stream 429 errors can cool down fallback deployments incorrectly | In Progress | [#45645](https://github.com/BerriAI/litellm/issues/45645) |
| Low | `validate_environment()` returns false positive for ZAI models without API key | Fixed | [#32962](https://github.com/BerriAI/litellm/issues/32962) |

> ✅ **Fix PRs merged today**:  
> - [#46533](https://github.com/BerriAI/litellm/pull/46533): Fixes faked stream item formatting  
> - [#46492](https://github.com/BerriAI/litellm/pull/46492): Splits multi-tool chunks correctly  
> - [#46554](https://github.com/BerriAI/litellm/pull/46554): Correctly prices AgentCore web searches  

---

#### **6. What This Means for Application Developers**  
- **Use `/v1/responses` for GPT-5 models** — ensure your clients use the new endpoint for reasoning and tool calling.  
- **Enable OpenTelemetry tracing** with `LITELLM_OTEL_V2=1` to get `traceresponse` headers for better observability across distributed systems.  
- **Avoid virtual key errors** by not attempting to edit keys beyond basic metadata until [#15230](https://github.com/BerriAI/litellm/issues/15230) is resolved.  
- **Monitor budget resets** if you have large-scale user tables — consider database indexing or periodic cleanup to prevent stale `budget_reset_at` values.  
- **Ensure proper cost accounting** for AgentCore tools: always validate that `input_cost_per_query` is set per tool if using custom pricing.  

> 🔍 **Pro Tip**: Use `cosign verify` on all LiteLLM Docker images to confirm integrity in CI/CD pipelines.

---  
*Digest generated: 2026-10-15 | Source: [GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-15**

---

### **1. Today's Highlights**  
The Unsloth Desktop app continues to expand its multimodal and multi-server capabilities, with key PRs enabling external image generation via OpenAI-compatible endpoints (#13756), improved browser agent behavior (#13777), and enhanced diffusion memory planning for AMD GPUs (#13786). Critical stability fixes were merged for macOS Ctrl+C handling (#13782) and Vulkan fallback on older AMD cards (#13776), while new support for model-specific audio settings (#13764) and GitHub file parsing (#13754) improves usability.

---

### **2. Releases & Breaking Changes**  
*None* — No new releases or breaking API/config changes reported in the last 24 hours.

---

### **3. New Model & Hardware Support**  
- **External Image Generation**: Studio now supports generating images through external connections (e.g., Ollama, vLLM, llama.cpp) via the Images tab (#13756).  
- **AMD GPU Improvements**: Added Vulkan fallback support for ROCm-unsupported AMD cards (e.g., Vega 10) to prevent CPU-only fallback (#13666).  
- **Integrated AMD GPUs**: PR #13786 introduces reserved memory budgeting for MiniMax-H3 GGUF on integrated AMD GPUs (Strix Halo/Point), improving render reliability.  
- **Model-Specific Audio Settings**: Default audio options are now initialized based on each model’s recommended values, improving consistency (#13764).

---

### **4. Performance & Optimization**  
- **Fused INT8 GEMM Latency Fix**: A regression in Triton 3.8 caused slowdowns on A100/L4; a latency-gated dispatch has been implemented to restore performance without sacrificing accuracy (#13772).  
- **Memory Planning Enhancements**:  
  - Learned activation peaks now dynamically adjust memory reserves for diffusion models like FLUX.2-klein, reducing OOM errors on 8–24GB cards (#13724).  
  - Offload planner now weighs `llama.cpp`'s internal fitter against spill costs, improving load balancing (#9872).  
- **Multi-Machine Serving**: PR #13726 enables one GGUF model to be served across N machines via `llama.cpp` RPC, unlocking scalable inference clusters (#13726).

---

### **5. Stability & Regressions**  
- **Critical macOS Crash on Ctrl+C**: `llama-server` would crash when interrupted via Ctrl+C due to signal double-handling; fixed in #13782.  
- **Vulkan OOM on Integrated AMD GPUs**: Older AMD GPUs failed to render due to insufficient GTT budget; fix in #13786 addresses this by reserving pinned weights.  
- **Windows Input Box Visibility Issue**: Input bar was hidden behind taskbar when window was maximized; PR #13616 resolves layout overflow.  
- **Image Edit CUBLAS Error**: `TypeError` in `diffusion_prompt_cache.py` triggered CUBLAS error during Qwen-Image-2.1 edits; PR #13638 in progress.  
- **FP8 Pre-Quantization Commit Limit Exhaustion**: On Windows, FP8 text-encoder pre-quantization could exhaust commit limit, causing shard load failures; addressed in #12860.

---

### **6. What This Means for Application Developers**  
Developers can now deploy multi-model, multi-server setups using the desktop app with independent `llama.cpp` configurations (#8488), ideal for agent orchestration. The addition of external image generation (#13756) and improved audio defaults (#13764) simplifies integration with third-party AI services. For high-performance inference, leverage the new latency-gated INT8 GEMM (#13772) and offload planner enhancements (#9872) to optimize throughput on A100/L4 and mixed-GPU environments. Ensure macOS users update to avoid crashes on interruption, and test AMD GPU workflows with Vulkan fallback enabled. Use `UNSLOTH_SMART_OFFLOAD` to experiment with advanced memory planning.  

👉 [PR #13772](https://github.com/unslothai/unsloth/pull/13772) | [PR #13756](https://github.com/unslothai/unsloth/pull/13756) | [PR #13786](https://github.com/unslothai/unsloth/pull/13786)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*