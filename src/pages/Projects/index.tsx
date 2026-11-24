import { useEffect, useState } from "react";
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

import { useClients } from "api/clients";
import { ProjectFilters, useProjects } from "api/projects";
import { useServices } from "api/services";
import Loading from "components/Common/Loading";
import SectionTitle from "components/Common/SectionTitle";
import Layout from "components/Layout/Layout";
import ProjectCard from "components/ProjectCard/ProjectCard";
import ProjectsFilterDialog, {
  FilterType,
} from "components/ProjectsFilterDialog";
import { cx } from "utils/cx";

import styles from "./Projects.module.scss";

type LocationState = { serviceId?: number } | undefined;

const Projects = () => {
  const { t } = useTranslation();
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
      <Box className={styles.projects}>
        <SectionTitle>{t("homePage.ourProjects")}</SectionTitle>
        <Box className={styles.filters}>
          <Typography className={styles.filterTitle}>
            {t("projectsPage.filterBy")}
          </Typography>
          <Button
            onClick={() => setFilterDialog("service")}
            className={cx(
              styles.filterButton,
              !!filters.serviceId && styles.selected,
            )}
          >
            {t("projectsPage.type")}
          </Button>
          <Button
            onClick={() => setFilterDialog("date")}
            className={cx(
              styles.filterButton,
              !!filters.month && styles.selected,
            )}
          >
            {t("projectsPage.date")}
          </Button>
          <Button
            onClick={() => setFilterDialog("client")}
            className={cx(
              styles.filterButton,
              !!filters.clientId && styles.selected,
            )}
          >
            {t("projectsPage.client")}
          </Button>
        </Box>
        {serviceName && (
          <Chip
            className={styles.chip}
            label={serviceName}
            variant="outlined"
          />
        )}
        {filters.month && (
          <Chip
            className={styles.chip}
            label={filters.month}
            variant="outlined"
          />
        )}
        {clientName && (
          <Chip className={styles.chip} label={clientName} variant="outlined" />
        )}
        <Box className={styles.list}>
          <Grid container spacing={2}>
            {projectsQuery.isLoading ? (
              <Loading />
            ) : (
              projectsQuery.data?.pages.map((page) =>
                page.data.map((p) => (
                  <Grid item key={p.documentId} md={4} xs={12} sm={6}>
                    <Box className={styles.projectContainer}>
                      <ProjectCard project={p} />
                    </Box>
                  </Grid>
                )),
              )
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
                className={styles.loadMore}
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
