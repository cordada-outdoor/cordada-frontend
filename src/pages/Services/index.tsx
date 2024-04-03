import Layout from "components/Layout/Layout"
import './index.scss'
import { Box, Grid, Typography } from "@mui/material";
import HomeBg from "assets/images/home_bg.jpg"
import { useTranslation } from "react-i18next";
import { SERVICES_LIST } from "utils/constants";
import PreviewImage from "components/Common/PreviewImage";

const Services = () => {
    const { t } = useTranslation();

    const handleScrollToElement = (elId: string) => {
        const el = document.getElementById(elId);
        if (el) el.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <Layout>
            <Box className="services">
                <Typography variant="h4">{t("ourServices")}</Typography>
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
                    <Box className="services-content-section" id="socialMedia">
                        <Typography className="services-content-title" variant="h3">{t("servicesPage.socialMedia")}</Typography>
                    </Box>
                    <Box className="services-content-section" id="events">
                        <Typography className="services-content-title" variant="h3">{t("servicesPage.events")}</Typography>
                    </Box>
                    <Box className="services-content-section" id="press">
                        <Typography className="services-content-title" variant="h3">{t("servicesPage.press")}</Typography>
                    </Box>
                    <Box className="services-content-section" id="contentCreation">
                        <Typography className="services-content-title" variant="h3">{t("servicesPage.contentCreation")}</Typography>
                    </Box>
                    <Box className="services-content-section" id="businessDevelopment">
                        <Typography className="services-content-title" variant="h3">{t("servicesPage.businessDevelopment")}</Typography>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default Services;
