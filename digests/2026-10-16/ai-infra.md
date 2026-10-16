# AI 基础设施日报 2026-10-16

> 生成时间: 2026-10-16 00:39 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **跨项目AI基础设施生态报告 – 2026-10-16**

---

#### **1. 生态概览**  
2026年第四季度，AI推理基础设施格局正迅速向**硬件感知、多模态及原生代理执行**演进，由下一代GPU（Blackwell SM120、GB300）、MoE/MoVA模型以及低延迟推测解码驱动。各项目愈发聚焦于**跨平台可移植性**（ROCm、Metal、Vulkan）与**分布式服务效率**，而稳定性仍是持续挑战——尤其在高并发或混合负载下。文本扩散型LLM与统一模型服务网关的出现，标志着从静态提示-响应模式向动态、多模态代理工作流的转变。

---

#### **2. 活跃度对比**

| 项目 | 开启问题数 | 近7日合并的PR数 | 发布状态 |
|--------|-------------|----------------------------|----------------|
| **vLLM** | 98 | 15 | 无新发布；`main` 分支活跃 |
| **SGLang** | 112 | 18 | 无新发布；v0.5.20 稳定版 |
| **llama.cpp** | 134 | 22 | **v0.7.0 已发布**（关键支持MoE与推测解码） |
| **Ollama** | 187 | 9 | 即将发布 v0.40.5（支持Q2_0、MiniCPM-V 4.7） |
| **LiteLLM** | 76 | 14 | v1.107.0-dev.2 / v1.106.0-rc.4（安全加固） |
| **Unsloth** | 68 | 16 | v0.1.908-beta（Nemotron 3.5 Bolt、Muse Spark Open） |

> ✅ *核心洞察：* **llama.cpp** 在发布速度上领先，推出重大 v0.7.0 版本；**Ollama** 在 v0.40.5 发布前展现出强劲势头，而 **vLLM/SGLang** 尽管活跃度高，仍处于稳定化阶段。

---

#### **3. 模型支持竞赛**

| 新模型/架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash (GB300)** | ✅（低延迟解码路径） | ✅（8× SM120 PCIe） | ❌ | ⚠️（开发中） | ❌ | ❌ |
| **NVIDIA Nemotron 3.5 ASR 流式传输** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **NVIDIA Nemotron 3.5 Bolt (24GB)** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅（v0.1.908-beta） |
| **Meta Muse Spark Open** | ✅（待FlashInfer支持） | ❌ | ✅ | ❌ | ❌ | ✅（v0.1.908-beta） |
| **K2 Horizon (MoVA)** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Prism** | ❌ | ❌ | ✅ | ✅（通过 Q2_0 GGUF） | ❌ | ❌ |
| **GLM-5.3-Flash** | ⚠️（SM120 上 FA4 崩溃） | ✅（仅 Triton 支持） | ✅ | ✅ | ✅ | ❌ |

> 🏆 **排行榜**：  
> - **llama.cpp** 与 **Unsloth** 在**新模型覆盖**方面领先（支持 Muse Spark Open、K2 Horizon、Prism）。  
> - **vLLM** 在**高性能硬件适配**方面领先（支持 GB300、SM90、ROCm gfx950）。  
> - **Ollama** 在模型支持上落后，但通过 `Q2_0 GGUF` 与 `MiniCPM-V 4.7` 正逐步追赶。

---

#### **4. 性能前沿**

| 优化重点 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存与前缀缓存** | 🔥 融合马尔可夫循环、PD分离修复 | ⚠️ PD预填充时存在过期KV | ✅ 主机内存MoE缓存（`--moe-cache-mib`） | ⚠️ `--cache-prompt` 导致显存耗尽 | ⚠️ `request_id` 重复使用 → 花费日志丢失 | ✅ 并行聊天KV抢占（`--preempt-ram`） |
| **推测解码** | 🔥 低延迟 `decode_backend=low_latency` | ⚠️ DFLASH 中出现退化循环 | 🔥 LiliCorr + `draft-mtp` | ⚠️ GLM-5.3-Flash 退化 | ⚠️ 预算绕过影响公平性 | ❌ |
| **量化与卸载** | 🔥 MXFP4 W4A16/W4A4（ROCm） | ⚠️ 量化支持有限 | 🔥 Q1_0/Q2_0 通过 `gguf-py`，MoE卸载 | ✅ 支持 Q2_0 GGUF | ⚠️ 静默成本追踪损坏 | ✅ 选择性MoE反量化（`UNSLOTH_MOE_SELECTIVE_DEQUANT=1`） |
| **分布式服务与扩展** | 🔥 流水线并行（MoE R3）、CUDA图 | 🔥 多GPU分离（PD）、HiCache | ⚠️ RTX 4090 上 Draft-MTP 速度减半 | ⚠️ A100 总线损耗，RTX 5090 崩溃 | ✅ 路由、重试逻辑、上下文扩展 | ✅ 自动GPU负载均衡、`device_map="auto"` |
| **内核与后端效率** | 🔥 FA2 头打包注意力、MoE步长强制 | 🔥 KDA 内核适配 SM90、深度堆栈即时捕获 | 🔥 Vulkan 步长 f16 KV 复制 | ⚠️ Metal 段错误、CUDA 非法访问 | 🔥 重试抖动、`Retry-After` 优先级处理 | 🔥 ROCm Flash注意力时序探测 |

> 🔥 **性能领先者**：  
> - **vLLM**：注意力与MoE优化达到行业顶尖水平。  
> - **llama.cpp**：主机内存卸载与量化灵活性领导者。  
> - **Unsloth**：代理场景下的分布式与缓存性能最强。

---

#### **5. 层级定位**

| 项目 | 主要层级 | 核心差异化 |
|--------|---------------|--------------------|
| **vLLM** | **高性能推理引擎** | 针对大规模低延迟、高吞吐推理优化；适用于云API后端。 |
| **SGLang** | **以代理为中心的运行时 + 网关** | 专为复杂多轮代理工作流设计，具备对分词、调度和流式输出的精细控制能力。 |
| **llama.cpp** | **本地推理运行时** | 轻量、跨平台，适合边缘设备、桌面端及离线部署，支持全CPU/GPU控制。 |
| **Ollama** | **面向开发者的网关 + CLI** | 简化本地模型部署；弥合开发者体验与生产环境之间的鸿沟。 |
| **LiteLLM** | **通用网关与编排层** | 将多个后端（vLLM、Ollama等）聚合为单一API；对成本追踪与可观测性至关重要。 |
| **Unsloth** | **代理优化训练 + 推理栈** | 集成微调（DeepSpeed）、提示缓存与高效KV共享——适用于代码与推理类代理。 |

> 💡 **战略洞察**：生态正走向分化：**专用引擎**（vLLM、SGLang）作为后端算力核心，而**网关**（LiteLLM、Ollama）则作为开发者与代理的抽象层。

---

#### **6. 趋势信号**

**1. 原生代理执行已成为新基准**  
- 如 **Unsloth**（并行KV抢占）、**SGLang**（toktier分词器）、**llama.cpp**（LiliCorr）等项目正针对**多步推理**、**工具调用**与**上下文持久化**进行优化，而非仅关注吞吐量。  
- *开发者关注点*：优先选择具备**持久会话状态**、**高效缓存共享**与**流式可靠性**的系统。

**2. 硬件特化加速推进**  
- **vLLM** 与 **SGLang** 正深度投入 **SM120（Blackwell）** 与 **GB300** 优化。  
- 所有项目均在推进 **ROCm** 支持，但存在**不稳定性风险**（如AMD OOM崩溃、静默CUDA IMA问题）。  
- *开发者关注点*：尽早验证硬件特定行为；避免在 **RTX 5090 / AMD RX 6750 XT** 上投入生产，直至补丁落地。

**3. 量化与内存卸载已成主流**  
- **llama.cpp** 的 `--moe-cache-mib` 与 **Unsloth** 的选择性反量化表明，**主机内存卸载**已非实验性功能——而是规模化部署MoE模型的必要条件。  
- *开发者关注点*：尽可能使用 `Q2_0` 与 `MXFP4` 方案，以实现**更低内存占用与更快推理**。

**4. 安全与可观测性不可妥协**  
- **LiteLLM** 现已提供**带签名的Docker镜像**——在受监管环境中是必备项。  
- 关键问题如 **SpendLog 数据丢失** 与 **预算强制绕过** 显现了对**审计就绪基础设施**的需求。  
- *开发者关注点*：强制镜像签名，禁用未认证请求，并严格监控 `SpendLogs`。

---

### **面向应用开发者的最终建议**  
在可扩展云推理场景中部署 **vLLM**，在本地/离线代理执行中使用 **llama.cpp**，并将 **LiteLLM** 作为通用网关。对于重度代理工作流，**Unsloth** 提供最成熟的工具链。在投入生产前务必在**真实硬件**上验证——特别是 **RTX 5090、AMD ROCm、A100 PCIe** 平台——并升级至 **v0.40.5+（Ollama）**、**v0.7.0（llama.cpp）** 与 **v1.106+/v1.107（LiteLLM）** 以确保稳定性与安全性。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-16**

---

### **1. 今日亮点**  
vLLM 项目在优化多模态和 MoE 工作负载方面持续发力，针对 AMD ROCm（gfx950/MI355X）和 NVIDIA Hopper（sm90）平台实现了关键性能提升。重要 PR 包括修复 sm90 GPU 上 Mamba2 的 NaN 输出问题，以及为 GB300 平台上的 DeepSeek-V4.1-Flash 引入新的低延迟解码路径，支持更快的推测性解码。与此同时，RFC 正在推进 ViT CUDA Graphs 和标准化 MonoKernels 支持，以增强引擎可扩展性。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未发布新版本。然而，`main` 分支的持续变更可能影响依赖以下功能的用户：
- `--mamba-block-size`（因移除 `mamba_cache_mode="all"` 而失效，详见 [Issue #60838](https://github.com/vllm-project/vllm/issues/60838)）
- 管道并行下的 MoE 路由（R3 支持正通过 [PR #61897](https://github.com/vllm-project/vllm/pull/61897) 加入）

> ⚠️ **迁移提示**：从旧版 vLLM 升级的用户在使用 `torch.compile` 时，应验证模型特定标志如 `--enforce-eager` 的兼容性。

---

### **3. 新模型与硬件支持**  
- ✅ **新增模型支持**：  
  - 通过 [PR #47455](https://github.com/vllm-project/vllm/pull/47455) 添加对 **NVIDIA Nemotron 3.5 ASR 流式处理**（`nemotron-3.5-asr-streaming-0.6b`）的初步支持。  
  - 通过 [PR #61879](https://github.com/vllm-project/vllm/pull/61879) 添加 **Muse Spark Open** 模型支持，依赖 FlashInfer PR #6544。

- ✅ **硬件与后端进展**：  
  - **ROCm（AMD gfx950 / MI355X）**：针对 Qwen3.8-Flash-Next ([#59575](https://github.com/vllm-project/vllm/issues/59575)) 与 Qwen3.8-2.4T-A95B ([#57149](https://github.com/vllm-project/vllm/issues/57149)) 启动性能优化追踪。  
  - **NVIDIA SM90**：已应用修复，解决 Mamba2 chunk scan kernel 中导致 NaN 输出的问题 ([PR #61718](https://github.com/vllm-project/vllm/pull/61718))。

- ✅ **量化格式扩展**：  
  - 通过 [PR #60886](https://github.com/vllm-project/vllm/pull/60886) 扩展了 ROCm 平台上 **MXFP4 W4A16/W4A4** 量化方案的测试覆盖范围。

---

### **4. 性能与优化**  
- 🔥 **低延迟解码路径**：  
  [PR #61868](https://github.com/vllm-project/vllm/pull/61868) 为 **DeepSeek-V4.1-Flash** 在 **GB300** 上引入可选的低批大小解码路径，利用融合的 Markov 循环与后前向 CUDA Graphs。早期基准测试显示，在推测性解码场景下显著降低延迟。

- 🚀 **注意力优化**：  
  [PR #61784](https://github.com/vllm-project/vllm/pull/61784) 改进了 SM8x GPU（A100、RTX 30/40）上短查询长缓存上下文的 FA2 注意力，通过头打包 + KV 分割注意力核函数减少内存流量。

- ⚙️ **MoE 与内核融合**：  
  - [PR #61749](https://github.com/vllm-project/vllm/pull/61749) 在 MoE 前向操作中强制精确步长，解决了 `NVIDIA-Nemotron-3-Nano-30B-A3B-NVFP4` 模型出现垃圾输出的问题。  
  - [PR #51406](https://github.com/vllm-project/vllm/pull/51406) 在 ROCm 上为 Qwen3-Next/Qwen3.5 启用融合的 QK-norm+RoPE+gate Triton 内核，通过消除冗余内核启动提升吞吐量。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|--------|------|--------|------------|
| 🔴 高 | **sm90 上 Mamba2 的 NaN 输出** ([#61603](https://github.com/vllm-project/vllm/issues/61603)) | 生成过程中崩溃或产生无效输出 | ✅ 已在 [PR #61718](https://github.com/vllm-project/vllm/pull/61718) 中修复 |
| 🔴 高 | **RTX 3090 上静默 CUDA IMA（退出码 0）** ([#53726](https://github.com/vllm-project/vllm/issues/53726)) | 混合 GDN + MTP k=3 + 异步调度下静默崩溃 | ❌ 尚无修复；尽管此前类问题已修复，仍持续存在 |
| 🟡 中 | **PD 解耦合中的跨请求上下文污染** ([#61160](https://github.com/vllm-project/vllm/issues/61160)) | 通过共享前缀缓存导致请求间敏感数据泄露 | ⚠️ 存在复现方法；修复待定 |
| 🟡 中 | **MLA kv_b_proj 上的 LoRA 被静默忽略** ([#48974](https://github.com/vllm-project/vllm/issues/48974)) | DeepSeek V2/V3/R1 等模型上 LoRA 适配器未能生效 | ⚠️ 临时方案：禁用吸收功能 |

---

### **6. 对应用开发者的意义**  
- **使用 `--enforce-eager`** 作为 `torch.compile` 下 MoE 模型出现垃圾输出的临时解决方案（例如 Nemotron-3-Nano）。
- **避免使用 `--mamba-block-size`**，若你使用的是较新的 vLLM 构建版本——由于 `mamba_cache_mode="all"` 已被弃用，该参数已无效。
- **在 GB300 上启用低延迟解码路径**：通过 `decode_backend=low_latency`（最新 main 分支中的可选功能）。
- **在 PD 解耦合环境中谨慎使用前缀缓存**：建议使用 `--no-enable-prefix-caching` 以规避跨请求污染风险。
- **关注 gfx950/MI355X 上 ROCm 的性能回归**——尽管优化正在进行中，部分模型（如 Kimi K2.5）在高 KV 压力工作负载下仍表现出不稳定性。

> 💡 **实用技巧**：对于生产部署，建议使用 [vLLM Simulator](https://github.com/vllm-project/vllm/issues/61406)（RFC）在真实集群部署前模拟硬件感知性能。

---  
*数据来源：[vLLM GitHub Repository](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-10-16

---

### **1. 今日亮点**

SGLang 项目持续推进对下一代硬件的支持，重点优化了针对 NVIDIA Blackwell（SM120）系统及多 GPU 分离式工作流的性能与稳定性。关键进展包括提出一种新的 `toktier` 分词器后端方案，用于基于 CPU 的增量分词，以及一系列 CI/基础设施修复，解决了不稳定的测试和存储预取超时问题。

---

### **2. 发布与破坏性变更**

- **无**  
  过去 24 小时内未发布新版本。最新稳定版仍为 `v0.5.20`，如现场报告中引用的 `lmsysorg/sglang:v0.5.20` Docker 镜像所示。

---

### **3. 新模型与硬件支持**

- **NVIDIA RTX PRO 6000 (SM120)**：现场验证确认在 **8× SM120 GPU（仅 PCIe，无 NVLink）** 上成功部署 **DeepSeek-V4.1-Flash**，相关预填充/解码吞吐量数据已在 #40877 中报告。
- **AMD ROCm 支持**：PR #44599 使五个多模态单元测试具备 ROCm 友好性，推动与 MI300 平台的兼容性进展。
- **新分词器后端提案**：RFC #44374 提出一个可选的 `toktier` 后端，支持精确、分块并行、基于 CPU 的分词——非常适合低延迟预处理流水线。

> 🔗 [RFC: 可选启用 toktier 分词器](https://github.com/sgl-project/sglang/issues/44374)

---

### **4. 性能与优化**

- **统一内存预热**：PR #44592 通过预热统一内存池中的压缩移动操作，降低服务启动延迟，减少首次使用开销。
- **异构张量并行下的 KV 打包**：PR #44615 实现跨异构张量并行传输的高效 KV 打包，提升混合架构环境下的可扩展性。
- **CUDA Graph 优化**：PR #44607 确保 deepstack 媒体预填充在 CUDA Graph 中保持“急切执行”状态，修复 Qwen3-VL 等视觉语言模型的重放问题。
- **KDA 内核扩展**：PR #44612 将 CuTe DSL MTP 验证内核扩展至 **SM90（Hopper）**，扩大 Kimi Delta Attention 对更广泛 GPU 的兼容性。
- **扩散运行时优化**：PR #44606 在导入扩散流水线时推迟完整垃圾回收，高模块数量场景下将导入时间开销降低约 30%。

> 🔗 [PR: 统一内存预热](https://github.com/sgl-project/sglang/pull/44592)  
> 🔗 [PR: KDA 内核扩展至 SM90](https://github.com/sgl-project/sglang/pull/44612)  
> 🔗 [PR: 扩散 GC 优化](https://github.com/sgl-project/sglang/pull/44606)

---

### **5. 稳定性与回归问题**

| 严重性 | 问题 | 摘要 | 修复状态 |
|--------|------|------|----------|
| ⚠️ 高 | #42752: 不稳定的 CI / 基础设施失败 | `PR Test Base/Extra` 运行中因不稳定的 CI 基础设施反复失败；影响 PR 审查速度。 | 进行中 — 通过 #17050 跟踪 |
| ⚠️ 高 | #42012: GLM-5.3-Flash 在 CUDA-graph 捕获时崩溃 | FA4 注意力后端在 SM120 上对混合扩展重塑失败；仅 Triton 可用。 | 尚无修复 — 需上游内核调优 |
| ⚠️ 高 | #40843: 使用 DFLASH 时推理输出严重重复 | GLM-5.3-Flash 在推测解码（`dflash`）下进入退化循环。 | 尚无修复 — 来自近期 AITER 变更的回归 |
| ⚠️ 中 | #44070: 使用早期缓存前缀发送时 PD 预填充存在过期 KV | 早期传输可能与 HiCache 加载回填竞争，导致无声解码错误。 | 修复待定 — 问题可复现 |
| ⚠️ 中 | #44369: NIXL PD 中止导致工作线程阻塞 | 中止请求会留下传输工作线程等待健康句柄，引发死锁。 | 尚无修复 — 生产环境高风险 |

> 🔗 [不稳定的 CI 跟踪器](https://github.com/sgl-project/sglang/issues/42752)  
> 🔗 [GLM-5.3-Flash FA4 崩溃](https://github.com/sgl-project/sglang/issues/42012)  
> 🔗 [PD 预填充中的过期 KV](https://github.com/sgl-project/sglang/issues/44070)

---

### **6. 对应用开发者的意义**

- **在代理流水线中使用 `toktier`（可选）**，以实现确定性、低延迟的 CPU 分词，尤其适用于无法或不愿将任务卸载到 GPU 的场景。
- **在 #42012 修复前避免在 SM120 上使用 `fa4` 注意力**——对于 GLM-5.3-Flash 与 DeepSeek-V4.1-Flash，建议继续使用 **Triton** 后端。
- **在使用 HiCache 与 PD 分离式架构时，若启用 `early_cached_prefix_send`，请谨慎**，直到 #44070 修复为止——存在过期 KV 损坏风险。
- **监控 CI 健康状况**——持续的不稳定性（#42752）可能导致合并与测试延迟；预计 PR 审查将出现延迟。
- **准备迎接 AMD 支持**——当前 ROCm 友好测试已通过，但全面生产就绪仍需进一步验证。

> 💡 小贴士：对于使用复杂工具链的高吞吐量代理与 GLM-5.3-Flash，建议临时禁用推测解码，直至 #40843 修复。

---  
*摘要由 GitHub 数据生成：sgl-project/sglang | 2026-10-16*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-10-16**

---

### **1. 今日亮点**  
`v0.7.0` 版本引入了 **LiliCorr 推测解码** 和 **GLM5-Next 的 MTP（多线程性能分析）**，当通过 `--moe-cache-mib` 将 MoE 专家卸载到主机内存时，可实现高达 **~2.2x** 的解码速度提升。新增模型支持包括 **Muse Spark Open**（文本、视觉、音频）、**K2 Horizon（密集型与 MoVA）** 以及 **Prism**，进一步扩展了多模态和高效推理能力。

---

### **2. 发布与破坏性变更**  
- **v0.7.0** 已发布：[GitHub Release](https://github.com/ggml-org/llama.cpp/releases/tag/v0.7.0)  
  - 引入 `--moe-cache-mib`，用于将 MoE 专家缓存至主机内存（最高可达 ~2.2x 提速）。  
  - 新增 `--moe-cache-topk`，用于限制主机缓存层中活跃专家的数量（PR #30593）。  
  - **破坏性变更**：合并的 `draft-mtp` + 外部草稿（`-md`）现在需要显式处理 MTP 上下文；此前在 #27839 中报告的初始化崩溃问题已在 PR #27897 中修复。

---

### **3. 新模型与硬件支持**  
- **新增模型**：  
  - **Muse Spark Open**（潜在空间 MoE，含 256 个专家，维度为 4096，残差流为 8192）：[PR #30616](https://github.com/ggml-org/llama.cpp/pull/30616)  
  - **K2 Horizon（密集型与 MoVA）**：支持视觉/音频输入的多模态推理。  
  - **Prism**：新加入生态系统的开源模型。  
  - **maion-coder**：新增对代码生成模型的支持（PR #29778）。  

- **硬件与后端更新**：  
  - **Metal**：添加 flash attention 内核的 BF16 变体（[PR #30491](https://github.com/ggml-org/llama.cpp/pull/30491)）。  
  - **Vulkan**：优化 f16 KV 复制的分步策略，以更优地跨 AMD 内存通道分布（[PR #27703](https://github.com/ggml-org/llama.cpp/pull/27703)）。  
  - **Hexagon**：重写张量重新打包逻辑，支持瓦片化/扁平化量化及浮点权重（[PR #30635](https://github.com/ggml-org/llama.cpp/pull/30635)）。

---

### **4. 性能与优化**  
- **MoE 卸载**：`--moe-cache-mib` 允许将 MoE 专家缓存至主机内存，减少 PCIe 通信开销，在 GLM5-Next 等模型上可将解码吞吐量提升 **最高达 ~2.2x**。  
- **推测解码**：LiliCorr 技术提升了推测草稿效率；`--spec-type draft-mtp` 现已支持通过 `-md` 完全集成外部草稿（修复 #27839）。  
- **内核优化**：  
  - Vulkan：针对内存通道分布优化分步 f16 KV 复制（[PR #27703](https://github.com/ggml-org/llama.cpp/pull/27703)）。  
  - SYCL：修复 `llama_sampler_dist_apply` 中 IQ3 量化导致的崩溃问题（PR #30604）。  
- **量化支持**：`gguf-py` 增加对 Q1_0 与 Q2_0 的支持（PRs #30620, #30630），实现基于 numpy 的反量化。

---

### **5. 稳定性与回归问题**  
- **严重问题**：  
  - **#27428**（CUDA/多 GPU）：在层拆分场景下，Draft-MTP 使提示处理速度减半 —— 仍未解决，但已在 RTX 4090 上报告。  
  - **#30610**（Metal）：`ggml_metal_op_mul_mat_id` 中出现段错误，涉及 Nemotron 3.5 Bolt 74B-A9B —— 很可能与 Metal 内核启动边界有关。  
  - **#30577**（llama-server）：通过 `--cache-prompt` 导致显存耗尽的拒绝服务攻击 —— 服务器在空闲槽恢复后无法回收内存。  
- **中等严重问题**：  
  - **#29418**（Vulkan）：MTP 推测解码中张量分块时发生 `GGML_ASSERT(neq0 == HSK)` 失败 —— 在 gfx1151 上报告。  
  - **#30617**（转换）：Granite Switch 的 block_count 写入过高 —— 导致加载失败（已在 PR #30621 修复）。  
- **正在修复中的问题**：  
  - PR #27897 修复合并 `draft-mtp + -md` 初始化崩溃问题。  
  - PR #30621 修复 Granite Switch 转换错误。

---

### **6. 对应用开发者的意义**  
- **使用 `--moe-cache-mib`** 可显著降低大模型（如 GLM5-Next 或 Qwen3-Coder）在拥有充足内存的系统上的 MoE 推理延迟。  
- **启用 LiliCorr 推测解码**（`--spec-type draft-mtp`）以实现更快、更低延迟的补全 —— 非常适合代理工作流。  
- **在高并发场景下避免使用 `--cache-prompt`**，直到 #30577 解决；若观察到内存压力，建议在生产环境中禁用提示缓存。  
- **对于多设备部署**，使用 Vulkan 在 AMD GPU 上测试时需谨慎 —— 已知长提示和设备丢失问题（#30364, #29418）。  
- **利用新模型支持**（Muse Spark Open, K2 Horizon）构建多模态代理；确保你的流水线正确处理 `reasoning_content` 与 `content` 输出（参见 #30246）。  
- **更新构建脚本**，通过 `gguf-py`（PR #30630）包含 Q1_0/Q2_0 支持，实现灵活的量化工作流。

> 🔗 完整变更日志：[GitHub v0.7.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.7.0)  
> 📊 活跃问题：[GitHub Issues](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### **Ollama Digest — 2026-10-16**

#### **1. 今日亮点**  
自10月12日起，用户报告 `glm-5.3-flash:cloud` 出现严重回归问题，导致文本大量退化（重复出现“the = the =”），证据指向集群数据损坏。与此同时，新硬件上暴露出多项稳定性问题——RTX 5090 CUDA 崩溃、RX 6750 XT 上 ROCm 内存溢出段错误，以及在预热阶段出现 A100 PCIe 总线丢失，凸显出 GPU 后端支持日益复杂的挑战。社区持续呼吁提升工具链对齐（如 MLX 的 `OLLAMA_NUM_PARALLEL` 支持）和用户体验改进，例如聊天文件夹与推理开关控制。

#### **2. 发布与破坏性变更**  
*无*  
过去24小时内未发布新版本。但预计 **v0.40.5** 将包含来自 PR #18967（Q2_0 GGUF 支持）和 PR #19032（llama.cpp 升级至 b11669）的关键修复，从而实现 Q2_0 量化支持并解决 MiniCPM-V 4.7 加载失败问题。

#### **3. 新模型与硬件支持**  
- ✅ **MiniCPM-V 4.7**: PR #19024 将 llama.cpp 升级至 b11551，修复了 `unknown projector type: minicpmv4_7` 错误。[PR #19024](https://github.com/ollama/ollama/pull/19024)  
- ✅ **Q2_0 GGUF**: 通过 PR #18967 添加支持，处理张量类型 42/文件类型 41，使低精度模型（如 Prism ML 的 Bon）得以使用。[PR #18967](https://github.com/ollama/ollama/pull/18967)  
- 🚩 **RTX 5090 (CUDA)**: 运行 Cohere MoE 模型时持续出现非法内存访问（`MUL_MAT`）崩溃。[Issue #18642](https://github.com/ollama/ollama/issues/18642)  
- 🚩 **ROCm (AMD)**: `gemma4:26b-a4b` 在将层卸载至 CPU 时因 hipGraphInstantiate 内存溢出错误失败；禁用图编译（`GGML_CUDA_DISABLE_GRAPHS=1`）可避免崩溃。[Issue #19015](https://github.com/ollama/ollama/issues/19015)  
- 🚩 **A100 PCIe 总线丢失**: 在 v0.34.4 和 v0.35.0 版本中运行 Qwen3.5 推理时反复出现总线丢失，即使回滚版本也未能解决。[Issue #19006](https://github.com/ollama/ollama/issues/19006)

#### **4. 性能与优化**  
- 🔧 **MLX 引擎限制**: 尽管设置了 `OLLAMA_NUM_PARALLEL`，仍存在顺序请求处理问题，阻碍 Apple Silicon 上的真正并发。功能请求 #17280 旨在实现批处理解码支持。[Issue #17280](https://github.com/ollama/ollama/issues/17280)  
- ⚠️ **CPU 降频崩溃**: 默认 `n_threads` 忽略 cgroup CPU 配额与 cpuset 限制，在容器环境中导致吞吐量下降约 45 倍。[Issue #17916](https://github.com/ollama/ollama/issues/17916)  
- 💡 **GGUF v4 优化**: PR #19037 增加 64KB DMA 页面对齐及零拷贝张量映射的 O(1) token 跨度查找——对快速模型检查与高吞吐推理至关重要。[PR #19037](https://github.com/ollama/ollama/pull/19037)  
- ⏱️ **文本分类器变慢**: 用户报告在 v0.40.4 之后，`nimble`、`clef-flash` 与 `tev1` 的响应时间明显下降。[Issue #19002](https://github.com/ollama/ollama/issues/19002)

#### **5. 稳定性与回归**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|---------|------|--------|------------|
| 严重 | `glm-5.3-flash:cloud` 退化（大量重复） | 失败率 5–8%；疑似集群数据损坏 | [Issue #18980](https://github.com/ollama/ollama/issues/18980) |
| 严重 | RTX 5090 CUDA 非法内存访问（MUL_MAT） | Windows 上服务器崩溃；阻塞 MoE 模型使用 | [Issue #18642](https://github.com/ollama/ollama/issues/18642) |
| 高 | A100 PCIe 总线丢失发生在 Qwen3.5 预热期间 | 系统重启；跨版本持续存在 | [Issue #19006](https://github.com/ollama/ollama/issues/19006) |
| 高 | ROCm 上 `gemma4:26b-a4b` CPU 卸载时内存溢出 + 段错误 | 负载下无法使用；已有临时解决方案 | [Issue #19015](https://github.com/ollama/ollama/issues/19015) |
| 中 | 原生 `/api/chat` 返回空 tools，`tool_calls` 永不触发 | 打破代理工具集成 | [Issue #19040](https://github.com/ollama/ollama/issues/19040) |
| 中 | Go API 在 tool-call 参数中丢失数值精度 | 下游代理数据损坏 | [Issue #18942](https://github.com/ollama/ollama/issues/18942) |

#### **6. 对应用开发者的启示**  
- **若对延迟敏感，请避免使用 v0.40.4+**: 最近的文本分类器性能回归可能影响实时应用。请关注 `#19002` 获取修复进展。  
- **在 ROCm 上使用 `GGML_CUDA_DISABLE_GRAPHS=1`**: 在 PR #19015 修复前，禁用图编译以防止 AMD GPU 段错误。  
- **可通过 UI 禁用思考模式？** 该功能目前仅在 CLI 可用，UI 中缺失——请跟踪 [Issue #16016](https://github.com/ollama/ollama/issues/16016) 以获取未来控制选项。  
- **工具链可靠性注意**: 使用 `/api/chat` 工具定义时需谨慎——空 `tools` payload 已确认失效。建议暂时使用 `/v1/chat` 作为替代方案，直到 [PR #19040](https://github.com/ollama/ollama/issues/19040) 合并。  
- **未来兼容性准备**: 随着 Q2_0 GGUF 与 MiniCPM-V 4.7 现已支持，建议升级至 v0.40.5，以获得更好的模型可用性与更低的内存占用。

> *注：Ollama Cloud 用户应测试 `mistral-large-4` 时使用 `system` 角色而非 `developer`，直至 [Issue #19021](https://github.com/ollama/ollama/issues/19021) 得到解决。*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-10-16**

---

### **1. 今日重点**  
LiteLLM 项目持续强化安全与可观测性能力，通过 cosign 对 Docker 镜像进行已验证签名，确保生产部署中的信任。针对高影响问题的关键修复正在推进，包括预算强制机制绕过、因 request_id 重复导致的 Ollama 静默消费日志损坏，以及多模态响应中 Anthropic `reasoning_content` 与 `detail` 字段处理错误——这些问题均影响成本追踪与代理可靠性。

---

### **2. 发布与破坏性变更**  
- 已发布 **v1.107.0-dev.2** 与 **v1.106.0-rc.4**，增强安全性：所有 Docker 镜像现均使用 [cosign](https://docs.sigstore.dev/cosign/overview/) 签名，密钥与 [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入的相同。  
- **迁移提示**：依赖未签名镜像的用户应更新其 CI/CD 流水线，在部署前验证签名。本次发布未引入任何破坏性 API 变更。

---

### **3. 新模型与硬件支持**  
今日未新增模型或硬件后端。但正在进行的工作提升了以下兼容性：  
- 通过 Bedrock 透传支持 **Anthropic Claude Code**（`claude-4.6`，`per-turn-control-2026-07-01`）。  
- 改进对 **Databricks 托管的 gpt-5.6 系列模型**（`gpt-5.6-sol/luna/terra`）的工具调用支持（参见 #43708）。  
- **自托管 vLLM / OpenAI 兼容 `/v1/responses`** 端点现已正确处理推理与压缩块（#46754）。

---

### **4. 性能与优化**  
- **延迟与吞吐量**：多项 PR 优化重试逻辑与请求路由效率：  
  - [#46730](https://github.com/BerriAI/litellm/pull/46730)：现在尊重 `Retry-After` 头部，并应用带抖动的指数退避，减少瞬时失败下的无效重试。  
  - [#46197](https://github.com/BerriAI/litellm/pull/46197)：当 `base_model` 完全匹配时正确扩展上下文窗口，解决路由器不匹配问题。  
- **CLI 启动时间**：PR [#46803](https://github.com/BerriAI/litellm/pull/46803) 通过跳过完整 SDK 初始化，将 `lite` 命令启动时间从约 4 秒降至 <1 秒，对低资源环境至关重要。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 影响 | 修复状态 |
|--------|-------|--------|------------|
| ⚠️ 高 | [#46403](https://github.com/BerriAI/litellm/issues/46403)：Ollama `request_id` 重复导致静默 SpendLogs 行丢失 | 最多 46% 消费数据丢失；影响计费准确性 | 进行中（PR #46754 修复相关压缩逻辑） |
| ⚠️ 高 | [#26672](https://github.com/BerriAI/litellm/issues/26672)：v1.82.3 中预算强制机制被绕过 | 免费模型可超出预算访问 | 补丁待发；已在 RC 构建中确认 |
| ⚠️ 中 | [#46407](https://github.com/BerriAI/litellm/issues/46407)：`gpt-image-2.5-flare` 缺失欧盟数据驻留支持 | 欧盟区域使用成本追踪错误 | PR 待审 |
| ⚠️ 中 | [#32357](https://github.com/BerriAI/litellm/issues/32357)：Anthropic SDK 在流式传输中接收格式错误的 `thinking_delta` | Claude Code 输出为空内容 | PR #46764 修复 body 参数过滤 |
| 🔴 严重 | [#25429](https://github.com/BerriAI/litellm/issues/25429)：`chatgpt/gpt-5.4` 返回空最终响应 | 破坏使用 GPT-5.4 的代理工作流 | 已关闭；预计下个版本修复 |

---

### **6. 对应用开发者的意义**  
- **安全与合规**：始终使用 cosign 验证 Docker 镜像签名——尤其在受监管或生产环境中。建议使用 `v1.106.0-rc.4` 或更高版本以获得可信构建。  
- **成本准确性**：谨慎处理未认证请求——[#42689](https://github.com/BerriAI/litellm/issues/42689) 显示恶意客户端可篡改用量表。启用严格认证，并在无需时禁用 `disable_end_user_cost_tracking`。  
- **代理开发**：使用多轮工具调用或推理模型（如 Moonshot、Claude Code）的代理，务必升级至 `v1.107.0-dev.2` 或更高版本——`reasoning_content` 与 `thinking_delta` 的修复对正确行为至关重要。  
- **基础设施调优**：通过切换至新 `litellm_cli` 包（PR #46803）降低 CLI 延迟。同时可调整 `PROXY_WORKER_HEARTBEAT_INTERVAL_SECONDS` 以避免空闲数据库挂起（#45540）。

> ✅ **推荐操作**：若使用预算管理、成本追踪或 Anthropic/Claude Code 集成，请立即升级至 `v1.106.0-rc.4` 或 `v1.107.0-dev.2`。在 PR #46754 上线前，监控 `SpendLogs` 与 `DailyEndUserSpend` 表是否存在回归。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-16**

---

### **1. 今日亮点**  
Unsloth v0.1.908-beta 新增对 NVIDIA Nemotron 3.5 Bolt（24GB VRAM）和 Meta Muse Spark Open 的支持，实现具备全新文本扩散能力的前沿大模型本地推理。关键改进包括 DeepSpeed 训练集成以及针对代码代理的增强型提示缓存，显著加速基于代理的工作流。

---

### **2. 发布与破坏性变更**  
- **v0.1.908-beta**：正式发布，新增对 **NVIDIA Nemotron 3.5 Bolt** 和 **Meta Muse Spark Open** 的支持，实验性引入 **文本扩散大模型** 能力。  
  - [发布说明](https://github.com/unslothai/unsloth/releases/tag/v0.1.908-beta)  
  - 包含：DeepSpeed 训练支持、代码代理提示缓存优化，以及通过 Studio UI 中的 `load_in_4bit` 控制实现更优的模型加载。  
  - *注意：未报告破坏性 API 变更；向后兼容性已保留。*

---

### **3. 新模型与硬件支持**  
- **新增模型**：  
  - **NVIDIA Nemotron 3.5 Bolt**（需 24GB VRAM）——[指南](https://unsloth.ai/docs/models/nemotron3.5)  
  - **Meta Muse Spark Open** —— Meta Spark 系列首个开源权重模型，通过文本扩散支持多模态输入。  
- **硬件与后端**：  
  - 通过 Vulkan 后端在 Windows 上提升对 **AMD Strix Halo APU** 的支持（尽管预填充性能仍不理想）。  
  - 改进 **ROCm** 检测逻辑，支持 gfx115x APU 及 MIG 启用的 GPU（`CUDA_VISIBLE_DEVICES=MIG-<uuid>` 现已正确识别）。  
  - **FLUX.3 Image Klein**（蒸馏版/基础版）现已支持 Studio，可通过 PR #13933 使用 INT8/FP8/GGUF 格式。

---

### **4. 性能与优化**  
- **多 GPU 负载均衡**：PR #13928 确保自动图像/视频加载选择空闲度最高的 GPU，尊重单卡容量限制。  
- **MoE 量化**：PR #13946 支持对 bnb 4-bit MoE 专家进行选择性反量化（`UNSLOTH_MOE_SELECTIVE_DEQUANT=1`），不受 `torch.compiler` 干扰。  
- **KV 缓存共享**：PR #10301 推进 **并行聊天 KV 预占** 功能，通过 `llama-server --preempt-ram` 实现多个会话共享单一缓存——在高并发场景下可降低高达 70% 的内存开销。  
- **注意力机制选择**：PR #13792 通过时序探测替代依赖模型家族表的方式改进 ROCm Flash Attention 选择逻辑，提升非 FLUX 模型的整体性能。

---

### **5. 稳定性与回归问题**  
- **严重**：  
  - **PR #13638**：使用 Qwen-Image-2.1 进行图像编辑时出现 CUBLAS 错误，因 `diffusion_prompt_cache.py` 中张量处理不当所致。（修复待定）  
  - **PR #13663**：索引阶段文件嵌入失败，涉及 `unsloth/embeddinggemma-2`。（问题已关闭；修复可能已在流水线中）  
- **中等**：  
  - **PR #13656**：无法启用 Windows MXC Sandbox，且说明不清——影响安全执行环境。  
  - **PR #10656**：AMD Strix Halo 默认启用 Vulkan，导致预填充极慢，尽管整体推理速度更快。（临时解决方案：手动覆盖后端）  
- **轻微**：  
  - **PR #13942**：`ffmpeg`/`pandoc` 在沙箱外无限制写入，且无确认提示。（修复中）

---

### **6. 对应用开发者的意义**  
- **代理开发**：凭借 **文本扩散** 与 **更优的提示缓存**，Unsloth 现已适用于需要一致上下文管理的复杂多步骤代码代理。  
- **多 GPU 工作负载**：使用 `llama-server` 搭配 `--preempt-ram` 与 `device_map="auto"`，可高效跨 2 块及以上 GPU 扩展推理。调试分布式问题时，请监控 `UNSLOTH_DEBUG_DISTRIBUTED`。  
- **模型定制化**：通过 Studio UI 开关 `load_in_4bit`（参见 Issue #5639），可在训练/检索流水线中实现更严格的精度控制。  
- **部署灵活性**：预计将加强离线安装包支持（Issue #5835）及便携式 `.gz` 包支持（Issue #6559），对隔离网络或受限网络部署至关重要。  

> ✅ **实用建议**：对于 AMD 用户，若遇到 OOM 错误，请避免使用预编译 ROCm 轮子——建议从源码构建，或使用 `hipinfo` 过滤的目标（PR #13925）。

---  
*数据来源：GitHub – unslothai/unsloth | 更新时间：2026-10-16*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*