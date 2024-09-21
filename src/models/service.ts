import { Project } from "./project";

export type ServiceAttributes = {
  name: string;
  description: string;
  project: {
    data: Project[];
  };
  quote: string;
};

export type Service = {
  id: number;
  attributes: ServiceAttributes;
};
