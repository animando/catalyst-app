/* eslint-disable no-template-curly-in-string */

import type { AWS } from "@serverless/typescript";

export const AWS_ACCOUNT_ID = "${aws:accountId}";
export const AWS_REGION = "${aws:region}";

export const kafkaServerlessConfig = {
  KAFKA_CLUSTER_ID: "${self:custom.kafkaClusterId}",
  KAFKA_SSL_DISABLED: "${self:custom.kafkaSslDisabled}",
  KAFKA_CLUSTER_NAME: "${self:custom.kafkaClusterName}",
  KAFKA_CLUSTER_ARN: "${self:custom.kafkaClusterArn}",
  KAFKA_BOOTSTRAP_SERVER: "${self:custom.kafkaBootstrapServer}",
  KAFKA_GROUP_ARN: "${self:custom.kafkaGroupArn}",
  KAFKA_TOPIC_ARN_PREFIX: "${self:custom.kafkaTopicArnPrefix}",
};

export const kafkaEnvironment = {
  KAFKA_BOOTSTRAP_SERVER: kafkaServerlessConfig.KAFKA_BOOTSTRAP_SERVER,
  KAFKA_SSL_DISABLED: kafkaServerlessConfig.KAFKA_SSL_DISABLED,
  KAFKAJS_NO_PARTITIONER_WARNING: "1",
};

export const spaServerlessConfig = {
  SPA_URL: "${self:custom.spaUrl}",
};

export const spaServerlessEnvironment = {
  SPA_URL: spaServerlessConfig.SPA_URL,
};

export const vpcServerlessConfig = {
  PRIVATE_SUBNET_ID1: "${self:custom.privateSubnetId1}",
  PRIVATE_SUBNET_ID2: "${self:custom.privateSubnetId2}",
  PRIVATE_SUBNET_ID3: "${self:custom.privateSubnetId3}",
  LAMBDA_SECURITY_GROUP: "${self:custom.lambdaSecurityGroup}",
  VPC_ENDPOINT_ID: "${self:custom.vpcEndpointId}",
};

export const vpcServerlessCustomConfig = {
  privateSubnetId1:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):privateSubnetId1}",
  privateSubnetId2:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):privateSubnetId2}",
  privateSubnetId3:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):privateSubnetId3}",
  lambdaSecurityGroup:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):lambdaSecurityGroup}",
  vpcEndpointId:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):vpcEndpointId}",
};

export const iamServerlessConfig = {
  IAM_ROLE_PREFIX: "arn:aws:iam::${aws:accountId}:role",
};

export const cloudfrontServerlessConfig = {
  DISTRIBUTION_ID: "${self:custom.distributionId}",
};

export const cloudfrontServerlessCustomConfig = {
  distributionId:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):distributionId}",
};

export const cognitoServerlessConfig = {
  USER_POOL_CLIENT_SECRET_ARN: "${self:custom.userPoolClientSecretArn}",
  USER_POOL_ARN: "${self:custom.userPoolArn}",
  USER_POOL_ID: "${self:custom.userPoolId}",
  USER_POOL_NAME: "${self:custom.userPoolName}",
  WEBAPI_ACCESS_SCOPE: "${self:custom.webapiAccessScope}",
};

export const cognitoServerlessCustomConfig = {
  userPoolClientSecretArn:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):userPoolClientSecretArn}",
  userPoolArn:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):userPoolArn}",
  userPoolId:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):userPoolId}",
  userPoolName:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):userPoolName}",
  webapiAccessScope:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):webapiAccessScope}",
};

export const ssmServerlessConfig = {
  SSM_ARN_PREFIX: "${self:custom.ssmArnPrefix}",
};

export const ssmServerlessCustomConfig = {
  // can region be removed from this
  ssmArnPrefix: "arn:aws:ssm:eu-west-2:${aws:accountId}:parameter",
};

export const kafkaServerlessCustomConfig = {
  kafkaClusterArn:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):kafkaClusterArn}",
  kafkaClusterName:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):kafkaClusterName}",
  kafkaClusterId:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):kafkaClusterId}",
  kafkaBootstrapServer:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):kafkaBootstrapServer}",
  kafkaSslDisabled:
    "${file(serverless/serverlessVariables-${self:custom.stage}.yml):kafkaSslDisabled}",
  kafkaGroupArn:
    "arn:aws:kafka:${aws:region}:${aws:accountId}:group/${self:custom.kafkaClusterName}/${self:custom.kafkaClusterId}/*",
  kafkaTopicArnPrefix:
    "arn:aws:kafka:${aws:region}:${aws:accountId}:topic/${self:custom.kafkaClusterName}/${self:custom.kafkaClusterId}",
};

export const snsServerlessConfig = {
  SnsTopic1: "${self:custom.snsTopic1Arn}",
  SNS_TOPIC_ARN_PREFIX: "${self:custom.snsTopicArnPrefix}",
};
export const snsServerlessCustomConfig = {
  snsTopic1Arn: {
    Ref: "SNSTopicTopic1",
  },
  snsTopicArnPrefix: "arn:aws:sns:${aws:region}:${aws:accountId}",
};

export const ddbServerlessConfig = {
  TABLE_ARN_PREFIX: "${self:custom.dbdTableArnPrefix}",
};
export const ddbServerlessCustomConfig = {
  dbdTableArnPrefix: "arn:aws:dynamodb:${aws:region}:${aws:accountId}:table",
};
export const dynamodbServerlessConfig = {
  stages: ["local", "dev"],
  start: {
    port: 8000,
    inMemory: true,
    migrate: true,
    seed: true,
  },
  seed: {
    domain: {
      sources: [
        {
          table: "Catalyst",
          sources: ["./db/seed/Catalyst.json"],
        },
      ],
    },
  },
};

export const provider: AWS["provider"] = {
  name: "aws",
  runtime: "nodejs16.x",
  region: "eu-west-2",
  stage: "local",
  environment: {
    REGION: AWS_REGION,
    STAGE: "${self:custom.stage}",
    POWERTOOLS_DEV: `${process.env.POWERTOOLS_DEV}`,
    // POWERTOOLS_LOGGER_LOG_EVENT: `${process.env.POWERTOOLS_DEV}`,
  },
};

export const custom = {
  stage: "${opt:stage, self:provider.stage}",
  esbuild: {
    bundle: true,
    minify: false,
    sourcemap: true,
    packager: "yarn",
  },
  "serverless-offline": {
    noPrependStageInUrl: true,
  },
};
