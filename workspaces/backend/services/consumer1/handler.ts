import type { Handler, MSKEvent } from "aws-lambda";
import { createMskHandler } from "../../utils/createMskHandler";
import { MSKMessageEvent } from "../types";
import { logger } from "./logger";

export interface Consumer1Message {
  message: string;
  now: string;
}

const consumer1Handler: Handler<MSKMessageEvent<Consumer1Message>> = async (
  event,
  context
) => {
  const { value } = event;

  logger.info("Processing message", {
    value,
    context,
  });
};

const mskHandler = createMskHandler(consumer1Handler, logger);

export const handler: Handler<MSKEvent> = (
  event: MSKEvent,
  context,
  callback
) => mskHandler(event, context, callback);
