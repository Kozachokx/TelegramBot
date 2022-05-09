// const { weatherFormat, telegramStyleFormat } = require('../format-text')

// const formatCurrentWeatherDataString = (data) => {
//   const { 
//     clouds,
//     displayInfo,
//     humidity,
//     rain,
//     snow,
//     sunrise,
//     sunset,
//     temp,
//     wind_speed
//   } = weatherFormat.helpers.getPairsIconInfoByWeather(data);

//   const date = new Date(1650897157 * 1000)

//   const str = weatherFormat.getHelpWeatherInfo() + '\n' +`[${date.toDateString()}]~﹝${displayInfo}﹞`
//     + `\n┓${temp}~${clouds}~${humidity}`
//     + `\n┃${wind_speed}~${rain}~${snow}`
//     + `\n┃${sunrise}~${sunset}`
//     + `\n┗🌁 Visibility ${parseInt(data.visibility/1000)}km`

//   return telegramStyleFormat.wrapTextInMonospace(str,/(~)+/gi).replace(/~/gi, '\t');;
// }

// Telegram monospace form
// const mono = (text) => '`'+ text +'`'

// const getInMonospaceFormatText = (text, regex = /( )+/gi) => {
//   return text.replace(regex, function (matched) {
//     return '`' + matched + '`'
//   })
// }

// const weatherInfo = `🌡 - Temperature~💧 - Humidity\n☁️ - Clouds~🌀 - Wind\n☔️ - Rain~❄️ - Snow\n` + `🌡Morning, Day, Evening, Night\n`

// const formatDailyWeek = (array) => {
//   let str = `\n${'━'.repeat(25)}\n`

//   str += array.map(day => weatherFormat.helpers.formatDailyWeatherDay(day)).join('\n') 
//   // str += '`'
  
//     console.log('Before:')
//     console.log(str)

//     // str.replace(/(;l)+/gi, function (matched) {
//     //   return '`' + matched + '`'
//     // })
//     // str.replace(/( )+/gi, function (matched) {
//     //   return '`' + matched + '`'
//     // })

//   console.log('After:')
//   console.log(str)

//   return telegramStyleFormat.wrapTextInMonospace(str,/(~)+/gi).replace(/~/gi, '\t');
// }

// const parseDailyData = (data) => {

    
// }

// module.exports = { formatCurrentWeatherDataString, formatDailyWeek }
