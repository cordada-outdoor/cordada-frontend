import { ReactNode } from "react";

import { Avatar, Box, Typography } from "@mui/material";

import { cx } from "utils/cx";

import styles from "./PreviewImage.module.scss";

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
    <Box className={styles.content}>
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

// Image with an optional title/description overlay. `hoverContent` slides up
// over the image on hover, or always covers it when not `hoverable`.
const PreviewImage = ({
  src,
  hoverable,
  hoverContent,
  title,
  description,
}: PreviewImageProps) => {
  return (
    <Box className={styles.container}>
      <Avatar className={styles.image} src={src} variant="square" />
      {title || description ? (
        <PreviewContent title={title} description={description} />
      ) : null}
      <Box className={cx(styles.hover, !hoverable && styles.nonHoverable)}>
        {hoverContent}
      </Box>
    </Box>
  );
};

export default PreviewImage;
