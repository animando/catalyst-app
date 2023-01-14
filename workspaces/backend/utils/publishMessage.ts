import { Logger } from "@aws-lambda-powertools/logger";
import { KafkaClient, MessageHeaders } from "../services/types";

export const publishMessage = async (
  message: { topic: string; key: string; headers?: MessageHeaders },
  value: object,
  config: { kafka: KafkaClient; logger: Logger }
) => {
  const { topic, key, headers } = message;
  const timestamp = Date.now();
  const { kafka, logger } = config;
  const { producer } = kafka;

  logger.info("Publishing message", { topic, value });

  await producer.connect();
  await producer.send({
    topic,
    messages: [
      {
        key,
        value: JSON.stringify(value),
        timestamp: `${timestamp}`,
        headers: {
          ...headers,
        },
      },
    ],
  });
  await producer.disconnect();
};
