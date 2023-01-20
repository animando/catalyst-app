import { Logger } from "@aws-lambda-powertools/logger";
import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 as uuid } from "uuid";
import { TRACE_ID_HEADER } from "../utils/constants";
import { addTraceToLogger } from "../utils/loggerTracing";

export const injectTraceId = (
  logger: Logger
): MiddlewareObj<APIGatewayProxyEvent> => ({
  before: (event) => {
    const traceId = event.event.headers[TRACE_ID_HEADER] || uuid();
    addTraceToLogger(logger, traceId);
  },
  after: () => {},
  onError: () => {},
});
