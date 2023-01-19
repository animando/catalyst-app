import { handlerPath } from "../../../utils/handlerPath";
import { commonLambdaConfig } from "../../../utils/serverless/commonLambdaConfig";
import { snsTopics } from "../../topics";
import { role } from "../config";

export { iamRoleSnsConsumer } from "./iam";

export const snsConsumer = {
  ...commonLambdaConfig,
  handler: `${handlerPath(__dirname)}/handler.handler`,
  role,
  events: [
    {
      sns: snsTopics.Topic1,
    },
  ],
};
