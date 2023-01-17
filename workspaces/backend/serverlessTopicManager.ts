/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import {
  custom,
  kafkaEnvironment,
  kafkaServerlessCustomConfig,
  provider,
  vpcServerlessCustomConfig,
} from "./serverlessCommonConfig";

import {
  topicManager,
  iamRoleTopicManager,
} from "./services/topicManager/serverless";

const config: AWS = {
  service: "topic-manager",
  provider: {
    ...provider,
    environment: {
      ...provider.environment,
      ...kafkaEnvironment,
    },
  },
  plugins: ["serverless-esbuild", "serverless-plugin-scripts"],
  functions: {
    topicManager,
  },
  resources: {
    Resources: {
      iamRoleTopicManager,
    },
  },
  custom: {
    ...custom,
    ...kafkaServerlessCustomConfig,
    ...vpcServerlessCustomConfig,
    scripts: {
      hooks: {
        "after:deploy:deploy": "yarn run run:topicManager",
      },
    },
  },
};

module.exports = config;
