/* eslint-disable @typescript-eslint/no-unused-vars */
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { config } from "../../utils/config";
import { createMskHandler } from "../messaging/kafka/createMskHandler";
import { MSKHandler } from "../types";
import { logger } from "./logger";
import Consumer1MessageSchema from "../../json-schemas/Consumer1Message.json";
import { Consumer1Message } from "../../compiled-types/Consumer1Message";
import { SnsTopic1Payload } from "../../compiled-types/SnsTopic1Payload";
import { publishSnsMessage } from "../messaging/sns/publishSnsMessage";

const consumer1Handler: MSKHandler<Consumer1Message> = async (
  event,
  context
) => {
  console.log({ IS_OFFLINE: config.IS_OFFLINE });
  const sns = new SNSClient({
    region: config.REGION,
    ...(config.IS_OFFLINE
      ? {
          endpoint: "http://localhost:5000",
        }
      : {}),
  });
  if (event.parsed) {
    const { value } = event;
    logger.info("Processing message", {
      context,
      value,
      SNS_TOPIC1: config.SNS_TOPIC1,
    });
  } else {
    const { value } = event;
    logger.info("Processing unparsed message", {
      context,
      value,
      SNS_TOPIC1: config.SNS_TOPIC1,
    });
  }

  const snsMessage: SnsTopic1Payload = {
    snsMessage: "hello",
  };

  const payload = Buffer.from(JSON.stringify(snsMessage)).toString("base64");

  await publishSnsMessage({ topic: config.SNS_TOPIC1 }, snsMessage, {
    logger,
    client: sns,
  });
};

export const handler = createMskHandler(consumer1Handler, {
  logger,
  schema: Consumer1MessageSchema,
});
