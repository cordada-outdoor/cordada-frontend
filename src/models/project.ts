import { Client } from "./client";
import { Service } from "./service";

export type Project = {
  id: number;
  documentId: string;
  title: string;
  client: Client;
  image: any;
  body: string;
  subtitle: string;
  date: string;
  services: Service[];
  gallery: any[];
};
