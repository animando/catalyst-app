import { handlerPath } from "../../../utils/handlerPath";
import { commonLambdaConfig } from "../../../utils/serverless/commonLambdaConfig";
import { role } from "../config";

export { iamRoleWebsocketConnection } from "./iam";

export const websocketConnection = {
  ...commonLambdaConfig,
  handler: `${handlerPath(__dirname)}/handler.handler`,
  role,
  events: [
    {
      websocket: {
        route: "$connect",
      },
    },
    {
      websocket: {
        route: "$disconnect",
      },
    },
    {
      websocket: {
        route: "$default",
      },
    },
  ],
};
