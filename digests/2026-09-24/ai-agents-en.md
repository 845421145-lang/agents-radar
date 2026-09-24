# OpenClaw Ecosystem Digest 2026-09-24

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-24 00:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest**  
**Date:** 2026-09-24  
**Source:** GitHub (openclaw/openclaw)  

---

### **1. Today's Overview**  
OpenClaw is experiencing a high volume of activity with **500 issues and 500 pull requests updated in the last 24 hours**, indicating intense development and user-driven feedback cycles. The project remains highly active, with critical stability and usability concerns dominating the issue tracker—particularly around memory leaks, update failures, and session state corruption. A new release, **v2026.9.6**, was published but immediately withdrawn for macOS due to a severe crash loop bug, highlighting ongoing challenges with cross-platform reliability. Despite this, several high-priority PRs are progressing toward resolution, especially those targeting macOS launch failures and update integrity.

---

### **2. Releases**  
**🆕 v2026.9.6** – *Released on 2026-09-24*  
- **Summary**: Minor patch release focused on internal improvements and compatibility fixes.  
- **⚠️ Critical macOS Issue**: The macOS app version **2026.9.6 is broken** and causes **crash-on-launch** after any update. It has been **withdrawn from Sparkle feed**. Users must **reinstall v2026.9.5** until a hotfix (2026.9.7) is released.  
- **Migration Note**:  
  - **macOS users**: Do not update. Reinstall `2026.9.5` from [https://github.com/openclaw/openclaw/releases/tag/v2026.9.5](https://github.com/openclaw/openclaw/releases/tag/v2026.9.5).  
  - **Other platforms**: Linux/Windows users should verify update success via logs or `openclaw doctor`.  
- **Changelog**: See [PR #156875](https://github.com/openclaw/openclaw/pull/156875) for flat changelog details.

---

### **3. Project Progress**  
**✅ Merged/Closed PRs (Today)**: 99  
**🔧 Key Fixes & Advancements**:  
- **[PR #156881](https://github.com/openclaw/openclaw/pull/156881)**: Fixed macOS launch aborts post-update (directly addresses #156861). Draft fix pending native verification.  
- **[PR #156877](https://github.com/openclaw/openclaw/pull/156877)**: Improved test efficiency by reusing session fixtures in finalize integration tests.  
- **[PR #156869](https://github.com/openclaw/openclaw/pull/156869)**: Finalized release closeout for v2026.9.6 on `main`, including CHANGES.md sync.  
- **[PR #156875](https://github.com/openclaw/openclaw/pull/156875)**: Added flat changelog for v2026.9.6 to improve tooling readability.  
- **[PR #156865](https://github.com/openclaw/openclaw/pull/156865)**: Fixed "Disable All" tool toggle to exclude GitHub and transcript tools.  

> ✅ **Progress Highlight**: Multiple PRs directly address **critical update and launch failures**, signaling strong focus on stabilizing the release pipeline.

---

### **4. Community Hot Topics**  
**🔥 Top Issues by Comment Count (Top 5)**  
| Issue | Comments | Severity | Link |
|------|---------|----------|------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 39 | P0 (Critical) | Memory leak → OOM crashes (350MB → 15.5GB) |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | 19 | P1 | AgentSelectionRequiredError floods logs in explicit ownership mode |
| [#80319](https://github.com/openclaw/openclaw/issues/80319) | 17 | P2 | QA tool-defaults misrepresents Codex tool parity |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) | 16 | P1 | Reply lost during turn displacement (2026.9.4 regression) |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | 15 | P0 | Gateway startup hangs 17+ mins → timeout failure |

**🔍 Analysis of Underlying Needs**:  
- **System Stability**: Persistent memory leaks (#91588) and startup hangs (#152981) suggest deep architectural stress under long-running, multi-agent workloads.  
- **Reliability in Multi-Agent Environments**: High comment counts on ownership and session state bugs (#126360, #148707) indicate real-world deployment pain points in complex agent orchestration.  
- **Update Integrity**: Over 10 issues report update failures (e.g., #146887, #148681), revealing fragile upgrade paths across OSes.

---

### **5. Bugs & Stability**  
**🚨 Critical Bugs Reported (P0/P1, High Impact)**  
| Bug | Description | Fix PR? | Link |
|-----|-------------|--------|------|
| **#91588** | Gateway memory leak → RSS grows from 350MB to 15.5GB → OOM kill | ❌ | [Issue #91588](https://github.com/openclaw/openclaw/issues/91588) |
| **#156861** | macOS app unlaunchable after 2026.9.6 update | ✅ (Draft) | [PR #156881](https://github.com/openclaw/openclaw/pull/156881) |
| **#152981** | Gateway hangs 17+ mins at model runtime → fails to start | ❌ | [Issue #152981](https://github.com/openclaw/openclaw/issues/152981) |
| **#146887** | Update 2026.9.3→2026.9.4 fails across 4 stages (MCP timeout, lint gate) | ❌ | [Issue #146887](https://github.com/openclaw/openclaw/issues/146887) |
| **#148681** | Update finalization fails (finalize:doctor) | ❌ | [Issue #148681](https://github.com/openclaw/openclaw/issues/148681) |

> ⚠️ **Stability Concerns**: 15+ P0/P1 issues relate to **gateway lifecycle, updates, and memory management**. The project is currently **undergoing a stabilization phase** following rapid feature development.

---

### **6. Feature Requests & Roadmap Signals**  
**📈 Top User-Requested Features (High Engagement)**  
| Request | Use Case | Priority | Link |
|--------|----------|---------|------|
| **#44309**: One-way dispatch mode (no reply ping-pong) | Reduce chatter in A2A handoffs | P2 | [Issue #44309](https://github.com/openclaw/openclaw/issues/44309) |
| **#51572**: Fire session-memory hook on reset/prune | Better context cleanup | P2 | [Issue #51572](https://github.com/openclaw/openclaw/issues/51572) |
| **#138279**: Ship Linux aarch64 builds (deb + AppImage) | Support ARM Linux users | P3 | [Issue #138279](https://github.com/openclaw/openclaw/issues/138279) |
| **#44965**: Stream repetition safeguard (halt & confirm) | Prevent infinite loops in model output | P2 | [Issue #44965](https://github.com/openclaw/openclaw/issues/44965) |

> 📌 **Prediction**: These features—especially **one-way dispatch** and **session reset hooks**—are likely candidates for inclusion in **v2026.10.0**, given their alignment with current stability and UX priorities.

---

### **7. User Feedback Summary**  
**💬 Real User Pain Points**:  
- **macOS users** are **blocked entirely** by the 2026.9.6 crash; frustration is high (see #156861).  
- **Long-running sessions** (e.g., 13-day WeChat bridge) suffer from **phantom messages** (#151962), confusing users and breaking trust.  
- **Update failures** are widespread and inconsistent across platforms (Linux, Windows, macOS), causing workflow disruption.  
- **Agent ownership confusion** leads to logging spam and silent failures (#126360), undermining reliability.  
- **Memory search timeouts** persist despite CLI working fine (#128140), suggesting backend inefficiency.

> 💬 **Sentiment**: Mixed. While users appreciate rapid iteration, **stability and update reliability are top concerns**. Many express urgency for fixes over new features.

---

### **8. Backlog Watch**  
**⏳ Long-Standing Issues Needing Maintainer Attention**  
| Issue | Age | Status | Link |
|------|-----|--------|------|
| **#70903**: File-based provider cooldown blocks users for hours after billing recovery | 5 months | Stale, P0 | [Issue #70903](https://github.com/openclaw/openclaw/issues/70903) |
| **#138279**: Ship Linux aarch64 builds | 1 month | Stale, P3 | [Issue #138279](https://github.com/openclaw/openclaw/issues/138279) |
| **#128067**: Beta.7 field report: 6 reliability defect classes | 1 month | Stale, P1 | [Issue #128067](https://github.com/openclaw/openclaw/issues/128067) |
| **#138342**: Official Discord plugin rejected by trust check in 2026.9.1 | 1 month | Stale, P1 | [Issue #138342](https://github.com/openclaw/openclaw/issues/138342) |

> 🔍 **Note**: These issues have **high impact but low visibility**. They represent **unresolved friction points** that could deter enterprise adoption if not addressed.

---

**📌 Final Assessment**:  
OpenClaw is a **high-velocity, high-impact project** with strong community engagement. However, **stability and update reliability are critical bottlenecks**. Immediate focus should be on **macOS crash fixes**, **memory leak remediation**, and **update pipeline hardening**. Future releases will likely prioritize **reliability over new features** to rebuild user confidence.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Assistant & Agent Open-Source Ecosystem – 2026-09-24**

---

### **1. Ecosystem Overview**  
The personal AI assistant and agent open-source ecosystem in Q3 2026 is characterized by rapid evolution, divergent maturity paths, and increasing focus on production-grade reliability. Projects are transitioning from experimental prototyping toward enterprise-ready platforms, with strong emphasis on multi-agent orchestration, session persistence, security hardening, and cross-platform consistency. While innovation remains high—especially in tooling, context management, and channel integration—stability, update integrity, and trust mechanisms are emerging as critical bottlenecks across the landscape. The community is increasingly demanding auditable workflows, role-based access, and resilient state handling, signaling a maturation phase beyond early adopter enthusiasm.

---

### **2. Activity Comparison**

| Project | Issues (Last 24h) | Pull Requests (Last 24h) | Release Status | Health Score* |
|--------|-------------------|--------------------------|----------------|---------------|
| **OpenClaw** | 500 | 500 | v2026.9.6 withdrawn (macOS crash) | 🔴 Low (Critical instability) |
| **Hermes Agent** | 50 | 50 | None | 🟡 Medium (Stability risks) |
| **IronClaw** | 0 | 2 | RC1 → preparing for RC2 | ✅ High (Stable, preparatory) |
| **QwenPaw** | 37 | 24 | v2.2.0 stable; beta builds ongoing | 🟢 Strong (Production-focused) |
| **ZeroClaw** | 11 | 50 | None (pre-release) | 🟡 Medium (High risk, high velocity) |

> *Health Score: Based on stability, release reliability, security posture, and community feedback severity (🔴 = Critical, 🟡 = Concerns, ✅ = Stable, 🟢 = Healthy)*

---

### **3. OpenClaw's Position**  
OpenClaw stands as the most **high-velocity project** in the ecosystem, leading in both issue and PR volume—with 500 each in 24 hours. Its technical approach emphasizes **deep integration with native OS environments**, particularly macOS, but this has exposed significant cross-platform fragility, exemplified by the recent crash-on-launch bug in v2026.9.6. Compared to peers, OpenClaw exhibits the largest **community size and engagement density**, reflected in top-tier comment counts (e.g., #91588 with 39 comments). However, its health score is lowest due to persistent P0/P1 bugs around memory leaks, gateway hangs, and update failures—indicating that it is currently undergoing a **critical stabilization phase** rather than feature expansion. Unlike others, it prioritizes internal pipeline resilience over user-facing polish.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, recurring technical needs highlight convergence in core infrastructure challenges:

- **Session State & Persistence**:  
  - OpenClaw (#148707), Hermes (#120582), QwenPaw (#7931), ZeroClaw (#10797) all report issues with **state corruption, data loss, or silent truncation** during long-running sessions or under concurrency.
  - Demand for durable storage (e.g., QwenPaw’s SQLite-backed transcript history) signals a shift toward **persistent, audit-capable agent memory**.

- **Update Integrity & Pipeline Reliability**:  
  - OpenClaw (v2026.9.6 withdrawal), Hermes (#120339), ZeroClaw (#10814) emphasize **failure-prone update mechanisms**—from interrupted pulls to incomplete finalization steps—highlighting a systemic need for **resilient, idempotent deployment pipelines**.

- **Security & Approval Gate Enforcement**:  
  - Hermes (#59293), ZeroClaw (#10968), and QwenPaw (#7733) face **approval bypasses and policy enforcement gaps**, especially in automated/undirected workflows—pointing to a growing demand for **audit-trail transparency and secure automation boundaries**.

- **Multi-Agent Coordination & Tooling**:  
  - QwenPaw (#7484), ZeroClaw (#11074), OpenClaw (#44309) reflect rising interest in **A2A protocols, intelligent routing, and role-specific model assignment**, indicating a move toward **orchestration-aware agents** rather than standalone tools.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Target User** | Power users, developers, early adopters | Enterprise teams, security-conscious users | DevOps, embedded systems, privacy-first users | Teams, organizations, collaborative workloads | Automation engineers, WhatsApp integrators |
| **Technical Focus** | Native platform integration, session fidelity | Security, approval layers, desktop UX | WebAssembly sandboxing, dependency hygiene | Multi-tenancy, context control, team collaboration | Channel interoperability, real-time messaging |
| **Architecture** | Monolithic client + gateway | Hybrid CLI/desktop + approval layer | WASM-based virtual skill roots | Modular agent framework with SQLite persistence | Event-driven SOP engine with channel gateways |
| **Key Differentiator** | Aggressive feature velocity despite instability | Security-first design with audit trails | Minimalist, secure, and compliant | Team-scale AI platform with Hub vision | Deep WhatsApp Web integration and voice control |

> **Note**: ZeroClaw and QwenPaw are converging on **multi-channel agent execution**, while OpenClaw and Hermes prioritize **trust and compliance**—a divergence driven by target use cases.

---

### **6. Community Momentum & Maturity**

- **Rapid Iterators (High Velocity)**:  
  - **OpenClaw** and **ZeroClaw** dominate in activity volume (500+ PRs/issues daily), reflecting **alpha-stage development cycles** focused on feature experimentation and breaking down architectural barriers.  
  - These projects are best suited for contributors seeking high-impact, fast-moving environments.

- **Stabilizing / Preparing for Release**:  
  - **IronClaw** shows low activity but high preparation maturity—focused on dependency updates and documentation (PR #8109, #8110)—indicating readiness for a **stable 1.4.1 release**.  
  - **QwenPaw** maintains consistent progress toward v2.3, with clear roadmap signals around multi-tenancy and A2A coordination—suggesting **mature product planning**.

- **Enterprise-Ready Transition**:  
  - **Hermes Agent** and **QwenPaw** are shifting from individual use to **team/organization-level platforms**, evidenced by feature requests around RBAC, admin controls, and billing tracking—signaling **transition into production adoption phase**.

---

### **7. Trend Signals**  
Based on community feedback and project direction, the following industry trends are emerging:

1. **From Individual Assistants to Team Platforms**:  
   - QwenPaw’s Hub discussion (#7318) and Hermes’ SSH rollout request (#118029) confirm a **clear pivot from personal AI tools to collaborative agent systems**—a major market shift for open-source AI agents.

2. **Context Management as Core Infrastructure**:  
   - Repeated issues around context overflow (#7853), compaction budgeting (#7628), and memory leaks (#91588) indicate that **context is no longer an afterthought**—it is now a central engineering challenge requiring dedicated solutions like SQLite persistence, smart pruning, and predictive cost modeling.

3. **Trust Through Transparency**:  
   - Users demand **visible approval flows**, **error diagnostics**, and **debuggable automation** (e.g., Hermes' `skills.write_approval` gap). This reflects a growing need for **auditability and explainability** in autonomous systems.

4. **Channel-Centric Design is Mandatory**:  
   - ZeroClaw’s focus on WhatsApp poll interpretation and message pacing, QwenPaw’s Markdown rendering fixes, and Hermes’ BiDi text support show that **output fidelity across channels is non-negotiable** for real-world usability.

5. **Provider Agility Is Essential**:  
   - ZeroClaw’s urgent `agy_cli` addition and QwenPaw’s model override requests signal that **rapid provider API changes require agile tooling adaptation**—projects must embed flexibility into their core design.

---

### **Conclusion for Developers & Decision-Makers**  
The ecosystem is moving beyond novelty toward **production-grade, team-oriented AI agent platforms**. Stability, security, and trust are now more important than new features. For developers: prioritize **context durability, update resilience, and approval enforcement**. For organizations: favor projects like **QwenPaw and Hermes Agent** for team-scale deployments, while monitoring **OpenClaw and ZeroClaw** for high-risk innovation. The next 6–12 months will define which projects transition from "active" to "trusted"—and only those addressing foundational reliability will lead.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-24**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pipeline of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across core components, security, desktop UX, and internationalization. Despite no new releases, the community is focused on stabilizing session state integrity, improving cross-platform reliability (especially Windows), and hardening security boundaries. High-priority bugs related to data loss, crashes, and approval gate bypasses are actively being addressed, signaling a strong focus on production-grade reliability ahead of future releases.

---

### **2. Releases**  
*No new releases detected.*  
There are currently **no version updates or changelogs published** in the last 24 hours. The project continues to iterate internally, with critical fixes and features being merged into `main` without immediate release packaging. This suggests an upcoming release cycle may be imminent but not yet triggered.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- ✅ **PR #120820**: Fixed duplicate Bot Chat tabs after desktop compression — improves UI consistency.  
- ✅ **PR #120819**: Auto-formatted JavaScript via `npm run fix` — improves code hygiene and CI stability.  
- ✅ **PR #120824**: Fixed profile cron job merging logic — prevents installer jobs from being lost during `profile update`.  
- ✅ **PR #120827**: Preserves executed tool calls even after empty-response scaffolding drop — maintains session history integrity.  
- ✅ **PR #120339**: Resilient `hermes update` — now recovers gracefully if interrupted mid-pull.  
- ✅ **PR #120492**: Upgraded BrowserClaw to v3.1.0 — enhanced shadow DOM piercing and tool suite completeness.  
- ✅ **PR #120088**: Updated Web Search Plus plugin to v4.3.1 — adds adaptive routing, improved connection reuse.  

These merges reflect progress in **session stability**, **desktop UX polish**, **update resilience**, and **plugin ecosystem health**.

---

### **4. Community Hot Topics**  
Top Issues by engagement and severity:

| Issue | Summary | Link |
|------|--------|------|
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | CLI `hermes config set` bypasses system-config write protection — undermines new approval layer security. | [Issue #59293](https://github.com/NousResearch/hermes-agent/issues/59293) |
| [#120582](https://github.com/NousResearch/hermes-agent/issues/120582) | Real-world data loss due to proactive pruning + compression — files corrupted mid-session (fleet incident). | [Issue #120582](https://github.com/NousResearch/hermes-agent/issues/120582) |
| [#118029](https://github.com/NousResearch/hermes-agent/issues/118029) | Request for pinned, verified rollout control plane for managed SSH — enterprise security need. | [Issue #118029](https://github.com/NousResearch/hermes-agent/issues/118029) |

**Analysis:**  
The top topics reveal **critical tension between usability and security** (e.g., CLI bypassing approvals), **production stability concerns** (data loss in long sessions), and growing demand for **enterprise-grade deployment controls**. These issues are not isolated — they point to a maturing project where internal safeguards must keep pace with user autonomy.

---

### **5. Bugs & Stability**  
**Critical Bugs Reported (P1/P2, High Severity):**

| Bug | Description | Status | Fix PR? |
|-----|-------------|--------|---------|
| [#120582](https://github.com/NousResearch/hermes-agent/issues/120582) | Data loss: tool results truncated, args cut mid-session due to aggressive compression/pruning. | Open | ❌ No fix yet |
| [#120831](https://github.com/NousResearch/hermes-agent/issues/120831) | `GET /v1/skills` fails with `TypeError`: unexpected keyword argument `'include_editorial'` — breaks skill listing. | Open | ❌ No fix yet |
| [#120828](https://github.com/NousResearch/hermes-agent/issues/120828) | Custom Ollama provider sends tool-only payload with no `user` message — rejected by Qwen renderer. | Open | ❌ No fix yet |
| [#112961](https://github.com/NousResearch/hermes-agent/issues/112961) | Windows Desktop (`Hermes.exe`) crashes with `FAST_FAIL_FATAL_APP_EXIT` at offset `0x5281f15` during long WS sessions. | Open | ❌ No fix yet |
| [#120485](https://github.com/NousResearch/hermes-agent/issues/120485) | Long tool-heavy turns cause desktop transcript to drop earlier messages and misplace prompt below replies. | Open | ❌ No fix yet |

> 🔴 **Note:** Several P1/P2 bugs involve **real-world data loss or crashes**, and **no corresponding fix PRs exist yet** — urgent attention needed.

---

### **6. Feature Requests & Roadmap Signals**  
Key feature trends indicate **enterprise readiness** and **user customization**:

- **Enterprise Control Plane**:  
  - [#118029](https://github.com/NousResearch/hermes-agent/issues/118029) – One pinned, verified rollout control plane for managed SSH installations.  
  → Signals move toward **auditable, controlled deployments**.

- **Enhanced Localization & Accessibility**:  
  - [#120829](https://github.com/NousResearch/hermes-agent/pull/120829): Adds French, German, Spanish language support.  
  - [#120822](https://github.com/NousResearch/hermes-agent/pull/120822): Adds RTL/LTR text direction toggle.  
  → Strong push for **global accessibility and inclusive design**.

- **Custom Model & Provider Flexibility**:  
  - [#69162](https://github.com/NousResearch/hermes-agent/issues/69162), [#41431](https://github.com/NousResearch/hermes-agent/issues/41431), [#78314](https://github.com/NousResearch/hermes-agent/issues/78314): Multiple requests for custom model naming and per-provider configuration.  
  → Users want **greater flexibility with OpenRouter and local models**.

> 📌 *Predicted next release (v0.21.0): Likely to include localized UI, SSH rollout controls, and model management enhancements.*

---

### **7. User Feedback Summary**  
Real user pain points surface clearly:

- **Windows instability**: Repeated crashes (`FAST_FAIL_FATAL_APP_EXIT`, gateway encoding errors), slow cold starts, i18n locale failures (fr-FR, GBK), and silent hangs.  
- **Desktop UX flaws**: Message loss after long turns, missing review surfaces for skill writes (`skills.write_approval`), garbled Chinese text, and broken Arabic/English BiDi rendering.  
- **Security trust gaps**: Users report that approval layers can be bypassed via CLI, undermining confidence in audit trails.  
- **Feature gaps**: Lack of ability to manually edit model names/providers in GUI; missing TTS voice interrupt support for non-English STT.

> 👍 Satisfaction appears tied to **local model performance** and **CLI power**, while **desktop reliability and localization** remain major friction points.

---

### **8. Backlog Watch**  
High-impact, unresolved issues needing maintainer attention:

| Issue | Priority | Reason | Link |
|------|----------|--------|------|
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | P2 | Security bypass in approval layer — CLI disables protection un-gated. | [Issue #59293](https://github.com/NousResearch/hermes-agent/issues/59293) |
| [#120582](https://github.com/NousResearch/hermes-agent/issues/120582) | P1 | Production data loss incident — requires urgent fix. | [Issue #120582](https://github.com/NousResearch/hermes-agent/issues/120582) |
| [#118029](https://github.com/NousResearch/hermes-agent/issues/118029) | P3 | Enterprise security assurance needs — control plane for SSH rollouts. | [Issue #118029](https://github.com/NousResearch/hermes-agent/issues/118029) |
| [#98330](https://github.com/NousResearch/hermes-agent/issues/98330) | P2 | `skills.write_approval` has no review interface — pending writes accumulate silently. | [Issue #98330](https://github.com/NousResearch/hermes-agent/issues/98330) |
| [#117815](https://github.com/NousResearch/hermes-agent/issues/117815) | P3 | Four security boundary mismatches between reviewer view and actual execution. | [Issue #117815](https://github.com/NousResearch/hermes-agent/issues/117815) |

> ⚠️ These represent **critical risk areas** affecting security, reliability, and enterprise adoption. Prioritization should align with release planning.

---

**Project Health Assessment**:  
🟢 **Active & Growing** — High contribution velocity.  
🟡 **Stability Concerns** — Critical data-loss and crash bugs lack fixes.  
🔴 **Security Risk Exposure** — Approval gate bypasses and review discrepancies pose real threats.  
🟠 **Roadmap Clarity** — Emerging signals suggest v0.21 will emphasize enterprise control, localization, and session resilience.

👉 *Recommendation: Prioritize fixing #120582, #59293, and #118029 before next release.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-24**

---

### **1. Today's Overview**  
The IronClaw project remains in a stable, low-activity state with no new issues or releases reported today. Two pull requests were opened within the past 24 hours, both focused on release management and documentation improvements—indicating a preparatory phase ahead of a potential 1.4.1 release candidate. No PRs were merged or closed, suggesting minimal immediate code integration or bug resolution activity. The absence of open issues reflects either strong current stability or potentially underreported community engagement.

---

### **2. Releases**  
*No new releases were published today.*  
The latest release candidate remains `1.4.1-rc.1`, with no updates to versioned artifacts or changelogs. However, **PR #8110** (https://github.com/nearai/ironclaw/pull/8110) proposes advancing to `1.4.1-rc.2` with the following updates:  
- Promotes the existing RC1 branch for continued testing.  
- Retains the Google extension OAuth readiness fix from RC1.  
- Updates dependencies: `wasmtime@47.0.4` and `rustls@0.23.45` to address security advisories.  
This indicates ongoing efforts to stabilize the release pipeline ahead of a final 1.4.1 rollout.

---

### **3. Project Progress**  
Two new pull requests were opened today, reflecting incremental development focus:  
- **PR #8110**: *chore(release): cut 1.4.1-rc.2* — Prepares next release candidate with updated dependency lockfile and advisory compliance.  
- **PR #8109**: *docs(skills): clarify scoped virtual skill roots* — Improves documentation around skill discovery paths (`/skills`, `/system/skills`, `/tenant-shared/skills`) to replace outdated host-directory logic.  

Neither PR has been merged yet, but both represent forward movement in release readiness and user-facing clarity.

---

### **4. Community Hot Topics**  
*No active issues or high-engagement discussions are currently visible.*  
However, **PR #8109** (https://github.com/nearai/ironclaw/pull/8109) stands out as a critical community-facing update:  
- Addresses confusion around legacy disk-based skill imports vs. modern virtualized skill roots.  
- Aims to reduce ambiguity in trust model assignment during runtime.  
Though it has received no comments or reactions yet, its focus on documentation clarity signals an underlying need for better onboarding and architectural transparency—especially for developers integrating custom skills.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions were reported in the last 24 hours.*  
The lack of open issues suggests strong runtime stability at this moment. The only pending change (PR #8110) involves updating dependencies to patch known vulnerabilities in `wasmtime` and `rustls`, which implies proactive risk mitigation rather than reactive fixes. No associated bug reports exist for these components.

---

### **6. Feature Requests & Roadmap Signals**  
*No feature requests were filed today.*  
However, the emphasis on **scoped virtual skill roots** in PR #8109 hints at a broader roadmap shift toward modular, secure, and isolated skill deployment. This aligns with trends in AI agent systems favoring sandboxed execution environments and clear access boundaries. Future versions may prioritize:  
- Enhanced skill isolation via virtual filesystems.  
- Declarative skill manifest formats.  
- Improved tooling for tenant-specific skill sharing.  

These could be core themes in the upcoming 1.4.x series.

---

### **7. User Feedback Summary**  
*No direct user feedback was recorded in the last 24 hours.*  
Indirectly, the focus on clarifying skill root semantics in PR #8109 suggests that users—particularly those building or deploying custom skills—are encountering confusion about how skills are discovered and trusted. The shift from legacy disk-based imports to virtual roots implies growing pains in migration and adoption, especially for teams accustomed to local file system integration. Users likely value clearer guidance on best practices for secure, scalable skill deployment.

---

### **8. Backlog Watch**  
*No high-priority issues are currently open.*  
However, the long-standing need for improved documentation around skill discovery (highlighted in PR #8109) warrants attention from maintainers. While not urgent, this represents a recurring pain point that could hinder onboarding and ecosystem growth. Maintainers should consider scheduling a dedicated documentation sprint before the next major release to ensure clarity and consistency across use cases.

---

**Summary Status**: ✅ Stable | 🛠️ Preparing for Release | 💬 Low Engagement | 🔍 Ready for Documentation Push  
**Next Action**: Monitor PR #8110 and #8109 for merge; prepare for 1.4.1-rc.2 release.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-24**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust pace of development: **37 issues updated in the last 24 hours** (17 open, 20 closed), and **24 pull requests** (15 open, 9 merged). The project shows strong momentum in stabilizing core functionality while advancing toward enterprise-grade capabilities—particularly around multi-tenancy, context management, and user experience. No new releases were published today, but significant fixes are being integrated into the `2.2.x` stable line, indicating ongoing refinement ahead of a major release. Community engagement is intense, especially around real-world deployment challenges.

---

### **2. Releases**  
❌ **No new releases** were published in the past 24 hours.  
The latest stable version remains **v2.2.0**, with recent beta builds (`2.2.2b2`, `2.2.2b3`) focusing on stability and feature polish. Users should expect upcoming patch releases addressing critical bugs related to context overflow, session persistence, and tool handling.

> 🔗 [GitHub Releases Page](https://github.com/agentscope-ai/QwenPaw/releases)

---

### **3. Project Progress**  
✅ **9 PRs merged/closed today**, primarily focused on **stability, security, and UX improvements**:

- **PR #7955** – Added clear download provenance and Apache 2.0 licensing details to website.
- **PR #7952** – Improved error messaging for invitation redemption failures (now distinguishes revoked vs. invalid).
- **PR #7941** – Expanded unit test coverage across `src/qwenpaw` by +3.28pp (73.79% now), improving code reliability.
- **PR #7940** – Refined Console sidebar interactions and avatar persistence.
- **PR #7931** – Introduced *durable paginated transcript history* using SQLite storage (critical for long-running sessions).
- **PR #7927** – Replaced GPL-licensed `html2text` with MIT-licensed `markdownify` for safer HTML-to-text conversion.
- **PR #7409** – Fixed silent persistence of empty `output_text` blocks that could break downstream model calls.
- **PR #7563** – Distinguished between actual model errors and transport/network failures to prevent misleading UI prompts.
- **PR #7950 & #7951** – Fixed pre-send model probe logic that was masking real backend errors; now correctly reports configuration issues.

These changes reflect a shift toward **production-readiness** and **user transparency**.

> 🔗 [Merged PRs Summary](https://github.com/agentscope-ai/QwenPaw/pulls?q=is%3Apr+is%3Aclosed+updated%3A%3D2026-09-24)

---

### **4. Community Hot Topics**  

#### 🔥 **Issue #7318**: [QwenPaw Hub Multi-Tenant Edition — What Should We Build Next?](https://github.com/agentscope-ai/QwenPaw/issues/7318)  
- **32 comments**, **4 upvotes** – Most discussed issue today.  
- **Core need**: Team collaboration and enterprise adoption. Users want role-based access, admin controls, shared skill libraries, and billing/per-user tracking.  
- This signals **a strategic pivot from personal AI assistant → team/organization-level agent platform**.

#### 🔥 **Issue #7628**: [Context Compaction Exceeds Budget Despite Limits](https://github.com/agentscope-ai/QwenPaw/issues/7628)  
- **8 comments**, highlights a **critical flaw in context budgeting** where compaction triggers based only on visible context, not full request size.  
- **Underlying need**: Accurate, predictable cost control in long-running agents—especially when using expensive models.

#### 🔥 **Issue #7853**: [ToolResultPruner Skips Media Blocks, Causing Base64 Bloat](https://github.com/agentscope-ai/QwenPaw/issues/7853)  
- **8 comments**, urgent due to **context exhaustion from unpruned base64 images**.  
- **Root cause**: `ToolResultPruner` ignores `type="data"` (e.g., `view_image`), leading to infinite accumulation.  
- A **fix PR (#7871)** already exists and addresses this bypass.

> ✅ **Fix PR**: [#7871](https://github.com/agentscope-ai/QwenPaw/pull/7871) – Prevents literal markers from bypassing truncation.

---

### **5. Bugs & Stability**  
⚠️ **Critical bugs reported today**, ranked by severity:

| Issue | Severity | Summary | Fix Status |
|------|----------|--------|------------|
| [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) | 🔴 High | Unbounded base64 image accumulation causes context overflow | ✅ **Fix PR exists (#7871)** |
| [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 🟡 Medium | Context compaction fails due to incomplete budget calculation | ❌ No fix yet |
| [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | 🔴 High | Hardcoded 32768 context fallback breaks all models (>31k tokens) | ✅ **Fixed in v2.2.0+** |
| [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | 🟡 Medium | Daily Paper fails silently when arxiv.org unreachable | ⚠️ No proxy config exposed |
| [#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857) | 🔴 High | ACP shutdown can leak event loops and skip cleanup | ❌ No fix yet |

> 💡 **Note**: The **base64 bloat bug (#7853)** is particularly dangerous—it can crash agents during long tasks and is actively being addressed.

---

### **6. Feature Requests & Roadmap Signals**  

#### 📌 Top Requested Features:
- **Multi-agent coordination (A2A)**: [Issue #7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) – Users demand official support for A2A protocol after MCP is implemented.  
  > 🔮 *Likely in v2.3 or v2.4 – architectural readiness confirmed.*
  
- **Per-agent reasoning_effort override**: [Issue #7062](https://github.com/agentscope-ai/QwenPaw/issues/7062) – Allow different thinking depth per agent/session.  
  > 🔮 *High priority for customization in complex workflows.*

- **Support for multiple LLMs per task**: [Issue #1010](https://github.com/agentscope-ai/QwenPaw/issues/1010) – Users want to assign optimal models to specific roles (e.g., small model for QA, large for research).  
  > 🔮 *Essential for cost/performance optimization — likely in v2.3.*

- **Persistent settings & session state**: [Issue #7377](https://github.com/agentscope-ai/QwenPaw/issues/7377) – Loop mode not preserved across runs.  
  > 🔮 *UX improvement in next console update.*

---

### **7. User Feedback Summary**  
Real user pain points from issues highlight:

- **Enterprise readiness gaps**: Teams want admin tools, role-based access, and audit trails (via Hub).
- **UX friction**: Settings hard to find, tool descriptions unclear, no download buttons ([#2948](https://github.com/agentscope-ai/QwenPaw/issues/2948)).
- **Debugging opacity**: Silent failures (e.g., Daily Paper, 401 errors) hide root causes — users need better error visibility.
- **Visual fatigue**: Deep mode background too dark ([#2200](https://github.com/agentscope-ai/QwenPaw/issues/2200)), and console design breaks input flow ([#7948](https://github.com/agentscope-ai/QwenPaw/issues/7948)).

> ✅ **Positive signal**: High engagement on usability and stability—users are deeply invested in making QwenPaw production-ready.

---

### **8. Backlog Watch**  
🔴 **Long-standing, high-impact issues needing maintainer attention**:

- **[Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)** – *Multi-tenant Hub roadmap*: 32 comments, community-driven direction. **Action needed**: Maintain a public roadmap or voting system.
- **[Issue #7628](https://github.com/agentscope-ai/QwenPaw/issues/7628)** – Context budgeting flaw: **no assigned developer**, despite being critical.
- **[Issue #7733](https://github.com/agentscope-ai/QwenPaw/issues/7733)** – Agent-autonomous context management: Needs deeper architectural discussion.
- **[Issue #7484](https://github.com/agentscope-ai/QwenPaw/issues/7484)** – A2A support: Architecture is ready; needs commitment to implementation.

> 🛠️ **Recommendation**: Assign owners to top 3 issues above and publish a quarterly roadmap to align community expectations.

---

### ✅ **Final Assessment**  
QwenPaw is **healthy, evolving rapidly, and transitioning from personal assistant to team-scale AI agent platform**. With strong community involvement, frequent quality improvements, and growing focus on stability and enterprise use cases, the project is well-positioned for a major v2.3 release targeting **multi-agent orchestration, advanced context control, and team collaboration features**. Maintainers must prioritize **bug triage, documentation clarity, and roadmap transparency** to sustain momentum.

> 📊 **Next Steps**: Monitor PRs #7872, #7956, #7931 for integration into upcoming stable build.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-24  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active with a surge in recent development activity: **11 open issues** and **50 open pull requests** updated within the last 24 hours, indicating strong momentum in feature development, security hardening, and platform stability. The community is focused on resolving high-severity bugs related to agent security, channel routing, and memory consistency, while also advancing new capabilities for WhatsApp Web integration and multi-provider support. Notably, no new releases have been published, suggesting that the team is prioritizing internal quality assurance and integration before finalizing a release cycle.

---

### **2. Releases**

> ❌ **No new releases** detected in the past 24 hours.

There are currently **no published versions** or release notes available. The project continues to iterate on the `master` branch with ongoing improvements to core functionality, security policies, and tooling infrastructure. Maintainers appear to be preparing for a future v0.8.6 or v0.9.0 release, as indicated by tracker issue #10814 ([Release efficiency and repeatable publication](https://github.com/zeroclaw-labs/zeroclaw/issues/10814)), which aims to streamline the release workflow following v0.8.5.

---

### **3. Project Progress**

**Merged/Closed PRs (Last 24h):** *None*  
**PRs updated:** 50 (47 open, 3 merged/closed — details below)

While no PRs were merged today, several key changes were finalized and integrated into the codebase over the past week:

- ✅ **PR #11076** ([feat(tools): add agy_cli coding-CLI tool for Antigravity CLI](https://github.com/zeroclaw-labs/zeroclaw/pull/11076)) – Adds native support for Google’s new `agy` CLI, replacing deprecated Gemini CLI access.
- ✅ **PR #10988** ([feat(channels/whatsapp-web): read poll votes back as [choice] messages](https://github.com/zeroclaw-labs/zeroclaw/pull/10988)) – Enables WhatsApp polls to be properly interpreted by agents, closing a critical feedback loop gap.
- ✅ **PR #11057** ([fix(channels/whatsapp-web): honour suppress_voice before queueing TTS](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)) – Ensures `suppress_voice` flag is respected in voice reply logic, improving user control.

These updates signal strong progress in **WhatsApp Web interoperability**, **agent reliability**, and **provider ecosystem expansion**.

---

### **4. Community Hot Topics**

The most active discussions center around **security**, **channel routing**, and **voice message handling**:

- 🔥 **Issue #10968** – *Unattended agent turns run without ApprovalManager, silently bypassing security policies* ([Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10968))  
  > ⚠️ **Severity:** S0 (Data loss/security risk)  
  > This is a **critical vulnerability**: cron-based, headless SOPs can execute without approval checks. 3 comments, flagged for maintainer review.  
  > *Underlying need:* Secure automation of unattended workflows without compromising policy enforcement.

- 🔥 **Issue #10985** – *Dashboard-started turns cannot reach session-bound channels via tools* ([Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10985))  
  > ⚠️ **Severity:** S2 (Degraded behavior)  
  > Affects users relying on the web dashboard to trigger channel-specific actions. 3 comments, in-progress status.  
  > *Underlying need:* Consistent session state across all entry points (web UI vs. API).

- 🔥 **PR #11075** – *Add `agy_cli` tool for Antigravity CLI* ([Link](https://github.com/zeroclaw-labs/zeroclaw/pull/11075))  
  > Created today; already has community traction due to Google’s shift away from `gemini-cli`.  
  > *Underlying need:* Timely adaptation to evolving AI provider APIs.

---

### **5. Bugs & Stability**

| Issue ID | Title | Severity | Status | Fix PR? |
|--------|------|----------|--------|--------|
| [#10968](https://github.com/zeroclaw-labs/zeroclaw/issues/10968) | Unattended agent runs without ApprovalManager | **S0 (Critical)** | Open | ❌ No PR yet |
| [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | Markdown memory backend loses entries during concurrent store() calls | **S0 (Critical)** | Open | ❌ No PR yet |
| [#11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) | WhatsApp Web ignores `force_voice` | **S2 (High)** | Open | ❌ No PR yet |
| [#11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) | Daemon never registers channel-map factory → no channels in webhook/cron/SOP turns | **Medium** | Open | ❌ No PR yet |
| [#10922](https://github.com/zeroclaw-labs/zeroclaw/issues/10922) | WhatsApp Web ignores `suppress_voice` in TTS queueing | **S2 (High)** | Open | ✅ [PR #11057](https://github.com/zeroclaw-labs/zeroclaw/pull/11057) |

> ⚠️ **Critical Note:** Two **S0-level data loss/security risks** remain unresolved:  
> - Agent bypasses approvals (`#10968`)  
> - Concurrent memory writes lead to silent data loss (`#10797`)  

Both require urgent attention from maintainers.

---

### **6. Feature Requests & Roadmap Signals**

Emerging signals suggest upcoming enhancements in **multi-provider intelligence**, **user experience polish**, and **cross-channel consistency**:

- 📌 **Issue #11074** – *RFC: search_routes — hint-based routing for web_search_tool* ([Link](https://github.com/zeroclaw-labs/zeroclaw/issues/11074))  
  > Allows agents to route queries based on intent (e.g., primary source vs. corroboration).  
  > *Predicted for v0.9.0*: A major step toward intelligent, context-aware tool selection.

- 📌 **Issue #11052** – *Render thematic breaks and setext headings in WhatsApp* ([Link](https://github.com/zeroclaw-labs/zeroclaw/issues/11052))  
  > Addresses Markdown rendering gaps in WhatsApp Web.  
  > *Likely in v0.8.6*: Part of broader effort to improve output fidelity across channels.

- 📌 **Issue #11050** – *Pace native polls with other outbound messages* ([Link](https://github.com/zeroclaw-labs/zeroclaw/issues/11050))  
  > Prevents message flooding by applying pacing to polls.  
  > *Roadmap priority:* Core to responsible messaging at scale.

---

### **7. User Feedback Summary**

User pain points reflect real-world usage challenges:

- **Security anxiety:** Users report confusion when automated agents act without visible approval, especially in unattended SOPs (#10968).
- **Channel inconsistency:** Dashboard-triggered turns fail to interact with session-bound tools (e.g., WhatsApp), breaking expected workflows (#10985).
- **Voice message unpredictability:** Despite enabling `force_voice`, agents still send text replies—users want more control over modality (#11059).
- **API evolution fatigue:** Immediate demand for `agy_cli` reflects frustration with outdated tooling after provider changes (Google’s move to `agy` in June 2026).

Overall satisfaction appears high for core functionality, but **trust in automation safety and predictability** is under strain.

---

### **8. Backlog Watch**

Several high-impact, long-standing issues remain **unanswered or unreviewed**:

- 🔴 **Issue #10814** – *Release efficiency and repeatable publication* ([Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10814))  
  > A tracker issue with no comments, created on 2026-09-13.  
  > **Critical for release hygiene** — must be addressed before next version.

- 🔴 **Issue #10968** – *Unattended agent runs without ApprovalManager*  
  > High severity (S0), created 2026-09-19, **still awaiting maintainer review** despite being labeled `needs-maintainer-review`.

- 🔴 **Issue #10797** – *Markdown memory backend loses data under concurrency*  
  > Also labeled `priority:p1`, `risk:high`, but **no PR or discussion beyond initial report**.

> ⚠️ **Call to action:** These three issues represent systemic risks to data integrity and trust. They should be prioritized immediately by the maintainers’ team.

---

## ✅ **Final Assessment: Project Health – Moderate to High Risk**

While ZeroClaw demonstrates **strong engineering velocity and community engagement**, it faces **critical security and stability risks** that could undermine adoption if not resolved promptly. The absence of new releases despite heavy PR activity suggests a **pre-release stabilization phase**. 

**Recommendation:** Prioritize fixing S0 bugs (#10968, #10797), finalize the release pipeline (#10814), and accelerate maintenance triage to prevent technical debt accumulation.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*