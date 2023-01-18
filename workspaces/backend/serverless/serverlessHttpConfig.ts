import {
  cognitoServerlessConfig,
  spaServerlessConfig,
} from "./serverlessCommonConfig";

export const corsConfig = {
  origin: spaServerlessConfig.SPA_URL,
  headers: ["*"],
  allowCredentials: false,
  cacheControl: "max-age=600, s-maxage=600, proxy-revalidate",
};

export const authorizer = {
  name: "CognitoAuthorizer",
  type: "COGNITO_USER_POOLS",
  authorizerId: {
    Ref: "ApiGatewayAuthorizer",
  },
  scopes: [cognitoServerlessConfig.WEBAPI_ACCESS_SCOPE],
};
