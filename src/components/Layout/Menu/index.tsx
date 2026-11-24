import { useMediaQuery } from "@mui/material";

import { AppbarPosition } from "models";
import { theme } from "styles/theme";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

interface MenuProps {
  appbarPosition?: AppbarPosition;
  primaryAppbar?: boolean;
}

const Menu = ({
  appbarPosition = "sticky",
  primaryAppbar = false,
}: MenuProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobile ? (
    <MobileMenu />
  ) : (
    <DesktopMenu
      appbarPosition={appbarPosition}
      primaryAppbar={primaryAppbar}
    />
  );
};

export default Menu;
