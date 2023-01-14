import { MSKEvent } from "aws-lambda";

export const parseMskEvent = (event: MSKEvent) => {
  const parsedEvents = Object.entries(event.records).map(([_, records]) => {
    const parsedRecords = records.flatMap((record) => {
      const { value, key, ...rest } = record;
      const headers = record.headers.map((header) => {
        const entries = Object.entries(header).flatMap(
          ([headerKey, headerValue]) => {
            console.log(headerKey, headerValue);
            const parsedHeader = new TextDecoder().decode(
              Uint32Array.from(headerValue)
            );
            return [headerKey, parsedHeader];
          }
        );
        //   .reduce((acc, v) => {
        //     console.log(v);
        //     return {
        //       ...acc,
        //     };
        //   }, {});
        return entries;
      });
      return {
        ...rest,
        headers,
        value: Buffer.from(value, "base64").toString(),
        key: Buffer.from(key, "base64").toString(),
      };
    });
    return parsedRecords;
  });
  return parsedEvents;
};
