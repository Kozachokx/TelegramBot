const wrapMatchedText = (text, regex = /( )+/gi, wrapSymbol = '`') => {
  return text.replace(regex, function (matched) {
    return wrapSymbol + matched + wrapSymbol
  })
}

module.exports = { wrapMatchedText }
