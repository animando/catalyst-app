import { DynamoDB, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { config } from "./config";
import { unmarshallItemWithoutKeys } from "./dbUtils";

const ddb = new DynamoDB({
  region: config.REGION,
  ...(config.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}),
});

export const getUserItem = async (username: string) => {
  const { Item } = await ddb.send(
    new GetItemCommand({
      TableName: "Catalyst",
      Key: marshall({ PK: `user#${username}`, SK: `user#${username}` }),
    })
  );
  return Item ? unmarshallItemWithoutKeys(Item) : null;
};
