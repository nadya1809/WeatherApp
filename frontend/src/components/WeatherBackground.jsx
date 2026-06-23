import { useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../context/ThemeContext'

// Generate random stars
function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: `${Math.random() * 4}s`,
    duration: `${Math.random() * 3 + 2}s`,
  }))
}

// Generate raindrops
function generateRain(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    height: `${Math.random() * 60 + 40}px`,
    delay: `${Math.random() * 1.5}s`,
    duration: `${Math.random() * 0.5 + 0.9}s`,
    opacity: Math.random() * 0.4 + 0.3,
  }))
}

const STARS = generateStars(80)
const RAIN = generateRain(60)

const clouds = [
  { cls: 'cloud-1', width: 280, height: 60, top: '8%', delay: '0s', duration: '55s', opacity: 0.75 },
  { cls: 'cloud-2', width: 200, height: 45, top: '18%', delay: '-20s', duration: '70s', opacity: 0.55 },
  { cls: 'cloud-3', width: 350, height: 70, top: '5%', delay: '-40s', duration: '90s', opacity: 0.4 },
  { cls: 'cloud-4', width: 180, height: 40, top: '30%', delay: '-10s', duration: '60s', opacity: 0.35 },
  { cls: 'cloud-5', width: 240, height: 55, top: '55%', delay: '-55s', duration: '80s', opacity: 0.2 },
  { cls: 'cloud-6', width: 160, height: 38, top: '72%', delay: '-30s', duration: '65s', opacity: 0.18 },
]

export default function WeatherBackground({ weatherCategory }) {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const isRain = weatherCategory === 'rain' || weatherCategory === 'storm'

  return (
    <>
      {/* Aurora Orbs */}
      <div
        className="aurora"
        style={{
          width: 600,
          height: 600,
          top: '-150px',
          right: '-100px',
          background: isDark
            ? 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(99,102,241,0.12) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(96,165,250,0.25) 0%, rgba(147,197,253,0.15) 60%, transparent 80%)',
          animationDuration: '12s',
          animationDelay: '0s',
        }}
      />
      <div
        className="aurora"
        style={{
          width: 500,
          height: 500,
          bottom: '0px',
          left: '-100px',
          background: isDark
            ? 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(14,165,233,0.1) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(186,230,253,0.3) 0%, rgba(125,211,252,0.2) 60%, transparent 80%)',
          animationDuration: '10s',
          animationDelay: '-5s',
        }}
      />

      {/* Stars — only in dark mode */}
      {isDark && (
        <div className="stars-layer">
          {STARS.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Clouds */}
      <div className="clouds-layer">
        {clouds.map((c, i) => (
          <div
            key={i}
            className={`cloud ${isDark ? 'cloud-dark' : 'cloud-light'}`}
            style={{
              width: c.width,
              height: c.height,
              top: c.top,
              left: '-400px',
              opacity: c.opacity,
              animationName: 'cloudDrift',
              animationDuration: c.duration,
              animationDelay: c.delay,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      {/* Rain — only when weather is rain/storm */}
      {isRain && (
        <div className="rain-layer">
          {RAIN.map(drop => (
            <div
              key={drop.id}
              className="raindrop"
              style={{
                left: drop.left,
                height: drop.height,
                opacity: drop.opacity,
                animationDuration: drop.duration,
                animationDelay: drop.delay,
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}
