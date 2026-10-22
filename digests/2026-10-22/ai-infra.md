# AI 基础设施日报 2026-10-22

> 生成时间: 2026-10-22 00:50 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-10-22**

---

### **1. 生态概览**  
AI 推理与服务生态正进入高度专业化与硬件融合的新阶段，各项目正在快速适配 AMD MI355X（gfx950）、NVIDIA Blackwell（SM120）和 Apple Silicon（MLX）等新一代架构。在高吞吐后端中出现的关键性能退化——尤其集中在 NVFP4、推测性解码和分布式 KV 缓存方面——凸显出在效率与正确性之间进行优化的复杂性日益加剧。与此同时，新型模型（MoE、多模态、混合 Mamba）和部署模式（拆分、代理编排）正在推动从底层内核到面向应用网关的全栈架构创新。

---

### **2. 活动对比**

| 项目       | 近24小时开放问题数 | 近24小时合并的PR数 | 发布状态         |
|------------|---------------------|----------------------|------------------|
| **vLLM**   | 8                   | 7                    | 稳定版：v0.32.0   |
| **SGLang** | 5                   | 6                    | 无发布；每日构建 |
| **llama.cpp** | 4                | 5                    | 仅构建：`b11803`+ |
| **Ollama** | 5                   | 6                    | v0.40.8（稳定版） |
| **LiteLLM** | 6                 | 5                    | v1.106.2–v1.103.7（安全补丁） |
| **Unsloth** | 5                  | 5                    | 无发布；重大变更即将来临 |

> 🔍 *观察*：LiteLLM 在快速响应安全问题方面领先，而 vLLM 与 SGLang 在核心推理优化上展现出最高的工程速度。尽管存在严重稳定性问题，Ollama 仍保持稳定版本发布。

---

### **3. 模型支持竞赛**

| 新模型 / 架构             | 支持项目                            | 备注 |
|--------------------------|-------------------------------------|------|
| **Qwen3.8-Flash-Next**   | vLLM, SGLang, Unsloth, llama.cpp    | vLLM/SGLang 实现完整 ROCm/AMD 支持；Unsloth 提供原生 MLX 支持 |
| **DeepSeek-V4.1-Flash**  | SGLang, Unsloth, llama.cpp          | SGLang 通过 DSpark 实现在 RTX PRO 6000 上运行 1M 上下文 |
| **Flint (FlintForCausalLM)** | **llama.cpp**, **Ollama**         | 仅此两项目支持完整的 GGUF + HF 转换 |
| **SenseNova U1（多模态）** | **llama.cpp**                       | 唯一具备图像转文本能力的项目 |
| **GLM-5.3-Flash（混合）** | SGLang, llama.cpp, Unsloth         | SGLang 在 Hopper/Blackwell 内核优化方面领先 |
| **MOSS-Image（扩散）**   | **Unsloth**                         | 首个将图像生成集成至 Studio UI 的项目 |

> 🏆 **领先者**：**Unsloth** 与 **SGLang** 在专用模型支持方面处于领先地位——尤其是在多模态、混合及扩散类工作负载上。

---

### **4. 性能前沿**

| 优化重点               | 领先项目                     | 关键进展 |
|------------------------|------------------------------|----------|
| **KV 缓存与内存管理**   | vLLM, SGLang, Ollama          | vLLM：修复 `DFlash` 草稿加载问题；SGLang：HiCache + 拆分架构；Ollama：上下文窗口精度提升 |
| **内核级效率**          | vLLM, SGLang, llama.cpp       | vLLM：ROCm 上融合 QK-norm+RoPE+gate；SGLang：SM90 上 CuTe DSL KDA；llama.cpp：Adreno X1 GEMM |
| **推测性解码**          | vLLM, SGLang, Ollama          | vLLM：MoE LoRA 处理优化；SGLang：tile-split FP8 稀疏解码；Ollama：DFlash2 块局部卷积 |
| **量化与混合精度**      | vLLM, SGLang, llama.cpp, Ollama | vLLM：NVFP4 性能退化；SGLang：MXFP8 输入直接写入；Ollama：MLX 并发生成 |
| **分布式与可扩展服务**  | SGLang, Ollama, LiteLLM        | SGLang：prefill-decode 拆分；Ollama：Cloud Pro 扩展问题；LiteLLM：代理路由待实现 |

> ⚙️ **前沿总结**：当前最活跃的前沿领域为 **分布式推理**（SGLang）、**移动端边缘内核**（llama.cpp）以及 **混合精度正确性**（vLLM）。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 差异化优势 |
|------------|------------------------------|------------|
| **vLLM**   | 推理引擎（GPU原生）           | 高吞吐、低延迟 GPU 服务领域的主导者；深度集成 FlashInfer |
| **SGLang** | 高性能服务框架                 | 聚焦可扩展性、拆分架构与代理工作流；强多节点支持 |
| **llama.cpp** | 本地运行时 / 边缘推理       | 跨平台覆盖无与伦比（移动端、NPU、SYCL、Vulkan）；适用于离线、隐私敏感场景 |
| **Ollama** | LLM 网关 / 开发者 CLI         | 桥接本地模型与工具调用、代理 API；开发者体验最强 |
| **LiteLLM** | API 网关 / 路由层            | 多提供方抽象层；成本感知、故障转移推理的关键使能者 |
| **Unsloth** | 代理平台 / 微调 UI           | 集成推理、微调与可视化于一体的 Studio；针对 Apple Silicon 与 MoE 优化 |

> 🧩 **战略洞察**：整个技术栈正趋向垂直整合——Unsloth（代理平台）、Ollama（网关）、LiteLLM（编排）、vLLM/SGLang（引擎）、llama.cpp（边缘运行时），各自占据独特细分市场。

---

### **6. 趋势信号**

#### ✅ **从今日活动提取的新兴趋势**：
1. **硬件特定优化已成为必需**  
   - ROCm/AMD（MI355X）、Blackwell（SM120）和 Apple MLX 已不再是“加分项”——而是性能与正确性的核心。
   - 落后的项目（如 vLLM 的 NVFP4 降速）将面临即时可用性下降。

2. **以代理为中心的工作流正驱动基础设施设计**  
   - SGLang 的拆分架构、Ollama 的 Flint 工具使用、Unsloth 的 Decision API 子代理，反映出向长周期、有状态代理演进的趋势，要求持久缓存、结构化输出与高效并行。

3. **安全是基础层，而非事后补丁**  
   - 恶意 `litellm==1.107.0` 事件凸显开源推理工具链已成主要攻击入口。镜像签名（Cosign）、审计日志与依赖验证已成不可妥协标准。

4. **内存与显存压力成为新瓶颈**  
   - MoE 模型、大上下文与扩散管线正在突破显存极限（Unsloth 的主机嵌入）、CPU 内存（llama.cpp 的 OOM）及跨 GPU 带宽（SGLang 的 Mooncake）。

5. **Rust 迁移预示长期性能愿景**  
   - LiteLLM 的 Rust 重写目标是 <1ms 开销——明确传递出未来推理引擎必须轻量、确定且可在大规模下扩展。

#### 🔮 **应用开发者应关注的重点**：
- **在类型保留缺陷修复前（`PR #19195`），避免在生产中使用 Flint（Ollama）**。
- **监控 vLLM 的 NVFP4 回退问题**——可能迫使延迟敏感部署切换至 FP8。
- **利用 llama.cpp 对 Adreno X1 与 Hexagon NPU 的支持**，构建移动/边缘代理系统。
- **为基于 Rust 的推理后端做好准备**——预计 2027 年将迎来显著性能提升。
- **使用签名的 Docker 镜像（LiteLLM、Ollama）**，并在 CI/CD 流程中验证签名。

---

> 📌 **最终结论**：AI 基础设施格局不再仅关乎速度——而是关于**跨异构硬件与代理工作流的正确性、安全性与可组合性**。选择技术栈不应追随热度，而应契合自身模型、硬件与可靠性需求。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-10-22**

#### **1. 今日亮点**  
vLLM 项目持续加速对下一代推理的硬件与模型支持，重点推进 Qwen3.8-Flash-Next 与 Qwen3.8-2.4T-A95B 在 gfx950（MI355X）上的 ROCm/AMD 性能优化，同时修复了混合精度检查点中 `DFlash`/`DSpark` 草稿加载的关键问题。在 DGX Spark（GB10/SM121）上发现 `NVFP4` 解码性能存在严重回归（自 v0.29.0 版本以来约 16% 的性能下降），目前多个 PR 正在积极解决推测解码、MoE 专家 LoRA 处理以及 KV 缓存对齐方面的正确性问题。

#### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性变更。最新稳定版本仍为 **v0.32.0**，夜间构建继续追踪 `main` 分支。

#### **3. 新模型与硬件支持**  
- ✅ **新增 ROCm 支持**：  
  - 通过 PR #62622，`amd/Muse-Spark-Open-816B-A42B-Quark-MXFP4` 现已在 ROCm 上获得支持。  
  - 为支持 AMD GPU 的便携 Triton 内核，新增 `amd/Step-5-Preview`（PR #61837）。  
- 📌 **新模型集成**：  
  - 新增 `nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4` 与 `dory1.0-4b-bf16`（PRs #60149, #63001）。  
- ⚙️ **后端扩展**：  
  - `DeepSeek-V4-Flash-0731` 已进入 SM8x（Ampere: A100/A800）支持追踪状态（Issue #50576）。  
  - RDNA 平台上对混合 Mamba 模型的支持通过回退修复得到增强（Issue #50264）。

#### **4. 性能与优化**  
- 🔥 **关键 NVFP4 性能回归**：  
  FlashInfer NVFP4 因果预填充在 SM120（Blackwell 消费级显卡）上比 FP8 慢 **1.7–1.8 倍** —— 问题 #50416。  
- 📈 **ROCm 性能聚焦**：  
  针对 gfx950（MI355X）上的 `Qwen3.8-Flash-Next` 与 `Qwen3.8-2.4T-A95B`，通过多合并 PR 进行持续优化（问题 #59575, #57149）。  
- 💡 **内核改进**：  
  - 修复因高斯拟合偏差导致的 top-k gather pivot 不准确问题（问题 #61998）。  
  - 在 ROCm 上为 Qwen3-Next 启用融合的 QK-norm+RoPE+gate 内核（PR #51406）。  
  - JIT 与 AOT 路径间共享编译缓存哈希机制提升缓存效率（PR #62628）。

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|------|-------------|------------|
| ⚠️ 高 | #62776 | 在 GB10（v0.32 夜间版）上，当提示内容超过 `indexer_budget`（约 2K tokens）时，Qwen3.8-Flash-Next 中内容不可见 | ❌ 尚未修复 |
| ⚠️ 高 | #59770 | 自 v0.29.0 起，Nemotron-3.5-Lightning 在 DGX Spark（GB10/SM121）上解码性能下降约 16% | ❌ 无修复进展 |
| ⚠️ 中 | #62320 | 混合注意力/Mamba 模型在 B12X 后端因块大小膨胀（2176 对比最大 128）而失败 | ❌ 阻塞部署 |
| ⚠️ 中 | #62559 | Mooncake 代理即使解码失败也返回 HTTP 200 | ❌ 仍在开放 |
| ⚠️ 低 | #62225 | CPU 后端对非 LoRA 请求静默应用 LoRA 适配器 | ❌ 静默输出错误 |

#### **6. 对应用开发者的启示**  
- **在 Blackwell 上谨慎使用 NVFP4**：预期 `FlashInfer` 后端出现显著延迟恶化——若对低延迟要求严格，请考虑切换至 `FP8`。  
- **避免在长上下文提示中设置 `indexer_budget` 限制**：若在 GB10 上使用 Qwen3.8-Flash-Next，确保提示长度低于约 2K tokens，否则可能遭遇静默截断（#62776）。  
- **在 B12X 上使用混合模型？请等待**：块大小膨胀导致兼容性破坏——请勿使用 `--attention-backend b12x`，直至 #62320 修复。  
- **推测解码 + 结构化输出？需保持警惕**：推测解码下的草稿验证逻辑可能无法保持输出分布一致性（RFC #62818）。  
- **ROCm 用户**：预计 Qwen3.8 系列在 MI355X 上将持续优化；请关注 PR #59575、#57149 与 #61529 以获取稳定性提升信息。

> 🔗 *完整上下文参见：[vLLM GitHub Issues](https://github.com/vllm-project/vllm/issues), [Pull Requests](https://github.com/vllm-project/vllm/pulls)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-10-22**

---

### **1. 今日重点**  
SGLang 项目持续深化对大规模、高吞吐推理的支持，关键进展包括 **预填充-解码分离**、**多节点可扩展性** 以及 **Hopper (SM90) 内核优化**。主要工作方向涵盖修复 SM120 GPU 上 `fa4` 注意力后端的稳定性问题、解决不稳定的 CI 流水线，以及推进 dLLM 服务和智能体缓存调度的路线图。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告新版本发布或破坏性变更。*

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen3.8-Flash-Next (gfx950 / MI355X)**：针对支持 ROCm 的 AMD 部署，性能监控已启动 ([#44304](https://github.com/sgl-project/sglang/issues/44304))。  
- ✅ **DeepSeek-V4.1-Flash (SM120, 仅 PCIe)**：现场反馈确认，在启用 DSpark 且使用 4 块 RTX PRO 6000 显卡的情况下，成功实现 100 万上下文长度的服务 ([#44445](https://github.com/sgl-project/sglang/issues/44445))。  
- ✅ **GLM-5.3-Flash (SM120 与 SM90)**：持续优化适用于 Hopper (SM90) 与 Blackwell (SM120) 的性能，包括修复 CUDA graph capture 问题及改进混合扩展重塑逻辑 ([#42012](https://github.com/sgl-project/sglang/issues/42012), [#45373](https://github.com/sgl-project/sglang/issues/45373))。  
- ✅ **AMD 分离架构**：CI 现在回退至 `ibv_reg_mr` 以恢复 Mooncake KV 缓冲区注册的测试稳定性 ([#45691](https://github.com/sgl-project/sglang/pull/45691))。

---

### **4. 性能与优化**  
- 🔧 **Hopper (SM90) 内核支持**：CuTe DSL KDA 验证内核现已扩展至 SM90，实现原生验证路径，不再依赖 Triton 回退 ([#44612](https://github.com/sgl-project/sglang/pull/44612))。  
- 🔧 **稀疏解码灵活性**：TileLang FP8 稀疏解码现在支持任意块分割（不仅限于二分），显著提升如 GLM-5.3-Flash 等模型的 GPU 利用率 ([#45274](https://github.com/sgl-project/sglang/pull/45274))。  
- 🔧 **注意力后端优化**：  
  - DeepSeek-V4.1 Mega 注意力现可直接写入 MXFP8 输入，减少冗余内核调用 ([#45632](https://github.com/sgl-project/sglang/pull/45632))。  
  - TRTLLM-Gen 注意力后端新增对 DeepSeek-V4 的 PD 分离支持 ([#45221](https://github.com/sgl-project/sglang/pull/45221))。  
- 📈 **预填充-解码分离**：现已全面集成 HiCache、推测解码及多种并行策略（TP/PP/CP/DCP/DP）。Q4 路线图将持续优化 ([#43699](https://github.com/sgl-project/sglang/issues/43699))。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复合并请求？ |
|------|----------|--------|---------|
| [CUDA 核心转储追踪 #26340](https://github.com/sgl-project/sglang/issues/26340) | 严重 | 开放 | ❌ 尚无修复 |
| [SM120 上的 GLM-5.3-Flash：fa4 在 CUDA-graph 捕获时崩溃](https://github.com/sgl-project/sglang/issues/42012) | 高 | 开放 | ❌ 仅 Triton 可用 |
| [GB300 上使用 32 个分词器工作进程 + cuda_vmm 启动时内存溢出](https://github.com/sgl-project/sglang/issues/45345) | 高 | 开放 | ❌ 待调查 |
| [静默的 DP rank 阻塞 /flush_cache](https://github.com/sgl-project/sglang/issues/45512) | 中等 | 开放 | ❌ 尚无修复 |
| [FP8 块量化检查点间歇性输出错误 token](https://github.com/sgl-project/sglang/issues/45000) | 高 | 开放 | ❌ 在 RTX 3090 上可复现 |

> ⚠️ 多个稳定性问题影响生产级部署——尤其在 SM120 和多节点 GB300 环境中——凸显了内存管理与后端正确性方面的持续挑战。

---

### **6. 对应用开发者的启示**  
- **在 SM120 GPU 上避免使用 `fa4` 注意力**，直至混合扩展重塑的崩溃问题修复完成——可临时使用 `triton` 作为替代方案。  
- **使用 Clef 检查点时，显式启用 `--cuda-graph-backend-prefill`**，以防止静默覆盖 ([#45692](https://github.com/sgl-project/sglang/pull/45692))。  
- **充分利用分离架构以实现横向扩展**：预填充-解码分离现已稳定且广泛支持；可用于长上下文智能体及高并发负载场景。  
- **注意多节点部署中的 OOM 风险**——特别是当使用 `--tokenizer-worker-num 32` 和 `cuda_vmm` 传输时——必要时可调整工作进程数或禁用 VMM。  
- **对于智能体系统**，建议通过 RFC [#45416](https://github.com/sgl-project/sglang/issues/45416) 启用 PPD（在解码工作进程上预填充短请求），以降低多轮对话场景下的延迟。

---  
*敬请期待即将发布的 v0.5.23 版本，预计将包含其中多项修复。*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 摘要 – 2026-10-22**

---

### **1. 今日亮点**  
最新发布周期带来了模型与后端的重大升级，包括对 **Flint (FlintForCausalLM)** 和 **SenseNova U1** 模型的支持，进一步拓展了 llama.cpp 在新兴多模态与密集语言架构领域的覆盖范围。性能方面，针对 **Adreno X1 设备（OpenCL）** 的关键内核优化，以及 `llama` 中新增的融合 QSA mask 操作，显著提升了推理效率；同时，推测解码与 MoE 缓存的持续研发工作，也预示着更深层次的架构优化正在推进。

---

### **2. 发布与破坏性变更**  
- **最新构建版本**：`b11803`, `b11802`, `b11801`, `b11800`, `b11799`, `b11798`, `b11797`, `b11796`, `b11795`, `b11793`  
  - [GitHub 发布页面](https://github.com/ggml-org/llama.cpp/releases)  
- **关键 API/配置更新**：  
  - `server`：采样参数现已通过 `/v1/messages` 完全转发（PR #30856），提升与 OpenAI 兼容 API 的兼容性。  
  - Jinja 解析器修复：命名空间属性遮蔽问题（PR #30941）与十六进制字符串转义问题（PR #30929），确保模板渲染更加稳健。  
  - 新增 `clean_spaces` GGUF 键，用于控制解标记化时的空格处理行为（PR #30940）。

---

### **3. 新模型与硬件支持**  
- **新模型**：  
  - ✅ **Flint (FlintForCausalLM)** – 已添加支持，包含完整的 HF 到 GGUF 转换、滑动/完整注意力机制，以及路由/共享专家结构（PR #30928）。  
    [PR #30928](https://github.com/ggml-org/llama.cpp/pull/30928)  
  - ✅ **SenseNova U1** – 已添加理解分支支持（U1.5-8B-MoT），涵盖图像到文本及多模态生成能力（PR #28919）。  
    [PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919)  
- **硬件与后端**：  
  - ✅ **Hexagon NPU**：新增 DSV4_HC_PRE 与 DSV4_HC_POST 操作（PR #30953）。  
  - ✅ **Adreno X1 (OpenCL)**：针对 Q4_0、Q4_K、Q6_K 的 GEMM 优化二进制内核（PRs #30947–#30949）。  
  - ✅ **SYCL**：融合 QSA 评分操作（PR #30640），支持 GLM5.3-next。  
  - ✅ **OpenCL**：IM2COL_3D 支持（PR #30895），有助于视觉模型中卷积层的加速。

---

### **4. 性能与优化**  
- **内核级别**：  
  - 新增融合 QSA mask 操作（`llama`），降低注意力评分过程中的开销（PR #30640）。  
  - Adreno X1 优化后的 GEMM 内核在 Q4_0/Q4_K/Q6_K 下，基准测试中延迟降低最高达约 20%（PRs #30947–#30949）。  
- **内存与加载**：  
  - 修复大型嵌入模型加载期间的内存峰值问题（PR #27483）。  
  - 提升词表加载速度（PR #30679）。  
- **推测解码**：  
  - PR #30945 增加对 DFlash 的可选 `fc.input_scale` 支持，提升缩放保真度。  
  - 对 FR-Spec 风格草稿词表剪枝的研究仍在进行中（Issue #25187）。

---

### **5. 稳定性与回归问题**  
- **报告的关键问题**：  
  - **SYCL NaN 输出**：在 #29107 后，密集型 Qwen3.8-27B Q4_K_M 模型出现异常（PR #30892）。  
    [Issue #30892](https://github.com/ggml-org/llama.cpp/issues/30892)  
  - **Vulkan DeviceLostError**：Linux 7.x 内核（Strix Halo）上出现设备丢失错误（Issue #25664）。  
    [Issue #25664](https://github.com/ggml-org/llama.cpp/issues/25664)  
  - **ROCm RPC 崩溃**：在分布式 Qwen3.8-Flash-Next 上使用 TOP_K 时发生崩溃（Issue #27865）。  
    [Issue #27865](https://github.com/ggml-org/llama.cpp/issues/27865)  
  - **首次推理 TTFT 回归**：由于 #30449（MoE CPU 居住权重）导致从 10 秒上升至 60 秒以上（Issue #30793）。  
    [Issue #30793](https://github.com/ggml-org/llama.cpp/issues/30793)  
- **正在进行的修复**：  
  - PR #30892 已提供临时方案（关闭融合 GEMM），但尚未有最终修复。  
  - PR #30941 已解决因 Jinja 命名空间遮蔽导致的崩溃问题。

---

### **6. 对应用开发者的意义**  
- **多模态应用**：借助 Flint 与 SenseNova U1 的支持，开发者现在可以使用 GGUF 格式在本地部署前沿的 **多模态大模型**，特别适合对隐私敏感或离线运行的智能体系统。  
- **移动端与边缘部署**：Adreno X1 优化使基于 Snapdragon 的移动设备实现更快推理，为边缘硬件上的实时大模型应用打开可能。  
- **API 一致性**：`/v1/messages` 采样参数转发确保与 LangChain、LlamaIndex 及自定义代理等工具的集成更加顺畅。  
- **注意事项**：在 #30892 修复前，请避免在 Intel Arc GPU 上使用 SYCL + Q4_K_M 量化方案。生产环境建议关注 `b11803` 及更高版本以保障稳定性。  

> 💡 **建议**：使用 `--no-mtmd` 或 `mtmd_gen` 状态对象（PR #30902）以获得稳定的多模态提示处理；若遇到分词空格问题（如 `x!= y`），请尝试设置 `clean_spaces=1` GGUF 键进行测试。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### **Ollama Digest – 2026-10-22**

#### **1. 今日亮点**  
Ollama 推出 *Flint*，Recursive 的高级代码代理模型，为本地推理带来强大的工具使用能力。然而，早期用户报告 Flint 存在严重的稳定性问题（如 `500 Internal Server Error`、整数转浮点参数漂移），且 Ollama Cloud Pro 用户正经历近乎全面的服务中断。与此同时，若干关键 PR 已合并，提升了 MLX 并发性能，保留了工具调用类型，并修复了 OpenCode 的上下文窗口处理问题。

#### **2. 发布与破坏性变更**  
- **v0.40.8**：今日发布为最新稳定版本。包含模型服务稳定性、MLX 支持及内部 API 改进的修复。未宣布任何破坏性变更。  
  🔗 [GitHub Release v0.40.8](https://github.com/ollama/ollama/releases/tag/v0.40.8)

#### **3. 新模型与硬件支持**  
- **Flint (Recursive)**：通过 `ollama pull flint` 正式加入 —— 针对代码代理优化，支持结构化工具调用。  
  🔗 [Flint 在 Ollama Library](https://ollama.com/library/flint)  
- **Apple Foundation Models (macOS)**：PR #19184 添加对 Apple 本地设备模型 `apple-foundation-model` 的原生运行器支持，可通过 `ollama run` 实现 CLI/API 访问。  
  🔗 [PR #19184: applefm: add runner](https://github.com/ollama/ollama/pull/19184)  
- **MLX 后端**：PRs #19197 与 #19194 扩展了 MLX 支持，引入并发生成与 DFlash2 集成（动态块草稿）。  
  🔗 [PR #19197: mlx: support concurrent generation](https://github.com/ollama/ollama/pull/19197)  
  🔗 [PR #19196: mlx: add d3 decision model support](https://github.com/ollama/ollama/pull/19196)

#### **4. 性能与优化**  
- **MLX 并行性**：PR #19197 引入 `OLLAMA_NUM_PARALLEL` 用于 MLX 模型，通过允许多个请求共享投影/前馈层，在保持注意力隔离的前提下降低首个 token 延迟。  
- **DFlash2 集成**：PR #19149 引入块内动态卷积与候选链机制，实现更快的推测解码。  
- **上下文窗口精度**：PR #19193 确保 OpenCode 使用实际分配的上下文（`num_ctx`）而非静态 `ContextLength`，防止过早压缩。  
  🔗 [PR #19193: launch: use allocated context for OpenCode](https://github.com/ollama/ollama/pull/19193)

#### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| [`#15453`](https://github.com/ollama/ollama/issues/15453): Ollama Cloud Pro — 所有云模型失败率高达 95% | 严重 | 开放 | 无 |
| [`#19186`](https://github.com/ollama/ollama/issues/19186): Flint 在 AGX Orin 上触发 `500 Internal Server Error` | 高 | 开放 | 待定 |
| [`#19191`](https://github.com/ollama/ollama/issues/19191): Flint 重新输出整数为浮点数（`30000` → `"30000.0"`） | 高 | 开放 | ✅ [PR #19195](https://github.com/ollama/ollama/pull/19195) |
| [`#19187`](https://github.com/ollama/ollama/issues/19187): 无效工具调用被静默丢弃（无错误提示，`eval_count > 0`） | 中等 | 开放 | 待定 |
| [`#19177`](https://github.com/ollama/ollama/issues/19177): 第一个 chunk 被丢弃后流式输出错误静默丢失 | 中等 | 开放 | ✅ [PR #19188](https://github.com/ollama/ollama/pull/19188) |

> ⚠️ **重要提醒**：目前大多数用户无法使用 Ollama Cloud Pro。Flint 存在严重影响代理可靠性的严重类型保留缺陷。

#### **6. 对应用开发者的影响**  
- **在 PR #19195 合并前避免在生产环境使用 Flint** —— 因整数参数可能因浮点强制转换被误解析，导致模式验证失败。  
- **谨慎使用 `OLLAMA_MAX_LOADED_MODELS=1`**：PR #19190 修复了一个回归问题，即 `keep_alive` 会取消待处理的模型淘汰，导致排队请求卡死。  
- **针对 OpenCode 集成**：确保上下文限制反映实际 `num_ctx`（而非宣传的最大值）—— 可使用 PR #19193 的临时方案，或等待合并。  
- **预期获得更优的 MLX 性能**：并发生成与 DFlash2 集成将显著提升高吞吐本地推理表现。  
- **不要依赖流式错误可见性**：PR #19188 修复了流式输出后错误静默丢失的问题——升级至 v0.40.8+ 以获得可靠的诊断信息。

> 📌 **可操作建议**：关注 [PR #19195](https://github.com/ollama/ollama/pull/19195) 以获取 Flint 工具调用完整性修复进展。若使用 Flint 或云模型，请在 v0.40.8 版本上进行测试。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-10-22**

---

### **1. 今日重点**  
一起涉及恶意 `litellm==1.107.0` 包（PyPI 和 Docker）的关键安全事件已迅速处理：该版本已从所有公开注册表中移除，受影响的镜像也已撤销。与此同时，备受期待的 Rust 迁移项目正积极推进，社区关注度高涨；新增的提供商集成（Engy、OpenRouter 重排序、Foundry Local）正在扩展 LiteLLM 的兼容性。

---

### **2. 发布与破坏性变更**  
- **v1.106.2**、**v1.105.3**、**v1.104.5**、**v1.103.7**：均在最近 24 小时内发布，持续强化安全机制。  
  🔗 [GitHub 发布 v1.106.2](https://github.com/BerriAI/litellm/releases/tag/v1.106.2)  
- **安全事件警报**：`v1.107.0` 版本因仿冒仓库（`Berri-AI/litellm`）被入侵，包含凭证窃取器（`cook.pth`）和远程代码执行加载器。  
  ✅ **所有相关 PyPI 包及 Docker 镜像（`latest`、`main-stable` 等）均已删除/撤回。**  
  🔗 [问题 #47826 – 安全警报](https://github.com/BerriAI/litellm/issues/47826)  
- **Docker 镜像签名**：所有官方镜像现已统一使用 Cosign 签名，密钥来自提交 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)。请使用 `cosign verify` 验证签名。

---

### **3. 新模型与硬件支持**  
- **Engy** 作为 OpenAI 兼容提供方，通过 JSON 配置添加：  
  - 基础地址：`https://api.engy.ai/v1`  
  - 认证方式：`ENGY_API_KEY`（可通过 `ENGY_API_BASE` 可选覆盖）  
  - 支持 8 个模型，包括聊天补全及 Anthropic 风格的消息格式。  
  🔗 [PR #46744 – 添加 Engy 提供商](https://github.com/BerriAI/litellm/pull/46744)  
- **OpenRouter 重排序提供方**支持，适用于如 `cohere/rerank-v3.5` 等模型。  
  🔗 [PR #47885 – 添加重排序提供方](https://github.com/BerriAI/litellm/pull/47885)  
- **Foundry Local** 提供商集成现支持 SDK 2.2.1 部署。  
  🔗 [PR #47713 – 添加 Foundry Local 提供商](https://github.com/BerriAI/litellm/pull/47713)  
- **Bitdeer AI** 作为 JSON 配置提供方加入，支持 3 个模型的定价。  
  🔗 [PR #36734 – 添加 Bitdeer AI 提供商](https://github.com/BerriAI/litellm/pull/36734)

---

### **4. 性能与优化**  
- **Rust 迁移计划（v1.107+）**：  
  🔗 [问题 #31263 – LiteLLM Rust 迁移](https://github.com/BerriAI/litellm/issues/31263)  
  - 目标：实现亚毫秒级开销与极小内存占用。  
  - 早期测试版报名已开放；预计将在高负载环境中显著提升推理延迟与吞吐量。  
- **Gemini 音频缓存计费修复**：  
  修正了缓存音频令牌错误计费问题 —— 现在按正确费率 `audio_cache-read` 计费，而非 `text_cache-read`。  
  🔗 [PR #47886 – 修复 Gemini 音频计费](https://github.com/BerriAI/litellm/pull/47886)  
- **JWKS 密钥服务改进**：  
  过期的 JWKS 刷新不再阻塞 JWT 认证请求；后台获取期间仍可提供旧密钥。  
  🔗 [PR #47846 – 提供过期 JWKS 密钥](https://github.com/BerriAI/litellm/pull/47846)

---

### **5. 稳定性与回归问题**  
- **严重**：`Presidio 保护墙在 logging_only 模式下遮蔽客户端响应` → 破坏流式与非流式行为。  
  🔗 [问题 #47605](https://github.com/BerriAI/litellm/issues/47605)  
- **高危**：`近期更新后，非管理员用户在 LiteLLM Proxy 中无法查看模型列表`。  
  🔗 [问题 #17475](https://github.com/BerriAI/litellm/issues/17475)  
- **中等**：`当设置任意 key 时，Redis cache_params 忽略环境变量` → 导致跨 Pod 消费追踪失效。  
  🔗 [问题 #26233](https://github.com/BerriAI/litellm/issues/26233)  
- **中等**：`通过过期的 Redis 计数器绕过用户预算`，在 clean-miss 后可能导致 429 错误，尽管窗口仍为新鲜。  
  🔗 [问题 #34238](https://github.com/BerriAI/litellm/issues/34238)  
- **低**：`上游返回 `id:null` 时（如 Databricks-Gemini），消费日志静默丢失`。  
  🔗 [问题 #39749](https://github.com/BerriAI/litellm/issues/39749)  

> ✅ **已有修复 PR**：  
> - [PR #47846](https://github.com/BerriAI/litellm/pull/47846)（JWKS）  
> - [PR #47886](https://github.com/BerriAI/litellm/pull/47886)（Gemini 音频费用）  
> - [PR #47872](https://github.com/BerriAI/litellm/pull/47872)（用户级 MCP 授予）  

---

### **6. 对应用开发者的影响**  
- **立即行动**：若您正在使用 `litellm==1.107.0`，**请勿继续使用** —— 该版本已被攻陷。请回退至 `v1.106.2` 或更早版本。  
- **安全最佳实践**：始终使用 `cosign verify` 验证 Docker 镜像签名 —— 尤其在生产部署中。  
- **未来规划**：关注 Rust 迁移（问题 #31263）—— 预计 2027 年将带来重大性能提升。  
- **路由灵活性**：代理中的自定义路由（问题 #25297）仍在等待中，建议复杂工作流采用 SDK 层路由。  
- **预算控制**：注意 `budget_duration` 更新 —— 现有消费不会重置（问题 #34492）。使用 `/key/update` 时需谨慎。  
- **新提供商**：利用 Engy、OpenRouter 重排序、Foundry Local 集成，在无需自定义代码的前提下拓展模型访问范围。  

👉 **推荐操作**：审计部署中暴露的 API 密钥，确保 Redis 缓存配置一致，并在生产前于 `logging_only` 模式下测试保护墙功能。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-22**

---

### **1. 今日亮点**  
Unsloth 持续推进其多智能体与模型服务基础设施，重点优化了内存管理、系统稳定性及 UI 响应速度。值得注意的是，PR #14574 与 #14555 修复了 Apple Silicon（MLX）上的关键性能退化问题以及 GPU VRAM 竞用问题；而新推出的 `UNSLOTH_DIFFUSION_*` 优化默认配置（PR #14566）则有望在更广泛的硬件上实现更快的图像生成。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，由于内部重构正在进行，以下破坏性变更即将生效：
- **Decision API 模型** 的默认行为已更新为不再出现在聊天模型选择器中（PR #14580）——用户必须通过 API 面板显式选择。
- **MoE 自动调优缓存复用** 现在基于设备能力元组进行比较（PR #14578），防止在相同硬件配置下重复执行调优流程。

> 🔗 [PR #14580](https://github.com/unslothai/unsloth/pull/14580) | [PR #14578](https://github.com/unslothai/unsloth/pull/14578)

---

### **3. 新模型与硬件支持**  
- 通过 PR #14552，Studio 已新增对 **MOSS-Image** 的支持，可原生使用 `OpenMOSS-Team/MOSS-Image-SFT` 与 `MOSS-Image-Base` 进行图像生成。
- **MLX PLE 与专家卸载** 现已在 Studio 中支持（PR #14326），使 Apple Silicon 设备在有限 VRAM 条件下也能高效加载大型 MoE 模型，如 GLM-5.3-Flash 与 DeepSeek-V4.1-Flash。
- **Gemma-3n PLE**、**Qwen3.8-Flash-Next** 与 **DeepSeek-V4.1 Engram** 现已受益于基于主机/磁盘的嵌入表，显著降低 VRAM 压力。

> 🔗 [PR #14552](https://github.com/unslothai/unsloth/pull/14552) | [PR #14326](https://github.com/unslothai/unsloth/pull/14326)

---

### **4. 性能与优化**  
- **Studio 视频导出**：通过每段视频使用单一全局调色板，GIF 生成速度提升约 3 倍（PR #14581）。
- **MLX 长对话**：在缓存溢出后避免每次重新读取完整上下文（PR #14574），使 24GB Mac 上每轮延迟从 7–13 秒降至 <1 秒。
- **CFG 并行扩散**：默认速度层级现已完全支持跨两块 GPU 的并行条件/无条件分支（PR #14564）。
- **FP8 扩散权重**：当不存在 FP8 GEMM 运行时，仍以 fp8 格式保留，加载时主机内存使用量减半（PR #14549）。
- **自动优化**：所有经过测量安全的扩散/视频功能（如融合 FLUX RoPE、BF16 小 DiT、Blackwell 原生注意力）现已默认启用（PR #14566）。

> 🔗 [PR #14581](https://github.com/unslothai/unsloth/pull/14581) | [PR #14574](https://github.com/unslothai/unsloth/pull/14574) | [PR #14566](https://github.com/unslothai/unsloth/pull/14566)

---

### **5. 稳定性与回归问题**  
- **模型卸载时的严重崩溃**：多名用户报告更新后弹出模型时出现核心转储（Issue #14411）。暂无修复方案；请求提供核心转储日志。
- **Windows 上的 VRAM 泄露**：每会话持续增长约 200–400MB 内存（Issue #14487）；可能与 Python 进程清理有关。
- **MLX 模型失败检测错误**：`unsloth doctor` 在 Apple Silicon Mac 上错误报告 CUDA 失败（PR #14457 已修复此问题）。
- **崩溃的聊天模型仍显示“已加载”**：在因 OOM 被 OS 终止后，Studio 未能正确检测进程死亡（PR #14575 正在解决）。
- **块编译回归**：逐层编译导致分布式训练中的检查点机制失效（Issue #14063）；临时解决方案：设置 `UNSLOTH_BLOCK_COMPILE=0`。

> 🔗 [Issue #14411](https://github.com/unslothai/unsloth/issues/14411) | [PR #14575](https://github.com/unslothai/unsloth/pull/14575) | [PR #14457](https://github.com/unslothai/unsloth/pull/14457)

---

### **6. 对应用开发者的启示**  
正在构建智能体或微调流水线的开发者应：
- **避免在分布式环境中使用 `UNSLOTH_BLOCK_COMPILE=1`**，直到检查点缺陷（Issue #14063）被修复。
- 利用 **新的 Decision API 子智能体模式**（如 PR #14523、#14502），实现持久化的后台任务编排。
- 对大型 MoE 模型使用 **基于主机的嵌入表**（PR #14465），避免 VRAM 瓶颈。
- 启用 **自动扩散优化**（`UNSLOTH_DIFFUSION_*`），在无需手动调优的情况下降低推理延迟。
- 为 Apple Silicon 上的 **MLX 优先工作流** 做好准备，尤其适用于轻量级智能体与实时语音/图像处理场景。

> 📌 小贴士：密切关注 `unsloth doctor` 输出——它现在能正确检测 MLX 可用性（PR #14457），有助于减少 CI/CD 环境中的误报。

---  
*摘要生成时间：2026-10-22 | 来源：GitHub — unslothai/unsloth*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*