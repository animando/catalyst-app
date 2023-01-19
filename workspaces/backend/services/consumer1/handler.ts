import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import type { Handler, MSKEvent } from "aws-lambda";
import { config } from "../../utils/config";
import { createMskHandler } from "../../utils/createMskHandler";
import { MSKMessageEvent } from "../types";
import { logger } from "./logger";

export interface Consumer1Message {
  message: string;
  now: string;
}

const consumer1Handler: Handler<MSKMessageEvent<Consumer1Message>> = async (
  event,
  context
) => {
  const { value } = event;
  const sns = new SNSClient({
    region: config.REGION,
    endpoint: "http://localhost:5000",
  });

  logger.info("Processing message", {
    value,
    context,
  });

  await sns.send(
    new PublishCommand({
      TopicArn: config.SNS_TOPIC1,
      Message: Buffer.from(JSON.stringify({ snsMesssage: "hello" })).toString(
        "base64"
      ),
    })
  );
};

const mskHandler = createMskHandler(consumer1Handler, logger);

export const handler: Handler<MSKEvent> = (
  event: MSKEvent,
  context,
  callback
) => mskHandler(event, context, callback);
