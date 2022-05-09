const { getPairsIconInfoByWeather } = require('./getPairsIconAndInfoByWeather')
const { shared } = require('../../../../utils')

/**
 * 
 * @param {{
 * clouds: number,
 * dew_point: number,
 * dt: number,
 * feels_like: number,
 * humidity: number,
 * pop: number,
 * pressure: number,
 * temp: number,
 * uvi: number,
 * visibility: number,
 * weather: [{
 *  description: string,
 *  icon: string,
 *  id: number,
 *  main: string,
 * }],
 * wind_deg: number,
 * wind_gust: number,
 * wind_speed: number,
 * }} data 
 * @returns string
 */
const formatHourlyWeatherDayDataString = (data, { first, last }) => {
  const {
    clouds,
    displayInfo,
    humidity,
    rain,
    snow,
    temp,
    wind_speed
  } = getPairsIconInfoByWeather(data);
  const visibility = parseInt(data.visibility)
  const visibilitiString = visibility > 9990 ? '' : visibility < 1000 ? `${visibility}m` : `${parseInt(data.visibility/1000)}km`
  
  const lastDay = new Date(data.dt*1000).getHours() === 23 ? true : false
  const firstDay = new Date(data.dt*1000).getHours() === 00 ? true : false
  // const monthDay = new Date(data.dt * 1000).getDate()
  // const yearMonth = new Date(data.dt * 1000).getMonth() + 1;

  return `${first || firstDay ? '' : '┣┓'}~${shared.getTime(data.dt*1000)}~﹝${displayInfo}﹞`
    + `\n┃┃${temp}~${clouds}~${humidity}`
    + `\n${visibilitiString ? '┃┃' : last || lastDay ? '┗┻' : '┣┻'}${wind_speed}~${rain}~${snow}`
    + `${visibilitiString ? `\n${last || lastDay ? '┗' : '┣'}┻🌁 Visibility ${visibilitiString}` : ''}`    
    + `\n`
}

module.exports = { formatHourlyWeatherDayDataString }
