/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import {
  cognitoServerlessCustomConfig,
  custom,
  provider,
  vpcServerlessCustomConfig,
} from "./serverlessCommonConfig";

import {
  preTokenGeneration,
  iamRolePreTokenGeneration,
} from "./services/preTokenGeneration/serverless";

const config: AWS = {
  service: "authPtg",
  provider: {
    ...provider,
  },
  plugins: ["serverless-esbuild"],
  functions: {
    preTokenGeneration,
  },
  resources: {
    Resources: {
      iamRolePreTokenGeneration,
    },
  },
  custom: {
    ...custom,
    ...cognitoServerlessCustomConfig,
    ...vpcServerlessCustomConfig,
  },
};

module.exports = config;
