import { useLocation } from "react-router-dom";

import { config } from "config";

export function findLangName(language: string) {
  switch (language) {
    case "ca":
      return "CAT";
    case "es":
      return "ESP";
    case "en":
      return "ENG";
  }
}

export const isEven = (x: number) => {
  return x % 2 === 0;
};

export const formatDate = (date: string) => {
  const projectDate = new Date(date ?? undefined);
  const yyyy = projectDate.getFullYear();
  const mm =
    projectDate.getMonth() + 1 < 10
      ? "0" + projectDate.getMonth()
      : projectDate.getMonth();
  //can add day if we want
  // const dd = Number(projectDate.getDate()) < 10 ? '0' + projectDate.getDate() : projectDate.getDate();

  return mm + "/" + yyyy;
};

export const useQueryParams = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  return params;
};

export const getImageUrl = (
  img: any,
  size: "thumbnail" | "medium" | "large" | "small",
) => {
  const urlForFormat = img?.data?.attributes?.formats[size]?.url;

  if (urlForFormat) {
    return `${config.cms.host}${urlForFormat}`;
  }

  const baseUrl = img?.data?.attributes?.url;

  if (baseUrl) {
    // Use the base image, not the formatted one
    return `${config.cms.host}${img?.data?.attributes?.url}`;
  }

  return null;
};
