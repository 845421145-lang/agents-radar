# OpenClaw Ecosystem Digest 2026-09-20

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-20 00:18 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest**  
**Date:** 2026-09-20  
**Source:** GitHub Repository `openclaw/openclaw`  

---

### **1. Today's Overview**  
OpenClaw remains a highly active open-source AI agent platform with intense community engagement: **500 issues and 500 pull requests updated in the last 24 hours**, indicating sustained development momentum. The project has just released **v2026.9.5**, a stable update targeting critical stability, upgrade reliability, and session integrity. Despite progress, a cluster of high-severity bugs—especially around memory leaks, gateway crashes, and upgrade failures—suggests ongoing instability in production-grade environments. The influx of new issues reflects both deep user adoption and significant pain points in core workflows.

---

### **2. Releases**  
**New Release:** [v2026.9.5](https://github.com/openclaw/openclaw/releases/tag/v2026.9.5)  
- **Release Type:** Stable (Linux companion: v2026.9.5)  
- **Key Changes:**  
  - Resolves critical crash loops during Gateway startup and initialization (`MCP server init timeout`, `Codex catalog retry loop`).  
  - Fixes persistent state migration failure causing empty session lists after upgrade (#152744).  
  - Improves WebUI performance and message handling stability.  
  - Enhances `openclaw update` reliability across platforms (macOS, Linux, Windows).  
- **Migration Notes:**  
  - Users upgrading from **2026.9.4** may encounter silent failures or stuck upgrades (#152759, #153230).  
  - Rollback is possible but not always transparent; verify version via `npm list -g openclaw`.  
- **Downloads:**  
  - [AppImage](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.AppImage)  
  - [Debian Package](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.deb)  

> 🔗 *Release Notes:* [docs.openclaw.ai/rele](https://docs.openclaw.ai/rele)

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):** 214  
**Top Impactful Merges:**  
- ✅ [#153277](https://github.com/openclaw/openclaw/pull/153277): Stabilizes task reads, chat navigation, and async tests — resolving CI flakiness and UI race conditions.  
- ✅ [#153274](https://github.com/openclaw/openclaw/pull/153274): Enhances native PR readers with clearer CI status and proper link behavior.  
- ✅ [#152728](https://github.com/openclaw/openclaw/pull/152728): Optimizes Markdown parsing by skipping fence checks for marker-free text — improves Talk/TTS efficiency.  
- ✅ [#153266](https://github.com/openclaw/openclaw/pull/153266): Fixes Chrome extension detection in settings — prevents redundant setup prompts.  

**Features Advanced:**  
- [#153206](https://github.com/openclaw/openclaw/pull/153206): Adds opt-in semantic fidelity check for session compaction — addressing meaning-preserving risks.  
- [#153126](https://github.com/openclaw/openclaw/pull/153126): Enables remote workspace skills in agent tasks — expands extensibility for distributed workflows.

---

### **4. Community Hot Topics**  
**Most Active Issues (by comment count):**  
1. **[Issue #149361](https://github.com/openclaw/openclaw/issues/149361)** – *Umbrella: WebUI performance and stability* (50 comments)  
   → **Need:** Unified fix strategy for frontend responsiveness across desktop/mobile. Suggests systemic rendering bottlenecks.  
2. **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616)** – *Process leak: unreaped hook/tool children* (30 comments)  
   → **Need:** Process lifecycle management overhaul to prevent zombie accumulation and runtime degradation.  
3. **[Issue #144911](https://github.com/openclaw/openclaw/issues/144911)** – *MCP server init timeout crashes Gateway* (30 comments)  
   → **Need:** Graceful error handling in child cleanup paths; unhandled rejections must be caught.  

**High-Impact PRs:**  
- [#153277](https://github.com/openclaw/openclaw/pull/153277) – Fixed multiple concurrency and timing issues in core workflows.  
- [#153206](https://github.com/openclaw/openclaw/pull/153206) – Semantic compaction safeguards now available; expected to reduce "meaning drift" complaints.

---

### **5. Bugs & Stability**  
**Critical Bugs Reported (P0/P1, high impact):**  
| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| [#152744](https://github.com/openclaw/openclaw/issues/152744) | P0 | Codex state migration fails → empty session lists | ❌ No PR yet |
| [#152759](https://github.com/openclaw/openclaw/issues/152759) | P0 | `openclaw update` fails silently from 2026.9.4 → 2026.9.5 | ❌ No PR |
| [#152961](https://github.com/openclaw/openclaw/issues/152961) | P0 | WorkerThread consumes 1 CPU core + grows RSS | ❌ No PR |
| [#152689](https://github.com/openclaw/openclaw/issues/152689) | P0 | Codex fills `os.tmpdir()` with 342 MB plugin captures | ❌ No PR |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | P1 | Gateway memory leak: 350MB → 15.5GB over days | ❌ No PR |

> ⚠️ **Trend:** Multiple P0 issues relate to **upgrade path failures**, **resource leaks**, and **state corruption post-update**, suggesting that release stability is still fragile despite v2026.9.5.

---

### **6. Feature Requests & Roadmap Signals**  
**Emerging User Needs (via Issues/PRs):**  
- **Semantic Fidelity in Compaction:** [#153206](https://github.com/openclaw/openclaw/pull/153206) signals growing demand for *meaning-preserving* session pruning.  
- **Remote Skill Support:** [#153126](https://github.com/openclaw/openclaw/pull/153126) indicates users want decentralized skill execution — likely to become a core feature in v2026.10.  
- **Human-Readable Session Names:** [#7406](https://github.com/openclaw/openclaw/issues/7406) shows UX friction in Telegram topic display — low-hanging fruit for next UI polish.  
- **Better Upgrade UX:** [#107930](https://github.com/openclaw/openclaw/issues/107930) and repeated update failures suggest need for **automated Node.js version management** and **pre-flight validation**.

> 📌 **Prediction:** Next major release (v2026.10) will prioritize **upgrade robustness**, **session integrity**, and **remote agent capabilities**.

---

### **7. User Feedback Summary**  
- **Satisfaction:** Users appreciate **modular design**, **extensible plugins**, and **cross-platform consistency** (especially macOS/Linux).  
- **Dissatisfaction:**  
  - **Upgrade horror stories:** Multiple users report 8-hour recovery sessions after updating to 2026.9.5 (#153257).  
  - **Unpredictable crashes:** Memory leaks, hanging startups, and silent failures are common in long-running setups.  
  - **UX friction:** Message copying crashes (#153281), unreadable session keys, and opaque error messages plague daily use.  
- **Use Cases Highlighted:**  
  - Long-running agents with heavy tool usage (e.g., codex, memory-core) exposed memory and CPU leaks.  
  - Enterprise-style deployments with multi-agent fleets suffer from filesystem discovery loops (#134993).

---

### **8. Backlog Watch**  
**High-Value Issues Needing Maintainer Attention:**  
- [#149361](https://github.com/openclaw/openclaw/issues/149361) – *WebUI Performance Umbrella*: 50 comments, no PRs. Requires coordinated effort across frontend teams.  
- [#152744](https://github.com/openclaw/openclaw/issues/152744) – *Codex State Migration Failure*: Critical for session usability; blocks stable upgrade path.  
- [#153126](https://github.com/openclaw/openclaw/pull/153126) – *Remote Workspace Skills*: High-value feature; pending merge approval.  
- [#115908](https://github.com/openclaw/openclaw/issues/115908) – *Session transcript projection livelock*: Blocks real-time collaboration; needs urgent fix.  

> 🔍 **Call to Action:** Maintainers should prioritize **stability fixes** over new features. The backlog is dominated by **P0/P1 bugs** that directly impact user trust and adoption.

---

**Summary:** OpenClaw is rapidly evolving but currently at a **critical inflection point**. While innovation continues at pace, **core stability, upgrade reliability, and resource management** remain major hurdles. The project’s health hinges on addressing these foundational issues before broader feature expansion.  
👉 *Monitor: [GitHub Activity Dashboard](https://github.com/openclaw/openclaw)*

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem (2026-09-20)**

---

### **1. Ecosystem Overview**

The open-source personal AI assistant and agent ecosystem in September 2026 is characterized by rapid innovation, divergent maturity levels, and increasing focus on reliability, security, and user trust. Projects are transitioning from experimental prototypes toward production-grade platforms, with a clear bifurcation between high-velocity development (OpenClaw, ZeroClaw) and stabilization phases (Hermes Agent, QwenPaw). A growing consensus across the community emphasizes *session integrity*, *upgrade robustness*, *cross-platform consistency*, and *end-to-end observability* as non-negotiable foundations for enterprise and long-running deployment. The convergence of identity mediation, decentralized workflows, and human-in-the-loop design signals a maturing ecosystem oriented toward autonomy with accountability.

---

### **2. Activity Comparison**

| Project         | Issues (Last 24h) | PRs (Last 24h) | Release Status       | Health Score¹ (1–5) |
|------------------|-------------------|-----------------|------------------------|-----------------------|
| **OpenClaw**     | 500               | 500             | ✅ v2026.9.5 (Stable)  | ⭐⭐⭐⭐☆ (4.3)           |
| **Hermes Agent** | 50                | 50              | ❌ No new release       | ⭐⭐⭐⭐☆ (4.1)           |
| **IronClaw**     | 0                 | 1               | ❌ No release           | ⭐⭐☆☆☆ (2.0)           |
| **QwenPaw**      | 10                | 7               | ❌ No new release       | ⭐⭐⭐☆☆ (3.5)           |
| **ZeroClaw**     | 32                | 50              | ❌ No new release       | ⭐⭐⭐⭐☆ (4.2)           |

> **¹ Health Score**: Based on activity velocity, stability of releases, backlog severity, and community sentiment (higher = more mature & stable).

---

### **3. OpenClaw's Position**

**OpenClaw stands as the most active and technically ambitious project** in the ecosystem, leading in both scale and scope of contributions. Its **500 issues and 500 PRs daily** reflect a massive developer base and intense real-world testing—especially under heavy workloads involving codex agents, memory-core operations, and multi-agent orchestration. Unlike peers, OpenClaw maintains a **stable release cadence (v2026.9.5)** despite significant P0 bugs, demonstrating confidence in its core architecture while pushing forward with aggressive feature expansion.

Technically, OpenClaw distinguishes itself through:
- **Modular, plugin-driven agent composition**
- **Deep integration with MCP and Codex ecosystems**
- **Cross-platform binary delivery (AppImage, DEB, RPM)**

Compared to peers, it has the **largest community size**, highest issue volume, and most comprehensive documentation—making it the de facto reference implementation for advanced AI agent workflows. However, this scale comes at the cost of **persistent instability in upgrade paths and resource management**, which currently undermines its adoption in production environments.

---

### **4. Shared Technical Focus Areas**

Across all five projects, **four recurring technical needs** have emerged from community feedback and PR activity:

| Need                                 | Projects Involved                     | Specific Examples |
|--------------------------------------|----------------------------------------|-------------------|
| **Upgrade Robustness & Rollback**    | OpenClaw, Hermes Agent, QwenPaw       | Silent `update` failures (#152759), post-update state corruption |
| **Session Integrity & Persistence**  | OpenClaw, Hermes Agent, ZeroClaw      | Empty session lists (#152744), lost chat context after restart |
| **Security & Approval Enforcement**  | ZeroClaw, OpenClaw, Hermes Agent      | Bypassed approval gates via Git commands (#10966), silent tool execution |
| **Real-Time Observability & Debugging** | ZeroClaw, QwenPaw, OpenClaw          | Missing sub-agent progress, unhandled tool outputs, UI freeze on error |

These shared challenges indicate a **fundamental shift in expectations**: users no longer accept black-box behavior. They demand **predictable upgrades**, **transparent state**, **audit-ready logs**, and **observable agent decisions**—particularly in team or enterprise settings.

---

### **5. Differentiation Analysis**

| Dimension                  | OpenClaw                          | Hermes Agent                    | IronClaw                        | QwenPaw                         | ZeroClaw                          |
|----------------------------|------------------------------------|----------------------------------|----------------------------------|----------------------------------|------------------------------------|
| **Feature Focus**          | Full-stack agent platform + tools | Session continuity + workflow   | Decentralized identity (DID)   | Plugin extensibility + UX        | Human-in-the-loop + channel ops    |
| **Target User**            | Power users, dev teams, researchers | Remote collaborators, bots      | Identity-conscious developers  | Developers building apps         | Enterprise automation engineers    |
| **Architecture**           | Monorepo with MCP/Codex integration | Modular fleet model + desktop  | Host-mediated identity layer     | React/Node-based SDK             | Gateway-separated runtime + sandbox |
| **Key Differentiator**     | Scale, extensibility, cross-platform | Multi-device persistence        | Trust-minimized agent auth       | Plugin policy hooks, audio robustness | WhatsApp-native automation         |

This divergence shows that the ecosystem is **fragmenting along use-case lines**: OpenClaw leads in breadth, ZeroClaw in operational control, IronClaw in privacy, QwenPaw in app-like UX, and Hermes Agent in collaborative resilience.

---

### **6. Community Momentum & Maturity**

- **High-Momentum (Rapid Iteration):**  
  - **OpenClaw**: Highest activity; fast feature rollout but unstable upgrades.  
  - **ZeroClaw**: Strong momentum in security and channel support; resolving S0 bugs quickly.  

- **Mid-Tier (Stabilization Sprint):**  
  - **Hermes Agent**: Focused on fixing session logic, config drift, and desktop reliability ahead of v0.22.  
  - **QwenPaw**: High bug density in UI recovery and media handling; actively addressing critical path issues.  

- **Low-Momentum (Maintenance Phase):**  
  - **IronClaw**: Only one PR open; low visibility. Strategic feature in flight but stalled due to lack of maintainer engagement.

The ecosystem is **diverging into three maturity tiers**:
1. **Production-Ready (Emerging)**: OpenClaw (despite flaws), ZeroClaw (post-S0 fixes).
2. **Pre-Production (Stabilizing)**: Hermes Agent, QwenPaw.
3. **Research-Stage (Awaiting Momentum)**: IronClaw.

---

### **7. Trend Signals**

Based on community feedback and PR patterns, key industry trends shaping the future of AI agent development include:

- **Trust-by-Design is Non-Negotiable**: Users demand *auditable agent behavior* (e.g., #10952, #10968), *explicit approval gates*, and *secure identity mediation*. This shifts the focus from “what can it do?” to “how do I know it’s safe?”

- **Human-in-the-Loop Must Be Durable**: Requests for persistent bot groups (#97681), sub-agent visibility (#10531), and delivery receipts signal a need for **long-lived, observable collaboration**—not ephemeral interactions.

- **Cross-Platform Consistency is Expected**: All projects report UI freezes, silent crashes, and inconsistent behavior across macOS/Linux/Windows. Users now expect **desktop parity** like traditional software.

- **Plugin Governance Is Critical**: Features like pre-tool-call hooks (#7878), escalation-only policies, and configurable cache TTLs show that **developers want control over agent actions without code injection**.

- **Web-Based Access is the Default**: Demand for web renderers (#93508), webhook support (#8046), and browser-based dashboards indicates that **the terminal is no longer sufficient** for modern AI workflows.

> ✅ **Value for Developers**: The next generation of AI agents will be judged not by their capabilities, but by their **resilience, auditability, and maintainability**—with security, stability, and UX maturity as primary differentiators.

---

**Conclusion**: The personal AI assistant ecosystem is entering a **critical phase of maturation**. While OpenClaw and ZeroClaw lead in innovation and scale, the broader trend points to a market where **stability, transparency, and trust** are the new competitive moats. Developers should prioritize projects with strong upgrade paths, observable workflows, and clear governance models—not just feature-rich backends.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

---

### **Hermes Agent Project Digest — 2026-09-20**

---

#### **1. Today's Overview**  
The Hermes Agent project remains highly active, with **50 issues and 50 pull requests updated in the last 24 hours**, reflecting strong community engagement and ongoing development momentum. The core focus centers on session stability, cross-platform reliability (especially Windows/macOS), and robustness in multi-agent workflows. Critical bugs related to message delivery, session state management, and update handling are prominent, indicating a push toward production-grade resilience. Despite no new releases, significant fixes are being merged, particularly around agent behavior, tool compatibility, and desktop app stability.

---

#### **2. Releases**  
❌ **No new releases** were published today or in the past 7 days. The latest version remains v0.21.3 (as of 2026-09-19). No breaking changes or migration notes are pending. Users should expect upcoming updates to address critical stability issues reported in recent PRs.

---

#### **3. Project Progress**  
✅ **12 PRs merged/closed** today, primarily focused on:
- **Session & State Stability**: Fixes for `fleet_restart_pending`, `session.stop` queue draining, and model change rollback logic.
- **Desktop App Reliability**: Resolved hang after window close (#116496), installer log sanitization (#112679), and WSL reconnect failure (#91021).
- **Tooling & Configuration**: Patched `tools.tool_search.defer` drift issue (#116488), improved LSP memory management (#116446), and enhanced error visibility in group chats (#116458).
- **Security & Privacy**: Addressed `/debug` non-consensual data upload risk (#94876) and GitHub skill path security (#106684).

These merges signal a stabilization phase ahead of a potential v0.22 release.

---

#### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement**:
1. **#97681** – *Bot Group Chats Should Keep Working After Desktop Closes* (28 comments)  
   🔗 [GitHub Issue #97681](https://github.com/nousresearch/hermes-agent/issues/97681)  
   📌 **Need**: Persistent multi-device coordination for bot teams. Users want seamless continuity across devices without keeping Desktop open—critical for remote collaboration.

2. **#107307** – *Codex Provider Errors Interrupt Hermes Work* (19 comments)  
   🔗 [GitHub Issue #107307](https://github.com/nousresearch/hermes-agent/issues/107307)  
   📌 **Need**: Reliable backend integration with OpenAI-compatible providers under resource constraints. Users report intermittent failures post-conservation window.

3. **#53004** – *Projects Paradigm Broke Folder → Session Flow* (16 comments)  
   🔗 [GitHub Issue #53004](https://github.com/nousresearch/hermes-agent/issues/53004)  
   📌 **Need**: Backward compatibility after major UI refactor. Users rely on predictable folder-to-session navigation; current workflow is broken.

🔥 **Top PRs by Impact**:
- **#116488** – Fix: Register `tools.tool_search.defer` in `DEFAULT_CONFIG`  
  🔗 [PR #116488](https://github.com/nousresearch/hermes-agent/pull/116488)  
  ✅ Fixes config drift, improves maintainability and user transparency.

- **#116499** – Validate review-lane skill at claim time  
  🔗 [PR #116499](https://github.com/nousresearch/hermes-agent/pull/116499)  
  ✅ Prevents crashes from invalid skill access during Kanban execution.

---

#### **5. Bugs & Stability**  
⚠️ **High-Priority Bugs Reported Today**:
1. **#114456** – Async delegation completion stalls behind busy sessions (P0)  
   🔗 [Issue #114456](https://github.com/nousresearch/hermes-agent/issues/114456)  
   📌 **Impact**: 24-minute delay in processing completed async tasks. **Fix PR pending** (#116502).

2. **#116497** – Post-update cleanup traceback (`_find_stale_dashboard_pids()` arg error)  
   🔗 [Issue #116497](https://github.com/nousresearch/hermes-agent/issues/116497)  
   📌 **Impact**: Noise during updates despite successful deployment. Requires fix before next release.

3. **#116446** – LSP servers OOM due to unbounded Node heap  
   🔗 [Issue #116446](https://github.com/nousresearch/hermes-agent/issues/116446)  
   📌 **Impact**: Whole fleet can crash on large workspaces. High severity; **no fix yet**.

4. **#116443** – Ctrl+D doesn’t exit TUI on macOS  
   🔗 [Issue #116443](https://github.com/nousresearch/hermes-agent/issues/116443)  
   📌 **Impact**: UX friction for CLI users; muscle memory conflict with Ghostty.

---

#### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Roadmap Themes**:
- **Project-Scoped Memory** (#33638): Filter `MEMORY.md` by current project context — likely to be prioritized in v0.22.
- **User-Defined Model List** (#50715): Allow adding models not in official catalog (e.g., OpenRouter). Strong demand signals need for extensibility.
- **Web-Based Desktop Renderer** (#93508): Serve Desktop UI in browser — indicates growing desire for web-first access and remote collaboration.
- **Skill Installation via GitHub URL** (#116500): Enables rapid plugin sharing — aligns with ecosystem growth trend.

👉 **Prediction**: v0.22 will likely include **project-scoped memory**, **improved model picker flexibility**, and **web-based desktop mode**.

---

#### **7. User Feedback Summary**  
💬 **Key Pain Points Expressed**:
- **Multi-Device Continuity**: “I start a bot group chat on my laptop, go home, and it’s gone.” (#97681)
- **Unreliable Providers**: “Codex works fine, but Hermes drops mid-response.” (#107307)
- **Broken Workflows**: “After the project refactor, I can’t open a session in a folder anymore.” (#53004)
- **Confusing Error Messages**: “All bot failures show as ‘hit an error’ — no way to tell if it’s a timeout or crash.” (#116458)
- **Update Noise**: “Update completes, but then a traceback ruins the experience.” (#116497)

✅ **Positive Sentiment**: Users appreciate the depth of debugging tools, proactive issue reporting, and responsive maintainers.

---

#### **8. Backlog Watch**  
🔍 **Critical Long-Standing Issues Needing Attention**:
- **#97681** – Bot group chats persist across devices (P2, 28 comments, 2 👍)  
  ⏳ **Status**: Active discussion, no assigned owner. High impact for team workflows.

- **#53004** – Projects paradigm broke folder→session flow (P2, 16 comments, 1 👍)  
  ⏳ **Status**: Known regression post-merge. Needs urgent UX fix.

- **#33638** – Project-scoped memory (P3, 6 comments, 0 👍)  
  ⏳ **Status**: Low visibility but high utility. Could become a key differentiator.

- **#94876** – `/debug` uploads data non-interactively (P2, 1 comment, 0 👍)  
  ⏳ **Status**: Reopened after prior closure — **security concern** requiring immediate triage.

> 💡 **Recommendation**: Assign owners to top-3 backlog items by Sep 25 to prevent feature stagnation.

---

**📌 Summary**: Hermes Agent is in a **stabilization sprint** with high activity, strong community input, and critical bug fixes underway. While no new release is imminent, v0.22 is shaping up to be a major milestone with enhanced session persistence, project context awareness, and web accessibility. Maintainability and user trust remain central themes.

🔗 Full Project Dashboard: [https://github.com/nousresearch/hermes-agent](https://github.com/nousresearch/hermes-agent)

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-20**

---

### **1. Today's Overview**  
The IronClaw project remains in a low-activity phase as of 2026-09-20, with no new issues or releases reported in the past 24 hours. One pull request is currently open (#7499), indicating modest forward momentum focused on expanding identity integration for agent workflows. The absence of merged PRs, closed issues, or recent releases suggests a pause in active development cycles, possibly due to ongoing architectural refinement or delayed prioritization. Activity appears concentrated on documentation and dependency updates, reflecting a maintenance-oriented state rather than feature velocity.

---

### **2. Releases**  
No new releases have been published in the last 24 hours. There are no release notes, breaking changes, or migration guides to report. The project continues to operate under its existing versioning cadence without visible updates to the public artifact stream.

---

### **3. Project Progress**  
Only one pull request is active today:  
- **PR #7499**: [`feat(identyclaw): host-mediated Passport for practitioners`](https://github.com/nearai/ironclaw/pull/7499)  
  This contribution introduces a lightweight host-layer interface (`builtin.idcp`) enabling processless IronClaw agents to interact with IdentyClaw Passport without requiring shell access or installable browser extensions. It also includes a practitioner-focused host kit (Node CLI + optional loopback server on `:3921`) under `deploy/identyclaw/`. While not yet merged, this PR represents a significant step toward seamless identity mediation in headless agent environments.

---

### **4. Community Hot Topics**  
The only active community item is **PR #7499**, which has garnered no reactions or comments but is marked as high scope (XL size, low risk). Its focus on *host-mediated identity access* signals growing demand for secure, frictionless authentication pathways for AI agents operating outside traditional user interfaces. The contributor (discernible-io) appears to be addressing a real-world gap: enabling autonomous agents to authenticate via IdentyClaw Passport without relying on user-facing tools—this reflects a deeper trend toward decentralized identity (DID) integration in agent ecosystems.

> 🔗 [PR #7499: feat(identyclaw): host-mediated Passport for practitioners](https://github.com/nearai/ironclaw/pull/7499)

---

### **5. Bugs & Stability**  
No bugs, crashes, or regressions were reported in the last 24 hours. With zero open issues and no recent activity in the issue tracker, there are no known stability concerns at this time. However, the lack of issue reports may indicate either strong system stability or underreporting—particularly if users are encountering problems silently during deployment.

---

### **6. Feature Requests & Roadmap Signals**  
The dominant signal from current activity is the need for **agent-native identity mediation**. PR #7499 directly responds to this by enabling processless agents to use IdentyClaw Passport through a dedicated host layer. This suggests that future roadmap priorities may include:
- Full support for agent-to-agent identity delegation
- Integration with WebAuthn and other DID protocols
- Built-in policy enforcement (e.g., AskAlways exemptions)
- Expansion of `deploy/identyclaw/` into a production-grade identity broker

These features align with IronClaw’s mission to enable trust-minimized, permissioned agent interactions.

---

### **7. User Feedback Summary**  
While no direct user feedback is available in the form of issues or comments, the nature of PR #7499 implies strong interest from practitioners deploying IronClaw agents in constrained environments (e.g., serverless, containerized, or embedded systems). The request for a "processless" solution indicates pain points around:
- Dependency on user interaction (browser prompts, extensions)
- Lack of headless identity resolution
- Difficulty in embedding identity flows within automated agent pipelines

Users appear to value operational simplicity and security posture over convenience—favoring robust, auditable identity paths.

---

### **8. Backlog Watch**  
There are currently **no open issues**, so no backlog items require urgent maintainer attention. However, the long-term viability of PR #7499 depends on timely review and merging. If left unaddressed beyond 3–4 weeks, it could stall progress on a critical identity integration path. Maintainers should prioritize evaluating this XL-scope feature given its strategic alignment with agent autonomy and privacy-preserving design principles.

> 📌 **Watchlist Item**: [PR #7499 – Host-mediated Passport for practitioners](https://github.com/nearai/ironclaw/pull/7499) — pending review; high impact potential.

---

**Status Summary**: ✅ Low activity | ⚠️ Strategic feature in flight | 🔍 Waiting on maintainer engagement  
**Project Health**: Stable but stagnant; innovation concentrated in one high-impact PR.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-20**

---

### **1. Today's Overview**  
QwenPaw exhibits strong community engagement with 10 open issues and 7 active pull requests published in the last 24 hours, indicating a vibrant development cycle. No new releases were issued, suggesting the team is prioritizing stability fixes and feature refinement ahead of a potential v2.3 release. The spike in frontend and agent-level bug reports—particularly around audio, file handling, and UI recovery—points to ongoing challenges in error resilience and cross-provider compatibility. Meanwhile, several high-impact PRs address core infrastructure, signaling focus on long-term extensibility.

---

### **2. Releases**  
*No new releases were published in the past 24 hours.*  
The latest stable version remains **v2.2.1**, as confirmed by multiple users in recent issue reports (e.g., #7883, #7882). Users are actively testing self-built Docker images and PyPI wheels, but no official update has been rolled out to address the reported regressions.

---

### **3. Project Progress**  
Seven pull requests were opened today, reflecting significant progress across key areas:

- **PR #7889** ([fix(console): recover from transient DOM-mutation render errors](https://github.com/agentscope-ai/QwenPaw/pull/7889)) addresses persistent UI failure after React rendering errors, directly tackling #7888.
- **PR #7886 & #7887** ([fix(agents): handle unknown input_audio rejections](https://github.com/agentscope-ai/QwenPaw/pull/7886), [fix(agents): handle unknown audio part rejections](https://github.com/agentscope-ai/QwenPaw/pull/7887)) implement fallback logic for audio input rejection, resolving #7876 and improving robustness with models like DeepSeek.
- **PR #7885** ([fix(agents): retry after unsupported file payload errors](https://github.com/agentscope-ai/QwenPaw/pull/7885)) adds retry mechanisms for file uploads that fail due to invalid OpenAI-style media payloads—critical for fixing #7883.
- **PR #7874** ([feat(pawapp): redesign the SDK and app control plane](https://github.com/agentscope-ai/QwenPaw/pull/7874)) and **PR #7875** ([docs(pawapp): specify Creator create-video control plane](https://github.com/agentscope-ai/QwenPaw/pull/7875)) lay architectural groundwork for safer, more durable PawApp execution.
- **PR #7880** ([feat(plugins): add escalation-only tool policy hooks](https://github.com/agentscope-ai/QwenPaw/pull/7880)) introduces a plugin-visible pre-tool-call hook, enabling external governance without host patching—aligns with #7878.

All PRs are currently open and under review.

---

### **4. Community Hot Topics**  
Top contributors and most discussed items reflect urgent usability concerns:

- **#7888** ([Bug] Chat page stuck on "Something went wrong") – *5 comments*, involves React DOM mutation errors leading to permanent UI freeze unless full reload. Directly addressed by **PR #7889**.
- **#7878** ([Feature]: Expose pre-tool-call policy hook) – *3 comments*, sought by developers wanting fine-grained control over tool execution via plugins. Now being implemented via **PR #7880**.
- **#7883** ([Bug] Tool-returned PDF rejected by DeepSeek) – *1 comment*, reveals deep integration issues with model-specific media handling. Fixed by **PR #7885**.
- **#7882** ([bug] OpenCode free-tier models return 403 despite UI labeling) – *1 comment*, highlights mismatch between UI state and backend enforcement, impacting user trust.
- **#7884** ([question] Chat history too short) – *1 comment*, reflects growing demand for longer session retention—potentially a roadmap priority.

These topics indicate a shift toward **user experience maturity**, **plugin extensibility**, and **cross-provider reliability**.

---

### **5. Bugs & Stability**  
Critical bugs reported today center on **UI persistence**, **media handling**, and **provider compatibility**:

| Issue | Severity | Description | Fix Status |
|------|----------|-------------|------------|
| [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) | High | Console fails to recover from lazy load errors; navigation loops on error screen | ❌ No fix yet |
| [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888) | High | React `commitPlacement` error causes permanent "Something went wrong" screen | ✅ Addressed by **PR #7889** |
| [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883) | High | PDF files serialized incorrectly → DeepSeek rejects with 400 error | ✅ Fixed by **PR #7885** |
| [#7876](https://github.com/agentscope-ai/QwenPaw/issues/7876) | High | Audio `.wav` triggers permanent conversation failure | ✅ Fixed by **PR #7886 & #7887** |
| [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882) | Medium | Free-tier OpenCode models return 403 despite UI label | ⚠️ Partial: UI misalignment |
| [#7881](https://github.com/agentscope-ai/QwenPaw/issues/7881) | Medium | Kimi ACP bypasses safety checks unevenly | ⚠️ Design impact noted |

> **Note**: While fixes are underway for most audio/file-related issues, the **lazy loading recovery bug (#7815)** remains unresolved and could severely degrade UX if unaddressed.

---

### **6. Feature Requests & Roadmap Signals**  
User-driven innovation is shaping near-term direction:

- **Longer chat history retention** (#7884): A recurring pain point suggesting users value continuity and context depth. Likely candidate for v2.3 or v2.4.
- **Plugin-level policy hooks** (#7878): Requested to enable enterprise-grade governance without code injection. Already being implemented (**PR #7880**).
- **MCP OAuth flow improvements** (#7879): Highlights need for flexible auth support beyond OAuth—especially for static Bearer Key providers like QCC.
- **Session-level work directory enhancements** (#7877): Suggests growing use of local project workflows; may inspire future workspace refactorings.

These signals point to a **shift from basic agent functionality toward secure, scalable, and user-centric AI application orchestration**.

---

### **7. User Feedback Summary**  
Real-world usage reveals three key themes:

- **Frustration with unrecoverable UI states**: Users report being locked out of the app after minor errors (e.g., #7815, #7888), undermining trust.
- **Misaligned UI/behavior expectations**: Free-tier labels misleadingly suggest availability when they’re actually restricted (e.g., #7882), damaging credibility.
- **Desire for richer context retention**: Short chat history limits utility in complex workflows (e.g., coding, research), indicating a need for better persistence mechanisms.

Overall, users are increasingly treating QwenPaw as a production-grade assistant—but expect higher resilience, clarity, and longevity than current build supports.

---

### **8. Backlog Watch**  
Several critical issues remain open without assigned PRs or maintainer responses:

- **#7815** – Lazy page load failure leads to permanent error screen. **High severity**, no fix yet. *Urgent attention needed.*
- **#7879** – MCP OAuth handshake fails for static Bearer Key servers (e.g., QCC). Blocks integration with essential data services. *Must be resolved before broader adoption.*
- **#7877** – Session-level work directory UI is broken: tiny viewport, empty “Recent Projects,” disabled “Apply.” *Impacts developer workflow.*

> These represent **systemic gaps in error handling, configuration flexibility, and UI ergonomics**—potential blockers for enterprise or power-user adoption.

---

**Conclusion**: QwenPaw is in a phase of **rapid iteration and stabilization**, with strong momentum in core agent and plugin architecture. However, unresolved UI recovery bugs and inconsistent behavior undermine user confidence. Immediate action on #7815 and #7879 is recommended to prevent further erosion of trust. With solid PRs in flight and clear user signals, **QwenPaw is poised for a major v2.3 release focused on reliability, extensibility, and user experience**.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-20  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active with a surge in developer engagement: **32 open issues** and **50 open pull requests** updated within the last 24 hours, reflecting strong momentum in feature development and stability improvements. The core focus centers on enhancing agent autonomy (e.g., delegate sub-agent visibility), improving multi-channel support (especially WhatsApp Web), and hardening security controls around tool execution and message delivery. High-priority bugs related to authentication, session integrity, and agent safety are being actively addressed, while new RFCs signal strategic shifts toward durable human-in-the-loop patterns and end-to-end message provenance.

---

### **2. Releases**

> **No new releases** were published in the past 24 hours.  
The project continues to operate under its ongoing v0.8.6 (Phase 2 runtime) and v0.9.0 (gateway separation) release cadence, as tracked in [Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432). No breaking changes or migration notes are currently pending.

---

### **3. Project Progress**

#### ✅ **Merged / Closed PRs (Today)**  
While no PRs were merged today, several high-impact fixes were closed:
- **PR #9724** – Fixed `always_ask` behavior to survive Full autonomy mode, ensuring approval gates remain effective even in unattended contexts.
- **PR #9428** – Enforced sender authorization for Bluesky and Reddit channels, closing a critical security gap.
- **PR #10084** – Resolved WhatsApp Web device linking failure by handling SHORTCAKE passkey events via WebAuthn, enabling successful operator handoffs.

These updates reflect a strong focus on **security enforcement**, **authentication robustness**, and **cross-platform reliability**.

---

### **4. Community Hot Topics**

| Issue / PR | Summary | Comments | Link |
|------------|--------|----------|------|
| **#10977** – *WhatsApp Web: implement create_room and invite_user* | Critical for group automation; users need native group creation support. | 2 | [Issue #10977](https://github.com/zeroclaw-labs/zeroclaw/issues/10977) |
| **#10984** – *feat(channels/whatsapp-web): post native polls from the poll tool* | Enables rich interaction features on WhatsApp; directly addresses UX gaps. | 0 | [PR #10984](https://github.com/zeroclaw-labs/zeroclaw/pull/10984) |
| **#10962** – *Forward tool result payloads over the gateway /ws/chat stream* | Developer-facing API limitation: clients can’t see tool outputs mid-run. | 2 | [Issue #10962](https://github.com/zeroclaw-labs/zeroclaw/issues/10962) |
| **#10952** – *Seam sanitizers rewrite signed reasoning inside assistant tool-call envelope* | Affects Anthropic model replayability; may break LLM traceability. | 2 | [Issue #10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952) |

> 🔍 **Analysis**: Community demand is converging on **richer channel capabilities** (especially WhatsApp), **real-time observability** of agent workflows, and **preserving model fidelity** during processing. These represent both user-driven use cases and deeper architectural needs around transparency and extensibility.

---

### **5. Bugs & Stability**

| Severity | Issue | Summary | Fix PR? | Link |
|---------|-------|--------|--------|------|
| **S0** (Critical) | [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) | Unattended agents run without ApprovalManager → risk tools bypass approvals silently | ❌ | [Issue #10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) |
| **S0** (Critical) | [#10966](https://github.com/zeroclaw-labs/zeroclaw/issues/10966) | Git `--attr-source` hides mutating commands from approval classification | ❌ | [Issue #10966](https://github.com/zeroclaw-labs/zeroclaw/issues/10966) |
| **S1** (Workflow Blocked) | [#8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) | WhatsApp Web device linking broken due to passkey gate | ✅ | [PR #10084](https://github.com/zeroclaw-labs/zeroclaw/pull/10084) |
| **S2** (Degraded Behavior) | [#10981](https://github.com/zeroclaw-labs/zeroclaw/issues/10981) | Outgoing WhatsApp images show empty card due to missing thumbnail | ✅ | [PR #10982](https://github.com/zeroclaw-labs/zeroclaw/pull/10982) |
| **S2** (Degraded Behavior) | [#10972](https://github.com/zeroclaw-labs/zeroclaw/issues/10972) | Inbound WhatsApp images delivered as literal `[Image]` text | ✅ | [PR #10982](https://github.com/zeroclaw-labs/zeroclaw/pull/10982) |

> ⚠️ **Urgent Note**: Two S0 security vulnerabilities exist in the shell sandboxing logic — both involve bypassing risk classifiers via Git command manipulation. These require immediate attention to prevent data loss or unintended system access.

---

### **6. Feature Requests & Roadmap Signals**

| Feature Request | Priority | Status | Roadmap Signal |
|-----------------|----------|--------|----------------|
| [**#8046**] Optional Telegram webhook mode | P2 | Accepted | Indicates growing demand for scalable, low-latency ingress beyond long polling |
| [**#10531**] Expose delegate sub-agent progress | P2 | Accepted | Highlights need for real-time monitoring in nested agent architectures |
| [**#10663**] Configurable 1-hour prompt-cache TTL for Anthropic | P2 | Accepted | Shows increasing need for fine-grained control over caching behavior |
| [**#10930**] One durable primitive for human questions | P2 | RFC | Signals intent to formalize SOPs as first-class primitives — a foundational shift |
| [**#10929**] Delivery receipts for outbound messages | P2 | RFC | Reflects growing need for auditability and message tracking |

> 📈 **Prediction**: Features like **SOP durability**, **delivery receipts**, and **webhook support** are likely candidates for inclusion in **v0.9.0**, aligning with the gateway separation and observability roadmap.

---

### **7. User Feedback Summary**

- **WhatsApp UX Pain Points**: Users report poor image previews (`[Image]` text), missing thumbnails, and broken mentions — indicating that mobile client compatibility is a major usability hurdle.
- **Agent Visibility Gaps**: Developers struggle to monitor background delegation progress, leading to uncertainty about task status and output.
- **Security Concerns**: Multiple reports confirm that certain Git commands can bypass approval gates, raising alarm about sandbox integrity.
- **Positive Sentiment**: The resolution of WhatsApp device linking (via PR #10084) was well-received, showing that timely fixes improve trust and adoption.

> 💬 **User Quote**: *"I can’t automate group creation on WhatsApp — it’s blocking my deployment pipeline."* — RustLangLatam

---

### **8. Backlog Watch**

| Issue | Reason for Attention | Link |
|------|----------------------|------|
| **#8627** – WhatsApp Web device linking broken | High-severity blocker; affects all users relying on WhatsApp integration | [Issue #8627](https://github.com/zeroclaw-labs/zeroclaw/issues/8627) |
| **#10968** – Unattended agents lack ApprovalManager | S0 security risk; could lead to silent privilege escalation | [Issue #10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) |
| **#10966** – Git `--attr-source` bypasses approval classifier | S0 risk; undermines entire security policy framework | [Issue #10966](https://github.com/zeroclaw-labs/zeroclaw/issues/10966) |
| **#10952** – Sanitization breaks tool reasoning replay | High-risk for model tracing and debugging; affects Anthropic users | [Issue #10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952) |
| **#10531** – Sub-agent progress not exposed | Long-standing pain point for developers building complex agents | [Issue #10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531) |

> 🛑 **Action Required**: Maintainers must prioritize **S0 security issues** and **high-impact UX blockers** before next release. The backlog reflects deep technical debt in agent observability and security enforcement.

---  
**End of Digest**  
*Generated: 2026-09-20 | Source: GitHub Activity Data*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*