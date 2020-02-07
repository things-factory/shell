const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const I18nBundlerPlugin = require('./webpack-plugins/i18n-bundler-plugin')
const FolderOverridePlugin = require('./webpack-plugins/folder-override-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ThemeOverridePlugin = require('./webpack-plugins/theme-override-plugin')
const glob = require('glob')

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

let MODULE_ENTRIES = glob
  .sync(`${path.join(NodeModulePath, '@things-factory', '**', 'client', 'entries', '**', '*.js')}`)
  .reduce((acc, p) => {
    acc[path.parse(p).name] = [p]
    return acc
  }, {})

let LOCAL_ENTRIES = glob.sync(`${path.join(AppRootPath, 'client', 'entries', '**', '*.js')}`).reduce((acc, p) => {
  acc[path.parse(p).name] = [p]
  return acc
}, {})

let entries = Object.assign({}, MODULE_ENTRIES, LOCAL_ENTRIES, {
  main: [
    path.resolve(__dirname, 'client/index.js'),
    'webpack-hot-client/client?path=/__webpack_hmr&timeout=20000&reload=true'
  ],
  'headless-scene-components': [path.resolve(ShellModulePath, './client/scene/scene-components.js')]
})

module.exports = {
  mode: 'development',
  entry: entries,
  resolve: {
    aliasFields: ['browser'],
    alias: {
      [AppPackage.name]:
        AppPackage.name == '@hatiolab/things-scene' ? path.resolve(AppRootPath, 'src', 'index.js') : AppRootPath
    },
    modules: [NodeModulePath]
  },
  resolveLoader: {
    modules: [path.resolve(ShellModulePath, 'web-loaders'), NodeModulePath]
  },
  externals:
    AppPackage.name == '@hatiolab/things-scene'
      ? {}
      : {
          '@hatiolab/things-scene': 'scene'
        },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
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
        loader: 'url-loader',
        query: {
          limit: 2000,
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
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
        test: /\.bpmn$/,
        use: 'raw-loader'
      },
      {
        test: /module-importer.import$/,
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
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
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
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
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
    new ThemeOverridePlugin({
      chunk: 'theme',
      themeFolder: path.join('client', 'themes')
    }),
    new HTMLWebpackPlugin({
      template: TemplatePath,
      /*
      Allows to control how chunks should be sorted before they are included to the HTML.
      Allowed values are 'none' | 'auto' | 'dependency' | 'manual' | {Function}
      */
      chunksSortMode: 'none',
      chunks: ['main', 'theme']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[hash].css',
      ignoreOrder: false
    }),
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
        },
        {
          from: 'licenses/**/*',
          to: OUTPUT_PATH
        }
      ],
      {
        /* application base */
        context: AppRootPath
      }
    ),
    new FolderOverridePlugin({
      target: 'views'
    }),
    new FolderOverridePlugin({
      target: 'assets'
    }),
    new I18nBundlerPlugin({
      output: 'translations'
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      importWorkboxFrom: 'local',
      swSrc: path.resolve(__dirname, 'client/serviceworker/sw-src.js'),
      swDest: 'service-worker.js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE-ENV': JSON.stringify('development'),
        'SHELL-VERSION': JSON.stringify(ShellPackage.version),
        'SHELL-LICENSE': JSON.stringify(ShellPackage.license),
        'APP-VERSION': JSON.stringify(AppPackage.version),
        'APP-LICENSE': JSON.stringify(AppPackage.license),
        'APP-NAME': JSON.stringify(AppPackage.name)
      }
    })
  ],
  devtool: 'cheap-module-source-map'
}
