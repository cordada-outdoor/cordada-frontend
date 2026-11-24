import { RefObject } from "react";
import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { t } from "i18next";

import { useHomepage } from "api/pages";
import RenderMarkdown from "components/Common/RenderMarkdown";
import SectionTitle from "components/Common/SectionTitle";
import useUrlLang from "utils/useUrlLang";

import styles from "../Home.module.scss";

interface ServicesSectionProps {
  sectionRef: RefObject<HTMLDivElement>;
}

const ServicesSection = ({ sectionRef }: ServicesSectionProps) => {
  const { langUrlPrefix } = useUrlLang();
  const { data: homepage } = useHomepage();

  return (
    <Box
      ref={sectionRef}
      className={styles.services}
      display="flex"
      justifyContent="center"
    >
      <Box maxWidth="lg">
        <SectionTitle>{t("ourServices")}</SectionTitle>
        <RenderMarkdown markdown={homepage?.servicesCopy} />
        <Link className={styles.seeServices} to={`${langUrlPrefix}/services`}>
          <Button className={styles.seeServicesButton} variant="inverted">
            {t("homePage.allServices")}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ServicesSection;
