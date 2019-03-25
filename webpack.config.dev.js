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
      template: path.resolve(__dirname, 'index.html')
    })
  ],
  devtool: 'cheap-module-source-map'
};