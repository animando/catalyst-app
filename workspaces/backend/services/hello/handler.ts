import { applyHttpMiddleware } from "../../utils/applyHttpMiddleware";
import { publishMessage } from "../../utils/publishMessage";
import { topics } from "../topics";
import { logger } from "./logger";
import { kafka } from "./kafka";
import { Consumer1Message } from "../consumer1/handler";

const helloHandler = async () => {
  const now = new Date().toISOString();
  const key = `${Math.floor(Math.random() * 1000)}`;
  const payload: Consumer1Message = { message: "Hello", now };

  await publishMessage({ topic: topics.Consumer1Topic, key }, payload, {
    kafka,
    logger,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Go Serverless v3.0! Your function executed successfully!: ${now}`,
      },
      null,
      2
    ),
  };
};

export const hello = applyHttpMiddleware(helloHandler);
