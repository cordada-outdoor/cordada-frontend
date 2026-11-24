import { InstagramEmbed, YouTubeEmbed } from "react-social-media-embed";

import { Box, Typography, useMediaQuery } from "@mui/material";
import MarkdownToJsx from "markdown-to-jsx";

import { theme } from "styles/theme";
import { getMarkdownWithEmbeds } from "utils";
import { cx } from "utils/cx";

import styles from "./RenderMarkdown.module.scss";

interface RenderMarkdownProps {
  // Undefined while the CMS content is loading.
  markdown?: string;
}

const RenderMarkdown = ({ markdown }: RenderMarkdownProps) => {
  const formattedMarkdown = getMarkdownWithEmbeds(markdown);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!formattedMarkdown?.length) {
    return <Box />;
  } else
    return (
      <>
        {formattedMarkdown.map((element) => {
          if (element.type === "markdown") {
            return (
              <Typography className={styles.markdown}>
                <MarkdownToJsx>{element.body}</MarkdownToJsx>
              </Typography>
            );
          } else if (element.type === "instagram-link") {
            return (
              <Box className={cx(styles.markdown, styles.embed)} width="100%">
                {/* The embed sets overflow inline, so override it inline. */}
                <InstagramEmbed
                  style={{ overflow: "visible" }}
                  width={328}
                  url={element.body}
                />
              </Box>
            );
          } else {
            return (
              <YouTubeEmbed
                width={isMobile ? "100%" : undefined}
                url={element.body}
              />
            );
          }
        })}
      </>
    );
};
export default RenderMarkdown;
