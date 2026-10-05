# AI 基础设施日报 2026-10-05

> 生成时间: 2026-10-05 01:09 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-05**

---

### **1. 生态概览**  
2026年第四季度的AI推理基础设施格局正由硬件感知优化在边缘的快速专业化与融合所定义。各项目正沿着性能、可移植性和运营成熟度三个维度日益分化：vLLM与SGLang主导高吞吐量、分布式服务；llama.cpp仍是本地低开销推理的行业标准；Ollama通过以CLI为核心的用户体验加速开发者对模型的访问；LiteLLM统一跨服务商网关的可靠性；而Unsloth则在多模态与微调工作流上不断突破边界。**异构硬件支持**、**代理级可观测性**和**生产级稳定性**的明确趋势，标志着从实验原型向企业级部署的深刻转变。

---

### **2. 活动对比**

| 项目       | 问题（开放） | PR（近期） | 发布（最近24小时） | 备注 |
|---------------|----------------|----------------|------------------------|-------|
| **vLLM**      | 87             | 12             | 无                   | 高度关注内核正确性、休眠模式及MoE/MTP稳定性 |
| **SGLang**    | 132            | 9              | 无                   | CI严重不稳定（323次CUDA崩溃），正在积极开发DCP/HiCache功能 |
| **llama.cpp** | 158            | 11             | b11400–b11401          | MoE稳定性修复；Vulkan/CUDA后端改进；混合硬件支持 |
| **Ollama**    | 126            | 7              | 无                   | RC功能发布中；`clef-flash`与AMD Vulkan回归问题 |
| **LiteLLM**   | 91             | 6              | v1.105.0-rc.1          | 安全性与成本准确性强化；代理遥测优化 |
| **Unsloth**   | 103            | 8              | 无                   | tensor-split模式下出现关键吞吐量下降 |

> ✅ *SGLang与llama.cpp在问题数量上领先；vLLM展现出最高的PR提交速度，聚焦于质量修复。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构       | 支持项目 | 状态 | 关键差异点 |
|-------------------------------|--------------------------|--------|--------------------|
| **Qwen4Exp / Qwen3.8 Flash**  | vLLM, SGLang, Ollama       | ✅ 稳定 | vLLM在KV缓存+投影融合方面领先；Ollama修复了聊天模板 |
| **DeepSeek-V4.1 / DSv4.1**    | SGLang, vLLM               | ✅ 活跃 | SGLang针对TRT-LLM稀疏注意力进行了优化；vLLM修复压缩器环形问题 |
| **K2 Horizon (MoE)**          | Ollama（仅请求）      | 🔮 待定 | 正式功能请求——尚未实现 |
| **Clef-Flash**                | Ollama, SGLang             | ⚠️ 已损坏 | Ollama在`/systemone`上失败；SGLang存在死锁风险 |
| **FLUX.2-klein (图像生成)**  | Unsloth (ROCm)             | ✅ 融合RoPE | AMD上提速8%；其他项目暂不支持该模型 |
| **MooncakeConnector + 休眠模式** | vLLM                     | ✅ 实验性 | 支持基于RDMA的解耦架构——唯vLLM独有 |

> 🏆 **胜出者**：**vLLM** —— 在前沿模型（Qwen4Exp、DeepSeek-V4.1）与新型硬件模式（休眠模式、NVFP4）支持上最为全面。  
> 🌟 **新兴领导者**：**Unsloth** —— 首个在ROCm上为FLUX.2-klein实现融合RoPE优化的项目，彰显其在多模态领域的强劲势头。

---

### **4. 性能前沿**

| 优化重点         | 领先项目                          | 关键进展 |
|-----------------------------|--------------------------------------------|--------------|
| **KV缓存效率**     | vLLM, SGLang                               | NVFP4_DS_MLA（vLLM）；HiCache PLE表（SGLang）；GPU缓存MoE专家（llama.cpp） |
| **分布式服务**     | SGLang（DCP），vLLM（休眠模式）            | SeaweedFS L3后端（SGLang）；FlashInfer allreduce发布（vLLM） |
| **批处理与并行**  | Ollama, vLLM                               | Qwen3.5并行化解锁（Ollama）；MTP + 前缀缓存调优（vLLM） |
| **内核级调优**     | vLLM, SGLang, Unsloth                      | Qwen4Exp投影融合（vLLM）；Cake-kernel matmul（SGLang）；融合RoPE（Unsloth） |
| **量化与内存**   | vLLM, llama.cpp                            | FP8 QSA缓存读取修复（<8.9）；NVFP4解码（SM10x）；MoE专家缓存（llama.cpp） |

> 🔥 **热点区域**：**vLLM** 在**内核级效率**与**内存管理**（休眠模式、缓冲区卸载）方面占据主导地位。  
> 💡 **差异化优势**：**SGLang** 凭借HiCache与DCP结合SeaweedFS集成，在**分布式可扩展性**上表现卓越。

---

### **5. 层级定位**

| 项目       | 主要层级                     | 次要角色                         | 独特优势 |
|---------------|------------------------------------|-----------------------------------------|------------------------|
| **vLLM**      | 推理引擎（GPU导向）     | 模型服务、微调网关      | 吞吐最高，深度硬件集成 |
| **SGLang**    | 分布式推理栈        | 多节点服务、L3缓存          | 最佳实践的DCP + HiCache L3 |
| **llama.cpp** | 本地运行时（CPU/GPU/MLX）        | 多模态输入、边缘推理        | 可移植性最强，开源后端多样性最广 |
| **Ollama**    | 开发者网关 / CLI运行时    | 模型迁移、本地API服务器         | 快速测试新模型的最优路径 |
| **LiteLLM**   | LLM网关 / 可观测层  | 成本追踪、代理遥测          | 行业领先的成本准确率与代理监控能力 |
| **Unsloth**   | 微调与多模态运行时   | Studio UX、音频流水线               | 音频/TTS支持最强，且具备FLUX图像生成能力 |

> 📊 **层级清晰度**：当前生态已明确分层：  
> - **核心引擎**：vLLM、SGLang  
> - **本地运行器**：llama.cpp、Ollama  
> - **网关层**：LiteLLM  
> - **微调/融合层**：Unsloth  

---

### **6. 趋势信号**

#### 🔍 **从2026-10-05活动提取的关键趋势**
1. **硬件感知优化已成为必备项**  
   - NVFP4、FP8、MLA、SM10x GPU支持已不再是实验性功能——而是生产环境的基本要求。  
   - vLLM的NVFP4_DS_MLA与SGLang的Blackwell DCP修复表明，**新一代GPU需要定制内核**。

2. **代理工作流正推动稳定性需求**  
   - 工具调用流式传输（vLLM）、`systemone`端点可靠性（Ollama）、结构化输出处理（LiteLLM）已成关键任务。  
   - 开发者必须优先保障**正确性而非新颖性**——例如，在修复#53670前，避免对混合模型使用推测解码。

3. **解耦与内存效率正走向主流**  
   - vLLM的MooncakeConnector + 休眠模式，以及SGLang的HiCache + SeaweedFS集成，标志着向**内存高效、大规模推理**的转型。  
   - 无需爆炸式增长显存即可支持长上下文代理。

4. **安全与成本问责不可妥协**  
   - LiteLLM的`search_tool_deny_by_default`与签名认证的Docker镜像反映出对**合规就绪工具链**的日益重视。  
   - 尤其是多模态输入场景下的精确成本追踪，如今已是核心功能而非附加项。

5. **后端正趋于碎片化，而非融合**  
   - Vulkan（AMD/Radeon 780M）、SYCL（Intel）、HIP（ROCm）、MLX（Apple）各自存在独特稳定性问题。  
   - 开发者必须**按硬件栈逐一测试**——不存在“万能”运行时。

---

### ✅ **面向应用开发者的可操作建议**
- **生产部署**：使用 **vLLM v0.28+** 并配合 `--disable-soft-prompt` 与 `--max-num-queued-reqs`，避免突发请求准入缺陷。
- **多GPU推理**：避免使用 Unsloth `b10715-mix-...` 版本，因其存在58%吞吐量下降；建议使用 `b10687` 或 `ggml-org` 版本。
- **代理系统**：立即升级至 **LiteLLM v1.105.0-rc.1**，以修复图像/音频内容中的静默数据丢失问题。
- **异构环境**：多节点集群推荐 **SGLang（SeaweedFS L3）**；CPU/Vulkan降级场景首选 **llama.cpp**。
- **未来兼容性**：关注 **Ollama的RC通道** 中关于K2 Horizon与Intel SYCL的支持进展——但生产环境请待稳定后再使用。

> 🔗 *建议*：采用**分层验证策略**——在部署至生产前，务必在目标硬件上验证核心功能，特别是组合使用推测解码、前缀缓存或多模态输入等高级特性时。

---  
*报告生成时间：2026-10-05 | 数据来源：GitHub活跃度统计（vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth）*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-10-05**

#### **1. 今日亮点**  
vLLM 项目持续聚焦核心推理引擎的稳定性和性能，针对分布式 KV 缓存卸载中的睡眠/唤醒模式正确性（PR #59993, #59994）进行了关键修复，并增强了高负载下推测解码的鲁棒性（PR #59620）。Qwen4Exp 的注意力核优化（PR #59533）以及 MLAs 上的 NVFP4 支持（PR #59342）标志着在优化下一代 MoE 与混合模型方面取得显著进展。

#### **2. 发布与破坏性变更**  
过去 24 小时内未报告新版本或破坏性变更。无新发布版本，也未观察到任何新的 API/配置破坏性更改。

#### **3. 新模型与硬件支持**  
- **Qwen4Exp PLE 嵌入支持**：PR #59943 通过在内核中将 `uint8` 指针强制转换，实现了对计算能力低于 8.9 的设备上 FP8 QSA KV 缓存的读取支持。  
- **NVFP4_DS_MLA 支持于 FLASHINFER_MLA_SPARSE**：PR #59342 在 SM10x GPU（如 GB300/B200）的稀疏 MLA 后端上新增原生 NVFP4 解码支持，相比 FP8 实现 1.6 倍的标记容量。  
- **DeepSeek-V4-Flash (DSv4.1)**：PR #58560 修复了预热阶段空块中压缩器环放置的问题，提升了在 CUDA 图捕获下的可靠性。  
- **MooncakeConnector + 睡眠模式**：PR #59625 添加实验性支持基于 RDMA 的睡眠模式，实现内存高效的分离式推理工作流。

> 🔗 [PR #59342](https://github.com/vllm-project/vllm/pull/59342) | [PR #59533](https://github.com/vllm-project/vllm/pull/59533) | [PR #59625](https://github.com/vllm-project/vllm/pull/59625)

#### **4. 性能与优化**  
- **Qwen4Exp 投影融合（PR #59533）**：将 QKVG 和索引器 Q/K 投影合并为单一 GEMM，减少内核启动次数，提升 SM100/SM103 GPU 上的吞吐量。  
- **KV 缓存卸载效率**：PR #59994 在睡眠期间将模型运行器构建缓冲区移至 CPU，释放 GPU 内存，支持更长的空闲周期。  
- **前缀缓存 + MTP 稳定性**：正在进行的工作（Issue #53912, #53670）旨在解决因 EAGLE/MTP 中最后一块丢失导致的混合 Mamba/GDN 模型中持续性数据损坏及 30–40% 吞吐损失问题。  
- **FlashInfer Allreduce 工作区释放（PR #59360）**：启用 `--enable-nccl-comm-suspend` 后，FlashInfer 的 allreduce 工作区现在可在睡眠期间释放，降低残留内存占用。

#### **5. 稳定性与回归问题**  
高严重性问题仍处于活跃状态，主要影响高级部署场景：  
- **严重内存损坏**：Issue #53912 报告混合 Mamba/GDN 模型中前缀缓存 + MTP 会导致输出损坏（v0.28.0 版本）；修复待完成。  
- **非法内存访问**：Issue #54173 显示在 GB10（sm_121）上使用前缀缓存时出现 `CUBLAS_STATUS_INTERNAL_ERROR` / 非法访问错误；即使启用 `--no-async-scheduling` 仍可复现。  
- **推测解码重计算开销**：Issue #53670 记录了在 EAGLE/MTP 前缀缓存中每命中一次需重计算 1,648 个标记，造成 30–40% 批处理吞吐损失。  
- **工具调用截断缺陷**：PR #59620 修复了截断流中 JSON 工具调用参数闭合不完整的问题——对使用流式工具调用的智能体系统至关重要。

> 🔗 [Issue #53912](https://github.com/vllm-project/vllm/issues/53912) | [Issue #54173](https://github.com/vllm-project/vllm/issues/54173) | [PR #59620](https://github.com/vllm-project/vllm/pull/59620)

#### **6. 对应用开发者的启示**  
- **智能体系统**：建议升级至 v0.28+ 以获得修复后的流式工具调用行为（PR #59620）。在 #53670 修复前，避免在混合模型中使用推测解码。  
- **分离式推理**：在 Mooncake/NIXL 连接器中使用 `--enable-sleep-mode --enable-nccl-comm-suspend`（PR #59625），以降低大规模部署中的内存压力。  
- **混合模型用户**：在 Qwen3.8-flash-next 或 Mamba/GDN 混合模型上使用前缀缓存 + MTP 时需谨慎——预期存在不稳定性和潜在重计算开销。请关注 #53912 和 #54173。  
- **量化与硬件**：利用 NVFP4_DS_MLA 支持（PR #59342）在 B200/GB300 系统上实现更高密度的 KV 缓存。确保 FP8 缓存读取兼容计算能力低于 8.9 的设备（PR #59943）。

> ✅ **可操作提示**：对于高并发或智能体工作流的生产级 LLM 服务，建议锁定在 v0.28.0+ 版本，并通过设置 `--disable-soft-prompt` 与 `--max-num-queued-reqs` 来规避突发请求接入缺陷（PR #58478）。

---  
*数据来源：[vllm-project/vllm GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-10-05**

---

### **1. 今日重点**  
SGLang 生态系统持续推进高性能推理栈的演进，关键改进包括 **解码上下文并行（DCP）** 和 **HiCache L3 后端支持**，实现跨多节点集群的可扩展、低延迟服务。对 **DeepSeek-V4.1 优化** 的关注依然集中，涵盖 TRT-LLM 稀疏注意力与 Blackwell GPU 的内核级调优。与此同时，由于 CUDA 核心转储（coredump）激增及测试不稳定问题频发，CI 稳定性正受到密切关注。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，`--dcp-comm-backend` 默认值将改为 `fi_a2a`/`a2a`（通过 #39165、#37767）的工作可能影响依赖旧通信后端的用户。若从 v0.5.20 之前的版本升级，请确保兼容性。

> 🔗 [PR #39165](https://github.com/sgl-project/sglang/pull/39165) | [PR #37767](https://github.com/sgl-project/sglang/pull/37767)

---

### **3. 新模型与硬件支持**  
- ✅ **SeaweedFS** 已作为 HiCache 的官方 L3 存储后端加入 (#42399)，实现无需外部对象存储的跨节点共享分布式 KV 缓存。
- ✅ **摩尔线程（MUSA）** GPU 支持路线图已启动 (#16565)，社区兴趣推动未来集成。
- ✅ **AMD K3（Kimi-K3）** 现在可通过 aiter 内核启用可选的 FP8-Q ASM MLA 解码/验证 (#41388)。
- ✅ **Blackwell（BWD）**：RoPE 稀疏注意力（`trtllm`）的 DCP 修复已合并 (#42536)。

> 🔗 [PR #42399](https://github.com/sgl-project/sglang/pull/42399) | [Issue #16565](https://github.com/sgl-project/sglang/issues/16565) | [PR #41388](https://github.com/sgl-project/sglang/pull/41388) | [PR #42536](https://github.com/sgl-project/sglang/pull/42536)

---

### **4. 性能与优化**  
- **HiCache**：基于文件的 PLE 表现现已在 GB10 上实现 **冷预填充 TTFT 降低 6.8 倍**，得益于并发主机读取能力 (#42392)。
- **DeepSeek-V4 Pro**：通过限制张量拷贝工作线程，模型加载时间从 **约 95 分钟缩短至约 3.3 分钟**（使用 Lustre 存储）(#42361)。
- **内核优化**：Cake-kernel SP all-gather matmul 路由现可通过 `SGLANG_CAKE_ROUTES=sp_all_gather_matmul` 使用，提升序列并行扩展性 (#42532)。
- **推测解码**：新增可选的块验证功能，用于加速草稿接受并提升吞吐量 (#42297)。

> 🔗 [PR #42392](https://github.com/sgl-project/sglang/pull/42392) | [PR #42361](https://github.com/sgl-project/sglang/pull/42361) | [PR #42532](https://github.com/sgl-project/sglang/pull/42532) | [PR #42297](https://github.com/sgl-project/sglang/pull/42297)

---

### **5. 稳定性与回归问题**  
**严重问题（高优先级）：**  
- 🚨 **CUDA 核心转储追踪器 (#26340)**：323 条评论 —— 自动收集自 `pr-test.yml`。大量崩溃表明 GPU 内核存在不稳定性；目前尚无修复方案。
- 🚨 **Long prefill 场景下 DeepSeek-V4 + HiCache write_through 死锁**：调度器/反标记器挂起，`/health` 返回 503 (#42465)。尚未提交修复 PR。
- 🚨 **TRT-LLM MHA 在 H200（SM90）上崩溃**：v0.5.20 接受 `trtllm_mha` 用于预填充和解码，但返回错误结果 —— 从 v0.5.17 回归问题 (#40921)。

**其他显著缺陷：**  
- Qwen3 流式输出陷入无限思考循环，因跨块标签截断所致 (#31118)  
- 确定性采样拒绝 `min_p` + seed 组合 (#33695)  
- 引擎暂停时并发权重更新共享完成状态 (#33698)

> 🔗 [Issue #26340](https://github.com/sgl-project/sglang/issues/26340) | [Issue #42465](https://github.com/sgl-project/sglang/issues/42465) | [Issue #40921](https://github.com/sgl-project/sglang/issues/40921) | [Issue #31118](https://github.com/sgl-project/sglang/issues/31118)

---

### **6. 对应用开发者的影响**  
- **使用 HiCache 或多节点推理的部署应优先升级至最新 main 版本**，以获得 SeaweedFS L3 支持和更优的 PLE 性能。
- 在 #40921 修复前，避免在 H200（SM90）上使用 `--attention-backend trtllm_mha` —— 即使表面正常，仍会产生错误输出。
- 使用 `--enable-deterministic-inference` 时需谨慎：除非已验证 PyTorch 采样路径兼容性，否则避免与 `min_p` 结合使用 (#33695)。
- 对 DeepSeek-V4.1 用户：启用 `--dsv4-attn-backend trtllm` 以获得稀疏注意力支持，但需注意高并发场景下的死锁风险 (#42465)。
- 利用可选的 Cake-kernels（`SGLANG_CAKE_ROUTES`）和块验证功能进行推测解码，以实现更高吞吐与更优延迟控制。

> 🔗 [路线图：DeepSeek V4.1 优化](https://github.com/sgl-project/sglang/issues/42170) | [CI 维护模式](https://github.com/sgl-project/sglang/issues/21065)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-05**

---

### **1. 今日重点**  
最新发布周期聚焦于 MoE 模型及 Vulkan/CUDA 后端的关键稳定性修复，尤其针对 FlashAttention 和专家路由中的内存安全问题。主要改进包括：支持混合 embd+raw token 批处理（对多模态模型有益）、增强路由器日志可读性，以及在 MoE 工作负载下对 Intel Arc GPU 的性能优化。

---

### **2. 发布与破坏性变更**  
- **b11401**：修复路由器模式日志中的颜色重置处理，防止行数据损坏；子命令输出现在自带独立的颜色上下文 ([#29895](https://github.com/ggml-org/llama.cpp/pull/29895))。  
- **b11400**：通过 `llama_batch_ext` 支持在单个批次中混合使用 `embd` 与原始 token，使 Paligemma 等模型可实现非因果处理 ([#29622](https://github.com/ggml-org/llama.cpp/pull/29622))。  
- **b11399**：重构 CUDA swizzling 代码以修复模板边界问题 ([#29612](https://github.com/ggml-org/llama.cpp/pull/29612))。  
- **b11398**：在 x86 平台上启用 tinyBLAS 中的 BF16/FP16/FP32 K-tail 向量化，提升 CPU 推理效率 ([#29806](https://github.com/ggml-org/llama.cpp/pull/29806))。

> ✅ *今日无报告破坏性 API 变更。*

---

### **3. 新模型与硬件支持**  
- **多模态视觉输入**：服务器现已通过 PR [#29969](https://github.com/ggml-org/llama.cpp/pull/29969) 支持 Clef 模型的视觉输入，包括非因果批次中的 MTMD（多模态 token）处理。  
- **Vulkan（Intel Arc）**：修复 Intel Arc B70/B50 GPU 上 MoE 模型的性能下降问题 ([PR #29936](https://github.com/ggml-org/llama.cpp/pull/29936))。  
- **CUDA（Ampere, sm86）**：针对长上下文场景下约 2 倍预填充延迟偏差进行持续排查；量化 KV + 批次 > 1 时不可避免地触发 f16 转换阶段 ([Issue #29935](https://github.com/ggml-org/llama.cpp/issues/29935))。  
- **Hexagon**：SSM-conv 内核更新，采用基于 HVX 的转置优化 ([PR #29971](https://github.com/ggml-org/llama.cpp/pull/29971))。

---

### **4. 性能与优化**  
- **FlashAttention**：CUDA 现在优先采用整块调度策略，以在 Ada+ GPU 上高效运行两阶段内核，提升预填充吞吐量 ([PR #29435](https://github.com/ggml-org/llama.cpp/pull/29435))。  
- **MoE 专家缓存**：PR [#29887](https://github.com/ggml-org/llama.cpp/pull/29887) 引入基于 LRU 淘汰策略的 GPU 缓存机制，用于驻留主机的 MoE 专家——显著降低小批次（<32 token）下的卸载开销。  
- **Vulkan（RDNA4）**：自 #29182 起出现约 12% 的预填充性能下降，归因于感知 MoE 的瓦片选择策略；正在积极调查中 ([Issue #2992](https://github.com/ggml-org/llama.cpp/issues/2992))。  
- **SYCL**：修复 `mul_mat` 中的内存错误及缓冲池问题，提升多 GPU 部署下的稳定性 ([PR #29889](https://github.com/ggml-org/llama.cpp/pull/29889))。

---

### **5. 稳定性与回归问题**  
- **严重崩溃（CUDA）**：当 `n_expert >> n_ubatch` 时，MMQ 中发生非法内存访问 —— 已在 b11390 修复 ([#29941](https://github.com/ggml-org/llama.cpp/issues/29941))。  
- **输出损坏（ROCm）**：gfx1151（Strix Halo APU）在使用 HIP/ROCm 后端时报告输出损坏，而 Vulkan 正常 —— 使用相同权重与参数 ([Issue #27579](https://github.com/ggml-org/llama.cpp/issues/27579))。  
- **竞争条件（路由器）**：在 `--models-max=1` 下并发冷启动会导致调度器死锁 —— 正在调查中 ([Issue #28774](https://github.com/ggml-org/llama.cpp/issues/28774))。  
- **KV 缓存保存失败（视觉模型）**：启用视觉功能的模型在保存槽状态时失败 —— 高优先级问题 ([Issue #19466](https://github.com/ggml-org/llama.cpp/issues/19466))。  
- **内存损坏（Vulkan）**：`unpack8()` 在 Snapdragon X Elite 上导致 MAT_MUL + CPY 损坏 —— 可在 Qwen3-4B-Thinking 上复现 ([Issue #28290](https://github.com/ggml-org/llama.cpp/issues/28290))。

---

### **6. 对应用开发者的启示**  
- 若需可靠地进行多模态推理并使用混合 embd/raw token 批处理（如 PaliGemma），请使用 **`b11400` 及以上版本**。  
- 部署 **MoE 模型**时，建议优先选用 **Intel Arc 或 NVIDIA Ada+ GPU** —— 除非已打补丁，否则避免使用 RDNA4/Vulkan。  
- 在小批次工作负载下，启用 **GPU 缓存的 MoE 专家**（`PR #29887`）以实现低延迟的推测解码。  
- 在路由器竞争条件修复前，请避免在并发请求中使用 `--models-max=1`（[#28774](https://github.com/ggml-org/llama.cpp/issues/28774)）。  
- 监控 **KV 缓存持久化**功能对视觉模型的影响 —— 当前 `save/slots` 接口无法持久化上下文检查点（[#19466](https://github.com/ggml-org/llama.cpp/issues/19466)）。  
- 仅在确认硬件行为稳定后才考虑使用 **SYCL 构建** —— 多个崩溃报告已被提交（[#27128](https://github.com/ggml-org/llama.cpp/issues/27128), [#25423](https://github.com/ggml-org/llama.cpp/issues/25423)）。

> 🔗 [官方发布页](https://github.com/ggml-org/llama.cpp/releases) | [GitHub 问题列表](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-05**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展对新兴模型和硬件后端的支持，关键进展包括 Intel SYCL（oneAPI）集成以及对 Qwen3.8 聊天模板的改进处理。在 `/v1/systemone` 上报告了 `clef-flash` 决策模型失败的严重稳定性问题，以及 AMD Radeon 780M Vulkan 内存管理的回归缺陷——两者均影响生产推理的可靠性。与此同时，开发者通过新 CLI 对 RC 版本的支持，获得了对预发布更新更精细的控制能力。

---

### **2. 发布与破坏性变更**  
*无*  
过去 24 小时内未发布新版本。但 **PR #18787** 引入了实验性的 `ollama update [check|pull]` 命令，全面支持发行候选版本（RC），可通过 `--rc`、`--prerelease` 或 `--force` 实现对预发布构建的早期访问。这一变化显著提升了开发敏捷性，但可能在 CI/CD 流水线中引入不稳定性。

🔗 [PR #18787 – 添加更新检查与拉取功能，支持 RC 版本](https://github.com/ollama/ollama/pull/18787)

---

### **3. 新模型与硬件支持**  
- ✅ **Intel SYCL（oneAPI）**：通过 **PR #18333** 实现了对 Intel 独立显卡（如 Arc B70 32GB）的原生后端支持，使 Linux 用户可通过优化编译流程利用高端 Intel GPU。
- 🔮 **K2 Horizon 模型**：正式功能请求 **Issue #18698** 呼吁支持 MBZUAI 的 K2-Horizon 系列（0.9B–36B MoE），包括官方 GGUF 变体。这标志着研究机构下一代开源模型的兴趣日益增长。
- 🖥️ **MLX 引擎增强**：PRs #18780（Kolibri 1 支持）和 #18779（分词器语义对齐）旨在提升 macOS 平台 MLX 模型的可移植性和分词精度。

🔗 [PR #18333 – 实现原生 Intel SYCL 运行时管道](https://github.com/ollama/ollama/pull/18333)  
🔗 [Issue #18698 – 请求：支持 K2 Horizon 模型（k2-horizon）](https://github.com/ollama/ollama/issues/18698)

---

### **4. 性能与优化**  
- ⚡ **Qwen3.5/Qwen35moe 并行处理**：随着 `llama.cpp` 上游修复，**PR #17144** 移除了人为的 `numParallel = 1` 限制，使这些混合架构实现真正的并行推理——预计在负载下吞吐量可提升约 2–3 倍。
- 📦 **OpenAI 嵌入效率优化**：**PR #18610** 通过直接将原生结构序列化为 OpenAI 兼容响应，消除了嵌入操作中的冗余 JSON 往返，大幅降低大规模批处理时的延迟和 CPU 开销。
- 🧠 **模型迁移工作流**：**PR #15530** 为可重复、基于参考的 MLX 模型迁移奠定了基础——这对无需手动调优即可扩大覆盖范围至关重要。

🔗 [PR #17144 – 允许对 qwen35/qwen35moe 并行请求](https://github.com/ollama/ollama/pull/17144)  
🔗 [PR #18610 – 避免 OpenAI 嵌入的原生 JSON 往返](https://github.com/ollama/ollama/pull/18610)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|-------|-------------|------------|
| 🔴 高 | [#17778](https://github.com/ollama/ollama/issues/17778) | `qwen3.8`：在循环使用工具时流式传输中出现 `no user query found in messages` 错误（500） | 处理中；尚未修复 |
| 🔴 高 | [#18769](https://github.com/ollama/ollama/issues/18769) | `clef-flash` 在 `/v1/systemone` 上失败，报错“Clef: non-finite logit”（CUDA）或“cannot open model”（CPU）——尽管在 `/v1/chat/completions` 上正常运行 | 无修复；正在调查 |
| 🟡 中 | [#17748](https://github.com/ollama/ollama/issues/17748) | AMD Radeon 780M Vulkan 回归问题：v0.32.10 之后出现 `radv/amdgpu: Not enough memory for command submission` | 已确认为回归；补丁待发布 |
| 🟡 中 | [#18744](https://github.com/ollama/ollama/issues/18744) | MLX 引擎在 macOS 27 上每次请求后约 2 秒卸载权重，导致内存压力下页面抖动 | 可通过 `--keep-warm` 缓解；无永久修复 |

> ⚠️ **重要提示**：`clef-flash` 问题会影响依赖系统级端点的决策工作流——可能导致实时系统中代理编排中断。

---

### **6. 对应用开发者的启示**  
- **谨慎使用 `clef-flash` 和 `qwen3.8`** 在 `/v1/systemone` 上，直到修复落地——使用工具时可能出现静默失败或崩溃。
- **若在 Linux 上使用 Arc 显卡**，请启用 Intel SYCL；这将开启此前不可用的加速路径。
- **升级至最新版 `llama.cpp` upstream** 以解锁 `qwen35` 模型的并行能力——将在多用户环境中显著提升吞吐量。
- **通过环境变量（如 `HTTP_PROXY` 等）启用代理支持**，借助 **PRs #18730–#18733** 实现防火墙后的企业部署。
- **使用 `ollama update check --rc` 监控 RC 更新**，以抢先体验新功能——但请避免在生产环境使用，直至经过验证。

🔧 *建议操作*：除非你正在主动测试前沿功能，否则应将 `ollama` 版本固定在稳定标签。在 macOS 上使用 MLX 模型时，建议配合 `--keep-warm` 以缓解内存抖动。

---  
*摘要源自 GitHub 活动（2026-10-05）。如需实时追踪，请关注 [Ollama Issues](https://github.com/ollama/ollama/issues) 与 [Pull Requests](https://github.com/ollama/ollama/pulls)。*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 简报 – 2026-10-05**

---

### **1. 今日亮点**  
LiteLLM 生态系统持续成熟，重点聚焦于运营可靠性、成本准确性以及代理级遥测能力。关键进展包括引入 `search_tool_deny_by_default` 以提升安全基线，修复流式响应成本追踪（尤其是 OpenRouter 和 Vertex AI）中的关键问题，并在 Lens 中新增服务端运行搜索功能，支持可扩展的代理可观测性。`v1.105.0-rc.1` 版本发布，带来更优的图像/音频内容处理能力以及通过 cosign 实现的签名验证。

---

### **2. 发布与破坏性变更**  
- **v1.105.0-rc.1**：今日发布，改进了对音频输入的标记计数支持（`input_audio` 块现在被正确计数而非抛出错误），并优化了 Bedrock/Anthropic 模型中结构化输出的处理。  
  🔗 [GitHub 发布页](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-rc.1)  
- **Docker 镜像签名**：所有镜像现已使用 cosign 签名；请使用提交 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中提供的密钥进行验证。  
  🔗 [验证指南](https://docs.sigstore.dev/cosign/overview/)  

> ⚠️ **迁移提示**：依赖 `input_audio` 内容块进行标记计数或成本追踪的用户应尽快升级，以避免静默失败或成本日志错误。

---

### **3. 新模型与硬件支持**  
- **OpenRouter 模型同步**：已添加 7 个新的 OpenRouter 模型条目（包括 `deepseek/deepseek-v4-flash`），并更新了定价层级。  
  🔗 [PR #44533](https://github.com/BerriAI/litellm/pull/44533)  
- **Vertex AI 代理引擎**：新增对代理响应中非文本内容（图像、文件、音频）的正确处理支持——此前这些内容会被静默丢弃。  
  🔗 [问题 #44336](https://github.com/BerriAI/litellm/issues/44336)  
- **Bedrock 原生结构化输出**：正在进行中，旨在为支持的 Claude 模型（如 `claude-opus-4-8`）原生启用 `response_format`。  
  🔗 [问题 #31882](https://github.com/BerriAI/litellm/issues/31882)

---

### **4. 性能与优化**  
- **流式成本准确性**：已应用修复，确保 OpenRouter、Vertex AI 及 Anthropic 的流式响应成本计费准确。特别地，流分块中 JSON 数组的累积现在得到正确处理。  
  🔗 [PR #31879](https://github.com/BerriAI/litellm/pull/31879)，[问题 #44336](https://github.com/BerriAI/litellm/issues/44336)  
- **限流优化**：基于 Redis Lua 脚本的限流机制现已加入超时控制，防止高负载下请求阻塞。  
  🔗 [PR #44530](https://github.com/BerriAI/litellm/pull/44530)  
- **代理连接管理**：已解决低流量时段空闲连接清理问题，降低 PGBouncer 负载。  
  🔗 [问题 #41420](https://github.com/BerriAI/litellm/issues/41420)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|-------|-------------|------------|
| 🟡 高 | [问题 #44336](https://github.com/BerriAI/litellm/issues/44336) | Vertex AI 代理引擎静默丢弃图像/音频/文件内容部分，即使返回 HTTP 200 也生成伪造回答 | ✅ 已在 PR #31879 中修复 |
| 🟡 高 | [问题 #44197](https://github.com/BerriAI/litellm/issues/44197) | 通过 `ChatOpenAI` + LiteLLM 代理调用 Anthropic 模型时，`thinking` 参数未被转发 | 🔧 正在处理（PR #44197） |
| 🟡 中 | [问题 #44047](https://github.com/BerriAI/litellm/issues/44047) | 认证检查中的全局注册表锁缺乏超时机制，存在死锁风险 | ✅ 已提交 PR #44530 |
| 🟢 低 | [问题 #32232](https://github.com/BerriAI/litellm/issues/32232) | Redis Lua 限流器在 SCRIPT 阻断代理（Codis/Twemproxy）后失效 | 🔧 提出部分修复方案 |

---

### **6. 对应用开发者的影响**  
- **成本追踪更准确**：若在代理中使用音频、图像或文件输入（特别是通过 Vertex AI 或 OpenRouter），请立即升级，以避免欠费或静默数据丢失。  
- **代理遥测现可靠**：借助 Lens 中的服务端运行搜索及改进的缓存命中成本语义，现在可在无客户端瓶颈的情况下规模化审计代理行为。  
- **安全加固**：使用 `search_tool_deny_by_default: true` 强制最小权限访问网络搜索工具——这对合规要求高的部署至关重要。  
- **避免死锁**：若在包含 Redis 代理的分布式环境中运行，请确保使用 `v1.105.0-rc.1+`，以防止因认证注册表加载无法超时而导致的请求挂起。  

👉 **行动项**：升级至 `v1.105.0-rc.1`，验证多模态输入的成本日志，并检查代理的 `SERVER_ROOT_PATH` 配置，防止 UI 重载问题。  

---  
*简报生成时间：2026-10-05 | 来源：[BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-10-05**

#### **1. 今日亮点**  
近期构建中出现关键性能下降，影响多GPU张量分片推理和GGUF模型加载，双RTX 5070 Ti配置下的吞吐量从约115 t/s骤降至仅48 t/s。与此同时，音频流水线优化及ROCm/FLUX性能改进取得显著进展，包括融合RoPE支持，使图像生成速度最高提升8%。

#### **2. 发布与破坏性变更**  
无。过去24小时内未发布新版本。

#### **3. 新模型与硬件支持**  
- ✅ **Qwen3-TTS**：通过PR #12646 添加快速微调支持（自回归说话人 + 代码预测器）。  
- ✅ **Anthropic Studio 工具**：已在Studio中启用MCP、Chat with Files及Deep Research功能（PR #12497）。  
- ✅ **ROCm FLUX 优化**：为FLUX.2-klein实现融合RoPE，AMD Radeon 780M上每步图像生成速度提升8%（PR #12701）。  
- ⚠️ **Vulkan GGUF 推理**：在AMD Radeon 780M上因 `ErrorOutOfDeviceMemory` 失败（问题 #12695）；暂无解决方案。

#### **4. 性能与优化**  
- 📉 **严重吞吐量下降**：双GPU环境下使用张量分片模式（`--split-mode tensor`）时，从提交 `b10715-mix-86bd2d3` 起，tokens/sec下降约58%（从~115 t/s降至48 t/s），可能与 `max_cuda_graphs = 64` 相关（问题 #12468）。  
- 🔥 **FLUX 加速**：ROCm上的融合RoPE使FLUX.2-klein生成速度提升**每图8%**，输出像素完全一致（PR #12701）。  
- 💡 **KV缓存警告**：Studio现在会在CUDA/HIP上检测到 `iq4_nl` KV缓存回退至CPU时发出警告，防止无声性能损耗（PR #7008）。  
- 🔄 **并发控制**：通过 `UNSLOTH_API_MAX_CONCURRENCY` 可配置API推理并发上限（PR #5482）。

#### **5. 稳定性与回归**  
| 严重程度 | 问题 | 影响 | 修复状态 |
|--------|------|--------|------------|
| 🔴 高 | [问题 #12468] 张量分片解码变慢（慢2.9倍） | 双GPU用户吞吐量损失超50%；影响所有自建版本自 `b10715-mix-86bd2d3` 起 | 未修复 – 尚未解决 |
| 🔴 高 | [问题 #12372] mmproj-F16.gguf 在生成过程中从磁盘分页 | 吞吐量严重下降；`--mlock` 被拒绝，额外参数被剥离 | 未修复 – 紧急处理 |
| 🔴 高 | [问题 #12695] Vulkan GGUF 在Radeon 780M上失败 | 内存不足错误导致无法推理 | 未修复 – 驱动/后端相关 |
| 🟡 中 | [问题 #12552] 长上下文聊天延迟 | 长对话体验下降 | 未修复 – 细节有限 |
| 🟡 中 | [问题 #12673] llama.cpp/自定义连接时上下文栏未填充 | 使用统计误导 | 未修复 |

> *注：多个高严重性问题正在积极排查中，尤其集中在GPU内存管理与量化模型加载方面。*

#### **6. 对应用开发者的启示**  
- 若依赖多GPU张量分片推理，请避免使用 `b10715-mix-86bd2d3` 及之后的版本——建议暂时使用 `b10687-mix-67dfc8b` 或官方 `ggml-org` 构建，直至回归问题修复。  
- 若部署于AMD ROCm环境，应利用FLUX流水线中新引入的融合RoPE支持以获得更优性能。  
- 生产级API部署时，建议使用 `UNSLOTH_API_MAX_CONCURRENCY` 限制并发数，防止负载下资源耗尽。  
- 使用 `--mlock` 及自定义 `--extra-args` 时需谨慎——新版Studio中这些参数可能被静默忽略（参见 #12372）。  
- 注意监控 `unsloth-cli` 与 `studio` 安装路径，因卸载程序现会提示残留 `uv` 缓存问题（PR #10442）。

🔗 [GitHub Issues](https://github.com/unslothai/unsloth/issues) | [GitHub PRs](https://github.com/unslothai/unsloth/pulls)

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*