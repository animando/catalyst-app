import { GetItemOutput } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

type Item = Required<GetItemOutput>["Item"];
export const unmarshallItemWithoutKeys = (item: Item) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { PK, SK, ...rest } = item;
  return unmarshall(rest);
};
