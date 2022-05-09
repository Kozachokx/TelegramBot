const { formatHourlyWeatherDayDataString } = require('./helpers')
const { wrapTextInMonospace } = require('../telegram-style')

const DAY = {
  TODAY: 0,
  TOMORROW: 1,
  AFTER_TOMORROW: 2,
}

/**
 * 
 * @param {[{
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
 * }]} forecastArray 
 * @returns 
 */
const currentDayHours = (forecastArray, dayOption = DAY.TODAY) => {
  let monthDay = new Date(forecastArray[0]?.dt * 1000).getDate(),
      dayIndex = 0,
      newDayRow = true;
  // let last = null;

  let str = ``
  str += forecastArray.map((hourData, i) => {
    let tempMonthDay = new Date(hourData.dt * 1000).getDate();

    const first = i === 0;
    const last = forecastArray.length-1 === i ? true : false 

    if (tempMonthDay !== monthDay && !first) {
      dayIndex += 1;
      monthDay = new Date(hourData.dt * 1000).getDate();
      newDayRow = true;
    }

    if (dayIndex === dayOption){
      if (newDayRow) {
        const yearMonth = new Date(hourData.dt * 1000).getMonth() + 1;
        newDayRow = false;

        return `\n\n┳┓${monthDay <= 9 ? '0' + monthDay : monthDay}`
          + `.${yearMonth <= 9 ? '0' + yearMonth : yearMonth}~`
          + formatHourlyWeatherDayDataString(hourData, {first, last})
      }

      return `┃\n` + formatHourlyWeatherDayDataString(hourData, {first, last})
    }
  }).join('')

  return wrapTextInMonospace(str, /(~)+/gi).replace(/~/gi, '\t');
}

module.exports = { currentDayHours }