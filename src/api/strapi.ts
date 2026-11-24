import { http } from "http/client";
import { StrapiCollectionResponse, StrapiSingleResponse } from "models/strapi";

// Strapi's default page size is 25; lists we show in full ask for more so
// they don't get silently truncated.
export const FULL_LIST_PAGE_SIZE = 100;

export const getCollection = async <T>(
  url: string,
  params?: Record<string, unknown>,
) => {
  const res = await http.get<StrapiCollectionResponse<T>>(url, { params });
  return res.data;
};

export const getSingle = async <T>(
  url: string,
  params?: Record<string, unknown>,
) => {
  const res = await http.get<StrapiSingleResponse<T>>(url, { params });
  return res.data.data;
};
