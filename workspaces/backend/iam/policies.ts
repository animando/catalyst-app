import { kafkaServerlessConfig } from "../serverlessCommonConfig";
import { topics } from "../services/topics";

const createTopicArn = (topicName: string) =>
  `${kafkaServerlessConfig.KAFKA_TOPIC_ARN_PREFIX}/${topicName}`;

const createKafkaWriteStatement = (topicName: string) => [
  {
    Effect: "Allow",
    Action: ["kafka-cluster:DescribeTopic", "kafka-cluster:WriteData"],
    Resource: createTopicArn(topicName),
  },
];

const createKafkaReadStatement = (topicName: string) => [
  {
    // is this needed?
    Effect: "Allow",
    Action: ["kafka-cluster:DescribeTopicDynamicConfiguration"],
    Resource: createTopicArn(topicName),
  },
  {
    Effect: "Allow",
    Action: ["kafka-cluster:DescribeTopic", "kafka-cluster:ReadData"],
    Resource: createTopicArn(topicName),
  },
];

const createKafkaAdminStatement = () => [
  {
    Effect: "Allow",
    Action: ["kafka:*"],
    Resource: "*",
  },
  {
    Effect: "Allow",
    Action: ["kafka-cluster:*"],
    Resource: "*",
  },
];

const CommonKafkaPublisher = [
  {
    Effect: "Allow",
    Action: ["kafka:DescribeCluster", "kafka:GetBootstrapBrokers"],
    Resource: "*",
  },
  {
    Effect: "Allow",
    Action: ["kafka-cluster:DescribeGroup", "kafka-cluster:AlterGroup"],
    Resource: kafkaServerlessConfig.KAFKA_GROUP_ARN,
  },
  {
    Effect: "Allow",
    Action: ["kafka-cluster:Connect"],
    Resource: kafkaServerlessConfig.KAFKA_CLUSTER_ARN,
  },
  {
    Effect: "Allow",
    Action: [
      "ec2:DescribeSecurityGroups",
      "ec2:DescribeVpcs",
      "ec2:DeleteNetworkInterface",
      "ec2:DescribeSubnets",
    ],
    Resource: "*",
  },
];

const CommonKafkaConsumer = [
  {
    Effect: "Allow",
    Action: ["kafka:DescribeCluster", "kafka:GetBootstrapBrokers"],
    Resource: "*",
  },
  {
    Effect: "Allow",
    Action: ["kafka-cluster:DescribeGroup", "kafka-cluster:AlterGroup"],
    Resource: kafkaServerlessConfig.KAFKA_GROUP_ARN,
  },
  {
    Effect: "Allow",
    Action: ["kafka-cluster:Connect"],
    Resource: kafkaServerlessConfig.KAFKA_CLUSTER_ARN,
  },
  {
    Effect: "Allow",
    Action: [
      "ec2:DescribeSecurityGroups",
      "ec2:DescribeVpcs",
      "ec2:DeleteNetworkInterface",
      "ec2:DescribeSubnets",
    ],
    Resource: "*",
  },
  // TODO roll back below permissions
  {
    Effect: "Allow",
    Action: [
      "kafka:DescribeConfiguration",
      "kafka:DescribeConfigurationRevision",
    ],
    Resource: "*",
  },
  {
    Effect: "Allow",
    Action: [
      "kafka:GetCompatibleKafkaVersions",
      "kafka:ListClusterOperations",
      "kafka:ListClusters",
      "kafka:ListClustersV2",
      "kafka:ListConfigurationRevisions",
      "kafka:ListConfigurations",
      "kafka:ListKafkaVersions",
      "kafka:ListNodes",
      "kafka:ListScramSecrets",
      "kafka:DescribeClusterOperation",
      "kafka:DescribeClusterV2",
    ],
    Resource: "*",
  },
  {
    Effect: "Allow",
    Action: [
      "kafka-cluster:DescribeCluster",
      "kafka-cluster:DescribeClusterDynamicConfiguration",
      // "kafka-cluster:DescribeTransactionalId",
      // "kafka-cluster:AlterCluster",
      // "kafka-cluster:AlterClusterDynamicConfiguration",
      // "kafka-cluster:AlterGroup",
      // "kafka-cluster:AlterTopic",
      // "kafka-cluster:AlterTopicDynamicConfiguration",
      // "kafka-cluster:AlterTransactionalId",
      // "kafka-cluster:CreateTopic",
      // "kafka-cluster:DeleteGroup",
      // "kafka-cluster:DeleteTopic",
      // "kafka-cluster:WriteData",
      // "kafka-cluster:WriteDataIdempotently",
    ],
    Resource: kafkaServerlessConfig.KAFKA_CLUSTER_ARN,
  },
];

export const policies = {
  CommonKafkaConsumer,
  CommonKafkaPublisher,
  KafkaAdmin: createKafkaAdminStatement(),
  KafkaReadTopicConsumer1: createKafkaReadStatement(topics.Consumer1Topic),
  KafkaReadWriteConsumer1: createKafkaWriteStatement(topics.Consumer1Topic),
};
