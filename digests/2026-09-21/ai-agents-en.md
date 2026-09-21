# OpenClaw Ecosystem Digest 2026-09-21

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-21 00:26 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# **OpenClaw Project Digest — 2026-09-21**

---

### **1. Today's Overview**
The OpenClaw project is experiencing intense activity with **500 issues and 500 pull requests updated in the last 24 hours**, indicating a high-pressure development phase, likely driven by recent release cycles and critical stability concerns. The surge in open issues—especially P0 and P1 bugs—reflects growing instability in production environments, particularly around memory management, database corruption, and update failures. Despite no new releases, multiple PRs are actively addressing urgent regressions, suggesting that the team is prioritizing post-release stabilization over feature delivery.

---

### **2. Releases**
**No new releases** were published today. The latest stable version remains **2026.9.5**, which has already triggered significant user-reported outages. This lack of a new release underscores a reactive posture: the team is focused on resolving critical flaws introduced in prior versions rather than pushing forward with new features or updates.

> 🔗 [GitHub Releases](https://github.com/openclaw/openclaw/releases)

---

### **3. Project Progress**
**212 PRs were merged or closed** today—primarily focused on **stability fixes, security hardening, and UX improvements**. Notable advancements include:
- ✅ **Fixes to heartbeat logic** (#153573) preventing cross-channel message mislabeling.
- ✅ **Improved plugin cleanup** (#153246) resolving temp dir bloat (up to 7.5 GB/day).
- ✅ **Enhanced session state handling** (#153895) ensuring Dream Diary entries aren’t dropped due to clamping.
- ✅ **Update robustness** (#153839) fixing SQLite inspection failures during `openclaw update`.
- ✅ **UI performance improvements** (#154179, #154150) reducing layout stalls and speeding up CI linting.

These changes reflect a strong focus on **system resilience and operational hygiene**, especially for long-running deployments.

> 🔗 [PRs Merged/Closed – 212 items](https://github.com/openclaw/openclaw/pulls?q=is%3Apr+is%3Aclosed+updated%3A%3E%3D2026-09-20)

---

### **4. Community Hot Topics**
Top issues and PRs driving community attention:

#### 🔥 **P0 Bug: Agent SQLite WAL Growth (Issue #143524)**  
- **35 comments**, **no fix yet**  
- On Windows, `agent.sqlite-wal` grows unchecked to **2.8 GB**, blocking gateway startup. Manual `wal_checkpoint(TRUNCATE)` helps temporarily but fails permanently.  
- *Underlying need:* Prevent unbounded WAL growth via proper checkpointing and lifecycle control in agent DB layer.

> 🔗 [Issue #143524](https://github.com/openclaw/openclaw/issues/143524)

#### 🔥 **P0 Bug: Gateway Memory Leak (Issue #91588)**  
- **29 comments**, **no fix yet**  
- RSS climbs from **350 MB → 15.5 GB over days**, triggering OOM kills and restart loops.  
- *Underlying need:* Deep memory profiling and leak detection across core modules (session, agent persistence, MCP).

> 🔗 [Issue #91588](https://github.com/openclaw/openclaw/issues/91588)

#### 🔥 **PR: Fix Update Deadlock & Plugin Migration Failures (PR #153882)**  
- **7 comments**, **closed**  
- Updates stall because plugin migrations defer on parent install-lease locks. Doctor aborts, leaving system in broken state.  
- *Significance:* Critical for upgrade reliability; users report self-upgrade deadlocks (e.g., #151467).

> 🔗 [PR #153882](https://github.com/openclaw/openclaw/pull/153882)

---

### **5. Bugs & Stability**
Critical stability issues reported today:

| Severity | Issue | Summary | Fix PR? |
|--------|------|--------|--------|
| 🦐 **P0 (Gold Shrimp)** | [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL grows to 2.8 GB; blocks startup | ❌ No |
| 🦐 **P0 (Gold Shrimp)** | [#153257](https://github.com/openclaw/openclaw/issues/153257) | 2026.9.5 turns stable env into 8-hour recovery session | ❌ No |
| 🦞 **P1 (Diamond Lobster)** | [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway memory leak: 350MB → 15.5GB | ❌ No |
| 🦞 **P1 (Diamond Lobster)** | [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP init timeout causes unhandled rejection → gateway crash | ❌ No |
| 🦪 **P1 (Silver Shellfish)** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Zombie processes accumulate from hook/tool execution | ❌ No |

> ⚠️ **All top-tier bugs remain open**, signaling ongoing risk in production use.

---

### **6. Feature Requests & Roadmap Signals**
User-driven feature needs emerging strongly:

- **Multi-bot support on Teams** (#71058): Users want one gateway to manage multiple Azure/Teams bots.
- **Progress streaming for Feishu** (#131457): Request to align with Slack/Discord streaming behavior.
- **Per-turn send budget** (#119992): Prevent duplicate-answer storms from tool calls within a single turn.
- **Pre-reset memory flush** (#45608): Align `/new`, `/reset`, and daily reset with compaction-level memory flush.

> 💡 **Prediction:** These will likely be prioritized in **v2026.10.0**, especially if current stability issues are resolved.

> 🔗 [Feature Request #71058](https://github.com/openclaw/openclaw/issues/71058)  
> 🔗 [Feature Request #131457](https://github.com/openclaw/openclaw/issues/131457)

---

### **7. User Feedback Summary**
Real-world pain points dominate feedback:
- **"I upgraded to 2026.9.5 and now my environment is unusable."** — Multiple users report 8+ hour recovery sessions after update.
- **"My gateway crashes every few days due to OOM."** — High memory consumption observed even under moderate load.
- **"Plugins build dirs grow uncontrollably."** — 7.5 GB/day impact on disk space.
- **"Heartbeat messages leak into user chats."** — Internal debug logs visible in Telegram.
- **"Updates silently fail with no error."** — `doctor-failed` with no actionable output.

> ✅ **Satisfaction**: Low. Users express frustration with **update reliability, memory stability, and lack of transparency** during failures.

---

### **8. Backlog Watch**
Long-standing, high-impact issues needing maintainer attention:

| Issue | Age | Status | Why It Matters |
|------|-----|--------|----------------|
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 6 months | Open, stale | "Cannot convert undefined/null" on Google Vertex/Gemini models — widespread regression |
| [#51429](https://github.com/openclaw/openclaw/issues/51429) | 6 months | Open, stale | Hardcoded path (`/Users/wangtao`) in code — shipped in production! |
| [#114211](https://github.com/openclaw/openclaw/issues/114211) | 6 months | Open, stale | Matrix agents loop indefinitely on no-reply output — data loss risk |
| [#123360](https://github.com/openclaw/openclaw/issues/123360) | 6 months | Closed | Narrative discards completed work — **critical data-loss bug** |
| [#153654](https://github.com/openclaw/openclaw/issues/153654) | 1 day | Closed | Session migration failure report — highlights systemic recovery gaps |

> ⏳ **Note:** Despite being closed, #153654 reveals deeper issues in migration validation. These older issues suggest **gaps in testing, review, and regression coverage**.

---

### **Final Assessment**
OpenClaw is in a **high-stress stabilization phase** following v2026.9.5. While developer activity is robust, **core stability and upgrade reliability remain fragile**. The project shows signs of **overburdened engineering capacity** and **inadequate pre-release testing**. Immediate focus must shift to resolving P0/P1 memory, database, and update issues before introducing new features.

> 🔍 **Recommendation**: Prioritize closing #143524, #91588, #153882, and #153257. Consider delaying next release until these are resolved. Implement stricter release gate checks, especially around SQLite, memory, and update flows.

---

## Cross-Ecosystem Comparison

# **Cross-Project Comparison Report: Personal AI Agent Ecosystem – 2026-09-21**

---

### **1. Ecosystem Overview**  
The open-source personal AI assistant and agent ecosystem in Q3 2026 is characterized by **intense engineering activity, growing maturity, and divergent strategic focus**. While all major projects are actively developing—driven by user demand for reliability, security, and collaboration—there is a clear bifurcation between **stabilization-focused platforms** (e.g., OpenClaw) and **architecturally ambitious, security-first systems** (e.g., ZeroClaw). The landscape reflects a shift from novelty-driven feature addition toward **systemic resilience, modularity, and enterprise-grade operational hygiene**, with strong signals that users now prioritize *predictability* over *feature velocity*. This maturity is evident in RFC governance, dependency hygiene, and cross-project convergence on foundational concerns like memory safety and model orchestration.

---

### **2. Activity Comparison**

| Project        | Issues (24h) | PRs (24h) | Releases | Health Score¹ | Notes |
|----------------|--------------|-----------|----------|---------------|-------|
| **OpenClaw**   | 500          | 500       | ❌ No     | 🔴 Low         | High pressure; P0 bugs dominate; stability crisis |
| **Hermes Agent** | 50           | 50        | ❌ No     | 🟡 Moderate     | Focused fixes; UX polish; moderate risk |
| **IronClaw**   | 0            | 7         | ❌ No     | 🟢 Healthy      | Maintenance mode; dependency hygiene |
| **QwenPaw**    | 24           | 37        | ✅ v2.2.2-beta.3 | 🟡 Moderate     | Beta stabilization; media/workflow instability |
| **ZeroClaw**   | 50           | 50        | ❌ No     | 🟢 Strong       | Architectural depth; RFC-driven progress |

> **¹ Health Score**: Based on stability, bug severity, release cadence, and community feedback (🔴 = critical, 🟡 = moderate, 🟢 = stable)

---

### **3. OpenClaw's Position**  
OpenClaw stands out as the **most active but most unstable** project in the ecosystem, with 500 issues and 500 PRs updated daily—a level of activity unmatched by peers. Its technical approach leans heavily on **monolithic core architecture** with deep integration across database, session state, and update logic, which enables rapid iteration but exacerbates systemic fragility. Compared to peers:
- **vs. ZeroClaw**: OpenClaw lacks modular design and zero-trust enforcement; its runtime is more vulnerable to cascading failures.
- **vs. Hermes Agent**: OpenClaw has broader plugin support but worse error visibility and debugging tools.
- **vs. QwenPaw**: OpenClaw’s user base appears larger (based on issue volume), but engagement is skewed toward pain points rather than feature requests.

Despite this scale, OpenClaw’s **community momentum is under strain**—with widespread frustration around updates and crashes—suggesting a high-risk deployment environment. It remains the most widely used but least reliable in production today.

---

### **4. Shared Technical Focus Areas**  
Across all five projects, recurring technical needs indicate a maturing ecosystem:

| Need | Projects Affected | Specific Requirements |
|------|-------------------|------------------------|
| **Memory & Resource Leak Mitigation** | OpenClaw, Hermes Agent, QwenPaw, ZeroClaw | Long-running process cleanup, OOM prevention, lifecycle management |
| **Database/Storage Integrity** | OpenClaw, QwenPaw, ZeroClaw | WAL growth control, checkpointing, crash-safe persistence |
| **Session Persistence & State Recovery** | OpenClaw, QwenPaw, ZeroClaw | Prevent data loss after restart, trim, or failure |
| **Model Orchestration & Configuration Unification** | QwenPaw, ZeroClaw, Hermes Agent | Single UI for model selection, pricing, and thinking controls |
| **Security-by-Default Enforcement** | ZeroClaw, IronClaw, OpenClaw | Sender auth, input validation, permission gates, safe execution policies |
| **Dependency & CI Hygiene** | IronClaw, QwenPaw, ZeroClaw | Automated updates, secure toolchains, test coverage expansion |

These patterns signal a **shift from individual component fixes to holistic system reliability**—a hallmark of mature agent platforms.

---

### **5. Differentiation Analysis**

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---------|----------|--------------|----------|---------|----------|
| **Target Users** | General power users, enterprises | Developers, researchers | DevOps, self-hosters | Teams, multi-user workflows | Security-conscious teams, integrators |
| **Feature Focus** | Feature velocity, plugin richness | UX polish, bot-mode realism | Extensibility, GUI config | Multi-tenant Hub, rich media | Security, modularity, protocol compatibility |
| **Architecture** | Monolithic core | Hybrid desktop/web | Modular extensions (WASM) | Plugin-based, Web UI-heavy | Pluggable, WASM-first, policy-driven |
| **Deployment Model** | Self-hosted, cloud-native | Desktop + web | Web UI + CLI | Self-hosted, Hub edition | Self-hosted, zero-trust gateways |
| **Key Differentiator** | Scale and ecosystem breadth | Natural interaction patterns | Secure GUI configuration | Team-centric AI platform | Runtime isolation & auditability |

> ✅ **ZeroClaw** leads in **security and extensibility**; **QwenPaw** leads in **team collaboration features**; **OpenClaw** leads in **user volume and plugin ecosystem**—but lags in reliability.

---

### **6. Community Momentum & Maturity**  
- **High-Momentum Projects (Rapid Iteration)**:  
  - **OpenClaw**: Highest activity (500+ issues/PRs), but driven by crisis response—not innovation.  
  - **ZeroClaw**: Structured RFC process, high-quality discussion, and architectural depth signal **mature development discipline**.  
  - **QwenPaw**: Strong beta testing culture and active feature voting (e.g., #7318) show **engaged, product-driven users**.

- **Stabilizing Projects (Maintenance Mode)**:  
  - **Hermes Agent**: Steady, focused fixes with emphasis on automation and UX consistency.  
  - **IronClaw**: Minimal issues, proactive dependency management—indicating **low defect density and high maintainability**.

This tiering reveals a healthy ecosystem: **two projects are building foundations (ZeroClaw, IronClaw), two are scaling rapidly (OpenClaw, QwenPaw), and one is refining experience (Hermes Agent)**.

---

### **7. Trend Signals**  
Based on community feedback and PR/issue patterns, key industry trends emerging for AI agent developers include:

1. **From Features to Reliability**: Users are demanding **stable upgrades, predictable memory usage, and crash-free sessions**—not new tools.  
2. **Team-Centric AI Platforms**: The rise of **multi-tenant hubs, role-based access, and shared skills** (QwenPaw, ZeroClaw) indicates a shift from personal assistants to **collaborative AI workspaces**.  
3. **Security-by-Default Architecture**: Per-execution confirmations, sender authorization, and policy enforcement (ZeroClaw, IronClaw) reflect **growing concern over RCE and data leakage**.  
4. **Unified Model Management**: Fragmented model configuration is a top pain point—users want **one interface for text, audio, vision, and cost controls**.  
5. **Extensible, Isolated Execution**: WASM, pluggable providers, and sandboxed plugins (IronClaw, ZeroClaw) suggest **modular, auditable agent execution** will be standard in 2027+.  

> 🔍 **Value for Developers**: Build with **modularity, observability, and security at the core**—not just functionality. The next wave of adoption will favor platforms that **prevent failures before they happen**.

---

**Compiled:** 2026-09-21  
**Sources:** GitHub APIs, project digests, community forums, PR/issue metadata  
**Audience:** Technical decision-makers, open-source maintainers, AI agent architects

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# **Hermes Agent Project Digest – 2026-09-21**

---

### **1. Today's Overview**  
The Hermes Agent project remains highly active with a robust pace of development: **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across multiple components. No new releases were published, suggesting that the team is prioritizing bug fixes and feature refinement ahead of a potential v0.22.0 rollout. The activity is concentrated in core areas like session management, memory handling, platform compatibility (especially Windows), and bot-mode UX improvements. While stability concerns persist—particularly around process/memory leaks and edge-case crashes—the project continues to evolve with clear signals toward a leaner, more secure architecture.

---

### **2. Releases**  
❌ **No new releases** were published today.  
*Note:* The latest release remains `v0.21.3` (2026.9.14). There are no breaking changes or migration notes to report at this time.

---

### **3. Project Progress**  
✅ **11 PRs merged/closed** today, reflecting focused engineering on critical path fixes:

- **PR #117718**: Fixes preservation of bot RPC error codes/data, improving debugability in Desktop.
- **PR #117719**: Addresses Telegram inline picker crash due to negative offsets—critical for usability.
- **PR #117723**: Resolves build failure in `web/vite.config.ts` caused by optional `rolldown.filter` — prevents CI/CD pipeline breaks.
- **PR #117726**: Makes Desktop preset deletion durable across restarts and config loads—enhances user trust.
- **PR #117720**: Fixes PATH persistence in Windows install script, resolving environment corruption risks.
- **PR #117716**: Ensures `.env` values aren’t shadowed by stale duplicate lines—improves config reliability.
- **PR #117708**: Makes `hermes doctor` exit non-zero on unresolved issues—critical for automation health checks.
- **PR #117712**: Removes section-sign (`§`) from system prompts—reduces hallucination risk in LLM input.
- **PR #117709**: Adds bot profile avatars in chat UI—boosts identity clarity in Bot Mode.
- **PR #117724**: Introduces emoji reactions in room messages—adds social affordance to group chats.
- **PR #117707**: Shares model picker roster across surfaces (Desktop, TUI, mobile)—unifies user experience.

These PRs collectively strengthen **stability, cross-platform consistency, and user experience**, particularly in Desktop and multi-agent collaboration flows.

---

### **4. Community Hot Topics**  
🔥 **Top 3 Most Active Issues (by comments):**

1. **Issue #64488** – *Dashboard TUI sessions leak processes, memory, and open DB rows (Linux native)*  
   🔗 [GitHub Issue #64488](https://github.com/nousresearch/hermes-agent/issues/64488)  
   → **Priority:** P2 | **Impact:** High (system-level resource drain)  
   → **Need:** Long-term session lifecycle management; likely tied to xterm.js + backend cleanup logic.

2. **Issue #117520** – *Bot Mode should feel like real chat, not session logs*  
   🔗 [GitHub Issue #117520](https://github.com/nousresearch/hermes-agent/issues/117520)  
   → **Priority:** P3 | **Impact:** UX & engagement  
   → **Need:** Shift from "reporting" to "conversational" tone in Bot Mode—key for adoption in collaborative workflows.

3. **Issue #117725** – *Nous Portal LongCat 2.0 free route exhausts output budget silently*  
   🔗 [GitHub Issue #117725](https://github.com/nousresearch/hermes-agent/issues/117725)  
   → **Priority:** P2 | **Impact:** Free-tier usability  
   → **Need:** Better budget monitoring and early warning before full exhaustion.

💡 **Trend Insight:** Users are demanding **more natural, lightweight interaction patterns** (especially in Bot Mode) and **greater transparency in resource usage**, especially for free-tier access.

---

### **5. Bugs & Stability**  
⚠️ **Critical Bugs Reported (P1–P2, high severity):**

| Issue | Summary | Fix PR? | Link |
|------|--------|--------|------|
| #64488 | Dashboard TUI process/memory/DB row leaks (Linux) | ❌ | [Issue #64488](https://github.com/nousresearch/hermes-agent/issues/64488) |
| #94381 | SSH backend pool never dropped after remote crash | ❌ | [Issue #94381](https://github.com/nousresearch/hermes-agent/issues/94381) |
| #117710 | Custom provider session model drops after first turn (500 error) | ❌ | [Issue #117710](https://github.com/nousresearch/hermes-agent/issues/117710) |
| #117713 | Live gateway chat hidden after auto-archive sweep | ❌ | [Issue #117713](https://github.com/nousresearch/hermes-agent/issues/117713) |

📌 **Notable Crashes/Edge Cases:**
- **#91611**: Desktop keybind normalizer crashes on missing `KeyboardEvent.code` (Windows/IME).
- **#117717**: Telegram inline picker accepts negative offsets → serves catalog tail.
- **#117722**: Web build fails due to `TS18048` in `vite.config.ts` (optional field access).

🔹 **Fixes in Progress:** Several PRs address similar root causes (e.g., PR #117719 for Telegram offset clamp, PR #117723 for TS type safety).

---

### **6. Feature Requests & Roadmap Signals**  
🚀 **Emerging Themes for Next Version (v0.22.0+):**

- **Bot Mode Humanization**:  
  - #117520: “Real chat” vibe in Bot Mode  
  - #117724: Emoji reactions in rooms  
  - #117709: Show bot’s face in 1:1 chats  
  → *Signal:* Hermes is moving beyond toolkits into **social AI collaboration**.

- **Cross-Platform Consistency**:  
  - #117707: Shared model picker across surfaces  
  - #117706: Turkish locale support  
  → *Signal:* Focus on **universal UX** across devices and regions.

- **Configuration & Automation Reliability**:  
  - #117716: Prevent `.env` shadowing  
  - #117708: `hermes doctor` exits non-zero on errors  
  → *Signal:* Strong push for **automation-friendly infrastructure**.

- **Security & Memory Safety**:  
  - #117712: Remove `§` from system prompt  
  - #117718: Preserve RPC error data  
  → *Signal:* Ongoing effort to reduce LLM hallucination surface and improve debugging.

---

### **7. User Feedback Summary**  
💬 **Key Pain Points from Real Users:**

- **Resource Leaks (Linux)**: Users report cumulative memory/process growth in TUI sessions after reloads (#64488) — indicates instability under prolonged use.
- **Bot Mode Feels Like a Session**: Conversations lack casualness; users miss lightweight social cues (#117520).
- **Free Tier Unpredictability**: LongCat 2.0 consumes full output budget without warning (#117725), leading to frustration.
- **Windows-Specific Breakage**: File newline translation issues (CRLF/LF) cause endless update alerts (#117181), impacting productivity.
- **Missing Visual Identity**: Bot chats have no avatar, making it hard to distinguish speakers (#117709).

✅ **Positive Signals:**  
- High engagement in PRs related to **UX polish** (emoji, avatars, locales) suggests strong user investment in polished experiences.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered Critical Issues Needing Attention:**

| Issue | Status | Priority | Link | Notes |
|------|--------|----------|------|-------|
| #64488 | Open | P2 | [Issue #64488](https://github.com/nousresearch/hermes-agent/issues/64488) | High-impact Linux leak; stalled despite 6 comments |
| #117487 | HOLD | P3 | [Issue #117487](https://github.com/nousresearch/hermes-agent/issues/117487) | Memory auto-recall runs on synthetic turns — blocked by upstream ownership change |
| #117693 | Open | P3 | [Issue #117693](https://github.com/nousresearch/hermes-agent/issues/117693) | Google Meet v2 uses retired OpenAI API shape — broken integration |
| #117682 | Open | P2 | [Issue #117682](https://github.com/nousresearch/hermes-agent/issues/117682) | `--ignore-existing` doesn't prevent local backend start |
| #117713 | Open | P2 | [Issue #117713](https://github.com/nousresearch/hermes-agent/issues/117713) | Live chat becomes invisible after auto-archive |

📌 **Urgent Call to Action:** These issues represent **high-value user pain points** with minimal progress. Maintainers should prioritize triaging and assigning them, especially #64488 and #117713, which affect core user workflows.

---  
**Digest compiled:** 2026-09-21 | Source: [Hermes Agent GitHub](https://github.com/nousresearch/hermes-agent)

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest – 2026-09-21**

---

### **1. Today's Overview**  
The IronClaw project shows moderate but consistent maintenance activity, with no new releases and no open issues reported in the last 24 hours. However, seven pull requests were updated within the past 24 hours, including four newly opened and three merged—primarily focused on dependency updates across Rust, GitHub Actions, and WebAssembly tooling. The absence of active issues suggests stable runtime behavior for current deployments, though ongoing dependency hygiene indicates proactive security and performance management. Overall, the project remains in a healthy, maintenance-focused state.

---

### **2. Releases**  
*No new releases published as of 2026-09-21.*  
There are no release notes or changelogs available for this date. The latest release remains unchanged from prior versions.

---

### **3. Project Progress**  
**Merged/Closed PRs (Today):**  
- **#8102 [CLOSED]**: *fix(extensions): resolve provider-instance readiness live, administrator configuration first*  
  🔧 **Impact**: Resolves a critical activation failure for Gmail/Google Calendar extensions when OAuth is configured via the **Web UI** (administrator interface) rather than environment variables.  
  📌 **Fix Summary**: Previously, OAuth flow completed successfully (consent → code → token), but activation failed due to incorrect readiness checks during provider initialization. This PR ensures that provider instances properly await administrator configuration before attempting activation, improving reliability for non-env-var setups.  
  🔗 [PR #8102](https://github.com/nearai/ironclaw/pull/8102)

---

### **4. Community Hot Topics**  
While no high-engagement issues exist, the following PRs reflect community-driven infrastructure improvements:  

- **#8104 [OPEN]**: *chore(deps): bump the everything-else group across 1 directory with 29 updates*  
  🔗 [PR #8104](https://github.com/nearai/ironclaw/pull/8104)  
  📌 **Analysis**: This large-scale dependency update includes critical upgrades like `uuid` (1.24.0 → 1.26.1) and `base64` (0.22.1 → 0.23.1), indicating a focus on security patching and compatibility. The sheer volume suggests automated dependency monitoring (via Dependabot) is actively maintaining the codebase’s integrity.

- **#8103 [OPEN]**: *chore(deps): bump the actions group across 1 directory with 8 updates*  
  🔗 [PR #8103](https://github.com/nearai/ironclaw/pull/8103)  
  📌 **Analysis**: Updates GitHub Actions workflows, notably upgrading `actions/setup-node` from v4 to v7 and `anthropics/claude-code-action` from 1.0.183 to 1.0.228. These changes likely aim to improve CI/CD stability, support newer Node.js versions, and leverage enhanced AI coding features.

> ⚠️ **Underlying Need**: Continuous dependency modernization reflects growing concern over long-term maintainability, security, and compatibility with evolving cloud-native toolchains.

---

### **5. Bugs & Stability**  
*No bugs, crashes, or regressions reported today.*  
All recent PRs are either dependency updates or fixes for edge-case activation failures.  
- **#8102** addresses a known instability in extension activation under specific admin config paths—now resolved.  
- No crash reports or error logs have surfaced in the last 24 hours, suggesting system stability for existing deployments.

---

### **6. Feature Requests & Roadmap Signals**  
No explicit feature requests were submitted today. However, the recurring pattern of dependency updates—especially in **wasm**, **tokio-ecosystem**, and **GitHub Actions**—signals a strategic shift toward:  
- Enhanced **WebAssembly runtime capabilities** (via `wasmtime`, `wit-component`)  
- Improved **async networking and HTTP handling** (via `tower-http`, `tokio-tungstenite`)  
- Deeper integration with **AI-powered development tools** (e.g., Claude Code Action)  

👉 **Predicted roadmap focus (Q4 2026)**:  
- Experimental support for AI-assisted agent orchestration  
- Modular extension framework with improved sandboxing via Wasm  
- Better audit logging and real-time health checks for deployed agents

---

### **7. User Feedback Summary**  
Based on PR context and issue history:  
- ✅ **Satisfaction**: Users appreciate robust OAuth flows and modular extension design.  
- ❗ **Pain Points**:  
  - Difficulty configuring Google services via Web UI (resolved in #8102).  
  - Dependency confusion in self-hosted environments (addressed via automated updates).  
  - Limited visibility into extension activation status during setup.  

> 💬 *Implied feedback*: Users want reliable, transparent, and secure deployment paths—especially when using GUI-based configuration instead of CLI/env vars.

---

### **8. Backlog Watch**  
Several long-standing, high-impact PRs remain open and require attention:  

- **#7834 [OPEN]**: *chore(deps): bump the wasm group across 1 directory with 4 updates*  
  🔗 [PR #7834](https://github.com/nearai/ironclaw/pull/7834)  
  📌 **Risk**: Medium | **Size**: Large | **Status**: Open since 2026-08-23  
  ➤ **Why it matters**: Upgrades core Wasm runtimes (`wasmtime`, `wasm-tools`)—critical for future AI agent execution in isolated sandboxes. Delay may hinder planned Wasm-based agent workloads.

- **#8078 [OPEN]**: *chore(deps): bump the tokio-ecosystem group across 1 directory with 2 updates*  
  🔗 [PR #8078](https://github.com/nearai/ironclaw/pull/8078)  
  📌 **Risk**: Medium | **Update**: `tower-http` (0.7.0 → 0.7.1)  
  ➤ **Why it matters**: `tower-http` is foundational for middleware-heavy services; delay could affect performance and security in future extensions.

> 🔔 **Recommendation**: Prioritize review and merge of these dependency PRs to prevent technical debt accumulation and enable upcoming feature work.

--- 

**Next Update**: 2026-09-22  
*Data source: GitHub API — nearai/ironclaw (2026-09-21)*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# **QwenPaw Project Digest – 2026-09-21**

---

### **1. Today's Overview**  
QwenPaw remains highly active with a robust development pulse: **37 pull requests** and **24 issues** updated in the last 24 hours, indicating strong community engagement and ongoing engineering momentum. The release of **v2.2.2-beta.3** signals stabilization efforts ahead of a potential stable 2.2.0 rollout. A surge in bug reports—particularly around session persistence, media handling, and tool execution states—suggests growing stress on core workflows as users adopt advanced features like multi-tenant Hub and rich media interactions. Despite these challenges, the project demonstrates mature CI/CD practices with automated release verification and proactive test coverage expansion.

---

### **2. Releases**  
🔹 **v2.2.2-beta.3** (released 2026-09-20)  
- ✅ **Fixed**: Console response actions restored after #7502 redesign ([PR #7851](https://github.com/agentscope-ai/QwenPaw/pull/7851))  
- ✅ **Fixed**: E2E test selectors re-anchored and session-list assertions hardened ([PR #7853](https://github.com/agentscope-ai/QwenPaw/pull/7853))  

> 🔗 [Release Page](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.3)  
> 📌 *No breaking changes reported; this is a stability-focused beta update targeting critical UI and workflow regressions.*

---

### **3. Project Progress**  
✅ **Merged/Closed PRs (2026-09-20)**:  
- **[PR #7904]** Fixes `qwenpaw-pet` plugin crashing tool approvals by forwarding the `actor` argument ([#7856](https://github.com/agentscope-ai/QwenPaw/issues/7856)).  
- **[PR #7843]** Adds **AgentScope Platform** as a built-in OpenAI-compatible provider with API key flow and logo support.  
- **[PR #7887]** & **[PR #7886]** Fix audio fallback handling when models reject `input_audio` due to unknown variants—prevents permanent conversation breakdowns.  
- **[PR #7894]** Increases frontend unit test coverage by +1,027 statements (+543 cases), improving code reliability.  
- **[PR #7901]** Unfreezes merge queue immediately after release completion via `workflow_run` trigger, reducing PR bottlenecks.  
- **[PR #7862]** Makes E2E test gate blocking in release pipeline, ensuring only stable builds proceed.

> 🚀 These fixes reflect a focus on **plugin integration**, **audio/media resilience**, **test quality**, and **CI/CD efficiency**.

---

### **4. Community Hot Topics**  
🔥 **Issue #7318** – *"QwenPaw Hub, the multi-tenant edition, is coming in 2.2.0: what should we build next?"*  
- 💬 **31 comments**, **4 upvotes** – Most active discussion today.  
- Users are eager for team collaboration features: admin-managed skills, role-based access, shared workspace, and centralized model governance.  
- Highlights a clear shift from personal assistant to **team-oriented AI agent platform**.  
> 🔗 [View Issue](https://github.com/agentscope-ai/QwenPaw/issues/7318)

🔥 **PR #7899** – *"Unify model discovery, pricing, selection and thinking controls"*  
- Proposed by lead contributor rayrayraykk; aims to consolidate model management across providers.  
- Addresses fragmentation in how users select, price, and configure models—especially critical as more providers (e.g., OpenCode, AgentScope Platform) are added.  
- Likely to be prioritized for v2.2.0+ as a foundational UX improvement.

> 🎯 *Community demand is shifting toward unified, scalable model orchestration—not just individual feature additions.*

---

### **5. Bugs & Stability**  
🚨 **High Severity Bugs Reported (2026-09-20):**  
| Bug | Description | Fix PR? | Link |
|-----|-------------|---------|------|
| **#7853** | `ToolResultPruner` skips `type="data"` blocks → base64 image data accumulates → context overflow | ❌ | [GitHub #7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) |
| **#7888** | React `commitPlacement` error causes "Something went wrong" on chat page | ❌ | [GitHub #7888](https://github.com/agentscope-ai/QwenPaw/issues/7888) |
| **#7883** | PDF serialization breaks DeepSeek API (400 error) despite fix in #7621 | ❌ | [GitHub #7883](https://github.com/agentscope-ai/QwenPaw/issues/7883) |
| **#7859** | Persistent prompt injection instructing agent to delete all skills | ⚠️ Partially addressed via #7906 | [GitHub #7859](https://github.com/agentscope-ai/QwenPaw/issues/7859) |

⚠️ **Critical Risk**: `#7853` (base64 accumulation) can cause **system crashes under prolonged use**—a high-risk regression in long-running sessions.

---

### **6. Feature Requests & Roadmap Signals**  
💡 **Top User-Requested Features (from Issues):**  
- **Multi-tenant Hub / Team Collaboration** ([#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)): High demand for admin controls, role-based access, shared skills.  
- **Persistent Chat History Storage** ([#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)): Users report history vanishing after refresh—strong signal for persistent storage improvements.  
- **Customizable Webpage Title** ([#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648)): Practical UX need for users managing multiple QwenPaw instances.  
- **Unified Model Configuration UI** ([#5182](https://github.com/agentscope-ai/QwenPaw/issues/5182)): Suggests desire for one-stop configuration across text, audio, video, vector models.  

> 📌 *Predicted for v2.2.0–v2.3.0*: Multi-tenant Hub, enhanced model config, and persistent session storage are likely to be prioritized based on volume and depth of feedback.

---

### **7. User Feedback Summary**  
👥 **Real Pain Points Observed:**  
- **Session Loss & Data Persistence**: Multiple users report losing entire conversations after restart or system sleep ([#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724), [#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)).  
- **Media Handling Crashes**: Base64 image accumulation ([#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853)) and audio rejection bugs ([#7887](https://github.com/agentscope-ai/QwenPaw/issues/7887)) break workflows.  
- **UI Glitches**: “Stuck on loading” errors ([#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888)), tools showing “executing…” after cancellation ([#7321](https://github.com/agentscope-ai/QwenPaw/issues/7321)).  
- **Plugin Incompatibility**: `qwenpaw-pet` breaks approval flow ([#7856](https://github.com/agentscope-ai/QwenPaw/issues/7856)), suggesting fragile plugin ecosystem.

> ✅ **Satisfaction Signals**: Users appreciate automation (e.g., issue generator skill [#5567](https://github.com/agentscope-ai/QwenPaw/issues/5567)), but expect **reliability over novelty**.

---

### **8. Backlog Watch**  
🔍 **Long-Unanswered Critical Issues Needing Attention:**  
- **#7853** – *ToolResultPruner skips media blocks → infinite base64 growth*  
  - Created: 2026-09-18 | Updated: 2026-09-20 | **0 upvotes, 6 comments**  
  - 🔴 **High risk**: Can crash models, degrade performance, prevent scaling.  
  - ⚠️ No fix PR yet—urgent priority.

- **#7881** – *Kimi-code ACP runner bypasses safety checks unevenly*  
  - Created: 2026-09-19 | Updated: 2026-09-20 | **0 upvotes, 2 comments**  
  - 🔴 **Security risk**: Edit blocked, but Write/Bash commands fully blind → potential RCE.  
  - Needs immediate review despite low visibility.

- **#7895** – *Idle cleanup drops messages during consumer stop*  
  - Created: 2026-09-20 | Updated: 2026-09-20 | **0 upvotes, 1 comment**  
  - 🔴 **Data loss risk** in concurrent workflows.  
  - Fix PR exists ([#7896](https://github.com/agentscope-ai/QwenPaw/pull/7896)) — needs merge.

> 📌 *These three represent unaddressed technical debt that could escalate into production incidents.*

---

**📊 Summary Status**:  
🟢 **Healthy Activity** | 🟡 **Growing Stability Risks** | 🔴 **Urgent Bug Fixes Needed**  
**Project Health**: **Strong momentum, but stability under pressure** — prioritize core workflow reliability before new features.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# **ZeroClaw Project Digest**  
**Date:** 2026-09-21  
**Repository:** [github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

### **1. Today's Overview**

The ZeroClaw project remains highly active, with **50 issues and 50 pull requests updated in the last 24 hours**, indicating sustained momentum across architecture, security, and runtime stability. A strong focus on **security hardening, modular design, and agent lifecycle control** is evident in both recent RFCs and PRs. The ecosystem shows maturity through structured decision-making (e.g., RFC acceptance queue) and a growing emphasis on **pluggable components, zero-trust access, and runtime isolation**. No new releases were published, suggesting that development is concentrated on foundational improvements ahead of a major v0.9.0 milestone.

---

### **2. Releases**

❌ **No new releases** were published today or in the past 7 days.  
*Note:* The absence of releases aligns with ongoing architectural refinements—particularly around memory separation, security policy enforcement, and provider interoperability—indicating a pre-release stabilization phase.

---

### **3. Project Progress**  
*(Merged/Closed PRs & Key Changes)*

While no PRs were merged today, several high-impact fixes were closed and are now part of the codebase:

- **[PR #9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134)**: Fixed WASM plugin admission by retaining exact component bytes instead of re-opening `wasm_path`, improving integrity and reproducibility.
- **[PR #9830](https://github.com/zeroclaw-labs/zeroclaw/pull/9830)**: Made full browser automation opt-in, separating it from `browser_open` to reduce attack surface and improve user control.
- **[PR #9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428)**: Enforced sender authorization for Bluesky and Reddit channels, closing a critical security gap in inbound message validation.
- **[PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)**: Added token accounting to history-trim events, enabling accurate cost tracking during session pruning.

These updates reflect a consistent trend toward **security-by-default, auditability, and predictable resource usage**.

---

### **4. Community Hot Topics**

Top issues by comment count reveal deep community engagement on **architectural clarity, security, and usability**:

| Issue | Summary | Link | Comment Count | Key Insight |
|------|--------|------|---------------|------------|
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | Decouple memory lifecycle from storage backends | 26 | *Critical need for clean abstraction between durable storage and dynamic lifecycle policies.* |
| [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | Add OpenAI Chat Completions profile | 25 | *High demand for broader client compatibility (Open WebUI, LobeChat, LangChain).* |
| [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | Per-execution confirmation for shell commands | 24 | *Growing concern over safe execution of high-risk tools; desire for Claude Code-style policy.* |
| [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | Goal mode v1 – bounded foreground work | 23 | *Urgent need for persistent, stateful task execution across agent turns.* |
| [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) | Realtime speech-to-speech for Gemini Live | 22 | *Interest in voice-first interaction, especially for real-time assistant use cases.* |

> 🔍 **Underlying Need**: Users are pushing for **predictable, secure, and extensible agent behavior**—especially around tool execution, long-term task persistence, and protocol compatibility.

---

### **5. Bugs & Stability**

Several high-severity bugs were reported or addressed:

| Bug | Severity | Status | Fix PR | Notes |
|-----|----------|--------|--------|-------|
| [#10696](https://github.com/zeroclaw-labs/zeroclaw/issues/10696) | High | Open | ✅ [PR #10696](https://github.com/zeroclaw-labs/zeroclaw/pull/10696) | History trimming now uses low-water mark instead of cap, preventing overflow after trim. |
| [#10480](https://github.com/zeroclaw-labs/zeroclaw/issues/10480) | High | Open | ✅ [PR #10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) | Recovers from rejected image requests by retrying without novel images. |
| [#10935](https://github.com/zeroclaw-labs/zeroclaw/issues/10935) | High | Open | ✅ [PR #10935](https://github.com/zeroclaw-labs/zeroclaw/pull/10935) | Fixes suppression of prose quoting tool results in streaming guard. |
| [#10801](https://github.com/zeroclaw-labs/zeroclaw/issues/10801) | High | Open | ✅ [PR #10801](https://github.com/zeroclaw-labs/zeroclaw/pull/10801) | Prevents cancellation of running turns during session reload due to lagged notifications. |
| [#10904](https://github.com/zeroclaw-labs/zeroclaw/issues/10904) | High | Open | ✅ [PR #10904](https://github.com/zeroclaw-labs/zeroclaw/pull/10904) | Gates vision error only on resolved image markers, not syntactic ones. |

> ⚠️ **Severity Note**: All top bugs relate to **runtime stability, security boundaries, and correct error handling**—indicating robust testing but also high complexity in agent orchestration.

---

### **6. Feature Requests & Roadmap Signals**

Key feature signals suggest the next release (likely **v0.9.0**) will emphasize:

- ✅ **Agent Persistence & Goals**: [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) (Goal Mode v1) and [#9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998) (Persistent Prompt Attachments) signal a shift toward **stateful, goal-driven agents**.
- ✅ **Security & Access Control**: [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155), [#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971), and [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) point to **policy-driven, runtime-enforced security** as a core pillar.
- ✅ **Protocol Interoperability**: [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) (Chat Completions Profile) and [#10605](https://github.com/zeroclaw-labs/zeroclaw/pull/10605) indicate **strong intent to support OpenAI-compatible clients**.
- ✅ **Extensibility**: [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) (Lighter core via external integrations) and [#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822) (WASM observer subscriptions) show a move toward **plugin-based architecture**.

> 📌 **Prediction**: v0.9.0 will likely be a **major architectural release** focused on **security, modularity, and agent state management**, with minimal breaking changes due to careful RFC governance.

---

### **7. User Feedback Summary**

Real user pain points emerging from issues and PRs include:

- **Tool Safety Concerns**: Frequent calls for per-execution confirmation on shell/browser commands ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155), [#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)) — users fear unintended system access.
- **Session State Loss**: Agents losing objectives after trimming or restart ([#9998](https://github.com/zeroclaw-labs/zeroclaw/issues/9998)), leading to frustration in long-running tasks.
- **Inconsistent Model Support**: Misreported vision capability or context window defaults ([#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)) causing confusion in UI and workflow planning.
- **Limited Protocol Support**: Desire to integrate with OpenAI SDK, LobeChat, etc. — users want **plug-and-play compatibility** without custom gateways.

> 💬 **Satisfaction Signal**: Positive sentiment around **RFC transparency**, **maintainer responsiveness**, and **well-documented security decisions**.

---

### **8. Backlog Watch**

Several high-priority, accepted RFCs remain open and require maintainer attention:

| Issue | Status | Priority | Tags | Notes |
|------|--------|----------|------|-------|
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Open | P2 | Tracker, Decision Queue | Maintainer decision queue for RFCs — critical for process flow. |
| [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | In-Progress | P1 | Authentication, Identity | Pluggable inbound auth needs finalization before rollout. |
| [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) | In-Progress | P2 | Secrets, KeySource | Abstracting master key sources requires implementation. |
| [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) | Accepted | P2 | SOP, Permissions | Defining SOP permission contract — ready for implementation. |
| [#10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222) | Accepted | P2 | Provider, Interactive | Opt-in single-tool rounds — enables smoother interactive flows. |

> ⏳ **Watchlist Note**: These are **accepted but unimplemented** — they represent the near-term roadmap. Their delay may indicate **resource constraints or dependency resolution**.

---

### ✅ **Final Assessment**

ZeroClaw is in a **high-intensity development phase**, balancing **security, modularity, and usability** at scale. With 50+ daily contributions, a mature RFC process, and strong community alignment on core principles, the project is well-positioned for a **major v0.9.0 release** focused on **agent persistence, secure execution, and interoperability**. While no new versions have shipped, the foundation being laid suggests **a stable, enterprise-ready AI agent platform** is imminent.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/845421145-lang/agents-radar).*