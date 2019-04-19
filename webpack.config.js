const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OUTPUT_PATH = path.resolve('./dist')

console.log('output path: ', OUTPUT_PATH)

const module_resolve = require('resolve')

try {
  let pathName = module_resolve.sync('@things-factory/shell', {
    basedir: process.cwd()
  })
  var shellModulePath = path.resolve(pathName, '../..')
  var nodeModulePath = path.resolve(pathName, '../../../..')
} catch (e) {
  console.log('@things-factory/shell module not found.')
  var shellModulePath = path.resolve(__dirname)
  var nodeModulePath = path.resolve(__dirname, 'node_modules')
  var localShell = true
}

console.log('FactoryShell Module Path', shellModulePath)
console.log('Extern Module Path', nodeModulePath)

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  resolve: {
    alias: localShell
      ? {
          '@things-factory/shell$': shellModulePath
        }
      : {},
    modules: [nodeModulePath]
  },
  resolveLoader: {
    modules: [nodeModulePath, path.resolve(shellModulePath, 'web-loaders')]
  },
  // output: {
  //   path: OUTPUT_PATH,
  //   publicPath: PUBLIC_PATH
  // },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        type: 'javascript/auto'
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader?limit=25000',
        query: {
          limit: 10000,
          name: file => {
            var dirname = path.dirname(file)
            dirname = dirname.replace(process.cwd(), '')
            dirname = dirname.replace('node_modules/@things-factory/', '')
            dirname = dirname.replace('assets/', '')

            return 'assets' + dirname + '/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\module-importer.import$/,
        use: {
          loader: 'things-factory-module-loader',
          options: {
            module_path: nodeModulePath
          }
        }
      },
      {
        test: /things-scene-components.import$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'things-scene-webpack-loader',
            options: {
              module_path: nodeModulePath
            }
          }
        ]
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
          from: path.resolve(__dirname, 'manifest.*'),
          to: OUTPUT_PATH
        },
        {
          from: path.resolve(__dirname, 'assets/**/*'),
          to: OUTPUT_PATH
        },
        {
          from: path.resolve(process.cwd(), 'node_modules/@things-factory/**/assets/locales/**/*'),
          to: 'assets/[1]/locales/[name].[ext]',
          toType: 'template',
          test: /node_modules\/@things\-factory\/(\w+)/
        }
      ],
      {
        /* shell project base */
        context: __dirname
      }
    ),
    new CopyWebpackPlugin(
      [
        {
          from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js*',
          to: OUTPUT_PATH
        },
        {
          from: 'node_modules/web-animations-js/web-animations-next.min.js*',
          to: OUTPUT_PATH
        }
      ],
      {
        /* each project base */
        context: process.cwd()
      }
    )
  ]
}
