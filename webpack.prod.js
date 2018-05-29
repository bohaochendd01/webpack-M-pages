const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'initial', // 只对入口文件处理
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          test: /node_modules\//,
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
        commons: {
          test: /common\/|components\//,
          name: 'commons',
          priority: 10,
          enforce: true
        }
      }
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin({
      //生成css文件名
      filename: 'static/css/[name][hash].css',
      disable: false,
      allChunks: true
    })
  ]
});