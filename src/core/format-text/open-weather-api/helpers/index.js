module.exports = {
  ...require('./formatCurrentWeatherData'),
  ...require('./formatHourlyWeatherDayData'),
  ...require('./formatWeekWeatherDayString'),
  ...require('./formatTemperature'),
  ...require('./getIconByWeatherDescription'),
  ...require('./getPairsIconAndInfoByWeather')
}
