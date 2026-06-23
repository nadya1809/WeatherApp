/**
 * Format temperature with degree symbol
 * @param {number} temp
 * @param {number} decimals
 * @returns {string}
 */
export function formatTemp(temp, decimals = 0) {
  return `${Math.round(temp * Math.pow(10, decimals)) / Math.pow(10, decimals)}°C`
}

/**
 * Format wind speed in km/h
 * @param {number} speed
 * @returns {string}
 */
export function formatWind(speed) {
  return `${speed} km/h`
}

/**
 * Format visibility in km
 * @param {number} visibility
 * @returns {string}
 */
export function formatVisibility(visibility) {
  return `${visibility} km`
}

/**
 * Format humidity as percentage
 * @param {number} humidity
 * @returns {string}
 */
export function formatHumidity(humidity) {
  return `${humidity}%`
}

/**
 * Format pressure in hPa
 * @param {number} pressure
 * @returns {string}
 */
export function formatPressure(pressure) {
  return `${pressure} hPa`
}

/**
 * Get weather condition category for gradient selection
 * @param {string} description
 * @param {string} icon
 * @returns {string}
 */
export function getWeatherCategory(description, icon) {
  if (!description && !icon) return 'default'
  const desc = description?.toLowerCase() || ''
  const iconCode = icon || ''
  
  if (desc.includes('thunderstorm') || iconCode.startsWith('11')) return 'storm'
  if (desc.includes('rain') || desc.includes('drizzle') || iconCode.startsWith('09') || iconCode.startsWith('10')) return 'rain'
  if (desc.includes('snow') || iconCode.startsWith('13')) return 'snow'
  if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze') || iconCode.startsWith('50')) return 'fog'
  if (desc.includes('clear') || iconCode === '01d' || iconCode === '01n') return 'clear'
  if (desc.includes('cloud') || iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) return 'cloudy'
  return 'default'
}

/**
 * Capitalize first letter of each word
 * @param {string} str
 * @returns {string}
 */
export function capitalizeWords(str) {
  if (!str) return ''
  return str.replace(/\b\w/g, char => char.toUpperCase())
}
