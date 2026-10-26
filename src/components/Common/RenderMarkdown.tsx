import { ReactNode } from "react";

import { Box, Typography } from "@mui/material";
import MarkdownToJsx from "markdown-to-jsx";

import { getMarkdownWithEmbeds } from "utils";

import SocialEmbed from "./SocialEmbed";

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
          }
          return (
            <SocialEmbed
              type={element.type === "instagram-link" ? "instagram" : "youtube"}
              url={element.body}
            />
          );
        })}
      </>
    );
};
export default RenderMarkdown;
