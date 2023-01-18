import type { AWS } from "@serverless/typescript";
import { cognitoServerlessConfig } from "../../../serverless/serverlessCommonConfig";
import { handlerPath } from "../../../utils/handlerPath";
import { commonLambdaConfig } from "../../../utils/serverless/commonLambdaConfig";
import { role } from "../config";

export { iamRolePreTokenGeneration } from "./iam";

const authFunctions: AWS["functions"] = {
  preTokenGeneration: {
    ...commonLambdaConfig,
    handler: `${handlerPath(__dirname)}/handler.handler`,
    role,
    events: [
      {
        cognitoUserPool: {
          pool: cognitoServerlessConfig.USER_POOL_NAME,
          trigger: "PreTokenGeneration",
          existing: true,
        },
      },
    ],
  },
};

export const { preTokenGeneration } = authFunctions;
