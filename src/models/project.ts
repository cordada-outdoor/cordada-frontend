import { Client } from "./client";
import { Service } from "./service";

export type ProjectAttributes = {
  title: string;
  client: {
    data: Client;
  };
  body: string;
  date: string;
  service: {
    data: Service;
  };
};

export type Project = {
  id: number;
  attributes: ProjectAttributes;
};
