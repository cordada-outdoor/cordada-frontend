import { InstagramEmbed, YouTubeEmbed } from "react-social-media-embed";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import MarkdownToJsx from "markdown-to-jsx";

import { getMarkdownWithEmbeds } from "utils";

interface RenderMarkdownProps {
  markdown: string;
}

const RenderMarkdown = ({ markdown }: RenderMarkdownProps) => {
  const formattedMarkdown = getMarkdownWithEmbeds(markdown);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!formattedMarkdown?.length) {
    return <Box />;
  } else
    return (
      <>
        {formattedMarkdown.map((element) => {
          if (element.type === "markdown") {
            return (
              <Typography className="markdown-container">
                <MarkdownToJsx>{element.body}</MarkdownToJsx>
              </Typography>
            );
          } else if (element.type === "instagram-link") {
            return (
              <Box
                className="markdown-container"
                width={"100%"}
                sx={{ display: "flex", justifyContent: "center" }}
              >
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
