import { storageService } from "./storageService";

export const authService = {
  ensureDemoSession: () => {
    storageService.ensureDemoData()
    const user = storageService.getUser()
    if (user) {
      storageService.saveLoginState(true)
    }
    return user
  },

  /**
   * Mock registration
   */
  registerUser: (fullName: string, email: string, pass: string, businessName: string) => {
    const user = {
      fullName,
      email,
      businessName,
      createdAt: new Date().toISOString()
    }
    storageService.saveUser(user)
    storageService.saveLoginState(true)
    return user
  },

  /**
   * Mock login
   */
  loginUser: (email: string, pass: string) => {
    const user = storageService.getUser()
    if (user && user.email === email) {
      storageService.saveLoginState(true)
      return user
    }
    // If no user exists, create a default one for demo purposes
    if (email === "demo@zidup.com") {
        const demoUser = {
            fullName: "Said Ben",
            email: "demo@zidup.com",
            businessName: "Atlas Cafe",
            plan: "Pro Member",
            createdAt: new Date().toISOString()
        }
        storageService.saveUser(demoUser)
        storageService.saveLoginState(true)
        return demoUser
    }
    return null
  },

  /**
   * Logout
   */
  logoutUser: () => {
    storageService.saveLoginState(false)
  },

  /**
   * Get current user
   */
  getCurrentUser: () => {
    return storageService.getUser() || authService.ensureDemoSession()
  },

  /**
   * Check if authenticated
   */
  isAuthenticated: () => {
    return storageService.getLoginState() || Boolean(storageService.getUser())
  }
}
