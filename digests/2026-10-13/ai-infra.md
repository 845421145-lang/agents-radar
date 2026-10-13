# AI 基础设施日报 2026-10-13

> 生成时间: 2026-10-13 03:08 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-13**

---

### **1. 生态概览**  
AI推理与服务生态正进入高度专业化阶段，各项目在下一代模型（如MoE、基于Flash的架构、多模态）的高性能执行上趋于汇聚，但在部署分层和硬件目标上则日益分化。vLLM和SGLang在面向GPU集群的分布式低延迟推理引擎领域处于领先地位；而llama.cpp和Ollama则主导了以CPU、移动端和边缘设备为核心的轻量级本地优先部署。LiteLLM持续巩固其作为智能API网关的角色，协调多厂商模型路由，且对成本准确性与安全护栏集成的关注度不断提升。Unsloth则展现出独特混合特性——融合微调、高效推理与代理能力，预示着向全栈AI应用开发的演进。

---

### **2. 活动对比**  

| 项目       | 开放问题 | 开放PR | 发布状态         |
|---------------|-------------|----------|------------------------|
| **vLLM**      | 47          | 98       | 无新版本（稳定版） |
| **SGLang**    | 52          | 83       | 无新版本（开发版）    |
| **llama.cpp** | 37          | 64       | 无新版本（稳定版） |
| **Ollama**    | 68          | 42       | `v0.40.4-rc0`（RC）     |
| **LiteLLM**   | 39          | 45       | 无新版本（稳定版） |
| **Unsloth**   | 51          | 38       | `v0.1.906-beta`（测试版） |

> ✅ **洞察**：Ollama问题数量最高，反映出近期RC版本存在不稳定性；Unsloth在发布节奏下仍保持最高的活跃PR数，表明其功能迭代速度极快。

---

### **3. 模型支持竞赛**  

| 新模型 / 架构        | 支持项目                          | 状态与备注 |
|----------------------------------|----------------------------------------|----------------|
| **Cloudflare Clef-Flash**       | vLLM (`/v1/systemone`)                | ✅ 基于Qwen3.5内核原生支持 |
| **Qwen-Image-2.1-Turbo (GGUF)** | Unsloth                              | ✅ 8步图像生成；已支持浏览器代理 |
| **GLM-5.3-Flash**               | SGLang (CP+TP), vLLM                   | ✅ SGLang：prefill/decode共置；vLLM：ROCm追踪中 |
| **DeepSeek-V4-Flash-0731**      | vLLM (SM8x请求), SGLang (优化中) | ⚠️ vLLM中SM8x支持尚未完成 |
| **决策模型（D3风格）**  | llama.cpp (`--model-draft pplx-decider`) | ✅ 完全支持；支持高吞吐推测 |
| **EmbeddingGemma 2 (GGUF)**     | Ollama (`v0.40.4-rc0`)                 | ✅ 通过更新后的llama.cpp新增支持 |
| **LTX-2.5 Diffusers (FP8/int8)**| Unsloth                              | ✅ HF提供的预量化DiTs；不支持实时量化 |
| **K2 Horizon MoE**              | Ollama（功能请求）               | 🟡 已提出请求；尚未实现 |

> 🔥 **排行榜**：  
> - **最全面的模型支持**：*vLLM*（Clef-Flash、DeepSeek、GLM-5.3、Mamba）  
> - **最具前瞻性**：*Unsloth*（浏览器代理、文本扩散、多模态GGUF）  
> - **新格式最快采纳**：*Ollama*（GGUF决策模型、EmbeddingGemma 2）

---

### **4. 性能前沿**  

| 优化方向           | 领先项目                     | 关键进展 |
|-------------------------------|--------------------------------------|------------------|
| **KV缓存效率**       | vLLM, SGLang                         | 重构规划逻辑（vLLM #61183），自适应预算RFC（#52906） |
| **推测解码**      | vLLM, SGLang, llama.cpp, Unsloth     | DFlash填充并行化（vLLM），M系列支持（Unsloth），MTP修复 |
| **MoE 与量化**        | vLLM, SGLang, Unsloth                | 每前向逐专家选择NVFP4（vLLM #54617），LoRA堆栈补全（SGLang），MoE GGUF 3.2倍提速（Unsloth） |
| **内核级融合**       | vLLM, SGLang                         | 6倍mamba内核融合（vLLM #58737），CP扩展超越FlashInfer（SGLang #31732） |
| **分布式服务**       | vLLM, SGLang                         | PD解耦（SGLang），TP/CP共置（GLM-5.3），完全分片LoRA（vLLM） |

> 📌 **趋势**：优化重点正越来越多地聚焦于**降低每步开销**（如DFlash填充）和**实现动态资源分配**（自适应预算、模块化设计）。

---

### **5. 层级定位**  

| 项目       | 主要层级             | 差异化优势 |
|---------------|----------------------------|----------------|
| **vLLM**      | 推理引擎（GPU）     | 高吞吐、支持MoE、CUDA优化服务 |
| **SGLang**    | 推理引擎 + 代理框架 | prefill-decode解耦、代理式控制流 |
| **llama.cpp** | 本地运行时 / CPU/GPU      | 轻量、跨平台、以GGUF为先、边缘优化 |
| **Ollama**    | 开发者网关 / CLI      | 简化模型管理、本地优先体验，但大规模下不稳定 |
| **LiteLLM**   | LLM网关 / 协调系统  | 统一API桥接、成本对齐、安全护栏、多云路由 |
| **Unsloth**   | 全栈AI应用平台   | 融合训练、微调、浏览器代理、多模态推理 |

> 💡 **定位洞察**：  
> - 使用GPU的**工程师**应优先选择 **vLLM/SGLang** 以获取性能优势。  
> - 从事**边缘/本地开发**的用户应采用 **llama.cpp/Ollama**。  
> - **应用构建者**需借助 **Unsloth** 或 **LiteLLM + SGLang** 实现代理工作流。  
> - **企业运维团队**依赖 **LiteLLM** 实现成本可视性与合规管理。

---

### **6. 趋势信号**  

1. **以代理为中心的栈正在崛起**：  
   Unsloth的浏览器代理能力与SGLang的程序化KV控制，标志着从纯推理迈向**自主、有状态的代理**，能够与外部系统交互。开发者必须开始考虑**会话持久性**、**动作安全性**与**上下文完整性**。

2. **硬件专用化加速推进**：  
   AMD ROCm、Apple Silicon（M系列）、Snapdragon Hexagon不再只是次要选项。SGLang（ROCm HiCache）、Unsloth（M系列推测解码）、llama.cpp（Hexagon电源模式）均展现出深度硬件定制——未来将出现基于设备类型的**分级部署策略**。

3. **量化与效率趋向融合**：  
   每前向精度（vLLM）、FP8/int8扩散（Unsloth）、Q2_K/Q4_K优化（llama.cpp）表明，**效率已不仅是体积问题**，而是**动态、上下文感知的计算资源分配**。

4. **稳定性与创新的权衡加剧**：  
   Ollama的`v0.40.4-rc0`崩溃报告与SGLang的不稳定的CI流程，凸显快速演进的开源生态中的潜在风险。**生产环境应避免使用RC版本**，除非手动验证修复。

5. **成本准确性成为核心功能**：  
   LiteLLM对跨API网关的计费对齐关注，反映出对**透明、可审计的成本追踪**日益增长的需求，尤其适用于云无关或混合部署场景。

> 🔮 **对应用开发者的建议**：  
> - 可扩展、长上下文代理优先选择 **vLLM 或 SGLang**。  
> - 研究、自动化及需要浏览器交互的多模态应用，选用 **Unsloth**。  
> - 利用 **LiteLLM** 作为成本敏感、多供应商路由的代理。  
> - 生产环境中避免使用RC版本（如Ollama `v0.40.4-rc0`、Unsloth beta），待稳定性提升后再上线。  
> - 监控所有栈的**推测解码可靠性**——在高并发场景下仍较脆弱。

---  
*报告生成时间：2026-10-13 | 数据来源：GitHub活动摘要*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-10-13**

---

#### **1. 今日亮点**  
vLLM 持续推进对下一代模型与硬件的激进优化，关键 PR 提升了推测解码效率（DFlash 填充并行化）、优化了 KV 缓存规划逻辑，并通过 `/v1/systemone` 实现了对 **Cloudflare Clef-Flash** 模型的原生支持。关键稳定性修复解决了 MoE LoRA 场景下的 CUDA Graph 死锁问题，以及 DeepSeek-V4.1-Flash 在 H20 GPU 上高并发内存访问异常。

---

#### **2. 发布与破坏性变更**  
*过去 24 小时内未检测到新版本发布或破坏性变更。*  
然而，多个 PR 显示部分旧功能正在被弃用：  
- `--mamba-cache-mode` 将被彻底移除（`#60043`）——未来 Mamba 部署必须使用默认前缀缓存行为。  
- `mamba_cache_mode="all"` 已从代码库中完全清除（`#60043`）。  

> 🔗 [PR #60043](https://github.com/vllm-project/vllm/pull/60043) – 移除 `mamba_cache_mode`

---

#### **3. 新模型与硬件支持**  
- ✅ **新模型**：通过 `/v1/systemone` 原生支持 **Cloudflare/clef-flash**（`#61308`），基于 Qwen3.5 核心架构与联合头结构。  
- 📌 **硬件扩展**：  
  - 为 **DeepSeek-V4-Flash-0731** 请求 SM8x（Ampere A100/A800/RTX 30xx）支持（`#50576`），待后端集成。  
  - 为 **Qwen3.8-Flash-Next** 在 MI355X（gfx950）及 **GLM-5.3-Flash** 添加 AMD ROCm 性能追踪（`#57406`, `#59575`）。  
- 🧠 **量化**：NVFP4 精度现已支持 SM12x 上每前向过程专家选择（`#54617`），显著提升 MoE 模型灵活性。

> 🔗 [PR #61308](https://github.com/vllm-project/vllm/pull/61308) – Clef-Flash 支持  
> 🔗 [Issue #50576](https://github.com/vllm-project/vllm/issues/50576) – DSv4-Flash 对 SM8x 的支持请求

---

#### **4. 性能与优化**  
- ⚡ **推测解码**：并行化 DFlash 草稿输入填充，将每步开销降低最高达 **35.8μs**（`#58633`）。  
- 🔥 **Mamba 内核融合**：将 mamba align block-table gather 合并为一个 Triton 内核，减少 7 个内核 → 1 个，实现全形状下 **6 倍加速**（`#58737`）。  
- 🔄 **KV 缓存规划**：重构 `kv_cache_planning.py`，提升模块化与可维护性（`#61183`）。  
- 🎯 **自适应预填充预算**：RFC 提案（`#52906`）旨在根据调度压力动态调整 `max_num_batched_tokens` —— 对长上下文任务极具潜力。  
- 📈 **MoE 路由**：优化路由融合，支持在 top-k 后进行评分（`#57410`），增强与 HF 模型变体的兼容性。

> 🔗 [PR #58633](https://github.com/vllm-project/vllm/pull/58633) – DFlash 填充并行化  
> 🔗 [PR #58737](https://github.com/vllm-project/vllm/pull/58737) – Mamba 内核融合（6 倍加速）

---

#### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR |
|--------|------|--------|--------|
| 🔴 高 | 全分片融合式 MoE LoRA 在 TP 各 Rank 间引发 CUDA Graph 死锁（`#60845`） | 开放 | ❌ 尚无修复 |
| 🔴 高 | 高并发场景下 H20 上 `dsv4_topk` MoE 内核出现非法内存访问（`#56389`） | 开放 | 通过 `max_num_seqs=256` 临时缓解 |
| 🟡 中 | V1 多进程引擎每批冻结约 1–2 秒（`#48229`） | 开放 | 可通过 `VLLM_ENABLE_V1_MULTIPROCESSING=0` 绕过 |
| 🟡 中 | KV 卸载写入停滞导致 `HIT_PENDING` 无限轮询（`#49829`） | 开放 | 无超时强制机制；客户端可能因超时失败 |

> 🔗 [Issue #60845](https://github.com/vllm-project/vllm/issues/60845) – CUDA Graph 死锁  
> 🔗 [Issue #56389](https://github.com/vllm-project/vllm/issues/56389) – H20 非法内存访问

---

#### **6. 对应用开发者的启示**  
- **使用 MoE 模型（如 Qwen3.5、GLM-5.3）的部署者** 应避免启用 `--fully-sharded-loras`，直到 `#60845` 修复完成 —— 负载下可能出现间歇性卡顿。  
- **在 H20/GPU 集群上进行高并发推理** 必须将 `max_num_seqs` 限制在 ≤256，以防止 DeepSeek-V4.1-Flash 崩溃。  
- **使用 `/v1/systemone`** 调用 Cloudflare Clef-Flash —— 已原生支持，且采用优化路由策略。  
- **若需服务长上下文批次**，请启用 `--long-prefill-token-threshold-defer`（`#61080`）—— 避免预填充上限，提升公平性。  
- **密切监控 KV 卸载指标** —— 写入停滞可能导致响应延迟超出客户端超时时间（`#49829`）。  
- **考虑在 Blackwell（SM12x）上启用每前向过程的 NVFP4 精度选择**（`#54617`），以获得最佳 MoE 性能。

> ✅ 小贴士：使用 vLLM 仓库中的 `recipes/models/`（`#61302`）获取经验证的部署配置。

---  
*摘要生成时间：2026-10-13 | 来源：[vLLM GitHub](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 简报 – 2026-10-13**

---

### **1. 今日重点**  
SGLang 生态系统持续巩固其作为大型复杂模型高性能推理栈的地位，当前重点工作包括 **预填充-解码分离（PD）** 和 **DeepSeek V4.1 优化**。关键进展包括新提交的 PR 实现了 **GLM-5.3-Flash 的共置预填充上下文并行（CP）+ 解码目标/验证注意力张量并行（TP）**，同时针对 **AMD ROCm HiCache 性能问题** 完成了一项关键修复。与此同时，社区正积极应对不稳定的 CI 基础设施以及推测解码和 KV 缓存复用中的稳定性问题。

---

### **2. 发布与破坏性变更**  
*无* — 过去 24 小时内未报告新发布或破坏性变更。

---

### **3. 新模型与硬件支持**  
- ✅ **GLM-5.3-Flash**：共置预填充上下文并行（CP）与解码目标/验证注意力张量并行（TP）的支持（通过 DFlash2/MTP）目前正处于 [#43972](https://github.com/sgl-project/sglang/pull/43972) 审查阶段。  
- ✅ **MiniCPM-V 4.7**：在 [#43829](https://github.com/sgl-project/sglang/pull/43829) 中新增使用手册文档，助力该新兴视觉语言模型快速上手。  
- ✅ **NPU 与 XPU 后端**：在 [#30980](https://github.com/sgl-project/sglang/pull/30980) 中为 XPU 添加了完整的预填充图支持；在 [#43970](https://github.com/sgl-project/sglang/pull/43970) 中引入 NPU `prefill_complete` 支持。  
- ⚠️ **AMD ROCm (gfx942/gfx950)**：正在处理关键修复，包括 FP8 GEMM 精度问题（`#43526`）以及因缺少模块导入导致的 DSV4.1 稀疏解码崩溃问题（`#43765`）。

---

### **4. 性能与优化**  
- 🔥 **预填充上下文并行（CP）**：通过 #31732 推进将 CP 扩展至 FlashInfer/TRTLLM-MHA 之外的 MHA/GQA 后端；持续开展与 allreduce 融合及 SWA 启用模型的兼容性工作。  
- 🚀 **DeepSeek V4.1 优化**：如 [#43838](https://github.com/sgl-project/sglang/pull/43838) 等 PR 在 TP2 下实现了小批量解码融合，提升了中小规模部署的效率。  
- ⚙️ **LoRA 栈完成**：LoRA 运行时栈（21/21）进入最终阶段，包含 Marlin 上的 NVFP4 MoE LoRA (#42888)、CuTeDSL FP8 tile 表 (#42887) 以及打包 MoE 调度 (#42883)，支持在 Blackwell GPU 上高效微调。  
- 🔄 **启动调优**：PR [#43927](https://github.com/sgl-project/sglang/pull/43927) 将 FlashInfer 默认策略集成至启动调优中，确保无需手动覆盖即可选择最优内核。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 状态 | 修复 PR？ | 链接 |
|--------|------|--------|--------|------|
| ❌ 高 | 因 flashinfer 验证采样操作中 JIT 失败，首次非贪心请求触发推测解码崩溃 | 开放 | 否 | [Issue #43412](https://github.com/sgl-project/sglang/issues/43412) |
| ❌ 高 | GLM-5.3 输出中出现严重重复与退化循环，使用 DFLASH 推测解码时 | 开放 | 否 | [Issue #40843](https://github.com/sgl-project/sglang/issues/40843) |
| ⚠️ 中 | 使用 `--disaggregation-mode decode` 时，在 `decode → prefill → decode` 运行时角色切换导致崩溃 | 开放 | 否 | [Issue #43557](https://github.com/sgl-project/sglang/issues/43557) |
| ⚠️ 中 | CI 测试不稳定且 `PR Test Base/Extra` 中频繁出现基础设施故障 | 开放 | 否 | [Issue #42752](https://github.com/sgl-project/sglang/issues/42752) |
| ⚠️ 低 | 语音转录 multipart 上传缺乏大小限制 | 开放 | 否 | [Issue #43709](https://github.com/sgl-project/sglang/issues/43709) |

> *注：多个缺陷影响生产级智能体工作负载（如工具类型处理错误、ROCm 上 HiCache 崩溃、预热阶段内存溢出）。

---

### **6. 对应用开发者的意义**  
- **智能体工作负载**：预计即将推出的程序化 KV 缓存控制（[#27574](https://github.com/sgl-project/sglang/issues/27574)）将提升可预测性，但请避免使用 `custom` 工具类型，直至路由器同步问题（[#30781](https://github.com/sgl-project/sglang/issues/30781)）解决。  
- **多租户服务**：谨慎使用 `--enable-pd-role-switch` —— 最近崩溃表明在请求中途切换角色时 PD 工作流存在不稳定性（[#43557](https://github.com/sgl-project/sglang/issues/43557)）。  
- **微调流水线**：已完成的 LoRA 栈支持在 NVIDIA Blackwell 硬件上高效进行 MoE 与量化微调——非常适合成本敏感的智能体训练场景。  
- **模型部署**：对于 GLM-5.3 与 DeepSeek V4.1，建议谨慎使用最新 dev 构建版本（`dev-minicpm-v-4.7`, `v0.5.21`）——推测解码与 KV 复用仍存在若干开放回归问题。  
- **CI 可靠性**：请做好测试间歇性失败的心理准备；若被不稳定的 CI 阻塞，可尝试通过 `/sglang-pr-babysit` 重试 PR（[#42752](https://github.com/sgl-project/sglang/issues/42752)）。

👉 *建议*：关注 [路线图问题](https://github.com/sgl-project/sglang/issues?q=is%3Aopen+label%3Aroadmap) 中关于 PD 分离与 dLLM 服务的进展——这些是构建可扩展、低延迟智能体系统的基础。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 汇报 – 2026-10-13**

---

### **1. 今日重点**  
最新开发周期聚焦于稳定推测解码（MTP/DFlash）并提升 CUDA、Vulkan 及 Metal 后端的整体健壮性。关键修复包括解决 vLLM D3 模型在多序列推理中的问题以及注意力核函数的 GPU 内存管理，同时新优化显著提升了 AMD 与 Intel 平台上的 Q2_K 与 Q4_K 性能。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未发布新版本。但多个 PR 引入了**非向后兼容的变更**，开发者需密切关注：  
- **PR #30408** (`model: fix vllm d3 multi seq case`) 修复了 vLLM D3 模型在混合、非因果多序列推理中的关键正确性问题。可能影响依赖推测解码流水线的用户。[GitHub PR #30408](https://github.com/ggml-org/llama.cpp/pull/30408)  
- **PR #30429** (`ggml-cpu: faster AMX Q4_K decode (+13% tg)`) 重写了支持 AMX 的 CPU 上 Q4_K VNNI 核函数，实现更优的列分组策略——若在边缘情况下依赖确定性精度，可能出现输出行为轻微差异。[GitHub PR #30429](https://github.com/ggml-org/llama.cpp/pull/30429)

---

### **3. 新模型与硬件支持**  
- ✅ **vLLM D3 模型**：通过 `--model-draft` 完整支持 `pplx-decider` 与 D3 风格决策模型，可实现现代推理架构下的高吞吐推测。[GitHub PR #30383](https://github.com/ggml-org/llama.cpp/pull/30383)  
- ✅ **Hexagon 后端**：新增对 **Q1_0 量化** 的支持，并可配置 HTP 功率模式（从 `low_power_saver` 到 `burst`）。适用于 Snapdragon 芯片上的边缘推理。[GitHub PR #30122](https://github.com/ggml-org/llama.cpp/pull/30122)，[PR #30423](https://github.com/ggml-org/llama.cpp/pull/30423)  
- ✅ **Vulkan**：为 **Intel Arc Pro B65** 添加设备特定着色器数量定义，提升对新一代 Gen13 GPU 的兼容性。[GitHub PR #30431](https://github.com/ggml-org/llama.cpp/pull/30431)

---

### **4. 性能与优化**  
- **AMX CPU (Q4_K)**：通过优化 M=1 解码路径中的列遍历，最高实现 **+13% 生成速率 (tg)**。[GitHub PR #30429](https://github.com/ggml-org/llama.cpp/pull/30429)  
- **AMD (Q2_K)**：通过优化循环展开并消除冗余临时变量，减少 gfx906/Mi50 上的 VGPR 溢出——预计对大模型带来吞吐提升。[GitHub PR #29910](https://github.com/ggml-org/llama.cpp/pull/29910)  
- **Vulkan (RMS Norm)**：用子组归约替代工作组归约，在 **Intel Arc B70** 与 **RTX 4060 Ti** 上取得可观性能提升。[GitHub PR #29882](https://github.com/ggml-org/llama.cpp/pull/29882)  
- **Hexagon (CPY/CONCAT)**：第三轮优化通过基于块的行处理方式，降低短行传输的 DMA 延迟。[GitHub PR #30341](https://github.com/ggml-org/llama.cpp/pull/30341)

---

### **5. 稳定性与回归问题**  
今日报告的关键稳定性问题包括：  
1. **CUDA 图在 RTX 5090 笔记本版（sm_120）上挂起**：因 CUDA 图导致 GPU 通道锁定；临时解决方案：`GGML_CUDA_DISABLE_GRAPHS=1`。[GitHub Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330)  
2. **Vulkan 在推测解码期间出现 `ErrorDeviceLost`**：在 AMD RX 7900 XTX 上进行 MTP 草稿解码且张量分片时发生，可能与计算图调度或内存复用有关。[GitHub Issue #30010](https://github.com/ggml-org/llama.cpp/issues/30010)  
3. **Metal `kernel_mul_mm_id_map0` 溢出**：重复专家 ID 导致令牌丢失或崩溃，源于固定大小查找表限制。已在 #30373 中修复。[GitHub Issue #27546](https://github.com/ggml-org/llama.cpp/issues/27546)  
4. **DFlash2 在 `--split-mode tensor` 下失败**：加载 MoE 草稿时在 `ggml-backend-meta.cpp` 中触发断言失败。[GitHub Issue #27819](https://github.com/ggml-org/llama.cpp/issues/27819)  

> 🔴 **注意**：上述多项问题为生产级推理（尤其是 MTP/草稿）的回归热点。用户应避免在 #27819 修复前使用 `--split-mode tensor`。

---

### **6. 对应用开发者的意义**  
- **使用 `--model-draft pplx-decider`** 以利用 vLLM D3 模型带来的下一代推测解码能力——特别适合低延迟智能体场景。  
- **在 DFlash2 草稿中避免使用 `--split-mode tensor`**，直到 #27819 修复；可暂用 `--split-mode layer` 作为回退方案。  
- **在 AMD 系统上**：优先选择 `Q2_K` 以获得更好吞吐，但需注意已知的 VGPR 溢出问题。  
- **移动端/边缘部署时**：启用 `GGML_HEXAGON_POWER_MODE=burst` 可在 Snapdragon SoC 上实现峰值性能。  
- **监控 Vulkan/MTP 路径中的 `GGML_ASSERT(neq0 == HSK)` 失败**——表明推测解码中头维度不匹配。  
- **若在 RTX 5090 笔记本上遇到卡死**，请禁用 CUDA 图：`GGML_CUDA_DISABLE_GRAPHS=1`。  

> 📌 **实用提示**：使用 `llama-cli --version` 检查构建版本是否包含近期修复（如 b11577+）。避免使用旧版本预编译二进制文件（如 b10289），其中存在已知回归问题。

---  
*汇编时间：2026-10-13 | 来源：[github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### **1. 今日亮点**  
Ollama 最新发布的 `v0.40.4-rc0` 集成更新版 `llama.cpp`（b11521），增强了对决策模型和 EmbeddingGemma 2 的支持，同时为 Apple Silicon 上的 MLX 运行器引入了关键的稳定性修复。近期高严重性问题激增——特别是 MLX 内核崩溃和 CUDA 内存访问错误——凸显了新模型后端与 GPU 兼容性方面仍存在的持续挑战。

---

### **2. 发布与破坏性变更**  
- **v0.40.4-rc0**（GitHub: [#18917](https://github.com/ollama/ollama/pull/18917))  
  - 将 `llama.cpp` 升级至提交 b11521，通过 GGUF 实现对 **决策模型** 和 **EmbeddingGemma 2** 的原生支持。  
  - 引入 **服务端对已验证清单和已加载模型的复用**，降低推理路由开销 ([#18947](https://github.com/ollama/ollama/pull/18947))。  
  - *注意：* 此版本对基于 MLX 的模型包含破坏性变更（详见稳定性部分）。

---

### **3. 新模型与硬件支持**  
- ✅ **决策模型**：通过更新版 `llama.cpp`（b11521）新增原生支持，现已在 `v0.40.4-rc0` 中可用。  
- ✅ **EmbeddingGemma 2**：在 `v0.40.4-rc0` 中完全支持，并具备正确的清单处理能力。  
- 🟡 **K2 Horizon 模型（k2-horizon）**：功能请求开放 ([#18642](https://github.com/ollama/ollama/issues/18642)) —— 请求支持 MBZUAI IFM 提供的 Apache-2.0 许可模型（0.9B–36B MoE）。  
- 🟡 **Prism 三元 GGUF（PQ2_0/PTQ1_0）**：导入失败，因不支持张量大小溢出 ([#18521](https://github.com/ollama/ollama/issues/18521))；相关追踪问题仍开放。  
- 🟡 **Cohere MoE（RTX 5090）**：Windows 平台报告 CUDA 非法内存访问崩溃 ([#18642](https://github.com/ollama/ollama/issues/18642))，表明后端兼容性尚未完善。

---

### **4. 性能与优化**  
- ⚠️ **性能下降**：用户报告所有模型在 `v0.40.1` 基础上出现 **25–30% 的每秒生成令牌数下降** ([#18968](https://github.com/ollama/ollama/issues/18968))。评估日志确认显著吞吐量退化。  
- 🔧 **内核优化**：多个 PR 针对 SDPA 内核线程组限制进行优化：  
  - 因超过 896 线程限制导致 M2 Max/Mac Studio 上的 MLX 崩溃（`sdpa_vector_2pass_...`）——针对 Qwen3.8 与 Gemma4 报告 ([#18940](https://github.com/ollama/ollama/issues/18940), [#18966](https://github.com/ollama/ollama/issues/18966))。  
  - 修复 PR 正在开发中：[#18974](https://github.com/ollama/ollama/pull/18974)（MLX JSON 状态提示）、[#18973](https://github.com/ollama/ollama/pull/18973)（多模态嵌入上下文尺寸调整）。  
- 📈 **调度效率**：提议在切换不匹配时避免模型重载 ([#18950](https://github.com/ollama/ollama/issues/18950))，旨在降低长上下文工作流中的延迟。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 影响 | 状态 |  
|------|----------|--------|--------|  
| [#18940](https://github.com/ollama/ollama/issues/18940) / [#18966](https://github.com/ollama/ollama/issues/18966) | 严重 | 在 Apple Silicon（M2 Max）上使用大注意力头模型（如 `qwen3.8:27b`, `gemma4:31b`）时，MLX 运行器崩溃 | 开放 |  
| [#18846](https://github.com/ollama/ollama/issues/18846) / [#18856](https://github.com/ollama/ollama/issues/18856) | 严重 | 在 `qwen3.6:35b-mlx` 与 `qwen3.6:27b-mlx` 上报错“每个线程组最大线程数为 896，但请求 1024”导致 MLX 运行器崩溃 | 开放 |  
| [#18642](https://github.com/ollama/ollama/issues/18642) | 严重 | 在 Windows 上使用 Cohere MoE 模型（RTX 5090）时发生 CUDA 非法内存访问崩溃 | 开放 |  
| [#18950](https://github.com/ollama/ollama/issues/18950) | 高 | 当请求间 `shift` 不一致时发生不必要的模型重载 | 开放 |  
| [#18968](https://github.com/ollama/ollama/issues/18968) | 高 | 所有模型均出现 25–30% 的性能下降 | 开放 |  
| [#18944](https://github.com/ollama/ollama/issues/18944) | 中等 | 设置 `format: "json"` 时工具调用失败 | 开放 |  

> ✅ **正在修复中**：多个 PR 正在解决 MLX 内核问题 ([#18974](https://github.com/ollama/ollama/pull/18974), [#18973](https://github.com/ollama/ollama/pull/18973)) 以及工具调用格式问题 ([#18975](https://github.com/ollama/ollama/pull/18975))。

---

### **6. 对应用开发者的意义**  
- 若在 Apple Silicon 上使用 MLX 或大注意力头模型（如 Qwen3.8/Gemma4），请 **避免在生产环境使用 `v0.40.4-rc0`** —— 预期频繁崩溃。  
- **推理速度将变慢**；若性能至关重要，请以 `v0.40.1` 为基准进行基准测试。  
- **工具调用 + JSON 格式**：在 [#18975](https://github.com/ollama/ollama/pull/18975) 合并前，不要依赖 `format: "json"` 进行工具调用——可能静默失败。  
- **云用户**：使用 `deepseek-v4.1-flash:cloud` 并输入图像（>655k tokens）时需谨慎；预计出现 500 错误 ([#18853](https://github.com/ollama/ollama/issues/18853))。  
- **Windows 用户**：更新后注意 `.tmp` DLL 问题 ([#18712](https://github.com/ollama/ollama/issues/18712)) 及 NTFS 挂载路径缺陷 ([#18921](https://github.com/ollama/ollama/issues/18921))。

> 🛠 **建议**：在 MLX/CUDA 回归问题解决前，请锁定至 `v0.40.1` 或更早版本。关注 [PR #18975](https://github.com/ollama/ollama/pull/18975) 获取结构化输出/工具调用修复进展。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 简报 – 2026-10-13**

---

### **1. 今日重点**  
LiteLLM 生态系统持续深化对高级大模型编排的支持，针对 GPT-6、Claude 5 以及 Bedrock Converse 等高端模型在成本准确性与错误处理方面实现关键改进。今日重点的合并请求（PR）集中修复了 API 桥接（如 `/v1/messages` → `/v1/responses`）中的计费不一致问题，并优化了护栏（guardrail）集成，尤其针对 Wingback。一项重要修复解决了 Anthropic 错误路径中 503 被错误归类为 529 的问题，避免客户端不必要的重试。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但多个破坏性变更即将通过开放的 PR 实现：
- **PR #46144**：修正 Gemini 上下文缓存创建令牌的计费不足问题，现已将 `cachedContents` 的令牌数量纳入计费计算。
- **PR #46135**：确保 Azure AI Claude 的网页搜索请求按部署特定的价格标识计费，解决自定义部署的降级问题。
- **PR #46138**：在确认 `reasoning_effort='none'` 处理正确后，移除了 Azure GPT-6 行中的 `known_bug` 标签。

> 🔗 [PR #46144](https://github.com/BerriAI/litellm/pull/46144) | [PR #46135](https://github.com/BerriAI/litellm/pull/46135) | [PR #46138](https://github.com/BerriAI/litellm/pull/46138)

---

### **3. 新模型与硬件支持**  
*今日未新增任何模型或硬件后端。*  
但持续工作强化了以下支持：
- **GPT-6 系列**（`gpt-6-sol`, `gpt-6-luna`, `gpt-6-astra`, `gpt-6.1-sol`）通过跨桥接路径的成本一致性测试增强。
- **Claude 5 模型**通过 `/v1/responses` 桥接验证。
- **Bedrock Converse 模型**在原生路径与桥接路径之间完成完整的成本一致性检查。

> 🔗 [PR #46140](https://github.com/BerriAI/litellm/pull/46140) | [PR #46141](https://github.com/BerriAI/litellm/pull/46141)

---

### **4. 性能与优化**  
*今日未落地直接的吞吐量或延迟优化。*  
但在**成本正确性**方面取得显著进展，间接提升了性能可靠性：
- 在 Azure、Claude 5 与 Bedrock Converse 路径上新增 17 组 `BridgeCostParityTestCase`，防止无声的计费偏差。
- 改进向量存储文件和上下文缓存创建的缓存行为（通过 PR #46144）。
- 修复 `websearch_interception` 中的内存泄漏问题，该问题会永久占用一个 `max_parallel_requests` 请求槽位（问题 #46093）。

> 🔗 [PR #46139–46143](https://github.com/BerriAI/litellm/pulls?query=author%3A%40kerrylu-berri+is%3Aopen+sort%3Aupdated-desc) | [Issue #46093](https://github.com/BerriAI/litellm/issues/46093)

---

### **5. 稳定性与回归问题**  
今日报告的主要稳定性问题：

| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| `Redis 缓存因 unexpected ssl_check_hostname 失败`（问题 #34614） | 严重 | 开放 | 尚无修复 |
| `Gemini 3 模型静默注入 temperature=1.0`（问题 #45333） | 高 | 已关闭 | [PR #38663](https://github.com/BerriAI/litellm/pull/38663) |
| `SSE 错误码超出 HTTP 范围（100–599）被静默丢弃`（问题 #31284） | 中等 | 开放 | 尚无修复 |
| `Proxy-admin JWT 绕过 max_budget`（问题 #41226） | 高 | 已关闭 | [PR #41226](https://github.com/BerriAI/litellm/pull/41226) |
| `Websearch_interception 泄露并行请求槽位`（问题 #46093） | 高 | 开放 | [PR #46134](https://github.com/BerriAI/litellm/pull/46134) |

> 🔗 [Issue #34614](https://github.com/BerriAI/litellm/issues/34614) | [Issue #46093](https://github.com/BerriAI/litellm/issues/46093)

---

### **6. 对应用开发者的启示**  
使用 LiteLLM 作为推理网关的应用开发者应：
- **审计成本追踪**，若部署 GPT-6、Claude 5 或 Bedrock Converse 模型——新的成本一致性测试确保了跨 API 桥接的计费一致性，但未经测试的配置仍可能存在不一致。
- **避免依赖 Gemini 3 模型的 `temperature` 默认值**——它们现在已被显式注入（修复：PR #38663），可能与未来 Google 模型的行为产生冲突。
- **谨慎处理流式网页搜索请求**——`max_parallel_requests` 中已知的泄漏可能导致限流或服务降级。
- **若使用 v1.93.0 版本，请更新 Redis 配置**；`ssl_check_hostname` 的缺陷可能在修复前导致缓存与预算功能失效。

> ✅ **可操作建议：** 若依赖每请求批次分析，请启用 `store_batch_line_items_in_callbacks`（PR #41691）——否则，在文件过期后，JSONL 级别的数据将丢失。

---  
*简报源自 GitHub 活动：2026-10-13 | 来源：[BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-10-13**

#### **1. 今日亮点**  
v0.1.906-beta 版本引入了**浏览器代理功能**，使模型能够通过点击、滚动、输入和页面读取与网页交互——为研究、数据提取和自动化场景中的 AI 代理开辟了全新可能性。本次更新还带来了 **Qwen-Image-2.1-Turbo 支持**（8 步图像生成）、**更快的 MoE GGUF 推理**、**M 系列芯片上的推测解码**以及 **文本扩散训练**，标志着多模态与高效模型服务的重大飞跃。

#### **2. 发布与破坏性变更**  
- **v0.1.906-beta**（GitHub：[发布说明](https://github.com/unslothai/unsloth/releases/tag/v0.1.906-beta)）  
  - 新增 `browser_use=True` 标志，用于在模型会话中启用浏览器交互。  
  - 修复 `UNSLOTH_RETURN_LOGITS` 环境变量持久化问题（此前训练过程中会重置）。  
  - 推测解码现已支持 Apple Silicon（M 系列）芯片，通过 `--speculative_decoding True` 启用。  
  - **注意**：旧版 Studio 行为（`UNSLOTH_STUDIO_KEEP_LEGACY=0`）现在在 Docker 中通过 `run.sh` 正确生效。

#### **3. 新模型与硬件支持**  
- **新增模型**：  
  - ✅ **Qwen-Image-2.1-Turbo**（GGUF）：已完整集成；约 8 步即可生成图像。  
  - ✅ **Ling 3.0**（在 #8532 中提出请求）：功能请求开放，预计将在未来的 Studio UI 更新中加入支持。  
  - ✅ **LTX-2.5 Diffusers（FP8/int8）**：现可直接从 Hugging Face 加载预量化 DiTs（`unsloth/LTX-2.5-FP8`），避免耗时的实时量化过程。  
- **硬件与后端**：  
  - ✅ **Apple Silicon（M 系列）**：全面支持推测解码与浏览器代理。  
  - ✅ **ROCm（AMD W7900/W7500）**：改进显存管理；修复 `No RAM offload` 行为异常问题（#10341）。  
  - ✅ **LM Studio / Ollama / 自定义文件夹**：现可在 Studio 的“本地设备”视图中可见并管理（#13507）。

#### **4. 性能与优化**  
- **MoE GGUF 推理**：相比之前版本提升最高达 **3.2 倍**，得益于 vLLM 集成路径中的内核级优化。  
- **推测解码（M 系列）**：在典型推理任务中延迟降低 **约 40%**（在 M3 Max 上测量）。  
- **文本扩散训练**：新训练流程将扩散步时间减少 **约 65%**，相较标准方法。  
- **内存效率**：修复 `vllm_process` 清理路径中的 GPU 内存泄漏问题（#13438）；现已在 CUDA/NPU/XPU 后端正确释放设备缓存。

#### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - ❗ **"tapClientLookup: Index 1 out of bounds (length: 0)"**（问题 #10288）：导致桌面应用中“新建聊天”时随机崩溃。*修复合并请求待处理*。  
  - ❗ **拖拽失败**（问题 #13473）：尽管有视觉反馈，聊天窗口仍无法接收文件拖拽。*PR #13489 修复了 HTML 解析边缘情况*。  
- **高影响缺陷**：  
  - ⚠️ **浏览器代理丢失页面内容**（问题 #13489）：当菜单缺少闭合标签时（例如 go.dev），菜单后的内容会丢失。*已在 PR #13489 中修复*。  
  - ⚠️ **模型即使未开启卸载仍驻留内存**（问题 #10341）：AMD ROCm 用户报告，即使勾选“无内存卸载”，模型仍未被释放。*近期合并请求部分解决此问题*。  
- **次要问题**：  
  - 🟡 **窗口调整问题（Wayland/GNOME）**（问题 #12845）：AppImage 无法正常调整大小。  
  - 🟡 **请求更灵活的 SSL 证书支持**（问题 #8716）：用户希望使用自定义 `.crt/.key` 文件，而非依赖 Cloudflare 隧道。

#### **6. 对应用开发者的意义**  
- **构建网络代理**：利用 `browser_use=True` 创建自主代理，实现网页导航、信息提取与自动操作——适用于研究、客服机器人或价格监控工具。  
- **优化多模态应用**：结合 **Qwen-Image-2.1-Turbo** 与 **LTX-2.5** 的 FP8/int8 量化，实现低延迟图像生成，同时不牺牲画质。  
- **高效部署于边缘设备**：借助 **M 系列芯片上的推测解码** 与 **优化的 MoE GGUF 内核**，可在本地运行复杂模型，延迟极低。  
- **规避隐藏陷阱**：始终检查 `UNSLOTH_RETURN_LOGITS` 在训练期间是否持久保留；使用 `--models-dir` 管理本地模型（PR #13435）。  
- **未来兼容性保障**：关注如 #13517（音频模型选择器修复）和 #13519（audio.cpp 统一仓库处理）等合并请求，确保与即将推出的音频及模型管理功能兼容。

> 🔗 **查看完整变更日志**：[unslothai/unsloth @ v0.1.906-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.906-beta)  
> 🔗 **跟踪关键问题**：[GitHub Issues Dashboard](https://github.com/unslothai/unsloth/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*