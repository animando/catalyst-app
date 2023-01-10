import { corsConfig } from "../../serverlessCorsConfig";
import { handlerPath } from "../../utils/handlerPath";

export const hello = {
  handler: `${handlerPath(__dirname)}/handler.hello`,
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
