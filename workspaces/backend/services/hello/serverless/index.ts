import {
  authorizer,
  corsConfig,
} from "../../../serverless/serverlessHttpConfig";
import { handlerPath } from "../../../utils/handlerPath";
import { commonLambdaConfig } from "../../../utils/serverless/commonLambdaConfig";
import { role } from "../config";

export { iamRoleHello } from "./iam";

export const hello = {
  ...commonLambdaConfig,
  handler: `${handlerPath(__dirname)}/handler.handler`,
  role,
  events: [
    {
      http: {
        path: "hello",
        method: "get",
        cors: corsConfig,
        ...(process.env.IS_OFFLINE
          ? {}
          : {
              authorizer,
            }),
        ...(process.env.DISABLE_PRIVATE_APIS ? {} : { private: true }),
      },
    },
  ],
};
