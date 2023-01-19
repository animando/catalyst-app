import { createLogger } from "@aws-lambda-powertools/logger";
import { serviceName } from "./config";

export const logger = createLogger({ serviceName });
