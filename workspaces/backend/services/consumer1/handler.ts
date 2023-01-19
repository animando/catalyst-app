import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { config } from "../../utils/config";
import { createMskHandler } from "../../utils/createMskHandler";
import { Consumer1Message, SnsTopic1Payload } from "../messageTypes";
import { MSKHandler } from "../types";
import { logger } from "./logger";
import Consumer1MessageSchema from "../../schemas/Consumer1Message.json";

const consumer1Handler: MSKHandler<Consumer1Message> = async (
  event,
  context
) => {
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

  logger.info("Preparing to send sns message", {
    topic: config.SNS_TOPIC1,
    payload,
  });

  await sns.send(
    new PublishCommand({
      TopicArn: config.SNS_TOPIC1,
      Message: payload,
    })
  );
};

export const handler = createMskHandler(consumer1Handler, {
  logger,
  schema: Consumer1MessageSchema,
});
