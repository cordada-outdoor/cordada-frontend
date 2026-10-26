import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { http } from "http/client";
import { Project } from "models/project";
import useUrlLang from "utils/useUrlLang";

type Neighbour = Pick<Project, "documentId" | "title">;

// The projects list is sorted newest first, so "next" is the older one
const useNeighbour = (createdAt: string, direction: "newer" | "older") =>
  useQuery({
    queryKey: ["project-neighbour", createdAt, direction],
    queryFn: async () => {
      const res = await http.get<{ data: Neighbour[] }>("api/projects", {
        params: {
          fields: ["documentId", "title"],
          filters: {
            createdAt: { [direction === "newer" ? "$gt" : "$lt"]: createdAt },
          },
          sort: `createdAt:${direction === "newer" ? "asc" : "desc"}`,
          pagination: { pageSize: 1 },
        },
      });
      return res.data.data[0] ?? null;
    },
    enabled: !!createdAt,
  });

interface ProjectNavigationProps {
  project: Project;
}

const ProjectNavigation = ({ project }: ProjectNavigationProps) => {
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();
  const previous = useNeighbour(project.createdAt, "newer").data;
  const next = useNeighbour(project.createdAt, "older").data;

  return (
    <Box component="nav" className="project-navigation">
      <div className="previous">
        {previous && (
          <Link to={`${langUrlPrefix}/project/${previous.documentId}`}>
            <span className="project-navigation-label">
              ← {t("projectsPage.previous")}
            </span>
            <span className="project-navigation-title">{previous.title}</span>
          </Link>
        )}
      </div>
      <Button
        className="all"
        variant="outlined"
        component={Link}
        to={`${langUrlPrefix}/projects`}
      >
        {t("homePage.allProjects")}
      </Button>
      <div className="next">
        {next && (
          <Link to={`${langUrlPrefix}/project/${next.documentId}`}>
            <span className="project-navigation-label">
              {t("projectsPage.next")} →
            </span>
            <span className="project-navigation-title">{next.title}</span>
          </Link>
        )}
      </div>
    </Box>
  );
};

export default ProjectNavigation;
