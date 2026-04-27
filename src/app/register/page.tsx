"use client"

import { AuthLayout } from "@/components/layout/AuthLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, Building2, Briefcase, Loader2, ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"
import { authService } from "@/services/authService"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    businessName: "",
    businessType: "",
    password: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      authService.registerUser(
        formData.fullName,
        formData.email,
        formData.password,
        formData.businessName
      )
      router.push("/onboarding")
    }, 1500)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <AuthLayout 
      title="Start for free" 
      subtitle="Join 2,000+ businesses growing smarter on Zidup. No credit card required."
    >
      <GlassCard className="p-10 border-white/5 shadow-2xl rounded-[3rem]">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  required
                  type="text" 
                  value={formData.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Business Name</label>
              <div className="relative">
                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  required
                  type="text" 
                  value={formData.businessName}
                  onChange={e => handleChange('businessName', e.target.value)}
                  placeholder="My Store"
                  className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Business Type</label>
              <div className="relative">
                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select 
                  required
                  value={formData.businessType}
                  onChange={e => handleChange('businessType', e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none font-black text-[10px] uppercase tracking-widest appearance-none"
                >
                  <option value="" disabled>Select type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="wellness">Wellness Center</option>
                  <option value="car-rental">Car Rental</option>
                  <option value="beauty">Beauty Salon</option>
                  <option value="gym">Gym</option>
                  <option value="ecommerce">Ecommerce</option>
                  <option value="agency">Agency</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Choose Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={e => handleChange('password', e.target.value)}
                placeholder="••••••••"
                className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm"
              />
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground font-medium px-1">
             By signing up, you agree to our <Link href="#" className="text-foreground underline">Terms of Service</Link> and <Link href="#" className="text-foreground underline">Privacy Policy</Link>.
          </p>

          <Button 
            type="submit" 
            className="w-full h-16 font-black text-lg gap-3 shadow-2xl shadow-primary/20 rounded-2xl group"
            isLoading={isLoading}
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Create Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="mt-12 text-center">
           <p className="text-sm font-bold text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-black uppercase tracking-widest hover:underline ml-1">
                 Sign in
              </Link>
           </p>
        </div>
      </GlassCard>
    </AuthLayout>
  )
}
