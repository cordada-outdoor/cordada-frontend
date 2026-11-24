import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { t } from "i18next";

import { useHomepage } from "api/pages";
import ContactUs from "components/Common/ContactUs";
import { StrapiImage } from "components/Common/StrapiImage";
import useUrlLang from "utils/useUrlLang";

import styles from "../Home.module.scss";

const AboutSection = () => {
  const { langUrlPrefix } = useUrlLang();
  const { data: homepage } = useHomepage();

  return (
    <Box className={styles.about}>
      <Box className={styles.aboutImageContainer}>
        {homepage && (
          <StrapiImage
            image={homepage.contactUsImage}
            className={styles.aboutImage}
          />
        )}
        <Link className={styles.aboutButton} to={`${langUrlPrefix}/about`}>
          <Button color="primary" variant="contained">
            {t("aboutUs")}
          </Button>
        </Link>
      </Box>
      <ContactUs titleVariant="h3" colorScheme="white-on-black" />
    </Box>
  );
};

export default AboutSection;
