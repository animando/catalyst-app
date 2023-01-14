import { MSKEvent } from "aws-lambda";
import { KafkaMessageConsumer } from "../services/types";
import { parseMskMessages } from "./parseMskMessages";

export const createMskHandler =
  (payloadHandler: KafkaMessageConsumer) => async (event: MSKEvent) => {
    const messages = parseMskMessages(event);
    messages.forEach(async (message) => {
      await payloadHandler(message);
    });
  };
