const merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /.css$/,
        use: 'ignore-loader'
      },
      {
        test: /.less$/,
        use: 'ignore-loader'
      },
      {
        test: /.scss$/,
        use: 'ignore-loader'
      },
      {
        test: /.styl$/,
        use: 'ignore-loader'
      }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetsNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
    // new HtmlWebpackExternalsPlugin({
    //   externals: [ /** 外部CDN引入, 不通过打包的方式 */
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/',
    //       global: 'React'
    //     }
    //   ]
    // })
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
}

module.exports = merge(baseConfig, prodConfig)
