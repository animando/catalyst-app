import { Handler } from "aws-lambda";
import { applyHttpMiddleware } from "../../middleware/applyHttpMiddleware";
// import { publishKafkaMessage } from "../messaging/kafka/publishKafkaMessage";
// import { kafkaTopics } from "../topics";
import { logger } from "./logger";
// import { kafka } from "./kafka";
import { requireUserGroup } from "../../middleware/requireUserGroup";
// import { Consumer1Message } from "../../compiled-types/Consumer1Message";
import { APIGatewayProxyEventWithUserAttributes } from "../../utils/types";
import { getUserItem } from "../../utils/dbAccess";

const helloHandler: Handler<APIGatewayProxyEventWithUserAttributes> = async (
  event
) => {
  const now = new Date().toISOString();
  // const key = `${Math.floor(Math.random() * 1000)}`;
  // const payload: Consumer1Message = { message: "Hello", now };

  const { username } = event.userAttributes;

  const userItem = await getUserItem(username);

  logger.info("Got user", { userItem, username });

  // await publishKafkaMessage(
  //   { topic: kafkaTopics.Consumer1Topic, key },
  //   payload,
  //   {
  //     kafka,
  //     logger,
  //   }
  // );

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

export const handler = applyHttpMiddleware(helloHandler, { logger }).use(
  requireUserGroup("admin", { logger })
);
