/* eslint-disable no-template-curly-in-string */
import { handlerPath } from "../../utils/handlerPath";
import { service, topic } from "./config";

export const consumer1 = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
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
        arn: "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaId}",
        topic,
        consumerGroupId: service,
        batchSize: 1,
        enabled: true,
      },
    },
  ],
};
