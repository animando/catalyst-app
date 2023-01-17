/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import {
  cognitoServerlessConfig,
  cognitoServerlessCustomConfig,
  custom,
  provider,
} from "./serverlessCommonConfig";

import {
  preTokenGeneration,
  iamRolePreTokenGeneration,
} from "./services/preTokenGeneration/serverless";

const cognitoInvokePermission = {
  Type: "AWS::Lambda::Permission",
  Properties: {
    Action: "lambda:InvokeFunction",
    FunctionName: "preTokenGeneration-${self:custom.stage}",
    Principal: "cognito-idp.amazonaws.com",
    SourceArn: cognitoServerlessConfig.USER_POOL_ARN,
  },
  DependsOn: ["preTokenGeneration-${self:custom.stage}"],
};

const config: AWS = {
  service: "preTokenGeneration",
  provider: {
    ...provider,
  },
  plugins: ["serverless-esbuild"],
  functions: {
    preTokenGeneration,
  },
  resources: {
    Resources: {
      iamRolePreTokenGeneration,
      cognitoInvokePermission,
    },
  },
  custom: {
    ...custom,
    ...cognitoServerlessCustomConfig,
  },
};

module.exports = config;
