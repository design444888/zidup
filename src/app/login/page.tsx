"use client"

import { AuthLayout } from "@/components/layout/AuthLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { authService } from "@/services/authService"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    setTimeout(() => {
      const user = authService.loginUser(email, password)
      if (user) {
        router.push("/dashboard")
      } else {
        setError("Invalid email or password. Try demo@zidup.com")
        setIsLoading(false)
      }
    }, 1200)
  }

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to continue your growth journey and access your smart content tools."
    >
      <GlassCard className="p-10 border-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[3rem]">
        <form className="space-y-8" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-black text-center uppercase tracking-widest">
               {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Email address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                required
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-muted/50 border border-border rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Password</label>
              <Link href="/forgot-password" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                required
                type={showPass ? "text" : "password"} 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-muted/50 border border-border rounded-2xl pl-14 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                 {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-1">
             <input type="checkbox" id="remember" className="w-4 h-4 rounded-md border-border accent-primary cursor-pointer" />
             <label htmlFor="remember" className="text-xs font-bold opacity-60 cursor-pointer select-none">Remember me for 30 days</label>
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 font-black text-lg gap-3 shadow-2xl shadow-primary/20 rounded-2xl group"
            isLoading={isLoading}
          >
            Login to Zidup
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="mt-12 text-center">
           <p className="text-sm font-bold text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-black uppercase tracking-widest hover:underline ml-1">
                 Create account
              </Link>
           </p>
        </div>
      </GlassCard>
    </AuthLayout>
  )
}
