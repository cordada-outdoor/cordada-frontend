import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  Box,
  Dialog,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";

import { useProject } from "api/projects";
import HomeBg from "assets/images/home_bg.jpg";
import ClientInProject from "components/ClientInProject";
import Loading from "components/Common/Loading";
import RenderMarkdown from "components/Common/RenderMarkdown";
import SectionTitle from "components/Common/SectionTitle";
import Layout from "components/Layout/Layout";
import ProjectGallery from "components/ProjectGallery";
import { theme } from "styles/theme";
import { getImageUrl, joinWithCommasAndAmpersand } from "utils";

import styles from "./SingleProject.module.scss";

const SingleProject = () => {
  const { t } = useTranslation();
  const [imgModal, setImgModal] = useState<boolean>(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { id } = useParams<{
    id: string;
  }>();

  const { data: project, isLoading } = useProject(id);

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  const client = project?.client;

  const serviceNames = joinWithCommasAndAmpersand(
    project?.services.map((s) => s.name) ?? [],
  );

  const image = project?.image;
  const imgUrl = getImageUrl(image);

  const projectDate = dayjs(project?.date).format("MM/YYYY");

  const dataVariant = isMobile ? "h6" : "h5";

  return (
    <Layout>
      <Box className={styles.project} pt={[4, 4, 0]}>
        <SectionTitle color="primary" p={2}>
          {project?.title}
        </SectionTitle>
        <Box
          className={styles.imageContainer}
          onClick={() => setImgModal(!imgModal)}
        >
          <img src={imgUrl ?? HomeBg} alt="project-header" />
        </Box>

        <Grid container p={2} spacing={2}>
          <Grid item md={12} lg={3} className={styles.data}>
            <table>
              {client && (
                <tr>
                  <td>
                    <Typography variant={dataVariant}>
                      {t("projectsPage.client")}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      fontWeight={700}
                      variant={dataVariant}
                      className={styles.dataValue}
                    >
                      {client?.name}
                    </Typography>
                  </td>
                </tr>
              )}
              <tr>
                <td>
                  <Typography variant={dataVariant}>
                    {t("projectsPage.date")}
                  </Typography>
                </td>
                <td>
                  <Typography
                    fontWeight={700}
                    variant={dataVariant}
                    className={styles.dataValue}
                  >
                    {projectDate}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant={dataVariant}>
                    {t("projectsPage.type")}
                  </Typography>
                </td>
                <td>
                  <Typography
                    fontWeight={700}
                    variant={dataVariant}
                    className={styles.dataValue}
                  >
                    {serviceNames}
                  </Typography>
                </td>
              </tr>
            </table>
          </Grid>
          <Grid item md={12} lg={6} className={styles.body}>
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
          {!!project?.gallery?.length && (
            <Grid className={styles.gallery} item xs={12}>
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
