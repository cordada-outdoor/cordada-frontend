import { useQuery } from "@tanstack/react-query";

import { AboutUsPage, Homepage } from "models/pages";

import { getSingle } from "./strapi";

export const useHomepage = () =>
  useQuery({
    queryKey: ["homepage"],
    queryFn: () => getSingle<Homepage>("api/homepage", { populate: "*" }),
  });

export const useAboutUsPage = () =>
  useQuery({
    queryKey: ["about-us-page"],
    queryFn: () =>
      getSingle<AboutUsPage>("api/about-us-page", {
        populate: {
          banner: { populate: "*" },
          sections: { populate: "*" },
        },
      }),
  });
