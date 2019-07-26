/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintBarePlugin = require('stylelint-bare-webpack-plugin');
const utils = require('../utils');
const loader = require('../utils/loader');
const config = require('../config');
const splitChunks = require('../config/splitChunks');
const webpackBaseConfig = require('../webpack.base');

const webpackConfig = merge(webpackBaseConfig, {
  entry: config.clientEntry,
  output: {
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js'),
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime', // webpack runtime
    },
    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/113
    splitChunks,
  },
  module: {
    rules: [
      ...loader.styleLoaders({ extract: true }),
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.clientIndex,
      template: config.clientTemplate,
      inject: true,
      // favicon: utils.fullPath('src/assets/favicon.ico'),
    }),
  ],
})

if (config.useEslint) {
  webpackConfig.module.rules.push(
    ...loader.eslintLoaders({
      cache: true,
      emitWarning: true,
      failOnError: false,
    }),
  )
}

if (config.useStyleLint) {
  new StylelintBarePlugin({
    configFile: '.stylelintrc.js',
    files: [
      'src/**/*.vue',
      'src/**/*.css',
      'src/**/*.less',
      'src/**/*.sass',
      'src/**/*.scss',
      '!**/iconfont.css',
    ],
    fix: true,
    cache: true,
    cacheLocation: './node_modules/.cache/.stylelintcache',
    // emitErrors: true,
    emitWarning: true,
    failOnError: false,
  });
}

module.exports = webpackConfig;
