"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { 
  Building2, 
  MapPin, 
  Globe, 
  Target, 
  Users, 
  Sparkles, 
  Rocket, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Camera,
  MessageCircle,
  Phone,
  Zap,
  Briefcase
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"
import { storageService } from "@/services/storageService"

const steps = [
  { id: 1, title: "Business Info", icon: Building2 },
  { id: 2, title: "Audience", icon: Users },
  { id: 3, title: "Goals", icon: Target },
  { id: 4, title: "Brand Voice", icon: Sparkles },
  { id: 5, title: "Finish", icon: CheckCircle2 }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    city: "",
    country: "Morocco",
    website: "",
    instagram: "",
    facebook: "",
    targetCity: "",
    ageRange: "",
    languages: [] as string[],
    customerType: [] as string[],
    goals: [] as string[],
    brandVoice: ""
  })

  useEffect(() => {
    setMounted(true)

    const user = storageService.getUser()
    if (!user) return

    setFormData(prev => ({
      ...prev,
      businessName: user.businessName || prev.businessName,
    }))
  }, [])

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: 'languages' | 'customerType' | 'goals', item: string) => {
    setFormData(prev => {
      const current = prev[field] as string[]
      const updated = current.includes(item) 
        ? current.filter(i => i !== item)
        : [...current, item]
      return { ...prev, [field]: updated }
    })
  }

  const nextStep = () => {
    if (step === 4) {
      storageService.saveBusiness(formData)
      router.push("/dashboard")
      return
    }
    setStep(s => Math.min(steps.length - 1, s + 1))
  }
  const prevStep = () => setStep(s => Math.max(0, s - 1))

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground overflow-hidden">
      <div className="gradient-glow" />
      
      {/* Header */}
      <header className="h-24 flex items-center justify-between px-8 max-w-7xl mx-auto z-20 relative">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
              <Rocket className="text-primary-foreground w-5 h-5" />
           </div>
           <span className="text-2xl font-black tracking-tighter uppercase">Zidup</span>
        </div>
        <ThemeToggle />
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
        {/* Step Indicator */}
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            <GlassCard className="p-10 md:p-16 border-white/5 shadow-2xl rounded-[3.5rem]" glow>
              {step === 0 && (
                <div className="space-y-12">
                   <div className="text-center lg:text-left">
                      <h2 className="heading-md mb-4 uppercase">Tell us about your business</h2>
                      <p className="text-muted-foreground font-medium">This helps our AI generate better content and target the right people.</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Business Name</label>
                         <div className="relative">
                            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input 
                              value={formData.businessName}
                              onChange={e => updateFormData('businessName', e.target.value)}
                              className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm uppercase" 
                              placeholder="e.g. Atlas Cafe"
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Business Type</label>
                         <div className="relative">
                            <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <select 
                              value={formData.businessType}
                              onChange={e => updateFormData('businessType', e.target.value)}
                              className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-5 focus:outline-none font-black text-sm uppercase"
                            >
                               <option value="">Select Category</option>
                               <option value="Restaurant">Restaurant</option>
                               <option value="Wellness Center">Hijama / Wellness Center</option>
                               <option value="Car Rental">Car Rental</option>
                               <option value="Beauty Salon">Beauty Salon</option>
                               <option value="Ecommerce">Ecommerce</option>
                            </select>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">City</label>
                         <div className="relative">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input 
                              value={formData.city}
                              onChange={e => updateFormData('city', e.target.value)}
                              className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-5 focus:outline-none font-black text-sm uppercase" 
                              placeholder="e.g. Casablanca"
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Website (Optional)</label>
                         <div className="relative">
                            <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input 
                              value={formData.website}
                              onChange={e => updateFormData('website', e.target.value)}
                              className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-5 focus:outline-none font-black text-sm" 
                              placeholder="www.yourlink.com"
                           />
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-12">
                   <div className="text-center lg:text-left">
                      <h2 className="heading-md mb-4 uppercase">Who is your audience?</h2>
                      <p className="text-muted-foreground font-medium">Define your ideal customers so we can target them smarter.</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Target City</label>
                         <input 
                            value={formData.targetCity}
                            onChange={e => updateFormData('targetCity', e.target.value)}
                            className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none font-black text-sm" 
                            placeholder="e.g. Whole Morocco"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Age Range</label>
                         <select 
                            value={formData.ageRange}
                            onChange={e => updateFormData('ageRange', e.target.value)}
                            className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-5 focus:outline-none font-black text-sm"
                         >
                            <option value="">Select Range</option>
                            <option value="18-35">Young adults (18-35)</option>
                            <option value="25-54">Professionals (25-54)</option>
                            <option value="18-65+">Everyone (18-65+)</option>
                         </select>
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Customer Languages</label>
                         <div className="flex flex-wrap gap-3">
                            {["Moroccan Darija", "Arabic", "French", "English"].map(lang => (
                              <button
                                key={lang}
                                onClick={() => toggleArrayItem('languages', lang)}
                                className={cn(
                                   "px-6 py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all duration-300",
                                   formData.languages.includes(lang) ? "bg-primary border-primary text-primary-foreground shadow-xl scale-105" : "border-border hover:bg-muted"
                                )}
                              >{lang}</button>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-12">
                   <div className="text-center lg:text-left">
                      <h2 className="heading-md mb-4 uppercase">What are your goals?</h2>
                      <p className="text-muted-foreground font-medium">Select multiple objectives for your content strategy.</p>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { id: "messages", label: "Get more messages", icon: MessageCircle, color: "text-primary" },
                        { id: "calls", label: "Get more calls", icon: Phone, color: "text-blue-500" },
                        { id: "reach", label: "Increase page reach", icon: Zap, color: "text-yellow-500" },
                        { id: "offers", label: "Promote an offer", icon: Sparkles, color: "text-secondary" },
                        { id: "bookings", label: "Get more bookings", icon: Target, color: "text-red-500" },
                        { id: "brand", label: "Build brand awareness", icon: Rocket, color: "text-orange-500" },
                      ].map(goal => (
                        <button
                          key={goal.id}
                          onClick={() => toggleArrayItem('goals', goal.label)}
                          className={cn(
                            "flex items-center gap-5 p-8 rounded-[2.5rem] border text-left transition-all duration-500 group relative overflow-hidden",
                            formData.goals.includes(goal.label) 
                              ? "bg-primary border-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-105" 
                              : "border-white/5 bg-white/5 hover:bg-white/10"
                          )}
                        >
                           <div className={cn(
                             "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 shadow-lg",
                             formData.goals.includes(goal.label) ? "bg-white/20" : "bg-muted " + goal.color
                           )}>
                              <goal.icon className="w-6 h-6" />
                           </div>
                           <span className="font-black tracking-tight text-lg uppercase">{goal.label}</span>
                           {formData.goals.includes(goal.label) && <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-white opacity-40" />}
                        </button>
                      ))}
                   </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-12">
                   <div className="text-center lg:text-left">
                      <h2 className="heading-md mb-4 uppercase">Choose your brand voice</h2>
                      <p className="text-muted-foreground font-medium">How should Zidup AI talk to your customers?</p>
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: "Professional", icon: Rocket },
                        { label: "Friendly", icon: MessageCircle },
                        { label: "Luxury", icon: Sparkles },
                        { label: "Funny", icon: Zap },
                        { label: "Traditional", icon: Building2 },
                        { label: "Modern", icon: Rocket },
                      ].map(voice => (
                        <button
                          key={voice.label}
                          onClick={() => updateFormData('brandVoice', voice.label)}
                          className={cn(
                            "flex flex-col items-center justify-center gap-6 p-8 rounded-[2.5rem] border text-center transition-all duration-500 group h-[200px]",
                            formData.brandVoice === voice.label 
                              ? "bg-primary border-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-105" 
                              : "border-white/5 bg-white/5 hover:bg-white/10"
                          )}
                        >
                           <div className={cn(
                              "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-12",
                              formData.brandVoice === voice.label ? "bg-white/20" : "bg-primary/10 text-primary shadow-xl shadow-primary/5"
                           )}>
                              <voice.icon className="w-8 h-8" />
                           </div>
                           <span className="font-black text-sm uppercase tracking-widest">{voice.label}</span>
                        </button>
                      ))}
                   </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-12">
                   <div className="text-center">
                      <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/10">
                         <Rocket className="w-12 h-12 text-primary animate-bounce" />
                      </div>
                      <h2 className="heading-lg mb-4 uppercase">You're ready to grow!</h2>
                      <p className="text-muted-foreground font-medium">Everything is set. Let's head to your dashboard and start creating magic.</p>
                   </div>
                   <GlassCard className="p-10 rounded-[3rem] border-primary/20 bg-primary/5 max-w-xl mx-auto">
                      <div className="space-y-6">
                         {[
                           { label: "Business", val: formData.businessName },
                           { label: "City", val: formData.city },
                           { label: "Goals", val: formData.goals.slice(0, 2).join(', ') + '...' },
                           { label: "Voice", val: formData.brandVoice },
                         ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center border-b border-primary/10 pb-4 last:border-0 last:pb-0">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{item.label}</span>
                              <span className="font-black text-sm uppercase tracking-tight">{item.val}</span>
                           </div>
                         ))}
                      </div>
                   </GlassCard>
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
                
                <Button onClick={nextStep} className="gap-3 px-16 h-14 font-black shadow-2xl shadow-primary/20 rounded-2xl uppercase tracking-[0.2em] text-[10px]">
                  {step === 4 ? "Launch Dashboard" : "Next Step"}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
    </main>
  )
}
