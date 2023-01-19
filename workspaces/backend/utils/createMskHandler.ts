import { Logger } from "@aws-lambda-powertools/logger";
import { Context, Handler, MSKEvent, Callback } from "aws-lambda";
import { MSKMessageEvent } from "../services/types";
import { parseMskMessages } from "./parseMskMessages";

export const createMskHandler =
  <T>(payloadHandler: Handler<MSKMessageEvent<T>>, logger: Logger) =>
  async (event: MSKEvent, context: Context, callback: Callback<void>) => {
    const messages = parseMskMessages<T>(event, { logger });

    logger.info("Consumed messages", {
      messages,
    });

    messages.forEach(async (message) => {
      await payloadHandler(message, context, callback);
    });
  };
