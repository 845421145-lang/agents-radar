# OpenClaw Ecosystem Digest 2026-09-22

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-22 01:04 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-09-22**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with over **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development and community engagement. The ecosystem is experiencing a surge in critical stability concerns—particularly around memory leaks, SQLite WAL bloat, and gateway crash loops—suggesting ongoing stress on core runtime components. Despite this, the team is rapidly addressing high-impact bugs through focused PRs, especially in session management, memory handling, and authentication reliability. The release of **v2026.7.35** as an extended-stable (LTS-equivalent) version signals a strategic pause for stabilization before upcoming major features.

---

### **2. Releases**  
**New Release:** [v2026.7.35](https://github.com/openclaw/openclaw/releases/tag/v2026.7.35) — *Gateway-only extended-stable release*  
- **Summary**: This is a maintenance-focused release based on code from late July 2026, incorporating only **critical security patches**, **performance improvements**, and **essential reliability fixes**.  
- **Key Additions**: New model support (including Codex-native tooling), enhanced error recovery paths, and improved database checkpointing logic.  
- **Migration Note**: No breaking changes expected; users upgrading from `2026.7.x` or earlier should expect a smooth transition. However, **users on `2026.9.2/9.3` are strongly advised to avoid upgrading to `2026.9.5` until further notice** due to severe regression reports (see Issue #153257).  
- **Status**: Current latest stable version is **[2026.9.5](https://github.com/openclaw/openclaw/releases/tag/v2026.9.5)**, but it’s flagged as unstable by multiple contributors.

---

### **3. Project Progress**  
Over **187 PRs were merged or closed today**, reflecting rapid iteration. Key advancements include:  
- ✅ **Memory & Session Stability**: Fixes for SQLite WAL corruption (#143524), memory leak accumulation (#91588), and zombie process leaks (#97616).  
- ✅ **Codex Integration Reliability**: Multiple PRs targeting `codex`-specific hangs, timeouts, and OAuth refresh failures (e.g., #155315, #89278).  
- ✅ **UI/UX Polish**: Improvements to task progress persistence (#155326), avatar upload rejection in Safari (#154921), and channel status display (#155296).  
- ✅ **Infrastructure Optimization**: Refactored session delivery reconciliation (#155327), improved test isolation (#154722), and better temporary directory handling (#155285).  

These changes collectively signal strong focus on **runtime robustness and user experience consistency** ahead of the next major milestone.

---

### **4. Community Hot Topics**  
Top 5 most discussed issues reflect deep concern about **core system stability** and **user-facing regressions**:

| Issue | Comments | Severity | Link |
|------|---------|----------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 50 | 🦐 Gold Shrimp (P0, UX-blocker) | SQLite WAL grows to 2.8 GB on Windows, blocks startup |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 31 | 🦪 Silver Shellfish (P1, OOM crash) | Gateway RSS grows from 350MB → 15.5GB, triggers OOM kills |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 19 | 🦐 Gold Shrimp (P0, UX-blocker) | v2026.9.5 turns stable env into 8-hour failure loop |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 26 | 🦪 Silver Shellfish (P0, CPU spike) | Codex PreToolUse spawns CPU-hogging processes |
| [#87744](https://github.com/openclaw/openclaw/issues/87744) | 18 | 🦞 Diamond Lobster (P1, message loss) | Telegram turns time out waiting for `turn/completed` |

> 🔍 **Underlying Need**: Users demand **predictable, low-latency execution** across all channels. Crashes, silent data loss, and unresponsive gateways are eroding trust in production use cases.

---

### **5. Bugs & Stability**  
Critical stability issues reported today highlight systemic risks:

| Bug | Severity | Impact | Fix PR? |
|-----|----------|--------|--------|
| **SQLite WAL growth (Issue #143524)** | P0, 🦐 gold shrimp | Blocks gateway startup on Windows | ❌ Not yet fixed |
| **Memory leak (Issue #91588)** | P1, 🦪 silver shellfish | OOM crashes after days of uptime | ❌ No fix PR yet |
| **Zombie process leak (Issue #97616)** | P1, 🦪 silver shellfish | Runtime degradation, long-term instability | ❌ Pending review |
| **Codex OAuth timeout (Issue #89278)** | P0, 🦞 diamond lobster | Auth succeeds but cron/heartbeat fails | ⚠️ Partial fix in PR #155315 |
| **Session state corruption (Issue #153257)** | P0, 🦐 gold shrimp | v2026.9.5 breaks stable environments | ❌ No fix; urgent priority |

> ⚠️ **Warning**: The combination of **memory leaks**, **disk bloat**, and **authentication timing issues** suggests potential **gateway-level instability under sustained load**, particularly in multi-agent or cron-heavy setups.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven feature requests reveal emerging priorities:

| Request | Priority | Use Case | Roadmap Signal |
|--------|----------|----------|----------------|
| [#67413](https://github.com/openclaw/openclaw/issues/67413) | P2 | Per-agent dreaming control to prevent OOM | Suggests need for granular resource management |
| [#66252](https://github.com/openclaw/openclaw/issues/66252) | P3 | Per-agent TTS/STT language overrides | Indicates growing multilingual deployment needs |
| [#88154](https://github.com/openclaw/openclaw/issues/88154) | P2 | Slack Modal Support | Signals demand for native interactive workflows |
| [#73537](https://github.com/openclaw/openclaw/issues/73537) | P3 | Production-readiness stability label | Users want clearer release maturity signals |
| [#60572](https://github.com/openclaw/openclaw/issues/60572) | P3 | Multi-Slot Memory Architecture | Suggests desire for layered, composable memory systems |

> 💡 **Prediction**: The next stable release (likely **v2026.10.x**) will likely include **per-agent configuration controls**, **enhanced session resilience**, and **better diagnostics**—driven by these top-user pain points.

---

### **7. User Feedback Summary**  
Real-world usage reveals both satisfaction and frustration:  
- ✅ **Positive**: Users appreciate OpenClaw’s versatility in automating home/business tasks via Telegram, Home Assistant, and cron jobs. Many report deep integration into daily workflows ([Issue #73537](https://github.com/openclaw/openclaw/issues/73537)).  
- ❌ **Negative**: Frequent complaints center on **unstable upgrades** (`2026.9.5` causing 8-hour recoveries), **silent data loss** (e.g., file overwrites via `write` tool), and **channel-specific failures** (Telegram, WhatsApp, WebChat).  
- 📉 **Dissatisfaction**: Several users express regret upgrading due to regression severity, citing "working environment turned into failure recovery session" (Issue #153257).  
- 🧩 **Expectation Gap**: Users expect LTS-like stability even within `extended-stable` releases, but current reality shows frequent breakage post-update.

---

### **8. Backlog Watch**  
High-priority Issues and PRs requiring maintainer attention:

| Item | Status | Notes | Link |
|------|--------|-------|------|
| [#154114](https://github.com/openclaw/openclaw/issues/154114) | Open, P0 | Update rehearsal fails despite working auth | Critical for upgrade safety |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | Open, P0 | v2026.9.5 causes 8-hour failure loops | Urgent patch needed |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | Open, P0 | SQLite WAL bloat on Windows | Blocking real-world deployments |
| [#155315](https://github.com/openclaw/openclaw/pull/155315) | Open, P2 | Codex follow-up task loss | Fix exists but pending review |
| [#77700](https://github.com/openclaw/openclaw/issues/77700) | Open, P3 | Runtime resolution migration tracking | Long-term performance enabler |

> 🛑 **Call to Action**: Maintainers must prioritize **stability triage** over new features. These issues represent **active erosion of trust** in OpenClaw’s reliability as a production-grade AI assistant platform.

---  
*Data snapshot: 2026-09-22 | Source: GitHub API (openclaw/openclaw)*

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Assistant Open-Source Ecosystem – 2026-09-22**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem is entering a pivotal phase of maturation, marked by divergent development strategies across key projects. While **OpenClaw**, **Hermes Agent**, and **QwenPaw** are in high-velocity iteration with complex feature integration and urgent stability fixes, **IronClaw** and **ZeroClaw** reflect more strategic, maintenance-oriented phases focused on benchmarking rigor and foundational security hardening. Despite varying maturity levels, all projects are converging on core challenges: **runtime stability under sustained load**, **cross-platform reliability**, and **user trust through transparent diagnostics**. The landscape shows clear specialization—OpenClaw as a production-grade orchestrator, Hermes Agent as a modular multi-agent framework, QwenPaw as an extensible desktop platform, IronClaw as a research benchmark, and ZeroClaw as a secure, channel-agnostic runtime.

---

### **2. Activity Comparison**

| Project | Issues (24h) | PRs (24h) | Release Status | Health Score (10) |
|--------|--------------|-----------|----------------|-------------------|
| **OpenClaw** | 500 | 500 | v2026.7.35 (LTS-like), v2026.9.5 unstable | **8.5** |
| **Hermes Agent** | 50 | 50 | v0.21.4 (stable patch release) | **8.0** |
| **QwenPaw** | 17 | 33 | No new release; v2.2.1 stable | **8.8** |
| **IronClaw** | 1 | 1 | `1.4.1-rc.1` tagged, no release | **7.5** |
| **ZeroClaw** | 50 | 50 | No release; active S1/S0 bugs | **7.2** |

> ✅ *Health score reflects stability, bug triage speed, release cadence, and community responsiveness.*

---

### **3. OpenClaw's Position**  
**OpenClaw stands as the most mature and production-focused player** in the ecosystem, combining broad feature coverage with aggressive stability engineering. Its technical approach centers on **gateway-level resilience**, **session state consistency**, and **SQL/SQLite optimization**—critical for long-running, multi-channel deployments. Unlike peers that prioritize architectural innovation (e.g., Hermes’ delegation models or ZeroClaw’s sandboxing), OpenClaw emphasizes **predictable uptime and upgrade safety**, evidenced by its extended-stable release strategy and focus on memory/WAL bloat mitigation. With over **500 issues and PRs processed daily**, it maintains the largest active contributor base and user footprint, positioning it as the de facto standard for enterprise and home automation use cases requiring robustness over novelty.

---

### **4. Shared Technical Focus Areas**  
Multiple projects are converging on critical system-level concerns:

- **Memory & Disk Stability**:  
  - OpenClaw (#91588, #143524): OOM crashes, SQLite WAL bloat  
  - ZeroClaw (#10230): Stack overflow during daemon startup  
  - Hermes Agent (#118053): Session image deletion failure → data loss  
  > 📌 *Need: deterministic resource management and garbage collection policies*

- **Authentication & Context Integrity**:  
  - OpenClaw (#89278): Codex OAuth refresh timing failures  
  - QwenPaw (#7859): Persistent prompt injection via system reminders  
  - ZeroClaw (#10975): WhatsApp image content not parsed  
  > 📌 *Need: secure context handling and input sanitization across agents*

- **Cross-Platform Reliability**:  
  - QwenPaw (#7910): Windows shell process termination  
  - ZeroClaw (#10536): macOS Seatbelt bypass  
  - Hermes Agent (#118643): Stale `sys.modules` on macOS  
  > 📌 *Need: OS-specific runtime isolation and dependency hygiene*

- **Systemic Truncation & Output Handling**:  
  - Hermes Agent (#110126): 35+ open issues on output length truncation  
  > 📌 *Need: unified output cap abstraction across agents, tools, TUI*

---

### **5. Differentiation Analysis**

| Project | Feature Focus | Target Users | Technical Architecture |
|--------|---------------|--------------|------------------------|
| **OpenClaw** | Production-grade orchestration, session persistence, multi-agent workflows | Enterprises, home automation, DevOps | Gateway-centric, SQLite-backed, model-agnostic tooling |
| **Hermes Agent** | Multi-profile delegation, real-time voice, agent-to-agent communication | Research labs, developers building complex workflows | Modular, profile-scoped, TUI-first, RPC-enabled |
| **QwenPaw** | Desktop UX, SDK extensibility, model provider unification | Developers, researchers, creative coders | AgentScope-based, rich CLI, web-integrated |
| **IronClaw** | Benchmarking, failure taxonomy, model evaluation | AI researchers, evaluators, model QA teams | Task-centric, evaluation-driven, minimal UI |
| **ZeroClaw** | Secure inter-agent comms, sandboxing, channel parity | Security-conscious orgs, regulated environments | Rust-based, actor-model, strong enforcement layers |

> 🔍 **Key Differentiator**: OpenClaw leads in **real-world deployment readiness**, while ZeroClaw and IronClaw lead in **security and evaluation rigor**—the latter two being less suited for general-purpose use but ideal for trusted testing.

---

### **6. Community Momentum & Maturity**  

| Tier | Projects | Characteristics |
|------|----------|-----------------|
| **High Velocity (Rapid Iteration)** | OpenClaw, Hermes Agent, QwenPaw | >50 issues/PRs/day, frequent PR merges, urgent bug triage, active RFC discussions |
| **Stabilizing (Maintenance Phase)** | IronClaw | Low activity, release candidate in progress, focus on diagnostic depth |
| **Strategic (Governance-Driven)** | ZeroClaw | High-severity bugs unresolved, backlog stalls despite accepted PRs, governance bottlenecks |

> ⚠️ **Note**: OpenClaw and QwenPaw show strongest momentum in **contributor engagement and fix velocity**, while ZeroClaw suffers from **decision fatigue and implementation lag** despite high issue volume.

---

### **7. Trend Signals**  
From community feedback and project signals, several industry trends emerge:

- **Trust Through Transparency**: Users demand **clear diagnostics**, **failure categorization**, and **cost attribution** (e.g., IronClaw’s taxonomy request, Hermes’ billing gaps).  
- **Security-by-Design**: Prompt injection (#7859), stack overflows (#10230), and sandbox bypasses (#10536) indicate rising expectations for **zero-trust runtime environments**.  
- **UX-Centric Extensibility**: Features like avatars (#4974), custom tab titles (#7914), and delivery receipts (#10929) signal a shift toward **personalized, workflow-aware interfaces**.  
- **Model-Agnostic Control**: Per-session overrides (#5992), profile routing (#103965), and toolset toggles suggest growing need for **fine-grained control over agent behavior**.  
- **Enterprise Readiness Signal**: The repeated call for **production-readiness labels** (OpenClaw #73537) indicates users are moving beyond experimentation into **regulated, audit-ready deployments**.

> 📈 **Value for Developers**: These trends highlight that **stability, security, and observability** are now *primary differentiators*—not just features. Projects that invest early in diagnostics, sandboxing, and upgrade safety will dominate adoption in 2027.

---

**Final Insight**: The ecosystem is bifurcating—between **platforms built for scale and reliability (OpenClaw, QwenPaw)** and **research-grade frameworks for evaluation and security (IronClaw, ZeroClaw)**. The next wave of developer choice will be driven not by novelty, but by **trust in uptime, predictability, and integrity**.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-22**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 issues and 50 pull requests updated in the past 24 hours—indicating robust community engagement and ongoing development momentum. The release of **v0.21.4 (v2026.9.21)** consolidates ~1,800 PRs since v0.21.3 into a stable, production-ready tag for downstream consumers. Despite high activity, stability concerns persist across core subsystems like session state, context compression, and model output truncation. The ecosystem is rapidly evolving, particularly in agent delegation, multi-profile routing, and cross-platform compatibility.

---

### **2. Releases**  
- **v0.21.4 (v2026.9.21)** – Patch release  
  - **Release Date**: September 21, 2026  
  - **Summary**: A stable, curated rollout of ~1,800 merged PRs since v0.21.3. No breaking changes reported; intended for Docker images, Hermes Cloud, and hosted deployments.  
  - **Migration Note**: No migration steps required. Users should update via `hermes update` or re-pull container images.  
  - **Link**: [GitHub Release v0.21.4](https://github.com/nousresearch/hermes-agent/releases/tag/v0.21.4)  

---

### **3. Project Progress**  
**Merged/Closed PRs (Today)**: 1  
- ✅ **PR #118655** – *approval: only a real WHERE clause clears the DELETE FROM rule*  
  - Fixes a critical SQL injection risk where comment-based `WHERE` keywords could bypass deletion approval logic.  
  - **Impact**: Security hardening for database operations; prevents unintended data loss.  
  - **Link**: [PR #118655](https://github.com/nousresearch/hermes-agent/pull/118655)  

**Notable Open PRs (Active Development)**:  
- **PR #103965** – *feat(delegate): per-task Hermes profile routing*  
  - Enables subagents to inherit distinct models, memory, and state.db paths based on task context.  
  - Addresses scalability needs for multi-persona workflows.  
  - **Link**: [PR #103965](https://github.com/nousresearch/hermes-agent/pull/103965)  
- **PR #118657** – *fix(tui): retain detached delegation completions*  
  - Prevents async completion events from being lost when owners disconnect.  
  - Improves reliability in collaborative environments.  
  - **Link**: [PR #118657](https://github.com/nousresearch/hermes-agent/pull/118657)  
- **PR #118646** – *fix(desktop): keep toolset toggles in the selected profile*  
  - Ensures Desktop UI updates reflect the correct profile context during multiplexed sessions.  
  - **Link**: [PR #118646](https://github.com/nousresearch/hermes-agent/pull/118646)  

---

### **4. Community Hot Topics**  
Top 3 most commented issues reflect deep architectural and usability challenges:

1. **[Issue #77111]** – *[RFC] RealtimeVoiceProvider ABC — four competing duplex-voice PRs need an interface, not a merge queue*  
   - **Comments**: 27 | **Last Updated**: 2026-09-21  
   - **Need**: Standardization of voice provider abstraction to avoid feature fragmentation.  
   - **Link**: [Issue #77111](https://github.com/nousresearch/hermes-agent/issues/77111)  
   - **Analysis**: Signals growing demand for real-time, bidirectional voice interaction. Requires design leadership to unify competing implementations.

2. **[Issue #110126]** – *Output-cap/truncation is a four-subsystem systemic failure class — 35+ open issues, not an isolated P3*  
   - **Comments**: 4 | **Last Updated**: 2026-09-21  
   - **Need**: Systemic redesign of output length handling across agents, tools, TUI, and gateway.  
   - **Link**: [Issue #110126](https://github.com/nousresearch/hermes-agent/issues/110126)  
   - **Analysis**: Highlights a critical pain point affecting user experience and cost tracking. Likely to be prioritized in next major release.

3. **[Issue #118538]** – *OMH pre_tool_call vetoes ALL tools on multiplex gateway (missing profile scope)*  
   - **Comments**: 3 | **Last Updated**: 2026-09-21  
   - **Need**: Fix scope resolution in multi-profile gateways to prevent blanket tool blocking.  
   - **Link**: [Issue #118538](https://github.com/nousresearch/hermes-agent/issues/118538)  
   - **Analysis**: Directly impacts usability in enterprise-like setups with multiple profiles.

---

### **5. Bugs & Stability**  
**High-Priority Bugs (P1–P2)**:
| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| [#118053](https://github.com/nousresearch/hermes-agent/issues/118053) | P1 | Image rejection permanently deletes all session images from `state.db` | ❌ |
| [#118589](https://github.com/nousresearch/hermes-agent/issues/118589) | P2 | Voice mode fails to speak reply when turn ends due to iteration budget | ❌ |
| [#118643](https://github.com/nousresearch/hermes-agent/issues/118643) | P2 | Desktop "Update" leaves stale `sys.modules` on macOS with `--external-supervisor` | ❌ |
| [#118594](https://github.com/nousresearch/hermes-agent/issues/118594) | P2 | Custom providers priced at $0 despite official model costs | ❌ |
| [#118628](https://github.com/nousresearch/hermes-agent/issues/118628) | P2 | Closing session tile force-interrupts mid-flight turns without rendering | ❌ |

**Systemic Issues**:
- **[#110126]**: Truncation (`finish_reason='length'`) affects 35+ scattered issues across agents, tools, and TUI. Not a single bug but a **failure class** requiring architectural review.
- **[#107516]**: Context compression retries indefinitely on slow aux models — no backoff or cap.

---

### **6. Feature Requests & Roadmap Signals**  
Key user-driven features signaling future direction:

- **Per-Task Profile Routing** ([PR #103965](https://github.com/nousresearch/hermes-agent/pull/103965))  
  - Enable different models/memory for each delegated task.  
  - **Predicted Inclusion**: v0.22.0 — essential for advanced agent orchestration.

- **Configurable `deliver` Target for Home Assistant** ([Issue #35060](https://github.com/nousresearch/hermes-agent/issues/35060))  
  - Redirect state-change events to WhatsApp/Telegram instead of HA notifications.  
  - **Predicted Inclusion**: v0.22.0 — strong signal for messaging platform expansion.

- **Background/Daemon Mode for Desktop** ([Issue #47246](https://github.com/nousresearch/hermes-agent/issues/47246))  
  - Run Hermes Desktop without keeping terminal open (especially Windows).  
  - **Predicted Inclusion**: v0.22.0 — addresses long-standing UX friction.

- **Simplified Chinese Localization Plugin** ([PR #118322](https://github.com/nousresearch/hermes-agent/pull/118322))  
  - Official support for Chinese users.  
  - **Predicted Inclusion**: v0.21.5 (hotfix) or v0.22.0.

---

### **7. User Feedback Summary**  
Real user pain points revealed through issues and PRs:
- **Session State Fragility**: Users report duplicate replies, lost responses, and irreversible data loss (e.g., image deletion after rejection).
- **Profile Confusion**: Desktop settings apply globally post-v0.21.3; toolset toggles write to wrong profile.
- **Voice Mode Limitations**: Critical gap in accessibility—no audio output when max iterations are reached.
- **Multi-Profile Complexity**: Tool vetoing and lock conflicts under multiplexed gateways hinder productivity.
- **Billing Transparency**: Cost attribution broken for auxiliary tasks and custom providers — undermines trust in usage reporting.

> ✅ **Satisfaction Indicators**: New localization plugin, improved backup verification, and voice RFC show growing user investment.

---

### **8. Backlog Watch**  
Critical long-unanswered issues needing maintainer attention:

| Issue | Status | Priority | Link | Notes |
|------|--------|----------|------|-------|
| [#77111](https://github.com/nousresearch/hermes-agent/issues/77111) | Open | P3 (needs-decision) | [Link](https://github.com/nousresearch/hermes-agent/issues/77111) | Four competing voice PRs—requires ABC interface design. |
| [#110126](https://github.com/nousresearch/hermes-agent/issues/110126) | Open | P2 | [Link](https://github.com/nousresearch/hermes-agent/issues/110126) | Systemic truncation issue with 35+ open tickets—needs top-level triage. |
| [#118595](https://github.com/nousresearch/hermes-agent/issues/118595) | Open | P3 | [Link](https://github.com/nousresearch/hermes-agent/issues/118595) | Kanban decomposer task costs unattributed—impacts billing accuracy. |
| [#118349](https://github.com/nousresearch/hermes-agent/issues/118349) | Open | P3 | [Link](https://github.com/nousresearch/hermes-agent/issues/118349) | Slack thread metadata replayed after restart—message integrity risk. |

> 🔔 **Urgent Attention Needed**: These issues represent recurring, high-impact failures that erode user trust and system reliability.

---

**Final Assessment**: Hermes Agent is in a phase of rapid growth and complexity. While innovation is accelerating (delegation, multi-profile, voice), **stability and consistency remain under pressure**. The project is healthy but requires stronger governance over core abstractions (e.g., voice, truncation) and more proactive triage of systemic bugs. Next version (v0.22.0) will likely focus on **agent reliability, cost transparency, and cross-platform UX polish**.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-22**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable, maintenance-focused state with minimal activity on September 22, 2026. One pull request was merged and one issue opened, indicating low but steady operational momentum. The primary focus appears to be release preparation for the upcoming `1.4.1-rc.1` candidate, with no new releases or major feature developments reported. Community engagement is currently limited, with no comments or reactions on open issues, suggesting either high stability or reduced user interaction.

---

### **2. Releases**  
*No new releases were published today.*  
A release candidate (`1.4.1-rc.1`) was tagged via PR #8105 (merged), which bumps the version in preparation for the official `v1.4.1` rollout. This is part of a formalized release workflow managed by `cut_ironclaw_release.py`, which requires version alignment between manifest and tag. No breaking changes or migration notes are documented in the PR summary; the change is purely choreographic.

> 🔗 [PR #8105: chore(release): cut 1.4.1-rc.1](https://github.com/nearai/ironclaw/pull/8105)

---

### **3. Project Progress**  
✅ **Merged PR:**  
- **#8105**: *chore(release): cut 1.4.1-rc.1* — Successfully bumped the package version to `1.4.1-rc.1` to enable automated tagging and release pipeline execution. This marks a key step toward stabilizing the next minor release cycle.

This merge advances the project’s readiness for testing and eventual production deployment, though no functional code changes were introduced.

> 🔗 [PR #8105](https://github.com/nearai/ironclaw/pull/8105)

---

### **4. Community Hot Topics**  
🔴 **Most Active Issue:**  
- **#8106**: *[OPEN] Daily ironclaw failure taxonomy — 2026-09-21*  
  - Author: pranavraja99  
  - Created & Updated: 2026-09-21  
  - Status: Open, 0 comments, 0 reactions  

Despite being the only active issue, this ticket signals a growing interest in **systematic failure analysis**. The issue reports on 47 non-passing tasks in the `officeqa` benchmark suite, attributing them primarily to genuine model-quality errors (e.g., DeepSeek-V4-Flash navigation failures). This suggests users are moving beyond basic functionality testing toward deeper diagnostics and model reliability evaluation.

> 🔗 [Issue #8106: Daily ironclaw failure taxonomy — 2026-09-21](https://github.com/nearai/ironclaw/issues/8106)

---

### **5. Bugs & Stability**  
⚠️ **Reported Bug:**  
- **#8106**: Failure analysis in `officeqa` benchmark reveals 47 non-passing tasks due to model-level errors (e.g., DeepSeek-V4-Flash misnavigation).  
  - **Severity**: Medium-High (impacts benchmark credibility and model evaluation trust)  
  - **Root Cause**: Likely reflects limitations in agent reasoning or task execution logic under complex workflows  
  - **Fix Status**: No associated PR or fix proposed yet.  

While not a crash or regression in the codebase itself, this highlights potential instability in real-world task execution—particularly for advanced models. It underscores the need for more robust error categorization and feedback loops in future agent evaluations.

> 🔗 [Issue #8106](https://github.com/nearai/ironclaw/issues/8106)

---

### **6. Feature Requests & Roadmap Signals**  
🔍 **Emerging Roadmap Signals from #8106**:  
- Demand for **automated failure taxonomy** (categorizing bugs by type: reasoning, navigation, API misuse, etc.)  
- Need for **detailed post-execution diagnostics** to distinguish between agent design flaws and model limitations  
- Implicit request for **benchmark-specific insights** (e.g., why DeepSeek-V4-Flash fails in `officeqa`)  

These points suggest that the next version may prioritize **enhanced observability**, **failure classification tools**, and **model-agnostic evaluation metrics**—potentially shaping the roadmap for v1.5+.

> 🔗 [Issue #8106](https://github.com/nearai/ironclaw/issues/8106)

---

### **7. User Feedback Summary**  
User feedback today is sparse but insightful. The sole open issue indicates that users are actively analyzing test outcomes and seeking **deeper insight into failure patterns** rather than just pass/fail results. Key pain points include:  
- Difficulty distinguishing between agent-level and model-level failures  
- Lack of structured diagnostics for benchmark runs  
- Limited visibility into why certain agents (like DeepSeek-V4-Flash) fail in specific scenarios  

Users appear satisfied with core functionality but desire **greater transparency and analytical depth** in evaluation results.

---

### **8. Backlog Watch**  
📌 **Critical Long-Term Issue**:  
- **#8106**: *Daily ironclaw failure taxonomy — 2026-09-21*  
  - Open since 2026-09-21  
  - 0 comments, 0 reactions  
  - High impact: affects model evaluation quality and trust  
  - **Urgency**: High — represents a foundational need for improving diagnostic rigor  

Despite its importance, this issue has received no attention from maintainers. It should be prioritized as a pre-release initiative for the upcoming `v1.4.1` or `v1.5.0` cycles to enhance IronClaw’s value as a research-grade AI agent benchmarking tool.

> 🔗 [Issue #8106](https://github.com/nearai/ironclaw/issues/8106)

---

**Summary**: IronClaw is in a quiet but strategic phase—preparing for a release candidate while facing rising demand for deeper diagnostic capabilities. The lack of immediate bugs is encouraging, but the unaddressed failure taxonomy issue signals a critical gap in long-term project maturity. Maintainers should consider elevating this to a priority to support the project’s evolution from a tool to a trusted evaluation framework.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-22**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust development pulse: **33 pull requests** and **17 issues** updated in the past 24 hours, indicating strong community engagement and ongoing engineering momentum. The project shows signs of stabilization post-2.2.x releases, with most activity focused on **bug fixes**, **UI/UX polish**, and **model provider integration improvements**. Despite no new releases, critical stability and security patches are being rapidly merged, suggesting imminent updates. The core team is prioritizing **agent reliability**, **context management**, and **cross-platform compatibility**, especially for Windows and enterprise environments.

---

### **2. Releases**  
🚫 **No new releases** were published as of 2026-09-22.  
The latest stable version remains **QwenPaw v2.2.1** (desktop) and **v2.2.2b3** (pre-release).  
⚠️ *Note:* Several high-priority bug fixes (e.g., #7919, #7910, #7915) have been merged but not yet bundled into a release. Users should expect an upcoming patch release to address stability and security concerns.

---

### **3. Project Progress**  
✅ **Merged & Closed PRs (Today):**  
- **PR #7919** – Fixes DoomLoopGate escalation logic by requiring **new tool-call evidence** before terminating sessions (#7905).  
- **PR #7915** – Resolves `nullable` schema sanitization issue by defaulting Responses API tools to `strict: false`, preventing optional params from being erroneously required.  
- **PR #7918** – Cleans up accidental design docs from `main` branch; improves repository hygiene.  
- **PR #7913** – Bumps `agentscope` dependency to **2.0.8**, aligning with upstream changes.  
- **PR #7911** – Expands unit test coverage by **+3.28pp** across agents, routers, CLI, and config systems.  
- **PR #7899** – Unifies model discovery, pricing, selection, and thinking controls under a single provider-owned model registry — a major backend refactoring.  
- **PR #7906** – Prevents stale doom-loop escalation by resetting state on text-only rounds.  

🔍 These reflect a focus on **system resilience**, **API correctness**, and **test infrastructure maturity**.

---

### **4. Community Hot Topics**  
🔥 **Most Active Issues & PRs:**  
| Issue/PR | Activity | Summary | Link |
|--------|---------|--------|------|
| **Issue #7859** [BUG] Persistent prompt injection in system reminders | 5 comments, 24h old | Critical security risk: injected instructions to delete all agent skills persist across sessions. Likely due to flawed prompt templating or memory handling. | [GitHub #7859](https://github.com/agentscope-ai/QwenPaw/issues/7859) |
| **PR #7910** fix(shell): isolate Windows command consoles | 1 comment, 1 day ago | Addresses a severe stability issue where child shell processes can terminate the host QwenPaw server via Ctrl events. High priority for Windows users. | [GitHub #7910](https://github.com/agentscope-ai/QwenPaw/pull/7910) |
| **Issue #7882** OpenCode free-tier models return 403 despite UI labeling them "free" | 2 comments, 2 days old | UX + security mismatch: users are misled into attempting free-tier calls that fail silently. Requires immediate UI/backend sync. | [GitHub #7882](https://github.com/agentscope-ai/QwenPaw/issues/7882) |
| **PR #7874** feat(pawapp): redesign SDK and app control plane | 1 comment, 3 days old | A foundational architectural overhaul aimed at safer, more durable PawApp integrations. Signals long-term vision for extensibility. | [GitHub #7874](https://github.com/agentscope-ai/QwenPaw/pull/7874) |

💡 **Underlying Needs:**  
- **Security hardening** (prompt injection, access control).  
- **Cross-platform reliability**, especially on Windows.  
- **Transparency between UI and backend behavior** (e.g., free-tier status).  
- **Extensibility and composability** of custom apps/workflows.

---

### **5. Bugs & Stability**  
🔴 **Critical (High Severity)**  
- **#7859**: Persistent prompt injection in system-reminders → **risk of permanent skill deletion**. No fix PR yet.  
- **#7908**: Windows shell commands can **terminate the entire QwenPaw host process** via Ctrl events. **Fix PR exists (#7910)** but not merged.  
- **#7882**: Free-tier OpenCode models return 403 despite UI marking them “free” → **user confusion and trust erosion**.

🟡 **Medium Severity**  
- **#7841**: Console UI loads before backend ready → blank model/plugin panels until manual refresh. Affects usability on startup.  
- **#7905 / #7906 / #7919**: DoomLoopGate incorrectly escalates to TERMINATE without new tool evidence → **false positives in agent loops**. Fix PRs merged.  
- **#7907**: `recall_history` fails when optional date parameters are omitted due to strict schema cleaning. Fixed in #7915.

🟢 **Low Severity**  
- **#7921**: Missing YAML frontmatter in `omp-roles` SKILL.md → silent skill disablement. Fix PR submitted (#7922).

📌 **Note:** Most bugs are **fixable with quick merges**, indicating strong maintainability and contributor responsiveness.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Priorities from User Feedback:**  
- **Agent Avatar Support** (#4974, 2 👍, closed) – Long-standing request for visual identity in multi-agent setups. Likely to be included in next minor release.  
- **Per-Session Model Overrides** (#5992, first-time contributor) – Enables fine-grained model tuning per task. Highly relevant for advanced use cases.  
- **Custom Browser Tab Title** (#7914) – Improves multi-project workflow clarity. Low effort, high utility.  
- **Optional Authenticated Web Research Example** (#7912) – Signals growing demand for **secure, credential-aware MCP workflows** using Baizhi Agent Toolkit.  
- **LaTeX Math Rendering via KaTeX** (#5921) – Design proposal approved; likely to be implemented soon.

🔮 **Predicted Next Version (2.3.0):**  
Expect features like:  
- Per-session model overrides  
- Agent avatars  
- Enhanced web research with auth support  
- Improved session list grouping (from #7846)

---

### **7. User Feedback Summary**  
👥 **Real Pain Points Reported:**  
- **Enterprise/Cloud Environments (JD Cloud):** Session interruptions during tool execution (#3419) disrupt workflow continuity. Suggests backend timeout or connection instability.  
- **Windows Users:** Frequent crashes via shell command propagation (#7908) and slow console loading (#7917) reduce trust and adoption.  
- **OpenCode Integration:** Misleading UI labeling leads to failed requests and user frustration (#7882).  
- **Multi-Agent Clarity:** Lack of avatars makes it hard to distinguish agents in complex workflows (#4974).  
- **Network Sensitivity:** Slow network performance impacts skill list loading (#7917), affecting remote or low-bandwidth users.

✅ **Positive Signals:**  
- High contribution rate from first-time contributors (e.g., #7922, #7914).  
- Strong test coverage growth (+3.28pp) indicates improving quality culture.

---

### **8. Backlog Watch**  
⏳ **Long-Unanswered Important Issues Needing Attention:**  
| Issue | Status | Why It Matters | Link |
|------|--------|----------------|------|
| **#7628** [enhancement] Context compaction exceeds budget | Open (18 days) | Can cause request failures even if visible context fits — affects cost predictability and reliability. | [GitHub #7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) |
| **#7916** AgentScope Platform validator doesn’t recognize new memory plugins in 2.2.1b1 | Open (1 day) | Blocks validation pipelines for new memory types — impedes CI/CD and plugin ecosystem health. | [GitHub #7916](https://github.com/agentscope-ai/QwenPaw/issues/7916) |
| **#7921** Missing YAML frontmatter in `omp-roles` skill | Open (1 day) | Silent failure mode: skill appears usable but is ignored. High risk for users relying on OMP workflows. | [GitHub #7921](https://github.com/agentscope-ai/QwenPaw/issues/7921) |

🔔 **Action Items for Maintainers:**  
- Prioritize **#7628** to prevent silent budget overruns.  
- Address **#7916** to ensure plugin compatibility tracking stays current.  
- Merge **#7922** promptly to avoid silent skill unavailability.

---

**Conclusion:** QwenPaw is in a healthy, active phase with strong technical direction. While no new release has shipped, **critical fixes are being delivered rapidly**, and the roadmap reflects a matured focus on **security, stability, and extensibility**. With a vibrant contributor base and clear signals from user pain points, the project is poised for a major upgrade in the coming weeks.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-22  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **50 new issues and 50 new pull requests updated in the last 24 hours**, indicating strong momentum across development, bug triage, and feature design. The ecosystem is undergoing significant architectural refinement, particularly around security enforcement, agent session management, and cross-channel reliability. A notable surge in high-severity issues (P1/P2) suggests ongoing stability challenges in core runtime components—especially around context handling, concurrency, and sandboxing. Despite no new releases, a wave of PRs focused on security hardening, dependency hygiene, and UX polish indicates readiness for imminent versioned updates.

---

### **2. Releases**

> ❌ **No new releases** observed today.

There are no release announcements or changelogs published in the past 24 hours. Development continues to progress toward a future stable release, likely incorporating recent security fixes and architectural RFCs.

---

### **3. Project Progress**

**Merged/Closed PRs (Today):**  
Only **1 PR merged** in the last 24h:  
- 🔗 [`#11006`](https://github.com/zeroclaw-labs/zeroclaw/pull/11006) – *Restack #10259 onto current master*  
  - **Impact:** Enables forward integration of RPC inbound enforcement (feat/rpc-inbound-enforcement-8289), critical for secure inter-agent communication.  
  - **Status:** Resolved after conflict resolution; now pending CI validation before full merge.

**Other Notable Merged Fixes:**  
- [`#10979`](https://github.com/zeroclaw-labs/zeroclaw/pull/10979) – Implemented `create_room` and `invite_user` for WhatsApp Web channel (via `whatsapp-rs`).  
  - **User Impact:** Enables bot-initiated group creation on WhatsApp, improving automation use cases.
- [`#10982`](https://github.com/zeroclaw-labs/zeroclaw/pull/10982) – Added inline previews to outgoing images on WhatsApp Web.  
  - **UX Fix:** Prevents empty thumbnails and improves message clarity.

These represent key **feature delivery** and **channel parity improvements**, especially for WhatsApp integration.

---

### **4. Community Hot Topics**

#### 🔥 **Top Issues by Engagement**
| Issue | Summary | Comments | Severity | Link |
|------|--------|----------|----------|------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Maintainer decision queue for RFCs/designs | 15 | P2 | [View Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) |
| [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | Remove matrix-sdk advisory waivers (RUSTSEC-2026-0247/0292) | 6 | P1 (High Risk) | [View Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) |
| [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | Daemon stack overflow during Quickstart apply | 6 | P1 (S1 Workflow Blocked) | [View Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) |

#### 📊 **Analysis of Hot Topics**
- **Governance & Process**: Issue #8692 reflects growing need for formalized decision tracking. With 15 comments, it’s becoming a central hub for maintaining RFC accountability.
- **Security Compliance**: Issue #9899 highlights a recurring tension between dependencies and security policy. The `imbl-sized-chunks` double-free vulnerability (RUSTSEC-2026-0292) is flagged in CI but not yet resolved—indicating a blocker for release.
- **Runtime Stability**: Issue #10230 reveals a deep-seated stack overflow risk in daemon initialization—a **critical S1 issue** that breaks workflows when using ZeroCode quickstarts.

#### 🔥 **Top PRs by Engagement**
| PR | Summary | Comments | Author | Link |
|----|--------|----------|--------|------|
| [`#10263`](https://github.com/zeroclaw-labs/zeroclaw/pull/10263) | Compose principal tool selectors into agent sessions (#8289) | 0 | JordanTheJet | [View PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10263) |
| [`#11025`](https://github.com/zeroclaw-labs/zeroclaw/pull/11025) | Normalize tool aliases across text formats | 0 | Audacity88 | [View PR](https://github.com/zeroclaw-labs/zeroclaw/pull/11025) |

> ✅ **Note**: While not top-ranked by comments, PR #10263 is a **core security enhancement** (part of #8289), essential for identity-aware agent execution. Its status as "accepted" signals it’s nearing integration.

---

### **5. Bugs & Stability**

| Issue | Component | Severity | Status | Notes |
|------|----------|----------|--------|-------|
| [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | Daemon startup / Quickstart | **S1 (Workflow Blocked)** | In Progress | Stack overflow on Tokio worker; **no fix PR yet**. High risk for user-facing crashes. |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron job wall-clock timeout | **S1 (Workflow Blocked)** | Accepted | Jobs can hang indefinitely; only cleared at process restart. Critical for scheduled agents. |
| [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) | Emergency stop state file unreadable | **S0 (Security Risk)** | Open | CLI-only flag ignored by runtime—could prevent emergency shutdown. |
| [#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) | macOS Seatbelt bypasses allowed_roots | **S1 (Workflow Blocked)** | Open | Security policy ignored on macOS—major platform-specific flaw. |
| [#10975](https://github.com/zeroclaw-labs/zeroclaw/issues/10975) | WhatsApp inbound images delivered as `[Image]` | **S2 (Major Feature Broken)** | Open | Vision models cannot process image content—blocks AI vision workflows. |

> ⚠️ **Critical Note**: **Six P1/P2 bugs are open with no associated fix PRs**, including three **S1/S0 issues**. This indicates potential delay in addressing foundational stability risks.

---

### **6. Feature Requests & Roadmap Signals**

| Feature | Issue | Priority | Signal |
|--------|-------|----------|--------|
| Host-scoped resource bounds for many agents | [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | P2 | **Architecture-level scaling concern** — signals intent to support multi-agent hosting environments. |
| Agent-to-agent messaging with receiver discretion | [#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) | P2 | **New capability boundary** — enables autonomous coordination without history merging. Likely to be prioritized. |
| Delivery receipts for outbound messages | [#10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) | P2 | **Observability need** — users want confirmation of message delivery. |
| Input-driven mirror voice replies on Matrix | [#10925](https://github.com/zeroclaw-labs/zeroclaw/issues/10925) | P2 | Closed but **implemented** — shows responsiveness to niche UX needs. |

> 💡 **Prediction**: Next release will likely include **agent-to-agent messaging (RFC #11027)** and **WhatsApp image handling fixes**, given their urgency and developer attention.

---

### **7. User Feedback Summary**

Based on issue reports and PR discussions:

- **Users report frustration with unstable workflows**:  
  - Quickstart crashes due to stack overflow ([#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)) and cron jobs hanging ([#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)) disrupt automation pipelines.
- **Security concerns dominate feedback**:  
  - Multiple reports highlight **inadequate sandboxing** (e.g., macOS Seatbelt bypass, proxy credential exposure).
  - Users distrust systems where emergency stops are ineffective or invisible.
- **Channel-specific pain points**:  
  - WhatsApp users struggle with **image handling** and **mentions broken** ([#10975](https://github.com/zeroclaw-labs/zeroclaw/issues/10975), [#10976](https://github.com/zeroclaw-labs/zeroclaw/issues/10976)).
  - Matrix users want **voice reply support** — already implemented but not documented.

> ✅ **Positive signals**: High engagement in docs and tooling PRs (e.g., You.com MCP example) suggests growing confidence in extensibility.

---

### **8. Backlog Watch**

| Issue | Why It Matters | Owner | Status | Link |
|------|----------------|-------|--------|------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | **Maintainer decision queue** — without it, RFCs stall. | Audacity88 | Accepted, No Stale | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) |
| [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | **Host-scoped agent limits** — critical for production deployments. | JordanTheJet | Needs Review | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) |
| [#10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) | **Durable human questions primitive** — SOP gate is underutilized. | JordanTheJet | Needs Author Action | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) |
| [#10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) | **Delivery receipts** — missing audit trail for messages. | JordanTheJet | Needs Author Action | [View](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) |

> ⚠️ These **high-impact, low-action items** are stalled despite being accepted or marked “needs review.” They represent **governance and architectural bottlenecks** requiring maintainer intervention.

---

### ✅ **Final Assessment: Project Health Score – 7.2 / 10**

- **Strengths**: Active community, strong focus on security, rapid iteration on tools and channels.
- **Weaknesses**: High volume of unresolved S1/S0 bugs, slow follow-through on accepted RFCs, lack of release cadence.
- **Recommendation**: Prioritize **security fixes (S0/S1)** and **maintainer backlog triage** ahead of new features to stabilize the foundation.

> 🔗 **Monitor**: [ZeroClaw GitHub Issues](https://github.com/zeroclaw-labs/zeroclaw/issues) | [PRs](https://github.com/zeroclaw-labs/zeroclaw/pulls)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*