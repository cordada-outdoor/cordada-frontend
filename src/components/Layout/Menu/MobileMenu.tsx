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
import { cx } from "utils/cx";
import useUrlLang from "utils/useUrlLang";

import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Menu.module.scss";
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
          className={cx(styles.appbar, styles.mobileAppbar)}
          color="transparent"
          elevation={0}
        >
          <Toolbar className={styles.toolbar}>
            <Link to={`${langUrlPrefix}/`} className={styles.logoLink}>
              <LogoSmall className={styles.logo} />
            </Link>
            <Button
              className={styles.menuButton}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <Typography>{findLangName(i18n.language) + " >"}</Typography>
              <MenuIcon className={styles.menuIcon} />
            </Button>
          </Toolbar>
        </AppBar>
      </MenuScroll>
      <Drawer
        className={styles.drawer}
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <NavLinks
          items={MAIN_NAV}
          itemClassName={styles.drawerNavItem}
          uppercase
        />
        <Box>
          <NavLinks
            items={LEGAL_NAV}
            className={styles.legalNav}
            itemClassName={styles.drawerNavItem}
          />
          <List className={styles.drawerLangList}>
            <LanguageSwitcher selectedClassName={styles.selectedLang} />
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;
