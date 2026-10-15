# OpenClaw Ecosystem Digest 2026-10-15

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-15 00:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-10-15**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development and community engagement. A surge of high-severity bugs—particularly around SQLite WAL growth, plugin loading stalls, and gateway startup hangs—suggests ongoing stability challenges in recent releases (2026.9.5–2026.9.8). Despite no new releases, significant progress is being made on core infrastructure fixes, UI refactoring, and security hardening. The project shows strong momentum in addressing critical UX blockers and long-standing regressions.

---

### **2. Releases**  
**None**  
No new releases were published today. The most recent stable version remains **2026.9.8**, with several regression reports tied to updates from **2026.9.5 to 2026.9.7**, including session loss, crash loops, and startup delays. Users are advised to avoid upgrading until fix PRs for P0 issues are merged and tested.

---

### **3. Project Progress**  
**17 merged/closed PRs** were finalized today, primarily focused on:
- **UI/UX improvements**: Refactoring Web UI components to eliminate Lit dependency (#171846, #171887, #171942), improving model page stability (#172608), and fixing side chat indicators (#172546).
- **Security & compliance**: Addressing dependency advisories in MCP and source-map libraries (#172664), securing credential handling (#172283, #172289), and removing private reply logging (#172669).
- **Core fixes**: Improving agent admission recovery after runtime supersession (#172632), fixing memory search limit validation (#172630), and restoring cron job reauthorization (#172527).

These changes reflect a strategic shift toward **infrastructure cleanup, security hygiene, and user-facing reliability**.

---

### **4. Community Hot Topics**  
Top 5 most discussed items highlight systemic pain points:

| Issue | Comments | Severity | Link |
|------|---------|----------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 125 | 🦞 Diamond Lobster (P0) | SQLite WAL bloat to 2.8 GB on Windows — blocks startup |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 22 | 🦞 Diamond Lobster (P0) | Gateway blocks for minutes during external plugin capture |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | 19 | 🦪 Silver Shellfish (P0) | Gateway hangs 17 mins at `model-runtime` publication |
| [#163029](https://github.com/openclaw/openclaw/issues/163029) | 15 | 🦞 Diamond Lobster (P0) | External plugin reload mid-turn (40–70s stall) despite fix |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) | 14 | 🦪 Silver Shellfish (P1) | State DB WAL checkpoint never completes due to reader pin |

**Underlying Needs**: These issues point to **critical flaws in database lifecycle management**, **plugin caching inefficiencies**, and **event loop blocking during startup and runtime transitions**. Users report production instability, especially under load or with large plugins.

---

### **5. Bugs & Stability**  
**Critical Stability Issues Reported (P0/P1):**

| Bug ID | Summary | Status | Fix PR? |
|-------|--------|--------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL grows to 2.8 GB; never checkpoints | ✅ Open | No |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | Plugin capture blocks event loop for minutes | ✅ Open | No |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | Gateway hangs 17 mins at model runtime | ✅ Open | No |
| [#163029](https://github.com/openclaw/openclaw/issues/163029) | Mid-turn plugin reload causes 70s main-thread stalls | ✅ Open | No |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) | State DB WAL checkpoint permanently blocked | ✅ Open | No |

> ⚠️ **All P0 issues lack fix PRs**. These represent **release-blocking risks** that could prevent future stable deployments.

---

### **6. Feature Requests & Roadmap Signals**  
High-impact feature requests gaining traction:

| Request | Priority | Key Use Case | Predicted Inclusion |
|--------|----------|--------------|---------------------|
| [#111143](https://github.com/openclaw/openclaw/issues/111143) | Pin plugin tabs in Control UI sidebar | P3 | Likely in 2026.11 |
| [#101422](https://github.com/openclaw/openclaw/issues/101422) | Configurable memory recall paths for markdown workspaces | P2 | High priority post-2026.10 |
| [#70266](https://github.com/openclaw/openclaw/issues/70266) | Use assistant avatar in macOS Talk Mode overlay | P3 | UI polish milestone |
| [#172607](https://github.com/openclaw/openclaw/pull/172607) | Remember native runtime consent per agent | P2 | Already in progress (PR merged) |

> 🔮 **Signal**: Focus is shifting toward **user customization, identity persistence, and workspace efficiency**—especially for power users managing multiple agents and plugins.

---

### **7. User Feedback Summary**  
Real-world pain points reported by users include:

- **Windows-specific crashes**: Multiple users report **gateway hangs and OOM kills** when using companion apps or large plugins.
- **Plugin performance degradation**: Large native binaries cause **SSD wear** due to repeated copying and hashing (#157989).
- **Invisible message loss**: Users observe **phantom messages** and **duplicate settle events** without clear audit trails (#155119, #158332).
- **Update failures**: Critical update steps fail silently or leave systems in broken states (#172395, #172053), making debugging nearly impossible.
- **Mobile instability**: Android/Termux users face **EACCES errors** when creating read-only snapshots due to file system restrictions (#167791).

> 💬 **Satisfaction**: High among developers contributing via PRs. Dissatisfaction centers on **lack of diagnostics in failures**, **unpredictable startup behavior**, and **poor error messaging**.

---

### **8. Backlog Watch**  
Several **long-standing, high-impact issues require maintainer attention**:

| Issue | Age | Status | Why It Matters |
|------|-----|--------|----------------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 6 days old | Open (P0) | Blocks gateway startup on Windows; 2.8 GB WAL growth |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 16 days old | Open (P0) | Minutes-long blockage during plugin capture |
| [#157989](https://github.com/openclaw/openclaw/issues/157989) | 20 days old | Open (P1) | 6.5 GB disk usage per startup due to poor caching |
| [#139578](https://github.com/openclaw/openclaw/issues/139578) | 40+ days old | Open (P1) | Regression in `llama.cpp` batch size causing memory spikes |
| [#126246](https://github.com/openclaw/openclaw/issues/126246) | 45+ days old | Open (P1) | Telegram deliveries stuck in `send_attempt_started` |

> 🛑 **Urgent Need**: These issues are **not being triaged or fixed quickly enough** despite their severity. Maintainers must prioritize **database durability, plugin lifecycle, and startup resilience** to prevent further user attrition.

--- 

**Next Update**: Monitor #172632, #172673, and #172669 — these PRs directly address top stability concerns.  
**GitHub Links**: All issues and PRs linked above.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-10-15**

---

### **1. Ecosystem Overview**  
The open-source personal AI agent landscape in Q4 2026 is characterized by rapid architectural evolution, with projects converging on unified runtime gateways and modular agent orchestration. While innovation remains intense—evidenced by feature-rich betas and major releases—stability concerns are emerging as a systemic bottleneck, particularly around database lifecycle management, session persistence, and cross-platform consistency. Projects are increasingly focused on production readiness, user customization, and enterprise-grade integrations (email, Slack, Telegram), signaling a maturation beyond early experimentation. The ecosystem is now at a critical inflection point: balancing aggressive feature development with foundational reliability.

---

### **2. Activity Comparison**

| Project       | Issues Updated (24h) | PRs Updated (24h) | Releases (24h) | Health Score¹ | Status             |
|---------------|----------------------|-------------------|----------------|----------------|--------------------|
| **OpenClaw**  | 500                  | 500               | None           | 🟥 Low          | High instability   |
| **Hermes Agent** | 50                | 50                | v0.22.1 + v0.22.0 | 🟨 Medium       | Post-release triage |
| **QwenPaw**   | 13                   | 34                | v2.2.2-beta.6/5 | 🟩 High         | Beta stabilization |
| **ZeroClaw**  | 28                   | 50                | None           | 🟨 Medium        | Active refinement  |

> **¹ Health Score**: Based on release stability, open P0/P1 bugs, fix rate, and community sentiment (Red = Critical risk; Yellow = Moderate; Green = Stable).  
> *Note: OpenClaw’s high activity masks deep technical debt; ZeroClaw shows strong momentum despite no release.*

---

### **3. OpenClaw's Position**  
**Advantages vs Peers:**  
- **Unmatched scale of contributions** (500 issues/PRs daily) indicates the largest active developer base among peers.  
- **Deep infrastructure focus**—UI refactoring, security hardening, and core stability fixes suggest long-term architectural investment.  
- **Community-driven bug triage** is more visible than in other projects, with real-time tracking of P0 issues.

**Technical Approach Differences:**  
- Unlike Hermes Agent’s gateway unification or QwenPaw’s beta testing cadence, OpenClaw is prioritizing **core system hygiene** over new features—removing dependencies (Lit), securing credentials, and fixing WAL bloat.  
- Its focus on **database durability** (SQLite WAL, checkpointing) reflects a low-level, systems-oriented engineering culture.

**Community Size Comparison:**  
- OpenClaw has the highest volume of public engagement (125+ comments on top issue), indicating broader reach and higher visibility. However, its **low health score** suggests growing user frustration despite developer enthusiasm.

---

### **4. Shared Technical Focus Areas**  

| Requirement                          | Projects Affected                     | Specific Needs                                                                 |
|-------------------------------------|----------------------------------------|--------------------------------------------------------------------------------|
| **Database Lifecycle Management**   | OpenClaw, ZeroClaw, QwenPaw            | Prevent WAL bloat (OpenClaw #143524), checkpoint failures (#164294), `created_at` corruption (#11420) |
| **Session Persistence & State**     | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Fix silent session loss, restore metadata, prevent state drift post-upgrade |
| **Plugin & Tool Lifecycle**         | OpenClaw, Hermes Agent, QwenPaw        | Avoid stalls during reload (OpenClaw #163029), handle config hot reloads safely |
| **Cross-Platform Reliability**      | All four projects                      | Windows startup hangs, macOS file permission errors, Android/Termux EACCES issues |
| **Message Routing Integrity**       | Hermes Agent, ZeroClaw                 | Fix thread misrouting (Telegram), auto-reply loops, message loss in channels |

> These recurring themes indicate a **shared dependency on robust I/O, state management, and event-loop safety**—critical bottlenecks across the ecosystem.

---

### **5. Differentiation Analysis**

| Dimension              | **OpenClaw**                            | **Hermes Agent**                        | **QwenPaw**                             | **ZeroClaw**                            |
|------------------------|------------------------------------------|------------------------------------------|------------------------------------------|------------------------------------------|
| **Feature Focus**      | Infrastructure cleanup, security, UX polish | Unified gateway, multi-user collaboration | Tavily integration, structured human-in-the-loop | Email channel maturity, cost control |
| **Target Users**       | Power users, developers, infra teams     | Teams, collaborative workflows           | Hybrid AI+human workflows, productivity tools | Enterprise, secure email automation |
| **Architecture**       | Monolithic core with plugin modularity   | Unified gateway runtime (v0.22.0+)       | Modular agents with extensible providers | Separated gateway/runtime (v0.9.0 goal) |
| **Deployment Model**   | Local-first, desktop/mobile              | Multi-platform (CLI, desktop, web)       | Docker-ready, cloud-friendly             | DevOps-focused (Docker, Hub mode)        |
| **Stability Signal**   | Critical P0 bugs blocking release        | Post-major-release regression surge      | Beta stabilization phase                 | Active refinement, no release yet        |

> Key Insight: **OpenClaw is the only project actively addressing systemic database and memory flaws**, while others are building on top of unstable foundations.

---

### **6. Community Momentum & Maturity**

| Tier                  | Projects                              | Characteristics |
|-----------------------|----------------------------------------|-----------------|
| **Rapid Iteration**   | OpenClaw, Hermes Agent, ZeroClaw       | >50 PRs/day; frequent merge cycles; high issue volume; experimental features |
| **Stabilization Phase** | QwenPaw                              | Two recent betas; focus on UX polish, configuration resilience, test reliability |
| **Maintenance Mode**  | IronClaw (no activity)                 | Likely inactive or paused — risk of stagnation |

> **Maturity Signal**:  
> - **OpenClaw** and **Hermes Agent** are in **"post-architectural-shift" turbulence**—innovation is high, but stability is fragile.  
> - **QwenPaw** is transitioning into **production-readiness mode**, with clear beta-to-stable roadmap.  
> - **ZeroClaw** is showing signs of **mature development discipline**, with targeted PRs and RFCs for future-proofing.

---

### **7. Trend Signals**  

1. **Enterprise Readiness is the New Frontier**  
   - Demand for **secure email integration (ZeroClaw #11751)**, **private CA trust (TLS)**, and **audit-trail fidelity (ZeroClaw #11420)** signals that developers are moving beyond personal use toward mission-critical deployments.

2. **Context & Cost Control Are Non-Negotiable**  
   - Multiple projects (ZeroClaw RFC #11735, OpenClaw #163029, QwenPaw #8225) highlight growing concern over **unbounded context growth**, **silent task cancellations**, and **zero-downtime config reloads**—indicating a shift from "what can it do?" to "how predictable and controllable is it?"

3. **Human-in-the-Loop Workflows Are Mainstream**  
   - QwenPaw’s **structured human input feature (PR #8259)** and ZeroClaw’s **bounded tool results** reflect a move toward hybrid AI+human collaboration—essential for trust, compliance, and accuracy.

4. **Testing & Observability Gaps Are Blocking Adoption**  
   - Silent failures (QwenPaw #8252), missing logs, and unreliable e2e tests (QwenPaw #8247) show that **debuggability and transparency** are now key adoption barriers—even for technically advanced users.

> 💡 **Value for Developers**:  
> - Prioritize **observability layers** (logging, diagnostics, error tracing) in your agent design.  
> - Treat **state integrity** and **data durability** as first-class concerns—not afterthoughts.  
> - Invest in **configurable limits and bounded execution** to enable safe scaling.

---

**Conclusion**: The ecosystem is shifting from “can it work?” to “can it be trusted?”. Projects that address **systemic reliability, auditability, and enterprise integration** will lead in 2027. OpenClaw leads in scale and depth of infrastructure work—but must resolve its P0 bugs fast. QwenPaw and ZeroClaw are poised for stable adoption. Hermes Agent faces a steep climb post-v0.22.0. Developers should align their roadmaps with these emerging patterns to build resilient, deployable agents.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-10-15**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active, with 50 issues and 50 pull requests updated in the past 24 hours—indicating robust developer engagement and rapid iteration. The release of **v0.22.1** (patch) and **v0.22.0** (major "Threshold Release") marks a pivotal phase in the project’s evolution, introducing foundational architectural changes like unified gateway runtime. A surge in bug reports related to session state, message delivery, and platform-specific compatibility (especially Windows/Telegram/Slack) suggests ongoing challenges in stabilizing multi-user, cross-platform workflows post-merge. Despite this, the team is rapidly addressing critical regressions through targeted PRs.

---

### **2. Releases**  

#### ✅ **v0.22.1 (rc.5-v0.22.1)** – *October 14, 2026*  
- **Type**: Patch release  
- **Summary**: Fixes for **Windows Store deployment**, plugin updates, and minor stability improvements.  
- **Key Changes**:  
  - Resolves `creds.json` corruption issues on Windows (via #138627).  
  - Addresses Telegram thread misrouting (#136567).  
  - Fixes desktop app’s site-packages loss on launch (#138689).  
- **Migration Note**: No breaking changes; upgrade recommended for all users on v0.22.0+.

#### ✅ **v0.22.0 — The Threshold Release** – *October 13, 2026*  
- **Significance**: Milestone release following ~24,200 commits, 6,080 merged PRs, and over 7,180 closed issues.  
- **Core Change**: Unified gateway runtime (`feat/unified-gateway-runtime`, #106742), enabling one gateway to manage all local sessions.  
- **Impact**: Enabled new architecture but introduced session state, message routing, and compatibility bugs (e.g., #134889, #138660).  
- **Post-Release Focus**: Immediate triage and fix cycles underway.

> 🔗 [GitHub: v0.22.0 Release Notes](https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.0)  
> 🔗 [GitHub: v0.22.1 Patch Release](https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.1)

---

### **3. Project Progress**  
**Merged PRs (Today):**  
- **#138666** – Restores session metadata & commands on `GatewayACPAgent`.  
- **#138665** – Fixes path resolution: now uses session folder instead of daemon working dir.  
- **#138664** – Reinstates allowlist and plugin gate enforcement on shared gateway.  
- **#138707** – Auto-formats JS code via `npm run fix` (CI auto-merges).  
- **#138708** – Ensures `.pyc` files are owner-writable for Squirrel.Mac updates.  

**Key Advancements:**  
- Critical fixes for **session state integrity** across CLI, desktop, and gateway.  
- Improved **cross-platform reliability** (especially Windows).  
- Enhanced **security posture** by restoring access control gates.  
- Automation improvements via CI migration to `blacksmith.sh` runners (#137895).

---

### **4. Community Hot Topics**  
Top 3 most-commented Issues highlight deep user pain points:

| Issue | Comments | Severity | Link | Summary |
|------|----------|----------|------|---------|
| [#136567](https://github.com/NousResearch/hermes-agent/issues/136567) | 23 | P2 | [Telegram DM Topic Routing](https://github.com/NousResearch/hermes-agent/issues/136567) | New Telegram threads receive opening messages without `message_thread_id`, causing lobby recovery misrouts. |
| [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) | 12 | P1 | [Session Ownership Post-Merge](https://github.com/NousResearch/hermes-agent/issues/134889) | Tracking issue for post-merge fixes after `unified-gateway-runtime` merge. Every gateway owns every local session → risk of state drift. |
| [#138660](https://github.com/NousResearch/hermes-agent/issues/138660) | 3 | P2 | [Hosted Room Member Turns Fail](https://github.com/NousResearch/hermes-agent/issues/138660) | Since v0.22.0, hosted group rooms never run member turns due to missing `member_id` in `submit`. |

**Underlying Needs**:  
- **Stable multi-user session state management** across platforms.  
- **Reliable message routing** in complex messaging ecosystems (Telegram/Slack).  
- **Backward compatibility** after major architectural shifts.

---

### **5. Bugs & Stability**  
**High-Priority Bugs (P1/P2) Reported Today:**  
1. **[#138649](https://github.com/NousResearch/hermes-agent/issues/138649)** – Telegram init hangs pre-socket (recurring #63309 family).  
   - **Impact**: Gateway fails to start after network blips.  
   - **Fix PR**: None yet; requires deeper networking investigation.  
2. **[#138689](https://github.com/NousResearch/hermes-agent/issues/138689)** – Desktop wipes bundled Python site-packages on every launch.  
   - **Impact**: Plugins lose third-party deps (yaml, spacy, etc.) silently.  
   - **Fix PR**: #138703 (in progress) – stops wiping mutable layers.  
3. **[#138660](https://github.com/NousResearch/hermes-agent/issues/138660)** – Hosted room member turns never run.  
   - **Impact**: Multi-user collaboration broken.  
   - **Fix PR**: #138665 (merged) resolves pathing but not root cause.  
4. **[#138627](https://github.com/NousResearch/hermes-agent/issues/138627)** – WhatsApp Baileys bridge corrupts `creds.json` → timeout loop.  
   - **Impact**: Users unable to re-pair.  
   - **Fix PR**: #125531 (in review) adds fallback spawn logic.

> ⚠️ **Stability Risk**: Multiple P1/P2 bugs tied to **session state**, **message delivery**, and **platform-specific edge cases** (Windows, macOS, Telegram/Slack/WhatsApp). Urgent attention needed.

---

### **6. Feature Requests & Roadmap Signals**  
User demand signals strong interest in UX polish and configurability:

| Request | Status | Link | Signal |
|--------|--------|------|--------|
| [#52554](https://github.com/NousResearch/hermes-agent/issues/52554) | Open (P3) | [Floating Quote Button](https://github.com/NousResearch/hermes-agent/issues/52554) | High user demand (3 👍); simplifies quoting from chat output. Likely next Q1 feature. |
| [#134024](https://github.com/NousResearch/hermes-agent/issues/134024) | Open (P3) | [Max-width Chat Column](https://github.com/NousResearch/hermes-agent/issues/134024) | For ultrawide monitors; 2 comments, low activity but high usability value. |
| [#138705](https://github.com/NousResearch/hermes-agent/pull/138705) | Open | [Add Render MCP Catalog Entry](https://github.com/NousResearch/hermes-agent/pull/138705) | Plugin ecosystem expansion; shows growing integration demand. |
| [#138692](https://github.com/NousResearch/hermes-agent/pull/138692) | Open | [i18n Translation Support](https://github.com/NousResearch/hermes-agent/pull/138692) | Initial extraction done; roadmap likely includes full localization. |

**Prediction**: Next version (v0.23.0) will include **UX enhancements** (floating quote button, max-width cap), **plugin catalog growth**, and **first steps toward i18n**.

---

### **7. User Feedback Summary**  
Real-world pain points reflect advanced usage patterns:

- **Multi-user Collaboration**: Users report **hosted room functionality failing** (#138660), indicating reliance on shared sessions for team workflows.
- **Desktop App Reliability**: Persistent **plugin dependency loss** on restart (#138689) erodes trust in desktop builds.
- **Platform-Specific Frustration**:  
  - Telegram users struggle with **threadless topic opens** (#136567).  
  - WhatsApp users face **crash loops after re-pair** (#138627).  
  - Slack users see **bot messages dropped mid-conversation** (#138676).
- **Installation/Update Experience**:  
  - `hermes doctor` reports **high-severity npm vulnerabilities** despite no runtime impact (#79021).  
  - `hermes update` times out on git <2.44 (#138404), blocking upgrades.

> 📌 **Overall Sentiment**: Highly engaged community with deep use cases, but frustration around **stability post-v0.22.0** and **platform-specific regressions**.

---

### **8. Backlog Watch**  
Critical long-standing or under-addressed issues needing maintainer attention:

| Issue | Age | Comments | Priority | Link |
|------|-----|----------|----------|------|
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) | 1 month | 8 | P2 | [Lifecycle Guard False Positive](https://github.com/NousResearch/hermes-agent/issues/105758) – Blocks legitimate Node.js CLIs (e.g. `obsidian-headless`). |
| [#121796](https://github.com/NousResearch/hermes-agent/issues/121796) | 1.5 months | 2 | P3 | [xAI Grok-4.7 Ignores Reasoning Effort](https://github.com/NousResearch/hermes-agent/issues/121796) – Silent failure; breaks user expectations. |
| [#119302](https://github.com/NousResearch/hermes-agent/issues/119302) | 1 month | 1 | P3 | [Skills Install Reports Stale Index](https://github.com/NousResearch/hermes-agent/issues/119302) – Misleading error message reduces trust. |
| [#138702](https://github.com/NousResearch/hermes-agent/issues/138702) | 1 day | 1 | P3 | [Duplicate Buildable Plugins Collide](https://github.com/NousResearch/hermes-agent/issues/138702) – Hard-to-reproduce, but breaks plugin system. |

> ⚠️ **Note**: These issues lack assigned maintainers and have minimal discussion. High risk of becoming technical debt if unaddressed.

---

✅ **Project Health Assessment**: **Active & High-Energy**  
- Strong momentum in releases and PRs.  
- Major architectural shift (v0.22.0) has triggered short-term instability.  
- Fix rate is high (~8 merged PRs today), but backlog pressure remains.  
- **Recommendation**: Prioritize session state, message delivery, and platform-specific regressions before expanding features.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-10-15**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust development pace: **34 PRs updated in the last 24 hours**, including multiple high-impact feature and stability fixes, and **13 new issues opened or updated**, indicating strong community engagement. The project is in a beta stabilization phase ahead of v2.2.2 final release, with two new beta versions (v2.2.2-beta.6 and v2.2.2-beta.5) released recently. Development focus is on improving UI/UX consistency, enhancing tooling (especially Tavily integration), stabilizing agent orchestration, and strengthening configuration resilience—particularly around hot reloads and cron jobs.

---

### **2. Releases**  
**Two new beta releases issued today:**  

- **[v2.2.2-beta.6](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.6)**  
  - ✅ *Fix (e2e)*: Aligns test selectors with current Console UI to prevent false negatives in CI (PR #8247).  
  - ✅ *Fix (history)*: Supports external database paths and portable backups via absolute paths, symlinks, and `~` expansion (PR #8246).  
  - 🛠️ *Chore*: Version bump to `2.2.2b6` (PR #8250).  
  > No breaking changes; migration is seamless for users with existing configurations.

- **[v2.2.2-beta.5](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.5)**  
  - ✅ *Fix (console)*: Preserves draft content when pasting long text (PR #8119).  
  - ✅ *Fix (providers)*: Recognizes newer GPT token limit parameters (PR #8090).  
  - ✅ *Fix (console)*: Refactor internal state handling to improve reliability (PR #8090).  
  > These fixes address usability and compatibility issues reported in earlier betas.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #8247**: E2E test selector alignment — critical for test reliability.  
- ✅ **PR #8246**: External DB path support — enables portability and advanced backup workflows.  
- ✅ **PR #8250**: Version bump — part of standard release cadence.  
- ✅ **PR #8119**: Draft preservation during paste — improves user experience in rich-text editing.  
- ✅ **PR #8090**: GPT token limit recognition — ensures compatibility with evolving OpenAI API.  

These merged PRs reflect progress in **stability, configuration flexibility, and UX polish**, particularly around history persistence and editor behavior.

---

### **4. Community Hot Topics**  
**Most Active Issues & PRs (by comment count and urgency):**  

- **[Issue #8174] [Feature]: Web search built-in Tavily provider lacks API key config**  
  🔗 [GitHub Issue #8174](https://github.com/agentscope-ai/QwenPaw/issues/8174)  
  💬 4 comments | ⚠️ Critical for paid Tavily users  
  > **Need**: Users with paid Tavily subscriptions cannot use their quota due to missing API key input surface. This blocks real-world utility.  
  > ✅ *PR #8204* (under review) proposes adding key via credential store — likely to be merged soon.

- **[Issue #8252] [Bug]: Agent inter-call sessions silently cancelled with no trace**  
  🔗 [GitHub Issue #8252](https://github.com/agentscope-ai/QwenPaw/issues/8252)  
  💬 2 comments | ⚠️ High severity — breaks multi-agent orchestration  
  > **Need**: Silent cancellation of agent-to-agent calls leads to undiagnosable failures. Users report "zero output" and no logs.  
  > ❌ No fix PR yet — this is a top-priority stability issue.

- **[PR #8259] [feat]: Add structured human-in-the-loop questions**  
  🔗 [GitHub PR #8259](https://github.com/agentscope-ai/QwenPaw/pull/8259)  
  💬 0 comments | 🚀 High-impact UX enhancement  
  > Enables agents to pause and collect structured user input — essential for hybrid AI+human workflows.  
  > Likely to be included in next beta.

---

### **5. Bugs & Stability**  
**Critical Bugs Reported (Ranked by Impact):**  

| Severity | Issue | Link | Status | Fix PR? |
|--------|------|------|--------|---------|
| 🔴 High | Agent inter-call session cancelled silently (no reason logged) | [#8252](https://github.com/agentscope-ai/QwenPaw/issues/8252) | Open | ❌ No PR yet |
| 🔴 High | Cron job interrupted by zero-downtime config reload | [#8225](https://github.com/agentscope-ai/QwenPaw/issues/8225) | Open | ❌ No PR yet |
| 🟡 Medium | Page load failure frequent on multiple devices | [#8120](https://github.com/agentscope-ai/QwenPaw/issues/8120) | Closed | ✅ Fixed in recent beta (likely #8247) |
| 🟡 Medium | Message navigation misaligns positions | [#8251](https://github.com/agentscope-ai/QwenPaw/issues/8251) | Open | ❌ No PR |

> **Note**: While some bugs are closed or fixed, **two core stability issues (agent call cancellations, cron interruption)** remain open and unaddressed — pose risks to production use cases.

---

### **6. Feature Requests & Roadmap Signals**  
**Emerging roadmap signals from community feedback:**  

- **Tavily API Key Support** (Issue #8174): High demand for paid quota usage. Likely to be prioritized in **v2.2.3**.  
- **Claude Code Agent Harness** (Issue #7396): Explicit request for official support. Currently placeholder-only in codebase.  
- **Hugging Face & CommandCode Provider Presets** (Issue #8233): Users want branded presets and icons — indicates desire for richer ecosystem integration.  
- **Docker Hub Mode Documentation** (Issue #8256): Missing startup guide for Hub mode → suggests growing interest in deployment scalability.  
- **Python Code Mode (Experimental)** (PR #8224): Already under development — may become a core feature in future SDKs.

> **Prediction**: v2.2.3 will likely include Tavily key support, improved model management (PR #8240), and expanded provider catalog.

---

### **7. User Feedback Summary**  
Real pain points from users:  

- **Frustration with silent agent failures** (#8252): “My multi-agent pipeline runs fine until it suddenly stops with no error.”  
- **Loss of running cron jobs** (#8225): “I save a heartbeat setting, and my scheduled task vanishes without warning.”  
- **Inability to use paid Tavily quota** (#8174): “I paid for a subscription but can’t use it in QwenPaw.”  
- **UI inconsistencies** (e.g., message nav, HTML previews): “The interface feels unstable between updates.”  
- **Desire for better documentation** (Hub + Docker): “I want to deploy in production but can’t find how.”

> Overall satisfaction is **moderate to high** — users appreciate innovation and speed of development, but **stability and configurability** are key concerns.

---

### **8. Backlog Watch**  
**Long-standing or high-impact issues needing maintainer attention:**  

- **[Issue #7396]** [Question] Claude Code third-party agent harness status — **1.5 months unresolved**, marked "Coming Soon".  
  🔗 [GitHub Issue #7396](https://github.com/agentscope-ai/QwenPaw/issues/7396)  
  > Blocks enterprise adoption of Claude-based agents. Should be clarified or prioritized.

- **[Issue #8252]** Silent agent call cancellations — **critical bug with no fix PR** despite being reported just yesterday.  
  🔗 [GitHub Issue #8252](https://github.com/agentscope-ai/QwenPaw/issues/8252)  
  > Must be addressed before v2.2.3 release.

- **[Issue #8256]** Missing Docker Hub mode docs — **only one comment**, but vital for DevOps teams.  
  🔗 [GitHub Issue #8256](https://github.com/agentscope-ai/QwenPaw/issues/8256)

> **Recommendation**: Assign dedicated owners to these three issues to ensure timely resolution.

--- 

**Digest compiled on 2026-10-15** | Source: GitHub — [QwenPaw Repository](https://github.com/agentscope-ai/QwenPaw)

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest – 2026-10-15**

---

### **1. Today's Overview**  
The ZeroClaw project remains highly active with a robust pace of development: **28 issues updated in the last 24 hours**, including 9 closed, and **50 pull requests** opened or modified—indicating strong momentum across core components. The activity is concentrated in **agent runtime stability**, **channel integration (especially email and Telegram)**, and **configuration extensibility**. Despite no new releases, significant architectural refinements are underway, particularly around agent-loop safety, session persistence, and cross-platform compatibility. The community continues to drive forward critical security, UX, and reliability improvements.

---

### **2. Releases**  
No new releases were published as of 2026-10-15. The latest stable version remains **v0.8.6**, with ongoing work toward **v0.9.0** focused on gateway separation and runtime modularity. No breaking changes have been announced for upcoming releases.

> 📌 *See release tracking: [Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)*

---

### **3. Project Progress**  
Today’s key progress includes:

- ✅ **Bug fixes merged**:  
  - [#11724](https://github.com/zeroclaw-labs/zeroclaw/issues/11724): Made per-pane session cap configurable in ZeroCode (now flexible beyond hard-coded 8 sessions).  
  - [#11694](https://github.com/zeroclaw-labs/zeroclaw/issues/11694): Resolved confusion in ZeroCode Cost tab by clarifying UTC vs. local-day totals.  
  - [#11481](https://github.com/zeroclaw-labs/zeroclaw/issues/11481): Fixed CPU spike after terminal disconnection in ZeroCode TUI.  
  - [#11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618): Prevented silent loss of queued messages when `SESSION_BUSY` is returned.

- ✅ **Feature PRs advanced**:  
  - [#11752](https://github.com/zeroclaw-labs/zeroclaw/pull/11752): Added support for custom CA trust in IMAP/SMTP via `tls_ca_cert_path`.  
  - [#11748](https://github.com/zeroclaw-labs/zeroclaw/pull/11748): Enabled STARTTLS on SMTP port 587 (Office 365 compatibility).  
  - [#11746](https://github.com/zeroclaw-labs/zeroclaw/pull/11746): Fixed attachment storage in email channel—now persists under `<workspace>/attachments/`.  
  - [#11744](https://github.com/zeroclaw-labs/zeroclaw/pull/11744): Introduced model reasoning streaming into Telegram and Slack drafts (mirroring Matrix behavior).

---

### **4. Community Hot Topics**  
The most active discussions center on **email channel maturity**, **agent-loop stability**, and **cross-platform reliability**:

- 🔥 **[Issue #11751](https://github.com/zeroclaw-labs/zeroclaw/issues/11751)**: Email channel needs `tls_ca_cert_path` for private CAs — high-priority feature request from enterprise users.  
- 🔥 **[PR #11750](https://github.com/zeroclaw-labs/zeroclaw/pull/11750)**: Fixing auto-reply loops in email channels — critical for preventing spam-like behavior.  
- 🔥 **[Issue #11735](https://github.com/zeroclaw-labs/zeroclaw/issues/11735)**: RFC proposing bounded tool results at turn boundary — addresses escalating context bloat risks in long-running agents.  
- 🔥 **[Issue #11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)**: SQLite session backend overwrites `created_at` timestamps — breaks time-based analytics and debugging.  

*These reflect deep user concerns around production readiness, security hygiene, and data integrity in mission-critical workflows.*

---

### **5. Bugs & Stability**  
Critical bugs reported today highlight systemic risks in **session persistence**, **memory management**, and **state handling**:

| Severity | Issue | Description | Fix Status |
|--------|------|-------------|------------|
| S1 (Workflow Blocked) | [#5808](https://github.com/zeroclaw-labs/zeroclaw/issues/5808) | Agent exceeds context budget immediately due to fixed prompt floor — impacts all conversations. | In-progress (high-risk, accepted) |
| S1 (Workflow Blocked) | [#10225](https://github.com/zeroclaw-labs/zeroclaw/issues/10225) | ZeroCode RPC sessions can’t reach configured channels — blocks external tool usage. | Closed (fixed via follow-up PRs) |
| S2 (Degraded Behavior) | [#11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420) | SQLite rewrites `created_at` on every turn → loses message timeline fidelity. | Open — high impact on auditability |
| S2 (Degraded Behavior) | [#11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711) | Trimming long conversations permanently deletes older turns — irreversible state loss. | Open — serious risk to conversation history |
| S2 (Degraded Behavior) | [#11706](https://github.com/zeroclaw-labs/zeroclaw/issues/11706) | `max_image_turns` doesn't release vision route — provider stays pinned unnecessarily. | Open — affects multimodal efficiency |

> ⚠️ **Note**: Several S2/S1 bugs remain open despite recent fixes, indicating ongoing stress on session and context management.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging signals suggest next-gen focus areas:

- **Email Channel Maturity**:  
  - Support for private CAs (`tls_ca_cert_path`) — essential for corporate environments.  
  - Proper handling of auto-replies/bounces to prevent mail loops.  
  - Attachment persistence and metadata retention.  
  > 📌 *Likely included in v0.9.0 or v0.9.1*

- **Agent Loop Safety & Bounded Execution**:  
  - RFC [#11735](https://github.com/zeroclaw-labs/zeroclaw/issues/11735): Bounding tool results at turn boundaries — crucial for cost control and predictability.  
  - [Issue #5808](https://github.com/zeroclaw-labs/zeroclaw/issues/5808): Defer built-in tool schemas to reduce prompt overhead — foundational optimization.

- **Extensibility & UX**:  
  - Configurable session limits per ZeroCode pane (#10665, #11724).  
  - Streaming model reasoning in Telegram/Slack (#11744).  
  - Custom provider defaults and error signaling (#11742).

> 🎯 *Predicted: v0.9.0 will emphasize agent stability, channel robustness, and configurability.*

---

### **7. User Feedback Summary**  
Real-world pain points are emerging clearly:

- **Enterprise Users**:  
  - Need secure email integrations with internal CAs and proper auto-reply filtering.  
  - Desire for predictable costs and context budgets (e.g., `max_image_turns`, `defer_tool_schemas`).  

- **Developers & Operators**:  
  - Frustration with hidden state loss (e.g., `created_at` resets, permanent trimming).  
  - Request for more transparent error reporting (e.g., missing arguments in tool schemas).  

- **TUI/UX Experience**:  
  - ZeroCode hangs during SOP pane load (#10349), blocks workflow.  
  - CPU spikes post-disconnect (#11481) affect remote usability.  

> ✅ *Overall satisfaction appears moderate — features are advancing, but stability and transparency remain top concerns.*

---

### **8. Backlog Watch**  
High-impact issues requiring maintainer attention:

- 🟡 **[RFC #11254](https://github.com/zeroclaw-labs/zeroclaw/issues/11254)**: A2A protocol crate (`zeroclaw-a2a`) — architectural refactor with high risk/high reward. Needs decision on ownership and contracts.  
- 🟡 **[Issue #11708](https://github.com/zeroclaw-labs/zeroclaw/issues/11708)**: Model routing omits required action args — causes repeated errors; requires schema fix.  
- 🟡 **[Issue #11709](https://github.com/zeroclaw-labs/zeroclaw/issues/11709)**: Upgraded sockets outlive gateway reload — potential memory leaks or stale state.  
- 🟡 **[Issue #11745](https://github.com/zeroclaw-labs/zeroclaw/issues/11745)**: Email attachments not stored — contradicts docs, breaks workflow expectations.  
- 🟡 **[PR #11737](https://github.com/zeroclaw-labs/zeroclaw/pull/11737)**: Restore principal-owned Chat sessions after restart — draft status, blocked on integration.

> 🔔 *These represent technical debt and UX gaps that could delay v0.9.0 if not prioritized.*

---

**✅ Summary**: ZeroClaw is in a phase of rapid evolution — moving from foundational architecture to production-grade reliability. While innovation is strong, **stability, data integrity, and enterprise readiness** must be prioritized in the coming weeks to maintain trust and adoption.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*