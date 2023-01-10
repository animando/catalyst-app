import { now } from "shared-utils/general";
import { applyHttpMiddleware } from "../../utils/applyHttpMiddleware";

const helloHandler = async () => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: `Go Serverless v3.0! Your function executed successfully!: ${now()}`,
    },
    null,
    2
  ),
});

export const hello = applyHttpMiddleware(helloHandler);
