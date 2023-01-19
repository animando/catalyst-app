import type { Handler, SNSEvent } from "aws-lambda";
import { logger } from "./logger";

export interface Consumer1Message {
  message: string;
  now: string;
}

export const handler: Handler<SNSEvent> = async (event, context) => {
  logger.info("Processing sns message", {
    event,
    context,
  });
};
