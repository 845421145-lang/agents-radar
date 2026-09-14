import { createHash } from "node:crypto";
import { fetchPhData } from "../ph.ts";
import type { SourceConfig } from "./config.ts";
import { isPhysicalAiLikely } from "./keywords.ts";
import type { ProductSignal, SourceHealth } from "./types.ts";

const now = () => new Date().toISOString();
const id = (value: string) => createHash("sha1").update(value).digest("hex").slice(0, 16);
const clean = (value: string) =>
  value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
const field = (xml: string, name: string) =>
  clean(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"))?.[1] ?? "");

export interface SourceResult {
  signals: ProductSignal[];
  health: SourceHealth;
}

function health(
  source: string,
  enabled: boolean,
  status: SourceHealth["status"],
  fetched: number,
  accepted: number,
  limitation: string | null = null,
  error: string | null = null,
): SourceHealth {
  return {
    source,
    enabled,
    status,
    fetched_count: fetched,
    accepted_count: accepted,
    limitation,
    error,
    checked_at: now(),
  };
}

function signal(
  source: string,
  sourceUrl: string,
  title: string,
  description: string | null,
  publishedAt: string | null,
  extras: Partial<ProductSignal> = {},
): ProductSignal {
  const observed = now();
  return {
    id: id(`${source}:${sourceUrl}:${title}`),
    source,
    source_url: sourceUrl,
    title: clean(title),
    description: description ? clean(description) : null,
    published_at: publishedAt,
    observed_at: observed,
    company: extras.company ?? null,
    price: extras.price ?? null,
    traction_signal: extras.traction_signal ?? null,
    raw_category: extras.raw_category ?? null,
    evidence: [
      {
        source,
        url: sourceUrl,
        title: clean(title),
        published_at: publishedAt,
        observed_at: observed,
        excerpt: description ? clean(description).slice(0, 500) : null,
        fact_status: "FACT",
      },
    ],
  };
}

async function fetchGoogleNews(config: SourceConfig): Promise<SourceResult> {
  const source = "google_news";
  const queries = config.queries ?? [];
  try {
    const feeds = await Promise.all(
      queries.map(async (query) => {
        const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
        const response = await fetch(url, { headers: { "User-Agent": "OOMWOO-Physical-AI-Radar/1.0" } });
        if (!response.ok) throw new Error(`HTTP ${response.status} for query ${query}`);
        const xml = await response.text();
        return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((m) => {
          const item = m[1] ?? "";
          return signal(
            source,
            field(item, "link"),
            field(item, "title"),
            field(item, "description") || null,
            field(item, "pubDate") || null,
            { raw_category: query },
          );
        });
      }),
    );
    const raw = feeds.flat().filter((s) => s.source_url && s.title);
    const unique = [...new Map(raw.map((s) => [s.source_url, s])).values()];
    const accepted = unique.filter(isPhysicalAiLikely);
    return {
      signals: unique,
      health: health(
        source,
        true,
        accepted.length ? "ok" : "empty",
        unique.length,
        accepted.length,
        "Google News RSS is a public feed without an SLA; it is headline-level discovery, not sales data.",
      ),
    };
  } catch (error) {
    return {
      signals: [],
      health: health(
        source,
        true,
        "failed",
        0,
        0,
        "Google News RSS is public but not a sales or marketplace dataset.",
        String(error),
      ),
    };
  }
}

async function fetchIndiegogo(): Promise<SourceResult> {
  const source = "indiegogo";
  const url = "https://api.indiegogo.com/api/public/projects/getActiveCrowdfundingProjects";
  try {
    const response = await fetch(url, { headers: { "User-Agent": "OOMWOO-Physical-AI-Radar/1.0" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rows = (await response.json()) as Array<Record<string, unknown>>;
    const raw = (Array.isArray(rows) ? rows : [])
      .map((row) =>
        signal(
          source,
          String(row.projectHomeUrl ?? ""),
          String(row.projectName ?? ""),
          String(row.shortDescription ?? "") || null,
          typeof row.campaignStartDate === "string" ? row.campaignStartDate : null,
          {
            company: typeof row.creatorName === "string" ? row.creatorName : null,
            price:
              typeof row.fundsGathered === "number" && typeof row.currencyShortName === "string"
                ? `${row.currencyShortName} ${row.fundsGathered} raised (campaign total, not price)`
                : null,
            traction_signal:
              typeof row.backerCount === "number"
                ? `${row.backerCount} backers; ${row.commentCount ?? 0} comments`
                : null,
            raw_category: "crowdfunding",
          },
        ),
      )
      .filter((s) => s.source_url && s.title);
    const accepted = raw.filter(isPhysicalAiLikely);
    return {
      signals: raw,
      health: health(
        source,
        true,
        accepted.length ? "ok" : "empty",
        raw.length,
        accepted.length,
        "Official Indiegogo public project endpoint; funding totals are traction evidence, never product price or profit.",
      ),
    };
  } catch (error) {
    return {
      signals: [],
      health: health(
        source,
        true,
        "failed",
        0,
        0,
        "Official endpoint availability may vary by region and platform policy.",
        String(error),
      ),
    };
  }
}

async function fetchCrowdSupply(): Promise<SourceResult> {
  const source = "crowd_supply";
  const url = "https://www.crowdsupply.com/browse?sort=latest";
  try {
    const response = await fetch(url, { headers: { "User-Agent": "OOMWOO-Physical-AI-Radar/1.0" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const matches = [...html.matchAll(/href="(\/[^"?#]+\/[^"?#]+)"[^>]*>([\s\S]{1,300}?)<\/a>/gi)];
    const raw = matches
      .map((m) =>
        signal(source, `https://www.crowdsupply.com${m[1]}`, clean(m[2] ?? ""), null, null, {
          raw_category: "hardware crowdfunding",
        }),
      )
      .filter((s) => s.title.length > 2 && !/browse|newsletter|login|project/i.test(s.title));
    const unique = [...new Map(raw.map((s) => [s.source_url, s])).values()].slice(0, 100);
    const accepted = unique.filter(isPhysicalAiLikely);
    return {
      signals: unique,
      health: health(
        source,
        true,
        accepted.length ? "ok" : "empty",
        unique.length,
        accepted.length,
        "Public catalog page, parsed conservatively. No claim of complete Crowd Supply coverage.",
      ),
    };
  } catch (error) {
    return {
      signals: [],
      health: health(
        source,
        true,
        "failed",
        0,
        0,
        "Public catalog page; adapter is intentionally limited and must not be treated as a complete marketplace API.",
        String(error),
      ),
    };
  }
}

async function fetchHackerNews(): Promise<SourceResult> {
  const source = "hacker_news";
  try {
    const top = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then(
      (r) => r.json() as Promise<number[]>,
    );
    const rows = await Promise.all(
      top
        .slice(0, 180)
        .map(async (storyId) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then(
            (r) => r.json() as Promise<Record<string, unknown> | null>,
          ),
        ),
    );
    const raw = rows
      .filter((row): row is Record<string, unknown> => Boolean(row?.title))
      .map((row) =>
        signal(
          source,
          String(row.url ?? `https://news.ycombinator.com/item?id=${row.id}`),
          String(row.title),
          null,
          typeof row.time === "number" ? new Date(row.time * 1000).toISOString() : null,
          {
            traction_signal: `${row.score ?? 0} HN points; ${row.descendants ?? 0} comments`,
            raw_category: "community discussion",
          },
        ),
      );
    const accepted = raw.filter(isPhysicalAiLikely).slice(0, 30);
    return {
      signals: raw,
      health: health(
        source,
        true,
        accepted.length ? "ok" : "empty",
        raw.length,
        accepted.length,
        "Official HN API. Community attention is auxiliary evidence only, not demand proof.",
      ),
    };
  } catch (error) {
    return { signals: [], health: health(source, true, "failed", 0, 0, "Official HN API.", String(error)) };
  }
}

async function fetchProductHunt(): Promise<SourceResult> {
  const source = "product_hunt";
  if (!process.env["PRODUCTHUNT_TOKEN"])
    return {
      signals: [],
      health: health(
        source,
        true,
        "unconfigured",
        0,
        0,
        "PRODUCTHUNT_TOKEN is not configured; no Product Hunt coverage was claimed.",
      ),
    };
  const data = await fetchPhData();
  const raw = data.products.map((p) =>
    signal(source, p.website || p.url, p.name, p.tagline, p.createdAt, {
      traction_signal: `${p.votesCount} votes; ${p.commentsCount} comments`,
      raw_category: p.topics.join(", "),
    }),
  );
  const accepted = raw.filter(isPhysicalAiLikely);
  return {
    signals: raw,
    health: health(
      source,
      true,
      data.fetchSuccess ? (accepted.length ? "ok" : "empty") : "failed",
      raw.length,
      accepted.length,
      "Official Product Hunt API; only potential physical AI products pass the deterministic gate.",
    ),
  };
}

export async function fetchEnabledSources(configs: Record<string, SourceConfig>): Promise<SourceResult[]> {
  const disabled = Object.entries(configs)
    .filter(([, c]) => !c.enabled)
    .map(([source, c]) =>
      Promise.resolve({
        signals: [],
        health: health(source, false, "disabled", 0, 0, c.limitation ?? "Disabled by configuration."),
      }),
    );
  const enabled = Object.entries(configs)
    .filter(([, c]) => c.enabled)
    .map(([name, config]) => {
      if (name === "google_news") return fetchGoogleNews(config);
      if (name === "indiegogo") return fetchIndiegogo();
      if (name === "crowd_supply") return fetchCrowdSupply();
      if (name === "hacker_news") return fetchHackerNews();
      if (name === "product_hunt") return fetchProductHunt();
      return Promise.resolve({
        signals: [],
        health: health(name, true, "disabled", 0, 0, "No adapter is implemented for this source in V1."),
      });
    });
  return Promise.all([...enabled, ...disabled]);
}
