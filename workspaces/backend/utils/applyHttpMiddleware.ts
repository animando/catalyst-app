import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import corsHandler from '@middy/http-cors'
import { config } from './config';

export const applyHttpMiddleware = (handler: any) => {
    console.log({ SPA_DOMAIN_NAME: config.SPA_DOMAIN_NAME });
  return middy(handler)
  .use(jsonBodyParser())
  .use(httpErrorHandler())
  .use(corsHandler({ origin: '*' }));
}