/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('../utils');
const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf');

const seen = new Set();
const nameLength = 4;

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    new WebpackBar({
      name: 'Client-Prod',
      color: '#569fff'
    }),
    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [{
        from: config.publicDirectory,
        to: config.assetsRoot,
        globOptions: {
          dot: false,
          // gitignore: true, // 有bug
        },
      }],
    }),
  ],
});

webpackConfig.optimization.minimizer = [
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css(\?.*)?$/,
    cssProcessorOptions: {
      safe: true,
    },
  }),
  new MinifyPlugin({
    cache: true,
    parallel: true,
  }),
];

if (config.bundleAnalyzerReport) {
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  );
}

module.exports = webpackConfig;
