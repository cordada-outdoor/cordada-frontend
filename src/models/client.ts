import { Project } from "./project";

export type Client = {
  id: number;
  documentId: string;
  name: string;
  icon: any;
  projects: { data: Project[] };
};
