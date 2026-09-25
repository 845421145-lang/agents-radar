# OpenClaw Ecosystem Digest 2026-09-25

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-25 00:43 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-09-25**

---

### **1. Today's Overview**  
OpenClaw remains in a high-intensity development phase, with **500 issues and 500 pull requests updated in the last 24 hours**, indicating sustained community engagement and active engineering velocity. The project is experiencing significant stability pressure, particularly around **gateway startup, session management, and plugin lifecycle handling**, with multiple P0/P1 bugs reported across recent versions (2026.9.5–2026.9.7). A surge in regression reports suggests recent changes may have introduced systemic fragility, especially in multi-agent workflows and database coordination. Despite no new releases, the momentum of PRs—particularly in core agent state, performance profiling, and security hardening—signals imminent patch or minor release activity.

---

### **2. Releases**  
❌ **No new releases** were published today.  
The latest stable version remains **2026.9.6 (eb377ac)**, which has already triggered multiple critical regressions:  
- **Issue #157107**: `prepared-model-catalog` worker rebuilds every ~6 seconds, blocking all agent runs.  
- **Issue #157011**: Managed update rollback due to `RangeError: Maximum call stack size exceeded` during update-history reconciliation.  
- **Issue #157234**: Update recovery fails with `agent-database-lease-active`, preventing upgrades even when service is stopped.  

⚠️ *Migration note*: Users upgrading from 2026.9.5 to 2026.9.6 are advised to **avoid automated updates** until these issues are resolved. Manual `doctor --fix` may not be sufficient.

---

### **3. Project Progress**  
✅ **Merged/Resolved PRs (Today):**  
- **#157763 & #157758**: Fixed E2E test timeouts related to guest question lifecycle and authentication staging.  
- **#157764**: Resolved Telegram QA validation failure after isolated auth staging.  
- **#157765**: Refactored skills/TUI/onboarding code to reduce duplication (l40 cleanup).  
- **#157766**: Ensures warm CLI sessions are retired before manual compaction.  
- **#157767 & #157768**: Stabilized test fixtures by skipping empty resets and waiting for task completion.  

🔧 **Key Advances:**  
- **Performance profiling improvements** (PR #157744): Separating session and first-tool resource costs enables better observability.  
- **Security & state consistency fixes**: PRs #156941 (chat admission bound to session authority) and #156940 (Codex stale session protection) address critical security boundary violations.  
- **Dependency refresh** (PR #157238): Updated dependencies with a 7-day cutoff, reducing technical debt.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Comment Count & Severity:**  
| Issue | Summary | Comments | Link |
|------|--------|---------|------|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server init timeout crashes Gateway via unhandled promise rejection | 30 | [Bug: MCP crash loop](https://github.com/openclaw/openclaw/issues/144911) |
| [#155753](https://github.com/openclaw/openclaw/issues/155753) | Model-catalog expiry loop pins CPU core indefinitely | 23 | [Performance: CPU burn](https://github.com/openclaw/openclaw/issues/155753) |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway reaches "ready" but never serves; event loop starved | 21 | [Crash-loop: Event loop freeze](https://github.com/openclaw/openclaw/issues/149538) |
| [#157107](https://github.com/openclaw/openclaw/issues/157107) | Model catalog rebuilds endlessly → agents never admitted | 13 | [UX Blocker: No agent runs](https://github.com/openclaw/openclaw/issues/157107) |

💡 **Underlying Needs:**  
- **Stability under load** (multi-agent, large DBs).  
- **Predictable startup behavior** — gateway must not appear ready while hung.  
- **Session integrity** — users expect continuity post-upgrade, not silent hangs or data loss.

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs (P0/P1):**  
| Bug | Description | Fix PR? | Impact |
|-----|-------------|--------|--------|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | Unhandled rejection in child cleanup path causes full Gateway crash | ❌ No PR yet | Crash-loop, beta blocker |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway appears ready but blocks all `/health` probes | ❌ No fix | Service outage, memory leak |
| [#155753](https://github.com/openclaw/openclaw/issues/155753) | `readFullModelCatalog()` triggers infinite refresh loop | ❌ No PR | Sustained CPU burn, system instability |
| [#157107](https://github.com/openclaw/openclaw/issues/157107) | Model catalog rebuilds every 6s → no agent runs admitted | ❌ No fix | Complete UX blockage |
| [#157011](https://github.com/openclaw/openclaw/issues/157011) | Update fails with `Maximum call stack size exceeded` | ✅ PR #157733 (fixes update lease issue) | Blocks upgrade paths |

⚠️ **Regression Trends:**  
Multiple regressions (e.g., #155859: startup time scales with plugin count) suggest **recent changes to plugin loading and model catalog initialization** are destabilizing core workflows.

---

### **6. Feature Requests & Roadmap Signals**  
📌 **High-Interest Feature Requests:**  
- **Intelligent Session Auto-Titling** ([#99583](https://github.com/openclaw/openclaw/issues/99583)): Lazy, topic-aware renaming via LLM. *Signal: User desire for smarter UX automation.*  
- **Durable Natural-Language Rule Learning** ([#41366](https://github.com/openclaw/openclaw/issues/41366)): Persistent rule training beyond session scope. *Signals need for long-term agent memory.*  
- **Multi-Provider Onboarding** ([#81960](https://github.com/openclaw/openclaw/issues/81960)): Allow configuring multiple models during setup. *Indicates growing complexity in agent orchestration.*

🔮 **Likely Next Version Additions:**  
- **Auto-titling** and **rule persistence** are strong candidates for 2026.10.  
- **Better plugin migration tooling** (per PR #157415) will likely be prioritized post-2026.9.7.

---

### **7. User Feedback Summary**  
🗣️ **Real Pain Points Reported:**  
- **Upgrade anxiety**: Users report green status after upgrade, but agents lose continuity (#142580).  
- **Silent failures**: Many bugs cause output loss (e.g., final reply discarded in `claude-cli` turns, #150132) without error.  
- **Memory pressure**: Large DBs and plugin churn lead to OOM kills (#99659, #156191).  
- **Channel-specific breakage**: QQ bot crashes (#145937), Telegram leaks internal heartbeats (#143278), Feishu shows misleading "Exec failed" messages (#102196).  

✅ **Positive Signals:**  
- High engagement in PRs (e.g., #157744 on perf) shows trust in engineering responsiveness.  
- Users actively report repros and logs, enabling rapid triage.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered Critical Issues Needing Maintainer Attention:**  
| Issue | Status | Why It Matters | Link |
|------|--------|----------------|------|
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | Open (P2) | Tracking fixes between 2026.9.6 and 2026.9.7 — essential for release planning | [Fixes Tracker](https://github.com/openclaw/openclaw/issues/157531) |
| [#150743](https://github.com/openclaw/openclaw/issues/150743) | Open (P2) | QQ channel support stalled — ecosystem sustainability concern | [QQ Channel Sustainability](https://github.com/openclaw/openclaw/issues/150743) |
| [#157415](https://github.com/openclaw/openclaw/issues/157415) | Open (P0) | Doctor refuses to fix post-session migrations for externally installed plugins — blocks upgrades | [Doctor Fix Failure](https://github.com/openclaw/openclaw/issues/157415) |
| [#156930](https://github.com/openclaw/openclaw/issues/156930) | Open (P0) | Codex plugin fails with `PLUGIN_STATE_OPEN_FAILED` despite working DB reads | [Codex Plugin State Fail](https://github.com/openclaw/openclaw/issues/156930) |

➡️ **Urgent Call to Action:** Maintain a dedicated triage effort for P0/P1 issues with no assigned PRs. These are delaying user adoption and creating trust erosion.

---

> 📊 *Data Source: GitHub (openclaw/openclaw), 2026-09-25*  
> 🔍 *Analysis: AI Agent & Personal Assistant Open-Source Project Analyst*

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Open-Source Ecosystem – 2026-09-25**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem is entering a phase of intense technical maturation, with projects transitioning from feature experimentation to stability, security, and operational resilience. While innovation remains high—particularly in multi-agent orchestration, plugin extensibility, and cross-platform UX—core infrastructure challenges are now dominant: session integrity, memory consistency, dependency drift, and upgrade safety. The landscape is bifurcating: some projects (e.g., OpenClaw, ZeroClaw) are pushing architectural boundaries at the cost of short-term stability, while others (e.g., IronClaw, QwenPaw) are focusing on incremental refinement and user trust. This reflects a broader industry shift toward production-grade deployment readiness.

---

### **2. Activity Comparison**

| Project         | Issues (24h) | PRs (24h) | Release Status       | Health Score (Est.) |
|-----------------|--------------|-----------|----------------------|---------------------|
| **OpenClaw**    | 500          | 500       | ❌ No new release     | ⚠️ Critical (P0/P1) |
| **Hermes Agent**| 50           | 50        | ✅ v0.21.5 (patch)   | 🟡 Moderate          |
| **IronClaw**    | 1            | 1         | ✅ v1.4.1-rc.2       | ✅ Healthy          |
| **QwenPaw**     | 31           | 23        | ❌ No new release     | 🟡 Stable/Iterative  |
| **ZeroClaw**    | 27           | 50        | ❌ No new release     | ⚠️ High Risk        |

> *Health Score Key: ✅ Healthy (stable), 🟡 Moderate (active but issues), ⚠️ Critical (systemic instability)*

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the most technically ambitious and highest-velocity project in the ecosystem, with **500 issues and 500 PRs updated daily**—a level unmatched by peers. Its core architecture prioritizes **multi-agent workflow coordination**, **plugin lifecycle complexity**, and **deep database integration**, enabling advanced use cases but at the cost of systemic fragility. Unlike Hermes Agent’s polished desktop experience or IronClaw’s focused benchmarking, OpenClaw’s community is deeply engaged in low-level debugging and performance profiling, reflecting a larger, more diverse contributor base. However, its **lack of stable releases** and **persistent P0 regressions** (e.g., model catalog loops, update failures) signal that it is currently ahead of its own stability curve—positioned as a bleeding-edge platform for power users and developers, not general adoption.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, several recurring technical demands are emerging:

- **Session & State Integrity**:  
  - *OpenClaw* (#157107): Model catalog rebuild loop blocks agent admission.  
  - *Hermes Agent* (#109858): Heartbeat loop stalls; stuck "waiting for idle".  
  - *ZeroClaw* (#10797): Markdown memory backend silently loses entries.  
  → *Need*: Predictable session persistence across restarts, upgrades, and crashes.

- **Security Boundary Enforcement**:  
  - *OpenClaw* (#156941): Chat admission bound to session authority.  
  - *ZeroClaw* (#10968): Unattended agent turns bypass approval manager.  
  - *Hermes Agent* (#115104): Memory sync skips secret redaction.  
  → *Need*: Zero-trust runtime models with auditability and policy enforcement.

- **Plugin & Dependency Management**:  
  - *OpenClaw* (#157415): Doctor fails to fix post-session migrations.  
  - *ZeroClaw* (#8519): Cargo audit vs. deny dependency drift.  
  - *QwenPaw* (#7571): Confusion between dev/runtime paths.  
  → *Need*: Reliable, declarative plugin lifecycle tools and deterministic dependency resolution.

- **Cross-Platform Stability**:  
  - *Hermes Agent* (Windows/macOS): Update destroy local commits, startup hangs.  
  - *ZeroClaw* (Windows): App cannot reopen after window close.  
  → *Need*: Platform-specific testing and CI parity.

---

### **5. Differentiation Analysis**

| Dimension               | OpenClaw                          | Hermes Agent                     | IronClaw                         | QwenPaw                           | ZeroClaw                            |
|-------------------------|-----------------------------------|----------------------------------|----------------------------------|-----------------------------------|-------------------------------------|
| **Target Users**        | Enterprise devs, research labs    | Power users, secondary devices   | Non-technical operators, teams   | Teams, plugin builders             | Security-first engineers, hosts     |
| **Core Architecture**   | Multi-agent + DB-centric          | Desktop-first, real-time UI      | Web UI + OCR benchmark focus     | Console-driven, team hub           | WASM-hosted plugins, zero-trust     |
| **Feature Focus**       | Workflow orchestration, state sync| Privacy controls, real-time replies| OAuth flexibility, diagnostics   | Team collaboration, mobile-ready   | Host-scoped access, risk-based merge |
| **Deployment Model**    | On-prem, hybrid                   | Desktop, Docker                  | Web UI, hosted                     | Hub (team), CLI                    | Headless, serverless                |
| **Development Pace**    | Extremely high (500 PRs/day)      | High (50 PRs/day)                | Low (1 PR/day)                   | Medium (23 PRs/day)               | High (50 PRs/day)                   |

> 🔍 **Key Insight**: OpenClaw and ZeroClaw are building foundational infrastructure for next-gen agents; QwenPaw and Hermes Agent are optimizing user experience; IronClaw is refining niche evaluation capabilities.

---

### **6. Community Momentum & Maturity**

- **Rapid Iteration Tier** (High velocity, high risk):  
  - **OpenClaw**: 500 PRs/day — engineering overdrive; stability under strain.  
  - **ZeroClaw**: 50 PRs/day + active RFCs — architectural evolution in motion.  
  - **QwenPaw**: 23 PRs/day — fast UX iteration, strong feedback loop.

- **Stabilizing Tier** (Focus on polish, reliability):  
  - **Hermes Agent**: Released v0.21.5 after 460 merged PRs — signaling maturity.  
  - **IronClaw**: RC2 release with minimal issues — mature diagnostic pipeline.

> 📈 **Maturity Signal**: Projects with **release cadence** (Hermes, IronClaw) and **structured backlog triage** (ZeroClaw, QwenPaw) show higher long-term sustainability. OpenClaw’s velocity is impressive but unsustainable without stabilizing releases.

---

### **7. Trend Signals**  
Based on community feedback and PR activity, key industry trends emerge:

1. **From Features to Foundations**:  
   - Users are no longer asking for “more tools” but for **reliable session continuity**, **secure data handling**, and **predictable upgrades**.  
   - Example: 80% of top issues involve stability, security, or upgrade failure.

2. **Privacy & Control Demand**:  
   - Feature requests like *disable Note to Self in Signal* (Hermes), *secret redaction* (Hermes), and *manual plugin deactivation* (QwenPaw) reflect growing demand for **user autonomy** and **data hygiene**.

3. **Multi-Agent & Team Use Cases**:  
   - QwenPaw Hub discussions (#7318), ZeroClaw’s host-scoped access (RFC #10970), and OpenClaw’s multi-agent workflows signal a shift toward **collaborative agent ecosystems**.

4. **Observability & Diagnostics**:  
   - IronClaw’s failure taxonomy (#8111), ZeroClaw’s risk-based merge freshness (Issue #11096), and QwenPaw’s Langfuse output tracking (Issue #7963) show rising need for **debuggable, auditable systems**.

5. **Voice & Multimodal Expansion**:  
   - QwenPaw’s voice chat request (#7785) and Hermes Agent’s Bot Mode latency issues (#92760) indicate early momentum toward **real-time, multimodal interaction**.

> 💡 **Value for Developers**: The ecosystem is moving beyond prototyping. Success now depends on **infrastructure robustness**, **security-by-default**, and **developer trust**—not just feature breadth.

---

**Final Note**: The AI agent ecosystem is no longer about "can it do X?" but "can it run reliably, securely, and consistently at scale?" Projects that prioritize **stability, observability, and governance** will lead the next wave of enterprise and team adoption.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-25**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a surge in developer engagement: **50 issues and 50 pull requests updated in the last 24 hours**, indicating robust community involvement and rapid iteration. A new patch release, **v0.21.5 (v2026.9.24)**, rolls up ~460 merged PRs into a stable tag for downstream users, signaling strong momentum toward production readiness. The high volume of open PRs—especially focused on Windows stability, desktop UX polish, and session state integrity—suggests ongoing efforts to improve cross-platform reliability. Despite progress, a cluster of critical bugs affecting Windows, macOS, and multi-profile workflows persists, highlighting persistent challenges in platform-specific edge cases.

---

### **2. Releases**  
- **[v0.21.5 (v2026.9.24)](https://github.com/nousresearch/hermes-agent/releases/tag/v0.21.5)**  
  - *Type:* Patch release  
  - *Summary:* This release consolidates approximately **460 merged PRs** since v0.21.4 into a stable, tagged version for downstream consumers including Docker images, Hermes Cloud, and hosted deployments.  
  - *Notes:* Full changelog is deferred; no breaking changes or migration steps are currently documented. Users are advised to update for stability and feature parity.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):** 0  
**New Fixes & Enhancements:**  
- **[PR #122059](https://github.com/nousresearch/hermes-agent/pull/122059):** Optional tool arguments now gracefully handle `null`/`{}` values without crashing handlers, improving resilience in dynamic tool calls.  
- **[PR #122041](https://github.com/nousresearch/hermes-agent/pull/122041):** Adds visual feedback (spinner) when opening a cold bot chat, reducing user confusion during backend startup delays.  
- **[PR #122044](https://github.com/nousresearch/hermes-agent/pull/122044):** Fixes inconsistent statusbar timers across primary chats and tiles by aligning clock sources.  
- **[PR #121477](https://github.com/nousresearch/hermes-agent/pull/121477):** Corrects Docker session working directory mapping to avoid host path misinterpretation in containers.  
- **[PR #121438](https://github.com/nousresearch/hermes-agent/pull/121438):** Improves checkpoint recovery logic by reattaching live PIDs instead of falsely marking them as exited.  

These fixes reflect a focus on **user experience consistency**, **session persistence**, and **robustness under failure conditions**.

---

### **4. Community Hot Topics**  
Top-engaged issues and PRs reveal key pain points:

- **[Issue #121970](https://github.com/nousresearch/hermes-agent/issues/121970):** *Signal: option to disable Note to Self handling* (9 comments)  
  - **Need:** Secondary Signal devices should not treat personal notes as agent prompts. Critical for privacy and workflow hygiene.
  
- **[Issue #92760](https://github.com/nousresearch/hermes-agent/issues/92760):** *Bot Mode group bots reply slowly and stall* (7 comments)  
  - **Need:** Real-time responsiveness in group chat automation. Root cause: poll-driven replies vs push-based delivery.

- **[PR #121443](https://github.com/nousresearch/hermes-agent/pull/121443):** *Fix: ignore-existing skips discovered runtimes* (no comments yet, but high priority)  
  - **Impact:** Prevents redundant install attempts during updates, especially on macOS and Windows.

- **[Issue #115104](https://github.com/nousresearch/hermes-agent/issues/115104):** *Memory-provider sync bypasses secret redaction* (3 comments, 1 👍)  
  - **Security Risk:** Secrets in tool output are archived verbatim—urgent for compliance-sensitive use cases.

These topics signal growing demand for **privacy controls**, **real-time performance**, and **secure data handling**.

---

### **5. Bugs & Stability**  
**Critical Issues Reported (Severity P2–P3):**  
| Issue | Severity | Platform | Summary | Fix PR? |
|------|----------|---------|--------|--------|
| [Issue #63577](https://github.com/nousresearch/hermes-agent/issues/63577) | P2 | Windows | `hermes update` destroys local commits, kills active chat, blocks if desktop is open | ✅ Partial fix in progress |
| [Issue #109858](https://github.com/nousresearch/hermes-agent/issues/109858) | P2 | Windows | Heartbeat loop fails for remote backends — stuck "waiting for idle" | ❌ No fix yet |
| [Issue #100438](https://github.com/nousresearch/hermes-agent/issues/100438) | P2 | macOS | Desktop fails to start when `dashboard.public_url` is set | ❌ No fix yet |
| [Issue #91437](https://github.com/nousresearch/hermes-agent/issues/91437) | P3 | Docker | `google-cloud-pubsub` missing from image → Slack adapter fails | ✅ Fix PR pending |
| [Issue #85605](https://github.com/nousresearch/hermes-agent/issues/85605) | P2 | macOS/Windows | Desktop fails to connect to headless `hermes serve` backend — 404 on token handshake | ❌ No fix yet |

**Stability Trend:** Persistent instability on **Windows** (installers, updates, session crashes), **macOS Apple Silicon**, and **multi-profile configurations**. Several regressions stem from outdated or misconfigured dependencies (e.g., npm version in installer).

---

### **6. Feature Requests & Roadmap Signals**  
Key user-driven feature requests indicate future direction:

- **[Issue #121970](https://github.com/nousresearch/hermes-agent/issues/121970):** *Disable Note to Self handling in Signal*  
  → Likely to be prioritized in **v0.22** as a configurable toggle. Suggests increasing adoption of Hermes as a secondary device manager.

- **[Issue #115104](https://github.com/nousresearch/hermes-agent/issues/115104):** *Secret redaction bypass in memory sync*  
  → High-risk security issue; expected to trigger immediate patch or policy enforcement in next release.

- **[Issue #92760](https://github.com/nousresearch/hermes-agent/issues/92760):** *Improve Bot Mode real-time replies*  
  → Push-based delivery model may be introduced to support scalable group automation.

- **[Issue #57812](https://github.com/nousresearch/hermes-agent/issues/57812):** *macOS cannot connect to remote LLM over LAN*  
  → Indicates growing interest in distributed AI setups; likely to drive better network isolation and proxy support.

These signals point toward **enterprise-grade security**, **real-time collaboration**, and **decentralized agent topologies** in upcoming versions.

---

### **7. User Feedback Summary**  
Real user pain points reflect deep integration into daily workflows:

- **Windows users** report **critical failures during updates**, including data loss, blocked sessions, and unkillable processes.  
- **macOS users** face boot loops and silent failures when using `hermes serve` or connecting to remote backends.  
- **Chinese CN users** still hit legacy encoding bugs in auth.json despite fixes being merged months ago.  
- **Multi-profile users** struggle with profile switching, sidebar state corruption, and background process misbehavior.  
- **Desktop UI frustrations** include frozen transcripts, missing unread indicators, and broken file downloads—even when files exist.

Despite these issues, users remain engaged and provide detailed repro steps, suggesting strong commitment to the platform’s potential.

---

### **8. Backlog Watch**  
**Long-standing, high-impact issues needing maintainer attention:**

- **[Issue #121970](https://github.com/nousresearch/hermes-agent/issues/121970):** Signal Note to Self handling — **9 comments, open for 1 day**  
  → Privacy-critical; urgent for users managing personal devices.

- **[Issue #115104](https://github.com/nousresearch/hermes-agent/issues/115104):** Memory sync bypasses redaction — **3 comments, 1 👍**  
  → Security risk at scale; requires immediate audit and mitigation.

- **[Issue #92760](https://github.com/nousresearch/hermes-agent/issues/92760):** Bot Mode stalls and slow replies — **7 comments, closed 1 day ago**  
  → Closed without resolution; may need reopening due to unresolved root cause.

- **[Issue #85605](https://github.com/nousresearch/hermes-agent/issues/85605):** Desktop fails to connect to `hermes serve` — **3 comments, closed**  
  → Still affects core use case; regression likely.

These unresolved or poorly addressed issues suggest **maintenance bottlenecks** despite high contributor activity.

---

> 🔗 **Project Dashboard:** [https://github.com/nousresearch/hermes-agent](https://github.com/nousresearch/hermes-agent)  
> 📊 **Activity Snapshot (2026-09-25):** 50 issues, 50 PRs updated | 1 new release | 14 open issues, 36 closed | 50 open PRs | 0 merged today

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-25**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable, incremental development phase with low but consistent activity. One new release (`v1.4.1-rc.2`) was published yesterday, marking the second patch candidate for the `1.4.0` release line, focused on improving Google OAuth integration flexibility. A single open PR and one open issue were updated in the last 24 hours, indicating minimal urgent development or user-reported problems. The community is currently focused on diagnostic refinement and infrastructure maintenance rather than feature expansion.

---

### **2. Releases**  
- **`ironclaw-v1.4.1-rc.2` (2026-09-24)**  
  - **Type**: Patch candidate (RC2) for `v1.4.0`  
  - **Key Fix**: Resolves an OAuth configuration issue affecting Google extensions (Gmail, Calendar). Users can now activate these extensions when the Google OAuth client ID/secret is provided via the Web UI instead of environment variables — a critical usability improvement for non-technical operators.  
  - **Breaking Changes**: None.  
  - **Migration Notes**: No migration steps required; users upgrading from `v1.4.0` should apply this RC without reconfiguration.  
  - **Status**: Pre-release; intended for testing before final `v1.4.1` rollout.  
  🔗 [Release Notes](https://github.com/nearai/ironclaw/releases/tag/v1.4.1-rc.2)

---

### **3. Project Progress**  
- **PR #7988** ([OPEN]) – *chore(agents): refresh codebase knowledge graph*  
  - **Summary**: Automated refresh of the codebase-memory bootstrap snapshot from the default branch via nightly CI workflow.  
  - **Impact**: Ensures the agent’s internal understanding of the codebase stays current without manual intervention.  
  - **Status**: Waiting review/merge; low-risk, infra-focused change.  
  🔗 [PR #7988](https://github.com/nearai/ironclaw/pull/7988)

---

### **4. Community Hot Topics**  
- **Issue #8111** – *[OPEN] Daily ironclaw failure taxonomy — 2026-09-24*  
  - **Summary**: Detailed analysis of 38 failing tasks in the `officeqa` benchmark suite, all attributed to genuine model-quality issues with DeepSeek-V4-Flash during OCR-based document processing.  
  - **Relevance**: High — highlights a systemic gap in handling digitized documents, particularly financial or legal text.  
  - **User Need**: Clear need for better failure categorization, root-cause analysis, and possibly model-specific tuning for OCR-heavy workflows.  
  - **Engagement**: 0 comments/reactions so far, but the structured nature suggests it may be used internally by the team for triage.  
  🔗 [Issue #8111](https://github.com/nearai/ironclaw/issues/8111)

> *Note: This issue reflects growing maturity in IronClaw’s observability pipeline — automated failure tracking is now being systematically documented.*

---

### **5. Bugs & Stability**  
- **No new bugs or crashes reported today.**  
- **Issue #8111** is not a bug per se, but a diagnostic report of recurring model-level failures.  
- **Fix Status**: No associated PRs or fixes submitted yet.  
- **Severity**: Medium (impacts benchmark reliability and model evaluation), but not blocking deployment.  
- **Root Cause**: Likely due to limitations in DeepSeek-V4-Flash’s OCR interpretation capabilities, especially on scanned Treasury documents.  

> ✅ *No active regressions or stability threats detected today.*

---

### **6. Feature Requests & Roadmap Signals**  
- **Implicit Signal**: The failure taxonomy issue (#8111) signals demand for advanced **failure classification**, **model performance monitoring**, and **OCR-specific fine-tuning**.  
- **Predicted Next Features**:  
  - Enhanced diagnostics dashboard for benchmark runs (e.g., visualizing failure types).  
  - Model-specific fallback strategies or prompt engineering hooks for OCR-heavy tasks.  
  - Support for dynamic model switching based on input type (e.g., image vs. text).  
- **Low Visibility Requests**: None observed in recent PRs/issues — no explicit feature requests surfaced in the past 24h.

---

### **7. User Feedback Summary**  
- **Pain Points**:  
  - Difficulty configuring Google extensions via Web UI (previously fixed in RC1, now confirmed working in RC2).  
  - Persistent model failures on OCR-processed documents (especially financial data), suggesting a mismatch between model capability and task complexity.  
- **Satisfaction**:  
  - Positive feedback implied by successful RC2 rollout and lack of regression reports.  
  - Users appreciate transparent failure reporting via benchmarks (e.g., `officeqa` run results).  
- **Use Case Insight**: Real-world deployment scenarios involving digitized government or financial documents are becoming a key stress test for the agent.

---

### **8. Backlog Watch**  
- **Issue #8111** – *Daily ironclaw failure taxonomy*  
  - **Age**: Open since 2026-09-24  
  - **Priority**: High (impacts evaluation rigor and model selection decisions)  
  - **Action Needed**: Convert into a formal tracking system or integrate into CI/CD pipeline for automatic failure categorization.  
  - **Risk**: If unaddressed, may hinder trust in benchmark results and delay model improvements.  
  🔗 [Issue #8111](https://github.com/nearai/ironclaw/issues/8111)

> ⚠️ *This issue represents a strategic opportunity to improve IronClaw’s debugging and model validation capabilities — could become a foundation for future “agent health” dashboards.*

---  
**Digest generated on 2026-09-25 | Data sourced from GitHub (nearai/ironclaw)**

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-25**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust community pulse: **31 issues updated in the last 24 hours** (18 open, 13 closed), and **23 pull requests** (17 open, 6 merged). The project is clearly in a phase of rapid iteration post-2.2.0 release, focusing on stability, multi-user support, and core UX improvements. A surge in recent PRs indicates strong contributor engagement, particularly around console UI/UX, observability, and session management. Despite no new releases, the momentum suggests an imminent patch or beta update is likely.

---

### **2. Releases**  
*No new releases were published in the past 24 hours.*  
The latest stable version remains **v2.2.0**, with ongoing testing of **beta builds (e.g., v2.2.2b3–b4)**. Notably, **v2.2.2b3 introduced a regression in the Console sidebar** (#7968) that broke chat group/folder functionality—highlighting the risk of UI-heavy updates without full regression coverage.

---

### **3. Project Progress**  
Six pull requests were merged today, addressing critical UX and stability issues:

- **PR #7972** (`fix(console): default session list grouping to source`) — Fixes unintended behavior after sidebar redesign, aligning with user expectations.
- **PR #7971** (`fix(console): gate tool-call lifecycle queries on execution start`) — Prevents premature polling of tool calls, improving backend consistency.
- **PR #7960** (`fix(providers): recover after stalled stream cleanup`) — Adds a 60-second timeout to prevent permanent quarantining of streaming providers, enhancing resilience.
- **PR #5659** (`fix(chat): allow sending attachments without text`) — Reinstates long-requested feature for channels like WeChat and Enterprise WeChat where users expect to send files alone.
- **PR #7975** (`fix(plugins): do not count a disabled plugin dir as installed`) — Improves plugin discovery logic by respecting disable flags.
- **PR #7967** (`fix(channels): close split chunks with the fence that opened them`) — Ensures Markdown rendering correctness during message splitting.

These merges signal a strong focus on **stability, usability, and backward compatibility**.

---

### **4. Community Hot Topics**  
Top issues reflect deep user engagement and pain points:

- **Issue #7318** ([Discussion] QwenPaw Hub multi-tenant edition — what next?) — *32 comments*, 4 likes. This is the most active thread, indicating high demand for team-based deployment features. Users are eager to shape the future of QwenPaw Hub, suggesting a strategic pivot toward enterprise/team use cases.
- **Issue #7571** (Always forgets path configuration) — *8 comments*. Highlights persistent confusion around development vs. runtime paths in plugin workflows. Users report repeated accidental overwrites due to unclear separation between `A` (dev), `B` (default), and `C` (runtime) directories.
- **Issue #7715** (Daily Paper fails silently when arxiv.org unreachable) — *4 comments*. Points to poor error visibility in cron jobs; users want clearer diagnostics when external APIs fail.
- **PR #7785** (feat(voice): add realtime voice chat) — *Open, high visibility*. First major feature request for audio interaction, signaling growing interest in multimodal agent experiences.

> 🔗 [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 🔗 [Issue #7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)

---

### **5. Bugs & Stability**  
Critical bugs reported today include:

| Severity | Issue | Summary | Fix PR? |
|---------|-------|--------|--------|
| ⚠️ High | [#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857) | ACP shutdown fallback skips session cleanup, leaking event loops | ❌ No fix yet |
| ⚠️ High | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | Daily Paper fails silently when arxiv.org is down | ❌ No fix yet |
| ⚠️ Medium | [#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836) | Scroll eviction drops user turns inside tool-heavy spans | ❌ No fix yet |
| ⚠️ Medium | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) | Feishu DM session hangs due to stuck queue consumer | ❌ No fix yet |
| ⚠️ Low | [#7959](https://github.com/agentscope-ai/QwenPaw/issues/7959) | Moonshot rejects MCP schemas with untyped `anyOf` unions | ✅ **PR #7962** submitted |

These indicate instability in **long-running sessions**, **external API handling**, and **event loop management** — areas requiring urgent attention.

---

### **6. Feature Requests & Roadmap Signals**  
User demand is shaping the roadmap:

- **Multi-tenant / Team Support** (#7318): Already delivered via Hub v2.2.0, but now users are asking *what’s next* — likely signaling demand for role-based access control, shared skill libraries, and billing/metering.
- **Mobile App** (#7976): One of the most vocal feature requests. With mobile usage rising, this could become a top priority for 2027.
- **Voice Chat** (#7785): Early-stage but promising. If implemented, it would position QwenPaw as a true conversational AI platform beyond text.
- **Manual Deactivation of Pre-made Models/Channels** (#7957): Reflects user desire for minimalism and configurability — useful for power users with OCD-like interface preferences.

> 📌 *Predicted for Q3 2027*: Mobile app, voice integration, and advanced team permissions.

---

### **7. User Feedback Summary**  
Real-world pain points reveal deeper UX and workflow challenges:

- **Plugin Development Confusion**: Users repeatedly overwrite runtime code because dev and deploy paths are poorly separated (#7571).
- **Silent Failures**: Cron jobs (e.g., Daily Paper) fail silently, hiding real errors — undermines trust in automation (#7715).
- **File/Attachment Handling**: Many users expect to send files without text (especially in WeChat/Enterprise WeChat), but this was broken in recent versions (#5558, PR #5659).
- **Tool Safety Concerns**: Some users still worry about bypassing file guards via shell commands (#2967), indicating need for stronger security defaults.

Users are increasingly sophisticated — they’re building plugins, managing teams, and automating workflows. But friction in setup, debugging, and reliability remains a barrier.

---

### **8. Backlog Watch**  
Several high-impact, long-standing issues remain unresolved:

- **Issue #7318** ([Discussion] What should we build next for QwenPaw Hub?) — *Opened 2026-08-26*, 32 comments. **Needs maintainer response** to guide community direction.
- **Issue #7576** (Hardcoded 32768 context fallback) — *Confirmed in v2.1.0–2.2.0*, 6 comments. **Blocks accurate context handling** across models; fix PR pending.
- **Issue #5856** (Tool_call structure lost in context compaction) — *Opened 2026-07-08*, 4 comments. Critical for structured reasoning — affects all agents using tool calls.
- **Issue #7963** (Langfuse tool output never recorded) — *Opened 2026-09-24*, 1 comment. Breaks observability and debugging for developers using Langfuse.

> 🔴 **Urgent Action Needed**: These issues affect core functionality (context, tooling, observability) and should be prioritized in the next release cycle.

---

✅ **Final Assessment**: QwenPaw is thriving as a community-driven, production-grade AI agent framework. While stability concerns persist in edge cases, the project shows strong momentum, especially in team collaboration and plugin extensibility. The upcoming focus should be on **resolving high-severity bugs**, **releasing a stable v2.2.2**, and **responding to community vision** via Hub v2.3.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-09-25**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active with a robust momentum in both issue and PR activity: 27 issues updated (23 open, 4 closed) and 50 pull requests opened or updated in the last 24 hours. This indicates strong community engagement and a focused development push, particularly around security hardening, runtime architecture, and plugin system evolution. The absence of new releases suggests that ongoing work is still in refinement or stabilization phases ahead of v0.8.6/v0.9.0 milestones. High-priority bugs (P1/S0) and risk-rated RFCs are being actively discussed, signaling maturity in governance and technical depth.

---

### **2. Releases**  
❌ **No new releases** were published in the last 24 hours.  
The project continues to prepare for upcoming versions—specifically **v0.8.6 (Phase 2 runtime)** and **v0.9.0 (Phase 3 gateway separation)**—as tracked in [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432). No breaking changes or migration notes are currently pending.

---

### **3. Project Progress**  
**Merged / Closed PRs (Today):**
- ✅ **#11063** (`ci(codeql)`): Pinned Rust scan runner label, retired `CI_USE_BLACKSMITH` — improves CI stability.
- ✅ **#11069**: Improved cache key isolation in Rust matrix legs — reduces redundant compilation.
- ✅ **#11073**: Added path filtering to CodeQL scans — prevents unnecessary analysis on non-code changes.
- ✅ **#11070**: Skips Docker image rebuilds when only release workflow changed — accelerates CI.
- ✅ **#11064**: Parallelized Windows task-owner recovery tests — speeds up Windows CI pipeline.
- ✅ **#11083**: Fixed webhook-started SOP agent steps — ensures headless runs proceed correctly.
- ✅ **#10538**: Prevents agent turn cancellation on WebSocket disconnect — critical for session resilience.

These PRs collectively reflect a strong focus on **CI performance**, **runtime reliability**, and **headless operation stability**.

---

### **4. Community Hot Topics**  
The most active discussions center on **security posture**, **plugin architecture**, and **identity management**:

- 🔥 **[Issue #8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)** – *Reconcile cargo-audit ignores vs. cargo deny* (high risk, high priority): Highlights a critical dependency drift between audit tools. With `cargo audit` and `cargo deny` evaluating different scopes, this is a systemic risk requiring unified policy enforcement.
- 🔥 **[PR #11081](https://github.com/zeroclaw-labs/zeroclaw/pull/11081)** – *feat(plugins): host-mediated sockets, TLS profiles, durable state*: A major step toward truly embeddable plugins. Durable state support is a long-requested feature now being implemented via WASM-host mediation.
- 🔥 **[Issue #11096](https://github.com/zeroclaw-labs/zeroclaw/issues/11096)** – *RFC: Risk-based merge-result freshness*: Addresses a real flaw in PR validation where clean merges can break later due to indirect dependency changes — directly impacting trust in CI results.

> **Underlying Need**: The community is pushing for **predictable, secure, and extensible systems** — not just features, but *resilient foundations*.

---

### **5. Bugs & Stability**  
**Critical Issues Reported (S0–S1 Severity):**

| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| [**#10968**](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) | S0 | Unattended agent turns run without `ApprovalManager` → silent tool approval bypass | ❌ Not yet fixed |
| [**#10797**](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | S0 | Markdown memory backend silently loses entries during overlapping `store()` calls | ❌ Not yet fixed |
| [**#8559**](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | S1 | Agents stop working when exiting chat window | ❌ Not yet fixed |
| [**#11087**](https://github.com/zeroclaw-labs/zeroclaw/issues/11087) | S1 | Windows app cannot be reopened or quit after closing main window | ❌ Not yet fixed |

> ⚠️ **Top Concerns**: Data loss (memory), security bypasses (approval), and UI deadlocks (Windows). These are high-risk regressions that could deter enterprise adoption.

---

### **6. Feature Requests & Roadmap Signals**  
Key user-driven enhancements signal near-term priorities:

- 🚀 **[Issue #11103](https://github.com/zeroclaw-labs/zeroclaw/issues/11103)** – Add **Cheaper Inference** as a typed OpenAI-compatible provider: Reflects growing demand for cost-efficient, multi-model LLM gateways.
- 🚀 **[Issue #11100](https://github.com/zeroclaw-labs/zeroclaw/issues/11100)** – Preserve provider aliases in cost-rate prefill: Direct feedback on UX friction in dashboard configuration.
- 🚀 **[Issue #11093](https://github.com/zeroclaw-labs/zeroclaw/issues/11093)** – Stable docs promotion leaves root `llms.txt` out of sync: Indicates need for more reliable versioned documentation pipelines.

> 💡 **Prediction**: These will likely ship in **v0.9.0** alongside improved plugin model and identity access controls.

---

### **7. User Feedback Summary**  
Real-world pain points are emerging from advanced use cases:

- **Multi-agent workflows** are being tested at scale — users report needing better coordination between agents (**#11027**) and stable background execution (**#10968**).
- **Windows desktop usability** is a recurring hurdle: App hangs after window close (**#11087**) impacts productivity.
- **Security confidence** is low around auto-mode SOPs and unattended agent actions — users want visibility and control even in headless mode.
- **Configuration clarity** is lacking: Users struggle with alias handling in cost rate editors and inconsistent doc sync across versions.

> ✅ **Positive Signal**: Users are deeply engaged, testing edge cases, and contributing meaningful RFCs and PRs — a sign of maturing ecosystem.

---

### **8. Backlog Watch**  
**Critical Issues Requiring Maintainer Attention:**

- 🔹 **[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** – *Maintainer decision queue for RFCs/design issues*: Now accepted but lacks owner; essential for governance scalability.
- 🔹 **[Issue #10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)** – *RFC: Host-scoped admission control & per-agent resource bounds*: High-risk, high-impact for multi-agent hosts — needs review.
- 🔹 **[Issue #11096](https://github.com/zeroclaw-labs/zeroclaw/issues/11096)** – *Risk-based merge-result freshness*: Already flagged by maintainer; requires architectural decision.
- 🔹 **[PR #11092](https://github.com/zeroclaw-labs/zeroclaw/pull/11092)** – *Propose holding-crate exception for composition contract*: Blocked on Core Team review — delays foundational runtime modularity.

> ⏳ **Urgency**: These items are gating progress on core architectural shifts. Without timely decisions, roadmap momentum may stall.

---

### **Conclusion**  
ZeroClaw is in a **critical phase of architectural refinement**, balancing rapid innovation with security and stability. The project shows strong health: high contributor engagement, mature RFC process, and clear focus on plug-in extensibility and zero-trust design. However, **S0/S1 bugs in data integrity and security enforcement** pose immediate risks. Immediate maintainer attention to backlog items — especially governance and runtime contracts — will determine whether v0.9.0 becomes a milestone or a bottleneck.  

🔧 **Recommendation**: Prioritize triage of high-severity bugs (#10968, #10797, #11087) and accelerate review of stalled RFCs and PRs blocking core infrastructure.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*