"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { 
  Sparkles, 
  Copy, 
  Calendar, 
  Megaphone, 
  RefreshCw, 
  CheckCircle2, 
  Loader2,
  PenTool,
  Image as ImageIcon,
  Clock,
  Video,
  Hash,
  MessageSquare,
  ArrowRight
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { storageService } from "@/services/storageService"
import { cn } from "@/lib/utils"

export default function ContentGeneratorPage() {
  const [mounted, setMounted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasResult, setHasResult] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [formData, setFormData] = useState({
    businessType: "Restaurant",
    product: "",
    city: "Casablanca",
    goal: "Get messages",
    language: "Moroccan Darija",
    tone: "Friendly",
    platform: "Both",
    contentType: "Caption"
  })

  useEffect(() => {
    setMounted(true)

    const business = storageService.getBusiness()
    if (!business) return

    setFormData(prev => ({
      ...prev,
      businessType: business.businessType || prev.businessType,
      city: business.city || prev.city,
      language: business.languages?.[0] || prev.language,
      tone: business.brandVoice || prev.tone,
    }))
  }, [])

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setHasResult(false)
    
    // Mock generation delay
    setTimeout(() => {
      const result = {
        ...formData,
        caption: `Salam ${formData.city}! 🌟\n\nBaghi tzid f l'engagement dyal l'page dyalk? 🚀\n\nHna f ${formData.businessType} dyalna, mwejdin likom ${formData.product || "wahed l'offre sbechial"} makhsouss likom. Makatkhallsh ghir l'makla, katkhalls l'tjrba!`,
        hashtags: `#Maroc #${formData.city} #${formData.businessType.toLowerCase()} #ZidupGrowth`,
        visualIdea: "Show a close-up slow motion of the Tajine steam with local Moroccan music in background.",
        bestTime: "Today at 7:00 PM (High engagement predicted)",
        createdAt: new Date().toISOString()
      }
      const saved = storageService.saveContent(result)
      setGeneratedContent(saved)
      setIsGenerating(false)
      setHasResult(true)
    }, 2000)
  }

  if (!mounted) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="mb-12">
        <h1 className="heading-lg mb-2">Content Generator</h1>
        <p className="text-muted-foreground font-medium">Create high-performing content using <span className="text-primary font-black">Zidup AI</span>.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Side: Form */}
        <GlassCard className="p-10 border-white/5 shadow-2xl rounded-[3rem]">
          <form className="space-y-8" onSubmit={handleGenerate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Business Type</label>
                <select 
                  className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm uppercase"
                  value={formData.businessType}
                  onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                >
                  <option>Restaurant</option>
                  <option>Wellness Center</option>
                  <option>Car Rental</option>
                  <option>Beauty Salon</option>
                  <option>Ecommerce</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">City</label>
                <input 
                  type="text" 
                  className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm"
                  placeholder="e.g. Casablanca"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Product or Service</label>
              <textarea 
                className="w-full bg-muted/50 border border-border rounded-[2rem] px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm min-h-[120px] leading-relaxed"
                placeholder="What are you promoting? e.g. Special weekend tajine with free tea"
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Goal</label>
                  <select 
                    className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:outline-none font-black text-sm uppercase"
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  >
                    <option>Get messages</option>
                    <option>Get calls</option>
                    <option>Promote offer</option>
                    <option>Build awareness</option>
                    <option>Sell product</option>
                    <option>Get bookings</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Language</label>
                  <select 
                    className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:outline-none font-black text-sm uppercase"
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                  >
                    <option>Moroccan Darija</option>
                    <option>Arabic</option>
                    <option>French</option>
                    <option>English</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1 text-center block mb-4">Choose Content Type</label>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Caption", "Reel idea", "Story idea", 
                    "Carousel idea", "Hashtags", "Ad copy"
                  ].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, contentType: type})}
                      className={cn(
                        "px-4 py-3.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                        formData.contentType === type 
                          ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105" 
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {type}
                    </button>
                  ))}
               </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 font-black text-lg gap-3 shadow-2xl shadow-primary/20 rounded-[2rem] group"
              isLoading={isGenerating}
            >
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Generate Content
            </Button>
          </form>
        </GlassCard>

        {/* Right Side: Results */}
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            {!hasResult && !isGenerating && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="h-[650px] flex flex-col items-center justify-center text-center p-12 glass border-dashed border-white/10 rounded-[3.5rem]"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mb-8">
                   <PenTool className="w-10 h-10 text-primary" />
                </div>
                <h3 className="heading-md mb-4 uppercase">Ready to create?</h3>
                <p className="text-muted-foreground font-medium max-w-xs leading-relaxed">Fill the form and let Zidup AI craft your professional social media content.</p>
              </motion.div>
            )}

            {isGenerating && (
               <motion.div 
                 key="loading"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="h-[650px] flex flex-col items-center justify-center text-center p-12 glass rounded-[3.5rem]"
               >
                 <div className="relative mb-12">
                    <div className="w-28 h-28 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 text-primary animate-pulse" />
                 </div>
                 <h3 className="heading-md mb-4 uppercase">Analyzing Business...</h3>
                 <p className="text-muted-foreground font-medium animate-pulse tracking-widest uppercase text-[10px]">Zidup is crafting magic for you</p>
               </motion.div>
            )}

            {hasResult && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="space-y-8"
              >
                <GlassCard className="p-10 border-white/5 relative overflow-hidden rounded-[3.5rem]" glow>
                   <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                         <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                            <MessageSquare className="w-6 h-6" />
                         </div>
                         <div>
                            <h3 className="text-xl font-black tracking-tight uppercase">AI Result</h3>
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{formData.language} • {formData.tone} Tone</p>
                         </div>
                      </div>
                      <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">High Impact</span>
                   </div>

                   <div className="bg-muted/40 p-8 rounded-[2.5rem] border border-border font-medium leading-relaxed mb-8 shadow-inner relative group">
                      <button className="absolute top-4 right-4 p-2 rounded-xl bg-background opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white shadow-xl">
                         <Copy className="w-4 h-4" />
                      </button>
                      <p className="whitespace-pre-line text-lg tracking-tight">
                        {generatedContent.caption}
                      </p>
                      <div className="mt-8 pt-8 border-t border-border flex flex-wrap gap-2">
                         <span className="text-primary font-black tracking-tight">{generatedContent.hashtags}</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      <div className="p-6 rounded-[2rem] glass border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                         <div className="flex items-center gap-3 mb-3 text-primary">
                            <ImageIcon className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Visual Guide</span>
                         </div>
                         <p className="text-xs font-bold leading-relaxed">{generatedContent.visualIdea}</p>
                      </div>
                      <div className="p-6 rounded-[2rem] glass border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                         <div className="flex items-center gap-3 mb-3 text-secondary">
                            <Clock className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Best Timing</span>
                         </div>
                         <p className="text-xs font-bold text-secondary leading-relaxed">{generatedContent.bestTime}</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                      {[
                        { label: "Copy", icon: Copy, color: "hover:bg-primary" },
                        { label: "Plan", icon: Calendar, color: "hover:bg-blue-500" },
                        { label: "Ad Tool", icon: Megaphone, color: "hover:bg-secondary" },
                        { label: "Regen", icon: RefreshCw, color: "hover:bg-primary", action: handleGenerate },
                      ].map((btn, i) => (
                        <button key={i} onClick={btn.action} className="flex flex-col items-center gap-3 group">
                           <div className={cn("w-14 h-14 rounded-2xl glass border-white/10 flex items-center justify-center transition-all duration-300 group-hover:text-white group-hover:shadow-xl group-hover:-translate-y-1", btn.color)}>
                              <btn.icon className="w-5 h-5" />
                           </div>
                           <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100">{btn.label}</span>
                        </button>
                      ))}
                   </div>
                </GlassCard>
                
                <div className="flex items-center gap-5 p-8 glass border-white/5 rounded-[2.5rem] bg-green-500/5">
                   <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-lg shadow-green-500/10">
                      <CheckCircle2 className="w-7 h-7" />
                   </div>
                   <p className="text-sm font-black tracking-tight leading-snug">
                      This content is optimized for <span className="text-primary uppercase">Engagement</span> and matches your <span className="text-primary uppercase">{formData.tone}</span> brand voice.
                   </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  )
}
