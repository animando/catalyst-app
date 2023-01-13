/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export const handler = async (event: any) => {
  // eslint-disable-next-line no-console
  console.log("got event", event);

  //   const event = {
  //     eventSource: "aws:kafka",
  //     eventSourceArn:
  //       "arn:aws:kafka:eu-west-2:XXXXX:cluster/catalyst/UUID",
  //     bootstrapServers: CONNECT_STRING,
  //     records: { "TOPIC-PARTITION": [] },
  //   };
  //   const recordsArrayItem = {
  //     topic: "TOPIC",
  //     partition: 3,
  //     offset: 0,
  //     timestamp: 1673632348195,
  //     timestampType: "CREATE_TIME",
  //     key: "NjI0",
  //     value: "TWVzc2FnZSAyMDIzLTAxLTEzVDE3OjUyOjI3LjkwOVo=",
  //     headers: [],
  //   };
  Object.entries(event.records).forEach((record: any) => {
    console.log("got record", record);
    console.log(JSON.stringify(record));
    record.headers.forEach((header: any) => {
      console.log("got header", header);
    });
  });
};
