import { MSKEvent } from "aws-lambda";
import { Consumer, Kafka, Producer } from "kafkajs";

export interface LocalConsumerConfiguration {
  handler: (message: MSKEvent) => Promise<void>;
  topic: string;
  service: string;
  kafka: KafkaClient;
}

export interface KafkaClient {
  kafka: Kafka;
  consumer: Consumer;
  producer: Producer;
}
