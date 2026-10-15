# AI 基础设施日报 2026-10-15

> 生成时间: 2026-10-15 00:46 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-15**

---

### **1. 生态概览**  
2026年第四季度，AI推理基础设施格局呈现出高性能服务引擎、本地运行时优化与智能体感知网关之间的快速融合。各项目正聚焦于混合模型支持（Mamba/GDN）、分布式推理可扩展性（PD解耦、RPC集群）以及生产级稳定性——尤其在多GPU、长上下文和推测性解码工作负载下表现突出。尽管vLLM和SGLang在低延迟引擎创新方面领先，而Ollama和llama.cpp则主导轻量级部署与跨平台兼容性。安全且可观测性丰富的网关如LiteLLM的出现，标志着该技术栈日趋成熟，成本追踪、链路追踪与信任机制已成为核心关切。

---

### **2. 活动对比**

| 项目        | 开启问题（严重/高危） | 近24小时合并的PR | 发布版本（稳定/夜间） | 状态 |
|----------------|------------------------------|--------------------------|------------------------------|--------|
| **vLLM**       | 17（3严重，5高危）      | 12                       | 稳定版：`v0.30.0`<br>夜间版：损坏（`v0.31.0-cu129`） | 活跃但夜间构建不稳定 |
| **SGLang**     | 18（3严重，5高危）      | 6                        | 稳定版：`v0.5.20`<br>无新发布 | 生产导向；CI不稳定 |
| **llama.cpp**  | 16（4严重，4高危）      | 7                        | 无新发布；已合并破坏性变更 | 稳定性优先开发 |
| **Ollama**     | 14（2严重，4高危）      | 5                        | `v0.40.5-rc0` 已发布         | 发布频繁，含破坏性变更 |
| **LiteLLM**    | 12（2高危，2中等）        | 5                        | `v1.107.0-dev.1`，`v1.106.0-rc.3` | 安全导向，开发管道稳定 |
| **Unsloth**    | 10（2严重，3高危）      | 6                        | 无新发布                | 桌面应用拓展 |

> ✅ *vLLM和SGLang展现出最高工程速度；Ollama以显著的破坏性变更引领发布频率。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构       | 支持项目                          | 备注 |
|----------------------------------|----------------------------------------|-------|
| **Gemma4ForSequenceClassification** | vLLM（PR #43726）                     | 首个支持非词表尺寸头的项目 |
| **NemotronH_Omni_Reasoning_V3**   | llama.cpp（PR #30520）                | 支持视觉与多模态图结构 |
| **maion-coder**                   | llama.cpp（PR #29778）                | 原生加载与图结构构建 |
| **DeepSeek-V4.1-Flash**           | SGLang（确认），Ollama（云）   | SGLang已验证多GPU部署 |
| **Clef / Clef Flash**             | Ollama（云）                        | 新增云原生模型 |
| **K2 Horizon MoE (0.9B–36B)**     | 路线图（Ollama，Issue #18698）        | 尚未支持；需求强烈 |
| **混合 Mamba/GDN**              | vLLM，SGLang                         | vLLM集成更深；SGLang在推测解码方面领先 |

> 🏆 **胜者**：**vLLM** 在基础模型支持（如Gemma4分类）上领先；**SGLang** 在复杂智能体就绪模型（DeepSeek-V4.1）上领先；**Ollama** 在以云为先的模型交付上占优。

---

### **4. 性能前沿**

| 关注领域                  | 领先项目                             | 关键进展 |
|-----------------------------|----------------------------------------------|------------------|
| **KV缓存优化**   | vLLM，SGLang                                 | 混合Mamba前缀缓存开销（11–16%）；FlashInfer FP8 vs NVFP4性能差距（约慢1.8倍） |
| **量化内核**    | vLLM，llama.cpp                              | MXFP4 GEMV（RDNA3.5），FP8 MMA（SM90），PTQ1_0（CUDA） |
| **分布式服务**     | vLLM（PD解耦），Unsloth（RPC）      | 跨请求上下文污染风险（vLLM #61160）；多机GGUF服务（Unsloth #13726） |
| **批处理与批处理效率** | SGLang，vLLM                           | 持久top-k归约（SGLang），Stream-K网格上限（llama.cpp） |
| **内核级加速** | vLLM（Triton），SGLang（Monokernel RFC）     | 原生逐令牌FP8 Triton（RDNA4）；Monokernel插件框架提案 |

> 🔥 **热点**：**vLLM的混合Mamba/GDN + 前缀缓存交互** 是当前最活跃的优化前沿——直接影响吞吐量与正确性。

---

### **5. 层级定位**

| 项目       | 主要层级               | 角色摘要 |
|---------------|------------------------------|--------------|
| **vLLM**      | **推理引擎**         | 高吞吐、内核优化的服务架构，支持PD解耦与推测解码 |
| **SGLang**    | **智能体就绪推理栈** | 全流程智能体工作流支持：引擎 + 调度器 + 工具链 + 推测解码 |
| **llama.cpp** | **本地运行时 / 边缘优化器** | CPU/GPU混合推理，以GGUF为核心，支持视觉模型，修复Vulkan/AMD驱动问题 |
| **Ollama**    | **模型网关 / CLI平台** | 统一接口用于模型管理、云端访问及OpenAI兼容API |
| **LiteLLM**   | **API网关 / 可观测层** | 成本追踪、OpenTelemetry、流式工具调用处理、通过签名镜像实现安全 |
| **Unsloth**   | **桌面智能体运行时**    | 集成UI，支持多模态工具，外部图像生成，多服务器编排 |

> 💡 **战略差异化**：  
> - **vLLM/SGLang**：作为可扩展推理的后端引擎。  
> - **Ollama/LiteLLM**：作为开发者与运维者的抽象层。  
> - **Unsloth**：弥合桌面用户体验与分布式AI系统之间的鸿沟。

---

### **6. 趋势信号**

#### **从今日活动提炼的关键行业趋势：**
1. **混合架构已成为主流**  
   → vLLM与SGLang如今积极优化**混合Mamba/GDN模型**，表明大模型+状态空间模型融合已不再是实验性概念，而是进入生产就绪阶段。

2. **分布式推理正面临稳定性危机**  
   → 多个关键问题（vLLM #61160，SGLang #43412）凸显**跨请求数据泄露**与**崩溃风险**，尤其是在PD解耦环境中。这表明行业推进速度已超过可靠性保障能力。

3. **安全与信任在规模化下不可妥协**  
   → LiteLLM采用**cosign签名Docker镜像**，Ollama发出破坏性变更警告，表明**供应链完整性**已成为基本要求。

4. **智能体工作流需要全栈集成**  
   → SGLang的权重缓存守护进程、Ollama的`custom_tool_call`、LiteLLM的`traceresponse`头部均指向**智能体专用优化**正成为标准。

5. **硬件特定缺陷持续升级**  
   → RTX 5090 CUDA卡死（#27330）、AMD Strix Halo Vulkan崩溃（#30364）、Intel iGPU VRAM报告错误（#29277）揭示**新硬件引入了意料之外的边缘案例**。

---

### **对应用开发者的建议**  
- 在vLLM/SGLang修复合并前，避免在混合Mamba/GDN模型上启用推测解码。  
- 在PD解耦环境中使用`--no-enable-prefix-caching`以防止数据泄露。  
- 使用LiteLLM或Ollama时，通过`cosign verify`验证Docker镜像完整性。  
- 若部署于RTX 5090或AMD RX 9060 XT，建议测试`v0.40.5-rc0`或更早版本。  
- 在动态LoRA环境里，利用单核（SGLang）和权重缓存守护进程（SGLang）实现快速模型重启。  
- 在仅重排序服务器（llama.cpp）中监控KV缓存膨胀，主动设置`--cache-ram`限制。

> ✅ **结论**：生态正在快速成熟——但**稳定性、安全性与正确性仍是首要挑战**。选择技术栈应基于**生产就绪程度**，而非仅看性能基准。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-15

---

### **1. 今日亮点**  
vLLM 项目持续深化对混合 Mamba/GDN 模型及 AMD ROCm 硬件的支持，修复了前缀缓存正确性问题以及多标记预填充场景下推测解码的稳定性问题。今日关键 PR 解决了基于 NIXL 的分离部署中的静默数据损坏问题，以及 Mamba2 在 SM90 上持续存在的 NaN 输出缺陷，均影响生产环境可靠性。

---

### **2. 发布与破坏性变更**  
*无*。过去 24 小时内未发布新版本。最新稳定版仍为 `v0.30.0`，夜间构建版（`v0.31.0-cu129`）目前因 CUDA 版本不匹配导致启动失败（参见 [PR #60406](https://github.com/vllm-project/vllm/pull/60406)）。

---

### **3. 新模型与硬件支持**  
- **新模型**：通过 [PR #43726](https://github.com/vllm-project/vllm/pull/43726) 增加对 `Gemma4ForSequenceClassification` 的支持，实现非词表大小输出头。
- **ROCm / AMD**：  
  - 为 MI355 添加 `DeepSeek-V4.1 Mono Decode Numerics` 的 CI 任务 ([PR #61720](https://github.com/vllm-project/vllm/pull/61720))。  
  - 在 gfx950 上启用 MiniMax-M3 的仅索引器上下文并行 ([PR #57909](https://github.com/vllm-project/vllm/pull/57909))。  
  - 将默认 ROCm 镜像更新至 10.0（"TheRock"），弃用 7.2 版本 ([PR #58761](https://github.com/vllm-project/vllm/pull/58761))。
- **量化**：为 RDNA3/RDNA3.5 解码新增实验性 MXFP4 GEMV 内核 ([PR #60413](https://github.com/vllm-project/vllm/pull/60413))；在 SM90 上启用 Gemma-4 全注意力路径的 FP8 MMA ([PR #60372](https://github.com/vllm-project/vllm/pull/60372))。

---

### **4. 性能与优化**  
- **内核层**：针对 RDNA4（Radeon AI PRO R9700）引入原生逐标记 FP8 Triton 线性后端，并附带调优配置 ([PR #61091](https://github.com/vllm-project/vllm/pull/61091))。  
- **混合 Mamba**：混合 Mamba 前缀缓存（`mamba_cache_mode="align"`）在无缓存命中时带来 **11–16% 吞吐量损耗**，凸显仍需进一步优化 ([Issue #60008](https://github.com/vllm-project/vllm/issues/60008))。  
- **FlashInfer**：在 SM120（Blackwell 消费级）上，NVFP4 KV 缓存因果预填充性能比 FP8 **慢约 1.7–1.8 倍**，表明量化路径存在性能退化问题 ([Issue #50416](https://github.com/vllm-project/vllm/issues/50416))。  
- **推测解码**：针对混合 GDN 模型中多标记推测解码与前缀缓存交互问题的 PR ([PR #52244](https://github.com/vllm-project/vllm/pull/52244)) 旨在恢复缓存命中率。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|------|-------------|------------|
| 严重 | [Issue #61160](https://github.com/vllm-project/vllm/issues/61160) | PD 分离部署中自动前缀缓存导致共享前缀复用 → 跨请求上下文污染 — **响应内容泄露其他请求信息**。 | 开放；使用 DeepSeek-V4.1-Flash 可复现。 |
| 高 | [Issue #61229](https://github.com/vllm-project/vllm/issues/61229) | NixlConnector：远程读取期间释放 KV 块 → 解码阶段消费被覆盖块 → 静默数据损坏。 | 开放；影响 P/D 分离部署完整性。 |
| 高 | [Issue #60660](https://github.com/vllm-project/vllm/issues/60660) | FlashInfer MNNVL allreduce 在多块长预填充过程中触发 `CUDA_ERROR_ILLEGAL_ADDRESS` 崩溃。 | 开放；即使禁用 MTP/fusion 仍存在。 |
| 中 | [Issue #54521](https://github.com/vllm-project/vllm/issues/54521) | Qwen3.8-Flash-Next 贪心解码在接近 `indexer_budget` 时出现非确定性行为，源于 `persistent_topk`。 | 开放；影响大规模确定性推理。 |
| 中 | [Issue #51663](https://github.com/vllm-project/vllm/issues/51663) | 从 v0.24.0 起，Qwen3.6-35B-A3B-FP8 出现巨大输出标记吞吐量下降。 | 开放；在 v0.26.0 中依然存在。 |

---

### **6. 对应用开发者的启示**  
- **在 PD 分离部署环境中避免使用自动前缀缓存**，直到 [issue #61160](https://github.com/vllm-project/vllm/issues/61160) 修复 — 否则可能导致跨请求数据泄露。
- **若使用带前缀缓存的混合 Mamba/GDN 模型，请禁用推测解码** — 当前行为会静默禁用缓存命中 ([issue #54360](https://github.com/vllm-project/vllm/issues/54360))，降低效率。
- **如服务 Qwen3.8-Flash-Next 或 GLM-5.3 等模型时遇到非确定性或缓存损坏**，可临时使用 `--no-enable-prefix-caching` ([issues #54521](https://github.com/vllm-project/vllm/issues/54521), [#57406](https://github.com/vllm-project/vllm/issues/57406))。
- **运行 Mamba2 于 SM90 时注意监控 NaN 输出** — 使用 [PR #61718](https://github.com/vllm-project/vllm/pull/61718) 或避免自动调优配置，直至补丁发布。
- **在 SM120 上使用 NVFP4 量化时预期延迟波动** — 除非精度有特殊要求，否则建议优先选用 FP8。

> 🔗 *上述所有问题与 PR 均已在 vLLM GitHub 仓库中持续跟踪。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **1. 今日亮点**  
SGLang 项目持续推进生产级推理栈的演进，针对 DeepSeek-V4.1 在多种硬件上的稳定性提升与深度优化，包括 8× RTX PRO 6000（SM120）配置。关键进展包括 *Monokernel 框架* 的新 RFC、推测解码鲁棒性持续优化，以及在测试用例不稳定的情况下积极稳定 CI 基础设施。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新发布或破坏性变更。*  
- 当前最新稳定版本仍为 `v0.5.20`（构建于 2026-09-18）。  
- 今日未引入迁移说明或弃用项。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1-Flash**：已在 **8× RTX PRO 6000（SM120，仅 PCIe）** 生产环境确认可用 —— 经 @Lei-010 实地测试，测得吞吐量并验证了推测解码 A/B 测试 ([#40877](https://github.com/sgl-project/sglang/issues/40877))。  
- ✅ **T-Head PPU（Zhenwu 810/810E/M890P）**：已启动首类支持路线图，通过 [RFC #37519](https://github.com/sgl-project/sglang/issues/37519)，目标是集成至核心 SGLang 运行时。  
- ✅ **Intel XPU HiCache L1<->L2 分层**：通过 PR [#32503](https://github.com/sgl-project/sglang/pull/32503) 启用，将分层 KV 缓存支持扩展至 CUDA/ROCm 之外。  
- ⚠️ **AMD ROCm DCP 上下文并行**：仍受阻于 triton sparse-MLA 后端；PR [#44322](https://github.com/sgl-project/sglang/pull/44322) 旨在解决该问题。

---

### **4. 性能与优化**  
- 🔥 **权重缓存守护进程（第一阶段）**：通过每 rank 守护进程 + CUDA IPC，使 Qwen3-235B FP8 的引擎启动时间从 ~306–327 秒降至 **<1 秒** ([#33522](https://github.com/sgl-project/sglang/issues/33522))。  
- 🚀 **DeepSeek-V4.1 优化**：正在进行 mHC（仅限 DSV41）重构，`q_rope_store` 融合进 `fused_q_norm_rope`，以及混合扩展重塑修复 ([#42170](https://github.com/sgl-project/sglang/issues/42170))。  
- 📈 **MegaMoE 延迟降低**：引入持久 top-k reduce，消除 FlashInfer 内核中的解码开销 ([#39832](https://github.com/sgl-project/sglang/pull/39832))。  
- 🧩 **Monokernel 框架 RFC**：提议在 `python/sglang/experimental/monokernels/` 下采用插件式 monokernel 设计 ([#43949](https://github.com/sgl-project/sglang/issues/43949)) —— 支持灵活的内核调度与安全强制。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 严重 | [#43412](https://github.com/sgl-project/sglang/issues/43412) | 推测解码在 **首个非贪婪请求** 时导致服务器崩溃，原因为 `flashinfer verify-sampling op` 中 JIT 失败（pip 安装包与捆绑 cccl 版本冲突） | ❌ 未解决；SIGKILL 杀死进程树 |
| 高 | [#42012](https://github.com/sgl-project/sglang/issues/42012) | GLM-5.3-Flash 在 SM120 上触发 **CUDA 图捕获** 时崩溃（混合扩展重塑）；仅 Triton 后端可用 | ❌ 阻塞中，待后端修复 |
| 高 | [#43988](https://github.com/sgl-project/sglang/issues/43988) | `--fp4-gemm-backend marlin` 在 SM100 上使用 NVFP4 W4A4 检查点时崩溃（未注册 'marlin' 后端） | ❌ FP4 路径回归问题 |
| 中 | [#44188](https://github.com/sgl-project/sglang/issues/44188) | Dumper 过滤器 `eval()` 在未设置 `--admin-api-key` 时可引发 **调度器进程远程代码执行** | ⚠️ 安全风险；暂无修复方案 |
| 中 | [#43708](https://github.com/sgl-project/sglang/issues/43708) | 多模态预处理期间解码音频时长/采样数无界 | ❌ 影响内存安全性 |

> 🔍 **CI 健康状态**：不稳定的测试和基础设施故障仍普遍存在 —— 已在 [#42752](https://github.com/sgl-project/sglang/issues/42752) 中追踪。若不稳定持续存在，可能重新启用 CI 维护模式。

---

### **6. 对应用开发者的意义**  
- **在消费级 GPU 上部署复杂智能体？** 现在可可靠地在 **8× RTX PRO 6000（仅 PCIe）** 上运行 **DeepSeek-V4.1-Flash** —— 极适合低成本智能体推理集群 ([#40877](https://github.com/sgl-project/sglang/issues/40877))。  
- **需要更快的模型重启速度？** 使用新的 **权重缓存守护进程** 可实现亚秒级引擎恢复 —— 对动态 LoRA 切换或高频模型重载至关重要 ([#33522](https://github.com/sgl-project/sglang/issues/33522))。  
- **避免推测解码崩溃？** 在 SM100 上避免使用 `--fp4-gemm-backend marlin`，并在 [#43412](https://github.com/sgl-project/sglang/issues/43412) 修复前禁用推测解码。  
- **构建安全系统？** 不要对 `--dumper-filter` 使用 `eval()` —— 存在远程代码执行风险 ([#44188](https://github.com/sgl-project/sglang/issues/44188))。  
- **优化内存使用？** 监控 `--enable-symm-mem` 行为 —— 其未正确隔离于静态内存池，可能导致启动后内存溢出 ([#44106](https://github.com/sgl-project/sglang/issues/44106))。  

👉 **建议**：使用 `v0.5.20` 或更高版本，避免在非贪婪路径上使用不稳定的推测解码功能，并在生产部署前关注相关 PR 的修复进展。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 消息简报 – 2026-10-15**

---

### **1. 今日重点**  
最新开发周期聚焦于多 GPU 和视觉增强模型的关键稳定性修复，尤其集中在服务器模式下的 KV 缓存处理以及 Vulkan/AMD 驱动兼容性方面。针对 CUDA 与 Vulkan 后端的重大性能优化已合并，包括 MMQ 流-k 网格上限控制和 Flash Attention 的排序改进——这对 RTX 5090 和 AMD Arc 显卡上的高吞吐推理至关重要。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未发布新版本。但已有若干**破坏性变更**被合并或提出：  
- `--prefetch-experts-slots` 现已作为稳定标志可用于 MoE 模型优化（PR #28414）。  
- `ggml_backend_vk_get_device_memory` 现在可在 Windows 系统的 Intel 集成 GPU 上正确报告显存使用情况（修复了 `free > total` 的错误值）——**注意**：此更改可能影响下游内存预算逻辑（Issue #29277）。  
- `jinja` 模板输出现在以完整精度写入浮点数（兼容 Python），解决了工具定义中的舍入问题（PR #30362）。

> 🔗 [PR #28414](https://github.com/ggml-org/llama.cpp/pull/28414) | [PR #30362](https://github.com/ggml-org/llama.cpp/pull/30362)

---

### **3. 新模型与硬件支持**  
- **新增模型架构**：  
  - 通过 PR #29778 增加对 `maion-coder` 的支持（原生加载与图结构构建）。  
  - 为 **Nemotron Super 3.5 VL** 与 **Nemotron Bolt 74B A9B** 添加 `NemotronH_Omni_Reasoning_V3` 架构支持，包含视觉图功能（PR #30520）。  
- **硬件/后端改进**：  
  - AMD Adreno 850 GPU 现可通过 OpenCL 编译器版本解析正确识别（PR #30555）。  
  - Vulkan 后端增强对 gfx1151（Strix Halo）设备的长上下文处理支持（Issue #30364）。  
  - CUDA 现在支持 **PTQ1_0** 量化格式（PR #29676）。

> 🔗 [PR #29778](https://github.com/ggml-org/llama.cpp/pull/29778) | [PR #30520](https://github.com/ggml-org/llama.cpp/pull/30520) | [PR #30555](https://github.com/ggml-org/llama.cpp/pull/30555)

---

### **4. 性能与优化**  
- **CUDA**：  
  - MMQ 内核现将 Stream-K 网格大小限制为实际工作单元，降低启动开销与修复延迟（PR #30553）。  
  - 低比特类型（q4_K、q8_0）的 MMVQ 实现更快，矩阵链运算中表现出可测量的提速（基准测试显示比噪声基线提升约 2–3%）。  
- **Vulkan**：  
  - Flash Attention 的软上限现提前应用于掩码前（PR #30546），修正了可能影响长上下文准确性的语义错误。  
  - 改进 RPC 张量日志输出，显示人类可读的单位（KiB/MiB/GiB），有助于分布式推理调试。  
- **SYCL**：  
  - 修复因不支持查询头维度（D=2048/4096）导致的 Flash Attention 崩溃问题（PR #30286）。  
  - CI 流水线通过用 DLE + oneDNN 替代 oneAPI 包，实现优化（PR #30131），显著缩短构建时间。

> 🔗 [PR #30553](https://github.com/ggml-org/llama.cpp/pull/30553) | [PR #30546](https://github.com/ggml-org/llama.cpp/pull/30546) | [PR #30286](https://github.com/ggml-org/llama.cpp/pull/30286)

---

### **5. 稳定性与回归问题**  
今日报告的关键稳定性问题包括：  
1. **RTX 5090 在启用 CUDA Graphs 时发生挂起**（设置 `GGML_CUDA_DISABLE_GRAPHS=1` 可临时规避）——使用 `gemma4-assistant` 可复现，疑似与 SM_120 内核调度有关（Issue #27330）。  
2. **Vulkan 在 AMD Strix Halo（gfx1151）上触发 `ubatch > 128` 时崩溃** → 报错 `amdgpu device lost`（Issue #30364）。  
3. **Metal 初始化阶段内存溢出（OOM）导致静默 500 错误**——即使严重内存不足，服务器仍绑定端口（Issue #27309）。  
4. **`gemma4-assistant` 中 Flash Attention 因查询头维度不匹配（neq0 != HSK）而崩溃**（Issue #29419）——已在 PR #30286 中修复。  
5. **仅重排服务器中提示缓存膨胀**，单次调用最高消耗达 8 GiB RAM（Issue #26293）——通过 PR #30498 已缓解（仅保存可恢复状态）。

> 🔗 [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) | [Issue #30364](https://github.com/ggml-org/llama.cpp/issues/30364) | [Issue #29419](https://github.com/ggml-org/llama.cpp/issues/29419) | [PR #30498](https://github.com/ggml-org/llama.cpp/pull/30498)

---

### **6. 对应用开发者的意义**  
- **对 CPU 主机专家的 MoE 模型**，请使用 `--prefetch-experts-slots N` 以减少生成过程中的 I/O 延迟。  
- **在 RTX 5090 上避免使用 CUDA Graphs**，直到 #27330 修复完成——生产环境请使用 `GGML_CUDA_DISABLE_GRAPHS=1`。  
- **对于视觉模型**，务必使用最新构建版本：视觉增强模型保存 KV 缓存存在缺陷（Issue #19466），因此可能需要手动管理状态。  
- **若精度重要，请从使用 `tojson` 的 `jinja` 模板迁移**：浮点输出现已完整保留，不再截断。  
- **在集成显卡（如 Ryzen AI Max+ PRO）上需谨慎监控显存使用**：`ggml_backend_vk_get_device_memory` 现反映真实内存预算，可能影响卸载决策。

> ✅ **最佳实践**：始终使用 `--cache-ram` 限制进行测试，并在仅重排或 MTP 工作流中监控提示缓存行为。建议采用 PR #30498 的补丁以避免静默内存膨胀。

---  
*数据来源: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*  
*简报生成时间: 2026-10-15*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### **Ollama Digest — 2026-10-15**

#### **1. 今日亮点**  
最新发布的 `v0.40.5-rc0` 在跨后端兼容性方面带来关键改进，将 Metal 自定义内核移植至 CUDA，显著提升 NVIDIA GPU 上的性能表现。与此同时，生产环境中暴露出多个高严重性稳定性问题——最突出的是影响 `glm-5.3-flash:cloud` 的集群级数据损坏漏洞，以及在 Windows 系统上使用 RTX 5090 和 Cohere MoE 模型时持续崩溃的问题。

#### **2. 发布与破坏性变更**  
- **v0.40.5-rc0**：今日发布，重点修复了 GPU 后端互操作性和 OpenAI 兼容 API 的鲁棒性问题。
  - 🔧 **CUDA 移植**：通过 [PR #18657](https://github.com/ollama/ollama/pull/18657)，Metal 自定义内核现已支持 CUDA，提升了 Apple 与 NVIDIA 硬件间推理的一致性。
  - 🛠️ **OpenAI 兼容性**：新增对响应历史中自定义工具调用的支持 ([PR #18986](https://github.com/ollama/ollama/pull/18986))，助力更丰富的代理工作流。
  - ⚠️ **破坏性变更提醒**：升级后 `nimble:latest` 及类似模型可能无法加载，因格式已弃用 ([Issue #18998](https://github.com/ollama/ollama/issues/18998))。用户需重新下载受影响模型。

#### **3. 新模型与硬件支持**  
- ✅ **新云模型**：通过 [PR #18969](https://github.com/ollama/ollama/pull/18969)，Clef 与 Clef Flash 已上线 Ollama Cloud。
- 📌 **模型请求**：K2 Horizon 模型系列（0.9B–36B MoE）已加入路线图；官方请求提供 GGUF 支持 ([Issue #18698](https://github.com/ollama/ollama/issues/18698))。
- 💻 **硬件**：RTX 5090 正在积极排查 CUDA 内存访问错误问题 ([Issue #18642](https://github.com/ollama/ollama/issues/18642))；AMD RX 9060 XT 用户报告 Tensile 库加载失败 ([Issue #17782](https://github.com/ollama/ollama/issues/17782))。

#### **4. 性能与优化**  
- 🔥 **延迟担忧**：多份报告指出，`0.40.4` 版本后响应速度出现退化，尤其在决策类模型如 `nimble`、`tev` 与 `clef-flash` 上表现明显 ([Issue #19002](https://github.com/ollama/ollama/issues/19002))。
- 📈 **效率提升**：聚焦于提示词计时精度的 PR，通过考虑缓存命中情况来改善准确性 ([PR #18964](https://github.com/ollama/ollama/pull/18964))，以及减少代理请求中的无谓 HTML 转义 ([PR #19008](https://github.com/ollama/ollama/pull/19008))，显著提升大规模吞吐能力。
- 🧠 **量化洞察**：新集成的 `llama-roofline` ([PR #18997](https://github.com/ollama/ollama/pull/18997)) 使开发者可在不完整加载模型的前提下，检查实际的 GGUF 量化类型。

#### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 链接 |
|--------|------|--------|------|
| 严重 | `glm-5.3-flash:cloud`：集群 829 数据区损坏 → 全部为零 → 无限重复（the = the...） | 开放 | [Issue #18980](https://github.com/ollama/ollama/issues/18980) |
| 严重 | RTX 5090 上运行 Cohere MoE 推理时（Windows）发生 CUDA 非法内存访问崩溃 | 开放 | [Issue #18642](https://github.com/ollama/ollama/issues/18642) |
| 高 | `deepseek-v4.1-flash:cloud`：图像输入超过 ~655k token 时返回 500 错误 | 开放 | [Issue #18853](https://github.com/ollama/ollama/issues/18853) |
| 高 | `clef-flash`：强制 `n_ubatch = n_ctx` 导致默认 `num_ctx=16384` 下内存溢出 | 开放 | [Issue #18865](https://github.com/ollama/ollama/issues/18865) |
| 中等 | `gemma4:12b`：需未设置 `ctx_other` —— 会静默失败 | 开放 | [Issue #18898](https://github.com/ollama/ollama/issues/18898) |
| 中等 | `/api/show` 与 `/api/tags` 元数据中忽略 `OLLAMA_CONTEXT_LENGTH` | 开放 | [Issue #18995](https://github.com/ollama/ollama/issues/18995) |

> ✅ **修复进行中**：多个 PR 正在解决 OpenAI ID 冲突风险 ([PR #18996](https://github.com/ollama/ollama/pull/18996), [#18655](https://github.com/ollama/ollama/pull/18655)) 与外源压缩处理 ([PR #19003](https://github.com/ollama/ollama/pull/19003))。

#### **6. 对应用开发者的启示**  
- **代理工作流**：利用响应历史中新支持的 `custom_tool_call` ([PR #18986](https://github.com/ollama/ollama/pull/18986))，实现多提供商状态延续的健壮机制。通过升级避免客户端 `chatcmpl-rand.Intn(999)` 的限制，防止 ID 冲突。
- **云部署**：在根本原因未解决前，请谨慎使用 `glm-5.3-flash:cloud` —— 预期约 5–8% 的场景会出现性能退化。尽可能启用本地降级方案。
- **硬件特定构建**：若目标为 RTX 5090 或 AMD RX 9060 XT，建议使用 `v0.40.5-rc0` 或更早版本进行测试；若崩溃持续，可考虑回滚。
- **模型管理**：升级时注意破坏性变更——若 `nimble` 类模型加载失败，请重新下载。严格使用 `OLLAMA_CONTEXT_LENGTH` 实现有效上下文控制。
- **工具链**：充分利用新集成的 `llama-roofline` 与 `gknowledge`，深入诊断模型行为并优化 RAG 流水线。

> 🔗 完整问题追踪器：[github.com/ollama/ollama/issues](https://github.com/ollama/ollama/issues)  
> 🔬 开发者指南：[docs.ollama.ai](https://docs.ollama.ai)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 摘要 — 2026-10-15**

---

#### **1. 今日亮点**  
LiteLLM v1.107.0-dev.1 引入了通过 cosign 签名的 Docker 镜像，增强了安全性，强化了发布流程中的信任机制。关键修复解决了 Gemini 与 Claude 模型在流式工具调用处理上的问题，新增的成本追踪功能确保 AgentCore 网络搜索在 AWS $0.007/查询 的计价模式下实现精准计费。一项重大 PR 改进了 OpenTelemetry 调用链路的可见性，对采样响应返回 W3C `traceresponse` 头信息。

---

#### **2. 版本发布与破坏性变更**  
- 发布 **v1.107.0-dev.1**、**v1.106.0-rc.3** 与 **v1.105.1**，均附带经验证的 cosign 签名（密钥来自 [commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)）。  
- **安全提示**：所有 Docker 镜像现已进行密码学签名——请使用 `cosign verify` 进行校验。  
- **迁移提醒**：未报告破坏性 API 变更；但依赖 `litellm.turn_on_message_logging` 的用户需注意该参数已不再存在（参见 [#37143](https://github.com/BerriAI/litellm/issues/37143)）。

---

#### **3. 新模型与硬件支持**  
- **GPT-5 模型**：默认通过 `/v1/responses` 端点路由（依据 [#33114](https://github.com/BerriAI/litellm/issues/33114)），与 OpenAI 新版 API 合约保持一致。  
- **AgentCore 网络搜索**：完整支持并正确建模成本（`agentcore/search` 按 $0.007/查询 定价），已在成本映射中更新（[#46554](https://github.com/BerriAI/litellm/pull/46554)、[#46558](https://github.com/BerriAI/litellm/pull/46558)）。  
- **通过 Anthropic 兼容 `/v1/messages` 使用 Gemini 3+**：流式工具调用现在能正确发出独立的 `tool_use` 块，而非合并为无效 JSON（[#46492](https://github.com/BerriAI/litellm/pull/46492)）。

---

#### **4. 性能与优化**  
- **流式效率**：修复确保在伪造的响应流中，工具调用参数与文本仅发送一次（[#46533](https://github.com/BerriAI/litellm/pull/46533)），减少冗余负载。  
- **MCP 网关优化**：工具解析现限定于所属服务器范围，消除不必要的跨服务器 `tools/list` 调用（[#46545](https://github.com/BerriAI/litellm/pull/46545)）。  
- **成本准确性**：`input_cost_per_query` 现在按每个搜索工具独立生效，支持自定义定价而无需分叉成本映射（[#46560](https://github.com/BerriAI/litellm/pull/46560)）。

---

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 修复状态 | GitHub 链接 |
|---------|------|------------|-------------|
| 高 | OpenWebUI 中 `gpt-5` 思考输出缺失，因缺少 deepseek-r1 风格路由 | 待处理 | [#13419](https://github.com/BerriAI/litellm/issues/13419) |
| 高 | 虚拟密钥更新失败，提示“仅企业版可用”，尽管非企业环境使用 | 待处理 | [#15230](https://github.com/BerriAI/litellm/issues/15230) |
| 中 | 当 `LiteLLM_EndUserTable` 表行数超过约 100 万时，预算重置无法提交 | 进行中 | [#46404](https://github.com/BerriAI/litellm/issues/46404) |
| 中 | 流程中 429 错误可能错误地冷却降级部署 | 进行中 | [#45645](https://github.com/BerriAI/litellm/issues/45645) |
| 低 | `validate_environment()` 在无 API key 的 ZAI 模型下返回假阳性 | 已修复 | [#32962](https://github.com/BerriAI/litellm/issues/32962) |

> ✅ **今日已合并修复的 PR**：  
> - [#46533](https://github.com/BerriAI/litellm/pull/46533)：修复伪造流项格式问题  
> - [#46492](https://github.com/BerriAI/litellm/pull/46492)：正确拆分多工具数据块  
> - [#46554](https://github.com/BerriAI/litellm/pull/46554)：正确计价 AgentCore 网络搜索  

---

#### **6. 对应用开发者的意义**  
- **使用 `/v1/responses` 路由 GPT-5 模型** — 确保客户端使用新端点以支持推理与工具调用。  
- **启用 OpenTelemetry 跟踪**，设置 `LITELLM_OTEL_V2=1`，获取 `traceresponse` 头信息，提升分布式系统可观测性。  
- **避免虚拟密钥错误**：在 [#15230](https://github.com/BerriAI/litellm/issues/15230) 修复前，勿尝试修改超出基础元数据的密钥内容。  
- **监控预算重置**：若用户表规模庞大，请考虑数据库索引或定期清理，防止 `budget_reset_at` 值过期。  
- **确保 AgentCore 工具的正确成本核算**：如使用自定义定价，务必验证每个工具的 `input_cost_per_query` 已正确设置。  

> 🔍 **专业提示**：在 CI/CD 流程中对所有 LiteLLM Docker 镜像使用 `cosign verify` 以确认完整性。

---  
*摘要生成时间：2026-10-15 | 来源：[GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-15**

---

### **1. 今日亮点**  
Unsloth 桌面应用程序持续扩展其多模态与多服务器功能，关键 PR 实现了通过 OpenAI 兼容端点进行外部图像生成（#13756）、改进浏览器代理行为（#13777），以及针对 AMD GPU 的扩散模型内存规划优化（#13786）。关键稳定性修复已合并：macOS 下 Ctrl+C 处理问题（#13782）和旧款 AMD 显卡的 Vulkan 回退机制（#13776）；新增支持模型级音频设置（#13764）与 GitHub 文件解析功能（#13754），显著提升易用性。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未报告新版本发布或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **外部图像生成**：Studio 现可通过“图像”标签页，经由外部连接（如 Ollama、vLLM、llama.cpp）生成图像（#13756）。  
- **AMD GPU 优化**：为不支持 ROCm 的 AMD 显卡（如 Vega 10）添加 Vulkan 回退支持，防止仅使用 CPU 的降级情况（#13666）。  
- **集成式 AMD GPU 支持**：PR #13786 为集成式 AMD GPU（Strix Halo/Point）引入 MiniMax-H3 GGUF 的预留内存预算机制，提升渲染可靠性。  
- **模型级音频设置**：默认音频选项现已根据各模型推荐值初始化，增强一致性（#13764）。

---

### **4. 性能与优化**  
- **融合 INT8 GEMM 延迟修复**：Triton 3.8 中的回归问题导致 A100/L4 出现性能下降；现已实现基于延迟的调度机制，在不牺牲精度的前提下恢复性能（#13772）。  
- **内存规划优化**：  
  - 学习激活峰值后，扩散模型（如 FLUX.2-klein）的内存预留可动态调整，降低 8–24GB 显卡上的 OOM 错误概率（#13724）。  
  - 卸载规划器现综合考虑 `llama.cpp` 内部适配器与溢出成本，改善负载均衡（#9872）。  
- **多机器服务**：PR #13726 实现单个 GGUF 模型通过 `llama.cpp` RPC 在 N 台机器上分发服务，支持构建可扩展的推理集群（#13726）。

---

### **5. 稳定性与回归问题**  
- **严重 macOS Ctrl+C 中断崩溃**：`llama-server` 在通过 Ctrl+C 中断时因信号重复处理导致崩溃；已在 #13782 修复。  
- **集成式 AMD GPU 上 Vulkan OOM 问题**：旧款 AMD GPU 因 GTT 预算不足无法渲染；#13786 通过预留固定权重解决此问题。  
- **Windows 输入框可见性问题**：窗口最大化时输入栏被任务栏遮挡；PR #13616 修复布局溢出问题。  
- **图像编辑中的 CUBLAS 错误**：`diffusion_prompt_cache.py` 中的 `TypeError` 在 Qwen-Image-2.1 编辑过程中触发 CUBLAS 错误；相关修复 #13638 正在进行中。  
- **FP8 预量化提交限制耗尽**：在 Windows 上，FP8 文本编码器预量化可能耗尽提交限制，导致分片加载失败；已在 #12860 解决。

---

### **6. 对应用开发者的影响**  
开发者现在可通过桌面应用部署多模型、多服务器架构，每个实例可独立配置 `llama.cpp`（#8488），非常适合代理编排场景。新增外部图像生成能力（#13756）及改进的音频默认值（#13764）简化了与第三方 AI 服务的集成。对于高性能推理，建议利用新的延迟门控 INT8 GEMM（#13772）与卸载规划器优化（#9872），以在 A100/L4 及混合显卡环境下最大化吞吐量。请确保 macOS 用户更新至最新版本，避免中断时崩溃；测试 AMD GPU 工作流时启用 Vulkan 回退。可使用 `UNSLOTH_SMART_OFFLOAD` 探索高级内存规划策略。  

👉 [PR #13772](https://github.com/unslothai/unsloth/pull/13772) | [PR #13756](https://github.com/unslothai/unsloth/pull/13756) | [PR #13786](https://github.com/unslothai/unsloth/pull/13786)

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*