"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { MetricCard, DashboardWidget } from "@/components/ui/Cards"
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  Wallet, 
  Eye,
  Calendar,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
  Camera,
  Video,
  Layout,
  Lightbulb,
  Target,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { storageService } from "@/services/storageService"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d')
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    storageService.ensureDemoData()
    setAnalytics(storageService.getAnalytics())
  }, [])

  const metrics = (analytics?.metrics || [
    { label: "Total Reach", value: "24.8K", change: "+15.2%", trend: 'up' as const },
    { label: "Engagement Rate", value: "6.4%", change: "+2.1%", trend: 'up' as const },
    { label: "Messages", value: "143", change: "+12", trend: 'up' as const },
    { label: "Campaign Spend", value: "540 MAD", change: "-5%", trend: 'down' as const },
  ]).map((metric: any, index: number) => ({
    ...metric,
    icon: [Eye, BarChart3, MessageCircle, Wallet][index] || Eye,
    trend: metric.trend as 'up' | 'down',
  }))

  const recentPosts = analytics?.recentPosts || [
    { title: "Summer Special Offer", platform: "Instagram", type: "Reel", reach: "4.2K", engagement: "8.5%", status: "High" },
    { title: "Client Testimonial #4", platform: "Facebook", type: "Post", reach: "1.8K", engagement: "4.2%", status: "Medium" },
    { title: "Behind the Scenes", platform: "Instagram", type: "Story", reach: "950", engagement: "12.1%", status: "Viral" },
    { title: "Our New Menu", platform: "Both", type: "Carousel", reach: "3.1K", engagement: "6.8%", status: "High" },
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="heading-lg mb-2">Analytics Insights</h1>
          <p className="text-muted-foreground font-medium">Understand what content works best for your growth.</p>
        </div>

        <div className="glass p-1.5 rounded-[1.5rem] flex border-white/5 shadow-xl">
           {['7d', '30d', '90d'].map(range => (
             <button 
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                   "px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300", 
                   dateRange === range ? "bg-primary text-primary-foreground shadow-xl" : "text-muted-foreground hover:text-foreground"
                )}
             >Last {range}</button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((m: { label: string; value: string; change: string; trend: 'up' | 'down'; icon: typeof Eye }, i: number) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        <DashboardWidget 
           title="Reach Over Time" 
           className="lg:col-span-2"
           action={<span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">+12.5% vs last week</span>}
        >
           <div className="h-80 flex items-end justify-between gap-3 px-4 mt-8">
              {[30, 45, 35, 60, 55, 80, 75, 95, 85, 100, 90, 110, 105, 120].map((h, i) => (
                 <div key={i} className="flex-1 bg-primary/10 rounded-t-[0.5rem] relative group transition-all duration-500 hover:bg-primary" style={{ height: `${(h/120)*100}%` }}>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 glass border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl">
                       {h}k
                    </div>
                 </div>
              ))}
           </div>
           <div className="flex justify-between mt-8 px-4 text-[10px] font-black uppercase opacity-30 tracking-[0.2em]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span>Sun</span>
           </div>
        </DashboardWidget>

        <DashboardWidget title="Best Posting Times">
           <div className="space-y-8 mt-6">
              {[
                { time: "7 PM - 9 PM", label: "Peak Engagement", score: 95, color: "bg-primary" },
                { time: "12 PM - 2 PM", label: "Lunch Break", score: 65, color: "bg-secondary" },
                { time: "9 AM - 10 AM", label: "Morning Scroll", score: 40, color: "bg-blue-500" },
              ].map((t, i) => (
                <div key={i} className="space-y-3">
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-black tracking-tighter uppercase">{t.time}</span>
                      <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{t.label}</span>
                   </div>
                   <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${t.score}%` }}
                         transition={{ duration: 1, delay: i * 0.2 }}
                         className={cn("h-full rounded-full shadow-lg", t.color)} 
                      />
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-16 p-8 rounded-[2.5rem] glass border-primary/20 bg-primary/5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-3 mb-4">
                 <Zap className="w-5 h-5 text-primary fill-current" />
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Growth Insight</h4>
              </div>
              <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                 Schedule your most important offers for <span className="text-primary">Sunday evening</span> to maximize visibility among local audiences in Casablanca.
              </p>
           </div>
        </DashboardWidget>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
           <DashboardWidget 
              title="Recent Content Performance"
              action={<Button variant="ghost" size="sm" className="font-black text-primary uppercase text-[10px] tracking-widest">Full History</Button>}
           >
              <div className="overflow-x-auto mt-6">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-border">
                          <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Post Title</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Platform</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-center">Type</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-right">Reach</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-right">Eng.</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                       {recentPosts.map((post: { title: string; platform: string; type: string; reach: string; engagement: string; status: string }, i: number) => (
                         <tr key={i} className="group hover:bg-muted/30 transition-all duration-300">
                            <td className="py-6 font-black text-sm tracking-tight">{post.title}</td>
                            <td className="py-6">
                               {post.platform === "Instagram" ? <Camera className="w-5 h-5 text-pink-500" /> : <MessageCircle className="w-5 h-5 text-blue-500" />}
                            </td>
                            <td className="py-6 text-center">
                               {post.type === "Reel" ? <Video className="w-5 h-5 mx-auto text-primary" /> : <Layout className="w-5 h-5 mx-auto text-secondary" />}
                            </td>
                            <td className="py-6 text-right font-black text-sm">{post.reach}</td>
                            <td className="py-6 text-right font-black text-sm">{post.engagement}</td>
                            <td className="py-6 text-right">
                               <span className={cn(
                                  "px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                  post.status === "Viral" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground"
                               )}>{post.status}</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </DashboardWidget>
        </div>

        <div className="space-y-10">
           <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shadow-xl shadow-primary/10">
                 <Zap className="w-6 h-6 text-primary fill-current" />
              </div>
              <h2 className="text-2xl font-black tracking-tighter">AI Insights</h2>
           </div>
           
           <div className="space-y-5">
              {[
                { text: "Reels perform 45% better than images this week", icon: Video, color: "text-primary" },
                { text: "Your best time is between 7 PM and 9 PM", icon: Clock, color: "text-secondary" },
                { text: "Posts with clear offers get more messages", icon: Target, color: "text-blue-500" },
                { text: "Try more local keywords in captions", icon: Lightbulb, color: "text-yellow-500" },
              ].map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 border-white/5 hover:border-primary/20 transition-all group cursor-pointer flex items-center gap-5" interactive>
                     <div className={cn("w-12 h-12 rounded-[1.25rem] bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors", insight.color)}>
                        <insight.icon className="w-6 h-6" />
                     </div>
                     <p className="text-sm font-black tracking-tight leading-snug">{insight.text}</p>
                  </GlassCard>
                </motion.div>
              ))}
           </div>

           <Button className="w-full h-16 rounded-[2rem] font-black text-lg gap-3 shadow-2xl shadow-primary/30 group">
              Download Full Report
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
