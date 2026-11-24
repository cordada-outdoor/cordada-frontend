import { useQuery } from "@tanstack/react-query";

import { Service } from "models/service";

import { FULL_LIST_PAGE_SIZE, getCollection } from "./strapi";

export const useServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await getCollection<Service>("api/services", {
        pagination: { pageSize: FULL_LIST_PAGE_SIZE },
        populate: "*",
      });
      return res.data;
    },
  });
