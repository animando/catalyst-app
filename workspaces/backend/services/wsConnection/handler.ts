import { APIGatewayProxyWebsocketEventV2, Handler } from "aws-lambda";
import type { WsIncomingAction } from "shared-types/websocket/actions";
import { connectHandler } from "./handlers/connectHandler";
import { defaultHandler } from "./handlers/defaultHandler";
import { disconnectHandler } from "./handlers/disconnectHandler";
import { subscribeHandler } from "./handlers/subscribeHandler";
import { logger } from "./utils/logger";

type BuiltInAction = "$connect" | "$disconnect" | "$default";

type Action = BuiltInAction | WsIncomingAction;

const handlerMap: Record<Action, Handler | undefined> = {
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
  logger.info("wsConnection.handler", { routeKey });
  const routeHandler = handlerMap[routeKey as Action];

  if (routeHandler) {
    return routeHandler(event, ...args);
  }

  logger.warn("Unknown handler for routeKey", { routeKey });

  return {
    statusCode: 404,
  };
};
