import type { MSKEvent } from "aws-lambda";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

// type MessageHeader = any;
// interface MessageRecord {
//   topic: string;
//   partition: number;
//   offset: number;
//   timestamp: number;
//   timestampType: "CREATE_TIME";
//   key: string;
//   value: string;
//   headers: MessageHeader[];
// }
// type TopicMessageRecords = Record<string, MessageRecord[]>;
// interface MskEvent {
//   records: TopicMessageRecords;
// }
export const handler = async (event: MSKEvent) => {
  // eslint-disable-next-line no-console
  console.log("got event", event);

  Object.entries(event.records).forEach(([topic, records]) => {
    console.log("got topic", topic);
    records.forEach((record) => {
      console.log("got record", record);
      record.headers.forEach((header) => {
        console.log("got header", header);
      });
    });
  });
};
