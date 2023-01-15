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

const CommonKafka = [
  {
    Effect: "Allow",
    Action: ["kafka-cluster:Connect"],
    Resource: kafkaServerlessConfig.KAFKA_CLUSTER_ARN,
  },
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
    Action: [
      "ec2:DescribeSecurityGroups",
      "ec2:DescribeVpcs",
      "ec2:DeleteNetworkInterface",
      "ec2:DescribeSubnets",
    ],
    Resource: "*",
  },
  {
    Effect: "Allow",
    Action: [
      "ec2:CreateNetworkInterface",
      "ec2:DescribeNetworkInterfaces",
      "ec2:DeleteNetworkInterface",
    ],
    Resource: "*",
  },
  // brute force!
  {
    Effect: "Allow",
    Action: [
      // all

      // already got, for all resources
      // "kafka:DescribeCluster",
      // "kafka:GetBootstrapBrokers",

      // already got, resource restricted

      // don't mind giving (RO)
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
      "kafka:DescribeConfiguration",
      "kafka:DescribeConfigurationRevision",
      "kafka:ListTagsForResource",

      // shouldn't have (RW)
      // "kafka:TagResource",
      // "kafka:UntagResource",
      // "kafka:BatchAssociateScramSecret",
      // "kafka:BatchDisassociateScramSecret",
      // "kafka:CreateCluster",
      // "kafka:CreateClusterV2",
      // "kafka:CreateConfiguration",
      // "kafka:DeleteCluster",
      // "kafka:DeleteConfiguration",
      // "kafka:RebootBroker",
      // "kafka:UpdateBrokerCount",
      // "kafka:UpdateBrokerStorage",
      // "kafka:UpdateBrokerType",
      // "kafka:UpdateClusterConfiguration",
      // "kafka:UpdateClusterKafkaVersion",
      // "kafka:UpdateConfiguration",
      // "kafka:UpdateConnectivity",
      // "kafka:UpdateMonitoring",
      // "kafka:UpdateSecurity",
      // "kafka:UpdateStorage",
    ],
    Resource: "*",
  },
  {
    Effect: "Allow",
    Action: [
      // all

      // already got, for all resources

      // already got, resource restricted
      // "kafka-cluster:Connect",
      // "kafka-cluster:DescribeGroup",
      // "kafka-cluster:AlterGroup",

      // don't mind giving (RO)
      "kafka-cluster:DescribeCluster",
      "kafka-cluster:DescribeClusterDynamicConfiguration",
      "kafka-cluster:DescribeTopic",
      "kafka-cluster:DescribeTopicDynamicConfiguration",
      "kafka-cluster:DescribeTransactionalId",
      "kafka-cluster:ReadData",
      "kafka-cluster:WriteData",
      "kafka-cluster:WriteDataIdempotently",

      // shouldn't have (RW)
      // "kafka-cluster:AlterCluster",
      // "kafka-cluster:AlterClusterDynamicConfiguration",
      // "kafka-cluster:AlterTopic",
      // "kafka-cluster:AlterTopicDynamicConfiguration",
      // "kafka-cluster:AlterTransactionalId",
      // "kafka-cluster:CreateTopic",
      // "kafka-cluster:DeleteGroup",
      // "kafka-cluster:DeleteTopic",
    ],
    Resource: "*",
  },
  // {
  //   Action: ["lambda:UpdateEventSourceMapping"],
  //   Resource: "arn:aws:lambda:eu-west-2:accountId:event-source-mapping:*",
  //   Effect: "Allow",
  // },
  // {
  //   Action: "lambda:ListEventSourceMappings",
  //   Resource: ["*"],
  //   Effect: "Allow",
  // },
];

const CommonKafkaPublisher = [...CommonKafka];

const CommonKafkaConsumer = [
  ...CommonKafka,
  // TODO roll back below permissions
];

export const policies = {
  CommonKafkaConsumer,
  CommonKafkaPublisher,
  KafkaAdmin: createKafkaAdminStatement(),
  KafkaReadTopicConsumer1: createKafkaReadStatement(topics.Consumer1Topic),
  KafkaReadWriteConsumer1: createKafkaWriteStatement(topics.Consumer1Topic),
};
