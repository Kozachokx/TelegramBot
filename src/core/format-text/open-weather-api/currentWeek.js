const { formatWeekWeatherDayString } = require('./helpers')
const { wrapTextInMonospace } = require('../telegram-style')

const currentWeek = (array) => {
  // let str = `\n${'━'.repeat(25)}\n`
  let str = ``
  str += array.map(day => formatWeekWeatherDayString(day)).join('\n') 
  // str += '`'
  
    // console.log('Before:')
    // console.log(str)

    // str.replace(/(;l)+/gi, function (matched) {
    //   return '`' + matched + '`'
    // })
    // str.replace(/( )+/gi, function (matched) {
    //   return '`' + matched + '`'
    // })

  // console.log('After:')
  // console.log(str)

  return wrapTextInMonospace(str,/(~)+/gi).replace(/~/gi, '\t');
}

module.exports = { currentWeek }

