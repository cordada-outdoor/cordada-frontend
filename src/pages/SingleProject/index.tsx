import "./index.scss";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import HomeBg from "assets/images/home_bg.jpg";
import ClientInProject from "components/ClientInProject";
import RenderMarkdown from "components/Common/RenderMarkdown";
import Layout from "components/Layout/Layout";
import PageContainer from "components/Layout/PageContainer";
import ProjectGallery from "components/ProjectGallery";
import { http } from "http/client";
import { Client } from "models/client";
import { Project } from "models/project";
import { Service } from "models/service";
import { getImageUrl, joinWithCommasAndAmpersand } from "utils";

const SingleProject = () => {
  const { t } = useTranslation();

  const { id } = useParams<{
    id: string;
  }>();

  const projectQuery = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await http.get(`api/projects/${id}`, {
        params: {
          populate: "*",
        },
      });

      return res.data;
    },
  });

  if (projectQuery.isLoading) {
    return (
      <Layout>
        <CircularProgress className="loading-indicator" />
      </Layout>
    );
  }

  const project: Project = projectQuery.data?.data;
  const client: Client = project?.client;
  const services: Service[] = project?.services;

  const serviceNames = joinWithCommasAndAmpersand(
    services?.map((s) => s?.name),
  );

  const image = project?.image;
  const imgUrl = getImageUrl(image, "large");

  const projectDate = dayjs(project?.date).format("MM/YYYY");

  return (
    <Layout>
      <PageContainer className="project-detail">
        <Typography
          className="project-title"
          variant="h3"
          component="h1"
          color="primary"
          fontWeight={600}
          mb={3}
        >
          {project?.title}
        </Typography>
        <Box className="project-banner">
          <img src={imgUrl ?? HomeBg} alt="" />
        </Box>

        <Box component="dl" className="project-meta">
          {client && (
            <div>
              <dt>{t("projectsPage.client")}</dt>
              <dd>{client.name}</dd>
            </div>
          )}
          <div>
            <dt>{t("projectsPage.date")}</dt>
            <dd>{projectDate}</dd>
          </div>
          {serviceNames && (
            <div>
              <dt>{t("projectsPage.type")}</dt>
              <dd>{serviceNames}</dd>
            </div>
          )}
        </Box>

        <Box className="project-body">
          {project?.subtitle && (
            <Typography variant="h5" component="p" className="project-subtitle">
              {project.subtitle}
            </Typography>
          )}
          <RenderMarkdown markdown={project?.body} />
        </Box>

        <Grid container py={2} spacing={2}>
          {project?.gallery?.length && (
            <Grid
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
              item
              xs={12}
            >
              <ProjectGallery gallery={project.gallery} />
            </Grid>
          )}

          {client && (
            <Grid item xs={12}>
              <ClientInProject documentId={client?.documentId} />
            </Grid>
          )}
        </Grid>
      </PageContainer>
    </Layout>
  );
};

export default SingleProject;
