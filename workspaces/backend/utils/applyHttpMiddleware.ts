import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import { corsMiddleware } from './corsMiddleware';

export const applyHttpMiddleware = (handler: any) => {
  return middy(handler)
    .use(corsMiddleware())
    .use(jsonBodyParser())
    .use(httpErrorHandler());
}