import { Logger } from "@aws-lambda-powertools/logger";
import { SNSEvent } from "aws-lambda";
import { SNSMessageEvent } from "../services/types";

const parseMessageValue = <T>(
  value: string,
  logger: Logger
): { parsed: true; value: T } | { parsed: false; value: unknown } => {
  const base64Decoded = Buffer.from(value, "base64").toString();
  try {
    return { parsed: true, value: JSON.parse(base64Decoded) as T };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error("Error parsing value", { base64Decoded, value, error });

    return { parsed: false, value: base64Decoded };
  }
};

export const parseSnsMessages = <T>(
  event: SNSEvent,
  { logger }: { logger: Logger }
): SNSMessageEvent<T>[] => {
  const { Records, ...restEvent } = event;

  return Records.map<SNSMessageEvent<T>>((record) => {
    logger.info("Message", { record });

    const value = parseMessageValue<T>(record.Sns.Message, logger);
    return {
      ...record,
      ...restEvent,
      ...value,
    };
  });
};
