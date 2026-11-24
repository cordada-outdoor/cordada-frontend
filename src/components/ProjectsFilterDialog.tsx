import { useTranslation } from "react-i18next";

import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

import { useClients } from "api/clients";
import { useServices } from "api/services";

import DatePicker from "./Common/DatePicker";

export type FilterType = "service" | "date" | "client";

const byName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name);

interface ProjectsFilterDialogProps {
  type: FilterType | undefined;
  value?: string;
  // Receives the selected id (service/client) or "YYYY-MM" (date); an empty
  // string removes the filter.
  handleSave: (value: string) => void;
  handleClose: () => void;
}
const ProjectsFilterDialog = ({
  type,
  value = "",
  handleSave,
  handleClose,
}: ProjectsFilterDialogProps) => {
  const { t } = useTranslation();
  const servicesQuery = useServices();
  const clientsQuery = useClients();

  switch (type) {
    case "service": {
      const services = [...(servicesQuery.data ?? [])].sort(byName);
      return (
        <Paper className="filter-modal">
          <IconButton
            onClick={() => handleClose()}
            className="close-button-icon"
          >
            <Typography className="close-button-text">x</Typography>
          </IconButton>
          {servicesQuery.isLoading ? (
            <CircularProgress className="loading-indicator" />
          ) : (
            <FormControl className="select-container" fullWidth>
              <InputLabel id="services-label">{t("services")}</InputLabel>
              <Select
                id="services-select"
                value={value}
                label={t("services")}
                onChange={(e) => handleSave(e.target.value)}
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id.toString()}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            onClick={() => handleSave("")}
            className="remove-filter-button"
            variant="contained"
          >
            {t("projectsPage.removeFilter")}
          </Button>
        </Paper>
      );
    }
    case "date":
      return (
        <Paper className="filter-modal">
          <IconButton
            onClick={() => handleClose()}
            className="close-button-icon"
          >
            <Typography className="close-button-text">x</Typography>
          </IconButton>
          <DatePicker onChange={(val) => handleSave(val)} value={value} />
          <Button
            onClick={() => handleSave("")}
            className="remove-filter-button"
            variant="contained"
          >
            {t("projectsPage.removeFilter")}
          </Button>
        </Paper>
      );
    case "client": {
      const clients = [...(clientsQuery.data ?? [])].sort(byName);
      return (
        <Paper className="filter-modal">
          <IconButton
            onClick={() => handleClose()}
            className="close-button-icon"
          >
            <Typography className="close-button-text">x</Typography>
          </IconButton>
          {clientsQuery.isLoading ? (
            <CircularProgress className="loading-indicator" />
          ) : (
            <FormControl className="select-container" fullWidth>
              <InputLabel id="clients-label">
                {t("projectsPage.client")}
              </InputLabel>
              <Select
                id="clients-select"
                value={value}
                label={t("projectsPage.client")}
                onChange={(e) => handleSave(e.target.value)}
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id.toString()}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            onClick={() => handleSave("")}
            className="remove-filter-button"
            variant="contained"
          >
            {t("projectsPage.removeFilter")}
          </Button>
        </Paper>
      );
    }
    default:
      return <div></div>;
  }
};

export default ProjectsFilterDialog;
