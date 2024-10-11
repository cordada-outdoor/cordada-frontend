import { Box, Typography } from "@mui/material";
import Layout from "components/Layout/Layout";
import HeaderImg from "assets/images/about-us-top-img.png";
import "./index.scss";
import AboutUsDescription from "components/AboutUsDescription";
import { useQuery } from "@tanstack/react-query";
import { http } from "http/client";

const About = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["about-us-page"],
    queryFn: async () => {
      const res = await http.get("/api/about-us-page", {
        params: {
          "populate[sections][populate]": "*",
        },
      });

      return res.data;
    },
  });

  if (isLoading) return <h1>Loading</h1>;

  const content = data.data.attributes;

  // eslint-disable-next-line no-console
  console.log({ content });

  return (
    <Layout>
      <Box className="about">
        <Typography variant="h3">{content.header}</Typography>
        <Box className="about-top-image-container">
          <img src={HeaderImg} alt="header-img" className="about-top-image" />
        </Box>
        <Box className="about-us-content">
          {content.sections.map((sec: any) => {
            return (
              <AboutUsDescription
                title={sec.name}
                direction="left-to-right"
                image={HeaderImg}
                children={
                  <Box>
                    <Typography fontWeight={300}>{sec.body}</Typography>
                  </Box>
                }
              />
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default About;
