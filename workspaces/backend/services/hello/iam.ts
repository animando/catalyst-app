/* eslint-disable no-template-curly-in-string */
import { createKafkaWriteStatement, createRole } from "../../utils/iamHelpers";
import { topic, role } from "../consumer1/config";

export const iamRoleHello = createRole(role, [
  createKafkaWriteStatement(topic),
]);
