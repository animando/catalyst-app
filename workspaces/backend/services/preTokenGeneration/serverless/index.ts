import type { AWS } from "@serverless/typescript";
import { cognitoServerlessConfig } from "../../../serverlessCommonConfig";
import { handlerPath } from "../../../utils/handlerPath";
import { role } from "../config";

export { iamRolePreTokenGeneration } from "./iam";

const authFunctions: AWS["functions"] = {
  preTokenGeneration: {
    handler: `${handlerPath(__dirname)}/handler.handler`,
    role,
    memorySize: 128,
    timeout: 5,
    events: [
      {
        cognitoUserPool: {
          pool: cognitoServerlessConfig.USER_POOL_ID,
          trigger: "PreTokenGeneration",
          existing: true,
        },
      },
    ],
  },
};

export const { preTokenGeneration } = authFunctions;
