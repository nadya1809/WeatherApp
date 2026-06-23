export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 animate-fade-in">
      {/* Animated cloud + spinner combo */}
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <div
          className="w-20 h-20 rounded-full border-2 border-white/10 animate-spin"
          style={{
            borderTopColor: '#38bdf8',
            animationDuration: '1s',
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute w-12 h-12 rounded-full border-2 border-white/10 animate-spin"
          style={{
            borderBottomColor: '#a78bfa',
            animationDuration: '1.5s',
            animationDirection: 'reverse',
          }}
        />
        {/* Center icon */}
        <div className="absolute text-2xl float-animation">⛅</div>
      </div>

      {/* Animated dots */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/70 text-sm font-semibold">
          Memuat data cuaca...
        </p>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
