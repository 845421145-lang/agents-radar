# AI 基础设施日报 2026-09-22

> 生成时间: 2026-09-22 01:04 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-22**

---

### **1. 生态概览**  
AI推理与服务生态正进入 *硬件多样化、架构专业化、代理为中心优化* 的新阶段。NVIDIA的Blackwell（SM120）和AMD的MI355X已成为当前主要开发目标，推动内核级优化与解耦式服务并行发展。各项目日益分化：vLLM与SGLang聚焦大规模生产级高吞吐推理；llama.cpp强调边缘端与跨平台可移植性；Ollama注重开发者友好的本地部署体验；LiteLLM致力于多提供商路由整合；Unsloth则专注于微调与训练稳定性加速。推测解码、结构化输出及长上下文模型（如Qwen3.8-Flash-Next、GLM-5.3-Flash）的兴起，标志着向需要可靠性、可复现性与低延迟交互的智能体工作流演进。

---

### **2. 活动对比**

| 项目       | 今日开放问题数 | 今日合并PR数 | 发布状态        |
|------------|----------------|---------------|------------------|
| **vLLM**   | 12             | 5             | `v0.28.1rc1.dev580+g385dce36b`（测试中） |
| **SGLang** | 15             | 4             | 无新发布         |
| **llama.cpp** | 10          | 5             | `b11093`（已修补修复） |
| **Ollama** | 9              | 3             | 无新发布         |
| **LiteLLM** | 11            | 4             | 无新发布         |
| **Unsloth** | 14            | 3             | 无新发布         |

> ✅ *所有项目均保持稳定进展，今日无重大变更。vLLM与llama.cpp在补丁级别活动上领先。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构                | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**       | ✅   | ❌     | ⚠️（>80K时崩溃） | ✅（稳定） | ❌      | ⚠️（MTP终止） |
| **GLM-5.3-Flash-DFlash2**    | ✅   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **Ling-3.0-flash-VL**        | ❌   | ❌     | ✅（实验性） | ❌     | ❌      | ❌      |
| **Prism Ternary GGUF (PQ2_0/PTQ1_0)** | ❌   | ❌     | ❌        | ✅（追踪中） | ❌      | ❌      |
| **Qwen3-Omni-30B-A3B-Instruct** | ❌   | ❌     | ❌        | ❌     | ❌      | ✅（通过#11467） |
| **Apple Silicon (MLX + Gemma 4)** | ❌   | ⚠️（早期） | ✅（HMX优化） | ✅（提示加速） | ❌      | ⚠️（结构化输出卡死） |
| **Intel Arc B70/B60 (Vulkan/ROCm)** | ✅（bug报告） | ✅（PRs） | ✅（SYCL/Vulkan） | ⚠️（崩溃） | ❌      | ⚠️（崩溃） |

> 🏆 **胜出者**：**vLLM** 在下一代架构（AMD MI355X、DFlash2）的前沿模型支持上领先；**Unsloth** 在多模态推理与自定义模型加载方面占优。**Ollama** 在Apple Silicon与本地用户体验方面表现优异，但在高级量化与分布式系统方面滞后。

---

### **4. 性能前沿**

| 优化重点               | vLLM                          | SGLang                        | llama.cpp                     | Ollama                | LiteLLM               | Unsloth                 |
|------------------------|-------------------------------|-------------------------------|-------------------------------|-----------------------|------------------------|--------------------------|
| **KV Cache 与卸载**    | ✅ NVFP4（245K上下文），P/D   | ✅ PD移交，HiCache             | ❌                             | ❌                    | ❌                     | ❌                       |
| **推测解码**           | ✅ DFlash2，MRV2流水线        | ✅ MTP，草稿布局修复          | ❌（崩溃风险）                | ✅ (`--nodraft`提案) | ❌（流式泄漏）         | ⚠️（MTP终止）            |
| **批处理与并行**       | ✅ 序列并行                   | ✅ 流水线并行（TTFT）          | ✅ MoE LRU缓存（GPU驻留）     | ✅ MLX提示加速        | ✅ 组范围路由           | ⚠️（自动填充中断）       |
| **内核级调优**         | ✅ FlashInfer + MXFP8融合      | ✅ Triton，cuDNN注意力        | ✅ Vulkan/F32加载优化，HMX    | ✅ MLX融合内核        | ✅ 流式修复             | ⚠️（Triton LLVM错误）   |
| **量化与内存**         | ✅ MXFP8，NVFP4               | ✅ FP8 KV缓存                  | ✅ `sophia`分词器，`no-mmap-prefetch` | ✅ Prism GGUF支持     | ✅ 成本追踪             | ✅ Kbit预处理跳过        |

> 🔥 **前沿领跑者**：  
> - **vLLM** 在 **超长上下文**（245K+）与 **解耦服务** 方面占据主导地位。  
> - **SGLang** 推动 **流水线并行** 实现100万+令牌输入处理。  
> - **llama.cpp** 在 **边缘效率**（Hexagon/HMX，Vulkan，SYCL）方面领先。  
> - **Unsloth** 聚焦于 **训练鲁棒性** 与 **内存安全**。

---

### **5. 层级定位**

| 项目       | 主要层级               | 核心差异化特征                                  |
|------------|------------------------|--------------------------------------------------|
| **vLLM**   | **服务引擎**           | 高性能、可扩展推理；对ROCm/NVIDIA支持良好；专为云集群设计 |
| **SGLang** | **服务引擎 + 网关**    | 代理感知路由，PD解耦，统一缓存                   |
| **llama.cpp** | **本地运行时 / 边缘SDK** | 跨平台、轻量、与GPU/后端无关；适合移动端/边缘设备 |
| **Ollama** | **本地网关 / 开发者体验** | 开发者优先的CLI，支持MLX/Windows，集成结构化输出 |
| **LiteLLM** | **多提供商网关**       | 统一API层，成本控制，防护机制，流式安全           |
| **Unsloth** | **微调 + 训练**        | 快速训练，稳定崩溃诊断，界面透明化              |

> 🧩 *战略分化*：vLLM/SGLang面向大规模推理；llama.cpp/Ollama服务于本地/嵌入式场景；LiteLLM充当通用编排器；Unsloth是唯一专注端到端训练稳定性的项目。

---

### **6. 趋势信号与开发者指引**

#### **从今日活动提炼的行业趋势**
1. **硬件兼容性已成为竞争核心**：AMD（ROCm）与Intel（Vulkan/SYCL）不再只是备选——vLLM、SGLang与llama.cpp均已出现针对它们的活跃PR或问题。
2. **智能体工作流正驱动稳定性需求**：工具解析崩溃（Ollama）、结构化输出卡死（MLX）、推测解码退化（vLLM）等问题反复出现，表明智能体可靠性已成为核心要求。
3. **长上下文已非实验性功能**：通过NVFP4实现245K上下文（vLLM）、SGLang目标达100万+令牌TTFT、llama.cpp的MoE卸载优化，均表明此特性已进入生产可用阶段。
4. **安全与隐私不容妥协**：LiteLLM中的PII掩码泄露、Claude Code的OAuth令牌暴露、llama.cpp的配置文件泄露，凸显数据处理正面临更严格审查。
5. **模型专业化加速演进**：视觉语言模型（Ling-3.0-flash-VL）、三值GGUF（Prism）、多模态推理（Qwen3-Omni）等表明对特定高性能模型的需求正在增长。

#### **应用开发者应重点关注**
- **避免在生产环境中使用GLM-5.3-Flash与Qwen3.8-Flash-Next**，直至关键回归（词语混乱、解码饥饿）修复完成——尤其在智能体场景下。
- **高吞吐、长上下文推理规模化场景**（如企业级RAG、文档问答），优先选用vLLM或SGLang。
- **边缘/移动部署场景**，选择llama.cpp以保障性能、内存与可移植性。
- **在Apple Silicon或Windows上快速原型开发**，可选用Ollama，但需验证结构化输出稳定性。
- **多提供商编排场景**，使用LiteLLM，但需密切关注预算控制与PII掩码策略。
- **关注Unsloth在训练稳定性方面的进展**，特别是在混合GPU环境或新兴模型使用时。

> ✅ **总结**：基础设施栈正迅速成熟——但 **稳定性、可复现性与硬件多样性** 已成为关键区分点。请根据 *应用场景、硬件环境与智能体复杂度* 选择技术栈，而非仅依赖原始吞吐量。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-22**

---

### **1. 今日亮点**  
vLLM 项目持续加速对下一代硬件和先进推理模式的支持，关键进展包括 **ROCm/AMD GPU 功能对齐**、**GLM-5.3-Flash 的推测解码优化**，以及 **拆分式服务（P/D）成熟度提升**。当前重点聚焦于 **KV Offload 层的数据完整性** 和 **大上下文模型（如 Qwen3.8-Flash-Next 与 DeepSeek-V4.1）在 NVIDIA 与 AMD 平台上的性能优化**。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
未发布新版本或破坏性 API/配置变更。`v0.28.1rc1.dev580+g385dce36b` 版本仍在积极测试中，尤其关注 GLM-5.3-Flash 的稳定性。

---

### **3. 新模型与硬件支持**  
- ✅ **AMD MI355X / gfx950**：针对 `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` 的性能追踪与优化 PR 已启动（`#57149`）。  
- ✅ **ROCm + DFlash2**：首次通过推测解码实现 `incoai/GLM-5.3-Flash-DFlash2` 草稿模型的原型支持（`#56983`）。  
- ✅ **Intel Arc B70（Battlemage）**：Ubuntu 24.04 HWE 系统上报告 XPU TP=2 相关问题（`#41663`），表明已进入早期采用阶段。  
- ✅ **多模态与结构化输出**：持续推进 OpenAI 兼容 API 中多轮对话支持（`#33089`）及 DiffusionGemma 的结构化生成模式（`#57250`）。

---

### **4. 性能与优化**  
- 🔥 **SM120 NVFP4 KV 缓存**：工作原型在 RTX 5090 上使用 `--kv-cache-dtype nvfp4` 与 FlashInfer 内核实现 **24.5 万上下文长度**（`#49011`）。  
- ⚙️ **DFlash2 + DeepSeek-V4.1**：MXFP8 GEMM 与 reduce-scatter 的内核融合，在序列并行下提升吞吐量（`#57428`）。  
- 📈 **GLM-5.3-Flash**：通过查询复用降低稀疏 MLA 准备开销（`#57458`）；正在修复 CUDA Graph 下解码退化问题（`#57064`）。  
- 🧠 **推测解码**：在 MRV2 流水线中延迟采样结果接收（`#53948`），并改进 ngram_gpu 编译隔离（`#54905`），以稳定长周期推测行为。

---

### **5. 稳定性与回归问题**  
- **严重**：GLM-5.3-Flash 在多轮代理任务中出现 **重复令牌“乱码”退化现象**（`#56605`），影响线上代理系统。  
- **严重**：在 **Qwen3.8-Flash-Next** 上运行长前缀预填充负载时，2 节点 DGX Spark 出现 **3–7 分钟解码饥饿**（`#54919`）。  
- **高危**：在 ROCm 上远程预填充解码期间，**CUDA Graph 捕获** 导致 **DeepSeek-V3.2 / GLM-5.x** 输出垃圾数据（`#57064`）。  
- **中等**：**ROCm 系统缺少 `/dev/shm` 时静默失败**，因 `shutil.disk_usage()` 调用未加保护（`#57891` 修复待处理）。  
- **正在进行的修复**：涉及 `nvfp4` 集成（`#49011`）、DFlash2 草稿兼容性（`#56983`）及 `persistent_topk` 确定性（`#55122`）的 PR。

---

### **6. 对应用开发者的影响**  
- **在生产环境中谨慎使用 GLM-5.3-Flash** —— 在 `#56605` 和 `#57064` 修复前，避免长解码或多轮代理类工作流。  
- **若使用 RTX 5090，可尝试 NVFP4 与 SM120** 实现超长上下文（24.5 万+），但此功能仍属实验性质，需充分测试。  
- **若在多模态或微调模型中使用冻结权重的二级休眠模式**，请启用 `--sleep-preserve-parameter-names`（`#57891`）。  
- **在拆分式部署中监控 KV 缓存钉住状态**，利用新引入的指标（`#58004`）及时发现解码阻塞。  
- **预期 ROCm 支持存在缺口** —— 多项功能（如 DFlash2、完整模型覆盖）仍在演进中，请关注 `#57149`、`#58012` 与 `#50519` 获取更新。

> 🔗 [GitHub 问题汇总](https://github.com/vllm-project/vllm/issues) | [PR 仪表板](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 简报 – 2026-09-22**

---

### **1. 今日重点**  
SGLang 持续推进生产级推理基础设施建设，重点开展 **流水线并行**、**预填充-解码分离（PD）** 和 **代理感知的 KV 缓存** 支持。关键 PR 包括修复 Blackwell GPU 上 HiCache 分阶段写回的问题，以及增强对 GLM-5.3-Flash 的 ROCm 支持。当前 CI 系统仍在积极监控中，今日报告 3 个中断测试和 10 个不稳定测试。

---

### **2. 发布与破坏性变更**  
*无*。过去 24 小时内未发布新版本或破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **SM120（Blackwell）上的 GLM-5.3-Flash**：正在跟踪修复多 GPU TP2/W4A16 路由、FP8 KV 缓存和 MTP 支持问题。[问题 #37813](https://github.com/sgl-project/sglang/issues/37813)，[PR #39340](https://github.com/sgl-project/sglang/pull/39340)  
- **SenseNova-U1/U1.5**：已开启官方追踪问题，通过 OpenSenseNova/SenseNova-U1 集成支持。[问题 #37742](https://github.com/sgl-project/sglang/issues/37742)  
- **ROCm（AMD）**：新增 PR 实现 GLM 模型的 `aiter allreduce 融合`，并支持 DSA 页面表转换中的非 2048 顶 k 宽度。[PR #39790](https://github.com/sgl-project/sglang/pull/39790)，[PR #39340](https://github.com/sgl-project/sglang/pull/39340)  
- **Apple Silicon（MLX）**：持续推进 Gemma 4 文本生成和 MTP 伪编码解码功能支持。[问题 #32101](https://github.com/sgl-project/sglang/issues/32101)，[问题 #32264](https://github.com/sgl-project/sglang/issues/32264)

---

### **4. 性能与优化**  
- **流水线并行路线图**：高优先级任务，旨在降低长上下文输入（如 100 万 token）的 TTFT。[问题 #11857](https://github.com/sgl-project/sglang/issues/11857)  
- **预填充-解码分离（PD）**：在通过令牌重播和主机接收优化实现无缝 P-to-D 交接方面取得进展，适用于自定义传输后端。[问题 #21703](https://github.com/sgl-project/sglang/issues/21703)，[PR #40238](https://github.com/sgl-project/sglang/pull/40238)  
- **内核优化**：  
  - Triton 解码内核正在针对长上下文进行优化（当前 2K 上下文吞吐量从 147.6 → 126.4 tok/s）。[问题 #2271](https://github.com/sgl-project/sglang/issues/2271)  
  - cuDNN 注意力后端集成正在进行，以加速注意力计算。[问题 #2272](https://github.com/sgl-project/sglang/issues/2272)  
- **UnifiedRadixCache**：集成 LMCache 作为外部 KV 缓存后端；批量 radix 淘汰现在延迟处理，以降低调度器延迟。[PR #38652](https://github.com/sgl-project/sglang/pull/38652)，[PR #36370](https://github.com/sgl-project/sglang/pull/36370)

---

### **5. 稳定性与回归问题**  
- **严重缺陷**：HiCache 分阶段写回在 Blackwell GPU 上因 `cudaMemcpyBatchAsync` 中主机虚拟地址处理错误而失败。[问题 #40232](https://github.com/sgl-project/sglang/issues/40232)  
- **回归问题**：FlashInfer 后端不支持 Blackwell（SM120）GPU。[问题 #35080](https://github.com/sgl-project/sglang/issues/35080)  
- **代理感知 KV 缓存**：由于 `abort_cleanup_hook` 与 `cache_finished_req` 之间顺序未定义，导致会话泄漏。[问题 #40360](https://github.com/sgl-project/sglang/issues/40360)  
- **输出错误**：即使设置 `include_reasoning=false`，响应仍生成推理内容。[问题 #39103](https://github.com/sgl-project/sglang/issues/39103)  
- **DFLASH 草稿布局假设**：因未验证草稿布局约定，导致无声的位置偏移。[问题 #40144](https://github.com/sgl-project/sglang/issues/40144)

---

### **6. 对应用开发者的影响**  
- **长上下文应用** 应关注流水线并行进展（[#11857](https://github.com/sgl-project/sglang/issues/11857)），以提升 100 万+ token 输入下的 TTFT 表现。  
- **代理及智能工作流** 将受益于代理感知 KV 缓存的第一阶段（[#24656](https://github.com/sgl-project/sglang/issues/24656)），实现请求生命周期中的元数据流转。  
- **多 GPU 部署** 必须避免在 Blackwell GPU 上使用 FlashInfer，直到 [#35080](https://github.com/sgl-project/sglang/issues/35080) 修复。  
- **面向 Apple Silicon 开发者** 应预期 Gemma 4 与 MTP 的渐进式 MLX 支持——可通过现有 PR 进行早期测试。  
- **CI 不稳定**（3 个中断，10 个不稳定测试）可能影响部署可靠性；请在生产环境使用前验证构建结果。  

👉 *敬请期待即将到来的 PD 分离优化及基于模拟器的性能调优工具。*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 摘要 – 2026-09-22**

---

### **1. 今日亮点**  
最新更新聚焦于 Metal 与 CUDA 后端的关键修复，包括 Metal 上 Flash Attention 的掩码边界修复，以及 CUDA 针对 Volta GPU 的 tile 编译错误。新增的环境变量支持使 `LLAMA_ARG_*` 可在运行时完全控制生成参数，提升与 systemd 及容器化部署的集成能力。性能优化持续针对 SYCL 与 Vulkan，尤其优化 Intel Arc 与 AMD RDNA3 硬件。

---

### **2. 发布与破坏性变更**  
- **`b11093`**：修复 Metal 上 Flash Attention 前置遍历的掩码边界问题（`#29220`）——对使用掩码注意力的视觉语言模型至关重要。  
  🔗 [PR #29220](https://github.com/ggml-org/llama.cpp/pull/29220)  
- **`b11090`**：解决因 `load_ldmatrix` tile 形状不匹配导致的 CUDA sm_70 tile 编译错误（`#29224`）。  
  🔗 [PR #29224](https://github.com/ggml-org/llama.cpp/pull/29224)  
- **`b11078`**：新增 `LLAMA_ARG_*` 环境变量以配置 `--temp`、`--top-p`、`--min-p` 及惩罚项——支持通过 `EnvironmentFile` 实现声明式服务器控制。  
  🔗 [PR #27380](https://github.com/ggml-org/llama.cpp/pull/27380)  
- **`b11077`**：修复路由模式下 API 密钥文件泄露问题，通过在子进程中清除 `LLAMA_ARG_API_KEY_FILE`（`#28938`）。  
  🔗 [PR #28938](https://github.com/ggml-org/llama.cpp/pull/28938)

> ✅ *无破坏性 API 变更；均为向后兼容的修复与增强。*

---

### **3. 新模型与硬件支持**  
- **模型支持**：新增对 **Ling-3.0-flash-VL**（总计 124B / 激活 MoE 5.1B）的实验性支持，这是一种混合 KDA + 门控 MLA 视觉语言模型（`#29151`）。  
  🔗 [PR #29151](https://github.com/ggml-org/llama.cpp/pull/29151)  
- **硬件后端**：  
  - **SYCL**：增强图记录/回放支持（`#28725`）及针对 Intel Arc B70 的性能调优（`#29107`）。  
  - **Vulkan**：优化对齐至 2 元素时的 F32 A 矩阵加载（`#29254`）。  
  - **Hexagon**：新增 HMX 优化的 `GATED_DELTA_NET` 内核，在 Galaxy S26/S25/S24 设备上将提示处理速度提升最高达 **3 倍**（`#29199`）。  
  🔗 [PR #29199](https://github.com/ggml-org/llama.cpp/pull/29199)  
- **量化**：为 GGUF 模型（如 `Arain119/sophia`）新增 `sophia` 预分词器类型（无需正则分割）（`#29211`）。  
  🔗 [PR #29211](https://github.com/ggml-org/llama.cpp/pull/29211)

---

### **4. 性能与优化**  
- **SYCL**：合并 MKL-FA softmax 加载以避免每行一个工作项，减少多 GPU 配置下的开销（`#28918`）。  
  🔗 [PR #28918](https://github.com/ggml-org/llama.cpp/pull/28918)  
- **Vulkan**：F32 矩阵加载优化降低 Intel GPU 的内存带宽压力（`#29254`）。  
- **CPU/GPU 异步卸载**：PR `#27861` 引入针对已卸载至 CPU 的 MoE 专家权重的 GPU 本地 LRU 缓存，旨在缓解大型 MoE 模型中的解码吞吐瓶颈。  
  🔗 [PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)  
- **内存效率**：新增 `--no-mmap-prefetch` 标志，跳过 Linux 上的 `MADV_WILLNEED`，防止 >100GB 模型加载期间阻塞 I/O（`#29250`）。  
  🔗 [PR #29250](https://github.com/ggml-org/llama.cpp/pull/29250)

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - **Vulkan + Qwen3.8-DFlash/MTP**：在 gfx1150 上因超出范围的 token ID = `n_vocab`（248320）导致崩溃（`#28158`）。  
    🔗 [Issue #28158](https://github.com/ggml-org/llama.cpp/issues/28158)  
  - **Intel Arc Pro B50/A770 + SYCL**：报告多 GPU 崩溃（`#27888`）。  
    🔗 [Issue #27888](https://github.com/ggml-org/llama.cpp/issues/27888)  
  - **GPU 固件崩溃**：Imagination PowerVR C 系列（Pixel 11 Pro）在提示处理期间崩溃（`#28214`）。  
    🔗 [Issue #28214](https://github.com/ggml-org/llama.cpp/issues/28214)  
- **回归报告**：  
  - Vulkan/RDNA3 平台在 `b10780` 后出现严重提示速度下降（`#28752`）。  
    🔗 [Issue #28752](https://github.com/ggml-org/llama.cpp/issues/28752)  
  - Qwen3.8-27B 在上下文 >80K 时解码吞吐量下降约 **25 倍**（`#27623`）。  
    🔗 [Issue #27623](https://github.com/ggml-org/llama.cpp/issues/27623)  
- **正在修复中**：  
  - `#28725`（SYCL 图回放）与 `#29107`（IQ3 代码重排）旨在稳定 Intel Arc 性能。  
  - `#27861`（MoE LRU 缓存）解决主机卸载专家场景下的解码延迟问题。

---

### **6. 对应用开发者的意义**  
- 使用 `LLAMA_ARG_*` 环境变量可在生产服务器（如 systemd 服务）中完全控制推理参数，实现无需重新配置 CLI 即可动态调优。  
- 若使用 **多 GPU 或高上下文推理**，请密切关注 `b11078+` 版本——新发布的 Vulkan/CUDA 修复可能解决 Qwen3.8 与 DFlash/MTP 的稳定性问题。  
- 若在 **移动端或边缘设备（骁龙、Hexagon）** 部署，请优先使用 `b11076+` 构建版本：经 HMX 优化的 `GATED_DELTA_NET` 可带来 **最高 3 倍的提示处理加速**。  
- 对于大模型（>50GB），使用 `--no-mmap-prefetch` 避免 `mmap` 预取，防止启动卡顿。  
- 若开发 **视觉语言应用**，请测试 Ling-3.0-flash-VL 支持（`#29151`），并注意 Qwen3 系列已知的图像合并缺陷（`#24303`）。  

> 📌 **实用建议**：使用 `b11093` 或更高版本以获得稳定的 Metal/视觉语言流水线。若使用 Qwen3.8 进行推测解码，请关注 `#28158` 与 `#27623`。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-22**

---

### **1. 今日亮点**  
Ollama 生态系统持续成熟，重点在模型兼容性、结构化输出可靠性以及后端稳定性方面取得进展——尤其在 MLX 和 Windows 平台上。关键更新包括修复 Qwen3-Coder 工具解析中的持续崩溃问题和基于 MLX 的结构化输出终止问题，同时正在积极推进 Prism 三元 GGUF 支持及推测解码控制功能。

---

### **2. 发布与破坏性变更**  
过去 24 小时内未报告任何发布或破坏性变更。未推出新版本或破坏性 API/配置更改。

---

### **3. 新模型与硬件支持**  
- ✅ **Prism 三元 GGUF（PQ2_0/PTQ1_0）**：通过 [Issue #18521](https://github.com/ollama/ollama/issues/18521) 和 [PR #18573](https://github.com/ollama/ollama/pull/18573) 跟踪支持进展，目标是正确解析不支持的张量类型，而非以误导性的“大小溢出”错误失败。
- 🖥️ **MLX 引擎**：针对 Apple Silicon（M5 Max）持续优化，已在 Qwen 3.8 的提示处理中观察到性能提升 ([PR #18550](https://github.com/ollama/ollama/pull/18550))。
- 💻 **Windows**：正在修复 `ollama create` 中 `FROM` 通配符处理问题 ([PR #18572](https://github.com/ollama/ollama/pull/18572)) 以及 gemma4 在 Windows 上的图像处理问题 ([Issue #16532](https://github.com/ollama/ollama/issues/16532))。

---

### **4. 性能与优化**  
- 🔥 **Qwen 3.8 提示加速（MLX）**：PR #18550 引入了使用 MLX 的 gated-delta 与 SwiGLU 融合的内核优化，在 M5 Max 上 2k–8k token 范围内实现 **提示 TPS 提升 18.7%–19.1%**。
- ⚙️ **推测解码控制**：提议添加 `--nodraft` 标志 ([Issue #18517](https://github.com/ollama/ollama/issues/18517))，允许开发者在调试和可复现性场景下禁用推测解码。
- 📊 **基准测试改进**：PR #17480 将合成提示替换为真实世界 HumanEval 代码提示，使基准测试更准确反映草稿模型的行为。

---

### **5. 稳定性与回归问题**  
**严重问题（高危）：**  
- ❌ **MLX 结构化输出卡死**：在 MLX 引擎上，模型在部分输出 JSON 后会无限生成空格字符 ([Issue #18567](https://github.com/ollama/ollama/issues/18567))，已由 [PR #18569](https://github.com/ollama/ollama/pull/18569) 修复。
- ❌ **Qwen3-Coder 工具调用解析崩溃**：格式错误的工具调用被返回为错误给客户端，导致代理工作流中断 ([Issue #18563](https://github.com/ollama/ollama/issues/18563))，已由 [PR #18571](https://github.com/ollama/ollama/pull/18571) 解决。
- ❌ **AMD GPU 混合架构崩溃**：由于 ROCm 内核不匹配，MoE 模型在 gfx1200 + gfx1201 混合显卡上崩溃 ([Issue #18162](https://github.com/ollama/ollama/issues/18162)) —— 目前尚未修复。

**其他显著缺陷：**  
- 🛑 **AMD RX 6800 XT 上 Vulkan 崩溃**：通过 Vulkan 后端加载任意模型时出现访问违规（`0xc0000005`）([Issue #18557](https://github.com/ollama/ollama/issues/18557))。
- 🛑 **Windows 图像处理失败**：尽管输入格式正确，`gemma4` 仍无法处理图像 ([Issue #16532](https://github.com/ollama/ollama/issues/16532))。

---

### **6. 对应用开发者的启示**  
- **代理工作流**：使用 `qwen3coder` 或其他依赖工具的模型时需谨慎——格式错误的工具调用可能被直接抛出错误，而非优雅处理。建议使用包含 PR #18571 修复的最新构建版本。
- **结构化输出**：若在 MLX 后端使用 `format: json_schema`，可能存在无限生成风险，除非已应用 #18569 补丁。若稳定性至关重要，可临时禁用结构化输出。
- **跨平台部署**：避免在 MoE 模型中混合使用 AMD GPU 架构（gfx1200/gfx1201）；建议在单显卡环境下测试。Windows 用户应暂避 Vulkan 后端，直至 #18557 修复。
- **模型导出/导入**：新命令 `ollama export/import` ([PR #18578](https://github.com/ollama/ollama/pull/18578)) 支持离线模型传输，适用于隔离环境。
- **性能调试**：如可用，使用 `--nodraft` 可隔离推测解码影响，确保输出确定性。

> *建议：生产级代理系统应密切关注 PR #18550、#18569 与 #18571，以快速获取稳定性修复。*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM Digest — 2026-09-22**

#### **1. 今日亮点**  
LiteLLM 持续扩展多提供商路由与防护功能，针对流式传输行为、预算控制和敏感信息（PII）屏蔽进行了关键修复——尤其在 Claude Code 与 Databricks 集成中表现突出。主要改进包括：增强 UI 中的配置保护控制、Presidio 输出屏蔽现已应用于流式 `/v1/messages` 接口，以及对 OpenRouter 与 Nebius 的成本追踪能力进一步优化。

#### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
但重要配置变更正在进行中：  
- **`config.yaml` 所管理的设置现在在 UI 中变为只读** ([PR #42374](https://github.com/BerriAI/litellm/pull/42374)) — 防止重启后意外丢失配置。  
- **引入可选匿名使用遥测功能**，通过 `LITELLM_TELEMETRY=true` 启用 ([PR #42373](https://github.com/BerriAI/litellm/pull/42373)) — 在不侵犯隐私的前提下提升对开源部署模式的可见性。

#### **3. 新模型与硬件支持**  
- 新增对 **Fal AI 的 `flux-lora-depth` 图像编辑** 和 **`moondream3-preview/query` 视觉问答模型** 的支持 ([PR #42334](https://github.com/BerriAI/litellm/pull/42334))。  
- **OpenRouter**：新增 `typesafe/jev-1.13` 的定价，并为 `/decisions` 端点添加透传路由 ([PR #42301](https://github.com/BerriAI/litellm/pull/42301))。  
- **Meta Model API** 已出现在 UI 仪表盘下拉菜单中 ([Issue #36164](https://github.com/BerriAI/litellm/issues/36164)，已在 PR 中修复)。

#### **4. 性能与优化**  
- **成本追踪优化**：更新 OpenRouter 模型定价（`glm-latest` 输入/输出成本降低约 7%），并修正了 **Nebius 提供商的成本计算错误**，此前存在数量级偏差 ([PR #42381](https://github.com/BerriAI/litellm/pull/42381), [Issue #41782](https://github.com/BerriAI/litellm/issues/41782))。  
- **路由优化**：引入 **分组作用域优先级路由策略** ([PR #42378](https://github.com/BerriAI/litellm/pull/42378))，实现按分组设定模型优先级，不影响全局回退逻辑。  
- **流式性能**：修复中途回退时流式数据中断的问题 ([Issue #28216](https://github.com/BerriAI/litellm/issues/28216))，并优化 `Router.aresponses` 中的响应处理。

#### **5. 稳定性与回归问题**  
**今日报告的关键问题（按严重性排序）：**  
1. **使用第三方 `api_base` 时，Claude Code OAuth token 泄露**：客户端订阅令牌被错误地转发，而非配置的 `api_key` ([Issue #42172](https://github.com/BerriAI/litellm/issues/42172))。  
2. **Presidio PII 屏蔽未能作用于流式 `/v1/messages`**，导致实时输出暴露敏感数据 ([Issue #42170](https://github.com/BerriAI/litellm/issues/42170), [PR #42351](https://github.com/BerriAI/litellm/pull/42351))。  
3. **Databricks 非 GPT 模型在设置 `reasoning.summary` 时因格式错误的推理负载失败**（`reasoning_effort 必须为字符串`）([Issue #42347](https://github.com/BerriAI/litellm/issues/42347))。  
4. **Responses→Chat 桥接在多轮重播时丢失原生工具调用**，将内部模型推理内容泄露为助手文本 ([Issue #42005](https://github.com/BerriAI/litellm/issues/42005))。  
5. **零成本预算绕过机制允许无限制支出**，若免费模型配置了付费回退路径则可能超出预期成本 ([Issue #41344](https://github.com/BerriAI/litellm/issues/41344))。

#### **6. 对应用开发者的影响**  
- **避免在启用回退的模型中使用 `zero_cost_budget_bypass`** — 实际成本可能远超预期。建议使用显式回退链或密切监控支出。  
- **启用 `output_parse_pii: true` 时需谨慎**：确保 Presidio 配置正确，尤其是在流式工作流中——近期修复 ([PR #42351](https://github.com/BerriAI/litellm/pull/42351)) 已保证即使在实时流中也能正确屏蔽敏感信息。  
- **谨慎使用 `request_timeout`**：若上游从未发送首个字节，则该超时不会触发 ([Issue #38358](https://github.com/BerriAI/litellm/issues/38358))；建议增加 TCP 层超时或健康检查机制。  
- **企业用户可利用新功能**：**支持按用户粒度导出团队用量数据** ([PR #42367](https://github.com/BerriAI/litellm/pull/42367))，便于通过共享密钥追踪每位用户的实际消耗。  
- **注意成本差异**：请双重核对 Nebius 与 OpenRouter 模型的账单——近期已推送价格更新，可能影响现有部署。

> 🔗 *上述所有问题与 PR 均正在积极处理中。开发者应升级至最新版 `litellm` 以获取稳定性与安全性修复。*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-22**

---

### **1. 今日亮点**  
Unsloth 项目持续快速演进，重点聚焦于提升 UI 易用性、跨多种硬件（尤其是 AMD ROCm 与 Intel Vulkan）的稳定性，以及对 Qwen3-Omni 等新兴模型类型更深入的支持。关键修复已合并至 Studio，显著提升了错误可见性（如 #8804、#11460），并解决了因缺少图像处理器或配置类导致的模型加载失败问题（#11469、#11467）。值得注意的是，团队正积极强化训练崩溃与运行时故障的诊断能力。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未发布新版本。*  
但多个 PR 表明即将引入破坏性变更：  
- **#11468**：禁用不接受 `packed_seq_lengths` 或 `**kwargs` 的模型的自动无填充批处理功能 —— 避免因配置错误在推理时引发 `TypeError`。[PR #11468](https://github.com/unslothai/unsloth/pull/11468)  
- **#11469**：恢复 transformers 4.x 的图像处理重新导出，以支持依赖旧版导入的模型（如 `microsoft/Phi-4-reasoning-vision-15B`）。[PR #11469](https://github.com/unslothai/unsloth/pull/11469)  

开发者在升级时应审查涉及动态参数处理和远程代码执行的代码路径。

---

### **3. 新模型与硬件支持**  
- **Qwen3-Omni-30B-A3B-Instruct**：通过 #11467 实现支持，解决 `ValueError: Unrecognized configuration class` 问题，现已可使用带有 Omni 检查点的多模态推理模型。[PR #11467](https://github.com/unslothai/unsloth/pull/11467)  
- **Intel Arc B60 Vulkan**：Issue #11453 报告，在双 Intel Arc Pro B60 GPU 上使用 Vulkan 后端生成过程中出现 `ErrorDeviceLost` —— 暗示当前 Vulkan 驱动集成存在不稳定性。[Issue #11453](https://github.com/unslothai/unsloth/issues/11453)  
- **AMD Strix Halo + ROCm 7.13.99004**：在预构建的 `b10079` 上报告性能下降，疑似存在内核或内存布局问题。[Issue #7371](https://github.com/unslothai/unsloth/issues/7371)

---

### **4. 性能与优化**  
- **CUDA 13.4 vs 官方 GGML CUDA 12**：在 RTX 5070 Ti（sm_120）上，内置的 Unsloth `b11030-mix` 构建版本比官方 ggml-org CUDA 12 版本慢约 5–6 倍。原因可能是内核编译或调优不佳。[Issue #11349](https://github.com/unslothai/unsloth/issues/11349)  
- **ROCm 上的 Triton LLVM 错误**：训练中崩溃，提示 `LLVM ERROR: Cannot select: intrinsic %llvm.amdgcn.fdot2.bf16.bf16` —— 表明 Triton 后端存在内核选择或 IR 生成问题。[Issue #11465](https://github.com/unslothai/unsloth/issues/11465)  
- **优化工作**：#11494 在 TRL 中跳过冗余的 kbit 准备步骤，减少不必要的内存压力（大型模型可避免约 5 GiB 内存占用）。[PR #11494](https://github.com/unslothai/unsloth/pull/11494)

---

### **5. 稳定性与回归问题**  
按严重性排序的顶级回归问题：  
1. **Qwen3.8-Flash-Next** (`b10995-mix`) 上的 MTP 中断 —— 由于重基后 `hc_head_norm` 不一致所致。已在 #11143 中报告。[Issue #11143](https://github.com/unslothai/unsloth/issues/11143)  
2. **T4 Kaggle（qwen 3.5 0.8b bf16 训练）上的崩溃**：怀疑为内存损坏或 GPU 内核失败；暂无修复方案。[Issue #7506](https://github.com/unslothai/unsloth/issues/7506)  
3. **Vulkan MTP 崩溃**：在 RTX 5080 上图构建阶段触发 `GGML_ASSERT(ggml_can_repeat(b, a))`。[Issue #11219](https://github.com/unslothai/unsloth/issues/11219)  
4. **Gemma 4 26B A4B QAT 在 16GB 系统上 >15GB 内存占用** —— 可能由量化或缓存效率低下引起。[Issue #11435](https://github.com/unslothai/unsloth/issues/11435)

> ✅ **正在修复中**：多个 PR 正在改进错误报告（#8804、#11460）并稳定加载路径。

---

### **6. 对应用开发者的启示**  
- **预期更严格的模型兼容性验证**：未来版本将拒绝不支持的配置（例如无填充模型但未正确处理参数）。加载自定义模型时请显式使用 `trust_remote_code=True`。  
- **UI 改进至关重要**：诸如每 GPU 层可视化（#11475）、API 密钥可复制（#11387）、完整提示日志记录（#11282）等功能，表明项目正向开发者透明度与调试便利性转变。  
- **在 #11468 上线前避免依赖自动无填充批处理** —— 该功能可能破坏未针对打包序列设计的模型。  
- **密切关注 AMD/ROCm 与 Intel Vulkan 的不稳定性**，尤其是在生产环境中。建议锁定稳定版 ROCm 6.4+，或暂时避免使用 Vulkan。  
- **善用新工具结果限制功能**（#11430）：将工具输出限制在 256 KB 以内，可防止上下文溢出，提升代理工作流的可靠性。

> 🔗 *获取实时更新，请关注 [Unsloth GitHub 仓库](https://github.com/unslothai/unsloth)。*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*