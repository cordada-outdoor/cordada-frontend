import Layout from "components/Layout/Layout";
import "./index.scss";
import { Avatar, Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import HomeBg from "assets/images/home_bg.jpg";
import { useQuery } from "@tanstack/react-query";
import { http } from "http/client";
import { useParams } from "react-router-dom";
import { Project } from "models/project";
import { Client } from "models/client";
import { Service } from "models/service";
import { formatDate } from "utils";
import HeaderImg from "assets/images/about-us-top-img.png";
import ContactUs from "components/Common/ContactUs";

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

  const project: Project = projectQuery?.data?.data;
  const client: Client | undefined = project?.attributes?.client?.data;
  const service: Service | undefined = project?.attributes?.service?.data;

  const projectDate = formatDate(project?.attributes?.date ?? "");

  return (
    <Layout>
      <Box className="project-detail">
        {projectQuery.isLoading || !project ? (
          <CircularProgress sx={{ color: "#ff521c" }} />
        ) : (
          <>
            <Typography className="project-title" variant="h3">
              {project.attributes.title}
            </Typography>
            <Box className="project-img-container">
              <img src={HomeBg} alt="project-header" />
            </Box>
            <Grid container>
              <Grid item md={4} xs={12} className="project-data">
                <Box className="project-data-element">
                  <Typography fontWeight={300} variant="h4">
                    {t("projectsPage.client")}
                  </Typography>
                  <Typography
                    fontWeight={700}
                    variant="h4"
                    className="project-data-primary"
                  >
                    {client?.attributes?.name ?? "N/A"}
                  </Typography>
                </Box>
                <Box className="project-data-element">
                  <Typography fontWeight={300} variant="h4">
                    {t("projectsPage.date")}
                  </Typography>
                  <Typography
                    fontWeight={700}
                    variant="h4"
                    className="project-data-primary"
                  >
                    {projectDate}
                  </Typography>
                </Box>
                <Box className="project-data-element">
                  <Typography fontWeight={300} variant="h4">
                    {t("projectsPage.type")}
                  </Typography>
                  <Typography
                    fontWeight={700}
                    variant="h4"
                    className="project-data-primary"
                  >
                    {service?.attributes?.name ?? "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={8} xs={12} className="project-body">
                <Typography fontWeight={300}>
                  {project.attributes.body}
                </Typography>
              </Grid>
            </Grid>
            <Box className="project-client-logos">
              {["", "", ""].map((client: string, idx: number) => {
                return (
                  <Avatar className="project-client-logo" src={HeaderImg} />
                );
              })}
            </Box>
            <Box className="contact-container">
              <ContactUs titleVariant="h6" colorScheme="black-on-white" />
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default SingleProject;
