import { Logger } from "@aws-lambda-powertools/logger";
import { SNSEvent } from "aws-lambda";
import { parseSnsMessages } from "./parseSnsMessages";

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
} as unknown as Logger;

const testEvent: SNSEvent = {
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
        Message: "eyJtZXNzYWdlIjoiaGVsbG8ifQ==",
        MessageAttributes: {},
        Type: "Notification",
        UnsubscribeUrl: "EXAMPLE",
        TopicArn: "arn:aws:sns:eu-west-2:1234567890:topic1",
        Subject: "",
      },
    },
  ],
};
const expectedEvents = [
  {
    EventVersion: "1.0",
    EventSubscriptionArn: "EXAMPLE",
    EventSource: "aws:sns",
    parsed: true,
    value: { message: "hello" },
    Sns: {
      SignatureVersion: "1",
      Timestamp: "2023-01-19T14:19:07.159Z",
      Signature: "EXAMPLE",
      SigningCertUrl: "EXAMPLE",
      MessageId: "6ef29329-dcc9-419f-b98c-c2b14f06ee8d",
      Message: "eyJtZXNzYWdlIjoiaGVsbG8ifQ==",
      MessageAttributes: {},
      Type: "Notification",
      UnsubscribeUrl: "EXAMPLE",
      TopicArn: "arn:aws:sns:eu-west-2:1234567890:topic1",
      Subject: "",
    },
  },
];
describe("parseSnsMessages", () => {
  it("should parse and enrich sns event", () => {
    const parsedEvents = parseSnsMessages(testEvent, { logger: mockLogger });
    expect(parsedEvents).toEqual(expectedEvents);
  });
});
