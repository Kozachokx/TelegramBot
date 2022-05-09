const { getPairsIconInfoByWeather } = require('./helpers')
const { wrapTextInMonospace } = require('../telegram-style')

const currentDay = (data) => {
  const { 
    clouds,
    displayInfo,
    humidity,
    rain,
    snow,
    sunrise,
    sunset,
    temp,
    wind_speed
  } = getPairsIconInfoByWeather(data);

  const date = new Date()
  const visibility = parseInt(data.visibility)
  const visibilitiString = visibility < 10000 ? '' : visibility < 1000 ? `${visibility}m` : `${parseInt(data.visibility/1000)}km`
  const str = `[${date.toDateString()}]~﹝${displayInfo}﹞`
    + `\n┓${temp}~${clouds}~${humidity}`
    + `\n┃${wind_speed}~${rain}~${snow}`
    + `${visibilitiString ? `\n┃🌁 Visibility ${visibilitiString}` : ''}`
    + `\n┗${sunrise}~${sunset}`

  return wrapTextInMonospace(str,/(~)+/gi).replace(/~/gi, '\t');;
}

module.exports = { currentDay }