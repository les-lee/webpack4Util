const glob = require('glob-all')
// eslint-disable-next-line no-undef
describe('checking generated js&css files', () => {
  // eslint-disable-next-line no-undef
  it('should generate js&css files', (done) => {
    const files = glob.sync([
      './dist/reactdemo_*.css',
      './dist/reactdemo_*.js',
      './dist/vuedemo_*.css',
      './dist/vuedemo_*.js'
    ])

    if (files.length >= 2) {
      done()
    } else {
      throw Error('no js&css files generated')
    }
  })
})
