# AI 基础设施日报 2026-09-16

> 生成时间: 2026-09-16 00:44 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

### **跨项目AI基础设施对比报告 – 2026-09-16**

---

#### **1. 生态概览**  
AI推理与服务生态正进入*深度专业化与硬件融合*阶段，各项目在目标层级（服务、本地运行时、网关、训练）上的分化日益明显，同时在新一代硬件支持上趋于统一——特别是NVIDIA Blackwell、AMD ROCm MI355X、Intel XPU Arc Pro B70和Apple Silicon。关键关注点包括推测解码的鲁棒性、通过超低精度KV缓存（如vLLM的`ultraquant_4bit`）实现长上下文效率，以及针对MoE模型的分布式内存管理。混合架构（Mamba/GDN、SWA/SSM）与结构化推理工作流的兴起，凸显向以智能体为中心的设计转变。

---

#### **2. 活动对比**  

| 项目       | 开放问题数 | 近24小时合并的PR数 | 发布状态       |
|------------|------------|---------------------|----------------|
| **vLLM**   | 284        | 12                  | 无             |
| **SGLang** | 198        | 8                   | 无             |
| **llama.cpp** | 342     | 14                  | 构建：b10991, b10985 |
| **Ollama** | 167        | 5                   | v0.34.2-rc0 (RC) |
| **LiteLLM** | 149       | 6                   | v1.101.0 (稳定) |
| **Unsloth** | 213       | 7                   | 无             |

> ✅ **洞察**：*llama.cpp* 在底层活动上领先，而*LiteLLM* 则以一个安全加固的稳定版本脱颖而出。尽管无新发布，*vLLM* 仍保持高工程迭代速度。

---

#### **3. 模型支持竞赛**  

| 新模型 / 架构           | vLLM               | SGLang              | llama.cpp          | Ollama            | LiteLLM             | Unsloth             |
|------------------------|--------------------|---------------------|--------------------|-------------------|---------------------|---------------------|
| **DeepSeek-V4.1**      | ✅ (PRs)           | ✅ (已合并)          | ❌                 | ❌                | ❌                  | ❌                  |
| **Kimi-K3**            | ✅ (优化中)         | ❌                  | ❌                 | ❌                | ❌                  | ❌                  |
| **Qwen3.5 / Qwen3.8**  | ✅ (ROCm/MoE)       | ✅ (HiCache配置)     | ✅ (OOM问题)       | ⚠️ (IQ3_S缺陷)    | ❌                  | ⚠️ (无限循环)        |
| **Gemma 4 Tool Calls** | ❌                 | ❌                  | ❌                 | ✅ (PR #18471)     | ❌                  | ❌                  |
| **SenseNova-U1/U1.5**  | ❌                 | ✅ (追踪中)          | ❌                 | ❌                | ❌                  | ❌                  |
| **Gemma 4 26B A4B**    | ❌                 | ❌                  | ✅ (OOM)           | ❌                | ❌                  | ✅ (OOM)            |
| **NVFP4 / MXFP4**      | ✅ (MoE)            | ✅ (dsv4.1)          | ✅ (Flash Attention)| ❌                | ❌                  | ✅ (基准测试)        |

> 🏆 **胜者**：**SGLang** — 对前沿架构（dsv4.1、HiCache-ready Qwen3.5）支持最全面。  
> 🥈 **亚军**：**vLLM** — MoE + ROCm + 推测解码集成最强。  
> ⚠️ **警告**：Unsloth 和 Ollama 分别在 Qwen3 微调和工具解析方面面临严重稳定性问题。

---

#### **4. 性能前沿**  

| 优化重点               | vLLM                     | SGLang                   | llama.cpp               | Ollama              | LiteLLM               | Unsloth               |
|------------------------|--------------------------|--------------------------|-------------------------|---------------------|-----------------------|-----------------------|
| **KV缓存效率**         | ✅ `ultraquant_4bit` (密度提升2倍) | ✅ HiCache L2/L3指标       | ✅ 稀疏Flash Attention   | ✅ Vulkan优化         | ❌                    | ❌                    |
| **批处理与不变性**     | ✅ `VLLM_BATCH_INVARIANT=1` | ❌ (延迟回归)             | ❌ (分歧问题)           | ❌                  | ✅ (无需聚合键)        | ❌                    |
| **量化**               | ✅ AWQ融合，FP4/E2M1       | ✅ NVFP4，FP8 matmul       | ✅ Q4_K_M，RPC哈希缓存   | ✅ IQ3_S，e4b        | ❌                    | ✅ NVFP4内核测试       |
| **分布式服务**         | ✅ MoE卸载 (LFRU)         | ✅ PD解耦解码              | ❌                     | ❌                  | ✅ (基于成本路由)      | ❌                    |
| **内核级调优**         | ✅ Triton 3.8，扩展`ldmatrix` | ✅ CuTe DSL转置 (~3倍加速) | ✅ HIP MMQ流水线，SM70跨越 | ✅ CUDA负载去重       | ❌                    | ✅ 可移植NVFP4校验     |

> 🔥 **热点**：*vLLM* 在**分布式推理**和**硬件特异性内核**上占据主导；*SGLang* 则在**内存层次可观测性**和**内核协同设计**方面领先。

---

#### **5. 层级定位**  

| 项目       | 主要层级                | 次要角色                    | 核心差异点                                  |
|------------|-------------------------|----------------------------|--------------------------------------------|
| **vLLM**   | **推理引擎**            | 模型服务，MoE编排           | 行业领先的多GPU可扩展性与推测解码鲁棒性     |
| **SGLang** | **底层运行时**          | 分布式推理，缓存调优         | 统一基数缓存，HiCache，内核可观测性         |
| **llama.cpp** | **本地推理运行时**     | 跨平台部署                 | 最广的后端支持（Hexagon、Vulkan、SYCL）     |
| **Ollama** | **面向智能体的网关**    | 本地模型编排               | 智能体专用的结构化输出 + 工具调用集成        |
| **LiteLLM** | **生产级LLM网关**      | 成本控制、防护机制、可观测性 | 团队级支出上限，安全Docker镜像（cosign）     |
| **Unsloth** | **微调 + 工作台栈**     | 本地模型管理，RLHF         | 多模态强化学习的GRPOTrainer，macOS Metal修复 |

> 💡 **战略洞察**：*vLLM/SGLang* 正在构建**高性能分布式服务**的未来；*Ollama/LiteLLM* 正塑造**智能体开发栈**；*llama.cpp* 仍是**通用本地运行时**的首选。

---

#### **6. 趋势信号**  

**从今日活动提取的关键行业趋势：**  
1. **长上下文主导**：超低精度KV缓存（如vLLM的`ultraquant_4bit`）已成为核心竞争壁垒——对智能体工作流与RAG至关重要。  
2. **混合架构已成主流**：Mamba/GDN、SWA/SSM及MoE混合架构不再仅是实验性方案，项目正大力投入正确性与性能优化（如SGLang的统一基数缓存、vLLM的前缀缓存修复）。  
3. **推测解码稳定性脆弱**：多个崩溃事件（vLLM、SGLang、llama.cpp）表明推测解码仍是高风险路径——开发者应**启用`--enforce-eager`作为回退策略**，直至相关PR上线。  
4. **安全与合规不可妥协**：LiteLLM的签名Docker镜像（cosign）标志着开源基础设施向**生产级可信度**的转变。  
5. **本地与云权衡日益尖锐**：如Ollama和Unsloth强调本地执行韧性（离线缓存、内存预算），而LiteLLM和vLLM则专注于云规模的成本控制。

> 📌 **给开发者的行动建议**：  
> - 使用 **vLLM + UltraQuant 4-bit** 实现长上下文、高吞吐推理。  
> - 选择 **SGLang** 用于大规模、低延迟分布式服务，支持混合模型。  
> - 部署 **Ollama + LiteLLM** 以实现需结构化输出与成本追踪的智能体应用。  
> - 避免在 **unsloth v2025.7.1+ 中使用 Qwen3 微调**，以及在 **Jetson Orin Nano 的 DIO 模式下运行**，直到补丁发布。  
> - 密切监控 **推测解码稳定性**，尤其在新型GPU（B200/B300、H200）上。

---

*报告生成时间：2026-09-16 | 数据来源：GitHub项目摘要*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

### **vLLM Digest — 2026-09-16**

#### **1. 今日亮点**
vLLM 项目持续加速推进 **多 GPU 扩展性**、**推测解码鲁棒性** 以及针对 AMD ROCm、Intel XPU 和下一代 NVIDIA 架构（B200/B300）的硬件特定优化。关键进展包括新增支持 **UltraQuant 4-bit KV 缓存后端**，用于长上下文推理，并修复了若干关键问题：**推测解码下的批处理不变性破坏** 与 **混合 Mamba/GDN 模型中的前缀缓存失败**。

#### **2. 发布与破坏性变更**
无。过去 24 小时内未发布新版本或破坏性变更。

#### **3. 新模型与硬件支持**
- **UltraQuant 4-bit KV 缓存后端（PR #57057）**：新增 `ultraquant_4bit` 数据类型支持（FP4 E2M1，每组使用 UE8M0 缩放，哈达玛旋转键），相比 FP8 可实现 **约 2 倍的 KV 缓存密度提升**，对智能体和长上下文服务至关重要。
- **ROCm 支持扩展**：新增 MI300/MI355 单卡组的 CI 测试环境（PR #57080），并通过 Triton 3.8 API 增强对 **gpt-oss 与 DeepSeek-V4** 的 MoE 支持（PR #55934）。
- **Intel XPU 修复**：修复 Qwen2-Audio 的音频长度限制问题（PR #56912），以及 WNA16 MoE 的卸载行为异常（PR #57008），提升 Arc Pro B70 上的稳定性。
- **Kimi-K3 优化**：通过主动回退与图安全上下文捕获，降低 DSpark 启动开销（PR #57048）。

#### **4. 性能与优化**
- **AWQ 融合（PR #57047）**：在 SM89 上启用 `VLLM_BATCH_INVARIANT=1` 时，将 AWQ 反量化与 GEMM 融合为单个操作，避免完整权重展开——显著提升批处理不变场景下的吞吐量。
- **MoE 专家卸载（RFC #38256）**：通过增量 GPU 缓存 + 异步流水线，结合 CPU 钉住内存与 LFRU 淘汰策略，可在较小硬件上运行超大 MoE 模型（如 >120B）。
- **内核级优化**：
  - Marlin W4A8 现在采用扩展的 `ldmatrix`（PR #50096），更充分地利用 PTX 9.4 特性。
  - Triton 内核更新以支持 mxfp4 MoE（PR #55934），减少分发开销。
- **精度调度器上线（PR #57093）**：适配 pro6000 级别硬件的精度调度，提升资源利用率。

#### **5. 稳定性与回归问题**
- **严重批处理不变性破坏（Issue #56370）**：启用 SP + 异步 TP（`VLLM_BATCH_INVARIANT=1`）导致输出非确定性；**已由 PR #57092 修复**（在线 FP8 MoE 专家现具备批处理不变性）。
- **前缀缓存损坏（Issue #53912）**：混合 Mamba/GDN 模型在启用前缀缓存 + MTP 时失败；**PR #52244 已恢复正确行为**。
- **推测解码崩溃（Issue #56443）**：H200（SM90）上 DSpark 预热阶段 `map_draft_to_target` 中发生 CUDA 设备端断言；暂无修复方案。
- **无声输出损坏（Issue #53480）**：Intel XPU 在持续负载下持续输出无限个 "!" 令牌；**暂无修复方案**。
- **KV 缓存完整性（Issue #54363）**：文件系统层级缺乏 I/O 活跃性检查，存在静默数据丢失风险；**相关 RFC 正在跟踪中**。

#### **6. 对应用开发者的启示**
- **在长上下文应用中使用 `ultraquant_4bit`**，当 KV 缓存成为瓶颈时，预计可减少约 2 倍的显存占用。
- **在 MoE + FP8 场景下避免使用 `VLLM_BATCH_INVARIANT=1`**，直到 PR #57092 上线——否则跨批次输出可能非确定。
- **在 XPU 上谨慎启用 `--offload-backend uva`**：需手动验证内存压力是否下降（问题 #57008 显示压缩张量的 MoE 可能无法降低峰值显存）。
- **监控混合模型（Qwen3.8、Kimi-K3）及新显卡（B200/B300）上的推测解码稳定性**；如遇问题，可临时使用 `--enforce-eager` 作为规避手段。
- **仅在手动注入跨度时使用 `--otlp-traces-endpoint`**——当前追踪器虽已初始化，但从不发送跨度（问题 #56696）。

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-09-16**

---

### **1. 今日亮点**  
SGLang 项目持续推进针对 Blackwell 与 ROCm 平台下一代推理的底层内核与基础设施优化。关键进展包括 DeepSeek-V4.1 内核在 Hopper FP8 矩阵乘支持下的稳定化、HiCache 混合缓存恢复承诺的重大修复，以及跨后端统一 radix 缓存行为的持续工作。关键的 CUDA 核心转储追踪问题 #26340 仍处于活跃状态，表明高并发环境下仍存在持续的稳定性挑战。

---

### **2. 发布与破坏性变更**  
*无*  
过去 24 小时内未发布新版本。未引入任何破坏性 API 或配置变更。

---

### **3. 新模型与硬件支持**  
- **SenseNova-U1/U1.5**：跟踪议题 #37742 确认基于 OpenSenseNova/SenseNova-U1 参考实现的集成工作正在积极进行。  
- **DeepSeek-V4.1 (dsv4.1)**：多个 PR 已合并（#39664, #39657, #39646, #39653, #39666），引入独立内核、FP8 矩阵乘、通信原语、Engram 模块及请求历史支持——为完整模型部署奠定基础。  
- **ROCm (MI355X)**：更新菜谱对齐 (#39572)，确保 Qwen3.5 MXFP4 AgentX 的 HiCache 配置正确（`kernel`, `page_first`）。  
- **Ascend NPU**：采样优化 (#39404) 避免不必要的设备同步，提升 Ascend 硬件上的吞吐量。

---

### **4. 性能与优化**  
- **HiCache L2/L3 指标**：PR #39280 增加按 rank 标注并拆分“收缩”预取原因，增强分布式解码性能调优的可观测性。  
- **KDA 解码状态转置**：PR #39680 合并 CuTe DSL 状态转置，实现 **约 3 倍加速**，且输出位级完全一致。  
- **统一 radix 缓存**：PR #38634 为混合 SWA/SSM 模型启用解码侧 HiCache 并修复 L3 恢复承诺，支持更高效的内存层级结构。  
- **CUDA Graph 预填充（ROCm）**：PR #37810 为 DeepSeek-V4 HIP 后端启用可中断的 CUDA Graph 预填充，降低动态批处理场景下的开销。

---

### **5. 稳定性与回归问题**  
- **严重回归**：PR #38628 报告在 Blackwell 上使用 `tiny_gemm` 替代 `dsv3_router_gemm` 时，DeepSeek-R1 NVFP4 的解码延迟出现 **4% 回归**。由于内核设计深层权衡，该问题无法简单回滚。  
- **CUDA 非法内存访问**：议题 #37633 显示在 H20 TP8 上运行 8 个并发请求时，Qwen3.8-Flash-Next-FP8 出现崩溃；可通过 `--disable-overlap-schedule` 临时规避，但不建议长期使用。  
- **MoE 模型加载崩溃**：议题 #36711 报告当强制启用 `--moe-runner-backend flashinfer_trtllm` 并设置 `disable_shared_experts_fusion` 时，GLM-5.3-Flash 启动阶段出现 `IndexError`。  
- **解码回退崩溃**：议题 #38645 在 DCP > 1 的 PD 分离解码模式下，KV 缓存备份期间触发 CUDA 设备端断言。  
- **CI 健康状况**：截至 2026-09-15，议题 #17050 报告有 5 个失败、22 个不稳定、991 个最近修复的 CI 任务；维护模式 (#21065) 可能已启用。

---

### **6. 对应用开发者的启示**  
- **谨慎使用 dsv4.1 与 Hopper FP8**：尽管新内核已合并，仍需通过基准测试验证性能影响——特别是依赖 `tiny_gemm` 路径时。  
- **对混合模型（SWA/SSM）与多节点部署启用统一 radix 缓存 + HiCache**；确保环境配置与更新后的指标和参数（如 `page_first`, `kernel` IO）一致。  
- **生产环境中避免使用 `--disable-overlap-schedule`**，除非必要——此举会禁用关键性能特性。请关注 #37633 的上游修复。  
- **预期 MoE 与量化模型处理（如 FP8、NVFP4）频繁更新**；使用 `main` 分支时务必小心，并在目标硬件上充分测试。  
- **充分利用新可观测性能力**：使用按 rank 的 HiCache 指标 (#39280) 和核心转储调试日志 (#26340) 来诊断大规模部署中的可扩展性问题。

> 🔗 [GitHub Issues](https://github.com/sgl-project/sglang/issues) | [Pull Requests](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 摘要 – 2026-09-16**

---

### **1. 今日亮点**  
最新更新聚焦于 Hexagon 与 OpenCL 后端的关键性能修复，包括重新启用连续内存快速路径及 DMA 优化，显著提升如 Qwen3.x 等高重塑操作负载的性能。在推测解码稳定性以及 Vulkan 后端正确性方面也取得显著进展，多个 PR 针对 MoE 路由、稀疏 Flash Attention 和缓存切片处理进行了改进。

---

### **2. 发布与破坏性变更**  
今日未发布新的标记版本。但近期构建版本（`b10991`、`b10989`、`b10985`）包含重要变更：
- **`b10991`**：在 Hexagon 后端中恢复缺失的连续快速路径和 `hvx_copy_uu` (#28886) —— 对高通 AI 加速器性能至关重要。
- **`b10985`**：引入仅对权重进行 RPC 哈希缓存优化 (#28789)，使用 `rpc-server -c` 时可降低网络传输开销。
- **`b10984`**：在 CUDA 中添加对行连续 `SUM_ROWS` 的支持 (#26308)，提升了特定聚合模式下的效率。

> 🔗 [GitHub 发布证明](https://github.com/ggml-org/llama.cpp/attestations)

---

### **3. 新模型与硬件支持**  
- **Vulkan**：为 DSV4/GLM 模型新增 **稀疏 Flash Attention** 支持 (#28105)，使具有稀疏注意力模式的大上下文架构推理更高效。
- **OpenCL**：基于批大小优化推测解码/MTP 场景中的 MoE 专家矩阵乘法选择 (#27637)，提升动态调度准确性。
- **Hexagon**：通过内部零填充内核，将 HMX Flash Attention 支持扩展至非 64 对齐的头维度（如 SigLIP 的 `head_dim=72`) (#26539)。
- **SYCL**：新增 `ssm_scan` 通用内核 (#28881)，扩大了英特尔 GPU 平台对状态空间模型的支持范围。

> 🔗 [PR #28105 – 稀疏 Flash Attention](https://github.com/ggml-org/llama.cpp/pull/28105)  
> 🔗 [PR #26539 – 非 64 倍数头维度](https://github.com/ggml-org/llama.cpp/pull/26539)

---

### **4. 性能与优化**  
- **Hexagon**：连续内存传输中使用 DMA，避免低效复制路径，在重塑密集型模型（如 Qwen3.x）中提升吞吐量 (#28906)。
- **CUDA/HIP**：  
  - 通过分块方式优化 RDNA 3.5 的 MMQ 流水线，增强延迟隐藏能力 (#28714)。  
  - 调整 SM70（Volta）K-量化交叉点，实现更优性能平衡 (#28912)。  
  - 减少 ROCm 上 WMMA Flash Attention 中不必要的 KV 块处理 (#28943)。
- **Vulkan**：为 `MUL_MAT_ID` 小批量情况实现 `BN/2 tail` 优化，提升利用率并减少浪费 (#28923)。
- **RPC**：仅缓存权重的哈希机制可在重复加载模型时减少高达 ~70% 的冗余数据传输 (#28789)。

> 🔗 [PR #28714 – HIP MMQ 流水线分块](https://github.com/ggml-org/llama.cpp/pull/28714)  
> 🔗 [PR #28943 – 跳过被掩码的 KV 块](https://github.com/ggml-org/llama.cpp/pull/28943)

---

### **5. 稳定性与回归问题**  
今日报告的主要稳定性问题：
- **推测解码输出偏差** (#25618)：量化模型（`Q4_K_M`）与 BF16 目标输出存在差异——可能源于草稿模型路由中的舍入差异。*尚未有修复 PR。*
- **Vulkan 性能下降** (#24066)：近期构建在 RX 6600 上运行 Qwen3.5-9B-Q5_K_M.gguf 时评估速度明显下降——疑似内核回归。
- **SYCL 上 GPU TDR 崩溃** (#28778)：双 Intel Arc Pro B70 显卡在加载 DFlash2 草稿模型时触发 Windows TDR 重置——驱动层不稳定。
- **聊天过程中内存持续增长** (#28933)：在 128GB 统一内存系统上运行 qwen4_exp 时，主机侧 RSS+swap 线性增长——上下文管理或 KV 缓存复用可能存在泄漏。
- **Vulkan 缓存切片错误** (#28956)：因错误假设头间距导致注意力缓存读取错误数据——造成输出损坏；*修复 PR 待提交*。

> 🔗 [问题 #25618 – 推测解码输出偏差](https://github.com/ggml-org/llama.cpp/issues/25618)  
> 🔗 [PR #28956 – 修复 Vulkan 缓存切片读取错误](https://github.com/ggml-org/llama.cpp/pull/28956)

---

### **6. 对应用开发者的启示**  
- **谨慎使用 `--model-draft`** —— 近期推测解码回归可能导致量化目标输出不一致；建议与完整模型运行结果对比验证。
- **若使用 AMD ROCm on gfx1201，避免 `b10989` 及后续版本** —— 低分派阈值可能导致性能下降（#28867）；建议锁定至更早稳定版本。
- **充分利用新 RPC 哈希缓存**（`rpc-server -c`）以部署多模型，降低带宽消耗与冷启动时间。
- **针对 Android 应用**，新接口 `llama_model_load_from_fd()` (#28973) 实现无需文件系统暴露的安全沙盒式 GGUF 加载——非常适合移动端代理。
- **密切监控大上下文模型**（如 Qwen4Exp、Gemma4-26B）的内存使用情况——主机内存持续增长表明循环状态或 KV 缓存处理可能存在泄漏。

> 🔗 [PR #28973 – 从文件描述符加载](https://github.com/ggml-org/llama.cpp/pull/28973)  
> 🔗 [PR #28789 – RPC 权重哈希缓存](https://github.com/ggml-org/llama.cpp/pull/28789)

---  
*摘要生成时间：2026-09-16 | 来源：[ggml-org/llama.cpp GitHub](https://github.com/ggml-org/llama.cpp)*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-16**

---

### **1. 今日亮点**  
最新发布的 `v0.34.2-rc0` 版本对 `llama.cpp` 进行了关键更新，提升了稳定性和性能。主要改进包括修复启用思考模式的模型在 MLX 上的结构化输出问题，以及在 ARM64 Linux 系统上增强 Vulkan 后端支持。多个 PR 显现出对结构化输出和推理模型兼容性的持续关注。

---

### **2. 发布与破坏性变更**  
- **v0.34.2-rc0**：基于更新的 `llama.cpp`（b10969）发布，解决了符号冲突问题并提升了运行时兼容性。  
  🔗 [更新日志](https://github.com/ollama/ollama/compare/v0.34.1...v0.34.2-rc0)  
  *未报告破坏性变更；向后兼容性已保持。*

---

### **3. 新模型与硬件支持**  
- **高通 IQ-9075 NPU/GPU**：功能请求 (#18445) 表明对 Dragonwing™ 平台（如 Raxda Fogwise Airb）原生支持的需求，目前尚未实现，但社区关注度持续上升。  
  🔗 [问题 #18445](https://github.com/ollama/ollama/issues/18445)  
- **ARM64 Linux 上的 Vulkan**：PR #18466 实现了 ARM64 架构上的 Vulkan 推理后端支持，修复了基于 Apple Silicon 系统的设备分类问题。  
  🔗 [PR #18466](https://github.com/ollama/ollama/pull/18466)  
- **Gemma 4 工具调用解析**：PR #18471 增加了对 `call:<name>:` 格式的支持，该格式由 Gemma 4 多模态模型使用 `BEGIN_ARG`/`END_ARG` 块进行封装。  
  🔗 [PR #18471](https://github.com/ollama/ollama/pull/18471)

---

### **4. 性能与优化**  
- **MLX 内存预算控制**：PR #18481 为 CUDA 设备引入了占用空闲内存 95% 的内存预算策略，防止模型加载期间发生 OOM——对稳定 GPU 推理至关重要。  
  🔗 [PR #18481](https://github.com/ollama/ollama/pull/18481)  
- **结构化输出效率提升**：多个 PR（如 #18479、#18478）致力于在启用思考的模型上以单次遍历完成结构化输出，消除昂贵的两遍生成过程，降低延迟。  
  🔗 [PR #18479](https://github.com/ollama/ollama/pull/18479)  
- **CUDA 载荷去重**：PR #17956 通过去重共享 CUDA 运行时库，减小二进制体积并提升加载速度。  
  🔗 [PR #17956](https://github.com/ollama/ollama/pull/17956)

---

### **5. 稳定性与回归问题**  
- **Jetson Orin Nano 上严重内存溢出**：问题 #18396 和 #17787 报告在通过 DIO 模式或 v0.32.2 之后加载 `gemma4:e2b`/`e4b` 模型时出现严重内存占用过高现象，即使上下文窗口较小也如此。这些是高优先级的硬件相关回归问题。  
  🔗 [问题 #18396](https://github.com/ollama/ollama/issues/18396) | 🔗 [问题 #17787](https://github.com/ollama/ollama/issues/17787)  
- **Vulkan iGPU 在取消预填充后挂起**：问题 #18477 报告在 Intel Lunar Lake GPU 上，Vulkan 运行器在取消操作后会无声挂起，需重启服务器方可恢复。  
  🔗 [问题 #18477](https://github.com/ollama/ollama/issues/18477)  
- **MLX 结构化输出前缀错误**：PR #18459 修复了因解码器前瞻导致响应开头出现多余 `.` 字符的回归问题。  
  🔗 [PR #18459](https://github.com/ollama/ollama/pull/18459)  

> ✅ **修复中**：多个 PR 正在解决崩溃与挂起的根本原因（如 goroutine 泄漏、流处理问题）。

---

### **6. 对应用开发者的启示**  
- **在 v0.34.2+ 解决 OOM 问题前，请避免在 Jetson Orin Nano 上使用 DIO 模式** —— 改用 `--load-mode cpu` 或 `default`。  
- **谨慎组合使用 `format` 与 `thinking`**：在 #18479 等 PR 落地前，预计会出现双倍预填充开销及潜在的 JSON 损坏（如多余的 `.` 前缀）。  
- **安全启用结构化输出**：通过 PR #18473 提供的 `/api/show` 元数据动态检测各模型支持的推理层级。  
- **监控云集成状态**：Claude 集成存在约 50 秒延迟和工具调用格式错误（问题 #18474）；建议准备备用策略。  
- **期待更优的内存控制**：随着即将推出的 CUDA 内存预算（PR #18481），开发者可在多 GPU 环境中更可靠地管理 GPU 负载。

> 📌 **实用提示**：对于使用工具和结构化输出的智能体，建议在 macOS/Linux 上使用 `qwen3.8:27b-mxfp8` 或 `gemma4:e4b` 进行测试，以避开 `IQ3_S` 量化中的已知缺陷（问题 #18297）和工具参数丢失问题（问题 #18468）。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 消息简报 – 2026-09-16**

---

### **1. 今日重点**  
LiteLLM 生态系统持续成熟，聚焦可观测性、成本准确性以及高规模推理环境下的稳健性。关键更新包括修复流式响应中的关键令牌计费问题（PR #41337）、改进 MCP 工具调用中守卫机制的执行（PR #41334），以及新增团队级别模型级支出上限支持（PR #41330）。这些变更进一步巩固了 LiteLLM 作为生产级大模型网关的地位。

---

### **2. 发布与破坏性变更**  
- 今日发布 **v1.101.0**，安全性增强：所有 Docker 镜像现已通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 使用 Sigstore 签名。  
  🔒 部署时请使用 `cosign verify` 验证签名 —— 安全部署必备。  
  ➡️ [GitHub Release v1.101.0](https://github.com/BerriAI/litellm/releases/tag/v1.101.0)

---

### **3. 新模型与硬件支持**  
本周期未新增模型或硬件后端。但正在进行的工作包括：  
- PR #41338：将 Gemini 响应中的 `modelVersion` 传递至日志，确保日志与计费准确。  
- PR #41327：为 S3 回调新增 `s3_log_prompts_only` 选项——适用于合规要求高的工作流。

> ✅ *注意：* 通过 #30129 已新增对 Azure 托管 Deepseek 模型（`azure_ai/deepseek-v4-flash`, `azure_ai/deepseek-v4-pro`）的支持。

---

### **4. 性能与优化**  
- **PR #41324**：引入 `LiteLLM_DailyGlobalSpend` 聚合键免查询机制，降低大租户的查询负载。  
  📈 通过避免对 `(user, key, model, day)` 事实表进行全量扫描，显著提升仪表盘性能——对高基数多租户部署至关重要。  
- **PR #41311**：增强 `/key/list` 过滤功能，支持按状态查询（`active`, `expired`, `revoked`, `deleted`），且 `/key/info` 现在返回已删除的密钥——提升审计能力与运维可见性。  
- **PR #41337**：修复流式响应缺少 `usage` 元数据时的错误令牌统计问题——即使上游提供商部分上报，也能确保计费准确。

---

### **5. 稳定性与回归问题**  
今日报告的顶级稳定性问题：

| 问题 | 严重性 | 修复状态 | GitHub 链接 |
|------|----------|------------|-------------|
| `requests/tokens per day rate limit` 缺失（目前仅支持每分钟） | 高 | 开放 | [#14398](https://github.com/BerriAI/litellm/issues/14398) |
| `per-customer RPM limits` 在虚拟密钥缓存后失效 | 高 | 开放 | [#39713](https://github.com/BerriAI/litellm/issues/39713) |
| `compression_savings_spend` 与 `prompt_caching_savings_spend` 在基于成本路由中始终为 $0 | 中 | 开放 | [#37117](https://github.com/BerriAI/litellm/issues/37117) |
| `project spend` 尽管有预算强制，却从未被追踪 | 中 | 开放 | [#33871](https://github.com/BerriAI/litellm/issues/33871) |
| `Guardrails Monitor` 缺少对 `litellm_content_filter` 的评估 | 低 | 已关闭 | [#36566](https://github.com/BerriAI/litellm/issues/36566) |

> 💡 **今日已合并的关键修复 PR：**  
> - [#41337](https://github.com/BerriAI/litellm/pull/41337)：当流完成中 `usage: null` 时重新计算令牌数  
> - [#41336](https://github.com/BerriAI/litellm/pull/41336)：容错 Anthropic 的 `message_delta` 事件中缺失的 `usage`  
> - [#41338](https://github.com/BerriAI/litellm/pull/41338)：保留 Gemini 响应中的 `modelVersion` 以确保日志准确  

---

### **6. 对应用开发者的意义**  
- **计费准确性**：请务必使用 v1.101.0 或更高版本——近期修复可防止因流式响应中缺少 `usage` 导致的漏计费（如 Anthropic、Fireworks 场景）。  
- **团队级预算控制**：通过 PR #41330 使用 `model_max_budget` 在团队层级设置支出上限，无需逐密钥配置。  
- **审计与合规**：利用 `s3_log_prompts_only`（PR #41327）和增强的 `/key/list` 过滤功能（PR #41311），实现更严格的访问控制并减少数据暴露。  
- **守卫机制与工具安全**：MCP 后置守卫现在可在所有作用域（密钥/团队/策略）正确执行——对智能体安全至关重要。  
- **规避已知缺陷**：避免对 Bedrock 非工具模型使用 `tools=`（参见 #24158）；建议改用 `tool_choice: none`。

👉 **行动项：**  
- 升级至 v1.101.0 并验证镜像签名。  
- 检查 `model_max_budget` 与 `team_level` 成本控制配置。  
- 审查您的守卫机制设置——尤其是使用 MCP 工具时。

---

*简报数据来源：[BerriAI/litellm](https://github.com/BerriAI/litellm)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth 消息简报 – 2026-09-16**

---

### **1. 今日重点**  
Unsloth 项目持续推进多模态与推理基础设施建设，关键的 PR 修复了 macOS Metal 上下文预算、Windows 后端清理以及 Studio 模型缓存的容错能力。一个影响 Qwen3 微调的高严重性问题（#3211）仍处于开放状态，但正在积极调查中，凸显出处理新式大语言模型变体时面临的持续挑战。与此同时，团队正推进 Studio 核心工作流的健壮性修复，并增强对本地模型管理的支持。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
然而，多个高优先级的 PR 表明即将推出变更：  
- **PR #11022**：修复 `llama-server` 卸载期间的 Windows 特定进程泄漏问题，防止残留模型映射和 PID 文件损坏。[链接](https://github.com/unslothai/unsloth/pull/11022)  
- **PR #11026**：移除对 Hugging Face API 的依赖以发现本地模型缓存，实现离线访问已缓存模型。[链接](https://github.com/unslothai/unsloth/pull/11026)  
- **PR #11025**：在 Studio 中修正上下文大小估算逻辑，尊重用户输入值而非预计算估计值。[链接](https://github.com/unslothai/unsloth/pull/11025)

> *开发者应预期本地部署流程的稳定性将得到提升，尤其在 Windows 和离线环境中。*

---

### **3. 新模型与硬件支持**  
- **Qwen3.5** 因多个报告的问题（如微调中的无限循环、GRPOTrainer 崩溃）正受到重点关注。社区正在测试其在 CUDA、ROCm 与 CPU 后端上的兼容性。  
- **Gemma 4 26B A4B** 与 **Qwen3.5 9B** 在特定量化与批处理设置下已被确认会触发 OOM 或运行时错误。  
- **AMD ROCm**：已在裸金属 Strix Halo（Ryzen AI MAX+ 395）上报告并复现了一个关键段错误，仅在使用捆绑的 ROCm 运行时环境下出现。[问题 #6276](https://github.com/unslothai/unsloth/issues/6276)  
- **macOS Metal**：PR #11060 调整了 CPU 映射嵌入成本计算方式，避免人为的令牌限制（例如，在 128GB MacBook 上将 Qwen3.8-Flash-Next 的令牌上限设为 8K）。[链接](https://github.com/unslothai/unsloth/pull/11060)

---

### **4. 性能与优化**  
- **GRPO 训练**：PR #11031 实现了完整视觉输入转发（如 `image_grid_thw`、`spatial_shapes`），并支持图像列表作为输入——这对多模态 RLHF 流水线至关重要。[链接](https://github.com/unslothai/unsloth/pull/11031)  
- **推理效率**：PR #11060 通过修正 Metal 内存计数，提升了 Apple Silicon 上的上下文利用率，某些情况下有效上下文长度可能提高高达 30%。  
- **基准测试**：PR #10391 引入了适用于 RTX 5090、DGX Spark 与基于 WSL 系统的便携式 NVFP4 + 低秩校正核检查——旨在为未来的内核优化铺路。[链接](https://github.com/unslothai/unsloth/pull/10391)  

> *预计多模态强化学习训练性能将更好，同时在 Apple Silicon 与高端 AMD GPU 上内存效率也将显著提升。*

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 摘要 | 修复状态 |
|--------|------|------|----------|
| ⚠️ 高 | [#3211](https://github.com/unslothai/unsloth/issues/3211) | v2025.7.1+ 版本中 Qwen3 微调期间发生无限循环 | 开放，待确认 |
| ⚠️ 高 | [#6276](https://github.com/unslothai/unsloth/issues/6276) | bare-metal Ryzen AI MAX+ 395 上 `rocm-gfx1151` 预编译二进制文件段错误 | 已确认；临时方案：使用系统 ROCm |
| ⚠️ 中 | [#4983](https://github.com/unslothai/unsloth/issues/4983) | Unsloth 默认安装 PyTorch 2.10.0，导致 FlashAttention 2 不可用 | 功能请求；暂无修复 |
| ⚠️ 中 | [#4801](https://github.com/unslothai/unsloth/issues/4801) | Qwen3.5 + TRL GRPOTrainer 中 `apply_rotary_pos_emb` 大小不匹配 | 开放，影响使用 Qwen3.5 的 GRPO 训练 |
| 🟡 低 | [#10923](https://github.com/unslothai/unsloth/issues/10923) | Docker 模型因缺少卷挂载无法持久化 | 文档缺失 |

> *Qwen3 微调流程中的关键回归问题需依赖该模型系列的用户立即关注。*

---

### **6. 对应用开发者的启示**  
- **在 #3211 修复前，请勿在 Qwen3 微调中使用 unsloth `v2025.7.1+` 版本**——如需稳定性，建议回退至早期版本。  
- **在搭载 Ryzen AI MAX+ 显卡的 AMD 平台，使用系统安装的 ROCm 而非捆绑的 `rocm-gfx1151` 二进制文件**。  
- **对于 macOS 用户**，在 PR #11060 合并后可期待更高的有效上下文长度——非常适合长文本推理与 RAG 应用。  
- **得益于 PR #11026**，本地模型缓存现在具备网络中断容错能力——可在无互联网环境下部署。  
- **多模态 RLHF 开发者**应关注 PR #11031，以获取 GRPO 训练中完整的视觉输入支持。  

> *Unsloth 正逐步成长为一个生产级、跨平台的推理与微调框架——但使用前沿模型支持时仍需谨慎。*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*