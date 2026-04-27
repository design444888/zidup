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

  // Theme
  saveTheme: (theme: string) => {
    if (!isBrowser()) return
    localStorage.setItem(KEYS.THEME, theme)
  },
  getTheme: () => {
    if (!isBrowser()) return 'light'
    return localStorage.getItem(KEYS.THEME) || 'light'
  }
}
