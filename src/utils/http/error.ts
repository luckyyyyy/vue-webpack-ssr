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
  public data: any;

  public constructor(statusCode, message: string | Error | ErrorInfo | null) {
    super();
    this.statusCode = statusCode;
    if (typeof message === 'string') {
      this.message = message;
    } else if (message instanceof Error) {
      this.message = message.message;
      this.data = Object.assign(message, {});
    } else {
      this.data = message;
    }
  }
}

/**
 * UnknownHttpException represents a "Bad Request" HTTP exception with status code 400.
 */
export class UnknownHttpException extends HttpException {
  public message: string = 'UnknownHttpException';

  public constructor(message: string | Error | ErrorInfo | null = null) {
    super(0, message);
  }
}

/**
 * BadRequestHttpException represents a "Bad Request" HTTP exception with status code 400.
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.1
 */
export class BadRequestHttpException extends HttpException {
  public message: string = '400 Bad Request';

  public constructor(message: string | Error | ErrorInfo | null = null) {
    super(400, message);
  }
}

/**
 * UnauthorizedHttpException represents an "Unauthorized" HTTP exception with status code 401.
 * @see https://tools.ietf.org/html/rfc7235#section-3.1
 */
export class UnauthorizedHttpException extends HttpException {
  public message: string = '401 Unauthorized';

  public constructor(message: string | Error | ErrorInfo | null = null) {
    super(401, message);
  }
}

/**
 * ForbiddenHttpException represents a "Forbidden" HTTP exception with status code 403.
 */
export class ForbiddenHttpException extends HttpException {
  public message: string = '403 Forbidden';

  public constructor(message: string | Error | ErrorInfo | null = null) {
    super(403, message);
  }
}

/**
 * NotFoundHttpException represents a "Not Found" HTTP exception with status code 404.
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.4
 */
export class NotFoundHttpException extends HttpException {
  public message: string = '404 Not Found';

  public constructor(message: string | Error | ErrorInfo | null = null) {
    super(404, message);
  }
}

/**
 * MethodNotAllowedHttpException represents a "Method Not Allowed" HTTP exception with status code 405.
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.5
 */
export class MethodNotAllowedHttpException extends HttpException {
  public message: string = '405 Method Not Allowed';

  public constructor(message: string | Error | ErrorInfo | null = null) {
    super(405, message);
  }
}

/**
 * NotAcceptableHttpException represents a "Not Acceptable" HTTP exception with status code 406.
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.6
 */
export class NotAcceptableHttpException extends HttpException {
  public message: string = '406 Not Acceptable';

  public constructor(message: string | Error | ErrorInfo | null = null) {
    super(406, message);
  }
}

/**
 * ServerErrorHttpException represents an "Internal Server Error" HTTP exception with status code 500.
 * @see https://tools.ietf.org/html/rfc7231#section-6.6.1
 * @author William Chan <root@williamchan.me>
 */
export class ServerErrorHttpException extends HttpException {
  public message: string = '500 Internal Server Error';

  public constructor(message: string | Error | ErrorInfo | null = null) {
    super(500, message);
  }
}
