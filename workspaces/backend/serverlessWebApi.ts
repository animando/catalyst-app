/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import { hello, iamRoleHello } from "./services/hello/serverless";
import {
  provider,
  custom,
  kafkaEnvironment,
  kafkaServerlessCustomConfig,
  spaServerlessEnvironment,
  vpcServerlessCustomConfig,
  cognitoServerlessCustomConfig,
  cognitoServerlessConfig,
} from "./serverless/serverlessCommonConfig";

const ApiGatewayAuthorizer = {
  Type: "AWS::ApiGateway::Authorizer",
  Properties: {
    Name: "ApiGatewayAuthorizer",
    IdentitySource: "COGNITO_USER_POOLS",
    RestApiId: {
      Ref: "ApiGatewayRestApi",
    },
    ProviderARNs: [cognitoServerlessConfig.USER_POOL_ARN],
  },
};

const config: AWS = {
  service: "webApi",
  provider: {
    ...provider,
    environment: {
      ...provider.environment,
      ...kafkaEnvironment,
      ...spaServerlessEnvironment,
    },
  },
  plugins: ["serverless-esbuild", "serverless-offline"],
  functions: {
    hello,
  },
  resources: {
    Resources: {
      ApiGatewayAuthorizer,
      iamRoleHello,
    },
  },
  custom: {
    ...custom,
    ...cognitoServerlessCustomConfig,
    ...kafkaServerlessCustomConfig,
    ...vpcServerlessCustomConfig,
    spaUrl:
      "${file(serverless/serverlessVariables-${self:custom.stage}.yml):spaUrl}",
  },
};

module.exports = config;
