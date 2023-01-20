import { Logger } from "@aws-lambda-powertools/logger";
import { TRACE_ID_LOG_KEY } from "./constants";

export const addTraceToLogger = (logger?: Logger, traceId?: string) => {
  if (traceId && logger) {
    logger.appendKeys({ [TRACE_ID_LOG_KEY]: traceId });
  }
};

export const removeTraceFromLogger = (logger?: Logger) => {
  if (logger) {
    logger.removeKeys([TRACE_ID_LOG_KEY]);
  }
};
