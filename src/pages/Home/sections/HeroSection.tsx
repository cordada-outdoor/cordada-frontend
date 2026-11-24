import { Box } from "@mui/material";

import { useHomepage } from "api/pages";
import Carousel from "components/Carousel/Carousel";
import RenderMarkdown from "components/Common/RenderMarkdown";
import { getHomeImagesArr } from "utils";

import { HERO_CAROUSEL_SETTINGS } from "../carouselSettings";
import styles from "../Home.module.scss";

const HeroSection = () => {
  const { data: homepage } = useHomepage();
  const homeImages = getHomeImagesArr(homepage?.heroImages);

  return (
    <Box className={styles.header}>
      <Carousel settings={HERO_CAROUSEL_SETTINGS} className={styles.carousel}>
        {homeImages.map((homeImage, idx) => (
          <Box key={idx}>
            <Box className={styles.heroImageContainer}>
              <img
                src={homeImage.hero}
                alt="home-bg"
                className={styles.heroImage}
              />
            </Box>
            <Box className={styles.logoContainer}>
              <img
                src={homeImage.logo}
                alt="home-logo"
                className={styles.logo}
              />
            </Box>
          </Box>
        ))}
      </Carousel>
      <Box className={styles.copy} display="flex" justifyContent="center">
        <Box maxWidth="lg">
          <RenderMarkdown markdown={homepage?.heroCopy} />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
