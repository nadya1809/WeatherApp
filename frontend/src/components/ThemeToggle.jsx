import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))'
          : 'linear-gradient(135deg, rgba(251,191,36,0.3), rgba(249,115,22,0.2))',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: theme === 'dark'
          ? '0 0 16px rgba(99,102,241,0.25)'
          : '0 0 16px rgba(251,191,36,0.25)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <Moon className="w-4 h-4 text-indigo-300" />
          <span className="text-xs font-semibold text-indigo-200 hidden sm:inline">Malam</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-semibold text-amber-100 hidden sm:inline">Siang</span>
        </>
      )}
    </button>
  )
}
