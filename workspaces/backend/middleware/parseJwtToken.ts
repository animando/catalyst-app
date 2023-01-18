import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import jwtDecode from "jwt-decode";
import { APIGatewayProxyEventWithUserAttributes } from "../utils/types";
import { UnauthorizedError } from "../errors/unauthorized";

export const parseJwtToken = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logger,
}: {
  logger: Logger;
}): MiddlewareObj<APIGatewayProxyEvent> => ({
  before: ({ event }) => {
    const authorization = event.headers.Authorization;
    const token = (authorization?.match(/Bearer (.*)/) || [])[1];
    if (!token) {
      throw new UnauthorizedError();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenData = jwtDecode(token) as any;
    const { username, "cognito:groups": groups = [], sub: id } = tokenData;
    const userAttributes = { username, groups, id };
    // eslint-disable-next-line no-param-reassign
    (event as APIGatewayProxyEventWithUserAttributes).userAttributes =
      userAttributes;
  },
  after: () => {},
  onError: () => {},
});
