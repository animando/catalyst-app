/* eslint-disable no-template-curly-in-string */
import { corsConfig } from "../../serverlessCorsConfig";
import { handlerPath } from "../../utils/handlerPath";
import { role } from "./config";

export const hello = {
  handler: `${handlerPath(__dirname)}/handler.hello`,
  role,
  vpc: {
    subnetIds: [
      "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId1}",
      "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId2}",
      "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId3}",
    ],
    securityGroupIds: [
      "${file(./serverlessVariables-${self:custom.stage}.yml):lambdaSecurityGroup}",
    ],
  },
  events: [
    {
      http: {
        path: "hello",
        method: "get",
        cors: corsConfig,
      },
    },
  ],
};
