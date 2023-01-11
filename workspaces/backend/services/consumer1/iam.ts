/* eslint-disable no-template-curly-in-string */
import { createKafkaReadStatement, createRole } from "../../utils/iamHelpers";
import { topic } from "./config";

export const iamRoleConsumer1 = createRole("iamRoleConsumer1", [
  createKafkaReadStatement(topic),
]);
