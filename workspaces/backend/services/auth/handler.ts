import { Authenticator } from "cognito-at-edge";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { config } from "../../utils/config";

const secretsmanager = new SecretsManagerClient({
  region: config.REGION,
});

const getClientSecret = async (): Promise<string> => {
  const result = await secretsmanager.send(
    new GetSecretValueCommand({
      SecretId: "userpool_client_secret",
    })
  );
  if (!result.SecretString) {
    throw new Error("No value for secret: userpool_client_secret");
  }
  return result.SecretString;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: any) => {
  const userPoolAppSecret = await getClientSecret();
  const authenticator = new Authenticator({
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolAppId: config.USER_POOL_CLIENT_ID,
    userPoolDomain: config.USER_POOL_DOMAIN,
    userPoolAppSecret,
  });
  return authenticator.handle(event);
};
