import { policies } from "../../../iam/policies";
import { createRole } from "../../../utils/serverless/iamHelpers";
import { role } from "../config";

export const iamRoleAuth = createRole(role, [...policies.ReadAppClientSecret]);
