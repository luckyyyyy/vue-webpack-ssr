/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
const utils = require('../utils');

module.exports = {
  // chunks: 'initial', // initial all async
  cacheGroups: {
    styles: {
      test: m => m.constructor.name === 'CssModule',
      name: process.env.VUE_SSR ? 'all' : 'commons',
      minChunks: process.env.VUE_SSR ? 1 : 2,
      chunks: 'all',
      reuseExistingChunk: true,
      enforce: true,
    },
    vendor: {
      filename: utils.assetsPath('js/vendor.[chunkhash:24].js'),
      name: 'vendor',
      test: /node_modules/,
      // test: m => {
      //   console.log(m)
      //   return m.constructor.name !== 'CssModule';
      // },
      chunks: 'initial',
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true,
    },
  },
};
