import type { WsOutgoingAction } from "shared-types/websocket/actions";
import { MessageHeaders } from "../../types";

export const encodeWsMessageBody = (
  action: WsOutgoingAction,
  headers: MessageHeaders,
  value: object
): string => {
  const headersString = Buffer.from(JSON.stringify(headers)).toString("base64");
  const valueString = Buffer.from(JSON.stringify(value)).toString("base64");
  const message = {
    action,
    headers: headersString,
    value: valueString,
  };
  return JSON.stringify(message);
};
