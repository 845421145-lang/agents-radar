# AI 基础设施日报 2026-10-14

> 生成时间: 2026-10-14 01:21 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-10-14**

---

### **1. 生态概览**  
AI推理与服务生态正进入*高度专业化与硬件趋同*阶段，各项目聚焦方向日益分化：vLLM与SGLang在下一代模型（如DeepSeek-V4、Qwen3.8）的高吞吐、低延迟分布式推理方面引领发展；而llama.cpp与Unsloth则更注重边缘效率与本地运行时性能。LiteLLM已确立为主导的网关层，支持多供应商路由与成本感知编排。关键基础设施短板——尤其在新型硬件（Blackwell SM120、AMD MI355X）上的稳定性问题及模型特异性回归缺陷——正在浮现，表明性能提升已超越可靠性成熟度。

---

### **2. 活动对比**

| 项目       | 开放问题数 (↑) | 合并的PR数 (↑) | 发布状态         |
|------------|----------------|----------------|------------------|
| **vLLM**   | 187 (+9)       | 12 (+3)        | 无新版本发布     |
| **SGLang** | 234 (+11)      | 8 (+5)         | 无新版本发布     |
| **llama.cpp** | 152 (+6)     | 10 (+4)        | 补丁修复；`b11604+` |
| **Ollama** | 211 (+13)      | 5 (+2)         | v0.40.3–v0.40.4 待发布 |
| **LiteLLM** | 178 (+8)      | 7 (+3)         | `v1.106.0-rc.2` 已发布 |

> 🔍 *趋势*：Ollama与SGLang的问题增长最快，反映出其部署活跃度高，但同时也暴露出不稳定性反馈循环。vLLM仍保持最高稳定性，但面临深层架构挑战（MoE、CUDA图）。LiteLLM在发布速度上领先，且以安全更新为主。

---

### **3. 模型支持竞赛**

| 新模型 / 架构               | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|------------------------------|------|--------|-----------|--------|---------|
| **Qwen3.8-Flash-Next**      | ✅ (#59575) | ✅ (`#39724`) | ❌ | ❌ | ❌ |
| **DeepSeek-V4.1-Flash**     | ⚠️ (SM120支持进行中) | ✅ (8× RTX PRO 6000) | ❌ | ❌ | ❌ |
| **Kimi-K3 / K2 Horizon MoE**| ✅ (PR #57149) | ✅ (PR #38344) | ❌ | ❌ | ❌ |
| **MiniCPM-V4.7**            | ❌ (Issue #48449) | ❌ | ✅ (PR #29416) | ❌ (#18983) | ❌ |
| **GLM-5.3-Flash**           | ⚠️ (ROCm前缀缓存损坏) | ✅ (PCP支持) | ⚠️ (`fa4`崩溃) | 🔴 (退化：#18980) | ❌ |
| **Gemini-4-Argon**          | ❌ | ❌ | ❌ | ❌ | ✅ (`continuationToken`) |
| **OpenInfer Provider**      | ❌ | ❌ | ❌ | ❌ | ✅ |

> 🏁 **领先者**：**SGLang** 在大型模型（DeepSeek-V4.1-Flash、GLM-5.3-Flash）的实际生产支持方面领先，尤其在仅支持PCIe的多GPU部署场景中表现突出。**LiteLLM** 在API级模型创新方面胜出（如Gemini自动续写、视频生成）。

---

### **4. 性能前沿**

| 关注领域             | vLLM                          | SGLang                        | llama.cpp                   | Ollama                     | LiteLLM                    |
|----------------------|-------------------------------|-------------------------------|-----------------------------|----------------------------|----------------------------|
| **KV缓存效率**       | ✅ 异构词表推测解码（MRV2）     | ⚠️ HiCache PD中缓存陈旧         | ❌ Vulkan设备丢失           | ❌ `glm-5.3-flash:cloud` 退化 | ❌ MCP工具令牌计数器崩溃 |
| **批处理与并行性**   | ✅ 推测解码、PLE固定            | ✅ 预填充CP扩展、DCP           | ⚠️ FlashAttention回归       | ❌ 线程调度忽略cgroup       | ❌ `complexity_router` 覆盖 `max_tokens` |
| **量化**             | ✅ FP8 Triton、NVFP4、W4A4      | ✅ `--fp4-gemm-backend marlin` | ✅ SME2 Q4_K/Q6_K、Hexagon电源模式 | ❌ 未突出量化支持           | ❌ 无量化重点               |
| **分布式服务**       | ✅ MRV2、混合SSM/GDN PD解耦     | ✅ HiCache解耦、DCP             | ❌ 仅本地支持                | ❌ 无分布式支持              | ✅ 多供应商路由（OpenInfer、Bedrock） |
| **内核优化**         | ✅ DeepGEMM MegaMoE、ROCm FP8调优 | ✅ 单内核RFC、BCG自动启用       | ✅ Vulkan子组聚合           | ❌ MLX/Metal static_assert崩溃 | ❌ 非核心关注点             |

> 🔥 **热点区域**：  
> - **vLLM/SGLang**：在大规模场景下持续优化推测解码与分布式推理。  
> - **llama.cpp**：通过ARM/Hexagon/NPU支持及轻量级内核实现边缘效率。  
> - **LiteLLM**：在复杂环境中提供可观测性所需的遥测与成本追踪。

---

### **5. 层级定位**

| 项目       | 主要层级                 | 核心差异化特征                                  |
|------------|--------------------------|------------------------------------------------|
| **vLLM**   | **高性能服务引擎**       | GPU优化内核、MoE专项、MRV2架构                  |
| **SGLang** | **高吞吐推理栈**         | 预填充CP、HiCache解耦、大模型专用PCP/DCP         |
| **llama.cpp** | **本地运行时与边缘推理** | WebGPU/Vulkan/Hexagon支持、低占用设计          |
| **Ollama** | **Agent与云集成网关**    | `ollama launch`、Wirken集成、云模型生命周期管理 |
| **LiteLLM** | **多供应商API网关**      | 成本追踪、遥测聚合、代理安全                     |

> 📊 **定位洞察**：  
> - **vLLM/SGLang** 正构建大规模LLM部署的基石。  
> - **llama.cpp** 在轻量级、跨平台推理领域占据主导地位。  
> - **Ollama/LiteLLM** 作为应用层粘合剂——Ollama用于代理工作流，LiteLLM用于可观测性与支出控制。

---

### **6. 趋势信号**

#### **从今日活动提取的行业趋势：**  
1. **硬件专业化加速推进**：各项目正竞相支持 **AMD MI355X**、**Blackwell（SM120）** 与 **Snapdragon X Elite NPU** —— 表明计算范式正从仅依赖NVIDIA向异构计算演进。  
2. **推测解码趋于成熟**：vLLM与SGLang现已支持 **异构词表草稿模型** 与 **预填充上下文并行**，推动吞吐极限不断突破。  
3. **稳定性已成为新瓶颈**：尽管性能飞跃，但 **前缀缓存回归（GLM-5.3/ROCm）**、**CUDA崩溃（Ollama）** 与 **令牌计数失败（LiteLLM）** 等问题暴露了大模型部署复杂性的加剧。  
4. **代理编排成为核心**：Ollama对 **Wirken** 的集成以及LiteLLM的 **MCP工具链** 反映出系统正转向安全、可审计的代理体系，而不仅是模型服务。  
5. **安全与可观测性不容妥协**：LiteLLM的 **cosign签名镜像** 与 **聚合遥测接收端** 表明，生产级基础设施必须具备“信任即设计”与审计追踪能力。

#### **应用开发者应重点关注：**  
- **避免使用 `glm-5.3-flash:cloud`**，直到Ollama解决 #18980 —— 存在输出退化的数据完整性风险。  
- 若使用全分片LoRA或推测解码，请**锁定vLLM `v0.29.0` 或更早版本** —— 已知存在死锁风险。  
- **升级至 `b11604+` 版本的 llama.cpp**，以防止高负载下的栈溢出崩溃。  
- **利用 LiteLLM 的遥测功能**，适用于隔离或受监管环境——它是少数具备隐私保护可观测性的工具之一。  
- **关注 SGLang 的单内核 RFC** —— 这可能重新定义未来推理引擎中的内核调度方式。

> ✅ **最终结论**：AI基础设施格局已不再单纯追求极致速度，而是转向 **可靠性、安全性与可组合性**。根据你的部署场景选择合适技术栈：大规模部署选（vLLM/SGLang），设备端运行选（llama.cpp），构建代理系统选（Ollama/LiteLLM）。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest – 2026-10-14

---

### **1. 今日亮点**  
vLLM 项目持续加速对下一代模型与硬件的支持，针对 Model Runner V2 (MRV2) 的推测解码修复了关键问题，并在 ROCm/AMD 后端上显著提升了 Qwen3.8 与 Kimi K3 的性能。一项重大 PR 将 DeepGEMM MegaMoE 专家统一到单一抽象层下，简化了 DeepSeek-V4、Kimi-K3 及未来变体的 MoE 推理流程。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无报告。*  
今日未合并或发布任何新版本，也无破坏性 API/配置变更。

---

### **3. 新模型与硬件支持**  
- **SM8x (Ampere: A100/A800/RTX 30xx)**：功能请求 #50576 正在推动对 `DeepSeek-V4-Flash` 与 `DeepSeek-V4-Flash-0731` 在 SM8x 上的完整支持——目前受限于缺失的内核兼容性。  
- **ROCm / AMD MI355X**：针对 `amd/Qwen3.8-2.4T-A95B-Quark-MXFP4` (#57149) 与 `Qwen3.8-Flash-Next` (#59575) 的优化工作正在进行中，目标架构为 gfx950。  
- **Intel XPU (MLA)**：PR #58297 已将 XPU MLA 支持集成至现有的 `FLASH_ATTN_MLA` 后端，实现 Intel GPU 上的混合模型执行。  
- **混合 SSM/GDN 模型**：正在推进 `Qwen3.5-397B-A17B-W8A8` 等模型的 PD 分离与 KV 传输支持（#43765）。  

> 🔗 [Issue #50576](https://github.com/vllm-project/vllm/issues/50576) | [PR #58297](https://github.com/vllm-project/vllm/pull/58297)

---

### **4. 性能与优化**  
- **ROCm 性能**：PR #61091 引入了针对 RDNA4（Radeon AI PRO R9700）优化的原生逐标记 FP8 Triton 线性后端，提升了动态扩展效率。  
- **推测解码**：PRs #59260 与 #59468 优化了内核预热与槽位预留逻辑，消除了早期请求阻塞问题，降低了调度器开销。  
- **KV 缓存效率**：PR #61536 在 MRV2 上启用了异构词表草稿模型（TLI），拓展了推测解码的应用场景。  
- **内存占用**：PR #59848 将卸载的 PLE 表固定在精确大小，使 GB10 上每副本的主机内存使用量从约 65 GiB 降至约 47.8 GiB。  

> 🔗 [PR #61091](https://github.com/vllm-project/vllm/pull/61091) | [PR #59848](https://github.com/vllm-project/vllm/pull/59848)

---

### **5. 稳定性与回归问题**  
- **CUDA Graph 死锁**：PR #60845 报告在启用 `--fully-sharded-loras` 的融合 MoE LoRA 服务时出现间歇性死锁，影响 TP=2/4 配置。*尚未修复*，但已持续追踪。  
- **GLM-5.3 前缀缓存损坏**：Issue #54359 确认由于块大小不匹配导致 ROCm 上出现无声的 KV 缓存覆盖；模型输出仍流畅，但长上下文召回能力下降。  
- **Inkling-Small-NVFP4 在 SM120 上崩溃**：Issue #51405 揭露 `tml_fa4` 内核缺少分页 KV 支持，阻碍 Blackwell（SM120）上的部署。  
- **MiniCPM-V-4.6 加载失败**：Issue #48449 在 vLLM 0.25.0+ 中持续存在，原因是对 `qkqkv_proj` 模块名识别失败。  
- **vLLM OpenAI 图像启动失败**：Issue #60406 显示 `vllm/vllm-openai:v0.31.0-cu129` 因 CUDA 13 依赖冲突与捆绑的 torchcodec 0.17.0 不兼容而无法启动。  

> 🔗 [Issue #60845](https://github.com/vllm-project/vllm/issues/60845) | [Issue #54359](https://github.com/vllm-project/vllm/issues/54359) | [PR #60406](https://github.com/vllm-project/vllm/pull/60406)

---

### **6. 对应用开发者的启示**  
- **谨慎使用 MRV2**：若部署带有异构词表或全分片 LoRA 的推测解码，可能遭遇死锁或崩溃——请密切关注已知问题。  
- **AMD 用户**：预计即将推出的 Qwen3.8 优化将带来显著性能提升；建议使用 `--linear-backend triton` 测试 FP8 扩展能力。  
- **混合模型（SSM/GDN）**：PD 分离支持仍处于实验阶段；除非 #43765 已落地，否则避免用于生产环境。  
- **长上下文应用**：注意 GLM-5.3/ROCm 上前缀缓存损坏风险，若精度至关重要，建议禁用该功能。  
- **部署稳定性**：除非已准备好处理近期回归问题（如 MiniCPM、Inkling、TorchCodec），否则建议锁定至 `v0.29.0` 或更早版本。  

> ✅ 小贴士：提交问题时请使用 `collect_env.py` 并附上环境详情——这将大幅加快问题排查速度。

---  
*本摘要源自 GitHub 活动：[vllm-project/vllm](https://github.com/vllm-project/vllm)*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 消息简报 – 2026-10-14**

---

### **1. 今日重点**  
SGLang 项目持续推进高吞吐、低延迟推理基础设施建设，在 **预填充上下文并行（PCP）** 和 **HiCache 分离架构** 方面取得关键进展，尤其针对 DeepSeek-V4.1 与 GLM-5.3-Flash 在 SM120 硬件上的表现。目前正积极排查影响 PR 验证流程的关键 CI 稳定性问题，包括不稳定的测试和基础设施故障。

---

### **2. 发布与重大变更**  
*过去 24 小时内未报告新发布或重大变更。*

---

### **3. 新模型与硬件支持**  
- ✅ **DeepSeek-V4.1-Flash**：已在 **8× RTX PRO 6000（SM120，仅 PCIe）** 上成功部署生产环境 —— 现场报告确认配置正常，已测量吞吐量并完成推测解码 A/B 测试 ([#40877](https://github.com/sgl-project/sglang/issues/40877))。  
- ✅ **GLM-5.3-Flash**：全面支持所有注意力后端的 PCP（Trtllm MHA 已完成），同时正在努力稳定 SM120 上的 `fa4` 后端 ([#42012](https://github.com/sgl-project/sglang/issues/42012))。  
- ✅ **AMD ROCm 支持**：对 AMD GPU 上的 **GLM-5 / DeepSeek-V3.2** 扩展 DCP（解码上下文并行）支持 ([#42618](https://github.com/sgl-project/sglang/pull/42618))。  
- ✅ **T-Head SAIL**：启动对 Zhenwu 810/810E/M890P 显卡的一流集成路线图 ([#37519](https://github.com/sgl-project/sglang/issues/37519))。

---

### **4. 性能与优化**  
- ⚡ **权重缓存守护进程（第一阶段）**：实现 Qwen3-235B FP8 的权重加载时间低于 1 秒（此前约 306–327 秒），通过每秩 CUDA IPC 守护进程实现快速引擎恢复 ([#33522](https://github.com/sgl-project/sglang/issues/33522))。  
- 🔁 **预填充 CP 扩展**：推进 FlashInfer 后端对 PCP 的集成工作（`#33226`），并扩展对 **Qwen3.8-Flash-Next**（`#39724`）和 **Kimi-K3**（`#38344`）的支持。  
- 📈 **BCG 自动启用**：针对受支持的预填充 CP 配置，正在开发自动可中断 CUDA 图（BCG）选择功能（`#44022`）。  
- 💡 **单核框架提案（Monokernel RFC）**：提议以插件化框架形式引入单核（monokernels），统一内核调度机制，提升运行时安全性和性能（`#43949`）。

---

### **5. 稳定性与回归问题**  
- 🔥 **严重崩溃**：在 **GLM-5.3-Flash**（SM120）上，`fa4` 注意力后端在 CUDA 图捕获时发生崩溃，导致只能依赖 Triton 后端（`#42012`）。  
- 🔥 **PD 分离中的旧 KV 问题**：早期缓存前缀发送可能在 HiCache 恢复未完成时触发 **无声的旧 KV 传输**（`#44070`），存在输出错误风险。  
- 🔥 **NVFP4 W4A4 崩溃**：使用 `--fp4-gemm-backend marlin` 在 SM100 上失败，因 `mm_fp4` 内核中缺少 'marlin' 后端（`#43988`）。  
- ⚠️ **错误的标记计数**：`bench_serving --dataset-name openai` 将每个提示错误计为 2 个标记（由 Transformers v5 分词器不匹配引起）（`#43929`）。  
- ⚠️ **原生 gRPC Generate 限制**：若未设置 `max_new_tokens`，输出将被截断至最多 128 个标记（`#44121`）。  
> *部分问题已有修复合并请求（如 #44070 正待评审）；其他问题仍开放且尚未提出修复方案。*

---

### **6. 对应用开发者的影响**  
- **在仅 PCIe 多 GPU 环境（如 8× RTX PRO 6000）上部署大型模型（如 DeepSeek-V4.1-Flash）现在已成为可行方案** —— 可谨慎使用 `SGLANG_DISAGG_PREFILL_EARLY_SEND_CACHED_PREFIX=1`，避免旧 KV 错误。  
- **使用 `--dcp-size`** 可降低 NVIDIA 与 AMD GPU 上 MLA 模型的内存开销 —— DCP 支持正快速成熟。  
- **在 GLM-5.3-Flash 上暂勿使用 `fa4` 后端**，请以 **Triton** 作为备用。  
- **监控 gRPC API 中的 `max_new_tokens` 设置**，防止静默截断。  
- **对于高级优化需求**，可考虑参与 **单核框架提案**（`#43949`）或 **KVPress 集成**（`#10585`），探索下一代缓存压缩与路由策略。  

> 🔗 [GitHub 问题仪表板](https://github.com/sgl-project/sglang/issues) | [Slack 社区](https://slack.sglang.io)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# **llama.cpp 汇报 – 2026-10-14**

---

### **1. 今日重点**  
最新更新聚焦于 WebGPU 与服务器后端的关键稳定性修复，包括在高负载下处理提示时因 `std::regex_replace` 出现栈溢出崩溃，可能导致 HTTP 线程宕机。在 Vulkan 后端引入关键优化，通过利用完整子组计算提升大池化窗口性能。此外，聊天输出格式已重构为“部分”数组形式，而非单一字符串，为未来选择性解析令牌提供支持。

---

### **2. 发布与破坏性变更**  
- **WebGPU**：修复专家 ID 重复时的 `mul_mat_id` 行为（#30451），移除了“令牌不会两次选择同一专家”的假设 —— 可能影响自定义 MoE 路由逻辑。  
  🔗 [PR #30451](https://github.com/ggml-org/llama.cpp/pull/30451)  
- **服务器**：修复了用于转义特殊令牌（如 `<|name|>`）的 `std::regex_replace` 中严重的栈溢出问题 —— 现在使用安全字符串转义，防止线程栈耗尽。  
  🔗 [PR #30243](https://github.com/ggml-org/llama.cpp/pull/30243)  
- **聊天输出**：引入结构化输出，以“部分”数组（如文本、工具调用）替代扁平字符串，使下游应用可更精细地控制令牌处理。  
  🔗 [PR #30389](https://github.com/ggml-org/llama.cpp/pull/30389)

> ⚠️ **迁移提醒**：依赖 `chat` 输出原始字符串的应用需调整代码以适配新的 `parts` 结构。

---

### **3. 新模型与硬件支持**  
- **模型支持**：新增对 **Qwen4exp** 的支持，包含针对专家投影宽度不匹配的正确填充，以及对 64 位数组元数据的处理。同时新增对 **MiniCPM-V 4.7** 支持，含 3D RoPE。  
  🔗 [PR #30316](https://github.com/ggml-org/llama.cpp/pull/30316), [PR #29416](https://github.com/ggml-org/llama.cpp/pull/29416)  
- **硬件后端**：  
  - **Hexagon**：通过 `--hex-power-mode` 添加可配置的 HTP DCVS/HMX 电源模式。  
    🔗 [PR #30423](https://github.com/ggml-org/llama.cpp/pull/30423)  
  - **Vulkan**：为 Intel GPU 增加 Intel Flash Attention 内核用于预填充，提升性能。  
    🔗 [PR #29357](https://github.com/ggml-org/llama.cpp/pull/29357)  
- **量化**：新增对 ARM 加速器上效率更高的 **SME2 Q4_K 与 Q6_K** 矩阵乘支持。  
  🔗 [PR #29219](https://github.com/ggml-org/llama.cpp/pull/29219)

---

### **4. 性能与优化**  
- **Vulkan**：通过每输出使用完整子组优化 `pool_2d`，降低大池化窗口的内核启动开销，在 RDNA3 及更新架构上显著提升吞吐量。  
  🔗 [PR #30119](https://github.com/ggml-org/llama.cpp/pull/30119)  
- **SYCL**：修复 `mul_mat`、分块缓冲区及主机池操作中的内存错误；同时解决编译警告（缺少原型声明、死代码等）。  
  🔗 [PR #29889](https://github.com/ggml-org/llama.cpp/pull/29889), [PR #30271](https://github.com/ggml-org/llama.cpp/pull/30271)  
- **Meta 后端**：现在在内存区域重新分配时重建所有子图，防止旧图引用导致崩溃。  
  🔗 [PR #30453](https://github.com/ggml-org/llama.cpp/pull/30453)

> 📈 **预期影响**：在使用大池化核的 Vulkan 上，长上下文推理速度有望提升至 2 倍；多后端工作流中整体内存安全性增强。

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：`llama-server` 在处理极长名称提示（如 d1-omni、kev 模型）时，因 `std::regex_replace` 栈溢出而崩溃。已在 #30243 修复。  
  🔗 [Issue #30243](https://github.com/ggml-org/llama.cpp/issues/30243)  
- **Vulkan 设备丢失**：在 AMD Strix Halo（gfx1151）上，长时间上下文 + 高 `ubatch` 场景下报告 `decode() failed: vk::Queue::submit: ErrorDeviceLost`。  
  🔗 [Issue #30010](https://github.com/ggml-org/llama.cpp/issues/30010)  
- **Flash Attention 回归**：在 Intel Arc B580 上，FA 回退到 SCALAR 路径导致 PP 性能降为 O(N²) 并引发设备丢失。  
  🔗 [Issue #27638](https://github.com/ggml-org/llama.cpp/issues/27638)  
- **OpenVINO 崩溃**：因 Core Ultra 7 265k 上 AVX-512 对齐错误导致 `STATUS_ILLEGAL_INSTRUCTION`。  
  🔗 [Issue #28726](https://github.com/ggml-org/llama.cpp/issues/28726)  

> ✅ **修复可用**：多数问题已有开放或合并的 PR（如 #30243, #29357）。用户应升级至构建版本 `b11604+`。

---

### **6. 对应用开发者的影响**  
- **采用结构化聊天输出**：开始从 `output_string` 迁移到 `parts` 数组，以更好控制工具调用、特殊令牌和流式传输。这有助于实现更安全的 JSON 模式验证与语法生成。  
  🔗 [PR #30389](https://github.com/ggml-org/llama.cpp/pull/30389)  
- **避免过长提示名称**：若使用 `d1-omni` 或 `kev` 模型，请确保提示内容中不含极长的 `<|name|>` 字段 —— 修复已上线，但旧版本仍存在风险。  
- **利用新量化格式**：在 ARM 设备（如 Apple Silicon、Hexagon）上使用 **SME2 Q4_K/Q6_K** 以获得更低延迟与更高能效。  
- **监控 Vulkan/Intel 性能**：若部署于 Intel Arc GPU，需确认启用了 Flash Attention（`--flash-attn`），并避免在长上下文场景中设置 `ubatch > 128`，直到 #30010 解决。  
- **谨慎管理缓存内存**：`--cache-ram` 限制现已严格生效（修复于 #25070），因此若依赖提示缓存，请勿将其设得太低。

> 🛠️ **建议**：立即升级至 `b11604` 或更高版本，以规避已知崩溃并享受稳定性提升。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-10-14**

---

### **1. 今日亮点**  
Ollama 持续扩展其代理与云集成生态系统，现通过 `ollama launch` 新增对 **Wirken**（一个开源代理网关）的支持。关键稳定性修复已合并至 **MLX on Apple M5**（PR #14604），解决了阻碍 Metal 后端使用的 static_assert 崩溃问题。与此同时，性能退化问题正在调查中——部分用户报告自 v0.40.3 版本以来，所有模型的吞吐量下降高达 **30%**，另有用户观察到 `glm-5.3-flash:cloud` 在 10 月 12 日后出现严重输出退化。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
- **待处理**：PR #18985（修复：允许免费层使用 PAYG 模型）和 PR #18986（澄清云支付错误）旨在提升 Ollama Cloud 用户体验。  
- **文档**：PRs #18972 与 #18981 重构云文档并统一术语（如“Ollama 的云”），提升可发现性与一致性。  
- **模型创建**：PR #18990 确保在模型创建过程中正确处理空的 `SYSTEM ""` 提示，防止意外继承系统提示。

---

### **3. 新模型与硬件支持**  
- **硬件**：  
  - **高通骁龙 X Elite NPU & GPU**：功能请求 #5360（68 👍）呼吁为 Windows AIPC 设备原生支持 ARM/NPU——这对本地 LLM 推理至关重要。  
  - **Blackwell RTX 5060 Ti / 5070 Ti**：Issue #18232 指出一个与 Flash Attention MMA 内核内存分配相关的 CUDA 崩溃，由 `num_ctx` 引起；根本原因已确认，等待修复。  
- **模型**：  
  - **K2 Horizon 系列**（0.9B–36B MoE）：在 #18698 中提出请求（6 👍），由 MBZUAI IFM 提供官方 GGUF 格式，支持 `k2-horizon` 架构。  
  - **MiniCPM-V4.7:35b-a3b**：在 Windows 上因未知投影器类型（`minicpmv4_7`）失败——问题 #18983 显示 CLIP 模型加载失败。

---

### **4. 性能与优化**  
- **性能退化**：自 v0.40.3 版本以来，用户报告所有模型的每秒令牌数（tokens/sec）下降 **25–30%**（问题 #18968）。基准日志表明，这是系统性延迟，不局限于特定硬件。  
- **CUDA/MLX 优化**：  
  - PR #18993 升级 MLX 版本；但此操作加剧了 qwen3.5 模型中的思考循环问题（已在 PR 描述中注明）。  
  - PR #17956 优化了 CUDA 运行时负载去重，减少二进制体积并改善加载时间。  
- **线程调度**：问题 #17916 揭露 Ollama 忽略 cgroup CPU 配额，导致在 CPU 有限的容器中因过度线程生成引发 **约 45 倍吞吐量崩溃**。  
- **内存效率**：PR #17956 还改进了 CUDA/MLX 依赖项的运行时路径发现机制，增强进程隔离。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 状态 |
|--------|------|------|------|
| 🔴 高 | #18980 | `glm-5.3-flash:cloud` 自 10 月 12 日起出现 **严重退化**（重复输出 "the = the ="），疑似主机端数据损坏（probe2.img 全零）。 | 开放 |
| 🔴 高 | #18983 | `openbmb/minicpm-v4.7:35b-a3b` 在 Windows（0.40.3）上报错 `unknown projector type: minicpmv4_7`。 | 开放 |
| 🟡 中 | #18796 | `ollama run` 在第二次调用时无限挂起（树莓派 5，Debian 13，systemd 服务）。 | 开放 |
| 🟡 中 | #18944 | 当设置 `format: json` 时工具调用失败——模型要么幻觉输出，要么拒绝调用工具。 | 开放 |
| 🟡 中 | #17380 / #18232 | 在 Windows 上间歇性出现 **CUDA 错误：共享对象初始化失败**（RTX 5070 Ti / Blackwell 显卡）；与 Flash Attention 内核内存分配有关。 | 开放 |

> ✅ **修复进行中**：PR #14604 修复 M5 Metal 崩溃（static_assert）。其他高严重性问题暂无活跃修复分支。

---

### **6. 对应用开发者的影响**  
- **代理集成**：通过 `ollama launch` 新增 **Wirken**（PR #18989）支持，实现安全、可审计的代理工作流，包括加密凭据库与沙箱化工具执行——非常适合生产环境代理系统。  
- **云模型使用**：使用 **PAYG 模型**需谨慎——免费用户仍可能因错误处理不当被阻断（PR #18985 待定）。清晰的错误提示（PR #18986）将有助于避免混淆。  
- **稳定性风险**：在 #18980 修复前，请避免使用 `glm-5.3-flash:cloud`；若性能关键，建议回滚至 v0.40.1。  
- **系统设计**：若部署于容器环境，请通过 `n_threads` 或 cgroups 显式限制 CPU 线程数——当前 Ollama 忽略 `cpu.max`（问题 #17916）。  
- **模型定制**：在 Modelfile 中使用 `SYSTEM ""` 可覆盖基础系统提示（PR #18990），并对小模型禁用 `thinking`（PR #18991）以防止循环。

👉 *关注*：[Ollama GitHub](https://github.com/ollama/ollama) 获取关于回归与功能上线的实时更新。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# **LiteLLM 消化报告 – 2026-10-14**

---

### **1. 今日亮点**  
最新发布的 `v1.106.0-rc.2` 版本通过 cosign 签名的 Docker 镜像增强了安全性，并修复了 MCP 工具处理、成本追踪和模型路由中的关键稳定性问题。重点 PR 包括 Gemini-4-Argon 长输出自动续传功能，以及对隔离环境的改进遥测支持，标志着对生产环境可靠性与可观测性的重视。

---

### **2. 发布与破坏性变更**  
- **`v1.106.0-rc.2`** 已发布，所有 Docker 标签均强制启用 **cosign 镜像签名**。所有版本均使用 [提交 `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 引入的同一密钥进行签名。  
- **安全修复**：`fix(proxy): hide project creation database errors` ([PR #46330](https://github.com/BerriAI/litellm/pull/46330)) 现在返回通用 500 错误，不再暴露原始数据库堆栈轨迹。  
- **遥测优化**：新增 `AggregatingSink`、`Report` 与 `HttpExporter` 组件 ([PRs #45487–#45490](https://github.com/BerriAI/litellm/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3Adevin-ai-integration%5Bbot%5D+telemetry))，支持可扩展、注重隐私的代理遥测——包括管理员界面导航追踪。

---

### **3. 新模型与硬件支持**  
- ✅ **Gemini-4-Argon 自动续传**：PR [#46240](https://github.com/BerriAI/litellm/pull/46240) 支持使用 `continuationToken` 自动恢复长输出，消除每次调用最多 32K token 的截断限制。  
- ✅ **MiniMax 视频生成**：通过 `/v1/videos` 添加对 `minimax/h3` 与 `h3-max` 的支持 ([PR #43705](https://github.com/BerriAI/litellm/pull/43705))，包含定价与生命周期管理。  
- ✅ **OpenInfer 提供商**：现作为 OpenAI 兼容后端原生支持 ([PR #41034](https://github.com/BerriAI/litellm/pull/41034))，支持自托管部署的成本追踪与路由。

---

### **4. 性能与优化**  
- **遥测可扩展性**：新 `AggregatingSink` 通过将事件折叠为固定桶直方图与按令牌求和的行，显著降低单请求遥测开销 ([PR #45487](https://github.com/BerriAI/litellm/pull/45487))。  
- **成本准确性**：修正 Bedrock 跨区域推理配置的误计费问题，使成本计算与部署级费率保持一致 ([PR #46288](https://github.com/BerriAI/litellm/pull/46288))。  
- **延迟缓解**：`complexity_router` 现在尊重调用方提供的 `max_tokens`，不再以层级上限覆盖其值 ([Issue #44869](https://github.com/BerriAI/litellm/issues/44869)，功能请求)。

---

### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR | 备注 |
|------|----------|--------|--------|-------|
| [Bug: LiteLLMProxy 向用户显示空白模型](https://github.com/BerriAI/litellm/issues/17475) | 🔴 高 | 开放 | N/A | 影响团队可见性；更新后仅管理员可访问 |
| [Bug: MCP 工具固定忽略 `outputSchema`/`readOnlyHint`](https://github.com/BerriAI/litellm/issues/44093) | 🟡 中 | 开放 | N/A | 无告警可能导致破坏性漂移 |
| [Bug: `token_counter` 在缺少 `items` 的数组工具上崩溃](https://github.com/BerriAI/litellm/issues/46052) | 🔴 高 | 开放 | N/A | 导致 `count_tokens` 返回 500；影响 MCP 集成 |
| [Bug: OpenRouter 流式输出报告错误的模型名称](https://github.com/BerriAI/litellm/issues/46095) | 🟡 中 | 开放 | N/A | 日志误导；影响追踪与监控 |
| [Bug: `ModuleNotFoundError: No module named 'mcp'`](https://github.com/BerriAI/litellm/issues/46045) | 🔴 高 | 开放 | N/A | 在干净环境中阻塞安装 |

> ⚠️ 多个 MCP 工具链、成本逻辑与认证流程的回归问题表明，多提供方路由机制仍存在持续复杂性。

---

### **6. 对应用开发者的意义**  
- **使用 `v1.106.0-rc.2`** 以获得更好的安全性（签名容器）和生产代理中更健壮的错误处理。  
- **避免使用 `bedrock_mantle/us.openai.gpt-6.1-sol`**，直到 PR #46247 解决——当前返回空响应。  
- **若运行于受监管或隔离环境**，请充分利用新遥测功能——数据可本地聚合并安全导出。  
- **谨慎验证 MCP 工具模式**：具有 `type: array` 但无 `items` 定义的工具将导致 `token_counter` 崩溃。建议飞行前进行模式校验。  
- **预期未来更新**将聚焦成本透明度，尤其是跨区域 Bedrock 和 Azure AI 模型——由于不存在，`azure_ai/claude-fable-5-5` 已被移除 ([PR #46332](https://github.com/BerriAI/litellm/pull/46332))。

👉 **建议**：在部署至关键任务型智能体系统前，密切关注 GitHub 上 MCP 与成本相关漏洞的修复进展。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-10-14**

#### **1. 今日亮点**  
v0.1.907-beta 版本全面提升了性能，UI/UX 响应速度最高提升 **10 倍**，推理速度最高提升 **5 倍**，得益于优化后的缓存（命中率高达 95%）、MoE Strata 风格的优化以及关键性能瓶颈修复。新的压缩优化现已统一应用于所有 API，显著增强基于浏览器的工作流体验。

#### **2. 发布与破坏性变更**  
- **v0.1.907-beta**：今日发布，带来显著性能提升和更广泛的浏览器支持。未报告任何破坏性变更；现有工作流保持向后兼容。  
  🔗 [GitHub Release](https://github.com/unslothai/unsloth/releases/tag/v0.1.907-beta)

#### **3. 新模型与硬件支持**  
- **未新增模型架构**，但社区持续反馈表明以下需求日益增长：  
  - **Ling 3.0** (#8532)  
  - **Voxtral** (#3013)  
  - **Gemma4e2b on Windows** (#13388)  
- **硬件**：PR #13671 引入了在旧版 NVIDIA 驱动（< CUDA 12）下自动回退至 Vulkan 或 CPU `llama.cpp` 套件的功能，显著改善低配设备在 Windows 上的 GPU 兼容性。  
  🔗 [PR #13671](https://github.com/unslothai/unsloth/pull/13671)

#### **4. 性能与优化**  
- **推理速度最高提升 5 倍**，得益于 MoE 工作负载中 95% 的缓存命中率、MoE Strata 风格的内存管理以及优化的内核分发机制。  
- **UI/UX 加速**：在多聊天场景下，状态更新与渲染延迟降低，响应速度最高提升 **10 倍**。  
- **H100 专属修复**：PR #13619 在构建缺少 `sm_90a` 内核时禁用 xformers FA3，防止训练过程中崩溃。  
  🔗 [PR #13619](https://github.com/unslothai/unsloth/pull/13619)

#### **5. 稳定性与回归问题**  
- **严重回归**：当目标为同源端点（如 HF 模型搜索）时，浏览器面板 API 调用失败。已在 PR #13664 中修复。  
  🔗 [PR #13664](https://github.com/unslothai/unsloth/pull/13664)  
- **高负载崩溃**：多 GPU 训练中仍存在内存溢出问题（Issue #4685），目前尚未提交修复方案。  
- **模型同步失败**：多个用户访问共享本地模型时出现状态不一致（Issue #12365）。  
- **TTS 截断问题**：朗读超过 2048 个 token 时会失败，除非手动配置（PR #13648 正在进行中）。  
  🔗 [PR #13648](https://github.com/unslothai/unsloth/pull/13648)

#### **6. 对应用开发者的意义**  
开发者现在可大规模部署高吞吐量 LLM 应用，实现**近乎实时的 UI 交互**与**亚秒级推理延迟**。新缓存层与 MoE 优化使在普通硬件上高效运行 Qwen3-MoE、Mistral3.2 等大模型成为可能。然而，**多用户/本地模型共享仍不稳定**——请避免在缺乏显式会话隔离的共享推理服务器上使用。对于生产环境智能体，**务必始终使用 `--random-seed`**（修复 PR #13637 待合并），以确保 LoRA 训练可复现。未来化布局建议采用新功能：**计划任务工作流（PR #13539）** 和 **浏览器到 API 路由修复（PR #13664）**，构建健壮的智能体编排系统。  

👉 *建议*：立即升级至 v0.1.907-beta 以获取性能提升；关注 PR #13664 与 #13648，确保智能体工具链稳定可用。

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*