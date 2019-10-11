const path = require('path')

process.chdir(path.join(__dirname, 'smoke/template'))
// eslint-disable-next-line no-undef
describe('webpack.base.js', () => {
  require('./unit/webpack-base-test')
})
