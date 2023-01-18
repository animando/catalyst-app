/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import { hello, iamRoleHello } from "./services/hello/serverless";
import {
  provider,
  custom,
  kafkaEnvironment,
  kafkaServerlessCustomConfig,
  spaServerlessEnvironment,
  vpcServerlessCustomConfig,
  cognitoServerlessCustomConfig,
} from "./serverlessCommonConfig";

const config: AWS = {
  service: "webApi",
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
  },
  resources: {
    Resources: {
      iamRoleHello,
    },
  },
  custom: {
    ...custom,
    ...cognitoServerlessCustomConfig,
    ...kafkaServerlessCustomConfig,
    ...vpcServerlessCustomConfig,
    spaUrl: "${file(./serverlessVariables-${self:custom.stage}.yml):spaUrl}",
  },
};

module.exports = config;
