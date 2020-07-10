/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2020 Hangzhou perfma Network Technology Co., Ltd.
 */

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        // useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    // --isolatedModules This is the default Babel behavior, and it can't be turned off because Babel doesn't support cross-file analysis.
    // '@babel/preset-typescript',
    '@vue/babel-preset-jsx',
  ],
  plugins: [
    // 'babel-plugin-transform-typescript-metadata',
    // '@babel/proposal-numeric-separator',
    // [
    //   '@babel/proposal-decorators',
    //   {
    //     legacy: true,
    //   },
    // ],
    // ['@babel/proposal-class-properties', { loose: false }],
    // '@babel/proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
  ],
};
