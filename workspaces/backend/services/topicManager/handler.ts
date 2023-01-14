import { config } from "../../utils/config";
import { topics } from "../topics";
import { kafkaClient } from "./kafka";
import { logger } from "./logger";

const REPLICATION_FACTOR = config.KAFKA_BOOTSTRAP_SERVER.split(",").length;
const NUM_PARTITIONS = 10;

const { kafka } = kafkaClient;

const allTopics = Object.values(topics);

export const handler = async () => {
  const admin = kafka.admin();

  await admin.connect();
  const existingTopics = await admin.listTopics();

  const topicsToCreate = allTopics.filter(
    (topic) => !existingTopics.includes(topic)
  );
  logger.info("topics", { allTopics, existingTopics });

  if (topicsToCreate.length) {
    logger.info("Creating topics", { topicsToCreate });

    await admin.createTopics({
      topics: topicsToCreate.map((topic) => ({
        topic,
        numPartitions: NUM_PARTITIONS,
        replicationFactor: REPLICATION_FACTOR,
      })),
    });
  } else {
    logger.info("No topics to create");
  }
};
