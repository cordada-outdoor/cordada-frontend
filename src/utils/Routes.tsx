import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route, Switch } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import About from "pages/About";
import Home from "pages/Home";
import LegalNotice from "pages/LegalNotice";
import NotFound from "pages/NotFound";
import PrivacyPolicy from "pages/PrivacyPolicy";
import Projects from "pages/Projects";
import Services from "pages/Services";
import SingleProject from "pages/SingleProject";

import useUrlLang from "./useUrlLang";

const Routes = () => {
  const { langUrlPrefix, path, lang } = useUrlLang();
  const pathPrefix = path.replace(/\/$/, "");
  const { i18n } = useTranslation();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }

    localStorage.setItem("locale", lang);

    queryClient.invalidateQueries();
  }, [i18n, lang, queryClient]);

  return (
    <Switch>
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
      <Route exact path={`${pathPrefix}/project/:id`}>
        <SingleProject />
      </Route>
      <Route exact path={`${pathPrefix}/projects`}>
        <Projects />
      </Route>
      <Route exact path={`${pathPrefix}/legal-notice`}>
        <LegalNotice />
      </Route>
      <Route exact path={`${pathPrefix}/privacy-policy`}>
        <PrivacyPolicy />
      </Route>
      <Route path={`${pathPrefix}/projects`}>
        <Redirect to={`${langUrlPrefix}/projects`} />
      </Route>
      <Route path={`${pathPrefix}/legal-notice`}>
        <Redirect to={`${langUrlPrefix}/legal-notice`} />
      </Route>
      <Route path={`${pathPrefix}/privacy-policy`}>
        <Redirect to={`${langUrlPrefix}/privacy-policy`} />
      </Route>
      <Route path={"*"}>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
