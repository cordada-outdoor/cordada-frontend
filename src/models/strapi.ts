// Shapes of Strapi v5 REST responses. Content-type schemas live in the
// cordada-cms repo (src/api/*/content-types/*/schema.json).

export type StrapiEntity = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiMediaSize = "thumbnail" | "small" | "medium" | "large";

export type StrapiMediaFormat = {
  url: string;
  name: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
};

export type StrapiMedia = StrapiEntity & {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  url: string;
  mime: string;
  width: number | null;
  height: number | null;
  // Only the sizes smaller than the original are generated, and non-image
  // files have no formats at all.
  formats: Partial<Record<StrapiMediaSize, StrapiMediaFormat>> | null;
};

export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta: { pagination: StrapiPagination };
};

export type StrapiSingleResponse<T> = {
  data: T;
  meta: Record<string, never>;
};
