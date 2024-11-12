import { Client } from "./client";
import { Service } from "./service";

export type ProjectAttributes = {
  title: string;
  client: {
    data: Client;
  };
  image: any;
  body: string;
  date: string;
  services: {
    data: Service[];
  };
};

export type Project = {
  id: number;
  attributes: ProjectAttributes;
};
