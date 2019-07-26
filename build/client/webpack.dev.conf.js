/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
const WebpackBar = require('webpackbar');
const merge = require('webpack-merge');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devServer = require('../config/devServer');
const utils = require('../utils');
const webpackBaseConfig = require('./webpack.base.conf');

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[name].js'),
  },
  // https://webpack.js.org/configuration/dev-server/
  devServer,
  // cheap-module-eval-source-map is faster for localhost dev
  devtool: '#source-map',
  plugins: [
    new WebpackBar({
      name: 'Client-Dev',
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
    }),
    new FriendlyErrorsPlugin(),
  ],
});

// utils.getLocalIps().forEach((ip) => {
//   console.log('listen: ' + chalk.green('http://' + ip + ':' + webpackConfig.devServer.port));
// });

module.exports = webpackConfig;

