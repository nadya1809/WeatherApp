import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Thermometer, MapPin } from 'lucide-react'
import { formatTemp, formatWind, formatVisibility, formatHumidity, formatPressure, capitalizeWords, getWeatherCategory } from '../utils/formatters'

// Weather category config: gradient class, accent color, emoji
const categoryConfig = {
  clear: {
    cls: 'weather-clear',
    accent: '#fbbf24',
    emoji: '☀️',
    label: 'Cerah',
  },
  cloudy: {
    cls: 'weather-cloudy',
    accent: '#94a3b8',
    emoji: '⛅',
    label: 'Berawan',
  },
  rain: {
    cls: 'weather-rain',
    accent: '#38bdf8',
    emoji: '🌧️',
    label: 'Hujan',
  },
  storm: {
    cls: 'weather-storm',
    accent: '#a78bfa',
    emoji: '⛈️',
    label: 'Badai',
  },
  snow: {
    cls: 'weather-snow',
    accent: '#bae6fd',
    emoji: '❄️',
    label: 'Salju',
  },
  fog: {
    cls: 'weather-fog',
    accent: '#cbd5e1',
    emoji: '🌫️',
    label: 'Berkabut',
  },
  default: {
    cls: 'weather-cloudy',
    accent: '#818cf8',
    emoji: '🌤️',
    label: 'Cuaca',
  },
}

// Get temperature color class based on temp in Celsius
function getTempColor(temp) {
  if (temp >= 35) return '#ff6b35'      // hot orange-red
  if (temp >= 28) return '#fb923c'      // warm orange
  if (temp >= 22) return '#fbbf24'      // mild yellow
  if (temp >= 15) return '#34d399'      // mild green
  if (temp >= 8)  return '#60a5fa'      // cool blue
  if (temp >= 0)  return '#a78bfa'      // cold purple
  return '#c4b5fd'                       // freezing lavender
}

function DetailItem({ icon: Icon, label, value, accent }) {
  return (
    <div className="detail-item flex flex-col items-center gap-1.5">
      <Icon
        className="w-4 h-4"
        style={{ color: accent || 'rgba(255,255,255,0.6)' }}
      />
      <span className="text-xs text-white/55 font-medium text-center leading-tight">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  )
}

export default function WeatherCard({ weatherData }) {
  if (!weatherData) return null

  const category = getWeatherCategory(weatherData.description, weatherData.icon)
  const config = categoryConfig[category] || categoryConfig.default
  const tempColor = getTempColor(weatherData.temperature)

  return (
    <div
      className={`glass-card-strong p-6 ${config.cls} animate-slide-up`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative background circle */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${config.accent}22 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${config.accent}15 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Header Row */}
      <div className="flex items-start justify-between mb-5 relative">
        <div>
          {/* Category badge */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-2"
            style={{
              background: `${config.accent}22`,
              color: config.accent,
              border: `1px solid ${config.accent}44`,
            }}
          >
            <span>{config.emoji}</span>
            {config.label}
          </span>

          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-white/60" />
            <h2 className="text-xl font-extrabold text-white text-shadow-sm leading-tight">
              {weatherData.city}
              <span className="text-white/50 font-medium text-sm ml-2">
                {weatherData.country}
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-sm capitalize mt-1">
            {capitalizeWords(weatherData.description)}
          </p>
        </div>

        {/* Weather Icon */}
        <div className="float-animation">
          <img
            src={weatherData.icon_url}
            alt={weatherData.description}
            className="w-24 h-24"
            style={{
              filter: `drop-shadow(0 4px 16px ${config.accent}88)`,
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="divider-glow mb-5" />

      {/* Temperature Display */}
      <div className="flex items-end gap-4 mb-6">
        <div className="flex items-end leading-none">
          <span
            className="font-black text-shadow leading-none"
            style={{
              fontSize: '5rem',
              color: tempColor,
              textShadow: `0 0 40px ${tempColor}55, 0 2px 8px rgba(0,0,0,0.3)`,
            }}
          >
            {Math.round(weatherData.temperature)}
          </span>
          <span className="text-3xl font-bold text-white/60 mb-3 ml-1">°C</span>
        </div>

        <div className="mb-2 space-y-1">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-white/50" />
            <span className="text-xs text-white/55">
              Terasa seperti{' '}
              <span className="font-semibold text-white/80">
                {formatTemp(weatherData.feels_like)}
              </span>
            </span>
          </div>
          {weatherData.temp_min !== undefined && weatherData.temp_max !== undefined && (
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span>
                ↓ <span className="font-medium text-blue-300">{Math.round(weatherData.temp_min)}°</span>
              </span>
              <span>
                ↑ <span className="font-medium text-orange-300">{Math.round(weatherData.temp_max)}°</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        <DetailItem
          icon={Droplets}
          label="Kelembapan"
          value={formatHumidity(weatherData.humidity)}
          accent="#38bdf8"
        />
        <DetailItem
          icon={Wind}
          label="Angin"
          value={formatWind(weatherData.wind_speed)}
          accent="#a78bfa"
        />
        <DetailItem
          icon={Eye}
          label="Visibilitas"
          value={formatVisibility(weatherData.visibility)}
          accent="#34d399"
        />
        <DetailItem
          icon={Gauge}
          label="Tekanan"
          value={formatPressure(weatherData.pressure)}
          accent="#fb923c"
        />
        <DetailItem
          icon={Sunrise}
          label="Terbit"
          value={weatherData.sunrise}
          accent="#fbbf24"
        />
        <DetailItem
          icon={Sunset}
          label="Terbenam"
          value={weatherData.sunset}
          accent="#f97316"
        />
      </div>
    </div>
  )
}
