import { AppbarPosition } from "models";
import { AppBar, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, styled, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material"
import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomIconButton from "components/Common/CustomIconButton";
import { ReactComponent as LogoSmall } from 'assets/logos/logo-small.svg'
import { ReactComponent as MenuIcon } from 'assets/logos/menu-icon.svg'

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
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    if (isMobile) {
        return <>
            <AppBar className="mobile-appbar appbar" color="transparent" elevation={0}>
                <Toolbar className="toolbar">
                    <LogoSmall className="main-menu-logo" />
                    <Button className="right-mobile-menu" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                        <Typography>{i18n.language.toUpperCase() + ' >'}</Typography>
                        <MenuIcon className="menu-icon" />
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className="menu-drawer"
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(!isDrawerOpen)}>
                <List>
                    {navigationOptions.map(aN => (
                        <ListItem key={aN.value} className="navigation-item">
                            <ListItemButton onClick={() => navigate(aN.value)}>
                                <ListItemText primary={t(aN.label).toUpperCase()} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Box>
                    <List className="bottom-menu-navigation">
                        <ListItem className="navigation-item">
                            <ListItemButton onClick={() => navigate('/')}>
                                <ListItemText primary={t('legalNotice')} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem className="navigation-item">
                            <ListItemButton onClick={() => navigate('/')}>
                                <ListItemText primary={t('privacyPolicy')} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List className="lang-list">
                        {
                            supportedLngs.map(aL => {
                                const isSelected = i18n.language.toUpperCase() === aL.toUpperCase();
                                return <ListItem className={isSelected ? 'primary-color-button' : ''} key={aL}>
                                    <ListItemButton>
                                        <ListItemText primary={aL.toUpperCase()} />
                                    </ListItemButton>
                                </ListItem>
                            })
                        }
                    </List>
                </Box>
            </Drawer>
        </>
    }
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
                            <ListItem>
                                <ListItemButton>
                                    <LogoSmall className="main-menu-logo" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Toolbar>
            </AppBar>
        </MenuScroll>
        {appbarPosition !== 'fixed' && <Offset />}
    </>
};

export default Menu;