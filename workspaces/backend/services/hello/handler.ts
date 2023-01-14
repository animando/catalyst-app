import { applyHttpMiddleware } from "../../utils/applyHttpMiddleware";
import { topics } from "../topics";
import { kafka } from "./kafka";

const helloHandler = async () => {
  const now = new Date().toISOString();
  const { producer } = kafka;
  await producer.connect();
  await producer.send({
    topic: topics.Consumer1Topic,
    messages: [
      {
        key: `${Math.floor(Math.random() * 1000)}`,
        value: `Message ${now}`,
        timestamp: `${Date.now()}`,
        headers: {
          header1: "header1",
          header2: "header2",
        },
      },
    ],
  });
  await producer.disconnect();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Go Serverless v3.0! Your function executed successfully!: ${now}`,
      },
      null,
      2
    ),
  };
};

export const hello = applyHttpMiddleware(helloHandler);
