# AI 基础设施日报 2026-09-28

> 生成时间: 2026-09-28 01:05 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目 AI 基础设施生态报告 – 2026-09-28**

---

### **1. 生态概览**  
AI 推理与服务生态正进入 *高度专业化与硬件收敛* 阶段，各项目在目标层级（服务、训练、网关、本地运行时）上愈发分化，同时在性能关键优化方面趋于一致。vLLM 和 SGLang 在现代 GPU 上主导高吞吐、低延迟推理引擎；llama.cpp 与 Unsloth 则聚焦于跨异构硬件的可移植性与微调效率。LiteLLM 成为占主导地位的多提供商路由层，现正向基于 Rust 的安全性和可观测性演进。FP8、NVFP4 及混合注意力模型（如 Qwen4Exp、KimiViT）的快速采用，标志着向 *打包张量执行* 与 *内存感知推理* 的转变，这由下一代加速器（如 DGX Spark (GB10)、Hopper/Blackwell、RTX 5090）对更高吞吐的需求所驱动。

---

### **2. 活动对比**

| 项目       | 开放问题数 | 近 24 小时合并的 PR | 发布状态 | 关键备注 |
|---------------|-------------|------------------------|----------------|---------|
| **vLLM**      | 387         | 12                     | 无           | 重点在正确性（批处理不变性）、融合内核（GDN/QK-RoPE）及稳定性修复 |
| **SGLang**    | 512         | 8                      | 无           | 高严重性崩溃（CUDA 核心转储），AMD/Intel 支持增长，推测解码不稳定 |
| **llama.cpp** | 498         | 11                     | `b11223`       | RANK 池化批处理拆分，Vulkan/CUDA 调优，关键图像处理崩溃 |
| **Ollama**    | 815+        | 3                      | 无           | 严重运行时崩溃（RTX 5090, MLX），云计费循环，静默输入丢失 |
| **LiteLLM**   | 642         | 12                     | 无           | 重大安全修复（虚拟密钥绕过）、Rust 迁移、结构化追踪 |
| **Unsloth**   | 412         | 14                     | 预构建轮子 | 新增 PyTorch 2.13/2.14 + Python 3.13 轮子，FP8 训练提速 |

> ✅ **观察**：尽管无新发布，活动仍保持高位——尤其集中在 **安全性**、**稳定性** 与 **硬件特定内核调优**。Ollama 与 SGLang 的问题数最高，反映出生产级部署中的成长阵痛。

---

### **3. 模型支持竞赛**

| 新模型 / 架构       | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|----------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen4Exp (NVFP4)**             | ✅ (PR #56273) | ❌     | ❌        | ❌     | ❌      | ❌      |
| **DeepSeek-V4.1-Flash (AMD gfx950)** | ❌   | ✅ (PR #41308) | ❌        | ❌     | ❌      | ❌      |
| **SANA-Video 2.0 (T2V/TI2V)**    | ❌   | ✅ (PR #41492) | ❌        | ❌     | ❌      | ❌      |
| **GLM-5.3-Flash (W4A16)**        | ⚠️ (退化) | ❌     | ✅ (实验性) | ❌     | ❌      | ❌      |
| **Cohere MoE (RTX 5090)**        | ❌   | ❌     | ❌        | ❌     | ❌      | ❌      |
| **Qwen3-VL (RANK 池化)**      | ❌   | ❌     | ✅ (`b11223`) | ❌     | ❌      | ❌      |
| **MLX (Apple Silicon)**          | ❌   | ❌     | ❌        | ⚠️ (内存压力) | ❌      | ✅ (估计器) |

> 🏆 **胜者**：**SGLang** 在 *跨架构模型支持* 方面领先，尤其在 **AMD MI350X** 与 **视频生成模型** 上表现突出。  
> 🥈 **亚军**：**llama.cpp** 在 **视觉重排序扩展性** 与 **多后端可移植性** 上表现出色。  
> 🛑 **警示**：Ollama 的 `deepseek-v4.1-flash:cloud` 尽管宣称支持视觉功能，却静默丢弃图像——对生产环境是严重红灯。

---

### **4. 性能前沿**

| 优化方向           | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|-----------------------------|------|--------|-----------|--------|---------|---------|
| **融合内核**            | ✅ GDN, QK-RoPE (29x 加速) | ⚠️ 部分 MoE 潜力 | ✅ Vulkan/CUDA 调优 | ❌ | ❌ | ✅ 块级 FP8 LoRA (4–15x) |
| **KV 缓存效率**      | ✅ 动态 PDL, 使用指标 | ✅ `kv_cache_usage_perc` | ❌ 保存失败 | ⚠️ 过度分配 | ✅ 结构化追踪 | ❌ |
| **批处理与预填充**       | ✅ 固定令牌评分, OPD | ⚠️ 预填充间隙 (2–7K tok/s) | ✅ 批次拆分 (RANK) | ❌ | ❌ | ❌ |
| **量化**             | ✅ NVFP4, 打包嵌入 | ✅ W4A16, int4pack 复用 | ✅ IQ2_NL/IQ3_NL | ❌ | ❌ | ✅ 4bit 加载用于 FP8 检查点 |
| **分布式服务**      | ✅ 序列并行 (修复中) | ✅ TP/DSpark | ❌ | ❌ | ✅ 多提供商路由 | ❌ |

> 🔥 **顶尖表现者**：  
> - **vLLM** 在 **内核融合** 与 **分布式推理正确性** 上占据主导。  
> - **Unsloth** 凭借优化的 FP8 训练，在 **低比特微调加速** 方面领先。  
> - **SGLang** 在 **MoE 与推测解码** 上潜力显著，但稳定性仍有差距。

---

### **5. 层级定位**

| 项目       | 主要层级              | 次要角色                          | 目标用户 |
|---------------|------------------------------|------------------------------------------|--------------|
| **vLLM**      | 推理引擎 (GPU)       | 模型服务、批处理、量化     | 云基础设施、LLMaaS 提供商 |
| **SGLang**    | 推理引擎 + 推测解码 | 多模态、智能体工作流             | 研究实验室、实时智能体 |
| **llama.cpp** | 本地运行时 / 边缘推理 | RAG、视觉重排序、跨平台   | 开发者、边缘设备、离线应用 |
| **Ollama**    | 本地网关 + CLI 运行器   | 模型抽象、用户体验        | 开发者、爱好者、原型开发 |
| **LiteLLM**   | API 网关 / 路由器         | 成本追踪、认证、追踪    | 企业、多云部署 |
| **Unsloth**   | 训练/微调框架 | 低层内核优化、工具链   | 研究人员、微调者、 Studio 用户 |

> 📊 **战略洞察**：  
> - **vLLM/SGLang** 正逐渐成为大规模高性能推理的 *事实标准引擎*。  
> - **LiteLLM** 正演变为 *集中式控制平面*，负责成本、认证与可观测性。  
> - **Unsloth** 与 **llama.cpp** 仍是实现 *细粒度控制与可移植性* 的关键，尤其在科研与边缘场景中。

---

### **6. 趋势信号与开发者建议**

#### **从 2026-09-28 活动中显现的新兴趋势**：
1. **硬件专业化加速**：项目正迅速增加对 **AMD MI350X**、**Apple Silicon MLX**、**RTX 5090** 与 **DGX Spark (GB10)** 的支持——表明未来基础设施必须具备硬件感知能力。
2. **FP8 与 NVFP4 已进入生产就绪阶段**：随着 vLLM 的打包 NVFP4 支持以及 Unsloth 的块级 FP8 训练，这些格式已从原型走向真实推理流水线。
3. **稳定性已成为新瓶颈**：尽管性能大幅提升，但 **严重崩溃**（Ollama CUDA、SGLang 核心转储、llama.cpp 图像处理）持续占据问题追踪列表——说明可靠性如今是生产采纳的最大障碍。
4. **Rust 迁移 = 安全与性能双赢**：LiteLLM 与 vLLM 推动原生 Rust 组件（追踪、前端、认证）的举措，反映了行业向 **内存安全、高性能系统** 的普遍演进。
5. **智能体工作流要求全栈完整性**：工具调用分块丢失（Ollama）、logprob 偏移（SGLang）、静默图像丢弃（Ollama）等问题揭示，**端到端正确性** 比单纯吞吐更难实现。

#### **面向应用开发者的可操作建议**：
- ✅ **避免在生产中使用 Ollama 的 `deepseek-v4.1-flash:cloud`** ——它会静默忽略图像。请改用 SGLang 或 vLLM。
- ✅ **在 vLLM（≥0.28.1rc1）中启用融合内核**，可实现高达 **29x 的视觉语言解码加速**。
- ✅ **使用 Unsloth 的 `load_in_4bit=True`** 来加载 FP8 微调模型（如 Qwen3-FP8），以实现 **15x 的 LoRA 训练加速**。
- ✅ **若使用 LiteLLM，务必审计计费模型** ——即将更新的 `completion_window` 计费逻辑可能显著改变支出。
- ⚠️ **不要假设在 `VLLM_BATCH_INVARIANT=1` + 序列并行下输出确定性**，直到 v0.29.0+ 版本。
- 🛡️ **验证 LiteLLM 中的虚拟密钥访问控制** ——在 Azure 路由上存在已知的白名单绕过漏洞。

> **最终提醒**： “够好”的推理时代已经结束。当今基础设施要求 **正确性、可观测性与弹性**，而不仅仅是速度。选择工具时，请依据您技术栈的 *层级成熟度*，而非仅看基准得分。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

**vLLM Digest – 2026-09-28**

---

### **1. 今日亮点**  
vLLM 项目持续加速推进 **批处理不变性正确性** 的优化，针对序列并行（PR #56370）下 `VLLM_BATCH_INVARIANT=1` 的关键修复，解决了影响确定性推理的重大正确性回归问题。与此同时，性能优化工作也在持续推进，KimiViT 中新增了 GDN 与 QK-RoPE 的融合内核，而 Rust 前端正朝着功能对齐迈进（Issue #44280）。

---

### **2. 版本发布与破坏性变更**  
过去 24 小时内未报告新版本或破坏性变更。暂无新发布或破坏性 API/配置变更公告。

---

### **3. 新模型与硬件支持**  
- **Qwen4Exp NVFP4 支持**：PR #56273 为 `Qwen3.8-Flash-Next-NVFP4` 启用打包的 NVFP4 PLE 嵌入，实现单台 DGX Spark（GB10）上无需 CPU/磁盘卸载即可完整运行模型——对高吞吐量 Flash attention 模型而言是重要进展。  
- **Rust 前端功能对齐**：Issue #44280 跟踪当前工作，目标是使 Rust 前端与 Python 版本完全对齐，支持通过 `VLLM_USE_RUST_FRONTEND=1` 实现无缝替换。  
- **Vulkan 支持**：已在 Issue #21182 中提出请求；作为长期目标，旨在拓展硬件兼容性，突破 NVIDIA GPU 限制。

---

### **4. 性能与优化**  
- **GDN 解码融合**：PR #53463 将非推测式 GDN 解码路径改用融合 CUDA 内核，消除 Conv1D、Triton 递归内核和 RMSNorm 的独立调用，预计显著提升 Mamba/GDN 模型的吞吐量。  
- **KimiViT QK-RoPE 融合**：PR #58651 将每层的 QK RoPE 融合为单一就地内核，在 GB300 上对 224×224 图像输入（256 个 token）实现 **约 29 倍加速**（从 225.3μs 降至 7.6μs）。  
- **固定 Token 预填充评分**：PR #54335 引入请求级评分机制用于 OPD/top-k 蒸馏，可在预填充阶段实现细粒度 logprob 捕获——对训练与评估流水线至关重要。  
- **动态 PDL 启用**：Issue #40543 指出未公开标志位（`TRTLLM_ENABLE_PDL`, `TORCHINDUCTOR_ENABLE_PDL`）可显著提升 Hopper/Blackwell 架构上的低延迟性能，目前正进入 RFC 审查阶段。

---

### **5. 稳定性与回归问题**  
- **批处理不变性破坏（严重）**：Issue #56370 确认当 `VLLM_BATCH_INVARIANT=1` 与序列并行（`enable_sp`）共用时行为异常。已合并修复 PR (#56370)，但需在 v0.29.0+ 中验证。  
- **GLM-5.3-Flash 长推理退化**：Issue #56868 报告在 B300 上使用 W4A16 量化版 GLM-5.3-Flash 进行长推理会话后输出质量下降——影响长上下文智能体的稳定性。  
- **DGX Spark 统一内存 OOM**：Issue #56824 显示尽管主机内存剩余 22 GiB，引擎启动仍崩溃——可能由统一内存碎片化或 SM121 上分配追踪不当导致。  
- **Qwen4Exp 每块 logits 缓冲区无限增长**：Issue #56457 报告在 GB10 上长时间预填充过程中 logits 缓冲区内存无界增长，导致设备内存溢出或卡死——对生产部署极为关键。

---

### **6. 对应用开发者的意义**  
- **谨慎使用 `VLLM_BATCH_INVARIANT=1`**：若依赖不同 TP/空间配置下的确定性输出，请避免启用序列并行，直至 v0.29.0+ 包含来自 PR #56370 的修复。  
- **利用融合内核优化低延迟应用**：对于 Mamba/GDN 及 KimiViT 模型，确保使用 v0.28.1rc1+ 并开启融合路径——视觉语言任务解码速度最高可提升 29 倍。  
- **关注 NVFP4 + 打包嵌入**：若在 DGX Spark 上部署 Qwen4Exp 模型，请使用 PR #56273 的补丁或等待 v0.29.0，以避免磁盘/CPU 卸载开销。  
- **避免长时间运行 GLM-5.3-Flash 会话**：在 #56868 修复前，建议限制上下文长度或定期重启工作进程，防止输出损坏。  
- **如目标为 Hopper/Blackwell，建议启用动态 PDL 标志**：这些标志可在低并发场景中显著降低延迟。

> 🔗 [GitHub Issues](https://github.com/vllm-project/vllm/issues) | [Pull Requests](https://github.com/vllm-project/vllm/pulls)

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

**SGLang 简报 – 2026-09-28**

---

### **1. 今日亮点**  
SGLang 生态系统持续成熟，新增硬件后端的集成以及对 DeepSeek-V4.1、SANA-Video 2.0 等新兴模型的性能优化工作持续推进。关键进展包括：为 DeepSeek-V4.1 增加对 AMD gfx950（MI350X）的原生支持，对 CuTe DSL 层构建进行重大重构以提升可维护性，并持续优化推测解码功能。内存安全、请求取消及 GPU 内核崩溃等关键稳定性问题正在优先修复。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
- **注意：** `--speculative-algorithm NGRAM` 标志现在禁止与 `torch_native` 注意力后端一起使用（PR #36444），以防止因缺少内核属性导致的启动崩溃。此变更对依赖该组合的用户为破坏性更新——请切换至 `cuda` 或 `flash` 后端。

---

### **3. 新模型与硬件支持**  
- ✅ **AMD gfx950（MI350X）**：通过 PR #41308 添加对 `DeepSeek-V4.1-Flash` 的原生支持，可在使用 DSpark 和统一基数缓存的 AMD GPU 上部署。  
- ✅ **SANA-Video 2.0（T2V/TI2V）**：通过 PR #41492 合并实验性支持，首次实现对文本到视频及文本图像到视频生成的扩散模型原生服务。  
- 🟡 **寒武纪 MLU**：引入原型内树后端（PR #26898），验证了在寒武纪设备上运行 Qwen3-8B 推理的可行性。虽仍处早期阶段，但对非 NVIDIA 生态系统前景可期。  
- 🟡 **Intel XPU**：通过复用 `int4pack` 路径启用 W4A16 压缩张量支持（PR #40828），移除了此前仅支持 FP8 的限制。

---

### **4. 性能与优化**  
- **预填充吞吐差距**：用户报告在 4× RTX PRO 6000 SM120 上，DeepSeek-V4.1 预填充速度约为 2–7K tok/s，而 vLLM/Marlin 达到约 12.5K（Issue #33422）。根本原因正在调查中：可能存在内核覆盖不足；追踪进展见 #19637。  
- **HiCache 预取延迟**：在高负载下可能导致长 TTFT，因调度器扫描期间最终化延迟所致（Issue #32724）。修复正在进行中。  
- **解码图宽度固定**：在 SM90 上，`--context-length` 现在会限制解码图宽度，影响扩展性（Issue #40441）。建议新增 `decode-phase max_seq_len` 功能。  
- **MoE 内核余量**：LFM2.5（E=32, N=1792）在 H200 上显示 1.37–1.74× 内核级余量，源于降级配置（Issue #32806）。需提供调优指导。  
- **KV 缓存效率**：PR #34714 添加 `kv_cache_usage_perc` Prometheus 指标，与 vLLM 期望对齐，增强可观测性。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 摘要 | 修复状态 |
|--------|------|--------|-----------|
| 🔴 高 | [#26340](https://github.com/sgl-project/sglang/issues/26340) | CUDA 核心转储来自 `pr-test.yml` —— 跨运行自动收集；320 条评论，高可见度 | 正在处理；需深入调试分析 |
| 🔴 高 | [#41471](https://github.com/sgl-project/sglang/issues/41471) | 两个并发请求使用不同 `DisallowedTokensLogitsProcessor` token_ids 导致服务器崩溃 | 尚无修复 |
| 🔴 高 | [#41351](https://github.com/sgl-project/sglang/issues/41351) | 混合 GDN 基数缓存重复分支评分时出现日志概率漂移 | 尚无修复 |
| 🟡 中 | [#41490](https://github.com/sgl-project/sglang/issues/41490) | 流式输出在解码器状态被中途驱逐时可能丢失最多 5 个 token | 修复中（参见 Issue #41236） |
| 🟡 中 | [#40843](https://github.com/sgl-project/sglang/issues/40843) | GLM-5.3 + DFLASH 推测解码时出现严重重复/退化循环 | 可复现；尚无已知解决方案 |
| 🟡 中 | [#41449](https://github.com/sgl-project/sglang/issues/41449) | 语法约束请求与其他请求批量处理时，在 TP+DSpark 下引发死锁 | 在开发分支上已复现；需 CI 验证 |

---

### **6. 对应用开发者的意义**  
- **模型部署**：你现在可在 AMD MI350X（gfx950）上部署 **DeepSeek-V4.1**，并使用 **SANA-Video 2.0** 支持 T2V/TI2V 工作流——非常适合多模态代理和视频生成流水线。  
- **稳定性注意事项**：避免在 `torch_native` 后端使用 `--speculative-algorithm NGRAM`（改用 `cuda`）。在并发场景中使用 `DisallowedTokensLogitsProcessor` 时需谨慎。  
- **内存与延迟**：若观察到高 TTFT 或令牌丢失，请检查 HiCache 预取行为，并确保根据并发级别调整 `SGLANG_DETOKENIZER_MAX_STATES`。  
- **可观测性**：使用新的 `kv_cache_usage_perc` 指标监控缓存使用情况。建议更新你的仪表板。  
- **未来兼容性**：关注与 **CuTe DSL 重构** 相关的 PR（#41443–#41440）；它们提升了引擎模块化水平，未来版本可能影响自定义内核。

> 🔗 [查看完整问题追踪列表](https://github.com/sgl-project/sglang/issues) | [最新 PR 列表](https://github.com/sgl-project/sglang/pulls)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-28**

---

### **1. 今日亮点**  
最新更新聚焦于增强视觉支持的重排序模型（reranker models）——特别是 Qwen3 与 Qwen3-VL —— 通过在服务器后端启用 RANK 池化批量拆分功能，显著提升可扩展检索系统的性能。与此同时，针对 Vulkan（Intel）和 CUDA（FP16 FlashAttention）的性能调优提升了高端 GPU 上的吞吐量，稳定性修复则解决了大图像处理及 RPC 处理中的关键崩溃问题。

---

### **2. 发布与破坏性变更**  
- **`b11223`**：新增对因果语言模型重排序器（如 Qwen3、Qwen3-VL）的 **RANK 池化批量拆分支持**，通过 `server : allow RANK pooling batch splitting` 配置实现 ([#28876](https://github.com/ggml-org/llama.cpp/pull/28876))。该功能可在不使用全模型批处理的前提下，高效推理长文档集合。
- **`b11222`**：重构参数解析逻辑，避免副作用；`--rpc` 现已无条件注册，且仅由其处理器调用 ([#29537](https://github.com/ggml-org/llama.cpp/pull/29537))。
- **`b11221`**：在 `string_split<T>` 中强制执行严格类型检查 —— 遇到无效输入时抛出异常，而非产生未定义行为 ([#29518](https://github.com/ggml-org/llama.cpp/pull/29518))。

---

### **3. 新增模型与硬件支持**  
- **模型支持**：  
  - 新增对 **GLM-5.3-Flash (GLM5-Next)** 的实验性支持，该模型为 320B 参数的混合文本+视觉模型，采用混合 KDA/DSA 层结构 ([#27773](https://github.com/ggml-org/llama.cpp/pull/27773))。
- **硬件与后端**：  
  - **Vulkan**：通过内核调优优化 Intel GPU 性能 ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476))；修复 Adreno 设备上的 argsort 内核选择问题 ([#29469](https://github.com/ggml-org/llama.cpp/pull/29469))。
  - **CUDA**：针对头尺寸 40–112 调整 FP16 tile 配置，以提升 FlashAttention 效率 ([#26289](https://github.com/ggml-org/llama.cpp/pull/26289))。
  - **SYCL**：扩展 FWHT 内核以支持块宽 >512（如 384、640、768、1280），采用 Kronecker/Paley 构造方法 ([#29243](https://github.com/ggml-org/llama.cpp/pull/29243))。
  - **HIP**：在 cdna 架构上启用 fattn-mma 内核，适用于 dkq > 256 且大批量场景 ([#28907](https://github.com/ggml-org/llama.cpp/pull/28907))。
  - **Jinja 模板引擎**：新增对 `dict` 内建函数的支持 ([#29477](https://github.com/ggml-org/llama.cpp/pull/29477))。

---

### **4. 性能与优化**  
- **Vulkan（RTX 3090）**：GDN 内核调优在 ubatch=2048 与 4096 下将延迟降低 **6.3%** ([#29476](https://github.com/ggml-org/llama.cpp/pull/29476))。
- **CUDA**：优化了头尺寸 40–112 的 FlashAttention 配置，提升了密集注意力模式下的效率 ([#26289](https://github.com/ggml-org/llama.cpp/pull/26289))。
- **AVX512-FP16**：修复 f16 点积累加中的溢出问题，改为在 f32 中累加 —— 保持精度并避免数值不稳定 ([#29545](https://github.com/ggml-org/llama.cpp/pull/29545))。
- **量化**：在 CPU、Metal、CUDA 与 Vulkan 后端中引入 **IQ2_NL 与 IQ3_NL** 量化类型，支持非整除张量维度的更好压缩效果 ([#27983](https://github.com/ggml-org/llama.cpp/pull/27983))。

---

### **5. 稳定性与回归问题**  
- **严重崩溃**：  
  - **Gemma4 模型在处理 > ~1.2 MP 图像时崩溃**，原因在于视觉处理中存在非因果注意力机制 ([#28954](https://github.com/ggml-org/llama.cpp/issues/28954), [#29543](https://github.com/ggml-org/llama.cpp/pull/29543))。*修复补丁已提交*。
  - **Jetson Orin NX 服务器在 b8638→b9016 重构后卡死** ([#29499](https://github.com/ggml-org/llama.cpp/issues/29499)) —— 仍未解决。
  - **发布版中使用 `SET_ROWS` 时发生 RPC 缓冲区溢出** —— 存在潜在内存损坏风险 ([#26912](https://github.com/ggml-org/llama.cpp/issues/26912))。
- **其他问题**：  
  - **视觉模型的 KV 缓存保存失败**（`/slots/3?action=save`）—— 已跟踪至 [#19466](https://github.com/ggml-org/llama.cpp/issues/19466)。
  - **MSVC 在 Windows 上未检测到 AVX-VNNI** —— 影响 CPU 推理速度 ([#28295](https://github.com/ggml-org/llama.cpp/issues/28295))。

---

### **6. 对应用开发者的意义**  
- **对于检索系统**：使用 `b11223` 可借助批量拆分技术，基于 Qwen3-VL 扩展长文档集的重排序能力 —— 非常适合 RAG 流水线。
- **对于边缘与移动端部署**：新引入的 **IQ2_NL / IQ3_NL** 量化格式可在不牺牲不规则张量形状下准确性的前提下，更精细地控制模型体积。
- **对于多 GPU 推理**：若遇到 `GGML_ASSERT(ret.axis != GGML_BACKEND_SPLIT_AXIS_UNKNOWN)` 错误，且使用 `--split-mode tensor` 与 `iq4_nl` 缓存，请暂时使用 `--cache-type-k/v iq4_m` 作为变通方案，待正式修复。
- **避免崩溃**：除非已打补丁，否则请勿向 Gemma4 模型发送 >1.2MP 的图像。建议对大输入进行预处理或分块处理。
- **调试提示**：启用 `GGML_RPC_DEBUG=1` 可获取远程推理的详细日志，便于调试 ([#29544](https://github.com/ggml-org/llama.cpp/pull/29544))。

> 🔗 [官方网站](https://llama.app) | 📦 [发布版本](https://github.com/ggml-org/llama.cpp/releases) | 🛠️ [问题追踪](https://github.com/ggml-org/llama.cpp/issues)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

**Ollama Digest – 2026-09-28**

---

### **1. 今日亮点**  
高阶硬件（RTX 5090、Apple Silicon MLX）及云环境正出现关键稳定性问题，包括 CUDA 内存访问崩溃、`deepseek-v4.1-flash:cloud` 中静默丢失图像输入，以及持续的计费循环导致用户无法访问。同时，核心解析逻辑正在积极优化，以修复影响代理可靠性的工具调用分块边缘情况——尤其对 Qwen3 和 Gemma4 等模型影响显著。

---

### **2. 发布与破坏性变更**  
*无*。过去 24 小时内未发布新版本。然而，模型解析行为的持续调整可能影响依赖严格工具调用格式的客户端（参见 #18681、#18676）。v0.34.1 中移除 `typical_p` 支持（追踪于 #18542）继续导致旧客户端如 SillyTavern 出现兼容性问题。

---

### **3. 新模型与硬件支持**  
- **硬件：**  
  - RTX 5090（CUDA）：在推理 Cohere MoE 模型时遭遇 `非法内存访问` 崩溃（#18642）。  
  - Intel UHD 0x4626（Windows）：在 Ollama 0.34.4 中未被 Vulkan 后端识别（#18672）。  
  - Apple Silicon（MLX）：尽管 MLX 已展示出良好可扩展性，但 nvfp4 量化模型在内存压力下性能严重下降（#16030）。

- **模型：**  
  - `deepseek-v4.1-flash:cloud` 现已静默丢弃所有图像输入，尽管仍宣称具备 `vision` 能力（#18527）。  
  - `olmo3` 在以终端分块形式到达时出现工具调用解析错误（#18676）。

---

### **4. 性能与优化**  
- **内存管理：**  
  - `OLLAMA_GPU_OVERHEAD` 被 `llama-server` 运行器忽略，无法通过 `--fit` 预留显存用于模型层定位（#18679）。  
  - `PredictServerVRAM` 的不准确导致过度分配或资源不足；PR #17615 目标是使 KV 缓存统计与实际 GraphSize 使用量对齐。

- **延迟与吞吐：**  
  - macOS 上基于 MLX 的模型在内存压力下表现出极端降速（#16030），表明内存紧缩或页故障处理存在缺陷。  
  - 在 Linux/CUDA 系统上，全缓存命中任务会导致 `llama-server` 死锁，无限挂起后续所有请求，直至模型卸载（#18685）。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | GitHub 链接 | 状态 |
|--------|------|-------------|--------|
| 🔴 关键 | RTX 5090 上 `llama-server` 因 CUDA 非法内存访问崩溃（Cohere MoE） | [#18642](https://github.com/ollama/ollama/issues/18642) | 开放 |
| 🔴 关键 | 云计费循环阻止用户升级/降级套餐 | [#18683](https://github.com/ollama/ollama/issues/18683) | 开放 |
| 🟡 高 | `deepseek-v4.1-flash:cloud` 尽管声称支持视觉功能，却静默忽略图像输入 | [#18527](https://github.com/ollama/ollama/issues/18527) | 开放 |
| 🟡 高 | `llama-server` 在全缓存命中任务中死锁，阻塞所有后续请求 | [#18685](https://github.com/ollama/ollama/issues/18685) | 开放 |
| 🟡 中 | 多个解析器在分块边界处丢失工具调用开头标签 | [#18681](https://github.com/ollama/ollama/issues/18681) | 开放 |

> ✅ *注意：* 多个 PR 已着手修复解析正确性（如 #18687、#18624、#18288），但尚未解决运行时崩溃或客户端破坏性回归问题。

---

### **6. 对应用开发者的启示**  
- 若使用旧客户端（如 SillyTavern），请避免使用 `typical_p`；该功能已不再支持且破坏兼容性（#18542）。  
- 在代理中验证工具调用完整性：确保应用程序能处理部分或丢失的标签（例如 `<tool>` 缺少 `</tool>`），特别是 Qwen3/Gemma4 模型（#18676、#18681）。  
- 不要假设 `deepseek-v4.1-flash:cloud` 支持图像输入——它将静默丢弃输入（#18527）。  
- 在 RTX 5090 与 Apple Silicon MLX 系统上需谨慎监控 GPU 内存使用情况；两者在负载下均表现出不稳定（#18642、#16030）。  
- 预期在 CUDA 系统上缓存命中后出现不可预测的卡顿——应实现请求超时机制与回退重载逻辑（#18685）。  
- 云用户应立即验证计费状态：陷入 Stripe 重试循环的账户可能完全被封锁（#18683）。  

> ⚠️ **建议：** 在上述关键问题修复前，推迟部署 `qwen3.6:35b-a3b-nvfp4`、`cohere2moe` 与 `deepseek-v4.1-flash:cloud`。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 简报 – 2026-09-28**

---

### **1. 今日重点**  
LiteLLM 项目正在推进核心基础设施升级，重点聚焦基于 Rust 的性能与安全优化，包括原生 Python 推理功能启用、结构化追踪以及网关认证与授权的分离。关键稳定性修复解决了高严重性问题，例如 Azure 路由中的虚拟密钥白名单绕过漏洞，以及路由器回退后返回空响应体的问题——这两项均可能影响成本追踪和访问控制。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
但有若干关键 PR 待合并，可能引入破坏性变更：  
- **PR #43477** (`fix(sail): bill chat requests by caller's metadata.completion_window`) — 将根据 `completion_window`（`asap`、`balanced`、`flex`）调整计费行为。依赖默认定价的现有部署需审计其成本模型。[GitHub](https://github.com/BerriAI/litellm/pull/43477)  
- **PR #43509 / #43507 / #43506** — 更新 Together AI 模型的弃用时间，并同步 OpenRouter 定价。这些变更会影响模型可用性和成本计算；用户应检查配置映射和价格映射。[GitHub (弃用)](https://github.com/BerriAI/litellm/pull/43509)，[GitHub (OpenRouter)](https://github.com/BerriAI/litellm/pull/43506)

---

### **3. 新模型与硬件支持**  
- ✅ 通过 PR #43502 新增 Tsubasa 提供商路由与仪表板发现功能，支持直接接入 Tsubasa 公共端点。  
- ✅ 通过 PR #32637，Azure 现已支持 Mistral Document AI OCR 与 Mistral 3.5 Medium。  
- ✅ 通过 PR #32628，Azure 新增 Cohere Command A+ 支持。  
- ✅ gpt-realtime（Azure OpenAI）的 WebRTC 支持现已在 v1.82.3 中加入成本追踪功能（参见 Issue #25738）。  

> *注：尽管非新模型，但对 WebRTC 与 MCP 网关的增强支持表明实时代理集成正不断深化。*

---

### **4. 性能与优化**  
- 🚀 通过 PR #43465 引入原生 Python 推理功能启用 —— 通过 `python-bridge` 路由实现低延迟、直接执行，减少外部进程调用开销。  
- 🔍 通过 PR #43466 新增结构化路由生命周期追踪 —— 使用 `rust-tracing` 提供音频转录、聊天、响应及 WebSocket 路径的细粒度可观测性。  
- ⚙️ 通过 PR #43467 实现网关认证与授权分离 —— 在多租户环境中提升可扩展性与安全性。  
- 💡 Rust 迁移进展：整个网关栈正重构为模块化 crate（`gateway-auth`、`gateway-ui`、`gateway-mcp`、`gateway-management`），为未来性能提升与内存占用降低奠定基础。

---

### **5. 稳定性与回归问题**  
今日报告的高优先级缺陷：  
1. **[严重]** `RouterFallback` 成功回退后返回 `null` 响应体（Issue #43165）——破坏客户端预期，可能导致静默失败。*[GitHub](https://github.com/BerriAI/litellm/issues/43165)*  
2. **[高]** 由于缺少模型解析，`/azure/openai/deployments/*` 路由存在虚拟密钥白名单绕过漏洞（Issue #41295）——允许未授权访问 Azure 部署。*[GitHub](https://github.com/BerriAI/litellm/issues/41295)*  
3. **[中]** `Responses API` WebSocket 模式（`_aresponses_websocket`）的成本追踪失败，日志中显示 `prompt_tokens=0`（Issue #38674）——影响代理 CLI 的成本可见性。*[GitHub](https://github.com/BerriAI/litellm/issues/38674)*  
4. **[中]** Anthropic `/v1/responses` 流式输出导致推理内容中的思考文本重复（Issue #43010）——污染代理推理日志。*[GitHub](https://github.com/BerriAI/litellm/issues/43010)*  

> ✅ 部分回归问题已有修复 PR：  
> - PR #43465（Python 推理）与 #43466（追踪）正在积极合并。  
> - PR #43165 尚无修复方案；需紧急处理。

---

### **6. 对应用开发者的启示**  
- **使用虚拟密钥和 Azure 透传路由时务必谨慎** —— 当前的白名单绕过漏洞（Issue #41295）若应用使用不可信或轮换密钥将带来重大风险。避免在无额外 RBAC 保护的情况下暴露 `/azure/openai/deployments/...` 端点。  
- **启用新的基于 Rust 的追踪功能**（PR #43466），以深入洞察代理工作流，尤其适用于使用 `responses` 或 `websearch_interception` 的实时与多轮应用。  
- **如依赖 `completion_window` 语义，请更新成本追踪逻辑** —— 即将上线的 PR #43477 将改变计费粒度，可能影响单请求成本。  
- **在 Issue #38674 修复前避免调用 `responses` API 流式请求**，因令牌使用量将被错误记录为零，导致代理工具中支出报告不准确。  
- **关注模型弃用带来的破坏性变更** —— 最近对 Together AI 与 OpenRouter 定价数据的更新可能需要立即调整配置。

> 📌 **实用提示**：若构建长会话代理，注意关注 Issue #43190 —— 多个代理共享 `max_budget_per_session` 可能导致意外超支。

---  
*简报源自 GitHub 活动（2026-09-28）。实时状态请监控 [BerriAI/litellm Issues](https://github.com/BerriAI/litellm/issues) 与 [Pull Requests](https://github.com/BerriAI/litellm/pulls)。*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### **Unsloth Digest — 2026-09-28**

---

#### **1. 今日亮点**  
Unsloth 已发布适用于 Python 3.13 的 PyTorch 2.13 与 2.14 的预构建 CUDA 13 轮子，包含 FlashAttention2 2.8.4、Causal-Conv1D 1.7.0 以及 Mamba_SSM 2.3.2.post1 — 支持在现代 GPU 堆栈上实现更快的推理与训练。同时，关键修复已合并，解决了 `unsloth start opencode` 中的分词长度限制问题（现正确响应 `--max-tokens`）以及因无限 shell 变量展开导致的终端工具卡死问题。

---

#### **2. 发布与破坏性变更**  
- ✅ **新预构建轮子（cu13）**:  
  [prebuilt-wheels-cu13](https://github.com/unslothai/unsloth/releases/tag/prebuilt-wheels-cu13) 包含适用于 Linux x86_64 的 FlashAttention2 2.8.4、Causal-Conv1D 1.7.0 与 Mamba_SSM 2.3.2.post1，基于 PyTorch 2.13 与 2.14 构建，支持 Python 3.13。  
  *影响*：使用 NVIDIA cu130 系统并运行 Python 3.13 的用户将显著提升大模型服务与微调工作流的开箱即用性能。

- 🛠️ **PyTorch 版本上限提升**：  
  PR [#12152](https://github.com/unslothai/unsloth/pull/12152) 将允许的 torch 版本上限从 `<2.13.0` 提升至 `<2.15.0`，确保兼容后续 PyTorch 新版本。

- ⚙️ **新增 Torch 2.13/2.14 自动安装支持**：  
  PR [#12151](https://github.com/unslothai/unsloth/pull/12151) 添加 pip extras 与自动安装支持，用于 PyTorch 2.13.0 与 2.14.0，简化 Studio 新安装的配置流程。

- 🔄 **Studio 默认升级路径**：  
  PR [#12150](https://github.com/unslothai/unsloth/pull/12150) 使新安装的 Linux cu130 + Python 3.13 环境默认使用 Torch 2.13，同时保留原有安装的版本不变。

---

#### **3. 新模型与硬件支持**  
- 💡 **MLX 模型内存估算**：  
  PR [#10287](https://github.com/unslothai/unsloth/pull/10287) 为 Apple Silicon 主机引入 MLX 计划器，可在模型加载时实现精准内存估算——此前因后端拒绝非 GGUF 模型而无法实现。

- 🔧 **多 GPU 层级分配灵活性**：  
  PR [#10770](https://github.com/unslothai/unsloth/pull/10770) 新增显式 `--split-mode layer` 支持，允许手动控制多 GPU 的层分布，提升异构环境下的张量分区控制能力。

- 🌐 **ModelScope 镜像集成**：  
  PR [#11761](https://github.com/unslothai/unsloth/pull/11761) 通过解决 #11529 问题，启用 ModelScope 作为受阻 Hugging Face 区域（如中国）的备用源，提升全球可访问性。

---

#### **4. 性能与优化**  
- ⚡ **Block-FP8 LoRA 训练加速**：  
  PR [#12027](https://github.com/unslothai/unsloth/pull/12027) 通过提前执行 FP8 线性计算并采用每 128 行 GEMM tile 使用 8 个 warp，优化 Block-FP8 LoRA 训练。基准测试显示，在 RTX PRO 6000、L4、H100 与 B200 GPU 上实现 **4–15 倍加速**，有效缓解低比特量化微调中的主要性能瓶颈。

- 📦 **Block-FP8 检查点的 4 位加载支持**：  
  PR [#12146](https://github.com/unslothai/unsloth/pull/12146) 现支持 `load_in_4bit=True` 加载细粒度 FP8 检查点（如 Qwen3-FP8、GLM-5.3-Flash），无需重新量化即可实现高效的 4 位推理。

- 🖥️ **不支持 GPU 的 FP8 内核回退机制**：  
  PR [#12098](https://github.com/unslothai/unsloth/pull/12098) 为 RTX PRO 6000 / 5090 系列 GPU（sm120）添加了从 FBGEMM 到通用内核的自动回退机制，解决行级 FP8 在模型执行中出现的静默失败问题。

---

#### **5. 稳定性与回归问题**  
| 问题 | 严重性 | 状态 | 修复 PR |
|------|----------|--------|--------|
| [#12009](https://github.com/unslothai/unsloth/issues/12009): `unsloth start opencode` 即便设置了 `max_tokens` 仍被限制在 8192 个 token | 高 | 开放 | ✅ PR [#12111](https://github.com/unslothai/unsloth/pull/12111) 已合并 |
| [#12048](https://github.com/unslothai/unsloth/issues/12048): 终端工具调用因凭证扫描中的递归陷入无限挂起 | 严重 | 开放 | ✅ PR [#12087](https://github.com/unslothai/unsloth/pull/12087) 已合并 |
| [#12084](https://github.com/unslothai/unsloth/issues/12084): `VAR=$VAR` 在引号字符串中的自引用赋值导致硬冻结 | 严重 | 开放 | ❌ 尚无修复 |
| [#12058](https://github.com/unslothai/unsloth/issues/12058): 尽管图像返回有效，仍报告“无效 base64 值”错误 | 中等 | 开放 | ❌ 尚无修复 |
| [#12140](https://github.com/unslothai/unsloth/issues/12140): Bitdefender 将 Unsloth Desktop 安装程序误报为恶意软件 | 高 | 开放 | ❌ 误报；仅影响用户界面 |

> 🔴 **严重提醒**：`VAR=$VAR` 递归问题（#12084）会导致应用程序完全冻结，需立即处理——用户应避免在工具中使用复杂的 shell 命令，直至修复完成。

---

#### **6. 对应用开发者的意义**  
- ✅ **构建更快更轻量的智能体**：在 `unsloth start opencode` 中使用新的 `--max-tokens` 标志，实现长上下文生成，无须人为设置上限。
- 🚀 **利用优化的 FP8 训练**：在 Block-FP8 模型（如 Qwen3-FP8、DeepSeek 风格）上启用 `load_in_4bit=True`，在高端 GPU 上获得显著的训练速度提升。
- 🧩 **通过工具设计提升可靠性**：避免在终端工具中使用自引用 shell 赋值（`VAR=$VAR`）——此操作会触发已知死锁。
- 🌍 **支持全球部署**：利用 ModelScope 镜像集成，在受限区域提供模型服务。
- 📈 **优化内存使用**：结合新的 MLX 内存估算器与多 GPU 层拆分功能，提升 Apple Silicon 与多 GPU 系统的资源规划效率。

> 💡 **行动项**：若您在 Linux x86_64 上使用 PyTorch 2.13+ 与 Python 3.13，建议更新至最新预构建轮子（`cu13`）——以解锁最新内核并避免回归问题。

---  
*摘要生成时间：2026-09-28 | 来源：[unslothai/unsloth GitHub](https://github.com/unslothai/unsloth)*

</details>

---
*本日报由 [agents-radar](https://github.com/845421145-lang/agents-radar) 自动生成。*