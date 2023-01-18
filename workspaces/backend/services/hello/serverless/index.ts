import { corsConfig } from "../../../serverless/serverlessCorsConfig";
import { handlerPath } from "../../../utils/handlerPath";
import { commonLambdaConfig } from "../../../utils/serverless/commonLambdaConfig";
import { role } from "../config";

export { iamRoleHello } from "./iam";

export const hello = {
  ...commonLambdaConfig,
  handler: `${handlerPath(__dirname)}/handler.hello`,
  role,
  events: [
    {
      http: {
        path: "hello",
        method: "get",
        cors: corsConfig,
      },
    },
  ],
};
