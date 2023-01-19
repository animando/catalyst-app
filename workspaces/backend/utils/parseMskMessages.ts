import { Logger } from "@aws-lambda-powertools/logger";
import { MSKEvent } from "aws-lambda";
import { MSKMessageEvent } from "../services/types";

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

export const parseMskMessages = <T>(
  event: MSKEvent,
  { logger }: { logger: Logger }
): MSKMessageEvent<T>[] => {
  const { eventSource, eventSourceArn } = event;

  return Object.entries(event.records).flatMap(([_, records]) =>
    records.flatMap((record) => {
      const { value, key, timestamp, ...rest } = record;
      const headers = record.headers
        .flatMap((header) => {
          const entries = Object.entries(header).map(
            ([headerKey, headerValue]) => {
              const parsedHeader = new TextDecoder().decode(
                Uint8Array.from(headerValue)
              );

              return [headerKey, parsedHeader];
            }
          );
          return entries;
        })
        .reduce(
          (acc, [hk, hv]) => ({
            ...acc,
            [hk]: hv,
          }),
          {}
        );

      return {
        ...rest,
        eventSource,
        eventSourceArn,
        timestamp: new Date(timestamp),
        headers,
        ...parseMessageValue(value, logger),
        key: Buffer.from(key, "base64").toString(),
      };
    })
  );
};
