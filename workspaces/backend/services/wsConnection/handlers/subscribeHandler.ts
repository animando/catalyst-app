import { encodeWsMessageBody } from "../utils/encodeWsMessageBody";
import { logger } from "../utils/logger";
import { middifyWsHandler } from "../utils/middifyWsHandler";

export const subscribeHandler = middifyWsHandler(async (event) => {
  const { body } = event;

  logger.info("subscribe", { body });

  return {
    statusCode: 200,
    body: encodeWsMessageBody(
      "subscribe-ack",
      { header1: "header1Value" },
      { message: "subscription-response" }
    ),
  };
}, logger);
