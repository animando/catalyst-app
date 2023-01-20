import { Logger } from "@aws-lambda-powertools/logger";
import { MiddlewareObj } from "@middy/core";
import { removeTraceFromLogger } from "../utils/loggerTracing";

export const removeTraceId = (logger: Logger): MiddlewareObj<unknown> => ({
  before: () => {},
  after: () => {
    removeTraceFromLogger(logger);
  },
  onError: () => {
    removeTraceFromLogger(logger);
  },
});
