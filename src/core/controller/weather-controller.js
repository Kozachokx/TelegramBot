const { UNITS, WEATHER_PERIOD } = require('../../constants')

const callbackWithSendMessage = async (cb, args) => {
  console.log('🔵🟡 X')

  const result = await cb({...args});
  return result;
}

const Weather = require('../../services/weather')
const { weatherFormat } = require('../format-text')

/**
 * 
 * @param {{
 * info: true,
 * chatId: number,
 * lon: number,
 * lat: number,
 * units: Now|Day|Week,
 * weatherPeriod: Now|Day|Week,
 * dayOption: 0|1|2,
 * }} cfg 
 * @returns 
 */
const weatherController = async (cfg) => {
    if(cfg.info) return weatherFormat.getHelpWeatherInfo()
    if (
        cfg.lon &&
        cfg.lat &&
        Object.values(WEATHER_PERIOD).includes(cfg.weatherPeriod)
      ) {
      const data = await Weather.getWeatherByCoordinates({ ...cfg, units: cfg.units  || UNITS.METRIC });

      // const data = await callbackWithSendMessage(
      //   Weather.getWeatherByCoordinates,
      //   { ...cfg, units: cfg.units  || UNITS.METRIC },
      // );

      return weatherFormat.formatWeatherMessage(data, { weatherPeriod: cfg.weatherPeriod, dayOption: cfg.dayOption });

    }

  return;
}

module.exports = { weatherController }
