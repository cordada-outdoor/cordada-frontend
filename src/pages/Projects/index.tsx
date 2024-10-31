import Layout from "components/Layout/Layout";
import "./index.scss";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import HomeBg from "assets/images/home_bg.jpg";
import PreviewImage from "components/Common/PreviewImage";
import { useQuery } from "@tanstack/react-query";
import { http } from "http/client";
import { Link, useLocation } from "react-router-dom";
import useUrlLang from "utils/useUrlLang";
import { getImageUrl } from "utils";
import { useEffect, useState } from "react";
import ProjectsFilterDialog from "components/ProjectsFilterDialog";

type Filters = {
  service?: string;
  date?: string;
  client?: string;
  maxDate?: string;
};

const Projects = () => {
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();
  const location = useLocation();

  const [filters, setFilters] = useState<Filters>({
    //@ts-expect-error getting weird type error, working just fine
    service: location?.state?.service
      ? //@ts-expect-error getting weird type error, working just fine
        location?.state?.service.toString()
      : "",
    date: "",
    client: "",
    maxDate: "",
  });
  window.history.replaceState({}, "");
  const [filterDialog, setFilterDialog] = useState<
    "service" | "date" | "client" | undefined
  >(undefined);
  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await http.get("api/projects", {
        params: {
          filters: {
            service: filters.service
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
          populate: "*",
        },
      });

      return res.data;
    },
  });

  useEffect(() => {
    projects.refetch();
  }, [filters]);

  useEffect(() => {});

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
        <Typography variant="h3">{t("homePage.ourProjects")}</Typography>
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
            {projects.isFetching ? (
              <CircularProgress className="loading-indicator" />
            ) : (
              projects.data?.data.map((p: any, i: number) => {
                const { title, body, client, image } = p.attributes;
                const imgUrl = getImageUrl(image, "small");

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
                            <Typography variant="h6">{title}</Typography>
                            <Typography variant="subtitle1">
                              {client.data?.attributes?.name?.toUpperCase() ??
                                ""}{" "}
                              X CORDADA
                            </Typography>
                            <Typography
                              className="project-description"
                              fontWeight={300}
                            >
                              {body}
                            </Typography>
                            <Box className="see-more-button-container">
                              <Link
                                component={Button}
                                to={`${langUrlPrefix}/project/${p.id}`}
                                className="see-more-button"
                              >
                                {t("seeMore")}
                              </Link>
                            </Box>
                          </Box>
                        }
                      />
                    </Box>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
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
