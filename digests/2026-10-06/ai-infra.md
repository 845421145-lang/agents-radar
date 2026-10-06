# AI 基础设施日报 2026-10-06

> 生成时间: 2026-10-06 02:27 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-10-06**

---

### **1. 生态概览**  
AI 推理与服务生态正进入深度专业化与硬件融合的新阶段，各项目日益聚焦于 NVIDIA SM100/SM12x、AMD ROCm gfx942/gfx950 以及 Apple Silicon（MLX）平台上的高性能、低延迟工作负载。主要趋势包括推测解码（MTP/deepstack）、多模态融合（视觉 + 文本）以及大规模分布式推理的普及。尽管 vLLM 与 SGLang 在原始吞吐量和高级内核优化方面领先，llama.cpp 与 Ollama 则在本地运行时灵活性与开发者易用性上占据主导地位。LiteLLM 与 Unsloth 正逐步成为关键中间件层，支持智能体工作流与微调一致性。

---

### **2. 活跃度对比**  

| 项目       | 今日开放问题数 | 今日合并的 PR 数 | 发布状态       |
|---------------|----------------|------------------|----------------|
| **vLLM**      | 8              | 32               | ✅ 已发布 v0.31.0  |
| **SGLang**    | 12             | 7                | ❌ 无新版本发布     |
| **llama.cpp** | 11             | 10               | ✅ 已发布 v0.6.0    |
| **Ollama**    | 10             | 5                | ⚠️ 补丁修复进行中 |
| **LiteLLM**   | 3              | 5                | ✅ 补丁发布（v1.100.x–v1.104.x） |
| **Unsloth**   | 12             | 6                | ❌ 无新版本发布     |

> *注：活跃度反映即时工程推动力；vLLM 与 llama.cpp 展现出最强的发布节奏。*

---

### **3. 模型支持竞赛**  

| 模型 / 架构         | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **DeepSeek-V4.1-Flash**       | ✅ (SM100, NVFP4) | ✅ (ROCm DCP) | ✅ (MTP, deepstack) | ⚠️ (未发现回归问题) | ✅ (图像内容保留) | ⚠️ (MoE 支持实验性) |
| **Qwen3.8-Flash-Next**        | ⚠️ (推测解码问题) | ✅ (ROCm 上启用 DCP) | ❌ (`--spec-draft-model` 回归) | ⚠️ (工具调用解析器不匹配) | ✅ (正确路由) | ⚠️ (损失值变为 NaN) |
| **GLM-5.3-Flash (320B Hybrid)** | ✅ (长序列解码退化问题待解决) | ❌ (NVFP4 循环问题) | ✅ (完整支持) | ⚠️ (`glm-ocr` 回归) | ✅ (支持视觉) | ⚠️ (上下文处理问题) |
| **Clef 决策模型 (文本+视觉)** | ❌ | ❌ | ✅ (服务器支持) | ❌ (`/systemone` 上崩溃) | ✅ (图像内容保留) | ❌ |
| **Gemma 4 CLIP / 视觉**     | ❌ | ✅ (启用 DCP) | ✅ (Gemma 4 31B MTP 崩溃) | ❌ | ❌ | ❌ |
| **MoE 模型 (Qwen3.5/3.6, Gemma-4)** | ⚠️ (内核融合进行中) | ⚠️ (仅 GLM-5 支持 DCP) | ✅ (实验性 fast_inference) | ❌ | ❌ | ✅ (PR #12742 进行中) |

> **胜出者**：**llama.cpp** 在模型多样性及对混合/多模态模型的早期采纳方面领先。  
> **硬件覆盖领导者**：**vLLM**（NVIDIA SM100/B300），**SGLang**（ROCm DCP），**Ollama**（Windows ROCm 支持）。

---

### **4. 性能前沿**  

| 优化重点           | vLLM                              | SGLang                            | llama.cpp                         | Ollama                          | LiteLLM                       | Unsloth                     |
|-------------------------------|-----------------------------------|-----------------------------------|-----------------------------------|---------------------------------|-------------------------------|-----------------------------|
| **KV 缓存效率**       | ✅ NVFP4 + FlashMLA + DeepGEMM     | ❌ (HiCache 死锁问题)      | ✅ NVFP4 + PLE 表               | ⚠️ (内存驻留问题)   | ⚠️ (花费日志不可靠) | ⚠️ (MM 投影分页)  |
| **批处理与并行**    | ✅ 多 GPU 批处理不变性      | ✅ 预填充 CP (MHA/GQA 路线图)   | ✅ `llama_batch_ext` (混合输入)| ✅ MLX SDPA 加速         | ✅ 预算感知路由       | ❌ (导出时上下文丢失) |
| **量化与压缩**      | ✅ NVFP4, TurboQuant/HIGGS 跟踪| ✅ FP8/MXFP4 融合 (AMD)          | ✅ MMQ 累积 (NVFP4)        | ✅ MLX SDPA (宽头)        | ✅ 区域增益倍数      | ✅ LoRA 内存优化 |
| **分布式服务**       | ✅ 分离式流水线 (/render → /inference → /derender) | ✅ TP rank 死锁风险 | ❌ (多 GPU 层拆分崩溃) | ❌ (模型加载卡死)            | ✅ 模型组定价逻辑  | ❌ (ARM64 构建误识别) |
| **内核级优化**       | ✅ Triton 注意力，手动 RoPE-KV 融合 | ✅ 按权重缓存启动器 (Kimi-K3) | ✅ 行分割 flash-attention | ✅ MLX SDPA 内核              | ✅ 流式事件排序   | ✅ 代码字体，上下文环形 UI |

> **性能领先者**：**vLLM**（内核级效率），**SGLang**（分布式上下文并行），**llama.cpp**（灵活批处理与量化）。

---

### **5. 层级定位**  

| 项目       | 主要层级                        | 角色摘要 |
|---------------|--------------------------------------|--------------|
| **vLLM**      | **服务引擎**                   | 高吞吐量 LLM 推理引擎，具备前沿的 CUDA/ROCm 内核；适用于云规模部署。 |
| **SGLang**    | **服务引擎 + 网关**         | 全栈推理框架，内置调度、路由及推测解码支持；适合复杂工作流的生产环境。 |
| **llama.cpp** | **本地运行时 / 边缘推理**   | 通用 CPU/GPU/CUDA/Vulkan/ROCm 后端，专注于离线、边缘与嵌入式部署。 |
| **Ollama**    | **开发者网关 / 本地运行时**| 简化的本地推理接口，支持 CLI、API 与工具链集成；适合原型设计与桌面使用。 |
| **LiteLLM**   | **网关 / 抽象层**      | 多提供商推理的统一 API 代理；对成本追踪、预算管理与智能体编排至关重要。 |
| **Unsloth**   | **微调与训练工具**      | 专为高效 LoRA 微调与模型导出设计的 GUI 与 SDK；连接训练与部署环节。 |

> **层级区分**：生态已清晰分层——**vLLM/SGLang** 为主干推理，**llama.cpp/Ollama** 为边缘/本地接入，**LiteLLM** 为抽象层，**Unsloth** 为微调专用。

---

### **6. 趋势信号**  

#### 🔍 **提取的关键行业趋势**：
1. **推测解码（MTP/DeepStack）正在成熟但仍脆弱**：所有主要项目（vLLM、llama.cpp、SGLang）均大力投入 MTP，但回归问题依然存在——尤其在混合 Qwen 布局与长序列解码稳定性方面。
2. **硬件融合加速推进**：SM100（B300）、Blackwell（GB10）以及 ROCm gfx942/gfx950 正成为标准目标平台。AMD 的 ROCm 在 vLLM 与 SGLang 中持续获得进展。
3. **多模态工作流已成为标配**：Clef、GLM-5.3-Flash 与 Gemma 4 CLIP 已被集成至推理流水线——表明视觉增强型智能体不再小众。
4. **智能体基础设施正走向模块化**：LiteLLM 的花费日志、Ollama 的工具调用解析、Unsloth 的提示保留功能，凸显向可信赖、可追溯智能体系统转变的趋势。
5. **稳定性 > 速度**：尽管性能大幅提升，但严重崩溃（双重释放、无限循环、死锁）仍普遍存在——尤其在 SGLang 与 Ollama 中——表明生产就绪性仍在演进。

#### 📌 **开发者应关注事项**：
- **避免在 Qwen3.8-Flash-Next 中使用 `--spec-draft-model`，直到修复落地（vLLM/llama.cpp）**。
- **监控 LiteLLM 中 `/v1/messages` 的并发性**——崩溃风险依然较高。
- **在长序列解码负载下测试 GLM-5.3-Flash**——vLLM 与 SGLang 均报告性能退化。
- **使用 `llama_batch_ext` 进行 MTP 工作流**——目前仅在 llama.cpp v0.6.0 中可用。
- **通过 `.unsloth portable archive` 导出并固定模型**，以避免 Unsloth 中元数据丢失。

> ✅ **结论**：生态正在快速演进——但可靠性与正确性必须优先于原始速度。按部署层级选择工具：**vLLM/SGLang 用于规模化**，**llama.cpp/Ollama 用于便携性**，**LiteLLM 用于编排**，**Unsloth 用于微调**。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-06

---

### **1. 今日亮点**  
vLLM v0.31.0 版本为 **DeepSeek-V4.1-Flash** 带来显著性能提升，通过 FlashMLA + NVFP4 压缩 KV 缓存实现 SM100 默认支持，并启用 DeepGEMM 稀疏 MQA logits。关键稳定性修复解决了混合布局 Qwen3.8 的推测解码问题以及 GLM-5.3-Flash 长序列解码退化问题；新增 PR 进一步增强了 ROCm 支持，并优化了 AMD gfx942/gfx950 平台下 Qwen3.5/Next 与 DeepSeek-V4.1 的内核融合。

---

### **2. 发布与破坏性变更**  
- **v0.31.0**：今日发布，共包含 717 次提交，来自 307 名贡献者（其中 96 人为新贡献者）。  
  - ✅ **默认启用 SM100 支持** 于 `DeepSeek-V4.1-Flash`，基于 FlashMLA + NVFP4 KV 缓存（`#56935`）。  
  - ✅ **DeepGEMM 稀疏 MQA logits** 已默认启用用于 V4.1 索引器（`#56254`）。  
  - 🔧 未报告破坏性变更；向后兼容性已保持。  
  📌 [GitHub Release v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0)

---

### **3. 新模型与硬件支持**  
- **模型**：  
  - 对 **GLM-5.3-Flash** 实现完整支持，持续优化中（`#57406`, `#56868`）。  
  - **Qwen3.8-2.4T-A95B-gfx950** 性能路线图已启动，面向 MI355X（`#57149`）。  
  - **DeepSeek-V4-Flash** 在 B300（SM100）平台已完全可用，内核修复后正常运行（`#46796` 已在 v0.31.0 中解决）。  

- **硬件与后端**：  
  - **ROCm (AMD)**：  
    - Qwen3-Next/Qwen3.5 的 QK-norm+RoPE+gate Triton 内核融合（`#51406`）。  
    - gfx942（`#60153`）和 gfx950（`#57149`）的 mHC 接缝路由优化。  
    - DeepSeek-V4.1 的逆 RoPE + MXFP8 量化稀疏 MLA 融合（`#60154`）。  
  - **CUDA**：  
    - 小批量场景下 Engram 查找速度提升（`#57893`）。  
    - `host_file_gather` 支持 NVFP4 PLE 表（`#59958`）。  

- **量化**：  
  - **NVFP4** 现已在 host-file gather 与 FlashInfer 自动调优中支持（`#59958`, `#60085`）。  
  - **TurboQuant/HIGGS** 后续工作持续推进（如 MLA 支持追踪 `#40069`）。  

---

### **4. 性能与优化**  
- **吞吐量与延迟**：  
  - **GB300**：通过双行瓦片优化，小 Engram 查找性能提升 **6.1%（1 用户）, 19.4%（2 用户）, 28.1%（4 用户）**（`#57893`）。  
  - **gfx942（ROCm）**：mHC 接缝内核从 ~300µs 降至单次融合调用 —— 消除冗余 AITER 启动（`#60153`）。  
  - **多 GPU**：`VLLM_BATCH_INVARIANT=1` 现可跨批量维度保持 MoE gate 不变性（`#59985`）。  

- **内存与内核效率**：  
  - **FlashInfer 自动调优表预加载** 通过守护进程缓存降低启动延迟（`#60085`）。  
  - **Triton attention** 现保留小尺寸 FP8 softmax 权重，防止下溢（`#60156`）。  
  - 为 Llama 模型新增手动 CUDA RoPE-KV 融合（`#52363`）。  

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|-----------|
| ⚠️ 高 | [#56868](https://github.com/vllm-project/vllm/issues/56868) | GLM-5.3-Flash 在累积推理后出现长序列解码退化 | 开放 — 影响高并发推理 |
| ⚠️ 高 | [#53670](https://github.com/vllm-project/vllm/issues/53670) | EAGLE/MTP 前缀缓存丢失导致 1,648 token 重新计算 → 吞吐量损失约 30–40% | 已在 `#52244`（已合并）中修复 |
| ⚠️ 中 | [#59642](https://github.com/vllm-project/vllm/issues/59642) | 分离式服务中 Qwen3.8-flash-next 的 MTP 接受率为 0% | 开放 — 对推测解码工作流至关重要 |
| ⚠️ 中 | [#59413](https://github.com/vllm-project/vllm/issues/59413) | ROCm 上低并发时 GLM-5.3-Flash 输出乱码 | 开放 — 可能由张量对齐或内核启动问题引起 |
| ⚠️ 低 | [#49497](https://github.com/vllm-project/vllm/issues/49497) | FlashInfer sampler JIT 在 `nvcc` 不可发现时崩溃 | 开放 — 无备用方案回退至原生采样器 |

> ✅ **已合并修复**：  
> - `#52244`：恢复在 MTP 推测解码下混合 GDN 前缀缓存命中（`#53670`）  
> - `#60156`：防止 Triton attention 中的 FP8 softmax 下溢  

---

### **6. 对应用开发者的意义**  
- **使用 v0.31.0** 以在 **DeepSeek-V4.1-Flash** 与 **Qwen3.8** 模型上获得最佳性能，适用于 **NVIDIA SM100/B300** 与 **AMD gfx942/gfx950** 平台。  
- **启用 `--kv-cache-dtype nvfp4`** 可使大上下文模型容量最高提升 2 倍。  
- **避免在混合布局 Qwen3.8** 上使用推测解码，直至 `#53670` 完全验证 —— 否则可能遭遇高达 **40% 的吞吐量损失**。  
- **利用分离式服务**，采用 `/render` → `/inference/v1/generate` → `/derender` 流水线；确保使用最新 `v1` 接口（`#56851`, `#42729`）。  
- **若使用 RL 回滚**（`#48312`），请监控权重重新加载的正确性 —— 正确性仍在优化中。  
- **针对 ROCm 用户**：预期在 Qwen3.5/Next 与 DeepSeek-V4.1 上因融合内核获得更佳性能（`#51406`, `#60154`）。  

👉 **建议操作**：升级至 v0.31.0，验证 GLM-5.3-Flash 在长序列解码负载下的行为，并测试 Qwen3.8 的 MTP 推测解码。  

---  
*摘要生成时间：2026-10-06 | 来源：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest – 2026-10-06

---

### **1. 今日亮点**  
SGLang 持续推进对完整 Blackwell (SM12x) 和 ROCm 支持的进程，关键 PR 已实现 GLM-5 与 DeepSeek-V3.2 在 AMD GPU 上的解码上下文并行（DCP）。关键稳定性修复解决了调度器中的内存损坏问题（`double free or corruption`）以及在长时间预填充场景下 HiCache + DeepSeek-V4 存在的持续死锁问题——这两项对生产环境推理负载影响重大。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未观察到新版本发布或接口/配置的破坏性更改。

---

### **3. 新模型与硬件支持**  
- ✅ **ROCm/AMD 支持**：  
  - [PR #42618](https://github.com/sgl-project/sglang/pull/42618)：为 ROCm 平台（MI350X, sm_90）上的 **GLM-5** 与 **DeepSeek-V3.2** 添加了 **解码上下文并行（DCP）** 支持。  
  - [PR #41794](https://github.com/sgl-project/sglang/pull/41794)：首次在 AMD 平台上支持 **Kimi-K3 Quark FP8/MXFP4 融合**，旨在提升 MLA 模型的运行效率。  
- ✅ **Blackwell (SM12x) GPU 支持**：  
  - [PR #30705](https://github.com/sgl-project/sglang/pull/30705)（已合并）：支持在 **RTX PRO 6000 Blackwell (sm_121)** 与 DGX Spark GB10 上进行扩散模型与 LLM 推理。  
- ✅ **扩散模型增强**：  
  - [PR #35623](https://github.com/sgl-project/sglang/pull/35623)：为 MiniMax-H3 引入 **分层 AdaLN 缓存**，通过避免静态 `adaln_proj` 权重驻留，降低驻留内存占用。  
  - [PR #37822](https://github.com/sgl-project/sglang/pull/37822)：将检查点文件映射为**只读模式**，减少在 GB10 上冗余的内存带宽使用。

---

### **4. 性能与优化**  
- 🔥 **预填充上下文并行（CP）**：  
  - [Issue #21788](https://github.com/sgl-project/sglang/issues/21788)（高优先级，路线图中）：针对 MHA/GQA 后端（FlashInfer/TRTLLM-MHA）的预填充 CP 进展顺利，目前仅受限于后端集成。现已支持 MLA（Dpsk v3/Kimi-K2.5）和 SWA。  
- ⚙️ **内核与内存优化**：  
  - [PR #42698](https://github.com/sgl-project/sglang/pull/42698)：通过 **按权重缓存启动器**，将 Kimi-K3 MLA 投影路径的每次调用开销从 87–117 μs 降至接近零。  
  - [PR #35975](https://github.com/sgl-project/sglang/pull/35975)：修复了在 FP8 量化过程中静态 LoRA 合并错误的问题，防止崩溃与无效输出。  
- 📈 **模型特定调优**：  
  - [Issue #42170](https://github.com/sgl-project/sglang/issues/42170)：正在进行 **DeepSeek-V4.1** 的优化工作，包括 mHC 代码清理及预填充性能优化。

---

### **5. 稳定性与回归问题**  
⚠️ **严重崩溃与死锁**：  
1. [Issue #42508](https://github.com/sgl-project/sglang/issues/42508)：**调度器在空闲循环不变性检查期间触发 `double free or corruption`** → 服务器永久挂起。严重级别高；尚未有修复方案。  
2. [Issue #42465](https://github.com/sgl-project/sglang/issues/42465)：在并发长预填充场景下，**DeepSeek-V4 + HiCache write_through 出现 TP rank 死锁**。调度器/反词元化器静默无响应，`/health` 返回 503。修复待处理。  
3. [Issue #35884](https://github.com/sgl-project/sglang/issues/35884)：`/health` 处理器无法取消卡住的请求 → 僵尸健康检查堆积 → 导致 **分页预填充批处理崩溃**。

⚠️ **其他重要缺陷**：  
- [Issue #41939](https://github.com/sgl-project/sglang/issues/41939)：**GLM-5.3-Flash NVFP4** 在 TP4 的 B200/B300 上无限循环，无最终回答。  
- [Issue #42074](https://github.com/sgl-project/sglang/issues/42074)：在 #39704 后，**DeepSeek-V4-Pro 在 GB300 上解码吞吐量下降约 5%** —— 夜间构建已确认为回归。

---

### **6. 对应用开发者的启示**  
- ✅ **在 AMD 上启用 DCP**：若您在 ROCm 上使用 **GLM-5 或 DeepSeek-V3.2**，请启用 `--dcp-size` 以降低跨 rank 的 KV 缓存内存压力。  
- ⚠️ **避免在 DeepSeek-V4 中使用 HiCache + write_through**，直到 #42465 修复前——高负载下存在服务完全挂起的风险。  
- 🔍 **监控健康检查**：`/health` 的缺陷可能导致编排系统级联故障——若依赖 SGLang 默认健康探针，请考虑自定义存活探针。  
- 💡 **使用优化路由**：借助 [PR #42665](https://github.com/sgl-project/sglang/pull/42665)，路由器现在可与 Rust 服务共享 DeepSeek-V4 提示渲染逻辑——提升一致性并减少重复代码。  
- 🛠 **警惕回归问题**：若在 TP4 上运行 DeepSeek-V4-Pro 或 GLM-5.3-Flash NVFP4，建议避开近期夜间构建版本，因已知存在性能与正确性问题。

> *如需实时更新，请关注 [SGLang GitHub Issues](https://github.com/sgl-project/sglang/issues) 与 [Discussions](https://github.com/sgl-project/sglang/discussions)。*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp Digest – 2026-10-06**

---

### **1. 今日亮点**  
`v0.6.0` 版本引入了 **`llama_batch_ext` 扩展批处理 API**，支持混合输入（标记 + 嵌入向量），并提供对 **MTP/深度堆栈状态嵌入** 的原生支持，这对高级推测性解码工作流至关重要。本次更新还新增对 **GLM-5.3-Flash (GLM5-Next) 320B 混合模型**、**Clef 决策模型（文本 + 视觉）** 的支持，并在 Hexagon、CUDA、Vulkan 及 ROCm 后端实现了关键优化——标志着多模态与大规模推理方向的强劲进展。

---

### **2. 发布与破坏性变更**  
- **`v0.6.0` 已发布**：[GitHub Release](https://github.com/ggml-org/llama.cpp/releases/tag/v0.6.0)  
  - 引入 `llama_batch_ext` 及其配套的 `llama_process`，用于处理混合输入（标记 + 嵌入）。  
  - 通过新的批处理语义，启用 MTP/深度堆栈状态嵌入支持。  
  - 若使用高级批处理或 MTP 功能，需更新依赖 `llama_batch` 的客户端代码。  
  - 迁移提示：现有 `llama_batch` 用户应查阅 [PR #29622](https://github.com/ggml-org/llama.cpp/pull/29622)，了解双嵌入+标记批处理的兼容性问题。

---

### **3. 新增模型与硬件支持**  
- **新增模型**：  
  - **GLM-5.3-Flash (GLM5-Next) 320B 混合模型**：通过 `--spec-draft-model` 和 MTP 推测支持完整实现。  
    [Issue #29811](https://github.com/ggml-org/llama.cpp/issues/29811) — *Qwen 3.8 Flash MTP 评估缺陷已确认*  
  - **Clef 决策模型（文本 + 视觉）**：服务端现已通过 `/v1/chat/completions` 支持图像令牌输入视觉输入。  
    [PR #29969](https://github.com/ggml-org/llama.cpp/pull/29969)  

- **硬件与后端**：  
  - **Hexagon (Qualcomm QNN)**：为 Gemma 4 CLIP 图谱添加 1D/2D 池化操作（`pool_1d`, `pool_2d`）。  
    [PR #29995](https://github.com/ggml-org/llama.cpp/pull/29995)  
  - **CUDA**：优化 NVFP4 下的 `mmq` 累加；提升行分片多核场景下的 flash-attention 可扩展性。  
    [PR #29974](https://github.com/ggml-org/llama.cpp/pull/29974), [PR #29857](https://github.com/ggml-org/llama.cpp/pull/29857)  
  - **Vulkan**：修复 Flash Attention 中的越界写入及预分配 `prealloc_y` 重用过时问题。  
    [PR #29988](https://github.com/ggml-org/llama.cpp/pull/29988), [PR #29591](https://github.com/ggml-org/llama.cpp/pull/29591)  
  - **ROCm/HIP**：GCN 架构（`mmq`, `stream_k`）调优持续进行中；详见 [PR #30022](https://github.com/ggml-org/llama.cpp/pull/30022) 与 [PR #30021](https://github.com/ggml-org/llama.cpp/pull/30021)

---

### **4. 性能与优化**  
- **Hexagon**：HMX 矩阵乘法现支持 F16 激活函数 + 非 32 的行数倍数；显著提升多序列任务吞吐量。  
  [PR #29779](https://github.com/ggml-org/llama.cpp/pull/29779), [PR #29626](https://github.com/ggml-org/llama.cpp/pull/29626)  
- **Vulkan**：通过子组归约优化 RMSNorm（Intel Arc B70 Pro、RTX 4060 Ti 测试验证）。  
  [PR #29882](https://github.com/ggml-org/llama.cpp/pull/29882) *(WIP)*  
- **CUDA**：行分片 flash-attention 分区策略提升核心利用率。  
  [PR #29974](https://github.com/ggml-org/llama.cpp/pull/29974)  
- **通用优化**：统一模态结构并重构上下文状态测试，提升可维护性并减少重复代码。  
  [PR #30015](https://github.com/ggml-org/llama.cpp/pull/30015), [PR #30023](https://github.com/ggml-org/llama.cpp/pull/30023)

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - `llama server` 在解码过程中因 **Gemma 4 31B (MTP + tensor)** 出现致命错误 `fattn.cu:579` 导致崩溃。  
    [Issue #24440](https://github.com/ggml-org/llama.cpp/issues/24440) — *暂无修复 PR*  
  - **Qwen3.8-Flash-Next** 在启用 MTP 并使用 `--spec-draft-model` 时启动失败。  
    [Issue #29811](https://github.com/ggml-org/llama.cpp/issues/29811) — *确认为回归问题；暂无修复 PR*  
  - **多 GPU 层分割** 在 Qwen4exp 场景下导致固定标记位置出现确定性崩溃。  
    [Issue #29562](https://github.com/ggml-org/llama.cpp/issues/29562) — *多个运行时受影响*

- **其他问题**：  
  - **Vulkan 长时间运行性能下降**：A770 GPU 在运行约 7–8 小时后返回空的 EOS 响应。  
    [Issue #29526](https://github.com/ggml-org/llama.cpp/issues/29526) — *需进一步调查*  
  - **ROCm RPC 崩溃**：在分布式 Qwen3.8-Flash-Next 使用 TOP_K 时发生崩溃。  
    [Issue #27865](https://github.com/ggml-org/llama.cpp/issues/27865) — *已过时但仍未解决*

---

### **6. 对应用开发者的意义**  
- **启用高级 MTP 工作流**：借助 `llama_batch_ext`，现在可构建使用 **混合标记/嵌入输入** 与 **深度堆栈状态追踪** 的智能体——非常适合高吞吐推测性解码场景。  
- **安全采用多模态模型**：Clef 与 GLM5-Next 支持为 **视觉增强型 LLM 智能体** 开启新可能；请确保客户端正确处理图像令牌数据。  
- **规避已知回归问题**：在修复合并前，请勿对 Qwen3.8-Flash-Next 或 Gemma 4 31B 使用 `--spec-draft-model`。  
- **针对目标硬件优化**：使用 `--target-bpw` 量化（来自 PR #15550）可自动调优模型大小与精度平衡。  
- **监控长时间运行服务**：Vulkan A770 内存泄漏是生产部署中的重大风险——建议设置重启计划或回退至 CUDA。

> ✅ **推荐操作**：升级至 `v0.6.0` 以获得完整的 MTP 与视觉支持，但在修复合并前，请对 `Qwen3.8-Flash-Next` 与 `Gemma 4 31B` 进行充分测试。  
> 🔗 请访问 [官方站点](https://llama.app) 获取二进制文件，以及 [验签文件](https://github.com/ggml-org/llama.cpp/attestations) 验证完整性。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-06**

---

### **1. 今日亮点**  
Ollama 生态系统持续演进，针对 MLX 与 CUDA 后端的关键稳定性修复已上线，尤其聚焦于 GPU 内存驻留及模型加载失败问题。值得注意的是，`glm-ocr`（0.35.1）出现回归问题，导致表格识别功能失效；多个问题凸显了 Qwen 系列变体在工具调用解析一致性方面的持续挑战。性能优化工作正在推进中，包括 Gemma4 在 CUDA 上的 SDPA 加速。

---

### **2. 版本发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，**0.35.1** 版本正受到密切关注，因其存在若干回归问题：
- `glm-ocr:latest` 现在无法生成 HTML 表格，并陷入无限循环（`#18810`）——可能为解析器或分词逻辑问题。
- `clef-flash` 模型在 `/v1/systemone` 上崩溃，尽管在 `/v1/chat/completions` 上运行正常（`#18769`）。
- `envconfig` 模块在 `OLLAMA_KEEP_ALIVE`/`OLLAMA_LOAD_TIMEOUT` 中存在已知整数溢出风险（`#18799`，已在 PR `#18800` 中修复）。

> 🔗 [Issue #18799](https://github.com/ollama/ollama/issues/18799), [PR #18800](https://github.com/ollama/ollama/pull/18800)

---

### **3. 新模型与硬件支持**  
- **MLX 引擎**：新增对 **Kolibri 1** 的支持（PR `#18780`），进一步扩展 Apple Silicon 兼容性。
- **CUDA**：Gemma4 模型现已利用 **MLX 的 SDPA 内核**处理宽头维度（如 128+ 头），显著提升预填充速度（`#18809`）。
- **ROCm（Windows）**：GPU 支持列表扩展至 `gfx1030`、`gfx1150`、`gfx1151`、`gfx1200`、`gfx1201` —— 对 AMD 用户至关重要（`#18623`）。

> 🔗 [PR #18780](https://github.com/ollama/ollama/pull/18780), [PR #18809](https://github.com/ollama/ollama/pull/18809), [PR #18623](https://github.com/ollama/ollama/pull/18623)

---

### **4. 性能与优化**  
- **Gemma4 on CUDA**：使用 MLX 的 SDPA 内核，使提示处理速度提升 **约 12 倍（e2b）**，**2–4 倍（12B 模型）**（`#18809`）。
- **MLX 内存效率**：通过每秒刷新一次模型驻留状态，缓解了 GPU 空闲后的高延迟问题（`#18807`），解决了 `#18744`。
- **模型查找开销**：减少冗余清单解码，复用 Metal 临时缓冲区（`#18806`）。
- **工具调用流式传输**：通过重用 `FinishMessageItem` 优化事件流顺序和消息关闭逻辑（`#18804`）。

> 🔗 [PR #18809](https://github.com/ollama/ollama/pull/18809), [PR #18807](https://github.com/ollama/ollama/pull/18807), [PR #18806](https://github.com/ollama/ollama/pull/18806)

---

### **5. 稳定性与回归问题**  
**高严重性**：
- `clef-flash` 模型在 `/v1/systemone` 上失败，报错“非有限 logits”（CUDA）或“无法打开模型”（CPU）——尽管在其他接口正常运行（`#18769`）。目前尚无解决方案。
- `glm-ocr` 在 0.35.1 中的回归导致循环执行并输出纯文本而非结构化 HTML（`#18810`）。影响 Windows + RTX 5060 Ti 平台。
- `llama-server` 在全缓存命中任务中卡死（CUDA，Linux），导致后续所有请求挂起，直至模型卸载（`#18685`）。对生产环境影响重大。

**中等严重性**：
- `qwen3.6` 工具调用输出偶尔因解析器不匹配（使用 qwen3.5 解析逻辑）而失败——引发间歇性 500 错误（`#16383`）。
- `Muse Glimmer 30B GGUF` 无响应；疑似 Jinja 模板冲突（`#18808`）。
- `mistral-medium-3.5:128b` 在 M4 Mac 上消耗超过 127GB 内存，且运行速度仅为约 1 词/分钟（`#18770`）。

> 🔗 [Issue #18769](https://github.com/ollama/ollama/issues/18769), [Issue #18810](https://github.com/ollama/ollama/issues/18810), [Issue #18685](https://github.com/ollama/ollama/issues/18685)

---

### **6. 对应用开发者的影响**  
- **避免在 0.35.1 中使用 `glm-ocr:latest`** —— 若需处理 OCR 任务，请回退至 0.34.0，或通过 `--no-cache` 选项进行临时修复。
- **使用 `qwen3.6` 时需验证工具调用解析器**：若依赖 `qwen3.5` 的解析逻辑，应预期可能出现间歇性 500 错误。
- **监控大型模型（如 `mistral-medium-3.5:128b`）的加载行为**：内存压力可能导致严重性能下降。
- **谨慎设置 `OLLAMA_KEEP_ALIVE`**：值超过 2^31 秒可能发生整数溢出，导致超短超时时间——若自定义该参数，请应用 `#18800` 修复。
- **对于代理框架**：确保流式处理器正确处理 `output_index` 重用及消息关闭逻辑（`#18798` → `#18804`）。

> 🔗 [修复 PR #18804](https://github.com/ollama/ollama/pull/18804), [修复 PR #18800](https://github.com/ollama/ollama/pull/18800)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-10-06**

---

### **1. 今日重点**  
LiteLLM 生态系统迎来一系列关键错误修复与集成测试优化，尤其集中在费用归属、流式行为以及 JWT/授权流程方面。重要 PR 解决了长期存在的支出日志问题（如流式请求的 `spend = 0`）、修正了模型组中的错误路由，并增强了代理在并发负载下的稳定性。核心关注点在于提升 `/v1/messages`、`/responses` 和预算相关端点的可靠性——这些对生产环境中的智能体系统至关重要。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但多个补丁版本的 PR 已合并，用于更新各稳定分支的依赖项：  
- [PR #44777](https://github.com/BerriAI/litellm/pull/44777) → v1.104.1 (stable/1.104.x)  
- [PR #44776](https://github.com/BerriAI/litellm/pull/44776) → v1.103.4 (stable/1.103.x)  
- [PR #44775](https://github.com/BerriAI/litellm/pull/44775) → v1.102.3 (stable/1.102.x)  
- [PR #44774](https://github.com/BerriAI/litellm/pull/44774) → v1.100.5 (stable/1.100.x)  
- [PR #44773](https://github.com/BerriAI/litellm/pull/44773) → v1.101.5 (stable/1.101.x)  

这些为**非破坏性依赖更新**，旨在提升安全性和兼容性；无 API 变更。

---

### **3. 新模型与硬件支持**  
*今日未新增模型或硬件后端。*  
但在多模态路由处理方面取得显著进展：  
- [PR #44211](https://github.com/BerriAI/litellm/pull/44211) 修复了 DeepSeek 在 `role=tool` 消息中静默丢弃图像内容的问题——现可在视觉增强工作流中正确保留。  
- [PR #44679](https://github.com/BerriAI/litellm/pull/44679) 确保区域上浮倍数正确应用于 **Vertex AI 图像生成**，从而实现全球部署模型的准确费用追踪。

---

### **4. 性能与优化**  
*今日未落地直接的吞吐量或延迟优化*，但在**可扩展性准备**和**资源管理**方面取得重要进展：  
- [PR #44638](https://github.com/BerriAI/litellm/pull/44638) 改进了预算豁免逻辑，现在检查的是 *目标模型组*，而非仅别名名称——防止因误判导致预算超额拒绝。  
- [PR #44732](https://github.com/BerriAI/litellm/pull/44732) 确保模型组定价基于实际服务部署，避免因别名链导致的定价错误。  
- [Issue #41420](https://github.com/BerriAI/litellm/issues/41420)：代理在低流量期间仍存在空闲连接保留问题——对使用 PGBouncer 的大规模部署仍是持续关注点。

> ⚠️ 对于目标达到 500M TPM（参考 [Issue #38081](https://github.com/BerriAI/litellm/issues/38081)）的用户，PostgreSQL 连接池与空闲连接清理仍是关键瓶颈，需手动调优。

---

### **5. 稳定性与回归问题**  
今日报告的前三大稳定性问题：

| 问题 | 严重性 | 修复状态 | 链接 |
|------|----------|------------|------|
| [#44748](https://github.com/BerriAI/litellm/issues/44748) – 并发调用 `/v1/messages` 导致 `dictionary changed size during iteration`（500 错误） | 严重 | ❌ 尚未修复 | [GitHub Issue](https://github.com/BerriAI/litellm/issues/44748) |
| [#44546](https://github.com/BerriAI/litellm/issues/44546) – `aspeech` 调用 Gemini TTS 两次 → 双重计费 | 高 | ✅ PR 待审 ([#44546](https://github.com/BerriAI/litellm/pull/44546)) | [GitHub PR](https://github.com/BerriAI/litellm/pull/44546) |
| [#44560](https://github.com/BerriAI/litellm/issues/44560) – `output_config.effort` 未映射至 `/v1/messages` 下通过 `hosted_vllm` 使用的 `reasoning_effort` | 中等 | ❌ 尚未修复 | [GitHub Issue](https://github.com/BerriAI/litellm/issues/44560) |

> 🔥 **严重警告**：在高并发下 `/v1/messages` 中出现的 `dictionary changed size during iteration` 崩溃可能导致生产系统数据丢失或财务统计不准确。

---

### **6. 对应用开发者的意义**  
- 在修复 PR #44748 前，**避免在高并发场景下使用 `/v1/messages`** —— 可暂时改用 `/chat/completions` 作为替代。  
- 若使用 **Gemini TTS**，请确保已包含 [PR #44546](https://github.com/BerriAI/litellm/pull/44546) 版本，以防止双重计费。  
- 使用 `model_group_alias` 时需谨慎：若别名与付费模型同名，可能错误触发预算检查（参见 [PR #44638](https://github.com/BerriAI/litellm/pull/44638)）。  
- **流式请求的花费日志不可靠** —— 当成本准确性至关重要时，请优先使用非流式调用（参见 [Issue #42161](https://github.com/BerriAI/litellm/issues/42161)）。  
- 利用新推出的**集成测试** ([PR #44733](https://github.com/BerriAI/litellm/pull/44733), [#44736](https://github.com/BerriAI/litellm/pull/44736))，根据真实网络协议验证自身代理配置。

> 💡 实用技巧：使用新功能 **Lens 数据集** ([PR #44765](https://github.com/BerriAI/litellm/pull/44765)) 保存并复用真实用户轨迹，适用于智能体微调与安全护栏验证。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-06**

---

### **1. 今日亮点**  
Unsloth 团队持续优先保障桌面端与 Studio UI 的稳定性及用户体验，多个 PR 聚焦于微调和导出工作流中保留模型元数据（提示词、模板、聊天配置）。关键修复解决了上下文处理、内存管理及 API 一致性方面的回归问题，尤其针对 Qwen3 系列模型和基于 LoRA 的推理。值得注意的是，`fast_inference` 下对 MoE 架构（Qwen3.5/3.6、Gemma-4）的支持正通过 PR #12742 积极探索。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
然而，多项破坏性变更正在推进中：  
- **PR #12794**：修复导出在 Mac 上训练的 LoRA 时错误使用聊天模板的问题，确保基础模型提示词得以保留。  
- **PR #12795**：恢复嵌入模型（EmbeddingGemma、Qwen3-Embedding）丢失的 `model.prompts`，防止因缺少正确提示注入而无法训练。  
- **PR #12791**：确保使用 Qwen3 思考模式时，API 客户端获得与交互式聊天模式相同的采样参数（temperature=0.6, top_p=0.95）。  

👉 [PR #12794](https://github.com/unslothai/unsloth/pull/12794) | [PR #12795](https://github.com/unslothai/unsloth/pull/12795) | [PR #12791](https://github.com/unslothai/unsloth/pull/12791)

---

### **3. 新模型与硬件支持**  
- **MoE 模型（Qwen3.5/3.6、Gemma-4）**：实验性支持在应用 LoRA 到专家层时启用 `fast_inference=True`，当前开发中（PR #12742），将通过 vLLM 实现大规模混合专家模型的高吞吐推理。  
- **Intel GPU 支持**：用户持续请求原生 Intel GPU 集成（超越 Vulkan llama.cpp，Issue #8931），但尚未发布官方构建。  
- **ModelScope 集成**：功能请求 #2969 希望支持从 ModelScope 下载模型而非 Hugging Face，对受 HF 访问限制地区用户尤为重要。

👉 [PR #12742](https://github.com/unslothai/unsloth/pull/12742) | [Issue #2969](https://github.com/unslothai/unsloth/issues/2969) | [Issue #8931](https://github.com/unslothai/unsloth/issues/8931)

---

### **4. 性能与优化**  
- **上下文使用可视化**：PR #12805 引入基于环形的上下文使用指示器（`3.2k / 131.1k`）替代条形图，提升一眼可读性。  
- **代码字体大小修复**：默认代码字体已统一设置为 12px，适配所有屏幕宽度，保持界面一致性。  
- **内存管理优化**：  
  - PR #12752 通过优化内存分配逻辑，使 Qwen-Image-2.1 在 16GB GPU 上可正常编辑。  
  - PR #12753 在流式推理过程中延迟加载非固定块，防止主机内存过度占用。  
- **网页搜索稳定性**：Issue #12638 报告 `primp h2_client` 出现连接重置，表明需持续优化 HTTP/2 栈。

👉 [PR #12805](https://github.com/unslothai/unsloth/pull/12805) | [PR #12752](https://github.com/unslothai/unsloth/pull/12752) | [PR #12753](https://github.com/unslothai/unsloth/pull/12753)

---

### **5. 稳定性与回归问题**  
- **Studio 中严重 T/S 回归**（Issue #12372）：MM 投影文件（`mmproj-F16.gguf`）在生成时从磁盘分页，导致延迟大幅增加。*修复待定。*  
- **“思考”切换无法抑制推理输出**（Issue #12708）：对于 `gemma-4-E4B-it-qat-GGUF`，开启“思考”开关后仅输出内部推理步骤，无最终响应。严重程度高，影响代理逻辑。  
- **导出至 GGUF 失败因只读缓存**（Issue #11785）：合并步骤因 HF 缓存中不可变的模型文件失败。*临时方案：清空缓存或使用本地路径。*  
- **Qwen3.5 SFT 损失变为 NaN**（Issue #12737）：尽管训练数据完全一致且干净，仍出现确定性损失爆炸——可能源于梯度或优化器问题。  
- **ARM64 Linux 构建被误识别**（Issue #12680）：下载的 ARM64 包实为 macOS 二进制文件，导致 Linux 部署失败。*亟需关键修复。*

👉 [Issue #12372](https://github.com/unslothai/unsloth/issues/12372) | [Issue #12708](https://github.com/unslothai/unsloth/issues/12708) | [Issue #11785](https://github.com/unslothai/unsloth/issues/11785) | [Issue #12737](https://github.com/unslothai/unsloth/issues/12737) | [Issue #12680](https://github.com/unslothai/unsloth/issues/12680)

---

### **6. 对应用开发者的影响**  
- **在 PR #12742 上线前，避免对已应用 LoRA 的 MoE 模型使用 `fast_inference=True`** —— 当前不支持，会引发运行时错误。  
- **微调后务必验证提示词是否保留**，尤其是嵌入或视觉模型（参见 PR #12795、#12794）。  
- **使用 Qwen3 思考模式时，API 客户端必须显式设置采样参数** —— 默认值与聊天 UI 行为不同（PR #12791）。  
- **长上下文对话可能存在不稳定**，若性能下降，建议禁用 `mmproj` 缓存（Issue #12372）。  
- **备份策略应包含项目文件夹与 Library 状态**，因 Docker 卷不会持久化项目文件（PR #12792）。  

> ✅ **建议**：关键模型应固定版本，并使用 `.unsloth portable archive` 导出（Issue #8798）以实现跨设备复现。请关注 GitHub 上关于 MoE 支持及 ARM64 Linux 构建的更新。

---  
*本摘要源自 unslothai/unsloth GitHub 活动 — 2026-10-06*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*