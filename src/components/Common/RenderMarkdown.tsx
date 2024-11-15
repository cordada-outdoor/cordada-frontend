import { InstagramEmbed } from "react-social-media-embed";

import { Box, Typography } from "@mui/material";
import MarkdownToJsx from "markdown-to-jsx";

import { getMarkdownWithEmbeds } from "utils";

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
                <MarkdownToJsx>{element.body}</MarkdownToJsx>
              </Typography>
            );
          } else {
            return (
              <Box
                className="markdown-container"
                width={"100%"}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <InstagramEmbed width={328} url={element.body} />
              </Box>
            );
          }
        })}
      </>
    );
};
export default RenderMarkdown;
