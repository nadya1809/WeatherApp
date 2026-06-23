import { CalendarDays } from 'lucide-react'
import ForecastCard from './ForecastCard'

export default function ForecastList({ forecastData }) {
  if (!forecastData?.forecast?.length) return null

  return (
    <div className="animate-slide-up">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="p-1.5 rounded-xl"
          style={{ background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.3)' }}
        >
          <CalendarDays className="w-3.5 h-3.5 text-sky-300" />
        </div>
        <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">
          Prakiraan 5 Hari
        </h3>
      </div>

      {/* Horizontal scroll */}
      <div
        className="flex gap-3 overflow-x-auto pb-3"
        style={{ scrollbarWidth: 'thin' }}
      >
        {forecastData.forecast.map((item, idx) => (
          <ForecastCard key={item.date || idx} item={item} />
        ))}
      </div>
    </div>
  )
}
