/* eslint-disable @typescript-eslint/no-unused-vars */
import { handlerPath } from "../../../utils/handlerPath";
import {
  commonLambdaConfig,
  commonMskEventConfig,
} from "../../../utils/serverless/commonLambdaConfig";
import { topics } from "../../topics";
import { role } from "../config";

export { iamRoleConsumer1 } from "./iam";

export const consumer1 = {
  ...commonLambdaConfig,
  handler: `${handlerPath(__dirname)}/handler.handler`,
  role,
  events: [],
};
