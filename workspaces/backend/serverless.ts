/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import { consumer1, iamRoleConsumer1 } from "./services/consumer1/serverless";
import {
  preTokenGeneration,
  iamRolePreTokenGeneration,
} from "./services/preTokenGeneration/serverless";
import {
  provider,
  custom,
  kafkaEnvironment,
  kafkaServerlessCustomConfig,
  vpcServerlessCustomConfig,
  cognitoServerlessCustomConfig,
  vpcServerlessConfig,
} from "./serverless/serverlessCommonConfig";

const config: AWS = {
  service: "backend",
  provider: {
    ...provider,
    endpointType: "PRIVATE",
    vpcEndpointIds: [vpcServerlessConfig.VPC_ENDPOINT_ID],
    environment: {
      ...provider.environment,
      ...kafkaEnvironment,
    },
  },
  plugins: ["serverless-esbuild", "serverless-offline"],
  functions: {
    consumer1,
    preTokenGeneration,
  },
  resources: {
    Resources: {
      iamRoleConsumer1,
      iamRolePreTokenGeneration,
    },
  },
  custom: {
    ...custom,
    ...cognitoServerlessCustomConfig,
    ...kafkaServerlessCustomConfig,
    ...vpcServerlessCustomConfig,
  },
};

module.exports = config;
