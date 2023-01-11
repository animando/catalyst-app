/* eslint-disable no-template-curly-in-string */
import { handlerPath } from "../../../utils/handlerPath";
import { service, topic, role } from "../config";

export { iamRoleConsumer1 } from "./iam";

export const consumer1 = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
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