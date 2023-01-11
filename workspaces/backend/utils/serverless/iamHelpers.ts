/* eslint-disable no-template-curly-in-string */

import {
  KAFKA_CLUSTER_ARN,
  KAFKA_CLUSTER_ID,
  KAFKA_CLUSTER_NAME,
  KAFKA_GROUP_ARN,
} from "./mskConfig";

export const createTopicArn = (topicName: string) =>
  `arn:aws:kafka:\${self:custom.region}:\${self:custom.accountId}:topic/${KAFKA_CLUSTER_NAME}/${KAFKA_CLUSTER_ID}/${topicName}`;

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
              Resource: KAFKA_GROUP_ARN,
            },
            {
              Effect: "Allow",
              Action: ["kafka-cluster:Connect"],
              Resource: KAFKA_CLUSTER_ARN,
            },
            // {
            //   Effect: "Allow",
            //   Action: [
            //     "ec2:CreateNetworkInterface",
            //     "ec2:DescribeNetworkInterfaces",
            //     "ec2:DescribeVpcs",
            //     "ec2:DeleteNetworkInterface",
            //     "ec2:DescribeSubnets",
            //     "ec2:DescribeSecurityGroups",
            //   ],
            //   Resource: "*",
            // },
            // {
            //   Effect: "Allow",
            //   Action: [
            //     "logs:CreateLogGroup",
            //     "logs:CreateLogStream",
            //     "logs:PutLogEvents",
            //   ],
            //   Resource: `arn:aws:logs:\${self:custom.region}:\${self:custom.accountId}:log-group:/aws/lambda/\${self:service}-\${self:custom.stage}:*:*`,
            // },
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
