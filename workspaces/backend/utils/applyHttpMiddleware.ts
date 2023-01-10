import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import corsHandler from "@middy/http-cors";
import { config } from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyHttpMiddleware = (handler: any) =>
  middy(handler)
    .use(jsonBodyParser())
    .use(httpErrorHandler())
    .use(corsHandler({ origin: config.SPA_URL }));
