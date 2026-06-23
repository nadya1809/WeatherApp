import { X, History, Trash2 } from 'lucide-react'

export default function HistoryChips({ history, onSelect, onRemove, onClearAll }) {
  if (!history || history.length === 0) return null

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="p-1 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <History className="w-3 h-3 text-white/60" />
        </div>
        <span className="text-xs text-white/50 font-semibold uppercase tracking-widest">
          Pencarian Terakhir
        </span>
      </div>

      {/* Chips row */}
      <div className="flex flex-wrap gap-2 items-center">
        {history.map((city) => (
          <div
            key={city}
            className="flex items-center gap-1 pl-3 pr-1.5 py-1.5 rounded-2xl group transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
          >
            <button
              id={`history-chip-${city.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => onSelect(city)}
              className="text-sm text-white/80 hover:text-white font-medium transition-colors"
            >
              {city}
            </button>
            <button
              id={`remove-chip-${city.toLowerCase().replace(/\s/g, '-')}`}
              onClick={(e) => {
                e.stopPropagation()
                onRemove(city)
              }}
              className="ml-0.5 p-0.5 rounded-full text-white/30 hover:text-red-300 hover:bg-red-500/15 transition-all duration-150"
              aria-label={`Hapus ${city} dari riwayat`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Clear All button */}
        {history.length > 0 && (
          <button
            id="clear-all-history-btn"
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs text-white/35 hover:text-red-300 transition-all duration-200"
            style={{ border: '1px solid transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'transparent'
            }}
          >
            <Trash2 className="w-3 h-3" />
            Hapus Semua
          </button>
        )}
      </div>
    </div>
  )
}
