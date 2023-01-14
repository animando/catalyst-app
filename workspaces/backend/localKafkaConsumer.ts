/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { MSKEvent } from "aws-lambda";
import "dotenv/config";
import { handler } from "./services/consumer1/handler";
import { LocalConsumerConfiguration } from "./services/types";

const name = "consumer1";
const config: LocalConsumerConfiguration =
  require(`./services/${name}/local`).default;
if (!config) {
  throw Error(`Unable to load config: ${name}`);
}

const { consumer } = config.kafka;

(async () => {
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
      handler(event);
    },
  });
})();
