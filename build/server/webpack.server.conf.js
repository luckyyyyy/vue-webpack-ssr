/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
const WebpackBar = require('webpackbar');
const config = require('../config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
const webpackBaseConfig = require('../webpack.base');
const merge = require('webpack-merge');
const loader = require('../utils/loader');

module.exports = merge(webpackBaseConfig, {
  entry: config.serverEntry,
  mode: 'production',
  target: 'node',
  // devtool: '#source-map',
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: ['regenerator-runtime/runtime', /\.css$/]
  }),
  output: {
    publicPath: config.assetsPublicPath,
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      ...loader.styleLoaders({ onlyLocals: true }),
    ]
  },
  plugins: [
    new WebpackBar({
      name: 'Server-SSR',
      color: '#ffa500',
    }),
    new VueSSRServerPlugin()
  ]
})

