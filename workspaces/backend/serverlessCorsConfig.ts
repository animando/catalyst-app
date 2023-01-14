import { spaServerlessConfig } from "./serverlessCommonConfig";

export const corsConfig = {
  origin: spaServerlessConfig.SPA_URL,
  headers: ["*"],
  allowCredentials: false,
  cacheControl: "max-age=600, s-maxage=600, proxy-revalidate",
};
