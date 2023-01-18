import type { AWS } from "@serverless/typescript";
import { cloudfrontServerlessConfig } from "../../../serverless/serverlessCommonConfig";
import { handlerPath } from "../../../utils/handlerPath";
import { role } from "../config";

export { iamRoleAuth } from "./iam";

const authFunctions: AWS["functions"] = {
  auth: {
    handler: `${handlerPath(__dirname)}/handler.handler`,
    role,
    memorySize: 128,
    timeout: 5,
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
  },
};
export const { auth } = authFunctions;
