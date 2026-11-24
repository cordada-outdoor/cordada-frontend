import { RefObject } from "react";
import { Link } from "react-router-dom";

import { Box, Button, useMediaQuery } from "@mui/material";
import { t } from "i18next";

import { useLatestProjects } from "api/projects";
import Carousel from "components/Carousel/Carousel";
import Loading from "components/Common/Loading";
import SectionTitle from "components/Common/SectionTitle";
import ProjectCard from "components/ProjectCard/ProjectCard";
import { Project } from "models/project";
import { theme } from "styles/theme";
import useUrlLang from "utils/useUrlLang";

import { MOBILE_PROJECTS_CAROUSEL_SETTINGS } from "../carouselSettings";
import styles from "../Home.module.scss";

import ClientsSection from "./ClientsSection";

interface ProjectPreviewProps {
  project: Project;
  variant?: "grid" | "carousel";
}

const ProjectPreview = ({ project, variant }: ProjectPreviewProps) => (
  <Box className={styles.projectPreview}>
    <ProjectCard project={project} variant={variant} />
  </Box>
);

interface ProjectsSectionProps {
  // Marks the end of the latest-projects block; Home watches it to recolour
  // the app bar.
  sentinelRef: RefObject<HTMLDivElement>;
}

const ProjectsSection = ({ sentinelRef }: ProjectsSectionProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { langUrlPrefix } = useUrlLang();
  const { data: projects = [], isLoading } = useLatestProjects(3);

  return (
    <Box className={styles.projects} id="home-projects-section">
      <SectionTitle maxWidth="lg" margin="auto">
        {t("homePage.ourProjects")}
      </SectionTitle>
      {isMobile ? (
        <Box className={styles.mobilePreview}>
          <Carousel settings={MOBILE_PROJECTS_CAROUSEL_SETTINGS}>
            {projects.map((p) => (
              <ProjectPreview
                key={p.documentId}
                project={p}
                variant="carousel"
              />
            ))}
          </Carousel>
        </Box>
      ) : (
        <Box className={styles.projectsGrid} maxWidth="lg" margin="auto">
          {isLoading ? (
            <Loading />
          ) : (
            projects.map((p) => (
              <ProjectPreview key={p.documentId} project={p} />
            ))
          )}
        </Box>
      )}

      <Box margin="auto" display="flex" maxWidth="lg" justifyContent="end">
        <Link className={styles.seeProjects} to={`${langUrlPrefix}/projects`}>
          <Button color="primary" variant="contained">
            {t("homePage.allProjects")}
          </Button>
        </Link>
      </Box>

      <Box ref={sentinelRef} />

      <ClientsSection />
    </Box>
  );
};

export default ProjectsSection;
