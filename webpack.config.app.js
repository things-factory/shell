const path = require('path')

const AppRootPath = require('app-root-path').path
const AppPackage = require(path.resolve(AppRootPath, 'package.json'))

const OUTPUT_PATH = path.resolve(__dirname, './www/js')

console.log('Output Path: ', OUTPUT_PATH)

const module_resolve = require('resolve')

if (AppPackage.name !== '@things-factory/shell') {
  try {
    let pathName = module_resolve.sync('@things-factory/shell', {
      basedir: process.cwd()
    })
    var ShellModulePath = path.resolve(pathName, '../..')
    var NodeModulePath = path.resolve(pathName, '../../../..')
  } catch (e) {
    throw new Exception('@things-factory/shell module not found.', e)
  }
} else {
  var ShellModulePath = path.resolve(__dirname)
  var NodeModulePath = path.resolve(__dirname, 'node_modules')
}

console.log('FactoryShell Module Path', ShellModulePath)
console.log('Extern Module Path', NodeModulePath)

module.exports = {
  mode: 'production',
  entry: {
    index: [path.resolve(__dirname, 'www', 'js', '_index.js')]
  },
  resolve: {
    modules: [NodeModulePath]
  },
  resolveLoader: {
    modules: [path.resolve(ShellModulePath, 'web-loaders'), NodeModulePath]
  },
  externals: {
    '@hatiolab/things-scene': 'scene'
  },
  output: {
    path: OUTPUT_PATH
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /native-importer.import$/,
        use: {
          loader: 'things-factory-native-loader',
          options: {
            module_path: NodeModulePath
          }
        }
      }
    ]
  },
  plugins: [],
  devtool: 'cheap-module-source-map'
}
