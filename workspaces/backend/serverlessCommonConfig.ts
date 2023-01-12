/* eslint-disable no-template-curly-in-string */

export const AWS_ACCOUNT_ID = "${aws:accountId}";
export const AWS_REGION = "${aws:region}";

export const kafkaConfig = {
  KAFKA_CLUSTER_ID:
    "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaClusterId}",
  KAFKA_SSL_DISABLED:
    "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaSslDisabled}",
  KAFKA_CLUSTER_NAME: "${self:custom.kafkaClusterName}",
  KAFKA_CLUSTER_ARN:
    "arn:aws:kafka:${aws:region}:${aws:accountId}:cluster/${self:custom.kafkaClusterName}/${self:custom.kafkaClusterId}",
  KAFKA_BOOTSTRAP_SERVER:
    "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaBootstrapServer}",
  KAFKA_GROUP_ARN:
    "arn:aws:kafka:${aws:region}:${aws:accountId}:group/${self:custom.kafkaClusterName}/${self:custom.kafkaClusterId}/*",
  KAFKA_TOPIC_ARN_PREFIX:
    "arn:aws:kafka:${aws:region}:${aws:accountId}:topic/${self:custom.kafkaClusterName}/${self:custom.kafkaClusterId}",
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
  // accountId: "${aws:accountId}",
  // region: "${aws:region}",
  // spaUrl: "${file(./serverlessVariables-${self:custom.stage}.yml):spaUrl}",
  kafkaClusterId:
    "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaClusterId}",
  // kafkaSslDisabled:
  //   "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaSslDisabled}",
  kafkaClusterName:
    "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaClusterName}",
  // kafkaClusterArn:
  //   "arn:aws:kafka:${aws:region}:${aws:accountId}:cluster/${self:custom.kafkaClusterName}/${self:custom.kafkaClusterId}",
  // kafkaBootstrapServer:
  //   "arn:aws:kafka:${aws:region}:${aws:accountId}:cluster/${self:custom.kafkaClusterName}/${self:custom.kafkaClusterId}",
  // kafkaGroupArn:
  //   "arn:aws:kafka:${aws:region}:${aws:accountId}:group/${self:custom.kafkaClusterName}/${self:custom.kafkaClusterId}/*",
  // kafkaTopicArnPrefix:
  //   "arn:aws:kafka:${aws:region}:${aws:accountId}:topic/${self:custom.kafkaClusterName}/${self:custom.kafkaClusterId}",
  // mskSubnetId1:
  //   "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId1}",
  // mskSubnetId2:
  //   "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId2}",
  // mskSubnetId3:
  //   "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId3}",
  // lambdaSecurityGroup:
  //   "${file(./serverlessVariables-${self:custom.stage}.yml):lambdaSecurityGroup}",
};
