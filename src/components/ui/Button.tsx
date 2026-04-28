import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'danger'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xl'
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', asChild = false, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const variants = {
      primary: "bg-primary text-primary-foreground shadow-[0_18px_40px_-20px_rgba(14,165,233,0.72)] hover:bg-sky-500 hover:shadow-[0_22px_46px_-22px_rgba(14,165,233,0.78)]",
      secondary: "bg-sky-100 text-sky-950 shadow-[0_16px_36px_-22px_rgba(14,165,233,0.45)] hover:bg-sky-200 dark:bg-sky-500/18 dark:text-sky-100 dark:hover:bg-sky-500/28",
      outline: "border border-border bg-background/86 text-foreground shadow-[0_12px_28px_-20px_rgba(6,18,33,0.28)] hover:border-primary/30 hover:bg-muted/88",
      ghost: "bg-transparent text-foreground hover:bg-muted/82 hover:text-foreground",
      glass: "glass text-foreground hover:bg-card/90",
      danger: "bg-red-500 text-white shadow-[0_16px_36px_-18px_rgba(239,68,68,0.55)] hover:bg-red-600 hover:scale-[1.01]",
    }

    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-9 px-4 rounded-xl text-xs",
      lg: "h-14 px-8 text-lg",
      xl: "h-16 px-10 text-xl font-black",
      icon: "h-10 w-10",
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55 active:translate-y-0 active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }
