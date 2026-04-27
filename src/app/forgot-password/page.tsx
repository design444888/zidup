"use client"

import { AuthLayout } from "@/components/layout/AuthLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsSent(true)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <AuthLayout 
      title="Reset password" 
      subtitle="Don't worry, it happens to the best of us. Enter your email and we'll send you a link."
    >
      <GlassCard className="p-10 border-white/5 shadow-2xl rounded-[3rem]">
        {!isSent ? (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 font-black text-lg shadow-2xl shadow-primary/20 rounded-2xl"
              isLoading={isLoading}
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto text-primary shadow-xl shadow-primary/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">Check your inbox</h3>
              <p className="text-sm text-muted-foreground font-medium">We've sent a password reset link to your email address.</p>
            </div>
            <Button variant="outline" className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-[10px]" onClick={() => setIsSent(false)}>
              Try another email
            </Button>
          </div>
        )}

        <div className="mt-12 text-center">
           <Link href="/login" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign in
           </Link>
        </div>
      </GlassCard>
    </AuthLayout>
  )
}
