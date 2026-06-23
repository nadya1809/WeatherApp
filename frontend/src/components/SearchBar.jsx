import { useState, useRef } from 'react'
import { Search, MapPin, Loader2 } from 'lucide-react'

const supportsGeolocation = 'geolocation' in navigator

export default function SearchBar({ onSearch, onGeolocate, isLoading }) {
  const [inputValue, setInputValue] = useState('')
  const [geoError, setGeoError] = useState(null)
  const [isGeoLoading, setIsGeoLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) {
      inputRef.current?.focus()
      return
    }
    onSearch(inputValue.trim())
  }

  const handleGeolocate = () => {
    if (!supportsGeolocation) return
    setGeoError(null)
    setIsGeoLoading(true)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGeoLoading(false)
        onGeolocate(pos.coords.latitude, pos.coords.longitude)
      },
      (err) => {
        setIsGeoLoading(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError('Akses lokasi ditolak. Cari kota secara manual.')
        } else if (err.code === err.TIMEOUT) {
          setGeoError('Tidak bisa mendapatkan lokasi. Coba lagi.')
        } else {
          setGeoError('Gagal mendapatkan lokasi.')
        }
        setTimeout(() => setGeoError(null), 4000)
      },
      { timeout: 8000 }
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2.5">
        {/* Input wrapper with glow effect */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200"
            style={{ color: isFocused ? '#38bdf8' : 'rgba(255,255,255,0.4)' }}
          />
          <input
            id="city-search-input"
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Cari kota... (contoh: Jakarta, London)"
            className="input-field pl-10"
            disabled={isLoading}
            autoComplete="off"
            style={
              isFocused
                ? { boxShadow: '0 0 0 3px rgba(56,189,248,0.25), 0 8px 24px rgba(0,0,0,0.2)' }
                : { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
            }
          />
        </div>

        {/* Search button */}
        <button
          id="search-submit-btn"
          type="submit"
          disabled={isLoading}
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span className="hidden sm:inline font-semibold">Cari</span>
        </button>

        {/* Geolocate button */}
        {supportsGeolocation && (
          <button
            id="geolocate-btn"
            type="button"
            onClick={handleGeolocate}
            disabled={isLoading || isGeoLoading}
            title="Gunakan lokasi saya"
            className="btn-secondary flex items-center gap-2 whitespace-nowrap"
          >
            {isGeoLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4 text-sky-300" />
            )}
            <span className="hidden sm:inline font-medium">Lokasi Saya</span>
          </button>
        )}
      </form>

      {/* Geo error message */}
      {geoError && (
        <div
          className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm animate-fade-in"
          style={{
            background: 'rgba(251,191,36,0.1)',
            border: '1px solid rgba(251,191,36,0.25)',
            color: '#fcd34d',
          }}
        >
          <span>⚠️</span>
          <span className="font-medium">{geoError}</span>
        </div>
      )}
    </div>
  )
}
