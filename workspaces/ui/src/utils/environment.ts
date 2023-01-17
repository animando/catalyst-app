// eslint-disable-next-line no-underscore-dangle,@typescript-eslint/no-explicit-any
const config = (window as any).__config__;

export const environment = {
  API_ENDPOINT_BASE: config.API_ENDPOINT_BASE || "",
  USER_POOL_CLIENT_SECRET: config.USER_POOL_CLIENT_SECRET || "",
  USER_POOL_CLIENT_ID: config.USER_POOL_CLIENT_ID || "",
  USER_POOL_UI_ENDPOINT: config.USER_POOL_UI_ENDPOINT || "",
  APP_HOST: config.APP_HOST || "",
  TOKEN: import.meta.env.VITE_TOKEN,
};
