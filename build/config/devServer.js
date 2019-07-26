/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const path = require('path');
const express = require('express')
const config = require('./index.js');

const HOST = process.env.HOST;
// const PORT = process.env.PORT && Number(process.env.PORT);

const devServer = {
  clientLogLevel: 'warning',
  historyApiFallback: {
    disableDotRule: true,
    rewrites: [
      { from: /./, to: path.posix.join('/', config.clientIndex) },
    ],
  },
  hot: true,
  contentBase: false, // since we use CopyWebpackPlugin.
  compress: true,
  host: HOST || config.host,
  // port: PORT || config.port,
  open: config.autoOpenBrowser,
  useLocalIp: true,
  overlay: config.errorOverlay
    ? { warnings: false, errors: true }
    : false,
  publicPath: '/',
  proxy: config.proxy || {},
  quiet: true,
  watchOptions: {
    poll: config.poll,
  },
  before: (app) => {
    app.use('/', express.static(config.publicDirectory))
  }
};
if (config.watchNodeModules) {
  devServer.watchOptions.ignored = [];
}

module.exports = devServer;
