import { Logger } from "@aws-lambda-powertools/logger";
import { SNSEvent } from "aws-lambda";
import { parseSnsMessages } from "./parseSnsMessages";
import SnsTopic1Payload from "../json-schemas/SnsTopic1Payload.json";

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
} as unknown as Logger;

const createTestEvent = (Message: string): SNSEvent => ({
  Records: [
    {
      EventVersion: "1.0",
      EventSubscriptionArn: "EXAMPLE",
      EventSource: "aws:sns",
      Sns: {
        SignatureVersion: "1",
        Timestamp: "2023-01-19T14:19:07.159Z",
        Signature: "EXAMPLE",
        SigningCertUrl: "EXAMPLE",
        MessageId: "6ef29329-dcc9-419f-b98c-c2b14f06ee8d",
        Message,
        MessageAttributes: {},
        Type: "Notification",
        UnsubscribeUrl: "EXAMPLE",
        TopicArn: "arn:aws:sns:eu-west-2:1234567890:topic1",
        Subject: "",
      },
    },
  ],
});
const createExpectedEvent = (Message: string) => ({
  EventVersion: "1.0",
  EventSubscriptionArn: "EXAMPLE",
  EventSource: "aws:sns",
  parsed: true,
  value: { snsMessage: "hello" },
  Sns: {
    SignatureVersion: "1",
    Timestamp: "2023-01-19T14:19:07.159Z",
    Signature: "EXAMPLE",
    SigningCertUrl: "EXAMPLE",
    MessageId: "6ef29329-dcc9-419f-b98c-c2b14f06ee8d",
    Message,
    MessageAttributes: {},
    Type: "Notification",
    UnsubscribeUrl: "EXAMPLE",
    TopicArn: "arn:aws:sns:eu-west-2:1234567890:topic1",
    Subject: "",
  },
});

describe("parseSnsMessages", () => {
  it("should parse and enrich sns event", () => {
    const validMessage = "eyJzbnNNZXNzYWdlIjoiaGVsbG8ifQ==";
    const parsedEvents = parseSnsMessages(createTestEvent(validMessage), {
      logger: mockLogger,
      schema: SnsTopic1Payload,
    });
    expect(parsedEvents).toEqual([createExpectedEvent(validMessage)]);
  });

  it("should fail to validate event", () => {
    const invalidMessage = "eyJzbnNtZXNzYWdlIjoiaGVsbG8ifQ==";
    const parsedEvents = parseSnsMessages(createTestEvent(invalidMessage), {
      logger: mockLogger,
      schema: SnsTopic1Payload,
    });

    expect(parsedEvents).toEqual([
      {
        ...createExpectedEvent(invalidMessage),
        value: { snsmessage: "hello" },
        validationMessage: 'requires property "snsMessage"',
        parsed: false,
      },
    ]);
  });

  it("should fail to parse event", () => {
    const unparseable = "Unparseable";
    const parsedEvents = parseSnsMessages(createTestEvent(unparseable), {
      logger: mockLogger,
      schema: SnsTopic1Payload,
    });

    expect(parsedEvents).toEqual([
      {
        ...createExpectedEvent(unparseable),
        value: unparseable,
        parsed: false,
      },
    ]);
  });
});
