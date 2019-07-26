/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

export const isDevelop = process.env.NODE_ENV !== 'production';
export const isServer = process.env.VUE_ENV === 'server';
