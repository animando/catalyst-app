import { Kafka } from "kafkajs";
import { KafkaClient } from "../services/types";
import { config } from "./config";

export const createKafkaClient = (service: string): KafkaClient => {
  const kafka = new Kafka({
    clientId: service,
    brokers: config.KAFKA_BOOTSTRAP_SERVER.split(","),
    ssl: config.KAFKA_SSL_DISABLED !== "true",
  });

  const producer = kafka.producer({});
  const consumer = kafka.consumer({
    groupId: "js-consumer",
  });

  return {
    producer,
    consumer,
  };
};
