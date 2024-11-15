import "./index.scss";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import HeaderImg from "assets/images/about-us-top-img.png";
import HomeBg from "assets/images/home_bg.jpg";
import AboutUsDescription from "components/AboutUsDescription";
import RenderMarkdown from "components/Common/RenderMarkdown";
import Layout from "components/Layout/Layout";
import { http } from "http/client";
import { getImageUrl } from "utils";
import { theme } from "utils/theme";

const About = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["about-us-page"],
    queryFn: async () => {
      const res = await http.get("/api/about-us-page", {
        params: {
          populate: {
            sections: {
              populate: "*",
            },
          },
        },
      });

      return res.data;
    },
  });

  if (isLoading)
    return (
      <Layout>
        <CircularProgress className="loading-indicator" />
      </Layout>
    );

  const content = data.data.attributes;

  return (
    <Layout>
      <Box className="about">
        <Typography variant="h3">{content?.header ?? "About us"}</Typography>
        <Box className="about-top-image-container">
          <img src={HeaderImg} alt="header-img" className="about-top-image" />
        </Box>
        <Box
          className="about-us-content"
          maxWidth={theme.breakpoints.values.xl}
          margin="auto"
        >
          {content?.sections?.map((sec: any, idx: number) => {
            const imgUrl = getImageUrl(sec.profilePicture, "small");
            const even = idx % 2 === 0;
            return (
              <AboutUsDescription
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
