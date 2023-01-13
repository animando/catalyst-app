/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: any) => {
  // eslint-disable-next-line no-console
  console.log("got event", event);

  Object.entries(event.records).forEach((record) => {
    console.log("got record", record);
    console.log(JSON.stringify(record));
  });
};
