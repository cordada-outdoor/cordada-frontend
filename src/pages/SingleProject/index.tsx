import "./index.scss";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  Box,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import HomeBg from "assets/images/home_bg.jpg";
import ClientInProject from "components/ClientInProject";
import RenderMarkdown from "components/Common/RenderMarkdown";
import Layout from "components/Layout/Layout";
import { http } from "http/client";
import { Client } from "models/client";
import { Project } from "models/project";
import { Service } from "models/service";
import { getImageUrl } from "utils";

const SingleProject = () => {
  const { t } = useTranslation();
  const [imgModal, setImgModal] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  if (projectQuery.isLoading) {
    return (
      <Layout>
        <CircularProgress sx={{ color: "#ff521c" }} />
      </Layout>
    );
  }

  const project: Project = projectQuery.data.data;
  const client: Client = project.attributes.client.data;
  const services: Service[] = project.attributes.services.data;

  const image = project.attributes.image;
  const imgUrl = getImageUrl(image, "large");

  const projectDate = dayjs(project.attributes.date).format("MM/YYYY");

  const dataVariant = isMobile ? "h6" : "h5";
  return (
    <Layout>
      <Box className="project-detail">
        <Typography
          className="project-title"
          variant="h3"
          color="primary"
          p={2}
        >
          {project.attributes.title}
        </Typography>
        <Box
          className="project-img-container"
          onClick={() => setImgModal(!imgModal)}
        >
          <img src={imgUrl ?? HomeBg} alt="project-header" />
        </Box>

        <Grid container justifyContent={"center"}>
          <Grid item md={12} lg={6} p={2}>
            <Typography variant={dataVariant} color="primary" fontWeight="bold">
              {project.attributes.subtitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={12} lg={3} className="project-data">
            <table>
              <tr className="project-data-element">
                <td>
                  <Typography fontWeight={300} variant={dataVariant}>
                    {t("projectsPage.client")}
                  </Typography>
                </td>
                <td>
                  <Typography
                    fontWeight={700}
                    variant={dataVariant}
                    className="project-data-primary"
                  >
                    {client.attributes.name}
                  </Typography>
                </td>
              </tr>
              <tr className="project-data-element">
                <td>
                  <Typography fontWeight={300} variant={dataVariant}>
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
                  <Typography fontWeight={300} variant={dataVariant}>
                    {t("projectsPage.type")}
                  </Typography>
                </td>
                <td>
                  <Typography
                    fontWeight={700}
                    variant={dataVariant}
                    className="project-data-primary"
                  >
                    {services
                      .map((s) => {
                        return s.attributes.name;
                      })
                      .join(" & ")}
                  </Typography>
                </td>
              </tr>
            </table>
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            sx={{ fontWeight: 300 }}
            className="project-body markdown-container"
          >
            <RenderMarkdown markdown={project.attributes.body} />
          </Grid>
        </Grid>
        {client?.id && <ClientInProject id={Number(client.id)} />}
      </Box>
      <Dialog open={imgModal} onClose={() => setImgModal(!imgModal)}>
        <img alt="full-project-img" src={imgUrl ?? HomeBg} />
      </Dialog>
    </Layout>
  );
};

export default SingleProject;
