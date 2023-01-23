/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
// import { consumer1, iamRoleConsumer1 } from "./services/consumer1/serverless";
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
  snsServerlessCustomConfig,
  ddbServerlessCustomConfig,
  dynamodbServerlessConfig,
} from "./serverless/serverlessCommonConfig";
import { snsTopics } from "./services/topics";
import { CatalystTable } from "./db/table-definitions/Catalyst";

const SNSTopicTopic1 = {
  Type: "AWS::SNS::Topic",
  Properties: {
    TopicName: snsTopics.Topic1,
  },
};

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
  package: {
    individually: true,
  },
  plugins: [
    "serverless-dynamodb-local",
    "serverless-esbuild",
    "serverless-offline-sns",
    "serverless-offline",
  ],
  functions: {
    // consumer1,
    preTokenGeneration,
    snsConsumer,
  },
  resources: {
    Resources: {
      // iamRoleConsumer1,
      iamRolePreTokenGeneration,
      iamRoleSnsConsumer,
      SNSTopicTopic1,
      CatalystTable,
    },
  },
  custom: {
    ...custom,
    ...cognitoServerlessCustomConfig,
    ...kafkaServerlessCustomConfig,
    ...vpcServerlessCustomConfig,
    ...snsServerlessCustomConfig,
    ...ddbServerlessCustomConfig,
    dynamodb: {
      ...dynamodbServerlessConfig,
    },
    "serverless-offline-sns": {
      port: 5000,
    },
  },
};

module.exports = config;
