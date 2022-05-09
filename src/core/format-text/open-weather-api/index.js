module.exports = {
  ...require('./currentDay'),
  ...require('./currentDayHours'),
  ...require('./currentWeek'),
  ...require('./formatWeatherMessage'),
  ...require('./getWeatherInfo'),
  helpers: require('./helpers')
}