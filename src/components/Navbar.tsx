"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { GlassCard } from "@/components/ui/GlassCard"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Rocket, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ]

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 lg:px-12",
      isScrolled ? "py-4" : "py-8"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "glass flex items-center justify-between px-6 py-3 rounded-[2rem] transition-all duration-500 border-white/5 shadow-2xl",
          isScrolled ? "bg-background/80 backdrop-blur-2xl border-white/10" : ""
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Rocket className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">Zidup</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
               <ThemeToggle />
            </div>
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" className="font-black text-[10px] uppercase tracking-widest px-6 h-11 rounded-xl">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="font-black text-[10px] uppercase tracking-widest px-8 h-11 shadow-xl shadow-primary/20 rounded-xl">Get Started</Button>
            </Link>
            
            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl glass border-white/10"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-28 left-6 right-6 z-40 lg:hidden"
          >
            <GlassCard className="p-8 border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-black uppercase tracking-widest text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px w-full bg-border" />
              <div className="flex items-center gap-8">
                <ThemeToggle />
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-black text-xs uppercase tracking-widest">Sign In</span>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
