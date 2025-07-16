/**
 * Route Handler: /api/bff/<*path>
 *
 * Proxies every request to your real backend to avoid CORS issues.
 * Docs: https://nextjs.org/docs/app/guides/backend-for-frontend                [^1]
 */
export async function handler(request: Request, { params }: { params: { path: string[] } }) {
  // Access environment variable (ensure NEXT_PUBLIC_API_URL is defined in .env file)
  const backend = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  console.log(backend);
  if (!backend) {
    return new Response("NEXT_PUBLIC_API_URL env var not set", { status: 502 });
  }

  // Build full target URL:  <BACKEND_URL>/<path>?<query>
  const targetUrl = backend;

  // Forward the request (method, headers, body)
  const forwardRes = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    // NOTE: do NOT set `mode` here – this is a server-side fetch
  })

  // Stream the response back to the browser
  const headers = new Headers(forwardRes.headers)
  return new Response(forwardRes.body, { status: forwardRes.status, headers })
}

// Next.js requires named exports for each verb you want to support
export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
