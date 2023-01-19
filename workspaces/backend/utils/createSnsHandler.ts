import { Logger } from "@aws-lambda-powertools/logger";
import { Context, Handler, Callback, SNSEvent } from "aws-lambda";
import { SNSMessageEvent } from "../services/types";
import { parseSnsMessages } from "./parseSnsMessages";

export const createSnsHandler =
  <T>(payloadHandler: Handler<SNSMessageEvent<T>>, logger: Logger) =>
  async (event: SNSEvent, context: Context, callback: Callback<void>) => {
    const messages = parseSnsMessages<T>(event, { logger });

    logger.info("Consumed messages", {
      messages,
    });

    messages.forEach(async (message) => {
      await payloadHandler(message, context, callback);
    });
  };
