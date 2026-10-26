import { useTranslation } from "react-i18next";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { http } from "http/client";
import { Client } from "models/client";
import { Service } from "models/service";

export type ProjectFilters = {
  service: string;
  client: string;
  year: string;
  month: string;
};

export const EMPTY_FILTERS: ProjectFilters = {
  service: "",
  client: "",
  year: "",
  month: "",
};

// Used until the oldest project's date has loaded
const FALLBACK_FIRST_YEAR = 2023;

const years = (firstYear: number) => {
  const current = new Date().getFullYear();
  return Array.from({ length: current - firstYear + 1 }, (_, i) =>
    String(current - i),
  );
};

const months = (lang: string) =>
  Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: new Intl.DateTimeFormat(lang, { month: "long" }).format(
      new Date(2000, i, 1),
    ),
  }));

interface ProjectsFiltersProps {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
}

const ProjectsFilters = ({ filters, onChange }: ProjectsFiltersProps) => {
  const { t, i18n } = useTranslation();

  const servicesQuery = useQuery({
    queryKey: ["services", "filter-options"],
    queryFn: async () => {
      const res = await http.get<{ data: Service[] }>("api/services", {
        params: { fields: ["name"] },
      });
      return res.data.data;
    },
  });

  const clientsQuery = useQuery({
    queryKey: ["clients", "filter-options"],
    queryFn: async () => {
      const res = await http.get<{ data: Client[] }>("api/clients", {
        params: { fields: ["name"], sort: "name:asc" },
      });
      return res.data.data;
    },
  });

  const firstYearQuery = useQuery({
    queryKey: ["projects", "first-year"],
    queryFn: async () => {
      const res = await http.get<{ data: { date: string }[] }>("api/projects", {
        params: {
          fields: ["date"],
          sort: "date:asc",
          filters: { date: { $notNull: true } },
          pagination: { pageSize: 1 },
        },
      });
      const date = res.data.data[0]?.date;
      return date ? new Date(date).getFullYear() : FALLBACK_FIRST_YEAR;
    },
  });

  const set = (key: keyof ProjectFilters, value: string) => {
    const next = { ...filters, [key]: value };
    // A month without a year can't be filtered on
    if (key === "year" && !value) next.month = "";
    onChange(next);
  };

  const hasFilters = Object.values(filters).some(Boolean);

  const select = (
    key: keyof ProjectFilters,
    label: string,
    options: { value: string; label: string }[],
    disabled = false,
  ) => (
    <FormControl size="small" sx={{ minWidth: 170 }} disabled={disabled}>
      <InputLabel id={`filter-${key}-label`}>{label}</InputLabel>
      <Select
        labelId={`filter-${key}-label`}
        value={filters[key]}
        label={label}
        onChange={(e) => set(key, e.target.value)}
      >
        <MenuItem value="">
          <em>{t("projectsPage.any")}</em>
        </MenuItem>
        {options.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      gap={1.5}
      className="filter-section"
      role="group"
      aria-label={t("projectsPage.filterBy")}
    >
      {select(
        "service",
        t("projectsPage.type"),
        (servicesQuery.data ?? []).map((s) => ({
          value: String(s.id),
          label: s.name,
        })),
      )}
      {select(
        "client",
        t("projectsPage.client"),
        (clientsQuery.data ?? []).map((c) => ({
          value: String(c.id),
          label: c.name,
        })),
      )}
      {select(
        "year",
        t("projectsPage.year"),
        years(firstYearQuery.data ?? FALLBACK_FIRST_YEAR).map((y) => ({
          value: y,
          label: y,
        })),
      )}
      {select(
        "month",
        t("projectsPage.month"),
        months(i18n.language),
        !filters.year,
      )}
      {hasFilters && (
        <Button variant="text" onClick={() => onChange(EMPTY_FILTERS)}>
          {t("projectsPage.clearFilters")}
        </Button>
      )}
    </Stack>
  );
};

export default ProjectsFilters;
