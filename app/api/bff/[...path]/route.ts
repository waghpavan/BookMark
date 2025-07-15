/**
 * Route Handler: /api/bff/<*path>
 *
 * Proxies every request to your real backend to avoid CORS issues.
 * Docs: https://nextjs.org/docs/app/guides/backend-for-frontend                [^1]
 */
export async function handler(request: Request, { params }: { params: { path: string[] } }) {
  const backend = process.env.BACKEND_URL?.replace(/\/+$/, "")
  if (!backend) {
    return new Response("BACKEND_URL env var not set", { status: 500 })
  }

  // Build full target URL:  <BACKEND_URL>/<path>?<query>
  const targetUrl = `${backend}/${params.path.join("/")}${request.url.split("?")[1] ? "?" + request.url.split("?")[1] : ""}`

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
