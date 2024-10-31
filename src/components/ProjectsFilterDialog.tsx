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
import { useQuery } from "@tanstack/react-query";

import { http } from "http/client";
import { Client } from "models/client";
import { Service } from "models/service";

import DatePicker from "./Common/DatePicker";

interface ProjectsFilterDialogProps {
  type: "service" | "date" | "client" | undefined;
  value?: string;
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
  const urlPath = type === "service" ? "api/services" : "api/clients";
  const query = useQuery({
    queryKey: [type],
    queryFn: async () => {
      const res = await http.get(urlPath, {});
      return res.data;
    },
  });
  const isLoading = query?.isLoading;

  switch (type) {
    case "service":
      const services = query?.data?.data;
      return (
        <Paper className="filter-modal">
          <IconButton
            onClick={() => handleClose()}
            className="close-button-icon"
          >
            <Typography className="close-button-text">x</Typography>
          </IconButton>
          {isLoading ? (
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
                {services?.map((service: Service) => (
                  <MenuItem value={service.id.toString()}>
                    {service.attributes.name}
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
    case "client":
      const clients = query?.data?.data;
      return (
        <Paper className="filter-modal">
          <IconButton
            onClick={() => handleClose()}
            className="close-button-icon"
          >
            <Typography className="close-button-text">x</Typography>
          </IconButton>
          {isLoading ? (
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
                {clients?.map((client: Client) => (
                  <MenuItem value={client.id.toString()}>
                    {client.attributes.name}
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
    default:
      return <div></div>;
  }
};

export default ProjectsFilterDialog;
