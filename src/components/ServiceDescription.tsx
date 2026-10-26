import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

import useRevealOnScroll from "utils/useRevealOnScroll";
import useUrlLang from "utils/useUrlLang";

interface ServiceDescriptionProps {
  direction: "left-to-right" | "right-to-left";
  image: string;
  children: ReactNode;
  title: string;
  // Service id, used to pre-filter the projects list
  service: number;
  isMobile: boolean;
}

const ServiceDescription = ({
  title,
  direction,
  image,
  children,
  service,
  isMobile,
}: ServiceDescriptionProps) => {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();

  return (
    <Box ref={ref}>
      <Grid
        direction={direction === "left-to-right" ? "row" : "row-reverse"}
        spacing={2}
        container
        className={`service-container ${direction} ${isVisible ? "is-visible" : ""}`}
      >
        <Grid item md={6} xs={12} className="service-image-container">
          <Avatar variant="square" className="service-image" src={image} />
          <Link to={`${langUrlPrefix}/projects?service=${service}`}>
            <Button className="see-more-button">
              {t("servicesPage.seeProjects")}
            </Button>
          </Link>
        </Grid>
        <Grid item md={6} xs={12} className="service-description-container">
          <Typography
            className="service-title"
            variant={isMobile ? "h4" : "h3"}
            component="h2"
          >
            {title}
          </Typography>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceDescription;
