# OpenClaw Ecosystem Digest 2026-10-02

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-02 01:47 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-10-02**

---

### **1. Today's Overview**  
The OpenClaw project remains highly active, with over **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development and community engagement. The release of **v2026.8.34**—a critical `extended-stable` (LTS-equivalent) update—signals a focus on stability and security for production environments. Despite this, numerous high-severity bugs impacting startup, memory, session state, and cross-platform compatibility (especially Windows) are actively reported, suggesting ongoing challenges in system resilience. The influx of PRs reflects strong momentum in fixing core infrastructure, improving diagnostics, and enhancing UX across platforms.

---

### **2. Releases**  
✅ **New Release: `v2026.8.34` (Gateway-only, extended-stable)**  
- **Release Type**: Critical `extended-stable` (equivalent to LTS), targeting long-term reliability.  
- **Timeline**: Based on end-of-August 2026 codebase, with updates applied post-2026.9.x.  
- **Key Changes**:  
  - Critical security patches  
  - Reliability and performance fixes  
  - New model support (e.g., Claude CLI, GLM)  
  - Fixes for known regressions (e.g., session creation failures, SQLite WAL growth)  
- **Migration Note**: Users on `2026.9.x` should consider upgrading to `v2026.8.34` for improved stability and security. No breaking changes expected, but verify plugin compatibility via `doctor --fix`.  
🔗 [GitHub Release v2026.8.34](https://github.com/openclaw/openclaw/releases/tag/v2026.8.34)

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **#163160** (`refactor(core): retire pre-agent session migration`) – Removes legacy session migration logic, streamlining the core flow.  
- ✅ **#163159** (`chore(i18n): refresh native locales`) – Synchronizes iOS/macOS app translations.  
- ✅ **#163158** (`fix(plugins): record unmet compatibility removal conditions`) – Ensures future plugin deprecations remain visible.  
- ✅ **#163157** (`refactor(mattermost): pass media facts directly to ingress`) – Improves media handling efficiency.  
- ✅ **#163155** (`test(qa): stabilize paired node reconnect retain baseline`) – Fixes flaky E2E test, improving CI reliability.  

**Features Advanced:**  
- **Audit logging** for runtime skill usage (**#141004**) now has proof-of-concept implementation; awaiting review.  
- **Denylist support for exec-approvals** (**#6615**) is gaining traction with 8 upvotes and maintainer attention.  
- **Memory retention policies** for `memory_index_chunks` and `memory_embedding_cache` (**#114612**) are under active design consideration.

---

### **4. Community Hot Topics**  
Top Issues by comment count and severity highlight systemic pain points:

| Issue | Comments | Severity | Summary | Link |
|------|----------|---------|--------|------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 103 | 🦐 Gold Shrimp (P0, crash-loop, UX blocker) | SQLite WAL grows to 2.8 GB on Windows despite `wal_autocheckpoint=1000`, blocking gateway startup. | [Issue #143524](https://github.com/openclaw/openclaw/issues/143524) |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 40 | 🦪 Silver Shellfish (P0, crash-loop) | 2026.9.5 caused 8-hour recovery sessions in stable environments. Users report severe degradation. | [Issue #153257](https://github.com/openclaw/openclaw/issues/153257) |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | 14 | 🦪 Silver Shellfish (P0, memory leak) | `prepared-model-catalog.worker.js` leaks ~4–5 GB/hour on idle systems. Reproducible on cold boot. | [Issue #159662](https://github.com/openclaw/openclaw/issues/159662) |

**PRs with Highest Engagement:**  
- **#163032** (`fix: completion turns lose delegation tools after same-model retries`) – 30+ comments pending, addressing workflow continuity after transient failures.  
- **#163153** (`fix(ios): preserve chat history position`) – High user impact; resolves UI jank on mobile clients.  
- **#161759** (`fix(workers): settle remote turn ownership`) – Addresses race condition in remote worker lifecycle.

---

### **5. Bugs & Stability**  
High-severity bugs dominate today’s activity. Top concerns:

| Bug | Severity | Impact | Status | Fix PR? |
|-----|----------|--------|--------|--------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | P0, 🦐 Gold Shrimp | Crash-loop, disk exhaustion (Windows) | Open | ❌ No fix yet |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | P0, 🦪 Silver Shellfish | Memory leak (~5 GB/hour) | Open | ❌ No fix yet |
| [#158239](https://github.com/openclaw/openclaw/issues/158239) | P0, 🦞 Diamond Lobster | Gateway fails to start on slow hosts (kernel < 5.6) | Open | ❌ No fix yet |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) | P0, 🐚 Platinum Hermit | Unhandled rejection during reconcileActive → crash | Open | ❌ No fix yet |
| [#161654](https://github.com/openclaw/openclaw/issues/161654) | P1, 🦪 Silver Shellfish | DataCloneError on Windows due to `process.env` Proxy | Closed | ✅ Fixed in #161654 |
| [#161828](https://github.com/openclaw/openclaw/issues/161828) | P0, 🐚 Platinum Hermit | Nested `env.Proxy` still causes `DataCloneError` post-fix | Open | ❌ Patch incomplete |

> ⚠️ **Critical Pattern**: Multiple Windows-specific issues stem from improper serialization of `process.env` proxies. A systemic fix may be needed.

---

### **6. Feature Requests & Roadmap Signals**  
User demand is shaping near-term priorities:

| Request | Votes | Status | Predicted Inclusion |
|--------|-------|--------|-------------------|
| **Denylist mode for exec.security** (#6615, #71097) | 8+ | Open, needs security review | Likely in v2026.10.x |
| **Audit log for agent memory changes** (#20935) | 7 | Open, needs product decision | High priority for compliance users |
| **CLI-budget compaction timeout fixes** (#115546) | 7 | Open | Urgent for large-session users |
| **Improved error messages for "reply lost" scenarios** (#148707) | 17 | Open | UX improvement target |
| **Session replay protection against stale state** (#114211) | 10 | Open | Important for Matrix agents |

> 🔮 **Roadmap Signal**: Users are increasingly requesting **predictability, auditability, and robustness**—not just new features. Expect tighter integration between session integrity, debugging, and security controls.

---

### **7. User Feedback Summary**  
Real-world pain points reflect deep operational friction:

- **“I upgraded to 2026.9.5 and spent 8 hours recovering my stable environment.”** — *abuegab1-spec*  
- **“My SQLite WAL hit 2.8 GB. I had to manually truncate it to get the gateway back.”** — *desksk*  
- **“After a restart, WhatsApp replies fail repeatedly — no retry, no explanation.”** — *ilpadrino-a11y*  
- **“Agent keeps sending duplicate messages when tool calls fail.”** — *51Google*  
- **“I can’t use `exec` commands safely because denylist isn’t supported.”** — *aaroneden*

> 💬 **Sentiment**: Mixed. While users appreciate feature velocity, **stability, predictability, and actionable error messaging** are top concerns. Many feel “forced into emergency recovery” after minor upgrades.

---

### **8. Backlog Watch**  
Long-standing, high-impact issues requiring maintainer attention:

| Issue | Age | Severity | Status | Notes |
|------|-----|----------|--------|------|
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | 2026-07-27 | 🦞 Diamond Lobster | Open | No retention policy for `memory_index_chunks` — disk will fill over time |
| [#85030](https://github.com/openclaw/openclaw/issues/85030) | 2026-05-21 | 🦞 Diamond Lobster | Closed | MCP tools ignored in subagent sessions — critical for multi-agent setups |
| [#65374](https://github.com/openclaw/openclaw/issues/65374) | 2026-04-12 | 🐚 Platinum Hermit | Open | Cross-agent memory pooling in dreaming system — serious privacy/security risk |
| [#114414](https://github.com/openclaw/openclaw/issues/114414) | 2026-07-27 | 🌊 Off-meta tidepool | Open | Dated TODO sweep — technical debt accumulation |
| [#154834](https://github.com/openclaw/openclaw/issues/154834) | 2026-09-21 | 🦞 Diamond Lobster | Open | Failed subagent delivery recurs every turn — fatal for workflows |

> 🛠️ **Action Required**: These issues represent **technical debt, security risks, and usability blockers** that could derail enterprise adoption if not addressed in upcoming cycles.

---

**Summary**: OpenClaw is in a **high-growth, high-risk phase** — rapid innovation is evident, but **stability and developer trust are under strain**. The team must prioritize **core reliability fixes**, **improve diagnostics**, and **enforce better error communication** to maintain momentum. With strong community engagement, the project remains viable—but only if stability catches up to feature velocity.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Open-Source Ecosystem – 2026-10-02**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem in Q3 2026 is characterized by rapid innovation, divergent maturity stages, and growing focus on **trust, stability, and operational resilience**. Projects are increasingly prioritizing core infrastructure over feature velocity—evidenced by a surge in security hardening, session integrity fixes, and diagnostic improvements. While some projects (e.g., OpenClaw) operate at high growth velocity with enterprise-grade ambitions, others (e.g., IronClaw, ZeroClaw) remain focused on foundational reliability and identity/state management. The landscape reflects a maturing industry where developers demand not just functionality, but predictability, auditability, and safe deployment—especially for self-hosted or production use.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | PRs (Last 24h) | Release Status | Health Score (10) |
|--------|-------------------|----------------|----------------|-------------------|
| **OpenClaw** | 500 | 500 | ✅ v2026.8.34 (extended-stable) | 6.8 |
| **Hermes Agent** | 50 | 50 | ❌ No new release | 7.9 |
| **IronClaw** | 2 | 2 | ❌ No new release | 8.1 |
| **QwenPaw** | 7 | 9 | ❌ No new release (beta instability) | 7.2 |
| **ZeroClaw** | 38 | 50 | ❌ No new release (v0.8.6 pending) | 6.2 |

> 🔍 *Notes*: OpenClaw leads in activity volume but faces significant stability challenges. ZeroClaw shows intense technical focus with no merges—indicating pre-release stabilization. IronClaw maintains low-velocity stability; QwenPaw and Hermes Agent are mid-tier contributors with strong UX/feature refinement.

---

### **3. OpenClaw's Position**  
OpenClaw stands as the most **ambitious and fastest-moving project** in the ecosystem, with unparalleled scale in issue and PR volume—reflecting both deep community engagement and systemic instability. Its **LTS-equivalent `extended-stable` release (v2026.8.34)** signals an enterprise-grade intent, positioning it as a potential de facto standard for production deployments. Unlike peers, OpenClaw emphasizes **cross-platform compatibility**, **plugin lifecycle management**, and **audit-ready workflows**, making it uniquely suited for complex, multi-agent environments. With ~500 active issues daily, its community is the largest and most vocal—though this also exposes deeper technical debt and regression fatigue. In contrast, Hermes Agent and ZeroClaw prioritize internal robustness; IronClaw focuses on privacy-first statefulness; QwenPaw targets CJK usability and safety controls.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, recurring technical demands indicate **emerging industry-wide priorities**:

| Need | Projects Involved | Specific Examples |
|------|-------------------|-------------------|
| **Session & State Integrity** | OpenClaw, Hermes Agent, ZeroClaw, QwenPaw | Session persistence corruption, memory leaks, abandoned turns, silent data loss |
| **Security Hardening** | OpenClaw, ZeroClaw, Hermes Agent | Privilege escalation risks, unscoped writes, config overwrite vulnerabilities, `process.env` serialization flaws |
| **Cross-Platform Stability (esp. Windows)** | OpenClaw, QwenPaw, Hermes Agent | SQLite WAL bloat, `DataCloneError`, sandbox poisoning, file handling regressions |
| **Human-in-the-Loop Controls** | QwenPaw, ZeroClaw | `ask_user_question` tools, structured feedback, denylist support |
| **Plugin & Identity Management** | ZeroClaw, IronClaw, Hermes Agent | Plugin rollback, host-mediated identity, secure binding, verification layers |

> 📌 These patterns reveal a shift from “agent capabilities” to **operational trust**: users now demand **predictable behavior, recoverability, and transparency**—not just smarter models.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Target User** | Enterprise, multi-agent workflows | Power users, desktop agents | Privacy-focused, headless agents | CJK users, safety-first teams | Developers, self-hosters |
| **Architecture** | Monolithic gateway + plugin ecosystem | Modular desktop runtime + MCP | Browser-state-aware, identity-embedded | Lightweight, UI-centric | WASM-based, SOP-driven |
| **Key Differentiator** | Scale, LTS releases, cross-platform reach | Desktop UX, message delivery fidelity | Persistent encrypted browser state | Multilingual rendering, HITL safety | Security-by-design, binary footprint control |
| **Feature Focus** | Stability, compliance, extensibility | Performance, UI consistency, TTS | Identity mediation, state persistence | Human oversight, model orchestration | Authorization enforcement, plugin safety |

> 💡 **Strategic Implication**: OpenClaw aims to be the *platform*; ZeroClaw and IronClaw aim to be the *secure substrate*; QwenPaw and Hermes Agent target *user experience excellence*.

---

### **6. Community Momentum & Maturity**  

| Maturity Tier | Projects | Characteristics |
|---------------|--------|-----------------|
| **High-Velocity Growth** | OpenClaw, ZeroClaw | Massive PR/issue volume, frequent breaking changes, P0 bugs dominate, strong contributor base |
| **Stabilization Phase** | Hermes Agent, QwenPaw | Focused bug triage, beta testing, UX polish, moderate release cadence |
| **Low-Velocity Stability** | IronClaw | Minimal updates, long-standing issues, but clear roadmap signals around identity and persistence |

> ⚠️ **Risk Note**: OpenClaw and ZeroClaw risk burnout due to unsustainable momentum. IronClaw’s quiet phase may delay adoption unless backlog items are prioritized.

---

### **7. Trend Signals**  
Based on community feedback and project direction, key industry trends emerging in 2026 include:

- **Predictability > Capability**: Users increasingly value *stable, explainable behavior* over new features. Example: 17 comments on "reply lost" error messaging (OpenClaw), 10+ votes for session replay protection.
- **Safety by Design**: Demand for **denial lists**, **HITL controls**, and **structured input validation** is rising—especially in QwenPaw and ZeroClaw.
- **Operational Resilience**: Expectations for **rollback mechanisms**, **config integrity**, and **data loss prevention** are now baseline requirements (ZeroClaw #10495, Hermes #131033).
- **Privacy-First Architecture**: Encrypted storage (IronClaw #2358), host-mediated identity (ZeroClaw #11302), and token isolation are becoming non-negotiable.
- **Developer Experience (DX) as Competitive Edge**: Clear error messages, better diagnostics, and plugin tooling (QwenPaw #8071, ZeroClaw #11333) are critical for retention.

> ✅ **Value for Developers**: Choose projects that balance innovation with **reliable debugging, predictable upgrades, and secure defaults**—especially if deploying in regulated or mission-critical environments.

---

### **Final Assessment**  
The personal AI agent ecosystem is transitioning from *capability experimentation* to *production readiness*. OpenClaw leads in ambition and scale but must address systemic instability. ZeroClaw and IronClaw represent the future of secure, stateful agent execution. Hermes Agent and QwenPaw excel in user-centric design and safety. **The next wave of adoption will favor projects that deliver trust—not just intelligence.**

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-10-02**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pace of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across core components. No new releases were published, suggesting that ongoing work is focused on stabilization and feature refinement ahead of a potential future release. The community is particularly engaged around **desktop stability, session management, gateway reliability, and security hardening**, with several high-severity bugs reported and addressed via PRs today. Overall, the project demonstrates strong health and developer engagement, especially in critical areas like cross-platform compatibility and message delivery integrity.

---

### **2. Releases**  
❌ **No new releases** detected in the past 24 hours.  
*Note:* The latest stable version remains v0.21.5 (2026-09-24), with no breaking changes or migration notes issued.

---

### **3. Project Progress**  
✅ **10 PRs merged or closed today**, primarily addressing critical bugs and security improvements:

- **PR #131081** (`ci-reviewed`): Fixes infinite retry waits caused by non-finite `Retry-After` headers (salvage of #105557).  
  🔗 [GitHub PR #131081](https://github.com/NousResearch/hermes-agent/pull/131081)  
- **PR #131078**: MCP client now passes official conformance suite; three defects fixed.  
  🔗 [GitHub PR #131078](https://github.com/NousResearch/hermes-agent/pull/131078)  
- **PR #131071**: Resolves #130987 — skips restart-safe cron jobs during gateway restart wait.  
  🔗 [GitHub PR #131071](https://github.com/NousResearch/hermes-agent/pull/131071)  
- **PR #131073**: Adds clear explanation for auto-TTS fallback when synthesis fails.  
  🔗 [GitHub PR #131073](https://github.com/NousResearch/hermes-agent/pull/131073)  
- **PR #131074**: Restricts backup ZIP permissions to `0600` for enhanced security.  
  🔗 [GitHub PR #131074](https://github.com/NousResearch/hermes-agent/pull/131074)  
- **PR #131076 & #130204**: Bump `web-search-plus` plugin to v4.3.3 for security hardening.  
  🔗 [PR #131076](https://github.com/NousResearch/hermes-agent/pull/131076) | 🔗 [PR #130204](https://github.com/NousResearch/hermes-agent/pull/130204)  
- **PR #131077**: Eliminates false "duplicate-send" warnings from stream consumers.  
  🔗 [GitHub PR #131077](https://github.com/NousResearch/hermes-agent/pull/131077)  
- **PR #131080**: Ensures pinned sessions are included in filtered backups.  
  🔗 [GitHub PR #131080](https://github.com/NousResearch/hermes-agent/pull/131080)  
- **PR #131079**: Clarifies documentation on stale session pruning logic.  
  🔗 [GitHub PR #131079](https://github.com/NousResearch/hermes-agent/pull/131079)  
- **PR #131067**: Fixes Linux second-instance sandbox poisoning bug (#131055).  
  🔗 [GitHub PR #131067](https://github.com/NousResearch/hermes-agent/pull/131067)

These updates reflect a focus on **stability, security, and UX consistency**, especially in multi-process and cross-platform environments.

---

### **4. Community Hot Topics**  
🔥 **Top 3 Most Active Issues (by comments)**:

1. **[Issue #97681]**: *Let Bots collaborate across gateways* (30 comments)  
   🔗 [GitHub Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)  
   - **Need**: Enables inter-gateway agent collaboration, a foundational step toward scalable AI agent networks. Currently blocked on unified gateway runtime (#106742).  
   - **Significance**: Signals growing interest in distributed agent systems beyond single-host workflows.

2. **[Issue #127647]**: *Tracker: Desktop idle resource burn* (26 comments)  
   🔗 [GitHub Issue #127647](https://github.com/NousResearch/hermes-agent/issues/127647)  
   - **Need**: Critical performance issue impacting long-running desktop usage. Users report excessive CPU/GPU/memory consumption.  
   - **Triage Plan**: Full scope mapping underway; root causes tied to streaming, rendering, and backend serve loops.

3. **[Issue #127665]**: *Desktop renders one reply twice while its row is already committed* (21 comments)  
   🔗 [GitHub Issue #127665](https://github.com/NousResearch/hermes-agent/issues/127665)  
   - **Need**: Persistent UI inconsistency affecting user trust in response accuracy. Linked to fold logic and state sync.  
   - **Context**: Already seen in #127288; fix was partially applied but not fully resolved.

💡 **Top 3 Most Active PRs (by comments)**:
- **PR #131081**: Non-finite Retry-After handling — critical for API resilience.
- **PR #131071**: Gateway restart wait fixes — directly addresses #130987.
- **PR #131067**: Linux sandbox recovery fix — resolves crash loop after second launch.

---

### **5. Bugs & Stability**  
🚨 **High-Priority Bugs Reported Today**:

| Severity | Issue | Summary | Fix Status |
|--------|------|--------|----------|
| **P1** | [#131033](https://github.com/NousResearch/hermes-agent/issues/131033) | Bedrock agent-loop skips redacted-reasoning recovery → GPT→Claude fallback fails 3× | ❌ Open (no PR yet) |
| **P1** | [#130987](https://github.com/NousResearch/hermes-agent/issues/130987) | Gateway restart wait blocks indefinitely due to live cron runs | ✅ **Fixed in PR #131071** |
| **P2** | [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) | Linux second-instance poisons sandbox fallback → SIGILL loop | ✅ **Fixed in PR #131067** |
| **P2** | [#127665](https://github.com/NousResearch/hermes-agent/issues/127665) | Desktop renders one reply twice | ❌ Open |
| **P2** | [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) | Desktop idle resource burn (CPU/GPU/memory) | ❌ Open |
| **P2** | [#129426](https://github.com/NousResearch/hermes-agent/issues/129426) | npm audit reports outdated dependencies (brace-expansion, undici, vitest, yaml) | ❌ Open |

📌 **Critical Regressions**:
- **#127313**: Right-click menu hijacks transcript context menu (regression from ad2d4822e1).
- **#129393**: Dashboard chat sidebar enters endless redial loop after WebSocket drop.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Feature Trends**:

- **Multi-Gateway Collaboration** ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681)) — High demand for distributed agent orchestration. Likely to be prioritized post-unified gateway runtime.
- **Agent Name Visibility in Tabs** ([PR #131072](https://github.com/NousResearch/hermes-agent/pull/131072)) — Small but impactful UX enhancement; likely to ship soon.
- **Voice Mode Guidance Injection** ([#74094](https://github.com/NousResearch/hermes-agent/issues/74094)) — User frustration with robotic TTS responses; could become part of next voice mode update.
- **New Decision-Making Models** ([#129686](https://github.com/NousResearch/hermes-agent/issues/129686)) — “Nice to have” but signals interest in expanding model ecosystem beyond current providers.

🔮 **Predicted Inclusion in Next Release**:
- Enhanced TTS feedback clarity
- Session tab agent name display
- Improved Windows/Linux sandbox behavior
- Security-hardened plugin catalog

---

### **7. User Feedback Summary**  
💬 **Real User Pain Points**:
- **Resource Hogging**: Users report desktop app consuming excessive CPU/GPU even when idle — impacts battery life and system responsiveness.
- **UI Glitches**: Duplicate message rendering and right-click menu conflicts cause confusion and reduce trust in output accuracy.
- **Breakage on Update**: Multiple users hit blockers during install/update flows (Windows/macOS), including permission errors, stuck states, and pre-flight timeouts.
- **Silent Truncation**: Email/WeCom/Wecom messages silently cut off at ~4,000 characters — frustrating for detailed outputs.
- **Voice Mode Frustration**: Auto-TTS lacks context-awareness, resulting in unnatural or hostile-sounding speech.

✅ **Positive Signals**:
- Users appreciate the growing depth of plugin support and customization.
- Many contributors actively triage and submit PRs, indicating strong community ownership.

---

### **8. Backlog Watch**  
🔍 **Longstanding, High-Impact Issues Needing Attention**:

- **[Issue #97681]**: *Let Bots collaborate across gateways* (30 comments, P3, open since 2026-08-29)  
  🔗 [GitHub Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)  
  - Blocked on #106742 (unified gateway runtime). Needs roadmap alignment.

- **[Issue #13603]**: *Update should support rollback and auto-rollback* (1 comment, P3, open since 2026-04-21)  
  🔗 [GitHub Issue #13603](https://github.com/NousResearch/hermes-agent/issues/13603)  
  - Critical for production users: currently no safe recovery path after broken updates.

- **[Issue #122529]**: *cron external worker missing venv site-packages* (12 comments, P1, open since 2026-09-25)  
  🔗 [GitHub Issue #122529](https://github.com/NousResearch/hermes-agent/issues/122529)  
  - Affects automation reliability; needs urgent resolution.

- **[Issue #61990]**: *No way to override email delivery truncation* (2 comments, P2, open since 2026-07-10)  
  🔗 [GitHub Issue #61990](https://github.com/NousResearch/hermes-agent/issues/61990)  
  - Despite being open over 3 months, no fix proposed — indicates low priority despite real-world impact.

> ⚠️ **Maintenance Note**: Several high-impact issues remain unresolved despite substantial discussion. Maintainers should prioritize triage and assign owners to prevent stagnation.

---

**Prepared On:** 2026-10-02  
**Data Source:** GitHub — `nousresearch/hermes-agent`  
**Analysis Period:** Last 24h (2026-10-01 to 2026-10-02)

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-10-02**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable but low-velocity phase as of October 2, 2026. No new releases have been published, and recent activity is limited to two open pull requests and two open issues—both updated within the last 24 hours. The community continues to focus on foundational stability, agent persistence, and identity integration. While there are no merged changes today, ongoing work centers on enhancing browser session resilience (via encrypted storage) and improving diagnostic visibility through failure taxonomy reporting.

---

### **2. Releases**  
*No new releases detected.*  
There were no version updates or changelog entries published in the last 24 hours. The most recent release remains unchanged from prior weeks. Users should continue relying on the latest stable build available via GitHub releases or CI artifacts.

---

### **3. Project Progress**  
*No PRs were merged or closed today.*  
However, two notable developments are underway:  
- **PR #7988** (`chore(agents): refresh codebase knowledge graph`) was last updated on October 1, 2026. This automated update ensures the internal codebase memory model reflects current state, supporting better agent reasoning and context awareness. It’s part of a nightly CI pipeline and requires review for merge.  
- **PR #7499** (`feat(identyclaw): host-mediated Passport for practitioners`) introduces a lightweight, processless identity mediation layer for IronClaw agents using `builtin.idcp` and policy grants. This enables secure, extension-free authentication with IdentyClaw Passport—critical for headless or sandboxed deployment scenarios.

---

### **4. Community Hot Topics**  
**Issue #8121** ([Daily ironclaw failure taxonomy — 2026-10-01](https://github.com/nearai/ironclaw/issues/8121)) stands out as the most urgent community discussion point. It documents a recurring regression in the `clawbench` benchmark suite, where 128 test failures stem from a *benchmark-side broken-workspace-seeding defect*. This suggests systemic instability in environment initialization, impacting reproducibility and trust in benchmark results. Despite being a single issue, its implications are severe: it undermines confidence in performance tracking and could delay feature validation cycles.

**Issue #2358** ([feat(browser): add BrowserProfileStore trait with encrypted tarball persistence](https://github.com/nearai/ironclaw/issues/2358)) is another high-priority topic. It addresses a core user pain point: persistent browser state (cookies, localStorage, IndexedDB) across agent runs. Without this, users must re-authenticate every time—an unacceptable friction for long-running or multi-step workflows. The proposal includes encrypted tarball persistence, which balances usability with security, especially given that Chromium profiles can contain sensitive bearer tokens.

---

### **5. Bugs & Stability**  
**Critical:**  
- **Issue #8121** — *Benchmark failure cascade due to workspace seeding defect* (severity: high). This is not a runtime crash but a systemic flaw in test setup that causes widespread false negatives. It impacts all benchmarking efforts and may block progress tracking until resolved.  
  🔗 [Link to Issue](https://github.com/nearai/ironclaw/issues/8121)

**Moderate:**  
- **Issue #2358** — While not a bug per se, the absence of persistent browser state represents a functional regression for real-world use cases involving login-heavy applications (e.g., SaaS, banking, enterprise tools). This is a known limitation affecting user experience and workflow continuity.

No crash reports or runtime errors were reported in the past 24 hours. However, the failure taxonomy indicates underlying fragility in test infrastructure that may mask deeper stability risks.

---

### **6. Feature Requests & Roadmap Signals**  
- **Persistent Browser State (Issue #2358)** — Strong signal for upcoming v0.8+ roadmap. Encryption-aware, tarball-based persistence aligns with IronClaw’s privacy-first ethos and is essential for enterprise-grade automation. Likely to be prioritized post-Q4 2026.
- **Host-Mediated Identity (PR #7499)** — Indicates growing demand for *agent autonomy without local dependencies*. This feature enables “headless identity” use cases—ideal for cloud agents, CI/CD pipelines, and edge deployments. If merged, it will become a cornerstone of IronClaw’s identity ecosystem.

These signals suggest the next major milestone will focus on *stateful agent execution* and *decentralized identity orchestration*.

---

### **7. User Feedback Summary**  
Users are expressing frustration with repetitive authentication flows, especially when running multi-step tasks involving web applications. The lack of persistent browser state forces manual re-login after each agent restart—a significant productivity drain.  

Conversely, the introduction of `identyclaw` as a host-mediated identity solution is seen as a promising step toward enabling secure, dependency-free agent operation—particularly valuable for developers deploying agents in restricted environments (e.g., containers, serverless functions).

Overall sentiment is constructive but cautious: users appreciate the direction but demand faster resolution of stability and persistence issues.

---

### **8. Backlog Watch**  
Several long-standing, high-impact items require maintainer attention:  
- **Issue #2358** — Open since April 12, 2026; has clear scope and design intent. Needs triage and assignment to ensure timely implementation.  
  🔗 [Link to Issue](https://github.com/nearai/ironclaw/issues/2358)  
- **Issue #8121** — Though newly created, it reveals a chronic problem in the benchmarking pipeline. Should be escalated to the CI/infra team for root-cause analysis and fix.  
  🔗 [Link to Issue](https://github.com/nearai/ironclaw/issues/8121)  
- **PR #7499** — Proposed by a new contributor with clear value. Requires review and feedback to avoid stagnation.  
  🔗 [Link to PR](https://github.com/nearai/ironclaw/pull/7499)

These items represent critical bottlenecks in both user experience and project maturity. Prioritization is recommended before Q4 2026 concludes.

---  
*Data source: GitHub repository nearai/ironclaw | Updated: 2026-10-02*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-10-02**

---

### **1. Today's Overview**  
The QwenPaw project remains highly active with a strong influx of developer contributions and user-reported issues over the past 24 hours. A total of **7 open issues** and **9 PRs** were updated, indicating sustained momentum in both feature development and bug fixing. The community is particularly focused on improving stability across third-party providers (DeepSeek, OpenAI), refining UI/UX for CJK text rendering, and enhancing Human-in-the-Loop capabilities. No new releases were issued, suggesting the team is prioritizing internal quality and integration before shipping updates.

---

### **2. Releases**  
❌ **No new releases** were published in the last 24 hours.  
The most recent stable version remains **v2.2.1**, with **v2.2.2.beta4** reported to have critical usability issues (see Issue #8073). Maintainers are likely preparing a hotfix release to address stability regressions observed in beta builds.

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (2):**  
- **[PR #8069](https://github.com/agentscope-ai/QwenPaw/pull/8069)**: *Fix DeepSeek formatter input types* – Restricts formatters to only accept image media, preventing invalid PDF/audio payloads from being sent to DeepSeek’s API. This fix resolves a known crash condition (see Issue #8064).  
- **[PR #8068](https://github.com/agentscope-ai/QwenPaw/pull/8068)**: *Repair CJK emphasis boundaries in Markdown* – Fixes incorrect rendering of bolded CJK text with punctuation inside delimiters, improving readability in multilingual conversations.

These merges indicate strong focus on **provider compatibility** and **text rendering correctness**, especially for Asian language users.

---

### **4. Community Hot Topics**  
🔥 **Top Issues by Engagement & Impact:**  
- **[Issue #6274](https://github.com/agentscope-ai/QwenPaw/issues/6274)**: *Add `ask_user_question` tool for Human-in-the-Loop*  
  - **3 comments, 1 👍** – High demand for safer agent decision-making via structured user input during ambiguous or high-risk tasks. This signals growing interest in **trustworthy, controllable AI agents**.
  
- **[Issue #8064](https://github.com/agentscope-ai/QwenPaw/issues/8064)**: *DeepSeek provider breaks after `send_file_to_user` with PDF*  
  - **2 comments, 0 👍** – Critical regression affecting session continuity; already addressed by PR #8069, but still under active discussion due to its impact on real-world usage.

🔥 **Top PRs by Complexity & Scope:**  
- **[PR #7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)**: *Add Advisor Mode (size/XXXL)*  
  - A major architectural enhancement enabling dual-model workflows (advisor + worker) for cost-performance balance. Likely to be a flagship feature in v2.3.0.

> **Analysis**: The community is pushing for **greater control, safety, and performance optimization** in agent interactions—especially around multimodal input handling and model orchestration.

---

### **5. Bugs & Stability**  
🚨 **Critical Severity (Session Breakage / Data Loss Risk):**  
- **[Issue #8064](https://github.com/agentscope-ai/QwenPaw/issues/8064)**: DeepSeek provider fails permanently after sending a PDF → every subsequent request returns 400 error.  
  - ✅ **Fix in progress**: PR #8069 addresses root cause (invalid media formatting).  
  - **Impact**: High — breaks workflows involving file sharing in production environments.

⚠️ **High Severity (UI/UX Disruption):**  
- **[Issue #8073](https://github.com/agentscope-ai/QwenPaw/issues/8073)**: V2.2.2.beta4 crashes conversation page when accessed via LAN devices.  
  - **Symptom**: Local access works; remote access fails. Suggests network binding or CORS misconfiguration.  
  - **Risk**: Blocks collaborative use cases and testing across devices.

⚠️ **Moderate Severity (Stability / State Management):**  
- **[Issue #8076](https://github.com/agentscope-ai/QwenPaw/issues/8076)**: `reload_agent` leaves in-flight turns abandoned silently after timeout.  
  - **Risk**: Can lead to resource leaks and inconsistent state during config reloads.  
  - **Note**: Currently no fix PR exists — requires attention.

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Features in Demand:**  
- **Human-in-the-Loop (HITL) Workflow** ([Issue #6274](https://github.com/agentscope-ai/QwenPaw/issues/6274))  
  - Request for `ask_user_question` tool with structured multi-choice + "other" fallback.  
  - **Predicted Inclusion**: Likely in **Q3 2027** as part of safety-first agent design.

- **Advisor Mode** ([PR #7569](https://github.com/agentscope-ai/QwenPaw/pull/7569))  
  - Dual-model setup (strong advisor + low-cost worker) for cost-efficient reasoning.  
  - **Predicted Inclusion**: Strong candidate for **v2.3.0** release.

- **Plugin-Theming Extension Point** ([Issue #8071](https://github.com/agentscope-ai/QwenPaw/issues/8071))  
  - Plugin authors need deeper theme control beyond `colorPrimary`.  
  - **Signal**: Growing plugin ecosystem requiring more customization depth.

> 📌 **Roadmap Trend**: Shift toward **modular, safe, extensible agent architectures** with enhanced human oversight and performance tuning.

---

### **7. User Feedback Summary**  
💬 **Key Pain Points Reported:**  
- **File Handling Instability**: Users report that sending PDFs to DeepSeek causes irreversible session failure — a serious workflow blocker.  
- **Remote Access Issues**: Beta users cannot access chat pages over LAN, limiting collaboration and testing.  
- **Multilingual Rendering Problems**: CJK users face broken markdown styling (e.g., `**句子。**`) due to improper emphasis parsing.  
- **Missing Safety Controls**: Lack of structured user feedback tools leads to anxiety about agent autonomy.

💡 **User Satisfaction Indicators**:  
- Positive engagement on HITL and theme extension requests suggests users value **transparency and control**.  
- Frequent PRs from contributors (e.g., wxhking, BeiMu-new) reflect strong trust in the codebase and active contribution culture.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered Important Issues Needing Attention:**  
- **[Issue #8076](https://github.com/agentscope-ai/QwenPaw/issues/8076)**: `reload_agent` abandons in-flight turns silently after 24-hour timeout.  
  - **Status**: Open since 2026-10-01, no assigned maintainer.  
  - **Urgency**: High — risks data inconsistency and memory leaks during restarts.

- **[Issue #8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)**: Plugin-facing theme extension point (semantic token override layer).  
  - **Status**: Open since 2026-10-01, no PR yet.  
  - **Urgency**: Medium-high — essential for future plugin ecosystem growth.

- **[Issue #8075](https://github.com/agentscope-ai/QwenPaw/issues/8075)**: Update Codex SDK to 0.159.3 for model discovery.  
  - **Status**: Open, one comment.  
  - **Urgency**: Medium — affects macOS arm64 support and model availability.

> ⚠️ **Recommendation**: Prioritize **issue triage and assign owners** to prevent stagnation in core stability and extensibility features.

---

**Next Review Date**: 2026-10-09  
**Project Health Score**: ✅ **Healthy** (active community, strong contributor base, clear roadmap signals) — but **critical bugs in beta versions require urgent attention**.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-10-02  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project is in a high-intensity development phase, evidenced by **38 open issues** and **50 open pull requests** updated within the last 24 hours—none closed or merged. Activity is heavily concentrated in **security hardening**, **runtime stability**, and **plugin system refinement**, with multiple high-severity bugs (P0/P1) related to data loss, CPU exhaustion, and privilege escalation reported today. The team is actively addressing foundational architecture concerns around session ownership, memory isolation, and agent composition, signaling a pre-v0.9.0 stabilization push. No new releases have been published, indicating that the focus remains on fixing critical path blockers before shipping.

---

### **2. Releases**

> ❌ **No new releases** since the last update.  
> - No version bumps, patch notes, or release artifacts published in the past 7 days.  
> - The next planned release is likely **v0.8.6** (tagged in several PRs), but it remains unshipped pending resolution of critical security and stability issues.

---

### **3. Project Progress**

#### ✅ **Merged/Closed PRs**  
> None — all 50 PRs remain open, with no merge activity in the last 24h.  

#### 🚀 **Key Advances in Active PRs**
- **Security & Authorization Enforcement**:  
  - [`PR #11411`](https://github.com/zeroclaw-labs/zeroclaw/pull/11411): Enforces private run ownership in SOP engine; part of a larger effort to prevent unauthorized access via shared execution paths.
  - [`PR #11410`](https://github.com/zeroclaw-labs/zeroclaw/pull/11410): Guards cron jobs against unscoped writes, preventing privilege escalation.
  - [`PR #11409`](https://github.com/zeroclaw-labs/zeroclaw/pull/11409): Refuses owned background result paths to avoid memory leaks across principal boundaries.

- **Plugin System Maturity**:  
  - [`PR #11302`](https://github.com/zeroclaw-labs/zeroclaw/pull/11302): Introduces `plugin bind` command for channel instance binding and grant seeding—critical for secure plugin deployment.
  - [`PR #11311`](https://github.com/zeroclaw-labs/zeroclaw/pull/11311): Adds end-to-end smoke test harness for release artifacts, ensuring WASM plugins can be installed and executed reliably.

- **Runtime Composition & Binary Size Control**:  
  - [`PR #11187`](https://github.com/zeroclaw-labs/zeroclaw/pull/11187): Moves `DefaultCapabilities` construction to the application layer—key step toward embeddable runtime.
  - [`PR #11306`](https://github.com/zeroclaw-labs/zeroclaw/pull/11306): Implements binary size measurement scripts to track footprint per feature profile—essential for optimizing distribution.

---

### **4. Community Hot Topics**

| Issue / PR | Link | Comments | Severity | Key Insight |
|-----------|------|----------|----------|-------------|
| [#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600) | [Session-persistence contract ownership](https://github.com/zeroclaw-labs/zeroclaw/issues/9600) | 16 | P2 (High Risk) | **Critical coordination gap**: Four independent teams modifying the same session persistence contract without ownership or ordering—threatens long-term stability. |
| [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | [SOP promotes steps before recording schema rejection](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | 4 | P0 (S1 Workflow Blocked) | **Workflow integrity failure**: Critical logic flaw where invalid outputs are processed before rejection is recorded—could cause irreversible state corruption. |
| [#11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387) | [zerocode ignores launch directory](https://github.com/zeroclaw-labs/zeroclaw/issues/11387) | 3 | P0 (S2 Degraded Behavior) | **Regression from #10609**: User-facing UX break—CLI launches in wrong directory despite user expectation. |
| [#11333](https://github.com/zeroclaw-labs/zeroclaw/issues/11333) | [Skill review tools can’t see skills in skill_bundles](https://github.com/zeroclaw-labs/zeroclaw/issues/11333) | 1 | S2 | **Tooling misalignment**: Core agent functionality fails silently when using bundled skills—impacts developer trust in tooling. |

> 🔍 **Underlying Need**: Users demand **predictable behavior**, **secure defaults**, and **transparent tooling**. The surge in P0/P1 issues indicates growing pressure to stabilize core workflows before broader adoption.

---

### **5. Bugs & Stability**

| Issue | Link | Severity | Status | Fix PR? |
|------|------|----------|--------|---------|
| [#9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799) | Long-lived ephemeral daemon spins CPU | P1 | Open | ❌ No fix PR |
| [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | SOP runs steps before rejecting output schema | P0 | Accepted | ⚠️ PRs in progress (e.g., #11411) |
| [#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) | Config::save() overwrites config.toml with empty file | P0 | Accepted | ❌ No fix PR |
| [#11198](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) | Delegated memory tools lose principal scope | P0 | Accepted | ⚠️ Partial fixes in PRs like #11411 |
| [#11323](https://github.com/zeroclaw-labs/zeroclaw/issues/11323) | `config set` saves refused edits | P1 | Accepted | ⚠️ Under discussion |
| [#11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332) | Skill learning loop skips non-CLI turns | P2 | Open | ❌ No fix PR |
| [#11369](https://github.com/zeroclaw-labs/zeroclaw/issues/11369) | Docker images exit at startup after upgrade | P1 | Open | ❌ No fix PR |

> 💥 **Stability Concerns**: High-risk CPU spin (`#9799`), data loss (`#10495`), and workflow blocking (`#10066`) dominate. These are not edge cases—they impact daily usage and trust. Fixes are either pending or in early review, indicating a **critical bottleneck** in delivery velocity.

---

### **6. Feature Requests & Roadmap Signals**

| Feature Request | Link | Priority | Roadmap Signal |
|----------------|------|----------|----------------|
| Add verified plugin update with rollback (`#10995`) | [Issue #10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995) | P2 | Explicitly requested for v0.8.6—indicates growing need for **safe plugin lifecycle management**. |
| Local username/password AuthProvider (`#8076`) | [Issue #8076](https://github.com/zeroclaw-labs/zeroclaw/issues/8076) | P2 | IdP-less login is a **key barrier to self-hosted adoption**—signals demand for frictionless onboarding. |
| llama.cpp model router (`#7539`) | [Issue #7539](https://github.com/zeroclaw-labs/zeroclaw/issues/7539) | P2 | Growing interest in **local LLM flexibility**—users want easy model switching without reconfiguration. |
| Make secret key/value maps editable in UI (`#11419`) | [PR #11419](https://github.com/zeroclaw-labs/zeroclaw/pull/11419) | Medium | Direct feedback from users wanting **better configuration UX**—likely to land in v0.8.6. |

> 📈 **Predicted Next Release Features**:  
> - Plugin update + rollback  
> - Local auth provider  
> - Improved config editing in UI  
> - Model router support  
> → All align with **self-hosting, security, and usability** goals for v0.8.6.

---

### **7. User Feedback Summary**

- **Frustration with UX regressions**: Multiple users report broken CLI behavior (e.g., `zerocode` ignoring cwd, "Copy" button not working). These are **not edge cases**—they disrupt core workflows.
- **Trust in data integrity**: Users are alarmed by `Config::save()` overwriting configs with near-empty files (#10495)—a clear **data loss risk** that undermines confidence.
- **Security anxiety**: Reports of delegated tools losing principal scope (#11198), shared memory plane exposure (#11239), and failed authorization persistence indicate users are deeply concerned about **privilege escalation and audit trails**.
- **Positive signals**: Users appreciate the direction toward modular tooling (`#11308`, `#11306`) and plugin verification—suggests growing satisfaction with **developer-first design**.

> ✅ **Overall Sentiment**: High engagement, strong technical interest—but increasing frustration with **unstable core behaviors** and **missing safety nets**.

---

### **8. Backlog Watch**

| Issue | Link | Age | Why It Needs Attention |
|------|------|-----|------------------------|
| [#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600) | Session-persistence contract ownership | 83 days | **Systemic risk**: Without an owner and ordering, four workstreams will continue to conflict—leads to race conditions and undocumented behavior. |
| [#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) | Config::save() overwrites config | 52 days | **Data loss vulnerability**—already reported as S0. No fix PR exists despite severity. |
| [#9394](https://github.com/zeroclaw-labs/zeroclaw/issues/9394) | Pairing codes never expire | 97 days | **Security regression**: Unexpired pairing codes enable persistent unauthorized access—critical for hosted deployments. |
| [#11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387) | zerocode ignores launch directory | 1 day (regression) | **Regression of known bug**—shows lack of regression testing. Should be prioritized immediately. |
| [#11333](https://github.com/zeroclaw-labs/zeroclaw/issues/11333) | Skill review tools can't see skill bundles | 1 day | **Functional gap** in developer experience—blocks debugging and iteration. |

> ⚠️ **Urgent Action Needed**: These issues represent **high-impact, low-effort fixes** that could dramatically improve user trust and stability. They should be triaged and assigned immediately.

---

### ✅ **Final Assessment: Project Health Score – 6.2 / 10**  
**Strengths**: Strong community engagement, mature security focus, excellent documentation efforts.  
**Risks**: High severity bugs unresolved, no new releases, regression fatigue.  
**Recommendation**: Prioritize **P0/P1 fixes** and **release v0.8.6** with security patches before expanding features.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*