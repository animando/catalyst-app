import { Handler, MSKEvent, SNSEvent, SNSEventRecord } from "aws-lambda";
import { Consumer, Kafka, Producer } from "kafkajs";

export interface LocalConsumerConfiguration {
  handler: Handler<MSKEvent>;
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

interface MskMessageAttributes {
  topic: string;
  partition: number;
  offset: number;
  timestamp: Date;
  timestampType: "CREATE_TIME" | "LOG_APPEND_TIME";
  key: string;
  headers: MessageHeaders;
}

type ParsedMessageAttributes<M, T> = M & {
  parsed: true;
  value: T;
};
type UnparsedMessageAttributes<M> = M & {
  parsed: false;
  value: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SnsMessageAttributes {}

type ParsedMSKResult<T> =
  | ParsedMessageAttributes<MskMessageAttributes, T>
  | UnparsedMessageAttributes<MskMessageAttributes>;

export type MSKMessageEvent<T> = Omit<MSKEvent, "records"> & ParsedMSKResult<T>;

type ParsedSNSResult<T> =
  | ParsedMessageAttributes<SnsMessageAttributes, T>
  | UnparsedMessageAttributes<SnsMessageAttributes>;

export type SNSMessageEvent<T> = Omit<SNSEvent, "Records"> &
  SNSEventRecord &
  ParsedSNSResult<T>;
