# AI 基础设施日报 2026-10-11

> 生成时间: 2026-10-11 01:11 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-11**

---

### **1. 生态概览**  
2026年第四季度的AI推理与服务格局呈现出显著的两极分化：一边是**高性能、内核优化引擎**（vLLM、SGLang、llama.cpp），另一边是**开发者友好、无差别接入网关**（Ollama、LiteLLM），而Unsloth则在微调与工作室层空间中崭露头角。各项目普遍面临关键稳定性问题——尤其是推测解码、CUDA图和前缀缓存方面，表明性能提升正以成熟度为代价。模型兼容性竞赛愈演愈烈，Qwen3.8、DeepSeek-V4.1、MiniCPM-V 4.7以及GLM5-next的新支持已上线或即将发布。与此同时，硬件多样化加速推进：AMD MI355X、NVIDIA Blackwell（SM120/SM121）、Intel Arc B70及Apple M系列芯片均在积极优化中。

---

### **2. 活动对比**

| 项目       | 问题（开放） | PR（近期） | 发布状态         |
|---------------|----------------|----------------|--------------------------|
| vLLM          | 69             | 24             | 稳定版（`v0.31.0`）；暂无新版本 |
| SGLang        | 52             | 18             | 稳定版（`v0.5.16`）；暂无新版本 |
| llama.cpp     | 78             | 22             | `b11552+` 已发布；修复关键并发缺陷 |
| Ollama        | 63             | 12             | 无新版本；API格式发生破坏性变更 |
| LiteLLM       | 56             | 15             | 无新版本；OpenAI v3+ 兼容性待定 |
| Unsloth       | 81             | 14             | 无新版本；依赖更新已合并 |

> 🔍 *洞察*：尽管PR数量较低，**vLLM 和 llama.cpp** 在技术深度和修复速度上领先，而**Ollama 与 LiteLLM** 更专注于集成打磨和兼容性迁移。

---

### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-2.4T-A95B**     | ✅ (AMD ROCm) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.8-Flash-Next**    | ✅ (NVFP4, DFlash2) | ✅ (AMD mono-decode) | ✅ | ❌ | ❌ | ❌ |
| **DeepSeek-V4.1**         | ✅ (CUDA graph 修复) | ✅ (DSpark + mono-decode) | ✅ | ✅ | ❌ | ❌ |
| **MiniCPM-V 4.7**         | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **GLM5-next**             | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Prism Bonsai 2 27B**    | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **K2 Horizon (MoE)**      | ❌ | ❌ | ❌ | ✅ (待定) | ❌ | ❌ |
| **EmbeddingGemma 2**      | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

> 🏆 **胜者**：**llama.cpp** 在原始模型支持广度上领先，尤其在小众与新兴架构（如 MiniCPM-V、GLM5-next）方面表现突出。  
> 🥈 **亚军**：**SGLang** 与 **Ollama** 在通过早期支持 DeepSeek-V4.1 及 Qwen3.8 变体推动真实场景落地方面展现出强劲势头。

---

### **4. 性能前沿**

| 优化重点           | vLLM               | SGLang              | llama.cpp           | Ollama            | LiteLLM             | Unsloth             |
|-------------------------------|--------------------|---------------------|---------------------|-------------------|---------------------|---------------------|
| **KV缓存与前缀缓存** | ✅ 关键修复（Qwen3.8-27B, DFlash2） | ✅ DSpark + CUDA Graph 复用 | ⚠️ 提示词缓存竞争条件 | ⚠️ 工具调用上下文处理 | ❌（网关层级） | ❌（UI层级） |
| **批处理与吞吐量**     | ✅ FA4稀疏MQA解码（Blackwell） | ✅ torch.compile + 扩散核 | ✅ MoE流水线并行 | ⚠️ MLX量化开销 | ❌（路由逻辑） | ❌ |
| **量化与内核效率** | ✅ MXFP4, GDN层优化 | ✅ FP8, 可拆分图 | ✅ Hexagon Q1_0, SYCL MXFP4 | ⚠️ MLX `mxfp8` 比 `bf16` 慢 | ❌ | ❌ |
| **分布式服务**       | ✅ MTP/DFlash + 异步调度 | ✅ DSpark + TP=2/4 | ❌（单卡聚焦） | ❌ | ❌ | ⚠️ 多GPU张量分片回归 |
| **内核级正确性**  | ✅ MoE调度，推测解码 | ✅ FlashInfer打包prefill | ✅ GEMM blockscale，内存安全 | ❌ | ❌ | ⚠️ FlashAttention构建不匹配 |

> 🚀 **前沿领导者**：  
> - **vLLM** 在内核正确性及Blackwell/AMD平台优化方面占据主导。  
> - **SGLang** 在运行时编译与扩散模型效率方面表现卓越。  
> - **llama.cpp** 在跨后端可移植性与底层内核创新（Hexagon、SYCL）方面领先。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 角色摘要 |
|---------------|------------------------------------|-------------|
| **vLLM**      | **推理引擎（底层）**   | 面向数据中心GPU的高吞吐、内核优化服务；面向对性能敏感的工作负载。 |
| **SGLang**    | **高性能推理运行时** | 连接引擎与应用，通过高级调度、CUDA图复用和多模型支持实现桥梁作用。 |
| **llama.cpp** | **本地运行时 / 嵌入式引擎** | 轻量级、跨平台推理引擎，适用于边缘、移动端及CPU/GPU混合部署。 |
| **Ollama**    | **模型网关 / 开发者CLI**  | 简化本地模型部署与API暴露；优先考虑易用性而非原始性能。 |
| **LiteLLM**   | **API网关 / 路由层**    | 汇聚多个后端的模型；聚焦成本追踪、护栏机制与OpenAI兼容性。 |
| **Unsloth**   | **微调工作室与UI平台** | 训练、调优与部署模型的一站式工具链——位于**训练/应用接口**层面。 |

> 📊 *战略洞察*：生态系统正逐步成熟为清晰的层级结构：**引擎（vLLM/SGLang）** → **运行时（llama.cpp）** → **网关（Ollama/LiteLLM）** → **工作室（Unsloth）**。

---

### **6. 趋势信号**

#### 🔍 **从当前活动提取的关键行业趋势**：
1. **推测解码稳定性危机**：vLLM、SGLang与llama.cpp在DFlash/MTP路径中出现严重缺陷，表明推测推理仍处于脆弱状态——尤其是在高负载或异构硬件环境下。
2. **硬件多样化加速**：AMD MI355X、NVIDIA Blackwell、Intel Arc B70及Apple M系列已成为核心目标，非事后补充，驱动后端专业化发展。
3. **内核级正确性超越速度**：项目优先解决**正确性问题**（如NaN、缓存损坏、内存泄漏），而非新增功能，反映出对生产环境就绪程度的日益关注。
4. **代理工作流要求精确性**：`ignore_eos`、前缀缓存、工具调用去重、`systemone`端点等功能揭示出向**结构化、确定性代理行为**的转变。
5. **OpenAI SDK v3+ 集成滞后**：LiteLLM无法升级至`openai<3.0.0`以上版本，凸显企业级工具链互操作性的广泛缺口。

#### 💡 **应用开发者应关注的重点**：
- 在修复落地前，**避免使用 Qwen3.8-27B（DFlash2/DSpark）与 DeepSeek-V4.1（CUDA graphs）的推测解码**。
- 针对vLLM、SGLang与llama.cpp，**务必测试夜间构建版本**——稳定版落后于关键补丁。
- **监控macOS上的MLX后端稳定性**；目前Ollama v0.40.x中的`qwen3.6:35b-mlx`存在安全隐患。
- **准备成本感知路由**——LiteLLM的`cost-based-routing`功能失效，但未来修复将实现企业级预算控制。
- **善用模型特定优化**：在MI355X上使用`SGLANG_ROCM_MONO_DECODE=1`，在llama.cpp中启用`--reclaim-mmap-source`，`VLLM_BATCH_INVARIANT=1`仅在谨慎条件下使用。

> ✅ **最终建议**：优先考虑**稳定性与正确性**，而非前沿速度。基础设施栈仍在演进中——选择工具应基于**回归鲁棒性**、**硬件覆盖范围**与**工具链成熟度**，而非仅看峰值吞吐。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-11**

---

### **1. 今日亮点**  
vLLM 项目持续聚焦在多种硬件上的稳定性与性能表现，针对 **DFlash2/DSpark + Qwen3.8-27B (NVFP4) 的前缀缓存** 以及 **CUDA Graph 下 DeepSeek-V4.1 的 NaN 问题** 进行了关键修复。新提交的 PR 解决了推测解码和批量不变性下的 MoE 分发在内核层面的正确性问题，同时正在进行针对 **AMD MI355X (gfx950)** 和 **Blackwell SM120/SM121** 平台的优化工作。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布或破坏性变更。*  
- `v0.31.0` 版本仍处于活跃状态；建议用户关注问题 #60174，以监控 DFlash2/DSpark + Qwen3.8-27B 前缀缓存相关的潜在回归问题。  
- 最近的 PR 未引入任何 API 或配置变更；`VLLM_BATCH_INVARIANT=1` 的行为仍对内核选择逻辑敏感（参见 #61038, #61036）。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 优化**：正在为 `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` 与 `amd/Qwen3.8-Flash-Next-Quark-MXFP4` 在 **MI355X (gfx950)** 上进行优化工作，性能追踪通过问题 #57149 与 #59575 进行。  
- **NVIDIA Blackwell (SM120/SM121)**：PR #55866 扩展了内核支持，使 GB10/GB300 GPU 上可启用 **FA4 稀疏 MQA 解码**。  
- **Intel GPU**：正在调查 **Intel Arc B70 (Battlemage)** 在并发负载下出现卡死的问题（#54698）。  
- **新模型支持**：未直接新增模型；但 DeepSeek-V4.1 已获得针对 CUDA Graph 与流式处理的专用修复（#61039, #58412）。

---

### **4. 性能与优化**  
- **Qwen3.8-2.4T-A95B (gfx950)**：已启动性能优化路线图（#57149），目标是更好地利用 MXFP4 MoE 与 GatedDeltaNet。  
- **DeepSeek-V4.1**：PR #61039 引入 **长度感知候选块选择**，减少不必要的缓冲区写入，提升解码效率。  
- **GDN 层**：PR #61034 移除了急进预填充路径中的冗余主机端 PyTorch 操作，消除混合步骤中的延迟开销（无数值变化）。  
- **FlashInfer / FA4**：PR #55866 在 Blackwell GPU 上启用了 **稀疏 MLA 解码**，为长上下文模型解锁更高吞吐量。  
- **KV 缓存分组**：RFC #58638 提出改进方案，用于具有推测草稿器的混合模型，以减少缓存碎片。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|-----------|
| 🔴 严重 | [#60174](https://github.com/vllm-project/vllm/issues/60174) | DFlash2/DSpark + 前缀缓存在 Qwen3.8-27B NVFP4 (sm_120) 上缓存命中后导致输出损坏 | ⚠️ 正在修复 |
| 🔴 严重 | [#57156](https://github.com/vllm-project/vllm/issues/57156) | DeepSeek-V4.1 在使用 CUDA Graph 时因空 KV 块污染产生 NaN | ✅ PR 正在评审（修复包含于 #61039, #61036） |
| 🟡 高 | [#59770](https://github.com/vllm-project/vllm/issues/59770) | 从 v0.29.0 起，Nemotron-3.5-Lightning（DGX Spark, NVFP4）解码速度下降约 16% | ⚠️ 正在调查 |
| 🟡 中 | [#57838](https://github.com/vllm-project/vllm/issues/57838) | 在 RDNA4 (gfx1201) 上选中 RowWiseTorchFP8ScaledMMLinearKernel，导致解码时间增加 5–24% | ⚠️ 已提出临时解决方案 |

---

### **6. 对应用开发者的启示**  
- **避免在 Qwen3.8-27B (sm_120) 上使用 `--kv-cache-dtype fp8` 配合 DFlash2/DSpark**，直到修复落地——该组合可能导致输出损坏（#60174）；建议临时使用 `bfloat16` 作为替代。  
- **谨慎使用 `VLLM_BATCH_INVARIANT=1`**：可能触发次优的内核选择（如旧版 MoE 内核），导致性能下降或行为异常——请通过确定性测试验证结果（#61038, #61036）。  
- **对于代理与 RAG 工作负载**：需显式开启前缀缓存；注意池化任务（`token_embed`, `token_classify`）当前会忽略前缀缓存，除非明确配置（#60947）。  
- **在流水线并行下监控推测解码行为**：当使用 `--no-async-scheduling` 配合 MTP/DFlash 时存在缺陷（#52071, #54360）；建议优先采用异步调度以确保稳定。  
- **充分利用新兴优化**：对于 AMD MI355X 或 NVIDIA Blackwell 平台，预计后续 PR 将带来性能提升——建议使用 `qwen38-2.4T-A95B` 与 `nemotron-3.5-lightning` 基准进行测试。

> 💡 *实用提示*：使用 `python collect_env.py` 可帮助调试环境相关问题。评估新功能或回归修复时，务必在夜间构建版本上进行测试。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-10-11**

---

### **1. 今日重点**  
SGLang 生态系统在高性能推理与扩散模型服务方面持续成熟，针对 TP8 系统上的 DSpark 伪编码（speculative decoding）关键稳定性修复已落地，同时正在推进复杂模型路径下 CUDA Graph 复用的稳定性优化。新提交的 PR 主要聚焦于提升扩散模型（Qwen-Image-2.1、Cosmos3）对 torch.compile 的兼容性，并为 SANA-Video 2.0 开启可中断图支持；此外，一项关键修复确保了在预填充（prefill）准入阶段正确处理 `ignore_eos` 请求。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
无新发布版本或破坏性 API/配置变更。v0.5.16 版本仍保持稳定，但 DSpark 及大解码量 CUDA Graph 捕获相关若干已知问题依然存在（参见 #33356, #31023）。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 支持**：为 *DeepSeek-V4.1-Flash* 在 gfx950（MI355X）上新增可选的单解码路径，通过设置 `SGLANG_ROCM_MONO_DECODE=1` 启用。需在不启用 DP/EP 的前提下使用 TP=2/4。
- **扩散模型**：SANA-Video 2.0 现已支持可中断 CUDA Graph（#41501），负向提示词缓存优化工作持续推进中（#43630）。
- **新兴后端**：Moore Threads（MUSA）GPU 支持开发持续进行中（#16565），社区关注度逐步上升。

> 🔗 [PR #43497](https://github.com/sgl-project/sglang/pull/43497) | [Issue #16565](https://github.com/sgl-project/sglang/issues/16565)

---

### **4. 性能与优化**  
- **torch.compile 优化**：多项 PR 针对扩散模型中的性能下降问题：
  - Qwen-Image-2.1：通过保持完整图结构避免注意力核函数中的图断裂（#43586）
  - Cosmos3：在编译过程中保留融合核函数，防止出现 50% 以上的性能下降（#43577）
  - Z-Image：跳过有问题的多核拾取缓存以防止启动崩溃（#43601）
- **调度器优化**：改用前向次数而非墙钟时间控制等待前缀刷新频率，避免 LRU 缓存偏差（#43512）
- **内核效率**：在 torch 采样器中仅对 top_k 列进行排序，降低每步开销（#43346）

> 🔗 [PR #43586](https://github.com/sgl-project/sglang/pull/43586) | [PR #43577](https://github.com/sgl-project/sglang/pull/43577) | [PR #43512](https://github.com/sgl-project/sglang/pull/43512)

---

### **5. 稳定性与回归问题**  
今日报告多个关键正确性与稳定性问题：

| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|------------|
| ⚠️ 高 | [#43402](https://github.com/sgl-project/sglang/issues/43402) | 请求在执行前被中止时，`--mm-feature-transport cuda_vmm` 导致 CUDA VMM 传输切片泄漏 | 开放 |
| ⚠️ 高 | [#43615](https://github.com/sgl-project/sglang/issues/43615) | FlashInfer 压缩预填充对单标记批次失败，因 `total_tokens > num_sequences` 判定错误 | 已在 PR #43629 中修复 |
| ⚠️ 中 | [#43413](https://github.com/sgl-project/sglang/issues/43413) | `--enable-deterministic-inference` 无法使混合 Mamba2 模型实现批处理不变性 | 开放 |
| ⚠️ 中 | [#42917](https://github.com/sgl-project/sglang/issues/42917) | Qwen3.8-27B W4A16 压缩张量质量下降（PPL 9.98 vs vLLM 的 6.05） | 开放 |
| ⚠️ 低 | [#43526](https://github.com/sgl-project/sglang/issues/43526) | gfx942 FP8 GEMM blockscale 内核存在精度问题 | 开放 |

> 🔗 [Issue #43402](https://github.com/sgl-project/sglang/issues/43402) | [PR #43629](https://github.com/sgl-project/sglang/pull/43629)

---

### **6. 对应用开发者的影响**  
- **谨慎使用 `--enable-torch-compile`** 与 Qwen-Image-2.1、Cosmos3 等扩散模型配合——虽可加速推理，但不当编译可能导致崩溃或性能退化。建议通过 `TORCH_LOGS=graph_breaks` 监控图断裂情况。
- **避免在 flashinfer 后端使用 `dtype=float32`**——当前会触发硬性失败（修复于 #43628），防止静默错误发生。
- **注意 `ignore_eos` 与前缀缓存机制**——近期修复确保了预填充准入阶段的正确令牌预算分配，影响长周期生成任务流程。
- **使用 CUDA VMM 的多模态应用**：若请求提前中止，可能出现内存泄漏；请在 #43402 修复前，自行实现客户端超时或重试逻辑。
- **考虑启用 AMD 特定优化**（如 `SGLANG_ROCM_MONO_DECODE=1`）用于 MI355X 上的 DeepSeek-V4.1，但需确认 TP 设置约束。

> ✅ **行动项**：升级至最新 main 分支，以获取 DSpark 正确性修复与 torch.compile 优化收益。关注 CI 状态，请查看 [CI 跟踪问题 #17050](https://github.com/sgl-project/sglang/issues/17050)。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-11**

---

### **1. 今日重点**  
最新发布周期引入了在并发负载下对推测解码和提示缓存的关键稳定性修复，解决了繁忙槽位在生成过程中被覆盖的竞态条件问题。新增模型支持包括 **MiniCPM-V 4.7** 和 **GLM5-next**，目前正持续优化各后端的 MoE 与 DFlash 性能。

---

### **2. 发布与破坏性变更**  
- **`b11552`**：修复 `llama-server` 中的一个并发缺陷，该问题导致在提示缓存淘汰期间，固定占用的忙碌槽位被错误更新（#30295）——当多个请求共享同一槽位时，可能引发生成状态损坏。  
  🔗 [PR #30295](https://github.com/ggml-org/llama.cpp/pull/30295)  
- **`b11551`**：新增对 **MiniCPM-V 4.7** 的完整运行时支持，包含 MROPE 时间处理及更新后的转换脚本。  
  🔗 [PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416)  
- **`b11550`**：为 s390x 平台禁用 z17 目标以避免不支持的编译器导致构建失败。  

> ✅ **迁移提醒**：依赖推测解码并使用 `--cache-ram` 或高并发 `llama-server` 的用户应升级至 `b11552+`，以避免潜在的上下文污染。

---

### **3. 新模型与硬件支持**  
- **模型**：  
  - ✅ **MiniCPM-V 4.7**（通过 `minicpm-v` 架构）  
  - ✅ **GLM5-next**（通过 PR #30268 支持输入层嵌入）  
  - ✅ **DeepSeek-V4.1**（新增为 `deepseek41` 架构；含转换脚本与聊天模板）  
  - ✅ **Prism Bonsai 2 27B**（已添加运行时支持）  
- **后端与量化**：  
  - ✅ **Hexagon**：通过 HVX 原生支持 `Q1_0`（32x1、32x2、2D/4D 矩阵向量运算工作线程）。  
  - ✅ **OpenCL**：改进 FlashAttention（`dk=512`）用于 Gemma-4（GQA=4/8），实现 GPU 卸载且无需回退。  
  - ✅ **SYCL**：通过算术解码与权重重排加速 MXFP4 MoE（#29809）。  
  - ✅ **Vulkan**：增强 coopmat1 int8 矩阵乘法，加入边界钳制以防止越界访问。  

> 🔗 [PR #30122](https://github.com/ggml-org/llama.cpp/pull/30122) | [PR #30266](https://github.com/ggml-org/llama.cpp/pull/30266)

---

### **4. 性能与优化**  
- **MoE 流水线并行**：PR #29963 实现即使专家位于主机内存中（`--cpu-moe`, `-ot`），MoE 模型也能启用流水线并行。这在保持 GigaChat 3.5 等大型 MoE 模型吞吐量的同时，显著降低显存压力。  
- **FlashAttention 优化**：  
  - 通过 OpenCL 支持 `dk=512` 用于 Gemma-4（GQA=4/8）——避免回退至 CPU。  
  - `dk=64` 对 `gpt-oss-20b`（GQA=8）性能进一步提升。  
- **内存效率**：  
  - `--reclaim-mmap-source`（PR #24156）在 Qwen3-30B-A3B 上将 RSS 减少高达 **37%**（节省 13 GiB）。  
  - `llama-server` 中引入引用计数检查点（PR #30137），在多请求场景中减少内存重复。  

> 🔗 [PR #29963](https://github.com/ggml-org/llama.cpp/pull/29963) | [PR #30137](https://github.com/ggml-org/llama.cpp/pull/30137)

---

### **5. 稳定性与回归问题**  
今日报告的关键问题：  
1. **AMD Vulkan (gfx1010) 崩溃**：在混合 GDN 模型上，`b10455` 与 `b11429` 之间提示处理性能下降约 45%。  
   🔗 [Issue #30039](https://github.com/ggml-org/llama.cpp/issues/30039)  
2. **gfx1151 (Strix Halo) 隐式推理损坏**：HIP 后端在 Qwen3.5-27B（Gated-DeltaNet）中丢失最旧上下文——可通过 `test-backend-ops` 复现。  
   🔗 [Issue #27556](https://github.com/ggml-org/llama.cpp/issues/27556)  
3. **ROCm/HIP 上 FlashAttention 预填充结果非确定性**：自 `b10905` 起，多模态 Qwen3.5-9B 输出不一致。  
   🔗 [Issue #30175](https://github.com/ggml-org/llama.cpp/issues/30175)  
4. **CUDA 在 Qwen3.8-Flash-Next-MTP 下崩溃**：长时间对话中出现“bad allocation”错误。  
   🔗 [Issue #30091](https://github.com/ggml-org/llama.cpp/issues/30091)  

> ⚠️ **注意**：多个回归问题与推测解码（`MTP`, `DFlash`）及 MoE 路径相关——使用这些特性的开发者应测试 `b11552+` 版本。

---

### **6. 对应用开发者的启示**  
- 若在高并发下运行 `llama-server` 或使用 `--cache-ram`，请立即使用 `b11552+` —— 防止无声的上下文污染。  
- 在 Linux 上启用 `--reclaim-mmap-source`，可显著降低生产部署中的内存占用。  
- 对于 MoE 模型：使用 `--cpu-moe` + 流水线并行（PR #29963），可在不牺牲吞吐量的前提下突破显存限制。  
- 在解决 Issue #30091 前，请避免对 `Qwen3.8-Flash-Next` 使用 `--spec-type draft-mtp` —— 长会话中可能出现崩溃。  
- 在 AMD/Intel 硬件上，建议使用 OpenCL/SYCL 编译以获得最佳性能：新内核提升了 FlashAttention 与 MoE 效率。  

> 📌 **行动项**：关注 [Changelog Issues](https://github.com/ggml-org/llama.cpp/issues/9291)，以获取影响代理工具的即将发布的 REST API 变更信息。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-11**

---

### **1. 今日亮点**  
Ollama 生态系统持续演进，关键改进集中在模型兼容性与流式协议保真度方面，尤其在 Qwen3 工具调用和 OpenAI 兼容 API 平行性上。针对 MLX 后端性能与稳定性问题——特别是 Apple M 系列芯片上 `qwen3.6:35b-mlx` 的严重退化——目前正进行积极排查。与此同时，通过 llama.cpp v1.15.2 推进决策模型支持的 PR 正在进展中，并优化多模态及推理密集型工作流中的提示渲染。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
但 `main` 分支正在进行以下变更：
- **API 通信格式对齐**：`/v1/completions` 现在完全匹配 OpenAI 的流式格式（PR #18914）。
- **模型标签显示调整**：`ollama list`、`/api/tags` 和 `/v1/models` 默认不再显示 `:latest`（PR #18915）。
- **工具调用处理优化**：重放工具调用时，空的 `arguments` 字段现在被接受（PR #18913）。

> 🔗 [PR #18915](https://github.com/ollama/ollama/pull/18915) | [PR #18914](https://github.com/ollama/ollama/pull/18914) | [PR #18913](https://github.com/ollama/ollama/pull/18913)

---

### **3. 新模型与硬件支持**  
- **K2 Horizon 模型**（IFM）：请求通过 GGUF 支持 `k2-horizon` 架构（0.9B–36B MoE），当前待处理（Issue #18696）。
- **KailA 架构**：提议增加对 `kail` GGUF 模型的支持（Issue #18922）。
- **决策模型**：通过更新的 llama.cpp b11521 完全集成（PR #18917），直接启用 `/v1/systemone` 接口。
- **EmbeddingGemma 2**：现已通过更新的 llama.cpp 原生支持（PR #18917）。

> 🔗 [Issue #18698](https://github.com/ollama/ollama/issues/18698) | [Issue #18922](https://github.com/ollama/ollama/issues/18922) | [PR #18917](https://github.com/ollama/ollama/pull/18917)

---

### **4. 性能与优化**  
- **MLX 量化开销**：在 M5 Pro 上，量化后的 K2/MXL 模型（如 `mxfp8`）在预填充阶段比 `bf16` 更慢（Issue #18833）。
- **上下文处理优化**：改进 Qwen3.5 流中部分工具调用标签的解析（PR #18759），减少长对话中结构化输出丢失。
- **设备探测回退机制**：当 `llama-server --list-devices` 返回空结果时，Ollama 现在将回退至原生 GGML 探测结果（PR #18923），提升设备发现可靠性。

> 🔗 [Issue #18833](https://github.com/ollama/ollama/issues/18833) | [PR #18759](https://github.com/ollama/ollama/pull/18759) | [PR #18923](https://github.com/ollama/ollama/pull/18923)

---

### **5. 稳定性与回归问题**  
**严重问题（高危）**  
- **MLX Runner 崩溃**：`qwen3.6:35b-mlx` 在 macOS 上于 v0.40.x 版本出现 `panic: mlx` 崩溃（自 v0.35.0 回退）——已在 M5/M6 Mac 上复现（Issue #18856）。  
  > 🔗 [Issue #18856](https://github.com/ollama/ollama/issues/18856)  
- **Qwen3.5 4B 仅思考模式**：长时间对话返回 `thinking` 但无内容或工具调用，尽管 `done_reason: "stop"` 成功触发（Issue #18916）。  
  > 🔗 [Issue #18916](https://github.com/ollama/ollama/issues/18916)  
- **GGML 断言失败**：升级后 `rnj-1` 抛出 `GGML_ASSERT(hparams.is_swa_any()) failed` 错误（Issue #18924）。  
  > 🔗 [Issue #18924](https://github.com/ollama/ollama/issues/18924)  

**中等严重性**  
- **重复模型条目**：本地兼容 GGUF 迁移后，`ollama list` 显示重复模型及无效的 `llamacpp:<sha>` 标签（Issue #18830）。  
  > 🔗 [Issue #18830](https://github.com/ollama/ollama/issues/18830)  
- **Windows NTFS 挂载路径缺陷**：当模型路径为 NTFS 挂载点时，`ollama list` 返回空结果（Issue #18921）。  
  > 🔗 [Issue #18921](https://github.com/ollama/ollama/issues/18921)  

> ✅ *修复进行中*：PR #18856 与 #18916 正在调查中；暂无补丁。

---

### **6. 对应用开发者的影响**  
- **在 v0.40.x 版本的 macOS 上避免使用 `qwen3.6:35b-mlx`**，直到 MLX 崩溃问题修复——可临时回退至 v0.35.0 及更早版本。
- **重放历史记录时验证工具调用负载**：预期空的 `arguments` 字段将被接受（#18913 即将上线）。
- **期待更清晰的模型列表**：#18915 合并后，CLI 与 API 中将显示 `llama3.1` 而非 `llama3.1:latest`。
- **设计具备鲁棒性的设备发现逻辑**：若 GPU 探测静默失败，应启用 `--list-devices` 回退机制（通过 #18923）。
- **准备采用决策模型**：通过更新的 llama.cpp 使用 `/v1/systemone` 接口（PR #18917），适用于实时代理动作场景。

> 📌 *建议*：密切关注 PR #18856 与 #18916——这些直接影响 Apple Silicon 上生产级推理的可靠性。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-10-11**

---

### **1. 今日重点**  
LiteLLM 生态系统持续扩展对高级 AI 工作流的支持，关键修复了 OpenTelemetry 集成以及实时与批量场景下的守卫机制处理。今日的重点 PR 聚焦于稳定 `decisions` 与 `systemone` 端点，确保准确的成本追踪和正确的响应桥接——这对企业级代理系统至关重要。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，**OpenAI SDK v3+ 兼容性** 的持续工作仍是主要障碍：多个问题（如 [#40317](https://github.com/BerriAI/litellm/issues/40317), [#37907](https://github.com/BerriAI/litellm/issues/37907)）表明，`litellm` 仍固定使用 `openai<3.0.0`，阻止与现代工具链集成。此问题预计将在后续版本中解决。

---

### **3. 新模型与硬件支持**  
- ✅ **MiniMax Messages API**：通过 [PR #45896](https://github.com/BerriAI/litellm/pull/45896) 添加 — 支持原生 Messages 格式，包含工具负载、缓存提示和认证。
- ✅ **腾讯 Messages API**：通过 [PR #45899](https://github.com/BerriAI/litellm/pull/45899) 合并原生支持，可直接路由结构化消息。
- ✅ **Microsoft Decision 1**：功能请求已提出 ([#45807](https://github.com/BerriAI/litellm/issues/45807)) — 待实现；将支持通过 `openai/gpt-6-luna` 部署 Azure Foundry。
- ✅ **DeepSeek V4 Flash Responses API**：功能请求 ([#35648](https://github.com/BerriAI/litellm/issues/35648)) — 计划未来支持，以简化高吞吐推理流程。

---

### **4. 性能与优化**  
- **批量与流式效率**：关键改进在响应桥接方面：
  - [PR #45812](https://github.com/BerriAI/litellm/pull/45812)：修复从 Responses API 转换为 Chat Completions 时，`reasoning` 项和 `url_citation` 注释的静默丢失问题。
  - [PR #45818](https://github.com/BerriAI/litellm/pull/45818)：确保完整的内容块（包括引用）被保留，消除 Mistral 响应中的截断问题。
- **成本与路由准确性**：
  - [PR #45904](https://github.com/BerriAI/litellm/pull/45904)：使用各提供商特定的成本映射条目正确计费 `/v1/decisions` 与 `/v1/systemone`，避免费用归属错误。
  - [PR #45902](https://github.com/BerriAI/litellm/pull/45902)：新增集成测试，验证跨提供商支出日志的准确性。

---

### **5. 稳定性与回归问题**  
今日报告的高严重性问题包括：

| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| [#45718](https://github.com/BerriAI/litellm/issues/45718): `cost-based-routing` 导致同步 Router 方法失效 | ⚠️ 关键 | 开放 | 无 |
| [#45895](https://github.com/BerriAI/litellm/issues/45895): 成功调用后未通过数据库进行预算预留 | ⚠️ 高 | 开放 | 无 |
| [#45736](https://github.com/BerriAI/litellm/issues/45736): 流式读取过早导致 OpenTelemetry span 缺失 | ⚠️ 中等 | 开放 | 无 |
| [#45796](https://github.com/BerriAI/litellm/issues/45796): 工具调用响应被记录为空消息 | ⚠️ 中等 | 开放 | 无 |
| [#45787](https://github.com/BerriAI/litellm/issues/45787): 因 URL 中包含 `predict` 子串导致误路由至 Vertex AI | ⚠️ 中等 | 开放 | 无 |

> 🔥 **注意**：`cost-based-routing` 的回归问题影响所有同步调用——即使存在一个健康部署也完全不可用，需待修复后方可使用。

---

### **6. 对应用开发者的启示**  
- **暂勿使用 `cost-based-routing`**，直至 [#45718](https://github.com/BerriAI/litellm/issues/45718) 修复——在高负载下可能导致应用无声失败。
- **验证 OpenTelemetry 仪器化**：若使用流式响应，请确保客户端读取完整流，以捕获完整的 span 及工具调用元数据。
- **谨慎使用自定义认证 + 预算控制**：若依赖 `max_budget` 但无数据库支持，预期可能出现支出不一致问题 ([#45895](https://github.com/BerriAI/litellm/issues/45895))。
- **即将获得更精准的成本核算**：新的 `decisions` 与 `systemone` 计费逻辑 ([#45904](https://github.com/BerriAI/litellm/pull/45904)) 将确保决策模型费用正确归账。
- **准备迁移至 OpenAI v3+**：固定 `openai<3.0.0` 会限制互操作性——请关注 [#40317](https://github.com/BerriAI/litellm/issues/40317) 获取更新。

👉 *实用提示*：可在上线前，使用 [PR #45896](https://github.com/BerriAI/litellm/pull/45896) 与 [PR #45899](https://github.com/BerriAI/litellm/pull/45899) 在预发环境测试 MiniMax/Tencent 集成。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-11**

---

### **1. 今日亮点**  
Unsloth 项目持续推进多 GPU 推理与微调能力的优化，针对高端硬件（如 RTX PRO 6000、B200）上的长上下文聊天延迟和 GPU 内存管理问题修复了关键缺陷。重点 PR 集中于 Studio UI 性能优化，包括提升滚动响应速度、降低空闲状态下的 CPU 占用率。Unsloth Studio 新增的 `Recommended` 模型筛选器通过基于兼容性和质量的模型精选机制，显著提升了模型发现效率。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，多个依赖项更新已通过自动化机器人合并：  
- **PR #13252** 与 **#13064** 更新核心 Python 依赖（`typer`、`fastapi`、`pydantic`、`huggingface-hub`、`uvicorn`、`datasets`），以确保与现代环境的兼容性。  
- **PR #13247** 修复了一个关键问题：旧版 FlashAttention 构建导致在 CUDA 12 主机上 `diffusers` 流水线失败，通过将 `torch 2.9` 与 `torchao 0.15.0` 配对解决。[GitHub PR #13247](https://github.com/unslothai/unsloth/pull/13247)

---

### **3. 新模型与硬件支持**  
- **Qwen3-TTS**：功能请求 **#3951** 要求增加微调支持——目前待处理。  
- **AMD ROCm**：多项问题反映出 AMD GPU（Radeon W7900/W7500）仍存在持续挑战，包括显存管理错误（**#7449**、**#10341**）以及双 R9700 设备训练失败（**#10657**）。  
- **Intel GPU 硬件绑定**：关于 Studio 中 Intel GPU 支持的文档请求（**#12836**）仍未解决。  
- **GGUF 模型**：由于 llama.cpp 中架构不匹配（`qwen4exp`），Qwen3.8-Flash-Next-GGUF 模型仍不受支持（**#10015**）。

---

### **4. 性能与优化**  
- **推理速度**：**#12468** 报告了一次回归问题——在两块 RTX 5070 Ti GPU 上使用张量拆分推理时，吞吐量从约 115 tokens/s（b10715 前）下降至约 48 t/s（b10715-mix-86bd2d3 后），可能源于 CUDA graph 限制变更（`max_cuda_graphs = 64`）。  
- **UI 响应性**：**PR #13255** 解决了长对话中大响应、代码块和 LaTeX 内容导致的严重性能下降问题，该问题曾引发 UI 冻结与输入延迟。  
- **内存效率**：**PR #13256** 确保缓存的 Llama/Qwen3 注意力路径正确处理填充掩码，防止因左填充提示导致生成结果错误。  
- **模型卸载**：**PR #13254** 在启用 DoRA 时跳过融合 LoRA 核函数，修复了训练输出中无声的幅度失真问题。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR？ | 链接 |
|------|----------|--------|---------|------|
| RTX PRO 6000 上出现 `RuntimeError: illegal memory access` | 严重 | 已关闭 | 否 | [#3921](https://github.com/unslothai/unsloth/issues/3921) |
| Windows 10 + GeForce RTX 环境下长上下文聊天延迟 | 高 | 已关闭 | 否 | [#12552](https://github.com/unslothai/unsloth/issues/12552) |
| Windows 11 + ROCm 环境下空闲时 CPU 占用率达 95% | 严重 | 已关闭 | 是 | [#12942](https://github.com/unslothai/unsloth/issues/12942) |
| 尽管勾选“无内存卸载”，模型仍滞留在 RAM（ROCm） | 高 | 未解决 | 否 | [#10341](https://github.com/unslothai/unsloth/issues/10341) |
| 工具调用去重阻止合法的重复工具调用 | 中等 | 已关闭 | 是 | [#10379](https://github.com/unslothai/unsloth/issues/10379) |

> ✅ **注意**：多个稳定性修复已通过 PR 发布（如 **#12942**、**#10379**），但尚未包含在已发布的版本中。

---

### **6. 对应用开发者的意义**  
- 若使用多 GPU 张量拆分，请避免 b10715-mix-86bd2d3+ 版本——在 RTX 5070 Ti 上预计推理速度下降高达 **~58%**。建议回退至早期构建或关注热修复。  
- 使用 AMD ROCm 时，务必正确配置卸载设置：若使用高显存 GPU（W7900/W7500），请显式禁用内存卸载。  
- 配置多 GPU 部署时，请手动指定 `--split-mode layer` —— 默认的 `tensor` 模式可能导致行为歧义（**#10549**、**PR #10770**）。  
- 加载 GGUF 变体前请验证兼容性——当前 Unsloth Studio 尚不支持新版 Qwen 架构（如 `qwen4exp`）。  
- 善用 Studio 新增的 `Recommended` 模型筛选器，以获取更优的兼容性与性能表现模型。  
- 对外部模型而言，即使工具设置被隐藏，其配置仍保持激活状态——用户需通过后端逻辑调整预算（**PR #13251**）。

> 🔗 **可操作链接**：  
> - [修复：空闲时 CPU 旋转问题（PR #12942）](https://github.com/unslothai/unsloth/issues/12942)  
> - [性能：滚动延迟修复（PR #13255）](https://github.com/unslothai/unsloth/pull/13255)  
> - [依赖项更新（PR #13252）](https://github.com/unslothai/unsloth/pull/13252)

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*