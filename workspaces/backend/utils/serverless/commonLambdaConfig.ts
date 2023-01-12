import { kafkaConfig, vpcConfig } from "../../serverlessCommonConfig";

export const commonLambdaConfig = {
  vpc: {
    subnetIds: [
      vpcConfig.MSK_SUBNET_ID1,
      vpcConfig.MSK_SUBNET_ID2,
      vpcConfig.MSK_SUBNET_ID3,
    ],
    securityGroupIds: [vpcConfig.LAMBDA_SECURITY_GROUP],
  },
};

export const commonMskEventConfig = {
  arn: kafkaConfig.KAFKA_CLUSTER_ARN,
  batchSize: 1,
  enabled: true,
};
