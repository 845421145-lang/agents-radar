# AI 基础设施日报 2026-10-04

> 生成时间: 2026-10-04 01:56 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-04**

---

### **1. 生态概览**  
2026年第四季度，AI推理与服务生态正迅速成熟为一个高度专业化、硬件感知的格局。各项目正聚焦于下一代架构（SM120、GB10、B300）的高性能推理，重点集中在推测解码、MoE/混合GDN支持以及高效的内存管理。清晰的分化趋势正在形成：底层引擎（vLLM、SGLang、llama.cpp）优化内核与缓存；中间件网关（LiteLLM）侧重代理编排与成本控制；本地运行时（Ollama、Unsloth）则强调开发者体验与多模态工作流集成。安全、可观测性及跨平台稳定性已成为不可妥协的要求。

---

### **2. 活跃度对比**

| 项目       | 开放问题 | 开放PR | 最近发布？ | 备注 |
|------------|----------|--------|------------|------|
| **vLLM**   | 78       | 94     | ✅ `v0.30.1-rc1` | 正在集中修复正确性问题（Marlin、推测解码） |
| **SGLang** | 82       | 101    | ❌ 无新版本 | 重点投入内核优化与AMD/ROCm支持 |
| **llama.cpp** | 115    | 132    | ✅ `b11382`（补丁） | 推测解码中的严重回归问题仍存在 |
| **Ollama** | 67       | 79     | ❌ 无新版本 | 稳定性修复为主；音频输入功能已在开发中 |
| **LiteLLM** | 103     | 114    | ✅ v1.105.0-rc.1 | 安全优先发布；遥测与预算机制受审查 |
| **Unsloth** | 91      | 127    | ❌ 无新版本 | 多GPU张量分片出现性能下降 |

> 🔍 *观察：所有项目均展现出强劲的贡献者活跃度，其中vLLM和Unsloth在开放PR数量上领先——表明工程推进势头强劲。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------|------|--------|-----------|--------|---------|---------|
| **Qwen4Exp (Qwen3.8-Flash-Next)** | ✅ MTP支持 | ⚠️ 正在调优 | ✅ 已添加MTP | ❌ 尚未支持 | ❌ 尚未支持 | ❌ 尚未支持 |
| **GLM5Next**               | ❌ | ✅ 正在调优 | ✅ MTP支持 | ❌ | ❌ | ❌ |
| **Nemotron-3.5-Lightning** | ✅ NVFP4 + gfx942 | ❌ | ❌ | ❌ | ❌ | ❌ |
| **MiniMax-M3 / H3**        | ❌ | ✅ AITER + FP8 | ❌ | ❌ | ❌ | ✅ 音频工作流、扩散阶段 |
| **SystemOne 决策模型**     | ❌ | ❌ | ❌ | ✅ 完全支持MLX | ❌ | ❌ |
| **音频输入 (Qwen2-Audio)** | ❌ | ❌ | ❌ | ✅ 功能请求 | ❌ | ❌ |

> 🏆 **领先者**：**SGLang** 在前沿模型架构支持方面领先（DeepSeek-V4.1、MiniMax-M3在MI35x/MI355X上、通过Cake-kernels实现DSV4稀疏解码）。  
> 🥈 **亚军**：**vLLM** 在大型MoE模型（Qwen3.6-35B-A3B、Nemotron）的稳定生产级支持方面表现卓越，覆盖多种硬件平台。  
> 🥉 **差异化优势**：**Unsloth** 在**多模态音频工作流**与**预量化扩散检查点加载**方面领先，使其成为创意AI流水线中的独特参与者。

---

### **4. 性能前沿**

| 优化方向             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存效率**       | ✅ （修复NVFP4损坏问题） | 🔴 （关键NVFP4漏洞） | ❌ | ❌ | ❌ | ❌ |
| **推测解码**         | ⚠️ （高危漏洞） | ✅ （持续调优） | 🔴 （关键`draft-mtp`崩溃） | ❌ | ⚠️ （预算回退问题） | 🔴 （张量分片性能下降） |
| **批处理与吞吐量**   | ✅ （调度器效率） | ✅ （文件后端PLE表） | ✅ （MoE GPU缓存） | ❌ | ❌ | ⚠️ （多GPU变慢） |
| **量化（FP8/NVFP4/MXFP4）** | ✅ （完整MoE支持） | ✅ （AITER + 融合归一化） | ✅ （WebGPU f16、MMVQ） | ❌ | ❌ | ❌ |
| **分布式服务**       | ✅ （MTP、UVA卸载） | ✅ （分布式预处理） | ❌ | ❌ | ✅ （追踪、分页） | ❌ |
| **内核融合与底层调优** | ⚠️ （Marlin、Triton） | ✅ （CAKE、AITER、FLUX.3） | ✅ （CUDA/AMD GCN5） | ❌ | ❌ | ✅ （SageAttention 2、FlashAttention 4） |

> 📈 **趋势**：性能前沿正转向**内核级专业化**（SGLang、Unsloth）、**分布式冷行优化**（SGLang）以及**推测解码鲁棒性**（vLLM）。量化与批处理仍是基础，但正确性已成为首要关注点——无声错误（如NVFP4缓存损坏）被视为关键问题。

---

### **5. 层级定位**

| 项目       | 主要层级              | 核心差异化 |
|------------|------------------------|------------|
| **vLLM**   | **推理引擎**           | 高吞吐、可扩展大模型服务的行业标准；云部署中占据主导地位。 |
| **SGLang** | **推理引擎 + 网关**    | 融合引擎能力与代理路由（Cake-kernels），面向高性能代理系统。 |
| **llama.cpp** | **本地运行时 / 嵌入式** | 轻量、跨平台，适合边缘设备与离线推理。 |
| **Ollama** | **开发者网关 / 本地运行时** | 开发者优先的用户体验；连接命令行、Web UI与多模态工作负载。 |
| **LiteLLM** | **智能体网关 / 编排中心** | 路由、预算、追踪与工具执行的中枢，对生产级智能体至关重要。 |
| **Unsloth** | **工作室平台 / 训练运行时** | 全流程工作室体验，涵盖训练、微调与音视频工作流；面向创作者与研究人员。 |

> 💡 **战略洞察**：vLLM与SGLang是规模化部署的**引擎层首选**；LiteLLM与Ollama作为**网关层**服务于智能体与应用；Unsloth与llama.cpp则是**本地运行时**的赋能者，适用于开发者与边缘场景。

---

### **6. 趋势信号**

1. **正确性优先于速度**：无声缺陷（如NVFP4 KV缓存损坏、Marlin int8 scale读取错误）现已视为**严重级别**，而非单纯性能问题。开发者必须优先采用**经验证构建**与**签名镜像**（LiteLLM、vLLM）。
2. **以智能体为中心的设计**：网关（LiteLLM）与引擎（SGLang）正越来越多地针对**智能体推理**、**工具调用**与**媒体内容保真**进行优化——不再仅关注令牌生成。
3. **硬件特化**：AMD ROCm与NVIDIA SM120/GB10已不再是实验性目标，而是主要支持对象。SGLang与Unsloth等项目正大力投入**厂商专用内核**（AITER、SageAttention）。
4. **安全与供应链完整性**：签名Docker镜像（LiteLLM）、OIDC支持（Anthropic）、cosign验证已成为标配——**不再默认信任**。
5. **多模态扩展**：音频输入（Ollama）、扩散模型（Unsloth）、媒体感知路由（LiteLLM）表明，**视觉与音频如今已是智能体工作流中的核心组成部分**。

> 🔔 **对应用开发者的行动建议**：  
> - 在规模化前，审计你的推理栈是否具备**正确性保障**。  
> - 使用来自可信来源的**签名、验证构建**（如LiteLLM的cosign）。  
> - 设计智能体工作流时，考虑**媒体保真度**与**预算控制**。  
> - 避免在生产环境使用不稳定版本（如`b11382+`、`b10715+`）——**固定到已知稳定的提交**。  
> - 准备将**音频与多模态输入**作为核心功能，而非附加组件。

---  
*报告生成时间：2026-10-04 | 数据来源：GitHub项目摘要*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-10-04**

#### **1. 今日亮点**  
针对 Marlin int8-activation 量化（PR #59895）和推测解码正确性（PR #52244）的关键修复，解决了影响 MoE 及混合 GDN 模型精度与吞吐量的高危问题。针对 MTP 推测解码的重大性能下降——导致批量吞吐量损失高达 30–40%——正在积极调查中（Issue #53670），同时新提交的 PR 提升了令牌流传输的可靠性与调度器效率。

#### **2. 发布与破坏性变更**  
过去 24 小时内无新发布。即将推出的 `v0.30.1` 版本（当前为 `rc1`）预计包含 ROCm、UVA offload 及推测解码方面的稳定性改进。若依赖 `--offload-backend uva` 或 `num_speculative_tokens_per_batch_size` 等功能，开发者应使用 `nightly` 构建版本进行测试。

#### **3. 新模型与硬件支持**  
- **ROCm**：在 gfx942 上对 `nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4` 的支持在 #59027 修复后已稳定。  
- **Intel GPU**：PR #59865 在 XPU 上为多模态模型添加了融合输入归一化（`mm_input_norm`）支持。  
- **量化**：NVFP4 与 MXFP4 在 MoE 及混合 GDN 布局中的支持已显著增强（例如 Qwen3.6-35B-A3B）。  
- **硬件**：对 DGX Spark（GB10/SM121）、Blackwell（sm_120）及 B300（SM100）平台的支持已全面确认。

#### **4. 性能与优化**  
- **推测解码**：动态 MTP 推测解码在批处理规模阈值处引发灾难性吞吐量崩溃（Issue #49548）。修复工作正在进行中，通过 PR #52244（前缀缓存命中恢复）和 PR #59895（scale 腐败修复）推进。  
- **调度器效率**：PR #59908 通过将 `prompt_token_ids` 以 `int32` 数组形式发送，优化了请求令牌传输，减少了长提示预填充阶段的 CPU 开销（每提示数十毫秒）。  
- **内存使用**：PR #57865 确保在计算 KV 缓存大小前已计入图分析工作区，防止高并发场景下出现 OOM。

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|---------|-------|--------|------------|
| 关键 | #59403: Marlin int8-activation 将负组尺度读取为无符号 → 损坏 logits | 所有使用 `VLLM_MARLIN_INPUT_DTYPE=int8` 的模型 | ✅ 已在 PR #59895 中修复（依赖 #48926） |
| 高 | #53670: EAGLE/MTP 前缀缓存最后块丢失导致 1,648 令牌重新计算 → 吞吐量损失 30–40% | 混合 GDN + 推测解码工作负载 | 🔧 正在处理（PR #52244） |
| 高 | #49548: 动态推测解码在阈值处导致聚合吞吐量崩溃 | 批级性能下降 | 🔍 正在调查根本原因 |
| 中 | #59834: Responses API 流式传输重复生成 `item_id`/`call_id` → 破坏严格客户端兼容性 | 流式代理兼容性 | ✅ 已在 PR #59859 中修复 |
| 中 | #59770: Nemotron-3.5-Lightning NVFP4 解码自 v0.29.0 起慢约 16% | 单请求延迟回归 | 🔎 正在分析 |

#### **6. 对应用开发者的启示**  
- 在升级至 `v0.30.1+` 或应用 #59895 补丁前，**请避免在 Marlin 中使用 `int8-activation`**。  
- **谨慎使用 `--offload-backend uva`** 配合量化 MoE 模型——由于 `pin_memory()` 四舍五入，预计会浪费约 35% 主机内存（Issue #58178）。  
- **仅在可容忍潜在吞吐量下降的前提下启用 `num_speculative_tokens_per_batch_size`**——需监控大上下文模型（如 Qwen3.5-122B 等）上的回归情况。  
- **确保 `request-level chat_template_kwargs` 不破坏图像处理**——多模态请求可能静默丢弃图像（Issue #59876）。  
- **流式响应** 现已正确保留 `item_id`/`call_id`（通过 #59859），提升了与严格 OpenAI 客户端代理的兼容性。

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [PRs](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-04**

---

### **1. 今日亮点**  
SGLang 生态系统持续成熟，重点聚焦于下一代硬件的**性能优化**，特别是 SM120（RTX PRO 6000）和 GB10（DGX Spark）。关键进展包括对 **NVFP4 KV 缓存损坏** 和 **fa4 attention 后端崩溃** 的紧急修复，同时正在推进 DeepSeek V4.1 的优化，并通过 AITER 内核增强对 AMD MI35x/MI355X 的支持。社区还正在开发分布式多模态预处理以及基于文件的 PLE 表，以提升冷行场景下的效率。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新发布或破坏性变更。*  
然而，`sgl-deep-gemm`（v0.2.0）相关工作揭示了遗留的 API 不一致问题：[Issue #39684](https://github.com/sgl-project/sglang/issues/39684) 指出 `SM90 weight-scale transform` 返回非所有权别名——若下游代码处理不当，可能引发未定义行为。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 支持**：扩展 MiniMax-M3 在 gfx950 上的支持，包括通过 AITER 实现 FP8 块选择（`PR #41708`, `#41707`）及融合稀疏 QK 归一化 + RoPE + 缓存写入（`PR #35357`）。  
- **NVIDIA SM120/GB10**：针对 GLM-5.3-Flash（`Issue #42012`）、Qwen4Exp（`Issue #36796`）和 DeepSeek-V4.1（`Issue #42170`）进行持续调优。  
- **多模态与扩散模型**：新增通过 `SGLANG_CAKE_ROUTES` 支持 MiniMax-H3 扩散阶段（`PR #42416`），并改进 ComfyUI 集成（`PR #42121`）。  
- **模型格式**：通过 `oci://` 方案支持 OCI 注册表路径解析（`PR #37161`），实现安全、离线环境下的模型部署。

---

### **4. 性能与优化**  
- **基于文件的 PLE 表**：PR `#42392` 引入冷行并发主机读取，在 GB10 上实现 **冷预填充 TTFT 降低 6.8 倍**，显著提升长上下文推理性能。  
- **AMD 优化**：  
  - 基于 AITER 的 HD128 层 FP8 预填充降低 MiniMax-M3 延迟（`PR #41707`）。  
  - 小批量 MoE 排序在 MI355X 上优化（`PR #41982`），解决 InferenceX 基准测试中的性能瓶颈。  
- **内核融合**：FLUX.3 行级 FP8 量化现已与 Triton 融合（`PR #41671`）；DSV4 稀疏 MLA 解码通过 Cake-kernel 转发启用（`PR #42416`）。  
- **预填充/解码流水线**：正在进行 mHC TP 优化（`Issue #42170`）及 DSPARK 验证修复（`PR #42439`），旨在降低大模型上的解码开销。

---

### **5. 稳定性与回归问题**  
- **严重级别**：  
  - **NVFP4 KV 缓存损坏**（`Issue #42369`）：从 `num_bits: 8` 的检查点加载 NVFP4 缓存时，因重用 fp8 校准的 `k_scale`/`v_scale`，会无声地导致 32 个标量损坏，引发 sm_120 上确定性的长上下文错误。*修复待定*。  
  - **fa4 Attention 崩溃**（`Issue #42012`）：在 SM120 上执行 CUDA 图捕获时，混合扩展重塑失败；目前仅 Triton 后端可稳定运行。*高危，暂无修复方案*。  
- **中等严重度**：  
  - `--bf16-gemm-backend gemv` 被接受但被忽略（`Issue #42085`）。  
  - `--enable-return-routed-experts` 在 triton/flashinfer 路径上返回全零路由结果（`Issue #41743`）。  
- **CI 健康状态**：`Issue #17050` 记录主分支存在 1 个失败、8 个不稳定的测试——主要影响主干稳定性。

---

### **6. 对应用开发者的启示**  
- **使用 `SGLANG_CAKE_ROUTES`** 以启用高性能内核路径（如 DSV4 稀疏解码、Mamba2 SSD/SSU）——尤其适合对低延迟路由有要求的智能体工作负载。  
- **避免在 `num_bits: 8` 的检查点上使用 `nvfp4` KV 缓存**，直到 `#42369` 修复完成——否则可能导致长上下文任务中难以调试的正确性问题。  
- **利用基于文件的 PLE 表**（`PR #42392`）应对冷启动密集型应用场景（如检索增强生成）。  
- **部署 MiniMax-M3 或 Qwen3.5-397B 到 MI35x/MI355X 时，注意 AMD 特定回归问题**（`PR #41708`, `#41707`）——优先使用 AITER 内核。  
- **确保对 OpenAI 兼容 API 的错误处理机制完善**：当前响应格式偏离规范（`Issue #33504`），客户端应预期非标准错误结构。

> 🔗 [GitHub Issues 汇总](https://github.com/sgl-project/sglang/issues?q=is%3Aissue+is%3Aopen+updated%3A%3E2026-10-03) | [近期 PR](https://github.com/sgl-project/sglang/pulls?q=is%3Aopen+updated%3A%3E2026-10-03)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-04**

---

### **1. 今日重点**  
最新更新聚焦于稳定推测解码（speculative decoding）工作流，并提升 GPU 后端的鲁棒性，特别是 WebGPU 与 CUDA。关键修复解决了在多 ubatch 条件下 `draft-mtp` 的严重崩溃问题，以及通过 Vulkan 在 Snapdragon X Elite 上出现的内存损坏问题。WebGPU 中新增对 f16 支持的 `fill`/`set_rows` 功能，增强了与现代量化模型的兼容性。

---

### **2. 发布与破坏性变更**  
- **b11382**: WebGPU 后端中 `fill`/`set_rows` 新增 `f16` 支持 ([#29897](https://github.com/ggml-org/llama.cpp/pull/29897)) — 为 `glm5-next` 和启用 FA（Fast Attention）的模型正确运行所必需。  
- **b11381**: 修复 `mtmd` 在 Windows 上因使用已弃用的 `strdup` 引起的警告 ([#29863](https://github.com/ggml-org/llama.cpp/pull/29863))。  
- **b11380**: 更新 `cpp-httplib` 至 v0.59.0，改善依赖项管理 ([#29886](https://github.com/ggml-org/llama.cpp/pull/29886))。  
- **b11379**: 修复由 `n_batch` 与 `n_ubatch` 不匹配导致服务器异常终止的问题 ([#29903](https://github.com/ggml-org/llama.cpp/pull/29903)) — 影响高并发推理的稳定性。

> ✅ *无破坏性 API 变更；所有更新均为错误修复或性能优化。*

---

### **3. 新模型与硬件支持**  
- **新模型支持**：  
  - 为 **GLM5Next** 添加 MTP（多标记预测）支持 ([#29928](https://github.com/ggml-org/llama.cpp/pull/29928))。  
  - **Qwen4Exp (Qwen3.8-Flash-Next)** 现已支持 MTP ([#29761](https://github.com/ggml-org/llama.cpp/pull/29761))。  
- **硬件与后端增强**：  
  - **WebGPU**: `fill/set_rows` 完全支持 f16，实现 `glm5-next` 与 Fast Attention 下的稳定推理。  
  - **CUDA**: 通过减少 AMD GCN5 上的 VGPR 溢出，优化 Q2_K 内核性能 ([#29910](https://github.com/ggml-org/llama.cpp/pull/29910))。  
  - **SYCL**: 修复 `mul_mat`、分块缓冲区及主机内存池处理中的内存错误 ([#29889](https://github.com/ggml-org/llama.cpp/pull/29889))。  
  - **OpenVINO**: 升级至 2026.4.1，包含性能改进、扩展算子支持及更完善的设备列表 ([#29852](https://github.com/ggml-org/llama.cpp/pull/29852))。  
- **量化格式支持**：  
  - WebGPU 上将 MMVQ 支持扩展至 `Q1_0`、`Q5_0`、`Q5_1`、`Q3_K`、`Q5_K`、`Q6_K` 与 `MXFP4` ([#29483](https://github.com/ggml-org/llama.cpp/pull/29483))。

---

### **4. 性能与优化**  
- **WebGPU**: 多个模型上 `Q1_0/Q5_0/Q5_1` 推理速度显著提升（例如 Tesla V100 上约 1.3 倍加速）。  
- **CUDA (AMD)**: Q2_K 内核大幅减少 VGPR 溢出 — 显著提升 MI50 及同类 GCN5 GPU 的吞吐量。  
- **MoE 优化**: PR [#29887](https://github.com/ggml-org/llama.cpp/pull/29887) 引入一种驻留于主机内存的 MoE 专家 GPU 缓存机制，降低小批量（<32 标记）时的卸载开销。  
- **内存效率**: Qwen4Exp 现在将索引器得分内存占用减半 ([#29825](https://github.com/ggml-org/llama.cpp/pull/29825))，对长上下文推理至关重要。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|---------|------|--------|------------|
| 严重 | `draft-mtp` 在 `-np N` 且多 ubatch 条件下接受率降为 0.0 | 推测解码中静默失败 | [修复进行中](#27572) |
| 高 | GLM-5.3-Flash 在 Metal 上解码卡死，因回退至 CPU 索引器 | 阻碍 Apple M5 上实时推理 | [问题开放](#29867) |
| 高 | Qwen3.8-Flash-Next + MTP：启动时评估阶段崩溃 | 导致生产环境无法使用模型 | [问题开放](#29811) |
| 中 | `unpack8()` 在 Snapdragon X Elite（Vulkan）上损坏 MAT_MUL+CPY | Arm64 移动芯片输出不一致 | [问题开放](#28290) |
| 中 | 使用 `-np > 1` 与 Qwen3.6-35B-A3B-Q8_0 时输出乱码 | 多客户端并发问题 | [问题开放](#26031) |

> 🔥 *推测解码 (`draft-mtp`) 中的严重回归仍未解决，影响核心推理可靠性。*

---

### **6. 对应用开发者的启示**  
- **谨慎使用推测解码**：在 [#27572](https://github.com/ggml-org/llama.cpp/issues/27572) 修复前，避免在 `draft-mtp` 中使用 `-np N` —— 可能导致静默丢弃标记。  
- **充分利用新 MTP 支持**：对 Qwen4Exp 与 GLM5Next 启用 `--spec-type draft-mtp` 以提升吞吐量；建议通过 `--spec-draft-n-max 3` 测试。  
- **针对硬件优化**：在 CUDA/ROCm 上积极使用 `--gpu-layers`；尽可能选择 `f16` 路径（尤其在 WebGPU 场景）。  
- **监控内存使用**：Qwen4Exp 的内存优化降低了峰值 VRAM —— 特别适合资源受限设备上的长上下文智能体。  
- **避免不稳定版本**：若运行 `Qwen3.8-Flash-Next` 且启用了 MTP，切勿使用 `b11379` 及之后的版本 —— 启动崩溃可复现 ([#29811](https://github.com/ggml-org/llama.cpp/issues/29811))。

> 📌 *建议：在修复落地前，生产推理中使用 MTP 请锁定至 `b11378` 或更早版本。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-04**

---

### **1. 今日亮点**  
Ollama 持续推进对多模态与结构化推理工作流的支持，重点在音频输入（问题 #11798）和 SystemOne 决策模型（PRs #18777, #18768）方面取得进展。关键稳定性修复已合并至 Windows 平台的 `clef-flash`（PR #18777）及 GPU 索引错位问题（PR #18773），解决了跨平台模型服务可靠性方面的高严重性回归问题。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
今日未发布新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **音频输入支持**：功能请求 (#11798) 希望为 Qwen2-Audio 等多模态模型启用音频输入，对标现有的图像输入能力。此举将使 Ollama 的多模态能力突破视觉范畴。
- **MLX 后端增强**：  
  - 新增 Kolibri 1 支持（PR #18780）  
  - 改进分词器语义（PR #18779）  
  - MLX 上实现对完整 SystemOne 模型的支持（PR #18701，现已合并）  
- **Windows 与 GPU 索引修复**：PR #18773 确保在跳过零内存伪设备时正确对齐 GPU 顺序号，对 Windows 上的多 GPU 系统至关重要。

---

### **4. 性能与优化**  
- **SystemOne 延迟降低**：PR #18776 优化了 MLX 后端的路由流程，在 M5 芯片上将预热延迟降低了约 5ms——对低延迟推理场景尤为重要。
- **内存效率改进**：  
  - PR #18781 消除了模型拉取过程中的冗余 blob 获取，减少带宽开销（例如每 blob 从 8 KiB 降至 4 KiB）。  
  - PR #18771 对注册表主机中的冒号进行编码，防止在 Windows 上出现路径错误，提升容器化/企业部署的鲁棒性。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |
|--------|------|------|---------|
| 高 | `clef-flash` 在 Windows 上调用 `/v1/systemone` 时失败，表现为 `non-finite logit`（CUDA）或 `cannot open model`（CPU） | 开放 | [PR #18777](https://github.com/ollama/ollama/pull/18777) |
| 高 | 由于跳过零内存伪设备导致 GPU 设备索引错位 | 开放 | [PR #18773](https://github.com/ollama/ollama/pull/18773) |
| 中 | 在原生 llama-server 聊天路径中，JSON 模式属性顺序丢失 | 开放 | [PR #18717](https://github.com/ollama/ollama/issues/18717) |
| 中 | 当 `think:true` 绕过推理时，`gemma4:e4b` 违反 JSON 模式 | 开放 | [PR #18774](https://github.com/ollama/ollama/issues/18774) |
| 低 | `/api/generate` 请求体接受尾随非 JSON 数据 | 开放 | [PR #18778](https://github.com/ollama/ollama/pull/18778) |

> 🔴 *注意：`clef-flash` 回归问题尤为严重——影响广泛使用的决策模型，且仅在 Windows 上显现，表明存在平台相关的内存访问问题。*

---

### **6. 对应用开发者的启示**  
- **多模态应用**：请为即将推出的音频输入支持做好准备——语音驱动代理的设计者应关注 #11798，确保集成就绪。
- **结构化推理工作流**：在 Qwen3.8 GGUF 模型上使用 `think: "low"`/`"medium"` 时需谨慎——当前行为与模板预期不一致。建议临时使用 `think: false` 作为规避方案，直至修复上线。
- **跨平台部署**：若在 Windows 上使用 `clef-flash` 或其他 SystemOne 模型，可能遭遇失败，除非通过 PR #18777 打补丁。请尽早于目标硬件上进行测试。
- **模式强制约束**：当 `think:true` 时，避免依赖 `gemma4` 或类似模型响应中严格的 JSON 模式顺序——输出可能格式异常。
- **输入验证**：确保客户端不会在 `/api/generate` 请求体中发送尾随垃圾数据；未来版本将拒绝此类请求（详见 #18775）。

👉 *建议：在关键修复发布前锁定 Ollama 版本，尤其是部署在 Windows 平台或使用决策模型的场景。*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 简报 — 2026-10-04**

#### **1. 今日重点**  
LiteLLM 持续快速演进，聚焦于**代理遥测完整性**、**预算可靠性**以及**智能体系统鲁棒性**。关键进展包括修复关键的预算耗尽逻辑问题，提升推理模型的追踪回放保真度，并加强 OAuth 及凭证处理的安全性。项目还推进可观测性栈建设，集成 OTEL v2 以支持缓存指标。

#### **2. 发布与破坏性变更**  
- 近 24 小时内发布 **v1.105.0-rc.1**、**v1.104.0** 与 **v1.103.3**。所有 Docker 镜像均使用 [cosign](https://docs.sigstore.dev/cosign/overview/) 签名，密钥与 [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入的一致。  
- **安全提示**：部署前请验证签名，防止供应链风险。使用 `cosign verify` 并结合仓库 `.sigstore` 目录中的公钥。

#### **3. 新模型与硬件支持**  
- ✅ **Anthropic 工作负载身份联合（OIDC JWT-bearer）**：通过 #28607（已关闭）新增支持，实现无需长期密钥的、基于身份的安全访问 Anthropic 接口。  
- ✅ **OpenRouter TTS 模型**：修复 #42111 中 `/v1/audio/speech` 的路由问题，现已正确映射至 OpenRouter 提供商别名（`openrouter/google/gemini-3.1-flash-tts-preview`）。  
- ✅ **YAML OpenAPI 规范**：MCP 现在支持 YAML 格式的 OpenAPI 规范 (#38952)，提升企业环境中工具定义的灵活性。

#### **4. 性能与优化**  
- **追踪与分页**：#44452 与 #44422 的重大重构引入了跨追踪列表/详情读取的共享且带签名的分页机制，降低延迟并提升大规模追踪探索时的一致性。  
- **缓存令牌指标**：OTEL v2 集成将导出提示缓存读写令牌数量作为跨度属性 (#43992)，支持对缓存行为进行细粒度性能监控。  
- **后台健康检查**：#44154 的修复确保健康检查结果按部署正确归属，防止模型组间错误传播。

#### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR | 描述 |
|------|----------|--------|--------|-------------|
| #43732：空闲超时后仍重新接纳密钥，即使已达 max_budget | ⚠️ 高 | 开放 | 否 | 虚拟密钥在 60 秒空闲后再次被接纳，直到批次写入器刷新支出 → 存在超支风险 |
| #39057：缓存命中时支出为 0，但令牌仍被计数 | ⚠️ 中 | 开放 | 否 | 响应缓存命中时遥测报告存在语义模糊；影响成本核算 |
| #44336：Vertex AI Agent Engine 静默丢弃媒体内容 | ❌ 严重 | 开放 | 否 | 非文本内容部分（`image_url`、`file`、`audio`）被丢弃且无警告 → 导致代理输出错误 |
| #43652：降级模型未遵守预算阈值 | ⚠️ 中 | 开放 | 否 | 聚合预算未在阈值触发时降级至经济型模型 |

> 🔍 *注意：多个高影响缺陷影响预算执行、代理正确性及遥测准确性——生产环境需紧急关注。*

#### **6. 对应用开发者的影响**  
- **预算系统**：若使用虚拟密钥，请勿依赖实时预算检查。建议在客户端实现重试延迟或手动刷新，避免误判超支。密切监控 #39057 和 #43732。  
- **代理设计**：使用 Vertex AI 或 Anthropic 代理处理多模态输入时需谨慎——媒体内容可能被静默丢弃（#44336）。路由后务必验证载荷。  
- **遥测与可观测性**：利用即将推出的 OTEL v2 缓存指标 (#43992) 监控缓存效率并优化模型选择。使用带签名分页 (#44452) 支持可扩展的追踪分析。  
- **认证机制**：尽可能迁移至 OIDC 工作流（通过 #28607），提升安全性与生命周期管理，尤其适用于受监管环境。  
- **工具链与 SDK**：使用新提供的 `run_tool_loop()` 与 `arun_tool_loop()` 辅助函数 (#44381)，标准化工具执行循环，减少样板代码并提升可靠性。

👉 **行动项**：  
- 审查所有虚拟密钥配置中的预算阈值与空闲超时行为。  
- 更新 CI/CD 流水线，验证 LiteLLM 镜像的 cosign 签名。  
- 在当前 RC 版本下测试涉及媒体输入与推理模型的代理工作流。  

🔗 完整问题追踪：[GitHub Issues – BerriAI/litellm](https://github.com/BerriAI/litellm/issues)  
🔗 Pull Request 仪表板：[GitHub PRs – BerriAI/litellm](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-04**

---

### **1. 今日亮点**  
Unsloth 团队在稳定和优化 Studio 的核心推理与训练工作流方面取得显著进展，重点改进了注意力核处理、模型加载可靠性以及 UI 响应速度。已识别并正在积极调查关键性能退化问题：在多 GPU 配置下，张量拆分解码性能下降高达 2.9 倍。与此同时，自动跳步（提速 1.44–1.81 倍）、每模型上下文追踪以及增强的音频工作流分离等新功能现已进入评审阶段。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未发布新版本。但多个 PR 引入了破坏性变更或行为调整：  
- **PR #12641** (`studio/sage-attention-gate`)：显式请求 `attention_backend="sage"` 现在可安全降级，不会导致生成失败或渲染噪声。可能影响依赖手动核选择的用户。[GitHub PR #12641](https://github.com/unslothai/unsloth/pull/12641)  
- **PR #12652**：对于 `speed_mode=max` 下具有 ≥20 步的模型，自动跳步现默认启用，提升效率但可能改变预期的推理行为。[GitHub PR #12652](https://github.com/unslothai/unsloth/pull/12652)

---

### **3. 新模型与硬件支持**  
- **SageAttention 2 与 FlashAttention 4**：通过内核中心集成，已在全新 Studio 安装中自动探测并加载。支持现代 NVIDIA 显卡（如 B200 sm100）。[GitHub PR #12654](https://github.com/unslothai/unsloth/pull/12654)  
- **预量化扩散检查点**：可在 torchao 0.17、0.18 及 main 分支上从 `.safetensors` 格式读取，实现更平滑的模型部署。[GitHub PR #12645](https://github.com/unslothai/unsloth/pull/12645)  
- **混合 GPU 绑定（Vulkan）**：在混合配置（如 RX 7700 XT + 集成显卡）中，提升了独立显卡的利用率。[GitHub PR #12650](https://github.com/unslothai/unsloth/pull/12650)  
- **音频工作流扩展**：新 *分离音频* 工作流现已支持 HTDemucs、BS-RoFormer 以及 Mel-Band RoFormer GGUF。[GitHub PR #12610](https://github.com/unslothai/unsloth/pull/12610)

---

### **4. 性能与优化**  
- **自动跳步**：对 ≥20 步的高步数模型默认启用，五个测试模型平均吞吐提升 **1.44x 至 1.81x**；MiniMax-H3 最高达 **1.81x**。[GitHub PR #12652](https://github.com/unslothai/unsloth/pull/12652)  
- **张量拆分解码性能退化**：自 `b10715-mix-86bd2d3` 起报告出现严重性能下降，在双 RTX 5070 Ti（Windows/WSL2/Linux）上仅约 **48 tokens/sec**，相较旧版本的 **115–120 t/s**。可能与 `max_cuda_graphs = 64` 及 CUDA 图调优有关。[GitHub Issue #12468](https://github.com/unslothai/unsloth/issues/12468)  
- **上下文长度仪表增强**：提议增加自动化压缩追踪（#12625）及工具调用状态切换追踪（#12624），以改善实时资源可见性。[GitHub Issues #12625, #12624](https://github.com/unslothai/unsloth/issues/12625, #12624)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 链接 |
|--------|------|-------------|------|
| 🔴 高 | **张量拆分解码变慢** | 多 GPU `--split-mode tensor` 性能在 `b10715-mix-86bd2d3` 后下降最高达 **2.9 倍**。影响 Windows/WSL2/Linux 平台。 | [Issue #12468](https://github.com/unslothai/unsloth/issues/12468) |
| 🔴 高 | **Studio mmproj-F16.gguf 磁盘分页** | 视觉模型在生成过程中开始从磁盘分页 `mmproj-F16.gguf`，导致吞吐量严重下降。同时拒绝 `--mlock`。 | [Issue #12372](https://github.com/unslothai/unsloth/issues/12372) |
| 🟡 中 | **Triton 健康探针破坏 Diffusers/XFormers** | Xet 健康探针会全局屏蔽 Triton 进程，触发 `'function' object has no attribute 'fn'` 错误。 | [Issue #12466](https://github.com/unslothai/unsloth/issues/12466) |
| 🟡 中 | **Windows “nul” 文件阻塞工具** | 沙箱工作目录中生成的假文件 `nul` 导致 Windows 上终端/工具运行失败。 | [Issue #12473](https://github.com/unslothai/unsloth/issues/12473) |
| 🟡 中 | **停止生成按钮冻结** | 卸载后按钮冻结；尽管模型已卸载，聊天界面仍无响应。 | [Issue #12592](https://github.com/unslothai/unsloth/issues/12592) |

> ✅ *已有修复 PR：*  
> - `tool_choice="none"` 流关闭：[PR #12627](https://github.com/unslothai/unsloth/pull/12627)  
> - Toast 样式优化：[PR #12655](https://github.com/unslothai/unsloth/pull/12655)  
> - 上下文仪表更新：[PRs #12624, #12625](https://github.com/unslothai/unsloth/pull/12624, #12625)

---

### **6. 对应用开发者的启示**  
- 若使用多 GPU 张量拆分，请避免 `b10715-mix-86bd2d3` 及更高版本 — 生产推理建议回退至 `b10687-mix-67dfc8b` 或官方 ggml 构建版本。  
- 启用 `speed_mode=max` 以利用自动跳步（提升 1.44–1.81 倍），尤其适用于大模型（>20 步）。  
- 请注意 Studio 对 `--mlock` 与 `extra_args` 的校验将更严格 — 由于安全性和稳定性加固，这些参数现在会被拒绝。  
- 部署视觉/音频模型时，请监控内核可用性：SageAttention / FlashAttention 4 现已自动加载，但降级路径对兼容性至关重要。  
- 设计具备会话容错能力的系统：`stop generating` 按钮冻结问题表明状态清理不完整 — 建议实现客户端超时处理机制。  
- 利用新 API 进行训练：`sk-unsloth` 密钥现已支持通过 MCP 工具由 API 触发的 LLM 与扩散模型训练。[PR #12644](https://github.com/unslothai/unsloth/pull/12644)

---  
*摘要生成时间：2026-10-04 | 来源：GitHub — unslothai/unsloth*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*