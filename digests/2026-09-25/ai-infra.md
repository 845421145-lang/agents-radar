# AI 基础设施日报 2026-09-25

> 生成时间: 2026-09-25 00:43 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-25**

---

### **1. 生态概览**

2026年第三季度，AI推理与服务生态正迅速成熟，表现为硬件深度专业化、激进的内核级优化，以及本地运行时、分布式引擎与云网关之间日益增强的融合。各项目正聚焦于在多样化后端（如RTX 50系列、AMD MI355X、ROCm 10、NPU平台）上支持下一代模型（如GLM-5.3、Kimi-K3、Qwen3.8-Flash），同时解决推测性解码、KV缓存完整性及长上下文性能中的关键稳定性缺陷。向模块化、跨平台基础设施的转变已十分明显，vLLM、SGLang与Unsloth在多引擎支持和后端抽象方面持续突破边界。

---

### **2. 活动对比**

| 项目 | 开放问题 | 最近24小时合并的PR | 发布版本 | 状态 |
|--------|-------------|-------------------------|----------|--------|
| **vLLM** | 127 | 6 | 无 | 稳定，高优先级稳定性修复 |
| **SGLang** | 114 | 8 | 无 | 积极优化与新后端集成 |
| **llama.cpp** | 142 | 5 | v0.25.3（小版本） | 存在严重回归问题；亟需紧急修复 |
| **Ollama** | 108 | 3 | 无 | API已弃用 + 内存/性能问题 |
| **LiteLLM** | 98 | 4 | 无 | 关键成本核算漏洞正在审查中 |
| **Unsloth** | 135 | 7 | 无 | 快速拓展至新硬件/后端 |

> 🔍 *观察*：尽管无新发布，所有项目活动仍保持高位——尤其集中在稳定性修复（vLLM、llama.cpp、Ollama）与架构创新（Unsloth、SGLang）。无发布表明各项目正专注于内部质量提升，再进行面向公众的更新。

---

### **3. 模型支持竞赛**

| 项目 | 新增支持模型/架构 | 关键进展 |
|--------|--------------------------------------|------------------|
| **vLLM** | RTX 50系列（sm120）、AMD MI355X（gfx950）、Kimi-K3、GLM-5.3-Flash | sm120下完整`TP=2/4/8`矩阵乘法调优；针对推测性解码的ROCm专项优化 |
| **SGLang** | Qwen3.8-Flash-Next、Qwen-Image-2.1、DeepSeek-V4.1、Lark语法（XGrammar） | FlyDSL GDN预填充后端（AMD）；Triton图捕获改进 |
| **llama.cpp** | Prism PQ2_0、PTQ1_0、Hexagon NPU（Windows Arm64）、Intel Vulkan | Metal/MetalGraph修复；CUDA稀疏FA优化；AVX-512 VNNI+VBMI用于Q4_K |
| **Ollama** | GraniteForCausalLM（MLX）、gemma4:31b、qwen3.8:27b（MLX）、Arm上的Windows | 扩展AMD GPU支持；ARM CPU优化；MLX运行器稳定性提升 |
| **LiteLLM** | Fireworks DeepSeek-V4P1-Flash（仅限美国）、Azure FLUX.2-flex编辑图像、Sail提供商 | 成本映射与官方定价同步；增强流式元数据支持 |
| **Unsloth** | AMD ROCm 10（公告）、RyZEN AI NPU（XDNA 2）、vLLM/SGLang引擎可选集成 | NVFP4图像生成加速；FP4专用FlashInfer；Qwen-Image-2.1流水线追踪 |

> 🏆 **领先者**：**Unsloth** 在 *硬件多样性* 上领先，支持NPU、ROCm 10及vLLM/SGLang集成。**vLLM** 在主流推理（RTX 50系列、MI355X）的 *模型/硬件覆盖* 上领先。**SGLang** 在 *高级架构支持*（DCP、Helix、XGrammar）方面表现卓越。

---

### **4. 性能前沿**

优化工作现集中于四大核心领域：

| 领域 | 领先项目 | 关注重点 |
|-------|------------------|------------|
| **KV缓存与内存管理** | vLLM、SGLang、llama.cpp | 修复损坏问题（vLLM #53912）、静默CPU回退（llama.cpp #28633）、泄漏缓解（Ollama #18620） |
| **批处理与吞吐量** | vLLM、SGLang | 批处理无关的矩阵乘法调优（vLLM #58495）、FFN缩减（SGLang #41200–#41193） |
| **量化与内核融合** | llama.cpp、Unsloth、SGLang | FP8融合（SGLang #39296）、共享专家LoRA绑定（SGLang #41074）、Q4_K_M正确性修复（llama.cpp #25618） |
| **分布式服务与并行计算** | vLLM、SGLang | 解码上下文并行（DCP）、Helix并行、非对称TP处理 |

> ⚠️ **关键缺口**：尚无项目完全解决推测性解码偏差（llama.cpp #25618、SGLang #40144）或长上下文崩溃（>80K token）——这是生产级智能体系统的主要障碍。

---

### **5. 层级定位**

| 项目 | 主要层级 | 在栈中的角色 |
|--------|---------------|--------------|
| **vLLM** | **服务引擎** | 高性能、低延迟推理；张量并行、推测性解码、MoE路由 |
| **SGLang** | **服务引擎 + 智能体框架** | 分布式推理 + 结构化输出（XGrammar），异步调度，DCP |
| **llama.cpp** | **本地运行时 / 嵌入式推理** | 以CPU/GPU/NPU为先；可移植、依赖极少；适用于边缘设备 |
| **Ollama** | **开发者网关 + 本地运行器** | 统一CLI/API；模型生命周期管理；支持MLX/ROCm/Windows |
| **LiteLLM** | **LLM网关 / 编排层** | 多提供商路由、成本控制、标签管理、支出日志、安全防护 |
| **Unsloth** | **微调 + 多后端运行时** | 训练效率、导出灵活性、硬件感知推理（NPU、ROCm、vLLM） |

> 🧩 **栈洞察**：清晰的趋势是 *分层专业化*：LiteLLM（网关）、vLLM/SGLang（引擎）、llama.cpp/Ollama（运行时）、Unsloth（训练+导出）。开发者正越来越多地组合这些层级（如Ollama → LiteLLM → vLLM）构建端到端流程。

---

### **6. 趋势信号**

基于当前活动，以下行业趋势正在浮现：

1. **硬件专业化加速推进**  
   - RTX 50系列（sm120）、AMD MI355X（gfx950）、Ryzen AI NPU（XDNA 2）、Hexagon NPU——每种硬件均需独特的内核调优与后端支持。  
   - *开发者启示*：尽早针对特定硬件堆栈优化；避免“一刀切”假设。

2. **推测性解码在大规模下仍不稳定**  
   - vLLM、SGLang、llama.cpp等多个项目存在高严重性问题，表明持续存在正确性与性能风险。  
   - *开发者启示*：在任务关键型智能体中避免使用推测性解码，直至[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)等关键问题修复。

3. **成本透明度推动企业采纳**  
   - LiteLLM对`支出日志`、`基于标签的速率限制`、`元数据校验`的关注，反映出对可审计性与合规性的日益增长需求（如欧盟《人工智能法案》）。  
   - *开发者启示*：采用标签级预算控制，并保留流式元数据以确保计费准确。

4. **智能体工作流驱动基础设施创新**  
   - XGrammar（SGLang）、工具解析（Ollama）、解析缓存（vLLM）、会话状态（SGLang）、RAG GPU开关（Unsloth）——均表明智能体逻辑正重塑基础设施设计。  
   - *开发者启示*：优先保障请求状态处理的鲁棒性、输出确定性与错误容错能力。

5. **多引擎集成是下一前沿**  
   - Unsloth的vLLM/SGLang可选支持、Ollama的MLX/ROCm混合运行器、LiteLLM的提供商路由——共同指向未来开发者将像组装微服务一样组合引擎。  
   - *开发者启示*：设计工作流时应考虑可移植性与降级逻辑。

---

> ✅ **给应用开发者的最终建议**：  
> - **用于生产级智能体**：使用 **vLLM + LiteLLM**，并仔细验证推测性解码与流式元数据。  
> - **用于边缘/设备端AI**：采用 **llama.cpp（Hexagon、Vulkan）** 或 **Unsloth（RyZEN AI NPU）**。  
> - **用于企业级编排**：部署 **LiteLLM + Ollama + SGLang**，配合细粒度标签与成本监控。  
> - **每周监控全部六个项目**——稳定性与兼容性变更可能一夜之间破坏生产流程。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-09-25

---

### **1. 今日亮点**

vLLM 项目持续推进对下一代模型与硬件的支持，关键性能优化已落地于 **RTX 50 系列（sm120）** 和 **AMD MI355X（gfx950）**。核心 PR 重点聚焦于支持多秩推理的批量不变矩阵乘法调优，减少 Mamba2 预填充阶段的冗余 GPU-CPU 同步，并提升 Kimi-K3 上的推测解码效率。与此同时，高优先级问题揭示了 GLM-5.3 Flash 在长解码场景下的稳定性隐患，以及混合 Mamba/GDN 模型中持久前缀缓存损坏的问题。

---

### **2. 发布与破坏性变更**

过去 24 小时内未报告新发布或破坏性 API/配置变更。无新版本发布，亦无重大变更。

---

### **3. 新模型与硬件支持**

- **RTX 50 系列（sm120）**：通过 [PR #58495](https://github.com/vllm-project/vllm/pull/58495) 实现了批量不变矩阵乘法表中 `TP=2/4/8` 的完整每秩形状覆盖，使消费级 Blackwell GPU 能够高效推理。
- **AMD MI355X（gfx950）**：Qwen3.8-2.4T-A95B 的性能优化跟踪器已启动 ([Issue #57149](https://github.com/vllm-project/vllm/issues/57149))，包含低并发推测 KDA 解码的内核调优 ([PR #58045](https://github.com/vllm-project/vllm/pull/58045))。
- **Kimi-K3**：ROCm 特定的推测解码与 MoE 路由优化正在进行中 ([PR #58045](https://github.com/vllm-project/vllm/pull/58045), [Issue #38175](https://github.com/vllm-project/vllm/issues/38175))。
- **GLM-5.3-Flash**：由于长解码退化问题 ([Issue #56868](https://github.com/vllm-project/vllm/issues/56868))，性能优化工作仍在进行中 ([Issue #57406](https://github.com/vllm-project/vllm/issues/57406))。

---

### **4. 性能与优化**

- **批量不变矩阵乘法调优**：在 TP=2/4/8 配置下扩展 `sm120` 支持，消除降级内核，显著提升张量并行下的吞吐一致性 ([PR #58495](https://github.com/vllm-project/vllm/pull/58495))。
- **Mamba2 预填充优化**：通过 [PR #49371](https://github.com/vllm-project/vllm/pull/49371) 移除 SSM 状态保存过程中的 GPU<->CPU 同步，大幅降低预填充密集型任务的开销。
- **ROCm 效率提升**：在细长 GEMM 路径中减少每次解码步骤 69 次无效连续拷贝 ([PR #58566](https://github.com/vllm-project/vllm/pull/58566))；跳过稀疏预填充中的非必要 logits 缓冲区清理 ([PR #51314](https://github.com/vllm-project/vllm/pull/51314))。
- **MoE 内核重构**：推进延迟 MoE 最终化模块化及遗留线性/MoE 内核迁移工作 ([PR #58635](https://github.com/vllm-project/vllm/pull/58635), [Issue #54959](https://github.com/vllm-project/vllm/issues/54959))。

---

### **5. 稳定性与回归问题**

| 严重程度 | 问题 | 描述 | 修复状态 |
|--------|-------|-------------|------------|
| 🔴 高 | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash 在累积推理步骤后出现长解码退化（W4A16 量化） | 开放；相比旧版本的回归 |
| 🔴 高 | [#53912](https://github.com/vllm-project/vllm/issues/53912) | 前缀缓存 + MTP 导致混合 Mamba/GDN 模型输出损坏（v0.28.0） | 开放；此前关闭但未修复 |
| 🟡 中 | [#57562](https://github.com/vllm-project/vllm/issues/57562) | 异步调度器 `num_output_placeholders` 在分块预填充 + 并发场景下发生下溢（自 v0.24.0 回归） | 开放；影响高吞吐异步部署 |
| 🟡 中 | [#56389](https://github.com/vllm-project/vllm/issues/56389) | DeepSeek-V4.1-Flash 在 H20（SM90）上高并发时因非法内存访问崩溃 | 已通过 `max_num_seqs=256` 缓解；仍开放 |

---

### **6. 对应用开发者的启示**

- **部署在 RTX 50 系列？** 启用 `VLLM_BATCH_INVARIANT=1` 并设置 `tensor_parallel_size > 1`——近期矩阵乘法调优确保了稳定且高性能的推理。
- **使用 GLM-5.3-Flash？** 在 [#56868](https://github.com/vllm-project/vllm/issues/56868) 修复前避免长推理链；可考虑其他量化方式或检查点变体。
- **使用混合 Mamba/GDN 模型？** 在 [#53912](https://github.com/vllm-project/vllm/issues/53912) 修复前禁用前缀缓存或避开 MTP——输出损坏问题不容忽视。
- **高并发推测解码？** 监控 `AsyncScheduler` 行为；`num_output_placeholders` 下溢可能导致流式场景中无声失败。
- **自定义工具解析器？** 可考虑利用解析器缓存 RFC ([#57571](https://github.com/vllm-project/vllm/issues/57571)) 来稳定重试期间的工具调用 ID。

> ✅ **实用提示**：建议使用 `vLLM=0.29.0+cu129` 或更高版本以获得在新型硬件上的更好稳定性，并关注 [Q3 2026 路线图](https://github.com/vllm-project/vllm/issues/48193)，了解冷启动优化与结构化输出改进进展。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-25**

---

### **1. 今日亮点**  
SGLang 生态系统持续推进下一代大模型与扩散模型的可扩展、高效率推理。关键进展包括 **解码上下文并行（DCP）** 与 **Helix 并行** 的优化，基础通信后端现已默认采用 `fi_a2a`/`a2a`。工程重点聚焦于 **DeepSeek-V4.1** 的性能优化，尤其在内核融合、FFN 简化重构及 MTP 草稿层正确性方面。此外，新增对 **XGrammar 中 Lark 语法的支持** 以及 **AMD FlyDSL GDN 预填充后端**，进一步提升了跨平台兼容性。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **新模型支持**：  
  - Qwen3.8-Flash-Next 路线图 (#38731) 正在推进中，已完成内核优化与 CPU 开销降低。  
  - 扩散模型服务路径现已完整支持 Qwen-Image-2.1 及其他图像生成模型的追踪功能 (#41192)。  
- **硬件与后端扩展**：  
  - **AMD ROCm**：通过 PR #39595 新增对 **FlyDSL GDN 预填充后端** 的支持，显著提升 gfx950 目标设备上的性能（适用于 Qwen3.5-397B TP4）。  
  - **AWS NVIDIA GPU（NIXL 与 Mooncake）**：PR #40995 正在跟踪实现 EFA SGLang 镜像开箱即用的支持。  
- **量化与格式**：  
  - 混合 Quark Qwen3.5 MTP 检查点现在可在推测解码期间正确处理量化（PR #39064）。  
  - 通过原生 FP8 集成，已将 FP8 共享专家融合扩展至 DeepSeek-V4.1（PR #39296）。

---

### **4. 性能与优化**  
- **内核级改进**：  
  - 重构了 DeepSeek-V4 系列中的 FFN all-reduce 处理逻辑（PRs #41200–#41193），减少冗余计算，并改善注意力数据并行下的可扩展性。  
  - 融合共享专家 LoRA 加载确保专家索引绑定正确（PR #41074）。  
- **吞吐量与效率**：  
  - 在 SM120（4× RTX PRO 6000，TP=4）上运行 DeepSeek-V4 dsv4 预填充时，吞吐量约为 2–7K tok/s，低于 vLLM 报告的 ~12.5K；问题仍在调查中 (#33422)。  
  - **Triton 后端**：填充解码 CUDA 图槽位的开销随上下文长度增加而上升（例如，30K token 时从 27.7 毫秒/词增至 35.9 毫秒/词）——此为已知性能瓶颈 (#41151)。  
- **推测解码**：  
  - DFLASH 草稿布局假设未经验证，导致无声的位置偏移 (#40144)；修复待完成。  
  - 在非对称 P/D TP 配置下，GLM-5.3-Flash 的草稿 KV 传输失败 (#41192)。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|---------|------|--------|------------|
| 高 | [#41192](https://github.com/sgl-project/sglang/issues/41192) | Qwen-Image-2.1 TP=2 输出受色度斑点噪声污染（TP=1 时正常）；可在 vLLM-Omni 中复现 | 开放 |
| 高 | [#41152](https://github.com/sgl-project/sglang/issues/41152) | Gemma 2/3 在 ROCm 上使用统一注意力（`aiter`）时批量生成任务失控 | 开放 |
| 中 | [#40959](https://github.com/sgl-project/sglang/issues/40959) | Anthropic `/v1/messages` 将前一轮思考内容拼接到输出中，破坏 Qwen3.8 对话模板 | 开放 |
| 中 | [#40360](https://github.com/sgl-project/sglang/issues/40360) | LMCache 会话泄漏：当请求因缓存最终化而中止时，`cache_finished_req` 绑定导致资源未释放 | 开放 |
| 低 | [#41124](https://github.com/sgl-project/sglang/issues/41124) | 重罚机制在重叠调度器下使用一步滞后的历史记录 | 开放 |

---

### **6. 对应用开发者的影响**  
- **在混合精度模型（如 GLM-5.3-Flash、Qwen3.5-MTP）上使用推测解码时需谨慎**：确保草稿布局已验证，并避免使用非对称 TP 配置，直到相关修复上线。  
- **针对 Triton 优化长上下文场景**：随着上下文增长，每词延迟将上升——可考虑调整图捕获大小或禁用填充以缓解。  
- **启用 XGrammar Lark 支持**：通过 PR #39380，可在使用复杂语法规则的智能体中实现高级提示结构化。  
- **对 AMD 用户**：利用新推出的 FlyDSL GDN 预填充后端，提升 Qwen3.5-397B 等大型 MoE 模型的吞吐表现。  
- **构建健壮的智能体逻辑**：注意 `cache_finished_req` 的泄漏风险，以及流式采样掩码中的潜在竞争条件（#40986）。  

> 📌 *实用提示*：关注 [dLLM 服务路线图](https://github.com/sgl-project/sglang/issues/39499)，获取即将推出的功能，如增量聊天提示处理 (#41148) 和可配置日志保留策略 (#41129)——这对生产级智能体系统至关重要。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-25**

---

### **1. 今日重点**  
最新更新聚焦于 Metal 与 CUDA 后端的关键稳定性修复，尤其集中在图捕获、稀疏闪注意力（FA）以及推测解码的正确性方面。针对 Intel（SYCL/Vulkan）和 Hexagon NPU 平台的关键性能优化已合并，同时正在进行批处理、量化精度及跨后端一致性方面的改进。

---

### **2. 发布与破坏性变更**  
- **ggml v0.25.2 → v0.25.3**：小幅同步发布，修复 `ggml_graph_nbytes` 中的 UBSAN 错误 ([#29396](https://github.com/ggml-org/llama.cpp/pull/29396))。无 API 变更；可安全升级。  
- **Metal 图捕获修复**：对空图提前返回，避免不必要的命令缓冲区开销 ([#29390](https://github.com/ggml-org/llama.cpp/pull/29390))。  
- **CUDA 稀疏 FA 优化**：索引现缓存于共享内存中，显著提升大上下文场景下的吞吐量 ([#29377](https://github.com/ggml-org/llama.cpp/pull/29377))。

> ✅ *预计无破坏性变更。建议升级以获得稳定性和性能提升。*

---

### **3. 新模型与硬件支持**  
- **Hexagon NPU**：通过 CI 添加 Windows Arm64 构建支持 ([#29052](https://github.com/ggml-org/llama.cpp/pull/29052))，实现 Qualcomm AI 加速器上的部署。  
- **Intel Vulkan**：新增专用预填充 FA 内核，提升 Intel GPU 上 LLM 推理性能 ([#29357](https://github.com/ggml-org/llama.cpp/pull/29357))。  
- **新量化格式支持**：正在推进对 **Prism PQ2_0（类型 142）** 和 **PTQ1_0（类型 143）** 的支持，该格式由 Ternary-Bonsai-2 模型使用 ([#29058](https://github.com/ggml-org/llama.cpp/issues/29058))。  
- **动态量化器改进**：修复 Q8_0 N=1 MUL_MAT 准确性问题及 Hexagon 上的寄存器溢出问题 ([#29395](https://github.com/ggml-org/llama.cpp/pull/29395))。

---

### **4. 性能与优化**  
- **Metal 稀疏 FA**：共享内存缓存降低长上下文场景延迟——在 `DeepSeek-V4-Flash-Vision-Exp-GGUF` 上 70K 上下文测试中表现优异 ([#29377](https://github.com/ggml-org/llama.cpp/pull/29377))。  
- **AVX-512 VNNI+VBMI 支持 Q4_K**：引入使用 `vpdpbusd` 的优化 GEMM 路径，显著提升兼容 x86_64 系统上的 CPU 推理速度 ([#29397](https://github.com/ggml-org/llama.cpp/pull/29397))。  
- **CUDA 融合优化**：将 RMS_NORM + SCALE 合并为单个内核，解决此前合并导致的约 4% 预填充性能下降问题 ([#29393](https://github.com/ggml-org/llama.cpp/pull/29393))。  
- **SYCL 图记录**：启用 SYCL 后端的图重放功能，减少重复工作负载的运行时开销 ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725))。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重程度 | 影响 | 状态 | 修复 PR |
|------|----------|--------|--------|--------|
| [#25618](https://github.com/ggml-org/llama.cpp/issues/25618)：在贪婪采样下，量化目标（`Q4_K_M`）上推测解码出现分歧 | 高 | 尽管配置相同却输出错误；影响依赖确定性输出的智能体 | 开放 | ❌ 尚未修复 |
| [#28805](https://github.com/ggml-org/llama.cpp/issues/28805)：Metal 解码在长上下文下生成 1 个 token 后即发出 EOS | 严重 | 静默失败；模型中途停止生成 | 开放 | ❌ 尚未修复 |
| [#27623](https://github.com/ggml-org/llama.cpp/issues/27623)：Qwen3.8-27B 在超过 80K 上下文后解码吞吐量下降超过 25 倍 | 高 | 大提示词场景下性能急剧下滑 | 开放 | ❌ 尚未修复 |
| [#29281](https://github.com/ggml-org/llama.cpp/issues/29281)：CUDA 稀疏 FA 解码在 b11047 之后慢 1.6 倍 | 中等 | 高吞吐场景下的回归问题 | 已关闭 | ✅ 已在 #29377 修复 |
| [#28633](https://github.com/ggml-org/llama.cpp/issues/28633)：4 位 KV 缓存无声回退至 CPU | 高 | 无警告情况下出现 30 倍减速，难以诊断 | 开放 | ❌ 尚未修复 |

> ⚠️ **重要提示**：使用推测解码或 4 位 KV 缓存的用户应充分测试——多个正确性和性能回归问题仍未解决。

---

### **6. 对应用开发者的启示**  
- **若在 CUDA 上部署，请默认开启 `GGML_CUDA_FA_ALL_QUANTS=ON`** ——避免 4 位 KV 缓存无声回退至 CPU ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633))。  
- **在 [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) 修复前，避免在量化模型（如 `Q4_K_M`）上使用推测解码** ——可能产生非确定性输出。  
- **充分利用新硬件支持**：在 Hexagon NPU（Windows Arm64）和 Intel Vulkan 上部署，适用于边缘计算或设备端 AI 场景。  
- **监控长上下文行为**：如 Qwen3.8-27B 在超过 80K token 后性能严重下降——考虑截断上下文窗口或采用卸载策略。  
- **尽早启用图捕获**：Metal 修复确保零节点图的高效执行——对流式处理或智能体工作流尤为有用。

> 🔗 [GitHub 仓库](https://github.com/ggml-org/llama.cpp) | [官方主页](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-25**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展对先进模型架构和硬件后端的支持，关键进展包括 MLX 运行器的稳定性提升以及代理工作流的新集成。报告了 gemma4:31b 的内存估算严重退化问题，以及 gemma4:31b、qwen3.8 工具调用解析异常；同时在 MLX nvfp4 上持续负载下出现长时间停滞，表明高吞吐推理可靠性仍面临挑战。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
- **API 废弃**：`typical_p` 已被弃用，将记录警告而非直接失败（PR [#18627](https://github.com/ollama/ollama/pull/18627)）。开发者应迁移至 `typical_prompt` 或移除相关用法。  
- **网页搜索限制提升**：单次响应的网页搜索上限已从 3 提升至 10（PR [#18602](https://github.com/ollama/ollama/pull/18602)），现可正确遵循 Anthropic 的 `max_uses` 值低于 10 的设置。

---

### **3. 新模型与硬件支持**  
- **MLX 后端新增功能**：  
  - 通过 PR [#17972](https://github.com/ollama/ollama/pull/17972) 添加对 `GraniteForCausalLM` 模型的支持，使 Apple Silicon 平台可使用 IBM 的 Granite 4.1 与 4.2 系列。  
  - 修复 `gemma4` 模型中 MoE 专家加载问题（PR [#18631](https://github.com/ollama/ollama/pull/18631)），解决 `mlx-community/gemma-4-26B-A4B-it-qat-4bit` 的导入失败问题。  
- **硬件与操作系统**：  
  - 在 Windows 上扩展 AMD GPU 支持（PR [#18623](https://github.com/ollama/ollama/pull/18623)），新增 `gfx1030`、`gfx1150`、`gfx1151`、`gfx1200` 与 `gfx1201` 至 ROCm 兼容列表。  
  - **Windows on Arm**：PR [#17654](https://github.com/ollama/ollama/pull/17654) 为 CPU 构建启用完整的 ARM 指令集优化（`armv8-a`）。

---

### **4. 性能与优化**  
- **MLX 运行器内存泄漏**：在 `qwen3.6:27b-mlx` 中报告每工具调用请求存在约 0.43 GiB 的重复内存泄漏（Issue [#18620](https://github.com/ollama/ollama/issues/18620)），影响长期运行的代理工作流。  
- **gemma4:31b 性能退化**：版本 0.31.2 引入 7 倍性能下降（33.8 → 4.7 tok/s），源于虚高显存估算（Issue [#17099](https://github.com/ollama/ollama/issues/17099)）；修复待发布。  
- **停滞处理改进**：PR [#18625](https://github.com/ollama/ollama/pull/18625) 与 [#18614](https://github.com/ollama/ollama/pull/18614) 解决模型拉取停滞与 MTP 量化错误，提升下载与推理过程中的容错能力。

---

### **5. 稳定性与回归问题**  
- **严重级**：`gemma4:31b` 工具调用解析器在键名含空格时会丢弃请求（Issue [#18390](https://github.com/ollama/ollama/issues/18390)）——静默失败并返回空响应。  
- **高严重级**：`qwen3.8:27b` 忽略 `"high"`/`"max"` 思考层级，即使文档明确支持也默认降级为 `"medium"`（Issue [#18632](https://github.com/ollama/ollama/issues/18632)）。  
- **持续性停滞**：MLX nvfp4 模型在单槽负载下预填充阶段会无限期停滞（Issue [#18505](https://github.com/ollama/ollama/issues/18505)）——仅可通过 SIGTERM 恢复。  
- **操作系统特异性故障**：  
  - Windows CUDA 无法识别 Blackwell RTX 50 系列显卡（驱动 616.92），回退至 CPU（Issue [#18581](https://github.com/ollama/ollama/issues/18581)）。  
  - macOS GUI 在处理超过 60 秒后静默失败（Issue [#18368](https://github.com/ollama/ollama/issues/18368)）——无通知或错误提示。

---

### **6. 对应用开发者的启示**  
- **避免在 `qwen3.8:27b` 中使用 `"high"`/`"max"` 思考层级**——当前行为等同于 `"medium"`。如需更高层级，可直接使用 `xhigh`。  
- **在使用 `gemma4:31b` 与 `qwen3.6:27b-mlx` 时密切监控内存占用**；已知回归可能导致严重性能下降或内存泄漏。  
- **在 MLX nvfp4 上持续负载下预期不稳定性**——建议加入重试逻辑或降级至其他运行器，直至 Issue [#18505] 修复。  
- **集成新工具如 AGNT ([#18618](https://github.com/ollama/ollama/pull/18618)) 与 Termalime ([#18630](https://github.com/ollama/ollama/pull/18630))**，以增强桌面代理与 CLI 工作流体验。  
- **更新 API 客户端以处理 `401` 与 `403` 认证错误**（PR [#18092](https://github.com/ollama/ollama/pull/18092)），当访问云模型时可能触发。

---  
*本摘要由 GitHub 数据生成：[github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-09-25**

---

### **1. 今日重点**  
LiteLLM 生态系统持续成熟，企业级大模型路由在成本透明度、安全性和可靠性方面持续强化。今日关键 PR 包括：针对标签级速率限制的预算强制执行（#41807）、流式传输元数据保留能力提升（如支出日志中的 `service_tier`，#42870），以及为 Fireworks 的美国专用 DeepSeek V4.1 Flash 模型新增成本映射条目（#43097）。这些更新体现了多供应商编排能力的日益成熟，尤其在计费准确性与审计可追溯性方面。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，多个关键配置与行为变更正在活跃的 PR 中待处理：
- **基于标签的速率限制现已强制生效**：v3 速率限流器将尊重标签对象上设置的 `tpm_limit` 与 `rpm_limit`（PR #41807）。此前仅检查 `max_budget` —— 此变更可能需要重新配置现有标签策略。
- **支出日志增强**：所有支出日志中将记录新字段 `metadata.used_anthropic_oauth_token`（PR #43063），以实现 Anthropic API 账单与网关日志间的更好对账。

> 🔗 [PR #41807](https://github.com/BerriAI/litellm/pull/41807) | [PR #43063](https://github.com/BerriAI/litellm/pull/43063)

---

### **3. 新模型与硬件支持**  
- ✅ **Sail 已作为 OpenAI 兼容提供商加入**（PR #42840）：十二个 Sail 模型现已支持聊天、流式传输、响应及 Anthropic 消息场景。定价按完成窗口分层。
- ✅ **Fireworks DeepSeek-V4P1-Flash（仅限美国）**：已添加至成本映射，并配置了正确的计价行（PR #43097）。
- ✅ **Azure AI FLUX.2-flex 编辑参考图**：现按每兆像素计费（PR #43094），与 Azure 实际定价一致。

> 🔗 [PR #42840](https://github.com/BerriAI/litellm/pull/42840) | [PR #43097](https://github.com/BerriAI/litellm/pull/43097) | [PR #43094](https://github.com/BerriAI/litellm/pull/43094)

---

### **4. 性能与优化**  
- **流式元数据保留**：PR #42870 确保 `service_tier` 在流式分块间保持一致，并记录于支出日志中——这对长时请求的成本归因至关重要。
- **OCR 性能路径调整**：Python OCR 执行路径已完全移除（PR #43081），仅支持 Rust 路由。此举降低维护负担并提升一致性，但可能影响依赖旧版 Python 路径的用户。
- **成本映射同步**：PR #43091 已将 Gemini 的优先级、弹性及视频输入定价与官方文档对齐——提升令牌成本估算精度。

> 🔗 [PR #42870](https://github.com/BerriAI/litellm/pull/42870) | [PR #43081](https://github.com/BerriAI/litellm/pull/43081) | [PR #43091](https://github.com/BerriAI/litellm/pull/43091)

---

### **5. 稳定性与回归问题**  
今日报告的主要稳定性问题：

| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| [#26672](https://github.com/BerriAI/litellm/issues/26672)：v1.82.3 版本中尽管支出超出 `max_budget`，预算强制仍被绕过 | ⚠️ 严重 | 开放 | ❌ 尚无修复 |
| [#39713](https://github.com/BerriAI/litellm/issues/39713)：虚拟密钥缓存后，客户级 RPM 限制被忽略 | ⚠️ 高 | 开放 | ❌ 尚无修复 |
| [#43000](https://github.com/BerriAI/litellm/issues/43000)：`encrypted_content_affinity` 在部署固定失败时中断多轮对话 | ⚠️ 高 | 已关闭（但未解决） | ❌ 已知问题；无备用逻辑 |
| [#39088](https://github.com/BerriAI/litellm/issues/39088)：流式传输中丢失 `prompt_tokens_details`，导致缓存令牌按完整输入价格计费 | ⚠️ 中等 | 开放 | ❌ 尚无修复 |

> 📌 注意：多个问题影响成本核算完整性——尤其是在使用响应缓存、流式传输或零成本模型时。

---

### **6. 对应用开发者的意义**  
- **审计就绪**：支出日志中新加入的元数据字段（如 `used_anthropic_oauth_token`）使你能够直接将代理日志与上游提供商账单对账——这在欧盟《人工智能法案》第 12 条合规要求下至关重要（#29895）。
- **防范成本泄漏**：谨慎使用 `prompt_caching_savings_spend` 与 `compression_savings_spend`——当前在基于成本的路由场景中未正确计算（#37117）。请手动验证成本报表，直至修复。
- **流式传输安全**：若使用带缓存的流式传输（如 Vertex AI、Vercel Gateway），请确保 `usage.prompt_tokens_details` 被保留——否则缓存令牌将按完整输入价格计费（#39088）。
- **速率限制规范**：标签级 `rpm_limit` 与 `tpm_limit` 强制机制已开始实施——请主动更新配置，避免意外超限。
- **安全提示**：UI 会话持久化漏洞（#35665）仍开放——生产环境中勿依赖退出登录来失效会话。

> 🔗 [Issue #29895](https://github.com/BerriAI/litellm/issues/29895) | [Issue #39088](https://github.com/BerriAI/litellm/issues/39088) | [Issue #35665](https://github.com/BerriAI/litellm/issues/35665)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-25**

---

### **1. 今日亮点**  
Unsloth 持续快速拓展多后端推理与高级量化功能，已在 AMD ROCm 10 支持和图像生成用的 NVFP4 内核优化上取得重大进展。关键 PR 包括：为 FP4 模型按需安装 FlashInfer、改进 VAE 编译流程，以及早期集成 vLLM/SGLang。社区正积极报告关于 Qwen-Image-2.1 部署、AMD iGPU 上显存信息错误报告，以及因只读缓存权限导致的模型导出失败等关键问题。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
- **待处理**：`install.ps1` 脚本验证修复 (#11862) 解决了 Bitdefender 隔离捆绑安装包时出现的误报失败——对 Windows 用户存在静默失败风险。  
- **迁移提示**：升级至 ROCm 10（参见 #9932）的用户应预期需手动锁定版本，直到官方支持正式上线；当前安装程序仍默认使用 ROCm 7.14。

---

### **3. 新模型与硬件支持**  
- ✅ **AMD ROCm 10** 已由 AMD 官方宣布；通过 #9932 和 #11815 跟踪多架构 PyTorch 包的可用性。  
- 🚀 **vLLM 与 SGLang 支持** 通过 #11491 以可选引擎形式加入：支持文本/图像聊天、多 GPU 服务、量化及视觉模型推理。  
- 💡 **Ryzen AI NPU (XDNA 2)** 支持通过 #11743 引入，采用 Lemonade + FastFlowLM 技术栈——适用于 Strix Halo/Point 设备。  
- 🔧 **Qwen-Image-2.1** 现已设立专用跟踪议题 (#11840, #11637)，涵盖 GGUF 加载、资源下载膨胀及流水线验证问题。  
- 📦 请求 **Flatpak 支持** (#4380)，表明对 .deb/.rpm 之外原生 Linux 打包方式的需求持续增长。

---

### **4. 性能与优化**  
- ⚡ **NVFP4 图像生成**：每层策略与 flashinfer 后端 (#10730, #10731, #11730) 实现更快推理并降低内存压力；目标是将 VAE 解码时间控制在 200 毫秒以下。  
- 🖥️ **VAE 编译优化**：#10889 引入编译期预算分配机制，优先保障 VAE 解码，此前该过程在 gfx1030 上曾导致 10–23 分钟卡顿（参见 #11636）。  
- 📈 **配置扫描基准测试**：#11808 与 #11646 为自动基准测试奠定了基础，涵盖推测解码、KV 缓存类型、内存卸载及吞吐量指标。  
- 🔄 **FlashAttention 预构建优化**：#11812 将 `flash-attn` wheel 构建拆分为并行任务，将 CI 时间从约 8 小时缩短至 1 小时以内。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 说明 |
|------|----------|--------|-------|
| #11870: AMD iGPU 上导出 GGUF 时提示“无效内核文件” | 严重 | 开放 | 原因为 iGPU 上缺少 PyTorch 内核；导出时需显式指定 GPU。 |
| #11814: `torch._grouped_mm` 访问违规导致 `import unsloth` 在旧版 ROCm 7.13.0 上崩溃 | 严重 | 开放 | 影响多个 AMD 显卡（gfx103X, gfx110X）；尽管更新后仍存在持久性虚拟环境问题。 |
| #11636: AMD（ROCm）上 VAE 解码卡顿 10–23 分钟 | 高 | 已关闭 | 由 MIOpen 全面调优引起；临时解决方案：禁用 `cudnn.benchmark`。 |
| #11739: 图像生成在“步骤 N/N”后停滞于最终步骤 | 中等 | 开放 | 因缺少进度回调导致界面延迟；影响用户对卡死的感知。 |
| #11785: 导出至 GGUF 失败，因 Hugging Face 缓存为只读 | 中等 | 开放 | 阻碍微调模型分发；在共享环境中常见。 |

> ✅ **进行中的修复**：#11874（编译缓存磁盘占用）、#11873（误导性模型切换日志）、#11829（流水线验证）。

---

### **6. 对应用开发者的启示**  
- **充分利用 vLLM/SGLang**：通过 #11491 的可选引擎支持，实现高吞吐、多 GPU 部署，并具备完整的量化灵活性。  
- **谨慎处理 AMD ROCm**：除非明确管理 PyTorch 版本（如通过 #11815），否则避免混合架构系统；注意监控 `torch._grouped_mm` 崩溃。  
- **设计 GPU 友好工作流**：随着 #11768（RAG 嵌入 GPU 切换开关）和 #11743（NPU 支持）的引入，应用必须暴露硬件选择接口用于嵌入与推理。  
- **预期复杂模型管理**：Qwen-Image-2.1 问题（#11637, #11825）凸显在合并 LoRA 或导出模型时，需要强大的资产解析逻辑。  
- **监控缓存权限**：自动化微调/导出流水线时，确保对 Hugging Face 缓存目录具有写入权限（参见 #11785）。

> 🔗 [GitHub Issues](https://github.com/unslothai/unsloth/issues) | [PRs](https://github.com/unslothai/unsloth/pulls) | [路线图追踪](https://github.com/unslothai/unsloth/issues/11840)

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*