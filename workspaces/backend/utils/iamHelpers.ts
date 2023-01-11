/* eslint-disable no-template-curly-in-string */
export const KAFKA_CLUSTER_NAME = "${self:custom.kafkaClusterName}";
export const KAFKA_CLUSTER_ID = "${self:custom.kafkaClusterId}";

export const createTopicArn = (topicName: string) =>
  `arn:aws:kafka:\${self:custom.region}:\${self:custom.accountId}:topic/${KAFKA_CLUSTER_NAME}/${KAFKA_CLUSTER_ID}/${topicName}`;

export const createRole = (roleName: string, statements: Array<any>) => ({
  Type: "AWS::IAM::Role",
  Properties: {
    RoleName: roleName,
    AssumePolicyDocument: {
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
        Effect: "Allow",
        Action: ["kafka:DescribeCluster", "kafka:GetBootstrapBrokers"],
        Resource: "*",
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
      ...statements,
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
