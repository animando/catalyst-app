import { Logger } from "@aws-lambda-powertools/logger";
import { Validator, Schema } from "jsonschema";

export const parseMessageValue = <T>(
  value: string,
  { logger, schema }: { logger: Logger; schema: Schema }
):
  | { parsed: true; value: T }
  | { parsed: false; validationMessage?: string; value: unknown } => {
  const base64Decoded = Buffer.from(value, "base64").toString();
  try {
    const parsedValue: T | unknown = JSON.parse(base64Decoded);
    const val = new Validator();
    const validationResult = val.validate(parsedValue, schema);
    if (validationResult.errors.length) {
      logger.warn("Schema validation errors", { validationResult });
      return {
        parsed: false,
        value: parsedValue,
        validationMessage: validationResult.errors
          .map((e) => e.message)
          .join(","),
      };
    }
    return { parsed: true, value: parsedValue as T };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error("Error parsing value", { base64Decoded, value, error });

    return { parsed: false, value };
  }
};
