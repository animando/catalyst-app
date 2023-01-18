import axios from "axios";
import { environment } from "../utils/environment";

const apiKeyHeader = environment.DISABLE_PRIVATE_APIS
  ? {}
  : {
      "x-api-key": environment.API_KEY,
    };

export const webApi = axios.create({
  baseURL: environment.API_ENDPOINT_BASE,
  headers: {
    ...apiKeyHeader,
  },
});

export const setApiToken = (accessToken: string) => {
  webApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
};
