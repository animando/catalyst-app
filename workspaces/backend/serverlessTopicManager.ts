/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import {
  AWS_REGION,
  custom,
  kafkaConfig,
  spaConfig,
} from "./serverlessCommonConfig";

import {
  topicManager,
  iamRoleTopicManager,
} from "./services/topicManager/serverless";

const config: AWS = {
  service: "topic-manager",
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
    scripts: {
      hooks: {
        "after:deploy:deploy": "yarn run run:topicManager",
      },
    },
  },
};

module.exports = config;
