# AI 基础设施日报 2026-09-20

> 生成时间: 2026-09-20 00:18 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI推理基础设施生态报告 – 2026-09-20**

---

### **1. 生态概览**  
2026年第三季度，AI推理基础设施领域呈现出快速专业化与向混合、多模态、高度优化的部署栈融合的趋势。各项目正聚焦于下一代模型架构——MoE、KDA、门控增量注意力（gated delta attention）以及视觉语言融合，推动对低延迟、高吞吐和内存高效执行的需求。GPU专用优化（CUDA图、TMA预加载、ROCm稳定性）主导开发周期，而网关层可观测性与面向代理的工具链也逐步成熟为企业级能力。生态呈现明显碎片化：引擎级项目（vLLM、SGLang）持续突破性能边界，运行时工具（llama.cpp、Unsloth）更注重可移植性与边缘部署，而网关类项目（Ollama、LiteLLM）则聚焦开发者体验与成本治理。

---

### **2. 活动对比**

| 项目       | 开放问题数 | 最近7天合并的PR数 | 最近24小时发布数 | 破坏性变更 |
|---------------|-------------|------------------------|----------------------|------------------|
| vLLM          | 87          | 12                     | 无                   | 是（PR #57731）  |
| SGLang        | 114         | 18                     | 无                   | 是（进行中）     |
| llama.cpp     | 76          | 15                     | 3（b11053–b11057）   | 否               |
| Ollama        | 102         | 9                      | 无                   | 是（Issue #18542） |
| LiteLLM       | 67          | 14                     | 无                   | 是（mcp绑定）    |
| Unsloth       | 68          | 13                     | 无                   | 否               |

> 🔍 *SGLang在PR提交速度和问题数量上领先，反映出深度底层重构。vLLM与Ollama因API/行为变更导致更高频率的破坏性变更。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------------------|------|--------|-----------|--------|---------|---------|
| **Ling 3.0 Flash (Bailing V3)**      | ✅   | 🚧     | ✅        | ❌     | ❌      | ❌      |
| **Ling 3.0 VL (BailingMoeV3VL)**     | ❌   | 🚧     | ✅        | ❌     | ❌      | ❌      |
| **GLM-5.3-Flash (KDA + MLA)**        | ✅   | ✅     | ✅        | ✅     | ❌      | ✅      |
| **Qwen3.5 MoE (FastMTP)**            | ⚠️   | 🚧     | ⚠️        | ✅ (实验) | ❌      | ⚠️ (崩溃) |
| **DeepSeek-V4.1-Flash**             | ❌   | ✅     | ❌        | ❌     | ✅      | ❌      |
| **Nemotron Labs Diffusion**         | ❌   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **EXL3 量化 (MoE)**                 | ❌   | ❌     | ❌        | ❌     | ❌      | ✅ (实验) |

> 🏆 **排行榜**：  
> - **llama.cpp** 在 *模型多样性* 上领先，原生支持Ling 3.0、GLM-5.3-Flash及新兴量化格式。  
> - **SGLang** 在 *下一代模型集成* 上占优（DeepSeek-V4.1、HiCache预加载），瞄准高吞吐混合工作负载。  
> - **Unsloth** 在 *跨平台模型驻留* 与 *边缘就绪量化后端*（EXL3）方面表现突出，支持轻量级多模型部署。

---

### **4. 性能前沿**

| 优化重点           | vLLM                          | SGLang                        | llama.cpp                     | Ollama                    | LiteLLM                  | Unsloth                   |
|-------------------------------|-------------------------------|-------------------------------|-------------------------------|---------------------------|--------------------------|---------------------------|
| **KV缓存与卸载**        | 完全CUDA图（ViT待支持） | HiCache + TMA预加载（192 GB/s） | GPU LRU缓存（MoE专家）   | MTP草稿裁剪        | —                        | 多驻留GGUF       |
| **批处理与预填充**        | DiffusionGemma logits优化 | 统一缓存稀疏性RFC    | BF16预填充（CUDA）           | —                         | —                        | 张量分片保留    |
| **量化**              | mxfp4 + fp8（ROCm）            | MLA去重（节省15%）| Q8_K_M NEON向量化     | —                         | 提示缓存可见性| EXL3（2–8位MoE）        |
| **分布式服务**       | MoE专家并行（阻塞中） | MoE调度损坏修复   | —                             | 多GPU感知       | FUSE v2路由预测| —                         |
| **内核与编译器层级**   | 手动融合（RFC #43224）    | TMA预加载（sm_90+）          | Hexagon指令（RISC-V）          | —                         | 头部预留防护机制       | —                         |

> 🚀 **性能领跑者**：  
> - **SGLang** 在 *主机-设备传输效率* 上占据主导（HiCache → 192 GB/s）。  
> - **llama.cpp** 在 *底层内核优化* 方面领先（BF16、NEON、Hexagon）。  
> - **vLLM** 尽管存在严重回归，仍是 *MoE与推测解码* 准备度最强的项目。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 关键差异化特征 |
|---------------|------------------------------------|---------------------|
| **vLLM**      | **推理引擎**               | 高性能CUDA内核，MoE推测解码，生产级稳定性（尽管存在回归）。 |
| **SGLang**    | **高吞吐服务框架** | 高级路由（sgl-router），HiCache卸载，统一缓存稀疏性，专为规模化设计。 |
| **llama.cpp** | **本地运行时 / 边缘推理** | 跨平台可移植性（Metal、SYCL、RISC-V），GGUF优先设计，依赖极小。 |
| **Ollama**    | **模型网关 / 开发者CLI**  | 代理友好型工具调用，OpenAI兼容性，专注MLX/Apple Silicon。 |
| **LiteLLM**   | **企业级网关 / 可观测性** | 速率限制、审计日志、提示缓存分析、团队配额管理。 |
| **Unsloth**   | **代理编排 / 工作台工具** | 多驻留模型，Docker+WSL2 ROCm支持，JupyterLab集成，Nix打包。 |

> 🎯 **战略定位**：  
> - **vLLM/SGLang** = 数据中心推理核心引擎。  
> - **llama.cpp/Unsloth** = 边缘与开发者导向运行时。  
> - **Ollama/LiteLLM** = 面向开发者的网关，具备代理与成本控制功能。

---

### **6. 趋势信号**

🔍 **从当前活动提取的关键行业趋势**：

1. **MoE与混合架构已成为主流**  
   - 所有主要项目均跟踪或支持MoE模型（GLM-5.3-Flash、Qwen3.5、Ling 3.0 VL）。  
   - **关注点**：MoE专家并行稳定性（SGLang、vLLM）与MoE专用量化（EXL3、`moe_wna16_marlin_gemm`）。

2. **硬件特定优化已成不可妥协要求**  
   - ROCm（MI300X/MI355X）与Intel XPU性能提升迅速，但稳定性问题也随之加剧（ROCm ATTN不一致、SYCL内存泄漏）。  
   - **关注点**：厂商锁定风险——尤其在AMD/Intel硬件上，支持滞后于NVIDIA。

3. **代理工作流要求结构化输出可靠性**  
   - 工具调用解析失败（Ollama、SGLang）与`min_tokens > max_tokens`漏洞（vLLM）威胁代理正确性。  
   - **关注点**：网关中JSON模式编译限制与语法验证。

4. **内存与延迟压力推动新抽象出现**  
   - HiCache预加载（SGLang）、GPU LRU缓存（llama.cpp）、多驻留GGUF（Unsloth）反映出向 *卸载式、稀疏管理状态* 的转变。  
   - **关注点**：预测性VRAM估算（Ollama）与提示缓存可见性（LiteLLM）作为成本治理关键。

5. **稳定性优先于功能是新共识**  
   - 尽管创新活跃，**严重崩溃**（vLLM CUDA访问、Ollama RTX 4000 Ada、llama.cpp RTX 5090）仍主导问题追踪列表。  
   - **关注点**：夜间构建与PR状态——许多修复已合并但尚未发布。

---

### **对应用开发者的建议**
- **用于生产推理**：谨慎使用 **vLLM** 或 **SGLang**，在回归修复前避免推测解码与MoE。
- **用于代理流水线**：优先选择 **Ollama** 或 **Unsloth**，确保工具调用处理经过验证；监控 `reasoning_content` 与 `typical_p` 废弃情况。
- **用于边缘/低资源环境**：选择 **llama.cpp**（NEON/Q8_K_M）或 **Unsloth**（EXL3、多驻留GGUF）。
- **用于成本敏感部署**：利用 **LiteLLM** 的提示缓存与用户归属特性。
- **始终验证**：针对夜间构建测试，特别是新模型（Ling 3.0、Qwen3.5 MoE）与GPU后端（ROCm、Metal）。

> 📌 *核心结论*：生态系统已不再仅追求速度——可靠性、一致性与大规模可观测性成为关键。选型应基于 **部署场景**、**硬件条件** 与 **工作负载类型**，而非仅看原始吞吐量。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-20**

---

### **1. 今日亮点**  
vLLM 项目持续聚焦下一代多模态与 MoE 模型的稳定性与性能，针对高并发场景下的推测解码正确性及 KV 缓存卸载问题进行了关键修复。主要进展包括：采样参数中 `min_tokens` 验证逻辑的修复、ROCm 平台上对混合精度 Kimi-K3 检查点（mxfp4 + fp8）的增强支持，以及在多模态流水线中为 ViT 编码器启用完整 CUDA graph 支持的持续工作。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本或破坏性变更。*  
然而，PR [#57731](https://github.com/vllm-project/vllm/pull/57731) 引入了防御性检查，用于拒绝超过 `max_tokens` 的 `min_tokens` 值，未来版本可能强制执行此限制，以防止推理过程中出现无声异常行为。

---

### **3. 新模型与硬件支持**  
- **ROCm 支持**：通过 [PR #57048](https://github.com/vllm-project/vllm/pull/57048)，现已支持 Kimi-K3 检查点的混合精度加载（mxfp4 + fp8），可在 MI300X/MI355X 上实现高效服务。  
- **CPU 后端**：一项功能请求 ([#57346](https://github.com/vllm-project/vllm/issues/57346)) 提议为 GLM-5.3-Flash 添加 CPU KDA 后端，目标是支持具有稀疏 MLA 与门控 delta 注意力层的混合模型。  
- **Intel GPU**：MRV2 采样器现已通过融合 top-k/top-p 内核支持 XPU ([PR #57277](https://github.com/vllm-project/vllm/pull/57277))，显著提升 Intel GPU 上的效率。

---

### **4. 性能与优化**  
- **预填充效率**：PR [#57416](https://github.com/vllm-project/vllm/pull/57416) 通过避免在 DiffusionGemma 等扩散模型中进行不必要的 logit 行分配，提升了仅预填充批次的性能。  
- **内核融合**：编译器融合向手动融合迁移的工作持续推进 ([RFC #43224](https://github.com/vllm-project/vllm/issues/43224))，旨在降低开销并提升可预测性。  
- **推测解码**：当前全量 CUDA graph 对推测解码草稿生成器的支持仍受限于 PIECEWISE 仅模式 ([Issue #45258](https://github.com/vllm-project/vllm/issues/45258))，在现有部署中构成约 15–18% 的解码时间瓶颈。

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - [#54317](https://github.com/vllm-project/vllm/issues/54317)：在 4xB200 上，对无关内核（KDA 线性注意力、MHC TileLang、TRT-LLM 融合 MoE）重复出现 CUDA 非法内存访问。严重程度高；尚未修复。  
  - [#57493](https://github.com/vllm-project/vllm/issues/57493)：在 gfx1151 平台上，ROCm ATTN 在负载下返回不一致输出——确定性行为失败，影响复现性。  
- **正确性缺陷**：  
  - [#56868](https://github.com/vllm-project/vllm/issues/56868)：量化版 GLM-5.3-Flash 在累积推理后出现长序列解码退化。  
  - [#38175](https://github.com/vllm-project/vllm/issues/38175)：ViT 编码器在 CUDA graph 中未完全支持——阻碍多模态模型（如 Qwen3-VL、Kimi K2.5 等）的完整优化。  
- **正在修复中的问题**：  
  - PR [#57710](https://github.com/vllm-project/vllm/pull/57710) 解决了弹性 EP 状态中任务取消导致的数据损坏问题（`#57691`）。  
  - PR [#57678](https://github.com/vllm-project/vllm/pull/57678) 重构了模型加载逻辑，统一了加载后的迭代顺序，降低了潜在不一致风险。

---

### **6. 对应用开发者的启示**  
- **生产环境中请避免设置 `min_tokens > max_tokens`**，直到 [#57731](https://github.com/vllm-project/vllm/pull/57731) 合并——否则可能导致结构化输出流程无声中断。  
- **在 MoE 模型上使用推测解码需谨慎**——已知 DP 配置下存在缺陷 ([#44185](https://github.com/vllm-project/vllm/issues/44185)) 及长上下文生成问题 ([#56868](https://github.com/vllm-project/vllm/issues/56868))，可能造成输出质量下降。  
- **对于多模态应用**，目前仅支持部分 ViT CUDA graph 功能——完整集成仍在等待 RFC #38175。若遇到崩溃，请临时禁用 graph。  
- **在 ROCm 平台**，使用 Qwen3.5-122B-A10B-FP8 时，务必设置 `VLLM_ROCM_USE_AITER`；否则在 12k 上下文长度下性能可能下降高达 3.7 倍 ([#56945](https://github.com/vllm-project/vllm/issues/56945))。  
- **验证您的量化配置**——近期关于 `moe_wna16_marlin_gemm` ([#48895](https://github.com/vllm-project/vllm/issues/48895)) 的问题表明，即使检查点格式有效，错误的每行 topk 权重仍可能导致输出被污染。

> ✅ **可操作建议**：关注上述链接中的 PR，尤其是解决推测解码与 ROCm 可靠性问题的补丁。可通过夜间构建提前获取修复版本。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-20**

---

### **1. 今日亮点**  
SGLang 项目持续推进底层基础设施优化，聚焦于下一代混合模型（如 GLM-5.3-Flash 和 DeepSeek-V4.1）的高吞吐、内存高效推理。关键进展包括：(1) 新增 HiCache 阶段化内核，实现主机与设备间 KV 数据传输速度提升至 2 倍（最高达 192 GB/s），(2) 对 `sgl-router` 系统进行重大重构，支持会话感知、缓存感知及 SLO 驱动的请求路由，(3) 积极追踪并修复 CUDA 执行、MoE 专家并行和结构化解码中的关键稳定性问题。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本。但以下几项破坏性变更正在进行中：
- **PR #40278**：为 HiCache 引入 TMA 阶段化主机<->设备传输（仅限 sm_90+），在内存压力下可能改变性能表现。
- **PR #39565**：通过 `--enable-linker-mla-dedup` 开启可选的 MLA 加载去重功能，影响跨 TP 分区使用 Mooncake Linker 时的行为。
- **PR #40241–#40379（堆栈）**：重构 `sgl-router` 的分桶与准入策略；向后兼容性保留，但配置结构现更模块化。

> 🔗 [PR #40278](https://github.com/sgl-project/sglang/pull/40278) | [PR #39565](https://github.com/sgl-project/sglang/pull/39565) | [Router Refactor Stack](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+label%3A%22documentation%22+label%3A%22sgl-router%22+sort%3Aupdated-desc)

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1-Flash** 支持正在上游合并，相关进度跟踪于 **Issue #40152**，待主干分支合并后完成集成。
- **GLM-5.3-Flash** 已获得第一类支持（v0.5.20+），包含 DSA 注意力后端，但 **Issue #40286** 指出 SM121（DGX Spark）缺少对应 DSA 后端，限制了部署选项。
- **Nemotron Labs Diffusion** 支持正准备上游化（**Issue #25802**），目标模型为 `nvidia/Nemotron-Labs-Diffusion-8B`。
- **HiCache + TMA 阶段化** 已在 SM90+ 架构（H20/Hopper）启用，显著提升长上下文工作负载的卸载性能。

> 🔗 [Issue #40152](https://github.com/sgl-project/sglang/issues/40152) | [Issue #40286](https://github.com/sgl-project/sglang/issues/40286) | [Diffusion Tracker](https://github.com/sgl-project/sglang/issues/25802)

---

### **4. 性能与优化**  
- **HiCache KV 传输**：主机到设备吞吐从 **97 → 192 GB/s**，设备到主机从 **93 → 183 GB/s**，已接近主机链路上限（4x GPU PCIe Gen5）。
- **MLA 去重**：在 8× H20（96GB）、TP8 PP1、GLM-5.2 W4AFP8 场景下，通过复用 rank 0 数据，使每分区加载的 MLA 减少约 **15%**。
- **统一缓存稀疏性框架（RFC #32657）**：旨在无需重新训练即可实现事后稀疏性（如固定模式、查询感知），对未来高效推理至关重要。
- **FlashInfer 自适应缓存修复（PR #40320）**：防止 MoE EP>1 启动时因形状不匹配导致不必要的缓存丢弃，消除冗余调优开销。

> 🔗 [PR #40278](https://github.com/sgl-project/sglang/pull/40278) | [PR #39565](https://github.com/sgl-project/sglang/pull/39565) | [Issue #40320](https://github.com/sgl-project/sglang/issues/40320)

---

### **5. 稳定性与回归问题**  
今日报告多个关键稳定性问题：
1. **CUDA 核心转储追踪 (#26340)**：CI 自动收集核心转储；**316 条评论**表明测试运行期间频繁出现运行时崩溃——很可能与内核启动或内存损坏有关。
2. **FlashInfer 自适应缓存丢弃 (#40320)**：在 MoE 专家并行下因形状不匹配导致启动时重复自适应调优——影响冷启动延迟。
3. **JSON Schema 语法编译崩溃 (#39125)**：深度嵌套模式可能导致 DFA 状态爆炸——若接受不受信任输入，存在安全风险。
4. **Engram 性能分析失败 (#39173)**：CUDA graph 捕获失败，提示“engram target-verify 要求每个请求对应一个等值块”——阻塞 DeepSeek-V4.1-Flash + Engram 的性能分析。
5. **MoE 分派损坏 (#40156)**：草稿批次 `num_token_non_padded` 为零 → 所有草稿 topk ID 被掩码为 -1 → 导致 MoE 分派失效。

> 🔗 [Issue #26340](https://github.com/sgl-project/sglang/issues/26340) | [Issue #40320](https://github.com/sgl-project/sglang/issues/40320) | [Issue #39125](https://github.com/sgl-project/sglang/issues/39125) | [Issue #39173](https://github.com/sgl-project/sglang/issues/39173) | [Issue #40156](https://github.com/sgl-project/sglang/issues/40156)

---

### **6. 对应用开发者的启示**  
- 在多节点部署中使用 GLM-5.3-Flash 时，请启用 `--enable-linker-mla-dedup`，以减少冗余 MLA 加载，提升加载效率。
- 在 PR #40320 上线前，请避免对 MoE 模型使用 `--tp-size > 1` —— 否则启动时将遭遇反复自适应调优延迟。
- 提交前请验证 JSON schema 的嵌套深度：过深嵌套可能触发语法编译中的无限递归，导致 CPU 卡死。
- 对长上下文应用场景，建议启用 HiCache 阶段化（`--disaggregation-decode-enable-host-receive`），避免设备端 KV 压力导致的停滞。
- 随着 `sgl-router` 重构推进，预计路由逻辑将发生破坏性变更——请持续关注 `sgl-router` 相关 PR 并及时更新策略配置。

> 🔗 [Route Policy Refactor Series](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+label%3A%22documentation%22+label%3A%22sgl-router%22)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-20**

---

### **1. 今日亮点**  
最新更新聚焦于对 **Ling 3.0 (Bailing V3)** 及其视觉语言变体的稳健支持，包含专用解析器与模型加载功能。关键修复提升了 GPU 后端稳定性——尤其针对 **Metal (Apple Silicon)** 与 **SYCL (Intel Arc)**——并优化了多个后端的内存管理。**BF16 预填充** 与 **Q8_K_M 量化** 的性能优化也持续推进。

---

### **2. 发布与破坏性变更**  
- **b11057**：为 **Ling 3.0 (Bailing V3)** 添加专用解析器，可正确处理 `</think>` 标签前的早期工具调用，修复了 `tool_choice=required` 工作流中的内容遗漏问题。[PR #28682](https://github.com/ggml-org/llama.cpp/pull/28682)  
- **b11056–b11054**：启用新的 **Hexagon 后端操作**（`GET_ROWS`、`TOP_K`、`GEGLU_QUICK`）——为未来 RISC-V AI 加速至关重要。[PRs #29116, #29114, #29113](https://github.com/ggml-org/llama.cpp/pulls?utf8=%E2%9C%93&q=is%3Amerged+label%3Ahexagon)  
- **b11053**：改进服务器启动日志，支持按模型来源追踪（`[source]` 标签），显示 HF 缓存路径及公开访问 `hf_cache::get_cache_dir()`。[PR #29125](https://github.com/ggml-org/llama.cpp/pull/29125)

> ✅ *未报告破坏性 API 变更；向后兼容性已保留。*

---

### **3. 新模型与硬件支持**  
- **Ling 3.0 Flash (Bailing V3)**：通过专用解析器与语法处理实现完整支持。[PR #28682](https://github.com/ggml-org/llama.cpp/pull/28682)  
- **Ling 3.0 VL (BailingMoeV3VL)**：新增对视觉语言变体的支持（总参数 124B / 活跃参数 5.1B，混合 KDA + 门控 MLA，MoE）。[PR #29151](https://github.com/ggml-org/llama.cpp/pull/29151)  
- **Qwen4Exp HC Ops**：Metal 后端现支持 `qwen4exp` 使用的新 `hc_pre`（sigmoid 门控）与 `hc_post`（恒等混合）变体。[PR #29000](https://github.com/ggml-org/llama.cpp/pull/29000)  
- **OpenHarmony (musl)**：为 OHOS 目标平台（`x86_64-linux-ohos`、`aarch64-linux-ohos`）添加构建兼容性。[PR #29156](https://github.com/ggml-org/llama.cpp/pull/29156)  
- **Prism PQ2_0 (type 142) 与 PTQ1_0 (type 143)**：已开启功能请求，以支持 Ternary-Bonsai-2 量化格式。[Issue #29058](https://github.com/ggml-org/llama.cpp/issues/29058)

---

### **4. 性能与优化**  
- **BF16 预填充加速**：CUDA 优化将连续张量每次转换四个元素，显著提升 AMD/NVIDIA GPU 上的预填充吞吐量。[PR #29155](https://github.com/ggml-org/llama.cpp/pull/29155)  
- **Q8_K_M 量化**：ARM CPU 现支持 NEON 向量化 `ggml_quantize_mat_q8_K_4x4` 与 `4x8` 内核，实现可观速度提升且无精度损失。[PR #29153](https://github.com/ggml-org/llama.cpp/pull/29153)  
- **MSVC 上的 AVX-VNNI**：Windows 构建中自动检测并启用 AVX-VNNI 指令集。[PR #28297](https://github.com/ggml-org/llama.cpp/pull/28297)  
- **MoE 专家的 GPU LRU 缓存**：实验性 PR 引入主机卸载的专家缓存机制（通过 `-ot exps=CPU`），降低带宽瓶颈带来的解码延迟。[PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)

---

### **5. 稳定性与回归问题**  
- **严重崩溃（RTX 5090）**：CUDA Graph 导致 RTX 5090 sm_120 上 GPU 假死（RC Watchdog + Xid 8）；临时解决方案：`GGML_CUDA_DISABLE_GRAPHS=1`。[Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)  
- **ROCm/HIP 循环状态泄漏**：在复用服务器槽位时，Ling 3.5/MoE 模型会在请求间泄露状态，导致先前提示文本原样重现。[Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092)  
- **SYCL 内存不匹配**：双 GPU 系统中，由于固定内存绑定错误设备上下文，出现 `UR_RESULT_ERROR_OUT_OF_DEVICE_MEMORY` 错误。[Issue #28765](https://github.com/ggml-org/llama.cpp/issues/28765)  
- **Metal 已弃用警告**：macOS 27 SDK 已弃用 `MTLDevice.location` 与 `MTLGPUFamilyCommon{1,2,3}`；修复已合并。[PR #29136](https://github.com/ggml-org/llama.cpp/pull/29136)  

> 🔴 *Metal 与 SYCL 问题已有修复；CUDA Graph 问题仍待修复。*

---

### **6. 对应用开发者的启示**  
- **智能体构建者**：新推出的 **Ling 3.0 解析器** 使 `tool_choice=required` 场景下的工具使用更加可靠——对生产级推理流水线至关重要。构建多模态智能体请使用 `--model Ling-3.0-flash-VL`。  
- **性能调优**：在 RTX 5090 上，建议启用 `GGML_CUDA_DISABLE_GRAPHS=1`，直至 CUDA Graph Bug 修复。高吞吐推理场景下，请使用 `--threads -1`（现已自动计算数学核心数）。  
- **多 GPU 部署**：在多 GPU 系统上使用 ROCm/HIP 与 SYCL 时需谨慎——状态泄漏可能导致输出污染。请密切监控 `--ctx-size` 与草案 MTP 使用情况。  
- **跨平台应用**：OpenHarmony 支持使得应用可在嵌入式或移动端设备（musl libc）部署。请确保 UTF-8 路径处理已验证（修复已合并）。  
- **量化选择**：考虑在基于 ARM 的边缘推理中使用带 NEON 向量化的 `Q8_K_M`。关注后续版本中对 `Prism PQ2_0/PTQ1_0` 的支持进展。

> 📌 **实用提示**：始终验证模型输出是否存在无效 UTF-8——近期 PR (#28724, #29161) 在标记边界增加了清理机制。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-20**

---

### **1. 今日亮点**  
Ollama 持续增强对高级模型功能的支持，针对 DeepSeek 与 Qwen 模型的工具调用解析及推理内容处理问题进行了关键修复。新提交的 PR 引入了 OpenAI 兼容 API 中的 `reasoning_content` 支持，并改进了 Qwen3-Coder 对隐式工具调用语法的检测能力，直接解决了客户端兼容性问题。与此同时，关于 GPU 内存报告及 MTP 草稿词汇裁剪的持续工作，预示着底层基础设施正迈向更深层次的成熟。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何发布或破坏性变更。*  
然而，**问题 #18542** 指出一项破坏性变更：`typical_p` 已不再支持，可能影响如 SillyTavern 等旧客户端。这表明未来版本中可能存在弃用——开发者应审查依赖项中是否使用了 `typical_p`。[Issue #18542](https://github.com/ollama/ollama/issues/18542)

---

### **3. 新模型与硬件支持**  
- ✅ **MLX**：通过 MLX 运行器（`POST /api/extract`）新增对 `gliner-small-v2.1` 的原生支持，可在 Apple Silicon 上实现轻量级实体提取。[PR #18535](https://github.com/ollama/ollama/pull/18535)  
- 🚧 **Qwen 3.5 MoE**：正在开发基于裁剪草稿词汇（`d2t` 映射）的 FastMTP 实验性支持。[PR #18546](https://github.com/ollama/ollama/pull/18546)  
- 🖥️ **硬件**：当前 PR 正在优化多 GPU 感知能力——支持 Linux 系统上的 **CUDA 与 ROCm 运行时**（例如 7800XT + 4060Ti）。[Issue #18545](https://github.com/ollama/ollama/issues/18545)，[PR #18543](https://github.com/ollama/ollama/pull/18543)

---

### **4. 性能与优化**  
- 🔍 **内存预测与报告**：三项相关 PR ([#18197](https://github.com/ollama/ollama/pull/18197)，[#18198](https://github.com/ollama/ollama/pull/18198)，[#18201](https://github.com/ollama/ollama/pull/18201)) 实现了按设备的显存报告以及基于头部维度和负载指标的预测性显存估算——对多 GPU 部署规划至关重要。  
- ⚙️ **推测解码**：Qwen3.8 27B 出现 MTP 推测解码回归问题；修复待定。[Issue #18541](https://github.com/ollama/ollama/issues/18541)  
- 📊 **基准测试**：`bench` 命令现已支持 HumanEval 提示词及可调节上下文大小的 OpenAI API 基准测试。[PR #17480](https://github.com/ollama/ollama/pull/17480)，[PR #15084](https://github.com/ollama/ollama/pull/15084)

---

### **5. 稳定性与回归问题**  
**高严重性：**  
- ❌ **RTX 4000 Ada 上的 CUDA 崩溃**：`gpt-oss:20b`（MXFP4）在短 `/api/chat` 请求期间因 CUDA `ADD_ID` 失败而确定性崩溃。[Issue #18522](https://github.com/ollama/ollama/issues/18522)  
- ❌ **工具调用解析失败**：多个模型（Qwen3-Coder、MiniCPM5-2B）在推理内容前置或缺少 `<tool_call>` 开头符时无法正确解析工具调用。[Issue #18530](https://github.com/ollama/ollama/issues/18530)，[Issue #18483](https://github.com/ollama/ollama/issues/18483)  
- ❌ **静默丢弃图像输入**：`deepseek-v4.1-flash:cloud` 宣称支持 `vision` 功能，但静默丢弃所有图像输入，且不抛出错误。[Issue #18527](https://github.com/ollama/ollama/issues/18527)  

**中等严重性：**  
- ⚠️ **Intel QuickSync iGPU 未被使用**：尽管已启用 GPU 透传，Docker 容器中仍无 iGPU 活动迹象。[Issue #18548](https://github.com/ollama/ollama/issues/18548)  
- ⚠️ **模型下载失败**：用户报告 v0.34.2 版本中模型下载失败，但在 v0.34.1 版本中正常。[Issue #18547](https://github.com/ollama/ollama/issues/18547)  
- ⚠️ **MLX Gemma 4 MoE 加载失败**：缺少 MoE 专家权重（`experts.switch_glu`），导致无法加载预量化模型 `mlx-community/gemma-4-26B-A4B-it-qat-4bit`。[Issue #18540](https://github.com/ollama/ollama/issues/18540)

---

### **6. 对应用开发者的启示**  
- **工具调用客户端需适配**：预计不同模型间工具调用解析行为不一致——尤其在 Qwen3-Coder 与 MiniCPM5-2B 上。建议使用 `qwenParserState` 逻辑或预期返回 `null`。[PR #18538](https://github.com/ollama/ollama/pull/18538) 提供部分缓解方案。  
- **OpenAI 兼容客户端需更新**：DeepSeek 兼容 API 现要求提供 `reasoning_content` 字段——忽略该字段的客户端将丢失重播的思考过程。[PR #18536](https://github.com/ollama/ollama/pull/18536)，[PR #18543](https://github.com/ollama/ollama/pull/18543) 已添加支持。  
- **多 GPU 部署需谨慎配置**：若同时使用 NVIDIA 与 AMD 显卡，请确保已安装 CUDA 与 ROCm 运行时。当前安装程序优先选择 CUDA。[Issue #18545](https://github.com/ollama/ollama/issues/18545)  
- **关注破坏性变更**：`typical_p` 的移除可能破坏旧客户端——升级至 v0.34.1 以上版本前，请先更新集成依赖。[Issue #18542](https://github.com/ollama/ollama/issues/18542)  

> 💡 *实用提示：* 使用 `/api/info` 与 `/api/ps` 端点监控实际 GPU 内存使用情况与模型部署位置——这对排查内存超分配场景至关重要。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM 简报 – 2026-09-20**

---

### **1. 今日亮点**  
LiteLLM 项目持续强化企业级可观测性与安全能力，修复了速率限制逻辑（问题 #34140）、流式响应序列化（PR #41983）以及团队管理审计日志（PR #41840）等关键问题。新增的 UI 功能现已展示提示词缓存节省效果（PR #42055）和 FUSE v2 路由预测（PR #42057），显著提升内部用户与管理员的成本可见性。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
- **迁移提示**：由于 MCP 2.0.0 版本存在破坏性变更（问题 #35306），`mcp` Python SDK 已固定在 1.x 版本（`mcp>=1.28.1,<2.0`）。用户必须避免在兼容性修复前将 `mcp==2.0.0` 与 LiteLLM 一同安装。

---

### **3. 新模型与硬件支持**  
- **模型更新**：  
  - 新增对 `openrouter/deepseek/deepseek-v4-flash` 的支持，并更新定价（PR #42006）。  
  - 将 `deepseek-vr-p4o` 添加至 `model_prices_and_context_window.json`（问题 #30430）。  
- **服务商集成**：  
  - 正在推进对 Anthropic **Claude Apps Gateway** 的支持（问题 #34924）。  
  - AWS Nova Sonic 模型已从已停用的 `amazon.nova-sonic-v1:0` 更新为 `amazon.nova-2-sonic-v1:0`（PR #42053）。

---

### **4. 性能与优化**  
- **预留容量防护优化**（PR #41983）：  
  - 对低于 `min_tokens` 阈值的请求跳过压缩往返过程，减少短对话延迟，无需牺牲令牌节省。  
- **提示词缓存可见性**（PR #42055）：  
  - 增加可筛选的单个提示词缓存请求视图，包含注入、使用量及净节省，支持精细化成本优化。  
- **内部用户节省与路由使用情况**（PR #42026）：  
  - 通过 JWT 归因扩展 UI 分析功能至内部用户，改善多用户部署中的责任追溯。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR | 描述 |
|------|----------|--------|--------|-------------|
| [#34140](https://github.com/BerriAI/litellm/issues/34140) | 严重 | 开放 | ❌ | 速率限制器对每团队每模型的配额重复计数 → 实际 RPM/TPM 仅为配置值的一半。影响成本控制与 SLA 执行。 |
| [#41983](https://github.com/BerriAI/litellm/pull/41983) | 高 | 开放 | ✅ | 流式事件丢失显式的 `null` 值（如 `response.completed`）→ 破坏下游解析。修复已合并。 |
| [#41972](https://github.com/BerriAI/litellm/pull/41972) | 高 | 开放 | ❌ | 流式分块在 `_serialize_streaming_chunk` 中丢弃 `null` 值，导致事件载荷不完整。 |
| [#41954](https://github.com/BerriAI/litellm/issues/41954) | 高 | 开放 | ❌ | 在 Anthropic → OpenAI → Anthropic 跨桥过程中，工具结果的 `cache_control` 字段被错误移入 `content`，引发 400 错误。 |
| [#42005](https://github.com/BerriAI/litellm/issues/42005) | 中等 | 开放 | ❌ | 回复到 Chat 桥接在多轮重播中丢失原生工具调用，并将推理内容泄露为助手文本。 |

> 🔴 **严重风险**：速率限制器缺陷（#34140）可能导致使用基于团队的模型配额的生产环境出现意外的 429 错误。

---

### **6. 对应用开发者的启示**  
- **避免在配置中使用 `sk-1234`**：已从发行配置中移除主密钥示例（PR #42011）——始终使用环境变量或密钥管理器。  
- **流式可靠性**：使用 Anthropic 等服务商的 `/v1/responses` 流时需谨慎；除非应用补丁（PR #41983），否则 `null` 字段可能被剔除。  
- **成本可见性**：利用新 UI 功能（PRs #42055, #42026）监控提示词缓存节省与内部用户支出——对代理成本治理至关重要。  
- **多账户 OAuth**：若需在一个代理中支持多个 ChatGPT 账户，建议参与贡献问题 #23777（当前不支持）。  
- **防护策略注意**：自定义代码/工具权限防护目前尚无法拦截通过 `/v1/messages` 发送的 MCP 工具（问题 #40583）——请在应用层确保回退验证。

> 📌 **行动项**：若使用每团队每模型限速，请立即审查您的速率限制配置——当前行为可能导致有效吞吐量减半。

---  
*简报生成时间：2026-09-20 | 来源：[GitHub - BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-20**

#### **1. 今日亮点**  
Unsloth 生态系统持续成熟，模型管理、稳定性及跨平台支持均获关键提升。重要修复解决了 Qwen 模型（如 `Qwen3.5 FastMTP`）在加载 GGUF 时的崩溃问题，以及多 GPU MoE 配置下的内存问题。值得注意的是，新提交的 PR 实现了 Studio 中的 *多驻留 GGUF 模型* 支持，并扩展了 Docker 对 ROCm 用户的支持——包括 JupyterLab 与 SSH 访问，为 AMD GPU 开发者填补了关键空白。

#### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未引入任何影响 API 或配置的更改。

#### **3. 新模型与硬件支持**  
- ✅ **ROCm + WSL2 GPU 访问**：PR #11212 允许 ROCm 容器在 WSL2 中使用 AMD 的 DXG 桥接 (`/dev/dxg`)，解决 Windows 系统下 GPU 访问失败的问题。  
- ✅ **Docker ROCm Studio 镜像**：PRs #11218 与 #11286 为 `unsloth/unsloth-rocm` 添加完整 Studio UI、JupyterLab、SSH 及 supervisord，实现与 CUDA 镜像的完全对齐。  
- ✅ **EXL3 量化后端**：PR #7115 新增对 ExLlamaV3 (EXL3) 的实验性支持，涵盖 2/3/4/6/8 位量化及 MoE 模型处理能力——适用于低内存推理场景。  
- ✅ **Nixpkgs 打包**：PR #11135 提供 Unsloth Desktop 的官方 NixOS 包，支持通过 `nix` 进行声明式安装。

#### **4. 性能与优化**  
- 🚀 **多驻留 GGUF 模型**：PR #10876 引入对多个 GGUF 模型在独立 `llama-server` 进程中并行运行的支持，显著提升 A/B 测试与智能体编排的工作流效率。  
- 💡 **提示词保留**：PR #11340 扩展 API 监控功能，可保留超过 12K 字符的完整提示（上限 64 MiB），确保调试准确性和结果可复现。  
- ⚙️ **张量分片保留**：PR #11330 修复了在 CPU 卸载过程中 `--tensor-split` 标志被错误移除的回归问题，防止大型 MoE 模型在跨 GPU 分布时出现 OOM。

#### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 链接 |
|--------|------|--------|------|
| 🔴 高 | Qwen3.8-Flash-Next MTP 因 `hc_head_norm` 维度不匹配在 rebase 后终止 | 开放 | [Issue #11143](https://github.com/unslothai/unsloth/issues/11143) |
| 🔴 高 | Qwen 3.5 FastMTP 使用 `d2t` 词汇表裁剪时导致 llama.cpp 加载器崩溃 | 开放 | [Issue #11335](https://github.com/unslothai/unsloth/issues/11335) |
| 🔴 高 | Windows 桌面后端安装路径仍为 `%USERPROFILE%\.unsloth\studio`，无视自定义应用目录 | 开放 | [Issue #11327](https://github.com/unslothai/unsloth/issues/11327) |
| 🟡 中等 | Windows 上推理性能慢于 Linux（回归问题） | 开放 | [Issue #11336](https://github.com/unslothai/unsloth/issues/11336) |
| 🟡 中等 | “审查计划”功能需页面刷新后才生效 | 开放 | [Issue #10676](https://github.com/unslothai/unsloth/issues/10676) |

> ✅ *备注：* 多个问题已有修复 PR（例如 #11338 用于 Debian 更新，#11341 用于自动重载），但尚未合并。

#### **6. 对应用开发者的启示**  
- 使用 **EXL3 后端**（PR #7115）部署 MoE 或高精度模型的超低内存场景——尤其适合边缘推理。  
- 利用 **多驻留 GGUF 模型**（PR #10876）并行运行智能体或对比流水线，无需重复加载。  
- 对 **AMD 用户**，现在 Docker 镜像已提供完整 Studio + Jupyter + SSH 功能——无需手动配置。请确保 WSL2 已正确设置 DXG 桥接以获得 GPU 访问权限。  
- 在问题 #11335 解决前，避免对 Qwen 模型使用 `d2t` 裁剪的词汇表。  
- 在 Windows 上预计性能较慢（问题 #11336）；生产环境建议优先考虑 Linux 或 WSL2。  

> 👉 *实用提示：* 关注 PR #11338，即将推出 Debian 内部更新——对企业级部署至关重要。

---  
*数据来源：github.com/unslothai/unsloth | 更新时间：2026-09-20*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*