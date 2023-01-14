import type { MSKEvent } from "aws-lambda";
import { createMskHandler } from "../../utils/createMskHandler";
import { Message } from "../types";
import { logger } from "./logger";

export interface Consumer1Message {
  message: string;
  now: string;
}

const consumer1Handler = async (event: Message<Consumer1Message>) => {
  const { value } = event;

  logger.info("Processing message", {
    value,
  });
};

const mskHandler = createMskHandler(consumer1Handler, logger);

export const handler = (event: MSKEvent) => mskHandler(event);
