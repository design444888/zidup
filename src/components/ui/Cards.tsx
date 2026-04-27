"use client"

import { GlassCard } from "./GlassCard"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface MetricCardProps {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
}

export function MetricCard({ label, value, change, trend, icon: Icon }: MetricCardProps) {
  return (
    <GlassCard className="p-8 border-white/5 hover:border-primary/20 transition-all group" interactive>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className={cn(
          "flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
          trend === 'up' ? "bg-primary/10 text-primary shadow-lg shadow-primary/5" : "bg-red-500/10 text-red-500"
        )}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">{label}</p>
        <h3 className="text-3xl font-black tracking-tighter">{value}</h3>
      </div>
    </GlassCard>
  )
}

export function DashboardWidget({ title, children, action, className }: { title: string, children: React.ReactNode, action?: React.ReactNode, className?: string }) {
  return (
    <GlassCard className={cn("p-10 border-white/5 rounded-[3rem] shadow-xl", className)}>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl font-black tracking-tighter uppercase">{title}</h2>
        {action}
      </div>
      {children}
    </GlassCard>
  )
}

export function FeatureCard({ title, desc, icon: Icon }: { title: string, desc: string, icon: LucideIcon }) {
  return (
    <GlassCard className="p-10 border-white/5 hover:border-primary/30 transition-all group" interactive>
      <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-primary/5">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-black tracking-tighter mb-4 uppercase">{title}</h3>
      <p className="text-sm text-muted-foreground font-medium leading-relaxed">{desc}</p>
    </GlassCard>
  )
}
