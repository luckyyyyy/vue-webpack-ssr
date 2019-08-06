/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

export class HttpRedirectException extends Error {
  public statusCode: number = 302;
  public url: string = '/';

  public constructor(url: string, statusCode: number | undefined = undefined) {
    super();
    this.url = url;
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
