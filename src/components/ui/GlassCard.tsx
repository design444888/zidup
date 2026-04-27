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
        "glass rounded-[2rem] p-6 relative overflow-hidden",
        interactive && "glass-interactive cursor-pointer",
        className
      )}
      {...props}
    >
      {glow && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
