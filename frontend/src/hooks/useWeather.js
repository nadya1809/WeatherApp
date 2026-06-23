import { useState, useCallback } from 'react'
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
} from '../services/weatherApi'

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchByCity = useCallback(async (cityName) => {
    if (!cityName?.trim()) return
    setIsLoading(true)
    setError(null)

    try {
      const [weather, forecast] = await Promise.all([
        fetchWeatherByCity(cityName.trim()),
        fetchForecastByCity(cityName.trim()),
      ])
      setWeatherData(weather)
      setForecastData(forecast)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan. Coba lagi.')
      setWeatherData(null)
      setForecastData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchByCoords = useCallback(async (lat, lon) => {
    setIsLoading(true)
    setError(null)

    try {
      const [weather, forecast] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
      ])
      setWeatherData(weather)
      setForecastData(forecast)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan. Coba lagi.')
      setWeatherData(null)
      setForecastData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    weatherData,
    forecastData,
    isLoading,
    error,
    fetchByCity,
    fetchByCoords,
  }
}
