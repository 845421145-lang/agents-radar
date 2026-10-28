# OpenClaw Ecosystem Digest 2026-10-28

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-28 01:35 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-10-28**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with over **500 issues and PRs updated in the last 24 hours**, indicating sustained momentum across development, testing, and community engagement. A surge in high-severity stability and reliability issues—particularly around memory management, session state corruption, and Windows-specific failures—suggests ongoing stress on core runtime systems. The release of three new versions (v2026.10.10-beta.4, v2026.10.8, and v2026.9.35) reflects a strong focus on stability fixes and security hardening, especially for long-term support (LTS) users. Despite this activity, several critical regressions are blocking user workflows, signaling that the current development pace may be prioritizing feature velocity over system robustness.

---

### **2. Releases**  
Three new releases were published today:

- **`v2026.10.10-beta.4`**  
  [GitHub Release](https://github.com/openclaw/openclaw/releases/tag/v2026.10.10-beta.4)  
  - **Highlights**:  
    - Fixed: Automations now preserve authenticated operator authority during scheduled follow-ups (including `next_check` rearming), while maintaining role, session, cancellation, target, and tool-policy revocation boundaries.  
  - **Impact**: Critical for automated agent workflows relying on consistent context and permissions. No breaking changes reported.

- **`v2026.10.8`**  
  [GitHub Release](https://github.com/openclaw/openclaw/releases/tag/v2026.10.8)  
  - **Highlights**:  
    - Gateway now restarts automatically after post-update Doctor failures.  
    - Orphaned maintenance workers no longer block CLI commands or Gateway startup.  
    - Updates no longer abort on ACL filesystems or Windows environments.  
  - **Migration Note**: Recommended for all users on Windows or complex file system setups; resolves common update deadlocks.

- **`v2026.9.35`** *(Extended-Stable LTS Equivalent)*  
  [GitHub Release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.35)  
  - **Summary**: A stable, security-focused release based on end-of-September 2026 codebase. Includes critical fixes for reliability, performance, and new model support.  
  - **Target Audience**: Production deployments requiring long-term stability. Not recommended for early adopters seeking new features.

---

### **3. Project Progress**  
**Merged/Completed PRs (Today)**:  
- ✅ `PR #186417` – Fixes webhook/hook turns running with owner-only tools despite token-based access.  
- ✅ `PR #186400` – Resolves CI dependency check failure due to missing formatter export.  
- ✅ `PR #183018` – Ensures guest access guidance remains visible without Inbox warnings.  
- ✅ `PR #178347` – Clarifies documentation: image-based hosts remain down until `doctor --fix` runs post-upgrade.  

**Key Advancements**:  
- **Session resilience**: `PR #185730` refactors graceful restarts to resume running sessions, reducing downtime from tens of seconds to milliseconds.  
- **Performance optimization**: Multiple PRs (`#186421`, `#186422`) improve SQLite and session metadata handling by reusing cached facts and cloning scope buckets directly.  
- **Accessibility**: `PR #185921` introduces a screen reader mode for the TUI, addressing long-standing usability concerns ([#9637](https://github.com/openclaw/openclaw/issues/9637)).

---

### **4. Community Hot Topics**  
Top 5 most commented issues reflect systemic instability:

1. **[#160959](https://github.com/openclaw/openclaw/issues/160959)** – *Gateway blocks for minutes capturing large external plugins (P0, diamond lobster)*  
   - **Comments**: 58 | **Impact**: Crash loop, affects startup and model republishing.  
   - **Need**: Better async plugin capture and event-loop isolation.

2. **[#119720](https://github.com/openclaw/openclaw/issues/119720)** – *Synchronous persistence blocks event loop at scale (P0, diamond lobster)*  
   - **Comments**: 25 | **Impact**: High load stalls gateway responsiveness.  
   - **Need**: Asynchronous, atomic persistence layer redesign.

3. **[#170956](https://github.com/openclaw/openclaw/issues/170956)** – *Windows: slow startup, unclean shutdown, schtasks permission errors (P0, silver shellfish)*  
   - **Comments**: 22 | **Impact**: Update/restart failures on Windows.  
   - **Need**: Robust service lifecycle management for `schtasks` and MSIX.

4. **[#157325](https://github.com/openclaw/openclaw/issues/157325)** – *Stuck agent-DB resource causes universal reply failure (P0, platinum hermit)*  
   - **Comments**: 19 | **Impact**: Complete agent outage until restart.  
   - **Need**: Deadlock detection and automatic DB resource recovery.

5. **[#184600](https://github.com/openclaw/openclaw/issues/184600)** – *Skill Workshop auto-mutates skills without review (diamond lobster)*  
   - **Comments**: 7 | **Impact**: Unrecoverable behavior contamination.  
   - **Need**: User consent gate for behavioral updates; audit trail.

> 🔥 **Pattern**: 6 of top 10 issues are P0/P1 with “crash-loop” or “ux-release-blocker” tags—indicating urgent need for stability improvements before next stable release.

---

### **5. Bugs & Stability**  
| Severity | Issue | Summary | Fix PR? |
|--------|-------|---------|--------|
| 🦞 **P0 (Diamond Lobster)** | [#160959](https://github.com/openclaw/openclaw/issues/160959) | Plugin capture blocks event loop for minutes | ❌ No fix yet |
| 🦞 **P0** | [#157325](https://github.com/openclaw/openclaw/issues/157325) | Stuck DB resource kills all agent replies | ❌ No fix |
| 🦞 **P0** | [#170956](https://github.com/openclaw/openclaw/issues/170956) | Windows update/restart unreliability | ❌ No fix |
| 🦪 **P1** | [#181432](https://github.com/openclaw/openclaw/issues/181432) | Excessive RSS (~1.9GB) and SQLite timeouts | ❌ No fix |
| 🦪 **P1** | [#181078](https://github.com/openclaw/openclaw/issues/181078) | "Canonical session reader continuation is no longer current" error | ❌ No fix |

> ⚠️ **Critical Risk**: Multiple P0 bugs affect core Gateway availability and session integrity. These could prevent production rollout of future versions.

---

### **6. Feature Requests & Roadmap Signals**  
Top user-driven feature requests:

- **Filesystem Sandboxing** ([#7722](https://github.com/openclaw/openclaw/issues/7722)) – Request for config-driven `tools.fileAccess` restrictions.  
  - **Signal**: Strong demand for secure sandboxing in multi-agent environments. Likely to be prioritized in Q1 2027.

- **Per-model Usage Logging** ([#13219](https://github.com/openclaw/openclaw/issues/13219)) – Needed for cost tracking and model mix optimization.  
  - **Signal**: High priority for enterprise users. Expected in 2026.11–12.

- **Android UI Consistency** ([#175826](https://github.com/openclaw/openclaw/issues/175826)) – Match browser’s optional questions and approval flows.  
  - **Signal**: Mobile experience is a growing pain point; likely to be addressed in next mobile SDK update.

- **Screen Reader Mode** ([#9637](https://github.com/openclaw/openclaw/issues/9637)) – Already implemented via `PR #185921`.  
  - **Signal**: Accessibility is now a confirmed roadmap item.

---

### **7. User Feedback Summary**  
Real-world pain points revealed through issue reports:

- **Windows Users**: Struggle with unreliable updates, `schtasks` permission errors, and slow startup (e.g., [#170956](https://github.com/openclaw/openclaw/issues/170956)).  
- **Enterprise Operators**: Report session state corruption leading to total agent outages ([#157325](https://github.com/openclaw/openclaw/issues/157325)), requiring manual restarts.  
- **Developers**: Frustrated by silent failures (e.g., `openclaw config get` masking passwords — [#173313](https://github.com/openclaw/openclaw/issues/173313)) and lack of diagnostics.  
- **Mobile Users**: Want consistent UX across platforms, especially Android ([#175826](https://github.com/openclaw/openclaw/issues/175826)).  

> ✅ **Positive Feedback**: Users appreciate proactive updates (e.g., `v2026.10.8` fixes), accessibility improvements, and transparent bug reporting.

---

### **8. Backlog Watch**  
High-priority Issues needing maintainer attention:

- **[#136311](https://github.com/openclaw/openclaw/issues/136311)** – Reindex lock never released → 19 GB of orphaned temp DBs. **Stale since 2026-09-02**.  
- **[#130955](https://github.com/openclaw/openclaw/issues/130955)** – `openclaw memory index` stalls after exactly 2 files. **Stale since 2026-08-27**.  
- **[#121232](https://github.com/openclaw/openclaw/issues/121232)** – Memory-core dreaming ranker and applier disagree permanently. **No fix in sight**.  
- **[#184600](https://github.com/openclaw/openclaw/issues/184600)** – Skill Workshop mutates agent behaviors without consent. **Urgent UX/security risk**.  
- **[#177656](https://github.com/openclaw/openclaw/issues/177656)** – Native host exec fails with `shared-state reader requires current integrity admission`. **28+ failures reported**.  

> 🔔 **Action Required**: These issues have been open for weeks/months with minimal progress. They represent long-term technical debt and potential user churn risks.

---

**Next Steps**: Prioritize P0 stability fixes, conduct root-cause analysis on memory/event-loop bottlenecks, and initiate triage for stale backlog items. Consider releasing a **patch series (v2026.10.11–13)** focused solely on reliability and crash prevention.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-10-28**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem is entering a phase of intense technical maturation, marked by rapid iteration, growing cross-platform demands, and increasing focus on stability, security, and trust. Projects are diverging in maturity: some (e.g., OpenClaw) are prioritizing core runtime reliability amid feature velocity, while others (e.g., ZeroClaw, QwenPaw) are advancing toward enterprise-grade identity and session management. The landscape reflects a clear shift from novelty-driven development to production-readiness, with user feedback increasingly centered on long-running workflows, session persistence, and secure multi-surface access.

---

### **2. Activity Comparison**

| Project | Issues Updated (24h) | PRs Updated (24h) | Release Status | Health Score (5.0) |
|--------|----------------------|-------------------|----------------|--------------------|
| **OpenClaw** | 500+ | 500+ | v2026.10.10-beta.4, v2026.10.8, v2026.9.35 | ⭐⭐⭐☆☆ (3.5/5) |
| **Hermes Agent** | 50 | 50 | No new release (v0.22.5 stable) | ⭐⭐⭐⭐☆ (4.0/5) |
| **IronClaw** | 0 | 0 | No activity | ⭐☆☆☆☆ (1.0/5) |
| **QwenPaw** | 36 | 50 | v2.3.0-beta.1 | ⭐⭐⭐⭐☆ (4.5/5) |
| **ZeroClaw** | 22 | 42 | v0.8.7 (security patch) | ⭐⭐⭐⭐☆ (4.5/5) |

> ✅ *Note*: OpenClaw leads in volume but shows signs of instability; QwenPaw and ZeroClaw demonstrate strong momentum with focused, high-impact updates.

---

### **3. OpenClaw's Position**  
OpenClaw remains the most active project in the ecosystem, with over **500 issues and PRs updated daily**, reflecting a large, engaged community and aggressive development pace. Its technical approach emphasizes **feature-rich automation, extensive tool policy enforcement, and deep session state control**, setting it apart from more modular peers. Compared to Hermes Agent (focused on cross-surface continuity) or ZeroClaw (identity-first), OpenClaw’s architecture leans toward **centralized orchestration with granular access boundaries**, making it ideal for complex, regulated agent workflows. However, its community size may be offset by rising P0 stability concerns—indicating a need for better triage discipline despite high contribution volume.

---

### **4. Shared Technical Focus Areas**  
Multiple projects converge on critical infrastructure challenges:

- **Session Persistence & Resumption**  
  - *Projects*: OpenClaw (#157325), Hermes Agent (#139818, #144814), QwenPaw (#8417, #8405)  
  - *Need*: Reliable resume across restarts, remote gateways, and device surfaces; currently plagued by race conditions and state corruption.

- **Cross-Platform Stability (Windows/Linux/Android)**  
  - *Projects*: OpenClaw (#170956), QwenPaw (#8185, #8210), ZeroClaw (#12075)  
  - *Need*: Robust file system handling, permission models, and native packaging (e.g., .deb/AppImage).

- **Security & Access Control**  
  - *Projects*: ZeroClaw (#11913, #12051), OpenClaw (ACL revocation), QwenPaw (audit logging)  
  - *Need*: Fine-grained scope enforcement, OIDC support, and prevention of privilege escalation.

- **Context & Memory Management**  
  - *Projects*: QwenPaw (#8312, #8417), OpenClaw (memory leaks), Hermes Agent (context drift)  
  - *Need*: Efficient compaction, transient context injection, and avoidable memory bloat.

---

### **5. Differentiation Analysis**

| Project | Feature Focus | Target Users | Technical Architecture |
|-------|---------------|--------------|------------------------|
| **OpenClaw** | High-fidelity automation, role-based policy enforcement, long-term session integrity | DevOps, enterprises, regulated environments | Centralized gateway + strict session/state isolation |
| **Hermes Agent** | Cross-surface consistency, mobile/webapp parity, workflow portability | Hybrid users, remote workers, productivity seekers | Decentralized session routing, webapp-first UX |
| **QwenPaw** | Rich UI/UX, plugin extensibility, real-time interaction (voice, HTML previews) | Creators, developers, power users | Tauri-based desktop, modular skill system |
| **ZeroClaw** | Identity governance, audit trails, secure session history | Enterprises, compliance teams, team-managed systems | Append-only event logs, OIDC integration, per-agent scoping |
| **IronClaw** | N/A (no activity) | N/A | N/A |

> 🔍 *Key Insight*: While OpenClaw leads in scale and complexity, **ZeroClaw and QwenPaw are emerging as leaders in security and usability**, respectively—positioning them for enterprise adoption.

---

### **6. Community Momentum & Maturity**

- **Rapid Iteration Tier**:  
  - *OpenClaw* (extreme velocity, high churn)  
  - *QwenPaw* (beta release cycle, active feature development)  
  - *ZeroClaw* (frequent small fixes, security patches)  

- **Stabilization & Maturity Tier**:  
  - *Hermes Agent* (steady progress, few releases, strong focus on UX polish)  
  - *IronClaw* (stagnant — likely abandoned or dormant)

> 📈 *Trend*: The ecosystem is bifurcating: **high-velocity innovation (OpenClaw, QwenPaw)** vs. **targeted stabilization (Hermes, ZeroClaw)**. Projects with consistent release cadence and backlog triage (e.g., ZeroClaw) show stronger long-term viability.

---

### **7. Trend Signals**  
From community feedback, three dominant industry trends emerge:

1. **Trust Over Novelty**: Users prioritize **session resilience, data integrity, and predictable behavior** over flashy features. Silent failures (e.g., `openclaw config get` masking passwords) erode trust.
   
2. **Multi-Surface Consistency**: Demand for **unified session access across desktop, mobile, and browser** is universal. This includes input mirroring, shared state, and consistent UX (e.g., Hermes Agent #112028, ZeroClaw #12071).

3. **Enterprise-Grade Security & Governance**: Features like **OIDC sign-in, per-agent audit logs, and scoped SOPs** are no longer niche—they’re expected in production deployments (ZeroClaw #11961, QwenPaw #8412).

> 💡 **Value for Developers**: Prioritize **stability, observability, and access control**—not just model integration or UI flair. The next wave of adoption will favor systems that *don’t break* under load or across devices.

---

### ✅ **Conclusion**  
The personal AI agent ecosystem is transitioning from experimentation to deployment readiness. **OpenClaw** dominates in scale and ambition but faces stability risks. **QwenPaw** and **ZeroClaw** are leading in UX and security maturity, respectively. **Hermes Agent** offers a balanced path forward with strong cross-platform focus. Developers should align with projects that prioritize **session integrity, auditability, and cross-device consistency**—the true differentiators in production-grade AI agents.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-10-28**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pace of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across core components. The ecosystem is particularly focused on **session state consistency, cross-surface access (desktop/mobile/webapp), authentication reliability, and UI/UX polish**. While no new releases were published, multiple critical fixes were merged or proposed, especially around session resumption failures, mobile input handling, and security hardening. The community continues to drive innovation through feature proposals and detailed bug reports, reflecting strong engagement.

---

### **2. Releases**  
*No new releases were published today.*  
There are currently **no stable or pre-release versions** available for download. The latest known version remains **v0.22.5 (stable)**, based on commit `bf0203a794a0`. Users should expect upcoming updates to address ongoing session resilience and webapp stability issues reported in recent days.

> 🔗 [Latest Release](https://github.com/NousResearch/hermes-agent/releases) | [Stable Branch](https://github.com/NousResearch/hermes-agent/tree/main)

---

### **3. Project Progress**  
**Merged / Closed PRs (Today):**  
- ✅ **PR #145770** – *fix(webapp): inspect plugin repositories through the gateway*  
  Resolves a major blocker where browser-hosted plugins failed to install due to missing inspection support. Critical for Webapp usability.
- ✅ **PR #145753** – *fix(pm): a launcher waiting on a reclaimed install state’s lock retries on the live file*  
  Fixes a race condition that could prevent concurrent installer runs after orphan cleanup.
- ✅ **PR #145772** – *fix(providers): main’s Windows arm64 red: a home rescan no longer re-imports a hosted provider plugin*  
  Addresses a regression in Windows ARM64 builds affecting plugin discovery in profile scanning.
- ✅ **PR #86329** – *fix(error_classifier): detect upstream provider 403 errors*  
  Improves error classification for rate-limited or unauthorized API calls (OpenAI, OpenRouter).
- ✅ **PR #86612** – *feat(cli): add auto-discovery registry mappings for Mistral, Cohere, DeepInfra, SiliconFlow*  
  Expands CLI support for popular inference providers via automatic env var detection.

These merges signal strong progress in **tooling stability, cross-platform compatibility, and infrastructure robustness**.

> 🔗 [PR #145770](https://github.com/NousResearch/hermes-agent/pull/145770) | [PR #145753](https://github.com/NousResearch/hermes-agent/pull/145753) | [PR #145772](https://github.com/NousResearch/hermes-agent/pull/145772)

---

### **4. Community Hot Topics**  
Top Issues by engagement reflect deep user frustration with **session persistence and multi-surface access**:

- 📌 **Issue #139818**: *Remote-backend desktop sessions are unresumable — session.resume fails with not_found*  
  **24 comments**, P2 severity. Affects users running `hermes serve` remotely; conversations persist but cannot be resumed post-restart. This is a **core UX failure** undermining trust in session continuity.  
  > 🔗 [Issue #139818](https://github.com/NousResearch/hermes-agent/issues/139818)

- 📌 **Issue #144648**: *Tracking: Webapp (browser-hosted Desktop) post-merge follow-ups*  
  **10 comments**, P2. Highlights ongoing refinement needs after enabling `webapp.enabled: true`. Users report inconsistencies in shared state and session visibility across surfaces.  
  > 🔗 [Issue #144648](https://github.com/NousResearch/hermes-agent/issues/144648)

- 📌 **Issue #145155**: *cron context_from silently injects a days-old run — archive frame off-by-one makes _archive_answer() return None*  
  **5 comments**, P2. A subtle but serious data integrity issue impacting automated workflows relying on cron jobs. Could lead to stale or incorrect inputs being processed.  
  > 🔗 [Issue #145155](https://github.com/NousResearch/hermes-agent/issues/145155)

These issues reveal a **growing demand for reliable, unified session management across devices and environments**, especially as more users adopt hybrid workflows (e.g., desktop + mobile + browser).

---

### **5. Bugs & Stability**  
Critical bugs reported today highlight **session state fragility, input handling failures, and security edge cases**:

| Issue | Severity | Description | Fix Status |
|------|----------|-------------|------------|
| #139818 | P2 | Remote desktop sessions fail to resume after gateway restart | ❌ No fix yet |
| #144814 | P2 | Sessions from mobile dashboard can’t be resumed by native Desktop | ❌ No fix yet |
| #145286 | P2 | CLI misreads refusal messages — renders as "couldn't start model connection" | ❌ No fix yet |
| #145763 | P3 | Command allowlist incorrectly treats shell expansions as literal | ⚠️ Partial fix (PR pending) |
| #145474 | P3 | iOS client sessions (`source='ios'`) cannot be adopted or edited | ❌ No fix yet |
| #145063 | P2 | Tool-call args drop fields when using `anyOf` or optional payloads (DeepSeek-V4.1 Flash) | ❌ No fix yet |

Notably, **multiple P2 bugs involve session lifecycle and cross-surface communication**, suggesting systemic challenges in session ownership and routing logic. These are high-risk for user retention.

> 🔗 [Issue #139818](https://github.com/NousResearch/hermes-agent/issues/139818) | [Issue #144814](https://github.com/NousResearch/hermes-agent/issues/144814)

---

### **6. Feature Requests & Roadmap Signals**  
Emerging themes indicate user desire for **true multi-device parity and deeper integration**:

- 🎯 **Issue #112028** – *Support multi-surface access to the same session (desktop + mobile dashboard)*  
  Requested since September 2026. Now has **8 comments**, 1 👍. A clear roadmap signal for **unified session access** across platforms.
- 🎯 **Issue #136319** – *Mobile access to a live desktop session (read-only mirror + input routed as local input)*  
  4 comments, 1 👍. Users want to monitor and interact with long-running desktop sessions from their phone — a **high-value productivity feature**.
- 🎯 **PR #145801** – *feat(dashboard): serve a manifest and service worker so the dashboard installs as an app*  
  A direct implementation of **PWA (Progressive Web App) capabilities**, enabling offline use and app-like experience. High priority for mobile adoption.

These signals suggest the next release will likely prioritize **cross-surface synchronization, mobile-first experiences, and webapp installability**.

> 🔗 [Issue #112028](https://github.com/NousResearch/hermes-agent/issues/112028) | [PR #145801](https://github.com/NousResearch/hermes-agent/pull/145801)

---

### **7. User Feedback Summary**  
Real-world pain points dominate feedback:
- **Session loss is a top frustration**: Users report losing work after restarts or crashes, especially when using remote gateways.
- **Mobile experience is inconsistent**: Android keyboard input drops in dashboard chat (#145296), and iOS sessions are inaccessible from desktop (#145474).
- **UI/UX friction persists**: Linux desktop window transparency is unconfigurable (#145183); long messages overwhelm mobile viewports (#145593).
- **Trust in automation is eroding**: Cron job staleness (#145155) and silent tool parameter drops (#145063) undermine confidence in AI-driven workflows.

Users value **reliability over novelty**—they want sessions to survive, tools to behave predictably, and mobile access to feel seamless.

> 🔗 [Issue #145593](https://github.com/NousResearch/hermes-agent/issues/145593) | [Issue #145296](https://github.com/NousResearch/hermes-agent/issues/145296)

---

### **8. Backlog Watch**  
Several high-impact, long-standing issues remain open and under-discussion:

- 🔴 **Issue #139818** – Session resume failure after remote backend restart  
  **Created:** 2026-10-16 | **Updated:** 2026-10-27 | **24 comments**  
  *Critical for remote workflow users. Needs urgent attention.*
- 🔴 **Issue #145155** – Cron job feeds on outdated run outputs  
  **Created:** 2026-10-26 | **Updated:** 2026-10-28 | **5 comments**  
  *A subtle but dangerous data corruption risk in automation pipelines.*
- 🔴 **Issue #143331** – `hermes update` fails on Windows due to stale PID lock  
  **Closed:** 2026-10-28 | But **still affects users** — highlights need for better upgrade hygiene.
- 🔴 **PR #128926** – Add official "Sign in with ChatGPT" provider  
  **Created:** 2026-09-30 | **Updated:** 2026-10-28 | **11 comments**  
  *High-demand feature for OpenAI users seeking simpler auth flow.*

> 🔗 [Issue #139818](https://github.com/NousResearch/hermes-agent/issues/139818) | [PR #128926](https://github.com/NousResearch/hermes-agent/pull/128926)

---

### ✅ **Final Assessment**  
Hermes Agent is in a **high-growth, high-intensity phase** with strong community participation. While technical depth and feature ambition are evident, **session reliability and cross-platform consistency remain fragile**. The next 1–2 releases must prioritize **stability, session persistence, and mobile/webapp usability** to retain user trust and scale adoption. Maintainers should consider **triaging P2 session-related bugs into a dedicated "Session Health" sprint**.

> 🔄 *Project health: Active, but requires stabilization focus.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-10-28**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust development pace: **50 pull requests** and **36 issues updated in the last 24 hours**, indicating strong community engagement and ongoing refinement. The release of **v2.3.0-beta.1** signals an imminent feature-rich update, focusing on UI/UX stability, tooling flexibility, and plugin extensibility. A surge in bug reports related to context management, memory handling, and cross-platform compatibility (especially Windows/Linux) suggests that long-running deployments and complex workflows are under heavy real-world testing. Overall, the project shows strong momentum toward a stable 2.3.0 release.

---

### **2. Releases**  
**New Release:** [`v2.3.0-beta.1`](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0-beta.1)  

#### **What’s Changed**  
- ✅ **Fix (console):** Restored interactive HTML previews — critical for debugging and rich output rendering ([#8245](https://github.com/agentscope-ai/QwenPaw/pull/8245)).  
- 🔧 **Feature (tools):** Optional Tavily API key via credential store — improves security and ease of use for external search tools ([#8204](https://github.com/agentscope-ai/QwenPaw/pull/8204)).  
- ✅ **Fix (plugin):** Resolved plugin loading instability (partial fix; see #8265).  

> 💡 **Migration Note:** Users upgrading from `v2.2.x` should test HTML preview functionality and credential store integration. No breaking changes reported.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- [#8458](https://github.com/agentscope-ai/QwenPaw/pull/8458): Fixed CSP blocking embedded `data:` fonts in desktop app — essential for proper rendering.  
- [#8449](https://github.com/agentscope-ai/QwenPaw/pull/8449): Fixed end-to-end test failure — maintains CI reliability.  
- [#8454](https://github.com/agentscope-ai/QwenPaw/pull/8454): Removed duplicated pip install instructions in quickstart docs — improves clarity.  

**Key Advancements:**  
- **Console UX:** Improved model addition workflow via new “Quick Add Model” button ([#8434](https://github.com/agentscope-ai/QwenPaw/pull/8434)) and restricted skill selection to agent creation phase ([#8448](https://github.com/agentscope-ai/QwenPaw/pull/8448)).  
- **Memory & Context:** Automatic recall now injected as transient reference context ([#8457](https://github.com/agentscope-ai/QwenPaw/pull/8457)), reducing redundant memory searches.  
- **Desktop Packaging:** Added Linux `.deb` and AppImage support via Tauri ([#8444](https://github.com/agentscope-ai/QwenPaw/pull/8444)) — major step toward full cross-platform parity.

---

### **4. Community Hot Topics**  
Top 5 most commented issues/PRs reflect deep user engagement around core functionality:

| Issue/PR | Link | Comments | Summary |
|--------|------|---------|--------|
| **#8417** [Bug]: Context compaction fails on Vulkan Engine (`glm-5.3-flash`) due to conflicting `thinking.type` params | [Issue #8417](https://github.com/agentscope-ai/QwenPaw/issues/8417) | 2 | Critical for users relying on third-party providers; impacts session continuity. |
| **#8405** [Bug]: MCP config modal won’t close when using HTTP/SSE | [Issue #8405](https://github.com/agentscope-ai/QwenPaw/issues/8405) | 5 | High-impact UI regression affecting workflow efficiency. |
| **#8312** [Bug]: Context length exceeded despite compaction | [Issue #8312](https://github.com/agentscope-ai/QwenPaw/issues/8312) | 4 | Reflects growing pressure on context window optimization. |
| **#8459** [Feature Request]: Easier access to unread push messages | [Issue #8459](https://github.com/agentscope-ai/QwenPaw/issues/8459) | 1 | Simple but high-value UX improvement for active users. |
| **#8444** [Feature]: Linux .deb/AppImage packaging | [PR #8444](https://github.com/agentscope-ai/QwenPaw/pull/8444) | N/A | Demonstrates demand for broader platform support. |

🔍 **Underlying Needs:** Users are pushing for *reliability in long-running sessions*, *better control over context and memory*, and *consistent cross-platform experience* — especially on Linux and Windows.

---

### **5. Bugs & Stability**  
**Critical Bugs Reported (Rank by Severity):**

1. **#8417** – Context compression fails silently due to incompatible `thinking.type` parameter injection → leads to permanent session degradation.  
   🛠️ **Fix PR:** Pending; currently unaddressed.
   
2. **#8405** – MCP configuration modal hangs when using HTTP/SSE → blocks workflow entirely.  
   🛠️ **Fix PR:** None yet; urgent UI fix needed.

3. **#8424** – `server/discover` returns 404 + JSON-RPC error, preventing fallback to legacy protocol → breaks compatibility with older MCP servers.  
   🛠️ **Fix PR:** None; may require protocol negotiation overhaul.

4. **#8290** – Media blocks cause session lock due to unmatched rejection messages → no recovery path.  
   🛠️ **Fix PR:** None; affects audio/video tooling heavily.

5. **#8361** – Automatic memory search triggers repeat calls, then fails to resume after interception → breaks task flow.  
   🛠️ **Fix PR:** [#8457](https://github.com/agentscope-ai/QwenPaw/pull/8457) addresses root cause (synthetic recall); confirmed working.

> ⚠️ **Stability Risk:** Multiple bugs affect **long-running agents**, **multi-tool workflows**, and **cross-server interoperability** — key concerns for production use.

---

### **6. Feature Requests & Roadmap Signals**  
High-demand features emerging from user feedback:

| Feature | Source | Priority Signal |
|-------|--------|----------------|
| **OAuth login for OpenAI / Codex** | [#1536](https://github.com/agentscope-ai/QwenPaw/issues/1536), [#4124](https://github.com/agentscope-ai/QwenPaw/issues/4124) | Repeated ask (5+ comments); indicates need for secure, scalable auth. |
| **Firecrawl as web_search provider** | [#8199](https://github.com/agentscope-ai/QwenPaw/issues/8199) | Already proposed by team; likely to be prioritized in v2.3. |
| **Realtime voice chat** | [#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785) | Large-scale feature with full implementation in progress. |
| **Nested skill directories** | [#8178](https://github.com/agentscope-ai/QwenPaw/pull/8178) | First-time contributor effort — signals growing need for modular skill organization. |
| **Linux native packages (.deb/AppImage)** | [#8444](https://github.com/agentscope-ai/QwenPaw/pull/8444) | Top priority for enterprise adoption. |

📌 **Prediction:** v2.3.0 will include **Firecrawl support**, **realtime voice**, **nested skills**, and **Linux packaging** — all signaled by active PRs and issue traction.

---

### **7. User Feedback Summary**  
Users report both satisfaction and frustration across key dimensions:

✅ **Satisfied With:**  
- Interactive HTML previews (restored in v2.3.0-beta.1).  
- Faster model addition via "Quick Add" button.  
- Clean documentation improvements (e.g., duplicate install steps removed).

❌ **Frustrated By:**  
- **Context overflow** even after compaction (#8312, #8417).  
- **Session crashes** after timeout or media errors (#7935, #8290).  
- **Windows-specific instability**: log rotation failure (#8185), file system conflicts (#8210), and installer diagnostics issues (#8455).  
- **Missing visual cues**: unread messages not easily accessible (#8459), making real-time collaboration harder.

> 📌 **Use Case Insight:** Users are deploying QwenPaw in **production-like environments** (long-lived agents, multiple tools, external APIs), which stresses stability and resilience.

---

### **8. Backlog Watch**  
These issues have remained open for weeks/months with high relevance and low resolution:

| Issue | Link | Status | Why It Matters |
|------|------|--------|---------------|
| **#5856** – Tool_call structure lost during context compaction | [Issue #5856](https://github.com/agentscope-ai/QwenPaw/issues/5856) | Closed (Cannot Reproduce) | Critical for tool reliability; unresolved risk in complex workflows. |
| **#2758** – Reasoning appears after final reply | [Issue #2758](https://github.com/agentscope-ai/QwenPaw/issues/2758) | Closed | Long-standing UI logic flaw impacting transparency. |
| **#7079** – Optional PowerContext long-term memory backend | [Issue #7079](https://github.com/agentscope-ai/QwenPaw/issues/7079) | Closed | Strong interest in pluggable memory systems; needs re-evaluation. |
| **#8412** – Audit DB stops recording per-agent tool calls despite `audit_level: all` | [Issue #8412](https://github.com/agentscope-ai/QwenPaw/issues/8412) | Open | Major compliance and governance concern for regulated use cases. |
| **#8406** – QQ channel enabled flag resets silently | [Issue #8406](https://github.com/agentscope-ai/QwenPaw/issues/8406) | Open | Minor UX but high impact on user trust and visibility. |

> 🔎 **Action Needed:** Maintainers should prioritize **#8412** (governance integrity) and **#8406** (user trust), and revisit **#5856** and **#7079** given evolving memory/tooling demands.

---

**Next Steps:** Monitor v2.3.0-beta.1 adoption; prepare for post-beta stabilization cycle. Focus on context management, audit logging, and cross-platform reliability.  
👉 **Project Health Score:** ⭐⭐⭐⭐☆ (4.5/5) — Active, innovative, but stability risks remain in edge cases.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-10-28**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active, with 22 new issues and 42 pull requests updated in the past 24 hours—indicating strong community engagement and rapid development momentum. A new release, **v0.8.7**, was issued as a security and maintenance update, addressing critical dependencies including Wasmtime, Rustls, `tokio`, and `ctutils`. The ecosystem is currently focused on improving identity access control, runtime stability, and cross-platform compatibility (especially Android), while preparing for the upcoming **v0.9.0** milestone. High-severity bugs related to OIDC, session persistence, and tool poisoning are being actively addressed.

---

### **2. Releases**  
- **[v0.8.7](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.7)** (Released: 2026-10-28)  
  - **Summary**: A security-focused patch release addressing vulnerabilities in key dependencies.  
  - **Key Changes**:  
    - Upgraded to patched versions of **Wasmtime**, **Rustls** (certificate verification), **`tokio`**, and **`ctutils`**.  
    - Rebuilt container images with updated base layers for improved security posture.  
    - Included 81 commits from 19 contributors.  
  - **Migration Notes**: No breaking changes reported. Users should upgrade immediately if using v0.8.6 or earlier.  
  - **Security Impact**: Resolves known advisories affecting v0.8.6; recommended for all deployments.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today)**:  
- **PR #12019** ([chore(docs): pin translations to v0.8.7](https://github.com/zeroclaw-labs/zeroclaw/pull/12019)) – Finalized translation catalogues for v0.8.7, ensuring consistency across localized documentation.  
- **PR #12079** ([chore(docs): pin translations to the v0.8.7 catalogue fixes](https://github.com/zeroclaw-labs/zeroclaw/pull/12079)) – Updated gitlink in `docs/book/po` to reflect v0.8.7 translations, stabilizing multilingual content.  

**Features Advanced**:  
- **PR #12073** ([fix(providers): retry Codex streams as streams](https://github.com/zeroclaw-labs/zeroclaw/pull/12073)) – Prevents rejection of fallback retries on default ChatGPT endpoints by preserving streaming mode.  
- **PR #12071** ([feat(zerocode): add /load-session](https://github.com/zeroclaw-labs/zeroclaw/pull/12071)) – Enables resuming sessions via name or UUID in ZeroCode, enhancing UX for developers.  
- **PR #12068** ([fix(security): stop treating bare semicolon/pipe as injection](https://github.com/zeroclaw-labs/zeroclaw/pull/12068)) – Reduces false positives in prompt guard, improving usability without compromising safety.  

---

### **4. Community Hot Topics**  
**Most Active Issues (by comments)**:  
- **Issue #7432** ([Tracker]: Runtime, dashboard sign-in and gateway delivery) – [21 comments](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)  
  - *Status*: Open, accepted, priority P2, linked to v0.9.0 roadmap.  
  - *Need*: End-to-end tracking of remaining components in the runtime and gateway stack—critical for v0.9.0 readiness.  

- **Issue #9101** ([Consolidate release attestation mechanisms](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)) – [11 comments](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)  
  - *Status*: Closed, but highlights long-standing CI inefficiencies.  
  - *Need*: Streamlined provenance model (from 53 assets down to ~20) to reduce overhead and improve trust in releases.  

**Top-Trending PRs (by discussion depth)**:  
- **PR #11921** ([feat(session): append-only session event history](https://github.com/zeroclaw-labs/zeroclaw/pull/11921)) – 35+ lines of change, foundational for replayability and auditability.  
- **PR #9745** ([fix(memory): per-agent attribution in knowledge graph](https://github.com/zeroclaw-labs/zeroclaw/pull/9745)) – Critical for security and ownership isolation; still open but heavily discussed.  

> 🔍 *Insight*: Community focus is shifting toward **trust, traceability, and resilience**—not just features. Audit trails, secure session handling, and reliable identity management dominate conversations.

---

### **5. Bugs & Stability**  
| Severity | Issue | Description | Fix PR? |
|---------|-------|-------------|--------|
| S1 | [#11517](https://github.com/zeroclaw-labs/zeroclaw/issues/11517) | Web chat drops prompt on reload due to localStorage hydration conflict | ❌ No fix yet |
| S1 | [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | MCP connection permanently poisoned after one recovery failure | ✅ **PR #12061** (in progress) |
| S1 | [#12075](https://github.com/zeroclaw-labs/zeroclaw/issues/12075) | Android shell tool fails due to EPERM on canonicalize | ✅ **PR #12080** (merged) |
| S2 | [#11913](https://github.com/zeroclaw-labs/zeroclaw/issues/11913) | Telegram command menu exposed to untrusted users (no scope) | ❌ No fix yet |
| S2 | [#12049](https://github.com/zeroclaw-labs/zeroclaw/issues/12049) | Four IPs can block sign-in by filling login store | ❌ No fix yet |
| S2 | [#12051](https://github.com/zeroclaw-labs/zeroclaw/issues/12051) | SOP workshop allows scoped user to write admin-level SOPs | ❌ No fix yet |

> ⚠️ **Critical Risk**: Multiple S1/S2 bugs involve **identity mismanagement**, **session state loss**, and **unauthorized access**—all pointing to a need for tighter access controls and better error recovery.

---

### **6. Feature Requests & Roadmap Signals**  
- **OIDC Sign-In for Dashboard** ([#11961](https://github.com/zeroclaw-labs/zeroclaw/issues/11961)) – High-priority feature for enterprise adoption. Currently only available via CLI.  
- **Session Resume via `/load-session`** ([#12069](https://github.com/zeroclaw-labs/zeroclaw/issues/12069)) – Already implemented in PR #12071; likely to ship in v0.9.0.  
- **Telegram Command Scope Enforcement** ([#11913](https://github.com/zeroclaw-labs/zeroclaw/issues/11913)) – Urgent for bot security in team environments.  
- **Support for Max Reasoning Effort** ([#10705](https://github.com/zeroclaw-labs/zeroclaw/issues/10705)) – Needed for advanced OpenAI models like GPT-6 Astra.  
- **Firecrawl Web Search Provider** ([#11680](https://github.com/zeroclaw-labs/zeroclaw/pull/11680)) – In review; indicates growing demand for external data sources.  

> 📌 *Prediction*: **v0.9.0** will prioritize **security hardening**, **identity access control**, and **enterprise-grade integrations** (OIDC, scoped bots, multi-provider tools).

---

### **7. User Feedback Summary**  
- **Pain Points**:  
  - **Session persistence failures** (web reloads lose state) — impacts productivity.  
  - **Android support broken** — native shell tools fail due to SELinux restrictions.  
  - **Overly aggressive prompt guards** — false positives flag valid syntax (e.g., semicolons).  
  - **Unintended privilege escalation** via SOPs and wildcard tools — a serious security concern.  
- **Satisfaction Signals**:  
  - Positive reception of **append-only session history** (PR #11921) — praised for enabling replayability.  
  - Appreciation for **multilingual docs fixes** in v0.8.7 — users report clearer guidance.  
- **Use Cases Highlighted**:  
  - Developers using ZeroCode need persistent sessions and easy resume.  
  - Ops teams managing multi-user environments want granular access control (OIDC, scoped commands).  

---

### **8. Backlog Watch**  
**Long-Unanswered, High-Impact Issues**:  
- **[#9745](https://github.com/zeroclaw-labs/zeroclaw/issues/9745)** – *fix(memory): per-agent attribution and scoping to knowledge graph*  
  - **Age**: 9 months | **Status**: Open | **Risk**: High | **Needs**: Maintainer triage  
  - *Why it matters*: Without agent-scoped knowledge graphs, multi-user systems risk data leakage and unauthorized access.  

- **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)** – *Runtime, dashboard sign-in and gateway delivery tracker*  
  - **Age**: 4 months | **Status**: Open | **Priority**: P2 | **Release**: v0.9.0  
  - *Why it matters*: This is the master roadmap tracker for v0.9.0. Delayed closure may delay the entire release.  

- **[#12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055)** – *MCP HTTP client has no pool/keep-alive control*  
  - **Age**: 1 day | **Status**: Open | **Severity**: S2  
  - *Why it matters*: Stale connections lead to outcome-unknown results—impacts reliability in production workflows.  

> ✅ **Action Requested**: Maintainers should prioritize triaging **#9745** and **#7432** to ensure v0.9.0 stays on track.

---

**Project Health Score**: ⭐⭐⭐⭐☆ (4.5/5)  
*Strong technical momentum, high-quality contributions, but urgent security and access control gaps require immediate attention.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*