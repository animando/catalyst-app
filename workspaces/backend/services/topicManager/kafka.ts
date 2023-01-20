import { createKafkaClient } from "../messaging/kafka/createKafkaClient";

export const kafkaClient = createKafkaClient("topicManager");
