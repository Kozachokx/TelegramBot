const { getPairsIconInfoByWeather } = require('./getPairsIconAndInfoByWeather')

const formatWeekWeatherDayString = (data) => {
  const {clouds, displayInfo, humidity, rain, snow, sunrise, sunset, temp, wind_speed} = getPairsIconInfoByWeather(data);

  const monthDay = new Date(data.dt * 1000).getDate()
  const yearMonth = new Date(data.dt * 1000).getMonth() + 1;

  return `\n${monthDay <= 9 ? '0' + monthDay : monthDay}`+ `.${yearMonth <= 9 ? '0' + yearMonth : yearMonth}~﹝${displayInfo}﹞`
    + `\n┓`+ temp
    + `\n┃`+ clouds + '~' + humidity + '~' + wind_speed
    + `${ rain || snow  ? '\n┃' : ''}` + rain + '~' + snow
    + '\n┗'+ sunrise + '~' + sunset
}

module.exports = { formatWeekWeatherDayString }
