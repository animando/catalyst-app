export const config = {
  REGION: process.env.REGION || "",
  STAGE: process.env.STAGE || "",
  SPA_URL: process.env.SPA_URL || "",
  KAFKA_BOOTSTRAP_SERVER: process.env.KAFKA_BOOTSTRAP_SERVER || "",
  KAFKA_SSL_DISABLED: process.env.KAFKA_SSL_DISABLED || "",
  USER_POOL_ID: process.env.USER_POOL_ID || "",
  USER_POOL_CLIENT_ID: process.env.USER_POOL_CLIENT_ID || "",
  USER_POOL_CLIENT_SECRET_ARN: process.env.USER_POOL_CLIENT_SECRET_ARN || "",
  USER_POOL_DOMAIN: process.env.USER_POOL_DOMAIN || "",
  DISTRIBUTION_ID: process.env.DISTRIBUTION_ID || "",
};
