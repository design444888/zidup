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
  Settings2,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { storageService } from "@/services/storageService"
import { authService } from "@/services/authService"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useAppState } from "@/components/AppStateProvider"

const dashboardCardCtaClassName =
  "relative z-20 mt-6 w-full rounded-2xl border border-primary/30 bg-primary text-primary-foreground font-black uppercase tracking-[0.12em] shadow-[0_18px_38px_-18px_rgba(132,204,22,0.68)] hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/90 hover:shadow-[0_24px_48px_-20px_rgba(132,204,22,0.75)] focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"

export default function DashboardPage() {
  const { history } = useAppState()
  const [user, setUser] = useState<any>(null)
  const [business, setBusiness] = useState<any>(null)
  const [contents, setContents] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    const savedUser = authService.ensureDemoSession()
    setUser(savedUser)
    setBusiness(storageService.getBusiness())
    setContents(storageService.getContents())
    setPosts(storageService.getScheduledPosts())
    setCampaigns(storageService.getCampaigns())
    setAnalytics(storageService.getAnalytics())
  }, [])

  if (!user) return null

  const growthScore = analytics?.growthScore ?? business?.growthScore ?? 78
  const scheduledPostsCount = posts.length
  const campaignDraft = campaigns[0]
  const bestTimes = analytics?.bestPostingTimes?.slice(0, 2) ?? [
    { time: "7:00 PM", day: "Today" },
    { time: "12:30 PM", day: "Tomorrow" },
  ]
  const aiRecommendations = analytics?.aiRecommendations ?? [
    { title: "Add more local keywords", desc: "Targeting Casablanca neighborhoods can increase reach by 25%." },
    { title: "Use stronger CTA", desc: "Posts with direct booking language are driving more messages." },
    { title: "Post 4 times this week", desc: "Consistency is keeping Atlas Cafe ahead of nearby competitors." },
    { title: "Try a messages campaign", desc: "Your brunch offer is ideal for direct inquiries and reservations." },
  ]
  const recentIdeas = contents.slice(0, 5)

  return (
    <DashboardLayout>
      <div className="mb-12">
        <h1 className="heading-lg mb-2">My Dashboard</h1>
        <p className="text-muted-foreground font-medium">
          Welcome back, <span className="text-foreground font-black">{user.fullName}</span>. Growth is looking steady for <span className="text-primary font-black">{business?.businessName || "Your Business"}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <GlassCard className="p-8 border-white/5 bg-primary/5 group" glow>
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
            <TrendingUp className="w-16 h-16" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Growth Score</p>
          <div className="flex items-end gap-2 mb-6">
            <span className="text-6xl font-black tracking-tighter">{growthScore}</span>
            <span className="text-xl font-bold opacity-30 mb-2">/100</span>
          </div>
          <p className="text-xs font-bold leading-relaxed text-muted-foreground">
            Your page has good potential. <span className="text-foreground">Improve consistency and captions.</span>
          </p>
          <Button asChild variant="primary" size="sm" className={dashboardCardCtaClassName}>
            <Link href="/dashboard/analytics" aria-label="Improve growth score from analytics">
              Improve Score
            </Link>
          </Button>
        </GlassCard>

        <GlassCard className="p-8 border-white/5 hover:border-primary/20 transition-all group">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Content Plan</p>
          <div className="space-y-5">
            {[
              { label: "Generated", value: `${contents.length} ideas`, color: "bg-muted" },
              { label: "Scheduled", value: `${scheduledPostsCount} posts`, color: "bg-primary/10 text-primary" },
              { label: "Drafts", value: `${campaigns.length} campaign`, color: "bg-muted" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs font-bold opacity-50 uppercase tracking-tight">{item.label}</span>
                <span className={cn("px-3 py-1 rounded-lg font-black text-xs", item.color)}>{item.value}</span>
              </div>
            ))}
          </div>
          <Button asChild variant="primary" size="sm" className={dashboardCardCtaClassName}>
            <Link href="/dashboard/calendar" aria-label="Open content planner">
              Open Planner
            </Link>
          </Button>
        </GlassCard>

        <GlassCard className="p-8 border-white/5 bg-secondary/5 group" glow>
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Active Campaign</p>
            <span className="bg-background/80 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">{campaignDraft?.status || "Draft"}</span>
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tighter">{campaignDraft?.objective?.replace("Get more ", "") || "Messages"}</p>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Primary Objective</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background/40 p-3 rounded-2xl border border-white/5">
              <p className="text-sm font-black">{campaignDraft?.budget || "150"} MAD</p>
              <p className="text-[8px] font-bold opacity-40 uppercase tracking-widest">Budget</p>
            </div>
            <div className="bg-background/40 p-3 rounded-2xl border border-white/5">
              <p className="text-sm font-black">{campaignDraft?.reachEstimate || "6K-9K"}</p>
              <p className="text-[8px] font-bold opacity-40 uppercase tracking-widest">Reach</p>
            </div>
          </div>
          <Button asChild variant="primary" size="sm" className={dashboardCardCtaClassName}>
            <Link href="/dashboard/campaigns" aria-label="Edit active campaign">
              Edit Campaign
            </Link>
          </Button>
        </GlassCard>

        <GlassCard className="p-8 border-white/5 bg-yellow-500/5">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-8">Best Posting Time</p>
          <div className="space-y-6">
            {bestTimes.map((item: { time: string; day: string }, i: number) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tighter">{item.time}</p>
                  <p className="text-[10px] font-bold opacity-40 uppercase">{item.day}</p>
                </div>
              </div>
            ))}
          </div>
          <Button asChild variant="primary" size="sm" className={dashboardCardCtaClassName}>
            <Link href="/dashboard/calendar" aria-label="Schedule a post for the best posting time">
              Schedule Post
            </Link>
          </Button>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <DashboardWidget title="Quick Actions">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Generate Caption", href: "/dashboard/content", icon: PenTool, color: "bg-primary text-primary-foreground shadow-[0_20px_40px_-20px_rgba(132,204,22,0.7)]" },
                { label: "Create Campaign", href: "/dashboard/campaigns", icon: Megaphone, color: "bg-secondary text-secondary-foreground shadow-[0_20px_40px_-20px_rgba(124,140,255,0.65)]" },
                { label: "Plan This Week", href: "/dashboard/calendar", icon: CalendarDays, color: "bg-blue-500 text-white shadow-[0_20px_40px_-20px_rgba(59,130,246,0.65)]" },
                { label: "View Analytics", href: "/dashboard/analytics", icon: BarChart3, color: "bg-orange-500 text-white shadow-[0_20px_40px_-20px_rgba(249,115,22,0.65)]" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  aria-label={action.label}
                  className="group relative z-10 flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-[2rem] border border-primary/15 bg-background/45 px-5 py-6 text-center shadow-[0_18px_42px_-26px_rgba(15,23,42,0.35)] transition-all duration-300 hover:scale-[1.02] hover:border-primary/35 hover:bg-primary/8 hover:shadow-[0_24px_55px_-28px_rgba(132,204,22,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                >
                  <div className={cn("flex h-16 w-16 items-center justify-center rounded-[2rem] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-22px_rgba(132,204,22,0.45)]", action.color)}>
                    <action.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-foreground/80 transition-colors group-hover:text-primary">
                    {action.label}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary/75 transition-colors group-hover:text-primary">
                    Open
                  </span>
                </Link>
              ))}
            </div>
          </DashboardWidget>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <GlassCard className="p-8 border-white/5 xl:col-span-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-3">Translation Workspace</p>
                  <h3 className="text-2xl font-black tracking-tighter mb-3">Ready for your next Arabic or English translation</h3>
                  <p className="text-sm text-muted-foreground leading-7 max-w-2xl">
                    Start a fresh translation, keep your recent results organized, and move between translation, history, and settings from one place.
                  </p>
                </div>
                <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-primary/10 text-primary">
                  <Languages className="w-7 h-7" />
                </div>
              </div>
              <div className="mt-6">
                <Button asChild size="lg" className="relative z-20 rounded-[1.5rem] bg-primary text-primary-foreground shadow-[0_18px_38px_-18px_rgba(132,204,22,0.68)] hover:bg-primary/90 focus-visible:ring-primary/45">
                  <Link href="/translate">Create first translation</Link>
                </Button>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-3">Saved History</p>
              <p className="text-4xl font-black tracking-tighter">{history.length}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-7">Stored translations available locally in this browser.</p>
              <Button asChild variant="primary" className="relative z-20 mt-6 w-full rounded-[1.5rem] bg-primary text-primary-foreground shadow-[0_18px_38px_-18px_rgba(132,204,22,0.68)] hover:bg-primary/90 focus-visible:ring-primary/45">
                <Link href="/history">Open history</Link>
              </Button>
            </GlassCard>
          </div>

          <DashboardWidget
            title="Recent Content Ideas"
            action={<Button variant="ghost" size="sm" className="font-black text-primary uppercase text-[10px] tracking-widest">View All</Button>}
          >
            <div className="space-y-4 pt-2">
              {recentIdeas.map((idea, i) => (
                <div key={idea.id ?? i} className="flex items-center justify-between p-5 rounded-2xl glass border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                  <div className="flex items-center gap-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(132,204,22,0.5)]" />
                    <span className="text-sm font-black tracking-tight">{idea.title ?? idea.caption}</span>
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
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shadow-lg shadow-primary/10">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <h2 className="text-2xl font-black tracking-tighter">AI Recommendations</h2>
            </div>

            <div className="space-y-4">
              {aiRecommendations.map((rec: { title: string; desc: string }, i: number) => {
                const Icon = [Lightbulb, Target, CalendarDays, Megaphone][i % 4]
                return (
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
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-black tracking-tight mb-1 uppercase">{rec.title}</h4>
                          <p className="text-xs text-muted-foreground font-medium leading-relaxed">{rec.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 self-center text-primary" />
                      </div>
                    </GlassCard>
                  </motion.div>
                )
              })}
            </div>

            <GlassCard className="p-6 border-white/5 bg-background/55">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Settings</p>
                  <h3 className="mt-2 text-lg font-black tracking-tight">Theme, defaults, and local history</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-6">
                    Update your default translation direction and theme preferences.
                  </p>
                </div>
                <Settings2 className="w-5 h-5 text-primary shrink-0" />
              </div>
              <Button asChild variant="primary" className="relative z-20 mt-5 w-full rounded-[1.5rem] bg-primary text-primary-foreground shadow-[0_18px_38px_-18px_rgba(132,204,22,0.68)] hover:bg-primary/90 focus-visible:ring-primary/45">
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
