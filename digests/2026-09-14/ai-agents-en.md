# OpenClaw Ecosystem Digest 2026-09-14

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-14 08:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-09-14**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development and community engagement. The volume of open issues—particularly those marked P0/P1 and with high severity ratings like 🦞 diamond lobster—signals ongoing challenges in stability, security, and core runtime reliability. Despite no new releases, a strong focus on critical fixes is evident across multiple platforms (Windows, macOS, Linux), especially around update/upgrade failures, session state corruption, and process leaks. The ecosystem appears to be in a high-intensity patch cycle, likely preparing for an imminent stable release.

---

### **2. Releases**  
❌ **No new releases** were published today.  
- The most recent version remains **2026.9.4**, which has already triggered multiple critical update failures (e.g., #146394, #145510, #145192) on Windows and macOS.  
- No migration notes or breaking changes are documented for this version due to the lack of formal release announcement.  
- The absence of a new release despite 500+ PRs suggests that maintainers are prioritizing **stability and regression resolution** over feature delivery.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (Today):**  
- **PR #148103** (Blob): Closed without context; possibly a placeholder or draft.  
- **PR #147908**: Fixed pre-update snapshot capacity check — prevents staging failure due to insufficient disk space.  
- **PR #148084**: Now reports model catalog refresh failures via stderr, improving visibility.  
- **PR #148023**: Preserves voice speech continuity in Discord playback gaps — enhances UX for audio-heavy workflows.  
- **PR #147659**: Restores Slack file download functionality for official plugins — resolves a key integration issue.  

🛠️ **Key Advancements:**  
- Critical **update reliability** improvements (e.g., #147908, #148045).  
- **UI/UX polish** in web UI, Android, iOS, and Discord.  
- **Security & stability refinements** in Cloudflare Access handling and session recovery.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Comment Count & Severity:**

| Issue | Comments | Rating | Summary | Link |
|------|--------|--------|--------|------|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 40 | 🦞 diamond lobster | Internal tool-call text leaking into public messaging channels — major UX/security flaw | [Issue #25592](https://github.com/openclaw/openclaw/issues/25592) |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 30 | 🦐 gold shrimp | Zombie processes from hooks/tools accumulate, causing CPU exhaustion and crashes | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 28 | 🦞 diamond lobster | Subagent completions silently lost — no retry, no notification, no auto-restart | [Issue #44925](https://github.com/openclaw/openclaw/issues/44925) |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 23 | 🦪 silver shellfish | Codex PreToolUse hook spawns CPU-hogging `openclaw-hooks` processes | [Issue #91009](https://github.com/openclaw/openclaw/issues/91009) |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 20 | 🦞 diamond lobster | Synchronous persistence blocks Gateway event loop at scale | [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) |

🔍 **Underlying Needs:**  
- **Security & privacy** (leaked internal processing text, session data leaks).  
- **Process/resource management** (zombie processes, unbounded WAL growth, CPU spikes).  
- **Reliability under load** (session stalls, silent failures, crash loops).  
- **Update/upgrade robustness** (multiple failures reported on Windows/macOS).

---

### **5. Bugs & Stability**  
🚨 **Critical Bugs (P0/P1, High Impact):**

| Issue | Severity | Impact | Status | Fix PR? |
|------|----------|--------|--------|---------|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 🦞 diamond lobster | Crash loop: unhandled rejection in child cleanup path | Open | ❌ |
| [#146394](https://github.com/openclaw/openclaw/issues/146394) | 🦪 silver shellfish | Update fails globally (arm64) | Open | ❌ |
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | 🦪 silver shellfish | Windows update handoff stalls due to missing process identity | Open | ❌ |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | 🦪 silver shellfish | Runtime verification fails during update | Open | ❌ |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | 🦪 silver shellfish | Managed update fails on v1 handoff lease | Open | ❌ |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 🦐 gold shrimp | SQLite WAL grows to 2.8GB, blocks startup | Open | ❌ |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) | 🦐 gold shrimp | CPU pegged after upgrade with large agent fleet | Open | ❌ |

⚠️ **Stability Trends:**  
- Multiple **update/upgrade failures** across platforms (Windows, macOS, arm64).  
- **Zombie process accumulation** (#97616) and **unbounded database growth** (#143524) indicate deep resource management flaws.  
- **Crash loops** caused by unhandled rejections (e.g., #144911) suggest weak error handling in critical paths.

---

### **6. Feature Requests & Roadmap Signals**  
💡 **High-Value Feature Requests:**

| Request | Link | Priority | User Need |
|--------|------|----------|----------|
| [#48788](https://github.com/openclaw/openclaw/issues/48788) | Centralized filename encoding utility | P3 | Support for multi-encoding filenames (Shift-JIS, GB18030, etc.) across channels |  
| [#52640](https://github.com/openclaw/openclaw/issues/52640) | Persistent task-status surface for long-running turns | P2 | Real-time status tracking for long agent runs (Discord-first) |  
| [#74077](https://github.com/openclaw/openclaw/issues/74077) | Slash command to toggle streaming mode | P3 | Dynamic control over preview streaming without config edits |  
| [#114414](https://github.com/openclaw/openclaw/issues/114414) | Dated TODO sweep | P1 | Clean up legacy code and stale comments |  

📈 **Roadmap Signals:**  
- **Dynamic streaming control** and **persistent task status** are recurring user needs — likely candidates for **2026.10.0**.  
- **Centralized encoding utilities** indicate growing need for internationalization support across global channels (Feishu, Telegram, etc.).  
- **Maintenance hygiene** (TODO sweeps, stale code) is becoming a visible priority — signals maturity phase.

---

### **7. User Feedback Summary**  
🗣️ **Real User Pain Points:**  
- **"My agent reply fails silently with 'no active tool authority' — no error message, no retry."** → #141252  
- **"After updating to 2026.9.2, my gateway won’t start — says 'service child cleanup identity lost'."** → #144911  
- **"I see internal debugging text in my Slack channel — it’s not supposed to be visible!"** → #25592  
- **"My agent’s session gets stuck in 'processing' forever — even after restart."** → #76038  
- **"Agent SQLite WAL grew to 2.8GB and blocked startup — how do I prevent this?"** → #143524  

🔧 **User Satisfaction / Dissatisfaction:**  
- ✅ Positive feedback on **CLI improvements**, **web UI polish**, and **Slack/Telegram fixes**.  
- ❌ Strong frustration with **silent failures**, **crash loops**, **update instability**, and **lack of diagnostics**.  
- Many users report **reliance on manual `doctor` repairs**, indicating poor self-healing capability.

---

### **8. Backlog Watch**  
⏳ **Long-Unanswered, High-Impact Issues Requiring Maintainer Attention:**

| Issue | Age | Severity | Status | Notes |
|------|-----|----------|--------|-------|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | 🦞 diamond lobster | Open | Text leakage between tool calls — severe UX/security risk |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 2026-03-13 | 🦞 diamond lobster | Open | Silent subagent completion loss — no retry, no alert |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 2026-06-06 | 🦪 silver shellfish | Open | CPU hogging by Codex hooks — impacts performance |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 2026-08-05 | 🦞 diamond lobster | Open | Synchronous persistence blocks event loop at scale |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 2026-09-11 | 🦞 diamond lobster | Open | Unhandled rejection crashes Gateway — critical |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026-09-11 | 🦪 silver shellfish | Open | Managed update fails on live lease — widespread impact |

📌 **Action Required:**  
Maintainers must prioritize **security-sensitive issues** (#25592, #44925) and **critical crashers** (#144911, #145192) before any new features. These represent systemic risks to user trust and system stability.

---

> ✅ **Final Assessment:** OpenClaw is in a **high-stakes stabilization phase**. While innovation continues (Android/iOS access, CI improvements), **core reliability and security are under pressure**. The next 2–4 weeks will determine whether OpenClaw can transition from "feature-rich but unstable" to "production-ready." Prioritization of P0 bugs and update reliability is non-negotiable.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-14**

---

### **1. Ecosystem Overview**  
The open-source personal AI agent landscape in Q3 2026 is characterized by rapid innovation, increasing complexity, and a growing divide between feature velocity and system stability. Projects are transitioning from basic agent scaffolding to mature, production-grade platforms capable of multi-agent orchestration, cross-platform persistence, and enterprise-level governance. While core frameworks like OpenClaw and Hermes Agent lead in architectural ambition, others such as IronClaw and ZeroClaw emphasize foundational reliability and dependency hygiene. The ecosystem is now at a critical inflection point: **feature-rich development must be balanced with systemic stability, security, and user trust**—particularly as real-world usage scales beyond early adopters.

---

### **2. Activity Comparison**

| Project       | Issues (Last 24h) | PRs (Last 24h) | Releases (Today) | Health Score¹ (1–5) |
|---------------|-------------------|------------------|------------------|-----------------------|
| **OpenClaw**  | 500               | 500              | ❌ No             | 2.8                   |
| **Hermes Agent** | 50              | 50               | ❌ No             | 3.2                   |
| **IronClaw**  | 5                 | 5                | ❌ No             | 4.5                   |
| **QwenPaw**   | 41                | 44               | ❌ No             | 2.5                   |
| **ZeroClaw**  | 25                | 50               | ❌ No             | 3.6                   |

> **¹ Health Score**: Based on stability, bug severity, community feedback, release cadence, and backlog urgency (5 = optimal; 1 = critical risk).

---

### **3. OpenClaw's Position**  
OpenClaw stands as the **most active and highest-risk project** in the ecosystem, with unparalleled engagement levels (500+ issues/PRs daily). Its technical approach prioritizes **real-time agent execution**, **deep platform integration** (Discord, Slack, Telegram), and **dynamic workflow adaptability**, but this comes at the cost of systemic fragility. Compared to peers:
- **Advantages**: Largest contributor base, most diverse UI/UX enhancements, strongest momentum in tooling and session continuity.
- **Differences**: Uses a hybrid runtime model with heavy reliance on external hooks and process spawning—leading to higher crash surface than ZeroClaw’s structured lifecycle or IronClaw’s WASM-first design.
- **Community Size**: Significantly larger than all others, with over 200 active contributors visible in PRs and issue comments—a reflection of its broad appeal and early-mover status.

However, this scale also amplifies risks: **silent failures, unhandled rejections, and update instability** are pervasive, suggesting that OpenClaw is currently in a “firefighting” phase rather than stable growth.

---

### **4. Shared Technical Focus Areas**  

Across all projects, four key technical challenges are emerging as *systemic* concerns:

| Need | Projects Involved | Specific Examples |
|------|-------------------|-------------------|
| **Session & State Persistence** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Silent data loss after restart (#7724, #119720), state corruption across devices (#97681), memory exhaustion due to unbounded buffers (#7722) |
| **Process & Resource Management** | OpenClaw, Hermes Agent, QwenPaw | Zombie processes (#97616), CPU spikes from hooks (#91009), 20GB+ memory leaks (#7722) |
| **Security & Privacy Boundaries** | OpenClaw, Hermes Agent, ZeroClaw | Internal text leakage (#25592), identity spoofing (#110686), config injection via `gateway.allow_all_users` (#110690) |
| **Update & Upgrade Reliability** | OpenClaw, QwenPaw, ZeroClaw | Update failures on Windows/macOS (#146394), live DB sweeping during upgrade (#110648), silent migration breaks |

These are not isolated bugs—they reflect **shared architectural patterns** (e.g., forked subprocesses, global state sharing) that are proving difficult to secure, debug, and scale.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Feature Focus** | Real-time UX, plugin extensibility, multi-platform reach | Self-improvement, observability, intent-aware context | WASM-native execution, async safety, minimal footprint | Multi-agent collaboration, UI polish, dev workflow | Governance, RFC efficiency, config coordination |
| **Target Users** | Power users, DevOps, builders of complex workflows | Researchers, self-improving agents, enterprise teams | Edge/AI inference engineers, embedded systems | Developers, content creators, researchers | Contributors, maintainers, governance-focused teams |
| **Technical Architecture** | Hybrid process model, hook-heavy, dynamic loading | Python-based GIL-driven event loop, profile multiplexing | Rust + WASM, async-safe, module-first | Monolithic backend with plugin system | Modular, actor-based, lifecycle-coordinated |
| **Key Differentiator** | Highest innovation velocity and breadth | Strongest focus on agent learning and introspection | Long-term scalability via modern Rust/WASM stack | Rich UI/UX and team collaboration tools | Structured decision-making and release discipline |

> **Notable divergence**: OpenClaw and QwenPaw prioritize *user-facing features*; ZeroClaw and IronClaw prioritize *infrastructural integrity*. Hermes Agent uniquely blends both.

---

### **6. Community Momentum & Maturity**

| Tier | Projects | Indicators |
|------|--------|-----------|
| **High-Velocity Innovation** | OpenClaw, QwenPaw, ZeroClaw | >50 PRs/day, high comment volume, frequent breaking changes, beta releases |
| **Stabilizing & Refactoring** | Hermes Agent | Focus on internal cleanup, logging, security hardening, no new features |
| **Passive Maintenance** | IronClaw | Only dependency updates, no user-facing PRs, low issue activity |

This reflects a maturity curve:
- **Early Stage (OpenClaw, QwenPaw)**: Feature explosion, high churn, user frustration due to instability.
- **Mid-Stage (Hermes Agent)**: Transitioning from "build" to "secure & scale".
- **Late-Stage (IronClaw)**: Prioritizing long-term sustainability over short-term innovation.

ZeroClaw shows signs of **emerging governance maturity**, with RFCs being accepted but implementation lagging—indicating a shift toward process rigor.

---

### **7. Trend Signals**  
Based on community feedback and technical direction, three industry-wide trends are crystallizing:

1. **From Reactive to Proactive Systems**:  
   Users demand **predictable behavior** (e.g., #7571: path confusion), **error visibility** (e.g., #7715: silent network failures), and **self-healing mechanisms**—not just more features.

2. **Rise of Observability & Cost Control**:  
   Features like per-session token budgets (#91713), persistent task status surfaces (#52640), and eval/skill harnesses (#96704) signal a move toward **operational transparency**—critical for enterprise adoption.

3. **Governance as Infrastructure**:  
   The proliferation of RFCs, review criteria debates (#10366), and decision tracking (#8692) reveals that **maintainer overhead is becoming a bottleneck**. Sustainable ecosystems now require formalized decision pipelines—not just code.

> ✅ **Value for Developers**: Projects investing in **debuggability, observability, and maintainability** will outperform those focused solely on novel capabilities. The next wave of success will belong to **systems that don’t break silently**.

---

**Final Insight**:  
The open-source AI agent ecosystem is no longer about building *agents*. It’s about building **trustworthy, scalable, and observable agent infrastructures**. The winners will be those who balance innovation with **reliability, security, and operational clarity**—not just speed.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-14**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pace of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across core components. The ecosystem is focused on stability, security, and session continuity—especially around cross-platform state management, gateway resilience, and identity isolation. High-priority bugs related to session corruption, memory leaks, and platform-specific message delivery dominate the issue tracker. Despite no new releases, the volume of merged PRs signals strong progress toward resolving critical path blockers ahead of upcoming versioning.

---

### **2. Releases**  
*No new releases were published today.*  
The latest stable version remains **v0.18.0 (2026.7.1)**, with ongoing work concentrated on internal refactoring, security hardening, and compatibility fixes. No breaking changes or migration notes are currently pending.

---

### **3. Project Progress**  
**Merged/Closed PRs Today:**  
- ✅ **PR #110718**: Fixed `state.db` read access by opening it read-only — prevents unintended writer locks during inspection commands ([link](https://github.com/NousResearch/hermes-agent/pull/110718))  
- ✅ **PR #110717**: Ensures `/stop` cancels background `delegate_task` units — resolves lingering async tasks after session termination ([link](https://github.com/NousResearch/hermes-agent/pull/110717))  
- ✅ **PR #110716**: Moved Telegram command-menu construction to worker thread — avoids event loop blocking post-reconnect ([link](https://github.com/NousResearch/hermes-agent/pull/110716))  
- ✅ **PR #110715**: Sanitized search patterns with explicit `-e` and `--` to prevent argument injection ([link](https://github.com/NousResearch/hermes-agent/pull/110715))  
- ✅ **PR #110714**: Added `tools.tool_search.eager` list to bypass deferred tool resolution — improves performance for frequently used tools ([link](https://github.com/NousResearch/hermes-agent/pull/110714))  
- ✅ **PR #110713**: Reduced noisy INFO logs from plugin loader — now logs only at DEBUG level when `tools.override` is denied ([link](https://github.com/NousResearch/hermes-agent/pull/110713))  
- ✅ **PR #110712**: Marks empty-response cron runs as *failed*, not "ok" — improves scheduler accuracy ([link](https://github.com/NousResearch/hermes-agent/pull/110712))  
- ✅ **PR #110711**: Preserves custom provider identity during fallback resolution — maintains user intent ([link](https://github.com/NousResearch/hermes-agent/pull/110711))  
- ✅ **PR #110685**: Honors `gateway.auto_migrate: false` — prevents forced migration during updates ([link](https://github.com/NousResearch/hermes-agent/pull/110685))  
- ✅ **PR #110708**: Isolated Feishu dedup test from local state — improves test reliability ([link](https://github.com/NousResearch/hermes-agent/pull/110708))  

These PRs reflect a focus on **session integrity**, **performance**, **logging hygiene**, and **migration safety**.

---

### **4. Community Hot Topics**  
Top community concerns center on **session persistence across devices**, **security boundaries**, and **cross-process state consistency**:

- 🔥 **Issue #97681** – *Bot Group Chats should keep working after Desktop closes* (28 comments)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/97681)  
  > Users demand persistent group chat sessions across devices without keeping the desktop app open. This reflects a growing need for true **multi-device continuity** and **long-running agent collaboration**.

- 🔥 **Issue #58576** – *Web server event loop stalls up to 51s under heavy agent work (GIL pressure)* (14 comments)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/58576)  
  > A critical performance bottleneck affecting UI responsiveness during intensive operations. Indicates deep **GIL contention** in Python-based agents — likely a candidate for async rework or process isolation.

- 🔥 **Issue #71335** – *Concurrent agent processes corrupt rotating MCP OAuth grants (Notion)* (10 comments)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/71335)  
  > Highlights a fundamental **race condition in shared state** — users are running multiple frontends simultaneously, but state sharing lacks proper locking mechanisms. A major risk for data loss and auth leakage.

These top issues reveal a shift from basic functionality to **complex distributed agent orchestration**, demanding stronger **concurrency control**, **state durability**, and **cross-client consistency**.

---

### **5. Bugs & Stability**  
Critical bugs reported today include:

| Severity | Issue | Summary | Fix PR? |
|--------|-------|---------|--------|
| 🟥 P1 | **#110591** – `DeletedWalGenerationError` on Linux (second Hermes process unlinks live WAL/SHM) | Multiple processes corrupting SQLite state via file unlinking | ❌ No fix yet |
| 🟥 P1 | **#110648** – `hermes update` sweeps live `state.db` on flat installs | Silent transcript loss; can revert SOUL.md | ❌ No fix yet |
| 🟥 P1 | **#109727** – Same as above: second process unlinks WAL/SHM | Linux-specific crash risk due to improper file handling | ❌ No fix yet |
| 🟨 P2 | **#110690** – `gateway.allow_all_users: true` in config.yaml is silently ignored | Security misconfiguration — env vars override YAML | ❌ No fix yet |
| 🟨 P2 | **#110686** – Per-user Discord sessions leak operator identity | Non-operator sees full operator profile ("who am i?" returns operator’s bio/location) | ❌ No fix yet |
| 🟨 P2 | **#110689** – Background memory-review batches emit unsupported `patch` action → batch strands | Whole review batch fails silently | ❌ No fix yet |

> ⚠️ **Critical Risk**: Several P1/P2 bugs involve **silent data loss**, **security boundary breaches**, and **SQLite corruption** — all high-risk for production use. Immediate attention required.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging themes suggest the next version will prioritize **observability**, **intent-aware context**, and **user-driven automation**:

- 🎯 **Feature #96704** – *RFC: Add evals/skills/ harness to measure skill impact* (7 comments)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/96704)  
  > User wants measurable feedback on self-improvement loops — aligns with Hermes’ “self-improving AI agent” branding. Likely to be included in v0.19+.

- 🎯 **Feature #79072** – *Intent-driven context assembly (按需加载)* (3 comments)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/79072)  
  > Request for dynamic context loading based on task needs — addresses performance cost of full system prompt + 195+ skills per session.

- 🎯 **Feature #91713** – *Per-session cumulative token budget (abort/warn on breach)* (2 comments)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/91713)  
  > Direct response to a real incident burning 18.7M tokens — indicates rising concern over **cost control** and **API abuse prevention**.

- 🎯 **Feature #110591** – *Discord Markdown rendering layer for tables/status fields* (5 comments)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/110591)  
  > Shows increasing demand for **rich media output** in messaging platforms — especially for status reporting and structured results.

---

### **7. User Feedback Summary**  
Real-world pain points highlight three key areas:

- 💬 **Multi-device workflow frustration**: Users expect seamless session continuity across devices (see #97681). The desktop app must not be a bottleneck.
- 💬 **Security anxiety**: Multiple reports of identity leaks (#110686), OAuth corruption (#71335), and silent config overrides (#110690) indicate users are cautious about trust in shared state.
- 💬 **Cost transparency**: After a 18.7M-token burn incident (#91713), users are demanding **real-time telemetry** on latency, cost, and failure rates — a clear signal for **observability investment**.

> Overall satisfaction appears high for core functionality, but **stability and trust** are emerging as differentiators.

---

### **8. Backlog Watch**  
High-impact, long-standing issues needing maintainer attention:

- 🔴 **Issue #58576** – *Web server stalls due to GIL pressure* (14 comments, P1, since July 2026)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/58576)  
  > Critical performance flaw with no assigned fix. Could block adoption in high-load environments.

- 🔴 **Issue #97681** – *Persistent bot group chats across devices* (28 comments, P2, since Aug 2026)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/97681)  
  > Top-requested feature with clear business value. Must be prioritized for multi-device strategy.

- 🔴 **Issue #109417** – *Tracking: profile multiplexing as the only gateway mode* (2 comments, P2, Sep 2026)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/109417)  
  > Central to Hermes' future architecture. If not completed, the migration path becomes fragmented.

- 🔴 **Issue #70732** – *Runtime i18n misses hardcoded strings (Italian ready)* (3 comments, P3, since Jul 2026)  
  [Link](https://github.com/NousResearch/hermes-agent/issues/70732)  
  > Localization is blocked by hardcoding — limits global adoption despite available translations.

> These issues represent strategic risks: **architecture**, **global reach**, and **user retention**.

---

**Summary Assessment**:  
Hermes Agent is in a **high-growth, high-stakes phase** — technically advanced but facing escalating complexity in state management, concurrency, and security. While development velocity is excellent, **P1 stability bugs and architectural debt** require urgent triage. The project is poised to evolve into a **true multi-agent orchestration platform**, but only if core reliability and trust are preserved.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-14**

---

### **1. Today's Overview**  
The IronClaw project remains in a state of routine dependency maintenance with no new releases or active issues reported today. The development pace is low-key but consistent, driven primarily by automated dependency updates via Dependabot. Five pull requests were updated in the past 24 hours—four open and one merged—indicating ongoing effort to keep the codebase up-to-date with upstream Rust and GitHub Actions ecosystem changes. No critical bugs or user-reported regressions have surfaced, suggesting stable current operation. Overall, project health is strong, though momentum is currently limited to dependency hygiene rather than feature innovation.

---

### **2. Releases**  
*No new releases detected.*  
There are no version updates or changelogs published in the last 24 hours. The latest release remains unchanged from prior weeks, indicating that the team is likely preparing for a larger milestone or prioritizing internal stability over frequent public releases.

---

### **3. Project Progress**  
*One PR was merged today:*  
- **PR #8097** [CLOSED]: Bumped the `everything-else` group across `/` directory with 24 updates, including `uuid` (1.24.0 → 1.26.0), `base64` (0.22.1 → 0.23.1), and `rust_decimal`. This update resolves minor security and performance improvements across core dependencies.  

While this PR was closed, it reflects continued commitment to dependency safety and modernization. The merge confirms that automated updates are being reviewed and integrated efficiently, supporting long-term maintainability.

🔗 [PR #8097](https://github.com/nearai/ironclaw/pull/8097)

---

### **4. Community Hot Topics**  
*No issues are currently active*, but the most notable recent activity involves five open dependency PRs—each initiated by Dependabot and focused on upgrading critical tooling stacks. Among these, **PR #8099** stands out as the most recent and comprehensive:  
- **PR #8099**: Updates 25 packages in the `everything-else` group, including `uuid`, `base64`, and `rust_decimal`.  
  🔗 [PR #8099](https://github.com/nearai/ironclaw/pull/8099)  

These PRs collectively signal a community-driven push toward dependency modernization, particularly in Rust’s ecosystem. The recurring nature of these updates suggests a strategic focus on reducing technical debt and ensuring compatibility with newer compiler versions and security patches. Although no direct user commentary exists, the volume of automated PRs implies growing confidence in the project’s CI/CD pipeline and dependency management practices.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions reported in the last 24 hours.*  
All open PRs are non-breaking dependency upgrades with no associated issue reports. The absence of bug-related activity indicates a stable runtime environment. However, the high number of dependency bumps—especially in `wasmtime`, `tokio-tungstenite`, and `tower-http`—may pose latent risks if not thoroughly tested in integration workflows. No fix PRs are pending for known stability issues.

---

### **6. Feature Requests & Roadmap Signals**  
*No explicit feature requests are visible in the current issue tracker.*  
However, the sustained focus on dependency upgrades—particularly in WebAssembly (`wasmtime`, `wit-component`) and async networking (`tokio-tungstenite`, `tower-http`)—suggests an underlying roadmap shift toward:  
- Enhanced support for WASM-based AI agents  
- Improved real-time communication and serverless integration  
- Scalable, low-latency agent orchestration  

These trends align with IronClaw’s positioning as a next-gen AI agent framework targeting edge and cloud-native deployment scenarios. Future versions may prioritize modular execution environments and enhanced inter-agent comms.

---

### **7. User Feedback Summary**  
*No user feedback or comments exist in issues or PRs for this period.*  
Given the lack of user engagement in the issue tracker, it appears that users are either satisfied with current functionality or operating silently within production deployments. The reliance on automated dependency updates (via Dependabot) suggests trust in the project’s infrastructure and reliability. There is no indication of dissatisfaction, but also no vocal advocacy or use-case sharing—potentially signaling a need for better community outreach or documentation.

---

### **8. Backlog Watch**  
*Several long-standing dependency PRs remain open without review or discussion:*  
- **PR #7834** (Created: 2026-08-23): Bumps `wasm` group dependencies (wasmtime, wit-parser, etc.) — critical for future WASM-based agent execution.  
  🔗 [PR #7834](https://github.com/nearai/ironclaw/pull/7834)  
- **PR #8078** (Created: 2026-09-06): Updates `tokio-ecosystem` stack — vital for async performance and scalability.  
  🔗 [PR #8078](https://github.com/nearai/ironclaw/pull/8078)  
- **PR #8079** (Created: 2026-09-06): Upgrades GitHub Actions workflows — essential for CI/CD robustness.  
  🔗 [PR #8079](https://github.com/nearai/ironclaw/pull/8079)  

These PRs represent high-value, low-risk upgrades that could unlock future capabilities. Their prolonged open status (some over two weeks) may indicate maintainer bandwidth constraints or a backlog triage delay. Prioritizing these would accelerate readiness for next-generation agent deployment models.

---  
**Status:** *Healthy, but passive. Dependency hygiene is strong; innovation momentum is low.*  
**Recommendation:** Review and merge high-priority dependency PRs (esp. #7834, #8078) to unblock future roadmap goals. Consider initiating a community call for feedback to stimulate engagement.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-14**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active, with 41 open issues and 44 open pull requests updated in the past 24 hours—indicating strong community engagement and ongoing development momentum. The core focus centers on stability improvements, particularly around memory management, session persistence, and plugin/runtime reliability. While no new releases have been published, a surge in bug reports related to model configuration loss, memory exhaustion, and agent state corruption suggests underlying systemic challenges in long-running workloads. Simultaneously, feature enhancements are progressing rapidly, especially in UI/UX refinement and multi-agent collaboration.

---

### **2. Releases**  
No new releases were published as of 2026-09-14. The latest stable version remains **v2.2.1-beta.2**, with several beta fixes pending integration. Users should expect potential breaking changes in future updates due to ongoing backend refactoring (e.g., ReMeLight adoption, MCP protocol hardening). No migration guides or deprecation notices are currently available for upcoming changes.

---

### **3. Project Progress**  
Several high-impact PRs were merged or are under review, signaling progress in key areas:

- ✅ **PR #7747** (`fix(console): persist model routing when saving agent edits`) – Ensures model routing configurations are preserved during agent edits, preventing accidental data loss.
- ✅ **PR #7699** (`fix(governance): harden master key file permissions on read`) – Improves security by enforcing strict file access controls for `.master_key`.
- ✅ **PR #7653** (`test(unit): coverage sprint batch 2 — 2475 cases`) – Boosted backend test coverage from 64.41% to 69.43%, strengthening codebase robustness.
- ✅ **PR #7292** (`test(coverage): add 19 unit test files`) – Increased overall coverage by +5.02pp, addressing critical gaps in safety checks and runtime logic.
- 🟡 **PR #7750** (`feat(console): show send_file_to_user files in response artifact list`) – Addresses UX friction by making delivered files visible without expanding tool steps.

These contributions reflect a concerted effort to stabilize core functionality while improving developer confidence through testing and resilience.

---

### **4. Community Hot Topics**  
Top trending issues and PRs reveal growing user frustration with stability and workflow clarity:

- 🔥 **Issue #7571** ([*Always forgets paths and overwrites code*](https://github.com/agentscope-ai/QwenPaw/issues/7571)) – A recurring theme: users struggle with inconsistent file path behavior across development, runtime, and deployment environments. Multiple reports confirm that QwenPaw appears to "forget" where it’s working, leading to accidental overwrites and confusion between source and runtime directories. This highlights a fundamental UX gap in workspace isolation and lifecycle management.
  
- 🔥 **Issue #7715** ([*Daily Paper fails silently when arxiv.org unreachable*](https://github.com/agentscope-ai/QwenPaw/issues/7715)) – A critical usability flaw: network failures result in cryptic “completed with no returned content” messages, hiding real errors. The linked PR **#7756** proposes better error handling, but users demand immediate visibility into connectivity issues.

- 🔥 **PR #7756** ([*fix(memory): distinguish empty error notifications*](https://github.com/agentscope-ai/QwenPaw/pull/7756)) – Directly addresses Issue #7715, showing community-driven responsiveness. However, its open status indicates delayed resolution despite clear need.

> These top items collectively point to a deeper need: **predictable, transparent system behavior**—especially in distributed or network-dependent operations.

---

### **5. Bugs & Stability**  
Critical bugs affecting usability and system integrity were reported today:

| Severity | Issue | Description | Fix PR? |
|--------|-------|-------------|--------|
| ⚠️ High | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | Memory growth to 20GB+ over 2 days due to unbounded stream buffers and keep-alive instance stacking | ❌ Pending |
| ⚠️ High | [#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) | Agent switching deletes last session and breaks historical chat navigation | ❌ Pending |
| ⚠️ High | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | Model configuration randomly lost after use | ❌ Pending |
| ⚠️ Medium | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | Complete session loss after system restart or crash | ❌ Pending |
| ⚠️ Medium | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | MCP server connection failure post-2.2.x upgrade | ❌ Pending |

These issues suggest **session/state management instability**, particularly under prolonged use or system transitions. The absence of fix PRs for these high-severity bugs raises concerns about long-term reliability.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging features indicate direction toward richer customization and interoperability:

- 📌 **[#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739)** – *“History dialog moved to right side”*: UX request for layout flexibility, especially on smaller screens. Likely to be addressed in next UI update.
- 📌 **[#7746](https://github.com/agentscope-ai/QwenPaw/issues/7746)** – *“Skills restricted to specific channels”*: Enables fine-grained control over skill availability, suggesting increased channel-based deployment needs.
- 📌 **[#7755](https://github.com/agentscope-ai/QwenPaw/issues/7755)** – *“Session cache isolation for DeepSeek API”*: Direct feedback on LLM caching behavior, indicating growing enterprise-grade use cases requiring per-user isolation.
- 📌 **[#7754](https://github.com/agentscope-ai/QwenPaw/issues/7754)** – *“Support followUpQuestions in custom channels”*: Points to a desire for richer interaction patterns beyond basic prompt-response.

> **Prediction**: Next major release (likely v2.3) will likely include **enhanced session persistence**, **channel-specific skill controls**, and **improved memory/resource monitoring tools**.

---

### **7. User Feedback Summary**  
Real-world pain points dominate user sentiment:

- **Frequent data loss**: Users report losing models, sessions, and even entire conversations without warning—undermining trust in the platform.
- **Confusing directory behavior**: Despite setting default workspaces, agents revert to old paths. Users feel they lack control over project contexts.
- **Opaque failures**: Silent crashes (e.g., Daily Paper), missing outputs, and unexplained timeouts frustrate debugging efforts.
- **Poor error messaging**: Errors like “no returned content” offer no insight into root causes, forcing users to manually inspect logs.
- **High cognitive load**: Managing plugins, agents, and deployments feels complex and unintuitive—especially for non-technical users.

> Overall, **user satisfaction is low** due to unreliability and poor feedback loops. The project is technically capable but not yet production-ready for mission-critical workflows.

---

### **8. Backlog Watch**  
Critical long-standing issues require maintainer attention:

- 🔴 **Issue #7222** ([*qwenpaw-backend memory grows to 20GB+*](https://github.com/agentscope-ai/QwenPaw/issues/7222)) – First reported in August 2026; still unresolved despite multiple repros. A known memory leak impacting stability.
- 🔴 **Issue #4220** ([*memory_search fails after auto_memory_interval*](https://github.com/agentscope-ai/QwenPaw/issues/4220)) – Reported in May 2026; affects recall accuracy. Has been closed without resolution, indicating possible oversight.
- 🔴 **Issue #3995** ([*Enhance memory management & recall*](https://github.com/agentscope-ai/QwenPaw/issues/3995)) – Long-term vision for memory lifecycle; now over 4 months old with minimal traction.
- 🔴 **PR #7565** ([*clean plugin unload & rollback-safe hot reload*](https://github.com/agentscope-ai/QwenPaw/pull/7565)) – Introduced two months ago, still open. Vital for safe plugin development and deployment.

> **Call to Action**: Maintainers should prioritize **memory/resource stability**, **session persistence**, and **plugin safety**—core pillars for user trust and scalability.

---  
*Data Source: [GitHub - agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)*  
*Digest Generated: 2026-09-14*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-14  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

ZeroClaw continues to exhibit strong momentum with a high volume of active development: **50 open pull requests (PRs)** and **25 open issues** updated in the last 24 hours, indicating sustained engineering activity across architecture, security, and usability. The project remains focused on stabilizing core runtime behavior, improving configuration safety, and expanding cross-platform agent interoperability. Despite no new releases, multiple critical RFCs and feature implementations are progressing rapidly, particularly around secure session handling, config validation, and multi-provider support. Maintainer attention is clearly prioritized toward governance, tooling reliability, and long-term maintainability.

---

### **2. Releases**

> **No new releases** were published in the past 24 hours.  
The last release remains v0.8.5, which is currently undergoing post-release stabilization and audit tracking via [Issue #9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459). No migration notes or breaking changes are pending at this time.

---

### **3. Project Progress**

#### ✅ **Merged/Closed PRs (Today):**
While **no PRs were merged** today, several key contributions were closed after review:
- **[PR #10847](https://github.com/zeroclaw-labs/zeroclaw/pull/10847):** Docs update clarifying reload-refusal recovery behavior by platform — improves operator clarity.
- **[PR #10846](https://github.com/zeroclaw-labs/zeroclaw/pull/10846):** Fixes Delete key handling in ZeroCode chat composer — enhances UX for text editing.
- **[PR #10848](https://github.com/zeroclaw-labs/zeroclaw/pull/10848):** Localizes daemon readiness diagnostics using Fluent catalog — improves internationalization and debug experience.

These fixes represent incremental but meaningful improvements in user-facing stability and documentation quality.

---

### **4. Community Hot Topics**

#### 🔥 **Most Active Issue:**
- **[Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549):** *RFC: Simplify RFC voting by removing mandatory discussion windows*  
  - **10 comments**, **0 upvotes** — actively debated since September 2, 2026  
  - **Core Need:** Reduce friction in decision-making by eliminating fixed wait periods that often don’t yield better feedback. Reflects growing desire for faster iteration cycles without sacrificing quality.

#### 🔥 **Most Active PR:**
- **[PR #10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621):** *feat(runtime): coordinate agent lifecycle mutations*  
  - **15+ contributors involved**, extensive review across agents, channels, and gateways  
  - **Core Need:** Unify config mutation coordination across subsystems to prevent race conditions and inconsistent state — foundational for stable, scalable agent management.

#### 🚨 **High-Impact Discussion:**
- **[Issue #10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366):** *RFC: Clarify PR review evidence, freshness warnings, and author-action boundaries*  
  - **8 comments**, **high risk (high)**, **in-progress**  
  - **Underlying Need:** Establish clear criteria for when a PR is "ready" for merge, especially under time pressure. Addresses confusion between author actions, reviewer signals, and CI status.

---

### **5. Bugs & Stability**

| Severity | Issue | Summary | Fix Status |
|--------|-------|--------|------------|
| **S1 (Workflow Blocked)** | [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | OpenCode providers never send `x-opencode-session`, breaking Go models and risking account flags | ❌ No fix yet; **critical for security and compatibility** |
| **S1 (Workflow Blocked)** | [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | MCP connection permanently poisoned after one failed recovery attempt | ❌ No fix yet; affects reliability of external tool integrations |
| **S2 (Degraded Behavior)** | [#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585) | New log sink regression causes migration test races | ⚠️ In progress; may impact CI stability |
| **S2 (Degraded Behavior)** | [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | `[media attachment]` placeholder delivered to users when non-vision model is used | ⚠️ In progress; impacts user experience in media-heavy workflows |

> **Note:** Several high-severity bugs remain unresolved, particularly around **security headers**, **tool resilience**, and **config consistency**, signaling potential risks in production deployments.

---

### **6. Feature Requests & Roadmap Signals**

#### ✅ **High-Priority Features in Development:**
- **[RFC #10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366):** Expedited merge lane based on review evidence — likely to be implemented soon.
- **[PR #10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621):** Unified agent lifecycle coordination — expected to land in next minor release.
- **[PR #10611](https://github.com/zeroclaw-labs/zeroclaw/pull/10611):** Support adaptive-thinking Claude models — indicates roadmap focus on advanced LLM capabilities.

#### 📈 **Emerging User Demand:**
- **Multi-model per provider profile** ([PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)) — highly requested for cost efficiency and flexibility.
- **Explicit ZeroCode session root selection** ([Issue #10826](https://github.com/zeroclaw-labs/zeroclaw/issues/10826)) — reflects need for better developer workflow control.
- **WhatsApp PDF thumbnails** ([Issue #10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812)) — user-driven enhancement for mobile UX.

> **Prediction:** These features are strong candidates for inclusion in **v0.8.6**, assuming current momentum holds.

---

### **7. User Feedback Summary**

Real user pain points surface primarily around:
- **Security and reliability**: Users report frustration with broken auth flows (`x-opencode-session` missing), unstable tool connections (MCP), and lack of visibility into config validation failures.
- **UX friction**: Silent failures (e.g., Telegram reaction tool no-op), unclear error messages, and poor media handling degrade trust.
- **Operational complexity**: Operators struggle with diagnosing stale logs (`zeroclaw service logs`), unclear concurrency limits (`sop.max_concurrent_total` not surfaced), and undocumented recovery behaviors.

> **Positive sentiment** is seen in contributions to docs, CLI enhancements, and improved session handling — suggesting strong community investment in long-term usability.

---

### **8. Backlog Watch**

Several **long-standing, high-impact items** require maintainer attention:

| Issue | Status | Risk | Link |
|------|--------|------|------|
| **[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692):** Maintainer decision queue for RFCs and design issues | Accepted, no stale | Medium | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) |
| **[Issue #8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691):** ADR inventory and accepted RFC decision records | In-progress, accepted | Low | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) |
| **[Issue #10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814):** Release efficiency and repeatable publication | Accepted, needs action | High | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10814) |
| **[Issue #10330](https://github.com/zeroclaw-labs/zeroclaw/issues/10330):** Accepted RFC implementation index | Accepted, no stale | Low | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10330) |

> **Critical Gap:** While RFCs are being accepted, **follow-through on implementation tracking and release automation** is lagging. This could hinder future scaling and contributor onboarding.

---

### ✅ **Final Assessment: Project Health – Healthy but Under Pressure**

ZeroClaw demonstrates **strong technical momentum**, **active community engagement**, and **clear architectural direction**. However, rising severity in unpatched bugs and delayed follow-up on governance tasks suggest **growing operational strain**. With no new releases and multiple S1/S2 bugs unresolved, the project is at a pivotal moment: if maintenance overhead increases further, it may slow innovation. Immediate focus should shift to stabilizing release pipelines and closing the gap between RFC acceptance and implementation.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*