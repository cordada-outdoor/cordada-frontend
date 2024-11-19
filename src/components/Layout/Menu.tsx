import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";

import { ReactComponent as LogoSmall } from "assets/logos/logo-small.svg";
import { ReactComponent as MenuIcon } from "assets/logos/menu-icon.svg";
import { AppbarPosition } from "models";
import { findLangName, getUrlWithoutLang } from "utils";
import { SUPPORTED_LANGS } from "utils/constants";
import { theme } from "utils/theme";
import useUrlLang from "utils/useUrlLang";

interface MenuScrollProps {
  children: ReactElement;
  position?: AppbarPosition;
}

const MenuScroll = ({ children, position }: MenuScrollProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    color: trigger || position !== "fixed" ? "primary" : "transparent",
    elevation: trigger ? 4 : 0,
  });
};
const navigationOptions = [
  { label: "home", value: "/" },
  { label: "projects", value: "/projects" },
  { label: "services", value: "/services" },
  { label: "us", value: "/about" },
];

interface MenuProps {
  appbarPosition?: AppbarPosition;
  primaryAppbar?: boolean;
}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Menu = ({
  appbarPosition = "sticky",
  primaryAppbar = false,
}: MenuProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { langUrlPrefix } = useUrlLang();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const urlWithoutLang = getUrlWithoutLang(pathname);
  if (isMobile) {
    const languageName = findLangName(i18n.language);
    return (
      <>
        <MenuScroll position="fixed">
          <AppBar
            className={`mobile-appbar appbar`}
            color="transparent"
            elevation={0}
          >
            <Toolbar className="toolbar">
              <LogoSmall
                onClick={() => history.push(`${langUrlPrefix + "/"}`)}
                className="main-menu-logo"
              />
              <Button
                className="right-mobile-menu"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                <Typography>{languageName + " >"}</Typography>
                <MenuIcon className="menu-icon" />
              </Button>
            </Toolbar>
          </AppBar>
        </MenuScroll>
        <Drawer
          className="menu-drawer"
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <List>
            {navigationOptions.map((aN) => (
              <ListItem key={aN.value} className="navigation-item">
                <ListItemButton
                  onClick={() => history.push(`${langUrlPrefix + aN.value}`)}
                >
                  <ListItemText
                    primary={
                      <Typography fontWeight={700}>
                        {t(aN.label).toUpperCase()}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box>
            <List className="bottom-menu-navigation">
              <ListItem className="navigation-item">
                <ListItemButton
                  onClick={() => history.push(`${langUrlPrefix}/legal-notice`)}
                >
                  <ListItemText
                    primary={
                      <Typography fontWeight={700}>
                        {t("legalNotice")}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem className="navigation-item">
                <ListItemButton
                  onClick={() =>
                    history.push(`${langUrlPrefix}/privacy-policy`)
                  }
                >
                  <ListItemText
                    primary={
                      <Typography fontWeight={700}>
                        {t("privacyPolicy")}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <List className="lang-list">
              {SUPPORTED_LANGS.map((aL) => {
                const langName = findLangName(aL);
                const isSelected =
                  i18n.language.toUpperCase() === aL.toUpperCase();
                return (
                  <ListItem
                    onClick={() => history.push(`/${aL + urlWithoutLang}`)}
                    className={isSelected ? "primary-color-button" : ""}
                    key={aL}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={
                          <Typography fontWeight={700}>{langName}</Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      </>
    );
  }
  return (
    <>
      <MenuScroll position={appbarPosition}>
        <AppBar
          className={`appbar ${primaryAppbar ? "primary-appbar" : ""}`}
          position="fixed"
        >
          <Toolbar className="toolbar">
            <List className="navigation-list">
              {navigationOptions.map((aN) => {
                const isSelected =
                  window.location.pathname.includes(aN.value) &&
                  aN.value !== "/";
                return (
                  <ListItem key={aN.value}>
                    <ListItemButton
                      className={`navigation-item ${isSelected ? "selected-item-in-menu" : ""}`}
                      onClick={() =>
                        history.push(`${langUrlPrefix + aN.value}`)
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography fontWeight={700}>
                            {t(aN.label).toUpperCase()}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Box className="right-menu">
              <List className="lang-list">
                {SUPPORTED_LANGS.map((aL) => {
                  const langName = findLangName(aL);

                  const isSelected =
                    i18n.language.toUpperCase() === aL.toUpperCase();

                  return (
                    <ListItem key={aL}>
                      <ListItemButton
                        className={
                          isSelected
                            ? "selected-item-in-menu language-button"
                            : "language-button"
                        }
                        onClick={() => history.push(`/${aL + urlWithoutLang}`)}
                      >
                        <ListItemText
                          primary={
                            <Typography fontWeight={700}>{langName}</Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
                <ListItem>
                  <LogoSmall className="main-menu-logo" />
                </ListItem>
              </List>
            </Box>
          </Toolbar>
        </AppBar>
      </MenuScroll>
      {appbarPosition !== "fixed" && <Offset />}
    </>
  );
};

export default Menu;
