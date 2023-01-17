import {
  cognitoServerlessConfig,
  kafkaServerlessConfig,
} from "../serverlessCommonConfig";
import { topics } from "../services/topics";
import { ALLOW } from "../utils/serverless/iamHelpers";

const createTopicArn = (topicName: string) =>
  `${kafkaServerlessConfig.KAFKA_TOPIC_ARN_PREFIX}/${topicName}`;

const createReadSecretStatement = (secretArn: string) => [
  {
    Effect: ALLOW,
    Action: ["secretsmanager:GetSecretValue"],
    Resource: secretArn,
  },
];
const createKafkaWriteStatement = (topicName: string) => [
  {
    Effect: ALLOW,
    Action: ["kafka-cluster:DescribeTopic", "kafka-cluster:WriteData"],
    Resource: createTopicArn(topicName),
  },
];

const createKafkaReadStatement = (topicName: string) => [
  {
    Effect: ALLOW,
    Action: ["kafka-cluster:DescribeTopic", "kafka-cluster:ReadData"],
    Resource: createTopicArn(topicName),
  },
];

const createKafkaAdminStatement = () => [
  {
    Effect: ALLOW,
    Action: ["kafka:*"],
    Resource: "*",
  },
  {
    Effect: ALLOW,
    Action: ["kafka-cluster:*"],
    Resource: "*",
  },
];

const KafkaGroupPermissions = [
  {
    Effect: ALLOW,
    Action: ["kafka-cluster:DescribeGroup", "kafka-cluster:AlterGroup"],
    Resource: kafkaServerlessConfig.KAFKA_GROUP_ARN,
  },
];

const BaseKafkaPermissions = [
  {
    Effect: ALLOW,
    Action: ["kafka-cluster:Connect"],
    Resource: kafkaServerlessConfig.KAFKA_CLUSTER_ARN,
  },
  {
    Effect: ALLOW,
    Action: ["kafka:DescribeCluster", "kafka:GetBootstrapBrokers"],
    Resource: "*",
  },
];

const KafkaEc2Permissions = [
  {
    Effect: ALLOW,
    Action: [
      "ec2:DescribeSecurityGroups",
      "ec2:DescribeVpcs",
      "ec2:DeleteNetworkInterface",
      "ec2:DescribeSubnets",
    ],
    Resource: "*",
  },
  {
    Effect: ALLOW,
    Action: [
      "ec2:CreateNetworkInterface",
      "ec2:DescribeNetworkInterfaces",
      "ec2:DeleteNetworkInterface",
    ],
    Resource: "*",
  },
];

const CommonKafka = [
  ...BaseKafkaPermissions,
  ...KafkaGroupPermissions,
  ...KafkaEc2Permissions,
];

const CommonKafkaPublisher = CommonKafka;

const CommonKafkaConsumer = CommonKafka;

export const policies = {
  CommonKafkaConsumer,
  CommonKafkaPublisher,
  KafkaAdmin: createKafkaAdminStatement(),
  KafkaReadTopicConsumer1: createKafkaReadStatement(topics.Consumer1Topic),
  KafkaReadWriteConsumer1: createKafkaWriteStatement(topics.Consumer1Topic),
  ReadAppClientSecret: createReadSecretStatement(
    cognitoServerlessConfig.USER_POOL_CLIENT_SECRET_ARN
  ),
};
