const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
  timeout: '100000ms'
})

process.chdir(path.join(__dirname, 'template'))

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod.js')

  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err)
      process.exit(2)
    } else {
      console.log(stats.toString({
        colors: true,
        modules: false,
        children: false
      }))

      console.log('webpack build success, begin run test')
      mocha.addFile(path.join(__dirname, 'html-test.js'))
      mocha.addFile(path.join(__dirname, 'js-css-test.js'))

      mocha.run()
    }
  })
})
