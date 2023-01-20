import { Logger } from "@aws-lambda-powertools/logger";
import { MSKEvent, MSKRecordHeader } from "aws-lambda";
import { Schema } from "jsonschema";
import { addTraceToLogger } from "../../../utils/addTraceToLogger";
import { TRACE_ID_HEADER } from "../../../utils/constants";
import { MessageHeaders, MSKMessageEvent } from "../../types";
import { parseMessageValue } from "../parseMessageValue";

const parseMskHeaders = (headers: MSKRecordHeader[]) =>
  headers
    .flatMap((header) => {
      const entries = Object.entries(header).map(([headerKey, headerValue]) => {
        const parsedHeader = Buffer.from(headerValue).toString();

        return [headerKey, parsedHeader];
      });
      return entries;
    })
    .reduce<MessageHeaders>(
      (acc, [hk, hv]) => ({
        ...acc,
        [hk]: hv,
      }),
      {}
    );

export const parseMskMessages = <T>(
  event: MSKEvent,
  { logger, schema }: { logger: Logger; schema: Schema }
): MSKMessageEvent<T>[] => {
  const { eventSource, eventSourceArn } = event;

  return Object.entries(event.records).flatMap(([_, records]) =>
    records.flatMap((record) => {
      const { value, key, timestamp, ...rest } = record;
      const headers = parseMskHeaders(record.headers);

      addTraceToLogger(logger, headers[TRACE_ID_HEADER]);

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
