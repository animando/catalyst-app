import { snsServerlessConfig } from "../../../serverless/serverlessCommonConfig";
import { handlerPath } from "../../../utils/handlerPath";
import {
  commonLambdaConfig,
  commonMskEventConfig,
} from "../../../utils/serverless/commonLambdaConfig";
import { kafkaTopics } from "../../topics";
import { role } from "../config";

export { iamRoleConsumer1 } from "./iam";

export const consumer1 = {
  ...commonLambdaConfig,
  handler: `${handlerPath(__dirname)}/handler.handler`,
  role,
  environment: {
    SNS_TOPIC1: snsServerlessConfig.SnsTopic1,
  },
  events: [
    {
      msk: {
        ...commonMskEventConfig,
        topic: kafkaTopics.Consumer1Topic,
      },
    },
  ],
};
