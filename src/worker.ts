/**
 * Cloudflare Worker — Gemini API proxy (Worker-bolek)
 *
 * Proxies requests to the Google Generative Language API so that the
 * GEMINI_API_KEY secret is never exposed to the browser.
 *
 * Configure the secret via:
 *   wrangler secret put GEMINI_API_KEY --config wrangler.worker.toml
 * or in the Cloudflare Workers dashboard under Settings > Variables.
 *
 * Usage from the frontend:
 *   POST /api/gemini
 *   Body: { model: string, contents: object[], generationConfig?: object }
 */

interface Env {
  GEMINI_API_KEY: string;
}

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY secret is not configured.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      );
    }

    const { model = 'gemini-2.0-flash', ...payload } = body as Record<string, unknown>;

    if (typeof model !== 'string' || !/^[\w.-]+$/.test(model)) {
      return new Response(
        JSON.stringify({ error: 'Invalid model name.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      );
    }

    const upstreamUrl = `${GEMINI_BASE_URL}/models/${model}:generateContent`;

    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': env.GEMINI_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await upstreamResponse.text();

    return new Response(responseBody, {
      status: upstreamResponse.status,
      headers: {
        'Content-Type': upstreamResponse.headers.get('Content-Type') ?? 'application/json',
        ...corsHeaders,
      },
    });
  },
} satisfies ExportedHandler<Env>;
