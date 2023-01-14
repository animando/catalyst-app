/* eslint-disable no-template-curly-in-string */

import type { AWS } from "@serverless/typescript";

export const AWS_ACCOUNT_ID = "${aws:accountId}";
export const AWS_REGION = "${aws:region}";

const kafkaClusterArn =
  "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaClusterArn}";
const kafkaClusterName =
  "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaClusterName}";
const arnTokens = kafkaClusterArn.split("/");
const kafkaClusterId = arnTokens[arnTokens.length - 1];
export const kafkaConfig = {
  KAFKA_CLUSTER_ID: kafkaClusterId,
  KAFKA_SSL_DISABLED:
    "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaSslDisabled}",
  KAFKA_CLUSTER_NAME: kafkaClusterName,
  KAFKA_CLUSTER_ARN: kafkaClusterArn,
  KAFKA_BOOTSTRAP_SERVER:
    "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaBootstrapServer}",
  KAFKA_GROUP_ARN: `arn:aws:kafka:\${aws:region}:\${aws:accountId}:group/${kafkaClusterName}/${kafkaClusterId}/*`,
  KAFKA_TOPIC_ARN_PREFIX: `arn:aws:kafka:\${aws:region}:\${aws:accountId}:topic/${kafkaClusterName}/${kafkaClusterId}`,
};

export const spaConfig = {
  SPA_URL: "${file(./serverlessVariables-${self:custom.stage}.yml):spaUrl}",
};

export const vpcConfig = {
  MSK_SUBNET_ID1:
    "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId1}",
  MSK_SUBNET_ID2:
    "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId2}",
  MSK_SUBNET_ID3:
    "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId3}",
  LAMBDA_SECURITY_GROUP:
    "${file(./serverlessVariables-${self:custom.stage}.yml):lambdaSecurityGroup}",
};

export const iamConfig = {
  IAM_ROLE_PREFIX: "arn:aws:iam::${aws:accountId}:role",
};

export const provider: AWS["provider"] = {
  name: "aws",
  runtime: "nodejs16.x",
  region: "eu-west-2",
  stage: "local",
  environment: {
    REGION: AWS_REGION,
    KAFKA_BOOTSTRAP_SERVER: kafkaConfig.KAFKA_BOOTSTRAP_SERVER,
    KAFKA_SSL_DISABLED: kafkaConfig.KAFKA_SSL_DISABLED,
    KAFKAJS_NO_PARTITIONER_WARNING: "1",
  },
};

export const custom = {
  stage: "${opt:stage, self:provider.stage}",
  esbuild: {
    bundle: true,
    minify: false,
    packager: "yarn",
  },
  "serverless-offline": {
    noPrependStageInUrl: true,
  },
};
