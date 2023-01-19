import { Logger } from "@aws-lambda-powertools/logger";
import { MSKEvent } from "aws-lambda";
import { parseMskMessages } from "./parseMskMessages";

const schema = {
  type: "object",
  required: ["message", "now"],
  properties: {
    message: {
      type: "string",
    },
    now: {
      type: "string",
    },
  },
};

const validValue = {
  message: "message",
  now: "2023-01-19T19:53:58.590Z",
};

const encodeValue = (value: any) =>
  Buffer.from(JSON.stringify(value)).toString("base64");

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
} as unknown as Logger;

const createTestEvent = (value: string): MSKEvent => ({
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
        value,
        headers: [
          { header1: [104, 101, 97, 100, 101, 114, 49] },
          { header2: [104, 101, 97, 100, 101, 114, 50] },
        ],
      },
    ],
  },
});
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
    value: validValue,
    headers: { header1: "header1", header2: "header2" },
  },
];

describe("parseMskEvent", () => {
  it("should parse event", () => {
    const parsedEvents = parseMskMessages(
      createTestEvent(encodeValue(validValue)),
      {
        logger: mockLogger,
        schema,
      }
    );
    expect(parsedEvents).toEqual(expectedEvents);
  });

  it("should fail event that does not match schema", () => {
    const invalidValue = { message: "message" };
    const parsedEvents = parseMskMessages(
      createTestEvent(encodeValue(invalidValue)),
      {
        logger: mockLogger,
        schema,
      }
    );
    expect(parsedEvents).toEqual([
      {
        ...expectedEvents[0],
        value: invalidValue,
        validationMessage: 'requires property "now"',
        parsed: false,
      },
    ]);
  });

  it("should fail event that does not decode", () => {
    const invalidValue = "Unencoded value";
    const parsedEvents = parseMskMessages(createTestEvent(invalidValue), {
      logger: mockLogger,
      schema,
    });
    expect(parsedEvents).toEqual([
      {
        ...expectedEvents[0],
        value: invalidValue,
        parsed: false,
      },
    ]);
  });
});
