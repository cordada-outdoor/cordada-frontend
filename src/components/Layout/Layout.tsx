import { ReactNode } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { AppbarPosition } from "models";
import { Box } from "@mui/material";

interface LayoutProps {
    children: ReactNode;
    appbarPosition?: AppbarPosition
}
const Layout = ({ children, appbarPosition }: LayoutProps) => {
    return <div className="layout">
        <Menu appbarPosition={appbarPosition} />
        <Box className="content-container">
            {children}
        </Box>
        <Footer />
    </div>
}

export default Layout;