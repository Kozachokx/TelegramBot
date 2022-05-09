const { BUTTONS } = require("./buttons")

const KEYBOARD_MENU = {
  START: [
    [
      { text: BUTTONS.WEATHER }
    ],
    [
      { text: BUTTONS.HELP }
    ],
  ],
  WEATHER: [
    [
      { text: BUTTONS.WEATHER }
    ]
  ],
  WEATHER_BY_LOCATION: [
    [
      { text: BUTTONS.GET_WEATHER, request_location: true }
    ]
  ],
  WEATHER_DAY_OPTION: [
    [
      { text: BUTTONS.TODAY },
      { text: BUTTONS.TOMORROW },
      { text: BUTTONS.AFTER_TOMORROW }
    ], 
    [ 
      { text: BUTTONS.BACK }
    ]
  ],
  WEATHER_PERIOD: [
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
}

module.exports = { KEYBOARD_MENU }
