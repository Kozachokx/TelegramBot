const { UNITS } = require('../../../../constants')

const formatTemperature = (number, units = UNITS.METRIC) => {
  if (!Number.isNaN(number)) {
    return `${number.toFixed(1)}°${units === UNITS.METRIC ? 'C' : 'F'}`
  }
}

module.exports = { formatTemperature }
