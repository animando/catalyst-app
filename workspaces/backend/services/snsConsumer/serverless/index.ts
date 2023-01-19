import { snsServerlessConfig } from "../../../serverless/serverlessCommonConfig";
import { handlerPath } from "../../../utils/handlerPath";
import { commonLambdaConfig } from "../../../utils/serverless/commonLambdaConfig";
import { role } from "../config";

export { iamRoleSnsConsumer } from "./iam";

export const snsConsumer = {
  ...commonLambdaConfig,
  handler: `${handlerPath(__dirname)}/handler.handler`,
  role,
  events: [
    {
      sns: {
        arn: snsServerlessConfig.SnsTopic1,
        topicName: "topic1",
      },
    },
  ],
};
