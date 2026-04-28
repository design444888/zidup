"use client"

import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { 
  User, 
  Building2, 
  Sparkles, 
  Share2, 
  CreditCard, 
  AlertTriangle,
  Camera,
  MessageCircle,
  Target,
  Save,
  Rocket,
  ShieldCheck,
  Mail,
  MapPin,
  Globe,
  Bell,
  CheckCircle2,
  Link2,
  Unplug
} from "lucide-react"
import { useState, useEffect } from "react"
import { storageService } from "@/services/storageService"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ConnectionKey = "facebookPage" | "instagramAccount" | "metaAdAccount"

interface DemoConnection {
  connected: boolean
  accountName: string
}

type DemoConnections = Record<ConnectionKey, DemoConnection>

const defaultConnections: DemoConnections = {
  facebookPage: { connected: false, accountName: "" },
  instagramAccount: { connected: false, accountName: "" },
  metaAdAccount: { connected: false, accountName: "" },
}

const connectionCards: Array<{
  key: ConnectionKey
  label: string
  icon: typeof MessageCircle
  color: string
  desc: string
  demoAccountName: string
}> = [
  {
    key: "facebookPage",
    label: "Facebook Page",
    icon: MessageCircle,
    color: "text-blue-500",
    desc: "Sync posts & metrics",
    demoAccountName: "Atlas Cafe",
  },
  {
    key: "instagramAccount",
    label: "Instagram Account",
    icon: Camera,
    color: "text-pink-500",
    desc: "Direct posting & Reels",
    demoAccountName: "@atlascafe.ma",
  },
  {
    key: "metaAdAccount",
    label: "Meta Ad Account",
    icon: Target,
    color: "text-primary",
    desc: "Campaign management",
    demoAccountName: "Demo Ad Account",
  },
]

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [business, setBusiness] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [connections, setConnections] = useState<DemoConnections>(defaultConnections)
  const [selectedConnectionKey, setSelectedConnectionKey] = useState<ConnectionKey | null>(null)

  useEffect(() => {
    setUser(storageService.getUser() || {})
    setBusiness(storageService.getBusiness() || {})

    const savedSettings = storageService.getSettings() || {}
    const savedConnections = savedSettings.demoConnections as Partial<DemoConnections> | undefined

    if (savedConnections) {
      setConnections({
        facebookPage: savedConnections.facebookPage || defaultConnections.facebookPage,
        instagramAccount:
          savedConnections.instagramAccount || defaultConnections.instagramAccount,
        metaAdAccount: savedConnections.metaAdAccount || defaultConnections.metaAdAccount,
      })
    }
  }, [])

  const selectedConnection = selectedConnectionKey
    ? connectionCards.find((connection) => connection.key === selectedConnectionKey) || null
    : null

  const handleOpenConnectionModal = (connectionKey: ConnectionKey) => {
    setSelectedConnectionKey(connectionKey)
  }

  const handleCloseConnectionModal = () => {
    setSelectedConnectionKey(null)
  }

  const handleConnectDemoAccount = () => {
    if (!selectedConnection) return

    const nextConnections = {
      ...connections,
      [selectedConnection.key]: {
        connected: true,
        accountName: selectedConnection.demoAccountName,
      },
    }

    setConnections(nextConnections)
    storageService.updateSettings({ demoConnections: nextConnections })
    handleCloseConnectionModal()
  }

  const handleDisconnect = (connectionKey: ConnectionKey) => {
    const nextConnections = {
      ...connections,
      [connectionKey]: {
        connected: false,
        accountName: "",
      },
    }

    setConnections(nextConnections)
    storageService.updateSettings({ demoConnections: nextConnections })
  }

  const handleSave = () => {
    storageService.saveUser(user)
    storageService.saveBusiness(business)
    storageService.updateSettings({ demoConnections: connections })
    alert("Settings saved successfully!")
  }

  if (!user || !business) return null

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "business", label: "Business", icon: Building2 },
    { id: "brand", label: "Brand Strategy", icon: Sparkles },
    { id: "social", label: "Connections", icon: Share2 },
    { id: "billing", label: "Plan & Billing", icon: CreditCard },
  ]

  return (
    <DashboardLayout>
      <div className="mb-12">
        <h1 className="heading-lg mb-2">Settings</h1>
        <p className="text-muted-foreground font-medium">Manage your personal and business presence on Zidup.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Navigation Tabs */}
        <aside className="w-full lg:w-72 space-y-2">
           {tabs.map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300",
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105" 
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
               )}
             >
                <tab.icon className="w-5 h-5" />
                {tab.label}
             </button>
           ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 max-w-3xl space-y-12">
          {activeTab === "profile" && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
               <GlassCard className="p-10 border-white/5 shadow-2xl rounded-[3rem]">
                  <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-10">
                     <div className="relative group">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-muted flex items-center justify-center border-2 border-dashed border-border group-hover:border-primary transition-all duration-500 cursor-pointer overflow-hidden shadow-inner">
                           <User className="w-12 h-12 text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                           <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                              <Camera className="w-8 h-8 text-primary drop-shadow-lg" />
                           </div>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-center mt-4 opacity-40 group-hover:opacity-100 transition-opacity">Change Avatar</p>
                     </div>
                     <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Full Name</label>
                           <input 
                             className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-4 focus:outline-none font-bold text-sm" 
                             value={user.fullName || ""} 
                             onChange={e => setUser({...user, fullName: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Email address</label>
                           <div className="relative">
                              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input 
                                className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none font-bold text-sm" 
                                value={user.email || ""} 
                                onChange={e => setUser({...user, email: e.target.value})}
                              />
                           </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Bio / Personal Motto</label>
                           <textarea 
                             className="w-full bg-muted/50 border border-border rounded-[2rem] px-6 py-4 focus:outline-none font-bold text-sm min-h-[100px]" 
                             placeholder="I grow brands smarter..."
                           />
                        </div>
                     </div>
                  </div>
                  <div className="p-6 rounded-[2rem] glass border-primary/20 bg-primary/5 flex items-center gap-6">
                     <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-relaxed">
                        Your account is verified and secured with <span className="text-primary">Zidup SafeGuard</span>.
                     </p>
                  </div>
               </GlassCard>
            </motion.section>
          )}

          {activeTab === "business" && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
               <GlassCard className="p-10 border-white/5 shadow-2xl rounded-[3rem]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Business Name</label>
                        <div className="relative">
                           <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                           <input 
                              className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none font-bold text-sm" 
                              value={business.businessName || ""} 
                              onChange={e => setBusiness({...business, businessName: e.target.value})}
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Business Type</label>
                        <select className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-4 focus:outline-none font-black text-sm uppercase">
                           <option>Restaurant</option>
                           <option>Wellness Center</option>
                           <option>E-commerce</option>
                           <option>Car Rental</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">City</label>
                        <div className="relative">
                           <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                           <input 
                              className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none font-bold text-sm" 
                              value={business.city || ""} 
                              onChange={e => setBusiness({...business, city: e.target.value})}
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Website</label>
                        <div className="relative">
                           <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                           <input 
                              className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-6 py-4 focus:outline-none font-bold text-sm" 
                              placeholder="www.yourbusiness.com"
                           />
                        </div>
                     </div>
                  </div>
               </GlassCard>
            </motion.section>
          )}

          {activeTab === "brand" && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
               <GlassCard className="p-10 border-white/5 shadow-2xl rounded-[3rem]">
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Brand Voice</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {["Professional", "Friendly", "Funny", "Luxury"].map(v => (
                             <button
                               key={v}
                               onClick={() => setBusiness({...business, brandVoice: v})}
                               className={cn(
                                  "py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all",
                                  business.brandVoice === v ? "bg-primary border-primary text-primary-foreground shadow-xl" : "border-border hover:bg-muted"
                               )}
                             >{v}</button>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Target Audience Summary</label>
                        <textarea 
                           className="w-full bg-muted/50 border border-border rounded-[2rem] px-6 py-5 focus:outline-none font-bold text-sm min-h-[120px] leading-relaxed" 
                           placeholder="Who are your ideal customers? Where do they hang out?"
                           value={business.targetCity || ""} 
                           onChange={e => setBusiness({...business, targetCity: e.target.value})}
                        />
                     </div>
                  </div>
               </GlassCard>
            </motion.section>
          )}

          {activeTab === "social" && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {connectionCards.map((acc) => {
                    const connectionState = connections[acc.key]
                    const isConnected = connectionState.connected

                    return (
                    <GlassCard key={acc.key} className="p-8 border-white/5 hover:border-primary/20 transition-all flex flex-col items-center text-center group" interactive>
                       <div className={cn("w-16 h-16 rounded-[2rem] bg-muted flex items-center justify-center group-hover:scale-110 transition-all duration-500 mb-6", acc.color)}>
                          <acc.icon className="w-8 h-8" />
                       </div>
                       <div>
                          <div className="mb-2 flex items-center justify-center gap-2">
                            <p className="font-black text-lg tracking-tighter uppercase">{acc.label}</p>
                            {isConnected ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/12 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-emerald-400 shadow-[0_10px_24px_-18px_rgba(16,185,129,0.55)]">
                                <CheckCircle2 className="h-3 w-3" />
                                Connected
                              </span>
                            ) : null}
                          </div>
                          <p className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-8">{acc.desc}</p>
                          <div className="mb-6 min-h-12 rounded-[1.5rem] border border-white/5 bg-background/40 px-4 py-3">
                            <p className="text-[9px] font-black uppercase tracking-[0.18em] opacity-40">
                              Status
                            </p>
                            <p className="mt-2 text-sm font-bold tracking-tight text-foreground">
                              {isConnected ? connectionState.accountName : "Not Connected"}
                            </p>
                          </div>
                       </div>
                       <div className="mt-auto flex w-full flex-col gap-3">
                         <Button
                           variant={isConnected ? "secondary" : "outline"}
                           className="h-12 w-full rounded-xl font-black text-[10px] uppercase tracking-widest border-white/5"
                           onClick={() => {
                             if (!isConnected) {
                               handleOpenConnectionModal(acc.key)
                             }
                           }}
                           aria-label={
                             isConnected
                               ? `${acc.label} connected`
                               : `Connect demo ${acc.label}`
                           }
                         >
                           <Link2 className="mr-2 h-4 w-4" />
                           {isConnected ? "Connected" : "Connect Now"}
                         </Button>
                         {isConnected ? (
                           <Button
                             variant="ghost"
                             className="h-11 w-full rounded-xl font-black text-[10px] uppercase tracking-widest text-muted-foreground hover:text-red-400"
                             onClick={() => handleDisconnect(acc.key)}
                             aria-label={`Disconnect ${acc.label}`}
                           >
                             <Unplug className="mr-2 h-4 w-4" />
                             Disconnect
                           </Button>
                         ) : null}
                       </div>
                    </GlassCard>
                  )})}
               </div>
            </motion.section>
          )}

          {activeTab === "billing" && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
               <GlassCard className="p-12 border-primary/20 bg-primary/5 rounded-[3.5rem] relative overflow-hidden" glow>
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 blur-[80px] rounded-full" />
                  <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative">
                     <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-[2rem] bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/30">
                           <Rocket className="w-10 h-10" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Active Plan</p>
                           <h3 className="text-4xl font-black tracking-tighter uppercase">Pro Member</h3>
                           <p className="text-sm font-bold text-muted-foreground mt-2 flex items-center gap-2">
                              <Bell className="w-4 h-4 text-primary" />
                              Renews May 12, 2026
                           </p>
                        </div>
                     </div>
                     <Button className="h-16 px-10 rounded-[2rem] font-black shadow-2xl shadow-primary/20 text-lg">Manage Subscription</Button>
                  </div>
               </GlassCard>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard className="p-8 border-white/5 bg-white/5 flex items-center justify-between">
                     <div>
                        <p className="text-[9px] font-black uppercase opacity-40 mb-1">Payment Method</p>
                        <p className="font-black text-sm tracking-tight uppercase">Visa ending in 4242</p>
                     </div>
                     <Button variant="ghost" size="sm" className="font-black text-primary text-[10px] uppercase">Edit</Button>
                  </GlassCard>
                  <GlassCard className="p-8 border-white/5 bg-white/5 flex items-center justify-between">
                     <div>
                        <p className="text-[9px] font-black uppercase opacity-40 mb-1">Billing History</p>
                        <p className="font-black text-sm tracking-tight uppercase">April 2026 Invoice</p>
                     </div>
                     <Button variant="ghost" size="sm" className="font-black text-primary text-[10px] uppercase">View</Button>
                  </GlassCard>
               </div>
            </motion.section>
          )}

          <div className="pt-12 flex justify-end">
             <Button onClick={handleSave} className="h-16 px-12 font-black text-xl gap-4 shadow-[0_20px_50px_rgba(132,204,22,0.4)] rounded-[2rem] group">
                <Save className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Save All Changes
             </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={Boolean(selectedConnection)}
        onClose={handleCloseConnectionModal}
        title={selectedConnection ? `Connect ${selectedConnection.label}` : undefined}
        className="max-w-xl"
      >
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-primary/15 bg-primary/6 p-6">
            <p className="text-base font-semibold leading-8 text-foreground">
              Real Meta API integration will be added later. For now, you can
              connect a demo account to preview the Zidup experience.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="h-12 rounded-2xl px-6 font-black text-[10px] uppercase tracking-[0.16em]"
              onClick={handleCloseConnectionModal}
            >
              Cancel
            </Button>
            <Button
              className="h-12 rounded-2xl px-6 font-black text-[10px] uppercase tracking-[0.16em]"
              onClick={handleConnectDemoAccount}
            >
              Connect Demo Account
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  )
}
