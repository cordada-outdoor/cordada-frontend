import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import HomeBg from "assets/images/home_bg.jpg";
import { Project } from "models/project";
import { getImageUrl } from "utils";
import useUrlLang from "utils/useUrlLang";

interface ProjectCardProps {
  project: Project;
  titleComponent?: "h2" | "h3";
}

// The whole card is the link; the subtitle overlay is only a hover enhancement
const ProjectCard = ({ project, titleComponent = "h3" }: ProjectCardProps) => {
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();
  const { title, subtitle, client, image, documentId } = project;
  const imgUrl = getImageUrl(image, "large") ?? HomeBg;

  return (
    <Link
      to={`${langUrlPrefix}/project/${documentId}`}
      className="project-card-link"
    >
      <Box className="project-card">
        <img src={imgUrl} alt="" className="project-card-image" />
        <Box className="project-card-caption">
          <Typography
            variant="h4"
            component={titleComponent}
            fontWeight={600}
            className="project-card-title"
          >
            {title}
          </Typography>
          {client?.name && (
            <Typography
              variant="caption"
              fontWeight="bold"
              className="project-card-client"
            >
              {`${client.name} x Cordada`}
            </Typography>
          )}
        </Box>
        {subtitle && (
          <Box className="project-card-hover" aria-hidden="true">
            <Typography variant="h5" component="p" fontWeight={600}>
              {title}
            </Typography>
            <Typography className="project-card-description">
              {subtitle}
            </Typography>
            <span className="project-card-more">{t("seeMore")} →</span>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default ProjectCard;
