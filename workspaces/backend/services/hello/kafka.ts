import { createKafkaClient } from "../messaging/kafka/createKafkaClient";
import { serviceName } from "./config";

export const kafka = createKafkaClient(serviceName);
