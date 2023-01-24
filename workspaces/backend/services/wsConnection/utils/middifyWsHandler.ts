import { Logger } from "@aws-lambda-powertools/logger";
import middy, { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyWebsocketEventV2, Handler } from "aws-lambda";
import { APIGatewayProxyWebsocketEventV2WithParsedBody } from "../../types";
import { decodeWsMessageBody } from "./decodeWsMessageBody";

const useWsEventHandler = <T>({
  logger,
}: {
  logger: Logger;
}): MiddlewareObj<APIGatewayProxyWebsocketEventV2> => ({
  before: ({ event, context }) => {
    logger.info("Websocket event", { event, context });
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
