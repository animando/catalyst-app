import { kafkaConfig } from "../../serverlessCommonConfig";

export const createIamRoleArn = (roleName: string) =>
  `arn:aws:iam::\${self:custom.accountId}:role/${roleName}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRole = (
  roleName: string,
  statements: Array<any>,
  managedPolicyArns: Array<string> = []
) => ({
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
      ...managedPolicyArns,
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
