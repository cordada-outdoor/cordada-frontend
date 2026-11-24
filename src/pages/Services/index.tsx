import { useTranslation } from "react-i18next";

import { Box, Grid, Typography, useMediaQuery } from "@mui/material";

import { useServices } from "api/services";
import HomeBg from "assets/images/home_bg.jpg";
import Loading from "components/Common/Loading";
import PreviewImage from "components/Common/PreviewImage";
import RenderMarkdown from "components/Common/RenderMarkdown";
import SectionTitle from "components/Common/SectionTitle";
import Layout from "components/Layout/Layout";
import ServiceDescription from "components/ServiceDescription";
import { theme } from "styles/theme";
import { getImageUrl, isEven } from "utils";

import styles from "./Services.module.scss";

const Services = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleScrollToElement = (elId: string) => {
    const el = document.getElementById(elId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const { data: services = [], isLoading } = useServices();

  if (isLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <Box className={styles.services}>
        <SectionTitle>{t("ourServices")}</SectionTitle>
        <Grid className={styles.menu} container spacing={2}>
          {services.map((service) => {
            const { name, banner } = service;
            const imgUrl = getImageUrl(banner, "medium");
            return (
              <Grid key={service.documentId} item md={4} xs={12}>
                <Box
                  onClick={() =>
                    handleScrollToElement(
                      name.toLowerCase().split(" ").join("-"),
                    )
                  }
                  aria-description={name}
                  className={styles.menuItem}
                >
                  <PreviewImage
                    src={imgUrl ?? HomeBg}
                    hoverable={false}
                    hoverContent={
                      <Box className={styles.menuItemContent}>
                        <Typography
                          className={styles.menuItemTitle}
                          variant={isMobile ? "h5" : "h4"}
                          fontWeight={700}
                        >
                          {name.toUpperCase()}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </Grid>
            );
          })}
          <Grid item md={4} xs={12}>
            <a
              title={t("servicesPage.consultUs").toUpperCase()}
              href="mailto:info@cordadaoutdoor.com"
            >
              <Box className={styles.menuItem}>
                <PreviewImage
                  src={HomeBg}
                  hoverable={false}
                  hoverContent={
                    <Box className={styles.menuItemContent}>
                      <Typography
                        className={styles.menuItemTitle}
                        variant={isMobile ? "h5" : "h4"}
                        fontWeight={700}
                      >
                        {t("servicesPage.consultUs").toUpperCase()}
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </a>
          </Grid>
        </Grid>
        <Box className={styles.content}>
          {services.map((service, i) => {
            const { name, body, banner } = service;

            const imgUrl = getImageUrl(banner, "large");

            return (
              <Box
                key={service.documentId}
                id={name.toLowerCase().split(" ").join("-")}
              >
                <ServiceDescription
                  serviceId={service.id}
                  title={name.toLowerCase()}
                  direction={isEven(i) ? "left-to-right" : "right-to-left"}
                  image={imgUrl ?? HomeBg}
                  isMobile={isMobile}
                >
                  <RenderMarkdown markdown={body} />
                </ServiceDescription>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default Services;
