import { APIGatewayProxyEvent } from "aws-lambda";

export interface UserAttributes {
  username: string;
  groups: string[];
  id: string;
}

export type APIGatewayProxyEventWithUserAttributes = APIGatewayProxyEvent & {
  userAttributes: UserAttributes;
};
