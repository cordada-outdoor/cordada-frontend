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

import ClientsSection from "./ClientsSection";

const ProjectPreview = ({ project }: { project: Project }) => (
  <Box className="project-preview">
    <ProjectCard project={project} />
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
    <Box className="home-projects-section" id="home-projects-section">
      <SectionTitle className="section-title" maxWidth="lg" margin="auto">
        {t("homePage.ourProjects")}
      </SectionTitle>
      {isMobile ? (
        <Box className="mobile-projects-preview">
          <Carousel settings={MOBILE_PROJECTS_CAROUSEL_SETTINGS}>
            {projects.map((p) => (
              <ProjectPreview key={p.documentId} project={p} />
            ))}
          </Carousel>
        </Box>
      ) : (
        <Box className="projects-preview-container" maxWidth="lg" margin="auto">
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
        <Link
          className="see-projects-button-container"
          to={`${langUrlPrefix}/projects`}
        >
          <Button
            className="see-projects-button"
            color="primary"
            variant="contained"
          >
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
