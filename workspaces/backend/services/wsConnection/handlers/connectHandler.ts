import { logger } from "../utils/logger";
import { middifyWsHandler } from "../utils/middifyWsHandler";

export const connectHandler = middifyWsHandler<undefined>(async (event) => {
  const { body } = event;

  logger.info("connect", { body });

  return {
    statusCode: 200,
    body: "connect response",
  };
}, logger);
