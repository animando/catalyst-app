import { Logger } from "@aws-lambda-powertools/logger";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { TRACE_ID_HEADER } from "../../../utils/constants";
import { getLoggerTraceId } from "../../../utils/loggerTracing";
import { MessageHeaders } from "../../types";

export const publishSnsMessage = async (
  message: { topic: string; headers?: MessageHeaders },
  value: object,
  config: { client: SNSClient; logger: Logger }
) => {
  const { topic, headers } = message;
  const timestamp = Date.now();
  const { client, logger } = config;

  const traceId = getLoggerTraceId(logger);

  const headersToSend = {
    ...headers,
    timestamp,
    [TRACE_ID_HEADER]: traceId,
  };

  const MessageContent = {
    headers: headersToSend,
    value: Buffer.from(JSON.stringify(value)).toString("base64"),
  };

  const Message = Buffer.from(JSON.stringify(MessageContent)).toString(
    "base64"
  );

  await client.send(
    new PublishCommand({
      TopicArn: topic,
      Message,
    })
  );
};
