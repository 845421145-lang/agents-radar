# AI 基础设施日报 2026-09-14

> 生成时间: 2026-09-14 08:46 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-14**

---

### **1. 生态概览**  
2026年中，AI基础设施格局呈现出明显的两极分化：一端是**高性能推理引擎**，另一端是**可投入生产的智能体平台**，而两者在多模型、多硬件及安全执行的边缘正逐步融合。vLLM、SGLang 和 llama.cpp 在内核级优化与低延迟服务方面处于领先地位；而 Ollama、LiteLLM 与 Unsloth 正日益成熟为集成式应用部署栈，尤其在智能体场景中表现突出。所有项目均暴露出关键稳定性问题，表明性能提升的同时，系统鲁棒性也正受到高度重视，尤其是在高并发、长上下文和分布式部署环境下。

---

### **2. 活跃度对比**

| 项目       | 开启问题（高/严重） | 最近24小时合并的PR | 最近24小时发布 | 关键稳定性风险 |
|---------------|-----------------------------|------------------------|---------------------|--------------------|
| **vLLM**      | 5 (2 高)                  | 8                      | 无                | 引擎启动挂起，异步TP批处理不变性问题 |
| **SGLang**    | 7 (3 严重/关键)       | 6                      | 无                | CUDA崩溃，HiCache不可恢复状态 |
| **llama.cpp** | 6 (3 高)                  | 7                      | 4 (b10952–b10946)   | Vulkan/SYCL后端回归问题 |
| **Ollama**    | 5 (2 严重)              | 5                      | 无                | 图像处理崩溃，提示缓存不稳定 |
| **LiteLLM**   | 4 (2 严重)              | 5                      | 无                | 日志污染，流式状态丢失 |
| **Unsloth**   | 6 (2 高)                  | 6                      | 无                | 沙箱逃逸，ARM64安装器失败 |

> 🔍 *注：尽管无新版本发布，**llama.cpp** 仍以4次热修复领跑补丁速度；**SGLang** 则表现出最高的严重性集中度。*

---

### **3. 模型支持竞赛**  
模型与架构支持的竞争已进入高度专业化阶段：

| 新增模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash** (SWA回放) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash** (ROCm, FlashKDA) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Qwen MoE 共享专家** (ROCm tiny-dot) | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Nemotron VL (LoRA)** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Gemma-3 (AMD/NPU)** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **HunyuanOCR (DFlash)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Bourse (OpenAI兼容)** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **XingChen4 (GGUF)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |

> 🏆 **胜者**：**SGLang** 凭借对 GLM-5.3-Flash（ROCm）和 Gemma-3（AMD/NPU）等前沿模型的广泛支持，略胜一筹，彰显其后端强适应能力。**vLLM** 在滑动窗口效率与混合GDN优化方面领先，这对长上下文智能体至关重要。

---

### **4. 性能前沿**  
优化工作集中在不同领域：

| 专注方向               | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存与推测解码** | 🔥 SWA有界回放，混合GDN修复 | ⚠️ DFlash降速，HiCache可靠性问题 | ❌ | ❌ | ❌ | ❌ |
| **内核级加速** | 🔥 FlashKDA，tiny-dot（ROCm） | 🔥 注意力融合，块指针迁移 | 🔥 cuBLAS，稀疏FA，Vulkan模块化 | ❌ | ❌ | 🔥 AOTriton ROCm注意力 |
| **批处理与内存效率** | 🔥 预填充分块，共享读完成 | 🔥 MQA每行逻辑值 | 🔥 `argsort` 内存边界 | ❌ | ❌ | ❌ |
| **分布式服务与横向扩展** | 🔥 `--enable-scale-out`，NIXL描述符调优 | 🔥 PD解耦，HiCache可扩展性 | ❌ | ❌ | ❌ | ❌ |
| **量化与卸载** | ❌ | ❌ | 🔥 稀疏FA，GGUF转换 | ❌ | ❌ | 🔥 VRAM泄漏修复待定 |

> 📌 **趋势**：**vLLM 与 SGLang** 在推测解码与分布式KV缓存扩展方面占据主导地位——这对智能体工作负载至关重要。**llama.cpp** 在跨平台内核优化（尤其是ROCm与Vulkan）方面表现卓越，而 **Unsloth** 则聚焦运行时效率与GPU专用内核启用。

---

### **5. 层级定位**  
各项目在AI技术栈中占据不同层级：

| 项目     | 主要层级                     | 角色概述 |
|-------------|-----------------------------------|--------------|
| **vLLM**    | **推理引擎**              | 低延迟、可扩展的张量引擎，具备高级推测解码与KV缓存优化能力。面向高性能计算与云规模部署。 |
| **SGLang**  | **智能体推理框架**   | 生产级智能体运行时，支持分布式KV缓存、MoE路由与推测解码——建立在优化后的后端之上。 |
| **llama.cpp** | **本地运行时 / 边缘推理** | 跨平台、支持CPU/GPU加速的推理框架，依赖极少。适用于嵌入式、移动端及本地智能体场景。 |
| **Ollama**  | **开发者导向的LLM网关**  | 本地模型管理与工具调用的统一CLI/工具链。连接本地推理与智能体工作流。 |
| **LiteLLM** | **LLM网关 / 代理层**     | 多提供方抽象层，支持成本核算、护栏机制与流式一致性。助力生产环境API网关建设。 |
| **Unsloth** | **微调 + 智能体运行时**   | 全栈训练/微调框架，支持沙箱化工具执行与新兴智能体生态功能。 |

> 💡 **洞察**：该生态已不再单一化——开发者需根据自身需求选择：若优先**性能（vLLM/SGLang）**，或**本地可移植性（llama.cpp）**，或**开发体验（Ollama）**，或**多租户代理（LiteLLM）**，或**端到端智能体流水线（Unsloth）**。

---

### **6. 趋势信号**  
当前活动揭示出若干关键行业趋势：

1. **推测解码已成生产核心需求**  
   - vLLM 与 SGLang 正全力稳定 DFlash 与混合 GDN 推测功能，但双方均报告严重回归。这表明**推测解码正从研发阶段转入核心基础设施**，亟需严格的测试与回滚策略。

2. **ROCm 不再是次要选项**  
   - 多个项目（vLLM、SGLang、llama.cpp、Unsloth）已将 ROCm 支持列为优先事项——涵盖完整注意力内核启用、MoE优化及新Docker镜像。**AMD GPU 现已适合作为主流推理负载的可行选择**。

3. **智能体可靠性 > 原生速度**  
   - 流式状态丢失、提示缓存损坏与沙箱逃逸成为首要关切。开发者必须将**智能体内存连续性与安全性**视为首要要求，而非事后补救。

4. **多模型、多硬件抽象正在成熟**  
   - 如 LiteLLM（Bourse 提供方）、SGLang（HiCache）、Unsloth（MCP枢纽）等项目正构建可扩展生态。未来在于**可插拔、可组合的推理层**，而非单体堆栈。

5. **安全与隔离不容妥协**  
   - 沙箱机制（Unsloth）、指针算术强化（vLLM）、护栏强制（LiteLLM）表明，**默认安全已成为生产级基础设施的标准配置**。

---

### ✅ **面向应用开发者的建议**
- **针对长上下文智能体**：使用 **vLLM v0.29+** 并开启 SWA 有界回放；避免在混合 GDN 模型上启用 DFlash 推测。
- **针对多GPU/云部署**：优先选用 **SGLang** 实现分布式 KV 缓存扩展，搭配 **LiteLLM** 实现成本感知路由。
- **针对边缘/本地推理**：选择 **llama.cpp**（ROCm/Vulkan）或 **Unsloth**（AMD/Intel ARC）。
- **针对快速原型开发**：**Ollama** 仍是首选——但请避免使用 `kimi-k3:cloud` 与 `gemma4` 的图像输入，直到修复上线。
- **始终固定版本**并监控破坏性变更（如 Unsloth 中的 `max_length`，`VLLM_USE_PRECOMPILED=1`）。

> 🔗 *通过问题追踪器与PR持续关注动态——尽管性能飞跃，稳定性仍是主要挑战。*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-14**

---

### **1. 今日亮点**  
vLLM 项目持续推进推测解码与多模态支持，关键 PR 实现了 DeepSeek-V4.1 的滑动窗口（SWA）有界重播功能，覆盖编码器与解码器两端——这对高效长上下文推理至关重要。针对 GLM-5.3-Flash 的 FlashKDA 加速新工作，以及在 MTP 规范解码下修复混合 GDN 前缀缓存命中问题，解决了高影响性能瓶颈。与此同时，稳定性仍是重点，正在积极处理引擎启动挂起及流式输入会话生命周期相关问题。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
未引入新版本或破坏性 API/配置变更。v0.29.0 发布周期保持稳定，尽管多个 PR（如 #55176）正在优化 CLI 标志和环境变量行为——开发者应关注 `--enable-scale-out` 与 `VLLM_ENABLE_SCALE_OUT_ENDPOINTS` 未来变更。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1-Flash**：通过 #56227（编码器侧 SWA 重播）与 #56752（解码器侧）实现完整支持，可在不存储冗余滑动窗口的前提下高效复用 KV 缓存。  
- ✅ **Nemotron VL（仅语言模型）**：通过 #56231 新增 LoRA 支持——可对语言组件进行微调，视觉/音频部分仍处于实验阶段。  
- ✅ **GLM-5.3-Flash**：通过 FlashKDA 后端（#55737）实现性能提升，相比 Triton 路径将 KDA 分块预填充延迟降低 **1.7–3.8×**。  
- ✅ **ROCm**：支持推测解码的 FLy 信息熵门控延迟验证（#53987），以及 Qwen MoE 共享专家的 tiny-dot 内核优化（#56789），显著提升 AMD GPU 效率。

---

### **4. 性能与优化**  
- 🔥 **GLM-5.3-Flash 的 FlashKDA**：以约 15 个内核的 FlashKDA 替代原有 Triton 路径，实现 KDA 分块预填充速度提升 **1.7–3.8×**（#55737）。  
- 🚀 **DeepSeek-V4.1 SWA 有界重播**：消除滑动窗口不必要的 KV 存储，提升长上下文场景下的内存效率并降低开销（#56227, #56752）。  
- ⚙️ **Qwen MoE 共享专家门控**：通过 HIPBLASLt 优化 tiny-dot 内核，在 ROCm 系统上降低解码延迟（#56789）。  
- 📈 **混合 GDN 前缀缓存修复**：恢复 Qwen3.5-122B-A10B 在 MTP 推测解码中的命中率（#52244）——对大规模减少冗余计算至关重要。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | PR/链接 |
|--------|------|--------|---------|
| 🔴 高 | vLLM 引擎启动期间无限挂起（`#17676`） | 开放 | [Issue #17676](https://github.com/vllm-project/vllm/issues/17676) |
| 🔴 高 | 序列并行 + 异步 TP 下批处理不变性被破坏（`#56370`） | 开放 | [Issue #56370](https://github.com/vllm-project/vllm/issues/56370) |
| 🟡 中 | 混合 GDN 模型在 185k 上下文时 DFlash 推测解码反而导致整体变慢（`#54691`） | 开放 | [Issue #54691](https://github.com/vllm-project/vllm/issues/54691) |
| 🟡 中 | GLM-5.3-Flash 在代理使用场景中退化为“文字乱码”（`#56605`） | 开放 | [Issue #56605](https://github.com/vllm-project/vllm/issues/56605) |
| 🟢 低 | 因缺少追踪器调用导致 OTLP 无法发送（`#56696`） | 开放 | [Issue #56696](https://github.com/vllm-project/vllm/issues/56696) |

> 注：目前无 PR 正在解决前两项高严重性问题。使用异步 TP 或长上下文代理的开发者需谨慎测试。

---

### **6. 对应用开发者的启示**  
- **对于具有长上下文工作流的智能体**：避免在混合 GDN 模型上使用 DFlash 推测（>100k token）；建议禁用该功能或升级至 v0.29+ 并等待修复补丁。  
- **对于 LLM 服务架构**：为 DeepSeek-V4.1 启用 SWA 有界重播，以降低内存占用并提升可扩展性。  
- **对于使用 RoCE/RDMA 集群的开发者**：关注 GLM-5.3 P/D 解耦中的 NIXL 描述符开销（#55434）——可能需要调优或回退至 RDMA。  
- **对于安全敏感部署**：留意正在进行的指针算术拓宽至 int64（#53131）补丁，防止高令牌负载下潜在的跨用户数据泄露。  
- **对于微调流水线**：Nemotron VL（语言部分）现已支持 LoRA，预计不久后将获得更好的 DeepSeek-V4.1 与 Qwen3.5 变体兼容性。

👉 *建议：固定使用 v0.29.0 或更高版本，并审查 `VLLM_USE_PRECOMPILED=1` 以确保构建间性能一致性。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-14

---

### **1. 今日亮点**  
SGLang 继续在生产级智能体推理方向推进，重点聚焦分布式 KV 缓存的可扩展性优化以及 DeepSeek-V4 的性能调优。当前最紧迫的任务仍是解决高吞吐场景下的 CUDA 层崩溃问题（如 Qwen3.8-Flash-Next-FP8、GLM-5.x NoPE MLA），同时多个后端正在持续推进 HiCache 可靠性与 MoE 路由的基础改进。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但有若干破坏性变更正在审查中：
- **PR #37958**：默认启用 `prefill shared-read completion`，以提升多标记预填充批次中的内存效率。
- **PR #39391**：在推测解码期间引入容错的草稿配置解析——此前配置加载失败会导致整个引擎崩溃。
- **PR #39381**：因上游 `main` 分支已移除，弃用 Triton 块指针；需下游适配以支持 AMD/ROCm。

> 🔗 [PR #37958](https://github.com/sgl-project/sglang/pull/37958) | [PR #39391](https://github.com/sgl-project/sglang/pull/39391) | [PR #39381](https://github.com/sgl-project/sglang/pull/39381)

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4 (DSV4)**：通过 **PR #39392** 实现对 R3 捕获和 MXFP4 在线更新的完整支持，可在服务过程中动态调整模型。
- ✅ **GLM-5.3-Flash (ROCm)**：通过 **PR #39338** 在 AMD 上启用零 RoPE MHA 预填充，解决了此前因 `qk_rope_head_dim == 0` 导致失败的模型问题。
- ✅ **NVIDIA Nemotron-3 Ultra (SM100)**：已启动性能追踪（**Issue #27286**），用于超大规模推理工作负载。
- ✅ **Gemma-3 (AMD/NPU)**：通过 **PR #37984** 修复 RadixAttention 中的张量布局不匹配问题，确保 MoE 路由正常运行。
- 🚧 **Llama4 NVFP4 (SM120)**：通过 **PR #35504** 增加对路由器输入权重的支持（`apply_router_weight_on_input=True`）。

> 🔗 [PR #39392](https://github.com/sgl-project/sglang/pull/39392) | [PR #39338](https://github.com/sgl-project/sglang/pull/39338) | [PR #37984](https://github.com/sgl-project/sglang/pull/37984) | [PR #35504](https://github.com/sgl-project/sglang/pull/35504)

---

### **4. 性能与优化**  
- **DeepSeek-V4**：多项优化并行推进，包括 TRT-LLM DSv4 attention 的注意力融合、FlashInfer MN 基础核优化，以及 MXFP8/W4A8 路径调优（**Issue #33636**）。
- **预填充吞吐**：通过 **PR #39095** 在自由内存预算范围内按查询行分块索引 MQA logits，显著提升长上下文场景下的稳定性。
- **MoE 效率**：通过 **PR #39299** 使路由型 MoE 模型可访问延迟最终化（deferred finalize），移除了硬编码限制。
- **内核层**：AMD 后端正从块指针转向显式偏移/掩码（**PR #39381**），以确保未来兼容 Triton v2.0+。

> 🔗 [PR #39095](https://github.com/sgl-project/sglang/pull/39095) | [PR #39299](https://github.com/sgl-project/sglang/pull/39299) | [PR #39381](https://github.com/sgl-project/sglang/pull/39381)

---

### **5. 稳定性与回归问题**  
今日报告的最高严重性问题：

| 问题 | 严重等级 | 摘要 | 修复状态 |
|------|----------|--------|------------|
| [#26340](https://github.com/sgl-project/sglang/issues/26340) | ⚠️ 关键 | CI 自动收集到的 CUDA 核心转储；跨运行普遍存在不稳定现象 | 正在调查中 |
| [#37633](https://github.com/sgl-project/sglang/issues/37633) | ❌ 严重 | QSA 扩展前向在约 22 并发请求时发生硬崩溃（H20 TP8, FP8） | 尚无修复 |
| [#39147](https://github.com/sgl-project/sglang/issues/39147) | ⚠️ 高 | HiCacheFile 报告不可恢复的混合前缀，当辅助池无法恢复时 | 正在处理 |
| [#39072](https://github.com/sgl-project/sglang/issues/39072) | ⚠️ 高 | GLM-5.3 在 disagg decode + dp-attention + spec decode 下崩溃 | 正在排查 |
| [#39302](https://github.com/sgl-project/sglang/issues/39302) | ⚠️ 高 | GLM-5.x NoPE MLA 在 SM120 上失败——所有 DSA 稀疏-MLA 后端均不可用 | 暂停待后端补丁 |

> 🔗 [Issue #26340](https://github.com/sgl-project/sglang/issues/26340) | [Issue #37633](https://github.com/sgl-project/sglang/issues/37633) | [Issue #39147](https://github.com/sgl-project/sglang/issues/39147)

---

### **6. 对应用开发者的启示**  
- **智能体工作负载**：若使用 PD 分离或 HiCache，建议升级至最新 `main` 版本——近期修复已解决 KV 缓存可扩展性中的关键瓶颈（**Issue #21846**）。
- **高并发服务**：生产环境请避免使用 `--disable-overlap-schedule` 和 `CUDA_LAUNCH_BLOCKING=1`；这些参数会掩盖底层 GPU 调度缺陷（参见 **Issue #37633**）。
- **模型选择**：在补丁落地前，请谨慎使用 `Qwen3.8-Flash-Next-FP8` 与 `GLM-5.x NoPE MLA` 在 SM120/H20 上的部署——两者在负载下均会出现致命崩溃。
- **推测解码**：使用 `--speculative-decoding` 时需谨慎；若草稿配置格式错误，可能导致引擎级故障，除非已应用 **PR #39391**。
- **CI 健康状况**：预计测试结果不稳定（截至 2026-09-14，共 27 个易碎测试，2 个已损坏）；请通过 **Issue #17050** 实时跟踪。

> 🔗 [Issue #21846](https://github.com/sgl-project/sglang/issues/21846) | [Issue #17050](https://github.com/sgl-project/sglang/issues/17050)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 每日简报 – 2026-09-14**

---

### **1. 今日重点**  
最新更新聚焦于 SYCL 与 Vulkan 后端的关键稳定性修复，尤其涉及 oneDNN scratchpad 管理及 Flash Attention 回退行为。CUDA（Volta+）性能优化正在推进，新增 cuBLAS 路径并支持稀疏 FlashAttention。已识别并修复了 macOS arm64 平台 `ggml-cpu` 中一个关键的堆内存损坏问题。

---

### **2. 发布与破坏性变更**  
- **`b10952`**：修复 SYCL 后端中 oneDNN scratchpad 池顺序违规问题 —— 防止提示处理过程中的崩溃。[PR #28704](https://github.com/ggml-org/llama.cpp/pull/28704)  
- **`b10951`**：重构 `llama_n_rs_seq` 调用以避免不必要的状态设置；提升代码清晰度与执行流程。[PR #28749](https://github.com/ggml-org/llama.cpp/pull/28749)  
- **`b10948`**：因兼容性问题，从 WebGPU 测试套件中移除 `HY_V4`。[PR #28855](https://github.com/ggml-org/llama.cpp/pull/28855)  
- **`b10946`**：在 s390x 上对仅 VXE 的重打包辅助函数增加保护，防止未定义行为。[PR #28775](https://github.com/ggml-org/llama.cpp/pull/28775)  

> ✅ *今日无破坏性 API 变更报告。*

---

### **3. 新模型与硬件支持**  
- **HunyuanOCR**：通过 PR #28890 添加 DFlash 规划解码支持，实现多模态 OCR 模型的更快草稿推理。  
- **XingChen4**：为 TeleAI 的国产大模型（中国电信 AI）添加初始 GGUF 转换支持。[PR #28156](https://github.com/ggml-org/llama.cpp/pull/28156)  
- **ROCm 10.0.0**：更新 Docker 基础镜像与 GPU 支持列表，现包含更新的 AMD 架构如 gfx1201（R9700）。[PR #27145](https://github.com/ggml-org/llama.cpp/pull/27145)  
- **Hexagon**：恢复连续快速路径及 HVX 复制优化，提升边缘推理性能。[PR #28886](https://github.com/ggml-org/llama.cpp/pull/28886)

---

### **4. 性能与优化**  
- **CUDA (Volta)**：  
  - 为 `GGML_OP_LIGHTNING_INDEXER`（DeepSeek-V4）添加 cuBLAS 路径，目标在 V100 上实现约 10–15% 的吞吐量提升。[PR #28888](https://github.com/ggml-org/llama.cpp/pull/28888)  
  - 通过 `n_kv_max` 路径在 Volta GPU 上启用稀疏 FlashAttention —— 避免完整 KV 缓存注意力计算。[PR #28887](https://github.com/ggml-org/llama.cpp/pull/28887)  
- **CUDA (RTX 5090 笔记本版)**：减小 `argsort` 分块大小，限制 top-k scratch 内存使用量，防止长提示场景下的 OOM。[PR #28889](https://github.com/ggml-org/llama.cpp/pull/28889)  
- **Vulkan**：将 `ggml-vulkan.cpp` 拆分为模块化文件，以改善编译时间与可维护性。[PR #28732](https://github.com/ggml-org/llama.cpp/pull/28732)  
- **CPU (macOS arm64)**：禁用预编译头文件（PCH）以解决 `ggml-cpu` 中的堆内存损坏问题。[PR #28882](https://github.com/ggml-org/llama.cpp/pull/28882)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复/临时方案 |
|---------|------|--------|----------------|
| 严重 | SYCL 崩溃：oneDNN scratchpad 打破 LIFO 池顺序 | 开放 (#28660) | ✅ 已在 `#28704` 合并修复 |
| 高 | Vulkan：在 RDNA3 上 `b10780` 之后提示处理速度严重下降 | 开放 (#28752) | 尚无修复；疑似图调度回归 |
| 高 | Vulkan：Flash Attention 回退至 SCALAR → O(N²) PP 性能退化 | 开放 (#27638) | 正在调查中 |
| 高 | macOS arm64：`ggml-cpu` PCH 导致堆内存损坏 | 开放 (#28858) | ✅ 已在 `#28882` 合并修复 |
| 中 | CUDA：RTX 5090 笔记本版（sm_120）上 `sigmoid` 操作出现地址未对齐 | 开放 (#28877) | `d3146f2b5` 与 `ad6c66839` 之间引入的回归 |
| 中 | ROCm：在 RX 7900 XTX 上生成速度显著低于 Vulkan | 开放 (#20934) | 无已知修复；可能为内核效率问题 |

> ⚠️ **注意：** 多个回归问题影响基于 Vulkan/SYCL 后端的生产级部署。

---

### **6. 对应用开发者的意义**  
- **若在 RDNA3/RDNA4 上使用 Vulkan**，请避免使用 `b10780` 及之后版本 —— 会遭遇提示处理速度下降。建议锁定在 `b10779` 或更早版本，直至修复发布。  
- **使用 `b10952` 或更高版本** 以获得稳定的 SYCL 推理体验 —— 尤其适用于 Intel Arc 显卡。oneDNN scratchpad 修复对可靠性至关重要。  
- **通过 `--cache-disk`（PR #28092）启用持久化磁盘缓存**，降低服务器部署中的冷启动延迟。  
- **对于 macOS M 系列用户**，确保构建时使用 `--no-pch`，或升级至 `b10952+` 以避免堆内存损坏。  
- **若部署于新型 AMD GPU**，建议升级至 ROCm 10.0 —— 提供更好的驱动支持与模型兼容性。  
- **关注规划解码行为** —— 最近变更可能影响 Qwen3.8-Flash-Next 等模型的接受率与推理速度（参见 #28805）。

> 🔗 **推荐构建参数**：`--device SYCL --model-draft <draft_model>` 用于受支持硬件上的低延迟推理。大型代理系统建议搭配 `--cache-disk` 使用。

---  
*简报源自 GitHub 活动：[ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-14**

---

### **今日亮点**  
今日报告了两项影响多模态推理和工具调用的严重问题：`gemma4` 在 Windows 上无法处理图像（#17778），以及 `kimi-k3:cloud` 在工具角色消息中处理图像内容时崩溃（#18426）。同时发现 `qwen3-coder` 因提示缓存模式键顺序不稳定导致回归，影响了代理可靠性（#18430）。此外，已有合并请求修复工具模式中地图迭代随机性问题（#18433）并规范化 JPEG EXIF 方向（#18432），提升了跨平台一致性。

---

### **发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性 API/配置变更。

---

### **新模型与硬件支持**  
- **请求中的模型**：  
  - SARVAM-30b 和 SARVAM-105b（Issue #14319）  
  - Gnani Evon-v3.3（Issue #18427）  
- **硬件/后端**：  
  - Jetson Orin Nano 8GB 在使用 Gemma 4 E4B 多模态投影器时，即使采用 CPU 投影器配置仍持续出现内存溢出（OOM）问题（#18396）。  
  - 通过 PR #18124 恢复了集成 GPU（如 Virtio-GPU）的 Vulkan GPU 支持，解决了从 0.32.9 版本引入的回归问题。

---

### **性能与优化**  
- **内存效率**：  
  - PR #18424 引入了量化后对中间 F16 数据块的清理，解决了模型存储中累积高达 50–830 GB 的问题。  
- **延迟与吞吐量**：  
  - 今日未报告直接的性能提升。但针对稳定工具模式渲染（#18433）和正确解析工具调用（#18422）的持续工作，将避免不必要的重新处理和缓存缺失，间接提升代理工作流的吞吐量。

---

### **稳定性与回归问题**  
1. **严重**：`kimi-k3:cloud` 在工具角色消息中处理图像内容时返回 HTTP 500 错误 —— **相比 kimi-k2.6 版本的回归**，尚未修复。  
2. **高**：`gemma4` 在 Windows 上无法处理图像（#17778），阻塞了多模态使用场景。  
3. **中等**：`qwen3-coder` 因模式键顺序随机导致提示生成不一致，使提示缓存失效（#18430）；**修复正在进行中，详见 PR #18433**。  
4. **低**：`Qwen3.8-27B-GSQ-RCO-GGUF:IQ3_S` 虽然生成成功，但返回空内容（#18297）；疑似量化兼容性问题。  
5. **轻微**：工具调用键名含空格时被静默丢弃（#18390）；已由 PR #18422 修复。

> ✅ *已有修复合并请求*：  
> - 稳定工具模式渲染：[#18433](https://github.com/ollama/ollama/pull/18433)  
> - JPEG EXIF 归一化：[#18432](https://github.com/ollama/ollama/pull/18432)  
> - 工具编号溢出：[#18422](https://github.com/ollama/ollama/pull/18422)

---

### **对应用开发者的影响**  
- 在修复落地前，请避免在 Windows 上使用 `kimi-k3:cloud` 与 `gemma4` 处理图像输入。可暂用 `gemma3` 或 `qwen3-coder` 作为替代。  
- 若使用 `qwen3-coder` 配合工具，除非锁定至该回归前的版本，否则需预期提示缓存不一致。请关注 PR #18433 获取修复进展。  
- 对涉及大型代码库的本地代理或自动化工作流，建议关注即将推出的 Docker SBX 集成（#18425）及目录输入功能（#18429）。  
- 使用 `IQ3_S` 量化模型时需谨慎，建议手动验证输出内容。  
- 可利用当前正在通过 PR #18434 添加的 `previous_response_id` 支持，实现有状态代理流程（预计将在下一版本发布）。

> 🔗 *跟踪关键问题*：[Issue #18426](https://github.com/ollama/ollama/issues/18426), [Issue #18430](https://github.com/ollama/ollama/issues/18430), [PR #18433](https://github.com/ollama/ollama/pull/18433)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 简报 – 2026-09-14**

---

### **1. 今日重点**  
LiteLLM 代理持续成熟，已发展为生产级大模型网关，关键修复聚焦于日志记录、成本核算及流式传输的可靠性。主要进展包括：强化的防护墙集成（Reco）、对 VLLM 缓存令牌使用情况的改进处理，以及对提供方元数据暴露的安全增强。当前生态系统正积极应对多租户部署中的跨租户缓存泄露和预算管理错误问题。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
但多项合并请求引入了破坏性变更或配置调整：  
- **PR #40111** 调整 Qwen 缓存定价行为，通过区分缓存模式进行处理——这可能影响依赖默认定价规则用户的成本计算。[链接](https://github.com/BerriAI/litellm/pull/40111)  
- **PR #41053** 修正 `QualifireGuardrail.__init__` 中的文档字符串不一致问题，明确指出 `api_base` 应从环境变量（`QUALIFIRE_API_BASE`）读取，而非硬编码主机地址。[链接](https://github.com/BerriAI/litellm/pull/41053)

---

### **3. 新模型与硬件支持**  
- **PR #41042** 提议新增 **Bourse** 作为 OpenAI 兼容提供方，可实现以低于官方价格 11–58% 的折扣访问转售的 AI 推理资源，拓展 LiteLLM 在新兴低成本推理市场的可扩展性。[链接](https://github.com/BerriAI/litellm/pull/41042)  
- **PR #39135** 为 MCP 服务器增加对 YAML 格式 OpenAPI 规范的支持，提升与 firefly-iii、Petstore 等使用 YAML 而非 JSON 的工具兼容性。[链接](https://github.com/BerriAI/litellm/pull/39135)  
- **PR #40605** 支持对 Soniox 的表单字段（`context`、`translation`、标志位）进行解码，解锁语音驱动智能体中更丰富的音频转文本定制能力。[链接](https://github.com/BerriAI/litellm/pull/40605)

---

### **4. 性能与优化**  
- **PR #40949** 确保在关闭过程中断开 Prisma 前彻底清空消费日志队列——防止崩溃场景下账单数据丢失，对高吞吐量代理部署至关重要。[链接](https://github.com/BerriAI/litellm/pull/40949)  
- **PR #40950** 修正 Vertex AI Anthropic 流式响应中的错误支出归属问题，当计算耗用令牌成本时忽略 `usage.cost=0`，避免缓存响应被误报为零成本。[链接](https://github.com/BerriAI/litellm/pull/40950)  
- **PR #41033** 引入通过 `x-litellm-session-id` 配置提供方亲和性头部，减少客户端逻辑复杂度，并提升异步/流式路径间的路由一致性。[链接](https://github.com/BerriAI/litellm/pull/41033)

---

### **5. 稳定性与回归问题**  
今日报告若干关键稳定性问题：  
1. **#10788**：无法通过 `LITELLM_LOG=ERROR` 禁用 INFO 级别请求日志，导致生产代理中严重日志污染。*尚未修复*，但已广泛反馈。[链接](https://github.com/BerriAI/litellm/issues/10788)  
2. **#39370**：重置预算任务会静默地将 `budget_duration=null` 且 `budget_reset_at` 过期的团队支出归零，导致预算耗尽未被察觉。*修复待定*。[链接](https://github.com/BerriAI/litellm/issues/39370)  
3. **#40583**：防护墙无法检查或拦截通过 `/v1/messages` 发送的 MCP 工具（Anthropic 格式），影响预调用阶段的代理安全。*修复尚未合并*。[链接](https://github.com/BerriAI/litellm/issues/40583)  
4. **#40887 / #40654**：由于缺少 delta 映射，非流式和流式响应中均丢失流式推理状态，影响智能体记忆连续性。*修复正在进行中*。[链接](https://github.com/BerriAI/litellm/issues/40887)，[链接](https://github.com/BerriAI/litellm/issues/40654)

---

### **6. 对应用开发者的意义**  
- **谨慎使用日志**：若运行高流量代理，请立即通过自定义中间件禁用详细日志，直至 #10788 修复。  
- **审计成本核算**：确保部署使用准确的定价映射——特别是 Qwen（参考 #40111）和 Vertex AI Claude 模型（参考 #40363）。错误定价可能导致财务偏差。  
- **保障多租户安全**：使用团队范围缓存（#29955），避免在缺乏隔离的情况下共享模型别名。  
- **提升智能体可靠性**：对于依赖工具调用与推理历史的智能体，建议测试最新代理构建版本，确保流式状态得以保留。  
- **规划防护墙维护**：使用 MCP 工具或 Anthropic 兼容端点时，验证防护墙是否正确处理消息格式差异。  

> 💡 *实用提示*：关注 PR #41048（lint 升级）和 #40251（类型清理）——它们标志着内部质量持续改进，将长期提升可维护性。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth 消息简报 – 2026-09-14**

---

### **1. 今日亮点**  
Unsloth 生态系统持续扩展对多 GPU 及跨平台部署的支持，关键 PR 提升了 AMD ROCm 兼容性并增强了安装程序的鲁棒性。已合并多项关键稳定性修复，解决了工具执行过程中的沙箱逃逸风险，并确保在 Windows ARM64 和 Intel ARC GPU 上正确处理模型加载。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
然而，通过 `SFTConfig.__init__()` 引入了一项破坏性变更：弃用 `max_seq_length`，改用 `max_length`，详见 [Issue #10785](https://github.com/unslothai/unsloth/issues/10785)。使用旧版配置的开发者应尽快更新代码。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 支持**：新增 `docker/rocm` 镜像（PR [#10820](https://github.com/unslothai/unsloth/pull/10820)），支持 RDNA2 至 CDNA 架构。现可实现对 AMD 显卡（包括 RX 6950 XT、6850M XT、6550M）的完整 GPU 加速，此前这些设备会降级至 CPU 运行。
- **Intel ARC GPU 修复**：Intel ARC 140T 的安装问题正在调查中 ([Issue #8632](https://github.com/unslothai/unsloth/issues/8632))；而诸如 [#10746](https://github.com/unslothai/unsloth/pull/10746) 等 PR 已改进对更新代 AMD GPU 的检测能力。
- **Windows ARM64**：由于 `pyarrow` 冲突导致的安装失败仍存在 ([Issue #10875](https://github.com/unslothai/unsloth/issues/10875))；目前尚未提供解决方案。

---

### **4. 性能与优化**  
- **AMD Attention 内核**：PR [#8821](https://github.com/unslothai/unsloth/pull/8821) 在导入时默认启用 PyTorch 的快速 ROCm attention 内核（AOTriton），无需手动设置环境变量，显著降低训练期间的内存增长。
- **内存管理**：`--tensor-split` 标志现已重新生效，此前该选项被忽略 ([Issue #10355](https://github.com/unslothai/unsloth/issues/10355))，这对跨多 GPU 进行大模型推理至关重要。
- **模型卸载**：即使在完全卸载（`-ngl -1`）的情况下，Windows 上 GGUF 模型仍存在显存泄漏问题，修复仍在进行中 ([Issue #9033](https://github.com/unslothai/unsloth/issues/9033)) —— 对低内存系统影响显著。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 高 | [Issue #10907](https://github.com/unslothai/unsloth/issues/10907) | 本地模型可绕过沙箱，访问项目范围外的文件（如通过 `os.remove()`）。 | ✅ PR [#10907](https://github.com/unslothai/unsloth/pull/10907) 已提交，将在外部文件访问前触发提示 |
| 高 | [Issue #10912](https://github.com/unslothai/unsloth/issues/10912) | 在慢速 CPU 上反复执行 `unsloth start pi` 时，3 次重试后出现“Error: terminated”错误 | ⚠️ 部分修复中；关联 #10911 |
| 中 | [Issue #10839](https://github.com/unslothai/unsloth/issues/10839) | MCP 调用因去重逻辑导致截断 | 🔧 开放中；影响代理工作流 |
| 中 | [Issue #10853](https://github.com/unslothai/unsloth/issues/10853) | 本地 HF 缓存模型训练失败，因缺少权重文件名模式（`model-00000-of-00001.safetensors`） | 🛠️ 白名单问题；需更新过滤规则 |

---

### **6. 对应用开发者的影响**  
- **代理构建者**：应预期更紧密的受保护沙箱工具执行集成。即将推出的“访问外部文件前提示”功能（[PR #10907](https://github.com/unslothai/unsloth/pull/10907)）对生产级代理至关重要。
- **多平台部署**：随着 ROCm 与 AMD GPU 支持的提升，开发者现在可在多种硬件（包括消费级 AMD 显卡）上部署 LLM 代理，且不牺牲性能。
- **工作流自动化**：基于文件夹的项目结构（[Issue #10873](https://github.com/unslothai/unsloth/issues/10873)）、类似 Steam 的模型库管理（[Issue #10872](https://github.com/unslothai/unsloth/issues/10872)）以及 MCP 中心（[Issue #10822](https://github.com/unslothai/unsloth/issues/10822)）等功能，预示着向开发者友好、可复用的代理生态系统演进。
- **API 注意事项**：请立即更新 `SFTConfig` 使用方式，将 `max_seq_length` 替换为 `max_length`，以避免运行时错误。

> 🔗 *探索完整变更日志并参与贡献：* https://github.com/unslothai/unsloth

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*