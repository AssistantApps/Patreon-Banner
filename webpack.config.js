const fs = require('fs')
const path = require("path")
const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// defines where the bundle file will live
const bundlePath = path.resolve(__dirname, "dist/")

module.exports = (_env, argv) => {
  let entryPoints = {
    Index: {
      path: './src/Index.tsx',
      outputHtml: 'index.html',
      template: 'template.html',
      build: true
    },
    // VideoComponent: {
    //   path: "./src/VideoComponent.js",
    //   outputHtml: "video_component.html",
    //   build: true
    // },
    // VideoOverlay: {
    //   path: "./src/VideoOverlay.js",
    //   outputHtml: "video_overlay.html",
    //   build: true
    // },
    // Panel: {
    //   path: "./src/Panel.js",
    //   outputHtml: "panel.html",
    //   build: true
    // },
    Config: {
      path: './src/Config.tsx',
      outputHtml: 'config.html',
      template: './template-twitch.html',
      build: true
    },
    // LiveConfig: {
    //   path: "./src/LiveConfig.js",
    //   outputHtml: "live_config.html",
    //   build: true
    // },
    // Mobile: {
    //   path: "./src/Mobile.js",
    //   outputHtml: "mobile.html",
    //   build: true
    // }
  }

  let entry = {}

  // edit webpack plugins here!
  let plugins = [
    new CleanWebpackPlugin(['dist']),
    new NodePolyfillPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        {
          context: 'public/',
          from: '**/*',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/*.html'],
          },
          to: '',
        },
      ],
    }),
  ]

  for (name in entryPoints) {
    const entryPoint = entryPoints[name];
    if (entryPoint.build) {
      entry[name] = entryPoint.path
      if (argv.mode === 'production') {
        plugins.push(new HtmlWebpackPlugin({
          inject: true,
          chunks: [name],
          template: entryPoint.template,
          filename: entryPoint.outputHtml
        }))
      }
    }
  }

  let config = {
    //entry points for webpack- remove if not used/needed
    entry,
    optimization: {
      minimize: false, // this setting is default to false to pass review more easily. you can opt to set this to true to compress the bundles, but also expect an email from the review team to get the full source otherwise. 
    },
    module: {
      rules: [
        {
          test: /\.(s[ac]||c)ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: "file-loader",
          options: {
            name: "img/[name].[ext]"
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        process: 'process/browser'
      }
    },
    output: {
      filename: "[name].bundle.js",
      path: bundlePath
    },
    plugins
  }

  if (argv.mode === 'development') {
    config.devServer = {
      contentBase: path.join(__dirname, 'public'),
      host: argv.devrig ? 'localhost.rig.twitch.tv' : 'localhost',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      historyApiFallback: true,
      port: 8080
    }
    config.devServer.https = true
  }
  if (argv.mode === 'production') {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all',
          test: /node_modules/,
          name: false
        }
      },
      name: false
    }
  }

  return config;
}