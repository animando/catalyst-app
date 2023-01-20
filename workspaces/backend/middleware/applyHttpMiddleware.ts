import middy, { MiddlewareObj } from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import corsHandler from "@middy/http-cors";
import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { injectLambdaContext, Logger } from "@aws-lambda-powertools/logger";
import { v4 as uuid } from "uuid";
import { config } from "../utils/config";
import { parseJwtToken } from "./parseJwtToken";
import {
  addTraceToLogger,
  removeTraceFromLogger,
} from "../utils/addTraceToLogger";
import { TRACE_ID_HEADER } from "../utils/constants";

const injectTraceId = (
  logger: Logger
): MiddlewareObj<APIGatewayProxyEvent> => ({
  before: (event) => {
    const traceId = event.event.headers[TRACE_ID_HEADER] || uuid();
    addTraceToLogger(logger, traceId);
  },
  after: () => {
    removeTraceFromLogger(logger);
  },
  onError: () => {
    removeTraceFromLogger(logger);
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyHttpMiddleware = (
  handler: Handler,
  { logger }: { logger: Logger }
) =>
  middy(handler)
    .use(injectLambdaContext(logger))
    .use(injectTraceId(logger))
    .use(jsonBodyParser())
    .use(httpErrorHandler({ logger: () => null }))
    .use(corsHandler({ origin: config.SPA_URL }))
    .use(parseJwtToken({ logger }));
