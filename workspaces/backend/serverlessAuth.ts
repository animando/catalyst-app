/* eslint-disable import/no-import-module-exports */
import type { AWS } from "@serverless/typescript";
import {
  cloudfrontServerlessCustomConfig,
  cognitoServerlessCustomConfig,
  custom,
  provider,
} from "./serverlessCommonConfig";

import { auth, iamRoleAuth } from "./services/auth/serverless";

const config: AWS = {
  service: "auth",
  provider: {
    ...provider,
    region: "us-east-1",
  },
  plugins: [
    "serverless-esbuild",
    "serverless-lambda-edge-pre-existing-cloudfront",
  ],
  functions: {
    auth,
  },
  resources: {
    Resources: {
      iamRoleAuth,
    },
  },
  custom: {
    ...custom,
    ...cognitoServerlessCustomConfig,
    ...cloudfrontServerlessCustomConfig,
  },
};

module.exports = config;
