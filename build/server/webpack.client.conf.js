/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const merge = require('webpack-merge');
const { isDevelop } = require('../utils');

const webpackBaseConfig = isDevelop ? require('../client/webpack.dev.conf') : require('../client/webpack.prod.conf')

// 删除 WebpackBar
webpackBaseConfig.plugins = webpackBaseConfig.plugins.filter((plugin) => {
  return !(plugin instanceof WebpackBar)
});


const webpackConfig = merge(webpackBaseConfig, {
  plugins: [
    /**
     * 坑是真的多
     * node --trace-deprecation ./node_modules/.bin/webpack --config build/webpack.client.config.js --hide-modules
     * (node:11047) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
     * at VueSSRClientPlugin.apply (/Users/William/work/operation/node_modules/vue-server-renderer/client-plugin.js:28:12)
     *
     * vue-server-renderer | Webpack 4 deprecation warning for plugins #8810
     * https://github.com/vuejs/vue/issues/8810
     *
     * Already fixed in vuejs/vue#7839, will land in master as part of Vue v2.6 :)
     */
    new VueSSRClientPlugin()
  ],
});

webpackConfig.plugins.unshift(
  new WebpackBar({
    name: 'Client-SSR',
    color: '#ab71f3',
  })
);

module.exports = webpackConfig;
