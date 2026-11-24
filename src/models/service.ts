import { ProjectAttributes } from "./project";
import { StrapiEntity, StrapiMedia } from "./strapi";

// Scalar fields only, as returned when a service is a nested relation.
export type ServiceAttributes = StrapiEntity & {
  name: string;
  body: string;
  locale: string;
};

// A service fetched with `populate: "*"`.
export type Service = ServiceAttributes & {
  banner: StrapiMedia;
  projects: ProjectAttributes[];
};
