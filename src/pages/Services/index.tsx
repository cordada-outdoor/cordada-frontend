import Layout from "components/Layout/Layout"
import './index.scss'
import { Box, Grid, Typography } from "@mui/material";
import HomeBg from "assets/images/home_bg.jpg"
import { useTranslation } from "react-i18next";
import { SERVICES_LIST } from "utils/constants";
import PreviewImage from "components/Common/PreviewImage";
import ServiceDescription from "components/ServiceDescription";

const Services = () => {
    const { t } = useTranslation();

    const handleScrollToElement = (elId: string) => {
        const el = document.getElementById(elId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: 'center' })
    }
    return (
        <Layout>
            <Box className="services">
                <Typography variant="h3">{t("ourServices")}</Typography>
                <Grid className="service-menu" container spacing={2}>
                    {SERVICES_LIST.map(aS => {
                        return <Grid key={aS} item md={4} xs={12}>
                            <Box
                                onClick={() => handleScrollToElement(aS)}
                                aria-role="link"
                                role="link"
                                aria-description={aS}
                                className="service-menu-item"
                            >
                                <PreviewImage
                                    src={HomeBg}
                                    hoverable={false}
                                    hoverContent={<Box className="menu-item-content-container">
                                        <Typography
                                            className="menu-item-title"
                                            variant="h4"
                                            fontWeight={700}
                                        >
                                            {t(`servicesPage.${aS}`).toUpperCase()}
                                        </Typography>
                                    </Box>}
                                />
                            </Box>
                        </Grid>
                    })}
                </Grid>
                <Box className="services-content-container">
                    <Box id="socialMedia">
                        <ServiceDescription
                            service="socialMedia"
                            title={t("servicesPage.socialMedia")}
                            direction="left-to-right"
                            image={HomeBg}
                            children={(
                                <Typography fontWeight={300}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Typography>
                            )}
                        />
                    </Box>
                    <Box id="events">
                        <ServiceDescription
                            service="events"
                            title={t("servicesPage.events")}
                            direction="right-to-left"
                            image={HomeBg}
                            children={(
                                <Typography fontWeight={300}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Typography>
                            )}
                        />
                    </Box>
                    <Box id="press">
                        <ServiceDescription
                            service="press"
                            title={t("servicesPage.press")}
                            direction="left-to-right"
                            image={HomeBg}
                            children={(
                                <Typography fontWeight={300}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Typography>
                            )}
                        />
                    </Box>
                    <Box id="contentCreation">
                        <ServiceDescription
                            service="contentCreation"
                            title={t("servicesPage.contentCreation")}
                            direction="right-to-left"
                            image={HomeBg}
                            children={(
                                <Typography fontWeight={300}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Typography>
                            )}
                        />
                    </Box>
                    <Box id="businessDevelopment">
                        <ServiceDescription
                            service="businessDevelopment"
                            title={t("servicesPage.businessDevelopment")}
                            direction="left-to-right"
                            image={HomeBg}
                            children={(
                                <Typography fontWeight={300}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Typography>
                            )}
                        />
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default Services;
