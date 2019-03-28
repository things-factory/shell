const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OUTPUT_PATH = path.resolve('./dist')
const PUBLIC_PATH = '/dist/'

const module_resolve = require('resolve')

try {
  let path = module_resolve.sync('@things-factory/shell', {
    basedir: process.cwd()
  })
  var thingsShellModulePath = path.resolve(path, '../..')
  var externModulesPath = path.resolve(path, '../../../..')
} catch (e) {
  console.log('@things-factory/shell module not found.')
  var thingsShellModulePath = path.resolve(__dirname)
  var externModulesPath = path.resolve(__dirname, 'node_modules')
}

console.log('FactoryShell Module Path', thingsShellModulePath)
console.log('Extern Module Path', externModulesPath)

module.exports = {
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: path.join(__dirname, OUTPUT_PATH),
  //   publicPath: '/',
  //   port: 8080
  // },
  entry: {
    bundle: [
      path.resolve(thingsShellModulePath, './src/index.js'),
      'webpack-hot-client/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ]
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: PUBLIC_PATH
  },
  // plugins: [
  //   new HTMLWebpackPlugin({
  //     template: path.resolve(__dirname, 'index.html'),
  //     /*
  //     Allows to control how chunks should be sorted before they are included to the HTML.
  //     Allowed values are 'none' | 'auto' | 'dependency' | 'manual' | {Function}
  //     */
  //     chunksSortMode: 'none'
  //   }),
  //   new CopyWebpackPlugin(['assets/**'])
  // ],
  devtool: 'cheap-module-source-map'
}
