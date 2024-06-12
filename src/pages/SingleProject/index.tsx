import Layout from "components/Layout/Layout";
import "./index.scss";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import HomeBg from "assets/images/home_bg.jpg";
import PreviewImage from "components/Common/PreviewImage";
import { useQuery } from "@tanstack/react-query";
import { http } from "http/client";
import { useParams } from "react-router-dom";

const SingleProject = () => {
  const { t } = useTranslation();

  const { id } = useParams<{
    id: string;
  }>();

  const projectQuery = useQuery({
    queryKey: ["project", Number(id)],
    queryFn: async () => {
      const res = await http.get(`api/projects/${Number(id)}`, {
        params: {
          populate: "*",
        },
      });

      return res.data;
    },
  });

  if (projectQuery.isLoading) return null;

  const project = projectQuery.data.data;

  return (
    <Layout>
      <Box className="projects">
        <Box className="projects-section">
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} sm={6}>
              <Box className="project-container">
                <PreviewImage
                  src={HomeBg}
                  hoverable={true}
                  title={project.attributes.title}
                  description={`${project.attributes.client.data.attributes.name.toUpperCase()} X CORDADA`}
                  hoverContent={
                    <Box className="project-card">
                      <Typography variant="h6">
                        {project.attributes.title}
                      </Typography>
                      <Typography variant="subtitle1">
                        {project.attributes.client.data.attributes.name.toUpperCase()}{" "}
                        X CORDADA
                      </Typography>
                      <Typography
                        className="project-description"
                        fontWeight={300}
                      >
                        {projectQuery.data.data.attributes.body}
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
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default SingleProject;
