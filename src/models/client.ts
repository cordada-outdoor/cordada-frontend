import { Project } from "./project";

export type ClientAttributes = {
  name: string;
  icon: any;
  projects: { data: Project[] };
};
export type Client = {
  id: number;
  attributes: ClientAttributes;
};
