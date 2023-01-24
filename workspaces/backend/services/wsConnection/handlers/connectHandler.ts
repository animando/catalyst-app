import { APIGatewayProxyWebsocketEventV2WithParsedBody } from "../../types";
import { logger } from "../utils/logger";
import { middifyWsHandler } from "../utils/middifyWsHandler";

const handler = async (
  event: APIGatewayProxyWebsocketEventV2WithParsedBody<unknown>
) => {
  const { body } = event;

  logger.info("connect", { event, body });

  return {
    statusCode: 200,
    body: "connect response",
  };
};

export const connectHandler = middifyWsHandler<undefined>(handler, logger);
