export const kafkaConfig = {
  KAFKA_CLUSTER_ID: process.env.KAFKA_CLUSTER_ID,
  KAFKA_SSL_DISABLED: process.env.KAFKA_SSL_DISABLED === "true",
  KAFKA_CLUSTER_NAME: process.env.KAFKA_CLUSTER_NAME,
  KAFKA_CLUSTER_ARN: process.env.KAFKA_CLUSTER_ARN,
  KAFKA_BOOTSTRAP_SERVER: process.env.KAFKA_BOOTSTRAP_SERVER,
  KAFKA_GROUP_ARN: process.env.KAFKA_GROUP_ARN,
  KAFKA_TOPIC_ARN_PREFIX: process.env.KAFKA_TOPIC_ARN_PREFIX,
};
