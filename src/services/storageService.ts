/**
 * Zidup Local Storage Service
 * Handles all persistent data for the frontend MVP
 */

const KEYS = {
  USER: 'zidup_user',
  IS_LOGGED_IN: 'zidup_is_logged_in',
  BUSINESS: 'zidup_business',
  CONTENTS: 'zidup_contents',
  POSTS: 'zidup_posts',
  CAMPAIGNS: 'zidup_campaigns',
  ANALYTICS: 'zidup_analytics',
  SETTINGS: 'zidup_settings',
  THEME: 'zidup_theme',
}

const isBrowser = () => typeof window !== "undefined"

export const storageService = {
  // User Profile
  saveUser: (user: any) => {
    if (!isBrowser()) return
    localStorage.setItem(KEYS.USER, JSON.stringify(user))
  },
  getUser: () => {
    if (!isBrowser()) return null
    const data = localStorage.getItem(KEYS.USER)
    return data ? JSON.parse(data) : null
  },
  clearUser: () => {
    if (!isBrowser()) return
    localStorage.removeItem(KEYS.USER)
    localStorage.removeItem(KEYS.IS_LOGGED_IN)
  },

  // Auth State
  saveLoginState: (isLoggedIn: boolean) => {
    if (!isBrowser()) return
    localStorage.setItem(KEYS.IS_LOGGED_IN, JSON.stringify(isLoggedIn))
  },
  getLoginState: () => {
    if (!isBrowser()) return false
    const data = localStorage.getItem(KEYS.IS_LOGGED_IN)
    return data ? JSON.parse(data) : false
  },

  // Business Data
  saveBusiness: (business: any) => {
    if (!isBrowser()) return
    localStorage.setItem(KEYS.BUSINESS, JSON.stringify(business))
  },
  getBusiness: () => {
    if (!isBrowser()) return null
    const data = localStorage.getItem(KEYS.BUSINESS)
    return data ? JSON.parse(data) : null
  },

  // Generated Content
  saveContent: (content: any) => {
    if (!isBrowser()) return { ...content, id: Date.now() }
    const contents = storageService.getContents()
    const newContent = { ...content, id: Date.now() }
    localStorage.setItem(KEYS.CONTENTS, JSON.stringify([newContent, ...contents]))
    return newContent
  },
  getContents: () => {
    if (!isBrowser()) return []
    const data = localStorage.getItem(KEYS.CONTENTS)
    return data ? JSON.parse(data) : []
  },
  updateContent: (id: number, data: any) => {
    if (!isBrowser()) return
    const contents = storageService.getContents()
    const updated = contents.map((c: any) => c.id === id ? { ...c, ...data } : c)
    localStorage.setItem(KEYS.CONTENTS, JSON.stringify(updated))
  },
  deleteContent: (id: number) => {
    if (!isBrowser()) return
    const contents = storageService.getContents()
    const filtered = contents.filter((c: any) => c.id !== id)
    localStorage.setItem(KEYS.CONTENTS, JSON.stringify(filtered))
  },

  // Scheduled Posts
  saveScheduledPost: (post: any) => {
    if (!isBrowser()) return { ...post, id: Date.now() }
    const posts = storageService.getScheduledPosts()
    const newPost = { ...post, id: Date.now() }
    localStorage.setItem(KEYS.POSTS, JSON.stringify([...posts, newPost]))
    return newPost
  },
  getScheduledPosts: () => {
    if (!isBrowser()) return []
    const data = localStorage.getItem(KEYS.POSTS)
    return data ? JSON.parse(data) : []
  },
  updateScheduledPost: (id: number, data: any) => {
    if (!isBrowser()) return
    const posts = storageService.getScheduledPosts()
    const updated = posts.map((p: any) => p.id === id ? { ...p, ...data } : p)
    localStorage.setItem(KEYS.POSTS, JSON.stringify(updated))
  },
  deleteScheduledPost: (id: number) => {
    if (!isBrowser()) return
    const posts = storageService.getScheduledPosts()
    const filtered = posts.filter((p: any) => p.id !== id)
    localStorage.setItem(KEYS.POSTS, JSON.stringify(filtered))
  },

  // Campaigns
  saveCampaign: (campaign: any) => {
    if (!isBrowser()) return { ...campaign, id: Date.now() }
    const campaigns = storageService.getCampaigns()
    const newCampaign = { ...campaign, id: Date.now() }
    localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify([newCampaign, ...campaigns]))
    return newCampaign
  },
  getCampaigns: () => {
    if (!isBrowser()) return []
    const data = localStorage.getItem(KEYS.CAMPAIGNS)
    return data ? JSON.parse(data) : []
  },
  updateCampaign: (id: number, data: any) => {
    if (!isBrowser()) return
    const campaigns = storageService.getCampaigns()
    const updated = campaigns.map((c: any) => c.id === id ? { ...c, ...data } : c)
    localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(updated))
  },
  deleteCampaign: (id: number) => {
    if (!isBrowser()) return
    const campaigns = storageService.getCampaigns()
    const filtered = campaigns.filter((c: any) => c.id !== id)
    localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(filtered))
  },

  // Analytics
  saveAnalytics: (analytics: any) => {
    if (!isBrowser()) return
    localStorage.setItem(KEYS.ANALYTICS, JSON.stringify(analytics))
  },
  getAnalytics: () => {
    if (!isBrowser()) return null
    const data = localStorage.getItem(KEYS.ANALYTICS)
    return data ? JSON.parse(data) : null
  },

  // Settings
  saveSettings: (settings: any) => {
    if (!isBrowser()) return
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings))
  },
  getSettings: () => {
    if (!isBrowser()) return null
    const data = localStorage.getItem(KEYS.SETTINGS)
    return data ? JSON.parse(data) : null
  },

  updateSettings: (partialSettings: Record<string, unknown>) => {
    if (!isBrowser()) return
    const currentSettings = storageService.getSettings() || {}
    localStorage.setItem(
      KEYS.SETTINGS,
      JSON.stringify({ ...currentSettings, ...partialSettings })
    )
  },

  // Theme
  saveTheme: (theme: string) => {
    if (!isBrowser()) return
    localStorage.setItem(KEYS.THEME, theme)
  },
  getTheme: () => {
    if (!isBrowser()) return 'light'
    return localStorage.getItem(KEYS.THEME) || 'light'
  },

  ensureDemoData: () => {
    if (!isBrowser()) return

    const demoUser = {
      fullName: "Said Ben",
      email: "said@atlascafe.ma",
      businessName: "Atlas Cafe",
      plan: "Pro Member",
      createdAt: "2026-04-01T10:00:00.000Z",
    }

    const demoBusiness = {
      businessName: "Atlas Cafe",
      businessType: "Restaurant",
      city: "Casablanca",
      website: "www.atlascafe.ma",
      brandVoice: "Friendly",
      languages: ["Moroccan Darija", "French", "English"],
      targetCity:
        "Young professionals, families, and food lovers around Casablanca who enjoy premium local cafe experiences.",
      plan: "Pro Member",
      growthScore: 78,
    }

    const demoContents = [
      {
        id: 101,
        title: "Weekend brunch spotlight",
        caption: "Showcase the Atlas Cafe brunch menu with mint tea and terrace shots.",
        platform: "Instagram",
        type: "Caption",
        createdAt: "2026-04-23T09:00:00.000Z",
      },
      {
        id: 102,
        title: "Customer testimonial post",
        caption: "Turn a loyal customer review into a warm testimonial graphic.",
        platform: "Facebook",
        type: "Post",
        createdAt: "2026-04-22T14:30:00.000Z",
      },
      {
        id: 103,
        title: "Limited offer post",
        caption: "Push the weekday lunch combo with a direct CTA to reserve by message.",
        platform: "Both",
        type: "Ad copy",
        createdAt: "2026-04-21T18:00:00.000Z",
      },
      {
        id: 104,
        title: "Behind the scenes reel",
        caption: "Capture the kitchen prep and signature coffee pour with upbeat local music.",
        platform: "Instagram",
        type: "Reel idea",
        createdAt: "2026-04-20T11:45:00.000Z",
      },
      {
        id: 105,
        title: "FAQ story set",
        caption: "Answer common questions about delivery, booking, and peak hours in story format.",
        platform: "Instagram",
        type: "Story idea",
        createdAt: "2026-04-19T16:20:00.000Z",
      },
    ]

    const demoPosts = [
      { id: 201, day: 12, platform: "Instagram", type: "Reel", status: "Published", time: "19:00", title: "5 Tips for Summer Sales", caption: "Baghi tzid f sales dyalk had lbit?", tags: "#sales #maroc" },
      { id: 202, day: 14, platform: "Facebook", type: "Post", status: "Scheduled", time: "12:30", title: "Customer Testimonial", caption: "Choufo ach galou lina l-client dyalna...", tags: "#testimonial #atlascafe" },
      { id: 203, day: 15, platform: "Instagram", type: "Story", status: "Scheduled", time: "10:00", title: "Behind the Scenes", caption: "L-kouzina dyalna f Casablanca!", tags: "#bts #casablanca" },
      { id: 204, day: 18, platform: "Both", type: "Carousel", status: "Draft", time: "18:30", title: "New Menu Highlights", caption: "Fresh dishes for the spring menu.", tags: "#menu #atlascafe" },
      { id: 205, day: 21, platform: "Instagram", type: "Reel", status: "Scheduled", time: "20:00", title: "Sunset Terrace Reel", caption: "Golden hour at Atlas Cafe.", tags: "#terrace #goldenhour" },
    ]

    const demoCampaigns = [
      {
        id: 301,
        name: "Weekend Messages Push",
        objective: "Get more messages",
        product: "Weekend brunch menu",
        offer: "Free mint tea with brunch reservation",
        location: "Casablanca",
        radius: "15",
        ageRange: "18-45",
        gender: "All",
        budget: "150",
        duration: "7",
        status: "Draft",
        reachEstimate: "6K-9K",
        primaryText:
          "Reserve your weekend brunch at Atlas Cafe and enjoy a free mint tea with every table booking.",
        headline: "Book your brunch now",
        cta: "Send Message",
      },
    ]

    const demoAnalytics = {
      growthScore: 78,
      scheduledPosts: 5,
      campaignDrafts: 1,
      bestPostingTimes: [
        { time: "7:00 PM", day: "Today", score: 95 },
        { time: "12:30 PM", day: "Tomorrow", score: 72 },
        { time: "9:00 AM", day: "Friday", score: 48 },
      ],
      metrics: [
        { label: "Total Reach", value: "24.8K", change: "+15.2%", trend: "up" },
        { label: "Engagement Rate", value: "6.4%", change: "+2.1%", trend: "up" },
        { label: "Messages", value: "143", change: "+12", trend: "up" },
        { label: "Campaign Spend", value: "540 MAD", change: "-5%", trend: "down" },
      ],
      aiRecommendations: [
        { title: "Add more local keywords", desc: "Targeting Casablanca neighborhoods can increase reach by 25%." },
        { title: "Use stronger CTA", desc: "Posts with direct booking language are driving more messages." },
        { title: "Post 4 times this week", desc: "Consistency is keeping Atlas Cafe ahead of nearby competitors." },
        { title: "Try a messages campaign", desc: "Your brunch offer is ideal for direct inquiries and reservations." },
      ],
      recentPosts: [
        { title: "Summer Special Offer", platform: "Instagram", type: "Reel", reach: "4.2K", engagement: "8.5%", status: "High" },
        { title: "Client Testimonial #4", platform: "Facebook", type: "Post", reach: "1.8K", engagement: "4.2%", status: "Medium" },
        { title: "Behind the Scenes", platform: "Instagram", type: "Story", reach: "950", engagement: "12.1%", status: "Viral" },
        { title: "Our New Menu", platform: "Both", type: "Carousel", reach: "3.1K", engagement: "6.8%", status: "High" },
      ],
    }

    const demoSettings = {
      demoMode: true,
      notifications: {
        weeklyDigest: true,
        postingReminders: true,
        campaignAlerts: true,
      },
      demoConnections: {
        facebookPage: { connected: false, accountName: "" },
        instagramAccount: { connected: false, accountName: "" },
        metaAdAccount: { connected: false, accountName: "" },
      },
    }

    if (!storageService.getUser()) {
      storageService.saveUser(demoUser)
    }

    if (!storageService.getBusiness()) {
      storageService.saveBusiness(demoBusiness)
    }

    if (storageService.getContents().length === 0) {
      localStorage.setItem(KEYS.CONTENTS, JSON.stringify(demoContents))
    }

    if (storageService.getScheduledPosts().length === 0) {
      localStorage.setItem(KEYS.POSTS, JSON.stringify(demoPosts))
    }

    if (storageService.getCampaigns().length === 0) {
      localStorage.setItem(KEYS.CAMPAIGNS, JSON.stringify(demoCampaigns))
    }

    if (!storageService.getAnalytics()) {
      storageService.saveAnalytics(demoAnalytics)
    }

    if (!storageService.getSettings()) {
      storageService.saveSettings(demoSettings)
    }
  },
}
