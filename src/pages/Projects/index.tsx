import "./index.scss";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import Layout from "components/Layout/Layout";
import PageContainer from "components/Layout/PageContainer";
import ProjectCard from "components/ProjectCard";
import ProjectsFilters, {
  EMPTY_FILTERS,
  ProjectFilters,
} from "components/ProjectsFilters";
import { http } from "http/client";
import { Project } from "models/project";

const FILTER_KEYS = Object.keys(EMPTY_FILTERS) as (keyof ProjectFilters)[];

const dateRange = ({ year, month }: ProjectFilters) => {
  if (!year) return undefined;
  if (!month)
    return { $gte: `${year}-01-01`, $lt: `${Number(year) + 1}-01-01` };

  const next = new Date(Number(year), Number(month), 1);
  const nextMonth = String(next.getMonth() + 1).padStart(2, "0");
  return {
    $gte: `${year}-${month}-01`,
    $lt: `${next.getFullYear()}-${nextMonth}-01`,
  };
};

const Projects = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { search } = useLocation();

  // Filters live in the query string so filtered views can be shared
  const filters = useMemo(() => {
    const params = new URLSearchParams(search);
    return FILTER_KEYS.reduce(
      (acc, key) => ({ ...acc, [key]: params.get(key) ?? "" }),
      EMPTY_FILTERS,
    );
  }, [search]);

  const setFilters = (next: ProjectFilters) => {
    const params = new URLSearchParams();
    FILTER_KEYS.forEach((key) => next[key] && params.set(key, next[key]));
    history.replace({ search: params.toString() });
  };

  const projectsQuery = useInfiniteQuery({
    queryKey: ["projects", filters],
    queryFn: async ({ pageParam }) => {
      const res = await http.get<{ data: Project[]; meta: any }>(
        "api/projects",
        {
          params: {
            pagination: {
              page: pageParam,
              pageSize: 9,
            },
            filters: {
              services: filters.service
                ? { id: { $eq: filters.service } }
                : undefined,
              date: dateRange(filters),
              client: filters.client
                ? { id: { $eq: filters.client } }
                : undefined,
            },
            sort: "createdAt:desc",
            populate: "*",
          },
        },
      );

      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.pagination.page < lastPage.meta.pagination.pageCount) {
        return lastPage.meta.pagination.page + 1;
      }

      return null;
    },
  });

  return (
    <Layout>
      <PageContainer className="projects">
        <Typography variant="h3" component="h1" fontWeight={600}>
          {t("homePage.ourProjects")}
        </Typography>
        <ProjectsFilters filters={filters} onChange={setFilters} />
        <Box className="projects-section">
          <Grid container spacing={2}>
            {projectsQuery.isLoading ? (
              <CircularProgress className="loading-indicator" />
            ) : (
              projectsQuery.data?.pages.map((page, i: number) => {
                return page.data.map((p) => (
                  <Grid item key={i} md={4} xs={12} sm={6}>
                    <ProjectCard project={p} titleComponent="h2" />
                  </Grid>
                ));
              })
            )}
          </Grid>
        </Box>
        {projectsQuery.hasNextPage && (
          <Box
            margin="auto"
            p={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {projectsQuery.isFetching ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={() => {
                  projectsQuery.fetchNextPage();
                }}
              >
                {t("loadMore")}
              </Button>
            )}
          </Box>
        )}
      </PageContainer>
    </Layout>
  );
};

export default Projects;
