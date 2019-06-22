const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const AppRootPath = require('app-root-path').path
const AppPackage = require(path.resolve(AppRootPath, 'package.json'))

const OUTPUT_PATH = path.resolve('./dist-client')

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

const ShellPackage = require(path.resolve(ShellModulePath, 'package.json'))

/* check if application root has _index.html for override template */
try {
  if (fs.existsSync(path.resolve(AppRootPath, '_index.html'))) {
    var TemplatePath = path.resolve(AppRootPath, '_index.html')
  } else {
    var TemplatePath = path.resolve(ShellModulePath, '_index.html')
  }
} catch (e) {
  var TemplatePath = path.resolve(ShellModulePath, '_index.html')
}

console.log('Index.html TemplatePath', TemplatePath)

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'client/index.js'),
    'headless-scene-components': [path.resolve(ShellModulePath, './client/scene/scene-components.js')]
  },
  resolve: {
    aliasFields: ['browser'],
    alias: {
      [AppPackage.name]: AppRootPath
    },
    modules: [NodeModulePath]
  },
  resolveLoader: {
    modules: [path.resolve(ShellModulePath, 'web-loaders'), NodeModulePath]
  },
  externals: {
    '@hatiolab/things-scene': 'scene'
  },
  output: {
    path: OUTPUT_PATH,
    // filename: '[name].[hash].js',
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
                debug: false
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
            module_path: NodeModulePath
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
              module_path: NodeModulePath
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
              module_path: NodeModulePath
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: TemplatePath,
      /*
      Allows to control how chunks should be sorted before they are included to the HTML.
      Allowed values are 'none' | 'auto' | 'dependency' | 'manual' | {Function}
      */
      chunksSortMode: 'none'
    }),
    new CopyWebpackPlugin(
      [
        {
          /* shell의 manifest를 application base로 복사함 */
          from: path.resolve(ShellModulePath, 'manifest.*'),
          to: path.resolve(OUTPUT_PATH, '[name].[ext]'),
          toType: 'template'
        },
        {
          /* shell의 asset을 application base로 복사함 */
          from: path.resolve(ShellModulePath, 'assets'),
          to: path.resolve(OUTPUT_PATH, 'assets'),
          toType: 'dir'
        },
        {
          /* 각 모듈의 locales를 application base로 복사함 */
          from: path.resolve(AppRootPath, 'node_modules/@things-factory/**/assets/locales/**/*'),
          to: path.resolve(OUTPUT_PATH, 'assets', '[1]', 'locales', '[name].[ext]'),
          toType: 'template',
          test: /node_modules\/@things\-factory\/(\w+)/,
          force: true
        },
        {
          /* application의 locales를 application base로 복사함 */
          from: path.resolve(AppRootPath, 'assets/locales/**/*'),
          to: path.resolve(
            OUTPUT_PATH,
            'assets',
            AppPackage.name.substr('@things-factory/'.length),
            'locales',
            '[name].[ext]'
          ),
          toType: 'template',
          force: true
        },
        {
          /* 각 모듈의 views를 application base로 복사함 */
          from: path.resolve(AppRootPath, 'node_modules/@things-factory/**/views/**/*'),
          to: path.resolve(OUTPUT_PATH, 'views', '[name].[ext]'),
          toType: 'template',
          force: true
        },
        {
          /* application의 views를 application base로 복사함 */
          from: path.resolve(AppRootPath, 'views/**/*'),
          to: path.resolve(OUTPUT_PATH, 'views', '[name].[ext]'),
          toType: 'template',
          force: true
        },
        {
          /* application에서 manifest를 overide 하기위해서 */
          from: path.resolve(AppRootPath, 'manifest.*'),
          to: path.resolve(OUTPUT_PATH, '[name].[ext]'),
          toType: 'template',
          force: true
        },
        {
          /* application에서 assets를 overide 하기위해서 */
          from: path.resolve(AppRootPath, 'assets'),
          to: path.resolve(OUTPUT_PATH, 'assets'),
          toType: 'dir',
          force: true
        }
      ],
      {
        /* application base */
        context: AppRootPath
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
        },
        {
          from: 'node_modules/@hatiolab/things-scene/*.js*',
          to: OUTPUT_PATH
        }
      ],
      {
        /* application base */
        context: AppRootPath
      }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE-ENV': JSON.stringify('production'),
        'SHELL-VERSION': JSON.stringify(ShellPackage.version),
        'SHELL-LICENSE': JSON.stringify(ShellPackage.license),
        'APP-VERSION': JSON.stringify(AppPackage.version),
        'APP-LICENSE': JSON.stringify(AppPackage.license)
      }
    })
  ]
}
