import { Logger } from "@aws-lambda-powertools/logger";
import { Context, MSKEvent } from "aws-lambda";
import { MSKHandler } from "../services/types";
import { parseMskMessages } from "./parseMskMessages";

export const createMskHandler =
  <T>(payloadHandler: MSKHandler<T>, logger: Logger) =>
  async (event: MSKEvent, context: Context) => {
    const messages = parseMskMessages<T>(event, { logger });

    logger.info("Consumed messages", {
      messages,
    });

    const responses = await Promise.all(
      messages.map((message) => payloadHandler(message, context))
    );
    logger.info("Got responses", { responses });
  };
