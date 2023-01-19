import { MSKEvent } from "aws-lambda";
import { MSKMessageEvent } from "../services/types";

export const parseMskMessages = <T>(event: MSKEvent): MSKMessageEvent<T>[] => {
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
        value: JSON.parse(Buffer.from(value, "base64").toString()),
        key: Buffer.from(key, "base64").toString(),
      };
    })
  );
};
