/* eslint-disable no-template-curly-in-string */
import { createKafkaWriteStatement, createRole } from "../../utils/iamHelpers";
import { topic } from "../consumer1/config";

export const iamRoleHello = createRole("iamRoleHello", [
  createKafkaWriteStatement(topic),
]);
