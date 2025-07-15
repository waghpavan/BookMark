import { apiClient } from "./api-client"

class AuthService {
  setToken(token) {
    apiClient.setToken(token)
    localStorage.setItem("token", token)
  }

  clearToken() {
    apiClient.clearToken()
    localStorage.removeItem("token")
  }

  async login(email, password) {
    const response = await apiClient.post("/auth/login", { email, password })
    this.setToken(response.token)
    return response
  }

  async register(email, password) {
    return await apiClient.post("/auth/register", { email, password })
  }

  async logout() {
    this.clearToken()
  }
}

export const authService = new AuthService()
