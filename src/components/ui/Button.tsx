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
      primary: "bg-primary text-primary-foreground shadow-[0_16px_36px_-18px_rgba(132,204,22,0.65)] hover:bg-primary/90 hover:scale-[1.01] hover:shadow-[0_20px_42px_-20px_rgba(132,204,22,0.72)]",
      secondary: "bg-secondary text-secondary-foreground shadow-[0_16px_36px_-18px_rgba(124,140,255,0.55)] hover:bg-secondary/90 hover:scale-[1.01]",
      outline: "border border-border bg-card/80 hover:bg-muted/80 text-foreground shadow-sm",
      ghost: "bg-transparent hover:bg-muted/80 text-muted-foreground hover:text-foreground",
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
          "inline-flex items-center justify-center rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
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
