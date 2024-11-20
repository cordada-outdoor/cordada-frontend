import { Project } from "./project";

export type Client = {
  id: number;
  name: string;
  icon: any;
  projects: { data: Project[] };
};
