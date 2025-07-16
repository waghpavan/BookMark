/**
 * Route Handler: /api/bff/<*path>
 *
 * Proxies every request to your real backend to avoid CORS issues.
 * Docs: https://nextjs.org/docs/app/guides/backend-for-frontend
 */

import { NextRequest, NextResponse } from 'next/server';

const handler = async (
  request: Request,
  { params }: { params: { path: string[] } }
): Promise<Response> => {
  const backend = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

  if (!backend) {
    return new Response("NEXT_PUBLIC_API_URL env var not set", { status: 502 });
  }

  // Build full target URL: <BACKEND_URL>/<path>?<query>
  const fullPath = params.path.join('/');
  const url = new URL(`${backend}/${fullPath}`);
  const originalUrl = new URL(request.url);
  url.search = originalUrl.search; // Forward query params

  // Forward the request
  const forwardRes = await fetch(url.toString(), {
    method: request.method,
    headers: request.headers,
    body:
      request.method === 'GET' || request.method === 'HEAD'
        ? undefined
        : request.body,
  });

  // Copy response headers
  const headers = new Headers(forwardRes.headers);
  return new Response(forwardRes.body, {
    status: forwardRes.status,
    headers,
  });
};

// ✅ Export supported HTTP methods
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
