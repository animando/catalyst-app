import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import corsHandler from "@middy/http-cors";
import { Handler } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import { config } from "../utils/config";
import { parseJwtToken } from "./parseJwtToken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyHttpMiddleware = (
  handler: Handler,
  { logger }: { logger: Logger }
) =>
  middy(handler)
    .use(jsonBodyParser())
    .use(httpErrorHandler({ logger: () => null }))
    .use(corsHandler({ origin: config.SPA_URL }))
    .use(parseJwtToken({ logger }));
