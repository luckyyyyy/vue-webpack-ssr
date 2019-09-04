/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

interface ErrorInfo {
  [key: string]: any;
}

/**
 * HttpException represents an exception caused by an improper request of the end-user.
 *
 * HttpException can be differentiated via its [[statusCode]] property value which
 * keeps a standard HTTP status code (e.g. 404, 500). Error handlers may use this status code
 * to decide how to format the error page.
 *
 */
export class HttpException extends Error {
  public statusCode: number = 400;
  public message: string = '400 Bad Request';
  public extra?: any;
  public info?: ErrorInfo;

  public constructor(statusCode, info?: ErrorInfo, extra?: any) {
    super();
    this.info = info;
    this.statusCode = statusCode;
    this.extra = extra;
  }
}

/**
 * UnknownHttpException represents a "Bad Request" HTTP exception with status code 400.
 */
export class UnknownHttpException extends HttpException {
  public message: string = 'UnknownHttpException';

  public constructor(info?: ErrorInfo, extra?: any) {
    super(0, info, extra);
  }
}

/**
 * BadRequestHttpException represents a "Bad Request" HTTP exception with status code 400.
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.1
 */
export class BadRequestHttpException extends HttpException {
  public message: string = '400 Bad Request';

  public constructor(info?: ErrorInfo, extra?: any) {
    super(400, info, extra);
  }
}

/**
 * UnauthorizedHttpException represents an "Unauthorized" HTTP exception with status code 401.
 * @see https://tools.ietf.org/html/rfc7235#section-3.1
 */
export class UnauthorizedHttpException extends HttpException {
  public message: string = '401 Unauthorized';

  public constructor(info?: ErrorInfo, extra?: any) {
    super(401, info, extra);
  }
}

/**
 * NotAcceptableHttpException represents a "Not Acceptable" HTTP exception with status code 406.
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.6
 */
export class ForbiddenHttpException extends HttpException {
  public message: string = '403 Forbidden';

  public constructor(info?: ErrorInfo, extra?: any) {
    super(403, info, extra);
  }
}

/**
 * NotFoundHttpException represents a "Not Found" HTTP exception with status code 404.
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.4
 */
export class NotFoundHttpException extends HttpException {
  public message: string = '404 Not Found';

  public constructor(info?: ErrorInfo, extra?: any) {
    super(404, info, extra);
  }
}

/**
 * MethodNotAllowedHttpException represents a "Method Not Allowed" HTTP exception with status code 405.
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.5
 */
export class MethodNotAllowedHttpException extends HttpException {
  public message: string = '405 Method Not Allowed';

  public constructor(info?: ErrorInfo, extra?: any) {
    super(405, info, extra);
  }
}

/**
 * NotAcceptableHttpException represents a "Not Acceptable" HTTP exception with status code 406.
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.6
 */
export class NotAcceptableHttpException extends HttpException {
  public message: string = '406 Not Acceptable';

  public constructor(info?: ErrorInfo, extra?: any) {
    super(406, info, extra);
  }
}

/**
 * ServerErrorHttpException represents an "Internal Server Error" HTTP exception with status code 500.
 * @see https://tools.ietf.org/html/rfc7231#section-6.6.1
 * @author William Chan <root@williamchan.me>
 */
export class ServerErrorHttpException extends HttpException {
  public message: string = '500 Internal Server Error';

  public constructor(info?: ErrorInfo, extra?: any) {
    super(500, info, extra);
  }
}
