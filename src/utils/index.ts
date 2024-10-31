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

export const getMarkdownWithEmbeds = (markdown: string) => {
  if (!markdown?.length) return [{ type: "markdown", body: "" }];
  else {
    const regex = /\[([^\]]+)\]\(https:\/\/www\.instagram\.com\/([^\)]+)\)/g;

    let result = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(markdown)) !== null) {
      if (match.index > lastIndex) {
        let markdownText = markdown.slice(lastIndex, match.index);
        result.push({ type: "markdown", body: markdownText });
      }

      result.push({
        type: "instagram-link",
        body: `https://www.instagram.com/${match[2]}`,
      });

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < markdown.length) {
      result.push({ type: "markdown", body: markdown.slice(lastIndex) });
    }
    return result;
  }
};
