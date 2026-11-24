import "./index.scss";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";

import { useClients } from "api/clients";
import { ProjectFilters, useProjects } from "api/projects";
import { useServices } from "api/services";
import HomeBg from "assets/images/home_bg.jpg";
import PreviewImage from "components/Common/PreviewImage";
import Layout from "components/Layout/Layout";
import ProjectsFilterDialog, {
  FilterType,
} from "components/ProjectsFilterDialog";
import { getImageUrl } from "utils";
import useUrlLang from "utils/useUrlLang";

type LocationState = { serviceId?: number } | undefined;

const Projects = () => {
  const { t } = useTranslation();
  const { langUrlPrefix } = useUrlLang();
  const location = useLocation<LocationState>();

  // A service can be preselected when arriving from the Services page.
  const [filters, setFilters] = useState<ProjectFilters>(() => ({
    serviceId: location.state?.serviceId,
  }));

  // Clear the router state once it's been read, so a reload doesn't
  // re-apply it.
  useEffect(() => {
    window.history.replaceState({}, "");
  }, []);

  const [filterDialog, setFilterDialog] = useState<FilterType>();

  const projectsQuery = useProjects(filters);
  const { data: services } = useServices();
  const { data: clients } = useClients();

  const serviceName = services?.find((s) => s.id === filters.serviceId)?.name;
  const clientName = clients?.find((c) => c.id === filters.clientId)?.name;

  const dialogValue = {
    service: filters.serviceId?.toString(),
    client: filters.clientId?.toString(),
    date: filters.month,
  }[filterDialog ?? "date"];

  // An empty value removes the filter.
  const handleChangeFilters = (value: string) => {
    setFilters((prev) => {
      switch (filterDialog) {
        case "service":
          return { ...prev, serviceId: value ? Number(value) : undefined };
        case "client":
          return { ...prev, clientId: value ? Number(value) : undefined };
        case "date":
          return { ...prev, month: value || undefined };
        default:
          return prev;
      }
    });
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
            className={`filter-button ${filters.serviceId ? "selected-filter-button" : ""}`}
          >
            {t("projectsPage.type")}
          </Button>
          <Button
            onClick={() => setFilterDialog("date")}
            className={`filter-button ${filters.month ? "selected-filter-button" : ""}`}
          >
            {t("projectsPage.date")}
          </Button>
          <Button
            onClick={() => setFilterDialog("client")}
            className={`filter-button ${filters.clientId ? "selected-filter-button" : ""}`}
          >
            {t("projectsPage.client")}
          </Button>
        </Box>
        {serviceName && (
          <Chip sx={{ m: 1 }} label={serviceName} variant="outlined" />
        )}
        {filters.month && (
          <Chip sx={{ m: 1 }} label={filters.month} variant="outlined" />
        )}
        {clientName && (
          <Chip sx={{ m: 1 }} label={clientName} variant="outlined" />
        )}
        <Box className="projects-section">
          <Grid container spacing={2}>
            {projectsQuery.isLoading ? (
              <CircularProgress className="loading-indicator" />
            ) : (
              projectsQuery.data?.pages.map((page) => {
                return page.data.map((p) => {
                  const { title, subtitle, client, image } = p;
                  const imgUrl = getImageUrl(image, "large");

                  return (
                    <Grid item key={p.documentId} md={4} xs={12} sm={6}>
                      <Box className="project-container">
                        <PreviewImage
                          src={imgUrl ?? HomeBg}
                          hoverable={true}
                          title={title}
                          description={`${client?.name?.toUpperCase() ?? ""} X CORDADA`}
                          hoverContent={
                            <Box className="project-card">
                              <Typography variant="h5" fontWeight={600}>
                                {title}
                              </Typography>
                              <Typography className="project-description">
                                {subtitle}
                              </Typography>
                              <Box className="see-more-button-container">
                                <Link
                                  to={`${langUrlPrefix}/project/${p.documentId}`}
                                >
                                  <Button
                                    className="see-more-button"
                                    variant="contained"
                                  >
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
          value={dialogValue}
        />
      </Dialog>
    </Layout>
  );
};

export default Projects;
