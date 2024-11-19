import "./index.scss";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import HomeBg from "assets/images/home_bg.jpg";
import PreviewImage from "components/Common/PreviewImage";
import Layout from "components/Layout/Layout";
import ProjectsFilterDialog from "components/ProjectsFilterDialog";
import { http } from "http/client";
import { Project } from "models/project";
import { getImageUrl } from "utils";
import useUrlLang from "utils/useUrlLang";

type Filters = {
  service?: string;
  date?: string;
  client?: string;
  maxDate?: string;
};

const Projects = () => {
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();
  const location = useLocation<any>();

  const [filters, setFilters] = useState<Filters>({
    service: location?.state?.service
      ? location?.state?.service.toString()
      : "",
    date: "",
    client: "",
    maxDate: "",
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

    newFilters[filterToChange as keyof Filters] = value;

    if (filterToChange === "date") {
      const month = value.split("-")[1];
      const nextMonth = Number(month) + 1;
      const monthToString =
        nextMonth < 10 ? "0" + nextMonth.toString() : nextMonth.toString();
      const nextDate = value.split("-")[0] + "-" + monthToString + "-01";
      newFilters.maxDate = nextDate;
    }

    setFilters(newFilters);
    setFilterDialog(undefined);
  };

  return (
    <Layout>
      <Box className="projects">
        <Typography variant="h3" fontWeight={600}>
          {t("homePage.ourProjects")}
        </Typography>
        <Box className="filter-section">
          <Typography className="filter-title">
            {t("projectsPage.filterBy")}
          </Typography>
          <Button
            onClick={() => setFilterDialog("service")}
            className={`filter-button ${filters.service !== "" ? "selected-filter-button" : ""}`}
          >
            {t("projectsPage.type")}
          </Button>
          <Button
            onClick={() => setFilterDialog("date")}
            className={`filter-button ${filters.date !== "" ? "selected-filter-button" : ""}`}
          >
            {t("projectsPage.date")}
          </Button>
          <Button
            onClick={() => setFilterDialog("client")}
            className={`filter-button ${filters.client !== "" ? "selected-filter-button" : ""}`}
          >
            {t("projectsPage.client")}
          </Button>
        </Box>
        <Box className="projects-section">
          <Grid container spacing={2}>
            {projectsQuery.isLoading ? (
              <CircularProgress className="loading-indicator" />
            ) : (
              projectsQuery.data?.pages.map((page, i: number) => {
                return page.data.map((p) => {
                  const { title, subtitle, client, image } = p.attributes;
                  const imgUrl = getImageUrl(image, "large");

                  return (
                    <Grid item key={i} md={4} xs={12} sm={6}>
                      <Box className="project-container">
                        <PreviewImage
                          src={imgUrl ?? HomeBg}
                          hoverable={true}
                          title={title}
                          description={`${client.data?.attributes?.name?.toUpperCase() ?? ""} X CORDADA`}
                          hoverContent={
                            <Box className="project-card">
                              <Typography variant="h5" fontWeight={600}>
                                {title}
                              </Typography>
                              <Typography className="project-description">
                                {subtitle}
                              </Typography>
                              <Box className="see-more-button-container">
                                <Link to={`${langUrlPrefix}/project/${p.id}`}>
                                  <Button className="see-more-button">
                                    {t("seeMore")}
                                  </Button>
                                </Link>
                              </Box>
                            </Box>
                          }
                        />
                      </Box>
                    </Grid>
                  );
                });
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
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  borderRadius: "0px",
                }}
                onClick={() => {
                  projectsQuery.fetchNextPage();
                }}
              >
                {t("loadMore")}
              </Button>
            )}
          </Box>
        )}
      </Box>
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
