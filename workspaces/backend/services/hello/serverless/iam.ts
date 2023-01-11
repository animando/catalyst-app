/* eslint-disable no-template-curly-in-string */
import {
  createKafkaWriteStatement,
  createRole,
} from "../../../utils/serverless/iamHelpers";
import { topic } from "../../consumer1/config";
import { role } from "../config";

export const iamRoleHello = createRole(role, [
  createKafkaWriteStatement(topic),
]);
