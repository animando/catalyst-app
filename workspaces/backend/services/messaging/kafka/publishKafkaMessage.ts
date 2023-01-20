import { Logger } from "@aws-lambda-powertools/logger";
import { TRACE_ID_HEADER } from "../../../utils/constants";
import { KafkaClient, MessageHeaders } from "../../types";

export const publishKafkaMessage = async (
  message: { topic: string; key: string; headers?: MessageHeaders },
  value: object,
  config: { kafka: KafkaClient; logger: Logger }
) => {
  const { topic, key, headers } = message;
  const timestamp = Date.now();
  const { kafka, logger } = config;
  const { producer } = kafka;

  const traceId = logger.getPersistentLogAttributes().catalystTraceId as
    | string
    | undefined;

  const headersToSend = {
    ...headers,
    [TRACE_ID_HEADER]: traceId,
  };

  logger.info("Publishing message", { topic, value, headers: headersToSend });

  await producer.connect();
  await producer.send({
    topic,
    messages: [
      {
        key,
        value: JSON.stringify(value),
        timestamp: `${timestamp}`,
        headers: headersToSend,
      },
    ],
  });
  await producer.disconnect();
};
