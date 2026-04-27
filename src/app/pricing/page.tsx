"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/LandingSections"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, Zap, Rocket, Building2, Sparkles, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const plans = [
    {
      name: "Free",
      price: "0",
      desc: "For small hobby projects",
      icon: Zap,
      features: [
        "10 AI captions/month",
        "Basic content ideas",
        "Simple calendar",
        "Basic analytics",
        "1 business page"
      ],
      button: "Start for Free",
      variant: "outline" as const
    },
    {
      name: "Pro",
      price: isYearly ? "79" : "99",
      desc: "The professional growth kit",
      icon: Rocket,
      popular: true,
      features: [
        "100 AI generations/month",
        "Full content calendar",
        "Campaign builder",
        "Hashtag generator",
        "Ad copy generator",
        "Analytics dashboard",
        "3 business pages"
      ],
      button: "Upgrade to Pro",
      variant: "primary" as const
    },
    {
      name: "Agency",
      price: isYearly ? "249" : "299",
      desc: "Scale multiple brands easily",
      icon: Building2,
      features: [
        "Unlimited content generations",
        "Multiple clients support",
        "Advanced analytics",
        "PDF reports",
        "Campaign templates",
        "Team access",
        "Priority support"
      ],
      button: "Start Agency",
      variant: "outline" as const
    }
  ]

  const faqs = [
    { q: "Can I cancel anytime?", a: "Absolutely. Zidup is a monthly or yearly subscription with no lock-in. Cancel whenever you want." },
    { q: "Does Zidup give fake followers?", a: "No. We strictly follow Meta policies. We provide tools for organic growth and professional ad planning." },
    { q: "Can I use it for multiple pages?", a: "Yes, our Pro and Agency plans are designed specifically for managing multiple social media pages." },
    { q: "Is it good for small businesses?", a: "It's perfect! We built Zidup specifically for small business owners in Morocco who need professional tools without the high cost." }
  ]

  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <div className="gradient-glow" />
      <Navbar />

      <section className="pt-40 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Transparent Pricing</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-xl mb-8"
          >
            Smarter plans for <span className="text-primary italic">faster growth.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="subheading mx-auto mb-16"
          >
            Choose the plan that fits your business stage. No hidden fees, just pure value.
          </motion.p>

          {/* Toggle */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 mb-20"
          >
            <span className={cn("text-xs font-black uppercase tracking-widest transition-opacity", !isYearly ? "opacity-100" : "opacity-30")}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-20 h-10 glass rounded-full p-1 relative border-white/10 shadow-xl"
            >
              <motion.div 
                animate={{ x: isYearly ? 40 : 0 }}
                className="w-8 h-8 bg-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center"
              >
                 {isYearly && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
              </motion.div>
            </button>
            <div className="flex items-center gap-3">
               <span className={cn("text-xs font-black uppercase tracking-widest transition-opacity", isYearly ? "opacity-100" : "opacity-30")}>Yearly</span>
               <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">Save 20%</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.4 }}
              >
                <GlassCard 
                  className={cn(
                    "p-12 border-white/5 relative flex flex-col items-stretch text-left group transition-all duration-500 rounded-[3.5rem] h-full",
                    plan.popular && "border-primary/30 ring-2 ring-primary/20 scale-105 z-10"
                  )} 
                  glow={plan.popular}
                  interactive
                >
                  {plan.popular && (
                    <div className="absolute top-8 right-8 bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-2xl shadow-primary/20">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={cn(
                    "w-16 h-16 rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                    plan.popular ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20" : "bg-muted text-primary"
                  )}>
                    <plan.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium mb-10">{plan.desc}</p>
                  
                  <div className="mb-12">
                    <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                    <span className="text-sm opacity-30 font-black uppercase ml-1">MAD / mo</span>
                  </div>

                  <ul className="space-y-5 mb-16 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-4 text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register">
                    <Button 
                        variant={plan.variant} 
                        size="xl" 
                        className={cn(
                          "w-full h-16 rounded-[2rem] font-black uppercase tracking-widest text-xs",
                          plan.popular ? "shadow-2xl shadow-primary/30" : "glass"
                        )}
                    >
                      {plan.button}
                    </Button>
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-4 bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="heading-lg mb-4 uppercase">Pricing <span className="text-primary italic">FAQ.</span></h2>
            <p className="subheading mx-auto text-sm">Everything you need to know about Zidup billing.</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <GlassCard key={i} className="p-0 border-white/5 overflow-hidden rounded-[2.5rem]">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-10 text-left flex items-center justify-between hover:bg-muted/30 transition-colors group"
                >
                   <span className="font-black text-lg tracking-tight uppercase group-hover:text-primary transition-colors">{faq.q}</span>
                   <div className={cn("w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center transition-all", openFaq === i ? "rotate-180 bg-primary text-primary-foreground" : "")}>
                      <ChevronDown className="w-5 h-5" />
                   </div>
                </button>
                <AnimatePresence>
                   {openFaq === i && (
                     <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-10 pb-10 text-muted-foreground font-medium leading-relaxed text-sm overflow-hidden"
                     >
                        <div className="pt-4 border-t border-border">
                          {faq.a}
                        </div>
                     </motion.div>
                   )}
                </AnimatePresence>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
