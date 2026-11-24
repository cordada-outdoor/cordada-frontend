import { ClientAttributes } from "./client";
import { ServiceAttributes } from "./service";
import { StrapiEntity, StrapiMedia } from "./strapi";

// Scalar fields only, as returned when a project is a nested relation.
export type ProjectAttributes = StrapiEntity & {
  title: string;
  subtitle: string;
  date: string;
  body: string;
  locale: string;
};

// A project fetched with `populate: "*"`.
export type Project = ProjectAttributes & {
  image: StrapiMedia;
  gallery: StrapiMedia[] | null;
  client: ClientAttributes | null;
  services: ServiceAttributes[];
};
