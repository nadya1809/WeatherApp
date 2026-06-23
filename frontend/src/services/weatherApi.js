const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

async function handleResponse(res) {
  if (!res.ok) {
    let errMsg = 'Terjadi kesalahan.'
    try {
      const err = await res.json()
      errMsg = err?.detail?.message || err?.message || errMsg
    } catch {}
    throw new Error(errMsg)
  }
  return res.json()
}

export async function fetchWeatherByCity(city) {
  const res = await fetch(`${BASE_URL}/api/weather?city=${encodeURIComponent(city)}`)
  return handleResponse(res)
}

export async function fetchWeatherByCoords(lat, lon) {
  const res = await fetch(`${BASE_URL}/api/weather?lat=${lat}&lon=${lon}`)
  return handleResponse(res)
}

export async function fetchForecastByCity(city) {
  const res = await fetch(`${BASE_URL}/api/forecast?city=${encodeURIComponent(city)}`)
  return handleResponse(res)
}

export async function fetchForecastByCoords(lat, lon) {
  const res = await fetch(`${BASE_URL}/api/forecast?lat=${lat}&lon=${lon}`)
  return handleResponse(res)
}
