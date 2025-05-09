import { useEffect, useState } from "react"

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    const theme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setCurrentTheme(isDark ? 'dark' : 'light')
  }, [])

  const setTheme = (theme: 'dark' | 'light') => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    setCurrentTheme(theme)
  }

  const toggleTheme = () => {
    const next = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  return { toggleTheme, currentTheme }
}
