/* eslint-disable no-template-curly-in-string */

import { kafkaConfig } from "../../serverlessCommonConfig";

export const createTopicArn = (topicName: string) =>
  `${kafkaConfig.KAFKA_TOPIC_ARN_PREFIX}/${topicName}`;

export const createIamRoleArn = (roleName: string) =>
  `arn:aws:iam::\${self:custom.accountId}:role/${roleName}`;

export const createRole = (roleName: string, statements: Array<any>) => ({
  Type: "AWS::IAM::Role",
  Properties: {
    RoleName: roleName,
    AssumeRolePolicyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            Service: ["lambda.amazonaws.com"],
          },
          Action: ["sts:AssumeRole"],
        },
      ],
    },
    ManagedPolicyArns: [
      "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole",
    ],
    Policies: [
      {
        PolicyName: `policy-${roleName}`,
        PolicyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: ["kafka:DescribeCluster", "kafka:GetBootstrapBrokers"],
              Resource: "*",
            },
            {
              Effect: "Allow",
              Action: [
                "kafka-cluster:DescribeGroup",
                "kafka-cluster:AlterGroup",
              ],
              Resource: kafkaConfig.KAFKA_GROUP_ARN,
            },
            {
              Effect: "Allow",
              Action: ["kafka-cluster:Connect"],
              Resource: kafkaConfig.KAFKA_CLUSTER_ARN,
            },
            ...statements,
          ],
        },
      },
    ],
  },
});

export const createKafkaWriteStatement = (topicName: string) => ({
  Effect: "Allow",
  Action: ["kafka-cluster:DescribeTopic", "kafka-cluster:WriteData"],
  Resource: createTopicArn(topicName),
});

export const createKafkaReadStatement = (topicName: string) => ({
  Effect: "Allow",
  Action: ["kafka-cluster:DescribeTopic", "kafka-cluster:ReadData"],
  Resource: createTopicArn(topicName),
});
