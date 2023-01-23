/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import { hello, iamRoleHello } from "./services/hello/serverless";
import {
  websocketConnection,
  iamRoleWebsocketConnection,
} from "./services/wsConnection/serverless";
import {
  provider,
  custom,
  kafkaEnvironment,
  kafkaServerlessCustomConfig,
  spaServerlessEnvironment,
  vpcServerlessCustomConfig,
  cognitoServerlessCustomConfig,
  cognitoServerlessConfig,
  ddbServerlessCustomConfig,
} from "./serverless/serverlessCommonConfig";

const apiKeyConfig = process.env.DISABLE_PRIVATE_APIS
  ? {}
  : {
      apiKeys: [
        {
          name: "ui-api-key",
        },
      ],
      usagePlan: {
        quota: {
          limit: 500,
          offset: 0,
          period: "DAY" as const,
        },
        throttle: {
          burstLimit: 20,
          rateLimit: 5,
        },
      },
    };

const ApiGatewayAuthorizer = {
  Type: "AWS::ApiGateway::Authorizer",
  Properties: {
    Name: "ApiGatewayAuthorizer",
    Type: "COGNITO_USER_POOLS",
    IdentitySource: "method.request.header.Authorization",
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
    apiGateway: {
      ...apiKeyConfig,
    },
    websocketsApiName: "ws-api",
    websocketsApiRouteSelectionExpression: "$request.body.action",
    websocketsDescription: "Serverless Websockets",
  },
  plugins: ["serverless-esbuild", "serverless-offline"],
  functions: {
    hello,
    websocketConnection,
  },
  resources: {
    Resources: {
      ApiGatewayAuthorizer,
      iamRoleHello,
      iamRoleWebsocketConnection,
    },
  },
  custom: {
    ...custom,
    ...cognitoServerlessCustomConfig,
    ...kafkaServerlessCustomConfig,
    ...vpcServerlessCustomConfig,
    ...ddbServerlessCustomConfig,
    spaUrl:
      "${file(serverless/serverlessVariables-${self:custom.stage}.yml):spaUrl}",
  },
};

module.exports = config;
