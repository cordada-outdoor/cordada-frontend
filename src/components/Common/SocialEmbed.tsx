import { useTranslation } from "react-i18next";
import { InstagramEmbed, YouTubeEmbed } from "react-social-media-embed";

import { Box, useMediaQuery } from "@mui/material";

import { theme } from "utils/theme";

interface SocialEmbedProps {
  type: "instagram" | "youtube";
  url: string;
}

const INSTAGRAM_WIDTH = 328;

// Shown until the third-party embed script renders, and as a fallback if it
// never does
const EmbedPlaceholder = ({ type, url }: SocialEmbedProps) => {
  const { t } = useTranslation();

  return (
    <Box className={`embed-placeholder ${type}`}>
      <a href={url} target="_blank" rel="noreferrer">
        {type === "instagram"
          ? t("embeds.viewOnInstagram")
          : t("embeds.viewOnYouTube")}
      </a>
    </Box>
  );
};

const SocialEmbed = ({ type, url }: SocialEmbedProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const placeholder = <EmbedPlaceholder type={type} url={url} />;

  return (
    <Box className="markdown-container social-embed">
      {type === "instagram" ? (
        <InstagramEmbed
          style={{ overflow: "visible" }}
          width={INSTAGRAM_WIDTH}
          url={url}
          embedPlaceholder={placeholder}
        />
      ) : (
        <YouTubeEmbed
          width={isMobile ? "100%" : undefined}
          url={url}
          embedPlaceholder={placeholder}
        />
      )}
    </Box>
  );
};

export default SocialEmbed;
