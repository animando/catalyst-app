export const createIamRoleArn = (roleName: string) =>
  `arn:aws:iam::\${self:custom.accountId}:role/${roleName}`;

export const ALLOW = "Allow" as const;
export const DENY = "Deny" as const;

interface IamStatement {
  Effect: typeof ALLOW | typeof DENY;
  Action: string | string[];
  Resource: string | string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRole = (
  roleName: string,
  statements: Array<IamStatement>,
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
          Statement: statements,
        },
      },
    ],
  },
});
