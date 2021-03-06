const dotenv = require('dotenv')
const path = require('path')
const ENV = process.env;
const dotenvPath = path.join(__dirname, '../../', `.env`);

dotenv.config({
  path: dotenvPath
})

const config = {
  TELEGRAM_TOKEN: ENV.TELEGRAM_TOKEN,
  OPEN_WEATHER_API: ENV.OPEN_WEATHER_API,
}

console.log(config)

module.exports = config
