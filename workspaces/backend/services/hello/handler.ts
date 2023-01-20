import { Handler } from "aws-lambda";
import { DynamoDB, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { applyHttpMiddleware } from "../../middleware/applyHttpMiddleware";
import { publishKafkaMessage } from "../messaging/kafka/publishKafkaMessage";
import { kafkaTopics } from "../topics";
import { logger } from "./logger";
import { kafka } from "./kafka";
import { requireUserGroup } from "../../middleware/requireUserGroup";
import { Consumer1Message } from "../../compiled-types/Consumer1Message";
import { APIGatewayProxyEventWithUserAttributes } from "../../utils/types";
import { config } from "../../utils/config";
import { unmarshallItemWithoutKeys } from "../../utils/dbUtils";

const ddb = new DynamoDB({
  region: config.REGION,
  ...(config.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}),
});

const getUserItem = async (username: string) => {
  const { Item } = await ddb.send(
    new GetItemCommand({
      TableName: "Catalyst",
      Key: marshall({ PK: `user#${username}`, SK: `user#${username}` }),
    })
  );
  return Item ? unmarshallItemWithoutKeys(Item) : null;
};

const helloHandler: Handler<APIGatewayProxyEventWithUserAttributes> = async (
  event
) => {
  const now = new Date().toISOString();
  const key = `${Math.floor(Math.random() * 1000)}`;
  const payload: Consumer1Message = { message: "Hello", now };

  const { username } = event.userAttributes;

  const userItem = await getUserItem(username);

  logger.info("Got user", { userItem, username });

  await publishKafkaMessage(
    { topic: kafkaTopics.Consumer1Topic, key },
    payload,
    {
      kafka,
      logger,
    }
  );

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
