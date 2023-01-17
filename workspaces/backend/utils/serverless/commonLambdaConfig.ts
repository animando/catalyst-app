import {
  kafkaServerlessConfig,
  vpcServerlessConfig,
} from "../../serverlessCommonConfig";

export const commonLambdaConfig = {
  vpc: {
    subnetIds: [
      vpcServerlessConfig.PRIVATE_SUBNET_ID1,
      vpcServerlessConfig.PRIVATE_SUBNET_ID2,
      vpcServerlessConfig.PRIVATE_SUBNET_ID3,
    ],
    securityGroupIds: [vpcServerlessConfig.LAMBDA_SECURITY_GROUP],
  },
};

export const commonMskEventConfig = {
  arn: kafkaServerlessConfig.KAFKA_CLUSTER_ARN,
  batchSize: 1,
  enabled: true,
};
