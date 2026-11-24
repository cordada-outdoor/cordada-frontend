import "./ProjectCard.scss";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import HomeBg from "assets/images/home_bg.jpg";
import PreviewImage from "components/Common/PreviewImage";
import { Project } from "models/project";
import { getImageUrl } from "utils";
import useUrlLang from "utils/useUrlLang";

interface ProjectCardProps {
  project: Project;
}

// Project image with title/client overlay; on hover shows the subtitle and a
// link to the project page. Callers provide the sizing wrapper.
const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();
  const { documentId, title, subtitle, client, image } = project;

  return (
    <PreviewImage
      src={getImageUrl(image, "large") ?? HomeBg}
      hoverable
      title={title}
      description={`${client?.name?.toUpperCase() ?? ""} X CORDADA`}
      hoverContent={
        <Box className="project-card">
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
          <Typography className="project-description">{subtitle}</Typography>
          <Box className="see-more-button-container">
            <Link to={`${langUrlPrefix}/project/${documentId}`}>
              <Button className="see-more-button" variant="contained">
                {t("seeMore")}
              </Button>
            </Link>
          </Box>
        </Box>
      }
    />
  );
};

export default ProjectCard;
