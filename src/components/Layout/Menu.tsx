import { AppbarPosition } from "models";
import { AppBar, Box, List, ListItem, ListItemButton, ListItemText, Toolbar, styled, useScrollTrigger } from "@mui/material"
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface MenuScrollProps {
    children: ReactElement,
    position?: AppbarPosition
}

const MenuScroll = ({ children, position }: MenuScrollProps) => {
    const trigger = useScrollTrigger({
        disableHysteresis: false,
        threshold: 0,
    });
    return React.cloneElement(children, {
        color: trigger || position !== 'fixed' ? 'primary' : 'transparent',
        elevation: trigger ? 4 : 0
    });
}
const supportedLngs = ['ca', 'es', 'en']
const navigationOptions = [{ label: 'whatIsCordada', value: '/' }, { label: 'aboutUs', value: '/about' }]

interface MenuProps {
    appbarPosition?: AppbarPosition
}

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Menu = ({ appbarPosition = "sticky" }: MenuProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return <>
        <MenuScroll position={appbarPosition}>
            <AppBar className="appbar" position="fixed">
                <Toolbar className="toolbar">
                    <List className="navigation-list">
                        {navigationOptions.map(aN => (
                            <ListItem key={aN.value} className="navigation-item">
                                <ListItemButton onClick={() => navigate(aN.value)}>
                                    <ListItemText primary={t(aN.label).toUpperCase()} />
                                </ListItemButton>
                            </ListItem>
                        ))}

                    </List>
                    <Box className="right-menu">
                        <List className="lang-list">
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
        {appbarPosition !== 'fixed' && <Offset />}
    </>
};

export default Menu;