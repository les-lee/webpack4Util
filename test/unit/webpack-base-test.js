const assert = require('assert')
// eslint-disable-next-line no-undef
describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')

  console.log(baseConfig)
  // eslint-disable-next-line no-undef
  it('entry', () => {
    assert.equal(baseConfig.entry.vuedemo.indexOf('/src/vuedemo/index.js') > -1, true)
    assert.equal(baseConfig.entry.reactdemo.indexOf('/src/reactdemo/index.js') > -1, true)
  })
})
