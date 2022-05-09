const { BUTTONS } = require('./buttons')

const StartKeyboard = [
  ['Russian warship'],
  [BUTTONS.HELP, BUTTONS.WEATHER],
  ['Test'],
]

const WeatherPeriodMenu = [
  [
    { text: BUTTONS.NOW },
    { text: BUTTONS.DAY },
    { text: BUTTONS.WEEK }
  ], 
  [ 
    { text: BUTTONS.INFO },
    { text: BUTTONS.BACK }
  ]
]

module.exports = { StartKeyboard, WeatherPeriodMenu }
