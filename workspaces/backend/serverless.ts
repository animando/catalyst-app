/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import { consumer1, iamRoleConsumer1 } from "./services/consumer1/serverless";
import {
  snsConsumer,
  iamRoleSnsConsumer,
} from "./services/snsConsumer/serverless";
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
// import { snsTopics } from "./services/topics";

const config: AWS = {
  service: "backend",
  provider: {
    ...provider,
    endpointType: "PRIVATE",
    vpcEndpointIds: [vpcServerlessConfig.VPC_ENDPOINT_ID],
    environment: {
      ...provider.environment,
      ...kafkaEnvironment,
      // SNS_TOPIC1: {
      //   Ref: snsTopics.Topic1,
      // },
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-offline-sns",
  ],
  functions: {
    consumer1,
    preTokenGeneration,
    snsConsumer,
  },
  resources: {
    Resources: {
      iamRoleConsumer1,
      iamRolePreTokenGeneration,
      iamRoleSnsConsumer,
    },
  },
  custom: {
    ...custom,
    ...cognitoServerlessCustomConfig,
    ...kafkaServerlessCustomConfig,
    ...vpcServerlessCustomConfig,
    "serverless-offline-sns": {
      port: 5000,
    },
  },
};

module.exports = config;
