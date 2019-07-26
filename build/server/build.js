/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const chalk = require('chalk');
const style = require('ansi-styles');
const webpackClientConf = require('./webpack.client.conf');
const webpackServerConf = require('./webpack.server.conf');
const config = require('../config');
const rm = require('rimraf')

rm(config.assetsRoot, e => {
  const compiler = webpack([webpackClientConf, webpackServerConf], (err, multiStats) => {
    if (err) throw err;
    multiStats.stats.forEach((stats, index) => {
      process.stdout.write(`${stats.toString({
        colors: {
          green: index === 0 ? style.color.ansi256.rgb(171, 113, 243) : style.color.ansi256.rgb(255, 165, 0),
        },
        modules: false,
        children: false, // if you are using ts-loader, setting this to true will make typescript errors show up during build
        chunks: false,
        chunkModules: false,
        entrypoints: false,
      })}\n\n`);
    });
    if (multiStats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }
    console.log(chalk.green('  Build complete.\n'));
  });
})
