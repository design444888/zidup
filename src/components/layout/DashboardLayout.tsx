"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  PenTool, 
  Calendar, 
  Target, 
  BarChart3, 
  Settings, 
  Rocket,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { GlassCard } from "@/components/ui/GlassCard"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useState, useEffect } from "react"
import { authService } from "@/services/authService"
import { storageService } from "@/services/storageService"
import { motion, AnimatePresence } from "framer-motion"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: PenTool, label: "Content Generator", href: "/dashboard/content" },
  { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
  { icon: Target, label: "Campaign Builder", href: "/dashboard/campaigns" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Rocket, label: "Pricing", href: "/pricing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userName, setUserName] = useState("Said Ben")
  const [businessName, setBusinessName] = useState("Atlas Cafe")
  const [planName, setPlanName] = useState("Pro Member")

  useEffect(() => {
    const user = authService.ensureDemoSession()
    const business = storageService.getBusiness()

    setUserName(user?.fullName || "Said Ben")
    setBusinessName(business?.businessName || user?.businessName || "Atlas Cafe")
    setPlanName(user?.plan || business?.plan || "Pro Member")

    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    authService.logoutUser()
    router.push("/login")
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <div className="gradient-glow" />

      {/* Sidebar - Desktop */}
      <aside className="w-72 hidden lg:flex flex-col p-6 z-20">
        <GlassCard className="h-full flex flex-col p-5 rounded-[2.5rem]">
          <div className="mb-10 px-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
                <Rocket className="text-primary-foreground w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tighter">Zidup</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-[0_14px_30px_-18px_rgba(132,204,22,0.65)]" 
                      : "text-muted-foreground hover:bg-card/85 hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary-foreground" : "group-hover:text-primary")} />
                  <span className="font-black text-sm tracking-tight uppercase">{item.label}</span>
                  {isActive && (
                    <motion.div 
                        layoutId="activeTab" 
                        className="absolute inset-0 bg-primary rounded-2xl -z-10" 
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-border">
            <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all font-black text-xs uppercase"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </GlassCard>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Topbar */}
        <header className={cn(
            "h-20 flex items-center justify-between px-6 lg:px-10 z-30 transition-all duration-300",
            isScrolled ? "bg-background/72 backdrop-blur-md border-b border-border/80" : ""
        )}>
          <div className="flex items-center gap-4 lg:hidden">
             <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2.5 rounded-xl glass"
             >
                <Menu className="w-5 h-5" />
             </button>
             <span className="text-xl font-black tracking-tighter">Zidup</span>
          </div>

          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
             <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search assets, analytics..." 
                  className="w-full bg-muted/50 border border-border rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold"
                />
             </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative glass border-white/10 rounded-xl">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                </Button>
            </div>
            <div className="h-8 w-px bg-border mx-1 hidden sm:block" />
            <div className="flex items-center gap-3 glass py-1.5 pl-1.5 pr-4 rounded-2xl cursor-pointer hover:bg-card/85 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">
                {userName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-[10px] font-black tracking-widest leading-tight uppercase opacity-50">{businessName}</p>
                <p className="text-[10px] font-bold text-primary uppercase">{planName}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Area */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-20 pt-2 custom-scrollbar">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
           >
             {children}
           </motion.div>
        </main>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
         {isMobileMenuOpen && (
           <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-[280px] bg-background/96 backdrop-blur-md z-50 p-6 flex flex-col lg:hidden"
              >
                 <div className="flex items-center justify-between mb-10">
                    <span className="text-2xl font-black tracking-tighter">Zidup</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-xl glass">
                       <X className="w-5 h-5" />
                    </button>
                 </div>
                 <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black text-sm uppercase",
                          pathname === item.href ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    ))}
                 </nav>
              </motion.div>
           </>
         )}
      </AnimatePresence>
    </div>
  )
}
