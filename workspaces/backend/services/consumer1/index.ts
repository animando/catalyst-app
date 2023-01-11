/* eslint-disable no-template-curly-in-string */
import { handlerPath } from "../../utils/handlerPath";
import { createIamRoleArn } from "../../utils/iamHelpers";
import { service, topic, role } from "./config";

export const consumer1 = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  role: createIamRoleArn(role),
  vpc: {
    subnetIds: [
      "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId1}",
      "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId2}",
      "${file(./serverlessVariables-${self:custom.stage}.yml):mskSubnetId3}",
    ],
    securityGroupIds: [
      "${file(./serverlessVariables-${self:custom.stage}.yml):mskSecurityGroup}",
    ],
  },
  events: [
    {
      msk: {
        arn: "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaArn}",
        topic,
        consumerGroupId: service,
        batchSize: 1,
        enabled: true,
      },
    },
  ],
};