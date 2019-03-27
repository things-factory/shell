const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OUTPUT_PATH = 'dist'

module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, OUTPUT_PATH),
    publicPath: '/',
    port: 8080
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      chunksSortMode: 'none'
    }),
    new CopyWebpackPlugin(['assets/**'])
  ],
  devtool: 'cheap-module-source-map'
}
