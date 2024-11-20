import { Project } from "./project";

export type Service = {
  id: number;
  name: string;
  description: string;
  project: {
    data: Project[];
  };
  quote: string;
};
