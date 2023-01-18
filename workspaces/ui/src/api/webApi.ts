import axios from "axios";
import { environment } from "../utils/environment";

export const webApi = axios.create({
  baseURL: environment.API_ENDPOINT_BASE,
});

export const setApiToken = (accessToken: string) => {
  webApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
};
