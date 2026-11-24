import { Box } from "@mui/material";

import { useAboutUsPage } from "api/pages";
import HomeBg from "assets/images/home_bg.jpg";
import AboutUsDescription from "components/AboutUsDescription";
import Loading from "components/Common/Loading";
import RenderMarkdown from "components/Common/RenderMarkdown";
import SectionTitle from "components/Common/SectionTitle";
import { StrapiImage } from "components/Common/StrapiImage";
import Layout from "components/Layout/Layout";
import { getImageUrl } from "utils";

import styles from "./About.module.scss";

const About = () => {
  const { data: content, isLoading } = useAboutUsPage();

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <Box className={styles.about}>
        <SectionTitle>{content?.header ?? "about us"}</SectionTitle>
        <Box className={styles.bannerContainer}>
          <StrapiImage image={content?.banner} className={styles.banner} />
        </Box>
        <Box maxWidth="xl" margin="auto">
          {content?.sections?.map((sec, idx) => {
            const imgUrl = getImageUrl(sec.profilePicture, "small");
            const even = idx % 2 === 0;
            return (
              <AboutUsDescription
                key={sec.id}
                title={sec.name}
                direction={even ? "left-to-right" : "right-to-left"}
                image={imgUrl ?? HomeBg}
                children={<RenderMarkdown markdown={sec.body} />}
              />
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default About;
