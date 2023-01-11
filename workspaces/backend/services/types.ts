import { Consumer, Producer } from "kafkajs";

export interface MskEvent {
  value: any;
  meta: {
    topic: string;
    partition: number;
    key: string | null;
    timestamp: string;
    offset: number;
  };
  headers: Record<string, unknown | undefined>;
}

export interface LocalConsumerConfiguration {
  handler: (message: MskEvent) => Promise<void>;
  topic: string;
  service: string;
  kafka: KafkaClient;
}

export interface KafkaClient {
  consumer: Consumer;
  producer: Producer;
}
