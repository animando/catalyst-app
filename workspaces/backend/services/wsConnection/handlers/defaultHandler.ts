import { encodeWsMessageBody } from "../utils/encodeWsMessageBody";
import { logger } from "../utils/logger";
import { middifyWsHandler } from "../utils/middifyWsHandler";

export const defaultHandler = middifyWsHandler<object>(async (event) => {
  const { body } = event;

  logger.info("default", { body });

  return {
    statusCode: 200,
    body: encodeWsMessageBody(
      "default-ack",
      { header1: "header1Value" },
      { message: "subscription-response" }
    ),
  };
}, logger);
