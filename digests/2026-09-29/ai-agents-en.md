# OpenClaw Ecosystem Digest 2026-09-29

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-29 02:13 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-29**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active with a surge in developer engagement: **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development momentum. The ecosystem is grappling with critical stability and performance regressions—particularly around memory leaks, crash loops, and session recovery failures—across multiple platforms (Linux, macOS, Windows). While no new releases were issued, the volume of high-severity P0 bugs and ongoing PRs suggests that the team is prioritizing post-2026.9.6 stabilization ahead of the next release cycle. Community collaboration is strong, with frequent cross-issue references and coordinated triage efforts.

---

### **2. Releases**  
❌ **No new releases** were published today.  
The latest stable version remains **2026.9.6**, which has been under scrutiny since its rollout. Multiple users report severe instability, including gateway crash loops, memory exhaustion, and failed updates. No migration notes or breaking changes have been documented for this release, but several issues (#157160, #158095, #159514) indicate deep structural problems in state management, worker lifecycle, and plugin discovery that may require manual intervention or rollback.

> 🔗 [Latest Release: 2026.9.6](https://github.com/openclaw/openclaw/releases/tag/2026.9.6)

---

### **3. Project Progress**  
✅ **181 PRs merged or closed** today, reflecting rapid iteration on core stability and UX improvements. Key advances include:

- **Improved subagent handling**: PRs like [#126924](https://github.com/openclaw/openclaw/pull/126924), [#136554](https://github.com/openclaw/openclaw/pull/136554), and [#136476](https://github.com/openclaw/openclaw/pull/136476) address confusion between child termination and wait expiry, enhancing visibility into subagent lifecycles.
- **UI/UX refinements**: PRs such as [#160747](https://github.com/openclaw/openclaw/pull/160747) improve side-chat comment editing, while [#150446](https://github.com/openclaw/openclaw/pull/150446) fixes broken media file links in workspace projections.
- **Security & dependency hygiene**: PR [#160890](https://github.com/openclaw/openclaw/pull/160890) removes obsolete security review workflows; [#160617](https://github.com/openclaw/openclaw/pull/160617) upgrades `fs-safe` to v0.21.2 for improved filesystem safety.
- **Infrastructure cleanup**: Multiple refactorings (e.g., [#160850](https://github.com/openclaw/openclaw/pull/160850), [#160382](https://github.com/openclaw/openclaw/pull/160382)) are streamlining internal code paths to reduce redundancy and improve maintainability.

These efforts suggest a focus on **stabilizing the runtime**, **improving error visibility**, and **cleaning up technical debt** ahead of future feature work.

---

### **4. Community Hot Topics**  
The most active issues and PRs reflect urgent concerns around **system reliability**, **session integrity**, and **user experience friction**:

| Issue/PR | Comments | Severity | Link | Summary |
|--------|--------|---------|------|--------|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 22 | P0 (Crash Loop) | 🔗 | Gateway reaches "ready" but never serves; event loop starved, RSS climbs until OOM |
| [#157160](https://github.com/openclaw/openclaw/issues/157160) | 12 | P0 (Crash Loop) | 🔗 | Gateway crash-loops after update due to `plugin-doctor-post-session-state` failure |
| [#159514](https://github.com/openclaw/openclaw/issues/159514) | 8 | P0 (Memory Leak) | 🔗 | Model catalog worker leaks ~8MB per request → 1.5–2.5GB/hour |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) | 7 | P0 (Unhandled Rejection) | 🔗 | Gateway crashes during state DB reconciliation with unhandled rejection |
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 15 | P0 (Release Tracker) | 🔗 | Active tracker for fixes between 2026.9.6 and 2026.9.7 |

🔥 **Underlying Need**: Users demand **predictable startup**, **stable session continuity**, and **zero data loss**—especially under load or after updates. Many reports point to **memory leaks**, **state corruption**, and **silent failures** in background workers, suggesting systemic issues in resource management and lifecycle coordination.

---

### **5. Bugs & Stability**  
A wave of **critical stability issues** was reported today, primarily affecting **gateway behavior**, **worker processes**, and **session recovery**:

| Bug | Impact | Severity | Status | Fix PR? |
|-----|--------|----------|--------|--------|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Crash loop, OOM, health probe timeout | 🦞 Diamond Lobster (P0) | Open | ❌ No fix PR |
| [#157160](https://github.com/openclaw/openclaw/issues/157160) | Startup crash-loop after update | 🦞 Diamond Lobster (P0) | Open | ❌ No fix PR |
| [#159514](https://github.com/openclaw/openclaw/issues/159514) | 8MB/request memory leak in model catalog | 🦞 Diamond Lobster (P0) | Closed | ✅ Patched in #159514 |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) | Sawtooth memory growth + 200 critical events/day | 🦪 Silver Shellfish (P0) | Open | ❌ No fix PR |
| [#158095](https://github.com/openclaw/openclaw/issues/158095) | State-lifecycle acquire fails indefinitely | 🦪 Silver Shellfish (P0) | Open | ❌ No fix PR |
| [#156571](https://github.com/openclaw/openclaw/issues/156571) | Disk fill via uncleaned tmp files (1–3 GB/min) | 🦪 Silver Shellfish (P0) | Open | ❌ No fix PR |
| [#157989](https://github.com/openclaw/openclaw/issues/157989) | SSD wear from repeated plugin captures | 🦞 Diamond Lobster (P0) | Open | ❌ No fix PR |

📌 **Critical Insight**: Over **20 P0 issues** are currently open, with **7 directly tied to memory/disk/resource exhaustion**. These are not isolated incidents—they point to **deep architectural flaws in worker lifecycle management, state persistence, and resource isolation**. Despite some patches (e.g., #159514), many remain unresolved.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven feature requests highlight growing demands for **security**, **flexibility**, and **integration depth**:

| Request | Votes | Type | Link | Significance |
|--------|-------|------|------|-------------|
| Add Databricks Unity Gateway as official provider | 0 | Feature | [#155633](https://github.com/openclaw/openclaw/issues/155633) | Signals enterprise adoption interest |
| Onboarding Wizard should include Memory/Embedding setup | 2 | UX | [#16670](https://github.com/openclaw/openclaw/issues/16670) | High usability barrier for persistent agents |
| Talk Mode Idle Timeout / Auto-Deactivation | 1 | UX | [#46844](https://github.com/openclaw/openclaw/issues/46844) | Prevents unnecessary token usage |
| Per-agent tools.alsoAllow should enable browser plugin | 0 | Bug/Feature | [#156864](https://github.com/openclaw/openclaw/issues/156864) | Highlights config inconsistency |
| Support Claude Sonnet 5.5 | 0 | Feature | [#160847](https://github.com/openclaw/openclaw/pull/160847) | Indicates need for timely model updates |

🟢 **Predicted Next Version (2026.9.7)**: Likely to include **model support updates**, **Databricks integration**, **enhanced onboarding**, and **critical stability fixes** for memory leaks and crash loops. The upcoming release will be **highly dependent on resolving current P0 issues**.

---

### **7. User Feedback Summary**  
Real-world user pain points reveal a growing tension between **advanced functionality** and **reliability**:

- **"My gateway crashes every time I update."** – Users report consistent **crash loops after `openclaw update`**, especially from 2026.9.5 → 2026.9.6. (Issues #157160, #156986)
- **"My disk fills up overnight."** – Plugin source capture rewrites cause **~6.5GB per gateway start** and **1–3GB/min** leaks (Issue #157989, #156571).
- **"I lose messages silently."** – Users report **message loss** in multi-agent flows, particularly with Discord, Feishu, and Telegram channels (Issues #157389, #121187).
- **"My sessions vanish without warning."** – Subagents fail to wake parents, tools overwrite shared files, and history resets unexpectedly (Issues #137710, #40001).
- **"It’s impossible to debug what went wrong."** – Lack of clear error messages, misleading `recovered=1`, and silent failures create **opaque failure modes**.

💬 **Sentiment**: Mixed. Power users appreciate advanced features but are frustrated by instability. Newcomers face steep onboarding hurdles due to missing guidance (e.g., embedding setup).

---

### **8. Backlog Watch**  
Several high-impact, long-standing issues require immediate maintainer attention:

| Issue | Age | Severity | Status | Notes |
|------|-----|----------|--------|------|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 3 months | P1 (Zombie Processes) | Open | Leaks child processes → eventual OOM |
| [#40001](https://github.com/openclaw/openclaw/issues/40001) | 6 months | P0 (Data Loss) | Open | Write tool overwrites instead of appending |
| [#127148](https://github.com/openclaw/openclaw/issues/127148) | 2 months | P1 (App-Server Conflict) | Open | Manual compact triggers conflict |
| [#154114](https://github.com/openclaw/openclaw/issues/154114) | 1 week | P0 (Update Failure) | Open | Update fails despite working gateway |
| [#156917](https://github.com/openclaw/openclaw/issues/156917) | 5 days | P0 (Lease Blocker) | Open | One hung client blocks entire gateway startup |

⚠️ **Action Required**: Maintainers must prioritize **P0 issues with fix PRs pending**, especially those blocking updates, causing data loss, or leading to system-wide crashes. Long-pending P1 issues like #97616 and #40001 represent **technical debt** that undermines trust in the platform.

---

### ✅ **Final Assessment: Project Health**
**Status**: ⚠️ **High Risk / Urgent Stabilization Needed**  
While OpenClaw shows strong community engagement and rapid development velocity, **core stability is under severe strain**. A large backlog of P0 bugs—many related to memory, state, and session recovery—threatens usability and adoption. Immediate focus must shift from feature expansion to **resolving critical regressions** before the next release. Without intervention, user confidence and production use cases will erode.

> 🔗 [OpenClaw GitHub Repository](https://github.com/openclaw/openclaw)  
> 🔗 [Recent Activity Dashboard](https://github.com/openclaw/openclaw/issues?q=is%3Aopen+updated%3A2026-09-28)

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-29**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem in Q3 2026 is marked by rapid evolution, intense developer engagement, and growing maturity in both architecture and user expectations. Projects are shifting from experimental prototyping toward production-grade reliability, with a strong emphasis on stability, security, and operational observability. While innovation remains high—especially in agent autonomy, plugin extensibility, and multi-tenant support—core challenges like memory leaks, session integrity, and update reliability are now systemic across the landscape. This reflects a maturing ecosystem where trust and usability are becoming as critical as feature breadth.

---

### **2. Activity Comparison**

| Project       | Issues (Last 24h) | PRs (Last 24h) | Releases Today? | Health Score (10-point) |
|---------------|-------------------|----------------|------------------|--------------------------|
| **OpenClaw**   | 500               | 500            | ❌ No            | ⚠️ 5.0 (High Risk)        |
| **Hermes Agent** | 50                | 50             | ❌ No            | ⚠️ 6.8 (Moderate Risk)    |
| **IronClaw**   | 2                 | 3              | ❌ No            | ✅ 8.2 (Stable & Mature)  |
| **QwenPaw**    | 10                | 17             | ❌ No            | ✅ 7.5 (Healthy Momentum)  |
| **ZeroClaw**   | 50                | 50             | ❌ No            | ⚠️ 6.3 (Growing Risk)     |

> *Note: OpenClaw’s activity levels are an outlier—indicative of a stabilization crisis rather than healthy growth.*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most active project in terms of contributor volume but occupies the highest-risk position due to **systemic instability**. Its technical approach emphasizes deep integration between subagents, state management, and plugin discovery—leading to complex lifecycle coordination issues that manifest as crash loops, memory leaks, and silent data loss. Compared to peers, OpenClaw has a significantly larger community (evidenced by 500+ daily issues), but this scale is now a liability: the volume of P0 bugs (#149538, #157160, #159514) overwhelms triage capacity and erodes trust. Unlike IronClaw or QwenPaw, which prioritize UX polish and incremental refinement, OpenClaw is currently in a **reactive firefighting mode**, struggling to stabilize its core runtime before advancing features.

---

### **4. Shared Technical Focus Areas**  
Multiple projects are converging on several critical requirements:

| Need | Projects Involved | Specific Examples |
|------|-------------------|-------------------|
| **Session & State Integrity** | OpenClaw, Hermes Agent, ZeroClaw | Session loss (#137710), duplicate UI rendering (#123801), resumption bypassing revocation (#11197) |
| **Memory/Disk Resource Management** | OpenClaw, Hermes Agent, QwenPaw | 8MB/request leak (#159514), disk fill via tmp files (#156571), unbounded daemon logs (#9708) |
| **Secure Identity & Access Control** | ZeroClaw, Hermes Agent | Per-sender RBAC (#5982), MCP trust gate failure (#88858) |
| **Robust Update & Deployment Flows** | Hermes Agent, QwenPaw, OpenClaw | Windows update failures (#124807), hard timeouts on skill download (#8013) |
| **Debuggability & Observability** | All five projects | Missing `message_uid`, poor error visibility, lack of audit trails |

These patterns indicate a **common plateau in agent platform maturity**: developers are no longer just building agents—they are building **reliable, auditable, and maintainable systems** at scale.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Feature Focus** | Deep agent orchestration, subagent lifecycle | Session resilience, UI consistency | Long-context model support, benchmark transparency | Context efficiency, self-hosted plugins | Identity, RBAC, multi-tenancy |
| **Target Users** | Power users, researchers, integrators | Developers, early adopters, hybrid teams | Enterprise R&D, legal/technical analysts | Enterprises, air-gapped deployments | Multi-tenant orgs, regulated environments |
| **Architecture** | Monolithic gateway + plugin-heavy | Decoupled TUI/CLI + cloud-aware | Lightweight WebUI v2 + knowledge graph | Console-centric + asset pipeline | Daemon-driven, RPC-first, OIDC-integrated |
| **Key Differentiator** | Scale and complexity | Cross-platform UI parity | Operational clarity & diagnostics | Production readiness & customization | Security-by-design & governance |

> **Notable Insight**: ZeroClaw and IronClaw represent the **emergence of enterprise-grade agent platforms**, while OpenClaw and QwenPaw remain in “feature-rich but fragile” territory.

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Characteristics |
|------|--------|----------------|
| **High-Velocity Iteration (Crises in Progress)** | OpenClaw, Hermes Agent, ZeroClaw | >50 issues/PRs/day; P0 bugs dominate; urgent fixes required; release cycles stalled |
| **Stabilizing & Polishing** | QwenPaw | Moderate activity; targeted bug fixes; preparing for v2.3.0 with clear roadmap |
| **Mature & Foundational** | IronClaw | Low activity, stable core, focus on documentation, observability, and configuration hygiene |

> **Trend**: The ecosystem is bifurcating: **high-momentum, high-risk projects** (OpenClaw, Hermes, ZeroClaw) are driving innovation under duress, while **mature, low-friction projects** (IronClaw) are laying the groundwork for sustainable adoption.

---

### **7. Trend Signals**  
Based on community feedback and development signals, key industry trends emerge:

1. **Shift from "Can it do X?" to "Is it reliable enough for production?"**  
   → Users demand **predictable startup**, **zero data loss**, and **session continuity**—not just new features.

2. **Enterprise Readiness = Self-Hosting + Air-Gapped Support**  
   → High demand for **self-hosted plugin markets** (#8015), **intranet deployment**, and **internal registries** (Tsubasa).

3. **Security & Governance Are Now Non-Negotiable**  
   → Per-sender RBAC (#5982), cost tracking accuracy (#9816), and identity binding (#10573) reflect a move toward **compliance-ready agent systems**.

4. **Observability Is the New UX**  
   → Users want **`message_uid`**, **durable attribution IDs**, **failure taxonomies**, and **debuggable state transitions**—indicating a need for **AI-native observability tooling**.

5. **Update & Deployment Reliability Is a Critical Success Factor**  
   → Persistent failures in `hermes update`, `openclaw update`, and skill downloads highlight that **release hygiene** is now a core product metric.

> 🔑 **Value for Developers**: The next generation of AI agent developers must prioritize **stability, auditability, and configurability** over novelty. Tools that embed **observability, access control, and recovery paths** will lead in adoption.

---

### ✅ **Final Takeaway**  
The personal AI agent ecosystem is transitioning from a phase of explosive feature growth to one of **operational rigor**. While OpenClaw leads in activity, it risks becoming a cautionary tale of scale without stability. Meanwhile, IronClaw and QwenPaw demonstrate how focused, mature engineering can yield trusted platforms. For developers and organizations choosing tools, the signal is clear: **prioritize health score, stability, and observability—not just API richness**. The future belongs not to the most complex system, but to the most predictable and trustworthy.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-29**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 issues and 50 pull requests updated in the past 24 hours—indicating robust community engagement and ongoing development momentum. No new releases were published, suggesting a focus on stabilization and feature refinement ahead of a potential future update. The influx of high-severity bugs (P0–P2), particularly around macOS desktop rendering, Windows update failures, and session state corruption, highlights critical stability concerns across platforms. Meanwhile, PR activity is concentrated on fixing client-side UI/UX issues, improving update resilience, and enhancing session integrity.

---

### **2. Releases**  
❌ **No new releases**  
There are no recent or planned releases as of 2026-09-29. The last known version remains at `v0.21.5` (CLI) and `v0.17.0` (desktop), with the latter showing a persistent version mismatch issue (#68783). Users should expect an upcoming release to address the accumulated bug fixes and compatibility patches before the end of Q3 2026.

> 🔗 [Issue #68783: Desktop app version stuck at 0.17.0](https://github.com/nousresearch/hermes-agent/issues/68783)

---

### **3. Project Progress**  
✅ **Merged & Closed PRs (Today):**  
- [#126344](https://github.com/nousresearch/hermes-agent/pull/126344): Fixes restart-safe cron jobs failing due to missing `ruamel` module, now failing closed instead of silently continuing.  
- [#79510](https://github.com/nousresearch/hermes-agent/pull/79510): Resolves model switching failure in `dashboard.turn_isolation` mode by correctly routing model changes across compute-host boundaries.  
- [#126960](https://github.com/nousresearch/hermes-agent/pull/126960): Prevents automatic model turns after user presses “Stop” in TUI, resolving hang states.  
- [#75707](https://github.com/nousresearch/hermes-agent/pull/75707): Adds recoverable approval IDs for Runs API, enabling clients to safely resume interrupted workflows.  
- [#91963](https://github.com/nousresearch/hermes-agent/pull/91963): Exposes durable attribution IDs (`delegation_id`, `subagent_id`) in delegated task results for auditability and debugging.

These PRs signal strong progress in **session lifecycle management**, **interoperability**, and **resilience under failure**—key pillars for production-grade agent systems.

---

### **4. Community Hot Topics**  
🔥 **Top 3 Most Active Issues (by comment count):**

| Issue | Severity | Summary | Link |
|------|----------|--------|------|
| [#123801](https://github.com/nousresearch/hermes-agent/issues/123801) | P1 | macOS Desktop renders duplicate assistant replies despite single DB row and one completion | [View Issue](https://github.com/nousresearch/hermes-agent/issues/123801) |
| [#126524](https://github.com/nousresearch/hermes-agent/issues/126524) | P2 | Fresh client shows duplicated assistant reply; DB holds one entry, session list double-renders | [View Issue](https://github.com/nousresearch/hermes-agent/issues/126524) |
| [#88858](https://github.com/nousresearch/hermes-agent/issues/88858) | P2 | MCP trust gate fails to detect `readOnlyHint` due to camelCase vs snake_case mismatch → untrusted server unusable | [View Issue](https://github.com/nousresearch/hermes-agent/issues/88858) |

🔍 **Underlying Needs:**  
- **Session consistency**: Users report inconsistent UI rendering despite correct backend state—indicating a deep sync issue between frontend state and backend message persistence.  
- **Trust system reliability**: The MCP trust gate failure reveals a critical gap in tool metadata handling, undermining security assumptions in multi-provider environments.  
- **Cross-platform UX parity**: Both macOS and Windows show regression patterns tied to update flows and process management, signaling a need for platform-agnostic update logic.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs Reported (P0–P2)**  

| Issue | Severity | Description | Fix PR? |
|------|----------|-------------|--------|
| [#123824](https://github.com/nousresearch/hermes-agent/issues/123824) | P0 | V4A `Delete File` on symlink deletes target file; `Move File` renames target | ❌ No fix yet |
| [#126524](https://github.com/nousresearch/hermes-agent/issues/126524) | P2 | Assistant reply renders twice on fresh macOS client | ⚠️ Partially addressed in related #123801 |
| [#124807](https://github.com/nousresearch/hermes-agent/issues/124807) | P2 | Windows `hermes update` fails deleting `libcrypto.dll` due to access denied | ❌ No fix yet |
| [#126655](https://github.com/nousresearch/hermes-agent/issues/126655) | P2 | Cron passes model pin literally—no alias resolution → 404 errors | ✅ PR pending (not merged) |
| [#121095](https://github.com/nousresearch/hermes-agent/issues/121095) | P2 | `browser_exec` leaves stale `browser_harness.daemon` processes running | ❌ No fix yet |

📌 **Stability Risks:**  
- **Update loops on Windows** (#77277, #83211, #124807) suggest fundamental flaws in process locking and cleanup logic.  
- **Persistent background processes** (e.g., daemons, hubs) indicate poor lifecycle management in tools like Hindsight (#121692) and browser exec.  
- **Cloud gateway instability** (#125910): Remote instance `primus-7774.agents.nousresearch.com` has been unresponsive since Sep 27 UTC, affecting users relying on hosted agents.

---

### **6. Feature Requests & Roadmap Signals**  
💡 **Emerging Feature Trends from Open Issues & PRs:**

| Request | Status | Implication |
|-------|--------|------------|
| [#126265](https://github.com/nousresearch/hermes-agent/issues/126265): Stable per-message identity (`message_uid`, tool-call IDs) | Open | Signals demand for **audit trails**, **debugging fidelity**, and **multi-session correlation**—likely a core component of v0.22+. |
| [#126656](https://github.com/nousresearch/hermes-agent/issues/126656): `todo_list` silently accepts invalid params | Open | Highlights need for **input validation** and **explicit error feedback** in tool APIs. |
| [#127200](https://github.com/nousresearch/hermes-agent/pull/127200): Add diff scope selector docs promise | Open | Suggests growing user frustration with **missing documentation** and **UI inconsistency**. |
| [#120882](https://github.com/nousresearch/hermes-agent/issues/120882): Document model update flow & SDK versioning | Closed | Now a known gap—future versions will likely include **comprehensive model lifecycle docs**. |

📈 **Predicted Next Release Features (v0.22):**  
- Persistent, resolvable `message_uid` system for all context engines  
- Improved model alias resolution across cron and sessions  
- Enhanced tool parameter validation with clear error messages  
- Better update diagnostics and recovery paths

---

### **7. User Feedback Summary**  
🗣️ **Real User Pain Points (from Issue Descriptions):**

- **"Desktop app never updates"** – Users on Windows and macOS report failed or infinite update loops, often requiring manual PID kills or full reinstallation (#77277, #124807, #83211).  
- **"Reply appears twice"** – macOS users describe visual glitches where one assistant response duplicates itself, causing confusion and distrust in output accuracy (#123801, #126524).  
- **"Tool fails silently"** – Users report `hindsight` plugin crashes with `No module named 'hindsight'` despite correct setup (#7718), indicating poor error visibility.  
- **"Can't connect to backend"** – Despite healthy gateway logs, macOS desktop shows "Timed out connecting" overlay, requiring full process kill (#98486).  
- **"Wake word doesn’t work remotely"** – Users using remote gateways on macOS cannot trigger wake words via client capture, breaking voice interaction flow (#119089).

🔄 **User Sentiment:** Mixed. High engagement suggests strong interest, but recurring UX and stability issues point to **frustration with reliability** and **lack of transparency** in update and error handling.

---

### **8. Backlog Watch**  
👀 **High-Impact Issues Needing Maintainer Attention:**

| Issue | Priority | Why It Matters | Link |
|------|----------|----------------|------|
| [#123801](https://github.com/nousresearch/hermes-agent/issues/123801) | P1 | Reproducible UI corruption affecting user trust in responses | [View Issue](https://github.com/nousresearch/hermes-agent/issues/123801) |
| [#88858](https://github.com/nousresearch/hermes-agent/issues/88858) | P2 | Security-critical flaw in MCP trust system — breaks untrusted server use case | [View Issue](https://github.com/nousresearch/hermes-agent/issues/88858) |
| [#126265](https://github.com/nousresearch/hermes-agent/issues/126265) | P3 | Fundamental lack of message identity undermines debugging, auditing, and reproducibility | [View Issue](https://github.com/nousresearch/hermes-agent/issues/126265) |
| [#125910](https://github.com/nousresearch/hermes-agent/issues/125910) | P2 | Cloud gateway outage lasting over 24 hours affects public access | [View Issue](https://github.com/nousresearch/hermes-agent/issues/125910) |

📌 **Recommendation:** Prioritize triage of these issues in next sprint. They represent **core trust, stability, and usability barriers** that could deter enterprise adoption if unresolved.

---

✅ **Final Assessment:**  
Hermes Agent is in a **high-intensity development phase** with strong community participation, but faces significant **stability and UX challenges**—especially on Windows and macOS. While many fixes are being delivered rapidly, the backlog of P1/P2 bugs suggests a need for tighter QA and release hygiene. With v0.22 likely imminent, this digest serves as a readiness check for both contributors and users preparing for the next major update.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

---

### **1. Today's Overview**  
As of 2026-09-29, IronClaw continues to demonstrate steady maintenance activity with two new open issues and three recent pull requests updated in the past 24 hours. There are no new releases, indicating a focus on internal refinement rather than feature delivery. The project remains stable, with recent PRs primarily addressing documentation updates, UI routing fixes, and codebase knowledge graph synchronization—suggesting ongoing efforts to improve developer experience and system coherence. No critical regressions or urgent bugs have surfaced, reflecting strong stability in current operations.

---

### **2. Releases**  
*No new releases were published in the last 24 hours.*  
There are currently no release notes, breaking changes, or migration guides to report. The absence of a release cycle suggests that the team is prioritizing foundational improvements over user-facing updates at this stage.

---

### **3. Project Progress**  
The only merged PR today was **#5132**, which resolved a critical edge-case routing issue in the WebUI v2:  
- ✅ **Fix**: Ensures invalid `/chat/:threadId` routes redirect gracefully to `/chat`.  
- ✅ **Improvement**: Prevents premature thread loss during list refresh by waiting for state stabilization.  
- ✅ **User Impact**: Enhances reliability for deep-linked chat sessions, reducing user confusion and broken experiences.  

This fix represents a meaningful improvement in UI robustness and is now live in the main branch.

---

### **4. Community Hot Topics**  
Two high-priority issues dominate community attention, both created today with zero comments but significant technical implications:

- **#8116 [OPEN]** – *Daily ironclaw failure taxonomy — 2026-09-28*  
  🔗 [Issue #8116](https://github.com/nearai/ironclaw/issues/8116)  
  This issue tracks a batch of 31 failing tasks in the `officeqa` benchmark, mostly attributed to genuine model-quality errors (e.g., DeepSeek-V4-Flash misnavigation). It signals growing demand for **failure analysis pipelines** and **benchmark transparency**—users want to distinguish between agent logic flaws vs. model limitations.

- **#8115 [OPEN]** – *Add a Tsubasa registry entry with an explicit 32K context-budget path*  
  🔗 [Issue #8115](https://github.com/nearai/ironclaw/issues/8115)  
  Users are requesting a named provider entry for Tsubasa to simplify configuration. This reflects a recurring pain point: **manual endpoint/model setup is error-prone and opaque**. A standardized registry would reduce friction for developers adopting IronClaw with long-context models.

Both issues highlight a shift toward **operational clarity** and **debuggable AI workflows**, signaling maturity in user expectations.

---

### **5. Bugs & Stability**  
*No active bugs or crashes reported today.*  
All recent PRs are non-breaking and focused on UX/UI polish and infrastructure hygiene. The lack of closed issues related to crashes or failures indicates strong stability in the current build. However, **#8116** indirectly flags a systemic concern: 31 failing QA tasks in a single run suggest potential bottlenecks in model behavior or task execution logic—though not a direct crash, it warrants deeper investigation into failure patterns.

---

### **6. Feature Requests & Roadmap Signals**  
Key roadmap indicators from community input:

- **Tsubasa Registry Integration (#8115)**: A clear signal that users desire **first-class support for long-context models** via a pre-configured provider path. This will likely be prioritized in Q4 2026.
- **Failure Taxonomy System (#8116)**: Indicates rising interest in **AI agent diagnostics and observability tools**. Future versions may include automated failure categorization (model error vs. agent logic flaw), possibly integrated with the codebase-memory graph.

These features align with IronClaw’s mission to become a production-grade agent orchestration platform—not just a prototype toolkit.

---

### **7. User Feedback Summary**  
While direct feedback is limited in the data, indirect insights reveal user priorities:
- Developers struggle with **manual configuration complexity** (especially for Tsubasa), leading to setup friction.
- End-users expect **transparent failure reporting**—they want to know if a failed task stems from poor model performance or flawed agent reasoning.
- There’s a growing appetite for **self-documenting systems**; the repeated bot-generated documentation refreshes (PR #6698) show that the team recognizes the need for up-to-date narratives, even if not yet user-driven.

Overall satisfaction appears high due to stability, but usability gaps remain around configuration and debugging.

---

### **8. Backlog Watch**  
Several high-value items require maintainer attention despite low visibility:

- **#8116** – Failure taxonomy is essential for diagnosing agent quality trends. Without it, improving model selection and agent design becomes speculative.
- **#8115** – A simple registry addition could dramatically lower adoption barriers for advanced use cases (e.g., legal, R&D). This should be fast-tracked.
- **#7988** – While labeled "chore," refreshing the codebase knowledge graph is foundational for future agent autonomy. Its delay could hinder downstream AI reasoning capabilities.

> ⚠️ **Recommendation**: Assign owners to #8116 and #8115 immediately. These are low-effort, high-impact items that directly address user friction and diagnostic needs.

--- 

✅ **Project Health Score: 8.2/10**  
IronClaw shows strong engineering discipline, stable core functionality, and increasing sophistication in user needs. With minor enhancements to configurability and observability, it is poised to transition from experimental framework to enterprise-ready AI agent platform.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-29**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active with a strong momentum in issue and pull request activity: 10 issues updated (7 open, 3 closed), and 17 PRs updated (13 open, 4 merged/closed) within the last 24 hours. This reflects robust community engagement and ongoing development focus on stability, UX polish, and feature expansion. The absence of new releases suggests a pre-release stabilization phase, likely preparing for a minor update post-critical bug fixes. High-priority issues related to context bloat, UI scalability, and plugin flexibility are dominating discussions.

---

### **2. Releases**  
No new releases were published as of 2026-09-29. The latest stable version remains **2.2.2b3**, with recent beta builds (`2.2.2b4`) circulating in the `main` branch. No breaking changes or migration notes are currently documented in release channels.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #8005** (`feat(console): unify interface font scaling`) — Implements consistent font sizing (12px–20px) across the console UI, resolving long-standing accessibility concerns.  
- ✅ **PR #7956** (`feat(console): unify settings UX and smooth conversation transitions`) — Enhances consistency in settings panel design, reduces visual flicker during chat switching.  
- ✅ **PR #7965** (`fix(context): reclaim historical media in Scroll and align thinking omission with token counting`) — Addresses core context management flaw by improving media reclamation logic, directly mitigating issue #7853.  
- ✅ **PR #7953** (`fix(portability): preserve actionable per-asset import failures`) — Ensures failed asset imports retain diagnostic information, improving debugging for users.

These merges signal a focused effort on **UI/UX consistency**, **context efficiency**, and **error resilience**.

---

### **4. Community Hot Topics**  
The most active topics revolve around **critical system stability** and **user-centric customization**:

- 🔥 **Issue #8015** ([Support custom Skill/Plugin market sources](https://github.com/agentscope-ai/QwenPaw/issues/8015)) — Opened today, already highlighting demand for air-gapped/intranet deployment support. A top signal for enterprise adoption.
- 🔥 **Issue #8013** ([Download timeout on large skills](https://github.com/agentscope-ai/QwenPaw/issues/8013)) — Frontend 30-second timeout prevents successful skill transfer; impacts usability for complex tools like `ppt-master`. High visibility due to real-world impact.
- 🔥 **Issue #8011** ([Telegram HTML formatter mishandles code fences](https://github.com/agentscope-ai/QwenPaw/issues/8011)) — Reports syntax parsing errors in model outputs, affecting content fidelity in Telegram channel integrations.

**Underlying Needs:**  
Users are demanding **greater control over deployment environments** (self-hosted markets), **reliability under heavy payloads**, and **correct rendering of structured outputs**—indicating a shift from basic functionality toward production-grade reliability.

---

### **5. Bugs & Stability**  
| Severity | Issue | Summary | Fix PR? |
|---------|-------|--------|--------|
| ⚠️ Critical | [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) | `ToolResultPruner` skips base64 image data → infinite context bloat → session crashes | ✅ **PR #7965** (merged) – Fixes media reclaim logic |
| ⚠️ Critical | [#8009](https://github.com/agentscope-ai/QwenPaw/issues/8009) | Oversized image rejection kills session permanently | ✅ **PR #8010** (open) – Proposes recovery from media rejections |
| ⚠️ High | [#8013](https://github.com/agentscope-ai/QwenPaw/issues/8013) | 30s frontend timeout blocks large skill downloads | ❌ No fix yet – needs backend streaming or timeout extension |
| ⚠️ High | [#8011](https://github.com/agentscope-ai/QwenPaw/issues/8011) | Telegram formatter breaks on C++/Objective-C code fences | ✅ **PR #8012** (open) – Fixes regex handling |

> 💡 **Note**: Two critical bugs (#7853, #8009) have direct PRs addressing them, showing rapid response. However, the lack of resolution for #8013 and #8011 indicates potential bottlenecks in testing or integration.

---

### **6. Feature Requests & Roadmap Signals**  
Key future directions emerging from user input:

- 📌 **Self-hosted Plugin Marketplace** ([#8015](https://github.com/agentscope-ai/QwenPaw/issues/8015)) — Strong demand for internal/air-gapped deployments. Likely candidate for **v2.3.0**.
- 📌 **Customizable Font Scaling** ([#7999](https://github.com/agentscope-ai/QwenPaw/issues/7999)) — Already implemented via PR #8005; may be included in next patch.
- 📌 **Model-Specific Thinking Controls** ([#7990](https://github.com/agentscope-ai/QwenPaw/issues/7990)) — Missing `thinking_param_style` for Aliyun Token Plan models; should be added to `model_catalog.json` in upcoming version.
- 📌 **Durable Chat History** ([#7931](https://github.com/agentscope-ai/QwenPaw/pull/7931)) — Long-term persistence feature with SQLite storage; signals move toward offline-first, high-reliability workflows.

> 🔮 **Predicted Next Release (v2.3.0)**: Will likely include self-hosted plugin support, durable chat history, and enhanced context management.

---

### **7. User Feedback Summary**  
Real pain points expressed by users:
- **Accessibility**: Users with vision impairments or high-DPI screens need scalable UI ([#7999](https://github.com/agentscope-ai/QwenPaw/issues/7999)).
- **Reliability**: Large skill downloads fail due to hard timeouts ([#8013](https://github.com/agentscope-ai/QwenPaw/issues/8013)), reducing trust in tool distribution.
- **Production Readiness**: Enterprises require air-gapped solutions ([#8015](https://github.com/agentscope-ai/QwenPaw/issues/8015)), indicating growing professional use.
- **Content Fidelity**: Code formatting issues in Telegram break communication clarity ([#8011](https://github.com/agentscope-ai/QwenPaw/issues/8011)).

> Overall satisfaction is moderate but strained by technical debt in edge cases—users appreciate progress but expect more robustness.

---

### **8. Backlog Watch**  
High-priority items needing maintainer attention:

- 🔴 **[Issue #7991](https://github.com/agentscope-ai/QwenPaw/issues/7991)** – Zombie task entries inflate `running_task_count`, causing dashboard/API misalignment. Despite being open since 2026-09-26, no PR has been linked. Urgent for accurate status reporting.
- 🔴 **[Issue #8002](https://github.com/agentscope-ai/QwenPaw/issues/8002)** – Windows auto-mode allows dangerous COM calls to close PowerPoint. Security risk with sandbox off. No fix PR yet despite severity.
- 🔴 **[PR #7931](https://github.com/agentscope-ai/QwenPaw/pull/7931)** – Durable transcript history. Well-designed, but stalled at review stage. Could become a cornerstone of v2.3.

> These items represent **systemic risks** (data inconsistency, security, persistence) that could hinder enterprise adoption if unresolved.

---

**Summary Status**: ✅ **Healthy Development Momentum**  
QwenPaw is actively evolving with strong community contributions and targeted fixes to critical stability issues. Focus areas for v2.3.0: **enterprise readiness**, **context management**, and **user customization**. Maintain attention on backlog items to prevent regressions.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-29  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active with 50 new issues and 50 new pull requests in the last 24 hours, indicating strong momentum in both feature development and issue triage. Activity is concentrated in core security, identity/access control, runtime stability, and gateway configuration—particularly around OIDC integration, RBAC enforcement, and cost tracking. No new releases have been published, suggesting a focus on internal refinement ahead of v0.9.0. The community is actively shaping the future of agent autonomy, plugin architecture, and secure multi-tenant deployment patterns.

---

### **2. Releases**  
❌ **No new releases** were published today.  
The project continues to operate without a public release since v0.8.5, with ongoing efforts focused on improving release efficiency (see [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814)) and reducing build overhead. Maintainers are prioritizing reliability and repeatability over frequency.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **[PR #11131](https://github.com/zeroclaw-labs/zeroclaw/pull/11131)**: *feat(runtime): own the observer event firehose in the daemon* – Now the daemon fully manages observer events even when the gateway is offline, enabling consistent logging across RPC clients like zerocode and TUI.
- ✅ **[PR #11080](https://github.com/zeroclaw-labs/zeroclaw/pull/11080)**: *test(providers): keep Hailo connect-failure test platform-independent* – Fixed macOS-specific test failure, improving CI reliability.

**Key Features Advanced:**  
- **RPC parity** for `config`, `cron`, `memory`, `skills`, and `quickstart` routes is progressing via stacked PRs ([#11176](https://github.com/zeroclaw-labs/zeroclaw/pull/11176), [#11172](https://github.com/zeroclaw-labs/zeroclaw/pull/11172)).
- **Plugin-owned Kanban boards** are nearing completion after foundational state persistence landed ([#11081](https://github.com/zeroclaw-labs/zeroclaw/pull/11081)).
- **Per-sender RBAC** for multi-tenant agents is now under active implementation ([#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)).

---

### **4. Community Hot Topics**  
| Issue / PR | Comments | Link | Summary |
|-----------|--------|------|--------|
| **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** | 12 | [RFC: Simplify RFC voting](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | Proposal to eliminate mandatory discussion windows and let `REVISE` stop snapshots—reflecting frustration with process friction in governance. |
| **[#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)** | 10 | [Per-sender RBAC for multi-tenant deployments](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) | High-priority security need from enterprise users; demands granular access control at sender level. |
| **[#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)** | 9 | [Plugin-owned Kanban board for agent work](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) | Suggests growing demand for self-managed workflows within plugins—indicating shift toward plugin-centric autonomy. |

> 🔍 **Underlying Need**: Users are pushing for **decentralized control**, **fine-grained access**, and **streamlined contributor processes**—especially as ZeroClaw scales toward complex agent ecosystems.

---

### **5. Bugs & Stability**  
| Severity | Issue | Link | Status | Fix PR? |
|---------|------|------|--------|--------|
| **S0 - Data Loss / Security Risk** | [#11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197) | Session resume restores forwarded environment after admin revocation | Open | ❌ |
| **S0 - Data Loss / Security Risk** | [#11136](https://github.com/zeroclaw-labs/zeroclaw/issues/11136) | Concurrent file_edit/file_write silently drops edits | Open | ❌ |
| **S1 - Degraded Behavior** | [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) | Anthropic provider reports $0.00 spend → budget caps never trigger | Open | ❌ |
| **S1 - Degraded Behavior** | [#10887](https://github.com/zeroclaw-labs/zeroclaw/issues/10887) | Non-vision capability gate fails turn on image markers | Open | ❌ |
| **S2 - Degraded Behavior** | [#9708](https://github.com/zeroclaw-labs/zeroclaw/issues/9708) | Daemon logs unbounded → disk exhaustion risk | Open | ❌ |

> ⚠️ **Critical Concerns**: Multiple high-severity bugs related to **data integrity**, **cost accounting**, and **access control bypasses** remain open. These represent significant risks for production use.

---

### **6. Feature Requests & Roadmap Signals**  
| Request | Priority | Key Themes | Likely Inclusion |
|-------|--------|----------|----------------|
| **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** | P2 | Streamline RFC process | ✅ Likely in v0.9.0 |
| **[#10573](https://github.com/zeroclaw-labs/zeroclaw/issues/10573)** | P2 | Bind pairing tokens to roster users | ✅ Core to v0.9.0 identity model |
| **[#10171](https://github.com/zeroclaw-labs/zeroclaw/issues/10171)** | P2 | Preserve provider profile semantics | ✅ Critical for multi-provider consistency |
| **[#10407](https://github.com/zeroclaw-labs/zeroclaw/issues/10407)** | P2 | Persistent session prompt attachments | ✅ High user demand, low risk |

> 📌 **Roadmap Signal**: v0.9.0 is clearly targeting **gateway separation**, **identity consolidation (OIDC + roster binding)**, and **runtime stability**. Plugin-driven workflows and persistent state are becoming central.

---

### **7. User Feedback Summary**  
- **Pain Points**:  
  - **Cost tracking failures** (Anthropic provider reporting $0.00) undermine trust in budget controls ([#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)).  
  - **Session resumption bypassing admin revocation** creates serious security gaps ([#11197](https://github.com/zeroclaw-labs/zeroclaw/issues/11197)).  
  - **Concurrent file edits silently dropped** pose real data loss risk ([#11136](https://github.com/zeroclaw-labs/zeroclaw/issues/11136)).  

- **Use Cases**:  
  - Multi-tenant agent deployments requiring per-sender access control ([#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)).  
  - Long-running sessions needing durable prompt history and context preservation ([#10407](https://github.com/zeroclaw-labs/zeroclaw/issues/10407)).  

- **Satisfaction**: Users appreciate improvements in plugin extensibility and RPC parity but express concern over unresolved security and cost issues.

---

### **8. Backlog Watch**  
| Issue | Age | Priority | Status | Notes |
|------|-----|--------|--------|------|
| **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** | 27 days | P2 | Accepted, In-Progress | Needs final decision on removing discussion windows — critical for dev velocity. |
| **[#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)** | 160 days | P2 | Accepted, In-Progress | Still awaiting full implementation despite design approval. |
| **[#8832](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)** | 113 days | P2 | Accepted, In-Progress | Delayed due to dependency on generic state persistence — now resolved. |
| **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)** | 112 days | P2 | Accepted, In-Progress | Master tracker for v0.8.6/v0.9.0 delivery — needs active coordination. |

> 🕵️‍♂️ **Maintenance Note**: Several accepted, long-standing issues lack clear ownership or progress updates. Prioritization and task assignment are needed to avoid stagnation.

---

**Final Assessment**:  
ZeroClaw is in a **high-growth phase** with robust community engagement and strategic technical direction. However, **security and stability risks are mounting**—especially around access control, data integrity, and cost tracking. The team must prioritize closing high-severity bugs while accelerating the rollout of v0.9.0’s foundational features. Without timely fixes, adoption in production environments may be hindered.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*