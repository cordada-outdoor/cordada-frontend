import { DEFAULT_LANG, SUPPORTED_LANGS } from "./constants";
import { useRouteMatch } from 'react-router-dom';

const useUrlLang = () => {
    // INFO: if `langMatch = null`, there was no match, meaning we're on a default-language route.
    const langMatch = useRouteMatch(`/:lang(${SUPPORTED_LANGS.join("|")})`);

    const lang = langMatch?.params.lang ?? DEFAULT_LANG;
    const langUrlPrefix = lang === DEFAULT_LANG ? "" : `/${lang}`;
    const path = langMatch?.path ?? "/";

    return { lang, langUrlPrefix, path };
};

export default useUrlLang;