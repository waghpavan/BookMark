"use client"

import { createContext, useContext, useState, useEffect } from "react"
import ApiService from "../services/api-service"

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      ApiService.setToken(token)
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async () => {
    try {
      setUser({ token: localStorage.getItem("token") })
    } catch (error) {
      localStorage.removeItem("token")
      ApiService.setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await ApiService.post("/auth/login", { email, password })
      const { token } = response

      localStorage.setItem("token", token)
      ApiService.setToken(token)
      setUser({ token })

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (email, password) => {
    try {
      await ApiService.post("/auth/register", { email, password })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    ApiService.setToken(null)
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
