# OOMWOO Physical AI Radar V1

`pnpm start` now runs the Physical AI Radar.  The legacy AI ecosystem digest
is still available as `pnpm legacy-digest`, but is no longer the main daily
output.

The production output is intentionally small and decision-oriented:

- `digests/YYYY-MM-DD/physical-ai-radar.md` — Chinese owner report.
- `digests/YYYY-MM-DD/opportunities.json` — `oomwoo.opportunity-candidate.v1`
  handoff for Market Validation Agent.
- `digests/YYYY-MM-DD/source-health.json` — what actually ran and what did not.
- `digests/YYYY-MM-DD/normalized/product-signals.json` — traceable source input.
- `digests/physical-ai-history.json` — first/last seen, days, source count,
  score history, momentum and status.

## Operating rules

- FACT comes from source evidence; INFERENCE is labelled; unknown stays
  UNKNOWN.
- The radar never invents sales, market size, BOM, price, margin or supply
  chain facts.
- `config/manufacturing-profile.yml` is the only source for Manufacturing Fit.
  Unknown capabilities reduce confidence rather than receiving a high score.
- Marketplace adapters that do not have a stable, approved V1 interface stay
  disabled and appear as coverage limitations.

## Configuration

- `config/physical-ai-radar.yml` controls every data-source feature flag,
  classifier batch/cost limits, and score thresholds.
- `config/manufacturing-profile.yml` must be completed by the operating team
  before any candidate is treated as a manufacturing recommendation.

## Data-source scope

V1 uses public Google News RSS, the official Hacker News API, the official
Indiegogo public endpoint when available, Crowd Supply's public catalog page,
and Product Hunt's official API when `PRODUCTHUNT_TOKEN` is configured.
Kickstarter, Amazon, TikTok Shop, TEMU, Shopee and 1688 are explicitly disabled
until an approved stable data interface is selected. They are Market Validation
inputs, not claims of coverage.
