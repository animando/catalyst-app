import { injectLambdaContext, Logger } from "@aws-lambda-powertools/logger";
import middy from "@middy/core";
import { Context, MSKEvent } from "aws-lambda";
import { Schema } from "jsonschema";
import { MSKHandler } from "../services/types";
import { parseMskMessages } from "./parseMskMessages";

export const createMskHandler = <T>(
  payloadHandler: MSKHandler<T>,
  options: { schema: Schema; logger: Logger }
) => {
  const middifiedHandler = middy(payloadHandler).use(
    injectLambdaContext(options.logger)
  );

  return async (event: MSKEvent, context: Context) => {
    const messages = parseMskMessages<T>(event, options);

    await Promise.all(
      messages.map((message) => middifiedHandler(message, context))
    );
  };
};
