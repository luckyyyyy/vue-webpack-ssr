const webpack = require('webpack');
const WebpackBar = require('webpackbar');
// const merge = require('webpack-merge');

// const baseConfig = require('../webpack.base');
const { fullPath } = require('../utils');

// module.exports = merge(baseConfig, {
module.exports = {
  mode: 'production',
  entry: {
    'vue-family': ['vue', 'vuex', 'vue-router', 'vuex-router-sync', 'vuex-class', 'vue-property-decorator', 'vue-class-component'],
    // 'vendors': ['axios'],
  },
  plugins: [
    new WebpackBar({
      name: 'Dll-build',
      color: '#51f9e6',
    }),
    new webpack.DllPlugin({
      // context: process.pwd(),
      name: '[name]_[hash]',
      path: fullPath('node_modules/.cache/dll-manifest.json'),
    }),
  ],
};
