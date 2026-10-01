# AI 基础设施日报 2026-10-01

> 生成时间: 2026-10-01 01:27 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 推理基础设施生态报告 – 2026-10-01**

---

### **1. 生态概览**  
2026年10月，AI 推理基础设施领域呈现出高度专业化、硬件支持快速演进以及分布式服务与模型编排日趋成熟的特征。各项目正聚焦于在多样后端（尤其是 NVIDIA Blackwell (SM120)、AMD ROCm 10.0 与 Apple MLX）上实现高性能、低延迟的推理能力，同时积极应对推测解码、内存安全与安全性等关键稳定性问题。以智能体为中心的工作流兴起，推动了对结构化输出保真度、工具调用可靠性及成本感知代理系统的需求。随着模型规模与复杂度持续增长（如 Qwen3.8-Flash-Next、Gluon MegaMoE），生态系统正从单体部署转向模块化、可组合的分层架构，各层职责边界日益清晰。

---

### **2. 活动对比**

| 项目       | 开放问题数（↑） | 合并的 PR 数（↑） | 最新发布版本 | 备注 |
|---------------|------------------|------------------|--------------------|-------|
| **vLLM**      | 124 (+3)         | 47 (+5)          | 无               | 专注 SM120/ROCm 稳定性；DFlash 图捕获性能提升 |
| **SGLang**    | 159 (+5)         | 42 (+6)          | 无               | 重点投入 HiSparse/HiCache；权重缓存守护进程上线 |
| **llama.cpp** | 221 (+8)         | 36 (+4)          | 无               | 大量针对特定后端的修复（Metal/Vulkan/OCL） |
| **Ollama**    | 183 (+7)         | 28 (+3)          | v0.35.0（预发布） | CUDA/MLX 上存在稳定性问题；建议谨慎使用预发布版本 |
| **LiteLLM**   | 176 (+4)         | 39 (+5)          | v1.105.0-dev.1     | 通过 cosign 签名加强安全；护栏修复 |
| **Unsloth**   | 132 (+6)         | 24 (+3)          | 无               | UI/UX 与语音模式重构；延迟回归问题受关注 |

> ✅ *趋势：SGLang 与 vLLM 在架构创新方面领先；llama.cpp 与 Unsloth 在底层后端修复方面占据主导地位。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**          | ✅ (SM120, GB10) | ✅ (HiSparse) | ✅ (MTP) | ⚠️ (FP8 非确定性) | ❌ | ❌ |
| **DeepSeek-V4.1-Flash**         | ✅ (SM120) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Prism Bonsai 2 27B**           | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Gluon MegaMoE**                 | ❌ | ✅ (路线图) | ❌ | ❌ | ❌ | ❌ |
| **Kimi-K3 MXFP4**                | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Bongard (T5Gemma2)**           | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **System One (MLX)**             | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

> 🏆 **领先者**：**SGLang** 在先进模型支持方面领先，尤其在长上下文与 ROCm 优化模型方面表现突出。  
> 🥈 **亚军**：**llama.cpp** 拥有最广泛的底层模型覆盖，包括 Prism Bonsai 2 等小众格式以及 Jinja 支持的 LLM-jp-4.1。

---

### **4. 性能前沿**

| 优化方向              | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **KV 缓存与内存管理** | ✅✅ | ✅✅ (HiCache) | ✅ | ✅ (代理感知 blob) | ✅ | ❌ |
| **推测解码**         | ✅✅ (DFlash 图) | ✅ (MiMo + FA4) | ✅ (批处理顺序修复) | ⚠️ (崩溃) | ✅ | ❌ |
| **内核融合与底层调优** | ✅ (融合 Q 内核) | ✅ (MLA+RoPE+KV 写入) | ✅ (FWHT, MMVF) | ❌ | ❌ | ❌ |
| **批处理与并行**       | ✅ (动态预填充 CP) | ✅ (上下文并行) | ✅ (全块调度) | ⚠️ (线程配额争用) | ✅ | ❌ |
| **量化效率**       | ✅ (FP8, NIXL 合并) | ✅ (MXFP4, FP8 KDA) | ✅ (BF16/MXFP4) | ✅ (nvfp4 停顿) | ✅ | ❌ |

> 🔥 **前沿领先者**：  
> - **vLLM**：在 GPU 级别内核优化与推测解码扩展性方面处于领先地位。  
> - **SGLang**：开创分层缓存与高效上下文并行技术，适用于超长序列场景。  
> - **llama.cpp**：在跨平台内核调优与量化执行效率方面占据主导。

---

### **5. 层级定位**

| 项目       | 主要层级                  | 次要角色                     | 核心差异点 |
|---------------|-------------------------------|------------------------------------|--------------------|
| **vLLM**      | **推理引擎**          | 服务网关（通过 `serve`）      | H100/Blackwell 上吞吐最高；优化的 CUDA 图 |
| **SGLang**    | **推理引擎 + 网关** | 分布式服务、智能体编排 | 分层缓存（HiCache）、动态预填充 CP |
| **llama.cpp** | **本地运行时 / 边缘推理** | 本地部署的 CLI/工具链 | 跨后端可移植性（Metal/Vulkan/OpenCL）；依赖极低 |
| **Ollama**    | **网关 / 本地运行时**   | 模型仓库 + API 抽象        | 统一用户体验；支持 MLX/Windows；容器友好 |
| **LiteLLM**   | **LLM 网关 / 编排** | 成本追踪、降级路由    | 多提供商路由、审计日志、服务层级控制 |
| **Unsloth**   | **智能体平台 / 工作台**   | 微调、语音/附件处理 | 原生音频引擎、文档保真度、多用户状态管理 |

> 📊 **层级分层**：  
> - **引擎层**：vLLM、SGLang  
> - **运行时层**：llama.cpp  
> - **网关/编排层**：LiteLLM、Ollama  
> - **应用平台层**：Unsloth  

---

### **6. 趋势信号**

#### **今日简报中的新兴趋势**：
1. **硬件特定优化已成为必备项**  
   - 项目正竞速支持 **SM120（Blackwell）**、**ROCm 10.0** 与 **Apple MLX** —— 每个平台均需独特的内核调优、内存布局调整与驱动兼容性修复。  
   - 示例：vLLM 的 DFlash 图捕获与 SGLang 的 HiCache 均针对特定架构定制。

2. **推测解码趋于成熟但仍具风险**  
   - 尽管 vLLM 与 SGLang 在 MTP 与 MiMo 方面取得突破，但 **非确定性（vLLM #54521）** 与 **崩溃（SGLang #40094）** 仍是关键风险——尤其在大规模场景下。  
   - 开发者应使用 `--enforce-eager` 或避免高并发推测路径，直至稳定性改善。

3. **安全与供应链完整性受到高度重视**  
   - LiteLLM 现已采用 **cosign 签名的 Docker 镜像**，标志着向默认安全部署流程的转变。  
   - Ollama 的 RCE 风险（#30165）与 Unsloth 的会话同步漏洞表明，信任边界已超越模型本身。

4. **智能体工作流要求保真度与可靠性**  
   - SGLang 的静默文本丢失、Ollama 的 JSON Schema 损坏、Unsloth 的重复 `toolCallId` 表明，**结构化输出正确性已成为首要关切**。  
   - 如 `vllm-bench`、`Mooncake trace replay` 与 `LiteLLM spend logging` 等工具正成为验证不可或缺的组成部分。

5. **复杂性暴露了性能差距**  
   - Unsloth 在 OpenAI 兼容接口调用中约 1.2 秒的固定延迟揭示了：**抽象层可能引入隐藏开销**——即使使用如 `llama-server` 这类高速引擎也是如此。

---

### **面向应用开发者的建议**
- **生产级推理**：优先选择 **vLLM** 或 **SGLang** 以在现代 GPU 上获得最佳性能；在 #54521 修复前，避免在 Qwen3.8-Flash-Next 上使用推测解码。
- **边缘/本地部署**：选择 **llama.cpp** 以实现最大可移植性，并对量化与内核拥有完全控制权。
- **智能体系统**：优先考虑 **LiteLLM** 实现成本感知路由，**SGLang** 提供长上下文可靠性；务必严格验证结构化输出。
- **语音/文档智能体**：探索 **Unsloth 的 audio.cpp** 与 **Ollama 的 System One 支持**，但需测试已知回归问题（如图像丢弃）。
- **始终验证**：使用真实模型与硬件栈进行端到端测试——没有任何项目能免疫静默失败或性能退化。

> ✅ **最终提示**：基础设施生态已不再仅关乎速度——它关乎**规模化下的可靠性、安全性与正确性**。选择工具时，不仅要看基准测试，更要看其在真实世界中的韧性。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-01

---

### **1. 今日亮点**  
vLLM 项目持续聚焦于在多种硬件上的稳定性与性能，针对 Qwen3.8-Flash-Next 与 DeepSeek-V4.1-Flash 在 SM120（Blackwell）上的推测解码正确性问题进行了关键修复。一项重要 PR 通过包含上下文合并与锚点步骤，改进了 DFlash/DSpark CUDA 图捕获，显著提升了高并发推理的吞吐量。与此同时，Rust 前端逐步成熟，基准测试一致性得到改善，并新增了类似 Mooncake 的追踪回放功能。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未观察到新版本发布或破坏性 API/配置更改。`vllm-bench` 客户端现在会在温度参数保持服务器默认值时发出警告（PR #59247），但此行为不构成破坏性变更。

---

### **3. 新模型与硬件支持**  
- **DeepSeek-V4.1-Flash**：已添加对 SM120（RTX PRO 6000 Blackwell）的支持，当前正致力于解决低解码吞吐量问题（Issue #56892，Issue #59203）。  
- **Qwen3.8-Flash-Next**：现已在 GB10（sm_121）上实现完整兼容，正在积极处理确定性贪婪解码问题（Issue #54521）以及 CPU offload 死锁问题（Issue #53960）。  
- **ROCm 10.0（TheRock）**：现已成为默认 CI 镜像；为保持向后兼容，保留 ROCm 7.2（PR #58761）。  
- **Intel GPU（Arc B70/B60）**：持续聚焦于修复 MTP 推测解码期间的崩溃问题（PR #56917）及 MoE 选择器问题（Issue #43750）。  

> 🔗 [ROCm 10.0 默认镜像](https://github.com/vllm-project/vllm/pull/58761) | [SM120 支持](https://github.com/vllm-project/vllm/issues/59203)

---

### **4. 性能与优化**  
- **DFlash/DSpark 图捕获**：PR #59511 在草稿 CUDA 图中捕获上下文合并与锚点步骤，减少不必要的令牌预算预留（PR #59468），显著提升大规模推测解码的吞吐量。  
- **GLM-5.3-Flash**：PR #59084 将 Q 投影融合进 `fused_q` 内核，在 78 层中每层实现 **1.27–1.64 倍加速**，每 TP rank 约减少 78 次内核调用。  
- **ROCm 优化**：  
  - PR #58381：在 MLA 元数据构建中将主机调度次数减少约 21 倍（微基准测试）。  
  - PR #57978：并行化 AITER MLA 页面索引扩展操作，按令牌分块处理——显著降低内核级延迟。  
- **权重加载**：在 GB10 上，PR #58726 修复了 mmap-backed safetensors 到 H2D 复制速度慢的问题，缓解了关键性能瓶颈。  
- **KV 连接器（NIXL）**：PR #54483 将跨缓存组的主机缓冲区 KV 复制进行聚合，提升了远程及基于 CPU 的 KV 缓冲区的 I/O 效率。

> 🔗 [融合 Q 内核性能](https://github.com/vllm-project/vllm/pull/59084) | [DFlash 图捕获](https://github.com/vllm-project/vllm/pull/59511) | [ROCm 主机调度修复](https://github.com/vllm-project/vllm/pull/58381)

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 修复状态 |
|---------|-------|-------------|------------|
| 严重 | [#54521](https://github.com/vllm-project/vllm/issues/54521) | Qwen3.8-Flash-Next FP8 在上下文接近 `indexer_budget` 时出现非确定性贪婪解码 | 进行中 |
| 高 | [#59203](https://github.com/vllm-project/vllm/issues/59203) | DeepSeek-V4.1-Flash 在 SM120 上因缺少 `page_block_size=32` 的稀疏 MLA 内核而崩溃 | 正在调查 |
| 高 | [#53960](https://github.com/vllm-project/vllm/issues/53960) | `VLLM_PLE_CPU_OFFLOAD=1` 在单卡 GB10 环境下引擎初始化阶段发生死锁 | 可复现，暂无修复方案 |
| 中等 | [#57562](https://github.com/vllm-project/vllm/issues/57562) | `AsyncScheduler` 在分块预填充 + 并发场景下出现下溢（自 0.24.0 版本引入的回归） | 正在审查 |
| 中等 | [#57680](https://github.com/vllm-project/vllm/issues/57680) | H100 上从 0.26.0 到 0.29.0 解码吞吐量下降约 3.3 倍 | 回归确认，根本原因未知 |

> 🔗 [非确定性解码](https://github.com/vllm-project/vllm/issues/54521) | [SM120 内核崩溃](https://github.com/vllm-project/vllm/issues/59203) | [H100 吞吐量下降](https://github.com/vllm-project/vllm/issues/57680)

---

### **6. 对应用开发者的启示**  
- **使用推测解码的用户**：在 Qwen3.8-Flash-Next 与 DeepSeek-V4.1-Flash 上使用 `MTP` 时需谨慎——长序列或特定硬件（GB10/SM120）下可能出现非确定性行为或崩溃。建议临时使用 `--enforce-eager` 作为规避方案，直至修复上线。  
- **采用 Rust 前端的开发者**：基准测试一致性正持续提升（`vllm-bench` 现已匹配 `serve` 延迟），且已支持 Mooncake 风格的追踪回放功能（PR #55937）。建议用于可复现的负载测试。  
- **高并发系统用户**：通过启用完整的 CUDA 图捕获（PR #59511）优化 DFlash/DSpark，避免令牌预算超额分配，提升系统可扩展性。  
- **内存受限部署**：利用 `KV 缓存修剪`（跟踪于 #44300）和 NIXL 聚合（#54483）降低 GPU 内存压力，提升吞吐量。  
- **模型选型建议**：在 AMD GPU 上追求最佳性能，应使用经优化的 Qwen3.8-2.4T-A95B 构建版本（#57149），并关注 ROCm 特有的回归问题（#56506）。  

> ✅ **可操作提示**：若使用 `Qwen3.8-Flash-Next` 并搭配 `FP8` 量化，请避免提示长度接近 `indexer_budget`，直到 #54521 修复。生产环境建议监控 `vLLM_USE_RUST_FRONTEND=1` 以确保推理稳定性。  

---  
*数据来源: github.com/vllm-project/vllm • 更新时间: 2026-10-01*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 简报 – 2026-10-01**

---

### **1. 今日亮点**  
SGLang 项目在大规模、长上下文推理方面持续进行激进优化，**HiSparse**、**HiCache** 与 **Qwen3.8-Flash-Next** 取得重大进展。关键改进包括：新引入的权重缓存守护进程将 Qwen3-235B FP8 模型的引擎启动时间从约 300 秒缩短至 1 秒以内；更多注意力后端已支持**动态预填充上下文并行化**。此外，已合并一项关键修复，防止在多个格式检测器中进行工具调用流式传输时出现静默文本丢失。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本。

---

### **3. 新模型与硬件支持**  
- **AMD ROCm 支持扩展**：  
  - 通过可选的 PTPC FP8 KDA 投影，实现对 gfx950 平台上的 **GLM-5.3-Flash-NVFP4** 的完整支持 ([PR #38764](https://github.com/sgl-project/sglang/pull/38764))。  
  - 成功在 ROCm 上部署 **Kimi-K3 MXFP4** 检查点 ([PR #40811](https://github.com/sgl-project/sglang/pull/40811))。  
  - 修复了在 ROCm 上对 **MiniMax-M3 EAGLE3** 的验证问题 ([PR #41497](https://github.com/sgl-project/sglang/pull/41497))。  
- **新模型集成**：  
  - **Gluon MegaMoE** 的集成路线图已启动，包含内核与注册表贡献 ([Issue #38334](https://github.com/sgl-project/sglang/issues/38334))。

---

### **4. 性能与优化**  
- **引擎恢复速度**：  
  **权重缓存守护进程**（第一阶段）将 Qwen3-235B FP8 模型的量化后权重加载时间从 **~306–327 秒** 缩短至 **<1 秒** ([Issue #33522](https://github.com/sgl-project/sglang/issues/33522), [博客](https://www.lmsys.org/blog/2026-08-21-sglang-weight-cache-daemon))。  
- **推测解码**：  
  在 SM100 GPU 上，对 MiMo 默认启用 FA4 可带来 **1.85 倍的解码吞吐量提升** 和 **34.8% 的 TTFT 降低** ([PR #41886](https://github.com/sgl-project/sglang/pull/41886))。  
- **内核融合**：  
  AMD 平台上仅在解码大小前向模式中使用融合的 MLA + RoPE + KV 写入内核，提升了计算单元利用率 ([PR #41533](https://github.com/sgl-project/sglang/pull/41533))。  
- **预填充并行与 CUDA Graphs**：  
  动态预填充上下文并行化正扩展至 FlashInfer/TRTLLM-MHA 后端 ([Issue #21788](https://github.com/sgl-project/sglang/issues/21788))，同时 `--cuda-graph-max-bs-prefill` 现已正确尊重用户定义的批处理大小 ([Issue #41923](https://github.com/sgl-project/sglang/issues/41923))。

---

### **5. 稳定性与回归问题**  
- **严重文本丢失漏洞**：  
  多个格式检测器（`Pythonic`、`Inkling`、`Gemma4`、`InternLM` 等）在流式传输中途因工具调用结束而缓冲区未刷新时，会静默丢弃最终输出 ([PR #41963](https://github.com/sgl-project/sglang/pull/41963), [PR #41962](https://github.com/sgl-project/sglang/pull/41962))。已修复。  
- **CUDA Graph 内存饥饿**：  
  预填充 CUDA Graph 占用约 1.8 GB 内存，在小显存卡上导致量化 KV 长上下文预填充资源耗尽；当前无基于空闲显存自动禁用逻辑 ([Issue #40094](https://github.com/sgl-project/sglang/issues/40094))。  
- **远程代码执行风险**：  
  通过 `/load_lora_adapter_from_tensors` 可绕过 `SafeUnpickler` 拒绝列表，暴露远程代码执行风险 ([Issue #30165](https://github.com/sgl-project/sglang/issues/30165))。高危，暂无修复 PR。  
- **GPU 驱动死锁**：  
  GB10/SM121 上 Triton 内核 `load_binary` 失败会引发内存耗尽并导致整个驱动死锁，需重启系统 ([Issue #40948](https://github.com/sgl-project/sglang/issues/40948))。

---

### **6. 对应用开发者的影响**  
- **部署大模型**：使用 `--enable-hierarchical-cache` 与 `--disaggregation-decode-enable-radix-cache` 时需谨慎，且确保在分片淘汰过程中 `hicache` 状态得以保留 ([PR #39893](https://github.com/sgl-project/sglang/pull/39893))。  
- **长上下文工作负载**：利用 HiSparse 与 HiCache 支持超长上下文（如 32K+ tokens），以减少解码过程中的 HBM 使用。  
- **工具调用流式传输**：请升级至最新 main 版本，避免在流结束时发生静默截断——尤其对使用 `Inkling`、`Gemmas` 或 `Hunyuan` 的智能体至关重要。  
- **硬件特定调优**：在 AMD ROCm 平台上，预计通过 FP8/MXFP4 优化，GLM-5.3-Flash 与 Kimi-K3 性能将显著提升；在 SM100 上，MiMo 将默认启用 FA4 以获得更低延迟。  
- **安全提示**：在 #30165 修复前，请勿通过 `from_tensors` 加载不可信的 LoRA 适配器。

---  
*数据来源: github.com/sgl-project/sglang | 更新时间: 2026-10-01*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-01**

---

### **1. 今日重点**  
最新更新聚焦于推测解码的关键稳定性修复、张量操作中的内存安全问题，以及对 Qwen3.8-Flash-Next 和 Prism Bonsai 2 等现代模型架构的增强支持。显著进展包括：Metal 内存泄漏修复、Vulkan 内核扩展以支持更宽的 Hadamard 块，以及在推测解码层输入处理中修正了批处理顺序错误保留的问题。

---

### **2. 发布与破坏性变更**  
今日未发布新的标记版本。但以下变更至关重要：  
- `b11308`：修复 `--download-mmproj` 的 CLI 参数解析，并增加测试覆盖 ([#28977](https://github.com/ggml-org/llama.cpp/pull/28977))。  
- `b11307`：在推测解码层输入中保持原始批处理顺序——对高吞吐推测生成的正确性至关重要 ([#29019](https://github.com/ggml-org/llama.cpp/pull/29019))。  
- `b11304`：训练工作流中正确处理 KV 缓存——对微调流水线至关重要 ([#28520](https://github.com/ggml-org/llama.cpp/pull/28520))。

> ✅ *这些变更向后兼容，但建议使用推测解码或训练功能的用户升级至该版本。*

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - 通过 PR [#29600](https://github.com/ggml-org/llama.cpp/pull/29600) 添加对 **Prism Bonsai 2 27B** 的运行时支持。  
  - 为 **Qwen3.8-Flash-Next** 模型添加 MTP（多标记预测）支持 ([#29761](https://github.com/ggml-org/llama.cpp/pull/29761))。  
  - 为 **LLM-jp-4.1** 添加 Jinja 解析器支持，实现结构化工具调用处理 ([#29681](https://github.com/ggml-org/llama.cpp/pull/29681))。  
  - 初步支持 **maion-coder** 架构 ([#29778](https://github.com/ggml-org/llama.cpp/pull/29778))。

- **硬件与后端增强**：  
  - **Metal**：修复私有传输缓冲区中的内存泄漏 ([#29777](https://github.com/ggml-org/llama.cpp/pull/29777))，并为 MXFP4 mul-mat 内核启用 BF16 数学运算 ([#29770](https://github.com/ggml-org/llama.cpp/pull/29770))。  
  - **Vulkan**：扩展 FWHT 内核以支持最大宽度达 8192 的块 ([#29772](https://github.com/ggml-org/llama.cpp/pull/29772))。  
  - **Hexagon**：在多序列场景下将矩阵乘法展开为二维形式，以提升 HMX 加速性能 ([#29779](https://github.com/ggml-org/llama.cpp/pull/29779))。  
  - **OpenCL**：Adreno E17 编译器现标记为支持向量子组广播 ([#29698](https://github.com/ggml-org/llama.cpp/pull/29698))。

---

### **4. 性能与优化**  
- **CUDA**：  
  - 通过优先采用整块调度以优化两阶段内核，提升了 FlashAttention 预填充性能 ([#29435](https://github.com/ggml-org/llama.cpp/pull/29435))。  
  - 在小批量情况下使用 MMVF 处理薄 f16/bf16 mul_mat，相比慢速 cublas 路径提升了吞吐量 ([#29633](https://github.com/ggml-org/llama.cpp/pull/29633))。  
  - Volta (sm_70) 现已路由至 Turing 优化的 MMVQ nwarps 表，提升了 K 量化解码效率 ([#29753](https://github.com/ggml-org/llama.cpp/pull/29753))。

- **HIP**：  
  - 为 CDNA GPU 添加 MMQ N-tiles 启发式算法，提升了内核选择准确性 ([#28709](https://github.com/ggml-org/llama.cpp/pull/28709))。

- **通用优化**：  
  - 将剩余示例迁移至 `llama_batch_ext` API，提升一致性与线程安全性 ([#29601](https://github.com/ggml-org/llama.cpp/pull/29601))。  
  - 通过跳过不必要的变量表复制，优化了 Jinja 循环作用域拷贝 ([#29776](https://github.com/ggml-org/llama.cpp/pull/29776))。

---

### **5. 稳定性与回归问题**  
今日报告的顶级问题反映了各后端与硬件平台持续存在的挑战：  
- **严重崩溃 / OOM**：  
  - Metal 在长时间生成时因缓冲区误用导致中止 ([#29771](https://github.com/ggml-org/llama.cpp/issues/29771)) —— 已在 PR #29777 中修复。  
  - 使用 `-sm` 张量标志时，GPU 在生成过程中重启（可在 RTX A6000 上复现）([#29549](https://github.com/ggml-org/llama.cpp/issues/29549))。  
  - AMD R9700 在 SAM/ReBAR 负载下出现 Vulkan `DeviceLost` 错误 ([#29623](https://github.com/ggml-org/llama.cpp/issues/29623))。

- **正确性缺陷**：  
  - 即使启用了 `-fa` 与 `--swa-full`，Gemma 4 模型仍不支持缓存重用 ([#21468](https://github.com/ggml-org/llama.cpp/issues/21468)) —— 仍未确认。  
  - 多个模型出现重复输出相同标记或生成垃圾输出的情况 ([#29392](https://github.com/ggml-org/llama.cpp/issues/29392)) —— 影响 Vulkan 后端。  
  - 张量大小验证中的整数溢出导致未定义行为 ([#29384](https://github.com/ggml-org/llama.cpp/issues/29384)，已在 PR [#29384](https://github.com/ggml-org/llama.cpp/pull/29384) 中修复)。

- **后端特定问题**：  
  - OpenVINO 在 KV 缓存超过设备限制时无法创建上下文 ([#29087](https://github.com/ggml-org/llama.cpp/issues/29087))。  
  - Snapdragon 8 Gen 2 在参数量 4B+ 时，Hexagon DSP 队列失败 ([#26123](https://github.com/ggml-org/llama.cpp/issues/26123))。

> ⚠️ *多个回归问题仍处于开放状态；开发人员应在生产部署前于目标硬件上验证行为。*

---

### **6. 对应用开发者的影响**  
- **谨慎使用推测解码**：推测解码中批处理顺序保留的修复（`b11307`）对结果准确性至关重要——请确保使用 `b11307` 及以上版本。  
- **充分利用 MTP 与 Bonsai 2**：对于高吞吐推理，启用 MTP（`--spec-type draft-mtp`）配合 Qwen3.8-Flash-Next 与 Bonsai 2 模型——草案阶段预计可获得约 2 倍加速。  
- **规避 Metal/OOM 风险**：若在 Apple Silicon 上运行长序列生成，请立即应用 PR #29777 以防止内存泄漏。  
- **关注后端特有问题**：Vulkan 与 Metal 在高端 GPU 上仍存在不稳定现象；若可靠性至关重要，建议回退至 CUDA/ROCm。  
- **验证量化选择**：MXFP4 模型可能需要 BF16 数学运算以保证正确计算——避免在未验证的情况下进行 FP16 强制转换。  

👉 *最佳实践：始终从近期 master（≥ `b11307`）构建，并使用您的具体模型 + 硬件组合进行测试。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-01**

---

### **今日亮点**  
Ollama 持续扩展对高级推理后端和模型架构的支持，关键 PR 实现了 System One 模型的 MLX 集成，并修复了关键的 GPU 内存处理问题。值得注意的是，已识别出 JSON schema 属性顺序保留的回归问题，正通过修复 PR 处理中；而围绕 Vulkan、CUDA 和 MLX 的多个稳定性问题仍处于活跃状态。

---

### **发布与破坏性变更**  
过去 24 小时内未发布新版本。然而，**v0.35.0** 作为无 `-rc` 后缀的预发布版本，引发了关于发布流程清晰度的担忧 ([#18706](https://github.com/ollama/ollama/issues/18706))。开发者在升级至该版本前应保持谨慎，直至官方确认其稳定性。

---

### **新模型与硬件支持**  
- 通过 PR [#18701](https://github.com/ollama/ollama/pull/18701) 新增 **MLX System One 支持**，可通过 `/v1/systemone` 端点实现 `nimble`、`bongard-mini`（T5Gemma2）等面向决策任务模型的原生推理。  
- 通过 PR [#18714](https://github.com/ollama/ollama/pull/18714) 新增对 **Bongard (T5Gemma2)** 模型的支持 —— 一个用于逻辑推理任务训练的 4B 编码器-解码器模型。  
- **Vulkan 后端改进**：正在调查针对 AMD RX 6800 XT 的 `0xc0000005` 访问违规问题以及 UMA APU 假死问题 ([#18557](https://github.com/ollama/ollama/issues/18557), [#18370](https://github.com/ollama/ollama/issues/18370))。

---

### **性能与优化**  
- **GPU 内存管理**：PR [#18719](https://github.com/ollama/ollama/pull/18719) 引入代理感知的 blob 下载机制，在受限网络环境中通过尊重 `HTTP_PROXY`/`HTTPS_PROXY` 提升性能。  
- **连接复用**：PR [#18397](https://github.com/ollama/ollama/pull/18397) 重新启用 `/api/embed` 请求的 HTTP keep-alives，降低高吞吐嵌入工作负载下的连接开销。  
- **线程调度优化**：问题 [#17916](https://github.com/ollama/ollama/issues/17916) 指出，在受 CPU 限制的容器中，由于 `n_threads` 忽略 cgroup 配额，导致吞吐量严重下降——这对容器化部署影响显著。

---

### **稳定性与回归问题**  
今日主要稳定性关注点：  

1. **使用 Cohere MoE 模型时，RTX 5090 上出现 CUDA 崩溃**：持续出现 `illegal memory access` 错误，导致 `llama-server` 崩溃 ([#18642](https://github.com/ollama/ollama/issues/18642))。高危；尚未有修复 PR。  
2. **MLX 在高负载下陷入 nvfp4 停滞**：请求无限挂起，尽管 GPU 利用率满载却无任何 token 输出进展 ([#18505](https://github.com/ollama/ollama/issues/18505))。对生产推理至关重要。  
3. **静默丢弃图像输入**：`deepseek-v4.1-flash:cloud` 宣称支持 `vision` 功能，但静默忽略图像输入 ([#18527](https://github.com/ollama/ollama/issues/18527))。对视觉增强型智能体影响重大。  
4. **macOS GUI 在 60 秒后失效**：长时间聊天会话无声失败，无界面反馈 ([#18368](https://github.com/ollama/ollama/issues/18368))。  
5. **Windows 自动更新损坏 CUDA DLL**：自动更新将 `ggml-cuda.dll` 重命名为 `.tmp`，强制回退至 CPU ([#18712](https://github.com/ollama/ollama/issues/18712))。

> ✅ **正在进行中的修复 PR**：  
> - [#18717](https://github.com/ollama/ollama/issues/18717)：修复 JSON schema 属性顺序丢失 → PR [#18721](https://github.com/ollama/ollama/pull/18721)  
> - [#18557](https://github.com/ollama/ollama/issues/18557)：Vulkan 访问违规 → 与 #18494 类似，等待更深入诊断

---

### **对应用开发者的启示**  
- **若依赖图像输入，请避免使用 `deepseek-v4.1-flash:cloud`** —— 可能遭遇静默数据丢失。建议改用本地或替代模型，待问题修复。  
- **容器化部署**：注意 `OLLAMA_NUM_PARALLEL=1` 与 cgroups 配合使用时，线程数可能超出 CPU 配额，引发剧烈抖动。建议显式设置 `n_threads` 或使用 `cpuset`。  
- **Apple Silicon 用户请优先使用 MLX**：最新 MLX PR 提升了与 `gemma4:31b-mlx` 等新模型的兼容性，适用于高上下文、低延迟推理场景。  
- **结构化输出应用**：若使用结构化输出，除非明确保证顺序，否则不应依赖属性顺序 —— 该问题即将通过 PR [#18721](https://github.com/ollama/ollama/pull/18721) 修复。  
- **代理环境**：确保 `HTTPS_PROXY` 被正确识别 —— PR [#18719](https://github.com/ollama/ollama/pull/18719) 正在填补此空白。

> 📌 **建议**：在预发布标签问题澄清前，暂缓升级至 v0.35.0。请关注 [#18706](https://github.com/ollama/ollama/issues/18706)，并在测试环境验证关键工作流。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **1. 今日亮点**  
LiteLLM 项目持续强化其面向生产环境的 LLM 编排基础，针对代理安全、成本核算和流式传输可靠性进行了关键修复。值得注意的是，多个 PR 解决了代理网关系统、基于密钥的访问控制以及审计日志中的高严重性问题——确保服务层级和预算的执行更加稳健且准确。新增的 `ternary` FOCUS 导出目标也扩展了可观测性集成能力。

---

### **2. 发布与破坏性变更**  
- **v1.105.0-dev.1**：此开发版引入了通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53) 的签名验证，强化了所有 Docker 镜像的供应链安全。未来所有发布版本都将使用该提交中引入的同一密钥进行签名。  
  🔗 [GitHub 发布说明](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-dev.1)  

> ⚠️ **迁移提示**：依赖配置中 `os.environ/` 引用（如 `api_key`、`jev_classifier_config.api_key`）的用户应验证 v1.103.0 之后的解析行为，因为近期更改可能在边缘情况下影响解析结果。

---

### **3. 新模型与硬件支持**  
- **Gemma4 模型已添加**：通过 OpenRouter 集成，新增对 `gemma-4-31b-it` 和 `gemma-4-26b-a4b-it` 的支持。这些模型现已在 `model_prices_and_context_window.json` 中被识别。  
  🔗 [Issue #26973](https://github.com/BerriAI/litellm/issues/26973)  
- **Gemini SDK 访问已修复**：合并修复后，`gemini/gemini-3.8-flash` 模型可通过 SDK 正常访问。  
  🔗 [PR #43828](https://github.com/BerriAI/litellm/pull/43828)  
- **请求官方 Azure Terraform 模块**：社区对官方 Azure Terraform 模块的兴趣凸显了多云 IaC 支持需求的增长。  
  🔗 [Issue #31843](https://github.com/BerriAI/litellm/issues/31843)

---

### **4. 性能与优化**  
- **流式传输 + Logprobs 修复**：针对 vLLM 后端模型在 `logprobs=True` 时流式传输期间出现的 Pydantic v2 序列化崩溃问题已解决。恢复了高级分析场景下的稳定性。  
  🔗 [Issue #18801](https://github.com/BerriAI/litellm/issues/18801) | [PR #43959](https://github.com/BerriAI/litellm/pull/43959)  
- **支出日志效率提升**：分片的 `LiteLLM_SpendLogs` 现在支持每个分片使用 `CREATE INDEX CONCURRENTLY`，可在不阻塞写入的情况下实现更快的模式升级。  
  🔗 [PR #43957](https://github.com/BerriAI/litellm/pull/43957)  
- **代理预算强制执行**：新的预算逻辑确保代理遵守生命周期限额，并避免在外部调用中绕过预留额度。  
  🔗 [PR #43724](https://github.com/BerriAI/litellm/pull/43724)

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| Anthropic 网络搜索中缓存丢失 `provider_specific_fields`（如引用） | 高 | 已关闭 | [Issue #13048](https://github.com/BerriAI/litellm/issues/13048) |
| 当 `disable_exception_on_block=True` 时，`BedrockGuardrail` 被静默绕过 | 严重 | 开放 | [Issue #31976](https://github.com/BerriAI/litellm/issues/31976) |
| 工作进程关闭时尽管返回 200 响应仍丢弃审计日志 | 高 | 开放 | [Issue #43583](https://github.com/BerriAI/litellm/issues/43583) |
| 客户端增删改操作后未刷新 Redis 缓存 | 中等 | 开放 | [Issue #31838](https://github.com/BerriAI/litellm/issues/31838) |
| 流式传输降级重试时尝试主路径而非恢复备份路径 | 中等 | 开放 | [PR #43959](https://github.com/BerriAI/litellm/pull/43959) |

> ✅ **注意**：今天合并的多个 PR 已修复若干回归问题，包括 `fix(proxy): restore pre-config-wins handling of pass-through endpoints` ([#43962](https://github.com/BerriAI/litellm/pull/43962)) 与 `fix(guardrails): treat unknown api_version as unset` ([#43956](https://github.com/BerriAI/litellm/pull/43956))。

---

### **6. 对应用开发者意味着什么**  
- **成本准确性现在至关重要**：请确保自定义模型在 `model_prices_and_context_window.json` 中具有正确的成本映射——否则即使实际使用有效，支出日志也可能显示为 `$0`。  
  🔗 [Issue #35691](https://github.com/BerriAI/litellm/issues/35691)  
- **网关规则必须谨慎配置**：启用 `disable_exception_on_block=True` 时，网关可能静默失败——务必在生产环境中验证拦截行为。  
  🔗 [Issue #31976](https://github.com/BerriAI/litellm/issues/31976)  
- **显式使用 `service_tier`**：新的 `service_tier` 计费矩阵提升了成本追踪能力，但需要显式配置；请使用真实流量进行全面端到端测试。  
  🔗 [PR #43960](https://github.com/BerriAI/litellm/pull/43960)  
- **安全优先**：在 CI/CD 流水线中启用 `cosign` 验证以防止供应链攻击。  
  🔗 [Sigstore 文档](https://docs.sigstore.dev/cosign/overview/)  

构建代理系统或语音应用的开发者应优先升级至 v1.103+，以获得稳定的流式传输、正确的 token 统计以及更优的降级容错能力。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-01**

---

### **1. 今日亮点**  
Unsloth 项目在用户界面/体验（UI/UX）与后端稳定性方面取得显著进展，尤其体现在语音模式重建（PR #12384, #12385, #12386）以及 PDF/Word 文档保真度提升（PR #12377, #12378）。针对 OpenAI 兼容 API 请求的严重性能退化问题——特别是每请求固定约 1.2 秒延迟——目前正进行调查（#12364），同时低内存环境下的内存管理修复工作也已列为优先事项（#12374）。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性配置变更。无新版本或配置更改上线。

---

### **3. 新模型与硬件支持**  
- **新增音频运行时**：通过 PR [#12342](https://github.com/unslothai/unsloth/pull/12342) 引入 `audio.cpp` 作为原生引擎，支持语音、音乐及听写功能，现已可在 Studio 和聊天工作流中直接调用 TTS/ASR 模型。
- **AMD ROCm Windows 修复**：一项关键问题被记录于 [#11638](https://github.com/unslothai/unsloth/issues/11638)，Qwen-Image-2.1 无法加载其 FP8 文本编码器，因 404 错误，表明 AMD/ROCm 在 Windows 平台上的构建产物发布不完整。
- **ARM64/Winget 路由错误**：根据 [#11913](https://github.com/unslothai/unsloth/issues/11913)，使用 x86 CPU 的 Windows 用户会错误地通过 `winget` 接收 ARM64 包——此打包缺陷影响部署可靠性。

---

### **4. 性能与优化**  
- **OpenAI API 延迟退化**：Studio 的 `/v1/chat/completions` 端点每请求均引入固定 **~1.2 秒开销**，无论负载大小或 token 数量，导致在短文本任务上比直接调用 `llama-server` 慢 **3–5 倍**（[#12364](https://github.com/unslothai/unsloth/issues/12364)）。
- **MMProject 磁盘分页退化**：自最新更新以来，`mmproj-F16.gguf` 在生成过程中被频繁从磁盘分页读取，造成严重吞吐下降；额外参数被静默丢弃，且 `--mlock` 参数被拒绝（[#12372](https://github.com/unslothai/unsloth/issues/12372)）。
- **启动阶段内存分配失败**：在高核心数、低内存系统上，后端因 OpenBLAS 内存重试失败而启动崩溃（[#12374](https://github.com/unslothai/unsloth/pull/12374)）。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR？ |
|------|----------|--------|--------|
| “新建聊天”时触发 `tapClientLookup: Index 1 out of bounds (length: 0)` 崩溃 | 高 | 开放 | ❌ |
| `MessagePartText can only be used inside text or reasoning message parts` | 中 | 开放 | ❌ |
| 响应中出现重复的 `toolCallId` | 中 | 开放 | ❌ |
| GPU 锁定时 `--mmproj-device` / `--spec-draft-device` 被拒绝 | 高 | 开放 | ❌ |
| 删除分支后语音模式失效 | 高 | 已关闭（已重构） | ✅ 通过 [#12384](https://github.com/unslothai/unsloth/pull/12384), [#12385](https://github.com/unslothai/unsloth/pull/12385), [#12386](https://github.com/unslothai/unsloth/pull/12386) |
| 提取后 PDF 预览失败 | 中 | 开放 | ✅ 通过 [#12346](https://github.com/unslothai/unsloth/pull/12346) |

> *注：多个问题源于近期重构与依赖结构调整。语音模式功能已在删除分支后成功重建。*

---

### **6. 对应用开发者的启示**  
- **在 [#12364](https://github.com/unslothai/unsloth/issues/12364) 修复前，请避免在低延迟场景使用 OpenAI 兼容 API**——直接访问 `llama-server` 仍具有明显性能优势。
- **在共享模型的多用户环境中预期不稳定**：会话同步问题与聊天历史泄露正在被持续报告（[#12365](https://github.com/unslothai/unsloth/issues/12365)），建议实现客户端状态隔离。
- **如构建语音驱动代理，可使用 `audio.cpp`**——现支持原生 TTS/ASR 集成。
- **处理大附件时需谨慎**：尚未支持自动分块（[#12369](https://github.com/unslothai/unsloth/issues/12369)），请手动处理上下文溢出。
- **启用日期提示功能时，验证系统提示词持久性**——默认提示词可能被静默丢弃（[#12382](https://github.com/unslothai/unsloth/pull/12382)）。

> 🔗 *所有进展请关注 [github.com/unslothai/unsloth](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*