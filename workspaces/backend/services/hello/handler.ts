import { applyHttpMiddleware } from "../../middleware/applyHttpMiddleware";
import { publishMessage } from "../../utils/publishMessage";
import { kafkaTopics } from "../topics";
import { logger } from "./logger";
import { kafka } from "./kafka";
// import { Consumer1Message } from "../consumer1/handler";
import { requireUserGroup } from "../../middleware/requireUserGroup";

const helloHandler = async () => {
  const now = new Date().toISOString();
  const key = `${Math.floor(Math.random() * 1000)}`;
  // const payload: Consumer1Message = { message: "Hello", now };
  const payload = "Invalid message" as unknown as object;

  await publishMessage({ topic: kafkaTopics.Consumer1Topic, key }, payload, {
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

export const hello = applyHttpMiddleware(helloHandler, { logger }).use(
  requireUserGroup("admin", { logger })
);
