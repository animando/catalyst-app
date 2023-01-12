export const createIamRoleArn = (roleName: string) =>
  `arn:aws:iam::\${self:custom.accountId}:role/${roleName}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          Statement: statements,
        },
      },
    ],
  },
});
