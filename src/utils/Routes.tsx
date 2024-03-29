import Home from "pages/Home"
import { Redirect, Route, Switch } from "react-router-dom"
import useUrlLang from "./useUrlLang";
import About from "pages/About";
import NotFound from "pages/NotFound";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Routes = () => {
    const { langUrlPrefix, path, lang } = useUrlLang();
    const pathPrefix = path.replace(/\/$/, "");
    const { i18n } = useTranslation()

    useEffect(() => {
        if (lang !== i18n.language) {
            i18n.changeLanguage(lang)
        }
    }, [lang])

    return <Switch>
        <Route exact path={path}>
            <Home />
        </Route>
        <Route exact path={`${pathPrefix}/about`}>
            <About />
        </Route>
        <Route path={`${pathPrefix}/about`}>
            <Redirect to={`${langUrlPrefix}/about`} />
        </Route>
        <Route path={'*'}>
            <NotFound />
        </Route>
    </Switch>
}

export default Routes;