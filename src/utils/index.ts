import { useLocation } from "react-router-dom";

import HomeBg from "assets/images/home_bg.jpg";
import LogoWhite from "assets/logos/logo-big-white.png";
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
    return `${config.cms.host}${img?.url}`;
  }

  const urlForFormat = img?.formats[size]?.url;

  if (urlForFormat) {
    return `${config.cms.host}${urlForFormat}`;
  }

  const baseUrl = img?.url;

  if (baseUrl) {
    // Use the base image, not the formatted one
    return `${config.cms.host}${img?.url}`;
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

export function joinWithCommasAndAmpersand(strings: string[]) {
  const length = strings.length;

  if (length === 0) return "";
  if (length === 1) return strings[0];
  if (length === 2) return `${strings[0]} & ${strings[1]}`;

  const allButLast = strings.slice(0, -1).join(", ");
  const last = strings[length - 1];

  return `${allButLast} & ${last}`;
}

export const getHomeImagesArr = (images?: any[]) => {
  const defaultImg = [
    {
      hero: HomeBg,
      logo: LogoWhite,
    },
  ];

  if (!images?.length) {
    return defaultImg;
  } else {
    const imgWithSize = images.map((image) => {
      return {
        hero: getImageUrl(image) ?? HomeBg,
        logo: LogoWhite,
      };
    });

    return defaultImg.concat(imgWithSize);
  }
};
