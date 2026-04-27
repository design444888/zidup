"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { 
  Target, 
  ChevronRight, 
  ChevronLeft, 
  MessageSquare, 
  Phone, 
  Globe, 
  Tag, 
  Calendar, 
  Users, 
  Wallet, 
  Megaphone,
  CheckCircle2,
  Sparkles,
  Zap,
  Layout,
  Image as ImageIcon,
  MessageCircle,
  Camera,
  ArrowUpRight,
  TrendingUp,
  Rocket,
  FileText,
  Plus
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { storageService } from "@/services/storageService"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Objective", icon: Target },
  { id: 2, title: "Details", icon: FileText },
  { id: 3, title: "Audience", icon: Users },
  { id: 4, title: "Budget", icon: Wallet },
  { id: 5, title: "Creative", icon: Layout },
  { id: 6, title: "Review", icon: CheckCircle2 },
]

export default function CampaignBuilderPage() {
  const [step, setStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    objective: "Get more messages",
    name: "",
    product: "",
    offer: "",
    location: "Casablanca",
    radius: "15",
    ageRange: "18-45",
    gender: "All",
    budget: "50",
    duration: "7",
    primaryText: "Experience the best flavors in town! 🌟 Limited time offer for our local community.",
    headline: "Special Weekend Offer",
    cta: "Send Message"
  })

  useEffect(() => {
    setMounted(true)

    const business = storageService.getBusiness()
    if (!business) return

    setFormData(prev => ({
      ...prev,
      product: business.businessName || prev.product,
      location: business.city || prev.location,
    }))
  }, [])

  const nextStep = () => {
    if (step === 4) {
        storageService.saveCampaign(formData)
    }
    setStep(s => Math.min(steps.length - 1, s + 1))
  }
  const prevStep = () => setStep(s => Math.max(0, s - 1))

  if (!mounted) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="mb-12">
        <h1 className="heading-lg mb-2">Campaign Builder</h1>
        <p className="text-muted-foreground font-medium">Prepare high-converting <span className="text-primary font-black">Meta Ads</span> in minutes.</p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        <div className="flex justify-between mb-20 relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 -z-10" />
          <motion.div 
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 -z-10 shadow-[0_0_15px_rgba(132,204,22,0.5)]" 
            animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          {steps.map((s, i) => (
            <div 
              key={i} 
              className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 relative ${
                i <= step ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30 scale-110" : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
              <span className={`absolute -bottom-10 text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${i === step ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2"}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="min-h-[550px]"
          >
            <GlassCard className="p-10 md:p-16 border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-[3.5rem]" glow>
               {step === 0 && (
                 <div className="space-y-12">
                    <div className="text-center">
                       <h2 className="heading-md mb-4 uppercase">Choose Campaign Goal</h2>
                       <p className="text-muted-foreground font-medium">Select the objective that matches your growth targets.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {[
                         { label: "Get more messages", icon: MessageSquare, desc: "Best for inquiries" },
                         { label: "Get more calls", icon: Phone, desc: "Direct sales & bookings" },
                         { label: "Website visits", icon: Globe, desc: "Drive online traffic" },
                         { label: "Promote an offer", icon: Tag, desc: "Discounts & flash sales" },
                         { label: "Get more bookings", icon: Calendar, desc: "Fill your schedule" },
                         { label: "Brand awareness", icon: Megaphone, desc: "Local visibility" },
                       ].map(obj => (
                         <button
                           key={obj.label}
                           onClick={() => setFormData({...formData, objective: obj.label})}
                           className={cn(
                             "p-8 rounded-[2.5rem] border flex flex-col items-center text-center gap-6 transition-all duration-500 group",
                             formData.objective === obj.label 
                               ? "bg-primary border-primary text-primary-foreground shadow-2xl shadow-primary/30 scale-105" 
                               : "border-white/5 bg-white/5 hover:bg-white/10"
                           )}
                         >
                            <div className={cn(
                                "p-4 rounded-2xl transition-colors duration-500",
                                formData.objective === obj.label ? "bg-white/20" : "bg-primary/10 text-primary"
                            )}>
                               <obj.icon className="w-8 h-8" />
                            </div>
                            <div>
                               <p className="font-black tracking-tight text-lg uppercase">{obj.label}</p>
                               <p className={cn("text-[10px] font-black uppercase tracking-[0.1em] opacity-40", formData.objective === obj.label ? "text-white/70" : "")}>{obj.desc}</p>
                            </div>
                         </button>
                       ))}
                    </div>
                 </div>
               )}

               {step === 1 && (
                 <div className="space-y-12">
                    <div className="text-center lg:text-left">
                       <h2 className="heading-md mb-4 uppercase">Campaign Details</h2>
                       <p className="text-muted-foreground font-medium">Name your campaign and define your core promotion.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Campaign Name</label>
                          <input 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm uppercase" 
                            placeholder="e.g. Summer Promo 2026"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Product / Service</label>
                          <input 
                            value={formData.product}
                            onChange={e => setFormData({...formData, product: e.target.value})}
                            className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm uppercase" 
                            placeholder="e.g. Traditional Lunch Special"
                          />
                       </div>
                       <div className="col-span-1 md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Main Offer (Optional)</label>
                          <input 
                            value={formData.offer}
                            onChange={e => setFormData({...formData, offer: e.target.value})}
                            className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm" 
                            placeholder="e.g. Get 20% off with coupon 'ZIDUP'"
                          />
                       </div>
                    </div>
                 </div>
               )}

               {step === 2 && (
                 <div className="space-y-12">
                    <div className="text-center lg:text-left">
                       <h2 className="heading-md mb-4 uppercase">Target Audience</h2>
                       <p className="text-muted-foreground font-medium">Define exactly who should see your ads in Morocco.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Location</label>
                          <input 
                            value={formData.location}
                            onChange={e => setFormData({...formData, location: e.target.value})}
                            className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none font-black text-sm" 
                            placeholder="City or Region"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Radius (km)</label>
                          <select 
                            value={formData.radius}
                            onChange={e => setFormData({...formData, radius: e.target.value})}
                            className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none font-black text-sm uppercase"
                          >
                             <option value="5">5 km Radius</option>
                             <option value="15">15 km Radius</option>
                             <option value="40">40 km Radius</option>
                             <option value="80">80 km Radius</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Age Range</label>
                          <select 
                            value={formData.ageRange}
                            onChange={e => setFormData({...formData, ageRange: e.target.value})}
                            className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none font-black text-sm"
                          >
                             <option value="18-35">18 - 35 Years</option>
                             <option value="18-45">18 - 45 Years</option>
                             <option value="25-54">25 - 54 Years</option>
                             <option value="18-65+">18 - 65+ Years</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Gender</label>
                          <div className="flex gap-2 p-1.5 glass border-white/5 rounded-2xl">
                             {["All", "Men", "Women"].map(g => (
                               <button 
                                 key={g}
                                 onClick={() => setFormData({...formData, gender: g})}
                                 className={cn(
                                    "flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                                    formData.gender === g ? 'bg-primary text-primary-foreground shadow-xl' : 'text-muted-foreground hover:text-foreground'
                                 )}
                               >{g}</button>
                             ))}
                          </div>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full gap-3 border-dashed border-primary/20 h-16 font-black bg-primary/5 rounded-[2rem] group">
                       <Sparkles className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                       Optimize Audience with AI
                    </Button>
                 </div>
               )}

               {step === 3 && (
                 <div className="space-y-12">
                    <div className="text-center">
                       <h2 className="heading-md mb-4 uppercase">Budget & Duration</h2>
                       <p className="text-muted-foreground font-medium">Full control over your ad spending.</p>
                    </div>
                    <div className="max-w-xl mx-auto space-y-12">
                       <div className="space-y-6">
                          <div className="flex items-center justify-between ml-1">
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Daily Budget (MAD)</label>
                             <span className="text-2xl font-black text-primary">{formData.budget} MAD</span>
                          </div>
                          <input 
                            type="range" 
                            min="30" 
                            max="1000" 
                            step="10"
                            value={formData.budget}
                            onChange={e => setFormData({...formData, budget: e.target.value})}
                            className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer accent-primary shadow-inner" 
                          />
                          <div className="flex justify-between text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
                             <span>Min: 30 MAD</span>
                             <span>Max: 1000 MAD</span>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <div className="flex items-center justify-between ml-1">
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Duration (Days)</label>
                             <span className="text-2xl font-black text-primary">{formData.duration} Days</span>
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                             {["3", "7", "14", "30"].map(d => (
                               <button 
                                 key={d}
                                 onClick={() => setFormData({...formData, duration: d})}
                                 className={cn(
                                    "py-5 rounded-[1.5rem] border-2 font-black text-lg transition-all duration-300",
                                    formData.duration === d ? 'bg-primary border-primary text-primary-foreground shadow-2xl scale-105' : 'border-white/5 bg-white/5 hover:bg-white/10'
                                 )}
                               >{d}d</button>
                             ))}
                          </div>
                       </div>

                       <div className="p-10 rounded-[3rem] glass border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
                          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                          <div className="text-center sm:text-left relative">
                             <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Total Budget</p>
                             <p className="text-4xl font-black tracking-tighter">{(parseInt(formData.budget) * parseInt(formData.duration)).toLocaleString()} <span className="text-sm opacity-30">MAD</span></p>
                          </div>
                          <div className="text-center sm:text-right relative">
                             <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Est. Monthly Reach</p>
                             <p className="text-3xl font-black text-primary tracking-tighter">{(parseInt(formData.budget) * 50).toLocaleString()} - {(parseInt(formData.budget) * 80).toLocaleString()}</p>
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {step === 4 && (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                       <div>
                          <h2 className="heading-md mb-4 uppercase">Ad Creative</h2>
                          <p className="text-muted-foreground font-medium">How your customers will see your business.</p>
                       </div>
                       
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Primary Text (Caption)</label>
                             <textarea 
                               value={formData.primaryText}
                               onChange={e => setFormData({...formData, primaryText: e.target.value})}
                               className="w-full bg-muted/50 border border-border rounded-[2rem] px-6 py-5 focus:outline-none font-bold text-sm min-h-[160px] leading-relaxed" 
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Headline</label>
                             <input 
                               value={formData.headline}
                               onChange={e => setFormData({...formData, headline: e.target.value})}
                               className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none font-black text-sm uppercase tracking-tight" 
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">CTA Action</label>
                             <select 
                               value={formData.cta}
                               onChange={e => setFormData({...formData, cta: e.target.value})}
                               className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none font-black text-sm uppercase tracking-widest"
                             >
                                <option>Send Message</option>
                                <option>Call Now</option>
                                <option>Learn More</option>
                                <option>Book Now</option>
                                <option>Shop Now</option>
                             </select>
                          </div>
                          <Button variant="outline" className="w-full h-16 border-dashed border-primary/30 rounded-[2rem] font-black gap-3 group">
                             <ImageIcon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                             Upload High-Quality Media
                          </Button>
                       </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-10">Real-Time Preview</p>
                       <div className="w-full max-w-[360px] bg-white dark:bg-[#0f172a] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] text-foreground border border-white/5">
                          <div className="p-5 flex items-center justify-between border-b border-border/50">
                             <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                   <Rocket className="w-6 h-6" />
                                </div>
                                <div>
                                   <p className="text-sm font-black leading-tight uppercase tracking-tight">Atlas Cafe</p>
                                   <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Sponsored • <Globe className="inline w-2.5 h-2.5 ml-1" /></p>
                                </div>
                             </div>
                             <MoreVertical className="w-5 h-5 opacity-30" />
                          </div>
                          <div className="px-5 py-4 text-sm leading-relaxed font-medium">
                             {formData.primaryText}
                          </div>
                          <div className="aspect-[4/5] bg-muted flex flex-col items-center justify-center gap-4 relative">
                             <ImageIcon className="w-16 h-16 text-muted-foreground opacity-10" />
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20">Media Preview Area</span>
                          </div>
                          <div className="p-5 flex items-center justify-between border-t border-border/50 bg-muted/20">
                             <div className="flex-1 mr-4">
                                <p className="text-[9px] uppercase font-black opacity-30 tracking-[0.2em] mb-1">Facebook Ad</p>
                                <p className="text-sm font-black tracking-tighter uppercase line-clamp-1">{formData.headline}</p>
                             </div>
                             <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.1em] shadow-xl shadow-primary/20 active:scale-95 transition-transform">
                                {formData.cta}
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {step === 5 && (
                 <div className="space-y-16">
                    <div className="text-center">
                       <h2 className="heading-lg mb-4 uppercase">Final Review</h2>
                       <p className="text-muted-foreground font-medium">Review your growth strategy before going live.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                       <div className="lg:col-span-2 space-y-8">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             {[
                               { label: "Objective", val: formData.objective, icon: Target, col: "text-primary", bg: "bg-primary/5" },
                               { label: "Total Budget", val: `${parseInt(formData.budget) * parseInt(formData.duration)} MAD`, icon: Wallet, col: "text-secondary", bg: "bg-secondary/5" },
                               { label: "Audience", val: `${formData.location} • ${formData.ageRange}`, icon: Users, col: "text-blue-500", bg: "bg-blue-500/5" },
                               { label: "Reach", val: `${(parseInt(formData.budget) * 50).toLocaleString()} - ${(parseInt(formData.budget) * 80).toLocaleString()}`, icon: TrendingUp, col: "text-green-500", bg: "bg-green-500/5" },
                             ].map((m, i) => (
                               <div key={i} className={cn("p-8 rounded-[2.5rem] glass border-white/5", m.bg)}>
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-3">{m.label}</p>
                                  <div className={cn("flex items-center gap-3 font-black text-xl tracking-tight", m.col)}>
                                     <m.icon className="w-6 h-6 shrink-0" />
                                     <span>{m.val}</span>
                                  </div>
                               </div>
                             ))}
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                             {[
                               { label: "AI Copy", icon: Sparkles },
                               { label: "Audience+", icon: Users },
                               { label: "Budget+", icon: Zap },
                               { label: "Variations", icon: Layout },
                             ].map((ai, i) => (
                               <button key={i} className="glass p-5 rounded-3xl border-white/5 flex flex-col items-center gap-3 hover:bg-primary/10 transition-all duration-300 group">
                                  <ai.icon className="w-6 h-6 text-primary group-hover:scale-125 group-hover:rotate-12 transition-all" />
                                  <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100">{ai.label}</span>
                               </button>
                             ))}
                          </div>
                       </div>

                       <div>
                          <GlassCard className="p-10 rounded-[3.5rem] border-primary/30 bg-primary/5 h-full flex flex-col justify-between text-center relative overflow-hidden" glow>
                             <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                             <div>
                                <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-primary shadow-xl shadow-primary/10">
                                   <Zap className="w-10 h-10 fill-current" />
                                </div>
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Ready to Boost?</h3>
                                <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-10 px-4">
                                   Your campaign is highly optimized for the <span className="text-primary font-black uppercase">Casablanca</span> region. Expert AI suggests launching now for peak engagement.
                                </p>
                             </div>
                             <Button size="xl" className="w-full rounded-[2rem] font-black text-xl gap-4 shadow-[0_20px_50px_rgba(132,204,22,0.4)] group">
                                Launch Ad
                                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                             </Button>
                          </GlassCard>
                       </div>
                    </div>
                 </div>
               )}

               <div className="mt-20 flex justify-between gap-6 border-t border-border/30 pt-10">
                  <Button 
                    variant="ghost" 
                    onClick={prevStep}
                    disabled={step === 0}
                    className="gap-3 h-14 font-black px-10 rounded-2xl uppercase tracking-widest text-[10px]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </Button>
                  
                  {step < steps.length - 1 ? (
                    <Button onClick={nextStep} className="gap-3 px-16 h-14 font-black shadow-2xl shadow-primary/20 rounded-2xl uppercase tracking-[0.2em] text-[10px]">
                      Next Step
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  ) : null}
               </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}

import { MoreVertical } from "lucide-react"
