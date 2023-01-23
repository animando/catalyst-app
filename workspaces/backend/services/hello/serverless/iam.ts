import { policies } from "../../../iam/policies";
import { createRole } from "../../../utils/serverless/iamHelpers";
import { role } from "../config";

export const iamRoleHello = createRole(role, [
  ...policies.CommonKafkaPublisher,
  // ...policies.KafkaReadWriteConsumer1,
  ...policies.CatalystTableRead,
]);
