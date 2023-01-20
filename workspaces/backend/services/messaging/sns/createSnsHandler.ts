import { injectLambdaContext, Logger } from "@aws-lambda-powertools/logger";
import middy from "@middy/core";
import { Context, Handler, Callback, SNSEvent } from "aws-lambda";
import { Schema } from "jsonschema";
import { removeTraceId } from "../../../middleware/removeTraceId";
import { SNSMessageEvent } from "../../types";
import { parseSnsMessages } from "./parseSnsMessages";

interface Options {
  logger: Logger;
  schema: Schema;
}
export const createSnsHandler = <T>(
  payloadHandler: Handler<SNSMessageEvent<T>>,
  options: Options
) => {
  const middifiedHandler = middy(payloadHandler)
    .use(injectLambdaContext(options.logger))
    .use(removeTraceId(options.logger));
  return async (
    event: SNSEvent,
    context: Context,
    callback: Callback<void>
  ) => {
    const messages = parseSnsMessages<T>(event, options);

    messages.forEach(async (message) => {
      await middifiedHandler(message, context, callback);
    });
  };
};
