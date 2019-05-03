const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const AppPackage = require('./package.json')

const OUTPUT_PATH = path.resolve('./dist-client')

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

const ShellPackage = require(path.resolve(shellModulePath, 'package.json'))

module.exports = {
  mode: 'development',
  entry: {
    main: [
      path.resolve(__dirname, 'client/index.js'),
      'webpack-hot-client/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ]
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
  output: {
    path: OUTPUT_PATH,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/env',
              {
                targets: {
                  browsers: ['last 2 Chrome versions', 'Safari 10']
                },
                debug: true
              }
            ]
          ],
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                decoratorsBeforeExport: false
              }
            ],
            ['@babel/plugin-proposal-class-properties'],
            ['@babel/plugin-syntax-dynamic-import'],
            [
              '@babel/plugin-proposal-object-rest-spread',
              {
                useBuiltIns: true
              }
            ]
          ]
        }
      },
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
        test: /\.css$/,
        use: ['css-loader']
      },
      {
        test: /\.(obj|mtl|tga|3ds|max|dae)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
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
      },
      {
        test: /things-scene-components-with-tools.import$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'things-scene-config-webpack-loader',
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
      template: path.resolve(__dirname, '_index.html'),
      hash: true,
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
    ),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE-ENV': JSON.stringify('development'),
        'SHELL-VERSION': JSON.stringify(ShellPackage.version),
        'SHELL-LICENSE': JSON.stringify(ShellPackage.license),
        'APP-VERSION': JSON.stringify(AppPackage.version),
        'APP-LICENSE': JSON.stringify(AppPackage.license)
      }
    })
  ],
  devtool: 'cheap-module-source-map'
}
