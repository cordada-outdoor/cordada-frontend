import { ReactNode } from "react";

import { Avatar, Box, Typography } from "@mui/material";

type HeadingTag = "h2" | "h3" | "h4";

interface PreviewImageProps {
  src: string;
  titleComponent?: HeadingTag;
  hoverable: boolean;
  hoverContent: ReactNode;
  title?: string;
  description?: string;
}

interface PreviewContentProps {
  titleComponent: HeadingTag;
  title?: string;
  description?: string;
}

const PreviewContent = ({
  titleComponent,
  title,
  description,
}: PreviewContentProps) => {
  return (
    <Box className="preview-content">
      {title && (
        <Typography variant="h4" component={titleComponent} fontWeight={600}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography fontWeight="bold" variant="caption">
          {description}
        </Typography>
      )}
    </Box>
  );
};

const PreviewImage = ({
  src,
  hoverable,
  hoverContent,
  title,
  description,
  titleComponent = "h3",
}: PreviewImageProps) => {
  return (
    <Box className="preview-image-container">
      <Avatar
        sx={{ height: "100%", width: "100%" }}
        src={src}
        variant="square"
      />
      {title || description ? (
        <PreviewContent
          titleComponent={titleComponent}
          title={title}
          description={description}
        />
      ) : null}
      <Box className={`hover-container ${!hoverable ? "non-hoverable" : ""}`}>
        {hoverContent}
      </Box>
    </Box>
  );
};

export default PreviewImage;
