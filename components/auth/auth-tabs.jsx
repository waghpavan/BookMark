"use client"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

export default function AuthTabs() {
  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-neutral-500/10">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-100/50">
          <TabsTrigger
            value="login"
            className="text-slate-700 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="text-slate-700 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm />
        </TabsContent>

        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
