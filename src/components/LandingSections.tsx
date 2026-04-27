"use client"

import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import {
  XCircle,
  CheckCircle2,
  Sparkles,
  Target,
  Zap,
  LineChart,
  Smartphone,
  ChevronDown
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function ProblemSection() {
  const problems = [
    "Takes too much time manually",
    "No idea what to post next",
    "Ads are confusing and expensive",
    "Can't track what's working",
    "Growth feels stagnant",
  ]

  return (
    <section id="features" className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="heading-lg mb-6">Social media growth is hard when <span className="text-primary italic">everything is manual.</span></h2>
          <p className="subheading mx-auto">Most small business owners spend hours struggling with content instead of running their business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl glass border-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <XCircle className="w-6 h-6" />
                </div>
                <span className="font-bold tracking-tight">{problem}</span>
              </motion.div>
            ))}
          </div>

          <GlassCard className="p-12 border-primary/20 bg-primary/5 text-center" glow>
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-8 animate-pulse" />
            <h3 className="heading-md mb-6">There is a better way.</h3>
            <p className="subheading mx-auto mb-10 text-sm">Zidup automates the hard part so you can focus on your customers and quality.</p>
            <Button size="lg" className="rounded-2xl px-12">See how Zidup works</Button>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

export function SolutionSection() {
  const features = [
    { title: "AI Content Genius", desc: "Generate captions and ideas in Moroccan Darija, Arabic, or French instantly.", icon: Sparkles },
    { title: "Smart Ad Builder", desc: "Prepare high-converting Facebook and Instagram ads without the complexity.", icon: Target },
    { title: "Visual Analytics", desc: "See your growth score and understand which posts bring real customers.", icon: LineChart },
    { title: "Content Calendar", desc: "Plan your entire month in 15 minutes. Stay consistent, stay ahead.", icon: Zap },
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="heading-lg mb-6">Everything you need to <span className="text-primary italic">scale.</span></h2>
          <p className="subheading mx-auto">Professional tools designed for beginners. No agency fees, no marketing degree required.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <GlassCard key={i} className="p-8 border-white/5 hover:border-primary/20 transition-all group" interactive>
              <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black tracking-tighter mb-4 uppercase">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  const steps = [
    "Add your business details",
    "Describe your business",
    "Generate content & ads",
    "Schedule your posts",
    "Track and grow",
  ]

  return (
    <section id="how-it-works" className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="heading-lg mb-6">How it <span className="text-primary italic">works.</span></h2>
          <p className="subheading mx-auto">Five simple steps to take control of your social presence.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-primary/20 hidden md:block -z-10" />
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-background glass border-primary/30 flex items-center justify-center text-2xl font-black text-primary shadow-xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                {i + 1}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest">{step}</p>
                <p className="text-[10px] font-bold opacity-30 uppercase">Step {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function UseCasesSection() {
  const cases = [
    "Restaurant", "Wellness Center", "Car Rental",
    "Beauty Salon", "Gym", "Ecommerce", "Agency"
  ]

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="heading-md mb-12 opacity-30 uppercase tracking-[0.2em]">Perfect for your business</h2>

        <div className="flex flex-wrap justify-center gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 rounded-2xl glass border-white/5 font-black text-sm uppercase tracking-widest cursor-default hover:text-primary transition-colors"
            >
              {c}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="heading-lg mb-6">Simple <span className="text-primary italic">pricing.</span></h2>
        <p className="subheading mx-auto mb-20">No hidden fees. No long-term contracts. Cancel anytime.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Free", price: "0", features: ["10 AI captions", "Basic insights", "1 page"], button: "Start Free" },
            { name: "Pro", price: "99", features: ["100 AI generations", "Campaign builder", "Analytics", "3 pages"], popular: true, button: "Upgrade to Pro" },
            { name: "Agency", price: "299", features: ["Unlimited AI", "Team access", "PDF reports", "Multi-client"], button: "Start Agency" },
          ].map((plan, i) => (
            <GlassCard key={i} className={cn("p-10 border-white/5 relative overflow-hidden", plan.popular && "border-primary/30 ring-2 ring-primary/20 scale-105 z-10")} glow={plan.popular}>
              {plan.popular && (
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              <p className="text-sm font-black uppercase tracking-widest opacity-50 mb-4">{plan.name}</p>
              <div className="mb-10">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                <span className="text-sm opacity-30 font-black uppercase ml-1">MAD/mo</span>
              </div>
              <ul className="space-y-4 mb-12 text-left">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-bold opacity-70">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button variant={plan.popular ? "primary" : "outline"} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest">{plan.button}</Button>
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  const faqs = [
    { q: "Is Zidup 100% legal?", a: "Yes. Zidup is built to help you plan content, write better posts, and prepare campaigns in a compliant way. It does not use bots, fake followers, or fake engagement tactics." },
    { q: "Can I use it for multiple businesses?", a: "Yes. If you manage more than one business, the higher plans are designed for multiple pages and workflows, so you can keep each brand organized without mixing their content." },
    { q: "Do I need marketing experience?", a: "No. Zidup is made for owners and small teams who are not marketers. It helps you decide what to post, how to prepare campaigns, and what to improve next." },
    { q: "Is there a free version?", a: "Yes. There is a free plan so you can try Zidup, generate a limited amount of content, and see if it fits your business before upgrading." },
  ]

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="heading-lg mb-16 text-center">Frequently Asked <span className="text-primary italic">Questions.</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <GlassCard key={i} className="p-0 border-white/5 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-8 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <span className="font-black text-lg tracking-tight">{faq.q}</span>
                <ChevronDown className={cn("w-5 h-5 transition-transform", open === i ? "rotate-180" : "")} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-8 text-muted-foreground font-medium leading-relaxed text-sm overflow-hidden"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="py-24 px-4 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <Zap className="text-white w-4 h-4 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Zidup</span>
          </div>
          <p className="subheading text-sm max-w-sm">Helping small businesses in Morocco grow their social media presence professionally, legally, and smarter.</p>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-30">Platform</h4>
          <ul className="space-y-4 text-sm font-bold">
            <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link></li>
            <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-30">Legal</h4>
          <ul className="space-y-4 text-sm font-bold">
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-border flex justify-between items-center opacity-30 text-[10px] font-black uppercase tracking-widest">
        <span>© 2026 Zidup. All rights reserved.</span>
        <span>Made for Morocco</span>
      </div>
    </footer>
  )
}
