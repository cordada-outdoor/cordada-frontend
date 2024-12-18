import "./index.scss";

import { useTranslation } from "react-i18next";

import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import HomeBg from "assets/images/home_bg.jpg";
import PreviewImage from "components/Common/PreviewImage";
import RenderMarkdown from "components/Common/RenderMarkdown";
import Layout from "components/Layout/Layout";
import ServiceDescription from "components/ServiceDescription";
import { http } from "http/client";
import { getImageUrl, isEven } from "utils";
import { theme } from "utils/theme";

const Services = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleScrollToElement = (elId: string) => {
    const el = document.getElementById(elId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await http.get("api/services", {
        params: {
          populate: "*",
        },
      });

      return res.data;
    },
  });

  if (servicesQuery.isLoading)
    return (
      <Layout>
        <CircularProgress className="loading-indicator" />
      </Layout>
    );

  const services = servicesQuery.data?.data;

  return (
    <Layout>
      <Box className="services">
        <Typography variant="h3" fontWeight={600}>
          {t("ourServices")}
        </Typography>
        <Grid className="service-menu" container spacing={2}>
          {services?.map((service: any, i: number) => {
            const { name, banner } = service;
            const imgUrl = getImageUrl(banner, "medium");
            return (
              <Grid key={i} item md={4} xs={12}>
                <Box
                  onClick={() =>
                    handleScrollToElement(
                      name.toLowerCase().split(" ").join("-"),
                    )
                  }
                  aria-description={name}
                  className="service-menu-item"
                >
                  <PreviewImage
                    src={imgUrl ?? HomeBg}
                    hoverable={false}
                    hoverContent={
                      <Box className="menu-item-content-container">
                        <Typography
                          className="menu-item-title"
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
              <Box className="service-menu-item">
                <PreviewImage
                  src={HomeBg}
                  hoverable={false}
                  hoverContent={
                    <Box className="menu-item-content-container">
                      <Typography
                        className="menu-item-title"
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
        <Box className="services-content-container">
          {services.map((service: any, i: number) => {
            const { name, body, banner } = service;

            const imgUrl = getImageUrl(banner, "large");

            return (
              <Box id={name.toLowerCase().split(" ").join("-")}>
                <ServiceDescription
                  service={service.id}
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
