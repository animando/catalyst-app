import { cloudfrontServerlessConfig } from "../../../serverlessCommonConfig";
import { handlerPath } from "../../../utils/handlerPath";
import { commonLambdaConfig } from "../../../utils/serverless/commonLambdaConfig";
import { role } from "../config";

export { iamRoleAuth } from "./iam";

export const auth = {
  ...commonLambdaConfig,
  handler: `${handlerPath(__dirname)}/handler.handler`,
  role,
  events: [
    {
      preExistingCloudFront: {
        distributionId: cloudfrontServerlessConfig.DISTRIBUTION_ID,
        eventType: "viewer-request",
        pathPattern: "*",
        includeBody: false,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  ],
};
