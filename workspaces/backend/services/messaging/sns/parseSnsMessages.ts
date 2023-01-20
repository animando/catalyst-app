import { Logger } from "@aws-lambda-powertools/logger";
import { SNSEvent } from "aws-lambda";
import { Schema } from "jsonschema";
import { SNSMessageEvent } from "../../types";
import { parseMessageValue } from "../parseMessageValue";

export const parseSnsMessages = <T>(
  event: SNSEvent,
  { logger, schema }: { logger: Logger; schema: Schema }
): SNSMessageEvent<T>[] => {
  const { Records, ...restEvent } = event;

  return Records.map<SNSMessageEvent<T>>((record) => {
    const parsedMessage = JSON.parse(
      Buffer.from(record.Sns.Message, "base64").toString()
    );
    const { value: unparsedValue, headers = {} } = parsedMessage;

    if (headers.catalystTraceId) {
      logger.appendKeys({ catalystTraceId: headers.catalystTraceId });
    }
    return {
      ...record,
      ...restEvent,
      headers,
      ...parseMessageValue(unparsedValue, { logger, schema }),
    };
  });
};
