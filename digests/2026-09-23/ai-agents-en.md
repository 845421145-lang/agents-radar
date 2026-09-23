# OpenClaw Ecosystem Digest 2026-09-23

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-23 00:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest – 2026-09-23**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active with **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development and community engagement. The issue backlog is dominated by high-severity stability concerns—particularly memory leaks, crash loops, session state corruption, and silent data loss—suggesting ongoing stress on core runtime reliability. A significant number of open PRs reflect focused efforts on improving CI/CD robustness, tooling correctness, and session lifecycle management. Despite no new releases, the velocity of fixes and feature work signals a mature but operationally pressured codebase under active maintenance.

---

### **2. Releases**  
**None**  
No new versions were released today. The latest stable version remains `2026.9.5` (ec9c1a1), which has already triggered multiple critical regressions (e.g., #155764, #154381). Users are advised to avoid upgrading until pending fixes are merged and validated.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- **PR #156040** (`fix(ci): avoid dependency warnings from unrelated main updates`) — resolves false-positive CI noise.  
- **PR #155430** (`fix: CLI backend runs record only their last model call's usage`) — corrects inaccurate cost tracking for multi-call turns.  
- **PR #132955** (`fix: recreate agent database after explicit close`) — prevents database initialization race conditions.  

These merges indicate progress in stabilizing internal tooling, diagnostics, and edge-case handling in agent persistence and usage reporting.

---

### **4. Community Hot Topics**  
Top Issues by comment count highlight systemic pain points:

- **[Issue #91588]** Critical memory leak causing OOM crashes (34 comments)  
  🔗 [GitHub #91588](https://github.com/openclaw/openclaw/issues/91588)  
  *Underlying need:* Long-term process stability and resource isolation in production deployments.

- **[Issue #44925]** Silent subagent completion loss with no retry or notification (29 comments)  
  🔗 [GitHub #44925](https://github.com/openclaw/openclaw/issues/44925)  
  *Underlying need:* Reliability in distributed task orchestration and failure visibility.

- **[Issue #119720]** Synchronous agent persistence blocks event loop at scale (22 comments)  
  🔗 [GitHub #119720](https://github.com/openclaw/openclaw/issues/119720)  
  *Underlying need:* Scalability and non-blocking I/O design for multi-agent systems.

Top PRs show infrastructure focus:
- **PR #155631** (`perf(state): keep foreground writes responsive during SQLite contention`) — addresses latency under load (9 comments)  
  🔗 [GitHub #155631](https://github.com/openclaw/openclaw/pull/155631)

These reflect a community deeply invested in performance, observability, and resilience.

---

### **5. Bugs & Stability**  
High-severity bugs reported today include:

| Issue | Severity | Impact | Status | Fix PR? |
|------|----------|--------|--------|--------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | P0 (Critical) | Memory leak → OOM → crash loop | Open | ❌ |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) | P1 | CPU pegging in filesystem discovery | Open | ❌ |
| [#155764](https://github.com/openclaw/openclaw/issues/155764) | P0 | Update blocked by retained plugin conflict | Open | ❌ |
| [#154381](https://github.com/openclaw/openclaw/issues/154381) | P0 | Updater fails to respect timeout override | Open | ❌ |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) | P1 | Windows upgrade leaves legacy state | Open | ❌ |

All are marked as **crash-loop**, **UX-release-blocker**, or **recovery-stuck**, indicating deployment risks. No fix PRs have been linked to these yet.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging trends suggest roadmap priorities:

- **Built-in headless browser** (#53763): High demand for reliable web access without external dependencies.
- **Companion-friendly SQLite seams** (#79902): Need for structured, accessible session state for advanced users.
- **Dynamic model discovery** (#10687): Demand for real-time catalog sync (esp. OpenRouter).
- **Production-readiness labeling** (#73537): User desire for clear stability indicators on releases.

These features point toward **production-grade usability**, **extensibility**, and **observability** as next-phase goals beyond core AI agent functionality.

---

### **7. User Feedback Summary**  
Real user pain points revealed through issues:

- **"I run OpenClaw as a family/business assistant"** — #73537 (user sentiment)  
  ✅ Satisfaction: High utility in automation, Home Assistant, Telegram workflows.  
  ❌ Dissatisfaction: Fear of silent failures (data loss), lack of release clarity, poor recovery paths.

- **"Messages disappear silently"** — #112259, #126246  
  Users report losing inbound/outbound messages with no alerts — erodes trust in message integrity.

- **"Update fails unexpectedly"** — #155764, #154381  
  Developers and sysadmins express frustration with update blockers that require manual intervention.

Overall, users value OpenClaw’s power but are concerned about **resilience**, **transparency**, and **predictable upgrades**.

---

### **8. Backlog Watch**  
Critical long-standing issues needing maintainer attention:

- **[Issue #119720]** Synchronous agent persistence blocks event loop at scale — **22 comments, P1, clawsweeper-recovery-stuck**  
  🔗 [GitHub #119720](https://github.com/openclaw/openclaw/issues/119720)  
  *Status:* Needs product decision; currently stuck in "needs-review" limbo despite known impact.

- **[Issue #91588]** Gateway memory leak (RSS 350MB → 15.5GB) — **34 comments, P0, impact:crash-loop**  
  🔗 [GitHub #91588](https://github.com/openclaw/openclaw/issues/91588)  
  *Status:* Still open with no assigned fix PR — highest risk to uptime.

- **[PR #135996]** UI sidebar count misalignment across catalogs — **8 comments, status: ⏳ waiting on author**  
  🔗 [GitHub #135996](https://github.com/openclaw/openclaw/pull/135996)  
  *Status:* Blocked by test race condition; requires author follow-up.

These items represent **critical gaps in stability, UX, and maintainability** that could delay broader adoption if unresolved.

---

> 📊 **Project Health Score**: ⚠️ **Moderate Risk** — High activity masks deep instability in core runtime. Urgent triage needed on P0/P1 bugs and stalled PRs.  
> 🔗 **Dashboard**: [openclaw/openclaw GitHub](https://github.com/openclaw/openclaw)

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-23**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem in Q3 2026 is characterized by rapid evolution, increasing technical maturity, and divergent strategic paths. Projects are moving beyond basic LLM orchestration toward production-grade reliability, multi-agent collaboration, and cross-platform consistency. While core functionality remains strong, a growing emphasis on **stability, security, UX integrity, and global accessibility** signals that the community is transitioning from experimental tooling to deployable systems. High activity across all projects reflects intense innovation, but also reveals systemic risks—particularly around memory safety, session persistence, and configuration resilience—that could delay enterprise adoption.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Releases (Today) | Health Score |
|--------|-------------------|----------------|------------------|--------------|
| **OpenClaw** | 500 | 500 | ❌ None | ⚠️ Moderate Risk |
| **Hermes Agent** | 50 | 50 | ❌ None | ✅ High Stability |
| **IronClaw** | 0 | 3 | ❌ None | ✅ 8.5/10 |
| **QwenPaw** | 37 | 49 | ❌ None | ⭐⭐⭐⭐☆ (4/5) |
| **ZeroClaw** | 33 | 50 | ❌ None | ⚠️ High Risk (S0/S1 bugs) |

> 🔍 *Insight*: OpenClaw leads in raw velocity—but at the cost of stability. ZeroClaw and QwenPaw show high-quality, focused iteration. IronClaw operates with deliberate polish; Hermes maintains balanced momentum.

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the **most active and technically ambitious project**, with unmatched developer velocity and deep runtime complexity. Its position is defined by:

- **Advantages vs. Peers**:  
  - Most extensive plugin ecosystem and agent composition capabilities.  
  - Highest number of contributors and issue volume—indicating broad community reach.  
  - Early implementation of advanced patterns like dynamic model discovery and session state introspection.

- **Technical Approach Differences**:  
  - Emphasis on **low-level control** (e.g., SQLite state management, CLI cost tracking).  
  - Heavy use of synchronous operations in critical paths (e.g., `agent database close`), leading to scalability bottlenecks.  
  - Less focus on user-facing polish compared to peers.

- **Community Size Comparison**:  
  OpenClaw has the largest active contributor base (by issue/PR volume), though engagement is often reactive rather than proactive—suggesting a high barrier to entry for new users despite strong technical depth.

---

### **4. Shared Technical Focus Areas**  
Multiple projects converge on these **emerging cross-cutting requirements**:

| Requirement | Projects Involved | Specific Needs |
|------------|-------------------|----------------|
| **Session Persistence & Recovery** | OpenClaw, QwenPaw, ZeroClaw | Prevent silent data loss; enable auto-recovery after timeout/failure |
| **Non-blocking I/O & Scalability** | OpenClaw, QwenPaw | Avoid event loop blocking during DB writes or file system access |
| **Model Resilience & Fallback** | QwenPaw, ZeroClaw | Auto-switch models on quota exhaustion or API failure |
| **Security Policy Enforcement** | ZeroClaw, OpenClaw | Prevent bypass of high-risk command blocks via config overrides |
| **Cross-Platform Input Handling** | IronClaw, QwenPaw, ZeroClaw | Preserve IME composition states, especially for non-Latin scripts |
| **Global Accessibility & Localization** | IronClaw, Hermes Agent, QwenPaw | Full language support without fallbacks; screen-reader compatibility |

> 📌 These shared needs indicate a maturing ecosystem where **operational robustness** is now a primary differentiator—not just intelligence or features.

---

### **5. Differentiation Analysis**

| Project | Feature Focus | Target Users | Technical Architecture |
|--------|---------------|--------------|------------------------|
| **OpenClaw** | Runtime extensibility, plugin depth, CLI power | Devs, sysadmins, automation engineers | Monolithic runtime with tight internal state coupling |
| **Hermes Agent** | Cross-gateway collaboration, desktop-first UX | Power users, hybrid work teams | Electron-based desktop app with persistent agent groups |
| **IronClaw** | Temporal logic, multilingual UI, input method fidelity | Global developers, international teams | Lightweight host runtime with modular web UI |
| **QwenPaw** | Task lifecycle control, UI feedback fidelity, workflow efficiency | Creators, researchers, small-team builders | Modular plugin architecture with strong context management |
| **ZeroClaw** | Multi-agent security, channel parity (WhatsApp/WeChat), durable messaging | Enterprises, regulated environments | Decentralized agent network with policy-enforced boundaries |

> 🎯 **Key Differentiation**:  
> - **OpenClaw** = *Power & Flexibility*  
> - **Hermes Agent** = *Persistent Collaboration*  
> - **IronClaw** = *Global Usability*  
> - **QwenPaw** = *Reliable Workflow Execution*  
> - **ZeroClaw** = *Secure, Auditable Agent Systems*

---

### **6. Community Momentum & Maturity**

| Tier | Project(s) | Characteristics |
|------|------------|-----------------|
| **Rapid Iteration / High Velocity** | OpenClaw, ZeroClaw, QwenPaw | >30 issues/PRs/day; frequent bug reports; fast-moving PR queues |
| **Balanced Growth / Stable Evolution** | Hermes Agent | Consistent 50/50 issue/PR ratio; focus on refinement over novelty |
| **Deliberate Polish / Low Noise** | IronClaw | Minimal issues; PRs focused on edge-case fixes and localization |

> 💡 *Maturity Signal*: IronClaw and Hermes Agent are entering **productization phase**—with fewer regressions and more focus on usability. OpenClaw and ZeroClaw remain in **feature explosion mode**, while QwenPaw sits at a crossroads between iteration and stabilization.

---

### **7. Trend Signals**  
Based on community feedback and PR trends, key industry-wide shifts include:

- **From "AI Assistant" to "Agent Platform"**:  
  Demand for **cross-agent collaboration**, **persistent group workflows**, and **durable human-in-the-loop interactions** (ZeroClaw #10930, Hermes #97681) indicates a move toward persistent, team-based agent ecosystems.

- **Operational Reliability as Competitive Edge**:  
  Users now prioritize **auto-recovery from timeouts**, **consistent task cancellation**, and **zero data loss**—not just smart responses. This suggests a shift from “cool demo” to “mission-critical tool.”

- **Security & Governance as Non-Negotiables**:  
  S0/S1 bugs related to **policy bypasses**, **configuration leaks**, and **data loss** (ZeroClaw #11058, #9187) signal that trust and auditability are becoming prerequisites for enterprise use.

- **Global Usability is Now Expected**:  
  Multilingual support (Italian, Korean), IME preservation, and screen-reader compatibility are no longer “nice-to-have”—they’re essential for inclusion and adoption outside Anglophone tech hubs.

> 📈 **Value for Developers**:  
> Build with **resilience first**, **security by design**, and **inclusive UX**. The most successful agents will be those that **fail gracefully**, **recover automatically**, and **work seamlessly across devices and languages**—not just those that generate clever answers.

---

✅ **Final Recommendation**:  
Prioritize **stability, observability, and configurability** in next-cycle development. The era of “just make it work” is over—users demand **predictable, recoverable, and secure** AI agents. Projects that address these concerns will lead the next wave of adoption.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-23**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pace of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across core components, user experience, and infrastructure. Activity is particularly concentrated in desktop stability, session state management, and cross-gateway collaboration. While no new releases were published, multiple high-priority fixes are progressing rapidly through PRs, suggesting imminent patch-level updates. The community is actively engaged on accessibility, internationalization, and security—reflecting a mature but growing user base with diverse needs.

---

### **2. Releases**  
**None**  
No new releases were published today. The latest stable version remains v0.21.4 (2026.9.14), with ongoing work focused on bug fixes and feature polish ahead of a potential v0.22 release. Users should expect incremental improvements via future hotfixes rather than major version changes.

---

### **3. Project Progress**  
Today’s merged/closed PRs reflect strong focus on **session integrity, agent reliability, and cross-platform consistency**:

- ✅ **[PR #119651](https://github.com/NousResearch/hermes-agent/pull/119651)**: Fixed desktop multi-gateway coordination — resolves critical instability in concurrent gateway handling.
- ✅ **[PR #57691](https://github.com/NousResearch/hermes-agent/pull/57691)**: Resolved TUI command alias collisions — prevents silent crashes from duplicate slash commands.
- ✅ **[PR #119690](https://github.com/NousResearch/hermes-agent/pull/119690)**: Fixed `reasoning_effort` loss for bare-named providers — ensures consistent behavior in custom provider workflows.
- ✅ **[PR #119685](https://github.com/NousResearch/hermes-agent/pull/119685)**: Prevents remembered models from overriding boot config — improves profile consistency at startup.

These fixes demonstrate a shift toward **stability and configuration fidelity**, especially in desktop and agent lifecycle management.

---

### **4. Community Hot Topics**  
Top community-driven discussions reveal urgent UX and interoperability needs:

- 🔥 **[Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)**: *Let Bots collaborate across gateways, independently of Desktop* — **30 comments**, P2 priority.  
  → **Need**: Cross-device, persistent group chat collaboration without keeping the Desktop app open. This is a flagship feature request signaling demand for decentralized, persistent agent teamwork.

- 🔥 **[Issue #26689](https://github.com/NousResearch/hermes-agent/issues/26689)**: *Accessibility improvements for blind VoiceOver users* — **15 comments**, P3, affecting real-world usability.  
  → **Need**: Screen-reader compatibility is now a critical barrier for accessibility. High visibility suggests this may become a top priority for next-cycle inclusion.

- 🔥 **[Issue #11941](https://github.com/NousResearch/hermes-agent/issues/11941)**: *HTML email support with Markdown rendering* — **14 comments**, P3.  
  → **Need**: Rich email delivery is essential for professional users relying on Hermes for report automation. Current plain-text-only output limits utility.

These three issues represent **core user value propositions** — collaboration, inclusivity, and content richness — that are shaping the project’s near-term roadmap.

---

### **5. Bugs & Stability**  
Critical and recurring stability issues remain active, primarily in desktop and session state layers:

| Issue | Severity | Summary | Fix PR? |
|------|----------|--------|--------|
| [Issue #100573](https://github.com/NousResearch/hermes-agent/issues/100573) | **P1** | SIGTRAP crash in Electron on Linux/Wayland due to `string_view::substr()` out-of-range | ❌ No fix yet |
| [Issue #70108](https://github.com/NousResearch/hermes-agent/issues/70108) | **P2** | Duplicate assistant replies rendered despite single entry in DB | ❌ No fix yet |
| [Issue #118671](https://github.com/NousResearch/hermes-agent/issues/118671) | **P2** | Message duplication after LCM compaction (renderer-only) | ❌ No fix yet |
| [Issue #88371](https://github.com/NousResearch/hermes-agent/issues/88371) | **P2** | `hermes update` crashes post-update due to stale `sys.modules` | ✅ **[PR #119693](https://github.com/NousResearch/hermes-agent/pull/119693)** fixes related stream-handling logic |

> ⚠️ **Critical Note**: The **SIGTRAP crash on Linux** (Issue #100573) is a known regression in Electron 40.10.2 and has occurred multiple times — this poses a real risk to Linux users and requires urgent attention.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging features point to strategic directions in **agent autonomy, platform integration, and user control**:

- **Cross-Gateway Collaboration** ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681)) — Likely candidate for **v0.22**; signals move toward distributed agent ecosystems.
- **Korean UI Support** ([#33512](https://github.com/NousResearch/hermes-agent/issues/33512)) — Suggests expanding global reach beyond current language support.
- **PowerShell on Windows** ([#36929](https://github.com/NousResearch/hermes-agent/issues/36929)) — Critical for enterprise adoption in Windows-native environments.
- **Attention Chime** ([#115182](https://github.com/NousResearch/hermes-agent/issues/115182)) — Indicates desire for asynchronous interaction without constant monitoring.

These requests suggest a **shift from pure AI tooling toward intelligent, persistent, and user-centric workflows**.

---

### **7. User Feedback Summary**  
Real user pain points highlight gaps between powerful backend capabilities and front-end usability:

- **Accessibility**: Blind users report severe difficulty using Hermes due to poor screen-reader support — a major UX failure despite strong backend intelligence.
- **Email Delivery**: Users need rich HTML-rendered emails (Markdown → formatted HTML), not plain text — limiting adoption in reporting and documentation workflows.
- **Update Reliability**: Multiple reports of `hermes update` crashing or failing silently on Windows/macOS — undermines trust in maintenance and upgrade processes.
- **Session Consistency**: Frequent complaints about message duplication and unexpected model overrides — erodes confidence in long-running conversations.

> 💬 **User sentiment**: High appreciation for agent intelligence and extensibility, but frustration with **UX fragility, platform inconsistencies, and lack of accessibility**.

---

### **8. Backlog Watch**  
Several high-impact, long-standing issues require maintainer attention:

- **[Issue #62336](https://github.com/NousResearch/hermes-agent/issues/62336)**: Terminal snapshots capture credential-bearing env vars — **security risk** with no resolution path yet.
- **[Issue #114201](https://github.com/NousResearch/hermes-agent/issues/114201)**: `custom_instructions` silently dropped in mem0 OSS — breaks user customization, currently ignored.
- **[Issue #112645](https://github.com/NousResearch/hermes-agent/issues/112645)**: Profile-env rewrite drops `HINDSIGHT_API_LLM_DEFAULT_HEADERS` — breaks memory extraction behind proxies.
- **[Issue #119070](https://github.com/NousResearch/hermes-agent/issues/119070)**: Kanban card stuck in `blocker_auth` forever after rate limit — causes workflow deadlocks.

> 📌 These issues represent **latent risks in security, configurability, and automation reliability** — they must be triaged soon to prevent downstream user impact.

---

### ✅ **Final Assessment**  
Hermes Agent is a **highly active, technically advanced project** with strong community engagement. While the codebase shows signs of maturity and rapid iteration, **critical stability and accessibility issues persist**. The project is poised for growth if it prioritizes **user-facing reliability, inclusive design, and secure configuration practices** over feature velocity. Immediate attention to P1 bugs and security concerns is recommended to maintain trust and broaden adoption.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-23**

---

### **1. Today's Overview**  
The IronClaw project shows moderate developer activity with three open pull requests published in the last 24 hours, all related to core functionality and user experience improvements. No new releases or issue updates were recorded, indicating a lull in community-reported problems or feature discussions. The current focus is on refining time handling in the host runtime, enhancing input method editor (IME) support in the web UI, and expanding language localization—signals of ongoing polish ahead of potential v1.0 milestone planning. Overall project health remains stable, with no critical bugs reported and active development concentrated in high-impact areas.

---

### **2. Releases**  
*No new releases published.*  
There are no version updates or changelogs available for this date. The project continues to operate under its existing release cycle without recent breaking changes or migration requirements.

---

### **3. Project Progress**  
Three new PRs were opened today, advancing key components:

- **PR #8108** ([fix(host-runtime): add builtin.time shift and typed input issues](https://github.com/nearai/ironclaw/pull/8108))  
  Adds `operation: "shift"` to `builtin.time`, enabling signed time deltas (`seconds`, `minutes`, etc.) to be summed into a `TimeDelta` and applied either to an input timestamp or to `now`. Output formats include `iso`, `utc_iso`, `unix`, `unix_millis`, and localized variants. This improves precision in temporal logic workflows.

- **PR #8107** ([feat(webui): add Italian (it) locale](https://github.com/nearai/ironclaw/pull/8107))  
  Introduces full Italian localization with complete translation coverage, including sidecar packs (`device-link-translations.ts`, `inspector-translations.ts`). Ensures no fallback to English, supporting global accessibility.

- **PR #8092** ([fix(webui): preserve IME composition in the chat composer](https://github.com/nearai/ironclaw/pull/8092))  
  Addresses IME input handling in Safari and other browsers by preserving composition state during command-menu interactions. Fixes regression where Enter key behavior was disrupted mid-composition, improving usability for non-Latin script users.

> *Note: All PRs remain open; none merged as of 2026-09-23.*

---

### **4. Community Hot Topics**  
While no issues have been updated recently, the most active PRs reflect emerging community priorities:

- **PR #8107 (Italian Locale)** — High demand for multilingual support, especially from EU-based contributors. Requested in #7855, now addressed with full string coverage. Likely to attract positive feedback from Italian-speaking users.
- **PR #8092 (IME Preservation)** — Critical for international users typing in Chinese, Japanese, Korean, or other complex scripts. Highlights growing awareness of input method compatibility in AI assistant interfaces.
- **PR #8108 (Time Shift Fix)** — Signals increasing use of time-aware operations in agent workflows, particularly in scheduling, logging, and event automation.

These PRs suggest a maturing user base with diverse linguistic needs and advanced workflow demands.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions reported today.*  
All open PRs are focused on enhancements and fixes for edge cases rather than stability issues. However, PR #8092 addresses a known regression in IME handling—a potentially disruptive UX flaw that could affect non-English users if unpatched. Its timely submission indicates proactive detection of a latent issue.

---

### **6. Feature Requests & Roadmap Signals**  
Emerging signals point toward:
- **Multilingual expansion**: With Italian added, future locales (e.g., Spanish, German, Japanese) may follow rapidly.
- **Temporal logic maturity**: The `builtin.time.shift` enhancement suggests growing demand for robust date/time manipulation in agent reasoning chains.
- **Input robustness**: IME handling improvements indicate a roadmap shift toward inclusive, real-world interface design—not just technical capability.

These trends align with a move toward production-grade reliability and global accessibility, likely culminating in a v1.0 release targeting enterprise and multilingual deployments.

---

### **7. User Feedback Summary**  
Although direct user feedback isn’t visible in issues, the nature of the PRs reveals strong underlying pain points:
- Users struggle with **non-Latin input methods** (Safari/IME quirks), especially when using command menus or sending messages via Enter.
- There’s a clear need for **accurate time manipulation** in workflows involving scheduling, auditing, or data processing.
- Demand for **language parity** is rising—users expect full translations without fallbacks, reflecting a desire for true localization over tokenization.

The project appears well-aligned with real-world usage patterns, particularly in international teams and developers building agents for global audiences.

---

### **8. Backlog Watch**  
Several long-standing issues remain unresolved and warrant maintainer attention:

- **#7855** ([Add Italian locale](https://github.com/nearai/ironclaw/issues/7855)) — Now addressed by PR #8107, but highlights delayed response to localization requests.
- **#7512** ([Improve error messaging in WebUI]) — Still open, with no progress since 2026-05. Poor error visibility hampers debugging.
- **#7923** ([Support for custom timezones in output]) — Requested for better regional compliance in logs and outputs.

These backlogged items represent missed opportunities for UX improvement and could deter adoption among enterprise users requiring fine-grained control.

---

✅ **Project Health Score: 8.5 / 10**  
*Active development, strong community alignment, low instability risk. Slight delay in backlog resolution noted.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-23**

---

### **1. Today's Overview**  
QwenPaw exhibits strong community engagement with **37 new issues** and **49 pull requests** updated in the past 24 hours, indicating active development and user-driven feedback. The project remains stable with no new releases, but significant progress is underway in core stability, UI/UX refinement, and model resilience. Key focus areas include task cancellation reliability, context management, model fallback mechanisms, and interface usability—particularly for users on smaller screens or with complex workflows.

---

### **2. Releases**  
**None**  
No new releases were published today. The latest version remains **v2.2.1**, with ongoing efforts to stabilize v2.2.2 via PR #7928 (release notes draft). No breaking changes are expected in the immediate update cycle based on current PRs.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #7933**: Fixes `TypeError` in pet approval system by preserving caller identity (`actor` param) — critical for plugin integrity.  
- ✅ **PR #7938**: Resolves cross-platform test failures caused by Windows path handling in unit tests — improves CI reliability.  
- ✅ **PR #7898**: Fixes persistent HTTP 500 errors in `qwenpaw-pet` plugin when approving tool calls — restores functionality for enabled plugins.  
- ✅ **PR #6668**: Adds optional GPT-5.6+ prompt caching support for OpenAI provider — enhances performance and reduces redundant API calls.  

These fixes collectively improve **plugin stability**, **CI/CD robustness**, and **API efficiency**, signaling a focus on foundational reliability ahead of next release.

---

### **4. Community Hot Topics**  
The most active discussions center on **task lifecycle control**, **UI layout**, and **model configuration complexity**:

- 🔥 **Issue #7567** [CLOSED]: *“Task stops but continues running”* — 8 comments, high impact on user trust. Users report visual feedback mismatch between UI state and actual execution, leading to confusion and duplicate inputs.  
  → **Underlying Need**: Reliable real-time status sync between frontend and backend; urgent need for consistent "stop" behavior.

- 🔥 **Issue #7559** [CLOSED]: *“New message triggers 409 during task execution”* — 6 comments. Users expect queued messages during active tasks, not rejection.  
  → **Underlying Need**: Queue-based concurrency model; better handling of concurrent input during long-running tasks.

- 🔥 **Issue #7935** [OPEN]: *“LLM request timeout never recovers without restart”* — 3 comments. Critical stability issue: once a timeout occurs, all subsequent requests fail until manual restart.  
  → **Underlying Need**: Automatic recovery from transient LLM outages; essential for production-grade agents.

- 🔥 **PR #7931**: *“Add durable paginated transcript history”* — 0 comments, but high strategic value. Implements SQLite-backed chat persistence with stable cursors and deduplication.  
  → **Signal**: Long-term data durability and session continuity are emerging as key UX priorities.

---

### **5. Bugs & Stability**  
Ranked by severity and reproducibility:

| Severity | Issue | Description | Fix PR? |
|--------|------|-------------|--------|
| ⚠️ High | [#7935](https://github.com/agentscope-ai/QwenPaw/issues/7935) | LLM timeout → permanent failure; requires manual restart | ❌ No fix yet |
| ⚠️ High | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | Stop button shows “stopped” but task continues | ✅ Fixed (closed), but risk of regression |
| ⚠️ High | [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | File browser freezes server on large repos due to `watchfiles.awatch` blocking event loop | ❌ No fix yet |
| ⚠️ Medium | [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883) | PDF file serialization fails on DeepSeek (missing `file_id`) despite fix in #7621 | ❌ Still reproducible |
| ⚠️ Medium | [#7850](https://github.com/agentscope-ai/QwenPaw/issues/7850) | Concurrent policy updates lost due to stale reload | ❌ No fix |

> 💡 **Critical Risk**: Server freeze under load (#7721) and non-recoverable timeouts (#7935) threaten enterprise adoption.

---

### **6. Feature Requests & Roadmap Signals**  
User demand is converging on three major themes:

- 🔄 **Model Flexibility & Resilience**  
  - #6318: Support per-conversation model selection (not just agent-level binding)  
  - #5572 / #4882 / #5351: Model auto-fallback on quota exhaustion, failure, or timeout  
  → **Prediction**: These will be prioritized in **v2.3**, likely bundled into a unified `Model Failover Policy` module.

- 🎨 **UI/UX Refinement**  
  - #7739: Move history panel to right side for better visibility on small screens  
  - #5909 / #7287: Configurable themes/skin gateway (zero-intrusion design)  
  → **Signal**: QwenPaw is maturing beyond functional AI agent → aiming for branded, customizable desktop experience.

- ⚙️ **Workflow Efficiency**  
  - #4036: Reduce steps to add a model (current workflow is 5+ clicks)  
  - #5182: Unified model config (text/vector/audio)  
  → **Signal**: Users want faster onboarding and less friction in multi-model environments.

---

### **7. User Feedback Summary**  
Real-world pain points reveal **friction in core workflows**:

- **"I stop a task, it looks done, but it’s still running"** → Trust erosion (Issue #7567)  
- **"After a timeout, I have to restart everything"** → Poor resilience (Issue #7935)  
- **"Adding a model takes too many clicks"** → Onboarding friction (Issue #4036)  
- **"Subagent progress is invisible"** → Lack of transparency in nested tasks (Issue #4923)  
- **"My work directory resets unexpectedly"** → Configuration inconsistency (Issue #7705)

> 👉 **Overall Sentiment**: Highly engaged users appreciate power and flexibility but are frustrated by **inconsistent UI feedback**, **poor error recovery**, and **complex configuration paths**.

---

### **8. Backlog Watch**  
High-impact, long-standing issues needing maintainer attention:

| Issue | Status | Priority | Link |
|------|--------|----------|------|
| [#5856](https://github.com/agentscope-ai/QwenPaw/issues/5856) | Open | ⚠️ High | Tool_call structure lost during context compaction → causes 400 errors |
| [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | Open | ⚠️ High | Server freeze on large workspace watch — blocks entire instance |
| [#7935](https://github.com/agentscope-ai/QwenPaw/issues/7935) | Open | ⚠️ High | LLM timeout → permanent failure; no auto-recovery |
| [#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318) | Closed | 🔴 Urgent | Per-conversation model binding — already resolved, needs implementation |
| [#7850](https://github.com/agentscope-ai/QwenPaw/issues/7850) | Open | ⚠️ High | Race condition in driver policy updates — potential data loss |

> 🔍 **Recommendation**: Prioritize **#7721**, **#7935**, and **#5856** — these represent systemic risks to stability and scalability. Also revisit **#6318** for implementation follow-up.

---

**Project Health Score**: ⭐⭐⭐⭐☆ (4/5) — Strong momentum, excellent community participation, but critical bugs remain unpatched. Next release must address recovery, stability, and usability gaps.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-23  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **33 new issues and 50 pull requests updated in the last 24 hours**, indicating strong ongoing development momentum. The activity is concentrated around core runtime stability, security hardening, channel-specific feature parity (especially WhatsApp Web), and architectural refinement of agent-to-agent communication and resource management. A significant number of high-risk (P2/P1) issues and PRs relate to security boundaries, prompt caching, tool execution integrity, and message delivery guarantees—reflecting a mature project prioritizing reliability and operational safety. No new releases were published today, suggesting that recent work is still in stabilization or review phase.

---

### **2. Releases**

> ❌ **No new releases** in the past 24 hours.

- **Status:** All recent changes are pending release integration.
- **Note:** The absence of a release correlates with an increase in high-severity bugs and RFCs being actively discussed, indicating that the team may be preparing for a major update cycle post-stabilization of current PRs.

---

### **3. Project Progress**

#### ✅ **Merged / Closed PRs (Today)**

| PR | Summary | Impact |
|----|--------|--------|
| [#11038](https://github.com/zeroclaw-labs/zeroclaw/pull/11038) | Ignore `RUSTSEC-2026-0292` (double-free in `imbl-sized-chunks`) | Security dependency fix; removes false positive blocking CI |
| [#11042](https://github.com/zeroclaw-labs/zeroclaw/pull/11042) | Document “replacement-first” integration policy | Improves onboarding clarity; closes gap from RFC #6165 |
| [#10979](https://github.com/zeroclaw-labs/zeroclaw/pull/10979) | Implement `create_room` and `invite_user` on WhatsApp Web | Enhances WhatsApp channel functionality |
| [#10988](https://github.com/zeroclaw-labs/zeroclaw/pull/10988) | Read poll votes back as `[choice]` messages | Enables real-time interaction in polls |
| [#10980](https://github.com/zeroclaw-labs/zeroclaw/pull/10980) | Attach first-page previews to PDFs sent via WhatsApp Web | Improves UX for document sharing |

> 🔧 These merged PRs focus on **channel experience polish**, **security hygiene**, and **documentation completeness**, signaling a shift toward product maturity and user-facing reliability.

---

### **4. Community Hot Topics**

#### 📈 Most Active Issues (by comment count)

| Issue | Summary | Link | Comments | Priority |
|------|--------|------|----------|----------|
| [#4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) | Install skills via `.well-known` agent-skills discovery index | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) | 8 | P2 – Core/Security |
| [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | Host-scoped admission control & per-agent resource bounds | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | 5 | P2 – Architecture/Security |
| [#10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) | One durable primitive for human-asked questions | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) | 5 | P2 – Architecture/UX |
| [#10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) | Delivery receipts for outbound messages | [Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) | 5 | P2 – Communication Integrity |

> 💡 **Underlying Needs**: These top issues reveal a growing demand for:
> - **Standardized skill discovery** (interoperability)
> - **Host-level agent isolation & resource governance** (multi-agent deployment safety)
> - **Durable, auditable human-in-the-loop interactions** (trust & traceability)
> - **Message delivery confirmation** (critical for enterprise workflows)

#### 🔄 Most Active PRs (by comment count)

| PR | Summary | Link | Comments | Status |
|----|--------|------|----------|--------|
| [#10938](https://github.com/zeroclaw-labs/zeroclaw/pull/10938) | Declare tool attachments explicitly instead of scanning text | [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10938) | undefined | Open |
| [#10904](https://github.com/zeroclaw-labs/zeroclaw/pull/10904) | Gate no-vision error on resolved image markers | [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10904) | undefined | Open |
| [#10172](https://github.com/zeroclaw-labs/zeroclaw/pull/10172) | Preserve configured provider profile semantics | [Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10172) | undefined | Open |

> 🔍 **Pattern**: High-impact PRs are centered on **correctness of model/tool interaction**, **input validation**, and **configuration fidelity**—indicating deep concern about side-channel failures and unintended behavior in complex agent loops.

---

### **5. Bugs & Stability**

#### ⚠️ Critical Bugs Reported (Severity S0–S2)

| Issue | Description | Severity | Fix PR? |
|------|------------|----------|--------|
| [#11058](https://github.com/zeroclaw-labs/zeroclaw/issues/11058) | `allowed_commands` exempts high-risk commands from `block_high_risk_commands` | **S0** – Security risk | ❌ No fix yet |
| [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) | WeChat sync cursor saved before message enqueue → inbound message loss | **S0** – Data loss | ❌ No fix yet |
| [#10952](https://github.com/zeroclaw-labs/zeroclaw/issues/10952) | Seam sanitizers rewrite reasoning inside tool envelope → Anthropic rejects replay | **S2** – Degraded behavior | ❌ No fix yet |
| [#10981](https://github.com/zeroclaw-labs/zeroclaw/issues/10981) | WhatsApp images lack `jpegThumbnail` → empty card on phone | **S2** – Degraded UX | ❌ No fix yet |
| [#11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) | `force_voice` ignored by WhatsApp Web | **S2** – Degraded behavior | ❌ No fix yet |

> 🛑 **Concern**: Multiple **S0/S1 bugs** remain open despite active community engagement, particularly around **security policy bypasses** and **data loss**, which could hinder adoption in regulated environments.

---

### **6. Feature Requests & Roadmap Signals**

#### 📌 Emerging Strategic Features

| Request | Summary | Likely Inclusion? | Notes |
|-------|--------|------------------|------|
| [#4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) | Install skills from `.well-known` URI | ✅ High | Aligns with Agent Skills group standardization effort |
| [#11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) | Knowledge graph as first-class memory layer | ✅ Medium-High | Addresses current "tool-only" limitation of knowledge storage |
| [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | Host-scoped admission control & per-agent resource bounds | ✅ High | Critical for multi-agent deployments; RFC under discussion |
| [#11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) | Agent-to-agent session messaging with receiver discretion | ✅ High | Key for collaborative agent systems |

> 🎯 **Prediction**: The next version (likely v0.9+) will likely include:
> - **Multi-agent resource isolation**
> - **Enhanced WhatsApp Web capabilities** (polls, voice, thumbnails)
> - **Improved knowledge persistence** via first-class memory layer
> - **Standardized skill discovery support**

---

### **7. User Feedback Summary**

#### 🗣️ Real Pain Points from Issues

- **WhatsApp UX gaps**: Users report missing features like voice note handling (`force_voice`, `suppress_voice`), image previews, and poll result tracking — indicating frustration with inconsistent mobile experiences.
- **Security blind spots**: Multiple users report that **high-risk commands can bypass blocks if listed in `allowed_commands`**, revealing trust issues in configuration policies.
- **Agent coordination friction**: Lack of durable, attributable peer-agent messaging makes collaboration fragile and hard to audit.
- **Tool output instability**: Image disappearance after unrelated tool calls and TTS/voice path misbehavior suggest reliability concerns in production use.

#### ✅ Positive Signals
- High engagement in RFCs and PRs shows **strong contributor confidence** in the architecture.
- Clear documentation efforts (e.g., RFC follow-ups, policy recording) indicate **maturity in governance**.

---

### **8. Backlog Watch**

#### ⏳ Long-Pending, High-Impact Items Needing Maintainer Attention

| Issue | Age | Status | Risk | Action Needed |
|------|-----|--------|------|---------------|
| [#4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) | 2026-03-27 (≈6 months) | In-progress, Accepted | High | Finalize implementation & testing |
| [#10970](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | 2026-09-19 | RFC, Needs Review | High | Core maintainer sign-off required |
| [#10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) | 2026-09-17 | RFC, Needs Review | High | Clarify durability requirements |
| [#11053](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) | 2026-09-22 | New, Open | High | Early-stage but critical for memory design |
| [#10594](https://github.com/zeroclaw-labs/zeroclaw/issues/10594) | 2026-09-03 | In-progress | Medium | Silent cron job failure — affects observability |

> 🚨 **Urgent**: Despite strong community input, several **high-priority RFCs and bug fixes remain unreviewed**, potentially stalling innovation. Maintainers should prioritize triaging these.

---

### ✅ **Overall Project Health Assessment**

- **Activity Level**: ⭐⭐⭐⭐⭐ (Very high)
- **Stability**: ⭐⭐⭐☆☆ (Good, but S0/S1 bugs persist)
- **Governance**: ⭐⭐⭐⭐☆ (Strong RFC process, needs faster reviews)
- **User Experience**: ⭐⭐⭐☆☆ (Improving, especially on WhatsApp, but gaps remain)
- **Roadmap Clarity**: ⭐⭐⭐⭐☆ (Clear signals emerging from RFCs and PRs)

> **Conclusion**: ZeroClaw is in a **critical growth phase**—balancing rapid feature expansion with foundational stability. The next 4–8 weeks will determine whether it becomes a trusted platform for multi-agent systems or continues to face reliability hurdles in production environments. Prioritization of **security audits**, **RFC reviews**, and **crisis bug fixes** is essential.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*