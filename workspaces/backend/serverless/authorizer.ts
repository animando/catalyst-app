export const authorizer = {
  name: "CognitoAuthorizer",
  type: "COGNITO_USER_POOLS",
  authorizerId: {
    Ref: "ApiGatewayAuthorizer",
  },
  scopes: [""],
};
