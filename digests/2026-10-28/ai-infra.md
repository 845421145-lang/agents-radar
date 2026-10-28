# AI 基础设施日报 2026-10-28

> 生成时间: 2026-10-28 01:35 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目AI基础设施生态报告 – 2026-10-28

---

### **1. 生态概览**  
AI推理与服务生态正迅速成熟为一个多层级、硬件感知的栈结构，专为下一代加速器（如NVIDIA Blackwell SM120和AMD MI355X）优化。各项目正汇聚于关键能力：高吞吐量的推测性解码、高效的KV缓存管理，以及对多模态和具备推理能力模型的无缝支持。尽管vLLM和SGLang在分布式推理性能上领先，llama.cpp和Ollama则在本地运行时部署中占据主导地位——尤其是在GGUF格式和Apple Silicon平台。LiquidAI推出的LFM3系列标志着向设备端音频、视觉和决策代理的转变，加速了智能工作流的去中心化进程。

---

### **2. 活动对比**

| 项目       | 开放问题数 | 近24小时合并的PR数 | 发布版本 | 关键状态 |
|------------|-------------|------------------------|----------|------------|
| **vLLM**   | 172         | 9                      | 无       | 高稳定性压力；关键修复待处理 |
| **SGLang** | 168         | 12                     | 无       | 积极推进PD解耦；CI不稳定问题已指出 |
| **llama.cpp** | 245      | 11                     | 1个新CLI标志 | RTX 5090及Intel iGPU上存在稳定性问题 |
| **Ollama** | 214         | 5                      | v0.40.12-rc1 | RC阶段；模型相关回归问题活跃 |
| **LiteLLM** | 147        | 7                      | v1.106.5+（4次发布） | 以安全为核心；开发分支中存在紧急修复 |
| **Unsloth** | 159       | 6                      | 无       | 用户界面/体验优化；训练稳定性问题 |

> *注：问题数量为截至2026-10-28的GitHub开放问题数。PR数反映近期集成活动。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构                | 支持项目                              | 状态与备注 |
|-------------------------------|----------------------------------------|----------------|
| **LFM3-Audio/Omni/Decision (GGUF)** | **llama.cpp**, **Ollama**, **Unsloth** | 三者均已添加基础支持；Ollama仍受MLX运行时错误影响（#19343）。 |
| **Qwen3.8-Flash-Next-NVFP4 (SM120)** | **SGLang**, **vLLM**                   | 两者均在积极测试；SGLang已修复EP2崩溃；vLLM因解码吞吐过低受阻（#56892）。 |
| **DeepSeek-V4.1-Flash (SM120)**   | **vLLM**                               | 唯一支持该项目；重大吞吐问题持续存在。 |
| **AMD MI355X (gfx950)**           | **vLLM**, **SGLang**                   | vLLM在FP8/ROCm优化方面领先；SGLang新增HiCache智能体配方。 |
| **Apple Silicon (MLX)**           | **Ollama**, **Unsloth**, **llama.cpp** | Ollama支持并发生成；Unsloth新增Flows工具链。 |
| **exllama3 引擎**               | **Unsloth**                            | 正在开发中；尚未公开发布。 |

> ✅ **胜出者**：**llama.cpp** 和 **Ollama** 在*新模型*采纳上领先（尤其是LFM3），而 **vLLM** 和 **SGLang** 在*硬件特定优化*方面更胜一筹。

---

### **4. 性能前沿**

| 优化重点                    | 领先项目                         | 关键进展 |
|-------------------------------|------------------------------------------|------------------|
| **KV缓存与卸载**             | vLLM, SGLang                             | 多级卸载RFC（#38260）；llama.cpp实现混合缓存改进（+7%速度）。 |
| **推测性解码**                | vLLM, SGLang, llama.cpp                  | vLLM探索手动融合；SGLang修复竞态条件；llama.cpp重新实例化CUDA图。 |
| **量化效率**                  | vLLM, llama.cpp, Unsloth                 | W4A16内核（AMD）；稀疏聚集K缓存；FP8 n-gram缩放修复正在审查。 |
| **分布式服务**                | vLLM, SGLang                             | SGLang默认启用PD解耦；vLLM提出可重用KV压缩层方案。 |
| **内核级优化**                | vLLM, SGLang, llama.cpp                  | CDNAHybridW4A16LinearKernel；GLM-5.2-FP8的W8A16 GEMM；Hexagon TOP_K提速。 |

> 🔥 **趋势**：针对特定硬件的内核调优（如SM120、gfx950）已成为性能差异的核心。

---

### **5. 层级定位**

| 项目       | 主要层级                | 角色摘要 |
|------------|------------------------------|--------------|
| **vLLM**   | **高性能推理引擎** | 专为数据中心GPU的大规模、低延迟服务优化。核心关注点：可扩展性、效率和多GPU协同。 |
| **SGLang** | **分布式推理框架** | 支持PD解耦、智能体调度和高吞吐流水线。位于引擎与网关之间。 |
| **llama.cpp** | **本地运行时 / 边缘推理** | 设备端CPU/GPU加速推理的首选。适用于注重隐私保护、低资源消耗的部署场景。 |
| **Ollama** | **模型网关 / 本地服务器** | 连接用户接口与后端引擎（vLLM、llama.cpp等）。关注点：易用性、流式传输和模型生命周期管理。 |
| **LiteLLM** | **通用API网关**    | 整合多个后端（OpenAI、Anthropic、自定义）。优先保障跨提供商的成本控制、路由与安全。 |
| **Unsloth** | **智能体平台 + 训练套件** | 全栈解决方案，用于构建、微调和部署本地智能体。融合训练、推理与可视化界面。 |

> 📌 **战略洞察**：生态正出现分化——**工程师**使用vLLM/SGLang搭建基础设施，**开发者**使用Ollama/liteLLM构建API，**构建者**则使用Unsloth实现智能体工作流。

---

### **6. 趋势信号**

1. **硬件专业化已成为必然要求**  
   - SM120（Blackwell）和MI355X上的严重缺陷表明，通用推理已不再可行。开发者必须选择与目标硬件匹配的引擎。

2. **多模态智能体正向本地迁移**  
   - LFM3在llama.cpp、Ollama和Unsloth中的支持，使实时音频、视觉与决策能力从云端转向边缘——推动对GGUF和MLX兼容性的需求。

3. **稳定性优先于速度**  
   - 尽管优化力度加大，但项目仍频繁遭遇崩溃（RTX 5090、Intel iGPU、macOS Metal）。这预示着成熟度拐点的到来：可靠性已成为竞争的关键差异化因素。

4. **以智能体为中心的架构正在兴起**  
   - `OLLAMA_NUM_PARALLEL`、Flows引擎和MCP工具链等功能表明，焦点正从单标记推理转向长周期、多步骤的智能体执行。

5. **安全与成本控制不容妥协**  
   - LiteLLM的安全警告和预算修复反映出企业对成本泄漏和供应链风险日益增长的关注。

---

### ✅ **应用开发者建议**
- **大规模生产推理**：使用 **vLLM** 或 **SGLang**，并搭配经验证的硬件配置（在#56892解决前避免使用SM120）。
- **边缘/本地部署**：选择 **llama.cpp** 或 **Ollama**——但需验证量化方案（如`qwen2.5-coder` Q2_K存在缺陷），并在#19343修复前避免在MLX上使用`lfm3`。
- **智能体系统**：利用 **Unsloth** 实现全栈自主，但需监控Windows平台的训练稳定性及上下文溢出问题。
- **多供应商路由**：**LiteLLM** 仍是首选——升级至v1.106.5+以避免预算计算偏差。
- **始终验证构建**：特别是LiteLLM和Ollama——安全补丁紧急，且未必包含在稳定版中。

> 🔗 *关注以下PR：#56892 (vLLM), #43412 (SGLang), #19343 (Ollama), #47924 (LiteLLM)* ——这些是你的主要风险指标。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-28

---

### **1. 今日亮点**  
vLLM 项目正加速推进对下一代硬件的支持，当前在 **SM120（Blackwell RTX PRO 6000）** 和 **ROCm gfx950（MI355X）** 上积极优化 Qwen3.8 与 DeepSeek-V4.1-Flash 模型的性能。新架构上出现了与推测解码和 KV 缓存卸载相关的严重稳定性问题，同时一项重要 RFC 提出可复用、可迁移的 KV 压缩层，以实现高效模型存储与迁移。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。无新版本发布，也未观察到 API/配置的重大更改。

---

### **3. 新模型与硬件支持**  
- **SM120（NVIDIA Blackwell, RTX PRO 6000 Max-Q）**:  
  - 正在通过 #56892 推进 `DeepSeek-V4.1-Flash` 在 SM120 上的启用——目前受制于解码吞吐量过低及 CUDA Graph 不可用的问题。  
  - [Issue #56892](https://github.com/vllm-project/vllm/issues/56892) | [PR #52487](https://github.com/vllm-project/vllm/pull/52487)（推测解码修复）

- **ROCm gfx950 / MI355X**:  
  - 针对 `Qwen3.8-2.4T-A95B`、`Qwen3.8-Flash-Next` 与 `Qwen3.8-27B-FP8` 的性能优化路线图已启动（通过 #57149、#59575）。  
  - AMD 工程师正在积极处理高并发下 `VLLM_ROCM_USE_AITER=1` 导致的精度崩溃问题（#60160）。

- **新量化支持**:  
  - 在 #42640 中为 AMD CDNA GPU（`gfx942/gfx950`）添加了实验性 W4A16 内核，填补了 ROCm 上 GPTQ/AWQ 模型的关键支持空白。

---

### **4. 性能与优化**  
- **推测解码**:  
  - 正在探索 AR+RMSNorm+Quant 的原型手动融合方案（#42597），旨在减少 TP>1 场景下的内核调用次数。  
  - 一项关键原型（POC）针对专用草稿池，缓解了混合 GDN + DFlash 缓存池崩溃问题（#59117）。

- **KV 缓存与卸载**:  
  - 多级卸载通过 `OffloadingConnector` 正在进行 RFC 讨论（#38260），支持 CPU → 存储层级化卸载。  
  - 提出可复用、可插拔的 KV 压缩层用于传输/存储（#59538），有望大幅降低带宽与存储成本。

- **内核级优化**:  
  - 为 DeepSeek-V4 的 C4A 预填充路径引入了 `dequantize_and_gather_k_cache` 的稀疏聚集变体（#42504），提升内存效率。  
  - 为 AMD MI300 系列新增 `CDNAHybridW4A16LinearKernel`（#42640），旨在提升 ROCm 平台利用率。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 摘要 | 修复状态 |
|--------|------|------|----------|
| 🔴 高 | #56892 | 在 SM120（Blackwell）上使用 `--enforce-eager` 时解码吞吐量极低；CUDA Graph 无法使用 | 进行中 |
| 🔴 高 | #60160 | 在 MI355X 上使用 `VLLM_ROCM_USE_AITER=1` 时高并发下出现精度崩溃 | 开放 |
| 🟡 中 | #63602 | P2P KV 卸载层级在对端故障时不快速失败 | 开放 |
| 🟡 中 | #63584 | Rust 前端在 Qwen3-ASR 的 `auto` 工具解析失败时崩溃 | 开放 |
| 🟡 中 | #63794 | 使用工具时，DSv4.1-Flash 响应中的波斯语半间距（U+200C）被移除 | 开放 |

---

### **6. 对应用开发者的启示**  
- **针对 Blackwell 或 MI355X 上推理密集型应用**：请勿部署 `DeepSeek-V4.1-Flash` 或 `Qwen3.8-*` 模型，直到 #56892 和 #57149 修复完成——预计吞吐量差且存在崩溃风险。谨慎使用 `--enforce-eager`，可能进一步降低性能。
- **针对使用结构化输出或工具调用的智能体**：注意 Rust 前端（#63584）和波斯语文本处理（#63794）中的缺陷；建议准备降级方案或手动后处理。
- **针对长上下文或高吞吐系统**：关注即将推出的多级卸载与 KV 压缩 RFC（#38260、#59538）。这些功能将支持大规模模型在分布式基础设施上的可扩展、低成本部署。
- **针对性能敏感场景**：关注 `CDNAHybridW4A16LinearKernel` 与 `sparse-gather K-cache` 的 PR（#42640、#42504），它们可在支持硬件上显著提升内存与计算效率。

> ✅ **建议**：在这些关键修复落地前，建议锁定稳定版 vLLM（如 v0.31.0 及以上）。仅在避免工具解析问题或已验证模型兼容性的情况下，才使用 `vllm-rs`。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 消息简报 – 2026-10-28

---

### **1. 今日亮点**  
SGLang 继续在可扩展、高性能推理方向上积极推进，取得重大进展：**预填充-解码（PD）分离架构优化**、**消费级 AMD GPU 的 ROCm 支持**，以及**推测解码稳定性修复**。关键 PR 包括为 GLM-5.2-FP8 提升性能的 GEMM 内核，以及针对 HiCache 竞态条件和 NVFP4 模型下 DSpark 崩溃问题的关键修复。生态体系正迅速成熟，新增了 AMD 代理工作流文档，并显著提升了 CI 可靠性。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。无新版本发布，亦无影响 API/配置的变更。

---

### **3. 新模型与硬件支持**  
- **AMD 消费级 GPU**：通过 #30599 跟踪对 RDNA3（`gfx1100/gfx1101`）和 RDNA4（`gfx1200/gfx1201`）的官方支持——这是将 SGLang 覆盖范围从数据中心 Instinct 卡拓展至消费级产品的战略性举措。  
- **Qwen3.8-Flash-Next-NVFP4 (SM120)**：已进入积极测试与优化阶段；PR #44291 已修复 EP2 崩溃问题（非法内存访问）。  
- **Nemotron-3-Embed-1B-BF16/NVFP4**：通过 PR #45885 实现原生支持，适用于以检索为导向的嵌入式工作负载。  
- **Hunyuan3D**：PR #46905 在 GPU 端添加网格生成功能，显著加速形状导出。  
- **Apple Silicon (MLX)**：重构路线图 (#32321) 正推进中，包含由 Torch 主导的 SRT 路径及导出的 MLX 模型区域。

---

### **4. 性能与优化**  
- **GLM-5.2-FP8 解码**：新推出的 W8A16 小 M GEMM 内核在 GB300（TP4）上相比默认的 W8A8 路径，端到端延迟降低 **最高达 6.8%**，且未增加显存占用（#45862）。  
- **HiCache 效率提升**：PR #46903 将 ack 队列中的 O(k*N) `list.pop(0)` 移除操作替换为切片删除，高吞吐场景下性能显著提升。  
- **代理缓存调度**：路线图 #43098 引入跨引擎的超节点级 KV 缓存共享机制，可在多引擎部署中更高效利用 L1/L2 缓存。  
- **AMD MI355X FP8 代理配方**：PR #46757 更新文档，涵盖 Qwen3.5 的 GPU 本地与 HiCache 两种模式。  
- **内存池与索引器重构**：PR #44350 将 DSA/DSV4 索引器迁移至 DeepGEMM 的 fp8_fp4 MQA logits 接口，与上游变更保持一致，提升可维护性。

---

### **5. 稳定性与回归问题**  
- **推测解码关键崩溃（NVFP4）**：PR #43412 报告在首个非贪婪请求时出现 SIGKILL 崩溃，原因是捆绑版 cccl 与 pip cu13 工具链不匹配导致 FlashInfer JIT 失败。*修复待完成*。  
- **HiCache 竞态条件（PD 预填充）**：PR #44070 记录了主机内存仅前缀重叠时早期缓存前缀发送过程中的静默旧 KV 传输问题，可能导致错误解码输出。*修复已合并*。  
- **非法内存访问（EP2, SM120）**：PR #44291 识别出在 RTX PRO 6000 上使用 `--tp-size 2 --ep-size 2` 运行 Qwen3.8-Flash-Next-NVFP4 时的崩溃问题。*调查中*。  
- **AMD MoE 偏置精度缺陷**：PR #44794 揭露了在 fp32 aiter 路径之前，fp32 MoE 修正偏置被强制转为 bf16，影响 GLM-5.x 路由准确性。*需修复*。  
- **CI 不稳定**：问题 #42752 跟踪持续存在的测试抖动与基础设施故障，影响开发效率。

---

### **6. 对应用开发者的影响**  
- **尽早适配 PD 分离架构**：随着 PD 在大规模部署中已成为默认配置，开发者应谨慎启用 `SGLANG_DISAGG_PREFILL_EARLY_SEND_CACHED_PREFIX=1`，并监控 HiCache 陈旧问题（#44070）。  
- **优先使用稳定的推测路径**：在 #43412 修复前，请避免在 NVFP4 模型上使用 `temperature > 0`；建议使用贪婪策略（temp=0）或切换至其他后端。  
- **充分利用 AMD 与 Apple Silicon 支持**：若目标为消费级 GPU 或 Mac 平台，请遵循 Apple Silicon 重构计划 (#32321) 和 AMD 启用方案 (#30599)，确保未来兼容性。  
- **优化低延迟推理**：对于 Hopper+ 架构上的 GLM-5.2-FP8 模型，建议使用新发布的 W8A16 GEMM 内核（PR #45862），可获得可观的延迟降低。  
- **关注 CI 健康状态**：请准备应对因不稳定的 CI（#42752）导致的间歇性测试失败；建议合并前进行本地验证。

> 🔗 [查看完整问题追踪列表](https://github.com/sgl-project/sglang/issues) | [PR 摘要](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-28**

---

### **1. 今日亮点**  
最新更新聚焦于扩展**多模态与推理能力**，已将 LiquidAI 的 LFM3 系列（音频、全模态、决策模型）完整加入模型注册表。关键基础设施改进包括通过 `--models-memory-max` 实现动态内存管理，以及通过优化 MTP 层处理和 GPU 图重实例化逻辑，提升推测解码的稳定性。

---

### **2. 发布与破坏性变更**  
- **新增 CLI 标志**：`--models-memory-max`（服务器端）支持当模型内存占用超过可配置阈值时动态卸载，显著提升受限系统上的多模型并发性能。[PR #21231](https://github.com/ggml-org/llama.cpp/pull/21231)  
- **API 暴露**：推理努力等级（最小 → 最大）现已通过能力探测在聊天模板中暴露，实现对不同推理模式下代理行为的细粒度控制。[PR #31271](https://github.com/ggml-org/llama.cpp/pull/31271)  
- **延迟工具支持**：`common` 模块现已支持延迟工具与 `tool_reference` 内容部分，增强代理工作流中的工具编排能力。[PR #31256](https://github.com/ggml-org/llama.cpp/pull/31256)

---

### **3. 新模型与硬件支持**  
- **新增模型**：  
  - `LiquidAI/LFM3-Audio-2B`、`LFM3-Omni-2B`、`LFM3-1.7B`、`LFM3-VL-2B` —— 均为 GGUF 兼容，支持音频、视觉与多模态推理。  
  - `LiquidAI/d1-2B`、`d1-omni-2B` —— 针对结构化输出与动作选择设计的决策模型。  
  [PR #31257](https://github.com/ggml-org/llama.cpp/pull/31257)，[PR #31252](https://github.com/ggml-org/llama.cpp/pull/31252)，[PR #31275](https://github.com/ggml-org/llama.cpp/pull/31275)  
- **硬件后端**：  
  - Vulkan：修复了 LLVMPipe 与 Intel Gen9.5 iGPU（UHD 630）上 `MUL_MAT` 中的 `dim 3 广播` 问题。[PR #31239](https://github.com/ggml-org/llama.cpp/pull/31239)  
  - SYCL：现在在缓冲区分配时强制执行显存限制，防止 Intel Arc B70 上出现 OOM 崩溃。[PR #31285](https://github.com/ggml-org/llama.cpp/pull/31285)  
- **量化**：持续推进 FP4 四舍五入模式（四舍六入）及 Blackwell 显卡上 IQ3_S 的鲁棒性优化。[Issue #31012](https://github.com/ggml-org/llama.cpp/issues/31012)

---

### **4. 性能与优化**  
- **MoE 缓存改进**：新引入的混合缓存机制（`ClassLRU`），结合 LRFU 与受 MQ 启发的排序策略，在 QFN 上实现 **+6% 解码速度**，在 GLM 上实现 **+7%**，且减少 **8% 的 GPU 上传次数**。[PR #31233](https://github.com/ggml-org/llama.cpp/pull/31233)  
- **推测解码**：  
  - `--moe-cache-cpu-share auto` 提升 MoE 模型中 CPU-GPU 资源平衡性。[PR #31286](https://github.com/ggml-org/llama.cpp/pull/31286)  
  - CUDA 图现在在核簇维度变化时自动重新实例化（对 Hopper SM120 至关重要）。[PR #31284](https://github.com/ggml-org/llama.cpp/pull/31284)  
- **内核优化**：  
  - Hexagon 后端：更快的 `TOP_K` 采样将 DFlash 配置下的草稿延迟降低高达 **42%**。[PR #31279](https://github.com/ggml-org/llama.cpp/pull/31279)  
  - 测试套件：通过重构 `save_models`，加速张量数据生成与模型保存过程。[PR #31145](https://github.com/ggml-org/llama.cpp/pull/31145)

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - **CUDA 图挂起** 在 RTX 5090 笔记本（sm_120）上：导致 GPU 通道挂起（RC 监控器 + Xid 8）。临时解决方案：`GGML_CUDA_DISABLE_GRAPHS=1`。[Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)  
  - **Vulkan GPU 挂起** 在 Intel Gen9.5 iGPU（UHD 630）上使用 `q8_0` KV 缓存时：`vk::Error` 被抛出为 `std::terminate`。[Issue #29054](https://github.com/ggml-org/llama.cpp/issues/29054)  
- **正确性缺陷**：  
  - 在贪婪采样下，推测解码与原生输出在**量化目标**（如 Q4_K_M）上出现偏差。仍在调查中。[Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618)  
  - 混合型 LFM2 模型在共批处理多个序列时会损坏递归状态。[Issue #29002](https://github.com/ggml-org/llama.cpp/issues/29002)  
- **回归说明**：  
  - Windows CUDA 预编译二进制文件仍停留在构建版本 `b11828`，尽管发布标签已更新。[Issue #31085](https://github.com/ggml-org/llama.cpp/issues/31085)  
  - MSVC 无法检测 Intel CPU 上的 AVX-VNNI 支持。[Issue #28295](https://github.com/ggml-org/llama.cpp/issues/28295)

---

### **6. 对应用开发者的意义**  
- **构建更强大的代理**：借助 LFM3 支持，开发者现在可直接在设备上部署**具备音频感知能力的代理**（实时转录、语音对话）与**结构化决策模型**。使用 `/v1/realtime` 接口搭配 `LFM3-Audio-2B` 或 `LFM3-Omni-2B` 即可。[PR #31287](https://github.com/ggml-org/llama.cpp/pull/31287)  
- **灵活调节内存与延迟权衡**：使用 `--models-memory-max` 动态管理多用户环境中的模型加载。配合 `--moe-cache-cpu-share auto` 可实现 MoE 模型的最佳性能。  
- **规避潜在陷阱**：若运行在 RTX 5090 笔记本上，请禁用 CUDA 图（`GGML_CUDA_DISABLE_GRAPHS=1`）。避免在旧款 Intel iGPU 上使用 `q8_0` KV 缓存。在量化模型上监控推测解码行为——务必仔细验证输出结果。  
- **面向未来的构建方案**：仅在应用 PR #31276 后，才建议使用 `clang-cl` 并启用 `-mavx512bf16`，以避免编译失败。  

> 🔗 *保持同步：[llama.app](https://llama.app)，[GitHub 发布页](https://github.com/ggml-org/llama.cpp/releases)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### **1. 今日亮点**  
Ollama 继续解决模型服务中的关键稳定性问题，尤其是在流式推理和 GPU 后端兼容性方面。主要进展包括修复 LFM3 GGUF 支持问题以及在长时间拉取过程中提升系统韧性；当前工作重点在于增强 MLX 并发能力，并解决在新款硬件（如 RTX 5060 Ti（Blackwell）和 AMD Radeon RX 6750 GRE）上持续崩溃的问题。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何内容。*  
然而，**v0.40.12-rc1** 已在问题追踪中活跃，多个回归问题与近期变更相关——最显著的是 `unknown model architecture: 'lfm3'` 错误（#19347）以及 `qwen2.5-coder` 低比特量化损坏（#18252）。用户应在这些问题解决前谨慎升级。

---

### **3. 新模型与硬件支持**  
- **LFM3 GGUF**：PR #19344 引入了通过 `llama-server` 运行 LiquidAI 的 LFM3 模型的基础修复，包括正确的 BOS 处理及 `llama.cpp` 升级后的初步文本转语音支持。  
- **MLX 后端**：  
  - PR #18780 添加了 **Kolibri 1** 支持。  
  - PR #19197 实现了 **并发生成**（`OLLAMA_NUM_PARALLEL`）功能，适用于 MLX 运行器——对降低首个令牌延迟至关重要。  
- **硬件**：  
  - **RTX 5060 Ti（Blackwell）**：由于 `shared object initialization failed` 导致 CUDA flash-attention 内核崩溃的问题仍未解决（#19122）；正在调查修复方案。  
  - **AMD Radeon RX 6750 GRE 10GB（navi23）**：#19329 中请求支持，目前尚无实现。  
  - **Intel Arc GPU**：Vulkan 加速的 UI 可见性仍缺失（#19301）。

---

### **4. 性能与优化**  
- **并发生成**：MLX 现已支持通过 `OLLAMA_NUM_PARALLEL` 实现并行请求，可共享投影/前馈计算，显著减少首个令牌等待时间（#19197）。  
- **流式可靠性**：PR #19331 引入 15 秒心跳机制，维持空闲流活跃状态，防止长提示评估期间无声卡顿。  
- **拉取恢复**：PR #19339 修复了服务器重启后（拉取超过 1 小时）的恢复失败问题，彻底消除 `remove ...-partial-0: The system cannot find the file specified` 错误（#19337）。  
- **嵌入效率**：PR #19334 修正了多模态嵌入中的媒体顺序（如 Gemma 4），解决了因乱序标记引发的断言失败问题。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|--------|------|--------|------------|
| 🔴 高 | `qwen3.8`： "no user query found in messages"（500 错误） | 流式聊天在查询中途中断；使用大上下文提示可复现 | [#17778](https://github.com/ollama/ollama/issues/17778) – 已打开，56 条评论 |
| 🔴 高 | `deepseek-v4-flash:0731`：无 `</think>` 时陷入无限思考循环 | 代理任务完全失败；观察到 221 次重复推理块 | [#17892](https://github.com/ollama/ollama/issues/17892) – 已打开，14 条评论 |
| 🔴 高 | `lfm3-audio:latest`：尽管支持，但 MLX 运行时不可用 | 导致在 Apple Silicon 上无法加载模型 | [#19343](https://github.com/ollama/ollama/issues/19343) – 已打开 |
| 🟡 中 | `qwen2.5-coder:3b-instruct` Q2_K/Q3_K_* 量化：代码任务成功率 0% | 虽然输出流畅，但功能已失效 | [#18252](https://github.com/ollama/ollama/issues/18252) – 已打开 |
| 🟡 中 | Windows：大提示下约 15 秒后 API 连接重置 | 阻塞大上下文推理工作流 | [#19139](https://github.com/ollama/ollama/issues/19139) – 已打开 |
| 🟡 中 | macOS Metal 在 `mlx runner` 上发生恐慌 | 在 M 系列 Mac 模型加载时崩溃 | [#19278](https://github.com/ollama/ollama/issues/19278) – 已打开 |

> ✅ **进行中的修复**：PRs #19339（拉取恢复）、#19331（流心跳）、#19344（LFM3 GGUF）、#19197（MLX 并发）。

---

### **6. 对应用开发者的意义**  
- **避免在生产环境使用 `qwen3.8` 和 `deepseek-v4-flash:0731`** ——两者在流式场景中均存在严重正确性或无限循环缺陷。建议使用备选模型或密切监控相关问题线程。  
- **在 MLX 上利用 `OLLAMA_NUM_PARALLEL`** 以加快多用户场景下的响应速度，但需注意每个并发请求带来的内存开销。  
- **为长时间运行的流实现重试逻辑**——尤其是使用工具的代理，因空闲超时可能导致无声卡顿。  
- **部署前验证模型量化质量**：当前低比特 `qwen2.5-coder` 变体功能不可用。  
- **预期在通过 DNS64 拉取 `hf.co` 时出现间歇性失败**——如可能，请使用 `--insecure` 或本地镜像（#19345）。  
- **关注 Ollama Cloud 限制**：大编码请求出现 HTTP 413 错误，表明内部负载上限虽宣称有大上下文窗口，实际仍受限（#19155）。

> 💡 **实用技巧**：本地代理开发时，优先选择 `gemma4`、`shieldgemma` 或 `clef-flash` ——这些模型相比新实验性模型展现出更优的稳定性和工具集成能力。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-10-28**

---

### **1. 今日重点**  
LiteLLM 生态系统迎来一波关键修复，聚焦成本准确性、流式传输可靠性及安全性——尤其针对预算逻辑、Databricks OpenJev 的模型定价以及嵌入（embeddings）中的超时处理。关键 PR 修复了 Claude 模型上 `reasoning_effort="none"` 行为长期存在的问题，并确保在流式 `/v1/messages` 调用中正确统计 token。

---

### **2. 版本发布与破坏性变更**  
- **新版本发布**：v1.106.5、v1.105.6、v1.104.8、v1.103.10（均于过去 24 小时内发布）  
  🔐 *安全验证要求*：所有镜像必须使用同一 Cosign 公钥进行验证：  
  [https://raw.githubusercontent.com/BerriAI/litellm/e82a3c646908ba0a6ee0beddc4310d7a6cac4065/cosign.pub](https://raw.githubusercontent.com/BerriAI/litellm/e82a3c646908ba0a6ee0beddc4310d7a6cac4065/cosign.pub)  
  ✅ 对 `ghcr.io/berriai/litellm:*`、`litellm-database`、`litellm-non_root` 以及 `docker.io/litellm/*` 使用相同的命令进行验证。

- **即将发布的版本线**：`main` 分支已通过 #48673 推进至 **1.109.0.dev1**；稳定版候选版本将很快跟进。  
  🔗 [PR #48673](https://github.com/BerriAI/litellm/pull/48673)

---

### **3. 新模型与硬件支持**  
今日未新增模型或硬件后端。但：  
- **Cloudflare Workers AI** 正在积极扩展：  
  - 图像支持（#35055）和音频支持（#35056）为待办功能请求。  
  - 当前实现已过时；需更新以反映扩展后的 API 端点。  
  🔗 [问题 #21115](https://github.com/BerriAI/litellm/issues/21115)，[问题 #35055](https://github.com/BerriAI/litellm/issues/35055)，[问题 #35056](https://github.com/BerriAI/litellm/issues/35056)

---

### **4. 性能与优化**  
- **流式延迟修复**：`message_start` 现在仅在 `message_delta` 到达后才报告 `input_tokens: 0`——修复了流式传输中初始指标错误的问题。  
  🔗 [问题 #48481](https://github.com/BerriAI/litellm/issues/48481)，[PR #48684](https://github.com/BerriAI/litellm/pull/48684)  
- **超时传播**：Gemini 与 Vertex AI 批量嵌入现在尊重用户指定的超时时间（此前默认为 300 秒）。  
  🔗 [PR #47305](https://github.com/BerriAI/litellm/pull/47305)，[PR #48690](https://github.com/BerriAI/litellm/pull/48690)  
- **防护机制效率提升**：仅检查请求元数据的防护规则不再阻塞流式快速路径。  
  🔗 [PR #47735](https://github.com/BerriAI/litellm/pull/47735)

---

### **5. 稳定性与回归问题**  
**报告的关键问题**：  
1. **预算计算错误（虚拟密钥）**：尽管实际支出低于预算，仍触发 `BudgetExceededError`，原因在于数据过期。  
   🔗 [问题 #27735](https://github.com/BerriAI/litellm/issues/27735) — *修复待处理*  
2. **流式请求零支出日志**：对非标准模型别名（如带日期的 Anthropic 构建版本）的流式调用，即使已计费也被记录为免费。  
   🔗 [问题 #42161](https://github.com/BerriAI/litellm/issues/42161) — *修复已合并*  
3. **eMudhra CA 信任问题**：1.106.x 版本仍信任已被攻破的 emSign ECC Root CA-G3；修复已回滚至 main 但尚未进入稳定版。  
   🔗 [问题 #47904](https://github.com/BerriAI/litellm/issues/47904) — *请求将修复回滚至 v1.106.3*  
4. **Claude 思维努力行为异常**：`reasoning_effort="none"` 无法在默认开启思维的模型（如 `claude-haiku-5-5`）上禁用思考。  
   🔗 [问题 #47924](https://github.com/BerriAI/litellm/issues/47924) — *修复已合并*

---

### **6. 对应用开发者的启示**  
- **成本追踪**：确保虚拟密钥使用更新版本（≥v1.106.5），避免误报预算超限。密切监控自定义模型别名或流式场景下的支出日志。  
- **流式可靠性**：若依赖实时 token 追踪（如代理状态管理），请立即升级——`message_start` 现在仅在 `message_delta` 到达后才反映准确用量。  
- **安全性**：在 v1.106.3 发布含 eMudhra 根 CA 修复前，避免使用未经验证的 1.106.x Docker 镜像。始终验证签名。  
- **未来兼容性**：关注 #21115 及相关问题，为 Cloudflare Workers AI 扩展做好准备——预计不久将推出新的图像/音频端点。  
- **模型定制化**：使用具备决策能力的模型时，显式测试 `reasoning_effort="none"`——该设置现已正确生效。  

🔧 *推荐操作*：升级至 **v1.106.5+**，并重新验证所有成本/预算逻辑，特别是多模型路由与流式工作流场景。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth 摘要 – 2026-10-28**

---

### **1. 今日亮点**  
Unsloth 继续扩展其代理与推理生态系统，Studio 在 UI/UX 方面实现重大优化，包括完整集成 Flows 流程、增强 MCP 工具链功能以及实时监控能力提升。关键稳定性修复解决了在 Windows 上训练模型时持续出现的回收站文件泛滥问题，以及 Anthropic 透传接口中上下文溢出的处理缺陷。对 LFM3-1.7B 和 exllama3 推理引擎的新支持正在积极开发中。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未观察到新的版本发布或 API/config 变更。

---

### **3. 新模型与硬件支持**  
- **新模型支持**：  
  - 📌 [Issue #15588](https://github.com/unslothai/unsloth/issues/15588)：请求添加对 **LFM3-1.7B** 的支持，该模型为 LiquidAI 推出的新表达型骨干网络。  
  - 📌 [Issue #15473](https://github.com/unslothai/unsloth/issues/15473)：报告 **Gemma 4 26B MLX** 模型在 macOS 上运行时产生 `<unused6226>` 无效标记。  
- **硬件与后端支持**：  
  - 📌 [Issue #15583](https://github.com/unslothai/unsloth/issues/15583)：通过 `unsloth` 桌面应用请求增加对 Intel Arc B580 GPU（Intel XPU）的支持。  
  - 📌 [Issue #15444](https://github.com/unslothai/unsloth/issues/15444)：在混合 NVIDIA-AMD Linux 系统中使用自定义 `llama.cpp` 时，AMD GPU 无法被识别。  
  - 📌 [Issue #15405](https://github.com/unslothai/unsloth/issues/15405)：加载 `Qwen3.5-2B` 时因缺少 `model.safetensors-00001-of-00001.safetensors` 文件导致恢复失败。

---

### **4. 性能与优化**  
- ✅ **Flows 引擎改进**：  
  - [PR #15611](https://github.com/unslothai/unsloth/pull/15611)：微调节点现包含保留集划分、实时状态追踪及损失波动曲线，支持训练过程中的实时反馈。  
  - [PR #15609](https://github.com/unslothai/unsloth/pull/15609)：基于 Studio 组件库重构 Flows UI，确保主题一致性和性能优化。  
- ⚙️ **推理引擎增强**：  
  - [PR #15633](https://github.com/unslothai/unsloth/pull/15633)：调查 `Qwen3.8-Flash-Next` 在 `offload_layers` 时失败的原因，发现是保留在 CPU 的 n-gram 表阻塞了 Block Swap。  
  - [PR #15632](https://github.com/unslothai/unsloth/pull/15632)：修复 FP8 n-gram 表缩放不对齐问题，避免键投影输入类型错误。  
- 🔬 **基准测试工具**：  
  - [PR #12522](https://github.com/unslothai/unsloth/pull/12522)：新增 `llama-bench` 标签页，用于评测 GGUF 模型的提示吞吐量与生成速度。  
  - [PR #12521](https://github.com/unslothai/unsloth/pull/12521)：引入 Evals 标签页，集成 `lm-eval-harness`，支持 MMLU、GSM8K、TruthfulQA 等任务评分。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | PR/链接 |
|--------|------|--------|--------|
| 高 | Studio 在训练过程中每秒向 Windows 回收站写入大量 `*.db-wal`/`*.db-shm` 文件 | 开放 | [Issue #15552](https://github.com/unslothai/unsloth/issues/15552) |
| 高 | `Anthropic passthrough (/v1/messages)` 在上下文溢出时失败，而非自动压缩 | 开放 | [Issue #15417](https://github.com/unslothai/unsloth/issues/15417) |
| 中 | `Deep Research` 模式在 Gemma-4-26B-A4B 上被忽略，未触发网页搜索 | 开放 | [Issue #15581](https://github.com/unslothai/unsloth/issues/15581) |
| 中 | 在 macOS 上 `unsloth/flux-3-image-klein-GGUF` 模型中图像编辑功能不可用 | 已关闭 | [Issue #15241](https://github.com/unslothai/unsloth/issues/15241) |
| 低 | 下载提示显示原始文件名，即使已重命名 | 开放 | [Issue #15621](https://github.com/unslothai/unsloth/issues/15621) |

> 🔧 **正在进行的修复**：  
> - [PR #15570](https://github.com/unslothai/unsloth/pull/15570)：在清除对话历史前添加确认对话框（防止误删）。  
> - [PR #15601](https://github.com/unslothai/unsloth/pull/15601)：导入 HTML 任务列表至知识库时，保留复选框状态。

---

### **6. 对应用开发者的影响**  
- **代理构建者**：持续推进的 **原生多代理编排** ([#10776](https://github.com/unslothai/unsloth/issues/10776)) 与 **MCP 工具集成** ([#14348](https://github.com/unslothai/unsloth/pull/14348), [#15629](https://github.com/unslothai/unsloth/pull/15629)) 将显著提升本地代理自主性。未来将支持 Supervisor/Subagent 工作流，并可直接访问内置工具如浏览器使用和文件操作。  
- **模型集成者**：请注意，**FP8 量化** 与 **n-gram 表处理** 在新模型如 `Qwen3.8-Flash-Next` 上仍存在脆弱性。部署生产管线前，请关注 PR #15632 与 #15633 的修复进展。  
- **UI/UX 设计师**：Flows 与 Studio 已统一采用组件库 (`@/components`) ([#15609](https://github.com/unslothai/unsloth/pull/15609))，确保界面一致性——可借此构建即插即用的集成方案。  
- **性能调优者**：利用新增的 **Evals** 与 **Benchmarks** 标签页，对比不同量化方式与推测解码设置下的模型性能。这些工具对优化生产环境中的延迟-成本权衡至关重要。

---  
*摘要源自 GitHub 活动：unslothai/unsloth — 2026-10-28*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*