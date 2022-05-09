const axios = require("axios");
const { weatherFormat } = require('../../core/format-text')
const { bot } = require('../../bot')
const CONFIG = require('../../config')

const getWeatherByCoordinates = async ({
  chatId, lat, lon, units, lang, exclude, callback, weatherPeriod
}) => {
  return await new Promise( async (resolve, reject) => {
    if (!lat || !lon) {
      return 'Coordinates not defined!'
    }

    const opts = {
      parse_mode: 'Markdown',
      reply_markup: {
        keyboard: [['Yes','No'], ['Weather'], ['Test']],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    };

    const optUnit = units ? `&units=${units}` : ''
    const optLang = units ? `&lang=${lang}` : ''
    const optEx = exclude ? `&exclude=${exclude}` : ''

    const options = {
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}${optUnit}${optEx}${optLang}&appid=${CONFIG.OPEN_WEATHER_API}`,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "keep-alive": "timeout=5"
      }
    };

    const data = await axios.request(options).then(function (response) {
      // console.log(response.data);
      console.log(' RESPONCE');
      return response.data
    }).catch(function (error) {
      console.error(error);
      return error.response.data.error
    });

    return resolve(data);

    const responce = weatherFormat.currentDay(data.current) + '\n\n' + weatherFormat.currentWeek(data.daily)

    console.log(' AFTER RESOLVE')

    // callback(chatId, JSON.stringify(data), opts);
    // bot.sendMessage(chatId, responce, opts);
    // resolve(true)
  })
}

module.exports = { getWeatherByCoordinates }
