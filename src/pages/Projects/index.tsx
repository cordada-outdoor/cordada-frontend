import "./index.scss";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import Layout from "components/Layout/Layout";
import PageContainer from "components/Layout/PageContainer";
import ProjectCard from "components/ProjectCard";
import ProjectsFilterDialog from "components/ProjectsFilterDialog";
import { http } from "http/client";
import { Project } from "models/project";

type Filters = {
  service?: string;
  date?: string;
  client?: string;
  maxDate?: string;
};

const Projects = () => {
  const { t } = useTranslation();
  const location = useLocation<any>();

  const [filters, setFilters] = useState<Filters>({
    service: location?.state?.service
      ? location?.state?.service.toString()
      : "",
    date: "",
    client: "",
    maxDate: "",
  });

  const [filtersTitle, setFiltersTitle] = useState({
    service: "",
    date: "",
    client: "",
  });
  window.history.replaceState({}, "");

  const [filterDialog, setFilterDialog] = useState<
    "service" | "date" | "client" | undefined
  >(undefined);

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
                ? {
                    id: {
                      $eq: filters.service,
                    },
                  }
                : undefined,
              date: filters.date
                ? {
                    $gte: filters.date + "-01",
                    $lt: filters.maxDate,
                  }
                : undefined,
              client: filters.client
                ? {
                    id: {
                      $eq: filters.client,
                    },
                  }
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

  const handleChangeFilters = (value: string) => {
    const filterToChange = filterDialog ?? "date";
    const newFilters = { ...filters };
    let val = value;

    if (filterToChange !== "date") {
      val = value.split("///")[0];
      setFiltersTitle((prev) => ({
        ...prev,
        [filterToChange]: value.split("///")[1],
      }));
    }

    newFilters[filterToChange as keyof Filters] = val;

    if (filterToChange === "date") {
      const month = val.split("-")[1];
      const nextMonth = Number(month) + 1;
      const monthToString =
        nextMonth < 10 ? "0" + nextMonth.toString() : nextMonth.toString();
      const nextDate = val.split("-")[0] + "-" + monthToString + "-01";
      newFilters.maxDate = nextDate;
      setFiltersTitle((prev) => ({ ...prev, [filterToChange]: val }));
    }

    setFilters(newFilters);
    setFilterDialog(undefined);
  };

  return (
    <Layout>
      <PageContainer className="projects">
        <Typography variant="h3" component="h1" fontWeight={600}>
          {t("homePage.ourProjects")}
        </Typography>
        <Box className="filter-section">
          <Typography className="filter-title">
            {t("projectsPage.filterBy")}
          </Typography>
          <Button
            variant="text"
            onClick={() => setFilterDialog("service")}
            className={`filter-button ${filters.service !== "" ? "selected-filter-button" : ""}`}
          >
            {t("projectsPage.type")}
          </Button>
          <Button
            variant="text"
            onClick={() => setFilterDialog("date")}
            className={`filter-button ${filters.date !== "" ? "selected-filter-button" : ""}`}
          >
            {t("projectsPage.date")}
          </Button>
          <Button
            variant="text"
            onClick={() => setFilterDialog("client")}
            className={`filter-button ${filters.client !== "" ? "selected-filter-button" : ""}`}
          >
            {t("projectsPage.client")}
          </Button>
        </Box>
        {filtersTitle.service && (
          <Chip sx={{ m: 1 }} label={filtersTitle.service} variant="outlined" />
        )}
        {filtersTitle.date && (
          <Chip sx={{ m: 1 }} label={filtersTitle.date} variant="outlined" />
        )}
        {filtersTitle.client && (
          <Chip sx={{ m: 1 }} label={filtersTitle.client} variant="outlined" />
        )}
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
      <Dialog
        open={filterDialog ? true : false}
        onClose={() => setFilterDialog(undefined)}
      >
        <ProjectsFilterDialog
          handleClose={() => setFilterDialog(undefined)}
          type={filterDialog}
          handleSave={(value) => handleChangeFilters(value)}
          value={filters[filterDialog ?? "date"]}
        />
      </Dialog>
    </Layout>
  );
};

export default Projects;
