import Home from "pages/Home"
import { Redirect, Route, Switch } from "react-router-dom"
import useUrlLang from "./useUrlLang";
import About from "pages/About";
import NotFound from "pages/NotFound";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Services from "pages/Services";

const Routes = () => {
    const { langUrlPrefix, path, lang } = useUrlLang();
    const pathPrefix = path.replace(/\/$/, "");
    const { i18n } = useTranslation()

    useEffect(() => {
        if (lang !== i18n.language) {
            i18n.changeLanguage(lang)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Route exact path={`${pathPrefix}/services`}>
            <Services />
        </Route>
        <Route path={`${pathPrefix}/services`}>
            <Redirect to={`${langUrlPrefix}/services`} />
        </Route>
        <Route path={'*'}>
            <NotFound />
        </Route>
    </Switch>
}

export default Routes;