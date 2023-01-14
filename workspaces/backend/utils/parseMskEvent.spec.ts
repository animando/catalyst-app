import { MSKEvent } from "aws-lambda";
import { parseMskEvent } from "./parseMskEvent";

const testEvent: MSKEvent = {
  eventSource: "aws:kafka",
  eventSourceArn: "arn:aws:kafka:eu-west-2:1234567890:cluster/catalyst/id",
  records: {
    "consumer1-topic-3": [
      {
        topic: "consumer1-topic",
        partition: 3,
        offset: 2,
        timestamp: 1673688372120,
        timestampType: "CREATE_TIME",
        key: "ODA4",
        value: "TWVzc2FnZSAyMDIzLTAxLTE0VDA5OjI2OjExLjg3Mlo=",
        headers: [{ header1: [104, 101, 97, 100, 101, 114, 49] }],
      },
    ],
  },
};
const parsedEvents = [
  {
    topic: "consumer1-topic",
    partition: 3,
    offset: 2,
    timestamp: 1673688372120,
    timestampType: "CREATE_TIME",
    key: "808",
    value: "Message 2023-01-14T09:26:11.872Z",
    headers: [{ header1: "header1" }],
  },
];
describe("parseMskEvent", () => {
  it("should parse event", () => {
    expect(parseMskEvent(testEvent)).toEqual(parsedEvents);
  });
});
