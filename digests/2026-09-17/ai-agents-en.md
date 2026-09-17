# OpenClaw Ecosystem Digest 2026-09-17

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-17 00:50 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-09-17**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active with a surge of 500 issues and 500 pull requests updated in the past 24 hours, indicating intense development and user-driven troubleshooting. The ecosystem is under significant strain due to multiple critical stability regressions—particularly around memory leaks, zombie process accumulation, and update failures across Windows, Linux, and macOS. Despite no new releases, the momentum in PRs suggests imminent patching activity, especially for high-severity bugs impacting production deployments. Community engagement is strong, but maintenance overhead is rising as core infrastructure (gateway, session lifecycle, plugin system) faces deep architectural challenges.

---

### **2. Releases**  
**None**  
No new releases were published today. The most recent stable version remains **2026.9.3**, which has triggered a cascade of update and migration failures (see Issue #145252, #146394, #148681). The absence of a release update increases urgency for the team to stabilize the current state before rolling out 2026.9.4.

---

### **3. Project Progress**  
**Merged/Closed PRs:** None reported in the last 24h.  
**Key Progress:**  
- **Refactoring Momentum:** A wave of `refactor(...)` PRs (e.g., #150415, #150405, #150413, #150411, #150412) from RomneyDa is centralizing contracts by deriving them from schema definitions—aimed at eliminating drift between configuration, runtime, and validation layers. This signals a long-term effort to improve code maintainability and reduce regression risk.  
- **Performance & Stability Fixes:** Several PRs focus on reducing CPU load (#149533), improving session list efficiency (#150196), and fixing plugin installation UX (#150234, #150235). These address performance bottlenecks reported in high-scale deployments.  
- **Update Reliability:** PRs like #150365 and #145169 are tackling persistent failure modes during update rollback and data preservation, directly responding to widespread user frustration.

---

### **4. Community Hot Topics**  
Top 5 most commented/engaged items reflect systemic instability:

| Issue | Comments | Severity | Link |
|------|---------|----------|------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 30 | 🦞 Diamond Lobster (P0) | Zombie child processes causing crash loops |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 25 | 🦞 Diamond Lobster (P1) | Memory leak from 350MB → 15.5GB, OOM crashes |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 24 | 🦞 Diamond Lobster (P1) | MCP server init timeout crashes gateway via unhandled rejection |
| [#111897](https://github.com/openclaw/openclaw/issues/111897) | 19 | 🦪 Silver Shellfish (P1) | Duplicate replies under load due to race in session lane dispatch |
| [#150201](https://github.com/openclaw/openclaw/issues/150201) | 14 | 🦞 Diamond Lobster (P0) | Windows update fails due to unexpanded `$OPENCLAW_STATE_DIR` |

> **Analysis:** The top issues center on **gateway stability**, **resource exhaustion**, and **update reliability**. Users are reporting catastrophic failures in production environments—especially on Windows and ARM64 devices. The recurring theme is that *reliability is being sacrificed for feature velocity*, leading to urgent demand for stabilization.

---

### **5. Bugs & Stability**  
High-priority bugs reported today include:

| Bug | Impact | Severity | Fix PR? | Link |
|-----|--------|----------|---------|------|
| Gateway memory leak (RSS 350MB → 15.5GB) | OOM crashes, restart loops | 🦞 Diamond Lobster (P1) | ❌ No | [Issue #91588](https://github.com/openclaw/openclaw/issues/91588) |
| Child process zombies from hooks/tools | Runtime degradation, eventual hang | 🦞 Diamond Lobster (P1) | ❌ No | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) |
| MCP server init timeout crashes gateway | Unhandled promise rejection | 🦞 Diamond Lobster (P1) | ❌ No | [Issue #144911](https://github.com/openclaw/openclaw/issues/144911) |
| Update fails on Windows: `mkdir` with unexpanded path | Blocker for upgrades | 🦞 Diamond Lobster (P0) | ❌ No | [Issue #146719](https://github.com/openclaw/openclaw/issues/146719) |
| Session lane duplicates replies under load | Message loss/duplication | 🦪 Silver Shellfish (P1) | ❌ No | [Issue #111897](https://github.com/openclaw/openclaw/issues/111897) |

> **Critical Note:** All P0/P1 bugs lack merged fixes. The lack of resolution despite high community attention indicates a backlog bottleneck or prioritization delay.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging trends suggest roadmap priorities:

- **Enhanced Plugin UX:** Multiple PRs (#150234, #150235, #149331) focus on simplifying plugin installation, grouping settings, and showing progress spinners—indicating users struggle with discoverability and feedback.
- **Session State Integrity:** High volume of issues (#111897, #148707, #137332) around concurrent runs, stale completions, and message loss implies demand for stronger concurrency controls and idempotency guarantees.
- **Cross-Platform Reliability:** Persistent Windows issues (#150201, #146719) and ARM64 CPU spikes (#134925) signal that platform parity is a key unmet need.
- **Developer Tooling:** PRs like #150415 (tool block contracts) and #150404 (config derivation) show internal tooling improvements are underway—likely aimed at enabling future developer experience enhancements.

> **Prediction:** The next stable release will prioritize **stability over features**, likely focusing on fixing update failures, memory leaks, and session consistency—followed by UX polish in v2026.10.

---

### **7. User Feedback Summary**  
Real-world pain points from users:

- **Production Instability:** “Gateway crashes every 2 days due to memory growth” — @petercheng (Issue #91588)
- **Update Failures:** “Can’t upgrade from 2026.9.3 to 9.4 on Windows; it fails silently.” — @KarleeTDM (Issue #150201)
- **Message Loss:** “Two agents reply simultaneously, causing duplicate messages in Telegram.” — @thiagotii (Issue #111897)
- **UX Friction:** “Plugin installs take minutes with no feedback.” — @Patrick-Erichsen (PR #150235)
- **Security Concerns:** “OAuth token sent to OpenAI embeddings API even without API key.” — @a-m-a-r-a (Issue #111985)

> **Sentiment:** High frustration with reliability and upgrade paths. Users value functionality but are losing trust in the stability of production-grade deployments.

---

### **8. Backlog Watch**  
Long-standing, high-impact issues requiring maintainer attention:

| Issue | Age | Status | Priority | Link |
|------|-----|--------|----------|------|
| [#86881](https://github.com/openclaw/openclaw/issues/86881) | 12 weeks | Closed (stale) | 🦞 Diamond Lobster | Gateway-lite mode without AI harness |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | 13 weeks | Open (stale) | 🦞 Diamond Lobster | Persistent auth cooldown after billing recovery |
| [#94147](https://github.com/openclaw/openclaw/issues/94147) | 13 weeks | Closed (stale) | 🐚 Platinum Hermit | TCC permission spam on macOS |
| [#99925](https://github.com/openclaw/openclaw/issues/99925) | 13 weeks | Closed (stale) | 🐚 Platinum Hermit | New WebChat sessions lose prior context |
| [#49259](https://github.com/openclaw/openclaw/issues/49259) | 16 weeks | Open (stale) | 🌊 Off-meta Tidepool | Prune stale orphaned sessions |

> **Action Needed:** These issues have been repeatedly flagged but remain unresolved. Maintainers should triage and either close or assign ownership to prevent erosion of trust.

---  
*Digest generated on 2026-09-17 based on GitHub data from openclaw/openclaw.*

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Assistant & Agent Ecosystem – 2026-09-17**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem is entering a pivotal phase of **maturation and divergence**, marked by increasing specialization between *personal productivity tools* and *team/collaborative platforms*. Projects are increasingly focused on **stability, security, and enterprise readiness**, moving beyond rapid feature velocity. While innovation remains strong—especially in multi-agent orchestration, plugin extensibility, and cross-platform consistency—critical stability issues across core components (gateway, session lifecycle, memory management) are exposing architectural risks. The landscape reflects a clear bifurcation: some projects prioritize individual user experience and agility, while others are actively building infrastructure for team-scale deployment.

---

### **2. Activity Comparison**

| Project | Issues (24h) | PRs (24h) | Releases | Health Score |
|--------|--------------|-----------|----------|--------------|
| **OpenClaw** | 500 | 500 | None | 🔴 **Unstable** |
| **Hermes Agent** | 50 | 50 | None | 🟡 **Stable but Under Pressure** |
| **QwenPaw** | 25 | 37 | None | 🟡 **Stable with Growth Pains** |
| **ZeroClaw** | 35 | 50 | None | 🟢 **Healthy** |
| **IronClaw** | 0 | 0 | N/A | ⚪ **Inactive** |

> ✅ *Note:* OpenClaw dominates activity volume—indicating either intense development or systemic instability. ZeroClaw shows disciplined, high-quality output despite moderate volume.

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most **high-volume, high-risk project** in the ecosystem. Its advantages include:

- **Largest community engagement** (500+ issues/PRs daily), indicating broad adoption and active contributor base.
- **Aggressive refactoring momentum** (e.g., schema-driven contracts via #150415), signaling long-term architectural vision.
- **Early-stage maturity in tooling infrastructure**, with internal improvements targeting future developer experience.

However, it faces significant disadvantages:
- **No recent releases** despite massive PR churn—suggesting a bottleneck in release engineering or risk aversion to patching unstable code.
- **Critical P0/P1 bugs unresolved** (e.g., memory leaks, Windows update failures), eroding trust in production use.
- **Architectural strain**: Gateway instability, zombie processes, and update failures indicate deep-rooted systemic issues not yet addressed by refactors alone.

Compared to peers, OpenClaw’s technical approach is more **monolithic and API-first**, prioritizing flexibility over resilience—a trade-off that may be unsustainable at scale without stronger stabilization discipline.

---

### **4. Shared Technical Focus Areas**  
Across multiple projects, recurring technical challenges highlight emerging industry-wide requirements:

| Focus Area | Projects Involved | Specific Needs |
|-----------|------------------|----------------|
| **Session State Integrity** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Prevent race conditions, cross-contamination, stale completions; ensure idempotency and isolation under load |
| **Memory & Resource Management** | OpenClaw, QwenPaw, ZeroClaw | Fix memory leaks (OOM crashes), prevent stream buffer exhaustion, avoid zombie processes |
| **Update & Rollback Reliability** | OpenClaw, QwenPaw | Ensure silent failures don’t block upgrades; preserve state during rollback; support cross-platform paths (e.g., Windows `$OPENCLAW_STATE_DIR`) |
| **Error Recovery & UI Resilience** | QwenPaw, ZeroClaw | Prevent UI hangs after failed lazy loads; implement graceful error boundaries and recovery states |
| **Plugin Security & Lifecycle** | ZeroClaw, QwenPaw, OpenClaw | Prevent silent failures offline; enforce secure loading; manage context leakage (e.g., Kanban toolset leakage) |
| **Cross-Platform Consistency** | OpenClaw, QwenPaw, Hermes Agent | Address ARM64 CPU spikes, Windows path resolution, macOS TCC spam |

These shared concerns signal a **convergence toward foundational reliability standards**—no longer optional for production use.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | QwenPaw | ZeroClaw |
|---------|----------|--------------|---------|----------|
| **Target User** | Power users, early adopters, developers | Hybrid (individual + team workflows) | Teams, enterprises, organizations | DevOps, secure environments |
| **Feature Focus** | Extensible agent framework, plugin system | Session fidelity, fallback logic, platform integration | Multi-tenancy, Hub edition, governance | Security hardening, config integrity, supply chain safety |
| **Technical Architecture** | Monolithic gateway + plugin layer | Centralized session ownership model | Modular workbench shell + optional plugins | Rust-based, fail-safe runtime with OIDC/RPC stack |
| **Deployment Model** | Local + cloud (unstable) | Multi-surface (CLI/TUI/Desktop/Bots) | Team-centric (Hub edition) | Secure, composable (WASM/OCI-ready) |
| **Governance Model** | Community-driven, fast iteration | RFC-based decision queue (active) | Co-design via public roadmap (Issue #7318) | Structured RFC triage (Issue #8692) |

> 🎯 **Key Insight**: QwenPaw is transitioning from **personal assistant** to **team AI platform**; ZeroClaw is evolving into a **secure, auditable execution engine**; OpenClaw remains the **most flexible but least stable** framework.

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Characteristics |
|------|--------|-----------------|
| **Rapid Iteration / High Velocity** | OpenClaw, QwenPaw | Massive issue/PR volume; feature-rich sprint ahead of v2.2.0; first-time contributors active |
| **Stabilization Phase** | Hermes Agent | High fix rate (6+ PRs/day); focused on reliability; preparing for v0.22 |
| **Mature & Disciplined** | ZeroClaw | Moderate activity but high-quality PRs; structured backlog; emphasis on security and auditability |
| **Inactive / Stalled** | IronClaw | No updates in 24h; no visible progress; potential maintenance risk |

> ✅ *Maturity Signal*: Projects with **structured governance (RFCs, triage queues)** and **security-first design** (ZeroClaw, QwenPaw) show higher long-term sustainability than those with unchecked growth (OpenClaw).

---

### **7. Trend Signals**  
From community feedback and technical direction, key industry trends emerge:

1. **Shift from Individual to Team Use**:  
   - QwenPaw Hub (v2.2.0) and Hermes Agent’s unified session ownership suggest a move toward **collaborative AI agents** with role-based access, billing visibility, and governance.

2. **Security & Supply Chain Integrity as Core Requirements**:  
   - ZeroClaw’s focus on `RUSTSEC` advisories, OCI-compliant WASM registries, and OIDC providers indicates that **trusted execution environments** are now non-negotiable for production systems.

3. **Reliability Over Features**:  
   - All projects report **unresolved P0/P1 bugs** despite high activity. Users are demanding **stability, recoverability, and transparency**—not just new features.

4. **User Experience Gaps in Complex Workflows**:  
   - Repeated complaints about **silent failures**, **inconsistent UI behavior**, and **lack of visual feedback** (e.g., task completion alerts) reveal that **UX polish is lagging behind functionality**.

5. **Need for Developer Tooling & Observability**:  
   - Refactoring efforts (OpenClaw), config derivation (QwenPaw), and logging improvements (Hermes Agent) point to growing demand for **debuggable, observable, and maintainable agent systems**.

> 💡 **Value for Developers**: The next generation of AI agents will be judged not by their intelligence, but by their **reliability, security, and usability under real-world conditions**. Projects investing in these areas will lead adoption.

---

**Final Note:** The ecosystem is no longer about "who has the most features"—it’s about **who builds the most trustworthy, scalable, and maintainable systems**. Open source AI agents are maturing from novelty to mission-critical tools.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-17**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 issues and 50 pull requests updated in the past 24 hours—indicating robust developer engagement and ongoing stabilization efforts. No new releases were published, suggesting a focus on quality assurance and bug resolution ahead of a potential v0.22 release. The core team is prioritizing session isolation, message delivery reliability, and fallback behavior consistency across platforms (Telegram, WhatsApp, Discord). Critical stability fixes are being rapidly addressed, especially around watchdog logic, concurrency, and memory state management.

---

### **2. Releases**  
*No new releases detected.*  
The last release was v0.21.3 (2026.9.14), which introduced improvements to heartbeat handling and silence markers. Given the volume of closed bugs related to `NO_REPLY` handling, `stall watchdogs`, and `message delivery`, a patch release may be imminent if these regressions persist in production environments.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **[PR #113210]**: Prevents `/branch`, `/resume`, and `/sessions <id>` from switching sessions mid-turn (#112137) — resolves race conditions in session state.
- ✅ **[PR #113205]**: Fixes Kanban toolset leakage into non-Kanban sessions by restricting worker guidance to actual task owners.
- ✅ **[PR #113204]**: Corrects interrupt reporting — system watchdogs now log their true issuer instead of falsely attributing all stops to "user".
- ✅ **[PR #113202]**: Improves multi-question clarify behavior on messaging platforms by stopping at first unanswered question rather than timing out per question.
- ✅ **[PR #113199]**: Resolves plugin event listener leaks in Desktop (fixing #112366); one relay marker now opens exactly one session.
- ✅ **[PR #113198]**: Fixes inline message editing collapse issue in Desktop (closes #112935).
- ✅ **[PR #113177]**: Ensures lazily installed backends (e.g., Telegram, Bedrock) survive runtime repair during `hermes update`.
- ✅ **[PR #113169]**: Fixes Codex watchdog overkill on high-effort reasoning (resolves #112909).

These fixes reflect strong progress in stabilizing agent lifecycle, user interaction fidelity, and platform-specific reliability.

---

### **4. Community Hot Topics**  
The most active discussions center on **session isolation**, **fallback behavior**, and **message delivery integrity**:

- 🔥 **[Issue #46303]**: *Concurrent sessions cross-contaminate (shared memory + git worktree)* — 8 comments, P2 severity.  
  → *Underlying need:* Users running multiple desktop sessions simultaneously expect strict isolation; current shared state risks data leakage and unpredictable behavior. This is a foundational stability concern.

- 🔥 **[Issue #113618]**: *Telegram stall watchdog rebuilds poller but never recovers* — 2 comments, P1 severity.  
  → *Underlying need:* Telegram gateways must self-heal after stalls without requiring process restarts. A silent failure mode undermines deployment scalability.

- 🔥 **[Issue #112359]**: *MoA UX: Aggregator slot billing not obvious* — 3 comments, P2.  
  → *Underlying need:* Users need clear visibility into cost drivers when using Model-of-All (MoA) presets. Misunderstanding leads to unexpected billing surprises.

- 🔥 **[PR #106742]**: *One gateway owns every local session (CLI, TUI, Desktop, bots, cron)* — 1 comment, P1, needs decision.  
  → *Underlying need:* Unified session ownership could simplify state management and enable real-time sync across surfaces—but requires architectural consensus.

> 📌 These top topics reveal growing complexity in multi-surface, multi-session workflows and increasing demand for transparency in cost, state, and control flow.

---

### **5. Bugs & Stability**  
Ranked by severity and impact:

| Severity | Issue | Summary | Fix PR? |
|--------|-------|--------|--------|
| **P1** | [Issue #113618](https://github.com/nousresearch/hermes-agent/issues/113618) | Telegram gateway becomes deaf after stall watchdog rebuild — stays connected but unresponsive until restart | ❌ No fix yet |
| **P1** | [Issue #113031](https://github.com/nousresearch/hermes-agent/issues/113031) | `NO_REPLY` silence marker rejected by human-silence guard → spam warnings | ❌ Not fixed; PR pending |
| **P2** | [Issue #46303](https://github.com/nousresearch/hermes-agent/issues/46303) | Concurrent sessions share memory/git worktree → cross-contamination | ❌ No fix yet |
| **P2** | [Issue #112382](https://github.com/nousresearch/hermes-agent/issues/112382) | WhatsApp bridge uses vulnerable `body-parser@1.20.6` (3 moderate advisories) | ✅ Patched in PR #113617 (in review) |
| **P2** | [Issue #112647](https://github.com/nousresearch/hermes-agent/issues/112647) | All interrupts reported as `interrupted_by_user` — hides root cause | ✅ Fixed in PR #113204 |

> ⚠️ **Critical risk**: Unresolved P1 issues in Telegram and silence handling threaten production bot deployments and user trust.

---

### **6. Feature Requests & Roadmap Signals**  
Key signals for upcoming features:

- 🎯 **Unified Session Ownership (PR #106742)**: One gateway managing all local sessions (CLI, TUI, Desktop, bots, cron). This suggests a shift toward centralized, persistent conversation state — likely a cornerstone of v0.22+.
- 🎯 **Kanban Auto-Heartbeat Bridge (Issue #113609)**: Workers inheriting `HERMES_DELEGATED_CHILD_CONTEXT` silently fail heartbeat — indicates growing use of delegated agents and need for better delegation hygiene.
- 🎯 **HUD Teach Plugin (PR #113635)**: Adds interactive how-to overlays to the Mac app — signals investment in user onboarding and GUI discoverability.
- 🎯 **Persistent Recovery Replies (PR #113633)**: Discord recovery replies lost after reconnect — shows demand for resilient chat persistence.

> 💡 *Prediction*: Next major version (v0.22) will likely include unified session management, improved fallback visibility, and enhanced plugin UX.

---

### **7. User Feedback Summary**  
Real-world pain points reported by users:

- **Desktop UX Friction**:  
  - Message editing collapses immediately after opening (#112935) — frustrates iterative drafting.  
  - GitHub PR-comment deep links get swallowed instead of inserted as text (#112479) — breaks workflow integration.

- **Billing Confusion**:  
  - MoA aggregator costs unclear despite codex subscription — users expect billing alignment with their plan (#112359).

- **Platform Reliability**:  
  - Telegram gateways go silent after stalling — no auto-recovery, forcing restarts (#113618).  
  - Silent heartbeats emit stale messages and tool progress — misleading users about agent status (#112149).

- **Session Management Gaps**:  
  - `/branch` mid-turn causes message spillover (#112137) — breaks expected workflow boundaries.

> ✅ *Satisfaction*: Users appreciate proactive fixes (e.g., Codex watchdogs) and improved logging clarity. However, interface polish and resilience remain key friction points.

---

### **8. Backlog Watch**  
High-priority issues with minimal activity or unresolved for weeks:

- 🔴 **[Issue #46303]**: Concurrent session isolation — **8 comments**, no fix PR, P2, critical for multi-user setups.  
  → *Needs immediate attention*: Shared memory/gitrepo is a fundamental security and stability flaw.

- 🔴 **[Issue #113618]**: Telegram gateway deadlock — **2 comments**, P1, affects fleet-scale deployments.  
  → *Fix pending*: Current watchdog logic fails to restore connectivity.

- 🔴 **[Issue #112382]**: Vulnerable `body-parser` in WhatsApp bridge — **3 comments**, P3, but involves 3 npm advisories.  
  → *Security risk*: Should be patched before next release.

- 🔴 **[Issue #113609]**: Kanban heartbeat failure in delegated workers — **1 comment**, P3, but impacts automation pipelines.  
  → *Sign of scaling use*: Delegation is becoming common; this is a blind spot.

> 📌 **Recommendation**: Prioritize triage and assign maintainers to these four issues to prevent cascading failures in production environments.

---

**Project Health Score:** 🟡 **Stable but Under Pressure**  
Despite high activity and rapid fix cycles, unresolved P1/P2 bugs in core components (Telegram, session state, MoA billing) indicate that the project is navigating growing complexity. The team is responding well, but sustained focus on stability and user-facing clarity will be essential for adoption beyond early adopters.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-17**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust development momentum: **25 new issues** and **37 pull requests** updated in the past 24 hours, indicating strong community engagement and ongoing engineering focus. The project is currently in a feature-rich phase ahead of the upcoming **v2.2.0 release**, particularly around multi-tenancy and enterprise-grade capabilities. While no new releases have been published, significant progress is being made on stability fixes (especially memory exhaustion and streaming robustness), UI/UX refinements, and foundational improvements for team deployment. The influx of PRs from first-time contributors signals growing ecosystem maturity.

---

### **2. Releases**  
*No new releases were published today.*  
The next major milestone, **QwenPaw v2.2.0**, is imminent and will introduce **QwenPaw Hub — a multi-tenant edition** designed for team and organizational use. This shift from personal assistant to collaborative AI platform marks a strategic pivot. Users are already discussing expectations via [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318), which highlights community anticipation and co-creation intent.

---

### **3. Project Progress**  
Several high-impact PRs were merged or closed today, advancing core functionality:

- **[PR #7783](https://github.com/agentscope-ai/QwenPaw/pull/7783)**: Fixed ACP reply duplication during external delegation — improves reliability in agent orchestration workflows.
- **[PR #7805](https://github.com/agentscope-ai/QwenPaw/pull/7805)**: Matched settings menu font weight for visual consistency — minor but impactful UX polish.
- **[PR #7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)**: Integrated OpenViking as an optional memory plugin per the new plugin architecture — enables extensible, scalable memory management.
- **[PR #7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)**: Replaced blocking `watchfiles.awatch` with threaded polling — resolves server freezes during workspace file browsing.
- **[PR #7790](https://github.com/agentscope-ai/QwenPaw/pull/7790)**: Introduced unified chat workbench shell — enhances session organization and reduces clutter.

These reflect a concerted effort to improve **stability, performance, and user experience** ahead of the Hub launch.

---

### **4. Community Hot Topics**  
Top community discussions center on **multi-tenancy readiness** and **critical UI/UX flaws**:

- **[Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)** – *“What should we build next?” for QwenPaw Hub (2.2.0)*  
  → **29 comments**, **4 upvotes**. High signal: users want governance tools, model gateways, usage dashboards, and role-based access control. This is not just a feature request — it’s a **co-design call** for the future of team AI agents.

- **[Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)** – *Memory exhaustion via stream buffers, keep-alive stacking, and doom-loop evasion*  
  → **5 comments**, **0 upvotes**. Critical technical debt affecting production deployments. The detailed root-cause analysis suggests systemic issues in resource lifecycle management.

- **[Issue #7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)** – *Console fails to recover after lazy page load failure*  
  → **4 comments**, **0 upvotes**. Highly disruptive bug: once a page fails to load, the UI becomes unusable until full reload. Indicates poor error boundary handling in frontend routing.

These topics reveal a growing need for **enterprise resilience, configurability, and robust error recovery** — beyond individual productivity.

---

### **5. Bugs & Stability**  
Critical stability and crash-related bugs reported today:

| Issue | Severity | Description | Fix PR? |
|------|----------|-------------|--------|
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | ⚠️ **High** | Memory exhaustion via three compounding paths: unbounded streams, stacked instances, and doom-loop evasion | ❌ Not yet fixed |
| [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) | ⚠️ **High** | Console UI hangs permanently after failed lazy load; requires full reload | ❌ No fix yet |
| [#7813](https://github.com/agentscope-ai/QwenPaw/issues/7813) | ⚠️ **High** | SSE stream freezes on bare `null` payload | ✅ Partial fix in PR #7814 |
| [#7814](https://github.com/agentscope-ai/QwenPaw/issues/7814) | ⚠️ **Medium** | `_strip_event_headlines` emits invalid `null` string; `stream_one` sends no terminal event on failure | ✅ PR #7814 under review |
| [#7799](https://github.com/agentscope-ai/QwenPaw/issues/7799) | ⚠️ **Medium** | Images sent via `send_file_to_user` disappear post-streaming (repro of #5320) | ✅ Closed — likely resolved in 2.2.1 |
| [#7768](https://github.com/agentscope-ai/QwenPaw/issues/7768) | 🟡 **Low** | Cloud deployment auth questions (GitHub account requirements) | ❌ Not code-related |

> **Note**: The memory exhaustion issue (#7722) is especially concerning — it's not a single bug but a **systemic flaw** that could break deployments at scale.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven features signaling the next evolution of QwenPaw:

- **Multi-tenant & Team Management**  
  - [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318): Hub governance, model gateway, member roles — **core to v2.2.0**.
  - [PR #7779](https://github.com/agentscope-ai/QwenPaw/pull/7779): Adds model gateway + member governance — directly addressing this demand.

- **Enhanced UX & Productivity Tools**  
  - [Issue #7800](https://github.com/agentscope-ai/QwenPaw/issues/7800): Orange alert for task completion/requests — **visual feedback needed**.
  - [Issue #7801](https://github.com/agentscope-ai/QwenPaw/issues/7801): “Discuss vs Execute” mode toggle — users want **intent clarity** in interactions.
  - [PR #7790](https://github.com/agentscope-ai/QwenPaw/pull/7790): Unified workbench shell — indicates demand for **modular, non-intrusive UI**.

- **Global & Developer Experience**  
  - [Issue #7809](https://github.com/agentscope-ai/QwenPaw/issues/7809): i18n for tool approval cards — essential for global adoption.
  - [Issue #7797](https://github.com/agentscope-ai/QwenPaw/issues/7797): Clean output — remove temp files, show only final artifacts.

👉 **Prediction**: v2.2.0 will be **the Hub version**, focused on **team collaboration, security, and enterprise usability**.

---

### **7. User Feedback Summary**  
Real-world pain points from users:

- **"Images vanish after streaming"** ([#7799](https://github.com/agentscope-ai/QwenPaw/issues/7799)) → Confirms persistent UI rendering issues despite fixes.
- **"Task stops mid-process without recovery"** ([#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)) → High frustration with unrecoverable UI states.
- **"Context size keeps hitting 271k even with 131k limit"** ([#7810](https://github.com/agentscope-ai/QwenPaw/issues/7810)) → Suggests **context compression logic is unreliable or misconfigured**.
- **"Plugins fail silently offline"** ([#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730)) → Highlights gaps in fallback behavior.
- **"Need visual alerts for task status"** ([#7800](https://github.com/agentscope-ai/QwenPaw/issues/7800)) → Users rely on peripheral cues (like right-bottom popups), but they’re easily missed.

> **Sentiment**: Mixed. Users appreciate power and customization but are frustrated by **unstable UI, invisible failures, and lack of clear configuration controls**.

---

### **8. Backlog Watch**  
Important issues needing maintainer attention:

- **[Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)** – *QwenPaw Hub roadmap discussion*  
  → Already has 29 comments. Should be prioritized for **community alignment before v2.2.0 launch**.

- **[Issue #7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)** – *Memory exhaustion (three paths)*  
  → High-risk, systemic. Requires architectural review. **No fix PR yet** — urgent.

- **[Issue #7817](https://github.com/agentscope-ai/QwenPaw/issues/7817)** – *Feishu p2p message failure (230101)*  
  → Root cause identified: open_id mismatch. Needs framework-level channel abstraction fix.

- **[Issue #7809](https://github.com/agentscope-ai/QwenPaw/issues/7809)** – *Hardcoded English in tool approval cards*  
  → Low-hanging fruit for localization. Blocks global adoption.

- **[Issue #7768](https://github.com/agentscope-ai/QwenPaw/issues/7768)** – *Cloud deployment auth policies unclear*  
  → Documentation gap impacting onboarding. Should be addressed in release notes.

---

**Final Assessment**: QwenPaw is transitioning from a personal AI assistant to a **team-centric AI platform**. The current activity surge reflects both excitement and growing pains. With v2.2.0 on the horizon, **stability, scalability, and enterprise readiness** must take priority over feature velocity. Maintainers should prioritize fixing memory leaks, UI recovery mechanisms, and documentation gaps to ensure a successful team-focused release.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-17  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active with 35 open issues and 50 open pull requests updated in the last 24 hours, indicating strong ongoing development momentum. The volume of activity is concentrated in security hardening, runtime stability, agent lifecycle management, and feature refinement for ZeroCode and browser tooling. High-severity bugs (S2–S3) are being actively addressed, particularly around image handling, context management, and provider resilience. There are no new releases today, but multiple PRs target foundational improvements in configuration handling, plugin security, and cross-component coordination.

---

### **2. Releases**

**No new releases** were published as of 2026-09-17.  
The project continues to prioritize internal stability and architectural refinements ahead of a potential v0.9.0 release, which may be delayed pending resolution of high-risk items like `RUSTSEC-2026-0247` and context compaction logic.

---

### **3. Project Progress**

#### ✅ **Merged / Closed PRs (Today)**  
None of the PRs listed were merged or closed today. However, several high-impact PRs were recently merged (within last week), including:

- **[PR #10134](https://github.com/zeroclaw-labs/zeroclaw/pull/10134)** – *Fix: Keep agent dispatch panic-free*  
  Converted 17 panic points across core runtime paths into safe error returns or fail-closed fallbacks, significantly improving system robustness.

- **[PR #10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)** – *Stage 2: OIDC verification provider*  
  Laid groundwork for authenticated RPC via native peer credentials, part of a larger security stack.

These updates reflect a sustained focus on **fail-safe design**, **security-by-default**, and **runtime reliability**.

---

### **4. Community Hot Topics**

| Issue | Comments | Link | Analysis |
|------|---------|------|--------|
| [#10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) | 16 | [Rust anti-slop policy debt remediation](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) | High-priority audit of Rust code patterns violating production policy; reflects growing concern about technical debt in fast-moving development. |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 15 | [Maintainer decision queue for RFCs/designs](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Shows demand for structured governance; maintainers are under pressure to triage design proposals and RFCs efficiently. |
| [#9945](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) | 5 | [Browser tool exposes only 16 of 100+ commands](https://github.com/zeroclaw-labs/zeroclaw/issues/9945) | User-facing limitation in agent-browser integration; suggests frustration with incomplete automation capabilities. |

> 🔍 **Underlying Need**: Developers want **predictable, secure, and complete tooling**—especially in browser and agent interaction layers. Governance bottlenecks are emerging as a constraint on innovation velocity.

---

### **5. Bugs & Stability**

| Bug | Severity | Link | Status | Fix PR? |
|-----|----------|------|--------|--------|
| [#10885](https://github.com/zeroclaw-labs/zeroclaw/issues/10885) | S2 - degraded behavior | [Tool images disappear after unrelated call](https://github.com/zeroclaw-labs/zeroclaw/issues/10885) | In-progress | ❌ No fix yet |
| [#10887](https://github.com/zeroclaw-labs/zeroclaw/issues/10887) | S2 - turn lost | [Non-vision gate fails on marker-shaped prose](https://github.com/zeroclaw-labs/zeroclaw/issues/10887) | Accepted | ❌ No fix yet |
| [#10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912) | S2 - degraded behavior | [Streaming guard suppresses replies with tool-result syntax](https://github.com/zeroclaw-labs/zeroclaw/issues/10912) | Open | ❌ No fix yet |
| [#10908](https://github.com/zeroclaw-labs/zeroclaw/issues/10908) | S2 - degraded behavior | [Image markers promoted to attachments without provenance](https://github.com/zeroclaw-labs/zeroclaw/issues/10908) | Open | ❌ No fix yet |
| [#10883](https://github.com/zeroclaw-labs/zeroclaw/issues/10883) | S2 - degraded behavior | [Telegram media-group test times out](https://github.com/zeroclaw-labs/zeroclaw/issues/10883) | Accepted | ❌ No fix yet |

> ⚠️ **Trend**: Multiple S2 bugs involve **context loss**, **tool-side effect mismanagement**, and **parser edge cases**—indicating stress in the agent’s message processing pipeline during complex multimodal interactions.

---

### **6. Feature Requests & Roadmap Signals**

| Feature | Priority | Link | Predicted Inclusion |
|--------|----------|------|---------------------|
| [#10892](https://github.com/zeroclaw-labs/zeroclaw/issues/10892) | P1 | [Publish canonical config generations](https://github.com/zeroclaw-labs/zeroclaw/issues/10892) | Likely in v0.9.0 — foundational for live config apply |
| [#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) | P1 | [Restore proactive token-budget context compaction](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) | Critical for performance at scale; probable near-term fix |
| [#9687](https://github.com/zeroclaw-labs/zeroclaw/issues/9687) | P2 | [SOP engine: operator-initiated pause/resume](https://github.com/zeroclaw-labs/zeroclaw/issues/9687) | Strong signal from ZeroCode users; may be included in next MVP |
| [#7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) | P3 | [OCI-compliant registries for WASM plugins](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) | Long-term infra upgrade; aligns with supply chain security trends |

> 📈 **Roadmap Signal**: The team is shifting toward **secure, auditable, and composable infrastructure**—especially around plugin distribution, config state tracking, and SOP control. Expect stronger emphasis on **supply chain integrity** and **operator control** in upcoming releases.

---

### **7. User Feedback Summary**

- **Pain Points**:  
  - Users report that **tool results containing JSON-like syntax break streaming output** ([#10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912)), leading to partial or missing responses.
  - **Image handling is inconsistent**—markers are misinterpreted as attachments, stripping source context ([#10908](https://github.com/zeroclaw-labs/zeroclaw/issues/10908)).
  - **Context loss** during agent turns, especially when switching between tools or after network interruptions, undermines trust in long-running workflows.

- **Use Cases**:  
  - Real-time collaboration via **Slack/Telegram/Nextcloud Talk** requires stable message routing and media handling.
  - **Local model deployment** (Ollama, llama.cpp) is popular but hampered by lack of guidance on model selection and compatibility ([#9549](https://github.com/zeroclaw-labs/zeroclaw/issues/9549)).

- **Satisfaction/Dissatisfaction**:  
  High engagement suggests strong interest, but **frustration with unstable tool behaviors and opaque error messages** is evident. Users appreciate detailed issue tracking but expect faster resolution cycles.

---

### **8. Backlog Watch**

| Issue | Priority | Status | Why It Matters |
|------|----------|--------|---------------|
| [#10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) | P2 | In-progress, accepted | Critical for reducing technical debt in Rust codebase; affects long-term maintainability. |
| [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) | P1 | Accepted, no stale | Security CI failure due to unmaintained `bitmaps` crate; must be resolved before next release. |
| [#9677](https://github.com/zeroclaw-labs/zeroclaw/issues/9677) | P2 | Blocked, accepted | Retirement of legacy command catalogue is overdue; prevents clean migration path. |
| [#10579](https://github.com/zeroclaw-labs/zeroclaw/issues/10579) | P2 | Accepted | Broken links in docs degrade usability; easy fix but currently unaddressed. |
| [#9685](https://github.com/zeroclaw-labs/zeroclaw/issues/9685) | P2 | Deferred | Delayed cancellation RPC needed for full SOP control—blocks ZeroCode UX polish. |

> 🔔 **Action Required**: Maintainers should prioritize **security dependencies** (`RUSTSEC-2026-0247`) and **documentation integrity** to prevent downstream adoption barriers.

---

### ✅ **Final Assessment: Project Health**  
**🟢 Healthy** – Despite a high number of open issues and bugs, the project shows strong engineering discipline through structured tracking, clear priority tagging, and rapid PR turnover. The focus on **security**, **config consistency**, and **agent reliability** signals maturity. However, **maintainer bandwidth** is a growing risk—urgent attention needed on backlog triage and stabilization of critical paths.

---  
*Data sourced from GitHub API (2026-09-17 UTC)*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*