import { AppBar, Box, List, ListItem, styled, Toolbar } from "@mui/material";

import LogoSmall from "assets/logos/logo-small.svg?react";
import { AppbarPosition } from "models";

import LanguageSwitcher from "./LanguageSwitcher";
import MenuScroll from "./MenuScroll";
import { MAIN_NAV } from "./navigation";
import NavLinks from "./NavLinks";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

interface DesktopMenuProps {
  appbarPosition: AppbarPosition;
  primaryAppbar: boolean;
}

const DesktopMenu = ({ appbarPosition, primaryAppbar }: DesktopMenuProps) => (
  <>
    <MenuScroll position={appbarPosition}>
      <AppBar
        className={`appbar ${primaryAppbar ? "primary-appbar" : ""}`}
        position="fixed"
      >
        <Toolbar className="toolbar">
          <NavLinks
            items={MAIN_NAV}
            className="navigation-list"
            buttonClassName="navigation-item"
            activeClassName="selected-item-in-menu"
            uppercase
          />
          <Box className="right-menu">
            <List className="lang-list">
              <LanguageSwitcher selectedClassName="selected-item-in-menu" />
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

export default DesktopMenu;
