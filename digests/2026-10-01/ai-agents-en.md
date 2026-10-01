# OpenClaw Ecosystem Digest 2026-10-01

> Issues: 489 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-01 01:27 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-10-01**

---

### **1. Today's Overview**  
OpenClaw remains a highly active, rapidly evolving open-source AI agent platform with intense community engagement: **489 issues and 500 PRs updated in the last 24 hours**, indicating sustained momentum. The release of **v2026.9.7** marks a critical stability milestone, addressing several high-severity regressions reported in prior versions. However, the volume of P0/P1 bugs—especially around memory leaks, database corruption, and session state contention—suggests ongoing systemic challenges in core runtime reliability. Despite this, a strong wave of PRs focused on performance, security hardening, and UX polish signals a mature development cycle.

---

### **2. Releases**  
**🆕 v2026.9.7** – Released today ([Release Notes](https://docs.openclaw.ai/rel))  
- **Key Fixes**:  
  - Resolves SQLite WAL growth to 2.8 GB due to missing `wal_checkpoint(TRUNCATE)` (Issue #143524)  
  - Addresses gateway crash-loop caused by stale session-state locks (Issue #157160)  
  - Fixes persistent file-based provider cooldown blocking users post-billing recovery (Issue #70903)  
- **Breaking Changes**: None reported.  
- **Migration Note**: No migration steps required; backward-compatible update from 2026.9.6.  
- **Impact**: Critical for production environments experiencing stability or data loss issues.

---

### **3. Project Progress**  
**✅ Merged/Closed PRs (Today)**: 202 PRs merged, including:  
- [PR #162220](https://github.com/openclaw/openclaw/pull/162220): Retired beta.5 whole-session-store SDK bridge — **breaking change** for legacy plugin integrations.  
- [PR #162249](https://github.com/openclaw/openclaw/pull/162249): Fixed ClawSweeper review expiry logic, preventing false PR rejections.  
- [PR #162219](https://github.com/openclaw/openclaw/pull/162219): Unified draft lifecycle policies across Discord, Slack, Mattermost — improving consistency.  

**🚀 Features Advanced**:  
- [PR #161709](https://github.com/openclaw/openclaw/pull/161709): Hosted Gateway on bundled Bun (macOS app) — now in final testing.  
- [PR #161913](https://github.com/openclaw/openclaw/pull/161913): Added external backup support (Cloudflare R2, external disks) — **major UX upgrade** for enterprise operators.

---

### **4. Community Hot Topics**  
Top 5 most commented Issues/PRs reveal urgent user pain points:

| Issue/PR | Comments | Link | Summary |
|--------|--------|------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 98 | [Bug: SQLite WAL grows to 2.8GB](https://github.com/openclaw/openclaw/issues/143524) | Windows agents hit disk exhaustion due to uncheckpointed WAL; **blocks startup**. High priority fix in v2026.9.7. |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 40 | [Bug: 2026.9.5 turned stable env into 8-hour failure](https://github.com/openclaw/openclaw/issues/153257) | Users report full environment collapse after minor updates — **trust in release stability eroding**. |
| [#157160](https://github.com/openclaw/openclaw/issues/157160) | 13 | [Bug: Gateway crash-loops after schema migration](https://github.com/openclaw/openclaw/issues/157160) | Post-migration failures prevent any service start — **critical blocker for upgrades**. |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | 13 | [Bug: ~5GB/h memory leak in prepared-model-catalog.worker.js](https://github.com/openclaw/openclaw/issues/159662) | Unbounded memory use causes OOM crashes even on idle systems. |
| [#162250](https://github.com/openclaw/openclaw/pull/162250) | 0 | [Fix: Control UI e2e tests fail on macOS](https://github.com/openclaw/openclaw/pull/162250) | Developer experience friction — CI fails on Mac hosts despite Linux green. |

> 🔍 **Analysis**: The top issues center on **systemic stability** (crash loops, memory leaks), **data integrity** (database bloat), and **user trust** in updates. PR activity shows strong focus on fixing these, but adoption is hampered by recurring regressions.

---

### **5. Bugs & Stability**  
Ranked by severity (P0 > P1 > P2):

| Severity | Issue | Description | Fix Status |
|---------|-------|-------------|------------|
| 🚨 P0 | [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL grows to 2.8GB → blocks gateway startup | ✅ Fixed in v2026.9.7 |
| 🚨 P0 | [#157160](https://github.com/openclaw/openclaw/issues/157160) | Gateway crash-loop after schema migration (2→18) | ✅ Fixed in v2026.9.7 |
| 🚨 P0 | [#158134](https://github.com/openclaw/openclaw/issues/158134) | Windows startup blocked by slow Codex plugin init | ❌ No fix PR yet; regression in 2026.9.6 |
| 🚨 P0 | [#161379](https://github.com/openclaw/openclaw/issues/161379) | CPU pinning + model catalog refresh loop | ❌ No fix PR; affects Linux workers |
| 🟡 P1 | [#159662](https://github.com/openclaw/openclaw/issues/159662) | 5GB/h memory leak in model catalog worker | ❌ No fix PR; reproduced on cold boot |
| 🟡 P1 | [#159596](https://github.com/openclaw/openclaw/issues/159596) | Memory sawtooth: RSS climbs then drops under pressure | ❌ No fix PR; impacts long-running gateways |

> ⚠️ **Stability Risk**: Despite v2026.9.7, **multiple P0 regressions persist** in non-stable channels. Users are advised to avoid upgrading until further patching.

---

### **6. Feature Requests & Roadmap Signals**  
High-demand features emerging from issues and PRs:

- **External Backups (R2, USB, NAS)** – Requested in #161913 and echoed in multiple user reports. **Likely in v2026.10.0**.  
- **Dynamic Model Catalog Refresh** – From #74481, enabling real-time provider model discovery without restarts. **High-priority for plugin flexibility**.  
- **Per-Agent Daily Spending Limits** – Proposed in #121729; **urgent for background agents** running unattended.  
- **Better CLI UX for Plugin Management** – Multiple PRs (#162237, #158000) highlight need for owner-aware automation and live model reloads.  

> 📌 **Prediction**: v2026.10.0 will prioritize **cost control, backup resilience, and dynamic configuration** — key for enterprise adoption.

---

### **7. User Feedback Summary**  
Real-world pain points from issue summaries:

- **"I lost 8 hours recovering from a single update."** – @abuegab1-spec (Issue #153257)  
- **"My 2.8GB SQLite WAL crashed my server."** – @desksk (Issue #143524)  
- **"After billing recovery, I’m still locked out for hours."** – @mattglover11 (Issue #70903)  
- **"The Control UI hides the Effort picker after restart."** – @LachieFREEDOM (Issue #158922)  
- **"Windows startup takes 15 minutes due to Codex."** – @ChrisWNY (Issue #158134)  

> 💬 **Sentiment**: High frustration with **release stability**, **memory/resource management**, and **lack of operational visibility**. Trust is fragile — users demand *predictable* upgrades.

---

### **8. Backlog Watch**  
Critical issues needing maintainer attention:

| Issue | Age | Comment Count | Priority | Status |
|------|-----|---------------|----------|--------|
| [#143525](https://github.com/openclaw/openclaw/issues/143525) | 12 days | 30+ | P1 | Needs live repro |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | 4 days | 13 | P0 | No fix PR |
| [#158134](https://github.com/openclaw/openclaw/issues/158134) | 6 days | 6 | P1 | Regression |
| [#114154](https://github.com/openclaw/openclaw/issues/114154) | 110 days | 8 | P1 | Still unresolved |
| [#161734](https://github.com/openclaw/openclaw/issues/161734) | 1 day | 6 | P1 | Expensive migration step |

> 🔎 **Action Required**: Maintainers must triage and assign ownership to **P0 memory leaks and startup blockers**. Long-standing issues like #114154 risk becoming "zombie bugs."

---

**📌 Final Assessment**: OpenClaw is at a crossroads. Rapid feature velocity is impressive, but **core stability and user trust are under strain**. Immediate focus should be on **patching P0 bugs**, **improving release hygiene**, and **increasing transparency** around breaking changes. The next 60 days will determine whether OpenClaw evolves from a bleeding-edge tool into a production-grade AI agent platform.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-10-01**

---

### **1. Ecosystem Overview**  
The open-source personal AI agent landscape in Q4 2026 is characterized by rapid innovation, increasing enterprise readiness, and growing pains around stability, security, and operational maturity. Projects are diverging in focus: some prioritize bleeding-edge capabilities (OpenClaw, QwenPaw), others emphasize security and governance (ZeroClaw), while a few maintain steady maintenance (IronClaw). Despite high activity across the board, recurring issues around session integrity, memory leaks, and access control reveal systemic challenges in building reliable, production-grade agents. The ecosystem is maturing beyond experimentation—users now demand predictability, auditability, and resilience, signaling a shift from “prototype” to “platform.”

---

### **2. Activity Comparison**

| Project       | Issues (Last 24h) | PRs (Last 24h) | Release Status       | Health Score (⭐/5) |
|---------------|-------------------|-----------------|----------------------|---------------------|
| **OpenClaw**  | 489               | 500             | v2026.9.7 (critical fix) | ⭐⭐⭐⭐☆ (4.5)        |
| **Hermes Agent** | 50              | 50              | No new release (v0.21.5+4977) | ⭐⭐⭐⭐☆ (4.5)        |
| **IronClaw**  | 1                 | 1               | No new release       | ⭐⭐⭐☆☆ (3.5)         |
| **QwenPaw**   | 19                | 41              | v2.2.2-beta.4 (beta) | ⭐⭐⭐⭐☆ (4.3)         |
| **ZeroClaw**  | 50                | 50              | v0.9.0 pending       | ⭐⭐⭐⭐☆ (4.5)         |

> ✅ *Note*: OpenClaw leads in volume; ZeroClaw and Hermes show balanced, focused momentum; IronClaw remains stable but low-engagement.

---

### **3. OpenClaw's Position**  
OpenClaw stands as the most **high-volume, high-risk, high-reward** project in the ecosystem. Its technical approach centers on **extensive plugin extensibility**, **bundled runtime environments (Bun)**, and **deep platform integration** (Slack, Discord, Mattermost). Unlike peers, it aggressively pushes boundaries with frequent breaking changes (e.g., SDK bridge retirement in #162220) and complex state management—making it ideal for early adopters and developers seeking maximum flexibility. Compared to Hermes’ polished UX or ZeroClaw’s security-first design, OpenClaw prioritizes **feature velocity over stability**, resulting in the largest community (by issue count) and fastest iteration cycle. However, this comes at the cost of rising user frustration over regressions and poor release hygiene—highlighting a trade-off between innovation speed and operational trust.

---

### **4. Shared Technical Focus Areas**  
Across all projects, several **cross-cutting technical needs** have emerged:

| Focus Area                  | Projects Involved          | Specific Needs                                                                 |
|----------------------------|----------------------------|--------------------------------------------------------------------------------|
| **Session & State Integrity** | OpenClaw, QwenPaw, ZeroClaw | Fix silent corruption, context pollution, and race conditions (e.g., #8022, #11198) |
| **Memory & Resource Management** | OpenClaw, QwenPaw, ZeroClaw | Address unbounded memory leaks (e.g., #159662), efficient indexing, and GC tuning |
| **Security & Access Control** | ZeroClaw, QwenPaw, Hermes | Sandbox enforcement (esp. Windows), RBAC, OIDC, and privilege escalation prevention |
| **External Data & Backup**    | OpenClaw, QwenPaw, ZeroClaw | Support for R2, NAS, USB; secure offloading of sensitive data |
| **CLI & Developer UX**        | OpenClaw, QwenPaw, Hermes | Better plugin management, model reloading, and error visibility (e.g., #162250) |

These signals indicate a **convergence toward production-grade requirements**: reliability, observability, and isolation—no longer optional.

---

### **5. Differentiation Analysis**

| Dimension               | OpenClaw                            | Hermes Agent                        | IronClaw                          | QwenPaw                             | ZeroClaw                           |
|------------------------|-------------------------------------|-------------------------------------|-----------------------------------|-------------------------------------|------------------------------------|
| **Target User**         | Devs, power users, integrators      | Privacy-conscious individuals, desktop users | Internal tooling, research teams | Team bots, enterprise automation | Multi-tenant SaaS, compliance-driven |
| **Core Strength**       | Extensible architecture, broad integrations | Secure desktop UX, voice interaction | Self-sustaining codebase awareness | Fast iteration, team collaboration | Identity-aware IAM, gateway separation |
| **Architecture**        | Monorepo + modular plugins          | Electron-based desktop app          | AI-assisted codebase memory       | Modular TUI + Feishu/WeCom support | Microservices + RPC, IPC-heavy     |
| **Feature Focus**       | Platform breadth, real-time updates | Mobile-ready UX, voice, privacy     | Code-awareness, automation        | Context resilience, file handling   | Security, RBAC, plugin integrity   |

> 🔍 **Key Insight**: While OpenClaw and QwenPaw target **functionality-rich, collaborative workflows**, ZeroClaw and Hermes focus on **trust and safety**—with ZeroClaw leaning into infrastructure-level control and Hermes into user-facing security.

---

### **6. Community Momentum & Maturity**

- **High-Momentum (Rapid Iteration):**  
  - **OpenClaw** – Highest activity (489 issues/500 PRs), driven by feature velocity and urgent bug fixes. Indicates **early-mid stage growth** with strong developer engagement.
  - **QwenPaw** – Active beta phase with 41 PRs/day; pushing toward final release. Reflects **rapid stabilization** of a product under real-world testing.
  - **ZeroClaw** – High engagement on security and governance issues; preparing for v0.9.0. Shows **mature planning with urgency**.

- **Stabilizing / Maintenance Mode:**  
  - **Hermes Agent** – Consistent, focused progress without major releases. Likely in **late beta/stable phase** with fewer breaking changes.
  - **IronClaw** – Minimal activity, automated infra tasks only. Suggests **mature, self-sustaining system** with low friction—but risks stagnation.

> 📌 **Trend**: The ecosystem is bifurcating: **innovation leaders (OpenClaw, QwenPaw)** push boundaries, while **stability-focused projects (ZeroClaw, Hermes)** refine guardrails—essential for long-term adoption.

---

### **7. Trend Signals**  
Based on community feedback and PR/issue patterns, key industry trends emerge:

1. **Trust > Feature Velocity**: Users increasingly reject "cool" features if they come with unreliability. OpenClaw’s instability backlash and ZeroClaw’s S0 bugs signal that **predictable upgrades and security audits are non-negotiable** for production use.

2. **Enterprise Readiness Demands**:  
   - Per-agent spending limits (#121729)  
   - External backups (R2, NAS)  
   - Role-based access (RBAC, per-sender controls)  
   → These are no longer niche—they’re **baseline expectations** for team and multi-user deployment.

3. **Contextual Integrity is Critical**:  
   - Silent context corruption (#8022, #11198)  
   - Memory leaks leading to OOM crashes (#159662)  
   → Developers need better observability tools and deterministic lifecycle management.

4. **Platform Agnosticism**:  
   - Deep link support (`obsidian://`, `vscode://`)  
   - Cross-platform consistency (macOS, Windows, Linux)  
   → Agents must integrate seamlessly into existing workflows—not replace them.

5. **AI Agent as Infrastructure**:  
   - Knowledge graph refreshes (IronClaw)  
   - Plugin rollback and verification (ZeroClaw)  
   → The agent is evolving from an assistant to a **managed, auditable service layer**.

---

### ✅ **Conclusion for Decision-Makers**  
The open-source AI agent ecosystem is transitioning from **experimental prototypes** to **production-capable platforms**. While OpenClaw leads in innovation velocity, its instability highlights the risk of premature scaling. Projects like ZeroClaw and Hermes are setting the bar for **security, usability, and governance**—critical for enterprise adoption. For developers, the message is clear: **build for resilience first**. Prioritize session integrity, memory safety, access control, and observable failures. The next wave of success will belong not to the most feature-rich agent, but to the one that works **consistently, securely, and predictably**—even under load.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-10-01**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pace of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across core components. Despite no new releases, significant progress is evident in security hardening, desktop UX refinements, and session stability fixes. The community is focused on resolving high-severity bugs related to authentication, session state corruption, and platform-specific regressions—particularly on Windows and macOS. This level of engagement reflects strong developer and user involvement, suggesting a mature but evolving ecosystem.

---

### **2. Releases**  
**No new releases** were published as of 2026-10-01. The latest stable version remains `v0.21.5+4977` (from 2026-09-24). Users should continue using this build unless explicitly advised otherwise. No breaking changes or migration notes are pending.

---

### **3. Project Progress**  
Several critical PRs were merged or closed today, advancing key areas:

- ✅ **Security & Session Integrity**:  
  - [`PR #129741`](https://github.com/nousresearch/hermes-agent/pull/129741) fixes a stale-send guard issue in Desktop that could cause duplicate message rendering during session reloads.  
  - [`PR #129816`](https://github.com/nousresearch/hermes-agent/pull/129816) secures image generation by binding it to the correct profile owner—critical for multi-profile isolation.  
  - [`PR #129820`](https://github.com/nousresearch/hermes-agent/pull/129820) gates sensitive dashboard metadata behind authentication, reducing exposure risk.

- ✅ **Platform Stability & UX**:  
  - [`PR #129848`](https://github.com/nousresearch/hermes-agent/pull/129848) implements a user-configurable URL scheme allowlist for desktop links (e.g., `obsidian://`, `vscode://`), directly addressing a major usability blocker.  
  - [`PR #129846`](https://github.com/nousresearch/hermes-agent/pull/129846) improves voice interaction by deferring barge-in until actual speech is confirmed—reducing accidental interruptions.

- ✅ **Dependency & Configuration Health**:  
  - [`PR #129680`](https://github.com/nousresearch/hermes-agent/pull/129680) clears npm audit findings across the repository, patching vulnerabilities in `brace-expansion`, `js-yaml`, `DOMPurify`, and Electron.  
  - [`PR #129844`](https://github.com/nousresearch/hermes-agent/pull/129844) unifies terminal environment variable mapping across CLI, gateway, and bridges—resolving drift issues like missing `home_mode`.

---

### **4. Community Hot Topics**  
Top issues and PRs reflect deep concern around **security**, **session integrity**, and **cross-platform reliability**:

- 🔥 **[Issue #62336](https://github.com/nousresearch/hermes-agent/issues/62336)** – *Terminal snapshots persist credential-bearing env vars*  
  → 9 comments | High severity: sensitive credentials stored in plain text on disk. A **security-critical flaw** requiring immediate attention.  
  **Need**: Secure transient data handling; consider ephemeral storage or encryption.

- 🔥 **[Issue #127313](https://github.com/nousresearch/hermes-agent/issues/127313)** – *Pane-body right-click hijacks app menu*  
  → 8 comments | Regression from recent UI update; blocks essential user actions.  
  **Need**: Context menu scoping fix; prevent zone-level menus from overriding global ones.

- 🔥 **[PR #129813](https://github.com/nousresearch/hermes-agent/pull/129813)** – *User-configurable URL scheme allowlist*  
  → Closed via PR #129848 | Highly requested feature: users want to use deep links to Obsidian, VS Code, etc.  
  **Signal**: Strong demand for richer integration with local tools.

- 🔥 **[Issue #129819](https://github.com/nousresearch/hermes-agent/issues/129819)** – *Wake word always starts in main chat*  
  → 1 reaction | Frustration over inconsistent behavior in multi-tab workflows.  
  **Signal**: Mobile-first UX thinking emerging—users expect context-aware voice activation.

---

### **5. Bugs & Stability**  
High-priority bugs reported today include:

| Severity | Issue | Summary | Fix PR? |
|--------|-------|--------|--------|
| P1 | [#129254](https://github.com/nousresearch/hermes-agent/issues/129254) | Cron agent-mode worker dies silently, blocking task delivery | ❌ Not yet fixed |
| P2 | [#129757](https://github.com/nousresearch/hermes-agent/issues/129757) | `desktop_preview.open(http URL)` does nothing — blank pane | ❌ No fix yet |
| P2 | [#129731](https://github.com/nousresearch/hermes-agent/issues/129731) | Final answer renders twice after session reopen | ⚠️ Partially mitigated by PR #129741 |
| P2 | [#129819](https://github.com/nousresearch/hermes-agent/issues/129819) | Wake word ignores selected tab | ❌ Pending |

> **Note**: Several P2 bugs involve **session state corruption**, **UI regression**, and **silent failures**—indicating instability in core state management and cross-component coordination.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging roadmap signals point toward:

- 📱 **Mobile First**:  
  - [Feature #126292](https://github.com/nousresearch/hermes-agent/issues/126292) – Native Android/iOS apps with real-time voice, location consent, approvals.  
  → High interest (2 reactions), suggests push toward "always-on" personal assistant experience.

- 🧠 **Agent Intelligence Enhancements**:  
  - [Feature #512](https://github.com/nousresearch/hermes-agent/issues/512) – Doom loop detection via repeated identical tool calls.  
  → Already flagged as “needs-decision” — likely to be prioritized in v0.22.

- 🔐 **Vault & Credential Flexibility**:  
  - [Feature #116085](https://github.com/nousresearch/hermes-agent/issues/116085) – Allow registrable-domain matching for credentials (e.g., `naver.com` vs `mail.naver.com`).  
  → Critical for usability in real-world workflows.

- 🎯 **TUI Optimization**:  
  - [Feature #110124](https://github.com/nousresearch/hermes-agent/issues/110124) – Fast model switching using existing state.  
  → Indicates desire for low-latency, high-throughput agent interactions.

> **Prediction**: Next major release (v0.22) will likely focus on **mobile support**, **agent safety features**, and **TUI performance**.

---

### **7. User Feedback Summary**  
Users report consistent pain points:

- **Frustration with broken integrations**: Deep links (`obsidian://`, `vscode://`) blocked without config options.
- **Confusion in multi-tab workflows**: Voice activation and right-click menus behave inconsistently.
- **Lack of trust in agent conclusions**: Users worry about factual claims made without verified tool output ([Issue #54722](https://github.com/nousresearch/hermes-agent/issues/54722)).
- **Desktop stability concerns**: Crashes, silent hangs, and session corruption affect daily use.
- **Security anxiety**: Concerns over credential leakage via terminal snapshots and insecure environment handling.

> Overall satisfaction remains high due to powerful capabilities, but **usability and trust barriers** are growing as complexity increases.

---

### **8. Backlog Watch**  
Critical long-standing issues needing maintainer attention:

- ⚠️ **[Issue #109552](https://github.com/nousresearch/hermes-agent/issues/109552)** – *Label audit: unverified duplicates/invalids*  
  → 18 comments | Still open after 3 months. Labels are being misused as closure indicators, not retrieval cues. Requires policy clarification and triage automation.

- ⚠️ **[Issue #62336](https://github.com/nousresearch/hermes-agent/issues/6236)** – *Terminal snapshots leak credentials*  
  → 9 comments | Security risk with zero mitigation. Urgent fix needed.

- ⚠️ **[Issue #512](https://github.com/nousresearch/hermes-agent/issues/512)** – *Doom loop detection*  
  → 4 comments, 1 reaction | High-value feature with clear use case. Should be prioritized for next sprint.

- ⚠️ **[Issue #122133](https://github.com/nousresearch/hermes-agent/issues/122133)** – *Plugin name collision on partial clone*  
  → 6 comments | Breaks `hermes update` in CI/CD pipelines. Needs resolution before v0.22.

> These represent **systemic risks** in triage hygiene, security, and resilience—addressing them will improve both user trust and contributor onboarding.

---  
**Project Health Score**: ⭐⭐⭐⭐☆ (4.5/5) – Active, secure, innovative, but with rising complexity and triage debt.  
**Next Focus**: Stabilize session/state logic, close security gaps, and deliver mobile + TUI enhancements.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-10-01**

---

### **1. Today's Overview**  
The IronClaw project remains in a state of quiet maintenance as of October 1, 2026. No new issues or releases have been published in the past 24 hours, and no pull requests have been merged. Activity is minimal but stable: only one open PR (#7988) exists, indicating ongoing infrastructural upkeep rather than feature development or urgent fixes. The absence of recent user-reported issues suggests system stability, though low contributor engagement may signal reduced momentum in active development cycles.

---

### **2. Releases**  
*No new releases detected.*  
There are no version updates or changelogs available for the period ending 2026-10-01. The project continues to rely on the most recently published release, with no indication of breaking changes, migration requirements, or deployment advisories.

---

### **3. Project Progress**  
*One open pull request has been updated in the last 24 hours:*  
- **PR #7988**: [chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)  
  - **Status**: Open (as of 2026-09-30)  
  - **Description**: Automatically generated by the nightly `Codebase Graph Refresh` workflow, this PR updates the committed codebase-memory bootstrap snapshot from the default branch (`main`).  
  - **Impact**: This is a routine CI/infrastructure chore aimed at ensuring the AI agent’s internal knowledge graph reflects the current state of the codebase. It does not introduce functional changes but supports long-term agent accuracy and context awareness.  
  - **Validation**: Tests pass; no merge conflicts reported.  

This single PR represents the only developmental activity today—focused on maintaining foundational data integrity rather than advancing features.

---

### **4. Community Hot Topics**  
*No active issues or high-engagement PRs were observed today.*  
The only open PR (#7988) is automated and currently lacks comments or reactions (0 👍). This indicates either:
- A highly mature, self-sustaining CI pipeline where such tasks are considered routine and non-contentious.
- Low community visibility or participation in infrastructure-level contributions.

No user-driven discussions, bug reports, or feature debates are visible in the issue tracker, suggesting either high satisfaction with current functionality or a lack of user interaction.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions reported in the last 24 hours.*  
With zero open issues and no recent PR merges involving error fixes, the project appears to be running stably. No fix-related PRs were submitted or merged during this period, reinforcing the impression of operational continuity. However, the absence of reported issues may also reflect underreporting or limited testing coverage.

---

### **6. Feature Requests & Roadmap Signals**  
*No new feature requests or roadmap signals emerged in the last 24 hours.*  
Given the lack of open issues and low activity, there are no immediate indications of emerging user demands. However, the existence of a recurring `Codebase Graph Refresh` workflow suggests that **codebase-awareness fidelity** remains a core concern for the project. Future versions may prioritize:
- Enhanced real-time synchronization between codebase changes and agent memory.
- More granular control over knowledge graph refresh intervals.
- Improved debugging tools for agents relying on local code context.

These could emerge as roadmap priorities if user feedback increases.

---

### **7. User Feedback Summary**  
*No user feedback was recorded in the last 24 hours.*  
The silence in the issue tracker implies either:
- High satisfaction with current performance and reliability.
- Limited user base actively engaging with the project.
- Potential friction in reporting mechanisms (e.g., unclear contribution guidelines).

Notably, the project relies heavily on automation (e.g., `ironclaw-ci[bot]`) for infrastructure tasks, which may reduce opportunities for direct user input unless explicit feedback channels are promoted.

---

### **8. Backlog Watch**  
*No high-priority issues are currently outstanding, but attention should be directed toward:*  
- **PR #7988**: [chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)  
  - Though labeled "low risk" and auto-generated, it remains open since 2026-08-29 (~32 days).  
  - Delayed review may impact the freshness of the agent’s contextual understanding over time.  
  - Suggestion: Set a policy to auto-merge approved infrastructural PRs after 72 hours of inactivity unless blocked.

Additionally, the absence of any open issues raises concerns about potential **underreported technical debt** or **lack of user engagement**. Maintainers should consider initiating a periodic health check or community survey to surface latent needs.

---

**Conclusion**: IronClaw is in a stable, low-activity phase as of October 1, 2026. While the system appears robust and well-maintained via automated workflows, the lack of community interaction and delayed review of critical infrastructure updates suggest a need for proactive engagement and process refinement to sustain long-term growth.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-10-01**

---

### **1. Today's Overview**  
QwenPaw remains highly active with strong community engagement, evidenced by **19 issues and 41 pull requests updated in the last 24 hours**. The project is in a critical beta phase, with **v2.2.2-beta.4 released today**, signaling imminent feature stabilization ahead of a potential v2.2.2 final release. High volumes of bug reports—particularly around session integrity, memory indexing, model integration, and security sandboxing—indicate ongoing stress testing across diverse deployment environments. Despite this, core functionality continues to evolve rapidly, driven by both internal contributors and first-time developers.

---

### **2. Releases**  
**🆕 v2.2.2-beta.4 (Released: 2026-09-30)**  
[GitHub Release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.4)  

#### ✅ What’s Changed:
- **feat**: Added reranker UI config panel to `ReMeLightMemoryCard` via #6399  
- **chore**: Bumped version to `2.2.2b4` (PR #7892)  
- **perf(console)**: Split chat dependencies for improved load performance  

#### ⚠️ Migration Notes:
- No breaking changes reported; however, users on `2.2.1` should verify compatibility with new `prompt_cache_key` handling in custom providers (see #8058).  
- This release includes fixes for context meter under-reporting (`#8057`) and embedding reindex failures (`#8040`), so upgrading is recommended for production stability.

---

### **3. Project Progress**  
**✅ Merged / Closed PRs (Today):**  
- **#8049** – Fixed timezone drift in message timestamps (`_process_local_tz()` now resolves per-timestamp, not frozen offset)  
- **#8062** – Improved embedding resilience: keeps valid vectors when one chunk exceeds token limit (addresses #8040)  
- **#8060** – Corrected Anthropic context meter to include cache read/write tokens (fixes #8057)  
- **#8061** – Enabled `prompt_cache_key` support for custom OpenAI-compatible providers (resolves #8058)  

These fixes collectively enhance **data integrity, reliability, and observability**, especially in long-running or high-load sessions involving caching and large documents.

---

### **4. Community Hot Topics**  
Top-engaged items reflect deep user concerns about **session stability, security, and usability**:

- **#8042 [Bug]**: Tool output files auto-fed back into models cause crashes when unsupported (e.g., PDFs) → **Critical for agent workflows**  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/8042)  
- **#8022 [Bug]**: `send_file_to_user` + empty assistant messages corrupt context, causing persistent 400 errors → **Blocks real-world automation**  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/8022)  
- **#7672 [Bug]**: Security sandbox bypass on Windows → **Major trust concern for enterprise adoption**  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/7672)  
- **#7945 [Feature]**: Add `@everyone`/`@ALL` filtering in IM channels → **High demand from team bot users**  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/7945)  

> 🔍 *Analysis:* Users are increasingly deploying QwenPaw in team environments (Feishu, WeCom, QQ), exposing edge cases in message routing and access control. The top issues suggest a need for **better isolation between agent actions and user interactions**, particularly in shared contexts.

---

### **5. Bugs & Stability**  
**🚨 Ranked by Severity:**  
1. **#8042** – Auto-feed of tool outputs → Internal error on unsupported formats  
   - *Impact*: Breaks entire session; affects all agents using file generation tools  
   - *Fix PR*: Not yet merged (but related work underway in #8062)  

2. **#8022** – File block pollution corrupts context → Persistent 400 errors  
   - *Impact*: Blocks downstream model calls even after recovery  
   - *Fix PR*: None yet; requires logic change in `send_file_to_user` handler  

3. **#8040** – Embedding reindex fails silently due to CJK chunk overlimit  
   - *Impact*: Memory loss in knowledge-intensive agents  
   - *Fix PR*: #8062 (merged) addresses partial failure scenario  

4. **#7672** – Security sandbox bypass on Windows  
   - *Impact*: Risk of unintended system access (Office COM execution)  
   - *Fix PR*: None — **urgent priority for maintainers**  

5. **#8064** – DeepSeek provider breaks session permanently after `send_file_to_user`  
   - *Impact*: Unrecoverable state; blocks all subsequent requests  
   - *Fix PR*: Pending review  

---

### **6. Feature Requests & Roadmap Signals**  
Top-requested features indicate a shift toward **enterprise readiness and UX polish**:

- **#7997 [Feature]**: Message retraction/editing + workspace rollback → **Highly desired for collaborative editing**  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/7997)  
  → Likely candidate for v2.2.3 or v2.3

- **#7945 [Feature]**: Filter `@everyone` mentions → **Essential for reducing noise in team bots**  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/7945)  
  → Could be included in next minor release

- **#7569 [Feature]**: Advisor Mode (dual-model task pairing) → **Signals interest in cost-performance optimization**  
  [Link](https://github.com/agentscope-ai/QwenPaw/pull/7569)  
  → Already under development; may ship in v2.2.3

- **#8059 [Bug]**: Background task records lost after completion → **Indicates growing use of async agents**  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/8059)  
  → Fix PR #8063 submitted; could become a key v2.2.3 feature

> 📌 *Prediction:* The next major update will focus on **agent lifecycle management, context resilience, and multi-user collaboration**.

---

### **7. User Feedback Summary**  
Real-world pain points highlight practical deployment challenges:

- **“Agent responses break after sending a PDF”** → Users report that `send_file_to_user` causes cascading failures (seen in #8042, #8064).  
- **“I can’t stop an agent mid-execution without losing messages”** → Confirmed in #1489 and #8049 (now fixed).  
- **“My local Office macros are being run unexpectedly”** → Direct evidence of sandbox bypass (#8002, #7672).  
- **“The chat logs don’t show who said what in group chats”** → Critical for team coordination (fixed in #5722).  
- **“Context meter shows wrong token count”** → Undermines trust in usage monitoring (fixed in #8060).

> 💬 *Sentiment*: High satisfaction with core AI capabilities, but **frustration with session stability and security boundaries** is rising. Users value transparency and control.

---

### **8. Backlog Watch**  
Long-standing, high-impact issues requiring maintainer attention:

- **#7672** – Security sandbox breach on Windows (opened Sep 10, 2026) → **Critical vulnerability**, no fix PR yet  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/7672)

- **#7011** – Console stop request cancels Feishu session across UI sessions → **Serious race condition**, closed but unresolved root cause  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/7011)

- **#5861** – macOS login-shell PATH not inherited by packaged backend → Affects WSL/macOS users relying on shell tools  
  [Link](https://github.com/agentscope-ai/QwenPaw/pull/5861)  
  → Still open, needs review despite being stable code

- **#7443** – Dangerous instructions evade detection → **Security risk**, though not reproducible in public test envs  
  [Link](https://github.com/agentscope-ai/QwenPaw/issues/7443)

> ⏳ *Recommendation*: Prioritize **security sandbox fixes (#7672)** and **session consistency bugs (#7011, #8042)** before v2.2.3 final release.

---  
*Digest generated: 2026-10-01 | Data source: GitHub API snapshot*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-10-01  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active with 50 open issues and 50 open pull requests updated in the last 24 hours, indicating strong momentum in development and community engagement. Activity is concentrated around security hardening, identity access control (IAM), and runtime stability—particularly in preparation for the upcoming **v0.9.0 release**. A notable surge in high-risk (`risk:high`) and critical (`priority:p0/p1`) issues reflects a focus on resolving foundational security vulnerabilities before major milestones. The absence of new releases suggests that the team is prioritizing quality assurance and risk mitigation over feature delivery at this stage.

---

### **2. Releases**

❌ **No new releases** were published in the past 24 hours.  
- The latest stable release remains **v0.8.6**, with **v0.9.0** still pending.  
- Key features slated for v0.9.0 include: OIDC integration, gateway separation, per-agent RBAC, secure plugin updates, and complete IPC coverage.  
- Migration notes from v0.8.6 to v0.9.0 are not yet documented; users should expect breaking changes in authentication, session ownership, and plugin lifecycle.

> 🔗 [Release History](https://github.com/zeroclaw-labs/zeroclaw/releases)

---

### **3. Project Progress**

✅ **Merged/Closed PRs (Today):**  
- **PR #11284** – Fixed stale documentation regarding plugin name conflicts and lean builds.  
- **PR #11290** – Preserved undo history when adding chat context in ZeroCode TUI.  

🛠️ **Key Advancements:**  
- **PR #11289** – Introduced **stable RPC denial reason identifiers** and localized messages, improving debuggability and error transparency.  
- **PR #11331** – Began serving REST `sessions` endpoints via the core, advancing the gateway-core split (Phase 3 of v0.9.0).  
- **PR #11322** – Enabled forwarder of plugin webhooks to core over RPC, completing cross-process plugin communication.  
- **PR #11275** – Fixed protocol version spelling in `initialize`, preventing potential handshake failures.  

These PRs represent progress toward **security consistency**, **modular architecture**, and **inter-component reliability**.

> 🔗 [Recent Merged PRs](https://github.com/zeroclaw-labs/zeroclaw/pulls?q=is%3Amerged+updated%3A2026-10-01)

---

### **4. Community Hot Topics**

🔥 **Top 3 Most Active Issues (by comment count):**

1. **#8692** – *Maintainer decision queue for RFCs and design issues*  
   - **Comments:** 15 | **Last Updated:** 2026-09-30  
   - **Link:** [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)  
   - **Analysis:** This tracker signals growing need for structured governance. With 15 comments, it reflects community frustration over delayed decisions on architectural RFCs. Indicates scaling pains in contributor coordination.

2. **#5982** – *Per-sender RBAC for multi-tenant agent deployments*  
   - **Comments:** 11 | **Updated:** 2026-10-01  
   - **Link:** [Issue #5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)  
   - **Analysis:** High demand for fine-grained access control in enterprise or shared environments. Suggests early adoption in production use cases requiring tenant isolation.

3. **#11198** – *Delegated memory tools lose principal scope*  
   - **Comments:** 3 | **Severity:** S0 (data loss / security risk)  
   - **Link:** [Issue #11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198)  
   - **Analysis:** Critical flaw in agent delegation model. Even though only 3 comments, its severity level indicates urgency—any agent can bypass ownership checks when delegating memory operations.

> 🔗 [Most Commented Issues](https://github.com/zeroclaw-labs/zeroclaw/issues?utf8=%E2%9C%93&q=is%3Aopen+sort%3Acomments-desc+)

---

### **5. Bugs & Stability**

⚠️ **Critical Bugs (S0/S1) Reported Today:**

| Issue | Severity | Component | Summary | Fix PR? |
|------|----------|-----------|--------|--------|
| [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) | S0 | Memory | Delegates lose principal scope → unauthorized access | ❌ No fix PR |
| [#11127](https://github.com/zeroclaw-labs/zeroclaw/issues/11127) | S0 | Security/Sandbox | Session-data tools bypass ownership checks | ❌ No fix PR |
| [#11123](https://github.com/zeroclaw-labs/zeroclaw/issues/11123) | S0 | Security/Sandbox | SOP accepts wildcard selectors without `tools:execute` | ❌ No fix PR |
| [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | S1 | Daemon | Stack overflow during Quickstart config apply | ❌ No fix PR |

📌 **Stability Concerns:**  
- **Flaky CI test (#11294)**: Race condition in `configure_refuses_an_incarnation_replaced_under_the_lock` under parallel runtime.  
- **Webhook logging issue (#10249)**: Raw caller-controlled idempotency keys logged in plain text — privacy risk.

> 🔗 [High-Risk Bugs](https://github.com/zeroclaw-labs/zeroclaw/issues?q=is%3Aopen+label%3Arisk%3Ahigh+label%3Abug)

---

### **6. Feature Requests & Roadmap Signals**

🚀 **Emerging Priorities for v0.9.0:**

| Feature | Issue | Status | Indicators |
|-------|------|--------|---------|
| **Per-sender RBAC** | [#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) | Accepted | Core IAM upgrade for multi-tenancy |
| **Knowledge corpus (RAG)** | [#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) | RFC accepted | Document retrieval capability requested by operators |
| **Save WhatsApp images to workspace** | [#11255](https://github.com/zeroclaw-labs/zeroclaw/issues/11255) | In-progress | Direct user demand for image handling |
| **Verified plugin update + rollback** | [#10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995) | Accepted | Critical for plugin ecosystem trust |
| **Complete local IPC for external gateway** | [#11001](https://github.com/zeroclaw-labs/zeroclaw/issues/11001) | Blocked | Part of Phase 3 gateway separation |

💡 **Prediction:** v0.9.0 will be a **security-focused release**, emphasizing **identity scoping**, **plugin integrity**, and **gateway modularization**, likely delayed until all S0 bugs are resolved.

---

### **7. User Feedback Summary**

💬 **Real User Pain Points Observed:**

- **"I can't use images from WhatsApp — they show as `[Image]` text."**  
  → Reported in [#10975](https://github.com/zeroclaw-labs/zeroclaw/issues/10975). Users relying on vision models are blocked.  
- **"My initial_prompt isn’t sent to Whisper transcription."**  
  → Reported in [#11256](https://github.com/zeroclaw-labs/zeroclaw/issues/11256). Misleading documentation causes confusion.  
- **"After revoking admin rights, old session tasks still run."**  
  → Seen in [#11126](https://github.com/zeroclaw-labs/zeroclaw/issues/11126). Trust degradation in access control.  
- **"Plugins don’t have an update command — reinstalling breaks state."**  
  → Highlighted in [#10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995). Hinders maintenance workflows.

✅ **Positive Signals:**  
- Users actively contributing fixes (e.g., PRs for macOS test compatibility).  
- Detailed reproduction steps in bug reports (e.g., KUMA SDK integration in #11233).

---

### **8. Backlog Watch**

⏳ **Long-Unanswered High-Impact Issues Needing Maintainer Attention:**

| Issue | Comments | Last Updated | Risk | Notes |
|------|--------|--------------|------|------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 15 | 2026-09-30 | Medium | Decision backlog slowing RFC progression |
| [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | 5 | 2026-10-01 | High | Runtime/gateway deliverables tracker — overdue for closure |
| [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) | 4 | 2026-09-30 | High | OIDC milestone — final close-out needed |
| [#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235) | 2 | 2026-09-30 | High | Knowledge corpus RFC — needs implementation plan |

📌 **Recommendation:** Maintain a dedicated **RFC triage session** weekly to reduce decision debt and accelerate v0.9.0 planning.

> 🔗 [Backlog Watchlist](https://github.com/zeroclaw-labs/zeroclaw/issues?utf8=%E2%9C%93&q=is%3Aopen+label%3Aneeds-maintainer-review+sort%3Aupdated-desc+)

---

### ✅ **Overall Project Health: Strong but Under Pressure**

- **Strengths:** High activity, clear roadmap, robust contributor engagement, mature CI/CD.
- **Risks:** Unresolved S0 bugs, growing decision backlog, lack of release cadence.
- **Next Step:** Prioritize **security audit** and **maintainer triage** ahead of v0.9.0 to ensure safe, stable deployment.

> 📊 **Data Source:** GitHub API snapshot — 2026-10-01 00:00 UTC  
> 🔗 [ZeroClaw GitHub Repository](https://github.com/zeroclaw-labs/zeroclaw)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*