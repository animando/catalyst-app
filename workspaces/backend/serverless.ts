/* eslint-disable no-template-curly-in-string,import/no-extraneous-dependencies,import/no-import-module-exports */
import { AWS } from "@serverless/typescript";
import { hello, iamRoleHello } from "./services/hello/serverless";
import { consumer1, iamRoleConsumer1 } from "./services/consumer1/serverless";
import {
  AWS_REGION,
  custom,
  kafkaConfig,
  spaConfig,
} from "./serverlessCommonConfig";

const config: AWS = {
  service: "backend",
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "eu-west-2",
    stage: "local",
    environment: {
      REGION: AWS_REGION,
      SPA_URL: spaConfig.SPA_URL,
      KAFKA_BOOTSTRAP_SERVER: kafkaConfig.KAFKA_BOOTSTRAP_SERVER,
      KAFKA_SSL_DISABLED: kafkaConfig.KAFKA_SSL_DISABLED,
      KAFKAJS_NO_PARTITIONER_WARNING: "1",
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
  custom,
};

module.exports = config;
