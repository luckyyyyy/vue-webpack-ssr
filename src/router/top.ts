/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

export default [
  {
    name: 'index',
    path: '/',
    meta: { parent: 'index', nav: 'index' },
    component: () => import('@/views/index'),
  },
  {
    name: '404',
    path: '*',
    component: () => import('@/views/404'),
  },
];
