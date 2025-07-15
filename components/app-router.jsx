"use client"
import { useAuth } from "../hooks/use-auth"
import AuthPage from "./pages/auth-page" // Corrected path
import DashboardPage from "./pages/dashboard-page" // Corrected path
import LoadingSpinner from "./ui/loading-spinner"

export default function AppRouter() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading your bookmarks..." />
  }

  return user ? <DashboardPage /> : <AuthPage />
}
