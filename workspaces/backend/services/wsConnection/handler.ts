import { APIGatewayProxyWebsocketEventV2, Handler } from "aws-lambda";
import { connectHandler } from "./handlers/connectHandler";
import { defaultHandler } from "./handlers/defaultHandler";
import { disconnectHandler } from "./handlers/disconnectHandler";
import { subscribeHandler } from "./handlers/subscribeHandler";
import { logger } from "./utils/logger";

const handlerMap: Record<string, Handler | undefined> = {
  $connect: connectHandler,
  $disconnect: disconnectHandler,
  $default: defaultHandler,
  subscribe: subscribeHandler,
};

export const handler: Handler<APIGatewayProxyWebsocketEventV2> = async (
  event,
  ...args
) => {
  const {
    requestContext: { routeKey },
  } = event;
  const routeHandler = handlerMap[routeKey];

  if (routeHandler) {
    return routeHandler(event, ...args);
  }

  logger.warn("Unknown handler for routeKey", { routeKey });

  return {
    statusCode: 404,
  };
};
