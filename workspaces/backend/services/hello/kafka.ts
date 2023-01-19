import { createKafkaClient } from "../../utils/createKafkaClient";
import { serviceName } from "./config";

export const kafka = createKafkaClient(serviceName);
