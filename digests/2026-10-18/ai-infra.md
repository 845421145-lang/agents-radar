# AI 基础设施日报 2026-10-18

> 生成时间: 2026-10-18 00:13 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-18**

---

### **1. 生态概览**  
2026年第四季度的AI推理基础设施格局呈现出下一代硬件（NVIDIA Blackwell SM120/SM121、AMD gfx1201）的快速收敛，对推测性解码和MoE模型的激进优化，以及后端生态系统的日益碎片化。尽管vLLM与SGLang在面向GPU原生效率的高性能服务引擎领域遥遥领先，llama.cpp则在边缘与嵌入式设备上的轻量级、可移植执行方面保持主导地位。Ollama与LiteLLM持续弥合开发者易用性与企业级可观测性之间的鸿沟，而Unsloth则专注于通过智能模型生命周期管理支持丰富的代理工作流。生态系统正日益分化为“性能优先”与“开发者体验优先”两种范式。

---

### **2. 活动对比**

| 项目       | 近24小时开立问题数 | 近24小时合并PR数 | 发布 / 破坏性变更 |
|------------|---------------------|-------------------|--------------------|
| **vLLM**   | 14                  | 12                | 无                 |
| **SGLang** | 15                  | 9                 | 无                 |
| **llama.cpp** | 12               | 7                 | 3（b11716, b11715, b11713） |
| **Ollama** | 10                  | 5                 | 无（但1个破坏性变更已标记） |
| **LiteLLM** | 8                | 6                 | 1（v1.103.5 + 破坏性变更） |
| **Unsloth** | 7                | 5                 | 无                 |

> ✅ **洞察**：vLLM与SGLang在创新速度上最为活跃，工程吞吐量强劲。llama.cpp因细粒度功能发布（如量化支持）导致更高的发布频率。LiteLLM在安全与稳定性更新方面领先，采用签名发布。

---

### **3. 模型支持竞赛**

| 新模型 / 架构              | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash (GB300)** | ✅（PR #61868） | ✅（已验证8× RTX PRO 6000） | ❌ | ⚠️ 已请求 | ❌ | ❌ |
| **Kimi-K3 (ROCm)**         | ✅（Issue #50682） | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Mooncake Connector (ROCm)** | ✅（可选，PR #61244） | ❌ | ❌ | ❌ | ❌ | ❌ |
| **TR-HASH Checkpoint**     | ✅（PR #60431） | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Kolibri-1 (78B MoE)**    | ❌ | ❌ | ✅（PR #30673） | ✅（实验性，PR #18780） | ❌ | ✅（图像/视频默认） |
| **Gemini Live Avatar**     | ❌ | ❌ | ❌ | ❌ | ✅（跟踪中，Issue #43166） | ❌ |
| **Claude Sonnet 4 (200K)** | ❌ | ❌ | ❌ | ❌ | ✅（更新价格，PR #47202） | ❌ |

> 🏆 **排行榜**：  
> - **vLLM** 在 **Blackwell专属优化** 和 **生产就绪模型支持** 上领先（尤其是DeepSeek-V4.1-Flash）。  
> - **llama.cpp** 在 **低比特量化**（Hexagon上的Q1_0/Q2_0）和 **跨平台模型可用性**（Kolibri-1、MoE）方面占据主导。  
> - **LiteLLM** 在 **企业级模型元数据追踪** 方面胜出，包括新上下文窗口与定价数据。

---

### **4. 性能前沿**

| 优化重点               | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|------------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存与卸载**        | ✅ PLE磁盘卸载（Qwen4Exp），TP感知卸载 | ✅ 建议：`kv-shard` 用于短前缀填充 | ❌ | ❌ | ❌ | ✅ 虚拟化聊天历史 |
| **推测性解码**          | ✅ DSpark支持5个草稿令牌（GB300） | ✅ 低延迟路径，联合执行 | ✅ Draft-MTP自适应 | ❌ | ❌ | ❌ |
| **量化效率**            | ✅ CUTLASS + FP8 GEMMs（SM120） | ✅ 融合`mHC SP + engram` | ✅ MMVQ，融合top-k（HIP/MoE） | ❌ | ❌ | ❌ |
| **内核级融合**          | ✅ 特化解码路径 | ✅ `fused_q_norm_rope`, `mHC SP` | ✅ Wave64 flash attention（ROCm） | ❌ | ❌ | ❌ |
| **分布式服务**          | ✅ TP无关的KV卸载 | ✅ 多GPU拓扑验证 | ❌ | ❌ | ✅ 速率限制批处理（Redis） | ⚠️ 需使用块编译绕行方案 |

> 🔥 **热点**：  
> - **Blackwell（SM120/SM121）** 是内核级优化的主要战场（vLLM、SGLang）。  
> - **MoE与推测性解码** 是关键差异化点——vLLM与SGLang在此领域领先。  
> - **边缘与嵌入式** 性能是 **llama.cpp** 的优势，尤其在Hexagon及低比特量化类型上表现突出。

---

### **5. 层位定位**

| 项目       | 主要层级                  | 核心差异化特性 |
|------------|----------------------------|----------------|
| **vLLM**   | **高性能推理引擎**         | CUDA图优化，原生Blackwell支持，PLE卸载，MoE专项优化 |
| **SGLang** | **高吞吐推理引擎**         | 代理导向设计，低延迟推测性解码，实时控制流 |
| **llama.cpp** | **本地运行时与可移植执行** | 跨平台，低比特量化，依赖极少，聚焦边缘设备 |
| **Ollama** | **开发者网关与本地运行器** | 简单命令行/API，模型目录，代理工具链，本地部署便捷 |
| **LiteLLM** | **企业级API网关与编排器** | 统一路由，成本追踪，计费，安全，多提供商抽象 |
| **Unsloth** | **代理工作室与模型生命周期平台** | 可视化代理构建器，虚拟化聊天历史，托管量化模型，训练感知UI |

> 📊 **层级总结**：  
> - **引擎层**：vLLM、SGLang（GPU优化）。  
> - **运行时层**：llama.cpp（可移植、高效）。  
> - **网关层**：LiteLLM、Ollama（抽象、易用）。  
> - **工作室层**：Unsloth（代理工作流、用户体验、持久化）。

---

### **6. 趋势信号**

#### **从活动提取的关键趋势**
1. **硬件优先优化**：NVIDIA Blackwell（SM120/SM121）与AMD gfx1201已成为主要目标——各项目正大力投入内核调优（vLLM、SGLang）、量化（llama.cpp）与内存卸载。
2. **推测性解码已进入生产就绪阶段**：DSpark与Draft-MTP策略已在大规模验证（vLLM、SGLang），实现真实场景下的代理推理。
3. **模型可移植性与性能的权衡**：llama.cpp在跨平台量化方面表现出色；vLLM/SGLang则更侧重特定硬件上的原始速度。
4. **代理工作流需要全栈集成**：Unsloth与Ollama强调状态持久化、工具调用与内存管理——标志着向长周期、有状态代理的转变。
5. **安全与可观测性不容妥协**：LiteLLM的cosign签名镜像与审计功能体现了企业成熟度。Ollama的云完整性问题凸显了未经审核模型交付的风险。

#### **开发者应关注事项**
- **避免使用 `glm-5.3-flash:cloud`**，直至集群完整性确认（Ollama）。
- **在Blackwell上谨慎使用 `--enforce-eager`**（vLLM）；建议优先使用CUDA图。
- **监控AMD R9700/gfx1201上的ROCm稳定性**（vLLM、Unsloth、Ollama）——避免生产环境使用。
- **若使用LiteLLM的 `reasoning_effort_levels` 或 `thinking.budget_tokens`，请升级至v1.103.5+**。
- **在分布式环境中固定版本**（Unsloth、Ollama），因存在破坏性变更与不稳定性。

> ✅ **最终观点**：基础设施栈正在迅速成熟。请根据 **您的硬件**、**使用场景（代理 vs 批处理）** 与 **部署约束** 来选择项目——性能不再是一刀切的解决方案。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-18**

---

### **1. 今日亮点**  
vLLM 项目持续加速对 NVIDIA Blackwell（SM120/SM121）和 AMD ROCm 平台的支持，修复了 GB300 上 DeepSeek-V4.1-Flash 解码性能的关键问题，并推进与 TP 无关的 KV 缓存卸载跟踪。主要更新包括：修复重复调用 `generate()` 时非确定性贪婪解码的问题，以及为 GB300 上的 DeepSeek-V4.1-Flash 新增专用解码路径。与此同时，社区正积极解决双 AMD R9700（gfx1201）和 Intel Arc B70 显卡上的稳定性问题。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内无新发布或破坏性变更。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1-Flash**：为 GB300 增加专用解码内核（PR #61868），支持高达 5 个草稿令牌的高吞吐量 DSpark 推测解码。  
- **Kimi-K3**：ROCm 支持进展在 Issue #50682 中追踪；混合 MLA 块配对现已修复不匹配 TP 大小的问题（PR #61002）。  
- **Mooncake Connector**：现可在 ROCm 上可选（PR #61244），降低非 Mooncake 用户的依赖开销。  
- **TR-HASH 检查点**：新增原生支持（PR #60431），解决架构解析失败问题。  
- **Intel Arc B70**：Qwen3.8-27B MTP2 因 XE CCS 超时导致崩溃，已报告（Issue #55425）；暂无修复。

---

### **4. 性能与优化**  
- **Blackwell（SM120/SM121）**：  
  - 小 M 的 per-tensor FP8 GEMM 使用 `CUTLASS`（PR #61331），消除 cuBLASLt split-K 内核带来的不必要的 `memset` 开销。  
  - NVFP4 因果预填充在 SM120 上比 FP8 慢约 1.7–1.8 倍（Issue #50416）；正在调查中。  
  - `MXFP8 MoE` 在 SM121 上因错误后端选择回退至 `MARLIN`（Issue #43906）。  
- **AMD ROCm**：  
  - 为 `a16w4` 和 `a8w4` 新增 AITER 融合 MoE 支持（Issue #50682）；基准测试正在进行中。  
  - 双 AMD R9700（gfx1201）上 TP=2 出现死锁（Issue #40980），阻碍推理。  
- **内存与卸载**：  
  - 为 Qwen4Exp 新增 `PLE 磁盘卸载`（PR #59958），在 DGX Spark（GB10）上减少内存使用 **27.0 GiB**。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|---------|------|------|----------|
| 🔴 高 | [Issue #40980](https://github.com/vllm-project/vllm/issues/40980) | 双 AMD R9700（gfx1201）上 TP=2 死锁；GPU 持续占用 100% | 开放 |
| 🔴 高 | [Issue #56892](https://github.com/vllm-project/vllm/issues/56892) | SM120 上启用 `--enforce-eager` 时，DeepSeek-V4.1-Flash 解码吞吐量极低；CUDA Graph 无法使用 | 开放 |
| 🟡 中 | [Issue #59770](https://github.com/vllm-project/vllm/issues/59770) | 自 v0.29.0 起，Nemotron-3.5-Lightning NVFP4 在 DGX Spark（GB10）上解码速度慢约 16% | 开放 |
| 🟡 中 | [Issue #51405](https://github.com/vllm-project/vllm/issues/51405) | Inkling 模型在 SM120 上因 `tml_fa4` 内核缺少分页 KV 支持而失败 | 开放 |
| 🟢 低 | [Issue #43357](https://github.com/vllm-project/vllm/issues/43357) | TurboQuant 工作区锁定在 3.06 MB；提示长度 >4096 令牌时需 12 MB | 开放 |

> ✅ **已在 PR 中修复**：  
> - `generate()` 调用间非确定性贪婪解码（PR #61440）  
> - `kv_cache_dtype` 不匹配导致的崩溃（PR #61450）  
> - TorchCodec 原生库加载失败（PR #60554）  
> - 编译缓存索引竞争条件（PR #60440）

---

### **6. 对应用开发者的启示**  
- **在 Blackwell（SM120）上谨慎使用 `--enforce-eager`** —— 可能严重降低 DeepSeek-V4.1-Flash 等模型的解码吞吐量。尽可能优先使用 CUDA Graph。  
- **如涉及动态权重重载或需要模块级调度的微调模型**，请启用 `VLLM_RELOAD_CORE=1`（RFC #59502）。  
- **多 GPU ROCm 部署时**，注意更严格的 TP 敏感 MLA 块对齐要求 —— 推荐使用 `NixlConnector`（PR #61002）避免握手失败。  
- **确保 `kv_cache_dtype` 与模型数据类型一致**（例如 `bfloat16` 模型 → `kv_cache_dtype=bfloat16`），以防止 CUDA Graph 捕获崩溃（PR #61450）。  
- **关注新硬件上的回归问题**：Blackwell（SM120/SM121）和 AMD gfx1201 仍是重点痛点；生产部署前建议使用夜间构建版本进行测试。

---  
*本摘要基于 vLLM GitHub 活动（2026-10-18）整理。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-10-18**

---

### **1. 今日重点**  
SGLang 项目持续对 Blackwell（SM120）和 GB300 硬件上的 DeepSeek-V4.1 进行激进优化，多个 PR 已落地于低延迟解码与推测解码路径。针对长上下文工作负载，引入了 AMD ROCm 和 GPU 内存管理的关键稳定性修复，同时一项新功能提案旨在减少长缓存前缀场景下短预填充时的 KV 缓存开销。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新发布或破坏性变更。*

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1-Flash** 现已在 **8× RTX PRO 6000（SM120，仅 PCIe）** 上获得生产级支持，拓扑结构与吞吐量数据已通过 [#40877](https://github.com/sgl-project/sglang/issues/40877) 验证并公布。  
- **Muse Spark 开发版** 正在推进中，[#44678](https://github.com/sgl-project/sglang/issues/44678) 中提交了原生支持的 PR，包含 DeepGEMM 依赖项更新。  
- **AMD ROCm** 在 [#44870](https://github.com/sgl-project/sglang/issues/44870) 中针对 `encoder-swa-bounded-replay` 行为进行了针对性修复，在 [#44797](https://github.com/sgl-project/sglang/pull/44797) 中修正了 MoE 纠偏偏差处理问题。

---

### **4. 性能与优化**  
- **推测解码（DSpark）**：通过 PR [#44626](https://github.com/sgl-project/sglang/pull/44626) 与 [#44628](https://github.com/sgl-project/sglang/pull/44628) 对低延迟解码路径的优化，在 **GB300** 上实现显著提升，支持与草稿模型推理联合执行。  
- **核融合**：`mHC SP + engram fusion` (#43065) 与 `fused_q_norm_rope` 优化 (#41657) 取得进展，目标是提升 SM120 上的预填充吞吐量。  
- **内存效率**：提议引入 `kv-shard`，在长缓存前缀的短预填充场景中仅传递 Q 而非完整 KV，相关讨论见 [#44885](https://github.com/sgl-project/sglang/issues/44885)，有望缓解代理工作流中的内存压力。

---

### **5. 稳定性与回归问题**  
- **严重**：`pr-test.yml` 自动收集触发 CUDA 核心转储，问题记录在 [#26340](https://github.com/sgl-project/sglang/issues/26340) —— 345 条评论；正在积极追踪。  
- **高严重性**：在 **GB10** 上，长预填充（>40k tokens）会导致工作进程无声死亡，因统一内存耗尽但无 OOM 堆栈跟踪，问题见 [#36941](https://github.com/sgl-project/sglang/issues/36941)。  
- **功能缺陷**：  
  - 复杂代理提示下，GLM-5.3-Flash 的推理输出退化为无限 `!` 字符，问题见 [#36669](https://github.com/sgl-project/sglang/issues/36669)。  
  - `/v1/messages` 在历史包含思考块时对 `gpt-oss` 返回 HTTP 500 错误，问题见 [#44932](https://github.com/sgl-project/sglang/issues/44932)。  
  - `pause_generation(in_place)` 后接 `abort` 导致服务器卡死，问题见 [#44835](https://github.com/sgl-project/sglang/issues/44835)。  
- *修复进行中*：多个 PR 正在解决 AMD 特定路由问题 ([#44797](https://github.com/sgl-project/sglang/pull/44797)) 与解码器核崩溃 ([#44870](https://github.com/sgl-project/sglang/issues/44870))。

---

### **6. 对应用开发者的影响**  
- **代理工作流**：使用 GLM-5.3-Flash 时，请谨慎对待 `tool_choice=auto` 和多工具提示 —— 在 [#36669](https://github.com/sgl-project/sglang/issues/36669) 修复前，预计会出现输出损坏。  
- **长上下文应用**：除非已调整统一内存限制，否则避免在 GB10 系统上进行 >40k token 的预填充 —— 可能发生无声失败且无错误日志。  
- **硬件选型**：若部署于 **RTX PRO 6000（SM120）**，请使用 [#40877](https://github.com/sgl-project/sglang/issues/40877) 中验证过的配置；当前预填充性能（约 2–7K tok/s）仍落后于 vLLM/Marlin（约 12.5K tok/s），表明仍有调优空间。  
- **未来准备**：关注 [#44885](https://github.com/sgl-project/sglang/issues/44885) 与 [#44635](https://github.com/sgl-project/sglang/issues/44635)，以获取即将推出的 KV 缓存效率优化与上下文并行注意力改进。  

> ✅ **行动项**：在 ROCm 上测试你的代理时启用 `--enable-encoder-swa-bounded-replay` —— 它可能在每次命中缓存前缀时静默覆盖已有 KV。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-18**

---

### **1. 今日亮点**  
最新更新聚焦于扩展 Hexagon 与 AMD GCN 后端的量化支持，对 CUDA 与 Vulkan 内核中的低比特量化类型（Q1_0、Q2_0、Q4_0）进行了关键性能优化。新增优化包括 CUDA 上的更快 MMVQ、HIP 上的融合分组专家 top-k，以及一项高影响的修复 PR —— 回滚了导致 MELLUM 精度处理性能下降的变更。这些改进显著提升了现代 GPU 及边缘设备上的推理效率。

---

### **2. 发布与破坏性变更**  
- **`b11716`**：通过分块 HMX/HVX MUL_MAT 路径，为 Hexagon 完整添加 `Q1_0` 与 `Q2_0` 支持 —— 实现 Apple Silicon 与嵌入式 AI 硬件的新低比特量化能力。  
- **`b11715`**：通过 `__builtin_amdgcn_perm` 修复 ROCm 上的 `q1_0` 解包问题，提升与 AMD GPU 的兼容性。  
- **`b11713`**：因在 CUDA/Vulkan 上引发严重性能退化，回滚 #30584（`graph: add precision handling for MELLUM`）；详情参见 [PR #30733](https://github.com/ggml-org/llama.cpp/pull/30733)。  
> 🔔 *注意：依赖 MELLUM 特定精度调优的用户应预期吞吐量下降，直至替代修复落地。*

---

### **3. 新模型与硬件支持**  
- ✅ **Kolibri-1 (Aleph-Alpha)**：新增对 780 亿参数双语 MoE 推理模型的支持，每令牌激活约 34.6 亿专家 ([#30673](https://github.com/ggml-org/llama.cpp/pull/30673))。适用于德语/英语多语言任务。  
- ✅ **Hexagon (Qualcomm)**：通过 HVX 与 HMX 内核实现完整的 `Q1_0` 与 `Q2_0` 量化支持，包含分块布局与直接激活展开功能 ([#30122](https://github.com/ggml-org/llama.cpp/pull/30122))。  
- ✅ **AMD GCN (ROCm/HIP)**：采用 wave64 优化 `Q8_0` 快速注意力，同时调优 `MMQ` 配置以提升 Q4_0/Q6_K 性能 ([#30021](https://github.com/ggml-org/llama.cpp/pull/30021)、[#29534](https://github.com/ggml-org/llama.cpp/pull/29534))。  
- ✅ **SYCL / Intel Arc**：持续修复 B60 GPU 上 `RMS_NORM` 启动失败问题 ([#30301](https://github.com/ggml-org/llama.cpp/issues/30301))。

---

### **4. 性能与优化**  
- 🚀 **CUDA**：通过优化内核调度，实现低比特类型（Q1_0、Q2_0、Q4_0）的更快 `MMVQ` ([#30517](https://github.com/ggml-org/llama.cpp/pull/30517))。  
- ⚡ **HIP/CUDA**：启用图优化的融合分组专家 top-k，减少 Qwen3.8-Flash-Next 等 MoE 模型的延迟 ([#29181](https://github.com/ggml-org/llama.cpp/pull/29181))。  
- 💡 **Vulkan**：为 flash attention 中的 `Q4_0` KV 缓存添加快速路径的反量化+转置操作 ([#30738](https://github.com/ggml-org/llama.cpp/pull/30738))，消除冗余计算。  
- 🔍 **Metal**：正在调查大上下文处理期间出现 10–50 倍运行时停滞的问题 ([#30726](https://github.com/ggml-org/llama.cpp/issues/30726))；可能与计算队列调度或内存预加载有关。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 影响 | 状态 |
|--------|------|--------|--------|
| 🔴 高 | 在 RTX 5090 笔记本（sm_120）上，启用 `GGML_CUDA_DISABLE_GRAPHS=1` 时 `CUDA graphs` 导致 GPU 卡死 | 系统冻结，XID 8 崩溃 | [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) |
| 🔴 高 | `Vulkan`：自 `e0bcacc` 起，在多设备系统上启用推测解码后，解码性能下降约 3 倍 | 吞吐量严重下降 | [Issue #30695](https://github.com/ggml-org/llama.cpp/issues/30695) |
| 🔴 高 | `SYCL`：Intel Arc B60 上 `RMS_NORM` 启动失败，返回 `UR_RESULT_ERROR_UNSUPPORTED_FEATURE` | 模型加载失败 | [Issue #30301](https://github.com/ggml-org/llama.cpp/issues/30301) |
| 🟡 中 | `Metal`：大上下文提示处理期间偶发数分钟停顿（大上下文，qwen4exp） | 高延迟推理 | [Issue #30726](https://github.com/ggml-org/llama.cpp/issues/30726) |
| 🟡 中 | `Vulkan`：在 RX 6900 XT 上，`--moe-cache-mib` 加载时崩溃 | MoE 缓存被禁用 | [Issue #30697](https://github.com/ggml-org/llama.cpp/issues/30697) |

> ✅ **修复中**：正在审查解决 `SYCL` RMS_NORM ([#30743](https://github.com/ggml-org/llama.cpp/pull/30743)) 与 Metal 停滞根本原因的 PR。

---

### **6. 对应用开发者的启示**  
- **使用 `draft-mtp-adaptive`** 进行 MoE 模型的推测解码 —— 其可动态调整草稿深度，避免上下文过载。详见 [PR #27210](https://github.com/ggml-org/llama.cpp/pull/27210)。  
- **在稳定版本发布前避免使用 `MELLUM` 精度处理** —— 如依赖该功能，请回退至旧版构建。  
- **在 Hexagon 设备上启用 `--spec-type draft-mtp`** 并搭配 `Q1_0`/`Q2_0` 以获得最大效率。  
- **监控多 GPU 环境下的 Vulkan/Metal 性能** —— 近期变更可能引入瓶颈。  
- **利用新推出的 `/metrics` 与 `/memory` 端点** 监控各 GPU 内存使用情况（参见 [PR #26130](https://github.com/ggml-org/llama.cpp/pull/26130)），实现稳健部署监控。  

👉 *实用建议*：如需参与音频生成功能设计，请关注 [Issue #21956](https://github.com/ggml-org/llama.cpp/issues/21956)，共同推动 `mtmd` 中未来音频输出支持的演进。

---  
*简报数据来源：GitHub [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-18**

---

### **1. 今日亮点**  
`glm-5.3-flash:cloud` 出现严重回归问题，因集群 829 上数据被零初始化，导致 5–8% 的推理请求受到影响，引发对模型完整性与可靠性的担忧。与此同时，多个针对特定 GPU 环境的问题在 AMD（ROCm/Vulkan）、Apple Silicon（MLX）以及原生 Windows 系统中浮现，包括崩溃、内存耗尽和无声正确性错误，凸显异构硬件支持仍面临持续挑战。

---

### **2. 发布与破坏性变更**  
*无*  
过去 24 小时内未发布新版本或破坏性变更。然而，尝试拉取 `bonsai-2:9b` 的用户正遭遇 `412` 错误，提示与 Ollama 0.40.5 版本不兼容，表明旧客户端即将面临潜在的破坏性变更。[Issue #19085](https://github.com/ollama/ollama/issues/19085)

---

### **3. 新模型与硬件支持**  
- **模型新增**：社区提出请求，希望将 `deepseek-v4.1-flash` 作为可下载模型提供 ([#18379](https://github.com/ollama/ollama/issues/18379))，并提议推出云版本（`Cloud:DeepSeek-V4.1-Flash-1017`）([#19079](https://github.com/ollama/ollama/issues/19079))。  
- **后端支持**：PR 添加了对 MLX 上 **Kolibri 1** 的实验性支持 ([#18780](https://github.com/ollama/ollama/pull/18780)) 以及 **PPLX Decider v1.2** 的支持 ([#19072](https://github.com/ollama/ollama/pull/19072))，扩展了智能体工作流中的决策能力。

---

### **4. 性能与优化**  
- **内存效率**：PR [#17953](https://github.com/ollama/ollama/pull/17953) 引入了 *实验性预填充缓存持久化* 功能，可在运行器重新加载时保留缓存，有望减少模型重启时冗余的预填充计算——对长时间运行的智能体会话至关重要。  
- **工具链改进**：PR [#16611](https://github.com/ollama/ollama/pull/16611) 通过支持直接针对底层运行器（LLama.cpp、MLX）进行基准测试，增强了性能分析能力。  
- **资源报告增强**：PR [#19091](https://github.com/ollama/ollama/pull/19091) 改进了嵌入式端点的错误提示清晰度，要求启动时显式添加 `--embeddings` 标志，避免静默失败。

---

### **5. 稳定性与回归问题**  
**严重**  
- **`glm-5.3-flash:cloud` 失败** ([#18980](https://github.com/ollama/ollama/issues/18980))：大规模生成退化（如重复出现“the = the =”）与集群 829 上损坏的数据（`probe2.img` 全为零）相关——怀疑是主机侧模型存储完整性问题。  
- **AMD ROCm 崩溃** ([#19075](https://github.com/ollama/ollama/issues/19075))：在 Radeon Pro W5700（gfx1010）上使用 ROCm 7.2 时触发 `GGML_ASSERT(max_blocks_per_sm > 0)` 崩溃——可能为 GPU 调度层的内核级断言失败。  
- **Vulkan iGPU 数据损坏** ([#19090](https://github.com/ollama/ollama/issues/19090))：单个 `/v1/systemone` 请求超过约 6500 个 token 后，会损坏 Vulkan 运行器状态，导致后续所有 HTTP 200 响应返回错误输出，直至模型卸载。

**高影响**  
- **MLX 内存增长** ([#18131](https://github.com/ollama/ollama/issues/18131))：固定 8 GiB 前缀缓存预算在 32 GB Apple Silicon Mac 上执行智能体任务时导致严重交换——属预期增长，非内存泄漏。  
- **Jetson Orin 上的 OOM** ([#19084](https://github.com/ollama/ollama/issues/19084))：不受控的提示缓存导致 8GB RAM 边缘设备系统冻结，即使设置 `keep_alive=0` 亦然。  
- **种子精度丢失** ([#19078](https://github.com/ollama/ollama/issues/19078))：大于 2⁵³ 的整数种子在解码为 float64 时失去精度，导致不同种子产生相同输出。已在 PR [#19081](https://github.com/ollama/ollama/pull/19081) 中修复。

**低严重性**  
- Windows GPU 探测时控制台闪烁 ([#18954](https://github.com/ollama/ollama/issues/18954)) —— 通过 PR [#19080](https://github.com/ollama/ollama/pull/19080) 解决。  
- 上下文长度报告不一致 ([#19095](https://github.com/ollama/ollama/issues/19095)) —— `OLLAMA_CONTEXT_LENGTH` 在 `/api/show` 中被忽略。

---

### **6. 对应用开发者的启示**  
- **避免使用 `glm-5.3-flash:cloud`**，直到集群完整性确认；生产环境预计失败率高达 ~8%。  
- **尽早验证 GPU 兼容性**：AMD ROCm 与 Vulkan 后端在旧版 RDNA1 显卡（如 W5700）及部分集成显卡上仍不稳定——部署前务必充分测试。  
- **监控边缘设备内存使用**：Jetson Orin 与 Apple Silicon 系统可能需要手动调整 `cache_state` 以防止内存溢出。  
- **谨慎处理种子值**：若使用大整数种子（>2⁵³），确保客户端采用精确数值类型，或升级至 Ollama 0.40.7+（修复见 PR [#19081](https://github.com/ollama/ollama/pull/19081)）。  
- **规划安全暴露风险**：当 `OLLAMA_HOST=0.0.0.0` 时，API 无认证保护——建议实施 IP 白名单或反向代理（参考 [#19045](https://github.com/ollama/ollama/issues/19045)）以防止未授权访问。  
- **追踪推理令牌使用量**：当前无法通过 API 查看 `thinking` 令牌数量（[#19093](https://github.com/ollama/ollama/issues/19093)），给 `deepseek-v4.1-flash` 等模型的成本估算带来困难——建议引入自定义日志机制。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-10-18**

---

### **1. 今日亮点**  
LiteLLM 生态系统持续强化企业级可观测性与可靠性，针对计费、缓存和流式处理等关键问题进行了修复。值得注意的是，路由器异步完成日志中的一个高严重性漏洞已解决，多个 PR 提升了 Bedrock 和 Vertex AI 等提供商的限速效率和响应一致性。社区正在积极完善模型元数据和新模型（包括 Claude Sonnet 4（200K 上下文窗口））的成本追踪。

---

### **2. 发布与破坏性变更**  
- **v1.103.5**：今日发布，通过 [cosign 签名的 Docker 镜像](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 增强安全性；自 `0112e53` 以来的所有版本均使用 Sigstore 签名，可通过 `cosign verify` 验证。  
- **破坏性变更（PR #46601）**：非数字型 `thinking.budget_tokens` 在 hosted_vllm、非 Claude `/v1/messages` 及 `litellm.adapter_completion` 中现在将返回 400 或在 `drop_params` 下丢弃。使用 `reasoning_effort_levels` 的部署现在会在每条路由上对推理努力值进行四舍五入——请谨慎升级。

---

### **3. 新模型与硬件支持**  
- **Claude Sonnet 4（200K 上下文）**：通过 [PR #47202](https://github.com/BerriAI/litellm/pull/47202) 更新至 `model_prices_and_context_window.json`，现已正确反映所有 AWS Bedrock 变体（如 `anthropic.claude-sonnet-4-20250514-v1:0` 等）的 `max_input_tokens = 200000`。价格保持不变。  
- **Gemini 实时头像（avatar_config）**：功能请求 [Issue #43166](https://github.com/BerriAI/litellm/issues/43166) 正在跟踪 `bidiGenerateContent` 会话中实时头像生成的集成支持。  
- **SAP GenAI Hub**：现可通过 `sap/` 模型前缀支持，但 [Issue #47096](https://github.com/BerriAI/litellm/issues/47096) 中指出每次调用存在约 870ms 的性能开销（因重复调用 AICORE API）。

---

### **4. 性能与优化**  
- **限速效率**：[PR #47197](https://github.com/BerriAI/litellm/pull/47197) 通过批量处理限速并按哈希发送脚本，将 Redis 轮询次数从 3 次减少至 1 次——对共享 Redis 部署是显著优化。  
- **后台成本映射获取**：[PR #43963](https://github.com/BerriAI/litellm/pull/43963) 将远程成本映射加载移至后台线程，解决了当 GitHub 不可达时导致的 5 秒导入延迟。  
- **预留提示压缩**：[PR #47200](https://github.com/BerriAI/litellm/pull/47200) 支持可选返回压缩后的提示及其省略原因，提升对提示优化的可见性。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |
|--------|------|------|--------|
| 严重 | 异步 `.acompletion()` 无法触发 `CustomLogger` 回调 | 已关闭 | [PR #46953](https://github.com/BerriAI/litellm/pull/46953) – 若护栏在流传输中阻断，现在会以错误事件结束流 |
| 高 | `/key/generate` 在缺少 `get_spend_routes` 权限时返回 500 而非 403 | 开放 | [PR #47112](https://github.com/BerriAI/litellm/pull/47112) – 现返回 403 并附带清晰错误信息 |
| 高 | v1.103.0 之后团队作用域模型的批量检索失败 | 开放 | [Issue #46958](https://github.com/BerriAI/litellm/issues/46958) – 内部模型名称与团队模型列表不匹配 |
| 高 | 流式处理在后端省略 `choices[].index` 时崩溃，报错 `NoneType + int` | 已关闭 | [PR #46047](https://github.com/BerriAI/litellm/pull/46047) – 已在 v1.103.5 中修复 |
| 中 | Gemini TTS 成本日志显示为 0 tokens | 已关闭 | [PR #44551](https://github.com/BerriAI/litellm/pull/44551) – 现已正确记录使用量 |
| 中 | Titan 嵌入批量记录零 token 使用量 | 已关闭 | [PR #45058](https://github.com/BerriAI/litellm/pull/45058) – 已修复 |

---

### **6. 对应用开发者的意义**  
- **使用 `cosign verify`** 验证生产环境中所有 LiteLLM Docker 镜像。  
- 若使用 `reasoning_effort_levels` 或自定义 `thinking.budget_tokens`，请谨慎升级——非数字值现在会快速失败。  
- **利用新审计功能**：即将推出的“密钥用量”视图 ([Issue #46804](https://github.com/BerriAI/litellm/issues/46804)) 将支持按虚拟密钥和令牌指标过滤用量。  
- **避免过度使用 SAP GenAI Hub 接口**——每次调用因重复 AICORE 查询带来约 870ms 延迟 ([Issue #47096](https://github.com/BerriAI/litellm/issues/47096))，建议本地缓存。  
- **监控批量对账**——旧批次可能丢失可恢复的成本 ([PR #47190](https://github.com/BerriAI/litellm/pull/47190))，因此请确保通过 `success_callback` 注册成功回调，而不仅依赖 `custom_logger`。

> ✅ **行动项**：升级至 **v1.103.5+**，并在升级前审查破坏性变更。审计任何依赖 `get_spend_routes` 的逻辑。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-18**

---

### **1. 今日亮点**  
Unsloth 项目持续快速演进，Studio 在模型管理与代理工作流方面迎来重大架构优化。针对 AMD ROCm（gfx1030/gfx1201）和 Windows ARM 构建，已引入关键稳定性修复，解决了 GPU 驱动问题及 UAC 提示弹窗。若干关键 PR 还通过虚拟化聊天历史改善了内存管理，并提升了音视频流水线中的错误可见性。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未发布新版本。但因活跃的合并请求，多项破坏性变更即将生效：
- **分布式训练需使用 `UNSLOTH_BLOCK_COMPILE=0` 临时绕过**，适用于非可重入梯度检查点场景（参见 [Issue #14063](https://github.com/unslothai/unsloth/issues/14063)）。
- **AMD ROCm 兼容性在更新后不稳定**，已在 RDNA2 显卡上报告 PyTorch 绑定失败（参见 [Issue #14057](https://github.com/unslothai/unsloth/issues/14057)，[Issue #14085](https://github.com/unslothai/unsloth/issues/14085)）。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm (gfx1030/gfx1201)**：持续聚焦于 ROCm 集成修复；近期更新引入回归问题，影响 Windows 和 Linux 上的 PyTorch/HIP 绑定。
- **Windows ARM**：CI 流水线现固定 `pyarrow` 与 `sqlite-vec` 版本标签，以确保轮子包的安全签名（[PR #14092](https://github.com/unslothai/unsloth/pull/14092)）。
- **新模型家族**：图像与视频模型现默认使用托管量化文本编码器（如 `text_encoder_quant=auto`），显著降低加载时间和内存占用（[PR #14009](https://github.com/unslothai/unsloth/pull/14009)，[PR #14000](https://github.com/unslothai/unsloth/pull/14000)）。
- **Audio.cpp 模型**：现已正确路由至对应 UI 页面（[PR #14072](https://github.com/unslothai/unsloth/pull/14072)）。

---

### **4. 性能与优化**  
- **内存优化**：虚拟化长聊天历史大幅降低内存使用量（[PR #14001](https://github.com/unslothai/unsloth/pull/14001)）。
- **模型加载速度**：图像/视频模型家族采用托管量化文本编码器，相比密集编码器提升加载速度约 30–50%（[PR #14009](https://github.com/unslothai/unsloth/pull/14009)，[PR #14000](https://github.com/unslothai/unsloth/pull/14000)）。
- **内核效率**：预构建内核 wheel 下载量减少 50%，缓解下载缓慢导致的卡顿问题（[PR #14051](https://github.com/unslothai/unsloth/pull/14051)）。
- **训练优化**：已修复 Nemotron 损失归一化及 Qwen PLE 打包文档边界问题，确保梯度累积正确与序列保真度（[PR #14002](https://github.com/unslothai/unsloth/pull/14002)，[PR #14011](https://github.com/unslothai/unsloth/pull/14011)）。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 🔴 高 | [Issue #14063](https://github.com/unslothai/unsloth/issues/14063) | 分布式运行中反向传播时出现 `CheckpointError`，由非可重入检查点上的不安全块编译引发 | ✅ 已通过 `UNSLOTH_BLOCK_COMPILE=0` 修复 |
| 🔴 高 | [Issue #14057](https://github.com/unslothai/unsloth/issues/14057) | 更新后 AMD Radeon RX 6800 XT（RDNA2）上 PyTorch ROCm/GPU 绑定中断 | ⚠️ 修复暂未激活；待调查 |
| 🔴 高 | [Issue #14085](https://github.com/unslothai/unsloth/issues/14085) | ROCm 启动失败 + Windows 上 AMD gfx1201 显示闪烁/硬锁死 | ⚠️ 尚无修复；关联 `llama.cpp` b11696 |
| 🟡 中 | [Issue #14055](https://github.com/unslothai/unsloth/issues/14055) | macOS v0.1.908-beta 上出现 JavaScript 错误（`undefined is not an object`） | ❌ 无修复；疑似前端状态问题 |
| 🟡 中 | [Issue #12552](https://github.com/unslothai/unsloth/issues/12552) | 最近更新后长上下文聊天出现延迟 | ⚠️ 正在讨论；需性能剖析 |
| 🟡 中 | [Issue #14086](https://github.com/unslothai/unsloth/issues/14086) | 下载的音频模型未显示在库存中 | ⚠️ UX 问题；怀疑为后端同步异常 |

---

### **6. 对应用开发者的启示**  
- **在分布式环境中避免使用 `block_compile`**，直至稳定 —— 可暂时使用 `UNSLOTH_BLOCK_COMPILE=0` 作为规避方案。
- **预期 AMD GPU 上的 ROCm 不稳定**，尤其在 Windows 平台；除非在隔离环境测试，否则请勿随意更新。
- **优先使用托管量化模型**，以实现图像/视频代理更快的启动速度与更低的内存开销。
- **设计代理时考虑模型持久性感知**：新 MCP 代理追踪机制可防止长时间任务中模型意外卸载（[PR #14088](https://github.com/unslothai/unsloth/pull/14088)）。
- **优雅处理音视频错误**：改进后的诊断机制可暴露根本原因，而非仅返回通用 500 错误（[PR #14075](https://github.com/unslothai/unsloth/pull/14075)）。
- **在长期运行应用中启用虚拟化聊天历史**，以减轻内存压力并防止 OOM 崩溃。

> *对于生产部署：锁定版本，监控 ROCm/CUDA 兼容性，并在分布式负载下验证模型生命周期行为。*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*