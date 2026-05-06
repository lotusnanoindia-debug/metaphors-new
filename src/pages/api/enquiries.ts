import type { APIRoute } from "astro";
// @ts-ignore - Valid in Cloudflare context
import { env } from "cloudflare:workers";

export const prerender = false;

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://metaphors-new.sanity.studio",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
};

export const GET: APIRoute = async ({ request }) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://metaphors-new.sanity.studio",
    "Content-Type": "application/json",
  };

  try {
    // 1. SECURITY CHECK
    const authHeader = request.headers.get("Authorization");
    const studioSecret = (env as any).STUDIO_LEADS_SECRET || import.meta.env.STUDIO_LEADS_SECRET;

    if (!studioSecret || authHeader !== `Bearer ${studioSecret}`) {
      return new Response(JSON.stringify({ error: "Unauthorized access" }), { 
        status: 401,
        headers: corsHeaders
      });
    }

    // 2. ACCESS D1
    const cloudflareEnv = typeof env !== "undefined" ? env : {};
    const db = (cloudflareEnv as any).DB;

    if (!db) {
      return new Response(JSON.stringify({ error: "Database connection unavailable" }), {
        status: 500,
        headers: corsHeaders
      });
    }

    // 3. FETCH ENQUIRIES (Ordered by newest first)
    const { results } = await db
      .prepare("SELECT * FROM enquiries ORDER BY created_at DESC")
      .all();

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (err: any) {
    console.error("Leads API Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: corsHeaders
    });
  }
};
