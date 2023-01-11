import { MskEvent } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: MskEvent) => {
  // eslint-disable-next-line no-console
  console.log("got event", event);
};
