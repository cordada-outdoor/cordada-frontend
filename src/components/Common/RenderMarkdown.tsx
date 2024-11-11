import { InstagramEmbed } from "react-social-media-embed";

import { Box } from "@mui/material";
import MuiMarkdown from "mui-markdown";

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
            return <MuiMarkdown>{element.body}</MuiMarkdown>;
          } else {
            return (
              <Box
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
