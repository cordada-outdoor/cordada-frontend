import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
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
import Loading from "components/Common/Loading";

import DatePicker from "./Common/DatePicker";
import styles from "./ProjectsFilterDialog.module.scss";

export type FilterType = "service" | "date" | "client";

const byName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name);

interface FilterPanelProps {
  children: ReactNode;
  onClose: () => void;
  onRemove: () => void;
}

// Close button, the filter's own control, and a "remove filter" button.
const FilterPanel = ({ children, onClose, onRemove }: FilterPanelProps) => {
  const { t } = useTranslation();
  return (
    <Paper className={styles.modal}>
      <IconButton onClick={onClose} className={styles.closeButton}>
        <Typography className={styles.closeText}>x</Typography>
      </IconButton>
      {children}
      <Button
        onClick={onRemove}
        className={styles.removeButton}
        variant="contained"
      >
        {t("projectsPage.removeFilter")}
      </Button>
    </Paper>
  );
};

interface OptionSelectProps {
  id: string;
  label: string;
  value: string;
  options: { id: number; name: string }[];
  isLoading: boolean;
  onChange: (value: string) => void;
}

const OptionSelect = ({
  id,
  label,
  value,
  options,
  isLoading,
  onChange,
}: OptionSelectProps) =>
  isLoading ? (
    <Loading />
  ) : (
    <FormControl className={styles.select} fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        id={`${id}-select`}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {[...options].sort(byName).map((option) => (
          <MenuItem key={option.id} value={option.id.toString()}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

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

  if (!type) return <div></div>;

  return (
    <FilterPanel onClose={handleClose} onRemove={() => handleSave("")}>
      {type === "service" && (
        <OptionSelect
          id="services"
          label={t("services")}
          value={value}
          options={servicesQuery.data ?? []}
          isLoading={servicesQuery.isLoading}
          onChange={handleSave}
        />
      )}
      {type === "client" && (
        <OptionSelect
          id="clients"
          label={t("projectsPage.client")}
          value={value}
          options={clientsQuery.data ?? []}
          isLoading={clientsQuery.isLoading}
          onChange={handleSave}
        />
      )}
      {type === "date" && <DatePicker onChange={handleSave} value={value} />}
    </FilterPanel>
  );
};

export default ProjectsFilterDialog;
