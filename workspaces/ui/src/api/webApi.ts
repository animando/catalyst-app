import axios from "axios";
import { environment } from "../utils/environment";

export const webApi = axios.create({
  baseURL: environment.API_ENDPOINT_BASE,
  headers: {
    "x-api-key": environment.API_KEY,
  },
});

export const setApiToken = (accessToken: string) => {
  webApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
};
