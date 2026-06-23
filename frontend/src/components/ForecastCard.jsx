import { capitalizeWords } from '../utils/formatters'

// Forecast card with temp-based accent
function getTempAccent(temp) {
  if (temp >= 30) return '#fb923c'
  if (temp >= 22) return '#fbbf24'
  if (temp >= 15) return '#34d399'
  if (temp >= 5)  return '#60a5fa'
  return '#a78bfa'
}

export default function ForecastCard({ item }) {
  const accent = getTempAccent(item.temp_max)

  return (
    <div
      className="forecast-card-inner flex-shrink-0 w-36 glass-card p-4 flex flex-col items-center gap-2 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.08)',
        borderColor: 'rgba(255,255,255,0.15)',
      }}
    >
      {/* Day name */}
      <span className="text-sm font-bold text-white/95 tracking-wide">
        {item.day}
      </span>
      {/* Date */}
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        {item.date}
      </span>

      {/* Weather icon */}
      <div className="relative my-1">
        <img
          src={item.icon_url}
          alt={item.description}
          className="w-14 h-14"
          style={{ filter: `drop-shadow(0 4px 12px ${accent}66)` }}
        />
      </div>

      {/* Description */}
      <p className="text-xs text-white/55 text-center capitalize leading-tight px-1">
        {capitalizeWords(item.description)}
      </p>

      {/* Temperature range */}
      <div
        className="w-full flex items-center justify-between mt-1 px-1 py-1.5 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.07)' }}
      >
        <span
          className="text-sm font-extrabold"
          style={{ color: accent }}
        >
          {Math.round(item.temp_max)}°
        </span>
        <span className="text-xs text-white/30 font-medium">/</span>
        <span className="text-xs text-white/45 font-medium">
          {Math.round(item.temp_min)}°
        </span>
      </div>
    </div>
  )
}
