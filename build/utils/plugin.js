/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2020 Hangzhou perfma Network Technology Co., Ltd.
 */
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const utils = require('../utils');

// https://github.com/vuejs/vue-cli/issues/1916#issuecomment-407693467
// https://segmentfault.com/a/1190000015919928#articleHeader10
const createNamedChunksPlugin = () => {
  if (utils.isDevelop) {
    return new webpack.NamedChunksPlugin();
  }
  const seen = new Set();
  const nameLength = 4;
  return new webpack.NamedChunksPlugin((chunk) => {
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
    return modules[0].id;
  });
};

const createMiniCssExtractPlugin = () => {
  if (utils.isDevelop) {
    return new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
      ignoreOrder: true,
    });
  }
  return new MiniCssExtractPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css'),
    ignoreOrder: true,
  });
};


module.exports = {
  namedChunksPlugin: createNamedChunksPlugin(),
  miniCssExtractPlugin: createMiniCssExtractPlugin(),
};
