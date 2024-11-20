import { Client } from "./client";
import { Service } from "./service";

export type Project = {
  id: number;
  title: string;
  client: {
    data: Client;
  };
  image: any;
  body: string;
  subtitle: string;
  date: string;
  services: {
    data: Service[];
  };
};
