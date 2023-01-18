// eslint-disable-next-line no-underscore-dangle,@typescript-eslint/no-explicit-any
const config = (window as any).__config__;

export const environment = {
  API_ENDPOINT_BASE: config.API_ENDPOINT_BASE || "",
  API_KEY: config.API_KEY || "",
  USER_POOL_CLIENT_ID: config.USER_POOL_CLIENT_ID || "",
  APP_HOST: config.APP_HOST || "",
  TOKEN: import.meta.env.VITE_TOKEN,
};
