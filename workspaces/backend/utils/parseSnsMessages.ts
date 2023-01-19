import { Logger } from "@aws-lambda-powertools/logger";
import { SNSEvent } from "aws-lambda";
import { Schema } from "jsonschema";
import { SNSMessageEvent } from "../services/types";
import { parseMessageValue } from "./parseMessageValue";

export const parseSnsMessages = <T>(
  event: SNSEvent,
  { logger, schema }: { logger: Logger; schema: Schema }
): SNSMessageEvent<T>[] => {
  const { Records, ...restEvent } = event;

  return Records.map<SNSMessageEvent<T>>((record) => {
    logger.info("Message", { record });

    const value = parseMessageValue<T>(record.Sns.Message, { logger, schema });
    return {
      ...record,
      ...restEvent,
      ...value,
    };
  });
};
