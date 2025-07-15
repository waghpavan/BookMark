// API service for backend communication
class ApiService {
  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" })
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" })
  }
}

export default new ApiService()
