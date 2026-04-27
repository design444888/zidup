import { GlassCard } from "./ui/GlassCard"
import { Layout, PenTool, Hash, Calendar, Target, BarChart3, Bot } from "lucide-react"

const features = [
  {
    title: "AI Content Generator",
    description: "Generate high-quality social media posts that resonate with your audience.",
    icon: Bot,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Smart Captions",
    description: "Write engaging captions that drive action and build your brand voice.",
    icon: PenTool,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    title: "Hashtag Magic",
    description: "Find the most relevant and trending hashtags to increase your reach.",
    icon: Hash,
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  },
  {
    title: "Visual Calendar",
    description: "Plan and organize your content across all platforms in one view.",
    icon: Calendar,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Ad Campaign Builder",
    description: "Prepare professional ad campaigns that actually convert.",
    icon: Target,
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  {
    title: "Advanced Analytics",
    description: "Understand exactly what content works best for your growth.",
    icon: BarChart3,
    color: "text-green-500",
    bg: "bg-green-500/10"
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to <br /> scale professionally</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Zidup provides the tools used by big agencies, simplified for small business owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <GlassCard key={i} className="flex flex-col items-start gap-4">
              <div className={`p-3 rounded-xl ${feature.bg} ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
