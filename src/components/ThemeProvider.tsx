"use client"

import * as React from "react"
import type { ThemePreference } from "@/types/translation";

type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  isReady: boolean
  themePreference: ThemePreference
  resolvedTheme: ResolvedTheme
  setThemePreference: (theme: ThemePreference) => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)
const STORAGE_KEY = "arabeng-theme"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = React.useState(false)
  const [themePreference, setThemePreferenceState] =
    React.useState<ThemePreference>("system")
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>("light")

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const savedTheme = localStorage.getItem(STORAGE_KEY)

    if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
      setThemePreferenceState(savedTheme)
    }

    const nextResolvedTheme =
      savedTheme === "dark" ||
      (savedTheme !== "light" && mediaQuery.matches)
        ? "dark"
        : "light"

    setResolvedTheme(nextResolvedTheme)
    document.documentElement.classList.toggle("dark", nextResolvedTheme === "dark")
    document.documentElement.style.colorScheme = nextResolvedTheme

    const handleChange = (event: MediaQueryListEvent) => {
      setResolvedTheme((current) => {
        const nextTheme =
          themePreference === "system"
            ? event.matches
              ? "dark"
              : "light"
            : current

        document.documentElement.classList.toggle("dark", nextTheme === "dark")
        document.documentElement.style.colorScheme = nextTheme

        return nextTheme
      })
    }

    mediaQuery.addEventListener("change", handleChange)
    setIsReady(true)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  React.useEffect(() => {
    if (!isReady) {
      return
    }

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const nextResolvedTheme =
      themePreference === "system"
        ? systemDark
          ? "dark"
          : "light"
        : themePreference

    setResolvedTheme(nextResolvedTheme)
    localStorage.setItem(STORAGE_KEY, themePreference)
    document.documentElement.classList.toggle("dark", nextResolvedTheme === "dark")
    document.documentElement.style.colorScheme = nextResolvedTheme
  }, [isReady, themePreference])

  const setThemePreference = React.useCallback((theme: ThemePreference) => {
    setThemePreferenceState(theme)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setThemePreferenceState((current) => {
      if (current === "system") {
        return resolvedTheme === "dark" ? "light" : "dark"
      }

      return current === "light" ? "dark" : "light"
    })
  }, [resolvedTheme])

  return (
    <ThemeContext.Provider
      value={{
        isReady,
        themePreference,
        resolvedTheme,
        setThemePreference,
        toggleTheme,
      }}
    >
      <div className="gradient-glow" />
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
