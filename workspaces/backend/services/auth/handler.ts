import { Authenticator } from "cognito-at-edge";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const region = "eu-west-2";

const secretsmanager = new SecretsManagerClient({
  region,
});

const ssm = new SSMClient({
  region,
});

const getSecret = async (secretId: string): Promise<string> => {
  const result = await secretsmanager.send(
    new GetSecretValueCommand({
      SecretId: secretId,
    })
  );
  if (!result.SecretString) {
    throw new Error(`No value for secret: ${secretId}`);
  }
  return result.SecretString;
};

const getSsmParameter = async (name: string): Promise<string> => {
  const result = await ssm.send(
    new GetParameterCommand({
      Name: name,
    })
  );
  if (!result.Parameter?.Value) {
    throw new Error(`No value for parameter: ${name}`);
  }
  return result.Parameter.Value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: any) => {
  const userPoolAppSecret = await getSecret("cognito_userpool_client_secret");
  const userPoolId = await getSsmParameter("user-pool-id");
  const userPoolAppId = await getSsmParameter("user-pool-client-id");
  const userPoolDomain = await getSsmParameter("user-pool-domain");

  const authenticator = new Authenticator({
    region,
    userPoolId,
    userPoolAppId,
    userPoolDomain: `${userPoolDomain}.auth.${region}.amazoncognito.com`,
    userPoolAppSecret,
  });

  return authenticator.handle(event);
};
