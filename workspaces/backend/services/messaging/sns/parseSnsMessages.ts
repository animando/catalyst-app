import { Logger } from "@aws-lambda-powertools/logger";
import { SNSEvent } from "aws-lambda";
import { Schema } from "jsonschema";
import { addTraceToLogger } from "../../../utils/addTraceToLogger";
import { TRACE_ID_HEADER } from "../../../utils/constants";
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

    addTraceToLogger(logger, headers[TRACE_ID_HEADER]);

    return {
      ...record,
      ...restEvent,
      headers,
      ...parseMessageValue(unparsedValue, { logger, schema }),
    };
  });
};
