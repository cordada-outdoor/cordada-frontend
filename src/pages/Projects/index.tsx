import Layout from "components/Layout/Layout";
import "./index.scss";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import HomeBg from "assets/images/home_bg.jpg";
import PreviewImage from "components/Common/PreviewImage";
import { useQuery } from "@tanstack/react-query";
import { http } from "http/client";

const Projects = () => {
  const { t } = useTranslation();

  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await http.get("api/projects", {
        params: {
          populate: "client",
        },
      });

      return res.data;
    },
  });

  return (
    <Layout>
      <Box className="projects">
        <Typography variant="h3">{t("homePage.ourProjects")}</Typography>
        <Box className="filter-section">
          <Typography className="filter-title">
            {t("projectsPage.filterBy")}
          </Typography>
          <Button className="filter-button">{t("projectsPage.type")}</Button>
          <Button className="filter-button">{t("projectsPage.date")}</Button>
          <Button className="filter-button">{t("projectsPage.client")}</Button>
        </Box>
        <Box className="projects-section">
          <Grid container spacing={2}>
            {projects.data?.data.map((p: any, i: number) => {
              return (
                <Grid item key={i} md={4} xs={12} sm={6}>
                  <Box className="project-container">
                    <PreviewImage
                      src={HomeBg}
                      hoverable={true}
                      title={p.attributes.title}
                      description={`${p.attributes.client.data.attributes.name.toUpperCase()} X CORDADA`}
                      hoverContent={
                        <Box className="project-card">
                          <Typography variant="h6">
                            {p.attributes.title}
                          </Typography>
                          <Typography variant="subtitle1">
                            {p.attributes.client.data.attributes.name.toUpperCase()}{" "}
                            X CORDADA
                          </Typography>
                          <Typography
                            className="project-description"
                            fontWeight={300}
                          >
                            {p.attributes.body}
                          </Typography>
                          <Box className="see-more-button-container">
                            <Button className="see-more-button">
                              {t("seeMore")}
                            </Button>
                          </Box>
                        </Box>
                      }
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Projects;
