# AI 基础设施日报 2026-10-30

> 生成时间: 2026-10-30 02:07 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-30**

---

### **1. 生态概览**  
AI推理与服务生态正迅速成熟为一个多层级、硬件多样化的格局。**vLLM**、**SGLang** 和 **Unsloth** 等领先项目正在推动高吞吐推理的性能边界，而 **llama.cpp** 则在CPU/边缘场景下保持效率优势。**Ollama** 与 **LiteLLM** 作为关键抽象层，实现了跨异构后端的原生代理工作流和OpenAI兼容性。多模态支持、推测解码与跨平台量化技术的融合，标志着向统一、可扩展部署的转变，尤其适用于代理、语音AI及低延迟服务等真实应用场景。

---

### **2. 活跃度对比**

| 项目       | 问题（开放） | PR（近期） | 发布状态                |
|------------|--------------|------------|--------------------------|
| **vLLM**   | 48           | 15         | v0.33.0 待发布（无破坏性变更） |
| **SGLang** | 67           | 12         | 无新版本；报告CI不稳定 |
| **llama.cpp** | 93        | 18         | `b11998` 最新构建；无破坏性API变更 |
| **Ollama** | 81           | 9          | 无新版本；MLX/audio路径存在稳定性问题 |
| **LiteLLM** | 34          | 14         | v1.108.0-rc.1 已发布，含签名镜像 |
| **Unsloth** | 72         | 11         | 无发布；已合并配置破坏型PR |

> ✅ *vLLM 和 llama.cpp 在开发活跃度上领先；LiteLLM 凭借安全、生产就绪的RC版本脱颖而出。*

---

### **3. 模型支持竞赛**

| 新模型 / 架构             | vLLM                  | SGLang     | llama.cpp               | Ollama              | LiteLLM            | Unsloth      |
|----------------------------|------------------------|------------|--------------------------|----------------------|---------------------|---------------|
| **Qwen3-VL / Qwen3.5+MoE** | ✅ 全功能ViT CUDA图（问题 #38175） | ❌         | ✅（通过GGUF）           | ✅                   | ✅                  | ❌            |
| **Kimi K2.5 / K3**         | ✅（问题 #38175）       | ❌         | ❌                       | ❌                   | ❌                  | ✅（已请求）    |
| **LFM3-Omni / LFM3-VL**    | ❌                     | ✅（PR #47281） | ✅（`b11998`）         | ✅（`--audio`，问题 #19396） | ✅（`zai/*`）       | ✅（已请求）    |
| **DeepSeek-V4.1-Flash**    | ✅ ROCm/AMD优化         | ✅（调度器崩溃） | ✅                      | ✅（ROCm iGPU泄漏）   | ❌                  | ❌            |
| **Gemma 4 MTP**            | ✅（推测解码修复）       | ❌         | ❌                       | ❌                   | ❌                  | ❌            |
| **ExLlamaV3 (EXL3)**       | ❌                     | ❌         | ❌                       | ❌                   | ❌                  | ✅（实验性）    |

> 🏆 **领先者：vLLM** – 在多模态视觉模型集成与GPU级优化方面处于领先地位。  
> 🥈 **亚军：SGLang & llama.cpp** – 在特定硬件（AMD、Hexagon）上表现强劲，但面临稳定性风险。  
> 🥉 **新锐力量：Ollama & LiteLLM** – 在音视频处理与供应商无关性方面加速发展。

---

### **4. 性能前沿**

| 优化重点                 | vLLM                     | SGLang                   | llama.cpp               | Ollama                  | LiteLLM                 | Unsloth                 |
|--------------------------|--------------------------|--------------------------|--------------------------|--------------------------|--------------------------|--------------------------|
| **KV Cache 与卸载**       | ✅ DiffKV分块、分层卸载修复 | ✅ 动态EPLB、DSA稀疏注意力 | ✅ 分块flash注意力（q8_0） | ✅ 内存计数修复           | ✅ Redis可扩展性重构       | ✅ 上下文压缩（进行中）   |
| **批处理与并行**          | ✅ 批次分片采样           | ✅ MoE调度、调度器指标     | ✅ CPU分块批处理         | ✅ 并发生成               | ✅ 最少繁忙路由           | ✅ 多模型驻留             |
| **量化**                  | ✅ PDL门控、MXFP8 GEMM    | ✅ FP8 MoE、IQ2（OpenCL） | ✅ IQ2_s、MXFP4、Q4_0    | ✅ 三值提案（bonsai-2）   | ✅ 成本追踪（美元/单位）   | ✅ 融合4比特解码（NF4）   |
| **内核与硬件**            | ✅ SM80/SM90 diffKV、ROCm/FlyDSL | ✅ AOTriton、gfx1151扩散 | ✅ Metal MXFP4、SYCL向量化 | ✅ MLX top-k分块排序     | ✅ 流式Pydantic修复       | ✅ Apple Silicon VRAM估算器 |
| **分布式服务**            | ✅ Mooncake P/D解耦       | ✅ 可插拔传输             | ❌                       | ❌                       | ✅ 通配符健康检查         | ❌                       |

> 🔍 **主要趋势**：  
> - **vLLM** 在内核级优化（注意力、KV缓存）方面占据主导。  
> - **SGLang** 在高级MoE与扩散管道调优方面领先。  
> - **Unsloth** 在Apple Silicon上的融合解码与内存感知推理方面表现卓越。  
> - **LiteLLM** 专注于运营可靠性（成本追踪、Redis韧性）。

---

### **5. 层级定位**

| 项目       | 主要层级             | 核心差异化特征                                  |
|------------|----------------------|-------------------------------------------------|
| **vLLM**   | 高性能服务引擎       | 以GPU为中心，聚焦CUDA/ROCm，大规模吞吐优化     |
| **SGLang** | 高级推理引擎         | 对调度、MoE、推测解码拥有精细控制；面向复杂代理逻辑 |
| **llama.cpp** | 本地运行时 / 边缘推理 | 背靠CPU/GPU异构性，适合移动、嵌入式与离线场景   |
| **Ollama** | 原生代理网关         | 无缝工具调用、多模态输入输出、兼容OpenAI API     |
| **LiteLLM** | 统一网关与编排器     | 供应商无关路由、成本追踪、安全加固              |
| **Unsloth** | 开发者导向运行时 + 工作室 | 可视化工作流构建器（Flows）、MLX优先体验、上下文管理 |

> 📊 **定位洞察**：  
> - **vLLM/SGLang**：面向高性能集群的底层基础设施。  
> - **llama.cpp/Ollama**：面向边缘到云端的中间层，兼顾便携性。  
> - **LiteLLM/Unsloth**：面向应用开发者构建代理与微调系统的顶层。

---

### **6. 趋势信号**

#### **从当前活动提取的关键行业趋势**：
1. **多模态集成已成为主流**  
   → 所有主要项目均支持视觉（Qwen3-VL、Kimi-K3、LFM3-VL），其中 **vLLM** 在ViT CUDA图优化方面领先。

2. **硬件多样化加速推进**  
   → AMD ROCm（gfx1151/gfx1201）、Intel XPU/Mooncake、Apple Silicon、Hexagon 已不再是实验性平台——**SGLang** 与 **llama.cpp** 在早期采用上处于领先地位。

3. **代理工作流亟需原生工具支持**  
   → Ollama中的`tool_calls`静默丢失、LiteLLM的流式损坏、Unsloth的上下文溢出等问题，凸显对健壮代理原语的迫切需求。

4. **安全与可观测性不容妥协**  
   → **LiteLLM** 通过cosign实现签名Docker镜像，树立新标准。成本追踪精度与Redis可靠性已成为生产网关信任的核心。

5. **量化正超越比特层面**  
   → **IQ2**、**MXFP4**、**三值**、**EXL3** 等格式表明，量化正迈向精度感知、硬件优化的方向，而非单纯降低比特数。

#### **应用开发者应关注的重点**：
- ⚠️ **避免使用 `qwen3.8:27b-mlx`**，直到Ollama修复`tool_calls`处理问题。
- 🔄 **尽早测试 nightly 构建版**（来自vLLM、SGLang、Unsloth）——许多优化尚在预发布阶段。
- 🔐 **升级至 LiteLLM v1.108.0-rc.1+**，防止静默的$0花费日志记录。
- 🎯 **利用 Flows（Unsloth）与扩散管道（SGLang）**，打造下一代代理训练与多模态推理能力。
- 🛠 **准备混合部署**：使用 `--enable-batch-sharded-sampling`（vLLM）与 `UNSLOTH_DECODE_FUSED_NF4=1` 实现峰值效率。

---

> ✅ **最终结论**：AI基础设施栈已不再单一。未来属于**专业化、可互操作的分层架构**——其中 **vLLM** 驱动引擎，**SGLang** 协调复杂性，**LiteLLM** 管理成本，而 **Unsloth/Ollama** 推动代理创新的快速落地。请根据延迟、硬件与开发者体验需求，选择合适的层级。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-30**

---

### **1. 今日亮点**  
vLLM 项目持续深化对多模态与高性能推理的支持，重点推进 ViT CUDA Graph 优化（问题 #38175）以及 AMD ROCm 平台的性能提升（PR #63910, #60169）。关键稳定性修复解决了优先级调度缺陷（#59907, PR #59963）和推测解码一致性问题，同时新提交的 PR 扩展了跨平台兼容性——尤其针对 Intel XPU 与 Mooncake P/D 分离架构。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
未观察到新版本发布或破坏性 API/配置变更。用户应继续关注 `vllm-project/vllm`，预计即将推出的 v0.33.0 版本将包含多项正在进行的优化。

---

### **3. 新模型与硬件支持**  
- **多模态视觉模型**：正在积极开发 Qwen3-VL、Qwen3.5、GLM-V 与 Kimi K2.5 中 ViT 的完整 CUDA Graph 支持（问题 #38175）。  
- **ROCm 优化**：通过 FlyDSL MXFP8 GEMM，在 DeepSeek-V4.1（gfx950 / MI355X）上实现显著性能提升（PR #60169），并改进 GLM-5.3-Flash 的 kpool 处理（PR #63910）。  
- **Intel XPU 集成**：修复 Intel XPU 上 MooncakeStoreConnector 的问题（PR #62546），使非 CUDA 硬件也能支持 P/D 分离架构。  
- **Model Runner V2**：扩展对 CPU 后端的支持（PR #61995）及批处理分片采样功能（PR #61025），提升异构集群中的可扩展性。

---

### **4. 性能与优化**  
- **注意力与 KV 缓存**：  
  - 在 SM80 上使用 `BLOCK_M=128 + KV tile 64` 时，DiffKV 预填充分块实现 **3.0× 加速**，适用于 200K 上下文切片（问题 #61095）。  
  - Triton 元数据构建器现在从 `kv_cache_spec` 获取几何信息，避免在 Gemma 4 等异构模型中选择次优内核（PR #56996）。  
- **量化与内核**：  
  - 为 `silu_and_mul_nvfp4_quant` 内核新增基于大小的 PDL 门控（PR #64494），提升 sm90+ 架构上的 GPU 利用率。  
  - 基于 AITER 的 `biased_grouped_topk` 针对无专家剔除场景进行优化（PR #63076），减少不必要的 LDS 使用。  
- **分离与卸载**：  
  - 优化 `MooncakeConnector` 对可插拔传输协议的支持（问题 #60523），提升 RDMA/TCP/Ascend 路径下的 P/D 传输效率。

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - `Qwen3.8-27B (GDN 混合)` 在 sm_86 上因前缀缓存导致非法内存访问（Xid 31）而崩溃——自 v0.28.0 起出现回归（问题 #63505）。  
  - `Gemma4 MTP` 推测解码在引擎初始化阶段失败，报错“a and b must have same reduction dim”（问题 #48848）。  
- **正确性缺陷**：  
  - 优先级调度可能导致同一步骤中已调度请求被取消（问题 #59907）；已由 PR #59963 修复。  
  - Kimi-K3 前缀缓存在恰好 1536 token 边界处丢失（问题 #50235）。  
- **内存与卸载问题**：  
  - 分层 KV 卸载会触发所有等待请求，耗尽 DRAM（问题 #49902）。  
  - P2P KV 卸载在对端故障时未能快速失败（问题 #63602）。

---

### **6. 对应用开发者的意义**  
- **生产部署**：在修复合并前，请避免在 sm_86 上使用 `Qwen3.8-27B`；若稳定性至关重要，可回退至 v0.28.0。  
- **多模态应用**：请关注问题 #38175 中关于 ViT CUDA Graph 支持的进展——预计将显著提升视觉语言模型的吞吐量。  
- **低延迟代理**：使用 `--dp-prefill-delayer`（PR #61834）以减少代理流量下的解码中断。  
- **多 GPU/集群环境**：启用 `--enable-batch-sharded-sampling`，并确保设置 `VLLM_SLEEP_RETAIN_CPU_BACKUP=1`（PR #64630），以在休眠模式下保持内存效率。  
- **面向 AMD/Intel 开发者**：近期版本将增强 ROCm 与 XPU 支持——建议尽早使用夜间构建版本进行测试。

> 🔗 [GitHub vLLM Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang Digest – 2026-10-30**

---

### **1. 今日亮点**  
SGLang 生态系统持续深化对高级推理模式的支持，关键进展包括 **T-Head PPU**、**AMD ROCm gfx1151/gfx1201** 以及 **Ascend NPU** 的集成。高优先级问题凸显了 **CI 稳定性**（问题 #42752）和 **推测解码正确性**（如 DeepSeek-V4 调度器在问题 #47218 中崩溃）方面的持续挑战，而新提交的 PR 主要聚焦于优化 **扩散管道**、**MoE 分发** 和 **KV 缓存编排**。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告新版本发布或破坏性变更。*

---

### **3. 新模型与硬件支持**  
- **T-Head SAIL (Zhenwu 810/810E/M890P)**：路线图已启动（问题 #37519）——上游原生支持作为高优先级功能正在跟踪。  
- **AMD ROCm**：新增针对 **gfx1151**（问题 #46515、#46065）和 **gfx1100/gfx1201（RDNA3/RDNA4）**（问题 #46900）的 PR。为长序列扩散注意力添加 AOTriton 内核优化。  
- **Ascend NPU**：在 **动态专家负载均衡（EPLB）**（#47266）、**DSA 稀疏注意力中的混合块支持**（#47367）以及 **FP8 MoE 分发**（#43994）方面取得进展。  
- **模型新增**：原生支持 `sensenova_loop` 的多模态（PR #47281），通过共享权重层和 mHC 实现文本、图像和视频推理。

---

### **4. 性能与优化**  
- **扩散推理**：在 AMD gfx1151 上，新的 Triton 密集注意力路径将吞吐量从 **2.06 TF（非连续）** 提升至 **18 TF**（16k token 时，PR #46515）。  
- **内存效率**：PR #47260 通过仅发送一次每请求解码输入而非重复发送，降低了解码阶段开销。  
- **MoE 与内核优化**：  
  - FP8 MoE 支持已在 XPU 上启用（PR #43994）。  
  - Ascend 上将注意力值缩放合并至 `o_proj` 权重中（PR #40890），每层解码延迟降低约 2ms。  
- **调度器效率**：新增 `scheduler_iterations_total` 指标用于监控（PR #46485）。

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - 当并发中止流导致 `items_offset_list` 变为 `None` 时，DeepSeek-V4 调度器会崩溃（问题 #47218）。*尚未提交修复 PR。*  
  - GLM-5.3-Flash 在 SM120 无法使用 FA4 注意力后端，因 CUDA 图捕获失败；仅 Triton 可用（问题 #42012）。  
- **正确性缺陷**：  
  - Llama KV 缩放加载器将浮点数赋给张量缩放但未更新主机镜像，破坏注意力路径（问题 #47357）。*修复待处理。*  
  - 重复重新预填充会重置采样惩罚和 `min_new_tokens`，无声地改变输出（问题 #47245）。  
- **CI/构建问题**：PR 测试工作流中仍存在不稳定的测试和基础设施故障（问题 #42752），影响开发速度。

---

### **6. 对应用开发者意味着什么**  
开发者应预期 **日益增强的多后端支持**，尤其在 AMD 与 Ascend 硬件上，可实现跨多样化基础设施部署。然而，在使用 DeepSeek-V4 或 GLM-5.3-Flash 模型进行推测解码时需格外谨慎——两者均存在已知崩溃问题。对于生产负载，建议禁用 `fa4` 后端，直至问题 #42012 解决。**会话感知的 KV 缓存编排**（RFC #45189）和 **每步 TBO 诊断**（RFC #47289）的引入将赋予开发者更强的代理内存与调度行为控制能力。若参与贡献或依赖夜间构建，请关注 CI 健康状况（问题 #42752）。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 消息简报 – 2026-10-30**

---

### **1. 今日重点**  
最新开发周期聚焦于扩展硬件与模型支持，特别是 Apple Silicon（Metal）、Intel Arc（SYCL/XMX）以及 Hexagon（UPSCALE）。关键进展包括在 OpenCL 上实现 IQ2 量化格式的初步支持、Metal 的 MXFP4 内核性能优化，以及 LFM3 JSON 模式解析和 MoE 路由的关键错误修复。一项重大合并请求（PR）实现了基于 CPU 的分块闪存注意力（tiled flash attention）对 `q8_0` KV 缓存的支持，显著提升了无 GPU 加速系统的运行效率。

---

### **2. 发布与破坏性变更**  
- **最新构建版本**：  
  - `b11998`：新增对 **Mistral Le Chonk** 的支持，将 DSA/SDPark 扩展至新模型；修复 CI 问题。  
    [PR #31376](https://github.com/ggml-org/llama.cpp/pull/31376)  
  - `b11988`：通过 GGUF 架构扩展与转换工具，新增对 **Limite 1B - Violetto** 模型的支持。  
    [PR #29433](https://github.com/ggml-org/llama.cpp/pull/29433)  
  - `b11986`：在 OpenCL 上实现初始的 **IQ2 量化**支持（AOS/SOA、Adreno DP4a、分块矩阵乘法）。  
    [PR #31267](https://github.com/ggml-org/llama.cpp/pull/31267)  

> ✅ *今日未报告任何破坏性 API 变更。*

---

### **3. 新模型与硬件支持**  
| 功能 | 详情 | 链接 |
|--------|--------|------|
| **模型支持** | `Limite 1B - Violetto`、`Mistral Le Chonk`、`LFM3-VL-2B`、`Qwen3.5+MoE`、`DeepSeek-V4.1-Flash` | [PR #29433](https://github.com/ggml-org/llama.cpp/pull/29433), [PR #31376](https://github.com/ggml-org/llama.cpp/pull/31376) |
| **硬件后端** | **OpenCL**：IQ2 量化（Adreno、DP4a、SOA/AOS）；**Hexagon**：UPSCALE 操作（最近邻/双线性 2x/4x），转置 CONCAT 优化 | [PR #31267](https://github.com/ggml-org/llama.cpp/pull/31267), [PR #31331](https://github.com/ggml-org/llama.cpp/pull/31331) |
| **量化格式** | `IQ2_s`、`MXFP4`、`Q4_0`、`Q8_0` — 现已用于 SYCL/OPENCL 的闪存注意力 | [PR #31125](https://github.com/ggml-org/llama.cpp/pull/31125), [PR #31075](https://github.com/ggml-org/llama.cpp/pull/31075) |

---

### **4. 性能与优化**  
- **Metal**：通过 fp16 位技巧 + 对齐的 32 位半字节加载，优化 MXFP4 矩阵-向量内核，无需线程组查找表。  
  [PR #31075](https://github.com/ggml-org/llama.cpp/pull/31075)  
- **SYCL**：向量化重排布局反量化存储（Q4_0、K-量化、IQ3、MXFP4）。  
  [PR #30976](https://github.com/ggml-org/llama.cpp/pull/30976)  
- **CPU（分块 FA）**：在分块闪存注意力内核中启用 `q8_0` KV 缓存读取 —— 避免逐行反量化开销。  
  [PR #31399](https://github.com/ggml-org/llama.cpp/pull/31399)  
- **CUDA**：对 Prism Hadamard 旋转进行内核融合（减少内核启动次数）。  
  [PR #31398](https://github.com/ggml-org/llama.cpp/pull/31398)  
- **Hexagon**：通过双行块大小与 VTCM 步长填充，优化转置 CONCAT 中的 DDR 带宽使用。  
  [PR #31277](https://github.com/ggml-org/llama.cpp/pull/31277)  

> 📈 这些改进旨在降低延迟并提升内存带宽利用率，尤其针对边缘与异构设备。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR | 备注 |
|------|----------|--------|--------|-------|
| `LFM3` JSON 模式解析失败：“空语法栈” | 严重 | 已关闭 | [PR #31374](https://github.com/ggml-org/llama.cpp/pull/31374) | 通过在设置 `response_format` 时禁用惰性语法解决 |
| Metal 后端在 M2 Ultra 上崩溃：constexpr bfloat 转换 | 高 | 开放 | 尚无修复 | `unary.metal` 编译错误 |
| SYCL：XMX-ESIMD 路径在 Arc B70 MoE 提示处理中慢约 35% | 高 | 开放 | 无 | 回归出现在 `d81d0d8fb` → `edc353842` |
| CUDA：`ggml_cuda_op_unary<sigmoid>` 中地址未对齐 | 中等 | 开放 | 无 | 在 RTX 5090 笔记本版（sm_120）上出现 |
| `response_format` + `tool_choice=auto` → 400 错误 | 中等 | 开放 | [PR #31395](https://github.com/ggml-org/llama.cpp/pull/31395) | 修复语法解析逻辑 |

> ⚠️ **重点关注项**：LFM3 JSON 模式失败（现已修复）、Intel Arc 上 MoE 性能下降、M2 Ultra 上 Metal 兼容性问题。

---

### **6. 对应用开发者的意义**  
- ✅ **部署 LFM3 或 Qwen3.5 模型？** 使用 `--response-format json_schema` 时需谨慎 —— 确保使用 `b11997+` 版本以避免语法栈崩溃。  
- 💡 **面向低内存边缘设备优化**：新推出的 **IQ2** 和 **MXFP4** 支持覆盖 OpenCL/SYCL，可在移动 GPU（Adreno）和嵌入式 Hexagon 核心上实现高效推理。  
- 🛠 **降低纯 CPU 系统延迟**：启用 `--ctk q8_0 -ctv q8_0` 并配合分块闪存注意力（`b11997+`），可避免预填充阶段昂贵的 KV 反量化开销。  
- 🔍 **调试工具建议**：考虑使用新的 `json-schema-to-grammar` 长度校验功能（PR #31358），防止运行时因非法模式而失败。  
- 🧩 **混合 MoE 模型**：在 Intel Arc（B70）上使用 `-ncmoe` 时需谨慎 —— 最近的 SYCL 变更可能导致提示处理速度下降约 35%。请关注 `d81d0d8fb` 之后的构建版本。

> 🔗 **推荐构建版本**：`b11998` 或 `b11997`，用于稳定支持 LFM3/Qwen3.5 以及改进的 metal/opencl 后端。  
> 🔗 **GitHub**：[ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-30**

---

### **1. 今日亮点**  
Ollama 生态系统持续扩展多模态与原生代理能力，针对音频/视频处理及 OpenAI 兼容性在 `/api/chat` 与 `/v1/models` 端点上修复了关键问题。重要 PR 解决了工具调用中的静默数据丢失（`qwen3.8:27b-mlx`）、嵌入向量中媒体顺序错误（Gemma 4）以及影响多模型工作负载的内存计数缺陷。新提出的 `--audio` CLI 标志及 LFM3-Omni 对原生音频输出的支持，标志着与实时语音 AI 深度集成的进展。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内未报告新发布或破坏性变更。*  
然而，当前正在进行的 PR 显示即将改进 OpenAI 兼容 API 行为：
- 修复 `GET /v1/models` 在无模型安装时返回 `[]` 而非 `null` 的问题 ([#19381](https://github.com/ollama/ollama/issues/19381))。
- 确保空嵌入响应使用空数组 (`data: []`) 而非 `null` ([#19387](https://github.com/ollama/ollama/pull/19387))。

---

### **3. 新模型与硬件支持**  
- **音视频输入/输出**：正积极推进通过 `--audio`、`--speak` 与 `--tts` 标志实现 Windows 原生支持的功能请求 ([#19396](https://github.com/ollama/ollama/issues/19396), [#19390](https://github.com/ollama/ollama/issues/19390))。`lfm3-omni` 与 `phonon` 模型是此方向的核心。
- **三值量化**：提议增加对 `bonsai-2` 三值量化格式的支持 ([#19388](https://github.com/ollama/ollama/issues/19388))。
- **ROCm on gfx1151 iGPU**：AMD Strix Halo (gfx1151) 上存在持久性问题，请求间出现 KV 状态泄漏——已知回归问题，影响推理正确性 ([#17847](https://github.com/ollama/ollama/issues/17847))。
- **MLX 后端增强**：改进推测解码（支持 `draft_num_predict=0`）、并发生成及草稿缓存管理 ([#19391](https://github.com/ollama/ollama/pull/19391), [#19197](https://github.com/ollama/ollama/pull/19197))。

---

### **4. 性能与优化**  
- **MLX Top-K 优化**：后续 PR 通过将 2048 元素分块排序（而非全行归并排序），优化了大词表 Top-K 操作的性能开销 ([#19392](https://github.com/ollama/ollama/pull/19392))。
- **内存计数修复**：
  - 正确排除驻留在 CPU 上的输入张量对显存预测的影响 ([#19393](https://github.com/ollama/ollama/pull/19393))。
  - 防止在 GPU 内存压力下驱逐仅运行于 CPU 的任务，提升多 GPU 系统稳定性 ([#19284](https://github.com/ollama/ollama/pull/19284))。
- **推测解码效率**：`mlxrunner` 现在支持按请求禁用草稿生成，可在不更改默认设置的前提下测试推测解码的速度提升 ([#19391](https://github.com/ollama/ollama/pull/19391))。

---

### **5. 稳定性与回归问题**  
- **严重回归**：`qwen3.8:27b-mlx` 在助手内容非空时无法发出 `tool_calls` —— 打破常见代理模式 ([#19353](https://github.com/ollama/ollama/issues/19353))。*PR 待提交。*
- **工具调用中的静默数据丢失**：当 `content` 为空但 `tool_calls` 存在时，`go_template` 解析器会丢弃整个助手回合 —— 已确认为模板层缺陷 ([#19377](https://github.com/ollama/ollama/issues/19377))。
- **音频处理缺陷**：即使模型具备 `audio` 能力，`/api/chat` 仍静默忽略 `audio` 字段；已通过 PR 修复，该修复在传递至投影器前验证片段类型 ([#19397](https://github.com/ollama/ollama/pull/19397))。
- **CUDA 初始化失败**：Windows 上（RTX 5070 Ti）偶发 `shared object initialization failed` 错误，导致无声降级至 CPU 钉住缓冲区 ([#17380](https://github.com/ollama/ollama/issues/17380))。
- **模型版本回滚失败**：用户意外更新后无法回退 —— 目前尚无回滚机制可用 ([#19385](https://github.com/ollama/ollama/issues/19385))。

---

### **6. 对应用开发者的启示**  
- **代理构建者**：使用 `qwen3.8:27b-mlx` 与 `gpt-oss:120b` 时需谨慎 —— 依赖 `tool_calls` 时请确保 `content` 为空。可选用替代模板或等待修复 PR。
- **多模态应用**：未来版本将提升对音视频输入的支持。在此之前，请避免依赖 `/api/chat` 的 `audio` 字段——当前会静默忽略输入。
- **API 兼容性**：更新 SDK 以处理模型列表响应中的 `data: []` 而非 `data: null`。验证内容数组中的 `reasoning` 字段 —— 若 `content` 为数组，该字段可能被丢弃。
- **部署策略**：密切关注显存计数 —— 当前估算会高估驻留于 CPU 的张量。在混合 GPU/CPU 系统上避免采用激进的驱逐策略。
- **未来兼容性**：考虑使用 MLX 后端进行推测解码与并发处理，但需注意其实验状态，以及在 ROCm/iGPU 硬件上的潜在回归风险。

---  
*数据来源：[github.com/ollama/ollama](https://github.com/ollama/ollama)*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM Digest — 2026-10-30**

#### **1. 今日亮点**  
v1.108.0-rc.1 版本通过 cosign 对 Docker 镜像进行签名，实现了关键的安全加固，验证了提交 `e82a3c6` 的完整性。主要改进包括流式处理的性能优化（PR #49166），以及对 Redis 交互逻辑的重构，提升了可靠性和可维护性（PRs #49162, #48958）。值得注意的是，此前影响 OpenAI 兼容服务商（如 OpenRouter）的成本追踪问题已修复，确保在流式场景下也能准确记录支出。

#### **2. 发布与破坏性变更**  
- **v1.108.0-rc.1**：候选版本，使用 [cosign](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065) 验证镜像签名。  
- **破坏性修复**：旧版代理 MCP 服务器现已正确转发上游调用者（PR #49167），解决了在 v1.103.0 中引入的回归问题。  
- **迁移提示**：依赖 `stream_chunk_builder` 与 Gemini 工具调用的用户请注意正在进行的修复（Issue #25869）；升级以避免“工具调用上下文损坏”错误。

#### **3. 新模型与硬件支持**  
- **Z.AI 模型**：完整支持 `zai/*` 模型，包含 `response_format`、`max_completion_tokens` 及 GLM-5V-Turbo 定价（PR #48335）。  
- **OpenAI 音频模型**：最新 OpenAI 音频模型（如 `gpt-transcribe`）现支持实时转录，并按秒计费（PR #35600）。  
- **Azure AI Foundry Agents v2**：通过 Responses API 原生支持 `agent_reference`（Issue #25372，PR 待定）。  
- **新增平台请求**：Kimi K3（Moonshot AI）、Inkling（Thinking Machines Lab）、Tinker 平台（Issue #33921）。

#### **4. 性能与优化**  
- **流式延迟**：移除了每块流式数据上重复的 Pydantic 验证开销（PR #49166），单次请求减少约 12–15% 的 CPU 消耗。  
- **路由效率**：最少负载路由现在原子化地保留选择结果，防止请求堆积（PR #47484），在突发流量下改善负载分布。  
- **Redis 可扩展性**：重构 Redis 传输层（PRs #48958, #49162），为未来基于 Rust 的后端迁移铺路，并提升滚动部署期间的 Pod 互操作性。  
- **健康检查**：优化通配符部署的探测逻辑（PR #49060），避免对未服务模型产生误报。

#### **5. 稳定性与回归问题**  
- **高严重性**：  
  - OpenRouter 流式响应中成本数据丢失（Issue #16021，已关闭；修复可能已在 RC 版中）  
  - 非流式 OpenAI 兼容调用中 `usage.cost` 被忽略 → 记录为 $0 支出（Issue #47533，已关闭）  
  - 服务商报告的成本未做单位校验即视为美元 → 出现虚拟支出（Issue #35829，已关闭）  
- **中等严重性**：  
  - Gemini 流式中因 `stream_chunk_builder` 导致工具调用损坏（Issue #25869，开放）  
  - 代理关闭时内存支出缓冲区丢失（Issue #34805，开放）  
  - 通过代理调用 GPT-5.4 时提示缓存失效（Issue #24987，已关闭）  
- **已合并修复**：  
  - OpenRouter 流式块中泄露模型名称（Issue #46095，已在 PR #48592 中修复）  
  - Redis 语义缓存异常行为（Issue #31610，已修复）

#### **6. 对应用开发者的意义**  
- **成本准确性已成为关键**：请务必升级至 `v1.108.0-rc.1+` 及以上版本，避免在流式与非流式流程中出现无声的 $0 支出记录。使用 `provider_budget_config` 配合 Redis 实现可靠的预算重置（规避 Issue #37261）。  
- **安全使用工具流**：在 PR #25869 合并前，请勿使用 `Gemini` + `tool_calls` + `web_search` 组合——当前行为会破坏后续对话轮次。  
- **安全部署实践**：利用签名 Docker 镜像（`cosign verify`），并考虑从文件读取密钥（Issue #28994，PR 待定），以适应生产环境要求。  
- **面向未来的集成**：关注 Kimi K3、Z.AI 等新模型的支持进展；期待 LiteLLM 不断演进的提供商生态带来更快的采纳速度。  

👉 *查看完整变更日志：[GitHub v1.108.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.108.0-rc.1)*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-30**

---

### **1. 今日亮点**  
Unsloth 持续推进核心推理引擎与 Studio UI 的优化，针对 Windows AMD 系统和基于 MLX 的 Apple Silicon 设备修复了关键的内存管理问题。在 Gemma 3 与 Llama 4-bit 模型上实现了关键性能优化，同时新推出的 Flows 功能（数据配方、基准测试、训练节点）正逐步集成至桌面端与网页 UI。团队还正在解决长期存在的模型上下文压缩、音频处理以及托管账户权限等问题。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
但多个 PR 引入了破坏性变更或需配置更新：  
- `UNSLOTH_DECODE_FUSED_NF4=1` 启用 Llama 模型的可选融合 4 位解码（PR #16032）。  
- `mlx` 内存估算现在考虑完整宽度的注意力分数（PR #16021），可能影响模型加载感知表现。  
- 当所有者启用后，本地 MCP 服务器现对托管账户开放（PR #16044）。

> 🔗 [PR #16032](https://github.com/unslothai/unsloth/pull/16032), [PR #16021](https://github.com/unslothai/unsloth/pull/16021), [PR #16044](https://github.com/unslothai/unsloth/pull/16044)

---

### **3. 新模型与硬件支持**  
- **新模型支持**：已请求对 **LFM3-1.7B**（PR #15588）的支持，该模型为 LiquidAI 推出的新一代表达性骨干网络。  
- **硬件/后端**：  
  - 在 Apple Silicon（Golden Gate 27.x）上改进了 MLX 后端处理，提升显存统计精度（PR #16021）。  
  - AMD GPU 支持现已包含训练期间正确排除 iGPU（PR #14039）。  
  - 实验性支持 **EXL3（ExLlamaV3）** 量化后端，具备 MoE 及低于 8 位支持能力（PR #7115）。  

> 🔗 [Issue #15588](https://github.com/unslothai/unsloth/issues/15588), [PR #7115](https://github.com/unslothai/unsloth/pull/7115)

---

### **4. 性能与优化**  
- **Gemma 3**：改用非灵活路径生成而非回退路径（PR #16041），减少因 `flex_attention` 编译失败导致的延迟突增。  
- **Llama 4-bit 解码**：通过 `UNSLOTH_DECODE_FUSED_NF4=1` 实现融合解码，在急切模式下实现每标记生成速度提升 **1.6–2.3 倍**（PR #16032）。  
- **MLX 内存估算器**：现在即使使用 f16 KV 缓存，也会对注意力矩阵进行真实内存计费，更准确反映实际内存占用（PR #16021）。  
- **Qwen3-ASR**：新增可配置语音上下文（1K–64K），将内存占用从约 8.7 GiB（64K）降低至约 2.0 GiB（1K）（PR #15810）。  

> 🔗 [PR #16041](https://github.com/unslothai/unsloth/pull/16041), [PR #16032](https://github.com/unslothai/unsloth/pull/16032), [PR #15810](https://github.com/unslothai/unsloth/pull/15810)

---

### **5. 稳定性与回归问题**  
- **严重**：在 Windows AMD 上，GGUF 加载导致约 16 GB 的提交内存占用，尽管显存充足 —— 系统页面文件限制被耗尽（Issue #16015, PR #16046）。修复正在进行中。  
- **高严重度**：长对话中上下文无法压缩，导致聊天无法延续（Issue #15800）。相关修复 PR #15857 正在评审中。  
- **崩溃**：模型卸载后出现核心转储，日志中无明确线索（Issue #14411）。暂无修复方案；需进一步分析核心转储。  
- **UI/UX 回归问题**：  
  - AppImage 版本存在界面卡顿（Issue #15999）。  
  - 文本输入在标签页间重复（Issue #15782）。  
  - 音频上传上限为 200 MB（Issue #15840）；用户要求提高上限。  

> 🔗 [Issue #16015](https://github.com/unslothai/unsloth/issues/16015), [PR #16046](https://github.com/unslothai/unsloth/pull/16046), [Issue #15800](https://github.com/unslothai/unsloth/issues/15800), [PR #15857](https://github.com/unslothai/unsloth/pull/15857)

---

### **6. 对应用开发者的影响**  
- **优化低内存环境**：使用 `UNSLOTH_DECODE_FUSED_NF4=1` 与 `语音上下文` 设置以减轻内存压力，尤其适用于边缘设备。  
- **优雅处理上下文溢出**：目前 Anthropic 透传（`/v1/messages`）中自动压缩仍不完全生效 —— 请预期需手动处理，直至修复落地（Issue #15417）。  
- **构建健壮的代理工作流**：注意工具调用在标记限制处被截断的问题（PR #16035）；确保代理在执行前验证输出完整性。  
- **设计多 GPU/多模型部署方案**：借助常驻模型支持（PR #10876），可并行加载多个 GGUF，但需监控 Windows AMD 系统上的提交内存（PR #16046）。  
- **准备迎接 Flows 集成**：新数据配方与训练节点功能（PRs #15604, #15611）将支持模块化、可视化的微调流程 —— 极适合代理训练循环场景。

> 🔗 [Flows 训练节点](https://github.com/unslothai/unsloth/pull/15611), [Flows 数据配方](https://github.com/unslothai/unsloth/pull/15604)

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*