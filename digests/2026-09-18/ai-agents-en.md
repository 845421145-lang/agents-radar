# OpenClaw Ecosystem Digest 2026-09-18

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-18 00:44 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest**  
**Date:** 2026-09-18  
**Source:** GitHub Repository `openclaw/openclaw`  

---

### **1. Today's Overview**  
OpenClaw is experiencing intense community activity with **500 issues and 500 pull requests updated in the last 24 hours**, indicating a high-pressure development phase. The project remains stable in release status (no new releases), but stability concerns are mounting across multiple critical components—particularly the Gateway, WebUI, and agent lifecycle management. A surge of P0/P1 bugs related to crashes, message loss, and session state corruption suggests recent changes may have introduced systemic regressions. Despite this, strong momentum in PRs reflects active efforts to resolve core issues, especially around process cleanup, session integrity, and cross-platform compatibility.

---

### **2. Releases**  
**No new releases** were published in the past 24 hours.  
- Last release: `2026.9.4` (3a9d69d) – reported as a regression point for multiple critical bugs.
- No migration notes or breaking changes announced.  
👉 [GitHub Release History](https://github.com/openclaw/openclaw/releases)

---

### **3. Project Progress**  
**Merged/Closed PRs (today):**  
- **#151247**: Fixed metadata broadcast synchronization in Control UI (`gateway`, `maintainer`) — reduces unnecessary network load.  
- **#151269**: Restored Gateway startup under Bun (`sqlite`, `gateway`) — critical for alternative runtime support.  
- **#151274**: Refactored test infrastructure to share deferred gates (`tests`, `gateway`) — improves test reliability.  
- **#151279**: Optimized cron binding checks to avoid session list rebuilds (`cron`, `sessions`).  

**Features Advanced:**  
- **#151176**: Added MVP harness for OpenAI Agents API (`agents`, `openai`) — signals future integration path beyond Codex.  
- **#150549**: Unified chat reply context and participant controls (`ui`, `web-ui`) — improves UX consistency in shared chats.  

These fixes indicate prioritization of **performance, stability, and long-term extensibility** over feature bloat.

---

### **4. Community Hot Topics**  
The most active discussions center on **crash loops, zombie processes, and message loss**:

| Issue | Comments | Severity | Link |
|------|----------|----------|------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 31 | 🦐 Gold Shrimp (P1) | Unreaped child processes cause memory leaks and crashes |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 29 | 🦞 Diamond Lobster (P1) | MCP server timeout triggers unhandled rejection in cleanup |
| [#149361](https://github.com/openclaw/openclaw/issues/149361) | 21 | 🌊 Off-Meta Tidepool (P3) | Umbrella issue for WebUI performance/stability |

**Underlying Need:** Users are reporting **systemic instability in production environments**, particularly during upgrades and high-load sessions. The recurring theme is **unreliable state recovery**, **incomplete cleanup**, and **silent failures** that degrade user trust.

---

### **5. Bugs & Stability**  
**Critical Bugs (P0/P1) Reported Today:**  
| Bug | Summary | Fix PR? | Link |
|-----|--------|--------|------|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway reaches ready but never serves; `/health` times out, event loop starved | ❌ No | High-memory spike, crash-loop risk |
| [#148529](https://github.com/openclaw/openclaw/issues/148529) | Gateway boot time jumps from 2s to 12min on 632-agent fleet | ❌ No | Major regression in scalability |
| [#148898](https://github.com/openclaw/openclaw/issues/148898) | `claude-cli` watchdog kills turns during laptop sleep | ❌ No | Regression since 2026.8.2 |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | Messages dropped during active reply runs (regression in 2026.9.2) | ❌ No | Message loss in active sessions |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | Long-running turns lose replies due to "no active tool authority snapshot" | ❌ No | Silent failure in CLI backend |

**Trend:** Multiple **regressions tied to 2026.9.2–2026.9.4** suggest a breaking change in the agent lifecycle or session state handling. These are not isolated but **interconnected**—zombie processes, session state drift, and event loop starvation all point to a deeper architectural flaw in resource management.

---

### **6. Feature Requests & Roadmap Signals**  
User demand is shifting toward **robustness, observability, and cross-platform reliability**:

- **#151176** (feat(openai)): Explicit OpenAI Agents API harness → signals intent to **diversify LLM provider support** beyond Codex.
- **#150549** (feat(ui)): Unified reply controls → indicates growing need for **consistent UX in collaborative workflows**.
- **#149361** (umbrella): WebUI performance issues → suggests **UX maturity is now a priority** over new features.
- **#151201** (fix): Explain silent tool failures in plain language → users want **transparency in error handling**, not cryptic warnings.

➡️ **Predicted Next Version (2026.10):**  
A **stability-focused patch release** likely to include:
- Fix for `claude-cli` watchdog behavior
- Session state reconciliation logic
- Process reaping and zombie cleanup improvements
- Enhanced diagnostic logging

---

### **7. User Feedback Summary**  
Real-world pain points from users reflect **high-stakes operational use cases**:

- **Production gateway crashes** after upgrade (`#150452`): One user spent **1 full day repairing config, Telegram crash-loops, iOS re-approval, and empty Usage screen** after upgrading from `2026.7.1-2` to `2026.9.4`.
- **Silent data loss**: Messages disappear mid-turn (`#139847`, `#148707`) — users report no retries, no logs, no recovery.
- **UX friction**: Typing indicators misused (`#69572`), links broken in streaming replies (`#151242`), mobile UI overflow (`#150518`).
- **Security concerns**: OAuth tokens leaked to OpenAI embeddings API (`#111985`) — highlights trust erosion in sensitive environments.

Users are increasingly frustrated by **lack of feedback, inconsistent behavior, and poor recovery mechanisms**.

---

### **8. Backlog Watch**  
**High-impact Issues Requiring Maintainer Attention:**

| Issue | Age | Status | Priority | Link |
|------|-----|--------|----------|------|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 7 days | Open | P1 | MCP init timeout → unhandled rejection |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 1 day | Open | P0 | Gateway stuck in “ready” but unresponsive |
| [#148529](https://github.com/openclaw/openclaw/issues/148529) | 3 days | Open | P1 | 12-minute boot time on large fleets |
| [#127229](https://github.com/openclaw/openclaw/issues/127229) | 38 days | Open | P1 | False tombstoning of durable updates |
| [#120600](https://github.com/openclaw/openclaw/issues/120600) | 31 days | Open | P1 | AGENTS.md never delivered in sandboxed runs |

**PRs Waiting on Maintainers:**  
- **#151277**, **#151275**, **#151270** — small but impactful fixes blocked by review backlog.
- **#150881**, **#150569** — UI polish PRs awaiting final approval despite clear user benefit.

👉 **Call to Action:** Maintainers must prioritize **critical stability fixes** over new features. The project is at risk of **user attrition** if P0/P1 bugs remain unresolved.

---

**Final Note:** OpenClaw shows strong community engagement and technical depth, but **current instability threatens adoption**. Immediate focus on **process cleanup, session integrity, and error visibility** is essential to restore trust and enable sustainable growth.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-18**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem in September 2026 is characterized by rapid technical maturation, divergent development strategies, and growing emphasis on production-grade reliability. While projects like OpenClaw and QwenPaw are pushing boundaries in agent orchestration and extensibility, others such as ZeroClaw and Hermes Agent are focusing on governance, auditability, and cross-platform consistency. A clear trend toward **observability, session integrity, and runtime safety** is emerging across the landscape—driven by real-world usage in high-stakes environments. The community is shifting from feature velocity to **systemic robustness**, with users demanding transparency, recoverability, and predictable behavior.

---

### **2. Activity Comparison**

| Project         | Issues (24h) | PRs (24h) | Releases (24h) | Health Score (Est.)       |
|----------------|--------------|-----------|----------------|----------------------------|
| **OpenClaw**   | 500          | 500       | ❌ No           | **Low** (Critical stability issues) |
| **Hermes Agent** | 50           | 50        | ❌ No           | **Moderate** (High activity, some instability) |
| **IronClaw**   | 1            | 0         | ❌ No           | **Stable but stagnant** (Maintenance mode) |
| **QwenPaw**    | 20           | 41        | ❌ No           | **Mixed** (Strong progress, critical bugs) |
| **ZeroClaw**   | 50           | 50        | ❌ No           | **High** (Mature, process-focused) |

> ✅ *Health scores reflect current risk posture: OpenClaw faces P0/P1 regressions; IronClaw shows low engagement despite diagnostic maturity.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most **high-velocity and high-risk project** in the ecosystem, with 500+ daily issues and PRs—a level of activity unmatched by peers. Its **core architecture is under intense pressure**, particularly around gateway stability, session state corruption, and zombie process management. Unlike competitors that focus on UX polish or governance, OpenClaw’s current trajectory reflects a **"fix the foundation" phase**, where systemic flaws (e.g., event loop starvation, session drift) threaten operational viability.  

Compared to Hermes Agent (focused on desktop fidelity), QwenPaw (enterprise orchestration), and ZeroClaw (auditability), OpenClaw prioritizes **scale and integration depth over user experience**, making it a prime candidate for early adopters seeking maximal flexibility—but at significant operational cost. Its community size appears largest, but this volume is now driving crisis-level attention rather than sustainable innovation.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, recurring themes indicate convergence on **production-readiness requirements**:

| Focus Area                     | Projects Involved                          | Key Requirements |
|-------------------------------|--------------------------------------------|------------------|
| **Session State Integrity**   | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Prevent silent data loss, ensure recovery from crashes, avoid session drift |
| **Runtime Stability & Cleanup** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Fix zombie processes, prevent event loop blocking, handle timeouts gracefully |
| **Error Visibility & Diagnostics** | OpenClaw, QwenPaw, ZeroClaw, Hermes Agent | Replace cryptic errors with plain-language feedback, enable tracing/replay |
| **Plugin/Extension Isolation** | QwenPaw, ZeroClaw, Hermes Agent           | Prevent synchronous I/O from freezing entire instance; sandbox local plugins |
| **Cross-Platform Consistency** | Hermes Agent, QwenPaw, ZeroClaw           | Fix Windows GUI glitches, align Docker/desktop runtimes, improve scaling support |

These signals collectively point to an industry-wide pivot: **AI agents must be reliable enough for real work—not just demos**.

---

### **5. Differentiation Analysis**

| Project         | Feature Focus                              | Target User Profile                     | Technical Architecture                      |
|----------------|---------------------------------------------|------------------------------------------|---------------------------------------------|
| **OpenClaw**   | Full-stack agent orchestration, multi-provider support | DevOps teams, advanced builders, integrators | Monorepo with deep Gateway-agent coupling |
| **Hermes Agent** | Desktop-first autonomy, Kanban workflows, Jev integration | Power users, developers, AI assistants in OS | Modular, WSL-aware, strong CLI + GUI |
| **IronClaw**   | Benchmarking, failure taxonomy, model evaluation | Researchers, LLM evaluators, academic users | Lightweight, focused on task execution analysis |
| **QwenPaw**    | Enterprise orchestration, Hub features, telemetry | Teams, managed deployments, compliance-heavy orgs | Model gateway, member governance, cloud-ready |
| **ZeroClaw**   | Auditability, append-only logs, governance, security | Regulated industries, mission-critical systems | Immutable event history, RFC-driven decision-making |

> 🔑 **Key Differentiator**: ZeroClaw and IronClaw represent niche but high-value positions—**compliance and evaluation**, respectively—while OpenClaw and QwenPaw target **scalable deployment ecosystems**.

---

### **6. Community Momentum & Maturity**  

| Tier               | Projects                        | Characteristics |
|--------------------|----------------------------------|-----------------|
| **Rapid Iteration** | OpenClaw, Hermes Agent, ZeroClaw | High PR/issue volume; active RFCs; urgent bug fixes |
| **Feature Refinement** | QwenPaw                         | Strong contributions but blocked by core stability issues |
| **Stabilization / Maintenance** | IronClaw                        | Low activity, no new releases; diagnostic-focused |

**Maturity Signal**: OpenClaw and ZeroClaw show signs of **architectural maturity**—they’re not just adding features but fixing fundamental flaws. In contrast, QwenPaw and Hermes Agent are in **feature-bloat limbo**, where UX improvements are being made but runtime reliability remains fragile.

---

### **7. Trend Signals**  
Based on community feedback and project direction, the following **industry trends** are emerging:

1. **From "What can it do?" to "Can it be trusted?"**  
   Users are no longer satisfied with flashy capabilities—they demand **recovery mechanisms, error visibility, and session resilience**. Silent failures and unhandled rejections are now dealbreakers.

2. **Observability as a Core Requirement**  
   Append-only logs (#10526, ZeroClaw), session replay, and telemetry (#7802, QwenPaw) are moving from nice-to-have to **non-negotiable for enterprise adoption**.

3. **Governance Over Engineering**  
   Projects like ZeroClaw are formalizing RFC processes, reflecting a shift from code-driven to **process-driven development**—a hallmark of mature OSS ecosystems.

4. **Enterprise-Ready Features Are Prioritized**  
   Per-session budgets (#91743, Hermes), model gateways (#7779, QwenPaw), and operator-curated lists (#114477, Hermes) signal a move toward **managed, team-based AI agent platforms**.

5. **Security & Isolation Are Now Non-Negotiable**  
   Plugin crashes (#7840), dependency vulnerabilities (#9899), and content validation bypasses (#9882) highlight that **sandboxing and secure defaults** are essential for public use.

---

### ✅ **Strategic Recommendation for Developers & Decision-Makers**  
- **Choose OpenClaw only if you have dedicated ops capacity**—it’s powerful but unstable.  
- **Prefer ZeroClaw or QwenPaw for regulated or team-based deployments**—they prioritize auditability and governance.  
- **Monitor IronClaw closely**—its diagnostic rigor may inform future evaluation standards.  
- **Avoid QwenPaw and Hermes Agent for production until v2.3/v0.22+**—critical stability issues remain unresolved.  

The ecosystem is transitioning from experimentation to **industrial-grade deployment readiness**—and the winners will be those who prioritize **trust, observability, and recoverability** over feature count.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-18**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 updated pull requests in the past 24 hours—indicating strong community engagement and ongoing development momentum. No new releases were issued, suggesting a focus on stabilization and bug resolution ahead of a potential upcoming version. The workload is heavily skewed toward critical stability fixes (especially in `cron`, `agent`, `gateway`, and `desktop` components), alongside growing attention to session state integrity, platform-specific rendering, and plugin compatibility. A notable spike in Windows GUI-related issues reflects persistent challenges in cross-platform consistency.

---

### **2. Releases**  
❌ **No new releases** were published today.  
*Note:* The last release was v0.21.3 (observed in multiple issue reports). The absence of a new release suggests that recent PRs are still under review or being prioritized for a coordinated patch cycle.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
While no PRs were merged today, several high-impact fixes were submitted and are likely under review:

- **PR #114534**: Mid-session `/reasoning` switches now maintain Claude prompt cache warmth via in-band effort updates — improving performance and reducing latency during reasoning shifts. [Link](https://github.com/NousResearch/hermes-agent/pull/114534)  
- **PR #114535**: Fixes Windows host selection in Desktop when connected to Linux WSL gateway — enhances computer use context awareness. [Link](https://github.com/NousResearch/hermes-agent/pull/114535)  
- **PR #114518**: Implements quota-wall retry limits in Kanban tasks, preventing infinite loops; introduces `gave_up` event for visibility. [Link](https://github.com/NousResearch/hermes-agent/pull/114518)  
- **PR #114519**: Resolves zombie process risk on cron worker timeout by adding bounded wait + reap logic. [Link](https://github.com/NousResearch/hermes-agent/pull/114519)  
- **PR #114521**: Prevents `HERMES_KANBAN_TASK` literal from being misinterpreted as a task ID. [Link](https://github.com/NousResearch/hermes-agent/pull/114521)

These represent significant progress in **session reliability**, **resource management**, and **cross-platform UX**.

---

### **4. Community Hot Topics**  
Top 3 most commented items reflect urgent pain points:

1. **Issue #88584** – *Automated Nous integration blocked due to merge conflicts in `cron/jobs.py`*  
   🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/88584)  
   → **112 comments** | High urgency: Blocks core integration pipeline. Indicates coordination challenges between upstream repos (Enterkey/Nous).

2. **Issue #106665** – *Desktop rendering/click issues at 125% scaling and after extended use (Windows)*  
   🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/106665)  
   → **16 comments** | Recurring UI regression affecting real-world usability. Suggests deep-rooted layout and event handling flaws in desktop app.

3. **Issue #114526** – *`hermes plugins install` fails on public catalog repo due to disabled git prompts*  
   🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/114526)  
   → **1 comment** | Low volume but high impact: Breaks plugin installation workflow for users without interactive auth. Highlights a CLI UX flaw in non-interactive environments.

> **Analysis:** Community is focused on **integration stability**, **desktop platform fidelity**, and **CLI robustness**. The dominance of Windows-specific issues signals a need for better testing infrastructure across OS environments.

---

### **5. Bugs & Stability**  
| Severity | Issue | Summary | Fix PR? |
|---------|------|--------|--------|
| **P0** | Issue #114456 | Async delegation completion stalls behind busy sessions; prompt cache invalidated mid-history | ❌ |
| **P1** | Issue #104303 | Turn lease held forever on provider stream failure (`stream_opened=false`) → session lockout | ❌ |
| **P1** | Issue #109824 | Two WAL stability bugs: inode conflict every 30min + `_refresh_tools` crashes on `None` session | ❌ |
| **P2** | Issue #114484 | Tool call batch envelope rejected if `calls` is JSON string (not array) → tool-call loop | ✅ **PR #114530** (in review) |
| **P2** | Issue #114395 | ACP tool calls never reach terminal status — stay `in_progress` | ❌ |
| **P2** | Issue #103746 | MCP servers crash ~60–90s after connection due to broken "revival" logic | ❌ |

> ⚠️ **Critical Risk**: Persistent session locks (`turn_lease`, `WAL`, `async-delegation`) threaten long-running agent workflows and could lead to data loss or unresponsive instances.

---

### **6. Feature Requests & Roadmap Signals**  
Key feature proposals indicate direction toward **modularization**, **enterprise readiness**, and **AI-driven decision-making**:

- **Feature: Per-session token budget (Issue #91743)**  
  🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/91713)  
  → Request for abort/warn on token breach after a 18.7M-token incident. Likely to be prioritized in next release.

- **Feature: Jev as System-One lane for computer use (Issue #113850)**  
  🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/113850)  
  → Follow-up to RFC #112639. Already being implemented via **PR #114532** (wiring Jev + Playwright backend). Strong signal for AI-powered autonomy.

- **Feature: Operator-curated model list + provider-scoped aliases (Issue #114477)**  
  🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/114477)  
  → Targets non-technical users. Suggests future shift toward **managed deployments** (e.g., enterprise or team setups).

> 📌 **Prediction**: Next major version (v0.22+) will include **token budgeting**, **Jev integration**, and **curated model picker** features.

---

### **7. User Feedback Summary**  
Real user pain points reveal key friction areas:

- **Windows Desktop Instability**: Multiple users report GUI breaking after backend update (`hermes update`) — inconsistent behavior across restarts. [Issue #113683](https://github.com/NousResearch/hermes-agent/issues/113683)
- **Plugin Installation Failures**: Public plugin installs fail silently due to Git auth prompts disabled. [Issue #114526](https://github.com/NousResearch/hermes-agent/issues/114526)
- **Token Abuse Incidents**: One user reported **18.7M tokens burned in 5 hours** due to a retry loop — highlighting need for per-session caps.
- **Confusing UI Elements**: Settings pages for “Accounts” and “API keys” render identically. [Issue #92629](https://github.com/NousResearch/hermes-agent/issues/92629)

> ✅ **Satisfaction**: Users appreciate advanced features like MCP integration, TTS, and Kanban tools.  
> ❌ **Dissatisfaction**: Focuses on **installation reliability**, **GUI stability**, and **transparent error messaging**.

---

### **8. Backlog Watch**  
Several high-value issues remain open with minimal activity:

- **Issue #88584** – *Automated Nous integration blocked* (112 comments, P3, comp/cron)  
  🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/88584)  
  → Requires coordination between teams. Critical for future scalability.

- **Issue #34271** – *Add Mnemosyne to official memory provider docs* (7 comments, P3, needs-decision)  
  🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/34271)  
  → Long-standing omission despite Mnemosyne being a top-tier local-first option.

- **Issue #114495** – *`hermes -p <profile> gateway <action>` undocumented in `--help`* (2 comments)  
  🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/114495)  
  → Simple fix with high UX impact. Should be addressed immediately.

- **Issue #114503** – *Email gateway returns `Header` object on mojibake headers*  
  🔗 [View Issue](https://github.com/NousResearch/hermes-agent/issues/114503)  
  → Affects international email handling. Needs action despite low comment count.

> 💡 **Call to Action**: Maintainers should prioritize triaging and assigning these issues to prevent stagnation in the backlog.

---  
✅ **Project Health Score**: **High Activity, Moderate Stability**  
*Strengths*: Active contributor base, clear roadmap signals, strong focus on reliability.  
*Weaknesses*: Windows GUI fragility, delayed documentation, unresolved integration blockers.  

👉 **Next Steps**: Prioritize stable release candidate prep, resolve critical session locks, and improve CLI help coverage.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-18**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable but low-activity state as of 2026-09-18, with no new pull requests or releases in the past 24 hours. Only one issue was opened today—#8101—indicating minimal community engagement on immediate development or stability concerns. The absence of merged PRs or recent releases suggests a pause in active feature integration or deployment cycles. Overall, the project appears to be in maintenance mode, with focus shifting toward analysis and diagnostics rather than rapid iteration.

---

### **2. Releases**  
*No new releases were published in the last 24 hours.*  
There are currently no release notes or changelogs available for version updates as of this date. The latest stable release remains unchanged from prior weeks, with no breaking changes or migration guidance required at this time.

---

### **3. Project Progress**  
*No pull requests were merged or closed in the past 24 hours.*  
With zero PR activity, there are no new features, bug fixes, or documentation improvements to report. The development pipeline is effectively idle, suggesting either a planned lull or potential resource constraints among contributors.

---

### **4. Community Hot Topics**  
**Primary Issue:** [#8101 — Daily ironclaw failure taxonomy — 2026-09-17](https://github.com/nearai/ironclaw/issues/8101)  
- **Author:** pranavraja99  
- **Status:** Open (no comments or reactions)  
- **Summary:** This issue documents a detailed failure analysis of the *officeqa* benchmark suite, identifying 35 non-passing tasks attributed to genuine model-quality errors—particularly with DeepSeek-V4-Flash’s navigation behavior.  

**Analysis:** While the issue has not yet sparked discussion, its content signals a growing need for systematic error classification and diagnostic tooling. The focus on *model quality* over infrastructure issues reflects a maturity in the project’s evaluation process: users are now distinguishing between agent logic flaws and LLM capability limitations. This may foreshadow future work on failure categorization frameworks or automated root-cause analysis pipelines.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions reported today.*  
The single open issue (#8101) is not a bug per se but a diagnostic observation. It highlights that certain task failures stem from inherent model limitations rather than agent execution errors. No associated crash logs, timeout patterns, or runtime exceptions have been filed, indicating strong system stability in current runs.

---

### **6. Feature Requests & Roadmap Signals**  
While no formal feature requests exist today, the nature of #8101 implies an emerging demand for:  
- **Failure taxonomy systems** to classify errors by root cause (e.g., planning, execution, hallucination).  
- **Benchmark-specific debugging dashboards** to visualize failure modes across models and tasks.  
- **Automated failure summarization tools** to reduce manual review overhead.  

These signals suggest that the next major roadmap phase may center on *observability and diagnostics*, moving beyond raw pass/fail metrics toward actionable insights.

---

### **7. User Feedback Summary**  
Based on the content of #8101, user feedback indicates:  
- High satisfaction with IronClaw’s ability to surface meaningful performance gaps in real-world agent tasks (e.g., OfficeQA).  
- Recognition of DeepSeek-V4-Flash’s navigational shortcomings as a valid concern—not due to IronClaw’s orchestration but model-level limitations.  
- A desire for deeper post-mortem analysis capabilities, particularly around *why* agents fail—beyond just *that* they failed.  

Users appear technically proficient and focused on refining evaluation rigor, signaling a shift from basic functionality testing to advanced performance benchmarking.

---

### **8. Backlog Watch**  
**Issue #8101 — Daily ironclaw failure taxonomy — 2026-09-17**  
- **Link:** [nearai/ironclaw/issues/8101](https://github.com/nearai/ironclaw/issues/8101)  
- **Age:** 1 day (created 2026-09-17)  
- **Priority:** High — represents a critical step toward improving benchmark transparency and reproducibility.  
- **Action Needed:** Requires maintainer attention to initiate a structured taxonomy framework, possibly involving tagging systems, failure clustering, or integration with CI/CD dashboards.  

This issue stands out as a high-value backlog item that, if addressed, could significantly enhance IronClaw’s utility for both researchers and developers evaluating AI agents.

---  
*Data source: GitHub API snapshot — 2026-09-18 | Project: nearai/ironclaw*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-18**

---

### **1. Today's Overview**  
QwenPaw exhibits strong community engagement with 20 new issues and 41 pull requests updated in the past 24 hours, indicating active development and user-driven feedback. No new releases were published, suggesting the team is prioritizing stability fixes and feature refinement ahead of a potential v2.3 release. The project shows signs of growing maturity in core functionality—particularly around context management, plugin isolation, and UI resilience—but faces persistent challenges in runtime stability, memory handling, and desktop startup reliability.

---

### **2. Releases**  
❌ **No new releases** were published as of 2026-09-18.  
The last stable version remains **v2.2.1**, which continues to be the focal point for reported bugs and regressions (e.g., #7818, #7840, #7841). Users are likely experiencing instability during long-running tasks or desktop startup due to unresolved edge cases in session sync, model loading, and event loop handling.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- **#7808** (`refactor(loop)`): Improved stage configuration validation by centralizing `DoomLoopStageConfig` object handling — enhances type safety and reduces code duplication.  
- **#7779** (`feat(hub)`): Added **model gateway**, **member governance**, and **usage dashboard** to Hub — a major step toward enterprise-ready AI agent orchestration.  
- **#7751** (`fix(docker)`): Aligned Docker app Python runtime with desktop (Python 3.11 standalone) — improves consistency across environments.  
- **#7802** (`feat(telemetry)`): Enabled daily runtime activity tracking — supports usage analytics and platform health monitoring.

These changes signal a shift toward **enterprise scalability**, **runtime consistency**, and **observability**, laying groundwork for future managed cloud deployments.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement:**  
- **#7678** [Bug]: `spawn subAgent` consistently fails with timeout — *10 comments*, no reactions.  
  → Suggests a fundamental flaw in sub-agent lifecycle management under load; may affect task delegation workflows.  
  🔗 [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)

- **#7840** [Bug]: Plugin freezes entire instance via synchronous I/O on event loop — *3 comments*, high severity.  
  → Critical stability issue affecting all users with local plugins. Indicates lack of sandboxing/isolation.  
  🔗 [Issue #7840](https://github.com/agentscope-ai/QwenPaw/issues/7840)

- **#7815** [Bug]: Console fails to recover from lazy page chunk load error — *4 comments*.  
  → Affects UX severely; requires full reload to fix. Signals poor error boundary design.  
  🔗 [Issue #7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)

🔥 **Top PRs by Activity:**  
- **#7831** (`fix(console): stream background tool output on demand`) — *1 comment*, but addresses real-time UX lag in long-running tools.  
  → Would improve perceived performance without overloading resources.  
  🔗 [PR #7831](https://github.com/agentscope-ai/QwenPaw/pull/7831)

- **#7835** (`fix(memory): stop leaking auto-memory-recall payload`) — *1 comment*, but critical for privacy and context integrity.  
  → Prevents unintended data leakage into chat history or external channels.  
  🔗 [PR #7835](https://github.com/agentscope-ai/QwenPaw/pull/7835)

💡 **Underlying Needs:**  
Users are demanding **robustness under load**, **plugin isolation**, **context integrity**, and **consistent startup behavior** — pointing to a need for deeper architectural hardening before scaling to production workloads.

---

### **5. Bugs & Stability**  
🚨 **Critical Severity (High Impact, High Frequency):**  
- **#7840**: Plugin synchronously blocks event loop → **entire instance freezes** (~40s).  
  → *Fix PR pending.*  
  🔗 [Issue #7840](https://github.com/agentscope-ai/QwenPaw/issues/7840)

- **#7818**: UI frequently crashes + excessive memory usage — *with screenshot evidence*.  
  → Likely memory leak or unbounded state accumulation.  
  🔗 [Issue #7818](https://github.com/agentscope-ai/QwenPaw/issues/7818)

- **#7841**: Console loads before backend — model/plugin panels remain blank until manual refresh.  
  → Breaks first-use experience; affects desktop users heavily.  
  🔗 [Issue #7841](https://github.com/agentscope-ai/QwenPaw/issues/7841)

🟡 **Medium Severity:**  
- **#7810**: Context size exceeds configured max (131k), triggers 271k input — despite compression settings.  
  → Indicates flawed context eviction logic or misconfigured override chain.  
  🔗 [Issue #7810](https://github.com/agentscope-ai/QwenPaw/issues/7810)

- **#7839**: `retention purge failed: database disk image is malformed` — suggests DB corruption risk.  
  🔗 [Issue #7839](https://github.com/agentscope-ai/QwenPaw/issues/7839)

🟢 **Low Severity (UX/Design):**  
- **#7815**, **#7813**, **#7814**: SSE stream errors leading to frozen UI or invalid payloads.  
  → Fixable via better error handling and serialization checks.  
  🔗 [Issue #7815](https://github.com/agentscope-ai/QwenPaw/issues/7815), [Issue #7813](https://github.com/agentscope-ai/QwenPaw/issues/7813), [Issue #7814](https://github.com/agentscope-ai/QwenPaw/issues/7814)

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Themes for Next Version (v2.3+):**  
- **Per-conversation model selection** (#6318): Users want flexibility beyond agent-level binding — signals demand for dynamic inference routing.  
  🔗 [Issue #6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)

- **Agent-autonomous context management** (#7733): Request for agents to control their own context eviction — hints at moving toward more intelligent, adaptive agents.  
  🔗 [Issue #7733](https://github.com/agentscope-ai/QwenPaw/issues/7733)

- **OS desktop mode app registration** (#7830): Developers want to register custom apps in native mode — indicates growing interest in desktop integrations and extensibility.  
  🔗 [Issue #7830](https://github.com/agentscope-ai/QwenPaw/issues/7830)

- **i18n support for tool approval cards** (#7809): Reflects global adoption and need for localization in enterprise use cases.  
  🔗 [Issue #7809](https://github.com/agentscope-ai/QwenPaw/issues/7809)

➡️ **Predicted Roadmap Inclusions:**  
- Dynamic model switching per conversation  
- Agent-controlled context lifespan  
- Desktop-native app integration API  
- Full i18n support for UI components

---

### **7. User Feedback Summary**  
💬 **Real Pain Points:**  
- **Context overflow** despite settings — users report hitting 271k tokens even with 131k limit (Issue #7810).  
- **UI freezes and memory bloat** on desktop (Issue #7818), especially after extended use.  
- **Plugin crashes** and system-wide freezes due to poorly isolated plugins (Issue #7840).  
- **Desktop startup issues** — console renders incomplete, requiring manual refresh (Issue #7841).

🛠️ **Use Cases Highlighted:**  
- Long-running tasks involving repeated file reads/diffs (Issue #7836)  
- Multi-agent collaboration via sub-agents (Issue #7678)  
- Integration with Lark/Feishu (Issue #7817)  
- Local plugin development and testing

👎 **Satisfaction Level:** Mixed.  
While users appreciate advanced features like MCP drivers and memory recall, **stability and reliability** are currently major concerns. Many report frustration with debugging failures that require full restarts or reinstallation.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered Critical Issues Needing Attention:**  
- **#7678** [Bug]: `spawn subAgent` failure — *created 2026-09-11*, 6 days old, 10 comments, **no maintainer response**.  
  → Could block complex multi-agent workflows.  
  🔗 [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)

- **#7837** [Bug]: `user` rows lack headlines → scroll eviction index fails to anchor evicted turns.  
  → Impacts long-context accuracy and history continuity.  
  🔗 [Issue #7837](https://github.com/agentscope-ai/QwenPaw/issues/7837)

- **#7836** [Bug]: Scroll eviction drops user turn inside tool-heavy spans — live window loses request while history.db retains it.  
  → Risk of lost user intent.  
  🔗 [Issue #7836](https://github.com/agentscope-ai/QwenPaw/issues/7836)

- **#7838** [Feature]: `recall_history_python` silently disabled on older kernels — **no fallback mechanism**.  
  → Limits usability on legacy systems.  
  🔗 [Issue #7838](https://github.com/agentscope-ai/QwenPaw/issues/7838)

⚠️ These issues represent **critical gaps in reliability, context fidelity, and cross-environment compatibility** — should be prioritized in upcoming sprints.

---

> ✅ **Final Assessment**: QwenPaw is maturing rapidly with strong contributions and clear roadmap direction. However, **core stability and user experience** remain fragile. Immediate focus should be on fixing runtime crashes, improving context management, and enhancing plugin isolation — before introducing higher-level features.  
> 📌 **Next Steps**: Prioritize #7840, #7678, #7818, and #7841 for hotfixes in v2.2.2. Begin planning v2.3 with dynamic models, autonomous context, and OS app integration.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-09-18**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active, with 50 new issues and 50 pull requests updated in the past 24 hours—indicating robust community engagement and ongoing development momentum. A strong focus is evident on architectural refinement, security hardening, and runtime stability, particularly around agent lifecycle management, multimodal content handling, and CI/CD reliability. The absence of new releases suggests a pre-release stabilization phase, likely preparing for a feature-rich update post-2026-09-18. High-priority bugs (S1/S2 severity) and RFCs related to core execution models are dominating the conversation, reflecting deep technical maturation.

---

### **2. Releases**  
❌ **No new releases** were published today.  
There have been no version updates or changelog entries since the last release. This aligns with an ongoing internal sprint focused on foundational improvements rather than user-facing features. Maintainers appear to be prioritizing code quality and security before packaging a new stable version.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
While no PRs were explicitly marked as "merged" in the provided data, several high-impact PRs were closed or advanced:  

- **PR #10618** ([feat(maintainers): surface approval carry-forward candidates](https://github.com/zeroclaw-labs/zeroclaw/pull/10618)) — Improved governance tooling by identifying stale approvals, enhancing decision transparency.
- **PR #10266** ([fix(channels): implement is_direct_message for WhatsApp Web](https://github.com/zeroclaw-labs/zeroclaw/pull/10266)) — Fixed messaging logic in WhatsApp integration, improving channel fidelity.
- **PR #10872** ([chore(deps): bump hmac from 0.12.1 to 0.13.0](https://github.com/zeroclaw-labs/zeroclaw/pull/10872)) — Patched a dependency vulnerability, critical for security compliance.

These reflect progress in maintainability, security hygiene, and platform-specific correctness.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement:**  

| Issue | Comments | Summary | Link |
|------|--------|--------|------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 15 | *Maintainer decision queue for RFCs and design issues* — A systemic need for better governance visibility and tracking of RFC outcomes. | [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) |
| [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | 12 | *Simplify RFC voting by removing mandatory discussion windows* — Community seeks faster, frictionless decision-making. | [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) |
| [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | 11 | *Append-only session event history & deterministic replay* — Critical for auditability, debugging, and reproducibility. | [Issue #10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) |

🔍 **Underlying Needs:**  
- **Governance maturity**: The surge in RFC-related discussions signals growing complexity in contributor coordination.
- **Execution traceability**: Demand for immutable session logs reflects a shift toward production-grade AI agent reliability.
- **Process efficiency**: Users want less overhead in proposing and approving changes.

---

### **5. Bugs & Stability**  
🚨 **High-Severity Bugs (S1/S2) Reported Today:**  

| Issue | Severity | Description | Fix PR? |
|------|---------|------------|--------|
| [#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408) | S2 | Second message during active turn starts parallel run → duplicate work/replies | ❌ |
| [#10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912) | S2 | Streaming text guard suppresses replies when quoting tool results | ❌ |
| [#10889](https://github.com/zeroclaw-labs/zeroclaw/issues/10889) | S2 | Native Anthropic provider drops cache breakpoint on image-end messages | ❌ |
| [#10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926) | S2 | Matrix `send_via` misroutes peer identities | ❌ |
| [#10924](https://github.com/zeroclaw-labs/zeroclaw/issues/10924) | S2 | Runtime-command replies enter voice routing | ❌ |

⚠️ **Flaky CI / Test Failures:**  
- [#10875](https://github.com/zeroclaw-labs/zeroclaw/issues/10875): Telegram media-group tests fail intermittently on unrelated PRs → blocks CI gates.
- [#10883](https://github.com/zeroclaw-labs/zeroclaw/issues/10883): Same test times out under repeated runtime job.

📌 **Security-Critical Issues:**  
- [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899): `bitmaps` unmaintained advisory (RUSTSEC-2026-0247) — requires immediate triage and removal.
- [#9882](https://github.com/zeroclaw-labs/zeroclaw/issues/9882): Image markers bypass content validation — serious security risk in direct dispatch path.

---

### **6. Feature Requests & Roadmap Signals**  
🎯 **Emerging Roadmap Themes (Predicted for v0.9+):**  

| Feature Request | Status | Predicted Inclusion |
|----------------|--------|---------------------|
| [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526): Append-only session history & replay | Accepted, in-progress | ✅ High probability — foundational for observability |
| [#10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930): One durable primitive for human questions | Accepted | ✅ Likely in next major release |
| [#10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929): Delivery receipts for outbound messages | Accepted | ✅ Needed for trust and UX |
| [#10925](https://github.com/zeroclaw-labs/zeroclaw/issues/10925): Input-driven mirror voice replies on Matrix | Accepted | ⚠️ Platform-specific but valuable |
| [#10932](https://github.com/zeroclaw-labs/zeroclaw/issues/10932): Echo STT transcripts to sender | Accepted | ✅ User-centric improvement |

💡 **Signals:**  
- Strong demand for **auditable execution traces**, **real-time feedback loops**, and **reliable communication state**.
- Increasing focus on **multimodal safety**, **content provenance**, and **user control over voice/STT**.

---

### **7. User Feedback Summary**  
💬 **Real User Pain Points (from Issues & PRs):**  

- **UX Friction in Setup**:  
  - [#5269](https://github.com/zeroclaw-labs/zeroclaw/issues/5269): Missing documentation for `nix run` installation path — users struggle with basic setup.  
  - [#8766](https://github.com/zeroclaw-labs/zeroclaw/issues/8766): First-run experience lacks E2E coverage — config generation fails silently.

- **Voice & Media Handling Issues**:  
  - [#10932](https://github.com/zeroclaw-labs/zeroclaw/issues/10932): No STT echo → errors go unnoticed.
  - [#10924](https://github.com/zeroclaw-labs/zeroclaw/issues/10924): Runtime commands trigger voice responses unexpectedly.

- **Trust & Visibility Gaps**:  
  - [#10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929): No delivery receipts → agents can't confirm if messages arrived.
  - [#10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912): Streaming guards break replies — frustrates developers debugging agent output.

✅ **Positive Signals**:  
Users are deeply engaged and report nuanced, high-fidelity issues — indicating real-world usage beyond prototyping.

---

### **8. Backlog Watch**  
⏳ **Long-Standing, High-Impact Items Needing Attention:**  

| Issue | Age | Priority | Status | Notes |
|------|-----|----------|--------|-------|
| [#4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853): Install skills from `.well-known` discovery index | 2026-03-27 (6 months) | P2 | Accepted, blocked | Critical for skill ecosystem standardization |
| [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549): Simplify RFC voting | 2026-09-02 | P2 | Accepted | Already has 12 comments; needs implementation |
| [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526): Append-only session history | 2026-09-01 | P2 | In-progress | Core to future observability and replay |
| [#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780): Restore proactive token-budget compaction | 2026-09-11 | P1 | In-progress, blocked | Addresses context bloat in long sessions |

📌 **Critical Gap**: Despite high activity, **maintainer review is delayed** on key architecture and security issues. The backlog shows signs of congestion in governance and technical debt resolution.

---

> ✅ **Project Health Assessment**:  
> **Active, technically mature, but facing governance and scalability challenges**. The team is addressing deep technical concerns with precision, but process bottlenecks and documentation gaps may slow broader adoption.  
> **Recommendation**: Prioritize RFC simplification (#10549), secure dependency cleanup (#9899), and first-run UX fixes (#5269) to accelerate developer onboarding.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*