/* eslint-disable max-classes-per-file */
import { MiddlewareObj } from "@middy/core";
import { Logger } from "@aws-lambda-powertools/logger";
import { APIGatewayProxyEventWithUserAttributes } from "../utils/types";
import { ForbiddenError } from "../errors/forbidden";

export const requireUserGroup = (
  group: string,
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logger,
  }: {
    logger: Logger;
  }
): MiddlewareObj<APIGatewayProxyEventWithUserAttributes> => ({
  before: ({ event }) => {
    const { userAttributes } = event;
    if (!userAttributes.groups.includes(group)) {
      logger.info("Not in required group", {
        group,
        userAttributes,
      });
      throw new ForbiddenError();
    }
  },
  after: () => {},
  onError: () => {},
});
