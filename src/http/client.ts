import axios from "axios";
import { config } from "config";
import { DEFAULT_LANG } from "utils/constants";

export const http = axios.create({
  baseURL: config.cms.host,
  headers: {
    Authorization: `Bearer ${config.cms.token}`,
  },
});

http.interceptors.request.use((options) => {
  options.params = {
    ...options.params,
    locale: localStorage.getItem("locale") || DEFAULT_LANG,
  };

  return options;
});
