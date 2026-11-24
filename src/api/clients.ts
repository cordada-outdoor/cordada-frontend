import { useQuery } from "@tanstack/react-query";

import { Client } from "models/client";

import { FULL_LIST_PAGE_SIZE, getCollection, getSingle } from "./strapi";

export const useClients = () =>
  useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await getCollection<Client>("api/clients", {
        pagination: { pageSize: FULL_LIST_PAGE_SIZE },
        populate: "*",
        sort: "homepageOrder:asc",
      });
      return res.data;
    },
  });

export const useClient = (documentId: string) =>
  useQuery({
    queryKey: ["client", documentId],
    queryFn: () =>
      getSingle<Client>(`api/clients/${documentId}`, { populate: "*" }),
  });
