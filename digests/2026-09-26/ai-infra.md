# AI 基础设施日报 2026-09-26

> 生成时间: 2026-09-26 00:48 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-26**

---

### **1. 生态概览**  
AI推理与服务生态正进入超专业化阶段，各项目在性能关键优化上趋于收敛，但在目标应用场景上则日益分化。vLLM 和 SGLang 在涵盖 NVIDIA 最新 SM100/SM103 以及 AMD CDNA/GFX950 等多样化硬件的大型模型高吞吐、低延迟推理方面处于领先地位。Ollama 与 llama.cpp 正强化本地运行时能力——尤其在 Apple Silicon 与边缘设备上；LiteLLM 与 Unsloth 则聚焦于多供应商路由的抽象层及微调敏捷性。推测解码、结构化输出与混合模型支持的融合，标志着基础设施栈已成熟，足以支撑生产级智能体系统。

---

### **2. 活动对比**  

| 项目        | 开放问题（24小时） | 合并的 PR（24小时） | 发布状态       |
|-------------|-------------------|------------------|----------------|
| **vLLM**    | 8                 | 7                | 无新版本发布；关键修复已合并 |
| **SGLang**  | 6                 | 6                | 稳定版 `v0.5.19`；无新版本发布 |
| **llama.cpp** | 7               | 5                | 构建 `b11192`–`b11181`；无正式发布 |
| **Ollama**  | 9                 | 4                | `v0.40.0-rc0` 已发布；候选版本状态 |
| **LiteLLM** | 5                 | 6                | `v1.104.0-dev.2`、`v1.100.3` 等已发布 |
| **Unsloth** | 10                | 4                | 无新版本发布；稳定性问题仍开放 |

> 🔍 *观察*：vLLM 与 LiteLLM 展现出最高工程推进速度，主要由稳定性修复与安全加固驱动。Unsloth 开放问题最多——多为针对 AMD 平台的回归问题——表明其平台成熟度仍面临挑战。

---

### **3. 模型支持竞赛**  

| 新模型 / 架构              | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1**          | ✅（SM100/SM103，ROCm） | ✅（ROCm，MPS） | ❌ | ✅（`qwen3.8:27b-mlx`） | ✅ | ❌ |
| **Qwen3.8-Flash-Next**     | ⚠️ 部分支持 | ✅（稳定） | ❌ | ❌ | ❌ | ❌ |
| **K2 Horizon（MoVA）**      | ❌ | ❌ | ✅（实验性） | ❌ | ❌ | ❌ |
| **GraniteSpeech5ForCTC**    | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Hybrid SSM/Mamba**        | ❌ | ✅（实验性） | ❌ | ❌ | ❌ | ✅（可选启用） |
| **Gemma4**                  | ❌ | ✅（OOT attention） | ❌ | ❌ | ❌ | ❌ |
| **Limite 1B - Violetto**    | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash**           | ❌ | ✅（FP8 OOM 问题） | ❌ | ❌ | ❌ | ❌ |

> 🏆 **领先者**：**SGLang** 在新模型支持广度上领先，尤其在 Qwen3.8-Flash-Next 与混合架构方面表现突出。  
> 📈 **新兴力量**：**llama.cpp** 正通过社区贡献快速拓展音频（LFM2）、语音转文本（GraniteSpeech5）及小众 MoVA 模型支持。

---

### **4. 性能前沿**  

| 优化重点                   | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **内核融合**                | ✅（Mamba，WO-A + RoPE） | ✅（Gemma3n，Hopper V4.1 ratio-2） | ✅（Metal FWHT >512） | ⚠️（CUDA 移植中） | ❌ | ❌ |
| **KV 缓存与内存管理**       | ✅（统一缓存，草稿验证） | ✅（HiCache 损坏修复） | ✅（`--kv-unified` bug） | ✅（前缀缓存限制已修复） | ❌ | ✅（SDXL 卸载规划） |
| **量化与精度**              | ✅（MXFP8，MXFP4） | ✅（MXFP4 MoE 调优） | ✅（BF16→FP32 分块） | ✅（MLX 原生支持） | ✅（Fireworks 定价更新） | ✅（针对 Qwen-Image 的 Hadamard 旋转） |
| **分布式推理**              | ✅（RPC 超时，TP 分片） | ⚠️（DCP，上下文并行） | ❌ | ❌ | ✅（路由器降级机制） | ✅（vLLM/SGLang 可选集成） |
| **流式传输与推测解码**      | ✅（logprob 保留，草稿 RPC 边界） | ✅（令牌循环修复） | ❌ | ❌ | ⚠️（降级为空响应） | ❌ |

> 🔥 **趋势**：**内核融合** 与 **结构化输出正确性** 已成为核心竞争领域。vLLM 与 SGLang 在 Mamba、Gemma3n、DeepSeek-V4.1 等融合内核设计上占据主导；而 Ollama 与 LiteLLM 则更关注负载下的路由可靠性。

---

### **5. 层级定位**  

| 项目        | 主要层级                     | 核心差异点 |
|-------------|------------------------------|------------|
| **vLLM**    | **推理引擎**                 | 行业标准 GPU 内核优化；NVIDIA 平台上大型语言模型的最低延迟标杆 |
| **SGLang**  | **推理引擎 + 网关**          | 更强调流式传输、工具调用与混合模型执行 |
| **llama.cpp** | **本地运行时 / 边缘推理**   | 无与伦比的跨平台支持（Apple Silicon、Vulkan、SYCL、OpenCL）；适用于 CPU/GPU 边缘部署 |
| **Ollama**  | **本地运行时 + 开发者体验**  | 无缝集成 Apple Silicon MLX；面向原型设计与本地智能体的友好命令行与 UI |
| **LiteLLM** | **API 网关 / 路由器**        | 多供应商路由、成本追踪与可观测性的统一 API 层 |
| **Unsloth** | **微调 + 训练运行时**        | 专精于 QLoRA、图像生成与 AMD GPU 上的训练；连接训练与推理环节 |

> 🎯 **战略清晰度**：vLLM 与 SGLang 正成为云规模部署的事实推理引擎。Ollama 与 llama.cpp 是开发者与边缘场景的基础工具。LiteLLM 支撑多云推理的可扩展编排。Unsloth 面向研究者与开发人员构建自定义训练模型。

---

### **6. 趋势信号**  

- **AMD 不再是次等选择**：vLLM 与 SGLang 在 ROCm 支持（gfx950、MI355X）上取得显著进展，内核调优与配置修复表明对 AMD 硬件的深度投入。这预示着真正跨 GPU 平等时代的到来。

- **结构化输出稳定性已成为不可妥协项**：`tool_choice='none'` 中的关键缺陷、流式传输期间 logprob 处理异常以及解析器泄漏等问题表明，智能体工作流已驱动核心引擎质量——不再只是附加功能。

- **推测解码日趋成熟**：随着草稿令牌验证、RPC 超时与主机调度开销等问题的修复，推测解码在 vLLM 与 SGLang 中已从实验阶段迈向生产可用。

- **安全与信任优先级上升**：LiteLLM 采用 Cosign 对 Docker 镜像进行签名，反映出企业环境中对供应链完整性的日益关注。

- **Apple Silicon 已成主流平台**：Ollama 自动激活 MLX 与 llama.cpp 提升 Metal 内核性能，表明 Apple 硅不再是小众选项，而是 AI 工作负载的主流目标。

> 💡 **给开发者的可操作洞察**：  
> - 在 NVIDIA 平台上追求高性能、可扩展推理，请使用 **vLLM**。  
> - 若需混合模型支持与稳健流式智能体，请选择 **SGLang**。  
> - 用于边缘部署或异构硬件（Apple、AMD、Intel），请选用 **llama.cpp**。  
> - 在 Mac 上快速原型设计或部署本地模型，推荐 **Ollama**。  
> - 实现多供应商路由并具备预算感知的成本追踪，应借助 **LiteLLM**。  
> - 如需在 AMD GPU 上进行 QLoRA 训练与图像生成，可考虑 **Unsloth**——但请避免在生产环境使用，待稳定性修复落地后再上线。

---

*由资深 AI 基础设施分析师整理 — 2026-09-26*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-09-26

---

### **1. 今日亮点**  
vLLM 项目持续加速推进推测解码、结构化输出稳定性以及跨多种硬件的性能优化——尤其在针对 SM100/SM103 的 DeepSeek-V4.1 新优化上取得显著进展，同时在 Mamba 核函数融合方面也取得重要突破。关键修复已合并，涵盖草稿令牌验证、流式续写中 logprob 的保留，以及分布式推理中的 RPC 超时处理。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未宣布新版本。*  
但已有若干**关键错误修复**合并，影响运行时行为：
- **PR #58779**：通过 `VLLM_EXECUTE_MODEL_TIMEOUT_SECONDS` 限制草稿令牌的 RPC 等待时间，防止在使用结构化输出进行推测解码时出现卡死问题。[GitHub PR](https://github.com/vllm-project/vllm/pull/58779)
- **PR #58792**：修复使用 `--reasoning-parser inkling --tool-call-parser inkling` 时，推理块后 `content` 中泄露 Inkling 工具名称的问题。[GitHub PR](https://github.com/vllm-project/vllm/pull/58792)
- **PR #57790 / #57447**：修复流式输入续写过程中 logprob 处理不当的问题——确保即使采样参数中途变化，logprob 状态也能正确保留。[GitHub PRs](https://github.com/vllm-project/vllm/pull/57790), [GitHub PR](https://github.com/vllm-project/vllm/pull/57447)

> ⚠️ 使用**结构化输出**、**推测解码**或**流式输入**的开发者应确保使用近期的 `main` 或补丁版本，以避免潜在的正确性问题。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1 (DSv4.1)**：为 SM100/SM103 新增面向性能优化的核函数，支持融合 WO-A + 反向 RoPE + MXFP8 量化，显著降低解码延迟。
- **Qwen3.8-2.4T-A95B (AMD)**：针对 gfx950 / MI355X 启动性能优化计划（问题 #57149），包括注意力核函数的性能分析与调优。
- **ROCm (CDNA)**：持续工作以强制在 `VLLM_ROCM_USE_AITER=1` 时优先选择 `ROCM_AITER_FA` 而非 `ROCM_ATTN`，解决影响 MHA 解码性能的误配置问题。[GitHub Issue](https://github.com/vllm-project/vllm/issues/46596)
- **AWS EFA 集成**：提议在 `vllm/vllm-openai` Docker 镜像中实现开箱即用的 EFA 支持，对标 PyTorch 的自动网络插件检测机制。[GitHub Issue](https://github.com/vllm-project/vllm/issues/55635)

---

### **4. 性能与优化**  
- **Mamba 核函数融合**：PR #58737 将 7 个核函数融合为 1 个 Triton 核函数（`mamba_get_block_table_tensor` 对齐分支），在所有形状下实现**最高 6 倍加速**。[GitHub PR](https://github.com/vllm-project/vllm/pull/58737)
- **推测解码开销降低**：PR #58732 消除约 11µs/步的主机调度开销，来自 GDN 元数据构建过程。[GitHub PR](https://github.com/vllm-project/vllm/pull/58732)
- **DeepSeek-V4.1 优化**：
  - PR #58634：将小批量的 WO-A 与反向 RoPE 及 MXFP8 量化融合 → 在 GB200（SM100/SM103）上降低解码延迟。
  - PR #58678：将 Engram wkv 投影分片至 TP 分区，提升张量并行环境下的可扩展性。[GitHub PRs](https://github.com/vllm-project/vllm/pull/58634), [GitHub PR](https://github.com/vllm-project/vllm/pull/58678)
- **Triton JIT 冷启动覆盖**：PR #58559 识别并覆盖首次请求时关键 Triton 核函数的 JIT 编译过程——提升生产部署中冷启动的可预测性。[GitHub PR](https://github.com/vllm-project/vllm/pull/58559)

---

### **5. 稳定性与回归问题**  
今日报告的顶级回归问题：
1. **严重**：若未找到 `nvcc`（预编译 wheel 包），FlashInfer 采样器的 JIT 会崩溃引擎启动流程，且无回退至原生采样器机制。[GitHub Issue](https://github.com/vllm-project/vllm/issues/49497)
2. **高**：`tool_choice='none'` 会静默删除工具调用格式的内容，破坏预期返回结构化输出的代理工作流。[GitHub Issue](https://github.com/vllm-project/vllm/issues/55005)
3. **高**：`dflash` 推测解码器无法识别草稿器 KV 组 → 导致 Mamba 组禁用前缀缓存复用。[GitHub Issue](https://github.com/vllm-project/vllm/issues/57032)
4. **高**：基于 `glm_moe_dsa` 的模型（如 GLM-5.3）尽管已有修复，但仍存在缺失性能优化问题。[GitHub Issue](https://github.com/vllm-project/vllm/issues/57406)
5. **低**：`qwen3_coder` 解析器在 v0.22 与 v0.23 之间行为发生变化——可能破坏下游解析逻辑。[GitHub Issue](https://github.com/vllm-project/vllm/issues/46493)

> ✅ 多数高严重性问题已有修复 PR（参见第 2 节）。建议使用 `main` 或夜间构建版本以获取最新补丁。

---

### **6. 对应用开发者的启示**  
- **代理框架与工具调用**：优先升级至最新 `main` 版本，避免因 `tool_choice='none'` 导致的静默数据丢失及重试期间工具调用 ID 不稳定问题。使用 `parser_cache` 和稳定重渲染功能（跟踪于 #57571）以构建可靠的流式代理。
- **高性能关键任务**：利用新推出的 Mamba 与 DeepSeek-V4.1 优化，在 H100/GB200 上实现更低延迟的推理。在 CDNA GPU 上启用 `VLLM_ROCM_USE_AITER=1`，确保注意力路径选择最优。
- **分布式推理**：谨慎使用 `batch_invariant=1` —— 当前已通过 #56377 正确禁用序列并行，可防止多 GPU 环境下的微妙正确性问题。
- **部署可靠性**：确保环境中存在 `nvcc`，或依赖 FlashInfer 时采用源码构建。考虑切换至 `torch.compile` + 完整 CUDA 图（CI 稳定化正在进行中，详见 #58810），以获得更可预测的吞吐表现。

> 🔗 请通过 GitHub 保持关注：[vLLM Issues](https://github.com/vllm-project/vllm/issues), [PRs](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 简报 – 2026-09-26**

---

### **1. 今日重点**  
SGLang 项目在 CUDA、ROCm 及 Apple Silicon 后端上持续优化 DeepSeek-V4.1 与 Qwen3.8-Flash-Next 的性能表现。针对 `Qwen3.8-Flash-Next` 的分词循环问题以及混合 SSM/Mamba 模型中 `HiCache` 的内存损坏问题，已落地关键稳定性修复；新提交的 PR 聚焦于内核级融合（如 Gemma3n 共享 K/V、Hopper V4.1 比例-2），以提升解码吞吐量。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未报告新版本发布或破坏性变更。最新稳定版本仍为 `v0.5.19`。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1**：通过 #41019 和 #41020 已集成 AMD ROCm (`gfx950`) 内核支持（稀疏注意力、top-k 排序）。  
- ✅ **Apple Silicon (MPS)**：改进内存处理机制，相关进展跟踪于 #21443；正在修复设备内存检测问题（#39675）。  
- ✅ **混合 SSM/Mamba**：实验性支持 `--enable-hierarchical-cache`，但报告存在崩溃问题（#40926）。  
- ✅ **Gemma4**：通过 #41293 现已遵循 OOT 注意力默认配置，提升与自定义后端的兼容性。  
- ✅ **XGrammar Lark 语法**：通过 #39380 添加支持，实现更丰富的解析器定义。

---

### **4. 性能与优化**  
- 🚀 **Gemma3n**：通过 #41295 跳过共享注意力层中未使用的 K/V 计算 —— 减少不必要的 GPU 内存操作，提升解码效率。  
- 🚀 **Hopper V4.1 (SM90)**：将比例-2 解码池化 + RMSNorm 融合至单个内核（#41294），降低高并发解码批次延迟。  
- ⚙️ **MXFP4 MoE**：为 RTX 4090 (SM89) 固定 `num_warps` 值，避免 6 倍解码速度下降问题（#41292），恢复约 20 tok/s 吞吐。  
- 📈 **DCP/上下文并行**：PR #39731 与 #39743 改进了准入控制与负载上报中的逻辑 token 容量追踪。  
- 🔧 **DeepSeek-V4.1**：将低比例索引 top-k 逻辑重构为独立模块（#41125, #41291），增强可维护性及未来融合潜力。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 状态 | PR/链接 |
|--------|------|-------------|--------|--------|
| 🔴 高 | [#36537](https://github.com/sgl-project/sglang/issues/36537) | `Qwen3.8-Flash-Next` 在 token ID 0 上出现思考 + 工具解析器循环 | 已关闭 | [修复 PR](https://github.com/sgl-project/sglang/pull/41156) |
| 🔴 高 | [#40926](https://github.com/sgl-project/sglang/issues/40926) | `HiCache` + 混合 SSM/Mamba 导致整个实例因 `cudaHostRegister` 错误崩溃 | 开放 | [报告](https://github.com/sgl-project/sglang/issues/40926) |
| 🔴 高 | [#37712](https://github.com/sgl-project/sglang/issues/37712) | `GLM-5.3-Flash`：FP8 MQA logits 在长上下文预填充阶段引发 CUDA OOM | 开放 | [报告](https://github.com/sgl-project/sglang/issues/37712) |
| 🟡 中 | [#36531](https://github.com/sgl-project/sglang/issues/36531) | QSA 回退选择与 SM120 不兼容的 FA4 路径 | 已关闭 | [PR #37196](https://github.com/sgl-project/sglang/pull/37196) |
| 🟡 中 | [#36532](https://github.com/sgl-project/sglang/issues/36532) | FlashInfer GDN 状态数据类型在 SM120 上不匹配 | 已关闭 | [待补丁] |

> 💡 *注意：* 截至 2026-09-26，CI 仍不稳定，共 1 个失败测试，7 个易翻车测试 —— 参见 #17050。

---

### **6. 对应用开发者的启示**  
- ✅ **谨慎使用 `--enable-hierarchical-cache --hicache-storage-backend dynamic`** —— 已知在部分混合模型上会引发崩溃（参见 #40926）；请监控内存泄漏。  
- ✅ **优化 Qwen3.8-Flash-Next 工作流** —— 在后续稳定性更新前，请避免使用 `thinking + tool_parser` 组合。  
- ✅ **利用新内核融合特性**（如 Gemma3n、Hopper V4.1）以在推测解码和长上下文推理中获得更高吞吐。  
- ✅ **使用 MLX 后端调用 `/v1/score` 时启用 `--mlx-enable-sampling`** —— 否则空 logprobs 将触发 500 错误（#41211）。  
- ✅ **关注 `max_running_requests` 限制** —— 混合模型可能导致并发度低于 CLI 设置值；可通过 #38846（即将推出）暴露实际有效上限。

> 📌 *实用提示：* 在 Apple Silicon 生产环境中，避免使用 `mem_fraction_static` 默认值 —— 因缺少 MPS 内存检测，请显式设置（#39675）。

---  
*简报源自 GitHub 活动：[sgl-project/sglang](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-26**

---

### **1. 今日重点**  
最新开发周期聚焦于统一 KV 缓存处理在 CUDA 与 HIP 后端的健壮性修复，这对多请求推理稳定性至关重要。关键改进包括修复 LFM2 音频预处理中的错误 logits，以及增强 Metal 内核对更宽块大小的支持，从而提升 Apple Silicon 上的性能表现。社区持续推动模型与硬件扩展，新增对 K2 Horizon 模型的支持，并改善了 SYCL/Vulkan 兼容性。

---

### **2. 发布与破坏性变更**  
今日未发布正式版本；最近构建版本为 `b11192` 至 `b11181`，均专注于内部稳定性及后端特定优化。主要变更如下：  
- `b11190`：修复 LFM2 音频中的 mel 预处理器（#29403）——通过将截断替换为 `log(x + 2^-24)`，修正了约 4.5% 的英文与 6.5% 的日文语句中的贪婪解码错误（[PR #29403](https://github.com/ggml-org/llama.cpp/pull/29403)）。  
- `b11188`：通过 `GGML_VULKAN_COOPMAT_GLSLC_SUPPORT` 宏检查，解决旧版 glslc 缺少协同矩阵支持导致的 Vulkan 构建失败问题（[PR #29409](https://github.com/ggml-org/llama.cpp/pull/29409)）。  
- `b11184`：新增适用于块宽度 >512 的 Metal FWHT 内核，提升 Apple Silicon GPU 的效率（[PR #29095](https://github.com/ggml-org/llama.cpp/pull/29095)）。

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 通过 [PR #29424](https://github.com/ggml-org/llama.cpp/pull/29424) 实验性支持 **K2 Horizon** 模型（0.9B 至 36B MoVA）。  
  - 新增对 **GraniteSpeech5ForCTC**（Turbo CTC）架构的支持，实现非自回归语音转文本推理（[PR #29446](https://github.com/ggml-org/llama.cpp/pull/29446)）。  
  - 通过 [PR #29433](https://github.com/ggml-org/llama.cpp/pull/29433) 新增对 **Limite 1B - Violetto** 模型的支持。

- **硬件与后端增强**：  
  - 扩展 **OpenCL** 支持，新增适用于非 MoE、非 dp4a 配置的 A8 Q5_K 二进制内核（[PR #29401](https://github.com/ggml-org/llama.cpp/pull/29401)）。  
  - 提升 **Intel GPU (SYCL)** 支持，CI 中更新 oneAPI 工具链至 2026.1 版本，并持续推进 DNNL 标志报告修复（[PR #29273](https://github.com/ggml-org/llama.cpp/pull/29273)，[PR #29447](https://github.com/ggml-org/llama.cpp/pull/29447)）。  
  - **Vulkan**：新增 Intel FA 预填充内核，并修复旧版 GLSLC 兼容性问题（[PR #29357](https://github.com/ggml-org/llama.cpp/pull/29357)，[PR #29409](https://github.com/ggml-org/llama.cpp/pull/29409)）。

---

### **4. 性能与优化**  
- **CPU**：`ggml-cpu` 使用 VNNI 的分块乘法矩阵运算，在 k-quants 场景下实现 **3–7倍加速**，得益于优化后的 256×256 int8 窗口（[PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851)）。  
- **GPU**：  
  - Metal 现已支持更大的 FWHT 块（>512），降低寄存器压力，提升宽序列下的可扩展性（[PR #29095](https://github.com/ggml-org/llama.cpp/pull/29095)）。  
  - Metal FA 内核按数据类型拆分为独立库，优化二进制体积与加载时间（[PR #29329](https://github.com/ggml-org/llama.cpp/pull/29329)）。  
- **内存与显存**：  
  - 在 `llama-bench` 中引入 `--repack` 选项，使工具链与 `llama-cli` 保持一致，提升跨后端的可复现性（[PR #28968](https://github.com/ggml-org/llama.cpp/pull/28968)）。  
  - BF16/FP16 → FP32 转换现采用分块处理，降低峰值显存占用，可通过 `GGML_CUDA_CUBLAS_CONVERT_CHUNK_SIZE` 配置分块大小（[PR #29442](https://github.com/ggml-org/llama.cpp/pull/29442)）。

---

### **5. 稳定性与回归问题**  
今日报告的关键问题凸显高并发或复杂模型配置下的持续稳定性挑战：  
- **HIP/GFX1151**：在 `-np 4 --kv-unified` 下，服务器返回前次请求的原样响应（经定位至 `c7d87229`）——严重正确性缺陷（[Issue #25992](https://github.com/ggml-org/llama.cpp/issues/25992)，10 条评论，12 个赞）。  
- **CUDA**：使用 `gemma-4-E4B-it-Q4_0.gguf` 在 V100 上触发 `ggml-backend.cpp:1367: GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS)` 错误，评估阶段崩溃（[Issue #24132](https://github.com/ggml-org/llama.cpp/issues/24132)，14 条评论）。  
- **Vulkan**：旧版 glslc 因未保护的 `cooperativeMatrix` 使用导致构建失败——已合并临时修复方案（[Issue #29373](https://github.com/ggml-org/llama.cpp/issues/29373)，6 条评论）。  
- **SYCL**：`CONV_2D`、`CPY`、`ROLL`、`FLASH_ATTN_EXT` 测试失败——表明仍存在底层正确性问题（[Issue #28384](https://github.com/ggml-org/llama.cpp/issues/28384)）。

> ✅ **修复进行中**：部分回归问题已有对应 PR（如 Vulkan 修复 #29409），但核心 `--kv-unified` 响应污染问题尚未合并补丁。

---

### **6. 对应用开发者的影响**  
- **谨慎使用 `--kv-unified` 与并行请求**（`-np N`）在 HIP/CUDA 上——已知会返回陈旧响应。生产环境请待 #25992 修复后再启用。  
- **充分利用新 Metal 与 OpenCL 内核**以发挥 Apple Silicon 与 AMD GPU 的潜力——预期在大序列与宽块场景下获得更高吞吐量。  
- **在基准测试工具中启用 `--repack`** 以确保跨后端的一致验证。  
- **监控 FP16/BF16 → F32 转换时的内存使用情况**；通过调整 `GGML_CUDA_CUBLAS_CONVERT_CHUNK_SIZE` 平衡性能与显存消耗。  
- **预计 K2 Horizon 与 GraniteSpeech5 模型加载延迟**，直至官方发布标签落地——请使用当前 `b111xx` 构建版本验证兼容性。

👉 **推荐操作**：  
- 使用 `b11192` 及以上版本以获得稳定的音频（LFM2）和 Metal 性能。  
- 在集成式 HIP GPU 上避免使用 `--kv-unified`，除非另行通知。  
- 关注 [GitHub Discussions](https://github.com/ggml-org/llama.cpp/discussions) 获取模型相关问题的实时排查支持。

---  
*数据来源：[github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-26**

---

### **1. 今日亮点**  
Ollama v0.40.0-rc0 在 Apple Silicon 设备上引入了自动 MLX 运行时使用，支持 `qwen3.8` 等模型开箱即用的原生加速。关键稳定性修复解决了图像处理中的静默失败（如 `deepseek-v4.1-flash`）、OpenAI 兼容端点异常行为，以及长推理过程中的 macOS GUI 超时问题。

---

### **2. 发布与破坏性变更**  
- **v0.40.0-rc0**：在兼容模型（如 `qwen3.8:27b-mlx`）上默认启用 Apple Silicon 的 MLX 运行时。  
  - *影响*：无需配置——若可用，模型将自动利用 MLX。  
  - [GitHub 发布](https://github.com/ollama/ollama/releases/tag/v0.40.0-rc0)  

- **OpenAI 兼容 API 修复**：  
  - 响应 ID 现在使用 UUID（`#18656`），防止高吞吐环境下发生冲突。  
    - *修复 PR*：[#18656](https://github.com/ollama/ollama/pull/18656)  
  - `/v1/chat/completions` 现在尊重 `max_tokens` 并遵循 Modelfile 中定义的 `num_predict` 默认值（`#18575`）。  
    - *问题*：此前忽略限制，导致生成无界。  

---

### **3. 新模型与硬件支持**  
- **Apple Silicon (MLX)**：  
  - `qwen3.8`、`gemma4` 及其他支持 MLX 的模型现在在 M 系列芯片上默认原生运行。  
  - `qwen3.8:27b-mlx` 是主要受益者，得益于优化的 Metal 内核，性能预期提升。  

- **Intel GPU (SYCL/oneAPI)**：  
  - 正在推进通过 SYCL 后端集成 Intel Arc/Battlemage GPU 的提案与草案（#16930，#17621）。  
  - 当前为可选启用；尚未进入主线构建。  
  - [PR #17621](https://github.com/ollama/ollama/pull/17621)  

- **CUDA 后端改进**：  
  - 将 Metal 自定义内核移植至 CUDA（`#18657`）的工作正在进行中，可提升 NVIDIA GPU 上 Mamba2 与卷积层的性能。  

---

### **4. 性能与优化**  
- **MLX 运行时效率**：  
  - 去重 CUDA 运行时负载（`#17956`）减小二进制体积并避免重复加载库。  
  - 优化路径发现机制，实现更快启动和更低内存开销。  

- **模型加载与预填充**：  
  - `mlxrunner` 现已包含加载进度报告与卡顿检测（`#17834`），防止大型模型加载过早被取消。  
  - 应用 UI 现在可在慢速预填充阶段保持聊天流活跃（`#18654`），解决长提示下的静默失败问题。  

- **内存管理**：  
  - 修复 8 GiB 固定前缀缓存限制导致 32 GB Mac 出现交换压力的问题（`#18131`）。  
    - *临时方案*：可通过 `--prefix-cache-size` 手动覆盖，直至动态调优实现。  

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 影响 | 状态 | 修复 PR |
|--------|------|--------|--------|--------|
| 严重 | `deepseek-v4.1-flash:cloud` 尽管声明支持 `vision`，却静默丢弃图像 | 多模态代理中断；未抛出错误 | 开放（回归：#18637） | — |
| 高 | `/v1/chat/completions` 忽略 `max_tokens` 并覆盖 `num_predict` | 生成无界 → 崩溃、成本飙升 | 开放 | [#18575](https://github.com/ollama/ollama/issues/18575) |
| 高 | MLX 拉取在磁盘满时静默失败（网络超时被掩盖） | 数据损坏风险；用户无感知 | 开放 | [#18644](https://github.com/ollama/ollama/issues/18644)，通过 [#18648](https://github.com/ollama/ollama/pull/18648) 修复 |
| 中等 | 工具调用解析在尾随垃圾令牌（如 `$$`）时失败 | 即使语法有效，也拒绝合法 JSON | 开放 | [#18649](https://github.com/ollama/ollama/issues/18649) |
| 中等 | RTX 5090（Blackwell）上出现 CUDA 非法内存访问 | 提示评估期间崩溃 | 开放 | [#18642](https://github.com/ollama/ollama/issues/18642) |
| 低 | Windows CUDA 探测失败（报告 VRAM 为 0 B） | 尽管硬件具备能力仍回退至 CPU | 开放 | [#18581](https://github.com/ollama/ollama/issues/18581) |

> ✅ **注意**：多个回归问题正在通过 PR 或调查中积极修复。

---

### **6. 对应用开发者的意义**  
- **智能体开发者**：在静默丢弃问题修复前，请避免使用 `deepseek-v4.1-flash:cloud` 处理视觉任务。建议使用本地模型或经验证的云服务提供商。  
- **性能调优**：在 Apple Silicon 上，`qwen3.8:27b-mlx` 可带来更佳吞吐表现——无需配置即可利用 MLX。监控内存使用情况；若出现交换，可调整 `--prefix-cache-size`。  
- **API 可靠性**：不要依赖 `/v1/chat/completions` 中的 `max_tokens`；在修复上线前，应在客户端实现边界控制。在代理/日志系统中使用基于 UUID 的响应 ID。  
- **未来兼容性**：若目标为 Arc GPU，关注 Intel SYCL 支持（PR #17621）。考虑参与 `System 1` 模型集成（议题 #18594）。  
- **工具集成**：谨慎处理工具调用格式——确保 `}` 后无尾随噪声；可考虑对响应进行预处理。  

> 🔗 **关键资源**：  
> - [Ollama v0.40.0-rc0 发布说明](https://github.com/ollama/ollama/releases/tag/v0.40.0-rc0)  
> - [OpenAI 兼容端点文档](https://github.com/ollama/ollama/blob/main/docs/api.md)  
> - [社区集成](https://github.com/ollama/ollama#community-integrations)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **1. 今日亮点**  
LiteLLM v1.104.0-dev.2 通过在所有 Docker 镜像中统一使用 Cosign 签名，显著提升了安全性，强化了发布流程的信任机制。关键修复解决了多个高严重性问题，包括路由器回退时返回空响应（PR #43165）、Redis SSL 配置错误（PR #34614），以及 Databricks-Gemini 集成中的支出日志记录失败（PR #39749）。生态系统持续扩展，新增对 Sail（PR #42840）等新提供商的支持，并更新了 Fireworks AI 模型的定价信息。

---

### **2. 发布与破坏性变更**  
- 近 24 小时内发布了 **v1.104.0-dev.2**、**v1.100.3**、**v1.99.4** 和 **v1.98.1**。  
- 所有 Docker 镜像现在均采用 [Cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 进行加密签名，确保镜像完整性与真实性。  
- 今日未报告破坏性 API 变更；但若从 v1.98.x 升级，建议用户验证下游系统的兼容性，因错误处理和成本计算方面存在细微行为变化。

> 🔗 [验证 Docker 镜像签名](https://docs.sigstore.dev/cosign/overview/) | [发布提交记录](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)

---

### **3. 新模型与硬件支持**  
- ✅ 通过 PR [#42840](https://github.com/BerriAI/litellm/pull/42840) 新增对 **Sail** 的支持，可利用其 `completion_window` 元数据实现准确计费与速率限制。  
- ✅ **Fireworks AI**：更新 `deepseek-v4p1-flash`、`muse-glimmer-30b` 与 `deepseek-v4-flash-vision-exp` 的定价（PRs [#43253](https://github.com/BerriAI/litellm/pull/43253)、[#43252](https://github.com/BerriAI/litellm/pull/43252)），现反映零售价格。  
- ✅ **OpenRouter**：将 `typesafe/jev-router` 加入成本映射表（PR [#43248](https://github.com/BerriAI/litellm/pull/43248)），支持缓存感知路由并正确执行推理努力约束。

---

### **4. 性能与优化**  
- **流式传输效率**：PR [#43224](https://github.com/BerriAI/litellm/pull/43224) 与 [#43225](https://github.com/BerriAI/litellm/pull/43225) 重构了 Bedrock 的 `stream_chunk_size` 处理逻辑，消除冗余校验，降低请求路径延迟。  
- **HTTP 客户端连接池化**：PR [#43245](https://github.com/BerriAI/litellm/pull/43245) 引入统一的 `HttpClientPool`，标准化所有提供商的 TLS、代理、超时及 CA 证书包行为——提升可靠性与可观测性。  
- **OTel 指标扩展**：PR [#39774](https://github.com/BerriAI/litellm/pull/39774) 提议通过 OTel 导出支出、预算与可靠性指标（除 Prometheus 外），增强分布式环境下的可观测能力。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| [Bug]：路由器回退在超时后返回 `null` 响应体（非流式）— #43165 | ⚠️ 高 | 开放 | 🛠️ 进行中 |
| [Bug]：Redis 缓存因 `ssl_check_hostname` 出现意外参数报错 — #34614 | ⚠️ 高 | 开放 | 🛠️ 进行中 |
| [Bug]：Databricks-Gemini 接口中 `id: null` 响应导致支出日志静默丢失 — #39749 | ⚠️ 高 | 开放 | 🛠️ 进行中 |
| [Bug]：`gemini/` 模型 `count_tokens` 返回 500 错误 — #42735 | ⚠️ 中 | 开放 | ✅ 已在 PR 中修复 |
| [Bug]：Azure 请求包含内部字段 `model_alias_map` — #42409 | ⚠️ 中 | 开放 | 🛠️ 进行中 |

> ⚠️ 在 v1.99.0+ 版本中仍存在多个关键稳定性问题，尤其集中在错误传播、回退逻辑及上游兼容性方面。依赖非流式回退或 Databricks/Gemini 集成的用户应密切监控这些缺陷。

---

### **6. 对应用开发者的意义**  
- **升级需谨慎**：如使用 Databricks-Gemini 或依赖预算限制下的零成本模型访问，请避免使用 v1.99.0+ 版本——已知回归可能导致静默数据丢失或计费错误。  
- **安全优先部署**：使用已签名的 Docker 镜像（`ghcr.io/berriai/litellm-database:v1.104.0-dev.2`），并通过 Cosign 验证签名，防止供应链攻击。  
- **可观测性提升**：利用新推出的 OTel 导出功能（PR #39774），在微服务间统一遥测数据，实现实时成本监控。  
- **模型路由准确性**：确保成本映射表最新（特别是 Fireworks AI、OpenRouter 与 Bedrock），避免错误支出报告——可通过 `model_prices_and_context_window.json` 验证。  

> 💡 技巧提示：仅当密钥设置有 `team_id` 时，才启用 `litellm_settings.prometheus_initialize_budget_metrics: true`——PR #37292 指出 `NULL team_id` 的密钥不会产生预算指标。

---  
*摘要生成时间：2026-09-26 | 来源：[BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-26**

#### **1. 今日亮点**  
Unsloth 团队持续优先保障在 AMD ROCm 平台上的稳定性与性能，多个 PR 修复了 GPU 内存管理不当、训练崩溃以及推理效率低下的问题。关键进展包括提出新的 **基准测试页面方案**，用于 GGUF 模型调优，并增强了对 **vLLM/SGLang 作为可选推理引擎** 的支持，进一步提升了部署灵活性。团队仍重点关注修复 QLoRA 训练和图像生成工作流中的 AMD 特定回归问题。

#### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性 API/配置变更。

#### **3. 新模型与硬件支持**  
- **vLLM 与 SGLang 集成**：已在 Studio 中作为可选推理后端添加（PR [#11491](https://github.com/unslothai/unsloth/pull/11491)），支持多 GPU 服务、量化及视觉模型。
- **ModelScope 源支持**：当 Hugging Face 被屏蔽时，用户现在可从 ModelScope 拉取模型（PR [#11761](https://github.com/unslothai/unsloth/pull/11761)）。
- **自定义 HF 端点**：可通过设置项指定镜像或私有 Hugging Face 实例（同一 PR）。
- **ROCm 7.14/10 兼容性**：通过议题 [#9932](https://github.com/unslothai/unsloth/issues/9932) 提出；尚未提交 PR，但对长期兼容性至关重要。

#### **4. 性能与优化**  
- **图像处理管道优化**：PRs [#11843](https://github.com/unslothai/unsloth/pull/11843) 与 [#11880](https://github.com/unslothai/unsloth/pull/11880) 确保单线程去噪过程复用 cuDNN 缓存，减少重复生成图像/视频时的延迟。
- **内存规划修复**：PR [#11922](https://github.com/unslothai/unsloth/pull/11922) 通过使用运行时数据类型（如 bf16）修正 SDXL 的卸载规划，避免不必要的 VRAM 过度分配。
- **动态编译改进**：PRs [#11842](https://github.com/unslothai/unsloth/pull/11842) 与 [#11880](https://github.com/unslothai/unsloth/pull/11880) 显著降低在 int8/fp8 变换器上第二次提示时的重新编译延迟（15–50 秒）。
- **Qwen-Image-2.1 的 Hadamard 旋转优化**：PR [#11835](https://github.com/unslothai/unsloth/pull/11835) 通过将量化块对齐至 bf16 精度，提升 int8 准确率（LPIPS 从 0.066 下降至约 0.05）。

#### **5. 稳定性与回归问题**  
AMD 硬件上仍存在高严重性问题：  
- **QLoRA 训练期间 GPU 重置**：议题 [#11498](https://github.com/unslothai/unsloth/issues/11498) 报告 RX 7900 XTX 上反复出现 AMDGPU VM 错误，根源为 `fast_dequantize()` 中的流处理缺陷（关联 PR [#10563](https://github.com/unslothai/unsloth/issues/10563)）。  
- **图像生成期间崩溃**：议题 [#9130](https://github.com/unslothai/unsloth/issues/9130) 显示 `hipErrorLaunchFailure` 导致 Studio 服务器完全崩溃——对生产环境极为关键。  
- **模型权重加载至系统内存而非显存**：多个报告（如 [#7449](https://github.com/unslothai/unsloth/issues/7449)、[#9549](https://github.com/unslothai/unsloth/issues/9549)）确认 Strix Halo 系统即使设为仅显存模式，仍会将模型加载至系统内存。  
- **Qwen3.8-27B V3 GGUF 崩溃**：议题 [#9792](https://github.com/unslothai/unsloth/issues/9792) 确认在 R9700（Vulkan）上预填充后失败；回滚至 V2 可解决该问题。

> ✅ *修复正在进行中*：如 PR [#11843](https://github.com/unslothai/unsloth/pull/11843) 与 [#11880](https://github.com/unslothai/unsloth/pull/11880) 已着手解决重新编译与缓存效率低下的根本原因。

#### **6. 对应用开发者的启示**  
- **AMD 用户必须预期不稳定性**：在相关 PR 合并前，请避免在 RDNA1/RDNA2 显卡上进行 QLoRA 训练和图像生成。对于 Qwen3.8，暂用 V2 GGUF 直至 #9792 解决。  
- **设计具备容错能力的系统**：假设 GPU 崩溃可能引发整个 Studio 实例宕机——应实现重试逻辑并监控 `hipErrorLaunchFailure`。  
- **充分利用新推理后端**：通过 Studio 的可选配置启用 vLLM/SGLang，实现支持多 GPU 的可扩展、高吞吐量部署。  
- **优化模型加载策略**：在图像/视频流水线中，除非特别强调精度，否则优先选用 BF16/FP16 而非 INT8，以规避不必要的重新编译开销。  
- **跨设备测试**：使用端到端脚本（议题 [#8099](https://github.com/unslothai/unsloth/issues/8099)）验证在 AMD、Intel 与 NVIDIA 设备上的行为一致性。

---  
*本摘要基于 GitHub 数据整理：[unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*