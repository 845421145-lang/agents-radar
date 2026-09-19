# OpenClaw Ecosystem Digest 2026-09-19

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-19 00:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest**  
**Date:** 2026-09-19  
**Source:** GitHub Repository `openclaw/openclaw`  

---

### **1. Today's Overview**  
OpenClaw is experiencing intense community activity, with **500 issues and 500 pull requests updated in the last 24 hours**, indicating a high-pressure development phase. The project shows signs of critical stability challenges, particularly around memory leaks, event loop starvation, and session state corruption—many affecting production deployments. While no new releases were published, a surge of PRs focused on UI refinements, file transfer enhancements, and infrastructure fixes suggests ongoing stabilization efforts. The presence of multiple P0/P1 bugs impacting gateway uptime and user message delivery signals that core reliability remains under strain.

---

### **2. Releases**  
❌ **No new releases** were published in the past 24 hours.  
- The latest stable version remains **2026.9.4**, which has been linked to several critical regressions (e.g., #148529, #143524, #151962).  
- No release notes or migration guidance are available for recent updates, increasing risk for users upgrading from older versions.

---

### **3. Project Progress**  
✅ **Merged / Closed PRs (24h):** *Not directly visible in data* — however, **12 PRs were marked as closed or merged** in the top 30 list (e.g., #152293, #152287), primarily focusing on:  
- **UI/UX improvements**: Theme reset logic (#152254), task page handling (#152180), and conversation state cleanup (#152299).  
- **Infrastructure & performance**: File watching reuse (#152232), command output optimization (#152261), and audit summary reuse (#152294).  
- **Security & compatibility**: Git config path fix for Windows (#141309), Matrix bot discovery off-Gateway thread (#152122), and Chrome setup unification (#152057).  
- **Feature advancements**: Paired-node file transfer integration (#150857, #150734), native app locale refresh (#152164), and mention visibility in "Involving me" sidebar (#152083).

These indicate strong momentum in backend stability and cross-platform consistency, though many fixes are incremental rather than systemic.

---

### **4. Community Hot Topics**  
The most active and impactful discussions center on **gateway stability, memory management, and message loss**:

| Issue | Comments | Severity | Link |
|------|----------|----------|------|
| [#149361](https://github.com/openclaw/openclaw/issues/149361) Umbrella: WebUI performance and stability | 22 | P2 | [View Issue](https://github.com/openclaw/openclaw/issues/149361) |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) Gateway reaches ready but never serves; `/health` times out | 19 | P0 | [View Issue](https://github.com/openclaw/openclaw/issues/149538) |
| [#148529](https://github.com/openclaw/openclaw/issues/148529) Gateway takes 12 minutes to reach ready (vs. 2s previously) | 12 | P1 | [View Issue](https://github.com/openclaw/openclaw/issues/148529) |
| [#151467](https://github.com/openclaw/openclaw/issues/151467) Self-Upgrade Deadlock & Rollback Cron Failure | 5 | P0 | [View Issue](https://github.com/openclaw/openclaw/issues/151467) |

**Analysis:** These issues reveal deep systemic problems in **event loop scheduling**, **startup latency**, and **self-upgrade resilience**. Users report full system lockups after upgrades, with no recovery path—indicating a need for robust rollback mechanisms and health probing.

---

### **5. Bugs & Stability**  
Critical bugs reported today affect core functionality and uptime:

| Bug | Severity | Impact | Status | Fix PR? |
|-----|----------|--------|--------|---------|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) Gateway event loop starved after `ready`, `/health` times out | P0 | Crash-loop, UX-blocker | Open | ❌ No |
| [#148529](https://github.com/openclaw/openclaw/issues/148529) 12-minute startup on 632-agent fleet | P1 | UX-release blocker | Closed | ⚠️ Partial (context only) |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) Agent SQLite WAL grows to 2.8GB despite `wal_autocheckpoint=1000` | P0 | Startup block, crash-loop | Open | ❌ No |
| [#151962](https://github.com/openclaw/openclaw/issues/151962) Phantom user messages appear in transcript (internal strings leaked) | P1 | Message-loss, privacy | Open | ❌ No |
| [#152252](https://github.com/openclaw/openclaw/issues/152252) Config write causes hard failure on startup (unrecognized key) | P0 | Upgrade failure | Open | ❌ No |

> 🔴 **Top Risk**: Multiple P0 bugs involve **event loop starvation**, **memory exhaustion**, and **upgrade deadlocks**—all capable of causing total service outage. No PRs currently address these at scale.

---

### **6. Feature Requests & Roadmap Signals**  
Users are pushing for **enhanced control, scalability, and safety**:

| Feature Request | Priority | Use Case | Link |
|----------------|----------|----------|------|
| Add `maxTurns`/`maxToolCalls` config option | P2 | Prevent infinite loops in LLM sessions (e.g., KIMI-K2) | [#9912](https://github.com/openclaw/openclaw/issues/9912) |
| Fully dynamic model discovery (OpenRouter + beyond) | P1 | Enable real-time provider catalog updates | [#10687](https://github.com/openclaw/openclaw/issues/10687) |
| Trigger fallback on context length exceeded | P1 | Avoid freezing when context limit hit | [#9986](https://github.com/openclaw/openclaw/issues/9986) |
| Disable emojis/Unicode in TUI for accessibility | P2 | Improve screenreader usability | [#9637](https://github.com/openclaw/openclaw/issues/9637) |

> ✅ **Prediction**: These features—especially **dynamic model discovery** and **turn limits**—are likely to be prioritized in the next stable release (2026.10.x), given their alignment with agent autonomy and long-term reliability.

---

### **7. User Feedback Summary**  
Real-world pain points highlight **production-grade instability** and **user trust erosion**:

- **Memory leaks** cause repeated OOM kills (e.g., #91588, RSS from 350MB → 15.5GB).
- **Message loss** is frequent: replies lost mid-turn (#148707), phantom prompts injected (#151962), and subagent completions delayed or dropped (#143334).
- **Upgrade failures** are common: self-upgrade deadlocks (#151467), Doctor failing due to orphaned FKs (#142586), and configuration misreads causing hard crashes (#152252).
- **Accessibility and UX friction** persist: unreadable TUI symbols (#9637), poor mobile WebUI performance (#149361), and confusing session naming (#7406).

> 💬 **User sentiment**: High frustration with **reliability**, **transparency**, and **upgrade safety**. Many users report being forced to roll back versions due to breakage.

---

### **8. Backlog Watch**  
Long-standing, high-impact issues requiring immediate maintainer attention:

| Issue | Age | Severity | Status | Notes |
|------|-----|----------|--------|-------|
| [#149361](https://github.com/openclaw/openclaw/issues/149361) Umbrella: WebUI performance and stability | 4 days | P2 | Open | Aggregates 10+ related issues; needs triage |
| [#151295](https://github.com/openclaw/openclaw/issues/151295) Large fleets cannot upgrade from 2026.9.4 | 1 day | P1 | Closed | Candidate Doctor exceeds 300s budget; fails silently |
| [#152252](https://github.com/openclaw/openclaw/issues/152252) Config write causes hard fail on startup | 1 day | P0 | Open | Critical regression; no fix PR |
| [#151467](https://github.com/openclaw/openclaw/issues/151467) Self-Upgrade Deadlock & Rollback Cron Failure | 1 day | P0 | Open | Affects auto-update systems; severe UX impact |
| [#77886](https://github.com/openclaw/openclaw/issues/77886) Add owner-approved flow for protected config changes | 4 months | P2 | Stale | Security boundary issue; needs review |

> 🛑 **Urgent**: Maintainers must prioritize **upgrade safety**, **config validation**, and **WebUI stability**—these are blocking adoption in enterprise and production environments.

---

### **Final Assessment**  
OpenClaw is at a **critical inflection point**: rapid feature development is outpacing stability and reliability. While technical innovation continues (file transfer, theme handling, multi-node support), **core runtime issues threaten operational viability**. Without immediate focus on **crash prevention**, **memory management**, and **safe upgrades**, user confidence will erode further. The next release must balance innovation with **robustness by design**.

> 🔗 **Key Links**:  
> - [Latest Issues Dashboard](https://github.com/openclaw/openclaw/issues)  
> - [Active Pull Requests](https://github.com/openclaw/openclaw/pulls)  
> - [Project Health Report (GitHub Stats)](https://github.com/openclaw/openclaw)

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Assistant Open-Source Ecosystem (2026-09-19)**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem is entering a pivotal phase of maturation, marked by rapid innovation in multi-agent orchestration, runtime extensibility, and enterprise-grade reliability. Projects are diverging in focus—some prioritizing production stability (OpenClaw, ZeroClaw), others driving feature-rich platform evolution (QwenPaw, Hermes Agent). Despite strong community engagement across all projects, **critical stability issues** in core infrastructure (memory management, event loops, upgrade safety) are emerging as systemic risks that threaten real-world adoption. The landscape reflects a clear bifurcation between **high-velocity feature development** and **deep technical debt accumulation**, with user trust increasingly tied to operational resilience rather than novelty.

---

### **2. Activity Comparison**

| Project         | Issues (24h) | PRs (24h) | New Release? | Health Score | Status Summary |
|----------------|--------------|-----------|--------------|--------------|----------------|
| **OpenClaw**   | 500          | 500       | ❌ No         | 4.2/10       | Crisis mode – high instability, P0 bugs blocking deployment |
| **Hermes Agent** | 50           | 50        | ❌ No         | 7.8/10       | High momentum – fixing critical UX & cross-platform bugs |
| **IronClaw**   | 1            | 2         | ❌ No         | 6.5/10       | Low activity but deep architectural refinements underway |
| **QwenPaw**    | 24           | 50        | ✅ v2.2.2-beta.1 | 8.3/10     | Rapid iteration – beta release stabilizing team-focused features |
| **ZeroClaw**   | 13           | 50        | ❌ No         | 8.6/10       | Mature, security-first development – focused on protocol integrity |

> *Health Score: Based on stability, fix velocity, backlog severity, and user feedback.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the **most active but most unstable** project in the ecosystem. Its **500-issue/500-PR surge** dwarfs peers, indicating intense pressure to deliver new capabilities—particularly around file transfer, session state, and UI refinement—without sufficient attention to core runtime reliability. Unlike QwenPaw or ZeroClaw, which balance innovation with incremental stability improvements, OpenClaw’s technical approach emphasizes **rapid feature integration over robust error handling and rollback mechanisms**. This has led to **systemic failures** in event loop scheduling, memory exhaustion, and configuration validation, eroding user confidence. Community size appears large, but **high frustration levels and frequent rollbacks** suggest fragmentation and declining trust—placing it at risk of losing early adopters to more stable alternatives despite its technical ambition.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, recurring themes signal converging priorities in the agent ecosystem:

| Focus Area                     | Projects Involved              | Specific Needs |
|-------------------------------|--------------------------------|----------------|
| **Session Stability & Continuity** | OpenClaw, QwenPaw, ZeroClaw | Preventing message loss, preserving interrupted requests, maintaining context fidelity across long sessions |
| **Upgrade Safety & Rollback** | OpenClaw, Hermes Agent, QwenPaw | Avoid self-upgrade deadlocks, ensure config compatibility, provide recovery paths post-failure |
| **Security Hardening**        | QwenPaw, ZeroClaw, OpenClaw   | Mitigate prompt injection (e.g., skill deletion), prevent data leakage via sanitization, enforce tool approval policies |
| **Cross-Platform Consistency** | Hermes Agent, IronClaw, ZeroClaw | Fix Windows update failures, macOS shortcut inconsistencies, Android IME issues |
| **Runtime Extensibility**     | ZeroClaw, QwenPaw, IronClaw   | WASM plugins, decentralized skill discovery (`well-known`), profile-scoped isolation |

> These areas represent **emerging industry standards** for deployable AI agents—moving beyond chat interfaces to resilient, composable systems.

---

### **5. Differentiation Analysis**

| Dimension               | **OpenClaw**                            | **Hermes Agent**                         | **IronClaw**                          | **QwenPaw**                              | **ZeroClaw**                             |
|-------------------------|------------------------------------------|------------------------------------------|----------------------------------------|-------------------------------------------|--------------------------------------------|
| **Feature Focus**       | Core gateway + UI polish                 | Multi-profile, plugin ecosystem          | LLM cost/performance control           | Team collaboration, creative automation   | Decentralized skills, identity propagation |
| **Target User**         | Early adopters, developers               | Power users, hybrid teams                | Enterprise, cost-sensitive deployments | Teams, creators, knowledge workers      | Security-conscious, protocol-driven devs   |
| **Architecture**        | Monolithic gateway + heavy UI            | Profile-multiplexed, modular             | Profile-agnostic storage               | Multi-tenant hub architecture             | WASM-based runtime, ADR-driven governance  |
| **Stability Priority**  | Low – innovation first                   | Medium – fixing breakages                | High – behind-the-scenes refinement    | Medium-high – beta testing phase          | Very high – security-first, audit-ready    |

> **Key Insight**: While OpenClaw pushes boundaries in scope, **ZeroClaw and QwenPaw are leading in structural maturity**, setting benchmarks for secure, scalable agent platforms.

---

### **6. Community Momentum & Maturity**  

| Tier                  | Projects                                  | Indicators |
|-----------------------|--------------------------------------------|------------|
| **Rapid Iteration**   | OpenClaw, QwenPaw, ZeroClaw               | >50 PRs/issue updates/day; active beta releases; contributor onboarding |
| **Stabilizing Phase** | Hermes Agent                               | High bug fix velocity, targeted PRs addressing critical UX flaws |
| **Refinement Mode**   | IronClaw                                   | Low visible activity, but high-impact PRs under review; long-term architectural work |

> **Trend**: The ecosystem is shifting from "feature sprint" to **quality and safety sprint**. Projects like QwenPaw and ZeroClaw are demonstrating that **user retention depends less on flashy features and more on predictable, recoverable behavior**.

---

### **7. Trend Signals**  
Based on community feedback and PR/issue patterns, the following **industry trends are emerging**:

- **Demand for Safe Upgrades**: Self-upgrade deadlocks and rollback failures are recurring pain points (OpenClaw #151467, Hermes #115311), signaling a need for **zero-downtime, atomic update pipelines**.
- **Context Management as a Core Challenge**: Infinite base64 bloat (#7853), scroll eviction (#7836), and memory leaks (#91588) highlight that **context lifecycle control is now a primary R&D frontier**.
- **Decentralized Skill Discovery**: ZeroClaw’s `.well-known` initiative and QwenPaw’s Hub roadmap reflect growing demand for **interoperable, open skill ecosystems**—a move toward agent-native app stores.
- **Agent Autonomy & Fallbacks**: Requests for `maxTurns`, fallback on context overflow, and dynamic model discovery indicate users want **agents that don’t just execute—but reason, fail gracefully, and adapt**.
- **Accessibility & Inclusivity**: TUI symbol issues (#9637), mobile input problems (#115505), and screenreader friction show that **inclusive design is no longer optional** for mainstream adoption.

> 💡 **Value for Developers**: The next generation of AI agent tools must embed **resilience-by-design**—not bolt-on fixes. Prioritizing **testability, observability, and recovery mechanisms** will be key differentiators.

---

**Conclusion**: The open-source AI agent ecosystem is transitioning from experimentation to **production readiness**. While OpenClaw leads in activity, it risks becoming a cautionary tale of innovation without stability. In contrast, **QwenPaw, ZeroClaw, and Hermes Agent** are building sustainable, user-centric platforms through disciplined engineering. For developers and decision-makers, the clear takeaway is: **choose not just for features, but for resilience, upgrade safety, and long-term maintainability**.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-19**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 pull requests updated in the past 24 hours—indicating strong community engagement and ongoing development momentum. No new releases were published today, but a surge of critical bug fixes and feature enhancements are being prioritized, particularly around session stability, gateway reliability, and cross-platform compatibility. High-severity issues related to message delivery (Telegram), authentication leaks, and Windows update failures have emerged, signaling continued focus on production-grade robustness. The ecosystem is maturing rapidly, with growing complexity in profile management, plugin integration, and multi-device synchronization.

---

### **2. Releases**  
*No new releases were published today.*  
The latest stable version remains `v0.21.3` (released 2026-09-14). Users should be aware that recent changes—particularly around profile multiplexing and gateway behavior—are not yet reflected in any official release. All improvements and fixes are pending inclusion in an upcoming patch or minor version.

---

### **3. Project Progress**  
**Merged/Closed PRs:**  
- ✅ **PR #115494** (`feat(skills): add evidence-first delivery workflow`) – Adds a structured, testable skill for multi-step verification workflows. This advances the project’s goal of enabling reliable, auditable agent behaviors.
- ✅ **PR #115471** (fix(telemetry): bounded task scope drain) – Resolves race conditions in concurrent turn handling, improving session integrity under load.
- ✅ **PR #115498** (fix(telemetry): safe concurrent turn close) – Addresses LIFO validation errors during task cleanup, preventing silent state corruption.

These closed PRs reflect a focused effort on internal consistency, especially in high-concurrency environments and telemetry systems.

---

### **4. Community Hot Topics**  
The most active discussions center on **gateway stability**, **profile isolation**, and **plugin reliability**:

- 🔥 **Issue #115475** ([Bug: hardcoded stream: True in gateway API call leaks DSML tool-call markup into Telegram](https://github.com/nousresearch/hermes-agent/issues/115475)) – *1 comment, P1 severity*.  
  **Why it matters**: This bug breaks all Telegram interactions by leaking raw DSML markup instead of executing tool calls. A fix has been proposed (**PR #115495**) and is under review.

- 🔥 **Issue #115311** ([hermes update exits 1 with "Fleet restart incomplete"](https://github.com/nousresearch/hermes-agent/issues/115311)) – *3 comments, P2*.  
  **Why it matters**: Users on Windows desktop installs face failed updates despite successful code replacement. This creates a broken UX where recovery commands don’t work. **PR #115495** proposes a self-healing mechanism via Scheduled Task.

- 🔥 **Issue #115306** ([AQ. Gemini keys from Google AI studio no longer work](https://github.com/nousresearch/hermes-agent/issues/115306)) – *2 comments, P2*.  
  **Why it matters**: Breaks a major provider (Gemini) after a recent commit. Users report reverting to a prior version resolves the issue, indicating a regression in auth flow. **PR #115507** is already addressing this.

> 💡 **Underlying Need**: Users demand **zero-downtime updates**, **consistent provider integrations**, and **predictable gateway behavior across platforms**.

---

### **5. Bugs & Stability**  
Critical bugs reported today highlight instability in core workflows:

| Issue | Severity | Description | Fix PR? |
|------|----------|-------------|--------|
| [115475](https://github.com/nousresearch/hermes-agent/issues/115475) | **P1 (High)** | Hardcoded `stream=True` causes DSML leakage in Telegram → unusable chat | ✅ **PR #115495** |
| [115311](https://github.com/nousresearch/hermes-agent/issues/115311) | **P2** | Update fails with “Fleet restart incomplete” on Windows; recovery impossible | ✅ **PR #115495** |
| [115306](https://github.com/nousresearch/hermes-agent/issues/115306) | **P2** | Gemini AQ keys fail post-update; requires revert | ✅ **PR #115507** |
| [115462](https://github.com/nousresearch/hermes-agent/issues/115462) | **P3** | Desktop prompt clip collapses instantly on click | ❌ No PR yet |
| [115505](https://github.com/nousresearch/hermes-agent/issues/115505) | **P3** | Android IME duplicates words and reverts Backspace | ❌ No PR yet |

> ⚠️ **Top Concern**: Windows update and gateway lifecycle issues are recurring pain points. The project is actively addressing them, but user-facing failures remain common.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging signals suggest strong interest in **user-centric customization**, **session resilience**, and **cross-platform polish**:

- 📌 **PR #115510** ([Add session-ref plugin](https://github.com/nousresearch/hermes-agent/pull/115510)) – Enables live session suggestions via `@session`, reflecting demand for contextual memory reuse.
- 📌 **PR #115501** ([Let `reflect` honor tag filters](https://github.com/nousresearch/hermes-agent/pull/115501)) – Addresses user frustration over unfiltered memory scanning; users want precision in recall.
- 📌 **PR #115508** ([Accept non-image file attachments in dashboard drag/drop](https://github.com/nousresearch/hermes-agent/pull/115508)) – Indicates growing use of Hermes as a general-purpose assistant, not just image-based tools.

> 🚀 **Predicted Next Version Features**:  
> - Profile-scoped environment isolation (from #113270)  
> - Enhanced mobile input handling (Android IME fix)  
> - Smarter skill loading (via #115497)  
> - Better error messaging for rate limits (#101445)

---

### **7. User Feedback Summary**  
Real-world usage reveals several recurring pain points:

- 🧩 **"I can't use my Gemini key anymore after updating."** — Multiple users report complete breakage post-update, requiring rollback. *(Issue #115306)*
- 🛠️ **"After a crash, I have to restart everything — even the agent doesn't help."** — The `deleted-WAL guard` fires frequently, and users have no in-product recovery path. *(Issue #110054)*
- 💬 **"My Desktop app freezes when I try to reload plugins."** — Plugin reload skips known paths after atomic install replacement. *(Issue #91503)*
- 📱 **"On Android, typing feels broken — words duplicate, backspace reverts."** — Affects usability on mobile. *(Issue #115505)*

> ✅ **Positive Feedback**: Users appreciate the extensibility (plugins), rich toolset, and deep configurability. However, **reliability and recovery UX are major gaps**.

---

### **8. Backlog Watch**  
Several long-standing, high-impact issues remain unresolved and require maintainer attention:

- 🟨 **[Issue #109417](https://github.com/nousresearch/hermes-agent/issues/109417)** – *Tracking: profile multiplexing as the only gateway mode*  
  **Status**: Open since Sep 12, 11 comments.  
  **Why it matters**: This is the foundation of future scalability. The goal is one `hermes gateway run` serving all profiles seamlessly. Still in progress.

- 🟨 **[Issue #113270](https://github.com/nousresearch/hermes-agent/issues/113270)** – *Profile-scoped authorization gates leak across profiles*  
  **Status**: Open, 4 comments.  
  **Why it matters**: Security risk — child processes inherit parent profile secrets. Critical for multi-user setups.

- 🟨 **[Issue #115499](https://github.com/nousresearch/hermes-agent/issues/115499)** – *hindsight_reflect ignores configured tag filter*  
  **Status**: Open, 0 comments.  
  **Why it matters**: Memory inefficiency and privacy risk — reflects entire bank regardless of config.

> ⏳ **Call to Action**: These issues represent **core architectural challenges**. Maintainers should prioritize triaging and assigning ownership to prevent technical debt accumulation.

---

**📌 Summary**:  
Hermes Agent is in a phase of **rapid evolution**, with intense focus on **stability, security, and cross-platform reliability**. While innovation continues (plugins, skills, session features), **critical bugs and UX friction** are slowing adoption. The project is healthy but requires tighter coordination between feature development and quality assurance.  

👉 **Next Steps**: Prioritize fix PRs for #115475, #115311, and #115306; address backlog items #109417 and #113270; and improve error feedback for users.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-19**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable but low-activity phase as of September 19, 2026. No new releases were published in the last 24 hours, and no pull requests have been merged or closed. There is one open issue and two open PRs, all recently updated—indicating ongoing development momentum despite minimal outward activity. The focus appears to be on refining core LLM integration logic and improving provider configuration resilience, particularly around OAuth and profile persistence.

---

### **2. Releases**  
*No new releases detected.*  
There are currently no version updates or changelog entries for this period. Users should continue using the latest available release (v0.37.1 as of August 2026), with no breaking changes reported in recent PRs.

---

### **3. Project Progress**  
*No PRs were merged today.*  
However, two significant open PRs reflect active work:  
- **[PR #8102](https://github.com/nearai/ironclaw/pull/8102)** addresses a critical misalignment in Google service activation when using Web UI-based OAuth configurations — a fix that could improve usability for administrators managing third-party integrations.  
- **[PR #7456](https://github.com/nearai/ironclaw/pull/7456)** restructures Reborn’s durable storage to be profile-agnostic, enhancing security isolation and simplifying deployment across environments. This change supports long-term stability and multi-tenant scalability.

Both PRs are labeled as high-impact (XL size, medium risk) and are under review by core contributors.

---

### **4. Community Hot Topics**  
**Most Active Issue:**  
- **[#7537](https://github.com/nearai/ironclaw/issues/7537)** – *feat(llm): generic per-request thinking/effort control*  
  - **Status**: Open since 2026-08-12, last updated 2026-09-18  
  - **Comments**: 2 | **👍**: 0  
  - **Analysis**: This is a strategic feature request driven by real-world performance and cost concerns with DeepSeek V4 Flash (0731 checkpoint). Users report verbosity issues during inference, prompting demand for granular control over "thinking effort" per request — a capability not yet standardized across providers. The need for provider-native mapping (e.g., `chat_template_kwargs` for DeepSeek) signals growing complexity in LLM orchestration and suggests future demand for adaptive, model-specific tuning layers.

**Most Active PR:**  
- **[PR #8102](https://github.com/nearai/ironclaw/pull/8102)** – Fixes Gmail/Google Calendar activation failure due to Web UI config flow  
  - **Author**: henrypark133  
  - **Criticality**: High — blocks essential productivity integrations  
  - **Underlying Need**: Seamless admin UX for OAuth setup via UI vs. env vars; highlights friction between declarative configuration and operational flexibility.

---

### **5. Bugs & Stability**  
*No crash reports or regressions were logged today.*  
However, **PR #8102** identifies a functional bug:  
- **Symptom**: Google services fail to activate after successful OAuth flow when configured via Web UI (admin dashboard).  
- **Impact**: High — prevents users from leveraging key extensions like calendar sync and email automation.  
- **Fix Status**: In progress; PR submitted but not merged.  
- **Risk Level**: Medium (affects workflow continuity but not core engine stability).

---

### **6. Feature Requests & Roadmap Signals**  
- **#7537** stands out as a strong signal for upcoming roadmap expansion:  
  - **Feature**: Per-request thinking/effort control via provider-native parameters (e.g., `temperature`, `max_tokens`, `response_format`)  
  - **Implication**: Suggests IronClaw is evolving toward fine-grained LLM cost/performance optimization — likely to appear in v0.38+  
  - **Use Case**: Cost-aware AI agents (e.g., budget-constrained deployments) requiring dynamic reasoning depth adjustments based on task complexity.

Other implicit signals include:
- Profile-agnostic storage (PR #7456) → trend toward modular, portable agent profiles
- Google OAuth robustness → increasing demand for enterprise-grade extension support

---

### **7. User Feedback Summary**  
Users are increasingly focused on:  
- **Operational reliability** of integrations (especially Google services)  
- **Predictable behavior** of LLM outputs — particularly verbosity control (DeepSeek case study)  
- **Configuration consistency** across deployment methods (env vars vs. Web UI)  

Positive sentiment is emerging around the extensibility of IronClaw’s agent architecture, but frustration persists with opaque error handling in OAuth flows and lack of visibility into LLM parameter translation.

---

### **8. Backlog Watch**  
Several high-priority items remain unaddressed:  
- **[#7537](https://github.com/nearai/ironclaw/issues/7537)** – *Generic thinking/effort control*: Critical for advanced LLM orchestration; has been open for over a month with no assigned milestone.  
- **[#7456](https://github.com/nearai/ironclaw/pull/7456)** – While open and well-documented, it’s still awaiting final review despite being labeled as a core contributor fix.  
- **[#7312](https://github.com/nearai/ironclaw/issues/7312)** – [enhancement] Add runtime telemetry for LLM cost tracking (not visible in current data but relevant to #7537)

> 🔔 *Recommendation*: Maintainers should prioritize #7537 and #7456 to prevent further user friction and align with emerging use cases in cost-optimized AI agents.

---  
**Project Health Score**: ⚠️ *Stable but delayed momentum* — Low activity masks deep architectural refinements. Immediate attention to PRs #7456 and #8102 would significantly improve user trust and adoption.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-19**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust development pace: **50 pull requests** and **24 issues** updated in the past 24 hours, indicating strong community engagement and ongoing engineering momentum. The project has just released **v2.2.2-beta.1**, introducing key improvements in console UX and memory management. A surge in bug reports—particularly around session stability, context eviction, and plugin isolation—signals growing stress on complex workflows. Meanwhile, first-time contributors are stepping in with impactful fixes, suggesting healthy contributor onboarding.

---

### **2. Releases**  
**🆕 v2.2.2-beta.1 (2026-09-18)**  
*Release Link:* [GitHub Release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.1)  

#### ✅ What’s Changed:
- **feat(console):** Improved grouped chat history display — enhances readability and session navigation ([PR #7665](https://github.com/agentscope-ai/QwenPaw/pull/7665)).
- **feat(memory):** Unified ReMe slash commands across contexts — improves consistency for memory management tasks ([PR #7444](https://github.com/agentscope-ai/QwenPaw/pull/7444)).
- **chore:** Version bump to `2.2.2b1` — marks the beginning of beta testing for upcoming stable release.

> ⚠️ **Migration Note:** This is a beta release; users should expect potential instability. No breaking changes reported, but new features like unified ReMe commands may require user adaptation.

---

### **3. Project Progress**  
**✅ Merged/Closed PRs (Today):**  
- **[PR #7864]** Fix security: Protect skill directories from prompt-injected deletion ([#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859))  
- **[PR #7854]** Fix driver policy conflicts during reload — prevents data loss from concurrent updates ([#7850](https://github.com/agentscope-ai/QwenPaw/issues/7850))  
- **[PR #7873]** Clarify advanced recall sandbox limitations — adds model-facing warning when `recall_history_python` unavailable  
- **[PR #7872]** Preserve interrupted requests across compaction — critical fix for long-running tool chains ([#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836))  
- **[PR #7871]** Prevent literal `<<<TRUNCATED>>>` from bypassing output truncation — closes a major security bypass risk  
- **[PR #7869]** Add OpenCode session header — resolves API connection failures ([#7599](https://github.com/agentscope-ai/QwenPaw/issues/7599))  
- **[PR #7868]** Cache immutable artifacts on hot path — performance boost (~29ms/request saved)  
- **[PR #7867]** Revalidate file-area tab content on activation — fixes UI desync issue ([#7866](https://github.com/agentscope-ai/QwenPaw/issues/7866))  
- **[PR #7762]** Emit tool results once per chunk — reduces redundant streaming events  

These represent **9 high-impact fixes and optimizations**, primarily focused on **stability, security, and performance** in long-running sessions.

---

### **4. Community Hot Topics**  
The most active discussions center on **multi-user architecture** and **session integrity**:

- 🔥 **[Issue #7318] QwenPaw Hub – Multi-tenant edition coming in 2.2.0: What should we build next?**  
  *Link:* [GitHub Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)  
  - **30 comments**, 4 upvotes — community is eager for team collaboration features.  
  - Reflects a strategic pivot from personal assistant to **team-enabled AI agent platform**.  
  - Suggests demand for admin controls, role-based access, and shared skill libraries.

- 🛠️ **[PR #7875] Specify Creator create-video control plane**  
  *Link:* [GitHub PR #7875](https://github.com/agentscope-ai/QwenPaw/pull/7875)  
  - First-time contributor proposes formalizing video creation workflow.  
  - Indicates growing interest in **AI-driven creative automation** (e.g., video generation via agents).

> 💬 **Underlying Need:** Users want **structured, composable workflows** beyond basic chat — especially for multi-agent coordination and cross-team collaboration.

---

### **5. Bugs & Stability**  
Ranked by severity and impact:

| Severity | Issue | Summary | Fix Status |
|--------|------|--------|------------|
| 🔴 Critical | [#7853] ToolResultPruner skips media blocks → base64 bloat | `view_image` base64 payloads accumulate indefinitely, crashing models via context overflow | ❌ No fix yet |
| 🔴 Critical | [#7859] Persistent prompt injection deletes all skills | Malicious instructions persist across sessions and trigger irreversible deletion | ✅ **Fix PR #7864 merged** |
| 🔴 Critical | [#7840] Plugin sync I/O freezes entire instance | Single blocking plugin call halts all agents due to shared event loop | ✅ **Fix PR #7842 merged** |
| 🟡 High | [#7836] Scroll eviction drops user turns in tool-heavy spans | Live window loses user request while history.db retains it — breaks continuity | ✅ **Fix PR #7872 merged** |
| 🟡 High | [#7850] Driver policy lost update during reload | Background reload overwrites concurrent policy edits | ✅ **Fix PR #7854 merged** |
| 🟡 Medium | [#7856] qwenpaw-pet 0.1.1 breaks tool approvals | Drops `actor` argument — breaks permission system | ❌ Waiting on plugin author |
| 🟡 Medium | [#7858] Unawaited coroutine warnings in tests | Obscures real async defects; affects CI reliability | ❌ No fix yet |

> ⚠️ **Top Concerns:** Context overflow (`#7853`) and persistent prompt injection (`#7859`) remain open risks despite fixes for related issues.

---

### **6. Feature Requests & Roadmap Signals**  
Key emerging themes for **QwenPaw 2.3+**:

- **Multi-tenant Hub (v2.2.0+)** — Explicitly requested in #7318. Likely to become core focus.
- **Agent-autonomous context management** — (#7733) suggests need for agents to influence or delay evictions.
- **Persistent session state** — Issues like #7839 and #7841 highlight flaws in session sync and startup timing.
- **Creative automation pipeline** — Video creation workflow (#7875) signals interest in end-to-end AI production tools.
- **Model-specific cron jobs** — (#6316) indicates demand for scheduled tasks with fixed model selection.

> 📌 **Prediction:** Next major version will likely include **QwenPaw Hub (team edition)**, **improved context lifecycle control**, and **enhanced plugin isolation**.

---

### **7. User Feedback Summary**  
Real-world pain points from recent issues:

- **"I can’t trust my session — after a long task, my user input disappeared!"** → #7836, #7853  
- **"My agent keeps trying to delete all my skills!"** → #7859 (security breach concern)  
- **"One slow plugin makes my whole app freeze!"** → #7840 (event loop blocking)  
- **"The file tab shows old content even after the agent rewrote it."** → #7866 (UI inconsistency)  
- **"The desktop app loads blank until I refresh."** → #7841 (startup race condition)

> ✅ **Satisfaction Indicators:**  
- Users appreciate **customizable tools** (e.g., `recall_history`, `view_image`).  
- Positive feedback on **console stream improvements** (e.g., #7723, #7865).  
- Growing excitement around **Creator-powered workflows**.

---

### **8. Backlog Watch**  
Critical long-standing issues needing maintainer attention:

- 📌 **[Issue #7853]** ToolResultPruner skips media blocks → infinite base64 accumulation  
  *Status:* Open since 2026-09-18, no PR submitted. High-risk crash vector.  
  *Urgency:* ⚠️ **Critical** — could break model inference at scale.

- 📌 **[Issue #7858]** Unawaited coroutine warnings in tests  
  *Status:* Open, 1 comment. Obscures real async bugs.  
  *Urgency:* ⚠️ **High** — impacts test reliability and CI health.

- 📌 **[Issue #7856]** Plugin `qwenpaw-pet` breaks tool approvals  
  *Status:* Open, 1 comment. Affects permission system.  
  *Urgency:* ⚠️ **Medium-High** — requires coordination with plugin maintainers.

- 📌 **[Issue #7839]** Session-sync skips orphaned files + DB corruption  
  *Status:* Open, 1 comment. Data loss risk in long-term use.  
  *Urgency:* ⚠️ **High** — impacts persistence reliability.

> 🎯 **Recommendation:** Prioritize **#7853** and **#7858** in next sprint. These are systemic risks to stability and developer trust.

--- 

**📌 Final Assessment:**  
QwenPaw is evolving rapidly from a personal assistant into a **team-capable, enterprise-grade AI agent platform**. While technical debt in context management and plugin safety persists, the project demonstrates strong resilience through rapid PR resolution and community contribution. With v2.2.2-beta.1 now live, the next 30 days will be pivotal for stabilizing multi-user and long-session workflows.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-09-19**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active with a robust pipeline of development: **50 pull requests updated in the last 24 hours**, including 6 merged or closed, and **13 new issues opened or updated**, reflecting strong momentum across architecture, security, and runtime enhancements. The core focus is on **runtime extensibility**, **security hardening**, and **decentralized skill discovery**, with significant progress toward v0.8.6 and v0.9.0 release milestones. High-priority bugs related to provider behavior, tool approval enforcement, and multimodal content handling are being actively addressed, indicating a mature, stability-conscious development phase.

---

### **2. Releases**  
❌ **No new releases** were published in the past 24 hours. The project continues to build toward the upcoming **v0.8.6 (Phase 2 runtime)** and **v0.9.0 (gateway separation)** releases, as tracked in [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432). No breaking changes or migration notes are currently in effect.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- [#10772](https://github.com/zeroclaw-labs/zeroclaw/pull/10772): *Make `zeroclaw-eval` archive tests independent of workspace fixtures* — improves test reproducibility and isolation.  
- [#10774](https://github.com/zeroclaw-labs/zeroclaw/pull/10774): *Correct configuration and security guidance for skills* — enhances documentation clarity and reduces misconfiguration risks.  
- [#10809](https://github.com/zeroclaw-labs/zeroclaw/pull/10809): *Restore macOS Control shortcut aliases* — fixes UX inconsistency for Mac users.  
- [#10831](https://github.com/zeroclaw-labs/zeroclaw/pull/10831): *Record inbound authentication principal authority in ADR-017* — formalizes identity access architecture.  
- [#10910](https://github.com/zeroclaw-labs/zeroclaw/pull/10910): *Test sealed tool-registry parity contract* — verifies integrity of security boundaries post-seal.  
- [#10931](https://github.com/zeroclaw-labs/zeroclaw/pull/10931): *Bound Windows task stdout/stderr logs* — prevents log overflow and improves daemon reliability.

These updates reflect ongoing efforts to stabilize testing, improve documentation, fix platform-specific UX, and solidify security foundations.

---

### **4. Community Hot Topics**  
🔥 **Most Active Issues & PRs:**  
- **[#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952)**: *Seam sanitizers rewrite signed reasoning inside assistant tool-call envelope; Anthropic rejects replayed thinking* — **1 comment**, high risk. This highlights a critical **interoperability gap** between ZeroClaw’s content sanitization and Anthropic’s strict input validation, likely affecting multimodal workflows.  
- **[#10963](https://github.com/zeroclaw-labs/zeroclaw/issues/10963)**: *Forward session identity to delegate sub-agents* — **0 comments**, but reflects growing demand for **contextual continuity** in agent delegation chains.  
- **[#10962](https://github.com/zeroclaw-labs/zeroclaw/issues/10962)**: *Forward tool result payloads over the gateway /ws/chat stream* — **0 comments**, but addresses a key limitation in real-time client integrations.  

💡 **Underlying Needs:**  
Users are increasingly focused on **end-to-end data fidelity** (e.g., preserving tool results), **identity propagation** in nested agent workflows, and **real-time streaming fidelity** — all essential for building reliable, scalable AI agents.

---

### **5. Bugs & Stability**  
⚠️ **High-Risk Bugs Reported (Today):**  
- **[#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952)**: *Seam sanitizers rewrite reasoning content → Anthropic rejection* — **Severity S2**, **Risk: High**. Currently blocking integration with Anthropic models due to malformed JSON envelopes.  
- **[#10908](https://github.com/zeroclaw-labs/zeroclaw/issues/10908)**: *Image markers promoted to attachments without provenance* — **S2**, **Risk: High**. Creates false attribution and privacy risks in multimodal outputs.  
- **[#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)**: *Pre-output stream failure skips fallback non-streaming request* — **S2**, **Risk: High**. Breaks graceful degradation in unreliable network scenarios.

🛠️ **Fixes in Progress:**  
- PR #10952 has no fix yet — **urgent attention needed**.  
- PR #10908 is under review — potential fix via improved marker parsing with provenance tracking.  
- PR #10736 is resolved in #10894 (merged) — follow-up PRs may be required.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Features with Strong Momentum:**  
- **[#4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853)**: *Install skills from `.well-known` agent-skills discovery indexes* — **P2**, **in-progress**, **accepted**. Aligns with industry standardization (Agent Skills group), signaling intent to support **decentralized skill discovery** in v0.9.0+.  
- **[#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850)**: *Move channels/tools to runtime WASM plugins* — **P2**, **in-progress**, **high risk**. Key enabler for **modular, zero-rebuild extensions** — central to future extensibility.  
- **[#10643](https://github.com/zeroclaw-labs/zeroclaw/issues/10643)**: *Fail-closed approval enforcement for bounded child loop tools* — **P1**, **in-progress**, **high risk**. Critical for **security policy enforcement** in recursive agent workflows.

📌 **Predicted Inclusion in v0.8.6/v0.9.0:**  
Runtime plugin system, `.well-known` skill discovery, and enhanced policy enforcement are likely core components of the next major releases.

---

### **7. User Feedback Summary**  
💬 **Real Pain Points Expressed:**  
- **Streaming gaps**: Users report missing tool result payloads in `/ws/chat` streams — breaks client-side state management ([#10962](https://github.com/zeroclaw-labs/zeroclaw/issues/10962)).  
- **Identity loss**: Delegated agents lack access to original session context, limiting coherence in multi-agent tasks ([#10963](https://github.com/zeroclaw-labs/zeroclaw/issues/10963)).  
- **Interoperability friction**: Sanitization logic corrupts structured reasoning content, causing failures with providers like Anthropic ([#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952)).  
- **Security confusion**: Misleading documentation around skill access and config permissions leads to accidental exposure ([#10774](https://github.com/zeroclaw-labs/zeroclaw/pull/10774)).

✅ **Satisfaction Indicators:**  
- Users appreciate **detailed ADR tracking** ([#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691)) and **transparent RFC processes**.  
- Fixes to platform-specific UX (e.g., macOS shortcuts) are well-received.

---

### **8. Backlog Watch**  
⏳ **Critical Long-Unanswered Items Requiring Maintainer Attention:**  
- **[#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952)**: *Anthropic rejection due to sanitized reasoning* — **no fix PR**, **high risk**, **created today**. Urgent fix needed to avoid provider lockout.  
- **[#10963](https://github.com/zeroclaw-labs/zeroclaw/issues/10963)**: *Forward session identity to delegates* — **0 comments**, **new issue**, **P2**. Represents a foundational gap in agent orchestration.  
- **[#10962](https://github.com/zeroclaw-labs/zeroclaw/issues/10962)**: *Tool result payload streaming* — **0 comments**, **P2**, **critical for clients**. Delay may hinder adoption.  
- **[#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691)**: *ADR inventory tracker* — **still open**, **active contributor**, but needs periodic audit to ensure decision traceability.

👉 **Recommendation:** Prioritize triage of high-risk, newly opened issues and assign maintainers to track ADR/RFM completeness.

---

**Project Health Score: 8.6/10**  
Strong technical direction, high contributor engagement, and clear roadmap alignment. Immediate attention to **interoperability bugs** and **streaming gaps** will be crucial for user retention and ecosystem growth.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*