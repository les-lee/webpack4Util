const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// eslint-disable-next-line import/no-extraneous-dependencies
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const glob = require('glob')

const projectRoot = process.cwd()

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'))

  Object.keys(entryFiles).map((itemIndex) => {
    const entryFile = entryFiles[itemIndex]
    const match = entryFile.match(/src\/(.*)\/index.js$/)
    const pageName = match && match[1]

    entry[pageName] = entryFile
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        // collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCss: true,
        minifyJS: true,
        removeComments: false
      }
    }))

    return ''
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry,
  output: {
    path: path.resolve(projectRoot, './dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  // watch: true,
  // mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /.vue$/,
        use: 'vue-loader'
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          }
        ]
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          }
        ]
      },
      {
        test: /.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /.(gif|png|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]'
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash].css'
    }),
    new FriendlyErrorsWebpackPlugin(),
    function tapdone() {
      // this.plugin('done', (stats) => { /** webpack 3 */
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors
          && stats.compilation.errors.length
          && process.argv.indexOf('--watch') === -1) {
          console.log('build error')
          process.exit(1)
        }
      })
    },
    new VueLoaderPlugin()
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only'
}
