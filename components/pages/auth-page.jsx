"use client"
import AuthTabs from "../auth/auth-tabs"
import AuthHeader from "../auth/auth-header"
import AuthBackground from "../auth/auth-background"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 flex items-center justify-center p-4 relative overflow-hidden">
      <AuthBackground />
      <div className="w-full max-w-md relative z-10">
        <AuthHeader />
        <AuthTabs />
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">Secure • Private • Always Free</p>
        </div>
      </div>
    </div>
  )
}
