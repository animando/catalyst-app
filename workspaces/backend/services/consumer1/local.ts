import { LocalConsumerConfiguration } from "../types";
import { handler } from "./handler";
import { kafka } from "./kafka";
import { topic, service } from "./config";

const config: LocalConsumerConfiguration = {
  handler,
  topic,
  service,
  kafka,
};

export default config;
