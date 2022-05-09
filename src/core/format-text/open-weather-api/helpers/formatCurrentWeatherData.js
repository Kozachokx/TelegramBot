const { getPairsIconInfoByWeather } = require('./getPairsIconAndInfoByWeather')

const formatCurrentWeatherDataString = (data) => {
  const {clouds, displayInfo, humidity, rain, snow, sunrise, sunset, temp, wind_speed} = getPairsIconInfoByWeather(data);

  const date = new Date(1650897157 * 1000)
  // const currentWeather = data?.weather[0].main

  const str = weatherInfo + '\n' +`[${date.toDateString()}]~﹝${displayInfo}﹞`
    + `\n┓${temp}~${clouds}~${humidity}`
    + `\n┃${wind_speed}~${rain}~${snow}`
    + `\n┃${sunrise}~${sunset}`
    + `\n┗🌁 Visibility ${parseInt(data.visibility/1000)}km`

  return wrapText(str,/(~)+/gi).replace(/~/gi, '\t');;
}

module.exports = { formatCurrentWeatherDataString }
