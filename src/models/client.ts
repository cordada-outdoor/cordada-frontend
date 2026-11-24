import { ProjectAttributes } from "./project";
import { StrapiEntity, StrapiMedia } from "./strapi";

// Scalar fields only, as returned when a client is a nested relation.
export type ClientAttributes = StrapiEntity & {
  name: string;
  homepageOrder: number | null;
};

// A client fetched with `populate: "*"`.
export type Client = ClientAttributes & {
  icon: StrapiMedia;
  projects: ProjectAttributes[];
};
