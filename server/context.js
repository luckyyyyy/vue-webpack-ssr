/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

module.exports = req => ({
  title: '默认标题', // 这是默认标题，需要去代码中修改的。
  keywords: 'keywords',
  description: 'description',
  url: req.url,
  request: {
    headers: req.headers,
    protocol: req.protocol,
    ip: req.ip,
    hostname: req.hostname,
  },
});
