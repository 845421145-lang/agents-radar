# AI 基础设施日报 2026-09-30

> 生成时间: 2026-09-30 01:29 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **跨项目AI基础设施对比报告 – 2026-09-30**

---

#### **1. 生态概览**  
截至2026年末，AI推理与服务生态正迅速成熟为一个分层、专业化的格局。核心推理引擎如 **vLLM** 与 **SGLang** 正在推动大规模部署下的吞吐量与低延迟边界，而 **llama.cpp** 在跨平台、边缘优化推理领域仍保持主导地位。**Ollama** 持续弥合开发者体验与原生代理能力之间的鸿沟，**LiteLLM** 则已巩固其作为多提供商编排的企业级网关角色。与此同时，**Unsloth** 成为微调与模型导出工作流的关键使能者，显著加速了从训练到部署的闭环周期。混合模型（如 Mamba/GDN）、先进量化技术（NVFP4、MXFP4）以及代理专用功能（工具调用、网络搜索）的融合，标志着向可生产、全栈式AI系统演进的趋势。

---

#### **2. 活动对比**  

| 项目       | 开启的问题数 | 最近7天合并的PR数 | 发布状态         |
|---------------|-------------|------------------------|------------------------|
| **vLLM**      | 187         | 52                     | 稳定版：v0.30.0        |
| **SGLang**    | 164         | 47                     | 稳定版：v0.5.20        |
| **llama.cpp** | 212         | 41                     | 无新版本发布（b11260+） |
| **Ollama**    | 221         | 38                     | RC：v0.35.1-rc0        |
| **LiteLLM**   | 142         | 35                     | v1.104.0-rc.2          |
| **Unsloth**   | 178         | 29                     | 测试版：v0.1.806-beta    |

> ✅ *洞察*：**Ollama** 在面向用户的创新上领先（如增加网络搜索限制），而 **vLLM** 与 **SGLang** 在内核级优化与稳定性修复方面占据技术深度优势。**llama.cpp** 虽问题数量高但PR速度较慢——反映出其平台复杂度更高。

---

#### **3. 模型支持竞赛**  

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash**        | ✅ (FP8/MXFP4/DP8) | ✅ (NVFP4 logprob漂移) | ❌ | ⚠️ | ❌ | ❌ |
| **Kimi K2.5 / K3**        | ✅ (RFC: KV缓存) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **DeepSeek-V4.1-Flash**  | ✅ (H20崩溃) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.6 / Qwen3.8**     | ✅ (tool_call泄露) | ✅ (gfx950支持) | ✅ (DFlash/MTP OOB) | ✅ (网络搜索) | ✅ (gpt-5.6推理缺陷) | ✅ (模板修复) |
| **混合模型 Mamba/GDN**     | ✅ (KDA + PCP) | ✅ (FlyDSL + AITER) | ❌ | ❌ | ❌ | ✅ (多GPU) |
| **视觉模型 (GGUF)** | ❌ | ❌ | ✅ (PNG/WebP) | ❌ | ❌ | ✅ (透明图像支持) |
| **System One (仅决策)** | ❌ | ❌ | ❌ | ✅ (实验性) | ❌ | ❌ |

> 🏆 **胜者**：**vLLM** 在闪速模型与多模态架构的前沿支持上领先，尤其在 GLM-5.3 与混合模型方面表现突出。**SGLang** 在 AMD ROCm 集成与实验性 GPU 后端方面表现出色。**Unsloth** 在视觉模型与微调互操作性方面独树一帜。

---

#### **4. 性能前沿**  

| 优化重点       | vLLM                              | SGLang                          | llama.cpp                     | Ollama                         | LiteLLM                        | Unsloth                      |
|--------------------------|-----------------------------------|----------------------------------|-------------------------------|--------------------------------|--------------------------------|------------------------------|
| **KV缓存与缓存**   | ✅ 可编程策略，支持卸载 | ✅ `strip-thinking-cache` 问题   | ❌                             | ✅ 基于显存的上下文扩展  | ❌                             | ✅ 预填充进度监控  |
| **批处理与吞吐**| ✅ MTP3, FlashKDA, MoE调度   | ✅ 预测解码复用    | ❌ (Vulkan 在 n=9 处悬崖式下降)      | ✅ 自适应令牌预算    | ✅ OTel span 过滤         | ❌                           |
| **量化**         | ✅ 按令牌的 NVFP4 MoE, W4A16 回退 | ✅ TP4 all-reduce + gfx950 上的 FP8 | ✅ Q1/Q2 Bonsai, Hexagon GELU_ERF | ✅ MLX nvfp4 (卡顿)           | ✅ 音频提供方检测    | ✅ 打包 INT4 (崩溃)    |
| **分布式服务**  | ✅ 高并发预测解码    | ❌                              | ❌                             | ❌                             | ✅ 企业身份联邦    | ❌                           |
| **内核级优化**         | ✅ CUDA 图，FlashInfer 自动调优 | ✅ FlyDSL，融合 gfx950 内核  | ✅ Vulkan RDNA3/Intel 调优  | ❌                             | ✅ 认证流水线批处理      | ✅ Marlin_gemm 修复（进行中） |

> 🔥 **热点**：  
> - **vLLM** 与 **SGLang** 正聚焦于 **预测解码**、**MoE 调度** 与 **混合模型执行**。  
> - **llama.cpp** 关注 **Vulkan 稳定性** 与 **CPU 效率**（AVX512-FP16）。  
> - **Unsloth** 正推动 **微调→部署管道**，配备实时监控与导出工具。

---

#### **5. 层级定位**  

| 项目       | 主要层级                     | 核心差异点 |
|---------------|------------------------------------|--------------------|
| **vLLM**      | **服务引擎（GPU优化）** | 最高吞吐，深入CUDA内核控制，可编程缓存策略 |
| **SGLang**    | **服务引擎（混合/灵活）** | 强调AMD/ROCm，AITER内核集成，模拟器鲁棒性 |
| **llama.cpp** | **本地运行时（跨平台）** | 类顶级的 CPU/Vulkan/GPU 可移植性；适用于边缘、移动端或离线环境 |
| **Ollama**    | **网关 + 开发者体验**         | 代理优先设计，网络搜索，CLI模型管理，RAG集成 |
| **LiteLLM**   | **企业网关 / 编排** | 多提供方路由，成本追踪，安全加固，Entra/ID联邦 |
| **Unsloth**   | **微调与模型导出**     | 无缝LoRA训练，兼容GGUF/vLLM/Ollama，模板正确性 |

> 🧩 **战略洞察**：整个技术栈明显呈现两极分化：
> - **前端**：Ollama + LiteLLM（代理友好、安全、可扩展）
> - **中间层**：vLLM + SGLang（高性能推理）
> - **边缘与训练**：llama.cpp + Unsloth（可移植性、微调）

---

#### **6. 趋势信号**  

1. **以代理为中心的工程已成为标准**  
   → 所有主要项目均优先支持工具调用（`tool_choice`, `strict=True`）、推理过程追踪（`reasoning_effort`）及网络搜索（Ollama的10次搜索上限）。开发者必须严格验证代理逻辑——静默失败（如 Qwen3 工具调用泄露）极为常见。

2. **硬件专业化正在加速**  
   → AMD ROCm（gfx950）与 Intel XPU 已非小众。**SGLang** 与 **Unsloth** 等项目正积极支持。尽管 NVIDIA 仍占主导，但 H20/B200 的不稳定性预示着高并发场景下的风险。

3. **量化技术已超越基础层面**  
   → 按令牌的 NVFP4、DP8/TP4 与打包 INT4 已成为核心关注点。因内核处理不当导致的崩溃（如 Unsloth 的 `marlin_gemm`）表明，量化不仅是体积问题，更是负载下的正确性挑战。

4. **可观测性与安全性不可妥协**  
   → LiteLLM 的签名 Docker 镜像、vLLM 的 `/weight_checker`、Ollama 的 `x-litellm-call-id` 均凸显向可审计性转变的趋势。成本追踪、会话令牌与并发限制已成为首要关切。

5. **微调 ↔ 部署流程至关重要**  
   → Unsloth 的 Modelfile 生成与模板修复反映了对无缝导出日益增长的需求。构建代理的团队必须规划端到端可复现性——从训练到 Ollama/LLM 服务。

> ✅ **给开发者的建议**：  
> - 选择推理栈时，**优先考虑稳定性而非新颖性**。  
> - 用于规模化部署时选 **vLLM/SGLang**，边缘场景选 **llama.cpp**，代理网关选 **Ollama/LiteLLM**。  
> - 必须在类生产负载下测试 **工具调用、长上下文、量化模型**。  
> - 持续监控 **PR 与问题**——尤其是标有“High”或“Critical”的——再部署。

---  
*报告生成时间：2026-09-30 | 数据来源：GitHub项目摘要*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-09-30**

---

#### **1. 今日亮点**  
vLLM 项目持续推进对多模态与混合架构的支持，重点推进 **ViT CUDA 图优化**、**GLM-5.3 Flash 性能调优** 以及 **高并发场景下的推测解码稳定性**。关键 PR 包括修复 Qwen3.6 中的 `tool_call` 泄漏问题、提升带 LoRA 的前缀缓存鲁棒性，以及增强对强化学习权重更新的可观测性。一项关于 **可编程 KV 缓存策略** 的重大 RFC 标志着向模块化、面向代理的推理基础设施转型。

---

#### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
未发布新版本或破坏性 API/配置变更。最新稳定版本仍为 `v0.30.0`，但多个问题（如 #59115）表明，尽管已发布该版本，长上下文场景下仍存在持续不稳定性。

---

#### **3. 新模型与硬件支持**  
- **模型支持**：  
  - **GLM-5.3-Flash**（FP8, MXFP4, DP8/TP4）：正在进行积极优化（#57406, #54059），包括修复自动调优期间的非法内存访问问题（#58864）。  
  - **Kimi K2.5 / Kimi K3**：针对可编程 KV 缓存（#57103）和 `/v1/messages` 端点加固（#58647）的 RFC，以支持类似 Claude Code 风格的代理。  
  - **DeepSeek-V4.1-Flash**：问题 #56389 报告，在高并发下 `max_num_seqs > 256` 时，H20 GPU 上出现非法内存访问。  
  - **Whisper**：持续跟踪问题 #25750，用于多语言及流式支持。

- **硬件与后端**：  
  - **ROCm / AMD**：针对 Qwen3.8-2.4T-A95B 在 `gfx950` / MI355X 上的性能优化追踪（#57149）。  
  - **Intel XPU**：报告持久内存膨胀问题（#50269）——模型加载无法减少主机内存占用。  
  - **NVIDIA B200 / GB300 / H200**：多个崩溃报告（#59115, #58864）涉及 FlashInfer 自动调优与 MoE 路由内核。

- **量化**：  
  - NVFP4：通过 CuTe-DSL 后端新增每标记符级 MoE 支持（#50030）。  
  - W4A16：当在线每标记符级 NVFP4 不可用时，仍作为非门控模型的回退方案。

---

#### **4. 性能与优化**  
- **内核级别**：  
  - **FlashKDA + 混合 PCP**：PR #59304 为 GLM-5.3 的 KDA 层引入 KCP（两遍并行扫描），实现混合 Mamba/GDN 模型在预填充阶段的高效上下文并行。  
  - **MoE 分发布局**：PR #59337 在 DeepEP v2 中实现每前向过程动态选择分发布局，避免在 CUDA 图中产生次优分配。

- **内存与缓存**：  
  - **KV 卸载**：PR #59329 通过丢弃超时块来提升 P2P 卸载可靠性，防止资源泄漏。  
  - **前缀缓存**：PRs #51899 与 #59335 通过打标签额外键并将 LoRA 路径纳入块哈希，解决哈希冲突问题——这对多适配器环境的正确性至关重要。

- **吞吐量**：  
  - **推测解码**：正在修复多任务处理（MTP）下 `prompt_logprobs` 的无声数据损坏问题（#53488），该问题影响成本敏感推理流水线的准确性。

---

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复 PR？ |
|---------|-------|-------------|--------|
| 🔴 高 | [#59115](https://github.com/vllm-project/vllm/issues/59115) | GLM-5.3-Flash 在长上下文分块预填充过程中（4x B200，启用 MTP）因 CUDA 非法内存访问导致崩溃 | ❌ 尚无修复 |
| 🔴 高 | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash 在累积推理解码后出现长期解码退化（W4A16 量化） | ❌ 尚无修复 |
| 🟡 中 | [#56389](https://github.com/vllm-project/vllm/issues/56389) | DeepSeek-V4.1-Flash 在高并发下（`max_num_seqs > 256`）于 H20 上触发非法内存访问 | ✅ 通过降低 `max_num_seqs` 临时缓解 |
| 🟡 中 | [#58864](https://github.com/vllm-project/vllm/issues/58864) | GLM-5.3-MXFP4 DP8 无 EP 时，在 FlashInfer 自动调优过程中崩溃 | ❌ 尚无修复 |
| 🟡 中 | [#54808](https://github.com/vllm-project/vllm/issues/54808) | Qwen3_coder 解析器忽略 `tool_choice="required"`；无声失败 | ❌ 尚无修复 |

---

#### **6. 对应用开发者的启示**  
- **代理与工具调用**：在 Qwen3.6/Qwen3.5 及 Kimi K2.5 上使用 `tool_choice="required"` 时需谨慎——当前行为可能静默忽略要求。建议暂时使用 `strict=True` 作为绕过方案，直至修复上线。  
- **混合模型**：前缀缓存 + MTP3 存在已知缺陷（如 #47194 中的 tool-call 泄漏）；在确认稳定前，请避免组合使用这些功能。  
- **高并发部署**：在 H20 GPU 上使用 DeepSeek-V4.1-Flash 时，将 `max_num_seqs` 降低至 256 以下以防止崩溃。  
- **LoRA 与多模态服务**：请确保使用最新 vLLM 版本——近期 PR（#51899, #59335）修复了可能导致错误缓存命中关键哈希冲突问题。  
- **可观测性**：利用新指标端点如 `/weight_checker`（#51350）和增强的 `finish_reason` 报告（#59324），以调试代理逻辑与响应保真度。  

> 🔗 **推荐阅读**：  
> - [RFC: 可编程 KV 缓存](https://github.com/vllm-project/vllm/issues/57103)  
> - [PR: 修复 Qwen3.6 中 tool_call 泄漏](https://github.com/vllm-project/vllm/pull/51899)  
> - [Issue: GLM-5.3 Flash 在 B200 上的稳定性](https://github.com/vllm-project/vllm/issues/59115)

---  
*生成时间：2026-09-30 | 来源：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-09-30**

---

### **1. 今日重点**  
SGLang 生态系统持续成熟，已积极集成 AITER 的先进内核，尤其在 AMD ROCm 及混合 Mamba/GDN 模型方面进展显著。针对影响 logprob 偏移（GLM-5.3-Flash-NVFP4）、`--strip-thinking-cache` 下 KV 缓存损坏，以及工作进程中 SIGQUIT 崩溃等高严重性问题的稳定修复正在推进。与此同时，新提交的 PR 加速了对 gfx950 平台 Qwen3-Next 的支持，并引入可配置的视频编码预设。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布或破坏性变更。*

---

### **3. 新模型与硬件支持**  
- ✅ **AMD ROCm (gfx950/gfx942)**：  
  - [PR #39595](https://github.com/sgl-project/sglang/pull/39595)：为 AMD 添加 FlyDSL GDN 预填充后端 —— 对 Mi300 上 Qwen3.5-397B 性能至关重要。  
  - [PR #39554](https://github.com/sgl-project/sglang/pull/39554)：将 GDN 解码路由至 AITER 的融合 gfx950 内核（待上游合并）。  
  - [PR #41475](https://github.com/sgl-project/sglang/pull/41475)：为 MI30x 上的 GLM-5.3-Flash 添加夜间 GSM8K 准确率门控。  
- ✅ **摩尔线程 (MUSA)**：  
  - [Issue #16565](https://github.com/sgl-project/sglang/issues/16565) 仍处于开放状态，作为首阶段原生 MUSA GPU 支持的路线图项目。  
- ✅ **量化**：  
  - [PR #39140](https://github.com/sgl-project/sglang/pull/39140)：在 gfx950 上融合 TP4 全归约 + Gemma RMSNorm + 分组 FP8 量化。  
  - [PR #41794](https://github.com/sgl-project/sglang/pull/41794)：优化了 Quark MXFP4 在 ROCm 上解码的权重布局。  

---

### **4. 性能与优化**  
- **混合 Mamba/GDN 模型**：  
  - [PR #41654](https://github.com/sgl-project/sglang/pull/41654)：修复在混合模型中使用 `--max-total-tokens` 时模拟器崩溃的问题（对长上下文工作负载至关重要）。  
- **推测解码**：  
  - [PR #38213](https://github.com/sgl-project/sglang/pull/38213)：通过复用元数据减少推测解码期间重复的注意力设置 —— 提升 GLM-5.3-Flash 吞吐量。  
- **内存与内核效率**：  
  - [PR #38431](https://github.com/sgl-project/sglang/pull/38431)：重用主机长度以避免 KDA 预填充同步 —— 降低 CPU-GPU 同步开销。  
  - [PR #33805](https://github.com/sgl-project/sglang/pull/33805)：防止在 DFLASH/DSPARK 解码期间，混合-SWA 模型单请求生成过早终止。  
- **视频生成**：  
  - [PR #41797](https://github.com/sgl-project/sglang/pull/41797)：通过请求配置启用 libx264 预设选择（如 "ultrafast"）—— 对低延迟视频流水线至关重要。  

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|------|----------|
| 🔴 高 | [#41609](https://github.com/sgl-project/sglang/issues/41609) | `GLM-5.3-Flash-NVFP4` 在 `2026-09-18` 之后出现比特级完全相同的 logprob 偏移 —— 可能由 KDA 融合门（`#39688`）引起 | 开放 —— 多个夜间测试确认回归 |
| 🔴 高 | [#41617](https://github.com/sgl-project/sglang/issues/41617) | 使用 `--strip-thinking-cache` + 回退时，`release_kv_cache` 出现双重释放 | 开放 —— 存在内存安全风险 |
| 🔴 高 | [#41539](https://github.com/sgl-project/sglang/issues/41539) | 启动期间启动器死亡时，工作进程向 PID 1 发送 SIGQUIT —— 导致进程树失败 | 开放 —— 对生产环境可靠性至关重要 |
| 🟡 中 | [#41494](https://github.com/sgl-project/sglang/issues/41494) | DSA k-pool 索引器在 GLM-5.3-Flash 长上下文 NIAH 针对数字（16K）中造成损坏 | 开放 —— 稀疏注意力中的正确性问题 |
| 🟡 中 | [#39054](https://github.com/sgl-project/sglang/issues/39054) | `is_musa()` 使追踪预填充路径上的 TorchDynamo 图断裂 —— 导致 CUDA 图捕获失效 | 开放 —— 影响编译路径性能 |

---

### **6. 对应用开发者的影响**  
- **谨慎使用 `--strip-thinking-cache` 和回退功能**：这些特性可能引发双重释放崩溃，直至修复前请勿在生产环境中使用。  
- **预期在 AMD 平台上获得更好的性能**，适用于 Qwen3-Next 与 GLM-5.3-Flash —— 但请通过夜间门控验证准确性（`nightly-amd-accuracy-8-gpu-glm53-flash`）。  
- **利用新的 `libx264` 预设控制**（[PR #41797](https://github.com/sgl-project/sglang/pull/41797)）调整视频输出质量与速度。  
- **升级至 `v0.5.20` 以上版本时，注意 logprob 回归问题**，尤其是 `GLM-5.3-Flash-NVFP4`。  
- **对于混合 Mamba/GDN 模型**，确保未触发模拟模式下的 `--max-total-tokens` 崩溃；在修复上线前，请使用较小上下文进行测试。  

> ✅ *实用提示*：使用 `/get_server_info` 监控有效并发上限 —— [PR #38846](https://github.com/sgl-project/sglang/pull/38846) 将在应用 Mamba 状态缓存限制后暴露真实上限。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-30**

---

### **1. 今日亮点**  
最新开发周期聚焦于 AMD RDNA3 与 Intel GPU 的 Vulkan 后端稳定性及性能调优，修复了 MoE 分发逻辑与内存访问模式中的关键问题。对 Hexagon 平台新增支持 FP32 GELU_ERF/GEGLU_ERF，以及强化的 CI 流水线用于模型后端验证，标志着跨平台推理能力持续成熟。

---

### **2. 发布与破坏性变更**  
今日未发布新版本。但以下变更影响构建行为：  
- **CI 流水线更新**：新增 `zdnn` 后端构建（未经测试），并在 CI 工作流中切换至 `bash` shell ([#29541](https://github.com/ggml-org/llama.cpp/pull/29541))。  
- **API 稳定性修复**：`ggml` 现在强制要求输入张量必须为 `GGML_OP_NONE`，以防止未定义行为 ([#29647](https://github.com/ggml-org/llama.cpp/pull/29647))。  
- **C++ ODR 兼容性修复**：通过正确使用 `GGML_COMMON_DECL_CPP` 解决 C++ One Definition Rule 违规问题 ([#29504](https://github.com/ggml-org/llama.cpp/pull/29504))。

> 🔗 *注：这些变更非破坏性，但建议下游工具链集成时采纳。*

---

### **3. 新增模型与硬件支持**  
- **Hexagon 后端**：完整支持 `GELU_ERF` 与 `GEGLU_ERF` 内核的 FP32 运算，可在高通骁龙 7 Gen 4 及更新 SoC 上准确执行 ([#29631](https://github.com/ggml-org/llama.cpp/pull/29631))。  
- **Vulkan 后端**：为 Adreno 750 引入可选兼容性保护机制，避免着色器编译器段错误 ([#29165](https://github.com/ggml-org/llama.cpp/pull/29165))。  
- **模型架构**：新增对 `GraniteSpeech5ForCTC`（Turbo CTC）的支持，该模型为仅编码器、非自回归结构，适用于语音转文本任务 ([#29446](https://github.com/ggml-org/llama.cpp/pull/29446))。  
- **量化支持**：为 Bonsai 8B 初步添加 Q1/Q2 量化支持，并修复形状正确性问题 ([#29185](https://github.com/ggml-org/llama.cpp/pull/29185))。

---

### **4. 性能与优化**  
- **Vulkan（Intel）**：优化 GDN 内核并调整 F32 A 矩阵加载方式，通过避免低效的逐元素加载，提升 Intel 集成显卡的吞吐量 ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476))。  
- **Vulkan（AMD RDNA3）**：仅在列数为 8 时保留 4 行 MMVQ 工作组策略；对于 5–7 列情况回退至默认行数，以规避驱动不稳定问题 ([#29679](https://github.com/ggml-org/llama.cpp/pull/29679))。  
- **MoE 分发逻辑**：改进 `mut_mul_id` 中的块选择逻辑，正确处理每专家行数差异（如 Sarvam 30B 中的 6 与 128），防止次优 l-块使用 ([#29182](https://github.com/ggml-org/llama.cpp/pull/29182))。  
- **CPU（AVX512-FP16）**：将 f16 点积累积在 f32 中，提升精度，并可能在混合精度场景下提高有效吞吐量 ([#29545](https://github.com/ggml-org/llama.cpp/pull/29545))。

---

### **5. 稳定性与回归问题**  
今日报告的关键稳定性问题包括：  
- **Vulkan 批量解码悬崖效应**：在 `n_tokens=9` 时出现显著吞吐下降，源于 MoE 分发中阈值处理错误——影响多专家模型如 Qwen3-Coder-Next 30B-A3B ([#25356](https://github.com/ggml-org/llama.cpp/issues/25356)，**10 条评论**)。  
- **Qwen3.8 DFlash/MTP 越界令牌崩溃**：无效令牌 ID（`248320`）等于词表大小——疑似在 Vulkan 上推测解码缓冲区溢出所致 ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158)，**9 条评论**)。  
- **长时间运行性能退化**：A770 Vulkan 后端在连续解码约 7–8 小时后产生空 EOS 响应——疑似同步原语或状态损坏问题 ([#29526](https://github.com/ggml-org/llama.cpp/issues/29526)，**5 条评论**)。  
- **Hexagon HMX MUL_MAT 无穷大缺陷**：在骁龙 7 Gen 4 上当 `n >= 5` 时返回无穷大——阻碍模型评估 ([#29473](https://github.com/ggml-org/llama.cpp/issues/29473)，**6 条评论**)。

> ✅ **待修复的 PR**：上述回归问题目前尚未有公开修复的 PR。建议优先使用 `b11260+` 构建版本进行测试。

---

### **6. 对应用开发者的启示**  
- **谨慎使用 `--cache-ram -1`**：该选项不会禁用限制——每条短提示导致内存增长约 640 MiB；建议设置明确上限 ([#29324](https://github.com/ggml-org/llama.cpp/issues/29324))。  
- **避免在 Vulkan（A770/Intel）上长期运行服务**：监控 7–8 小时后是否出现空 EOS 输出；建议实施重启策略。  
- **启用 Metal/MoE 融合优化**：在苹果硅设备上，请确保使用 `b11267+` 版本，以获得融合的 MoE 路由与 SSM_CONV 路径加速 ([#28948](https://github.com/ggml-org/llama.cpp/pull/28948))。  
- **验证推测解码配置**：针对 `Qwen3.8-Flash-Next` + MTP/DFlash 进行测试——已知 Vulkan 上存在越界崩溃，需精细参数调优。  
- **利用新 RERANK 接口**：对于多模态重排序（如 Qwen3-VL），可通过近期合并的 PR 使用 `--rerank` 并传入带类型的内容输入 ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625))。

> 📌 **实用提示**：在 Vulkan 上谨慎使用 `--no-kv-offload`——某些模型可能因此提前生成 EOS ([#24519](https://github.com/ggml-org/llama.cpp/issues/24519))。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-30**

---

### **1. 今日亮点**  
最新发布的候选版本 **v0.35.1-rc0** 引入了每条响应最多支持 **10 次网络搜索** 的功能，显著提升了智能体的能力。后端关键改进包括更新至 **llama.cpp (b11232)** 和 **MLX** 版本，并完成了对 **System One 模型** 支持的基础工作，以及增强了工具调用解析的鲁棒性。

---

### **2. 发布与破坏性变更**  
- **v0.35.1-rc0** 已发布，包含：  
  - ✅ 网络搜索上限从 1 次提升至每响应 **10 次** ([#18602](https://github.com/ollama/ollama/pull/18602))  
  - 🔧 `llama.cpp` 升级至 **b11232** ([#18652](https://github.com/ollama/ollama/pull/18652))  
  - 🔧 MLX 版本已更新 ([#18651](https://github.com/ollama/ollama/pull/18651))  
- ⚠️ **v0.35.0 标记为预发布版本，未使用 `-rc` 后缀** — 问题 [#18706](https://github.com/ollama/ollama/issues/18706) 中提出；可能引起用户混淆。

---

### **3. 新模型与硬件支持**  
- 🎯 **System One 模型**：通过 `mlx` 后端（[#18701](https://github.com/ollama/ollama/pull/18701)）和 CLI（`create` 命令）通过能力声明（capability declarations）添加实验性支持（[#18708](https://github.com/ollama/ollama/pull/18708)）。支持仅作决策类模型，如 Kev 与 Laya（[#18594](https://github.com/ollama/ollama/issues/18594)）。  
- 📦 **GraniteForCausalLM**：在 MLX 后端中新增对 IBM Granite 4.1/4.2 系列的实验性支持（[#17972](https://github.com/ollama/ollama/pull/17972)）。  
- 📁 **dir2mcp**：已集成至社区工具中的 RAG 与知识库模块（[#18705](https://github.com/ollama/ollama/pull/18705))。

---

### **4. 性能与优化**  
- 📈 **基于显存的上下文长度**：默认上下文窗口现在根据可用显存动态扩展（4k/32k/256k），在高内存系统上提升效率（[#18710](https://github.com/ollama/ollama/pull/18710)）。  
- ⚙️ **自适应令牌预算机制**：提议对每个请求/模型的思考阶段进行限制，防止无限循环（[#17566](https://github.com/ollama/ollama/pull/17566)）。  
- 🔄 **模型重载逻辑修复**：解决两个模型标签共享一个 blob 但需要不同 runner 标志的情况（[#18289](https://github.com/ollama/ollama/pull/18289)）。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 链接 |
|--------|------|-------------|------|
| 严重 | **云端计费循环** | 用户被 Stripe 重试循环阻塞；无法降级或取消订阅 | [#18683](https://github.com/ollama/ollama/issues/18683) |
| 高 | **MLX nvfp4 在负载下卡死** | 请求在 `processed=total-1` 后无限挂起，仅可通过 SIGTERM 恢复 | [#18505](https://github.com/ollama/ollama/issues/18505) |
| 高 | **Windows 任务栏应用无法启动服务** | 任务栏图标出现但服务未启动；手动执行 `ollama serve` 可解决 | [#18507](https://github.com/ollama/ollama/issues/18507) |
| 高 | **llama-server 在缓存命中任务中卡死** | 同一模型后续所有请求均挂起，直至卸载模型 | [#18685](https://github.com/ollama/ollama/issues/18685) |
| 中 | **macOS 上聊天历史栏无法调整大小** | 桌面应用界面问题导致侧边栏无法缩放 | [#18709](https://github.com/ollama/ollama/issues/18709) |

> ✅ *部分问题已有修复合并请求*：  
> - 工具调用解析器修复：[#18624](https://github.com/ollama/ollama/pull/18624)，[#17565](https://github.com/ollama/ollama/pull/17565)，[#17564](https://github.com/ollama/ollama/pull/17564)  
> - 思考标签处理修复：[#18288](https://github.com/ollama/ollama/pull/18288)

---

### **6. 对应用开发者的意义**  
- ✅ **智能体现在每轮可执行最多 10 次网络搜索** —— 非常适合使用 `qwen3coder` 等工具的科研密集型工作流。  
- 🔒 **System One 模型进入早期支持阶段**：在 Modelfile 中使用 `CAPABILITY="decision"` 可高效路由是/否或评分类查询。请预期在 RC 阶段可能出现破坏性变更。  
- 🛠 **工具调用可靠性持续提升**：针对解析边缘情况（如缺失大括号、提前关闭标签）的修复减少了智能体中的误报错误。  
- ⚠️ **避免在长时间代码任务中使用 `glm-5.3:cloud`** —— 已知会陷入无限推理循环（[#18193](https://github.com/ollama/ollama/issues/18193)）。  
- 💾 **现可通过 CLI 导出/导入模型**（[#18578](https://github.com/ollama/ollama/pull/18578)）—— 对离线或气隙部署至关重要。  

> 📌 **行动项**：使用 `v0.35.1-rc0` 测试您的智能体，并在持续负载下监控 `mlx` 或 `cuda` 后端是否出现挂起。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 摘要 — 2026-09-30**

---

#### **1. 今日亮点**  
LiteLLM 持续快速迭代，重点聚焦于安全加固、流式传输与成本追踪的稳定性，以及与企业身份系统更深度的集成。主要进展包括改进会话令牌处理机制，修复影响 OpenAI gpt-5.6 系列模型的 `reasoning_effort` 与 `tool_call` 关键缺陷，并在 Azure 与 Responses API 上增强防护策略扫描能力。代理现已对格式错误请求返回正确的 400 错误码——显著提升客户端错误可见性。

---

#### **2. 发布与破坏性变更**  
- **v1.104.0-rc.2**、**v1.103.1**、**v1.102.2**、**v1.101.3**、**v1.100.4**：所有版本均通过使用 [cosign](https://docs.sigstore.dev/cosign/overview/) 对 Docker 镜像进行签名的方式强化了安全性（密钥来自提交 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)）。  
- **新 PR**：  
  - [#43790](https://github.com/BerriAI/litellm/pull/43790)：修复 UI/CLI 会话令牌问题，避免 `sk-` 前缀冲突及 Basic Auth/WebSocket 问题，采用 AES-GCM 加密并结合头安全编码。  
  - [#43787](https://github.com/BerriAI/litellm/pull/43787)：对缺失参数或无效分页（如 `page=0`）的情况返回 `400 Bad Request` 而非 `500 Internal Server Error`，改善客户端诊断能力。

---

#### **3. 新模型与硬件支持**  
- **Anthropic 工作负载身份联合**：功能请求 [#28607](https://github.com/BerriAI/litellm/issues/28607) 正在跟踪支持通过 Anthropic 工作负载身份联合实现 OIDC JWT 承载令牌交换的功能——这对云原生环境中安全、联邦化的访问至关重要。  
- **Bedrock Converse 路由**：PR [#43778](https://github.com/BerriAI/litellm/pull/43778) 添加了输出配置的 beta 头部字段，使用户能更好地控制 Bedrock Converse API 的行为。  
- **音频服务提供商**：PR [#43784](https://github.com/BerriAI/litellm/pull/43784) 通过从 `supported_endpoints` 推导支持的端点，优化音频服务提供商检测逻辑，防止意外路由至不支持音频的提供方。

---

#### **4. 性能与优化**  
- **认证流程优化**：PR [#43776](https://github.com/BerriAI/litellm/pull/43776) 通过管道批量处理 Redis 调用，将每次密钥刷新的延迟从 16 次串行调用减少为一次原子操作，显著降低开销。  
- **OTel Span 过滤**：PR [#43278](https://github.com/BerriAI/litellm/pull/43278) 引入 `excluded_services` 选项，可排除数据存储相关 span（Redis/Postgres），减少租户级可观测性中的遥测噪音与数据摄入成本。  
- **批量明细项存储**：PR [#41691](https://github.com/BerriAI/litellm/pull/41691) 支持在回调中可选地存储每个 JSONL 批量行项目，即使提供方文件过期后仍可保留细粒度成本数据。

---

#### **5. 稳定性与回归问题**  
- **严重缺陷**：[#33221](https://github.com/BerriAI/litellm/issues/33221) – OpenAI gpt-5.6 系列模型（如 `gpt-5.6-sol`、`gpt-5.6-luna` 等）在使用函数工具时因推理努力值处理错误而失败。*修复待发布。*  
- **流式传输崩溃**：[#43487](https://github.com/BerriAI/litellm/issues/43487) – 缺少必需字段（`text`、`is_finished`）的部分通用流式块触发 `KeyError`。*修复 PR：#43783*（进行中）。  
- **成本追踪失效**：[#40728](https://github.com/BerriAI/litellm/issues/40728) – Azure AI 模型路由器虽配置正确但缺少成本追踪功能。*暂无修复方案。*  
- **并发下的缓存损坏**：[#43491](https://github.com/BerriAI/litellm/issues/43491) – 用户/团队支出缓存无法正确处理并发递增，导致用量统计偏低。*修复 PR：#43783*（进行中）。  
- **静默文档块丢失**：[#43737](https://github.com/BerriAI/litellm/issues/43737) – Anthropic 的 `document` 内容块在路由至 AWS Bedrock Converse 时被丢弃。*高危，暂无修复。*

---

#### **6. 对应用开发者的影响**  
- **安全与合规**：严格执行访问策略——空的 `models` 列表意味着完全开放访问，而空的 `mcp_servers` 列表则表示无任何权限。请立即审计你的虚拟密钥（[#21540](https://github.com/BerriAI/litellm/issues/21540)）。  
- **流式可靠性**：在 [#33221](https://github.com/BerriAI/litellm/issues/33221) 修复前，请避免使用带有函数工具的 `gpt-5.6` 模型。可临时使用 `reasoning_effort=baseline` 作为规避方案。  
- **成本可见性**：若需在流中实时获取成本反馈，请确保启用了 `include_cost_in_streaming_usage`（[#31840](https://github.com/BerriAI/litellm/issues/31840)）。  
- **企业集成**：利用新增的 Entra 身份支持（[#43722](https://github.com/BerriAI/litellm/pull/43722)）和托管代理权限管理（[#43721](https://github.com/BerriAI/litellm/pull/43721)），构建安全、可审计的代理工作流。  
- **可观测性**：升级至 v1.104+ 可享受更优错误码、更少遥测噪音，以及通过 `x-litellm-call-id` 实现的更好日志关联性（[#42436](https://github.com/BerriAI/litellm/pull/42436)）。

> 🔗 完整上下文：[GitHub 仓库](https://github.com/BerriAI/litellm) | [问题追踪器](https://github.com/BerriAI/litellm/issues) | [PR 列表](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-09-30**

---

### **1. 今日亮点**  
Unsloth 生态系统持续拓展其愿景与推理能力，关键优化了用户界面与体验，并在模型服务及微调工作流方面实现了基础性改进。主要进展包括对 GGUF 视觉模型的增强支持（PR #12310）、预填充进度监控问题修复（PR #11161），以及针对 vLLM 0.29 上压缩 INT4 推理稳定性的持续优化（PR #12320）。多项 PR 针对多 GPU 协调、内存管理及模型兼容性等长期用户痛点展开修复。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但已有数项高影响力变更待合并：
- **PR #12314**：修复 Llama 3.1、Qwen 与 Gemma 的 ShareGPT 模板映射错误 —— 此问题影响推理与微调过程中的对话格式。
  - 🔗 [GitHub PR #12314](https://github.com/unslothai/unsloth/pull/12314)
- **PR #12311**：为训练完成的模型添加 Ollama Modelfile 生成功能 —— 对 `ollama create` 兼容性至关重要。
  - 🔗 [GitHub PR #12311](https://github.com/unslothai/unsloth/pull/12311)

> ⚠️ **迁移提示**：从 `v0.1.806-beta` 或更早版本升级的用户，应在合并后验证其对话模板与微调模型导出结果。

---

### **3. 新模型与硬件支持**  
- ✅ **GGUF 视觉模型**：通过 PR #12310 改进对透明图像（如 PNG/WebP/GIF）的处理，确保在透明背景上文字仍清晰可见。
  - 🔗 [GitHub PR #12310](https://github.com/unslothai/unsloth/pull/12310)
- 🔄 **多 GPU 与异构厂商支持**：持续推动 AMD/NVIDIA 共存：
  - PR #12248 实现推理使用 NVIDIA 与训练使用 AMD 的并行运行。
  - PR #12247 与 #12246 修复切换 CUDA 与 ROCm 时后端报告误导的问题。
  - 🔗 [GitHub PR #12248](https://github.com/unslothai/unsloth/pull/12248) | [PR #12247](https://github.com/unslothai/unsloth/pull/12247) | [PR #12246](https://github.com/unslothai/unsloth/pull/12246)
- 📦 **自定义 mmproj 支持**：PR #10296 解除了对自定义 `mmproj` 文件的限制，允许社区微调项目复用兼容的视觉塔结构。
  - 🔗 [GitHub PR #10296](https://github.com/unslothai/unsloth/pull/10296)

---

### **4. 性能与优化**  
- 🔧 **vLLM 0.29 上的压缩 INT4 推理**：正在推进的 PR #12320 致力于修复因压缩张量检查点中 `marlin_gemm` 调用构造不当导致的崩溃问题。
  - 🔗 [GitHub PR #12320](https://github.com/unslothai/unsloth/pull/12320)
- 📈 **预填充进度可见性**：PR #11161 通过 API 监控暴露实时预填充计数器，使客户端可追踪长提示处理过程（尤其适用于上下文长度超 64k 的模型如 Qwen3.8）。
  - 🔗 [GitHub PR #11161](https://github.com/unslothai/unsloth/pull/11161)
- 💡 **LoRA 训练稳定性**：PR #12319 确保在 LoRA 训练期间冻结的 BatchNorm 运行统计量得以保留，防止下游性能漂移。
  - 🔗 [GitHub PR #12319](https://github.com/unslothai/unsloth/pull/12319)
- ⚙️ **FP8 与块大小处理**：PR #12317 确保修补后的 FP8 前向传播中正确尊重 `block_size`，对 32x32 块检查点至关重要。
  - 🔗 [GitHub PR #12317](https://github.com/unslothai/unsloth/pull/12317)

---

### **5. 稳定性与回归问题**  
今日报告最严重的几项问题反映出内存管理与边缘情况鲁棒性方面的持续挑战：

| 严重程度 | 问题 | 描述 | 状态 |
|--------|------|------------|--------|
| 高 | #11792 | 在 M5 Max（48GB 内存）上无法运行 Qwen Image 2.1 Q4_K_M，提示“内存不足” | 开放 |
| 高 | #4073 | 在 LFM2.5 上启用 `fast_inference=True` 时，`FastLanguageModel.from_pretrained()` 在状态字典提取阶段崩溃 | 开放 |
| 中 | #11435 | Gemma 4 26B A4B QAT 在 16GB 系统上占用 >15GB 内存，尽管文件大小仅约 14GB | 开放 |
| 中 | #11637 | Studio 显示重复下载：同一模型显示 4.2GB + 19GB “所需资源” | 开放 |
| 低 | #12260 | 更新后构建 Gradle 项目时出现 `Error loading java.security file` | 开放 |

> ✅ **修复进行中**：  
> - PR #12294 修复 Java sandbox 初始化失败问题（#12260）。  
> - PR #12320 针对压缩 INT4 推理核心崩溃问题（#4073）。

---

### **6. 对应用开发者的启示**  
- **构建可靠智能体**：使用 PR #12311 为训练好的模型生成 Ollama 兼容的 Modelfile —— 若通过 `ollama` 部署，此操作至关重要。
- **优雅处理长上下文**：利用 PR #11161 的预填充监控功能，在客户端应用中（如网页仪表盘）提供提示处理过程的实时反馈。
- **规避内存陷阱**：在低内存设备（如 M5 Max、16GB 机器）上使用 Q4_K_M 与 A4B 量化模型时需谨慎。通过 `top` 或 `nvidia-smi` 监控实际内存使用。
- **设计多 GPU 工作流**：若目标为混合 GPU 环境（NVIDIA + AMD），请使用最新构建版本以确保后端正确分配，避免无声降级。
- **提前统一模板规范**：在流程早期应用 PR #12314，防止 Llama 3.1/Qwen/Gemma 对话中角色头信息错位。

> 🛠️ **可操作建议**：对于生产级智能体，建议暂固定使用稳定版本，直至 PR #12320 与 #12314 合入正式发布版。关注 [Unsloth GitHub Issues](https://github.com/unslothai/unsloth/issues) 获取稳定性修复更新。

---  
*摘要生成时间：2026-09-30 | 来源：[unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*