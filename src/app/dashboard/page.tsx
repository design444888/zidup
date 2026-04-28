"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { DashboardWidget } from "@/components/ui/Cards"
import { 
  TrendingUp, 
  Sparkles, 
  CalendarDays, 
  Megaphone, 
  PenTool, 
  BarChart3, 
  Clock, 
  Plus,
  ArrowRight,
  Zap,
  Target,
  Lightbulb,
  Languages,
  Settings2
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { storageService } from "@/services/storageService"
import { authService } from "@/services/authService"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useAppState } from "@/components/AppStateProvider"

export default function DashboardPage() {
  const { history } = useAppState()
  const [user, setUser] = useState<any>(null)
  const [business, setBusiness] = useState<any>(null)

  useEffect(() => {
    const savedUser = authService.isAuthenticated()
      ? storageService.getUser()
      : {
          fullName: "Guest User",
          email: "guest@arabeng.app",
          businessName: "ArabEng Workspace",
        }
    const savedBusiness =
      storageService.getBusiness() ?? {
        businessName: "ArabEng Workspace",
      }

    setUser(savedUser)
    setBusiness(savedBusiness)
  }, [])

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="mb-12">
        <h1 className="heading-lg mb-2">My Dashboard</h1>
        <p className="text-muted-foreground font-medium">
          Welcome back, <span className="text-foreground font-black">{user.fullName}</span>. Growth is looking steady for <span className="text-primary font-black">{business?.businessName || "Your Business"}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Growth Score */}
        <GlassCard className="p-8 border-white/5 bg-primary/5 group" glow>
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
             <TrendingUp className="w-16 h-16" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Growth Score</p>
          <div className="flex items-end gap-2 mb-6">
             <span className="text-6xl font-black tracking-tighter">78</span>
             <span className="text-xl font-bold opacity-30 mb-2">/100</span>
          </div>
          <p className="text-xs font-bold leading-relaxed text-muted-foreground">
             Your page has good potential. <span className="text-foreground">Improve consistency and captions.</span>
          </p>
          <Button
            asChild
            variant="glass"
            size="sm"
            className="mt-6 w-full rounded-2xl border-primary/20 bg-primary/10 font-black uppercase tracking-[0.12em] text-primary hover:border-primary/35 hover:bg-primary/16 hover:shadow-[0_18px_36px_-24px_rgba(132,204,22,0.65)] focus-visible:ring-primary/40"
          >
            <Link href="/dashboard/analytics" aria-label="Improve growth score from analytics">
              Improve Score
            </Link>
          </Button>
        </GlassCard>

        {/* Content Plan */}
        <GlassCard className="p-8 border-white/5 hover:border-primary/20 transition-all group">
           <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Content Plan</p>
           <div className="space-y-5">
              {[
                { label: "Generated", value: "12 posts", color: "bg-muted" },
                { label: "Scheduled", value: "5 posts", color: "bg-primary/10 text-primary" },
                { label: "Ideas ready", value: "3 campaign", color: "bg-muted" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                   <span className="text-xs font-bold opacity-50 uppercase tracking-tight">{item.label}</span>
                   <span className={cn("px-3 py-1 rounded-lg font-black text-xs", item.color)}>{item.value}</span>
                </div>
              ))}
           </div>
           <Button
             asChild
             variant="glass"
             size="sm"
             className="mt-6 w-full rounded-2xl border-primary/20 bg-primary/10 font-black uppercase tracking-[0.12em] text-primary hover:border-primary/35 hover:bg-primary/16 hover:shadow-[0_18px_36px_-24px_rgba(132,204,22,0.65)] focus-visible:ring-primary/40"
           >
             <Link href="/dashboard/calendar" aria-label="Open content planner">
               Open Planner
             </Link>
           </Button>
        </GlassCard>

        {/* Campaign Summary */}
        <GlassCard className="p-8 border-white/5 bg-secondary/5 group" glow>
           <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Active Campaign</p>
              <span className="bg-background/80 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">Draft</span>
           </div>
           <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
                 <Target className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-lg font-black tracking-tighter">Messages</p>
                 <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Primary Objective</p>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/40 p-3 rounded-2xl border border-white/5">
                 <p className="text-sm font-black">150 MAD</p>
                 <p className="text-[8px] font-bold opacity-40 uppercase tracking-widest">Budget</p>
              </div>
              <div className="bg-background/40 p-3 rounded-2xl border border-white/5">
                 <p className="text-sm font-black">6K-9K</p>
                 <p className="text-[8px] font-bold opacity-40 uppercase tracking-widest">Reach</p>
              </div>
           </div>
           <Button
             asChild
             variant="glass"
             size="sm"
             className="mt-6 w-full rounded-2xl border-primary/20 bg-primary/10 font-black uppercase tracking-[0.12em] text-primary hover:border-primary/35 hover:bg-primary/16 hover:shadow-[0_18px_36px_-24px_rgba(132,204,22,0.65)] focus-visible:ring-primary/40"
           >
             <Link href="/dashboard/campaigns" aria-label="Edit active campaign">
               Edit Campaign
             </Link>
           </Button>
        </GlassCard>

        {/* Best Time to Post */}
        <GlassCard className="p-8 border-white/5 bg-yellow-500/5">
           <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-8">Best Posting Time</p>
           <div className="space-y-6">
              {[
                { time: "7:00 PM", day: "Today", icon: Clock },
                { time: "12:30 PM", day: "Tomorrow", icon: Clock },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                   <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-sm font-black uppercase tracking-tighter">{item.time}</p>
                      <p className="text-[10px] font-bold opacity-40 uppercase">{item.day}</p>
                   </div>
                </div>
              ))}
           </div>
           <Button
             asChild
             variant="glass"
             size="sm"
             className="mt-6 w-full rounded-2xl border-primary/20 bg-primary/10 font-black uppercase tracking-[0.12em] text-primary hover:border-primary/35 hover:bg-primary/16 hover:shadow-[0_18px_36px_-24px_rgba(132,204,22,0.65)] focus-visible:ring-primary/40"
           >
             <Link href="/dashboard/calendar" aria-label="Schedule a post for the best posting time">
               Schedule Post
             </Link>
           </Button>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
           {/* Quick Actions */}
           <DashboardWidget title="Quick Actions">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-4">
                 {[
                   {
                     label: "Generate Caption",
                     href: "/dashboard/content",
                     icon: PenTool,
                     color: "bg-primary text-primary-foreground shadow-[0_20px_40px_-20px_rgba(132,204,22,0.7)]",
                   },
                   {
                     label: "Create Campaign",
                     href: "/dashboard/campaigns",
                     icon: Megaphone,
                     color: "bg-secondary text-secondary-foreground shadow-[0_20px_40px_-20px_rgba(124,140,255,0.65)]",
                   },
                   {
                     label: "Plan This Week",
                     href: "/dashboard/calendar",
                     icon: CalendarDays,
                     color: "bg-blue-500 text-white shadow-[0_20px_40px_-20px_rgba(59,130,246,0.65)]",
                   },
                   {
                     label: "View Analytics",
                     href: "/dashboard/analytics",
                     icon: BarChart3,
                     color: "bg-orange-500 text-white shadow-[0_20px_40px_-20px_rgba(249,115,22,0.65)]",
                   },
                 ].map((action) => (
                   <Link
                     key={action.href}
                     href={action.href}
                     aria-label={action.label}
                     className="group flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-[2rem] border border-white/6 bg-background/35 px-5 py-6 text-center transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:bg-primary/6 hover:shadow-[0_24px_55px_-28px_rgba(132,204,22,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                   >
                     <div
                       className={cn(
                         "flex h-16 w-16 items-center justify-center rounded-[2rem] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-22px_rgba(132,204,22,0.45)]",
                         action.color,
                       )}
                     >
                       <action.icon className="w-7 h-7" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-primary">
                       {action.label}
                     </span>
                   </Link>
                 ))}
              </div>
           </DashboardWidget>

           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <GlassCard className="p-8 border-white/5 xl:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-3">
                      Translation Workspace
                    </p>
                    <h3 className="text-2xl font-black tracking-tighter mb-3">
                      Ready for your next Arabic or English translation
                    </h3>
                    <p className="text-sm text-muted-foreground leading-7 max-w-2xl">
                      Start a fresh translation, keep your recent results organized, and move
                      between translation, history, and settings from one place.
                    </p>
                  </div>
                  <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-primary/10 text-primary">
                    <Languages className="w-7 h-7" />
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild size="lg" className="rounded-[1.5rem]">
                    <Link href="/translate">Create first translation</Link>
                  </Button>
                </div>
              </GlassCard>

              <GlassCard className="p-8 border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-3">
                  Saved History
                </p>
                <p className="text-4xl font-black tracking-tighter">{history.length}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-7">
                  Stored translations available locally in this browser.
                </p>
                <Button asChild variant="secondary" className="mt-6 rounded-[1.5rem] w-full">
                  <Link href="/history">Open history</Link>
                </Button>
              </GlassCard>
           </div>

           {/* Recent Content Ideas */}
           <DashboardWidget 
              title="Recent Content Ideas" 
              action={<Button variant="ghost" size="sm" className="font-black text-primary uppercase text-[10px] tracking-widest">View All</Button>}
           >
              <div className="space-y-4 pt-2">
                 {[
                   "5 benefits of your service",
                   "Customer testimonial post",
                   "Limited offer post",
                   "Behind the scenes reel",
                   "FAQ post",
                 ].map((idea, i) => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-2xl glass border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                      <div className="flex items-center gap-5">
                         <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(132,204,22,0.5)]" />
                         <span className="text-sm font-black tracking-tight">{idea}</span>
                      </div>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                         <span className="text-[10px] font-black uppercase tracking-widest text-primary">Use Idea</span>
                         <Plus className="w-4 h-4 text-primary" />
                      </div>
                   </div>
                 ))}
              </div>
           </DashboardWidget>
        </div>

        <div className="space-y-10">
           {/* AI Recommendations */}
           <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shadow-lg shadow-primary/10">
                    <Zap className="w-6 h-6 fill-current" />
                 </div>
                 <h2 className="text-2xl font-black tracking-tighter">AI Recommendations</h2>
              </div>
              
              <div className="space-y-4">
                 {[
                   { title: "Add more local keywords", desc: "Targeting your city specifically can increase reach by 25%.", icon: Lightbulb },
                   { title: "Use stronger CTA", desc: "Posts with 'Book Now' perform better for your page type.", icon: Target },
                   { title: "Post 4 times this week", desc: "Consistent posting is the key to organic growth.", icon: CalendarDays },
                   { title: "Try a messages campaign", desc: "Your content is perfect for direct inquiries.", icon: Megaphone },
                 ].map((rec, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                   >
                     <GlassCard className="p-6 border-white/5 hover:border-primary/20 transition-all group cursor-pointer" interactive>
                       <div className="flex gap-5">
                          <div className="w-12 h-12 rounded-[1.25rem] bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                             <rec.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                             <h4 className="text-sm font-black tracking-tight mb-1 uppercase">{rec.title}</h4>
                             <p className="text-xs text-muted-foreground font-medium leading-relaxed">{rec.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 self-center text-primary" />
                       </div>
                    </GlassCard>
                   </motion.div>
                 ))}
              </div>

              <GlassCard className="p-6 border-white/5 bg-background/55">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                      Settings
                    </p>
                    <h3 className="mt-2 text-lg font-black tracking-tight">
                      Theme, defaults, and local history
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-6">
                      Update your default translation direction and theme preferences.
                    </p>
                  </div>
                  <Settings2 className="w-5 h-5 text-primary shrink-0" />
                </div>
                <Button asChild variant="outline" className="mt-5 w-full rounded-[1.5rem]">
                  <Link href="/settings">Manage settings</Link>
                </Button>
              </GlassCard>

              <Button className="w-full h-16 rounded-[2rem] font-black text-lg gap-3 shadow-2xl shadow-primary/30 group">
                 Unlock Pro Strategy
                 <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
              </Button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
