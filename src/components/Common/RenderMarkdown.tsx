import { ReactNode } from "react";
import { InstagramEmbed, YouTubeEmbed } from "react-social-media-embed";

import { Box, Typography, useMediaQuery } from "@mui/material";
import MarkdownToJsx from "markdown-to-jsx";

import { getMarkdownWithEmbeds } from "utils";
import { theme } from "utils/theme";

// Shift CMS headings down one level so they never compete with the page's h1
const shiftedHeading =
  (level: number) =>
  ({ children, ...props }: { children: ReactNode }) => {
    const Tag = `h${level + 1}` as keyof JSX.IntrinsicElements;
    return (
      <Tag {...props} className={`md-h${level}`}>
        {children}
      </Tag>
    );
  };

const markdownOptions = {
  overrides: {
    h1: shiftedHeading(1),
    h2: shiftedHeading(2),
    h3: shiftedHeading(3),
    h4: shiftedHeading(4),
    h5: shiftedHeading(5),
  },
};

interface RenderMarkdownProps {
  markdown: string;
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
              <Typography className="markdown-container">
                <MarkdownToJsx options={markdownOptions}>
                  {element.body}
                </MarkdownToJsx>
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
