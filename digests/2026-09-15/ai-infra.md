# AI 基础设施日报 2026-09-15

> 生成时间: 2026-09-15 00:51 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-09-15**

---

### **1. 生态概览**  
2026年第三季度，AI 推理基础设施格局正快速向高性能、可扩展且支持智能体（agent）的系统收敛。各项目日益聚焦于优化下一代模型——尤其是采用滑动窗口注意力（SWA）的 MoE 架构及混合量化方案，同时拓展对多种硬件的支持，包括 AMD ROCm、Apple MLX 以及嵌入式 NPU。明显趋势是向 *分布式智能体工作负载* 转变，推测解码、前缀缓存和跨节点 KV 共享等技术正在积极开发中。稳定性仍是关键挑战，尤其在高并发场景下，以及在 NVIDIA B300/H20、AMD MI355X 等新型硬件上。

---

### **2. 活动对比**

| 项目       | 开放问题数 | 近24小时合并的PR | 近24小时发布数 | 备注 |
|---------------|-------------|------------------------|----------------------|-------|
| **vLLM**      | 87          | 8                      | 无                 | 高度关注 MoE 内核稳定性和 SWA 优化 |
| **SGLang**    | 143         | 5                      | 无                 | 关键性 GPU 崩溃主导问题追踪；DCP 进展强劲 |
| **llama.cpp** | 124         | 10                     | ✅ v0.4.1            | 重大版本更新，新增模型/硬件支持；修复 macOS PCH 问题 |
| **Ollama**    | 187         | 3                      | ✅ v0.34.1-rc1       | RC 版本聚焦内存安全与智能体可靠性 |
| **LiteLLM**   | 91          | 5                      | 无                 | 关键计费修复已合并；路由逻辑趋于稳定 |
| **Unsloth**   | 112         | 6                      | 无                 | 用户体验与安全修复；Docker 及本地模型集成改善 |

> 🔍 *洞察*：**SGLang** 活动量最高但稳定性最差，而 **llama.cpp** 在发布节奏和新模型支持广度上领先。

---

### **3. 模型支持竞赛**

| 新模型 / 架构               | 支持方                          | 状态 | 核心驱动因素 |
|-------------------------------|-------------------------------|--------|-------------|
| **DeepSeek-V4.1-Flash (SWA)** | vLLM, SGLang（提案）, Unsloth（通过 llama.cpp） | ✅ 完全支持（vLLM） | vLLM 中实现 SWA 限定重播（`#56227`, `#56752`） |
| **Qwen3.5-27B (MXFP4)**      | SGLang, Ollama（请求中）, llama.cpp | ⚠️ 部分支持 | SGLang CI 已包含对 MI35x 的扫描 |
| **Maple 20B-A1B**, **Tencent Hy 4**, **Spark2.5**, **SenseNova U1/U1.5** | **llama.cpp**（v0.4.1） | ✅ 已发布 | 通过单个 PR `#28919` 添加 |
| **Gemma 4**                   | LiteLLM（预览）, SGLang（跟踪中） | 🟡 预览 | LiteLLM 中提供 Mantle 终端点 |
| **GLM-5.3-Flash**             | SGLang, vLLM（ROCm）, llama.cpp | ✅ 支持 | SGLang 在 ROCm 上支持 MXFP4/PTPC FP8 |

> 🏆 **胜者**：**llama.cpp** —— 在多个厂商的五款以上新模型（含闭源专有模型）中最快完成支持。  
> 🥈 **亚军**：**vLLM** —— 在前沿 SWA/MoE 模型的优化处理方面领先，具备深度内核级调优能力。

---

### **4. 性能前沿**

| 优化方向           | 主要推动者 | 关键进展 |
|-------------------------------|------------------|------------------|
| **KV 缓存效率**       | vLLM, SGLang     | SWA 限定重播（vLLM）；分布式 KV 缓存系统（SGLang #21846）；HiCache 内存减少（SGLang #38426） |
| **批处理与并行**    | SGLang, vLLM     | 解码上下文并行（DCP）；流水线 + 推测解码融合（SGLang #30775）；FlashMLA V4.1 KV 记录（vLLM #56893） |
| **量化与内存**     | 所有项目     | MXFP4/NVFP4 KV 记录（vLLM）；Q2_0 GGUF 支持（Ollama）；SYCL 基数选择（llama.cpp）；打包 FP4 存储（SGLang 提案） |
| **分布式服务**       | SGLang, vLLM     | 多解码 P/D 分离修复（vLLM #51681）；DCP + LSE 合并后端（SGLang #29736） |
| **内核级调优**       | vLLM, SGLang     | `dsv4_topk` MoE 崩溃修复（vLLM #56760）；`fi_a2a` 融合（SGLang #29736）；HIP/FATTN-MMA（llama.cpp #28576） |

> 📌 **前沿焦点**：**MoE + SWA** 和 **分布式智能体推理** 已成为主战场，vLLM 与 SGLang 正在大力投入底层内核优化与可扩展架构。

---

### **5. 层级定位**

| 项目       | 核心层级               | 角色概述 |
|---------------|----------------------------|--------------|
| **vLLM**      | 推理引擎           | 高吞吐、GPU 优化的部署引擎；在云规模部署中占主导地位 |
| **SGLang**    | 智能体推理框架 | 分布式执行引擎，专注长上下文智能体、推测解码与多 GPU 扩展 |
| **llama.cpp** | 本地运行时              | 跨平台、支持 CPU/GPU 加速的推理，具备强大的 GGUF 支持；适用于边缘与离线场景 |
| **Ollama**    | 开发者网关 / CLI    | 统一的本地推理接口，集成智能体工具链；连接模型访问与应用流程 |
| **LiteLLM**   | LLM 网关 / 代理        | 多供应商抽象层，支持成本核算、路由与可观测性；生产环境代理栈的核心组件 |
| **Unsloth**   | 智能体工作室 / UI 平台 | 全流程智能体开发环境，支持沙箱化工具执行、聊天回放与用户体验优化 |

> 🧩 **战略差异化**：  
> - **工程师** 更青睐 **vLLM**（性能）和 **llama.cpp**（可移植性）。  
> - **智能体开发者** 依赖 **SGLang**（可扩展性）和 **Unsloth**（用户体验）。  
> - **运维团队** 依赖 **LiteLLM**（计费透明）和 **Ollama**（使用简单）。

---

### **6. 趋势信号**

#### **新兴行业趋势（基于 2026-09-15 活动）：**
1. **MoE + SWA 已成主流**：DeepSeek-V4.1 的 SWA 限定重播已成为标准要求——项目必须为此优化，否则将面临性能下降。
2. **智能体可靠性 > 速度**：优先级已从原始吞吐转向 *状态一致性*、*工具调用保真度* 与 *安全沙箱*——体现在 Unsloth 的工具模式修复和 LiteLLM 的护栏机制强化中。
3. **硬件多样性需原生支持**：ROCm（AMD）、MLX（Apple）、NPU（高通/瑞芯微），甚至 Windows ROCm 已非小众——项目必须尽早应对。
4. **成本透明不可妥协**：LiteLLM 的计费修复反映了多供应商环境中审计需求的上升。
5. **规模化下的稳定性是瓶颈**：尽管性能提升显著，但在 B300/H20 GPU 上的崩溃以及 Jetson/M 系列 Mac 上的内存溢出问题表明，鲁棒性必须优先于功能迭代速度。

#### **开发者应关注事项：**
- ✅ 部署 MoE/SWA 模型时请锁定版本（特别是 vLLM v0.29.0+、SGLang v0.5.13+），直至回归问题解决。
- ✅ 避免混用后端（如 llama.cpp 中的 Vulkan + Hexagon），以防输出损坏。
- ✅ 启用 `OLLAMA_PREFILL_CACHE=1` 与 `--cpu-memory-utilization` 以提升长上下文效率。
- ✅ 使用 LiteLLM 时请密切监控预算日志——过期的支出数据可能触发意外中断。
- ✅ 在负载下测试智能体工作流——许多严重问题（如 `gemma4:26b` EOS 丢失、工具调用截断）仅在类生产环境中暴露。

> 🔮 **最终观点**：AI 推理栈正在迅速成熟——但 *稳定性、安全性与一致性* 现已成为核心区分指标。选择工具不应只看速度，更要考量其在真实智能体负载下的韧性。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-15**

---

### **1. 今日亮点**  
vLLM 项目持续加速对 DeepSeek-V4.1 的支持，两项关键 PR 已合并，实现了编码器端和解码器端的 SWA 限定重放（SWA-bounded replay），这对模型滑动窗口注意力（SWA）机制下的高效推理至关重要。同时，一个重大稳定性修复已合并，解决了在 H20 GPU 上高并发场景下 `dsv4_topk` MoE 内核中非法内存访问的问题——该问题曾被用户频繁报告导致崩溃。这些更新体现了团队在多样化硬件上稳定下一代 MoE 模型的持续努力。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1-Flash**：原生支持通过编码器端（`#56227`）和解码器端（`#56752`）实现的 **SWA 限定重放**，可高效处理模型 128 token 的滑动窗口，无需冗余的 KV 缓存。  
- **ROCm 支持**：扩展至包含 **AMD MI355X (gfx950)** 对 DeepSeek-V4.1 的性能调优（`#56506`），并修复了多解码 P/D 分离服务中的误路由竞争条件问题（`#51681`）。  
- **CPU 内存利用率 CLI 别名**：新增 `--cpu-memory-utilization` 作为 `--gpu-memory-utilization` 的别名，以减少纯 CPU 部署场景下的用户混淆（`#56547`）。  

> 🔗 [PR #56227](https://github.com/vllm-project/vllm/pull/56227) | [PR #56752](https://github.com/vllm-project/vllm/pull/56752) | [PR #56506](https://github.com/vllm-project/vllm/pull/56506) | [PR #56547](https://github.com/vllm-project/vllm/pull/56547)

---

### **4. 性能与优化**  
- **FlashMLA V4.1 KV 记录**：DeepSeek-V4.1 现在使用专用的 MXFP8/NVFP4 KV 记录，并结合融合的超大规模注意力内核，提升效率并降低开销（`#56893`）。  
- **DFlash 推测解码**：在长上下文（约 185k token）场景下被识别为存在 **净性能损失**，原因在于每轮循环需全量重新扫描 KV；暂无修复，但已持续跟踪（`#54691`）。  
- **前缀缓存**：关于 Qwen3.5-27B 前缀缓存性能的讨论正在进行中，此前报告的性能回归问题（`#38988`）仍未解决。  
- **ROCm 优化**：已在 ROCm 上启用 MiniMax-M3 的打包 LBHNC AITER QK-norm 融合，提升了稀疏路径吞吐量（`#54535`）。  

> 🔗 [PR #56893](https://github.com/vllm-project/vllm/pull/56893) | [Issue #54691](https://github.com/vllm-project/vllm/issues/54691) | [PR #54535](https://github.com/vllm-project/vllm/pull/54535)

---

### **5. 稳定性与回归问题**  
- **严重崩溃修复**：在 **NVIDIA H20 (SM90)** 上高并发场景下，`dsv4_topk` MoE 内核的非法内存访问问题已通过 PR `#56760` 修复，当前可通过限制 `max_num_seqs=256` 来规避。  
- **GPU 内存访问错误**：多个报告指出，在 **DGX Spark (SM121)** 上使用 FlashInfer + MTP 推测解码时出现 CUDA 非法内存访问（`#37754`）。  
- **GLM-5.3-Flash 重复缺陷**：在代理类使用场景中，模型会退化为“词语乱炖”现象（`#56605`）。  
- **Triton 内核问题**：在 SM100+ GPU 上修复了 `fp8_ds_mla` 缓存比例不匹配问题（`#49435`）。  
- **KV 卸载完整性**：针对文件系统层级卸载，提出了数据完整性和 I/O 活跃性方面的担忧（`#54363`）。  

> 🔗 [PR #56760](https://github.com/vllm-project/vllm/pull/56760) | [Issue #56605](https://github.com/vllm-project/vllm/issues/56605) | [Issue #37754](https://github.com/vllm-project/vllm/issues/37754) | [Issue #54363](https://github.com/vllm-project/vllm/issues/54363)

---

### **6. 对应用开发者的启示**  
部署 **DeepSeek-V4.1-Flash** 的开发者应预期在最新版 SWA 限定重放功能下获得更高的效率与稳定性，但请避免在 H20 上使用高并发（`max_num_seqs > 256`）场景，直到进一步调优完成。对于 **MoE 模型**，在长上下文场景下使用推测解码需谨慎——DFlash 可能显著降低性能。在 **ROCm** 平台上，请确保使用包含 MiniMax-M3 与 DeepSeek-V4.1 优化内核的最新构建版本。在纯 CPU 环境中，请使用 `--cpu-memory-utilization` 而非 `--gpu-memory-utilization`，以避免混淆。若使用分层存储，建议关注 `#54363` 以评估文件系统卸载的可靠性。最后，建议锁定在 v0.29.0 或更高版本以获取稳定性修复，尤其是使用 DFlash 或 MoE 路由等高级功能时。

> 📌 关键要点：**稳定性正在快速提升，但新一代模型（尤其是 MoE + SWA）仍对配置与硬件高度敏感。务必在接近生产负载的条件下进行测试。**

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-09-15

---

### **1. 今日亮点**

SGLang 继续在可扩展代理推理方向上积极推进，重点突破分布式 KV 缓存系统与解码上下文并行（DCP）技术。针对 B300 与 H20 GPU 上的 CUDA 非法内存访问问题（特别是在 FP8/MegaMoE 路径中）仍属高优先级，凸显底层内核稳定性方面的持续挑战。与此同时，新提交的 PR 已着手解决 NVIDIA 机密计算环境下的核心性能瓶颈，并提升混合模型与多后端部署的兼容性。

---

### **2. 发布与破坏性变更**

过去 24 小时内无报告。未观察到新版本发布或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**

- **SenseNova-U1/U1.5**：通过 [Issue #37742](https://github.com/sgl-project/sglang/issues/37742) 跟踪支持，以官方 OpenSenseNova/SenseNova-U1 为参考。
- **AMD ROCm 支持**：扩大 `GLM-5.3-Flash` 的 CI 覆盖范围，支持 MXFP4 量化及 gfx950 平台上的 PTPC FP8 KDA 投影 ([PR #38764](https://github.com/sgl-project/sglang/pull/38764))。
- **AgentX Qwen3.5 MXFP4 + MTP TP2 系列在 MI35x 上的测试**：已加入 AMD CI 流水线 ([PR #38812](https://github.com/sgl-project/sglang/pull/38812))。
- **DeepSeek V4.1**：提议在 Hopper 架构上将主 KV 缓存存储为压缩后的 FP4 格式 ([Issue #38902](https://github.com/sgl-project/sglang/issues/38902))。

---

### **4. 性能与优化**

- **解码上下文并行（DCP）**：推进融合 `fi_a2a` 与 LSE combine 后端的集成 ([Issue #29736](https://github.com/sgl-project/sglang/issues/29736))，实现大规模解码场景下的高效跨节点通信。
- **流水线并行 × 试探性解码**：正在积极开发以解除流水线并行（PP）与试探性解码之间的互斥关系 ([PR #30775](https://github.com/sgl-project/sglang/pull/30775))，对仅支持 PCIe 的集群实现水平扩展至关重要。
- **机密计算（CC）优化**：两个 PR 修复了 Blackwell 架构下机密计算环境中因同步 D2H 传输导致的调度停滞问题 ([PR #36810](https://github.com/sgl-project/sglang/pull/36810), [#31447](https://github.com/sgl-project/sglang/pull/31447))，恢复重叠调度效率。
- **HiCache 内存效率**：PR #38426 通过仅对生产者层进行主机侧分配，优化 DSA 索引器存储，减少不必要的内存开销。

---

### **5. 稳定性与回归问题**

| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|------------|
| 严重 | [Issue #37559](https://github.com/sgl-project/sglang/issues/37559) | B300 上使用 sgl-deep-gemm 0.1.7 时，MXFP8FP4/W4A8 MegaMoE 路径出现 `CUDA_ERROR_ILLEGAL_ADDRESS` | ❌ 未解决 |
| 严重 | [Issue #37633](https://github.com/sgl-project/sglang/issues/37633) | Qwen3.8-Flash-Next-FP8, H20 TP8 场景下，约 22 个并发请求时触发 QSA 预填充路径硬崩溃 | ❌ 未解决 |
| 高 | [Issue #39342](https://github.com/sgl-project/sglang/issues/39342) | `--enable-mixed-chunk` 导致 mamba radix 缓存检查点损坏，因跳过 `extra_buffer` 写入 | ✅ 修复待合并于 PR #39487 |
| 高 | [Issue #39147](https://github.com/sgl-project/sglang/issues/39147) | HiCacheFile 报告混合缓存池存在不可恢复的前缀 | ⚠️ 部分理解；暂无 PR |
| 中 | [Issue #25551](https://github.com/sgl-project/sglang/issues/25551) | B300 (sm_103) 上 DeepGemm 回归：shared-experts FP8 GEMM 出现 `CUDA_ERROR_ILLEGAL_ADDRESS` | ❌ v0.5.13 是否已修复？ |

> 🔴 **注意**：高端硬件（B300/H20）在启用 FP8/MoE 配置时频繁崩溃，表明底层内核存在不稳定性——这是当前核心关注点。

---

### **6. 对应用开发者的影响**

- **代理类工作负载**：分布式 KV 缓存系统路线图 ([Issue #21846](https://github.com/sgl-project/sglang/issues/21846)) 表明即将支持超大规模代理链与长上下文保留。预计不久将获得更好的可扩展性。
- **多 GPU 部署**：流水线并行 + 试探性解码兼容性正在积极构建中——一旦可用，即可突破仅支持 TP 的限制，在纯 PCIe 集群上实现更大规模扩展。
- **模型可靠性**：在修复落地前，请谨慎在 H20/B300 上部署 Qwen3.8-Flash-Next-FP8 或混合 MoE 模型。监控 `--enable-mixed-chunk` 使用情况，因其存在已知检查点损坏风险。
- **硬件可移植性**：增强的 AMD ROCm 与 NPU 支持拓展了部署选项。建议使用 `hf-hub` 1.0 版本访问私有模型 ([PR #39496](https://github.com/sgl-project/sglang/pull/39496))，避免令牌相关问题。
- **稳定推理**：若在机密计算环境下使用试探性解码，请避免使用 `--disable-overlap-schedule`；务必采用包含异步 D2H 修复的更新版本。

➡️ **建议**：在关键 GPU 回归问题修复前，建议锁定 SGLang 版本，尤其是运行生产级代理工作流且使用 NVIDIA B300/H20 的场景。请持续关注 [Issue #37559](https://github.com/sgl-project/sglang/issues/37559) 与 [PR #39487](https://github.com/sgl-project/sglang/pull/39487) 获取最新进展。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 消息简报 – 2026-09-15**

---

### **1. 今日亮点**  
`v0.4.1` 版本正式发布，新增对 **Maple 20B-A1B**、**Tencent Hy 4** 及 **Spark2.5** 等新模型的完整支持，同时在 JSON 模式处理、聊天解析和服务器进程管理等后端功能上实现显著改进。关键性能与稳定性优化包括：GPU 内核优化（HIP/FATTN-MMA）、SYCL 内存池修复，以及针对 macOS 预编译头文件（PCH）导致堆损坏问题的重大修复。

---

### **2. 发布与破坏性变更**  
- **v0.4.1** 已发布：[GitHub 发布页](https://github.com/ggml-org/llama.cpp/releases/tag/v0.4.1)  
- **API 变更**：`llama_sampler_chain_n()` 现返回 `int32_t` 而非 `int` — 请确保下游绑定库同步更新。  
- **CI/CD 改进**：新增 x64 与 arm64 架构的 Ubuntu-CUDA 构建（12.8/13.3）；CUDA arm64 构建启用 GCC 14。  
- **macOS Apple Silicon 构建**：新的 arm64 构建版本已上线 [GitHub 发布页](https://github.com/ggml-org/llama.cpp/releases/download/b10964)。

---

### **3. 新模型与硬件支持**  
- **新增模型**：  
  - Maple 20B-A1B ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - Tencent Hy 4 ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - Spark2.5 ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  
  - SenseNova U1 ([PR #28919](https://github.com/ggml-org/llama.cpp/pull/28919))  

- **硬件与后端增强**：  
  - HIP/ROCm：CDNA 设备上通过 `fattn-mma` 实现 FP32 累加 (#28576)。  
  - SYCL：为大 `k` 值的 `top_k` 引入基数选择（radix select），支持 GPU 居住排序 (#28670)。  
  - Vulkan：修复高负载下性能下降及 O(N²) 回退路径的问题 (#24066, #27638)。  
  - Metal：修复系统负载下音频损坏问题 (#28441)。  
  - WebGPU：修复 macOS 测试套件中的崩溃问题 (#28722)。  

---

### **4. 性能与优化**  
- **内核级优化**：  
  - HIP：CDNA 设备上 `fattn-mma` 使用 fp32 累加器 → 提升数值稳定性和吞吐量。  
  - SYCL：将 MKL-FA softmax 加载合并为更少的工作项 → 降低内核启动开销 (#28918)。  
  - CUDA：重构 Flash Attention 共享内存混洗逻辑（开发中），以提升 SM 利用率 (#28536)。  
- **内存效率**：  
  - 修复睡眠/唤醒后 `mmproj` 内存边际错误增加的问题 (#28233, #26401)。  
  - 避免模型重载时重复添加内存边际。  
- **延迟降低**：  
  - 将 `llama_n_rs_seq` 移至 `llama_decode` 之前，避免不必要的状态更新 (#28749)。  
  - 优化 SYCL 后端的临时存储复用，减少分配抖动 (#28704)。  

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR / 说明 |
|------|----------|--------|----------------|
| [问题 #24066](https://github.com/ggml-org/llama.cpp/issues/24066): RX 6600 上 Vulkan 性能下降 | 高 | 开放 | 最近构建中重现；关联 `b9484` |
| [问题 #25808](https://github.com/ggml-org/llama.cpp/issues/25808): SYCL 在 `GGML_SYCL_DEVICE_ARCH=xe2` 下段错误 | 严重 | 已关闭 | 可能由 CI 变更解决 |
| [问题 #28753](https://github.com/ggml-org/llama.cpp/issues/28753): GGML 崩溃 — 非预期的图重新分配 | 高 | 开放 | 与调度器拆分相关；暂无修复 |
| [问题 #28858](https://github.com/ggml-org/llama.cpp/issues/28858): macOS arm64 因 PCH 导致堆损坏 | 严重 | 已关闭 | 通过禁用 PCH 在 `b10955` 修复 (#28882) |
| [问题 #28860](https://github.com/ggml-org/llama.cpp/issues/28860): SYCL 使用 `ngram-mod` 时极端临时存储分配（>2GB） | 高 | 开放 | 阻碍低内存系统部署 |
| [问题 #2891](https://github.com/ggml-org/llama.cpp/issues/2891): Vulkan + Hexagon 后端混合使用时输出乱码 | 高 | 已关闭 | 确定但无效输出，仅在混合后端时出现 |

> ✅ **已修复**：macOS 堆损坏（`b10955`）——已在 `v0.4.1` 中确认稳定。  
> ⚠️ **严重风险**：多个 SYCL 崩溃与内存问题仍开放；使用 Intel Arc 显卡的开发者应密切监控。

---

### **6. 对应用开发者的意义**  
- **模型集成者**：新增的 **Maple**、**Tencent Hy 4** 与 **SenseNova U1** 扩展了本地部署模型的选择范围。若避免双 Arc 配置，可安全使用 `--model-draft` 搭配 DFlash2（详见 #28778）。  
- **服务部署者**：升级至 `v0.4.1` 以获得改进的日志记录、子进程管理及 `/metrics` 接口的修复密钥处理能力（#28915）。  
- **智能体构建者**：通过 C API 暴露推测解码功能的进展已追踪于 [#27469](https://github.com/ggml-org/llama.cpp/issues/27469)；预计不久将开放公共接口。  
- **多 GPU 用户**：避免同时使用 Vulkan 与 Hexagon 后端——已知会导致输出乱码（#2891）。  
- **性能调优**：若使用 SYCL 或 Vulkan，建议在 #28860 修复前避免 `ngram-mod`。对于高 `k` 值的 top-k 采样，推荐使用 SYCL 新增的基数选择路径（#28670）以获得更好可扩展性。  

> 🔗 **推荐操作**：  
> - 立即升级至 `v0.4.1` 以保障稳定性。  
> - 审查 API 变更（`llama_sampler_chain_n` 返回类型）。  
> - 若使用 Intel Arc GPU，需关注 SYCL 相关问题。  
> - 在双 GPU 配置下谨慎测试草稿模型加载。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-15**

---

### **1. 今日亮点**  
最新发布的 `v0.34.1-rc1` 版本聚焦于 MLX 后端模型的稳定性与内存管理，尤其针对 Apple Silicon 与 Jetson 设备上的前缀缓存淘汰及 OOM 处理问题。关键修复包括解决工具调用被静默丢弃、结构化输出格式错误（如 JSON 前导点）以及间歇性“模型未找到”错误——这些是使用长上下文工作流的代理开发者的重大关切。

---

### **2. 发布与破坏性变更**  
- **`v0.34.1-rc1`**:  
  - ✅ *App*: 修复 ChatGPT 模型选择器间距问题（轻微用户体验优化）。  
  - 📦 *MLX Runner*: 现在加载模型前会检查系统剩余内存；主动淘汰旧运行器以防止 OOM。  
  - 🔒 *LLM Core*: 将 token 重复限制提高至 100，并返回明确错误而非静默截断。  
  - ⚠️ *API 废弃*: `typical_p` 参数在新模型创建中已废弃（仅保留用于旧版 GGUF 模型）。[PR #18448](https://github.com/ollama/ollama/pull/18448)

---

### **3. 新模型与硬件支持**  
- **硬件**:  
  - ✅ **高通 IQ-9075 NPU/GPU** 支持请求 ([#18445](https://github.com/ollama/ollama/issues/18445))。  
  - ✅ **瑞芯微 NPU (RK3588/RK3576)** 支持请求 ([#9268](https://github.com/ollama/ollama/issues/9268))。  
  - ✅ **Windows 上的 ROCm 10** 支持请求 ([#18435](https://github.com/ollama/ollama/issues/18435))。  
- **量化**:  
  - ✅ **Q2_0 GGUF 张量** 现已在 `ggml` 后端中得到支持 ([PR #18443](https://github.com/ollama/ollama/pull/18443)) — 修复了使用该格式模型时的导入失败问题。

---

### **4. 性能与优化**  
- **MLX 前缀缓存**:  
  - 修复 8 GiB 硬性上限导致 32GB Apple Silicon Mac 出现严重交换的问题 ([#18131](https://github.com/ollama/ollama/issues/18131))。  
  - 通过设置 `OLLAMA_PREFILL_CACHE=1` 添加实验性预填充缓存跨运行器重载持久化功能 ([PR #17953](https://github.com/ollama/ollama/pull/17953)) — 降低冗余预填充计算开销。  
- **加载时间与内存**:  
  - MLX 运行器现在可检测卡顿加载并避免过早超时取消 ([PR #17834](https://github.com/ollama/ollama/pull/17834))。  
  - Hugging Face 直接 URL 解析时间限制为 10 秒，防止 30 秒上下文耗尽 ([PR #18437](https://github.com/ollama/ollama/pull/18437))。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|--------|------|--------|--------|
| 🔴 高 | `gemma4:26b` 并发解码在 `num_predict` 时丢失 EOS | 开放 | [#18442](https://github.com/ollama/ollama/issues/18442) |
| 🔴 高 | `kimi-k3:cloud` 在工具角色消息中包含图像内容时崩溃 | 开放 | [#18426](https://github.com/ollama/ollama/issues/18426) |
| 🔴 高 | Jetson Orin Nano 8GB：Gemma 4 E4B 投影器即使配置为 CPU 投影仍导致主机 OOM | 开放 | [#18396](https://github.com/ollama/ollama/issues/18396) |
| 🔴 高 | MLX 运行器在长上下文期间因未处理分页快照加载而发生致命 OOM | 开放 | [#18231](https://github.com/ollama/ollama/issues/18231) |
| 🟡 中 | 工具调用对象键含空格时被静默丢弃 | 开放 | [#18390](https://github.com/ollama/ollama/issues/18390) |
| 🟡 中 | MLX 引擎生成的结构化输出前缀出现多余 `.` | 开放 | [#18441](https://github.com/ollama/ollama/issues/18441) |
| 🟡 中 | `previous_response_id` 续接请求返回空响应 | 开放 | [#18419](https://github.com/ollama/ollama/issues/18419) |
| 🟡 中 | 因大小写规范化缺陷导致间歇性“模型未找到”错误 | 开放 | [#18438](https://github.com/ollama/ollama/pull/18438) |

> 注：多个高危问题影响多代理工作流、多模态推理及长上下文稳定性——尤其在 Apple Silicon 与嵌入式平台。

---

### **6. 对应用开发者的影响**  
- **代理工作流**: 在修复落地前，避免在生产环境使用 `gemma4:26b` 与 `kimi-k3:cloud`；可暂用 `qwen3.8:27b` 作为稳定替代方案。  
- **长上下文场景**: 启用 `OLLAMA_PREFILL_CACHE=1` 可减少重复请求的延迟；在 M 系列 Mac 与 Jetson 设备上需密切监控内存使用情况。  
- **结构化输出**: 在 [#18441](https://github.com/ollama/ollama/issues/18441) 修复前，请勿依赖 MLX 输出中 `format: json_object` 的结果——可能产生无效 JSON。  
- **工具集成**: 须谨慎处理 `previous_response_id` —— 当前接口返回空响应而非拒绝非法续接。若可用，可使用 `openai: support previous_response_id` ([PR #18434](https://github.com/ollama/ollama/pull/18434))。  
- **部署建议**: 针对边缘/嵌入式设备（Jetson、瑞芯微），在内存压力下测试模型加载；尽可能采用基于 CPU 的投影或更小量化等级（如 Q2_0）。

> 💡 **实用技巧**: 使用 [LLMxRay](https://github.com/ollama/ollama/pull/18444) 实现本地可观测性——提供实时 token 流诊断、提示缓存复用指标及端点协议对比功能。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM Digest – 2026-09-15**

---

### **1. 今日亮点**  
LiteLLM 项目持续聚焦计费准确性与运营可靠性，针对 Gemini 嵌入（embeddings）的费用计算以及模型路由逻辑进行了关键修复。值得注意的是，已合并一项修复，可防止在 `gemini-embedding-2` 中对音频模态重复计费，并确保当部署 ID 与模型名称相同时，加权路由仍能正常生效。这些变更直接关系到多提供商环境下支出完整性与推理公平性。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未发布新版本。但已有数项**关键错误修复**合并至主分支，生产环境中可能需要关注：

- ✅ **[修复：费用核算]** `gemini-embedding-2` 现在仅按 token 计费，已移除对音频的重复计费（PR [#41157](https://github.com/BerriAI/litellm/pull/41157), [#41151](https://github.com/BerriAI/litellm/pull/41151))  
- ✅ **[修复：路由逻辑]** 即使 `deployment.id == model_name`，加权路由也保持激活状态（PR [#41156](https://github.com/BerriAI/litellm/pull/41156))  
- ✅ **[修复：用量聚合]** 通过限制 `api_key` 汇总范围，防止管理后台用量仪表盘出现内存溢出（PR [#41155](https://github.com/BerriAI/litellm/pull/41155))

> 💡 *建议：* 若您依赖精确的费用报告或使用命名部署进行动态路由，请升级至最新 main 分支，或等待 v1.88.0 及以上版本。

---

### **3. 新模型与硬件支持**  
- ✅ **Gemma 4** 通过 Mantle 端点支持新增（问题 [#30657](https://github.com/BerriAI/litellm/issues/30657)，PR 待审）  
- ✅ **Microsoft Agent 365 MCP 工具调用防护机制** 现已在执行前强制启用（PR [#38241](https://github.com/BerriAI/litellm/pull/38241))  
- ✅ **Bedrock 上下文锚定** 现已适用于普通聊天消息（PR [#41132](https://github.com/BerriAI/litellm/pull/41132))  

> 📌 *注意：* Gemma 4 支持仍处于预览阶段；请验证其与您提供商配置的兼容性。

---

### **4. 性能与优化**  
- 🔧 **Rust 桥接生命周期重构**（PR [#41153](https://github.com/BerriAI/litellm/pull/41153)）在公开 API 层建立了统一的 token 计数边界，减少内部状态漂移，提升可扩展性。  
- 🔧 **无状态重放身份标识** 引入（PR [#41149](https://github.com/BerriAI/litellm/pull/41149)），可在测试中实现严格请求匹配，无需依赖语义头部。  
- 🔧 **Vertex AI 定价同步** 更新了 4 个模型（PR [#41154](https://github.com/BerriAI/litellm/pull/41154)），与官方定价一致，降低计费差异。  

> ⚙️ *影响：* 提升测试可靠性，高吞吐环境内存开销更低，成本建模更准确。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| 尽管预算有效，仍因过期支出触发 `BudgetExceededError`（问题 [#27735](https://github.com/BerriAI/litellm/issues/27735)) | 高 | 开放 | ❌ 尚无修复 |
| 离线主机健康检查失败（问题 [#34281](https://github.com/BerriAI/litellm/issues/34281)) | 中 | 开放 | ❌ 尚无修复 |
| `/v1/images/edits` 带 mask 请求因流式读取错误失败（问题 [#26552](https://github.com/BerriAI/litellm/issues/26552)) | 中 | 已关闭 | ✅ 已修复 |
| 管理员 UI 触发全量重载 + 预加载风暴（问题 [#41029](https://github.com/BerriAI/litellm/issues/41029)) | 中 | 已关闭 | ✅ 已修复 |
| `INFO` 日志无法通过 `LITELLM_LOG=ERROR` 禁用（问题 [#10788](https://github.com/BerriAI/litellm/issues/10788)) | 低 | 开放 | ❌ 尚无修复 |

> ⚠️ **重大风险：** 因过期支出数据导致预算超支，可能引发意外服务中断。请密切监控虚拟密钥使用情况。

---

### **6. 对应用开发者的影响**  
- **审计您的费用追踪**：确保未在 `gemini-embedding-2` 上被重复收费——此前存在音频双计费问题。请升级至最新 main 分支，或等待 v1.88.0。
- **规避路由陷阱**：若您将 `model_name` 用作部署 ID，需确认加权路由未被忽略（已在 PR [#41156](https://github.com/BerriAI/litellm/pull/41156) 修复）。
- **强化工具调用安全**：使用新的 `agent_365` 防护机制（PR [#38241](https://github.com/BerriAI/litellm/pull/38241)），以强制执行 Microsoft Agent 365 集成的治理策略。
- **调整日志级别**：持续输出 `INFO` 日志的问题（#10788）可能导致可观测性堆栈混乱——建议在日志层过滤，或后续升级。
- **准备弃用预警**：团队管理员将在模型弃用前收到邮件通知（PR [#41134](https://github.com/BerriAI/litellm/pull/41134)）——有助于提前规划迁移。

> 🛠️ *可操作提示：* 启用 `user_email` 在支出日志中的持久化记录（PR [#41150](https://github.com/BerriAI/litellm/pull/41150)），以增强代理日志的可审计性与调试能力。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-15**

---

### **1. 今日亮点**  
Unsloth 持续优化 Studio UI 与后端稳定性，修复了模型运行稳定性、沙箱安全性和工具调用保真度等关键问题。主要更新包括：修复慢速 CPU 主机上持续出现的 `Error: terminated` 错误（#10911）、改进嵌套工具调用字段的处理逻辑（#10935），以及增强音频转录和图像生成工作流的用户体验（#10894）。项目在 Docker 可用性方面也取得进展，提升了容器化运行时本地模型的可见性（#10936）并减少了构建缓存膨胀问题（#10959）。

---

### **2. 发布与破坏性变更**  
过去 24 小时内无报告。

---

### **3. 新模型与硬件支持**  
- ✅ **AMD ROCm 支持（Docker）**：`unsloth/unsloth-rocm` Docker 镜像现已与 NVIDIA/Blackwell 版本对齐，通过 `#6230` 实现完整的 ROCm（RDNA2/3/4, CDNA）GPU 支持。  
- ✅ **Docker 中的本地模型发现**：`run.sh` 现在在以 Docker 运行 Studio 时自动挂载 LM Studio、Ollama 与 Hermes 模型目录，使本地托管的 GGUF 模型可被识别（#10936）。  
- 🟡 **MLX 原生支持**：继续优化 Apple MLX 路径行为，包括修复回复中重复拼接 `<|channel>` 的问题（#10905）。

---

### **4. 性能与优化**  
- 🔥 **构建缓存清理**：Docker 发布任务现在会丢弃构建缓存（cache-from/to），以减少镜像仓库存储占用——共释放 68.9 GB 空间，覆盖 `unsloth/unsloth` 标签（#10959）。  
- ⚙️ **减少冗余正则表达式编译**：通过预先编译一次替代模式，解决了阻塞命令检查中重复调用 `re.escape` 的问题（#10927）。  
- 📈 **提升聊天回放保真度**：`#10910` 引入对持久运行的忠实回放，完整保留工具卡片状态、流式输出及思考卡片时间戳——对代理一致性至关重要。  
- 💾 **内存效率优化**：解决 llama.cpp 升级后内存增长问题（#10921），并优化认证文件访问方式，防止沙箱泄露（#10895）。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 修复状态 | 链接 |
|--------|------|------|----------|------|
| 严重 | `unsloth start pi` 在慢速 CPU 上失败 | 重试后频繁出现 `Error: terminated`；会话中途崩溃 | ✅ PR #10911（修复预填充阶段 SSE 流超时） | [Issue #10912](https://github.com/unslothai/unsloth/issues/10912) |
| 高 | 工具调用截断与去重 | MCP 调用被系统性截断；`start_cursor` 等关键字段因顺序错乱而丢失 | ✅ PR #10935（强制字段顺序） | [Issue #10839](https://github.com/unslothai/unsloth/issues/10839) |
| 高 | 操作系统级命令的安全绕过 | 尽管安全检查已阻止 `rm`，但 `os.remove()` 仍被执行 | ✅ PR #10907（添加沙箱感知提示，防止文件 I/O） | [Issue #10835](https://github.com/unslothai/unsloth/issues/10835) |
| 中 | Gemma 4 在图像输入时崩溃 | 因默认 `ubatch` 太小导致 `GGML_ASSERT` 失败 | ✅ PR #10559（修复待合并） | [Issue #10559](https://github.com/unslothai/unsloth/issues/10559) |
| 中 | 被撤销的 HF 模型报错误导 | 加载本地存储但已被撤销的模型时日志混乱 | 开放问题 | [Issue #10929](https://github.com/unslothai/unsloth/issues/10929) |

---

### **6. 对应用开发者的启示**  
- **代理可靠性提升**：工具调用的忠实回放（#10910）与状态一致保存，使跨会话的代理行为更加可预测。  
- **安全性增强**：新增的沙箱感知文件访问检查（#10907）与严格的工具调用字段顺序（#10935）有效降低意外执行或数据泄露风险——对生产环境代理至关重要。  
- **本地模型集成更顺畅**：Docker 用户现在可直接使用现有的 LM Studio/Ollama 模型，无需手动挂载卷——极大促进开发到生产的连续性。  
- **低配硬件需性能调优**：若部署于以 CPU 为主的系统（如边缘设备），请关注 `terminated` 错误，考虑增加交换空间或减小 `ubatch` 大小。  
- **避免已弃用模式**：建议在消息中使用 `name` 字段（现已通过 `#10937` 支持），以确保与 LangChain、AutoGen 等框架兼容。

> 🔗 *探索相关 PR 与问题：[unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*