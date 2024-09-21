import { Project } from "./project";

export type ClientAttributes = {
  name: string;
  projects: { data: Project[] };
};
export type Client = {
  id: number;
  attributes: ClientAttributes;
};
