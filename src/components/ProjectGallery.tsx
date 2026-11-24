import { useState } from "react";

import { Box, Dialog, IconButton, Typography } from "@mui/material";

import ArrowBack from "assets/icons/arrow-ios-back.svg?react";
import ArrowForward from "assets/icons/arrow-ios-forward.svg?react";
import { StrapiMedia } from "models/strapi";
import { getImageUrl } from "utils";
import { cx } from "utils/cx";

import styles from "./ProjectGallery.module.scss";

const MAX_TILES = 4;

interface ProjectGalleryProps {
  gallery: StrapiMedia[];
}

const ProjectGallery = ({ gallery }: ProjectGalleryProps) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const tiles = gallery.slice(0, MAX_TILES);
  const hiddenCount = gallery.length - MAX_TILES;
  const current = gallery[currentIndex];

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1,
    );
  };

  return (
    <>
      <Box className={cx(styles.grid, styles[`count${tiles.length}`])}>
        {tiles.map((image, idx) => (
          <Box
            key={idx}
            className={styles.tile}
            onClick={() => handleOpen(idx)}
          >
            <img
              src={getImageUrl(image, "medium") ?? image.url}
              alt={image.name}
            />
            {idx === MAX_TILES - 1 && hiddenCount > 0 && (
              <Typography variant="h6" className={styles.more}>
                +{hiddenCount}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box className={styles.viewer}>
          {gallery.length > 1 && (
            <IconButton
              onClick={handlePrev}
              className={cx(styles.arrow, styles.prev)}
            >
              <ArrowBack />
            </IconButton>
          )}

          <img
            src={getImageUrl(current, "large") ?? current.url}
            alt={current.name}
          />

          {gallery.length > 1 && (
            <IconButton
              onClick={handleNext}
              className={cx(styles.arrow, styles.next)}
            >
              <ArrowForward />
            </IconButton>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default ProjectGallery;
