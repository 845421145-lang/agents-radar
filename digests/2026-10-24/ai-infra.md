# AI 基础设施日报 2026-10-24

> 生成时间: 2026-10-24 00:59 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-24**

---

### **1. 生态概览**

2026年第四季度，AI基础设施领域呈现出硬件、模型架构与部署范式快速专业化的特点。各项目正分化为不同角色：高性能推理引擎（vLLM、SGLang）、轻量级本地运行时（llama.cpp、Ollama）、统一网关（LiteLLM）以及集成微调平台（Unsloth）。向**异构硬件支持**的明显转变——包括AMD ROCm、Ascend NPU、寒武纪MLU、平头哥玄铁——正在加速，这既由厂商多样化驱动，也源于对成本敏感的边缘部署需求。与此同时，`litellm==1.107.0`被攻破等安全事件凸显了开源依赖链中的日益增长的风险，促使治理措施更加严格。

---

### **2. 活跃度对比**

| 项目       | 问题（开放） | PR（开放） | 最近24小时发布 | 稳定性状态 |
|---------------|---------------|------------|-----------------------|------------------|
| vLLM          | 384           | 122        | 无                    | 实验性功能不稳定（如 `--monokernel`） |
| SGLang        | 459           | 141        | 无                    | CI不稳定；分布式服务中存在严重回归 |
| llama.cpp     | 412           | 103        | b11846（CUDA修复）   | MTP/Blackwell环境下高严重性内核崩溃 |
| Ollama        | 287           | 91         | v0.40.11（RC）       | 云端模型出现严重性能退化 |
| LiteLLM       | 391           | 118        | 无                    | P0路由/流式传输缺陷；安全事件已解决 |
| Unsloth       | 317           | 89         | v0.1.910-beta         | 高严重性桌面崩溃与卡顿 |

> ✅ *注：SGLang和LiteLLM活跃度最高，但面临系统性稳定性挑战；vLLM和llama.cpp在针对性性能修复方面领先。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构                      | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next (ROCm)** | ✅ | ✅ (PR #44304) | ❌ | ❌ | ❌ | ❌ |
| **Kimi-K3 (ROCm/MI355X)**     | ✅ | ✅ (DCP + 共享编译) | ❌ | ❌ | ❌ | ❌ |
| **Dory1.0-4B-BF16**           | ✅ (#60149) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Nemotron-3.5-Bolt (Gemma 4)** | ❌ | ❌ | ❌ | ✅ (`nemotron-3.5-bolt`) | ❌ | ✅ (`flint-4b`, `nemotron-bolt-4b`) |
| **MOSS-Image (多模态)**       | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Recursive Flint (GGUF)**    | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **T-Head Zhenwu 810/810E/M890P** | ❌ | ✅ (路线图) | ❌ | ❌ | ❌ | ❌ |
| **Cambricon MLU**             | ❌ | ✅ (PR #45149) | ❌ | ❌ | ❌ | ❌ |
| **Ascend NPU (DCP)**          | ❌ | ✅ (PR #40825) | ❌ | ❌ | ❌ | ❌ |

> 🏆 **胜出者**：**Unsloth** 在**新模型采纳**方面领先，尤其在多模态及基于GGUF的本地推理场景中表现突出。  
> 🏁 **硬件多样性领导者**：**SGLang** 是最快拓展至非英伟达生态的项目，原生支持平头哥、寒武纪与昇腾。  
> 🔥 **vLLM 与 llama.cpp** 在GPU上对前沿Qwen/Kimi系列变体仍具最强性能。

---

### **4. 性能前沿**

| 优化重点             | vLLM                          | SGLang                         | llama.cpp                      | Ollama               | LiteLLM              | Unsloth                |
|--------------------------------|-------------------------------|--------------------------------|--------------------------------|----------------------|----------------------|------------------------|
| **KV缓存管理**        | ✅ DCP、推测解码、批处理不变性 | ✅ 分离式缓存、HiCache | ✅ `kq_mask` 移除（节省2–4GB） | ✅ 压缩逻辑 | ✅ 花费日志元数据 | ✅ 动态MoE卸载 |
| **批处理与吞吐量**      | ✅ 单解码层（TP8）、Triton内核 | ✅ 混合分块预填充、智能调度 | ✅ 无批处理聚焦（仅CPU） | ✅ 淘汰逻辑修复 | ✅ Rust网关可选 | ✅ 提示进度追踪 |
| **量化与精度**   | ✅ MXFP4、QSA注意力 | ✅ NVFP4、QSA稀疏注意力 | ✅ JQ2_K–JQ6_K（仅CPU）、FP4 | ✅ JSON模式保真度 | ✅ 按调用自定义计价 | ✅ NVFP4激活标签 |
| **分布式服务**        | ✅ DCP、推测解码 | ✅ EP2、NCCL GRAPH_REGISTER=0 问题 | ❌ | ❌ | ❌ | ❌ |
| **内核级优化**  | ✅ Triton 替换 torch.compile | ✅ FA4 替代 cuDNN、Engram 表精简 | ✅ DP4A瓦片对齐（Blackwell兼容） | ❌ | ❌ | ✅ 融合优化器、BF16 cuBLAS |

> ⚙️ **性能领先者**：  
> - **vLLM**：推测解码与KV缓存优化最为先进。  
> - **SGLang**：在分离式系统与跨架构内核调优方面处于领先地位。  
> - **llama.cpp**：通过模型特定内核剥离实现最佳内存节省（如移除 `kq_mask`）。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 核心差异点 |
|---------------|-----------------------------------|--------------------|
| **vLLM**      | 高性能推理引擎 | 针对大规模、低延迟GPU服务优化，支持推测解码与DCP |
| **SGLang**    | 多后端推理栈     | 专为异构、分布式环境设计，具备强大的分离式支持能力 |
| **llama.cpp** | 本地运行时 / CPU/GPU降级方案  | 主导CPU推理、移动端与边缘设备，依赖极小 |
| **Ollama**    | 本地开发者体验层  | 专注用户体验、易用性与开发者优先的模型托管（含WebUI） |
| **LiteLLM**   | 统一网关 / 编排   | 作为通用API层，抽象化提供商、计费与路由 |
| **Unsloth**   | 集成微调 + 运行时  | 统一训练（微调API）与推理（MLX/MoE支持），适用于边缘/本地工作流 |

> 🔄 **层级融合趋势**：LiteLLM与Unsloth模糊了网关与运行时的界限；vLLM与SGLang仍保持纯服务引擎定位。

---

### **6. 趋势信号**

1. **硬件去垄断化进程正在加速**：  
   - SGLang与Unsloth正快速支持**非英伟达**部署（AMD、昇腾、寒武纪、平头哥）。这标志着从GPU单一生态转向**多架构韧性**，对成本控制与供应链风险规避至关重要。

2. **模型专用化推动内存效率提升**：  
   - 在`qwen4exp`与`glm5-next`中移除`kq_mask`（llama.cpp）可实现每上下文节省高达**4 GB**内存，表明**模型感知内核优化**已成为核心差异化能力。

3. **安全已成为基础设施核心关切**：  
   - 恶意版本 `litellm==1.107.0` 的爆发凸显，**依赖完整性必须嵌入CI/CD流程**。开发者应采用SBOM、签名验证与私有镜像仓库策略。

4. **代理工作负载呼唤更高抽象层级**：  
   - 自动OpenCode会话转发（LiteLLM）、混合分块预填充（SGLang）、OpenAI兼容微调（Unsloth）等功能，反映出向**代理原生工具链**的演进——基础设施负责处理复杂性，而非开发者。

5. **Rust正成为性能层新选择**：  
   - SGLang与LiteLLM现均提供**基于Rust的前端/网关**，预示着在高吞吐推理栈中，将出现更多**低延迟、高隔离**组件的趋势。

---

### ✅ **面向应用开发者的建议**

- **大规模生产推理**：使用 **vLLM** 搭配 `--monokernel` 与ROCm优化——但实验性标志需经验证后再启用。
- **多硬件代理后端**：选择 **SGLang** 以利用其分布式与异构能力——但需监控不稳定的CI与易引发回归的配置。
- **本地/边缘部署**：**Unsloth** 与 **llama.cpp** 适合注重隐私、资源受限的场景（尤其是Apple Silicon）。
- **代理编排**：**LiteLLM** 提供最成熟的提供商抽象与计费控制——但需在安全事件后审计所有版本。
- **避免高风险发布**：禁止使用 `litellm==1.107.0`；在Blackwell GPU上将 `llama.cpp` 固定于 `b11846+`。

> 🔮 **前瞻展望**：关注 **动态MoE专家拆分（Unsloth）** 与 **Rust网关（LiteLLM/SGLang）**——这些将成为下一代延迟与可扩展性的决定性边界。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-10-24**

#### **1. 今日亮点**  
vLLM 项目持续推动硬件与模型的专用化发展，Qwen3.8 和 Kimi-K3 模型在 ROCm（AMD）平台上的支持取得重大进展，涵盖性能优化与缺陷修复。针对推测解码、KV 缓存管理以及 DCP（解码上下文并行）的关键稳定性改进已合并；同时，新提交的 PR 正在解决权重所有权和批处理不变性等基础性问题。

#### **2. 发布与破坏性变更**  
过去 24 小时内未报告新版本发布或破坏性变更。`v0.32 nightly` 仍是最新不稳定版本；使用实验性功能如 `--monokernel`、`--decode-context-parallel-size` 或 `VLLM_USE_RUST_FRONTEND` 时，用户应预期可能出现不稳定性。

#### **3. 新模型与硬件支持**  
- **ROCm（AMD）**：对 `amd/Qwen3.8-Flash-Next-Quark-MXFP4`（`qwen4_exp`）及 `Qwen3.8-2.4T-A95B gfx950 / MI355X` 实现完整支持，通过专用性能优化路径实现加速（#57149, #59575）。  
- **NVIDIA GB10（DGX Spark）**：正在修复 `Qwen3.8-Flash-Next` 在超过 `indexer_budget`（约 2K tokens）时的提示截断问题；修复待定（#62776）。  
- **新模型**：新增对 **Dory1.0-4B-BF16**（NVIDIA-Nemotron-Labs）的支持，该模型为具有归一化 GPT 架构的潜在循环大语言模型（#60149）。  
- **Rust 前端**：仍处于实验阶段，但功能对齐进度正积极追踪（#44280）。

#### **4. 性能与优化**  
- **ROCm**：  
  - 在 Kimi-K3 的融合 KDA 预填充 conv1d 中应用 `block_m=128`，在不损失位精度的前提下提升性能（#63342）。  
  - 在 MI355X 上为 DeepSeek-V4-Pro 引入独立单解码层（`--monokernel`），支持 TP8 下的高吞吐推理（#61482）。  
- **CUDA/Blackwell**：  
  - Triton 内核替代 `torch.compile` 用于推测解码中的草稿预算选择，消除中间服务编译停顿，主机开销降低约 6 倍（#63421）。  
- **通用引擎**：  
  - 权重所有权追踪现通过 `ParamMeta` 声明，以支持确定性调度规划（#63256）。  
  - 在分块预填充场景下，TRITON_MLA 后端的批处理不变行为得到改善（#60007）。

#### **5. 稳定性与回归问题**  
- **严重级**：  
  - 在 GB10 上，`Qwen3.8-Flash-Next` 因 `indexer_budget` 限制，会静默忽略约 2K token 以上的提示内容（#62776）。  
  - 在 ROCm 上，当启用 `VLLM_ROCM_USE_AITER=1` 时，Kimi-K3 在高并发场景下出现精度崩溃（#60160）。  
- **高严重级**：  
  - `NixlConnector` 在远程读取过程中释放 KV 块，导致解码阶段出现无声数据损坏（#61229）。  
  - `Inkling-Small-NVFP4` 因 `tml_fa4` 注意力内核缺少分页 KV 支持，在 SM120 上运行失败（#51405）。  
- **已在 PR 中修复**：  
  - Qwen4Exp（`--align-mode`）读取侧的 PLE 状态对齐问题已修复（#60861）。  
  - Kimi-K3 在 ROCm 上正确传递零位置至融合 MLA 解码 q-prep 内核（#63409）。  
  - MRV2 启动时自适应验证成本分析不再重复执行两次（#63431）。

#### **6. 对应用开发者的启示**  
- **谨慎使用 `--monokernel` 与 `--decode-context-parallel-size`**：这些功能仍属实验性质，可能引入正确性或性能退化问题——请在类似生产环境的条件下充分验证。  
- **在 AMD 部署中利用 ROCm 优化**：建议使用 `Qwen3.8-Flash-Next` 搭配 `gfx950` 与 `MI355X` 以获得最佳吞吐表现，尤其配合 `--monokernel` 使用。  
- **若需高并发，请避免使用 `VLLM_ROCM_USE_AITER=1`**，直至 #60160 修复完成。  
- **使用分布式卸载（如 NixlConnector）时，启用 `--enforce-eager` 并监控 `KV 块释放时机`**，防止无声数据丢失。  
- **在 GB10（DGX Spark）上部署长上下文模型时，注意提示截断缺陷**，直至 #62776 修复前需保持警惕。

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-24

---

### **1. 今日亮点**

SGLang 项目持续推进其多后端、高性能推理栈，关键进展涵盖 **解耦的 KV 缓存**、**推测解码的鲁棒性提升** 以及 **跨架构支持**。主要成果包括修复不稳定的 CI 基础设施（问题 #42752）、针对 ROCm/MI355X 上的 Qwen3.8-Flash-Next 实现新的性能优化（PR #44304），以及开展自适应推测解码的基础工作（问题 #23705）。这些努力表明项目正朝着跨多样化硬件的生产级、可扩展大模型服务稳步迈进。

---

### **2. 发布与破坏性变更**

过去 24 小时内未发布新版本。  
**注意**：持续存在的问题 #14930 指出，v0.5.6.post1 版本中仍存在预发布依赖项（如 `transformers==5.0.0rc0`）引发的不稳定问题——开发者应避免在生产环境使用该版本，直至修复完成。

---

### **3. 新模型与硬件支持**

- ✅ **ROCm / AMD MI355X**：针对 `Qwen3.8-Flash-Next` 的性能追踪与优化正在进行中（PR #44304）。
- ✅ **T-Head Zhenwu 810/810E/M890P**：已启动第一梯队支持路线图（问题 #37519）。
- ✅ **Cambricon MLU**：初步平台支持已合并（PR #45149），包含设备管理、CNCL 通信及 CI 测试。
- ✅ **Ascend NPU**：为 Kimi-K3 添加了 DCP（解码上下文并行）支持，采用共享紧凑通信机制（PR #40825）；CPU/NUMA 亲和性已实现拓扑感知跟踪（问题 #39348）。
- ✅ **SenseNova-U1/U1.5**：功能与性能追踪正在进行中（问题 #37742），以 OpenSenseNova/SenseNova-U1 作为参考基准。

---

### **4. 性能与优化**

- 🔥 **ROCm 上的 Qwen3.8-Flash-Next**：PR #44304 跟踪 gfx950 / MI355X 平台对复杂模型变体（GatedDeltaNet, QSA, MXFP4 MoE, 原生 NEXTN MTP）的性能改进。
- ⚡ **内核级优化**：
  - PR #46180：通过直接读取对端设备分片，减少 DP 注意力中的 Engram 表流量。
  - PR #46191：在 Qwen4 的 QSA 稀疏注意力后端引入基于主机的 KV 分层，支持更大上下文处理。
  - PR #46146：在 B300（sm_103）上优先使用 FA4 而非 cuDNN SDPA 处理长自注意力，提升吞吐量。
- 📈 **内存与缓存**：
  - PR #46178：将热路径分配器（StagingAllocator、FlexKVComm、LMCacheUnifiedRadixCache）中的 O(N) `list.pop(0)` 替换为 `deque`，降低竞争开销。
  - PR #46192：消除 ModelOpt FP4 中 swizzled blockscales 的冗余内存分配，为 Marlin MoE 运行器节省 GPU 内存。

---

### **5. 稳定性与回归问题**

今日报告多个严重稳定性问题：

| 问题 | 严重程度 | 摘要 | 修复状态 |
|------|----------|--------|------------|
| [#44291](https://github.com/sgl-project/sglang/issues/44291) | 严重 | EP2（tp=2 + ep=2）在 Qwen3.8-Flash-Next-NVFP4（RTX PRO 6000, sm_120）上因非法内存访问崩溃 | ❌ 尚无修复 |
| [#45989](https://github.com/sgl-project/sglang/issues/45989) | 高 | HiCache `buffer_only` + Mooncake L3 导致调度器接纳无法完成的预填充请求 → “Prefill out of memory” 崩溃 | ❌ 尚无修复 |
| [#45367](https://github.com/sgl-project/sglang/issues/45367) | 高 | Kimi-K3 DCP a2a 在 2 节点 GB300 上产生乱码输出；设置 NCCL_GRAPH_REGISTER=0 可解决 | ❌ 尚无修复 |
| [#36010](https://github.com/sgl-project/sglang/issues/36010) | 中等 | NVFP4 KV 缓存 + 推测解码因 `extend_prefix_lens_cpu is None` 导致崩溃 | ❌ 尚无修复 |

> 💡 **注意**：不稳定的 CI 基础设施仍是系统性障碍（问题 #42752，125 条评论），影响 PR 验证速度。

---

### **6. 对应用开发者的启示**

- **面向异构性构建**：SGLang 正快速超越 NVIDIA 生态。若你面向 T-Head、Cambricon 或 Ascend 硬件，现在正是尽早集成的时机——路线图已就位，PR 正在合并。
- **避免不稳定配置**：请勿使用 `v0.5.6.post1`，因其存在预发布依赖风险。请关注 #14930 获取更新。
- **善用高级调度特性**：混合 ChunkPrefill（问题 #13626）与智能缓存调度（问题 #43098）可提升 GPU 利用率并优化请求共置——特别适合代理类工作负载。
- **谨慎使用推测解码**：目前 NVFP4 + 推测解码存在缺陷（问题 #36010）；建议临时使用 `--kv-cache-dtype bfloat16` 作为规避方案。
- **留意易引发回归的工作流**：不稳定的 CI（#42752）可能导致合并延迟——预计涉及 CUDA Graph、分布式系统或新后端的 PR 审核周期更长。

> ✅ **实用提示**：使用 `--chat-encoding-backend recipe` 可确保 DeepSeek-V4/V4.1 的提示正确渲染与工具解析（PRs #45315, #45907）。

---  
*摘要生成时间：2026-10-24 | 来源：[github.com/sgl-project/sglang](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-24**

---

### **1. 今日重点**  
最新开发周期聚焦于 GPU 后端的关键稳定性修复，特别是针对 CUDA 和 SYCL 的内存管理及内核正确性问题。值得注意的是，因 DP4A MMQ tile 对齐不当导致的 `ggml-cuda` 高严重性崩溃已通过静态断言修复。与此同时，新引入的量化类型（`JQ2_K`–`JQ6_K`）扩展了精度与效率之间的权衡选择；针对 Qwen4exp 与 GLM5-Next 的模型特定优化，在大上下文长度下可减少高达 4 GB 的内存开销。

---

### **2. 发布与破坏性变更**  
- **b11846 (CUDA)**：添加静态断言，强制要求 DP4A MMQ tile 高度为 warp 大小的倍数（#30837）——防止在 NVIDIA Blackwell GPU 上出现未定义行为。  
  🔗 [PR #30837](https://github.com/ggml-org/llama.cpp/pull/30837)  
- **b11838 (CPU/GGML)**：使用 `double` 替代 `int64_t` 修复 `ggml_time_us` 中潜在的时间溢出问题。  
  🔗 [Issue #30969](https://github.com/ggml-org/llama.cpp/issues/30969)  
- **b11836 (CANN)**：为 CANN 后端补充缺失的 `const` 限定符以保持一致性。  
  🔗 [PR #30933](https://github.com/ggml-org/llama.cpp/pull/30933)

> ✅ *今日无破坏性 API 变更报告。所有更新均为内部修复或安全增强。*

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 新增对 `qwen4exp` 的支持，采用 QSA 注意力层——消除 `kq_mask` 分配，可在上下文长度 8192 时节省高达 **4 GB 内存**（#30965）。  
    🔗 [PR #30965](https://github.com/ggml-org/llama.cpp/pull/30965)  
  - 新增 `glm5-next` 支持，采用 QSA 且无需 `kq_mask`（+ DSA），实现类似内存节省效果。  
    🔗 [PR #31009](https://github.com/ggml-org/llama.cpp/pull/31009)  
  - 通过 MTMD 流水线新增对 **Soprano-1.1-80M 语音生成** 的支持。  
    🔗 [PR #28607](https://github.com/ggml-org/llama.cpp/pull/28607)  

- **硬件与后端**：  
  - **Hexagon**：新增 `CEIL(f32)` 与 `f16` 操作，支持移动端推理。  
    🔗 [PR #31006](https://github.com/ggml-org/llama.cpp/pull/31006)  
  - **SYCL**：改进 `mul_mat_uses_onednn` 设备透传逻辑。  
    🔗 [PR #31014](https://github.com/ggml-org/llama.cpp/pull/31014)  
  - **Vulkan**：新增张量并行 allreduce 函数；解决多 GPU 同步问题。  
    🔗 [PR #25051](https://github.com/ggml-org/llama.cpp/pull/25051)

---

### **4. 性能与优化**  
- **内存节省**：  
  - 在 `qwen4exp` 与 `glm5-next` 中移除 `kq_mask`，在超大上下文（UB 4096–8192）下可降低 GPU/主机内存使用 **2–4 GB**。  
    🔗 [PR #30965](https://github.com/ggml-org/llama.cpp/pull/30965)  
- **内核优化**：  
  - Hexagon：团队拆分 KV-head 处理提升了多核 HMX 上的 flash attention 效率。  
    🔗 [PR #31055](https://github.com/ggml-org/llama.cpp/pull/31055)  
  - SYCL：融合 GEMM 关闭修复了 Intel Arc B70 上 Qwen3.8-27B Q4_K_M 模型的 NaN 输出问题。  
    🔗 [Issue #30892](https://github.com/ggml-org/llama.cpp/issues/30892)  
- **量化进展**：  
  - 引入五种新的仅 CPU 量化格式（`JQ2_K` 到 `JQ6_K`），基于 IQ*_K 架构设计，相比 IQ4_XS 提供更高精度，性能开销极小。  
    🔗 [PRs #30715–#30718](https://github.com/ggml-org/llama.cpp/pulls?utf8=%E2%9C%93&q=JQ2_K+JQ6_K)  

---

### **5. 稳定性与回归问题**  
| 问题 | 严重程度 | 摘要 | 修复状态 |
|------|----------|--------|------------|
| [#30965](https://github.com/ggml-org/llama.cpp/issues/30965) | ⚠️ 严重 | CUDA Q4_1/Q5_1 矩阵-向量内核在将块偏移乘以 Q8_1 和时溢出 fp16 → 产生 NaN logits | ❌ 开放 |
| [#30892](https://github.com/ggml-org/llama.cpp/issues/30892) | ⚠️ 高 | SYCL F16：Qwen3.8-27B Q4_K_M 在 #29107 代码重排后输出 NaN | ✅ 部分修复（关闭融合 GEMM 可用） |
| [#30839](https://github.com/ggml-org/llama.cpp/issues/30839) | ⚠️ 中等 | HIP 构建在 gfx1151 上因 `mma.cuh:1424` 错误失败 | ❌ 开放 |
| [#30973](https://github.com/ggml-org/llama.cpp/issues/30973) | ⚠️ 中等 | Metal 在 MUL_MAT 使用 BF16 src1 且 K ≥ 64、batch > 8 时终止 | ❌ 开放 |
| [#29811](https://github.com/ggml-org/llama.cpp/issues/29811) | ⚠️ 高 | 评估错误：在 Qwen 3.8 flash + MTP 启动时触发断言 | ❌ 开放 |

> 💡 *回归追踪显示混合模型（MTP、循环）及新型 GPU 架构（Blackwell、Battlemage）仍存在不稳定性。*

---

### **6. 对应用开发者的影响**  
- **使用 `--spec-type draft-mtp-adaptive`** 实现动态推测解码——提升吞吐量，无需手动调优。  
  🔗 [PR #27210](https://github.com/ggml-org/llama.cpp/pull/27210)  
- **若内存受限，请避免使用依赖 `kq_mask` 的模型**，如 `qwen4exp` —— 当前默认已跳过该分配。  
- **若在 Blackwell GPU 上使用 CUDA，务必升级至 b11846+**，防止因 MMQ tile 对齐错误导致无声崩溃。  
- **谨慎使用 `JQ*_K` 量化格式**——目前仅限 CPU；适用于高精度本地推理，但除非经过验证，否则勿用于 GPU。  
- **关注 WebUI 安全问题 (#25790)**：通过 `?q=` 查询参数注入可能引发服务器模式下的指令注入——建议禁用外部访问或尽早打补丁。

> 📌 *生产部署建议优先选用 `b11846` 及以后版本，尤其搭配 CUDA 与 MTP 时。实时监控问题 #30892 与 #30965 以确保推理稳定性。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-24**

---

### **1. 今日亮点**  
最新发布的 **v0.40.11** 修复了 `qwen3coder` 和 OpenCode 上下文处理的关键问题，同时新推出的 **NVIDIA Nemotron 3.5 Bolt E4B** 模型——基于 Gemma 4 且具备 128K 上下文窗口——带来了快速、本地化的视觉语言能力。与此同时，多项 PR 解决了工具调用准确性、JSON 模式合规性以及在 Apple Silicon、Windows 和 AMD 系统上的 GPU/NPU 兼容性等长期存在的问题。

---

### **2. 发布与破坏性变更**  
- **v0.40.11-rc0 / v0.40.10**:  
  - 修复 `qwen3coder` 在参数中丢失函数闭合标签的问题 ([#19228](https://github.com/ollama/ollama/pull/19228))。  
  - 通过使用实际分配而非声明的上下文长度，解决了 OpenCode 启动时上下文错位的问题 ([#19193](https://github.com/ollama/ollama/pull/19193))。  
  - 为 `vllm-d3` 决策模型启用空状态支持 ([#19173](https://github.com/ollama/ollama/pull/19173), [#19226](https://github.com/ollama/ollama/pull/19226))。  
  - *无破坏性 API 变更；所有更新均为行为或正确性修复。*

---

### **3. 新模型与硬件支持**  
- **新模型**:  
  - [`nemotron-3.5-bolt`](https://ollama.com/library/nemotron-3.5-bolt): NVIDIA 推出的轻量级视觉语言模型，基于 Gemma 4，具备 **128K 上下文窗口**，专为本地快速推理和工具调用优化。  
- **硬件/后端支持**:  
  - 新增 `apple-foundation-model` 运行器，支持 macOS 27 的设备端 Apple Foundation Models ([#19184](https://github.com/ollama/ollama/pull/19184))。  
  - 改进 MLX 对 Apple Silicon 上紧凑型 Gemma 4 视觉塔的支持 ([#19247](https://github.com/ollama/ollama/pull/19247))。  
  - *待完成：Intel Mac 上的完整 AMD GPU 支持 ([#1016](https://github.com/ollama/ollama/issues/1016))，Snapdragon X Elite NPU/GPU 支持 ([#5360](https://github.com/ollama/ollama/issues/5360))。*

---

### **4. 性能与优化**  
- **工具调用准确性**:  
  - 修复工具调用参数中整数转浮点数的错误（如 `30000` → `"30000.0"`），防止模式校验失败 ([#19252](https://github.com/ollama/ollama/pull/19252))。  
- **吞吐量与延迟**:  
  - 修复因不当淘汰逻辑导致的压缩阻塞及响应延迟问题 ([#19245](https://github.com/ollama/ollama/issues/19245), [#19182](https://github.com/ollama/ollama/issues/19182))。  
  - 优化 `Phonon` 文本归一化，提升符号与链接的分词效果 ([#19234](https://github.com/ollama/ollama/pull/19234))。  
- **内存效率**:  
  - 增强模型压缩修复逻辑，可在不重新处理整个对话记录的情况下从无效输出中恢复 ([#19230](https://github.com/ollama/ollama/pull/19230))。

---

### **5. 稳定性与回归问题**  
- **报告的关键问题**:  
  - **[#18980](https://github.com/ollama/ollama/issues/18980)**: 自 10 月 12 日起，`glm-5.3-flash:cloud` 出现 5–8% 失败率，表现出严重退化现象（“the = the = the...”）。*影响：生产环境代理可能无声失败。*  
  - **[#19021](https://github.com/ollama/ollama/issues/19021)**: `mistral-large-4-cloud` 拒绝包含 `role: "developer"` 的消息，阻碍 Codex 风格客户端使用。  
  - **[#19249](https://github.com/ollama/ollama/issues/19249)**: `deepseek-v4.1-flash:1017-cloud` 在长时间运行任务中无法自动补偿上下文耗尽。  
- **进行中的修复**:  
  - 修复 JSON 模式违规问题的 PR ([#12362](https://github.com/ollama/ollama/issues/12362)) 和 `OLLAMA_CONTEXT_LENGTH` 报告差异问题的 PR ([#18995](https://github.com/ollama/ollama/issues/18995)) 正在评审中。  
  - **[#19254](https://github.com/ollama/ollama/issues/19254)**: `flint:40b-a2b-gguf-nvfp4` 的 MLX 版本在 M3 Mac 上显著慢于 QAT-int4，性能下降已确认。

---

### **6. 对应用开发者的意义**  
- **模型选择**: 在需要低延迟、高上下文的本地视觉语言任务中优先选用 `nemotron-3.5-bolt`。谨慎使用 `qwen3-coder:480b-cloud` —— 可能存在 JSON 模式漂移风险。  
- **代理设计**: 在 #19021 修复前，避免在云调用中使用 `developer` 角色。对无法自动补偿的模型（如 `deepseek-v4.1-flash`）实现降级策略。  
- **基础设施**: 使用 `OLLAMA_MAX_LOADED_MODELS=1` 时需谨慎——若 `keep_alive` 覆盖淘汰机制，可能导致请求阻塞（[#19245](https://github.com/ollama/ollama/issues/19245)）。  
- **安全**: 本地部署应自行实现认证机制（参考 [#19238](https://github.com/ollama/ollama/issues/19238)）——目前尚无内置 API 密钥强制验证。  
- **UI/SDK**: 期待即将推出的 `/think` 与 `/nothink` 切换功能的 UI 改进（[#10961](https://github.com/ollama/ollama/issues/10961), [#19232](https://github.com/ollama/ollama/issues/19232)）。

> 🔗 *实时状态查询：[Ollama GitHub Issues](https://github.com/ollama/ollama/issues)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM 消息简报 – 2026-10-24**

---

### **1. 今日重点**  
一起涉及恶意 `litellm==1.107.0` 版本的严重安全事件已解决：PyPI 与 Docker Hub 已撤回该被篡改版本，其包含一个凭证窃取工具（`cook.pth`）及通过伪装仓库注入的远程代码执行（RCE）加载器。LiteLLM 团队还发布了多项稳定性与计费修复，包括对 Responses API 中按调用自定义定价的正确处理，以及改进的支出日志元数据追踪。与此同时，自动 OpenCode 会话转发和基于 Rust 的网关可选功能正在积极开发中。

---

### **2. 发布与破坏性变更**  
**无** — 过去 24 小时内未发布新版本。

⚠️ **严重安全通告（已解决）：**  
- `litellm==1.107.0` 已被**入侵**，并从 PyPI 与 Docker Hub 撤回（`ghcr.io/berriai/litellm`、`docker.io/litellm/litellm`）。  
- 构建来源为伪装仓库（`Berri-AI/litellm`），包含 `cook.pth` 后门及 `sitecustomize` RCE 加载器。  
- 所有受影响镜像（`latest`、`main-latest`、`main-stable`）均已撤回。  
👉 [议题 #47826](https://github.com/BerriAI/litellm/issues/47826) | [GitHub 安全通告](https://github.com/BerriAI/litellm/security/advisories/GHSA-wgjx-5r3p-9zqf)

---

### **3. 新模型与硬件支持**  
- ✅ **通过 PR [#46744](https://github.com/BerriAI/litellm/pull/46744) 添加 Engy 作为 OpenAI 兼容服务商**：  
  - 通过 `https://api.engy.ai/v1` 支持 8 个模型  
  - 认证方式为 `ENGY_API_KEY`（可选基础地址覆盖）  
  - 完整支持聊天补全、响应及兼容 Anthropic 的消息格式  
- ✅ **现已支持 OpenCode Zen 与 Go 服务商，通过 `x-opencode-session` 头部注入**：  
  - 自动在推理路由间转发稳定的对话 ID  
  - 修复了 2026-09-05 策略变更后出现的缺失会话 ID 错误  
  👉 [PR #39549](https://github.com/BerriAI/litellm/pull/39549)，[PR #48121](https://github.com/BerriAI/litellm/pull/48121)

---

### **4. 性能与优化**  
- 🔧 **按调用自定义定价现已被 Responses API 正确识别**：  
  - 调用 `litellm.responses()` 或 `aresponses()` 时，`input_cost_per_token` 与 `output_cost_per_token` 现已生效  
  - 之前被忽略；现与 `completion()` 行为一致  
  👉 [PR #48119](https://github.com/BerriAI/litellm/pull/48119)  
- 📈 **提示缓存写入的成本归因优化**：  
  - OpenAI GPT-5.6+ 的 12 小时提示缓存写入现按 2.5 倍费率计费（相较 30 分钟写入的 1.25 倍）  
  - 此修复防止高频缓存场景下的计费不足  
  👉 [PR #48088](https://github.com/BerriAI/litellm/pull/48088)  
- ⚡ **Rust 网关功能已可选启用**：  
  - 实验性受控 Rust 前端监听器集成于网关镜像，降低延迟并提升资源隔离性  
  - 在 Python/Rust 服务器间维持共享写入池  
  👉 [PR #48132](https://github.com/BerriAI/litellm/pull/48132)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复提交 |
|--------|------|--------|--------|
| 🛑 **P0** | `x-litellm-tags` 未能路由至正确模型 | 待处理 | [议题 #14052](https://github.com/BerriAI/litellm/issues/14052) |
| 🛑 **P0** | `think: false` 被忽略；推理块仍返回 | 待处理 | [议题 #26413](https://github.com/BerriAI/litellm/issues/26413) |
| ⚠️ | Redis 缓存测试在 `url` 字段上失败 | 待处理 | [议题 #34636](https://github.com/BerriAI/litellm/issues/34636) |
| ⚠️ | BedrockGuardrail 流式钩子丢弃 HTTPException → SSE 中断 | 待处理 | [议题 #26387](https://github.com/BerriAI/litellm/issues/26387) |
| ⚠️ | `/v1beta/interactions` 缺失 `spend_logs_metadata` | 待处理 | [议题 #47841](https://github.com/BerriAI/litellm/issues/47841) |
| ⚠️ | Langfuse OTEL span 在 `asyncio.gather()` 下丢失 | 待处理 | [议题 #26376](https://github.com/BerriAI/litellm/issues/26376) |

> 注：多个 P0 问题涉及路由、流式传输与遥测完整性——对生产级代理系统至关重要。

---

### **6. 对应用开发者的影响**  
- **立即审计您的部署**：确保**未使用 `litellm==1.107.0`** —— 该版本已从所有注册源移除。若可能，请升级至 `>=1.107.1`，或锁定到已知安全版本。
- **统一使用 `x-opencode-session`**：若集成 OpenCode Go，依赖近期版本中的自动转发逻辑，避免自 2026 年 9 月起出现的 500 错误。
- **在 Responses API 中利用自定义定价**：可在 SDK 调用中直接使用 `input_cost_per_token` 与 `output_cost_per_token` —— 之前不支持。
- **在低延迟、高并发部署中启用 Rust 网关**：若您能管理双语言基础设施，可获得更优性能。
- **谨慎监控支出日志**：`x-litellm-call-id` 传递的请求 ID 与元数据现已修复，但部分边缘情况仍未解决——请确保您的可观测性系统对此类异常有应对能力。

> 🔗 **建议**：若使用每日预算或分析功能，请审查 [PR #48131](https://github.com/BerriAI/litellm/pull/48131) 以获取支出汇总可靠性修复。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth 简报 – 2026-10-24**

---

### **1. 今日亮点**  
Unsloth v0.1.910-beta 正式发布，新增对 Recursive 的 Flint、MOSS-Image 以及 NVIDIA 的 Nemotron Bolt 4B 模型的全面支持，现已可通过 Unsloth 在本地运行。本次更新引入了仅聊天功能的桌面安装包，扩展了 MLX MoE 对超出 Mac 内存限制模型的支持，并推出了兼容 OpenAI 的微调 API。

---

### **2. 发布与破坏性变更**  
- **v0.1.910-beta**（GitHub：[发布](https://github.com/unslothai/unsloth/releases/tag/v0.1.910-beta)）  
  - 引入 **兼容 OpenAI 的微调 API**，可无缝集成至现有智能体框架中。  
  - 新增 **仅限聊天的 Unsloth 桌面安装包**，适用于资源占用极低的专注推理工作流。  
  - 通过先进的卸载策略，现可在 Apple Silicon 上支持 **超过系统内存的 MLX MoE 模型**。

> 🔗 *完整变更日志：[v0.1.910-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.910-beta)*

---

### **3. 新模型与硬件支持**  
- **新模型**：  
  - Recursive **Flint**（通过 `flint-4b` GGUF）  
  - **MOSS-Image**（多模态视觉语言模型）  
  - NVIDIA **Nemotron Bolt 4B**（专为本地推理优化）  
- **后端与量化**：  
  - macOS 上实现完整的 **MLX MoE 支持**（包括通过动态专家路由支持 > 设备内存的模型）。  
  - **Vulkan 后端**现支持 `MiniCPM-V-4.7-1B`（但问题 #14987 报告生成失败——待修复方案）。  
  - **ROCm/GPU 检测改进**，适用于 AMD RDNA3（gfx1100）系统（修复静默回退至 CPU 问题，见 #14906）。  
  - **R570+ 驱动下支持 MIG GPU 实例枚举**（PR #14981），可在数据中心 GPU 上实现多实例训练。

> 🔗 *模型支持：[问题 #14987](https://github.com/unslothai/unsloth/issues/14987)，[PR #14981](https://github.com/unslothai/unsloth/pull/14981)*

---

### **4. 性能与优化**  
- **内存效率**：  
  - 动态 **热/冷 MoE 专家拆分**（跨 GPU/CPU）功能（特性请求 #14484）目前正处于积极开发中。  
  - 解码时驻留状态下的显存预算优化（PR #15048）：确保保留显存可用于 VAE 解码。  
- **内核与编译**：  
  - **NVFP4 激活量化**现在正确标记编译缓存状态，避免不匹配问题（PR #15055）。  
  - `sd.cpp` 仅在 *所有加载的 GGUF 均为 Q8_0* 时使用 BF16 cuBLAS（PR #15054），减少不必要的计算开销。  
  - 融合优化器现在在每步后刷新 LoRA 类型转换缓存（PR #15052），提升长时间训练中的精度表现。  
- **吞吐量**：  
  - 提示词进度追踪（PR #14909）提供加载、卸载及生成速度的实时反馈——对排查延迟瓶颈至关重要。

> 🔗 *性能相关 PR：[PR #15054](https://github.com/unslothai/unsloth/pull/15054)，[PR #15048](https://github.com/unslothai/unsloth/pull/15048)，[PR #14909](https://github.com/unslothai/unsloth/pull/14909)*

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|---------|------|--------|------------|
| 🚨 高 | [#15022](https://github.com/unslothai/unsloth/issues/15022) | 每次加载 GGUF 时 Studio 崩溃，因错误的“子进程未响应”端口检测 | ⚠️ *2026-10-23 更新后出现的回归；后端日志显示端口所有权误判* |
| 🚨 高 | [#14519](https://github.com/unslothai/unsloth/issues/14519) | 长对话在推理前卡住，由基于 CPU 的会话归档嵌入引起 | ⚠️ *导致推理阻塞数分钟；暂无修复方案* |
| 🟡 中 | [#14411](https://github.com/unslothai/unsloth/issues/14411) | 模型卸载后发生核心转储，即使有充足 KV 缓存 | 🔧 *需核心转储日志以诊断（无明确根因）* |
| 🟡 中 | [#14987](https://github.com/unslothai/unsloth/issues/14987) | Vulkan 后端上 `MiniCPM-V-4.7-1B` 文本生成失败 | ⚠️ *可能为后端兼容性问题；需临时绕行方案* |
| 🟡 中 | [#14695](https://github.com/unslothai/unsloth/issues/14695) | 因无法识别架构而无法加载 DeepSeek-V4.1-Flash | 🔧 *需更新 llama.cpp 构建版本* |

> 🔗 *关键问题：[15022](https://github.com/unslothai/unsloth/issues/15022)，[14519](https://github.com/unslothai/unsloth/issues/14519)，[14411](https://github.com/unslothai/unsloth/issues/14411)*

---

### **6. 对应用开发者的意义**  
- **构建更健壮的智能体**：新的 **兼容 OpenAI 的微调 API** 允许你直接接入现有的 LLM 协调工具（如 LangChain、LlamaIndex），无需重写训练逻辑。  
- **拓展多模态应用规模**：随着 **MOSS-Image** 与 **Flint** 现已原生支持，开发者可在本地部署视觉 + 推理流水线，摆脱云端依赖。  
- **优化边缘部署**：MLX MoE 在 Mac 上的支持意味着你可在消费级硬件上运行超大模型（>1000亿参数）——非常适合注重隐私的 AI 应用。  
- **规避回归风险**：在长期运行或多人共用环境中，注意监控 **端口检查崩溃 (#15022)** 与 **CPU 归档卡顿 (#14519)** ——二者均影响生产环境稳定性。  
- **未来可扩展性**：若目标是高吞吐推理集群，请尽早启用 **MIG GPU 支持 (#14981)** 与 **动态 MoE 拆分 (#14484)**。

> ✅ *建议：使用 `pip` 组依赖（PR #15053, #15051）锁定版本，避免安全更新带来的破坏性变更。*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*