import { Logger } from "@aws-lambda-powertools/logger";
import { MSKEvent } from "aws-lambda";
import { parseMskMessages } from "./parseMskMessages";

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
} as unknown as Logger;

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
        value:
          "eyJtZXNzYWdlIjoiSGVsbG8iLCJub3ciOiIyMDIzLTAxLTE0VDExOjE3OjExLjkzNVoifQ==",
        headers: [
          { header1: [104, 101, 97, 100, 101, 114, 49] },
          { header2: [104, 101, 97, 100, 101, 114, 50] },
        ],
      },
    ],
  },
};
const expectedEvents = [
  {
    eventSource: "aws:kafka",
    eventSourceArn: "arn:aws:kafka:eu-west-2:1234567890:cluster/catalyst/id",
    topic: "consumer1-topic",
    partition: 3,
    offset: 2,
    timestamp: new Date("2023-01-14T09:26:12.120Z"),
    timestampType: "CREATE_TIME",
    key: "808",
    parsed: true,
    value: { message: "Hello", now: "2023-01-14T11:17:11.935Z" },
    headers: { header1: "header1", header2: "header2" },
  },
];
describe("parseMskEvent", () => {
  it("should parse event", () => {
    const parsedEvents = parseMskMessages(testEvent, { logger: mockLogger });
    expect(parsedEvents).toEqual(expectedEvents);
  });
});
