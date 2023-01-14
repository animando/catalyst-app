import { Logger } from "@aws-lambda-powertools/logger";
import { MSKEvent } from "aws-lambda";
import { KafkaMessageConsumer } from "../services/types";
import { parseMskMessages } from "./parseMskMessages";

export const createMskHandler =
  <T>(payloadHandler: KafkaMessageConsumer<T>, logger: Logger) =>
  async (event: MSKEvent) => {
    const messages = parseMskMessages<T>(event);

    logger.info("Consumed messages", {
      messages,
    });

    messages.forEach(async (message) => {
      await payloadHandler(message);
    });
  };
