import { Logger } from "@aws-lambda-powertools/logger";
import { MSKEvent } from "aws-lambda";
import { Validator, Schema } from "jsonschema";
import { MSKMessageEvent } from "../services/types";

const parseMessageValue = <T>(
  value: string,
  { logger, schema }: { logger: Logger; schema: Schema }
):
  | { parsed: true; value: T }
  | { parsed: false; validationMessage?: string; value: unknown } => {
  const base64Decoded = Buffer.from(value, "base64").toString();
  try {
    const parsedValue: T | unknown = JSON.parse(base64Decoded);
    const val = new Validator();
    const validationResult = val.validate(parsedValue, schema);
    if (validationResult.errors.length) {
      logger.warn("Schema validation errors", { validationResult });
      return {
        parsed: false,
        value: parsedValue,
        validationMessage: validationResult.errors
          .map((e) => e.message)
          .join(","),
      };
    }
    return { parsed: true, value: parsedValue as T };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error("Error parsing value", { base64Decoded, value, error });

    return { parsed: false, value };
  }
};

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
        ...parseMessageValue(value, { logger, schema }),
        key: Buffer.from(key, "base64").toString(),
      };
    })
  );
};
