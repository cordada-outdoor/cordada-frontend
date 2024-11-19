import { ReactNode } from "react";

import { Avatar, Box, Typography } from "@mui/material";

interface PreviewImageProps {
  src: string;
  hoverable: boolean;
  hoverContent: ReactNode;
  title?: string;
  description?: string;
}

interface PreviewContentProps {
  title?: string;
  description?: string;
}

const PreviewContent = ({ title, description }: PreviewContentProps) => {
  return (
    <Box className="preview-content">
      {title && (
        <Typography variant="h4" fontWeight={600}>
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
}: PreviewImageProps) => {
  return (
    <Box className="preview-image-container">
      <Avatar
        sx={{ height: "100%", width: "100%" }}
        src={src}
        variant="square"
      />
      {title || description ? (
        <PreviewContent title={title} description={description} />
      ) : null}
      <Box className={`hover-container ${!hoverable ? "non-hoverable" : ""}`}>
        {hoverContent}
      </Box>
    </Box>
  );
};

export default PreviewImage;
