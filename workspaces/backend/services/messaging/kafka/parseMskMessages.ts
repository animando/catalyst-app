import { Logger } from "@aws-lambda-powertools/logger";
import { MSKEvent } from "aws-lambda";
import { Schema } from "jsonschema";
import { MessageHeaders, MSKMessageEvent } from "../../types";
import { parseMessageValue } from "../parseMessageValue";

export const parseMskMessages = <T>(
  event: MSKEvent,
  { logger, schema }: { logger: Logger; schema: Schema }
): MSKMessageEvent<T>[] => {
  const { eventSource, eventSourceArn } = event;

  return Object.entries(event.records).flatMap(([_, records]) =>
    records.flatMap((record) => {
      const { value, key, timestamp, ...rest } = record;
      const headers = record.headers
        .flatMap((header) => {
          const entries = Object.entries(header).map(
            ([headerKey, headerValue]) => {
              const parsedHeader = Buffer.from(headerValue).toString();

              return [headerKey, parsedHeader];
            }
          );
          return entries;
        })
        .reduce<MessageHeaders>(
          (acc, [hk, hv]) => ({
            ...acc,
            [hk]: hv,
          }),
          {}
        );

      if (headers.catalystTraceId) {
        logger.appendKeys({ catalystTraceId: headers.catalystTraceId });
      }

      return {
        ...rest,
        eventSource,
        eventSourceArn,
        timestamp: new Date(timestamp),
        headers,
        ...parseMessageValue(value, { logger, schema }),
        key: Buffer.from(key, "base64").toString(),
      };
    })
  );
};
