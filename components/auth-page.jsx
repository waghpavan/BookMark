"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "../context/auth-context"
import { Bookmark, Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react"

export default function AuthPage() {
  const { login, register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleLogin = async (e) => {
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

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    const result = await register(email, password)

    if (result.success) {
      setSuccess("Account created successfully! Please login.")
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <Bookmark className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
            BookmarkHub
          </h1>
          <p className="text-slate-600 text-lg">Your personal link sanctuary</p>
        </div>

        {/* Auth Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-blue-500/10">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100/50">
              <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-semibold text-slate-900">Welcome back</CardTitle>
                <CardDescription className="text-slate-600">Sign in to access your bookmark collection</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
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
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
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
            </TabsContent>

            <TabsContent value="register">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-semibold text-slate-900">Create account</CardTitle>
                <CardDescription className="text-slate-600">
                  Join thousands organizing their digital life
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-700">{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert className="border-green-200 bg-green-50">
                      <AlertDescription className="text-green-700">{success}</AlertDescription>
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">Secure • Private • Always Free</p>
        </div>
      </div>
    </div>
  )
}
