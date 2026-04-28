"use client"

import { useTheme } from "./ThemeProvider"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background/65 text-foreground shadow-[0_16px_40px_-28px_rgba(8,15,31,0.42)] backdrop-blur-md transition-all duration-300 hover:border-primary/35 hover:bg-background/85"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: resolvedTheme === "light" ? 1 : 0,
            opacity: resolvedTheme === "light" ? 1 : 0,
            rotate: resolvedTheme === "light" ? 0 : 90
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-5 w-5 text-primary opacity-80" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: resolvedTheme === "dark" ? 1 : 0,
            opacity: resolvedTheme === "dark" ? 1 : 0,
            rotate: resolvedTheme === "dark" ? 0 : -90
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-5 w-5 text-primary" />
        </motion.div>
      </div>
    </motion.button>
  )
}
