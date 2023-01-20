import { Logger } from "@aws-lambda-powertools/logger";
import { SNSEvent } from "aws-lambda";
import { parseSnsMessages } from "./parseSnsMessages";
import SnsTopic1Payload from "../../../json-schemas/SnsTopic1Payload.json";

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
} as unknown as Logger;

const headers = { header1: "headerValue" };

const createMessage = (value: object) => {
  const valueString = Buffer.from(JSON.stringify(value)).toString("base64");

  const payload = {
    value: valueString,
    headers,
  };

  return Buffer.from(JSON.stringify(payload)).toString("base64");
};

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
const createExpectedEvent = (Message: string, value: object | string) => ({
  EventVersion: "1.0",
  EventSubscriptionArn: "EXAMPLE",
  EventSource: "aws:sns",
  parsed: true,
  value,
  headers,
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
    const value = { snsMessage: "hello" };
    const message = createMessage(value);
    const parsedEvents = parseSnsMessages(createTestEvent(message), {
      logger: mockLogger,
      schema: SnsTopic1Payload,
    });
    expect(parsedEvents).toEqual([createExpectedEvent(message, value)]);
  });

  it("should fail to validate event", () => {
    const value = { invalidKey: "message" };
    const invalidMessage = createMessage(value);
    const parsedEvents = parseSnsMessages(createTestEvent(invalidMessage), {
      logger: mockLogger,
      schema: SnsTopic1Payload,
    });

    expect(parsedEvents).toEqual([
      {
        ...createExpectedEvent(invalidMessage, value),
        validationMessage: 'requires property "snsMessage"',
        parsed: false,
      },
    ]);
  });

  it("should fail to parse event", () => {
    const unparseable = Buffer.from(
      JSON.stringify({ value: "Unparseable", headers })
    ).toString("base64");
    const parsedEvents = parseSnsMessages(createTestEvent(unparseable), {
      logger: mockLogger,
      schema: SnsTopic1Payload,
    });

    expect(parsedEvents).toEqual([
      {
        ...createExpectedEvent(unparseable, "Unparseable"),
        parsed: false,
      },
    ]);
  });
});
