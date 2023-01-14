import { Logger } from "@aws-lambda-powertools/logger";
import { MSKEvent } from "aws-lambda";
import { KafkaMessageConsumer } from "../services/types";
import { parseMskMessages } from "./parseMskMessages";

export const createMskHandler =
  (payloadHandler: KafkaMessageConsumer, logger: Logger) =>
  async (event: MSKEvent) => {
    const messages = parseMskMessages(event);

    logger.info("Consumed messages", {
      messages,
    });

    messages.forEach(async (message) => {
      await payloadHandler(message);
    });
  };
