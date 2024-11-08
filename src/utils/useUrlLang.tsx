import { useRouteMatch } from "react-router-dom";

import { DEFAULT_LANG, SUPPORTED_LANGS } from "./constants";

const useUrlLang = () => {
  const langMatch = useRouteMatch<any>(`/:lang(${SUPPORTED_LANGS.join("|")})`);

  const lang = langMatch?.params.lang ?? DEFAULT_LANG;
  const langUrlPrefix = lang === DEFAULT_LANG ? "" : `/${lang}`;
  const path = langMatch?.path ?? "/";

  return { lang, langUrlPrefix, path };
};

export default useUrlLang;
