const { WEATHER_PERIOD } = require('../../../constants')

const { currentDay } = require('./currentDay')
const { currentDayHours } = require('./currentDayHours')
const { currentWeek } = require('./currentWeek')

const formatWeatherMessage = (data, { weatherPeriod, dayOption }) => {
  let message = ''

  switch(weatherPeriod) {
    case WEATHER_PERIOD.NOW: 
      return currentDay(data.current);
    case WEATHER_PERIOD.DAY:
      return currentDayHours(data.hourly, dayOption)
    case WEATHER_PERIOD.WEEK:
      return currentWeek(data.daily)

    default: `Weather period is not defined or not supported. Period: ${weatherPeriod}`;
  }

  return message;
}

module.exports = { formatWeatherMessage }