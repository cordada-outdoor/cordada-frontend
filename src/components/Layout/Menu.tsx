import { AppBar, Box, List, ListItem, ListItemButton, ListItemText, Toolbar, useScrollTrigger } from "@mui/material"
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface MenuProps {
    children: ReactElement
}

const MenuScroll = ({ children }: MenuProps) => {
    const trigger = useScrollTrigger({
        disableHysteresis: false,
        threshold: 0,
    });
    return React.cloneElement(children, {
        color: trigger ? 'primary' : 'transparent',
        elevation: trigger ? 4 : 0
    });
}
const supportedLngs = ['ca', 'es', 'en']
const navigationOptions = [{ label: 'whatIsCordada', value: '/' }, { label: 'aboutUs', value: '/about' }]


const Menu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return <MenuScroll>
        <AppBar className="appbar" position="fixed">
            <Toolbar className="toolbar">
                <List className="horizontal-list navigation-list">
                    {navigationOptions.map(aN => (
                        <ListItem key={aN.value} className="navigation-item">
                            <ListItemButton onClick={() => navigate(aN.value)}>
                                <ListItemText primary={t(aN.label).toUpperCase()} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                </List>
                <Box className="right-menu">
                    <List className="horizontal-list lang-list">
                        {
                            supportedLngs.map(aL =>
                                <ListItem key={aL}>
                                    <ListItemButton>
                                        <ListItemText primary={aL.toUpperCase()} />
                                    </ListItemButton>
                                </ListItem>)
                        }
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    </MenuScroll>
};

export default Menu;