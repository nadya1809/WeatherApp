import { AlertTriangle } from 'lucide-react'

export default function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div
      role="alert"
      className="flex items-start gap-3 p-4 rounded-2xl animate-fade-in"
      style={{
        background: 'linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(220,38,38,0.08) 100%)',
        border: '1px solid rgba(239,68,68,0.25)',
        boxShadow: '0 4px 16px rgba(239,68,68,0.1)',
      }}
    >
      <div
        className="p-1.5 rounded-xl flex-shrink-0 mt-0.5"
        style={{ background: 'rgba(239,68,68,0.15)' }}
      >
        <AlertTriangle className="w-4 h-4 text-red-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-red-300">Oops! Terjadi kesalahan</p>
        <p className="text-xs text-red-400/80 mt-0.5">{message}</p>
      </div>
    </div>
  )
}
