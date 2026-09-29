# AI 基础设施日报 2026-09-29

> 生成时间: 2026-09-29 02:13 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-29**

---

### **1. 生态概览**  
AI推理与服务生态正迅速超越单体部署模式，呈现出清晰的分化趋势：高性能分布式引擎（vLLM、SGLang）与开发者友好的代理原生平台（Ollama、Unsloth）各成体系。关键趋势包括服务解耦、多模态嵌入支持，以及结构化决策API的兴起。硬件多样性持续扩展——ROCm、AMD gfx950、平头哥PPU、Apple Silicon及混合GPU配置已成为第一优先级支持的平台。与此同时，LiteLLM逐步确立为事实上的网关层，实现云与本地后端之间的成本感知路由。

---

### **2. 活动对比**

| 项目       | 开放问题（高/严重） | 最近7天合并的PR | 最近24小时发布 | 备注 |
|------------|----------------------|------------------|----------------|------|
| **vLLM**   | 12（4个严重）        | 18               | 无             | 聚焦ROCm/AMD稳定性、CUDA图、推测性解码修复 |
| **SGLang** | 10（4个严重）        | 14               | 无             | 分布式KV缓存、HiSparse、多GPU支持活跃开发 |
| **llama.cpp** | 12（3个严重）      | 16               | 4（b11236–b11242） | 快速修复GCC/Vulkan问题；`batch_ext`迁移进行中 |
| **Ollama** | 9（2个严重）         | 12               | v0.35.0        | 重大功能发布：System One API；Windows/CUDA不稳定性持续存在 |
| **LiteLLM** | 8（3个高）          | 12               | v1.104.0-rc.1 / v1.103.0 | 通过cosign签名强化安全；模式回归问题仍开放 |

> ✅ *vLLM与SGLang在技术深度上领先；Ollama在用户端创新上占优。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|---------------|------|--------|-----------|--------|---------|
| **DeepSeek-V4.1** | ✅ 完全支持NVIDIA + ROCm | ✅ FP8/MXFP4 | ✅ 实验性支持 | ✅ 已请求 | ❌ 无支持 |
| **Qwen3-VL / Qwen3-VL-Embedding** | ✅ ViT CUDA图 + 预填充CP | ✅ 部分支持 | ✅ 完全支持 `/v1/embeddings` | ⚠️ 视觉能力有限 | ❌ 无支持 |
| **GLM-5.3** | ✅ GB200/NIXL性能优化重点 | ✅ AMD上支持FP8/MXFP4 | ✅ DFLASH推测解码 | ⚠️ 推测性问题 | ❌ 无支持 |
| **Kimi-K3 / Kimi-K2.5** | ✅ 支持ViT | ✅ 混合支持 | ❌ 未提及 | ⚠️ 解码崩溃 | ❌ 无支持 |
| **Laya决策模型** | ❌ 无支持 | ❌ 无支持 | ❌ 无支持 | ❌ 无支持 | ❌ 无支持 |
| **GraniteSpeech5ForCTC** | ❌ 无支持 | ❌ 无支持 | ✅ 已添加 | ⚠️ 实验性 | ❌ 无支持 |
| **平头哥PPU (ZW810)** | ❌ 无支持 | ✅ 路线图规划 | ❌ 无支持 | ❌ 无支持 | ❌ 无支持 |

> 🏆 **胜者：SGLang & vLLM** — 两者在**多模型**、**多硬件**和**分布式**支持上均领先。  
> 🥈 **新星：llama.cpp** — 在**本地多模态嵌入**与**跨平台CPU/GPU**覆盖方面表现最强。

---

### **4. 性能前沿**

| 优化重点         | vLLM                          | SGLang                        | llama.cpp                     | Ollama                       | LiteLLM                      |
|------------------|-------------------------------|-------------------------------|-------------------------------|------------------------------|------------------------------|
| **KV缓存效率**    | NVFP4压缩、卸载身份修复       | 分布式分片、HiCache路线图     | `--cpu-mtp`、左填充           | MTP缓存复用                 | 无                           |
| **预填充可扩展性** | 分片索引行（PR #54951）       | 上下文并行（CP）路线图         | CPU Flash Attention           | Flash Attention自动启用     | 无                           |
| **量化与内核**    | MXFP8、GVR2、稀疏logits索引器 | Triton稀疏注意力、PTPC         | CDNA2 MFMA、MXFP4             | 自动Flash Attention         | 按秒计费精度                 |
| **分布式服务**    | 解耦 `/render` → `/derender` | PD解耦 + HiCache              | 无                            | 无                           | 网关级路由                   |
| **批处理与吞吐**  | CUDA图、MTP、推测解码         | 预填充CP、KV分片              | `batch_ext`统一                | MTP缓存复用                 | 批文件限制                   |

> 🔥 **最先进**：vLLM（完整CUDA图 + 推测解码），SGLang（分布式上下文并行）。  
> 💡 **最具创新性**：llama.cpp（`--cpu-mtp`、Vulkan内核调优），LiteLLM（按秒计费）。

---

### **5. 层级定位**

| 项目       | 主要层级             | 核心功能                                                                 | 差异化优势 |
|------------|----------------------|--------------------------------------------------------------------------|------------|
| **vLLM**   | **服务引擎**         | 高吞吐、低延迟推理，支持高级内核与解耦架构                                | 大规模LLM服务的事实标准 |
| **SGLang** | **分布式推理**       | 代理工作负载、长上下文稀疏服务、分布式KV缓存                             | 专为有状态代理与内存受限扩展设计 |
| **llama.cpp** | **本地运行时**     | 基于GGUF的CPU/GPU/NPU推理，依赖极低，支持离线运行                         | 边缘、移动端与隐私优先部署的最佳选择 |
| **Ollama** | **网关 + CLI平台**   | 统一模型管理、本地推理、通过 `/v1/systemone` 实现代理编排                  | 通过简单CLI/API降低模型访问门槛 |
| **LiteLLM** | **API网关 / 编排器** | 成本追踪、路由、安全、跨云与本地系统的供应商抽象                         | AI栈中的“交通指挥官” |

> 📌 **战略洞察**：vLLM/SGLang是基础设施构建者；Ollama/LiteLLM是平台赋能者；llama.cpp是可移植的运行时。

---

### **6. 趋势信号**

1. **解耦服务已成主流**  
   vLLM的 `/render` → `/generate` → `/derender` 与 SGLang的分布式KV缓存路线图表明，**无状态、模块化的推理流水线**已不再是实验性概念——而是生产就绪的实践。

2. **结构化输出API正在取代文本生成用于编排**  
   Ollama的 **System One** API（选项、得分、概率）标志着向**原生AI决策**的转变——减少对易产生幻觉的文本生成在路由与分类中的依赖。

3. **多模态嵌入正进入生产环境**  
   llama.cpp的 `/v1/embeddings` 支持结构化内容数组，以及SGLang/vLLM对ViT的支持，表明**多模态嵌入已具备实时工作流的可行性**。

4. **硬件多样性驱动创新**  
   ROCm支持（gfx950）、平头哥PPU、MLX在Apple Silicon上的应用，以及混合AMD/NVIDIA配置，显示**没有单一硬件栈占据主导地位**——可移植性与跨平台优化成为关键。

5. **安全与可观测性不可妥协**  
   LiteLLM的cosign签名、Redis防护超时机制，以及Ollama的模型排行榜UI，反映出对**可验证、可审计、成本透明的AI系统**日益增长的需求。

> 🔮 **开发者应关注**：  
> - **代理工作流**：关注SGLang的分布式KV缓存与vLLM的ViT CUDA图RFC。  
> - **边缘部署**：优先使用`llama.cpp`的`--cpu-mtp`与`batch_ext`以适配资源受限设备。  
> - **成本控制**：利用LiteLLM的按秒计费与模型排行榜避免过度配置。  
> - **避免静默失败**：验证输入模式（LiteLLM），监控工具调用超时（Unsloth），测试图像处理（Ollama/gemma4）。

---

*报告数据来源：GitHub活动记录于2026-09-29 | 目标读者：基础设施工程师、CTO、AI平台架构师*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-09-29**

#### **1. 今日亮点**  
vLLM 项目持续扩展对下一代模型及拆分式服务架构的支持，其中在 DeepSeek V4.1 的 ROCm 集成以及 gfx950 上的 NVFP4 压缩 KV 缓存方面取得关键进展。一项重大 RFC (#38175) 正推进视觉 Transformer（ViT）全 CUDA 图支持，适用于 Qwen3-VL、Kimi K2.5 等多模态模型，显著提升视觉语言推理吞吐量。与此同时，稳定性仍是重点，已修复多个与推测解码、KV 缓存损坏及设备端断言相关的关键问题。

#### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但针对 **拆分式服务**（通过 `/render`、`/generate`、`/derender` 接口）的持续工作仍在推进：  
- PR #58783 在 Rust 前端实现 OpenAI `responses` API 兼容性（跟踪 #53380）。  
- PR #56331 确保 KV 卸载缓存的身份标识包含模型配置（修复 #56311），防止配置变更后错误复用缓存。  
> ⚠️ 使用持久化 KV 卸载的开发者应验证其部署是否符合此变更。

#### **3. 新模型与硬件支持**  
- ✅ **DeepSeek V4.1** 已在 NVIDIA 平台完成完整内核集成：MegaAttention、Sparse Logits Indexer、DeepSelect、Mega mHC、Mega Gate 及 GVR2（待定）。详见 [PR #57463](https://github.com/vllm-project/vllm/pull/57463) 中 ROCm 支持内容。  
- 🚀 **ROCm 支持**：在 gfx950（MI355X）上新增 `nvfp4_ds_mla` 压缩 KV 缓存支持，对大型模型的高效内存利用至关重要。  
- 🌐 **多模态支持**：固定分辨率 LLaVA 编码器的完整 CUDA 图支持已落地 ([PR #58122](https://github.com/vllm-project/vllm/pull/58122))。  
- 💻 **Intel GPU**：Intel Arc B70（Battlemage）XPU TP=2 崩溃问题仍在报告中 ([Issue #41663](https://github.com/vllm-project/vllm/issues/41663))，目前尚无解决方案。

#### **4. 性能与优化**  
- 🔥 **GLM-5.3 P/D 在 GB200 上**：发现 NIXL 描述符开销（每秩传输约 11.2 万）导致性能低于 RDMA；相关优化方案正在制定中 ([Issue #55434](https://github.com/vllm-project/vllm/issues/55434))。  
- ⚡ **推测解码**：修复 FlashInfer 启动阶段崩溃问题，源于 MXFP8 内核中 M 四舍五入错误 ([PR #58165](https://github.com/vllm-project/vllm/pull/58165)) —— 解决 SM100/SM103 上的启动失败问题。  
- 📊 **预填充优化**：PR #54951 将长上下文索引器预填充行跨 TP 秩切片处理，减少冗余计算，提升可扩展性。  
- 🛠️ **KV 缓存效率**：PR #55092 确保仅在最后一个物理副本被驱逐后才触发 `BlockRemoved` 事件，提升缓存一致性。

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|------|-------------|------------|
| 严重 | [#57719](https://github.com/vllm-project/vllm/issues/57719) | `prompt_embeds` + 惩罚机制引发设备端断言（`scatter-gather index out of bounds`） | ❌ 未解决 |
| 高 | [#57149](https://github.com/vllm-project/vllm/issues/57149) | AMD MI355X 上 Qwen3.8-2.4T-A95B 存在性能瓶颈 | ⏳ 进行中 |
| 高 | [#53912](https://github.com/vllm-project/vllm/issues/53912) | 前缀缓存 + MTP 在混合 Mamba/GDN 模型（v0.28.0）上导致输出损坏 | ❌ 已关闭但未修复 |
| 中等 | [#41663](https://github.com/vllm-project/vllm/issues/41663) | Intel Arc Pro B70 出现 GP 故障 + BCS 引擎重置崩溃 | ❌ 无修复 |
| 中等 | [#56851](https://github.com/vllm-project/vllm/issues/56851) | `/inference/v1/generate` 接口缺失请求级文本/卸渲染输出 | ⏳ RFC 进行中 |

> 🔍 **注意**：多个问题影响 **推测解码**、**多标记预测（MTP）** 与 **KV 缓存管理**，尤其在混合精度和多模型部署场景下更为突出。

#### **6. 对应用开发者的启示**  
- 若你正在构建 **智能体系统** 或 **多模态应用**，请优先测试 **ViT CUDA 图** ([RFC #38175](https://github.com/vllm-project/vllm/issues/38175)) 和 **拆分式服务路径**（`/render` → `/generate` → `/derender`）。  
- 对于 **高吞吐部署**，在 ROCm 上启用 **压缩 KV 缓存（NVFP4）**，并监控 GB200/NIXL 上的描述符开销。  
- 在 [#57719](https://github.com/vllm-project/vllm/issues/57719) 修复前，请避免使用 `prompt_embeds` 搭配惩罚机制。  
- 仅当模型配置不变时方可使用 **持久化 KV 卸载**；否则建议依赖 PR #56331 的缓存身份修复。  
- 考虑采用 **零 JIT 编译** ([RFC #49349](https://github.com/vllm-project/vllm/issues/49349))，以在生产环境中实现更快的冷启动速度。

> 🔗 **推荐阅读**：  
> - [拆分式服务 RFC](https://github.com/vllm-project/vllm/issues/42729)  
> - [可编程 KV 缓存 RFC](https://github.com/vllm-project/vllm/issues/57103)  
> - [FlashInfer 启动修复](https://github.com/vllm-project/vllm/pull/58165)

---  
*本摘要基于 2026-09-29 的 GitHub 活动整理 | vLLM 项目 (https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **1. 今日亮点**  
SGLang 在分布式推理能力方面持续推进，关键进展包括 **预填充上下文并行（CP）** 的实现，以及针对智能体工作负载设计的 **分布式 KV 缓存系统新路线图**，有效应对日益突出的内存与传输瓶颈。项目同时加强了对 **长上下文稀疏服务（HiSparse）** 的投入，多个 PR 针对 DeepSeek-V4.1、GLM-5.3 和 Inkling 等高影响力模型的稳定性修复。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
但正在进行的变更包括：  
- **KV 缓存事件格式与 vLLM 对齐** (#39991)：旨在实现与共享可观测性工具的互操作性；可能需要下游消费者更新解析逻辑。[PR #39991](https://github.com/sgl-project/sglang/pull/39991)  
- **渲染器镜像发布现在由 CI 跟踪** (#40920)：待发布 SGLang 渲染器容器镜像。[Issue #40920](https://github.com/sgl-project/sglang/issues/40920)

---

### **3. 新模型与硬件支持**  
- **平头哥 PPU 支持**：已启动对 ZW810/ZW810E/ZW-M890P 卡件的一流集成路线图，支持在国产 AI 硬件上部署。[Issue #37519](https://github.com/sgl-project/sglang/issues/37519)  
- **AMD gfx950 (MI355X) 增强**：通过 Triton 稀疏注意力和 PTPC 投影，实现 GLM-5.3-Flash 对全 FP8/MXFP4 的支持。[PR #39273](https://github.com/sgl-project/sglang/pull/39273)，[PR #41615](https://github.com/sgl-project/sglang/pull/41615)  
- **NPU（华为 DSA）**：为 DSA 模型新增解码 CP 支持，并启用了预填充 CP 中的交错/之字形模式。[PR #37787](https://github.com/sgl-project/sglang/pull/37787)，[PR #40165](https://github.com/sgl-project/sglang/pull/40165)  
- **CPU 支持**：修复了 CPU 上 VLA 模型的 RoPE 内核。[PR #40139](https://github.com/sgl-project/sglang/pull/40139)

---

### **4. 性能与优化**  
- **预填充 CP 可扩展性**：推进 MHA/GQA 后端（FlashInfer/TRTLLM-MHA）中预填充上下文并行的启用。[Issue #21788](https://github.com/sgl-project/sglang/issues/21788)  
- **HiSparse 用于长上下文**：解码阶段通过仅在 HBM 中保留热工作集，显著降低 GPU 内存占用。[Issue #28874](https://github.com/sgl-project/sglang/issues/28874)  
- **分布式 KV 缓存系统**：新路线图聚焦于 PD 分离 + HiCache，专为需海量 KV 存储的智能体工作负载设计。[Issue #21846](https://github.com/sgl-project/sglang/issues/21846)  
- **KV 缓存分片**：现已支持 MTP 与 DSA 索引器，提升跨设备的内存分布均衡性。[PR #40929](https://github.com/sgl-project/sglang/pull/40929)，[PR #40925](https://github.com/sgl-project/sglang/pull/40925)

---

### **5. 稳定性与回归问题**  
**今日报告的关键问题：**  
1. **DeepSeek-V4.1-Flash + DSPARK**：`SparsePrefillWorkspace` 无限分配导致 TP 组 OOM 崩溃。[Issue #41076](https://github.com/sgl-project/sglang/issues/41076)  
2. **GLM-5.3 搭配 DFLASH 试探性解码**：输出出现严重重复及退化循环。[Issue #40843](https://github.com/sgl-project/sglang/issues/40843)  
3. **MiMo-V2 on SM100**：错误选择 FP8 MoE 运行器处理打包的 MXFP4 专家，存在数值不稳定的潜在风险。[Issue #41569](https://github.com/sgl-project/sglang/issues/41569)  
4. **Kimi-K3**：近期镜像（`c6ad1f26`）解码时反复出现 CUDA 启动失败。[Issue #32924](https://github.com/sgl-project/sglang/issues/32924)  

*注：上述问题尚未关联修复 PR —— 高优先级需尽快排查。*

---

### **6. 对应用开发者的启示**  
- **智能体类应用**：预计将迎来分布式 KV 缓存与 HiCache 优化的深度集成——这对有状态、长时间运行的智能体至关重要。请关注 [Issue #21846](https://github.com/sgl-project/sglang/issues/21846) 以获取未来部署动态。  
- **模型选型**：如今 GLM-5.3、Inkling 与 DeepSeek-V4.1 已可在 AMD/NPU 上启用全 FP8/MXFP4 支持——但鉴于当前存在的回归问题，请务必在试探性解码与长上下文场景下验证行为表现。  
- **生产安全**：使用 `/generate` 请求时需谨慎——未经验证的 `session_params`、`top_k` 或 `n` 值可能导致服务崩溃。建议在应用层强制输入校验。[Issue #41466](https://github.com/sgl-project/sglang/issues/41466)，[Issue #41482](https://github.com/sgl-project/sglang/issues/41482)  
- **硬件多样性**：平头哥 PPU 与 AMD gfx950 支持开辟了新的部署路径——特别适合主权或成本敏感环境。建议尽早使用特定模型配置进行测试。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 摘要 – 2026-09-29**

---

### **1. 今日亮点**  
最新开发重点聚焦于**多模态嵌入支持**，`/v1/embeddings` 接口现已接受结构化内容数组（视觉/音频/视频）输入，用于 Qwen3-VL-Embedding 模型。关键修复已合并，解决了 GCC 15 的 `stringop-overflow` 警告以及因缺少 `std::function` 导致的 Vulkan 编译问题。一项重大的架构调整正在进行中：推测解码、MTMD 与服务器组件正被统一至通用的 `batch_ext` API 之下，为跨后端更稳健的批量处理铺平道路。

---

### **2. 发布与破坏性变更**  
- **b11242**：修复 `decode_embd_batch` 中的 GCC 15 `stringop-overflow` 问题 ([#29607](https://github.com/ggml-org/llama.cpp/pull/29607))  
- **b11239**：解决因缺失 `std::function` 头文件导致的 Vulkan 编译错误 ([#29597](https://github.com/ggml-org/llama.cpp/pull/29597))  
- **b11238**：通过 `ggml_pad_ext` 引入左填充功能，适用于音频编码器（Parakeet、LFM2-Audio、Granite Speech、Gemma 4）([#29567](https://github.com/ggml-org/llama.cpp/pull/29567))  
- **b11236**：将推测解码、MTMD 与服务器逻辑迁移至 `batch_ext` — **API 变更进行中**；未来版本中预计弃用旧版 `llama_batch` ([#29385](https://github.com/ggml-org/llama.cpp/pull/29385))

> 🔗 *迁移提示*：使用自定义批处理或推测解码的开发者应提前准备采用 `llama_batch_ext`。旧版 API 可能即将被弃用。

---

### **3. 新模型与硬件支持**  
- **多模态嵌入支持**：`/v1/embeddings` 现在可接受 OpenAI 风格的包裹内容数组（`{"content": [...]}`），支持视觉/音频/视频输入，实现与 **Qwen3-VL-Embedding** 模型的完整多模态嵌入工作流 ([#29556](https://github.com/ggml-org/llama.cpp/pull/29556))。  
- **新增模型架构**：新增对 `GraniteSpeech5ForCTC`（Turbo CTC）的支持，这是一种非自回归的仅编码器模型，专用于语音转文本任务 ([#29446](https://github.com/ggml-org/llama.cpp/pull/29446))。  
- **硬件后端更新**：  
  - **OpenVINO**：标记未对齐的 batch-stride 视图为不支持；增加更严格的输入验证 ([#29603](https://github.com/ggml-org/llama.cpp/pull/29603))  
  - **Hexagon（Android）**：提升 perfetto trace 的事件粒度，优化短时事件追踪 ([#29614](https://github.com/ggml-org/llama.cpp/pull/29614))

---

### **4. 性能与优化**  
- **CPU Flash Attention**：在 x86 平台上启用分块 flash attention，支持非向量倍数头维度，扩展了 AVX2 对掩码 GEMM 操作的支持 ([#29423](https://github.com/ggml-org/llama.cpp/pull/29423))。  
- **Vulkan 后端**：内核调优使大批次（4096 令牌）在 RTX 3090 上性能提升约 **6.3%** ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476))。  
- **推测解码创新**：引入 `--cpu-mtp` 标志，可在显存受限系统（如 8–12GB 显卡）上将 MTP 草稿生成器卸载至 CPU，从循环状态快照中回收约 1GB 显存 ([#29620](https://github.com/ggml-org/llama.cpp/pull/29620))。  
- **CUDA/HIP**：为 CDNA2（gfx90a）添加 ROCm 矩阵核心（MFMA）路径，解锁 DeepSeek-V3.2/V4 索引中的深层硬件利用率 ([#29050](https://github.com/ggml-org/llama.cpp/pull/29050))。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 链接 |
|--------|------|-------|------|
| 关键 | 服务器在后续请求中强制重新处理完整提示（SWA/循环内存错误） | 已关闭 | [#21831](https://github.com/ggml-org/llama.cpp/issues/21831) |
| 高 | Draft-MTP 在 Vulkan（AMD Strix Point）上发出越界 token ID（n_vocab） | 未解决 | [#28158](https://github.com/ggml-org/llama.cpp/issues/28158) |
| 高 | DFlash2 在 `--split-mode tensor` 下因后端断言失败而崩溃 | 未解决 | [#27819](https://github.com/ggml-org/llama.cpp/issues/27819) |
| 高 | A770 上长时间运行 Vulkan 解码，在 ~7–8 小时后返回空的 EOS 响应 | 未解决 | [#29526](https://github.com/ggml-org/llama.cpp/issues/29526) |
| 中等 | `--n-cpu-moe` 低于阈值时，触发 MTP 草稿加载崩溃，提示“无效向量下标” | 未解决 | [#27717](https://github.com/ggml-org/llama.cpp/issues/27717) |
| 中等 | `mtmd` 图像块在草稿 KV 缓存中留下位置空洞 → HTTP 500 错误 | 未解决 | [#27408](https://github.com/ggml-org/llama.cpp/issues/27408) |

> ✅ *修复进展*：针对 GCC 15、Vulkan 与 OpenVINO 对齐的 PR 已合并。目前尚未解决 GPU 特定推测相关缺陷（如 #28158、#29526）。

---

### **6. 对应用开发者的意义**  
- **多模态应用**：现在可构建全栈智能体，通过单个 `/v1/embeddings` 调用同时处理图像、音频与文本，使用 Qwen3-VL-Embedding 模型。请确保客户端以 `{"content": [...]}` 格式包装输入。
- **资源受限推理**：使用 `--cpu-mtp` 可在低显存设备（如笔记本、边缘节点）上运行推测解码，无需牺牲吞吐量。
- **批处理与可扩展性**：立即开始向 `llama_batch_ext` 迁移——它正成为所有新功能（推测、MTMD、服务器）的基础。新代码中避免使用 `llama_batch`。
- **稳定性注意**：在 [#27408] 修复前，请避免对图像密集型提示使用 `--spec-type draft-dflash`。同时监控长期运行的 Vulkan 部署是否存在解码性能退化问题（#29526）。
- **未来兼容性**：关注即将到来的仅支持 `batch_ext` 的 API。转换 Gemma 4 等模型时，建议启用 `--add-bos` 进行测试。

> 📌 *实用技巧*：使用 [llama.app](https://llama.app) 测试新功能，并在部署前跨平台验证行为。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### **1. 今日亮点**  
Ollama 推出 **System One**，新增 `/v1/systemone` API 用于结构化决策，使模型能够返回选项、概率和评分——非常适合路由、分类和分诊工作流。这标志着 Ollama 生态系统向原生 AI 编排迈出了重要一步。与此同时，Windows 平台上的关键稳定性问题（RTX 5090，CUDA 内存访问）以及特定模型的缺陷（如 `gemma4` 的图像处理问题）仍为待解决的重点。

---

### **2. 发布与破坏性变更**  
- **v0.35.0**：今日发布，全面支持 **System One**，新增由 TypeSafe 的 Jev API 驱动的 `/v1/systemone` 端点。  
  - 返回结构化输出：`choice`、`noul`（条件概率）和 `score`。  
  - 专为非文本决策任务设计，如工单路由或内容评分。  
  - [PR #18606](https://github.com/ollama/ollama/pull/18606) | [Docs PR #18702](https://github.com/ollama/ollama/pull/18702)

> ⚠️ **迁移提示**：兼容 OpenAI 的 `/v1/chat/completions` 现在若未指定，将默认使用 `top_p: 1.0`，静默覆盖 Modelfile 中的设置。  
> - [Issue #18690](https://github.com/ollama/ollama/issues/18690) – 期望行为应与 Modelfile 参数保持一致。

---

### **3. 新模型与硬件支持**  
- **K2 Horizon 模型**（`k2-horizon` 架构）：请求支持 MBZUAI IFM 推出的新一代 0.9B–36B MoE 系列。  
  - 官方 GGUF 版本已上线 Hugging Face：[K2-Horizon-3.7B-GGUF](https://huggingface.co/IFM/K2-Horizon-3.7B-GGUF)  
  - [Issue #18698](https://github.com/ollama/ollama/issues/18698)
- **MLX 后端**：通过 [PR #18701](https://github.com/ollama/ollama/pull/18701) 增加对 System One 的支持。  
- **GraniteForCausalLM**：实验性支持 IBM 的 Granite 4.1/4.2 模型在 MLX 上运行。  
  - [PR #17972](https://github.com/ollama/ollama/pull/17972)

> ✅ **硬件**：报告称在 Windows 上使用 RTX 5090 进行提示评估时出现 CUDA 非法内存访问问题 —— 当前尚未解决。  
> - [Issue #18642](https://github.com/ollama/ollama/issues/18642)

---

### **4. 性能与优化**  
- **Flash Attention**：在支持且安全的情况下自动启用（无 CPU 回退）。  
  - 适用于文本、视觉及嵌入模型。  
  - [PR #13448](https://github.com/ollama/ollama/pull/13448)
- **内存估算**：MLX 运行器现在报告 *实际* VRAM 使用量（含 KV 缓存和计算图），不再仅依赖静态权重估算。  
  - 提升容器化环境中的可见性。  
  - [PR #14382](https://github.com/ollama/ollama/pull/14382)
- **缓存复用**：MTP 模型现已可在非思考轮次间复用缓存，提升多轮推理吞吐量。  
  - [PR #17496](https://github.com/ollama/ollama/pull/17496)

> 📉 **性能回归**：`n_threads` 忽略 cgroup CPU 配额和 cpuset 限制，在 CPU 受限容器中导致约 45 倍吞吐量崩溃。  
> - [Issue #17916](https://github.com/ollama/ollama/issues/17916)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 影响 | 状态 |
|---------|------|--------|--------|
| 🔴 **严重** | RTX 5090 上的 CUDA 非法内存访问（Cohere MoE） | 导致 `llama-server` 崩溃（退出状态 `0xc0000409`） | [Issue #18642](https://github.com/ollama/ollama/issues/18642) |
| 🔴 **严重** | Stripe 计费循环（支持响应迟缓） | 阻碍云用户升级或降级 | [Issue #18683](https://github.com/ollama/ollama/issues/18683) |
| 🟡 **高** | `gemma4` 在 Windows 上无法处理图像 | 尽管已附加图像输入，但被忽略 | [Issue #16532](https://github.com/ollama/ollama/issues/16532) |
| 🟡 **高** | `OLLAMA_GPU_OVERHEAD` 被 `llama-server` 忽略 | 未为层放置预留 VRAM（`--fit`） | [Issue #18679](https://github.com/ollama/ollama/issues/18679) |
| 🟡 **高** | 聊天历史截断移除了最新用户消息 | 在工具循环中触发 `500: no user query found` 错误 | [Issue #17778](https://github.com/ollama/ollama/issues/17778) |

> 💡 **修复进展中**：多个 PR 正在修复聊天历史截断逻辑 ([#17894](https://github.com/ollama/ollama/pull/17894), [#18697](https://github.com/ollama/ollama/pull/18697))。

---

### **6. 对应用开发者的意义**  
- **构建具备决策感知能力的智能体**：使用 `/v1/systemone` 可创建轻量、高速的代理，实现路由、过滤或评分，无需承担文本生成开销。特别适合编排 LLM 流水线。
- **避免静默参数覆盖**：在请求中显式设置 `top_p` —— 默认值为 `1.0` 可能导致自定义 Modelfile 下输出质量下降。
- **容器化需谨慎**：在 CPU 有限环境中，手动控制 `n_threads`，避免依赖 cgroup 限制 —— 当前行为会导致严重性能下降。
- **监控 GPU 内存**：`OLLAMA_GPU_OVERHEAD` 无效；请使用 `--fit` 或手动分层放置以防止 OOM 崩溃。
- **规划图像与视觉工作负载**：确保 `gemma4` 等模型在 Windows 上经过充分测试；已知图像处理回归问题仍存在。

> ✅ **最佳实践**：在智能体后端使用新的 `System One` API，获取确定性、结构化的输出 —— 尤其适用于与 AgentBridge 等工具集成 ([Issue #18692](https://github.com/ollama/ollama/issues/18692))。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 简报 — 2026-09-29**

---

#### **1. 今日亮点**
LiteLLM 生态系统持续演进，成本追踪、安全性和路由智能方面取得显著提升。关键进展包括推出**模型排行榜 UI**，用于直观查看实际模型使用模式，改进**守卫器超时强制机制**，并深化与 **Oso** 的集成以实现细粒度的模型授权。此外，新增对 **Bedrock Mantle 定价** 和 **DashScope 实时 WebSocket** 的支持，使成本归因更准确，模型覆盖范围更广。

---

#### **2. 发布与破坏性变更**
- 今日发布 **v1.104.0-rc.1** 与 **v1.103.0**，通过 [cosign](https://docs.sigstore.dev/cosign/overview/) 实现 Docker 镜像签名增强，使用在 [`commit 0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入的一致密钥。
  🔗 [验证发布签名](https://github.com/BerriAI/litellm#verify-docker-image-signature)

> *注：本次发布未报告任何破坏性 API 变更。重点仍放在稳定性与安全加固上。*

---

#### **3. 新模型与硬件支持**
- ✅ **Bedrock Mantle** 现已全面支持，为 `anthropic.claude-opus-5.5` 与 `sonnet-5.5`（含 GovCloud 变体）添加专用成本映射条目。
  🔗 [PR #43647](https://github.com/BerriAI/litellm/pull/43647)
- ✅ 增加 **DashScope 实时 WebSocket** 支持，可通过 OpenAI 兼容的 `/v1/live/sessions` 接口实现 DashScope 模型的实时推理。
  🔗 [PR #40579](https://github.com/BerriAI/litellm/pull/40579)
- ✅ 新增 **llmman** 作为兼容 OpenAI 的新提供商（本地推理服务，运行于端口 17434）。
  🔗 [PR #38925](https://github.com/BerriAI/litellm/pull/38925)

> *今日未新增硬件后端（CUDA/ROCm/Metal/CPU）或量化格式支持。*

---

#### **4. 性能与优化**
- 🚀 **按秒计费** 现已正确计算，通过 `cost_per_second` 字段修复了此前输入/输出速率错误叠加导致的重复计费问题。
  🔗 [PR #43614](https://github.com/BerriAI/litellm/pull/43614)
- ⏱️ **守卫器超时** 现在基于时钟时间逐请求强制执行，防止阻塞整个流水线的卡死守卫器。
  🔗 [PR #43648](https://github.com/BerriAI/litellm/pull/43648)
- 📦 引入 **批处理文件限制**：`max_batch_file_records`、`max_batch_files_per_day` 与 `max_batch_file_size`，防止滥用与资源耗尽。
  🔗 [PR #43632](https://github.com/BerriAI/litellm/pull/43632)

> *这些优化提升了系统在高负载下的韧性，并降低运维风险。*

---

#### **5. 稳定性与回归问题**
| 严重性 | 问题 | 状态 | 修复 PR | 链接 |
|--------|------|--------|--------|------|
| 🔴 高 | v1.93.0 中因意外的 `ssl_check_hostname` 参数导致 Redis 缓存失败 | 开放 | N/A | [#34614](https://github.com/BerriAI/litellm/issues/34614) |
| 🔴 高 | `sanitize_input_schema_for_anthropic` 会丢弃根级 `anyOf`/$ref → 导致 `properties` 为空 | 开放 | N/A | [#43157](https://github.com/BerriAI/litellm/issues/43157) |
| 🔴 高 | `gemini_chat` 工具将 `""` 参数转换为 `{"type": "object"}` 而非 `{}` | 开放 | N/A | [#43156](https://github.com/BerriAI/litellm/issues/43156) |
| 🟡 中 | `max_iterations` 与 `max_budget_per_session` 在同一 trace 的代理间共享 | 开放 | N/A | [#43190](https://github.com/BerriAI/litellm/issues/43190) |
| 🟡 中 | Azure GPT-4.1 同时拒绝 `max_tokens` 与 `max_completion_tokens` | 开放 | N/A | [#31614](https://github.com/BerriAI/litellm/issues/31614) |

> *与模式转换和 Redis 配置相关的严重回归问题仍处于开放状态。请优先修复 Anthropic/Gemini 工具模式处理及 Redis 兼容性问题。*

---

#### **6. 对应用开发者的意义**
- ✅ **现在可构建更安全、可观测的智能体系统**：借助 Oso 集成（`PR #42416`）与 Airia 守卫器支持（`PR #43657`），可在模型层面强制执行外部策略决策。
- ✅ **成本透明度正在提升**：新推出的 **模型排行榜 UI**（`PR #43649`）让管理员可实时了解哪些模型使用最频繁——这对预算控制与性能优化至关重要。
- ⚠️ **避免模式破坏行为**：使用 Anthropic 或 Gemini 时，若涉及联合类型（如 `Union[A, B]`）工具，请谨慎操作——当前 `sanitize_input_schema` 逻辑可能删除关键类型信息。
- ⚠️ **批处理上传需格外小心**：在高吞吐环境下，务必使用 `max_batch_file_records` 与 `max_batch_file_size` 来防范拒绝服务风险。

> 🔧 **可操作建议**：若使用 Azure GPT-4.1 或 Bedrock Mantle，确保配置中仅保留 `max_tokens` 或 `max_completion_tokens` 之一。对于 Redis 用户，建议升级至 v1.93.0 以上版本，或手动修复 `ssl_check_hostname` 处理逻辑。

---

*简报生成时间：2026-09-29 | 来源：[GitHub – BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-29**

---

### **1. 今日亮点**  
Unsloth v0.1.900-beta 引入了 **Laya 决策模型** 和统一的 **技能库**，支持本地部署开源推理代理（如 Jev，即 Laya）。该版本在苹果硅芯片上实现了图像与视频生成速度提升约 4.5 倍，同时持续优化多 GPU 工作流、模型导出及跨平台稳定性。

---

### **2. 发布与破坏性变更**  
- **v0.1.900-beta**：正式发布，新增对 Laya 决策引擎的支持、技能编辑器、文档查看器以及增强的媒体处理能力。  
  🔗 [GitHub Release v0.1.900-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.900-beta)  
- **注意**：未报告任何破坏性 API 变更；现有微调模型和推理管道保持向后兼容。

---

### **3. 新模型与硬件支持**  
- **Laya 决策模型**：通过 `unsloth start opencode` 实现对本地运行和部署 Laya 风格推理代理的一流支持。  
  🔗 [Issue #8546](https://github.com/unslothai/unsloth/issues/8546)  
- **Idefics3 架构**：功能请求 (#4079) 旨在支持对 IBM Granite Docling VLM（258M 参数）的优化微调，待原生支持实现。  
- **AMD ROCm + NVIDIA 混合系统**：多个 PR (#12246, #12247, #12248) 解决双 GPU 工作流问题——允许分别使用 AMD（ROCm）和 NVIDIA（CUDA）显卡进行训练、对话和图像生成。  
  🔗 [PR #12246](https://github.com/unslothai/unsloth/pull/12246), [PR #12248](https://github.com/unslothai/unsloth/pull/12248)  
- **MLX on Apple Silicon**：MLX 后端现已支持 Laya 检查点的 FP16 精度。  
  🔗 [PR #12256](https://github.com/unslothai/unsloth/pull/12256)

---

### **4. 性能与优化**  
- **图像/视频生成**：得益于改进的内核调度与卸载规划，在苹果硅芯片上吞吐量最高提升 **~4.5×**。  
  🔗 [PR #12043](https://github.com/unslothai/unsloth/pull/12043)  
- **决策 API 推理**：通过仅标记头结构与 CUDA 图优化，无需 `torch.compile` 即可实现高效推理。  
  🔗 [PR #12224](https://github.com/unslothai/unsloth/pull/12224)  
- **内存规划**：自动卸载规划器现在可动态测量激活值，避免高分辨率任务中显存利用率不足的问题。  
  🔗 [PR #12043](https://github.com/unslothai/unsloth/pull/12043)  
- **GGUF 模型效率**：修复图像聊天导致其他并发会话阻塞的问题。  
  🔗 [PR #12236](https://github.com/unslothai/unsloth/pull/12236)

---

### **5. 稳定性与回归问题**  
- **严重**：工具调用可能在超过 `max_tool_call_duration` 后无限挂起（例如终端命令失败但无声无息）。  
  🔗 [Issue #12048](https://github.com/unslothai/unsloth/issues/12048) | ✅ 修复中：[PR #12234](https://github.com/unslothai/unsloth/pull/12234)  
- **高严重性**：Base64 图像解析错误会导致完整上下文重新处理，尽管图像显示正常。  
  🔗 [Issue #12058](https://github.com/unslothai/unsloth/issues/12058) | ✅ 修复中：[PR #12236](https://github.com/unslothai/unsloth/pull/12236)  
- **中等**：Unsloth Desktop 无法检测 Steam Deck 上的 GPU（仅限 CPU 模式）。  
  🔗 [Issue #5091](https://github.com/unslothai/unsloth/issues/5091)  
- **误报**：Bitdefender 与 Windows Defender 将安装程序可执行文件标记为威胁。  
  🔗 [Issue #12140](https://github.com/unslothai/unsloth/issues/12140), [Issue #9076](https://github.com/unslothai/unsloth/issues/9076)

---

### **6. 对应用开发者的意义**  
- **构建代理工作流**：利用新的 **Laya 决策 API** 与 **技能编辑器**，创建模块化、可复用的代理组件并支持本地推理。  
  🔗 [PR #12232](https://github.com/unslothai/unsloth/pull/12232)  
- **部署多 GPU 系统**：通过将特定任务（训练、对话、视觉）分配给专用 GPU，充分利用 NVIDIA+AMD 混合架构。  
  🔗 [PR #12248](https://github.com/unslothai/unsloth/pull/12248)  
- **导出与共享配置**：即将支持将微调后的模型参数导出为 Ollama 兼容的 Modelfile。  
  🔗 [Issue #4660](https://github.com/unslothai/unsloth/issues/4660)  
- **避免崩溃**：监控工具调用超时与图像 Base64 解析问题——使用 `max_tool_call_duration` 并确保编码处理正确。  
- **跨平台可移植性**：可通过导出 `.unsloth` 可携带归档包，实现模型在不同设备间的迁移。  
  🔗 [Issue #8798](https://github.com/unslothai/unsloth/issues/8798)

> 💡 **实用技巧**：对于 AMD 用户，请始终确认 ROCm 已启用（`rocm-smi`），在混合硬件环境下避免设置 `CUDA_VISIBLE_DEVICES=""`。

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*