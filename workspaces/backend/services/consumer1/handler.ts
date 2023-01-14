import type { MSKEvent } from "aws-lambda";
import { createMskHandler } from "../../utils/createMskHandler";
import { Message } from "../types";
import { logger } from "./logger";

const consumer1Handler = async (event: Message) => {
  const {
    headers,
    key,
    offset,
    partition,
    timestamp,
    timestampType,
    topic,
    value,
  } = event;

  logger.info("Got message", {
    headers,
    key,
    offset,
    partition,
    timestamp,
    timestampType,
    topic,
    value,
  });
};

const mskHandler = createMskHandler(consumer1Handler);

export const handler = (event: MSKEvent) => mskHandler(event);
