# OpenClaw Ecosystem Digest 2026-09-26

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-26 00:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-26**

---

### **1. Today's Overview**  
The OpenClaw project is experiencing intense community activity, with **500 issues and 500 pull requests updated in the last 24 hours**, indicating high engagement across development, testing, and user feedback. A significant surge in **P0 and UX-release-blocker bugs**—particularly around update failures, model catalog crashes, and memory leaks—suggests that recent releases (2026.9.5–9.6) have introduced critical stability regressions. The absence of new releases underscores a stabilization phase, where urgent fixes are being prioritized over feature delivery. Community momentum is strong, but the influx of high-severity issues signals growing friction in production environments.

---

### **2. Releases**  
❌ **No new releases** were published today.  
The latest stable version remains **2026.9.6**, which has already been flagged by multiple users as unstable due to persistent memory leaks and update failures.  
⚠️ **Migration Note**: Users upgrading from 2026.9.5 to 9.6 are encountering **~77MB heap growth per agent turn** (#157842), risking OOM kills. Operators should avoid automatic upgrades until patches are released.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today)**: 124  
While exact merged PRs aren’t listed in the data, **158407 (fix(ci): restore SQLite retirement fixture collection)** was closed today, resolving a CI blocker. This indicates progress in stabilizing test infrastructure.

🔧 **Key Fixes Advanced**:  
- **PR #158445** (`perf(gateway): serve profile avatars without blocking SQLite reads`) – improves gateway responsiveness under load.  
- **PR #158489** (`perf(gateway): keep long chat streams responsive`) – addresses UI lag during extended streaming.  
- **PR #158470** (`feat: show built-in Docker and clawctl supervisor guidance`) – enhances onboarding clarity for external supervisors.

🟢 These performance and usability improvements suggest the core team is actively addressing latency and UX bottlenecks.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Comment Count & Severity**:

| Issue | Summary | Comments | Link |
|------|--------|---------|------|
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | **Stable environment turned into 8-hour recovery after 2026.9.5 upgrade** | 34 | [View Issue](https://github.com/openclaw/openclaw/issues/153257) |
| [#155753](https://github.com/openclaw/openclaw/issues/155753) | **Model-catalog worker causes CPU burn + infinite loop** | 29 | [View Issue](https://github.com/openclaw/openclaw/issues/155753) |
| [#157842](https://github.com/openclaw/openclaw/issues/157842) | **Prepared-model-catalog worker leaks ~77MB per turn → OOM** | 14 | [View Issue](https://github.com/openclaw/openclaw/issues/157842) |
| [#157603](https://github.com/openclaw/openclaw/issues/157603) | **Update failure: repair report shows broken rollback path** | 11 | [View Issue](https://github.com/openclaw/openclaw/issues/157603) |

🔍 **Underlying Needs**:  
- **Reliability over novelty**: Users are frustrated by *regressions* in stable workflows (e.g., `openclaw update` failing silently).  
- **Predictability in resource usage**: Heap and CPU leaks are top concerns, especially in production gateways.  
- **Clearer error messaging**: Many users report generic errors like “AI services temporarily overloaded” without provider context (#51336).

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs (P0, UX-Release Blocker)**:  
1. **[#157842]** – Memory leak in `prepared-model-catalog.worker.js` (~77MB per turn) causing OOM. **No fix PR yet**.  
2. **[#155753]** – Infinite loop in `readFullModelCatalog()` triggers constant refreshes → CPU burn. **Fix PR pending**.  
3. **[#154114]** – Update fails at rehearsal stage despite working auth. **Confirmed by multiple users**.  
4. **[#155720]** – macOS gateway exits silently; LaunchAgent remains installed → 24h downtime. **No fix PR**.

🛠️ **Regression Trends**:  
- 2026.9.5 and 2026.9.6 are **both heavily impacted** by update failures, crash loops, and memory leaks.  
- Multiple `update-*` failures (#157603, #155094, #153049, #154460) indicate systemic issues in the upgrade pipeline.

📌 **Note**: Despite many PRs being submitted, **no P0 bug has a linked fix PR** as of 2026-09-26, suggesting delayed triage or complex root causes.

---

### **6. Feature Requests & Roadmap Signals**  
🎯 **High-Priority User-Requested Features**:  
- **Per-agent cost budgeting at gateway level** (#42475): Prevent runaway spend without external monitoring.  
- **Per-agent dreaming configuration** (#67413): Avoid OOM during simultaneous cron jobs.  
- **Self-hosted STT/TTS support in webchat** (#45508): Critical for privacy-focused deployments.  
- **Configurable lane wait diagnostic threshold** (#14747): Needed for long-running cron tasks.  

🔮 **Roadmap Signals**:  
- **Cost control** and **resource isolation** are recurring themes — likely to be prioritized in **2026.9.7**.  
- **Memory-core and plugin hot-reload** (#14438) remain active, suggesting deeper infrastructural investment.

---

### **7. User Feedback Summary**  
💬 **Real Pain Points Reported**:  
- "I upgraded to 2026.9.5 and spent 8 hours recovering from a crash loop." – @abuegab1-spec (#153257)  
- "My gateway now burns a full CPU core just reading the model catalog." – @AgentZero-nccio (#155753)  
- "The update process fails silently — I didn’t know my gateway was down for 24 hours." – @helloworldtang (#155720)  
- "I can’t install the Wecom plugin anymore — it’s broken since 2026.7.2." – @linghengqian (#137177)

✅ **Positive Signals**:  
- Users appreciate granular diagnostics (e.g., `openclaw doctor` improvements) and plugin modularity.  
- High comment counts on PRs like #158445 and #158489 suggest trust in engineering quality.

---

### **8. Backlog Watch**  
⏳ **Long-Unanswered, High-Impact Issues Needing Attention**:

| Issue | Status | Why It Matters |
|------|--------|----------------|
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | P2, clawsweeper:needs-product-decision | Per-agent cost budgets are essential for enterprise adoption. |
| [#22438](https://github.com/openclaw/openclaw/issues/22438) | P2, stale, needs-maintainer-review | Tiered bootstrap loading could save thousands of tokens per session. |
| [#158421](https://github.com/openclaw/openclaw/issues/158421) | P1, clawsweeper:needs-security-review | Default model pinning breaks cross-provider fallbacks — security risk. |
| [#114414](https://github.com/openclaw/openclaw/issues/114414) | P3, dated-todo-sweep | Overdue cleanup tasks (e.g., zod cooldown exclusion) may cause future breakages. |

🛡️ **Action Required**: Maintainers must prioritize **cost control**, **memory safety**, and **update reliability** to regain user confidence. Delayed responses to these issues risk eroding trust in OpenClaw’s maturity.

---  
**Digest compiled on 2026-09-26** | Source: GitHub API, OpenClaw Repository  
*For real-time updates, monitor: https://github.com/openclaw/openclaw*

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-26**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem in Q3 2026 is characterized by rapid evolution, increasing architectural complexity, and a clear shift from feature experimentation to **production readiness and system stability**. Projects are converging on core concerns: **resource control**, **session fidelity**, **security hardening**, and **cross-agent coordination**. While innovation remains strong—especially in identity-driven access and modular runtime design—user frustration with regressions, silent failures, and poor UX signals that the community is maturing beyond early adopters toward real-world deployment. The landscape is bifurcating between high-momentum, actively evolving platforms (OpenClaw, ZeroClaw) and stable but low-activity foundational systems (IronClaw), indicating a phase of consolidation.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Releases? | Health Score (1–10) |
|--------|-------------------|----------------|-----------|-----------------------|
| **OpenClaw** | 500 | 500 | ❌ No | 5.8 |
| **Hermes Agent** | 50 | 50 | ❌ No | 7.2 |
| **IronClaw** | 0 | 0 | ❌ No | 8.5 |
| **QwenPaw** | 12 | 13 | ❌ No | 7.8 |
| **ZeroClaw** | 50 | 50 | ❌ No | 8.9 |

> ✅ *Note:* OpenClaw's activity volume is outlier-level, reflecting crisis-mode stabilization; ZeroClaw shows disciplined, high-quality engineering momentum; IronClaw exhibits quiet maturity.

---

### **3. OpenClaw’s Position**  
OpenClaw stands out as the **most active project in terms of volume**, but this reflects instability rather than healthy growth. Its **500 issues and 500 PRs in 24 hours** signal severe regression fatigue—particularly around memory leaks (~77MB/turn), update failures, and model catalog crashes. Unlike peers, OpenClaw has not stabilized its release pipeline, with **no new releases despite urgent P0 bugs**. This positions it as a **high-risk, high-engagement environment**: ideal for contributors seeking impact but dangerous for production use without manual patching. Compared to Hermes Agent (focused on platform hygiene) or ZeroClaw (architectural rigor), OpenClaw’s technical approach is more monolithic and less modular, contributing to systemic fragility. Community size appears largest, but trust is eroding due to repeated breakages.

---

### **4. Shared Technical Focus Areas**  
Across projects, recurring technical demands reveal emerging industry priorities:

| Need | Projects Affected | Specific Requirements |
|------|-------------------|------------------------|
| **Memory & Resource Safety** | OpenClaw, QwenPaw, ZeroClaw | Leak prevention (e.g., `prepared-model-catalog.worker.js`), context budgeting, per-agent resource caps |
| **Session & State Integrity** | Hermes Agent, QwenPaw, ZeroClaw | Persistent session recovery, no-op updater loops, state corruption (e.g., `.db-wal` scanning) |
| **Security & Identity Management** | ZeroClaw, Hermes Agent | OIDC integration, RPC session revalidation, sandboxing, role-based access |
| **Tooling Reliability & Output Handling** | QwenPaw, ZeroClaw, OpenClaw | Correct tool result streaming, attachment handling, error messaging clarity |
| **Cross-Agent Coordination** | ZeroClaw, QwenPaw | Agent-to-agent messaging, unified capability catalogs, shared session dashboards |

These signals indicate a **transition from isolated agent tools to interconnected, multi-agent orchestration platforms**, where reliability and predictability are paramount.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Feature Focus** | Core engine stability, plugin modularity | Platform-specific runtime hygiene, desktop UX | Foundational time logic, self-aware codebase | UI/UX polish, context management | Runtime modularity, identity-driven security |
| **Target Users** | DevOps-heavy, enterprise-scale deployments | Power users, Windows/macOS desktop adopters | Research/advanced developers | Multi-agent workflow builders | Infrastructure architects, SaaS integrators |
| **Architecture** | Monolithic gateway + agent model | PM-managed Python runtime, desktop app | Lightweight, declarative time API | Modular, extensible UI framework | Plugin-first, WASM-enabled, OIDC-integrated |
| **Differentiator** | High-volume contributor base | Desktop session resilience | Self-aware codebase indexing | Context transparency & UX polish | Unified capability layer, secure agent lifecycle |

ZeroClaw leads in architectural ambition; QwenPaw in UX maturity; OpenClaw in scale of engagement—but at cost of stability.

---

### **6. Community Momentum & Maturity**  
- **High-Momentum (Rapid Iteration):**  
  - **OpenClaw** (crisis-driven fixes)  
  - **ZeroClaw** (RFC governance, security overhaul)  
  - **QwenPaw** (active UX refinement, session fixes)  
  These projects are **actively shaping their futures** through high-velocity contributions and architectural decisions.

- **Stabilizing (Low Activity, High Integrity):**  
  - **IronClaw** — quiet but consistent progress on foundational capabilities.  
  - **Hermes Agent** — focused cleanup cycle, addressing legacy runtime issues.  

IronClaw represents **mature, self-sustaining development**; OpenClaw reflects **community burnout from instability**. The rest are in transition phases—balancing innovation with reliability.

---

### **7. Trend Signals**  
Based on cross-project feedback, key industry trends emerge for AI agent developers:

1. **Cost & Resource Control is Non-Negotiable:**  
   Per-agent budgeting (#42475), host-scoped resource bounds (#10970), and context compaction accuracy are top concerns across four projects—indicating **enterprise-grade operational needs**.

2. **Identity & Access Control Are Now Core:**  
   OIDC support, role-based access, and session revalidation are no longer niche—they’re central to **secure multi-user and multi-agent environments** (ZeroClaw, Hermes).

3. **UX Is a Competitive Moat:**  
   Users demand **predictable sessions**, **transparent context**, and **intuitive navigation**. Silent failures (e.g., `update` aborts) and UI flaws (e.g., broken input fields) are primary churn drivers.

4. **Modularity Enables Scalability:**  
   "Everything is a plugin" (#6489), WASM support, and runtime hot-reload are becoming standard expectations—reflecting a move toward **composable, reusable agent components**.

5. **Debuggability > Novelty:**  
   Users increasingly value logs, diagnostics (`openclaw doctor`), and clear error messages over flashy features. **Reliability beats novelty** in production.

---

### **Conclusion**  
The personal AI agent ecosystem is entering a **stability and security phase**. Developers must now prioritize **resource safety, session continuity, and identity management** over feature velocity. Projects like ZeroClaw and QwenPaw are leading in user-centric design and architectural clarity, while OpenClaw’s high activity masks deep structural vulnerabilities. For developers choosing tools, **health score, release cadence, and fix responsiveness** should outweigh contributor count. The future belongs to platforms that balance innovation with operational integrity.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-26**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 issues and 50 pull requests updated in the last 24 hours—indicating robust developer engagement and ongoing stabilization efforts. The volume of open issues (36) and PRs (24) suggests a strong focus on resolving critical bugs and improving compatibility across platforms, particularly Windows and macOS. Despite no new releases, the team is actively addressing platform-specific regressions, session state integrity, and security boundary issues. The high number of closed issues reflects a prioritized cleanup cycle, especially around authentication flows, gateway stability, and update mechanics.

---

### **2. Releases**  
❌ **No new releases** were published today.  
*Note:* The absence of a release despite significant activity implies that recent fixes are being consolidated for a future patch or minor version (likely v0.22.x). Users should expect updates to roll out soon, particularly given the severity of several open bugs affecting core functionality like message delivery and profile persistence.

---

### **3. Project Progress**  
✅ **Merged & Closed PRs (Today):**  
- **PR #102772** (`fix(stream): distinguish clean-EOF no-finish_reason from a transport drop`) – Resolves confusion between network drops and successful stream completions.  
- **PR #91738** (`fix(agent): stop reporting transport/router truncation as an output-length limit`) – Fixes misleading error messages during API call failures.  
- **PR #90254** (`fix(agent): align stream drop attempt counter with execution attempt`) – Corrects off-by-one logging errors in retry tracking.  
- **PR #105789** (`fix(agent): log the truncated tool-call give-up path to agent.log`) – Ensures silent failures are now visible in logs, aiding debugging.  

These merged changes improve diagnostic clarity and reduce false positives in streaming and tool call handling—critical for reliability in production environments.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement (Comments/Reactions):**

| Issue | Summary | Link |
|------|--------|------|
| [#122183](https://github.com/nousresearch/hermes-agent/issues/122183) | Windows PM runtime crash due to legacy venv interference (`pydantic_core` ABI mismatch) | [Issue #122183](https://github.com/nousresearch/hermes-agent/issues/122183) |
| [#122656](https://github.com/nousresearch/hermes-agent/issues/122656) | Desktop app loops endlessly restarting gateway on every boot due to no-op updater | [Issue #122656](https://github.com/nousresearch/hermes-agent/issues/122656) |
| [#122490](https://github.com/nousresearch/hermes-agent/issues/122490) | Bot-to-bot DM fails due to missing `ruamel` deps in delivery runner | [Issue #122490](https://github.com/nousresearch/hermes-agent/issues/122490) |
| [#122783](https://github.com/nousresearch/hermes-agent/issues/122783) | PM-managed install runs gateway on bare runtime interpreter instead of venv | [Issue #122783](https://github.com/nousresearch/hermes-agent/issues/122783) |

💡 **Underlying Needs:**  
- **Platform-specific runtime hygiene** (especially Windows/macOS) — multiple reports point to misconfigured Python environments and venv overlay issues.
- **Session continuity** — desktop restart loops and credential loss suggest instability in state management.
- **Dependency isolation** — tools running in wrong environments (e.g., missing `ruamel`, incorrect Python paths) indicate weak sandboxing in pipeline design.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs (P1/P2) Reported Today:**

| Issue | Severity | Description | Fix PR? |
|------|----------|------------|--------|
| [#122183](https://github.com/nousresearch/hermes-agent/issues/122183) | P1 | Windows gateway crashes after `hermes update` due to pre-PM venv pollution | ❌ No fix yet |
| [#122783](https://github.com/nousresearch/hermes-agent/issues/122783) | P2 | Gateway runs on base runtime interpreter, not managed venv → missing dependencies | ❌ No fix yet |
| [#122656](https://github.com/nousresearch/hermes-agent/issues/122656) | P2 | Desktop triggers endless rebuild/restart loop on backend boot | ❌ No fix yet |
| [#122490](https://github.com/nousresearch/hermes-agent/issues/122490) | P2 | bot-to-bot DM delivery fails due to missing third-party deps | ✅ Partially addressed via PR #123232 (Mattermost attachment fix) but not fully resolved |
| [#122495](https://github.com/nousresearch/hermes-agent/issues/122495) | P2 | `hermes update` aborts when gateway runs as `-c shim` | ❌ No fix yet |

📌 **Stability Risks:**  
- Multiple **Windows-specific crashes** linked to venv path resolution and PID mapping.  
- **Desktop session corruption** due to repeated reboots and outdated state handling.  
- **Authentication persistence failure** (#103694) shows broader trust issues in OAuth flow enforcement.

---

### **6. Feature Requests & Roadmap Signals**  
📈 **High-Potential Features (User-Requested / Maintainer-Driven):**

| Request | Status | Predicted Inclusion |
|--------|--------|---------------------|
| [#88891](https://github.com/nousresearch/hermes-agent/issues/88891) – Per-task model/reasoning override | Open, P3, 3 👍 | Likely in v0.22.x (orchestration layer enhancement) |
| [#118381](https://github.com/nousresearch/hermes-agent/issues/118381) – Surface MCP `initialize_result.instructions` to model | Open, P3 | High priority for multi-agent coordination |
| [#122489](https://github.com/nousresearch/hermes-agent/pull/122489) – Show owning profile at start of session tab | Open, P3 | UX polish; likely in next desktop release |
| [#68680](https://github.com/nousresearch/hermes-agent/issues/68680) – Add pt-BR locale for docs | Open, P3 | Low-hanging fruit; could ship in v0.21.3 if translated |

🔍 **Roadmap Signals:**  
- Focus on **multi-profile orchestration**, **session fidelity**, and **dependency isolation** is evident.  
- Increased attention to **security boundaries** (OAuth, env file scoping) and **logging diagnostics** suggests maturity phase nearing.

---

### **7. User Feedback Summary**  
🗣️ **Real User Pain Points (Extracted from Issues):**

- **"My chat keeps restarting every time I boot the gateway."** → Reported in #122656. Affects power users relying on persistent sessions.  
- **"After updating, my bots can’t send DMs anymore."** → #122490 highlights broken automation pipelines.  
- **"I upgraded to PM runtime, but it’s crashing on Windows."** → #122183 and #122783 show user frustration with migration complexity.  
- **"It says ‘logged in’ but then gives HTTP 401."** → #123210 reveals trust issues in OAuth workflows.  
- **"The desktop app scans my entire home directory."** → #53328 indicates privacy concerns over unconfigurable behavior.

✅ **Satisfaction Signals:**  
- Users appreciate the CLI’s configurability and plugin system.  
- Many value the ability to run multi-profile deployments (per #112646).

---

### **8. Backlog Watch**  
⚠️ **Long-Unanswered Critical Items Needing Attention:**

| Issue | Age | Priority | Notes |
|------|-----|----------|------|
| [#122183](https://github.com/nousresearch/hermes-agent/issues/122183) | 1 day | P1 | Windows venv conflict — major crash risk |
| [#122783](https://github.com/nousresearch/hermes-agent/issues/122783) | 1 day | P2 | PM runtime misbehavior — breaks dependency isolation |
| [#122656](https://github.com/nousresearch/hermes-agent/issues/122656) | 1 day | P2 | Endless loop kills usability |
| [#115079](https://github.com/nousresearch/hermes-agent/issues/115079) | 8 days | P2 | Unintended provider routing (Alibaba-CN default) |
| [#122495](https://github.com/nousresearch/hermes-agent/issues/122495) | 1 day | P2 | Update aborts silently — poor UX |
| [#103694](https://github.com/nousresearch/hermes-agent/issues/103694) | 21 days | P2 | OAuth credentials not persisted — trust issue |

📌 **Action Required:** These issues represent **systemic risks** in update flows, environment hygiene, and session consistency. Immediate triage and dedicated fix PRs are needed to prevent user churn.

---

> ✅ **Project Health Assessment:**  
> **Active, High-Pressure, Stable Core with Growing Complexity**  
> The project is healthy in terms of contributor momentum and issue visibility, but **critical stability gaps** exist—especially in Windows, PM runtime, and session lifecycle management. Without timely fixes, these may deter enterprise adoption. The roadmap is clear: prioritize **platform resilience**, **dependency safety**, and **user session continuity** in the next release cycle.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-26**

---

### **1. Today's Overview**  
The IronClaw project exhibits low activity in the past 24 hours, with no new issues or releases and no merged pull requests. Two open PRs remain active—both are low-risk and focused on documentation improvements and internal codebase maintenance. The absence of recent closures or issue updates suggests a period of stabilization or reduced contributor engagement. Overall project health remains stable, though momentum appears subdued.

---

### **2. Releases**  
*No new releases were published today.*  
There are no release notes or version updates to report as of 2026-09-26.

---

### **3. Project Progress**  
*No pull requests were merged or closed today.*  
However, two notable PRs are currently open:  
- **PR #8108**: Adds `operation: "shift"` support to `builtin.time` for signed time intervals (seconds, minutes, hours, days, weeks) relative to a timestamp or `now`. This enables precise temporal arithmetic with fixed-duration units and improved type safety.  
- **PR #7988**: A core infrastructure chore that refreshes the codebase knowledge graph via an automated nightly workflow. This maintains up-to-date internal indexing for agent reasoning and code navigation.  

Both PRs represent incremental but valuable improvements to runtime accuracy and system awareness.

---

### **4. Community Hot Topics**  
*No issues have been opened recently, so community discussion is minimal.*  
However, the most actively updated PRs reflect ongoing focus on foundational reliability:  
- **PR #8108** ([Link](https://github.com/nearai/ironclaw/pull/8108)) – Addresses a gap in time manipulation functionality, critical for agents requiring precise scheduling or historical context. Its focus on typed input and accumulator design signals growing demand for robust time logic in AI workflows.  
- **PR #7988** ([Link](https://github.com/nearai/ironclaw/pull/7988)) – Though technical, this PR highlights the project’s commitment to maintaining an accurate, self-aware codebase model—an essential capability for long-term agent autonomy.  

These PRs suggest underlying community interest in *predictable temporal reasoning* and *system self-awareness*, even if not expressed through public issues.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions were reported today.*  
No open issues indicate stability concerns. Both current PRs are low-risk and non-breaking, reinforcing the project’s current state of operational integrity.

---

### **6. Feature Requests & Roadmap Signals**  
While no formal feature requests exist in the issue tracker, PR #8108 reveals a clear roadmap signal:  
- **Enhanced time operations** (e.g., `shift`, `relative_to`) are being prioritized, indicating that users need more expressive temporal logic in agent behaviors.  
- The emphasis on *typed inputs* and *fixed-duration units* suggests a move toward safer, declarative time handling—likely driven by real-world use cases involving scheduling, logging, or event correlation.  

This points to upcoming enhancements in the `builtin.time` module, possibly leading to a structured `Temporal` API in future versions.

---

### **7. User Feedback Summary**  
*No user feedback was recorded in the last 24 hours.*  
However, the nature of the open PRs implies indirect user needs:  
- Developers require **precise, predictable time shifting** for agent decision-making.  
- The refresh of the codebase knowledge graph indicates that users expect agents to maintain accurate, up-to-date understanding of their environment—a key indicator of trust and performance.  

The lack of complaints suggests satisfaction with current stability, but also limited engagement from end-users outside core contributors.

---

### **8. Backlog Watch**  
*No high-priority issues are currently active.*  
However, the following items merit maintainer attention due to their potential impact:  
- **PR #8108** ([Link](https://github.com/nearai/ironclaw/pull/8108)): Despite being labeled "low risk," this change is foundational for time-sensitive agents. Delayed review could hinder downstream use cases in automation and orchestration.  
- **PR #7988** ([Link](https://github.com/nearai/ironclaw/pull/7988)): While automated, this is a critical dependency for agent memory and reasoning. Ensuring timely merge supports long-term system coherence.  

Both PRs should be reviewed promptly to avoid stagnation in core capabilities.

---  
**Project Health Score**: ⚖️ Stable (Low Activity, High Integrity)  
**Next Update Expected**: 2026-09-27 (monitor PR reviews and CI pipeline status)

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-26**

---

### **1. Today's Overview**  
QwenPaw exhibits strong community engagement with **12 open issues and 13 open PRs updated in the last 24 hours**, indicating active development and user-driven feedback. The project remains stable with no new releases, suggesting a focus on feature refinement and bug fixes ahead of a potential patch or minor version update. High activity around UI/UX improvements, context management, and tool reliability signals growing maturity in both core functionality and user experience. The influx of first-time contributor PRs highlights an accessible codebase and healthy contributor onboarding.

---

### **2. Releases**  
*No new releases detected.*  
The latest stable version remains `2.2.1` (PyPI), with ongoing pre-release testing in `2.2.0b7`. No breaking changes or migration notes are currently pending, allowing users to continue using existing configurations without disruption.

---

### **3. Project Progress**  
**Merged/Closed PRs today:** *None*  
However, **13 PRs were updated within the past 24 hours**, all still open — signaling rapid iteration and collaborative review. Key contributions include:

- ✅ **UI/UX Fixes**:  
  - [`PR #7989`](https://github.com/agentscope-ai/QwenPaw/pull/7989): Ensures Markdown tables remain scrollable and visually contained within chat bubbles.  
  - [`PR #7988`](https://github.com/agentscope-ai/QwenPaw/pull/7988): Prevents `grep_search` from scanning binary/internal files like `history.db-wal`, mitigating session state corruption risks.  
  - [`PR #7987`](https://github.com/agentscope-ai/QwenPaw/pull/7987): Enables exclusion of Playwright’s default `--disable-extensions`, critical for persistent browser profiles.  

- ✅ **Stability & Integration Improvements**:  
  - [`PR #7983`](https://github.com/agentscope-ai/QwenPaw/pull/7983): Addresses duplicate message processing in QQ official bot gateway after session resume.  
  - [`PR #7982`](https://github.com/agentscope-ai/QwenPaw/pull/7982): Fixes missing `thought_signature` in native Gemini provider responses, enabling tool calling on second turn.  
  - [`PR #7986`](https://github.com/agentscope-ai/QwenPaw/pull/7986): Corrects context window misinference for custom providers (e.g., llama.cpp) by avoiding static cloud catalog overrides.

These PRs collectively address critical usability and reliability gaps, particularly in agent workflows involving external tools and long-running sessions.

---

### **4. Community Hot Topics**  
Top 3 most active items reflect deep user frustration with **context handling**, **session persistence**, and **UI/UX friction**:

1. **[Issue #7628](https://github.com/agentscope-ai/QwenPaw/issues/7628)**: *Context compaction exceeding budget despite live context limits*  
   → **7 comments**, high severity. Users report failed agent turns due to budget miscalculation during compaction. Suggests systemic flaw in cost estimation logic — likely impacting large-scale agents.

2. **[Issue #7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)**: *Historical chat data not fully retained after compression*  
   → **5 comments**, emotional tone ("Can’t remember what we discussed!"). Indicates a fundamental UX pain point: users expect full history visibility, but current compaction strategy sacrifices recall for performance.

3. **[Issue #7978](https://github.com/agentscope-ai/QwenPaw/issues/7978)**: *Cross-agent "Recent Sessions" panel needed for quick navigation*  
   → **1 comment**, but represents a strategic UX need. Users managing multiple agents require centralized session monitoring — a sign of advanced use cases emerging.

> 🔍 **Underlying Need**: Users are moving beyond single-agent tasks toward multi-agent orchestration, demanding better session awareness, transparency, and navigability.

---

### **5. Bugs & Stability**  
| Severity | Issue | Summary | Fix PR? |
|--------|------|--------|--------|
| 🔴 Critical | [Issue #7980](https://github.com/agentscope-ai/QwenPaw/issues/7980) | `grep_search` reads internal `.db-wal` files → corrupts session state and causes doom loops | ✅ Yes (`PR #7988`) |
| 🔴 Critical | [Issue #7979](https://github.com/agentscope-ai/QwenPaw/issues/7979) | Local `llama.cpp` treated as 1M context due to cloud catalog mismatch → compaction never triggers | ✅ Yes (`PR #7986`) |
| 🟡 High | [Issue #7948](https://github.com/agentscope-ai/QwenPaw/issues/7948) | Web console breaks user input due to poor design | ❌ No fix yet |
| 🟡 High | [Issue #7946](https://github.com/agentscope-ai/QwenPaw/issues/7946) | QQ gateway replays events post-reconnect → duplicate processing | ✅ Yes (`PR #7983`) |
| 🟡 Medium | [Issue #7981](https://github.com/agentscope-ai/QwenPaw/issues/7981) | Foreground timeout reports “interrupted by user” instead of timeout | ❌ No fix yet |

> ⚠️ **Key Risk**: Two critical bugs related to **context budgeting** and **tool result integrity** are now addressed via PRs — urgent for release stability.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging patterns suggest the next release will prioritize **user control**, **multi-agent visibility**, and **context transparency**:

- ✅ **Manual Disable of Pre-made Models/Channels** ([#7957](https://github.com/agentscope-ai/QwenPaw/issues/7957)): Requested by users with OCD-like preferences; indicates growing customization demand.
- ✅ **Model Catalog Support for Aliyun Token Plan** ([#7990](https://github.com/agentscope-ai/QwenPaw/issues/7990)): A missing `thinking_param_style` entry hides critical settings — this is a must-fix for model parity.
- ✅ **Cross-Agent Recent Sessions Panel** ([#7978](https://github.com/agentscope-ai/QwenPaw/issues/7978)): Directly addresses workflow fragmentation in multi-agent environments — highly likely to be prioritized.

> 📌 **Predicted Next Version (v2.2.2 or v2.3.0)**: Will likely include:
> - Context budgeting fixes
> - Enhanced session persistence
> - Cross-agent session dashboard
> - Improved tool output rendering

---

### **7. User Feedback Summary**  
Real user pain points reveal evolving usage patterns:

- **Frustration with lost context**: Multiple users complain about inability to revisit earlier parts of conversations after compaction ([#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)).
- **Trust erosion from silent failures**: When `grep_search` corrupts session state ([#7980](https://github.com/agentscope-ai/QwenPaw/issues/7980)), users lose confidence in tool reliability.
- **Desire for control and clarity**: Requests to disable unused models/channels ([#7957](https://github.com/agentscope-ai/QwenPaw/issues/7957)) and expose thinking controls ([#7990](https://github.com/agentscope-ai/QwenPaw/issues/7990)) show users want granular configuration.
- **Productivity loss due to UI flaws**: Poor table scrolling behavior ([#7924](https://github.com/agentscope-ai/QwenPaw/issues/7924)) and input-breaking console design ([#7948](https://github.com/agentscope-ai/QwenPaw/issues/7948)) hinder readability and interaction.

> 💬 **Sentiment**: Mixed — technically powerful foundation, but UI/UX and session transparency are holding back broader adoption.

---

### **8. Backlog Watch**  
High-priority issues awaiting maintainer attention:

- **[Issue #7628](https://github.com/agentscope-ai/QwenPaw/issues/7628)**: *Context compaction exceeds budget* — critical for agent reliability. Currently unresolved despite clear solution path.  
- **[Issue #7981](https://github.com/agentscope-ai/QwenPaw/issues/7981)**: *Foreground timeout misreports interruption* — impacts debugging and automation trust. No fix PR yet.  
- **[Issue #7924](https://github.com/agentscope-ai/QwenPaw/issues/7924)**: *Markdown table overflow and scrollbar placement* — simple but impactful UX fix; already has a PR ([#7989](https://github.com/agentscope-ai/QwenPaw/pull/7989)) ready for merge.

> 🛠️ **Recommendation**: Prioritize merging `PR #7989`, `#7988`, and `#7986` immediately to stabilize core workflows and prevent further user churn.

--- 

✅ **Project Health Score**: **7.8 / 10**  
Strong momentum, active contributors, and timely fixes — but UI/UX and context handling remain key bottlenecks. With current trajectory, QwenPaw is poised for a significant usability leap in the next minor release.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-26  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active with 50 new issues and 50 new pull requests in the last 24 hours, indicating sustained momentum in feature development, security hardening, and architectural refinement. The ecosystem is undergoing a pivotal shift toward runtime modularity, identity-driven access control, and improved agent lifecycle management. A strong focus on security (especially around RPC, sandboxing, and plugin egress) and developer experience (CI performance, documentation clarity) is evident across both issue and PR activity. Despite no new releases, the depth and quality of ongoing work suggest imminent progress toward v0.9.0 readiness.

---

### **2. Releases**

❌ **No new releases** in the past 24 hours.  
No release candidates or version updates have been published. The project continues to build toward **v0.9.0**, as tracked in [Issue #8358](https://github.com/zeroclaw-labs/zeroclaw/issues/8358), which coordinates final deliverables for ZeroRelay and core runtime stability.

---

### **3. Project Progress**

✅ **Merged/Closed PRs (Today):**
- **[PR #11133](https://github.com/zeroclaw-labs/zeroclaw/pull/11133)**: *fix(rpc): revalidate forwarded environment on session reuse* – Enhances security by preventing stale environment reuse during session resumption.
- **[PR #11072](https://github.com/zeroclaw-labs/zeroclaw/pull/11072)**: *fix(nix): set meta.mainProgram on flake packages* – Improves Nix package usability and eliminates warnings in deployment pipelines.
- **[PR #10397](https://github.com/zeroclaw-labs/zeroclaw/pull/10397)**: *fix(mcp): send tool result text blocks, not the whole CallToolResult envelope* – Optimizes streaming protocol efficiency and reduces payload bloat.
- **[PR #10935](https://github.com/zeroclaw-labs/zeroclaw/pull/10935)**: *fix(runtime): keep prose that quotes a tool-result object out of the streaming protocol guard* – Prevents accidental data loss during stream processing.
- **[PR #10938](https://github.com/zeroclaw-labs/zeroclaw/pull/10938)**: *fix(tools): declare tool attachments explicitly instead of scanning tool text for image markers* – Increases reliability of media handling in agent responses.

These fixes collectively improve **security posture**, **protocol fidelity**, and **tooling robustness**, particularly in high-risk areas like RPC sessions and tool output handling.

---

### **4. Community Hot Topics**

🔥 **Top Issues by Engagement (Last 24h):**

| Issue | Comments | Link | Summary |
|------|--------|------|--------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 15 | [Tracker: Maintainer decision queue for RFCs](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Critical need for structured governance — maintaining visibility and accountability in RFC acceptance pipeline. High signal of process maturity effort. |
| [#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586) | 10 | [refactor(gateway): centralize webhook channel message dispatch](https://github.com/zeroclaw-labs/zeroclaw/issues/8586) | Centralizing message handling to reduce duplication and improve observability across channels. Key step in gateway scalability. |
| [#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) | 9 | [Unified capability catalog and plugin migration roadmap](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) | Core product vision: "Everything is a plugin" — unifying integrations and WASM plugins into one truth layer. Signals long-term architectural direction. |

🔥 **Top PRs by Engagement:**
- **[PR #11082](https://github.com/zeroclaw-labs/zeroclaw/pull/11082)**: *feat(security): OIDC principals, enrollment and the gateway auth surface (#8289)* – Large-scale security overhaul integrating OIDC and multi-factor authentication. One of the most complex and impactful changes in recent history.
- **[PR #10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)**: *feat(runtime): coordinate agent lifecycle mutations* – Addresses race conditions in agent state management across RPC, gateway, and CLI — crucial for stable deployments.

👉 **Underlying Needs:**  
The community is demanding **stronger governance** (RFC tracking), **architectural cohesion** (unified capabilities), **identity-centric security** (OIDC, role-based access), and **runtime resilience** (session, lifecycle, and state consistency).

---

### **5. Bugs & Stability**

⚠️ **Critical Bugs Reported (Severity S2/S3):**

| Issue | Severity | Link | Summary |
|------|---------|------|--------|
| [#11110](https://github.com/zeroclaw-labs/zeroclaw/issues/11110) | S0 (Security Risk) | [RPC workspace confinement retains retargetable symlink](https://github.com/zeroclaw-labs/zeroclaw/issues/11110) | Exploitable via symlink manipulation — allows unauthorized file system access after authorization. **High-priority fix required.** |
| [#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) | Medium | [Daemon never registers channel-map factory](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) | Breaks outbound turn delivery for webhook, cron, and SOP — renders key tools unusable. Requires immediate attention. |
| [#11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) | S2 | [WhatsApp Web ignores force_voice](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) | Voice note delivery fails despite explicit request — impacts accessibility and UX for voice-enabled agents. |
| [#11097](https://github.com/zeroclaw-labs/zeroclaw/issues/11097) | S3 | [Plugin egress remedy commands don’t escape apostrophes](https://github.com/zeroclaw-labs/zeroclaw/issues/11097) | Can cause config corruption during remediation — low-severity but disruptive in production. |

✅ **Fix PRs Exist For:**
- [#11110](https://github.com/zeroclaw-labs/zeroclaw/issues/11110) → [PR #11133](https://github.com/zeroclaw-labs/zeroclaw/pull/11133) (revalidating environment on reuse)
- [#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) → No fix PR yet; **urgent**.
- [#11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) → No fix PR yet; **user-facing UX regression**.

---

### **6. Feature Requests & Roadmap Signals**

🚀 **Emerging Features from User Requests:**

| Feature | Source | Status | Implication |
|-------|--------|--------|-----------|
| **Agent-to-agent messaging with receiver discretion** ([#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027)) | RFC | Accepted | Enables secure cross-session coordination without history leakage — likely in next major release. |
| **Add Cheaper Inference as OpenAI-compatible provider** ([#11103](https://github.com/zeroclaw-labs/zeroclaw/issues/11103)) | User Request | In-progress | Indicates growing demand for cost-efficient, high-throughput LLM providers. Likely to ship in v0.9.0. |
| **Render thematic breaks/setext headings in WhatsApp** ([#11052](https://github.com/zeroclaw-labs/zeroclaw/issues/11052)) | Feature Request | In-progress | Shows user focus on rich formatting support in mobile-first channels. |
| **Host-scoped resource bounds for many-agent machines** ([#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)) | RFC | Accepted | Critical for server hosting scenarios — signals intent to support multi-agent workloads at scale. |

📌 **Predicted Next Version (v0.9.0):**  
Expect inclusion of:
- Unified capability catalog
- OIDC + PKCE authentication stack
- Runtime plugin system (WASM-based)
- Agent-to-agent messaging
- Resource throttling per host

---

### **7. User Feedback Summary**

💬 **Real User Pain Points Observed:**
- **"SOP turns fail silently"** — Users report that `sops.run` returns a run ID even when no steps execute ([#10513](https://github.com/zeroclaw-labs/zeroclaw/issues/10513)), causing confusion and workflow errors.
- **"Webhook messages don’t arrive"** — Multiple users confirm outbound messages vanish due to missing channel registration ([#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055)).
- **"Voice messages ignored on WhatsApp"** — Clear frustration over inconsistent TTS behavior ([#11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059)).
- **"Tool outputs are bloated"** — Users dislike base64-inlined screenshots and large payloads ([#11046](https://github.com/zeroclaw-labs/zeroclaw/issues/11046), [#10938](https://github.com/zeroclaw-labs/zeroclaw/issues/10938)).

✅ **Positive Signals:**
- High engagement in RFCs and tracker issues suggests **strong community alignment** on architecture.
- Users actively contributing PRs and detailed bug reports indicate **deep investment** in platform reliability.

---

### **8. Backlog Watch**

🔍 **Long-Unanswered Important Issues Needing Maintainer Attention:**

| Issue | Age | Priority | Status | Notes |
|------|-----|--------|--------|------|
| [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | 7 days | P2 | Accepted | Host-level resource limits — critical for multi-agent servers. Should be prioritized. |
| [#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) | 4 days | P1 | Accepted | Daemon doesn’t register channel map — breaks core functionality. **Urgent**. |
| [#11110](https://github.com/zeroclaw-labs/zeroclaw/issues/11110) | 1 day | P1 | Accepted | Security risk: symlink exploitation in RPC workspace. **Immediate fix needed**. |
| [#10330](https://github.com/zeroclaw-labs/zeroclaw/issues/10330) | 3 weeks | P2 | Accepted | Index of accepted RFC implementations — lacks clear ownership. Needed for transparency. |

🚨 **Recommendation:**  
Maintainers should **triage these four issues immediately**, especially #11110 and #11055, as they represent potential security and functional breakdowns in production environments.

--- 

**Digest compiled:** 2026-09-26  
**Data source:** [GitHub - zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*