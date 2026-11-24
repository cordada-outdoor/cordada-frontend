import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { Project } from "models/project";

import { getCollection, getSingle } from "./strapi";

const PAGE_SIZE = 9;

export type ProjectFilters = {
  serviceId?: number;
  clientId?: number;
  // "YYYY-MM"
  month?: string;
};

const toStrapiFilters = ({ serviceId, clientId, month }: ProjectFilters) => {
  const monthStart = month ? dayjs(`${month}-01`) : undefined;

  return {
    services: serviceId ? { id: { $eq: serviceId } } : undefined,
    client: clientId ? { id: { $eq: clientId } } : undefined,
    date: monthStart
      ? {
          $gte: monthStart.format("YYYY-MM-DD"),
          $lt: monthStart.add(1, "month").format("YYYY-MM-DD"),
        }
      : undefined,
  };
};

export const useLatestProjects = (limit: number) =>
  useQuery({
    queryKey: ["projects", "latest", limit],
    queryFn: async () => {
      const res = await getCollection<Project>("api/projects", {
        pagination: { start: 0, limit },
        populate: "*",
        sort: "createdAt:desc",
      });
      return res.data;
    },
  });

export const useProjects = (filters: ProjectFilters) =>
  useInfiniteQuery({
    queryKey: ["projects", "list", filters],
    queryFn: ({ pageParam }) =>
      getCollection<Project>("api/projects", {
        pagination: { page: pageParam, pageSize: PAGE_SIZE },
        filters: toStrapiFilters(filters),
        sort: "createdAt:desc",
        populate: "*",
      }),
    initialPageParam: 1,
    getNextPageParam: ({ meta: { pagination } }) =>
      pagination.page < pagination.pageCount ? pagination.page + 1 : undefined,
  });

export const useProject = (documentId: string) =>
  useQuery({
    queryKey: ["project", documentId],
    queryFn: () =>
      getSingle<Project>(`api/projects/${documentId}`, { populate: "*" }),
  });
