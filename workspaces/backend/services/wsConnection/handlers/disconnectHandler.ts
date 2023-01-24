import { logger } from "../utils/logger";
import { middifyWsHandler } from "../utils/middifyWsHandler";

export const disconnectHandler = middifyWsHandler<undefined>(async (_event) => {
  logger.info("disconnect");

  return {
    statusCode: 200,
  };
}, logger);
