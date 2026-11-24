import { Box } from "@mui/material";

import { useHomepage } from "api/pages";
import Carousel from "components/Carousel/Carousel";
import RenderMarkdown from "components/Common/RenderMarkdown";
import { getHomeImagesArr } from "utils";

import { HERO_CAROUSEL_SETTINGS } from "../carouselSettings";

const HeroSection = () => {
  const { data: homepage } = useHomepage();
  const homeImages = getHomeImagesArr(homepage?.heroImages);

  return (
    <Box className="home-page-header">
      <Carousel settings={HERO_CAROUSEL_SETTINGS}>
        {homeImages.map((homeImage, idx) => (
          <Box key={idx}>
            <Box className="home-background-image-container">
              <img
                src={homeImage.hero}
                alt="home-bg"
                className="home-background-image"
              />
            </Box>
            <Box className="home-primary-logo-container">
              <img
                src={homeImage.logo}
                alt="home-logo"
                className="home-primary-logo"
              />
            </Box>
          </Box>
        ))}
      </Carousel>
      <Box className="home-corp-copy" display="flex" justifyContent="center">
        <Box maxWidth="lg">
          <RenderMarkdown markdown={homepage?.heroCopy} />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
