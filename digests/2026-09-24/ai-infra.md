# AI 基础设施日报 2026-09-24

> 生成时间: 2026-09-24 00:48 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-24**

---

### **1. 生态概览**  
2026年第三季度，AI推理基础设施格局呈现出向混合模型架构（Mamba+Attention、GDN）快速融合的趋势，对下一代硬件（SM120/Blackwell、MI355X、XDNA 2）的激进优化，以及面向代理原生工具链的日益成熟。各项目正愈发聚焦于*生产级稳定性*，关键修复集中于预算控制、正确性回归和长上下文可靠性问题。从单体服务转向模块化、可组合堆栈的转变——如LiteLLM的护栏控制和SGLang的`/v1/decisions` API——正在推动更复杂、可审计的智能体工作流发展。

---

### **2. 活动对比**

| 项目       | 开放问题 | 近24小时PR数 | 发布状态       | 备注 |
|------------|----------|----------------|----------------|------|
| **vLLM**   | 128      | 12             | 无              | 高度关注正确性（3个高严重性问题）；在SM120与ROCm优化方面势头强劲 |
| **SGLang** | 147      | 9              | 稳定：v0.5.20    | 存在4个高严重性回归；检测到活跃开发分支不稳定 |
| **llama.cpp** | 152   | 8              | `v0.5.0` 已发布 | 存在严重的Vulkan/Metal回归问题；`v0.5.0` 稳定了核心服务 |
| **Ollama** | 161      | 6              | `v0.34.4-rc1`（RC） | RC版本修复了关键的MLX/结构化输出缺陷 |
| **LiteLLM** | 136   | 5              | 仅开发版（v1.104.0-dev） | 无稳定版本；3个关键安全/回归问题待处理 |
| **Unsloth** | 108   | 7              | `v0.1.815-beta`（测试版） | 测试版支持大量新模型；AMD/Windows稳定性存疑 |

> ✅ **趋势**：vLLM 和 llama.cpp 在 *技术速度* 上领先；Ollama 与 Unsloth 通过RC/测试版优先保障 *用户端稳定性*。

---

### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---------------|------|--------|-----------|--------|---------|---------|
| **Qwen3系列（混合Mamba+Attn）** | ✅（前缀缓存，推测解码） | ✅（ROCm优化） | ❌ | ⚠️（已请求） | ❌ | ✅（测试版） |
| **GLM-5.3-Flash** | ✅（开发中，存在W4A16问题） | ❌（视觉功能损坏） | ❌ | ⚠️（已请求） | ✅（新增成本映射） | ❌ |
| **Qwen-Image-2.1** | ❌ | ❌ | ❌ | ⚠️（已请求） | ❌ | ✅（GGUF + FP8降级） |
| **Gemma4 DSpark草稿** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **HRM-Text（DFM Mimir 1B）** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **MiMo-V2.6 / HunyuanOCR** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Ling-3.0 VL** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |

> 🏆 **胜出者**：**Unsloth** 在 *新多模态/本地模型支持* 方面领先，尤其体现在 **Qwen-Image-2.1** 与 **HunyuanOCR**。  
> 🥈 **亚军**：**llama.cpp** 拥有最广泛的 *原生GGUF模型覆盖*，包括HRM-Text与MiMo等小众模型。  
> 🥉 **差距**：LiteLLM 与 Ollama 在 *特定模型运行时支持* 上滞后，但在 *成本映射与路由* 方面表现卓越。

---

### **4. 性能前沿**

| 优化重点           | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存效率**     | ✅✅（FP8，ROCm OOM修复，SM120分块K） | ✅（FP8，索引修复） | ⚠️（Vulkan吞吐量骤降） | ⚠️（MLX卡顿） | ✅（缓存日志打标） | ⚠️（无） |
| **批处理与预填充** | ✅✅（混合GDN/Mamba，吞吐提升7.58倍） | ✅（MoE统一路由） | ✅（CUDA稀疏FA恢复） | ⚠️（Draft-MTP不稳定） | ✅（使用页面可扩展） | ✅（静态步跳过） |
| **量化与稀疏计算** | ✅✅（NVFP4，ReLU2 MoE，HiSparse缓冲） | ✅（MXFP4，MXFP8低延迟） | ✅（q4_0–q6_k，dp4a） | ⚠️（CPU因轮询过载） | ✅（Rust成本库） | ✅（逐层NVFP4策略） |
| **分布式服务**     | ✅（多卡追踪） | ✅（dLLM服务） | ❌ | ❌ | ✅（团队级速率限制） | ❌ |
| **内核级调优**     | ✅✅（自适应占用率的Triton） | ✅（融合MXFP4，DeepGemm） | ✅（Metal，Vulkan，SYCL） | ⚠️（MLX运行器挂起） | ⚠️（速率限制器竞争） | ✅（CUDA图，内核融合） |

> 🔥 **顶尖表现者**：**vLLM** 在 *批处理效率* 与 *内核级调优* 上占据主导；**Unsloth** 在 *推理延迟* 上表现出色（60 FPS）。  
> ⚠️ **重大风险**：**SGLang** 与 **Ollama** 尽管具备先进功能，仍面临 *分布式执行隐患*（挂起、崩溃）。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 核心差异化 |
|------------|-------------------------------|-------------|
| **vLLM**   | **高性能推理引擎**            | 专为大规模、批处理、长上下文推理优化；批处理与注意力内核业界最佳 |
| **SGLang** | **高级推理网关**              | 支持复杂模式（dLLM，分层缓存）；多模态与结构化输出支持强大 |
| **llama.cpp** | **本地运行时与跨平台引擎** | 最广模型/硬件覆盖（GGUF，Vulkan，Metal，NPU）；适合边缘/离线场景 |
| **Ollama** | **开发者友好的本地网关**      | 统一模型管理用户体验；强聚焦MLX/结构化输出；适合原型开发 |
| **LiteLLM** | **企业级网关与可观测层**     | 成本控制、预算强制、护栏与遥测能力卓越；专为团队级治理设计 |
| **Unsloth** | **以代理为中心的本地运行时** | 专为交互式代理打造；丰富的UI、工具调用控制与实时推理（60 FPS） |

> 💡 **生态洞察**：该生态系统正趋于分层——**vLLM/SGLang** 承担后端推理；**llama.cpp/Ollama** 服务本地/边缘负载；**LiteLLM** 管控生产使用；**Unsloth** 实现代理优先体验。

---

### **6. 趋势信号**

1. **混合架构已成为主流**  
   - Mamba+Attention（Qwen3、GLM-5.3-Flash）已不再属于实验阶段。vLLM 与 SGLang 已优先实现前缀缓存与推测解码，表明这些模型已进入生产环境。

2. **硬件特化加速推进**  
   - SM120（Blackwell）、MI355X（gfx950）、XDNA 2（Ryzen AI NPU）已成为关键目标。vLLM 与 Unsloth 在GPU专用内核优化上处于领先地位。

3. **生产环境中稳定性 > 功能**  
   - 尽管发布了功能丰富的版本（SGLang dLLM、Unsloth 60 FPS），但*关键回归问题*仍主导问题跟踪列表。这表明生态已进入成熟阶段，鲁棒性成为首要考量。

4. **代理需要结构化输出保障**  
   - 多个项目（Ollama、SGLang、LiteLLM）正在修复JSON模式挂起、流式护栏跳过、工具调用截断等问题——证明*代理可靠性*已是顶级关切。

5. **成本与安全治理不容妥协**  
   - LiteLLM 的3个关键预算/安全问题凸显，企业采纳的核心在于可强制执行的成本控制与审计能力。

> ✅ **开发者行动建议**：  
> - 使用 **v0.5.0（llama.cpp）** 或 **v0.34.4-rc1（Ollama）** 进行稳定部署。  
> - 在修复前避免在H200上使用 `trtllm_mha`。  
> - 监控 **Unsloth的测试版**，用于支持视觉输入的代理工作流。  
> - 利用 **LiteLLM的邮件告警与成本地图** 应用于受监管环境。  
> - 在构建RAG或智能体系统时，优先考虑 *前缀缓存* 与 *草稿模型稳定性*。

---  
*报告生成时间：2026-09-24 | 数据来源：GitHub项目摘要*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-24

---

### **1. 今日亮点**  
vLLM 持续推进对混合 Mamba+Attention 模型的支持，重点在前缀缓存和 Qwen3 系列模型的推测解码方面实现了关键的性能与正确性提升。主要的 PR 包括通过自适应占用率的 Triton 内核优化 SM120（Blackwell）GPU 性能，以及修复 MI355X 上 ROCm KV 缓存内存溢出问题。当前核心重点仍在于支持批量无关推理，并提升长上下文推理工作流的稳定性。

---

### **2. 发布与破坏性变更**  
过去 24 小时内无报告。未发布新版本，也未引入破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- ✅ **ROCm / AMD gfx950 (MI355X)**：正在积极优化 `Qwen3.8-2.4T-A95B-Quark-MXFP4`（Issue #57149），包括主机驻留稀疏-MLA 缓冲的 HiSparse 支持（PR #57602）。  
- ✅ **Intel XPU**：持续跟踪 `Qwen3.6-35B-A3B-int4-mixed-AutoRound` 的多卡与 MTP 问题（Issue #53119, #50269）。  
- ✅ **新增模型支持**：  
  - GLM-5.3-Flash 已进入活跃开发阶段，注意力架构兼容性已追踪（Issue #54062）。  
  - Whisper `verbose_json` 输出处理针对长音频进行了改进（Issue #58029）。  
- 🔧 **量化**：FlashInfer 中已添加每标记级 NVFP4 与 ReLU2 MoE 支持（PR #56740），现已集成至 vLLM。

---

### **4. 性能与优化**  
- 🚀 **SM120（Blackwell）优化**：PR #58482 在 Triton 统一注意力中引入基于占用率自适应的 split-K 段数，当 SM 利用率较低时，将 softmax 段数从 16 提升至 64，显著提升 GPU 利用率。  
- ⚡ **混合 GDN/Mamba 预填充**：PRs #55873、#55875、#55876 实现应用导向的 Mamba 检查点机制，使共享前缀批处理（如商品属性提取）的预填充吞吐量提升 **+7.58 倍**。  
- 💡 **推测解码**：PR #58463 移除了 MTP 融合多步解码过程中的冗余元数据重建，降低了 DeepSeek-V4 及未来模型的开销。  
- 📈 **KV 缓存效率**：PR #58483 通过在性能分析后根据实际空闲内存调整 KV 缓存大小，解决了 ROCm 内存溢出问题，对 DeepSeek-R1-MXFP4 等大型 MoE 模型在 TP8/MI355X 上至关重要。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|-----------|
| 🔴 高 | [GLM-5.3-Flash 长解码性能退化](https://github.com/vllm-project/vllm/issues/56868) | 使用 W4A16 量化累积推理后性能下降 | 进行中（尚未提交修复 PR） |
| 🔴 高 | [调度器停止接纳请求](https://github.com/vllm-project/vllm/issues/53130) | 引擎报告健康但一旦 `running + skipped_waiting` 达到 `max_num_seqs` 即停止接纳 | 无修复 PR；需重启恢复 |
| 🟡 中 | [FlashInfer 自动调优在 SM103（GB300）上卡死](https://github.com/vllm-project/vllm/issues/58031) | 因 `trtllm_gemm.cubin` 缺失 PTX（仅 sm_100a）导致自动调优挂起 | 根本原因已撤回；仍在调查中 |
| 🟡 中 | [Gemma 4 31B MTP 在高上下文下变慢](https://github.com/vllm-project/vllm/issues/52049) | 长上下文场景下观察到次优吞吐量 | 尚无 PR |
| 🟡 中 | [Whisper verbose_json 丢失单词](https://github.com/vllm-project/vllm/issues/58029) | 超过最大剪辑时长 `max_clip_s` 的音频段无声截断 | PR 待提交 |

---

### **6. 对应用开发者的意义**  
- **对于智能体与代理工作流**：混合模型的**前缀缓存**（PRs #55873–#55876）上线，可显著提升多轮、有状态推理的吞吐量——尤其适用于 RAG、验证及结构化输出任务。  
- **对于生产部署**：请谨慎设置 `--max_num_seqs` —— 调度器死锁问题（#53130）可能导致请求处理静默中断。务必密切监控引擎健康信号。  
- **对于使用 AMD GPU 的开发者**：预计将持续优化 gfx950（MI355X），尤其是在稀疏 MLA 与 MoE 模型方面——建议以 `Qwen3.8-2.4T-A95B-Quark-MXFP4` 作为测试基准。  
- **对于长上下文应用**：在 #56868 修复前，请避免使用 `GLM-5.3-Flash` 的 W4A16 量化；可考虑回退至 FP8 或更小的草稿模型。  
- **对于工具调用可靠性**：请关注 PR #57571（解析器缓存以确保稳定 ID），以保障流式模式下重试时工具调用行为的确定性。

> 🔗 *所有链接均指向 GitHub 问题与 PR，以获取完整上下文。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-09-24**

---

### **1. 今日重点**  
SGLang 生态系统持续深化对高级推理模式的支持，核心进展包括 **dLLM 服务**、**FP8 KV 缓存优化** 以及 **多模态鲁棒性**。关键更新包括新增 `/v1/decisions` 接口用于类型化候选评分，以及修复可能导致分布式部署永久挂起的旧版 torch 扩展锁问题。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性变更。最新稳定版仍为 `v0.5.20`，当前重点聚焦于 CI 稳定性及各后端功能一致性。

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen3.5 GDN**：通过 [PR #38806](https://github.com/sgl-project/sglang/pull/38806) 完成 AMD ROCm 优化，显著提升 gfx950/gfx1250 GPU 上的预填充效率。  
- ✅ **MiniMax-M3**：通过 [PR #36549](https://github.com/sgl-project/sglang/pull/36549) 实现 gfx950 上的 FP8 K 缓存分配支持。  
- ✅ **SenseNova-U1/U1.5**：已开启追踪任务 ([#37742](https://github.com/sgl-project/sglang/issues/37742))，以对齐官方仓库功能。  
- ✅ **Inkling 多模态**：无效图像输入导致的 HTTP 500 错误行为已修复（追踪 [#40897](https://github.com/sgl-project/sglang/issues/40897)）。  

*注意：由于锁定 `transformers==5.12.1` 版本，GLM-5.3-Flash 视觉支持仍不可用；详见 [#39831](https://github.com/sgl-project/sglang/issues/39831)。*

---

### **4. 性能与优化**  
- 🚀 **FP8 KV 缓存**：针对 `--kv-cache-dtype fp8_e4m3` 的优化持续推进，包括修复解码开销问题 ([#30815](https://github.com/sgl-project/sglang/issues/30815)) 及 `flashmla_kv` 后端索引问题 ([#36333](https://github.com/sgl-project/sglang/issues/36333))。  
- ⚙️ **MoE 路由**：提出统一 MoE 路由 GEMM 层，整合至单一门控核函数 ([#38695](https://github.com/sgl-project/sglang/issues/38695))，降低 CPU 开销并支持精度控制。  
- 🔧 **内核级改进**：  
  - AMD：在 MI355X 上为小批量添加融合 MXFP4 MoE 内核 ([#40204](https://github.com/sgl-project/sglang/pull/40204))。  
  - NVIDIA：CUDA 13.4 镜像中更新 DeepGemm ([#40987](https://github.com/sgl-project/sglang/pull/40987))。  
  - NPU：通过 MXFP8 低延迟路径优化 FP4 专家分派 ([#40519](https://github.com/sgl-project/sglang/pull/40519))。  
- 📈 **基准测试**：新增 `--gsp-input-ids` 标志，用于在基准测试中跳过服务器端分词步骤 ([#40900](https://github.com/sgl-project/sglang/pull/40900))。

---

### **5. 稳定性与回归问题**  
今日报告多个严重稳定性问题：

| 严重程度 | 问题 | 影响 | 状态 |
|--------|-------|--------|--------|
| 🔴 高 | `KeyError: 'model.layers.14.mlp.shared_expert.gate_gate_up_proj.weight'` ([#13214](https://github.com/sgl-project/sglang/issues/13214)) | 特定 MoE 层模型加载失败 | 开放，15 条评论 |
| 🔴 高 | `--attention-backend trtllm_mha` 在 H200 (SM90) 上返回错误结果 | v0.5.20 版本存在无声正确性回归 | [问题 #40921](https://github.com/sgl-project/sglang/issues/40921) — 尚无修复 |
| 🔴 高 | HiCache + 混合 (SSM/Mamba)：`cudaHostRegister` 导致整个实例终止 | 内存分配失败引发进程崩溃 | [问题 #40926](https://github.com/sgl-project/sglang/issues/40926) — 尚无修复 |
| 🟡 中 | DeepSeek 分块前缀预填充将 base-2 LSE 合并为自然对数 | 每次前缀缓存命中均造成无声精度损失 | [问题 #40903](https://github.com/sgl-project/sglang/issues/40903) — 尚无修复 |
| 🟡 中 | 中断分块在 `--incremental-streaming-output` 下重新发送全部累积文本 | 流式输出效率低下 | [问题 #40901](https://github.com/sgl-project/sglang/issues/40901) — 尚无修复 |

> **注意：** 多个回归源于近期合并的 PR（如 #34160 回滚），凸显活跃开发分支中不稳定状态的风险。

---

### **6. 对应用开发者的影响**  
- **在 H200 (SM90) 上避免使用 `trtllm_mha`**，直至 [问题 #40921](https://github.com/sgl-project/sglang/issues/40921) 修复完成——该配置可能无声返回错误结果。  
- **在基准测试中启用 `--gsp-input-ids`**，以隔离模型性能与分词开销。  
- **关注模型兼容性**——GLM-5.3-Flash 视觉与 Qwen3.5 GDN 正在积极修复中，可能出现临时中断。  
- **谨慎启用 `--enable-hierarchical-cache`**——混合 SSM/Mamba 配置可能因 `cudaHostRegister` 错误导致崩溃 ([#40926](https://github.com/sgl-project/sglang/issues/40926))。  
- **尽早利用新 `/v1/decisions` API**（正在通过 [#40992](https://github.com/sgl-project/sglang/pull/40992) 推进），实现代理中结构化、类型化的决策逻辑，无需解析原始文本。  

密切关注 CI 健康状况：[问题 #17050](https://github.com/sgl-project/sglang/issues/17050) 报告 2 个失败、11 个不稳定的测试。仅在测试中使用 `dev` 镜像；避免在生产环境中使用未经验证的代码。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-24**

---

### **1. 今日亮点**  
`v0.5.0` 版本带来了显著的后端改进，包括对 HRM-Text (DFM Mimir 1B)、MiMo-V2.6 和 HunyuanOCR 等新兴模型的增强支持，同时修复了服务器/路由模块的稳定性问题。关键性能提升包括恢复 CUDA 稀疏闪注意力（sparse flash attention），并引入新的 Metal 内核优化；当前工作重点仍聚焦于解决 Vulkan、ROCm 及草稿模型处理中的严重回归问题。

---

### **2. 发布与破坏性变更**  
- **`v0.5.0`** 已发布：重点关注后端正确性、更广的模型覆盖范围以及服务器/路由的更强韧性。  
  - 新增多地址 HTTP 绑定（`--host`）功能，以及 OpenAI 兼容接口对视频 URL / data URI 的支持。  
  - 修复服务器休眠期间令牌计数 API 崩溃的问题（修复：#29309）。  
  - [GitHub 发布页](https://github.com/ggml-org/llama.cpp/releases/tag/v0.5.0) | [验证文件](https://github.com/ggml-org/llama.cpp/attestations/49630180)

---

### **3. 新模型与硬件支持**  
- ✅ **HRM-Text (DFM Mimir 1B)**：已添加 GGUF 转换与运行时支持。  
- ✅ **MiMo-V2.6 与 HunyuanOCR**：通过 `convert` 工具新增转换支持。  
- ✅ **Gemma4 DSpark 草稿主干**：完整支持全注意力与 SWA 变体，包含绑定输出权重与元数据。  
- ✅ **Ling-3.0 VL**：视觉语言模型支持已合并（PR #29151）。  
- ✅ **Hexagon NPU**：新增 Windows Arm64 CI 构建（PR #29052）。  
- ✅ **OpenCL**：为 RDNA3 GPU 添加 A8 Q6_K 非 MoE dp4a 二进制内核（PR #29057）。

---

### **4. 性能与优化**  
- **CUDA**：重新启用 dsv4 预填充阶段的 `sparse-fa`（PR #29298）；查询循环展开以降低开销。  
- **Metal**：修复量化闪注意力中的线程组内存溢出问题（PR #29340），提升长上下文解码稳定性。  
- **SYCL**：IQ3 代码重排改善 Intel Arc Pro B70 性能（PR #29107）。  
- **Vulkan**：Int8 coopmat1 矩阵乘法现支持 q4_0–q6_k、mxfp4、nvfp4，适用于 RDNA3/RDNA4（PR #27952）。  
- **Qwen4exp**：通过直接文件读取优化懒加载张量行聚合（PR #29030），在集成平台（如 Strix Halo）上降低延迟。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 状态 | 修复 PR |
|--------|------|--------|--------|--------|
| 严重 | `v0.3.0-dev` 在 Vulkan/RDAN3 上执行提示时速度下降（b10780 后） | 约 30 倍减速 | 开放 (#28752) | 无 |
| 高 | `ggml_cuda_init: failed to initialize CUDA: unknown error` | GPU 初始化失败 | 已关闭 (#7218) | 旧版；可能为驱动/SDK 不匹配 |
| 高 | 服务器从休眠唤醒时，令牌计数路由触发 SIGSEGV | 高负载下崩溃 | 开放 (#29188) | 已在 v0.5.0 中修复（PR #29309） |
| 高 | Vulkan：上下文长度达 131072 时，解码吞吐量骤降约 78% | 内存碎片化 | 开放 (#27734) | 临时方案：`GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` |
| 高 | Metal：Qwen4exp 在长上下文下仅输出 1 个 token 即发出 EOS | 静默空输出 | 开放 (#28805) | 尚无修复 |
| 中 | CUDA：Qwen4exp 中 `top_k_radix_cuda` 未编译/使用 | 缺失优化 | 开放 (#29326) | 待处理 |

> ⚠️ **注意**：在草稿推理（draft-MTP）、MoE 路由及 RPC 分割生成方面报告了多个回归问题——尤其在 AMD/Intel 硬件上更为明显。

---

### **6. 对应用开发者的意义**  
- **立即升级至 `v0.5.0`**，确保服务器稳定运行，特别是使用路由器模式或长上下文模型的场景。  
- **若在 RDNA3 GPU 上使用 Vulkan 并处理大上下文（>131k tokens）**，请启用 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`。  
- **避免在不启用 `GGML_CUDA_FA_ALL_QUANTS=ON` 的情况下使用 `q4_0/q4_1` KV 缓存**——否则将静默回退至 CPU，导致 30 倍性能损失（参见问题 #28633）。  
- **预计 Qwen4exp 与 Gemma4 DSpark 草稿仍存在不稳定情况**，直到相关修复合并；请持续关注问题追踪器更新。  
- **利用新支持的视觉模型（Ling-3.0 VL、HRM-Text）**，通过 OpenAI 兼容接口构建多模态应用。  
- **针对 Apple Silicon 优化 Metal 性能**：谨慎使用 `--n-cpu-moe` —— 释放的内存会流向 GPU0，可能导致多 GPU 系统发生 OOM（PR #29343 已明确说明此行为）。

👉 *敬请关注：草案-MTP 与 MoE 稳定性的最终验证仍在进行中。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama 摘要 – 2026-09-24**

---

### **1. 今日重点**  
最新发布的 `v0.34.4-rc1` 修复了关键稳定性问题，包括间歇性“模型未找到”错误以及在持续负载下基于 MLX 的推理出现的持久卡顿。在 MLX 模型的结构化输出可靠性方面取得显著进展——已合并多项修复，防止无限输出空白字符并改进模式处理，直接提升了代理与工具链的工作流表现。与此同时，新功能开发持续推进 OpenAI 兼容工具链及模型导出能力。

---

### **2. 发布与破坏性变更**  
- **`v0.34.4-rc1`** 包含：  
  - 🔧 修复间歇性“模型未找到”错误 ([#18438](https://github.com/ollama/ollama/pull/18438))  
  - ✅ 为思考类模型实现单次遍历的结构化输出 ([#18479](https://github.com/ollama/ollama/pull/18479))  
  - ⚠️ *注意：* 从 `0.32.14+` 升级的用户若使用仅 GPU 模型，可能会遇到 CPU 使用率飙升问题——该问题正在通过正在进行的 PR 解决（详见稳定性部分）。

---

### **3. 新模型与硬件支持**  
- **新模型请求**：  
  - [Issue #15887](https://github.com/ollama/ollama/issues/15887) 和 [Issue #18616](https://github.com/ollama/ollama/issues/18616) 分别提出对 MIMO v2.5 及 v2.6-Pro/Flash 的支持需求——两者均为开源模型，具备百万级上下文长度潜力。  
- **硬件/后端**：  
  - 通过 [PR #16446](https://github.com/ollama/ollama/pull/16446) 更新了 ROCm v10 支持，提升 HCL 在 Linux 与 Windows 上的表现。  
  - MLX 引擎现已支持全局 F32 缩放，并修复 Nemotron 层命名、量化及激活缩放问题 ([PR #18614](https://github.com/ollama/ollama/pull/18614))。

---

### **4. 性能与优化**  
- **MLX 推理卡顿**：`mlxrunner` 中存在一个严重缺陷，在持续单槽负载下，已接受的请求会无限期卡在 `processed=total-1` 状态 ([Issue #18505](https://github.com/ollama/ollama/issues/18505))。修复工作正在进行中，相关方案见 [PR #17834](https://github.com/ollama/ollama/pull/17834)（负载进度追踪 + 卡顿检测）。  
- **GPU 系统上的 CPU 过热**：`v0.32.14+` 版本引入了过度的 CPU 使用（核心利用率高达 ~100%），即使模型完全可容纳于显存中亦然 ([Issue #17833](https://github.com/ollama/ollama/issues/17833))。根本原因已被定位为不必要的轮询操作；通过在检测到 GPU 时向 `llama-server` 传入 `--poll 0` 参数，在 [PR #18613](https://github.com/ollama/ollama/pull/18613) 中完成修复。  
- **嵌入性能优化**：优化 `/api/embed` 接口，避免冗余的 JSON 序列化/反序列化操作 ([PR #18610](https://github.com/ollama/ollama/pull/18610))，显著降低批量嵌入任务的开销。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复/临时方案 |
|---------|------|--------|----------------|
| 🟡 高 | MLX 上的结构化输出永不终止（`format`/JSON schema）——无限输出空白字符 ([#18567](https://github.com/ollama/ollama/issues/18567)) | ✅ 已在 [PR #18569](https://github.com/ollama/ollama/pull/18569) 中修复 |
| 🟡 高 | Homebrew 安装的 Ollama 因缺少 xgrammar 库而无法提供结构化输出 ([#18597](https://github.com/ollama/ollama/issues/18597)) | ❗ 进行中 — 与原生库打包相关 ([PR #18611](https://github.com/ollama/ollama/pull/18611)) |
| 🔴 严重 | `glm-ocr` 在 `0.34.1+` 版本中因“令牌重复限制达到”错误失败 ([#18609](https://github.com/ollama/ollama/issues/18609)) | ⚠️ 回归问题 — 修复待定，见 [PR #17195](https://github.com/ollama/ollama/pull/17195) |
| 🔴 严重 | 使用 `gemma4ArgsToJSON` 时，工具调用中超过 45 个字符串值因索引冲突被丢弃 ([#18605](https://github.com/ollama/ollama/issues/18605)) | ⚠️ 回归问题 — 尚无修复方案 |
| 🟡 中等 | 持续的 `/api/embed` 负载导致 Windows 系统回环端口耗尽 ([#18392](https://github.com/ollama/ollama/issues/18392)) | ⚠️ HTTP 客户端长连接已禁用 — 临时方案：减少批处理大小或使用外部客户端 |

---

### **6. 对应用开发者的影响**  
- **代理开发者**：结构化输出的可靠性已显著提升——预计在 MLX 引擎上进行 JSON 模式验证时卡顿更少。建议使用 `v0.34.4-rc1` 或更高版本以确保工具调用稳定。  
- **部署工程师**：若在 GPU 系统上观察到 CPU 满载，请避免使用 `v0.32.14+` 版本——可通过添加 `--poll 0` 参数打补丁，或升级至 `v0.34.4-rc1`。需监控 MLX 在持续吞吐下的负载行为。  
- **工具集成者**：使用 Gemma 4 时，请谨慎处理大型参数列表（如包含大量行的表格）——超出约 45 个字符串的值可能被无声丢弃。  
- **模型导出者**：新推出的 `ollama export/import` 命令 ([PR #18578](https://github.com/ollama/ollama/pull/18578)) 支持离线模型迁移，适用于隔离环境。  
- **未来规划**：关注 MIMO v2.5/v2.6 的支持进展——其长上下文能力有望开启高级 RAG 与文档分析流水线。  

> 💡 *建议*：生产环境请锁定至 `v0.34.4-rc1` 以保障稳定性，直至正式发布。关注 [issue #12187](https://github.com/ollama/ollama/issues/12187) 以了解 OpenWebUI 集成中 GPT-OSS 工具调用完成问题。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-09-24**

---

### **1. 今日亮点**  
LiteLLM 项目持续快速演进，重点聚焦于**成本准确性**、**安全强化**和**企业级可观测性**。关键更新包括修复关键的预算强制绕过漏洞、增强护栏可靠性，以及扩展模型成本映射——尤其针对 Vertex AI 和 OpenRouter。新增功能如可配置的团队预算邮件告警和可发现的模型控制，使运维人员能够大规模管理使用情况。

---

### **2. 发布与破坏性变更**  
今日未发布新的稳定版本；最新版本为 `v1.104.0-dev.1`、`v1.102.1`、`v1.101.2`、`v1.101.1`、`v1.100.2` 和 `v1.99.3`。所有 Docker 镜像自 2025 年初以来始终通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53) 使用同一密钥签名。这些版本中未引入 API 或配置层面的破坏性变更。

> 🔗 验证签名：[cosign 文档](https://docs.sigstore.dev/cosign/overview/)

---

### **3. 新模型与硬件支持**  
- ✅ **Vertex AI**：新增成本映射条目，包括：
  - Llama 3.3 70B (MaaS)
  - Veo 2 & Veo 3
  - 虚拟试穿
  - GA 2.5 TTS 模型  
  *(PR #42837)*  
- ✅ **OpenRouter**：同步 18 条漂移定价行，并新增分层 Qwen 定价（32k/128k/256k 上下文）。  
  *(PR #42832)*  
- ✅ **Gemini**：在成本映射中添加预览别名和 Deep Research 04-2026 模型 ID。  
  *(PR #42833)*  
- ✅ **Azure AI**：修正 FLUX.2 编辑计费逻辑，现已根据参考图像像素数量计费（按兆像素计费）。  
  *(PR #42829)*

---

### **4. 性能与优化**  
- 🚀 **成本计算性能**：`litellm-cost` Rust 库现支持独立的令牌、媒体、工具、搜索和护栏成本计算，实现跨语言一致性与基准测试能力。  
  *(PR #42620)*  
- 📈 **用量页面可扩展性**：通过扩大搜索范围至前 100 名以外的键值，解决了性能瓶颈。现支持对所有键值进行全文搜索。  
  *(PR #42836)*  
- ⚙️ **缓存效率**：同步缓存命中日志现在会标注提供方信息，提升下游支出追踪精度。  
  *(PR #42830)*

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|--------|------|--------|-----------|
| 🔴 严重 | v1.82.3 (`max_budget`) 中预算强制绕过 | 用户无声超出限额 | PR 待处理 (#26672) |
| 🔴 严重 | 速率限制器重复计算团队-模型限额 → 实际 RPM/TPM 减半 | 高负载下过度限流 | PR 待处理 (#34140) |
| 🔴 严重 | Redis 协调启动竞争条件导致持续预算不一致 | Pod 级别预算漂移 | PR 待处理 (#42653) |
| 🟡 高 | 流式传输护栏在敏感值被拆分到多个 SSE 数据块时跳过检查 | 存在安全绕过风险 | PR 待处理 (#41611) |
| 🟡 高 | Presidio PII 护栏默认开启且跳过输入扫描 | 产生虚假安全感 | PR 待处理 (#30728, #41265) |

> 🔗 完整问题列表：[GitHub Issues](https://github.com/BerriAI/litellm/issues?q=is%3Aopen+sort%3Aupdated-desc)

---

### **6. 对应用开发者的启示**  
- **谨慎使用旧版代理版本**（尤其是 v1.82.3）：预算可能被错误执行——若正在使用此版本，请立即升级。
- **通过新 `email_alert_percentage` 元数据启用细粒度预算告警**（PR #42665）——适用于团队财务流程。
- **避免仅依赖缓存响应而忽略完整提供方上下文**：确保您的遥测系统能正确处理缓存命中中的提供方标记（修复 PR #42830）。
- **在流式传输和多数据块场景下验证护栏行为**：已知的值拆分和历史扫描问题可能导致敏感信息暴露。
- **利用新的成本映射精度**，在受监管环境中实现准确计费（通过审计追踪实现欧盟《人工智能法案》合规，现可通过 PR #29895 实现）。

> 💡 小贴士：使用 `model_info.discoverable: false`（PR #42825）可将实验性模型从用户可见的 `/v1/models` 接口隐藏，同时仍可通过直接路由访问。

---  
*摘要生成时间：2026-09-24 | 来源：[BerriAI/litellm GitHub](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-09-24**

---

### **1. 今日亮点**  
Unsloth v0.1.815-beta 正式支持本地推理 **Qwen-Image-2.1**，包含自定义 Agent 技能以及改进的聊天/项目管理功能。本次发布还引入了 **2倍更快的推理模块（60 FPS vs 30 FPS）**，优化了 Linux 安装流程，并修复了 AMD ROCm 与 Windows GPU 工作流中的关键稳定性问题。

---

### **2. 发布与破坏性变更**  
- **v0.1.815-beta**：正式版本，支持 `Qwen-Image-2.1-GGUF`，新增 Agent 技能及 60 FPS 推理性能。  
  🔗 [发布说明](https://github.com/unslothai/unsloth/releases/tag/v0.1.815-beta)  
- **迁移提示**：从旧版本升级的用户需通过 UI 重新下载模型以避免重复下载（参见 #11637）。

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen-Image-2.1** 现已完全支持本地运行，兼容 GGUF 与 FP8 文本编码器降级方案。  
  🔗 [Qwen Image 2.1 指南](https://unsl)  
- ✅ **AMD Ryzen AI NPU (XDNA 2)**：通过 Studio 中的 Lemonade + FastFlowLM 实现实验性支持（PR #11743）。  
  🔗 [PR #11743](https://github.com/unslothai/unsloth/pull/11743)  
- ✅ **ROCm 10 兼容性** 正在调查中；已报告多个问题（#9932, #11638, #11646）。  
- ❌ **Adreno GPU** 支持已提出请求但尚未实现（#11674）。

---

### **4. 性能与优化**  
- 🚀 **2倍更快的推理模块**：得益于优化的 CUDA 图与内核融合，现已实现 **60 FPS**（此前为 30 FPS）。  
- ⚡ **静态步跳过**：在图像/视频生成中引入（PR #11737, #11748），支持预设跳过步骤，可与 CUDA 图组合使用，避免运行时开销。  
- 📦 **NVFP4 FlashInfer 后端**：按需安装（PR #11730），通过避免 torchao 回退机制，显著提升 NVIDIA GPU 上的推理速度。  
- 🧠 **逐层 NVFP4 策略**：PR #10730 实现对 DiT 系列模型（如 Wan2.2-TI2V-5B、HunyuanVideo）的细粒度量化控制。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 影响 | 解决方案 / 临时应对 |
|---------|------|--------|--------|------------------|
| 严重 | **AMD ROCm：图像生成期间 GPU 崩溃** (`hipErrorLaunchFailure`, `terminate`) | 开放 (#9130) | 整个服务器崩溃 | 尚无修复；临时方案：禁用 VAE 调优 |
| 高 | **AMD：MIOpen 全面调优导致 10–23 分钟卡顿** | 开放 (#11636) | 长时间等待，gfx1030 上崩溃 | 在 ROCm 中禁用 `cudnn.benchmark` |
| 高 | **Windows ROCm：torch.distributed 缺失 → Qwen-Image-2.1 无法加载 FP8 编码器** | 开放 (#11638) | 模型无法启动 | 手动安装 torch distributed |
| 中等 | **Qwen-Image-2.1 下载后需手动操作** | 开放 (#11567) | 用户体验不佳 | 需重新下载资源文件 |
| 低 | **桌面端：窗口最大化时底部窗格条无响应（Windows）** | 开放 (#11734) | UI 交互失效 | 恢复窗口大小以触发点击 |

---

### **6. 对应用开发者的意义**  
- **构建更智能的 Agent**：利用新推出的 **Agent Skills** 与 **自定义工具调用禁用** 功能（#11671），实现安全、可审计的 Agent 行为——适用于敏感数据处理流程。  
- **优化推理延迟**：采用 **静态步跳过** 与 **NVFP4 flashinfer 后端**，降低启动时间，提升 NVIDIA GPU 的吞吐量。  
- **未来部署前瞻性布局**：关注 **ROCm 10 支持** 与 **AMD NPU 集成**，这些功能将在后续版本中扩展硬件覆盖范围。  
- **规避回归问题**：若使用 AMD ROCm，建议禁用 `cudnn.benchmark`，否则图像生成过程中可能出现长时间卡顿。  
- **增强调试能力**：新加入的 **Canvas 控制台错误暴露** 功能（#11744）使模型可查看 HTML 预览中的 JS 错误——对基于 Web 的 Agent UI 至关重要。

> 🔍 *专业提示*：对于将 Unsloth 集成至应用的开发者，建议启用 **原生 llama.cpp API**（#11705 请求中），以绕过 OpenAI 兼容层，获得更高级别的工具支持。

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*