import middy, { MiddlewareObj } from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import corsHandler from "@middy/http-cors";
import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { injectLambdaContext, Logger } from "@aws-lambda-powertools/logger";
import { v4 as uuid } from "uuid";
import { config } from "../utils/config";
import { parseJwtToken } from "./parseJwtToken";

const injectTraceId = (
  logger: Logger
): MiddlewareObj<APIGatewayProxyEvent> => ({
  before: (event) => {
    const traceId = event.event.headers.TraceHeader || uuid();
    // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-explicit-any
    (event.context as any).traceId = traceId;
    logger.appendKeys({ catalystTraceId: traceId });
  },
  after: () => {
    logger.removeKeys(["catalystTraceId"]);
  },
  onError: () => {
    logger.removeKeys(["catalystTraceId"]);
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
