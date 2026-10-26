import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
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

// A project detail page belongs to the projects section
const isActivePage = (navValue: string, urlWithoutLang: string) => {
  if (navValue === "/") return urlWithoutLang === "/" || urlWithoutLang === "";
  if (navValue === "/projects" && urlWithoutLang.startsWith("/project/")) {
    return true;
  }
  return urlWithoutLang.startsWith(navValue);
};

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

  const urlWithoutLang = getUrlWithoutLang(pathname);
  if (isMobile) {
    return (
      <>
        <MenuScroll position="fixed">
          <AppBar
            className={`mobile-appbar appbar`}
            color="transparent"
            elevation={0}
          >
            <Toolbar className="toolbar">
              <Link
                to={langUrlPrefix + "/"}
                className="logo-link"
                aria-label="Cordada Outdoor"
              >
                <LogoSmall className="main-menu-logo" />
              </Link>
              <IconButton
                className="right-mobile-menu"
                aria-label={t("menu")}
                aria-expanded={isDrawerOpen}
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon className="menu-icon" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </MenuScroll>
        <Drawer
          className="menu-drawer"
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box className="drawer-header">
            <Link
              to={langUrlPrefix + "/"}
              className="logo-link"
              aria-label="Cordada Outdoor"
            >
              <LogoSmall className="drawer-logo" />
            </Link>
            <IconButton
              aria-label={t("close")}
              onClick={() => setIsDrawerOpen(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </IconButton>
          </Box>
          <List className="main-navigation">
            {navigationOptions.map((aN) => (
              <ListItem key={aN.value} className="navigation-item">
                <ListItemButton
                  component={Link}
                  to={langUrlPrefix + aN.value}
                  className={
                    isActivePage(aN.value, urlWithoutLang) ? "active-page" : ""
                  }
                  aria-current={
                    isActivePage(aN.value, urlWithoutLang) ? "page" : undefined
                  }
                >
                  <ListItemText
                    primary={
                      <Typography fontWeight={700}>{t(aN.label)}</Typography>
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
                  component={Link}
                  to={`${langUrlPrefix}/legal-notice`}
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
                  component={Link}
                  to={`${langUrlPrefix}/privacy-policy`}
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
                    className={isSelected ? "primary-color-button" : ""}
                    key={aL}
                  >
                    <ListItemButton
                      component={Link}
                      to={`/${aL + urlWithoutLang}`}
                      lang={aL}
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
            <Link
              to={langUrlPrefix + "/"}
              className="logo-link"
              aria-label="Cordada Outdoor"
            >
              <LogoSmall className="main-menu-logo" />
            </Link>
            <List className="navigation-list">
              {navigationOptions.map((aN) => {
                const isSelected = isActivePage(aN.value, urlWithoutLang);
                return (
                  <ListItem key={aN.value}>
                    <ListItemButton
                      className={`navigation-item ${isSelected ? "active-page" : ""}`}
                      aria-current={isSelected ? "page" : undefined}
                      component={Link}
                      to={langUrlPrefix + aN.value}
                    >
                      <ListItemText
                        primary={
                          <Typography fontWeight={700}>
                            {t(aN.label)}
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
                        component={Link}
                        to={`/${aL + urlWithoutLang}`}
                        lang={aL}
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
