/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
const moment = require('moment');
const config = require('../../webpack.config.js');
const argv = require('yargs').argv;

const isDevelop = process.env.NODE_ENV === 'development';
const fullPath = s => path.join(__dirname, '..', '..', s);

const defaultConfig = {
  clientEntry: fullPath('src/entry/client.ts'),
  serverEntry: fullPath('src/entry/server.ts'), // 一般不需要指定 除非SSR
  env: {
    NODE_ENV: process.env.NODE_ENV,
    BUILD_TIME: isDevelop ? 'development' : moment().format('YMMDDHHmm'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': fullPath('src'),
      ':': fullPath('public'),
    },
    modules: ['node_modules'],
  },
  proxy: {}, // https://webpack.js.org/configuration/dev-server/#devserverproxy
  host: '0.0.0.0',
  // port: 8080,
  autoOpenBrowser: true,
  errorOverlay: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  clientTemplate: fullPath('template/index.html'),
  clientIndex: 'index.html',
  publicDirectory: fullPath('public'),
  assetsRoot: fullPath('dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/', // 发布时的域名 可以编写CDN域名等
  useEslint: false,
  useStyleLint: false,
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: argv.report,
  // CSS Sourcemaps off by default because relative paths are "buggy"
  // with this option, according to the CSS-Loader README
  // (https://github.com/webpack/css-loader#sourcemaps)
  // In our experience, they generally work as expected,
  // just be aware of this issue when enabling this option.
  sourceMap: isDevelop,
  // watch all node_modules
  watchNodeModules: argv.watch,
  // 使用前先运行`npm run build:dll`
  enableDll: true,
};

module.exports = Object.assign(defaultConfig, config);
