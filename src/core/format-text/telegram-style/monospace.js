const { wrapMatchedText } = require('./wrapMatchedText')

const wrapTextInMonospace = (text, regex = /(~)+/gi) => {
  return wrapMatchedText(text, regex, '`')
}

module.exports = { wrapTextInMonospace }
