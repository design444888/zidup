import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  glow?: boolean
}

export function GlassCard({ children, className, interactive = false, glow = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-[2rem] p-6 relative overflow-hidden border border-border/80 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.18)]",
        interactive && "glass-interactive cursor-pointer",
        className
      )}
      {...props}
    >
      {glow && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/8 blur-[48px] rounded-full pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
