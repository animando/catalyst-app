/* eslint-disable no-template-curly-in-string,import/no-extraneous-dependencies,import/no-import-module-exports */
import { AWS } from "@serverless/typescript";
import { hello } from "./services/hello";
import { consumer1 } from "./services/consumer1";
import { iamRoleConsumer1 } from "./services/consumer1/iam";
import { iamRoleHello } from "./services/hello/iam";

const config: AWS = {
  service: "backend",
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "eu-west-2",
    stage: "local",
    environment: {
      SPA_URL: "${file(./serverlessVariables-${self:custom.stage}.yml):spaUrl}",
      KAFKA_BOOTSTRAP_SERVER:
        "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaBootstrapServer}",
      KAFKA_SSL_DISABLED:
        "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaSslDisabled}",
    },
  },
  plugins: ["serverless-esbuild", "serverless-offline"],
  functions: {
    hello,
    consumer1,
  },
  resources: {
    Resources: {
      iamRoleConsumer1,
      iamRoleHello,
    },
  },
  custom: {
    stage: "${opt:stage, self:provider.stage}",
    esbuild: {
      bundle: true,
      minify: false,
      packager: "yarn",
    },
    "serverless-offline": {
      noPrependStageInUrl: true,
    },
    accountId: "${aws:accountId}",
    region: "${aws:region}",
    kafkaClusterId:
      "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaClusterId}",
    kafkaClusterName:
      "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaClusterName}",
  },
};

module.exports = config;
