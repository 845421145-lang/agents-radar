# AI 基础设施日报 2026-10-25

> 生成时间: 2026-10-25 00:29 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-25**

---

### **1. 生态概览**

2026年第四季度的AI基础设施格局呈现出明显的两极分化：一端是**高性能、硬件优化的推理引擎**，另一端则是**以开发者为中心、原生支持智能体（agent）的运行时平台**。vLLM和SGLang在内核级效率与多GPU扩展方面持续突破，而Ollama和Unsloth则聚焦于本地部署的无缝体验与原生智能体交互界面。对**多模态、推测性解码及分布式内存架构**的日益重视，反映出大语言模型（LLM）应用已超越纯文本服务，进入成熟阶段。与此同时，LiteLLM作为成本敏感型多供应商路由的核心中枢地位依然稳固，但近期供应链事件使其面临更严格的审视。

---

### **2. 活跃度对比**

| 项目       | 开启的问题（高+严重） | 近24小时PR数 | 近24小时发布数 | 状态摘要 |
|---------------|--------------------------|------------------|------------------------|----------------|
| **vLLM**      | 18                       | 9                | 无                   | 核心稳定，重点聚焦ROCm/MLA |
| **SGLang**    | 12                       | 7                | 无                   | 高严重度稳定性问题；创新迅猛 |
| **llama.cpp** | 15                       | 6                | 无                   | 关键GPU损坏风险；移动优先 |
| **Ollama**    | 10                       | 5                | **v0.40.11**           | 新增macOS语音功能，MLX回归问题 |
| **LiteLLM**   | 13                       | 8                | **v1.106.3+**          | 安全补丁 + 计费修复 |
| **Unsloth**   | 14                       | 4                | 无                   | Windows崩溃，测试版不稳定 |

> ✅ *注：Ollama在发布速度上领先；LiteLLM在关键安全响应上表现突出；SGLang与llama.cpp的问题密度最高。*

---

### **3. 模型支持竞赛**

| 项目     | 新增支持的模型/架构 |
|-------------|---------------------------------------|
| **vLLM**    | Qwen3-VL（通过 `/v1/systemone`），DeepSeek-V4.1-Flash（ROCm gfx950），Kimi-K3（MI355X AgentX），NVFP4 KV缓存用于MLA模型 |
| **SGLang**  | SANA-Sprint 0.6B扩散模型（原生支持），Mooncake迁移后端用于NPU解耦，AMD消费级Radeon支持路线图 |
| **llama.cpp** | DSV4.1 Flash（实验性），Sarvam 30B MoE修复，Hexagon/HMX Flash Attention优化 |
| **Ollama**  | Nemotron 3.5 Bolt 74B-A9B（MLX），Gemma 4视觉微调（动态网格舍入），Pixeltable/Knovum/ShibaClaw/Golem集成 |
| **LiteLLM** | Cerebras Llama 3.1（连字符别名），NVIDIA Nemotron 3.5 Super VL定价，Azure语音转录正式发布路径 |
| **Unsloth** | 无新模型；专注流水线并行、KV预占、Metal GPU鲁棒性 |

> 🏆 **胜者**：**vLLM** 在前沿模型/硬件组合上领先（尤其在MLA + ROCm领域）。  
> 🚀 **新兴领导者**：**Ollama** 凭借生态集成与创新功能，在开发者体验上占据主导。

---

### **4. 性能前沿**

| 聚焦领域             | 领先项目                                | 关键进展 |
|------------------------|--------------------------------------------------|------------------|
| **KV缓存优化** | vLLM, Unsloth                              | NVFP4（降低38%），受KVServe启发的可复用层（vLLM RFC），实例级预占（Unsloth） |
| **量化与内存** | vLLM, llama.cpp, LiteLLM                    | 密集型MLA使用NVFP4，SYCL F16舍入修复，量化扩散正确性提升 |
| **内核级效率** | vLLM, SGLang, llama.cpp                  | Triton top-k pivot调优，扩散中交叉注意力重用（SGLang），Hexagon团队拆分 |
| **分布式服务**   | SGLang, vLLM, Unsloth                      | GLM-5.3 P/D NIXL描述符瓶颈（vLLM），Mooncake迁移（SGLang），GPipe风格流水线并行（Unsloth） |
| **批处理与吞吐** | SGLang, vLLM                               | reduce-scatter vs all-reduce，快速路径草稿准备，增量调度跟踪 |

> 🔥 **趋势**：前沿正从原始速度转向**内存高效、可扩展且可组合的推理**，尤其适用于智能体与长上下文任务。

---

### **5. 层级定位**

| 项目     | 主要层级                     | 差异化优势 |
|-------------|------------------------------------|----------------|
| **vLLM**    | **推理引擎**               | 吞吐量最高，专精CUDA/ROCm，底层内核控制 |
| **SGLang**  | **面向智能体的推理运行时** | 原生扩散支持，推测性解码，统一 `api.v1`，多模态流水线 |
| **llama.cpp** | **本地运行时 / 边缘执行** | 跨平台（Metal, Vulkan, SYCL, Hexagon），嵌入式/移动端聚焦 |
| **Ollama**  | **开发者网关 / 本地UI**   | 无缝 `ollama run`，语音输出，社区工具集成 |
| **LiteLLM** | **LLM网关 / 成本编排** | 多供应商路由，预算控制，财务核算 |
| **Unsloth** | **智能体平台 / 微调栈** | 流水线/张量并行，KV预占，Studio UX打磨 |

> 📊 **战略洞察**：vLLM与SGLang正成为基础推理层；LiteLLM与Ollama演变为应用网关；Unsloth正在构建端到端智能体操作系统。

---

### **6. 趋势信号**

#### 🔍 **提取的关键行业趋势**
1. **硬件专用化加速推进**：ROCm（AMD）与Hexagon（高通）支持已非实验性质——vLLM与llama.cpp正积极优化MI355X、gfx950与HTP v75。
2. **推测性解码逐步进入生产环境**：多个项目（vLLM、SGLang、Unsloth）已具备优化的草稿生成路径，但正确性缺陷仍存。
3. **多模态工作流已成主流**：SGLang原生扩散支持、Ollama视觉能力提升、vLLM对Qwen3-VL的支持，标志着文本、图像、音频管道的全面融合。
4. **安全与信任不可妥协**：LiteLLM PyPI仓库被篡改事件凸显，供应链完整性已成为核心基础设施要求——签名镜像与验证流程已成为强制项。
5. **智能体需要可组合内存**：Unsloth的KV预占机制与vLLM的可编程缓存RFC，反映出向**会话感知、动态内存管理**的转变。

#### 🛠️ **开发者应关注事项**
- **避免使用 v0.32.0（vLLM）与 v0.1.910-beta（Unsloth）**，直到补丁发布——高严重度崩溃影响生产环境。
- **监控 LiteLLM 的 `BudgetExceededError` 与流式 `usage` 数据丢失**——这会破坏付费服务的财务可靠性。
- **为未来做好准备**：关注 `torch.accelerator`（vLLM RFC #30679）与 `api.v1` 迁移（SGLang、Ollama）——提前重构代码。
- **在适用场景中利用 NVFP4 KV缓存（vLLM）**，可在不损失精度的前提下减少约38%内存占用。
- **若在 RTX 5090 上运行（llama.cpp）**，请设置 `GGML_CUDA_DISABLE_GRAPHS=1` ——避免GPU卡死。

> ✅ **最终结论**：基础设施栈正在快速成熟——但复杂度同步上升。请根据**你的工作负载特征**选择工具：高吞吐服务 → vLLM/SGLang；本地智能体 → Ollama/Unsloth；成本可控编排 → LiteLLM；边缘执行 → llama.cpp。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-10-25**

#### **1. 今日亮点**  
vLLM 项目持续推进对下一代模型与硬件的支持，重点优化 DeepSeek-V4.1 与 Kimi-K3 在 ROCm 平台上的推测解码性能。关键 PR 包括 MI355X（gfx950）上草稿生成的 fastpath 改进、针对密集型 MLA 模型的 NVFP4 KV 缓存支持对齐，以及 KV offload 回压检测的基础性修复。一项重大 RFC 提出构建可复用、可组合的 KV 压缩层以用于传输与存储，预示着长期架构演进方向。

#### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
但正在进行的变更可能影响用户：  
- `--kv-cache-dtype nvfp4` 现已通过 `FLASHINFER_MLA` 支持密集型 MLA 模型（如 DeepSeek-V3.1、Kimi-K3），将每层每标记的缓存占用从 576B（FP8）降至 352B。  
- `enable_adaptive_verification` 目前仅限 SM90/SM100 平台启用——这可能导致在更新的 Blackwell SM120 设备上无法使用，直至问题解决（参见 [Issue #63343](https://github.com/vllm-project/vllm/issues/63343)）。

#### **3. 新模型与硬件支持**  
- **模型**：  
  - 通过 `/v1/systemone` 接口正式支持 Qwen3-VL ([PR #62402](https://github.com/vllm-project/vllm/pull/62402))。  
  - DeepSeek-V4.1-Flash (DSv4.1) 在 ROCm gfx950（MI355X）上获得优化的草稿路径 fastpath ([PR #63182](https://github.com/vllm-project/vllm/pull/63182))。  
  - Kimi-K3 已为 MI355X AgentX 提供对齐的推理配置 ([PR #63520](https://github.com/vllm-project/vllm/pull/63520))。  
- **硬件 / 后端**：  
  - AMD ROCm 支持扩展：gfx942（MI325X）和 gfx950（MI355X）已收到针对性的性能与正确性修复 ([PR #63522](https://github.com/vllm-project/vllm/pull/63522), [PR #63520](https://github.com/vllm-project/vllm/pull/63520))。  
  - RDNA4 GPU（Radeon AI PRO R9700）新增 `ROCM_ATTN` 后端稳定性修复，支持头部大小 ≥96 的场景 ([Issue #62697](https://github.com/vllm-project/vllm/issues/62697))。  
  - 实验性支持 `torch.accelerator` API，以提升超越 CUDA 的硬件可移植性 ([RFC #30679](https://github.com/vllm-project/vllm/issues/30679))。

#### **4. 性能与优化**  
- **内核级**：  
  - 单体 Triton top-k 内核通过改进前 8192 个 logits 的枢轴选择，避免回落至全词表搜索，在 MiMo-V2.6 上将异常收集遗漏率降低约 6–10% ([Issue #61998](https://github.com/vllm-project/vllm/issues/61998))。  
  - 为 DSV4.1-Flash 引入草稿准备阶段的 fastpath：共享输出去重、并行尾部填充修复、仅插入 KV 上下文显著降低开销 ([PR #63182](https://github.com/vllm-project/vllm/pull/63182))。  
- **内存与缓存**：  
  - NVFP4 KV 缓存相比 FP8 可减少约 38% 内存占用（352B/token/layer），同时保持密集型 MLA 模型的精度 ([PR #63203](https://github.com/vllm-project/vllm/pull/63203))。  
  - 提出可复用的 KV 压缩层方案（受 KVServe 启发），旨在降低传输与存储成本 ([RFC #59538](https://github.com/vllm-project/vllm/issues/59538))。  
- **扩展性**：  
  - GB200 上的 GLM-5.3 P/D 显示 NIXL 描述符提交成为瓶颈（每秩传输达 91k–120k 描述符），提示需要更低开销的互连机制 ([Issue #55434](https://github.com/vllm-project/vllm/issues/55434))。

#### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - Qwen4Exp（Qwen3.8-Flash-Next）单次预填充跨越 262,144 原生边界时，因 CUDA 非法内存访问导致引擎崩溃（v0.32.0 版本引入的回归）——已在 v0.31.1 中修复 ([Issue #62383](https://github.com/vllm-project/vllm/issues/62383))。  
  - Qwen3.8-27B（GDN 混合型）在 sm_86 上使用 PP=3 时，开启前缀缓存触发非法内存访问（Xid 31）；自 v0.28.0 起出现回归 ([Issue #63505](https://github.com/vllm-project/vllm/issues/63505))。  
- **正确性缺陷**：  
  - ngram 推测解码在混合型 GDN Qwen3.5 模型上产生损坏输出 ([Issue #39273](https://github.com/vllm-project/vllm/issues/39273))。  
  - 前次预填充结束位置超出块边界后，前缀缓存命中导致出现 NaN logits ([Issue #55766](https://github.com/vllm-project/vllm/issues/55766))。  
- **进行中的修复**：  
  - PR #63524 修复 fs 层存储任务中写入块数报告错误的问题（影响回压检测）。  
  - PR #63521 通过命名不支持的格式而非显示 `<built-in function format>`，改善 ORCA 头信息日志输出。

#### **6. 对应用开发者的启示**  
- **智能体系统**：使用 `Programmable KV Cache` RFC (#57103) 可实现自定义会话生命周期策略与保留机制——特别适合内存需求动态变化的长时间运行智能体。  
- **高吞吐服务**：在 Kimi-K3 或 DeepSeek-V3.1 等 MLA 模型上启用 `nvfp4` KV 缓存（通过 `--kv-cache-dtype nvfp4`），可在不牺牲精度的前提下将内存占用降低高达 38%。  
- **多后端可移植性**：为未来迁移到 `torch.accelerator`（RFC #30679）做好准备，避免硬编码依赖 CUDA。  
- **稳定性注意事项**：在补丁发布前，请避免在 Qwen4Exp 或混合型 GDN 模型上使用 `v0.32.0`；密切监控 `speculative-decoding` 路径中的回归问题。  
- **监控建议**：使用 `ORCA` 头部配合 DP 引擎——确保所有秩的指标均被聚合（修复见 PR #63445）。

> ✅ **推荐操作**：  
> - 若使用 Qwen4Exp 或混合型 GDN 模型，请升级至 `v0.31.1`。  
> - 在适用场景中启用 `--kv-cache-dtype nvfp4` 以降低密集型 MLA 模型的内存占用。  
> - 关注 [Issue #63505](https://github.com/vllm-project/vllm/issues/63505) 与 [Issue #62383](https://github.com/vllm-project/vllm/issues/62383) 的后续修复进展。

---  
*数据来源：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-25

---

### **1. 今日亮点**  
SGLang 持续推进对高吞吐、多模态及以代理为中心推理的支持，近期在内核优化、扩散模型集成以及 AMD ROCm 支持方面取得显著进展。针对混合 MoE 模型中 `FlashInfer` 预填充正确性问题和 Blackwell GPU 上 `HiCache` CTA 崩溃的稳定修复工作正在推进。项目还正积极向统一的 `api.v1` 后端迁移，以简化跨代际的 API 表面。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性变更。

---

### **3. 新模型与硬件支持**  
- ✅ **AMD RDNA3/RDNA4 (gfx1100/gfx1101/gfx1200/gfx1201) 支持追踪**：议题 #30599 列出了一项官方路线图，计划将 ROCm 支持从数据中心 Instinct GPU 扩展至消费级 Radeon 显卡，包含战略依据与启用步骤。
- 🟢 **SANA-Sprint 0.6B 扩散模型原生支持**：PR #43671 添加了对 [Efficient-Large-Model/Sana_Sprint_0.6B_1024px_diffusers](https://github.com/sgl-project/sglang/pull/43671) 的显式原生支持，实现极低延迟下的快速文生图生成。
- 🔧 **NPU PD_Disaggregation + Mooncake 传输后端**：PR #46223 为 NPU 分离架构启用了基于 Mooncake 的传输后端支持，对分布式内存架构至关重要。

---

### **4. 性能与优化**  
- ⚡ **扩散管道性能提升**：  
  - PR #46246：在每个去噪循环中仅投影一次交叉注意力 K/V → 在 Wan2.2 A14B 上每步减少约 0.07ms 的冗余计算。  
  - PR #46338：在大型均匀预填充分片环境中使用 `reduce-scatter` 替代 `all-reduce` → 降低通信开销。
- 💾 **调度器效率**：  
  - PR #46337：在预填充接纳期间增量跟踪 `num_held_rows` → 避免在紧循环中重复计算；在突发负载下提升调度器吞吐量。
- 🔄 **DSA 重叠优化**：  
  - PR #46179：在交错预填充期间将 CP KV 收集与索引器计算重叠 → 隐藏注意力 DP 路径中的延迟。
- 📈 **LoRA 测试简化**：  
  - PR #45981：简化 LoRA 测试矩阵并引入重跑分组 → 减少 CI 噪声，加快验证周期。

---

### **5. 稳定性与回归问题**  
**严重问题（高危）**：
- 🔥 **FlashInfer 预填充非分割不变输出**：议题 #46259 报告在使用 FlashInfer 预填充且路由为分割不变模式时，Qwen3.5 混合 GDN 模型出现贪婪输出损坏。修复待处理。
- 🔥 **HiCache CTA 缺失崩溃（Xid 13）**：议题 #46203 记录了在 Blackwell B20Z 上，于代理负载下因 `kvcacheio` 传输内核失败导致的 7 次崩溃。对 GPU 稳定性有极高紧急度。
- 🔥 **调度器双重释放损坏**：议题 #42508 在空闲循环不变性检查（`session_held_tokens`）中触发 `double free or corruption` 后导致服务器永久挂起。需立即修复。

**其他值得关注的缺陷**：
- ❌ **GLM-5.3-Flash 思考退化**：议题 #36669 在复杂工具调用提示下出现无限重复的 `!` — 很可能是分词器或采样状态问题。
- ❌ **压缩张量未目标层失败**：议题 #46335 在加载时失败报错“Unable to find matching target” — 影响量化模型部署。
- ❌ **扩散量化正确性缺陷**：议题 #46314 识别出量化层（MXFP4、FP8、KitchenW4A4 等）中的 11 个正确性缺陷 — 影响生成图像保真度。

---

### **6. 对应用开发者的启示**  
- **避免在 Kimi-K3 (GB300) 上使用 `a2a` DCP**：若您使用双节点 GB300 集群，请在 #45367 修复前禁用 `NCCL_GRAPH_REGISTER=1`，以防输出乱码。
- **在 H20-3e 上使用 DeepSeek-V4-Flash 时启用 `--enable-cp-decode-attn-tp`**：根据 #46310，该标志可提升性能，优于基线 DeepInfer；请根据实际工作负载进行基准测试。
- **谨慎使用 AMD 上的推测解码**：尽管 #42496 已在 gfx950 上启用共享专家融合，但仍需确保未触发 `DeepSeekModelNextN` 量化中的边缘情况（详见 #44760）。
- **关注 `api.v1` 迁移**：随着 RFC #45816 与功能请求 #46297，预计 OpenAI 兼容 API 表面将发生变动。请为未来弃用如 `TextGenerate` 等旧端点做好准备。
- **在 Blackwell 平台上谨慎测试代理工作负载**：鉴于存在 Xid 13 崩溃风险（#46203），请在补丁上线前避免在 B20Z 上运行长时间代理链。

> 🛠️ *技巧提示*：若遇到解码挂起或无效输出，临时使用 `--disable-cuda-graph` 可能有助于排查。

---  
*本摘要由 GitHub 活动整理：[sgl-project/sglang](https://github.com/sgl-project/sglang)*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

### **1. 今日亮点**  
最新更新聚焦于 MoE 模型的关键稳定性修复、Hexagon/HMX 上的 Flash Attention 优化，以及 Jinja 模板解析的鲁棒性提升。主要变更包括修复 `selectattr` 参数处理问题（PR #31059），解决 HTP v75 上视觉编码器的 GPU 内存损坏问题（Issue #31104），以及针对多核 Hexagon 设备上 KV-head 团队拆分的性能关键内核优化（PR #31055）。

---

### **2. 版本发布与破坏性变更**  
过去 24 小时内未发布新的标记版本。但多项重要 PR 已合并，可能影响用户：  
- **Jinja 解析器**：修复 `select`/`selectattr` 中的错误参数处理，防止复杂聊天模板导致崩溃（PR #31059）。  
- **Metal 后端**：移除冗余的 `mul_mm_id` amax 缩放，现已被按专家-令牌缩放取代（PR #30924）。  
- **服务入口点**：重构以通过 `server_role` 支持模块化角色（路由器、单机、下载）（PR #31113）。  
> 🔗 [PR #31059](https://github.com/ggml-org/llama.cpp/pull/31059) | [PR #30924](https://github.com/ggml-org/llama.cpp/pull/30924) | [PR #31113](https://github.com/ggml-org/llama.cpp/pull/31113)

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 通过 PR #31086 添加对 **DSV4.1 Flash** 模型格式的实验性支持。  
  - 修复 **Sarvam 30B MoE** 转换器在标签字节回退令牌时的错误标注问题（Issue #30879）。  
- **硬件后端改进**：  
  - **Hexagon/HMX**：引入多核 KV-head 团队拆分用于 Flash Attention（PR #31055），提升 HTP v75 及其他基于 Hexagon 的 SoC 的利用率。  
  - **Vulkan**：为缺少 `shader_64b_indexing` 的设备添加绕行方案，防止 MoE 缓存崩溃（PR #31114）。  
  - **SYCL**：修复 F16 量化舍入问题，该问题曾导致 CPY 失败（PR #31120）。  
> 🔗 [PR #31086](https://github.com/ggml-org/llama.cpp/pull/31086) | [PR #31055](https://github.com/ggml-org/llama.cpp/pull/31055) | [PR #31114](https://github.com/ggml-org/llama.cpp/pull/31114)

---

### **4. 性能与优化**  
- **Flash Attention**：优化 Hexagon 平台上的多核 HMX Flash Attention KV-head 团队拆分，减少空闲核心数，并在 `n_kv_heads` 无法整除核心数量时提升并行度（PR #31055）。  
- **内存传输**：PR #31073 将旋转常量移至 GPU 内存，降低 PCIe 2.0 系统（如 RTX 3090 + 旧笔记本）上的主机-GPU 同步开销。  
- **CUDA**：PR #30788 通过使用车道打包行，提升小 K 情况下 NVFP4 MMVQ 的性能；PR #30727 为 cuBLAS 添加对旧版 Kepler GPU 的兼容支持。  
- **MoE 缓存**：PR #31122 引入可选的主机专家页锁定机制，避免从可分页内存调用 `cudaMemcpyAsync`，从而提升 MoE 解码吞吐量。  
> 🔗 [PR #31055](https://github.com/ggml-org/llama.cpp/pull/31055) | [PR #31073](https://github.com/ggml-org/llama.cpp/pull/31073) | [PR #30788](https://github.com/ggml-org/llama.cpp/pull/30788) | [PR #31122](https://github.com/ggml-org/llama.cpp/pull/31122)

---

### **5. 稳定性与回归问题**  
今日报告最高的问题反映出严重的正确性和稳定性风险：  
1. **视觉编码器中 GPU 内存损坏（严重）**：  
   - Issue #31104 报告：在 HTP v75 上，根据图像形状不同，CLIP 视觉编码器输出出现损坏——仅在 Hexagon 平台上复现，CPU 上正常。  
   - *修复 PR*：[PR #31104](https://github.com/ggml-org/llama.cpp/pull/31104)（待评审）。  
2. **RTX 5090 上 CUDA Graph 崩溃（高危）**：  
   - Issue #27330 显示：在 RTX 5090（sm_120）上，CUDA Graph 导致 GPU 假死（Xid 8）；设置 `GGML_CUDA_DISABLE_GRAPHS=1` 可完全规避。  
   - *备注*：这很可能是驱动或计算能力层面的回归问题。  
3. **Intel Arc B70 上 SYCL F16 输出为 NaN（高危）**：  
   - Issue #30892：在执行 IQ3 代码重排（#29107）后，SYCL F16 在 Qwen3.8-27B 中产生 NaN 输出；禁用融合 GEMM 可临时修复。  
   - *修复 PR*：[PR #31120](https://github.com/ggml-org/llama.cpp/pull/31120) 修复了底层舍入问题。  
4. **Vulkan 上 MoE 缓存崩溃（中等严重）**：  
   - Issue #30697：在 RX 6900 XT 上使用 Vulkan 时，`--moe-cache-mib` 会因缺少 `shader_64b_indexing` 导致崩溃。  
   - *修复 PR*：[PR #31114](https://github.com/ggml-org/llama.cpp/pull/31114) 跳过非计算张量的预检查。  

> 🔗 [Issue #31104](https://github.com/ggml-org/llama.cpp/issues/31104) | [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) | [Issue #30892](https://github.com/ggml-org/llama.cpp/issues/30892) | [Issue #30697](https://github.com/ggml-org/llama.cpp/issues/30697)

---

### **6. 对应用开发者的启示**  
- **若在 RTX 5090 上运行，请立即启用 `GGML_CUDA_DISABLE_GRAPHS=1`** —— CUDA Graph 不稳定，可能导致进程崩溃。  
- **仅在具备 `shader_64b_indexing` 的 Vulkan 设备上启用 `--moe-cache-mib`**，除非已应用 PR #31114 的修复。  
- **对于 Intel Arc 用户**，请避免使用 `--moe-cache-mib` 及相关参数，直到 SYCL F16 舍入修复落地；可临时使用 `--fused-gemm off` 作为替代。  
- **若使用 DSV4.1 Flash 模型，请尽早测试** —— 此格式为新支持，可能需要额外调优。  
- **在 Hexagon（HTP v75）上进行移动端/嵌入式部署时**，请确保版本不低于 b11849，且在 PR #31104 合并前避免使用不规则输入形状的视觉编码器。  
- **在慢速 PCIe 系统上进行高吞吐 MoE 推理时**，请结合 PR #31122 使用 `--moe-cache-mib` 与主机内存锁定机制以获得最佳性能。  

> 🔗 [GitHub 问题汇总](https://github.com/ggml-org/llama.cpp/issues?q=is%3Aopen+sort%3Aupdated-desc) | [最新 PR 列表](https://github.com/ggml-org/llama.cpp/pulls?q=is%3Aopen+sort%3Aupdated-desc)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-25**

---

### **1. 今日亮点**  
Ollama 现已通过 `ollama run` 和兼容 OpenAI 的 `/v1/audio/speech` 端点，在 macOS 上原生支持设备端语音合成，实现模型输出的实时音频播放。同时，针对 MLX 引擎的关键稳定性修复已合并，包括被忽略的 `stop` 序列、内存统计不准确，以及因逐层量化不匹配导致的模型加载失败问题。

---

### **2. 发布与破坏性变更**  
- **v0.40.11**：引入 macOS 原生语音生成功能（`ollama run phonon "Hello..."`），并通过 `/v1/audio/speech` 端点支持流式音频输出。  
  🔗 [发布说明](https://github.com/ollama/ollama/releases/tag/v0.40.11)

---

### **3. 新模型与硬件支持**  
- **MLX 引擎**：新增对 **Nemotron 3.5 Bolt 74B-A9B** 的完整支持，包含逐层专家配置、LiLiCorr 预测解码、3 位预量化仿射导入及混合精度专家堆叠。  
  🔗 [PR #19229](https://github.com/ollama/ollama/pull/19229)  
- **视觉模型**：通过动态网格舍入优化了紧凑型 Gemma 4 视觉塔对小图像细节的保留能力。  
  🔗 [PR #19247](https://github.com/ollama/ollama/pull/19247)  
- **社区集成（新增）**：新增 Pixeltable（多模态数据基础设施）、Knovum（本地优先桌面 AI）、ShibaClaw（自托管代理框架）和 Golem（Go 语言代理框架）。  
  🔗 [PR #19269](https://github.com/ollama/ollama/pull/19269), [PR #19261](https://github.com/ollama/ollama/pull/19261), [PR #19259](https://github.com/ollama/ollama/pull/19259), [PR #18816](https://github.com/ollama/ollama/pull/18816)

---

### **4. 性能与优化**  
- **MLX vs. llama.cpp**：报告存在性能回归问题，`flint:40b-a2b-gguf-nvfp4`（MLX）在 Apple Silicon（M3, 36GB）上运行速度显著慢于 `flint:40b-a2b-qat-int4`，基准测试显示吞吐量低约 2 倍，尽管模型规格相近。  
  🔗 [Issue #19254](https://github.com/ollama/ollama/issues/19254)  
- **Token 估算修复**：将启发式 token 计数替换为精确的 Anthropic Tokenization API + 本地缓存，防止多模态提示中上下文窗口溢出。  
  🔗 [PR #19265](https://github.com/ollama/ollama/pull/19265)  
- **内存统计**：修复多模型加载及日志分块时的显存（VRAM）报告错误，通过保留读取过程中的缓冲区状态实现。  
  🔗 [PR #17857](https://github.com/ollama/ollama/pull/17857), [PR #19263](https://github.com/ollama/ollama/pull/19263)

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR |  
|------|----------|--------|--------|  
| `OLLAMA_NUM_PARALLEL=1` 被忽略 —— 两个会话同时运行 | 严重 | 开放 | ❌ |  
| `options.stop` 在 MLX 引擎中被忽略 | 高 | 开放 | 🔗 [PR #19267](https://github.com/ollama/ollama/pull/19267) |  
| 因逐层量化覆盖导致形状不匹配，MLX 模型导入失败 | 高 | 开放 | 🔗 [PR #18789](https://github.com/ollama/ollama/pull/18789) |  
| 通过 OMP 在 Ollama Cloud 上调用 Beam 模型返回空响应 | 高 | 开放 | ❌ |  
| `/compact` 请求因请求体过大返回 HTTP 413；需添加重试逻辑 | 中等 | 开放 | 🔗 [PR #19266](https://github.com/ollama/ollama/pull/19266) |  

> ⚠️ 多个高严重性回归影响核心推理可靠性，尤其在 MLX 与云部署场景下。

---

### **6. 对应用开发者的启示**  
- **语音增强代理**：可使用 `ollama run` 或 `/v1/audio/speech` 在本地 macOS 应用中实现语音输出，无需依赖外部服务。  
- **MLX 注意事项**：在合并 PR #19267 与 #18789 前，避免依赖 `stop` 序列或逐层量化。预期 MLX 与 llama.cpp 后端间存在性能波动。  
- **工具调用与代理框架**：使用 `ollama launch opencode` 时设置 `XDG_STATE_HOME` 以避免模型历史丢失。通过兼容 OpenAI 的端点集成新工具如 OpenSeal、ShibaClaw 与 Golem。  
- **生产安全**：升级至 v0.40.11 并监控上下文溢出风险——若使用复杂多模态输入，请启用新修复（PR #19265）。  

🔧 **行动项**：审计 `OLLAMA_NUM_PARALLEL` 使用情况，验证 MLX 上 `stop` 序列行为，并测试混合精度检查点的模型加载。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 摘要 — 2026-10-25**

#### **1. 今日重点**  
针对 PyPI 与 Docker Hub 上恶意 `litellm==1.107.0` 包引发的严重安全事件已解决：受影响版本已被撤回，所有相关镜像已从 `ghcr.io` 和 `docker.io` 移除。社区被敦促使用来自提交 [`e82a3c6`](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065) 的新 cosign 密钥验证镜像完整性。同时，多个与成本核算、预算控制及流式使用追踪相关的高危缺陷已在聚焦数据一致性和财务准确性的 PR 中得到修复。

#### **2. 发布与破坏性变更**  
- **v1.106.3, v1.105.4, v1.104.6, v1.103.8**：所有近期发布均包含一项**关键的镜像签名变更**——每个 Docker 镜像和 Helm Chart 现在均使用来自提交 [`e82a3c6`](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065) 的新 cosign 密钥。用户必须更新验证流程，以避免部署失败。  
  🔗 [GitHub 发布说明](https://github.com/BerriAI/litellm/releases/tag/v1.106.3)

#### **3. 新模型与硬件支持**  
- **Cerebras Llama 3.1 模型**现已添加标准化的连字符别名（`cerebras/llama-3.1-8b`、`cerebras/llama-3.1-70b`）至定价与上下文窗口映射表中。  
  🔗 [PR #48178](https://github.com/BerriAI/litellm/pull/48178), [PR #48158](https://github.com/BerriAI/litellm/pull/48158)  
- **NVIDIA Nemotron 3.5 Super VL** 定价已通过 W&B 发布的 CoreWeave Forge 推理费率更新。  
  🔗 [PR #48264](https://github.com/BerriAI/litellm/pull/48264)  
- **Azure 转录会话**现在可正确通过 GA client_secrets 端点路由（此前因路径错误导致失效）。  
  🔗 [PR #48067](https://github.com/BerriAI/litellm/pull/48067)

#### **4. 性能与优化**  
- **批量与超快层级计费**：LiteLLM 现在支持 OpenAI 批量与超快层级的 12 小时提示缓存写入计费，使高吞吐批量任务的成本建模更加精准。  
  🔗 [PR #48259](https://github.com/BerriAI/litellm/pull/48259)  
- **流式效率优化**：修复确保未注册模型的工具得以保留，并在客户端断开连接时正确释放上游消息流，减少长时间连接下的资源泄漏。  
  🔗 [PR #48267](https://github.com/BerriAI/litellm/pull/48267), [PR #48220](https://github.com/BerriAI/litellm/pull/48220)

#### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |
|--------|------|-------|-------|
| 🔴 高 | 在持续负载下，即使支出低于 max_budget 也会错误触发 `BudgetExceededError` | 开放 | [PR #43732](https://github.com/BerriAI/litellm/pull/43732) |
| 🔴 高 | 流式请求在最终数据块 `choices` 非空时丢失 `usage` 数据 —— 导致计费不准确 | 开放 | [PR #36926](https://github.com/BerriAI/litellm/pull/36926) |
| 🔴 高 | `end_user` 字段错误地绑定到共享虚拟密钥的首次请求的 `user` | 开放 | [PR #31441](https://github.com/BerriAI/litellm/pull/31441) |
| 🟡 中 | 当 `price map` 缺少 `provider_response_model` 时，流式请求记录 `spend = 0` | 开放 | [PR #42161](https://github.com/BerriAI/litellm/pull/42161) |
| 🟡 中 | 若模型未在目录中，JSON 定义的提供者会丢失工具 | 开放 | [PR #48145](https://github.com/BerriAI/litellm/pull/48145) |

> ⚠️ 多个问题涉及**成本核算漏洞**、**预算控制绕过**及**流式元数据丢失**——对生产环境计费系统至关重要。

#### **6. 对应用开发者的意义**  
- **立即使用新 cosign 密钥（`e82a3c6`）验证镜像签名**，防范供应链风险。  
- 若使用**虚拟密钥、团队预算或多租户路由**，需注意 `end_user` 跟踪与预算持久性方面的回归问题——请测试 `max_end_user_budget_id` 与 `project_budget` 流程。  
- 对于**使用工具的代理流水线**，请确保模型定义在目录中或显式声明；否则工具可能被静默剥离。  
- 在计算成本时，务必显式使用 `custom_llm_provider` 与 `model` 参数，避免 `completion_cost()` 中出现提供者泄露。  
- 建议迁移到 `cerebras/llama-3.1-*` 别名，以获得一致的定价和更优的模型发现体验。  

> ✅ **可操作建议**：检查代理配置中的 `max_budget`、`team` 与 `end_user` 设置；升级后审计 `SpendLogs` 是否存在异常。  
> 🔗 [GitHub 问题（前 30 个）](https://github.com/BerriAI/litellm/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) | [PR（过去 24 小时）](https://github.com/BerriAI/litellm/pulls?q=is%3Aopen+updated%3A2026-10-24..2026-10-25)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-25**

---

### **1. 今日亮点**  
Unsloth 生态系统持续快速演进，重点优化了用户界面与体验（UI/UX），并提升了后端稳定性，特别是在模型加载、缓存机制和跨平台兼容性方面。关键修复解决了 Windows 平台上的持续崩溃问题（由错误的端口所有权检查引发）以及长时间聊天归档期间的 CPU 卡顿问题；同时，新提交的 PR 引入了高级流水线并行与 KV 预占能力，显著提升多聊天推理效率。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
然而，近期的测试版（v0.1.909-beta 至 v0.1.910-beta）引入了影响以下功能的破坏性变更：
- **Windows 上的模型加载**：多名用户报告，在 2026-10-23 更新后，GGUF 模型被错误的 `port-ownership` 检查终止加载 ([#15022](https://github.com/unslothai/unsloth/issues/15022))。
- **默认行为覆盖**：Studio 现在在启动 llama-server 时强制启用 `preserve_thinking=true`，覆盖用户自定义的聊天模板 ([#15115](https://github.com/unslothai/unsloth/issues/15115))。

> 💡 *开发者应验证其自定义聊天模板，并在需要时显式禁用 `preserve_thinking`。*

---

### **3. 新模型与硬件支持**  
今日未宣布新的模型或硬件支持。但正在进行的工作包括：
- **多主机调度**：功能请求 [#4858](https://github.com/unslothai/unsloth/issues/4858) 希望实现跨多台机器的分布式推理——对扩展训练/推理集群至关重要。
- **Metal GPU 支持**：PR [#14431](https://github.com/unslothai/unsloth/pull/14431) 提升了 Mac Metal GPU 上 DSpark/DFlash sidecar 的处理能力，包含内存溢出恢复逻辑。

---

### **4. 性能与优化**  
重大性能提升正在积极开发中：
- **KV 预占与并行缓存**：PR [#10301](https://github.com/unslothai/unsloth/pull/10301) 实现每个 llama-server 实例一个 KV 缓存，通过 `--preempt-ram` 使并行聊天可高效共享内存。
- **流水线并行 v1**：PR [#15175](https://github.com/unslothai/unsloth/pull/15175) 引入原生 GPipe 风格流水线并行（`1F1B`），基于 `torch.distributed.pipelining`，适用于密集解码器，可在更少 GPU 上运行更大模型。
- **张量并行 v2**：PR [#15174](https://github.com/unslothai/unsloth/pull/15174) 增加分片加载与混合数据+张量并行训练——现已支持在两块 16GB GPU 上运行 8B LoRA 模型。

> ✅ 这些进展将显著降低大规模微调与服务场景下的内存压力，并提升吞吐量。

---

### **5. 稳定性与回归问题**  
今日报告了若干高优先级稳定性问题：

| 问题 | 严重性 | 状态 | 影响 |
|------|----------|--------|--------|
| [#15022](https://github.com/unslothai/unsloth/issues/15022): GGUF 加载失败，因错误的“子进程未监听”端口检查 | 🔴 高 | 开放 | 阻碍更新后 Windows 用户加载模型 |
| [#15142](https://github.com/unslothai/unsloth/issues/15142): v0.1.910-beta 更新后所有模型无法加载（Windows） | 🔴 高 | 开放 | 大范围桌面崩溃；可能与 #15022 相关 |
| [#14519](https://github.com/unslothai/unsloth/issues/14519): 长对话在基于 CPU 的嵌入阶段推理前无限卡住 | 🟡 中等 | 已关闭 | 启动延迟；影响工具密集型工作流 |
| [#15172](https://github.com/unslothai/unsloth/issues/15172): Studio 在图像生成过程中崩溃（核心转储） | 🟡 中等 | 开放 | 影响多模态工作流 |

> ⚠️ 当前尚无针对高严重性问题的修复 PR。使用 Windows 的用户应避免使用 v0.1.910-beta，直至问题解决。

---

### **6. 对应用开发者的影响**  
- **对于使用本地推理的代理/应用**：可期待通过即将推出的流水线并行与张量并行支持实现更好的可扩展性——非常适合在消费级硬件上部署大模型（>7B）。
- **对于 UI 集成者**：新设计的 `--preempt-ram` + KV 共享机制允许在不重复缓存的前提下构建高效的多用户或多聊天系统。请留意未来的 API 更新。
- **对于使用自定义聊天模板的开发者**：请注意 `preserve_thinking=true` 现已默认启用——如需覆盖，请显式设置 `--no-reasoning-preserve` 或使用 `--chat-template`。
- **对于 CI/CD 流水线**：确保 Docker 构建包含 vLLM/SGLang 依赖项的持久化存储（参见 [#15016](https://github.com/unslothai/unsloth/issues/15016)），以避免重复下载。

> 📌 **实用建议**：若您正在构建需要长时间、多轮对话的代理系统，一旦 `--parallel 4` 与 `--preempt-ram` 合并，建议进行测试——这可能大幅降低延迟与内存占用。

---  
*本摘要源自 GitHub 活动：[unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*