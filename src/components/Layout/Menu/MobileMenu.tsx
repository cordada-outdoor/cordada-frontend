import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";

import LogoSmall from "assets/logos/logo-small.svg?react";
import MenuIcon from "assets/logos/menu-icon.svg?react";
import { findLangName } from "utils";
import useUrlLang from "utils/useUrlLang";

import LanguageSwitcher from "./LanguageSwitcher";
import MenuScroll from "./MenuScroll";
import { LEGAL_NAV, MAIN_NAV } from "./navigation";
import NavLinks from "./NavLinks";

const MobileMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { i18n } = useTranslation();
  const { langUrlPrefix } = useUrlLang();

  return (
    <>
      <MenuScroll position="fixed">
        <AppBar
          className="mobile-appbar appbar"
          color="transparent"
          elevation={0}
        >
          <Toolbar className="toolbar">
            <Link to={`${langUrlPrefix}/`} className="logo-link">
              <LogoSmall className="main-menu-logo" />
            </Link>
            <Button
              className="right-mobile-menu"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <Typography>{findLangName(i18n.language) + " >"}</Typography>
              <MenuIcon className="menu-icon" />
            </Button>
          </Toolbar>
        </AppBar>
      </MenuScroll>
      <Drawer
        className="menu-drawer"
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <NavLinks items={MAIN_NAV} itemClassName="navigation-item" uppercase />
        <Box>
          <NavLinks
            items={LEGAL_NAV}
            className="bottom-menu-navigation"
            itemClassName="navigation-item"
          />
          <List className="lang-list">
            <LanguageSwitcher selectedClassName="primary-color-button" />
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;
