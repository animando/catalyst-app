import { applyHttpMiddleware } from "../../utils/applyHttpMiddleware";
import { kafka } from "./kafka";
import { topic } from "../consumer1/config";

const helloHandler = async () => {
  const now = new Date().toISOString();
  const { producer } = kafka;
  await producer.connect();
  await producer.send({
    topic,
    messages: [
      {
        key: `${Math.floor(Math.random() * 1000)}`,
        value: `Message ${now}`,
        timestamp: `${now}`,
        headers: {
          header1: "header1",
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
