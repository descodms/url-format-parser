const Url = require('url-parse')

// this function parses the url format and return an object
// where the variables name are the keys and the position are the values
const formatParser = (urlFormat) => {
  const urlFormatVars = urlFormat.split('/').slice(1)

  const urlVariablesPosition = {}
  urlFormatVars.forEach((element, index) => {
    if (element.startsWith(':')) {
      urlVariablesPosition[element.slice(1)] = index
    }
  })
  return urlVariablesPosition
}

// this is the main function, it receives the url instance and the url format from the event handler
// it calls the formatParser function to get the variables position
// then it parses the url instance and returns the final hash with url variables and query params.
const urlFormatParser = (urlInstance, urlFormat) => {
  const url = new Url(urlInstance, '', true)
  const urlInstanceParsed = url.pathname.split('/').slice(1)

  const urlVariablesPosition = formatParser(urlFormat)
  if (Object.keys(urlVariablesPosition).length === 0) {
    throw new Error('the URL is invalid')
  }

  for (const key in urlVariablesPosition) {
    const position = urlVariablesPosition[key]
    urlVariablesPosition[key] = urlInstanceParsed[position]
  }

  return {
    ...url.query,
    ...urlVariablesPosition,
  }
}

module.exports = urlFormatParser
