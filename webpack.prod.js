const { merge } = require('webpack-merge'),
  common = require('./webpack.common.js'),
  webpack = require('webpack')
TerserPlugin = require('terser-webpack-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: [ // 設定相依套件 (安裝此Component的使用者必須安裝的模組)
    {
      react: 'react',
      'react-dom': 'react-dom',
      'prop-types': 'prop-types',
    },
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 壓縮JS
      new TerserPlugin({
        test: /\.js(x)?(\?.*)?$/i,
        exclude: /node_modules/,
        terserOptions: {
          compress: {
            warnings: false, // 當刪除沒有用處的代碼時，顯示警告
            drop_console: true // 刪除console.*函數
          },
          output: {
            beautify: false, // 是否美化輸出代碼
            comments: false // 保留所有註釋
          }
        }
      }),
      // 壓縮CSS
      // new OptimizeCSSAssetsPlugin()
    ]
  },
})