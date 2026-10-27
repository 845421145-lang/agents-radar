# OpenClaw Ecosystem Digest 2026-10-27

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-27 01:35 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest**  
**Date:** 2026-10-27  
**Source:** GitHub (openclaw/openclaw)  

---

### **1. Today's Overview**  
The OpenClaw project remains highly active with **500 issues and 500 pull requests updated in the last 24 hours**, indicating sustained development momentum. A significant surge in issue activity—particularly around **Windows reliability, memory leaks, SQLite WAL corruption, and gateway startup failures**—signals ongoing stability challenges in production deployments. Despite no new releases, a strong focus on **core infrastructure fixes, performance optimization, and UI/UX polish** is evident in today’s PRs. The community is actively engaged in diagnosing critical path bugs, especially those impacting Windows users and high-load environments.

---

### **2. Releases**  
❌ **No new releases** were published in the last 24 hours.  
*Note: The most recent stable version remains 2026.10.5 (Oct 23), with beta builds (e.g., 2026.10.10-beta.3) still under scrutiny for upgrade reliability issues.*

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- **#185263**: Fixed OAuth token expiry warnings to prevent false sign-in prompts ([Link](https://github.com/openclaw/openclaw/pull/185263))  
- **#185292**: Resolved bug where saved Side chat comments required a second question to send ([Link](https://github.com/openclaw/openclaw/pull/185292))  
- **#185264**: Fixed sidebar spinners remaining left-aligned in ungrouped session lists ([Link](https://github.com/openclaw/openclaw/pull/185264))  
- **#185287**: Optimized prompt hook envelope allocation, reducing redundant object construction ([Link](https://github.com/openclaw/openclaw/pull/185287))  

🔧 **Key Advances:**  
- **Performance optimizations** in `gateway`, `control-ui`, and `plugins` layers (e.g., #184951, #185307, #185294).  
- **Test cleanup campaign** continues with 5+ low-value test removals (e.g., #185291, #185304, #185279).  
- **Infrastructure improvements**: PostgreSQL index rebuild concurrency (#185237), auth token handling in CLI commands (#185238).

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Comment Count & Severity:**  
1. **[P0] Agent SQLite WAL grows to 2.8 GB despite wal_autocheckpoint=1000 (Issue #143524)** – *139 comments*  
   - 🔗 [View Issue](https://github.com/openclaw/openclaw/issues/143524)  
   - **Need:** Immediate fix for persistent WAL growth on Windows; likely tied to transaction management or checkpointing logic failure.  
2. **[P0] Gateway blocks for minutes during large plugin capture (Issue #160959)** – *57 comments*  
   - 🔗 [View Issue](https://github.com/openclaw/openclaw/issues/160959)  
   - **Need:** Asynchronous processing of large plugin trees to prevent event loop stalls post-2026.9.6.  
3. **[P0] prepared-model-catalog.worker.js memory leak (~4–5 GB/hour) (Issue #159662)** – *26 comments*  
   - 🔗 [View Issue](https://github.com/openclaw/openclaw/issues/159662)  
   - **Need:** Leak detection and worker lifecycle cleanup independent of model provider or workload.  

💡 **Top PRs by Engagement:**  
- **#185250** (`fix(agents): stop runtime rebuild storms`) – Addresses auth cooldown cascades; critical for multi-user stability.  
- **#185291 / #185304** – Part of test cleanup initiative; reduces CI noise and improves build efficiency.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs Reported (P0/P1):**  
| Issue | Description | Impact | Fix PR? |
|------|-------------|--------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | Unbounded SQLite WAL growth (2.8 GB) on Windows | UX release blocker, crash loop | ❌ No |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | Minutes-long gateway hang during plugin capture (2026.9.6 regression) | Crash loop, user-facing delay | ❌ No |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | Memory leak in `prepared-model-catalog.worker.js` (~5 GB/hour) | Crash loop, resource exhaustion | ❌ No |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) | Windows restarts/updates fail due to schtasks permission errors | Update unreliability, client disconnects | ❌ No |

⚠️ **High-Impact Regressions:**  
- **[#182476](https://github.com/openclaw/openclaw/issues/182476)**: Windows `update repair` fails with `OPENCLAW_STATE_LEASE_LOST` — impacts update reliability.  
- **[#183786](https://github.com/openclaw/openclaw/issues/183786)**: Beta upgrade queries stopped PID indefinitely — stalls upgrade process.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Themes in User Requests:**  
- **Memory & Performance Optimization:**  
  - `memory-pressure-aware admission for sessions_spawn` (#161050) – signals demand for smarter resource governance.  
  - `reuse unchanged Code Mode store replay` (#185301) – reflects need for efficient state persistence.  
- **Cross-Platform Reliability:**  
  - **Windows-specific fixes** dominate: update repair, scheduled tasks, plugin shutdown, and service permissions.  
- **UI/UX Polish:**  
  - **Control UI WebChat** improvements: system-notice mirroring (#177094), approval panel dismissal (#144685), theme artwork rendering (#185229).  
- **Security & Policy Enforcement:**  
  - Host-wide pre-execution guard (#149024), explicit empty allowlist semantics, and secure `SecretRef` handling (#185238).  

🔮 **Likely Inclusion in Next Release:**  
- **Fixes for SQLite WAL, memory leaks, and Windows update stability** are top priorities.  
- **Optimized plugin loading** and **auth cooldown resilience** may be included in 2026.11.0.

---

### **7. User Feedback Summary**  
💬 **Real User Pain Points:**  
- **"Update failures on Windows are now the norm"** – multiple reports confirm that `update repair` and `schtasks`-managed installs fail consistently (#170956, #182476).  
- **"Gateway becomes unreachable after sleep/resume"** – common on laptops using `sleep`/`wake` cycles (#140010).  
- **"I lose context after crashes"** – agents permanently unavailable after recovery due to checkpoint expiration (#166634).  
- **"Sessions consume 30% more tokens than needed"** – bootstrap files re-injected every turn, wasting resources (#67419).  

✅ **Positive Feedback:**  
- Users appreciate **improved control over Codex image iteration** (#185068).  
- **Reduced UI flickering and spinner artifacts** (via #185264, #185144) are noted as quality-of-life wins.

---

### **8. Backlog Watch**  
⏳ **Long-Unanswered Critical Issues Needing Maintainer Attention:**  
| Issue | Age | Priority | Status | Link |
|------|-----|----------|--------|------|
| [#114414](https://github.com/openclaw/openclaw/issues/114414) | Over 3 months stale | P2 | Needs product decision | [Link](https://github.com/openclaw/openclaw/issues/114414) |
| [#128067](https://github.com/openclaw/openclaw/issues/128067) | 3 weeks old | P1 | Field report with 6 defect classes | [Link](https://github.com/openclaw/openclaw/issues/128067) |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) | 1.5 months old | P1 | CPU pegging after 2026.8.1 upgrade | [Link](https://github.com/openclaw/openclaw/issues/134993) |
| [#154517](https://github.com/openclaw/openclaw/issues/154517) | 2 months old | P2 | Session delete/archive returns `not_found` | [Link](https://github.com/openclaw/openclaw/issues/154517) |

🔍 **PRs Stuck in Review Queue:**  
- **#185024** (WIP: Launch at Login success reporting) – awaiting final visual/native review.  
- **#185238** (Auth token failure on PostgreSQL) – requires security review before merge.  
- **#185290** (Telegram audit clock drift) – waiting on author input.

---

> ✅ **Project Health Assessment:**  
> **Active but strained**. High contributor engagement masks deep stability concerns—especially on Windows and in high-memory/high-concurrency scenarios. While performance and UI refinements are progressing well, **critical P0 bugs remain unresolved**, and **release-blocking regressions are accumulating**. Immediate attention to WAL corruption, memory leaks, and update reliability is essential to maintain trust and adoption.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem (2026-10-27)**

---

### **1. Ecosystem Overview**

The open-source personal AI assistant and agent ecosystem in Q4 2026 is characterized by rapid evolution, divergent technical paths, and growing maturity in core capabilities—particularly around autonomy, session persistence, and cross-platform reliability. Projects like OpenClaw, Hermes Agent, and QwenPaw are advancing from foundational tooling toward production-grade agent orchestration, while ZeroClaw is positioning itself as a security-first platform for enterprise-integrated workflows. Despite strong community engagement across all projects, stability concerns—especially on Windows, in high-load scenarios, and around memory/resource management—are emerging as systemic challenges that threaten adoption beyond early adopters.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Release Status | Health Score (1–5) |
|--------|-------------------|----------------|----------------|--------------------|
| **OpenClaw** | 500 | 500 | ❌ No new release | ⭐⭐⭐☆☆ (3.2) |
| **Hermes Agent** | 50 | 50 | ❌ No new release | ⭐⭐⭐⭐☆ (4.0) |
| **QwenPaw** | 24 | 48 | ❌ No new release | ⭐⭐⭐⭐☆ (3.8) |
| **ZeroClaw** | 23 | 29 | ✅ v0.8.7 RC in review | ⭐⭐☆☆☆ (2.5) |
| **IronClaw** | 0 | 0 | — | ⭐☆☆☆☆ (1.0) |

> *Health Score: Based on activity velocity, bug severity, release cadence, and community trust signals (e.g., unresolved P0 issues, security vulnerabilities).*

---

### **3. OpenClaw's Position**

**Advantages vs Peers**:  
OpenClaw leads in **development velocity and contributor engagement**, with 500 issues and 500 PRs daily—a scale unmatched by other projects. Its focus on **core infrastructure stability** (SQLite WAL, memory leaks, gateway performance) positions it as the most mature platform for large-scale, persistent agent deployments. Unlike more feature-driven peers, OpenClaw prioritizes **system-level resilience**, making it a preferred choice for users demanding uptime and data integrity.

**Technical Approach Differences**:  
- Uses **SQLite WAL + transaction checkpointing** as a first-class abstraction, unlike QwenPaw’s reliance on external MCP servers.
- Employs **centralized control-ui and plugin lifecycle management**, contrasting with Hermes Agent’s decentralized delegation model.
- Has a **stronger CLI/CLI-first ethos**, with deep integration of `openclaw-cli` for diagnostics and repair—uncommon among its peers.

**Community Size Comparison**:  
OpenClaw has the largest active contributor base and issue volume, indicating **broader user adoption and visibility**. Its community is highly engaged in diagnosing edge cases (e.g., Windows update failures), suggesting a diverse, real-world deployment footprint—not just developer testing.

---

### **4. Shared Technical Focus Areas**

Across projects, the following **emerging technical requirements** reflect shared pain points and strategic priorities:

| Requirement | Projects Affected | Specific Needs |
|-----------|------------------|----------------|
| **Memory & Resource Leak Prevention** | OpenClaw, QwenPaw, ZeroClaw | Fix worker.js leaks (~5 GB/hour), prevent task exhaustion, handle cancellation safely |
| **Session Persistence & Resume Reliability** | OpenClaw, Hermes Agent, ZeroClaw | Restore remote sessions post-restart; avoid context loss after crashes or sleep |
| **Cross-Platform Stability (Windows)** | OpenClaw, QwenPaw, Hermes Agent | Fix `schtasks`, `update repair`, file permission errors, service startup failures |
| **Protocol Resilience & Fallback Logic** | QwenPaw, OpenClaw | Graceful handling of `404 + JSON-RPC -32601`, legacy MCP server compatibility |
| **Admission Control & Concurrency Safety** | Hermes Agent, ZeroClaw | Prevent `admission_conflict` loops, fix rate-limiting deadlocks, secure RPC access |
| **Config Transparency & Behavioral Predictability** | ZeroClaw, OpenClaw | Address inert config keys (`context_compression.*`) that appear to do nothing |

> These patterns indicate a shift from “feature-rich” development to **trust-by-design engineering**—where predictability, recovery, and resource safety are now top-tier concerns.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | QwenPaw | ZeroClaw |
|--------|----------|--------------|---------|----------|
| **Target User** | DevOps, power users, enterprise systems | Teams, automation engineers, Discord/Telegram bots | Developers, Linux users, plugin creators | Security teams, SaaS integrators, regulated environments |
| **Feature Focus** | Core infrastructure, stability, CLI tooling | Delegation, orchestration, workflow resilience | Cross-platform desktop parity, plugin extensibility | IAM, OIDC, RBAC, auditability |
| **Architecture** | Monorepo with centralized gateways | Decentralized subagents, event-driven coordination | Tauri-based desktop app, modular tools | Microservices with strict identity boundaries |
| **Primary Strength** | High-load, long-running agent reliability | Team collaboration & automation durability | Desktop UX and Linux support | Security-hardened production readiness |

> This divergence reflects a maturing ecosystem: **OpenClaw = foundation layer**, **Hermes = workflow engine**, **QwenPaw = desktop experience**, **ZeroClaw = compliance layer**.

---

### **6. Community Momentum & Maturity**

- **Rapid Iteration Tier (High Velocity, High Risk)**:  
  - **OpenClaw**: Highest activity; fast-moving fixes but accumulating P0 bugs.  
  - **ZeroClaw**: Rapid feature progression (v0.9.0 roadmap), but exposed to critical security flaws.  
  - **QwenPaw**: Strong momentum in Linux support and protocol robustness—onboarding developers at scale.

- **Stabilization Phase (Focus on Quality, Pre-Release)**:  
  - **Hermes Agent**: Quiet but focused refinement ahead of v0.23. Stable core with clear roadmap alignment.  
  - **IronClaw**: Dormant—no activity suggests either stagnation or reorganization.

> **Maturity Signal**: Projects with **high issue-to-PR ratios (>1:1)** and **recurring regressions** (e.g., OpenClaw’s WAL growth) are still in **"stability debt" phase**. Those with **consistent small improvements and stable CI pipelines** (e.g., Hermes Agent) are transitioning into **production-readiness mode**.

---

### **7. Trend Signals**

1. **From Feature Expansion to Trust Engineering**  
   > Feedback like *"I configured everything to reduce context load, but nothing changed"* (ZeroClaw) and *"Gateway becomes unreachable after sleep/resume"* (OpenClaw) signal a market shift: **users no longer accept "magic" defaults**. They demand **config transparency, predictable behavior, and failure recovery**—a hallmark of professional-grade software.

2. **Desktop Parity as a Market Entry Barrier**  
   > The surge in Linux packaging requests (#8444 in QwenPaw, #12041 in ZeroClaw) shows that **native desktop apps are essential** for mainstream adoption. Projects without `.deb`, `.AppImage`, or native installer support will struggle to gain traction beyond CLI-savvy users.

3. **Security as a Competitive Moat**  
   > ZeroClaw’s 7+ S2 security issues in 48 hours highlight that **security is no longer optional**—it’s a differentiation point. External audits (e.g., Hlido) are becoming de facto trust signals, and projects ignoring them risk reputational damage.

4. **Agent Autonomy Requires Systemic Support**  
   > Features like **proactive context compaction**, **token-aware admission**, and **execution epochs (Goal V1)** show that **autonomous agents need underlying system guarantees**—not just better prompts. This implies a future where **agent platforms must provide OS-like abstractions** (memory, scheduling, persistence).

5. **Developer Experience (DX) Is Now a Core Metric**  
   > Silent failures (e.g., embedding reindexing silently failing), misleading error messages (`invalid_params`), and broken plugins are cited as top frustrations. **DX is no longer a nice-to-have—it’s a survival factor**.

---

### ✅ **Conclusion for Developers & Decision-Makers**

- **Choose OpenClaw** if you need a **stable, high-throughput agent backbone**—but expect to manage stability trade-offs.
- **Choose Hermes Agent** for **team-based automation and workflow orchestration**—with strong delegation features and growing reliability.
- **Choose QwenPaw** for **Linux-native, plugin-extensible desktop experiences**—ideal for developers seeking full desktop parity.
- **Choose ZeroClaw** only for **security-critical, regulated environments**—but only after validating its IAM model through independent audit.

> **Emerging Pattern**: The next wave of innovation will not be in LLM prompting—but in **agent system engineering**: memory governance, identity enforcement, and silent failure recovery. Projects that invest here will lead the next cycle.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-10-27**

---

## **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 new issues and 50 pull requests updated in the past 24 hours—indicating robust community engagement and ongoing development momentum. No new releases were published, suggesting a focus on stabilization and feature refinement ahead of a potential v0.23 release. The issue tracker is dominated by critical session management, authentication, and platform-specific bugs (especially Discord, Telegram, and Mattermost), while PRs highlight improvements to delegation, subagent lifecycle, and security hardening. Overall, the project shows strong health: high contributor velocity, focused bug triage, and strategic feature work advancing.

---

## **2. Releases**  
*No new releases were published today.*  
There are currently no version updates or changelogs available. The last stable release remains at **v0.22.5**, which continues to be referenced in multiple open issues. Maintainers appear to be prioritizing pre-release stability and integration testing before a formal update.

---

## **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #145106** ([fix(webapp): plain-HTTP sends and copies...](https://github.com/NousResearch/hermes-agent/pull/145106)) – Security fix for browser-originated content exposure; salvaged from prior work.  
- ✅ **PR #75981** ([fix(projects): reject create when primary_path already owns a project](https://github.com/NousResearch/hermes-agent/pull/75981)) – Resolves duplicate project creation due to missing path uniqueness enforcement.  
- ✅ **PR #41043** ([fix(cli): bust update-check cache when local HEAD moves](https://github.com/NousResearch/hermes-agent/pull/41043)) – Fixes stale "N commits behind" warnings after manual git updates.  

**Key Advancements:**  
- **Delegation & Orchestration**: PRs like #145317 (`feat(kanban): orchestrators can reclaim a running card`) and #145316 (`feat(delegation): look up a finished delegation by id`) signal growing maturity in agent coordination workflows.  
- **Security Hardening**: Multiple PRs (e.g., #145310, #145106) tighten access control around A2A, webapp, and token handling—critical for production deployments.  
- **Model & Tooling Improvements**: PR #145309 fixes misclassification of SGLang endpoints as Ollama; #145307 improves vision fallback logic.

---

## **4. Community Hot Topics**  
Top community concerns center on **session persistence**, **platform reliability**, and **delegation usability**:

- 🔥 **Issue #139818** – *Remote-backend desktop sessions are unresumable* ([link](https://github.com/NousResearch/hermes-agent/issues/139818)): 22 comments, P2 severity. Users report conversations lost after gateway restarts, especially when using `--isolated` mode. This is a **critical UX blocker** for remote deployment users.  
- 🔥 **Issue #143720** – *Discord thread process-completion wake refused admission_conflict every 60s* ([link](https://github.com/NousResearch/hermes-agent/issues/143720)): 6 comments, P2. Persistent refusal leads to infinite retry loops—high impact on automation reliability.  
- 🔥 **PR #145317** – *Orchestrators can reclaim a running card* ([link](https://github.com/NousResearch/hermes-agent/pull/145317)): High visibility; addresses team workflow needs where agents cannot stop running tasks. Expected to be a top candidate for v0.23.  
- 🔥 **Issue #145261** – *Watch-pattern completion injections always refused with admission_conflict* ([link](https://github.com/NousResearch/hermes-agent/issues/145261)): 4 comments, 2,641 log entries in one day—shows systemic failure in multiplexed Discord sessions.

> **Underlying Need**: Teams want **predictable, resilient automation** across platforms (Discord, Telegram, Webhooks) with **clear ownership and recovery paths** for long-running tasks.

---

## **5. Bugs & Stability**  
Critical bugs reported today fall into three categories:

| Severity | Issue | Description | Fix PR? |
|--------|------|-------------|--------|
| 🚨 **P2** | #139818 | Remote desktop sessions fail to resume post-restart | ❌ No fix yet |
| 🚨 **P2** | #143720 | Discord thread completions blocked every 60s | ❌ No fix yet |
| 🚨 **P2** | #145286 | CLI misreports `invalid_params` instead of showing real error | ❌ No fix yet |
| 🚨 **P2** | #145292 | MCP transport teardown hangs server loop forever | ❌ No fix yet |
| ⚠️ **P3** | #145314 | Quiet cron jobs leave empty sessions | ✅ [PR #145314](https://github.com/NousResearch/hermes-agent/pull/145314) opened (1 comment) |

> **Stability Note**: Several P2 bugs relate to **admission control failures** and **resource leaks** (e.g., hanging transports). These suggest deeper issues in session lifecycle and concurrency handling—urgent for v0.23.

---

## **6. Feature Requests & Roadmap Signals**  
User-driven feature requests reveal clear roadmap priorities:

- ✅ **Enhanced Delegation & Orchestration**  
  - #145317 (reclaim running cards) – Directly addresses team collaboration pain points.  
  - #145316 (lookup finished delegations) – Critical for auditability and debugging.  
  > *Prediction*: These will likely ship in **v0.23** as core Kanban/Agent orchestration features.

- ✅ **Platform-Specific Flexibility**  
  - #145312 (Mattermost free-thread responses) – Fills gap in bot behavior; user wants less rigid mention gating.  
  - #136614 (Kanban notify subscriptions: event kind filtering) – Allows granular control over agent wakes; highly requested.

- ✅ **Improved Tooling & Local Experience**  
  - #145311 (Google Workspace free/busy check) – Enables scheduling agents without manual calendar scraping.  
  - #85041 (local TTS optimization playbook) – Shows demand for performance tuning guides for edge cases.

> **Roadmap Signal**: Focus is shifting toward **production-grade autonomy**, **multi-agent coordination**, and **platform-native integration**.

---

## **7. User Feedback Summary**  
Real-world user pain points emerge clearly:

- **Discord Automation Breakage**: Users report automated threads being permanently blocked due to `admission_conflict`, rendering bots ineffective for group workflows.
- **Session Persistence Loss**: Remote users lose context after restarts—especially problematic for headless servers and isolated environments.
- **CLI Misleading Errors**: `invalid_params` messages hide root causes (e.g., label mismatches), slowing debugging.
- **File Drop Failures**: Desktop app fails to attach files to messaging-platform sessions despite UI enabling it—suggests permission model gaps.
- **Cron Job Cleanup Issues**: Silent accumulation of empty sessions harms data hygiene.

> **Satisfaction Level**: Mixed. Core functionality works, but **automation reliability and error transparency** are major friction points. Users appreciate feature depth but expect more stability.

---

## **8. Backlog Watch**  
Several high-impact issues remain unresolved or under discussion:

- 🟡 **Issue #133212** – *subagent_lifecycle v1.1 for plugin orchestrators* ([link](https://github.com/NousResearch/hermes-agent/issues/133212)): 8 comments, P2, needs-decision. Critical for plugin extensibility but stalled on design. **Needs maintainer attention**.  
- 🟡 **Issue #105758** – *Lifecycle guard blocks Node.js CLIs* ([link](https://github.com/NousResearch/hermes-agent/issues/105758)): 15 comments, P3. False positives disrupt toolchains—requires architectural clarity.  
- 🟡 **Issue #119529** – *web_extract fails on fresh installs* ([link](https://github.com/NousResearch/hermes-agent/issues/119529)): 4 comments, P2. Common first-time user hurdle—should be fixed in next release.  
- 🟡 **PR #131461** – *fix(approvals): two bugs that bypass human-in-the-loop* ([link](https://github.com/NousResearch/hermes-agent/pull/131461)): CI stuck with `action_required`—requires maintainer approval to proceed.  

> **Action Required**: Maintainers should prioritize reviewing and approving PRs with pending CI status and address long-standing P2 issues affecting usability.

---

### ✅ **Summary**  
Hermes Agent is in a **high-growth, high-stability phase** with strong community contributions. While no new releases exist, the project is actively refining core capabilities—especially in **automation reliability**, **security**, and **agent coordination**. Immediate focus should be on resolving **P2 session and admission control bugs**, approving **pending PRs**, and stabilizing the **next release cycle**. With the right triage, v0.23 could become a landmark release for production-grade AI agents.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-10-27**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active with a strong momentum in both issue and pull request activity: **24 new issues** and **48 PRs updated in the last 24 hours**, indicating robust community engagement and ongoing development. No new releases were published, suggesting the team is prioritizing feature integration and stability fixes ahead of a potential update cycle. The project shows signs of maturing into a production-grade AI agent platform, with deep focus on memory management, cross-platform desktop parity, and plugin extensibility—especially for Linux users and enterprise workflows.

---

### **2. Releases**  
❌ **No new releases** detected in the past 24 hours.  
The latest stable version remains **v2.2.2.post1**, with recent beta builds like `2.2.2b4` and `2.2.3b1` still in use. Users are advised to monitor the [GitHub Releases](https://github.com/agentscope-ai/QwenPaw/releases) page for upcoming updates, particularly around MCP protocol compatibility and Linux support.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
Several critical fixes and enhancements were merged or closed today:
- **PR #8445** ([fix(mcp): fall back when discover returns HTTP 404 and -32601](https://github.com/agentscope-ai/QwenPaw/pull/8445)) — Enables legacy MCP server fallback by handling `404 + JSON-RPC -32601` responses gracefully.
- **PR #8441** ([fix(tools): cancel owned task on outer cancellation](https://github.com/agentscope-ai/QwenPaw/pull/8441)) — Resolves dangling tasks after cancellation, improving resource safety.
- **PR #8446** ([fix(utils): bound atomic temp file basename](https://github.com/agentscope-ai/QwenPaw/pull/8446)) — Fixes long-filename crashes during atomic file operations.
- **PR #8165** ([fix(providers): recover Responses output sent only on terminal event](https://github.com/agentscope-ai/QwenPaw/pull/8165)) — Addresses stream parsing for providers that emit output only at completion.

These PRs collectively improve **protocol resilience, stability under edge cases, and filesystem safety**.

---

### **4. Community Hot Topics**  
🔥 **Most Active Issues & PRs (by comments/reactions):**

| Issue/PR | Title | Activity | Link |
|--------|------|---------|------|
| **Issue #8071** | [Feature]: Plugin-facing theme extension point (semantic token override layer) | 12 comments | [Link](https://github.com/agentscope-ai/QwenPaw/issues/8071) |
| **PR #8444** | feat(desktop): add Linux deb and AppImage packaging to the Tauri build | 0 comments (but high impact) | [Link](https://github.com/agentscope-ai/QwenPaw/pull/8444) |
| **Issue #8424** | server/discover returns 404 + JSON-RPC -32601 → hard failure, no legacy fallback | 3 comments | [Link](https://github.com/agentscope-ai/QwenPaw/issues/8424) |
| **Issue #8417** | Context compression fails due to unsupported `thinking.type=disabled` on Vulkan Engine | 2 comments | [Link](https://github.com/agentscope-ai/QwenPaw/issues/8417) |

🔍 **Analysis:**  
- **Theme customization** (#8071) reflects growing demand for **plugin-level UI control**, signaling a shift toward modular, extensible design.
- **Linux desktop support** (#8444) is a **critical gap**—the community is pushing for full desktop parity, especially for developers using Wayland and native app integrations.
- **Protocol interoperability** (#8424, #8417) highlights challenges in maintaining backward compatibility with legacy MCP servers and provider-specific quirks.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs Reported (Ranked by Severity):**

| Bug | Summary | Severity | Fix PR? |
|-----|--------|----------|--------|
| **Issue #8424** | `server/discover` returns 404 + `-32601` → hard-fails, prevents legacy fallback | 🔴 High | ✅ Yes (`PR #8445`) |
| **Issue #8417** | Context compression fails due to incompatible `thinking.type=disabled` | 🔴 High | ❌ Not yet |
| **Issue #8439** | `cancellable_wait` leaves owned task running after cancellation | 🟡 Medium | ✅ Yes (`PR #8441`) |
| **Issue #8435** | LLM stream hangs indefinitely if rate-limiter semaphore never releases | 🟡 Medium | ❌ Not yet |
| **Issue #8040** | Embedding reindex fails silently on CJK chunk over token limit | 🟡 Medium | ✅ Partial fix (`PR #8062`) |

📌 **Note:** Several bugs relate to **long-running processes** (e.g., ReMe watchers exhausting threads), **streaming logic**, and **resource leaks**—indicating stress testing under heavy workloads is needed.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Top User-Requested Features (Predicted for v2.3+):**

| Feature | Rationale | Predicted In |
|--------|-----------|--------------|
| **Linux `.deb` + `.AppImage` support** ([#8442](https://github.com/agentscope-ai/QwenPaw/issues/8442)) | High demand from developers; currently only Windows/macOS supported | v2.3 |
| **Plugin-facing theme system** ([#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)) | Enables rich, consistent plugin UIs — key for ecosystem growth | v2.3 |
| **Support `thinking_level` in cron jobs** ([#8439](https://github.com/agentscope-ai/QwenPaw/issues/8439)) | Allows cost-efficient automation without rebuilding agents | v2.3 |
| **"Open with default app" for files** ([#8420](https://github.com/agentscope-ai/QwenPaw/issues/8420)) | Improves UX for binary files (docx/xlsx/etc.) | v2.3 |
| **Local ChatGPT subscription sign-in** ([#8437](https://github.com/agentscope-ai/QwenPaw/pull/8437)) | Reduces dependency on API keys for personal use | v2.3 |

💡 These signals suggest a **clear roadmap shift**: from core agent functionality to **platform maturity, cross-environment support, and user-centric UX**.

---

### **7. User Feedback Summary**  
🗣️ **Real Pain Points from Users:**
- **“Plugins break startup”** — A persistent bug (#4946) causes 6+ minute freezes when a plugin has missing deps, making the app unusable.
- **“Context length exceeded”** — Frequent failures in `codemode-flash` due to poor compaction logic, especially in long-running sessions (#8312).
- **“Windows ZIPs show garbled text”** — Encoding issues in ZIP extraction lead to corrupted skill imports (#8270).
- **“Cron tasks run twice”** — Misfire grace window misbehavior causes duplicate backups (#7476).
- **“Mail monitor fails with full address”** — `name@domain@domain` error breaks IMAP login for pre-configured accounts (#8425).

🛠️ **User Satisfaction Indicators:**  
Positive feedback on **MCP integration**, **ReMe memory**, and **customizable tools**, but frustration grows with **stability under load**, **cross-platform consistency**, and **error transparency**.

---

### **8. Backlog Watch**  
👀 **Long-Unanswered, High-Impact Issues Needing Attention:**

| Issue | Status | Why It Matters | Link |
|------|--------|----------------|------|
| **Issue #8040** | Open since Sep 30 | Recurrence of a known embedding bug; silently drops chunks → data loss risk | [Link](https://github.com/agentscope-ai/QwenPaw/issues/8040) |
| **Issue #8123** | Open since Oct 8 | Daily Paper job fails silently on truncation → no retry, whole job marked as failed | [Link](https://github.com/agentscope-ai/QwenPaw/issues/8123) |
| **Issue #8405** | Open since Oct 23 | MCP config popup won’t close on HTTP/SSE → blocks workflow | [Link](https://github.com/agentscope-ai/QwenPaw/issues/8405) |
| **Issue #8276** | Open since Oct 16 | Reranker accepts empty `api_key` → fails with "unexpected error" | [Link](https://github.com/agentscope-ai/QwenPaw/issues/8276) |
| **Issue #8435** | Open since Oct 26 | Stream hangs forever if rate limiter locks — silent failure | [Link](https://github.com/agentscope-ai/QwenPaw/issues/8435) |

📌 **Urgent Note:** These issues represent **silent data loss, workflow disruption, and user trust erosion**. Prioritization is recommended before next release.

---

✅ **Final Assessment:**  
QwenPaw is **healthy, active, and evolving rapidly**. With strong community contributions and a clear path toward desktop parity, protocol robustness, and developer empowerment, it’s positioning itself as a leading open-source AI agent platform. Immediate focus should be on **bug triage, stability fixes, and Linux support** to unlock broader adoption.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-10-27  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **23 open issues** and **29 open pull requests** updated in the last 24 hours—indicating robust developer engagement and a fast-moving development cycle. A significant focus is on **security hardening**, particularly around identity access control (IAM), RPC authorization, and OIDC flows, with multiple high-risk PRs and issues reported today. The community is actively shaping the next major release (v0.9.0), as evidenced by feature proposals and security gatekeeping PRs. Despite no new releases, momentum is building toward a stable v0.8.7 patch and an upcoming v0.9.0 milestone.

---

### **2. Releases**

> ❌ **No new releases** were published in the last 24 hours or since the previous version (v0.8.5).  
> ✅ **Release candidate v0.8.7** is under active review and preparation:
> - PR #12019 (`chore(docs): pin translations to v0.8.7`) confirms documentation alignment for the upcoming release.
> - Security fixes from PRs like #12040 (#11562) are likely candidates for inclusion in v0.8.7.
> - No breaking changes have been announced; migration notes will be provided upon release.

🔗 [PR #12019 – Pin docs translations to v0.8.7](https://github.com/zeroclaw-labs/zeroclaw/pull/12019)

---

### **3. Project Progress**

#### ✅ **Merged/Closed PRs (Today)**:  
None — all 29 PRs remain open, but several are in advanced stages of review:

#### 🔧 **Key Features & Fixes Advanced Today**:
- **Security Hardening**: Multiple critical IAM improvements were proposed:
  - PR #11965: Opt-in OIDC dashboard sign-in (core to v0.9.0)
  - PR #11986: Scoped dashboard chat via core (stacked on prior auth work)
  - PR #11289: Stable denial reason identifiers for RPC
  - PR #11326: Refuse persisted log reads for scoped principals
- **System Prompt Enforcement**: PR #11910 enforces `max_system_prompt_chars` as a hard gate (fail closed), fixing a long-standing advisory-only behavior.
- **Tooling & Stability**:
  - PR #12040: Fixes plugin manifest mispairing during updates (critical for integrity).
  - PR #11651: Improves Telegram rate-limit handling via shared flood gate.
  - PR #11601: Corrects voice transcription retry logic to avoid head-of-line blocking.

---

### **4. Community Hot Topics**

| Issue/PR | Activity | Summary | Link |
|--------|---------|--------|------|
| **Issue #12042** – Independent review by Hlido (79/100) | 1 comment, zero reactions | High-profile external audit highlights project maturity and trustworthiness. Users are now assessing ZeroClaw’s real-world agent performance via MCP/JSON. | [Issue #12042](https://github.com/zeroclaw-labs/zeroclaw/issues/12042) |
| **PR #11965** – OIDC dashboard sign-in | 0 comments, 0 likes | Core to v0.9.0 roadmap. Community expects this to enable enterprise-grade authentication without pairing codes. | [PR #11965](https://github.com/zeroclaw-labs/zeroclaw/pull/11965) |
| **Issue #10780** – Restore proactive token-budget context compaction | 4 comments, 0 likes | High-priority runtime issue. Users report degraded performance due to missing token-aware trimming. Already accepted and in progress. | [Issue #10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) |

🔍 **Underlying Need**: Users demand **predictable, secure, and scalable autonomy**—especially around identity, memory efficiency, and session persistence. External validation (Hlido) signals growing interest from other AI agents and integrators.

---

### **5. Bugs & Stability**

| Issue | Severity | Affected Component | Status | Fix PR? |
|------|----------|-------------------|--------|--------|
| **#12053** – Unpinned third-party script on `/api/docs` | S2 | Gateway / Web UI | Open | ❌ |
| **#12052** – X-Forwarded-For abuse via appending proxy | S2 | Gateway / Security | Open | ❌ |
| **#12051** – SOP workshop allows privilege escalation | S2 | Runtime / Security | Open | ❌ |
| **#12050** – OIDC login CSRF vulnerability | S2 | Gateway / Auth | Open | ❌ |
| **#12049** – Sign-in flow store exhaustion | S2 | Gateway / Auth | Open | ❌ |
| **#12047** – OIDC bearer verification lacks rate limiting | S2 | Gateway / Auth | Open | ❌ |
| **#12046** – Wildcard tool selectors allow privileged tools | S2 | Runtime / Security | Open | ❌ |
| **#12045** – Response body buffering before size cap | S2 | Channel / Tools | Open | ❌ |
| **#12043** – `glob_search` silently drops authorized matches | S2 | Security / Sandbox | Open | ❌ |
| **#11711** – Permanent deletion of old turns after trim | S2 | Session Persistence | Open | ❌ |

📌 **Trend**: A surge of **high-severity security vulnerabilities (S2–S3)** related to **identity access control, session persistence, and input validation** has emerged in the last 48 hours. These are not isolated bugs—they indicate deeper systemic risks in the current IAM model.

---

### **6. Feature Requests & Roadmap Signals**

| Request | Priority | Key Components | Predicted Release |
|-------|---------|----------------|------------------|
| **#12022** – Opt-in external rerank stage for memory recall | P2 | Memory / Reranking | v0.9.0 |
| **#12054** – Honor runtime-profile thinking levels for OpenAI | P1 | Provider / Agent | v0.9.0 |
| **#11013** – Unified file intake/resolver/delivery | P2 | File System / Channels | v0.9.0 |
| **#12041** – Gitea/Forgejo parity with GitHub | P2 | Git Forge Support | v0.8.7 or v0.9.0 |
| **#11882** – Supervise execution epochs (Goal V1) | P1 | Agent Architecture | v0.9.0 |

🔍 **Roadmap Signal**: The team is shifting toward **agent-level orchestration** (Goal V1) and **cross-channel consistency** (file, git, email). External reranking and thinking level tuning suggest deeper integration with LLM providers beyond basic API calls.

---

### **7. User Feedback Summary**

Users report:
- **Frustration with config inertia**: Many users set `context_compression.*`, `keep_recent`, etc., expecting reduced token usage—but these settings do nothing (Issue #10781). This leads to confusion and wasted effort.
- **Session data loss anxiety**: Trimming long conversations permanently deletes older turns (Issue #11711), raising concerns about auditability and recovery.
- **Security skepticism**: With 7+ critical IAM flaws reported in one day, users are questioning the readiness of production deployments despite "fast and small" claims.
- **Positive sentiment toward extensibility**: The addition of XMPP (PR #11847) and inbound-only email (PR #12003) shows strong support for flexible communication channels.

💬 *"I configured everything to reduce context load, but nothing changed. I don’t know what’s working."* — User on Issue #10781

---

### **8. Backlog Watch**

| Issue | Age | Priority | Status | Notes |
|------|-----|----------|--------|-------|
| **#10780** – Restore proactive token-budget context compaction | 1.5 months | P1 | In-progress | Critical for scaling; already accepted |
| **#10781** – Remove or implement inert config keys | 1.5 months | P2 | Accepted | Must be addressed before v0.9.0 |
| **#11013** – Unified file intake tracker | 1 month | P2 | Accepted | Implementation batch tracker; needs follow-through |
| **#12042** – Hlido review (79/100) | 1 day | P1 | Open | Right of reply open—maintainers should respond to feedback |
| **#11882** – Goal V1 proposal (Execution Epochs) | 1 week | P1 | Draft (FAIL) | Needs formal review; currently stalled |

⚠️ **Action Required**: Maintainers must prioritize resolving **inert config keys (Issue #10781)** and **proactive context compaction (Issue #10780)**—these directly impact user trust and performance. The Hlido review (Issue #12042) also demands a public response to maintain credibility.

---

### ✅ **Final Assessment**

**Project Health**: ⚠️ **High Activity, Medium Risk**  
ZeroClaw is in a **critical growth phase**—innovative features are being developed rapidly, but a wave of security issues suggests **overcommitment to roadmaps without adequate safety testing**. The team must balance velocity with stability, especially ahead of v0.9.0.

**Recommendation**: Prioritize **security triage**, address **config inertia**, and **respond publicly to Hlido review** to rebuild trust. The foundation is strong—but the surface is showing cracks.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*