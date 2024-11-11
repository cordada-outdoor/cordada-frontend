import { ReactNode } from "react";
import CookieConsent from "react-cookie-consent";

import { Box, Typography } from "@mui/material";

import { AppbarPosition } from "models";

import Footer from "./Footer";
import Menu from "./Menu";
interface LayoutProps {
  children: ReactNode;
  appbarPosition?: AppbarPosition;
  primaryAppbar?: boolean;
}

const Layout = ({ children, appbarPosition, primaryAppbar }: LayoutProps) => {
  return (
    <div className="layout">
      <Menu appbarPosition={appbarPosition} primaryAppbar={primaryAppbar} />
      <Box className="content-container">{children}</Box>
      <Footer />
      <CookieConsent>
        <Typography>
          This website uses cookies to enhance the user experience.
        </Typography>
      </CookieConsent>
    </div>
  );
};

export default Layout;
