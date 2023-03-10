// import { IamStatement } from "../../../utils/serverless/iamHelpers";
import { role } from "../config";

export const createRole = (
  roleName: string
  // statements: Array<IamStatement>
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
          Sid: "",
        },
      ],
    },
    ManagedPolicyArns: [
      "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole",
    ],
    // Policies: [
    //   {
    //     PolicyName: `policy-${roleName}`,
    //     PolicyDocument: {
    //       Version: "2012-10-17",
    //       Statement: statements,
    //     },
    //   },
    // ],
  },
});

export const iamRolePreTokenGeneration = createRole(role);
