/* eslint-disable no-template-curly-in-string */
export const KAFKA_CLUSTER_NAME = "${self:custom.kafkaClusterName}";
export const KAFKA_CLUSTER_ID = "${self:custom.kafkaClusterId}";
export const KAFKA_CLUSTER_ARN = `arn:aws:kafka:\${self:custom.region}:\${self:custom.accountId}:cluster/${KAFKA_CLUSTER_NAME}/${KAFKA_CLUSTER_ID}`;
export const KAFKA_GROUP_ARN = `arn:aws:kafka:\${self:custom.region}:\${self:custom.accountId}:group/${KAFKA_CLUSTER_NAME}/${KAFKA_CLUSTER_ID}/*`;
