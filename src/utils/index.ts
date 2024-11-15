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

export const useQueryParams = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  return params;
};

export const getImageUrl = (
  img: any,
  size?: "thumbnail" | "medium" | "large" | "small",
) => {
  if (!size) {
    return `${config.cms.host}${img?.data?.attributes?.url}`;
  }

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
    const regex =
      /\[([^\]]+)\]\(https:\/\/www\.(instagram\.com|youtube\.com)\/([^\)]+)\)/g;

    let result = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(markdown)) !== null) {
      if (match.index > lastIndex) {
        let markdownText = markdown.slice(lastIndex, match.index);
        result.push({ type: "markdown", body: markdownText });
      }
      if (match[2] === "instagram.com") {
        result.push({
          type: "instagram-link",
          body: `https://www.instagram.com/${match[3]}`,
        });
      } else if (match[2] === "youtube.com") {
        result.push({
          type: "youtube-link",
          body: `https://www.youtube.com/${match[3]}`,
        });
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < markdown.length) {
      result.push({ type: "markdown", body: markdown.slice(lastIndex) });
    }
    return result;
  }
};

export const getUrlWithoutLang = (url: string) => {
  if (!url.length) return "/";
  return url.replace("/ca", "").replace("/en", "").replace("/es", "");
};
