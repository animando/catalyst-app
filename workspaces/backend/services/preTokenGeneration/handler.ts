import { logger } from "./logger";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: any, context: any) => {
  logger.info("Got event", { event, context });
  // eslint-disable-next-line no-param-reassign
  event.response = {
    claimsOverrideDetails: {
      groupOverrideDetails: {
        groupsToOverride: ["bob"],
      },
    },
  };
  return event;
};
