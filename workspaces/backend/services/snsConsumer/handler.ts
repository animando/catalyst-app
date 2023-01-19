import type { Handler, SNSEvent } from "aws-lambda";
import { createSnsHandler } from "../../utils/createSnsHandler";
import { SnsTopic1Payload } from "../messageTypes";
import { SNSMessageEvent } from "../types";
import { logger } from "./logger";

export interface Consumer1Message {
  message: string;
  now: string;
}

export const topic1Handler: Handler<SNSMessageEvent<SnsTopic1Payload>> = async (
  event,
  context
) => {
  logger.info("Processing sns message", {
    event,
    context,
  });
};

const snsHandler = createSnsHandler(topic1Handler, logger);

export const handler: Handler<SNSEvent> = (event, context, callback) =>
  snsHandler(event, context, callback);
