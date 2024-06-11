import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ServiceType } from "models";

interface ServiceDescriptionProps {
  direction: "left-to-right" | "right-to-left";
  image: string;
  children: ReactNode;
  title: string;
  service: ServiceType;
}

const ServiceDescription = ({
  title,
  direction,
  image,
  children,
  service,
}: ServiceDescriptionProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    // @ts-expect-error
    observer.observe(domRef.current);
  }, []);

  return (
    <Box ref={domRef}>
      <Grid
        direction={direction === "left-to-right" ? "row" : "row-reverse"}
        spacing={2}
        container
        className={`service-container ${direction} ${isVisible ? "is-visible" : ""}`}
      >
        <Grid item md={6} xs={12} className="service-image-container">
          <Avatar variant="square" className="service-image" src={image} />
          <Button className="see-more-button">
            {t("servicesPage.seeProjects")}
          </Button>
        </Grid>
        <Grid item md={6} xs={12} className="service-description-container">
          <Typography className="service-title" variant="h3">
            {title}
          </Typography>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceDescription;
