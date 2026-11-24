import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { t } from "i18next";

import { useHomepage } from "api/pages";
import ContactUs from "components/Common/ContactUs";
import { StrapiImage } from "components/Common/StrapiImage";
import useUrlLang from "utils/useUrlLang";

const AboutSection = () => {
  const { langUrlPrefix } = useUrlLang();
  const { data: homepage } = useHomepage();

  return (
    <Box className="home-about-section">
      <Box className="about-us-img-container">
        {homepage && (
          <StrapiImage
            image={homepage.contactUsImage}
            className="about-us-img"
          />
        )}
        <Link
          className="about-us-button-container"
          to={`${langUrlPrefix}/about`}
        >
          <Button
            className="about-us-button"
            color="primary"
            variant="contained"
          >
            {t("aboutUs")}
          </Button>
        </Link>
      </Box>
      <ContactUs titleVariant="h3" colorScheme="white-on-black" />
    </Box>
  );
};

export default AboutSection;
