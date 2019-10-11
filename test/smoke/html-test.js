const glob = require('glob-all')

// eslint-disable-next-line no-undef
describe('checking generated html files', () => {
  // eslint-disable-next-line no-undef
  it('should generate html files', (done) => {
    const files = glob.sync([
      './dist/reactdemo.html',
      './dist/vuedemo.html'
    ])

    if (files.length >= 2) {
      done()
    } else {
      throw Error('no html files generated')
    }
  })
})
