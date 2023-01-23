import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import corsHandler from "@middy/http-cors";
import { injectLambdaContext, Logger } from "@aws-lambda-powertools/logger";
import { Handler } from "aws-lambda";
import { config } from "../utils/config";
import { parseJwtToken } from "./parseJwtToken";
import { injectTraceId } from "./injectTraceId";
import { removeTraceId } from "./removeTraceId";

export const applyHttpMiddleware = (
  handler: Handler,
  { logger }: { logger: Logger }
) =>
  middy(handler)
    .use(removeTraceId(logger))
    .use(injectLambdaContext(logger))
    .use(injectTraceId(logger))
    .use(jsonBodyParser())
    .use(httpErrorHandler({ logger: () => null }))
    .use(corsHandler({ origin: config.SPA_URL }))
    .use(parseJwtToken({ logger }));
