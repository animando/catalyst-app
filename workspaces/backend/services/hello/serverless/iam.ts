import {
  createKafkaWriteStatement,
  createRole,
} from "../../../utils/serverless/iamHelpers";
import { topics } from "../../topics";
import { role } from "../config";

export const iamRoleHello = createRole(role, [
  createKafkaWriteStatement(topics.Consumer1Topic),
]);
