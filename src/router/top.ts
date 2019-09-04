/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import LoadingComponent from '@/components/loading';

export default [
  {
    name: 'index',
    path: '/',
    meta: { parent: 'index', nav: 'index' },
    component: () => import('@/views/index'),
  },
  {
    name: 'loading-test',
    path: '/async-loading-test',
    component: () => import('@/views/loading-test'),
  },
  {
    name: 'loading-test-2',
    path: '/async-loading-test-2',
    meta: { LoadingComponent },
    component: () => import('@/views/loading-test'),
  },
  {
    name: '404',
    path: '*',
    component: () => import('@/views/404'),
  },
];
