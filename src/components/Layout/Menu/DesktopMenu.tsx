import { AppBar, Box, List, ListItem, styled, Toolbar } from "@mui/material";

import LogoSmall from "assets/logos/logo-small.svg?react";
import { AppbarPosition } from "models";
import { cx } from "utils/cx";

import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Menu.module.scss";
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
        className={cx(styles.appbar, primaryAppbar && styles.primary)}
        position="fixed"
      >
        <Toolbar className={styles.toolbar}>
          <NavLinks
            items={MAIN_NAV}
            className={styles.navList}
            buttonClassName={styles.navItem}
            activeClassName={styles.selected}
            uppercase
          />
          <Box>
            <List className={styles.langList}>
              <LanguageSwitcher
                buttonClassName={styles.langButton}
                selectedClassName={styles.selected}
              />
              <ListItem>
                <LogoSmall className={styles.logo} />
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
