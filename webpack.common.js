const fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// defines where the bundle file will live
const bundlePath = path.resolve(__dirname, "dist/")

module.exports = (_env, argv) => {
    let localMappedEntryPoints = {}

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

    for (name in argv.entryPoints) {
        const entryPoint = argv.entryPoints[name];
        if (entryPoint.build) {
            localMappedEntryPoints[name] = entryPoint.path
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
        entry: localMappedEntryPoints,
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
            filename: "[name].[contenthash].bundle.js",
            path: bundlePath
        },
        plugins
    }

    return config;
}