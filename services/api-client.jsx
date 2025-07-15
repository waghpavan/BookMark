"use client"

import { toast } from "@/hooks/use-toast"

function buildUrl(endpoint) {
  const ep = endpoint.replace(/^\/+/, "") // strip leading /
  return `/api/bff/${ep}` // ← hit the proxy, not the real origin
}

async function safeReadJson(res) {
  try {
    return await res.clone().json()
  } catch {
    return {}
  }
}

class ApiClient {
  token = null

  setToken(t) {
    this.token = t
    localStorage.setItem("token", t)
  }
  clearToken() {
    this.token = null
    localStorage.removeItem("token")
  }

  async request(endpoint, { method = "GET", body, headers = {}, ...rest } = {}) {
    const url = buildUrl(endpoint)

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(this.token && { Authorization: `Bearer ${this.token}` }),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
        ...rest,
      })

      if (!res.ok) {
        const errJson = await safeReadJson(res)
        throw new Error(errJson?.message || `HTTP ${res.status} ${res.statusText}`)
      }

      return res.headers.get("content-type")?.includes("application/json") ? res.json() : res
    } catch (err) {
      toast({
        variant: "destructive",
        title: "API error",
        description: err.message.includes("Failed to fetch")
          ? "Cannot reach the server. Check backend URL or network."
          : err.message,
      })
      throw err
    }
  }

  get(e) {
    return this.request(e)
  }
  post(e, b) {
    return this.request(e, { method: "POST", body: b })
  }
  put(e, b) {
    return this.request(e, { method: "PUT", body: b })
  }
  delete(e) {
    return this.request(e, { method: "DELETE" })
  }
  patch(e, b) {
    return this.request(e, { method: "PATCH", body: b })
  }
}

export const apiClient = new ApiClient()
