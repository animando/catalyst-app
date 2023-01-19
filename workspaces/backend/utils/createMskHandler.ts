import { Logger } from "@aws-lambda-powertools/logger";
import { Context, MSKEvent } from "aws-lambda";
import { MSKHandler } from "../services/types";
import { parseMskMessages } from "./parseMskMessages";

export const createMskHandler =
  <T>(
    payloadHandler: MSKHandler<T>,
    options: { schema: object; logger: Logger }
  ) =>
  async (event: MSKEvent, context: Context) => {
    const { logger } = options;
    const messages = parseMskMessages<T>(event, options);

    logger.info("Consumed messages", {
      messages,
    });

    await Promise.all(
      messages.map((message) => payloadHandler(message, context))
    );
  };
