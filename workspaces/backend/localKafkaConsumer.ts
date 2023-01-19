/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Context, MSKEvent } from "aws-lambda";
import "dotenv/config";
import { handler } from "./services/consumer1/handler";
import { LocalConsumerConfiguration } from "./services/types";

const consumers = ["consumer1"];

const runConsumer = async (consumerName: string) => {
  const config: LocalConsumerConfiguration =
    require(`./services/${consumerName}/local`).default;
  if (!config) {
    throw Error(`Unable to load config: ${consumerName}`);
  }

  const { consumer } = config.kafka;

  await consumer.connect();
  await consumer.subscribe({ topic: config.topic });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { key, timestamp, offset, value } = message;
      const event: MSKEvent = {
        eventSource: "aws:kafka",
        eventSourceArn: "",
        records: {
          [topic]: [
            {
              headers: [],
              key: key ? key.toString("base64") : "",
              offset: Number(offset),
              partition,
              timestamp: Number(timestamp),
              timestampType: "CREATE_TIME",
              topic,
              value: value ? value.toString("base64") : "",
            },
          ],
        },
      };
      return handler(event, {} as Context, () => null);
    },
  });
};

(async () => {
  consumers.forEach(async (consumerName) => {
    await runConsumer(consumerName);
  });
})();
