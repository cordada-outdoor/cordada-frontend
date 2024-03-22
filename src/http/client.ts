import axios from 'axios';
import { config } from 'config';

export const http = axios.create({
  baseURL: config.cms.host,
  headers: {
    Authorization: `Bearer ${config.cms.token}`,
  },
});
