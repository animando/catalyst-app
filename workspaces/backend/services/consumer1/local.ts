import { LocalConsumerConfiguration } from "../types";
import { handler } from "./handler";
import { kafka } from "./utils/kafka";
import { service } from "./config";
import { topics } from "../topics";

const config: LocalConsumerConfiguration = {
  handler,
  topic: topics.Consumer1Topic,
  service,
  kafka,
};

export default config;
