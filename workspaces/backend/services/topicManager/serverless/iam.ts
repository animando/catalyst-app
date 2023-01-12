import { policies } from "../../../iam/policies";
import { createRole } from "../../../utils/serverless/iamHelpers";
import { role } from "../config";

export const iamRoleTopicManager = createRole(role, [policies.KafkaAdmin]);
