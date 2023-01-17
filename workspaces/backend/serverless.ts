/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import { hello, iamRoleHello } from "./services/hello/serverless";
import { consumer1, iamRoleConsumer1 } from "./services/consumer1/serverless";
import {
  provider,
  custom,
  kafkaEnvironment,
  kafkaServerlessCustomConfig,
  spaServerlessEnvironment,
  vpcServerlessCustomConfig,
} from "./serverlessCommonConfig";

const config: AWS = {
  service: "backend",
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
    consumer1,
  },
  resources: {
    Resources: {
      iamRoleConsumer1,
      iamRoleHello,
    },
  },
  custom: {
    ...custom,
    ...kafkaServerlessCustomConfig,
    ...vpcServerlessCustomConfig,
    spaUrl: "${file(./serverlessVariables-${self:custom.stage}.yml):spaUrl}",
  },
};

module.exports = config;
