const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const OUTPUT_PATH = 'dist'
module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, OUTPUT_PATH),
    port: 8080
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      /*
      Allows to control how chunks should be sorted before they are included to the HTML.
      Allowed values are 'none' | 'auto' | 'dependency' | 'manual' | {Function}
      */
      chunksSortMode: 'none'
    })
  ]
}
