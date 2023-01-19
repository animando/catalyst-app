/* eslint-disable @typescript-eslint/no-unused-vars */
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import type { Handler, MSKEvent } from "aws-lambda";
import { config } from "../../utils/config";
import { createMskHandler } from "../../utils/createMskHandler";
import { Consumer1Message, SnsTopic1Payload } from "../messageTypes";
import { MSKHandler } from "../types";
import { logger } from "./logger";

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

const mskHandler = createMskHandler(consumer1Handler, logger);

export const handler: Handler<MSKEvent> = (event, context) =>
  mskHandler(event, context);
