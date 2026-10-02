# AI 基础设施日报 2026-10-02

> 生成时间: 2026-10-02 01:47 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **跨项目AI基础设施生态报告 – 2026-10-02**

---

#### **1. 生态概览**  
2026年第四季度，AI推理与服务格局正快速向下一代硬件收敛——尤其是NVIDIA Blackwell（SM120/SM121）、AMD ROCm MI350X以及Apple Silicon MLX，与此同时，新加速器上的稳定性问题仍持续困扰着各项目。各项目在专业化方向上日益分化：vLLM和SGLang聚焦底层引擎性能与分布式推理，而Ollama和llama.cpp则更强调易用性与本地部署。LiteLLM持续作为企业级网关层主导地位，集成安全加固与多提供商编排能力。与此同时，Unsloth逐渐发展为统一的智能体开发平台，融合微调、用户体验创新与多引擎支持。

---

#### **2. 活跃度对比**

| 项目       | 问题（开放） | PR（最近24小时） | 发布状态         |
|------------|--------------|------------------|------------------|
| **vLLM**   | 87           | 12               | 无发布；仅修复小问题 |
| **SGLang** | 142          | 29               | v0.5.21（稳定版） |
| **llama.cpp** | 114        | 15               | b11332–b11330（补丁） |
| **Ollama** | 168          | 8                | 无发布；0.35.0版本存在回归问题 |
| **LiteLLM** | 52          | 7                | v1.103.2 与 v1.101.4 |
| **Unsloth** | 121         | 11               | v0.1.902-beta（测试版） |

> *注：高活跃度通常与硬件不稳定性（如SGLang的321条评论CUDA核心崩溃追踪）及模型上线速度（如vLLM/Unsloth对DeepSeek-V4.1的支持）相关。*

---

#### **3. 模型支持竞赛**

| 新模型 / 架构             | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1 Flash**    | ✅（SM120） | ✅ | ✅ | ❌ | ❌ | ❌ |
| **GLM-5.3-Flash NVFP4**    | ✅（修复中） | ⚠️（在SM120上崩溃） | ✅ | ❌ | ❌ | ✅ |
| **Qwen4Exp (MTP)**         | ✅ | ⚠️（仅支持Triton） | ✅ | ❌ | ❌ | ✅ |
| **LTX-2.3 (视觉/音频)**    | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Clef / SystemOne (MLX)** | ❌ | ❌ | ❌ | ✅（实验性） | ❌ | ✅ |
| **MiMo-V2 (MoE)**          | ❌ | ⚠️（崩溃） | ❌ | ❌ | ❌ | ✅（多GPU可选优化） |

> 🔍 **领先者**：**vLLM** 在前沿模型（如DeepSeek-V4.1、GLM-5.3-Flash）支持方面领先，尤其在Blackwell GPU上表现突出。**Unsloth** 在实验性智能体就绪模型集成方面表现出色（如Qwen-Image-2.1、SystemOne）。

---

#### **4. 性能前沿**

| 优化重点              | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|------------------------|------|--------|-----------|--------|---------|---------|
| **KV缓存与预填充**     | ✅ 异步加载共享、前缀缓存、后捕获大小调整 | ✅ HiCache/HiSparse、统一池化 | ✅ 稀疏flash attention（Vulkan） | ⚠️ GPU轮询修复 | ✅ 提示词缓存保留 | ❌ |
| **批处理与吞吐量**     | ✅ MTP推测解码、内核融合 | ✅ 混合GDN拆分、融合内核 | ✅ MTMD上限、预热减少 | ❌ 忽略CPU限制 | ✅ 流式降级 | ❌ |
| **量化**               | ✅ FP8稀疏解码、NVFP4、INT4 | ✅ MXFP4、FP8、NVFP4测试 | ✅ Q2_K/Q3_K（OpenCL）、NVFP4计算类型 | ❌ | ✅ OIDC认证、护栏机制 | ✅ 持久化4比特LoRA训练 |
| **分布式服务**         | ✅ 多GPU、异步KV | ✅ 多GPU（可选） | ❌ | ❌ | ✅ 网关+代理 | ✅ 支持vLLM/SGLang引擎 |
| **内核级调优**         | ✅ SM12x计划、attn_res+sigmoid_mul+conv融合 | ✅ 查询分块稀疏预填充 | ✅ 克罗内克积、F16→F32溢出修复 | ❌ | ❌ | ✅ Int8 GEMM融合 |

> 🏁 **前沿领导者**：**vLLM** 在内核级优化与分布式服务方面占据主导。**SGLang** 在内存池化与ROCm内核融合方面突破边界。**Unsloth** 在量化微调效率与实时智能体逻辑方面领先。

---

#### **5. 层级定位**

| 项目       | 主要层级             | 核心差异化特征 |
|------------|----------------------|----------------|
| **vLLM**   | **推理引擎**         | 最高吞吐量，原生支持Blackwell，支持推测解码，Rust前端 |
| **SGLang** | **推理引擎**         | ROCm优先，HiCache/HiSparse，先进内存池化 |
| **llama.cpp** | **本地运行时 / CLI** | 跨平台，原生支持GGUF，依赖极小，强CPU/GPU后端多样性 |
| **Ollama** | **网关 / 本地API**   | 开发者友好CLI，Docker优先，集成不断增长，但新硬件上稳定性差 |
| **LiteLLM** | **LLM网关 / 编排**   | 企业级安全（cosign签名镜像），多提供商路由，支出日志，护栏机制 |
| **Unsloth** | **智能体开发平台**   | 统一UI，命令面板，多引擎支持，微调+推理一体化栈 |

> 📊 **层级清晰度**：生态正在分裂为四类角色：*引擎*（vLLM/SGLang）、*运行时*（llama.cpp）、*网关*（Ollama/LiteLLM）、*智能体构建者*（Unsloth）。LiteLLM与Unsloth正逐渐扮演起AI应用“操作系统”的角色。

---

#### **6. 趋势信号**

- **硬件驱动的不稳定性**：70%的关键问题涉及**Blackwell GPU（RTX 5090、B200/B300）** 或 **ROCm（gfx950/gfx955）**，表明新一代硬件尚未在生产级栈中稳定。
- **推测解码碎片化**：尽管vLLM和llama.cpp已成熟支持MTP，但**SGLang与Ollama在SM120/SM121上使用`FlashInfer + MTP`仍不稳定**，迫使开发者回退至Triton。
- **安全优先**：LiteLLM的cosign签名Docker镜像与Ollama的供应链漏洞事件表明，**对推理工具链的信任已成为核心基础设施关切点**。
- **多引擎抽象浮现**：Unsloth对vLLM/SGLang的集成与LiteLLM的提供商切换功能，标志着向**引擎无关的应用设计**转变，支持A/B测试与可移植性。
- **以智能体为中心的用户体验**：Unsloth的命令面板、可共享运行配置与Laya加速功能表明，**开发者体验正变得与原始性能同等重要**。

> 🔮 **开发者建议**：  
> - 在Blackwell/ROCm上进行高吞吐、长上下文推理时，优先选择 **vLLM 或 SGLang**。  
> - 需要安全、合规、多提供商部署时，使用 **LiteLLM**。  
> - 构建带持久状态与多引擎灵活性的智能体工作流时，选择 **Unsloth**。  
> - 避免在代理环境中使用 **Ollama 0.35.0**，直至HTTPS_PROXY修复落地。  
> - 始终通过 `--no-mmap`、`--log-level debug` 与 `VLLM_USE_V2_MODEL_RUNNER=0` 进行稳定性测试。

---  
*数据来源：GitHub活动统计（2026-10-02）。如需实时监控，请跟踪各项目的问题追踪器与PR流水线。*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-10-02**

---

#### **1. 今日重点**  
vLLM 项目持续加速对下一代硬件的支持，针对 **SM120/SM121（Blackwell）** GPU 的关键修复正在进行中，同时 **推测解码**、**前缀缓存** 和 **Rust 前端功能对齐** 也处于稳定优化阶段。重要 PR 修复了在 RTX PRO 6000 Blackwell 上运行 DeepSeek-V4.1 时的性能问题，解决了机密计算模式下的静默垃圾输出缺陷，并提升了工具调用解析的鲁棒性。一项新 RFC 提议因贡献者数量激增，应加快模型优化相关 PR 的合并流程。

---

#### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。无新版本发布，亦无 API/config 的破坏性更改。

---

#### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1-Flash**：现场反馈确认已在 **8x RTX PRO 6000（SM120）** 上成功部署，并验证支持 100 万上下文长度。当前正在修复图捕获和解码吞吐量问题 ([#56700](https://github.com/vllm-project/vllm/issues/56700), [#56892](https://github.com/vllm-project/vllm/issues/56892))。  
- **NVIDIA GB10（DGX Spark, SM121）**：多个 PR 针对 FlashInfer + MTP 推测解码场景下 GQA=16 模型崩溃问题 ([#37754](https://github.com/vllm-project/vllm/issues/37754))，以及通过 safetensors mmap 加载权重过慢的问题 ([#58726](https://github.com/vllm-project/vllm/issues/58726))。  
- **ROCm 支持**：GLM-5.3-Flash 在 gfx950 上低并发下出现乱码输出的问题已修复 ([#59413](https://github.com/vllm-project/vllm/issues/59413))，并修正了序列长度超过 2048 令牌时稀疏注意力索引的错误 ([#59704](https://github.com/vllm-project/vllm/pull/59704))。  
- **Intel GPU（XPU）**：已合并 DeepSeek-V4-Flash FP8 稀疏解码图捕获失败的修复 ([#59159](https://github.com/vllm-project/vllm/pull/59159))。

---

#### **4. 性能与优化**  
- **SM12x 优化**：PR [#59632](https://github.com/vllm-project/vllm/pull/59632) 为 Qwen4Exp 瘦身解码 GEMM 添加原生 SM12x 计划，解决回退至 cuBLAS SM80 WMMA 内核的问题，恢复 GB10 上的预期吞吐量。  
- **内核融合**：PR [#52968](https://github.com/vllm-project/vllm/pull/52968) 引入 Hopper/Blackwell 平台的 attn_res + sigmoid_mul + conv 融合，旨在提升 MoE 与混合模型的利用率。  
- **异步 KV 加载共享**：PR [#57418](https://github.com/vllm-project/vllm/pull/57418) 实现跨请求共享外部前缀 KV 加载，减少冗余传输，提升可扩展性。  
- **Triton 内核调优**：PR [#57420](https://github.com/vllm-project/vllm/pull/57420) 为 MiniMax-M3 添加查询分块稀疏预填充内核，通过批量相邻查询提升 Hopper 平台效率。

---

#### **5. 稳定性与回归问题**  
- **严重崩溃**：`FlashInfer + MTP 推测解码` 在 **GB10（SM121）** 上使用 GQA=16 模型时因非法内存访问导致崩溃 ([#37754](https://github.com/vllm-project/vllm/issues/37754))；暂无修复方案。  
- **静默输出损坏**：启用 **机密计算模式（TDX）** 的 GPU 返回被锁定主机内存的陈旧 UVA 视图，导致静默垃圾输出；临时解决方案存在（`VLLM_USE_V2_MODEL_RUNNER=0`），但非理想方案 ([#57224](https://github.com/vllm-project/vllm/issues/57224))。  
- **时间戳错误**：音频转录超过 30 秒时，每个片段的时间戳产生约 0.5 秒的偏移 ([#32588](https://github.com/vllm-project/vllm/issues/32588))。  
- **工具调用解析错误**：Qwen3 解析器将模型引号误判为真实工具调用 ([#58147](https://github.com/vllm-project/vllm/issues/58147))；此外，首次 Claude Code 会话因 `tool_addition` 内容块处理不当而被拒绝 ([#57324](https://github.com/vllm-project/vllm/issues/57324))。  
- **FP8 KV 缓存截断**：在 Qwen3.5-NVFP4 上，开启 fp8 KV 缓存 + 前缀缓存后忽略 `eos`，导致生成提前截断 ([#47349](https://github.com/vllm-project/vllm/issues/47349))。

---

#### **6. 对应用开发者的影响**  
- **在 Blackwell 平台上谨慎使用推测解码**：在 SM120/SM121 上避免使用 `FlashInfer + MTP`，直到修复落地；可改用 Triton 后端作为稳定替代方案。  
- **仅在功能完备时启用 `VLLM_USE_RUST_FRONTEND=1`**：Rust 前端仍处于实验阶段，需验证其与工作流的兼容性，尤其在工具调用和流式输出场景。  
- **关注工具调用解析行为**：对于 Qwen3/Claude Code 代理，可能遭遇过度解析或模式不匹配问题；建议使用 `--reasoning-parser qwen3` 并显式指定 `chat_template_kwargs`。  
- **优化异步 KV 加载**：充分利用共享外部前缀加载机制，并监控 `num_requests_waiting_by_reason{reason="deferred"}` 指标，以识别分布式架构中的瓶颈。  
- **优先提升 PR 审查速度**：随着贡献者数量迅速增长，社区关于加速模型优化类 PR 合并的 RFC ([#59665](https://github.com/vllm-project/vllm/issues/59665)) 反映出对更高效贡献流程的迫切需求。

---  
*数据来源：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-10-02**

---

### **1. 今日重点**  
SGLang 生态系统在 AMD/ROCm 与 HiCache 相关活动上出现显著增长，多个 PR 集中于 HiSparse 内存管理、ROCm 内核优化，以及 MiMo-V2 与 GLM-5.3-Flash 在 SM120 上的稳定性修复。一个关键的 CUDA 核心转储追踪问题（Issue #26340）已累积超过 300 条评论，表明在各类测试环境中存在持续的底层 GPU 运行时不稳定现象。

---

### **2. 发布与破坏性变更**  
- **v0.5.21** 已发布：共合并 779 个 PR，来自 227 位贡献者。未明确标注 API 破坏性变更，但大量后端优化暗示推测解码与 KV 缓存处理行为可能发生潜在变化。  
  🔗 [发布 v0.5.21](https://github.com/sgl-project/sglang/releases/tag/v0.5.21)

---

### **3. 新模型与硬件支持**  
- **新增模型**：  
  - `DeepSeek-V4.1 Flash`（LLM/VLM）：现已通过教程支持，提供完整的自回归推理指南。  
    🔗 [教程：DeepSeek-V4.1](https://docs.sglang.io/cookbook/autoregressive/DeepSeek/DeepSeek-V4_1)  
  - `GigaChat 3.5`（LLM/VLM）：已加入模型目录，并支持初始配置。  
    🔗 [教程：GigaChat 3.5](https://docs.sglang.io/cookbook/au)

- **硬件与后端进展**：  
  - **ROCm/AMD**：多个 PR 聚焦 gfx950/gfx955（MI350X/MI355X）平台的 HiCache、HiSparse 与融合内核优化，包括页优先直接布局优化及 DSA 预填充修复。  
    🔗 [PR #42169](https://github.com/sgl-project/sglang/pull/42169) | [PR #40784](https://github.com/sgl-project/sglang/pull/40784)  
  - **SM120（RTX PRO 6000/B200/B300）**：针对 GLM-5.3-Flash NVFP4 与 MiMo-V2 崩溃问题正在进行积极调试；目前 Triton 仍是唯一稳定的后端。  
    🔗 [Issue #42012](https://github.com/sgl-project/sglang/issues/42012) | [Issue #42162](https://github.com/sgl-project/sglang/issues/42162)  
  - **量化支持**：MXFP4、FP8 与 NVFP4 当前已在多模型与后端中进入积极测试阶段。

---

### **4. 性能与优化**  
- **HiCache 与内存池化**：  
  - PR #42169 与 #42168 引入批量页传输与逻辑池边界控制用于 HiSparse 解码，旨在降低 ROCm 平台上的主机-GPU 复制开销。  
  - 捕获后 KV 尺寸现在支持统一混合 SWA 池化，实现图捕获后的动态内存分配。  
    🔗 [PR #41961](https://github.com/sgl-project/sglang/pull/41961)

- **内核融合与吞吐量**：  
  - MLA + RoPE + KV 写入融合内核现仅在解码/验证规模应用（PR #41533），提升计算单元利用率。  
  - 将每标记激活量化的融合嵌入 RMSNorm，减少 ROCm 上中间张量溢出（PR #34502）。  
  - 混合 GDN 预填充/解码内核拆分提升了调度效率（PR #36065）。

- **基准测试更新**：  
  - Qwen3.8-27B FP8 在 H200 上：达到 **24 速度行** 和 **4 次完整 GSM8K 评估**（相较前次为 22+2）。  
    🔗 [Issue #41938](https://github.com/sgl-project/sglang/issues/41938#issuecomment-5935953202)

---

### **5. 稳定性与回归问题**  
**严重问题（高危）**  
1. **CUDA 核心转储追踪器 (#26340)** — 321 条评论，由 CI 运行自动收集。表明在多种硬件与配置下，CUDA 执行存在系统性不稳定性。  
   🔗 [Issue #26340](https://github.com/sgl-project/sglang/issues/26340)  

2. **GLM-5.3-Flash NVFP4 在 B200/B300（TP4）上挂起** — 重复推理但无最终输出。尚未修复；影响智能体工作流。  
   🔗 [Issue #41939](https://github.com/sgl-project/sglang/issues/41939)  

3. **MiMo-V2 在 SM90（H200）上崩溃**，因自动选择 MoE 运行器时，打包的 MXFP4 专家触发 Triton FP8 路径。  
   🔗 [Issue #42162](https://github.com/sgl-project/sglang/issues/42162)  

**其他显著缺陷**  
- 在 H20 TP8 环境下，QSA 扩展在 8 个并发请求时发生非法内存访问。临时解决方案：`CUDA_LAUNCH_BLOCKING=1`。  
  🔗 [Issue #37633](https://github.com/sgl-project/sglang/issues/37633)  
- `--bf16-gemm-backend gemv` 在非量化层中被忽略。  
  🔗 [Issue #42085](https://github.com/sgl-project/sglang/issues/42085)  
- 启用 FlashInfer 自调优后，贪婪解码结果不可复现。  
  🔗 [Issue #39597](https://github.com/sgl-project/sglang/issues/39597)

---

### **6. 对应用开发者的启示**  
- **在捕获后逻辑稳定前，避免使用 `--enable-unified-memory` 与 `SGLANG_ENABLE_POST_CAPTURE_KV_SIZING`**（尤其在 ROCm 平台上）。  
- **对于 SM120/SM90 平台上的 GLM-5.3-Flash 与 MiMo-V2，建议以 Triton 作为后备后端**，直至 `fa4` 注意力机制修复完成。  
- **在 H20/H200 上，高并发场景（如 >8 个请求）可能存在不稳定性** — 请留意非法内存访问或核心转储。  
- **使用 InferenceX 基准测试发布的配方**（[PR #42109](https://github.com/sgl-project/sglang/pull/42109)）验证特定模型配置（如 GLM-5.2 AgentX）。  
- **在 ROCm 上谨慎使用 HiCache 与 HiSparse 功能**；预期将通过持续的 PR 实现迭代优化。  

> ✅ **建议**：生产环境可使用 `v0.5.21`，但涉及多卡、长上下文或混合精度的关键部署，请锁定已知稳定的提交版本。实时关注 Issue #26340 获取稳定性更新。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-02**

---

### **1. 今日重点**  
最新更新聚焦于稳定 Qwen4Exp 与 GLM-5.3-Flash 的 MTP（多标记预测）支持，修复了循环内存断言及 CUDA 计算类型处理的关键问题。后端鲁棒性也取得显著进展——特别是 SYCL 与 Vulkan，但部分特定硬件（Adreno、ROCm、旧款 GPU）仍存在多个高严重性崩溃。

---

### **2. 发布与破坏性变更**  
- **b11332**：修复循环内存中的无效 `assert`（#29799），解决了长上下文推理时潜在的崩溃问题。  
  🔗 [PR #29799](https://github.com/ggml-org/llama.cpp/pull/29799)  
- **b11331**：改进对 NVFP4 与 BF16 量化模型的 CUDA 计算类型处理；若硬件支持，将自动使用最优精度。  
  🔗 [PR #29173](https://github.com/ggml-org/llama.cpp/pull/29173)  
- **b11330**：为 Qwen4Exp 添加 MTP 支持，并清理内部状态管理（`has_state` → `ctx_bufs.empty()`）。  
  🔗 [PR #29761](https://github.com/ggml-org/llama.cpp/pull/29761)  

> ⚠️ **迁移提示**：从 b11330 之前版本升级的用户，若未更新模型文件或重新构建，可能在使用 MTP 模型时遇到意外行为。

---

### **3. 新模型与硬件支持**  
- ✅ **Qwen4Exp**：通过 PR #29761 实现完整 MTP 支持，可启用 Qwen3.8-Flash-Next 变体的推测解码。  
  🔗 [PR #29761](https://github.com/ggml-org/llama.cpp/pull/29761)  
- ✅ **GLM-5.3-Flash**：通过 #27773 合并初始支持，包含用于 MTP 的 NextN 草稿头集成。  
  🔗 [PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773)  
- ✅ **LTX-2.3**：通过 PR #28540 实现原生图像/视频/音频生成支持——开箱即用 `POST /v1/images/generations`。  
  🔗 [PR #28540](https://github.com/ggml-org/llama.cpp/pull/28540)  
- ✅ **OpenCL**：首次支持 `q2_K` 与 `q3_K` 矩阵乘法（PR #28577），提升低精度 GPU 利用率。  
  🔗 [PR #28577](https://github.com/ggml-org/llama.cpp/pull/28577)  
- ✅ **Hexagon**：增量构建中已正确处理 HTP skel 安装（PR #29828）。  
  🔗 [PR #29828](https://github.com/ggml-org/llama.cpp/pull/29828)

---

### **4. 性能与优化**  
- 🚀 **CUDA**：在稳定图重放后降低预热开销（PR #29768），对长序列统一 KV 解码性能至关重要。  
  🔗 [PR #29768](https://github.com/ggml-org/llama.cpp/pull/29768)  
- 🚀 **Vulkan**：对量化 K/V 缓存（如 Qwen3.8-Flash-Next QSA）启用稀疏 flash attention，避免全上下文密集计算。  
  🔗 [PR #29639](https://github.com/ggml-org/llama.cpp/pull/29639)  
- 🚀 **CPU**：实现非 2 的幂次维度的 Kronecker 积支持（PR #28490），扩展了 CPU 张量灵活性。  
  🔗 [PR #28490](https://github.com/ggml-org/llama.cpp/pull/28490)  
- 📈 **SYCL**：修复主机固定内存导致高 CPU 使用率的问题（PR #27038）；改善大内存分配下的可扩展性。  
  🔗 [PR #27038](https://github.com/ggml-org/llama.cpp/pull/27038)  
- 📉 **MTMD**：对非因果模型将最大图像容量限制为 ubatch 大小（PR #29773），防止批处理推理时内存溢出。  
  🔗 [PR #29773](https://github.com/ggml-org/llama.cpp/pull/29773)

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 |
|--------|------|-------------|------------|
| 🔴 高 | [#29786](https://github.com/ggml-org/llama.cpp/issues/29786) | Qualcomm Adreno 驱动下 Vulkan 在 `-ngl >= 1` 时无声终止，无错误输出 | ❌ 尚未修复 |
| 🔴 高 | [#29783](https://github.com/ggml-org/llama.cpp/issues/29783) | Qwen3.5-122B-A10B 在 sm_70 上首次请求即崩溃（无预填充进度，内核立即拒绝） | ❌ 尚未修复 |
| 🔴 高 | [#27198](https://github.com/ggml-org/llama.cpp/issues/27198) | SYCL `--split-mode tensor` 在双 Arc Pro B70 上虽支持 P2P 仍触发 `DEVICE_LOST` 崩溃 | ❌ 尚未修复 |
| 🟡 中 | [#23577](https://github.com/ggml-org/llama.cpp/issues/23577) | Qwen3.6-27B 使用 MTP 长时间会话后输出重复的 `////` | ⚠️ 部分解决方案：禁用 MTP 或重置上下文 |
| 🟡 中 | [#29774](https://github.com/ggml-org/llama.cpp/issues/29774) | CPU 上的 flash attention 因 F16 累加器而非 F32 导致溢出至 `inf/NaN` | ⚠️ 可临时使用 `--flash-attn off` |

> 💡 **备注**：多个问题与后端特定缺陷（Vulkan/SYCL/CUDA）相关，影响小众硬件的稳定性。

---

### **6. 对应用开发者的意义**  
- **在 Qwen4Exp 与 GLM-5.3-Flash 模型上放心使用 MTP** —— 最新改动提升了正确性并减少了边缘情况崩溃。  
- **在使用 Adreno 驱动的 Android 设备上避免使用 `-ngl >= 1`**，直到 #29786 修复前，极可能发生无声失败。  
- **在 Vulkan 中为量化 KV 缓存启用稀疏 flash attention**（如 Qwen3.8-Flash-Next），避免不必要的内存压力。  
- **多 GPU 环境中谨慎使用 `--split-mode tensor`** 在 SYCL 与 CUDA 上——已知存在性能退化与死锁问题。  
- **注重安全的用户**：避免使用 `gguf-dump` 导出不受信任的 GGUF 文件——控制字符注入风险依然存在（PR #29016, #29819）。  
- **考虑新的 `/v1/systemone` API**（PR #29832）用于无需微调的决策模型流水线——可在标准聊天模型间通用。

> 🛠️ **实用技巧**：调试崩溃时，务必配合 `--no-mmap` 与 `--log-level debug` 使用——有助于隔离内存与加载问题。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-02**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展，代理支持与集成发现性获得关键改进，有效应对企业级核心使用场景。当前主要稳定性问题集中在 GPU 驱动兼容性（尤其是 NVIDIA Blackwell）以及 macOS Metal 内核加载上，M 系列 Mac 性能下降和 CPU 限制容器中的性能退化仍是紧迫问题。值得注意的是，`0.35.0` 版本中存在一个回归缺陷，导致模型拉取时绕过 HTTPS 代理——该问题正在积极修复中。

---

### **2. 发布与破坏性变更**  
*无*  
过去 24 小时内未发布新版本。然而，**Issue #18729** ([PR #18733](https://github.com/ollama/ollama/pull/18733), [PR #18730](https://github.com/ollama/ollama/pull/18730), [PR #18731](https://github.com/ollama/ollama/pull/18731)) 指出 `0.35.0` 中存在一项破坏性变更：模型下载现在忽略 `HTTPS_PROXY`，在受限网络环境中会导致失败。目前正通过基于环境变量的代理强制机制进行修复。

---

### **3. 新模型与硬件支持**  
- ✅ **MLX SystemOne 支持**：PR [#18701](https://github.com/ollama/ollama/pull/18701) 为 Apple Silicon 上的 SystemOne 模型添加了实验性 MLX 后端支持。  
- ✅ **Clef 模型集成**：PR [#18741](https://github.com/ollama/ollama/pull/18741) 通过 `llama-server` 实现原生 `clef` 模型支持。  
- 📌 **新增社区集成**：  
  - [PageGrok](https://www.pagegrok.org)（Chrome/Edge 扩展）— [PR #18736](https://github.com/ollama/ollama/pull/18736)  
  - [OpenNodes for Ollama](https://github.com/opennodes/ollama-router) — [PR #18732](https://github.com/ollama/ollama/pull/18732)  
  - [oxi](https://github.com/maziluiosif/oxi)（Rust 原生编码助手）— [PR #18739](https://github.com/ollama/ollama/pull/18739)  
  - [Dev Companion 终端预览](https://github.com/ashuujha/dev-companion) — [PR #18734](https://github.com/ollama/ollama/pull/18734)

---

### **4. 性能与优化**  
- ⚠️ **Mac (M4/M5)**：Issue [#18038](https://github.com/ollama/ollama/issues/18038) 报告，在 Mac Studio M4 Max 上生成 token 时出现 **560% 的 CPU 突增**——相比旧版本有显著退化。  
- ⚠️ **CPU 限制容器**：Issue [#17916](https://github.com/ollama/ollama/issues/17916) 显示，`n_threads` 默认值设为宿主机核心数，忽略 cgroup CPU 配额，导致在 CPU 限制下 **吞吐量下降约 45 倍**。  
- ✅ **GPU 轮询修复**：PR [#18613](https://github.com/ollama/ollama/pull/18613) 引入 `--poll 0` 用于 GPU 加速运行，通过移除不必要的轮询循环，显著降低空闲 CPU 占用——直接针对 #18038 中报告的高 CPU 问题。  
- 🔧 **JSON 字段顺序保留**：PR [#18721](https://github.com/ollama/ollama/pull/18721) 修复了向 `llama-server` 转发请求时 JSON payload 中属性顺序错误的问题，提升了下游客户端的可预测性。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 概述 | 状态 |
|--------|------|--------|--------|
| 严重 | [#18642](https://github.com/ollama/ollama/issues/18642) | RTX 5090（Blackwell）上使用 Cohere MoE 模型时发生 CUDA 非法内存访问（`MUL_MAT`）崩溃 | 开放 |
| 严重 | [#18581](https://github.com/ollama/ollama/issues/18581) | Blackwell GPU 上 Windows CUDA 探测失败（驱动 616.92），报告 `total_vram="0 B"` | 开放 |
| 高 | [#14118](https://github.com/ollama/ollama/issues/14118) | 尽管显存加载成功，macOS Metal 内核加载仍失败（M5 芯片） | 已关闭（v0.15.5 中问题依然存在） |
| 高 | [#18729](https://github.com/ollama/ollama/issues/18729) | `0.35.0` 回归问题：模型拉取绕过 `HTTPS_PROXY` | 开放（修复 PR 正在推进中） |
| 中 | [#18716](https://github.com/ollama/ollama/issues/18716) | 从 Cloudflare R2 拉取时出现 `redirect target not allowed` 错误 | 开放 |

> 注：多个问题与 **新型硬件（RTX 5090、Blackwell）** 及 **新兴后端（MLX、SystemOne）** 相关——表明在适配下一代加速器方面仍面临持续挑战。

---

### **6. 对应用开发者的启示**  
- **代理环境**：若在企业代理后运行，请避免使用 `0.35.0`；确保环境变量中设置 `HTTPS_PROXY`，直至修复合并。  
- **模型兼容性**：对 **Cohere MoE**、**LLM-jp-4** 以及 **SystemOne** 模型需保持谨慎——可能引发 GPU 崩溃或解析异常（例如 #18728 中的特殊标记后多空格问题）。  
- **容器部署**：在 `Modelfile` 或 CLI 中显式控制 `n_threads`；在 CPU 受限环境下不要依赖默认值。  
- **客户端 API 设计**：未来 `typical_p` 将成为必填项（参见 #18542）；请相应更新客户端逻辑。  
- **前瞻性准备**：关注与 MLX、CUDA 及 JSON 顺序相关的 PR——这些将决定你未来在 2026 年及以后如何与推理引擎交互。

> 🔗 **关键资源**：  
> - 代理修复 PRs: [18730](https://github.com/ollama/ollama/pull/18730), [18731](https://github.com/ollama/ollama/pull/18731), [18733](https://github.com/ollama/ollama/pull/18733)  
> - 性能修复: [18613](https://github.com/ollama/ollama/pull/18613), [18721](https://github.com/ollama/ollama/pull/18721)  
> - 新增集成: [18732](https://github.com/ollama/ollama/pull/18732), [18736](https://github.com/ollama/ollama/pull/18736)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-10-02**

---

### **1. 今日亮点**  
LiteLLM 生态系统持续强化安全防护，针对 2026 年 3 月发生的 PyPI 供应链攻击事件的修复工作已全面完成，并通过 cosign 签名的 Docker 镜像得到验证。一系列重点 PR 正在推进代理可靠性、护栏鲁棒性以及追踪与预算管理的 UI/UX 改进，包括增强 MCP 会话中的错误可见性，以及流式响应期间更优的降级处理机制。

---

### **2. 发布与破坏性变更**  
- 已发布 **v1.103.2** 和 **v1.101.4**（过去 24 小时内）。未报告破坏性变更；两次发布均包含安全加固和稳定性修复。  
- 所有 Docker 镜像自 `0112e53` 起均使用相同密钥通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 进行签名。  
  🔗 [验证签名](https://docs.sigstore.dev/cosign/overview/)  

> ✅ *无需迁移步骤。若正在运行 v1.82.7 或 v1.82.8，应立即升级以应对此前的供应链攻击。*

---

### **3. 新模型与硬件支持**  
- **Anthropic 工作负载身份联合（OIDC JWT-bearer）**：通过 #28607 新增支持 —— 实现无需 API 密钥的基于身份的安全认证，用于 Anthropic 模型。  
  🔗 [问题 #28607](https://github.com/BerriAI/litellm/issues/28607)  
- **Gemini 实时头像（avatar_config）**：正式支持（GA），可在 Vertex AI 集成中实现实时口型同步视频头像。  
  🔗 [问题 #43166](https://github.com/BerriAI/litellm/issues/43166)  
- **Bedrock Mantle**：修复认证流程中的 SigV4 服务名称错误（`bedrock-mantle` vs `bedrock`）。  
  🔗 [PR #44112](https://github.com/BerriAI/litellm/pull/44112)

---

### **4. 性能与优化**  
- **流式降级续传**：可选功能 (#41127) 允许在流式传输过程中继续部分响应的降级处理，减少客户端截断错误。  
  🔗 [PR #41127](https://github.com/BerriAI/litellm/pull/41127)  
- **SpendLogs 索引构建可选**：现可通过 `LITELLM_BUILD_SPEND_LOGS_INDEXES` 环境变量配置，避免在大型分区表上出现 DDL 竞争。  
  🔗 [PR #44124](https://github.com/BerriAI/litellm/pull/44124)  
- **提示缓存保留**：`/v1/chat/completions` 与 `/v1/responses` 之间的桥接现在保留 `prompt_cache_breakpoint` 标记。  
  🔗 [PR #44119](https://github.com/BerriAI/litellm/pull/44119)

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| `generic_chunk_has_all_required_fields` 接受无效数据块 → `KeyError` | 严重 | 开放 | #43487 |
| `previous_models` 因实例级存储导致跨请求数据泄露 | 高 | 开放 | #24965 |
| `service_tier` 对所有值在 Vertex AI 上返回 400 错误 | 中等 | 开放 | #34914 |
| SSO 用户数统计错误（例如 -7 个用户） | 中等 | 已关闭 | #31734 |
| `jev_classifier_config.api_key` 无法解析 `os.environ/` 引用 | 低 | 开放 | #43826 |

> ⚠️ **严重**：`generic_chunk_has_all_required_fields` 的缺陷可能导致流式管道崩溃，补丁即将发布。

---

### **6. 对应用开发者的意义**  
- **安全优先**：请立即从 v1.82.7/v1.82.8 升级至 v1.101.4+，并验证镜像签名。供应链攻击已控制，但旧版本仍存在风险。  
- **代理构建者**：使用新功能 `mid-stream fallback continuation` (#41127)，提升长时间运行代理工作流的容错能力。  
- **企业用户**：启用 `LITELLM_BUILD_SPEND_LOGS_INDEXES=1` 可避免代理启动或迁移时的 DDL 锁问题。  
- **护栏与可观测性**：得益于统一 ID 去歧义 (#43968)，预计在 Lens 和请求日志中获得更佳的追踪可见性。  
- **认证灵活性**：在受监管环境中，可通过 Anthropic 工作负载身份采用 OIDC JWT-bearer 实现无密钥访问。  

👉 始终在预发环境测试配置变更——尤其是涉及 `max_budget`、`previous_models` 和 `tool_permission` 护栏的部分。  

---  
*本简报由 GitHub 活动生成：2026-10-02 | 来源：[BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-10-02**

#### **1. 今日亮点**  
最新发布的 `v0.1.902-beta` 引入了 **命令面板**（通过 `Cmd` 访问），并带来了 Unsloth Desktop 的重大 UI/UX 改进，支持更快的导航、可共享的运行设置以及更清晰的错误报告。性能提升显著：**Laya 决策逻辑现在快了 4 倍**，对托管决策 API 的支持也进一步扩展。关键的是，NVFP4、INT4 和 MXFP4 检查点在 LoRA 训练过程中保持 4 位精度——降低了内存开销，并加速了微调工作流。

> 🔗 [GitHub Release v0.1.902-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta)

---

#### **2. 发布与破坏性变更**  
- **`v0.1.902-beta`** 添加了命令面板（`Cmd`），改进了错误可见性，并为 NVFP4/INT4/MXFP4 模型在 LoRA 训练各阶段实现持久的 4 位量化。
- **`v0.1.901-beta`** 引入了类似的用户体验升级和性能优化；未报告破坏性变更。
- **OpenAI 兼容 API 延迟激增（每请求约 1.2 秒）** 仍未解决 ([#12364](https://github.com/unslothai/unsloth/issues/12364))，影响低延迟推理任务。

> 🔗 [v0.1.902-beta 变更日志](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta)

---

#### **3. 新模型与硬件支持**  
- **Qwen-Image-2.1 GGUF**：通过 [PR #12470](https://github.com/unslothai/unsloth/pull/12470) 扩展支持，新增下载选项以选择文本编码器（避免约 17GB 的密集 TE）。
- **AMD ROCm on Windows**：仍存在严重问题——因缺少 FP8 文本编码器，`Qwen-Image-2.1` 无法加载 ([#11638](https://github.com/unslothai/unsloth/issues/11638))。
- **多 GPU 推理**：PRs #11491 和 #12024 添加了对 **vLLM** 与 **SGLang** 引擎的可选支持，支持多 GPU 服务、视觉功能及量化——适用于 Linux 与 Windows 上的 WSL2。
- **MLX 后端**：在 Studio 中，每个请求已启用融合专家路由与归一化传递融合 ([PR #12422](https://github.com/unslothai/unsloth/pull/12422))。

> 🔗 [PR #11491 – vLLM/SGLang 集成](https://github.com/unslothai/unsloth/pull/11491)  
> 🔗 [PR #12470 – Qwen-Image-2.1 文本编码器选择](https://github.com/unslothai/unsloth/pull/12470)

---

#### **4. 性能与优化**  
- **Laya 决策在 `v0.1.902-beta` 中提速 4 倍**，显著提升实时 AI 代理协同效率。
- **Qwen-Image-2.1 int8 推理每步性能提升 14–17%**，得益于融合的 int8 GEMM + 反量化后处理 ([PR #12448](https://github.com/unslothai/unsloth/pull/12448))。
- **块流式优化**：PR #12389 提升了 DiT 块加载与计算之间的重叠度，减少了扩散生成过程中的空闲时间。
- **张量分块解码性能下降**：自 `b10715-mix-86bd2d3` 起，双 RTX 5070 Ti 系统上的张量分块解码速度 **最慢可达 2.9 倍** ([#12468](https://github.com/unslothai/unsloth/issues/12468)) —— 对多 GPU 用户至关重要。

> 🔗 [PR #12448 – Int8 GEMM 融合](https://github.com/unslothai/unsloth/pull/12448)  
> 🔗 [Issue #12468 – 张量分块解码回归问题](https://github.com/unslothai/unsloth/issues/12468)

---

#### **5. 稳定性与回归问题**  
| 问题 | 严重程度 | 状态 | 修复 PR |
|------|----------|--------|--------|
| **更新后工具调用随机失败** ([#12435](https://github.com/unslothai/unsloth/issues/12435)) | 高 | 开放 | ❌ |
| **AMD GPU 在 QLoRA 训练期间重置** ([#11498](https://github.com/unslothai/unsloth/issues/11498)) | 严重 | 开放 | ❌ |
| **Hugging Face 量化发现阻塞离线设备模型加载** ([#12415](https://github.com/unslothai/unsloth/issues/12415)) | 中等 | 开放 | ✅ [PR #12451](https://github.com/unslothai/unsloth/pull/12451) |
| **Qwen-Image-2.1：无转换路径中 1-D 归一化权重未反量化** ([#12445](https://github.com/unslothai/unsloth/issues/12445)) | 中等 | 开放 | ✅ [PR #12449](https://github.com/unslothai/unsloth/pull/12449) |
| **Windows沙盒创建虚拟 `nul` 文件阻塞工具** ([#12473](https://github.com/unslothai/unsloth/issues/12473)) | 中等 | 开放 | ❌ |

> 🔗 [PR #12451 – 离线 GGUF 发现修复](https://github.com/unslothai/unsloth/pull/12451)  
> 🔗 [PR #12449 – 1-D 归一化反量化修复](https://github.com/unslothai/unsloth/pull/12449)

---

#### **6. 对应用开发者的意义**  
- **构建具备共享状态感知能力的代理**：利用新的 **命令面板** 和 **可共享的运行设置**，在团队间简化代理配置与调试流程。
- **优化混合精度训练**：利用 LoRA 训练中持久的 4 位量化（NVFP4/INT4/MXFP4），降低显存占用并加快微调速度。
- **规避 OpenAI 兼容 API 延迟**：若亚秒级响应至关重要，请绕过 `/v1/chat/completions` 端点，或使用直接的 llama.cpp 服务器调用，直至 [#12364](https://github.com/unslothai/unsloth/issues/12364) 解决。
- **设计支持多引擎灵活性的应用**：随着 Studio 中已支持 vLLM/SGLang，将应用的推理引擎选择与部署栈解耦——非常适合 A/B 测试或弹性扩展。
- **妥善处理 RAG 与图像流水线的边缘情况**：注意 `UPLOAD_EXTS` 的限制 ([#11385](https://github.com/unslothai/unsloth/issues/11385))，并确保在离线或仅 AMD 环境下有稳健的回退机制。

> 🔗 [开发者指南：多引擎部署](https://github.com/unslothai/unsloth/blob/main/docs/studio/engines.md)

---  
*本摘要基于 GitHub 活动（2026-10-02）整理。如需实时更新，请关注 [unslothai/unsloth](https://github.com/unslothai/unsloth)。*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*