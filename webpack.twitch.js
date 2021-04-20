const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { twitchEntryPoints } = require('./webpack.entryPoints.js');

module.exports = (_env, argv) => merge(common(_env, { ...argv, entryPoints: twitchEntryPoints }), {
  mode: 'production',
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist',
  // },
  optimization: {
    splitChunks: {
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
});