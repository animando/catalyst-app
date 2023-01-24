import { Logger } from "@aws-lambda-powertools/logger";
import middy, { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyWebsocketEventV2, Handler } from "aws-lambda";
import { APIGatewayProxyWebsocketEventV2WithParsedBody } from "../../types";
import { decodeWsMessageBody } from "./decodeWsMessageBody";
import { logger } from "./logger";

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
      modifiedEvent.body = decodeWsMessageBody(event.body);
    }
  },
  after: ({ event: _event }) => {
    //
  },
  onError: ({ event: _event }) => {
    //
  },
});

export const middifyWsHandler = <T>(
  handler: Handler<APIGatewayProxyWebsocketEventV2WithParsedBody<T>>,
  loggerObj: Logger
) => middy(handler).use(useWsEventHandler<T>({ logger: loggerObj }));
