import "./index.scss";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  Box,
  CircularProgress,
  Dialog,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import HomeBg from "assets/images/home_bg.jpg";
import ClientInProject from "components/ClientInProject";
import RenderMarkdown from "components/Common/RenderMarkdown";
import Layout from "components/Layout/Layout";
import ProjectGallery from "components/ProjectGallery";
import { http } from "http/client";
import { Client } from "models/client";
import { Project } from "models/project";
import { Service } from "models/service";
import { getImageUrl, joinWithCommasAndAmpersand } from "utils";
import { theme } from "utils/theme";

const SingleProject = () => {
  const { t } = useTranslation();
  const [imgModal, setImgModal] = useState<boolean>(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        <CircularProgress sx={{ color: "#ff521c" }} />
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
  const imgUrl = getImageUrl(image);

  const projectDate = dayjs(project?.date).format("MM/YYYY");

  const dataVariant = isMobile ? "h6" : "h5";

  return (
    <Layout>
      <Box className="project-detail" pt={[4, 4, 0]}>
        <Typography
          className="project-title"
          variant="h3"
          color="primary"
          fontWeight={600}
          p={2}
        >
          {project?.title}
        </Typography>
        <Box
          className="project-img-container"
          onClick={() => setImgModal(!imgModal)}
        >
          <img src={imgUrl ?? HomeBg} alt="project-header" />
        </Box>

        <Grid container p={2} spacing={2}>
          <Grid item md={12} lg={3} className="project-data">
            <table>
              {client && (
                <tr className="project-data-element">
                  <td>
                    <Typography variant={dataVariant}>
                      {t("projectsPage.client")}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      fontWeight={700}
                      variant={dataVariant}
                      className="project-data-primary"
                    >
                      {client?.name}
                    </Typography>
                  </td>
                </tr>
              )}
              <tr className="project-data-element">
                <td>
                  <Typography variant={dataVariant}>
                    {t("projectsPage.date")}
                  </Typography>
                </td>
                <td>
                  <Typography
                    fontWeight={700}
                    variant={dataVariant}
                    className="project-data-primary"
                  >
                    {projectDate}
                  </Typography>
                </td>
              </tr>
              <tr className="project-data-element">
                <td>
                  <Typography variant={dataVariant}>
                    {t("projectsPage.type")}
                  </Typography>
                </td>
                <td>
                  <Typography
                    fontWeight={700}
                    variant={dataVariant}
                    className="project-data-primary"
                  >
                    {serviceNames}
                  </Typography>
                </td>
              </tr>
            </table>
          </Grid>
          <Grid item md={12} lg={6} className="project-body">
            <Stack gap={2}>
              <Typography
                variant={dataVariant}
                color="primary"
                fontWeight="bold"
              >
                {project?.subtitle}
              </Typography>
              <RenderMarkdown markdown={project?.body} />
            </Stack>
          </Grid>
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
      </Box>
      <Dialog
        maxWidth={"lg"}
        open={imgModal}
        onClose={() => setImgModal(!imgModal)}
      >
        <img alt="full-project-img" src={imgUrl ?? HomeBg} />
      </Dialog>
    </Layout>
  );
};

export default SingleProject;
