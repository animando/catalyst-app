import { Logger } from "@aws-lambda-powertools/logger";
import middy, { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyWebsocketEventV2, Handler } from "aws-lambda";
import {
  APIGatewayProxyWebsocketEventV2WithParsedBody,
  WsEventBody,
} from "../types";
import { logger } from "./logger";

const parseWsEventBody = <T>(body: string): WsEventBody<T> => {
  const parsed = JSON.parse(body);
  const { headers: unparsedHeaders, value: unparsedValue } = parsed;
  const headersString = Buffer.from(unparsedHeaders, "base64").toString();
  const valueString = Buffer.from(unparsedValue, "base64").toString();
  const parsedHeaders = JSON.parse(headersString);
  const parsedValue = JSON.parse(valueString);
  return {
    headers: parsedHeaders,
    value: parsedValue,
  };
};

const useWsEventHandler = <T>({
  logger: _logger,
}: {
  logger: Logger;
}): MiddlewareObj<APIGatewayProxyWebsocketEventV2> => ({
  before: ({ event }) => {
    logger.info("before", { body: event.body });
    const modifiedEvent =
      event as unknown as APIGatewayProxyWebsocketEventV2WithParsedBody<T>;
    if (event.body) {
      modifiedEvent.body = parseWsEventBody(event.body);
    }
  },
  after: ({ event: _event }) => {
    //
  },
  onError: ({ event: _event }) => {
    //
  },
});

const middifyWsHandler = <T>(
  handler: Handler<APIGatewayProxyWebsocketEventV2WithParsedBody<T>>,
  loggerObj: Logger
) => middy(handler).use(useWsEventHandler<T>({ logger: loggerObj }));

export const connectHandler = middifyWsHandler<undefined>(async (event) => {
  const { body } = event;

  logger.info("connect", { body });

  return {
    statusCode: 200,
  };
}, logger);
export const disconnectHandler = middifyWsHandler<undefined>(async (_event) => {
  logger.info("disconnect");

  return {
    statusCode: 200,
  };
}, logger);
export const defaultHandler = middifyWsHandler<object>(async (event) => {
  const { body } = event;

  logger.info("default", { body });

  return {
    statusCode: 200,
  };
}, logger);
export const subscribeHandler = middifyWsHandler(async (event) => {
  const { body } = event;

  logger.info("subscribe", { body });

  return {
    statusCode: 200,
  };
}, logger);

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
