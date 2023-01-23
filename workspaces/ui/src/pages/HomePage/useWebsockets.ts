import { useCallback, useEffect, useRef } from "react";
import { environment } from "../../utils/environment";

type WsTopic = "subscribe";
type Headers = Record<string, string | undefined>;

const encodeMessage = (
  topic: WsTopic,
  value: object,
  headers: Headers
): string => {
  const commonHeaders = {
    timestamp: new Date().toISOString(),
  };
  const message = {
    action: topic,
    headers: window.btoa(JSON.stringify({ ...headers, ...commonHeaders })),
    value: window.btoa(JSON.stringify(value)),
  };
  return JSON.stringify(message);
};

export const useWebsockets = () => {
  const sockRef = useRef<WebSocket>();
  const sendMessage = useCallback(
    (topic: WsTopic, value: object, headers: Headers) => {
      if (sockRef.current) {
        const encodedMessage = encodeMessage(topic, value, headers);
        sockRef.current.send(encodedMessage);
      }
    },
    []
  );
  useEffect(() => {
    if (!sockRef.current) {
      const sock = new WebSocket(environment.WS_ENDPOINT_BASE);
      sockRef.current = sock; // server-side
      sock.onopen = () => {
        sendMessage("subscribe", { message: "hello" }, {});
      };

      sock.onmessage = (_event) => {
        sock.close();
      };

      sock.onclose = () => {
        sockRef.current = undefined;
      };
    }
  }, [sendMessage]);
};
