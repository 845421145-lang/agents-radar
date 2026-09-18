# AI 基础设施日报 2026-09-18

> 生成时间: 2026-09-18 00:44 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-18**

---

### **1. 生态概览**  
AI推理与服务生态正进入 *硬件专业化、跨架构统一化、推测解码成熟化* 的阶段。各项目战略重心迅速分化：vLLM 和 SGLang 在下一代GPU（Blackwell、MI350X）上主导高吞吐、低延迟推理；llama.cpp 与 Unsloth 则聚焦边缘兼容性与多后端可移植性。Ollama 与 LiteLLM 继续在开发者网关领域占据主导地位，优先考虑易用性与可观测性。一个明显的趋势是向 *多模型、多硬件编排* 发展，各项目积极集成 T-Head PPU、AMD RDNA/RoCm、ARM64 CUDA 以及 FP8/INT8 扩散、基于 quark 的 MXFP 等新型量化格式支持。

---

### **2. 活动对比**

| 项目       | 开放问题（高/中） | PR（最近24小时） | 发布（最近24小时） | 状态 |
|---------------|------------------------|----------------|----------------------|--------|
| **vLLM**      | 12（4 高，5 中）  | 12             | 无                 | 稳定，修复关键回归 |
| **SGLang**    | 10（2 高，4 中）  | 8              | 无                 | 活跃开发，稳定性存疑 |
| **llama.cpp** | 15（3 高，7 中）  | 10             | `b11028`–`b11017`     | 频繁小版本发布，聚焦 Vulkan/SYCL |
| **Ollama**    | 11（2 高，5 中）  | 6              | 无                 | CLI代理移除引发破坏性变更 |
| **LiteLLM**   | 10（2 高，3 中）  | 4              | 无                 | 代理层稳定性修复 |
| **Unsloth**   | 13（3 高，5 中）  | 12             | **v0.1.810-beta**    | 重大测试版发布，推动 Docker 与 ROCm |

> ✅ *洞察*：**Unsloth** 在发布速度上领先，推出重大新测试版；**vLLM** 与 **llama.cpp** PR 活动最高，反映出在性能与稳定性上的高强度工程投入。

---

### **3. 模型支持竞赛**

| 新模型 / 架构        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3-VL / LLaVA-OneVision** | ✅ 完全支持 CUDA 图 | 🟡 正在跟踪 RFC | ❌ | ❌ | ❌ | ❌ |
| **Qwen3.8-Flash-Next (MTP)**   | ✅ MTP + KV 缓存优化 | ❌ | ✅ MTP + 复用 | ❌ | ❌ | ✅ MTP（崩溃风险） |
| **GLM-5.3-Flash (Sparse MLA)** | ✅ 修复进行中 | ✅ Quark 修复（ROCm） | ❌ | ❌ | ❌ | ⚠️ MTP 崩溃 |
| **DeepSeek-V4.1-Flash**        | ✅ 推测解码 | ❌ | ❌ | ⚠️ MoE 崩溃 | ❌ | ❌ |
| **T-Head PPU (ZW810/ZW-M890P)**| ❌ | ✅ 路线图 | ❌ | ❌ | ❌ | ❌ |
| **AMD RDNA1+2 (ROCm)**         | ⚠️ GLM/DSV4 崩溃 | ✅ 稳定 | ✅ | ⚠️ B70 崩溃 | ❌ | ✅ 完全支持 |
| **ARM64 CUDA (Windows)**       | ❌ | ❌ | ✅ Hexagon NPU | ✅ Vulkan | ❌ | ✅ 实验性支持 |

> 🏆 **领先者**：**Unsloth** — 对新硬件（ROCm、ARM64 CUDA）的采纳速度最快。  
> 🏁 **亚军**：**llama.cpp** — 在多种后端与量化类型下支持最广泛。  
> 🔥 **新兴焦点**：**SGLang** 与 **vLLM** 在通过 CUDA 图与混合解码实现 *多模态视觉变换器* 集成方面处于领先地位。

---

### **4. 性能前沿**

| 优化方向          | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **KV 缓存效率**     | ✅ FP8_E4M3，稀疏预处理 | ✅ 统一基数缓存 | ✅ MTP 复用 | ⚠️ 内存膨胀 | ✅ 流式精度 | ⚠️ 上下文误报 |
| **批处理与并行**  | ✅ 流水线并行草稿 | ✅ 混合 GDN/Mamba | ⚠️ MoE 不稳定 | ❌ 无 TP | ✅ JWT 路由 | ✅ GRPO 加速 |
| **量化创新** | ✅ fp8_e4m3 KV | ✅ MXFP4/8，quark 排除 | ✅ DP4A，Kronecker FWHT | ✅ Bonsai 1/2-bit | ❌ 有限 | ✅ FP8/INT8 扩散 |
| **内核级优化** | ✅ SM120，MLAs | ✅ HiCache 写回 | ✅ MFMA，FlashKDA | ⚠️ DSpark 停滞 | ❌ | ✅ CPU 启动减少 |
| **分布式服务**     | ✅ 异步 TP，SP | ✅ 多节点 HiCache | ❌ | ❌ | ✅ 团队级路由 | ❌ |

> 📈 **性能领先者**：  
> - **vLLM**：在可扩展、生产级批处理及 Blackwell 特定内核方面领先。  
> - **Unsloth**：训练改进最快（LoRA SFT 下降 17% 步数时间）。  
> - **llama.cpp**：在 Vulkan、SYCL、OpenCL 及 Intel Xe 上拥有最多样化的内核优化。

---

### **5. 层定位**

| 项目       | 主要层级               | 核心差异化                                  |
|---------------|-----------------------------|----------------------------------------------------|
| **vLLM**      | **推理引擎**        | 高吞吐、低延迟 GPU 服务；以 CUDA 图为先的设计 |
| **SGLang**    | **推理引擎 + 网关** | 混合推测解码，统一基数缓存，多节点优化 |
| **llama.cpp** | **本地运行时 / 边缘**    | 跨平台、轻量级，适用于嵌入式设备与离线推理 |
| **Ollama**    | **开发者网关 / CLI** | 简化本地部署；用户体验强但控制力有限 |
| **LiteLLM**   | **API 网关 / 代理**     | 成本追踪、团队策略、MCP/工具链、可观测性优先 |
| **Unsloth**   | **训练与微调**  | 加速 LoRA 训练，Studio UI，Docker 化工作流 |

> 💡 *战略洞察*：整个栈正变得越来越模块化——**引擎（vLLM/SGLang）** → **网关（LiteLLM/Ollama）** → **训练（Unsloth）** → **运行时（llama.cpp）**。

---

### **6. 趋势信号**

#### **从活动提取的行业趋势**：
1. **硬件碎片化正推动可移植性**：AMD ROCm、T-Head PPU、ARM64 CUDA、Intel Arc B70 均获得针对性修复——表明单一平台尚未主导。
2. **推测解码趋于成熟**：vLLM（流水线并行草稿）与 SGLang（混合 GDN/Mamba）均大力投入正确性与可扩展性——现已成为核心功能，非实验性质。
3. **可观测性与计费准确性至关重要**：多个项目（LiteLLM、Ollama、SGLang）报告成本/日志错误——反映企业级 AI 系统对审计能力的需求上升。
4. **量化已超越比特层面**：FP8/INT8 扩散、MXFP4/8、quark 排除等表明，量化正从简单的位宽压缩转向 *语义感知* 的优化。
5. **稳定性胜过功能**：尽管创新迅速，但 *严重稳定性问题*（核心转储、内存泄漏、输出错误）仍主导问题追踪器——提醒团队生产就绪才是首要任务。

#### **应用开发者应关注事项**：
- ✅ 若在 Blackwell 或 ROCm 上部署，避免使用 vLLM 或 SGLang 的 nightly 构建——请坚持使用稳定版本，直至 #56370、#26340 和 #57424 修复完成。
- ✅ 在 Ollama 中启用 `--nodraft` 以实现可复现调试——推测解码在负载下仍不稳定。
- ✅ 使用 LiteLLM v1.88.1+ 以避免遗漏 `cursor/chat/completions` 日志——对代理追踪至关重要。
- ✅ 监控 Unsloth 的 MTP/Qwen3.8-Flash-Next —— 尽管性能提升显著，早期采用者仍面临崩溃风险。
- 🔄 **准备跨架构部署**：随着 T-Head PPU、AMD RDNA、ARM64 CUDA 逐步普及，未来应用必须按硬件无关设计。

> 🎯 **最终结论**：AI 基础设施格局已不再关注“哪个引擎最快”，而是“哪个生态能在规模化下提供可靠性、可观测性与跨平台一致性”。在构建代理和生产网关时，优先选择稳定性和可观测性，而非追逐前沿特性。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **1. 今日亮点**  
vLLM 持续推进对下一代硬件和多模态模型的支持，关键进展包括为 ViT 编码器（如 LLaVA-OneVision、Qwen3-VL）集成 CUDA Graph，以及针对 SM120 Blackwell GPU 的性能优化。重要 PR 解决了 DeepSeek-V4.1-Flash 上推测解码的稳定性问题，并修复了 GLM-5.3-Flash 稀疏注意力路径中的内存损坏问题——这两项对于大规模生产推理至关重要。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
无新版本发布或破坏性 API/配置变更。项目保持稳定，实验性功能仍在持续优化中。

---

### **3. 新模型与硬件支持**  
- **多模态视觉变换器（ViT）：**  
  - ✅ **CUDA Graph 支持已添加** 至 `LlavaOnevisionForConditionalGeneration`，通过 [PR #57379](https://github.com/vllm-project/vllm/pull/57379)。该功能支持图像/视频输入的完整预填充图捕获。  
  - 📌 **RFC #38175**：提议将完整的 CUDA Graph 支持扩展至 Qwen3-VL、GLM-V、Kimi K2.5 等多模态模型中的 ViT —— 对实现低延迟推理至关重要。

- **硬件与后端：**  
  - ✅ **SM120（Blackwell）GPU**：多个 PR 针对 `sm_120` 进行优化与缺陷修复，包括启用 FP32 路由器 ([PR #56152](https://github.com/vllm-project/vllm/pull/56152)) 和改进稀疏 MLA 性能 ([PR #57458](https://github.com/vllm-project/vllm/pull/57458))。  
  - ✅ **ROCm（gfx950）**：正在努力稳定 GLM-5.3-Flash 与 DeepSeek-V4.1-Flash 在 AMD MI350X/MI355X 上的表现；已报告多个内核级错误但尚未修复 ([Issue #57227](https://github.com/vllm-project/vllm/issues/57227), [#57424](https://github.com/vllm-project/vllm/issues/57424))。

- **量化：**  
  - ✅ **fp8_e4m3 KV 缓存** 已在 `Qwen3.8-Flash-Next` 的 QSA 路径上支持 ([Issue #54426](https://github.com/vllm-project/vllm/issues/54426))，使有效 KV 池容量翻倍。

---

### **4. 性能与优化**  
- **吞吐量与内存效率：**  
  - ✅ **GLM-5.3-Flash**：通过复用空的旋转尾部（rotary tails）减少稀疏 MLA 准备开销 ([PR #57458](https://github.com/vllm-project/vllm/pull/57458))，降低预填充延迟。  
  - ✅ **MiniMax-M3**：拆分解码索引-评分循环并融合 top-k 合并，将内核调用次数从 3 降至 2 ([PR #56149](https://github.com/vllm-project/vllm/pull/56149))，降低每标记成本。

- **推测解码：**  
  - ✅ **EAGLE/DSpark**：完成流水线并行辅助状态支持 ([PR #57197](https://github.com/vllm-project/vllm/pull/57197))，可在各阶段实现可扩展的草稿令牌生成。  
  - ⚠️ **混合 GDN + MTP**：当批量 ≥4 时观察到调度器吞吐量崩溃 ([Issue #55533](https://github.com/vllm-project/vllm/issues/55533))；正在调查中。

- **基准测试备注（DeepSeek-V4.1-Flash 在 ROCm 上）：**  
  测得 **35.89 tokens/sec**（8x MI355X，TP=4），表明在 AMD 硬件上仍有进一步优化空间。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR？ | 链接 |
|--------|------|--------|--------|------|
| 🔴 高 | 使用序列并行 + 异步 TP 时，批处理不变性被破坏（`VLLM_BATCH_INVARIANT=1`） | 打开 | ❌ 尚无修复 | [Issue #56370](https://github.com/vllm-project/vllm/issues/56370) |
| 🔴 高 | GLM-5.3-Flash 在 ROCm 上崩溃，因 `SparseAttnIndexerKpool` 缺少 `forward_cuda` | 打开 | ❌ 尚未解决 | [Issue #57424](https://github.com/vllm-project/vllm/issues/57424) |
| 🔴 高 | DeepSeek-V4.1-Flash 在 SM120 上长提示预填充期间发生非法内存访问 | 打开 | ❌ 尚无修复 | [Issue #56771](https://github.com/vllm-project/vllm/issues/56771) |
| 🟡 中 | GLM-5.3-Flash 在 SM120 上无法启动，因缺少无 rope 稀疏 MLA 路径 | 打开 | ❌ 尚无修复 | [Issue #53963](https://github.com/vllm-project/vllm/issues/53963) |
| 🟡 中 | v0.28.0/v0.29.0 版本出现主机内存耗尽问题（相比工作正常的 0.27.1） | 打开 | ❌ 尚无修复 | [Issue #54237](https://github.com/vllm-project/vllm/issues/54237) |

> *注：多个问题影响在 Blackwell（RTX PRO 6000）及 AMD MI350X/MI355X 系统上的生产级部署。*

---

### **6. 对应用开发者的启示**  
- **谨慎使用 vLLM 夜间构建版**：近期回归问题（如主机内存冻结、批处理不变性破坏）可能影响高吞吐部署的稳定性。除非你正在主动测试修复，否则建议坚持使用稳定版本。  
- **尽早启用 CUDA Graph**：对于使用 LLaVA-OneVision 或 Qwen3-VL 的多模态应用，可通过 [PR #57379](https://github.com/vllm-project/vllm/pull/57379) 将预填充延迟降低约 30%。  
- **若可能，避免当前使用 SM120/ROCm**：GLM-5.3-Flash 与 DeepSeek-V4.1-Flash 在这两个平台上的关键缺陷仍处于开放状态。请关注 [Issue #57424](https://github.com/vllm-project/vllm/issues/57424) 与 [Issue #56771](https://github.com/vllm-project/vllm/issues/56771) 获取更新。  
- **优化推测解码**：若使用 EAGLE/DSpark 并配合流水线并行，请确保使用已合并 [PR #57197](https://github.com/vllm-project/vllm/pull/57197) 的最新 vLLM 版本以保证正确行为。

> ✅ **可操作建议**：对于依赖长上下文推理的实时智能体，可尝试使用 `--enforce-eager` 或临时禁用 CUDA Graph，以避免沉默的正确性问题。

---  
*摘要生成时间：2026-09-18 | 来源：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 消息简报 – 2026-09-18

---

### **1. 今日亮点**  
SGLang 生态系统持续加强下一代硬件及推测性推理的支持，关键进展包括 Blackwell GPU 兼容性、平头哥 PPU 集成以及统一基数缓存优化。高严重性稳定性问题——尤其是围绕 CUDA 核心转储（`#26340`）和混合模型中 KV 缓存一致性（`#39830`）的问题——已引起社区广泛关注，表明底层执行路径仍在持续优化。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布内容。未推出新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **平头哥 PPU (ZW810/ZW810E/ZW-M890P)**：已启动正式路线图（`#37519`），旨在上游集成对平头哥 PPU 加速器的一流支持，目标是为中国本地部署提供高性能推理能力。  
- **SenseNova-U1/U1.5**：追踪问题 `#37742` 列出了基于官方 OpenSenseNova/SenseNova-U1 参考实现的集成计划。  
- **AMD GLM-5.3-Flash**：PR `#39317` 确保在 MXFP4 量化过程中正确处理量子化排除项（如 BF16 层），从而实现在 ROCm 平台上的稳定服务。  
- **DeepEP v2**：PR `#40030` 增加对 MXFP8 和延迟路由权重的支持，扩展了大型 MoE 模型的量化灵活性。

> 🔗 [平头哥 PPU 路线图](https://github.com/sgl-project/sglang/issues/37519) | 🔗 [SenseNova-U1 支持](https://github.com/sgl-project/sglang/issues/37742) | 🔗 [AMD GLM-5.3-Flash Quark 修复](https://github.com/sgl-project/sglang/pull/39317)

---

### **4. 性能与优化**  
- **乐观预填充结合 HiCache**：PR `#40043` 为乐观预填充启用仅缓冲区模式的 L3 写透式 HiCache，降低内存压力的同时，在多节点环境下仍保持前缀缓存的完整性。  
- **统一基数缓存优化**：多个 PR（`#39395`, `#38426`）通过压缩 DSA 索引存储并优化写回行为，提升了 HiCache 容量并减少了主机内存开销。  
- **CUDA Graph 复用**：PR `#40047` 修复了因缺失 DSA 索引元数据导致的可中断解码 CUDA Graph 捕获崩溃问题，提升了长时间推理会话中的复用效率。  
- **Blackwell CC 优化**：PR `#36810` 通过避免同步的 `cudaMemcpyAsync`，解决了 NVIDIA 机密计算下的重叠调度延迟问题，恢复了安全沙箱内的解码并行性。

> 🔗 [HiCache 写回与容量优化](https://github.com/sgl-project/sglang/pull/39395) | 🔗 [乐观预填充结合 HiCache](https://github.com/sgl-project/sglang/pull/40043)

---

### **5. 稳定性与回归问题**  
今日活动以关键稳定性问题为主导：

1. **CUDA 核心转储追踪 (`#26340`)** – *高严重性*  
   CI 自动收集的核心转储显示，PR 测试期间反复出现 GPU 崩溃。313 条评论反映出广泛存在的不稳定性；目前尚无修复方案。此问题对构建可靠性和部署稳定性构成系统性风险。  
   > 🔗 [问题 #26340](https://github.com/sgl-project/sglang/issues/26340)

2. **分层缓存输出错误 (`#39830`)** – *高严重性*  
   混合 GDN/Mamba 模型因主机层级缓存命中被错误地跨生成阶段归因，导致返回错误响应。可在 `main` 分支上复现。  
   > 🔗 [问题 #39830](https://github.com/sgl-project/sglang/issues/39830)

3. **FlashKDA 预填充崩溃 (`#39925`)** – *中等严重性*  
   当 `return_intermediate_states=False` 时返回元组 `(output, None)`，导致在禁用基数缓存时触发 GLM-5.3-Flash 的崩溃。  
   > 🔗 [问题 #39925](https://github.com/sgl-project/sglang/issues/39925)

4. **KV 缓存事件模式不一致 (`#39991`)** – *中等严重性*  
   提议将 SGLang 的 KV 缓存事件模式与 vLLM 对齐，以支持共享可观测性工具。当前是监控栈的偏差点。  
   > 🔗 [RFC: 对齐 KV 缓存模式](https://github.com/sgl-project/sglang/issues/39991)

---

### **6. 对应用开发者的启示**  
- 若使用基于 DSA 的模型（如 GLM-5.x），在 PR `#40047` 合并前，请避免使用 `--cuda-graph-backend-decode breakable`。  
- 随着混合递归状态修复（`#40001`, `#32196`）逐步上线，推测性解码工作流的稳定性将显著提升——尤其对 Mamba/GDN 类模型而言。  
- **注意计费准确性**：问题 `#39900` 和 `#39922` 显示 `cache_creation_input_tokens` 未被报告，导致缓存请求的成本跟踪不准确。建议使用自定义指标或本地打补丁。  
- **规划未来硬件多样性**：平头哥 PPU（`#37519`）和 SenseNova-U1（`#37742`）的集成表明，SGLang 正致力于成为跨架构推理平台，非常适合面向亚太地区人工智能基础设施的开发者。  

> ✅ **可操作提示**：若在 Blackwell 上启用了机密计算，请确保在验证 `#36810` 修复后，再启用 `--enable-overlap-scheduling`。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-18**

---

### **1. 今日重点**  
最新发布周期（b11028–b11017）聚焦于 Vulkan 与 SYCL 的关键稳定性修复，包括修复 Intel B70 内存分配错误，并改进 MTP 模型中的 MoE 处理。新增 OpenVINO 2026.4 集成以及对 Qwen3.8-Flash-Next MTP 层的增强支持，标志着多租户模型执行和跨后端优化的持续进展。

---

### **2. 发布与破坏性变更**  
- **最新发布**：`b11028` 至 `b11017`（24 小时窗口），未记录破坏性 API 变更。  
- **关键修复**：  
  - `b11028`：修复 CI 中缺失的文件驱逐问题（`#29041`）——提升长时间推理任务中的清理效率。  
  - `b11027`：在 RPC 中跳过 ACCEL 设备（`#29020`）——防止意外设备枚举。  
  - `b11026`：在跳过 gate_up_exps 时正确处理 `TENSOR_SKIP`（`#29014`）——对融合了 MTP 张量的 Qwen3.5-MoE 至关重要。  
  - `b11025`：扩展 Nemotron MTP 支持（`#29018`）——移除冗余声明，提升兼容性。  
  - `b11019`：GGUF 数据段对齐现在基于 GGUF 起始位置，而非文件偏移（`#28993`）——防止嵌入文件中张量读取错位。  
  - `b11018`：修复 B70 SYCL 内存分配错误（>19.3GB）（`#28953`）——对高内存 GPU 离线计算至关重要。  

> 🔗 [GitHub 发布页](https://github.com/ggml-org/llama.cpp/releases)

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 全面扩展 **Qwen3.8-Flash-Next** 的 MTP 支持（`#28243`）——通过共享 token embeddings 实现 1.3–2 倍更快加载速度。  
  - 新增 **Ling 3.0 (Bailing V3)** 对话解析器（`#28682`）——正确处理已打开的 `\<think\>` 标签。  
  - 增强 **DeepSeek-V3.2/V4** 消息分隔符（`#29008`）——提升结构化输出的提示格式质量。  
- **硬件后端**：  
  - 为 Windows Arm64 新增 **Hexagon NPU** 构建（`#29052`）——拓展边缘移动设备部署选项。  
  - 引入 **Intel Xe flash attention kernels** 用于 Xe-LPG Plus/Xe2/Xe3（`#24406`）——针对即将推出的 Intel GPU 提供性能提升。  
  - 更新 **OpenVINO 2026.4**（`#29009`）——包含新优化及 clangd/MSVC 的警告修复。  

> 🔗 [PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243), [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406), [PR #29052](https://github.com/ggml-org/llama.cpp/pull/29052)

---

### **4. 性能与优化**  
- **内核优化**：  
  - 为 OpenCL 上的 Q6_K、Q4_K 与 Q4_0 GEMM 添加优化的 **DP4A 二值化内核**（`#29057`, `#29056`, `#29055`）——预计可提升非 MoE 量化推理速度。  
  - 为 OpenCL 添加 **Flash attention 二进制内核**支持（`#29046`）——降低长上下文注意力延迟。  
  - 通过 ROCm 为 CDNA2（gfx90a）引入 **MFMA lightning 索引路径**（`#29050`, `#29047`）——释放 AMD Instinct GPU 上矩阵核心的全部性能。  
  - 为 CUDA 添加 **Kronecker FWHT 支持**（`#29051`）——加速非 2 的幂次 Hadamard 变换（384, 640, 768, 1280）。  
- **内存效率**：  
  - Qwen3.8-Flash-Next MTP 现在重用 `embed_tokens`——大型模型的显存/内存使用量减少约 15%（`#28243`）。  

> 🔗 [PR #29057](https://github.com/ggml-org/llama.cpp/pull/29057), [PR #29050](https://github.com/ggml-org/llama.cpp/pull/29050)

---

### **5. 稳定性与回归问题**  
- **报告的关键问题**：  
  - **Vulkan 在 Intel B70 上运行 MoE 模型时崩溃**（`#23769`）——在 `b11017` 环境下报告；修复 PR 正在等待。  
  - **SYCL：启用 `ngram-mod` 时出现极端临时存储分配（>2GB）**（`#28860`）——造成严重内存压力。  
  - **Vulkan im2col 着色器在未对齐的情况下通过 buffer_reference 写入**（`#28960`）——部分驱动下可能引发未定义行为。  
  - **DeepSeek-v4-flash-vision exp** 即使启用 DSpark 也无法提升 tok/s 速度（`#28939`）——可能存在优化回归。  
  - **在 128GB 统一内存系统上进行聊天时，主机侧内存无限制增长**（`#28933`）——可能由缓存泄漏或引用计数问题导致。  
- **正在进行的修复**：  
  - `#28956`：修复 Vulkan 中错误的注意力缓存切片读取问题（`#28956`）——解决多头注意力中的结果错误。  

> 🔗 [问题 #23769](https://github.com/ggml-org/llama.cpp/issues/23769), [问题 #28860](https://github.com/ggml-org/llama.cpp/issues/28860), [问题 #28933](https://github.com/ggml-org/llama.cpp/issues/28933)

---

### **6. 对应用开发者的意义**  
- **对于 LLM 网关与智能体**：在 SYCL 上谨慎使用 `--split-mode tensor`——启用 KV 缓存量化时可能遭遇 3 倍性能下降甚至卡死（`#26409`）。  
- **对于边缘部署**：新的 Hexagon NPU 构建支持 ARM64 Windows 边缘推理——非常适合设备端 AI 智能体。  
- **对于高吞吐系统**：为 Qwen3.8-Flash-Next 启用 MTP 支持（`#28243`）以减少加载时间与内存占用。  
- **对于安全与调试**：在 `#28860` 修复前避免在 SYCL 中使用 `ngram-mod`——可能导致系统内存耗尽。  
- **对于自定义工具调用**：使用新的 Ling 3.0 解析器（`#28682`），若 XML 触发失败，可考虑采用 JSON 工具调用格式（`#26530`）。  

> 📌 **可操作建议**：若使用 Intel Arc B70 搭载 MoE 模型，请确保版本不低于 `b11018`，以避免 `mem allocate` 崩溃。请关注 `#23769` 获取补丁更新。

---  
*本简报基于 GitHub 活动生成（2026-09-18）。*  
🔗 [llama.cpp GitHub](https://github.com/ggml-org/llama.cpp) | 📊 [变更日志摘要](https://github.com/ggml-org/llama.cpp/issues/9289)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-18**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展对新兴模型和硬件后端的支持，关键工作正在推进 MLX 对低比特量化权重（Bonsai 的 1 位/2 位）的集成以及 ARM64 上的 Vulkan 支持。高优先级的稳定性修复包括 MLX nvfp4 上的推测解码阻塞问题，以及 Windows 启动托盘失败的问题。与此同时，开发者正推动通过新标志如 `--nodraft` 和对 `system`、`user`、`assistant` 之外角色的扩展支持，实现对推理行为更精细的控制。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
- **破坏性变更**：由于默认使用云模型带来的隐私顾虑，内置 CLI 代理已在 PR #18393 中移除。用户现在需通过 `--agent` 标志或外部启动器显式启用（问题 #18490）。  
- **API 更新**：`/v1/responses` 现在拒绝 `agent_message` 类型输入（问题 #18286），客户端需适配严格的 OpenAI 兼容消息类型。

---

### **3. 新模型与硬件支持**  
- ✅ **新架构支持**：已请求原生支持 `spark2_5`（Spark-X2.5-4B / 1.7B）——目前受运行时识别限制（问题 #18195）。  
- 🚀 **MLX 后端扩展**：  
  - 通过 MLX 后端实验性支持 Bonsai 的 1 位/2 位量化权重（问题 #18515）。  
  - `mlxrunner` 中已实现进度跟踪与阻塞检测（PR #17834）。  
- 💻 **ARM64 上的 Vulkan**：Linux ARM64 Docker 镜像现已包含 Vulkan 后端支持（PR #18502），可在运行 Asahi Linux 的 Apple Silicon M1 设备上实现 GPU 加速。  
- 🖥️ **Windows Vulkan 修复**：解决在多模型加载过程中 AMD RX 6750 XT 出现的崩溃问题（问题 #18494）。

---

### **4. 性能与优化**  
- ⚡ **推测解码控制**：提出 `--nodraft` 标志（问题 #18517）以完全禁用推测解码——对调试和可复现性至关重要。  
- 📈 **内存与负载优化**：  
  - `mlxrunner` 现在报告加载进度并检测阻塞（PR #17834），防止慢模型加载时过早超时。  
  - 推测解码期间的 KV 缓冲区释放已优化，避免内存膨胀（PR #18510）。  
- 🔧 **预热优化**：MLX 编译路径现已在加载后预热（PR #16085），在不影响后续请求性能的前提下降低冷启动 TTFT。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 备注 |
|--------|------|--------|-------|
| 🔴 高 | MLX nvfp4：在持续负载下，预填充阶段请求出现阻塞（`processed=total-1`）；仅能通过 SIGTERM 恢复（问题 #18505） | 开放 | 对生产环境负载下的推理至关重要。尚未有修复 PR。 |
| 🔴 高 | Windows 11 托盘应用显示图标但无法启动服务；手动执行 `ollama serve` 可正常工作（问题 #18507） | 开放 | 影响桌面用户；可能与进程创建或服务初始化有关。 |
| 🟡 中 | `glm-ocr` 在文本识别时进入无限循环（问题 #16892） | 开放 | 使用图像输入可复现；输出内容完全重复。 |
| 🟡 中 | `minicpm5-2b` 原生工具调用解析失败（问题 #18483） | 开放 | 工具调用输出包含格式错误的 XML 片段，如 `name="get_weather"> name="city..."`。 |
| 🟡 中 | `glm-5.3-flash` 通过 Ollama Cloud 发出格式错误的字符串编码工具调用（问题 #18506） | 开放 | `calls` 字段中 JSON 结构间歇性损坏。 |

> *注：多个回归修复正在通过 PRs (#18510, #18516, #18438) 进行中，但核心问题仍处于开放状态。*

---

### **6. 对应用开发者的启示**  
- **工具调用灵活性**：预计将增加对自定义角色如 `"tool"`（问题 #6322, #18509）的支持，但当前限制仍需通过 `system` 或 `user` 角色绕行。  
- **调试与可复现性**：使用 `--nodraft`（提案于 #18517）可隔离推测解码影响，获得确定性输出。  
- **企业部署**：建议禁用自动代理启动（因 #18393 移除）；在安全环境中使用显式标志或外部代理。  
- **跨平台可靠性**：在 Windows（托盘问题）或 ARM64（Vulkan 配置）部署时需谨慎——请使用最新构建进行测试。  
- **监控能力**：通过设置 `OLLAMA_METRICS` 环境变量（PR #18508）启用 Prometheus 指标，适用于 Kubernetes/Docker 环境的可观测性。

👉 *推荐操作*：  
- 关注 [问题 #18515](https://github.com/ollama/ollama/issues/18515) 以获取低比特量化支持进展。  
- 查阅 [PR #18519](https://github.com/ollama/ollama/pull/18519) 了解预览通道的早期访问信息。  
- 审查模型依赖项以确保许可证合规（参见 [问题 #3185](https://github.com/ollama/ollama/issues/3185)）。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 消息简报 – 2026-09-18

---

### **1. 今日重点**  
LiteLLM 持续强化其代理与可观测性栈，针对认证、成本追踪及模型路由的关键问题进行了修复。今日主要的 PR 修复了基于 JWT 的访问控制、流式使用日志记录以及团队限制下的模型可见性等长期存在的问题。新增对 Amazon Transcribe 透传支持及增强的 MCP 工具链，使 AI 代理工作流更加稳健。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性配置变更。未发布新版本。

---

### **3. 新模型与硬件支持**  
- ✅ **Amazon Transcribe 批处理任务**：通过 `POST /transcribe/{Operation}` 原生透传支持，采用完成时间计价（PR [#41515](https://github.com/BerriAI/litellm/pull/41515)）。  
- ✅ **Fal.ai 视频模型**：功能请求 (#26886) 正在寻求对 Sora 2 与 Veo 3.1 的支持——待实现。  
- ✅ **Qwen-Image 与 Wan 文本生成图像**：请求为阿里云模型添加原生 DashScope 支持（PR #28763）。  
- ✅ **Bourse 服务商**：作为功能请求（PR #41042）已添加支持 OpenAI 兼容代理商，目前可通过 OpenAI 格式兼容正常运行。

---

### **4. 性能与优化**  
- 📈 **流式成本准确性**：已修复确保即使最终数据块的 `choices` 非空，也能正确发出 `usage` 数据（PR #36168）。防止因丢失 `cached_tokens` 导致错误计费。  
- 🔍 **可观测性改进**：  
  - 被拦截的网络搜索现在继承父会话追踪（PR #41711）。  
  - 透传端点现在会记录上游 URL 标签，以更好关联 Langfuse 及支出日志（PR #30033）。  
- ⚙️ **请求路由效率**：  
  - JWT 认证用户现在尊重团队/用户级 MCP 工具搜索设置（PR #41710）。  
  - 预先触发的 OAuth 401 挑战现在基于允许的服务器进行拦截（PR #41709）。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|--------|------|--------|-------|
| 🔴 高 | `/cursor/chat/completions` 在 v1.88.1+ 版本中未记录在 SpendLogs（支出日志）中 | 开放 | [Issue #30126](https://github.com/BerriAI/litellm/issues/30126) |
| 🔴 高 | 流式透传请求在飞行中出现错误（超时/连接重置）时无法记录使用量/成本 | 开放 | [Issue #30667](https://github.com/BerriAI/litellm/issues/30667) |
| 🟡 中 | Prisma 重连失败导致代理不稳定 | 开放 | [Issue #26886](https://github.com/BerriAI/litellm/issues/26886) |
| 🟡 中 | `GET /v1/models` 忽略团队层级的 `allowed_models` 限制 | 开放 | [Issue #41595](https://github.com/BerriAI/litellm/issues/41595) |
| 🟡 中 | Azure 部署定价偶尔记录为 `$0.0000` | 开放 | [Issue #41605](https://github.com/BerriAI/litellm/issues/41605) |

> ✅ *注：多个稳定性修复正在通过 PR 积极推进（例如 PR #41706、#41707、#41708），表明核心可靠性提升正持续发力。*

---

### **6. 对应用开发者的影响**  
- **适用场景**：若您正在使用 Cursor、MCP 或 Langfuse 集成构建 AI 代理，今日更新提升了安全性（JWT/MCP 门控）、可观测性（会话追踪、按模型预算）和成本准确性。  
- **迁移/采纳建议**：请确保您的代理已更新至 v1.88.1 以上版本，以避免遗漏 `cursor/chat/completions` 日志。建议通过新 UI 表单启用按模型预算功能（PR #41708）。  
- **成本控制**：注意分层定价配置——当前 `*_above_200k_tokens` 字段被忽略（Issue #30135）；请暂用自定义成本函数替代。  
- **未来兼容性**：关注 Langfuse v4 迁移（PR #36741）及 Bourse 服务商集成（PR #41042）相关 PR，以增强多提供商容错能力。

👉 **推荐操作**：  
- 若使用 `cursor`、`mcp` 或 `langfuse`，请将代理更新至最新稳定版。  
- 审查 `model_info` 定价配置中的分层费率。  
- 测试带防护机制及上游流失败情况下的流式行为（Issue #41611）。  

---  
*数据来源：[GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-18**

---

### **1. 今日亮点**  
Unsloth 发布 **v0.1.810-beta**，新增完整 Docker 支持（含多用户账户）、AMD RDNA1+2 GPU 加速、FP8/INT8 扩散模型推理，以及 Windows 上的 ARM64 CUDA。此次更新显著提升了在异构环境中的部署灵活性。同时，多个 PR 聚焦于提升 Studio 的稳定性、安全沙箱机制和远程访问容错能力。

> 🔗 [发布 v0.1.810-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.810-beta) | [Docker 使用指南](https://unsloth.ai/docs/get-started/insta)

---

### **2. 版本发布与破坏性变更**  
- **v0.1.810-beta**：重大更新，新增功能包括：
  - 多用户 Docker 镜像支持
  - AMD RDNA1+2 GPU（ROCm）兼容性
  - Windows 上的 ARM64 CUDA 支持
  - FP8/INT8 扩散模型推理
  - 增强训练与 GRPO 管道优化
- **注意**：新 Docker 镜像现已可通过 `docker pull unsloth/unsloth:latest` 获取，但部分平台（如 Studio UI）仍使用旧版本。详见 [#7999](https://github.com/unslothai/unsloth/issues/7999)、[#6180](https://github.com/unslothai/unsloth/issues/6180)、[#9583](https://github.com/unslothai/unsloth/issues/9583) 关于 Docker Hub 同步问题。

---

### **3. 新模型与硬件支持**  
- **AMD GPU**：通过 ROCm 完全支持 RDNA1+2 架构；已集成至 `unsloth/unsloth-rocm` 镜像（PR #11218）。
- **硬件后端**：新增 Windows 上的 ARM64 CUDA 支持（对边缘设备与云工作负载至关重要）。
- **量化格式**：实验性 FP8 与 INT8 扩散推理支持现已启用。
- **模型架构**：
  - Qwen3.8-Flash-Next（MTP）现已被支持，但报告存在与 MTP 相关的崩溃问题（问题 #11143、#11219）。
  - GPT-OSS-120B-K4-KM 已在 Studio 中正式支持（尽管输出格式不匹配问题已在 #10252 中指出）。

---

### **4. 性能与优化**  
- **LoRA SFT 速度提升**：在 B200 上，`unsloth-cli.py` 将步骤耗时从 **0.83秒 → 0.66秒**（Qwen3.5-9B 的 120 步 SFT），主要得益于减少 CPU 侧内核启动开销（PR #10744）。
- **进一步优化**：后续补丁（#11238）通过优化模型无关的 CPU 逻辑，再节省约 **每步 0.07秒**——累计提升达 **每步约 0.17秒**。
- **Studio 启动时间**：macOS 更新延迟已通过避免冗余二进制文件重探测而降低（PR #11237）；此前耗时 42–59 秒，现低于 1.5 秒，接近 Linux 水平。
- **缓存恢复**：启动时修复逻辑现在会尝试修复被隔离的 `llama.cpp` 二进制文件，而非静默失败（PR #10494）。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 影响 |
|--------|------|-------|--------|
| ⚠️ 高 | `Qwen3Attention.apply_qkv` 缺失属性（问题 #2587） | 已关闭 | 导致 Qwen3 模型的 GRPO 微调中断 |
| ⚠️ 高 | `LLVM ERROR: Unsupported rounding mode for f16→f16 conversion`（问题 #2491） | 已关闭 | 阻碍在 Ubuntu 24.04 上编译 |
| ⚠️ 中 | MTP 草稿崩溃（`GGML_ASSERT(ggml_can_repeat)`），RTX 5080（问题 #11219） | 开放中 | 阻止 Qwen3.8-Flash-Next 加载 |
| ⚠️ 中 | TP 下 KV 缓存量化未反映在上下文长度中（问题 #9697） | 已关闭 | 导致内存使用量报告误导 |
| ⚠️ 低 | Studio 在 `0.0.0.0` 上无法启动（问题 #11187） | 开放中 | 限制远程访问配置 |

> ✅ 高严重性回归问题已合并修复（如 #2587、#2491）。MTP 崩溃仍开放，影响新型硬件。

---

### **6. 对应用开发者的意义**  
- **多主机部署**现可通过新 Docker + 多用户支持实现（PR #11218），支持跨集群的可扩展代理编排。
- **跨平台开发**更便捷：Windows 上的 ARM64 CUDA 与 AMD ROCm 支持，使多样化硬件上的工作流保持一致。
- **性能敏感型应用**应采用最新补丁的 `unsloth-cli.py`——预计在 B200 与 H100 上可实现高达 **20% 的 LoRA 训练加速**。
- **注重安全的开发者**应关注持续加固进展：操作系统沙箱（PR #11209）、网络策略强制（PR #11172）、防病毒恢复（PR #10494）均提升了运行时安全性。
- **避免使用过时的 Docker 镜像**——确保使用 `unsloth/unsloth:latest` 或本地构建，以防止版本不匹配（参见 #7999、#9583）。

> 🛠️ **建议**：立即升级至 `v0.1.810-beta` 以获得最佳性能与兼容性，尤其是在部署于 AMD 或混合硬件环境时。若使用 Qwen3.8-Flash-Next 或 GPT-OSS-120B，需关注开放的 MTP/GGUF 问题。

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*