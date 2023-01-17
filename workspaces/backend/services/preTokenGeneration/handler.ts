import {} from "@aws-sdk/client-secrets-manager";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: any, context: any, callback: any) => {
  // eslint-disable-next-line no-param-reassign
  event.response = {
    claimsOverrideDetails: {
      groupOverrrideDetails: {
        groupsToOverride: ["bob"],
      },
    },
  };
  callback(null, event);
};
