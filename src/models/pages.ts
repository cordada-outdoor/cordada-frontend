import { StrapiEntity, StrapiMedia } from "./strapi";

export type Homepage = StrapiEntity & {
  locale: string;
  heroCopy: string;
  servicesCopy: string;
  heroImages: StrapiMedia[] | null;
  contactUsImage: StrapiMedia;
};

export type AboutUsPerson = {
  id: number;
  name: string;
  body: string;
  profilePicture: StrapiMedia;
};

export type AboutUsPage = StrapiEntity & {
  locale: string;
  header: string;
  banner: StrapiMedia;
  sections: AboutUsPerson[];
};
