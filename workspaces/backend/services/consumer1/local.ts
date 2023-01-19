import { LocalConsumerConfiguration } from "../types";
import { handler } from "./handler";
import { kafka } from "./utils/kafka";
import { serviceName } from "./config";
import { kafkaTopics } from "../topics";

const config: LocalConsumerConfiguration = {
  handler,
  topic: kafkaTopics.Consumer1Topic,
  service: serviceName,
  kafka,
};

export default config;
