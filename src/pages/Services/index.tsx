import Layout from "components/Layout/Layout";
import "./index.scss";
import { Box, Grid, Typography } from "@mui/material";
import HomeBg from "assets/images/home_bg.jpg";
import { useTranslation } from "react-i18next";
import { SERVICES_LIST } from "utils/constants";
import PreviewImage from "components/Common/PreviewImage";
import ServiceDescription from "components/ServiceDescription";
import { useQuery } from "@tanstack/react-query";
import { http } from "http/client";
import { isEven } from "utils";

const Services = () => {
  const { t } = useTranslation();

  const handleScrollToElement = (elId: string) => {
    const el = document.getElementById(elId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await http.get("api/services");

      return res.data;
    },
  });

  if (servicesQuery.isLoading) return null;

  console.log({ services: servicesQuery.data });

  const services = servicesQuery.data.data;

  return (
    <Layout>
      <Box className="services">
        <Typography variant="h3">{t("ourServices")}</Typography>
        <Grid className="service-menu" container spacing={2}>
          {services.map((service: any, i: number) => {
            const { name } = service.attributes;

            return (
              <Grid key={i} item md={4} xs={12}>
                <Box
                  onClick={() =>
                    handleScrollToElement(
                      name.toLowerCase().split(" ").join("-"),
                    )
                  }
                  aria-role="link"
                  role="link"
                  aria-description={name}
                  className="service-menu-item"
                >
                  <PreviewImage
                    src={HomeBg}
                    hoverable={false}
                    hoverContent={
                      <Box className="menu-item-content-container">
                        <Typography
                          className="menu-item-title"
                          variant="h4"
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
        </Grid>
        <Box className="services-content-container">
          {services.map((service: any, i: number) => {
            const { name, description } = service.attributes;

            return (
              <Box id={name.toLowerCase().split(" ").join("-")}>
                <ServiceDescription
                  service="socialMedia"
                  title={name.toLowerCase()}
                  direction={isEven(i) ? "left-to-right" : "right-to-left"}
                  image={HomeBg}
                  children={
                    <Typography fontWeight={300}>{description}</Typography>
                  }
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default Services;
