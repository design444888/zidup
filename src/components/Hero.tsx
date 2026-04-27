"use client"

import { Button } from "@/components/ui/Button"
import { GlassCard } from "@/components/ui/GlassCard"
import { 
  TrendingUp, 
  Sparkles, 
  CalendarDays, 
  BarChart3, 
  Megaphone, 
  MessageCircle,
  ArrowRight,
  Play
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left side: Content */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Smarter Social Growth</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-xl mb-8"
          >
            Grow your pages <span className="text-primary italic">smarter.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="subheading mb-12 mx-auto lg:mx-0"
          >
            Zidup helps small businesses create better content, plan posts, and prepare campaigns that actually work. No bots, no fakes—just real results.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
          >
            <Link href="/register">
              <Button size="xl" className="group shadow-2xl shadow-primary/30 rounded-[2rem]">
                Start for Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="group rounded-[2rem] glass">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary transition-colors">
                 <Play className="w-3 h-3 text-primary group-hover:text-white fill-current ml-0.5" />
              </div>
              See Demo
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-40 grayscale"
          >
             <span className="font-black text-xs uppercase tracking-tighter">Trusted by 2000+ Businesses in Morocco</span>
          </motion.div>
        </div>

        {/* Right side: Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
          
          <GlassCard className="p-0 border-white/5 shadow-2xl rounded-[3rem] overflow-hidden bg-background/50 scale-105 lg:scale-110">
            <div className="bg-muted/30 p-4 border-b border-border flex items-center justify-between">
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
               </div>
               <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Zidup Preview</div>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-[2rem] glass border-white/5 bg-primary/5">
                  <div className="flex justify-between items-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase">Growth</span>
                  </div>
                  <div className="text-4xl font-black tracking-tighter">78<span className="text-sm opacity-30">/100</span></div>
                  <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-2">Growth Score</p>
                </div>
                
                <div className="p-6 rounded-[2rem] glass border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <CalendarDays className="w-6 h-6 text-secondary" />
                    <span className="text-[10px] font-black text-secondary uppercase">Plan</span>
                  </div>
                  <div className="text-4xl font-black tracking-tighter">5</div>
                  <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-2">Scheduled</p>
                </div>
              </div>

              <div className="p-6 rounded-[2.5rem] glass border-white/5 bg-secondary/5 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black tracking-tight leading-none mb-1 uppercase">Campaign Draft</p>
                      <p className="text-[10px] font-bold opacity-50 uppercase">Objective: Messages</p>
                    </div>
                  </div>
                  <span className="bg-background/80 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">150 MAD</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Est. Reach</span>
                    <span className="text-xs font-black">6K - 9K</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-2/3" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 glass border-white/5 rounded-2xl">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                       <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-tight">Best time to post:</p>
                 </div>
                 <div className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-primary/20">
                    7:00 PM
                 </div>
              </div>
            </div>
          </GlassCard>
          
          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 glass p-5 rounded-3xl border-white/5 shadow-2xl hidden md:block"
          >
             <MessageCircle className="w-8 h-8 text-primary" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass p-5 rounded-3xl border-white/5 shadow-2xl hidden md:block"
          >
             <BarChart3 className="w-8 h-8 text-secondary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
