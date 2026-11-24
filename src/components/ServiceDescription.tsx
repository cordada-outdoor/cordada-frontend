import { ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

import { cx } from "utils/cx";
import useUrlLang from "utils/useUrlLang";

import styles from "./ServiceDescription.module.scss";

interface ServiceDescriptionProps {
  direction: "left-to-right" | "right-to-left";
  image: string;
  children: ReactNode;
  title: string;
  serviceId: number;
  isMobile: boolean;
}

const ServiceDescription = ({
  title,
  direction,
  image,
  children,
  serviceId,
  isMobile,
}: ServiceDescriptionProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();

  useEffect(() => {
    if (!domRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={domRef} className={styles.root}>
      <Grid
        direction={direction === "left-to-right" ? "row" : "row-reverse"}
        spacing={2}
        container
        className={cx(
          styles.container,
          direction === "right-to-left" && styles.rightToLeft,
          isVisible && styles.visible,
        )}
      >
        <Grid item md={6} xs={12} className={styles.imageContainer}>
          <Avatar variant="square" className={styles.image} src={image} />
          <Link
            to={{
              pathname: `${langUrlPrefix}/projects`,
              state: { serviceId },
            }}
          >
            <Button className={styles.seeMore} variant="contained">
              {t("servicesPage.seeProjects")}
            </Button>
          </Link>
        </Grid>
        <Grid item md={6} xs={12} className={styles.descriptionContainer}>
          <Typography className={styles.title} variant={isMobile ? "h4" : "h3"}>
            {title}
          </Typography>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceDescription;
