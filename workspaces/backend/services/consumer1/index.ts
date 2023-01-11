import { handlerPath } from "../../utils/handlerPath";
import { service, topic } from "./config";

export const consumer1 = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      msk: {
        // eslint-disable-next-line no-template-curly-in-string
        arn: "${file(./serverlessVariables-${self:custom.stage}.yml):kafkaId}",
        topic,
        consumerGroupId: service,
        batchSize: 1,
        enabled: true,
      },
    },
  ],
};
