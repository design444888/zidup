"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  MessageCircle,
  Camera,
  Video, 
  Layout, 
  MessageSquare,
  Sparkles,
  MoreVertical,
  Clock,
  Trash2,
  Copy,
  Megaphone,
  CheckCircle2,
  FileText,
  Zap
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { storageService } from "@/services/storageService"

const aiSuggestions = [
  { day: "Tuesday", task: "Post a testimonial", type: "Social Proof", time: "19:30" },
  { day: "Friday", task: "Post an offer", type: "Conversion", time: "18:00" },
  { day: "Sunday", task: "Post a reel", type: "Engagement", time: "20:00" },
]

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'week'>('month')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    const stored = storageService.getScheduledPosts()
    if (stored.length === 0) {
        const initial = [
            { id: 1, day: 12, platform: 'Instagram', type: 'Reel', status: 'Published', time: '19:00', title: '5 Tips for Summer Sales', caption: 'Baghi tzid f sales dyalk had lbit?', tags: '#sales #maroc' },
            { id: 2, day: 14, platform: 'Facebook', type: 'Post', status: 'Scheduled', time: '12:30', title: 'Customer Testimonial', caption: 'Choufo ach galou lina l-client dyalna...', tags: '#testimonial #atlascafe' },
            { id: 3, day: 15, platform: 'Instagram', type: 'Story', status: 'Scheduled', time: '10:00', title: 'Behind the Scenes', caption: 'L-kouzina dyalna f Marrakech!', tags: '#bts #marrakech' },
        ]
        initial.forEach(p => storageService.saveScheduledPost(p))
        setPosts(initial)
    } else {
        setPosts(stored)
    }
  }, [])

  const handleAddPost = (e: any) => {
    e.preventDefault()
    const newPost = {
        title: "New Post Draft",
        day: 20,
        platform: "Instagram",
        status: "Scheduled",
        time: "18:00",
        caption: "Newly created post from calendar.",
        tags: "#new #zidup #maroc",
        type: "Post"
    }
    const saved = storageService.saveScheduledPost(newPost)
    setPosts([...posts, saved])
    setIsAddModalOpen(false)
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <DashboardLayout>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="heading-lg mb-2">Content Calendar</h1>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 text-muted-foreground">
                <Button variant="ghost" size="icon" className="h-10 w-10 glass border-white/5"><ChevronLeft className="w-5 h-5" /></Button>
                <span className="text-foreground font-black text-lg tracking-tighter uppercase px-4">April 2026</span>
                <Button variant="ghost" size="icon" className="h-10 w-10 glass border-white/5"><ChevronRight className="w-5 h-5" /></Button>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 w-full xl:w-auto">
          <div className="glass p-1.5 rounded-[1.5rem] flex border-white/5 shadow-xl">
             {['month', 'week'].map(v => (
               <button 
                key={v}
                onClick={() => setView(v as any)}
                className={cn(
                  "px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300", 
                  view === v ? "bg-primary text-primary-foreground shadow-xl" : "text-muted-foreground hover:text-foreground"
                )}
               >
                 {v}
               </button>
             ))}
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="gap-3 h-14 px-10 rounded-2xl font-black shadow-2xl shadow-primary/20 group">
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            Create Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        {/* Calendar Grid */}
        <div className="xl:col-span-3">
          <GlassCard className="p-2 border-white/5 shadow-2xl rounded-[3rem] overflow-hidden">
            <div className="grid grid-cols-7 border-b border-border/50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center text-[10px] font-black uppercase tracking-[0.4em] opacity-40 py-6">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-border/20 border border-border/20">
               {/* Padding days for April 2026 (Starts on Wed) */}
               <div className="bg-background/40 h-36 opacity-10" />
               <div className="bg-background/40 h-36 opacity-10" />
               <div className="bg-background/40 h-36 opacity-10" />
               
               {days.map(d => {
                 const dayPosts = posts.filter(p => p.day === d)
                 return (
                   <div key={d} className="bg-background/40 h-36 p-4 relative group hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20">
                      <span className="text-xs font-black opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all mb-2 block">{d}</span>
                      <div className="space-y-2">
                         {dayPosts.map(p => (
                           <motion.button 
                              key={p.id}
                              whileHover={{ scale: 1.03, y: -2 }}
                              onClick={() => setSelectedPost(p)}
                              className={cn(
                                "w-full text-left p-2.5 rounded-xl text-[9px] font-black flex items-center gap-2 truncate border shadow-sm transition-all",
                                p.status === 'Published' ? "bg-green-500/5 border-green-500/10 text-green-600" :
                                p.status === 'Scheduled' ? "bg-primary/10 border-primary/20 text-primary" :
                                "bg-muted border-border text-muted-foreground"
                              )}
                           >
                              {p.platform === 'Instagram' ? <Camera className="w-3 h-3" /> : <MessageCircle className="w-3 h-3" />}
                              <span className="truncate uppercase tracking-tight">{p.title}</span>
                           </motion.button>
                         ))}
                      </div>
                   </div>
                 )
               })}
            </div>
          </GlassCard>
        </div>

        {/* Sidebar Suggestions */}
        <div className="space-y-8">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shadow-lg shadow-primary/10">
                 <Sparkles className="w-6 h-6 text-primary fill-current" />
              </div>
              <h2 className="text-2xl font-black tracking-tighter">AI Strategy</h2>
           </div>
           
           <div className="space-y-5">
              {aiSuggestions.map((s, i) => (
                <motion.div
                   key={i}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 border-white/5 hover:border-primary/20 transition-all cursor-pointer group" interactive>
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{s.day}</span>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest">{s.type}</span>
                    </div>
                    <p className="text-sm font-black tracking-tight group-hover:text-primary transition-colors uppercase leading-tight mb-4">{s.task}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase">{s.time}</span>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                            <Plus className="w-4 h-4" />
                        </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
           </div>

           <div className="p-8 rounded-[2.5rem] glass border-primary/20 bg-primary/5 relative overflow-hidden mt-12">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-3 mb-4">
                 <Zap className="w-5 h-5 text-primary fill-current" />
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Growth Insight</h4>
              </div>
              <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                Consistency is key! You have <span className="text-foreground font-black">{posts.length} posts</span> planned this month. AI suggests adding 3 more to stay competitive in your niche.
              </p>
           </div>
        </div>
      </div>

      {/* Add Post Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Create Content Plan"
        className="max-w-2xl rounded-[3rem] p-10"
      >
        <form className="space-y-8" onSubmit={handleAddPost}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Post Title</label>
               <input className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:outline-none font-black text-sm uppercase" placeholder="e.g. Summer Promo" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Platform</label>
               <select className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:outline-none font-black text-sm uppercase">
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>Both</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Date</label>
               <input type="date" className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:outline-none font-black text-sm" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Time</label>
               <input type="time" className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:outline-none font-black text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Caption Details</label>
            <textarea className="w-full bg-muted/50 border border-border rounded-[2rem] px-6 py-5 focus:outline-none font-bold text-sm min-h-[140px] leading-relaxed" placeholder="Write your magic here..." />
          </div>

          <div className="flex gap-4">
             <Button type="button" variant="outline" className="flex-1 h-14 font-black rounded-2xl border-white/10 uppercase tracking-widest text-[10px]">Upload Media</Button>
             <Button type="submit" className="flex-1 h-14 font-black rounded-2xl shadow-2xl shadow-primary/20 uppercase tracking-widest text-[10px]">Schedule Post</Button>
          </div>
        </form>
      </Modal>

      {/* Post Detail Modal */}
      <Modal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        title="Post Overview"
        className="max-w-xl rounded-[3rem] p-10"
      >
        {selectedPost && (
          <div className="space-y-10">
            <div className="flex items-center gap-8">
               <div className="w-32 h-32 rounded-[2rem] bg-muted overflow-hidden shadow-xl border border-white/5">
                  <img src={`https://picsum.photos/seed/${selectedPost.id}/400`} className="w-full h-full object-cover" alt="Preview" />
               </div>
               <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight uppercase mb-2">{selectedPost.title}</h3>
                    <div className="flex items-center gap-3">
                       <span className={cn(
                          "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                          selectedPost.status === 'Published' ? "bg-green-500/10 text-green-500" : "bg-primary/10 text-primary"
                       )}>{selectedPost.status}</span>
                       <div className="flex items-center gap-1.5 text-muted-foreground font-black text-[10px] uppercase tracking-[0.1em]">
                          <Clock className="w-4 h-4" />
                          {selectedPost.time}
                       </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
                     <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-pink-500" /> IG
                     </div>
                     <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-primary" /> {selectedPost.type}
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-8 rounded-[2.5rem] glass border-white/5 bg-white/5 font-medium leading-relaxed italic relative group">
               <button className="absolute top-4 right-4 p-2 rounded-xl bg-background opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white shadow-xl">
                  <Copy className="w-4 h-4" />
               </button>
               "{selectedPost.caption}"
               <p className="mt-6 text-primary font-black not-italic text-sm tracking-tight">{selectedPost.tags}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <Button variant="outline" className="gap-3 h-14 font-black rounded-2xl border-white/5 uppercase tracking-widest text-[10px]">
                  <Copy className="w-4 h-4" /> Duplicate
               </Button>
               <Button className="gap-3 h-14 font-black rounded-2xl shadow-2xl shadow-primary/20 uppercase tracking-widest text-[10px]">
                  <Megaphone className="w-4 h-4" /> Boost Post
               </Button>
               <Button variant="ghost" className="col-span-2 gap-3 h-14 font-black text-red-500 hover:bg-red-500/10 rounded-2xl uppercase tracking-[0.4em] text-[10px]">
                  <Trash2 className="w-4 h-4" /> Delete Post
               </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
