import { ReactNode } from "react";
import Menu from "./Menu";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
    return <div className="layout">
        <Menu />
        {children}
        <div style={{ height: '200vh' }} />
        <Footer />
    </div>
}

export default Layout;