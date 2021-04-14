const path = require("path")
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (_env, argv) => merge(common(_env, argv), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        host: argv.devrig ? 'localhost.rig.twitch.tv' : 'localhost',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        historyApiFallback: true,
        port: 8080,
        https: true
    },
    output: {
        publicPath: '/',
    }
});