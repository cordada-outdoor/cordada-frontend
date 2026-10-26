import { useTranslation } from "react-i18next";
import { InstagramEmbed, YouTubeEmbed } from "react-social-media-embed";

import { Box, Button, Typography, useMediaQuery } from "@mui/material";

import { theme } from "utils/theme";
import useCookieConsent, { setCookieConsent } from "utils/useCookieConsent";

interface SocialEmbedProps {
  type: "instagram" | "youtube";
  url: string;
}

const INSTAGRAM_WIDTH = 328;

interface EmbedPlaceholderProps extends SocialEmbedProps {
  needsConsent?: boolean;
}

// Shown until the third-party embed script renders, as a fallback if it
// never does, and instead of the embed until cookies are accepted
const EmbedPlaceholder = ({
  type,
  url,
  needsConsent,
}: EmbedPlaceholderProps) => {
  const { t } = useTranslation();

  return (
    <Box className={`embed-placeholder ${type}`}>
      {needsConsent && (
        <>
          <Typography variant="body2">{t("embeds.consentMessage")}</Typography>
          <Button size="small" onClick={() => setCookieConsent("accepted")}>
            {t("embeds.load")}
          </Button>
        </>
      )}
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
  const consent = useCookieConsent();
  const placeholder = <EmbedPlaceholder type={type} url={url} />;

  if (consent !== "accepted") {
    return (
      <Box className="markdown-container social-embed">
        <EmbedPlaceholder type={type} url={url} needsConsent />
      </Box>
    );
  }

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
