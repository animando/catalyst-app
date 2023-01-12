import { createRole } from "../../../utils/serverless/iamHelpers";
import { role } from "../config";

export const iamRoleTopicManager = createRole(role, []);
