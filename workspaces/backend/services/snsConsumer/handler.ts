import type { Handler, SNSEvent } from "aws-lambda";
import { SnsTopic1Payload } from "../../compiled-types/SnsTopic1Payload";
import { createSnsHandler } from "../../utils/createSnsHandler";
import { SNSMessageEvent } from "../types";
import { logger } from "./logger";
import SnsTopic1PayloadSchema from "../../json-schemas/SnsTopic1Payload.json";

export const topic1Handler: Handler<SNSMessageEvent<SnsTopic1Payload>> = async (
  event,
  context
) => {
  logger.info("Processing sns message", {
    event,
    context,
  });
};

const snsHandler = createSnsHandler(topic1Handler, {
  logger,
  schema: SnsTopic1PayloadSchema,
});

export const handler: Handler<SNSEvent> = (event, context, callback) =>
  snsHandler(event, context, callback);
