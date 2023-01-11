/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config";
import { handler } from "./services/consumer1/handler";
import { LocalConsumerConfiguration, MskEvent } from "./services/types";

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
      const { key, timestamp, offset, value, headers = {} } = message;
      const parsedValue = value === null ? null : value.toString();
      const parsedHeaders = Object.entries(headers).reduce(
        (acc, [headerKey, headerValue = ""]) => ({
          ...acc,
          [headerKey]: headerValue.toString(),
        }),
        {}
      );
      const parsedKey = key === null ? null : key.toString();
      const parsedTimestamp = new Date(Number(timestamp));
      const event: MskEvent = {
        meta: {
          topic,
          partition,
          key: parsedKey,
          timestamp: parsedTimestamp.toISOString(),
          offset: Number(offset),
        },
        headers: parsedHeaders,
        value: parsedValue,
      };
      handler(event);
    },
  });
})();
