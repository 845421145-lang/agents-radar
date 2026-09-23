# AI 基础设施日报 2026-09-23

> 生成时间: 2026-09-23 00:52 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-09-23**

---

### **1. 生态概览**  
AI 推理与服务生态正进入 *硬件专业化、分布式可扩展性、多模态融合* 的新阶段。各项目日益分化：vLLM 和 SGLang 在高吞吐、低延迟推理方面，凭借深度硬件集成引领发展；llama.cpp 与 Ollama 主导轻量级、可移植、针对 Apple Silicon 优化的本地部署；LiteLLM 已成为面向成本敏感、多提供商编排的通用网关；而 Unsloth 则在多模态智能体性能与训练效率上持续突破边界。尽管关键稳定性问题仍存——尤其是推测解码、KV 缓存损坏和量化保真度——但各层级的优化势头强劲。

---

### **2. 活动对比**

| 项目         | 开放议题 (↑) | 合并的 PR (↑) | 最近发布？ | 备注 |
|----------------|------------------|------------------|------------------|-------|
| **vLLM**       | 58 (↑7)          | 762 (↑315 贡献者) | ✅ v0.30.0       | 贡献者数量最高；新模型/硬件支持占主导 |
| **SGLang**     | 48 (↑5)          | 142 (↑21)         | ❌ 无           | 回归缺陷密度高；正在积极推进 DCP/Helix 扩展 |
| **llama.cpp**  | 67 (↑6)          | 128 (↑19)         | ✅ `b11115`       | 核心层优化强劲；存在关键的推测解码漏洞 |
| **Ollama**     | 52 (↑4)          | 89 (↑12)          | ❌ 无（仅 RC） | 注重稳定性；macOS/Windows GPU 检测存在盲区 |
| **LiteLLM**    | 39 (↑3)          | 76 (↑10)          | ✅ v1.102.0       | 安全优先版本；成本核算修复至关重要 |

> 🔍 *洞察*：vLLM 在创新速度上领先；SGLang 与 LiteLLM 优先保障可靠性与安全性；llama.cpp 与 Ollama 仍保持对边缘/本地场景的敏捷响应。

---

### **3. 模型支持竞赛**

| 新模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|--------------------------|------|--------|-----------|--------|---------|
| **DeepSeek-V4.1-Flash**   | ✅ (MXFP8 + FlashMLA V4.1 on SM100) | ⚠️ 待定 | ⚠️ 待定 | ⚠️ 待定 | ⚠️ 待定 |
| **Kimi-K3 (MXFP4)**       | ✅ (ROCm gfx950/Mi355X CI) | ✅ (Quark 量化) | ⚠️ 进行中 | ⚠️ 进行中 | ⚠️ 进行中 |
| **Qwen-Image-2.1**        | ⚠️ 跟踪中 | ⚠️ 跟踪中 | ⚠️ 跟踪中 | ✅ (完整支持) | ✅ (v0.1.814-beta) |
| **Gemma 4 Vision (动态分辨率)** | ⚠️ 待定 | ⚠️ 待定 | ⚠️ 待定 | ✅ (PR #18603) | ⚠️ 待定 |
| **Wan2.2-TI2V (FP8 视频)** | ⚠️ 待定 | ⚠️ 待定 | ⚠️ 待定 | ⚠️ 待定 | ✅ (PR #10729) |
| **AMD RDNA1 (gfx1010)**   | ⚠️ 部分支持 | ⚠️ 部分支持 | ⚠️ 部分支持 | ⚠️ 已损坏 | ✅ (PR #11615) |

> 🏆 **胜出者**：**Unsloth** —— 对多模态模型（Qwen-Image-2.1）、视频 FP8 及 AMD RDNA1 训练的采纳速度最快。  
> 🥈 **亚军**：**Ollama** —— 通过 MLX 提供最强的消费者级支持，涵盖 Gemma 4 vision 与 Qwen-Image-2.1。  
> 🥉 **企业推理领导者**：**vLLM** —— 与 Hopper+ GPU 深度集成，支持 MXFP8/KV 缓存，适配大规模云端大模型服务。

---

### **4. 性能前沿**

| 优化重点               | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|-----------------------------------|------|--------|-----------|--------|---------|
| **KV 缓存与评分**            | ✅ (MXFP8, paged MQA 评分器) | ✅ (DSA 稀疏索引器) | ⚠️ (FP8 解码减速) | ⚠️ (无直接修复) | ⚠️ (内存不匹配) |
| **批处理与并行**        | ✅ (MoE 路由, All-to-all EP) | ✅ (DCP + Helix + fi_a2a) | ⚠️ (Grouped MoE 融合) | ⚠️ (有限) | ⚠️ (多模型切换) |
| **量化与反量化** | ✅ (MXFP4 → block-FP8, 融合 AWQ) | ✅ (NVFP4, Quark) | ✅ (DP4A, IQ3_S, XMX GEMM) | ✅ (Qwen3.8 中保留 BF16) | ✅ (整模型 NVFP4, 压缩 INT4/INT8) |
| **内核级融合**          | ✅ (FlashMLA V4.1, 融合 AWQ + GEMM) | ✅ (JIT L1 切割, 统一基数缓存) | ✅ (Split-k FA, XMX GEMM) | ⚠️ (Metal 重采样) | ✅ (FlashInfer FP4 线性层) |
| **分布式服务**           | ⚠️ (进展中) | ✅ (DCP + Helix + PD 解耦) | ❌ | ❌ | ❌ |

> 🔥 **趋势**：硬件特化内核（如 SM100 FlashMLA、ROCm DSA、Intel XMX）已成为竞争核心优势。量化不再只是压缩手段——而是架构层面的关键杠杆。

---

### **5. 层级定位**

| 项目         | 主要层级              | 次要角色                     | 核心差异点 |
|----------------|----------------------------|-------------------------------------|--------------------|
| **vLLM**       | **推理引擎**       | 模型服务（通过异步服务器）   | Hopper+ 上最大吞吐；适用于云规模大模型服务 |
| **SGLang**     | **分布式服务栈** | 网关 + 并行编排器 | 行业领先的 DCP + Helix + PD 解耦 |
| **llama.cpp**  | **本地运行时**          | 轻量推理后端      | 跨平台、开源、依赖极小 |
| **Ollama**     | **网关 + 本地运行时** | 智能体 UI、CLI、应用部署      | 无缝的 Apple Silicon 体验；动态图像处理能力 |
| **LiteLLM**    | **通用 API 网关**  | 成本控制、多提供商路由 | 通过 Cosign 签名镜像建立信任；精确计费逻辑 |
| **Unsloth**    | **智能体平台 + 训练工具** | 多模态推理、微调 | 快速推理（60 FPS）、多模型加载、Jev API |

> 🧩 **战略洞察**：技术栈正呈现两极分化：**工程师**选择 vLLM/SGLang 实现规模化；**开发者**倾向于 Ollama/Unsloth 追求速度与用户体验；**平台团队**依赖 LiteLLM 实现可观测性与成本管控。

---

### **6. 趋势信号**

#### **今日活动揭示的新兴趋势：**
1. **硬件特化优化已成为基本门槛**  
   - MXFP8、FP4、DP4A、split-k FA、ROCm DSA 已不再是实验性功能——它们是实现竞争力性能的必备条件。  
   - *开发者建议*：根据目标硬件（Hopper vs. AMD vs. Intel XPU）选择技术栈。

2. **推测解码在大规模场景下仍不稳定**  
   - SGLang（EAGLE）、vLLM（DeepSeek-V4-Flash）、llama.cpp（Q4_K_M）中多次出现回归问题，表明推测推理仍存在精度与竞态条件问题。  
   - *开发者建议*：在修复 PR #40623、#25618、#36333 前，避免在生产环境使用推测解码。

3. **多模态智能体正成为第一类公民**  
   - Qwen-Image-2.1、Gemma 4 动态分辨率、Wan2.2-TI2V、Omnivoice TTS 显示出向完整多模态智能体流程快速收敛的趋势。  
   - *开发者建议*：尽早构建支持图像/视频输入的智能体工作流——Unsloth 与 Ollama 已准备就绪。

4. **安全与可信性在生产环境中被优先考虑**  
   - LiteLLM 的 Cosign 签名、Ollama 的 CUDA 检测修复、vLLM 的稳定 API 反映出供应链与运行时安全性的成熟度提升。  
   - *开发者建议*：验证镜像签名，避免在生产中使用 `port=0` 或未打补丁的 RC 版本。

5. **成本准确性驱动多租户环境中的采用**  
   - LiteLLM 修复双重计数速率限制与零成本流式调用的问题，凸显财务完整性不可妥协。  
   - *开发者建议*：启用计费时使用标准 `model_name`，而非别名。

---

### ✅ **面向应用开发者的最终建议**  
- **云规模智能体**：使用 **vLLM**（SM100）或 **SGLang**（多节点）搭配 **DeepSeek-V4.1-Flash** 与 **MXFP8 KV 缓存**。  
- **Apple Silicon 智能体**：利用 **Ollama** 搭载 `qwen3.8-flash-next` 与 **动态图像分辨率**。  
- **本地多模态智能体**：**Unsloth** 提供无与伦比的速度（60 FPS）与模型灵活性。  
- **成本可控部署**：集成 **LiteLLM**，使用经验证的 Docker 镜像，并保持 `model_name` 的规范性。  
- **避免**：在量化模型上使用推测解码，Studio 中使用 `--tensor-split`，以及未打补丁的 RC 版本。

> 📌 *核心结论*：基础设施层已不再仅仅是“追求速度”——它关乎 **硬件对齐、可信性、成本可预测性、多模态就绪性**。选择需审慎。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM 摘要 – 2026-09-23**

---

### **1. 今日亮点**  
vLLM v0.30.0 版本正式发布，新增对 **DeepSeek-V4.1-Flash** 的关键支持，利用 **MXFP8 存储** 和 **SM100 上的 FlashMLA V4.1 记录**，显著提升预填充（prefill）吞吐量。同时，针对 AMD ROCm 平台（gfx950/Mi355X）和 Intel XPU 的性能优化持续推进，新内核已开始支持稀疏注意力、分页评分（paged scoring）及 MoE 路由。

---

### **2. 发布与破坏性变更**  
- **v0.30.0**：今日发布，共包含 762 次提交，来自 315 名贡献者（其中 104 人为新贡献者）。未报告任何破坏性 API 变更；重点聚焦于新模型支持与后端改进。  
  🔗 [发布 v0.30.0](https://github.com/vllm-project/vllm/releases/tag/v0.30.0)

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1-Flash**：已完整支持，通过 SM100（Hopper+）上的 FlashMLA V4.1 实现 MXFP8 KV 缓存。  
  🔗 [PR #56214](https://github.com/vllm-project/vllm/pull/56214), [Issue #56893](https://github.com/vllm-project/vllm/issues/56893)  
- ✅ **Kimi-K3**：CI 测试现已包含 MI355X（ROCm gfx950）；完整集成仍在跟踪中。  
  🔗 [Issue #50001](https://github.com/vllm-project/vllm/issues/50001), [PR #58012](https://github.com/vllm-project/vllm/pull/58012)  
- ✅ **AMD ROCm (gfx950/Mi355X)**：针对 Qwen3.8-2.4T-A95B-Quark-MXFP4 已启动性能优化流程。  
  🔗 [Issue #57149](https://github.com/vllm-project/vllm/issues/57149)  
- ✅ **Intel XPU**：批处理 MoE 的 all-to-all EP 后端正在开发中；初步支持双 Arc Pro B70（Battlemage）。  
  🔗 [PR #46871](https://github.com/vllm-project/vllm/pull/46871)

---

### **4. 性能与优化**  
- **SM100 (Hopper)**：启用无损 MXFP4 → block-FP8 专家反量化，可提升 DeepSeek-V4 的预填充速度。  
  🔗 [PR #53709](https://github.com/vllm-project/vllm/pull/53709)  
- **ROCm gfx950/Mi355X**：候选仅限的分页 MQA 评分器配合 DSA 稀疏索引器解码，降低解码延迟。  
  🔗 [PR #57859](https://github.com/vllm-project/vllm/pull/57859)  
- **NVIDIA SM89**：在 `VLLM_BATCH_INVARIANT` 下，融合 AWQ 反量化 + GEMM 内核避免中间 FP16 材料化。  
  🔗 [PR #57047](https://github.com/vllm-project/vllm/pull/57047)  
- **DiffusionGemma**：单次遍历采样器统计内核减少内存压力并提升吞吐量。  
  🔗 [PR #58226](https://github.com/vllm-project/vllm/pull/58226)  
- **通用优化**：在 `VLLM_BATCH_INVARIANT` 下默认启用可中断的 CUDA 图（无需 `torch.compile`），以增强矩阵乘法调优的适应性。  
  🔗 [PR #57586](https://github.com/vllm-project/vllm/pull/57586)

---

### **5. 稳定性与回归问题**  
- **严重**：GLM-5.3-Flash 在累积推理（多轮代理使用场景）后出现重复令牌“词乱”现象及长时间解码退化。  
  🔗 [Issue #56868](https://github.com/vllm-project/vllm/issues/56868), [Issue #56605](https://github.com/vllm-project/vllm/issues/56605)  
- **高严重性**：DeepSeek-V4-Flash 在 L20 上因 `AssertionError: auto_functionalized was not removed` 导致崩溃。  
  🔗 [Issue #42949](https://github.com/vllm-project/vllm/issues/42949)  
- **ROCm/AMD**：MI325X 上提示长度 ≥4k token 时出现静默检索损坏，源于 AITER 稀疏索引器的缺陷。  
  🔗 [Issue #52109](https://github.com/vllm-project/vllm/issues/52109)  
- **内存损坏**：DiffusionGemma 在并发解码时因张量形状不匹配（`257 vs 256`）而失败。  
  🔗 [Issue #58035](https://github.com/vllm-project/vllm/issues/58035)  
- **修复中的 PR**：  
  - [PR #57859](https://github.com/vllm-project/vllm/pull/57859)：修复 ROCm 上 DSA 稀疏解码的垃圾数据问题。  
  - [PR #58226](https://github.com/vllm-project/vllm/pull/58226)：解决 DiffusionGemma 采样器崩溃问题。

---

### **6. 对应用开发者的意义**  
- **模型选择**：在 SM100 GPU 上优先选用 **DeepSeek-V4.1-Flash** 进行高吞吐推理；预期将获得基于 MXFP8 的更优预填充效率。  
- **代理工作负载**：在稳定性修复落地前，避免在多轮代理流程中使用 **GLM-5.3-Flash** —— 预期输出会出错。  
- **性能调优**：在 Hopper+ 平台上建议使用 `VLLM_BATCH_INVARIANT=1` 配合可中断 CUDA 图，以获得更好的运行时矩阵乘法调优能力。  
- **AMD 用户**：关注 ROCm 特有问题（如 #52109, #57149）；若需稳定解码，可临时禁用 CUDA 图。  
- **量化策略**：在 SM89 设备上利用融合 AWQ 内核（PR #57047）以降低内存开销。  

> 💡 **行动项**：在部署使用 GLM-5.3 或 Kimi-K3 的生产级代理前，请查阅 [问题追踪器](https://github.com/vllm-project/vllm/issues) 中的模型特定限制。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **1. 今日亮点**  
SGLang 在分布式推理栈方面取得关键进展，重点推进 **解码上下文并行（DCP）** 与 **Helix 并行**，现已将 `fi_a2a`/`a2a` 设为所有模型的默认通信后端。**进程间通信（IPC）的完整 msgpack 迁移**工作持续深入，显著提升序列化效率并减少对旧版 Pickle 的依赖。同时，针对 **EAGLE 伪编码** 和 **PD 分离式 KV 缓存传输** 的稳定性问题已进行关键修复，确保在高并发场景下的系统鲁棒性。

---

### **2. 发布与破坏性变更**  
*无* — 上一整天内未发布新版本或破坏性变更。

---

### **3. 新模型与硬件支持**  
- ✅ **Kimi-K3 MXFP4** 已通过 PR [#40811](https://github.com/sgl-project/sglang/pull/40811) 支持在 **AMD ROCm（Quark 量化）** 上运行。  
- ✅ **SenseNova-U1 / U1.5** 的集成正在 Issue [#37742](https://github.com/sgl-project/sglang/issues/37742) 中跟踪，与官方 OpenSenseNova 参考实现保持一致。  
- ✅ **NPU CANN 9.1.0** 更新已合并至 PR [#40524](https://github.com/sgl-project/sglang/pull/40524)，支持新一代 Ascend 硬件及 Python 3.12。  
- ✅ **DFlash 支持已添加至 Kimi-K3**，见 PR [#40794](https://github.com/sgl-project/sglang/pull/40794)，作为更广泛的 PD+DCP+DFlash 流水线架构的一部分。

---

### **4. 性能与优化**  
- 🔧 **DCP + Helix 并行** 已全面启用，并以 `fi_a2a`/`a2a` 作为默认通信后端（PRs #39165, #37767, #21637），支持高效多节点扩展。  
- 🚀 **JIT 内核优化**：PR [#40767](https://github.com/sgl-project/sglang/pull/40767) 引入 *保留占用率的 L1 切割偏好*，在维持内核占用率的同时降低共享内存开销。  
- ⚙️ **统一基数缓存重构**：PRs [#38652](https://github.com/sgl-project/sglang/pull/38652) 与 [#39627](https://github.com/sgl-project/sglang/pull/39627) 集成 **LMCache** 并同步 Rust TreeCore 作为默认实现，减少代码重复，提升各后端间的性能一致性。  
- 💡 **伪编码优化改进**：PR [#39643](https://github.com/sgl-project/sglang/pull/39643) 在流水线（PP）中实现了模型无关的末阶段草稿嵌入，提升兼容性并降低流水线场景下的开销。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|-----------|
| 严重 | [#40623](https://github.com/sgl-project/sglang/issues/40623) | 当启用 `flashinfer_megamoe` + EAGLE 伪编码时，Triton 融合 MoE 内核出现非法内存访问（GLM-5.2-NVFP4, sm_107） | ❌ 待处理 |
| 高 | [#36333](https://github.com/sgl-project/sglang/issues/36333) | 断开流式客户端后出现僵尸请求 → 导致“状态已被删除”日志泛滥（由 #34160 回滚引发的回归） | ❌ 待处理 |
| 高 | [#33397](https://github.com/sgl-project/sglang/issues/33397) | 高并发下输出逐步损坏（DeepSeek-V4-Flash，2× H200，dsv4 + DP 注意力） | ❌ 待处理 |
| 中 | [#39831](https://github.com/sgl-project/sglang/issues/39831) | GLM-5.3-Flash 视觉功能因 pinned transformers==5.12.1 缺少 `glm5_next` 而静默失效，回退至 TokenizersBackend | ✅ PR #39831 中部分修复 |
| 中 | [#30815](https://github.com/sgl-project/sglang/issues/30815) | FP8 KV 缓存解码性能下降：未融合的 K/V 量化 + 每层 Q 转换开销 | ❌ 待处理 |

> ⚠️ **注意**：多个回归问题与 **EAGLE 伪编码**、**DP 注意力** 及 **多节点分离架构** 相关，表明生产级部署仍在经历持续压力测试。

---

### **6. 对应用开发者的影响**  
- **使用 DCP + Helix** 并配合 `--dcp-comm-backend fi_a2a`，可在多节点集群中实现可扩展、低延迟的推理——这已是推荐路径。  
- **避免使用废弃接口**：PR [#40795](https://github.com/sgl-project/sglang/pull/40795) 已移除过时的端点与环境变量；请在下一版本发布前更新配置文件。  
- **启用 `--enable-dsa-cache-layer-split`** 以支持单部署场景（跟踪 #32309），简化 MoE 模型部署流程。  
- **若使用 `flashinfer_megamoe` + EAGLE 于 NVFP4 模型，请留意相关崩溃风险** —— 建议暂固定至稳定版 `main`，直至 PRs #40623 与 #36333 解决。  
- **利用统一基数缓存**（Rust TreeCore）以获得更好的缓存复用和更低延迟——当前已是默认方案，性能优于旧路径。

👉 *最佳实践*：对于涉及伪编码或大规模 MoE 模型的生产部署，应密切关注 PRs #40623、#36333 与 #33397 —— 它们代表了关键的稳定性风险。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-23**

---

### **1. 今日重点**  
最新更新聚焦于服务器与后端内核的关键稳定性修复，特别是关于推测解码竞争条件以及模型加载并发性的问题。在 Intel Xe GPU（Vulkan）的新优化和 OpenCL 上对 A8-Q4_K 的支持方面，硬件进展尤为显著。在 PR 流水线中，跨 CUDA、SYCL 与 Vulkan 平台的 MoE 融合及量化内核优化展现出强劲势头。

---

### **2. 发布与破坏性变更**  
- **`b11115`**：为不包含 MoE 的 A8 Q4_K 模型新增 OpenCL 二进制内核 `kernel_gemm_noshuffle_q4_k_q8_1_dp4a_ila_a8_bin`，支持 DP4A 加速。  
  🔗 [PR #29056](https://github.com/ggml-org/llama.cpp/pull/29056)  
- **`b11113`**：修复 `llama-server` 中日志文件向子进程传播的问题，提升安全性和进程隔离性。  
  🔗 [PR #29212](https://github.com/ggml-org/llama.cpp/pull/29212)  
- **`b11112`**：通过服务器 API 启用 `function_call_output` 中的 `input_image` —— 对多模态代理工作流至关重要。  
  🔗 [PR #20663](https://github.com/ggml-org/llama.cpp/pull/20663)  

> ⚠️ 无破坏性 API 变更；所有更新均为新增或修正性质。

---

### **3. 新模型与硬件支持**  
- **OpenCL**：通过新优化的 DP4A 二进制内核（`b11115`），全面支持 **A8 Q4_K 非 MoE** 量化模型。  
  🔗 [PR #29056](https://github.com/ggml-org/llama.cpp/pull/29056)  
- **Vulkan**：为 Xe-LPG Plus/Xe2/Xe3 架构新增 **Intel Xe Flash Attention（split-k 路径）** 优化。  
  🔗 [PR #24406](https://github.com/ggml-org/llama.cpp/pull/24406)  
- **SYCL**：持续增强对 **Intel Arc Pro B70** 的支持，包括 IQ3 代码重排与持久化布局。  
  🔗 [PR #29107](https://github.com/ggml-org/llama.cpp/pull/29107)  
- **模型支持**：MTP 草稿模型现支持 `d2t`（草稿到目标）词汇表裁剪（Qwen3.5/MTP）。  
  🔗 [PR #29290](https://github.com/ggml-org/llama.cpp/pull/29290), [PR #29143](https://github.com/ggml-org/llama.cpp/pull/29143)

---

### **4. 性能与优化**  
- **CUDA**：新增 **分组专家 top-k 融合** → 恢复了专家分组带来的大部分性能损失。  
  🔗 [PR #29181](https://github.com/ggml-org/llama.cpp/pull/29181)  
- **SYCL**：引入 **XMX GEMM 用于分组 MoE**，以更好利用 Intel Arc 的计算单元。  
  🔗 [PR #29245](https://github.com/ggml-org/llama.cpp/pull/29245)  
- **Vulkan**：通过直接映射的 DMA 缓存优化 FA 掩码处理（取代 HVX 路径中的 LRU）。  
  🔗 [PR #29210](https://github.com/ggml-org/llama.cpp/pull/29210), [PR #29282](https://github.com/ggml-org/llama.cpp/pull/29282)  
- **Metal**：将 `mul_mm_id` 重缩放功能置于 `ggml_prec` 门控下，防止精度错误。  
  🔗 [PR #29029](https://github.com/ggml-org/llama.cpp/pull/29029)  
- **GGML**：IQ1_M 现在每块仅构建一次前缀和，减少冗余计算。  
  🔗 [PR #28706](https://github.com/ggml-org/llama.cpp/pull/28706)

---

### **5. 稳定性与回归问题**  
- **严重**：推测解码（MTP/draft-mtp）在量化目标（Q4_K_M）上产生 **非一致的贪婪输出**，但在 BF16 上表现一致。  
  🔗 [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618)（25 条评论，2 个点赞）  
- **高严重性**：Qwen3.5 + Codex 在加载检查点时（#20087 之后）崩溃（可能由上下文检查点逻辑引起）。  
  🔗 [Issue #20176](https://github.com/ggml-org/llama.cpp/issues/20176)（18 条评论）  
- **GPU 特定**：IQ3_S 在 RTX 5060TI（Blackwell）上生成垃圾令牌；极可能是内核精度问题。  
  🔗 [Issue #28581](https://github.com/ggml-org/llama.cpp/issues/28581)  
- **服务器竞争**：VictoriaMetrics 抓取 `/metrics` 导致服务器无声停止。  
  🔗 [Issue #29104](https://github.com/ggml-org/llama.cpp/issues/29104)  
- **内存泄漏**：若未执行提示（prompt）即调用 `llama_model_free`，Metal 上显存无法释放。  
  🔗 [Issue #25937](https://github.com/ggml-org/llama.cpp/issues/25937)

> ✅ 部分回归已有修复补丁（如 `b11113` 修复子进程日志），但推测解码分歧问题仍未修复。

---

### **6. 对应用开发者的影响**  
- **使用推测解码时需谨慎**：在量化模型上使用时，预计会出现输出分歧，直至 #25618 修复。  
- **充分利用 MTP 草稿中的 `d2t` 词汇裁剪支持**（Qwen3.5）：可实现更快、更低内存占用的推测推理。  
- **尽快启用 `--cache-disk`**（功能请求 #20697）：基于磁盘的上下文卸载需求强烈（56 个赞），对长上下文应用至关重要。  
- **针对 Intel Arc 与 Xe GPU 优化**：使用 Vulkan + split-k FA 内核，在多模态或高吞吐场景中提升吞吐量。  
- **避免使用 `port=0` 携带多个地址**：已在 `b11104` 中限制。请改用明确端口。  
- **监控 Metal 与 Vulkan 上的服务器内存泄漏**：尤其在未执行提示即卸载模型后。

🔧 *建议*：使用 `b11115+` 测试您的代理流水线，并在 #25618 修复前避免在 Q4_K_M 上使用推测解码。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-23**

---

### **1. 今日亮点**  
Ollama 生态系统持续演进，MLX 支持的模型在多模态功能和性能方面取得关键进展，包括 Gemma 4 动态图像分辨率处理以及 Apple Silicon 上 Qwen3.8 提示处理速度提升。针对 macOS UI 响应性及 NVIDIA Blackwell（RTX 50 系列）的 CUDA 检测问题，已合并若干关键稳定性修复；当前工作重点在于结构化输出可靠性与模型导出功能优化。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告任何发布或破坏性变更。*  
然而，**v0.34.0–0.34.3-rc1** 版本近期已修复多个关键错误，尤其集中在 GPU 初始化和 macOS 应用行为方面。使用 M4/M5 Mac 或搭载较新 NVIDIA 显卡的 Windows 用户应确保使用最新版本，以避免静默失败或崩溃。

---

### **3. 新模型与硬件支持**  
- ✅ **Gemma 4 动态图像分辨率**：PR #18603 引入按图像选择视觉标记预算（70–1120）的功能，无需硬编码 `max_soft_tokens=280` 即可保留高分辨率输入的细节 (#17152, #15626)。  
- ✅ **Docker 中的 MLX + Vulkan 支持**：PR #18592 为容器中的 Nvidia MLX/Vulkan 后端补充缺失的库与配置——对 Linux 主机上实现 GPU 加速推理至关重要。  
- 🟡 **Qwen3.8 Flash Next (MLX)**：PR #18078 通过在关键层（QSA、非专家 MTP 路径）保持 BF16 精度，其余部分采用 MXFP8，优化内存使用。  
- 🔮 **未来支持**：社区需求包括 **音频输入** (#11798)、**System 1 模型** 如 Kev/Laya (#18594)，以及 **MIMO v2.5**（百万级上下文支持）(#15887)。

---

### **4. 性能与优化**  
- ⚡ **Qwen3.8 提示处理加速（MLX）**：在 M5 Max 上，2k token 时提示每秒吞吐量（TPS）从 **715 → 848**（+18.7%），8k token 时从 **695 → 828**（+19.1%），得益于门控-差分核与 MLP 优化 (#18550)。  
- ⚙️ **Gemma 4 视觉效率**：动态预算机制减少对高分辨率图像的不必要的降采样，提升 OCR 准确率且不牺牲速度。  
- 📉 **内存优化**：MLX 量化策略避免长生成过程中的 NVFP4 质量下降，从而在长输出中保持更高质量 (#18078)。  
- 🧩 **结构化输出改进**：正在推进完整实现 JSON Schema 规范 (#18488)，并解决 logprob 限制问题 (#18579, #18590)。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|--------|------|-------|--------|
| 🔴 高 | **v0.34.1 之后更新导致 macOS 应用卡死** | 已关闭 | [PR #18601](https://github.com/ollama/ollama/pull/18601) – 用直接进程检查替代 `osascript` |
| 🔴 高 | **Windows 上 RTX 50 系列（Blackwell）CUDA 检测失败** | 开放 | [Issue #18581](https://github.com/ollama/ollama/issues/18581) – VRAM 显示为 0B，回退至 CPU |
| 🟡 中 | **qwen3.8:27b 在 `/v1/chat/completions` 中出现静默失败** | 开放 | [Issue #17790](https://github.com/ollama/ollama/issues/17790) – CLI 可用，但 API 调用会挂起 |
| 🟡 中 | **Homebrew 安装的 ollama 在 mlx 模型上失败（缺少结构化输出）** | 开放 | [Issue #18597](https://github.com/ollama/ollama/issues/18597) – 报错 `xgrammar not found` |
| 🟡 中 | **长文档处理静默失败（60 秒超时）** | 开放 | [Issue #18368](https://github.com/ollama/ollama/issues/18368) – 无 GUI 通知 |

> *注：多个回归问题源于版本特定问题（如 0.33.x 与 0.32.13 的性能下降，#18225）和环境特定缺陷（如非美国用户手机号验证问题，#16060）。

---

### **6. 对应用开发者的影响**  
- **使用 MLX 时优先考虑 Apple Silicon**：在 M 系列芯片上使用 `qwen3.8-flash-next` 或 `gemma4` 时，预期提示吞吐量提升高达 **+19%**，同时内存效率显著改善。  
- **避免硬编码图像预算**：若处理高分辨率文档，请确保使用包含动态 `max_soft_tokens` 的构建版本（通过 PR #18603）；否则，OCR 可能静默失败。  
- **谨慎使用结构化输出**：`think: true` 与 `format:` 组合在不同端点表现不一致（`/api/generate` 忽略思考逻辑，#17544）。建议使用 `/api/chat`，或等待延迟约束解码功能上线（#14196）。  
- **验证安装脚本**：对于网络不可靠场景，建议使用替代安装方式（如 #18584），而非 `curl -fsSL https://ollama.com/install.sh | sh`。  
- **规划模型导出/导入**：PR #18578 实现了通过 `ollama export/import` 实现离线模型传输，对隔离环境部署至关重要。

> 👉 *建议*：若使用 MLX/Vulkan/NVIDIA Blackwell，应锁定至 `0.34.3-rc1` 或更高版本，并在真实环境下测试涉及结构化输出与长上下文提示的工作流。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-09-23**

---

### **1. 今日亮点**  
最新版本 **v1.102.0** 引入了通过 Cosign（基于提交 `0112e53`）实现的经验证的 Docker 镜像签名，显著提升生产环境部署的安全性与可信度。关键修复解决了本地模型预算强制执行失败问题（#14004）、按团队速率限制的重复计数问题（#34140），以及使用模型别名进行流式调用时支出数据错误报告的问题（#42161）。这些更新进一步增强了多租户环境中的成本准确性与可靠性。

---

### **2. 版本发布与破坏性变更**  
- **v1.102.0**：发布包含 **经验证的 Docker 镜像签名**，采用 [Cosign](https://docs.sigstore.dev/cosign/overview/) — 所有镜像均使用同一密钥签名，该密钥自 [提交 `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 引入。  
  🔗 [GitHub 发布页面 v1.102.0](https://github.com/BerriAI/litellm/releases/tag/v1.102.0)  
- **回滚至 stable/1.102.x 的修复**：解决 WebSocket 握手拒绝问题及元数据传播缺陷 ([PR #42618](https://github.com/BerriAI/litellm/pull/42618))。

> ✅ **迁移提示**：若在生产环境中部署 v1.102.0 及以上版本，请确保您的 CI/CD 流水线具备镜像签名验证能力。

---

### **3. 新模型与硬件支持**  
今日未宣布新增模型或硬件支持。但持续同步已更新以下服务的定价信息：
- **Azure**（新增 20 个模型，含 `gpt-5.x` 与 Grok 变体）—— [PR #42594](https://github.com/BerriAI/litellm/pull/42594)
- **OpenRouter**（19 个模型更新；新增 9 个）—— [PR #42592](https://github.com/BerriAI/litellm/pull/42592)
- **Fireworks AI**（新增 2 个模型）—— [PR #42590](https://github.com/BerriAI/litellm/pull/42590)

> ⚠️ AWS Bedrock 同步今日失败 —— 定价信息仍过时 ([PR #42626](https://github.com/BerriAI/litellm/pull/42626))。

---

### **4. 性能与优化**  
- **基于 Rust 的成本计算扩展** ([PR #42620](https://github.com/BerriAI/litellm/pull/42620))：现已支持图像、OCR、视频、批量、自定义、目录、护栏、分层及 Gemini 基底定价，显著提升 Python 与 Rust 间定价逻辑的一致性。
- **流式用量合并优化** ([PR #40736](https://github.com/BerriAI/litellm/pull/40736))：修复显式置零更新后缓存写入令牌滞留问题。
- **改进的日志处理流水线** ([PR #42616](https://github.com/BerriAI/litellm/pull/42616))：将日志脱敏/截断任务交由 Rust 诊断处理器处理，降低 Python 层开销。

> 📈 *影响*：实现实时成本追踪更精准，高吞吐环境下延迟显著降低。

---

### **5. 稳定性与回归问题**  
今日报告的主要稳定性问题：

| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| [#14004](https://github.com/BerriAI/litellm/issues/14004)：预算超限时，免费本地模型被阻断 | ⚠️ 高 | 已关闭 | N/A |
| [#34140](https://github.com/BerriAI/litellm/issues/34140)：速率限制器对团队级每模型限额重复计数 → 实际 RPM/TPM 减半 | ⚠️ 高 | 开放中 | [PR #32618](https://github.com/BerriAI/litellm/pull/32618)（待评审） |
| [#42161](https://github.com/BerriAI/litellm/issues/42161)：当 `model_name` 为别名时，流式请求被计为 $0 成本 | ⚠️ 中等 | 开放中 | N/A |
| [#39370](https://github.com/BerriAI/litellm/issues/39370)：若 `budget_duration=null` 但 `budget_reset_at` 已过期，重置预算任务会静默永久清零支出 | ⚠️ 中等 | 开放中 | N/A |

> 🔥 **紧急提醒**：在某些配置下，免费模型的预算强制机制已失效 —— 请勿依赖预算限制来管理自托管模型，直至修复完成。

---

### **6. 对应用开发者的影响**  
- **成本准确性比以往更加关键**：启用计费时，请确保 `model_name` 设置为标准名称（而非别名），否则流式调用可能被记录为免费（[#42161](https://github.com/BerriAI/litellm/issues/42161)）。
- **使用团队级每模型限速时，实际速率可能仅为预期值的一半** —— 请对照 [PR #32618](https://github.com/BerriAI/litellm/pull/32618) 核对配置。
- **在部署流水线中启用镜像签名验证**：使用 `cosign verify` 对 `ghcr.io/berriai/litellm:latest` 进行校验，防范供应链风险。
- **审计遥测数据与日志**：关注缓存命中或流式调用中 `spend = 0` 的异常情况 —— 这可能是未计费使用的信号。
- **考虑采用新版基于 Rust 的成本引擎**：适用于大规模代理系统，可提升性能与一致性。

> 💡 **实用技巧**：在 IDE 中启用 `config.yaml` 模式校验（[#23022](https://github.com/BerriAI/litellm/issues/23022)），避免配置文件中的拼写错误。

---  
*生成时间：2026-09-23 | 来源：GitHub @ BerriAI/litellm*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# **Unsloth Digest – 2026-09-23**

---

### **1. 今日亮点**  
Unsloth 已发布 **v0.1.814-beta**，全面支持本地运行 **Qwen-Image-2.1**，包含自定义 Agent Skills、改进的聊天/项目管理功能，以及**推理模块速度提升 2 倍（60 FPS 对比 30 FPS）**。本次发布还增强了 Linux 安装的可靠性与训练稳定性。同时，多个 PR 推进了针对 NVFP4 量化、多模型服务和 AMD RDNA1 GPU 兼容性的底层优化。

---

### **2. 发布与破坏性变更**  
- **v0.1.814-beta**：完整支持 Qwen-Image-2.1 的 Agent Skills 与更快的推理速度（60 FPS）。改进了 Linux 安装/更新工作流。  
  🔗 [发布说明](https://unsloth.ai/docs/models/qwen-image-2.1)  
- **API 密钥复制问题已修复**：用户现在可在 UI 中复制新创建的 API 密钥（问题 #11387 已关闭）。  
  🔗 [问题 #11387](https://github.com/unslothai/unsloth/issues/11387)

---

### **3. 新模型与硬件支持**  
- **模型支持**：  
  - ✅ **Qwen-Image-2.1** 在桌面端与 Studio 应用中完全支持（v0.1.812+）。  
    🔗 [指南](https://unsloth.ai/docs/models/qwen-image-2.1)  
  - ✅ **LongCat-Flash-Lite-Sparse** 现可通过 `transformers` 加载（PR #11620 待审）。  
  - ✅ **Omnivoice TTS** 模型已在应用中可用；笔记本模式待请求（问题 #11513）。  

- **硬件与后端支持**：  
  - ✅ **AMD RDNA1 (gfx1010)**：在 PR #11615 禁用 Triton 缓冲区操作后，现已可在 RX 5700 XT 系列上进行训练。  
    🔗 [PR #11615](https://github.com/unslothai/unsloth/pull/11615)  
  - ✅ **ROCm (gfx1100, gfx1201)**：正在积极改进对 RX 7900 XTX 的支持（问题 #11498），尽管仍存在虚拟内存故障。  
  - ❌ **Intel XPU**：`adamw_8bit` 优化器在 `optimizer.step()` 阶段崩溃（问题 #10021）。  
  - ⚠️ **AMD GPU 检测**：最新版 `llama.cpp` 构建中已损坏（问题 #7485）。

---

### **4. 性能与优化**  
- **推理速度**：**2 倍提升**——推理模块现可达到 **60 FPS，相比之前的 30 FPS**（v0.1.812+）。  
- **NVFP4 量化**：  
  - 引入逐层 NVFP4 策略（PR #10730）。  
  - 为 FP4 线性层引入 FlashInfer 后端（PR #10731）。  
  - 为视频类模型家族（Wan2.2-TI2V、HunyuanVideo）提供全模型 NVFP4 量化，配合预量化去噪器（PR #10729）。  
- **多模型服务**：Studio 现支持**同时加载并切换多个模型**（PR #11591）。  
- **Jev API**：通过 Laya 添加本地决策 API（PR #11603），支持概率性是/否/得分推理。  
- **内存效率**：  
  - 支持直接将压缩张量打包的 INT4/INT8 检查点加载至 bitsandbytes 4-bit（PR #11537）。  
  - NVIDIA ModelOpt FP8 检查点现可通过 transformers 的 FP8 量化器加载（PR #11592）。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 链接 |
|---------|------|--------|------|
| 高 | Qwen-Image-2.1 需要**手动操作才能运行**（UI 无法自动处理配置） | 开放 | [#11567](https://github.com/unslothai/unsloth/issues/11567) |
| 高 | **AMDGPU 虚拟内存故障/重置**，在 RX 7900 XTX 上进行 QLoRA 训练时（ROCm） | 开放 | [#11498](https://github.com/unslothai/unsloth/issues/11498) |
| 高 | **LLM CUDA 正常，图像模型在 Repair 后失败**（设备不匹配） | 开放 | [#11545](https://github.com/unslothai/unsloth/issues/11545) |
| 中 | **Studio 会移除 `--tensor-split` 标志**，导致 MoE 模型启用 CPU 卸载时内存溢出 | 开放 | [#11330](https://github.com/unslothai/unsloth/issues/11330) |
| 中 | **在 Firefox/Brave（Linux）中无法复制 API 密钥** | 已关闭 | [#11387](https://github.com/unslothai/unsloth/issues/11387) |
| 低 | **中国地区 Hugging Face 搜索被屏蔽** | 开放 | [#11529](https://github.com/unslothai/unsloth/issues/11529) |
| 低 | 拼写错误：“top-1% accuracy” → “top-1 accuracy” | 开放 | [#11514](https://github.com/unslothai/unsloth/issues/11514) |

> ✅ *修复中*：PR #11615（RDNA1）、PR #11537（INT4/INT8 压缩）、PR #11592（FP8 加载）。

---

### **6. 对应用开发者的意义**  
- **构建更快更轻量的智能体**：凭借 **60 FPS 推理** 与 **NVFP4 + flashinfer 优化**，你的 AI 智能体可更低延迟、更低内存开销地处理复杂多模态输入。  
- **部署于多样化硬件**：AMD RDNA1 与 ROCm 支持日趋成熟——非常适合成本敏感的推理集群。使用 `PR #11615` 可在旧款 AMD 显卡上启用训练。  
- **高效服务多模型**：使用 **多模型加载（PR #11591）** 可动态路由请求而无需重新加载。  
- **利用先进量化技术**：原生加载压缩后的 INT4/INT8 与 FP8 检查点，无需预处理。  
- **规避潜在陷阱**：注意 Studio 中 `--tensor-split` 标志的问题（问题 #11330）；建议使用 CLI 或直接 Python 脚本实现细粒度控制。  
- **面向未来**：关注 **Jev API（PR #11603）** 与 **离线 logprobs 实现知识蒸馏（问题 #11556）**——这是实现可扩展智能体训练的关键。

> 📌 *可操作建议*：对于高吞吐 RAG 应用，使用环境变量配置 `UPLOAD_EXTS`（问题 #11385），避免过度索引。

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*