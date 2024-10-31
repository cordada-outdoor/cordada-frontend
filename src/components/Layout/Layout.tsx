import { ReactNode } from "react";

import { Box } from "@mui/material";

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
    </div>
  );
};

export default Layout;
