import {
  createKafkaReadStatement,
  createRole,
} from "../../../utils/serverless/iamHelpers";
import { topics } from "../../topics";
import { role } from "../config";

export const iamRoleConsumer1 = createRole(role, [
  createKafkaReadStatement(topics.Consumer1Topic),
]);
