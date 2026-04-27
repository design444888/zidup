"use client"

import { GlassCard } from "@/components/ui/GlassCard"
import { motion } from "framer-motion"
import { Rocket, Sparkles, CheckCircle2, Zap } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background selection:bg-primary selection:text-primary-foreground">
      <div className="gradient-glow" />
      
      {/* Left side: Brand Message */}
      <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-primary/5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-24">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
              <Rocket className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">Zidup</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h1 className="heading-xl">Grow your brand <span className="text-primary italic">faster than ever.</span></h1>
            <p className="subheading">Professional content, smart ads, and deep analytics designed specifically for small businesses in Morocco.</p>
            
            <div className="space-y-6 pt-10">
              {[
                { text: "AI-Powered Content Creation", icon: Sparkles },
                { text: "One-Click Campaign Builder", icon: Zap },
                { text: "Detailed Growth Analytics", icon: CheckCircle2 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl glass border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-black tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="relative z-10 flex justify-between items-center opacity-30 text-[10px] font-black uppercase tracking-[0.4em]">
          <span>© 2026 Zidup. Morocco</span>
          <span>Terms & Privacy</span>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex flex-col p-8 lg:p-24 justify-center relative overflow-y-auto">
        <div className="absolute top-8 right-8 z-30">
          <ThemeToggle />
        </div>

        <div className="max-w-md w-full mx-auto space-y-12 relative z-10">
          <div className="lg:hidden text-center mb-12">
            <Link href="/" className="flex items-center justify-center gap-3 mb-10">
               <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                  <Rocket className="text-white w-5 h-5" />
               </div>
               <span className="text-2xl font-black tracking-tighter uppercase">Zidup</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-md mb-3 text-center lg:text-left uppercase">{title}</h2>
            <p className="text-muted-foreground font-medium text-center lg:text-left leading-relaxed">{subtitle}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
