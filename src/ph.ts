/**
 * Product Hunt AI products fetched via the GraphQL API.
 *
 * Strategy: fetch yesterday's top products (which have accumulated votes),
 * then keep the hardware / Physical AI discovery surface. The final Physical
 * AI gate lives in src/physical-ai and rejects SaaS, API and agent products.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PhProduct {
  id: string;
  name: string;
  tagline: string;
  url: string; // Product Hunt URL
  website: string; // external website
  votesCount: number;
  commentsCount: number;
  createdAt: string;
  topics: string[];
}

export interface PhData {
  products: PhProduct[];
  fetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PH_TOP_PRODUCTS = 30;
const PH_FETCH_COUNT = 20; // PH API complexity limit caps this at ~20
const API_URL = "https://api.producthunt.com/v2/api/graphql";

/** Physical-AI discovery topic slugs — final classification happens downstream. */
const PHYSICAL_AI_TOPIC_SLUGS = new Set([
  "artificial-intelligence",
  "machine-learning",
  "ai",
  "chatgpt",
  "llm",
  "hardware",
  "internet-of-things",
  "iot",
  "wearables",
  "robotics",
  "consumer-electronics",
  "electronics",
  "smart-home",
]);

// ---------------------------------------------------------------------------
// GraphQL
// ---------------------------------------------------------------------------

const POSTS_QUERY = `
  query GetPosts($first: Int!, $postedAfter: DateTime, $postedBefore: DateTime) {
    posts(first: $first, postedAfter: $postedAfter, postedBefore: $postedBefore, order: VOTES) {
      edges {
        node {
          id
          name
          tagline
          url
          website
          votesCount
          commentsCount
          createdAt
          topics {
            edges {
              node {
                slug
                name
              }
            }
          }
        }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Response type
// ---------------------------------------------------------------------------

interface PhNode {
  id: string;
  name: string;
  tagline: string;
  url: string;
  website: string;
  votesCount: number;
  commentsCount: number;
  createdAt: string;
  topics?: { edges?: Array<{ node: { slug: string; name: string } }> };
}

interface PhResponse {
  data?: { posts?: { edges?: Array<{ node: PhNode }> } };
  errors?: Array<{ message: string }>;
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export async function fetchPhData(): Promise<PhData> {
  const token = process.env["PRODUCTHUNT_TOKEN"] ?? "";
  if (!token) {
    console.log("  [ph] PRODUCTHUNT_TOKEN not set — skipping.");
    return { products: [], fetchSuccess: false };
  }

  // Fetch yesterday's products (they've had a full day to accumulate votes)
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": "agents-radar/1.0",
      },
      body: JSON.stringify({
        query: POSTS_QUERY,
        variables: {
          first: PH_FETCH_COUNT,
          postedAfter: twoDaysAgo.toISOString(),
          postedBefore: yesterday.toISOString(),
        },
      }),
    });

    if (!resp.ok) {
      console.error(`  [ph] HTTP ${resp.status}`);
      return { products: [], fetchSuccess: false };
    }

    const json = (await resp.json()) as PhResponse;

    if (json.errors?.length) {
      console.error(`  [ph] API errors: ${json.errors.map((e) => e.message).join("; ")}`);
      return { products: [], fetchSuccess: false };
    }

    const allProducts: PhProduct[] = [];
    for (const edge of json.data?.posts?.edges ?? []) {
      const node = edge.node;
      const topicSlugs = node.topics?.edges?.map((e) => e.node.slug) ?? [];
      const topicNames = node.topics?.edges?.map((e) => e.node.name) ?? [];

      // Do not use Product Hunt's broad software taxonomy as the final decision.
      // This is only a cheap discovery gate for possible Physical AI products.
      const isPhysicalDiscovery = topicSlugs.some((slug) => PHYSICAL_AI_TOPIC_SLUGS.has(slug));
      if (!isPhysicalDiscovery) continue;

      allProducts.push({
        id: node.id,
        name: node.name,
        tagline: node.tagline,
        url: node.url,
        website: node.website || node.url,
        votesCount: node.votesCount,
        commentsCount: node.commentsCount,
        createdAt: node.createdAt,
        topics: topicNames,
      });
    }

    const products = allProducts.sort((a, b) => b.votesCount - a.votesCount).slice(0, PH_TOP_PRODUCTS);

    console.log(
      `  [ph] ${products.length} physical-AI discovery products (from ${json.data?.posts?.edges?.length ?? 0} total)`,
    );
    return { products, fetchSuccess: products.length > 0 };
  } catch (err) {
    console.error(`  [ph] fetch failed: ${err}`);
    return { products: [], fetchSuccess: false };
  }
}
