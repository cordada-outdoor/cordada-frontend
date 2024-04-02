import { ReactNode } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { AppbarPosition } from "models";
import { Box } from "@mui/material";

interface LayoutProps {
    children: ReactNode;
    appbarPosition?: AppbarPosition
    primaryAppbar?: boolean
}
const Layout = ({ children, appbarPosition, primaryAppbar }: LayoutProps) => {
    return <div className="layout">
        <Menu appbarPosition={appbarPosition} primaryAppbar={primaryAppbar} />
        <Box className="content-container">
            {children}
        </Box>
        <Footer />
    </div>
}

export default Layout;