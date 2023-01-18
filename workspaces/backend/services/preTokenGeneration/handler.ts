import { PreTokenGenerationTriggerHandler } from "aws-lambda";
import { logger } from "./logger";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler: PreTokenGenerationTriggerHandler = (event) => {
  logger.info("Got event", { event });
  // eslint-disable-next-line no-param-reassign
  // event.response = {
  //   claimsOverrideDetails: {
  //     groupOverrideDetails: {
  //       groupsToOverride: ["bob"],
  //     },
  //   },
  // };
  return Promise.resolve(event);
};
