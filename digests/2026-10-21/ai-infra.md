# AI 基础设施日报 2026-10-21

> 生成时间: 2026-10-21 00:49 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **1. 生态系统概览**  
2026年末，AI基础设施领域呈现出深度专业化与推理、服务、训练各层快速融合的特征。vLLM 和 SGLang 等项目正通过针对下一代模型（如 DeepSeek-V4-Flash、Qwen3.8-Flash-Next）和硬件（NVIDIA SM90/SM100、AMD gfx1201）的先进优化，推动高吞吐、低延迟推理的边界。与此同时，llama.cpp 在 CPU/GPU 可移植性和量化运行时效率方面保持主导地位，而 Ollama 与 LiteLLM 则聚焦开发者体验和企业级代理功能。多节点 PD 分离架构、大规模推测解码以及跨平台 MoE 支持的出现，标志着生态系统已趋于成熟——性能、稳定性与可组合性已成为不可妥协的标准。

---

### **2. 活动对比**

| 项目       | 问题（最近24小时） | PR（最近24小时） | 是否发布？ | 备注 |
|------------|-------------------|----------------|------------|------|
| **vLLM**   | 12                | 14             | 否         | 高度关注 AMD ROCm 优化、推测解码及 P/D 分离修复 |
| **SGLang** | 15                | 12             | 否         | 出现4个严重回归；CI 不稳定报告；正在积极开发 PD 与多节点功能 |
| **llama.cpp** | 10            | 8              | 是（b11768+） | 以修复为主；RDNA4 上 FlashAttention 存在关键不稳定 |
| **Ollama** | 9                 | 5              | 否         | 存在安全漏洞（Go 1.24）、Vulkan 回归、模型损坏问题 |
| **LiteLLM** | 8               | 7              | 是（v1.107.0-rc.2） | 安全性与可观测性更新；新增按请求缓存控制 |
| **Unsloth** | 11              | 8              | 否         | 即将发布破坏性变更；LoRA 种子漏洞修复已合并但未发布 |

> ✅ *vLLM 在技术深度与集成速度上领先；SGLang 活跃度高，但面临系统性稳定性风险。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构           | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4-Flash / DSv4.1** | ✅（SM8x） | ✅（PD，仅编码器） | ⚠️（进行中） | ⚠️（DFlash2 草稿） | — | ❌（待定） |
| **Qwen3.8-Flash-Next（ROCm）** | ✅（gfx950/gfx1201） | — | — | ❌（与 DFlash2 兼容崩溃） | — | ❌（崩溃） |
| **GLM-5.3-Flash**       | ✅（关键 CUDA 崩溃） | ✅（ROCm，SM120） | ✅（SM120 上 FA4 崩溃） | ❌（云环境失败） | — | — |
| **Muse Spark（ROCm）**   | ✅（RoPE/KV 修复） | — | — | — | — | — |
| **Paligemma / SenseNova U1** | — | — | ✅（mtmd 支持） | — | — | — |
| **K2 Horizon（IFM）**    | — | — | — | ✅（`thinking: true` 被阻断） | — | — |

> 🏆 **胜出者：vLLM** – 对新兴模型支持最全面，尤其在 AMD ROCm 与 NVIDIA SM90+ 平台表现突出。  
> 📉 **挑战者：SGLang** – PD 与仅编码器预填充能力强劲，但受严重回归问题困扰。  
> ⚠️ **Ollama**：仍在应对云端模型可靠性与 GPU 兼容性问题（如 Intel Arc）。

---

### **4. 性能前沿**

| 优化重点             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------|------|--------|-----------|--------|---------|---------|
| **KV 缓存与分离**     | ✅✅（P/D，Mooncake DFS，混合 Mamba） | ✅✅（PD，过期 KV 修复） | ⚠️（有限） | ❌ | — | — |
| **推测解码**          | ✅✅（自适应验证，top-k 起草） | ✅（图结构易断裂） | ⚠️（FlashAttention 不稳定） | — | — | — |
| **批处理与吞吐量**    | ✅（block-FP8 MoE，分片采样） | ✅（GPU 图融合） | ✅（SVE/NEON，GEMM） | ⚠️（Vulkan 下降） | ✅（流式工具保留） | ✅（多 GPU 去噪拆分） |
| **量化与内存**        | ✅（FP8，融合内核） | ✅（Triton Gluon MoE） | ✅（ZDNN 流式注意力，SVE） | ⚠️ | — | ✅（跳过梯度检查点） |
| **内核级调优**        | ✅✅（Triton，FlashInfer） | ✅（自动调优默认） | ✅（分块对齐，内核融合） | ❌ | — | ✅（RoPE 多分块启动） |

> 🔥 **顶尖表现者**：vLLM 与 SGLang 在分布式、高吞吐推理方面领先；llama.cpp 在便携性与低资源效率方面表现出色。

---

### **5. 层定位**

| 项目       | 主要层级              | 核心差异化 |
|------------|-----------------------|------------|
| **vLLM**   | **高性能服务引擎**     | 针对大规模、低延迟推理优化；强 GPU 内核集成能力 |
| **SGLang** | **高级推理框架**       | 推动 PD 分离、多节点可扩展性与 CUDA 图创新 |
| **llama.cpp** | **通用本地运行时**   | 跨平台、CPU/GPU 优化；适用于边缘、嵌入式及轻量部署 |
| **Ollama** | **开发者导向网关**     | CLI 优先体验，模型编排，本地代理部署；权衡：稳定性与便利性 |
| **LiteLLM** | **企业级 AI 网关**    | 统一 API 代理，具备安全性、成本控制与可观测性；专为生产流水线设计 |
| **Unsloth** | **微调与训练加速器**  | 专注快速 PEFT、梯度检查点与浏览器集成代理 |

> 🧩 **战略洞察**：vLLM/SGLang 正成为云规模 LLM 服务的事实标准引擎；LiteLLM 与 Ollama 作为集成网关；unsloth 与 llama.cpp 在训练与边缘运行时领域占据主导。

---

### **6. 趋势信号**

#### 🔮 **新兴行业趋势**
1. **硬件感知优化已成为强制要求**  
   - AMD ROCm（gfx950/gfx1201）与 NVIDIA SM100/SM120 支持不再是可选项。vLLM 与 SGLang 正积极为这些平台调优内核与内存布局，表明未来兼容性必须明确针对特定硬件。

2. **预填充-解码分离（PD）正走向生产落地**  
   - SGLang 关注 PD 预填充正确性，vLLM 的混合 Mamba P/D 修复，以及 LiteLLM 流式工具链改进，均表明 PD 已从实验阶段迈向真实代理系统应用。

3. **安全与供应链完整性不容妥协**  
   - Ollama 的 Go CVE 与 LiteLLM 的签名 Docker 镜像凸显，即使面向开发者的工具也必须强化安全防护——尤其在自托管部署场景下。

4. **量化 + FP8 + 推测解码 = 新一代效率三元组**  
   - 所有顶级项目正汇聚于此：vLLM 的 H20 block-FP8 MoE，SGLang 的自动调优 FlashInfer 内核，以及 llama.cpp 的 ZDNN 流式注意力。

5. **代理可靠性依赖底层基础设施稳定性**  
   - `glm-5.3-flash:cloud` 崩溃、静默过期 KV 缓存问题、DFlash2 崩溃等现象表明，智能体工作流无法容忍脆弱的后端。

#### 🛠️ **应用开发者应重点关注**
- **避免使用尚未修复的不稳定的后端**：如 gfx1201 上的 `flash_attention`（llama.cpp）、SM120 上的 `fa4`（SGLang）、`glm-5.3-flash:cloud`（Ollama）。
- **新功能启用前务必验证**：如 `--enable-batch-sharded-sampling`（vLLM）、`SGLANG_DISAGG_PREFILL_EARLY_SEND_CACHED_PREFIX=1`（SGLang）。
- **优先保障可复现性与安全性**：使用 `VLLM_BATCH_INVARIANT=1`，锁定安全版本（如 LiteLLM v1.107.0-rc.2），审计 Go 工具链。
- **早期规划多 GPU 与 PD 支持**：若构建可扩展代理，采用 vLLM 或 SGLang 时需谨慎——确保未暴露于未修补的回归缺陷中。

> ✅ **核心结论**：AI 基础设施层不再仅关乎速度——而是关于**稳定性、安全性与可组合性**。选择技术栈时，应根据需求判断：是否需要原始吞吐（vLLM）、原生代理灵活性（SGLang）、边缘可移植性（llama.cpp），或企业治理能力（LiteLLM）。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM 摘要 – 2026-10-21**

---

### **1. 今日重点**  
vLLM 项目正深入整合下一代模型与硬件，尤其聚焦于 **DeepSeek-V4-Flash (DSv4)** 和 **AMD ROCm gfx950/gfx1201** 的支持。针对 AMD GPU 上的 Qwen3.8-Flash-Next，关键性能优化正在进行中；同时，通过新提交的 PR 加强了推测解码与 P/D 分离架构的稳定性，重点改进自适应验证与主机缓冲区处理。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未观察到新的版本发布或破坏性 API/配置更改。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731**：现已进入 SM8x（Ampere A100/A800/RTX 30xx）的积极支持追踪状态 ([#50576](https://github.com/vllm-project/vllm/issues/50576))。完整内核集成持续推进，DSpark 自适应验证已独立追踪 ([#51303](https://github.com/vllm-project/vllm/issues/51303))。  
- 📌 **Qwen3.8-Flash-Next (AMD ROCm)**：针对 `gfx950`（MI355X）和 `gfx1201`（RDNA4）的性能优化路线图已启动，包括启用 FP8 KV 缓存功能 ([#59575](https://github.com/vllm-project/vllm/issues/59575), [#61529](https://github.com/vllm-project/vllm/pull/61529))。  
- 📌 **Muse Spark (ROCm)**：新提交修复了 RoPE 缓存过度分配问题 ([#62757](https://github.com/vllm-project/vllm/pull/62757)) 及因缺失输出乘数逻辑导致的错误 logits 采样问题 ([#62756](https://github.com/vllm-project/vllm/pull/62756))。  
- 🔧 **Rust 前端**：仍为实验阶段，但正在逐步实现功能对齐；当前重点是功能完整性 ([#44280](https://github.com/vllm-project/vllm/issues/44280))。

---

### **4. 性能与优化**  
- ⚡ **推测解码**：  
  - FlashInfer 现在在 Ampere/Ada（NVIDIA）上进行推测解码时跳过冗余的 `seq_lens` 复制，降低 CPU 开销 ([#57352](https://github.com/vllm-project/vllm/pull/57352))。  
  - 支持在 GPU 上按请求特定的 top-k/top-p 进行草稿生成 ([#56724](https://github.com/vllm-project/vllm/pull/56724))，提升草稿效率。  
- 💾 **KV 缓存与分离架构**：  
  - 修复混合 Mamba 模型在 `kv_buffer_device="cpu"` 下的 P/D 分离问题 ([#62453](https://github.com/vllm-project/vllm/pull/62453), [#62319](https://github.com/vllm-project/vllm/pull/62319))。  
  - Mooncake 连接器现可通过可选配置支持 DFS 层级 ([#61175](https://github.com/vllm-project/vllm/pull/61175))。  
  - KV 缓存分配策略已移入管理器配置，以实现更精细控制 ([#61452](https://github.com/vllm-project/vllm/pull/61452))。  
- 🚀 **内核与内存效率**：  
  - 为 Qwen3.5-397B-A17B-FP8（TP=8）新增 H20 block-FP8 融合 MoE 配置，预计最高带来 **2.0 倍加速** ([#62148](https://github.com/vllm-project/vllm/pull/62148))。  
  - 修复 top-k 回退问题：单体 Triton 内核现在采用更精确的枢纽选择策略，避免异常 gather 丢失 ([#61998](https://github.com/vllm-project/vllm/issues/61998))。

---

### **5. 稳定性与回归问题**  
- ❌ **严重崩溃**：  
  - **GLM-5.3-Flash (glm5next)**：在 4xB200 上，多个无关内核（KDA 线性注意力、MHC TileLang、TRT-LLM 融合 MoE）中反复出现 CUDA 非法内存访问 —— 高危级别 ([#54317](https://github.com/vllm-project/vllm/issues/54317))。  
  - **DFlash + gpt-oss**：使用推测解码时，FA3 出现非法内存访问导致崩溃 ([#61330](https://github.com/vllm-project/vllm/issues/61330))。  
  - **越界读取**：在特定 tile/block 配置下，Triton 统一注意力会读取超出 block-table 边界的内存 ([#62779](https://github.com/vllm-project/vllm/pull/62779)) —— 修复已合并。  
- 🐞 **其他问题**：  
  - HF3FS 元数据服务器存在页面泄漏，导致池耗尽后保存失败 ([#62389](https://github.com/vllm-project/vllm/issues/62389))。  
  - 流式解析器在被预词法分析终端覆盖时，会泄漏部分标签如 `<tool_` ([#49205](https://github.com/vllm-project/vllm/issues/49205))。

---

### **6. 对应用开发者的启示**  
- **预期在 NVIDIA 与 AMD GPU 上，DeepSeek-V4-Flash 与 Qwen3.8-Flash-Next 的吞吐量将显著提升**，尤其是在启用 FP8 与推测解码的情况下。  
- **在 ROCm Muse Spark 上谨慎使用 `--enable-batch-sharded-sampling`**，直到相关修复落地 ([#62756](https://github.com/vllm-project/vllm/pull/62756))。  
- **对 DSv4.1-Flash on SM8x 可放心启用 `VLLM_BATCH_INVARIANT=1`**，因位级可复现性正在强化 ([#62365](https://github.com/vllm-project/vllm/pull/62365))。  
- **在使用 CPU 缓冲模式时，监控混合 Mamba 模型（如 Qwen3.5）中的 P/D 分离状态** —— 最近修复 ([#62453](https://github.com/vllm-project/vllm/pull/62453), [#62319](https://github.com/vllm-project/vllm/pull/62319)) 已解决关键缺陷。  
- **验证结构化输出与工具调用**：确保语法解析正确，避免因格式错误请求导致 EngineCore 崩溃 ([#43920](https://github.com/vllm-project/vllm/issues/43920))。

---  
*摘要基于 [vLLM GitHub](https://github.com/vllm-project/vllm) 活动整理，截至 2026-10-21。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 消息简报 – 2026-10-21

---

### **1. 今日重点**  
SGLang 项目持续加速推进 **预填充-解码拆分（PD）** 与 **多节点可扩展性**，关键的 PR 优化了 DeepSeek-V4.1 与 GLM-5.3-Flash 在 NVIDIA Hopper（SM90）和 AMD MI35X 平台上的性能表现。关键稳定性修复解决了 CUDA 核心转储、PD 预填充阶段的过期 KV 缓存问题以及仅编码器工作流中的内存泄漏，凸显大规模推理基础设施的持续成熟。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。无新版本或破坏性 API/配置变更发布。

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1**：通过 PR #45265 支持仅编码器预填充（`--dsv41-encoder-only-prefill`），在 SWA 窗口受限（第 21–39 层）的模型上将预填充权重占用减半。  
- ✅ **AMD ROCm（MI35X/MI355X）**：GLM-5.3-Flash 原生 Triton Gluon MoE 后端支持（#41639）、融合 KPool Hadamard + FP8 量化（#44661），以及通过折叠环形缓冲区实现更快的编码器 SWA 重放（#45465）。  
- ✅ **NVIDIA GB300 / MNNVL**：支持多节点部署，使用 `cuda_vmm` 传输；问题 #45345 指出，在高分词器工作线程数（32）下启动时出现 OOM。  
- ✅ **NPU（Ascend）**：RFC #39348 引入拓扑感知的 CPU 与 NUMA 亲和性设置，用于工作线程秩，提升异构集群上的调度效率。  

> 🔗 [PR #45265](https://github.com/sgl-project/sglang/pull/45265) | [PR #41639](https://github.com/sgl-project/sglang/pull/41639) | [PR #45465](https://github.com/sgl-project/sglang/pull/45465)

---

### **4. 性能与优化**  
- 🚀 **预填充-解码拆分（PD）**：  
  - PR #45450 将 DeepSeek-V4.1 DSpark 的主机任务从解码图移入 GPU 图，消除主机-设备同步，显著提升 GB300 上的吞吐量。  
  - PR #45369 为 FlashInfer KDA 预填充启用可中断的 CUDA 图捕获，移除 SM100/SM103 上的急切执行开销。  
- 📈 **内核与内存效率**：  
  - PR #45462 通过恢复未初始化的工作区并移除完整激活副本，降低 Muse Marlin/W4A8 扩展中的临时内存占用。  
  - PR #45472 通过移除重叠调度器中不必要的主机-设备同步，优化混合 Mamba 扩展批处理。  
- ⚙️ **自动调优与编译**：  
  - PR #42736 为所有 FlashInfer 内核（包括推测目标 EAGLE、STANDALONE）启用默认预填充自动调优，提升跨模型家族的内核选择性能。  
  - 问题 #45426 报告因 nightly Triton 中移除 `tl.make_block_ptr` 导致编译失败——已成为 CI 稳定性的阻塞性问题。  

> 🔗 [PR #45450](https://github.com/sgl-project/sglang/pull/45450) | [PR #45369](https://github.com/sgl-project/sglang/pull/45369) | [PR #42736](https://github.com/sgl-project/sglang/pull/42736)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 🔴 高 | #26340 ([CUDA 核心转储追踪器](https://github.com/sgl-project/sglang/issues/26340)) | CI 运行中自动收集到的 CUDA 核心转储；349 条评论表明 GPU 内核存在系统性不稳定性。 | ❌ 尚无修复 |
| 🔴 高 | #42012 ([GLM-5.3-Flash 在 SM120](https://github.com/sgl-project/sglang/issues/42012)) | FA4 注意力后端在混合扩展重塑过程中进行 CUDA 图捕获时崩溃；仅 triton 可用。 | ❌ 尚无修复 |
| 🔴 高 | #44070 ([PD 预填充中的过期 KV](https://github.com/sgl-project/sglang/issues/44070)) | 早期缓存前缀发送在 HiCache 加载完成前发生 → 解码阶段出现无声过期 KV。 | ❌ 尚无修复 |
| 🟡 中 | #45345 ([GB300 启动时 OOM](https://github.com/sgl-project/sglang/issues/45345)) | 32 个分词器工作线程 + 自动选择的 `cuda_vmm` 导致启动时出现 OOM。 | ❌ 尚无修复 |
| 🟡 中 | #45426 ([Triton `make_block_ptr` 移除](https://github.com/sgl-project/sglang/issues/45426)) | FLA 内核在 `nightly-cu134-20261020` 上无法编译。 | ❌ 尚无修复 |

> 💡 注：CI 不稳定（#42752）与维护模式（#21065）仍处于活跃状态，表明更广泛的基础设施不稳定正在影响开发速度。

---

### **6. 对应用开发者的影响**  
- **谨慎使用 PD 拆分**：尽管 PD 目前对多数模型已稳定，但请避免在 #44070 修复前使用 `SGLANG_DISAGG_PREFILL_EARLY_SEND_CACHED_PREFIX=1` —— 共享前缀存在无声数据损坏风险。  
- **暂勿使用实验性后端**：在相关问题修复前，请勿在 SM120（RTX PRO 6000）上使用 `fa4` 注意力后端，或在多节点 GB300 部署中使用 `cuda_vmm`。  
- **利用自动调优内核**：默认预填充自动调优（#42736）已改善各模型延迟，无需配置更改即可生效。  
- **监控 CI 健康状况**：频繁的测试波动与核心转储表明 CI 流水线不稳定——预计合并 PR 会延迟，夜间构建可能出现回归。  
- **谨慎规划多节点部署**：在 #45345 修复前，建议在 GB300/MNNVL 上使用少于 32 个分词器工作线程。  

> ✅ **实用建议**：对于 DeepSeek-V4.1 或 GLM-5.3-Flash 的生产负载，推荐在 SM120/SM90 上使用 `triton` 后端，并启用 `--enable-nvidia-megakernel` 以获得低延迟解码路径。

---  
*简报生成时间：2026-10-21 | 来源：[sgl-project/sglang GitHub](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 摘要 – 2026-10-21**

---

### **1. 今日亮点**  
最新更新聚焦于流式 API 兼容性及后端稳定性修复，尤其在服务器层以及 Metal/HIP 后端。显著进展包括通过 `ggml-zdnn` 引入 FlashAttention 支持，以及对 CPU（SVE、NEON）和 GPU 后端（Vulkan、OpenCL）量化内核的持续优化。报告指出，在 RDNA4 GPU 上存在 FlashAttention 的严重回归问题，表明长上下文推理可能存在不稳定性。

---

### **2. 发布与破坏性变更**  
- **`b11768`**：修复 `/v1/responses` 中 SSE 事件缺失 `output_index` 问题，确保与 OpenAI 风格流式客户端兼容。[PR #30863](https://github.com/ggml-org/llama.cpp/pull/30863)  
- **`b11759`**：在 `ggml-zdnn` 后端引入 `flash_attention` 操作，并启用临时缓冲池，提升 ZDNN 设备上的注意力计算速度。[PR #30512](https://github.com/ggml-org/llama.cpp/pull/30512)  
- **`b11757`**：修复遗留内存池清空后 CUDA 图失效问题，改善推测解码性能。[PR #26771](https://github.com/ggml-org/llama.cpp/pull/26771)

> ⚠️ 无破坏性 API 变更；所有更新均为新增功能或缺陷修复。

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 通过 `mtmd`（多模态模型处理）新增对 **Paligemma** 的实验性支持，利用 `llama_batch_ext` 实现文本/视觉联合批处理。[PR #30903](https://github.com/ggml-org/llama.cpp/pull/30903)  
  - 在模型转换管道中新增对 **SenseNova U1**（文本到文本、图像到文本、多模态）的支持。[PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919)  
- **硬件后端**：  
  - **OpenCL**：新增小批量 GEMM 变体并修复越界读取问题。[PR #30850](https://github.com/ggml-org/llama.cpp/pull/30850)  
  - **Metal**：修复每 token 有 9 个专家模型缺失 MoE 内核变体的问题。[Issue #30610](https://github.com/ggml-org/llama.cpp/issues/30610)  
  - **HIP/ROCm**：优化 MMF 归约中的瓦片宽度对齐，避免 gfx1201 上出现错误结果。[PR #30836](https://github.com/ggml-org/llama.cpp/pull/30836)  

---

### **4. 性能与优化**  
- **CPU 优化**：  
  - 为 ARM64（如 Apple Silicon、AWS Graviton）引入 SVE 优化的 `q5_0 x q8_0` 与 `q5_1 x q8_1` 点积内核。[PR #30867](https://github.com/ggml-org/llama.cpp/pull/30867)  
  - Hexagon：采用 Neon 向量化与多线程张量重排，显著降低大模型加载时间。[PR #30901](https://github.com/ggml-org/llama.cpp/pull/30901)  
- **GPU 优化**：  
  - Vulkan：将验证令牌 + GQA 头融合进单个 FlashAttention 瓦片（开发中）。[PR #30190](https://github.com/ggml-org/llama.cpp/pull/30190)  
  - Vulkan：优化 `mul_mat_vec_iq3_xxs` 内核，性能提升约 0.7%。[PR #30904](https://github.com/ggml-org/llama.cpp/pull/30904)  
  - CUDA：在 CUDA 图缓存键中添加首节点范围，减少推测解码过程中的预热漂移。[PR #28666](https://github.com/ggml-org/llama.cpp/pull/28666)  
- **量化**：  
  - LFM2 的分块参数现在从 GGUF 元数据读取，提升视觉编码器加载效率。[PR #30840](https://github.com/ggml-org/llama.cpp/pull/30840)

---

### **5. 稳定性与回归问题**  
- **严重级别**：  
  - **FlashAttention 在 gfx1201（RDNA4）上出现数据损坏**：长上下文下头维度为 256 时输出异常（Qwen3.8-27B），首个生成令牌即为 EOS。[Issue #30884](https://github.com/ggml-org/llama.cpp/issues/30884)  
- **高严重级别**：  
  - **Intel Arc B70（Xe2）上 SYCL FlashAttention 失败**，由 `fattn-mkl.cpp` 启发式策略不匹配导致。[Issue #30757](https://github.com/ggml-org/llama.cpp/issues/30757)  
  - **Apple Silicon 上 Metal MoE 崩溃**，涉及 Nemotron 3.5 Bolt 74B-A9B 模型。[Issue #30610](https://github.com/ggml-org/llama.cpp/issues/30610)  
- **中等严重级别**：  
  - **Intel Arc Pro B70 上 Vulkan 解码缓慢**，长上下文（约 8 倍退化，从 1k 到 64k token）。[Issue #28721](https://github.com/ggml-org/llama.cpp/issues/28721)  
  - **AMD Vulkan 无 ReBAR 时内存泄漏 / VRAM 耗尽**：`DEVICE_LOCAL|HOST_VISIBLE` 缓冲区耗尽 WDDM 共享预算。[Issue #30888](https://github.com/ggml-org/llama.cpp/issues/30888)  
  - **MI210（gfx9a）上 HIP 编译失败**，使用 ROCm 6.3.4。[Issue #30869](https://github.com/ggml-org/llama.cpp/issues/30869)  

> ✅ 部分回归问题已有修复合并：  
> - [PR #30286](https://github.com/ggml-org/llama.cpp/pull/30286)：修复因头维度不匹配导致的 SYCL FA 崩溃。  
> - [PR #30761](https://github.com/ggml-org/llama.cpp/pull/30761)：解决 SYCL FLASH_ATTN_EXT 相关问题。

---

### **6. 对应用开发者的意义**  
- **流式 API**：确保客户端正确处理 `output_index` — `b11768` 修复了 OpenAI 兼容 `/v1/responses` 的关键缺陷。  
- **多模态应用**：使用 `mtmd` 支持 Paligemma 与 SenseNova U1，可轻松构建混合文本/图像代理，代码改动极少。  
- **高性能部署**：优先选择启用了 SVE/NEON 优化（ARM64）及 Vulkan/FlashAttention 调优的构建版本，以实现高吞吐推理。  
- **避免使用 RDNA4（gfx1201）GPU**，直至 #30884 修复完成 — 长上下文下 FlashAttention 不稳定。  
- **谨慎使用 `--moe-cache-mib`** — 在 Vulkan（RX 6900 XT）上会崩溃；请等待修复或禁用。  
- **监控 Intel Arc 上的 SYCL 后端** — 与 DeltaNet 及 FlashAttention 相关的已知问题尚未解决。  

👉 **行动项**：在 `b11768+` 版本上测试你的模型，并在进一步通知前避免在 gfx1201 上使用 `--moe-cache-mib` 和 FlashAttention。

---  
*来源: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-21**

---

### **1. 今日亮点**  
Ollama 生态系统持续演进，重点聚焦于安全加固与稳定性修复，尤其在 GPU 内存管理及模型加载可靠性方面。多个版本中已标记出 Go 工具链（Go 1.24.1）中的关键 CVE，促使紧急升级。与此同时，用户报告 `glm-5.3-flash:cloud` 存在严重生成失败问题，且在 0.40.x 版本后，Intel Arc GPU 上出现崩溃，表明 Vulkan 后端处理可能存在回归。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何发布或破坏性变更。*  
然而，当前二进制文件因使用过时的 Go 版本存在**关键安全漏洞**（如 CVE-2025-68121 等）。开发者应优先通过重新编译升级至 **Go 1.26.9+**，或等待官方发布更新。  
🔗 [Issue #19162](https://github.com/ollama/ollama/issues/19162) | 🔗 [Issue #14233](https://github.com/ollama/ollama/issues/14233)

---

### **3. 新模型与硬件支持**  
- **K2 Horizon 模型（IFM）** 现可通过 `llama.cpp b11521` 支持，但 `thinking: true` 被拒绝，因缺少模板支持——相关修复 PR 正在等待合并。  
  🔗 [PR #19161](https://github.com/ollama/ollama/pull/19161)  
- **MLX 运行器新增 DFlash2 块草稿支持**，可实现高级推测解码优化。  
  🔗 [PR #19149](https://github.com/ollama/ollama/pull/19149)  
- **Phonon TTS 集成** 现可通过 MLX 运行器使用，兼容 OpenAI 的语音接口。  
  🔗 [PR #19166](https://github.com/ollama/ollama/pull/19166)  
- **Intel Arc 130V（Lunar Lake iGPU）** 支持自 0.40.x 版本起中断，由 `ggml_vulkan: device lost` 崩溃导致；目前尚未确认有效临时方案。  
  🔗 [Issue #19158](https://github.com/ollama/ollama/issues/19158)

---

### **4. 性能与优化**  
- **NVIDIA 系统上 Vulkan 解码吞吐量在 0.40.6 更新后下降约 6%**，原因可能是默认开启 `OLLAMA_VULKAN=true` 导致调度效率低下或内核使用不佳。  
  🔗 [Issue #19165](https://github.com/ollama/ollama/issues/19165)  
- **模型上下文窗口错位**：`ollama launch opencode` 使用静态 `model.ContextLength` 而非运行时实际值 `num_ctx`，可能导致配置生成错误。  
  🔗 [Issue #19172](https://github.com/ollama/ollama/issues/19172)  
- **内存压力处理**：关于在 GPU 压力下释放空闲模型显存的功能请求，凸显了对动态内存编排能力的日益增长需求。  
  🔗 [Issue #18612](https://github.com/ollama/ollama/issues/18612)

---

### **5. 稳定性与回归问题**  
**高严重性：**  
- ✅ **`glm-5.3-flash:cloud` 生成严重退化**（失败率约 5–8%），关联到集群数据损坏（`probe2.img` 全为零）。直接影响云端推理可靠性。  
  🔗 [Issue #18980](https://github.com/ollama/ollama/issues/18980)  
- ❌ **`gemma4:12b` 在 Intel Arc 130V iGPU 上运行时崩溃**，报错 `ggml_vulkan: device lost`，发生在 0.40.x 之后——可能为驱动或张量上传问题。  
  🔗 [Issue #19158](https://github.com/ollama/ollama/issues/19158)  
- ⚠️ **DeepSeek-v4.1-flash 在受系统消息约束时返回损坏输出**，包含泄露的服务器错误字符串。  
  🔗 [Issue #19156](https://github.com/ollama/ollama/issues/19156)

**中等严重性：**  
- 🟡 **`llama3.2-vision:11b` 第一次请求产生垃圾输出**，可能由于状态初始化竞争条件所致。  
  🔗 [Issue #10956](https://github.com/ollama/ollama/issues/10956)  
- 🟡 **切换模型时若启用 `keep_context`，Ollama Generate 节点会变红**。  
  🔗 [Issue #19137](https://github.com/ollama/ollama/issues/19137)

---

### **6. 对应用开发者的启示**  
- **避免使用 `glm-5.3-flash:cloud`**，直至根本原因解决——预期输出不可靠。  
- **若性能至关重要，建议在 NVIDIA 系统上禁用 `OLLAMA_VULKAN`**，或锁定至 0.40.6 之前的版本。  
- **除非已验证生效，否则不要依赖 `max_completion_tokens`**（PR #19168 将解决此问题）。  
- **使用 K2 Horizon 模型时谨慎启用 `think: true`** ——请确保聊天模板已更新以支持推理标签。  
- **在共享 GPU 系统上部署代理时，密切监控 VRAM 使用情况**；高负载任务期间可考虑手动卸载模型。  
- **在依赖 Claude Desktop 等工具的远程自托管模型前，务必本地验证模型清单**（PR #19157 实现此功能）。

> 💡 *建议：审计部署栈的 Go 版本合规性，直到安全补丁落地前避免自动更新。*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **1. 今日亮点**  
LiteLLM 继续强化其企业级基础设施，推出关键的安全性和可观测性更新，包括通过自动刷新令牌（PR #47701）提升 GitHub Copilot 的令牌处理能力，以及改进工具调用流量中的密钥脱敏功能（PR #47122）。`v1.107.0-rc.2` 版本的发布预示着即将迎来稳定性提升，而缓存、防护机制和多部署路由等持续开发工作，则凸显了项目在可扩展、安全的 AI 代理方面的核心定位。

---

### **2. 发布与破坏性变更**  
- **`v1.107.0-rc.2`**、**`v1.106.1`**、**`v1.105.2`**、**`v1.104.4`** 和 **`v1.103.6`** 在过去 24 小时内发布。所有 Docker 镜像均使用 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 签名，确保供应链完整性。  
- **破坏性变更**：PR [#47699](https://github.com/BerriAI/litellm/pull/47699) 引入基于回调的请求级语义缓存控制——管理员现在可根据请求上下文动态禁用缓存，实现对成本与一致性之间权衡的细粒度控制。

---

### **3. 新模型与硬件支持**  
本更新周期未新增模型或硬件后端。但：  
- **Gemini** 支持通过 PR [#47692](https://github.com/BerriAI/litellm/pull/47692) 得到优化，将过长的 `tool_call_id` 缩短以符合客户端长度限制（如 AWS AgentCore 64 字符上限）。  
- **Azure AI Search 透传** 现已正确转发映射的索引名称（PR [#47694](https://github.com/BerriAI/litellm/pull/47694)），修复使用虚拟索引时出现的 404 错误。

---

### **4. 性能与优化**  
- **分词效率**：PR [#47586](https://github.com/BerriAI/litellm/pull/47586) 防止在失败后重复下载 HuggingFace 分词器——在离线环境中可减少每次请求失败带来的约 23 秒延迟。  
- **流式工具链**：PR [#47698](https://github.com/BerriAI/litellm/pull/47698) 确保 `/v1/responses` 流中保留所有先前的工具调用轮次，避免在智能体工作流中重新处理即可提升正确性。  
- **智能体循环控制**：PR [#47688](https://github.com/BerriAI/litellm/pull/47688) 支持通过部署配置动态调整 `max_agentic_loops`，替代原先硬编码的限制。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR | 备注 |
|------|----------|--------|--------|-------|
| [`#47340`](https://github.com/BerriAI/litellm/issues/47340)：TPM 限制未随内存缓存滚动 | 高 | 开放 | — | 若不手动更新密钥，关键耗尽状态将持续存在。 |
| [`#47396`](https://github.com/BerriAI/litellm/issues/47396)：预算预留使用 `max_input_tokens` 而非实际计数 | 高 | 开放 | — | 可能导致 Anthropic 格式请求的花费统计不准确。 |
| [`#47579`](https://github.com/BerriAI/litellm/issues/47579)：Presidio 防护机制在 HTTP 请求期间持有锁 | 中 | 开放 | — | 可能阻塞并发请求；存在潜在拒绝服务风险。 |
| [`#45422`](https://github.com/BerriAI/litellm/issues/45422)：GitHub BYOK 令牌消耗显示为零 | 中 | 开放 | — | 自 v1.103.1 至 v1.104.2 之间的回归问题，影响遥测数据。 |

> ✅ **今日合并的修复**：  
> - PR [#47697](https://github.com/BerriAI/litellm/pull/47697)：向管理员选择器添加 TypeSafe Jev 模型。  
> - PR [#47696](https://github.com/BerriAI/litellm/pull/47696)：在 JUnit 指标中暴露数据库升级时间，便于性能监控。  

---

### **6. 对应用开发者的意义**  
- **遥测与成本控制**：若依赖速率限制，请谨慎使用内存缓存——`tpm_limit` 不会自动滚动。建议使用 Redis 后端缓存，或在耗尽后调用 `/key/update`。  
- **智能体设计**：通过部署配置（PR #47688）调整 `max_agentic_loops`，无需修改代码即可调节智能体行为。确保流式响应中保留工具历史记录（PR #47698）。  
- **安全与合规**：利用 PR #47122 的增强脱敏功能，屏蔽系统提示和工具输入中的敏感信息——对受监管应用场景至关重要。  
- **GitHub Copilot 集成**：升级至 `v1.107.0-rc.2` 或更高版本，享受自动令牌刷新（PR #47701），免除每 8 小时手动重新认证的麻烦。  
- **调试**：监控日志中是否存在 `cost_breakdown` 异常（如 #30725），并确保对不支持的模型剥离 `output_config`（PR #47397）。

> 🔗 完整上下文参考：[LiteLLM GitHub Issues](https://github.com/BerriAI/litellm/issues) | [Pull Requests](https://github.com/BerriAI/litellm/pulls)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-21**

---

### **1. 今日亮点**  
Unsloth 持续推进 Studio UI 与后端性能优化，重点提升分布式训练、GPU 内存管理及浏览器代理功能。关键修复包括模型加载失败（如 GLM-OCR）、DeepSpeed ZeRO-3 下梯度检查点回溯异常，以及因硬编码随机种子导致的 LoRA 子空间碰撞高危问题。新提交支持多 GPU 扩散去噪分块，并在聊天界面原生集成 MCP 工具。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
但以下 **破坏性变更即将合并**：
- 分布式训练期间需设置 `UNSLOTH_BLOCK_COMPILE=0` 以避免 `CheckpointError`（PR #14063）。
- `FastLanguageModel.get_peft_model()` 中硬编码的 `random_state = 3407` 导致连续微调中近 100% 的 LoRA A 子空间碰撞 → PR #14327 将解决此问题。
- `has_internet()` 现在会泄漏全局 3 秒 socket 超时 — 可能影响下游网络调用（Issue #14370）。

> 🔗 [Issue #14327](https://github.com/unslothai/unsloth/issues/14327) | [PR #14063](https://github.com/unslothai/unsloth/pull/14063)

---

### **3. 新模型与硬件支持**  
- 请求支持 Deepseek v4.1 Flash GGUF（Issue #10838），但尚未实现。
- 使用 DFlash2 编辑器时，Qwen3.8-Flash-Next 在首个提示词处崩溃（Issue #14381）—— 表明兼容性不完整。
- 现可通过 `unsloth train` 训练视觉与音频模型（PR #14389），扩展至非纯文本工作流。
- **MLX 后端**仍处于活跃状态；Apple Silicon 上测试套件隔离问题持续存在（Issue #8138）。

> 🔗 [Issue #10838](https://github.com/unslothai/unsloth/issues/10838) | [PR #14389](https://github.com/unslothai/unsloth/pull/14389)

---

### **4. 性能与优化**  
- **多 GPU 扩散去噪**：现在可根据块范围将单个大型去噪器拆分到多个 GPU（PR #14412），当存在空闲显卡时可完全避免主机内存卸载。
- **RoPE 内核优化**：将多头 tile 合并为单个 Triton 启动（PR #14417），在 B200 上对每轮前向/反向传播的设备耗时降低 **2–2.7 倍**。
- **梯度检查点**：引入 `checkpoint_skip_layers="auto"`（PR #14404），根据显卡容量与序列长度动态调整重计算深度。
- **DDP 改进**：启用 `gradient_as_bucket_view=True` 进行全量微调，通过避免重复梯度减少内存开销（PR #14399）。

> 🔗 [PR #14412](https://github.com/unslothai/unsloth/pull/14412) | [PR #14417](https://github.com/unslothai/unsloth/pull/14417) | [PR #14404](https://github.com/unslothai/unsloth/pull/14404)

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 🔴 高 | [Issue #14381](https://github.com/unslothai/unsloth/issues/14381) | Qwen3.8-Flash-Next 在使用 DFlash2 编辑器时首次提示即崩溃 | 开放 |
| 🔴 高 | [Issue #14327](https://github.com/unslothai/unsloth/issues/14327) | 硬编码 `random_state=3407` 导致 99.9% 的 LoRA A 子空间碰撞 | PR 已合并（v0.1.909-beta+ 中修复） |
| 🟡 中 | [Issue #14063](https://github.com/unslothai/unsloth/issues/14063) | 按层块编译破坏分布式运行中的检查点重计算 | 临时方案：`UNSLOTH_BLOCK_COMPILE=0` |
| 🟡 中 | [Issue #14411](https://github.com/unslothai/unsloth/issues/14411) | 经过几次推理后出现核心转储；无日志输出 | 开放，需核心转储分析 |
| 🟡 低 | [Issue #14335](https://github.com/unslothai/unsloth/issues/14335) | 微小 TTI API 问题 | 已关闭 |

> 🔗 [所有问题](https://github.com/unslothai/unsloth/issues?q=is%3Aissue+updated%3A%3E2026-10-20)

---

### **6. 对应用开发者的启示**  
- **在 A100 上使用 `full_finetuning=True` 时，请避免 `fast_inference=True`，直到修复落地**（参见 Issue #4739）。建议设为 `fast_inference=False`，或切换至仅 PEFT 训练。
- **充分利用 `checkpoint_skip_layers="auto"`**，在无需手动调优的情况下实现大规模训练的更优内存效率。
- **若进行分布式训练并使用梯度检查点，请务必使用 `UNSLOTH_BLOCK_COMPILE=0`** —— 当前状态不安全。
- **对于代理系统**，新版本的 MCP 工具支持（PR #14349）与浏览器自动化能力（PR #14290）将显著提升可靠性，支持本地开发服务器访问。
- **不要假设 DFlash2 + Qwen3.8-Flash-Next 组合行为稳定** —— 请勿在生产环境使用，直至问题 #14381 解决。

> ✅ 推荐：固定版本至 `unsloth==v0.1.909-beta` 或更高，以获取关键 LoRA 修复并规避回归问题。  
> 🔗 [稳定版发布说明](https://github.com/unslothai/unsloth/releases)

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*