# AI 基础设施日报 2026-10-03

> 生成时间: 2026-10-03 01:21 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-03**

---

### **1. 生态概览**  
AI推理与服务生态正进入硬件融合的关键阶段，以NVIDIA Blackwell（SM120）和AMD MI355X/MI45x为代表的下一代GPU正在推动所有主要项目紧急修复性能与稳定性问题。推测解码、前缀缓存与混合注意力模型已成为竞争差异化的核心，而针对特定模型的优化则揭示了引擎在处理新兴大模型系列（如GLM-5.x、Qwen3.8-Flash、DeepSeek-V4）时深层次的架构分歧。本地运行时（llama.cpp、Unsloth）、网关抽象层（LiteLLM）以及高吞吐服务器（vLLM、SGLang）的日益成熟，反映出边缘原生部署与云规模编排之间的分野——各自需要不同的优化策略。

---

### **2. 活动对比**

| 项目       | 开放问题 | 开放PR | 近24小时发布 | 状态 |
|---------------|-------------|----------|------------------------|--------|
| **vLLM**      | 57          | 34       | 无                   | 稳定 |
| **SGLang**    | 69          | 41       | 无                   | 活跃开发 |
| **llama.cpp** | 54          | 28       | `b11364`, `b11362`     | 已修补 |
| **Ollama**    | 87          | 39       | 无                   | 高风险 |
| **LiteLLM**   | 26          | 15       | v1.105.0-dev.2         | 安全优先 |
| **Unsloth**   | 62          | 21       | 无                   | 回归警告 |

> ✅ *洞察*：Ollama因关键Cloud Pro服务中断（95%失败）导致问题数量领先；而vLLM与SGLang在PR提交速度上表现最高，反映出其对推测解码与内核级创新的重点投入。

---

### **3. 模型支持竞赛**

| 新模型 / 架构        | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-------------------------------|------|--------|-----------|--------|---------|---------|
| **GLM-5.3-Flash**             | ✅（含SM120问题） | ✅（SM120崩溃） | ❌ | ✅（仅支持MLX） | ❌ | ❌ |
| **Qwen3.8-Flash-Next**        | ✅（PLE存储） | ⚠️（MTP 0%） | ✅（Nimble支持） | ✅ | ❌ | ⚠️（TTS需求） |
| **DeepSeek-V4.1**             | ✅（Flash） | ✅（优化中） | ❌ | ❌ | ❌ | ❌ |
| **Clef Decision Model**       | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Nimble Decision Model**     | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Reka / QuickSilver Pro**    | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

> 🏆 **领先者**：**llama.cpp** 在小众及新兴模型支持方面领先（Clef、Nimble、Qwen3.8-Flash-Next），得益于其轻量级、跨平台的设计。  
> 🥈 **亚军**：**LiteLLM** 在API抽象层胜出——首个原生集成Reka与QuickSilver Pro作为OpenAI兼容提供方，实现多后端快速采用。

---

### **4. 性能前沿**

| 优化重点           | vLLM                          | SGLang                        | llama.cpp                  | Ollama                 | LiteLLM                     | Unsloth                |
|------------------------------|-------------------------------|-------------------------------|----------------------------|------------------------|-----------------------------|------------------------|
| **KV缓存与前缀缓存**| ✅ MTP + 混合注意力     | ✅ EAGLE/DSPARK + 基数缓存 | ⚠️ Flash注意力（Metal） | ⚠️ VRAM驱逐缺陷    | ✅ 提示词缓存优化 | ⚠️ 流式传输开销 |
| **推测解码**     | 🔥 关键回归（0% MTP） | 🔥 EAGLE复用崩溃（50–60%） | ⚠️ Draft-MTP崩溃（AMD） | ✅ 原生工具链       | ✅ 预算感知路由     | ⚠️ 双GPU下2.9倍降速 |
| **内核级优化**| ✅ FlashInfer预下载，Triton GEMM | ✅ Cake内核，RDNA上MoE | ✅ F16 KV, ALiBi, sink（Metal） | ❌ CUDA图捕获   | ✅ OTEL跨度清晰度        | ❌ 张量分割回归 |
| **分布式与MoE服务**| ✅ 异步KV卸载，睡眠模式 | ✅ UnifiedRadixCache          | ✅ GPU驻留LRU缓存  | ❌ ROCm VRAM被忽略    | ✅ 多提供方路由     | ❌ VRAM过度使用（FT）   |
| **量化与效率**| ✅ NVFP4 MLA，BF16融合QKV   | ✅ MXFP4 MoE，Triton内核   | ✅ q2_k/q3_k（Hexagon），IQ3 | ✅ MLX/MXFp8（M系列） | ✅ 按令牌成本追踪 | ⚠️ 误导性上下文限制 |

> 🔍 **趋势**：内核专业化（Triton、FlashInfer、Cake）与高效内存管理（异步卸载、LRU缓存、PLE存储）主导性能优化——尤其在大型MoE与推测解码场景中。

---

### **5. 层级定位**

| 项目       | 主要层级              | 角色摘要 |
|---------------|----------------------------|--------------|
| **vLLM**      | **高吞吐推理引擎** | 云规模服务；专为批处理、长上下文推理优化；聚焦推测解码与分布式KV缓存 |
| **SGLang**      | **高性能推理引擎** | 针对低延迟、高并发推测解码优化；先进缓存机制（HiCache、UnifiedRadixCache）；面向代理工作负载 |
| **llama.cpp**   | **本地运行时 / 边缘推理** | 跨平台、低占用引擎，适用于移动设备、边缘场景及Apple Silicon；在Metal/F16 Flash注意力与工具调用集成方面表现卓越 |
| **Ollama**      | **开发者网关与本地CLI** | 面向开发者的接口；抽象后端复杂性；在模型管理与浏览器集成方面强大；生产稳定性较弱 |
| **LiteLLM**     | **通用大模型网关** | 无差别API层；支持无缝跨提供方路由（OpenAI、Bedrock、Reka等）；对成本控制与可观测性至关重要 |
| **Unsloth**     | **微调与工作室平台** | 支持GGUF模型的端到端微调UI；面向研究者与开发者；当前推理吞吐不稳定 |

> 🧩 **战略洞察**：vLLM与SGLang正趋同于“高性能推理”层级；LiteLLM与Ollama占据“接入点”层级；llama.cpp在边缘/本地执行领域仍占主导地位。

---

### **6. 趋势信号**

1. **硬件驱动的不稳定性已成为常态**  
   - SM120（Blackwell）与gfx1250（MI45x）正在引发vLLM、SGLang与llama.cpp的连锁回归。  
   - **行动建议**：在新硬件上避免使用夜间构建版本，直到稳定发布标签可用。应锁定已知良好版本（如`vllm:0.30.0`、`llama.cpp:b11364`）。

2. **推测解码已成为关键瓶颈**  
   - vLLM与SGLang均报告MTP接受率0%、前缀复用率下降50–60%——严重影响代理效率。  
   - **关注点**：评估您的用例是否可容忍推测性能下降；考虑回退至贪婪解码。

3. **安全与可信度成为优先事项**  
   - LiteLLM引入了cosign签名的Docker镜像；Ollama遭遇真实性问题（Authenticode失败）。  
   - **最佳实践**：生产部署中始终验证镜像签名。

4. **代理工作流要求一体化工具链**  
   - 流式工具调用在多个项目（Ollama、SGLang、Unsloth）中均存在脆弱性。  
   - **建议**：尽早验证工具调用分块逻辑；优先选择支持显式`tool_call_id`处理的系统。

5. **模型特异性优化已不再是可选项**  
   - 各项目正竞相为新模型（GLM-5.3-Flash、Qwen3.8-Flash-Next、Nimble Decision Model）提供架构专属内核支持。  
   - **要点**：选择与目标模型族匹配的堆栈，而非仅依赖通用性能。

---

> ✅ **开发者最终建议**：  
> - **用于云规模代理**：谨慎使用**vLLM**或**SGLang**——在SM120/gfx1250上验证推测解码行为。  
> - **用于边缘/移动端**：优先选择**llama.cpp**（`b11364+`）以获得Metal/F16 KV与Draft-MTP稳定性。  
> - **用于多提供方网关**：采用**LiteLLM v1.105.0-dev.2**实现安全、成本感知的路由。  
> - **用于本地微调**：避免近期Unsloth预编译版（`b10715+`）——使用`b10687`或从源码构建。  
> - **用于生产可靠性**：在#15453修复前，切勿部署Ollama Cloud Pro。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-10-03**

---

### **1. 今日亮点**  
vLLM 项目持续聚焦下一代硬件的稳定性与性能优化，针对 Blackwell（SM120）GPU 已完成关键修复，并持续推进混合注意力模型下推测解码与前缀缓存的稳定性工作。目前报告了在 GLM-5.3-Flash（SM120）上 MTP 接受率出现严重回归问题，相关 PR 正在积极修复特定于 GPU 的内核问题及异步 KV 卸载正确性缺陷。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性变更。

---

### **3. 新模型与硬件支持**  
- **硬件**：对 **RTX PRO 6000 Blackwell（SM120）** 的完整支持正在积极调研中，重点覆盖 DeepSeek-V4.1-Flash 与 GLM-5.3-Flash 模型。问题 #56892 和 #59724 指出因 CUDA 图捕获与内核兼容性问题导致解码吞吐量严重下降及 MTP 接受率为 0% 的严重问题。  
- **模型**：  
  - **Qwen3.8-Flash-Next** 支持正扩展至统一内存 GPU（如 DGX Spark），通过检查点映射的 PLE 存储实现（#58439）。  
  - **GLM-5.x** 已加入对 NVFP4 MLA 投影加载的修复，支持 BF16 融合 QKV 投影（#59833）。  
- **后端**：ROCm 支持进一步拓展，新增对 AMD MI355X（gfx950）的测试覆盖，并已启动 Qwen3.8-2.4T-A95B 性能优化规划（#57149）。

---

### **4. 性能与优化**  
- **推测解码**：在 SM120 GPU 上报告了 MTP 解码的关键性能下降——夜间构建中接受率已降至 0%（#59724）。修复待推进。  
- **内核优化**：  
  - 基于 Triton 的 fp32 路由 GEMM 已在 ROCm 上落地，适用于低 M 解码场景（#54916）。  
  - FlashInfer 预编译内核现可通过 `vllm download-kernels` 提前下载，避免在 Hopper+ GPU 上运行时的即时编译开销（#58765）。  
- **内存效率**：  
  - 睡眠模式现在可选通过 `sleep_mode_offload_cudagraph` 参数卸载 CUDA 图池（#59160）。  
  - 修复异步 KV 加载零化竞争条件，防止块数据损坏（#59504）。  
- **模型专项**：针对 Mamba2 推测解码的 ReplaySSM 内核优化正在进行中（#49847）。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|------------|
| ⚠️ 高 | [#59724](https://github.com/vllm-project/vllm/issues/59724) | 在使用原生 FLASHINFER_MLA_SPARSE_SM120 后端时，GLM-5.3-Flash（SM120）上出现 0% MTP 接受率 | 进行中 |
| ⚠️ 高 | [#56892](https://github.com/vllm-project/vllm/issues/56892) | 在 `--enforce-eager` 下，RTX PRO 6000 Blackwell（8x TP）上解码吞吐量极低；CUDA 图不可用 | 进行中 |
| ⚠️ 中 | [#59642](https://github.com/vllm-project/vllm/issues/59642) | Qwen3.8-flash-next 在去中心化 PD 服务中显示 0% MTP 接受率 | 进行中 |
| ⚠️ 中 | [#59413](https://github.com/vllm-project/vllm/issues/59413) | GLM-5.3-Flash 在 ROCm 上低并发时生成乱码 | 正在调查 |
| 🟡 低 | [#57032](https://github.com/vllm-project/vllm/issues/57032) | Drafter KV 组未被识别 → 对 Mamba 组的前缀缓存复用被静默禁用 | PR 待审 |

---

### **6. 对应用开发者的启示**  
- **避免在 SM120 上使用夜间构建**：在 #59724 和 #56892 修复前，请勿使用 `vllm/vllm-openai:nightly` 运行 GLM-5.3-Flash 或 DeepSeek-V4.1-Flash 等模型——推测解码可能表现退化或失败。  
- **尽早使用 `vllm download-kernels`**：在 Blackwell 或 Hopper GPU 上，提前下载 FlashInfer 内核以避免因 JIT 编译带来的启动延迟。  
- **监控前缀缓存行为**：混合模型（如 DeepSeek-V4-Flash + DSpark）可能存在未经测试的 EAGLE/MTP 与前缀缓存交互——需在负载下验证行为。  
- **启用睡眠模式卸载**：在大规模 MoE 部署中开启 `sleep_mode_offload_cudagraph`，可在空闲期回收数十 GiB 的 GPU 内存。  
- **关注 ROCm 稳定性**：若使用 AMD MI355X 或 gfx950，需留意 #57149 和 #59413，防范潜在的正确性或性能问题。

> ✅ **行动项**：在 Blackwell 或 ROCm 上运行时，审查部署配置中的 `--scheduler-policy`、`--enforce-eager` 及 `--speculative-decoding-method`。除非追踪特定修复，否则请使用稳定版标签（如 `0.30.0`）。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **1. 今日亮点**  
SGLang 持续推进其推测解码与高吞吐服务能力，重点进展包括 **Ngram 推测解码**、**HiCache/UnifiedRadixCache 稳定性** 以及 **DeepSeek V4.1 优化**。值得注意的是，一个导致 EAGLE 推测解码前缀重用率从 97% 跌至 40–53% 的关键缺陷已被识别，目前正在调查中。与此同时，多个 PR 正在积极优化 GPU 内存管理、内核调度，并支持 AMD 新硬件（gfx1250, MI45x）及 Apple Silicon。

---

### **2. 版本发布与破坏性变更**  
无。过去 24 小时内未发布新版本或破坏性变更。最新稳定版本仍为 `v0.5.21`，开发工作持续在 `main` 分支进行。

---

### **3. 新模型与硬件支持**  
- **AMD 硬件**：通过 [AMD 路线图 (Issue #35003)](https://github.com/sgl-project/sglang/issues/35003)，新增对 **MI45x (gfx1250)** 与 **Ryzen AI Halo (gfx1151/1152)** 平台的支持。  
- **模型专项**：  
  - **DeepSeek-V4.1** 的追踪与优化正在进行中 ([Issue #42170](https://github.com/sgl-project/sglang/issues/42170))。  
  - **GLM-5.3-Flash** 正因 `fa4` 注意力后端在 SM120（RTX PRO 6000）上的兼容性问题而被审查 ([Issue #42012](https://github.com/sgl-project/sglang/issues/42012))。  
- **后端扩展**：  
  - 通过 FlashInfer 集成 **Cake kernels**，现已有端到端跟踪 ([Issue #42276](https://github.com/sgl-project/sglang/issues/42276))。  
  - **ROCm/MXFP4 MoE** 已通过 Triton 内核支持 RDNA 显卡 ([PR #41389](https://github.com/sgl-project/sglang/pull/41389))。

---

### **4. 性能与优化**  
- **推测解码**：  
  - Ngram 推测解码增强进展顺利 ([Issue #21052](https://github.com/sgl-project/sglang/issues/21052))，包括引入工具调用语法扩展种子语料库。  
  - DSpark 验证宽度现支持每步调整，以提升批处理效率 ([PR #42281](https://github.com/sgl-project/sglang/pull/42281))。  
- **内存与缓存**：  
  - Unified Radix Cache 现强制流式会话验证；不含流式支持的树缓存将被拒绝 ([PR #42295](https://github.com/sgl-project/sglang/pull/42295))。  
  - HiCache 写回修复防止淘汰时触发断言失败 ([PR #42264](https://github.com/sgl-project/sglang/pull/42264))。  
- **内核与调度**：  
  - 解码阶段重构从阶段边界入手，提升模块化与未来可扩展性 ([PR #42312](https://github.com/sgl-project/sglang/pull/42312)、#42311 等)。  
  - 针对 gfx950 GPU 的小批量 MoE 优化提升了 Qwen3.5-397B-A17B-FP8 的性能 ([PR #41982](https://github.com/sgl-project/sglang/pull/41982))。

---

### **5. 稳定性与回归问题**  
- **严重级**：  
  - **EAGLE 推测解码在 GLM-DSA NVFP4 (v0.5.16) 多轮请求场景下导致前缀重用率下降 50–60%** —— 无崩溃，但性能严重下降 ([Issue #32459](https://github.com/sgl-project/sglang/issues/32459))。  
- **高严重级**：  
  - **在 H20 TP8 上，QSA 扩展前向操作出现 CUDA 非法内存访问**，仅当设置 `CUDA_LAUNCH_BLOCKING=1` 时被抑制 ([Issue #37633](https://github.com/sgl-project/sglang/issues/37633))。  
  - **GLM-5.3-Flash 在 SM120 上使用 `fa4` 后端时，CUDA 图捕获阶段崩溃**；仅 `triton` 可正常运行 ([Issue #42012](https://github.com/sgl-project/sglang/issues/42012))。  
- **中等严重级**：  
  - **DSPARK 在草稿 CUDA 图捕获期间因 `scatter_add_` 维度不匹配而崩溃** ([Issue #34974](https://github.com/sgl-project/sglang/issues/34974))。  
  - **DeepSeek-V4-Pro 在最近重构后，并发为 1 时解码吞吐量下降约 5%** ([Issue #42074](https://github.com/sgl-project/sglang/issues/42074))。

---

### **6. 对应用开发者的影响**  
- **优化推测解码配置**：在如 GLM-DSA 这类模型上启用 EAGLE/Ngram 推测解码时需谨慎——除非已修复，否则预期会出现显著前缀重用损失。建议使用 `--enable-eplb` 和 `--speculative-algorithm DSPARK` 监控性能表现。  
- **避免在 SM120 上使用 fa4 后端**：在 RTX PRO 6000 上，对于 GLM-5.3-Flash 请默认使用 `triton` 作为注意力后端，直至 `fa4` 修复完成。  
- **善用 UnifiedRadixCache**：仅在确认树缓存可靠的前提下启用 `--enable-streaming-session`；避免使用未经验证的缓存以防静默失败。  
- **注意内存与并发限制**：在 H20/GPU 集群环境中，若遇已知 CUDA 崩溃，可临时采用 `CUDA_LAUNCH_BLOCKING=1` 或禁用重叠调度作为规避方案。  
- **关注 CI 健康状态**：当前 CI 流水线报告 2 个失败、5 个不稳定测试 ([Issue #17050](https://github.com/sgl-project/sglang/issues/17050))；建议测试夜间构建以确保稳定性。  

> 🔗 *保持更新：加入 [SGLang Slack](https://slack.sglang.io) 获取实时讨论与状态更新*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-10-03**

---

### **1. 今日亮点**  
最新发布周期（b11364）引入了对 *Nimble Decision Model* 的关键支持，并在 Metal 后端中增强了闪存注意力（flash attention）内核，全面支持 F16 KV，包括注意力汇聚点（attention sinks）、ALiBi 和 logit 软上限（softcap），显著提升了 Apple Silicon 上的性能表现。与此同时，Vulkan 后端稳定性得到加强，修复了三星 GPU 共享内存问题；而 SYCL 与 CUDA 新增优化则聚焦于 MoE 效率和 TOP-K 排序。

---

### **2. 发布与破坏性变更**  
- **`b11364`**：通过 `#29844` 添加运行时对 **Nimble Decision Model** 的支持。  
  [GitHub PR #29844](https://github.com/ggml-org/llama.cpp/pull/29844)  
- **`b11362`**：Metal 后端现包含针对 F16 KV（`DK=DV=512`，`DK=576/DV=512`）的张量 API 闪存注意力内核，支持注意力汇聚点、ALiBi 及 logit 软上限。  
  [GitHub PR #29570](https://github.com/ggml-org/llama.cpp/pull/29570)  
- **`b11355`**：为防止崩溃，已在三星 GPU（32KB 共享内存）上禁用大矩阵乘法分块（large matmul tile）。  
  [GitHub PR #28531](https://github.com/ggml-org/llama.cpp/pull/28531)  
- **`b11346`**：修复 Qwen4Exp 测试失败问题；优化 Qwen4Exp 与 GLM5-next 中的掩码构建逻辑。  
  [GitHub PR #29819](https://github.com/ggml-org/llama.cpp/pull/29819)  

> ⚠️ 未报告任何破坏性 API 变更。

---

### **3. 新模型与硬件支持**  
- **模型**：  
  - 通过 `#29831` 添加对 **Clef Decision Model（仅文本）** 的支持。  
    [GitHub PR #29831](https://github.com/ggml-org/llama.cpp/pull/29831)  
  - 添加对 **Prism Bonsai 2 27B** 的运行时支持。  
    [GitHub PR #29600](https://github.com/ggml-org/llama.cpp/pull/29600)  
- **硬件与后端**：  
  - **Hexagon**：新增 `q2_k` 与 `q3_k` 量化类型支持。  
    [GitHub PR #29717](https://github.com/ggml-org/llama.cpp/pull/29717)  
  - **OpenVINO**：升级至 2026.4.1，提升 MoE 性能并扩展算子覆盖范围。  
    [GitHub PR #29852](https://github.com/ggml-org/llama.cpp/pull/29852)  
- **量化**：  
  - Qwen3.5 嵌入模型现已支持在 `convert_hf_to_gguf.py` 中转换。  
    [GitHub PR #27920](https://github.com/ggml-org/llama.cpp/pull/27920)

---

### **4. 性能与优化**  
- **Metal**：闪存注意力内核现支持 F16 KV 与复杂注意力模式（ALiBi、汇聚点），可在 M 系列芯片上实现更快的推测解码。  
- **Vulkan**：  
  - 使用子组归约（subgroup reductions）优化 RMS 归一化（开发中）。  
    [GitHub PR #29882](https://github.com/ggml-org/llama.cpp/pull/29882)  
  - 添加管线编译错误日志。  
    [GitHub PR #29794](https://github.com/ggml-org/llama.cpp/pull/29794)  
- **CUDA**：  
  - 使用分段基数排序优化多行 `TOP_K`。  
    [GitHub PR #29883](https://github.com/ggml-org/llama.cpp/pull/29883)  
- **SYCL**：  
  - 改进 IQ3 代码重排及 Intel Arc B70 的持久布局。  
    [GitHub PR #29107](https://github.com/ggml-org/llama.cpp/pull/29107)  
  - 使用 MKL 闪存注意力加速 GLM MLA 预填充。  
    [GitHub PR #29171](https://github.com/ggml-org/llama.cpp/pull/29171)  
- **MoE**：引入驻留于 GPU 的 LRU 缓存，用于主机卸载的专家权重。  
  [GitHub PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)

---

### **5. 稳定性与回归问题**  
今日报告的高严重性问题包括：  
- **AMD RADV/Vulkan 平台在 draft-MTP 解码期间出现严重崩溃**，由提示处理后触发 `DeviceLost` 导致。  
  [GitHub Issue #27306](https://github.com/ggml-org/llama.cpp/issues/27306)  
- **Gemma 4 模型在流式传输与部分解析下工具调用不稳定**。  
  [GitHub Issue #29655](https://github.com/ggml-org/llama.cpp/issues/29655)  
- **CUDA 构建在大上下文尺寸下疑似存在内存泄漏**。  
  [GitHub Issue #27725](https://github.com/ggml-org/llama.cpp/issues/27725)  
- **macOS Metal 在默认 `n_ctx` 下加载 Gemma 4 31B 时出现 OOM 与计算错误 (-3)**。  
  [GitHub Issue #29521](https://github.com/ggml-org/llama.cpp/issues/29521)  
- **Qualcomm Adreno Vulkan 驱动上出现无诊断信息的 SIGABRT**。  
  [GitHub Issue #29786](https://github.com/ggml-org/llama.cpp/issues/29786)  

> ✅ 部分回归问题已有修复合并（如 `b11362` 修复 Metal FA 内核），但多数仍处于开放状态。

---

### **6. 对应用开发者的影响**  
- **面向边缘与移动端推理**：新推出的 Metal 闪存注意力与 Nimble 模型支持，使设备端智能体能够实现更快、更精准的决策。使用 `--spec-type draft-mtp` 时需谨慎——请针对已知的 AMD RADV 问题进行验证。  
- **面向多 GPU / MoE 工作负载**：MoE 专家的驻留于 GPU 的 LRU 缓存将减少向 CPU 卸载时的解码延迟。请监控 Metal 上的 `n_ctx` 大小，避免内存溢出。  
- **面向生产服务器**：避免在 Qualcomm Adreno 驱动上使用 `-ngl >= 1`——建议使用 Turnip 或回退至 CPU。仅当禁用 `large_matmul_tile` 时，才推荐在三星 GPU 上使用 Vulkan。  
- **面向工具链与智能体构建者**：更新后的 `ling3.cpp` 解析器现在会尊重响应中的 `json_schema`。请确保您的工具调用流水线在推测解码下经过 Qwen3.8 Flash 与 Gemma 4 模型的充分测试。  

👉 **建议**：为保障 Metal/F16 KV 与 draft-MTP 稳定性，建议锁定至 `b11364` 及以上版本；在后续修复落地前，请务必在非 AMD 平台上使用 `--spec-draft-model` 测试所有新模型。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-03**

---

### **1. 今日亮点**  
Ollama Cloud Pro 出现严重回归问题，所有云模型的失败率高达95%，导致付费用户无法正常使用服务——这是当前最优先处理的问题。在本地端，macOS（MLX 引擎）、Windows（Vulkan GPU 检测）和 Linux（ROCm VRAM 管理）均暴露出多个稳定性与性能问题，预示着 v0.35.1 发布前基础设施面临更大压力。一项新 PR 提出通过 `ollama launch` 实现浏览器集成，表明对原生网页 AI 工作流的需求正在增长。

---

### **2. 发布与破坏性变更**  
无。过去 24 小时内未发布新版本。然而，**v0.35.1** 因两项高危缺陷受到审查：  
- ✅ **Windows 上 Authenticode 签名失败**（`#18765`）——安装程序因 `HashMismatch` 无法通过验证。  
- ⚠️ **模型版本管理缺失**：部分模型如 `qwen3.8:27b` 需要特定 Ollama 版本，但缺乏文档说明（`#18414`）。  

> 🔗 [Issue #18765](https://github.com/ollama/ollama/issues/18765) | [Issue #18414](https://github.com/ollama/ollama/issues/18414)

---

### **3. 新模型与硬件支持**  
- ✅ **MLX 后端新增 GraniteForCausalLM 支持**（`PR #17972`），可在 Apple Silicon 上使用 IBM 的 Granite 4.1/4.2 模型。  
- ✅ **AiRC 多智能体编排**已列入社区集成列表（`PR #18764`）——支持本地 Ollama 及远程实例。  
- ✅ **CORTEX 智能体框架**已添加（`PR #18749`）——MIT 许可，沙箱环境中的 Python、文件与网页工具，由 Ollama 驱动。  
- 🛠 **请求在双 GPU 系统中同时支持 CUDA 与 ROCm 运行时**（`#18545`）——目前仅优先选择 CUDA，即使 ROCm 可用也忽略。

> 🔗 [PR #17972](https://github.com/ollama/ollama/pull/17972) | [PR #18764](https://github.com/ollama/ollama/pull/18764) | [PR #18749](https://github.com/ollama/ollama/pull/18749) | [Issue #18545](https://github.com/ollama/ollama/issues/18545)

---

### **4. 性能与优化**  
- ❌ **MLX 引擎内存压力问题**：在 macOS 27 上，每次请求后约 2 秒权重被解绑，导致空闲时页面调入 → 延迟飙升（`#18744`）。  
- ❌ **M4 Pro GPU 利用率不足**：`Qwen 3.8 qwen3.8:27b-mxfp8` 虽有 48GB 内存可用，却仅使用部分 GPU 内存（`#18754`）。  
- ❌ **ROCm VRAM 在模型驱逐时被忽略**：统一 VRAM 未被充分利用；旧模型过早被驱逐（`#18756`）。  
- ✅ **Strands Decider 实现进行中**（`PR #18755`）——旨在统一决策模型的准备与读取逻辑，提升批处理效率。

> 🔗 [Issue #18744](https://github.com/ollama/ollama/issues/18744) | [Issue #18754](https://github.com/ollama/ollama/issues/18754) | [Issue #18756](https://github.com/ollama/ollama/issues/18756) | [PR #18755](https://github.com/ollama/ollama/pull/18755)

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 影响 | 修复状态 |
|--------|------|------|----------|
| 🔴 严重 | **Ollama Cloud Pro：95% 失败率**（`#15453`） | 所有云模型失效；Pro 用户无法使用服务 | 开放 |
| 🔴 高 | **Llama3.2-vision 更新后损坏**（`#16490`） | 最新更新后视觉功能丢失 | 开放 |
| 🔴 高 | **Windows 上 Intel UHD Vulkan 未被检测到**（`#18672`） | iGPU 无法通过 Vulkan 后端使用 | 开放 |
| 🔴 高 | **工具调用标签在分块边界处丢失**（`#18681`） | 流式响应中工具调用解析错误 | 开放 |
| 🟡 中等 | **未量化 F16 blob 残留**（`#18416`） | 每次导入产生 50GB+ 未引用 blob | 开放 |
| 🟡 中等 | **工具结果按位置关联，而非 `tool_call_id`**（`#18762`） | 并行工具调用结果配对错误 | PR 待审（`#18763`） |

> 🔗 [Issue #15453](https://github.com/ollama/ollama/issues/15453) | [Issue #16490](https://github.com/ollama/ollama/issues/16490) | [Issue #18672](https://github.com/ollama/ollama/issues/18672) | [Issue #18681](https://github.com/ollama/ollama/issues/18681) | [Issue #18416](https://github.com/ollama/ollama/issues/18416) | [PR #18763](https://github.com/ollama/ollama/pull/18763)

---

### **6. 对应用开发者的启示**  
- **在 #15453 修复前避免使用 Ollama Cloud Pro** —— 预期将出现大规模中断。建议使用本地推理或替代服务提供商。  
- **注意模型版本兼容性**：如 `qwen3.8:27b` 可能需要特定 Ollama 版本——请手动查阅变更日志（`#18414`）。  
- **流式工具调用存在脆弱性**：若在 `chat/completions` 中使用工具调用，请确保分块边界不截断标签（`#18681`）。必要时可采用 `PR #18763` 的临时解决方案。  
- **针对 MLX/MacOS 优化**：M 系列芯片上可能出现内存抖动——建议考虑缓存策略或减少空闲时间。  
- **浏览器集成即将上线**：`ollama launch` 扩展将支持 Chrome/Edge/Firefox/Brave（`#18752`），实现基于本地 Ollama 的浏览器智能助手——请关注早期访问机会。

> 🔗 [Issue #15453](https://github.com/ollama/ollama/issues/15453) | [PR #18763](https://github.com/ollama/ollama/pull/18763) | [Issue #18752](https://github.com/ollama/ollama/issues/18752)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

### **LiteLLM 摘要 — 2026-10-03**

---

#### **1. 今日亮点**  
LiteLLM v1.105.0-dev.2 引入通过 cosign 签名的 Docker 镜像，强化了发布流程中的安全性，提升了信任度。主要改进包括原生支持 Reka 和 QuickSilver Pro 作为 OpenAI 兼容提供商，实现与新兴 LLM 后端的无缝集成。关键修复解决了预算强制绕过、自定义模型成本追踪不准确以及 OTEL span 处理问题，确保计费和可观测性可靠。

---

#### **2. 发布与破坏性变更**  
- **v1.105.0-dev.2**：今日发布，通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53) 实现镜像签名加固。所有 Docker 镜像现已可密码学验证；请使用 `cosign verify` 及提交 `0112e53` 中提供的密钥进行签名验证。  
  🔗 [发布说明](https://github.com/BerriAI/litellm/releases/tag/v1.105.0-dev.2)  
- **安全补丁**：`anyio` 依赖项缺少版本约束，使用户暴露于已知死锁漏洞 ([agronholm/anyio#1145](https://github.com/agronholm/anyio/pull/1145))。已提交修复 PR (#44048) 但尚未合并——用户应临时锁定 `anyio>=3.7.0,<4.0.0`，直至修复完成。

---

#### **3. 新模型与硬件支持**  
- **Reka**：通过 PR [#44278](https://github.com/BerriAI/litellm/pull/44278) 作为首类 OpenAI 兼容提供商（`reka/`）加入，支持 `REKA_API_KEY` 和自动路由。  
- **QuickSilver Pro**：通过 JSON 配置提供者（`quicksilverpro/`）实现原生支持（PR [#44303](https://github.com/BerriAI/litellm/pull/44303)），支持成本追踪与统一 API 访问。  
- **Bedrock GPT-5.6+**：通过 PR [#40775](https://github.com/BerriAI/litellm/pull/40775) 添加对 `/chat/completions` 的原生支持，消除旧版 Converse 重写开销，降低延迟。  
- **Kimi K3**：修复因不支持 `cachePoint` 字段导致的流式阻塞问题（PR [#44292](https://github.com/BerriAI/litellm/pull/44292)）。

---

#### **4. 性能与优化**  
- **提示缓存效率**：PR [#44221](https://github.com/BerriAI/litellm/pull/44221) 通过避免完整对话分词来优化提示缓存资格判断，减少高吞吐推理时的 CPU 负载。  
- **OTEL Span 清晰度**：PRs [#44240](https://github.com/BerriAI/litellm/pull/44240) 与 [#44148](https://github.com/BerriAI/litellm/pull/44148) 按操作与表名重命名 Postgres spans，提升查询追踪与数据库性能分析能力。  
- **CI 并行化**：安全测试现已并行运行（PR [#44146](https://github.com/BerriAI/litellm/pull/44146)），在多核运行器上将 CI 运行时间减少约 40%。

---

#### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 状态 | 修复 PR |  
|--------|------|--------|--------|  
| ⚠️ 高 | v1.82.3 版本中即使超过 `max_budget` 仍可绕过预算强制 | 开放 | #26672 |  
| ⚠️ 高 | 自定义模型支出日志显示 `$0` 成本，尽管 `estimated_cost` 正确 | 开放 | #35691 |  
| ⚠️ 高 | `RateLimitError` 错误处理 `insufficient_quota`（不可重试） | 开放 | #32785 |  
| ⚠️ 中 | MCP 工具对 Ollama 模型自动执行被静默跳过 | 开放 | #31911 |  
| ⚠️ 中 | 流式重包装期间网页搜索结果丢失 | 开放 | #35333 |  
| ✅ 已修复 | 因 `REDIS_CLUSTER_NODES` 导致 Redis 集群关闭失败 | 已关闭 | #31206（修复已合并） |

> 注：多个回归问题影响企业级成本控制与代理可靠性——依赖预算或工具执行的用户应在生产部署前测试 `v1.105.0-dev.2`。

---

#### **6. 对应用开发者的意义**  
- **立即采用新提供商**：使用 `reka/` 与 `quicksilverpro/` 直接访问前沿模型，无需手动配置 `api_base`。  
- **确保准确的成本追踪**：若使用不在内置价格映射中的自定义模型（如 `deepinfra/deepseek-ai/DeepSeek-V4-Flash-0731`），请在 `model_prices_and_context_window.json` 中显式定义定价，避免出现 $0 计费。  
- **避免预算配置错误**：如需按密钥强制预算，请避开 `v1.82.3`，升级至 `v1.105.0-dev.2` 或更高版本。  
- **谨慎处理速率限制**：当 `code="insufficient_quota"` 时，不要重试 `RateLimitError`——应通过检查错误码区分瞬态与永久性失败。  
- **启用 OTEL v2 提升可观测性**：利用 [#43992](https://github.com/BerriAI/litellm/pull/43992) 等 PR 将缓存令牌数量作为 span 属性导出，实现细粒度追踪。

> 🛠️ **行动项**：在生产发布前，更新至 `v1.105.0-dev.2`，并验证部署中的 `cost_map`、`budget` 与 `mcp` 配置。

---  
*摘要基于 GitHub 活动（2026-10-03）整理。*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-10-03**

---

### **1. 今日亮点**  
Unsloth 继续在 Studio UI 方面进行演进，重点提升了模型管理和工具链功能，包括对多 GGUF 模型驻留的支持以及改进的聊天导出保真度。然而，从 `b10715-mix-86bd2d3` 及后续版本开始，关键性能回归问题浮现，导致双 GPU 配置下的张量拆分解码速度最慢可达 **2.9 倍下降**，暴露出近期推理内核的不稳定性。与此同时，用户报告微调过程中持续出现显存（VRAM）过度占用问题，甚至在内存未充分利用的情况下仍出现意外的 OOM 错误。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
但自 `b10715-mix-86bd2d3` 起的预编译二进制文件引入了重大回归（详见 [Issue #12468](https://github.com/unslothai/unsloth/issues/12468)），影响跨多 GPU 的张量拆分推理吞吐量。官方发布说明未提及此变更；若性能至关重要，建议回退至 `b10687-mix-67dfc8b` 或更早版本。

---

### **3. 新模型与硬件支持**  
- **Qwen3-TTS**：功能请求 (#3951) 表明用户对通过 Unsloth 实现 TTS 模型微调的需求日益增长，尽管该模型已完全兼容 Hugging Face，但当前仍缺乏微调集成支持。  
- **Gemma 3（仅文本变体）**：用户报告保存/加载视觉模型的仅文本变体时存在问题 ([#12554](https://github.com/unslothai/unsloth/issues/12554))，表明对多模态模型配置的处理尚不完整。  
- **Windows 与 WSL**：即使有可用显存，仍持续出现 CUDA OOM 错误 ([#1797](https://github.com/unslothai/unsloth/issues/1797), [#10017](https://github.com/unslothai/unsloth/issues/10017))，提示 Windows 平台存在更深层的驱动层或内存布局缺陷。

---

### **4. 性能与优化**  
- **推理性能下降**：在双 RTX 5070 Ti GPU 上使用张量拆分模式（`--split-mode tensor`）时，吞吐量从 `b10715` 之前的 **115–118 t/s** 下降至 `b10715-mix-86bd2d3` 之后的 **约 48 t/s** ([#12468](https://github.com/unslothai/unsloth/issues/12468))。这相当于 **2.9 倍性能下降**，可能源于 CUDA graph 限制（`max_cuda_graphs = 64`）变化或内核调度策略调整。  
- **微调显存开销过大**：用户报告微调过程消耗的显存显著高于预期，即使显存看似充足也触发 OOM 问题 ([#4504](https://github.com/unslothai/unsloth/issues/4504))。  
- **API 延迟**：兼容 OpenAI 的 API 在每个请求中增加约 **1.2 秒固定延迟**，无论工作负载大小如何 ([#12364](https://github.com/unslothai/unsloth/issues/12364))，严重拖慢短文本代理类应用的运行效率。

---

### **5. 稳定性与回归问题**  
| 严重程度 | 问题 | 描述 | 状态 |
|---------|------|-------------|--------|
| 🔥 高 | [#12468](https://github.com/unslothai/unsloth/issues/12468) | `b10715-mix-86bd2d3` 之后张量拆分推理速度下降 2.9 倍 | 开放 |
| 🔥 高 | [#4504](https://github.com/unslothai/unsloth/issues/4504) | 微调占用过多 VRAM，导致大模型出现 OOM | 开放 |
| ⚠️ 中 | [#12589](https://github.com/unslothai/unsloth/issues/12589) | 缺少用于功耗/性能调优的详细硬件监控模式 | 开放 |
| ⚠️ 中 | [#12571](https://github.com/unslothai/unsloth/issues/12571) | `max_context_length` 字段具有误导性（估算显存适配性，而非实际限制） | 开放 |
| 🟡 低 | [#12534](https://github.com/unslothai/unsloth/issues/12534) | 视觉大模型无法自动导入图像以供工具调用 | 开放 |

> ✅ **已有修复合并请求（PR）：**  
> - [PR #12564](https://github.com/unslothai/unsloth/pull/12564)：在 Studio UI 中实现跨聊天/项目/文件/模型的搜索功能  
> - [PR #12583](https://github.com/unslothai/unsloth/pull/12583)：当 TTS 达到最大 token 数时发出通知  
> - [PR #12574](https://github.com/unslothai/unsloth/pull/12574)：在 safetensors/MLX 模型上保留聊天历史中的工具调用

---

### **6. 对应用开发者的启示**  
- **若使用多 GPU 张量拆分推理，请避免近期预编译版本（`b10715+`）**——预计会出现严重的性能退化。请暂时使用 `b10687-mix-67dfc8b` 或更早版本，直到内核修复上线。  
- **对大模型微调需保持警惕**：显存使用远超预期——务必实时监控消耗情况，并考虑启用梯度检查点或降低批次大小。  
- **本地 API 工作负载将面临高开销**：`/v1/chat/completions` 接口中约 1.2 秒的固定延迟将成为低延迟代理的瓶颈。生产环境中建议直接调用 llama.cpp 后端以获得更高性能。  
- **善用新 Studio 功能**：可关注即将上线的基准测试页面（追踪于 [#11646](https://github.com/unslothai/unsloth/issues/11646)），通过扫荡推测解码和 KV Cache 设置，实现最优配置调优。  
- **留意模型特异性问题**：Qwen3-VL LoRA 加载失败 ([#3560](https://github.com/unslothai/unsloth/issues/3560))，视觉模型在图像摄入方面表现不佳 ([#12534](https://github.com/unslothai/unsloth/issues/12534))——请尽早使用目标栈进行测试验证。

> 💡 *建议：对于生产部署，建议从源码构建并锁定在 `b10715-mix-86bd2d3` 之前的提交版本，在目标硬件上验证推理吞吐量与微调显存占用情况。*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*