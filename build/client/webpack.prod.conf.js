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
    // https://github.com/vuejs/vue-cli/issues/1916#issuecomment-407693467
    // https://segmentfault.com/a/1190000015919928#articleHeader10
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      const modules = Array.from(chunk.modulesIterable);
      if (modules.length > 1) {
        const hash = require('hash-sum');
        const joinedHash = hash(modules.map(m => m.id).join('_'));
        let len = nameLength;
        while (seen.has(joinedHash.substr(0, len))) len++;
        seen.add(joinedHash.substr(0, len));
        return `chunk-${joinedHash.substr(0, len)}`;
      }
      return `module-${modules[0].id}`;
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: config.publicDirectory,
        to: config.assetsRoot,
        ignore: ['.*'],
      },
    ]),
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

if (config.enableDll) {
  webpackConfig.plugins.push(new webpack.DllReferencePlugin({
    manifest: utils.fullPath('node_modules/.cache/dll-manifest.json'),
  }));
}

module.exports = webpackConfig;
