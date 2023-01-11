/* eslint-disable no-template-curly-in-string */
import { corsConfig } from "../../serverlessCorsConfig";
import { handlerPath } from "../../utils/handlerPath";
import { role } from "./config";

export const hello = {
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
