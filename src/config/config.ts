import { string } from './helpers';

const PREFIX = `REACT_APP_`;

const withPrefix = (key: string) => `${PREFIX}${key}`;

export const cms = {
  host: string(withPrefix('CMS_HOST')),
  token: string(withPrefix('CMS_TOKEN')),
};