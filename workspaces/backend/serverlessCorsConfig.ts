/* eslint-disable no-template-curly-in-string */

import { spaConfig } from "./serverlessCommonConfig";

export const corsConfig = {
  origin: spaConfig.SPA_URL,
  headers: ["*"],
  allowCredentials: false,
  cacheControl: "max-age=600, s-maxage=600, proxy-revalidate",
};
