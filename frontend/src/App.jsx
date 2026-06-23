import { useContext, useState } from 'react'
import { CloudSun } from 'lucide-react'
import { ThemeContext } from './context/ThemeContext'
import { useWeather } from './hooks/useWeather'
import { useHistory } from './hooks/useHistory'
import { getWeatherCategory } from './utils/formatters'

import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastList from './components/ForecastList'
import HistoryChips from './components/HistoryChips'
import ThemeToggle from './components/ThemeToggle'
import ErrorMessage from './components/ErrorMessage'
import LoadingSpinner from './components/LoadingSpinner'
import WeatherBackground from './components/WeatherBackground'

export default function App() {
  const { theme } = useContext(ThemeContext)
  const { weatherData, forecastData, isLoading, error, fetchByCity, fetchByCoords } = useWeather()
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory()

  const handleSearch = (cityName) => {
    fetchByCity(cityName).then(() => {
      addToHistory(cityName)
    })
  }

  const handleGeolocate = (lat, lon) => {
    fetchByCoords(lat, lon)
  }

  const handleHistorySelect = (cityName) => {
    fetchByCity(cityName).then(() => {
      addToHistory(cityName)
    })
  }

  const hasResults = weatherData || forecastData

  // Determine weather category for background effects
  const weatherCategory = weatherData
    ? getWeatherCategory(weatherData.description, weatherData.icon)
    : null

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        theme === 'dark' ? 'bg-animated' : 'bg-animated-light'
      }`}
    >
      {/* Animated Background Layer */}
      <WeatherBackground weatherCategory={weatherCategory} />

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-2xl"
          style={{ background: 'rgba(0,0,0,0.15)' }}>
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo Icon */}
              <div
                className="p-2 rounded-2xl border border-white/20 glow-pulse"
                style={{
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.3), rgba(99,102,241,0.25))',
                }}
              >
                <CloudSun className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white leading-none tracking-tight text-shadow-sm">
                  WeatherNow
                </h1>
                <p className="text-xs text-white/50 mt-0.5 font-medium">
                  ☁️ Cuaca Real-Time
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">

          {/* Hero Search Section */}
          <section aria-label="Pencarian kota">
            {!hasResults && !isLoading && !error && (
              <div className="text-center mb-8 animate-fade-in">
                <p className="text-white/60 text-sm font-medium tracking-wide uppercase mb-1">
                  🌍 Aplikasi Cuaca
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-shadow mb-2">
                  Cuaca Hari Ini
                </h2>
                <p className="text-white/50 text-sm">
                  Cek cuaca real-time di seluruh dunia
                </p>
              </div>
            )}
            <SearchBar
              onSearch={handleSearch}
              onGeolocate={handleGeolocate}
              isLoading={isLoading}
            />
          </section>

          {/* History Chips */}
          {history.length > 0 && (
            <section aria-label="Riwayat pencarian">
              <HistoryChips
                history={history}
                onSelect={handleHistorySelect}
                onRemove={removeFromHistory}
                onClearAll={clearHistory}
              />
            </section>
          )}

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}

          {/* Loading Spinner */}
          {isLoading && <LoadingSpinner />}

          {/* Weather Results */}
          {!isLoading && hasResults && (
            <section aria-label="Hasil cuaca" className="space-y-6">
              <WeatherCard weatherData={weatherData} />
              <ForecastList forecastData={forecastData} />
            </section>
          )}

          {/* Empty State */}
          {!isLoading && !hasResults && !error && (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
              {/* Big animated weather emojis */}
              <div className="relative mb-8">
                <div className="text-8xl float-animation">⛅</div>
                <div
                  className="absolute -top-3 -right-6 text-4xl"
                  style={{ animation: 'float 3.5s ease-in-out infinite', animationDelay: '-1s' }}
                >
                  🌤️
                </div>
                <div
                  className="absolute -bottom-2 -left-8 text-3xl"
                  style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '-2s' }}
                >
                  ☁️
                </div>
              </div>

              <div
                className="glass-card px-8 py-6 max-w-sm"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <h2 className="text-xl font-bold text-white mb-2 text-shadow-sm">
                  Mau cek cuaca di mana?
                </h2>
                <p className="text-white/55 text-sm leading-relaxed">
                  Ketik nama kota di kotak pencarian atau gunakan tombol{' '}
                  <span className="text-sky-300 font-semibold">Lokasi Saya</span>{' '}
                  untuk cuaca di sekitarmu.
                </p>

                {/* Feature hints */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { icon: '🌡️', label: 'Suhu' },
                    { icon: '💧', label: 'Kelembapan' },
                    { icon: '🌬️', label: 'Angin' },
                  ].map(f => (
                    <div
                      key={f.label}
                      className="flex flex-col items-center gap-1 p-2.5 rounded-2xl"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <span className="text-2xl">{f.icon}</span>
                      <span className="text-xs text-white/50 font-medium">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-5 border-t border-white/8">
          <p className="text-white/25 text-xs font-medium">
            ⚡ Data dari OpenWeatherMap &nbsp;•&nbsp; WeatherNow &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  )
}
