// eslint-disable-next-line no-underscore-dangle,@typescript-eslint/no-explicit-any
const config = (window as any).__config__;

export const environment = {
  API_ENDPOINT_BASE: config.API_ENDPOINT_BASE,
};
