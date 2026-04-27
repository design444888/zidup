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
      primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] hover:shadow-primary/30",
      secondary: "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20 hover:bg-secondary/90 hover:scale-[1.02]",
      outline: "border border-border bg-transparent hover:bg-muted text-foreground",
      ghost: "bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground",
      glass: "glass text-foreground hover:bg-white/10 dark:hover:bg-white/5",
      danger: "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600 hover:scale-[1.02]",
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
          "inline-flex items-center justify-center rounded-2xl text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
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
