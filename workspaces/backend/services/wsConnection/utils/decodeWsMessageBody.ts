import { WsEventBody } from "../../types";

export const decodeWsMessageBody = <T>(body: string): WsEventBody<T> => {
  const parsed = JSON.parse(body);
  const { headers: unparsedHeaders, value: unparsedValue } = parsed;
  const headersString = Buffer.from(unparsedHeaders, "base64").toString();
  const valueString = Buffer.from(unparsedValue, "base64").toString();
  const parsedHeaders = JSON.parse(headersString);
  const parsedValue = JSON.parse(valueString);
  return {
    headers: parsedHeaders,
    value: parsedValue,
  };
};
