// const TelegramBot = require('node-telegram-bot-api');

const { weatherController } = require('./core/controller')
// const CONFIG = require('./config')
const { UNITS, KEYBOARD_MENU, DAY_OPTION } = require('./constants')

const { bot } = require('./bot')

// const token = CONFIG.TELEGRAM_TOKEN
// const bot = new TelegramBot(token, {polling: true})

//Main Script
bot.onText(/\/start/, (msg) => {
  console.log('🔵🟡 1')
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: {
      keyboard: KEYBOARD_MENU.START,
      resize_keyboard: true,
      // one_time_keyboard: true
    }
  };
  bot.sendMessage(msg.chat.id, `Hello`, opts);
});

/**
   * 
   * @param {number} chatId 
   * @param {[]} msgIdArray 
   */
 const deleteMessages = (chatId, msgIdArray) => {
  msgIdArray.map(msgId => { bot.deleteMessage(chatId, msgId) })
}

bot.onText(/Weather/gi, (msgUserW) => {
    const opt1 = {
      // reply_to_message_id: msg.message_id,
      reply_markup: {
        keyboard: KEYBOARD_MENU.WEATHER,
        resize_keyboard: true,
        one_time_keyboard: true,
    }
  }

  bot.sendMessage(msgUserW.chat.id, 'Weather forecast', { reply_markup: {resize_keyboard: true, one_time_keyboard: true, keyboard: KEYBOARD_MENU.WEATHER_PERIOD } })
        .then((msgBack) => {

          bot.once('message', async (msgChoice) => {
            const wpChoice = msgChoice.text?.toUpperCase()

            if( !['NOW','DAY','WEEK', 'INFO', 'BACK'].includes(wpChoice) ){
              deleteMessages(msgChoice.chat.id, [msgBack.message_id, msgChoice.message_id])
              // bot.deleteMessage(msgChoice.chat.id, msgBack.message_id)
              // bot.deleteMessage(msgChoice.chat.id, msgChoice.message_id)
              bot.sendMessage(msgChoice.chat.id, 'Menu', { reply_markup: {resize_keyboard: true, one_time_keyboard: true, keyboard: KEYBOARD_MENU.START } })
              return;
            } 
            
            if (wpChoice === 'BACK') {
              deleteMessages(msgChoice.chat.id, [msgBack.message_id, msgChoice.message_id])
              bot.sendMessage(msgChoice.chat.id, 'Back', opt1)
              return;
            } 
            
            if (wpChoice === 'INFO') {
              deleteMessages(msgChoice.chat.id, [msgBack.message_id, msgChoice.message_id])
              const info = await weatherController({ info: true })
              return bot.sendMessage(msgChoice.chat.id, info, opt1);
            }

            deleteMessages(msgChoice.chat.id, [msgBack.message_id, msgChoice.message_id])
            // bot.deleteMessage(msgChoice.chat.id, msgBack.message_id)
            // bot.deleteMessage(msgChoice.chat.id, msgChoice.message_id)
            bot.sendMessage(msgUserW.chat.id, 'Get weather forecast', { reply_markup: {resize_keyboard: true, one_time_keyboard: true, keyboard: KEYBOARD_MENU.WEATHER_BY_LOCATION } })
              .then((msgGWF) => {
                if (wpChoice === 'DAY') {
                  return bot.sendMessage(msgUserW.chat.id, 'Choose day', { reply_markup: {resize_keyboard: true, one_time_keyboard: true, keyboard: KEYBOARD_MENU.WEATHER_DAY_OPTION } })
                    .then((msgOption) => {
                      deleteMessages(msgOption.chat.id, [msgGWF.message_id])

                      bot.once('message', async (msgOptionAnsw) => {
                        const wpOption = msgOptionAnsw.text?.toUpperCase().replace(/ /gi, '_')

                        if( !['TODAY','TOMORROW','AFTER_TOMORROW', 'BACK'].includes(wpOption) ){
                          deleteMessages(msgOptionAnsw.chat.id, [msgOption.message_id, msgOptionAnsw.message_id])
                          bot.sendMessage(msgOptionAnsw.chat.id, 'Menu', { reply_markup: {resize_keyboard: true, one_time_keyboard: true, keyboard: KEYBOARD_MENU.START } })
                          return;
                        }

                        if (wpOption === 'BACK') {
                          deleteMessages(msgOptionAnsw.chat.id, [msgOption.message_id, msgOptionAnsw.message_id])
                          bot.sendMessage(msgOptionAnsw.chat.id, 'Back', opt1)
                          return;
                        }

                        deleteMessages(msgOptionAnsw.chat.id, [msgOption.message_id, msgOptionAnsw.message_id])
                        bot.sendMessage(msgOptionAnsw.chat.id, 'Get weather forecast', { reply_markup: {resize_keyboard: true, one_time_keyboard: true, keyboard: KEYBOARD_MENU.WEATHER_BY_LOCATION } })
                        .then((msgDayLocation) => {
                          bot.once('location', async (msgLocation) => {
                            const result = await weatherController(
                              { chatId: msgLocation.chat.id, lon: msgLocation.location.longitude, lat: msgLocation.location.latitude, units: UNITS.METRIC, weatherPeriod: wpChoice, dayOption: DAY_OPTION[`${wpOption}`] },
                              )
                            deleteMessages(msgLocation.chat.id, [msgDayLocation.message_id, msgLocation.message_id])
                            bot.sendMessage(msgChoice.chat.id, result, { parse_mode: 'Markdown', })
                          })
                        })

                      })

                    })
                }

                bot.once('location', async (msgLocation) => {
                  const result = await weatherController(
                    { chatId: msgLocation.chat.id, lon: msgLocation.location.longitude, lat: msgLocation.location.latitude, units: UNITS.METRIC, weatherPeriod: wpChoice },
                    )
                  deleteMessages(msgChoice.chat.id, [msgGWF.message_id, msgLocation.message_id])
                  bot.sendMessage(msgChoice.chat.id, result, { parse_mode: 'Markdown', })
                })
              })

            // const result = await weatherController(
            //   { chatId: msgChoice.chat.id, lon: msgChoice.location.longitude, lat: msgChoice.location.latitude, units: UNITS.METRIC, weatherPeriod: msgText },
            // )
            // bot.sendMessage(msgChoice.chat.id, result)
            // d
            return;
          })
          
        })
})

bot.onText(/getLocation/, (msg) => {
  console.log('🔵🟡 4')

  const opts = {
    reply_markup: {
      keyboard: [
        [{text: 'Location', request_location: true, callback_query: 'Query'}],
        [{text: 'LocationX', request_location: true, request_poll: 'TEXT'}],
        [{text: 'Contact', request_contact: true}],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
    callback_query: 'QUERRYYYYY'
  };
  bot.sendMessage(msg.chat.id, 'Contact and Location request', opts).then(answer => {
    console.log('🔵🟡 4.1')
    bot.once('message', ans => {
      console.log('🔵🟡 4.3')
      console.log(ans)
    })
    
    console.log(' ')
    console.log('the answer is: ')
    console.log(answer)
    console.log('🔵🟡 4.2')
  })
});

// bot.on('location', (msg) => {
//   console.log('🔵🟡 5')

//   console.log('\n ON Location message: ')
//   console.log(msg.location.latitude);
//   console.log(msg.location.longitude);
//   console.log(msg);
  
//   callbackWithSendMessage(
//     Weather.getWeatherByCoordinates,
//     { chatId: msg.chat.id, lon: msg.location.longitude, lat: msg.location.latitude, units: UNITS.METRIC },
//     bot.sendMessage
//   );
// });

bot.on('contact', (msg) => {
  console.log('🔵🟡 6')

  console.log(' ');
  console.log(' MESSAGE ON CONTACT: ');
  console.log(msg);
});

// bot.on('message', (msg) => {
//   console.log('\nON MESSAGE')
//   console.log(msg)

// })

bot.onText(/Contact Us/, (msg) => {
  console.log('🔵🟡 7')

  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: KEYBOARD_MENU.START,
      resize_keyboard: true,
      one_time_keyboard: true
    })
  };
  bot.sendMessage(msg.chat.id, `Please Write Your Message:`, opts);
  callback(getMessage);
});

// bot.onText(/Weatherx/, (msg) => {
//   console.log('🔵🟡 8')

//   callbackWithSendMessage(
//       Weather.getWeatherByCoordinates,
//       { chatId: msg.chat.id, lon: 11.0767, lat: 49.4521, units: UNITS.METRIC },
//       bot.sendMessage
//     );
// });

// Functions
const getMessage = async () => {
  await new Promise((resolve, reject) => {
    bot.once('message', (msg) => {
      console.log("User Message Is: " + msg.text)
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          keyboard: KEYBOARD_MENU.START,
          resize_keyboard: true,
          one_time_keyboard: true
        })
      };
      bot.sendMessage(msg.chat.id, 'Thanks, Your Message Received', opts);
      resolve(true);
    });
  });
  return
}

const callback = async (cb, args) => {
  console.log('🔵🟡 10')

  console.log(' - - - - -- ')
  console.log(args)
  await cb(args);
}

bot.on("polling_error", console.log)


module.exports = { bot }
