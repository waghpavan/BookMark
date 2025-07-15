"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "../../hooks/use-auth"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginForm() {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")

    const result = await login(email, password)

    if (!result.success) {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <>
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-semibold text-slate-900">Welcome back</CardTitle>
        <CardDescription className="text-slate-600">Sign in to access your bookmark collection</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="relative group">
              {/* Icon color on focus */}
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-violet-500 transition-colors" />
              {/* Input text color */}
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 h-12 border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 text-slate-900"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative group">
              {/* Icon color on focus */}
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-violet-500 transition-colors" />
              {/* Input text color */}
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10 h-12 border-slate-200 focus:border-violet-500 focus:ring-violet-500/20 text-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          {/* Button color matching new primary */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
    </>
  )
}
