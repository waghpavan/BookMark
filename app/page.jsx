"use client"
import { AuthProvider } from "../providers/auth-provider"
import { BookmarkProvider } from "../providers/bookmark-provider"
import AppRouter from "../components/app-router" // This is correct as app-router is in components/

export default function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <AppRouter />
      </BookmarkProvider>
    </AuthProvider>
  )
}
