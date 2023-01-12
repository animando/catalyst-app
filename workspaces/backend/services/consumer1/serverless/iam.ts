import { policies } from "../../../iam/policies";
import { createRole } from "../../../utils/serverless/iamHelpers";
import { role } from "../config";

export const iamRoleConsumer1 = createRole(role, [
  policies.KafkaReadTopicConsumer1,
]);
