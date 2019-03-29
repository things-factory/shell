const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OUTPUT_PATH = path.resolve('./dist')
const PUBLIC_PATH = '/dist/'

console.log('output path: ', OUTPUT_PATH)

const module_resolve = require('resolve')

try {
  let pathName = module_resolve.sync('@things-factory/shell', {
    basedir: process.cwd()
  })
  var shellModulePath = path.resolve(pathName, '../..')
  var nodeModulePath = path.resolve(pathName, '../../../..')
} catch (e) {
  console.log('@things-factory/shell module not found.', e)
  var shellModulePath = path.resolve(__dirname)
  var nodeModulePath = path.resolve(__dirname, 'node_modules')
}

console.log('FactoryShell Module Path', shellModulePath)
console.log('Extern Module Path', nodeModulePath)

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(process.cwd(), OUTPUT_PATH),
    publicPath: '/',
    port: 8080
  },
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  resolve: {
    modules: [nodeModulePath]
  },
  resolveLoader: {
    modules: [nodeModulePath, path.resolve(shellModulePath, 'web-loaders')]
  },
  // entry: {
  //   bundle: [
  //     path.resolve(thingsShellModulePath, './src/index.js'),
  //     'webpack-hot-client/client?path=/__webpack_hmr&timeout=20000&reload=true'
  //   ]
  // },
  // output: {
  //   path: OUTPUT_PATH,
  //   publicPath: PUBLIC_PATH
  // },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader'
      //   }
      // }
      {
        test: /\module-importer.import$/,
        use: {
          loader: 'things-factory-module-loader',
          options: {
            module_path: nodeModulePath
          }
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      /*
      Allows to control how chunks should be sorted before they are included to the HTML.
      Allowed values are 'none' | 'auto' | 'dependency' | 'manual' | {Function}
      */
      chunksSortMode: 'none'
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, 'assets/**/*'),
          to: OUTPUT_PATH
        }
      ],
      {
        context: __dirname
      }
    )
  ],
  devtool: 'cheap-module-source-map'
}
