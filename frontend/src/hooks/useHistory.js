import { useState, useCallback } from 'react'

const STORAGE_KEY = 'weather_history'
const MAX_ITEMS = 5

function loadHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveHistory(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export function useHistory() {
  const [history, setHistory] = useState(loadHistory)

  const addToHistory = useCallback((cityName) => {
    if (!cityName?.trim()) return
    const normalized = cityName.trim()
    setHistory(prev => {
      // Remove duplicate (case-insensitive) and add to front
      const filtered = prev.filter(c => c.toLowerCase() !== normalized.toLowerCase())
      const updated = [normalized, ...filtered].slice(0, MAX_ITEMS)
      saveHistory(updated)
      return updated
    })
  }, [])

  const removeFromHistory = useCallback((cityName) => {
    setHistory(prev => {
      const updated = prev.filter(c => c.toLowerCase() !== cityName.toLowerCase())
      saveHistory(updated)
      return updated
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    saveHistory([])
  }, [])

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}
