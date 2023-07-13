const assert = require('assert')
const urlFormatParser = require('../index')

describe('urlFormatParser', () => {
  it('should handle a URL format with multiple variables, constants and query params', () => {
    const urlInstance = '/6/api/listings/3?sort=desc&limit=10'
    const urlFormat = '/:version/api/:collection/:id'

    const result = urlFormatParser(urlInstance, urlFormat)

    assert.deepStrictEqual(result, {
      version: '6',
      collection: 'listings',
      id: '3',
      sort: 'desc',
      limit: '10',
    })
  })

  it('should throw an error for URL format without variables', () => {
    const urlInstance = 'https://example.com/posts'
    const urlFormat = '/invalid'

    assert.throws(() => urlFormatParser(urlInstance, urlFormat), Error)
  })
})
