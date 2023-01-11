/* eslint-disable no-template-curly-in-string */
import { createKafkaReadStatement, createRole } from "../../utils/iamHelpers";
import { topic, role } from "./config";

export const iamRoleConsumer1 = createRole(role, [
  createKafkaReadStatement(topic),
]);
