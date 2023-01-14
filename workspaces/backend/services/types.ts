import { Context, MSKEvent } from "aws-lambda";
import { Consumer, Kafka, Producer } from "kafkajs";

export interface LocalConsumerConfiguration {
  handler: (message: MSKEvent, context: Context) => Promise<void>;
  topic: string;
  service: string;
  kafka: KafkaClient;
}

export interface KafkaClient {
  kafka: Kafka;
  consumer: Consumer;
  producer: Producer;
}

export type MessageHeaders = Record<string, string | undefined>;

export interface Message<T> {
  topic: string;
  partition: number;
  offset: number;
  timestamp: Date;
  timestampType: "CREATE_TIME" | "LOG_APPEND_TIME";
  key: string;
  value: T;
  headers: MessageHeaders;
}

export type KafkaMessageConsumer<T> = (message: Message<T>) => Promise<void>;
