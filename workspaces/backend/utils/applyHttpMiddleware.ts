import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import corsHandler from '@middy/http-cors'
import { config } from './config';

export const applyHttpMiddleware = (handler: any) => {
  return middy(handler)
    .use(corsHandler({ origin:config.SPA_DOMAIN_NAME }))
    .use(jsonBodyParser())
    .use(httpErrorHandler());
}