"use client"
import { createContext, useState, useEffect } from "react"
import { authService } from "../services/auth-service"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        authService.setToken(token)
        setUser({ token })
      }
    } catch (error) {
      console.error("Auth initialization failed:", error)
      authService.clearToken()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)
      setUser({ token: response.token })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (email, password) => {
    try {
      await authService.register(email, password)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    authService.clearToken()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
