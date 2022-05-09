const { getTime } = require('../../../../utils/shared')
const { formatTemperature } = require('./formatTemperature')
const { getIconByWeatherDescription } = require('./getIconByWeatherDescription')

/**
 * 
 * @param {{
 * clouds: number,
 * dew_point: number,
 * dt: number,
 * feels_like: object,
 * humidity: number,
 * moon_phase: number,
 * moonrise: number,
 * moonset: number,
 * pop: number,
 * presure: number,
 * rain: number,
 * sunrise: number,
 * sunset: number,
 * temp: number | object,
 * uvi: number,
 * visibility: number,
 * weather: array,
 * wind_deg: number,
 * wind_gust: number,
 * wind_speed: number,
 * }} weatherObj 
 * @returns 
 */
const getPairsIconInfoByWeather = (weatherObj) => {
  let temperature = ''
  // const rain = weatherObj.rain ? `☔️${weatherObj.rain}mm` : ''
  let rain = ''

  if (weatherObj.rain) {
    if(typeof weatherObj.rain === 'object') {
      rain = `☔️${weatherObj.rain['1h']}mm`
    } else {
      rain = `☔️${weatherObj.rain}mm`
    }
  }

  if (weatherObj.temp) {
    if(typeof weatherObj.temp === 'object') {
      temperature = `🌡${formatTemperature(weatherObj.temp.morn)}, `
        + `${formatTemperature(weatherObj.temp.day)}, ` 
        + `${formatTemperature(weatherObj.temp.eve)}, `
        + `${formatTemperature(weatherObj.temp.night)}`
    } else {
      temperature = `🌡${formatTemperature(weatherObj.temp)}`
    }
  }

  const displayInfo = `${getIconByWeatherDescription(weatherObj.weather[0])}${weatherObj.weather[0].main === 'Rain' ? weatherObj.weather[0].description[0].toUpperCase() + weatherObj.weather[0].description.slice(1) : weatherObj.weather[0].main }`
  const humidity = weatherObj.humidity ? `💧${weatherObj.humidity}%` : '💧0%'
  const clouds = weatherObj.clouds ? `☁️${weatherObj.clouds}%` : '☁️0%'
  // const rain = weatherObj.rain ? `☔️${weatherObj.rain}mm` : ''
  const snow = weatherObj.snow ? `❄️${weatherObj.snow}mm` : ''
  const wind_speed = weatherObj.wind_speed ? `🌀${weatherObj.wind_speed}m/s` : ''
  const sunrise = weatherObj.sunrise ? `🌅 Sunrise ${getTime(weatherObj.sunrise*1000)}` : ''
  const sunset = weatherObj.sunset ? `🌇 Sunset ${getTime(weatherObj.sunset*1000)}` : ''

  return {
    clouds,
    displayInfo,
    humidity,
    rain,
    snow,
    sunrise,
    sunset,
    temp: temperature,
    wind_speed,
  }
}

module.exports = { getPairsIconInfoByWeather }
