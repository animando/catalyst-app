import { useCallback, useEffect, useRef } from "react";
import type { WsIncomingAction } from "shared-types/websocket/actions";
import { environment } from "../../utils/environment";

type Headers = Record<string, string | undefined>;

const decodeMessage = (data: string) => {
  if (!data) {
    return {};
  }
  const parsedMessage = JSON.parse(data);
  const { action, headers: headersString, value: valueString } = parsedMessage;
  const headers = JSON.parse(window.atob(headersString));
  const value = JSON.parse(window.atob(valueString));
  return {
    action,
    headers,
    value,
  };
};

const encodeMessage = (
  topic: WsIncomingAction,
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
    (topic: WsIncomingAction, value: object, headers: Headers) => {
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

      sock.onmessage = (event) => {
        console.log(decodeMessage(event.data));
        sock.close();
      };

      sock.onclose = () => {
        sockRef.current = undefined;
      };
    }
  }, [sendMessage]);
};
