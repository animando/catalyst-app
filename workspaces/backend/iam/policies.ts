import { CatalystTableName } from "../db/table-definitions/Catalyst";
import {
  cognitoServerlessConfig,
  kafkaServerlessConfig,
  snsServerlessConfig,
  ssmServerlessConfig,
  ddbServerlessConfig,
} from "../serverless/serverlessCommonConfig";
import { kafkaTopics, snsTopics } from "../services/topics";
import { ALLOW, IamStatement } from "../utils/serverless/iamHelpers";

const createTopicArn = (topicName: string) =>
  `${kafkaServerlessConfig.KAFKA_TOPIC_ARN_PREFIX}/${topicName}`;
const createSnsTopicArn = (topicName: string) =>
  `${snsServerlessConfig.SNS_TOPIC_ARN_PREFIX}:${topicName}`;
const createDynamoTableArn = (tableName: string) =>
  `${ddbServerlessConfig.TABLE_ARN_PREFIX}/${tableName}`;

const createTableReadStatement = (tableName: string) => [
  {
    Effect: ALLOW,
    Action: ["dynamodb:GetItem"],
    Resource: createDynamoTableArn(tableName),
  },
];
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
const createSnsPublishStatement = (topicName: string) => [
  {
    Effect: ALLOW,
    Action: ["sns:Publish"],
    Resource: createSnsTopicArn(topicName),
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const KafkaGroupPermissions = [
  {
    Effect: ALLOW,
    Action: ["kafka-cluster:DescribeGroup", "kafka-cluster:AlterGroup"],
    Resource: kafkaServerlessConfig.KAFKA_GROUP_ARN,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const CommonKafka: IamStatement[] = [
  // ...BaseKafkaPermissions,
  // ...KafkaGroupPermissions,
  // ...KafkaEc2Permissions,
];

const CommonKafkaPublisher = CommonKafka;

const CommonKafkaConsumer = CommonKafka;

const ReadSsmParameters = [
  {
    Effect: ALLOW,
    Action: ["ssm:GetParameter"],
    Resource: `${ssmServerlessConfig.SSM_ARN_PREFIX}/*`,
  },
];

export const policies = {
  CommonKafkaConsumer,
  CommonKafkaPublisher,
  KafkaAdmin: createKafkaAdminStatement(),
  KafkaReadTopicConsumer1: createKafkaReadStatement(kafkaTopics.Consumer1Topic),
  KafkaReadWriteConsumer1: createKafkaWriteStatement(
    kafkaTopics.Consumer1Topic
  ),
  ReadAppClientSecret: createReadSecretStatement(
    cognitoServerlessConfig.USER_POOL_CLIENT_SECRET_ARN
  ),
  ReadSsmParameters,
  PublishTopic1: createSnsPublishStatement(snsTopics.Topic1),
  CatalystTableRead: createTableReadStatement(CatalystTableName),
};
